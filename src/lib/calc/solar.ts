/**
 * Solar geometry and simple clear-sky irradiance. Angles in degrees unless stated.
 * Defaults: Kuwait (lat 29.3°N, lon 47.7°E, UTC+3).
 */

export const KUWAIT = { lat: 29.3, lon: 47.7, tz: 3 } as const;
export const SOLAR_CONSTANT = 1361; // W/m²

const D2R = Math.PI / 180;
const R2D = 180 / Math.PI;
export const sind = (x: number) => Math.sin(x * D2R);
export const cosd = (x: number) => Math.cos(x * D2R);
export const tand = (x: number) => Math.tan(x * D2R);

/** Solar declination (°) by Cooper's equation: δ = 23.45·sin(360·(284 + n)/365). */
export function declination(dayOfYear: number): number {
  return 23.45 * sind((360 * (284 + dayOfYear)) / 365);
}

/** Equation of time (minutes), Spencer/Iqbal form. */
export function equationOfTime(dayOfYear: number): number {
  const b = ((dayOfYear - 1) * 360) / 365;
  return (
    229.18 *
    (0.000075 + 0.001868 * cosd(b) - 0.032077 * sind(b) - 0.014615 * cosd(2 * b) - 0.04089 * sind(2 * b))
  );
}

/** Apparent solar time (h) from local clock time (h). */
export function solarTime(clockHour: number, dayOfYear: number, lon: number = KUWAIT.lon, tz: number = KUWAIT.tz): number {
  return clockHour + (4 * (lon - 15 * tz) + equationOfTime(dayOfYear)) / 60;
}

/** Hour angle (°) from solar time (h): ω = 15·(t_solar − 12). Negative in the morning. */
export function hourAngle(solarTimeH: number): number {
  return 15 * (solarTimeH - 12);
}

export interface SunPosition {
  /** Elevation above horizon (°). */
  elevation: number;
  /** Zenith angle (°) = 90 − elevation. */
  zenith: number;
  /** Azimuth (°) clockwise from north (90 = east, 180 = south, 270 = west). */
  azimuth: number;
  declination: number;
  hourAngle: number;
}

/** Sun position from latitude (°), declination (°) and hour angle (°). */
export function sunFromAngles(lat: number, decl: number, omega: number): SunPosition {
  const sinAlt = sind(lat) * sind(decl) + cosd(lat) * cosd(decl) * cosd(omega);
  const elevation = Math.asin(Math.max(-1, Math.min(1, sinAlt))) * R2D;
  const cosAlt = cosd(elevation);
  let azimuth: number;
  if (cosAlt < 1e-9) azimuth = 180;
  else {
    const cosAz = (sind(decl) - sinAlt * sind(lat)) / (cosAlt * cosd(lat));
    azimuth = Math.acos(Math.max(-1, Math.min(1, cosAz))) * R2D;
    if (omega > 0) azimuth = 360 - azimuth;
  }
  return { elevation, zenith: 90 - elevation, azimuth, declination: decl, hourAngle: omega };
}

/** Sun position at a local clock hour for a site. */
export function sunPosition(
  dayOfYear: number,
  clockHour: number,
  lat: number = KUWAIT.lat,
  lon: number = KUWAIT.lon,
  tz: number = KUWAIT.tz,
): SunPosition {
  const decl = declination(dayOfYear);
  const omega = hourAngle(solarTime(clockHour, dayOfYear, lon, tz));
  return sunFromAngles(lat, decl, omega);
}

/** Sunset hour angle (°): cos ωs = −tan φ · tan δ. */
export function sunsetHourAngle(lat: number, decl: number): number {
  const x = -tand(lat) * tand(decl);
  if (x <= -1) return 180;
  if (x >= 1) return 0;
  return Math.acos(x) * R2D;
}

/** Day length (h). */
export function dayLength(lat: number, dayOfYear: number): number {
  return (2 * sunsetHourAngle(lat, declination(dayOfYear))) / 15;
}

/** Kasten–Young relative air mass. */
export function airMass(zenithDeg: number): number {
  if (zenithDeg >= 90) return Infinity;
  return 1 / (cosd(zenithDeg) + 0.50572 * Math.pow(96.07995 - zenithDeg, -1.6364));
}

/** Haurwitz clear-sky GHI (W/m²): 1098·cosZ·exp(−0.057/cosZ). */
export function clearSkyGhi(zenithDeg: number): number {
  const c = cosd(zenithDeg);
  if (c <= 0) return 0;
  return 1098 * c * Math.exp(-0.057 / c);
}

/**
 * Meinel clear-sky DNI (W/m²): 1361·0.7^(AM^0.678), optionally scaled by a
 * `clarity` factor (<1 for hazy/dusty conditions).
 */
export function clearSkyDni(zenithDeg: number, clarity = 1): number {
  if (zenithDeg >= 90) return 0;
  const am = airMass(zenithDeg);
  return SOLAR_CONSTANT * Math.pow(0.7, Math.pow(am, 0.678)) * clarity;
}

/** Unit vector toward the sun in (east, north, up) coordinates. */
export function sunVector(elevation: number, azimuth: number): [number, number, number] {
  return [cosd(elevation) * sind(azimuth), cosd(elevation) * cosd(azimuth), sind(elevation)];
}

