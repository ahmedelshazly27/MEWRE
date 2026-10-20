# MEWRE Renewable PM Academy

A personal applied-learning platform to prepare for a **Project Manager role on renewable-energy
projects at Kuwait's Ministry of Electricity, Water and Renewable Energy (MEWRE)**: Shagaya
Renewable Energy Park, Al Dibdibah / Shagaya Phase III and the utility-scale PV + BESS pipeline.

- **16 modules**, each lesson in three layers (theory, applied with Kuwait numbers, field practice)
- **Retrieval practice** after every lesson, module exams, timed mixed exams, diagnostic baseline
- **FSRS spaced repetition** over lesson flashcards, the bilingual glossary and the formula sheet
- **Mastery per concept** → competency mastery → **job-readiness score**
- **Error log** that resurfaces every mistake until it is answered correctly twice
- **Interactive widgets**: I-V curves, sun path & trackers, SLDs, EVM, LCOE/NPV/IRR/DSCR, CPM/Gantt,
  Monte Carlo, risk allocation, Weibull/Betz, BESS sizing, soiling, droop, P50/P90 and more
- **Graded scenarios** ("You are the PM…"), a Day-in-the-life collection and a **capstone simulation**
  (1 GW PV + BESS from tender to COD)
- **AI tutor** (Claude API) inside every lesson; AI grading of written answers and Feynman checks
- Bilingual **glossary EN/AR**, searchable **formula sheet**, **reference library**, notes,
  printable **cheat sheets**, downloadable **Excel models**
- **Offline-first PWA**: install it on your phone, study with no connection, progress syncs across
  devices through Supabase when you are back online
- **Arabic mode**: the whole platform in Arabic (RTL) with the English term in parentheses on first
  use — toggle **عربي / EN** in the header or Settings; progress is shared between languages
- Dark mode, mobile-friendly

**Live app:** https://mewre-pm-academy.vercel.app (auto-deploys on every push to this branch)

See [CURRICULUM.md](CURRICULUM.md) for the plan and design, [PROGRESS.md](PROGRESS.md) for build
status and [docs/RESEARCH.md](docs/RESEARCH.md) for the sourced Kuwait research brief.

## Run it

```bash
npm install
cp .env.example .env.local     # optional: add ANTHROPIC_API_KEY for the AI tutor
npm run dev                    # http://localhost:3000
```

## Use it on your phone, offline

1. Open https://mewre-pm-academy.vercel.app on the phone.
2. iPhone: Safari → Share → **Add to Home Screen**. Android: Chrome menu → **Install app**.
3. Open it once while online; it downloads every lesson, quiz, widget and spreadsheet in the
   background (Settings → Offline shows the status, or tap **Download for offline**).
4. Optional: Settings → Account → create an account / sign in on each device to sync progress.

Progress is saved on the device first (IndexedDB) and synced to Supabase whenever there is a
connection, so studying offline never loses anything. The AI tutor needs a connection.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build && npm start` | Production build and server |
| `npm test` | Vitest: scoring, mastery, FSRS, readiness, practice selection, event-log derivation, sync/merge, calculators, content validity |
| `npm run typecheck` | TypeScript |
| `npm run validate:content [mXX]` | Validates curriculum content: ids, answer keys, references, KaTeX |
| `npm run build:spreadsheets` | Regenerates the Excel models in `public/downloads/` |

## Project layout

```
src/content/            curriculum (typed TS + markdown/KaTeX)
  schema.ts             content contract   widgets.ts  widget/diagram catalogue
  validate.ts           validator          modules/mXX/ one folder per module
  ar/mXX/               Arabic translation (same structure, checked by validate-translation.ts)
src/lib/                pure logic: scoring, mastery, srs (FSRS), readiness, practice, sim, calc/*
src/lib/store/          offline-first learner store: event log (derive.ts), IndexedDB, Supabase sync
src/server/             Claude API (ai.ts) and auth check for the AI endpoints
public/sw.js            service worker (offline cache)
src/components/         UI: lesson blocks, quiz engine, widgets, diagrams, tutor
src/app/                pages + API routes
supabase/schema.sql     sync tables (append-only events + docs, row-level security)
docs/                   research brief, authoring guide
```

## Adding content

Read [docs/AUTHORING.md](docs/AUTHORING.md). In short: add a lesson file in
`src/content/modules/mXX/`, import it in the module's `index.ts`, then run
`npm run validate:content mXX`.

## How sync works

Every learning action (answer, review, lesson completion, time, scenario run) is an immutable event
with a random id, stored in IndexedDB. Progress, mastery, the error log and FSRS schedules are
*derived* by replaying events in time order, so merging two devices is just taking the union of
their events — no conflicts. Notes and settings are last-write-wins documents. The Supabase tables
(`mewre_events`, `mewre_docs`) live in the existing *Blog* project with row-level security so each
account only sees its own rows.

## AI tutor in production

Set `ANTHROPIC_API_KEY` (and ideally `AI_ALLOWED_EMAILS=<your login email>`) in Vercel → Project →
Settings → Environment Variables, then redeploy. The AI endpoints only answer signed-in users.

Models: tutor chat uses **Claude Sonnet 5.5** (derivations and PM judgement need a strong model);
rubric grading of written answers and Feynman checks uses **Claude Haiku 5.5** (narrow, structured,
nearly free). Override with `ANTHROPIC_TUTOR_MODEL` / `ANTHROPIC_GRADER_MODEL`.
