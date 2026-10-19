import { describe, it, expect } from "vitest";
import {
  powerDensity,
  windPower,
  betzCp,
  betzCt,
  BETZ_LIMIT,
  gamma,
  weibullPdf,
  weibullCdf,
  weibullMean,
  weibullScaleFromMean,
  weibullPowerDensity,
  powerCurve,
  aep,
  windCapacityFactor,
  pressureAtAltitude,
  airDensity,
  shear,
  shearExponent,
  GENERIC_TURBINE,
} from "./wind";

describe("power in the wind", () => {
  it("½ρv³: 1.225 kg/m³ at 10 m/s = 612.5 W/m²", () => {
    expect(powerDensity(1.225, 10)).toBeCloseTo(612.5, 9);
  });
  it("doubling speed → 8× power", () => {
    expect(powerDensity(1.2, 8) / powerDensity(1.2, 4)).toBeCloseTo(8, 12);
  });
  it("through a 100 m rotor", () => {
    expect(windPower(1.225, 10, 100)).toBeCloseTo(612.5 * Math.PI * 2500, 3);
  });
});

describe("Betz", () => {
  it("max Cp 16/27 at a = 1/3", () => {
    expect(betzCp(1 / 3)).toBeCloseTo(16 / 27, 12);
    expect(BETZ_LIMIT).toBeCloseTo(0.5926, 4);
    for (const a of [0.1, 0.2, 0.3, 0.4, 0.5]) expect(betzCp(a)).toBeLessThanOrEqual(16 / 27 + 1e-12);
  });
  it("Cp(0) = 0, Ct(0.5) = 1", () => {
    expect(betzCp(0)).toBe(0);
    expect(betzCt(0.5)).toBe(1);
    expect(betzCt(1 / 3)).toBeCloseTo(8 / 9, 12);
  });
});

describe("gamma function (Lanczos)", () => {
  it("integers: Γ(n) = (n−1)!", () => {
    expect(gamma(1)).toBeCloseTo(1, 10);
    expect(gamma(5)).toBeCloseTo(24, 8);
  });
  it("Γ(0.5) = √π, Γ(1.5) = √π/2", () => {
    expect(gamma(0.5)).toBeCloseTo(Math.sqrt(Math.PI), 10);
    expect(gamma(1.5)).toBeCloseTo(Math.sqrt(Math.PI) / 2, 10);
  });
  it("reflection for small arguments", () => {
    expect(gamma(0.25)).toBeCloseTo(3.625609908, 7);
  });
});

describe("Weibull", () => {
  it("mean for k = 2, c = 8 ≈ 7.09 m/s", () => {
    expect(weibullMean(2, 8)).toBeCloseTo(7.0898, 3);
  });
  it("k = 1 mean = c (exponential)", () => {
    expect(weibullMean(1, 6)).toBeCloseTo(6, 9);
  });
  it("scale from mean round-trip", () => {
    expect(weibullScaleFromMean(weibullMean(2.2, 7.5), 2.2)).toBeCloseTo(7.5, 9);
  });
  it("cdf at c = 1 − 1/e", () => {
    expect(weibullCdf(8, 2, 8)).toBeCloseTo(1 - Math.exp(-1), 12);
    expect(weibullCdf(0, 2, 8)).toBe(0);
  });
  it("pdf integrates to 1", () => {
    let s = 0;
    const dv = 0.01;
    for (let v = dv / 2; v < 60; v += dv) s += weibullPdf(v, 2, 8) * dv;
    expect(s).toBeCloseTo(1, 4);
    expect(weibullPdf(-1, 2, 8)).toBe(0);
    expect(weibullPdf(0, 2, 8)).toBe(0);
    expect(weibullPdf(0, 1, 5)).toBeCloseTo(0.2, 12);
  });
  it("Rayleigh power density = ½ρc³Γ(2.5)", () => {
    expect(weibullPowerDensity(1.225, 2, 8)).toBeCloseTo(0.5 * 1.225 * 512 * 1.329340388, 4);
  });
});

describe("turbine", () => {
  it("power curve regions", () => {
    expect(powerCurve(2)).toBe(0);
    expect(powerCurve(3)).toBe(0);
    expect(powerCurve(12)).toBe(GENERIC_TURBINE.ratedKw);
    expect(powerCurve(20)).toBe(GENERIC_TURBINE.ratedKw);
    expect(powerCurve(25)).toBe(0);
    const mid = powerCurve(8);
    expect(mid).toBeCloseTo(4200 * (512 - 27) / (1728 - 27), 6);
  });
  it("lower density lowers power below rated, not at rated", () => {
    expect(powerCurve(8, GENERIC_TURBINE, 1.1)).toBeCloseTo(powerCurve(8) * (1.1 / 1.225), 9);
    expect(powerCurve(15, GENERIC_TURBINE, 1.1)).toBe(4200);
  });
  it("AEP for k = 2, c = 8 gives a plausible CF (25–40 %)", () => {
    const e = aep(2, 8);
    const cf = windCapacityFactor(e, 4200);
    expect(cf).toBeGreaterThan(0.25);
    expect(cf).toBeLessThan(0.4);
  });
  it("AEP for always-rated turbine equals 8760·P", () => {
    const t = { ratedKw: 1000, cutIn: 0, rated: 0.0001, cutOut: 1000, rotorDiameter: 50 };
    // Weibull mass concentrated well inside [0, 35]
    expect(aep(3, 8, t)).toBeCloseTo(8760, -1);
  });
  it("availability scales AEP", () => {
    expect(aep(2, 8, GENERIC_TURBINE, 1.225, 0.97)).toBeCloseTo(0.97 * aep(2, 8), 6);
  });
});

describe("atmosphere and shear", () => {
  it("sea-level standard density at 15 °C ≈ 1.225", () => {
    expect(airDensity(15, 0)).toBeCloseTo(1.225, 3);
    expect(pressureAtAltitude(0)).toBe(101325);
  });
  it("hot Kuwait summer air (45 °C) ≈ 1.11 kg/m³ (~9 % less)", () => {
    expect(airDensity(45, 0)).toBeCloseTo(1.1095, 3);
  });
  it("altitude lowers density", () => {
    // p(1000 m) = 89,875 Pa → 89875/(287.05·288.15)
    expect(airDensity(15, 1000)).toBeCloseTo(1.0866, 3);
  });
  it("power law shear", () => {
    expect(shear(6, 10, 100, 0.143)).toBeCloseTo(6 * Math.pow(10, 0.143), 9);
    expect(shearExponent(5, 10, 6, 40)).toBeCloseTo(Math.log(1.2) / Math.log(4), 12);
  });
});
