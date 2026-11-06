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
Content was written by module and then independently audited: every numeric answer, worked
step and faded check was recomputed, answer keys and explanations cross-checked, and ~360
cross-module concept links added. The audit corrected ~40 issues (e.g., a 1000× unit error in an
M1 fuel example, the direction of the IEC 61724-1 temperature correction in M2, a sensor-fault
physics error in the capstone, several overstated figures and Arabic glossary terms).

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

- `npm test` — 21 files, 250 tests passing (scoring, mastery, FSRS, readiness, practice selection, simulation scoring, event-log derivation, IndexedDB store + two-device sync, 12 calculation modules, content validity)
- `npm run validate:content` — all 16 modules valid (ids, answer keys, references, every KaTeX snippet renders)
- `npm run typecheck` and `npm run lint` — clean (lint: warnings only)
- `next build` — succeeds
- Browser smoke test (Playwright, desktop + 390 px mobile): all routes 200, no console errors, no horizontal overflow (all 88 lessons swept at 390 px); end-to-end flows tested: lesson quiz → lesson completion → card unlock → FSRS review → dashboard update; error log; diagnostic; scenario; full capstone run; cheat sheet
- Not verified live: AI tutor/grader calls to the Claude API (no API key in the build environment). The no-key fallback path is tested.

## Phase 7 — Offline phone app + sync (2026-10-19)

- [x] Learner state moved from server SQLite to an append-only event log in IndexedDB; all progress derived deterministically
- [x] Supabase sync (`mewre_events` / `mewre_docs` with RLS) — email + password accounts, background sync on reconnect
- [x] Service worker: network-first pages, cache-first assets, automatic full offline download after each deploy
- [x] Installable PWA (manifest, icons); all 235 routes prerendered static
- [x] AI endpoints require a signed-in user (optional `AI_ALLOWED_EMAILS` allowlist)
- [x] Deployed to Vercel: https://mewre-pm-academy.vercel.app (auto-deploy on push)
- [x] Verified in a real browser: download → go offline → lessons, widgets, quizzes, reviews, error log, dashboard all work; answers persist across reloads

## Phase 8 — Arabic mode + readable cheat sheets (2026-10-20)

- [x] All 16 cheat sheets rewritten: `##` sections, one fact per bullet, number tables, formula tables (`Quantity | Formula | Where`), "(verify)" caveats; " · " run-ons removed from lessons
- [x] Full Arabic translation of all 16 modules in `src/content/ar/` (MSA, English term in parentheses on first use, acronyms/units/math unchanged)
- [x] `validateTranslation` guarantees Arabic is structurally identical to English (ids, answer keys, scores, scenario graphs, TeX, URLs) — run by `validate:content` and the tests
- [x] `/ar` mirror of every page, RTL layout, EN/عربي toggle (header + Settings), remembered preference, Arabic UI strings
- [x] Progress is shared across languages (same ids); Arabic pages and `/data/content-ar.json` are in the offline download
- [x] Tutor and grader answer in Arabic in Arabic mode
- [x] Verified in Chromium (desktop + phone): RTL, no horizontal overflow, no KaTeX errors, no page errors
- [x] Fixed: list bullets were clipped site-wide; formula cards overflowed the cheat-sheet grid on phones

## Phase 9 — Trial-week sprint, 3/4/5 days (2026-11-02)

- [x] `/crash` (and `/ar/crash`): pick 3, 4 or 5 days; every plan covers all 16 modules (cheat sheet + 8-question retrieval check), core lessons in full; longer plans add lessons, scenarios and written outputs (~25 h / 32 h / 40 h, ~8 h a day)
- [x] Planner (`src/lib/sprint.ts`) splits the work into balanced days at item level, keeping module order
- [x] `/crash/check/[module]`: learning-mode check per module; `/crash/exam`: 25 timed questions with at least one per module
- [x] Progress ticks (lessons, scenarios and checks auto-detected; cheat sheets and outputs ticked) and trial-week countdown, synced across devices
- [x] Trial-week playbook (EN/AR): numbers to know with confidence labels, who's who, questions to ask, day-by-day conduct, credibility traps, 60-second intro, key Arabic terms
- [x] Dashboard banner, nav entry, offline routes; `tests/crash.test.ts` covers references, coverage and day balance

