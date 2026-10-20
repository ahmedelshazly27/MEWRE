/**
 * AI tutor and graders (Claude API). Everything degrades gracefully without credentials.
 */
import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";
import type { Block, Lesson, Module, ShortQuestion } from "@/content/schema";

/** Tutor chat: explanations, derivations and PM judgement — needs a strong model. */
export const TUTOR_MODEL = process.env.ANTHROPIC_TUTOR_MODEL || process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5";
/** Rubric grading of written answers and Feynman checks — narrow, structured, high volume. */
export const GRADER_MODEL = process.env.ANTHROPIC_GRADER_MODEL || "claude-haiku-5-5";

const FALLBACK_BETA = "server-side-fallback-2026-07-01";
// Server-side refusal fallback is only offered on some models (not Haiku), so add it only there.
const FALLBACK_MODELS = ["claude-fable-5-1", "claude-opus-5-5", "claude-opus-5", "claude-sonnet-5-5"];
function fallbackParams(model: string) {
  return FALLBACK_MODELS.includes(model) ? { betas: [FALLBACK_BETA], fallbacks: "default" as const } : {};
}

export function aiAvailable(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);
}

let client: Anthropic | null = null;
function getClient(): Anthropic {
  if (!client) client = new Anthropic();
  return client;
}

const LEARNER = `The learner is a System Energy Engineer at Vanderlande (logistics automation) with strong systems-thinking and controls background, familiar with BESS/hybrid controls at a high level, preparing to become a renewable-energy Project Manager at Kuwait's Ministry of Electricity, Water and Renewable Energy (MEWRE) — Shagaya Renewable Energy Park and new utility-scale PV + BESS IPPs. Fluent in English and Arabic (Egyptian/Kuwaiti background). Wants dense, applied, crash-course explanations that never skip the "why".`;

export const TUTOR_SYSTEM = `You are an expert mentor in utility-scale renewables, power systems, project management, contracts (FIDIC, PPAs) and project finance, embedded as the AI tutor of a personal learning platform.

${LEARNER}

How to tutor:
- Be direct and precise, like a senior PM mentoring a capable engineer. Show derivations and units for anything quantitative and double-check arithmetic.
- Ground answers in the lesson context provided when relevant; connect to how things work on real projects (roles, documents, what goes wrong, what a PM checks).
- For Kuwait-specific facts (projects, capacities, laws, tariffs, institutions), only state what is in the lesson context or widely established; otherwise say it must be verified and suggest where (KAPP, MEWRE, Kuwait Al-Youm gazette, CAPT).
- When asked to quiz, ask one question at a time, wait for the answer, then give feedback.
- When asked to explain differently, use a new analogy or angle (e.g., a logistics/material-handling analogy) rather than repeating the lesson.
- Reply in the learner's language (English or Arabic). Use Markdown; use $...$ / $$...$$ for math (KaTeX).
- Keep answers focused; prefer short structured answers over long essays unless asked.`;

function blockText(b: Block): string {
  switch (b.kind) {
    case "md":
      return b.md;
    case "callout":
      return `[${b.tone}] ${b.title ?? ""}\n${b.md}`;
    case "worked":
      return `Worked example: ${b.title}\nGiven: ${b.given}\n${b.steps.map((s, i) => `${i + 1}. ${s.md}`).join("\n")}\nResult: ${b.result}`;
    case "checklist":
    case "ask":
      return b.items.map((i) => `- ${i}`).join("\n");
    case "question":
      return `Problem: ${b.question.prompt}`;
    case "bilingual":
      return `${b.en}\n${b.ar}`;
    case "feynman":
      return `Feynman prompt: ${b.prompt}`;
    default:
      return "";
  }
}

/** Plain-text rendering of a lesson for the tutor's context (bounded in size). */
export function lessonContext(module: Module, lesson: Lesson, maxChars = 60_000): string {
  const parts = [
    `Module ${module.number}: ${module.title}`,
    `Lesson: ${lesson.title} — ${lesson.summary}`,
    `Objectives:\n${lesson.objectives.map((o) => `- ${o}`).join("\n")}`,
    `Concepts:\n${lesson.concepts.map((c) => `- ${c.name}: ${c.description}`).join("\n")}`,
    ...lesson.sections.map((s) => `## [${s.layer}] ${s.title}\n${s.blocks.map(blockText).filter(Boolean).join("\n\n")}`),
  ];
  const text = parts.join("\n\n");
  return text.length > maxChars ? text.slice(0, maxChars) + "\n…[truncated]" : text;
}

