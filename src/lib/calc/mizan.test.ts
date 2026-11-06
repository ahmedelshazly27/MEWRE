import { describe, expect, it } from "vitest";
import { cellTempNoct, irradianceWeightedTemp, performanceRatio, soilingRate, soilingRatio, stowDecision, weatherCorrectedPR } from "./mizan";

const rows = [
  { energy: 780, gPoa: 1000, tCell: 60, hours: 1 },
  { energy: 420, gPoa: 500, tCell: 40, hours: 1 },
];

describe("performance ratio", () => {
  it("basic PR = E / (P_STC · H/G_STC)", () => {
    expect(performanceRatio(rows, 1000)).toBeCloseTo(1200 / 1500, 9);
  });
  it("weather-corrected PR uses the irradiance-weighted reference temperature", () => {
    const tRef = irradianceWeightedTemp(rows);
    expect(tRef).toBeCloseTo((60 * 1000 + 40 * 500) / 1500, 9); // 53.33 °C
    const pr = weatherCorrectedPR(rows, 1000, -0.0035, tRef);
    const expected = 1000 * 1 * (1 - 0.0035 * (60 - tRef)) + 1000 * 0.5 * (1 - 0.0035 * (40 - tRef));
    expect(pr).toBeCloseTo(1200 / expected, 9);
    // at T_ref the correction terms cancel in the irradiance-weighted sum, so PR_corr ≈ basic PR
    expect(pr).toBeCloseTo(performanceRatio(rows, 1000), 9);
  });
  it("NOCT cell temperature: 45 °C ambient, 1000 W/m², NOCT 45 → 76.25 °C", () => {
    expect(cellTempNoct(45, 1000, 45)).toBeCloseTo(76.25, 9);
  });
});

describe("soiling from operational data", () => {
  it("soiling ratio and daily rate", () => {
    expect(soilingRatio(0.76, 0.8)).toBeCloseTo(0.95, 9);
    // SR falls 0.4 %/day exactly
    const days = [1, 2, 3, 4, 5];
    expect(soilingRate(days, days.map((d) => 1 - 0.004 * d))).toBeCloseTo(0.004, 9);
  });
});

describe("stow decision", () => {
  const base = { stowThreshold: 18, damageCost: 2_000_000, mw: 100, hours: 3, yieldLossWhileStowed: 0.3, outputFraction: 0.6, tariff: 15 };
  it("always stows at or above the vendor threshold", () => {
    expect(stowDecision({ ...base, wind: 18 }).decision).toBe("stow");
  });
  it("tracks in calm wind: lost revenue outweighs tiny damage risk", () => {
    const r = stowDecision({ ...base, wind: 8 });
    expect(r.lostRevenue).toBeCloseTo(100 * 3 * 0.6 * 0.3 * 15, 9); // USD 810
    expect(r.damageProbability).toBeLessThan(1e-5);
    expect(r.decision).toBe("track");
  });
  it("a dust event can justify stowing below the wind threshold", () => {
    const r = stowDecision({ ...base, wind: 12, soilingAvoided: 0.02, daysToCleaning: 5 });
    expect(r.soilingBenefit).toBeCloseTo(0.02 * 100 * 24 * 5 * 0.6 * 15, 9); // USD 2,160
    expect(r.decision).toBe("stow");
  });
});
