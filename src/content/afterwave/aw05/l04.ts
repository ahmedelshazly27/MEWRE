import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw05-l04",
  title: "Learning impact from history: co-change, failure history, prioritisation and cold start",
  summary:
    "Turn bench memory into impact knowledge: co-change and co-failure association with confidence and lift, Bayesian smoothing for sparse counts, history-based prioritisation, predictive test selection with gradient-boosted models and the features that matter on rigs, calibration with the Brier score, APFD and cost-cognizant APFDc with worked calculations, the feedback bias of learning only from tests you chose to run, and how to start when there is no history.",
  minutes: 90,
  objectives: [
    "Compute confidence and lift of a change-to-failure association and smooth sparse estimates with a Beta prior",
    "Explain history-based prioritisation and predictive test selection, and list rig-specific features",
    "Compute APFD and APFDc for an ordering and explain why APFDc is the right metric for rigs",
    "Check calibration with the Brier score and explain why the cost model needs calibrated probabilities",
    "Explain selection feedback bias and label noise, and design a cold-start strategy for a new customer",
  ],
  concepts: [
    { id: "aw05.co-change", name: "Co-change and co-failure association", description: "Rules of the form 'when artifact A changes, test t fails' mined from history, scored by confidence and lift over the test's base failure rate.", competency: "aw-impact", related: ["aw05.edge-provenance"] },
    { id: "aw05.bayesian-smoothing", name: "Bayesian smoothing of failure rates", description: "Beta-Binomial posterior mean (k + α)/(n + α + β) shrinks sparse counts toward a prior and is the cold-start estimate.", competency: "aw-impact", related: ["aw05.co-change"] },
    { id: "aw05.predictive-selection", name: "Predictive test selection", description: "A model of P(test fails | change, context) trained on history with change, test and pair features; outputs feed the cost rule and the queue order.", competency: "aw-ml", related: ["aw05.selection-cost-model", "aw05.co-change"] },
    { id: "aw05.apfd", name: "APFD and APFDc", description: "Area under faults-detected versus suite executed; APFDc uses cumulative test cost (rig hours) instead of test count.", competency: "aw-impact" },
    { id: "aw05.calibration", name: "Probability calibration", description: "Predicted failure probabilities match observed frequencies; checked with reliability plots and the Brier score.", competency: "aw-ml", related: ["aw05.predictive-selection"] },
    { id: "aw05.feedback-bias", name: "Selection feedback bias and label noise", description: "A selector only observes outcomes of tests it ran, and failures include flaky and rig faults; exploration, propensity weighting and failure classification correct for both.", competency: "aw-ml", related: ["aw05.shadow-sampling"] },
    { id: "aw05.cold-start", name: "Cold start", description: "No history for a new customer, test, rig or product: start from graph and coverage priors, backfill archives, pool similar tests and explore.", competency: "aw-impact", related: ["aw05.bayesian-smoothing"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What history knows that the graph does not",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Bench memory is Afterwave's compounding asset: every run Lockstep records makes Ripple's next selection better. That is the data moat story in the pitch, and the cold-start question ("what do I get in week one, before you have our history?") is the first thing a buyer and an investor will ask. You need to explain how learning from history works, what it needs, how you measure it, and what you offer on day one.`,
        },
        {
          kind: "md",
          md: md`### The raw material

History is a table of **change events** joined to **test executions**:

| Field | Example | Source |
|---|---|---|
| Change event id, time | build 2.4.1, 2026-10-14 | Firmware build server, model registry, asset or calibration database |
| Changed artifacts | current-loop module, KP_IQ, grasp model v17, encoder S/N | Diff resolved to graph nodes (Lesson 1) |
| Test execution | torque step, run 8812, rig D2 | Sequencer and test management (TestStand, Xray, TestRail) |
| Outcome and class | fail, product regression | Verdict plus triage (product, rig fault, flaky) |
| Context | ambient 31 °C, 12 days since calibration | Lockstep run record |

Graph edges say what **can** affect what. History says what **did**: including couplings nobody declared (the shared supply, the cell that runs hot in summer, the fixture that loosens after 200 cycles).

### Association: confidence and lift`,
        },
        { kind: "equation", formula: "aw05-association" },
        {
          kind: "md",
          md: md`Confidence alone misleads: a fragile test that fails after 20 % of all changes will show 20 % confidence with every artifact. **Lift** divides out the base rate. Lift near 1 means no association; lift of 3 or more with a decent count is an edge candidate.

### Smoothing sparse counts

Most (artifact, test) pairs have few observations. One failure in two changes is not a 50 % failure rate. Use a Beta prior whose mean is the test's base rate and whose strength $\alpha + \beta$ is how many observations you would need before trusting the pair's own data:`,
        },
        { kind: "equation", formula: "aw05-beta-smoothing" },
        {
          kind: "md",
          md: md`The same formula is the cold-start estimate (with $k = n = 0$ it returns the prior mean) and the input to the cost rule $p_i > c_h h_i / C_{esc}$ from Lesson 2.

### History-based prioritisation

The simplest learned signal: tests that failed recently tend to fail again. Kim and Porter (2002) keep an exponentially smoothed history per test:`,
        },
        { kind: "equation", formula: "aw05-exp-smoothing" },
        {
          kind: "md",
          md: md`Elbaum, Rothermel and Penix (2014) showed at Google scale that time windows over failure history and execution recency select and order tests effectively in continuous integration. Spieker et al. (2017) learned prioritisation with reinforcement learning (RETECS) from duration, last execution and failure history, evaluated on industrial data including ABB robotics. These are **strong baselines**: any learned model in Ripple has to beat them on the customer's own data, or it is not worth its complexity.

### Predictive test selection

Facebook's predictive test selection (Machalica et al., 2019) trained a gradient-boosted classifier of $P(\text{test fails} \mid \text{change})$ on historical change and test outcomes and used it to run a fraction of tests while catching most failures. The same structure works on rigs with physical features:

| Feature group | Examples for a physical AI lab |
|---|---|
| Change | Artifact types changed (code, calibration, model, rig); diff size; modules; table cells changed; model divergence rate on replay (Lesson 5) |
| Test | Smoothed failure rate, recency of last failure, duration, flake rate, last margin to limit |
| Pair | Graph score and path length (Lesson 1), coverage overlap, table-cell overlap, sensitivity weight (Lesson 3), co-failure lift |
| Context | Rig id, days since calibration, ambient temperature, DUT hardware revision |

Gradient-boosted trees are the usual first choice: tabular, mixed types, strong with a few thousand positives, and per-feature contributions that feed the explanation (Lesson 6). Text similarity between test names and descriptions (embeddings) helps for new tests with no history.

### Calibration: the cost rule needs real probabilities

Ranking metrics only need a good order. The cost rule needs $p_i$ to mean what it says: among pairs predicted at 10 %, about 10 % should fail. Check with a reliability plot and the Brier score; fix with isotonic or Platt recalibration on recent data.`,
        },
        { kind: "equation", formula: "aw05-brier" },
        {
          kind: "md",
          md: md`### Measuring an ordering: APFD and APFDc

Rothermel et al. (2001) score an ordering by the area under the curve of faults detected against the fraction of the suite run:`,
        },
        { kind: "equation", formula: "aw05-apfd" },
        {
          kind: "md",
          md: md`APFD counts tests, not hours. On a rig where tests range from 1 h to 48 h this rewards putting a long test first if it finds a fault, even when two short tests would have found it sooner. Elbaum, Malishevsky and Rothermel (2001) generalised it to costs and severities:`,
        },
        { kind: "equation", formula: "aw05-apfdc" },
        {
          kind: "md",
          md: md`### Two traps specific to learning from your own selections

**Feedback bias.** Once Ripple selects, it only sees outcomes of tests it ran. Pairs it judged unlikely never produce labels, so the model never learns it was wrong about them, and the missing labels are not random. Remedies: keep **exploration** (the shadow sample from Lesson 2 doubles as exploration data), and weight each observed outcome by $1/\pi_i$, the inverse of the probability it was run (inverse propensity weighting), so rarely-run tests count for more when they are run.

**Label noise.** A failure can be a product regression, a **rig fault** (loose connector, drifting sensor, chamber overshoot) or a **flaky** test (nondeterministic for reasons unrelated to the change; Luo et al. 2014 catalogued causes in software). Training on raw verdicts teaches the model that a fixture fault is a firmware dependency. Classify failures first; Lockstep's rig signals recorded alongside the verdict are what make rig-fault classification possible.

### Cold start

A new customer, new product, new test or new rig has no history. The answer is a layered prior, not "wait six months":
1. **Graph and coverage priors** (Lessons 1 and 3) work from day one.
2. **Backfill**: most labs have years of results in test management tools and DAQ files; parse them into change and execution records before the pilot starts.
3. **Pooling**: a new test inherits the smoothed rate of its family (same sequence template, same requirement, similar name), shrinking toward its own data as it accumulates (hierarchical Beta prior).
4. **Exploration**: run unselected tests with a small probability, more for new tests (a bandit view: Thompson sampling from each pair's Beta posterior).`,
        },
      ],
    },
    {
      layer: "applied",
      title: "History numbers worked through",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Is the thermal module really linked to the thermal soak test?",
          given: md`Illustrative backfilled history: 800 change events. The 2 h thermal soak test failed (product regressions only) after 32 of them. 60 events touched the thermal model module; the soak test failed after 9 of those.`,
          steps: [
            { md: md`Base rate $P(F) = 32/800 = 0.04$.` },
            { md: md`Confidence $= 9/60 = 0.15$. Lift $= 0.15/0.04 = 3.75$: thermal-module changes make soak failures almost four times as likely as average.` },
            { md: md`Smoothed probability with prior mean 0.04 and strength 25 ($\alpha = 1$, $\beta = 24$): $\hat p = (9 + 1)/(60 + 25) = 10/85 = 0.118$.` },
            { md: md`**Contrast a sparse pair:** the DC-link capacitor parameter changed twice and the soak test failed once. Raw rate 0.5; smoothed $(1 + 1)/(2 + 25) = 0.074$. Two observations barely move the prior.` },
            { md: md`**Cost rule** (Lesson 2: EUR 120/h, 6 h, escape EUR 25,000, $p^{*} = 0.0288$): with $\hat p = 0.118$ the soak test runs after any thermal-module change; with 0.074 it also runs, but the reason shown to the engineer must say "1 of 2, weak evidence".` },
          ],
          result: md`Lift 3.75 and a smoothed probability of 0.118 justify a learned edge from the thermal module to the soak test with weight about 0.12. Smoothing stops a single coincidence from becoming a 50 % rule.`,
        },
        {
          kind: "worked",
          mode: "worked",
          title: "APFD and APFDc for an overnight queue",
          given: md`Six tests with rig hours T1 2, T2 3, T3 6, T4 4, T5 5, T6 2 (22 h in total). Three faults in the build: F1 is revealed by T2 and T5; F2 by T5 only; F3 by T3 and T6. Compare the default order T1 to T6, a fault-count order T5, T3, T2, T1, T4, T6, and a cost-aware order T5, T6, T2, T1, T3, T4.`,
          steps: [
            { md: md`**Default order:** first detections $TF_1 = 2$ (T2), $TF_2 = 5$ (T5), $TF_3 = 3$ (T3). APFD $= 1 - 10/(6 \times 3) + 1/12 = 1 - 0.556 + 0.083 = 0.528$.` },
            { md: md`**Fault-count order:** $TF = 1, 1, 2$. APFD $= 1 - 4/18 + 1/12 = 0.861$. **Cost-aware order:** also $TF = 1, 1, 2$ (T6 is second), APFD $= 0.861$. APFD cannot tell them apart.` },
            { md: md`**APFDc, default:** for each fault, hours from its first detecting test to the end, minus half that test: F1 $20 - 1.5 = 18.5$; F2 $7 - 2.5 = 4.5$; F3 $17 - 3 = 14$. Sum 37; APFDc $= 37/(22 \times 3) = 0.561$.` },
            { md: md`**APFDc, fault-count order:** F1 and F2 at T5: $22 - 2.5 = 19.5$ each; F3 at T3 (hours from T3 on: $6 + 3 + 2 + 4 + 2 = 17$): $17 - 3 = 14$. Sum 53; APFDc $= 53/66 = 0.803$.` },
            { md: md`**APFDc, cost-aware order:** F1, F2 at T5: 19.5 each; F3 at T6 ($22 - 5 = 17$ h from T6 on): $17 - 1 = 16$. Sum 55; APFDc $= 55/66 = 0.833$. All three faults are known after 7 h instead of 11 h.` },
          ],
          result: md`APFD rates the two prioritised orders equally (0.861); APFDc prefers the cost-aware one (0.833 vs 0.803) because it finds F3 with a 2 h test instead of a 6 h one. For overnight rig plans, evaluate with APFDc or directly with "faults found by hour h".`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "Faults detected versus rig hours elapsed (three orderings)",
          xKey: "hours",
          xLabel: "Rig hours elapsed",
          yLabel: "Faults detected (of 3)",
          series: [
            { key: "default", label: "Default order" },
            { key: "faultCount", label: "Fault-count order" },
            { key: "costAware", label: "Cost-aware order" },
          ],
          data: [
            { hours: 0, default: 0, faultCount: 0, costAware: 0 },
            { hours: 2, default: 0, faultCount: 0, costAware: 0 },
            { hours: 4, default: 0, faultCount: 0, costAware: 0 },
            { hours: 6, default: 1, faultCount: 2, costAware: 2 },
            { hours: 8, default: 1, faultCount: 2, costAware: 3 },
            { hours: 10, default: 1, faultCount: 2, costAware: 3 },
            { hours: 12, default: 2, faultCount: 3, costAware: 3 },
            { hours: 14, default: 2, faultCount: 3, costAware: 3 },
            { hours: 16, default: 2, faultCount: 3, costAware: 3 },
            { hours: 18, default: 2, faultCount: 3, costAware: 3 },
            { hours: 20, default: 3, faultCount: 3, costAware: 3 },
            { hours: 22, default: 3, faultCount: 3, costAware: 3 },
          ],
          caption: "A fault counts as detected when its first detecting test finishes. The area under each curve, normalised, is what APFDc measures.",
        },
        {
          kind: "worked",
          mode: "faded",
          title: "APFD and the Brier score",
          given: md`(a) A 10-test ordering reveals 4 faults first at positions 2, 3, 3 and 7. (b) A model predicted failure probabilities 0.9, 0.2, 0.1 and 0.6 for four (change, test) pairs; the outcomes were fail, pass, pass, fail.`,
          steps: [
            { md: md`(a) $\sum TF_i = 2 + 3 + 3 + 7 = 15$; APFD $= 1 - 15/(10 \times 4) + 1/20$.` },
            { md: md`$= 1 - 0.375 + 0.05 = 0.675$.`, hidden: true, check: { prompt: "APFD", answer: 0.675, tolerance: { abs: 0.002 } } },
            { md: md`(b) Squared errors: $(0.9 - 1)^2 = 0.01$, $(0.2 - 0)^2 = 0.04$, $(0.1 - 0)^2 = 0.01$, $(0.6 - 1)^2 = 0.16$.` },
            { md: md`$BS = (0.01 + 0.04 + 0.01 + 0.16)/4 = 0.055$.`, hidden: true, check: { prompt: "Brier score", answer: 0.055, tolerance: { abs: 0.001 } } },
          ],
          result: md`APFD 0.675 (better than random, about 0.5). Brier 0.055; for reference, always predicting the base rate of 0.5 on this set would score 0.25. On real data with a 2 % base rate, compare against the base-rate forecaster $p(1-p) \approx 0.0196$, not against 0.25.`,
        },
        {
          kind: "question",
          question: {
            id: "aw05-l04-p1",
            type: "numeric",
            prompt: md`A test failed after 3 of 10 changes to the inverter's PWM module. Its family's base failure rate is 0.05 and you use a prior of strength 20. What is the smoothed failure probability? (3 decimals)`,
            answer: 0.133,
            tolerance: { abs: 0.002 },
            explanation: md`Prior $\alpha = 0.05 \times 20 = 1$, $\beta = 19$. $\hat p = (3 + 1)/(10 + 20) = 4/30 = 0.133$. The raw rate 0.30 is pulled toward 0.05 because 10 observations are only half the prior's weight.`,
            concepts: ["aw05.bayesian-smoothing"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Building and evaluating a history model with a customer",
      blocks: [
        {
          kind: "md",
          md: md`### The join is the hard part

The model is rarely the bottleneck; the **join** is. Change data lives in git, the firmware build server, the model registry, the asset and calibration database and logbooks. Results live in the sequencer, the test management tool and DAQ files on a share. Without a common key per run (which build, which model version, which rig configuration, which calibration state), history cannot be learned from. That key is the Lockstep run record; for backfill it must be reconstructed from timestamps, file paths and logbooks, with a confidence flag on each reconstructed link.

### How much history is enough (order of magnitude)

Illustrative: if 2 % of (change, test) pairs fail and you want about 50 positive examples before trusting a learned model over the priors, you need $50/0.02 = 2{,}500$ pair observations. With 40 tests run per change event that is about 63 change events; at 3 a week, about 21 weeks. Backfilling a year of archives can get you there before the pilot starts. Until then, the graph and coverage priors carry the selection and the learned part is shown as "learning" in explanations.

### Evaluate like it will be used

- **Temporal split only.** Train on the past, evaluate on the following weeks. A random split leaks future information (the same regression appears in train and test).
- **Metrics at budget.** Recall at a fixed rig-hour budget, APFDc for the queue, Brier score and a reliability plot for calibration.
- **Baselines.** Retest-all, graph-only score, history-only (exponential smoothing), random at the same budget. Report the model's lift over the best baseline, not over random.
- **Slices.** Recall by change type (firmware, calibration, model, rig). An aggregate 95 % can hide 70 % on rig changes.`,
        },
        { kind: "sources", refs: ["aw05-r13", "aw05-r14", "aw05-r15", "aw05-r16", "aw05-r17", "aw05-r18", "aw05-r19", "aw05-r20"] },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How history models fool their builders",
          md: md`- **Random train/test split** gives inflated recall from leakage.
- **Training on raw verdicts**, so rig faults and flaky failures become fake dependencies.
- **No exploration**: the model stops observing tests it skips and never corrects itself.
- **Uncalibrated scores** fed into the cost rule; a ranking model's 0.3 is not a 30 % probability.
- **Aggregate metrics only**, hiding poor recall on the change type that matters most to the customer.
- **Survivorship in backfill**: archives often keep only failed or final runs, overstating failure rates.`,
        },
        {
          kind: "callout",
          tone: "ai",
          title: "Where language models help, and where they do not",
          md: md`Language models are useful for **reconstructing history**: parsing free-text logbook entries ("swapped encoder on D2 after noise") into change events, matching test names across renamed sequences, and drafting failure triage notes from rig signals. They are not a substitute for the calibrated failure model: the probability that drives a rerun decision should come from counted evidence, with the language model's output treated as a feature or a link with its own confidence.`,
        },
        {
          kind: "question",
          question: {
            id: "aw05-l04-p2",
            type: "short",
            prompt: md`A pilot customer (illustrative: drive-unit lab) has 18 months of archived results in a test management tool, DAQ files on a network share, firmware builds in a build server and rig swaps in a paper logbook. Write the **data schema and evaluation plan** for Ripple's history model: the tables and keys, how backfilled links are reconstructed and flagged, how failures are classified, the train/test split, metrics, baselines and the cold-start fallback.`,
            rubric: [
              "Defines change-event, execution and run-context tables with a run key linking build, model version, rig configuration and calibration state",
              "Explains reconstruction of links from timestamps, paths and logbooks with a confidence flag, and digitising the logbook",
              "Classifies failures (product regression, rig fault, flaky) before training, with a method",
              "Uses a temporal split and reports recall at a rig-hour budget, APFDc and a calibration measure",
              "Compares against named baselines (retest-all, graph-only, exponential smoothing, random at same budget) and slices by change type",
              "States the cold-start fallback (graph and coverage priors, pooling, exploration) and when the learned model takes over",
            ],
            explanation: md`The model is rarely the bottleneck; the join between change data and results is. A credible plan reconstructs links with confidence flags, removes rig-fault and flaky labels, evaluates on future data against strong baselines and states a cold-start fallback.`,
            modelAnswer: md`**Tables.** change_event (id, time, type: firmware, calibration, model, rig, DUT; source; artifacts as graph node ids); execution (run id, test id, start, end, rig id, verdict, failure class, metric, limit); run_context (run id, firmware build hash, model version, rig configuration id, calibration certificate ids, ambient, DUT revision). Key: run id; each run maps to the latest change events before it on that rig.

**Backfill.** Builds: from build server timestamps and the firmware version string in DAQ file headers. Results: export from the test management tool, matched to DAQ files by rig and time window. Logbook: scanned and transcribed (LLM-assisted, human-checked) into rig change events. Each reconstructed link carries confidence high (hash match), medium (timestamp within the same shift) or low (date only); low-confidence links excluded from training, kept for analysis.

**Failure classes.** Rerun result where available; rig-signal review of failed runs (supply dips, sensor dropouts, chamber deviation); tests with more than 5 % pass-fail flips on unchanged builds marked flaky. Train only on product regressions.

**Split.** Train on months 1 to 15, evaluate on 16 to 18, then rolling monthly.

**Metrics.** Recall at 30 % and 50 % of full rig hours; APFDc of the proposed queue; Brier score and reliability plot; all sliced by change type.

**Baselines.** Retest-all, graph-only score, exponential smoothing of failure history, random at the same budget. Ship the learned model only if it beats the best baseline on recall at budget in every major slice.

**Cold start.** Until 50 product-regression positives exist per test family, use graph and coverage priors with Beta pooling by family; 5 % exploration on unselected tests, 20 % for tests added in the last month.`,
            concepts: ["aw05.predictive-selection", "aw05.feedback-bias", "aw05.cold-start", "aw05.apfd"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to an investor why Ripple gets better with every customer run, and what it does in week one before it has any history.",
          keyPoints: [
            "History shows which changes actually broke which tests, including couplings no one wrote down",
            "Counts are smoothed so rare coincidences do not become rules",
            "Day one uses the dependency graph and coverage, plus backfilled archives",
            "A small share of skipped tests is still run, so the model keeps learning where it was wrong",
            "Failures are classified first so rig faults and flaky tests do not poison the learning",
          ],
        },
        { kind: "xref", to: "m14.data-sanity", note: "Track 0's data sanity checks apply to backfilled bench history before any model is trained on it." },
      ],
    },
  ],
  quiz: [
    {
      id: "aw05-l04-q1",
      type: "numeric",
      prompt: md`A test fails after 10 % of all changes. After changes to the encoder driver it failed in 6 of 20. What is the lift?`,
      answer: 3,
      tolerance: { abs: 0.01 },
      explanation: md`Confidence $= 6/20 = 0.30$; lift $= 0.30/0.10 = 3$.`,
      concepts: ["aw05.co-change"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw05-l04-q2",
      type: "numeric",
      prompt: md`Six tests reveal 3 faults; the first detections are at positions 1, 2 and 4. What is the APFD? (3 decimals)`,
      answer: 0.694,
      tolerance: { abs: 0.002 },
      explanation: md`$1 - (1 + 2 + 4)/(6 \times 3) + 1/12 = 1 - 0.389 + 0.083 = 0.694$.`,
      concepts: ["aw05.apfd"],
      difficulty: 2,
    },
    {
      id: "aw05-l04-q3",
      type: "mcq",
      prompt: "Why is APFDc preferred over APFD for evaluating overnight rig plans?",
      options: [
        "It is easier to compute",
        "It accounts for test durations, so finding a fault with a 2 h test beats finding it with a 6 h test",
        "It ignores fault severity",
        "It counts only safety-relevant faults",
      ],
      answer: 1,
      explanation: md`APFD assumes equal test costs. Rig tests range from minutes to days, so the area under faults versus cumulative hours is the relevant measure.`,
      concepts: ["aw05.apfd"],
      difficulty: 1,
    },
    {
      id: "aw05-l04-q4",
      type: "multi",
      prompt: "Which practices protect a history-trained selector from fooling itself? (Select all that apply.)",
      options: [
        "Temporal train/test split",
        "Random exploration of unselected tests",
        "Classifying failures into product, rig and flaky before training",
        "Random train/test split to maximise training data",
        "Inverse propensity weighting of observed outcomes",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`A random split leaks the future into training. The others address leakage, feedback bias and label noise.`,
      concepts: ["aw05.feedback-bias", "aw05.predictive-selection"],
      difficulty: 2,
    },
    {
      id: "aw05-l04-q5",
      type: "mcq",
      prompt: "A model ranks tests well (high APFD) but its predicted probabilities are systematically three times too high. What breaks?",
      options: [
        "Nothing: ranking is all that matters",
        "The per-test cost rule, which compares the probability with a break-even value, selects far too many tests",
        "The dependency graph becomes cyclic",
        "The Brier score improves",
      ],
      answer: 1,
      explanation: md`The cost rule needs calibrated probabilities. Inflated $p_i$ exceed $p_i^{*}$ too often and rig hours are wasted. Recalibrate (isotonic or Platt) and check the Brier score.`,
      concepts: ["aw05.calibration"],
      difficulty: 2,
    },
    {
      id: "aw05-l04-q6",
      type: "order",
      prompt: "Order a cold-start plan for a new customer from day one onward.",
      items: [
        "Score with graph and coverage priors",
        "Backfill archived results into change and execution records",
        "Pool new tests with their family's smoothed rate",
        "Explore unselected tests at a small rate to collect labels",
        "Switch to the learned model once it beats baselines on a temporal split",
      ],
      explanation: md`Priors work immediately; backfill and pooling add evidence fast; exploration keeps labels coming; the learned model takes over only when it proves itself on held-out future data.`,
      concepts: ["aw05.cold-start"],
      difficulty: 1,
    },
    {
      id: "aw05-l04-q7",
      type: "numeric",
      prompt: md`Illustrative: 3 % of (change, test) pairs fail. How many pair observations are needed, in expectation, to collect 60 positive examples?`,
      answer: 2000,
      tolerance: { abs: 1 },
      explanation: md`$60/0.03 = 2{,}000$. At 50 tests per change event that is 40 events.`,
      concepts: ["aw05.cold-start"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "aw05-l04-f1", front: "Lift of a change-to-failure rule", back: "Confidence divided by the test's base failure rate; near 1 means no association.", concepts: ["aw05.co-change"] },
    { id: "aw05-l04-f2", front: "Beta-smoothed failure probability", back: md`$\hat p = (k + \alpha)/(n + \alpha + \beta)$; with no data it returns the prior mean.`, concepts: ["aw05.bayesian-smoothing"] },
    { id: "aw05-l04-f3", front: "APFD formula", back: md`$1 - \sum TF_i/(nm) + 1/(2n)$; random order averages about 0.5.`, concepts: ["aw05.apfd"] },
    { id: "aw05-l04-f4", front: "Why APFDc for rigs", back: "Weights by test cost (rig hours), so early detection with short tests is rewarded.", concepts: ["aw05.apfd"] },
    { id: "aw05-l04-f5", front: "Selection feedback bias", back: "The selector only sees outcomes of tests it ran; fix with exploration and inverse propensity weighting.", concepts: ["aw05.feedback-bias"] },
    { id: "aw05-l04-f6", front: "Three failure classes to separate before training", back: "Product regression, rig fault, flaky test.", concepts: ["aw05.feedback-bias"] },
    { id: "aw05-l04-f7", front: "Four cold-start layers", back: "Graph and coverage priors; backfilled archives; pooling by test family; exploration.", concepts: ["aw05.cold-start"] },
  ],
};

export default lesson;
