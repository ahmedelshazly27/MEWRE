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
- Dark mode, mobile-friendly

See [CURRICULUM.md](CURRICULUM.md) for the plan and design, [PROGRESS.md](PROGRESS.md) for build
status and [docs/RESEARCH.md](docs/RESEARCH.md) for the sourced Kuwait research brief.

## Run it

```bash
npm install
cp .env.example .env.local     # optional: add ANTHROPIC_API_KEY for the AI tutor
npm run dev                    # http://localhost:3000
```

Open on your phone over the same Wi-Fi with `npm run dev -- -H 0.0.0.0` and browse to
`http://<your-computer-ip>:3000`.

Your progress lives in `data/mewre.db` (SQLite, git-ignored). Settings → Export gives a JSON backup.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build && npm start` | Production build and server |
| `npm test` | Vitest: scoring, mastery, FSRS, readiness, practice selection, repository, calculators, content validity |
| `npm run typecheck` | TypeScript |
| `npm run validate:content [mXX]` | Validates curriculum content: ids, answer keys, references, KaTeX |
| `npm run build:spreadsheets` | Regenerates the Excel models in `public/downloads/` |

## Project layout

```
src/content/            curriculum (typed TS + markdown/KaTeX)
  schema.ts             content contract   widgets.ts  widget/diagram catalogue
  validate.ts           validator          modules/mXX/ one folder per module
src/lib/                pure logic: scoring, mastery, srs (FSRS), readiness, practice, sim, calc/*
src/server/             SQLite (db.ts), repository (repo.ts), Claude API (ai.ts)
src/components/         UI: lesson blocks, quiz engine, widgets, diagrams, tutor
src/app/                pages + API routes
supabase/schema.sql     Postgres mirror of the SQLite schema for a later move to Supabase
docs/                   research brief, authoring guide
```

## Adding content

Read [docs/AUTHORING.md](docs/AUTHORING.md). In short: add a lesson file in
`src/content/modules/mXX/`, import it in the module's `index.ts`, then run
`npm run validate:content mXX`.

## Moving to Supabase later

`src/server/repo.ts` is the only module that talks to the database. Create the tables from
`supabase/schema.sql`, then swap the better-sqlite3 calls in `repo.ts` for Supabase client calls
(add a `user_id` column and RLS policies if you want multiple users).
