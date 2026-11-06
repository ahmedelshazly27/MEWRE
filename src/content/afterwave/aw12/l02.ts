import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw12-l02",
  title: "The pain in numbers: a business case for capture and change impact",
  summary:
    "Turn rig hours, retest loops, escaped defects and engineer time into a risk-adjusted, multi-year business case that a head of validation can take to finance: four benefit lines, their formulas, confidence weights, full costs including the buyer's own effort, ROI and payback, worked for an illustrative humanoid programme.",
  minutes: 80,
  objectives: [
    "You can compute the four benefit lines of an Afterwave business case (selection, data-caused reruns, engineer time, escaped defects) without double counting.",
    "You can risk-adjust each line by its evidence and explain the adjustment to a finance reviewer.",
    "You can build a three-year ROI and payback including the buyer's implementation cost.",
    "You can choose between a cost framing and a capacity framing (avoided rigs, shorter gates) and know when each is honest.",
  ],
  concepts: [
    { id: "aw12.business-case", name: "Test infrastructure business case", description: "A one-to-two page document in the buyer's numbers: benefit lines with formulas and sources, confidence weights, full costs (subscription, implementation, internal hours, hardware), three-year ROI and payback, and the assumptions a pilot will measure.", competency: "aw-business", related: ["fc04.quantified-pain", "fc03.value-quantification"] },
    { id: "aw12.selection-value", name: "Value of test selection", description: "Rig-hours and engineer analysis hours released when a change triggers only the tests it can affect: N_r (1 - s) H_full (c_h + a c_e).", competency: "aw-business", related: ["aw12.business-case"] },
    { id: "aw12.retest-loop", name: "Data-caused retest loop", description: "A test run repeated not because the device failed but because data was missing, unsynchronised or the operator's actions cannot be reconstructed; the capture product's main benefit line.", competency: "aw-business", related: ["aw12.business-case"] },
    { id: "aw12.escaped-defect-value", name: "Escaped defect value", description: "Expected annual cost avoided when fewer defects escape a release gate: escapes per year times the preventable share times the cost per escape. Emotive, hard to prove, so heavily discounted.", competency: "aw-business", related: ["aw12.business-case"] },
    { id: "aw12.risk-adjusted-benefit", name: "Risk-adjusted benefit", description: "Each benefit line multiplied by a confidence factor reflecting how it is evidenced (measured, buyer-estimated, claimed), so the case survives a finance review.", competency: "aw-business", related: ["aw12.business-case"] },
    { id: "aw12.capacity-framing", name: "Cost framing vs capacity framing", description: "Released rig-hours can be valued at their cost or as avoided capacity (rigs not bought, gates shortened). Use capacity framing only when the lab is truly capacity-constrained, and never add both.", competency: "aw-business", related: ["aw12.selection-value"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Four benefit lines and how to keep them honest",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Your champion is a test systems engineer; the person who signs is a head of validation or VP engineering who must defend the spend to finance. The business case is the document that travels between them when you are not in the room. A case that double-counts, ignores the buyer's own implementation effort or leans on an unprovable escaped-defect number gets shredded by the first controller who reads it, and your champion loses credibility with it.`,
        },
        {
          kind: "xref",
          to: "fc04-l02",
          note: "Founder Core: discovery and the quantified-pain template (hours, defects, delay) taken from the buyer's own numbers. This lesson turns those inputs into a full business case with costs, risk adjustment and ROI.",
        },
        {
          kind: "md",
          md: md`### What Afterwave changes in a lab

Two products, two mechanisms:

- **Ripple (change impact):** after a firmware, model or rig change, run only the tests the change can affect, with a stated reason for each skip. Mechanism: fewer rig-hours and fewer analysis hours per release.
- **Lockstep (synchronised capture):** rig signals and on-screen actions recorded on one clock, so a failed or odd run can be understood without repeating it. Mechanism: fewer reruns caused by data problems, faster root cause.

Each mechanism maps to benefit lines with a formula. Write them as formulas, not as adjectives, so the buyer can change any input.

### Line 1 and 2: rig time and engineer time released by selection`,
        },
        { kind: "equation", formula: "aw12-selection-value" },
        {
          kind: "md",
          md: md`The trap is **double counting**. Many labs quote a "rig-hour rate" that already includes a technician or engineer. If you then add engineer-hours on top, you count the same labour twice. Fix it by defining $c_h$ without labour (depreciation, energy, maintenance, consumables, facility share) and putting all labour in $a\,c_e$, where $a$ is the engineering hours that scale with rig-hours run (setup, monitoring, analysis, report).

### Line 3: data-caused reruns`,
        },
        { kind: "equation", formula: "aw12-rerun-value" },
        {
          kind: "md",
          md: md`Only reruns caused by **data**, not by the device, count. Ask the lab to tag the reason for its last 50 reruns: "device failed", "data missing", "clocks misaligned", "cannot reconstruct operator steps", "rig fault". The data-caused share is $r_0$. The share after capture, $r_1$, is a hypothesis for the pilot.

### Line 4: escaped defects`,
        },
        { kind: "equation", formula: "aw12-escape-value" },
        {
          kind: "md",
          md: md`An escape found at a customer site or in a pilot fleet can cost more than a year of subscription, so this line dominates emotionally. It is also the hardest to prove: you need the buyer to agree that a share $\delta$ of past escapes were change interactions that a better retest decision would have caught.

### Risk adjustment

Each line gets a confidence factor according to its evidence:`,
        },
        { kind: "equation", formula: "aw12-risk-adjusted-benefit" },
        {
          kind: "md",
          md: md`| Evidence | Example | Confidence $k$ (illustrative convention) |
|---|---|---|
| Measured on the buyer's rigs | Rig-hours released in a pilot backtest | 0.9 to 1.0 |
| Buyer's own records, our hypothesis on the effect | Release count and regression size known; selection ratio not yet measured | 0.7 to 0.8 |
| Buyer estimate | "About 8 % of reruns are data problems" | 0.6 to 0.7 |
| Plausible but unproven | Share of escapes we could have prevented | 0.3 to 0.5 |

This mirrors vendor business-case practice (for example Forrester's TEI method risk-adjusts each benefit line). The specific factors are a convention you agree with the buyer, not a standard.

### Costs and return

Count everything the buyer pays, including **their own effort**: Afterwave subscription, one-time onboarding fee, server hardware for Enclave, and the internal hours of test systems engineers and IT to install and integrate. Then:`,
        },
        { kind: "equation", formula: "aw12-roi" },
        {
          kind: "md",
          md: md`Assume a ramp: in year 1 benefits are partial (installation, learning, backtest before live use). A 50 % year-1 benefit is a common conservative assumption.

### Cost framing vs capacity framing

Released rig-hours can be valued two ways:

- **Cost framing:** hours times $c_h$. Always defensible, often small.
- **Capacity framing:** if the lab is capacity-constrained (queues, programmes waiting for rig slots, a new rig in the capex plan), released hours avoid buying a rig or shorten the release gate. A rig costing several hundred thousand euros that does not need to be bought is a bigger and very concrete number.

Use capacity framing only when the constraint is real (ask: "Is there a rig in next year's capex plan because of queue length?"), and never add both: the same hour cannot be both saved cost and avoided capex.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "A worked business case for an illustrative humanoid programme",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Three-year business case: Lockstep and Ripple on one humanoid programme",
          given: md`**Illustrative inputs** (a hypothetical discovery, not a customer). One humanoid robot programme with 14 rigs: 8 actuator dyno and life-test rigs, 4 HIL benches, 2 whole-robot test cells. Joint-controller firmware and model updates trigger $N_r = 50$ regressions a year; a full regression is $H_{full} = 240$ rig-hours. Hypothesis: Ripple selects $s = 0.40$. Rig-hour cost without labour $c_h$ = EUR 60; analysis $a = 0.25$ engineer-hours per rig-hour; loaded engineer cost $c_e$ = EUR 95/h. Test runs per year $R = 6{,}000$; data-caused reruns $r_0 = 8\%$, hypothesis $r_1 = 2\%$; a rerun takes $t_r = 3$ rig-hours plus $e_d = 2$ engineer-hours. Escapes: $\lambda = 1.5$ a year at $C_{esc}$ = EUR 250k, preventable share $\delta = 0.2$. Costs: subscription EUR 120k a year; one-time onboarding fee EUR 30k, Enclave server EUR 25k, internal effort 300 engineer-hours. Confidence: rig 0.8, engineer time 0.7, reruns 0.7, escapes 0.4. Year-1 benefits at 50 %.`,
          steps: [
            { md: md`**Rig-hours released by selection:** $N_r(1-s)H_{full} = 50 \times 0.6 \times 240 = 7{,}200$ rig-h/yr. Rig value $7{,}200 \times 60 =$ EUR 432,000; engineer value $7{,}200 \times 0.25 \times 95 =$ EUR 171,000. $V_{sel}$ = **EUR 603,000/yr**.` },
            { md: md`**Data-caused reruns:** $R(r_0 - r_1) = 6{,}000 \times 0.06 = 360$ reruns avoided. Each costs $3 \times 60 + 2 \times 95 = 180 + 190 =$ EUR 370. $V_{rr} = 360 \times 370 =$ **EUR 133,200/yr**.` },
            { md: md`**Escapes:** $V_{esc} = 1.5 \times 0.2 \times 250{,}000 =$ **EUR 75,000/yr**. Gross total: $603{,}000 + 133{,}200 + 75{,}000 =$ **EUR 811,200/yr**.` },
            { md: md`**Risk-adjusted:** $0.8 \times 432{,}000 + 0.7 \times 171{,}000 + 0.7 \times 133{,}200 + 0.4 \times 75{,}000 = 345{,}600 + 119{,}700 + 93{,}240 + 30{,}000 =$ **EUR 588,540/yr**.` },
            { md: md`**Costs over 3 years:** one-time $C_0 = 30{,}000 + 25{,}000 + 300 \times 95 = 83{,}500$; subscription $3 \times 120{,}000 = 360{,}000$. Total **EUR 443,500**.` },
            { md: md`**Benefits over 3 years:** $0.5 \times 588{,}540 + 2 \times 588{,}540 = 294{,}270 + 1{,}177{,}080 =$ **EUR 1,471,350**.` },
            { md: md`**ROI** $= (1{,}471{,}350 - 443{,}500)/443{,}500 = 2.32$, i.e. **232 %**. **Payback:** year-1 net monthly benefit $294{,}270/12 - 120{,}000/12 = 24{,}523 - 10{,}000 = 14{,}523$; $t_{pb} = 83{,}500 / 14{,}523 =$ **5.7 months**.` },
            { md: md`**Price check:** subscription / adjusted benefit $= 120{,}000 / 588{,}540 = 20\%$; the buyer keeps about 80 % of the risk-adjusted value. **Capacity check:** $7{,}200 + 360 \times 3 = 8{,}280$ rig-hours a year released, about 2.1 rigs at 4,000 usable hours each. If a rig is in next year's capex plan because of queues, the capacity framing may be the stronger and still honest story (use it instead of the rig-cost line, not as well as it).` },
          ],
          result: md`Risk-adjusted benefit about EUR 0.59 m/yr against EUR 0.44 m of 3-year cost: ROI about 230 %, payback under 6 months. Two thirds of the adjusted value is rig and engineer time from selection, which a pilot can measure. The escape line is only 5 % of the adjusted total: the case does not depend on it, which is exactly what makes it credible.`,
        },
        {
          kind: "chart",
          chart: "stacked-bar",
          title: "Illustrative humanoid programme: benefit lines, gross vs risk-adjusted (EUR k/yr)",
          xKey: "view",
          xLabel: "View",
          yLabel: "EUR k per year",
          series: [
            { key: "rig", label: "Rig time (selection)" },
            { key: "eng", label: "Engineer time (selection)" },
            { key: "rerun", label: "Data-caused reruns (capture)" },
            { key: "escape", label: "Escaped defects" },
          ],
          data: [
            { view: "Gross", rig: 432, eng: 171, rerun: 133.2, escape: 75 },
            { view: "Risk-adjusted", rig: 345.6, eng: 119.7, rerun: 93.24, escape: 30 },
          ],
          caption: "Risk adjustment cuts the total from EUR 811k to EUR 589k and shrinks the least provable line most. Values from the worked example; all inputs illustrative.",
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: the selection ratio comes in worse",
          given: md`Same programme, but the pilot backtest shows Ripple selects $s = 0.60$, not 0.40. All other inputs and confidence factors unchanged.`,
          steps: [
            { md: md`Rig-hours released: $50 \times (1 - 0.60) \times 240 = 4{,}800$ rig-h/yr. $V_{sel} = 4{,}800 \times (60 + 0.25 \times 95) = 4{,}800 \times 83.75$.` },
            { md: md`$V_{sel}$ = **EUR 402,000/yr**.`, hidden: true, check: { prompt: "V_sel (EUR/yr)", answer: 402000, unit: "EUR/yr", tolerance: { abs: 500 } } },
            { md: md`Risk-adjusted: $0.8 \times 4{,}800 \times 60 + 0.7 \times 4{,}800 \times 23.75 + 93{,}240 + 30{,}000$.` },
            { md: md`$= 230{,}400 + 79{,}800 + 93{,}240 + 30{,}000 =$ **EUR 433,440/yr**.`, hidden: true, check: { prompt: "Risk-adjusted benefit (EUR/yr)", answer: 433440, unit: "EUR/yr", tolerance: { abs: 500 } } },
            { md: md`3-year ROI: $(2.5 \times 433{,}440 - 443{,}500)/443{,}500$.` },
            { md: md`$= (1{,}083{,}600 - 443{,}500)/443{,}500 = 1.44$, i.e. **144 %**.`, hidden: true, check: { prompt: "3-year ROI (%)", answer: 144, unit: "%", tolerance: { abs: 1 } } },
          ],
          result: md`A much worse selection ratio still leaves a 144 % ROI, because the case was built on conservative weights and costs. Show the buyer this sensitivity: it tells them the decision does not hinge on your best-case number.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Writing and defending the case",
      blocks: [
        {
          kind: "md",
          md: md`### What the document looks like

One page of numbers plus one page of assumptions, written with the champion and sent from the champion to the economic buyer:

1. **Situation in their words:** releases per year, regression size, rig count, rerun history, last escapes.
2. **Benefit lines** with formula, inputs (source of each: "lab scheduling export, Jan to Jun", "validation lead estimate"), gross and adjusted values.
3. **Costs:** subscription, one-time fee, hardware, internal hours.
4. **Three-year ROI, payback, sensitivity** (selection ratio, rerun share).
5. **What the pilot will measure** to replace hypotheses with data: $s$, $r_1$, time to root cause.

### Where the inputs come from

| Input | Ask for | Owner |
|---|---|---|
| $N_r$, $H_{full}$ | Release calendar; regression plan or sequencer export | Validation lead |
| $c_h$ | Lab cost model (depreciation, energy, maintenance) | Lab manager or controller |
| $a$, $c_e$ | Hours booked per regression; loaded rate | Head of validation, finance |
| $R$, $r_0$ | Run log with rerun reasons (or a tagged sample of 50) | Test systems engineer |
| $\lambda$, $C_{esc}$, $\delta$ | Last escapes and what they cost; which were change interactions | Quality, head of validation |`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How business cases get shredded",
          md: md`- **Double counting labour** in both the rig rate and the engineer line.
- **Adding cost and capacity framings** for the same hours.
- **Leaving out the buyer's own effort:** the controller adds 300 hours you forgot and your ROI looks dishonest.
- **Leaning on the escape line.** If the case only works with avoided escapes, it does not work.
- **Using your numbers, not theirs.** Benchmarks from other labs are assumptions; the buyer must own every input.
- **Inflating by the selection ratio you hope for.** Show the sensitivity at a worse ratio; it builds more trust than a better headline.`,
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Evidence value is real but goes in prose",
          md: md`A record of what was retested after each change, and why, is evidence for audits and safety cases (for example under the EU Machinery Regulation from 20 January 2027 for machinery in scope). It is valuable to quality and functional safety managers, but hard to price. Mention it as an unpriced benefit rather than inventing a number for it.`,
        },
        {
          kind: "xref",
          to: "fc04-l07",
          note: "Founder Core: value-based pricing and negotiation. The risk-adjusted benefit here is the ceiling for the price; the 20 % price-to-benefit ratio in the example is a choice, not a rule.",
        },
        {
          kind: "xref",
          to: "m10-l01",
          note: "Track 0: discounting, NPV and payback, if the buyer's finance team asks for an NPV at their hurdle rate instead of a simple ROI.",
        },
        {
          kind: "question",
          question: {
            id: "aw12-l02-p1",
            type: "short",
            prompt: md`Write the one-page business case your champion would send to their head of validation for an **illustrative** account (humanoid, automotive e-drive, industrial drives or battery pack validation). Use illustrative inputs and say where each would come from at the buyer. Include: the four benefit lines with formulas and values; confidence factors with a reason for each; full costs including the buyer's internal hours; three-year ROI and payback; one sensitivity; and what the pilot will measure.`,
            rubric: [
              "All four benefit lines are present with correct formulas and arithmetic, and labour is not double counted.",
              "Each line has a confidence factor justified by its evidence; gross and adjusted totals are both shown.",
              "Costs include subscription, one-time fees, hardware and the buyer's internal hours.",
              "Three-year ROI and payback are computed correctly with a year-1 ramp.",
              "A sensitivity on the least certain driver (selection ratio or rerun share) is shown with its effect on ROI.",
              "Inputs are attributed to buyer sources, the pilot measurements are named, and nothing is presented as real customer data.",
            ],
            modelAnswer: md`**Business case (illustrative): Ripple and Lockstep for an e-drive validation department.**

**Situation:** 30 releases/yr each triggering a 300 rig-hour regression (source: release calendar, sequencer export); 9,000 runs/yr, tagged sample shows 6 % data-caused reruns (test systems engineer); 1 escape/yr at about EUR 300k (quality).

**Benefits (gross, then $k$):**
- Selection, $s = 0.45$ (hypothesis): rig-hours $30 \times 0.55 \times 300 = 4{,}950$. Rig $4{,}950 \times 55 =$ EUR 272,250 ($k = 0.8$, records known, ratio not yet measured); engineer $4{,}950 \times 0.2 \times 90 =$ EUR 89,100 ($k = 0.7$).
- Reruns: $9{,}000 \times (0.06 - 0.015) = 405$; each $2.5 \times 55 + 1.5 \times 90 = 272.5$; EUR 110,363 ($k = 0.6$, buyer estimate).
- Escapes: $1 \times 0.2 \times 300{,}000 =$ EUR 60,000 ($k = 0.4$, plausible only).

Gross EUR 531,713/yr; adjusted $217{,}800 + 62{,}370 + 66{,}218 + 24{,}000 =$ EUR 370,388/yr.

**Costs:** subscription EUR 90k/yr; onboarding EUR 25k; server EUR 20k; internal 250 h at EUR 90 = EUR 22.5k. One-time EUR 67.5k; 3-year EUR 337.5k.

**Return:** 3-year benefit $2.5 \times 370{,}388 = 925{,}969$; ROI $(925{,}969 - 337{,}500)/337{,}500 = 174\%$. Payback $67{,}500 / (185{,}194/12 - 7{,}500) = 67{,}500/7{,}933 = 8.5$ months.

**Sensitivity:** at $s = 0.65$, rig-hours 3,150; adjusted benefit about EUR 269k; ROI about 99 %. The decision holds.

**Pilot will measure:** $s$ on 5 historical changes plus shadow mode; $r_1$ over 6 weeks on 2 rigs; time to root cause on data-caused anomalies.`,
            explanation: md`A credible case is conservative, attributed and sensitive to the right driver. The buyer should be able to change any input and see the answer move.`,
            concepts: ["aw12.business-case", "aw12.selection-value", "aw12.retest-loop", "aw12.escaped-defect-value", "aw12.risk-adjusted-benefit"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "A controller at the buyer asks: 'Why should I believe your EUR 589k a year?' Explain the case in plain words.",
          keyPoints: [
            "Every input is the lab's own number, attributed to a source; the controller can change any of them.",
            "Labour is counted once: rig cost excludes labour, engineer time is a separate line.",
            "Each line is discounted by how well it is evidenced; the escape line is small and heavily discounted.",
            "The buyer's own implementation hours are included in the cost.",
            "The pilot measures the main hypothesis (selection ratio); even at a much worse ratio the ROI stays positive.",
          ],
        },
        { kind: "sources", refs: ["aw12-r16", "aw12-r1"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw12-l02-q1",
      type: "numeric",
      prompt: md`A lab runs 40 regressions a year of 200 rig-hours each. Ripple selects $s = 0.5$. Rig cost without labour EUR 50/h; analysis 0.3 engineer-hours per rig-hour at EUR 100/h. What is $V_{sel}$ (EUR/yr)?`,
      answer: 320000,
      tolerance: { abs: 100 },
      unit: "EUR/yr",
      explanation: md`Hours released $40 \times 0.5 \times 200 = 4{,}000$. Value per hour $50 + 0.3 \times 100 = 80$. $V_{sel} = 4{,}000 \times 80 =$ EUR 320,000.`,
      concepts: ["aw12.selection-value"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw12-l02-q2",
      type: "mcq",
      prompt: "The lab quotes a rig rate of EUR 140/h that includes a technician. You also add engineer-hours per rig-hour. What is wrong?",
      options: [
        "Nothing",
        "Labour is double counted: either strip labour from the rig rate or drop it from the engineer line",
        "The rig rate is too low",
        "Engineer time should never be counted",
      ],
      answer: 1,
      explanation: md`Define the rig-hour cost without labour and count all labour once.`,
      concepts: ["aw12.selection-value", "aw12.business-case"],
      difficulty: 1,
    },
    {
      id: "aw12-l02-q3",
      type: "numeric",
      prompt: md`Gross benefit lines: rig EUR 200k (confidence 0.8), engineer EUR 100k (0.7), reruns EUR 50k (0.6), escapes EUR 100k (0.4). What is the risk-adjusted benefit (EUR k/yr)?`,
      answer: 300,
      tolerance: { abs: 0.5 },
      unit: "EUR k/yr",
      explanation: md`$160 + 70 + 30 + 40 = 300$ EUR k. The escape line fell from 22 % of gross to 13 % of adjusted.`,
      concepts: ["aw12.risk-adjusted-benefit"],
      difficulty: 1,
    },
    {
      id: "aw12-l02-q4",
      type: "numeric",
      prompt: md`One-time cost EUR 60k, subscription EUR 96k/yr, year-1 risk-adjusted benefit EUR 240k (after ramp). What is the simple payback of the one-time cost (months)?`,
      answer: 5,
      tolerance: { abs: 0.05 },
      unit: "months",
      explanation: md`Net monthly benefit $240/12 - 96/12 = 20 - 8 = 12$ EUR k. $t_{pb} = 60/12 = 5$ months.`,
      concepts: ["aw12.business-case"],
      difficulty: 2,
    },
    {
      id: "aw12-l02-q5",
      type: "decision",
      prompt: md`Illustrative. Your business case shows EUR 400k/yr of rig-hour savings. The lab manager mentions that a new rig (EUR 350k) is in next year's capex plan because of queues, and that the released hours would make it unnecessary. How do you present this?`,
      options: [
        { text: "Add EUR 350k avoided capex to the EUR 400k rig savings.", score: 0, feedback: "The same hours cannot be both saved running cost and avoided capacity. This is the double count that destroys credibility." },
        { text: "Present the capacity framing (rig not bought, queues shortened) as the main story for those hours, replacing the rig-cost line for them, and keep the engineer-time and rerun lines as they are.", score: 1, feedback: "Honest and stronger: a concrete avoided purchase, with the lab manager as the source." },
        { text: "Ignore it; stick to the cost framing.", score: 0.4, feedback: "Defensible but leaves the most concrete benefit out of the case." },
      ],
      explanation: md`Use capacity framing when the constraint is real, instead of, not as well as, the cost framing for the same hours.`,
      concepts: ["aw12.capacity-framing"],
      difficulty: 2,
    },
    {
      id: "aw12-l02-q6",
      type: "multi",
      prompt: "Which reruns count in the data-caused rerun line? (Select all that apply.)",
      options: [
        "A run repeated because a DAQ channel was not recorded",
        "A run repeated because the HMI log and the DAQ file could not be aligned",
        "A run repeated because the device under test genuinely failed and was repaired",
        "A run repeated because nobody could reconstruct which operator step preceded an anomaly",
      ],
      answer: [0, 1, 3],
      explanation: md`Only data-caused reruns are avoidable by capture. A genuine device failure and repair rerun is necessary testing.`,
      concepts: ["aw12.retest-loop"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "aw12-l02-f1", front: "Selection value", back: md`$V_{sel} = N_r(1-s)H_{full}(c_h + a\,c_e)$, with $c_h$ excluding labour.`, concepts: ["aw12.selection-value"] },
    { id: "aw12-l02-f2", front: "Data-caused rerun value", back: md`$V_{rr} = R(r_0 - r_1)(t_r c_h + e_d c_e)$; only reruns caused by data, not by the device.`, concepts: ["aw12.retest-loop"] },
    { id: "aw12-l02-f3", front: "Escaped defect value", back: md`$V_{esc} = \lambda\,\delta\,C_{esc}$; emotive, hard to prove, low confidence factor.`, concepts: ["aw12.escaped-defect-value"] },
    { id: "aw12-l02-f4", front: "Risk adjustment", back: md`$B_{adj} = \sum k_i V_i$; measured lines high $k$, claimed lines low $k$. Show gross and adjusted.`, concepts: ["aw12.risk-adjusted-benefit"] },
    { id: "aw12-l02-f5", front: "Worked humanoid case result", back: "Adjusted EUR 589k/yr, 3-year cost EUR 444k, ROI about 232 %, payback 5.7 months (illustrative).", concepts: ["aw12.business-case"] },
    { id: "aw12-l02-f6", front: "Cost vs capacity framing", back: "Value released rig-hours at cost, or as an avoided rig and shorter gates when the lab is truly constrained. Never both for the same hours.", concepts: ["aw12.capacity-framing"] },
  ],
};

export default lesson;
