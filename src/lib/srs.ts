/** Thin, serializable wrapper around ts-fsrs (FSRS scheduler). */
import { createEmptyCard, fsrs, generatorParameters, Rating, State, type Card, type Grade } from "ts-fsrs";

export interface StoredCard {
  id: string;
  due: string; // ISO
  stability: number;
  difficulty: number;
  elapsed_days: number;
  scheduled_days: number;
  learning_steps: number;
  reps: number;
  lapses: number;
  state: number; // ts-fsrs State: 0 New, 1 Learning, 2 Review, 3 Relearning
  last_review: string | null;
}

export type ReviewRating = 1 | 2 | 3 | 4; // Again, Hard, Good, Easy

export const RATING_LABEL: Record<ReviewRating, string> = { 1: "Again", 2: "Hard", 3: "Good", 4: "Easy" };

export function scheduler(retention = 0.9, fuzz = true) {
  return fsrs(generatorParameters({ request_retention: retention, enable_fuzz: fuzz, maximum_interval: 365 }));
}

function toCard(s: StoredCard): Card {
  return {
    due: new Date(s.due),
    stability: s.stability,
    difficulty: s.difficulty,
    elapsed_days: s.elapsed_days,
    scheduled_days: s.scheduled_days,
    learning_steps: s.learning_steps,
    reps: s.reps,
    lapses: s.lapses,
    state: s.state as State,
    last_review: s.last_review ? new Date(s.last_review) : undefined,
  };
}

function fromCard(id: string, c: Card): StoredCard {
  return {
    id,
    due: c.due.toISOString(),
    stability: c.stability,
    difficulty: c.difficulty,
    elapsed_days: c.elapsed_days,
    scheduled_days: c.scheduled_days,
    learning_steps: c.learning_steps,
    reps: c.reps,
    lapses: c.lapses,
    state: c.state,
    last_review: c.last_review ? c.last_review.toISOString() : null,
  };
}

export function newCard(id: string, now: Date = new Date()): StoredCard {
  return fromCard(id, createEmptyCard(now));
}

export function review(stored: StoredCard, rating: ReviewRating, now: Date = new Date(), retention = 0.9, fuzz = true): StoredCard {
  const f = scheduler(retention, fuzz);
  const { card } = f.next(toCard(stored), now, rating as unknown as Grade);
  return fromCard(stored.id, card);
}

export function formatInterval(ms: number): string {
  const min = ms / 60_000;
  if (min < 60) return `${Math.max(1, Math.round(min))}m`;
  const h = min / 60;
  if (h < 24) return `${Math.round(h)}h`;
  const d = h / 24;
  if (d < 30) return `${Math.round(d)}d`;
  const mo = d / 30;
  if (mo < 12) return `${mo.toFixed(1).replace(/\.0$/, "")}mo`;
  return `${(d / 365).toFixed(1).replace(/\.0$/, "")}y`;
}

/** Next interval for each rating, e.g. { 1: "1m", 2: "6m", 3: "10m", 4: "3d" }. */
export function previewIntervals(stored: StoredCard, now: Date = new Date(), retention = 0.9): Record<ReviewRating, string> {
  const f = scheduler(retention, false);
  const preview = f.repeat(toCard(stored), now);
  const out = {} as Record<ReviewRating, string>;
  for (const r of [Rating.Again, Rating.Hard, Rating.Good, Rating.Easy] as const) {
    out[r as ReviewRating] = formatInterval(preview[r].card.due.getTime() - now.getTime());
  }
  return out;
}

export function retrievability(stored: StoredCard, now: Date = new Date()): number {
  if (stored.state === State.New) return 0;
  return scheduler().get_retrievability(toCard(stored), now, false);
}

export interface QueueInput {
  /** Cards that already have scheduling state. */
  existing: StoredCard[];
  /** Card ids the learner has unlocked (lesson completed), in the order to introduce them. */
  unlocked: string[];
  /** How many new cards were already introduced today. */
  newToday: number;
  newLimit: number;
  now: Date;
}

/** Due reviews (most overdue first) + up to the remaining new-card allowance. */
export function buildQueue({ existing, unlocked, newToday, newLimit, now }: QueueInput): { due: string[]; fresh: string[] } {
  const known = new Set(existing.map((c) => c.id));
  const due = existing
    .filter((c) => new Date(c.due).getTime() <= now.getTime())
    .sort((a, b) => new Date(a.due).getTime() - new Date(b.due).getTime())
    .map((c) => c.id);
  const allowance = Math.max(0, newLimit - newToday);
  const fresh = unlocked.filter((id) => !known.has(id)).slice(0, allowance);
  return { due, fresh };
}
