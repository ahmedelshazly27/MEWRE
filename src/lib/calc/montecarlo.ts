/** Seeded Monte Carlo for schedule and cost risk. */
import { type Activity, topoSort, projectDuration } from "./cpm";

/** mulberry32 seeded PRNG → function returning uniform [0, 1). */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Inverse-CDF of the triangular distribution for u in [0,1]. */
export function triangularInv(u: number, min: number, mode: number, max: number): number {
  if (max <= min) return min;
  const fc = (mode - min) / (max - min);
  if (u < fc) return min + Math.sqrt(u * (max - min) * (mode - min));
  return max - Math.sqrt((1 - u) * (max - min) * (max - mode));
}

/** Sample a triangular distribution. */
export function triangular(rng: () => number, min: number, mode: number, max: number): number {
  return triangularInv(rng(), min, mode, max);
}

/** Mean of a triangular distribution = (a + m + b)/3. */
export function triangularMean(min: number, mode: number, max: number): number {
  return (min + mode + max) / 3;
}

/** PERT mean (a + 4m + b)/6, for comparison. */
export function pertMean(min: number, mode: number, max: number): number {
  return (min + 4 * mode + max) / 6;
}

/** Percentile (0..100) of an ascending-sorted array, linear interpolation. */
export function percentile(sorted: number[], p: number): number {
  if (!sorted.length) return NaN;
  const idx = (p / 100) * (sorted.length - 1);
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo);
}

export interface HistBin {
  x0: number;
  x1: number;
  mid: number;
  count: number;
  /** Cumulative fraction ≤ x1. */
  cum: number;
}

/** Equal-width histogram. */
export function histogram(values: number[], bins = 20): HistBin[] {
  if (!values.length) return [];
  let min = Infinity;
  let max = -Infinity;
  for (const v of values) {
    if (v < min) min = v;
    if (v > max) max = v;
  }
  if (max === min) max = min + 1;
  const w = (max - min) / bins;
  const counts = new Array(bins).fill(0);
  for (const v of values) counts[Math.min(bins - 1, Math.floor((v - min) / w))]++;
  let cum = 0;
  return counts.map((c, k) => {
    cum += c;
    return { x0: min + k * w, x1: min + (k + 1) * w, mid: min + (k + 0.5) * w, count: c, cum: cum / values.length };
  });
}

export interface Estimate {
  min: number;
  likely: number;
  max: number;
}

export interface McSummary {
  samples: number[];
  sorted: number[];
  mean: number;
  p10: number;
  p50: number;
  p80: number;
  p90: number;
  deterministic: number;
}

function summarize(samples: number[], deterministic: number): McSummary {
  const sorted = [...samples].sort((a, b) => a - b);
  return {
    samples,
    sorted,
    mean: samples.reduce((a, b) => a + b, 0) / samples.length,
    p10: percentile(sorted, 10),
    p50: percentile(sorted, 50),
    p80: percentile(sorted, 80),
    p90: percentile(sorted, 90),
    deterministic,
  };
}

/** Schedule Monte Carlo over an activity network; each activity has a triangular estimate. */
export function simulateSchedule(
  acts: (Activity & { estimate?: Estimate })[],
  iterations = 2000,
  seed = 42,
): McSummary & { criticality: Record<string, number> } {
  const order = topoSort(acts);
  const rng = mulberry32(seed);
  const samples: number[] = [];
  const critCount: Record<string, number> = Object.fromEntries(acts.map((a) => [a.id, 0]));
  const deterministic = projectDuration(acts, order, Object.fromEntries(acts.map((a) => [a.id, a.estimate?.likely ?? a.duration])));
  for (let n = 0; n < iterations; n++) {
    const d: Record<string, number> = {};
    for (const a of acts) {
      const e = a.estimate;
      d[a.id] = e ? triangular(rng, e.min, e.likely, e.max) : a.duration;
    }
    const total = projectDuration(acts, order, d);
    samples.push(total);
    // criticality index: share of iterations in which each activity has zero total float
    markCritical(acts, order, d, total, critCount);
  }
  const criticality: Record<string, number> = {};
  for (const k of Object.keys(critCount)) criticality[k] = critCount[k] / iterations;
  return { ...summarize(samples, deterministic), criticality };
}

function markCritical(acts: Activity[], order: string[], d: Record<string, number>, total: number, count: Record<string, number>) {
  const ef = new Map<string, number>();
  const preds = new Map(acts.map((a) => [a.id, (a.preds ?? []).map((p) => (typeof p === "string" ? { id: p, lag: 0 } : { id: p.id, lag: p.lag ?? 0 }))]));
  for (const id of order) {
    let s = 0;
    for (const p of preds.get(id)!) s = Math.max(s, ef.get(p.id)! + p.lag);
    ef.set(id, s + d[id]);
  }
  const lf = new Map<string, number>();
  for (const id of order) lf.set(id, total);
  for (let k = order.length - 1; k >= 0; k--) {
    const id = order[k];
    const ls = lf.get(id)! - d[id];
    for (const p of preds.get(id)!) lf.set(p.id, Math.min(lf.get(p.id)!, ls - p.lag));
  }
  for (const id of order) if (Math.abs(lf.get(id)! - ef.get(id)!) < 1e-9) count[id]++;
}

/** Cost Monte Carlo: sum of independent triangular cost items. */
export function simulateSum(items: Estimate[], iterations = 2000, seed = 42): McSummary {
  const rng = mulberry32(seed);
  const samples: number[] = [];
  for (let n = 0; n < iterations; n++) {
    let s = 0;
    for (const it of items) s += triangular(rng, it.min, it.likely, it.max);
    samples.push(s);
  }
  return summarize(samples, items.reduce((a, b) => a + b.likely, 0));
}
