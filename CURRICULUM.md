# Shazly Academy: Curriculum & Design Plan

Private multi-track learning platform at https://learn.shazly.xyz. Since November 2026 it holds five tracks
that share one learner store, one review queue and one concept graph:

| Track | Purpose | Status |
|---|---|---|
| 0 · MEWRE Project Manager | Renewable-energy PM at Kuwait's MEWRE (this document, sections 1 to 6) | Complete, English and Arabic |
| 1 · Founder Core | Running a venture-scale startup: product, GTM, sales, finance, fundraising, equity, operations, AI | Complete: 11 modules, 69 lessons |
| 2 · Afterwave | Physical AI test infrastructure: the science and the business | Complete: 15 modules, 83 lessons |
| 3 · Mizan | PV soiling analytics, cleaning optimisation and stow/tracker control in Kuwait and the Gulf | Complete: 13 modules, 64 lessons |
| 4 · Suhail | Builder ecosystem for the Arab world | Complete: 10 modules, 60 lessons |

Architecture, data model, lesson shape and module outlines for Tracks 1 to 4: [`docs/ACADEMY_PLAN.md`](docs/ACADEMY_PLAN.md).
Authoring briefs: [`docs/FOUNDER_BRIEF.md`](docs/FOUNDER_BRIEF.md) (all tracks) and [`docs/VENTURE_BRIEF.md`](docs/VENTURE_BRIEF.md) (Tracks 2 to 4).
Module and lesson lists for Tracks 2 to 4 are in section 7 at the end of this document; Founder Core outlines are in the plan.

The rest of this document describes Track 0, the original MEWRE PM curriculum: preparation for a Project Manager
role on renewable-energy projects at Kuwait's Ministry of Electricity, Water and Renewable Energy (MEWRE): Shagaya
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
| Learner data | Event log in IndexedDB + Supabase sync (`mewre_events`, `mewre_docs`, RLS) | Offline-first on phone and laptop; conflict-free merge across devices |
| Offline | Service worker + web app manifest (installable PWA), all pages prerendered | Full curriculum usable with no connection |
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

