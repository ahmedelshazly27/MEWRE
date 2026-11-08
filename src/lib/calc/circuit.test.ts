import { describe, expect, it } from "vitest";
import { ohm, rcCurrent, rcVoltage, rlCurrentOff, rlCurrentOn } from "./circuit";

describe("water-loop circuit transients", () => {
  it("Ohm's law", () => {
    expect(ohm(240, 24)).toBe(10);
    expect(ohm(240, 48)).toBe(5);
  });
  it("RL current rises to 63 % of V/R after one time constant and decays the same way", () => {
    const tau = 2 / 4; // L/R
    expect(rlCurrentOn(240, 4, 2, 0)).toBe(0);
    expect(rlCurrentOn(240, 4, 2, tau) / 60).toBeCloseTo(1 - Math.exp(-1), 6);
    expect(rlCurrentOn(240, 4, 2, 50)).toBeCloseTo(60, 6);
    expect(rlCurrentOff(60, 4, 2, tau)).toBeCloseTo(60 * Math.exp(-1), 6);
  });
  it("RC current starts at V/R and dies away while the capacitor charges to V", () => {
    expect(rcCurrent(240, 24, 0.05, 0)).toBe(10);
    expect(rcCurrent(240, 24, 0.05, 1.2)).toBeCloseTo(10 * Math.exp(-1), 6);
    expect(rcVoltage(240, 24, 0.05, 1.2)).toBeCloseTo(240 * (1 - Math.exp(-1)), 6);
    expect(rcVoltage(240, 24, 0.05, 100)).toBeCloseTo(240, 6);
  });
});
