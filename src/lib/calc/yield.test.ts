import { describe, it, expect } from "vitest";
import {
  lossWaterfall,
  combinedLossFactor,
  specificYield,
  performanceRatio,
  Z_EXCEEDANCE,
  normInv,
  normPdf,
  zFor,
  pValue,
  combineUncertainties,
  multiYearSigma,
  clipProfile,
  clippingLoss,
} from "./yield";

describe("loss waterfall", () => {
  it("multiplicative: 10 % then 10 % → 81 %", () => {
    const w = lossWaterfall(100, [
      { label: "a", pct: 10 },
      { label: "b", pct: 10 },
    ]);
    expect(w.final).toBeCloseTo(81, 12);
    expect(w.totalLossPct).toBeCloseTo(19, 12);
    expect(w.steps[1].before).toBeCloseTo(90, 12);
    expect(w.steps[1].delta).toBeCloseTo(-9, 12);
  });
  it("gains are negative losses", () => {
    expect(lossWaterfall(100, [{ label: "POA gain", pct: -20 }]).final).toBeCloseTo(120, 12);
  });
  it("combined factor", () => {
    expect(combinedLossFactor([2, 3, 5])).toBeCloseTo(0.98 * 0.97 * 0.95, 12);
    expect(lossWaterfall(0, []).totalLossPct).toBe(0);
  });
});

describe("yield metrics", () => {
  it("specific yield and PR", () => {
    // 1 MWp producing 2,000 MWh with POA 2,500 kWh/m² → SY 2000, PR 0.8
    expect(specificYield(2_000_000, 1000)).toBe(2000);
    expect(performanceRatio(2_000_000, 1000, 2500)).toBeCloseTo(0.8, 12);
  });
});

describe("exceedance", () => {
  it("z-table values", () => {
    expect(Z_EXCEEDANCE[90]).toBe(1.2816);
    expect(zFor(75)).toBe(0.674);
    expect(zFor(99)).toBe(2.326);
    expect(zFor(50)).toBe(0);
  });
  it("normInv matches table", () => {
    expect(normInv(0.9)).toBeCloseTo(1.28155, 4);
    expect(normInv(0.975)).toBeCloseTo(1.95996, 4);
    expect(normInv(0.01)).toBeCloseTo(-2.32635, 4);
    expect(normInv(0.5)).toBeCloseTo(0, 9);
    expect(normInv(0)).toBe(-Infinity);
    expect(normInv(1)).toBe(Infinity);
    expect(zFor(80)).toBeCloseTo(0.8416, 3);
  });
  it("normPdf peak", () => {
    expect(normPdf(0)).toBeCloseTo(0.398942, 6);
  });
  it("P90 = P50·(1 − 1.2816σ)", () => {
    expect(pValue(1000, 0.08, 90)).toBeCloseTo(1000 * (1 - 1.2816 * 0.08), 9); // 897.47
    expect(pValue(1000, 0.08, 50)).toBe(1000);
    expect(pValue(1000, 0.08, 99)).toBeCloseTo(813.92, 2);
  });
  it("quadrature sum: 3-4-5 % → 5 %; 5,3,2,2 → 6.48 %", () => {
    expect(combineUncertainties([0.03, 0.04])).toBeCloseTo(0.05, 12);
    expect(combineUncertainties([5, 3, 2, 2])).toBeCloseTo(Math.sqrt(42), 12);
  });
  it("multi-year inter-annual variability", () => {
    expect(multiYearSigma(0.04, 4)).toBeCloseTo(0.02, 12);
  });
});

describe("clipping", () => {
  it("clips at 1/ratio of DC", () => {
    const pts = clipProfile(
      [
        { hour: 10, value: 0.5 },
        { hour: 12, value: 1.0 },
      ],
      1.25,
      1,
    );
    expect(pts[0].clippedKw).toBe(0);
    expect(pts[1].acKw).toBeCloseTo(0.8, 12);
    expect(pts[1].clippedKw).toBeCloseTo(0.2, 12);
    expect(clippingLoss(pts)).toBeCloseTo(0.2 / 1.5, 12);
  });
  it("no clipping at ratio 1 with efficiency < 1", () => {
    expect(clippingLoss(clipProfile([{ hour: 12, value: 1 }], 1, 0.98))).toBe(0);
    expect(clippingLoss([])).toBe(0);
  });
});