Learner state (append-only events in IndexedDB, synced to Supabase; tables below are *derived* views computed in the browser):

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
- **Offline-first, synced** — progress lives on each device and syncs through Supabase (tables in
  the existing Blog project, since the free plan's two project slots were in use). Deployed on Vercel
  at mewre-pm-academy.vercel.app; installable as a phone app.
- **AI tutor optional** — every feature works without an API key; AI grading falls back to
  rubric-based self-grading.
- **Language** — English UI and lessons; Arabic for glossary, official-letter templates and
  bilingual communication exercises.

## 7. Venture tracks: module map

English only. Each track ends in a capstone module whose exam score is the track's capstone share of readiness.

### Track 2 · Afterwave

| # | Module | Lessons |
|---|---|---|
| aw01 | **How hardware test engineering works** | l01 Anatomy of a test bench and a validation organisation · l02 Test plans and design of experiments · l03 Reliability testing: life tests, Weibull, MTBF and accelerated testing · l04 Electrical and thermal characterisation of drives, motors and batteries · l05 Failure analysis and root cause · l06 Where time and money go in a test organisation |
| aw02 | **Data acquisition and signals** | l01 Sensors and signal chains · l02 Sampling, aliasing and resolution · l03 Clocks, timestamps and synchronisation · l04 Data formats and storage · l05 Capturing on-screen actions and software context alongside signals · l06 Data quality and provenance |
| aw03 | **HIL, SIL, test orchestration and CI for hardware** | l01 MIL, SIL, PIL and HIL: what each simulates and the real-time budget · l02 HIL systems in practice: architecture, IO, fault injection and utilisation · l03 Test automation and orchestration: sequencers, rig scheduling, overnight runs and flaky tests · l04 CI/CD for hardware and firmware: pipelines, gating, rig farms and queueing math · l05 Reporting and traceability of runs: artefacts, metadata, verdicts and dashboards · l06 Where agents fit: planning retests and running rigs with human approval |
| aw04 | **Requirements traceability** | l01 Requirements engineering basics: levels, verifiability and EARS · l02 The trace matrix and the V-model: coverage and suspect links · l03 Tools and their data models: DOORS, Polarion, Jama, Codebeamer, ReqIF, Xray and TestRail · l04 Traceability in regulated domains: ISO 26262, IEC 61508 and the Machinery Regulation · l05 From traceability to evidence: test runs, bench data and change impact |
| aw05 | **Change impact and test selection** | l01 Dependency graphs: artifacts, components and tests as a DAG · l02 Regression test selection theory: safety, precision, recall and the cost of a skip · l03 Coverage in software and in hardware: where edge weights come from · l04 Learning impact from history: co-change, failure history, prioritisation and cold start · l05 Physical and model changes are different: recalibration, sensor swaps, retrained models, nondeterminism and sim-to-real · l06 Explaining "why rerun this test": evidence trails, confidence, trust and human approval |
| aw06 | **Embedded firmware basics** | l01 Microcontrollers and embedded architectures · l02 RTOS and control loops in firmware · l03 Communication buses: CAN, EtherCAT, SPI, I2C, UART · l04 The firmware lifecycle: versions, variants, calibration, flashing and release · l05 Firmware testing: unit, SIL, HIL, static analysis, MISRA, coverage |
| aw07 | **Robotics and physical AI fundamentals** | l01 Actuators and drives: motors, gearboxes, harmonic drives and what limits a joint · l02 Control loops: PID, cascaded current, velocity and position loops, bandwidth and stability margins · l03 Perception: encoders, IMUs, cameras, lidar, sensor fusion and the Kalman filter · l04 Learned policies and robot foundation models: imitation learning, RL and vision-language-action models · l05 Sim vs real: simulators, the domain gap, domain randomisation and why bench evidence matters · l06 The humanoid and physical AI market in 2026, and its validation bottlenecks |
| aw08 | **ML and agents on bench data** | l01 Time-series fundamentals for test data: resampling, windowing, features and spectra · l02 Anomaly detection on bench signals: baselines, isolation forests, autoencoders and alarm cost · l03 Training local models on customer data: volumes, labels, model choice, compute and evaluation · l04 Agents with tool use for test engineering: planning, rig tools, approval gates and evaluation · l05 Privacy, IP and on-prem deployment: why hardware companies refuse the cloud and what Enclave must guarantee · l06 Data flywheels and bench memory as a moat: when data compounds and when it does not |
| aw09 | **Test platform engineering** | l01 Dynamometers and actuator test rigs · l02 Load cells, torque and force measurement · l03 Thermal chambers, cycling and environmental testing · l04 Instrumentation and calibration · l05 Mechanical design basics and safety interlocks · l06 Test-as-a-service economics · l07 Afterwave's own platforms: integration with the software and a go/no-go framework |
| aw10 | **Functional safety and safety cases** | l01 Functional safety principles: hazard, risk, safety functions and how things fail · l02 ISO 13849-1 Performance Levels and IEC 61508 / IEC 62061 SIL: the maths · l03 Robot safety: ISO 10218:2025, collaborative applications and the humanoid gap · l04 Automotive and AI: ISO 26262, SOTIF, ISO/PAS 8800 and ISO/IEC TR 5469 · l05 Safety cases and GSN: claims, arguments and credible evidence · l06 Safety evidence as a business: from bench memory to the evidence layer |
| aw11 | **EU Machinery Regulation and CE marking for AI-enabled machines** | l01 From the Machinery Directive 2006/42/EC to Regulation (EU) 2023/1230 · l02 Essential health and safety requirements for AI, software and connected machines · l03 Conformity assessment, the technical file and CE marking · l04 The AI Act after the 2026 Digital Omnibus, the Cyber Resilience Act and the rest of the stack · l05 The Machinery Regulation as Afterwave's go-to-market wedge |
| aw12 | **Selling into test and validation organisations** | l01 Who buys: the map of a hardware test organisation · l02 The pain in numbers: a business case for capture and change impact · l03 Pilot design for test infrastructure · l04 Security reviews and on-prem procurement · l05 Segments and sequencing: humanoids, automotive tier-1s, drives and batteries · l06 Founder-led selling with technical cofounders |
| aw13 | **Competitive landscape** | l01 Mapping the landscape: who touches the test bench · l02 Nominal and Sift up close · l03 Incumbents and in-house tools: build vs buy in test organisations · l04 Differentiation and moats: what is actually defensible · l05 Battlecards and objection handling |
| aw14 | **Pricing, YC and company setup** | l01 Pricing infrastructure software: value metrics, on-prem vs hosted, and a price build for Lockstep and Ripple · l02 Pricing test platforms and test-as-a-service: hardware margin, test-hour pricing and data rights · l03 YC and US venture expectations for a hardware-adjacent AI infrastructure company · l04 Company setup: Netherlands vs Zurich vs Delaware · l05 The fundraising story for Afterwave: narrative, why now, risks and a milestone plan |
| aw15 | **Capstone: first pilot and the first test platform** | l01 From first outbound to signed pilot · l02 The Ripple demo narrative · l03 Go/no-go memo on the first hardware test platform |

### Track 3 · Mizan

| # | Module | Lessons |
|---|---|---|
| mz01 | **Soiling physics** | l01 Dust in Kuwait and the Gulf: sources, sizes, storms and aerosol optical depth · l02 Deposition physics: settling, impaction, wind, tilt and resuspension · l03 Adhesion and cementation: van der Waals, capillary forces, dew cycles and why mornings matter · l04 Optical loss mechanisms: transmittance, spectrum, non-uniform soiling, bifacial rear side and mass density · l05 Mitigation physics: coatings, stow angle, tilt and row spacing, and their limits |
| mz02 | **Soiling measurement and performance ratio** | l01 IEC 61724-1:2021: monitoring classes and the soiling ratio · l02 Performance ratio and temperature correction · l03 Soiling sensors and stations in practice · l04 Measurement uncertainty and what it means for cleaning decisions · l05 Designing the measurement plan for a pilot site: Shagaya Phase I |
| mz03 | **Inferring soiling from operational and satellite data** | l01 The inference problem: separating soiling from temperature, degradation, clipping, curtailment, outages and sensor drift · l02 Methods: stochastic rate and recovery (SRR), change points and cleaning-event detection · l03 Modelling expected energy with pvlib and PySAM: transposition, temperature, DC/AC models and residual analysis · l04 Satellite and reanalysis proxies: CAMS and MERRA-2 dust, aerosol optical depth, commercial soiling models and their uncertainty · l05 Validation against ground truth and natural experiments: the Shagaya cleaning interruption · l06 From soiling estimate to decision signal: confidence intervals, alerting and what plant operators need |
| mz04 | **Cleaning optimisation economics** | l01 The economics of one cleaning: the square-root rule · l02 What a soiled MWh is worth in Kuwait: tariff vs displaced fuel · l03 Cleaning technologies and their cost structures · l04 Dynamic scheduling: storms, rain, dew and the value of a forecast · l05 Robots as capex: payback, availability and failure · l06 Selling the cleaning decision: credible savings, M&V and sharing gains |
| mz05 | **Tracker and stow control under dust, wind and heat** | l01 Single-axis tracker kinematics: true tracking, backtracking, diffuse and bifacial · l02 Wind loads and stow: aerodynamics, galloping, thresholds and fail-safe logic · l03 Dust, hail and heat: dust-storm stow, night stow for soiling, and the yield vs risk trade-off · l04 Control architecture: tracker controllers, network controllers, SCADA, weather and forecasts · l05 The product opportunity: vendor white space, integration and warranty risk, and piloting a control function safely |
| mz06 | **PPC, EMS and SCADA for hybrid plants** | l01 Power plant controllers: set-points, ramps, frequency and voltage loops · l02 Energy management systems for PV + BESS: dispatch, SoC, forecasting and revenue stacking · l03 SCADA architecture: RTUs, PLCs, historians, HMI, alarms and IEC 62443 · l04 Hybrid plant integration projects: vendors, interface specs, controls FAT/SAT and failure points · l05 Where a controls and analytics company makes money, and why Mizan moved from services to products |
| mz07 | **Kuwait grid and grid codes for a seller** | l01 Kuwait's system in numbers, for a seller · l02 Grid code requirements that touch plant controls and analytics · l03 Curtailment, availability and how they confound soiling analytics · l04 Who owns which decision at a Kuwaiti plant, and what that means for selling |
| mz08 | **BESS at the depth a seller needs** | l01 The BESS conversation in 30 minutes · l02 Kuwait's BESS programme and where a distributor fits · l03 Chinese integrators and turnkey supply: tiers, warranties, due diligence, fire and desert · l04 BESS analytics as an add-on to a PV soiling product |
| mz09 | **Plant data pipelines** | l01 What a PV plant's data looks like: tags, devices, sampling rates, volumes and naming · l02 Protocols a seller must understand: Modbus, OPC UA, IEC 61850, DNP3 and MQTT · l03 Historians and data access: PI System, exports, APIs and data-sharing agreements · l04 Cloud and on-prem architectures for plant analytics: edge gateways, time-series databases, Parquet lakes, pipelines and costs · l05 Data quality and cleaning for soiling analytics: gaps, timestamps, drift, availability flags and a pilot checklist |
| mz10 | **Validation study design and co-publishing** | l01 Designing a validation study: hypotheses, metrics, ground truth, sample size and duration · l02 Natural experiments and observational data: the Shagaya cleaning-arm failure and difference-in-differences · l03 Working with a research institute: KISR as methodology partner, data, authorship, timelines, IP and agreements · l04 Writing and publishing: paper structure, peer review, preprints, conferences and open data · l05 Turning a study into commercial credibility: case studies, what to say before and after publication, and avoiding overclaiming |
| mz11 | **Selling in Kuwait and the Gulf** | l01 The buyer map: who owns the soiling loss, and who can sign · l02 Getting paid by a Kuwaiti public body: tenders, direct contracting and research collaboration · l03 Selling to IPP O&M teams in the Gulf: plant archetypes and the business case · l04 Relationships, wasta and trust, done ethically: the seller's side · l05 Structuring an analytics pilot: scope, data, success metrics, fees and publication rights · l06 Pricing analytics: software, service or savings share |
| mz12 | **Distribution, partners and the business model** | l01 Build, partner or resell: a decision framework with economics, applied to Mizan's four product lines · l02 Distribution and agency agreements in Kuwait: agency law concepts, exclusivity, territory, minimums and termination · l03 Working with Chinese integrators and international vendors: due diligence, certification, warranties, after-sales and payment terms · l04 Partnering with an analytics vendor like SwishOS versus building in-house: overlap, data rights, white-labelling and revenue share · l05 Operating constraints: public claims discipline and open-source research tools |
| mz13 | **Capstone: Shagaya validation study and business case** | l01 Design the Shagaya validation study: hypotheses, data, method, metrics and protocol · l02 Defend it to KISR researchers: objections, sensor doubts and publication terms · l03 The cleaning optimisation business case for a Gulf IPP |

### Track 4 · Suhail

| # | Module | Lessons |
|---|---|---|
| sh01 | **Community and ecosystem design** | l01 What an ecosystem is: actors, value flows and network effects · l02 How the reference communities work: YC, {Tech: Europe}, On Deck, Founders Inc, Antler, Indie Hackers · l03 Designing Suhail's community: tiers, rituals, contribution ladders and retention · l04 Trust, quality and curation: filters, codes of conduct, moderation and dilution · l05 Measuring community health: active members, contribution, cohorts, repeat rate and NPS · l06 The Arab context: cities, diaspora, language, event culture and what transplants from Europe |
| sh02 | **Hackathon design and operations** | l01 What a hackathon is for: goals, formats and the {Tech: Europe} and MLH models · l02 Designing the challenge: themes, sponsor tracks, prizes and judging rubrics · l03 The participant funnel: registration, acceptance, no-shows and team formation · l04 Operations: venue, power and network capacity, food, safety, volunteers and run-of-show · l05 Judging, demos and after: calibration, winners, sponsor reports and follow-up · l06 Running hackathons in the Gulf, Egypt and the Levant: permits, timing, language and partners |
| sh03 | **Event economics and sponsorship sales** | l01 Event P&L anatomy: fixed and variable costs, break-even and contribution · l02 Budgeting a meetup, a hackathon and a conference: line items, contingency, cash timing and in-kind · l03 Sponsorship packages: tiers, what sponsors buy, value-based pricing and benefit cost · l04 Selling sponsorship: target list, outreach, the call, objections, Gulf budget cycles and forecasting · l05 Delivering and renewing: sponsor reports, make-goods, renewal economics and multi-event deals · l06 Ticket pricing and free vs paid events: no-shows, overbooking, price tests and subsidies |
| sh04 | **Partnerships across the Gulf, Egypt and the Levant** | l01 The partner map: who is in the room and what each wants · l02 Value exchange design: structures, MOUs, contracts and exclusivity · l03 Country playbooks: Saudi Arabia, UAE, Qatar, Kuwait, Egypt, Jordan, Lebanon · l04 Running a partnership pipeline: qualification, stages, forecast and partner health · l05 Governance and reputation: conflicts, independence, compliance and saying no · l06 Investors and employers as partners: connecting builders with capital and jobs |
| sh05 | **Media operations: newsletter, podcast, bilingual content** | l01 Editorial strategy: audience, positioning, calendar and independence · l02 Newsletter mechanics: list growth, metrics, deliverability and segmentation · l03 The Majlis podcast: format, guests, recording chain and measurement · l04 Language: dialects, MSA, English, code-switching, RTL and Arabic SEO · l05 Funnel and growth: from content to community · l06 Monetisation and operations: sponsorship, CPM maths, volunteer workflow and AI with human review |
| sh06 | **The Arab tech and AI landscape** | l01 Gulf sovereign AI: strategies, compute build-outs and the entities behind them · l02 Open Arabic models and benchmarks: who builds what, licences and reading a model card · l03 MENA venture capital 2025 to 2026: what the numbers show and what they do not · l04 Talent: where Arab builders are, how they move, and who hires them · l05 Ecosystem gaps: where Suhail can add value and where it must not compete · l06 Reading the landscape: a living map, sources to follow and how to check a claim |
| sh07 | **Structures: nonprofit, for-profit or hybrid, and how community companies make money** | l01 Legal structure options: nonprofit, for-profit, hybrid, fiscal sponsorship, and where to incorporate · l02 Revenue models of community companies: what each stream sells and who has made it work · l03 Unit economics of a community business: contribution by stream, sponsor lifetime value and concentration risk · l04 Governance and money: unpaid leads, equity or not, conflicts of interest and transparency · l05 Taking investment or not: what VCs, grant funders and sponsors expect, and what each does to independence · l06 Choosing for Suhail: criteria, a weighted decision and the structure memo |
| sh08 | **Running a volunteer-led team** | l01 Motivation without pay: what volunteers get, why they stay and how much to ask of them · l02 Roles and ownership: lead charters, decision rights and an async-first cadence across time zones · l03 Capacity planning: pledged hours, load, burnout maths and the bus test · l04 Recruiting, onboarding, recognising and offboarding volunteers · l05 Moving from unpaid to paid: triggers, fairness, first hires and the equity question · l06 Tools and rituals: the handbook, the board, meetings worth having and access hygiene |
| sh09 | **Open-weight LLM research fundamentals** | l01 The training pipeline: from crawl to chat model, with the losses written out · l02 Tokenisation: BPE, unigram, Arabic morphology and the fertility tax · l03 Scaling laws: Kaplan, Chinchilla, compute-optimal training and over-training · l04 Compute cost arithmetic: FLOPs, GPU-hours, memory and budgets · l05 Evaluation: Arabic benchmarks, contamination, LLM judges and error bars · l06 Datasets: sourcing Arabic data, rights and consent, dialect coverage, filtering and datasheets · l07 A research agenda for Suhail: what a volunteer research arm can do, and how to review proposals |
| sh10 | **Capstone: the first hackathon and sponsorship round** | l01 The brief: event concept, goals and success metrics · l02 The budget and P&L: break-even, contingency and the cash gate · l03 The sponsorship package, target list and pipeline forecast · l04 Run-of-show, team plan, risk register and permits · l05 The post-event report, the next sponsorship round and the community funnel |
