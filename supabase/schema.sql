-- Postgres / Supabase mirror of src/server/db.ts (SQLite) for a future move to Supabase.
-- Single-user today; add user_id uuid references auth.users + RLS policies to go multi-user.

create table if not exists lesson_progress (
  lesson_id text primary key,
  status text not null default 'started',
  started_at bigint not null,
  completed_at bigint,
  seconds integer not null default 0
);

create table if not exists attempts (
  id bigserial primary key,
  question_id text not null,
  source text not null,
  score real not null,
  correct boolean not null,
  response jsonb,
  concepts jsonb not null,
  run_id text,
  at bigint not null
);
create index if not exists attempts_q on attempts(question_id);

create table if not exists concept_evidence (
  id bigserial primary key,
  concept_id text not null,
  score real not null,
  weight real not null,
  source text not null,
  at bigint not null
);
create index if not exists evidence_c on concept_evidence(concept_id);

create table if not exists cards (
  id text primary key,
  due timestamptz not null,
  stability double precision not null,
  difficulty double precision not null,
  elapsed_days double precision not null,
  scheduled_days double precision not null,
  learning_steps integer not null,
  reps integer not null,
  lapses integer not null,
  state smallint not null,
  last_review timestamptz,
  introduced_at bigint not null
);

create table if not exists review_log (
  id bigserial primary key,
  card_id text not null,
  rating smallint not null,
  state_before smallint not null,
  at bigint not null
);

create table if not exists errors (
  question_id text primary key,
  wrong_count integer not null default 0,
  streak integer not null default 0,
  cleared boolean not null default false,
  last_response jsonb,
  first_wrong_at bigint not null,
  last_wrong_at bigint not null,
  updated_at bigint not null
);

create table if not exists notes (
  lesson_id text primary key,
  body text not null,
  updated_at bigint not null
);

create table if not exists runs (
  id text primary key,
  kind text not null,
  ref text,
  score real,
  total integer,
  detail jsonb,
  started_at bigint not null,
  finished_at bigint
);

create table if not exists activity (
  day date primary key,
  seconds integer not null default 0,
  answers integer not null default 0,
  reviews integer not null default 0
);

create table if not exists settings (
  key text primary key,
  value jsonb not null
);
