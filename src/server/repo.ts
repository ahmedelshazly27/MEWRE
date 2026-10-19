import { getDb } from "./db";
import { getCard, getQuestion, index, lessonsInOrder, unlockedCards } from "@/lib/content";
import { gradeQuestion, correctAnswerText, type Grade, type Response } from "@/lib/scoring";
import { conceptMastery, ratingScore, SOURCE_WEIGHT, type Evidence } from "@/lib/mastery";
import { buildQueue, newCard, review, type ReviewRating, type StoredCard } from "@/lib/srs";

// ------------------------------------------------------------------ helpers

export function localDay(ts: number = Date.now()): string {
  const d = new Date(ts);
  const tzOffset = d.getTimezoneOffset() * 60_000;
  return new Date(ts - tzOffset).toISOString().slice(0, 10);
}

function bumpActivity(field: "seconds" | "answers" | "reviews", amount: number, ts = Date.now()) {
  getDb()
    .prepare(`INSERT INTO activity(day, ${field}) VALUES (?, ?) ON CONFLICT(day) DO UPDATE SET ${field} = ${field} + excluded.${field}`)
    .run(localDay(ts), amount);
}

// ------------------------------------------------------------------ settings

export interface Settings {
  weeklyHours: number;
  weeks: number;
  startDate: string; // YYYY-MM-DD the plan started
  jobStartDate: string; // target
  newCardsPerDay: number;
  retention: number;
  name: string;
}

export const DEFAULT_SETTINGS: Settings = {
  weeklyHours: 12,
  weeks: 13,
  startDate: localDay(),
  jobStartDate: "",
  newCardsPerDay: 20,
  retention: 0.9,
  name: "",
};

export function getSettings(): Settings {
  const rows = getDb().prepare("SELECT key, value FROM settings").all() as { key: string; value: string }[];
  const s: Record<string, unknown> = { ...DEFAULT_SETTINGS };
  for (const r of rows) s[r.key] = JSON.parse(r.value);
  if (!rows.some((r) => r.key === "startDate")) {
    getDb().prepare("INSERT OR IGNORE INTO settings(key, value) VALUES ('startDate', ?)").run(JSON.stringify(DEFAULT_SETTINGS.startDate));
  }
  return s as unknown as Settings;
}

export function saveSettings(patch: Partial<Settings>) {
  const stmt = getDb().prepare("INSERT INTO settings(key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value");
  const allowed = Object.keys(DEFAULT_SETTINGS);
  for (const [k, v] of Object.entries(patch)) if (allowed.includes(k)) stmt.run(k, JSON.stringify(v));
}

// ------------------------------------------------------------------ lessons

export interface LessonProgress {
  lesson_id: string;
  status: "started" | "completed";
  started_at: number;
  completed_at: number | null;
  seconds: number;
}

export function lessonProgressMap(): Map<string, LessonProgress> {
  const rows = getDb().prepare("SELECT * FROM lesson_progress").all() as LessonProgress[];
  return new Map(rows.map((r) => [r.lesson_id, r]));
}

export function completedLessons(): Set<string> {
  const rows = getDb().prepare("SELECT lesson_id FROM lesson_progress WHERE status = 'completed'").all() as { lesson_id: string }[];
  return new Set(rows.map((r) => r.lesson_id));
}

export function startLesson(lessonId: string, now = Date.now()) {
  getDb().prepare("INSERT OR IGNORE INTO lesson_progress(lesson_id, status, started_at) VALUES (?, 'started', ?)").run(lessonId, now);
}

export function addTime(lessonId: string | null, seconds: number, now = Date.now()) {
  const s = Math.max(0, Math.min(seconds, 300)); // heartbeat guard
  if (lessonId) {
    startLesson(lessonId, now);
    getDb().prepare("UPDATE lesson_progress SET seconds = seconds + ? WHERE lesson_id = ?").run(s, lessonId);
  }
  bumpActivity("seconds", s, now);
}

export function completeLesson(lessonId: string, now = Date.now()) {
  startLesson(lessonId, now);
  getDb().prepare("UPDATE lesson_progress SET status = 'completed', completed_at = COALESCE(completed_at, ?) WHERE lesson_id = ?").run(now, lessonId);
}

// ------------------------------------------------------------------ attempts & mastery

export interface AttemptResult extends Grade {
  questionId: string;
  correctAnswer: string;
  explanation: string;
}

