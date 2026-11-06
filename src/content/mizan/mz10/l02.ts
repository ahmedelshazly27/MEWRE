import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz10-l02",
  title: "Natural experiments and observational data: the Shagaya cleaning-arm failure and difference-in-differences",
  summary:
    "How to validate a soiling method on data nobody designed as an experiment: treating the 2018 to 2019 Shagaya cleaning-arm failure as a natural experiment, the difference-in-differences estimator and its parallel-trends assumption, the confounders that matter at a desert PV plant (weather, curtailment, degradation, sensor soiling), blinding the method to the event, and the line between what you can and cannot claim.",
  minutes: 75,
  objectives: [
    "Explain why an unplanned outage of cleaning is a natural experiment and what it can validate",
    "Compute a difference-in-differences estimate from treated and control performance ratios and state its assumption",
    "Check parallel trends on the pre-period and name what breaks it",
    "List the confounders at a desert PV plant (weather, dust storms, curtailment, outages, degradation, sensor soiling) and how each is handled",
    "Write claims from observational data that are scoped to what the design supports",
  ],
  concepts: [
    {
      id: "mz10.natural-experiment-design",
      name: "Natural experiment as a validation design",
      description: "Using an event the researcher did not control (such as a cleaning outage) to create treated and control conditions; strong when the event is unrelated to the outcome's other drivers, weak when records are uncertain.",
      competency: "mz-validation",
      related: ["mz04.natural-experiment", "mz10.did"],
    },
    {
      id: "mz10.did",
      name: "Difference-in-differences (DiD)",
      description: "Treated change minus control change across the same periods; removes shocks common to both groups, leaving the treatment effect if trends would otherwise have been parallel.",
      competency: "mz-validation",
      related: ["mz10.parallel-trends", "mz05.paired-block-design"],
    },
    {
      id: "mz10.parallel-trends",
      name: "Parallel-trends assumption",
      description: "Without treatment, treated and control groups would have changed by the same amount; tested (never proved) by comparing their pre-period trends.",
      competency: "mz-validation",
      related: ["mz10.did"],
    },
    {
      id: "mz10.confounder-control",
      name: "Confounders in PV plant data",
      description: "Factors that move the outcome and coincide with the event: weather and dust storms, curtailment and outages, degradation, sensor soiling and drift, equipment changes; handled by control groups, filters, normalisation and sensitivity checks.",
      competency: "mz-validation",
      related: ["mz03.confounders", "mz03.sensor-soiling"],
    },
    {
      id: "mz10.claim-scope",
      name: "Scope of claims from observational data",
      description: "What one natural experiment supports (the method recovered the uncleaned trajectory at this plant, in this period, within stated error) versus what it does not (general accuracy, savings at other plants, causation beyond the design).",
      competency: "mz-validation",
      related: ["mz10.natural-experiment-design"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Experiments nobody designed",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`A designed cleaning trial at Shagaya would take a year or more and cost the plant energy. The 2018 to 2019 cleaning-arm failure already happened: for a period, some of the plant soiled without the usual cleaning. If KISR's records and data support it, that period lets the targeted pilot test Mizan's method against a real, plant-scale "no cleaning" trajectory years before a designed trial could finish. It is the strongest early evidence Mizan can hope for, and the easiest to overclaim from. You need to know exactly what it can and cannot show.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Facts to confirm with KISR before any use",
          md: md`Which system the cleaning arm served, which rows or sections were affected, the exact start and end dates, whether manual cleaning continued anywhere, and whether data from the period exist at useful resolution are not confirmed in our sources. The RSER 2020 paper reports monthly water cleaning at the PV plant; how that fits with an automated arm must be clarified. Every number in this lesson is illustrative.`,
        },
        { kind: "xref", to: "mz04-l05", note: "The cleaning-arm failure as a cost and common-mode failure case, and the data request to KISR, are covered there; this lesson is about the study design." },
        {
          kind: "md",
          md: md`### Why an outage is an experiment

During normal operation every cleaning cuts the soiling curve short, so the plant never shows what it would do without cleaning. A soiling method's hardest job (estimating a rate and a level that are never observed directly) is therefore untestable on normal data. An outage changes that: for its duration, the affected section follows the uncleaned trajectory, including storms, dew and any natural cleaning by rain or wind.

The design is strong when the event is **as good as random with respect to the outcome**: a mechanical failure is not caused by the soiling rate or the weather that month. It is weak when the records are uncertain (dates, extent, manual cleaning) or when other things changed at the same time.

### Difference-in-differences

If part of the plant kept being cleaned (or another comparable plant nearby was), you have a **control group**. Compare the change in the treated section with the change in the control over the same periods:`,
        },
        { kind: "equation", formula: "mz10-did" },
        {
          kind: "md",
          md: md`Write the treated outcome as baseline plus common shock plus treatment effect: $Y_T = a_T + s_t + \tau$, and the control as $Y_C = a_C + s_t$. Differencing over time removes the fixed level differences $a_T, a_C$ (different module technology, string lengths, a dirty pyranometer's constant offset); differencing across groups removes the common shock $s_t$ (season, temperature, dust events, curtailment policy). What remains is $\tau$.

The price is one assumption, **parallel trends**: without the outage, the treated section would have changed like the control. You cannot prove it for the outage period, but you can check it on the pre-period. If the two series drift apart before the event, the design is in trouble.

### The outcome variable

Use the **temperature-corrected performance ratio** (IEC 61724 basis, NREL weather-corrected PR) at daily resolution, filtered for valid irradiance and availability. Raw energy would carry the irradiance variation straight into the comparison; uncorrected PR would carry the seasonal temperature swing, which in Kuwait is large.`,
        },
        { kind: "xref", to: "mz02-l02", note: "Performance ratio and temperature correction, the outcome variable used here." },
        {
          kind: "chart",
          chart: "line",
          title: "Illustrative monthly temperature-corrected PR: section without cleaning versus control",
          xKey: "month",
          xLabel: "Month",
          yLabel: "Temperature-corrected PR",
          series: [
            { key: "control", label: "Control section (cleaned monthly)" },
            { key: "treated", label: "Treated section (cleaning outage months 5 to 9)" },
          ],
          data: [
            { month: 1, control: 0.81, treated: 0.8 },
            { month: 2, control: 0.8, treated: 0.79 },
            { month: 3, control: 0.81, treated: 0.8 },
            { month: 4, control: 0.8, treated: 0.79 },
            { month: 5, control: 0.79, treated: 0.76 },
            { month: 6, control: 0.78, treated: 0.73 },
            { month: 7, control: 0.78, treated: 0.71 },
            { month: 8, control: 0.77, treated: 0.69 },
            { month: 9, control: 0.78, treated: 0.7 },
            { month: 10, control: 0.79, treated: 0.79 },
            { month: 11, control: 0.8, treated: 0.79 },
            { month: 12, control: 0.8, treated: 0.79 },
          ],
          caption: "Illustrative, not Shagaya data. Pre-period trends are parallel (constant gap of 0.01). The control also dips in summer (heat, dust events), which is the common shock DiD removes. Month 9 shows a small natural recovery in the treated section.",
        },
        {
          kind: "md",
          md: md`### Confounders at a desert PV plant

| Confounder | How it biases the comparison | Handling |
|---|---|---|
| **Weather and dust storms** | Move both sections; a storm can soil both instantly | Removed by the control if both see the same weather; check storm days separately |
| **Curtailment and grid outages** | Lower output unrelated to soiling; can hit one section | Filter flagged periods; use availability-corrected PR |
| **Inverter or string outages** | One section loses output | Exclude from both groups for the same days, or model at string level |
| **Degradation** | Slow decline (order 0.5 to 1% per year), different for thin film and poly-Si | Small over months, but matters for long pre and post windows; estimate from pre-period trend |
| **Sensor soiling and drift** | A dirty pyranometer lowers measured irradiance, so PR reads high and soiling looks smaller | Shared sensor cancels in DiD differences, not in levels; check against clear-sky or satellite irradiance |
| **Different technology per section** | Thin film and poly-Si respond differently to temperature and spectrum | Fixed differences cancel; seasonal differences do not, so prefer same-technology controls |
| **Concurrent changes** | Repairs, new cleaning contractor, firmware updates in the same months | Ask for the maintenance log; exclude or model |

### Validating the method, not just measuring the outage

DiD tells you how much the outage cost in PR. The validation question is different: **does Mizan's method, run blind, recover what happened?** Concretely, with the outage dates hidden from the method:

1. It should **not** detect cleaning events in the treated section during the outage, and it should detect the cleaning when service resumed.
2. Its soiling-rate estimate for the treated section during the outage should match the rate implied by the treated-minus-control gap growth, within stated uncertainty.
3. Its estimated soiling loss over the outage should match the DiD estimate, within the combined uncertainty.

Blinding matters: if the developers know the dates, cleaning detection can be tuned to them.`,
        },
        {
          kind: "feynman",
          prompt: "Explain to a KISR researcher who is sceptical of startups why difference-in-differences, applied to the cleaning-outage period, gives a better estimate of the soiling effect than simply comparing the affected section's PR before and during the outage.",
          keyPoints: [
            "A before and after comparison mixes the soiling effect with everything else that changed (season, temperature, dust events, curtailment)",
            "The control section experiences the same common shocks, so subtracting its change removes them",
            "Fixed differences between sections (technology, sensor offsets) cancel when differencing over time",
            "The estimate rests on parallel trends, which is checked on the pre-period",
            "Remaining threats: section-specific events, different seasonal responses of technologies, uncertain outage records",
          ],
        },
      ],
    },
    {
      layer: "applied",
      title: "Worked: a difference-in-differences estimate and a blind check",
      blocks: [
        {
          kind: "worked",
          title: "DiD on the illustrative series",
          mode: "worked",
          given: md`Illustrative monthly temperature-corrected PR from the chart. Pre-period months 1 to 4, outage months 5 to 9.`,
          steps: [
            { md: md`**Treated means.** Pre: $(0.80 + 0.79 + 0.80 + 0.79)/4 = 0.795$. Outage: $(0.76 + 0.73 + 0.71 + 0.69 + 0.70)/5 = 3.59/5 = 0.718$. Change $= -0.077$.` },
            { md: md`**Control means.** Pre: $(0.81 + 0.80 + 0.81 + 0.80)/4 = 0.805$. Outage: $(0.79 + 0.78 + 0.78 + 0.77 + 0.78)/5 = 3.90/5 = 0.780$. Change $= -0.025$.` },
            { md: md`**DiD.** $-0.077 - (-0.025) = -0.052$: the outage cost about 5.2 PR points on average over five months, or $0.052/0.795 = 6.5\%$ of the treated section's pre-period PR.` },
            { md: md`**What the naive comparison would say.** Before and after on the treated section alone: $-0.077$, so 7.7 PR points. The extra 2.5 points are summer heat and dust that also hit the control. Attributing them to missing cleaning would overstate the value of cleaning by about half.` },
            { md: md`**Parallel trends check.** Pre-period gap (control minus treated): $0.01, 0.01, 0.01, 0.01$. Flat, so the assumption is plausible. A gap that widened before month 5 would point to a section-specific problem.` },
            { md: md`**Blind method check.** Suppose the method, run without the dates, estimates a soiling loss of 4.6 PR points over months 5 to 9 with a 95% interval of 3.4 to 5.8. The DiD estimate of 5.2 lies inside it: consistent. Had the method reported 2.0 to 3.0, the study would show it underestimates uncleaned soiling.` },
          ],
          result: md`DiD effect $-0.052$ PR (about 6.5% relative) versus $-0.077$ naive. The method's blind estimate is consistent with the DiD estimate in this illustration. The claim this supports is narrow: at this plant, over this outage, the method recovered the uncleaned soiling loss within its stated uncertainty.`,
        },
        {
          kind: "question",
          question: {
            id: "mz10-l02-p1",
            type: "numeric",
            prompt: md`Illustrative. Treated section PR: pre 0.82, during outage 0.74. Control: pre 0.83, during 0.80. What is the DiD estimate in PR points (enter as a negative number, e.g. -3 for minus 3 points)?`,
            answer: -5,
            tolerance: { abs: 0.1 },
            unit: "PR points",
            explanation: md`$(0.74 - 0.82) - (0.80 - 0.83) = -0.08 + 0.03 = -0.05$, i.e. minus 5 PR points.`,
            concepts: ["mz10.did"],
            difficulty: 1,
          },
        },
        { kind: "widget", widget: "pr-correction", caption: "See how uncorrected PR swings with the seasons in a desert plant, and why the temperature-corrected PR is the outcome to use in a DiD comparison." },
      ],
    },
    {
      layer: "field",
      title: "Running the natural-experiment analysis with the partner",
      blocks: [
        {
          kind: "md",
          md: md`### Data you need, and from whom

- **Event records**: maintenance log for the cleaning system, cleaning dates per section before, during and after the outage, any manual cleaning. From KISR, and possibly from the plant owner: after completion, ownership of Shagaya Phase I was reported as transferred to MEW (now MEWRE), so access may need the owner's approval as well (to confirm).
- **Performance data**: inverter or string power, availability and curtailment flags, at 15-minute or better resolution.
- **Weather**: plane-of-array irradiance, module temperature, ambient temperature, wind, rain; ideally an independent irradiance source (satellite) to check pyranometer soiling.
- **Configuration**: which strings belong to which section, technology, tilt.

### What you can and cannot claim

| You can claim (if the data support it) | You cannot claim |
|---|---|
| "At Shagaya Phase I, during the outage, the method's blind estimate of soiling loss agreed with a difference-in-differences estimate within X PR points." | "The method is accurate" (one plant, one period) |
| "The uncleaned soiling rate during the outage was Y %/day (95% CI ...), under the parallel-trends assumption checked on the pre-period." | "Mizan's schedule would have saved Z" (that is a decision claim, not tested here) |
| "Cleaning-event detection identified the resumption of cleaning within N days." | "Validated by KISR" (unless KISR has formally said so, in those words, in writing) |
| "Results are consistent with ..." | "Proves" or any causal claim beyond the design |`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong with natural experiments",
          md: md`**Garden of forking paths**: trying many control groups, windows and filters and reporting the one that works. Fix them in the analysis plan. **Uncertain dates**: a month of error in the outage start smears the effect; run a sensitivity analysis on the dates. **No real control**: if the whole plant stopped being cleaned, there is no control group and you fall back to an interrupted time series (before and after with a trend model), which is weaker and should be described as such. **Survivor data**: periods with missing data are often the most interesting (storms, failures); report how much was excluded and why.`,
        },
        {
          kind: "checklist",
          title: "Natural-experiment analysis checklist",
          items: [
            "Outage extent, dates and any manual cleaning confirmed in writing from records",
            "Control group defined before looking at outcomes (same technology if possible)",
            "Pre-period parallel trends checked and plotted",
            "Curtailment, outages and invalid irradiance filtered identically for both groups",
            "Pyranometer soiling checked against an independent irradiance source",
            "Method run blind to the outage dates, with outputs logged before unblinding",
            "Sensitivity analysis on dates, filters and control choice reported",
            "Claims written in the scoped form above",
          ],
        },
        {
          kind: "question",
          question: {
            id: "mz10-l02-p2",
            type: "short",
            prompt: md`Write the **design and limitations paragraph** (about 200 words) for the natural-experiment part of the Shagaya study plan. Name the treated and control groups (conditionally, since the extent is unconfirmed), the outcome variable, the estimator and its assumption, how the method is blinded, the main confounders and how they are handled, and one sentence of claim scope.`,
            rubric: [
              "Treated and control groups defined conditionally on confirmation of the outage extent from KISR records",
              "Outcome is temperature-corrected PR (IEC 61724 basis) with filters for curtailment, outages and invalid irradiance",
              "DiD estimator with parallel trends stated and checked on the pre-period; fallback to interrupted time series if no control exists",
              "Method run blind to outage dates with outputs logged before unblinding",
              "At least three confounders with specific handling, including sensor soiling",
              "Claim scope limited to this plant and period; no savings or general-accuracy claim",
            ],
            modelAnswer: md`**Natural experiment (subject to confirmation of the outage records by KISR).** If the records confirm that cleaning stopped in part of Shagaya Phase I PV between the confirmed dates while the remainder continued to be cleaned, the affected section is the treated group and a cleaned section of the same technology is the control. The outcome is the daily temperature-corrected PR (IEC 61724 basis, NREL weather correction), filtered for irradiance above the agreed threshold, curtailment, inverter and string outages, applied identically to both groups. The soiling effect is estimated by difference-in-differences against a pre-period of at least three months; parallel trends are checked by plotting the pre-period gap. If no comparable control exists, we will use an interrupted time series and state that it is weaker. The method is run without access to the outage dates and its outputs are lodged with KISR before unblinding. Confounders: dust storms and season (removed by the control; storm days reported separately), pyranometer soiling (checked against satellite irradiance), technology differences (same-technology control preferred), concurrent maintenance (from the log, excluded). Sensitivity to dates, filters and control choice will be reported. Any claim will be limited to agreement with the DiD estimate at this plant over this period.`,
            explanation: md`The paragraph must be conditional on KISR confirming the outage records, use a filtered temperature-corrected PR, state and check parallel trends, keep the method blind, handle named confounders and limit the claim to this plant and period.`,
            concepts: ["mz10.natural-experiment-design", "mz10.did", "mz10.confounder-control", "mz10.claim-scope"],
            difficulty: 3,
          },
        },
        { kind: "sources", refs: ["mz10-r1", "mz10-r3", "mz10-r5", "mz10-r4"] },
      ],
    },
  ],
  quiz: [
    {
      id: "mz10-l02-q1",
      type: "numeric",
      prompt: md`Treated PR: pre 0.78, post 0.72. Control PR: pre 0.80, post 0.79. DiD in PR points (negative number)?`,
      answer: -5,
      tolerance: { abs: 0.1 },
      unit: "PR points",
      explanation: md`$(0.72 - 0.78) - (0.79 - 0.80) = -0.06 + 0.01 = -0.05$.`,
      concepts: ["mz10.did"],
      difficulty: 1,
    },
    {
      id: "mz10-l02-q2",
      type: "mcq",
      prompt: md`In the pre-period, the gap between control and treated PR grows from 0.01 to 0.04 over four months. What does this imply?`,
      options: [
        "The soiling effect is larger than estimated",
        "Parallel trends is doubtful: something section-specific was already changing, so the DiD estimate may be biased",
        "Nothing, because DiD removes all differences between groups",
        "The control section is soiling faster",
      ],
      answer: 1,
      explanation: md`DiD removes fixed differences and common shocks, not a diverging trend. A pre-period divergence points to a section-specific issue (degradation, a failing inverter, a sensor) that would contaminate the estimate.`,
      concepts: ["mz10.parallel-trends"],
      difficulty: 2,
    },
    {
      id: "mz10-l02-q3",
      type: "multi",
      prompt: md`Which of these does a shared control section remove from a DiD estimate? (select all)`,
      options: [
        "A dust storm that hits the whole plant",
        "Seasonal temperature change",
        "A constant calibration offset on the shared pyranometer",
        "An inverter failure in the treated section only",
      ],
      answer: [0, 1, 2],
      explanation: md`Common shocks and constant offsets cancel. A treated-only event does not: it must be filtered or modelled.`,
      concepts: ["mz10.did", "mz10.confounder-control"],
      difficulty: 2,
    },
    {
      id: "mz10-l02-q4",
      type: "mcq",
      prompt: md`Why should the method be run blind to the outage dates?`,
      options: [
        "Because KISR requires it by law",
        "So that cleaning-event detection and rate estimation cannot be tuned, consciously or not, to the known answer",
        "Because the dates are confidential",
        "To make the computation faster",
      ],
      answer: 1,
      explanation: md`Knowing the dates lets developers adjust thresholds until detection matches them. Logging blind outputs before unblinding makes the test credible.`,
      concepts: ["mz10.natural-experiment-design"],
      difficulty: 1,
    },
    {
      id: "mz10-l02-q5",
      type: "decision",
      prompt: md`The analysis shows the method's blind soiling-loss estimate agrees with the DiD estimate. A board member wants the next deck to say "KISR-validated technology that cuts cleaning costs". What do you propose?`,
      options: [
        { text: "Say: \"In a study with KISR researchers at Shagaya Phase I, our method's blind estimate of soiling loss during a cleaning outage agreed with an independent estimate within X PR points\", and only after KISR has approved the wording.", score: 1, feedback: "Specific, scoped, attributed with consent, and silent on cost savings that were not tested." },
        { text: "Use the board member's wording, since the result was positive.", score: 0, feedback: "\"KISR-validated\" implies an endorsement KISR has not given, and cost savings were not tested. This can damage the partnership and the company's credibility." },
        { text: "Say nothing until the paper is published.", score: 0.5, feedback: "Safe, but you can describe the study and its result accurately with the partner's consent before publication, as long as the journal's policy and the agreement allow it." },
      ],
      explanation: md`A natural experiment supports a measurement claim at one plant and period, not a cost claim or an institutional endorsement.`,
      concepts: ["mz10.claim-scope"],
      difficulty: 2,
    },
    {
      id: "mz10-l02-q6",
      type: "mcq",
      prompt: md`If the plant pyranometer is soiled, how does a basic PR computed from it behave?`,
      options: [
        "PR reads low, so soiling looks larger",
        "PR reads high, so soiling looks smaller",
        "PR is unaffected",
        "PR becomes negative",
      ],
      answer: 1,
      explanation: md`PR is measured energy over expected energy from measured irradiance. A dirty pyranometer under-reads irradiance, so the denominator is too small and PR too high. Check irradiance against an independent source.`,
      concepts: ["mz10.confounder-control"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz10-l02-f1", front: "Why is a cleaning outage valuable for validation?", back: "It reveals the uncleaned soiling trajectory, never observed in normal operation, as a known counterfactual.", concepts: ["mz10.natural-experiment-design"] },
    { id: "mz10-l02-f2", front: "DiD formula", back: "(Treated post - treated pre) - (control post - control pre). Removes fixed differences and common shocks.", concepts: ["mz10.did"] },
    { id: "mz10-l02-f3", front: "Parallel-trends assumption", back: "Without treatment both groups would have changed equally. Checked on the pre-period, never proved.", concepts: ["mz10.parallel-trends"] },
    { id: "mz10-l02-f4", front: "Dirty pyranometer effect on PR", back: "Irradiance under-read, PR too high, soiling looks smaller. Cancels in DiD differences if shared, not in levels.", concepts: ["mz10.confounder-control"] },
    { id: "mz10-l02-f5", front: "No control group available?", back: "Fall back to an interrupted time series (before and after with a trend model) and say it is weaker.", concepts: ["mz10.natural-experiment-design"] },
    { id: "mz10-l02-f6", front: "Scoped claim from the outage study", back: "At this plant, over this outage, the blind method agreed with the DiD estimate within X. No savings, no general accuracy, no endorsement.", concepts: ["mz10.claim-scope"] },
  ],
};

export default lesson;
