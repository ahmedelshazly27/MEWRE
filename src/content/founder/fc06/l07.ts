import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc06-l07",
  title: "Budgeting and scenario planning: base, bear, bull, tornado and cash triggers",
  summary:
    "Turn the model into a budget you manage against: coherent base, bear and bull scenarios, a tornado of one-at-a-time sensitivities, pre-agreed cash triggers, and monthly variance analysis that separates timing from real misses. Worked through an illustrative post-seed Afterwave plan.",
  minutes: 70,
  objectives: [
    "Build base, bear and bull scenarios that change drivers coherently, not outputs",
    "Run a one-at-a-time sensitivity and read a tornado chart to find the levers that matter",
    "Define cash triggers: pre-agreed actions tied to observable thresholds",
    "Run a budget vs actual review that separates volume, price and timing variances",
    "Explain why you plan spending on the bear case, not the expected value",
  ],
  concepts: [
    { id: "fc06.scenarios", name: "Scenario planning (base, bear, bull)", description: "Internally consistent sets of driver assumptions, each run through the full model, used to plan spending and fundraising timing.", competency: "fc-finance", related: ["m10.tornado-scenario"] },
    { id: "fc06.tornado", name: "Sensitivity and tornado analysis", description: "Vary one driver at a time between low and high values and rank the output swings to find what matters.", competency: "fc-finance", related: ["m10.tornado-scenario", "fc06.scenarios"] },
    { id: "fc06.cash-triggers", name: "Cash triggers", description: "Pre-agreed actions (freeze hiring, start a raise, cut to a default-alive plan) tied to observable thresholds in cash, runway or revenue.", competency: "fc-finance", related: ["fc06.runway"] },
    { id: "fc06.variance-analysis", name: "Budget vs actual variance analysis", description: "Monthly comparison of actuals with budget, split into volume, price and timing causes, with a forecast update.", competency: "fc-finance" },
  ],
  sections: [
    {
      layer: "theory",
      title: "From one forecast to a range you can manage",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Every plan you make for Afterwave, Mizan or Suhail will be wrong; the question is whether you find out in time to act. Enterprise sales cycles, tender timing in Kuwait and sponsor commitments are all lumpy. A scenario set with pre-agreed triggers lets you and your cofounders decide calmly in advance what you will do when a pilot slips, instead of arguing about it when cash is short.`,
        },
        {
          kind: "md",
          md: md`### Scenarios are coherent stories, not +/- 20 %

A scenario changes the **drivers** that move together. A bear case for an enterprise startup is not "revenue -20 %": it is "first contracts start three months later, each new month adds half as much MRR, and hiring continues as planned because offers are out". Build three:

| Scenario | Purpose | How to build it |
|---|---|---|
| **Base** | The plan you manage against | Drivers at your honest median |
| **Bear** | The plan you must survive | Slower conversion and later start, costs as committed |
| **Bull** | What you do if it works | Faster conversion; triggers to accelerate hiring |

You survive the scenario that happens, not the average one. The probability-weighted value is useful to compare decisions, not to set spending:`,
        },
        { kind: "equation", formula: "fc06-expected-value" },
        {
          kind: "md",
          md: md`### Sensitivity: one driver at a time

A **tornado** varies each driver between a low and a high value while holding the others at base, then ranks the swings in the output. It answers: which assumptions deserve your attention and evidence-gathering? It does not capture combined effects (that is what scenarios and Monte Carlo do).

### Cash triggers

A trigger is an **observable threshold** plus a **pre-agreed action** and an **owner**. Examples:

- If MRR at month 9 is below EUR 40k: freeze unfilled hires.
- If runway falls below 12 months: start the raise.
- If runway falls below 9 months and there is no term sheet: switch to the default-alive cost plan.
- If MRR at month 9 is above EUR 80k: pull forward the next two hires.

### Budget vs actual`,
        },
        { kind: "equation", formula: "fc06-variance" },
        {
          kind: "md",
          md: md`Split each material variance by cause:
- **Volume:** fewer or more units, deals, attendees.
- **Price or rate:** a different price, discount, salary or unit cost.
- **Timing:** the same thing, earlier or later (a hire starting in May instead of March). Timing variances reverse; the others usually do not.

A favourable cost variance caused by a delayed hire is not good news if the hire was needed to deliver revenue.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Scenarios, tornado and triggers for a post-seed plan",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Afterwave post-seed scenario set (illustrative numbers only)",
          given: md`Illustrative model, not a forecast. Cash **EUR 3,000k**. Costs **EUR 150k** in month 1, rising **EUR 5k/month** with hiring until month 18 (EUR 235k), flat after. MRR starts at **EUR 10k**; gross margin **75 %**.
- **Base:** +EUR 8k new MRR per month from month 4.
- **Bear:** +EUR 4k per month from month 7.
- **Bull:** +EUR 12k per month from month 3.`,
          steps: [
            {
              md: md`**Monthly model** (cash$_t$ = cash$_{t-1}$ - cost$_t$ + 0.75 x MRR$_t$). Results:

| | Base | Bear | Bull |
|---|---|---|---|
| MRR at month 18 (EUR k) | 130 | 58 | 202 |
| Net burn at month 18 (EUR k/month) | 137.5 | 191.5 | 83.5 |
| Cash at month 12 (EUR k) | 1,230 | 1,023 | 1,455 |
| Cash at month 18 (EUR k) | 390 | -96 | 894 |
| Runway (months) | 21.1 | 17.5 | never runs out |
| ARR at month 24 (EUR k) | 2,136 | 984 | 3,288 |`,
            },
            { md: md`**Reading it:** the base case needs a new round closed by about month 18 (3 months of buffer). The bear case runs out at month 17.5, so a raise must start by month 9 to 11 at the latest. The bull case bottoms at EUR 548k in month 27 and reaches cash breakeven in month 28: default alive.` },
            {
              md: md`**Tornado on cash at month 18** (base EUR 390k):

| Driver (low / high) | Cash m18 low | Cash m18 high | Swing |
|---|---|---|---|
| Hiring pace (+7.5k / +2.5k per month) | 8 | 773 | **765** |
| New MRR per month (4k / 12k) | 30 | 750 | **720** |
| Revenue start month (month 7 / month 1) | 138 | 696 | 558 |
| Starting cost base (165k / 135k) | 120 | 660 | 540 |
| Gross margin (60 % / 85 %) | 219 | 504 | 285 |`,
            },
            { md: md`**Insight:** hiring pace is the largest lever and it is the one you fully control; new MRR per month is almost as large and is what the pilots must evidence. Gross margin matters least at this stage. Spend your evidence-gathering on conversion and your discipline on hiring.` },
            { md: md`**Triggers.** At month 9 the base case has MRR EUR 58k, the bear case EUR 22k. Trigger: **if MRR at month 9 is below EUR 40k, freeze hiring.** In the bear case this holds costs at EUR 190k from month 9: runway rises from 17.5 to **18.9 months** and cash at month 18 from EUR -96k to **+129k**. Helpful, not sufficient: the same trigger must also start the raise immediately.` },
            { md: md`**Expected value** with probabilities 0.3 bear, 0.5 base, 0.2 bull: $0.3\times(-96) + 0.5\times 390 + 0.2\times 894 = 345$ EUR k at month 18. Positive on average, yet the bear case is a dead company. Plan on the bear case.` },
          ],
          result: md`Base runway 21 months, bear 17.5, bull default alive. Hiring pace and new MRR per month dominate. Triggers at month 9 (freeze hiring, start raising) keep the bear case survivable.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "Cash by scenario (illustrative)",
          xKey: "month",
          xLabel: "Month",
          yLabel: "Cash (EUR k)",
          series: [
            { key: "bear", label: "Bear" },
            { key: "base", label: "Base" },
            { key: "bull", label: "Bull" },
          ],
          data: [
            { month: 0, bear: 3000, base: 3000, bull: 3000 },
            { month: 3, bear: 2558, base: 2558, bull: 2567 },
            { month: 6, bear: 2070, base: 2106, bull: 2160 },
            { month: 9, bear: 1556, base: 1664, bull: 1790 },
            { month: 12, bear: 1023, base: 1230, bull: 1455 },
            { month: 15, bear: 473, base: 806, bull: 1157 },
            { month: 18, bear: -96, base: 390, bull: 894 },
            { month: 21, bear: -652, base: 14, bull: 698 },
            { month: 24, bear: -1182, base: -309, bull: 582 },
            { month: 27, bear: -1684, base: -577, bull: 548 },
            { month: 30, bear: -2160, base: -792, bull: 594 },
          ],
          caption: "The scenarios are indistinguishable for six months and only separate after month 9: that is why triggers are set at month 9, before the difference shows up in the bank balance.",
        },
        {
          kind: "chart",
          chart: "bar",
          title: "Tornado: cash at month 18 for low and high values of each driver (base EUR 390k)",
          xKey: "driver",
          xLabel: "Driver",
          yLabel: "Cash at month 18 (EUR k)",
          series: [
            { key: "low", label: "Low case" },
            { key: "high", label: "High case" },
          ],
          data: [
            { driver: "Hiring pace", low: 8, high: 773 },
            { driver: "New MRR/month", low: 30, high: 750 },
            { driver: "Revenue start", low: 138, high: 696 },
            { driver: "Cost base", low: 120, high: 660 },
            { driver: "Gross margin", low: 219, high: 504 },
          ],
          caption: "Ranked by swing. The two biggest levers are the hiring pace you control and the conversion rate the pilots must prove.",
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Quarterly budget review (illustrative)",
          given: md`Illustrative quarter. Budget: revenue **EUR 120k**, salaries **EUR 450k**, cloud and tools **EUR 30k**. Actual: revenue **EUR 95k** (one pilot slipped to next quarter), salaries **EUR 410k** (a hire started two months late), cloud **EUR 38k** (a customer's on-prem test environment was mirrored in the cloud).`,
          steps: [
            { md: md`Revenue variance $= 95 - 120 = -25$ EUR k: unfavourable.` },
            { md: md`Revenue variance in % $= -25/120 =$ **-20.8 %**.`, hidden: true, check: { prompt: "Revenue variance (%)", answer: -20.8, unit: "%", tolerance: { abs: 0.1 } } },
            { md: md`Net burn budget $= 450 + 30 - 120 = 360$; actual $= 410 + 38 - 95 =$ **353** EUR k.`, hidden: true, check: { prompt: "Actual net burn (EUR k)", answer: 353, unit: "EUR k", tolerance: { abs: 0.5 } } },
            { md: md`**Interpretation:** net burn is EUR 7k better than budget, but only because a delayed hire (timing, reverses) hid a revenue miss (timing if the pilot really lands next quarter, structural if it does not) and a cloud overrun (rate, likely to persist). Update the forecast: move the pilot, add the cloud cost, keep the hire.` },
          ],
          result: md`A favourable headline (net burn 353 vs 360) hides two unfavourable variances. Report the causes, not just the total.`,
        },
        {
          kind: "question",
          question: {
            id: "fc06-l07-p1",
            type: "numeric",
            prompt: md`Runway in three scenarios: bear 14 months (probability 0.25), base 20 months (0.55), bull 30 months (0.20). What is the probability-weighted runway? (months)`,
            answer: 20.5,
            tolerance: { abs: 0.05 },
            unit: "months",
            explanation: md`$0.25\times 14 + 0.55\times 20 + 0.20\times 30 = 3.5 + 11 + 6 = 20.5$ months. Useful as a summary, but fundraising must start early enough for the 14-month case.`,
            concepts: ["fc06.scenarios"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running the budget",
      blocks: [
        {
          kind: "md",
          md: md`### The annual and monthly rhythm

- **Annual budget** (board-approved, before the year starts): headcount plan by month, opex by category, revenue and ARR targets, capex, cash at year end in base and bear.
- **Monthly:** actuals closed by day 10; variance review with each budget owner; reforecast the rest of the year (the budget stays fixed as the yardstick, the forecast moves).
- **Quarterly:** re-run scenarios with new evidence; check triggers; update the board.
- **Owners:** each cost line has a named owner (engineering lead for cloud, CEO for travel and events). In a three-founder company that is a short list, which is the point.

### Practical choices

- **Zero-based for discretionary spend** (events, tools, contractors): justify each line from zero every year. Incremental budgeting quietly preserves last year's waste.
- **Budget headcount by person and start date,** not by department totals.
- **Keep a contingency line** (for example 5 to 10 % of opex) owned by the CEO, released only by decision.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Scenarios that only scale outputs.** "Bear = revenue -20 %" with the same timing and hiring tells you nothing about survival.
- **No pre-agreed triggers.** Cuts get debated for months while cash falls.
- **Celebrating favourable cost variances** caused by late hires or delayed spending that the plan depends on.
- **Changing the budget instead of the forecast.** Then you can never tell what changed.
- **Plans built on the bull case** because it was in the pitch deck.`,
        },
        { kind: "xref", to: "m10.tornado-scenario", note: "Tornado and scenario mechanics, including combined scenarios, are developed for tariff bid evaluation in Track 0, Module 10." },
        { kind: "xref", to: "m08.monte-carlo", note: "When drivers are uncertain together, Monte Carlo simulation (Track 0, Module 8) gives a distribution rather than three points." },
        {
          kind: "checklist",
          title: "Scenario and budget pack checklist",
          items: [
            "Base, bear and bull each defined by driver values, with a one-line story",
            "Runway, minimum cash and cash at the next financing milestone for each scenario",
            "Tornado on the output that matters (cash at the raise date or runway)",
            "Three to five triggers, each with threshold, action, owner and the date it is checked",
            "Monthly variance table split into volume, price and timing",
            "Reforecast for the rest of the year, with the original budget kept unchanged",
          ],
        },
        {
          kind: "ask",
          title: "Questions to agree with your cofounders before the year starts",
          items: [
            "Which scenario do we plan spending against, and why?",
            "What exact numbers at what date trigger a hiring freeze, a raise, or a cut?",
            "Who has authority to pull each trigger without another meeting?",
            "Which costs are committed and which can stop within 30 days?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc06-l07-p2",
            type: "short",
            prompt: md`Write the **scenario and trigger page** for Afterwave's (or Mizan's) next board meeting, with illustrative numbers clearly labelled. Define base, bear and bull by their drivers; give runway and cash at the planned raise date for each; show a tornado of at least four drivers ranked by swing; and set three to five cash triggers, each with threshold, action, owner and check date.`,
            rubric: [
              "Scenarios differ in coherent driver sets (timing, conversion, hiring), not just scaled outputs",
              "Runway and cash at the raise date are given for each scenario and are internally consistent",
              "Tornado lists at least four drivers with low and high values and is ranked by swing; the interpretation names the controllable levers",
              "Triggers are observable, dated and paired with a specific action and owner",
              "Plans spending against the bear case or explains why not",
              "All numbers labelled illustrative; no invented traction",
            ],
            modelAnswer: md`**Mizan scenario page (illustrative).** **Drivers:** pilot award date, contract value per plant, number of plants under contract, hiring. **Base:** Shagaya-type pilot (illustrative) awarded in month 4, converts to a contract worth KWD 30k/yr in month 10; second plant month 15; costs KWD 25k/month rising to 32k with an analyst hire in month 6. Runway **16 months**; cash at planned raise date (month 12) **KWD 95k**. **Bear:** award slips to month 8, conversion month 16, no second plant in horizon, hire as planned: runway **13 months**; cash at month 12 **KWD 40k**. **Bull:** award month 3, two plants by month 12, hire pulled to month 4: runway **20 months**; cash at month 12 **KWD 150k**. **Tornado on cash at month 12 (base 95):** award date (month 8 / month 2): 55 to 120, swing 65; hiring month (month 3 / never): 70 to 125, swing 55; contract value (KWD 20k / 40k): 85 to 105, swing 20; distribution margin (20 % / 35 %): 90 to 100, swing 10. Controllable lever: hiring timing; the award date is the risk. **Triggers:** (1) No pilot award by end of month 5: delay the analyst hire (CEO, checked monthly). (2) Runway below 12 months: start the seed process (CEO and Omar). (3) Runway below 8 months without a term sheet: switch to the minimum plan of KWD 18k/month (CEO). (4) Two plants contracted by month 9: pull forward a second hire (CEO). **Planning basis:** we commit spending only to what the bear case can carry to month 13.`,
            explanation: md`Graded against the rubric. The page is useful only if the triggers are specific enough to act on without another debate.`,
            concepts: ["fc06.scenarios", "fc06.tornado", "fc06.cash-triggers"],
            difficulty: 3,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "fc06-l07-q1",
      type: "mcq",
      prompt: "What distinguishes a good bear scenario from a simple sensitivity?",
      options: [
        "It uses a lower discount rate",
        "It changes several related drivers coherently (later start, slower conversion, costs as committed) and runs them through the full model",
        "It reduces every output by 20 %",
        "It is only shown to investors",
      ],
      answer: 1,
      explanation: md`A sensitivity moves one driver; a scenario is a consistent story about several. Scaling outputs skips the timing effects that decide survival.`,
      concepts: ["fc06.scenarios"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc06-l07-q2",
      type: "numeric",
      prompt: md`Budgeted marketing spend EUR 40k, actual EUR 46k. Variance in %? (positive means overspend)`,
      answer: 15,
      tolerance: { abs: 0.1 },
      unit: "%",
      explanation: md`$(46 - 40)/40 = 15\,\%$ unfavourable. Next step: was it volume (more events), rate (higher prices) or timing (spend pulled forward)?`,
      concepts: ["fc06.variance-analysis"],
      difficulty: 1,
    },
    {
      id: "fc06-l07-q3",
      type: "mcq",
      prompt: "In the illustrative tornado, why is hiring pace the most useful finding even though new MRR per month has a similar swing?",
      options: [
        "Because hiring pace is fully under management control, so it can be used as a lever immediately",
        "Because MRR does not affect cash",
        "Because hiring has no effect on revenue",
        "Because tornado charts should always be sorted alphabetically",
      ],
      answer: 0,
      explanation: md`A tornado ranks swings; the decision value comes from which large drivers you control (hiring) and which you must de-risk with evidence (conversion).`,
      concepts: ["fc06.tornado"],
      difficulty: 2,
    },
    {
      id: "fc06-l07-q4",
      type: "multi",
      prompt: "Which are well-formed cash triggers? (Select all.)",
      options: [
        "If MRR at the end of month 9 is below EUR 40k, the CEO freezes all unfilled hires",
        "If things look bad, we will consider cuts",
        "If runway falls below 12 months, the CEO starts the raise process that month",
        "If runway falls below 9 months with no term sheet, switch to the pre-agreed EUR 90k/month plan",
        "We will monitor cash closely",
      ],
      answer: [0, 2, 3],
      explanation: md`A trigger needs an observable threshold, a date or frequency, a specific action and an owner. "Look bad" and "monitor closely" are not triggers.`,
      concepts: ["fc06.cash-triggers"],
      difficulty: 1,
    },
    {
      id: "fc06-l07-q5",
      type: "decision",
      prompt: md`Mid-year, actual net burn is 8 % below budget. Your engineering lead proposes declaring the savings and hiring an extra engineer. The variance comes from two hires starting three months late while revenue is 15 % below budget. What do you do?`,
      options: [
        { text: "Approve the extra hire: we are under budget.", score: 0, feedback: "The favourable variance is timing (it reverses when the hires start) and it masks a real revenue miss." },
        { text: "Decline for now, reforecast with the late hires as timing and the revenue miss as a volume variance, check the triggers, and revisit the hire if the revenue gap closes.", score: 1, feedback: "Correct: separate timing from structural variances and let the triggers decide." },
        { text: "Cut the two delayed hires permanently to bank the saving.", score: 0.4, feedback: "Possibly right if the bear trigger is hit, but decide through the triggers and capacity needs, not because of the variance." },
      ],
      explanation: md`Variance analysis is about causes. A late hire is not a saving.`,
      concepts: ["fc06.variance-analysis", "fc06.cash-triggers"],
      difficulty: 2,
    },
    {
      id: "fc06-l07-q6",
      type: "mcq",
      prompt: "Why plan spending against the bear case rather than the probability-weighted average?",
      options: [
        "Because the average is hard to compute",
        "Because the company survives only the scenario that actually happens; a positive average can include a scenario where cash runs out",
        "Because investors require it by law",
        "Because bull cases never happen",
      ],
      answer: 1,
      explanation: md`In the illustrative set, expected cash at month 18 is EUR +345k, yet the bear case is at EUR -96k. Survival is path-dependent.`,
      concepts: ["fc06.scenarios"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc06-l07-f1", front: "Scenario vs sensitivity", back: "Scenario: coherent change of several drivers through the full model. Sensitivity: one driver at a time.", concepts: ["fc06.scenarios", "fc06.tornado"] },
    { id: "fc06-l07-f2", front: "Tornado chart", back: "One-at-a-time low/high swings in an output, ranked largest first; shows which assumptions matter.", concepts: ["fc06.tornado"] },
    { id: "fc06-l07-f3", front: "Anatomy of a cash trigger", back: "Observable threshold + date + specific action + owner.", concepts: ["fc06.cash-triggers"] },
    { id: "fc06-l07-f4", front: "Three causes of a variance", back: "Volume, price or rate, timing. Timing reverses; the others usually persist.", concepts: ["fc06.variance-analysis"] },
    { id: "fc06-l07-f5", front: "Budget vs forecast", back: "The budget stays fixed as the yardstick; the forecast is updated monthly.", concepts: ["fc06.variance-analysis"] },
    { id: "fc06-l07-f6", front: "Illustrative post-seed scenario runways", back: "Bear 17.5 months, base 21.1, bull default alive; hiring freeze at month 9 adds 1.4 months to the bear case.", concepts: ["fc06.scenarios", "fc06.cash-triggers"] },
  ],
};

export default lesson;
