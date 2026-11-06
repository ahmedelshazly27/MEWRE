# Shazly Academy: multi-track plan (Nov 2026)

Private learning platform at **https://learn.shazly.xyz**. Track 0 (MEWRE PM) is complete; this document
covers the expansion into a founder academy. Status lives in PROGRESS.md; the curriculum in CURRICULUM.md.

## 1. Environment audit (6 Nov 2026)

| Area | What exists | Decision |
|---|---|---|
| Repo | `ahmedelshazly27/MEWRE`, Next.js 16.3 App Router (Turbopack, `proxy.ts`), TypeScript, Tailwind v4, KaTeX, Recharts, ts-fsrs. ~126k lines; 16 modules, 88 lessons, 43 widgets, 156 must-know concepts, full Arabic edition | Reuse everything; content stays typed TS validated at build |
| Learner store | Offline-first event log in IndexedDB, state derived by replay (FSRS, mastery, errors), Supabase sync | Ids are global strings, so one store, one review queue and one concept graph serve every track. No data migration: Track 0 ids unchanged |
| Supabase | Project "Blog" (`hkokhpihodaeltfnhfio`, eu-central-1), tables `mewre_events`, `mewre_docs` with RLS; email/password auth; 1 real user; other unrelated tables in the same project | Keep. No new project. Auth now via cookies so the server can gate pages |
| Vercel | Project `mewre-pm-academy` auto-deploys branch `claude/dazzling-albattani-27df49`; env `ANTHROPIC_API_KEY`, `AI_ALLOWED_EMAILS` | Keep the project; add domain |
| Domain | `shazly.xyz` on Vercel DNS, attached to a separate portfolio project (`shazly.xyz`, apex redirects to www) | **`learn.shazly.xyz`** on the academy project. A `/learn` path would need rewrites in the portfolio project plus a basePath on every academy route, service worker and data URL |
| AI | Tutor on Claude Sonnet 5.5, grading on Haiku 5.5, both require a signed-in allowlisted user | Learner profile per track |

## 2. Privacy

`src/proxy.ts` runs before the CDN cache on every page, RSC payload and `/data/*` file. It verifies the Supabase
session cookie (`getClaims`) and the email allowlist (`ALLOWED_EMAILS`, falling back to `AI_ALLOWED_EMAILS`).
Not signed in: redirect to `/login`. Signed in but not allowlisted: `/login?denied=1`. Data files return 401.
There is no sign-up anywhere in the app. Icons, the manifest and the service worker stay public; the offline
cache keeps working because precache requests carry the cookie.

## 3. Information architecture

- `/learn`: all tracks. `/tracks/[id]`: track home (readiness per competency, modules, continue, diagnostic,
  practice, capstone). Lessons, exams, cheat sheets and scenarios keep their global URLs (`/learn/[module]/...`,
  `/print/[module]`, `/scenarios/[id]`) because module ids are globally unique.
- Shared across tracks: dashboard (cards per track, weak areas, next lesson), daily review (one FSRS queue),
  practice (mixed or filtered by track), error log, glossary EN/AR, formula sheet, library, concept map, notes,
  AI tutor, settings.
- Arabic: Track 0 only (`/ar/...`). The toggle is hidden on English-only pages.

## 4. Data model

- `src/content/tracks.ts`: `Track { id, number, title, tagline, modules, studyOrder, competencies{id:{label,weight}},
  readinessLabel, tutorContext, arabic }`.
- Module id prefixes: Track 0 `m00..m15`; Founder Core `fc01..`; Afterwave `aw01..`; Mizan `mz01..`; Suhail `sh01..`.
  Lesson `fc03-l02`, concept `fc03.positioning`, must-know `k-fc03-...`.
- Competencies are scoped per track; readiness = 85 % weighted competency mastery + 15 % capstone.
- Cross-track links: concept `related` may point at any track's concept (concept map draws them); lessons use an
  `xref` block ("Founder Core: Unit economics") instead of repeating content.
- New lesson blocks: `chart` (data-driven line/bar/area), `flow` (process steps), `matrix` (2×2), `xref`.

## 5. Lesson shape (every new lesson)

1. Why it matters for you (one paragraph tied to the venture or the founder role).
2. Core concept with the mechanism, equations and units where they exist.
3. At least one visual: widget, chart, flow, matrix, diagram or data table.
4. Worked example with realistic numbers from the venture context (labelled illustrative).
5. How it is done in practice: who, tools, documents, what goes wrong, what to check or ask.
6. Applied exercise: produce a real artifact, graded by the AI grader against a rubric.
7. Retrieval quiz, flashcards and must-know concepts.

