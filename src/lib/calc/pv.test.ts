import { describe, it, expect } from "vitest";
import {
  thermalVoltage,
  operatingPoint,
  currentAt,
  vocOf,
  mpp,
  ivCurve,
  cellTempNoct,
  cellTempFaiman,
  pmpSimple,
  tempCorrectedPower,
  degradationSeries,
  DEFAULT_MODULE,
} from "./pv";

describe("thermalVoltage", () => {
  it("is ~25.69 mV at 25 °C", () => {
    expect(thermalVoltage(25)).toBeCloseTo(0.025693, 5);
  });
  it("scales with absolute temperature", () => {
    expect(thermalVoltage(75) / thermalVoltage(25)).toBeCloseTo(348.15 / 298.15, 6);
  });
});

describe("single-diode model at STC", () => {
  const op = operatingPoint(1000, 25);
  it("short-circuit current ≈ Isc", () => {
    expect(currentAt(op, 0)).toBeCloseTo(14, 1);
  });
  it("open-circuit voltage = 50 V by construction", () => {
    expect(vocOf(op)).toBeCloseTo(50, 3);
  });
  it("current is zero beyond Voc", () => {
    expect(currentAt(op, 55)).toBe(0);
  });
  it("current decreases monotonically with voltage", () => {
    let prev = Infinity;
    for (let v = 0; v <= 50; v += 2) {
      const i = currentAt(op, v);
      expect(i).toBeLessThanOrEqual(prev + 1e-9);
      prev = i;
    }
  });
  it("MPP in the 550–600 W class with realistic FF", () => {
    const m = mpp(1000, 25);
    expect(m.pmp).toBeGreaterThan(550);
    expect(m.pmp).toBeLessThan(600);
    expect(m.ff).toBeGreaterThan(0.78);
    expect(m.ff).toBeLessThan(0.85);
    expect(m.vmp).toBeGreaterThan(38);
    expect(m.vmp).toBeLessThan(46);
    expect(m.pmp).toBeCloseTo(m.vmp * m.imp, 6);
  });
  it("zero irradiance gives zero output", () => {
    expect(mpp(0, 25).pmp).toBe(0);
    expect(currentAt(operatingPoint(0, 25), 10)).toBe(0);
  });
});

describe("temperature and irradiance behaviour", () => {
  it("Voc follows β = −0.25 %/K at 1000 W/m²", () => {
    expect(vocOf(operatingPoint(1000, 75))).toBeCloseTo(50 * (1 - 0.0025 * 50), 3); // 43.75
  });
  it("Isc follows α = +0.05 %/K", () => {
    expect(currentAt(operatingPoint(1000, 75), 0)).toBeCloseTo(14 * 1.025, 1);
  });
  it("Pmp temperature coefficient is about −0.3 %/K", () => {
    const a = mpp(1000, 25).pmp;
    const b = mpp(1000, 75).pmp;
    const gamma = (b / a - 1) / 50;
    expect(gamma).toBeGreaterThan(-0.0035);
    expect(gamma).toBeLessThan(-0.0025);
  });
  it("Isc scales linearly with irradiance; Voc falls logarithmically", () => {
    const op = operatingPoint(500, 25);
    expect(currentAt(op, 0)).toBeCloseTo(7, 1);
    const voc500 = vocOf(op);
    expect(voc500).toBeLessThan(50);
    expect(voc500).toBeGreaterThan(47);
  });
  it("Pmp roughly proportional to irradiance", () => {
    const r = mpp(500, 25).pmp / mpp(1000, 25).pmp;
    expect(r).toBeGreaterThan(0.48);
    expect(r).toBeLessThan(0.52);
  });
});

describe("ivCurve", () => {
  it("returns points+1 samples from (0, Isc) to (Voc, 0)", () => {
    const c = ivCurve(1000, 25, 50);
    expect(c).toHaveLength(51);
    expect(c[0].v).toBe(0);
    expect(c[0].i).toBeCloseTo(14, 1);
    expect(c[50].v).toBeCloseTo(50, 3);
    expect(c[50].i).toBe(0);
    const pmax = Math.max(...c.map((p) => p.p));
    expect(pmax).toBeLessThanOrEqual(mpp(1000, 25).pmp + 1e-6);
  });
});

describe("cell temperature", () => {
  it("NOCT: 45 °C ambient, 1000 W/m², NOCT 45 → 76.25 °C", () => {
    expect(cellTempNoct(45, 1000, 45)).toBeCloseTo(76.25, 6);
  });
  it("NOCT at reference conditions returns NOCT", () => {
    expect(cellTempNoct(20, 800, 45)).toBeCloseTo(45, 9);
  });
  it("Faiman: Ta 45, G 1000, ws 1 → 45 + 1000/31.84", () => {
    expect(cellTempFaiman(45, 1000, 1)).toBeCloseTo(45 + 1000 / 31.84, 6);
  });
  it("Faiman: more wind → cooler", () => {
    expect(cellTempFaiman(40, 900, 5)).toBeLessThan(cellTempFaiman(40, 900, 1));
  });
});

describe("power corrections", () => {
  it("tempCorrectedPower at 75 °C with −0.30 %/K → 85 %", () => {
    expect(tempCorrectedPower(100, 75, -0.003)).toBeCloseTo(85, 9);
  });
  it("pmpSimple at STC = Pstc", () => {
    expect(pmpSimple(1000, 25)).toBeCloseTo(DEFAULT_MODULE.pmpStc, 9);
  });
  it("pmpSimple at 800 W/m², 65 °C", () => {
    expect(pmpSimple(800, 65)).toBeCloseTo(DEFAULT_MODULE.pmpStc * 0.8 * (1 - 0.003 * 40), 9);
  });
});

describe("degradationSeries", () => {
  it("first-year LID then linear", () => {
    const s = degradationSeries(30, 0.02, 0.0045);
    expect(s).toHaveLength(31);
    expect(s[0]).toBe(1);
    expect(s[1]).toBeCloseTo(0.98, 9);
    expect(s[2]).toBeCloseTo(0.9755, 9);
    expect(s[30]).toBeCloseTo(0.98 - 0.0045 * 29, 9); // 0.8495
  });
  it("never negative", () => {
    expect(Math.min(...degradationSeries(100, 0.1, 0.02))).toBe(0);
  });
});
