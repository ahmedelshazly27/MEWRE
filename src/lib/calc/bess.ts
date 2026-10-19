/**
 * Battery energy storage sizing, degradation and augmentation.
 * Energy in MWh, power in MW. Fractions as decimals.
 */

/** Usable energy = nameplate × depth of discharge. */
export function usableEnergy(nameplateMwh: number, dod: number): number {
  return nameplateMwh * dod;
}

/** One-way (discharge) efficiency assuming symmetric losses: √RTE. */
export function oneWayEfficiency(rte: number): number {
  return Math.sqrt(rte);
}

/** Energy delivered at the point of connection per full cycle = nameplate·DoD·√RTE·SOH. */
export function deliverableEnergy(nameplateMwh: number, dod: number, rte: number, soh = 1): number {
  return nameplateMwh * dod * oneWayEfficiency(rte) * soh;
}

/** Energy to charge for a delivered energy: E_in = E_out / RTE. */
export function chargeEnergy(deliveredMwh: number, rte: number): number {
  return deliveredMwh / rte;
}

/** Losses per cycle (MWh) = E_out·(1/RTE − 1). */
export function cycleLosses(deliveredMwh: number, rte: number): number {
  return deliveredMwh * (1 / rte - 1);
}

/** Nameplate (MWh) needed so that MW × hours is delivered at POI at beginning of life. */
export function requiredNameplate(mw: number, hours: number, dod: number, rte: number): number {
  return (mw * hours) / (dod * oneWayEfficiency(rte));
}

/** C-rate = power / nameplate energy (1/h). */
export function cRate(mw: number, nameplateMwh: number): number {
  return mw / nameplateMwh;
}

/**
 * State of health after `age` years: linear calendar fade plus cycle fade.
 * SOH = 1 − cal·age − cyclePer1000·(cycles·age/1000), floored at 0.
 */
export function stateOfHealth(age: number, calendarFadePerYear: number, cycleFadePer1000: number, cyclesPerYear: number): number {
  return Math.max(0, 1 - calendarFadePerYear * age - cycleFadePer1000 * ((cyclesPerYear * age) / 1000));
}

export interface BessInput {
  mw: number;
  hours: number;
  dod: number;
  rte: number;
  cyclesPerYear: number;
  /** Calendar fade (fraction per year), e.g. 0.01. */
  calendarFade: number;
  /** Cycle fade per 1000 full cycles (fraction), e.g. 0.03. */
  cycleFadePer1000: number;
  years: number;
  strategy: "none" | "overbuild" | "augment";
  /** Augmentation interval (years) for strategy "augment". */
  augmentInterval?: number;
}

export interface BessYear {
  year: number;
  installedMwh: number;
  augmentationMwh: number;
  availableMwh: number;
  requirementMwh: number;
  deliveredMwh: number;
  meetsRequirement: boolean;
}

export interface BessResult {
  rows: BessYear[];
  initialNameplate: number;
  totalAugmentation: number;
  totalInstalled: number;
  lifetimeDeliveredMwh: number;
  cRate: number;
  yearsShort: number;
}

/**
 * Simulate yearly deliverable energy over life with cohorts of cells.
 * Year index y = 0..years−1; a cohort installed in year y0 has age (y − y0).
 * - none: build the BOL requirement only (shortfall appears as it fades)
 * - overbuild: initial nameplate sized to meet the requirement in the final year
 * - augment: at years 0, N, 2N… add capacity so that the requirement is still met N−1 years later
 */
export function simulateBess(i: BessInput): BessResult {
  const req = i.mw * i.hours;
  const perMwh = i.dod * oneWayEfficiency(i.rte);
  const soh = (age: number) => stateOfHealth(age, i.calendarFade, i.cycleFadePer1000, i.cyclesPerYear);
  const cohorts: { year: number; mwh: number }[] = [];
  const available = (y: number) => cohorts.reduce((s, c) => s + (c.year <= y ? c.mwh * soh(y - c.year) * perMwh : 0), 0);
  const N = Math.max(1, Math.round(i.augmentInterval ?? 5));

  let initial: number;
  if (i.strategy === "overbuild") initial = req / (perMwh * Math.max(soh(i.years - 1), 0.05));
  else if (i.strategy === "augment") initial = req / (perMwh * Math.max(soh(Math.min(N, i.years) - 1), 0.05));
  else initial = req / perMwh;
  cohorts.push({ year: 0, mwh: initial });

  const rows: BessYear[] = [];
  for (let y = 0; y < i.years; y++) {
    let aug = 0;
    if (i.strategy === "augment" && y > 0 && y % N === 0) {
      const target = Math.min(y + N - 1, i.years - 1);
      const short = req - available(target);
      if (short > 1e-9) {
        aug = short / (perMwh * Math.max(soh(target - y), 0.05));
        cohorts.push({ year: y, mwh: aug });
      }
    }
    const av = available(y);
    const delivered = Math.min(av, req) * i.cyclesPerYear;
    rows.push({
      year: y + 1,
      installedMwh: cohorts.reduce((s, c) => s + (c.year <= y ? c.mwh : 0), 0),
      augmentationMwh: aug,
      availableMwh: av,
      requirementMwh: req,
      deliveredMwh: delivered,
      meetsRequirement: av >= req - 1e-6,
    });
  }
  const totalAug = cohorts.slice(1).reduce((s, c) => s + c.mwh, 0);
  return {
    rows,
    initialNameplate: initial,
    totalAugmentation: totalAug,
    totalInstalled: initial + totalAug,
    lifetimeDeliveredMwh: rows.reduce((s, r) => s + r.deliveredMwh, 0),
    cRate: cRate(i.mw, initial),
    yearsShort: rows.filter((r) => !r.meetsRequirement).length,
  };
}