Writing rules: technical accuracy first; no invented facts about the ventures; operator-to-engineer tone, no
filler; no em dashes; the stealth Mizan cofounder is never named in content.

## 6. Tracks and modules

### Track 1 · Founder Core (phase 2, highest priority)
fc01 Startup fundamentals · fc02 Product management · fc03 Go-to-market · fc04 Sales · fc05 Marketing & brand ·
fc06 Finance & economics · fc07 Fundraising · fc08 Equity & legal · fc09 Operating the company ·
fc10 AI-native founder · fc11 Capstone: seed round package.
Widgets: cap table & dilution, SAFE vs priced round, unit economics & runway, pricing experiments, pipeline forecaster.

### Track 2 · Afterwave (phase 3)
Hardware test engineering · DAQ & signals (sampling, sync, clocks, MDF/TDMS/Parquet) · Test orchestration & CI
for hardware · Requirements traceability · Change impact & regression test selection · Embedded firmware basics ·
Robotics & physical AI fundamentals · ML on bench data & agents (on-prem) · Test platform engineering
(dynos, load cells, chambers, calibration, interlocks) · Functional safety & standards (ISO 13849, IEC 61508,
ISO 10218, ISO 26262, GSN) · EU Machinery Regulation & CE for AI-enabled machines · Selling into test & validation
orgs · Competitive landscape · Pricing (infra software, test platforms, test-as-a-service) · YC/US vs Zurich/EU ·
Capstone (pilot from first outbound to signed pilot + Ripple demo narrative + go/no-go memo on the first test platform).
Widgets: dependency graph & change-impact visualiser, bench data sync (two streams, one clock), actuator test
platform economics, GSN safety case builder.

### Track 3 · Mizan (phase 4)
Soiling physics · Soiling measurement (IEC 61724, PR temperature correction, inference from operational data,
pvlib/PySAM) · Cleaning optimisation economics · Tracker & stow logic · PPC, EMS & SCADA · Kuwait grid (links to
Track 0) · BESS for sellers (links to Track 0) · Plant data pipelines (tags, historians, Modbus/OPC UA) · Validation
study design & co-publishing with KISR · Selling in Kuwait & the Gulf (links to Track 0 procurement) · Distribution &
agency agreements · Capstone (Shagaya validation study + cleaning optimisation business case).
Widgets: soiling loss & cleaning optimiser, PR calculator with temperature correction, stow decision simulator.

### Track 4 · Suhail (phase 5)
Community & ecosystem design · Hackathon design & operations · Event economics & sponsorship sales · Partnerships
with companies, universities, governments, funds · Media operations (newsletter, podcast, colloquial Arabic) ·
Arab tech & AI landscape · Nonprofit vs for-profit vs hybrid · Volunteer teams · Open-weight LLM research
fundamentals · Capstone (first hackathon plan, budget and sponsorship round).
Widgets: event P&L & sponsorship model, community growth funnel.

## 7. Phases

1. **Architecture** (done 6 Nov 2026): tracks, routes, nav, readiness, privacy gate, learn.shazly.xyz.
2. **Founder Core**: content via one author per module working from this plan and `docs/FOUNDER_BRIEF.md`;
   widgets built in parallel; deploy.
3. **Afterwave**, 4. **Mizan**, 5. **Suhail**: same pattern; deploy after each.

## 8. Research (sources in docs/research/, dated Nov 2026)

- `2026-11-afterwave-market.md`: Machinery Regulation 2023/1230 applies 20 Jan 2027 (no general delay found);
  AI Act Digital Omnibus (Reg. 2026/1744) moved machinery to Annex I Section B; Nominal, Sift, Foxglove,
  Applied Intuition, Rerun, Formant landscape; no vendor found doing rig/firmware/model change-impact test
  selection; YC deal unchanged; W27 deadline passed 2 Nov 2026.
- `2026-11-mizan-soiling-kuwait.md`: corrected Shagaya paper citation (Al-Rasheedi et al., RSER 133, 2020);
  IEC 61724-1:2021 soiling ratio; NREL weather-corrected PR (Dierauf 2013); no public Kuwait soiling rate found;
  tracker vendors advertise no dust-storm stow; Zone 1 award status and Kuwait pipeline.
- `2026-11-suhail-arab-ai-founder.md`: Gulf sovereign AI and open Arabic models, benchmarks, MENA VC 2025-26,
  community-company models, YC/speedrun/Hub71/WBSO/BV/GmbH/Kuwait ownership facts.

Web pages could not be fetched directly in this environment (search summaries only), so every research item is
marked with its source and date; anything unconfirmed is labelled UNVERIFIED and must stay labelled in lessons.
