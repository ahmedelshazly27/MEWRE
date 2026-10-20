import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m08-l04",
  title: "Earned Value Management for PV and BESS EPC Projects",
  summary:
    "Every EVM formula with its meaning (PV, EV, AC, CV, SV, CPI, SPI, EAC variants, ETC, VAC, TCPI, earned schedule), a complete worked EVM for a 500 MW PV EPC, progress measurement methods, and the specific ways EPC progress gets inflated.",
  minutes: 90,
  objectives: [
    "You can compute and interpret PV, EV, AC, CV, SV, CPI, SPI, four EAC variants, ETC, VAC and TCPI from a work-package table.",
    "You can compute earned schedule, SV(t), SPI(t) and an independent duration forecast, and explain why cost-based SPI fails late in a project.",
    "You can choose progress measurement methods (weighted milestones, units completed, 0/100, 50/50) per work type and write rules of credit.",
    "You can detect inflated EPC progress and front-loaded payment schedules, and decide what to do about them from MEWRE's side.",
  ],
  concepts: [
    { id: "m08.evm-basics", name: "EVM core metrics", description: "PV (planned), EV (earned), AC (actual) and the variances/indices CV, SV, CPI, SPI derived from them.", competency: "controls", related: ["m08.wbs", "m14.evm-analysis"] },
    { id: "m08.evm-forecasting", name: "EVM forecasting (EAC, ETC, VAC, TCPI)", description: "Projecting final cost under different performance assumptions and testing whether the target is still achievable.", competency: "controls", related: ["m08.evm-basics", "m10.eac-forecast"] },
    { id: "m08.earned-schedule", name: "Earned schedule", description: "Time-based schedule metrics (ES, SV(t), SPI(t), IEAC(t)) that remain meaningful to the end of the project.", competency: "controls", related: ["m08.evm-basics", "m08.cpm"] },
    { id: "m08.progress-measurement", name: "Progress measurement methods", description: "Rules of credit: weighted milestones, units completed, 0/100, 50/50, percent complete, level of effort.", competency: "controls", related: ["m08.evm-basics", "m08.wbs"] },
    { id: "m08.progress-inflation", name: "Progress inflation & front-loading", description: "Ways reported progress or payment runs ahead of real physical progress: crediting at PO, subjective %, front-loaded milestones, materials not on site.", competency: "controls", related: ["m08.progress-measurement", "m10.payment-mechanics"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Three numbers, one picture",
      blocks: [
        {
          kind: "md",
          md: md`Earned value management integrates **scope, schedule and cost** into one measurement system. It needs three cumulative numbers at the status date:

- **Planned Value (PV)** — the budget of work that the **baseline** says should be done by now (BCWS).
- **Earned Value (EV)** — the budget of work **actually done** (BCWP). Not money spent; budget earned.
- **Actual Cost (AC)** — what that work actually cost (ACWP).

All three are in the same currency and against the same **Budget at Completion (BAC)**.`,
        },
        { kind: "equation", formula: "evm-pv" },
        { kind: "equation", formula: "evm-ev" },
        { kind: "equation", formula: "evm-weighted-progress" },
        {
          kind: "md",
          md: md`### Variances and indices

Comparing EV with AC tells you about **cost efficiency**; comparing EV with PV tells you about **schedule progress**. Never compare PV with AC directly: "we've spent less than planned" is meaningless if less work was done.`,
        },
        { kind: "equation", formula: "evm-cv" },
        { kind: "equation", formula: "evm-sv" },
        { kind: "equation", formula: "evm-cpi" },
        { kind: "equation", formula: "evm-spi" },
        {
          kind: "md",
          md: md`### Forecasting

The **Estimate at Completion (EAC)** depends on what you assume about remaining work. Present at least two to leadership, and say which you believe and why.`,
        },
        { kind: "equation", formula: "evm-eac-cpi" },
        { kind: "equation", formula: "evm-eac-atypical" },
        { kind: "equation", formula: "evm-eac-cpi-spi" },
        { kind: "equation", formula: "evm-etc" },
        { kind: "equation", formula: "evm-vac" },
        { kind: "equation", formula: "evm-tcpi" },
        {
          kind: "callout",
          tone: "why",
          title: "Why CPI is so predictive",
          md: md`Studies of hundreds of US defence contracts found cumulative CPI stabilises once a project is roughly 20 % complete, and the final CPI rarely ends up more than about 0.1 better than at that point. Reason: the early CPI reflects the estimate's realism, productivity and management — none of which changes quickly. So a contractor at 40 % complete with CPI 0.92 promising to finish on budget needs a TCPI well above 1.0: a step change in efficiency nobody achieves without a change in scope or method.`,
        },
        {
          kind: "md",
          md: md`### Earned schedule

Cost-based SV and SPI have a structural flaw: at completion EV = PV = BAC, so a project finishing 4 months late ends with SV = 0 and SPI = 1.0. After about two-thirds of the planned duration they become unreliable. **Earned schedule** (Lipke, 2003) fixes this by asking: **at what time should the current EV have been earned?**`,
        },
        { kind: "equation", formula: "evm-earned-schedule" },
        { kind: "equation", formula: "evm-spi-t" },
        {
          kind: "md",
          md: md`### Progress measurement methods (rules of credit)

EV is only as good as the method used to measure "percent complete". Agree the method per work-package type **before** work starts, in the contractor's progress measurement procedure.

| Method | How credit is earned | Best for | Inflation risk |
|---|---|---|---|
| **Units completed** | Quantity done / total quantity | Piles, tracker rows, modules installed, cable metres, terminations | Low — if the unit is objectively verifiable and "complete" is defined (installed **and** inspected) |
| **Weighted milestones** | Fixed % at defined, verifiable events | Procurement (approval → PO → FAT → shipped → on site), engineering documents (IFR → IFA → IFC) | Medium — depends on the weights; front-loading is common |
| **0/100** | Credit only at completion | Short activities (< 1 reporting period), tests | Very low; understates progress mid-period |
| **50/50** (or 20/80) | 50 % at start, 50 % at finish | Activities of 1–2 periods | Medium; credit at start is "free" |
| **Percent complete (subjective)** | Supervisor's estimate | Avoid except where nothing else works | High |
| **Level of effort** | Earned with time (EV = PV) | PM, supervision, site services | Hides inefficiency; keep small |
| **Apportioned effort** | % of a related discrete package | QA/QC inspection tied to installation | Inherits base package's quality |

Example rules of credit for **PV module supply**:

- datasheet/vendor approval 5 %
- PO placed 5 %
- FAT/pre-shipment inspection passed 15 %
- shipped (B/L) 15 %
- delivered to site, customs-cleared and receipt-inspected 60 %

Installation is measured separately by units (modules mechanically installed, strings connected, strings tested).`,
        },
        { kind: "sources", refs: ["m08-pmi-evm", "m08-eia-748", "m08-gao-cost", "m08-earned-schedule"] },
      ],
    },
    {
      layer: "applied",
      title: "Full EVM on a 500 MW PV EPC",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Month 10 of 20: EVM status of a 500 MWac PV EPC (BAC USD 280 m)",
          given: md`An EPC contractor's monthly report (shared with the Employer's team under an open-book clause; amounts in USD m) gives the following at the end of month 10 of a 20-month programme. Weights are by budget.

| WBS | Package | Weight | BAC | Planned % | Earned % | AC |
|---|---|---|---|---|---|---|
| 1.1 | Design | 3 % | 8.40 | 100 | 100 | 9.0 |
| 1.2 | Modules (supply) | 35 % | 98.00 | 60 | 50 | 47.0 |
| 1.3 | Trackers (supply) | 15 % | 42.00 | 70 | 55 | 25.0 |
| 1.4 | Inverters/MV stations | 10 % | 28.00 | 40 | 40 | 11.5 |
| 1.5 | Civil & piling | 8 % | 22.40 | 80 | 70 | 17.5 |
| 1.6 | Mechanical installation | 10 % | 28.00 | 30 | 20 | 6.8 |
| 1.7 | Electrical DC/AC | 9 % | 25.20 | 20 | 15 | 4.4 |
| 1.8 | 400 kV substation | 7 % | 19.60 | 30 | 25 | 5.6 |
| 1.9 | Commissioning | 3 % | 8.40 | 0 | 0 | 0.2 |

Baseline cumulative PV by month: 4, 9, 16, 26, 40, 58, 78, 100, 122, 145.04, 168, 190, 210, 228, 243, 255, 265, 272, 277, 280.`,
          steps: [
            {
              md: md`**Package-level PV, EV, CV, SV, CPI** (PV = BAC × planned %, EV = BAC × earned %):

| Package | PV | EV | AC | CV | SV | CPI |
|---|---|---|---|---|---|---|
| Design | 8.40 | 8.40 | 9.0 | −0.60 | 0.00 | 0.933 |
| Modules | 58.80 | 49.00 | 47.0 | +2.00 | −9.80 | 1.043 |
| Trackers | 29.40 | 23.10 | 25.0 | −1.90 | −6.30 | 0.924 |
| Inverters/MV | 11.20 | 11.20 | 11.5 | −0.30 | 0.00 | 0.974 |
| Civil & piling | 17.92 | 15.68 | 17.5 | −1.82 | −2.24 | 0.896 |
| Mech. installation | 8.40 | 5.60 | 6.8 | −1.20 | −2.80 | 0.824 |
| Electrical | 5.04 | 3.78 | 4.4 | −0.62 | −1.26 | 0.859 |
| Substation | 5.88 | 4.90 | 5.6 | −0.70 | −0.98 | 0.875 |
| Commissioning | 0.00 | 0.00 | 0.2 | −0.20 | 0.00 | — |
| **Total** | **145.04** | **121.66** | **127.0** | **−5.34** | **−23.38** | **0.958** |`,
            },
            { md: md`**Indices**: $CPI = 121.66/127.0 = 0.958$; $SPI = 121.66/145.04 = 0.839$. Overall progress $= EV/BAC = 43.5\,\%$ vs planned $51.8\,\%$.` },
            {
              md: md`**EAC variants**:

| Method | Formula | EAC (USD m) | VAC |
|---|---|---|---|
| Typical (CPI) | $BAC/CPI$ | **292.3** | −12.3 |
| Atypical | $AC + (BAC - EV)$ | 285.3 | −5.3 |
| Weighted $0.8\,CPI + 0.2\,SPI$ | $AC + (BAC-EV)/(0.8\,CPI+0.2\,SPI)$ | 296.5 | −16.5 |
| CPI × SPI | $AC + (BAC-EV)/(CPI \cdot SPI)$ | 324.1 | −44.1 |`,
            },
            { md: md`$ETC = EAC - AC = 292.3 - 127.0 = 165.3$. $TCPI_{BAC} = (280 - 121.66)/(280 - 127.0) = 158.34/153.0 = 1.035$ — the contractor must now be 3.5 % **more** efficient than budget on all remaining work, compared with 4.2 % **less** efficient so far.` },
            { md: md`**Earned schedule**: EV = 121.66 lies between PV(month 8) = 100 and PV(month 9) = 122. $ES = 8 + (121.66 - 100)/(122 - 100) = 8.985$ months. $SV(t) = 8.985 - 10 = -1.02$ months. $SPI(t) = 8.985/10 = 0.898$. $IEAC(t) = 20/0.898 = 22.3$ months.` },
            { md: md`**Diagnosis**: the cost problem is in **field work** (civil 0.896, mechanical 0.824, electrical 0.859), not supply — consistent with low installation productivity (heat, crew learning curve, piling refusals). The schedule problem is concentrated in **module and tracker deliveries** (−16.1 of the −23.4 SV). Module CPI > 1 is a supply-price effect that masks field overruns in the total.` },
          ],
          result: md`CPI 0.958, SPI 0.839, SPI(t) 0.898; EAC most likely about USD 292–297 m (VAC −12 to −17 m), duration forecast about 22.3 months against 20. The total hides a field-productivity problem that will worsen as installation becomes the dominant spend — the most likely EAC drifts towards the pessimistic end unless productivity recovers.`,
        },
        {
          kind: "widget",
          widget: "evm",
          props: { bac: 280, pv: 145.04, ev: 121.66, ac: 127 },
          caption: "Reproduce the worked example, then change EV to see how sensitive the EAC methods are to the progress claim.",
        },
        {
          kind: "diagram",
          diagram: "evm-scurve",
          caption: "Baseline PV, EV and AC curves to the status date, with cost and schedule variances and BAC.",
        },
        {
          kind: "worked",
          mode: "faded",
          title: "The BESS contractor who says 'we're on track'",
          given: md`A 250 MW / 1,000 MWh BESS EPC directly procured by MEWRE: BAC **KWD 60.0 m**. Month 8 report: PV = **24.0**, EV = **21.0**, AC = **22.8** (KWD m, contractor's open-book costs). The contractor's narrative says "on track for budget and completion".`,
          steps: [
            { md: md`$CV = 21.0 - 22.8 = -1.8$ m; $SV = 21.0 - 24.0 = -3.0$ m.` },
            {
              md: md`$CPI = 21.0/22.8 = 0.921$; $SPI = 21.0/24.0 = 0.875$.`,
              hidden: true,
              check: { prompt: "CPI (3 decimals)", answer: 0.921, tolerance: { abs: 0.002 } },
            },
            {
              md: md`$EAC = BAC/CPI = 60.0/0.921 = 65.1$ m, so $VAC = -5.1$ m.`,
              hidden: true,
              check: { prompt: "EAC by the CPI method", answer: 65.14, unit: "KWD m", tolerance: { abs: 0.1 } },
            },
            {
              md: md`$TCPI_{BAC} = (60.0 - 21.0)/(60.0 - 22.8) = 39.0/37.2 = 1.048$.`,
              hidden: true,
              check: { prompt: "TCPI to achieve BAC", answer: 1.048, tolerance: { abs: 0.003 } },
            },
          ],
          result: md`"On track" requires a jump from CPI 0.92 to 1.05 on the remaining 65 % of work — not credible. On a lump-sum contract the overrun is the contractor's money, but it is MEWRE's **risk**: a contractor losing KWD 5 m looks for claims, squeezes subcontractors and quality, and may slow down. Ask for a bottom-up ETC and a recovery plan.`,
        },
        {
          kind: "question",
          question: {
            id: "m08-l04-p1",
            type: "numeric",
            prompt: md`Module supply package BAC = USD 98 m. All purchase orders are placed; 50 % of modules have been delivered to site and receipt-inspected. The contractor's rules of credit are 40 % at PO and 60 % on delivery; the rules MEWRE's team believes were agreed are 10 % at PO and 90 % on delivery. By how much (USD m) does the contractor's method overstate EV?`,
            answer: 14.7,
            unit: "USD m",
            tolerance: { abs: 0.05 },
            explanation: md`Contractor: $40\,\% + 0.5 \times 60\,\% = 70\,\%$ → EV = 68.6. Agreed: $10\,\% + 0.5 \times 90\,\% = 55\,\%$ → EV = 53.9. Overstatement **14.7 m**, about 5 % of a USD 280 m BAC — enough to turn an SPI of 0.84 into an apparent 0.94. Settle rules of credit in writing before the first progress report, and tie payment milestones to the same verifiable events.`,
            concepts: ["m08.progress-measurement", "m08.progress-inflation"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "EVM from the ministry's chair",
      blocks: [
        {
          kind: "md",
          md: md`### Whose EVM?

On a **lump-sum EPC**, the contractor's actual cost belongs to the contractor; MEWRE usually does not see it unless the contract requires open-book reporting. MEWRE's own controls therefore use:

- **Schedule EVM** (EV vs PV, SPI, SPI(t)) — fully available, because progress is measured physically and is the basis of payment.
- **Payment vs earned value**: compare cumulative **certified payments** with EV at contract prices. If payments run ahead of EV, the payment schedule is **front-loaded** and MEWRE is financing the contractor and losing leverage (the performance security may not cover the gap).
- **Owner's budget EVM**: MEWRE's whole project budget (EPC + grid works + OE + owner's costs + contingency) against its own baseline.

On an **IPP**, MEWRE pays nothing until COD — EVM is a **schedule-risk** tool for protecting the PPA COD and grid interface dates; the lenders' technical advisor runs cost EVM for the lenders.

### How EPC progress gets inflated

1. **Procurement credited at PO or at "manufactured"** rather than at site delivery.
2. **Materials on site counted twice** — once as delivered, again as "installed" without inspection.
3. **Subjective % complete** on engineering ("design 85 % complete") instead of document status counts (IFC issued).
4. **Front-loaded weights**: mobilisation, design and early activities over-weighted.
5. **Installed ≠ complete**: modules mounted but not torqued, strings connected but not IV-curve tested, cables pulled but not terminated and megger-tested.
6. **Rework counted as progress** after an NCR.
7. **Changing weights** or rules mid-project without approval.
8. **Man-hour-weighted progress** reported against value-weighted plan (or vice versa).

The antidote: an agreed **progress measurement procedure**, units verified by joint measurement (MEWRE/OE and EPC walk-downs per block), progress tied to **QC acceptance** (ITP sign-offs), and a monthly reconciliation of claimed progress vs inspection records.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Reading a monthly report that shows CPI 0.92 but says 'on track'",
          md: md`- The narrative and the numbers disagree — believe the numbers, then interrogate them.
- Look at package-level indices: one package at 0.75 is a different problem from all at 0.92.
- Check whether the **baseline** was quietly changed (PV curve shifted right improves SPI).
- Compute TCPI; if it exceeds CPI by > 0.05–0.10 the "on budget" claim is not credible.
- On lump sum, ask about the contractor's financial health and subcontractor payment status.`,
        },
        {
          kind: "checklist",
          title: "EVM set-up and monthly review checklist",
          items: [
            "Baseline (PV curve) frozen and approved; changes only via change control.",
            "Rules of credit agreed per work-package type in the progress measurement procedure.",
            "Units of measure verifiable by joint walk-down; progress tied to ITP acceptance.",
            "Payment milestones aligned with the same verifiable events (no front-loading).",
            "Monthly: package-level CV/SV/CPI/SPI, SPI(t), EAC range, TCPI, trend charts.",
            "Reconcile EV with certified payments and with schedule % complete.",
            "Report the EAC range and the one you believe, with reasons.",
          ],
        },
        {
          kind: "ask",
          title: "Ask the contractor",
          items: [
            "Show me your rules of credit for module supply and module installation — where is 'complete' defined?",
            "Reconcile this month's claimed modules installed with the QC records of torque checks and string tests.",
            "Your field CPI is 0.82 — what productivity (modules/crew/day) did you plan and what are you achieving in July?",
            "What is your bottom-up ETC, and how does it compare with BAC/CPI?",
            "Has any baseline date or weight changed since the last report?",
          ],
        },
        {
          kind: "feynman",
          prompt: "Explain to a ministry finance official why 'we have spent less than planned' does not mean a project is under budget.",
          keyPoints: [
            "Spend must be compared with value of work done, not with plan",
            "EV is the budget of work actually completed",
            "Underspend with low EV means behind schedule, possibly over budget",
            "CPI = EV/AC measures cost efficiency",
            "Example with numbers",
          ],
        },
        { kind: "scenario", scenario: "m08-s4" },
        { kind: "sources", refs: ["m08-gao-cost", "m08-earned-schedule"] },
      ],
    },
  ],
  quiz: [
    {
      id: "m08-l04-q1",
      type: "numeric",
      prompt: md`BAC = KWD 40 m, PV = 18 m, EV = 16 m, AC = 17.5 m. What is the EAC using the CPI method (KWD m)?`,
      answer: 43.75,
      unit: "KWD m",
      tolerance: { abs: 0.05 },
      explanation: md`$CPI = 16/17.5 = 0.914$; $EAC = 40/0.914 = 43.75$ m (exactly $40 \times 17.5/16$). VAC = −3.75 m.`,
      concepts: ["m08.evm-forecasting"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m08-l04-q2",
      type: "mcq",
      prompt: "A project shows CPI = 1.05 and SPI = 0.80. The most likely interpretation is…",
      options: ["Under budget and ahead of schedule", "Over budget and behind schedule", "Cost-efficient on the work done, but well behind schedule", "The data are inconsistent"],
      answer: 2,
      explanation: md`CPI > 1: work done cost less than budgeted. SPI < 1: less work done than planned. Typical of a project starved of resources or held up by deliveries: low burn, low progress. Watch for acceleration costs later.`,
      concepts: ["m08.evm-basics"],
      difficulty: 1,
    },
    {
      id: "m08-l04-q3",
      type: "numeric",
      prompt: md`Baseline cumulative PV (USD m): month 5 = 40, month 6 = 58, month 7 = 78. At the end of month 7, EV = 52. What is SPI(t)?`,
      answer: 0.81,
      tolerance: { abs: 0.003 },
      explanation: md`EV = 52 lies between PV(5) = 40 and PV(6) = 58, so $C = 5$: $ES = 5 + (52-40)/(58-40) = 5.667$ months. With $AT = 7$: $SPI(t) = 5.667/7 = 0.810$, and $SV(t) = -1.33$ months. Cost-based SPI would be $52/78 = 0.667$; the two differ because the S-curve is steep here.`,
      concepts: ["m08.earned-schedule"],
      difficulty: 2,
    },
    {
      id: "m08-l04-q4",
      type: "label",
      prompt: "Label the EVM S-curve diagram.",
      diagram: "evm-scurve",
      markers: [
        { id: "pv-curve", answer: "Planned value (baseline)" },
        { id: "ev-curve", answer: "Earned value" },
        { id: "ac-curve", answer: "Actual cost" },
        { id: "cost-variance", answer: "CV = EV − AC" },
        { id: "schedule-variance", answer: "SV = EV − PV" },
        { id: "bac", answer: "Budget at completion" },
        { id: "status-date", answer: "Status (data) date" },
      ],
      options: ["Planned value (baseline)", "Earned value", "Actual cost", "CV = EV − AC", "SV = EV − PV", "Budget at completion", "Status (data) date", "Estimate at completion", "Management reserve"],
      explanation: md`PV is the baseline S-curve ending at BAC. EV and AC stop at the status date. The vertical gap EV−AC is CV; EV−PV is SV (in money). EAC would be a forecast point beyond BAC on the cost axis.`,
      concepts: ["m08.evm-basics"],
      difficulty: 1,
    },
    {
      id: "m08-l04-q5",
      type: "multi",
      prompt: "Which practices inflate reported EPC progress?",
      options: [
        "Crediting module supply at purchase order",
        "Measuring piles by count of piles driven and inspected",
        "Counting strings as complete when connected but not IV-tested",
        "Using 0/100 for a 3-day test",
        "Subjective '% complete' on detailed design",
        "Front-loading weights on mobilisation and design",
      ],
      answer: [0, 2, 4, 5],
      explanation: md`Units completed with inspection and 0/100 for short activities are conservative. Credit at PO, 'installed but untested', subjective engineering % and front-loaded weights all push EV ahead of reality.`,
      concepts: ["m08.progress-inflation", "m08.progress-measurement"],
      difficulty: 2,
    },
    {
      id: "m08-l04-q6",
      type: "numeric",
      prompt: md`BAC = 120, EV = 54, AC = 60. What TCPI is required to finish at BAC?`,
      answer: 1.1,
      tolerance: { abs: 0.003 },
      explanation: md`$TCPI = (120-54)/(120-60) = 66/60 = 1.10$ against a current CPI of 0.90. A 0.20 improvement is not credible; re-forecast.`,
      concepts: ["m08.evm-forecasting"],
      difficulty: 1,
    },
    {
      id: "m08-l04-q7",
      type: "decision",
      prompt: md`On a MEWRE lump-sum PV EPC, cumulative certified payments are KWD 31 m while EV at contract rates is KWD 24 m. The performance security is 10 % of the KWD 90 m contract. You are the PM.`,
      options: [
        { text: "Flag front-loading: withhold certification of milestones not supported by verified progress, align future milestones to earned value, and report the KWD 7 m exposure versus the KWD 9 m security.", score: 1, feedback: "Correct: you are financing the contractor ahead of work; the gap is approaching the security value. Act within the contract's payment provisions." },
        { text: "No action — payment milestones are contractual.", score: 0.3, feedback: "Milestones are contractual, but certification requires the milestone to be genuinely achieved; and the exposure must be reported." },
        { text: "Stop all payments until EV catches up.", score: 0.2, feedback: "Withholding properly due payments breaches the contract and invites suspension/claims." },
      ],
      explanation: md`Payment ahead of earned value is credit risk. Compare the gap (31 − 24 = 7 m) with the security (9 m) and the advance payment guarantee balance.`,
      concepts: ["m08.progress-inflation", "m08.evm-basics"],
      difficulty: 3,
    },
  ],
  flashcards: [
    { id: "m08-l04-f1", front: "PV, EV, AC in one line each", back: "PV: budget of work scheduled. EV: budget of work performed. AC: actual cost of work performed." },
    { id: "m08-l04-f2", front: "CV and SV formulas", back: md`$CV = EV - AC$; $SV = EV - PV$ (negative = bad).` },
    { id: "m08-l04-f3", front: "CPI and SPI formulas", back: md`$CPI = EV/AC$; $SPI = EV/PV$.` },
    { id: "m08-l04-f4", front: "Four EAC methods", back: md`$BAC/CPI$; $AC + (BAC-EV)$; $AC + (BAC-EV)/(CPI\cdot SPI)$; $AC + (BAC-EV)/(0.8CPI + 0.2SPI)$.` },
    { id: "m08-l04-f5", front: "TCPI (to BAC)", back: md`$(BAC - EV)/(BAC - AC)$ — efficiency required on remaining work.` },
    { id: "m08-l04-f6", front: "Why does cost-based SPI fail late in a project?", back: "EV and PV both converge to BAC, so SPI → 1.0 even for a late project." },
    { id: "m08-l04-f7", front: "Earned schedule ES", back: md`Time when the current EV should have been earned: $ES = C + (EV - PV_C)/(PV_{C+1} - PV_C)$.` },
    { id: "m08-l04-f8", front: "Best progress method for piles, tracker rows, cables", back: "Units completed (installed and inspected)." },
    { id: "m08-l04-f9", front: "Front-loading", back: "Payment/progress weights skewed to early activities so payment runs ahead of earned value." },
    { id: "m08-l04-f10", front: "When does cumulative CPI stabilise?", back: "Around 20 % complete; rarely improves by more than ~0.1 afterwards." },
  ],
  scenarios: [
    {
      id: "m08-s4",
      title: "CPI 0.92 and an 'all green' narrative",
      dayInLife: true,
      context: md`Monthly report, month 9 of a 22-month 500 MW PV EPC directly procured by MEWRE (lump sum, open-book reporting required). Executive summary: "Project on track. All KPIs green." The EVM appendix shows cumulative **CPI 0.92**, **SPI 0.88**, field-installation CPI 0.81. Your Assistant Undersecretary will read only the executive summary.`,
      start: "a",
      concepts: ["m08.evm-basics", "m08.evm-forecasting", "m08.progress-inflation"],
      nodes: {
        a: {
          md: md`What is your first step?`,
          choices: [
            { text: "Compute EAC range, TCPI and SPI(t) from the appendix, check package-level indices and whether the baseline changed, before the monthly meeting.", next: "b", score: 10, feedback: "Do the analysis first: you need numbers, not opinions, in the meeting." },
            { text: "Forward the report to leadership as received.", next: "c", score: 1, feedback: "You would be endorsing a narrative contradicted by its own data." },
            { text: "Call the contractor's director and accuse them of misreporting.", next: "c", score: 3, feedback: "You may be right, but without analysis you hand them an easy rebuttal and damage the relationship." },
          ],
        },
        b: {
          md: md`Your analysis: TCPI 1.06 required vs CPI 0.92; SPI(t) 0.90 → completion forecast about 2 months late; module installation credited on 'mounted' not 'tested'. In the meeting the contractor says field productivity will improve after summer.`,
          choices: [
            { text: "Accept that productivity may improve, but require: revised progress measurement aligned to QC acceptance, a resourced recovery schedule, and a bottom-up ETC within 14 days. Record it in the minutes.", next: "d", score: 10, feedback: "You allow for a plausible effect but demand evidence, correct the measurement, and set a deadline." },
            { text: "Accept the explanation; summer is hard.", next: "c", score: 3, feedback: "Partly true, but the programme should already have included summer productivity. Unverified optimism becomes next month's surprise." },
          ],
        },
        c: {
          md: md`Two months later, the forecast completion slips 10 weeks and the contractor issues notices blaming late design approvals and grid interface information.`,
          choices: [
            { text: "Assemble records (review periods, ICD dates), assess the notices, and give leadership an honest amber/red status with the recovery options.", next: "d", score: 5, feedback: "Recovering, but the early-warning window was missed." },
            { text: "Keep reporting green until the notices are resolved.", score: 0, feedback: "Watermelon reporting (green outside, red inside) destroys trust when it surfaces — and it always surfaces." },
          ],
        },
        d: {
          md: md`How do you report to the Assistant Undersecretary?`,
          choices: [
            { text: "Amber: cost overrun is contractor risk under lump sum but signals claim and quality risk; schedule forecast ~2 months late vs baseline; actions and decision needed (none yet / approve recovery approach); next review date.", score: 10, feedback: "Honest, explains why a contractor's cost problem is the ministry's risk, and frames what leadership must do." },
            { text: "Green: it's the contractor's money.", score: 2, feedback: "Cost overrun on lump sum still matters: claims, quality, insolvency risk, and the schedule is late." },
          ],
        },
      },
    },
  ],
};

export default lesson;
