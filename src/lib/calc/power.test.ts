import { describe, it, expect } from "vitest";
import {
  SQRT3,
  fromPandPf,
  fromPQ,
  pfCorrectionKvar,
  threePhaseS,
  threePhaseP,
  lineCurrent,
  phaseVoltage,
  lineVoltage,
  baseImpedance,
  baseCurrent,
  ohmsToPu,
  puToOhms,
  changeBase,
  faultMva,
  capacityFactor,
  energyFromCf,
  loadFactor,
  loadFactorFromEnergy,
  phaseWave,
  phasorSum,
  droopResponse,
} from "./power";

describe("complex power", () => {
  it("P = 800 kW at PF 0.8 lagging → S = 1000 kVA, Q = 600 kvar", () => {
    const r = fromPandPf(800, 0.8);
    expect(r.s).toBeCloseTo(1000, 9);
    expect(r.q).toBeCloseTo(600, 9);
    expect(r.phiDeg).toBeCloseTo(36.8699, 3);
  });
  it("leading PF gives negative Q", () => {
    expect(fromPandPf(800, 0.8, false).q).toBeCloseTo(-600, 9);
  });
  it("fromPQ 3-4-5", () => {
    const r = fromPQ(3, 4);
    expect(r.s).toBe(5);
    expect(r.pf).toBeCloseTo(0.6, 12);
    expect(fromPQ(0, 0).pf).toBe(1);
  });
  it("capacitor to correct 1000 kW from 0.8 to 0.95", () => {
    // tanφ1 = 0.75, tanφ2 = 0.32868
    expect(pfCorrectionKvar(1000, 0.8, 0.95)).toBeCloseTo(750 - 328.684, 2);
    expect(pfCorrectionKvar(1000, 0.8, 1)).toBeCloseTo(750, 6);
  });
});

describe("three-phase", () => {
  it("√3 relations", () => {
    expect(SQRT3).toBeCloseTo(1.7320508, 7);
    expect(threePhaseS(33, 1)).toBeCloseTo(57.1577, 3); // kV·kA = MVA
    expect(threePhaseP(0.4, 1000, 0.9)).toBeCloseTo(SQRT3 * 400 * 0.9, 6);
    expect(lineCurrent(100, 33)).toBeCloseTo(1.7495, 4); // MVA/kV → kA
    expect(phaseVoltage(400)).toBeCloseTo(230.94, 2);
    expect(lineVoltage(230.94)).toBeCloseTo(400, 2);
  });
  it("balanced phase waves sum to zero at any instant", () => {
    for (const t of [0, 0.001, 0.0037, 0.013]) {
      const s = phaseWave(230, 50, t, 0) + phaseWave(230, 50, t, 1) + phaseWave(230, 50, t, 2);
      expect(Math.abs(s)).toBeLessThan(1e-9);
    }
    expect(phaseWave(230, 50, 0.005, 0)).toBeCloseTo(230 * Math.SQRT2, 9);
  });
  it("phasor sum zero when balanced, equal to imbalance otherwise", () => {
    expect(phasorSum(1, 1, 1)).toBeLessThan(1e-12);
    expect(phasorSum(1.2, 1, 1)).toBeCloseTo(0.2, 12);
  });
});

describe("per-unit", () => {
  it("base impedance 132 kV, 100 MVA = 174.24 Ω", () => {
    expect(baseImpedance(132, 100)).toBeCloseTo(174.24, 9);
  });
  it("base current 100 MVA, 33 kV = 1749.5 A", () => {
    expect(baseCurrent(100, 33)).toBeCloseTo(1749.546, 2);
  });
  it("ohms ↔ pu round-trip", () => {
    expect(ohmsToPu(17.424, 132, 100)).toBeCloseTo(0.1, 12);
    expect(puToOhms(0.1, 132, 100)).toBeCloseTo(17.424, 9);
  });
  it("change of base: 10 % on 50 MVA → 20 % on 100 MVA", () => {
    expect(changeBase(0.1, 50, 33, 100, 33)).toBeCloseTo(0.2, 12);
    expect(changeBase(0.1, 100, 11, 100, 11 * 2)).toBeCloseTo(0.025, 12);
  });
  it("fault level", () => {
    expect(faultMva(100, 0.1)).toBeCloseTo(1000, 9);
  });
});

describe("capacity and load factor", () => {
  it("100 MW producing 219,000 MWh/yr → CF 25 %", () => {
    expect(capacityFactor(219000, 100)).toBeCloseTo(0.25, 12);
    expect(energyFromCf(0.25, 100)).toBeCloseTo(219000, 6);
  });
  it("load factor", () => {
    expect(loadFactor(12, 16)).toBeCloseTo(0.75, 12);
    expect(loadFactorFromEnergy(24 * 12, 16, 24)).toBeCloseTo(0.75, 12);
  });
});

describe("droop", () => {
  it("5 % droop, 49.8 Hz, no deadband → +8 % of rated", () => {
    // Δf/f = −0.004 → ΔP = 0.004/0.05 = 0.08 pu
    expect(droopResponse({ freqHz: 49.8, droopPct: 5, pRated: 100, pSetpoint: 80 })).toBeCloseTo(88, 9);
  });
  it("deadband removes small deviations and is subtracted", () => {
    expect(droopResponse({ freqHz: 50.01, droopPct: 4, deadbandHz: 0.015, pRated: 100, pSetpoint: 80 })).toBe(80);
    // over-frequency 50.2, deadband 0.2 → no response
    expect(droopResponse({ freqHz: 50.2, droopPct: 4, deadbandHz: 0.2, pRated: 100, pSetpoint: 80 })).toBeCloseTo(80, 9);
    // 50.5 Hz, 0.2 deadband → Δf_eff 0.3 → −0.006/0.04 = −0.15 pu
    expect(droopResponse({ freqHz: 50.5, droopPct: 4, deadbandHz: 0.2, pRated: 100, pSetpoint: 80 })).toBeCloseTo(65, 9);
  });
  it("upward response limited by available headroom", () => {
    expect(droopResponse({ freqHz: 49, droopPct: 4, pRated: 100, pSetpoint: 90, pAvailable: 95 })).toBe(95);
  });
});
