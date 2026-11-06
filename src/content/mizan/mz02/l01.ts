import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz02-l01",
  title: "IEC 61724-1:2021: monitoring classes and the soiling ratio",
  summary:
    "What IEC 61724-1 asks a monitoring system to measure, how its accuracy classes differ, and exactly how the soiling ratio is defined and computed: reference devices kept clean and left soiled, current-based versus power-based ratios, temperature correction, the solar-noon window, daily aggregation and the soiling rate. Where the normative text was not available, the caveats stay explicit.",
  minutes: 70,
  objectives: [
    "Explain the purpose of the IEC 61724-1 monitoring classes and what changes between Class A and Class B for a soiling analytics product",
    "Define the soiling ratio, soiling loss and soiling rate, and compute them from paired reference-device readings with temperature correction",
    "Explain why current-based and power-based soiling ratios differ under non-uniform dust, and which one a cleaning decision needs",
    "Aggregate readings into a daily soiling ratio with a solar-noon window and irradiance weighting",
    "State which details of the 2021 edition are verified and which must be checked against the purchased standard",
  ],
  concepts: [
    {
      id: "mz02.monitoring-class",
      name: "IEC 61724-1 monitoring classes",
      description: "Accuracy classes that set sensor types, counts, sampling and recording intervals, calibration and maintenance for PV performance monitoring; Class A for utility plants and guarantees.",
      competency: "mz-soiling",
      related: ["m12.monitoring-system", "m12.data-quality"],
    },
    {
      id: "mz02.soiling-ratio",
      name: "Soiling ratio",
      description: "Output of a naturally soiled reference device divided by the output of an identical clean one, both temperature corrected; soiling loss = 1 - SR.",
      competency: "mz-soiling",
      related: ["m02.soiling"],
    },
    {
      id: "mz02.isc-vs-pmax",
      name: "Current-based vs power-based soiling ratio",
      description: "Isc ratios measure transmission loss and are nearly temperature-insensitive; Pmax ratios include non-uniform soiling effects and need accurate module temperatures.",
      competency: "mz-soiling",
      related: ["mz02.soiling-ratio"],
    },
    {
      id: "mz02.soiling-rate",
      name: "Soiling rate",
      description: "Slope of the daily soiling ratio between cleanings, in %/day; storm events appear as steps and must be separated from the slope.",
      competency: "mz-soiling",
      related: ["mz02.soiling-ratio", "m02.cleaning-strategy"],
    },
    {
      id: "mz02.clean-reference",
      name: "The clean reference device",
      description: "The device that must be kept clean (daily in dust); if it soils, SR reads too high and every cleaning decision is late.",
      competency: "mz-soiling",
      related: ["mz02.soiling-ratio"],
    },
  ],
  sections: [
    // ============================================================ THEORY
    {
      layer: "theory",
      title: "What IEC 61724-1 is and why its classes matter to Mizan",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Mizan sells soiling analytics and cleaning decisions. The first technical question from KISR, an O&M contractor or a MEWRE engineer will be "against what reference?", and the honest answer is IEC 61724-1. KISR has confirmed there is no standard method for turning operational data into cleaning decisions, but there **is** a standard for what a plant measures and how a soiling ratio is defined. Speaking that standard precisely is what makes a startup's number credible next to a research institute's.`,
        },
        {
          kind: "xref",
          to: "m12-l01",
          note: "Track 0 covers the monitoring architecture, the yields (Y_r, Y_f) and why dirty pyranometers corrupt every KPI. This lesson goes deeper on the soiling clauses.",
        },
        {
          kind: "md",
          md: md`**IEC 61724-1, Photovoltaic system performance, Part 1: Monitoring.** Edition 1 was published in 2017 and edition 2 in 2021. It does not tell you how to clean a plant. It specifies:

- **What to measure**: plane-of-array (POA) and horizontal irradiance, ambient and module temperature, wind, electrical output (DC and AC), and, where relevant, soiling, albedo and rear-side irradiance.
- **How well**: sensor classes, calibration intervals, cleaning of sensors, sampling and recording intervals, time stamping.
- **How to compute** the yields, losses and the performance ratio, and the **soiling ratio** (clause 9.4 in the 2021 edition, per the preview table of contents).
- **Monitoring classes** that bundle all of the above into a level of accuracy that a contract can name.

| Item | Class A (high accuracy) | Class B (medium accuracy) |
|---|---|---|
| Typical use | Utility plants, performance guarantees, research | Smaller commercial plants |
| Irradiance sensors | Highest-class pyranometers (ISO 9060:2018 Class A, spectrally flat) or matched reference cells, POA, with redundancy scaled to plant size | Lower-class pyranometers or reference cells |
| Sampling / recording | Commonly summarised as 3 s sampling, 1 min recording for irradiance and temperature | Longer intervals |
| Sensor cleaning and calibration | Frequent cleaning (daily in Kuwaiti dust in practice), periodic recalibration | Less frequent |
| Soiling measurement | Required when expected soiling loss is significant (see the caveat below) | Optional |

The **soiling ratio** is the standard's handle on dust: a dimensionless number, 1 when clean, that a cleaning schedule, a PR guarantee or an analytics product can all refer to.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "What is and is not verified about the 2021 edition",
          md: md`The normative text of IEC 61724-1:2021 was **not** available to the research for this module. Verified at the level of vendor summaries and the preview:
- The soiling ratio is the soiled-device output over the clean-device output, corrected for temperature (Kipp & Zonen, OTT HydroMet).
- The 2021 edition recognises **two soiling measurement methods**; Campbell Scientific markets DustVue 20 against "method 1" and DustVue 10 against "method 2".
- Practical notes: the clean device must be cleaned regularly, using data within about ±2 h of solar noon may be advisable, and the clean device may be heated against frost (irrelevant in Kuwait).

**Unverified**:
- Which numbered method is the reference-device method and which is the optical method.
- Whether the 2017 rule (soiling measurement **mandatory for Class A when expected soiling loss exceeds 2 %**, optional for B and C) is unchanged in 2021.
- How the 2021 edition restructured the classes. The 2017 edition defined Classes A, B and C; summaries of the 2021 changes (Hukseflux) could not be read, so do not state how many classes exist now.

Before any of these goes into a proposal or a methodology note with KISR, buy the standard and quote the clause.`,
        },
        { kind: "sources", refs: ["mz02-iec-61724-1-2021", "mz02-iec-61724-1-preview", "mz02-kipp-61724-news", "mz02-ott-61724-blog", "mz02-campbell-dustvue", "mz02-hukseflux-61724-2021", "mz02-iso-9060-2018"] },
      ],
    },
    {
      layer: "theory",
      title: "The soiling ratio: definition, methods and the arithmetic",
      blocks: [
        {
          kind: "md",
          md: md`### The principle

Put two identical PV reference devices side by side, at the array's tilt and orientation. Clean one every day. Leave the other to soil naturally, like the plant. Their ratio, corrected for any temperature difference, is the fraction of light (or power) the dust is costing you:`,
        },
        { kind: "equation", formula: "mz02-soiling-ratio" },
        {
          kind: "md",
          md: md`**Soiling ratio, soiling loss, soiling level** are the same information: SR 0.94 is a 6 % soiling loss. The **soiling rate** is how fast SR falls per day between cleanings.

### Which quantity X? Current or power

**Current-based (Isc).** Short-circuit current is proportional to the irradiance reaching the cells. Dust reduces transmission through the glass, so the Isc ratio measures the transmission loss. Its temperature coefficient is small ($\alpha \approx$ +0.04 to +0.06 %/°C for c-Si), so a modest temperature mismatch between the two devices hardly matters.`,
        },
        { kind: "equation", formula: "mz02-sr-isc" },
        {
          kind: "md",
          md: md`**Power-based (Pmax).** The maximum power point of each reference module is measured (I-V tracer or an MPP load). This includes what dust does to the electrical behaviour, not just to transmission: a band of dust along the lower frame edge of a module in portrait shades the bottom cells of every substring, and the bypass diodes and mismatch turn a small area loss into a larger power loss. Pmax is strongly temperature dependent ($\gamma \approx$ -0.30 to -0.45 %/°C), so each module needs its own well-bonded back-of-module temperature sensor.`,
        },
        { kind: "equation", formula: "mz02-sr-pmax" },
        {
          kind: "md",
          md: md`| | Isc-based SR | Pmax-based SR |
|---|---|---|
| Measures | Optical transmission loss | Total power effect of soiling |
| Uniform soiling | Correct | Correct |
| Non-uniform soiling (edge band, bird drops, streaks) | **Optimistic**: at short circuit the bypass diodes route around shaded cells | Captures mismatch and bypass losses |
| Temperature sensitivity | Low (α ≈ 0.05 %/°C) | High (γ ≈ 0.35 %/°C), about 7 times larger |
| Hardware | Two reference cells or modules with shunts | Two modules, I-V tracer or MPP loads, two temperature sensors |
| Cleaning decision use | Good for rate and timing when soiling is uniform | Needed where dust deposits unevenly |

**Optical sensors** (DustIQ type) are a third route: they measure the transmission loss of their own glass window with an internal light source, then map it to an SR equivalent by calibration. Lesson 3 covers them.

### Time: the solar-noon window and daily aggregation

Soiling loss depends on the **angle of incidence**: light crossing the dust layer at a grazing angle travels a longer path and scatters more. Early-morning and late-afternoon ratios therefore read dirtier than at noon, and they are also noisier (low irradiance, shading, spectral effects). The usual practice is to keep only readings within about ±2 h of solar noon above an irradiance threshold, then weight by irradiance:`,
        },
        { kind: "equation", formula: "mz02-daily-sr" },
        { kind: "equation", formula: "mz02-soiling-rate" },
        {
          kind: "chart",
          chart: "line",
          title: "Synthetic soiling-ratio record: 0.35 %/day, a dust storm on day 18, cleaning on day 30",
          xKey: "day",
          xLabel: "day",
          yLabel: "soiling ratio (%)",
          series: [
            { key: "isc", label: "Isc-based SR" },
            { key: "pmax", label: "Pmax-based SR" },
          ],
          data: [
            { day: 0, isc: 100, pmax: 100 }, { day: 2, isc: 99.3, pmax: 99.2 }, { day: 4, isc: 98.6, pmax: 98.4 }, { day: 6, isc: 97.9, pmax: 97.6 }, { day: 8, isc: 97.2, pmax: 96.8 }, { day: 10, isc: 96.5, pmax: 96 }, { day: 12, isc: 95.8, pmax: 95.2 }, { day: 14, isc: 95.1, pmax: 94.4 }, { day: 16, isc: 94.4, pmax: 93.6 }, { day: 18, isc: 89.7, pmax: 88.2 }, { day: 20, isc: 89, pmax: 87.3 }, { day: 22, isc: 88.3, pmax: 86.5 }, { day: 24, isc: 87.6, pmax: 85.7 }, { day: 26, isc: 86.9, pmax: 84.9 }, { day: 28, isc: 86.2, pmax: 84.1 }, { day: 30, isc: 100, pmax: 100 }, { day: 32, isc: 99.3, pmax: 99.2 }, { day: 34, isc: 98.6, pmax: 98.4 }, { day: 36, isc: 97.9, pmax: 97.6 }, { day: 38, isc: 97.2, pmax: 96.8 }, { day: 40, isc: 96.5, pmax: 96 }, { day: 42, isc: 95.8, pmax: 95.2 }, { day: 44, isc: 95.1, pmax: 94.4 }, { day: 46, isc: 94.4, pmax: 93.6 }, { day: 48, isc: 93.7, pmax: 92.8 }, { day: 50, isc: 93, pmax: 92 }, { day: 52, isc: 92.3, pmax: 91.1 }, { day: 54, isc: 91.6, pmax: 90.3 }, { day: 56, isc: 90.9, pmax: 89.5 }, { day: 58, isc: 90.2, pmax: 88.7 }, { day: 60, isc: 89.5, pmax: 87.9 },
          ],
          caption: "Illustrative data, not Shagaya measurements. The sawtooth is the signal: slope = soiling rate, steps = dust events, jumps back to 100 = cleanings. The Pmax-based ratio falls faster here because the synthetic dust is assumed slightly non-uniform.",
        },
        {
          kind: "flow",
          title: "From two reference devices to a daily soiling ratio",
          steps: [
            { label: "Measure", detail: "Isc or Pmax of the clean and soiled devices, plus each device's temperature and POA irradiance, every minute" },
            { label: "Correct temperature", detail: "Translate both to 25 °C with α (Isc) or γ (Pmax)" },
            { label: "Correct offset", detail: "Divide by the clean-clean ratio R0 recorded after the last joint cleaning" },
            { label: "Filter", detail: "Keep solar noon ± 2 h, irradiance above threshold, stable sky, both devices valid" },
            { label: "Aggregate", detail: "Irradiance-weighted daily SR" },
            { label: "Interpret", detail: "Fit slopes between cleanings, flag steps (storms) and jumps (cleanings, rain, wind recovery)" },
          ],
        },
        { kind: "sources", refs: ["mz02-ott-61724-blog", "mz02-kipp-61724-news", "mz02-iea-pvps-t13-21"] },
      ],
    },
    // ============================================================ APPLIED
    {
      layer: "applied",
      title: "Computing soiling ratios from station readings",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Isc-based and Pmax-based soiling ratio at one timestamp",
          given: md`Illustrative station at a Kuwait site, 12:10 local time, POA 930 W/m².
- Reference cells: clean $I_{sc,c} = 9.80$ A at $T_c = 52$ °C; soiled $I_{sc,s} = 9.25$ A at $T_s = 50$ °C; $\alpha = +0.05$ %/°C.
- Reference modules: clean $P_{max,c} = 410$ W at 60 °C; soiled $P_{max,s} = 385$ W at 58 °C; $\gamma = -0.35$ %/°C.`,
          steps: [
            { md: md`**Isc, clean, to 25 °C**: $9.80 / [1 + 0.0005 \times (52 - 25)] = 9.80 / 1.0135 = 9.670$ A.` },
            { md: md`**Isc, soiled, to 25 °C**: $9.25 / [1 + 0.0005 \times 25] = 9.25 / 1.0125 = 9.136$ A.` },
            { md: md`**$SR_I$** $= 9.136 / 9.670 = 0.945$, a soiling loss of 5.5 %. Without temperature correction: $9.25/9.80 = 0.944$. The 2 K difference barely matters for Isc.` },
            { md: md`**Pmax to 25 °C**: clean $410 / [1 - 0.0035 \times 35] = 410 / 0.8775 = 467.2$ W; soiled $385 / [1 - 0.0035 \times 33] = 385/0.8845 = 435.3$ W.` },
            { md: md`**$SR_P$** $= 435.3/467.2 = 0.932$, a 6.8 % loss. Without temperature correction: $385/410 = 0.939$, which **understates the loss by 0.7 points** because the soiled module ran 2 K cooler.` },
            { md: md`**Reading the gap**: Pmax-based loss (6.8 %) exceeds Isc-based loss (5.5 %). Part of the dust effect is electrical (uneven deposition). If the plant's modules see the same pattern, energy loss follows the Pmax number.` },
          ],
          result: md`$SR_I \approx 0.945$ and $SR_P \approx 0.932$. Report both, say which one drives the cleaning rule, and never compare an uncorrected Pmax ratio with a corrected one.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Daily soiling ratio and soiling rate",
          given: md`Four valid noon-window readings on day 12 after cleaning (illustrative): POA 820, 900, 930, 880 W/m² with SR 0.951, 0.956, 0.957, 0.953. On day 0 the daily SR was 0.992 (the morning after cleaning, before the offset was recalibrated). No rain, no storm in between.`,
          steps: [
            { md: md`**Weighted sum**: $\sum G_i SR_i = 820(0.951) + 900(0.956) + 930(0.957) + 880(0.953) = 3{,}368.9$; $\sum G_i = 3{,}530$.` },
            {
              md: md`**Daily SR**: $3{,}368.9 / 3{,}530 = 0.9544$.`,
              hidden: true,
              check: { prompt: "Daily irradiance-weighted SR (as a fraction)", answer: 0.9544, tolerance: { abs: 0.0005 } },
            },
            {
              md: md`**Soiling rate (two-point)**: $(0.992 - 0.9544)/12 = 0.00313$ per day $= 0.31$ %/day.`,
              hidden: true,
              check: { prompt: "Soiling rate (%/day)", answer: 0.313, unit: "%/day", tolerance: { abs: 0.01 } },
            },
            { md: md`**Sanity check**: 0.3 %/day sits inside the Qatar multi-year range (about 0.43 to 0.46 %/day mean with a large spread) and the working assumption for Kuwait (0.3 to 0.6 %/day, extrapolated, not measured). A real analysis fits all 12 daily values with Theil-Sen instead of using two points.` },
          ],
          result: md`Daily SR ≈ 0.954 and r ≈ 0.31 %/day. Note the day-0 value of 0.992: the devices did not read 1.000 after cleaning, which is the calibration offset that lesson 3 corrects.`,
        },
        {
          kind: "question",
          question: {
            id: "mz02-l01-p1",
            type: "numeric",
            prompt: md`Independent problem. A Pmax-based station reads, at noon: clean module 402 W at 63 °C, soiled module 371 W at 59 °C, $\gamma = -0.38$ %/°C. What is the temperature-corrected soiling loss in %?`,
            answer: 9.32,
            tolerance: { abs: 0.1 },
            unit: "%",
            explanation: md`Clean: $402/[1 - 0.0038 \times 38] = 402/0.8556 = 469.85$ W. Soiled: $371/[1 - 0.0038 \times 34] = 371/0.8708 = 426.05$ W. $SR = 426.05/469.85 = 0.9068$, so the soiling loss is 9.3 %. Uncorrected, $371/402 = 0.9229$ would suggest only 7.7 %: the soiled module running 4 K cooler hides 1.6 points of loss.`,
            concepts: ["mz02.isc-vs-pmax", "mz02.soiling-ratio"],
            difficulty: 2,
          },
        },
      ],
    },
    // ============================================================ FIELD
    {
      layer: "field",
      title: "How soiling measurement is specified and what goes wrong",
      blocks: [
        {
          kind: "md",
          md: md`**Who does what.** The EPC or owner's engineer writes the monitoring specification (usually "IEC 61724-1 Class A"), the monitoring or SCADA contractor supplies and integrates the stations, the O&M contractor cleans the sensors and the clean reference, and the asset manager or an analytics provider turns the data into decisions. A research partner such as KISR typically owns methodology and peer review.

**Documents to ask for**: monitoring design report (sensor list, positions, classes), calibration certificates of every reference device, the soiling-station cleaning log, data dictionary (tags, units, averaging), and the SCADA export of raw 1-minute data, not the dashboard values.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Common failures in soiling measurement",
          md: md`- **The clean reference is not cleaned.** SR reads too high, the plant looks cleaner than it is, cleaning is triggered late. Check the cleaning log against jumps in the clean device's signal.
- **Uncorrected device mismatch.** Two new devices differ by 0.5 to 1.5 %. Without an offset correction every SR carries that bias.
- **Uncorrected temperature** on a Pmax station: a 2 K difference is 0.7 points of SR.
- **Wrong orientation.** A fixed-tilt station beside a tracker plant measures a different dust process: deposition and accumulation depend on tilt relative to wind (Figgis et al.).
- **All-day averages** instead of a noon window: angle-of-incidence effects inflate morning and evening losses.
- **"Soiling ratio" from the irradiance sensors**: comparing a dirty and a clean pyranometer is not an SR method; pyranometer domes respond to dust differently from PV glass.`,
        },
        {
          kind: "checklist",
          title: "Checks before you trust a soiling ratio",
          items: [
            "Which quantity (Isc, Pmax, optical) and which edition and method of IEC 61724-1 is cited",
            "Temperature correction applied to both devices with stated coefficients",
            "Offset R0 recorded after joint cleaning, with dates of each recalibration",
            "Clean-device cleaning log with time of day, and evidence it is followed",
            "Station tilt, orientation and tracking match the array it represents",
            "Daily aggregation rule (window, irradiance threshold, weighting) written down",
            "Raw 1-minute data available, not only daily dashboard values",
          ],
        },
        {
          kind: "ask",
          title: "Ask the plant operator or monitoring contractor",
          items: [
            "Which IEC 61724-1 class was specified and was it ever verified after commissioning?",
            "How many soiling stations exist, where, and are they fixed or on the tracker?",
            "Who cleans the clean reference, how often, and where is the log?",
            "Is the station Isc-based, Pmax-based or optical, and what calibration has been done against local dust?",
            "Can we get the raw 1-minute data for both devices and their temperatures?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "mz02-l01-p2",
            type: "short",
            prompt: md`Applied exercise. Draft the **"Soiling ratio definition"** section (200 to 300 words) of the methodology note Mizan would share with KISR for the targeted Shagaya Phase I pilot. It must define exactly how SR is computed so that two analysts working independently on the same data get the same number.`,
            rubric: [
              "Defines SR as soiled over clean output of matched reference devices, temperature corrected, and soiling loss as 1 - SR",
              "States the measured quantity (Isc or Pmax or both) and gives the temperature-correction equations with coefficients and the source of the coefficients",
              "Specifies offset correction (R0 after joint cleaning) and its recalibration interval",
              "Specifies the time window, irradiance threshold and weighting used for the daily value, and the data validity rules",
              "Cites IEC 61724-1:2021 clause 9.4 while flagging that method numbering and class rules must be confirmed from the purchased text",
              "Keeps the pilot described as targeted or in preparation, with no invented Shagaya data",
            ],
            modelAnswer: md`**Soiling ratio definition (draft for discussion with KISR).** The soiling ratio follows IEC 61724-1:2021, clause 9.4; method numbering and class requirements will be confirmed against the purchased text before the methodology is frozen. For each station, SR is the ratio of the soiled to the clean reference device output, each translated to 25 °C. We compute both a current-based ratio $SR_I$ (Isc, corrected with $\alpha$ from the device calibration certificate) and a power-based ratio $SR_P$ (Pmax from the I-V tracer, corrected with $\gamma$ from the module datasheet, confirmed by an outdoor fit). The cleaning analysis uses $SR_P$; $SR_I$ is reported to separate optical from electrical effects. Soiling loss is $1 - SR$.

Raw ratios are divided by the offset $R_0$, the median ratio over the first three clear days after both devices are cleaned together. The offset is re-measured every 30 days and after any device maintenance; the drift between recalibrations is reported.

Readings are valid when both devices and their temperature sensors report, POA irradiance is at least 600 W/m², the time is within solar noon ± 2 h and the one-minute irradiance changes by less than 2 % between consecutive readings. The daily SR is the irradiance-weighted mean of valid readings; a day with fewer than 60 valid minutes is excluded. Days with a logged cleaning of the soiled device, rain or maintenance are flagged and kept out of slope fits. Soiling rates are Theil-Sen slopes over each interval between cleanings; dust-event steps are detected separately. All numbers in the pilot are produced from raw one-minute data with versioned code that KISR can rerun.`,
            explanation: md`A methodology definition is good when it is reproducible: quantity, corrections with coefficients and their source, offset handling, validity filters, aggregation and the rule for excluding days. Anything left to the analyst's judgement becomes a disagreement later, typically when the numbers decide who pays for cleaning.`,
            concepts: ["mz02.soiling-ratio", "mz02.isc-vs-pmax", "mz02.clean-reference"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a KISR plant engineer, without equations, why a Pmax-based soiling ratio can show more loss than an Isc-based one on the same day, and which one should decide when to clean.",
          keyPoints: [
            "Isc measures how much light gets through the dust, like a transmission measurement",
            "Uneven dust (an edge band) shades some cells more, and the module's series wiring and bypass diodes turn that into a bigger power loss",
            "At short circuit the bypass diodes hide that effect, so the Isc ratio reads optimistic",
            "Energy and revenue follow power, so the cleaning decision should use the power-based ratio where dust is uneven",
            "The power ratio needs careful temperature correction of both modules",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz02-l01-q1",
      type: "mcq",
      prompt: "A station reports SR = 0.93. What does that mean?",
      options: [
        "The soiled device produces 93 % of what the identical clean device produces, a 7 % soiling loss",
        "The plant loses 0.93 % per day to soiling",
        "The plant's performance ratio is 0.93",
        "93 % of the plant is soiled",
      ],
      answer: 0,
      explanation: md`SR is a ratio of temperature-corrected outputs, soiled over clean. 0.93 is a 7 % soiling loss at that moment. The daily slope of SR is the soiling rate; PR is a different metric that includes all losses.`,
      concepts: ["mz02.soiling-ratio"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz02-l01-q2",
      type: "multi",
      prompt: "Which statements about current-based (Isc) soiling ratios are correct?",
      options: [
        "They are much less sensitive to temperature mismatch than Pmax ratios",
        "They can read optimistic when dust deposits unevenly on the module",
        "They measure the electrical mismatch caused by soiling",
        "They still need a temperature correction for best accuracy",
      ],
      answer: [0, 1, 3],
      explanation: md`$\alpha \approx 0.05$ %/°C versus $|\gamma| \approx 0.35$ %/°C, so Isc ratios are robust to temperature, but correcting is still good practice. At short circuit, bypass diodes route current around shaded cells, so mismatch losses of non-uniform soiling are not seen.`,
      concepts: ["mz02.isc-vs-pmax"],
      difficulty: 2,
    },
    {
      id: "mz02-l01-q3",
      type: "numeric",
      prompt: md`Daily SR falls from 0.985 on day 3 to 0.930 on day 18 with no cleaning, rain or storm in between. What is the soiling rate in %/day?`,
      answer: 0.367,
      tolerance: { abs: 0.005 },
      unit: "%/day",
      explanation: md`$r = (0.985 - 0.930)/(18 - 3) = 0.055/15 = 0.00367$ per day $= 0.37$ %/day.`,
      concepts: ["mz02.soiling-rate"],
      difficulty: 1,
    },
    {
      id: "mz02-l01-q4",
      type: "mcq",
      prompt: "The O&M contractor stopped cleaning the clean reference device three weeks ago. What happens to the reported soiling ratio?",
      options: [
        "It reads too high (the plant looks cleaner), so cleaning is triggered late",
        "It reads too low, so the plant is cleaned too often",
        "Nothing, because the ratio cancels the dust",
        "It becomes noisier but unbiased",
      ],
      answer: 0,
      explanation: md`The denominator (clean output) falls, so soiled/clean rises towards 1. A threshold rule then waits too long. This is the most common station failure and the first thing to check in a cleaning log.`,
      concepts: ["mz02.clean-reference"],
      difficulty: 1,
    },
    {
      id: "mz02-l01-q5",
      type: "multi",
      prompt: "Which details of IEC 61724-1:2021 should be confirmed from the purchased normative text before quoting them to KISR?",
      options: [
        "Which numbered soiling method is the reference-device method and which is the optical method",
        "Whether soiling measurement is mandatory for Class A above a 2 % expected soiling loss",
        "How the monitoring classes changed from the 2017 edition",
        "That the soiling ratio compares a soiled device with a clean one",
      ],
      answer: [0, 1, 2],
      explanation: md`The definition of SR is well supported by multiple vendor summaries and the preview. The method numbering, the Class A threshold under the 2021 edition and the class restructuring were not verified from the normative text.`,
      concepts: ["mz02.monitoring-class"],
      difficulty: 2,
    },
    {
      id: "mz02-l01-q6",
      type: "decision",
      prompt: "A tracker plant has one soiling station, installed on a fixed-tilt frame at 25° near the control building. The client asks you to build the cleaning schedule on it. What do you do?",
      options: [
        { text: "Use it but flag it as unrepresentative, and propose a tracker-mounted station (or a data-based method) at positions representative of the array before the schedule is fixed", score: 1, feedback: "Right. Tilt relative to wind and the stow angle drive deposition; a fixed frame by the building measures a different process. Use what exists, state the limitation, and fix it." },
        { text: "Use it as is: soiling is soiling", score: 0, feedback: "Tilt and position change both deposition and natural removal. Decisions built on an unrepresentative station inherit its bias." },
        { text: "Refuse to give any schedule until new stations are installed", score: 0.4, feedback: "Too rigid. You can give a provisional schedule with stated uncertainty while better measurement is installed." },
        { text: "Average its SR with the plant PR", score: 0.1, feedback: "PR mixes every loss; averaging it with SR is not meaningful." },
      ],
      explanation: md`Representativeness is a measurement property, not a detail. Lesson 3 covers station placement.`,
      concepts: ["mz02.soiling-ratio", "mz02.monitoring-class"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz02-l01-f1", front: "Soiling ratio (IEC 61724-1)", back: md`$SR = X_{soiled}/X_{clean}$, both temperature corrected; soiling loss $= 1 - SR$.`, concepts: ["mz02.soiling-ratio"] },
    { id: "mz02-l01-f2", front: "Why Isc ratios read optimistic under uneven dust", back: "At short circuit the bypass diodes route current around shaded cells, so mismatch losses do not appear in Isc.", concepts: ["mz02.isc-vs-pmax"] },
    { id: "mz02-l01-f3", front: "Temperature sensitivity: Isc vs Pmax", back: md`$\alpha \approx +0.05$ %/°C vs $\gamma \approx -0.35$ %/°C: Pmax ratios are about 7 times more sensitive to a temperature mismatch.`, concepts: ["mz02.isc-vs-pmax"] },
    { id: "mz02-l01-f4", front: "Why use a solar-noon window", back: "Soiling loss rises at high angles of incidence and low-sun data is noisy; about ±2 h of solar noon is advised.", concepts: ["mz02.soiling-ratio"] },
    { id: "mz02-l01-f5", front: "Effect of a dirty clean reference", back: "SR reads too high, so the plant looks cleaner and cleaning comes late.", concepts: ["mz02.clean-reference"] },
    { id: "mz02-l01-f6", front: "Class A soiling rule (2017 edition)", back: "Soiling measurement required for Class A when expected soiling loss exceeds 2 %; unverified whether unchanged in 2021.", concepts: ["mz02.monitoring-class"] },
    { id: "mz02-l01-f7", front: "Soiling rate", back: "Slope of daily SR between cleanings (%/day); storms are steps, not slope.", concepts: ["mz02.soiling-rate"] },
  ],
};

export default lesson;
