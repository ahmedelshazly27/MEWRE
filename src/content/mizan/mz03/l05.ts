import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz03-l05",
  title: "Validation against ground truth and natural experiments: the Shagaya cleaning interruption",
  summary:
    "How to prove an inferred soiling estimate is right: the hierarchy of ground truth (soiling stations, cleaning tests, control rows), validation metrics for soiling ratios and cleaning detection, and how to analyse an uncontrolled event such as the 2018 to 2019 cleaning arm failure at Shagaya as a natural experiment (interrupted time series, restart steps, difference-in-differences) without overclaiming.",
  minutes: 85,
  objectives: [
    "Rank sources of soiling ground truth and state what each one validates",
    "Compute bias, RMSE, and precision and recall of cleaning detection from a comparison table",
    "Estimate soiling from a restart step and from a difference-in-differences design, and list the assumptions of each",
    "Recognise the threats to validity in a single uncontrolled event and the claims it can and cannot support",
    "Write a pre-registered analysis plan for the Shagaya cleaning interruption with KISR",
  ],
  concepts: [
    { id: "mz03.ground-truth", name: "Soiling ground truth", description: "Independent measurements of the soiling ratio (soiling stations with clean and soiled references, before and after cleaning tests, uncleaned control rows) against which inference is validated.", competency: "mz-validation", related: ["m02.soiling"] },
    { id: "mz03.validation-metrics", name: "Validation metrics", description: "Bias, MAE and RMSE of inferred soiling ratios or losses, plus precision, recall and timing error of cleaning-event detection.", competency: "mz-validation" },
    { id: "mz03.natural-experiment", name: "Natural experiment", description: "An event not designed by the analyst (such as an unplanned cleaning interruption) that changes the treatment for some units or periods, analysed with designs that control for confounders.", competency: "mz-validation" },
    { id: "mz03.did", name: "Difference-in-differences", description: "Effect estimate from the change in an affected group minus the change in a comparison group, valid under parallel trends.", competency: "mz-validation", related: ["mz03.natural-experiment"] },
    { id: "mz03.pre-registration", name: "Pre-registered analysis plan", description: "Writing the hypotheses, data, method, metrics and decision rules before looking at the outcome data, to prevent tuning the analysis to the answer.", competency: "mz-validation", related: ["fc02.pilot-success-criteria"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What counts as truth, and how to learn from an accident",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`The pilot with KISR is a validation study before it is a sales tool. A researcher partner will judge Mizan on whether its claims survive a hostile reviewer, and a co-authored result is worth more in Kuwaiti procurement than any deck. The Shagaya cleaning interruption is the most valuable dataset in the story precisely because it was not designed: handled well, it is evidence; handled carelessly, it is an anecdote that discredits you.`,
        },
        {
          kind: "md",
          md: md`### The ground-truth hierarchy

| Source | What it measures | What it validates | Limits |
|---|---|---|---|
| Soiling station (IEC 61724-1 soiling ratio: a cleaned and a soiled reference device, Isc or Pmax, temperature corrected) | SR of a small reference, continuously | Daily SR profile, rates, event steps | Point measurement; the clean reference must actually be cleaned; may not represent the whole array |
| Before and after cleaning test on a block (I-V curves or inverter energy, same conditions) | SR of that block at that moment | The level just before cleaning, cleaning effectiveness | Snapshot; needs stable irradiance |
| Uncleaned control rows or block | Natural soiling without cleaning | The rate and saturation; the value of cleaning | Costs energy; must be agreed with the owner |
| Optical sensors (transmission type) | Proxy for SR | Timing, relative changes | Sensor-specific calibration |
| Cleaning log | When crews worked | Detected cleaning events | Says nothing about effectiveness |

IEC 61724-1 makes soiling measurement part of Class A monitoring; under the 2017 edition it was required when expected soiling losses exceed 2 % (whether the 2021 edition keeps that threshold is unverified in Mizan's research). The IEA PVPS Task 13 report on soiling stresses that soiling varies within and across plants, so one station is not enough to validate a whole plant: Kipp and Zonen's guidance suggests several sensors (middle and corners) for 25 MW.

### What to measure: validation metrics

For daily or interval soiling ratios against ground truth:`,
        },
        { kind: "equation", formula: "mz03-error-metrics" },
        {
          kind: "md",
          md: md`Bias matters most for money (a method that understates soiling by 2 points systematically will under-clean); RMSE says how far any single day can be trusted. For cleaning detection, treat it as classification: **precision** = detected events that were real cleanings / all detected events; **recall** = real cleanings detected / all real cleanings; plus the timing error in days. Report all of them per season and per cleaning regime.

### Natural experiments

A natural experiment is an event that changes the "treatment" (here: whether the array is cleaned) for reasons unrelated to the outcome you study. It is the closest thing to a controlled experiment that operations data offers. Three designs fit soiling:

**1. Interrupted time series.** Fit the pre-interruption pattern (monthly sawtooth), extend it as the counterfactual through the interruption, and compare with what happened. The longer the interruption, the more of the natural soiling curve you see: does soiling stay linear, saturate, or get worse after dew events?

**2. Restart step.** The first full cleaning after the interruption is a large, logged step. If the cleaning is complete, the ratio of PI before and after it is close to a direct measurement of SR at that moment: $\mathrm{SR}_{\mathrm{before}} \approx \mathrm{PI}_{\mathrm{before}}/\mathrm{PI}_{\mathrm{after}}$, with model bias cancelling because both sides use the same model within a day or two.

**3. Difference-in-differences.** If the interruption affected one section and another kept being cleaned (by a different method or crew), compare the change in the affected section with the change in the comparison section:`,
        },
        { kind: "equation", formula: "mz03-did" },
        {
          kind: "md",
          md: md`Everything shared (season, heat, sensor drift, model bias) cancels. The design rests on **parallel trends**: without the interruption, both sections would have moved alike. Check it on the pre-period: their PI should track each other through several normal cleaning cycles. Shagaya's two technology sections share sky, sensors and site, which makes the design plausible *if* the interruption hit them differently, and differ in temperature coefficient, which must be modelled before comparing.

### The Shagaya 2018 to 2019 cleaning arm failure

KISR has pointed Mizan to a cleaning arm failure at Shagaya in 2018 to 2019 as a natural experiment for validation: a period when the usual cleaning did not happen as planned.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Facts to establish before any analysis",
          md: md`Mizan does not yet have the details of the event: exact start and end dates, which sections or rows were affected, whether any manual or partial cleaning continued, what was repaired and when, and whether sensors were also affected. None of these are in the research brief or the published RSER 2020 paper's summary. Every analysis choice below depends on them; establish them from KISR's maintenance and cleaning logs and record their source before touching the performance data.`,
        },
        {
          kind: "md",
          md: md`### Threats to validity, and what you may claim

| Threat | Why it matters here | Mitigation |
|---|---|---|
| Season confounding | 2018 to 2019 spans dust season and summer heat; soiling rate and temperature loss both change | Temperature-corrected model; compare with the same months in other years |
| One event, one year | Dust climate varies year to year; dust storms raised Qatar's annual soiling rate by 23 % | Claim what happened in that period, not a general Shagaya rate |
| Co-occurring changes | Repairs, inverter replacements or sensor changes in the same months | Reconcile all maintenance logs |
| Partial cleaning or rain | Undocumented manual cleaning breaks the "no cleaning" assumption | Look for unexplained positive steps; interview the O&M team |
| Sensor soiling in the same period | If sensor wiping also lapsed, PI understates soiling | Use station irradiance or satellite as second source |
| Analyst degrees of freedom | Many filter and parameter choices; easy to tune to a desired result | Pre-register the plan; blind the method tuning to the event period |
| Data gaps and survivorship | Missing months may be missing because things went wrong | Report gaps; do not interpolate through them |

**Claims it can support** (if the data allows): the natural soiling trajectory at Shagaya over the interruption period, with uncertainty; whether soiling stayed linear or saturated; the energy lost relative to the normal cleaning regime in that period; how well a method calibrated on normal periods predicted the interruption (out-of-sample validation).

**Claims it cannot support**: a general annual soiling rate for Shagaya or Kuwait; the optimal cleaning interval for all years; that Mizan's method "is validated" in general. One event validates one regime once.

### Blind it, then open it

The strongest validation design: tune every filter and parameter on normal periods only, freeze the pipeline (version and config hashed), write predictions for the interruption period, and only then compare with what the data shows, ideally with KISR holding the comparison data. That is a pre-registered, out-of-sample test, and it is exactly the kind of result a co-authored paper can carry. Module mz10 develops study design and co-publishing.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "What a cleaning interruption looks like in two sections (hypothetical)",
          xKey: "month",
          xLabel: "Month relative to interruption start",
          yLabel: "Monthly mean performance index",
          series: [
            { key: "affected", label: "Section where cleaning stopped" },
            { key: "control", label: "Section still cleaned" },
          ],
          data: [
            { month: -4, affected: 0.95, control: 0.95 }, { month: -3, affected: 0.94, control: 0.945 }, { month: -2, affected: 0.95, control: 0.95 },
            { month: -1, affected: 0.95, control: 0.95 }, { month: 0, affected: 0.91, control: 0.94 }, { month: 1, affected: 0.86, control: 0.93 },
            { month: 2, affected: 0.82, control: 0.92 }, { month: 3, affected: 0.80, control: 0.92 }, { month: 4, affected: 0.78, control: 0.92 },
            { month: 5, affected: 0.94, control: 0.93 }, { month: 6, affected: 0.94, control: 0.94 },
          ],
          caption: "Hypothetical numbers for teaching, not Shagaya data. Parallel pre-trends, divergence during the interruption, a restart step at month 5. Both sections also drift down in months 1 to 4 (season): that common drift is what difference-in-differences removes.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Scoring a method and reading an interruption",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Difference-in-differences and the restart step on hypothetical numbers",
          given: md`Hypothetical (use the structure, not the numbers). Pre-period mean PI: affected section 0.95, comparison section 0.95. Late interruption period (months 3 to 4, rounded): affected 0.80, comparison 0.92. At restart, the affected section's PI is 0.78 on the day before the first full cleaning and 0.94 two days after.`,
          steps: [
            { md: md`**Naive before-after** for the affected section: $0.80 - 0.95 = -0.15$. This mixes soiling with season and model drift.` },
            { md: md`**Comparison change**: $0.92 - 0.95 = -0.03$, the common seasonal and model effect.` },
            { md: md`**DiD**: $\hat\delta = (-0.15) - (-0.03) = -0.12$: about 12 points of PI attributable to the missing cleaning, relative to the comparison section's normal regime (which itself carries its usual monthly sawtooth soiling).` },
            { md: md`**Restart step**: $\mathrm{SR}_{\mathrm{before}} \approx 0.78/0.94 = 0.83$, a 17 % soiling loss on the day before the restart, assuming the cleaning was complete.` },
            { md: md`**Consistency check**: the DiD measures the extra loss over the normal regime (which averages about 5 to 6 % soiling with monthly cleaning), the restart step measures the total loss on one day. A total of about 17 % at the end and an extra of about 12 % on average are coherent; if they had contradicted each other, one of the assumptions (complete restart cleaning, parallel trends) would be wrong.` },
          ],
          result: md`Two designs with different assumptions giving coherent answers is the evidence. Report both, with their assumptions, and the parallel-trends check from the pre-period.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Scoring an inference method against a soiling station",
          given: md`Six comparison periods. Inferred SR from plant data: 0.95, 0.93, 0.91, 0.90, 0.86, 0.84. Soiling station SR: 0.96, 0.94, 0.93, 0.91, 0.89, 0.86. Separately, over the year the method detected 10 cleaning events; the log shows 9 real cleanings, of which 8 were detected.`,
          steps: [
            { md: md`Errors $\hat y - y$: −0.01, −0.01, −0.02, −0.01, −0.03, −0.02.` },
            { md: md`Bias = mean error $= -0.10/6$.` },
            { md: md`$= -0.0167$: the method overstates soiling by about 1.7 points on average.`, hidden: true, check: { prompt: "Bias of inferred SR", answer: -0.0167, tolerance: { abs: 0.001 } } },
            { md: md`RMSE $= \sqrt{(0.0001+0.0001+0.0004+0.0001+0.0009+0.0004)/6} = \sqrt{0.0020/6}$.` },
            { md: md`$= 0.0183$.`, hidden: true, check: { prompt: "RMSE", answer: 0.0183, tolerance: { abs: 0.001 } } },
            { md: md`Precision $= 8/10 = 0.80$; recall $= 8/9 = 0.89$.`, hidden: true, check: { prompt: "Recall of cleaning detection", answer: 0.889, tolerance: { abs: 0.005 } } },
          ],
          result: md`RMSE is almost all bias (0.0183 vs 0.0167): the method is consistent but offset, which points to an anchor or sensor problem (for example the station's clean reference, or the plant pyranometer) rather than noise. The two false detections and one missed cleaning go on the investigation list.`,
        },
        {
          kind: "question",
          question: {
            id: "mz03-l05-p1",
            type: "numeric",
            prompt: md`Pre-period mean PI: section A 0.93, section B 0.94. During an interruption affecting only A: A 0.82, B 0.91. What is the difference-in-differences estimate of the effect on PI (as a signed number, 2 decimals)?`,
            answer: -0.08,
            tolerance: { abs: 0.005 },
            explanation: md`$(0.82 - 0.93) - (0.91 - 0.94) = -0.11 - (-0.03) = -0.08$. Note the sections need not start at the same level; DiD uses changes, so a constant offset (different technology, different model bias) cancels.`,
            concepts: ["mz03.did"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running a validation study with a research partner",
      blocks: [
        {
          kind: "md",
          md: md`### How it is done

- **Agree the question first**, in writing, with the KISR researchers: for example, "Does a method tuned on normal periods predict the soiling trajectory during the interruption within stated error?"
- **Data custody**: KISR holds the raw data; Mizan receives what the plan specifies; the outcome period can be withheld until the pipeline is frozen.
- **Pre-registration**: a dated document (and a hash of the code and configuration) listing hypotheses, data, filters, method parameters, metrics and what result would count as failure.
- **Two analysts**: one runs, one reviews the residual plots and log reconciliation independently.
- **Report everything**, including failures and sensitivity runs; a method that fails honestly on one regime is still publishable and still credible.

This is also how a pilot converts: success criteria agreed in advance are the bridge between a validation study and a contract.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How natural-experiment claims go wrong",
          md: md`- **Turning one event into a rate**: "Shagaya soils at X %/day" from one interruption in one year.
- **Ignoring the season**: attributing summer temperature loss to soiling.
- **Tuning on the event**: adjusting filters until the interruption "looks right" destroys its value as a test.
- **Forgetting the comparison also soils**: DiD measures extra loss over the comparison's regime, not total loss.
- **Publishing before the facts of the event are confirmed** from logs.
- **Overclaiming in sales material**: "validated by KISR" when what exists is one co-analysed event.`,
        },
        {
          kind: "checklist",
          title: "Validation study checks",
          items: [
            "Event facts (dates, affected sections, partial cleanings, repairs) confirmed from logs with source recorded",
            "Analysis plan pre-registered and code and config frozen before outcome data is examined",
            "Parallel trends checked on the pre-period for any DiD claim",
            "At least two designs (interrupted time series, restart step, DiD) compared for coherence",
            "Metrics reported: bias, RMSE, detection precision and recall, timing error, per season",
            "Claims limited to the period and regime observed; limitations written next to results",
          ],
        },
        {
          kind: "ask",
          title: "Questions to agree with the KISR researchers",
          items: [
            "What exactly failed in 2018 to 2019, which sections were affected, and is there a log of any cleaning that continued?",
            "Which ground truth exists for that period: I-V tests, sensor data, photos, cleaning crew notes?",
            "Who holds the outcome data, and when is it released to the analysts?",
            "What result would each of us regard as the method failing?",
            "What can be published, by whom, and in what order relative to commercial use?",
          ],
        },
        { kind: "sources", refs: ["mz03-r14", "mz03-r15", "mz03-r17", "mz03-r29"] },
        { kind: "xref", to: "fc04-l06", note: "Founder Core, pilots and proofs of concept that convert: success criteria agreed in advance." },
        { kind: "scenario", scenario: "mz03-s1" },
        {
          kind: "question",
          question: {
            id: "mz03-l05-p2",
            type: "short",
            prompt: md`Draft the **pre-registered analysis plan** (one page) that Mizan proposes to KISR for analysing the 2018 to 2019 Shagaya cleaning arm failure. Include: the facts that must be confirmed first, the hypotheses, data and custody, the frozen pipeline, the designs and metrics, the failure criteria, and the claims you commit not to make.`,
            rubric: [
              "Lists event facts to confirm from logs before analysis (dates, sections, partial cleaning, repairs, sensor status) and does not invent them",
              "States testable hypotheses and an out-of-sample framing (tuned on normal periods, tested on the interruption)",
              "Specifies data custody and freezing of code and configuration before outcome data is examined",
              "Uses at least two designs (interrupted time series, restart step, difference-in-differences with parallel-trends check) and appropriate metrics",
              "Defines failure criteria in advance",
              "Commits to limits on claims (no general rate, no blanket validated claim) and publication terms",
            ],
            modelAnswer: md`**Pre-registered analysis plan: Shagaya PV cleaning interruption (draft v0.1, Mizan and KISR)**
*1. Facts to confirm first (from KISR maintenance and cleaning logs)*: start and end dates of the cleaning arm failure; affected sections and rows; any manual or partial cleaning during it; date and completeness of the restart cleaning; any inverter, sensor or other maintenance in the period; sensor wiping history. Analysis starts only when these are documented with sources.
*2. Hypotheses*: H1, a soiling pipeline tuned only on normal periods (2017 onwards excluding the interruption window plus one month either side) predicts the daily SR during the interruption with bias within ±2 points and RMSE below 3 points. H2, soiling during the interruption is linear (no saturation) over its duration. H3, DiD and restart-step estimates are coherent within their uncertainty.
*3. Data and custody*: KISR holds all data; Mizan receives normal-period data first; interruption-period performance data is released only after the pipeline is frozen.
*4. Frozen pipeline*: filters, expected-energy model, SRR and change-point settings as per spec v0.1; code and configuration hashed and the hash recorded in this document.
*5. Designs*: interrupted time series against the counterfactual sawtooth; restart step SR = PI before / PI after; DiD between affected and unaffected sections if the facts support it, with parallel trends checked over at least three pre-period cleaning cycles after section-specific temperature modelling. Same-month comparisons with other years for season.
*6. Metrics*: bias, RMSE, MAE of daily SR; total energy lost relative to the normal regime with interval; sensitivity to recovery assumption and irradiance source.
*7. Failure criteria*: H1 fails if bias exceeds ±2 points or RMSE exceeds 3 points; a failure is reported as such.
*8. Claims we will not make*: a general Shagaya or Kuwait soiling rate from this event; an optimal cleaning interval for all years; "validated by KISR" beyond this specific test. Publication: joint, with both parties approving; commercial materials cite the paper and its limits.`,
            explanation: md`The plan is credible if it is written so that the result could come out against Mizan, and if every unknown fact is a precondition rather than an assumption.`,
            concepts: ["mz03.pre-registration", "mz03.natural-experiment", "mz03.did"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to Omar Abu Harb why the Shagaya cleaning failure is valuable, and why we must not say it proves Shagaya loses a certain percentage a year to soiling.",
          keyPoints: [
            "It shows the natural soiling trajectory when cleaning stopped, which normal monthly cleaning hides",
            "A method tuned on normal periods can be tested blind on it: an out-of-sample validation",
            "Season, repairs, sensor soiling and partial cleaning can all confound it",
            "It is one event in one year; dust climate varies by year",
            "Claims are limited to that period and regime, and the facts of the event must come from KISR's logs",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz03-l05-q1",
      type: "mcq",
      prompt: "Which ground truth directly measures the natural soiling rate without cleaning?",
      options: ["The cleaning log", "Uncleaned control rows or block", "A before and after cleaning test", "Satellite AOD"],
      answer: 1,
      explanation: md`Control rows show soiling accumulating without intervention. A before and after test gives a snapshot level; the log gives timing only; AOD is a proxy.`,
      concepts: ["mz03.ground-truth"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz03-l05-q2",
      type: "numeric",
      prompt: md`A method detected 12 cleaning events. The log shows 10 cleanings, of which 9 were among the detections. What is the precision of the detection (2 decimals)?`,
      answer: 0.75,
      tolerance: { abs: 0.005 },
      explanation: md`Precision = true detections / all detections = 9/12 = 0.75. Recall = 9/10 = 0.90.`,
      concepts: ["mz03.validation-metrics"],
      difficulty: 1,
    },
    {
      id: "mz03-l05-q3",
      type: "mcq",
      prompt: "What is the key assumption of a difference-in-differences estimate?",
      options: [
        "Both groups start at the same level",
        "Without the treatment, both groups would have changed alike (parallel trends)",
        "The treatment was randomly assigned by the analyst",
        "The outcome is normally distributed",
      ],
      answer: 1,
      explanation: md`Levels may differ; it is the counterfactual trends that must match. Check them on the pre-period.`,
      concepts: ["mz03.did"],
      difficulty: 1,
    },
    {
      id: "mz03-l05-q4",
      type: "multi",
      prompt: "Which claims could a well-analysed single cleaning interruption at Shagaya support? Select all that apply.",
      options: [
        "The soiling trajectory at the site during that period, with uncertainty",
        "The annual soiling rate of Shagaya in every year",
        "Whether a method tuned on normal periods predicted that period within stated error",
        "The optimal cleaning interval for all Kuwait plants",
        "Whether soiling stayed linear or saturated over the interruption",
      ],
      answer: [0, 2, 4],
      explanation: md`One event supports claims about that period and regime and an out-of-sample test of a method. General rates and universal cleaning intervals need many years and sites.`,
      concepts: ["mz03.natural-experiment"],
      difficulty: 2,
    },
    {
      id: "mz03-l05-q5",
      type: "numeric",
      prompt: md`The day before the restart cleaning, PI is 0.74; two days after, 0.92. Assuming a complete cleaning, what was the soiling ratio before it (2 decimals)?`,
      answer: 0.8,
      tolerance: { abs: 0.006 },
      explanation: md`$0.74/0.92 = 0.804$. Model bias cancels because both values use the same model within days. If cleaning was incomplete, the true SR was lower.`,
      concepts: ["mz03.natural-experiment"],
      difficulty: 1,
    },
    {
      id: "mz03-l05-q6",
      type: "decision",
      prompt: md`Midway through the analysis, your engineer finds that changing the rolling-median window makes the interruption fit "much better" and proposes switching. The plan was pre-registered with the old window. What do you do?`,
      options: [
        { text: "Switch and report the better fit.", score: 0, feedback: "Tuning on the test event turns validation into curve fitting, and KISR will see it in the plan history." },
        { text: "Keep the pre-registered result as the primary result; report the alternative window as a labelled post-hoc sensitivity, and test it on other periods before adopting it.", score: 1, feedback: "Right: the pre-registered result stands, and the new idea gets its own out-of-sample test." },
        { text: "Drop the interruption analysis and use only normal periods.", score: 0.2, feedback: "Throws away the most informative data to avoid an uncomfortable result." },
      ],
      explanation: md`Deviations from a pre-registered plan are allowed only when labelled as post-hoc and tested elsewhere.`,
      concepts: ["mz03.pre-registration"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz03-l05-f1", front: "Bias vs RMSE", back: "Bias: systematic offset (drives money decisions). RMSE: total typical error. RMSE close to |bias| means consistent but offset.", concepts: ["mz03.validation-metrics"] },
    { id: "mz03-l05-f2", front: "Precision and recall of cleaning detection", back: "Precision = true detections / all detections. Recall = true detections / all real cleanings.", concepts: ["mz03.validation-metrics"] },
    { id: "mz03-l05-f3", front: "Restart-step estimate", back: md`$\mathrm{SR}_{\text{before}} \approx \mathrm{PI}_{\text{before}}/\mathrm{PI}_{\text{after}}$, assuming the cleaning was complete.`, concepts: ["mz03.natural-experiment"] },
    { id: "mz03-l05-f4", front: "DiD formula", back: md`$(\bar Y_{T,post} - \bar Y_{T,pre}) - (\bar Y_{C,post} - \bar Y_{C,pre})$; requires parallel trends.`, concepts: ["mz03.did"] },
    { id: "mz03-l05-f5", front: "Why pre-register?", back: "So that filters and parameters cannot be tuned to the outcome; it makes the event an out-of-sample test.", concepts: ["mz03.pre-registration"] },
    { id: "mz03-l05-f6", front: "Biggest confounder in a 2018 to 2019 Kuwait interruption", back: "Season: dust season and summer heat change soiling rate and temperature loss at the same time.", concepts: ["mz03.natural-experiment"] },
  ],
  scenarios: [
    {
      id: "mz03-s1",
      title: "The KISR methodology meeting",
      dayInLife: true,
      context: md`You are at KISR with two researchers from the Shagaya PV performance team. You have shown a first SRR analysis of normal-period data from a public sample and proposed the pilot. One researcher says: "Everyone has a soiling algorithm. Why should we trust yours with our data?"`,
      start: "a",
      concepts: ["mz03.pre-registration", "mz03.natural-experiment", "mz03.ground-truth"],
      nodes: {
        a: {
          md: md`How do you answer?`,
          choices: [
            { text: "\"Our algorithm is proprietary and more accurate than RdTools.\"", score: 1, feedback: "An unsupported claim to researchers who know RdTools well. It invites the question you cannot answer yet.", next: "b" },
            { text: "\"You should not trust it yet. We start from the open SRR method, and propose to test our Kuwait-specific changes blind on the 2018 to 2019 cleaning interruption: we freeze the pipeline on normal periods, you hold the interruption data, and we agree in writing what counts as failure.\"", score: 10, feedback: "Credits open methods, turns the natural experiment into a fair test, and gives them control. That is how researchers become partners.", next: "c" },
            { text: "\"We have validated it at several Gulf plants.\"", score: 0, feedback: "Mizan has no such validation. Inventing it ends the relationship when checked.", next: "b" },
          ],
        },
        b: {
          md: md`The researcher asks for the validation data behind your claim. You have none to show.`,
          choices: [
            { text: "Retract the claim, apologise, and propose the blind test on the interruption instead.", score: 5, feedback: "Recovered, at a cost in trust. Next time lead with the test.", next: "c" },
          ],
        },
        c: {
          md: md`The second researcher says: "The interruption is messy. There may have been some manual cleaning, and it overlapped with summer." What do you propose?`,
          choices: [
            { text: "Confirm the event facts from their logs first, model temperature per section, compare with the same months in other years, and use restart-step and DiD estimates side by side, reporting only claims for that period.", score: 10, feedback: "Treats the messiness as design constraints, not as a reason to give up or to ignore it." },
            { text: "Say the algorithm is robust to noise, so it will not matter.", score: 1, feedback: "Season and partial cleaning are biases, not noise. This answer tells them you have not thought about confounders." },
            { text: "Suggest skipping the interruption and installing a soiling station first, then waiting a year.", score: 5, feedback: "A station is valuable, and worth proposing in parallel, but it discards the one dataset that tests the method now." },
          ],
        },
      },
    },
  ],
};

export default lesson;
