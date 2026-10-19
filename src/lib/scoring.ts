import type { Question } from "@/content/schema";

/** Learner responses, by question type. */
export type Response =
  | { type: "mcq"; choice: number }
  | { type: "multi"; choices: number[] }
  | { type: "numeric"; value: number | string }
  | { type: "order"; items: string[] }
  | { type: "decision"; choice: number }
  | { type: "label"; labels: Record<string, string> }
  /** Short answers are graded externally (AI or rubric self-grade) and passed in as a 0..1 score. */
  | { type: "short"; text: string; score: number };

export interface Grade {
  /** 0..1 partial credit. */
  score: number;
  /** Counts as correct for the error log / streaks. */
  correct: boolean;
}

/** Score threshold at which a partially-credited answer counts as correct. */
export const CORRECT_THRESHOLD = 0.8;

export const DEFAULT_TOLERANCE = { rel: 0.02 };

/** Parses "1,234.5", " 12.3 ", "1.2e3", "−5" (unicode minus). Returns NaN if unparsable. */
export function parseNumber(input: number | string): number {
  if (typeof input === "number") return input;
  const cleaned = input.trim().replace(/[−–]/g, "-").replace(/,/g, "").replace(/\s+/g, "");
  if (!cleaned || !/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?%?$/i.test(cleaned)) return NaN;
  return parseFloat(cleaned.replace("%", ""));
}

export function toleranceFor(answer: number, tolerance?: { abs?: number; rel?: number }): number {
  const t: { abs?: number; rel?: number } = tolerance ?? DEFAULT_TOLERANCE;
  const rel = t.rel ?? (t.abs === undefined ? DEFAULT_TOLERANCE.rel : 0);
  const tol = Math.max(t.abs ?? 0, rel * Math.abs(answer));
  return tol > 0 ? tol : 1e-9;
}

export function numericCorrect(value: number | string, answer: number, tolerance?: { abs?: number; rel?: number }): boolean {
  const v = parseNumber(value);
  if (!Number.isFinite(v)) return false;
  return Math.abs(v - answer) <= toleranceFor(answer, tolerance) + 1e-12;
}

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

function result(score: number): Grade {
  const s = clamp01(score);
  return { score: s, correct: s >= CORRECT_THRESHOLD - 1e-9 };
}

export function gradeQuestion(q: Question, r: Response): Grade {
  if (q.type !== r.type) throw new Error(`Response type ${r.type} does not match question ${q.id} (${q.type})`);
  switch (q.type) {
    case "mcq":
      return result((r as { choice: number }).choice === q.answer ? 1 : 0);
    case "multi": {
      const chosen = new Set((r as { choices: number[] }).choices);
      const right = new Set(q.answer);
      let hits = 0;
      let wrong = 0;
      for (const c of chosen) (right.has(c) ? hits++ : wrong++);
      if (hits === right.size && wrong === 0) return { score: 1, correct: true };
      // Partial credit: right picks minus wrong picks, never counted as correct unless exact.
      return { score: clamp01((hits - wrong) / right.size), correct: false };
    }
    case "numeric":
      return result(numericCorrect((r as { value: number | string }).value, q.answer, q.tolerance) ? 1 : 0);
    case "order": {
      const items = (r as { items: string[] }).items;
      if (items.length !== q.items.length) return result(0);
      // Fraction of adjacent pairs in the right relative order — rewards nearly-right sequences.
      const pos = new Map(q.items.map((it, i) => [it, i]));
      let good = 0;
      for (let i = 0; i < items.length - 1; i++) if ((pos.get(items[i]) ?? -1) < (pos.get(items[i + 1]) ?? -1)) good++;
      const exact = items.every((it, i) => it === q.items[i]);
      return exact ? { score: 1, correct: true } : { score: good / (items.length - 1), correct: false };
    }
    case "decision": {
      const opt = q.options[(r as { choice: number }).choice];
      return result(opt ? opt.score : 0);
    }
    case "label": {
      const labels = (r as { labels: Record<string, string> }).labels;
      const right = q.markers.filter((m) => labels[m.id] === m.answer).length;
      return result(q.markers.length ? right / q.markers.length : 0);
    }
    case "short":
      return result((r as { score: number }).score);
  }
}

/** Human-readable correct answer, for feedback and the error log. */
export function correctAnswerText(q: Question): string {
  switch (q.type) {
    case "mcq":
      return q.options[q.answer];
    case "multi":
      return q.answer.map((i) => q.options[i]).join("; ");
    case "numeric":
      return `${q.answer}${q.unit ? ` ${q.unit}` : ""}`;
    case "order":
      return q.items.map((it, i) => `${i + 1}. ${it}`).join("  ");
    case "decision": {
      const best = q.options.reduce((a, b) => (b.score > a.score ? b : a));
      return best.text;
    }
    case "label":
      return q.markers.map((m) => `${m.id} → ${m.answer}`).join("; ");
    case "short":
      return q.modelAnswer;
  }
}

/** Scenario score: sum of choice scores along the path divided by 10 per step. */
export function scenarioScore(choiceScores: number[]): number {
  if (!choiceScores.length) return 0;
  return clamp01(choiceScores.reduce((a, b) => a + b, 0) / (10 * choiceScores.length));
}