## Phase 10 — Must-know concepts (2026-11-02)

- [x] 156 concepts across all 16 modules (110 must-know, 46 good-to-know) in `src/content/key/`, English + Arabic: one sentence to memorize, "say it like this", an analogy, why it matters, an example from the lessons, the classic mix-up
- [x] `/crash/concepts`: study mode, self-test mode (reveal → "I could explain it" / "Not yet"), filters, progress; self-test answers schedule each concept as a "Must-know" card in the FSRS daily review
- [x] Marked on lesson pages ("Must know" card after the objectives) and module pages; a step in every sprint module (plans rebalanced to ~8 h a day)
- [x] `validateKeyConcepts` (ids, lessons, KaTeX, definition length, Arabic mirrors English) in `validate:content` and `tests/key.test.ts`; one owner module per concept

## Phase 11 · Multi-track academy, architecture (2026-11-06)

- [x] Environment audit, Nov 2026 research briefs (docs/research), plan (docs/ACADEMY_PLAN.md)
- [x] Tracks model with globally unique ids; `/learn` hub, `/tracks/[id]` pages with per-competency readiness; dashboard across tracks; per-track diagnostic and practice filter; tutor and grader profile per track
- [x] Arabic kept to Track 0 (routes and toggle)
- [x] Private access: `src/proxy.ts` gates every page and data file on a Supabase cookie session plus email allowlist; `/login`, no sign-up; verified end to end (redirect, wrong password, allowlisted access, non-allowlisted denial)
- [x] Live at https://learn.shazly.xyz
- [x] Lesson blocks for visuals: `chart`, `flow`, `matrix`, plus `xref` cross-links; style validator (no em dashes, stealth cofounder never named)
- [x] Founder Core calculators with tests: cap table and SAFE conversion (YC post-money rules), SAFE vs priced, unit economics and runway, pricing experiments, pipeline forecaster

## Phase 12 · Founder Core (2026-11-06)

- [x] 11 modules, 69 lessons, 534 questions, 447 flashcards, 318 glossary terms (EN/AR), 190 formulas, ~110 must-know concepts
- [x] Every lesson: why it matters for you, mechanism with equations, a visual (widget, chart, flow, matrix or data table), worked and faded examples with venture numbers labelled illustrative, practice section, graded "produce it" exercise, quiz and flashcards
- [x] Scenarios (investor, procurement, journalist, cofounder decisions) and Feynman checks in every module; capstone fc11 (seed round package) feeds Founder readiness
- [x] Cross-links to Track 0 (finance, contracts, procurement, communication, AI-native PM) instead of duplication
- [x] Verified: content validator (incl. no em dashes, stealth cofounder never named), 310 tests, production build, browser sweep of all 69 lessons on desktop and a phone sample (no errors, no overflow, no KaTeX errors)

## Phase 13 · Afterwave (2026-11-06)

- [x] 15 modules, 83 lessons, 673 questions, 545 flashcards, 433 glossary terms (EN/AR), 299 formulas, 143 must-know concepts
- [x] Technical depth: test engineering and reliability, DAQ and clock sync, HIL/SIL and CI, requirements traceability, change impact and test selection, test data platforms, robotics and physical AI, ML and agents on bench data, test platform engineering, functional safety and safety cases, Machinery Regulation; business: market and competitors, GTM, fundraising story
- [x] Widgets with tested calculators (`src/lib/calc/afterwave.ts`): change-impact visualiser, bench sync demo, actuator test platform economics, GSN builder
- [x] Capstone aw15: outbound to signed pilot, Ripple demo narrative, go/no-go memo on the first test platform

