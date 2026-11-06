/**
 * Mizan calculators: weather-corrected performance ratio, soiling inferred from operational data,
 * stow decision economics. Pure functions. Cleaning-interval optimisation lives in ./soiling (Track 0).
 */

export interface PlantInterval {
  /** AC energy in the interval (kWh). */
  energy: number;
  /** Plane-of-array irradiance (W/m²), interval average. */
  gPoa: number;
  /** Cell (or module back-of-module) temperature (°C). */
  tCell: number;
  /** Interval length in hours. */
  hours: number;
}

/** Cell temperature from ambient with the NOCT model: T_cell = T_amb + (NOCT − 20) / 800 · G. */
export const cellTempNoct = (tAmb: number, g: number, noct = 45) => tAmb + ((noct - 20) / 800) * g;

/** Basic PR: E_ac / (P_STC · H_poa / G_STC). */
export function performanceRatio(rows: PlantInterval[], pStcKw: number): number {
  const e = rows.reduce((s, r) => s + r.energy, 0);
  const expected = rows.reduce((s, r) => s + pStcKw * (r.gPoa / 1000) * r.hours, 0);
  return expected > 0 ? e / expected : 0;
}

/**
 * Weather-corrected PR (NREL, Dierauf et al. 2013): each interval's expected energy is corrected for the difference
 * between its cell temperature and the irradiance-weighted average cell temperature of a reference period:
 * PR_corr = Σ E / Σ [P_STC · G/G_STC · (1 + γ (T_cell − T_ref)) · h], with γ the power temperature coefficient (1/°C,
 * negative). Removes the seasonal swing so a soiling or degradation trend shows.
 */
export function weatherCorrectedPR(rows: PlantInterval[], pStcKw: number, gamma: number, tRef: number): number {
  const e = rows.reduce((s, r) => s + r.energy, 0);
  const expected = rows.reduce((s, r) => s + pStcKw * (r.gPoa / 1000) * (1 + gamma * (r.tCell - tRef)) * r.hours, 0);
  return expected > 0 ? e / expected : 0;
}

/** Irradiance-weighted average cell temperature, the usual T_ref for weather-corrected PR. */
export function irradianceWeightedTemp(rows: PlantInterval[]): number {
  const w = rows.reduce((s, r) => s + r.gPoa * r.hours, 0);
  return w > 0 ? rows.reduce((s, r) => s + r.tCell * r.gPoa * r.hours, 0) / w : 25;
}

/**
 * Soiling ratio inferred from operational data (IEC 61724-1 concept: soiled output / clean output):
 * SR = PR_corr(now) / PR_corr(just after cleaning). Soiling loss = 1 − SR.
 */
export const soilingRatio = (prNow: number, prClean: number) => (prClean > 0 ? prNow / prClean : 1);

/**
 * Daily soiling rate from a series of daily soiling ratios since the last cleaning, by least squares through
 * the clean point: SR(d) ≈ 1 − r·d → r = −Σ d (SR − 1) / Σ d². Returns fraction per day.
 */
export function soilingRate(days: number[], sr: number[]): number {
  let num = 0;
  let den = 0;
  for (let i = 0; i < Math.min(days.length, sr.length); i++) {
    num += days[i] * (sr[i] - 1);
    den += days[i] * days[i];
  }
  return den > 0 ? -num / den : 0;
}

// ---------------------------------------------------------------- stow decisions

export interface StowInput {
  /** Forecast wind speed (m/s) at tracker height. */
  wind: number;
  /** Wind speed at which the tracker vendor requires stow (m/s). */
  stowThreshold: number;
  /** Logistic spread of damage probability around 1.25 × threshold (m/s), default 1. */
  spread?: number;
  /** Cost of structural damage to the block if it is not stowed and the gust exceeds capacity (USD). */
  damageCost: number;
  /** Plant capacity affected (MWac). */
  mw: number;
  /** Hours the stow lasts. */
  hours: number;
  /** Fraction of output lost while stowed (flat stow vs tracking, depends on sun position). */
  yieldLossWhileStowed: number;
  /** Average plant output while tracking, as a fraction of MWac (capacity factor over those hours). */
  outputFraction: number;
  /** Energy value (USD/MWh). */
  tariff: number;
  /** Dust event: extra soiling loss avoided by stowing at a steep angle (fraction of output for the next days). */
  soilingAvoided?: number;
  /** Days until the next cleaning, over which avoided soiling counts. */
  daysToCleaning?: number;
}

export interface StowResult {
  damageProbability: number;
  expectedDamageCost: number;
  lostRevenue: number;
  soilingBenefit: number;
  /** Positive: stowing is worth it. */
  netBenefitOfStow: number;
  decision: "stow" | "track";
}

/**
 * Expected-cost stow rule: stow when P(damage | wind) · damage cost + avoided soiling value > lost revenue while stowed.
 * Damage probability is a logistic curve centred at 1.25 × the vendor stow threshold (illustrative).
 */
export function stowDecision(i: StowInput): StowResult {
  const spread = i.spread ?? 1;
  const p = 1 / (1 + Math.exp(-(i.wind - 1.25 * i.stowThreshold) / spread));
  const expectedDamageCost = p * i.damageCost;
  const lostRevenue = i.mw * i.hours * i.outputFraction * i.yieldLossWhileStowed * i.tariff;
  const soilingBenefit = (i.soilingAvoided ?? 0) * i.mw * 24 * (i.daysToCleaning ?? 0) * i.outputFraction * i.tariff;
  const net = expectedDamageCost + soilingBenefit - lostRevenue;
  // vendor threshold is a hard rule: always stow above it
  const decision = i.wind >= i.stowThreshold || net > 0 ? "stow" : "track";
  return { damageProbability: p, expectedDamageCost, lostRevenue, soilingBenefit, netBenefitOfStow: net, decision };
}
