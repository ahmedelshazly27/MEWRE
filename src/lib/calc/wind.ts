/** Wind resource and turbine energy calculations. */

export const RHO_STD = 1.225; // kg/m³ at 15 °C, sea level
export const R_DRY_AIR = 287.05; // J/(kg·K)

/** Wind power density (W/m²) = ½·ρ·v³. */
export function powerDensity(rho: number, v: number): number {
  return 0.5 * rho * v * v * v;
}

/** Power in the wind through a rotor of diameter D (W). */
export function windPower(rho: number, v: number, rotorDiameter: number): number {
  return powerDensity(rho, v) * Math.PI * (rotorDiameter / 2) ** 2;
}

/** Actuator-disc power coefficient Cp(a) = 4a(1 − a)². Max 16/27 at a = 1/3. */
export function betzCp(a: number): number {
  return 4 * a * (1 - a) * (1 - a);
}

/** Thrust coefficient Ct(a) = 4a(1 − a). */
export function betzCt(a: number): number {
  return 4 * a * (1 - a);
}

export const BETZ_LIMIT = 16 / 27;

/** Lanczos approximation of the gamma function Γ(z) (g = 7, n = 9). */
export function gamma(z: number): number {
  const g = 7;
  const c = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059,
    12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
  ];
  if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
  z -= 1;
  let x = c[0];
  for (let i = 1; i < g + 2; i++) x += c[i] / (z + i);
  const t = z + g + 0.5;
  return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
}

/** Weibull probability density f(v) = (k/c)(v/c)^(k−1)·exp(−(v/c)^k). */
export function weibullPdf(v: number, k: number, c: number): number {
  if (v < 0) return 0;
  if (v === 0) return k < 1 ? Infinity : k === 1 ? 1 / c : 0;
  return (k / c) * Math.pow(v / c, k - 1) * Math.exp(-Math.pow(v / c, k));
}

/** Weibull cumulative F(v) = 1 − exp(−(v/c)^k). */
export function weibullCdf(v: number, k: number, c: number): number {
  if (v <= 0) return 0;
  return 1 - Math.exp(-Math.pow(v / c, k));
}

/** Weibull mean wind speed = c·Γ(1 + 1/k). */
export function weibullMean(k: number, c: number): number {
  return c * gamma(1 + 1 / k);
}

/** Weibull scale c from mean speed and k. */
export function weibullScaleFromMean(mean: number, k: number): number {
  return mean / gamma(1 + 1 / k);
}

/** Mean power density (W/m²) of a Weibull distribution: ½ρc³Γ(1 + 3/k). */
export function weibullPowerDensity(rho: number, k: number, c: number): number {
  return 0.5 * rho * c ** 3 * gamma(1 + 3 / k);
}

export interface TurbineSpec {
  ratedKw: number;
  cutIn: number;
  rated: number;
  cutOut: number;
  rotorDiameter: number;
}

/** Generic 4.2 MW class onshore turbine (illustrative). */
export const GENERIC_TURBINE: TurbineSpec = { ratedKw: 4200, cutIn: 3, rated: 12, cutOut: 25, rotorDiameter: 150 };

/**
 * Generic power curve (kW): cubic between cut-in and rated, flat to cut-out, zero beyond.
 * Below rated, output scales with ρ/1.225 (density correction), capped at rated.
 */
export function powerCurve(v: number, t: TurbineSpec = GENERIC_TURBINE, rho = RHO_STD): number {
  if (v < t.cutIn || v >= t.cutOut) return 0;
  if (v >= t.rated) return t.ratedKw;
  const frac = (v ** 3 - t.cutIn ** 3) / (t.rated ** 3 - t.cutIn ** 3);
  return Math.min(t.ratedKw, t.ratedKw * frac * (rho / RHO_STD));
}

/** Annual energy production (MWh/yr) = 8760·∫P(v)f(v)dv, trapezoidal integration to 35 m/s. */
export function aep(k: number, c: number, t: TurbineSpec = GENERIC_TURBINE, rho = RHO_STD, availability = 1, dv = 0.05): number {
  let s = 0;
  const vmax = 35;
  let prev = powerCurve(0, t, rho) * weibullPdf(0.0001, k, c);
  for (let v = dv; v <= vmax + 1e-9; v += dv) {
    const cur = powerCurve(v, t, rho) * weibullPdf(v, k, c);
    s += 0.5 * (prev + cur) * dv;
    prev = cur;
  }
  return (s * 8760 * availability) / 1000;
}

/** Capacity factor from AEP (MWh) and rated power (kW). */
export function windCapacityFactor(aepMwh: number, ratedKw: number): number {
  return aepMwh / ((ratedKw / 1000) * 8760);
}

/** Standard-atmosphere pressure (Pa) at altitude h (m). */
export function pressureAtAltitude(h: number): number {
  return 101325 * Math.pow(1 - 2.25577e-5 * h, 5.25588);
}

/** Dry-air density (kg/m³) from temperature (°C) and altitude (m): ρ = p/(R·T). */
export function airDensity(tempC: number, altitudeM = 0): number {
  return pressureAtAltitude(altitudeM) / (R_DRY_AIR * (tempC + 273.15));
}

/** Power-law shear: v2 = v1·(h2/h1)^α. */
export function shear(v1: number, h1: number, h2: number, alpha = 0.143): number {
  return v1 * Math.pow(h2 / h1, alpha);
}

/** Shear exponent from two measurement heights: α = ln(v2/v1)/ln(h2/h1). */
export function shearExponent(v1: number, h1: number, v2: number, h2: number): number {
  return Math.log(v2 / v1) / Math.log(h2 / h1);
}
