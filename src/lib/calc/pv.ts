/**
 * PV module model (single-diode, five-parameter) and related helpers.
 *
 * The default module is a generic ~565 W bifacial-class mono PERC/TOPCon module
 * (144 half-cut cells = 72 cells in series): Isc ≈ 14 A, Voc ≈ 50 V at STC.
 * Parameters are illustrative, not a specific datasheet.
 */

export const K_BOLTZMANN = 1.380649e-23; // J/K
export const Q_ELECTRON = 1.602176634e-19; // C
export const T_STC = 25; // °C
export const G_STC = 1000; // W/m²

export interface ModuleParams {
  /** Short-circuit current at STC (A). */
  isc: number;
  /** Open-circuit voltage at STC (V). */
  voc: number;
  /** Cells in series. */
  ns: number;
  /** Diode ideality factor. */
  n: number;
  /** Series resistance (Ω, module level). */
  rs: number;
  /** Shunt resistance (Ω, module level). */
  rsh: number;
  /** Isc temperature coefficient (fraction per K, e.g. 0.0005 = +0.05 %/K). */
  alphaIsc: number;
  /** Voc temperature coefficient (fraction per K, e.g. -0.0025 = −0.25 %/K). */
  betaVoc: number;
  /** Datasheet Pmp temperature coefficient (fraction per K). Used by the simple model. */
  gammaPmp: number;
  /** Datasheet STC power (W). Used by the simple model. */
  pmpStc: number;
}

export const DEFAULT_MODULE: ModuleParams = {
  isc: 14.0,
  voc: 50.0,
  ns: 72,
  n: 1.05,
  rs: 0.1,
  rsh: 500,
  alphaIsc: 0.0005,
  betaVoc: -0.0025,
  gammaPmp: -0.003,
  pmpStc: 565,
};

/** Thermal voltage kT/q in volts at a cell temperature in °C. */
export function thermalVoltage(tempC: number): number {
  return (K_BOLTZMANN * (tempC + 273.15)) / Q_ELECTRON;
}

export interface OperatingPoint {
  /** Photo-generated current (A). */
  il: number;
  /** Diode saturation current (A). */
  i0: number;
  /** Modified ideality factor a = n·Ns·Vt (V). */
  a: number;
  rs: number;
  rsh: number;
}

/**
 * Derive single-diode parameters at irradiance G (W/m²) and cell temperature T (°C).
 * IL scales with G and α; I0 is set so that Voc at 1000 W/m² follows the β coefficient,
 * which gives the physically expected logarithmic Voc fall at low irradiance.
 */
export function operatingPoint(g: number, tempC: number, m: ModuleParams = DEFAULT_MODULE): OperatingPoint {
  const dT = tempC - T_STC;
  const a = m.n * m.ns * thermalVoltage(tempC);
  const ilRef = m.isc * (1 + m.alphaIsc * dT); // at 1000 W/m², this T
  const vocT = m.voc * (1 + m.betaVoc * dT);
  // At Voc, I = 0: IL = I0(exp(Voc/a) - 1) + Voc/Rsh
  const i0 = Math.max(ilRef - vocT / m.rsh, 1e-30) / Math.expm1(vocT / a);
  const il = ilRef * Math.max(g, 0) / G_STC;
  return { il, i0, a, rs: m.rs, rsh: m.rsh };
}

/** Residual of the implicit single-diode equation f(I) = 0 at voltage V. Monotonic decreasing in I. */
function residual(op: OperatingPoint, v: number, i: number): number {
  const vd = v + i * op.rs;
  return op.il - op.i0 * Math.expm1(vd / op.a) - vd / op.rsh - i;
}

/** Current (A) at terminal voltage V (V), solved by bisection (robust, monotonic). Clamped ≥ 0. */
export function currentAt(op: OperatingPoint, v: number): number {
  if (op.il <= 0) return 0;
  let lo = 0;
  let hi = op.il * 1.05 + 1e-9;
  if (residual(op, v, lo) <= 0) return 0; // beyond Voc
  for (let k = 0; k < 80; k++) {
    const mid = 0.5 * (lo + hi);
    if (residual(op, v, mid) > 0) lo = mid;
    else hi = mid;
  }
  return 0.5 * (lo + hi);
}

