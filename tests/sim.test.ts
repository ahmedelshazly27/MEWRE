import { describe, expect, it } from "vitest";
import { applyEffects, kpiScore, simScore } from "@/lib/sim";
import type { Simulation } from "@/content/schema";

describe("simulation scoring", () => {
  it("kpi score for lower-is-better and higher-is-better", () => {
    const cost = { key: "cost", label: "", unit: "", better: "lower" as const, target: 800 };
    expect(kpiScore(cost, 750)).toBe(1);
    expect(kpiScore(cost, 1000)).toBeCloseTo(0.8);
    const trust = { key: "trust", label: "", unit: "", better: "higher" as const, target: 80 };
    expect(kpiScore(trust, 60)).toBeCloseTo(0.75);
    expect(kpiScore(trust, 95)).toBe(1);
  });
  it("applies effects additively", () => {
    expect(applyEffects({ a: 1, b: 2 }, { a: 2, c: 1 })).toEqual({ a: 3, b: 2, c: 1 });
  });
  it("blends KPI and decision quality 50/50", () => {
    const sim = { kpis: [{ key: "x", label: "", unit: "", better: "higher", target: 10 }] } as unknown as Simulation;
    const r = simScore(sim, { x: 5 }, [10, 10]);
    expect(r.kpi).toBe(0.5);
    expect(r.decisions).toBe(1);
    expect(r.total).toBe(0.75);
  });
});
