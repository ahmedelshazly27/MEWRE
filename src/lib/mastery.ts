/**
 * Concept mastery model.
 *
 * mastery = recencyWeightedAccuracy × confidence(evidence) × retention(time since last evidence)
 *
 * - Recency weighting: the latest answer counts most (weight 0.75^k for the k-th most recent).
 * - Confidence: one lucky answer is not mastery; shrinks toward 0 until ~5 pieces of evidence.
 * - Retention: mastery fades without practice; the half-life grows with the amount of evidence.
 */

export interface Evidence {
  /** 0..1 */
  score: number;
  /** epoch ms */
  at: number;
  /** Relative weight of the source (diagnostic 0.6, flashcard 0.5, quiz/exam 1). */
  weight?: number;
}

export const RECENCY = 0.75;
const DAY = 86_400_000;

export function weightedAccuracy(evidence: Evidence[]): number {
  if (!evidence.length) return 0;
  const sorted = [...evidence].sort((a, b) => b.at - a.at);
  let num = 0;
  let den = 0;
  sorted.forEach((e, k) => {
    const w = Math.pow(RECENCY, k) * (e.weight ?? 1);
    num += w * e.score;
    den += w;
  });
  return den ? num / den : 0;
}

export function confidence(evidence: Evidence[]): number {
  const n = evidence.reduce((s, e) => s + (e.weight ?? 1), 0);
  return 1 - Math.exp(-n / 2);
}

export function retention(evidence: Evidence[], now: number): number {
  if (!evidence.length) return 0;
  const last = Math.max(...evidence.map((e) => e.at));
  const days = Math.max(0, (now - last) / DAY);
  const n = evidence.reduce((s, e) => s + (e.weight ?? 1), 0);
  const halfLife = 14 * (1 + Math.min(n, 12) / 2); // 14 days for 0 evidence → 98 days at 12+
  const decay = Math.pow(0.5, days / halfLife);
  return 0.6 + 0.4 * decay; // knowledge never fully disappears from the estimate
}

export function conceptMastery(evidence: Evidence[], now: number = Date.now()): number {
  if (!evidence.length) return 0;
  return weightedAccuracy(evidence) * confidence(evidence) * retention(evidence, now);
}

export type MasteryLevel = "not-started" | "novice" | "developing" | "proficient" | "mastered";

export function masteryLevel(m: number, hasEvidence: boolean): MasteryLevel {
  if (!hasEvidence) return "not-started";
  if (m < 0.35) return "novice";
  if (m < 0.6) return "developing";
  if (m < 0.8) return "proficient";
  return "mastered";
}

export const LEVEL_LABEL: Record<MasteryLevel, string> = {
  "not-started": "Not started",
  novice: "Novice",
  developing: "Developing",
  proficient: "Proficient",
  mastered: "Mastered",
};

export const SOURCE_WEIGHT: Record<string, number> = {
  diagnostic: 0.6,
  quiz: 1,
  inline: 0.8,
  exam: 1.2,
  mixed: 1,
  timed: 1.2,
  errors: 1,
  scenario: 1,
  sim: 1,
  card: 0.5,
  feynman: 0.8,
};

/** Flashcard rating (1 Again .. 4 Easy) → evidence score. */
export function ratingScore(rating: number): number {
  return [0, 0, 0.6, 0.9, 1][rating] ?? 0;
}
