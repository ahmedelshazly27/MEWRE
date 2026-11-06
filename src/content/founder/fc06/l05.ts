import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc06-l05",
  title: "Financial modelling for a startup",
  summary:
    "How to build a driver-based startup model: inputs, a bottom-up revenue build from the funnel, a hiring plan that is the expense model, the three statements and a set of sanity checks, worked through an illustrative Afterwave 2027 plan.",
  minutes: 80,
  objectives: [
    "Lay out a driver-based model with separate inputs, calculations and outputs",
    "Build revenue bottom-up from funnel drivers with stage lags, and reverse it to required activity",
    "Build a hiring plan with loaded costs and start dates and link it to the expense lines",
    "Apply sanity checks that catch the standard startup-model fantasies",
    "Explain the difference between top-down and bottom-up forecasts and why investors trust the second",
  ],
  concepts: [
    { id: "fc06.driver-model", name: "Driver-based model", description: "A model where outputs are computed from a small set of operational drivers (funnel volumes, conversion rates, ACV, hires, unit costs) rather than typed-in totals.", competency: "fc-finance", related: ["m10.model-structure"] },
    { id: "fc06.bottom-up-revenue", name: "Bottom-up revenue build", description: "Revenue built from opportunities, conversion rates, deal sizes and stage lags, as opposed to a top-down share of the market.", competency: "fc-finance", related: ["fc06.driver-model"] },
    { id: "fc06.hiring-plan", name: "Hiring plan", description: "Roles, start dates, salaries and on-costs that drive most of the expense model and the burn.", competency: "fc-finance", related: ["fc06.driver-model"] },
    { id: "fc06.model-sanity", name: "Model sanity checks", description: "Capacity, productivity, efficiency and consistency checks that test whether model outputs are physically and commercially plausible.", competency: "fc-finance", related: ["m10.model-audit"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Structure of a startup model",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Your fundraising deck, your hiring decisions and your runway all come out of one spreadsheet. Investors at seed do not believe the numbers in it; they read it to see whether you understand your own business: which drivers matter, how they link, and whether you know what must be true for the plan to work. As the person who owns finance across Afterwave, Mizan and Suhail, you need one disciplined pattern you can reuse.`,
        },
        {
          kind: "md",
          md: md`### The architecture

A good model separates **inputs** (assumptions, each with a source or a label), **calculations** (no typed numbers, one timeline, monthly for 24 to 36 months then annual) and **outputs** (statements, metrics, charts). This is the same discipline as the project finance models in Track 0.`,
        },
        {
          kind: "flow",
          title: "Driver-based model, from assumptions to checks",
          steps: [
            { label: "Inputs", detail: "Funnel volumes, conversion rates, ACV, pricing, churn, salaries, on-cost, unit costs, payment terms" },
            { label: "Revenue build", detail: "Opportunities to pilots to contracts, with stage lags; recognised revenue and ARR" },
            { label: "Headcount plan", detail: "Roles, start dates, loaded cost; drives most opex" },
            { label: "Other costs", detail: "COGS as a function of revenue; non-people opex; capex" },
            { label: "Three statements", detail: "P&L, cash flow (with working capital), balance sheet" },
            { label: "Metrics and checks", detail: "Runway, burn multiple, ARR per FTE, capacity, balance check" },
          ],
          caption: "Change an input and everything downstream moves. If you type a number into the calculation area, you have broken the model.",
        },
        {
          kind: "md",
          md: md`### Top-down vs bottom-up

- **Top-down:** "the market is EUR 2 bn, we take 1 %". Useful for sizing the opportunity, useless for a plan: nothing in it is under your control.
- **Bottom-up:** "we generate N qualified opportunities per quarter, convert p to pilots and q to contracts at ACV, with these lags". Every term is something you can measure and act on.`,
        },
        { kind: "equation", formula: "fc06-bottom-up-bookings" },
        {
          kind: "md",
          md: md`Run it in reverse to find the activity the plan demands:

$$N_{SQL} = \frac{\text{target new ARR}}{p_{\text{pilot}}\cdot p_{\text{convert}}\cdot ACV}.$$

Then lag each stage by its duration: a pilot that starts in Q1 and lasts a quarter converts at the earliest in Q2, and an annual subscription recognises a quarter of its value per quarter.

### The hiring plan is the expense model

For a software startup people are typically 60 to 80 % of spending. Model each role with its start date and loaded cost:`,
        },
        { kind: "equation", formula: "fc06-loaded-cost" },
        {
          kind: "md",
          md: md`### Sanity checks

| Check | What it tests | Typical red flag |
|---|---|---|
| **Capacity** | Can the team deliver the pilots and deployments the revenue build implies? | 5 concurrent on-site pilots with one field engineer |
| **Sales capacity** | Ramped sellers x quota covers the bookings | Bookings double while no seller is hired |
| **Productivity** | ARR per FTE, revenue per seller | Seed-stage ARR per FTE above that of public SaaS companies |
| **Efficiency** | Magic number, burn multiple, CAC payback | Magic number above 1.5 with no history |
| **Consistency** | Churn, conversion and ACV match observed data | Pilot conversion 80 % with 1 data point |
| **Integrity** | Balance sheet balances, cash ties out, no typed numbers in calculations | Plug values in "other" |`,
        },
        { kind: "equation", formula: "fc06-magic-number" },
        { kind: "widget", widget: "pipeline-forecast", props: { acv: 100000 }, caption: "Set opportunities per stage, stage-to-close probabilities and cycle length; compare weighted pipeline and expected bookings per quarter with your model's revenue build." },
      ],
    },
    {
      layer: "applied",
      title: "An illustrative Afterwave 2027 plan",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Bottom-up revenue build and hiring plan (illustrative numbers only)",
          given: md`Illustrative assumptions, not Afterwave data or a forecast. Qualified opportunities (SQLs) per quarter in 2027: **6, 9, 12, 15**. SQL to paid pilot **30 %**; pilot price **EUR 25k**, one quarter long. Pilot to annual contract **50 %**, starting the quarter after the pilot. ACV **EUR 100k**, recognised ratably. On-cost factor **30 %**.`,
          steps: [
            {
              md: md`**Revenue build (EUR k; deal counts are expected values)**

| | Q1 | Q2 | Q3 | Q4 | 2027 |
|---|---|---|---|---|---|
| SQLs | 6 | 9 | 12 | 15 | 42 |
| Pilots started ($\times 0.3$) | 1.8 | 2.7 | 3.6 | 4.5 | 12.6 |
| Pilot revenue ($\times 25$) | 45 | 67.5 | 90 | 112.5 | **315** |
| New contracts ($\times 0.5$, lag 1 quarter) | 0 | 0.9 | 1.35 | 1.8 | 4.05 |
| New ARR ($\times 100$) | 0 | 90 | 135 | 180 | 405 |
| Closing ARR | 0 | 90 | 225 | 405 | **405** |
| Subscription revenue (ARR/4) | 0 | 22.5 | 56.25 | 101.25 | **180** |
| **Total revenue** | 45 | 90 | 146.25 | 213.75 | **495** |

The Q4 pilots convert in Q1 2028 (2.25 contracts, EUR 225k of new ARR): the model must run beyond the year to show them.`,
            },
            {
              md: md`**Hiring plan (EUR k; loaded cost = salary x 1.3 x months/12)**

| Role | Salary | Start | Months | 2027 loaded cost |
|---|---|---|---|---|
| Founders (3 x 70) | 210 | Jan | 12 | 273.0 |
| Platform engineer | 90 | Jan | 12 | 117.0 |
| Platform engineer | 90 | Jan | 12 | 117.0 |
| Solutions engineer | 85 | Apr | 9 | 82.9 |
| Field application engineer | 75 | Jul | 6 | 48.8 |
| ML and agents engineer | 95 | Jul | 6 | 61.8 |
| **Total** | | | | **700.4** |

Run-rate people cost by December: EUR 69.9k/month.`,
            },
            { md: md`**Other costs:** pilot delivery COGS 35 % of pilot revenue $= 110.3$; subscription COGS 25 % $= 45$; non-people opex (cloud and tools 60, travel and trade fairs 96, legal, accounting and insurance 60, coworking 36) $= 252$. Total costs $= 700.4 + 110.3 + 45 + 252 = 1{,}107.6$.` },
            { md: md`**EBITDA** $= 495 - 1{,}107.6 =$ **EUR -612.6k** (before capex such as demo rigs and before working-capital effects: if pilots are invoiced on 60-day terms, Q4 pilot cash arrives in 2028).` },
            { md: md`**Sanity checks.** (1) Capacity: 4.5 pilots in Q4 with one solutions engineer and one field engineer is over two concurrent on-site pilots each: tight; flag or hire earlier. (2) ARR per FTE at year end: $405/9 = 45$ k: plausible at seed. (3) Pilot conversion 50 %: label as assumption until four or more pilots have ended. (4) Pilot revenue is 64 % of 2027 revenue: investors will value it far below ARR.` },
          ],
          result: md`2027 revenue EUR 495k (315k pilots, 180k subscriptions), closing ARR EUR 405k, EBITDA about EUR -613k. The model's most fragile input is pilot conversion, and the binding constraint is deployment capacity, not demand.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Reverse the funnel: what does EUR 1.2 m of new ARR in 2028 require?",
          given: md`Same illustrative conversion rates: SQL to pilot 30 %, pilot to contract 50 %, ACV EUR 100k.`,
          steps: [
            { md: md`Contracts needed: $1{,}200/100 = 12$.` },
            { md: md`Pilots needed: $12/0.5 =$ **24**.`, hidden: true, check: { prompt: "Pilots needed", answer: 24, unit: "pilots", tolerance: { abs: 0.1 } } },
            { md: md`SQLs needed: $24/0.3 =$ **80** a year, 20 per quarter, starting one quarter earlier because of the pilot lag.`, hidden: true, check: { prompt: "SQLs needed per year", answer: 80, unit: "SQLs", tolerance: { abs: 0.5 } } },
            { md: md`Capacity: 24 pilots a year is 6 per quarter running at once. At about two concurrent pilots per field engineer, that is three field engineers, not one.` },
          ],
          result: md`The target implies 80 SQLs and three field engineers. The model now tells you what to hire and what pipeline to build, which is its real job.`,
        },
        {
          kind: "question",
          question: {
            id: "fc06-l05-p1",
            type: "numeric",
            prompt: md`An engineer with a gross salary of EUR 90k starts on 1 May. With a 30 % on-cost factor, what does the hire cost in this calendar year? (EUR k)`,
            answer: 78,
            tolerance: { abs: 0.1 },
            unit: "EUR k",
            explanation: md`$90\times 1.3\times 8/12 = 78$ EUR k (May to December, 8 months). The full-year run-rate is 117k: next year's budget must carry the whole amount.`,
            concepts: ["fc06.hiring-plan"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Building and using the model",
      blocks: [
        {
          kind: "md",
          md: md`### Practical layout

- **Tabs:** Inputs; Revenue build; Headcount; Opex and COGS; Statements (monthly); Annual summary; Metrics; Checks; Scenarios.
- **Timeline:** monthly columns for 24 to 36 months; annual roll-up. Same columns on every tab.
- **Conventions:** inputs in one colour, formulas in another; costs negative or positive consistently; units in a column next to each row; every input with a source note ("CRM Q3 2026", "benchmark", "guess").
- **Tools:** Excel or Google Sheets is standard and what investors expect to open. Planning tools (for example Causal-style or FP&A software) help later; at seed, a clean spreadsheet wins.
- **Versioning:** a dated file name per board meeting; a change log tab.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Standard startup-model fantasies",
          md: md`- **Hockey stick without a driver.** Revenue triples in year 3 but no input changed. Ask: which driver moved?
- **Hires without revenue lag.** A seller hired in January closes in July at the earliest in enterprise.
- **Conversion rates from one data point.** Label them and show the sensitivity.
- **No working capital.** Public buyers paying in 120 days and hardware prepayments do not appear in an EBITDA-only model.
- **Plugs.** An "other income" line that makes cash work. Investors look for it.
- **Precision theatre.** EUR 4,317,226 of 2029 revenue. Round outputs; the precision belongs in the drivers.`,
        },
        { kind: "xref", to: "m10.model-structure", note: "Inputs/calculations/outputs separation, one timeline and model checks are covered in depth (FAST-style principles) in Track 0, Module 10." },
        {
          kind: "checklist",
          title: "Before you send the model to an investor",
          items: [
            "Every input has a source or is labelled as an assumption",
            "No typed numbers inside calculation rows",
            "Balance sheet balances and cash ties to the cash flow in every month",
            "Revenue build shows stage lags and runs past the plan horizon",
            "Hiring plan matches the capacity the revenue build implies",
            "Sanity checks tab: ARR per FTE, magic number, burn multiple, runway",
            "A scenarios switch (base, bear, bull) that changes drivers, not outputs",
          ],
        },
        {
          kind: "ask",
          title: "Questions an investor will ask about your model",
          items: [
            "Which three inputs drive most of the outcome, and what evidence do you have for each?",
            "What has to be true for the year-2 revenue number?",
            "How many pilots can your team run at once, and where is that in the model?",
            "What happens to runway if pilot conversion is 30 % instead of 50 %?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc06-l05-p2",
            type: "short",
            prompt: md`Specify the **driver tree and first-year revenue build** for Mizan's soiling analytics business (or Suhail's events and sponsorship business), with illustrative numbers clearly labelled. Give: the 6 to 10 input drivers with their evidence status; a quarterly revenue build with lags; the hiring plan for the year with loaded costs; and three sanity checks with their results.`,
            rubric: [
              "Driver tree is bottom-up and specific to the venture's buyers and sales motion (for Mizan: tenders or direct awards, pilots, MW under contract; for Suhail: sponsors, tickets, events per year)",
              "Stage lags and recognition timing are explicit and the arithmetic of the revenue build is correct",
              "Hiring plan has roles, start dates, salaries, on-cost and months, and totals correctly",
              "Three sanity checks are meaningful (capacity, productivity, consistency) and the results are interpreted",
              "Every input has an evidence status; nothing about real traction or customers is invented",
            ],
            modelAnswer: md`**Mizan soiling analytics, first year (illustrative).** **Drivers:** (1) qualified plant opportunities per quarter: 1, 2, 2, 3 (guess, based on the pilot thread); (2) pilot rate 50 % (guess); (3) pilot fee KWD 6k, one quarter (benchmark from comparable analytics pilots: unverified); (4) pilot to contract 60 % (guess); (5) contract price KWD 150 per MW per year (illustrative); (6) average plant 200 MW, so ACV KWD 30k; (7) public procurement lag: one extra quarter between pilot end and contract start (based on tendering rules: check Track 0 procurement lessons); (8) on-cost 15 % (check Kuwaiti payroll rules). **Revenue build (KWD k):** pilots started 0.5, 1, 1, 1.5; pilot revenue 3, 6, 6, 9 = 24. Contracts start two quarters after pilot start: Q3 0.3, Q4 0.6; ARR Q3 9, Q4 27; subscription revenue Q3 2.25, Q4 6.75 = 9. Total year revenue **KWD 33k**, closing ARR **KWD 27k**. **Hiring:** data engineer KWD 24k from Q1 (12 months: 27.6 loaded), field analyst KWD 15k from Q3 (6 months: 8.6), cofounders unpaid this year (state it). People cost **KWD 36.2k**. **Sanity checks:** (1) capacity: at most 1.5 concurrent pilots, fine for one field analyst; (2) ARR per FTE 27/2 = 13.5k, low, consistent with a pilot year; (3) consistency: 60 % pilot-to-contract assumes the pilot proves avoided losses on the operator's own data; with KISR as methodology partner this is plausible but unproven, so the bear case uses 30 %.`,
            explanation: md`Graded against the rubric. The aim is a model whose every number traces to a driver you can act on.`,
            concepts: ["fc06.driver-model", "fc06.bottom-up-revenue", "fc06.hiring-plan", "fc06.model-sanity"],
            difficulty: 3,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "fc06-l05-q1",
      type: "numeric",
      prompt: md`Target new ARR EUR 600k; ACV EUR 50k; SQL to pilot 40 %; pilot to contract 50 %. How many SQLs are needed?`,
      answer: 60,
      tolerance: { abs: 0.1 },
      unit: "SQLs",
      explanation: md`Contracts $= 600/50 = 12$; pilots $= 12/0.5 = 24$; SQLs $= 24/0.4 = 60$.`,
      concepts: ["fc06.bottom-up-revenue"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc06-l05-q2",
      type: "mcq",
      prompt: "Why do investors trust bottom-up forecasts more than top-down ones?",
      options: [
        "They always produce lower numbers",
        "Each term is a measurable, controllable driver with evidence, so the forecast can be checked and managed",
        "They use more spreadsheet rows",
        "Top-down forecasts are not allowed in a data room",
      ],
      answer: 1,
      explanation: md`A share-of-market number has no lever you control. A funnel build exposes exactly what must happen and lets the investor test each assumption.`,
      concepts: ["fc06.bottom-up-revenue"],
      difficulty: 1,
    },
    {
      id: "fc06-l05-q3",
      type: "numeric",
      prompt: md`Quarterly recurring revenue rose from EUR 100k to EUR 130k; S&M spend in the previous quarter was EUR 150k. Magic number?`,
      answer: 0.8,
      tolerance: { abs: 0.01 },
      explanation: md`$4\times(130-100)/150 = 120/150 = 0.8$: efficient enough to consider spending more.`,
      concepts: ["fc06.model-sanity"],
      difficulty: 2,
    },
    {
      id: "fc06-l05-q4",
      type: "multi",
      prompt: "Which are red flags in a seed-stage model? (Select all.)",
      options: [
        "Revenue triples in year 3 with no change in any driver",
        "A field-engineer hire timed so pilots never exceed two per engineer",
        "An 'other income' line that appears only when cash would go negative",
        "Pilot conversion of 80 % labelled as based on one pilot",
        "Monthly columns for 24 months, annual thereafter",
      ],
      answer: [0, 2, 3],
      explanation: md`Unexplained hockey sticks, plugs and conversion from one data point are classic. Capacity-matched hiring and a monthly-then-annual timeline are good practice.`,
      concepts: ["fc06.model-sanity", "fc06.driver-model"],
      difficulty: 1,
    },
    {
      id: "fc06-l05-q5",
      type: "order",
      prompt: "Order the calculation flow of a driver-based model.",
      items: [
        "Inputs and assumptions",
        "Revenue build from the funnel",
        "Headcount plan and other costs",
        "P&L, cash flow and balance sheet",
        "Metrics and sanity checks",
      ],
      explanation: md`Drivers feed revenue and cost builds, which feed the statements; metrics and checks read from the statements.`,
      concepts: ["fc06.driver-model"],
      difficulty: 1,
    },
    {
      id: "fc06-l05-q6",
      type: "decision",
      prompt: md`Your model shows default alive in 18 months. An angel asks why. You realise it assumes three new contracts per quarter from Q2 while you have one solutions engineer and pilots take a quarter each. What do you do?`,
      options: [
        { text: "Keep the model: demand is there.", score: 0, feedback: "Demand is not the constraint; delivery capacity is, and the angel will find it." },
        { text: "Add a capacity constraint (pilots per engineer), re-time hires to match, show the revised runway and say what changed.", score: 1, feedback: "Correct: the model should reflect the binding constraint and you gain credibility by correcting it openly." },
        { text: "Lower the number of contracts quietly without changing hires.", score: 0.4, feedback: "Better numbers, but the model still does not explain why; fix the structure, not the output." },
      ],
      explanation: md`Sanity checks exist to find binding constraints. Model them explicitly.`,
      concepts: ["fc06.model-sanity", "fc06.hiring-plan"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "fc06-l05-f1", front: "Bottom-up bookings", back: md`New ARR $= N_{SQL}\cdot p_{\text{pilot}}\cdot p_{\text{convert}}\cdot ACV$, lagged by stage durations.`, concepts: ["fc06.bottom-up-revenue"] },
    { id: "fc06-l05-f2", front: "Loaded cost of a hire", back: md`$S(1+k)\,m/12$: salary times on-cost times months employed.`, concepts: ["fc06.hiring-plan"] },
    { id: "fc06-l05-f3", front: "Magic number", back: md`$4(R_q - R_{q-1})/S\&M_{q-1}$; above about 0.75, spend more on S&M.`, concepts: ["fc06.model-sanity"] },
    { id: "fc06-l05-f4", front: "Three tabs every startup model needs besides statements", back: "Inputs (with sources), headcount plan, checks.", concepts: ["fc06.driver-model"] },
    { id: "fc06-l05-f5", front: "Most common binding constraint in early enterprise models", back: "Delivery capacity (pilots and deployments per engineer), not demand.", concepts: ["fc06.model-sanity"] },
    { id: "fc06-l05-f6", front: "Top-down vs bottom-up", back: "Top-down sizes the market; bottom-up plans the business from controllable drivers.", concepts: ["fc06.bottom-up-revenue"] },
  ],
};

export default lesson;
