import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc09-l06",
  title: "Decision making under uncertainty: expected value, reversibility, base rates, pre-mortems and decision journals",
  summary:
    "Make better bets with less information: compute expected value and know when it is not enough (variance and ruin), classify decisions as reversible or irreversible and set the speed accordingly, price information with the expected value of perfect information, start from base rates and update with Bayes, run pre-mortems, and keep a decision journal scored with the Brier score.",
  minutes: 80,
  objectives: [
    "Compute expected value and dispersion for a venture decision and explain when the lower-EV option is right",
    "Classify decisions by reversibility and stakes, and match the process to the class",
    "Compute the expected value of perfect information and use it to cap what you pay for a pilot or study",
    "Update a base rate with evidence using Bayes' rule in odds form",
    "Run a pre-mortem and keep a decision journal scored with the Brier score",
  ],
  concepts: [
    { id: "fc09.expected-value", name: "Expected value and its limits", description: "Probability-weighted average outcome; the right criterion for repeated, survivable bets, but not when a bad outcome is ruinous or irreversible.", competency: "fc-ops", related: ["m08.emv"] },
    { id: "fc09.reversibility", name: "Reversible and irreversible decisions", description: "Two-way doors (cheap to undo) should be made fast and delegated; one-way doors (costly or impossible to undo) deserve slow, deliberate process (Bezos's Type 2 and Type 1 decisions).", competency: "fc-ops", related: ["fc09.expected-value", "fc09.delegation"] },
    { id: "fc09.value-of-information", name: "Value of information", description: "The expected value of perfect information (EVPI) is the most any test, pilot or study can be worth; buy information only when it costs less and resolves the uncertainty in time.", competency: "fc-ops", related: ["fc09.expected-value"] },
    { id: "fc09.base-rates", name: "Base rates and the outside view", description: "Start a forecast from how similar cases turned out (the reference class), then adjust with case-specific evidence using Bayes' rule.", competency: "fc-ops", related: ["fc09.expected-value", "m08.monte-carlo"] },
    { id: "fc09.premortem", name: "Pre-mortem", description: "Before committing, the team imagines the decision has failed and writes down why; it surfaces risks that optimism and hierarchy suppress (Klein, 2007).", competency: "fc-ops", related: ["fc09.reversibility"] },
    { id: "fc09.decision-journal", name: "Decision journal and calibration", description: "A written record of each significant decision, the options, the expected outcome with probabilities and the reasoning, reviewed later to separate decision quality from luck and to measure calibration with the Brier score.", competency: "fc-ops", related: ["fc09.base-rates", "fc09.written-culture"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "The tools of a good bet",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Most of your decisions are made with incomplete information: whether to base Afterwave in Zurich or the Netherlands, when to build Afterwave's own test platform, whether Mizan should accept an exclusive distribution deal, how much to bet on a Suhail event before sponsors commit. You will make hundreds of these across three ventures. You cannot remove the uncertainty, but you can make the bets consistently, spend time where it matters (the irreversible ones), and learn from outcomes without being fooled by luck.`,
        },
        {
          kind: "md",
          md: md`### Expected value, and when it is not enough

For a decision with outcomes $x_i$ of probability $p_i$:`,
        },
        { kind: "equation", formula: "fc09-expected-value" },
        {
          kind: "md",
          md: md`EV is the right criterion when you face many similar, independent bets and can survive the bad ones: the averages then work in your favour. It is the wrong criterion, on its own, when one bad outcome is **ruinous** (it ends the company or a key relationship) or **irreversible**. A seed-stage company cannot average over many parallel lives. So look at the whole distribution: EV, the spread (standard deviation), and the worst case against your cash and runway. This is the same logic as expected monetary value in a project risk register, applied to the company.

### Reversible and irreversible decisions

Jeff Bezos's 2015 letter to Amazon shareholders separates **Type 1** decisions (one-way doors: consequential and hard to reverse) from **Type 2** decisions (two-way doors: if you are wrong, you walk back through). Type 1 decisions deserve slow, careful process. Type 2 decisions should be made quickly, by individuals or small teams close to the information, with perhaps 70% of the information you wish you had.

Large organisations err by treating Type 2 decisions as Type 1. Founders more often err the other way: signing an exclusive agreement, a long lease, an equity grant or a domicile choice as quickly as a pricing test.`,
        },
        {
          kind: "matrix",
          title: "Match the process to the decision",
          xAxis: ["Low stakes", "High stakes"],
          yAxis: ["Reversible", "Irreversible"],
          cells: [
            { label: "Avoid or make cheaply reversible", detail: "Low-stakes but sticky: long tool contracts, public naming. Look for an exit clause or a trial." },
            { label: "Slow and deliberate (Type 1)", detail: "Exclusive deals, domicile, cofounder equity, large capex: base rates, pre-mortem, written memo, sleep on it" },
            { label: "Decide now, delegate", detail: "Email copy, meeting formats, small tool choices: no meeting needed" },
            { label: "Decide fast, measure (Type 2)", detail: "Pricing tests, pilot scope, event format: decide in days, set a review date, reverse if wrong" },
          ],
          caption: "Top row: hard to reverse. Right column: high stakes. Most decisions belong in the bottom row and should be fast; spend your deliberation budget on the top right.",
        },
        {
          kind: "md",
          md: md`### The value of information

Before paying for a pilot, a market study or a few months of waiting, ask what perfect knowledge of the uncertain variable would be worth. The **expected value of perfect information** is the gain from being able to choose after seeing the outcome:`,
        },
        { kind: "equation", formula: "fc09-evpi" },
        {
          kind: "md",
          md: md`EVPI is a ceiling. Real information is imperfect and arrives late, so a test is worth buying only if it costs well under EVPI and resolves the question before the decision window closes.

### Base rates first, then evidence

Kahneman and Lovallo (1993) described the **inside view** (reasoning from the specifics of your plan, which is almost always optimistic) and the **outside view** (asking how similar cases turned out). Start every forecast from a base rate for a reference class, then update. Bayes' rule in odds form makes the update mechanical:`,
        },
        { kind: "equation", formula: "fc09-bayes-odds" },
        {
          kind: "md",
          md: md`The **likelihood ratio** is how much more often you would see this evidence if the hypothesis were true than if it were false. A signal that appears just as often either way (LR = 1) should not move you at all, however vivid it is.

### Pre-mortems

Gary Klein's **pre-mortem** (Harvard Business Review, 2007) reverses the usual review. Before committing, the team is told: "It is a year from now. We did this, and it failed badly. Take five minutes and write down every reason why." Klein reports that this prospective hindsight surfaces more and more specific risks than asking "what could go wrong?", because it makes raising doubts the assignment rather than disloyalty.

### Decision journals and calibration

Outcomes mix decision quality with luck; Annie Duke (*Thinking in Bets*) calls judging a decision by its outcome "resulting". A **decision journal** records, at the time, what you decided, the options, what you expected (with probabilities) and why. Reviewed months later, it lets you separate bad decisions from bad luck. If you write probabilities, you can score your calibration:`,
        },
        { kind: "equation", formula: "fc09-brier-score" },
        {
          kind: "widget",
          widget: "monte-carlo",
          caption: "Base rates for timelines. Model an enterprise pilot as three activities: security review (min 4, likely 8, max 16 weeks), pilot run (8, 12, 20) and procurement to signature (4, 8, 20). Run it and compare P50 and P80 with the sum of the 'likely' values (28 weeks): plan cash on P80, not on the most likely case.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Afterwave's test platform and a Bayes update on pilots",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Build Afterwave's first instrumented test platform now, or wait?",
          given: md`Illustrative numbers only; Afterwave's own hardware test platforms are a later product. Option A: build now for EUR 250,000. Option B: wait six months, run paid pilots on customer benches to learn demand, then build only if demand is there. Demand for test-as-a-service is high (p = 0.3), medium (0.4) or low (0.3). Value (NPV, EUR k): build now 900 / 100 / -200 (the -200 assumes partial recovery by reselling equipment); wait 700 / 50 / 0 (later start loses value; in the low case you do not build). Cash EUR 600,000; net burn EUR 45,000/month.`,
          steps: [
            { md: md`**EV of building now:** $0.3 \times 900 + 0.4 \times 100 + 0.3 \times (-200) = 270 + 40 - 60 = 250$ k EUR.` },
            { md: md`**EV of waiting:** $0.3 \times 700 + 0.4 \times 50 + 0.3 \times 0 = 210 + 20 + 0 = 230$ k EUR. On EV alone, building now wins by 20 k.` },
            { md: md`**Spread:** standard deviation 443 k for building now, 308 k for waiting. Building now has a 30% chance of losing 200 k: cash falls to EUR 400,000 and runway from 13.3 to $400/45 = 8.9$ months, which forces an early raise from weakness.` },
            { md: md`**EVPI:** with perfect information you would build in the high and medium cases and not in the low case, with no delay: $0.3 \times 900 + 0.4 \times 100 + 0.3 \times 0 = 310$ k. $\text{EVPI} = 310 - 250 = 60$ k EUR. Waiting six months to learn costs $310 - 230 = 80$ k, more than perfect information is worth, so slow learning is the wrong way to buy it.` },
            { md: md`**A third option:** a six-week pre-sale campaign (letters of intent for test-as-a-service slots) costing EUR 10,000, which reveals the demand state with little delay: say 850 / 90 / 0. EV $= 0.3 \times 850 + 0.4 \times 90 + 0 - 10 = 255 + 36 - 10 = 281$ k EUR, higher than either option and with no loss state.` },
          ],
          result: md`Build now has the higher EV (250 k versus 230 k) but a 30% chance of a loss that cuts runway to 8.9 months; waiting is safer but pays too much (80 k) for information worth at most 60 k. The best move is to buy the information fast and cheaply (pre-sales, EV 281 k, illustrative). The general lesson: when the irreversible option is attractive but risky, look for a cheap, fast test that costs well under EVPI.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Updating a pilot's chance of converting",
          given: md`Illustrative base rate, not a published statistic: in your reference class (enterprise pilots of test software at hardware companies), 25% convert to a paid annual contract. Evidence 1: the champion has a named budget line for next year; you judge this three times as common among pilots that convert as among those that do not (LR = 3). Evidence 2, a month later: the champion misses two scheduled reviews (LR = 0.5).`,
          steps: [
            { md: md`**Prior odds:** $0.25/0.75 = 0.333$.` },
            { md: md`**After evidence 1:** odds $= 0.333 \times 3 = 1.0$, probability $= 1.0/(1 + 1.0)$.` },
            { md: md`$= 0.50$, a 50% chance of conversion.`, hidden: true, check: { prompt: "Probability after the budget-line evidence", answer: 0.5, tolerance: { abs: 0.005 } } },
            { md: md`**After evidence 2:** odds $= 1.0 \times 0.5 = 0.5$, probability $= 0.5/1.5$.` },
            { md: md`$= 0.33$, back near the base rate.`, hidden: true, check: { prompt: "Probability after the missed reviews", answer: 0.333, tolerance: { abs: 0.005 } } },
          ],
          result: md`Base rate 25%, up to 50% on a strong budget signal, down to 33% when engagement fades (illustrative). Writing the likelihood ratios down forces you to ask how diagnostic each signal really is, instead of letting the most recent call set your forecast.`,
        },
        {
          kind: "question",
          question: {
            id: "fc09-l06-p1",
            type: "numeric",
            prompt: md`Your decision journal has four forecasts with outcomes: 0.9 (happened), 0.7 (happened), 0.2 (did not happen), 0.6 (did not happen). What is your Brier score? (3 decimals)`,
            answer: 0.125,
            tolerance: { abs: 0.001 },
            explanation: md`$BS = [(0.9-1)^2 + (0.7-1)^2 + (0.2-0)^2 + (0.6-0)^2]/4 = (0.01 + 0.09 + 0.04 + 0.36)/4 = 0.50/4 = 0.125$. Lower is better; always saying 50% scores 0.25. The 0.6 forecast that did not happen contributes most.`,
            concepts: ["fc09.decision-journal"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Making decisions in practice",
      blocks: [
        {
          kind: "md",
          md: md`### The decision memo (for one-way doors)

One to two pages, written before the meeting:

1. **The decision** in one sentence, and the date it must be made by.
2. **Reversibility and stakes:** what it costs to undo, and how.
3. **Options** (at least three, including "do nothing" and a cheap test).
4. **Base rates:** how similar decisions turned out elsewhere.
5. **EV and worst case** for each option, with probabilities labelled as estimates.
6. **Pre-mortem results:** the top failure reasons and mitigations.
7. **Recommendation**, who decides, and when it will be reviewed.

### The decision journal entry (for every significant decision)

Date; decision; options considered; what I expect to happen, with probabilities; key assumptions; how I feel (tired, rushed, excited); review date. Five minutes to write. Review quarterly: mark each as good or bad decision, separately from good or bad outcome.

### Running a pre-mortem in 30 minutes

Brief the decision (5 min); everyone writes failure reasons silently (5 min); round-robin, one reason each until exhausted, the most junior person first (10 min); pick the top three and assign a mitigation or a tripwire to each (10 min).`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How decisions go wrong",
          md: md`- **Resulting:** concluding a decision was bad because the outcome was bad (or good because you got lucky).
- **The inside view:** forecasting a pilot's timeline from your plan instead of from how long similar pilots took.
- **Treating one-way doors as two-way:** exclusivity, long commitments and equity grants made in a hurry.
- **Ignoring ruin:** choosing the highest-EV option when its bad case ends the company.
- **Vivid evidence with LR near 1:** an enthusiastic meeting moves your forecast, though unenthusiastic buyers are often enthusiastic in meetings too.
- **Paying more for information than it is worth:** months of waiting or an expensive study when EVPI is small.`,
        },
        { kind: "sources", refs: ["fc09-r24", "fc09-r25", "fc09-r26", "fc09-r27", "fc09-r28", "fc09-r29"] },
        {
          kind: "checklist",
          title: "Before any one-way-door decision",
          items: [
            "Is it really irreversible? Can it be made reversible (trial period, exit clause, smaller first step)?",
            "Base rate from a reference class written down",
            "EV and worst case computed for at least three options, including a cheap test",
            "Worst case checked against cash and runway",
            "Pre-mortem held; top three risks have a mitigation or a tripwire",
            "Decision journal entry written, with probabilities and a review date",
          ],
        },
        { kind: "xref", to: "m08-l05", note: "Risk registers, expected monetary value and Monte Carlo schedule analysis from Track 0 use the same mathematics at project scale." },
        { kind: "scenario", scenario: "fc09-s3" },
        {
          kind: "question",
          question: {
            id: "fc09-l06-p2",
            type: "short",
            prompt: md`Write a **decision memo** for a real one-way-door decision: where Afterwave should be based and incorporated for 2027 (the team is considering Zurich; the alternative is the Netherlands; a US structure may follow from YC). Use the seven-part structure: decision and deadline; reversibility and stakes; at least three options including a cheap test or a staged option; base rates or reference facts; EV or scored comparison with labelled illustrative probabilities and the worst case; pre-mortem with the top three failure reasons and mitigations; recommendation, decider and review date. Add the decision journal entry you would write. Only use facts you can source; label everything else as an assumption.`,
            rubric: [
              "States the decision, the deadline and why it is a one-way (or partly reversible) door, with the cost of undoing it",
              "Offers at least three options including a staged or cheap-test option",
              "Uses sourced reference facts where available (for example minimum capital: Dutch BV effectively EUR 0.01, Swiss GmbH CHF 20,000, Swiss AG CHF 100,000; the planned Dutch 2027 option tax regime) and labels assumptions",
              "Compares options with labelled probabilities or scores and considers the worst case against runway",
              "Includes a pre-mortem with three specific failure reasons and mitigations",
              "Ends with a recommendation, a named decider, a review date and a decision journal entry with probabilities",
            ],
            modelAnswer: md`**Decision.** Where to base and incorporate Afterwave's main operating company for 2027. Deadline: before the first priced round or before the first employee contracts, whichever is first (assumption: Q1 2027).

**Reversibility and stakes.** Partly reversible: a holding company can be added or moved later, but redomiciling after a priced round means legal and tax costs, investor consent and possible tax on transfer of IP (assumption: tens of thousands of EUR and months of founder time). Stakes: hiring pool, investor access, employee option taxation, customer proximity, the founders' own residence and tax.

**Options.**
1. Dutch BV now (minimum capital effectively EUR 0.01 since 2012; notarial deed and KvK registration).
2. Swiss entity in Zurich now (GmbH requires CHF 20,000 paid-in capital; AG CHF 100,000 minimum with at least CHF 50,000 paid in).
3. Staged: Dutch BV now as operating company; decide on a Swiss or US holding only when a lead investor or YC outcome requires it, keeping IP assignments clean so a flip is simple.

**Reference facts.** If Afterwave is accepted to YC, the standard deal invests through a post-money SAFE and YC companies typically use a US (Delaware) parent; check the current YC requirements. The Netherlands plans a new employee option regime from 1 January 2027 (65% of the gain taxed, tax deferred to sale), still to be confirmed.

**Comparison (illustrative probabilities and scores, 1 to 5).** Scenarios: YC acceptance (p = 0.15, assumption), European seed lead (0.5), slower path with grants and angels (0.35). Option 3 scores highest in expectation because it is cheap in every scenario and costs little to change: in the YC case a US parent is added above the BV; in the European case the BV is fine for most EU funds; in the slow case it is the cheapest. Worst case for option 2: CHF 20,000 or more locked in capital plus higher costs while burn is EUR 45,000 a month (illustrative), about half a month of runway, and a structure investors may want changed anyway.

**Pre-mortem.** (1) "We redomiciled after the seed and it took four months of founder time." Mitigation: clean IP assignment from all founders and contractors now; simple cap table; no exotic share classes. (2) "Our best candidates were in Zurich and we could not offer competitive options." Mitigation: check Swiss employment and option options before the first Zurich hire; consider a Swiss subsidiary for employment. (3) "We chose by founder preference, not by where customers and investors are." Mitigation: list target customers and leads by country before deciding.

**Recommendation.** Option 3, decided by the three founders jointly (unanimous, as it affects all of them), reviewed after the YC W27 decision and again at the first term sheet.

**Decision journal entry.** Date: November 2026. Decided: Dutch BV operating company, staged holding decision. Expect: 70% that no restructuring is needed before Series A; 15% that a US flip is needed within 12 months (YC path); 15% that a Swiss entity is added for hiring. Assumptions: founders' residence unchanged; IP assigned cleanly. State: rested, not rushed. Review: after YC decision.`,
            explanation: md`The strongest memos separate what is sourced from what is assumed, find the staged option that keeps the door partly open, and check the worst case against cash. The journal entry with probabilities is what lets you learn from the decision a year later.`,
            concepts: ["fc09.reversibility", "fc09.expected-value", "fc09.premortem", "fc09.decision-journal", "fc09.base-rates"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to your cofounders why a decision that turned out badly may still have been a good decision, and how you will tell the difference.",
          keyPoints: [
            "Outcomes combine decision quality and luck; judging by outcome alone is 'resulting'",
            "A good decision uses the information available, base rates and a sound process, and weighs EV and worst case",
            "A decision journal written at the time records what was known and expected, so it can be reviewed honestly later",
            "Calibration can be measured over many forecasts with the Brier score",
            "One-way doors deserve more process than two-way doors",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "fc09-l06-q1",
      type: "numeric",
      prompt: md`A Suhail sponsorship event: 50% chance of EUR +20,000, 30% chance of EUR +5,000, 20% chance of EUR -15,000. What is the expected value? (EUR)`,
      answer: 8500,
      tolerance: { abs: 1 },
      unit: "EUR",
      explanation: md`$0.5 \times 20{,}000 + 0.3 \times 5{,}000 + 0.2 \times (-15{,}000) = 10{,}000 + 1{,}500 - 3{,}000 = 8{,}500$ EUR. Then check the -15,000 case against Suhail's cash before committing.`,
      concepts: ["fc09.expected-value"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc09-l06-q2",
      type: "numeric",
      prompt: md`Base rate 20%. A signal has likelihood ratio 4. What is the posterior probability? (2 decimals)`,
      answer: 0.5,
      tolerance: { abs: 0.005 },
      explanation: md`Prior odds $= 0.2/0.8 = 0.25$; posterior odds $= 0.25 \times 4 = 1$; probability $= 1/2 = 0.50$.`,
      concepts: ["fc09.base-rates"],
      difficulty: 2,
    },
    {
      id: "fc09-l06-q3",
      type: "multi",
      prompt: "Which are one-way-door (Type 1) decisions for an early-stage founder? (Select all that apply.)",
      options: [
        "Signing a five-year exclusive distribution agreement with minimum purchase commitments",
        "Changing the subject line of the newsletter",
        "Choosing the country of incorporation before a priced round",
        "Running a two-week pricing test on a pilot offer",
        "Granting a cofounder-sized equity stake to a new hire",
      ],
      answer: [0, 2, 4],
      explanation: md`Exclusivity, domicile and large equity grants are costly or impossible to undo. Newsletter wording and short pricing tests are two-way doors: decide fast and measure.`,
      concepts: ["fc09.reversibility"],
      difficulty: 1,
    },
    {
      id: "fc09-l06-q4",
      type: "numeric",
      prompt: md`The best option without further information has EV EUR 120 k. If you could learn the true state before choosing, EV would be EUR 165 k. A consultant offers a study for EUR 70 k. What is the EVPI, in EUR k?`,
      answer: 45,
      tolerance: { abs: 0.5 },
      unit: "EUR k",
      explanation: md`$\text{EVPI} = 165 - 120 = 45$ k. The study costs more than perfect information could be worth, so decline it (or find a cheaper, faster test).`,
      concepts: ["fc09.value-of-information"],
      difficulty: 2,
    },
    {
      id: "fc09-l06-q5",
      type: "order",
      prompt: "Order the steps of a 30-minute pre-mortem.",
      items: [
        "Brief the decision as if it has been made",
        "Everyone writes failure reasons silently, imagining it failed a year from now",
        "Round-robin sharing, most junior first",
        "Pick the top three reasons",
        "Assign a mitigation or tripwire to each",
      ],
      explanation: md`Silent writing first prevents anchoring; junior-first sharing reduces hierarchy effects; ending with owners turns doubts into actions.`,
      concepts: ["fc09.premortem"],
      difficulty: 1,
    },
    {
      id: "fc09-l06-q6",
      type: "decision",
      prompt: md`Option A has EV EUR 300 k but a 25% chance of losing EUR 500 k; Afterwave has EUR 550 k cash. Option B has EV EUR 220 k and a worst case of EUR -50 k. What do you choose?`,
      options: [
        { text: "A: always maximise expected value.", score: 0.1, feedback: "A 25% chance of losing almost all your cash is a 25% chance of ending the company; EV assumes you can survive to average out." },
        { text: "B, and look for a way to get A's upside in stages or with a cheap test first.", score: 1, feedback: "Right: avoid ruin, then try to buy information or stage the commitment to capture some of A's upside." },
        { text: "Neither: wait until the uncertainty is resolved.", score: 0.3, feedback: "Waiting is an option with its own cost; it needs to be priced, not used as a default." },
      ],
      explanation: md`EV is the right criterion for survivable, repeated bets. When the bad case is ruinous, protect survival first and look for staged or reversible ways to the upside.`,
      concepts: ["fc09.expected-value", "fc09.reversibility"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "fc09-l06-f1", front: "Expected value", back: md`$EV = \sum p_i x_i$; not enough on its own when a bad outcome is ruinous or irreversible.`, concepts: ["fc09.expected-value"] },
    { id: "fc09-l06-f2", front: "Type 1 vs Type 2 decisions", back: "Type 1: one-way door, slow and careful. Type 2: two-way door, decide fast, delegate, measure.", concepts: ["fc09.reversibility"] },
    { id: "fc09-l06-f3", front: "EVPI", back: "EV choosing after seeing the outcome minus EV of the best choice now; the ceiling on what information is worth.", concepts: ["fc09.value-of-information"] },
    { id: "fc09-l06-f4", front: "Bayes in odds form", back: md`Posterior odds = prior odds x likelihood ratio`, concepts: ["fc09.base-rates"] },
    { id: "fc09-l06-f5", front: "Pre-mortem prompt", back: "\"It is a year from now and this failed badly. Write down every reason why.\"", concepts: ["fc09.premortem"] },
    { id: "fc09-l06-f6", front: "Brier score", back: md`$BS = \frac{1}{N}\sum (f_i - o_i)^2$; 0 is perfect, always-50% scores 0.25.`, concepts: ["fc09.decision-journal"] },
    { id: "fc09-l06-f7", front: "Resulting", back: "Judging a decision by its outcome instead of by the information and process at the time.", concepts: ["fc09.decision-journal"] },
  ],
  scenarios: [
    {
      id: "fc09-s3",
      title: "The exclusive distribution offer",
      dayInLife: true,
      context: md`Hypothetical. A European maker of PV plant equipment offers Mizan exclusive distribution rights in Kuwait for five years. In return, Mizan commits to minimum annual purchases from year 2. The vendor wants a signature within two weeks, before a trade show.`,
      start: "a",
      concepts: ["fc09.reversibility", "fc09.premortem", "fc09.expected-value", "fc09.base-rates"],
      nodes: {
        a: {
          md: md`Your cofounder is excited: "Exclusivity means nobody else can sell it here." How do you classify the decision?`,
          choices: [
            { text: "A two-way door: we can always stop selling if it does not work.", score: 1, feedback: "Not with minimum purchase commitments and a five-year term; walking away may mean paying for stock or penalties.", next: "c" },
            { text: "A one-way door until proven otherwise: read the term, minimums, termination and exclusivity obligations on both sides before anything else.", score: 9, feedback: "Right: commitments and long terms make this hard to reverse; the process should match.", next: "b" },
          ],
        },
        b: {
          md: md`The draft has no termination for missed minimums except by paying the shortfall, and the exclusivity binds only Mizan (you may not sell competing products), not the vendor's direct sales to large buyers. Public tenders in Kuwait can take many months. What next?`,
          choices: [
            { text: "Run a pre-mortem with your cofounder, estimate the minimum-purchase exposure against a realistic tender timeline (base rates from past tenders), and counter-propose: 12-month trial, minimums only after the first order, mutual exclusivity including vendor direct sales, and termination if minimums are missed (losing exclusivity, not paying shortfall).", score: 10, feedback: "Converts a one-way door into a mostly reversible one, prices the exposure, and uses base rates for timing instead of hope." },
            { text: "Sign to meet the trade-show deadline and renegotiate later.", score: 2, feedback: "The deadline is the vendor's, not yours; after signature you have no leverage.", next: "c" },
            { text: "Decline outright.", score: 5, feedback: "Safe, but you may lose a useful product line; a counter-proposal costs little and tests the vendor's seriousness." },
          ],
        },
        c: {
          md: md`Eighteen months later, the first tender has not yet been awarded and the vendor invoices Mizan for the year-2 minimum shortfall.`,
          choices: [
            { text: "Negotiate a settlement, document what went wrong in the decision journal (classification error, no base rate for tender timing), and add a contract checklist for any commitment over a set threshold.", score: 4, feedback: "Learning from it is right; a pre-mortem would have named this exact failure in five minutes." },
          ],
        },
      },
    },
  ],
};

export default lesson;
