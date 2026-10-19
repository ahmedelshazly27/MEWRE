import { describe, it, expect } from "vitest";
import {
  usableEnergy,
  oneWayEfficiency,
  deliverableEnergy,
  chargeEnergy,
  cycleLosses,
  requiredNameplate,
  cRate,
  stateOfHealth,
  simulateBess,
  type BessInput,
} from "./bess";

describe("BESS basics", () => {
  it("usable = nameplate × DoD", () => {
    expect(usableEnergy(500, 0.9)).toBe(450);
  });
  it("one-way efficiency = √RTE", () => {
    expect(oneWayEfficiency(0.81)).toBeCloseTo(0.9, 12);
  });
  it("deliverable energy", () => {
    expect(deliverableEnergy(100, 0.9, 0.81, 1)).toBeCloseTo(81, 9);
    expect(deliverableEnergy(100, 0.9, 0.81, 0.8)).toBeCloseTo(64.8, 9);
  });
  it("charge energy and losses", () => {
    expect(chargeEnergy(85, 0.85)).toBeCloseTo(100, 9);
    expect(cycleLosses(85, 0.85)).toBeCloseTo(15, 9);
  });
  it("required nameplate for 100 MW × 4 h, DoD 0.9, RTE 0.81", () => {
    expect(requiredNameplate(100, 4, 0.9, 0.81)).toBeCloseTo(400 / 0.81, 9);
  });
  it("C-rate", () => {
    expect(cRate(100, 400)).toBe(0.25);
  });
  it("state of health: 1 %/yr calendar + 3 %/1000 cycles at 365 cycles", () => {
    expect(stateOfHealth(0, 0.01, 0.03, 365)).toBe(1);
    expect(stateOfHealth(10, 0.01, 0.03, 365)).toBeCloseTo(1 - 0.1 - 0.03 * 3.65, 12);
    expect(stateOfHealth(100, 0.05, 0.03, 365)).toBe(0);
  });
});

describe("simulateBess", () => {
  const base: BessInput = {
    mw: 100,
    hours: 4,
    dod: 0.9,
    rte: 0.81,
    cyclesPerYear: 365,
    calendarFade: 0.01,
    cycleFadePer1000: 0.03,
    years: 20,
    strategy: "none",
  };
  it("none: meets requirement in year 1 only, then short", () => {
    const r = simulateBess(base);
    expect(r.rows[0].availableMwh).toBeCloseTo(400, 6);
    expect(r.rows[0].meetsRequirement).toBe(true);
    expect(r.rows[1].meetsRequirement).toBe(false);
    expect(r.totalAugmentation).toBe(0);
    expect(r.yearsShort).toBe(19);
  });
  it("overbuild: meets requirement every year, exactly in the last year", () => {
    const r = simulateBess({ ...base, strategy: "overbuild" });
    expect(r.yearsShort).toBe(0);
    expect(r.rows[19].availableMwh).toBeCloseTo(400, 6);
    expect(r.initialNameplate).toBeCloseTo(400 / (0.81 * stateOfHealth(19, 0.01, 0.03, 365)), 6);
  });
  it("augment: meets requirement every year with smaller initial build", () => {
    const over = simulateBess({ ...base, strategy: "overbuild" });
    const aug = simulateBess({ ...base, strategy: "augment", augmentInterval: 5 });
    expect(aug.yearsShort).toBe(0);
    expect(aug.initialNameplate).toBeLessThan(over.initialNameplate);
    expect(aug.totalAugmentation).toBeGreaterThan(0);
    expect(aug.rows[5].augmentationMwh).toBeGreaterThan(0);
    expect(aug.rows[4].availableMwh).toBeCloseTo(400, 6);
  });
  it("delivered energy capped at requirement × cycles", () => {
    const r = simulateBess({ ...base, strategy: "overbuild" });
    expect(r.rows[0].deliveredMwh).toBeCloseTo(400 * 365, 6);
    expect(r.lifetimeDeliveredMwh).toBeCloseTo(400 * 365 * 20, 3);
  });
});
