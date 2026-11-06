import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz02-l05",
  title: "Designing the measurement plan for a pilot site: Shagaya Phase I",
  summary:
    "Turning the previous four lessons into a measurement plan for the targeted soiling analytics pilot at Shagaya Phase I with KISR as methodology partner: what is known about the plant, what to ask for (historical data, logs), what to add (stations, sensors), where, for how long, how the 2018 to 2019 cleaning-arm failure can serve as a natural experiment, and what data access and agreements the plan depends on.",
  minutes: 85,
  objectives: [
    "Separate what is known about Shagaya Phase I PV from what must be confirmed, and write the plan's assumptions explicitly",
    "Specify the data inventory (historical and new), sampling, resolution and retention for a soiling pilot",
    "Justify the study duration from seasons, cleaning cycles and slope precision",
    "Use a natural experiment (an interruption in cleaning) to estimate soiling rates, separating background rate from storm steps",
    "List the data access, ownership and agreement questions that must be settled with KISR and MEWRE before measurement starts",
  ],
  concepts: [
    {
      id: "mz02.measurement-plan",
      name: "Measurement plan",
      description: "Document fixing objectives, hypotheses, metrics, instruments, positions, sampling, duration, data handling, QA and analysis methods before data is collected.",
      competency: "mz-validation",
      related: ["mz02.weather-corrected-pr", "mz02.soiling-ratio"],
    },
    {
      id: "mz02.data-inventory",
      name: "Data inventory",
      description: "List of every existing and new signal (tag, unit, resolution, period, owner, quality) plus logs (cleaning, maintenance, outages) the analysis needs.",
      competency: "mz-data",
      related: ["mz02.measurement-plan", "m12.monitoring-system"],
    },
    {
      id: "mz02.natural-experiment",
      name: "Natural experiment",
      description: "An unplanned change (such as a cleaning system failure) that creates a comparison a planned study could not ethically or economically create; here, long uncleaned intervals that reveal soiling rates.",
      competency: "mz-validation",
      related: ["mz02.soiling-rate"],
    },
    {
      id: "mz02.study-duration",
      name: "Study duration",
      description: "Long enough to cover every soiling regime (dew season, dust-storm season, summer heat) and enough cleaning cycles for precise rates: at least 12 months of new measurement.",
      competency: "mz-validation",
      related: ["mz02.detection-limit"],
    },
    {
      id: "mz02.data-access",
      name: "Data access and rights",
      description: "Who owns the plant data, who may share it, under what agreement, in what format and with what publication rights; the main schedule risk for a pilot with a public body.",
      competency: "mz-business",
      related: ["mz02.data-inventory"],
    },
  ],
  sections: [
    // ============================================================ THEORY
    {
      layer: "theory",
      title: "What is known and what the plan must establish",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`The Shagaya pilot is Mizan's live thread: targeted, in preparation, not signed. A measurement plan is what turns a friendly conversation with KISR researchers into a study both sides can commit to, and it is the document a reviewer, a funder or MEWRE will read to decide whether the results can be trusted. You will own it as the person who negotiates access and scope; your engineering partners will own the code. Getting the plan right before any sensor is ordered saves months.`,
        },
        {
          kind: "callout",
          tone: "kuwait",
          title: "What the sources say about Shagaya Phase I",
          md: md`- Shagaya Phase I is 70 MW: 50 MW parabolic-trough CSP with storage, 10 MW wind and 10 MW PV (reported as 11.15 MW in the 2020 paper). After completion KISR transferred ownership to the Ministry of Electricity and Water (now MEWRE); the venture context describes the site as operated by KISR.
- The PV plant has a **thin-film section and a poly-Si section**. Al-Rasheedi, Gueymard, Al-Khayat, Ismail, Lee and Al-Duaj (RSER 133, 2020, 110139) monitored it for 25 months: the two sections performed alike, soiling was substantial, the plant was **water-cleaned monthly**, and dust storms caused sudden drops of about **30 %**.
- KISR installed five radiometric stations in Kuwait in 2012 (EuroSun 2014).
- From the venture context: KISR confirmed there is **no standard method** for turning operational data into cleaning decisions; the agreed baseline is **temperature-corrected PR to IEC 61724**; a **cleaning-arm failure in 2018 to 2019** is a candidate natural experiment.
- **Not known** (confirm on the site visit and from KISR): mounting (fixed or tracking) and tilt, inverter count and layout, existing soiling or irradiance sensors and their condition, data resolution and retention, the dates and extent of the cleaning failure, and any 2022 to 2026 operational news (none found).`,
        },
        { kind: "sources", refs: ["mz02-rser-2020-shagaya", "mz02-eurosun-2014-kisr"] },
        {
          kind: "md",
          md: md`### The structure of a measurement plan

1. **Objectives and hypotheses**, written so they can fail. Example: "H1: the soiling ratio inferred from inverter-level corrected PR agrees with the station SR within ±1 point (k = 2) on 80 % of days." "H2: a condition-based cleaning rule would have recovered more energy per cleaning pass than the monthly schedule over the study period."
2. **Metrics and definitions**: soiling ratio (lesson 1), corrected PR (lesson 2), cleaning value; each with its formula and frozen parameters.
3. **Data inventory**: existing signals and logs, new instruments, resolution, owner.
4. **Instruments and positions** (lesson 3), per technology section.
5. **Duration and schedule**, justified (below).
6. **Data handling**: collection, clock synchronisation, storage, retention, access, versioned code.
7. **Quality assurance and filters** (lesson 4), frozen before results.
8. **Analysis plan**, including how the natural experiment is analysed and how disagreements between methods are resolved.
9. **Governance**: roles, data agreement, publication rights, review points.

### What to measure and at what resolution

| Group | Signals | Resolution | Source |
|---|---|---|---|
| Energy | Revenue meter export; inverter AC energy and power per section; DC current and voltage per inverter or combiner if available | 1 to 15 min | Existing SCADA (to confirm) |
| Irradiance | POA per section (pyranometer and/or matched reference cell), GHI and DHI; sensor cleaning log | 1 min | Existing plus KISR radiometric data |
| Temperature and weather | Back-of-module temperature per section, ambient, wind speed and direction, relative humidity (dew), rainfall | 1 min | Existing met station plus additions |
| Soiling | Reference-device station per section (Isc and Pmax); optical sensors at contrasting positions | 1 min | New |
| Events and operations | Cleaning log (date, block, method), outages, curtailment, alarms, maintenance, sensor calibrations | Event timestamps | O&M records |
| Context | Dust-storm days, visibility, aerosol optical depth (for example the AERONET Kuwait University site), reanalysis PM | Daily or hourly | Public datasets |

Humidity and module temperature matter beyond PR: dew on the glass drives cementation in the Gulf, so a pilot that wants to explain winter soiling should log relative humidity and glass temperature (to estimate dew), not only dust.

### How long?

- **Seasons**: Gulf soiling has distinct regimes (dew-assisted winter soiling, spring and summer dust storms, summer heat). Twelve months of new measurement is the minimum to see each once.
- **Cycles**: with monthly cleaning there are about 12 intervals a year. Each 30-day interval gives a rate to about ±0.04 %/day (lesson 4), so a seasonal mean from three intervals is well determined; storm-interrupted intervals give less.
- **History first**: the existing data (the 25 months covered by the paper, the 2018 to 2019 failure period and later years if retained) can be analysed in the first months, before new sensors produce a full year. It tests the plant-data method against known events and gives early results.`,
        },
        { kind: "equation", formula: "mz02-background-rate" },
        {
          kind: "flow",
          title: "Pilot phases (illustrative timeline)",
          steps: [
            { label: "0. Agreement", detail: "Scope, data-sharing and publication terms with KISR; MEWRE consent if required" },
            { label: "1. Data audit", detail: "Inventory, quality check and clock check of historical data and logs (about 1 to 2 months)" },
            { label: "2. Back-analysis", detail: "Corrected PR and inferred soiling on history, including the 2018 to 2019 cleaning failure" },
            { label: "3. Instrumentation", detail: "Stations and optical sensors per section, calibration month" },
            { label: "4. Measurement year", detail: "12 months of synchronised data; monthly review with KISR" },
            { label: "5. Validation and publication", detail: "Method comparison against stations, cleaning-rule evaluation, joint paper" },
          ],
          caption: "Phases 2 and 3 run in parallel. Durations are planning assumptions, not commitments.",
        },
      ],
    },
    // ============================================================ APPLIED
    {
      layer: "applied",
      title: "Numbers behind the plan",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Reading a cleaning interruption as a natural experiment",
          given: md`**Illustrative numbers, not Shagaya data.** Before an interruption in cleaning, a section's monthly-average corrected PR is stable at 0.80 just after each cleaning. During a 40-day interval without cleaning it falls to 0.68. Change-point detection finds one dust event with a 6-point step in SR on day 20. Outages, curtailment and clipping have been filtered.`,
          steps: [
            { md: md`**Soiling ratio at the end**, assuming other losses unchanged: $SR = 0.68/0.80 = 0.85$, a total loss of 15 %.` },
            { md: md`**Naive rate**: $15/40 = 0.375$ %/day.` },
            { md: md`**Background rate** with the storm step removed: $r_{bg} = (15 - 6)/40 = 0.225$ %/day.` },
            { md: md`**Why it matters**: a cleaning model built on 0.375 %/day would shorten the routine interval by $\sqrt{0.375/0.225} = 1.29$ times, paying for cleaning that calm periods do not need, while still missing the value of a post-storm pass. Splitting rate and steps gives two separate levers: the routine interval and an event rule.` },
            { md: md`**Check against independent data**: if a station or a cleaned reference section existed during the interruption, compare; if not, check the inferred storm date against dust-storm records and visibility data.` },
          ],
          result: md`Total 15 % over 40 days, of which 6 points came from one event and the rest from a background rate of about 0.23 %/day. A long uncleaned interval is valuable precisely because it shows accumulation without resets, but only if the steps are separated.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Sizing the data and the precision of the pilot",
          given: md`Plan assumption: 150 signals logged every minute for a year; about 16 bytes per stored value (timestamp and value, uncompressed). Station daily SR scatter 1 %; monthly cleaning gives 30-day intervals.`,
          steps: [
            {
              md: md`**Rows per year**: $150 \times 525{,}600 = 78.8$ million values.`,
              hidden: true,
              check: { prompt: "Values per year (millions)", answer: 78.84, unit: "million", tolerance: { abs: 0.1 } },
            },
            {
              md: md`**Storage**: $78.84 \times 10^6 \times 16$ bytes $\approx 1.26$ GB per year uncompressed.`,
              hidden: true,
              check: { prompt: "Storage per year (GB)", answer: 1.26, unit: "GB", tolerance: { abs: 0.02 } },
            },
            { md: md`**Rate precision per interval**: $1/\sqrt{30 \times 899/12} = 0.021$ %/day. Twelve intervals give a seasonal picture with three intervals per season.` },
            { md: md`**Implication**: storage and computation are trivial. The constraints are data access, clock synchronisation, sensor maintenance and the completeness of logs.` },
          ],
          result: md`About 79 million values and 1.3 GB a year: a laptop-sized dataset. The pilot's risk is governance and data quality, not infrastructure.`,
        },
        {
          kind: "question",
          question: {
            id: "mz02-l05-p1",
            type: "numeric",
            prompt: md`Independent problem (illustrative). During a 50-day interval without cleaning, a section's soiling loss reaches 18 %. Two dust events are detected with steps of 4 and 3 points. What is the background soiling rate in %/day?`,
            answer: 0.22,
            tolerance: { abs: 0.005 },
            unit: "%/day",
            explanation: md`$r_{bg} = (18 - 4 - 3)/50 = 11/50 = 0.22$ %/day. The naive rate would be 0.36 %/day.`,
            concepts: ["mz02.natural-experiment"],
            difficulty: 1,
          },
        },
      ],
    },
    // ============================================================ FIELD
    {
      layer: "field",
      title: "Getting the plan agreed and the data flowing",
      blocks: [
        {
          kind: "md",
          md: md`**Who is involved.** KISR researchers (methodology partner and likely co-authors), the plant operations team (data, logs, site access, cleaning), MEWRE as owner if its consent is needed for data sharing or installations (to confirm), and Mizan (plan, analysis, hardware integration). Omar Abu Harb and the engineering side own the code and the analysis environment; you own the agreement, the scope and the schedule.

**Documents.** A two-to-four page measurement plan (this lesson), a data-sharing agreement (who owns, who may use, confidentiality, publication rights, retention and deletion), a site-access and installation permission for new sensors, and a data dictionary agreed with the operations team.`,
        },
        { kind: "xref", to: "fc02-l06", note: "Scoping a pilot so it tests the riskiest assumption first." },
        { kind: "xref", to: "fc08-l07", note: "Pilot agreements, IP and data clauses: the contract side of this plan." },
        { kind: "xref", to: "m00-l02", note: "Who decides what in Kuwait's institutions (MEWRE, KISR, KAPP): needed to know whose consent the data agreement needs." },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How pilots with public research partners stall",
          md: md`- **Data rights unclear**: the researchers are willing but the owner has not consented; months pass.
- **Logs missing**: cleaning dates exist only in someone's memory, so cleaning events must be inferred, weakening validation.
- **Clocks unsynchronised**: SCADA in local time, loggers in UTC, a historian with daylight-saving errors (Kuwait has none, imported equipment may).
- **Scope creep**: stow control, BESS and forecasting added before soiling is proven.
- **Methods chosen after the results**: reviewers and co-authors lose trust. Freeze the methodology, then analyse.
- **Overclaiming**: describing the pilot as signed or running before it is. Say targeted or in preparation until it is true.`,
        },
        {
          kind: "ask",
          title: "Ask KISR before finalising the plan",
          items: [
            "Which data exists for the PV plant (signals, resolution, period), who holds it, and in what format?",
            "Are cleaning, maintenance and outage logs available, including for the 2018 to 2019 cleaning-arm failure?",
            "Who must consent to data sharing and sensor installation: KISR, MEWRE, or both?",
            "Are the KISR radiometric data and any soiling measurements available for the Shagaya area?",
            "What publication and authorship arrangements do KISR researchers expect?",
            "Can we visit the site to confirm mounting, tilt, sensors and logger setup?",
          ],
        },
        { kind: "scenario", scenario: "mz02-s3" },
        {
          kind: "question",
          question: {
            id: "mz02-l05-p2",
            type: "short",
            prompt: md`Applied exercise. Write a **one-page measurement plan** (about 350 to 450 words) for the targeted Shagaya Phase I soiling pilot, to send to the KISR researchers as a basis for discussion. Use only facts from this lesson; write everything else as an assumption or an open question.`,
            rubric: [
              "Testable objectives or hypotheses (method agreement, value of condition-based cleaning) and the IEC 61724-based corrected PR baseline",
              "Data inventory covering historical signals, logs (cleaning, outages, maintenance) and new instruments per technology section, with resolution",
              "Duration justified by seasons and cleaning cycles, with a back-analysis phase including the 2018 to 2019 cleaning failure as natural experiment",
              "Data handling and QA: clock sync, raw data retention, frozen filters and parameters, versioned reproducible code",
              "Governance: roles, data-sharing and consent questions (KISR and MEWRE), publication intent",
              "Accurate facts only (thin-film and poly-Si sections, about 10 MW, monthly water cleaning, 2020 paper), pilot described as targeted or in preparation, no invented numbers",
            ],
            modelAnswer: md`**Shagaya Phase I PV soiling pilot: measurement plan (draft for discussion, in preparation).**

**Purpose.** Develop and validate a method that turns operational data into cleaning decisions, which KISR has noted does not yet exist as a standard. **H1**: soiling inferred from inverter-level weather-corrected PR agrees with reference-station soiling ratios within ±1 point (k = 2) on most valid days. **H2**: a condition-based cleaning rule (rate plus event triggers) recovers more energy per cleaning pass than the current monthly schedule.

**Plant (from Al-Rasheedi et al. 2020).** About 10 MW (11.15 MW reported) with a thin-film and a poly-Si section, water-cleaned monthly, dust storms causing sudden drops of about 30 %. **To confirm**: mounting and tilt, inverter layout, existing sensors, data resolution and retention.

**Baseline metric.** NREL weather-corrected PR consistent with IEC 61724-1, per section, with a frozen reference cell temperature; soiling ratio per IEC 61724-1:2021 clause 9.4 (method details to be confirmed from the standard).

**Data.** Historical: inverter and meter energy, POA irradiance, module and ambient temperature, wind, humidity, plus cleaning, outage and maintenance logs, including the 2018 to 2019 cleaning-arm failure. New: one reference-device station (Isc and Pmax) per section and two optical sensors per section at contrasting positions, calibrated against the stations; all at 1-minute resolution on a synchronised clock. Context: KISR radiometric data, dust-storm days, aerosol data.

**Phases.** (1) Data audit, 1 to 2 months. (2) Back-analysis of history, including the cleaning failure as a natural experiment, separating background rate from storm steps. (3) Instrumentation and a calibration month. (4) Twelve months of measurement to cover dew, dust-storm and summer regimes. (5) Validation and joint publication.

**Quality.** Filters, parameters and analysis code frozen and versioned before results; raw data retained; monthly review with KISR; disagreements between methods investigated, not averaged.

**Governance.** KISR: methodology and review, site access, logs. Mizan: plan, analysis, hardware integration. Open questions: who must consent to data sharing and installations (KISR, MEWRE or both); data agreement terms; authorship and publication rights.`,
            explanation: md`The plan is credible when every hypothesis is testable, every fact is sourced, every unknown is named as such, and governance questions are raised before measurement starts.`,
            concepts: ["mz02.measurement-plan", "mz02.data-inventory", "mz02.natural-experiment", "mz02.study-duration", "mz02.data-access"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a MEWRE official, in plain words, why the pilot needs a full year of measurement plus access to old cleaning records, and what the 2018 to 2019 cleaning failure adds.",
          keyPoints: [
            "Soiling behaves differently in winter (dew) and in the dust-storm and summer seasons, so one year covers each regime once",
            "Old records let the method be tested on known events immediately, before new sensors have a year of data",
            "Cleaning logs are needed to tell cleaning jumps from sensor faults",
            "The failure created long periods without cleaning, showing how dust accumulates without resets",
            "Storm steps must be separated from the slow daily rate to get two useful cleaning rules",
          ],
        },
      ],
    },
  ],
  scenarios: [
    {
      id: "mz02-s3",
      title: "\"Can you start next month?\"",
      dayInLife: true,
      context: md`In a meeting, a KISR researcher is enthusiastic: "Send us your sensors and start next month, we will sort out the paperwork later." No data-sharing agreement exists, and it is not yet clear whether MEWRE must consent to installations on the plant.`,
      start: "a",
      concepts: ["mz02.data-access", "mz02.measurement-plan"],
      nodes: {
        a: {
          md: md`How do you respond?`,
          choices: [
            { text: "Welcome the momentum, propose starting with the data audit and back-analysis under a short data-sharing letter, and ask who must approve installations", next: "b", score: 10, feedback: "You keep the energy, start where no approval risk exists (historical data under a simple letter), and surface the consent question early." },
            { text: "Ship the sensors immediately", score: 2, feedback: "Installing equipment on a ministry-owned plant without clear consent can end the relationship and the pilot." },
            { text: "Insist on a full contract before any work", score: 4, feedback: "Safe but slow; you may lose the champion's momentum." },
          ],
        },
        b: {
          md: md`The researcher agrees and asks what Mizan needs first.`,
          choices: [
            { text: "Send the one-page measurement plan and a data request list: signals, resolution, period, cleaning and outage logs, the 2018 to 2019 records", score: 10, feedback: "Concrete, short and reviewable: it turns goodwill into a work plan." },
            { text: "Ask for everything they have", score: 4, feedback: "Vague requests produce partial, unlabelled data dumps and weeks of clarification." },
          ],
        },
      },
    },
  ],
  quiz: [
    {
      id: "mz02-l05-q1",
      type: "multi",
      prompt: "Which statements about Shagaya Phase I PV are supported by the sources used in this module?",
      options: [
        "It has a thin-film section and a poly-Si section",
        "It was water-cleaned monthly in the 2020 study",
        "It uses single-axis trackers",
        "Dust storms caused sudden output drops of about 30 %",
        "A Mizan pilot there is signed and running",
      ],
      answer: [0, 1, 3],
      explanation: md`Mounting is not known from the sources and must be confirmed. The pilot is targeted or in preparation, never described as signed or running.`,
      concepts: ["mz02.measurement-plan"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz02-l05-q2",
      type: "mcq",
      prompt: "Why is twelve months the minimum for the new-measurement phase?",
      options: [
        "Gulf soiling has distinct seasonal regimes (dew-assisted winter soiling, dust-storm and summer seasons) that each must be observed",
        "IEC 61724-1 requires exactly one year",
        "Sensors need a year to stabilise",
        "Data storage is cheaper annually",
      ],
      answer: 0,
      explanation: md`The duration follows from the physics and the number of cleaning cycles, not from a rule in the standard.`,
      concepts: ["mz02.study-duration"],
      difficulty: 1,
    },
    {
      id: "mz02-l05-q3",
      type: "numeric",
      prompt: md`During a 36-day uncleaned interval the soiling loss reaches 12 % including one 3-point storm step. What is the background rate in %/day?`,
      answer: 0.25,
      tolerance: { abs: 0.005 },
      unit: "%/day",
      explanation: md`$(12 - 3)/36 = 0.25$ %/day.`,
      concepts: ["mz02.natural-experiment"],
      difficulty: 1,
    },
    {
      id: "mz02-l05-q4",
      type: "order",
      prompt: "Order the pilot phases.",
      items: ["Agreement on scope and data sharing", "Data audit of historical records", "Back-analysis including the cleaning failure", "Twelve-month measurement", "Validation and joint publication"],
      explanation: md`Instrumentation can run in parallel with back-analysis, but nothing starts before the agreement, and publication comes after validation.`,
      concepts: ["mz02.measurement-plan"],
      difficulty: 1,
    },
    {
      id: "mz02-l05-q5",
      type: "multi",
      prompt: "Which logs are essential to validate a soiling method on historical data?",
      options: ["Cleaning dates and blocks", "Inverter outages and curtailment", "Irradiance sensor cleaning and calibration", "Staff rosters", "Module replacements"],
      answer: [0, 1, 2, 4],
      explanation: md`Each of these changes the energy or the irradiance signal and can be mistaken for soiling or recovery. Staff rosters are not needed.`,
      concepts: ["mz02.data-inventory"],
      difficulty: 2,
    },
    {
      id: "mz02-l05-q6",
      type: "decision",
      prompt: "Halfway through the measurement year, your engineering partner proposes changing the PR filter thresholds because the results \"look noisy\". What do you do?",
      options: [
        { text: "Keep the frozen thresholds for the primary analysis; run the new thresholds as a documented sensitivity analysis and discuss with KISR", score: 1, feedback: "Right. Changing methods after seeing results undermines the study; sensitivity analyses are legitimate when declared." },
        { text: "Change them: cleaner results are better", score: 0, feedback: "Post-hoc tuning is exactly what reviewers look for." },
        { text: "Restart the study", score: 0.2, feedback: "Disproportionate; the data is still valid." },
      ],
      explanation: md`A frozen methodology with declared sensitivity analyses keeps the study credible for co-publication.`,
      concepts: ["mz02.measurement-plan"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz02-l05-f1", front: "Shagaya Phase I PV (sources)", back: "About 10 MW (11.15 MW in RSER 2020), thin-film and poly-Si sections, monthly water cleaning, storm drops of about 30 %.", concepts: ["mz02.measurement-plan"] },
    { id: "mz02-l05-f2", front: "Background soiling rate", back: md`$r_{bg} = (L_{total} - \sum \Delta_k)/N$: remove storm steps before computing the slope.`, concepts: ["mz02.natural-experiment"] },
    { id: "mz02-l05-f3", front: "Minimum new-measurement duration", back: "12 months, to cover dew, dust-storm and summer regimes.", concepts: ["mz02.study-duration"] },
    { id: "mz02-l05-f4", front: "Pilot data volume (150 signals, 1 min, 1 year)", back: "About 79 million values, about 1.3 GB uncompressed: data is not the constraint, access is.", concepts: ["mz02.data-inventory"] },
    { id: "mz02-l05-f5", front: "First governance question for the pilot", back: "Who must consent to data sharing and installations: KISR, MEWRE or both?", concepts: ["mz02.data-access"] },
    { id: "mz02-l05-f6", front: "How to describe the pilot", back: "Targeted or in preparation, never signed or running until it is.", concepts: ["mz02.data-access"] },
  ],
};

export default lesson;
