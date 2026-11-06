import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc04-l05",
  title: "Pipeline management and forecasting",
  summary:
    "A pipeline is a stock of deals; bookings are a flow. Weight the stock by stage probabilities derived from your own conversions, check coverage against what is left of the target, use sales velocity to choose which lever to work on, and forecast in categories you can defend.",
  minutes: 75,
  objectives: [
    "You can derive stage-to-close probabilities from stage conversions and compute a weighted pipeline.",
    "You can compute pipeline coverage for the deals that can actually close in the period, and explain why required coverage is about one over the win rate.",
    "You can compute sales velocity and compare the effect of improving each lever.",
    "You can sort deals into commit, best case and pipeline, and explain the forecast to an investor.",
  ],
  concepts: [
    { id: "fc04.weighted-pipeline", name: "Weighted pipeline", description: "Sum of deal values multiplied by the stage-to-close probability of each deal's stage; expected bookings if the probabilities hold and the deals close in the period.", competency: "fc-sales", related: ["fc04.sales-stages", "fc04.pipeline-coverage"] },
    { id: "fc04.pipeline-coverage", name: "Pipeline coverage", description: "Unweighted in-period pipeline divided by the remaining target; the required ratio is roughly the inverse of the win rate of the counted deals.", competency: "fc-sales", related: ["fc04.weighted-pipeline"] },
    { id: "fc04.sales-velocity", name: "Sales velocity", description: "Opportunities times win rate times average contract value divided by cycle length: the rate at which the pipeline turns into bookings, and a tool for comparing levers.", competency: "fc-sales", related: ["fc04.weighted-pipeline"] },
    { id: "fc04.forecast-categories", name: "Forecast categories", description: "Commit (you would be surprised if it did not close), best case (could close with things going right), pipeline (open but not expected this period); categories are judged on gates and evidence, not on arithmetic alone.", competency: "fc-sales", related: ["fc04.deal-scoring"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Stock, flow and the arithmetic of a forecast",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Runway, hiring and fundraising all depend on when revenue arrives. Investors at seed will ask "what is in the pipeline and what will close this quarter?", and they will judge you on whether the next quarter matches what you said. A forecast you can rebuild from stage conversions and dates is a credibility asset; a list of hopeful logos is a liability.`,
        },
        {
          kind: "md",
          md: md`### Stage probabilities come from conversions

If stage conversions are $c_i$ (lesson 1), the probability that a deal now in stage $s$ eventually closes is the product of the remaining conversions:

$$p_s = \prod_{i \ge s} c_i.$$

With the illustrative conversions 60 / 50 / 60 / 50 % (S1 to S2, S2 to S3, S3 to S4, S4 to signed):

| Stage | Remaining gates | $p_s$ |
|---|---|---|
| S1 First meeting | $0.6\times0.5\times0.6\times0.5$ | 9 % |
| S2 Discovery complete | $0.5\times0.6\times0.5$ | 15 % |
| S3 Technical validation | $0.6\times0.5$ | 30 % |
| S4 Proposal agreed | $0.5$ | 50 % |
| Paper process (verbal yes) | assumed | 80 % |

With fewer than about 30 closed deals your conversions are guesses. Say so, use conservative values, and replace them with your own data as it accumulates.

### Weighted pipeline`,
        },
        { kind: "equation", formula: "fc04-weighted-pipeline" },
        {
          kind: "md",
          md: md`It is the expected value of the stock, **if** the probabilities are right **and** the deals can close inside the period. The second condition is the one founders forget: a deal at S2 with 13 weeks of cycle left cannot close in a quarter that ends in 10 weeks, whatever its probability. Filter by expected close date before you sum.

With a handful of deals the outcome is lumpy. Nine deals with a weighted value equal to the target can easily produce half or one and a half times the target. Always read the deal list, not just the total.

### Coverage`,
        },
        { kind: "equation", formula: "fc04-coverage" },
        {
          kind: "md",
          md: md`If the counted deals win at rate $W$, expected bookings are $W\times P$, so to expect to hit the remaining target you need $P \ge (Q-B)/W$: **required coverage is about $1/W$**. The often-quoted "3x coverage" is right only for a win rate near 33 %. For an early-stage company counting deals from S2 (15 %), the requirement is nearer 6 to 7x.

### Sales velocity`,
        },
        { kind: "equation", formula: "fc04-sales-velocity" },
        {
          kind: "md",
          md: md`Velocity is a **flow rate**: it is Little's law applied to deals (throughput = work in progress / time in system, here weighted by win rate and value). It is linear in $N$, $W$ and ACV and inversely proportional to $L$. So +10 % on win rate gives +10 % velocity, but a 10 % shorter cycle gives $1/0.9 - 1 = +11.1$ %, and a shorter cycle also frees founder time. Use velocity to choose what to work on, not as the forecast itself; the forecast is built deal by deal.

### Forecast categories

| Category | Test | Typical rule |
|---|---|---|
| **Commit** | You would be surprised if it did not close in the period | Passed economic-buyer and champion gates, paper process mapped, close date confirmed by the buyer |
| **Best case** | Could close if things go right | Gates mostly passed, one known gap with a plan |
| **Pipeline** | Open, real, not expected this period | Qualified, but stage or timing says later |
| **Omitted** | Not real | No dated next step, no pain, or stalled |

Report commit and best case separately, never a single blended number.`,
        },
        {
          kind: "widget",
          widget: "pipeline-forecast",
          props: { target: 300000, acv: 65000 },
          caption: "Enter deals per stage, values and stage probabilities. Watch how coverage changes when you exclude deals that cannot close in the period, and how cycle length shifts expected bookings between quarters.",
        },
        {
          kind: "chart",
          chart: "bar",
          title: "Illustrative pipeline by stage: face value vs weighted (EUR k)",
          xKey: "stage",
          xLabel: "Stage",
          yLabel: "EUR k",
          series: [
            { key: "unweighted", label: "Unweighted value" },
            { key: "weighted", label: "Weighted value" },
          ],
          data: [
            { stage: "S2 Discovery (15 %)", unweighted: 360, weighted: 54 },
            { stage: "S3 Tech validation (30 %)", unweighted: 240, weighted: 72 },
            { stage: "S4 Proposal (50 %)", unweighted: 210, weighted: 105 },
            { stage: "Paper process (80 %)", unweighted: 160, weighted: 128 },
          ],
          caption: "The early stages hold most of the face value and little of the expected value.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Forecasting a quarter",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Q2 2027 forecast for an illustrative Afterwave pipeline",
          given: md`Illustrative, on 1 April 2027 with nothing booked yet in Q2; target $Q = $ EUR 300k first-year contract value. Pipeline: 6 deals at S2 (EUR 60k each), 4 at S3 (EUR 60k), 3 at S4 (EUR 70k), 2 in paper process (EUR 80k). Stage probabilities 15 / 30 / 50 / 80 %. Remaining median cycle from S2 is 13 weeks (3 + 4 + 6); the quarter has 13 weeks left.`,
          steps: [
            { md: md`**Unweighted pipeline:** $360 + 240 + 210 + 160 = 970$ EUR k across 15 deals (average 64.7k).` },
            { md: md`**Weighted pipeline:** $360\times0.15 + 240\times0.30 + 210\times0.50 + 160\times0.80 = 54 + 72 + 105 + 128 = 359$ EUR k.` },
            { md: md`**Timing filter:** S2 deals need the full 13 weeks with no slippage; treat them as next quarter. In-period unweighted $= 240+210+160 = 610$ EUR k; in-period weighted $= 72+105+128 = 305$ EUR k.` },
            { md: md`**Coverage:** naive $970/300 = 3.2$x looks comfortable; in-period $610/300 = 2.0$x. The in-period deals win at a blended $305/610 = 50$ %, so the requirement is about 2x: just covered, with no margin.` },
            { md: md`**Categories:** commit = the 2 paper-process deals if both have passed the gates (EUR 160k); best case adds the S4 deals with a confirmed decision date; pipeline = the rest. Forecast: **commit EUR 160k, best case about EUR 300k**, expected (weighted, in-period) EUR 305k.` },
            { md: md`**Velocity check:** $v = 15\times0.15\times64.7/91 = 1.60$ EUR k/day, about EUR 48k/month or EUR 146k per 91-day quarter in steady state. This quarter looks better than steady state only because several deals are already late-stage; next quarter needs new S2 and S3 deals now.` },
          ],
          result: md`Tell the investor: "Commit EUR 160k, best case EUR 300k against a EUR 300k target, from 9 in-period deals. Steady-state velocity is about EUR 145k a quarter, so the priority is adding qualified pipeline for Q3." Every number traces back to stages, conversions and dates.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: which lever moves velocity most?",
          given: md`Same 15 deals, average ACV EUR 64.7k. You consider one improvement with two effects: better qualification raises the win rate from S2 from 15 % to 20 % and shortens the cycle from 91 to 75 days because dead deals are dropped earlier.`,
          steps: [
            { md: md`New velocity: $v = 15\times0.20\times64.7/75$.` },
            { md: md`= **2.59 EUR k/day**.`, hidden: true, check: { prompt: "New velocity (EUR k/day)", answer: 2.59, unit: "EUR k/day", tolerance: { abs: 0.02 } } },
            { md: md`Relative increase over 1.60 EUR k/day: $2.59/1.60 - 1$.` },
            { md: md`= **+62 %**.`, hidden: true, check: { prompt: "Increase in velocity (%)", answer: 62, unit: "%", tolerance: { abs: 1.5 } } },
          ],
          result: md`Win rate +33 % and cycle −18 % compound to +62 %: $1.333\times(91/75) = 1.62$. Qualification improves both levers at once, which is why disciplined disqualification is often the highest-return sales activity.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Running the pipeline week to week",
      blocks: [
        {
          kind: "md",
          md: md`### The weekly pipeline review (30 minutes, alone or with a cofounder)

1. **New deals:** what entered S1 and S2 this week? Is the inflow on pace (lesson 1 gave you a weekly target)?
2. **Movement:** what moved forward, on what buyer evidence?
3. **Stalls:** deals with no stage change in more than about twice the median time in stage. Decide: action, downgrade or close lost.
4. **Close dates:** any date pushed more than once is not a date. Ask the buyer what has to happen for it to hold.
5. **Forecast:** update commit and best case, and write one sentence on what changed since last week.

### Metrics worth tracking from day one

| Metric | Why |
|---|---|
| New S1 and S2 per week | Leading indicator of future bookings |
| Stage conversion rates | Your real probabilities; replace assumptions |
| Median time in stage | Cycle length and stall detection |
| Win rate from S2, and loss reasons | Where and why deals die |
| Forecast accuracy (commit vs actual) | Your credibility number |`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Forecasting mistakes",
          md: md`- **Counting deals that cannot close in time.** Filter by close date and remaining cycle first.
- **Using someone else's stage probabilities.** A SaaS benchmark of 20 % at "demo" means nothing for an on-prem infrastructure sale.
- **Blending commit and hope.** Report categories separately.
- **Sandbagging.** Under-forecasting to look good later also destroys trust; aim for accuracy.
- **Pipeline as a vanity number.** "EUR 2 m pipeline" made of S1 meetings is about EUR 180k expected at 9 %.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "Engineer's view",
          md: md`Treat the pipeline as a queueing system. Inflow (new S2 per week), service time (cycle length), yield (win rate) and work in progress (open deals) are linked by Little's law: if you want more bookings per quarter you must raise inflow or yield, or cut cycle time. Adding work in progress without capacity (your hours) only increases cycle time.`,
        },
        {
          kind: "question",
          question: {
            id: "fc04-l05-p1",
            type: "short",
            prompt: md`Build a one-quarter forecast for Afterwave or Mizan from an illustrative pipeline of 8 to 15 deals that you define. Give: (1) your stage model with assumed conversions and the derived stage-to-close probabilities; (2) the deal table with stage, value and expected close date; (3) the weighted pipeline, in-period coverage against a target you state, and the coverage you need given the win rate; (4) sales velocity and the one lever you will work on, with the computed effect; (5) the forecast as commit, best case and pipeline, written as the three sentences you would put in an investor update.`,
            rubric: [
              "Stage probabilities are derived as products of remaining conversions and stated as assumptions.",
              "Weighted pipeline and coverage are computed correctly and deals that cannot close in the period are excluded from in-period figures.",
              "Required coverage is linked to win rate (about one over the win rate), not a generic 3x.",
              "Velocity computed with consistent units, and the chosen lever's effect is quantified.",
              "Forecast categories follow gates and evidence (economic buyer, champion, paper process), not probability arithmetic alone.",
              "Investor-update sentences are specific, conservative, and label numbers illustrative.",
            ],
            modelAnswer: md`**Model (illustrative):** conversions 60/50/60/50 % give $p$ = 15 % (S2), 30 % (S3), 50 % (S4), 80 % (paper). Target Q3 2027: EUR 250k first-year value; quarter has 13 weeks; remaining cycle from S2 is 13 weeks, so S2 deals count as Q4.

**Deals:** five S2 at EUR 55k (Q4), three S3 at EUR 60k (Sept), two S4 at EUR 75k (Aug), one paper process at EUR 90k (July). In-period unweighted $= 180 + 150 + 90 = 420$; weighted $= 54 + 75 + 72 = 201$ EUR k. Coverage $420/250 = 1.7$x; blended in-period win rate $201/420 = 48$ %, so about 2.1x is needed: **short by about EUR 100k of late-stage pipeline**.

**Velocity:** 11 qualified deals, 15 % from S2, ACV EUR 63k, 91 days: $11\times0.15\times63/91 = 1.14$ EUR k/day. Lever: shorten the paper process by sending the security pack at S3; cutting cycle to 80 days gives 1.30 EUR k/day (+14 %).

**Investor update:** "Q3 commit is EUR 90k (one deal in procurement); best case EUR 240k if both proposals sign in August. We are about EUR 100k short of the coverage our win rate needs, so July is focused on moving three S3 deals and adding six new discovery-stage accounts. Steady-state velocity is about EUR 105k a quarter; our main lever is cycle time in security review."`,
            explanation: md`Credible forecasts are built deal by deal, filtered by timing, and reported in categories.`,
            concepts: ["fc04.weighted-pipeline", "fc04.pipeline-coverage", "fc04.sales-velocity", "fc04.forecast-categories"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to an investor the difference between your weighted pipeline and your sales velocity, and why your forecast is neither of them.",
          keyPoints: [
            "Weighted pipeline is the expected value of the current stock of deals using stage probabilities.",
            "Velocity is a steady-state flow rate: opportunities times win rate times ACV divided by cycle length.",
            "The forecast is built deal by deal with close dates and categories (commit, best case).",
            "Deals that cannot close in the period are excluded regardless of probability.",
            "With few deals, outcomes are lumpy, so evidence-based gates matter more than arithmetic.",
          ],
        },
        { kind: "sources", refs: ["fc04-r10", "fc04-r2"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc04-l05-q1",
      type: "numeric",
      prompt: md`Three deals: EUR 50k at 20 %, EUR 80k at 50 %, EUR 100k at 70 %. What is the weighted pipeline (EUR k)?`,
      answer: 120,
      tolerance: { abs: 0.1 },
      unit: "EUR k",
      explanation: md`$50\times0.2 + 80\times0.5 + 100\times0.7 = 10 + 40 + 70 = 120$ EUR k.`,
      concepts: ["fc04.weighted-pipeline"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc04-l05-q2",
      type: "numeric",
      prompt: md`Sales velocity: 20 qualified opportunities, 25 % win rate, ACV EUR 40k, cycle 100 days. What is the velocity in EUR k per day?`,
      answer: 2,
      tolerance: { abs: 0.01 },
      unit: "EUR k/day",
      explanation: md`$v = 20\times0.25\times40/100 = 2.0$ EUR k/day, about EUR 60k a month.`,
      concepts: ["fc04.sales-velocity"],
      difficulty: 1,
    },
    {
      id: "fc04-l05-q3",
      type: "mcq",
      prompt: "Which single change raises sales velocity the most?",
      options: ["Win rate +10 %", "ACV +10 %", "Opportunities +10 %", "Cycle length −10 %"],
      answer: 3,
      explanation: md`N, W and ACV are linear: +10 % each. Cycle length is in the denominator: $1/0.9 = 1.111$, so +11.1 %.`,
      concepts: ["fc04.sales-velocity"],
      difficulty: 2,
    },
    {
      id: "fc04-l05-q4",
      type: "numeric",
      prompt: md`Your target is EUR 400k, you have booked EUR 100k, and your in-period pipeline wins at 25 %. What unweighted in-period pipeline do you need to expect to hit the target (EUR k)?`,
      answer: 1200,
      tolerance: { abs: 1 },
      unit: "EUR k",
      explanation: md`Remaining $= 400-100 = 300$. Required $P = 300/0.25 = 1{,}200$ EUR k, i.e. 4x coverage of the remaining target.`,
      concepts: ["fc04.pipeline-coverage"],
      difficulty: 2,
    },
    {
      id: "fc04-l05-q5",
      type: "numeric",
      prompt: md`Stage conversions after S3 are 70 % (S3 to S4) and 60 % (S4 to signed). What is the stage-to-close probability of a deal at S3, in %?`,
      answer: 42,
      tolerance: { abs: 0.1 },
      unit: "%",
      explanation: md`$p_{S3} = 0.7\times0.6 = 0.42 = 42$ %.`,
      concepts: ["fc04.weighted-pipeline"],
      difficulty: 1,
    },
    {
      id: "fc04-l05-q6",
      type: "decision",
      prompt: md`A deal at S4 worth EUR 120k is weighted at 50 %. Its close date has slipped twice; the champion is solid but nobody has asked procurement how long vendor onboarding takes. The quarter ends in four weeks. How do you categorise it?`,
      options: [
        { text: "Commit: it is the biggest deal and the champion is solid.", score: 0, feedback: "Two slips and an unknown paper process fail the commit test." },
        { text: "Best case, with an action to get the onboarding lead time from procurement this week.", score: 1, feedback: "It could close, but the paper process is unknown. The action could move it to commit or out of the quarter." },
        { text: "Remove it from the pipeline.", score: 0.2, feedback: "Too harsh: the deal is real, just not committable this quarter." },
      ],
      explanation: md`Categories follow evidence and gates. Repeated slips plus unknown paper process means "could", not "will".`,
      concepts: ["fc04.forecast-categories"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "fc04-l05-f1", front: "Stage-to-close probability", back: md`$p_s = \prod_{i\ge s} c_i$: product of the remaining stage conversions.`, concepts: ["fc04.weighted-pipeline"] },
    { id: "fc04-l05-f2", front: "Weighted pipeline", back: md`$P_w = \sum p_{s(j)} V_j$, only for deals that can close in the period.`, concepts: ["fc04.weighted-pipeline"] },
    { id: "fc04-l05-f3", front: "Required coverage", back: md`About $1/W$: 4x at a 25 % win rate; 3x only at about 33 %.`, concepts: ["fc04.pipeline-coverage"] },
    { id: "fc04-l05-f4", front: "Sales velocity", back: md`$v = N\cdot W\cdot \mathrm{ACV}/L$; −10 % cycle gives +11.1 %.`, concepts: ["fc04.sales-velocity"] },
    { id: "fc04-l05-f5", front: "Commit means", back: "You would be surprised if it did not close this period: gates passed, paper process mapped, date confirmed by the buyer.", concepts: ["fc04.forecast-categories"] },
    { id: "fc04-l05-f6", front: "Stalled deal rule of thumb", back: "No stage change in about twice the median time in stage: act, downgrade or close lost.", concepts: ["fc04.forecast-categories"] },
  ],
};

export default lesson;