/**
 * True-tracking rotation (°) of a horizontal N-S single-axis tracker.
 * Sign convention: negative = modules face east (morning), positive = face west (afternoon).
 */
export function trackerIdealAngle(elevation: number, azimuth: number): number {
  const [e, , u] = sunVector(elevation, azimuth);
  return Math.atan2(-e, u) * R2D;
}

/**
 * Single-axis tracker rotation (°) with ±maxAngle limit and optional backtracking
 * for ground coverage ratio `gcr` (row-to-row shading avoidance, pvlib-equivalent for flat ground).
 * Returns NaN when the sun is below the horizon.
 */
export function trackerAngle(
  elevation: number,
  azimuth: number,
  opts: { maxAngle?: number; backtrack?: boolean; gcr?: number } = {},
): number {
  const { maxAngle = 60, backtrack = false, gcr = 0.35 } = opts;
  if (elevation <= 0) return NaN;
  let theta = trackerIdealAngle(elevation, azimuth);
  if (backtrack && gcr > 0) {
    const temp = Math.abs(cosd(theta) / gcr);
    if (temp < 1) theta = theta - Math.sign(theta) * Math.acos(temp) * R2D;
  }
  return Math.max(-maxAngle, Math.min(maxAngle, theta));
}

/** Cosine of incidence angle on a surface with tilt β and surface azimuth γ (from north). */
export function cosIncidence(elevation: number, azimuth: number, tilt: number, surfaceAzimuth: number): number {
  const z = 90 - elevation;
  return cosd(z) * cosd(tilt) + sind(z) * sind(tilt) * cosd(azimuth - surfaceAzimuth);
}

/** Cosine of incidence on a N-S tracker at rotation θ (sign convention as trackerIdealAngle). */
export function cosIncidenceTracker(elevation: number, azimuth: number, rotation: number): number {
  const [e, , u] = sunVector(elevation, azimuth);
  // panel normal: (−sin θ, 0, cos θ) in (E, N, U)
  return -e * sind(rotation) + u * cosd(rotation);
}

/** Beam irradiance on a plane (W/m²) = DNI·max(0, cos θi). */
export function poaBeam(dni: number, cosInc: number): number {
  return dni * Math.max(0, cosInc);
}

/**
 * Total plane-of-array irradiance (W/m²), isotropic-sky model:
 * beam + DHI·(1+cos β)/2 + GHI·ρ·(1−cos β)/2.
 */
export function poaTotal(ghi: number, dni: number, elevation: number, cosInc: number, tilt: number, albedo = 0.25): number {
  const dhi = Math.max(0, ghi - dni * Math.max(0, sind(elevation)));
  return poaBeam(dni, cosInc) + dhi * (1 + cosd(tilt)) / 2 + ghi * albedo * (1 - cosd(tilt)) / 2;
}

export interface DayPoint {
  hour: number;
  elevation: number;
  azimuth: number;
  ghi: number;
  dni: number;
  trackerAngle: number;
  poaFixed: number;
  poaTracker: number;
}

/**
 * Clear-sky day profile at `step`-hour resolution: sun position, GHI/DNI,
 * tracker rotation and POA on a fixed south-facing tilt vs a single-axis tracker.
 */
export function clearSkyDay(
  dayOfYear: number,
  opts: {
    lat?: number;
    lon?: number;
    tz?: number;
    tilt?: number;
    step?: number;
    clarity?: number;
    maxAngle?: number;
    backtrack?: boolean;
    gcr?: number;
  } = {},
): DayPoint[] {
  const { lat = KUWAIT.lat, lon = KUWAIT.lon, tz = KUWAIT.tz, tilt = 25, step = 0.25, clarity = 0.9 } = opts;
  const out: DayPoint[] = [];
  for (let h = 0; h <= 24 + 1e-9; h += step) {
    const s = sunPosition(dayOfYear, h, lat, lon, tz);
    const up = s.elevation > 0;
    const ghi = up ? clearSkyGhi(s.zenith) * (0.15 + 0.85 * clarity) : 0;
    const dni = up ? Math.min(clearSkyDni(s.zenith, clarity), ghi / Math.max(sind(s.elevation), 0.02)) : 0;
    const rot = up ? trackerAngle(s.elevation, s.azimuth, { maxAngle: opts.maxAngle, backtrack: opts.backtrack, gcr: opts.gcr }) : NaN;
    const surfAz = lat >= 0 ? 180 : 0;
    const poaFixed = up ? poaTotal(ghi, dni, s.elevation, cosIncidence(s.elevation, s.azimuth, tilt, surfAz), tilt) : 0;
    const poaTracker = up ? poaTotal(ghi, dni, s.elevation, cosIncidenceTracker(s.elevation, s.azimuth, rot), Math.abs(rot)) : 0;
    out.push({ hour: h, elevation: s.elevation, azimuth: s.azimuth, ghi, dni, trackerAngle: rot, poaFixed, poaTracker });
  }
  return out;
}

/** Integrate a W/m² series sampled every `step` hours → kWh/m². */
export function integrateKwh(values: number[], step: number): number {
  return values.reduce((a, b) => a + b, 0) * step / 1000;
}

/** Day of year (1..365) for a month (1..12) and day, non-leap. */
export function dayOfYearFrom(month: number, day: number): number {
  const cum = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  return cum[month - 1] + day;
}
