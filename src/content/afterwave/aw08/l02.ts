import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw08-l02",
  title: "Anomaly detection on bench signals: baselines, isolation forests, autoencoders and alarm cost",
  summary:
    "Most bench anomalies are rare, unlabelled and expensive to miss. Start with statistical baselines (z-scores, robust z-scores, control limits) per test step, add isolation forests and autoencoders when interactions between features matter, and set the alarm threshold with precision, recall, base rates and the cost of a false alarm versus a miss, not with F1 or gut feel.",
  minutes: 85,
  objectives: [
    "Build a per-step statistical baseline and explain masking, and why the robust z-score resists it",
    "Explain how isolation forests and autoencoders score anomalies, and when each beats a simple baseline",
    "Compute precision, recall and F1 from a confusion matrix, and the precision a detector will have at a given base rate",
    "Estimate false alarms from many simultaneous checks and choose a remedy (aggregation, Bonferroni, persistence)",
    "Choose the cost-optimal threshold from false alarm and missed-anomaly costs",
  ],
  concepts: [
    {
      id: "aw08.statistical-baseline",
      name: "Statistical baseline per test step",
      description:
        "Expected value and spread of each feature, learned from healthy reference runs of the same configuration and test step; anomalies are departures from it measured in standard deviations or percentiles.",
      competency: "aw-ml",
      related: ["aw08.windowing-features", "m14.scada-anomaly"],
    },
    {
      id: "aw08.robust-z",
      name: "Robust z-score and masking",
      description:
        "Outliers inflate the mean and standard deviation and hide themselves (masking); median and MAD based scores are unaffected by up to half the data being bad.",
      competency: "aw-ml",
      related: ["aw08.statistical-baseline"],
    },
    {
      id: "aw08.isolation-forest",
      name: "Isolation forest",
      description:
        "An ensemble of random trees that isolates points by random splits; anomalies need fewer splits, giving a high score. Works on feature vectors without labels.",
      competency: "aw-ml",
      related: ["aw08.statistical-baseline"],
    },
    {
      id: "aw08.autoencoder",
      name: "Autoencoder anomaly detection",
      description:
        "A neural network trained to compress and reconstruct healthy windows; windows it reconstructs poorly (high reconstruction error) are unlike the training data.",
      competency: "aw-ml",
      related: ["aw08.isolation-forest"],
    },
    {
      id: "aw08.precision-recall",
      name: "Precision, recall and the base rate",
      description:
        "Precision is the share of alarms that are real, recall the share of real anomalies caught; when anomalies are rare, precision collapses even for good detectors.",
      competency: "aw-ml",
    },
    {
      id: "aw08.alarm-cost",
      name: "Alarm cost and threshold choice",
      description:
        "Expected cost of a threshold is false alarms times their triage cost plus misses times their escape cost; the optimum on a calibrated probability is c_FP / (c_FP + c_FN).",
      competency: "aw-ml",
      related: ["aw08.precision-recall"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Four families of detectors and the arithmetic of alarms",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`"Find the anomalies in our test data" is the first thing a test lead will ask a data product to do, and the fastest way to lose them is an alarm stream they learn to ignore. You will price, pitch and scope this capability for Enclave. You need to know which method fits which data, why a 95 % accurate detector can still be useless, and how to agree a threshold with the customer in euros, so the pilot's success criteria are something you can actually meet.`,
        },
        {
          kind: "md",
          md: md`### What an anomaly is on a bench

Three kinds (Chandola et al., 2009): **point** anomalies (one window's RMS far above normal), **contextual** anomalies (a current that is normal at full torque but abnormal at idle: the context is the test step), and **collective** anomalies (a slow drift where each window is normal but the sequence is not). Most real bench problems are contextual or collective, which is why the test-step and firmware context from Lesson 1 matters more than the choice of algorithm.

### Family 1: statistical baselines

For each feature and test step, learn the mean and standard deviation from healthy reference runs and score new windows:`,
        },
        { kind: "equation", formula: "aw08-z-score" },
        {
          kind: "md",
          md: md`Control charts (Shewhart limits at $\pm 3\sigma$, EWMA and CUSUM for small persistent shifts) are the same idea with memory, and quality engineers already trust them. Their weakness is **masking**: if the baseline includes bad runs, $\sigma$ inflates and the outlier hides itself. The robust version uses median and MAD:`,
        },
        { kind: "equation", formula: "aw08-robust-z" },
        {
          kind: "md",
          md: md`**Masking in numbers.** Phase current RMS (A) over seven runs: 10.1, 10.3, 9.9, 10.0, 10.2, **14.0**, 10.1. Mean 10.66 A, sample standard deviation 1.48 A, so the 14.0 A run has $z = (14.0 - 10.66)/1.48 = 2.26$: **not flagged** at 3. Median 10.1 A; absolute deviations 0, 0.2, 0.2, 0.1, 0.1, 3.9, 0, so MAD = 0.1 A and $z_r = 0.6745 \times 3.9/0.1 = 26.3$: flagged by a wide margin.

### The multiple-comparisons trap

A detector checks many features on many windows. Each check has a small false alarm probability, and they add up:`,
        },
        { kind: "equation", formula: "aw08-false-alarms" },
        {
          kind: "md",
          md: md`Ten features on 1,000 windows per run at a two-sided 3σ limit ($\alpha = 0.0027$) gives **27 false alarms per run** on a healthy unit. Remedies: aggregate to one score per run or test step; tighten per-check limits (Bonferroni $\alpha/m$); require persistence (for example 3 consecutive windows); or use a multivariate score (below).

### Family 2: isolation forest

Build many random trees: pick a feature at random, cut at a random value between its min and max, repeat until each point is alone. Unusual points sit in sparse regions and are isolated after few cuts. The score normalises the average path length by $c(n)$, the expected path length in a random binary tree:`,
        },
        { kind: "equation", formula: "aw08-iforest-score" },
        {
          kind: "md",
          md: md`Strengths: no labels, handles dozens to hundreds of features, catches unusual **combinations** (normal current and normal temperature, but not together), fast. Weaknesses: axis-aligned cuts struggle with highly correlated features, the score is not a probability, and it explains nothing by itself (pair it with per-feature contributions or the robust z of the top features).

### Family 3: autoencoders and other reconstruction models

Train a network to compress a window (or its spectrum) into a small latent vector and reconstruct it, using **healthy data only**. On data like the training set, reconstruction error is low; on new behaviour it is high. 1D convolutional or recurrent autoencoders work on raw or lightly processed windows, so they can find patterns no one wrote a feature for. Costs: they need more healthy data (thousands of windows per operating condition at least), a GPU helps, thresholds still come from a validation set, and they happily learn to reconstruct anomalies that were in the "healthy" training data. Forecasting models (predict the next window, alarm on residual) are a close relative for collective anomalies like drift.

### Family 4: supervised classifiers

When you have labelled failures of a known type (Lesson 3), a classifier on features (gradient-boosted trees are the usual first choice) beats every unsupervised method for **that** failure, and is blind to new ones. In practice: unsupervised detector for "something is different", supervised models for known, recurring failure modes, both feeding one triage queue.`,
        },
        {
          kind: "matrix",
          title: "Which detector to start with",
          xAxis: ["Few features, known physics", "Many features or raw waveforms"],
          yAxis: ["No labelled failures", "Labelled failures of known types"],
          cells: [
            { label: "Robust z / control charts per test step", detail: "Explainable, trusted by quality engineers, minutes to build. Always the baseline to beat." },
            { label: "Isolation forest on features, autoencoder on waveforms", detail: "Catches unusual combinations and unwritten patterns; needs a labelled validation set to set the threshold." },
            { label: "Rules plus thresholds tuned on the labelled cases", detail: "Engineers' existing limit checks, tuned with real failure examples." },
            { label: "Supervised classifier for known modes, plus an unsupervised detector for new ones", detail: "Gradient-boosted trees on features; split by unit and campaign (Lesson 3)." },
          ],
          caption: "Top row: no labels. Bottom row: labels exist. Left: small, physics-led feature sets. Right: high-dimensional inputs.",
        },
        {
          kind: "md",
          md: md`### Scoring a detector: precision, recall and the base rate`,
        },
        { kind: "equation", formula: "aw08-precision" },
        { kind: "equation", formula: "aw08-recall" },
        { kind: "equation", formula: "aw08-f1" },
        {
          kind: "md",
          md: md`Precision depends on how rare anomalies are. With base rate $b$, recall $r$ and false positive rate $f$:

$$\text{Precision} = \frac{b\,r}{b\,r + (1-b)\,f}$$

At $b = 1\%$, $r = 90\%$, $f = 3\%$: precision $= 0.009/(0.009 + 0.0297) = 23\%$. Three out of four alarms are false, from a detector that sounds excellent. This is why Davis and Goadrich (2006) recommend precision-recall curves over ROC curves when positives are rare, and why "accuracy" should never appear in a pilot report (a detector that never alarms is 99 % accurate here).

### Setting the threshold with money

Every threshold trades false alarms against misses:`,
        },
        { kind: "equation", formula: "aw08-alarm-cost" },
        { kind: "equation", formula: "aw08-cost-threshold" },
        {
          kind: "chart",
          chart: "line",
          title: "Expected cost per 1,000 runs vs alarm threshold (computed, illustrative)",
          xKey: "t",
          xLabel: "Threshold on anomaly score (healthy scores ~ N(0,1), anomalies ~ N(3,1), base rate 1 %)",
          yLabel: "Expected cost, EUR thousand per 1,000 runs",
          series: [
            { key: "high", label: "Miss costs EUR 20,000" },
            { key: "low", label: "Miss costs EUR 2,000" },
          ],
          data: [
            { t: 1.0, high: 25.8, low: 21.7 },
            { t: 1.5, high: 22.3, low: 10.3 },
            { t: 2.0, high: 34.8, low: 6.2 },
            { t: 2.5, high: 62.5, low: 7.0 },
            { t: 3.0, high: 100.2, low: 10.2 },
            { t: 3.5, high: 138.3, low: 13.9 },
          ],
          caption: "False alarm costs EUR 135 (1.5 h triage at EUR 90/h). Recall = 1 − Φ(t − 3), false positive rate = 1 − Φ(t). When a miss is expensive, the best threshold is low (about 1.5, recall 93 %, precision 12 %); when misses are cheap it moves up (about 2.0). The familiar '3 sigma' is far from optimal in both.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Pricing an alarm policy for a drive test lab",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Two thresholds, one decision",
          given: md`Illustrative. A drive test lab runs 2,000 test runs a month; about 1 % (20) contain a real anomaly. Detector setting A: recall 90 %, false positive rate 3 %. Setting B: recall 75 %, false positive rate 0.5 %. A false alarm costs 1.5 engineer-hours at EUR 90/h = EUR 135. A missed anomaly costs EUR 20,000 on average (rerun campaign, late discovery, schedule slip). Numbers are illustrative.`,
          steps: [
            { md: md`**Setting A:** TP $= 0.9 \times 20 = 18$, FN $= 2$, FP $= 0.03 \times 1{,}980 = 59.4$. Precision $= 18/77.4 = 23\%$.` },
            { md: md`**Cost A** $= 59.4 \times 135 + 2 \times 20{,}000 = 8{,}019 + 40{,}000 =$ EUR 48,019 per month.` },
            { md: md`**Setting B:** TP $= 15$, FN $= 5$, FP $= 0.005 \times 1{,}980 = 9.9$. Precision $= 15/24.9 = 60\%$.` },
            { md: md`**Cost B** $= 9.9 \times 135 + 5 \times 20{,}000 = 1{,}337 + 100{,}000 =$ EUR 101,337 per month.` },
            { md: md`**Threshold rule check:** $p^* = 135/(135 + 20{,}000) = 0.0067$. Alarm on anything with more than a 0.7 % chance of being real. Setting A is closer to that rule.` },
            { md: md`**The human side:** 77 alarms a month is about 3.5 per working day, 5 to 6 hours of triage a day across the team. Feasible only if each alarm arrives with the evidence (which feature, which step, plot against baseline) so triage takes minutes, not 1.5 hours. Cutting triage time is the second lever, and it is product work, not model work.` },
          ],
          result: md`Setting A costs less than half of B despite precision of only 23 %, because misses are 150 times more expensive than false alarms. Agree $c_{FP}$ and $c_{FN}$ with the customer before the pilot and write the success criterion as cost or as recall at a stated alarm budget, never as accuracy or F1.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Scoring a pilot detector",
          given: md`Illustrative. In a pilot, Enclave's detector is run on 500 historical runs that engineers have reviewed; 25 contain real anomalies. The detector flags 40 runs, of which 20 are real.`,
          steps: [
            { md: md`TP $= 20$, FP $= 40 - 20 = 20$, FN $= 25 - 20 = 5$.` },
            {
              md: md`Precision $= 20/40 =$ **50 %**.`,
              hidden: true,
              check: { prompt: "Precision (%)", answer: 50, unit: "%", tolerance: { abs: 0.5 } },
            },
            {
              md: md`Recall $= 20/25 =$ **80 %**.`,
              hidden: true,
              check: { prompt: "Recall (%)", answer: 80, unit: "%", tolerance: { abs: 0.5 } },
            },
            {
              md: md`$F_1 = 2 \times 0.5 \times 0.8/1.3 =$ **0.615**.`,
              hidden: true,
              check: { prompt: "F1 (0..1)", answer: 0.615, tolerance: { abs: 0.005 } },
            },
            { md: md`Base rate in this set is 5 %, higher than the lab's 1 % in production (engineers picked interesting runs). At 1 %, with the same recall and false positive rate ($20/475 = 4.2\%$), precision would fall to $0.008/(0.008 + 0.0417) = 16\%$.` },
          ],
          result: md`Report precision at the production base rate, not the pilot set's. A curated pilot set flatters precision; the customer will experience the production number.`,
        },
        {
          kind: "question",
          question: {
            id: "aw08-l02-p1",
            type: "numeric",
            prompt: md`A detector computes 8 features on 2,000 windows per run and alarms on any check beyond a two-sided 3σ limit ($\alpha = 0.0027$). How many false alarms per healthy run do you expect? (1 decimal)`,
            answer: 43.2,
            tolerance: { abs: 0.1 },
            unit: "alarms",
            explanation: md`$m = 8 \times 2{,}000 = 16{,}000$ checks; $E[\text{FA}] = 16{,}000 \times 0.0027 = 43.2$. Aggregate per run or require persistence before shipping this.`,
            concepts: ["aw08.statistical-baseline", "aw08.alarm-cost"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Anomaly detection that test engineers keep using",
      blocks: [
        {
          kind: "md",
          md: md`### How it is done

- **Baselines per configuration.** One baseline per (product variant, test step, rig) at minimum. A baseline built across rigs flags rig differences, not unit problems. Rebuild after a calibration or fixture change, and version it.
- **Golden runs.** Engineers nominate reference runs they consider healthy. Treat this list as a labelled artefact with an owner; it decides what "normal" means.
- **Evidence with every alarm.** Feature, test step, value against baseline band, plot, the three most similar past runs and what happened to them. This turns 1.5 hours of triage into 10 minutes.
- **Feedback loop.** Every triaged alarm gets a label (real, false, known issue, rig problem). This is the cheapest labelled data you will ever get, and it feeds Lesson 3 and Lesson 6.
- **Alarm budget.** Agree with the test lead how many alarms per day the team will triage. Set the threshold to meet recall within that budget, then lower triage time to afford more.

### Where this sits in the landscape

Sift's late-2026 "Sift Agents" research preview reportedly investigates telemetry inside the customer's Sift environment and turns findings into reusable rules with human approval (research brief, secondary source). Expect buyers to have seen rule-based and AI-assisted anomaly review already; the Afterwave difference to argue is context (app actions and firmware on the same clock as the signals) and the link to Ripple: an anomaly after a change tells you which tests to rerun.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Competitor claim from secondary sources",
          md: md`The description of Sift Agents comes from a news summary (IT Brief, September 2026) recorded in the research brief, not from Sift's own documentation. Recheck on the primary page before using it in any external material.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- **Accuracy in the pilot report.** Meaningless at low base rates. Report recall and precision at the production base rate and the operating threshold.
- **Training the "healthy" model on everything.** Past failures in the training set teach the autoencoder that they are normal.
- **Baselines across rigs or firmware versions.** The detector rediscovers the rig and the firmware, not the fault.
- **No alarm budget.** Fifty alarms on day one, ignored by day five. Engineers stop trusting the product and it does not recover.
- **3σ by habit.** The cost-optimal threshold is usually far from 3σ; compute it.
- **Alarms without evidence.** A score of 0.73 tells an engineer nothing. Show the feature, the step and the plot.`,
        },
        {
          kind: "checklist",
          title: "Before an anomaly detection pilot starts",
          items: [
            "Base rate of real anomalies in production, estimated with the test lead",
            "Agreed cost of a false alarm (triage time) and of a miss (what happened last time one escaped)",
            "Alarm budget per day the team will actually triage",
            "Labelled evaluation set (real and healthy runs) reviewed by the customer's engineers, held out from tuning",
            "Baseline granularity: per variant, test step and rig",
            "Success criterion in recall at the alarm budget, or in expected cost, signed by the buyer",
          ],
        },
        {
          kind: "xref",
          to: "fc04-l06",
          note: "Founder Core covers pilot structure and written success criteria; use this lesson's cost formula to write the criterion for an anomaly detection pilot.",
        },
        {
          kind: "question",
          question: {
            id: "aw08-l02-p2",
            type: "short",
            prompt: md`**Produce it.** Write the success-criteria section of an Afterwave anomaly detection pilot proposal for a battery module or drive unit test lab (illustrative numbers). Include: the anomaly definition and base-rate estimate; how the labelled evaluation set is built and who labels it; the alarm budget; costs of a false alarm and a miss and the resulting threshold rule; the metrics you will report and at which base rate; and the pass/fail criterion the buyer signs.`,
            rubric: [
              "Defines what counts as an anomaly for this test type (point, contextual or collective) with the context used",
              "Evaluation set built from customer-reviewed runs, held out from tuning, labelled by named customer roles",
              "States c_FP and c_FN and derives a threshold rule or cost comparison correctly",
              "Metrics are recall and precision at the production base rate (not accuracy), with an alarm budget",
              "Pass/fail criterion is measurable and achievable, and baseline method (robust z) is the comparator",
              "Numbers labelled illustrative and arithmetic correct",
            ],
            modelAnswer: md`**Pilot success criteria: anomaly detection on drive-unit endurance tests (illustrative).**

1. **Anomaly definition.** A run or test step whose behaviour an engineer would stop the campaign to investigate: contextual departures per test step (current, torque ripple, mesh-band vibration, winding temperature slope) and drifts over the endurance block. Rig faults are labelled separately.
2. **Base rate.** Test lead estimates 1 to 2 % of runs; we use 1 % for planning.
3. **Evaluation set.** 600 historical runs from the last 12 months, chosen by the customer's validation lead to include every known anomaly (expected about 15) plus a random sample of the rest. Labelled by two customer test engineers independently; disagreements resolved by the validation lead. Held out: we never tune on it.
4. **Alarm budget.** 4 alarms per working day across the lab.
5. **Costs and threshold.** False alarm: 1.5 h at EUR 90/h = EUR 135 (target 0.25 h with evidence pages). Miss: EUR 20,000 (last escaped issue). Rule: alarm when calibrated probability exceeds $135/20{,}135 = 0.7\%$, capped by the alarm budget.
6. **Metrics.** Recall and precision on the evaluation set, precision restated at a 1 % base rate, alarms per day at the operating point, median triage time per alarm. Comparator: per-step robust z-score baseline built in week 1.
7. **Pass criterion (signed by the head of validation).** At no more than 4 alarms per day, recall of at least 80 % on the evaluation set and at least 15 percentage points better than the robust z baseline at the same alarm budget, with median triage time under 15 minutes over the last two pilot weeks.`,
            explanation: md`The grader looks for base-rate awareness, a cost-based threshold, a held-out customer-labelled set and a criterion the buyer can verify.`,
            concepts: ["aw08.precision-recall", "aw08.alarm-cost", "aw08.statistical-baseline"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a CFO at a robotics company why your anomaly detector with '95 % accuracy' could still waste their engineers' time, and how you would set it instead.",
          keyPoints: [
            "When real anomalies are rare, most alarms can be false even with a good detector (base rate)",
            "Accuracy is dominated by the many healthy runs and says nothing about usefulness",
            "Precision tells you how many alarms are real; recall how many problems are caught",
            "The threshold is set by comparing the cost of a false alarm with the cost of a missed problem",
            "Evidence attached to each alarm cuts triage cost and makes more alarms affordable",
          ],
        },
        { kind: "sources", refs: ["aw08-r5", "aw08-r6", "aw08-r7", "aw08-r8", "aw08-r23"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw08-l02-q1",
      type: "numeric",
      prompt: md`Baseline runs of a feature: 5.0, 5.2, 4.9, 5.1, 5.0, 5.0, 8.0. Compute the robust z-score of the 8.0 run using median and MAD. (1 decimal)`,
      answer: 20.2,
      tolerance: { abs: 0.2 },
      unit: "",
      explanation: md`Median 5.0. Absolute deviations: 0, 0.2, 0.1, 0.1, 0, 0, 3.0; sorted 0, 0, 0, 0.1, 0.1, 0.2, 3.0, so MAD = 0.1. $z_r = 0.6745 \times 3.0/0.1 = 20.2$. The classical z with this run in the baseline is only about 2.3.`,
      concepts: ["aw08.robust-z"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "aw08-l02-q2",
      type: "numeric",
      prompt: md`Base rate 2 %, recall 85 %, false positive rate 4 %. What is the precision, in %? (1 decimal)`,
      answer: 30.2,
      tolerance: { abs: 0.2 },
      unit: "%",
      explanation: md`$0.02 \times 0.85 = 0.017$; $0.98 \times 0.04 = 0.0392$; precision $= 0.017/0.0562 = 30.2\%$.`,
      concepts: ["aw08.precision-recall"],
      difficulty: 2,
    },
    {
      id: "aw08-l02-q3",
      type: "mcq",
      prompt: "A false alarm costs EUR 200 of triage and a missed anomaly EUR 9,800. Above which calibrated probability should the system alarm?",
      options: ["0.5", "0.02", "0.2", "0.002"],
      answer: 1,
      explanation: md`$p^* = 200/(200 + 9{,}800) = 0.02$. Alarm on anything with more than a 2 % chance of being real.`,
      concepts: ["aw08.alarm-cost"],
      difficulty: 2,
    },
    {
      id: "aw08-l02-q4",
      type: "mcq",
      prompt: "Why does an isolation forest give anomalies a high score?",
      options: [
        "It learns labels from engineers",
        "Random splits isolate points in sparse regions after few cuts, so their average path length is short",
        "It reconstructs the signal and measures the error",
        "It computes the z-score of every feature and takes the maximum",
      ],
      answer: 1,
      explanation: md`Score $s = 2^{-E[h]/c(n)}$: short paths give scores near 1.`,
      concepts: ["aw08.isolation-forest"],
      difficulty: 1,
    },
    {
      id: "aw08-l02-q5",
      type: "multi",
      prompt: "Which practices make an autoencoder detector fail? (Select all that apply.)",
      options: [
        "Training it on all historical data including past failures",
        "Training one model across rigs and firmware versions without context",
        "Setting the threshold from a held-out labelled validation set",
        "Training on healthy data of the same configuration only",
        "Reporting accuracy at a 1 % base rate",
      ],
      answer: [0, 1, 4],
      explanation: md`Failures in training become "normal"; mixed configurations make the model detect configuration changes; accuracy hides useless detectors at low base rates.`,
      concepts: ["aw08.autoencoder", "aw08.precision-recall"],
      difficulty: 2,
    },
    {
      id: "aw08-l02-q6",
      type: "decision",
      prompt: md`Week 1 of a pilot: the detector raises 60 alarms a day and engineers have stopped opening them. The test lead says the team can triage 5 a day. What do you do first?`,
      options: [
        { text: "Raise the threshold until there are 5 alarms a day and continue.", score: 0.4, feedback: "Meets the budget but may drop recall badly; you do not know without the labelled set." },
        { text: "Aggregate checks to one score per test step with persistence, rebuild baselines per rig and step, then set the threshold to the alarm budget on the labelled set and report the recall it gives.", score: 1, feedback: "Removes the multiple-comparisons and baseline causes first, then sets the threshold on evidence." },
        { text: "Switch to a deep autoencoder, which will be more accurate.", score: 0.1, feedback: "The problem is many independent checks and a poor baseline, not model capacity." },
        { text: "Ask the engineers to triage faster.", score: 0, feedback: "Ignored alarms are a product failure; the budget is a constraint, not a request." },
      ],
      explanation: md`Sixty alarms a day usually means many uncorrected checks and baselines across configurations. Fix the structure, then tune to the budget and measure recall.`,
      concepts: ["aw08.alarm-cost", "aw08.statistical-baseline"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw08-l02-f1", front: "Masking", back: "Outliers in the baseline inflate the mean and σ and hide themselves; use median and MAD.", concepts: ["aw08.robust-z"] },
    { id: "aw08-l02-f2", front: "Robust z-score", back: md`$z_r = 0.6745(x - \tilde{x})/\text{MAD}$; flag above about 3.5.`, concepts: ["aw08.robust-z"] },
    { id: "aw08-l02-f3", front: "False alarms from many checks", back: md`$E[\text{FA}] = m\alpha$: 10,000 checks at 3σ give 27 per healthy run.`, concepts: ["aw08.statistical-baseline"] },
    { id: "aw08-l02-f4", front: "Precision at a base rate", back: md`$br/(br + (1-b)f)$: 1 %, 90 %, 3 % gives 23 %.`, concepts: ["aw08.precision-recall"] },
    { id: "aw08-l02-f5", front: "Cost-optimal alarm threshold", back: md`Alarm if $p > c_{FP}/(c_{FP} + c_{FN})$.`, concepts: ["aw08.alarm-cost"] },
    { id: "aw08-l02-f6", front: "Isolation forest in one line", back: "Random splits isolate unusual points quickly; short average path length means high anomaly score.", concepts: ["aw08.isolation-forest"] },
    { id: "aw08-l02-f7", front: "Autoencoder detection", back: "Train to reconstruct healthy windows only; high reconstruction error flags new behaviour.", concepts: ["aw08.autoencoder"] },
  ],
};

export default lesson;
