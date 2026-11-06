/**
 * Founder Core calculators: cap table and SAFE conversion, unit economics and runway, pricing, pipeline.
 * Pure functions; every widget and test uses these.
 */

// ---------------------------------------------------------------- cap table

export type HolderClass = "founder" | "pool" | "safe" | "investor";
export interface Holder {
  name: string;
  cls: HolderClass;
  shares: number;
}

export interface SafeInput {
  name: string;
  amount: number;
  /** Valuation cap (post-money cap for "post", pre-money cap for "pre"). */
  cap: number;
  /** Discount as a fraction, e.g. 0.2 for 20 %. 0 = none. */
  discount?: number;
  type: "post" | "pre";
}

export interface RoundInput {
  name: string;
  /** Pre-money valuation on a fully diluted basis that includes the post-round option pool. */
  preMoney: number;
  raise: number;
  /** Target pool (issued + unissued) as a fraction of post-money fully diluted shares. 0 = no top-up. */
  poolTarget: number;
}

export interface RoundResult {
  holders: Holder[];
  pricePerShare: number;
  newShares: number;
  poolIncrease: number;
  postMoney: number;
  /** Shares each SAFE converted into, and the price it converted at. */
  safes: { name: string; shares: number; price: number; at: "cap" | "discount" | "round" }[];
}

export const totalShares = (hs: Holder[]) => hs.reduce((s, h) => s + h.shares, 0);
export const ownership = (hs: Holder[], name: string) => {
  const t = totalShares(hs);
  return t ? hs.filter((h) => h.name === name).reduce((s, h) => s + h.shares, 0) / t : 0;
};
export const classShare = (hs: Holder[], cls: HolderClass) => {
  const t = totalShares(hs);
  return t ? hs.filter((h) => h.cls === cls).reduce((s, h) => s + h.shares, 0) / t : 0;
};

/**
 * A priced round, converting any SAFEs at the same time.
 *
 * - Post-money SAFE (YC 2018 form): conversion price at the cap = cap / Company Capitalization, where Company
 *   Capitalization counts all existing shares, the existing pool and all converting SAFEs, but NOT the pool
 *   increase made for this round. So SAFE holders are not diluted by each other or by the top-up.
 * - Pre-money SAFE: cap price = cap / (existing shares + existing pool + pool increase), i.e. SAFEs dilute each other.
 * - Discount: the SAFE converts at the lower of the cap price and (1 − discount) × round price.
 * - New pool: topped up so the whole pool is `poolTarget` of post-money fully diluted shares.
 * - Round price = post-money / post-money fully diluted shares.
 * Solved by fixed-point iteration (SAFE shares, pool and price depend on each other).
 */
export function pricedRound(before: Holder[], round: RoundInput, safes: SafeInput[] = []): RoundResult {
  const existing = totalShares(before);
  const pool0 = before.filter((h) => h.cls === "pool").reduce((s, h) => s + h.shares, 0);
  const postMoney = round.preMoney + round.raise;
  const r = postMoney > 0 ? round.raise / postMoney : 0;
  let safeShares = safes.map(() => 0);
  let poolIncrease = 0;
  let N = existing;
  let price = round.preMoney / Math.max(1, existing);
  let at: ("cap" | "discount" | "round")[] = safes.map(() => "round");
  let prices = safes.map(() => price);
  for (let it = 0; it < 200; it++) {
    const safeTotal = safeShares.reduce((a, b) => a + b, 0);
    const S = existing + safeTotal; // capitalization before the round, before the pool top-up
    // N = S + ΔP + rN with ΔP = max(0, poolTarget·N − pool0)
    let n = S / (1 - r);
    let dp = 0;
    if (round.poolTarget > 0 && round.poolTarget * n > pool0) {
      n = (S - pool0) / (1 - round.poolTarget - r);
      dp = round.poolTarget * n - pool0;
    }
    const p = n > 0 ? postMoney / n : 0;
    const postCapBasis = S; // excludes the pool increase
    const preCapBasis = existing + dp;
    const nextAt: typeof at = [];
    const nextPrices: number[] = [];
    const next = safes.map((sf) => {
      const capPrice = sf.cap > 0 ? sf.cap / (sf.type === "post" ? postCapBasis : preCapBasis) : Infinity;
      const discPrice = sf.discount ? p * (1 - sf.discount) : Infinity;
      let cp = Math.min(capPrice, discPrice, p);
      if (!Number.isFinite(cp) || cp <= 0) cp = p;
      nextAt.push(cp === capPrice ? "cap" : cp === discPrice ? "discount" : "round");
      nextPrices.push(cp);
      return sf.amount / cp;
    });
    const delta = next.reduce((a, b, i) => a + Math.abs(b - safeShares[i]), 0) + Math.abs(n - N);
    safeShares = next;
    poolIncrease = dp;
    N = n;
    price = p;
    at = nextAt;
    prices = nextPrices;
    if (delta < 1e-6) break;
  }
  const newShares = round.raise / price;
  const holders: Holder[] = [
    ...before.map((h) => (h.cls === "pool" ? { ...h, shares: h.shares + poolIncrease } : { ...h })),
    ...(pool0 === 0 && poolIncrease > 0 ? [{ name: "Option pool", cls: "pool" as const, shares: poolIncrease }] : []),
    ...safes.map((sf, i) => ({ name: sf.name, cls: "safe" as const, shares: safeShares[i] })),
    { name: round.name, cls: "investor", shares: newShares },
  ];
  return {
    holders,
    pricePerShare: price,
    newShares,
    poolIncrease,
    postMoney,
    safes: safes.map((sf, i) => ({ name: sf.name, shares: safeShares[i], price: prices[i], at: at[i] })),
  };
}

