import { describe, expect, it } from "vitest";
import { aiWorkflow, toolFor, ventureOf } from "@/lib/aiWorkflow";
import { VENTURES } from "@/content/venture-context";
import { ALL_MODULES } from "@/content/tracks";
import { derive, type LearnEvent } from "@/lib/store/derive";
import { buildItems, toMarkdown } from "@/views/WorkView";
import { buildContentIndex } from "@/lib/content-json";

const shortQuestions = ALL_MODULES.flatMap((m) =>
  [...m.exam, ...m.lessons.flatMap((l) => [...(l.quiz ?? []), ...l.sections.flatMap((s) => s.blocks.flatMap((b) => (b.kind === "question" ? [b.question] : [])))])]
    .filter((q) => q.type === "short")
    .map((q) => ({ q: q as Extract<typeof q, { type: "short" }>, moduleId: m.id })),
);

describe("ventureOf", () => {
  it("uses the track for venture modules and the named venture for Founder Core", () => {
    expect(ventureOf("mz04", "Write a memo")).toBe("mizan");
    expect(ventureOf("aw01", "Write a memo")).toBe("afterwave");
    expect(ventureOf("sh02", "Write a memo")).toBe("suhail");
    expect(ventureOf("m08", "Write a memo")).toBe("mewre");
    expect(ventureOf("fc03", "Write the positioning statement for Mizan's soiling product")).toBe("mizan");
    expect(ventureOf("fc03", "For Afterwave (or Mizan), write ...")).toBe("afterwave");
    expect(ventureOf("fc03", "For your chosen venture, write ...")).toBe("general");
  });
});

describe("toolFor", () => {
  it("routes numbers to a model, sourcing to research, testable artifacts to a file, prose to a project", () => {
    expect(toolFor("Produce a pro-forma cap table scenario for Afterwave")).toBe("model");
    expect(toolFor("Build the event budget and break-even attendance")).toBe("model");
    expect(toolFor("Produce the first ten rows of Suhail's landscape map")).toBe("research");
    expect(toolFor("Write a Ripple rule set for joint control changes")).toBe("build");
    expect(toolFor("Write a one-page category decision memo for Afterwave")).toBe("writing");
  });
});

describe("aiWorkflow", () => {
  it("covers every written exercise with a prompt that carries the venture facts and the rubric", () => {
    expect(shortQuestions.length).toBeGreaterThan(300);
    for (const { q, moduleId } of shortQuestions) {
      const w = aiWorkflow(q, moduleId);
      for (const f of VENTURES[w.venture].facts) expect(w.starterPrompt).toContain(f);
      expect(w.starterPrompt).toContain("Ask me for facts you need");
      expect(w.checks.length).toBeGreaterThanOrEqual(5);
      expect(w.steps.length).toBeGreaterThan(2);
    }
  });

  it("keeps the venture rules in the checks and facts", () => {
    const mizan = aiWorkflow({ prompt: "Write the KISR data request", rubric: [] }, "mz02");
    expect(mizan.checks.join(" ")).toMatch(/targeted or in preparation/);
    const suhail = aiWorkflow({ prompt: "Write the sponsor deck", rubric: [] }, "sh03");
    expect(suhail.checks.join(" ")).toMatch(/No members, sponsors/);
  });

  it("venture facts never hint at undisclosed team members and contain no em dashes", () => {
    const all = Object.values(VENTURES).flatMap((v) => [...v.facts, ...v.checks]).join("\n");
    expect(all).not.toMatch(/stealth|abdelrahman|undisclosed|not yet public/i);
    expect(all).not.toContain("—");
  });
});

describe("work portfolio", () => {
  const ev = (q: string, text: string, score: number, at: number, extra: object = {}) =>
    ({ id: `w${at}`, type: "attempt", at, payload: { q, source: "lesson", score, correct: score >= 0.8, concepts: [], response: { type: "short", text, score, ...extra } } }) as LearnEvent;

  it("keeps the latest version per exercise, counts versions and the best score", () => {
    const [{ q }] = shortQuestions.filter((x) => x.moduleId.startsWith("mz"));
    const d = derive([ev(q.id, "first", 0.5, 1), ev(q.id, "second", 0.9, 2, { aiDraft: "draft", judgement: 0.7, feedback: "ok" }), ev(q.id, "third", 0.6, 3)]);
    const w = d.work.get(q.id)!;
    expect(w.text).toBe("third");
    expect(w.versions).toBe(3);
    expect(w.best).toBe(0.9);
    expect(w.score).toBe(0.6);
  });

  it("groups exercises by venture and exports submitted ones to Markdown", () => {
    const content = buildContentIndex("en");
    const [{ q }] = shortQuestions.filter((x) => x.moduleId.startsWith("aw"));
    const d = derive([ev(q.id, "My real answer", 0.85, Date.UTC(2026, 10, 6), { aiDraft: "AI draft", judgement: 0.8, feedback: "Good." })]);
    const items = buildItems(content, d.work);
    expect(items.length).toBeGreaterThan(300);
    const item = items.find((i) => i.questionId === q.id)!;
    expect(item.venture).toBe("afterwave");
    const md = toMarkdown(items.filter((i) => i.row), "My work");
    expect(md).toContain("## Afterwave");
    expect(md).toContain("My real answer");
    expect(md).toContain("judgement 80 %");
  });
});
