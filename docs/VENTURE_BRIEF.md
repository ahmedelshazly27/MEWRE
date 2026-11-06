# Brief: writing a venture-track module (Afterwave, Mizan, Suhail)

Read first: `docs/FOUNDER_BRIEF.md` (the lesson shape, module shape, house style, ids and validation rules are
identical: follow every rule there, replacing the `fc` prefix with your track's prefix), then this file's section
for your track, `docs/ACADEMY_PLAN.md` section 6, and your track's research brief in `docs/research/`.

You own ONLY `src/content/<track>/<id>/` (replace the placeholder `index.ts`; add lesson files, `exam.ts`,
`glossary.ts`, `formulas.ts`, `references.ts`) and `src/content/key/<id>.ts` (`ar: []`). Other authors write the
other modules at the same time. No git, no npm install, no dev server.

## What these tracks are for

The learner needs two things from each venture track:
1. Deep technical and scientific understanding of what the company builds and the concepts behind it, enough to
   sell it credibly to technical buyers, challenge his cofounders, write accurate materials and make product
   decisions without writing the code. Technical modules go to real engineering depth: mechanisms, equations,
   units, standards, failure modes, numbers.
2. Everything else specific to running that company: market, buyer, competition, business model, sales motion,
   regulation, fundraising story and operating decisions.

Founder Core (`src/content/founder/fc01..fc11`) already holds the general startup material. Do not repeat it:
link with `{ kind: "xref", to: "<lesson id>", note: "..." }` and add only the venture-specific application. Grep
`src/content/founder/*/l*.ts` and `src/content/modules/*/l*.ts` (Track 0) for lesson and concept ids before linking.
The validator rejects xrefs to ids that do not exist.

## No fabricated facts

Use only the venture context in this brief and in `docs/FOUNDER_BRIEF.md`. Never invent customers, pilots,
revenue, partners, quotes or numbers for the venture. Use labelled illustrative numbers for worked examples.
External facts (standards, regulation, competitors, market data) come from established knowledge or the research
brief, with its dates; anything uncertain goes in a `callout` with `tone: "unverified"`.

---

## Track 2 · Afterwave (`src/content/afterwave/awXX`, ids `aw01..aw15`)

Context: physical AI test infrastructure. The company captures hardware and software data at the test bench and
uses it to tell engineers what to retest.
- **Lockstep**: capture app that records rig signals via data acquisition and on-screen actions on one clock.
- **Afterwave Enclave**: private environment where captured data, trained models and agents run, on customer servers
  or an isolated tenant.
- **Ripple**: change-impact engine: after a firmware, model or rig change, which tests to rerun and why.
- **Bench memory**: the generic term for the accumulated test data.
- Product vision, in order: (1) capture layer and Ripple; (2) teams train local models and hand context to their own
  agents inside Enclave; (3) agents plan retests, run rigs overnight with human approval and write reports; (4) later,
  Afterwave's own hardware test platforms (for example a generalised actuator test platform) that ship instrumented,
  feed bench memory from day one and become the physical half of the evidence layer.
- Positioning: physical/embodied AI, not generic test automation. Analogy: what Alexandria (Ambient and Confidential
  Cloud) does for its domain, applied to the test bench. Regulatory entry point: EU Machinery Regulation 2023/1230
  (applies from 20 January 2027). Long-term: safety evidence infrastructure, then a risk layer insurers can use.
- Team: the learner (CEO, GTM), Ismail Elmasry (ex-Tesla drive unit validation, now test systems at Signify), Yusuf
  Keklik (ex-Tesla drive inverter test and reliability). Applied to YC W27; considering Zurich.
- Target customers: hardware test teams in robotics, humanoids, drives and motors, batteries, powertrains,
  autonomous machines.
- Research: `docs/research/2026-11-afterwave-market.md` (Machinery Regulation status, AI Act omnibus, standards
  status, Nominal/Sift/Foxglove/Applied Intuition/Rerun landscape, humanoid market, YC terms).

Competency ids: `aw-test`, `aw-data`, `aw-impact`, `aw-physical-ai`, `aw-ml`, `aw-platforms`, `aw-safety`,
`aw-business` (see `src/content/tracks.ts`).

Widgets for this track: `change-impact`, `bench-sync`, `platform-economics`, `gsn-builder`; plus Founder Core
`pipeline-forecast`, `pricing-experiment`, `unit-economics`, `cap-table`, `safe-vs-priced` and any Track 0 widget
(`monte-carlo`, `risk-matrix`, `weibull`, ...). See `src/content/widgets.ts`.

Each module's placeholder `index.ts` already has its title, number and competency; you may refine the title.

## Track 3 · Mizan (`src/content/mizan/mzXX`, ids `mz01..mz13`)

Context: energy engineering firm in Kuwait and the Gulf. The name stays Mizan; the concept moved from a BESS and
hybrid plant controls and integration services firm to a product-focused company around PV soiling analytics,
cleaning optimisation and plant control functions such as stow and tracker control under dust, wind and extreme heat.
- Cofounders: Omar Abu Harb may be named. A second cofounder is in stealth: never name, describe or hint at him.
- Live thread: a soiling analytics pilot in Kuwait, target site Shagaya Phase I (operated by KISR), with KISR
  researchers (Mohammad Al-Khayat and co-authors of the 2020 Shagaya PV performance paper) as methodology partner. The
  exact citation is Al-Rasheedi, Gueymard, Al-Khayat, Ismail, Lee, Al-Duaj, Renewable and Sustainable Energy Reviews
  133 (2020) 110139. KISR confirmed there is no standard method for turning operational data into cleaning decisions.
  Temperature-corrected performance ratio to IEC 61724 is the baseline. The 2018 to 2019 cleaning arm failure at
  Shagaya is a natural experiment for validation. Describe the pilot as targeted or in preparation, never as signed
  or running.
- Distribution thread: bringing software and turnkey hardware (controls, PPC/EMS, BESS, cleaning robots, possibly
  Chinese integrators) to Kuwait; SwishOS (Swish Solar) was discussed as a soiling analytics partner.
- Planned open-source research tools: Kuwait dust/soiling atlas, Kuwait electricity dataset, Kuwait energy systems
  toolkit.
- Research: `docs/research/2026-11-mizan-soiling-kuwait.md` (soiling science and rates, IEC 61724, NREL corrected
  PR, commercial players, tracker vendors, Kuwait pipeline and procurement status, Gulf O&M practices).
- Track 0 already covers PV technology (m02), BESS (m05), grid integration (m06), Kuwait sector and institutions (m00)
  and Kuwait procurement (m11): xref those lessons instead of re-teaching, and add the seller's angle.

Competency ids: `mz-soiling`, `mz-cleaning`, `mz-control`, `mz-data`, `mz-grid`, `mz-validation`, `mz-business`.

Widgets: `pr-correction`, `stow-decision`, Track 0 `soiling` (cleaning-interval optimiser), `loss-waterfall`,
`p50-p90`, `kuwait-climate`, `sun-path`, `dc-ac-ratio`, `bess-sizing`, `droop`; Founder Core `unit-economics`,
`pricing-experiment`, `pipeline-forecast`.

## Track 4 · Suhail (`src/content/suhail/shXX`, ids `sh01..sh10`)

Context: Suhail (سهيل) is a builder ecosystem for the Arab world: hackathons, events, a newsletter, the Suhail Season
conference, The Majlis podcast, connecting builders with investors and employers, and a planned research arm doing
open-weight models, datasets and benchmarks for the Arab world. Domain suhail.build; site on Vercel with its own
Supabase and Resend. Team of leads (Partnerships, Events and Programming, Editorial, Head of Engineering, Finance
Lead), unpaid until revenue; plan starts January 2027. Modelled partly on {Tech: Europe}. Nothing has launched yet:
no members, sponsors, events or numbers exist; use labelled illustrative numbers only.
- Research: `docs/research/2026-11-suhail-arab-ai-founder.md` (Gulf sovereign AI, open Arabic models and benchmarks,
  Arabic NLP challenges and datasets, MENA VC 2025 to 2026, community-company models, hackathon sponsorship examples,
  Saudi event permits).
- Founder Core holds general GTM, sales, marketing, finance, legal and operations: xref it.
- The research arm module must go to real technical depth (training pipelines, tokenisation, scaling laws, evaluation,
  contamination, compute cost arithmetic) so he can lead it credibly without being the researcher.

Competency ids: `sh-community`, `sh-events`, `sh-partnerships`, `sh-media`, `sh-landscape`, `sh-org`, `sh-research`.

Widgets: `event-pnl`, `community-funnel`; Founder Core `pipeline-forecast`, `pricing-experiment`, `unit-economics`.