/** Ownership a post-money SAFE implies before any priced round: amount / post-money cap. */
export const postMoneySafeOwnership = (amount: number, cap: number) => (cap > 0 ? amount / cap : 0);

export interface SeedComparison {
  label: string;
  afterSeed: number;
  afterSeriesA: number;
}

/**
 * Founder ownership for the same seed raise done three ways, then the same Series A.
 * Founders start with `founderShares` and a pre-seed pool of `pool0` shares.
 */
export function compareSeedInstruments(opts: {
  founderShares: number;
  pool0: number;
  raise: number;
  cap: number;
  discount: number;
  seriesA: RoundInput;
}): SeedComparison[] {
  const base: Holder[] = [
    { name: "Founders", cls: "founder", shares: opts.founderShares },
    { name: "Option pool", cls: "pool", shares: opts.pool0 },
  ];
  // SAFE paths: before the A, SAFE holders own nothing yet (post-money SAFE implies amount/cap)
  const post = pricedRound(base, opts.seriesA, [{ name: "Seed SAFE", amount: opts.raise, cap: opts.cap, discount: opts.discount, type: "post" }]);
  const pre = pricedRound(base, opts.seriesA, [{ name: "Seed SAFE", amount: opts.raise, cap: opts.cap, discount: opts.discount, type: "pre" }]);
  // priced seed with the same post-money as the post-money SAFE cap
  const seed = pricedRound(base, { name: "Seed", preMoney: Math.max(1, opts.cap - opts.raise), raise: opts.raise, poolTarget: 0 });
  const seedThenA = pricedRound(seed.holders, opts.seriesA);
  const f0 = ownership(base, "Founders");
  return [
    { label: "Post-money SAFE", afterSeed: f0 * (1 - postMoneySafeOwnership(opts.raise, opts.cap)), afterSeriesA: ownership(post.holders, "Founders") },
    { label: "Pre-money SAFE", afterSeed: f0 * (1 - opts.raise / (opts.cap + opts.raise)), afterSeriesA: ownership(pre.holders, "Founders") },
    { label: "Priced seed", afterSeed: ownership(seed.holders, "Founders"), afterSeriesA: ownership(seedThenA.holders, "Founders") },
  ];
}

// ---------------------------------------------------------------- unit economics and runway

export interface UnitEconomicsInput {
  /** Revenue per account per month. */
  arpa: number;
  /** Gross margin as a fraction. */
  grossMargin: number;
  /** Fully loaded acquisition cost per new account. */
  cac: number;
  /** Monthly logo churn as a fraction. */
  churn: number;
}

export interface UnitEconomics {
  /** Gross-margin lifetime value: ARPA × GM / churn. */
  ltv: number;
  ltvToCac: number;
  /** Months of gross profit to recover CAC: CAC / (ARPA × GM). */
  paybackMonths: number;
  /** Expected customer lifetime in months: 1 / churn. */
  lifetimeMonths: number;
}

export function unitEconomics(u: UnitEconomicsInput): UnitEconomics {
  const gp = u.arpa * u.grossMargin;
  const ltv = u.churn > 0 ? gp / u.churn : Infinity;
  return {
    ltv,
    ltvToCac: u.cac > 0 ? ltv / u.cac : Infinity,
    paybackMonths: gp > 0 ? u.cac / gp : Infinity,
    lifetimeMonths: u.churn > 0 ? 1 / u.churn : Infinity,
  };
}

export interface RunwayInput {
  cash: number;
  /** Monthly operating expenses excluding cost of goods (held flat). */
  opex: number;
  /** Current monthly revenue. */
  revenue: number;
  /** Monthly revenue growth as a fraction. */
  growth: number;
  grossMargin: number;
  months?: number;
}

