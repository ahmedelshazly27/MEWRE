/** Question selection for exams, mixed (interleaved) practice and the diagnostic. Pure functions. */
import type { Module, Question } from "@/content/schema";

export function rng(seed: number) {
  let a = seed >>> 0 || 1;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle<T>(items: T[], seed: number): T[] {
  const r = rng(seed);
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Module exam: every exam-bank question plus random lesson-quiz questions, up to n. */
export function pickExamQuestions(m: Module, n: number, seed: number): Question[] {
  return pickExamFrom(m.exam, m.lessons.flatMap((l) => l.quiz), n, seed);
}

export function pickExamFrom(bank: Question[], lessonQs: Question[], n: number, seed: number): Question[] {
  const out = [...bank.slice(0, n)];
  for (const q of shuffle(lessonQs, seed)) {
    if (out.length >= n) break;
    out.push(q);
  }
  return shuffle(out, seed + 1);
}

export interface PoolItem {
  question: Question;
  moduleId: string;
}

/**
 * Interleaved practice: weighted sampling without replacement favouring weak concepts and the
 * error log, then reordered so consecutive questions come from different modules where possible.
 */
export function pickMixed(opts: {
  pool: PoolItem[];
  mastery: Map<string, { mastery: number }>;
  errorIds: Set<string>;
  n: number;
  seed: number;
}): PoolItem[] {
  const { pool, mastery, errorIds, n, seed } = opts;
  const r = rng(seed);
  const weight = (p: PoolItem) => {
    const ms = p.question.concepts.map((c) => mastery.get(c)?.mastery ?? 0);
    const avg = ms.length ? ms.reduce((a, b) => a + b, 0) / ms.length : 0;
    return 1 + 3 * (1 - avg) + (errorIds.has(p.question.id) ? 4 : 0);
  };
  const remaining = pool.map((p) => ({ p, w: weight(p) }));
  const chosen: PoolItem[] = [];
  while (chosen.length < n && remaining.length) {
    const total = remaining.reduce((s, x) => s + x.w, 0);
    let t = r() * total;
    let idx = 0;
    for (; idx < remaining.length - 1; idx++) {
      t -= remaining[idx].w;
      if (t <= 0) break;
    }
    chosen.push(remaining[idx].p);
    remaining.splice(idx, 1);
  }
  return interleave(chosen);
}

/** Greedy reorder so the same module never appears twice in a row when avoidable. */
export function interleave(items: PoolItem[]): PoolItem[] {
  const left = [...items];
  const out: PoolItem[] = [];
  while (left.length) {
    const prev = out[out.length - 1]?.moduleId;
    // prefer the module with the most remaining items that differs from the previous one
    const counts = new Map<string, number>();
    for (const x of left) counts.set(x.moduleId, (counts.get(x.moduleId) ?? 0) + 1);
    let bestIdx = -1;
    let bestCount = -1;
    left.forEach((x, i) => {
      const c = counts.get(x.moduleId)!;
      if (x.moduleId !== prev && c > bestCount) {
        bestCount = c;
        bestIdx = i;
      }
    });
    if (bestIdx === -1) bestIdx = 0;
    out.push(left.splice(bestIdx, 1)[0]);
  }
  return out;
}

/** Diagnostic: up to `perModule` questions per module, preferring those flagged diagnostic. */
export function pickDiagnostic(modules: Module[], perModule = 4): PoolItem[] {
  const out: PoolItem[] = [];
  for (const m of modules) {
    if (m.draft || !m.lessons.length) continue;
    const all: Question[] = m.lessons.flatMap((l) => l.quiz).filter((q) => q.type !== "short");
    const flagged = all.filter((q) => q.diagnostic);
    const picks: Question[] = [...flagged];
    // fill from the first question of each lesson for coverage
    for (const l of m.lessons) {
      if (picks.length >= perModule) break;
      const q = l.quiz.find((x) => x.type !== "short" && !picks.includes(x));
      if (q) picks.push(q);
    }
    // spread flagged picks across lessons if there are too many
    for (const q of picks.slice(0, perModule)) out.push({ question: q, moduleId: m.id });
  }
  return out;
}
