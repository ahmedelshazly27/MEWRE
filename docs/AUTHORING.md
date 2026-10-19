# Content Authoring Guide

Every module lives in `src/content/modules/mXX/`. `index.ts` default-exports a `Module`
(see `src/content/schema.ts` — read it fully, it is the contract). Put each lesson in its own
file (`l01.ts`, `l02.ts`, …) exporting a `Lesson`, and import them into `index.ts`.
Glossary/formulas/references can live in `glossary.ts`, `formulas.ts`, `references.ts`.

Validate often:

```bash
npx tsx scripts/validate-content.ts m02        # schema + ids + KaTeX check for your module
npx tsc --noEmit -p . 2>&1 | grep "modules/m02" # type errors in your files only
```

Both must be clean before you finish. Set `draft: false` (or remove `draft`) when the module is complete.

## Audience and voice

The learner is a systems/controls engineer (Vanderlande, logistics automation) preparing to be a
renewable-energy Project Manager at Kuwait's MEWRE (Shagaya Renewable Energy Park and new
utility-scale PV/BESS IPPs). Write like an experienced mentor speaking to a capable engineer:
direct, dense, no padding, never skip the "why". Show derivations and units. Every number in a
worked example must be recomputed (use `node -e` to check arithmetic). Prefer SI units, MW/MWh,
kWh/m², KWD and USD (1 KWD ≈ 3.25 USD — state the rate you assume).

## Lesson structure (every lesson, mandatory)

1. `objectives` — 3–5 "you can…" statements.
2. `concepts` — 3–7 concepts, ids `mXX.slug`, each with a `competency`. Use `related` to link to
   concepts in other modules when the link is real (only reference ids that exist — the
   validator checks; ids in other modules follow the curriculum map in CURRICULUM.md, so only link
   to modules already written, or leave `related` out).
3. `sections` — at least one section of EACH layer, normally in this order:
   - **theory** — physics/equations/principles derived and explained. Use `equation` blocks
     referencing the module's `formulas`. Include at least one `callout` with tone `why`.
   - **applied** — worked examples with realistic Kuwait numbers (desert, 45–50 °C ambient
     summers, GHI ≈ 2,000–2,200 kWh/m²/yr, heavy dust/soiling, shamal sandstorms, summer peak
     load ~16–17 GW). Use the pattern: one `worked` (mode "worked"), then one `worked` (mode
     "faded", with 1–2 `hidden: true` steps carrying a `check`), then a `question` block as an
     independent problem. Embed a `widget` wherever one in `src/content/widgets.ts` fits.
   - **field** — how it is done on real projects: who does it, which documents/tools (PVsyst,
     P6, ETAP, PSS/E, DIgSILENT PowerFactory, Aconex…), what typically goes wrong (`callout`
     pitfall), what the PM must check (`checklist`), questions to ask contractors (`ask`).
     Add a `feynman` block in most lessons. Add a `scenario` (defined in `lesson.scenarios`) in at
     least half the lessons of a module; mark the best ones `dayInLife: true`.
4. `quiz` — 5–8 questions mixing types (mcq, multi, numeric, order, decision, label, short).
   At least one numeric in quantitative lessons; at least one decision in field-heavy lessons.
   Mark 1–2 per lesson `diagnostic: true` (good baseline probes). Explanations must teach.
5. `flashcards` — 6–12 cards: crisp atomic prompts (one fact/idea per card), answer on back.

Module-level: `exam` (6–12 harder/integrative questions, ids `mXX-x-qN`), `glossary`
(every key technical/contractual/financial term, with accurate Arabic — Modern Standard Arabic as
used in Gulf ministries, e.g. "عامل القدرة", "الأضرار المقطوعة/التعويضات المقطوعة", "أمر تغييري"),
`formulas` (every equation used), `references` (primary sources: IEC/IEEE standards, IRENA, IEA,
NREL, FIDIC, Kuwaiti government sites, KISR papers), `cheatSheet` (markdown; tables of key
numbers, formulas, checklists — fits ~2 printed pages).

## IDs (globally unique)

