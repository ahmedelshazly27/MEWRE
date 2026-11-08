# Brief: trial-week explainers (Track 0, MEWRE PM)

## Who this is for

The learner starts a trial as a renewable-energy Project Manager at Kuwait's MEWRE on 15 November 2026. They are an
engineer (systems thinking, controls) but say plainly: "I don't fully grasp simple concepts like reactive power, the
electric and magnetic fields, three phases, lagging and leading current", and the same for solar, CSP and the rest.
They then added: "when I initially studied, I did not grasp until now entirely the concepts of voltage, current, AC and DC and reactance and capacitance". So Day 1 starts from zero. They have 2 to 3 hours a day for 7 days and study from a laptop screen. The full Track 0 lessons
(`src/content/modules/mXX/`) are too heavy right now. Explainers give the **intuition** and the **job layer**: what it
is, why it matters at MEWRE, the numbers and words they will hear, the questions a good PM asks. Theory waits until after
the trial (`deeper` links).

## The format

Read `src/content/trial/schema.ts` (the `Explainer` type) and the exemplar `x-reactive-power` in
`src/content/trial/d1.ts`. Match its depth, tone and structure exactly:

1. `hook`: one or two sentences tying the topic to the first weeks at MEWRE.
2. `blocks`, in this order:
   - `md` "### The picture first": an everyday analogy (water, traffic, a car, a kitchen, a bank account...). Concrete.
   - `md` "### What is actually happening": the mechanism in plain words, short paragraphs and bullets. Name the real terms
     (in bold) as you introduce them. At most one simple formula, only if it is used on the job.
   - At least one **visual**: a `widget` from `src/content/widgets.ts` (pass props that make the point), a `diagram`
     (ids in `src/content/widgets.ts` DIAGRAMS), a `chart`, a `flow` or a `matrix`. Add a one-line `caption` saying what to
     notice.
   - Optionally a second `md` section ("### Why it matters at MEWRE" or similar) when the job link needs it.
   - A `callout` with `tone: "tip"` (or `tone: "kuwait"` when the numbers are Kuwait facts) and title "Numbers you will hear": 3 to 5 bullets with the values, units and
     ranges actually used at work. Kuwait-specific numbers carry their source/confidence as the Track 0 lesson gives it.
3. `say`: 3 to 5 sentences or questions they can use in a meeting with consultants, contractors or seniors.
4. `trap`: the classic confusion and the correct version, in 2 to 3 sentences.
5. `check`: exactly 3 questions (`mcq`, `numeric` or `decision`; difficulty 1 or 2), ids `<explainer id>-c1..c3`, each
   tagged with **existing** Track 0 concept ids (grep `id: "mXX.` in `src/content/modules/mXX/l*.ts`) and with an
   explanation. Numeric questions need `tolerance` and `unit`.
6. `deeper`: 1 to 3 Track 0 lesson ids (`mXX-lYY`) for after the trial.
7. `minutes`: 8 to 15. `module`: the Track 0 module id.

## Rules

- **Source of truth for facts is Track 0.** Read the relevant module's lessons and cheat sheet first. Kuwait facts
  (projects, capacities, institutions, laws, tariffs, dates) must come from those lessons, with the same confidence
  labels; never add new Kuwait facts from memory. General engineering facts must be correct and standard.
- **Technical accuracy first.** Double-check every number and analogy; an analogy must not teach something false
  (say where it breaks if it could mislead). Recompute any worked number.
- **Plain language.** Short sentences. Explain every term the first time. No derivations. Write like an experienced
  PM mentoring a capable engineer: direct, concrete, no filler.
- **No em dashes** (the validator rejects them). Use commas, colons or parentheses.
- Use `md` from `../schema` for Markdown strings; KaTeX with `$...$` is fine but keep math minimal.

## Your file and ids

## The 7 days

| Day | File | Theme | Modules |
|---|---|---|---|
| 1 | d1.ts | Electricity from zero | m01 |
| 2 | d2.ts | Grid electricity (exemplar lives here) | m01 |
| 3 | d3.ts | Kuwait's power system and solar PV | m00, m02 |
| 4 | d4.ts | CSP, wind, batteries, grid connection | m03 to m06 |
| 5 | d5.ts | Project delivery and control | m07, m08 |
| 6 | d6.ts | Contracts, money, procurement | m09 to m11 |
| 7 | d7.ts | Operations, the ministry, AI (plus rehearsal) | m12 to m14 |

You own exactly one file, `src/content/trial/dN.ts`, exporting `DN: Explainer[]` with the explainers listed for you, in
order, all with `day: N`. Do not edit any other file. (Day 2's author appends after the existing exemplar `x-reactive-power` and leaves it
unchanged.) Validate with `npx tsx scripts/validate-content.ts x-` until it reports no issues for your ids. No git,
no npm install, no dev server. Other authors are writing other days at the same time.

When done, report: the explainers written (id, title, minutes, visual used), and anything you were unsure of.
