# Brief: writing a Founder Core module (one module per author)

Read first, in this order: `docs/ACADEMY_PLAN.md` (sections 5 and 6), `src/content/schema.ts` (types `Module`,
`Lesson`, `Block`, `Question`, `KeyConcept`), `docs/AUTHORING.md` (Track 0 authoring guide: file layout, ids,
validation), and two exemplary Track 0 lessons for depth and tone: `src/content/modules/m10/l02.ts` (LCOE) and
`src/content/modules/m09/l02.ts` (FIDIC clauses). Look at `src/content/modules/m10/index.ts` for module layout
(formulas, glossary, references, exam, cheat sheet) and `src/content/key/m10.ts` for must-know concepts.

You own ONLY `src/content/founder/<fcXX>/` (replace the placeholder `index.ts`, add `l01.ts`, `l02.ts`, ...,
`exam.ts`, `glossary.ts`, `formulas.ts`, `references.ts` as in Track 0) and `src/content/key/<fcXX>.ts`.
Other authors write the other modules at the same time. No git, no npm install, no dev server.

## Who the learner is

A founder and operator running several early ventures. In each one he owns everything except the technical
build: go to market, sales, product management, strategy, positioning, pricing, partnerships, fundraising,
finance, legal structuring, hiring and operating the company. Engineering partners build the product.
Background: MSc Sustainable Energy Technology, systems engineer in logistics automation, fluent English and
Arabic, based between the Netherlands and Kuwait. He learns fastest from real mechanisms, numbers and systems.
Write like an experienced operator mentoring a capable engineer: direct, concrete, no filler, and no
startup-speak without the mechanism behind it.

## Venture context you may use (and nothing more)

Use these ventures for "why it matters" and worked examples. Do NOT invent traction, customers, revenue,
funding, partners or numbers for them. When you need numbers, use clearly labelled illustrative numbers
("illustrative: a 3-person seed-stage team burning EUR 45k/month").

- **Afterwave**: physical AI test infrastructure. Lockstep (capture app: rig signals via data acquisition and
  on-screen actions on one clock), Afterwave Enclave (private environment on customer servers or an isolated
  tenant where captured data, trained models and agents run), Ripple (change-impact engine: after a firmware,
  model or rig change, which tests to rerun and why). "Bench memory" = the accumulated test data. Later:
  Afterwave's own instrumented hardware test platforms. Positioning: physical/embodied AI, not generic test
  automation; regulatory entry point the EU Machinery Regulation (applies 20 January 2027). Team: the learner
  (CEO, GTM), Ismail Elmasry (ex-Tesla drive unit validation, now test systems at Signify), Yusuf Keklik (ex-Tesla
  drive inverter test and reliability). Applied to YC W27; considering Zurich. Customers: hardware test teams in
  robotics, humanoids, drives and motors, batteries, powertrains, autonomous machines. B2B enterprise, on-prem
  security reviews.
- **Mizan**: energy company in Kuwait and the Gulf: PV soiling analytics, cleaning optimisation and plant control
  (stow, tracker control under dust, wind, heat). Live thread: a soiling analytics pilot targeting Shagaya Phase I
  (operated by KISR) with KISR researchers as methodology partner. Distribution thread: bringing software and
  turnkey hardware to Kuwait. Cofounder you may name: Omar Abu Harb. There is a second cofounder who is in
  stealth: never name or describe him in any content. Buyers: utilities, EPCs, O&M contractors, research bodies,
  government (MEWRE, KAPP, KISR), public tendering.
- **Suhail (سهيل)**: builder ecosystem for the Arab world: hackathons, events, newsletter, Suhail Season
  conference, The Majlis podcast, connecting builders with investors and employers, planned research arm
  (open-weight models, datasets, benchmarks). Volunteer leads until revenue; plan starts January 2027.

Facts about the external world (laws, deal terms, programmes, market data) must come from well-established
knowledge or from `docs/research/*.md` (which records sources and dates). Anything uncertain: say so in the text
and add a `callout` with `tone: "unverified"`. Today is November 2026.

## Module shape

- 5 to 8 lessons (capstone fc11: 3 lessons), each 45 to 90 minutes (`minutes`).
- `competencies`: your module's competency id (see table below); concepts use that id too (you may use another
  Founder Core competency id for a concept that clearly belongs there).
- `titleAr`: Arabic module title. Glossary entries must have real Arabic terms (`ar`) because the glossary is
  bilingual; everything else is English only. Leave `src/content/key/<fcXX>.ts` `ar: []`.
- `whyItMatters`: 2 to 4 sentences tied to running his ventures.
- `exam`: 8 to 12 integrative questions (mixed types, include `decision` and `numeric`).
- `formulas`: every equation used, with symbols and units (finance and fundraising modules will have many).
- `glossary`: 12 to 30 terms with Arabic.
- `references`: real primary sources only (books, official docs such as Y Combinator's SAFE documents, standards,
  regulators, well-known essays). Never invent URLs; if unsure of the exact URL use the publisher's root URL and
  mark `unverified: true`.
