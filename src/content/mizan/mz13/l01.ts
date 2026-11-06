import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz13-l01",
  title: "Design the Shagaya validation study: hypotheses, data, method, metrics and protocol",
  summary:
    "Turn everything in the Mizan track into one study design for the targeted Shagaya Phase I soiling pilot: falsifiable hypotheses, the data to request and to add, the method (temperature-corrected PR baseline to IEC 61724, soiling inference from plant data, the 2018 to 2019 cleaning-arm failure as a natural experiment), the metrics that decide pass or fail, and a pre-registered study protocol. Four graded exercises build the design you would send to KISR.",
  minutes: 90,
  objectives: [
    "You can write falsifiable hypotheses for the Shagaya study, each with a metric, a threshold and the data that would refute it.",
    "You can specify the corrected PR baseline (NREL weather-corrected PR, IEC 61724-1 data) and the soiling ratio inferred from it, with every parameter frozen in advance.",
    "You can design the analysis of the 2018 to 2019 cleaning-arm failure as a natural experiment, using an interrupted time series or a difference-in-differences comparison, and name its threats.",
    "You can choose agreement metrics (bias, limits of agreement, RMSE, rate error, detection precision and recall) and a decision metric (regret against an oracle schedule).",
    "You can write a one-page study protocol that KISR researchers could sign: phases, roles, data handling, pre-registration and stop rules.",
  ],
  concepts: [
    {
      id: "mz13.falsifiable-hypothesis",
      name: "Falsifiable study hypothesis",
      description:
        "A claim stated with its metric, threshold, data and analysis window before the data is analysed, so that a defined result would show it false. The unit of a credible validation study.",
      competency: "mz-validation",
      related: ["mz02.measurement-plan"],
    },
    {
      id: "mz13.corrected-pr-baseline",
      name: "Corrected PR baseline",
      description:
        "The temperature-corrected performance ratio (NREL weather-corrected PR on IEC 61724-1 data) used as the reference against which soiling is inferred; it removes the seasonal heat signal so that the remaining sawtooth is soiling, degradation and faults.",
      competency: "mz-validation",
      related: ["mz02.weather-corrected-pr", "mz02.pr-residual", "mz04.savings-baseline"],
    },
    {
      id: "mz13.natural-experiment-design",
      name: "Natural experiment design",
      description:
        "Analysing an unplanned interruption (here the 2018 to 2019 cleaning-arm failure at Shagaya) as if it were an experiment: interrupted time series against the plant's own normal behaviour, or difference-in-differences against a section or period that kept normal cleaning.",
      competency: "mz-validation",
      related: ["mz02.natural-experiment", "mz04.natural-experiment"],
    },
    {
      id: "mz13.agreement-metrics",
      name: "Agreement metrics for soiling inference",
      description:
        "How well the plant-data method agrees with an independent reference: mean bias, 95 % limits of agreement (Bland-Altman), RMSE, soiling rate error and cleaning-event detection precision and recall.",
      competency: "mz-validation",
      related: ["mz02.station-uncertainty", "mz03.srr"],
    },
    {
      id: "mz13.decision-regret",
      name: "Decision regret",
      description:
        "The extra annual cost (cleaning plus lost energy) of a cleaning policy compared with the best schedule chosen with perfect hindsight; the metric that tests whether the analytics improves decisions, not only measurements.",
      competency: "mz-validation",
      related: ["mz04.square-root-rule", "mz04.flat-optimum"],
    },
    {
      id: "mz13.study-protocol",
      name: "Pre-registered study protocol",
      description:
        "The signed document that fixes hypotheses, data, filters, parameters, metrics, thresholds, phases, roles and publication terms before results are seen, so that neither partner can tune the analysis to the answer it wants.",
      competency: "mz-validation",
      related: ["mz02.measurement-plan", "mz02.data-access"],
    },
  ],
  sections: [
    // ============================================================ THEORY
    {
      layer: "theory",
      title: "From a friendly conversation to a study design",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`The Shagaya Phase I pilot is targeted, in preparation, not signed. What turns it into a signed study is a design that KISR researchers can defend in front of their own peers and that MEWRE can approve without risk. KISR has said there is no standard method for turning operational data into cleaning decisions: that gap is Mizan's opportunity and also the reason every step must be checkable. You own the study as the person who negotiates scope, data access and publication; your engineering partners own the code. This lesson is the capstone of the method half of the track: you will produce the design itself.`,
        },
        {
          kind: "md",
          md: md`### The study as a system

A validation study answers one research question: **can operational data from a desert PV plant be turned into soiling estimates and cleaning decisions that are accurate enough to act on?** Everything else is a sub-system with inputs and outputs:

| Element | Question it answers | What fails if it is weak |
|---|---|---|
| Hypotheses | What exactly are we claiming, and what result would prove us wrong? | Results can be read any way; reviewers reject it |
| Data | Which signals, logs and references, at what resolution, from whom? | Gaps discovered after months; method cannot be tested |
| Method | Baseline, inference, natural experiment, decision model | Soiling confused with heat, outages or sensor drift |
| Metrics | Which numbers decide pass or fail, at what threshold? | Endless debate about whether 0.4 points of bias is "good" |
| Protocol | Who does what, when, with what frozen choices and what rights? | Partners disagree after results; publication stalls |

The measurement plan for Shagaya (sensors, positions, duration, data inventory) is already built in the measurement module. This lesson adds the layer above it: the claims, the analysis and the agreement.`,
        },
        { kind: "xref", to: "mz02-l05", note: "The measurement plan for Shagaya Phase I: what is known about the plant, the data inventory, instruments, duration and the first look at the 2018 to 2019 cleaning-arm failure. This lesson builds the study on top of it." },
        {
          kind: "callout",
          tone: "kuwait",
          title: "What we know, and what we do not",
          md: md`**Known (sources and venture context):** Shagaya Phase I PV is reported as 11.15 MW with a thin-film and a poly-Si section; Al-Rasheedi, Gueymard, Al-Khayat, Ismail, Lee and Al-Duaj (RSER 133, 2020, 110139) monitored it for 25 months, found the two sections performed alike, soiling substantial, monthly water cleaning, and sudden drops of about 30 % in dust storms. KISR confirmed there is no standard method for turning operational data into cleaning decisions. Temperature-corrected PR to IEC 61724 is the agreed baseline. A cleaning-arm failure in 2018 to 2019 is a candidate natural experiment.

**Not known yet (confirm with KISR before the design is frozen):** the dates, duration and extent of the cleaning-arm failure and which section or rows it affected; whether any section kept normal cleaning during it; data resolution and retention for 2017 to 2026; the existing irradiance and temperature sensors and their calibration history; mounting and tilt.`,
        },
        {
          kind: "md",
          md: md`### 1. Hypotheses that can fail

A hypothesis is only useful if a defined result would refute it. Write each one with **metric, threshold, data, window and analysis**. For Shagaya, four hypotheses cover the chain from measurement to decision:

| # | Hypothesis | Metric and threshold (example, to agree with KISR) | Refuted if |
|---|---|---|---|
| H1 Baseline | Corrected PR removes the seasonal temperature signal | Seasonal amplitude of post-cleaning corrected PR at most 1.5 points, versus the basic PR amplitude | Corrected PR still swings with cell temperature by more than the threshold |
| H2 Inference | Soiling ratio inferred from plant data agrees with an independent reference (station or cleaned reference section) | Bias within $\pm 0.5$ points, 95 % limits of agreement within $\pm 2$ points of SR, daily, over the measurement year | Bias or limits outside the band |
| H3 Natural experiment | The inferred soiling rate explains the loss accumulated during the cleaning-arm failure | Loss predicted from the normal-period rate within $\pm 25$ % of the observed extra loss, after storm steps are removed | Observed loss outside the band, or the failure effect is not detectable above noise |
| H4 Decision | A condition-based cleaning rule driven by the inferred SR lowers total cost against the monthly schedule | Regret reduced by more than the uncertainty of the savings estimate, on replay of the historical data and in the measurement year | Saving smaller than its own uncertainty |

Two habits matter more than the exact thresholds. **Agree the thresholds before the analysis**, so nobody moves the goalposts. And **state the null result you would publish**: if H2 fails, the paper says plant data alone is not enough at this site and how large the error was. A study that can only succeed is not a study.

### 2. The baseline: temperature-corrected PR

Basic PR falls in a Kuwaiti summer because the modules are hot, not because they are dirty. The NREL weather-corrected PR scales each interval's expected energy by the temperature loss relative to an irradiance-weighted reference temperature:`,
        },
        { kind: "equation", formula: "mz13-pr-corr" },
        {
          kind: "md",
          md: md`With the heat removed, the soiling ratio is inferred from the corrected PR relative to its clean level, the level just after cleanings, trended for degradation:`,
        },
        { kind: "equation", formula: "mz13-sr-inferred" },
        {
          kind: "widget",
          widget: "pr-correction",
          caption: "Set the soiling rate to 0 and the summer cell temperature to 65 °C: basic PR swings by several points, corrected PR is flat. That flatness is hypothesis H1. Now add 0.3 %/day soiling with a 30-day interval: the sawtooth in the corrected line is the signal H2 tests. Change the temperature coefficient by 0.05 %/°C and see how little the sawtooth changes: you will need that in lesson 2.",
        },
        {
          kind: "chart",
          chart: "line",
          title: "Illustrative monthly PR for a desert section: basic vs corrected",
          xKey: "month",
          xLabel: "Month",
          yLabel: "PR (%)",
          series: [
            { key: "basic", label: "Basic PR" },
            { key: "corrected", label: "Weather-corrected PR" },
          ],
          data: [
            { month: "Jan", basic: 81.8, corrected: 75.5 },
            { month: "Feb", basic: 80.3, corrected: 75.1 },
            { month: "Mar", basic: 77.5, corrected: 74.3 },
            { month: "Apr", basic: 74.8, corrected: 73.9 },
            { month: "May", basic: 71.8, corrected: 73.5 },
            { month: "Jun", basic: 69.5, corrected: 73.2 },
            { month: "Jul", basic: 69.2, corrected: 73.5 },
            { month: "Aug", basic: 69.9, corrected: 73.9 },
            { month: "Sep", basic: 72.3, corrected: 74.7 },
            { month: "Oct", basic: 75.4, corrected: 75.1 },
            { month: "Nov", basic: 78.3, corrected: 75.1 },
            { month: "Dec", basic: 81.1, corrected: 75.5 },
          ],
          caption: "Synthetic, not Shagaya data. Assumptions: PR at 25 °C of 0.86, power temperature coefficient -0.40 %/°C, monthly irradiance-weighted cell temperature from 30 °C (January) to 62 °C (July), reference temperature 48.8 °C, monthly-average soiling ratio from 0.97 (winter) to 0.94 (June). Basic PR swings 12.6 points; corrected PR moves 2.3 points, and what remains follows the soiling season.",
        },
        {
          kind: "md",
          md: md`### 3. Soiling inference from plant data

On the corrected series, the soiling method finds cleaning events (positive steps), fits the slope of each soiling interval robustly (Theil-Sen), separates storm steps with change-point detection and aggregates to an insolation-weighted soiling ratio with a confidence interval. This is the stochastic rate and recovery method (Deceglie, Micheli and Muller 2018, implemented in NREL RdTools). At Shagaya the cleaning log gives the true cleaning dates, so the study can also test **detection**: did the method find the cleanings that the log says happened?`,
        },
        { kind: "xref", to: "mz03-l02", note: "SRR, change points and cleaning-event detection in depth. The study fixes the RdTools version, cleaning criterion and filter thresholds in the protocol; it does not re-derive them." },
        {
          kind: "md",
          md: md`### 4. The 2018 to 2019 cleaning-arm failure as a natural experiment

A planned experiment would stop cleaning on part of the plant for months to watch dust accumulate. No operator accepts that. A failure that already happened did it for free. Two designs, depending on what the logs show:

- **Interrupted time series (one section affected, no clean comparison):** fit the soiling behaviour of the normal periods (rate per season, storm steps), project what the section would have lost without cleaning, and compare with what it actually lost during the failure. Tests H3 directly. Threat: anything else that changed at the same time (an inverter fault, a sensor swap, an unusual dust season).
- **Difference-in-differences (one section or block kept normal cleaning):** compare the change in SR of the affected section with the change in the unaffected one over the same weeks. Weather, dust storms and season hit both and cancel; what remains is the effect of not cleaning.`,
        },
        { kind: "equation", formula: "mz13-did" },
        {
          kind: "chart",
          chart: "line",
          title: "Illustrative natural experiment: section without cleaning vs section with monthly cleaning",
          xKey: "day",
          xLabel: "Day",
          yLabel: "Soiling ratio (%)",
          series: [
            { key: "normal", label: "Section B, monthly cleaning" },
            { key: "failed", label: "Section A, cleaning arm failed until day 75" },
          ],
          data: [
            { day: 0, normal: 100.0, failed: 100.0 },
            { day: 7, normal: 98.2, failed: 98.2 },
            { day: 14, normal: 96.4, failed: 96.4 },
            { day: 21, normal: 94.5, failed: 94.5 },
            { day: 28, normal: 92.7, failed: 92.7 },
            { day: 35, normal: 98.7, failed: 90.9 },
            { day: 42, normal: 92.9, failed: 85.1 },
            { day: 49, normal: 91.1, failed: 83.3 },
            { day: 56, normal: 89.2, failed: 81.4 },
            { day: 63, normal: 99.2, failed: 79.6 },
            { day: 70, normal: 97.4, failed: 77.8 },
            { day: 77, normal: 95.6, failed: 99.5 },
            { day: 84, normal: 93.8, failed: 97.7 },
            { day: 91, normal: 99.7, failed: 95.8 },
          ],
          caption: "Synthetic. Background rate 0.26 %/day in both sections, a 4-point dust-storm step on day 42 that hits both, cleanings of B on days 0, 30, 60 and 90, A cleaned on day 0 and again only after repair on day 75. The storm cancels in the difference; the growing gap is the effect of not cleaning. The real dates and sections at Shagaya are still to be confirmed from KISR's logs.",
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "The failure details are not yet documented",
          md: md`The venture context records that a cleaning-arm failure occurred at Shagaya in 2018 to 2019 and that it is a natural experiment for validation. Its exact dates, which section or rows it affected, whether manual cleaning partly replaced it, and whether data for the period was retained are **not documented in any source available to us**. The design above is conditional: the first task of the data audit is to establish these facts from KISR's O&M records, and the choice between interrupted time series and difference-in-differences follows from them.`,
        },
        {
          kind: "md",
          md: md`### 5. Metrics that decide

**Agreement metrics** (H2) compare the plant-data estimate with the reference, day by day:`,
        },
        { kind: "equation", formula: "mz13-agreement" },
        {
          kind: "md",
          md: md`Add the **soiling rate error** (inferred minus reference rate, %/day, per interval) and **cleaning-event detection** against the log (precision: share of detected cleanings that were real; recall: share of real cleanings detected).

The **decision metric** (H4) asks whether the analytics improves what the plant does. Replay the history with each policy (the monthly schedule, a cost-optimal fixed interval, the condition-based rule) and compute its total cost against the best schedule chosen with perfect hindsight:`,
        },
        { kind: "equation", formula: "mz13-regret" },
        {
          kind: "flow",
          title: "The study protocol in six phases",
          steps: [
            { label: "0. Protocol signed", detail: "Hypotheses, metrics, thresholds, frozen parameters, data and publication terms agreed with KISR; MEWRE consent if required" },
            { label: "1. Data audit", detail: "Inventory, gaps, clock alignment, sensor calibration history; establish the facts of the cleaning-arm failure" },
            { label: "2. Back-analysis", detail: "Corrected PR (H1), inference on history, natural experiment (H3), policy replay (H4)" },
            { label: "3. Reference instrumentation", detail: "Soiling stations or cleaned reference rows per section, calibration month" },
            { label: "4. Measurement year", detail: "Blind daily inference vs reference (H2); monthly joint review" },
            { label: "5. Report and publish", detail: "All hypotheses reported, including failures; joint paper and open method" },
          ],
          caption: "Durations are planning assumptions. Phases 2 and 3 overlap. Nothing starts before phase 0 is signed.",
        },
        { kind: "sources", refs: ["mz13-r1", "mz13-r2", "mz13-r3", "mz13-r4", "mz13-r5", "mz13-r8", "mz13-r13"] },
      ],
    },
    // ============================================================ APPLIED
    {
      layer: "applied",
      title: "The numbers behind each hypothesis",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "H1: why a hot day looks dirty in basic PR and clean in corrected PR",
          given: md`**Illustrative, not Shagaya data.** A 1,000 kWp section with poly-Si modules, power temperature coefficient $\gamma = -0.40$ %/°C. Annual irradiance-weighted reference cell temperature $T_{ref} = 49$ °C. July day: plane-of-array insolation 7.5 kWh/m², energy 5,200 kWh, irradiance-weighted cell temperature 62 °C. January day: 5.0 kWh/m², 3,900 kWh, 30 °C. Both days are 5 days after a cleaning.`,
          steps: [
            { md: md`**Basic PR.** July: $5{,}200 / (1{,}000 \times 7.5) = 0.693$. January: $3{,}900 / (1{,}000 \times 5.0) = 0.780$. Basic PR says July is 8.7 points worse.` },
            { md: md`**Temperature factor** $1 + \gamma (T_{cell} - T_{ref})$. July: $1 - 0.004 \times 13 = 0.948$. January: $1 - 0.004 \times (-19) = 1.076$.` },
            { md: md`**Corrected PR** (daily approximation with the irradiance-weighted cell temperature). July: $0.693 / 0.948 = 0.731$. January: $0.780 / 1.076 = 0.725$.` },
            { md: md`**Reading.** After correction the two days differ by 0.6 points, and July is slightly better. The 8.7-point gap was heat. A cleaning model run on basic PR would have scheduled extra summer cleanings for dust that was not there.` },
          ],
          result: md`Basic PR: 0.693 vs 0.780. Corrected PR: 0.731 vs 0.725. This is the H1 test in miniature: across a year, post-cleaning corrected PR must stay inside the agreed band while basic PR swings.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "H3 and H2: reading the natural experiment and the agreement test",
          given: md`**Illustrative.** Natural experiment (difference-in-differences): mean SR in the 8 weeks before the failure, same season, was 0.955 in section A and 0.957 in section B. During an 8-week window of the failure, section A (no cleaning) averaged 0.870 and section B (normal monthly cleaning) 0.950. Agreement test over the measurement year: daily differences between inferred SR and station SR have mean $-0.3$ points and standard deviation 0.9 points. The protocol threshold for H2 is limits of agreement within $\pm 2$ points.`,
          steps: [
            {
              md: md`Change in A: $0.870 - 0.955 = -0.085$. Change in B: $0.950 - 0.957 = -0.007$. Difference-in-differences: $\hat\delta = -0.085 - (-0.007) = -0.078$, a 7.8-point extra loss attributable to the failed cleaning.`,
              hidden: true,
              check: { prompt: "Difference-in-differences effect of the failure, in SR points (negative = more loss)", answer: -7.8, unit: "points", tolerance: { abs: 0.1 } },
            },
            {
              md: md`If accumulation is linear from the normal-cleaning level, the average extra loss over an uncleaned window of length $T$ is about $r T / 2$ more than normal. With $T = 56$ days: $r \approx 2 \times 7.8 / 56 = 0.28$ %/day. Compare with the rate inferred from normal periods: H3 passes if the two agree within the protocol band.`,
              hidden: true,
              check: { prompt: "Implied background soiling rate (%/day)", answer: 0.28, unit: "%/day", tolerance: { abs: 0.01 } },
            },
            {
              md: md`Limits of agreement: $-0.3 \pm 1.96 \times 0.9 = -0.3 \pm 1.76$, so from $-2.06$ to $+1.46$ points. The lower limit is outside $\pm 2$.`,
              hidden: true,
              check: { prompt: "Lower 95 % limit of agreement, in SR points", answer: -2.06, unit: "points", tolerance: { abs: 0.02 } },
            },
            { md: md`**Verdict.** H2 fails narrowly on the lower limit, although bias is inside $\pm 0.5$. Because the threshold was agreed in advance, nobody can argue it away. The report says so, shows when the large negative differences occur (typically storm days or the days after, when the station and the plant soil differently) and proposes the fix for the next study, for example a storm-day flag or a second station.` },
          ],
          result: md`DiD effect 7.8 points, implied rate about 0.28 %/day, limits of agreement $-2.06$ to $+1.46$ points: H3 can pass while H2 fails narrowly. A pre-registered protocol turns this into a publishable, honest result instead of an argument.`,
        },
        {
          kind: "question",
          question: {
            id: "mz13-l01-p1",
            type: "numeric",
            prompt: md`Replay of the history (illustrative): the monthly cleaning schedule cost USD 5.20 m/yr in cleaning plus lost energy, the condition-based rule USD 4.45 m/yr and the hindsight-optimal schedule USD 4.20 m/yr. By what percentage does the condition-based rule reduce regret compared with the monthly schedule?`,
            answer: 75,
            unit: "%",
            tolerance: { abs: 0.5 },
            explanation: md`Regret of the monthly schedule: $5.20 - 4.20 = 1.00$ m. Regret of the rule: $4.45 - 4.20 = 0.25$ m. Reduction $= (1.00 - 0.25) / 1.00 = 75$ %. The absolute saving (USD 0.75 m/yr) must still exceed its uncertainty for H4 to pass.`,
            concepts: ["mz13.decision-regret"],
            difficulty: 2,
          },
        },
      ],
    },
    // ============================================================ FIELD
    {
      layer: "field",
      title: "Your study design: four graded exercises",
      blocks: [
        {
          kind: "md",
          md: md`### How it is done in practice

- **Who writes what.** You draft the hypotheses, the data request and the protocol, because they are commercial and relational documents as much as technical ones. Your engineering partners write the analysis code and the statistical analysis plan. KISR researchers review the method, contribute site knowledge and own the scientific interpretation jointly with you.
- **Tools.** pvlib for expected energy and cell temperature; pvanalytics for the NREL corrected PR and data filters; RdTools for SRR soiling and cleaning detection; a versioned repository with the frozen parameters in one configuration file, and a hash of that file in the protocol.
- **Documents.** Study protocol (signed), data request letter, data-sharing agreement, statistical analysis plan, monthly review minutes, final report.
- **What goes wrong.** Starting analysis before the protocol is frozen (every later result is suspect); discovering in month 4 that the cleaning log is incomplete; clocks of the SCADA and the met station 7 minutes apart; irradiance sensors never cleaned or recalibrated; thresholds chosen after seeing the data.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Do not let the commercial goal leak into the method",
          md: md`Mizan wants H2 and H4 to pass because they support the product. KISR researchers know that, and will watch for it. The protection is structural: thresholds agreed in advance, blind comparison in the measurement year (the person running the inference does not see the station data until the monthly lock), all hypotheses reported. A study that reports a narrow failure honestly is worth more to Mizan's credibility in Kuwait than one that looks too good.`,
        },
        {
          kind: "ask",
          title: "Questions to settle with KISR before the design is frozen",
          items: [
            "Exactly when did the cleaning arm fail and get repaired, which section or rows did it affect, and was any manual cleaning done in between?",
            "Which data from 2017 to 2026 is retained, at what resolution, and with which tags for energy, irradiance, temperature, cleaning and outages?",
            "Which irradiance and temperature sensors exist, when were they last calibrated and how often are they cleaned?",
            "Who owns the plant data today (KISR or MEWRE), and whose consent does sharing it require?",
            "Which thresholds for H1 to H4 would KISR consider scientifically meaningful, and which would it publish if they fail?",
            "Who on the KISR side will be a co-author, and who reviews the protocol before signature?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "mz13-l01-p2",
            type: "short",
            prompt: md`**Exercise 1: hypotheses and success criteria.** Write the four hypotheses for the Shagaya study (baseline, inference, natural experiment, decision). For each give: the claim, the metric with its formula or definition, the threshold you would propose to KISR and why, the data and window used, and the result that would refute it. Add one sentence on what Mizan would publish if each one fails.`,
            rubric: [
              "Four hypotheses covering baseline (corrected PR), inference (agreement with an independent reference), natural experiment (cleaning-arm failure) and decision (cost or regret).",
              "Each has a quantitative metric with a definition (amplitude, bias and limits of agreement, rate error or DiD effect, regret or net saving) and a numeric threshold with a reason (measurement uncertainty, decision relevance).",
              "Each names the data and analysis window and the result that would refute it; thresholds are to be agreed before analysis.",
              "The natural-experiment hypothesis is conditional on the failure facts being confirmed, and the pilot is described as targeted, not signed.",
              "States the null results that would be published and does not overclaim what the study can show.",
            ],
            modelAnswer: md`**H1 Baseline.** Claim: NREL weather-corrected PR removes the temperature signal. Metric: seasonal amplitude (max minus min of monthly means) of corrected PR on days 0 to 3 after a cleaning, per section. Threshold: at most 1.5 points (about three times the uncertainty of a monthly mean PR); basic PR amplitude reported alongside. Data: inverter energy, POA irradiance, back-of-module temperature, 2017 onward. Refuted if amplitude exceeds 1.5 points or the residual correlates with cell temperature (slope significantly different from zero). If it fails: we publish the residual temperature dependence and test a measured coefficient.

**H2 Inference.** Claim: daily SR inferred from plant data agrees with the station SR. Metric: bias $\bar d$ and 95 % limits of agreement $\bar d \pm 1.96 s_d$. Threshold: bias within $\pm 0.5$ points, limits within $\pm 2$ points, chosen because a 2-point error in SR changes the cost-optimal cleaning date by only a few days at 0.3 %/day. Data: measurement year, blind comparison. Refuted if either is outside. If it fails: we publish the error distribution and when it occurs.

**H3 Natural experiment.** Claim, conditional on KISR's logs confirming the dates and affected section: the soiling rate inferred from normal periods predicts the extra loss during the cleaning-arm failure. Metric: DiD effect (or interrupted time series residual) versus the loss predicted from the normal-period rate, storm steps removed. Threshold: within $\pm 25$ %. Refuted if outside, or the effect is not distinguishable from zero. If it fails: we publish that rates at this site are not stationary enough to extrapolate.

**H4 Decision.** Claim: a condition-based rule lowers total cost against the monthly schedule. Metric: regret against the hindsight-optimal schedule, valued at an agreed energy value and cleaning cost per cycle. Threshold: regret reduction larger than the uncertainty of the saving (k = 2). Data: replay 2017 onward and the measurement year. If it fails: we publish that at this site the monthly schedule is already near the flat optimum.`,
            explanation: md`The grader looks for falsifiability (metric, threshold, refutation) and for honesty about what is conditional. A threshold with a reason beats a threshold that merely sounds strict.`,
            concepts: ["mz13.falsifiable-hypothesis", "mz13.agreement-metrics", "mz13.decision-regret"],
            difficulty: 3,
          },
        },
        {
          kind: "question",
          question: {
            id: "mz13-l01-p3",
            type: "short",
            prompt: md`**Exercise 2: the data request.** Write the data request you would send to KISR for the back-analysis (phases 1 and 2): the list of signals and logs with resolution, period and why each is needed; the metadata you need (sensor models, calibration certificates, layout); the format and delivery; and the three questions about the cleaning-arm failure you need answered before any analysis.`,
            rubric: [
              "Lists energy (inverter or section level, meter), POA irradiance, module or cell temperature, ambient weather and wind, humidity or dew, cleaning log, outage, curtailment and maintenance logs, each with resolution and period.",
              "Asks for metadata: sensor models, positions, calibration and cleaning history of irradiance sensors, temperature coefficients and module datasheets per section, layout and string configuration.",
              "Specifies format, time zone and clock reference, delivery and handling (secure transfer, no onward sharing) and ties each signal to a hypothesis.",
              "Asks the three key questions on the cleaning-arm failure: dates, affected section or rows, any substitute cleaning and data retention for the period.",
              "Tone fits a research partner and a public body: respectful, specific, and clear about confidentiality and ownership staying with the data owner.",
            ],
            modelAnswer: md`**Subject: Shagaya Phase I PV soiling study, data request for the back-analysis (draft for discussion)**

**Signals (2017 to the latest available; finest stored resolution, ideally 1 to 15 min):** AC energy and power per inverter and per section, revenue meter export (H1, H2, H4); DC current and voltage per inverter if stored (clipping and fault filters); POA irradiance per section and GHI, DHI (all hypotheses); back-of-module temperature per section, ambient temperature, wind speed and direction (temperature model, H1); relative humidity and rainfall (dew and natural cleaning, H3).

**Logs:** cleaning log with date, block and method (H2 detection test, H3, H4); outages, curtailment, inverter alarms and maintenance (filters); sensor cleaning and calibration records.

**Metadata:** module datasheets and temperature coefficients for the thin-film and poly-Si sections; inverter and string layout; sensor models, positions and calibration certificates; time zone and clock source of SCADA and met station.

**Format and handling:** CSV or Parquet with tag dictionary; secure transfer; data stays the property of its owner, used only for this study under the data-sharing agreement, no onward sharing.

**Cleaning-arm failure:** (1) start and end dates, and when cleaning resumed; (2) which section, blocks or rows were affected, and whether any manual cleaning replaced it; (3) is the data for that period retained at the same resolution, and were sensors maintained during it?`,
            explanation: md`A data request that names why each signal is needed gets answered faster, and shows the partner you will not ask for data you do not use.`,
            concepts: ["mz13.study-protocol", "mz13.corrected-pr-baseline"],
            difficulty: 2,
          },
        },
        {
          kind: "question",
          question: {
            id: "mz13-l01-p4",
            type: "short",
            prompt: md`**Exercise 3: the natural-experiment analysis.** Design the analysis of the 2018 to 2019 cleaning-arm failure for two cases: (a) only one section was affected and the other kept normal cleaning; (b) the whole PV plant was affected. For each, give the estimator, the comparison, how dust storms and season are handled, the three main threats to validity and how you would check each.`,
            rubric: [
              "Case (a) uses difference-in-differences with the unaffected section as control and states the parallel-trends assumption and how to check it (pre-period behaviour of both sections).",
              "Case (b) uses an interrupted time series or projection from normal-period rates per season, with storm steps separated by change points.",
              "Dust storms and season handled explicitly (they cancel in DiD; modelled or matched by season in the time series).",
              "Threats named with checks: concurrent changes (inverter faults, sensor swaps), sensor soiling or drift during the failure, different technologies (thin-film vs poly-Si) responding differently, incomplete logs.",
              "Conditional on confirming the facts with KISR; does not present invented dates as facts.",
            ],
            modelAnswer: md`**(a) One section affected.** Estimator: $\hat\delta = (\bar{SR}_{A,\text{fail}} - \bar{SR}_{A,\text{pre}}) - (\bar{SR}_{B,\text{fail}} - \bar{SR}_{B,\text{pre}})$ by week, with the pre-period the same season of the previous year and the weeks just before the failure. Storms and season hit both sections and cancel. Assumption: parallel trends; check that the two sections' corrected PR moved together in the pre-period (the 2020 paper found the sections performed alike, which helps) and run a placebo DiD on a period with no failure, which should give zero.

**(b) Whole plant affected.** Interrupted time series: fit per-season background rates and storm steps from normal years, project the uncleaned accumulation over the failure dates, compare with observed corrected-PR loss. Season handled by using rates from the same months; storms by change-point detection and checking dates against visibility and dust-storm records.

**Threats and checks.** (1) Concurrent changes: inverter outages, string faults, a sensor replacement; check the maintenance log and filter. (2) The irradiance sensor also uncleaned during the failure, which hides soiling (dirty sensor reads low, PR reads high); check sensor cleaning records and compare with satellite irradiance. (3) Thin-film and poly-Si differ in spectral and temperature response; analyse per section with its own coefficient. (4) Incomplete or approximate logs; bound the failure dates from the data itself (absence of cleaning steps) and report sensitivity to the dates.

All of this depends on KISR confirming the failure dates and extent; until then the design stays conditional.`,
            explanation: md`A natural experiment is only as good as its comparison. Naming the assumption (parallel trends, stationarity) and how you would test it is what researchers look for.`,
            concepts: ["mz13.natural-experiment-design"],
            difficulty: 3,
          },
        },
        {
          kind: "question",
          question: {
            id: "mz13-l01-p5",
            type: "short",
            prompt: md`**Exercise 4: the one-page study protocol.** Write the protocol you would propose to KISR: title and research question, partners and roles, hypotheses (one line each, refer to exercise 1), data and instruments, frozen method choices (baseline formula, reference temperature, temperature coefficients, filters, inference method and version), metrics and thresholds, phases with indicative durations, blinding and monthly review, stop or change rules, data ownership and publication principles. Describe the pilot status accurately.`,
            rubric: [
              "Complete structure: question, roles, hypotheses, data, frozen method, metrics and thresholds, phases, review, change control, data and publication principles.",
              "Method choices are frozen and specific (NREL corrected PR with irradiance-weighted T_ref, per-section coefficients, filter thresholds, SRR with stated software version and parameters).",
              "Includes blinding or a lock procedure in the measurement year and a rule for protocol changes (written amendment, both partners sign, reported in the paper).",
              "Roles are realistic: KISR as methodology partner and co-author, Mizan running analysis and software, plant owner consent; names only Omar Abu Harb if any Mizan person is named.",
              "Pilot described as targeted or in preparation, never signed or running; durations given as indicative.",
              "Data ownership stays with the plant owner, joint publication with all results reported, Mizan keeps its software IP.",
            ],
            modelAnswer: md`**Shagaya Phase I PV soiling validation study: protocol v0.9 (draft for KISR review; pilot targeted, not yet agreed)**

**Question.** Can operational data from Shagaya Phase I PV produce soiling estimates and cleaning decisions accurate enough to act on?

**Partners.** KISR researchers: methodology partner, site knowledge, scientific co-lead and co-authors. Mizan: study design, analysis, software, project management. Plant owner (MEWRE or KISR, to confirm): data owner, consent.

**Hypotheses.** H1 corrected PR removes temperature seasonality (amplitude at most 1.5 points). H2 inferred SR agrees with reference (bias within ±0.5, LoA within ±2 points). H3 normal-period rates predict the cleaning-arm failure loss (within ±25 %; conditional on confirmed dates). H4 condition-based rule reduces regret by more than its uncertainty.

**Data.** Historical 2017 to latest (energy, irradiance, temperature, weather, logs); new: one soiling station per section, cleaned reference rows, humidity and glass temperature.

**Frozen method.** NREL weather-corrected PR, $T_{ref}$ irradiance-weighted over each analysis year; datasheet coefficients per section, measured coefficient as a sensitivity case; filters: irradiance at least 200 W/m², no outage or curtailment flags, clipping removed; SRR in RdTools (version fixed in the repository, cleaning criterion and parameters in the configuration file whose hash is in this protocol).

**Phases (indicative).** 0 sign protocol and data agreement; 1 data audit, 1 to 2 months; 2 back-analysis, 2 to 3 months; 3 instrumentation and calibration, 2 months in parallel; 4 measurement year, 12 months; 5 report and paper, 3 months.

**Review and blinding.** The analyst does not see station data until the monthly lock; joint monthly review with minutes.

**Change control.** Any change is a written amendment signed by both partners and reported in the paper.

**Data and publication.** Data remain the owner's property; joint publication of all hypotheses including failures; KISR and Mizan co-authors by contribution; Mizan retains its software IP; an open description of the method is published.`,
            explanation: md`The protocol is what both partners sign. Its value is the frozen choices and the rules for changing them: they make the result trustworthy whichever way it comes out.`,
            concepts: ["mz13.study-protocol", "mz13.falsifiable-hypothesis"],
            difficulty: 3,
          },
        },
        { kind: "xref", to: "mz02-l04", note: "Measurement uncertainty and detection limits: use them to justify the H1 and H2 thresholds rather than picking round numbers." },
        { kind: "xref", to: "fc04-l06", note: "A pilot that converts has written success criteria agreed up front; the study protocol is the research version of the same discipline." },
      ],
    },
  ],
  quiz: [
    {
      id: "mz13-l01-q1",
      type: "numeric",
      prompt: md`A section produced 4,800 kWh on a day with 7.0 kWh/m² of POA insolation; nameplate 1,000 kWp; irradiance-weighted cell temperature 60 °C; reference temperature 48 °C; $\gamma = -0.40$ %/°C. What is the daily corrected PR (as a fraction, 3 decimals)?`,
      answer: 0.72,
      tolerance: { abs: 0.002 },
      explanation: md`Basic PR $= 4{,}800 / 7{,}000 = 0.686$. Temperature factor $= 1 - 0.004 \times 12 = 0.952$. Corrected PR $= 4{,}800 / (7{,}000 \times 0.952) = 4{,}800 / 6{,}664 = 0.720$. The hot day's 3.4-point deficit in basic PR was heat, not dust.`,
      concepts: ["mz13.corrected-pr-baseline"],
      difficulty: 2,
    },
    {
      id: "mz13-l01-q2",
      type: "numeric",
      prompt: md`Daily differences between inferred and reference soiling ratio have mean $+0.2$ points and standard deviation 0.8 points. What is the upper 95 % limit of agreement, in points?`,
      answer: 1.77,
      unit: "points",
      tolerance: { abs: 0.02 },
      explanation: md`$\bar d + 1.96\, s_d = 0.2 + 1.568 = 1.77$ points. The lower limit is $0.2 - 1.568 = -1.37$.`,
      concepts: ["mz13.agreement-metrics"],
      difficulty: 1,
    },
    {
      id: "mz13-l01-q3",
      type: "numeric",
      prompt: md`Natural experiment: the affected section's mean SR fell from 0.960 to 0.890; the control section's from 0.962 to 0.950 over the same weeks. What is the difference-in-differences effect, in SR points?`,
      answer: -5.8,
      unit: "points",
      tolerance: { abs: 0.1 },
      explanation: md`$(0.890 - 0.960) - (0.950 - 0.962) = -0.070 + 0.012 = -0.058$, a 5.8-point extra loss attributable to the missing cleaning.`,
      concepts: ["mz13.natural-experiment-design"],
      difficulty: 1,
    },
    {
      id: "mz13-l01-q4",
      type: "mcq",
      prompt: md`Which hypothesis is falsifiable as written?`,
      options: [
        "Mizan's analytics will significantly improve cleaning at Shagaya.",
        "Inferred daily SR agrees with the station SR with bias within ±0.5 points and 95 % limits of agreement within ±2 points over the measurement year.",
        "Plant data contains useful information about soiling.",
        "The method is state of the art and better than alternatives.",
      ],
      answer: 1,
      explanation: md`Only the second names a metric, a threshold, the data and the window, so a defined result would refute it. The others can be read as true whatever happens.`,
      concepts: ["mz13.falsifiable-hypothesis"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz13-l01-q5",
      type: "multi",
      prompt: md`Which choices must be frozen in the protocol before any results are seen? Select all that apply.`,
      options: [
        "Reference temperature definition and temperature coefficients per section",
        "Data filters (irradiance threshold, outage and curtailment flags, clipping)",
        "Thresholds for each hypothesis",
        "The conclusion of the paper",
        "Soiling inference method, software version and parameters",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`Method, filters, parameters and thresholds are frozen; the conclusion is what the frozen method produces. Changing any frozen item afterwards needs a signed amendment reported in the paper.`,
      concepts: ["mz13.study-protocol"],
      difficulty: 1,
    },
    {
      id: "mz13-l01-q6",
      type: "decision",
      prompt: md`In month 2 of the back-analysis your engineer finds that relaxing the irradiance filter from 200 to 100 W/m² makes H2 pass on the historical data. What do you do?`,
      options: [
        { text: "Adopt 100 W/m² quietly; it is a technical detail", score: 0, feedback: "Changing a frozen choice after seeing the result is exactly what destroys the study's credibility. KISR will notice, and so will reviewers." },
        { text: "Keep 200 W/m² as the primary analysis, report 100 W/m² as a pre-declared sensitivity case if it was in the protocol, or as an exploratory result clearly labelled; any change to the primary analysis goes through a signed amendment with the reason, before the measurement-year data is unblinded", score: 1, feedback: "Correct. Exploration is fine when labelled; the primary analysis stays as agreed." },
        { text: "Drop H2 from the study since it is the hardest to pass", score: 0.1, feedback: "Removing a hypothesis after results is the same problem in another form." },
        { text: "Ask KISR to agree to 100 W/m² because it makes the result better", score: 0.4, feedback: "Involving KISR is right, but the reason for a change must be scientific (for example, low-light data quality), not that it improves the result." },
      ],
      explanation: md`Pre-registration exists for this moment: the primary analysis stays frozen, and everything else is labelled for what it is.`,
      concepts: ["mz13.study-protocol", "mz13.falsifiable-hypothesis"],
      difficulty: 2,
    },
    {
      id: "mz13-l01-q7",
      type: "order",
      prompt: md`Put the study phases in order.`,
      items: [
        "Protocol and data agreement signed",
        "Data audit and facts of the cleaning-arm failure established",
        "Back-analysis of history (H1, H3, H4 replay)",
        "Measurement year with blind comparison (H2)",
        "Report all hypotheses and publish jointly",
      ],
      explanation: md`Nothing starts before the protocol is signed; the audit establishes what the history can support; the history gives early results while the reference instruments collect a year; the report covers every hypothesis.`,
      concepts: ["mz13.study-protocol"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "mz13-l01-f1", front: "Falsifiable hypothesis: the five parts", back: "Claim, metric (with formula), threshold (with reason), data and window, and the result that would refute it. Agreed before analysis.", concepts: ["mz13.falsifiable-hypothesis"] },
    { id: "mz13-l01-f2", front: "NREL weather-corrected PR", back: md`$PR_{corr} = \sum E_i \,/\, \sum P_{STC} \frac{G_i}{G_{STC}} [1 + \gamma (T_{cell,i} - T_{ref})]$ with $T_{ref}$ the irradiance-weighted cell temperature.`, concepts: ["mz13.corrected-pr-baseline"] },
    { id: "mz13-l01-f3", front: "Difference-in-differences", back: md`$\hat\delta = (\bar Y_{T,\text{post}} - \bar Y_{T,\text{pre}}) - (\bar Y_{C,\text{post}} - \bar Y_{C,\text{pre}})$: weather and storms hit both and cancel; assumes parallel trends.`, concepts: ["mz13.natural-experiment-design"] },
    { id: "mz13-l01-f4", front: "Limits of agreement (Bland-Altman)", back: md`$\bar d \pm 1.96\, s_d$ of the daily differences between method and reference; report with the bias.`, concepts: ["mz13.agreement-metrics"] },
    { id: "mz13-l01-f5", front: "Decision regret", back: "Cost of a policy minus the cost of the hindsight-optimal schedule. Tests whether analytics improves decisions, not only measurement.", concepts: ["mz13.decision-regret"] },
    { id: "mz13-l01-f6", front: "Why the cleaning-arm failure matters", back: "It created months without cleaning that no operator would allow on purpose: a natural experiment to test whether inferred soiling rates explain the accumulated loss. Facts to be confirmed from KISR logs.", concepts: ["mz13.natural-experiment-design"] },
    { id: "mz13-l01-f7", front: "Protocol change rule", back: "Any change to a frozen choice is a written amendment signed by both partners, with its reason, made before unblinding and reported in the paper.", concepts: ["mz13.study-protocol"] },
  ],
};

export default lesson;
