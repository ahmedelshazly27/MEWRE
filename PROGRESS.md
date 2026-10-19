# Build progress

Status as of 2026-10-19: **all phases built**. Every module is complete and validated; the platform
core, assessment, spaced repetition, tutor, extras and capstone are implemented and tested.

## Phases

| Phase | Scope | Status |
|---|---|---|
| 0 | Research brief with sources (`docs/RESEARCH.md`), curriculum map, stack, data model | ✅ |
| 1 | Platform core (navigation, lesson renderer, 7 question types, attempts & mastery, FSRS reviews, dashboard, diagnostic, error log) + M0, M1 | ✅ |
| 2 | M8 PM & controls, M9 contracts, M10 finance (+ 5 Excel models), M7 lifecycle | ✅ |
| 3 | M2 solar PV, M5 BESS, M6 grid, with engineering widgets | ✅ |
| 4 | M11 procurement, M13 leadership, M14 AI-native PM, AI tutor & graders | ✅ |
| 5 | M12 operations, M3 CSP, M4 wind | ✅ |
| 6 | Capstone simulation, readiness score, printing, polish, test pass | ✅ |

## Content

| # | Module | Lessons | Questions | Flashcards | Glossary | Formulas | Scenarios | Hours | Status |
|---|---|---|---|---|---|---|---|---|---|
| 0 | Kuwait Energy Landscape | 5 | 43 | 48 | 34 | 14 | 5 | 8 | ✅ |
| 1 | Energy & Power Fundamentals | 6 | 49 | 55 | 54 | 45 | 4 | 9 | ✅ |
| 2 | Solar PV | 7 | 55 | 60 | 59 | 27 | 7 | 14 | ✅ |
| 3 | Concentrated Solar Power | 4 | 35 | 33 | 28 | 11 | 3 | 6 | ✅ |
| 4 | Wind Energy | 4 | 36 | 36 | 33 | 15 | 3 | 6 | ✅ |
| 5 | Battery Energy Storage (BESS) | 5 | 44 | 44 | 39 | 24 | 5 | 9 | ✅ |
| 6 | Grid Integration | 5 | 44 | 41 | 38 | 17 | 5 | 9 | ✅ |
| 7 | Project Development Lifecycle | 6 | 47 | 48 | 44 | 14 | 5 | 11 | ✅ |
| 8 | Project Management & Controls | 8 | 64 | 68 | 56 | 32 | 8 | 14 | ✅ |
| 9 | Contracts & Commercial | 7 | 57 | 67 | 70 | 27 | 6 | 12 | ✅ |
| 10 | Financial Management | 7 | 55 | 58 | 48 | 30 | 6 | 12 | ✅ |
| 11 | Public Procurement in Kuwait | 5 | 40 | 40 | 35 | 10 | 6 | 8 | ✅ |
| 12 | Operations & Performance | 5 | 41 | 40 | 44 | 16 | 5 | 9 | ✅ |
| 13 | Leadership & Communication in a Ministry | 5 | 40 | 40 | 30 | 7 | 7 | 9 | ✅ |
| 14 | AI-Native Project Management | 6 | 47 | 48 | 30 | 11 | 5 | 10 | ✅ |
| 15 | Capstone: 1 GW PV + BESS for MEWRE | 3 | 28 | 24 | 20 | 7 | 4 | 6 | ✅ |
| | **Total** | **88** | **725** | **750** | **662** | **307** | **84** | **152** | |

Plus: 476 concepts with mastery tracking, 552 cited references, a 27-decision capstone simulation,
and 91 inline independent problems. Flashcard pool for spaced repetition = lesson cards +
glossary terms + formulas (~1,700 cards).

Every lesson has theory, applied (worked → faded → independent) and field-practice layers.
Content was written by module and then independently audited for answer keys, arithmetic and
technical accuracy.

## Platform features

- [x] Navigation (desktop sidebar, mobile drawer + bottom tabs), dark mode, print styles
- [x] Lesson renderer: markdown + KaTeX, callouts (why / PM check / pitfall / Kuwait / unverified / AI), formula cards, worked & faded examples with numeric checks, inline problems, widgets, labelable diagrams, checklists, "ask the contractor", scenarios, Feynman checks, downloads, sources, bilingual EN/AR blocks
- [x] 7 question types: MCQ, multi-select, numeric with tolerance, ordering, PM decision (partial credit), diagram labelling, short written answer (AI-graded or rubric self-grade)
- [x] Lesson quizzes (complete the lesson + unlock its cards), module exams (timed, feedback at end), mixed interleaved practice, timed mixed exams, error-log drills, diagnostic
- [x] Mastery per concept (recency-weighted, evidence-shrunk, time-decayed) → competency mastery → job-readiness score (85 % weighted mastery + 15 % capstone)
- [x] FSRS spaced repetition (ts-fsrs) with daily queue, new-card limit, target retention, 7-day forecast
- [x] Error log with resurfacing until two consecutive correct answers
- [x] Dashboard: readiness ring and competency bars, streak, weekly target & plan pace, reviews due, error count, recommended next lesson, weak areas, 12-week activity heatmap, review forecast
- [x] 33 interactive widgets and 10 labelable diagrams backed by a tested calculation library
- [x] AI tutor (Claude API, streaming, lesson-aware) + AI grading for written answers and Feynman checks; graceful fallback without a key
- [x] Bilingual glossary with search, searchable formula sheet, concept map, reference library, notes, day-in-the-life scenarios, printable cheat sheets, 5 Excel models
- [x] Settings (study plan, SRS), JSON export, reset

## Verification (latest run)

- `npm test` — 20 files, 243 tests passing (scoring, mastery, FSRS, readiness, practice selection, simulation scoring, SQLite repository, 12 calculation modules, content validity)
- `npm run validate:content` — all 16 modules valid (ids, answer keys, references, every KaTeX snippet renders)
- `npm run typecheck` and `npm run lint` — clean (lint: warnings only)
- `next build` — succeeds
- Browser smoke test (Playwright, desktop + 390 px mobile): all routes 200, no console errors, no horizontal overflow; end-to-end flows tested: lesson quiz → lesson completion → card unlock → FSRS review → dashboard update; error log; diagnostic; scenario; full capstone run; cheat sheet
- Not verified live: AI tutor/grader calls to the Claude API (no API key in the build environment). The no-key fallback path is tested.

## Known limitations / next ideas

- Kuwait-specific facts that could not be verified are flagged in `unverified` callouts throughout; re-check them against KAPP, MEWRE, CAPT and the official gazette before quoting at work. The main open items are listed at the end of `docs/RESEARCH.md`.
- Single-user, local-first. Moving to Supabase: see README.
- Possible extensions: audio flashcards for Arabic terms, PWA offline mode, importing real (sanitised) P6 XER files into the CPM widget.