export type ChatMessage = { role: "user" | "assistant"; content: string };

/** Extra instruction when the learner studies in the Arabic interface. */
export const ARABIC_MODE = "The learner is studying in the Arabic interface to build their Arabic engineering vocabulary: reply in Modern Standard Arabic, giving the English technical term in parentheses on first use (e.g. عامل القدرة (Power Factor)); keep acronyms, units and math in Latin script. If they write in English, still answer in Arabic unless asked otherwise.";

/** Streams tutor text deltas. */
export async function* tutorStream(messages: ChatMessage[], context?: string, arabic = false): AsyncGenerator<string> {
  const system: Anthropic.Beta.BetaTextBlockParam[] = [{ type: "text", text: TUTOR_SYSTEM, cache_control: { type: "ephemeral" } }];
  if (arabic) system.push({ type: "text", text: ARABIC_MODE });
  if (context) system.push({ type: "text", text: `Current lesson context:\n\n${context}`, cache_control: { type: "ephemeral" } });
  const stream = getClient().beta.messages.stream({
    model: TUTOR_MODEL,
    max_tokens: 16000,
    ...fallbackParams(TUTOR_MODEL),
    output_config: { effort: "medium" },
    system,
    messages: messages.slice(-20),
  });
  for await (const event of stream) {
    if (event.type === "content_block_delta" && event.delta.type === "text_delta") yield event.delta.text;
  }
  const final = await stream.finalMessage();
  if (final.stop_reason === "refusal") yield "\n\n_The model declined to answer this request._";
  if (final.stop_reason === "max_tokens") yield "\n\n_(Answer truncated.)_";
}

const GradeSchema = z.object({
  score: z.number().describe("0 to 1: fraction of the rubric satisfied, with partial credit"),
  covered: z.array(z.string()).describe("Rubric points the answer covered"),
  missing: z.array(z.string()).describe("Rubric points missing or wrong"),
  feedback: z.string().describe("2-5 sentences of direct, constructive mentor feedback in Markdown"),
});

async function grade(task: string, arabic = false): Promise<{ score: number; feedback: string }> {
  const res = await getClient().beta.messages.parse({
    model: GRADER_MODEL,
    max_tokens: 8000, // thinking counts toward max_tokens
    ...fallbackParams(GRADER_MODEL),
    output_config: { effort: "low", format: betaZodOutputFormat(GradeSchema) },
    system: `You are a strict but fair grader for a professional learning platform. ${LEARNER} Grade only against the rubric/key points; reward correct substance over style; penalise technical errors. ${arabic ? "Write the feedback and the covered/missing points in Modern Standard Arabic, with English technical terms in parentheses on first use." : "Respond in the language of the answer."}`,
    messages: [{ role: "user", content: task }],
  });
  if (res.stop_reason === "refusal" || !res.parsed_output) throw new Error("Grader unavailable");
  const g = res.parsed_output;
  const missing = g.missing.length ? `\n\n**Missing:** ${g.missing.join("; ")}` : "";
  return { score: Math.max(0, Math.min(1, g.score)), feedback: g.feedback + missing };
}

export function gradeShortAnswer(q: ShortQuestion, answer: string, arabic = false) {
  return grade(
    `Question:\n${q.prompt}\n\nRubric (each point matters):\n${q.rubric.map((r) => `- ${r}`).join("\n")}\n\nModel answer:\n${q.modelAnswer}\n\nLearner's answer:\n<answer>\n${answer.slice(0, 8000)}\n</answer>`,
    arabic,
  );
}

export function gradeFeynman(prompt: string, keyPoints: string[], answer: string, context?: string, arabic = false) {
  return grade(
    `Feynman check — the learner explains a concept simply in their own words.\nPrompt: ${prompt}\nKey points a good explanation covers:\n${keyPoints.map((k) => `- ${k}`).join("\n")}\n${context ? `\nLesson summary for reference:\n${context.slice(0, 6000)}\n` : ""}\nAlso flag any misconception or jargon left unexplained.\n\nLearner's explanation:\n<answer>\n${answer.slice(0, 6000)}\n</answer>`,
    arabic,
  );
}
