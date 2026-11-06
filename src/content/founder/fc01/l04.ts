import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc01-l04",
  title: "Why startups fail: mechanisms, base rates and pre-mortems",
  summary:
    "Running out of cash is how startups die, not why. The root mechanisms (no market need, a business model that does not work, team breakdown, competition, timing), what the base rates say, the multiplication of must-go-right probabilities, and how to run a pre-mortem that changes what you do on Monday.",
  minutes: 65,
  objectives: [
    "Separate the proximate cause of startup death (cash) from the root causes",
    "Quote the main reported failure reasons and base rates with appropriate caution",
    "Compute the joint probability of a chain of must-go-right events and find the weakest link",
    "Run a pre-mortem and turn its output into early-warning indicators and actions",
  ],
  concepts: [
    { id: "fc01.failure-modes", name: "Startup failure mechanisms", description: "Root causes behind running out of cash: no market need, unworkable business model or unit economics, team and cofounder breakdown, being outcompeted, bad timing, regulatory blocks.", competency: "fc-fundamentals", related: ["fc01.base-rates", "fc01.default-alive"] },
    { id: "fc01.base-rates", name: "Base rates", description: "The historical frequency of an outcome in a reference class (for example the share of venture-backed startups that fail to return capital); the starting point before adjusting for your specifics.", competency: "fc-fundamentals", related: ["fc01.failure-modes", "fc01.power-law"] },
    { id: "fc01.must-go-right", name: "Must-go-right chain", description: "The sequence of conditions that all have to hold for a plan to succeed; the joint probability is their product, so the weakest link dominates.", competency: "fc-fundamentals", related: ["fc01.pre-mortem", "m08.risk-register"] },
    { id: "fc01.pre-mortem", name: "Pre-mortem", description: "Imagine the venture or project has already failed and write down why; prospective hindsight surfaces risks that forward planning misses.", competency: "fc-fundamentals", related: ["fc01.must-go-right", "m08.risk-register"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Proximate and root causes, base rates and joint probability",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`With three ventures, you will see early warning signs in one while you are busy in another. Knowing the handful of mechanisms that actually kill startups, and running a short pre-mortem on each venture every quarter, lets you spot the one that is drifting toward "no market need" or a cofounder rift before it shows up as a cash problem. It also gives you honest answers when an investor asks "what could kill this?".`,
        },
        {
          kind: "md",
          md: md`### Cash is the proximate cause; the root cause is upstream

Almost every startup that dies does so because it runs out of money. That is like saying patients die because their heart stops. The useful question is what caused the cash to run out:

1. **No market need.** The product solves a problem nobody urgently pays to solve. The company builds, launches and finds that usage and renewals do not follow. This is the commonest root cause and the one discovery work (Lesson 3) is meant to catch early.
2. **The business model does not work.** Customers want it, but at a price below what it costs to win and serve them: CAC too high, gross margin too low, sales cycle too long for the cash available. Often visible early in unit economics (the finance module goes deep).
3. **Team breakdown.** Cofounders disagree on direction, commitment or equity; key people leave; the team lacks a skill the stage requires (for example no one who can sell). Clear roles, vesting and early hard conversations reduce this.
4. **Outcompeted.** A competitor with more distribution, capital or a better product takes the market; or an incumbent bundles the feature.
5. **Timing.** Too early (the market or enabling technology is not ready) or too late (the category is decided).
6. **Regulatory and legal.** A licence, certification or procurement rule blocks the go-to-market, or a legal dispute absorbs the company.

These interact: a weak market makes fundraising harder, which shortens runway, which raises team stress. Default alive (Lesson 1) is the gauge; these are the engines.

### What the post-mortems report

CB Insights has published several analyses of startup post-mortems. In its 2021 update (based on roughly 110 post-mortems, with more than one reason allowed per company), the most frequently cited reasons were:`,
        },
        {
          kind: "chart",
          chart: "bar",
          title: "Most cited reasons in startup post-mortems (CB Insights, 2021 update, % of companies citing)",
          xKey: "reason",
          xLabel: "Reason",
          yLabel: "% of post-mortems",
          series: [{ key: "pct", label: "% citing the reason" }],
          data: [
            { reason: "Ran out of cash / could not raise", pct: 38 },
            { reason: "No market need", pct: 35 },
            { reason: "Outcompeted", pct: 20 },
            { reason: "Flawed business model", pct: 19 },
            { reason: "Regulatory / legal", pct: 18 },
            { reason: "Pricing / cost issues", pct: 15 },
            { reason: "Not the right team", pct: 14 },
            { reason: "Product mistimed", pct: 10 },
          ],
          caption: "Percentages sum to more than 100% because post-mortems cite several reasons. 'Ran out of cash' is mostly a consequence of the others. Figures from memory of the published report; verify before quoting.",
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Failure statistics: treat as orders of magnitude",
          md: md`The CB Insights percentages are reproduced from its widely cited 2021 analysis; an earlier edition put "no market need" first at about 42%. Other commonly cited base rates: Shikhar Ghosh (Harvard Business School) estimated in 2012 that about three quarters of venture-backed US startups do not return investors' capital; US Bureau of Labor Statistics business survival data show roughly a fifth of all new businesses (not only startups) closing within the first year and about half within five years. These numbers could not be re-checked against the primary sources for this course and vary by definition of "failure". Use them as base rates, cite the original when you quote them, and do not mix venture-backed and all-business figures.`,
        },
        {
          kind: "md",
          md: md`### Base rates first, then adjust

A **base rate** is how often something happens in a reference class. Before you estimate the chance that your plan works, ask how often similar plans work: enterprise pilots that convert to paid contracts, public-sector pilots that turn into tenders, first-time events that break even. Then adjust for what is genuinely different about your case. Founders skip the base rate and reason only from their own plan, which is the **planning fallacy**: plans describe the path where things go right.

### Joint probability: why plans with many steps fail

A plan succeeds only if every must-go-right condition holds. If the conditions are roughly independent:`,
        },
        { kind: "equation", formula: "fc01-joint-success" },
        {
          kind: "md",
          md: md`Five steps that each look 90% likely give $0.9^5 = 0.59$; five steps at 80% give $0.8^5 = 0.33$. Two consequences:

- **Long chains are fragile.** Remove steps (fewer approvals, fewer dependencies) before trying to make each step more certain.
- **Work on the weakest link.** An absolute improvement $\Delta p$ on step $i$ raises the joint probability by the factor $(p_i + \Delta p)/p_i$, which is largest for the smallest $p_i$.

The expected cost of a risk is its probability times its impact:`,
        },
        { kind: "equation", formula: "fc01-expected-loss" },
        {
          kind: "md",
          md: md`### The pre-mortem

Gary Klein's pre-mortem (Harvard Business Review, 2007) inverts the usual risk meeting. Instead of "what might go wrong?", the team is told: **"It is 18 months from now. The venture failed. Write down why."** People generate more, and more specific, reasons when they explain an outcome treated as certain; research on prospective hindsight (Mitchell, Russo and Pennington, 1989) reported about 30% more correctly identified reasons. It also gives permission to voice doubts that would sound disloyal in a planning meeting.`,
        },
        {
          kind: "flow",
          title: "Running a 60-minute pre-mortem",
          steps: [
            { label: "Set the scene (5 min)", detail: "State the plan and the date. 'It is May 2028. Afterwave has shut down.'" },
            { label: "Silent writing (10 min)", detail: "Each person writes every reason for the failure, alone. No discussion yet." },
            { label: "Round-robin (15 min)", detail: "One reason per person per round until all are listed. No debate." },
            { label: "Cluster and rate (15 min)", detail: "Group into mechanisms; rate probability and impact; mark the must-go-right chain." },
            { label: "Indicators and actions (15 min)", detail: "For the top 3 to 5: an early-warning indicator, a threshold, an owner and an action this month." },
          ],
          caption: "The output is a short list of leading indicators with thresholds, not a long risk register nobody reads.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Pre-mortem arithmetic for Mizan and Afterwave",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Mizan's Shagaya soiling pilot: the must-go-right chain",
          given: md`Pre-mortem output (illustrative probabilities, to be replaced by the team's own estimates): for the pilot to lead to a paid contract, four things must hold: (1) access to plant operational data is granted on time, $p_1 = 0.8$; (2) the data quality (sensor coverage, cleaning logs, time stamps) is sufficient to separate soiling from other losses, $p_2 = 0.7$; (3) the methodology is validated with the KISR researchers, $p_3 = 0.8$; (4) a buyer with budget converts the result into a paid engagement, $p_4 = 0.5$.`,
          steps: [
            { md: md`**Joint probability:** $P = 0.8\times0.7\times0.8\times0.5 = 0.224$. A pilot that "looks very likely" step by step has about a one-in-four chance of becoming revenue.` },
            { md: md`**Option A, improve data quality** with an early data audit and a short gap-filling plan: $p_2 \to 0.85$. $P = 0.8\times0.85\times0.8\times0.5 = 0.272$ (+21%).` },
            { md: md`**Option B, improve conversion** by identifying the budget owner and the procurement route before the pilot starts and agreeing in writing what result would justify a paid phase: $p_4 \to 0.65$. $P = 0.8\times0.7\times0.8\times0.65 = 0.291$ (+30%).` },
            { md: md`**Why B wins:** the same $\Delta p = 0.15$ is a larger relative gain on the weakest link ($0.15/0.5 = 30\%$ vs $0.15/0.7 = 21\%$). Do both if they are cheap, but start with conversion: it is also the risk founders most often leave until the end.` },
            { md: md`**Early-warning indicators:** data-access agreement signed by a set date; first data extract received and audited within two weeks of access; a named budget owner and procurement route before kickoff. Each has a threshold that triggers a decision.` },
          ],
          result: md`The pre-mortem turns a hopeful pilot plan into a 22% chain and shows where to spend effort. The action this month is not more analytics work but a conversation about who pays, how, and on what evidence.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Afterwave: how many qualified opportunities for three contracts?",
          given: md`Illustrative enterprise funnel from a pre-mortem: for one qualified opportunity to become an annual contract, Afterwave must pass the customer's on-prem security review ($0.6$), have an internal champion who drives the pilot ($0.7$), find budget in the current cycle ($0.6$) and deliver a successful pilot ($0.8$). Target: 3 annual contracts in the next 12 months.`,
          steps: [
            { md: md`Joint probability per opportunity $P = 0.6\times0.7\times0.6\times0.8$.` },
            { md: md`$P = 0.2016$, about 20%.`, hidden: true, check: { prompt: "Joint probability per qualified opportunity", answer: 0.2016, tolerance: { abs: 0.002 } } },
            { md: md`Opportunities needed $= 3/P$.` },
            { md: md`About 14.9, so **15 qualified opportunities**.`, hidden: true, check: { prompt: "Qualified opportunities needed for 3 expected contracts", answer: 14.9, tolerance: { abs: 0.2 } } },
            { md: md`The weakest links are security review and budget (0.6 each). Preparing a security package for Enclave in advance (architecture, data flows, isolation, standard questionnaires answered) and qualifying budget timing in the first call attack both.` },
          ],
          result: md`Three contracts need about 15 qualified opportunities, and that is an expected value: with $n = 15$ and $p = 0.2$ there is still a meaningful chance of two or fewer. The pre-mortem sets the pipeline target and names the two preparations that move it most.`,
        },
        {
          kind: "question",
          question: {
            id: "fc01-l04-p1",
            type: "numeric",
            prompt: md`Suhail's first hackathon needs: venue confirmed (0.9), two anchor sponsors signed (0.6), at least 100 qualified applicants (0.8) and volunteer leads available on the dates (0.85). Assuming independence, what is the probability that all four hold? (3 decimals)`,
            answer: 0.367,
            tolerance: { abs: 0.002 },
            explanation: md`$0.9\times0.6\times0.8\times0.85 = 0.3672$. The sponsor step is the weakest link: raising it to 0.8 lifts the joint probability to 0.490 (+33%), more than any other single improvement of the same size.`,
            concepts: ["fc01.must-go-right"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Making failure analysis part of the operating rhythm",
      blocks: [
        {
          kind: "md",
          md: md`### Who, when and what document

- **When:** before a major commitment (raising, a first hire, a pilot), and once a quarter per venture. 60 minutes is enough.
- **Who:** all cofounders plus one or two people close to the customer. For Afterwave: you, Ismail and Yusuf. For Mizan: you and Omar, and later a KISR collaborator if the relationship allows candour. For Suhail: the volunteer leads.
- **Output:** one page: the must-go-right chain with probabilities, the top 3 to 5 failure mechanisms, one leading indicator per mechanism with a threshold, an owner and an action. Track the indicators in the monthly update next to cash and default alive.
- **Link to project risk practice:** the same probability-impact logic as a project risk register; the difference is that a startup's biggest risks are market and team, not schedule.`,
        },
        { kind: "xref", to: "m08-l05", note: "Risk registers, probability-impact matrices and Monte Carlo: the project-management toolkit behind expected loss and risk ranking." },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How pre-mortems fail",
          md: md`- **Listing risks nobody owns:** every top risk needs an owner and an action this month.
- **Only external risks:** markets, competitors and regulators get listed; "we have not agreed how much time each cofounder commits" usually does not. Name the team risks explicitly.
- **Treating cash as the root cause:** "we ran out of money" is the ending, not the reason.
- **Probabilities from optimism:** anchor each step on a base rate (how often do pilots like this convert?), then adjust.
- **No follow-up:** a pre-mortem that is not reviewed next quarter is theatre.`,
        },
        {
          kind: "checklist",
          title: "Quarterly failure check per venture",
          items: [
            "Is usage or renewal evidence improving? If not, suspect no market need first",
            "Do unit economics (price, cost to win, cost to serve) still work at the current sales cycle?",
            "Is every cofounder still committed at the agreed level, with vesting in place?",
            "Has a competitor or incumbent moved into the core use case?",
            "Is any regulatory, certification or procurement step on the critical path?",
            "Default alive or dead, and is the trend better or worse than last quarter?",
          ],
        },
        {
          kind: "ask",
          title: "Questions that surface the real risks",
          items: [
            "If this fails in 18 months, what is the most likely single reason?",
            "Which step in our plan has the lowest probability, and what have we done about it this month?",
            "What would a customer have to say for us to conclude there is no market need?",
            "What disagreement among us have we not resolved?",
          ],
        },
        { kind: "scenario", scenario: "fc01-s2" },
        {
          kind: "question",
          question: {
            id: "fc01-l04-p2",
            type: "short",
            prompt: md`Run a pre-mortem on one of your ventures (written, as if with the team) and produce the one-page output: the failure statement with a date, the top five failure reasons grouped into mechanisms, the must-go-right chain with probabilities and the joint probability, and for the top three risks a leading indicator, threshold, owner and action for this month.`,
            rubric: [
              "Opens with a concrete failure statement and date (prospective hindsight framing)",
              "Lists at least five specific reasons mapped to root mechanisms (market need, business model, team, competition, timing, regulatory), including at least one team risk",
              "Gives a must-go-right chain with stated probabilities anchored on base rates and computes the joint probability correctly",
              "Identifies the weakest link and explains why improving it is the best use of effort",
              "For the top three risks gives a measurable leading indicator, threshold, owner and action this month",
              "Uses only established facts about the venture; illustrative probabilities are labelled",
            ],
            modelAnswer: md`**Mizan pre-mortem. "It is June 2028. Mizan has stopped operating."** (probabilities illustrative)

**Reasons, by mechanism:**
1. *No market need:* the soiling analysis was accurate but no buyer changed cleaning schedules because cleaning is fixed by the O&M contract.
2. *Business model:* public-sector procurement meant 12 to 18 months from result to purchase order; cash ran out first.
3. *Business model:* at Gulf tariffs the recovered energy was worth too little to justify the price.
4. *Team:* founder time split across three ventures; Mizan got one day a week and nothing moved.
5. *Regulatory/procurement:* paid work required a tender we could not qualify for.

**Must-go-right chain:** data access 0.8 x data quality 0.7 x methodology validated 0.8 x paid conversion 0.5 = **0.22**. Weakest link: conversion. A 0.15 gain there is worth +30%, versus +21% on data quality.

| Risk | Indicator | Threshold | Owner | Action this month |
|---|---|---|---|---|
| No buyer acts | Named budget owner and route to purchase | None by pilot kickoff = pause | CEO | Map who decides cleaning schedules under the O&M contract |
| Procurement too slow | Months from result to PO in comparable cases | More than 9 = change target buyer | Omar | Ask two O&M contractors how they buy analytics |
| Founder time | Hours per week on Mizan | Fewer than 12 for a month = re-plan | CEO | Fix the weekly Mizan block in the calendar |`,
            explanation: md`Good pre-mortems name team and business-model risks as plainly as market risks, quantify the chain, and end with actions that start this month.`,
            concepts: ["fc01.pre-mortem", "fc01.must-go-right", "fc01.failure-modes"],
            difficulty: 2,
          },
        },
        { kind: "sources", refs: ["fc01-r8", "fc01-r17", "fc01-r16", "fc01-r9", "fc01-r10"] },
        {
          kind: "feynman",
          prompt: "Explain to a new Suhail volunteer lead why 'we ran out of money' is never the real reason a startup fails, and what the real reasons usually are.",
          keyPoints: [
            "Running out of cash is the proximate cause, like a heart stopping",
            "Root causes: no market need, a business model that does not work, team breakdown, competition, timing, regulation",
            "No market need is the most common root cause in published post-mortems",
            "Default alive is the gauge; root causes are the engines that move it",
            "A pre-mortem surfaces root causes early enough to act",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "fc01-l04-q1",
      type: "mcq",
      prompt: "Which statement best describes 'ran out of cash' as a failure reason?",
      options: [
        "It is the root cause of most startup failures",
        "It is usually the proximate cause; the root cause is upstream (market, model, team, competition, timing)",
        "It only applies to companies that raised venture capital",
        "It is rare: most startups fail with cash left",
      ],
      answer: 1,
      explanation: md`Almost all failed startups run out of money; the question is why. Post-mortems list cash alongside the root causes that produced it.`,
      concepts: ["fc01.failure-modes"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc01-l04-q2",
      type: "numeric",
      prompt: md`A plan has six independent must-go-right steps, each 85% likely. What is the joint probability of success? (3 decimals)`,
      answer: 0.377,
      tolerance: { abs: 0.002 },
      explanation: md`$0.85^6 = 0.3771$. Six "likely" steps give worse than a 40% chance. Shorten the chain before polishing each step.`,
      concepts: ["fc01.must-go-right"],
      difficulty: 1,
    },
    {
      id: "fc01-l04-q3",
      type: "decision",
      prompt: md`A chain has steps at 0.9, 0.8 and 0.5. You can raise any one step by 0.1 at the same cost. Which do you choose?`,
      options: [
        { text: "The 0.9 step, to make the strongest part bulletproof.", score: 0, feedback: "Gain factor 1.0/0.9 = 1.11: the smallest relative improvement." },
        { text: "The 0.5 step.", score: 1, feedback: "Gain factor 0.6/0.5 = 1.20, the largest. The joint probability rises from 0.36 to 0.432." },
        { text: "The 0.8 step.", score: 0.4, feedback: "Gain factor 0.9/0.8 = 1.125: better than the first, worse than the weakest link." },
      ],
      explanation: md`With a product of probabilities, the relative gain from $\Delta p$ is $\Delta p/p_i$, largest where $p_i$ is smallest.`,
      concepts: ["fc01.must-go-right"],
      difficulty: 2,
    },
    {
      id: "fc01-l04-q4",
      type: "order",
      prompt: "Order the steps of a pre-mortem.",
      items: [
        "State the plan and declare that it has failed by a given date",
        "Each person silently writes all the reasons for the failure",
        "Share reasons round-robin without debate",
        "Cluster into mechanisms and rate probability and impact",
        "Assign leading indicators, thresholds, owners and actions for the top risks",
      ],
      explanation: md`Silent writing before discussion avoids anchoring on the most senior voice; the session ends with owned actions, not a list.`,
      concepts: ["fc01.pre-mortem"],
      difficulty: 1,
    },
    {
      id: "fc01-l04-q5",
      type: "multi",
      prompt: "Which are root failure mechanisms rather than consequences? (Select all that apply.)",
      options: [
        "No market need",
        "Bank balance reached zero",
        "Cofounder conflict over direction",
        "Cost to win a customer exceeds what the customer is worth",
        "The company could not make payroll",
      ],
      answer: [0, 2, 3],
      explanation: md`A zero bank balance and missed payroll are consequences. Market need, team conflict and unit economics are mechanisms.`,
      concepts: ["fc01.failure-modes"],
      difficulty: 1,
    },
    {
      id: "fc01-l04-q6",
      type: "numeric",
      prompt: md`A pilot programme has a 30% chance of failing in a way that writes off EUR 120k of founder time and cash. What is the expected loss in EUR k?`,
      answer: 36,
      tolerance: { abs: 0.1 },
      unit: "EUR k",
      explanation: md`$EL = p\times L = 0.3\times120 = 36$ EUR k. Compare it with the cost of a mitigation: spending EUR 10k to halve $p$ saves EUR 18k in expectation.`,
      concepts: ["fc01.must-go-right", "fc01.base-rates"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc01-l04-f1", front: "Proximate vs root cause of startup death", back: "Proximate: ran out of cash. Root: no market need, broken business model, team, competition, timing, regulation.", concepts: ["fc01.failure-modes"] },
    { id: "fc01-l04-f2", front: "Most common root cause in published post-mortems", back: "No market need (about 35 to 42% of post-mortems depending on edition).", concepts: ["fc01.failure-modes", "fc01.base-rates"] },
    { id: "fc01-l04-f3", front: "Joint probability of five 80% steps", back: md`$0.8^5 = 0.33$.`, concepts: ["fc01.must-go-right"] },
    { id: "fc01-l04-f4", front: "Which step to improve in a must-go-right chain?", back: "The weakest link: relative gain is the improvement divided by the step's probability.", concepts: ["fc01.must-go-right"] },
    { id: "fc01-l04-f5", front: "Pre-mortem prompt", back: "'It is [date]. The venture failed. Write down why.' Silent writing first, then share.", concepts: ["fc01.pre-mortem"] },
    { id: "fc01-l04-f6", front: "Base rate", back: "How often an outcome happens in a reference class; start from it, then adjust for your specifics.", concepts: ["fc01.base-rates"] },
  ],
  scenarios: [
    {
      id: "fc01-s2",
      title: "The pilot that is quietly stalling",
      context: md`Illustrative situation. Mizan's soiling pilot was scoped three months ago. The data-access agreement is still unsigned; the plant team is friendly but says the request "is with management". Meanwhile Afterwave's YC decision is due and Suhail's January programme needs sponsors. You have about 12 hours a week for Mizan.`,
      start: "a",
      concepts: ["fc01.pre-mortem", "fc01.must-go-right", "fc01.failure-modes"],
      nodes: {
        a: {
          md: md`Omar suggests starting the analytics work on public satellite and weather data while waiting. What do you do?`,
          choices: [
            { text: "Agree: progress on the model keeps momentum.", score: 3, feedback: "It feels productive, but the chain's weak links are data access and conversion, not modelling. You are polishing the strongest step.", next: "b" },
            { text: "Treat the unsigned agreement as the trigger it is: ask who signs, what they need, and by when, and agree with Omar on a date after which the pilot is re-scoped or paused.", score: 9, feedback: "Uses the pre-mortem indicator and threshold. Escalating a blocker politely and early is the work.", next: "c" },
            { text: "Pause Mizan entirely until YC decides.", score: 4, feedback: "Defensible for focus, but silent pausing loses the relationship. If you pause, say so and set a restart date.", next: "c" },
          ],
        },
        b: {
          md: md`Six weeks later the model looks good on satellite data, but the agreement is still unsigned and the research partner asks whether the project is still active.`,
          choices: [
            { text: "Now escalate with a clear request and a date, and share the satellite-based preliminary result as a reason to proceed.", score: 6, feedback: "A recovery: the preliminary result can help, but six weeks were spent on the wrong link." },
          ],
        },
        c: {
          md: md`You learn that the signature sits with an approver who wants to know what the plant gets from the pilot and who owns the result. How do you respond?`,
          choices: [
            { text: "Send a one-page note: purpose, data needed and how it is protected, what the plant receives (a validated soiling loss estimate and cleaning recommendation), co-publication intent with the methodology partner, and a proposed signature date.", score: 10, feedback: "Answers the approver's actual questions and makes saying yes easy." },
            { text: "Ask the friendly plant engineer to push harder internally.", score: 3, feedback: "Puts your blocker on someone without authority and without the arguments the approver needs." },
          ],
        },
      },
    },
  ],
};

export default lesson;
