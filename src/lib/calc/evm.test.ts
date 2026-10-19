import { describe, it, expect } from "vitest";
import {
  cv,
  sv,
  cpi,
  spi,
  eacCpi,
  eacBudgetRate,
  eacCpiSpi,
  eacBottomUp,
  etc,
  vac,
  tcpiBac,
  tcpiEac,
  evm,
  sCurve,
  sCurveInverse,
} from "./evm";

// Textbook example: BAC 1000, PV 500, EV 400, AC 450
describe("EVM textbook example", () => {
  const bac = 1000;
  const pv = 500;
  const ev = 400;
  const ac = 450;
  it("variances", () => {
    expect(cv(ev, ac)).toBe(-50);
    expect(sv(ev, pv)).toBe(-100);
  });
  it("indices", () => {
    expect(cpi(ev, ac)).toBeCloseTo(0.8889, 4);
    expect(spi(ev, pv)).toBeCloseTo(0.8, 12);
  });
  it("EAC methods", () => {
    expect(eacCpi(bac, ev / ac)).toBeCloseTo(1125, 9);
    expect(eacBudgetRate(bac, ev, ac)).toBe(1050);
    // 450 + 600/(0.8889·0.8) = 450 + 843.75
    expect(eacCpiSpi(bac, ev, ac, ev / ac, ev / pv)).toBeCloseTo(1293.75, 6);
    expect(eacBottomUp(ac, 700)).toBe(1150);
  });
  it("ETC, VAC, TCPI", () => {
    expect(etc(1125, ac)).toBe(675);
    expect(vac(bac, 1125)).toBe(-125);
    expect(tcpiBac(bac, ev, ac)).toBeCloseTo(600 / 550, 12);
    expect(tcpiEac(bac, ev, ac, 1125)).toBeCloseTo(600 / 675, 12);
  });
  it("evm() aggregates", () => {
    const r = evm({ bac, pv, ev, ac, etcBottomUp: 700 });
    expect(r.cv).toBe(-50);
    expect(r.sv).toBe(-100);
    expect(r.eac.cpi).toBeCloseTo(1125, 9);
    expect(r.eac.budgetRate).toBe(1050);
    expect(r.eac.cpiSpi).toBeCloseTo(1293.75, 6);
    expect(r.eac.bottomUp).toBe(1150);
    expect(r.etc).toBeCloseTo(675, 9);
    expect(r.vac).toBeCloseTo(-125, 9);
    expect(r.percentComplete).toBeCloseTo(0.4, 12);
    expect(r.percentSpent).toBeCloseTo(0.45, 12);
    expect(evm({ bac, pv, ev, ac }).eac.bottomUp).toBeNull();
  });
  it("on-plan project has unit indices", () => {
    const r = evm({ bac: 100, pv: 50, ev: 50, ac: 50 });
    expect(r.cpi).toBe(1);
    expect(r.spi).toBe(1);
    expect(r.tcpiBac).toBe(1);
    expect(r.eac.cpi).toBe(100);
  });
});

describe("S-curve", () => {
  it("passes through 0, 0.5 and 1", () => {
    expect(sCurve(0)).toBeCloseTo(0, 12);
    expect(sCurve(0.5)).toBeCloseTo(0.5, 12);
    expect(sCurve(1)).toBeCloseTo(1, 12);
  });
  it("monotonic and clamped", () => {
    expect(sCurve(0.3)).toBeLessThan(sCurve(0.4));
    expect(sCurve(-1)).toBeCloseTo(0, 12);
    expect(sCurve(2)).toBeCloseTo(1, 12);
  });
  it("inverse round-trips", () => {
    expect(sCurve(sCurveInverse(0.37))).toBeCloseTo(0.37, 9);
  });
});
