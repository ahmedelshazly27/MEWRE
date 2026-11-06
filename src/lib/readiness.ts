import { TRACKS } from "@/content/tracks";
import type { CompetencyId } from "@/content/schema";

export type CompetencyWeights = Record<string, { label: string; weight: number }>;

/** Track 0 competencies (MEWRE PM day-one weights). Default for callers that do not pass a track. */
export const MEWRE_COMPETENCIES: CompetencyWeights = TRACKS[0].competencies;
export const JOB_WEIGHTS: Record<string, number> = Object.fromEntries(Object.entries(MEWRE_COMPETENCIES).map(([k, v]) => [k, v.weight]));

export interface ConceptInfo {
  id: string;
  competency: CompetencyId;
}

export interface CompetencyScore {
  id: CompetencyId;
  label: string;
  mastery: number; // 0..1 mean over all concepts (unassessed = 0)
  assessed: number;
  total: number;
  weight: number;
}

/** Mean mastery per competency of one track; concepts of other tracks are ignored. */
export function competencyScores(concepts: ConceptInfo[], mastery: Map<string, { mastery: number }>, competencies: CompetencyWeights = MEWRE_COMPETENCIES): CompetencyScore[] {
  return Object.keys(competencies).map((id) => {
    const cs = concepts.filter((c) => c.competency === id);
    const vals = cs.map((c) => mastery.get(c.id)?.mastery ?? 0);
    return {
      id,
      label: competencies[id].label,
      mastery: vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0,
      assessed: cs.filter((c) => mastery.has(c.id)).length,
      total: cs.length,
      weight: competencies[id].weight,
    };
  });
}

/**
 * Job readiness 0..100: 85 % from job-weighted competency mastery (competencies with no content
 * yet are excluded), 15 % from the best capstone simulation score.
 */
export function readinessScore(scores: CompetencyScore[], capstoneBest: number | null): number {
  const live = scores.filter((s) => s.total > 0);
  const wsum = live.reduce((a, s) => a + s.weight, 0);
  const comp = wsum ? live.reduce((a, s) => a + s.weight * s.mastery, 0) / wsum : 0;
  return Math.round(100 * (0.85 * comp + 0.15 * (capstoneBest ?? 0)));
}

export function readinessBand(score: number): { label: string; note: string } {
  if (score < 20) return { label: "Foundation", note: "Building the base — keep the daily streak going." };
  if (score < 45) return { label: "Developing", note: "Core vocabulary in place; deepen with exams and scenarios." };
  if (score < 70) return { label: "Capable", note: "Could contribute in meetings; close weak competencies." };
  if (score < 85) return { label: "Job-ready", note: "Ready to run work packages; polish with capstone runs." };
  return { label: "Day-one PM", note: "Performing like an experienced PM across competencies." };
}
