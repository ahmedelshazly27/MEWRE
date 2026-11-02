import { describe, expect, it } from "vitest";
import { CRASH_DAYS, CRASH_TERMS, PLAYBOOK } from "@/content/crash";
import { getLesson, getModule, getScenario, index } from "@/lib/content";

describe("crash course", () => {
  it("has 14 consecutive days", () => {
    expect(CRASH_DAYS.map((d) => d.day)).toEqual(Array.from({ length: 14 }, (_, i) => i + 1));
  });

  it("references lessons, scenarios and modules that exist, each lesson once", () => {
    const seen = new Set<string>();
    for (const d of CRASH_DAYS) {
      for (const id of d.lessons) {
        expect(getLesson(id), id).toBeTruthy();
        expect(seen.has(id), `duplicate ${id}`).toBe(false);
        seen.add(id);
      }
      if (d.scenario) expect(getScenario(d.scenario), d.scenario).toBeTruthy();
      for (const m of d.skim ?? []) expect(getModule(m), m).toBeTruthy();
    }
  });

  it("is fully bilingual", () => {
    for (const d of CRASH_DAYS) for (const t of [d.title, d.why, d.output]) {
      expect(t.en.length).toBeGreaterThan(10);
      expect(t.ar).toMatch(/[؀-ۿ]/);
    }
    for (const s of PLAYBOOK) {
      expect(s.md.en.length).toBeGreaterThan(50);
      expect(s.md.ar).toMatch(/[؀-ۿ]/);
    }
  });

  it("uses glossary terms that exist", () => {
    const ids = new Set(index().glossary.map((g) => g.id));
    for (const id of CRASH_TERMS) expect(ids.has(id), id).toBe(true);
  });

  it("has enough quiz questions for a 25-question exam", () => {
    const pool = CRASH_DAYS.flatMap((d) => d.lessons.flatMap((id) => getLesson(id)!.lesson.quiz));
    expect(pool.length).toBeGreaterThanOrEqual(25);
  });
});
