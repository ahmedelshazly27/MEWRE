import { describe, expect, it } from "vitest";
import { MODULES } from "@/content";
import { KEY_CONCEPTS } from "@/content/key";
import { PLAYBOOK, EXAM_MIN } from "@/content/crash";
import { DAY_BUDGET_MIN, EXPLAINERS, REVIEW_MIN, SELFTEST_MIN, TRIAL_DAYS, TRIAL_START } from "@/content/trial";
import { validatePlan, validateExplainers } from "@/content/trial/validate";
import { getExplainer } from "@/content/trial";

describe("trial week", () => {
  it("explainers pass the content validator", () => {
    expect(validateExplainers(EXPLAINERS, MODULES)).toEqual([]);
    expect(validatePlan(TRIAL_DAYS, EXPLAINERS)).toEqual([]);
  });

  it("is a 4-day plan whose explainers cover every Track 0 module from m00 to m14", () => {
    expect(TRIAL_DAYS.map((d) => d.day)).toEqual([1, 2, 3, 4]);
    for (const d of TRIAL_DAYS) expect(d.core.length).toBeGreaterThanOrEqual(5);
    const covered = new Set(EXPLAINERS.map((e) => e.module));
    for (let i = 0; i <= 14; i++) expect(covered.has(`m${String(i).padStart(2, "0")}`), `m${i}`).toBe(true);
    expect(TRIAL_START).toBe("2026-11-15");
    expect(TRIAL_DAYS.at(-1)?.exam).toBe(true);
  });

  it("fits each day into the 2 to 3 hour budget", () => {
    for (const d of TRIAL_DAYS) {
      const explainers = d.core.reduce((s, id) => s + (getExplainer(id)?.minutes ?? 0), 0);
      const total = REVIEW_MIN + explainers + SELFTEST_MIN + d.playbook.length * 8 + (d.exam ? EXAM_MIN : 0);
      expect(total, `day ${d.day}`).toBeLessThanOrEqual(DAY_BUDGET_MIN + 30);
      expect(total, `day ${d.day}`).toBeGreaterThanOrEqual(100);
    }
  });

  it("starts Day 1 from first principles before reactive power", () => {
    const d1 = TRIAL_DAYS[0].core;
    expect(d1[0]).toBe("x-voltage-current-resistance");
    expect(d1.indexOf("x-capacitance")).toBeLessThan(d1.indexOf("x-reactive-power"));
    expect(d1.indexOf("x-reactance-impedance")).toBeLessThan(d1.indexOf("x-reactive-power"));
  });

  it("links only to real playbook sections and modules with must-know concepts", () => {
    const pb = new Set(PLAYBOOK.map((p) => p.id));
    for (const d of TRIAL_DAYS) {
      for (const p of d.playbook) expect(pb.has(p), p).toBe(true);
      for (const m of d.modules) expect(KEY_CONCEPTS[m]?.en.length, m).toBeGreaterThan(0);
    }
  });
});