- lesson `m02-l03`; question `m02-l03-q4`; inline question `m02-l03-p1`; module exam `m02-x-q5`
- flashcard `m02-l03-f6`; concept `m02.temperature-coefficient`; scenario `m02-s2`
- glossary `bifacial-gain` (plain slug, globally unique — prefix with module if generic risk:
  e.g. `m09-variation`); formula `pv-temp-power`; reference `iec-61215-2021`

## Markdown rules

- Always write markdown with the `md` tag: `md\`...\`` (it is `String.raw`, so `\frac` works).
  Never use `${` inside. Do NOT use backticks inside md strings (no inline code) — use **bold**.
- Math: `$...$` inline, `$$...$$` display. KaTeX syntax only (the validator renders every
  snippet). Currency: write "USD 1.2 bn" or "KWD 40 m", never a bare `$` (it breaks math).
- Tables via GFM pipes. Keep paragraphs short. Use `**bold**` for key terms.
- Plain `"strings"` are fine for short text without backslashes.

## Kuwait facts — accuracy rules

For anything Kuwait-specific (projects, capacities, laws, institutions, targets, tariffs) use
`docs/RESEARCH.md` as the source of truth. Cite with a `sources` block referencing module
`references`. If something is not in RESEARCH.md and you cannot verify it, put it in a
`callout` with tone `unverified`, say what is claimed and that it must be checked. Never invent
project names, bidders, tariffs, dates, or legal article numbers. Generic engineering/PM/finance
content does not need Kuwait sources but must be technically correct.

## Example (abridged)

```ts
import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m01-l02",
  title: "AC Power and Power Factor",
  summary: "Why reactive power exists, how it loads cables and transformers, and why the grid code cares.",
  minutes: 45,
  objectives: ["Compute P, Q, S and PF for a load", "Explain why low PF costs money"],
  concepts: [
    { id: "m01.power-factor", name: "Power factor", description: "Ratio P/S …", competency: "engineering" },
  ],
  sections: [
    { layer: "theory", title: "Where reactive power comes from", blocks: [
      { kind: "md", md: md`For sinusoidal $v(t)=\sqrt2 V\cos\omega t$ …` },
      { kind: "equation", formula: "complex-power" },
      { kind: "callout", tone: "why", md: md`Current, not power, heats conductors …` },
      { kind: "widget", widget: "power-triangle", props: { p: 100, pf: 0.85 } },
    ]},
    { layer: "applied", title: "Sizing a transformer at 50 °C", blocks: [
      { kind: "worked", mode: "worked", title: "…", given: md`…`, steps: [{ md: md`…` }], result: md`…` },
      { kind: "worked", mode: "faded", title: "…", given: md`…`,
        steps: [{ md: md`…` }, { md: md`$S = P/\text{PF} = 117.6$ MVA`, hidden: true,
          check: { prompt: "Apparent power S", answer: 117.6, unit: "MVA", tolerance: { rel: 0.01 } } }],
        result: md`…` },
      { kind: "question", question: { id: "m01-l02-p1", type: "numeric", prompt: md`…`, answer: 42.1,
        unit: "Mvar", explanation: md`…`, concepts: ["m01.power-factor"], difficulty: 2 } },
    ]},
    { layer: "field", title: "Reactive power on real projects", blocks: [
      { kind: "callout", tone: "pitfall", md: md`…` },
      { kind: "checklist", title: "PM checks", items: ["…"] },
      { kind: "ask", items: ["What is the reactive capability curve at 50 °C ambient?"] },
      { kind: "scenario", scenario: "m01-s1" },
      { kind: "feynman", prompt: "Explain reactive power to a finance director.", keyPoints: ["…"] },
    ]},
  ],
  quiz: [ /* 5–8 questions */ ],
  flashcards: [ { id: "m01-l02-f1", front: "PF definition", back: md`$\text{PF}=P/S$` } ],
  scenarios: [ { id: "m01-s1", title: "…", context: md`…`, start: "a", concepts: ["m01.power-factor"],
    nodes: { a: { md: md`…`, choices: [{ text: "…", next: "b", score: 8, feedback: "…" }] }, b: { … } } } ],
};
export default lesson;
```
