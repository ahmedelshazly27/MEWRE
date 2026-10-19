import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m12-l02",
  title: "Performance Analysis & Root Cause Analysis",
  summary:
    "How to explain a gap between expected and actual energy: loss attribution, the signatures of soiling, clipping, inverter faults, tracker misalignment and curtailment, a step-by-step underperformance diagnosis workflow, and RCA tools — 5 Whys, fishbone and fault trees.",
  minutes: 75,
  objectives: [
    "You can build a loss attribution from expected to actual energy and judge the size of the unexplained residual",
    "You can recognise the data signatures of soiling, clipping, inverter faults, tracker misalignment and curtailment",
    "You can run a structured underperformance diagnosis from portfolio level down to string level",
    "You can apply 5 Whys, fishbone (Ishikawa) and fault tree analysis, including AND/OR gate probabilities",
  ],
  concepts: [
    {
      id: "m12.loss-attribution",
      name: "Loss attribution",
      description:
        "Decomposing the gap between modelled (expected) and measured energy into identified loss categories plus an unexplained residual.",
      competency: "operations",
      related: ["m12.diagnosis-workflow", "m02.loss-tree", "m09.deemed-energy"],
    },
    {
      id: "m12.loss-signatures",
      name: "Loss signatures",
      description:
        "Characteristic patterns in time series and spatial data that identify a loss mechanism (flat-top clipping, gradual soiling decline, zero-output blocks, asymmetric tracker profiles, set-point plateaus).",
      competency: "operations",
      related: ["m06.curtailment", "m02.dc-ac-ratio"],
    },
    {
      id: "m12.diagnosis-workflow",
      name: "Underperformance diagnosis workflow",
      description:
        "Top-down sequence: validate data → plant vs model → exclusions → block/inverter comparison → string level → field verification → root cause → corrective action.",
      competency: "operations",
      related: ["m14.scada-anomaly"],
    },
    {
      id: "m12.rca-tools",
      name: "Root cause analysis tools",
      description:
        "5 Whys, fishbone/Ishikawa diagrams and fault tree analysis used to move from a symptom to systemic causes and corrective actions.",
      competency: "risk",
      related: ["m12.fault-tree"],
    },
    {
      id: "m12.fault-tree",
      name: "Fault tree analysis",
      description:
        "Top-down logic diagram combining basic events through AND/OR gates to compute the probability of an undesired top event (IEC 61025).",
      competency: "risk",
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "From a gap to a cause",
      blocks: [
        {
          kind: "md",
          md: md`### Expected energy is the reference, not the P50

The P50 from the bid is an annual expectation for average weather. To judge a month, you need **expected energy given the actual weather**: re-run the performance model (PVsyst or pvlib) with measured irradiance and temperature, then compare with measured energy. The gap is then decomposed:`,
        },
        { kind: "equation", formula: "m12-loss-attribution" },
        {
          kind: "md",
          md: md`The **residual** is what you cannot yet explain. A residual within ±1–2 % is usually inside model and sensor uncertainty; a larger residual means something is unidentified (sensor error, degradation, string faults, wrong model parameters).

### Signatures of the common losses

| Loss | Signature in data | How to quantify |
|---|---|---|
| **Soiling** | Gradual decline of PR or of a soiled/clean reference ratio between cleanings; step recovery after cleaning or rain; worse after shamal events | Soiling stations (clean vs dirty reference cells/modules): soiling ratio $SR$; or PR recovery after cleaning |
| **Clipping** | Flat-top AC power at inverter limit around midday on clear days; more on cool, clear days (higher DC) | Model DC power vs AC limit; usually already in the model — only "extra" clipping is a loss vs expected |
| **Inverter faults** | Zero or reduced output on specific inverters; alarms/fault codes; derating flags at high internal temperature | Lost energy from peers' specific yield × downtime |
| **Tracker misalignment / stuck trackers** | Morning–afternoon asymmetry; rows producing less in the morning or afternoon only; angle set-point ≠ actual | Compare row power vs neighbours; angle logs |
| **Curtailment** | Plant power flat at a level below available power, matching PPC set-point from the grid operator | Available power (from reference inverters/irradiance) minus actual during set-point periods |
| **String / DC faults** | Individual string currents below peers at the same irradiance; blown fuses, connector failures, diode failures | String current comparison; IV tracing in the field |
| **Thermal derating** | Power reductions at peak ambient (45–50 °C), linked to inverter internal temperature or HVAC limits | Inverter derating flags vs temperature |
| **Sensor error** | PR jumps or drifts not mirrored by energy; disagreement between sensors | Cross-check sensors, satellite, clear-sky |

The soiling ratio is defined from a pair of identical devices, one cleaned daily and one left to soil:`,
        },
        { kind: "equation", formula: "m12-soiling-ratio" },
        {
          kind: "widget",
          widget: "dc-ac-ratio",
          props: { ratio: 1.3 },
          caption: "Clipping signature: at DC/AC 1.3 on a clear day, the AC curve flattens at the inverter limit. That is designed behaviour, not a fault — only clipping above the model is a loss.",
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why top-down beats alarm-chasing",
          md: md`A 1 GW plant raises thousands of alarms a week. Chasing alarms finds the loud problems, not the expensive ones. Top-down analysis (plant → block → inverter → string) quantifies losses in MWh and ranks them; you fix the biggest first. A stuck tracker row loses a few MWh per month; 2 % extra soiling across the plant loses thousands.`,
        },
        {
          kind: "md",
          md: md`### Diagnosis workflow

1. **Validate data** (completeness, sensor cleaning, timestamps, meter reconciliation).
2. **Plant vs model** with measured weather → total gap.
3. **Remove exclusions** with evidence (curtailment by NCC, grid outages).
4. **Compare blocks and inverters** by specific yield at the same time; outliers point to local causes; uniform shortfall points to plant-wide causes (soiling, sensor, degradation, model).
5. **Drill to strings/MPPTs**: current ratios; tracker angle logs.
6. **Field verification**: thermography, IV curves, visual, tracker inspection.
7. **Root cause** with an RCA tool; **corrective action**; verify the recovery in data.

### RCA tools

**5 Whys** — ask "why?" until you reach a cause you can act on systemically. Example: inverter tripped → over-temperature → air filter clogged → filter changed every 6 months, but dust load needs monthly → maintenance plan copied from a European template. Corrective action: site-specific filter interval based on differential pressure, not the calendar.

**Fishbone (Ishikawa)** — organise candidate causes under categories (for O&M: **Methods, Machines, Materials, Manpower, Measurement, Environment**) so the team does not fixate on one theory.

**Fault tree analysis (IEC 61025)** — top-down logic from an undesired event. With independent basic events:`,
        },
        { kind: "equation", formula: "m12-fault-tree" },
        {
          kind: "md",
          md: md`OR gates add risk (any one event causes the top event); AND gates represent redundancy (all must fail). Fault trees show where redundancy buys the most reliability — e.g. N+1 HVAC on BESS containers in a 50 °C summer.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Explaining a bad July",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Loss attribution for a 7 % gap",
          given: md`1,000 MWac plant, July. Expected energy from the model with measured irradiance/temperature (and the model's own 2 % soiling assumption): 285 GWh. Measured export: 265 GWh. Evidence gathered:
- PPC logs and NCC confirm curtailment: 6.0 GWh
- Inverter downtime (peer specific-yield method): 3.2 GWh
- Extra soiling above the model's 2 % (soiling station): 4.4 GWh
- 46 trackers stuck at stow after a controller firmware fault (row comparison): 2.1 GWh
- String faults (blown fuses, connectors) from current comparison: 2.3 GWh`,
          steps: [
            { md: md`Total gap: $285 - 265 = 20.0$ GWh (7.0 % of expected).` },
            { md: md`Identified: $6.0 + 3.2 + 4.4 + 2.1 + 2.3 = 18.0$ GWh.` },
            { md: md`Residual: $20.0 - 18.0 = 2.0$ GWh = 0.7 % of expected — within typical model/sensor uncertainty.` },
            { md: md`Responsibility split: curtailment (6.0) is MEWRE/grid-side and may be compensable under the PPA; inverter, soiling, tracker and string losses (12.0 GWh) are O&M/IPP-side and should feed corrective actions — and, under an O&M contract, availability or performance LDs.` },
          ],
          result: md`90 % of the gap is explained. Actions ranked by MWh: cleaning plan (4.4), string repair campaign (2.3), tracker firmware fix (2.1), inverter repair times (3.2). Curtailment goes to the PPA settlement process.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Quantifying extra soiling from a soiling ratio",
          given: md`Same month, but the soiling station shows an average soiling ratio $SR = 0.955$ (worse than the 4.4 GWh case). The model's expected energy (285 GWh) already includes 2 % soiling, i.e. $SR_{model} = 0.98$.`,
          steps: [
            { md: md`Actual energy scales with $SR$; the model assumed $SR_{model}$. Extra loss $= E_{exp}\left(1 - SR/SR_{model}\right)$.` },
            {
              md: md`$1 - 0.955/0.98$ = ?`,
              hidden: true,
              check: { prompt: "Fractional extra soiling loss", answer: 0.02551, tolerance: { abs: 0.0003 } },
            },
            {
              md: md`Extra soiling loss $= 285 \times 0.02551$ = ? GWh`,
              hidden: true,
              check: { prompt: "Extra soiling loss", answer: 7.27, unit: "GWh", tolerance: { rel: 0.01 } },
            },
          ],
          result: md`≈ 7.3 GWh extra soiling loss — the largest single item. Kuwaiti studies report 8.7–15.1 % losses with monthly cleaning depending on season, so a 4.5 % average soiling loss in a dusty month is plausible. The cleaning strategy (lesson 4) is where the money is.`,
        },
        { kind: "sources", refs: ["m12-jeas-soiling-kuwait", "m12-rser-shagaya-pv"] },
        {
          kind: "question",
          question: {
            id: "m12-l02-p1",
            type: "numeric",
            prompt: md`Fault tree for "plant export lost" (annual probabilities, independent): OR of (main transformer failure 0.02; HV breaker failure 0.01; protection mal-operation 0.03). What is the top-event probability?`,
            answer: 0.0589,
            tolerance: { abs: 0.0005 },
            explanation: md`$P = 1 - (1-0.02)(1-0.01)(1-0.03) = 1 - 0.98 \times 0.99 \times 0.97 = 1 - 0.94109 = 0.0589$. Nearly the sum (0.06) because the probabilities are small. A second main transformer (AND gate for transformer failure: $0.02^2 = 0.0004$) would cut the top event to ≈ 0.040 — now protection mal-operation dominates.`,
            concepts: ["m12.fault-tree"],
            difficulty: 2,
          },
        },
        {
          kind: "widget",
          widget: "loss-waterfall",
          caption: "Build the loss waterfall from GHI to grid: adjust soiling and availability and watch PR and specific yield respond.",
        },
      ],
    },
    {
      layer: "field",
      title: "Running performance reviews",
      blocks: [
        {
          kind: "md",
          md: md`### Roles and rhythm

- **Daily** (O&M control room): alarms, outages, tracker faults, curtailment events; work orders raised in the CMMS.
- **Weekly** (O&M + IPP asset manager): top losses in MWh, open work orders, repair times.
- **Monthly** (IPP → MEWRE): performance report with expected vs actual, loss attribution, availability, curtailment settlement, corrective actions.
- **Quarterly/annual** (independent review): degradation trend, model recalibration, warranty claims.

MEWRE's interest as offtaker: curtailment and deemed-energy claims must be evidenced; persistent underperformance is a reliability concern for summer peak (the system peaked around 17.5–17.7 GW in 2024–2026), and an IPP that underperforms at summer noon delivers less exactly when the grid needs it.`,
        },
        { kind: "sources", refs: ["m12-kuwaittimes-peak-2026"] },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Typical analysis errors",
          md: md`- Comparing monthly energy with the **annual P50 / 12** instead of weather-adjusted expected energy.
- Treating clipping as a loss when it is designed into the DC/AC ratio.
- Attributing everything to soiling without a soiling station or cleaning-recovery test.
- Accepting "grid curtailment" without PPC set-point and NCC evidence.
- Leaving a 4–5 % residual unexplained month after month (often a sensor or degradation issue).
- RCA that stops at "human error" — always ask why the system allowed the error.`,
        },
        {
          kind: "checklist",
          title: "PM underperformance review checklist",
          items: [
            "Expected energy re-modelled with measured weather (not P50/12)",
            "Data validated first (sensors, gaps, meter reconciliation)",
            "Exclusions evidenced (NCC logs, PPC set-points, outage reports)",
            "Losses quantified in MWh and ranked; residual ≤ ~2 % or investigated",
            "Block/inverter outliers listed with field verification results",
            "RCA performed for top 3 losses; corrective actions with owners and dates",
            "Recovery verified in data the following month",
          ],
        },
        {
          kind: "ask",
          title: "Ask the IPP / O&M contractor",
          items: [
            "What expected-energy model did you use for this month, and with which measured inputs?",
            "How big is the unexplained residual, and what is your hypothesis?",
            "Show me the soiling ratio trend and the PR recovery after the last cleaning cycle.",
            "Which inverters and blocks are bottom-decile by specific yield, and why?",
            "What did the 5 Whys find for the repeated inverter over-temperature trips?",
          ],
        },
        { kind: "scenario", scenario: "m12-s2" },
        {
          kind: "feynman",
          prompt: "Explain to a non-engineer how you would find out why a solar plant produced 7 % less than expected last month.",
          keyPoints: [
            "Compare with expected energy for the actual weather, not the annual average",
            "Check the measurements first",
            "Separate events outside the operator's control (curtailment)",
            "Rank remaining losses by energy using their data signatures",
            "Verify in the field, find the root cause, fix and confirm",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m12-l02-q1",
      type: "mcq",
      prompt: "AC power is flat at exactly the inverter rating between 10:30 and 14:00 on a cool clear day. What is the most likely explanation?",
      options: ["Curtailment", "Inverter clipping by design (DC/AC ratio)", "Soiling", "Tracker stuck"],
      answer: 1,
      explanation: md`A flat top at inverter rated power on high-irradiance, cool days is clipping. Curtailment would plateau at the PPC set-point (usually below rating) and coincide with NCC instructions.`,
      concepts: ["m12.loss-signatures"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m12-l02-q2",
      type: "mcq",
      prompt: "A row produces normally in the afternoon but 30 % less than its neighbours in the morning. Most likely cause?",
      options: ["Soiling", "Tracker misalignment/stuck in a west-facing position", "Grid curtailment", "Transformer failure"],
      answer: 1,
      explanation: md`Asymmetric morning/afternoon deficits on specific rows are the signature of tracker angle problems; soiling and curtailment are not time-of-day asymmetric for one row.`,
      concepts: ["m12.loss-signatures"],
      difficulty: 1,
    },
    {
      id: "m12-l02-q3",
      type: "numeric",
      prompt: md`Two redundant HVAC units serve a BESS container; each has a 0.10 probability of failing during a summer heat wave (independent). What is the probability both fail?`,
      answer: 0.01,
      tolerance: { abs: 0.0005 },
      explanation: md`AND gate: $0.10 \times 0.10 = 0.01$. Redundancy cuts the risk tenfold — if failures are truly independent. A common cause (same dusty air intake, same power supply) breaks independence; fault trees must model common-cause failures.`,
      concepts: ["m12.fault-tree"],
      difficulty: 1,
    },
    {
      id: "m12-l02-q4",
      type: "order",
      prompt: "Order the underperformance diagnosis workflow.",
      items: [
        "Validate data",
        "Compare plant with weather-adjusted model",
        "Remove evidenced exclusions",
        "Compare blocks and inverters",
        "Drill down to strings and tracker logs",
        "Field verification",
        "Root cause and corrective action",
      ],
      explanation: md`Top-down: never drill into strings before you know the data is right and the gap is real.`,
      concepts: ["m12.diagnosis-workflow"],
      difficulty: 1,
    },
    {
      id: "m12-l02-q5",
      type: "multi",
      prompt: "Which are standard fishbone categories for an O&M root cause analysis? Select all.",
      options: ["Methods", "Machines", "Measurement", "Marketing", "Environment", "Manpower"],
      answer: [0, 1, 2, 4, 5],
      explanation: md`The classic 6M/6 categories: Methods, Machines, Materials, Manpower, Measurement, Environment (Mother Nature). Marketing is not one of them.`,
      concepts: ["m12.rca-tools"],
      difficulty: 1,
    },
    {
      id: "m12-l02-q6",
      type: "decision",
      prompt: md`For three months the IPP's report shows an unexplained residual of 4–5 %, labelled "model uncertainty". What do you do?`,
      options: [
        { text: "Accept — models are uncertain", score: 0.2, feedback: "A persistent, one-sided residual is a signal, not noise." },
        { text: "Request an independent check: sensor calibration, IV-curve and EL sampling for degradation, string-level current analysis, and a model recalibration review", score: 1, feedback: "Persistent negative residuals often hide sensor bias, early degradation (e.g. PID, LeTID) or systematic string faults." },
        { text: "Apply LDs for the residual", score: 0.3, feedback: "Unexplained loss isn't yet attributable to anyone; diagnose first." },
      ],
      explanation: md`Random model error averages out; a consistent bias doesn't. Three months of 4–5 % is ~1 % of annual revenue and may indicate a warranty-relevant defect.`,
      concepts: ["m12.loss-attribution", "m12.diagnosis-workflow"],
      difficulty: 2,
    },
    {
      id: "m12-l02-q7",
      type: "short",
      prompt: "Apply 5 Whys to: 'Tracker rows went to stow and stayed there for two days after a sandstorm.'",
      rubric: [
        "Successive why-questions leading beyond the immediate cause",
        "Identifies a systemic cause (e.g. controller logic, procedure, monitoring alarm)",
        "Proposes a systemic corrective action",
      ],
      modelAnswer:
        "Why stayed in stow? Controllers did not receive the 'resume' command. Why? Wind sensor stuck at high reading after dust ingress. Why stuck? Sensor not in the preventive maintenance plan after dust events. Why? PM plan built from OEM default, not site conditions. Why no alarm? No logic comparing wind sensors. Actions: redundant wind sensors with disagreement alarm, post-storm inspection procedure, add sensor cleaning to PM plan.",
      explanation: md`Good RCA ends with controls (redundancy, alarms, procedures), not blame.`,
      concepts: ["m12.rca-tools"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m12-l02-f1", front: "Reference for monthly performance evaluation", back: "Weather-adjusted expected energy (model with measured irradiance/temperature), not P50/12.", concepts: ["m12.loss-attribution"] },
    { id: "m12-l02-f2", front: "Signature of clipping", back: "Flat-top AC at inverter rating on clear, cool days.", concepts: ["m12.loss-signatures"] },
    { id: "m12-l02-f3", front: "Signature of curtailment", back: "Plateau at PPC set-point below available power, matching grid-operator instructions.", concepts: ["m12.loss-signatures"] },
    { id: "m12-l02-f4", front: "Soiling ratio", back: md`$SR = I_{sc,soiled}/I_{sc,clean}$ (temperature-corrected)`, concepts: ["m12.loss-signatures"] },
    { id: "m12-l02-f5", front: "Fault tree OR gate (independent events)", back: md`$P = 1 - \prod (1-p_i)$`, concepts: ["m12.fault-tree"] },
    { id: "m12-l02-f6", front: "Fault tree AND gate", back: md`$P = \prod p_i$ (redundancy)`, concepts: ["m12.fault-tree"] },
    { id: "m12-l02-f7", front: "Acceptable unexplained residual", back: "Roughly within ±1–2 %; persistent larger residuals must be investigated.", concepts: ["m12.loss-attribution"] },
    { id: "m12-l02-f8", front: "6 fishbone categories", back: "Methods, Machines, Materials, Manpower, Measurement, Environment.", concepts: ["m12.rca-tools"] },
  ],
  scenarios: [
    {
      id: "m12-s2",
      title: "The IPP says it's all curtailment",
      dayInLife: true,
      context: md`You are MEWRE's performance PM. A 1.1 GW IPP's June report shows actual energy 8 % below expected. The IPP attributes 6 of the 8 points to "grid curtailment" and asks for deemed-energy compensation under the PPA.`,
      start: "a",
      concepts: ["m12.loss-attribution", "m12.loss-signatures"],
      nodes: {
        a: {
          md: md`You have access to the IPP's SCADA export, PPC set-point logs and the National Control Centre (NCC) dispatch log.`,
          choices: [
            { text: "Approve the claim — the IPP knows its plant", next: "b", score: 1, feedback: "Deemed-energy payments are public money; they need evidence." },
            { text: "Reconcile PPC set-points with NCC instructions, and compute available power during those periods from reference inverters", next: "c", score: 9, feedback: "Curtailment claims stand or fall on set-point evidence and an agreed available-power method." },
          ],
        },
        b: {
          md: md`The Audit Bureau later samples the payment and finds NCC logs only support half the claimed hours.`,
          choices: [{ text: "Recover the overpayment and tighten the process", score: 2, feedback: "Avoidable — evidence first, payment second." }],
        },
        c: {
          md: md`NCC logs confirm curtailment covering 2.5 points of the gap. On other "curtailed" days, plant output is flat at ~92 % of rating with no NCC instruction; inverter logs show thermal derating flags at 48–50 °C ambient.`,
          choices: [
            { text: "Accept 2.5 points as curtailment; classify the 92 % plateaus as inverter thermal derating (IPP-side); request RCA on inverter cooling", next: "d", score: 10, feedback: "The signature (plateau without a set-point, coincident with derating flags at peak ambient) identifies thermal derating, an IPP design/O&M issue." },
            { text: "Split the difference at 4 points to keep the relationship", next: "d", score: 3, feedback: "Negotiating physics creates precedent and audit risk." },
          ],
        },
        d: {
          md: md`The IPP's RCA finds clogged inverter air filters and an under-sized cooling design at 50 °C. It proposes monthly filter changes and a firmware change to the derating curve within OEM limits.`,
          choices: [
            { text: "Accept the actions, require verification in July data, and record the thermal derating issue for future tender specifications (rating at 50 °C+)", score: 10, feedback: "You close the loop operationally and feed the lesson into procurement." },
          ],
        },
      },
    },
  ],
};

export default lesson;
