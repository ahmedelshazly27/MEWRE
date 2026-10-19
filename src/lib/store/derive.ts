/**
 * Learner state as a pure function of an append-only event log.
 *
 * Every device keeps the same log (merged by event id via Supabase), so replaying it in
 * (at, id) order yields the same progress, mastery and FSRS schedules everywhere. Nothing here
 * touches the browser — it is unit-tested directly.
 */
import { conceptMastery, ratingScore, SOURCE_WEIGHT, type Evidence } from "@/lib/mastery";
import { buildQueue, newCard, review, type ReviewRating, type StoredCard } from "@/lib/srs";
import type { Response } from "@/lib/scoring";

// ------------------------------------------------------------------ events

export interface AttemptPayload {
  q: string;
  source: string;
  score: number;
  correct: boolean;
  concepts: string[];
  response?: Response;
  run?: string;
}
export interface EvidencePayload {
  concepts: string[];
  score: number;
  source: string;
}
export interface ReviewPayload {
  card: string;
  rating: ReviewRating;
  concepts?: string[];
}
export interface RunPayload {
  id: string;
  kind: string;
  ref?: string;
  score: number;
  total?: number;
  detail?: unknown;
  startedAt?: number;
}

export type EventMap = {
  attempt: AttemptPayload;
  evidence: EvidencePayload;
  review: ReviewPayload;
  "lesson-start": { lesson: string };
  "lesson-complete": { lesson: string };
  time: { lesson: string | null; seconds: number };
  run: RunPayload;
  reset: Record<string, never>;
};
export type EventType = keyof EventMap;

export interface LearnEvent<T extends EventType = EventType> {
  id: string;
  type: T;
  at: number;
  device?: string;
  payload: EventMap[T];
}

// ------------------------------------------------------------------ settings & docs

export interface Settings {
  weeklyHours: number;
  weeks: number;
  startDate: string; // YYYY-MM-DD the plan started
  jobStartDate: string;
  newCardsPerDay: number;
  retention: number;
  name: string;
}

