-- MEWRE PM Academy — Supabase sync tables (applied to the project as migration "mewre_academy_sync").
-- The app is offline-first: learner progress is an append-only event log in the browser (IndexedDB),
-- pushed/pulled here when online. Docs (notes, settings) are last-write-wins.

create table if not exists public.mewre_events (
  seq bigint generated always as identity primary key,   -- pull cursor
  id uuid not null unique,                                 -- client-generated, makes pushes idempotent
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  type text not null,                                      -- attempt | evidence | review | lesson-start | lesson-complete | time | run | reset
  payload jsonb not null default '{}'::jsonb,
  at bigint not null,                                      -- client epoch ms (ordering for replay)
  device text,
  created_at timestamptz not null default now()
);
create index if not exists mewre_events_user_seq on public.mewre_events (user_id, seq);

create table if not exists public.mewre_docs (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  key text not null,                                       -- settings | note:<lessonId>
  value jsonb not null,
  updated_at bigint not null,
  primary key (user_id, key)
);

alter table public.mewre_events enable row level security;
alter table public.mewre_docs enable row level security;

create policy "mewre_events_select_own" on public.mewre_events for select to authenticated using ((select auth.uid()) = user_id);
create policy "mewre_events_insert_own" on public.mewre_events for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "mewre_docs_select_own" on public.mewre_docs for select to authenticated using ((select auth.uid()) = user_id);
create policy "mewre_docs_insert_own" on public.mewre_docs for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "mewre_docs_update_own" on public.mewre_docs for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
