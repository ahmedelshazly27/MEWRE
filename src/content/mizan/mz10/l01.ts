import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz10-l01",
  title: "Designing a validation study: hypotheses, metrics, ground truth, sample size and duration",
  summary:
    "How to turn \"our soiling analytics work\" into a testable study: falsifiable hypotheses, the right error metrics (bias, RMSE, coverage of confidence intervals), an independent ground truth, the correct unit of analysis, and sample size and duration from power-style calculations that account for autocorrelation.",
  minutes: 80,
  objectives: [
    "Write validation hypotheses that are specific, falsifiable and tied to a decision (estimate, threshold, unit, period)",
    "Compute bias (MBE), RMSE and its decomposition, and empirical coverage of confidence intervals, and say what each tells you",
    "Choose a ground truth that is independent of the method under test and know its own uncertainty",
    "Size a study: identify the independent unit, apply the sample-size formula, correct for autocorrelation, and convert units into calendar duration",
    "Write a pre-registered analysis plan that fixes metrics, thresholds and data filters before the data are opened",
  ],
  concepts: [
    {
      id: "mz10.validation-hypothesis",
      name: "Validation hypothesis",
      description: "A specific, falsifiable statement of what the method must achieve (quantity, metric, threshold, ground truth, unit, period), written so the study can fail.",
      competency: "mz-validation",
      related: ["mz10.error-metrics", "mz10.pre-registration"],
    },
    {
      id: "mz10.error-metrics",
      name: "Bias, RMSE and their decomposition",
      description: "Mean bias error measures systematic error; RMSE measures typical error size; RMSE squared equals bias squared plus error variance, which shows whether to fix the model or add data.",
      competency: "mz-validation",
      related: ["mz10.ci-coverage", "mz02.station-uncertainty"],
    },
    {
      id: "mz10.ci-coverage",
      name: "Coverage of confidence intervals",
      description: "The share of validation units whose ground truth lies inside the method's stated interval; tests whether the method's uncertainty is honest. Needs many units to estimate precisely.",
      competency: "mz-validation",
      related: ["mz10.error-metrics", "mz03.srr"],
    },
    {
      id: "mz10.ground-truth",
      name: "Ground truth and its independence",
      description: "The reference the method is compared against (clean and soiled reference devices, a controlled cleaning test, a natural experiment); it must be measured independently of the method and its own uncertainty must be known.",
      competency: "mz-validation",
      related: ["mz02.reference-station", "mz02.clean-reference"],
    },
    {
      id: "mz10.sample-size",
      name: "Sample size, independent units and effective n",
      description: "n = ((z_alpha/2 + z_beta) sigma / delta)^2 counted in independent units (cleaning intervals or block-interval pairs, not days); autocorrelation shrinks the effective n of daily series by (1 - rho)/(1 + rho).",
      competency: "mz-validation",
      related: ["mz02.detection-limit", "mz05.paired-block-design"],
    },
    {
      id: "mz10.pre-registration",
      name: "Pre-registered analysis plan",
      description: "A dated document fixing hypotheses, metrics, thresholds, filters and hold-out data before the data are analysed, so results cannot be tuned after the fact.",
      competency: "mz-validation",
      related: ["mz10.validation-hypothesis"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "What a validation study must prove, and how to measure it",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`KISR has confirmed there is no standard method for turning operational data into cleaning decisions. That gap is Mizan's opening, and it is also why nobody will take Mizan's word for it. The targeted Shagaya Phase I pilot, with KISR researchers as methodology partner, is worth something only if it is designed as a study that could have failed. You will write the study plan with your partners, defend it to reviewers and later quote its numbers to buyers, so you must know what a hypothesis, a metric, a ground truth and a sample size really commit you to.`,
        },
        {
          kind: "md",
          md: md`### From claim to hypothesis

A sales claim ("our analytics optimise cleaning") cannot be tested. A validation hypothesis can, because it names five things:

| Element | Question | Example for soiling analytics |
|---|---|---|
| **Quantity** | What exactly is estimated? | Soiling rate per cleaning interval (%/day), daily soiling ratio, timing of cleaning events |
| **Ground truth** | Compared against what, measured how? | Co-located clean and soiled reference devices (IEC 61724-1 soiling ratio), or a section left uncleaned |
| **Metric and threshold** | What counts as success? | $|\mathrm{MBE}| < 0.05$ %/day with the 95% interval inside $\pm 0.08$ %/day; 95% interval coverage between 88% and 100% |
| **Unit and sample** | What is one observation and how many? | One cleaning interval on one inverter block; at least 18 intervals |
| **Scope** | Where and when does the claim hold? | Shagaya Phase I PV, fixed tilt, one summer and one winter season |

A useful test: if you cannot write down the result that would make you say "the method failed", you do not have a hypothesis yet.

Separate three levels of claim, because they need different studies:

1. **Measurement validity**: does the method estimate soiling correctly? (compare with ground truth)
2. **Decision validity**: do the recommended cleaning dates beat the current schedule? (compare decisions, usually paired blocks)
3. **Value**: how much energy or money does that save? (decision result times a valuation, see mz04)

Most first studies should aim at level 1 and design level 2. Jumping to level 3 without level 1 is the classic overclaim.

### The three metrics

Let $\hat{y}_i$ be the method's estimate and $y_i$ the ground truth for unit $i$.`,
        },
        { kind: "equation", formula: "mz10-mbe" },
        { kind: "equation", formula: "mz10-rmse" },
        { kind: "equation", formula: "mz10-coverage" },
        {
          kind: "md",
          md: md`**Why all three.** A method can have zero bias and a large RMSE (right on average, wrong every time), or a small RMSE with intervals that are far too narrow (precise and overconfident). Cleaning decisions are hurt by all three: bias shifts every schedule, scatter makes single decisions wrong, and overconfident intervals make you trigger cleanings on noise. Reviewers in PV analytics expect bias and RMSE at minimum; coverage is what separates a serious uncertainty claim (for example from the Monte Carlo in SRR) from decoration.

**Relative versus absolute.** Soiling-rate errors in %/day and soiling-ratio errors in percentage points are not the same as "percent error". A 0.05 %/day error on a 0.30 %/day rate is 17% relative. State both, and never compute relative errors on quantities near zero (rainy winter weeks).

### Ground truth: independent, characterised, representative

The ground truth must not share the method's inputs. If Mizan's method uses the plant pyranometer, a "truth" computed from the same pyranometer will share its errors (a dirty pyranometer makes PR look better and soiling look smaller in both). Options, in falling order of strength:

| Ground truth | Strength | Weakness |
|---|---|---|
| Controlled cleaning test (paired blocks, one cleaned on schedule, one not) | Direct, independent, causal | Costs energy, needs operator consent |
| Co-located clean and soiled reference devices (IEC 61724-1) | Standardised, continuous | Point measurement, clean device must be maintained, representativeness (mz02) |
| Natural experiment (an unplanned period without cleaning) | Real plant scale, free | Not designed: confounders, uncertain records (lesson 2) |
| Another algorithm (SRR versus your method) | Cheap | Not a truth: agreement between two methods can mean both are wrong |

The truth has its own uncertainty $u_{\text{truth}}$. If the observed RMSE is close to $u_{\text{truth}}$, you have hit the limit of what the study can show, not proved the method is perfect.`,
        },
        { kind: "xref", to: "mz02-l04", note: "Measurement uncertainty, the slope standard error and the detection limit for soiling rates are derived there; this lesson uses them to size a study." },
        {
          kind: "md",
          md: md`### Sample size: count independent units, not rows

The usual formula for detecting a difference $\delta$ with significance $\alpha$ and power $1-\beta$:`,
        },
        { kind: "equation", formula: "mz10-sample-size" },
        {
          kind: "md",
          md: md`The critical step is choosing $\sigma$ and the unit. Soiling data are a time series: today's error is almost the same as yesterday's, because the same dust layer and the same sensor offsets persist. Three consequences:

- For **soiling rates**, one cleaning interval gives one slope. The independent unit is the interval (or the block-interval pair in a paired design), so the study's length is set by how many intervals you need.
- For **daily soiling ratio** errors, use the effective sample size below.
- **More inverters in the same block do not multiply n** for weather-driven errors, because they see the same dust and the same days. They help with block-level noise only.`,
        },
        { kind: "equation", formula: "mz10-effective-n" },
        {
          kind: "chart",
          chart: "line",
          title: "Intervals needed to detect a soiling-rate difference (alpha 0.05 two-sided, 80% power)",
          xKey: "delta",
          xLabel: "Smallest difference to detect (%/day)",
          yLabel: "Independent intervals needed",
          series: [
            { key: "s15", label: "SD of paired difference 0.15 %/day" },
            { key: "s10", label: "SD of paired difference 0.10 %/day" },
          ],
          data: [
            { delta: 0.05, s15: 71, s10: 32 },
            { delta: 0.075, s15: 32, s10: 14 },
            { delta: 0.1, s15: 18, s10: 8 },
            { delta: 0.15, s15: 8, s10: 4 },
            { delta: 0.2, s15: 5, s10: 2 },
          ],
          caption: "Computed from n = ((1.96 + 0.84) sigma / delta)^2, rounded up. Halving delta quadruples n. With monthly cleaning, each interval is roughly one month of calendar time.",
        },
        {
          kind: "feynman",
          prompt: "Explain to Omar Abu Harb, in plain words, why a year of daily data from one plant may be worth far fewer than 365 independent observations, and what that means for how long the Shagaya study must run.",
          keyPoints: [
            "Consecutive days share the same dust layer, weather regime and sensor offsets, so their errors are correlated",
            "Correlated observations carry less information; effective n = n (1 - rho)/(1 + rho), a quarter of n at rho = 0.6",
            "For soiling rates the natural independent unit is the cleaning interval, so duration is set by the number of intervals",
            "Ignoring this gives confidence intervals that are too narrow and claims that will not survive review",
            "Duration must also span seasons (summer dust, winter dew) so the result is not one season's artefact",
          ],
        },
      ],
    },
    {
      layer: "applied",
      title: "Worked: metrics and sample size for the targeted Shagaya study",
      blocks: [
        {
          kind: "worked",
          title: "Bias, RMSE and coverage on six intervals (illustrative)",
          mode: "worked",
          given: md`Illustrative numbers, not Shagaya data. Six cleaning intervals. Errors (method minus reference-station soiling rate) in %/day: $+0.05, -0.02, +0.08, +0.03, -0.04, +0.06$. The method's 95% intervals contained the station value in 5 of 6 intervals.`,
          steps: [
            { md: md`**Bias.** Sum $= 0.05 - 0.02 + 0.08 + 0.03 - 0.04 + 0.06 = 0.16$. $\mathrm{MBE} = 0.16/6 = 0.027$ %/day: the method reads slightly high.` },
            { md: md`**RMSE.** Squares: $0.0025, 0.0004, 0.0064, 0.0009, 0.0016, 0.0036$, sum $0.0154$. Mean $= 0.00257$. $\mathrm{RMSE} = \sqrt{0.00257} = 0.051$ %/day.` },
            { md: md`**Decomposition.** $s_e^2 = \mathrm{RMSE}^2 - \mathrm{MBE}^2 = 0.00257 - 0.00071 = 0.00186$, so $s_e = 0.043$ %/day. Bias explains $0.00071/0.00257 = 28\%$ of the squared error: most of the error is scatter, so more data per interval or better filtering helps more than a model correction.` },
            { md: md`**Coverage.** $\hat{c} = 5/6 = 0.83$. Its standard error at nominal 0.95 is $\sqrt{0.95 \times 0.05/6} = 0.089$. The shortfall of 0.12 is less than 1.5 standard errors: six intervals cannot tell an honest 95% interval from an overconfident one.` },
          ],
          result: md`MBE $= +0.027$ %/day, RMSE $= 0.051$ %/day (72% scatter, 28% bias), coverage 5 of 6, which is uninformative at this n. Six intervals are a pilot result, not a validation.`,
        },
        {
          kind: "worked",
          title: "How long must the study run? (illustrative)",
          mode: "faded",
          given: md`Illustrative. Hypothesis A (daily soiling ratio): estimate the mean bias of the daily SR to within $\pm 0.25$ percentage points (95% half-width). Daily error SD $\sigma = 1.0$ pp, lag-1 autocorrelation $\rho = 0.6$, and 70% of calendar days pass the data filters (clear enough sky, no curtailment, no outage). Hypothesis B (soiling rate): detect a paired difference of $\delta = 0.10$ %/day between the method and the reference at $\alpha = 0.05$ two-sided with 80% power, with $\sigma_d = 0.15$ %/day per interval; the plant is cleaned monthly.`,
          steps: [
            { md: md`**A, effective n.** Precision target: $n_{\mathrm{eff}} = (1.96 \times 1.0/0.25)^2 = 7.84^2 = 61.5$, round up to 62 independent days.` },
            {
              md: md`**A, valid days.** Invert the effective-n formula: $n = n_{\mathrm{eff}}(1+\rho)/(1-\rho) = 62 \times 1.6/0.4$.`,
              hidden: true,
              check: { prompt: "Valid days needed", answer: 248, tolerance: { abs: 1 }, unit: "days" },
            },
            {
              md: md`**A, calendar days.** Only 70% of days are valid: $248/0.70 = 354$ calendar days, about 12 months.`,
              hidden: true,
              check: { prompt: "Calendar days needed", answer: 354, tolerance: { abs: 2 }, unit: "days" },
            },
            {
              md: md`**B, intervals.** $n = ((1.96 + 0.84) \times 0.15/0.10)^2 = (4.2)^2 = 17.6$, round up.`,
              hidden: true,
              check: { prompt: "Independent cleaning intervals needed", answer: 18, tolerance: { abs: 0 }, unit: "intervals" },
            },
            { md: md`**B, duration.** With monthly cleaning, 18 intervals take about 18 months on one block. Two independent paired blocks (far enough apart to see different dust) could halve that only if their errors are close to independent, which must be checked, not assumed.` },
          ],
          result: md`Hypothesis A needs about 12 months, hypothesis B about 18 months on one block. Ignoring autocorrelation would have suggested $62/0.7 \approx 89$ days, a factor of four too short. Plan for at least one full year so both summer dust and winter dew regimes are in the data.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Writing the study plan in practice",
      blocks: [
        {
          kind: "md",
          md: md`### Who does what

In a co-designed study with KISR as methodology partner, the researchers will usually own the statistical design, the ground-truth measurements and the review of the analysis; Mizan's engineering partners own the method's code; you own the study plan document, the schedule, the data logistics and the link to the commercial question. Agree this split in writing early (lesson 3).

### The analysis plan, before the data

A **pre-registered analysis plan** is a dated document, shared with the partner (and optionally lodged on a registry such as OSF), that fixes:

- hypotheses, metrics and success thresholds;
- the ground truth and how its uncertainty is handled;
- data filters (irradiance threshold, curtailment flags, outage exclusion, time window around solar noon);
- the independent unit and the sample size calculation;
- the **hold-out**: data the method's developers never see until the method is frozen (for example the natural-experiment period, lesson 2);
- what will be reported if the result is negative.

Without it, every analyst choice (a filter here, a dropped month there) can quietly push the result towards success, and reviewers know it.`,
        },
        {
          kind: "checklist",
          title: "Study plan checklist",
          items: [
            "Each hypothesis names quantity, ground truth, metric, threshold, unit and scope",
            "Ground truth is independent of the method's inputs, and its uncertainty is stated",
            "Independent unit identified (interval, block-interval pair) and justified",
            "Sample size computed with sigma taken from pilot or published data, and the source cited",
            "Autocorrelation and the share of valid days included in the duration estimate",
            "Duration spans at least one summer and one winter",
            "Filters, exclusions and hold-out data fixed and dated before analysis",
            "Negative-result reporting agreed with the partner",
          ],
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`**Tuning on the test set**: the method is adjusted until it matches the reference over the same period that is then reported. **Shared inputs**: method and truth use the same pyranometer. **Counting days as independent**: intervals that look tight by a factor of two to four. **One-season studies**: a winter-only study says nothing about shamal season. **Sigma from optimism**: if you have no pilot data, take $\sigma$ from published soiling-extraction comparisons or a short pilot, and say so.`,
        },
        {
          kind: "ask",
          title: "Questions to agree with the KISR researchers",
          items: [
            "Which ground truth is available at Shagaya Phase I for the study period (reference devices, cleaning logs, uncleaned sections), and how is its uncertainty characterised?",
            "What error SD and autocorrelation do you expect from your earlier monitoring, so we can size the study?",
            "Which data will be held out from method development, and who holds the key?",
            "What thresholds would you, as reviewers, accept as validation for a cleaning-decision method?",
            "How will a negative or mixed result be reported?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "mz10-l01-p1",
            type: "short",
            prompt: md`Write the **hypotheses and sizing section** (about 250 words) of the study plan for the targeted Shagaya Phase I soiling analytics pilot. Include two hypotheses (one on measurement validity, one on the uncertainty of the method), the ground truth for each, metrics and thresholds, the independent unit, a sample-size calculation with your assumptions labelled illustrative, and the resulting duration.`,
            rubric: [
              "Two hypotheses, each naming quantity, ground truth, metric, threshold and scope",
              "Ground truth independent of the method's inputs, with its uncertainty acknowledged",
              "Uses bias and RMSE for measurement validity and interval coverage for the uncertainty hypothesis",
              "Identifies the cleaning interval (or block-interval pair) as the independent unit, or applies effective n for daily data",
              "Correct sample-size arithmetic with labelled illustrative assumptions and conversion to calendar duration spanning both seasons",
              "Does not describe the pilot as signed or running; says targeted or in preparation",
            ],
            modelAnswer: md`**Hypotheses and sizing (draft for discussion with KISR; the pilot is in preparation).**

H1 (measurement validity). For each cleaning interval on the instrumented block of Shagaya Phase I PV, the soiling rate estimated by the method from inverter and weather data agrees with the rate from the co-located clean and soiled reference devices (IEC 61724-1 soiling ratio): $|\mathrm{MBE}| \le 0.05$ %/day with its 95% interval inside $\pm 0.08$ %/day, and RMSE $\le 0.10$ %/day. The reference devices are independent of the method's inputs; their own uncertainty will be stated from the calibration and cleaning log and compared with the RMSE.

H2 (honest uncertainty). The method's 95% intervals for interval soiling rates contain the reference value in 88% to 100% of units. Because coverage needs many units, H2 is pooled over all instrumented blocks and reported with its standard error; with fewer than about 100 units it is reported as indicative.

Unit and sizing. The independent unit is one cleaning interval on one block. Illustrative assumptions: SD of paired differences 0.15 %/day (to be replaced by KISR's earlier monitoring), detectable difference 0.10 %/day, alpha 0.05 two-sided, power 80%: $n = ((1.96+0.84) \times 0.15/0.10)^2 = 17.6$, so 18 intervals. With monthly cleaning this is about 18 months on one block, covering two summers. If two blocks prove to have nearly independent errors, the study can stop after about 12 months, the minimum to include one shamal season and one winter dew season. Filters, hold-out data and negative-result reporting are fixed in the pre-registered plan before analysis.`,
            explanation: md`A strong section makes the study able to fail: each hypothesis names quantity, independent ground truth, metric and threshold, unit and scope, and the duration follows from counting independent cleaning intervals (or effective days), not raw days.`,
            concepts: ["mz10.validation-hypothesis", "mz10.sample-size", "mz10.ground-truth"],
            difficulty: 3,
          },
        },
        { kind: "sources", refs: ["mz10-r1", "mz10-r2", "mz10-r4", "mz10-r16", "mz10-r17"] },
      ],
    },
  ],
  quiz: [
    {
      id: "mz10-l01-q1",
      type: "numeric",
      prompt: md`Errors (estimate minus truth) over four intervals are $+0.04, +0.02, -0.01, +0.03$ %/day. What is the RMSE in %/day? (3 decimals)`,
      answer: 0.0274,
      tolerance: { abs: 0.001 },
      unit: "%/day",
      explanation: md`Squares $0.0016 + 0.0004 + 0.0001 + 0.0009 = 0.0030$; mean $0.00075$; $\sqrt{0.00075} = 0.0274$ %/day. MBE is $0.08/4 = 0.02$, so bias is $0.0004/0.00075 = 53\%$ of the squared error here.`,
      concepts: ["mz10.error-metrics"],
      difficulty: 2,
    },
    {
      id: "mz10-l01-q2",
      type: "numeric",
      prompt: md`A daily error series has lag-1 autocorrelation 0.5. How many independent days are 300 valid days worth?`,
      answer: 100,
      tolerance: { abs: 1 },
      unit: "days",
      explanation: md`$n_{\mathrm{eff}} = 300 \times (1-0.5)/(1+0.5) = 300/3 = 100$.`,
      concepts: ["mz10.sample-size"],
      difficulty: 1,
    },
    {
      id: "mz10-l01-q3",
      type: "mcq",
      prompt: md`A method's 95% intervals contained the reference value in 71% of 150 independent intervals. What does this mean?`,
      options: [
        "The method is biased",
        "The method's stated uncertainty is too small: it is overconfident",
        "The study is too small to say anything",
        "The reference station is wrong",
      ],
      answer: 1,
      explanation: md`At n = 150 the standard error of coverage is $\sqrt{0.95 \times 0.05/150} = 0.018$, so 0.71 is more than 13 standard errors below 0.95. The intervals are too narrow. Bias can contribute, but coverage itself tests the honesty of the uncertainty.`,
      concepts: ["mz10.ci-coverage"],
      difficulty: 2,
    },
    {
      id: "mz10-l01-q4",
      type: "multi",
      prompt: md`Which are valid ground truths for testing a soiling-extraction method on a plant? (select all)`,
      options: [
        "Co-located clean and soiled reference devices maintained to IEC 61724-1",
        "A section deliberately left uncleaned for a defined period, compared with a cleaned section",
        "The output of another soiling algorithm run on the same inverter data",
        "PR computed from the same pyranometer the method uses, with no independent check",
      ],
      answer: [0, 1],
      explanation: md`Reference devices and controlled cleaning comparisons are independent of the method's inputs. Another algorithm is a comparison, not a truth, and a truth that shares the method's pyranometer shares its errors.`,
      concepts: ["mz10.ground-truth"],
      difficulty: 1,
    },
    {
      id: "mz10-l01-q5",
      type: "numeric",
      prompt: md`You want to detect a paired soiling-rate difference of 0.05 %/day with SD 0.10 %/day, alpha 0.05 two-sided, power 80%. How many independent intervals? (round up)`,
      answer: 32,
      tolerance: { abs: 0 },
      unit: "intervals",
      explanation: md`$n = (2.80 \times 0.10/0.05)^2 = 5.6^2 = 31.4$, round up to 32. Halving the detectable difference from 0.10 to 0.05 quadruples n from 8 to 32.`,
      concepts: ["mz10.sample-size"],
      difficulty: 2,
    },
    {
      id: "mz10-l01-q6",
      type: "order",
      prompt: md`Put the steps of a validation study in order.`,
      items: [
        "Write hypotheses with metrics and thresholds",
        "Choose ground truth and size the study",
        "Pre-register the analysis plan and fix the hold-out",
        "Freeze the method",
        "Open the hold-out data and compute the metrics",
        "Report, including negative results",
      ],
      explanation: md`The method is frozen before the hold-out is opened; otherwise the test data leak into development.`,
      concepts: ["mz10.pre-registration", "mz10.validation-hypothesis"],
      difficulty: 1,
    },
    {
      id: "mz10-l01-q7",
      type: "decision",
      prompt: md`Three months into the study, the method's bias is +0.09 %/day against the reference. Your engineering partner proposes changing the cleaning-detection threshold and rerunning the same three months. What do you do?`,
      options: [
        { text: "Allow the change, record it as a deviation from the plan with its reason, and evaluate the revised method only on data collected after the change (or on untouched hold-out data).", score: 1, feedback: "Development is allowed; tuning on the reported test set is not. Logging the deviation keeps the study credible." },
        { text: "Allow it and report the improved result over the full period.", score: 0, feedback: "This is tuning on the test set. The reported bias would be meaningless and a reviewer will ask." },
        { text: "Refuse any change until the study ends.", score: 0.4, feedback: "Safe but wasteful: a known flaw stays in the method for a year. A logged deviation with fresh test data is better." },
      ],
      explanation: md`Pre-registration does not forbid improvement; it forbids reporting a result on data used to make the improvement.`,
      concepts: ["mz10.pre-registration"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz10-l01-f1", front: "Five elements of a validation hypothesis", back: "Quantity, ground truth, metric and threshold, unit and sample, scope.", concepts: ["mz10.validation-hypothesis"] },
    { id: "mz10-l01-f2", front: "RMSE decomposition", back: "RMSE^2 = MBE^2 + s_e^2: systematic part plus scatter. Tells you whether to fix the model or add data.", concepts: ["mz10.error-metrics"] },
    { id: "mz10-l01-f3", front: "What does interval coverage test?", back: "Whether the method's stated uncertainty is honest. SE = sqrt(c(1 - c)/n): about 5 points at n = 18, so it needs many units.", concepts: ["mz10.ci-coverage"] },
    { id: "mz10-l01-f4", front: "Effective sample size, AR(1)", back: "n_eff = n (1 - rho)/(1 + rho). At rho = 0.6 a series is worth a quarter of its length.", concepts: ["mz10.sample-size"] },
    { id: "mz10-l01-f5", front: "Independent unit for soiling-rate validation", back: "The cleaning interval (or block-interval pair), not the day. Duration is set by intervals needed.", concepts: ["mz10.sample-size"] },
    { id: "mz10-l01-f6", front: "Pre-registered analysis plan", back: "Dated: hypotheses, metrics, thresholds, filters, hold-out, negative-result reporting. Fixed before analysis.", concepts: ["mz10.pre-registration"] },
  ],
};

export default lesson;
