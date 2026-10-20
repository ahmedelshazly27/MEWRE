# Brief: cheat-sheet rewrite + Arabic translation (one module per agent)

Context: /home/user/MEWRE is a learning platform preparing one learner (Egyptian/Kuwaiti engineer,
fluent Arabic) to be a renewable-energy Project Manager at Kuwait's MEWRE. Read
`src/content/schema.ts` and `docs/AUTHORING.md` first. You own ONLY:
`src/content/modules/<mXX>/` (for task A) and `src/content/ar/<mXX>/` (task B). Other agents are
working on other modules concurrently — do not touch anything else. No git, no npm install, no dev server.

## Task A — make the English cheat sheet readable (do this first)

The module's `cheatSheet` (in `index.ts` or `cheatsheet.ts`) is a printable 1–2 page summary.
Current versions cram facts into run-on paragraphs joined with " · ", which are hard to read.
Rewrite it (same facts, nothing invented, keep every number and source caveat) using this format:

- `## Section` headings (4–8 sections). Optional `### Sub-heading`.
- One fact per bullet. Never chain items with " · ". Bold the key term at the start of a bullet:
  `- **Residential tariff:** 2 fils/kWh for Kuwaiti citizens (since 1966)`.
- Key numbers → a GFM table (`| Item | Value | Note |`).
- Formulas → a table `| Quantity | Formula | Where |` with each formula as inline math `$...$`,
  or a list where each formula sits on its own line as display math `$$...$$` preceded by a bold
  label. Never put several formulas in one paragraph.
- Checklists → `- [ ]` style bullets are NOT supported; use plain bullets.
- Keep `unverified` caveats short: append "(verify)" to the bullet.
- Use the `md` tag (String.raw); no backticks or `${` inside; `$` only for math.

Also scan this module's lessons for paragraphs that chain 3+ items with " · " and convert those to
bullet lists (content unchanged). Validate: `npx tsx scripts/validate-content.ts <mXX>`.

## Task B — full Arabic translation

Create `src/content/ar/<mXX>/` mirroring `src/content/modules/<mXX>/` file for file (same file
names, same exports; `ar/<mXX>/index.ts` currently holds a `null` stub — replace it with the real
module default export, typed `Module`). Relative imports like `../../schema` keep working.

**Translate** every learner-facing string: module title (put the Arabic title in `title`, keep
`titleAr`), summary, whyItMatters, cheatSheet; lesson title/summary/objectives; concept
name/description; all markdown blocks, callout titles, worked-example text, checklist/ask items,
feynman prompt and keyPoints; every question's prompt, options, explanation, rubric, modelAnswer,
order items and label options (keep label marker → answer mapping consistent: the same option
index must be the right answer); flashcard front/back; scenario title/context/node text/choice
text/feedback; formula `name`, `explanation` and variable `meaning`; glossary `definition` (keep
`en` and `ar` fields as they are, keep `definitionAr`); simulation intro/debrief/stage
titles/briefs/decision prompts/option text/feedback/KPI labels.

**Never change**: any id, `type`, `kind`, `layer`, `tone`, `competency`, `related`, `concepts`,
`difficulty`, `diagnostic`, `answer` values, `tolerance`, numeric values in checks, scores,
`next` pointers, widget ids/props, diagram ids, marker ids, formula `tex` and variable `sym`/`unit`,
references (titles stay in their original language; urls unchanged), `download.file`, KPI keys,
effects, `bilingual` blocks (already bilingual — copy unchanged), order of arrays.

**Style**
- Modern Standard Arabic as written in Gulf ministry and engineering documents. Clear, direct,
  mentor tone — same density as the English, no padding.
- Technical vocabulary is the point: on the first use of a technical/contractual/financial term in
  each section write the Arabic term followed by the English in parentheses, e.g.
  "عامل القدرة (Power Factor)", "الأضرار المقطوعة (Liquidated Damages)". Afterwards use the Arabic
  term alone. Use this module's glossary `ar` values as the canonical Arabic terms.
- Keep acronyms in Latin script (PV, BESS, EPC, FIDIC, KAPP, CAPT, PPA, IPP, SCADA, LCOE, NPV,
  IRR, DSCR, CPI, SPI, P50/P90, COD, FAT/SAT), introducing the Arabic expansion once.
- Institutions: e.g. "وزارة الكهرباء والماء والطاقة المتجددة (MEWRE)", "هيئة مشروعات الشراكة
  بين القطاعين العام والخاص (KAPP)", "الجهاز المركزي للمناقصات العامة (CAPT)", "ديوان المحاسبة".
- Western digits (0–9), SI units in Latin (MW, kWh, kV, °C), currencies as KWD / USD / fils, math
  `$...$` exactly as in English. FIDIC clause numbers unchanged.
- Markdown: use the `md` tag; no backticks; never `${`; tables keep the same columns.

**Validate as you go** (one lesson file at a time):
`npx tsx scripts/validate-content.ts <mXX>` — it checks the Arabic module (KaTeX, ids, references)
AND structural identity with English (answer keys, block structure, scenario graph, formulas).
Must report zero issues for your module, and
`npx tsc --noEmit -p . 2>&1 | grep "content/ar/<mXX>\|content/modules/<mXX>"` must be empty.

Finish with a short report: cheat-sheet changes, lesson paragraphs fixed, translation done, any
terms you were unsure how to render in Arabic.
