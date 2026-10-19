import { describe, it, expect } from "vitest";
import {
  declination,
  equationOfTime,
  solarTime,
  hourAngle,
  sunFromAngles,
  sunPosition,
  sunsetHourAngle,
  dayLength,
  airMass,
  clearSkyGhi,
  clearSkyDni,
  sunVector,
  trackerIdealAngle,
  trackerAngle,
  cosIncidence,
  cosIncidenceTracker,
  poaBeam,
  poaTotal,
  clearSkyDay,
  integrateKwh,
  dayOfYearFrom,
} from "./solar";

describe("declination", () => {
  it("≈ +23.45° at summer solstice (day 172)", () => {
    expect(declination(172)).toBeCloseTo(23.45, 1);
  });
  it("≈ −23.45° at winter solstice (day 355)", () => {
    expect(declination(355)).toBeCloseTo(-23.45, 1);
  });
  it("≈ 0 at equinox (day 81)", () => {
    expect(Math.abs(declination(81))).toBeLessThan(0.5);
  });
});

describe("equation of time", () => {
  it("≈ +16 min in early November", () => {
    expect(equationOfTime(307)).toBeGreaterThan(15.5);
    expect(equationOfTime(307)).toBeLessThan(16.8);
  });
  it("≈ −14 min in mid February", () => {
    expect(equationOfTime(42)).toBeLessThan(-13.5);
    expect(equationOfTime(42)).toBeGreaterThan(-14.8);
  });
});

describe("solar time and hour angle", () => {
  it("longitude correction for Kuwait: 4·(47.7 − 45) = 10.8 min", () => {
    const st = solarTime(12, 1, 47.7, 3);
    expect((st - 12) * 60).toBeCloseTo(10.8 + equationOfTime(1), 6);
  });
  it("hour angle is 0 at solar noon, −15° per hour before", () => {
    expect(hourAngle(12)).toBe(0);
    expect(hourAngle(9)).toBe(-45);
    expect(hourAngle(15)).toBe(45);
  });
});

describe("sun position", () => {
  it("solar-noon elevation = 90 − |φ − δ|", () => {
    const s = sunFromAngles(29.3, 23.45, 0);
    expect(s.elevation).toBeCloseTo(90 - (29.3 - 23.45), 6);
    expect(s.azimuth).toBeCloseTo(180, 6);
  });
  it("winter noon at Kuwait: 90 − 29.3 − 23.45 = 37.25°", () => {
    expect(sunFromAngles(29.3, -23.45, 0).elevation).toBeCloseTo(37.25, 6);
  });
  it("equinox at equator, 6h before noon → on horizon, due east", () => {
    const s = sunFromAngles(0, 0, -90);
    expect(s.elevation).toBeCloseTo(0, 6);
    expect(s.azimuth).toBeCloseTo(90, 4);
  });
  it("morning azimuth east of south, afternoon west of south", () => {
    expect(sunFromAngles(29.3, 10, -30).azimuth).toBeLessThan(180);
    expect(sunFromAngles(29.3, 10, 30).azimuth).toBeGreaterThan(180);
  });
  it("Kuwait at 12:00 local on day 172 → high sun near south", () => {
    const s = sunPosition(172, 12);
    expect(s.elevation).toBeGreaterThan(82);
    expect(s.zenith).toBeCloseTo(90 - s.elevation, 9);
  });
});

describe("sunset and day length", () => {
  it("equinox → 12 h day", () => {
    expect(sunsetHourAngle(29.3, 0)).toBeCloseTo(90, 9);
  });
  it("Kuwait summer solstice ~13.9 h", () => {
    const d = dayLength(29.3, 172);
    expect(d).toBeGreaterThan(13.6);
    expect(d).toBeLessThan(14.1);
  });
  it("polar day/night clamps", () => {
    expect(sunsetHourAngle(80, 23)).toBe(180);
    expect(sunsetHourAngle(80, -23)).toBe(0);
  });
});

