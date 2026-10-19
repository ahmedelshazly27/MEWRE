import { describe, it, expect } from "vitest";
import {
  mulberry32,
  triangularInv,
  triangular,
  triangularMean,
  pertMean,
  percentile,
  histogram,
  simulateSchedule,
  simulateSum,
} from "./montecarlo";

describe("mulberry32", () => {
  it("is deterministic for a seed and in [0,1)", () => {
    const a = mulberry32(123);
    const b = mulberry32(123);
    for (let i = 0; i < 100; i++) {
      const x = a();
      expect(x).toBe(b());
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThan(1);
    }
  });
  it("different seeds differ", () => {
    expect(mulberry32(1)()).not.toBe(mulberry32(2)());
  });
  it("mean ≈ 0.5", () => {
    const r = mulberry32(7);
    let s = 0;
    for (let i = 0; i < 20000; i++) s += r();
    expect(s / 20000).toBeCloseTo(0.5, 1);
  });
});

describe("triangular", () => {
  it("inverse CDF endpoints and mode", () => {
    expect(triangularInv(0, 2, 5, 10)).toBe(2);
    expect(triangularInv(1, 2, 5, 10)).toBe(10);
    expect(triangularInv(3 / 8, 2, 5, 10)).toBeCloseTo(5, 12); // F(mode) = (5−2)/(10−2)
  });
  it("degenerate", () => {
    expect(triangularInv(0.4, 5, 5, 5)).toBe(5);
  });
  it("sample mean ≈ (a+m+b)/3", () => {
    const r = mulberry32(99);
    let s = 0;
    const n = 50000;
    for (let i = 0; i < n; i++) s += triangular(r, 2, 5, 11);
    expect(s / n).toBeCloseTo(triangularMean(2, 5, 11), 1);
    expect(triangularMean(2, 5, 11)).toBe(6);
    expect(pertMean(2, 5, 11)).toBeCloseTo(5.5, 12);
  });
});

describe("percentile & histogram", () => {
  it("linear interpolation", () => {
    const s = [1, 2, 3, 4, 5];
    expect(percentile(s, 0)).toBe(1);
    expect(percentile(s, 50)).toBe(3);
    expect(percentile(s, 100)).toBe(5);
    expect(percentile(s, 80)).toBeCloseTo(4.2, 12);
    expect(Number.isNaN(percentile([], 50))).toBe(true);
  });
  it("histogram counts all values and cumulates to 1", () => {
    const h = histogram([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 5);
    expect(h).toHaveLength(5);
    expect(h.reduce((a, b) => a + b.count, 0)).toBe(10);
    expect(h[4].cum).toBe(1);
    expect(h[0].count).toBe(2);
    expect(histogram([], 5)).toEqual([]);
    expect(histogram([3, 3, 3], 4).reduce((a, b) => a + b.count, 0)).toBe(3);
  });
});

describe("simulations", () => {
  it("serial network: P50 above deterministic when skewed right", () => {
    const acts = [
      { id: "A", duration: 10, estimate: { min: 8, likely: 10, max: 20 } },
      { id: "B", duration: 10, preds: ["A"], estimate: { min: 8, likely: 10, max: 20 } },
    ];
    const r = simulateSchedule(acts, 4000, 1);
    expect(r.deterministic).toBe(20);
    expect(r.mean).toBeCloseTo(2 * triangularMean(8, 10, 20), 0);
    expect(r.p50).toBeGreaterThan(20);
    expect(r.p10).toBeLessThan(r.p50);
    expect(r.p80).toBeLessThan(r.p90);
    expect(r.criticality.A).toBe(1);
    expect(r.criticality.B).toBe(1);
  });
  it("parallel paths: merge bias; criticality shared", () => {
    const acts = [
      { id: "A", duration: 10, estimate: { min: 5, likely: 10, max: 15 } },
      { id: "B", duration: 10, estimate: { min: 5, likely: 10, max: 15 } },
      { id: "End", duration: 0, preds: ["A", "B"] },
    ];
    const r = simulateSchedule(acts, 4000, 3);
    expect(r.mean).toBeGreaterThan(10.5); // E[max] > E[each]
    expect(r.criticality.A + r.criticality.B).toBeCloseTo(1, 1);
  });
  it("same seed reproduces results", () => {
    const items = [
      { min: 90, likely: 100, max: 130 },
      { min: 40, likely: 50, max: 80 },
    ];
    expect(simulateSum(items, 500, 5).p80).toBe(simulateSum(items, 500, 5).p80);
    const r = simulateSum(items, 5000, 5);
    expect(r.deterministic).toBe(150);
    expect(r.mean).toBeCloseTo(triangularMean(90, 100, 130) + triangularMean(40, 50, 80), 0);
    expect(r.sorted[0]).toBeGreaterThanOrEqual(130);
    expect(r.sorted[r.sorted.length - 1]).toBeLessThanOrEqual(210);
  });
});
