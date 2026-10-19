/**
 * Soiling loss and cleaning interval optimisation.
 * Soiling accumulates linearly at `ratePct` %/day from a clean surface, capped at `capPct`,
 * and resets to zero at each cleaning.
 */

/** Soiling loss (%) `days` after cleaning. */
export function soilingLossAt(days: number, ratePct: number, capPct = 100): number {
  return Math.min(Math.max(0, days) * ratePct, capPct);
}

/** Daily soiling-loss series (%) for `days` days with cleaning every `interval` days. */
export function soilingSeries(days: number, ratePct: number, interval: number, capPct = 100): number[] {
  const out: number[] = [];
  for (let d = 0; d < days; d++) out.push(soilingLossAt(d % Math.max(1, interval), ratePct, capPct));
  return out;
}

/**
 * Time-averaged soiling loss (%) over a cleaning interval T (days), continuous model:
 * uncapped = r·T/2; with cap C reached at tc = C/r: (r·tc²/2 + C·(T − tc))/T.
 */
export function averageSoilingLoss(ratePct: number, intervalDays: number, capPct = 100): number {
  const T = intervalDays;
  if (T <= 0) return 0;
  if (ratePct <= 0) return 0;
  const tc = capPct / ratePct;
  if (T <= tc) return (ratePct * T) / 2;
  return ((ratePct * tc * tc) / 2 + capPct * (T - tc)) / T;
}

export interface SoilingCostInput {
  /** Soiling rate (%/day). */
  ratePct: number;
  capPct?: number;
  /** Annual energy without soiling (MWh). */
  annualEnergyMwh: number;
  /** Value of energy (currency/MWh). */
  tariff: number;
  /** Cost of one full-plant cleaning cycle (currency). */
  costPerCleaning: number;
}

export interface SoilingCost {
  intervalDays: number;
  cleaningsPerYear: number;
  avgLossPct: number;
  lostEnergyMwh: number;
  lostRevenue: number;
  cleaningCost: number;
  totalCost: number;
}

/** Annual cost breakdown for a cleaning interval. */
export function soilingCost(i: SoilingCostInput, intervalDays: number): SoilingCost {
  const avg = averageSoilingLoss(i.ratePct, intervalDays, i.capPct ?? 100);
  const lost = (i.annualEnergyMwh * avg) / 100;
  const n = 365 / intervalDays;
  const lostRevenue = lost * i.tariff;
  const cleaningCost = n * i.costPerCleaning;
  return {
    intervalDays,
    cleaningsPerYear: n,
    avgLossPct: avg,
    lostEnergyMwh: lost,
    lostRevenue,
    cleaningCost,
    totalCost: lostRevenue + cleaningCost,
  };
}

/** Cost-optimal integer interval (days) in [minDays, maxDays]. */
export function optimalInterval(i: SoilingCostInput, minDays = 1, maxDays = 365): SoilingCost {
  let best = soilingCost(i, minDays);
  for (let d = minDays + 1; d <= maxDays; d++) {
    const c = soilingCost(i, d);
    if (c.totalCost < best.totalCost) best = c;
  }
  return best;
}

/** Analytical optimum (uncapped): T* = √(2·365·C_clean / (r/100 · E · tariff)). */
export function optimalIntervalAnalytic(i: SoilingCostInput): number {
  return Math.sqrt((2 * 365 * i.costPerCleaning) / ((i.ratePct / 100) * i.annualEnergyMwh * i.tariff));
}