export function recordEvidence(conceptIds: string[], score: number, source: string, now = Date.now()) {
  const stmt = getDb().prepare("INSERT INTO concept_evidence(concept_id, score, weight, source, at) VALUES (?, ?, ?, ?, ?)");
  const w = SOURCE_WEIGHT[source] ?? 1;
  for (const c of conceptIds) stmt.run(c, score, w, source, now);
}

export function recordAttempt(input: { questionId: string; source: string; response: Response; runId?: string; now?: number }): AttemptResult {
  const now = input.now ?? Date.now();
  const ref = getQuestion(input.questionId);
  if (!ref) throw new Error(`Unknown question ${input.questionId}`);
  const q = ref.question;
  const grade = gradeQuestion(q, input.response);
  const db = getDb();
  const tx = db.transaction(() => {
    db.prepare("INSERT INTO attempts(question_id, source, score, correct, response, concepts, run_id, at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").run(
      q.id,
      input.source,
      grade.score,
      grade.correct ? 1 : 0,
      JSON.stringify(input.response),
      JSON.stringify(q.concepts),
      input.runId ?? null,
      now,
    );
    recordEvidence(q.concepts, grade.score, input.source, now);
    updateErrorLog(q.id, grade.correct, input.response, now);
    bumpActivity("answers", 1, now);
  });
  tx();
  return { ...grade, questionId: q.id, correctAnswer: correctAnswerText(q), explanation: q.explanation };
}

function updateErrorLog(questionId: string, correct: boolean, response: Response, now: number) {
  const db = getDb();
  const row = db.prepare("SELECT * FROM errors WHERE question_id = ?").get(questionId) as { streak: number } | undefined;
  if (!correct) {
    db.prepare(
      `INSERT INTO errors(question_id, wrong_count, streak, cleared, last_response, first_wrong_at, last_wrong_at, updated_at)
       VALUES (?, 1, 0, 0, ?, ?, ?, ?)
       ON CONFLICT(question_id) DO UPDATE SET wrong_count = wrong_count + 1, streak = 0, cleared = 0,
         last_response = excluded.last_response, last_wrong_at = excluded.last_wrong_at, updated_at = excluded.updated_at`,
    ).run(questionId, JSON.stringify(response), now, now, now);
  } else if (row) {
    const streak = row.streak + 1;
    db.prepare("UPDATE errors SET streak = ?, cleared = ?, updated_at = ? WHERE question_id = ?").run(streak, streak >= 2 ? 1 : 0, now, questionId);
  }
}

export function conceptEvidence(): Map<string, Evidence[]> {
  const rows = getDb().prepare("SELECT concept_id, score, weight, at FROM concept_evidence").all() as {
    concept_id: string;
    score: number;
    weight: number;
    at: number;
  }[];
  const map = new Map<string, Evidence[]>();
  for (const r of rows) {
    const list = map.get(r.concept_id) ?? [];
    list.push({ score: r.score, weight: r.weight, at: r.at });
    map.set(r.concept_id, list);
  }
  return map;
}

export function masteryMap(now = Date.now()): Map<string, { mastery: number; evidence: number }> {
  const out = new Map<string, { mastery: number; evidence: number }>();
  for (const [c, ev] of conceptEvidence()) out.set(c, { mastery: conceptMastery(ev, now), evidence: ev.length });
  return out;
}

export function questionStats(): Map<string, { attempts: number; lastCorrect: boolean; lastAt: number }> {
  const rows = getDb()
    .prepare("SELECT question_id, COUNT(*) n, MAX(at) last FROM attempts GROUP BY question_id")
    .all() as { question_id: string; n: number; last: number }[];
  const lastRows = getDb()
    .prepare("SELECT a.question_id, a.correct FROM attempts a JOIN (SELECT question_id, MAX(id) mid FROM attempts GROUP BY question_id) m ON a.id = m.mid")
    .all() as { question_id: string; correct: number }[];
  const last = new Map(lastRows.map((r) => [r.question_id, r.correct === 1]));
  return new Map(rows.map((r) => [r.question_id, { attempts: r.n, lastCorrect: last.get(r.question_id) ?? false, lastAt: r.last }]));
}

// ------------------------------------------------------------------ error log

export interface ErrorRow {
  question_id: string;
  wrong_count: number;
  streak: number;
  cleared: number;
  last_response: string | null;
  first_wrong_at: number;
  last_wrong_at: number;
}

export function listErrors(includeCleared = false): ErrorRow[] {
  return getDb()
    .prepare(`SELECT * FROM errors ${includeCleared ? "" : "WHERE cleared = 0"} ORDER BY last_wrong_at DESC`)
    .all() as ErrorRow[];
}

