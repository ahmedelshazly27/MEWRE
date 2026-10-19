# MEWRE Renewable PM Academy — Curriculum & Design Plan

Personal applied-learning platform to prepare for a Project Manager role on renewable-energy
projects at Kuwait's Ministry of Electricity, Water and Renewable Energy (MEWRE): Shagaya
Renewable Energy Park and the utility-scale PV/BESS pipeline.

Research brief with sources: [`docs/RESEARCH.md`](docs/RESEARCH.md). Build status: [`PROGRESS.md`](PROGRESS.md).

## 1. Learning design

Every lesson has three layers:

| Layer | Purpose | Typical blocks |
|---|---|---|
| **Theory** | Physics, equations, principles — derived, with units | equations, "why" callouts, widgets |
| **Applied** | Worked → faded → independent problems with Kuwait numbers (50 °C, ~2,100 kWh/m²/yr GHI, dust, shamal) | worked examples, inline problems, calculators |
| **Field practice** | Who does it, documents/tools, what goes wrong, PM checks, questions to ask contractors | pitfalls, checklists, "ask the contractor", graded scenarios, Feynman checks |

Evidence-based mechanics built into the platform:

- **Retrieval practice** — a 5–8 question quiz after every lesson; module exams; timed mixed exams.
- **Spaced repetition** — FSRS scheduler (ts-fsrs) over flashcards generated from every lesson,
  the bilingual glossary and the formula sheet; daily review queue with a new-card limit.
- **Interleaving** — "Mixed practice" draws questions across completed lessons, weighted toward
  weak concepts and the error log.
- **Worked → faded → independent** examples in every applied section.
- **Elaboration / Feynman** — explain-it-back prompts graded by the AI tutor against key points.
- **Concept maps** — concept graph across modules.
- **Scenarios** — "You are the PM…" graded decision trees; "Day in the life" collection.
- **Mastery per concept** — recency-weighted, evidence-shrunk accuracy per concept → competency
  mastery → job-readiness score.
- **Error log** — every wrong answer is logged and resurfaced until answered correctly twice.

## 2. Curriculum map

Build order (job relevance): Phase 1 = core + M0 + M1; then M8, M9, M10, M7, M2, M5, M6, M11,
M13, M14, M12, M3, M4, M15. Lessons marked by id.

| # | Module | Lessons |
|---|---|---|
| 0 | **Kuwait Energy Landscape** | l01 Kuwait's power system (demand, peak, fleet, fuel) · l02 Institutions & decision chains · l03 Tariffs, subsidies & economics · l04 Targets & project pipeline (Shagaya, Dibdibah, Al-Khairan, KOC) · l05 How ministry projects are approved & funded |
| 1 | **Energy & Power Fundamentals** | l01 Energy vs power, thermodynamics, heat rate · l02 AC power, reactive power, PF · l03 Three-phase systems · l04 Per-unit, transformers, fault levels · l05 Capacity factor, load curves, load factor · l06 Power system structure, frequency & inertia |
| 2 | **Solar PV** | l01 Solar resource & sun geometry · l02 Cell physics & I-V curves · l03 Modules, bifacial, degradation · l04 Plant architecture: trackers, inverters, DC/AC · l05 Soiling, dust & desert design · l06 Energy yield, PVsyst, PR, P50/P90 · l07 Field QA: design review, factory audits, commissioning |
| 3 | **Concentrated Solar Power** | l01 CSP physics & technologies · l02 Thermal storage & power block · l03 Shagaya CSP & operating lessons · l04 CSP vs PV+BESS decision |
| 4 | **Wind** | l01 Power in the wind, Betz, power curves · l02 Weibull, shear, measurement, AEP · l03 Wakes, layout, desert conditions · l04 Wind project delivery & O&M |
| 5 | **Energy Storage (BESS)** | l01 Chemistries · l02 C-rate, DoD, RTE, SoH · l03 Use cases & sizing · l04 Degradation, augmentation, warranties · l05 Safety, fire codes, desert HVAC |
| 6 | **Grid Integration** | l01 Transmission & substations · l02 Grid codes · l03 Frequency/voltage control, PPC, grid-forming · l04 Interconnection studies & curtailment · l05 SCADA/EMS, protection, cyber, energization |
| 7 | **Project Development Lifecycle** | l01 Stage gates, feasibility, business case · l02 Site, geotech, EIA & permits · l03 Design stages & owner's engineer · l04 Procurement & construction management · l05 Testing, commissioning, performance tests, COD · l06 Handover, DNP, close-out |
| 8 | **Project Management & Controls** | l01 PMBOK/PRINCE2 for ministry projects · l02 Scope & WBS · l03 CPM scheduling & P6 · l04 Earned Value Management · l05 Risk & Monte Carlo · l06 Change, interfaces, document control · l07 QA/QC & HSE · l08 Stakeholders, contractors, reporting |
| 9 | **Contracts & Commercial** | l01 Contracting strategies & FIDIC suites · l02 Key FIDIC clauses · l03 Bonds & guarantees · l04 Liquidated damages · l05 PPAs & IPP/PPP structures · l06 O&M and LTSA · l07 Variations, claims, delay analysis, disputes |
| 10 | **Financial Management** | l01 Time value, NPV, IRR, payback · l02 LCOE · l03 CAPEX/OPEX benchmarks · l04 Project finance, DSCR · l05 Tariff bid evaluation & sensitivity · l06 Budget control & cash-flow forecasting · l07 Spreadsheet practice lab |
| 11 | **Public Procurement in Kuwait** | l01 Legal framework & CAPT · l02 Tendering process & bid evaluation · l03 PPP procurement via KAPP · l04 Approvals, oversight, local content · l05 Navigating delays |
| 12 | **Operations & Performance** | l01 Monitoring & KPIs · l02 Performance analysis & RCA · l03 Failures, inspections & warranty claims · l04 O&M strategy, spares, cleaning · l05 Asset management & lifecycle decisions |
| 13 | **Leadership & Communication** | l01 How a ministry works · l02 Briefs, memos & official letters (EN/AR) · l03 Presenting to senior officials · l04 Managing consultants, meetings & minutes · l05 Negotiation & influence |
| 14 | **AI-Native Project Management** | l01 How LLMs work, strengths & limits · l02 Reviewing contracts, specs, tenders · l03 Drafting EN/AR documents · l04 Analysing schedule, cost & performance data · l05 Building your own tools with Claude Code · l06 Verification, confidentiality & prompt library |
| 15 | **Capstone: 1 GW PV + BESS for MEWRE** | l01 Project brief · l02 Tender-to-COD simulation (scored KPIs: cost, schedule, quality, stakeholder trust, safety) · l03 Debrief & readiness review |

