import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw05-l06",
  title: "Explaining \"why rerun this test\": evidence trails, confidence, trust and human approval",
  summary:
    "A selection engineers will act on: the anatomy of a rerun explanation (claim, reasons with provenance, counted evidence, calibrated confidence, cost, and what was skipped), Wilson intervals for history-based reasons, the cost of false alarms and how they erode trust, calibrated reliance versus automation bias and disuse, levels of automation and where human approval sits, and the rerun report as an audit record.",
  minutes: 75,
  objectives: [
    "Structure a rerun explanation with claim, reasons, evidence, confidence, cost and skipped tests",
    "Compute a Wilson interval for a history-based reason and present it honestly",
    "Compute the weekly cost of false alarms and explain how precision drives trust",
    "Explain calibrated trust, automation bias and disuse, and place human approval at the right level of automation",
    "Write a rerun report that a test lead can approve and an auditor can follow",
  ],
  concepts: [
    { id: "aw05.evidence-trail", name: "Evidence trail", description: "For each selected or skipped test: the change, the graph path or rule with its provenance, the counted evidence, the score and the decision rule applied.", competency: "aw-impact", related: ["aw05.edge-provenance", "aw05.impact-score"] },
    { id: "aw05.confidence-communication", name: "Communicating confidence", description: "Show calibrated probabilities with intervals and the count behind them (Wilson interval), and separate strong structural reasons from weak statistical ones.", competency: "aw-impact", related: ["aw05.calibration", "aw05.bayesian-smoothing"] },
    { id: "aw05.false-alarm-cost", name: "False alarm cost", description: "Rig hours and engineer attention spent on reruns that find nothing; the hidden cost is lost trust and ignored flags.", competency: "aw-impact", related: ["aw05.precision-recall"] },
    { id: "aw05.trust-calibration", name: "Calibrated trust", description: "Engineers' reliance should match the tool's measured reliability: too little is disuse after false alarms, too much is automation bias.", competency: "aw-impact" },
    { id: "aw05.human-approval", name: "Human approval gate", description: "A named engineer approves the rerun plan, especially skips of tests with high consequence or low confidence, before rigs run; the approval is recorded.", competency: "aw-impact", related: ["aw05.shadow-sampling"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What an explanation has to contain",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Ripple's product is not the score, it is the decision an engineer signs. If the explanation is weak, engineers rerun everything anyway and Ripple saves nothing; if it is overconfident, the first escape ends the pilot. The rerun report is also what you will demo, what a validation head will forward to her manager, and, later, what becomes safety evidence when agents plan retests overnight with human approval (stage 3 of the product vision). You should be able to write one yourself.`,
        },
        {
          kind: "md",
          md: md`### Anatomy of a rerun explanation

| Element | Example | Why it is there |
|---|---|---|
| **Claim** | Rerun "2 h thermal soak" tonight | The decision, first line |
| **Reasons** (with provenance) | Static: the test reads parameter DERATE_TBL, changed in cells above 120 °C, and its last run visited them. Learned: thermal-module changes preceded soak failures in 9 of 60 cases | Engineers trust structural reasons more than statistical ones; label which is which |
| **Evidence counts** | 9 of 60, lift 3.75, interval 8 to 26 % | A number without its $n$ cannot be judged |
| **Confidence** | Estimated regression probability 0.12 | Calibrated, so it means what it says |
| **Cost** | 6 rig hours; break-even 0.029 | The decision rule is visible |
| **Skipped tests and why** | 48 h endurance skipped: probability 0.01, break-even 0.23; next full run Saturday | The risk being accepted, stated |
| **What would change the decision** | A failure in tonight's torque step would add the endurance run | Makes the plan revisable |

The most neglected row is **skipped tests**. The selected list explains itself through the rig time it costs; the skipped list is where the risk sits, and an approver must see it.

### Showing uncertainty honestly

Every history-based reason is a proportion from a small sample. Show its interval, using the Wilson score interval, which behaves well at small $n$ and near 0 or 1:`,
        },
        { kind: "equation", formula: "aw05-wilson" },
        {
          kind: "md",
          md: md`9 failures in 60 changes: $\hat p = 0.15$, 95 % Wilson interval **8.1 % to 26.1 %**. One failure in two: $\hat p = 0.5$, interval **9.5 % to 90.5 %**, which says honestly that the evidence is nearly worthless. The smoothed estimate (Lesson 4) drives the decision; the interval tells the engineer how much to trust it.

Rules that keep explanations credible:
- Lead with the strongest **structural** reason; put learned correlations second, labelled as such.
- Never show more than about three reasons per test; rank by contribution (per-feature contributions from the model, path weights from the graph).
- Use words and numbers together: "strong (direct parameter read)", "weak (1 of 2 past cases)".
- Do not hide that the tool is uncertain. A tool that says "low confidence, human decision needed" is trusted more than one that is always sure.

### False alarms and the economics of trust`,
        },
        { kind: "equation", formula: "aw05-false-alarm-cost" },
        {
          kind: "md",
          md: md`The direct cost is rig hours and review time. The larger cost is behavioural. Parasuraman and Riley (1997) described **disuse**: operators stop relying on automation that cries wolf, and then also ignore its true alarms. They also described **misuse**: over-reliance, accepting automated recommendations without checking (automation bias). Lee and See (2004) frame the goal as **calibrated trust**: reliance that matches the automation's actual capability, which requires the capability to be visible.

For Ripple this means three design rules:
1. **Publish measured precision and recall** of the tool's own recommendations every week, including escapes (Lesson 2's shadow sampling is the source).
2. **Keep the non-mandatory "extra rerun" flags precise.** A flag that is right one time in ten trains engineers to ignore it.
3. **Make overrides cheap and recorded.** An engineer who disagrees adds or removes a test with one action and a reason; overrides are labels for learning and a check on the tool.

### Levels of automation and where approval sits

Parasuraman, Sheridan and Wickens (2000) separate automation of information acquisition, analysis, decision selection and action implementation, each with its own level. A sensible staging for Ripple and for later agents:

| Stage | Ripple does | Human does |
|---|---|---|
| Shadow | Proposes a plan; full regression still runs | Compares, builds trust from measured recall |
| Recommend | Proposes plan with reasons and skipped list | Approves or edits every plan |
| Approve by exception | Executes plans automatically when all skipped tests are low consequence and confidence is high | Approves only flagged plans (safety-adjacent skips, low confidence, unresolvable changes) |
| Overnight agent | Plans, queues rigs, reruns on failure, writes the report | Approves the plan before rigs start; reviews the report in the morning |

Consequence and confidence decide which plans need a human:`,
        },
        {
          kind: "matrix",
          title: "When a plan needs human approval",
          xAxis: ["Low consequence of a wrong skip", "High consequence of a wrong skip"],
          yAxis: ["Low confidence", "High confidence"],
          cells: [
            { label: "Auto-approve, monitor", detail: "Performance tests with good history; shadow sampling watches recall" },
            { label: "Approve by exception", detail: "Show the skips; one-click approval by the test lead" },
            { label: "Explore", detail: "New tests or new rigs: run more, collect labels, cheap to be wrong" },
            { label: "Human decides, always", detail: "Safety-adjacent tests with weak evidence; mandatory set lives here" },
          ],
          caption: "Consequence comes from the lab's escape cost table and safety classification; confidence from evidence counts and calibration.",
        },
        {
          kind: "flow",
          title: "The rerun loop with human approval",
          steps: [
            { label: "Change intake", detail: "Resolved to graph nodes; unresolvable changes block" },
            { label: "Impact analysis", detail: "Scores, cost rule, mandatory set" },
            { label: "Proposed plan", detail: "Selected and skipped tests with reasons and confidence" },
            { label: "Engineer approval", detail: "Edit, approve, record who and why" },
            { label: "Overnight run", detail: "Rigs execute; Lockstep records signals and actions" },
            { label: "Report and labels", detail: "Results, escapes, overrides feed bench memory" },
          ],
        },
      ],
    },
    {
      layer: "applied",
      title: "Writing the explanation with numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "The explanation for one rerun and one skip",
          given: md`Change: firmware 2.4.1 modifies the thermal derating table above 120 °C. Illustrative values from Lessons 1 to 4: thermal soak (6 h) read the table and visited the changed cells; history 9 failures in 60 thermal-module changes; smoothed probability 0.118. Endurance (48 h): graph score 0.2, history 1 failure in 40 related changes, smoothed probability 0.01. Costs EUR 120 per rig hour, escape EUR 25,000.`,
          steps: [
            { md: md`**Thermal soak, decision:** break-even $120 \times 6 / 25{,}000 = 0.029$; $0.118 > 0.029$: **rerun**.` },
            { md: md`**Reasons:** (1) structural, strong: reads DERATE_TBL; last run reached 131 °C winding, inside the changed cells. (2) learned, moderate: 9 of 60 past thermal-module changes, Wilson 95 % interval 8 to 26 %.` },
            { md: md`**Endurance, decision:** break-even $120 \times 48 / 25{,}000 = 0.23$; $0.01 < 0.23$: **skip**.` },
            { md: md`**Skip reasons:** structural, weak: endurance never exceeded 105 °C winding, so it did not visit the changed cells. Learned: 1 of 40, Wilson interval about 0.4 % to 13 %. Residual risk stated: caught by Saturday's full run if present.` },
            { md: md`**Written out:** "Rerun thermal soak (6 h): reads the changed derating cells and reached them last run; thermal-module changes preceded soak failures in 9 of 60 cases (8 to 26 %). Skip endurance (48 h): never reaches the changed cells; 1 of 40 past cases; full run Saturday covers it."` },
          ],
          result: md`Two sentences each, with the decision rule, the counts and the residual risk. An engineer can disagree with a specific number instead of with "the AI".`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Intervals and the cost of false alarms",
          given: md`(a) A learned reason rests on 3 failures in 12 changes. (b) Illustrative: Ripple raises 20 extra-rerun flags a week beyond the mandatory and cost-rule set, average 3 rig hours each at EUR 120, 15 minutes of engineer review at EUR 90 per hour. Precision of the flags is 10 %.`,
          steps: [
            { md: md`(a) $\hat p = 0.25$; Wilson 95 % interval from the formula with $n = 12$, $z = 1.96$.` },
            { md: md`About 8.9 % to 53.2 %: wide, so label the reason "weak".`, hidden: true, check: { prompt: "Upper bound of the interval (%)", answer: 53.2, unit: "%", tolerance: { abs: 0.5 } } },
            { md: md`(b) $C_{FA} = 20 \times 0.9 \times (120 \times 3 + 90 \times 0.25) = 18 \times 382.5$.` },
            { md: md`$= $ EUR 6,885 per week.`, hidden: true, check: { prompt: "Weekly false alarm cost (EUR)", answer: 6885, unit: "EUR", tolerance: { abs: 5 } } },
            { md: md`Raising precision to 30 % cuts it to $14 \times 382.5 = $ EUR 5,355, and, more importantly, makes the flags worth reading.` },
          ],
          result: md`A 3-of-12 reason spans 9 % to 53 %, so it must not be presented as strong. Low-precision flags cost thousands of euros a week and, worse, teach engineers to ignore them.`,
        },
        {
          kind: "question",
          question: {
            id: "aw05-l06-p1",
            type: "numeric",
            prompt: md`Ripple raises 15 extra-rerun flags a week, each 4 rig hours at EUR 100 per hour plus 0.5 h of review at EUR 80 per hour. Precision is 20 %. What is the weekly false alarm cost in EUR?`,
            answer: 5280,
            tolerance: { abs: 5 },
            unit: "EUR",
            explanation: md`$15 \times 0.8 \times (100 \times 4 + 80 \times 0.5) = 12 \times 440 = 5{,}280$ EUR per week.`,
            concepts: ["aw05.false-alarm-cost"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Earning trust in a test lab",
      blocks: [
        {
          kind: "md",
          md: md`### How engineers actually react

Test engineers have seen tools promise to "optimise" testing before. Expect three reactions: "show me the escapes" (answer with shadow-sampling results), "why this test and not that one" (answer with the evidence trail, not with "the model"), and "who signs" (answer: they do, and the tool records it). Trust is built in the first weeks by being visibly right about small things and visibly honest about uncertainty.

### Practices that work in pilots

- **Start in shadow mode** and publish a weekly "saves and escapes" table.
- **Review the first escapes together** with the test lead: what edge was missing, what was fixed.
- **Name a champion** on the customer side who owns the approval step.
- **Show the skipped list** in every report, never only the selected list.
- **Record every approval and override** with who, when and why: that record is the audit trail for internal quality reviews, customers and, for machinery with ML safety functions, the evidence a notified body may ask about.`,
        },
        { kind: "sources", refs: ["aw05-r28", "aw05-r29", "aw05-r30", "aw05-r31"] },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Explanations that destroy trust",
          md: md`- "The model is 87 % confident" with no count, no reason and no calibration evidence.
- Ten reasons per test, mostly weak correlations.
- Reporting only the selected tests, hiding the skipped ones.
- A confident tone after an escape, instead of a root cause and a fix.
- No way for an engineer to override, or overrides that silently disappear.
- Flags that are right one time in ten.`,
        },
        {
          kind: "checklist",
          title: "A rerun report is complete when it has",
          items: [
            "The change event, resolved artifacts and any unresolved items",
            "Selected tests with top reasons, provenance, evidence counts and confidence",
            "Skipped tests with reasons, residual risk and when they will next run",
            "Mandatory tests listed separately",
            "Rig hours planned versus a full regression, and queue order",
            "Approver name, time and any overrides with reasons",
            "Current measured recall and precision of the tool, with intervals",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask the test lead before designing the report",
          items: [
            "What would you need to see to approve a skip of a test you normally run?",
            "Who signs the regression plan today, and where is that recorded?",
            "Which tests could you never let a tool skip, regardless of evidence?",
            "How do you want to hear about an escape: immediately, daily, weekly?",
            "Who else reads regression results (quality, safety, customers), and what format do they need?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw05-l06-p2",
            type: "short",
            prompt: md`Write the **Ripple rerun report** for this illustrative change at a drive-unit lab: firmware 2.4.1 changes the current-loop gain KP_IQ by +8 % and the derating table above 120 °C; the rig encoder was replaced on Tuesday. Suite: torque step (2 h), speed ripple (3 h), thermal soak (6 h), overload derating (4 h), endurance (48 h), STO timing (1 h). Use numbers in the style of this module (labelled illustrative): decisions, reasons with provenance, evidence counts with intervals, rig hours, skipped tests with residual risk, and the approval block.`,
            rubric: [
              "Leads with the plan: selected, skipped and mandatory tests with total rig hours versus full regression",
              "Gives each selected test one to three reasons labelled by provenance (structural or learned) with evidence counts and intervals where learned",
              "Lists skipped tests with the reason, the cost rule or score, residual risk and when they next run",
              "Treats the encoder swap correctly (dynamic tests, golden-unit baseline or reinterpretation of results)",
              "Keeps STO in a mandatory section regardless of score",
              "Ends with an approval block (approver, time, overrides) and the tool's current measured recall",
            ],
            explanation: md`The report is a decision document: the plan first, reasons an engineer can check, honest uncertainty, the skipped tests where the risk sits, and an approval block that records who accepted it.`,
            modelAnswer: md`**Rerun plan, firmware 2.4.1 plus encoder swap (illustrative).** 16 rig hours planned versus 64 h full regression. Approval needed by 19:00.

**Mandatory:** STO timing (1 h).

**Rerun:**
- **Torque step (2 h).** Structural, strong: exercises the current loop (coverage 0.85 of changed module) and KP_IQ changed +8 %. Rig: new encoder adds about 40 µs delay (datasheet), so a golden-unit baseline step runs first (0.5 h, included). Probability 0.27, break-even 0.0096.
- **Speed ripple (3 h).** Structural: uses encoder speed at low rpm (sensitivity weight 0.8 after the swap). Learned: current-loop changes preceded ripple failures in 7 of 50 cases (Wilson 7 % to 26 %). Break-even 0.0144.
- **Thermal soak (6 h).** Structural: last run reached 131 °C winding, inside the changed derating cells. Learned: 9 of 60 thermal-module changes (8 % to 26 %). Probability 0.118, break-even 0.029.
- **Overload derating (4 h).** Structural: onset depends on the derating table; last result 108 % with limits 105 to 115 %. Probability 0.06, break-even 0.019.

**Skipped:**
- **Endurance (48 h).** Never exceeded 105 °C winding, no visit to changed cells; current-loop gain effect on endurance 1 of 40 past cases (0.4 % to 13 %). Probability 0.01, break-even 0.23. Residual risk covered by Saturday's full regression.

**Encoder note:** earlier torque-step and ripple results are not compared with tonight's until the golden-unit baseline shift is known.

**Tool performance (last 8 weeks):** recall 95 % (Wilson 85 % to 98 %), 2 escapes, both root-caused.

**Approval:** approver ____, time ____, overrides (test, add or remove, reason) ____.`,
            concepts: ["aw05.evidence-trail", "aw05.confidence-communication", "aw05.human-approval"],
            difficulty: 3,
          },
        },
        { kind: "scenario", scenario: "aw05-s3" },
        {
          kind: "feynman",
          prompt: "Explain to a new Afterwave engineer why the skipped-tests section of a rerun report matters more than the selected-tests section.",
          keyPoints: [
            "Selected tests cost rig time but carry no hidden risk; their result will be seen",
            "Skipped tests are where an escape can happen, so the risk being accepted lives there",
            "Each skip needs its reason, its numbers and when the test will next run",
            "The approver signs the risk, so the risk must be visible",
            "Showing skips honestly is what builds calibrated trust",
          ],
        },
        { kind: "xref", to: "fc10.human-checkpoints", note: "Founder Core's human checkpoints in agentic workflows: the approval gate here is the same idea applied to rigs." },
        { kind: "xref", to: "fc05.engineer-trust", note: "How engineers decide whom to trust, from the marketing module; the rerun report is Ripple's most frequent trust signal." },
      ],
    },
  ],
  quiz: [
    {
      id: "aw05-l06-q1",
      type: "mcq",
      prompt: "Which element of a rerun report is most often missing and matters most to an approver?",
      options: ["The list of selected tests", "The skipped tests with reasons and residual risk", "The tool's version number", "The total number of tests in the suite"],
      answer: 1,
      explanation: md`The risk accepted sits in the skipped tests. An approver who cannot see them is not approving the risk.`,
      concepts: ["aw05.evidence-trail"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw05-l06-q2",
      type: "numeric",
      prompt: md`A reason rests on 9 failures in 60 changes. What is the upper bound of the 95 % Wilson interval, in %? (1 decimal)`,
      answer: 26.1,
      tolerance: { abs: 0.3 },
      unit: "%",
      explanation: md`$\hat p = 0.15$, $z^2/n = 0.064$. Centre $(0.15 + 0.032)/1.064 = 0.171$; half-width $1.96\sqrt{0.15 \times 0.85/60 + 3.8416/14{,}400}/1.064 = 0.090$. Interval 8.1 % to 26.1 %.`,
      concepts: ["aw05.confidence-communication"],
      difficulty: 2,
    },
    {
      id: "aw05-l06-q3",
      type: "mcq",
      prompt: "Engineers start ignoring Ripple's extra-rerun flags after weeks of false alarms. What is this called?",
      options: ["Automation bias", "Disuse", "Feedback bias", "Overfitting"],
      answer: 1,
      explanation: md`Parasuraman and Riley's disuse: rejecting automation after it cries wolf. Automation bias (misuse) is the opposite: over-reliance.`,
      concepts: ["aw05.trust-calibration"],
      difficulty: 1,
    },
    {
      id: "aw05-l06-q4",
      type: "multi",
      prompt: "Which practices support calibrated trust in Ripple? (Select all that apply.)",
      options: [
        "Publishing measured precision and recall weekly, with escapes",
        "Showing evidence counts and intervals next to learned reasons",
        "Hiding low-confidence recommendations to look reliable",
        "Cheap, recorded overrides that feed learning",
        "Labelling structural and learned reasons differently",
      ],
      answer: [0, 1, 3, 4],
      explanation: md`Trust calibrates when reliability is visible. Hiding uncertainty produces over-trust, then a sharp loss of trust at the first escape.`,
      concepts: ["aw05.trust-calibration", "aw05.confidence-communication"],
      difficulty: 1,
    },
    {
      id: "aw05-l06-q5",
      type: "decision",
      prompt: md`A plan would skip the protective-stop timing test after a model change because the evidence for impact is weak (score 0.04). You are configuring the approval policy. What should happen?`,
      options: [
        { text: "Auto-approve: the score is low.", score: 0, feedback: "High consequence and weak evidence is the quadrant where a human always decides; protective stop belongs in the mandatory set." },
        { text: "Protective stop is mandatory, so it runs regardless; and any plan touching safety-adjacent outputs goes to a named approver.", score: 1, feedback: "Correct: consequence, not just probability, decides what a tool may skip." },
        { text: "Skip it and rely on the weekend full regression.", score: 0.2, feedback: "Defers a safety check on a model change by days; not acceptable for a safety function." },
      ],
      explanation: md`Mandatory set and the consequence-confidence matrix: safety functions are never optimised away.`,
      concepts: ["aw05.human-approval"],
      difficulty: 1,
    },
    {
      id: "aw05-l06-q6",
      type: "order",
      prompt: "Order the stages of automation for introducing Ripple into a lab.",
      items: ["Shadow mode alongside full regression", "Recommend: every plan approved", "Approve by exception", "Overnight agent with plan approval before rigs start"],
      explanation: md`Each stage is earned with measured recall and precision from the previous one.`,
      concepts: ["aw05.human-approval", "aw05.trust-calibration"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "aw05-l06-f1", front: "Seven elements of a rerun explanation", back: "Claim, reasons with provenance, evidence counts, confidence, cost and rule, skipped tests with residual risk, what would change the decision.", concepts: ["aw05.evidence-trail"] },
    { id: "aw05-l06-f2", front: "Why the Wilson interval", back: "Behaves well at small n and rates near 0 or 1; 1 of 2 gives 9.5 % to 90.5 %, showing the evidence is weak.", concepts: ["aw05.confidence-communication"] },
    { id: "aw05-l06-f3", front: "Disuse vs misuse of automation", back: "Disuse: ignoring automation after false alarms. Misuse (automation bias): over-relying without checking.", concepts: ["aw05.trust-calibration"] },
    { id: "aw05-l06-f4", front: "Calibrated trust", back: "Reliance that matches measured reliability; needs visible precision, recall and uncertainty.", concepts: ["aw05.trust-calibration"] },
    { id: "aw05-l06-f5", front: "When a human always decides", back: "High consequence of a wrong skip combined with low confidence; mandatory safety tests sit here.", concepts: ["aw05.human-approval"] },
    { id: "aw05-l06-f6", front: "Weekly false alarm cost", back: md`$C_{FA} = N_{flag}(1 - \pi)(c_h \bar h + c_e t_r)$`, concepts: ["aw05.false-alarm-cost"] },
  ],
  scenarios: [
    {
      id: "aw05-s3",
      title: "\"Your tool told us to skip it\"",
      dayInLife: true,
      context: md`Week 7 of an illustrative production pilot. A derating regression reached the customer's system integration rig. Ripple had skipped the overload derating test for that build. The test lead, your champion, forwards an angry email from her director: "Your tool told us to skip it."`,
      start: "a",
      concepts: ["aw05.evidence-trail", "aw05.trust-calibration", "aw05.human-approval"],
      nodes: {
        a: {
          md: md`What do you do in the first hour?`,
          choices: [
            { text: "Reply that the plan was approved by their engineer, so the decision was theirs.", score: 0, feedback: "True and fatal: it abandons your champion and turns the approval gate into a blame shield.", next: "c" },
            { text: "Call the test lead, acknowledge the escape, pull the archived rerun report for that build, and commit to a root cause within 48 hours.", score: 10, feedback: "Ownership, and the evidence trail makes a fast, factual root cause possible.", next: "b" },
          ],
        },
        b: {
          md: md`The report shows the skip: score 0.04, break-even 0.019 would have run it, but the test had been tagged "low consequence" with an escape cost of EUR 5,000 at onboarding, which raised its break-even to 0.096. The derating table change was in cells the test visits.`,
          choices: [
            { text: "Present the root cause plainly: wrong escape cost class at onboarding, plus a missing table-cell edge. Fix both, re-score the last 7 weeks to find any other skips with the same pattern, and publish it in the weekly saves-and-escapes report.", score: 10, feedback: "Specific, fixed at the source, checked for recurrence, and visible: this is how trust recovers.", next: "d" },
            { text: "Quietly raise all thresholds so more tests run.", score: 3, feedback: "Hides the cause and erodes the savings; the next escape will have the same root.", next: "d" },
          ],
        },
        c: {
          md: md`The director suspends the pilot. Your champion stops answering.`,
          choices: [
            { text: "Ask for a meeting to present a root cause and fixes.", score: 3, feedback: "Possible, but the relationship cost of the first reply is now the main obstacle." },
          ],
        },
        d: {
          md: md`The director asks: "Why should I trust it now?"`,
          choices: [
            { text: "Show measured recall with its interval over the pilot, both escapes with root causes and fixes, and propose that derating tests move to approve-by-exception with skips shown to the test lead for the next month.", score: 10, feedback: "Calibrated trust: the tool's reliability is shown, not asserted, and human control increases where it failed." },
            { text: "Promise it will not happen again.", score: 1, feedback: "No tool on a physical rig can promise that; it is the claim Lesson 2 told you never to make." },
          ],
        },
      },
    },
  ],
};

export default lesson;
