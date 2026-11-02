# Brief: must-know concepts (one or two modules per agent)

The learner (Egyptian/Kuwaiti systems & energy engineer, fluent Arabic) starts a **trial week at MEWRE**
(Kuwait's Ministry of Electricity, Water and Renewable Energy) as a prospective renewable-energy Project
Manager. Nobody will interview him, but colleagues may casually ask "what is reactive power and why does
it matter?" or "what's the difference between EPC and an IPP?". For each module, write the concepts he
must be able to **explain on the spot**, in a form that is easy to memorize and to say out loud.

Read `src/content/schema.ts` (type `KeyConcept`) and the gold example **`src/content/key/m01.ts`**
(two concepts, English + Arabic) — match its style, length and tone exactly.

You own ONLY `src/content/key/<mXX>.ts` for your module(s). Replace the empty stub
(`{ en: [], ar: [] }`). For m01, keep the two existing concepts and add the rest. No other files, no git,
no npm install, no dev server.

## What to pick

- Read the module's lessons (`src/content/modules/<mXX>/l*.ts`), concepts, glossary and cheat sheet first.
- **Tier 1 (must know cold): 5–7 per module** (3–4 for m03, m04, m12, m14). The concepts a PM is expected to
  explain without notes: core definitions and principles, the "why" behind them, key distinctions.
- **Tier 2 (good to know): 2–4 per module.**
- Concepts, not trivia: "Capacity factor", "P50 vs P90", "Liquidated damages", "Stage gate", "Reserve margin",
  "Why Gulf solar tariffs are so low". Not lists of facts or dates.
- Prefer a **"X vs Y"** concept when the confusion between two things is the real lesson (EPC vs IPP,
  MWp vs MWac, power vs energy, P50 vs P90, CPI vs SPI, bid bond vs performance bond).
- Order: by lesson, in teaching order. `lesson` = the lesson that teaches it (must be in this module).
- Ids: `k-<mXX>-<kebab-slug>`.

### Who owns shared concepts (do not duplicate in another module)

- m00: reserve margin, load factor, subsidy (cost of supply vs tariff), value of displaced fuel, IPP approval chain, delivery routes (EPC / PPP / G2G)
- m01: power vs energy ✓, reactive power ✓, power factor, apparent power (MVA), three-phase basics, per-unit, fault level, **capacity factor**, peak demand / load curve, frequency & inertia, heat rate
- m02: GHI/DNI/DHI, MWp vs MWac and DC/AC ratio, trackers, bifacial, temperature coefficient, soiling, **performance ratio**, **P50/P90**, degradation, clipping
- m03: CSP vs PV, thermal storage, solar multiple, dispatchability
- m04: power in the wind (cube law), Betz limit, capacity factor of wind is NOT here (m01), wakes, Weibull
- m05: MW vs MWh for BESS, C-rate, DoD, RTE, SoH, augmentation, thermal runaway, use cases
- m06: grid code, fault ride-through, droop/frequency response, grid-forming vs grid-following, system strength (SCR), curtailment, interconnection study, SCADA/protection
- m07: stage gate, feasibility study, Owner's Engineer, FEED/design stages, commissioning sequence (FAT → SAT → energisation → performance test → COD), taking-over, defects period
- m08: PMBOK vs PRINCE2 / governance, WBS, critical path & float, baseline, EVM (CPI, SPI), risk register & P×I, change control, NCR / hold point, stakeholder reporting (RAG)
- m09: FIDIC books, EPC vs EPCM vs multi-contract, Engineer's determination, variation, claims & notices / time bars, bonds & retention, **liquidated damages**, PPA, take-or-pay / deemed energy, O&M / LTSA
- m10: time value of money, NPV, IRR, WACC, **LCOE**, why Gulf tariffs are low, capex vs opex, project finance / SPV, CFADS, DSCR, levelized tariff comparison, cash-flow forecasting
- m11: CAPT role, tender process & bid evaluation, two-envelope evaluation, KAPP PPP process, Audit Bureau prior review, local content
- m12: availability vs performance, KPIs, root-cause analysis, preventive vs corrective maintenance, warranty claim, asset management / repowering
- m13: how a ministry decides (hierarchy, paper flow), decision memo / one-page brief, BLUF, presenting to officials, minutes & actions, negotiation (BATNA)
- m14: what an LLM is (and hallucination), verification, confidentiality classification, prompting patterns, AI for document review
- m15: integration concepts only (e.g. the PM's critical path from tender to COD, the five questions to ask at every stage) — 3–5 concepts, no duplicates

## How to write each field (English)

- `term`: short; for distinctions use "A vs B". `termAr`: the Arabic term (use the module glossary's `ar`).
- `definition`: **one sentence, ≤ 30 words**, the thing to memorize. Bold the key word(s). Math with `$...$` only if it helps.
- `explain`: "Say it like this" — 2–4 sentences in plain words, as you would say it to a colleague or a
  non-engineer official. No jargon without explaining it.
- `picture`: one concrete analogy or mental image (everyday life, logistics, water, traffic, money…). Must be
  accurate — a wrong analogy is worse than none.
- `why`: 1–3 sentences — why a MEWRE renewable PM cares (contracts, grid, approvals, money, risk).
- `example` (optional but usually include): a number or short worked example **taken from the lessons**.
- `confusion` (optional): the classic mix-up and how to tell them apart.
- Facts: only what is in the module content. Never invent Kuwait facts, numbers or law references. If a
  lesson flags something as unverified, either leave it out or keep the caveat.
- Use the `md` tag (String.raw); no backticks or `${` inside; `$` only for math.

## Arabic (`ar` array)

Same concepts, same order, same `id`, `lesson`, `tier`, `term` (keep English), `termAr`; include `example`
and `confusion` exactly when the English does. Translate `definition`, `explain`, `picture`, `why`,
`example`, `confusion` into Modern Standard Arabic as used in Gulf ministry/engineering documents: English
term in parentheses on first use within each field, acronyms in Latin (PV, BESS, EPC, PPA, LCOE…), Western
digits, units in Latin, math unchanged. Natural Arabic, not word-for-word; analogies may be adapted to feel
natural in Arabic as long as the meaning stays the same.

## Validate

`npx tsx scripts/validate-content.ts <mXX>` must report zero issues for your module(s) (it checks ids,
lessons, KaTeX, definition length, Arabic mirrors English). Also
`npx tsc --noEmit -p . 2>&1 | grep "content/key"` must be empty.

Finish with a short report: number of tier-1 / tier-2 concepts per module and anything you were unsure of.