## 3. Tech stack

| Concern | Choice | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) + TypeScript | Server routes for DB/AI, static lesson pages |
| Styling | Tailwind CSS v4, CSS variables, dark mode | Calm, readable, no component library weight |
| Database | SQLite (better-sqlite3), file `data/mewre.db` | Local-first, zero-config; schema mirrored in `supabase/schema.sql` for a later move |
| Content | Typed TS objects + Markdown strings (GFM + KaTeX) | Type-checked, validator catches bad ids/answers/LaTeX |
| Math | KaTeX via remark-math/rehype-katex | Fast server-renderable equations |
| Charts | Recharts + custom SVG | Interactive calculators and diagrams |
| Spaced repetition | ts-fsrs (FSRS-5) | Modern, open, well-tested scheduler |
| AI tutor | Anthropic SDK (Claude API, `ANTHROPIC_API_KEY`) | Explain, quiz, grade written answers, lesson-aware chat |
| Tests | Vitest | Scoring, mastery, FSRS wrapper, calculators, content validity |
| Spreadsheets | exceljs generator script | Downloadable models with live formulas |

## 4. Data model

Content (static, in repo): `Module → Lesson → Section → Block`, plus `Question`, `Flashcard`,
`Concept`, `Scenario`, `Simulation`, `GlossaryTerm`, `Formula`, `Reference` — see
`src/content/schema.ts`.

Learner state (SQLite):

| Table | Purpose |
|---|---|
| `lesson_progress` | lesson_id, status, started/completed timestamps, seconds spent |
| `attempts` | every answer: question_id, source (quiz/exam/diagnostic/mixed/review/inline), correct, score 0..1, response JSON, concepts, timestamp |
| `cards` | FSRS state per card id (due, stability, difficulty, reps, lapses, state, last_review) |
| `review_log` | every card review with rating |
| `errors` | error log: question_id, wrong count, last wrong, cleared flag, consecutive correct |
| `notes` | per-lesson notes (markdown) |
| `scenario_runs` / `exam_runs` / `sim_runs` | scored runs with details |
| `activity` | daily activity for streaks & time spent |
| `settings` | hours/week, start date, daily new-card limit, theme |

Derived: concept mastery (from attempts), competency mastery, readiness score, recommendations.

## 5. Phased build plan

1. **Phase 1** — platform core: navigation, lesson renderer, quizzes (all 7 question types),
   attempts & mastery, FSRS reviews, dashboard, diagnostic, error log; Module 0 and Module 1.
2. **Phase 2** — M8, M9, M10 (+ downloadable models), M7.
3. **Phase 3** — M2, M5, M6 with interactive engineering widgets.
4. **Phase 4** — M11, M13, M14 + AI tutor & graders.
5. **Phase 5** — M12, M3, M4.
6. **Phase 6** — Capstone simulation, readiness score, printing, polish, full test pass.

## 6. Design assumptions (decisions taken without a reply)

The brief asked to proceed without waiting, so these defaults were taken; all are changeable in
Settings or by editing content:

- **Time budget**: the `[X hours/week] for [Y weeks]` placeholders were not filled in. The
  finished curriculum estimates ~152 study hours, so the default plan is 12 h/week for 13 weeks.
  Enter your real numbers in Settings and the dashboard re-paces the weekly target and plan pace.
  At fewer hours, follow the study order (M0, M1, M8, M9, M10, M7 first) — they carry most of the
  job-readiness weight.
- **Single user, local-first** — no authentication; run locally (`npm run dev`) and open on a
  phone over LAN if desired. Supabase migration path documented.
- **AI tutor optional** — every feature works without an API key; AI grading falls back to
  rubric-based self-grading.
- **Language** — English UI and lessons; Arabic for glossary, official-letter templates and
  bilingual communication exercises.
