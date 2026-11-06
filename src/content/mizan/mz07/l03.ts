import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz07-l03",
  title: "Curtailment, availability and how they confound soiling analytics",
  summary:
    "Why a soiling model fed raw plant data will report curtailment, inverter outages and grid-driven limits as dirt, how big the error gets, and the filtering rules and data request that prevent it. Also the commercial twist: the reference inverters that estimate deemed energy for curtailment payments are themselves soiled, so soiling analytics move PPA money.",
  minutes: 55,
  objectives: [
    "You can explain how curtailment and unavailability bias a performance-ratio-based soiling estimate, with numbers.",
    "You can specify the data and the filters needed to separate soiling from grid and availability effects.",
    "You can compute available power and curtailed energy from reference inverters, and the error a soiling bias introduces.",
    "You can explain why availability guarantees do not capture soiling and where soiling sits contractually.",
  ],
  concepts: [
    {
      id: "mz07.confounders",
      name: "Grid and availability confounders",
      description: "Curtailment, inverter or block outages, MVA limits and frequency response all reduce output below what irradiance supports. Unfiltered, they inflate apparent soiling rates and create false cleaning steps when they end.",
      competency: "mz-data",
      related: ["mz02.data-filters", "mz02.weather-corrected-pr", "m06.curtailment"],
    },
    {
      id: "mz07.curtailment-flag",
      name: "Curtailment flag",
      description: "An interval is curtailed when the PPC set-point is below available power (or the control centre instruction log says so). The flag must come from plant data, not inferred from output shape alone.",
      competency: "mz-data",
      related: ["mz07.confounders", "m06.curtailment"],
    },
    {
      id: "mz07.reference-soiling-bias",
      name: "Soiling bias in deemed energy",
      description: "Available power estimated from reference inverters or irradiance sensors is only as clean as they are. A few percent soiling difference between references and the fleet becomes a much larger percentage error in curtailed energy.",
      competency: "mz-data",
      related: ["m06.deemed-energy", "mz02.clean-reference"],
    },
    {
      id: "mz07.availability-vs-soiling",
      name: "Availability is not performance",
      description: "Time- or energy-based availability counts units out of service; a dirty unit is available. Soiling lives in the PR guarantee or in no guarantee at all.",
      competency: "mz-data",
      related: ["mz07.confounders"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Every grid effect looks like dirt until you filter it",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Mizan's first deliverable at Shagaya is a credible soiling estimate from operational data, reviewed by KISR researchers. The fastest way to lose that credibility is to report a soiling rate that is really curtailment or an inverter outage. And at the IPPs, the same filters decide deemed-energy payments, which gives you a commercial argument that has nothing to do with cleaning.`,
        },
        {
          kind: "xref",
          to: "m06-l04",
          note: "Track 0 classifies curtailment (grid constraint, system security, oversupply, grid unavailability, plant-caused) and explains deemed energy under a typical IPP PPA. This lesson is about what those events do to data.",
        },
        {
          kind: "xref",
          to: "mz02-l04",
          note: "Data filters, detection limits and uncertainty for soiling estimates are taught in mz02. Here we add the grid and availability filters.",
        },
        {
          kind: "md",
          md: md`### A simple model of what the meter sees

Write the observed performance ratio as a product of the effects that push it down:`,
        },
        { kind: "equation", formula: "mz07-pr-confounded" },
        {
          kind: "md",
          md: md`Only $SR$ is soiling. Curtailment ($c$) and availability ($A_E$) enter the same way, so a model that fits a declining trend to $PR_{\text{obs}}$ attributes all of them to soiling. Worse, when curtailment ends, $PR_{\text{obs}}$ jumps up, which looks like a **cleaning event or a rain wash**. Soiling algorithms that detect recoveries (for example the stochastic rate and recovery method in NREL's RdTools) then reset the soiling state at the wrong time.

The confounders, ranked by how badly they fool a soiling model:

| Effect | Shape in daily PR | Why it fools the model | Filter |
|---|---|---|---|
| **Curtailment** to a set-point | Days or hours of low PR, then a step back up | Step up looks like cleaning; low PR looks like heavy soiling | Exclude intervals where set-point < available power or instruction log is active |
| **Inverter or block outage** | Low PR proportional to the share of capacity out | Multi-day outages look like slow soiling | Use per-inverter normalisation, or exclude intervals with any unit unavailable |
| **MVA / reactive limit** | Flat tops on hot, high-Q hours | Correlates with season, so blends into temperature and soiling | Exclude intervals with inverter limit flags |
| **Clipping** (DC/AC ratio) | Flat tops at high irradiance | Hides soiling: a dirty, oversized array still clips | Exclude clipped intervals (see the dc-ac-ratio widget) |
| **Frequency response, grid events** | Short dips, plant-wide and simultaneous | Rarely matters daily, but pollutes hourly analysis | Exclude flagged events |
| **Cleaning-system failure** | Steady decline with no recovery | Real soiling, but the cause matters for validation | Keep; log it (Shagaya 2018 to 2019 is the natural experiment) |`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "Illustrative: true soiling vs what an unfiltered PR series shows",
          xKey: "day",
          xLabel: "Days since cleaning",
          yLabel: "PR",
          series: [
            { key: "trueSR", label: "Clean PR x soiling ratio (truth)" },
            { key: "observed", label: "Observed PR (unfiltered)" },
          ],
          data: [
            { day: 1, trueSR: 0.797, observed: 0.797 },
            { day: 2, trueSR: 0.794, observed: 0.794 },
            { day: 3, trueSR: 0.79, observed: 0.79 },
            { day: 4, trueSR: 0.787, observed: 0.787 },
            { day: 5, trueSR: 0.784, observed: 0.784 },
            { day: 6, trueSR: 0.781, observed: 0.781 },
            { day: 7, trueSR: 0.778, observed: 0.778 },
            { day: 8, trueSR: 0.774, observed: 0.697 },
            { day: 9, trueSR: 0.771, observed: 0.694 },
            { day: 10, trueSR: 0.768, observed: 0.691 },
            { day: 11, trueSR: 0.765, observed: 0.765 },
            { day: 12, trueSR: 0.762, observed: 0.724 },
            { day: 13, trueSR: 0.758, observed: 0.758 },
            { day: 14, trueSR: 0.755, observed: 0.755 },
          ],
          caption: "Clean PR 0.80, true soiling 0.4 %/day. Days 8 to 10: 10 % of energy curtailed. Day 11: curtailment ends, a false 'cleaning' step. Day 12: 5 % of inverters out. Illustrative numbers.",
        },
        {
          kind: "md",
          md: md`### Available power, curtailed energy and the deemed-energy twist

To flag and quantify curtailment you need **available power**, what the plant could have produced. One common PPA method uses unconstrained reference inverters:`,
        },
        { kind: "equation", formula: "mz07-available-power" },
        { kind: "equation", formula: "mz07-curtailed-energy" },
        {
          kind: "md",
          md: md`Here is the twist a seller can use. If the reference inverters are dirtier than the fleet (cleaned less often, or in a dustier corner), $P_{\text{avail}}$ is underestimated and the IPP is **underpaid** for curtailment. If they are cleaner (cleaned just before), the offtaker overpays. Because curtailed energy is a small difference between two large numbers, a few percent of soiling bias becomes a much larger percentage error in deemed energy (worked below). Soiling analytics are therefore not only an O&M tool: they are an input to **PPA settlement**, which interests both MEWRE as offtaker and the IPP.

### Availability does not capture soiling`,
        },
        { kind: "equation", formula: "mz07-availability" },
        {
          kind: "md",
          md: md`O&M contracts in the region commonly guarantee availability (often time-based, sometimes energy-based) and sometimes a PR. A dirty inverter is **available**. So unless the O&M contract carries a PR guarantee with a soiling allowance, the O&M contractor's incentive on cleaning is weak; mz04-l02 calls this the incentive gap. That is a contract fact to discover at each plant, not to assume.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Kuwaiti contract terms",
          md: md`The curtailment categories, allowance and deemed-energy method in Kuwait's IPP PPAs are not public (Track 0 m06-l04). Whether Zone 1's PPA or O&M contract uses reference inverters, irradiance-based models or both is unknown. Shagaya Phase I's O&M guarantees are also unknown. The mechanisms here are typical international practice (World Bank PPP Legal Resource Center), not confirmed Kuwaiti terms.`,
        },
        { kind: "sources", refs: ["mz07-r12", "mz07-r13", "mz07-r14", "mz07-r18", "mz07-r10"] },
      ],
    },
    {
      layer: "applied",
      title: "How wrong it gets, in numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "An apparent soiling rate inflated by curtailment",
          given: md`From the chart: clean PR $PR_0 = 0.80$, true soiling 0.4 %/day from a cleaning on day 0. On days 8 to 10, 10 % of available energy is curtailed ($c = 0.10$). An analyst estimates the soiling rate from the drop in daily PR between day 1 and day 10 without filtering.`,
          steps: [
            { md: md`Day 1 observed: $0.80 \times (1 - 0.004) = 0.7968$.` },
            { md: md`Day 10 true: $0.80 \times (1 - 0.040) = 0.768$; observed with curtailment: $0.768 \times 0.90 = 0.6912$.` },
            { md: md`Apparent rate: $\dfrac{0.7968 - 0.6912}{0.80 \times 9\ \text{days}} = 0.0147$ per day, i.e. **1.47 %/day**.` },
            { md: md`That is 3.7 times the true 0.4 %/day. Fed to a cleaning optimiser, the interval shrinks by about $\sqrt{3.7} \approx 1.9$ (square-root rule, mz04-l01): the plant cleans nearly twice as often as it should.` },
            { md: md`Filtered (days 8 to 10 excluded, fit days 1 to 7 and 11 to 14), the slope returns to 0.4 %/day, and day 12 is excluded or normalised for the 5 % of inverters out.` },
          ],
          result: md`Three days of 10 % curtailment turn 0.4 %/day into an apparent 1.47 %/day. Filters are not a refinement; they decide whether the recommendation is right.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Deemed energy with dirty reference inverters",
          given: md`Illustrative: a plant of 50 identical inverters is curtailed to 120 MW for one hour. Four unconstrained reference inverters average 2.9 MW each in that hour. The fleet was cleaned last week; the references were not, and are 3 % more soiled than the fleet average.`,
          steps: [
            { md: md`Available power as measured: $P_{\text{avail}} = 50 \times 2.9 = 145$ MW.` },
            { md: md`Curtailed energy as settled: $(145 - 120) \times 1\ \text{h} = 25$ MWh.` },
            {
              md: md`Correcting for the references' extra soiling: true $P_{\text{avail}} = 145 / 0.97 = 149.5$ MW, so true curtailed energy $= 149.5 - 120 = 29.5$ MWh.`,
              hidden: true,
              check: { prompt: "True curtailed energy in that hour", answer: 29.5, unit: "MWh", tolerance: { abs: 0.2 } },
            },
            {
              md: md`Underpayment: $29.5 - 25 = 4.5$ MWh, i.e. $4.5 / 29.5 = 15\%$ of the true curtailed energy.`,
              hidden: true,
              check: { prompt: "Settlement error as a percentage of true curtailed energy", answer: 15.2, unit: "%", tolerance: { abs: 0.5 } },
            },
          ],
          result: md`A 3 % soiling difference becomes a 15 % error in deemed energy, because curtailed energy is a small difference of large numbers. Whoever settles curtailment (offtaker and IPP) has a reason to want soiling measured on the references.`,
        },
      ],
    },
    {
      layer: "field",
      title: "The data request and filter specification",
      blocks: [
        {
          kind: "md",
          md: md`**The data Mizan must request** (with resolution, ideally 1 to 5 minutes; 15 minutes at worst):
- POI revenue meter export (the truth for energy) and inverter AC power.
- PPC: active-power set-point, available-power estimate (if computed), mode, ramp limit active, Q and voltage-control mode.
- Inverter status and alarm codes, apparent-power limit flags, derating flags.
- Control centre instruction log with cause codes (Track 0 m06-l04 recommends logging these electronically).
- Irradiance (POA and GHI), module and ambient temperature, wind, soiling station if any (mz02-l03).
- Cleaning logs: date, blocks cleaned, method; cleaning-system faults.
- Tracker positions and stow events (stow reduces POA, and stow intervals must be excluded or modelled).

**At Shagaya Phase I**, ask KISR what of this survives from 2017 onwards, especially for the 2018 to 2019 cleaning-arm failure period: without availability and outage records, that natural experiment is ambiguous.`,
        },
        {
          kind: "checklist",
          title: "Filter specification before fitting soiling",
          items: [
            "Exclude intervals where PPC set-point < available power, or a control-centre instruction is active.",
            "Exclude or normalise intervals with any inverter unavailable (per-inverter PR is better than plant PR).",
            "Exclude inverter apparent-power-limited, derated and clipped intervals.",
            "Exclude stow and tracker-fault intervals, and grid events (FRT, frequency response).",
            "Apply the irradiance, temperature and stability filters from mz02 (for example POA above a threshold, stable sky).",
            "Report how many intervals each filter removed; if a filter removes most of a season, say so.",
          ],
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`1. Inferring curtailment from flat output alone: clipping and MVA limits look the same. 2. Accepting 15-minute plant totals with no inverter detail: outages vanish into soiling. 3. Treating the end of curtailment as a cleaning event. 4. Calibrating a soiling model on months that turn out to include a grid-constraint period. 5. Promising a soiling estimate before seeing the outage and set-point data.`,
        },
        {
          kind: "feynman",
          prompt: "Explain to a KISR researcher why Mizan will not fit a soiling rate to plant-level daily PR until it has PPC set-points and inverter status, using the curtailment example.",
          keyPoints: [
            "Curtailment, outages and MVA limits lower PR like soiling does.",
            "When curtailment ends, PR jumps up, which looks like a cleaning or rain recovery.",
            "Three days of 10 % curtailment inflated 0.4 %/day to about 1.47 %/day in the example.",
            "Flags must come from plant data (set-point vs available power, status codes), not output shape.",
            "Per-inverter normalisation separates outages from soiling.",
          ],
        },
        {
          kind: "question",
          question: {
            id: "mz07-l03-p1",
            type: "short",
            explanation: md`Graded against the rubric. A good specification asks for the signals that flag curtailment and outages directly, states each filter, and plans for incomplete records in the 2018 to 2019 period.`,
            prompt: md`Draft the **data request and filter specification** (bullet list, about 150 to 250 words) that Mizan sends KISR for the Shagaya Phase I PV soiling pilot. It should let the pilot separate soiling from curtailment, outages and other grid effects, including for the 2018 to 2019 cleaning-arm failure period.`,
            rubric: [
              "Requests POI meter and inverter-level power, inverter status/alarm codes and derating or limit flags, with a stated resolution.",
              "Requests curtailment evidence: set-points or control-centre instructions with timestamps and causes.",
              "Requests irradiance, temperature and cleaning logs including the cleaning-arm failure dates.",
              "Specifies filters: curtailed, unavailable, limited, clipped, stow and grid-event intervals excluded or normalised before fitting soiling.",
              "Requires reporting of the share of data removed by each filter and a fallback if records for the failure period are incomplete.",
              "Ties the method to temperature-corrected PR (IEC 61724, NREL weather-corrected PR) as baseline.",
            ],
            modelAnswer: md`Data request (2017 to present, 1 to 5 minute resolution where available, 15 minutes minimum):
- POI export meter and per-inverter AC power and energy.
- Inverter status and alarm codes, derating and apparent-power limit flags.
- Any active-power set-points or MEWRE control-centre instructions, with start/end time and cause; any known grid outages.
- POA and GHI irradiance, module back-of-module and ambient temperature, wind speed; sensor cleaning and calibration records.
- Cleaning logs (date, rows, method) and the exact dates and scope of the 2018 to 2019 cleaning-arm failure and any manual cleaning in that period.
Filters before fitting soiling:
- Exclude intervals with set-point below available power or an active instruction.
- Normalise per inverter; exclude intervals with an inverter unavailable or limited.
- Exclude clipped, low-irradiance and unstable-sky intervals (mz02 thresholds) and grid events.
- Baseline: temperature-corrected PR to IEC 61724 (NREL weather-corrected PR).
Reporting: share of intervals removed by each filter, by month. If set-point records are missing for the failure period, we will flag curtailment only with corroborating evidence (meter vs inverter sums, outage notes) and report the result with wider uncertainty.`,
            concepts: ["mz07.confounders", "mz07.curtailment-flag", "mz07.availability-vs-soiling"],
            difficulty: 2,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz07-l03-q1",
      type: "mcq",
      prompt: md`Curtailment ends and daily PR jumps up. What will a recovery-detecting soiling algorithm do if curtailment was not filtered?`,
      options: ["Nothing", "Treat it as a cleaning or rain recovery and reset the soiling state", "Increase the temperature coefficient", "Flag a sensor fault"],
      answer: 1,
      explanation: md`The step looks exactly like a cleaning event. The soiling state is reset at the wrong time and the rate estimate is distorted.`,
      concepts: ["mz07.confounders"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz07-l03-q2",
      type: "numeric",
      prompt: md`Clean PR 0.80, true soiling 0.5 %/day from day 0. On day 8, 12 % of energy is curtailed. What is the observed PR on day 8 (three decimals)?`,
      answer: 0.676,
      tolerance: { abs: 0.002 },
      explanation: md`$0.80 \times (1 - 0.04) \times 0.88 = 0.80 \times 0.96 \times 0.88 = 0.676$.`,
      concepts: ["mz07.confounders"],
      difficulty: 2,
    },
    {
      id: "mz07-l03-q3",
      type: "numeric",
      prompt: md`A plant of 40 identical inverters is curtailed to 80 MW for 2 hours. Three unconstrained reference inverters average 2.5 MW. What curtailed energy is settled, in MWh?`,
      answer: 40,
      tolerance: { rel: 0.01 },
      unit: "MWh",
      explanation: md`$P_{\text{avail}} = 40 \times 2.5 = 100$ MW; $(100 - 80) \times 2 = 40$ MWh.`,
      concepts: ["mz07.curtailment-flag", "mz07.reference-soiling-bias"],
      difficulty: 1,
    },
    {
      id: "mz07-l03-q4",
      type: "mcq",
      prompt: md`An O&M contract guarantees 99 % time-based availability. What does that guarantee say about soiling?`,
      options: ["Soiling above 1 % is a breach", "Nothing: a dirty inverter is available", "Soiling is counted as unavailability", "It caps cleaning cost"],
      answer: 1,
      explanation: md`Availability counts units in service. Soiling sits in a PR guarantee, if there is one.`,
      concepts: ["mz07.availability-vs-soiling"],
      difficulty: 1,
    },
    {
      id: "mz07-l03-q5",
      type: "multi",
      prompt: md`Which signals are needed to flag curtailment reliably?`,
      options: ["PPC active-power set-point", "Available-power estimate or reference-inverter output", "Control-centre instruction log with cause codes", "Module colour"],
      answer: [0, 1, 2],
      explanation: md`Curtailment is set-point below available power, corroborated by the instruction log. Output shape alone confuses it with clipping.`,
      concepts: ["mz07.curtailment-flag"],
      difficulty: 1,
    },
    {
      id: "mz07-l03-q6",
      type: "decision",
      prompt: md`KISR can provide only 15-minute plant totals and irradiance for 2018 to 2019, no inverter data or set-points. What do you do?`,
      options: [
        { text: "Fit soiling to the totals and present the result as definitive.", score: 0, feedback: "Outages and curtailment will be inside the estimate." },
        { text: "Use the data, but corroborate with maintenance and outage notes, exclude suspect periods, and report the estimate with wider uncertainty and the filters' limits stated.", score: 1, feedback: "Honest and still useful; KISR reviewers will respect it." },
        { text: "Abandon the 2018 to 2019 natural experiment.", score: 0.3, feedback: "Too early: corroborating records may make it usable." },
        { text: "Assume no curtailment happened at Shagaya.", score: 0.1, feedback: "An assumption without evidence, in exactly the place a reviewer will look." },
      ],
      explanation: md`Use what exists, document limits, widen uncertainty.`,
      concepts: ["mz07.confounders", "mz07.curtailment-flag"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz07-l03-f1", front: "Observed PR model with confounders", back: "PR_obs = PR_0 x SR x (1 - c) x A_E. Only SR is soiling.", concepts: ["mz07.confounders"] },
    { id: "mz07-l03-f2", front: "Curtailment flag definition", back: "PPC set-point below available power, or an active control-centre instruction. Not inferred from output shape.", concepts: ["mz07.curtailment-flag"] },
    { id: "mz07-l03-f3", front: "Effect of 3 days of 10 % curtailment on a 0.4 %/day soiling estimate (illustrative)", back: "Apparent rate about 1.47 %/day, 3.7 times the truth.", concepts: ["mz07.confounders"] },
    { id: "mz07-l03-f4", front: "Why reference-inverter soiling matters commercially", back: "It biases available power and so deemed energy: 3 % soiling bias became a 15 % settlement error in the example.", concepts: ["mz07.reference-soiling-bias"] },
    { id: "mz07-l03-f5", front: "Does an availability guarantee cover soiling?", back: "No. A dirty unit is available; soiling sits in a PR guarantee or nowhere.", concepts: ["mz07.availability-vs-soiling"] },
    { id: "mz07-l03-f6", front: "Clipping vs curtailment in data", back: "Both are flat tops. Clipping happens at inverter AC limit at high irradiance; curtailment follows a set-point below available power.", concepts: ["mz07.curtailment-flag"] },
  ],
};

export default lesson;
