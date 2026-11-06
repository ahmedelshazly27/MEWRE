import { describe, expect, it } from "vitest";
import { checkGsn, dataVolume, deviceTime, fitClock, misalignment, nyquistRate, ownVsBuy, platformEconomics, selectTests, toReference, type GsnNode, type ImpactTest } from "./afterwave";

const tests: ImpactTest[] = [
  { id: "t1", label: "Torque step", deps: [{ node: "fw-ctrl", weight: 0.9 }, { node: "rig-encoder", weight: 0.5 }], hours: 2, failRate: 0.3 },
  { id: "t2", label: "Thermal soak", deps: [{ node: "fw-thermal", weight: 0.8 }], hours: 8, failRate: 0.1 },
  { id: "t3", label: "Endurance", deps: [{ node: "fw-ctrl", weight: 0.2 }, { node: "fw-thermal", weight: 0.3 }], hours: 20, failRate: 0.05 },
];

describe("change impact", () => {
  it("impact score is 1 − Π(1 − w) over changed dependencies", () => {
    const r = selectTests(tests, new Set(["fw-ctrl", "rig-encoder"]), 0.3);
    expect(r.scores[0].score).toBeCloseTo(1 - 0.1 * 0.5, 9); // 0.95
    expect(r.scores[1].score).toBe(0);
    expect(r.scores[2].score).toBeCloseTo(0.2, 9);
    expect(r.scores.map((s) => s.selected)).toEqual([true, false, false]);
    expect(r.selectedHours).toBe(2);
    expect(r.totalHours).toBe(30);
    // recall = 0.95·0.3 / (0.95·0.3 + 0.2·0.05)
    expect(r.expectedRecall).toBeCloseTo(0.285 / 0.295, 6);
  });
  it("selecting everything gives recall 1", () => {
    expect(selectTests(tests, new Set(["fw-ctrl", "fw-thermal", "rig-encoder"]), 0).expectedRecall).toBe(1);
  });
});

describe("clocks", () => {
  it("50 ppm drift is 3.6 ms per minute between two clocks drifting oppositely by 25 ppm each", () => {
    expect(misalignment(60, 0, 25, 0, -25)).toBeCloseTo(0.003, 9);
  });
  it("fits offset and drift from sync pulses exactly when noise-free", () => {
    const ref = [0, 10, 20, 30, 40];
    const dev = ref.map((t) => deviceTime(t, 0.25, 80));
    const f = fitClock(ref, dev);
    expect(f.offset).toBeCloseTo(0.25, 9);
    expect(f.driftPpm).toBeCloseTo(80, 6);
    expect(f.rms).toBeLessThan(1e-9);
    expect(toReference(deviceTime(33, 0.25, 80), f.offset, f.driftPpm)).toBeCloseTo(33, 9);
  });
  it("Nyquist and data volume", () => {
    expect(nyquistRate(2_000)).toBe(4_000);
    // 32 channels × 10 kHz × 3600 s × 4 bytes = 4.608 GB per hour
    expect(dataVolume(32, 10_000, 3600, 4)).toBe(4_608_000_000);
  });
});

describe("test platform economics", () => {
  const base = { capex: 600_000, lifeYears: 5, availableHours: 7_000, utilisation: 0.5, pricePerHour: 120, variableCostPerHour: 30, fixedAnnual: 90_000, dataValuePerHour: 10 };
  it("revenue, EBIT, breakeven utilisation and payback", () => {
    const r = platformEconomics(base);
    expect(r.hoursSold).toBe(3_500);
    expect(r.revenue).toBe(420_000);
    expect(r.grossProfit).toBe(315_000);
    expect(r.depreciation).toBe(120_000);
    expect(r.ebit).toBe(105_000);
    expect(r.breakevenUtilisation).toBeCloseTo(210_000 / (90 * 7_000), 9); // 0.3333
    expect(r.paybackYears).toBeCloseTo(600_000 / 225_000, 9);
    expect(r.ebitWithData).toBe(140_000);
  });
  it("customer cost per hour of owning a rig", () => {
    expect(ownVsBuy(600_000, 5, 90_000, 30, 1_000)).toBe(240);
  });
});

describe("GSN", () => {
  const ok: GsnNode[] = [
    { id: "G1", kind: "goal", text: "Actuator is acceptably safe in operation" },
    { id: "C1", kind: "context", text: "ISO 13849 PL d", parent: "G1" },
    { id: "S1", kind: "strategy", text: "Argue over identified hazards", parent: "G1" },
    { id: "G2", kind: "goal", text: "Overtorque mitigated", parent: "S1" },
    { id: "Sn1", kind: "solution", text: "Torque limit test report", parent: "G2" },
  ];
  it("accepts a well-formed argument", () => {
    expect(checkGsn(ok)).toEqual([]);
  });
  it("flags unsupported goals and evidence with children", () => {
    const bad = [...ok, { id: "G3", kind: "goal" as const, text: "Thermal runaway mitigated", parent: "S1" }, { id: "X", kind: "goal" as const, text: "under evidence", parent: "Sn1" }];
    const issues = checkGsn(bad);
    expect(issues.some((i) => i.startsWith("G3"))).toBe(true);
    expect(issues.some((i) => i.includes("solution (evidence) is a leaf"))).toBe(true);
  });
});