// ------------------------------------------------------------------ flashcards (FSRS)

interface CardRow extends StoredCard {
  introduced_at: number;
}

export function allCardStates(): StoredCard[] {
  return getDb().prepare("SELECT * FROM cards").all() as CardRow[];
}

export function newCardsIntroducedToday(now = Date.now()): number {
  const start = new Date(localDay(now) + "T00:00:00").getTime();
  return (getDb().prepare("SELECT COUNT(*) n FROM cards WHERE introduced_at >= ?").get(start) as { n: number }).n;
}

export function reviewQueue(now = new Date()) {
  const settings = getSettings();
  const unlocked = unlockedCards(completedLessons()).filter((id) => getCard(id));
  const existing = allCardStates().filter((c) => getCard(c.id));
  const q = buildQueue({ existing, unlocked, newToday: newCardsIntroducedToday(now.getTime()), newLimit: settings.newCardsPerDay, now });
  return { ...q, unlockedTotal: unlocked.length, known: existing.length };
}

export function gradeCard(cardId: string, rating: ReviewRating, now = new Date()): StoredCard {
  const content = getCard(cardId);
  if (!content) throw new Error(`Unknown card ${cardId}`);
  const db = getDb();
  const existing = db.prepare("SELECT * FROM cards WHERE id = ?").get(cardId) as CardRow | undefined;
  const before: StoredCard = existing ?? newCard(cardId, now);
  const settings = getSettings();
  const after = review(before, rating, now, settings.retention);
  db.transaction(() => {
    db.prepare(
      `INSERT INTO cards(id, due, stability, difficulty, elapsed_days, scheduled_days, learning_steps, reps, lapses, state, last_review, introduced_at)
       VALUES (@id, @due, @stability, @difficulty, @elapsed_days, @scheduled_days, @learning_steps, @reps, @lapses, @state, @last_review, @introduced_at)
       ON CONFLICT(id) DO UPDATE SET due=@due, stability=@stability, difficulty=@difficulty, elapsed_days=@elapsed_days,
         scheduled_days=@scheduled_days, learning_steps=@learning_steps, reps=@reps, lapses=@lapses, state=@state, last_review=@last_review`,
    ).run({ ...after, introduced_at: existing?.introduced_at ?? now.getTime() });
    db.prepare("INSERT INTO review_log(card_id, rating, state_before, at) VALUES (?, ?, ?, ?)").run(cardId, rating, before.state, now.getTime());
    if (content.concepts?.length) recordEvidence(content.concepts, ratingScore(rating), "card", now.getTime());
    bumpActivity("reviews", 1, now.getTime());
  })();
  return after;
}

export function cardState(cardId: string): StoredCard | undefined {
  return getDb().prepare("SELECT * FROM cards WHERE id = ?").get(cardId) as CardRow | undefined;
}

/** Due counts for the next N days (forecast). */
export function reviewForecast(days = 7, now = new Date()): number[] {
  const out = new Array(days).fill(0);
  const startOfToday = new Date(localDay(now.getTime()) + "T00:00:00").getTime();
  for (const c of allCardStates()) {
    const due = new Date(c.due).getTime();
    const d = Math.max(0, Math.floor((due - startOfToday) / 86_400_000));
    if (d < days) out[d]++;
  }
  return out;
}

// ------------------------------------------------------------------ notes

export function getNote(lessonId: string): string {
  const r = getDb().prepare("SELECT body FROM notes WHERE lesson_id = ?").get(lessonId) as { body: string } | undefined;
  return r?.body ?? "";
}

export function saveNote(lessonId: string, body: string, now = Date.now()) {
  if (!body.trim()) {
    getDb().prepare("DELETE FROM notes WHERE lesson_id = ?").run(lessonId);
    return;
  }
  getDb()
    .prepare("INSERT INTO notes(lesson_id, body, updated_at) VALUES (?, ?, ?) ON CONFLICT(lesson_id) DO UPDATE SET body = excluded.body, updated_at = excluded.updated_at")
    .run(lessonId, body, now);
}

export function allNotes(): { lesson_id: string; body: string; updated_at: number }[] {
  return getDb().prepare("SELECT * FROM notes ORDER BY updated_at DESC").all() as { lesson_id: string; body: string; updated_at: number }[];
}

// ------------------------------------------------------------------ runs (quizzes, exams, scenarios, simulations)