- `cheatSheet`: the Track 0 format: `##` sections, one fact per bullet with a bold lead, tables for numbers,
  formulas in a `| Quantity | Formula | Where |` table, no run-on paragraphs.
- At least one `scenario` (decision tree, "the investor asks...", "the procurement officer says...") in the module,
  and at least one `feynman` block.
- Must-know concepts in `src/content/key/<fcXX>.ts`: 5 to 7 tier 1 plus 2 to 4 tier 2, format of
  `src/content/key/m01.ts` (definition, explain, picture, why, example, confusion), English only.

## Lesson shape (every lesson, in this order)

Section 1, `layer: "theory"`:
1. A `callout` with `tone: "why"`, title "Why this matters for you": one short paragraph tied to his ventures or
   founder role.
2. The core concept with the real mechanism, equations (KaTeX) with units, derivations where they exist.
3. At least one visual. Options: a `widget` from the list below; a `chart` (data-driven line/bar/area/stacked-bar);
   a `flow` (process steps); a `matrix` (2x2); a markdown table of real data. Prefer an interactive widget when
   one fits.

Section 2, `layer: "applied"`:
4. A `worked` example (`mode: "worked"`) with realistic numbers from one venture (labelled illustrative), and where
   it helps a `faded` example with numeric `check`s.

Section 3, `layer: "field"`:
5. How it is done in practice: who does it, tools, documents, what goes wrong, what to check or ask (`md`,
   `checklist`, `ask`, `callout` tone `pitfall` or `pm`).
6. The applied exercise: a `question` block with a `short` question that asks him to PRODUCE something real for one
   of his ventures (a positioning statement, a discovery call script, a cap table scenario, a pricing page, an
   investor update...). Give a precise `rubric` (4 to 6 points) and a strong `modelAnswer`. It is graded by the AI
   grader.
7. Optional: `scenario`, `feynman`, `xref` blocks.

Then `quiz`: 5 to 8 retrieval questions (mix mcq, multi, numeric, order, decision), and `flashcards`: 5 to 8.

## Cross-links (no duplication)

Use `{ kind: "xref", to: "<lesson or concept id>", note: "..." }` to point at material that already exists:
Track 0 has LCOE, NPV/IRR, WACC, project finance and DSCR (m10), FIDIC and contracts (m09), Kuwait public
procurement (m11), ministry communication (m13), AI-native PM (m14), EVM and risk (m08). Grep
`src/content/modules/*/l*.ts` for ids. Inside Founder Core, link to other fc modules by lesson id only if you are
sure of it (other authors are writing them now); otherwise mention the module in prose.

## Widgets available (`kind: "widget"`)

Founder Core calculators (implemented in parallel; props optional):
`cap-table`, `safe-vs-priced`, `unit-economics`, `pricing-experiment`, `pipeline-forecast` (see
`src/content/widgets.ts` for what each shows and its props). Track 0 widgets you may reuse: `npv-irr`, `lcoe`,
`monte-carlo`, `risk-matrix`, `cpm-gantt`, `evm`, `concept-map`, `tariff-eval` and others in `src/content/widgets.ts`.

## Ids

Module `fcXX`; lessons `fcXX-l01`; concepts `fcXX.slug`; questions `fcXX-l01-q1`, inline `fcXX-l01-p1`, exam
`fcXX-x1`; flashcards `fcXX-l01-f1`; scenarios `fcXX-s1`; formulas `fcXX-slug`; glossary `fcXX-slug`;
references `fcXX-r1`; must-know `k-fcXX-slug`.

| Module | Competency id |
|---|---|
| fc01 Startup fundamentals | fc-fundamentals |
| fc02 Product management | fc-product |
| fc03 Go-to-market | fc-gtm |
| fc04 Sales | fc-sales |
| fc05 Marketing & brand | fc-marketing |
| fc06 Finance & economics for founders | fc-finance |
| fc07 Fundraising | fc-fundraising |
| fc08 Equity & legal | fc-legal |
| fc09 Operating the company | fc-ops |
| fc10 AI-native founder | fc-ai |
| fc11 Capstone: seed round package | fc-fundraising |

## House style (enforced by the validator)

- Never use the em dash character. Use commas, colons, parentheses or full stops.
- Never name the stealth Mizan cofounder.
- `md` tagged templates (String.raw): no backticks or `${` inside; `$` only for math; write currencies as
  USD, EUR, KWD.
- Double-check every equation and every worked number. Round sensibly and show units.

## Validate

`npx tsx scripts/validate-content.ts <fcXX>` must report zero issues for your module, and
`npx tsc --noEmit -p . 2>&1 | grep "founder/<fcXX>\|key/<fcXX>"` must be empty. Validate after each lesson file.

Finish with a short report: lessons and their visuals, number of questions/cards/terms/formulas, which widgets you
used, cross-links, and anything you were unsure of.
