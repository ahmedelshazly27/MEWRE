import { describe, it, expect } from "vitest";
import { thermalEnergyMwh, electricEnergyMwh, hoursAtRated, saltMassForHours, saltVolume } from "./storage-thermal";
import { KUWAIT_CLIMATE, annualFromDaily, kuwaitLoad, pvDayProfile, dcProfileNormalized } from "./kuwait";
import { compareFirmBlock, DEFAULT_FIRM_BLOCK, cspCapexForHours } from "./compare";
import { riskScore, riskBand, responseStrategy, emv } from "./risk";
import { crf } from "./finance";
import { requiredNameplate } from "./bess";

describe("thermal storage", () => {
  it("1,000 t solar salt, 290→565 °C → 114.58 MWh_th", () => {
    expect(thermalEnergyMwh(1000)).toBeCloseTo((1000 * 1000 * 1.5 * 275) / 3.6e6, 9);
    expect(thermalEnergyMwh(1000)).toBeCloseTo(114.583, 3);
  });
  it("MWh_e and hours", () => {
    expect(electricEnergyMwh(1000, 0.4)).toBe(400);
    expect(hoursAtRated(1100, 110)).toBe(10);
  });
  it("mass for hours round-trip", () => {
    const m = saltMassForHours(10, 100, 0.39);
    expect(hoursAtRated(electricEnergyMwh(thermalEnergyMwh(m), 0.39), 100)).toBeCloseTo(10, 9);
    expect(saltVolume(1850, 1850)).toBe(1000);
  });
});

describe("Kuwait datasets", () => {
  it("annual GHI ≈ 2,100 kWh/m²", () => {
    const a = annualFromDaily(KUWAIT_CLIMATE.map((m) => m.ghi));
    expect(a).toBeGreaterThan(2000);
    expect(a).toBeLessThan(2200);
  });
  it("summer load peak ~16.5 GW mid-afternoon, night min ~11.5 GW", () => {
    expect(kuwaitLoad(15, "summer")).toBeCloseTo(16500, 0);
    expect(kuwaitLoad(3, "summer")).toBeCloseTo(11500, 0);
    const w = Array.from({ length: 24 }, (_, h) => kuwaitLoad(h, "winter"));
    expect(Math.max(...w)).toBeLessThan(9500);
    expect(Math.min(...w)).toBeGreaterThan(6000);
    expect(w.indexOf(Math.max(...w))).toBeGreaterThanOrEqual(18);
  });
  it("PV profile zero at night, positive at noon, ≤ capacity", () => {
    expect(pvDayProfile(2, 1000, "summer")).toBe(0);
    expect(pvDayProfile(12, 1000, "summer")).toBeGreaterThan(700);
    expect(pvDayProfile(12, 1000, "summer")).toBeLessThanOrEqual(1000);
    expect(pvDayProfile(17.5, 1000, "winter")).toBe(0);
    expect(dcProfileNormalized(0)).toBe(0);
    expect(dcProfileNormalized(11.9)).toBeCloseTo(0.92, 2);
  });
});

describe("CSP vs PV+BESS", () => {
  it("annual energy and CSP cost", () => {
    const r = compareFirmBlock(DEFAULT_FIRM_BLOCK);
    expect(r.annualMwh).toBe(200 * 6 * 365);
    const cspCapex = 200_000 * 4200;
    expect(r.csp.capex).toBe(cspCapex);
    expect(r.csp.lcos).toBeCloseTo((cspCapex * crf(0.07, 25) + 200_000 * 70) / r.annualMwh, 6);
  });
  it("PV+BESS sizing", () => {
    const r = compareFirmBlock(DEFAULT_FIRM_BLOCK);
    expect(r.pvBess.bessMwh).toBeCloseTo(requiredNameplate(200, 6, 0.9, 0.86), 9);
    expect(r.pvBess.pvMwDc).toBeCloseTo(1200 / 0.86 / 5.6, 9);
    expect(r.pvBess.capex).toBeCloseTo(r.pvBess.capexPv + r.pvBess.capexBess, 3);
  });
  it("CSP capex helper", () => {
    expect(cspCapexForHours(10)).toBe(5000);
  });
});

describe("risk scoring", () => {
  it("score and bands", () => {
    expect(riskScore(4, 5)).toBe(20);
    expect(riskBand(20)).toBe("extreme");
    expect(riskBand(12)).toBe("high");
    expect(riskBand(6)).toBe("medium");
    expect(riskBand(4)).toBe("low");
    expect(responseStrategy("low")).toMatch(/Accept/);
    expect(emv(0.2, 1_000_000)).toBe(200_000);
  });
});
