import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m12-l01",
  title: "Monitoring & KPIs",
  summary:
    "What a PV/BESS plant's SCADA and monitoring system measures, and how to turn it into the KPIs a MEWRE PM reports and enforces: PR (IEC 61724-1), temperature-corrected PR, time- and energy-based availability, specific yield, capacity factor — and why data quality comes first.",
  minutes: 70,
  objectives: [
    "You can describe the monitoring architecture of a utility PV+BESS plant and the IEC 61724-1 accuracy classes",
    "You can compute specific yield, reference yield, PR, temperature-corrected PR and capacity factor from monthly data",
    "You can distinguish time-based and energy-based availability and calculate availability LDs",
    "You can screen monitoring data for quality problems before drawing conclusions",
  ],
  concepts: [
    {
      id: "m12.monitoring-system",
      name: "Monitoring and SCADA system",
      description:
        "Sensors, data loggers, SCADA and historian that record irradiance, temperatures, electrical quantities and alarms at defined intervals, per IEC 61724-1 classes.",
      competency: "operations",
      related: ["m12.data-quality", "m06.scada-architecture", "m06.revenue-metering"],
    },
    {
      id: "m12.performance-ratio",
      name: "Performance ratio (operational)",
      description:
        "Final yield divided by reference yield; the main normalised measure of how well the plant converts available irradiance, optionally temperature-corrected.",
      competency: "operations",
      related: ["m12.specific-yield", "m02.performance-ratio", "m07.pr-test", "m09.pr-guarantee"],
    },
    {
      id: "m12.availability",
      name: "Availability (time- and energy-based)",
      description:
        "Share of time (or of potential energy) during which the plant could generate, excluding agreed exclusions such as grid outages, curtailment and force majeure.",
      competency: "operations",
      related: ["m09.availability-guarantee", "m04.availability-guarantee"],
    },
    {
      id: "m12.specific-yield",
      name: "Specific yield and capacity factor",
      description:
        "Energy per installed kWp (kWh/kWp) and energy relative to continuous full-power output; used to compare plants and sites.",
      competency: "operations",
      related: ["m01.capacity-factor"],
    },
    {
      id: "m12.data-quality",
      name: "Data quality",
      description:
        "Completeness, accuracy, calibration and consistency of monitoring data; the precondition for any KPI or claim.",
      competency: "operations",
      related: ["m14.data-sanity"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "What the plant measures and what the KPIs mean",
      blocks: [
        {
          kind: "md",
          md: md`### Monitoring architecture

A 1 GW PV + BESS plant produces millions of data points per day:

| Level | Typical signals | Interval |
|---|---|---|
| **Weather stations** (several across the site) | POA irradiance (pyranometers/reference cells; front and rear for bifacial), GHI, DHI, ambient temperature, module back-of-panel temperature, wind speed/direction, humidity, rainfall, **soiling stations** | 1 min (3 s sampling for Class A) |
| **Strings / combiners / string inverters** | DC current and voltage per string or MPPT, alarms | 1–5 min |
| **Inverters / PCS** | DC and AC power, energy, internal temperatures, fault codes, derating flags | 1–5 min |
| **Trackers** | Angle set-point vs actual, motor current, stow status, controller faults | 1–5 min |
| **MV/HV substation** | Revenue meter (export energy), P, Q, V, f, breaker status, protection events | 1 s – 15 min |
| **PPC** | Set-points from the grid operator (P, Q, V, PF), curtailment flags | 1 s |
| **BESS** | SoC, SoH, cell temperatures and voltages, HVAC status, fire system, charge/discharge energy | 1 s – 1 min |

All of it flows to a SCADA/historian and usually a cloud monitoring platform. **IEC 61724-1** defines three monitoring accuracy classes: **Class A** (high accuracy, required for large utility plants and for performance guarantees — e.g. 3-second sampling and 1-minute recording of irradiance, secondary-standard-class pyranometers, regular calibration and frequent sensor cleaning — in Kuwaiti dust, daily in practice), **Class B** (medium) and **Class C** (basic). For a MEWRE utility plant, specify Class A.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why irradiance sensors matter more than anything else",
          md: md`Every normalised KPI divides by irradiance. A pyranometer reading 3 % low makes PR look 3 % better and hides underperformance; one reading 3 % high triggers false alarms and LD disputes. In Kuwait, dust on the sensor dome is the #1 cause of irradiance error. That is why Class A demands daily sensor cleaning, redundancy (several sensors cross-checked) and periodic recalibration — and why the PM should ask for sensor maintenance logs before believing any PR figure.`,
        },
        {
          kind: "md",
          md: md`### The yield chain and PR

IEC 61724-1 defines yields normalised by nameplate DC power $P_0$:`,
        },
        { kind: "equation", formula: "m12-yields" },
        {
          kind: "md",
          md: md`$Y_r$ is the number of "peak sun hours" in the plane of array; $Y_f$ is the kWh delivered per kWp. Their ratio is the **performance ratio**:`,
        },
        { kind: "equation", formula: "m12-pr" },
        {
          kind: "md",
          md: md`PR captures everything between sunlight on the modules and energy at the meter: temperature, soiling, mismatch, DC/AC cable losses, inverter efficiency and clipping, transformer losses, downtime and curtailment. A desert tracker plant typically runs an annual PR of ~0.78–0.83, lower in summer (heat) and higher in winter.

**Temperature-corrected PR** removes the seasonal heat effect so trends reflect plant health:`,
        },
        { kind: "equation", formula: "m12-pr-temp-corrected" },
        {
          kind: "md",
          md: md`### Availability: time vs energy

**Time-based availability** counts hours (often inverter-hours, weighted by capacity) during which equipment was available, over the period when the sun was up (e.g. POA irradiance > 50 W/m²):`,
        },
        { kind: "equation", formula: "m12-availability-time" },
        {
          kind: "md",
          md: md`**Energy-based availability** weights downtime by the energy that would have been produced — an inverter down at noon in July counts far more than one down at 7 am in January:`,
        },
        { kind: "equation", formula: "m12-availability-energy" },
        {
          kind: "md",
          md: md`Energy-based is fairer and harder to game; it needs a model to estimate lost energy (e.g. from neighbouring inverters' specific yield at the same time). Contracts must define **exclusions**: grid outages and curtailment instructed by the grid operator, force majeure, planned maintenance within agreed windows (often at night), Owner-caused events.

### Specific yield and capacity factor

**Specific yield** $Y_f$ over a year (kWh/kWp/yr) is the best single number to compare plants: Kuwaiti bifacial tracker plants should reach roughly 2,000–2,300 kWh/kWp/yr; fixed-tilt plants roughly 1,750–1,900 (indicative — Shagaya's long-term GHI is not yet verified; see M02). **Capacity factor** relates energy to AC nameplate:`,
        },
        { kind: "equation", formula: "m12-capacity-factor" },
        {
          kind: "callout",
          tone: "pitfall",
          title: "AC or DC capacity factor?",
          md: md`A 1,000 MWac / 1,300 MWp plant producing 2,925 GWh has CF = 33.4 % on AC but 25.7 % on DC. Both are "correct"; mixing them in a ministry report is a classic error. State the basis every time.`,
        },
        {
          kind: "widget",
          widget: "capacity-factor",
          props: { mw: 1000, mwh: 2925000 },
          caption: "Compare PV capacity factor (AC basis) with wind, CSP and gas.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Monthly KPIs and an availability LD",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "July KPI sheet for a 1,000 MWac / 1,300 MWp plant",
          given: md`July (744 h). Export energy at the revenue meter $E = 265$ GWh. POA irradiation (average of cleaned, cross-checked sensors) $H_{POA} = 255$ kWh/m². O&M-attributable lost energy (modelled from inverter downtime) 3.2 GWh; grid curtailment instructed by MEWRE 4.5 GWh (excluded).`,
          steps: [
            { md: md`Final yield: $Y_f = 265{,}000{,}000\ \text{kWh} / 1{,}300{,}000\ \text{kWp} = 203.8$ kWh/kWp.` },
            { md: md`Reference yield: $Y_r = 255/1 = 255$ h.` },
            { md: md`PR: $203.8/255 = 0.799$. (Note: the curtailed 4.5 GWh depresses this PR; many reports also show a "PR excluding curtailment".)` },
            { md: md`CF (AC): $265{,}000\ \text{MWh}/(1{,}000\ \text{MW} \times 744\ \text{h}) = 35.6\,\%$.` },
            { md: md`Energy-based availability: $A_E = 265/(265 + 3.2) = 98.81\,\%$ (curtailment excluded from both numerator and denominator per contract).` },
          ],
          result: md`PR 0.799, CF 35.6 % (AC), availability 98.8 % (energy-based). July PR around 0.80 is normal for a hot month; compare with the temperature-corrected PR and with July of the previous year before concluding anything.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Annual energy-based availability and O&M LDs",
          given: md`O&M contract: guaranteed energy-based availability 99.0 %/yr. Year results: actual export 2,780 GWh; O&M-attributable lost energy 36 GWh; grid curtailment 20 GWh and a declared force-majeure sandstorm 5 GWh are excluded. LD = shortfall energy × tariff × 1.5, tariff assumed USD 14/MWh (illustrative — the Zone 1 tariff has not been published), capped at 20 % of the USD 9 m annual fee.`,
          steps: [
            {
              md: md`$A_E = 2{,}780/(2{,}780 + 36)$ = ?`,
              hidden: true,
              check: { prompt: "Energy-based availability (as a fraction)", answer: 0.9872, tolerance: { abs: 0.0002 } },
            },
            {
              md: md`Shortfall energy $= (0.990 - A_E) \times (2{,}780 + 36)$ = ? GWh`,
              hidden: true,
              check: { prompt: "Shortfall energy", answer: 7.84, unit: "GWh", tolerance: { rel: 0.02 } },
            },
            { md: md`LD $= 7{,}840\ \text{MWh} \times 14 \times 1.5 =$ USD 164,640 — well below the USD 1.8 m cap.` },
          ],
          result: md`Availability 98.72 %, LD ≈ USD 0.16 m. With ultra-low solar tariffs, energy-valued LDs are small relative to the O&M fee — which is why many contracts add bonus/malus bands on the fee or higher multipliers to keep the incentive meaningful.`,
        },
        {
          kind: "question",
          question: {
            id: "m12-l01-p1",
            type: "numeric",
            prompt: md`A plant has 3,125 string inverters. In a month with 360 daylight hours, total inverter downtime (non-excluded) was 9,400 inverter-hours. What is the time-based availability in %?`,
            answer: 99.16,
            unit: "%",
            tolerance: { abs: 0.02 },
            explanation: md`Available inverter-hours $= 3{,}125 \times 360 = 1{,}125{,}000$. $A_t = 1 - 9{,}400/1{,}125{,}000 = 0.99164$ → 99.16 %. If most downtime happened at midday in summer, energy-based availability would be lower than this.`,
            concepts: ["m12.availability"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "KPIs in a MEWRE operations office",
      blocks: [
        {
          kind: "md",
          md: md`### Who produces and who checks

- **O&M contractor / IPP**: operates SCADA, produces daily/monthly reports and KPI calculations per the O&M contract and PPA definitions.
- **MEWRE (offtaker) PM / performance engineer**: verifies KPIs that drive payments or LDs (availability, deemed energy, curtailment compensation), reconciles revenue meter data with the National Control Centre, reports to management.
- **OE / independent performance consultant**: periodic audits of data, sensors and calculations.
- **Tools**: SCADA/historian, monitoring platforms, Python (pvlib, RdTools) or Excel for independent checks; CMMS for maintenance records.

### Data quality — check before you calculate

| Check | Red flag |
|---|---|
| Completeness | > 2–5 % missing intervals; gaps at midday |
| Irradiance cross-check | Sensors disagree by > 2–3 %; POA vs satellite or clear-sky model drifting |
| Sensor maintenance | No daily cleaning log; calibration expired |
| Timestamps | Local vs UTC mix; daylight shift; meter clock drift |
| Energy reconciliation | Sum of inverter energy vs revenue meter differs by more than expected losses (~1.5–2.5 %) |
| Flat-lining / stuck values | Constant values for hours; zero at noon |
| Curtailment flags | Missing PPC set-point logs, making curtailment unverifiable |`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How KPIs get gamed (and how to stop it)",
          md: md`- Downtime classified as "grid event" or "force majeure" without evidence → require NCC logs or event reports.
- Time-based availability counted over 24 h instead of daylight hours → inflates availability (night hours always "available").
- Irradiance sensor left dirty → PR looks better.
- PR reported excluding "known issues" → always ask for the raw PR too.
- Monthly report recalculated with a different P0 (e.g. after module replacements) without saying so.`,
        },
        {
          kind: "checklist",
          title: "PM monthly KPI review checklist",
          items: [
            "Data completeness ≥ 98 % for irradiance and meter; gaps explained",
            "Irradiance sensors: cleaning log, calibration certificates, cross-check vs satellite",
            "Revenue meter energy reconciled with NCC/settlement data",
            "PR raw and temperature-corrected, with and without curtailment, vs P50 model and last year",
            "Availability calculated per contract definition; every exclusion evidenced",
            "Curtailment energy calculated from PPC set-points and agreed method",
            "Top 5 loss contributors identified with actions (feeds the RCA process)",
            "KPI basis stated: AC vs DC, P0 used, time vs energy",
          ],
        },
        {
          kind: "ask",
          title: "Ask the O&M contractor / IPP",
          items: [
            "Which sensors feed the PR calculation, when were they last cleaned and calibrated?",
            "How do you estimate lost energy during an outage — which reference inverters or model?",
            "Show me the evidence for each excluded event this month.",
            "What is the difference between inverter-sum energy and revenue-meter energy, and why?",
            "What is temperature-corrected PR this month vs the same month last year?",
          ],
        },
        { kind: "scenario", scenario: "m12-s1" },
        {
          kind: "feynman",
          prompt: "Explain to a senior official why a plant can show 99.2 % time-based availability and still lose more energy than a plant with 98.8 %.",
          keyPoints: [
            "Time-based availability weights all hours equally",
            "Energy-based availability weights downtime by lost energy (midday summer counts more)",
            "Exclusions and the hour basis (daylight vs 24 h) change the number",
            "Contracts should specify energy-based availability with evidenced exclusions",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m12-l01-q1",
      type: "mcq",
      prompt: "What does a dirty POA pyranometer do to the reported PR?",
      options: ["Lowers it", "Raises it (hides underperformance)", "No effect", "Only affects availability"],
      answer: 1,
      explanation: md`A dirty sensor under-reads irradiance; the reference yield falls, so PR = Yf/Yr rises. Underperformance becomes invisible.`,
      concepts: ["m12.data-quality", "m12.performance-ratio"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m12-l01-q2",
      type: "numeric",
      prompt: md`A 500 MWac / 650 MWp plant exports 1,430 GWh in a year. What is its specific yield (kWh/kWp/yr)?`,
      answer: 2200,
      unit: "kWh/kWp",
      tolerance: { rel: 0.01 },
      explanation: md`$1{,}430 \times 10^6\ \text{kWh} / 650{,}000\ \text{kWp} = 2{,}200$ kWh/kWp/yr — consistent with a bifacial tracker plant in Kuwait.`,
      concepts: ["m12.specific-yield"],
      difficulty: 1,
    },
    {
      id: "m12-l01-q3",
      type: "numeric",
      prompt: md`Same plant: what is the AC capacity factor (%)?`,
      answer: 32.65,
      unit: "%",
      tolerance: { abs: 0.1 },
      explanation: md`$1{,}430{,}000\ \text{MWh}/(500 \times 8{,}760) = 0.3265$ → 32.6 %. On a DC basis it would be 25.1 %.`,
      concepts: ["m12.specific-yield"],
      difficulty: 1,
    },
    {
      id: "m12-l01-q4",
      type: "multi",
      prompt: "Which events are commonly excluded from O&M availability calculations (if evidenced)? Select all.",
      options: [
        "Curtailment instructed by the grid operator",
        "Grid outage on the transmission side",
        "Inverter failure due to a missed preventive maintenance task",
        "Declared force majeure events",
        "Planned maintenance within agreed night windows",
      ],
      answer: [0, 1, 3, 4],
      explanation: md`An inverter failure from missed maintenance is the O&M contractor's responsibility and counts as unavailability.`,
      concepts: ["m12.availability"],
      difficulty: 1,
    },
    {
      id: "m12-l01-q5",
      type: "mcq",
      prompt: "Why is energy-based availability generally preferred for utility PV O&M contracts?",
      options: [
        "It is easier to calculate",
        "It weights downtime by the energy actually lost, aligning incentives with production",
        "It always gives a higher number",
        "IEC requires it",
      ],
      answer: 1,
      explanation: md`It motivates fast repair at high-irradiance times and discourages scheduling maintenance at midday.`,
      concepts: ["m12.availability"],
      difficulty: 1,
    },
    {
      id: "m12-l01-q6",
      type: "decision",
      prompt: md`The IPP's monthly report shows PR 0.84 in August, higher than any month last year. Irradiance from the site sensors is 6 % below the satellite estimate. What do you do?`,
      options: [
        { text: "Congratulate the IPP", score: 0.1, feedback: "An August PR above winter values with low irradiance readings is a red flag, not good news." },
        { text: "Request sensor cleaning/calibration logs and a recalculation using cross-checked irradiance (satellite or redundant sensors); flag the issue in your report as unverified", score: 1, feedback: "Right: a high PR with low irradiance points to soiled or drifting sensors." },
        { text: "Reject the report and apply LDs", score: 0.2, feedback: "No basis for LDs yet; verify first." },
      ],
      explanation: md`Physics check: August is the hottest month; temperature losses should depress PR. Low sensor irradiance vs satellite indicates under-reading sensors, inflating PR.`,
      concepts: ["m12.data-quality"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m12-l01-f1", front: "Final yield", back: md`$Y_f = E_{AC}/P_0$ (kWh/kWp)`, concepts: ["m12.specific-yield"] },
    { id: "m12-l01-f2", front: "Reference yield", back: md`$Y_r = H_{POA}/G_{STC}$ (hours of 1 kW/m²)`, concepts: ["m12.performance-ratio"] },
    { id: "m12-l01-f3", front: "Typical annual PR, desert tracker plant", back: "~0.78–0.83 (uncorrected).", concepts: ["m12.performance-ratio"] },
    { id: "m12-l01-f4", front: "Energy-based availability", back: md`$A_E = E_{act}/(E_{act}+E_{lost})$, excluding agreed events`, concepts: ["m12.availability"] },
    { id: "m12-l01-f5", front: "IEC 61724-1 class for utility plants", back: "Class A (high accuracy).", concepts: ["m12.monitoring-system"] },
    { id: "m12-l01-f6", front: "Specific yield, bifacial tracker in Kuwait", back: "~2,000–2,300 kWh/kWp/yr (indicative; resource unverified).", concepts: ["m12.specific-yield"] },
    { id: "m12-l01-f7", front: "Inverter-sum vs revenue-meter energy — expected difference", back: "~1.5–2.5 % (MV/HV transformer and cable losses, auxiliaries).", concepts: ["m12.data-quality"] },
    { id: "m12-l01-f8", front: "Capacity factor (AC)", back: md`$CF = E/(P_{AC}\cdot 8760)$ — always state AC or DC basis.`, concepts: ["m12.specific-yield"] },
  ],
  scenarios: [
    {
      id: "m12-s1",
      title: "Monday 07:30 — the operations dashboard",
      dayInLife: true,
      context: md`You are the MEWRE performance PM for a 1.1 GW PV IPP in its second year. On Monday morning you open the weekly dashboard before the 09:00 management meeting.`,
      start: "a",
      concepts: ["m12.data-quality", "m12.availability", "m12.performance-ratio"],
      nodes: {
        a: {
          md: md`You see: (1) weekly PR 0.77 vs 0.80 expected; (2) availability 99.4 %; (3) 2.1 GWh curtailment flagged on Thursday; (4) one weather station offline since Friday.`,
          choices: [
            { text: "Report PR 0.77 as underperformance at the meeting", next: "b", score: 3, feedback: "Premature: one weather station is offline and curtailment may be miscounted." },
            { text: "Before the meeting: check which sensors fed PR, whether curtailment is excluded, and request NCC confirmation of Thursday's curtailment", next: "c", score: 9, feedback: "Validate inputs first; present numbers you can defend." },
          ],
        },
        b: {
          md: md`The Undersecretary asks whether the IPP will pay LDs. Afterwards, the IPP shows the PR was calculated with the offline station's last value frozen at 1,050 W/m².`,
          choices: [{ text: "Correct the figure in a follow-up note", score: 3, feedback: "Credibility cost. Validate before you present." }],
        },
        c: {
          md: md`Findings: the offline station froze at a high value, inflating irradiance on Friday–Sunday; with the other three stations, PR is 0.795. Thursday's curtailment is confirmed by NCC at 1.6 GWh, not 2.1 GWh.`,
          choices: [
            { text: "Report PR 0.795 (validated), curtailment 1.6 GWh (NCC-confirmed), and an action for the IPP to restore the station and correct the curtailment calculation", next: "d", score: 10, feedback: "Defensible numbers plus clear actions — and you caught a 0.5 GWh overclaim of curtailment compensation." },
          ],
        },
        d: {
          md: md`At the meeting, management asks how to avoid this in future.`,
          choices: [
            { text: "Propose automated data-quality flags (stuck values, sensor disagreement > 3 %) and a monthly reconciliation of curtailment with NCC logs", score: 10, feedback: "Systemic fix — the hallmark of an experienced operations PM." },
            { text: "Ask the IPP to be more careful", score: 3, feedback: "Not a control." },
          ],
        },
      },
    },
  ],
};

export default lesson;