describe("air mass and clear sky", () => {
  it("AM ≈ 1 at zenith, ≈ 2 at 60°", () => {
    expect(airMass(0)).toBeCloseTo(1, 2);
    expect(airMass(60)).toBeCloseTo(2, 1);
    expect(airMass(95)).toBe(Infinity);
  });
  it("Haurwitz GHI at zenith = 1098·e^−0.057 ≈ 1037 W/m²", () => {
    expect(clearSkyGhi(0)).toBeCloseTo(1098 * Math.exp(-0.057), 6);
    expect(clearSkyGhi(90)).toBe(0);
  });
  it("Meinel DNI at AM1 ≈ 1361·0.7 ≈ 953 W/m²", () => {
    expect(clearSkyDni(0)).toBeCloseTo(1361 * Math.pow(0.7, Math.pow(airMass(0), 0.678)), 6);
    expect(clearSkyDni(0)).toBeGreaterThan(940);
    expect(clearSkyDni(0)).toBeLessThan(960);
    expect(clearSkyDni(0, 0.8)).toBeCloseTo(0.8 * clearSkyDni(0), 9);
  });
});

describe("tracker", () => {
  it("sun vector is a unit vector", () => {
    const [e, n, u] = sunVector(30, 120);
    expect(Math.hypot(e, n, u)).toBeCloseTo(1, 12);
  });
  it("faces east (negative) in the morning, west in the afternoon, flat at noon", () => {
    expect(trackerIdealAngle(30, 90)).toBeCloseTo(-60, 6);
    expect(trackerIdealAngle(30, 270)).toBeCloseTo(60, 6);
    expect(trackerIdealAngle(70, 180)).toBeCloseTo(0, 6);
  });
  it("limits to ±60°", () => {
    expect(trackerAngle(10, 90, { maxAngle: 60 })).toBe(-60);
    expect(trackerAngle(10, 270, { maxAngle: 60 })).toBe(60);
  });
  it("backtracking reduces rotation at low sun (pvlib example: 80° → 19.75° at GCR 0.35)", () => {
    // sun due east at elevation 10° → ideal −80°
    const bt = trackerAngle(10, 90, { backtrack: true, gcr: 0.35, maxAngle: 90 });
    const expected = -(80 - (Math.acos(Math.cos((80 * Math.PI) / 180) / 0.35) * 180) / Math.PI);
    expect(bt).toBeCloseTo(expected, 6);
    expect(bt).toBeCloseTo(-19.75, 1);
  });
  it("no backtracking needed at high sun", () => {
    expect(trackerAngle(60, 100, { backtrack: true, gcr: 0.35 })).toBeCloseTo(trackerAngle(60, 100), 9);
  });
  it("NaN at night", () => {
    expect(Number.isNaN(trackerAngle(-5, 90))).toBe(true);
  });
  it("ideal tracker incidence is perpendicular to the axis-plane component", () => {
    const rot = trackerIdealAngle(30, 100);
    const c = cosIncidenceTracker(30, 100, rot);
    const [, n] = sunVector(30, 100);
    expect(c).toBeCloseTo(Math.sqrt(1 - n * n), 9);
  });
});

describe("incidence and POA", () => {
  it("horizontal surface: cos θi = sin(elevation)", () => {
    expect(cosIncidence(40, 150, 0, 180)).toBeCloseTo(Math.sin((40 * Math.PI) / 180), 12);
  });
  it("surface facing the sun: cos θi = 1", () => {
    expect(cosIncidence(60, 180, 30, 180)).toBeCloseTo(1, 12);
  });
  it("poaBeam clamps negative incidence", () => {
    expect(poaBeam(800, -0.2)).toBe(0);
    expect(poaBeam(800, 0.5)).toBe(400);
  });
  it("poaTotal for horizontal surface equals GHI", () => {
    const el = 50;
    const ghi = 800;
    const dni = 700;
    expect(poaTotal(ghi, dni, el, Math.sin((el * Math.PI) / 180), 0)).toBeCloseTo(ghi, 6);
  });
  it("clear summer day: tracker POA beats fixed tilt; daily GHI 7–9 kWh/m²", () => {
    const d = clearSkyDay(172);
    const ghi = integrateKwh(d.map((p) => p.ghi), 0.25);
    const fixed = integrateKwh(d.map((p) => p.poaFixed), 0.25);
    const trk = integrateKwh(d.map((p) => p.poaTracker), 0.25);
    expect(ghi).toBeGreaterThan(7);
    expect(ghi).toBeLessThan(9);
    expect(trk).toBeGreaterThan(fixed * 1.15);
  });
  it("integrateKwh sums W/m² × step", () => {
    expect(integrateKwh([1000, 1000], 0.5)).toBe(1);
  });
  it("dayOfYearFrom", () => {
    expect(dayOfYearFrom(1, 1)).toBe(1);
    expect(dayOfYearFrom(6, 21)).toBe(172);
    expect(dayOfYearFrom(12, 31)).toBe(365);
  });
});
