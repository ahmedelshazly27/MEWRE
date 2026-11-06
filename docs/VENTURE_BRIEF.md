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

## Track 3 · Mizan

(Section added before the Mizan phase.)

## Track 4 · Suhail

(Section added before the Suhail phase.)