/** Open-circuit voltage (V) of an operating point. */
export function vocOf(op: OperatingPoint): number {
  if (op.il <= 0) return 0;
  let lo = 0;
  let hi = op.a * Math.log(op.il / op.i0 + 1) * 1.2 + 1;
  for (let k = 0; k < 80; k++) {
    const mid = 0.5 * (lo + hi);
    // I = 0 residual: IL - I0(exp(V/a)-1) - V/Rsh
    const r = op.il - op.i0 * Math.expm1(mid / op.a) - mid / op.rsh;
    if (r > 0) lo = mid;
    else hi = mid;
  }
  return 0.5 * (lo + hi);
}

export interface Mpp {
  vmp: number;
  imp: number;
  pmp: number;
  voc: number;
  isc: number;
  /** Fill factor Pmp/(Voc·Isc). */
  ff: number;
}

/** Maximum power point at G, T via golden-section search on P(V). */
export function mpp(g: number, tempC: number, m: ModuleParams = DEFAULT_MODULE): Mpp {
  const op = operatingPoint(g, tempC, m);
  const voc = vocOf(op);
  const isc = currentAt(op, 0);
  if (voc <= 0 || isc <= 0) return { vmp: 0, imp: 0, pmp: 0, voc: 0, isc: 0, ff: 0 };
  const phi = (Math.sqrt(5) - 1) / 2;
  let a = 0;
  let b = voc;
  let c = b - phi * (b - a);
  let d = a + phi * (b - a);
  const p = (v: number) => v * currentAt(op, v);
  let pc = p(c);
  let pd = p(d);
  for (let k = 0; k < 60; k++) {
    if (pc > pd) {
      b = d;
      d = c;
      pd = pc;
      c = b - phi * (b - a);
      pc = p(c);
    } else {
      a = c;
      c = d;
      pc = pd;
      d = a + phi * (b - a);
      pd = p(d);
    }
  }
  const vmp = 0.5 * (a + b);
  const imp = currentAt(op, vmp);
  const pmp = vmp * imp;
  return { vmp, imp, pmp, voc, isc, ff: pmp / (voc * isc) };
}

export interface IvPoint {
  v: number;
  i: number;
  p: number;
}

/** I-V / P-V curve with `points` samples from 0 to Voc. */
export function ivCurve(g: number, tempC: number, points = 60, m: ModuleParams = DEFAULT_MODULE): IvPoint[] {
  const op = operatingPoint(g, tempC, m);
  const voc = vocOf(op);
  const out: IvPoint[] = [];
  for (let k = 0; k <= points; k++) {
    const v = (voc * k) / points;
    const i = k === points ? 0 : currentAt(op, v);
    out.push({ v, i, p: v * i });
  }
  return out;
}

/** Cell temperature (°C) by the NOCT method: Tc = Ta + (NOCT − 20)/800 · G. */
export function cellTempNoct(ambientC: number, g: number, noct = 45): number {
  return ambientC + ((noct - 20) / 800) * g;
}

/** Cell temperature (°C) by the Faiman model: Tc = Ta + G/(U0 + U1·ws). Defaults U0 = 25, U1 = 6.84. */
export function cellTempFaiman(ambientC: number, g: number, windMs = 1, u0 = 25, u1 = 6.84): number {
  return ambientC + g / (u0 + u1 * windMs);
}

/** Simple datasheet power model: P = Pstc · G/1000 · (1 + γ(Tc − 25)). */
export function pmpSimple(g: number, tempC: number, m: ModuleParams = DEFAULT_MODULE): number {
  return m.pmpStc * (g / G_STC) * (1 + m.gammaPmp * (tempC - T_STC));
}

/** Temperature-corrected power: P_T = P_ref · (1 + γ(T − 25)). γ as a fraction per K (e.g. −0.003). */
export function tempCorrectedPower(pRef: number, tempC: number, gamma = -0.003): number {
  return pRef * (1 + gamma * (tempC - T_STC));
}

/**
 * Degradation factors for years 0..years (index 0 = 1.0 at installation).
 * Year 1 loses `firstYear` (LID/LeTID), each later year loses `annual` (linear).
 */
export function degradationSeries(years: number, firstYear = 0.02, annual = 0.0045): number[] {
  const out = [1];
  for (let y = 1; y <= years; y++) out.push(Math.max(0, 1 - firstYear - annual * (y - 1)));
  return out;
}
