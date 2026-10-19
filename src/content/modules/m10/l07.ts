import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m10-l07",
  title: "Spreadsheet Practice Lab: Build, Break and Audit the Models",
  summary:
    "Hands-on lab with the five downloadable models — LCOE, project finance, tariff evaluation, cash-flow forecast and EVM tracker — plus the modelling standards and audit checks a PM needs to trust (or challenge) any consultant's spreadsheet.",
  minutes: 120,
  objectives: [
    "Navigate an inputs → calculations → outputs model and trace any result back to its inputs",
    "Reproduce every key number of this module from live formulas and explain differences",
    "Use Goal Seek, SUMPRODUCT-based sensitivities and scenario switches to answer decision questions",
    "Apply a model-review checklist (structure, signs, timing, hard-codes, checks) to a third-party model",
  ],
  concepts: [
    { id: "m10.model-structure", name: "Financial model structure and standards", description: "Separation of inputs, calculations and outputs; one timeline; consistent signs and units; no hard-coded numbers in formulas; checks and flags (FAST-style principles).", competency: "finance", related: ["m10.npv", "m10.cfads-waterfall"] },
    { id: "m10.model-audit", name: "Model review and audit", description: "Systematic checks a PM applies to a consultant's or bidder's model: tie-outs, balance checks, sign conventions, timing, circularity, sensitivity behaviour.", competency: "finance", related: ["m10.model-structure"] },
    { id: "m10.what-if-analysis", name: "What-if analysis in spreadsheets", description: "Goal Seek, scenario switches, one-at-a-time sensitivities and data tables to answer 'what would it take' questions.", competency: "finance", related: ["m10.tornado-scenario", "m10.model-structure"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "How good models are built — and why it matters to a PM",
      blocks: [
        {
          kind: "md",
          md: md`You will rarely build the lenders' model yourself, but you will be handed models every week — a consultant's feasibility, a bidder's financial offer, a contractor's cash-flow forecast, a claim quantum. Your job is to decide quickly whether a model can be trusted. Good models share a small set of structural rules (the FAST Standard and similar codes formalise them):

| Principle | What it looks like in the lab models | Why it matters |
|---|---|---|
| **Separate inputs, calculations, outputs** | Yellow input cells on the Inputs sheet only; Calc/CashFlow sheets contain formulas only; Results/Summary pull from Calc | You can change an assumption in one place and trust the result |
| **One timeline per sheet** | Year 0..40 in column A; every row uses the same column structure | Consistent formulas across a row; no "special" years |
| **Flags instead of IF-spaghetti** | Operating flag and loan flag columns (1/0) multiply the cash flows | Life and tenor can change without rewriting formulas |
| **Consistent signs and units** | Costs positive in cost columns; project and equity CF signed; units in headers (USD m, GWh, USc/kWh) | Most model errors are sign or unit errors |
| **No hard-coded numbers in formulas** | Even 8.76 (h/yr ÷ 1000) appears explicitly with a note; everything else references Inputs | Hidden constants are where models go wrong |
| **Checks** | "Debt repaid" check = 0.000; FY totals = contract value; LCOE exact = LCOE via CRF | A model that does not check itself cannot be trusted |

### Excel functions you need — and their traps

The theory is Lessons 1–6; these are its spreadsheet forms:`,
        },
        { kind: "equation", formula: "m10-npv" },
        {
          kind: "md",
          md: md`| Function | Use | Trap |
|---|---|---|
| =NPV(r, CF1:CFN) | PV of flows at t = 1..N | Excludes year 0 — add it separately |
| =IRR(CF0:CFN) | IRR of a periodic series | Needs year 0 in the range; multiple IRRs if signs change twice |
| =XNPV / XIRR | Irregular dates (monthly construction draws, COD mid-year) | Uses actual/365 day count; dates must be real dates |
| =MIRR(range, finance, reinvest) | Unique, realistic return | State both rates |
| =SUMPRODUCT(A, B, C) | Discounted sums in one cell (LCOE, levelized tariff, LLCR) | Ranges must be the same size; arrays inside (1/(1+r)^years) work in Excel and LibreOffice |
| =EDATE(start, m) | Monthly timelines | Returns a serial number — format as date |
| =INDEX(range, n) | Pull the status-month value (EVM tracker) | n must be within range |
| Goal Seek (What-If Analysis) | "What tariff gives 9 % equity IRR?" | Changes an input permanently — note the original value |
| Data Table | Two-way sensitivity grids | Slow; recalculates the whole model per cell |

### Circularity

Real project-finance models are often **circular**: debt size depends on DSCR, which depends on debt service, which depends on interest during construction, which depends on debt size; fees depend on debt; DSRA funding depends on debt service. Modellers break the loop with copy-paste macros or algebraic solutions (as the sculpting formula does here). If you see "iterative calculation enabled" in a bidder's model, ask how circularity is controlled and whether results converge.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why a PM should rebuild key numbers",
          md: md`A ministerial decision about a 30-year, USD 1.5 bn payment stream should never rest on a number nobody in the ministry can reproduce. Rebuilding the headline (LCOE, levelized tariff, FY cash need) in a simple independent model is the fastest way to find the error that would otherwise surface at the Audit Bureau, at financial close or in a dispute.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Guided exercises with the downloadable models",
      blocks: [
        {
          kind: "md",
          md: md`Download the five models. Each opens with a README sheet; inputs are yellow with blue text; results are green. The files recalculate on opening (Excel or LibreOffice). Work through the exercises in order — expected answers are given so you can check yourself.`,
        },
        {
          kind: "download",
          file: "/downloads/lcoe-model.xlsx",
          title: "Exercise set 1 — LCOE model",
          description: "Reproduce 1.764 US cents/kWh; tie out to the 1.800 tariff; Goal Seek capex; complete the tornado; tracker vs fixed tilt.",
        },
        {
          kind: "worked",
          mode: "worked",
          title: "Exercise 1 walk-through: from inputs to LCOE and back",
          given: md`lcoe-model.xlsx, base inputs (1,430 MWp, 2,100 kWh/kWp, 0.4 %/yr, USD 560 m, USD 7.5 m/yr +2 %, WACC 6.2 %, 30 years).`,
          steps: [
            { md: md`**Trace:** Results!B9 (LCOE, US cents/kWh) = B7 × 100; B7 = B5/B6; B5 = Calc!H46 (Σ PV cost); B6 = Calc!G46 (Σ PV energy). Calc row 6 (year 1): energy = flag × E1 × (1 − deg)^(year − 1) = 3,003.0; DF = 1/1.062 = 0.9416. Every number is traceable in three clicks.` },
            { md: md`**Reproduce:** LCOE = 685.35/38,861.7 = **1.764** cents (Results!B9); CRF check Results!B18 = 1.764; naive CRF B15 = 1.634.` },
            { md: md`**Tie-out:** set WACC = 6.45 % → LCOE = **1.800** (1.7998 at 6.45 %, exactly 1.800 at the 6.4517 % project IRR). LCOE at the project IRR equals the flat tariff — the cleanest test that the LCOE and project-finance models describe the same plant.` },
            { md: md`**Goal Seek:** Set Results!B9 to 1.50 by changing Inputs capex → **USD 457.6 m** (0.320 USD/Wp). Check by hand: capex $= 0.0150\times 38{,}861.7 - 125.35 = 457.6$, since PV(opex) = 685.35 − 560 = 125.35 does not depend on capex.` },
            { md: md`**Tornado:** Sensitivity!F18:F22 swings — yield 0.356, capex 0.288, WACC 0.288, opex 0.129, degradation 0.080. **Fixed tilt:** yield 1,850 and capex 520 → 1.885 cents: the tracker is worth it.` },
          ],
          result: md`You can now explain any LCOE in three numbers (PV cost, PV energy, their ratio) and challenge one built on year-1 values.`,
        },
        {
          kind: "download",
          file: "/downloads/project-finance-model.xlsx",
          title: "Exercise set 2 — Project finance model",
          description: "Base case tie-out; gearing vs DSCR constraint; aggressive tariff; P90 stress; tariff indexation.",
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Exercise 2: which constraint binds, and what it does to returns",
          given: md`project-finance-model.xlsx at base inputs: Summary shows sculpted capacity 461.4, gearing-cap debt 448.0, binding constraint "Gearing cap", min DSCR 1.287, project IRR 6.45 %, equity IRR 8.97 %.`,
          steps: [
            { md: md`Change maximum gearing to 90 %. Debt becomes min(461.4, 504.0) = 461.4 → binding constraint "DSCR (sculpting)"; min DSCR falls to 1.250.` },
            { md: md`Read the new equity IRR from Summary!B23.` },
            { md: md`Equity IRR = **9.30 %** (equity 98.6 m).`, hidden: true, check: { prompt: "Equity IRR with 90 % gearing cap (%)", answer: 9.3, unit: "%", tolerance: { abs: 0.02 } } },
            { md: md`Reset gearing to 80 % and set tariff = 1.44 cents. Debt falls to 349.6 m (DSCR binds; gearing 62.4 %). Read equity IRR.` },
            { md: md`Equity IRR = **1.70 %**, below the 3.82 % project IRR — negative leverage.`, hidden: true, check: { prompt: "Equity IRR at 1.44 cents (%)", answer: 1.7, unit: "%", tolerance: { abs: 0.03 } } },
            { md: md`Goal Seek Summary!B23 = 9 % by changing capex → about **USD 424 m** (−24 %). Finally, reset and set tariff indexation to 0.5 %/yr: equity IRR ≈ 11.2 %, min DSCR ≈ 1.36x — indexation raises CFADS over time while debt stays capped.` },
          ],
          result: md`Which constraint binds decides whether extra cash flow becomes more debt (DSCR-bound) or more equity return (gearing-bound). Bidders optimise exactly this; reviewers must see both numbers.`,
        },
        {
          kind: "download",
          file: "/downloads/tariff-bid-evaluation.xlsx",
          title: "Exercise set 3 — Tariff bid evaluation",
          description: "Levelized ranking at 4/7/10 %; abnormally-low flag; matching base tariff for an indexed bid; weighting sensitivity.",
        },
        {
          kind: "md",
          md: md`**Exercise 3 tasks and answers**
1. Base (7 %): C 1.4400, A 1.8000, D 1.8237, B 1.8791; Bid C flagged "CLARIFY" at −20.5 % vs median.
2. Main rate 4 % → C, D, A, B; 10 % → C, A, B, D. Explain each swap using the weight of early years.
3. Bid B with 1.0 %/yr indexation: base tariff needed to equal A at 7 % = **1.633 cents** (LT factor 1.1025).
4. Technical weight 0 → C still first (pure price); at 70/30 C scores 92.2, D 81.7, A 80.6, B 79.1. Ask yourself whether a 74-point technical score should be allowed to win — that is a pass/fail-threshold question for the RFP, not for the spreadsheet.`,
        },
        {
          kind: "download",
          file: "/downloads/cashflow-forecast.xlsx",
          title: "Exercise set 4 — Cash-flow forecast and contingency",
          description: "FY budget request; 20 % advance; milestone basis; 3-month delay; contingency log.",
        },
        {
          kind: "md",
          md: md`**Exercise 4 tasks and answers (KWD m)**
1. Base S-curve: FY2026/27 **14.282**, FY2027/28 **26.755**, FY2028/29 2.838, FY2029/30 1.125; check cell = 0.000.
2. Advance 20 % (amortisation 25 %): FY2026/27 **18.782**, FY2027/28 22.255; full recovery moves from month 12 to month 19. Raise amortisation to 40 % and recovery completes in month 14.
3. Milestone basis (Inputs basis = 2): FY2026/27 **11.475**, FY2027/28 24.525, FY2028/29 7.875, FY2029/30 1.125 — milestones lag the cosine curve because payment waits for completed, certified events.
4. Start date September 2026 (3-month delay): FY2026/27 **9.537** (4.745 lapses), FY2027/28 26.623, FY2028/29 7.715.
5. Contingency sheet: add an approved variation of 0.800 → drawn 2.400, remaining 2.100, expected pending 2.000, surplus falls to **0.100**; EAC rises to 51.400 against a 51.500 budget — time to warn management before the next item.`,
        },
        {
          kind: "download",
          file: "/downloads/evm-tracker.xlsx",
          title: "Exercise set 5 — EVM tracker",
          description: "Status at months 9 and 12; EAC choice; recovery scenario; chart PV/EV/AC.",
        },
        {
          kind: "question",
          question: {
            id: "m10-l07-p1",
            type: "numeric",
            prompt: md`In evm-tracker.xlsx set the status month to 9. The Status sheet shows PV 13.892, EV 12.640, AC 13.299. What is EAC3 = AC + (BAC − EV)/(CPI × SPI) with BAC = 45.0? (KWD m, 2 decimals)`,
            answer: 50.72,
            tolerance: { abs: 0.05 },
            unit: "KWD m",
            explanation: md`CPI $= 12.640/13.299 = 0.950$; SPI $= 12.640/13.892 = 0.910$; EAC3 $= 13.299 + 32.36/(0.950\times 0.910) = 13.299 + 37.42 = 50.72$. Between months 9 and 12 CPI fell from 0.950 to 0.934 and SPI from 0.910 to 0.880: the trend, not the point value, is the warning — the flag moved from AMBER to RED.`,
            concepts: ["m10.what-if-analysis", "m10.eac-forecast"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Reviewing other people's models",
      blocks: [
        {
          kind: "md",
          md: md`### A 30-minute review routine for any model you receive

1. **Map it (5 min):** list sheets; find inputs, calculations, outputs; note the timeline (annual, semi-annual, monthly) and the currency/units.
2. **Tie out (5 min):** pick the headline output and trace it to inputs; reproduce it in a scratch calculation (e.g. LCOE = PV cost / PV energy).
3. **Checks (5 min):** does it have balance and tie-out checks? Are they all zero? Sources = uses at financial close; debt fully repaid at maturity; cash never negative without a funding line.
4. **Stress (10 min):** change one input at a time by an obvious amount — does the output move in the right direction and by a plausible magnitude? (+10 % yield should cut LCOE ~9 %.) Set tenor = 1, life = 1 — does it break?
5. **Hunt hard-codes (5 min):** search formulas for typed numbers (Excel: Go To Special → Constants inside formula areas; formula auditing tools; Inquire add-in if available).`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Errors found in real reviews",
          md: md`- =NPV() including the year-0 cell (value understated by (1+r)).
- Annual model with semi-annual debt service pasted in without converting rates.
- Degradation applied from year 1 instead of year 2 (or twice: in P50 and again in the model).
- Energy in MWh multiplied by a tariff in cents/kWh without the factor 10.
- Debt "fully repaid" only because a plug line forces the balance to zero.
- Data tables left on manual calculation, showing stale results.
- A tariff indexation formula referencing the wrong row, so year-30 tariff equals year 1.`,
        },
        {
          kind: "checklist",
          title: "Model review checklist",
          items: [
            "Inputs clearly separated, sourced and dated; units on every row",
            "Single consistent timeline; flags drive operating and loan periods",
            "Headline outputs reproduced independently within rounding",
            "All checks present and zero; sources = uses; debt repaid without plugs",
            "Signs consistent; real/nominal and currency basis consistent throughout",
            "Sensitivities behave in the expected direction and magnitude",
            "No hard-coded numbers in calculation formulas; circularity documented and controlled",
            "Version, author and change log recorded; model audit (for lenders' models) available",
          ],
        },
        {
          kind: "ask",
          title: "Ask the modeller",
          items: [
            "Which version of the model is this, and what changed since the last one?",
            "Where are the checks, and are they all zero in this run?",
            "Which cells did you change for the case you are presenting, and from what?",
            "Is the model circular? How is it resolved, and does it converge in every sensitivity?",
            "Has the model been independently audited, and can we have the audit report and the audited base case?",
          ],
        },
        {
          kind: "callout",
          tone: "ai",
          title: "Using AI on spreadsheets — carefully",
          md: md`An AI assistant can explain an unfamiliar formula, draft a check formula, or list the cells that depend on an input. It cannot replace recalculation: always verify AI-proposed numbers in the spreadsheet itself (or with a short script), and never paste confidential bid models into tools that are not approved for confidential ministry data.`,
        },
        { kind: "sources", refs: ["m10-fast-standard", "m10-iea-projected-costs-2020", "m10-nrel-lcoe-doc"] },
        {
          kind: "feynman",
          prompt: "Explain to a colleague how you would decide, in half an hour, whether a bidder's financial model can be relied on for the evaluation report.",
          keyPoints: [
            "Map structure: inputs, calculations, outputs, timeline, units",
            "Reproduce the headline result independently",
            "Check that built-in checks exist and are zero; sources = uses; debt repaid without plugs",
            "Stress inputs and verify direction and magnitude of responses",
            "Look for hard-codes, circularity and version control; request the model audit",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m10-l07-q1",
      type: "mcq",
      prompt: "A model computes =NPV(6.2%, B5:B35) where B5 is the year-0 capex of −560. What is wrong?",
      options: [
        "Nothing; NPV handles year 0 automatically",
        "NPV treats B5 as year 1, so the whole result is divided by an extra (1 + r); use =B5 + NPV(6.2%, B6:B35)",
        "The rate must be entered as 0.062 not 6.2%",
        "NPV cannot handle negative values",
      ],
      answer: 1,
      explanation: md`Excel's NPV discounts the first cell by one period. With year 0 inside the range the answer is the correct NPV divided by 1.062.`,
      concepts: ["m10.model-audit"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m10-l07-q2",
      type: "multi",
      prompt: "Which are signs of a well-structured financial model? (Select all that apply.)",
      options: [
        "Inputs on a dedicated sheet with units and sources",
        "Formulas that mix typed constants with cell references",
        "Operating and loan-period flags on a single timeline",
        "Check cells that return zero when the model balances",
        "A plug that forces closing debt to zero at maturity",
      ],
      answer: [0, 2, 3],
      explanation: md`Typed constants hide assumptions; a plug hides a debt-sizing error. Separation, flags and checks are the core of good practice.`,
      concepts: ["m10.model-structure"],
      difficulty: 1,
    },
    {
      id: "m10-l07-q3",
      type: "numeric",
      prompt: md`Using the LCOE model's results (PV of opex USD 125.35 m, PV energy 38,861.7 GWh at 6.2 %), what capex gives an LCOE of exactly 1.60 US cents/kWh? (USD m, 1 decimal)`,
      answer: 496.4,
      tolerance: { abs: 0.3 },
      unit: "USD m",
      explanation: md`$\text{capex} = 0.0160\times 38{,}861.7 - 125.35 = 621.79 - 125.35 = 496.4$ USD m. Goal Seek will give the same — knowing the closed form lets you sanity-check it.`,
      concepts: ["m10.what-if-analysis", "m10.lcoe"],
      difficulty: 2,
    },
    {
      id: "m10-l07-q4",
      type: "order",
      prompt: "Order the steps of a 30-minute model review.",
      items: ["Map sheets, timeline and units", "Trace and reproduce the headline output", "Verify built-in checks are zero", "Stress inputs and test response direction/magnitude", "Search for hard-codes and circularity"],
      explanation: md`Understand the structure before testing it; reproduce before stressing; finish with the detailed hunt for hidden constants and loops.`,
      concepts: ["m10.model-audit"],
      difficulty: 1,
    },
    {
      id: "m10-l07-q5",
      type: "decision",
      prompt: md`A consultant's model shows LCOE falling when you *reduce* specific yield. You are the PM reviewing it a day before it goes to the Undersecretary. What do you do?`,
      options: [
        { text: "Send it — the base-case number looks reasonable.", score: 0, feedback: "A sensitivity moving in the wrong direction proves a structural error; the base case may be wrong too." },
        { text: "Stop the submission, trace the yield input through the energy calculation, and ask the consultant to fix and re-run with checks before resubmitting.", score: 1, feedback: "Correct: wrong-direction behaviour is a red flag that must be resolved." },
        { text: "Remove the sensitivity table from the report.", score: 0, feedback: "Hiding the symptom leaves the error in the numbers that are presented." },
      ],
      explanation: md`LCOE is inversely proportional to yield. A reversed response usually means a sign error, a broken link (e.g. energy linked to the wrong input) or a stale data table.`,
      concepts: ["m10.model-audit"],
      difficulty: 1,
    },
    {
      id: "m10-l07-q6",
      type: "short",
      prompt: "Why is it useful to tie out the LCOE model to the project-finance model, and what exact relationship should hold?",
      rubric: [
        "LCOE computed at the project IRR equals a flat tariff",
        "This confirms both models use the same energy, capex and opex",
        "A mismatch reveals inconsistent assumptions or errors",
      ],
      modelAnswer: "For a flat tariff, the project IRR is the discount rate at which PV(revenue) = PV(costs), which is exactly the LCOE condition. So the LCOE model run at the project IRR (6.45 %) must return the tariff (1.80 cents). If it does not, the two models do not describe the same plant — different energy, capex, opex, timing or life — and one of them is wrong.",
      explanation: md`In the lab: LCOE at 6.45 % = 1.7998 ≈ 1.80 cents; at the exact project IRR 6.4517 % it is 1.8000.`,
      concepts: ["m10.model-audit", "m10.lcoe"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m10-l07-f1", front: "Three-part model structure", back: "Inputs (sourced, shaded) → calculations (formulas only, one timeline) → outputs (pull from calculations).", concepts: ["m10.model-structure"] },
    { id: "m10-l07-f2", front: "Why flags?", back: "1/0 columns for operating and loan periods let life and tenor change without rewriting formulas.", concepts: ["m10.model-structure"] },
    { id: "m10-l07-f3", front: "XIRR vs IRR", back: "XIRR uses actual dates (irregular flows); IRR assumes equal periods.", concepts: ["m10.what-if-analysis"] },
    { id: "m10-l07-f4", front: "Fastest LCOE tie-out", back: "LCOE at the project IRR equals a flat tariff.", concepts: ["m10.model-audit"] },
    { id: "m10-l07-f5", front: "Red flag in a sensitivity", back: "Output moves the wrong way (e.g. LCOE falls when yield falls) → structural error.", concepts: ["m10.model-audit"] },
    { id: "m10-l07-f6", front: "Capex for a target LCOE (closed form)", back: md`$\text{capex} = \mathrm{LCOE}\times PV(E) - PV(\text{opex})$`, concepts: ["m10.what-if-analysis"] },
    { id: "m10-l07-f7", front: "What does a 'debt repaid' check test?", back: "Sum of principal = debt drawn, with no plug — proves the sculpted schedule is consistent.", concepts: ["m10.model-audit"] },
  ],
};

export default lesson;
