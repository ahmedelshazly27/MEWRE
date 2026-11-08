import { describe, expect, it } from "vitest";
import { induced, lineDrop, seriesImpedance, transformer, xC, xL } from "./electro";

describe("fundamentals calculators", () => {
  it("reactance of a 0.1 H coil and 100 µF capacitor at 50 Hz", () => {
    expect(xL(50, 0.1)).toBeCloseTo(31.42, 2);
    expect(xC(50, 100e-6)).toBeCloseTo(31.83, 2);
  });
  it("impedance is the hypotenuse, not R + X", () => {
    const z = seriesImpedance(30, 40 / (2 * Math.PI * 50), null, 50, 240);
    expect(z.z).toBeCloseTo(50, 6);
    expect(z.i).toBeCloseTo(4.8, 6);
    expect(z.phiDeg).toBeCloseTo(53.13, 2);
    expect(z.pf).toBeCloseTo(0.6, 6);
    const lead = seriesImpedance(30, 0, 1 / (2 * Math.PI * 50 * 40), 50, 240);
    expect(lead.phiDeg).toBeCloseTo(-53.13, 2);
  });
  it("line drop: reactive flow dominates when X >> R", () => {
    const d = lineDrop(1, 0.01, 0.1, 0.5, 0.3);
    expect(d.fromP).toBeCloseTo(0.005, 9);
    expect(d.fromQ).toBeCloseTo(0.03, 9);
    expect(d.vr).toBeCloseTo(0.965, 9);
  });
  it("400/33 kV transformer: voltage down by 12.1, current up by the same", () => {
    const t = transformer(400e3, 400, 33, 300e6);
    expect(t.v2).toBeCloseTo(33e3, 6);
    expect(t.i1).toBeCloseTo(433, 0);
    expect(t.i2).toBeCloseTo(5249, 0);
    expect(t.i2 / t.i1).toBeCloseTo(400 / 33, 6);
  });
  it("induced voltage only while current changes", () => {
    expect(induced(0.5, 0)).toBe(-0);
    expect(induced(0.5, 10)).toBe(-5);
  });
});
