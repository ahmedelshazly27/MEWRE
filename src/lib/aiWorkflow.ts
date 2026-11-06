/**
 * "Do it with AI" for written exercises: which AI tool fits the artifact, a starter prompt carrying the venture's
 * facts and the grading rubric, and the checks the learner must do by hand before the work is theirs.
 * Pure and client-safe; unit-tested in tests/aiWorkflow.test.ts.
 */
import { VENTURES, type VentureId } from "@/content/venture-context";
import { trackOfModuleId } from "@/content/track-meta";

export type ToolKind = "model" | "research" | "build" | "writing";

export interface AiWorkflow {
  venture: VentureId;
  tool: ToolKind;
  toolName: string;
  why: string;
  steps: string[];
  starterPrompt: string;
  checks: string[];
}

/** Venture an exercise is about: the track's venture, or for Founder Core the venture the prompt names. */
export function ventureOf(moduleId: string, prompt: string): VentureId {
  const track = trackOfModuleId(moduleId);
  if (track === "afterwave" || track === "mizan" || track === "suhail" || track === "mewre") return track;
  const named = (["afterwave", "mizan", "suhail"] as const).filter((v) => new RegExp(`\\b${v}\\b`, "i").test(prompt));
  if (named.length === 1) return named[0];
  if (named.length > 1) {
    // the first venture mentioned is the subject
    return named.sort((a, b) => prompt.toLowerCase().indexOf(a) - prompt.toLowerCase().indexOf(b))[0];
  }
  return "general";
}

const MODEL = /\b(cap table|financial model|three-statement|revenue model table|budget|p&l|p and l|forecast|spreadsheet|sizing|size the|calculat|runway|unit economics|break-?even|npv|irr|cash ?flow|pricing table|price ladder|weighted scor|dilution|waterfall|sample size)/i;
const RESEARCH = /\b(market map|landscape|competitor (?:table|list|map|analysis|scan)|competitive landscape|target list|investor list|partner map|list of (?:the )?\d*|who'?s who|teardown|benchmark table|survey the|map the)/i;
const BUILD = /\b(rule set|rules? for|spec\b|specification|schema|pipeline|algorithm|script|filter|data model|interface control|icd\b|state machine|alert rules?|protocol|test plan|checklist|template|prompt library|agent charter)/i;

/** Which AI tool fits the artifact the exercise asks for. Order matters: numbers first, then research, then build. */
export function toolFor(prompt: string): ToolKind {
  if (MODEL.test(prompt)) return "model";
  if (RESEARCH.test(prompt)) return "research";
  if (BUILD.test(prompt)) return "build";
  return "writing";
}

const TOOLS: Record<ToolKind, { name: string; why: string; steps: string[]; checks: string[] }> = {
  model: {
    name: "Claude Code (or Claude with code execution) building a real spreadsheet",
    why: "Numbers belong in a model you can change, not in prose. Have the AI build the file; you own the inputs and the logic.",
    steps: [
      "Ask for an .xlsx or CSV with an Inputs sheet (every assumption labelled with its source or 'assumption'), formulas instead of typed numbers, and a Checks row that must read zero.",
      "Give it your real inputs (share counts, prices, costs, dates). Where you have none, let it propose a value but mark it an assumption.",
      "Change one input at a time and confirm every output moves in the direction and size you expect.",
      "Paste the key outputs and your reasoning into the answer box below.",
    ],
    checks: [
      "Formulas reference input cells; no hard-coded numbers in calculations",
      "Totals reconcile (cap table sums to 100 %, cash ties to the P&L, pipeline stages add up)",
      "Recompute two headline numbers by hand or with the lesson's widget",
    ],
  },
  research: {
    name: "Claude with web search or Research mode",
    why: "Research is where AI saves the most time and invents the most facts. Demand sources, then check a sample.",
    steps: [
      "Ask for a table where every row has a source URL and a date, and 'unknown' instead of guesses.",
      "Ask it to separate what the source states from what it infers.",
      "Open at least five rows chosen at random and verify them against the source.",
      "Keep the verified table; write your conclusions into the answer box below.",
    ],
    checks: [
      "Every row has a source and a date; anything unsourced is removed or marked unverified",
      "A random sample of at least five rows verified by opening the source",
      "Market sizes and funding figures name their data provider and year",
    ],
  },
  build: {
    name: "Claude Code writing it as a file you can test",
    why: "Specs, rules and protocols are testable artifacts. Write them as a file (Markdown, YAML or JSON) and try them on an example.",
    steps: [
      "Ask for the artifact as a file in a small repository, with one worked example or test case alongside it.",
      "Run it, or walk it by hand, on one realistic case from the lesson; fix what breaks.",
      "Ask Claude to attack it: which inputs make it fail or give a wrong answer?",
      "Paste the final version, or its core, into the answer box below.",
    ],
    checks: [
      "Tried on at least one realistic case, and the result makes sense to an engineer",
      "Edge cases and failure modes named (missing data, conflicting inputs, unsafe actions)",
      "Anything that triggers a physical or irreversible action keeps a human approval step",
    ],
  },
  writing: {
    name: "A Claude Project loaded with the venture's facts",
    why: "AI drafts fast; the value is your judgement. Draft, critique against the rubric, then rewrite in your own voice.",
    steps: [
      "Create a Claude Project for the venture and add the facts below (and your own notes) as project knowledge.",
      "Ask for a first draft using the starter prompt, then ask Claude to grade its own draft against the rubric and list what is weak.",
      "Rewrite it yourself: cut filler, fix every claim you cannot defend, add what only you know.",
      "Paste your final version below; paste the AI's first draft too if you want your judgement graded.",
    ],
    checks: [
      "You can defend every sentence in a meeting without the AI",
      "Written for one named reader, with the decision or ask stated plainly",
    ],
  },
};

const GENERAL_CHECKS = [
  "Every number recomputed or traced to a source; illustrative numbers labelled as such",
  "No invented customers, pilots, partners, revenue, quotes or team members",
  "External facts (standards, laws, market data) checked against a dated primary source",
];

/** Strip Markdown emphasis and math delimiters so the prompt pastes cleanly into any tool. */
const plain = (s: string) => s.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/(^|[^*])\*([^*]+)\*/g, "$1$2").replace(/\$([^$]+)\$/g, "$1").trim();

export function aiWorkflow(q: { prompt: string; rubric: string[] }, moduleId: string): AiWorkflow {
  const venture = ventureOf(moduleId, q.prompt);
  const ctx = VENTURES[venture];
  const tool = toolFor(q.prompt);
  const t = TOOLS[tool];
  const starterPrompt = [
    `I am producing a real working document for ${ctx.name}. Help me draft it.`,
    "",
    "Facts you may use (do not invent others):",
    ...ctx.facts.map((f) => `- ${f}`),
    "",
    "Task:",
    plain(q.prompt),
    "",
    "What good looks like (the grading rubric):",
    ...q.rubric.map((r) => `- ${plain(r)}`),
    "",
    "Rules:",
    "- Label every number as sourced, measured or an assumption.",
    "- Ask me for facts you need (customers, pilots, partners, revenue, team, prices) instead of inventing them.",
    "- Mark anything legal, regulatory or tax-related as to verify.",
    "- Write directly: no filler, no hype, no em dashes.",
    "",
    "Start by listing the facts and numbers you need from me. Then draft.",
  ].join("\n");
  return { venture, tool, toolName: t.name, why: t.why, steps: t.steps, starterPrompt, checks: [...GENERAL_CHECKS, ...t.checks, ...ctx.checks] };
}
