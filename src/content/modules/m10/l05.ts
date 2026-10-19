import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m10-l05",
  title: "Tariff Bid Evaluation and Sensitivity Analysis",
  summary:
    "Compare flat, indexed and front-loaded IPP tariff bids on a levelized basis, choose and publish the evaluation discount rate, run tornado and scenario analysis, and diagnose why an 'aggressive' bid can be the most expensive outcome for the offtaker.",
  minutes: 75,
  objectives: [
    "Compute the levelized tariff and present value of payments for bids with different tariff shapes",
    "Explain how the evaluation discount rate and energy profile change rankings, and why both must be fixed in the RFP",
    "Build tornado and scenario analyses for a bid and for the offtaker's payment commitment",
    "Diagnose an abnormally low bid using a should-cost model, and list what it means for MEWRE's risk",
  ],
  concepts: [
    { id: "m10.levelized-tariff", name: "Levelized tariff comparison", description: "Converting shaped tariff bids into the flat tariff with equal present value of payments for the same energy profile.", competency: "procurement", related: ["m10.lcoe", "m10.npv", "m11.levelized-tariff", "m11.evaluation-methods"] },
    { id: "m10.evaluation-discount-rate", name: "Evaluation discount rate", description: "The rate used to levelize bids; it changes the ranking of shaped bids and must be published before bid opening, consistent with the real/nominal basis of indexation.", competency: "finance", related: ["m10.levelized-tariff", "m10.real-nominal"] },
    { id: "m10.tornado-scenario", name: "Tornado and scenario analysis", description: "One-at-a-time swings ranked by impact (tornado) and coherent combinations of assumptions (scenarios) to test robustness of a result.", competency: "finance", related: ["m10.lcoe-sensitivity", "m08.monte-carlo"] },
    { id: "m10.aggressive-bid", name: "Aggressive (abnormally low) bid risk", description: "A tariff below credible cost exposes the offtaker to failure to close, delay, quality cuts, renegotiation and termination risk.", competency: "procurement", related: ["m10.levelized-tariff", "m10.equity-irr", "m15.bid-evaluation"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Putting different tariff shapes on one scale",
      blocks: [
        {
          kind: "md",
          md: md`Bidders do not all bid a flat tariff. Some index part of the tariff (to cover escalating O&M), some front-load it (higher early tariff to support debt service), some propose steps. Comparing year-1 tariffs rewards whoever back-loads the most. The offtaker needs one number per bid that reflects the **present value of what MEWRE will pay for the same energy**.

### The levelized tariff`,
        },
        { kind: "equation", formula: "m10-levelized-tariff" },
        { kind: "equation", formula: "m10-escalated-tariff" },
        {
          kind: "md",
          md: md`The levelized tariff (LT) is a weighted average of each year's tariff, with weights $w_t = E_t(1+d)^{-t}/\sum E_s(1+d)^{-s}$ — the share of discounted energy delivered in year $t$. Two immediate consequences:
- A **flat** bid's LT equals its tariff at any discount rate.
- A **shaped** bid's LT depends on $d$: higher $d$ puts more weight on early years, favouring back-loaded (indexed) bids and penalising front-loaded ones.

Multiplying LT by discounted energy gives the **present value of payments** — the fiscal commitment the Ministry of Finance cares about.

### Choosing the evaluation discount rate

There is no single right rate, but there are wrong processes:
- It should reflect the **offtaker's (state's) cost of funds or the government's appraisal rate** — not a bidder's WACC. The state is choosing between payment streams, so it discounts at its own opportunity cost.
- It must be on the **same basis as the tariff**: nominal $d$ for nominal (USD, fixed-indexation) tariffs; if indexation is tied to an inflation index, the RFP must state the assumed index path or evaluate in real terms.
- It must be **published in the RFP** and fixed before bids are opened. Because the ranking of shaped bids can flip with $d$, choosing it afterwards is choosing the winner.
- The **energy profile** used for weighting is the offtaker's (e.g. contract capacity × a reference yield with a stated degradation), identical for all bids — not each bidder's own P50, which would reward optimistic yield claims.

### Sensitivity, tornado and scenarios

A **tornado** varies one input at a time between a low and a high value and ranks the swings in the output (Lesson 2 did this for LCOE). It shows *which* assumptions matter. A **scenario** changes several inputs coherently (e.g. "high-rate world": higher base rates, higher inflation, stronger USD) and shows *whether the conclusion survives a plausible world*. For a bid evaluation, run both: tornado on the evaluation parameters (discount rate, energy profile, indexation assumptions) to test the ranking; scenarios on the **bidder's** economics (should-cost) to test whether the winning bid is deliverable.

### What makes an aggressive bid risky — for the offtaker

A tariff below credible cost is not free money. The SPV's equity is thin (Lesson 4), so the gap shows up somewhere:
1. **Failure to reach financial close** — lenders will not lend against a model that does not cover; the award lapses after months of approvals, and the capacity MEWRE needed for summer is late.
2. **Delay** — renegotiation attempts, requests for PPA changes, slow procurement of equipment while waiting for prices to fall.
3. **Quality and performance cuts** — cheaper modules or trackers, thinner O&M, less cleaning; underperformance shows up years later.
4. **Claims and renegotiation** in operation — aggressive interpretation of change-in-law, curtailment and force-majeure clauses.
5. **Distress and termination** — an SPV that cannot service debt; lenders' step-in, restructuring requests, or termination with compensation obligations.
6. **Market signal** — rewarding an unsustainable bid deters disciplined bidders from the next round.

The defence is not to reject low bids by instinct — Gulf tariffs have repeatedly surprised on the downside for good reasons — but to **test them with evidence**: a should-cost model, the bidder's financing commitments, EPC and supply commitments, and an abnormally-low-bid clarification procedure written into the RFP.`,
        },
        { kind: "equation", formula: "m10-bid-score" },
        {
          kind: "callout",
          tone: "why",
          title: "Why front-loaded bids win at low discount rates",
          md: md`Bid D (1.95 cents for 10 years, then 1.65) has a levelized tariff of 1.795 at 4 %, 1.824 at 7 % and 1.849 at 10 %. At a low rate, the cheap later years carry more weight, so D looks better; at a high rate, the expensive early years dominate. A sponsor that knows the evaluation rate will shape its bid to it — which is fine if the rate is published and reflects the state's real cost of money.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Evaluating four bids for a 1,100 MW PV IPP",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Levelized tariffs, payment PV and ranking",
          given: md`Evaluation energy profile: 3,003 GWh in year 1, 0.4 %/yr degradation, 30 years. Evaluation rate 7 % nominal (published in the RFP; illustrative). Bids (illustrative): **A** flat 1.80 cents; **B** 1.62 cents indexed +1.5 %/yr; **C** flat 1.44 cents; **D** 1.95 cents years 1–10, 1.65 cents years 11–30.`,
          steps: [
            {
              md: md`**Tariff paths (US cents/kWh):**

| Year | 1 | 10 | 11 | 20 | 30 | Undiscounted average |
|---|---|---|---|---|---|---|
| A | 1.800 | 1.800 | 1.800 | 1.800 | 1.800 | 1.800 |
| B | 1.620 | 1.852 | 1.880 | 2.150 | 2.495 | 2.027 |
| C | 1.440 | 1.440 | 1.440 | 1.440 | 1.440 | 1.440 |
| D | 1.950 | 1.950 | 1.650 | 1.650 | 1.650 | 1.750 |`,
            },
            { md: md`**Discounted energy at 7 %:** $\sum_{t=1}^{30} 3{,}003\times 0.996^{t-1}/1.07^t = 35{,}854$ GWh.` },
            {
              md: md`**Levelized tariff and PV of payments at 7 %:**

| Bid | LT (cents/kWh) | PV payments (USD m) | Rank | vs median LT |
|---|---|---|---|---|
| C | 1.4400 | 516.3 | 1 | −20.5 % |
| A | 1.8000 | 645.4 | 2 | −0.7 % |
| D | 1.8237 | 653.9 | 3 | +0.7 % |
| B | 1.8791 | 673.7 | 4 | +3.7 % |

PV payments = LT × discounted energy, e.g. A: $1.80/100\times 35{,}854\text{ GWh} = 645.4$ USD m.`,
            },
            { md: md`**B looks cheapest in year 1 (1.62) but is the most expensive** on a levelized basis: by year 30 it is 2.495 cents. Comparing year-1 tariffs would have ranked B second.` },
            {
              md: md`**Ranking vs evaluation rate:**

| Rate | A | B | C | D | Order |
|---|---|---|---|---|---|
| 4 % | 1.800 | 1.933 | 1.440 | 1.795 | C, D, A, B |
| 7 % | 1.800 | 1.879 | 1.440 | 1.824 | C, A, D, B |
| 10 % | 1.800 | 1.835 | 1.440 | 1.849 | C, A, B, D |

A and D swap between 4 % and 7 %; B and D swap between 7 % and 10 %.`,
            },
          ],
          result: md`At 7 %: C (1.440) < A (1.800) < D (1.824) < B (1.879). Bid C is 20.5 % below the median levelized tariff and 20 % below A — it triggers the abnormally-low-bid procedure before any recommendation.`,
        },
        {
          kind: "download",
          file: "/downloads/tariff-bid-evaluation.xlsx",
          title: "Tariff bid evaluation model (Excel)",
          description: "Bid structures (flat/indexed/stepped) → annual tariffs → levelized tariff, PV of payments, ranking at three discount rates, combined score and aggressive-bid flag.",
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Levelize the front-loaded bid by hand",
          given: md`Bid D: 1.95 cents for years 1–10, 1.65 cents for years 11–30. Discounted energy at 7 %: years 1–10 = 20,762 GWh; years 1–30 = 35,854 GWh.`,
          steps: [
            { md: md`Weight of years 1–10: $w = 20{,}762/35{,}854$.` },
            { md: md`$w$ = **0.579**.`, hidden: true, check: { prompt: "Weight of years 1–10", answer: 0.579, tolerance: { abs: 0.002 } } },
            { md: md`$LT_D = 1.95\,w + 1.65\,(1-w) = 1.65 + 0.30\,w$.` },
            { md: md`$LT_D = 1.65 + 0.30\times 0.579$ = **1.824 cents/kWh**.`, hidden: true, check: { prompt: "Levelized tariff of bid D (US cents/kWh)", answer: 1.824, unit: "US cents/kWh", tolerance: { abs: 0.002 } } },
          ],
          result: md`LT_D = 1.824 cents at 7 %. More than half the discounted energy (58 %) arrives in the first 10 years — which is why front-loading matters so much.`,
        },
        { kind: "widget", widget: "tariff-eval", caption: "Enter tariffs, escalation and technical scores; change the weighting and discount rate and watch the ranking." },
        {
          kind: "md",
          md: md`### Testing Bid C with a should-cost model

Use the project-finance model (Lesson 4) with base-case costs at 1.44 cents: debt falls to USD 349.6 m (62 % gearing — the DSCR now binds), project IRR **3.82 %** and equity IRR **1.70 %**. Note the *negative leverage*: the project earns less than the 5.5 % debt costs, so equity IRR is **below** project IRR. No sponsor bids for 1.7 %. So the bidder must be assuming something different. A tornado of Bid C's equity IRR on the bidder's likely assumptions:

| Bidder assumption (vs base) | Equity IRR at 1.44 cents |
|---|---|
| Base-case costs and financing | 1.70 % |
| Opex −20 % | 2.68 % |
| Capex −10 % (USD 504 m) | 3.57 % |
| Specific yield +10 % (2,310 kWh/kWp) | 3.93 % |
| **All of: capex −10 %, yield +10 %, opex −20 %, debt 5.0 %, 28-year tenor, 1.20x DSCR** | **11.03 %** |

Each assumption alone is defensible; **all together** produce an attractive return. That is the signature of an aggressive bid: the stack of optimism. If only the yield claim is wrong (actual 2,100 kWh/kWp) with everything else as the bidder assumed, equity IRR falls to ~6.3 % — and the bidder will look for help from the offtaker. To hit 9 % with base yield and financing, capex would need to be about USD 424 m (−24 %).`,
        },
        {
          kind: "question",
          question: {
            id: "m10-l05-p1",
            type: "numeric",
            prompt: md`Bid B is indexed at 1.5 %/yr. What year-1 tariff would bidder B need to offer to match Bid A's levelized 1.80 cents at the 7 % evaluation rate? (Its current 1.62 gives LT 1.8791.) Answer in US cents/kWh, 3 decimals.`,
            answer: 1.552,
            tolerance: { abs: 0.002 },
            unit: "US cents/kWh",
            explanation: md`LT is proportional to the year-1 tariff for a fixed indexation path: $T_1 = 1.62\times 1.80/1.8791 = 1.552$ cents. B would have to start 13.8 % below A's flat tariff to be equal in present value.`,
            concepts: ["m10.levelized-tariff"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running a defensible evaluation in Kuwait",
      blocks: [
        {
          kind: "md",
          md: md`### Who does what

In a KAPP-procured IPP, KAPP and its transaction advisor run the evaluation under PPP Law 116/2014 with technical bids opened before financial bids; MEWRE provides technical evaluators, grid and dispatch input and the offtaker's view of the PPA; the Higher Committee approves the preferred bidder and the State Audit Bureau reviews before signing. For MEWRE's own conventional tenders (e.g. a 400 kV line) CAPT rules apply. The evaluation criteria — including the levelization method, discount rate, energy profile, technical pass/fail or weighting, and the treatment of abnormally low bids — must all be in the RFP.

### Abnormally-low-bid procedure (good practice)

1. Flag automatically (e.g. > 15 % below the median levelized tariff or below the should-cost model's P10).
2. Written clarification: capex breakdown, EPC and module supply commitments, financing term sheets (DSCR, gearing, tenor, margin, hedging), yield report and soiling assumption, O&M scope and cost, equity IRR and any refinancing or residual-value assumptions.
3. Independent check by the transaction advisor against the should-cost model.
4. Decision recorded with reasons: accept (with possibly increased performance security, if the RFP allows), or reject as non-responsive if the RFP provides for it.
5. Never negotiate the price up after the fact.`,
        },
        {
          kind: "callout",
          tone: "kuwait",
          title: "Kuwait context",
          md: md`Shagaya Phase III Zone 1 (1,100 MW) received three bids in January 2026 from consortia led by ACWA Power, Masdar and EDF Renewables, each with a Kuwaiti partner; financial bids were to be opened by mid-July 2026, and Masdar + Fouad AlGhanim & Sons was reported selected around August 2026 (MEED). **No tariffs for any bidder have been published** — the bids in this lesson are invented for teaching. Zone 2 (500 MW) bids were reported on 26 July 2026 (bidder count conflicts between sources).`,
        },
        { kind: "sources", refs: ["m10-pvmag-zone1-2025", "m10-meed-zone1-selection", "m10-kapp-ppp-law", "m10-wb-ppp", "m10-iea-projected-costs-2020"] },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Evaluation traps",
          md: md`- Ranking on year-1 tariff (rewards back-loading).
- Choosing or changing the discount rate after seeing the bids.
- Letting each bidder use its own energy forecast in the levelization (rewards optimistic yield).
- Treating indexation tied to an uncertain index as fixed without stating the assumed path.
- Ignoring non-price differences that cost MEWRE money: curtailment terms, deemed-energy definitions, guaranteed availability, COD date, grid-connection assumptions.
- Dismissing a low bid without evidence — or accepting it without testing it.`,
        },
        {
          kind: "checklist",
          title: "PM checklist for a tariff evaluation",
          items: [
            "RFP defines levelization formula, discount rate (and basis), energy profile, term and index assumptions",
            "All bids converted to annual tariff paths and checked against the bid forms by two people",
            "Levelized tariff, PV of payments and ranking computed; sensitivity of ranking to ±3 points of discount rate shown",
            "Deviations from the RFP (PPA mark-ups, conditions) identified and either priced or rejected per RFP rules",
            "Should-cost model run; abnormally low bids flagged and clarified in writing",
            "Evaluation report records every judgement with reasons — written for the Audit Bureau as reader",
          ],
        },
        {
          kind: "ask",
          title: "Clarification questions for an abnormally low bidder",
          items: [
            "Please provide your capex breakdown and the EPC and module supply prices you have committed (with validity dates).",
            "Provide your lenders' term sheets: sizing DSCR (P50/P90), gearing, tenor, margin, hedging and conditions.",
            "What specific yield, soiling loss and degradation underpin your energy forecast, and who prepared the yield report?",
            "Does your equity return rely on refinancing, residual value after the PPA, or tax/customs exemptions? Quantify each.",
            "Confirm that your tariff requires no change to the RFP's PPA terms, including curtailment and change-in-law provisions.",
          ],
        },
        { kind: "scenario", scenario: "m10-s4" },
        {
          kind: "feynman",
          prompt: "Explain to the evaluation committee why the cheapest bid on paper might cost Kuwait more, and what evidence would make you comfortable recommending it.",
          keyPoints: [
            "Levelized tariff compares bids fairly; a bid far below the others needs explanation",
            "Thin equity means shortfalls appear as failure to close, delay, quality cuts or claims",
            "Those outcomes cost MEWRE capacity, time and money, potentially more than the tariff saving",
            "Evidence: should-cost model, committed EPC/supply prices, lenders' term sheets, credible yield report",
            "Decision follows RFP rules for abnormally low bids; no post-bid price negotiation",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m10-l05-q1",
      type: "mcq",
      prompt: "Bid X is 1.70 cents flat; Bid Y starts at 1.55 cents with 2 %/yr indexation over 30 years. Which statement is correct?",
      options: [
        "Y is cheaper because its first-year tariff is lower",
        "The comparison requires levelizing both at the published evaluation rate with the same energy profile",
        "X is always cheaper because indexed tariffs are always more expensive",
        "They are equal because the average of Y's tariffs is close to 1.70",
      ],
      answer: 1,
      explanation: md`Indexed vs flat can go either way depending on the discount rate and indexation; only a levelized comparison on a common basis is valid. (With these numbers Y's undiscounted average is about 2.10 cents.)`,
      concepts: ["m10.levelized-tariff"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m10-l05-q2",
      type: "numeric",
      prompt: md`Discounted energy over the PPA at the evaluation rate is 35,854 GWh. A bid's levelized tariff is 1.80 US cents/kWh. What is the present value of payments? (USD m, 1 decimal)`,
      answer: 645.4,
      tolerance: { abs: 0.3 },
      unit: "USD m",
      explanation: md`$0.0180\text{ USD/kWh}\times 35{,}854\times 10^{6}\text{ kWh} = 645.4$ USD m. This is the figure the Ministry of Finance sees as the PV of the long-term commitment.`,
      concepts: ["m10.levelized-tariff"],
      difficulty: 1,
    },
    {
      id: "m10-l05-q3",
      type: "multi",
      prompt: "Which practices protect the integrity of a levelized-tariff evaluation? (Select all that apply.)",
      options: [
        "Publishing the evaluation discount rate and energy profile in the RFP",
        "Letting each bidder levelize using its own P50 energy forecast",
        "Choosing the discount rate after technical bids are opened",
        "Stating the assumed path for any index-linked tariff component",
        "Showing the sensitivity of the ranking to the discount rate",
      ],
      answer: [0, 3, 4],
      explanation: md`Own-P50 weighting rewards optimistic yield; any rate chosen after bids are known can select the winner. Publishing parameters, stating index assumptions and showing sensitivity are good practice.`,
      concepts: ["m10.evaluation-discount-rate"],
      difficulty: 2,
    },
    {
      id: "m10-l05-q4",
      type: "mcq",
      prompt: "As the evaluation discount rate rises, how does the levelized tariff of a front-loaded bid (high early tariff, lower later) change?",
      options: ["It falls", "It rises", "It is unchanged", "It depends only on degradation"],
      answer: 1,
      explanation: md`Higher rates put more weight on early years, where the front-loaded bid is expensive: Bid D goes from 1.795 (4 %) to 1.824 (7 %) to 1.849 (10 %).`,
      concepts: ["m10.evaluation-discount-rate"],
      difficulty: 1,
    },
    {
      id: "m10-l05-q5",
      type: "short",
      prompt: "List four ways an abnormally low winning tariff can end up costing the offtaker money or capacity.",
      rubric: [
        "Failure to reach financial close / award lapses and capacity is delayed",
        "Delay and renegotiation requests after award",
        "Quality or O&M cuts leading to underperformance",
        "Claims (change in law, curtailment, force majeure) in operation",
        "SPV distress, lenders' step-in or termination with compensation",
      ],
      modelAnswer: "(1) The bidder cannot raise debt and the award lapses, leaving MEWRE without summer capacity and repeating a 12–18-month procurement; (2) it seeks PPA amendments or price increases after award, delaying close; (3) it saves money on modules, trackers or O&M and the plant underperforms; (4) in operation it pursues aggressive claims under change-in-law or curtailment clauses or falls into distress, leading to lenders' step-in or termination payments.",
      explanation: md`In the illustrative case Bid C earns only 1.7 % equity IRR on base-case costs; it works only if every optimistic assumption holds at once. Any miss is pushed back towards the offtaker.`,
      concepts: ["m10.aggressive-bid"],
      difficulty: 2,
    },
    {
      id: "m10-l05-q6",
      type: "decision",
      prompt: md`Your should-cost model shows the lowest bid needs capex 24 % below recent regional awards to earn a 9 % equity IRR. The RFP includes an abnormally-low-bid clarification clause. You are MEWRE's lead technical evaluator. What do you recommend to KAPP?`,
      options: [
        { text: "Disqualify the bid immediately as unrealistic.", score: 0.2, feedback: "Without clarification and RFP grounds, disqualification invites challenge — and the bidder may have a real cost advantage." },
        { text: "Trigger the clarification procedure: request committed EPC/supply prices, lenders' term sheets and yield report; have the transaction advisor test them; decide per the RFP rules and record the reasons.", score: 1, feedback: "Correct: evidence-based, procedurally sound, defensible to the Audit Bureau." },
        { text: "Accept it — the lowest levelized tariff wins under the RFP.", score: 0.3, feedback: "May be the eventual outcome, but skipping the clarification the RFP provides ignores a known risk to the offtaker." },
        { text: "Ask the bidder to raise its tariff to a realistic level.", score: 0, feedback: "Post-bid price negotiation breaks the competition." },
      ],
      explanation: md`Use the procedure the RFP provides; test with evidence; decide with recorded reasons. Increasing the performance security, if the RFP permits, is a possible mitigation.`,
      concepts: ["m10.aggressive-bid", "m10.tornado-scenario"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m10-l05-f1", front: "Levelized tariff (definition)", back: "The flat tariff with the same PV of payments as the bid for the same energy profile at the evaluation rate.", concepts: ["m10.levelized-tariff"] },
    { id: "m10-l05-f2", front: "LT of a flat bid", back: "Equal to its tariff, at any discount rate.", concepts: ["m10.levelized-tariff"] },
    { id: "m10-l05-f3", front: "Effect of a higher evaluation rate on rankings", back: "Favours back-loaded (indexed) bids, penalises front-loaded bids.", concepts: ["m10.evaluation-discount-rate"] },
    { id: "m10-l05-f4", front: "Whose discount rate for bid evaluation?", back: "The offtaker's/state's cost of funds or appraisal rate — published in the RFP, same real/nominal basis as the tariffs.", concepts: ["m10.evaluation-discount-rate"] },
    { id: "m10-l05-f5", front: "Tornado vs scenario", back: "Tornado: one input at a time, ranked swings. Scenario: coherent combination of inputs (a 'world').", concepts: ["m10.tornado-scenario"] },
    { id: "m10-l05-f6", front: "Signature of an aggressive bid", back: "A stack of individually plausible optimistic assumptions (capex, yield, opex, financing) that only works if all hold.", concepts: ["m10.aggressive-bid"] },
    { id: "m10-l05-f7", front: "Negative leverage", back: "When project IRR < cost of debt, more debt lowers equity IRR (Bid C: 3.82 % project vs 1.70 % equity).", concepts: ["m10.aggressive-bid", "m10.equity-irr"] },
    { id: "m10-l05-f8", front: "Illustrative 4-bid ranking at 7 %", back: "C 1.440 < A 1.800 < D 1.824 < B 1.879 cents/kWh.", concepts: ["m10.levelized-tariff"] },
  ],
  scenarios: [
    {
      id: "m10-s4",
      title: "The bid 20 % below everyone else",
      dayInLife: true,
      context: md`Financial bids for a 1.1 GW PV IPP have been opened. Levelized at the RFP's 7 % rate: 1.80, 1.82 and 1.88 cents — and one consortium at **1.44 cents**, 20 % below the next. The consortium is new to Kuwait but has built 3 GW in the region. Press interest is high and a senior official has already called it "a historic low for Kuwait". KAPP asks MEWRE's technical team for its position within five working days.`,
      start: "a",
      concepts: ["m10.aggressive-bid", "m10.levelized-tariff", "m10.tornado-scenario"],
      nodes: {
        a: {
          md: md`What do you do first?`,
          choices: [
            { text: "Run the should-cost model at 1.44 cents and list which assumptions must hold for the bid to work.", score: 9, feedback: "Start from evidence: at base costs the bid yields ~1.7 % equity IRR; it needs capex −24 % or a stack of optimistic assumptions.", next: "b" },
            { text: "Celebrate with the official — a low tariff is good news.", score: 2, feedback: "Premature: the risk of a failed or troubled project falls on MEWRE.", next: "d" },
            { text: "Recommend disqualification as unrealistic.", score: 2, feedback: "No evidence yet, and no reference to the RFP's procedure.", next: "d" },
          ],
        },
        b: {
          md: md`The model shows the bid needs capex ≈ USD 424 m at base yield, or a combination of −10 % capex, +10 % yield, −20 % opex and very favourable debt terms. The RFP has an abnormally-low-bid clause allowing written clarification.`,
          choices: [
            { text: "Ask KAPP to issue clarification: committed EPC and module prices, lenders' term sheets, yield report and soiling basis, O&M scope, any refinancing or residual-value assumptions.", score: 10, feedback: "Exactly the evidence that separates a genuine cost advantage from optimism.", next: "c" },
            { text: "Ask the consortium informally by phone whether they are sure.", score: 3, feedback: "Informal contact during evaluation is a procurement-integrity risk and produces no evidence on the record." },
          ],
        },
        c: {
          md: md`The response arrives: firm EPC price from a tier-1 contractor at USD 0.30/Wp valid 9 months; lenders' term sheet at 1.20x P50 DSCR, 28-year tenor; yield 2,310 kWh/kWp from a reputable consultant using one year of on-site data plus satellite series. The transaction advisor finds the EPC price credible but the yield 8–10 % above its own estimate.`,
          choices: [
            { text: "Recommend accepting the bid as compliant (it is lowest under the RFP), while recording the yield risk, asking for the maximum performance security the RFP allows, and setting a tight financial-close long-stop date.", score: 9, feedback: "Balanced: the RFP decides the winner; the offtaker documents and mitigates the residual risk." },
            { text: "Recommend rejecting because the yield is optimistic.", score: 4, feedback: "Yield risk is the bidder's under a take-or-pay-for-delivered-energy PPA; rejection on this ground needs explicit RFP basis." },
            { text: "Ask the bidder to raise its tariff to 1.60 cents to be safe.", score: 0, feedback: "Post-bid price negotiation breaks the competition and is indefensible to the Audit Bureau." },
          ],
        },
        d: {
          md: md`Two weeks later KAPP asks why MEWRE's position paper contains no analysis. The official's statement is in the press.`,
          choices: [
            { text: "Produce the should-cost analysis and clarification list now, and brief the official privately on the risks before the Higher Committee meets.", score: 6, feedback: "Recovers the process; earlier analysis would have avoided public expectations." },
          ],
        },
      },
    },
  ],
};

export default lesson;