export interface RunRow {
  id: string;
  kind: string;
  ref: string | null;
  score: number | null;
  total: number | null;
  detail: string | null;
  started_at: number;
  finished_at: number | null;
}

export function saveRun(run: { id: string; kind: string; ref?: string; score: number; total?: number; detail?: unknown; startedAt?: number }, now = Date.now()) {
  getDb()
    .prepare(
      `INSERT INTO runs(id, kind, ref, score, total, detail, started_at, finished_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET score = excluded.score, total = excluded.total, detail = excluded.detail, finished_at = excluded.finished_at`,
    )
    .run(run.id, run.kind, run.ref ?? null, run.score, run.total ?? null, JSON.stringify(run.detail ?? null), run.startedAt ?? now, now);
}

export function listRuns(kind?: string, ref?: string, limit = 50): RunRow[] {
  const where: string[] = ["finished_at IS NOT NULL"];
  const args: unknown[] = [];
  if (kind) {
    where.push("kind = ?");
    args.push(kind);
  }
  if (ref) {
    where.push("ref = ?");
    args.push(ref);
  }
  return getDb()
    .prepare(`SELECT * FROM runs WHERE ${where.join(" AND ")} ORDER BY finished_at DESC LIMIT ?`)
    .all(...args, limit) as RunRow[];
}

export function bestScores(kind: string): Map<string, number> {
  const rows = getDb().prepare("SELECT ref, MAX(score) s FROM runs WHERE kind = ? AND finished_at IS NOT NULL GROUP BY ref").all(kind) as { ref: string; s: number }[];
  return new Map(rows.map((r) => [r.ref, r.s]));
}

// ------------------------------------------------------------------ activity

export interface ActivityRow {
  day: string;
  seconds: number;
  answers: number;
  reviews: number;
}

export function activity(days = 84): ActivityRow[] {
  return getDb().prepare("SELECT * FROM activity ORDER BY day DESC LIMIT ?").all(days) as ActivityRow[];
}

/** Consecutive active days ending today (or yesterday, if nothing yet today). */
export function streak(now = Date.now()): { current: number; longest: number } {
  const active = new Set(
    (getDb().prepare("SELECT day FROM activity WHERE seconds >= 60 OR answers > 0 OR reviews > 0").all() as { day: string }[]).map((r) => r.day),
  );
  const dayMs = 86_400_000;
  let current = 0;
  let t = now;
  if (!active.has(localDay(t))) t -= dayMs;
  while (active.has(localDay(t))) {
    current++;
    t -= dayMs;
  }
  const sorted = [...active].sort();
  let longest = 0;
  let run = 0;
  let prev: number | null = null;
  for (const d of sorted) {
    const ts = new Date(d + "T12:00:00Z").getTime();
    run = prev !== null && Math.round((ts - prev) / dayMs) === 1 ? run + 1 : 1;
    longest = Math.max(longest, run);
    prev = ts;
  }
  return { current, longest };
}

export function totals() {
  const db = getDb();
  const t = db.prepare("SELECT COALESCE(SUM(seconds),0) s, COALESCE(SUM(answers),0) a, COALESCE(SUM(reviews),0) r FROM activity").get() as { s: number; a: number; r: number };
  const acc = db.prepare("SELECT COUNT(*) n, COALESCE(AVG(score),0) avg FROM attempts").get() as { n: number; avg: number };
  return { seconds: t.s, answers: t.a, reviews: t.r, attempts: acc.n, avgScore: acc.avg };
}

export function secondsThisWeek(now = Date.now()): number {
  const d = new Date(now);
  const day = (d.getDay() + 6) % 7; // Monday = 0
  const monday = localDay(now - day * 86_400_000);
  return (getDb().prepare("SELECT COALESCE(SUM(seconds),0) s FROM activity WHERE day >= ?").get(monday) as { s: number }).s;
}

/** Wipe all learner state (Settings → reset). */
export function resetAll() {
  const db = getDb();
  for (const t of ["lesson_progress", "attempts", "concept_evidence", "cards", "review_log", "errors", "notes", "runs", "activity"]) db.exec(`DELETE FROM ${t}`);
}

export function exportAll(): Record<string, unknown[]> {
  const db = getDb();
  const out: Record<string, unknown[]> = {};
  for (const t of ["lesson_progress", "attempts", "concept_evidence", "cards", "review_log", "errors", "notes", "runs", "activity", "settings"])
    out[t] = db.prepare(`SELECT * FROM ${t}`).all();
  return out;
}

export function lessonCount() {
  return lessonsInOrder().length;
}

export { index as contentIndex };
