import { describe, it, expect } from "vitest";
import {
  soilingLossAt,
  soilingSeries,
  averageSoilingLoss,
  soilingCost,
  optimalInterval,
  optimalIntervalAnalytic,
} from "./soiling";

describe("soiling accumulation", () => {
  it("linear with cap", () => {
    expect(soilingLossAt(10, 0.3)).toBeCloseTo(3, 12);
    expect(soilingLossAt(100, 0.3, 15)).toBe(15);
    expect(soilingLossAt(-2, 0.3)).toBe(0);
  });
  it("series resets at cleaning", () => {
    const s = soilingSeries(10, 1, 4);
    expect(s).toEqual([0, 1, 2, 3, 0, 1, 2, 3, 0, 1]);
  });
});

describe("average loss", () => {
  it("uncapped: r·T/2", () => {
    expect(averageSoilingLoss(0.3, 20)).toBeCloseTo(3, 12);
  });
  it("capped: 1 %/day, cap 5 %, T = 10 → (12.5 + 25)/10 = 3.75 %", () => {
    expect(averageSoilingLoss(1, 10, 5)).toBeCloseTo(3.75, 12);
  });
  it("edge cases", () => {
    expect(averageSoilingLoss(0, 10)).toBe(0);
    expect(averageSoilingLoss(1, 0)).toBe(0);
  });
});

describe("cost optimisation", () => {
  const inp = { ratePct: 0.2, annualEnergyMwh: 500000, tariff: 15, costPerCleaning: 30000 };
  it("annual cost breakdown", () => {
    const c = soilingCost(inp, 30);
    expect(c.avgLossPct).toBeCloseTo(3, 12);
    expect(c.lostEnergyMwh).toBeCloseTo(15000, 6);
    expect(c.lostRevenue).toBeCloseTo(225000, 6);
    expect(c.cleaningCost).toBeCloseTo((365 / 30) * 30000, 6);
  });
  it("numeric optimum matches analytic √(2·365·C/(r·E·p))", () => {
    const a = optimalIntervalAnalytic(inp); // √(2·365·30000/(0.002·500000·15)) = √1460 = 38.2
    expect(a).toBeCloseTo(Math.sqrt(1460), 9);
    const n = optimalInterval(inp);
    expect(Math.abs(n.intervalDays - a)).toBeLessThanOrEqual(1);
    expect(n.totalCost).toBeLessThanOrEqual(soilingCost(inp, 10).totalCost);
    expect(n.totalCost).toBeLessThanOrEqual(soilingCost(inp, 90).totalCost);
  });
  it("cheaper cleaning → clean more often", () => {
    expect(optimalInterval({ ...inp, costPerCleaning: 5000 }).intervalDays).toBeLessThan(optimalInterval(inp).intervalDays);
  });
});
