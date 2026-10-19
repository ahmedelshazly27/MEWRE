/** AC power relations, three-phase, per-unit, capacity/load factor, droop. */

export const SQRT3 = Math.sqrt(3);
const D2R = Math.PI / 180;

export interface ComplexPower {
  p: number;
  q: number;
  s: number;
  pf: number;
  /** Power-factor angle φ (°); positive = lagging (inductive). */
  phiDeg: number;
}

/** From real power P and power factor (lagging by default) → P, Q, S, φ. Units follow P (kW → kvar, kVA). */
export function fromPandPf(p: number, pf: number, lagging = true): ComplexPower {
  const cpf = Math.max(1e-9, Math.min(1, pf));
  const phi = Math.acos(cpf);
  const s = p / cpf;
  const q = p * Math.tan(phi) * (lagging ? 1 : -1);
  return { p, q, s, pf: cpf, phiDeg: (phi / D2R) * (lagging ? 1 : -1) };
}

/** From P and Q → S = √(P²+Q²), PF = P/S. */
export function fromPQ(p: number, q: number): ComplexPower {
  const s = Math.hypot(p, q);
  const pf = s === 0 ? 1 : Math.abs(p) / s;
  return { p, q, s, pf, phiDeg: Math.atan2(q, p) / D2R };
}

/** Capacitor reactive power to raise PF from pf1 to pf2 at constant P: Qc = P(tan φ1 − tan φ2). */
export function pfCorrectionKvar(p: number, pf1: number, pf2: number): number {
  return p * (Math.tan(Math.acos(pf1)) - Math.tan(Math.acos(pf2)));
}

/** Three-phase apparent power S = √3·V_L·I_L. (kV·A → kVA, kV·kA → MVA) */
export function threePhaseS(vLine: number, iLine: number): number {
  return SQRT3 * vLine * iLine;
}

/** Three-phase real power P = √3·V_L·I_L·cos φ. */
export function threePhaseP(vLine: number, iLine: number, pf: number): number {
  return SQRT3 * vLine * iLine * pf;
}

/** Line current I_L = S/(√3·V_L). */
export function lineCurrent(s: number, vLine: number): number {
  return s / (SQRT3 * vLine);
}

/** Phase (line-to-neutral) voltage of a star system: V_ph = V_L/√3. */
export function phaseVoltage(vLine: number): number {
  return vLine / SQRT3;
}

/** Line voltage from phase voltage: V_L = √3·V_ph. */
export function lineVoltage(vPhase: number): number {
  return vPhase * SQRT3;
}

/** Base impedance (Ω) = kV²/MVA. */
export function baseImpedance(kvBase: number, mvaBase: number): number {
  return (kvBase * kvBase) / mvaBase;
}

/** Base current (A) = MVA·1000/(√3·kV). */
export function baseCurrent(mvaBase: number, kvBase: number): number {
  return (mvaBase * 1000) / (SQRT3 * kvBase);
}

export function ohmsToPu(ohms: number, kvBase: number, mvaBase: number): number {
  return ohms / baseImpedance(kvBase, mvaBase);
}

export function puToOhms(pu: number, kvBase: number, mvaBase: number): number {
  return pu * baseImpedance(kvBase, mvaBase);
}

/** Change of base: Z_new = Z_old·(MVA_new/MVA_old)·(kV_old/kV_new)². */
export function changeBase(zPuOld: number, mvaOld: number, kvOld: number, mvaNew: number, kvNew: number): number {
  return zPuOld * (mvaNew / mvaOld) * Math.pow(kvOld / kvNew, 2);
}

/** Three-phase fault level (MVA) behind a per-unit impedance: S_sc = S_base / Z_pu. */
export function faultMva(mvaBase: number, zPu: number): number {
  return mvaBase / zPu;
}

/** Capacity factor = E / (P_rated · hours). Default hours = 8760. */
export function capacityFactor(energyMwh: number, ratedMw: number, hours = 8760): number {
  return energyMwh / (ratedMw * hours);
}

/** Energy (MWh) for a capacity factor. */
export function energyFromCf(cf: number, ratedMw: number, hours = 8760): number {
  return cf * ratedMw * hours;
}

/** Load factor = average load / peak load. */
export function loadFactor(averageLoad: number, peakLoad: number): number {
  return averageLoad / peakLoad;
}

/** Load factor from energy over a period: E / (P_peak · hours). */
export function loadFactorFromEnergy(energy: number, peak: number, hours: number): number {
  return energy / (peak * hours);
}

/** Instantaneous voltage of phase k (0,1,2) of a balanced set: V·√2·sin(ωt − k·120°). */
export function phaseWave(vRms: number, freqHz: number, tSec: number, k: 0 | 1 | 2, ampScale = 1): number {
  return vRms * Math.SQRT2 * ampScale * Math.sin(2 * Math.PI * freqHz * tSec - (k * 2 * Math.PI) / 3);
}

/** Phasor sum magnitude of three phases with amplitudes a, b, c at 0, −120, +120°. Zero when balanced. */
export function phasorSum(a: number, b: number, c: number): number {
  const re = a + b * Math.cos((-2 * Math.PI) / 3) + c * Math.cos((2 * Math.PI) / 3);
  const im = b * Math.sin((-2 * Math.PI) / 3) + c * Math.sin((2 * Math.PI) / 3);
  return Math.hypot(re, im);
}

/**
 * Primary frequency response with proportional droop.
 * ΔP = −(Δf_eff / f_nom) / droop · P_rated, where Δf_eff excludes the deadband.
 * Output limited by available headroom (up) and by reaching zero output (down).
 * Returns the new active power (MW).
 */
export function droopResponse(opts: {
  freqHz: number;
  fNom?: number;
  droopPct: number;
  deadbandHz?: number;
  pRated: number;
  pSetpoint: number;
  pAvailable?: number;
}): number {
  const { freqHz, fNom = 50, droopPct, deadbandHz = 0, pRated, pSetpoint } = opts;
  const pAvail = opts.pAvailable ?? pRated;
  const df = freqHz - fNom;
  const eff = Math.abs(df) <= deadbandHz ? 0 : df - Math.sign(df) * deadbandHz;
  const dp = (-(eff / fNom) / (droopPct / 100)) * pRated;
  return Math.max(0, Math.min(pAvail, pSetpoint + dp));
}
