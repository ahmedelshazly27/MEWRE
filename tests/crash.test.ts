import { describe, expect, it } from "vitest";
import { CRASH_TERMS, PLAYBOOK, SPRINT_BLOCKS, SPRINT_DAYS, tierFor } from "@/content/crash";
import { getLesson, getModule, getScenario, index, modules } from "@/lib/content";
import { blockItems, planSprint, type BlockInput } from "@/lib/sprint";
import { pickStratified } from "@/lib/practice";
import { KEY_CONCEPTS } from "@/content/key";

const inputs: BlockInput[] = SPRINT_BLOCKS.map((b) => ({
  module: b.module,
  sheetMin: b.sheetMin,
  concepts: KEY_CONCEPTS[b.module].en.map((k) => ({ id: k.id, tier: k.tier })),
  lessons: b.lessons.map(([id, tier]) => ({ id, tier, minutes: getLesson(id)!.lesson.minutes })),
  scenario: b.scenario && { id: b.scenario[0], tier: b.scenario[1] },
  output: b.output && { tier: b.output.tier },
}));

describe("trial-week sprint content", () => {
  it("covers every module exactly once", () => {
    expect(SPRINT_BLOCKS.map((b) => b.module).sort()).toEqual(modules.map((m) => m.id).sort());
  });

  it("references lessons and scenarios of the right module, each lesson once", () => {
    const seen = new Set<string>();
    for (const b of SPRINT_BLOCKS) {
      expect(getModule(b.module)).toBeTruthy();
      for (const [id] of b.lessons) {
        expect(getLesson(id)?.module.id, id).toBe(b.module);
        expect(seen.has(id), `duplicate ${id}`).toBe(false);
        seen.add(id);
      }
      if (b.scenario) expect(getScenario(b.scenario[0])?.module.id, b.scenario[0]).toBe(b.module);
    }
  });

  it("is fully bilingual", () => {
    for (const b of SPRINT_BLOCKS) if (b.output) expect(b.output.text.ar).toMatch(/[؀-ۿ]/);
    for (const s of PLAYBOOK) {
      expect(s.md.en.length).toBeGreaterThan(50);
      expect(s.md.ar).toMatch(/[؀-ۿ]/);
    }
  });

  it("uses glossary terms that exist", () => {
    const ids = new Set(index().glossary.map((g) => g.id));
    for (const id of CRASH_TERMS) expect(ids.has(id), id).toBe(true);
  });

  it("has enough questions for every module check and the final exam", () => {
    for (const b of SPRINT_BLOCKS) {
      const m = getModule(b.module)!;
      expect(m.lessons.flatMap((l) => l.quiz).length + m.exam.length, b.module).toBeGreaterThanOrEqual(8);
    }
  });
});

describe("sprint planner", () => {
  for (const days of SPRINT_DAYS) {
    it(`packs a ${days}-day plan in module order with balanced days`, () => {
      const plan = planSprint(inputs, days);
      expect(plan).toHaveLength(days);
      const order = [...new Set(plan.flatMap((d) => d.segments.filter((s) => s.block).map((s) => s.block!.module)))];
      expect(order).toEqual(SPRINT_BLOCKS.map((b) => b.module));
      expect(plan.every((d) => d.segments.length > 0)).toBe(true);
      expect(plan[days - 1].segments.at(-1)!.items.map((i) => i.kind)).toEqual(["playbook", "exam"]);
      const mins = plan.map((d) => d.minutes);
      const avg = mins.reduce((a, b) => a + b, 0) / days;
      for (const m of mins) expect(Math.abs(m - avg) / avg).toBeLessThan(0.15);
      // a sprint day stays humane
      expect(avg).toBeLessThan(8.75 * 60);
    });
  }

  it("adds material as the plan gets longer and always includes core lessons", () => {
    const totals = SPRINT_DAYS.map((d) => planSprint(inputs, d).reduce((s, x) => s + x.minutes, 0));
    expect(totals[0]).toBeLessThan(totals[1]);
    expect(totals[1]).toBeLessThan(totals[2]);
    const three = planSprint(inputs, 3).flatMap((d) => d.segments.flatMap((s) => s.items.flatMap((i) => (i.kind === "lesson" ? [i.id] : []))));
    for (const b of SPRINT_BLOCKS) for (const [id, tier] of b.lessons) if (tier === 1) expect(three).toContain(id);
    expect(tierFor(5)).toBe(3);
  });
});

describe("module step order", () => {
  it("map → concepts → lessons → scenario → self-test → check → writing", () => {
    const rank = { sheet: 0, concepts: 1, lesson: 2, scenario: 3, selftest: 4, check: 5, output: 6 } as Record<string, number>;
    for (const b of inputs) {
      const kinds = blockItems(b, 3).map((i) => i.kind);
      expect(kinds.map((k) => rank[k])).toEqual([...kinds.map((k) => rank[k])].sort((x, y) => x - y));
      if (b.concepts.length) expect(kinds).toContain("selftest");
    }
  });
});

describe("stratified exam pick", () => {
  it("takes one question per group before repeating a group", () => {
    const groups = SPRINT_BLOCKS.map((b) => getModule(b.module)!.exam);
    const qs = pickStratified(groups, 25, 42);
    expect(qs).toHaveLength(25);
    expect(new Set(qs.map((q) => q.id)).size).toBe(25);
    for (const g of groups) if (g.length) expect(qs.some((q) => g.includes(q))).toBe(true);
  });
});