export function localDay(ts: number = Date.now()): string {
  const d = new Date(ts);
  return new Date(ts - d.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

export function defaultSettings(now = Date.now()): Settings {
  return { weeklyHours: 12, weeks: 13, startDate: localDay(now), jobStartDate: "", newCardsPerDay: 20, retention: 0.9, name: "" };
}

export interface Doc {
  key: string;
  value: unknown;
  updatedAt: number;
}

/** Last-write-wins merge of two doc sets. Returns the merged map and which side must be updated. */
export function mergeDocs(local: Doc[], remote: Doc[]) {
  const merged = new Map<string, Doc>();
  for (const d of local) merged.set(d.key, d);
  const toPush: Doc[] = [];
  const toApply: Doc[] = [];
  const remoteKeys = new Set<string>();
  for (const r of remote) {
    remoteKeys.add(r.key);
    const l = merged.get(r.key);
    if (!l || r.updatedAt > l.updatedAt) {
      merged.set(r.key, r);
      toApply.push(r);
    } else if (l.updatedAt > r.updatedAt) toPush.push(l);
  }
  for (const l of local) if (!remoteKeys.has(l.key)) toPush.push(l);
  return { merged, toPush, toApply };
}

// ------------------------------------------------------------------ derived state

export interface LessonProgress {
  status: "started" | "completed";
  startedAt: number;
  completedAt: number | null;
  seconds: number;
}

export interface ErrorRow {
  questionId: string;
  wrongCount: number;
  streak: number;
  cleared: boolean;
  lastResponse?: Response;
  firstWrongAt: number;
  lastWrongAt: number;
}

export interface CardState extends StoredCard {
  introducedAt: number;
}

export interface RunRow extends RunPayload {
  finishedAt: number;
}

export interface Activity {
  seconds: number;
  answers: number;
  reviews: number;
}

export interface Derived {
  lessons: Map<string, LessonProgress>;
  evidence: Map<string, Evidence[]>;
  errors: Map<string, ErrorRow>;
  cards: Map<string, CardState>;
  reviewDays: Map<string, number>; // new cards introduced per day
  runs: RunRow[]; // newest first
  activity: Map<string, Activity>;
  attempts: number;
  scoreSum: number;
}

export function sortEvents(events: LearnEvent[]): LearnEvent[] {
  return [...events].sort((a, b) => a.at - b.at || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
}

export function derive(events: LearnEvent[], opts: { retention?: number; day?: (ts: number) => string } = {}): Derived {
  const retention = opts.retention ?? 0.9;
  const day = opts.day ?? localDay;
  const sorted = sortEvents(events);
  let start = 0;
  for (let i = sorted.length - 1; i >= 0; i--)
    if (sorted[i].type === "reset") {
      start = i + 1;
      break;
    }

  const d: Derived = {
    lessons: new Map(),
    evidence: new Map(),
    errors: new Map(),
    cards: new Map(),
    reviewDays: new Map(),
    runs: [],
    activity: new Map(),
    attempts: 0,
    scoreSum: 0,
  };
  const act = (ts: number) => {
    const k = day(ts);
    let a = d.activity.get(k);
    if (!a) d.activity.set(k, (a = { seconds: 0, answers: 0, reviews: 0 }));
    return a;
  };
  const evidence = (concepts: string[] | undefined, score: number, source: string, at: number) => {
    const weight = SOURCE_WEIGHT[source] ?? 1;
    for (const c of concepts ?? []) {
      const list = d.evidence.get(c) ?? [];
      list.push({ score, weight, at });
      d.evidence.set(c, list);
    }
  };
  const startLesson = (lesson: string, at: number) => {
    if (!d.lessons.has(lesson)) d.lessons.set(lesson, { status: "started", startedAt: at, completedAt: null, seconds: 0 });
    return d.lessons.get(lesson)!;
  };

  for (let i = start; i < sorted.length; i++) {
    const e = sorted[i];
    switch (e.type) {
      case "attempt": {
        const p = e.payload as AttemptPayload;
        d.attempts++;
        d.scoreSum += p.score;
        act(e.at).answers++;
        evidence(p.concepts, p.score, p.source, e.at);
        const row = d.errors.get(p.q);
        if (!p.correct) {
          d.errors.set(p.q, {
            questionId: p.q,
            wrongCount: (row?.wrongCount ?? 0) + 1,
            streak: 0,
            cleared: false,
            lastResponse: p.response,
            firstWrongAt: row?.firstWrongAt ?? e.at,
            lastWrongAt: e.at,
          });
        } else if (row) {
          row.streak++;
          row.cleared = row.streak >= 2;
        }
        break;
      }
      case "evidence": {
        const p = e.payload as EvidencePayload;
        evidence(p.concepts, p.score, p.source, e.at);
        break;
      }
      case "review": {
        const p = e.payload as ReviewPayload;
        const now = new Date(e.at);
        const prev = d.cards.get(p.card);
        const base: StoredCard = prev ?? newCard(p.card, now);
        const next = review(base, p.rating, now, retention, false);
        d.cards.set(p.card, { ...next, introducedAt: prev?.introducedAt ?? e.at });
        if (!prev) d.reviewDays.set(day(e.at), (d.reviewDays.get(day(e.at)) ?? 0) + 1);
        act(e.at).reviews++;
        if (p.concepts?.length) evidence(p.concepts, ratingScore(p.rating), "card", e.at);
        break;
      }
      case "lesson-start":
        startLesson((e.payload as { lesson: string }).lesson, e.at);
        break;
      case "lesson-complete": {
        const l = startLesson((e.payload as { lesson: string }).lesson, e.at);
        l.status = "completed";
        l.completedAt = l.completedAt ?? e.at;
        break;
      }
      case "time": {
        const p = e.payload as { lesson: string | null; seconds: number };
        const s = Math.max(0, Math.min(p.seconds, 600));
        if (p.lesson) startLesson(p.lesson, e.at).seconds += s;
        act(e.at).seconds += s;
        break;
      }
      case "run":
        d.runs.push({ ...(e.payload as RunPayload), finishedAt: e.at });
        break;
    }
  }
  d.runs.reverse();
  return d;
}

// ------------------------------------------------------------------ selectors

export function masteryMap(d: Derived, now = Date.now()): Map<string, { mastery: number; evidence: number }> {
  const out = new Map<string, { mastery: number; evidence: number }>();
  for (const [c, ev] of d.evidence) out.set(c, { mastery: conceptMastery(ev, now), evidence: ev.length });
  return out;
}

export function completedLessons(d: Derived): Set<string> {
  return new Set([...d.lessons].filter(([, l]) => l.status === "completed").map(([id]) => id));
}

export function openErrors(d: Derived, includeCleared = false): ErrorRow[] {
  return [...d.errors.values()].filter((e) => includeCleared || !e.cleared).sort((a, b) => b.lastWrongAt - a.lastWrongAt);
}

export function bestScores(d: Derived, kind: string): Map<string, number> {
  const m = new Map<string, number>();
  for (const r of d.runs) if (r.kind === kind && r.ref) m.set(r.ref, Math.max(m.get(r.ref) ?? 0, r.score));
  return m;
}

/** Card order + lesson for each card, from the content index. */
export interface CardMeta {
  id: string;
  lessonId: string;
}

export function reviewQueue(d: Derived, cardOrder: CardMeta[], newLimit: number, now = new Date()) {
  const done = completedLessons(d);
  const unlocked = cardOrder.filter((c) => done.has(c.lessonId)).map((c) => c.id);
  const known = new Set(cardOrder.map((c) => c.id));
  const existing = [...d.cards.values()].filter((c) => known.has(c.id));
  const q = buildQueue({ existing, unlocked, newToday: d.reviewDays.get(localDay(now.getTime())) ?? 0, newLimit, now });
  return { ...q, unlockedTotal: unlocked.length, known: existing.length };
}

export function reviewForecast(d: Derived, days = 7, now = Date.now()): number[] {
  const out = new Array(days).fill(0);
  const startOfToday = new Date(localDay(now) + "T00:00:00").getTime();
  for (const c of d.cards.values()) {
    const idx = Math.max(0, Math.floor((new Date(c.due).getTime() - startOfToday) / 86_400_000));
    if (idx < days) out[idx]++;
  }
  return out;
}

export function streak(d: Derived, now = Date.now()): { current: number; longest: number } {
  const active = new Set([...d.activity].filter(([, a]) => a.seconds >= 60 || a.answers > 0 || a.reviews > 0).map(([k]) => k));
  const dayMs = 86_400_000;
  let current = 0;
  let t = now;
  if (!active.has(localDay(t))) t -= dayMs;
  while (active.has(localDay(t))) {
    current++;
    t -= dayMs;
  }
  let longest = 0;
  let run = 0;
  let prev: number | null = null;
  for (const k of [...active].sort()) {
    const ts = new Date(k + "T12:00:00Z").getTime();
    run = prev !== null && Math.round((ts - prev) / dayMs) === 1 ? run + 1 : 1;
    longest = Math.max(longest, run);
    prev = ts;
  }
  return { current, longest };
}

export function totals(d: Derived) {
  let seconds = 0;
  let reviews = 0;
  for (const a of d.activity.values()) {
    seconds += a.seconds;
    reviews += a.reviews;
  }
  return { seconds, reviews, attempts: d.attempts, avgScore: d.attempts ? d.scoreSum / d.attempts : 0 };
}

export function secondsThisWeek(d: Derived, now = Date.now()): number {
  const dow = (new Date(now).getDay() + 6) % 7; // Monday = 0
  const monday = localDay(now - dow * 86_400_000);
  let s = 0;
  for (const [k, a] of d.activity) if (k >= monday) s += a.seconds;
  return s;
}