export interface RunwayResult {
  rows: { month: number; cash: number; revenue: number; netBurn: number }[];
  /** First month in which cash goes negative, or null if it never does in the horizon. */
  runwayMonths: number | null;
  /** First month where gross profit covers opex, or null. */
  breakevenMonth: number | null;
  /** Paul Graham's test: reaches breakeven on current growth and costs before running out of cash. */
  defaultAlive: boolean;
}

export function runway(i: RunwayInput): RunwayResult {
  const horizon = i.months ?? 60;
  const rows: RunwayResult["rows"] = [];
  let cash = i.cash;
  let runwayMonths: number | null = null;
  let breakevenMonth: number | null = null;
  for (let m = 0; m <= horizon; m++) {
    const revenue = i.revenue * Math.pow(1 + i.growth, m);
    const netBurn = i.opex - revenue * i.grossMargin;
    rows.push({ month: m, cash, revenue, netBurn });
    if (breakevenMonth === null && netBurn <= 0) breakevenMonth = m;
    if (m < horizon) {
      cash -= netBurn;
      if (runwayMonths === null && cash < 0) runwayMonths = m + 1;
    }
  }
  const defaultAlive = breakevenMonth !== null && (runwayMonths === null || breakevenMonth < runwayMonths);
  return { rows, runwayMonths, breakevenMonth, defaultAlive };
}

/** Burn multiple: net burn / net new ARR over the same period (lower is better; < 1 is excellent). */
export const burnMultiple = (netBurn: number, netNewArr: number) => (netNewArr > 0 ? netBurn / netNewArr : Infinity);

/** Net revenue retention: (start ARR + expansion − contraction − churn) / start ARR. */
export const nrr = (startArr: number, expansion: number, contraction: number, churned: number) =>
  startArr > 0 ? (startArr + expansion - contraction - churned) / startArr : 0;

// ---------------------------------------------------------------- pricing

/** Constant-elasticity demand: Q(p) = Q0 · (p / p0)^(−e). */
export const demand = (p: number, p0: number, q0: number, e: number) => (p > 0 ? q0 * Math.pow(p / p0, -e) : 0);

/**
 * Profit-maximising price for constant elasticity e > 1 and unit cost c (Lerner rule):
 * (p − c) / p = 1 / e  →  p* = c · e / (e − 1). No finite optimum when e ≤ 1 (raise prices).
 */
export const optimalPrice = (unitCost: number, e: number) => (e > 1 ? (unitCost * e) / (e - 1) : Infinity);

export function pricePoint(p: number, p0: number, q0: number, e: number, unitCost: number) {
  const q = demand(p, p0, q0, e);
  return { price: p, quantity: q, revenue: p * q, contribution: (p - unitCost) * q };
}

/**
 * Sample size per arm to detect a change in conversion rate from p1 to p2 (two-sided α, power 1 − β):
 * n = (z_{α/2} + z_β)² · (p1(1 − p1) + p2(1 − p2)) / (p1 − p2)². Defaults: α = 0.05, power = 0.8.
 */
export function abSampleSize(p1: number, p2: number, zAlpha = 1.959964, zBeta = 0.841621): number {
  const d = p1 - p2;
  if (d === 0) return Infinity;
  return Math.ceil(((zAlpha + zBeta) ** 2 * (p1 * (1 - p1) + p2 * (1 - p2))) / (d * d));
}

// ---------------------------------------------------------------- pipeline

export interface PipelineStage {
  name: string;
  deals: number;
  /** Average deal value (annual contract value). */
  value: number;
  /** Probability that a deal at this stage closes. */
  probability: number;
  /** Months until a deal at this stage typically closes. */
  monthsToClose: number;
}

export interface PipelineForecast {
  weighted: number;
  unweighted: number;
  /** Unweighted pipeline / target. Rule of thumb: 3–4× for early B2B. */
  coverage: number;
  /** Expected bookings per quarter (index 0 = this quarter). */
  byQuarter: number[];
  /** Weighted pipeline / target. */
  weightedCoverage: number;
}

export function forecastPipeline(stages: PipelineStage[], target: number, quarters = 4): PipelineForecast {
  const byQuarter = new Array(quarters).fill(0);
  let weighted = 0;
  let unweighted = 0;
  for (const s of stages) {
    const v = s.deals * s.value;
    unweighted += v;
    weighted += v * s.probability;
    const q = Math.min(quarters - 1, Math.floor(s.monthsToClose / 3));
    byQuarter[q] += v * s.probability;
  }
  return { weighted, unweighted, coverage: target > 0 ? unweighted / target : 0, weightedCoverage: target > 0 ? weighted / target : 0, byQuarter };
}

/** Sales velocity per day: opportunities × win rate × average deal value / cycle length (days). */
export const salesVelocity = (opps: number, winRate: number, acv: number, cycleDays: number) => (cycleDays > 0 ? (opps * winRate * acv) / cycleDays : 0);