## Phase 14 · Mizan (2026-11-06)

- [x] 13 modules, 64 lessons, 524 questions, 413 flashcards, 341 glossary terms (EN/AR), 179 formulas, 121 must-know concepts
- [x] Soiling physics, IEC 61724 measurement and weather-corrected PR, inferring soiling from plant and satellite data, cleaning economics, tracker and stow control, PPC/EMS/SCADA, Kuwait grid and BESS for a seller, plant data pipelines, validation study design, selling in Kuwait and the Gulf, distribution and business model
- [x] Widgets with tested calculators (`src/lib/calc/mizan.ts`): PR temperature correction, stow decision simulator; Track 0 soiling optimiser reused
- [x] Capstone mz13: design and defend the Shagaya validation study, cleaning optimisation business case. The pilot is always described as targeted or in preparation

## Phase 15 · Suhail (2026-11-06)

- [x] 10 modules, 60 lessons, 477 questions, 372 flashcards, 291 glossary terms (EN/AR), 164 formulas, 97 must-know concepts
- [x] Community design, hackathons, event economics and sponsorship, partnerships across the region, media operations, the Arab tech and AI landscape, structures, volunteer-led teams, and a deep technical module on open-weight LLM research (training, tokenisation, scaling laws, compute arithmetic, evaluation, datasets)
- [x] Widgets with tested calculators (`src/lib/calc/suhail.ts`): event P&L, community funnel
- [x] Capstone sh10: plan and budget the first hackathon and sponsorship round
- [x] Style validator now also rejects any hint at an undisclosed team member; finished modules must carry must-know concepts
- [x] Verified: content validator, 310 tests, lint, production build, browser sweep of every venture-track page on desktop and phone

## Phase 16 · AI-native exercises and My work (2026-11-06)

- [x] "Do it with AI" on every written exercise (all 421): the right tool for the artifact (Claude Code building a real spreadsheet, Claude research with sources, Claude Code writing a testable file, or a Claude Project for documents), steps, a copyable starter prompt carrying the venture's facts and the grading rubric, and a hand-check list (numbers, sources, invented facts, venture rules such as the pilot's status)
- [x] Venture facts for prompts in `src/content/venture-context.ts`, taken only from the briefs; workflow logic in `src/lib/aiWorkflow.ts`, tested in `tests/aiWorkflow.test.ts`
- [x] Judgement grading: paste the AI's first draft with your final answer and the grader scores the final against the rubric and, separately, what you caught, fixed and made your own
- [x] Exercise workshop in the tutor (`/tutor?exercise=<id>`): the tutor sees the exercise, rubric and venture facts, asks for your facts first, co-drafts, then critiques against the rubric
- [x] `/work` (My work): latest version of every written answer grouped by venture (Afterwave, Mizan, Suhail, general, MEWRE), score, judgement, feedback, versions, exercises still to do, Markdown export and print

## Known limitations / next ideas

- Venture tracks: uncertain external facts (standards editions, Gulf tax and permit rules, PPA terms, vendor features) sit in `unverified` callouts and `unverified: true` references; many references point at a publisher's root URL and deserve a link-check pass.

- Interactive widgets and diagrams are English-only (they render LTR inside Arabic pages). Library reference titles stay in their original language.
- Arabic terms the translators flagged as uncertain (e.g. deemed energy, step-in rights, grid-forming) are worth a native-speaker pass.

- Kuwait-specific facts that could not be verified are flagged in `unverified` callouts throughout; re-check them against KAPP, MEWRE, CAPT and the official gazette before quoting at work. The main open items are listed at the end of `docs/RESEARCH.md`.
- AI tutor needs `ANTHROPIC_API_KEY` set in Vercel; it only works online.
- Possible extensions: audio flashcards for Arabic terms, PWA offline mode, importing real (sanitised) P6 XER files into the CPM widget.
