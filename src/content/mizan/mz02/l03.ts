import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz02-l03",
  title: "Soiling sensors and stations in practice",
  summary:
    "The hardware behind a soiling ratio: reference-device stations with manual or automatic washing, optical transmission sensors such as DustIQ, and what each really measures. Placement and representativeness across a large plant, maintenance and calibration routines, and an uncertainty budget that tells you how many stations you need.",
  minutes: 75,
  objectives: [
    "Compare reference-device stations and optical soiling sensors on what they measure, water and maintenance needs, and error sources",
    "Place stations so they represent the array (tilt, tracking, height, dust sources, technology) and size the network for a target uncertainty",
    "Build a station uncertainty budget and combine it with spatial variability into the uncertainty of a plant-average soiling loss",
    "Write a maintenance and calibration routine that keeps station data usable in Kuwaiti dust",
  ],
  concepts: [
    {
      id: "mz02.reference-station",
      name: "Reference-device soiling station",
      description: "Two matched PV reference cells or modules, one cleaned (manually or by an automatic wash) and one left to soil, with temperature sensors and a logger.",
      competency: "mz-soiling",
      related: ["mz02.soiling-ratio", "mz02.clean-reference"],
    },
    {
      id: "mz02.optical-sensor",
      name: "Optical transmission soiling sensor",
      description: "Sensor that measures dust on its own glass window with an internal light source (DustIQ type); needs no water and no clean twin but must be calibrated to local dust.",
      competency: "mz-soiling",
      related: ["mz02.reference-station"],
    },
    {
      id: "mz02.representativeness",
      name: "Station representativeness",
      description: "Whether a station soils like the array it stands for: same tilt and tracking, height, glass, technology and exposure to dust sources; the dominant error in large plants.",
      competency: "mz-soiling",
      related: ["mz02.reference-station", "m02.soiling"],
    },
    {
      id: "mz02.station-uncertainty",
      name: "Station uncertainty budget",
      description: "Root-sum-square of device offset, offset drift, temperature correction, clean-device residual soiling and noise; combined with spatial variability over n stations.",
      competency: "mz-soiling",
      related: ["mz02.representativeness"],
    },
    {
      id: "mz02.station-maintenance",
      name: "Station maintenance and calibration",
      description: "Daily cleaning of the clean device, periodic joint cleaning and offset recalibration, sensor checks and logs; without it station data cannot support decisions.",
      competency: "mz-soiling",
      related: ["mz02.clean-reference", "m12.maintenance-strategy"],
    },
  ],
  sections: [
    // ============================================================ THEORY
    {
      layer: "theory",
      title: "What the hardware measures",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Mizan's distribution thread includes bringing hardware to Kuwait, and its analytics will be judged against whatever soiling stations exist at a site. You will be asked "should we buy sensors, and how many?" by clients who want a number and a price, and "how do you know the station is right?" by KISR. Knowing what each sensor really measures, and that the dominant error in a large plant is usually where the sensor stands rather than how good it is, lets you give an answer that survives both conversations.`,
        },
        {
          kind: "md",
          md: md`### Reference-device stations

Two matched devices (reference cells, mini-modules or full modules), mounted together at array tilt, one kept clean and one left soiled, each with a temperature sensor, a logger and usually an I-V tracer or MPP load for Pmax. The clean device is washed:
- **Manually**, by the O&M crew on a schedule. Cheap hardware, fragile process: the station is only as good as the cleaning log.
- **Automatically**, with a small pump and nozzle or wiper. Fracsun ARES is an example: clean and soiled reference cells with an automatic daily wash of the clean cell, self-powered, cellular link to a portal. Needs a water reservoir refilled periodically and inspection of the wash quality (spots, scale from hard water).

**What it measures**: the soiling ratio of PV glass like the array's, with the array's spectral response if the device technology matches. It is the method the standard prefers in vendor summaries (co-located clean and soiled PV references).

### Optical transmission sensors

An optical sensor (Kipp & Zonen **DustIQ** is the best-known example, now under OTT HydroMet) shines light from an internal source into its glass window and detects the light scattered back by particles on the surface. More dust, more scattered light, larger transmission loss. Strengths: no moving parts, no water, works at night and in cloud, small and easy to mount on a tracker. Limits:
- It measures **its own window**, not a PV module. The relation between scattered light and PV transmission loss depends on the dust's size, colour and mineralogy, so a factory calibration made with a reference dust may not match Kuwaiti dust. A site calibration against a reference-device station or controlled manual measurements is good practice.
- It sees a small area (a few square centimetres of glass), so local effects (a bird dropping, a streak) weigh heavily.
- It reports transmission loss, so like the Isc method it cannot see the electrical mismatch effect of uneven deposition across a module.

Campbell Scientific markets DustVue 20 and DustVue 10 against the two IEC 61724-1:2021 methods. Which method number corresponds to which principle is **unverified** (lesson 1).

### Data-based methods

The plant itself is a sensor: soiling can be inferred from the corrected PR or from inverter data, using cleaning-event detection and slope fits (stochastic rate and recovery, change-point methods). No hardware, every inverter is a sample, but the signal is mixed with every other loss. That is the next module's subject; for this lesson it matters as the **cross-check** a station needs.

| | Reference-device station | Optical sensor | Plant data |
|---|---|---|---|
| Measures | PV soiling ratio (Isc and/or Pmax) | Transmission loss of own window | Soiling inferred from energy |
| Water | Yes, for the clean device | No | No |
| Daily maintenance | Clean device cleaned daily (manual or automatic) | Inspection only | None |
| Main error sources | Offset drift, clean device not clean, temperature mismatch | Local-dust calibration, small sensing area | Confounding losses, cleaning-event detection |
| Spatial coverage | One point | One point | Whole plant, inverter by inverter |
| Best use | Ground truth, calibration of others | Dense networks, trackers, remote corners | Plant-wide picture, history before sensors existed |`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Vendor claims to check",
          md: md`Campbell Scientific claims about ±1 % accuracy for DustVue; Fracsun's catalogue claims "850+ units in 27+ countries" (undated), after 100 units at 52 sites in a 2020 DOE story. No Gulf deployment of DustIQ was confirmed in the research. Treat accuracy figures as manufacturer claims under their test conditions, not as field uncertainty in Kuwaiti dust.`,
        },
        { kind: "sources", refs: ["mz02-fracsun-doe", "mz02-kipp-dustiq-gep", "mz02-campbell-dustvue", "mz02-ott-61724-blog"] },
      ],
    },
    {
      layer: "theory",
      title: "Representativeness and the uncertainty of a plant-average soiling loss",
      blocks: [
        {
          kind: "md",
          md: md`### Soiling is not uniform across a plant

IEA PVPS Task 13 concludes that soiling varies within and across plants and that multi-sensor networks are needed. The physical reasons:
- **Dust sources**: unpaved access roads, the cleaning trucks themselves, construction, the upwind boundary of the plant (the first rows catch more).
- **Tilt and tracking**: deposition and accumulation depend on tilt relative to the wind (Figgis et al. 2019: deposition peaks around 45° tilted towards the wind, accumulation around 22° away from it), so a fixed station beside trackers, or a station that does not follow the tracker's night stow, soils differently.
- **Height** above ground and row position (edge rows vs interior).
- **Glass and coating**: an anti-soiling coated module and an uncoated reference do not soil alike.
- **Technology**: a thin-film reference does not have the spectral response of poly-Si; dust attenuates short wavelengths more, so technologies can see different losses from the same dust (physically expected; the magnitude is site-specific).

### How many stations?

Heuristics only (none is normative): Kipp & Zonen suggested for about 25 MW one sensor in the middle and one near each corner; Track 0 suggests at least 2 stations per about 100 MW at edge and interior positions. A better answer comes from the uncertainty you need. Combine the station's own uncertainty with the spread between locations:`,
        },
        { kind: "equation", formula: "mz02-rss" },
        { kind: "equation", formula: "mz02-plant-sr-uncertainty" },
        {
          kind: "md",
          md: md`With spatial spread $\sigma_{sp} = 1.5$ % and station uncertainty $u_{st} = 0.72$ % (both illustrative, worked out below):

| Stations n | $u_{plant}$ (1σ) |
|---|---|
| 1 | 1.67 % |
| 2 | 1.18 % |
| 4 | 0.83 % |
| 8 | 0.59 % |

The spatial term dominates. A more accurate sensor barely moves the result; more positions do. That is the economic argument for cheap optical sensors in numbers, calibrated against one or two reference-device stations, and for plant-data methods that sample every inverter.`,
        },
        {
          kind: "matrix",
          title: "Choosing a measurement strategy",
          xAxis: ["Low spatial variability", "High spatial variability"],
          yAxis: ["Low-accuracy sensors", "High-accuracy sensors"],
          cells: [
            { label: "Few good stations", detail: "Small, uniform site: two reference-device stations, maintained well, are enough" },
            { label: "Reference stations plus dense optical network", detail: "Large plant with roads and edges: calibrate many cheap sensors against a few references" },
            { label: "One station plus plant data", detail: "Uniform site, low budget: one optical sensor cross-checked with inverter-level inference" },
            { label: "Plant data first, sensors to calibrate", detail: "Large varied plant, no budget for accuracy: inverter-level inference everywhere, a few sensors to anchor it" },
          ],
          caption: "Top row is high accuracy, bottom row low accuracy. Cell order: top-left, top-right, bottom-left, bottom-right.",
        },
        { kind: "sources", refs: ["mz02-iea-pvps-t13-21", "mz02-figgis-2019", "mz02-kipp-newsletter-44", "mz02-jcgm-gum"] },
      ],
    },
    // ============================================================ APPLIED
    {
      layer: "applied",
      title: "Station uncertainty and network sizing",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Uncertainty budget of one Pmax-based reference station",
          given: md`Illustrative station, daily SR, standard uncertainties (1σ, in SR percentage points), assumed independent:
- Residual offset after the R0 correction: 0.30
- Offset drift between monthly recalibrations: 0.50
- Temperature correction (1 K uncertainty in the temperature difference × 0.35 %/K): 0.35
- Clean device not perfectly clean between daily washes (up to 0.5, uniform): $0.5/\sqrt{12} = 0.15$
- Residual noise after the noon window and daily averaging: 0.20`,
          steps: [
            { md: md`**Squares**: $0.30^2 + 0.50^2 + 0.35^2 + 0.15^2 + 0.20^2 = 0.090 + 0.250 + 0.1225 + 0.0225 + 0.040 = 0.525$.` },
            { md: md`**Combined**: $u_{st} = \sqrt{0.525} = 0.72$ points. **Expanded** ($k = 2$): $U = 1.45$ points.` },
            { md: md`**Largest term**: offset drift. Recalibrating every two weeks instead of monthly would roughly halve it if drift is linear, cutting $u_{st}$ to about 0.57.` },
            { md: md`**A subtlety**: the clean-device residual is a **bias** (the clean device is on average 0.25 points dirty, so SR reads 0.25 points high), not just noise. Correct for the mean if it is known; carry the rest as uncertainty.` },
          ],
          result: md`$u_{st} \approx 0.72$ points (k = 1), $\pm 1.45$ points at about 95 %. On a 5 % soiling loss this is good enough to time cleaning; on a 1 % loss it is not.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Offset correction and the plant average",
          given: md`After cleaning both devices on day 0, the raw ratio soiled/clean over three clear days is $R_0 = 0.988$. On day 14 the raw ratio is $R_{raw} = 0.941$. The plant has four such stations; spatial spread $\sigma_{sp} = 1.5$ %, station uncertainty 0.72 %.`,
          steps: [
            {
              md: md`**Corrected SR**: $0.941/0.988 = 0.9524$, a soiling loss of 4.8 %.`,
              hidden: true,
              check: { prompt: "Corrected soiling ratio (fraction)", answer: 0.9524, tolerance: { abs: 0.0005 } },
            },
            { md: md`**Without correction** the loss would read 5.9 %: the 1.2-point device mismatch would be reported as dust.` },
            {
              md: md`**Plant-average uncertainty**: $\sqrt{(1.5^2 + 0.72^2)/4} = \sqrt{2.775/4} = 0.83$ %.`,
              hidden: true,
              check: { prompt: "Uncertainty of plant-average soiling loss with 4 stations (%)", answer: 0.833, unit: "%", tolerance: { abs: 0.01 } },
            },
          ],
          result: md`SR 0.952 (4.8 % loss) at this station; the plant average from four stations carries about ±0.8 % (1σ), dominated by spatial spread.`,
        },
        {
          kind: "question",
          question: {
            id: "mz02-l03-p1",
            type: "numeric",
            prompt: md`Independent problem. With $\sigma_{sp} = 1.5$ % and $u_{st} = 0.72$ %, what is the smallest number of stations that brings the plant-average uncertainty to 0.6 % or below?`,
            answer: 8,
            tolerance: { abs: 0 },
            unit: "stations",
            explanation: md`$n \ge (1.5^2 + 0.72^2)/0.6^2 = 2.77/0.36 = 7.7$, so 8 stations ($u = 0.59$ %). Halving the station error to 0.36 % only lowers the requirement to $n \ge 6.6$, i.e. 7: spatial spread dominates.`,
            concepts: ["mz02.station-uncertainty", "mz02.representativeness"],
            difficulty: 2,
          },
        },
      ],
    },
    // ============================================================ FIELD
    {
      layer: "field",
      title: "Installing, maintaining and auditing stations",
      blocks: [
        {
          kind: "md",
          md: md`**Who does it.** The monitoring or SCADA contractor installs and integrates; the O&M contractor owns daily cleaning and the log; the analytics provider (Mizan) owns the data checks and the offset and calibration bookkeeping; a research partner reviews the method. Station data must go into the plant historian at 1-minute resolution with the same clock as inverter data.

**Maintenance routine (illustrative baseline for Kuwaiti dust)**

| Interval | Task |
|---|---|
| Daily | Clean the clean device (or check the automatic wash ran); automated data check for missing values, frozen signals, clean device below expectation |
| Weekly | Review SR, temperatures and Isc/Pmax plots; inspect wash quality (spots, scale) on automatic systems |
| Monthly | Clean both devices together, record $R_0$ over clear days; check temperature sensor bonding; refill wash water |
| After a dust storm | Inspect, clean the clean device, check for physical damage or sand in connectors |
| Annually | Recalibrate or swap reference devices; compare optical sensors with a reference station side by side |`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How station data dies",
          md: md`- **The cleaning log is a spreadsheet nobody fills**: you cannot tell a cleaning jump from a sensor fault.
- **Hard-water spots** from an automatic wash slowly soil the "clean" device.
- **Station on a fixed frame next to trackers**, or not following the night stow.
- **Station beside the access road**: it measures the road, not the plant.
- **Logger clock drift**: station and inverter data a few minutes apart makes noon windows and event detection wrong.
- **Optical sensors used with factory calibration** in a dust very different from the calibration dust.`,
        },
        {
          kind: "checklist",
          title: "Placement checklist",
          items: [
            "Same tilt, azimuth and tracking (including night stow) as the array it represents",
            "Same glass and coating, and for reference devices the same cell technology",
            "Positions cover upwind edge, interior and dust-source edges, away from direct road spray unless that zone is being measured",
            "Mounted at array height, not on the control building or the met mast",
            "Same logger clock (time synchronisation) as the inverter and meter data",
            "Each plant section with a different technology has its own station",
          ],
        },
        {
          kind: "ask",
          title: "Ask the sensor vendor",
          items: [
            "What exactly does the sensor measure, and how is that converted to a soiling ratio?",
            "How was it calibrated, with which dust, and can we do a site calibration against a reference station?",
            "What is the field (not laboratory) uncertainty, and where has it been validated in desert conditions?",
            "What maintenance does it need, and what happens to the data if the wash or the cleaning stops?",
            "Can it be mounted on a tracker torque tube and follow stow, and what is its power and communications interface (Modbus, analogue, cellular)?",
          ],
        },
        { kind: "scenario", scenario: "mz02-s2" },
        {
          kind: "question",
          question: {
            id: "mz02-l03-p2",
            type: "short",
            prompt: md`Applied exercise. Draft the **soiling measurement hardware section** of the targeted Shagaya Phase I pilot plan (about 250 words): how many stations of which type, where, how they are maintained and calibrated, and how their data reaches the analysis. The plant has a thin-film section and a poly-Si section; you do not yet know its layout, mounting or existing sensors, so make your assumptions explicit.`,
            rubric: [
              "Separate stations for the thin-film and poly-Si sections, with reference devices of matching technology",
              "At least one reference-device station as ground truth plus a justification for any optical sensors (calibrated against it)",
              "Placement rules (array tilt and tracking, upwind and interior positions, away from road spray, array height) and explicit assumptions where the layout is unknown",
              "A maintenance and calibration routine (daily clean device, monthly joint cleaning and R0, post-storm checks, logs) with named responsibility",
              "Data integration at 1-minute resolution on the plant clock with raw data retained",
              "A sizing argument based on uncertainty (spatial vs device) rather than a rule of thumb alone, and no invented Shagaya facts",
            ],
            modelAnswer: md`**Soiling measurement hardware (draft, assumptions to confirm on the site visit).** Assumptions: the PV plant is about 10 MW with two sections (thin-film and poly-Si) and no working soiling station; mounting type and row layout to be confirmed from KISR drawings.

Each section gets one **reference-device station** with two modules of that section's technology at array tilt and orientation (on the tracker if the section is tracked), one cleaned daily and one left soiled, both with bonded back-of-module Pt1000 sensors and an I-V tracer, so we get Isc- and Pmax-based ratios. These are the ground truth. Each section also gets **two optical sensors** at contrasting positions (upwind edge and interior), mounted at array height and tilt, calibrated on site against the reference station during the first month. That gives three positions per section; with the expected spatial spread the plant-average uncertainty is dominated by position, so additional optical sensors are cheaper than better ones and can be added after the first season if the spread is larger than expected.

**Maintenance**: KISR's O&M team (to be agreed) cleans the clean modules daily and records time and person in a shared digital log; Mizan reviews data daily and flags anomalies. Both modules are cleaned together monthly and $R_0$ re-measured over three clear days; stations are inspected after every dust event. **Data**: all signals go to the plant logger at 1-minute resolution on the same synchronised clock as the inverters; raw data is retained and exported weekly to the analysis environment.`,
            explanation: md`A credible hardware plan names types and counts per section, explains why (uncertainty, technology, representativeness), assigns the routine to people, and keeps raw data. It also states what is assumed, because the plant layout is not yet known.`,
            concepts: ["mz02.reference-station", "mz02.optical-sensor", "mz02.representativeness", "mz02.station-maintenance"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a client's finance manager why buying a more expensive soiling sensor will not make the plant's soiling number much more accurate, and what would.",
          keyPoints: [
            "Soiling differs from place to place in a plant (roads, edges, wind)",
            "One sensor, however good, measures only its spot",
            "The error from where the sensor is dominates the error of the sensor itself",
            "More positions (cheaper sensors calibrated against a good reference) or plant-wide data reduce the error",
            "Maintenance (cleaning the clean reference, recalibration) matters more than the sensor price",
          ],
        },
      ],
    },
  ],
  scenarios: [
    {
      id: "mz02-s2",
      title: "The station says clean, the inverters say dirty",
      context: md`At a Gulf client's 50 MW fixed-tilt plant (illustrative), the single soiling station near the substation shows SR 0.98, but the corrected PR of the inverters at the far, upwind edge of the site has fallen 5 points since the last cleaning while interior inverters fell 2 points. The O&M contractor wants to skip the next cleaning because "the station says it is clean".`,
      start: "a",
      concepts: ["mz02.representativeness", "mz02.station-maintenance", "mz02.reference-station"],
      nodes: {
        a: {
          md: md`What do you check first?`,
          choices: [
            { text: "The station's cleaning log and offset history, then whether its position represents the edge rows", next: "b", score: 10, feedback: "Right order: rule out a station fault (a dirty clean device reads high), then question representativeness." },
            { text: "Trust the station: it is the IEC method", score: 2, feedback: "A standard method can still be badly placed or badly maintained." },
            { text: "Trust the inverters: plant data is always right", score: 4, feedback: "Inverter PR also contains outages, clipping and sensor errors. Check before choosing." },
          ],
        },
        b: {
          md: md`The log shows the clean device was cleaned daily. The station stands 20 m from the paved substation road, sheltered by the building from the prevailing north-westerly wind. The upwind edge is next to an unpaved track.`,
          choices: [
            { text: "Conclude the station is unrepresentative; recommend cleaning the upwind blocks now (or partial cleaning by zone) and installing sensors at the edge and interior", next: "c", score: 10, feedback: "Good: you act on the best evidence for the costly zone and fix the measurement for next time." },
            { text: "Average the station and inverter numbers", score: 3, feedback: "Averaging a biased measurement with an unbiased one gives a biased answer." },
          ],
        },
        c: {
          md: md`The contractor objects that zone cleaning complicates their crew schedule.`,
          choices: [
            { text: "Show the value: upwind blocks losing 5 % versus 2 % in the interior; quantify the energy and the cost of one extra pass on those blocks only, and propose a trial", score: 10, feedback: "Turning a measurement argument into a cost argument is how analytics gets adopted by O&M teams." },
            { text: "Escalate to the asset owner immediately", score: 4, feedback: "Premature; you have not given the contractor the numbers yet." },
          ],
        },
      },
    },
  ],
  quiz: [
    {
      id: "mz02-l03-q1",
      type: "mcq",
      prompt: "What does an optical transmission soiling sensor of the DustIQ type actually measure?",
      options: [
        "Light from an internal source scattered back by dust on its own glass window, converted to a transmission loss",
        "The power ratio of two PV modules",
        "Airborne dust concentration",
        "The Isc of the nearest string",
      ],
      answer: 0,
      explanation: md`It measures its own window, which is why calibration to the local dust and the small sensing area are its main error sources.`,
      concepts: ["mz02.optical-sensor"],
      difficulty: 1,
    },
    {
      id: "mz02-l03-q2",
      type: "multi",
      prompt: "Which placements make a soiling station unrepresentative of a single-axis tracker array?",
      options: [
        "A fixed 25° frame next to the trackers",
        "On the roof of the control building",
        "On a tracker in an interior row, following the tracker including night stow",
        "Beside an unpaved access road, when that road is not typical of the array",
      ],
      answer: [0, 1, 3],
      explanation: md`Tilt, stow, height and local dust sources all change deposition and removal. The interior tracker-mounted station is the representative one.`,
      concepts: ["mz02.representativeness"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz02-l03-q3",
      type: "numeric",
      prompt: md`A station's uncertainty components (1σ, points of SR) are 0.4, 0.4 and 0.2. What is the expanded uncertainty with $k = 2$?`,
      answer: 1.2,
      tolerance: { abs: 0.01 },
      unit: "points",
      explanation: md`$u_c = \sqrt{0.16 + 0.16 + 0.04} = \sqrt{0.36} = 0.6$; $U = 2 \times 0.6 = 1.2$ points.`,
      concepts: ["mz02.station-uncertainty"],
      difficulty: 1,
    },
    {
      id: "mz02-l03-q4",
      type: "mcq",
      prompt: "Spatial spread of soiling across a plant is 1.5 % and each station's uncertainty is 0.3 %. What reduces the plant-average uncertainty most?",
      options: ["Adding stations at more positions", "Buying a sensor with 0.1 % uncertainty", "Averaging over more days", "Using Isc instead of Pmax"],
      answer: 0,
      explanation: md`$u_{plant} = \sqrt{(\sigma_{sp}^2 + u_{st}^2)/n}$; with $\sigma_{sp} \gg u_{st}$ only $n$ matters. Averaging over days does not remove a spatial bias.`,
      concepts: ["mz02.station-uncertainty", "mz02.representativeness"],
      difficulty: 2,
    },
    {
      id: "mz02-l03-q5",
      type: "order",
      prompt: "Order the station maintenance tasks from most to least frequent.",
      items: [
        "Clean the clean reference device",
        "Review SR and temperature plots",
        "Clean both devices and re-measure R0",
        "Recalibrate or swap the reference devices",
      ],
      explanation: md`Daily cleaning, weekly review, monthly joint cleaning and offset, annual recalibration (illustrative baseline for Kuwaiti dust).`,
      concepts: ["mz02.station-maintenance"],
      difficulty: 1,
    },
    {
      id: "mz02-l03-q6",
      type: "numeric",
      prompt: md`After joint cleaning the raw ratio is $R_0 = 1.006$. Ten days later the raw ratio is 0.962. What is the corrected soiling loss in %?`,
      answer: 4.37,
      tolerance: { abs: 0.03 },
      unit: "%",
      explanation: md`$SR = 0.962/1.006 = 0.9563$, loss 4.37 %. Without the correction you would report 3.8 %. The offset can go either way.`,
      concepts: ["mz02.station-maintenance", "mz02.reference-station"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz02-l03-f1", front: "Reference-device station", back: "Two matched PV devices at array tilt: one cleaned daily, one left to soil, each with a temperature sensor.", concepts: ["mz02.reference-station"] },
    { id: "mz02-l03-f2", front: "Optical soiling sensor: main limits", back: "Measures its own small window; calibration depends on local dust; no electrical mismatch effect.", concepts: ["mz02.optical-sensor"] },
    { id: "mz02-l03-f3", front: "Plant-average soiling uncertainty from n stations", back: md`$u = \sqrt{(\sigma_{sp}^2 + u_{st}^2)/n}$`, concepts: ["mz02.station-uncertainty"] },
    { id: "mz02-l03-f4", front: "Dominant error in large plants", back: "Where the sensor stands (spatial variability), not how accurate it is.", concepts: ["mz02.representativeness"] },
    { id: "mz02-l03-f5", front: "R0", back: "Ratio soiled/clean right after both devices are cleaned; divide later raw ratios by it.", concepts: ["mz02.station-maintenance"] },
    { id: "mz02-l03-f6", front: "Kipp & Zonen density suggestion", back: "About 25 MW: one sensor in the middle, one near each corner (heuristic, not normative).", concepts: ["mz02.representativeness"] },
    { id: "mz02-l03-f7", front: "Tracker plant station rule", back: "Mount on the tracker and follow its stow; tilt relative to wind drives deposition.", concepts: ["mz02.representativeness"] },
  ],
};

export default lesson;
