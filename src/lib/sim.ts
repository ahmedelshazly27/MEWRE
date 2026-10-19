/** Capstone simulation scoring. Pure functions. */
import type { SimKpi, Simulation } from "@/content/schema";

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

/** 1 when on/through target; degrades proportionally beyond it. KPI values must be positive. */
export function kpiScore(k: SimKpi, value: number): number {
  if (k.better === "higher") return k.target > 0 ? clamp01(value / k.target) : value >= k.target ? 1 : 0;
  if (value <= k.target) return 1;
  return value > 0 ? clamp01(k.target / value) : 0;
}

export function applyEffects(state: Record<string, number>, effects: Record<string, number>): Record<string, number> {
  const next = { ...state };
  for (const [k, d] of Object.entries(effects)) next[k] = (next[k] ?? 0) + d;
  return next;
}

export interface SimResult {
  kpi: number; // 0..1 mean KPI score
  decisions: number; // 0..1 mean decision quality
  total: number; // 0..1, 50/50 blend
}

export function simScore(sim: Simulation, state: Record<string, number>, decisionScores: number[]): SimResult {
  const kpi = sim.kpis.length ? sim.kpis.reduce((s, k) => s + kpiScore(k, state[k.key] ?? 0), 0) / sim.kpis.length : 0;
  const decisions = decisionScores.length ? decisionScores.reduce((a, b) => a + b, 0) / (10 * decisionScores.length) : 0;
  return { kpi, decisions: clamp01(decisions), total: clamp01(0.5 * kpi + 0.5 * decisions) };
}
