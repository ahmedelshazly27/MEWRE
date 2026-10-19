/**
 * SQLite persistence (better-sqlite3). Single-user, local-first.
 * The same schema is mirrored for Postgres/Supabase in supabase/schema.sql.
 */
import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

export const SCHEMA = `
CREATE TABLE IF NOT EXISTS lesson_progress (
  lesson_id TEXT PRIMARY KEY,
  status TEXT NOT NULL DEFAULT 'started',      -- started | completed
  started_at INTEGER NOT NULL,
  completed_at INTEGER,
  seconds INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question_id TEXT NOT NULL,
  source TEXT NOT NULL,                        -- quiz | inline | exam | diagnostic | mixed | timed | errors
  score REAL NOT NULL,
  correct INTEGER NOT NULL,
  response TEXT,
  concepts TEXT NOT NULL,                      -- JSON array
  run_id TEXT,
  at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS attempts_q ON attempts(question_id);
CREATE INDEX IF NOT EXISTS attempts_at ON attempts(at);
CREATE TABLE IF NOT EXISTS concept_evidence (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  concept_id TEXT NOT NULL,
  score REAL NOT NULL,
  weight REAL NOT NULL,
  source TEXT NOT NULL,
  at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS evidence_c ON concept_evidence(concept_id);
CREATE TABLE IF NOT EXISTS cards (
  id TEXT PRIMARY KEY,
  due TEXT NOT NULL,
  stability REAL NOT NULL,
  difficulty REAL NOT NULL,
  elapsed_days REAL NOT NULL,
  scheduled_days REAL NOT NULL,
  learning_steps INTEGER NOT NULL,
  reps INTEGER NOT NULL,
  lapses INTEGER NOT NULL,
  state INTEGER NOT NULL,
  last_review TEXT,
  introduced_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS review_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  card_id TEXT NOT NULL,
  rating INTEGER NOT NULL,
  state_before INTEGER NOT NULL,
  at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS errors (
  question_id TEXT PRIMARY KEY,
  wrong_count INTEGER NOT NULL DEFAULT 0,
  streak INTEGER NOT NULL DEFAULT 0,          -- consecutive correct answers since last mistake
  cleared INTEGER NOT NULL DEFAULT 0,
  last_response TEXT,
  first_wrong_at INTEGER NOT NULL,
  last_wrong_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS notes (
  lesson_id TEXT PRIMARY KEY,
  body TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS runs (
  id TEXT PRIMARY KEY,
  kind TEXT NOT NULL,                          -- quiz | exam | diagnostic | mixed | timed | scenario | sim | feynman
  ref TEXT,                                    -- lesson/module/scenario id
  score REAL,
  total INTEGER,
  detail TEXT,                                 -- JSON
  started_at INTEGER NOT NULL,
  finished_at INTEGER
);
CREATE INDEX IF NOT EXISTS runs_kind ON runs(kind, ref);
CREATE TABLE IF NOT EXISTS activity (
  day TEXT PRIMARY KEY,                        -- YYYY-MM-DD local
  seconds INTEGER NOT NULL DEFAULT 0,
  answers INTEGER NOT NULL DEFAULT 0,
  reviews INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
`;

let db: Database.Database | null = null;

export function dbPath(): string {
  return process.env.MEWRE_DB_PATH || path.join(process.cwd(), "data", "mewre.db");
}

export function openDb(file: string = dbPath()): Database.Database {
  if (file !== ":memory:") fs.mkdirSync(path.dirname(file), { recursive: true });
  const d = new Database(file);
  d.pragma("journal_mode = WAL");
  d.pragma("foreign_keys = ON");
  d.exec(SCHEMA);
  return d;
}

export function getDb(): Database.Database {
  if (!db) db = openDb();
  return db;
}

/** For tests: swap in an in-memory database. */
export function setDb(d: Database.Database | null) {
  db = d;
}
