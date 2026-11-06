import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw05-l02",
  title: "Regression test selection theory: safety, precision, recall and the cost of a skip",
  summary:
    "The formal theory behind 'which tests to rerun': minimisation vs selection vs prioritisation, modification-revealing tests and safe selection, why safety is unattainable on physical rigs, precision and recall of a selection, and the expected-cost model that turns rig hours and escaped defects into a per-test run rule, with shadow sampling to measure what you skipped.",
  minutes: 85,
  objectives: [
    "Distinguish test suite minimisation, selection and prioritisation and say which Ripple does",
    "Define modification-revealing tests and safe selection, and explain why the controlled regression testing assumption fails on rigs",
    "Compute precision and recall of a selection from a confusion matrix and compare them with the retest-all base rate",
    "Compute the expected cost of a selection and the per-test break-even probability, and show that a single score threshold is not cost-optimal",
    "Estimate the cost of an escape from where it would be caught, and size shadow sampling with the rule of three",
  ],
  concepts: [
    { id: "aw05.rts-problems", name: "Minimisation, selection, prioritisation", description: "Minimisation removes redundant tests permanently; selection picks a subset for one change; prioritisation orders tests so faults are found early.", competency: "aw-impact" },
    { id: "aw05.safe-selection", name: "Safe regression test selection", description: "A technique that selects every modification-revealing test, under the controlled regression testing assumption that nothing but the change differs between runs.", competency: "aw-impact", related: ["aw05.rts-problems"] },
    { id: "aw05.precision-recall", name: "Precision and recall of a selection", description: "Recall is the share of regression-revealing tests that were selected; precision is the share of selected tests that reveal a regression.", competency: "aw-impact", related: ["aw05.safe-selection"] },
    { id: "aw05.selection-cost-model", name: "Expected cost of a selection", description: "Analysis cost plus rig hours of selected tests plus escape cost weighted by the regression probability of each skipped test.", competency: "aw-impact", related: ["aw05.precision-recall", "m08.emv"] },
    { id: "aw05.run-threshold", name: "Per-test break-even probability", description: "Run a test when its regression probability exceeds rig cost times duration divided by escape cost; long tests need stronger evidence.", competency: "aw-impact", related: ["aw05.selection-cost-model"] },
    { id: "aw05.shadow-sampling", name: "Shadow sampling and escape measurement", description: "Running a random share of unselected tests (or periodic full regressions) to measure recall; zero failures in n runs bounds the miss rate near 3/n.", competency: "aw-impact", related: ["aw05.precision-recall"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What 'safe' means, and why rigs cannot have it",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`The first serious objection from any validation lead will be: "if your tool skips a test and we ship a bug, that's on me." You need a precise answer: what Ripple guarantees, what it estimates, how the estimate is measured, and what a skip costs in euros compared with a rig day. This lesson gives you the vocabulary the research literature uses (so you are credible with Ismail, Yusuf and any software-testing person on the buyer side) and the cost model that becomes Ripple's ROI story.`,
        },
        {
          kind: "md",
          md: md`### Three different problems

Yoo and Harman's survey (2012) separates three things people loosely call "smart regression testing":

| Problem | Question | Output | Risk |
|---|---|---|---|
| **Minimisation** | Which tests are redundant forever? | A smaller suite | Permanently loses fault-detection power |
| **Selection** | Which tests are relevant **to this change**? | A subset $T' \subseteq T$ | Escapes on this change |
| **Prioritisation** | In what order should tests run? | A permutation of $T$ (or $T'$) | None directly; faults found later if wrong |

Ripple does **selection** (what to rerun after this firmware, model or rig change) and **prioritisation** (in what order to queue them on the overnight rig, Lesson 4). It should never do minimisation silently: deleting a test from the suite is an engineering decision with its own review.

### Modification-revealing tests and safe selection

Let $P$ be the system before the change and $P'$ after, and $T$ the suite. Rothermel and Harrold (1996) define:
- a test is **modification-revealing** if its output on $P'$ differs from its output on $P$;
- a test is **modification-traversing** if it executes changed code (a necessary condition for revealing, in deterministic software);
- a selection technique is **safe** if it selects every modification-revealing test.

They compare techniques on **inclusiveness** (share of modification-revealing tests selected; safe means 100 %), **precision** (in their framework, the share of non-revealing tests correctly *omitted*), **efficiency** (cost of the analysis) and **generality**. Note the trap: their "precision" is an omission rate, not the machine-learning precision used below. Say which one you mean.

Safe techniques (DejaVu, Rothermel and Harrold 1997; file-level dynamic dependencies such as Ekstazi, Gligoric et al. 2015) rest on the **controlled regression testing assumption**: when you rerun a test, *only the code changed*. Same inputs, same environment, same hardware, deterministic execution.

### Why the assumption fails on a test bench

On a rig the assumption breaks in at least four ways:
1. **The rig changes too.** Encoders get swapped, load cells recalibrated, fixtures wear. A test can reveal a "modification" that is not in the product.
2. **Nondeterminism.** Thermal state, friction, sensor noise and learned policies make two runs of the same build differ (Lesson 5).
3. **Non-code artifacts.** Calibration tables and model weights change behaviour without changing a single line of code, so "traverses changed code" is no longer the right test.
4. **Incomplete graphs.** Implicit couplings (a shared supply, ambient temperature) are missing edges.

So for physical AI **safety in the formal sense is unattainable**. The honest claim is statistical: Ripple selects to a measured recall, at a stated cost, with a bound on escapes, and with a mandatory set that is never skipped. That is a stronger position with a test lead than claiming a guarantee you cannot keep.

### Precision and recall

Every test after a change falls in one cell:`,
        },
        {
          kind: "matrix",
          title: "Confusion matrix of a selection",
          xAxis: ["Would pass (no regression)", "Would fail (reveals regression)"],
          yAxis: ["Not selected", "Selected"],
          cells: [
            { label: "False positive (FP)", detail: "Selected and passes: rig hours spent, no regression found" },
            { label: "True positive (TP)", detail: "Selected and fails: the regression is caught tonight" },
            { label: "True negative (TN)", detail: "Skipped and would have passed: the rig hours Ripple saves" },
            { label: "False negative (FN)", detail: "Skipped and would have failed: an escape, the expensive cell" },
          ],
          caption: "Recall = TP / (TP + FN). Precision = TP / (TP + FP). The FN cell is invisible unless you run skipped tests sometimes.",
        },
        { kind: "equation", formula: "aw05-selection-recall" },
        { kind: "equation", formula: "aw05-selection-precision" },
        {
          kind: "md",
          md: md`Precision will look terrible in absolute terms because most regression runs pass. Compare it with the **base rate** of retest-all (failing tests over all tests run), which is the precision of running everything. A selector that keeps 94 % recall while running a fifth of the suite has raised precision about fivefold.

### The cost model

For one change event with selected set $S$:`,
        },
        { kind: "equation", formula: "aw05-selection-cost" },
        {
          kind: "md",
          md: md`The sum separates per test. Test $i$ contributes $c_h h_i$ if run and $C_{esc} p_i$ if skipped, so the cost-minimising rule is to run it exactly when its expected escape cost exceeds its rig cost:`,
        },
        { kind: "equation", formula: "aw05-run-threshold" },
        {
          kind: "md",
          md: md`Three consequences that matter commercially:
- **The threshold scales with duration.** A 1 h emergency-stop test at EUR 120 per rig hour and EUR 25k per escape needs only $p > 0.0048$; a 48 h endurance run needs $p > 0.23$. One global score threshold (the widget's slider) cannot express this.
- **$C_{esc}$ is not a constant.** It depends on where the escape would be caught (Section 3), and for safety functions it is effectively unbounded, which is why those tests go in a **mandatory set** instead of the optimisation.
- **Selection must beat retest-all.** Leung and White's (1991) condition:`,
        },
        { kind: "equation", formula: "aw05-retest-break-even" },
        {
          kind: "md",
          md: md`On software CI the right side is cheap and selection is a nicety. On a dyno or humanoid rig, $c_h H(T)$ is days of a scarce, expensive asset, so selection pays as long as $\mathbb{E}[N_{esc}]$ is measured honestly. There is also a **calendar** term the formula hides: a 71 h full suite on one rig is three days of latency per firmware build; a 6 h selection gives feedback overnight. Faster feedback means smaller batches of change per regression, which in turn makes each failure easier to localise.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Cost-optimal selection on the widget's suite",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Score threshold versus the per-test cost rule",
          given: md`Use the **change-impact** widget's suite with only the motor-control firmware changed (Lesson 1). Take $p_i$ = score times failure rate. Illustrative costs: $c_h$ = EUR 120 per rig hour (dyno, operator, energy); $C_{esc}$ = EUR 25,000 per escaped regression; $C_a$ negligible.`,
          steps: [
            {
              md: md`**Per-test numbers.**

| Test | $h_i$ (h) | $p_i$ | Escape cost $p_i C_{esc}$ (EUR) | Run cost $c_h h_i$ (EUR) | $p_i^{*}$ | Rule |
|---|---|---|---|---|---|---|
| Torque step | 2 | 0.270 | 6,750 | 240 | 0.0096 | run |
| Speed ripple | 3 | 0.175 | 4,375 | 360 | 0.0144 | run |
| Thermal soak | 6 | 0.030 | 750 | 720 | 0.0288 | run (barely) |
| Overload derating | 4 | 0 | 0 | 480 | 0.0192 | skip |
| Pick-and-place | 5 | 0.105 | 2,625 | 600 | 0.0240 | run |
| Grip force | 2 | 0 | 0 | 240 | 0.0096 | skip |
| Endurance 48 h | 48 | 0.010 | 250 | 5,760 | 0.2304 | skip |
| Emergency stop | 1 | 0.040 | 1,000 | 120 | 0.0048 | run |`,
            },
            { md: md`**Retest-all:** $71 \times 120 = $ EUR 8,520. **Retest-none:** $25{,}000 \times 0.63 = $ EUR 15,750 of expected escapes.` },
            { md: md`**Score threshold 0.35** (torque step, speed ripple, e-stop): run cost $240 + 360 + 120 = 720$; expected escapes $750 + 2{,}625 + 250 = 3{,}625$; total **EUR 4,345**.` },
            { md: md`**Per-test rule** (run torque step, speed ripple, thermal soak, pick-and-place, e-stop): run cost $240 + 360 + 720 + 600 + 120 = 2{,}040$; expected escape cost $250$ (endurance only); total **EUR 2,290**, 17 rig hours, recall $0.62/0.63 = 98\%$.` },
            { md: md`**Best single score threshold** (0.25 to 0.30, which adds pick-and-place) gives EUR 2,320, close to optimal here only because thermal soak sits on its break-even point. No score threshold excludes the endurance run while including thermal soak, because both score 0.2.` },
          ],
          result: md`The per-test rule halves the expected cost of the 0.35 threshold (EUR 2,290 versus 4,345) and catches 98 % instead of 77 % of expected regressions, for 11 more rig hours. The lesson for Ripple's design: score is evidence, duration is cost, and the decision needs both.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "Expected cost per change versus score threshold (widget suite, firmware change)",
          xKey: "threshold",
          xLabel: "Selection threshold on impact score",
          yLabel: "EUR per change event (illustrative)",
          series: [
            { key: "run", label: "Rig cost of selected tests" },
            { key: "escape", label: "Expected escape cost" },
            { key: "total", label: "Total" },
          ],
          data: [
            { threshold: "0.10", run: 7800, escape: 0, total: 7800 },
            { threshold: "0.20", run: 7800, escape: 0, total: 7800 },
            { threshold: "0.25", run: 1320, escape: 1000, total: 2320 },
            { threshold: "0.30", run: 1320, escape: 1000, total: 2320 },
            { threshold: "0.35", run: 720, escape: 3625, total: 4345 },
            { threshold: "0.50", run: 600, escape: 4625, total: 5225 },
            { threshold: "0.80", run: 240, escape: 9000, total: 9240 },
            { threshold: "1.00", run: 0, escape: 15750, total: 15750 },
          ],
          caption: "At 0.20 the 48 h endurance run joins and rig cost jumps. The per-test rule (EUR 2,290) is below every point on this curve.",
        },
        {
          kind: "worked",
          mode: "worked",
          title: "Precision and recall from a shadow pilot",
          given: md`Illustrative three-month shadow pilot: Ripple proposes selections, but the lab keeps running its full regression, so every outcome is known. 40 change events, 80 tests each: 3,200 test executions. Ripple selected 620. The full runs show 52 executions failing because of real regressions (flaky and rig-fault failures already removed); 49 of them were in Ripple's selection.`,
          steps: [
            { md: md`$TP = 49$, $FN = 52 - 49 = 3$, $FP = 620 - 49 = 571$, $TN = 3{,}200 - 620 - 3 = 2{,}577$.` },
            { md: md`**Recall** $= 49/52 = 94.2\%$. **Precision** $= 49/620 = 7.9\%$.` },
            { md: md`**Retest-all precision** (base rate) $= 52/3{,}200 = 1.6\%$. Ripple's precision is about **4.9 times** the base rate while running $620/3{,}200 = 19.4\%$ of executions.` },
            { md: md`**The three escapes are the product backlog.** For each, ask which edge was missing or underweighted. In a pilot report they are worth more than the 94 %.` },
          ],
          result: md`Recall 94 %, precision 7.9 % (4.9 times the base rate), 80.6 % of executions saved. A shadow pilot is the only way to get these numbers before the customer has to trust the selection, which is why it belongs in the pilot plan.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Break-even probabilities and the rule of three",
          given: md`$c_h$ = EUR 120/h, $C_{esc}$ = EUR 25,000. After the pilot, the lab runs Ripple's selection in production and runs a random 5 % of unselected executions as a shadow sample.`,
          steps: [
            { md: md`48 h endurance test: $p^{*} = 120 \times 48 / 25{,}000$.` },
            { md: md`$= 0.2304$.`, hidden: true, check: { prompt: "Break-even probability for the 48 h test", answer: 0.2304, tolerance: { abs: 0.001 } } },
            { md: md`A month of production has 2,580 unselected executions; 5 % shadow sampling runs about 129 of them, and none fails.` },
            { md: md`95 % upper bound on the miss rate per unselected execution: $3 / 129$.` },
            { md: md`$\approx 0.023$, about 2.3 %.`, hidden: true, check: { prompt: "Upper bound on miss rate (as a fraction)", answer: 0.0233, tolerance: { abs: 0.001 } } },
          ],
          result: md`Zero failures in 129 shadow runs still allows up to about 2.3 % of skipped executions to be regression-revealing, which across 2,580 skips is up to about 60 potential escapes a month at 95 % confidence. To claim a tighter bound you need more shadow runs or the periodic full regression. Never report "zero escapes" without the $n$ behind it.`,
        },
        {
          kind: "question",
          question: {
            id: "aw05-l02-p1",
            type: "numeric",
            prompt: md`Illustrative: a 10 h thermal cycling test has regression probability 0.04 after a derating-table change. Rig hour cost EUR 150, escape cost EUR 30,000. What is the expected cost saving (EUR) of running it versus skipping it? (Positive means running is cheaper.)`,
            answer: -300,
            tolerance: { abs: 1 },
            unit: "EUR",
            explanation: md`Run cost $150 \times 10 = 1{,}500$. Skip cost $0.04 \times 30{,}000 = 1{,}200$. Running costs EUR 300 more than skipping: saving $= 1{,}200 - 1{,}500 = -300$. Break-even $p^{*} = 1{,}500/30{,}000 = 0.05$, above 0.04, so the cost rule says skip. If the test verifies a safety function it goes in the mandatory set anyway, outside this calculation.`,
            concepts: ["aw05.run-threshold", "aw05.selection-cost-model"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Selection policies labs can live with",
      blocks: [
        {
          kind: "md",
          md: md`### Estimating the cost of an escape

$C_{esc}$ is an expectation over where the regression would otherwise be caught. Illustrative numbers for a drive-unit programme:

| Caught at | Probability | Cost when caught there | Contribution |
|---|---|---|---|
| Next weekly full regression | 0.70 | EUR 3,000 (rework, rerun, a week of latency) | EUR 2,100 |
| System or vehicle integration | 0.25 | EUR 40,000 (integration rig days, other teams blocked) | EUR 10,000 |
| Field | 0.05 | EUR 400,000 (service action, warranty, reputation) | EUR 20,000 |
| **Expected** | | | **EUR 32,100** |

The field tail dominates even at 5 %. Two practical consequences: a **periodic full regression** (weekly, and always before release) is the cheapest way to cut $C_{esc}$, because it moves probability mass from the expensive rows to the first one; and tests guarding safety functions or customer-witnessed requirements get a **mandatory** flag instead of a cost.

### A three-tier policy

1. **Mandatory set** (always run): safety functions (STO, e-stop, protective stops), smoke tests, tests with no incoming edges, customer-witnessed tests.
2. **Selected set**: the per-test cost rule on calibrated $p_i$, ordered by priority for the overnight queue.
3. **Safety net**: shadow sampling of unselected tests (2 to 10 %) for continuous recall measurement, plus a full regression on a fixed cadence and before every release.

This is the policy shape that matches how the research brief describes hardware labs today: hardware-dependent system tests are mostly manual and selected by tester judgement (OMICRON study). Ripple formalises the judgement and measures it; it does not remove the safety net.`,
        },
        { kind: "sources", refs: ["aw05-r1", "aw05-r3", "aw05-r4", "aw05-r5", "aw05-r22"] },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How selection claims go wrong",
          md: md`- **Claiming "safe".** Formal safety needs the controlled regression testing assumption, which rigs violate. Claim measured recall with its confidence bound.
- **Measuring recall only on what you ran.** Without shadow runs or full regressions, escapes are invisible and recall looks like 100 %.
- **One threshold for all tests.** Ignores duration; either wastes rig days or drops cheap high-value tests.
- **Counting flaky failures as caught regressions.** Inflates recall and precision. Classify failures (product, rig, flaky) before scoring.
- **Leaving the cost of an escape implicit.** If the customer never states $C_{esc}$, the threshold is arbitrary. Get a number, even a range.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "The ROI line for a pilot proposal",
          md: md`Illustrative: a lab running 71 h of regression per firmware build, 2 builds a week, at EUR 120 per rig hour, spends about EUR 17,000 a week of rig time on regression. A selection running 17 h with 98 % expected recall plus a weekly full run is about $(2 \times 17 + 71) \times 120 =$ EUR 12,600, and the builds get overnight feedback instead of three-day feedback. Lead with latency (engineers feel it daily), back it with euros, and always show measured recall next to the saving.`,
        },
        {
          kind: "question",
          question: {
            id: "aw05-l02-p2",
            type: "short",
            prompt: md`Write the **selection policy** section of a Ripple pilot proposal for a humanoid actuator test lab (illustrative: 2 rigs, 140 tests, about 90 rig hours for a full regression, firmware twice a week, a grasp model retrained monthly). Specify the mandatory set, the selection rule with its cost inputs, shadow sampling, the full-regression cadence, how escapes are classified and reported, and the pilot's success metrics with numbers.`,
            rubric: [
              "Defines a mandatory set with concrete members (safety functions such as STO or protective stop, smoke tests, unlinked tests, witnessed tests)",
              "Uses a per-test cost rule (rig hour cost, test duration, escape cost) rather than a single score threshold, and says where the cost inputs come from",
              "Includes shadow sampling with a rate and explains the confidence bound it gives (rule of three or equivalent)",
              "Keeps a periodic and pre-release full regression as a safety net",
              "Defines escape classification (product regression vs rig fault vs flaky) and how escapes feed back into the graph",
              "States measurable success metrics: recall with confidence, rig hours saved, feedback latency, and no escape on mandatory tests",
            ],
            explanation: md`A pilot policy has to make the risk boundary explicit (mandatory set), make the decision rule depend on cost and duration, and measure what selection misses; without shadow sampling and full regressions, recall cannot be reported honestly.`,
            modelAnswer: md`**Mandatory (always run):** STO and protective-stop timing, torque-limit and collision-force tests, smoke suite (comms, encoder health, zero-torque hold), every test with no incoming graph edge, tests named in customer or notified-body witness plans.

**Selection rule:** run test $i$ if $p_i > c_h h_i / C_{esc}$. $c_h$ = the lab's loaded rig rate (agreed in week 1; illustrative EUR 140/h). $C_{esc}$ from the lab's escape table (weekly full run, system integration, field), agreed per test family; illustrative EUR 30k for performance tests. $p_i$ from the graph score times calibrated failure history, recalibrated monthly.

**Shadow sampling:** 5 % of unselected executions, chosen at random each night. With about 150 skipped executions a night, that is roughly 7 a night and about 200 a month; zero failures bounds the per-execution miss rate near 1.5 % (95 %).

**Safety net:** full regression every weekend and before every release; after every grasp-model retrain, the full model-dependent family runs once (Lesson 5).

**Escapes:** any failure in shadow or full runs on a test Ripple skipped is an escape. Classified within 24 h as product regression, rig fault or flaky (by rerun and rig-signal review in Lockstep). Product escapes get a root-cause line (missing edge, wrong weight, wrong $p$) and a graph fix.

**Success metrics (8-week pilot):** recall at least 95 % on product regressions with the Wilson interval reported; at least 50 % of regression rig hours saved; median feedback latency per firmware build under 16 h; zero escapes on mandatory tests (by construction); weekly report shared with the test lead.`,
            concepts: ["aw05.selection-cost-model", "aw05.shadow-sampling", "aw05.run-threshold"],
            difficulty: 3,
          },
        },
        { kind: "scenario", scenario: "aw05-s1" },
        {
          kind: "feynman",
          prompt: "Explain to a validation manager why Ripple does not claim to be 'safe', and why that makes it more trustworthy rather than less.",
          keyPoints: [
            "Safe selection means never skipping a test that would reveal the change; it relies on only the code changing between runs",
            "On rigs the hardware, calibration, environment and learned models also change, and runs are not perfectly repeatable",
            "So the honest claim is measured recall with a confidence bound, at a stated rig cost",
            "Safety-critical tests are never skipped: they sit in a mandatory set outside the optimisation",
            "Shadow sampling and periodic full regressions measure and limit what selection misses",
          ],
        },
        { kind: "xref", to: "m08.emv", note: "Expected monetary value from Track 0 risk management: the escape term in the selection cost is an EMV per skipped test." },
        { kind: "xref", to: "fc09-l06", note: "Expected value and value of information in founder decisions; shadow sampling is buying information about your own error rate." },
      ],
    },
  ],
  quiz: [
    {
      id: "aw05-l02-q1",
      type: "mcq",
      prompt: "Which problem permanently removes tests from the suite?",
      options: ["Test selection", "Test prioritisation", "Test suite minimisation", "Shadow sampling"],
      answer: 2,
      explanation: md`Minimisation deletes redundant tests for good. Selection picks a subset for one change; prioritisation orders tests. Ripple should select and prioritise, never minimise silently.`,
      concepts: ["aw05.rts-problems"],
      difficulty: 1,
    },
    {
      id: "aw05-l02-q2",
      type: "mcq",
      prompt: "A selection technique is called safe when...",
      options: [
        "It never selects a test that passes",
        "It selects every modification-revealing test, under the controlled regression testing assumption",
        "It always runs the safety-function tests",
        "Its precision is above the base rate",
      ],
      answer: 1,
      explanation: md`Safety is about inclusiveness: 100 % of modification-revealing tests. The mandatory set for safety functions is a policy choice, not the formal definition.`,
      concepts: ["aw05.safe-selection"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw05-l02-q3",
      type: "numeric",
      prompt: md`A selection ran 300 of 1,500 executions. Full runs show 40 regression-revealing executions, of which 36 were selected. What is the recall, in %?`,
      answer: 90,
      tolerance: { abs: 0.1 },
      unit: "%",
      explanation: md`Recall $= 36/40 = 90\%$. Precision $= 36/300 = 12\%$, against a base rate of $40/1{,}500 = 2.7\%$.`,
      concepts: ["aw05.precision-recall"],
      difficulty: 1,
    },
    {
      id: "aw05-l02-q4",
      type: "numeric",
      prompt: md`Rig hours cost EUR 100. An escape costs EUR 20,000. What is the break-even regression probability for a 6 h test?`,
      answer: 0.03,
      tolerance: { abs: 0.0005 },
      explanation: md`$p^{*} = 100 \times 6 / 20{,}000 = 0.03$. Run the test if its regression probability is above 3 %.`,
      concepts: ["aw05.run-threshold"],
      difficulty: 1,
    },
    {
      id: "aw05-l02-q5",
      type: "multi",
      prompt: "Which reasons make formal safety unattainable for physical test selection? (Select all that apply.)",
      options: [
        "Rig hardware and calibration change between runs",
        "Runs are nondeterministic (thermal state, noise, learned policies)",
        "Calibration tables and model weights change behaviour without code changes",
        "Breadth-first search is too slow on large graphs",
        "Implicit couplings are missing from the graph",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`All break the controlled regression testing assumption or graph completeness. BFS is $O(V+E)$, fast enough for any lab.`,
      concepts: ["aw05.safe-selection"],
      difficulty: 2,
    },
    {
      id: "aw05-l02-q6",
      type: "numeric",
      prompt: md`Shadow sampling ran 300 unselected executions with zero failures. Using the rule of three, what is the approximate 95 % upper bound on the per-execution miss rate, in %?`,
      answer: 1,
      tolerance: { abs: 0.05 },
      unit: "%",
      explanation: md`$3/300 = 0.01 = 1\%$. Zero observed escapes is never proof of zero escapes.`,
      concepts: ["aw05.shadow-sampling"],
      difficulty: 1,
    },
    {
      id: "aw05-l02-q7",
      type: "decision",
      prompt: md`A pilot customer's test lead wants Ripple to report "zero escapes" after two weeks, based only on the tests Ripple selected passing or failing as expected. You are the CEO. What do you put in the report?`,
      options: [
        { text: "Report zero escapes: nothing failed that Ripple did not predict.", score: 0, feedback: "Escapes live in the unselected tests. Without running some of them, zero is unmeasured, not zero." },
        { text: "Report recall as not yet measurable, propose 5 % shadow sampling plus the weekend full run, and give the date by which a recall figure with a confidence bound will exist.", score: 1, feedback: "Correct: you protect the customer and your credibility, and you turn the gap into a plan." },
        { text: "Report an estimated recall of 95 % from the model's own probabilities.", score: 0.3, feedback: "Model-estimated recall is useful internally, but presenting it as measured recall is misleading." },
      ],
      explanation: md`Recall needs the false-negative cell, which only shadow runs or full regressions reveal. The rule of three tells you how many shadow runs a claim needs.`,
      concepts: ["aw05.shadow-sampling", "aw05.precision-recall"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw05-l02-f1", front: "Modification-revealing test", back: "A test whose output on the changed system differs from its output on the old system.", concepts: ["aw05.safe-selection"] },
    { id: "aw05-l02-f2", front: "Controlled regression testing assumption", back: "Between the old and new run, only the code changes: same inputs, environment, hardware, deterministic execution. Rigs violate it.", concepts: ["aw05.safe-selection"] },
    { id: "aw05-l02-f3", front: "Recall vs precision of a selection", back: "Recall = TP/(TP+FN), share of revealing tests kept. Precision = TP/(TP+FP), share of selected tests that reveal.", concepts: ["aw05.precision-recall"] },
    { id: "aw05-l02-f4", front: "Per-test run rule", back: md`Run if $p_i > c_h h_i / C_{esc}$: long tests need stronger evidence.`, concepts: ["aw05.run-threshold"] },
    { id: "aw05-l02-f5", front: "Rule of three", back: "Zero events in n trials: 95 % upper bound on the rate is about 3/n.", concepts: ["aw05.shadow-sampling"] },
    { id: "aw05-l02-f6", front: "Rothermel and Harrold's 'precision'", back: "Share of non-revealing tests omitted (an omission rate), not the ML precision TP/(TP+FP). Say which you mean.", concepts: ["aw05.safe-selection"] },
    { id: "aw05-l02-f7", front: "Three-tier selection policy", back: "Mandatory set always; selected set by cost rule; safety net of shadow sampling and periodic plus pre-release full regression.", concepts: ["aw05.selection-cost-model", "aw05.shadow-sampling"] },
  ],
  scenarios: [
    {
      id: "aw05-s1",
      title: "\"If it isn't safe, we can't use it\"",
      dayInLife: true,
      context: md`Second meeting with the head of validation at a robotics company evaluating a Ripple pilot (illustrative). She has read about safe regression test selection and says: "Our rig time is the bottleneck, but if your tool can skip a test that would have caught a regression, I can't sign off on it. Is Ripple safe or not?" Ismail is with you.`,
      start: "a",
      concepts: ["aw05.safe-selection", "aw05.shadow-sampling", "aw05.selection-cost-model"],
      nodes: {
        a: {
          md: md`How do you answer the direct question?`,
          choices: [
            { text: "\"Yes, Ripple is safe: it uses the full dependency graph.\"", score: 1, feedback: "False on rigs, and she has read the literature. The first escape ends the relationship.", next: "c" },
            { text: "\"Formally, no tool can be safe on a physical rig, because hardware, calibration and runs change too. What we offer is measured recall with a bound, a mandatory set we never skip, and your full regression kept as a safety net.\"", score: 10, feedback: "Precise and honest; it reframes the question from a guarantee to a measured, bounded risk she controls.", next: "b" },
            { text: "\"It depends on how you configure it.\"", score: 3, feedback: "True but evasive; it pushes the hard question back to her.", next: "b" },
          ],
        },
        b: {
          md: md`She asks: "How would I know the recall before I trust it?"`,
          choices: [
            { text: "Propose a shadow pilot: Ripple proposes selections while her team keeps the full regression for 6 to 8 weeks; you report recall, precision and every escape with its root cause; then switch to production with 5 % shadow sampling and a weekend full run.", score: 10, feedback: "Recall is measured before she has to rely on it, and stays measured afterwards.", next: "d" },
            { text: "Offer to share the model's predicted recall from your internal benchmarks.", score: 3, feedback: "Benchmarks on other data say little about her rigs.", next: "d" },
          ],
        },
        c: {
          md: md`Three weeks into a pilot, a thermal derating regression slips past a skipped soak test and is found at system integration. She calls you.`,
          choices: [
            { text: "Own it, classify the escape, show the missing edge and the fix, and propose a shadow phase and mandatory set you should have started with.", score: 5, feedback: "Recovers some trust, at a cost a precise first answer would have avoided." },
          ],
        },
        d: {
          md: md`She asks which tests would be mandatory.`,
          choices: [
            { text: "Ask her team for the list, and propose a default: safety functions (STO, protective stop, force limits), smoke tests, any test without graph links, and witnessed tests; she owns the list and Ripple never optimises it.", score: 10, feedback: "Gives her control of the risk boundary, which is what a validation head needs to sign." },
            { text: "Tell her Ripple will learn which tests matter, so a mandatory list is unnecessary.", score: 0, feedback: "Removes her control over the most consequential decisions; no validation head will accept it." },
          ],
        },
      },
    },
  ],
};

export default lesson;
