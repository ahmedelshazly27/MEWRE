import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc02-l01",
  title: "Discovery and problem framing",
  summary:
    "How to turn a hunch into a testable problem: problem statements that name a user, a situation and a measurable cost; assumption maps that rank what must be true by importance and evidence; and an evidence ladder that tells you which signals to trust.",
  minutes: 70,
  objectives: [
    "You can write a problem statement that names the user, the trigger situation, the current workaround and the measurable cost of the problem.",
    "You can decompose a venture idea into desirability, viability, feasibility and usability assumptions and place them on an assumption map.",
    "You can grade evidence on a ladder from opinion to paid commitment and say what would move an assumption up a rung.",
    "You can rank assumptions by risk exposure (probability the assumption is false times the cost of being wrong) and pick the next test.",
  ],
  concepts: [
    {
      id: "fc02.problem-statement",
      name: "Problem statement",
      description:
        "A short, falsifiable description of a problem: who has it, in what situation, what they do today, and what it costs them in time, money or risk. It contains no solution.",
      competency: "fc-product",
    },
    {
      id: "fc02.assumption-mapping",
      name: "Assumption mapping",
      description:
        "Listing everything that must be true for a product to succeed (desirability, viability, feasibility, usability) and plotting each assumption on importance versus evidence, so the important, unevidenced ones are tested first.",
      competency: "fc-product",
      related: ["fc02.problem-statement", "fc02.evidence-levels"],
    },
    {
      id: "fc02.evidence-levels",
      name: "Evidence levels",
      description:
        "A ladder of signal strength: opinions and compliments (weakest), stated past behaviour, observed behaviour and artefacts, time commitment, reputation commitment, and money or a signed pilot (strongest).",
      competency: "fc-product",
    },
    {
      id: "fc02.risk-exposure",
      name: "Assumption risk exposure",
      description:
        "Expected cost of building on an assumption that turns out false: probability it is false times the cost of being wrong. Used to rank which assumption to test next.",
      competency: "fc-product",
      related: ["fc02.assumption-mapping", "m08.emv"],
    },
    {
      id: "fc02.opportunity-solution-tree",
      name: "Opportunity solution tree",
      description:
        "Teresa Torres' structure linking one desired outcome to the customer opportunities (needs, pains) that could drive it, then to candidate solutions, then to the assumption tests for each solution.",
      competency: "fc-product",
      related: ["fc02.problem-statement"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "From hunch to testable problem",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You run three ventures with one constraint that dominates everything: your technical cofounders' build time. Every month Ismail and Yusuf spend building the wrong part of Lockstep or Ripple, or Omar spends wiring a dashboard that the Shagaya O&M team will not open, is a month of runway that does not come back. Discovery is the work you own that decides what gets built. Done well, it is the cheapest risk reduction in the company: a week of interviews and a map of assumptions costs almost nothing next to a quarter of engineering.`,
        },
        {
          kind: "md",
          md: md`### Discovery is risk reduction, not research

Product discovery is the part of product management that decides **what is worth building** before you pay for building it. Marty Cagan frames it as reducing four risks before delivery starts:

| Risk | Question | Who usually owns the answer |
|---|---|---|
| **Value (desirability)** | Will the customer choose it and pay for it? | You (founder, GTM) |
| **Viability** | Does it work for our business: pricing, sales motion, cost to serve, legal, security reviews? | You |
| **Feasibility** | Can we build it with the time, people and technology we have? | Technical cofounder |
| **Usability** | Can the user figure out how to use it in their real setting? | Shared, with the user |

For a seed-stage B2B company the first two kill far more products than the last two. A hardware test team will tolerate an ugly interface if Ripple saves them a week of regression testing; they will not tolerate a tool that their IT security review rejects, however elegant.

### The problem statement

A good problem statement is **falsifiable**: you could go and find out that it is wrong. It has five parts and no solution:

1. **Who**: a specific role in a specific kind of organisation ("validation lead at a drive-unit or humanoid-actuator test lab with 5 to 30 benches").
2. **Situation (trigger)**: when does the problem bite? ("after a firmware release candidate lands, before a design review").
3. **Current workaround**: what they do today, including doing nothing ("rerun the full regression suite, or pick tests from memory and a spreadsheet").
4. **Cost**: in units they already measure (bench-hours, days of schedule, escaped defects, EUR, kWh lost).
5. **Evidence**: how you know, and how strong that evidence is.

A useful template:

> **[Role]** at **[organisation type]**, when **[trigger]**, currently **[workaround]**, which costs **[quantity, unit, frequency]**. We believe this because **[evidence, with its level]**.

The test of a problem statement: if you swapped in your competitor's product name, would the statement still be true? It should be, because it describes the customer's world, not your product.

### Opportunity solution tree

Teresa Torres' **opportunity solution tree** keeps discovery honest by forcing a chain: one **outcome** (a metric the business needs to move) branches into **opportunities** (customer needs, pains, desires heard in interviews), each of which branches into candidate **solutions**, each of which carries **assumption tests**. Its value is that a solution can never float free: every feature idea must hang off an opportunity you heard from a real customer, and every opportunity must hang off an outcome you care about.`,
        },
        {
          kind: "flow",
          title: "The discovery loop",
          steps: [
            { label: "Outcome", detail: "Pick one business outcome, e.g. signed paid pilots per quarter" },
            { label: "Opportunities", detail: "Customer needs and pains heard in interviews, phrased in their words" },
            { label: "Problem statement", detail: "Who, trigger, workaround, cost, evidence; no solution" },
            { label: "Assumption map", detail: "Everything that must be true, plotted by importance and evidence" },
            { label: "Test riskiest", detail: "Cheapest test that moves the top-left assumption up the evidence ladder" },
            { label: "Decide", detail: "Persevere, pivot the solution, or drop the opportunity; update the tree" },
          ],
          caption: "Discovery is a loop run every week, not a phase that ends when building starts.",
        },
        {
          kind: "md",
          md: md`### Assumption mapping

David Bland's **assumption mapping** (from *Testing Business Ideas*, Bland and Osterwalder) is the tool that turns a pitch into a test plan. Write every assumption as a sentence that starts "We believe that...", tag it as desirability, viability or feasibility, then place it on two axes:

- **Importance**: if this is false, does the venture fail (high) or just need a tweak (low)?
- **Evidence**: do we have strong, observed evidence (high) or opinions and guesses (low)?

The top-left quadrant (important, little evidence) is where you spend the next week.`,
        },
        {
          kind: "matrix",
          title: "Assumption map",
          xAxis: ["Little evidence", "Strong evidence"],
          yAxis: ["Less important", "Critical to success"],
          cells: [
            { label: "Test now", detail: "Critical and unproven. Design the cheapest experiment this week. Example: test leads will let a capture app run on bench PCs on the lab network." },
            { label: "Build on it, monitor", detail: "Critical and proven. Treat as a foundation, recheck when the segment changes. Example: test teams already log DAQ data to files." },
            { label: "Park, revisit", detail: "Uncertain but not fatal if wrong. Note it, do not test yet. Example: users prefer dark mode." },
            { label: "Ignore", detail: "Known and not critical. Do not spend effort here." },
          ],
          caption: "Top-left first. Most founders spend their time in the top-right, collecting more evidence for what they already know.",
        },
        {
          kind: "md",
          md: md`### The evidence ladder

Not all evidence is equal. Rank what you hear by what it **cost the customer** to give it to you:

| Rung | Evidence | Example | Strength |
|---|---|---|---|
| 0 | Compliment, opinion about the future | "That sounds really useful, we would definitely use it" | Near zero |
| 1 | Stated past behaviour | "Last release we reran all 340 tests because we could not tell which were affected" | Weak to moderate |
| 2 | Observed behaviour, artefacts | They show you the spreadsheet they use to pick regression tests | Moderate |
| 3 | Time commitment | They book a 2-hour session with their bench data and two engineers | Moderate to strong |
| 4 | Reputation commitment | They introduce you to their head of validation or IT security | Strong |
| 5 | Money or signed pilot | Purchase order, paid pilot, signed letter of intent with a budget line | Strongest |

Two rules follow. First, **future-tense statements are rung 0** no matter how enthusiastic. Second, **you move up the ladder by asking for the next commitment**, not by asking more questions (lesson 2 covers this as "advancement").

### Ranking with risk exposure

When the map has several top-left assumptions, rank them by **risk exposure**, the same expected-value logic as a project risk register:`,
        },
        { kind: "equation", formula: "fc02-risk-exposure" },
        {
          kind: "md",
          md: md`$P_{\text{false}}$ is your honest probability that the assumption is wrong given current evidence; $C_{\text{wrong}}$ is what you lose if you build on it and it is wrong (engineering time, runway, a burned pilot account). Test the highest $RE$ first, but prefer a cheap test: the ratio $RE / C_{\text{test}}$ tells you where a euro of discovery buys the most risk reduction.`,
        },
        {
          kind: "xref",
          to: "m08.emv",
          note: "Risk exposure is the same probability-times-impact logic as expected monetary value in a project risk register (Track 0, m08).",
        },
      ],
    },
    {
      layer: "applied",
      title: "Framing Ripple and ranking its assumptions",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Problem statement and assumption ranking for Ripple (illustrative)",
          given: md`Ripple is Afterwave's change-impact engine: after a firmware, model or rig change, which tests to rerun and why. You are deciding what to validate before the team commits roughly 4 months of build. **All numbers are illustrative.** Assume a loaded engineering cost of EUR 12k per engineer-month for the founding team's time.`,
          steps: [
            {
              md: md`**Write the problem statement without the solution.**

> Validation leads at drive-unit and actuator test labs with 5 to 30 benches, when a firmware release candidate arrives before a design review, currently rerun the full regression suite or pick tests by memory and a spreadsheet. A full rerun ties up benches for about 4 days per release; picking by memory lets regressions escape to the next gate. We believe this from stated past behaviour (rung 1) in early conversations; we have not yet seen the spreadsheet or bench schedule (rung 2).

Note what it does not say: nothing about dependency graphs, machine learning or Ripple.`,
            },
            {
              md: md`**List the assumptions and tag them.**

| # | We believe that... | Type |
|---|---|---|
| A1 | Release-driven regression reruns cost labs at least 3 bench-days per release | Desirability |
| A2 | Labs keep enough structured history (test results, firmware versions, rig config) to infer test-to-change links | Feasibility |
| A3 | A validation lead can approve a pilot without a 6-month IT security review if Ripple runs inside Enclave on their servers | Viability |
| A4 | Engineers will trust a "skip these tests" recommendation if each one shows its reason | Desirability / usability |
| A5 | The buyer has a budget line for test tooling of at least EUR 50k per year | Viability |`,
            },
            {
              md: md`**Estimate probability false and cost of being wrong.** If A2 is false, Ripple has nothing to learn from; the 4-month build (3 engineers) is largely wasted: $C = 4 \times 3 \times 12 = 144$ kEUR. If A4 is false, the build still works technically but adoption fails; most of the build is lost too, but some data plumbing survives: say 100 kEUR.

| # | $P_{\text{false}}$ | $C_{\text{wrong}}$ (kEUR) | $RE$ (kEUR) |
|---|---|---|---|
| A1 | 0.25 | 144 | 36 |
| A2 | 0.50 | 144 | 72 |
| A3 | 0.40 | 80 | 32 |
| A4 | 0.35 | 100 | 35 |
| A5 | 0.30 | 60 | 18 |`,
            },
            {
              md: md`**Pick the test.** A2 has the highest exposure (72 kEUR). The cheapest test that moves it up the ladder: ask two labs to export one quarter of test results and firmware versions (rung 3, a time commitment) and have Yusuf spend 3 days checking whether test-to-change links can be inferred. Cost: about 3 engineer-days plus your time, under 2 kEUR. $RE/C_{\text{test}} \approx 72/2 = 36$: every euro of testing addresses about 36 euros of expected loss.`,
            },
          ],
          result: md`The map says: do not start the 4-month build until A2 (data exists and is usable) has rung-3 evidence from at least two labs. A1 is less risky than it feels because you have heard it repeatedly; A3 is next once A2 passes.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Ranking Mizan soiling-analytics assumptions (illustrative)",
          given: md`Mizan is preparing a soiling analytics pilot targeting Shagaya Phase I's PV plant (about 11 MW, reported as cleaned monthly with water in a 2020 study). Two assumptions are top-left on the map. **Illustrative numbers.**

- B1: "SCADA data at the plant (inverter power, irradiance, module temperature) is accessible at 15-minute resolution or better." $P_{\text{false}} = 0.45$; if false, 2 months of Omar's analytics work (EUR 10k per month loaded) are wasted plus a pilot slot lost, valued at EUR 15k.
- B2: "The O&M team will change cleaning timing based on our recommendation." $P_{\text{false}} = 0.30$; if false, the pilot produces a paper but no operational value: cost EUR 20k.`,
          steps: [
            { md: md`Cost of being wrong for B1: $C = 2 \times 10 + 15 = 35$ kEUR.` },
            {
              md: md`Risk exposure B1: $RE_1 = 0.45 \times 35$.`,
              hidden: true,
              check: { prompt: "Risk exposure of B1", answer: 15.75, unit: "kEUR", tolerance: { abs: 0.1 } },
            },
            {
              md: md`Risk exposure B2: $RE_2 = 0.30 \times 20$.`,
              hidden: true,
              check: { prompt: "Risk exposure of B2", answer: 6, unit: "kEUR", tolerance: { abs: 0.05 } },
            },
            { md: md`B1 comes first: $15.75 > 6$. Test: ask KISR researchers for a one-week sample export before agreeing the pilot scope. If the data cannot be exported, the pilot design changes (for example, to a soiling station plus manual readings).` },
          ],
          result: md`Test data access before methodology. A data-access test costs a polite email and a week; discovering it in month two costs the pilot.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Running discovery in practice",
      blocks: [
        {
          kind: "md",
          md: md`### Who does what

- **You** own the opportunity space: interviews, problem statements, the assumption map, and the decision to persevere or drop. Keep one living document per venture (a page, not a deck) with the current problem statement, the map and the evidence log.
- **Technical cofounders** own feasibility assumptions and should score $P_{\text{false}}$ for them. Ask them; do not guess.
- **Customers** give evidence. Log every piece with its rung and date.

### Tools

A shared doc or whiteboard (Miro, FigJam) for the map; a simple table for the evidence log (assumption, evidence, rung, source, date); a calendar for weekly discovery slots. Torres recommends touching customers **every week**, in small doses, rather than a research phase every six months.

### What goes wrong`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Three classic failures",
          md: md`**Solution-shaped problem statements.** "Test labs need an AI change-impact engine" is a solution wearing a problem costume. If the sentence contains your product category, rewrite it.

**Evidence inflation.** Counting ten enthusiastic conversations as validation. Ten rung-0 signals are still rung 0.

**Mapping only desirability.** Founders from engineering often skip viability: who signs, from which budget, through which security or procurement process. For Mizan, public tendering and government buyers make viability assumptions (who can contract a pilot, under which threshold) as important as the analytics.`,
        },
        {
          kind: "checklist",
          title: "Problem statement check",
          items: [
            "Names a role and organisation type narrow enough that you could list 20 real people who fit it.",
            "States a trigger situation (when the problem bites), not a permanent condition.",
            "Describes today's workaround, including doing nothing.",
            "Quantifies the cost in a unit the customer already tracks.",
            "States the evidence and its rung on the ladder.",
            "Contains no product name, feature or technology.",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask your technical cofounder about the map",
          items: [
            "Which feasibility assumption would you bet against, and what is your probability it fails?",
            "What is the smallest spike (days, not weeks) that would tell us if the data we need exists?",
            "If this assumption is false, how much of the build survives and is reusable?",
            "Which assumption, if wrong, would change the architecture rather than just a feature?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc02-l01-p1",
            type: "short",
            prompt: md`For **Mizan's soiling analytics pilot** at Shagaya Phase I, produce: (1) a problem statement in the five-part template (who, trigger, workaround, cost, evidence with rung); (2) an assumption list of at least five "We believe that..." statements tagged desirability, viability or feasibility; (3) your top two assumptions by risk exposure with $P_{\text{false}}$ and $C_{\text{wrong}}$ (illustrative numbers, labelled), and (4) the cheapest test for the top one with what result would make you stop.`,
            rubric: [
              "Problem statement names a specific role and organisation (e.g. O&M or plant manager, KISR researchers) and a trigger, with no solution or product name in it.",
              "Cost is quantified in a unit the customer uses (soiling loss %, MWh, cleaning cost, water) and labelled illustrative where assumed.",
              "At least five assumptions covering all three of desirability, viability and feasibility, including a data-access or procurement assumption.",
              "Risk exposure is computed correctly as probability false times cost of being wrong, and the ranking follows from the numbers.",
              "The proposed test is cheap relative to the exposure, moves the assumption up the evidence ladder, and has a stated kill or pivot criterion.",
            ],
            modelAnswer: md`**Problem statement.** Plant and O&M managers at desert PV plants such as Shagaya Phase I, when dust events and dry periods build soiling between scheduled cleanings, currently clean on a fixed calendar (reported as monthly water cleaning) regardless of measured soiling. This loses energy between cleanings and spends water and crew time when panels are still fairly clean. Illustrative cost: if average soiling loss is 5% on an 11 MW plant producing about 19 GWh a year, about 0.95 GWh a year is lost. Evidence: published study of the plant's cleaning practice (rung 2, artefact) and no conversation yet with the current O&M team about how cleaning dates are set (gap).

**Assumptions.**
1. Desirability: the O&M team would move cleaning dates based on a soiling estimate.
2. Desirability: KISR researchers value a co-authored validation of soiling inference from operational data.
3. Feasibility: inverter power, POA irradiance and module temperature are logged at 15-minute or finer resolution and can be exported.
4. Feasibility: soiling loss can be inferred from operational data to within about 1 percentage point of a reference soiling measurement.
5. Viability: a pilot can be contracted under a research collaboration or a value below the threshold that triggers a full public tender.
6. Viability: results at 11 MW will be credible to buyers of GW-scale plants.

**Top two by exposure (illustrative).** A3 data access: $P_{\text{false}} = 0.45$, $C_{\text{wrong}} = 35$ kEUR (two months of analytics plus a lost pilot slot), $RE = 15.75$ kEUR. A5 contracting route: $P_{\text{false}} = 0.40$, $C_{\text{wrong}} = 25$ kEUR (months of preparation for a pilot that cannot be signed), $RE = 10$ kEUR.

**Test for A3.** Ask the KISR contact for a one-week export of the three tags at native resolution, plus the tag list. Cost: one email and an hour of review. Stop or redesign if no export is possible within three weeks or resolution is coarser than hourly: then the pilot needs a soiling station or reference cell, which changes cost and scope.`,
            explanation: md`A strong answer keeps the problem statement free of the solution, covers viability (contracting route, credibility at scale) as well as feasibility, and lets the risk-exposure numbers decide the first test. Data access is almost always the first test for an analytics pilot on someone else's plant.`,
            concepts: ["fc02.problem-statement", "fc02.assumption-mapping", "fc02.risk-exposure", "fc02.evidence-levels"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to Omar, in under two minutes, why ten enthusiastic conversations with plant engineers are not yet evidence that Mizan should build the soiling dashboard, and what evidence would be.",
          keyPoints: [
            "Enthusiasm and future-tense statements cost the speaker nothing, so they are rung 0 on the evidence ladder.",
            "Evidence is behaviour: past actions, artefacts they show you, and commitments of time, reputation or money.",
            "The useful next step is to ask for a commitment, such as a data export or an introduction to the decision-maker.",
            "Which assumptions matter most depends on importance and current evidence: the assumption map, not the loudest conversation.",
          ],
        },
        { kind: "sources", refs: ["fc02-r4", "fc02-r2", "fc02-r3"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc02-l01-q1",
      type: "mcq",
      prompt: md`Which is the best problem statement?`,
      options: [
        "Hardware test labs need an AI-powered change-impact engine.",
        "Validation leads at actuator test labs, when a firmware release candidate lands, rerun the full regression suite, tying up benches for about 4 days per release (stated by 3 of 5 leads interviewed).",
        "Test automation is a large and growing market, and existing tools are outdated.",
        "Engineers would love a tool that tells them which tests to skip.",
      ],
      answer: 1,
      explanation: md`Option B names a role, a trigger, the workaround, a quantified cost and the evidence. A is a solution, C is a market claim, D is a rung-0 opinion about the future.`,
      concepts: ["fc02.problem-statement"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc02-l01-q2",
      type: "order",
      prompt: md`Order these signals from weakest to strongest evidence.`,
      items: [
        "\"This would be really useful for us.\"",
        "\"Last quarter we lost two weeks to a full regression rerun.\"",
        "They share the spreadsheet they use to pick tests.",
        "They book a two-hour session with two engineers and their data.",
        "They introduce you to their head of IT security.",
        "They sign a paid pilot.",
      ],
      explanation: md`Evidence strength tracks what it costs the customer: an opinion costs nothing, past facts cost a little honesty, artefacts and time cost effort, introductions put their reputation on the line, and money is the strongest commitment.`,
      concepts: ["fc02.evidence-levels"],
      difficulty: 1,
    },
    {
      id: "fc02-l01-q3",
      type: "numeric",
      prompt: md`An assumption has a 35% chance of being false. If it is false, you lose 3 engineer-months at EUR 12k each plus EUR 9k of pilot costs. What is its risk exposure in kEUR?`,
      answer: 15.75,
      tolerance: { abs: 0.1 },
      unit: "kEUR",
      explanation: md`$C_{\text{wrong}} = 3 \times 12 + 9 = 45$ kEUR; $RE = 0.35 \times 45 = 15.75$ kEUR.`,
      concepts: ["fc02.risk-exposure"],
      difficulty: 2,
    },
    {
      id: "fc02-l01-q4",
      type: "mcq",
      prompt: md`On an assumption map, which quadrant should you test first?`,
      options: [
        "Critical to success, strong evidence",
        "Critical to success, little evidence",
        "Less important, little evidence",
        "Less important, strong evidence",
      ],
      answer: 1,
      explanation: md`Important and unproven is where being wrong is both likely and costly. Gathering more evidence for what is already proven feels productive but buys little risk reduction.`,
      concepts: ["fc02.assumption-mapping"],
      difficulty: 1,
    },
    {
      id: "fc02-l01-q5",
      type: "multi",
      prompt: md`Which are **viability** assumptions for Afterwave Enclave? (Select all.)`,
      options: [
        "Customer IT security teams will approve on-prem deployment within one quarter.",
        "The team can containerise the capture and model services to run offline.",
        "Test organisations have a budget line for test infrastructure software.",
        "Engineers will find the bench timeline view intuitive.",
        "Pricing per bench covers the cost of supporting on-prem installs.",
      ],
      answer: [0, 2, 4],
      explanation: md`Viability is about whether the business works: approvals, budgets, pricing versus cost to serve. Containerising is feasibility; intuitiveness is usability.`,
      concepts: ["fc02.assumption-mapping"],
      difficulty: 2,
    },
    {
      id: "fc02-l01-q6",
      type: "decision",
      prompt: md`Five test leads told you Ripple "sounds great". Your technical cofounder asks whether to start the 4-month build. What do you say?`,
      options: [
        { text: "Yes: five out of five is strong validation.", score: 0, feedback: "Five rung-0 signals are still rung 0. Nothing cost them anything." },
        { text: "Not yet: first get two labs to share a quarter of test and firmware history and check whether test-to-change links can be inferred, then decide.", score: 1, feedback: "Tests the highest-exposure feasibility assumption cheaply and asks for a real commitment at the same time." },
        { text: "Run a survey of 200 test engineers to get statistical significance.", score: 0.3, feedback: "More opinions at scale. Better than nothing for sizing, but it does not test whether the data exists or whether anyone will commit." },
        { text: "Build a quick prototype UI to show them.", score: 0.4, feedback: "Can help later for usability, but it skips the riskiest assumption: whether the underlying data exists." },
      ],
      explanation: md`The decision rests on the highest risk exposure, not on volume of enthusiasm. A cheap data test plus a time commitment moves the key assumption from rung 0 to rung 3.`,
      concepts: ["fc02.evidence-levels", "fc02.risk-exposure"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "fc02-l01-f1", front: "Five parts of a problem statement", back: "Who, trigger situation, current workaround, quantified cost, evidence (with its rung). No solution.", concepts: ["fc02.problem-statement"] },
    { id: "fc02-l01-f2", front: "The two axes of an assumption map", back: "Importance (how fatal if false) and evidence (how proven). Test the important, low-evidence quadrant first.", concepts: ["fc02.assumption-mapping"] },
    { id: "fc02-l01-f3", front: "Risk exposure of an assumption", back: md`$RE = P_{\text{false}} \times C_{\text{wrong}}$. Rank tests by $RE$ per unit of test cost.`, concepts: ["fc02.risk-exposure"] },
    { id: "fc02-l01-f4", front: "Why is \"we would definitely use this\" rung 0?", back: "It is a future-tense opinion that cost the speaker nothing. Only behaviour and commitments are evidence.", concepts: ["fc02.evidence-levels"] },
    { id: "fc02-l01-f5", front: "Cagan's four product risks", back: "Value (desirability), viability, feasibility, usability.", concepts: ["fc02.assumption-mapping"] },
    { id: "fc02-l01-f6", front: "Opportunity solution tree levels", back: "Outcome, opportunities (customer needs), solutions, assumption tests.", concepts: ["fc02.opportunity-solution-tree"] },
  ],
};

export default lesson;
