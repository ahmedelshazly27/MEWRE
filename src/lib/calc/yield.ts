/** Energy yield: loss waterfall, PR, specific yield, P-values, DC/AC clipping. */

export interface LossStep {
  label: string;
  /** Loss in % (positive = loss, negative = gain). */
  pct: number;
}

export interface WaterfallStep {
  label: string;
  pct: number;
  before: number;
  after: number;
  delta: number;
}

/** Multiplicative loss waterfall: after = before·(1 − pct/100). */
export function lossWaterfall(start: number, steps: LossStep[]): { steps: WaterfallStep[]; final: number; totalLossPct: number } {
  let v = start;
  const out: WaterfallStep[] = [];
  for (const s of steps) {
    const after = v * (1 - s.pct / 100);
    out.push({ label: s.label, pct: s.pct, before: v, after, delta: after - v });
    v = after;
  }
  return { steps: out, final: v, totalLossPct: start === 0 ? 0 : (1 - v / start) * 100 };
}

/** Combined factor of multiplicative losses: Π(1 − pct/100). */
export function combinedLossFactor(pcts: number[]): number {
  return pcts.reduce((f, p) => f * (1 - p / 100), 1);
}

/** Specific yield (kWh/kWp) = E_AC (kWh) / P_DC (kWp). */
export function specificYield(energyKwh: number, pdcKwp: number): number {
  return energyKwh / pdcKwp;
}

/** Performance ratio = Y_f / Y_r = (E/P_dc) / (H_poa / 1 kW/m²). H in kWh/m². */
export function performanceRatio(energyKwh: number, pdcKwp: number, hPoaKwhM2: number): number {
  return specificYield(energyKwh, pdcKwp) / hPoaKwhM2;
}

/** Standard normal z-values for one-sided exceedance probabilities. */
export const Z_EXCEEDANCE: Record<number, number> = { 50: 0, 75: 0.674, 90: 1.2816, 95: 1.645, 99: 2.326 };

/** Inverse standard normal CDF (Acklam's rational approximation, |err| < 1.2e−9 after refinement). */
export function normInv(p: number): number {
  if (p <= 0) return -Infinity;
  if (p >= 1) return Infinity;
  const a = [-3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2, 1.38357751867269e2, -3.066479806614716e1, 2.506628277459239];
  const b = [-5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2, 6.680131188771972e1, -1.328068155288572e1];
  const c = [-7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996, 3.754408661907416];
  const pl = 0.02425;
  let q: number;
  let r: number;
  if (p < pl) {
    q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  if (p > 1 - pl) {
    q = Math.sqrt(-2 * Math.log(1 - p));
    return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  q = p - 0.5;
  r = q * q;
  return ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
}

/** Standard normal pdf. */
export function normPdf(x: number): number {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

/** z-value for an exceedance level x (%): uses the tabulated values for 75/90/99, else normInv(x/100). */
export function zFor(x: number): number {
  return Z_EXCEEDANCE[x] ?? normInv(x / 100);
}

/** P_x = P50·(1 − z_x·σ), σ as a fraction of P50. */
export function pValue(p50: number, sigma: number, x: number): number {
  return p50 * (1 - zFor(x) * sigma);
}

/** Combine independent uncertainties in quadrature: √Σσ². */
export function combineUncertainties(sigmas: number[]): number {
  return Math.sqrt(sigmas.reduce((s, x) => s + x * x, 0));
}

/** Inter-annual variability reduces with averaging period: σ_N = σ_1/√N. */
export function multiYearSigma(sigma1: number, years: number): number {
  return sigma1 / Math.sqrt(years);
}

export interface ClipPoint {
  hour: number;
  dcKw: number;
  acKw: number;
  clippedKw: number;
}

/**
 * Clip a DC power profile at the inverter AC limit (with inverter efficiency).
 * `dcProfile` in kW per unit of DC capacity (0..~1); acLimit per unit of DC = 1/ratio.
 */
export function clipProfile(dcProfile: { hour: number; value: number }[], dcAcRatio: number, invEff = 0.985): ClipPoint[] {
  const acLimit = 1 / dcAcRatio;
  return dcProfile.map(({ hour, value }) => {
    const acUnclipped = value * invEff;
    const ac = Math.min(acUnclipped, acLimit);
    return { hour, dcKw: value, acKw: ac, clippedKw: acUnclipped - ac };
  });
}

/** Clipping loss fraction of AC energy for a profile. */
export function clippingLoss(points: ClipPoint[]): number {
  const total = points.reduce((s, p) => s + p.acKw + p.clippedKw, 0);
  const clipped = points.reduce((s, p) => s + p.clippedKw, 0);
  return total === 0 ? 0 : clipped / total;
}
