import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz03-l01",
  title: "The inference problem: separating soiling from temperature, degradation, clipping, curtailment, outages and sensor drift",
  summary:
    "What a plant's SCADA actually records, why soiling is only one multiplicative factor in it, and how each confounder (weather, temperature, degradation, clipping, curtailment, outages, irradiance sensor soiling and drift, atmospheric dust) leaves a different signature. The identifiability rule: from plant data alone you can see soiling changes, not the absolute soiling level.",
  minutes: 75,
  objectives: [
    "Write the performance index as a product of soiling, degradation, sensor, bias and noise factors, and say which ones the data can separate",
    "Recognise the sign and time signature of each confounder and the filter or model term that removes it",
    "Correct a daily soiling estimate for curtailment, irradiance sensor soiling and degradation, with numbers",
    "Explain why a dirty pyranometer can make a dirty plant look clean, and why daily robotic cleaning leaves almost no soiling signal to infer",
    "Draft the data request and confounder register for a soiling analytics pilot at a plant such as Shagaya Phase I",
  ],
  concepts: [
    { id: "mz03.inference-problem", name: "Soiling inference problem", description: "Estimating the soiling ratio of an array from measured energy and weather, when soiling is one of several unobserved multiplicative factors.", competency: "mz-data", related: ["m02.soiling", "m12.loss-attribution"] },
    { id: "mz03.performance-index", name: "Performance index (normalised energy)", description: "Measured energy divided by modelled expected energy for a clean plant; the time series every soiling method works on.", competency: "mz-data", related: ["m02.performance-ratio", "m12.performance-ratio"] },
    { id: "mz03.confounders", name: "Soiling confounders", description: "Weather, temperature, degradation, clipping, curtailment, outages, sensor error and atmospheric dust, each with its own sign and time signature in the performance index.", competency: "mz-data", related: ["m12.loss-signatures", "m12.data-quality", "m02.dc-ac-ratio"] },
    { id: "mz03.sensor-soiling", name: "Irradiance sensor soiling and drift", description: "A dirty or drifting pyranometer lowers expected energy and so hides plant soiling; its cleanings appear as false soiling steps.", competency: "mz-data", related: ["m12.monitoring-system"] },
    { id: "mz03.identifiability", name: "Identifiability of soiling", description: "From plant data alone only changes in soiling (rates and recoveries at cleanings) are observable; the absolute level needs a clean reference.", competency: "mz-data", related: ["m12.degradation"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What the data records, and what hides soiling",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Mizan's soiling analytics pilot targets Shagaya Phase I with KISR researchers as methodology partner, and KISR has said there is no standard method for turning operational data into cleaning decisions. Every number Mizan shows them will be attacked first on confounders: "how do you know that drop is soiling and not the pyranometer, the inverter or the heat?" If you can answer that with the mechanism and the filter, you sound like a methodology partner. If you cannot, you sound like a dashboard vendor.`,
        },
        {
          kind: "md",
          md: md`### The quantity we want and the quantity we have

What the operator needs is the **soiling ratio** of the array, $\mathrm{SR}(t)$: the power of the array as it is, divided by the power of the same array clean, under the same sun and temperature. A soiling station measures it directly (module mz02). Operational inference tries to get it from what SCADA already records: inverter energy, plane-of-array (POA) irradiance from a pyranometer or reference cell, module and ambient temperature, wind, inverter status and the power plant controller setpoint.

The bridge between them is a model of what a clean, new plant would have produced under the measured weather, $E_{\mathrm{exp}}$. The ratio of measured to expected is the **performance index**:`,
        },
        { kind: "equation", formula: "mz03-performance-index" },
        {
          kind: "md",
          md: md`If the model were perfect and soiling the only loss, PI would equal SR. It never is. Every loss that is not in the model lands in PI, and they multiply:`,
        },
        { kind: "equation", formula: "mz03-pi-decomposition" },
        {
          kind: "md",
          md: md`Soiling inference is the art of attributing changes in PI to the right factor. You cannot do it by staring at one number; you do it because each factor has a different **sign**, **time scale** and **shape**.

### The confounders, one mechanism at a time

**1. Irradiance and weather.** Energy scales almost linearly with POA irradiance, so a hazy week produces less energy with a perfectly clean array. This is handled by the model, not by filtering: $E_{\mathrm{exp}}$ uses the measured irradiance. The danger is in what irradiance you use (point 7).

**2. Temperature.** Crystalline silicon loses about 0.35 to 0.45 % of power per °C above 25 °C (thin film such as CdTe about 0.25 to 0.32 %). In Kuwait, irradiance-weighted cell temperature runs near 35 °C in January and 65 to 70 °C in July. With $\gamma = -0.40$ %/°C, that 30 to 35 °C swing moves raw PR by **12 to 14 %** between seasons: larger than a month of soiling. Uncorrected PR in summer looks like heavy soiling even after cleaning. The weather-corrected PR below is the minimum correction; a cell temperature model inside $E_{\mathrm{exp}}$ is better.`,
        },
        { kind: "equation", formula: "mz03-pr-weather-corrected" },
        {
          kind: "md",
          md: md`**3. Degradation.** Typically 0.5 to 1 %/yr, faster in hot climates. Within a 30-day soiling interval it is $0.7/12 \approx 0.06$ %: invisible. Over a multi-year baseline it is not: a model anchored at commissioning will read a 7-year-old plant as 4 to 5 % "soiled". Degradation is monotonic and has no recoveries, so it separates from soiling by time scale (RdTools' year-on-year method for degradation; CODS estimates both jointly).

**4. Clipping.** When available DC power exceeds the inverter's AC rating, output is flat at the limit. In a clipped hour, a soiled array and a clean one deliver **the same** AC energy, so soiling is invisible and PI is biased towards 1. Plants with DC/AC ratios of 1.2 to 1.35 clip for hours around noon on clear days. Remove clipped intervals (flat tops at the inverter limit, or modelled DC above the AC rating) before computing PI.

**5. Curtailment.** The power plant controller (PPC) limits export on grid instruction or for ramp and frequency control. The signature is a flat top below the inverter rating. Without the setpoint tag it can look like a sudden soiling step or an outage. Flag intervals where measured power sits within a few percent of the setpoint.

**6. Outages and availability.** An inverter trip or a string of blown fuses removes a block of capacity: an abrupt negative step in plant PI, usually with a clean recovery when repaired. Soiling declines gradually. Work per inverter (or per MPPT) and drop unavailable intervals from both numerator and denominator.

**7. Irradiance sensor soiling and drift.** The most dangerous confounder because it **divides** expected energy. If the pyranometer reads low by the factor $s_G < 1$, expected energy is too low, and PI $= \mathrm{SR}/s_G$ looks better than the truth. A pyranometer that soils at the same rate as the modules makes a dirty plant look perfectly clean. If the sensor is wiped weekly and the modules monthly, every sensor wipe shows up as a small **downward** step in PI that a naive algorithm calls soiling. Reference cells soil too. The remedy is a sensor cleaning log, redundant sensors, and a cross-check against satellite irradiance or clear-sky models.

**8. Atmospheric dust.** Aerosol optical depth over Kuwait reaches 0.75 to 2.9 in dust events (Kokkalis et al. 2018). That cuts DNI and energy but is not a plant loss. A model driven by measured POA handles it; a clear-sky model does not and will call a dusty sky a dirty array. A dust storm often does both at once: it dims the sky for a day and leaves a deposit that lasts until the next cleaning.

**9. Trackers and stow.** A tracker in wind stow or stuck at a wrong angle loses energy that a fixed-tilt model will not explain. Use measured tracker angles in the model, or flag stow periods.

| Confounder | Effect on PI | Time signature | Treatment |
|---|---|---|---|
| Irradiance, weather | none if modelled | hours to days | Expected-energy model on measured POA |
| Temperature | seasonal swing 10 to 15 % if ignored | seasonal | Cell temperature model, or weather-corrected PR |
| Degradation | slow decline | years, monotonic | Year-on-year, CODS, or re-baseline yearly |
| Clipping | biased towards 1 | hours, clear noon | Filter flat tops at AC rating |
| Curtailment | negative, flat top below rating | hours to days | Setpoint tag; flat-top filter |
| Outages | negative step, recovers on repair | abrupt | Per-inverter analysis, availability filter |
| Sensor soiling | **positive** (hides soiling); wipes look like soiling | days to weeks | Sensor log, redundancy, satellite cross-check |
| Sensor calibration drift | slow bias either way | months to years | Recalibration, cross-check |
| Atmospheric dust | none on measured POA; negative on clear-sky model | hours to days | Use measured POA; AOD flags |
| Tracker stow or fault | negative | hours to days | Measured angles; stow flags |

### The identifiability rule

Look again at the decomposition. A constant soiling level $\mathrm{SR} = 0.95$ is mathematically identical to a model bias $b = 0.95$. **No algorithm can separate them from plant data alone.** What the data can see is *change*: a gradual decline at a rate, and an abrupt rise when the array is cleaned. The cleaning events are what make soiling observable, because they are moments where SR returns (nearly) to 1 while every other factor stays put.

Three consequences you should be able to state in any meeting:
- **The absolute soiling level needs an anchor.** Either assume the array is clean just after a cleaning (what SRR does), or install a clean reference device (a soiling station).
- **Monthly cleaning, as at Shagaya, is a good regime for inference.** Each 30-day interval gives a slope and each cleaning a step.
- **Plants cleaned daily by robot fleets (reported for Al Ajban in the UAE) give almost no signal.** Soiling never accumulates enough to rise above noise. There, the question changes from "how much soiling?" to "is the robot fleet cleaning as well as it should?", which needs a soiling station or deliberately uncleaned control rows.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "One clear day on an illustrative 10 MWp block: where soiling becomes invisible",
          xKey: "time",
          xLabel: "Local time (Kuwait, UTC+3)",
          yLabel: "AC power (MW)",
          series: [
            { key: "exp", label: "Modelled clean potential" },
            { key: "meas", label: "Measured (array at SR 0.90)" },
            { key: "limit", label: "Inverter AC limit" },
          ],
          data: [
            { time: "06:30", exp: 0.97, meas: 0.87, limit: 9 },
            { time: "07:00", exp: 2.12, meas: 1.91, limit: 9 },
            { time: "07:30", exp: 3.34, meas: 3.0, limit: 9 },
            { time: "08:00", exp: 4.56, meas: 4.1, limit: 9 },
            { time: "08:30", exp: 5.74, meas: 5.17, limit: 9 },
            { time: "09:00", exp: 6.86, meas: 6.17, limit: 9 },
            { time: "09:30", exp: 7.88, meas: 7.1, limit: 9 },
            { time: "10:00", exp: 8.79, meas: 7.91, limit: 9 },
            { time: "10:30", exp: 9.56, meas: 7.0, limit: 9 },
            { time: "11:00", exp: 10.18, meas: 7.0, limit: 9 },
            { time: "11:30", exp: 10.63, meas: 7.0, limit: 9 },
            { time: "12:00", exp: 10.91, meas: 7.0, limit: 9 },
            { time: "12:30", exp: 11.0, meas: 7.0, limit: 9 },
            { time: "13:00", exp: 10.91, meas: 7.0, limit: 9 },
            { time: "13:30", exp: 10.63, meas: 9.0, limit: 9 },
            { time: "14:00", exp: 10.18, meas: 9.0, limit: 9 },
            { time: "14:30", exp: 9.56, meas: 8.61, limit: 9 },
            { time: "15:00", exp: 8.79, meas: 7.91, limit: 9 },
            { time: "15:30", exp: 7.88, meas: 7.1, limit: 9 },
            { time: "16:00", exp: 6.86, meas: 6.17, limit: 9 },
            { time: "16:30", exp: 5.74, meas: 5.17, limit: 9 },
            { time: "17:00", exp: 4.56, meas: 4.1, limit: 9 },
            { time: "17:30", exp: 3.34, meas: 3.0, limit: 9 },
            { time: "18:00", exp: 2.12, meas: 1.91, limit: 9 },
            { time: "18:30", exp: 0.97, meas: 0.87, limit: 9 },
          ],
          caption: "Synthetic data. Morning and late afternoon show the true 10 % soiling gap. From 10:30 to 13:30 a 7 MW PPC setpoint hides it; at 13:30 to 14:00 inverter clipping hides it. A PI computed over all daylight hours of this day reads about 0.81 instead of the true 0.90, and on a clipped day without curtailment it drifts towards 1. Filter first, then infer.",
        },
        {
          kind: "widget",
          widget: "pr-correction",
          caption: "A year of daily PR for a desert plant: compare basic PR with NREL weather-corrected PR. The summer dip in basic PR is temperature, not soiling; the sawtooth that remains after correction is what soiling inference works on.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Cleaning up one day of data on an illustrative block",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "From naive PI to a defensible daily soiling ratio",
          given: md`Illustrative numbers, loosely sized on a Shagaya-type block (not Shagaya data). Fixed-tilt poly-Si block, DC nameplate 10,000 kWp, $\gamma = -0.0040$/°C. Commissioning-year derate (inverter, wiring, mismatch) 0.94. Plant age 6 years, degradation 0.6 %/yr from the plant's own year-on-year analysis. Today: POA insolation from the plant pyranometer 7.20 kWh/m², irradiance-weighted cell temperature 52 °C, no curtailment, no clipping (checked), all inverters available. Measured AC energy 51,800 kWh. The pyranometer was last wiped 12 days ago; a side-by-side check with a freshly cleaned reference shows it reading 3 % low ($s_G = 0.97$).`,
          steps: [
            { md: md`**Naive expected energy** with the plant's sensor: $E_{\mathrm{exp}} = 10{,}000 \times 7.20 \times [1 - 0.004\,(52 - 25)] \times 0.94 = 72{,}000 \times 0.892 \times 0.94 = 60{,}371$ kWh. Naive PI $= 51{,}800/60{,}371 = 0.858$: "14.2 % soiling".` },
            { md: md`**Correct the sensor.** True insolation is $7.20/0.97 = 7.42$ kWh/m², so expected energy rises to $60{,}371/0.97 = 62{,}238$ kWh. PI $= 51{,}800/62{,}238 = 0.832$. The dirty pyranometer was hiding 2.6 points of loss.` },
            { md: md`**Correct for degradation.** The plant is not new: $1 - 0.006 \times 6 = 0.964$. Expected energy for a clean but 6-year-old plant: $62{,}238 \times 0.964 = 59{,}997$ kWh. PI $= 51{,}800/59{,}997 = 0.863$.` },
            { md: md`**Interpret.** The defensible estimate is $\mathrm{SR} \approx 0.863$ (soiling loss 13.7 %), *conditional* on the derate 0.94 being right and the array being clean right after its last cleaning. The naive 0.858 happened to be close only because two errors of opposite sign (sensor +2.6 points of hidden loss, degradation 3.1 points of false loss) nearly cancelled. On another day they will not.` },
          ],
          result: md`$\mathrm{SR} \approx 0.86$ after sensor and degradation corrections. The lesson is not the number but the audit trail: every correction is a named factor from the decomposition with its own evidence (cleaning log, side-by-side sensor check, year-on-year degradation).`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A curtailed day",
          given: md`Same block, another day. Expected unconstrained energy for the whole day is 60,000 kWh, of which 25,800 kWh falls in 10:30 to 13:30. During those three hours the PPC held the plant at 7 MW, so the plant delivered exactly $3 \times 7{,}000 = 21{,}000$ kWh in that window. Measured energy for the whole day is 50,400 kWh.`,
          steps: [
            { md: md`Naive daily PI over all hours $= 50{,}400 / 60{,}000$.` },
            { md: md`$= 0.840$.`, hidden: true, check: { prompt: "Naive PI over the whole day", answer: 0.84, tolerance: { abs: 0.002 } } },
            { md: md`Remove the curtailed window from **both** numerator and denominator: measured outside $= 50{,}400 - 21{,}000 = 29{,}400$ kWh; expected outside $= 60{,}000 - 25{,}800 = 34{,}200$ kWh.` },
            { md: md`Corrected PI $= 29{,}400/34{,}200 = 0.860$.`, hidden: true, check: { prompt: "PI over unconstrained hours", answer: 0.86, tolerance: { abs: 0.002 } } },
          ],
          result: md`Curtailment alone made the day look 2 points dirtier. Note that only the setpoint tag, or the flat top in the power trace, told you that 21,000 kWh was a cap and not the array's capability.`,
        },
        {
          kind: "question",
          question: {
            id: "mz03-l01-p1",
            type: "numeric",
            prompt: md`The modules on a block have a true soiling ratio of 0.90. The pyranometer used for the expected-energy model has soiled too and reads 4 % low. The model is otherwise perfect. What soiling loss (%) would a naive analysis report?`,
            answer: 6.25,
            tolerance: { abs: 0.1 },
            unit: "%",
            explanation: md`PI $= \mathrm{SR}/s_G = 0.90/0.96 = 0.9375$, so the reported loss is $1 - 0.9375 = 6.25$ % against a true 10 %. The sensor hides more than a third of the loss. If the sensor soiled at the same rate as the modules ($s_G = 0.90$), the analysis would report zero.`,
            concepts: ["mz03.sensor-soiling", "mz03.performance-index"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Data requests, sensor logs and what KISR will ask",
      blocks: [
        {
          kind: "md",
          md: md`### What a soiling inference pilot needs from the plant

For a plant like Shagaya Phase I (11.15 MW, a thin-film section and a poly-Si section, water-cleaned monthly according to the 2020 RSER paper), the data request decides the quality ceiling of everything after it.

| Data | Resolution | Why |
|---|---|---|
| AC power per inverter; DC current and voltage per MPPT if logged | 1 to 15 min | Numerator; per-inverter analysis isolates outages |
| Inverter status and alarm codes | event | Availability filter |
| PPC setpoint and grid instructions | 1 min or event | Curtailment filter |
| POA pyranometers and reference cells, with their **cleaning and calibration log** | 1 min | Denominator; sensor soiling correction |
| GHI, DNI, DHI from the met station (KISR runs radiometric stations) | 1 min | Cross-check of POA, transposition |
| Module back-surface temperature, ambient, wind | 1 to 15 min | Temperature model |
| Module cleaning log: date, rows or blocks, method (water, dry, manual) | per event | Ground truth for cleaning detection; partial cleanings |
| Maintenance and outage log | per event | Explains steps |
| Tracker angles (if any) | 1 to 15 min | Stow and misalignment |
| Single-line diagram, string layout, module datasheets, DC/AC ratio | static | Model inputs; clipping threshold |

Timestamps: Kuwait is UTC+3 all year (no daylight saving), but historians often store UTC or interval-ending stamps. A one-hour shift moves solar position enough to create a morning/afternoon residual pattern that looks like shading or soiling. Check timestamps against modelled sunrise on clear days before anything else.

The two-technology design at Shagaya is a gift: thin-film and poly-Si sections share weather, sensors and the cleaning crew, and differ in temperature coefficient. Whatever both sections show in common is weather, sensor or cleaning; differences between them test the temperature model.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "What we do not yet know about Shagaya Phase I data",
          md: md`The sensor set, logging resolution, historian, cleaning-log format and data history available for Shagaya Phase I PV are not documented in Mizan's research brief, and no 2022 to 2026 Shagaya soiling-station data was found. The pilot is targeted, not signed. Treat the table above as the request to make, not a description of what exists.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "The ways a first soiling analysis goes wrong",
          md: md`- **Using uncorrected PR** in a Kuwait summer and calling the temperature loss soiling.
- **Ignoring the pyranometer's own cleaning**: the plant looks clean, or sensor wipes look like soiling steps.
- **Computing daily PI over clipped or curtailed hours**: soiling disappears at noon on exactly the clearest days.
- **Analysing plant-level energy** when one inverter was down for a week: an outage becomes a "soiling event".
- **Claiming an absolute soiling loss** without saying what anchors it (assumed clean after cleaning, or a soiling station).
- **Wrong time zone or interval convention**: morning-afternoon asymmetry blamed on soiling or shading.`,
        },
        {
          kind: "checklist",
          title: "Before any soiling number leaves the building",
          items: [
            "Timestamps verified against modelled sunrise and solar noon on clear days",
            "Temperature handled by a cell temperature model or weather-corrected PR, not raw PR",
            "Clipped, curtailed, stowed and unavailable intervals removed from numerator and denominator",
            "Irradiance sensor cleaning and calibration history known; redundant sensor or satellite cross-check done",
            "Degradation handled (re-baselined or estimated) for any baseline older than a year",
            "The anchor for absolute soiling stated in writing",
          ],
        },
        {
          kind: "ask",
          title: "Questions to put to the O&M team and KISR",
          items: [
            "How often are the pyranometers and reference cells cleaned, by whom, and is it logged with a time?",
            "Is the module cleaning logged per block and per day, and are partial cleanings recorded?",
            "Is the PPC setpoint archived in the historian, and at what resolution?",
            "Which inverter alarm codes mean lost production, and where is the outage log?",
            "When were the irradiance sensors last calibrated, and against what reference?",
            "Is there any period when cleaning stopped or changed method, and which sections did it affect?",
          ],
        },
        { kind: "sources", refs: ["mz03-r17", "mz03-r12", "mz03-r13", "mz03-r22", "mz03-r14"] },
        { kind: "xref", to: "m12-l02", note: "Track 0, performance analysis and root cause: loss signatures and the diagnosis workflow this lesson specialises to soiling." },
        { kind: "xref", to: "m02-l05", note: "Track 0, soiling and desert design: mechanisms, rates and soiling-ratio monitoring at the PM level." },
        {
          kind: "question",
          question: {
            id: "mz03-l01-p2",
            type: "short",
            prompt: md`Produce the **confounder register and data request** that Mizan would send to KISR and the Shagaya Phase I O&M team before the soiling analytics pilot. For each confounder from this lesson, give: the signature you expect in Shagaya data, the data item that lets you remove it, and what you do if that data is missing. End with one sentence stating how the absolute soiling level will be anchored.`,
            rubric: [
              "Covers at least six confounders, including temperature, clipping or curtailment, outages and irradiance sensor soiling",
              "Gives a correct signature for each (sign and time scale), in particular that sensor soiling hides plant soiling",
              "Names a concrete data item or log for each (PPC setpoint tag, inverter status codes, sensor cleaning log, cleaning log per block)",
              "Has a credible fallback when data is missing (flat-top detection, per-inverter comparison, satellite irradiance cross-check)",
              "Uses Shagaya specifics correctly (monthly water cleaning, two technologies as a comparison) without inventing facts about the plant",
              "States the anchor for absolute soiling (clean after cleaning assumption or a clean reference device) and its limitation",
            ],
            modelAnswer: md`**Confounder register, Shagaya Phase I pilot (draft for KISR).**
1. **Temperature**: seasonal swing of 10 to 15 % in raw PR (summer cell temperature 65 to 70 °C). Data: module back temperature, ambient, wind. Fallback: SAPM model from ambient and wind; validate thin-film vs poly-Si sections, which differ in temperature coefficient.
2. **Clipping**: flat tops at inverter AC rating on clear noons, PI biased to 1. Data: inverter ratings and DC/AC ratio, 1 to 5 min power. Fallback: drop intervals within 2 % of the rating.
3. **Curtailment**: flat tops below rating. Data: PPC setpoint tag and grid instructions. Fallback: flat-top detector plus dispatch log from MEWRE.
4. **Outages**: abrupt negative steps on one inverter. Data: status and alarm codes, outage log. Fallback: per-inverter PI and drop inverters that deviate from the median of their peers.
5. **Irradiance sensor soiling and calibration**: sensor soiling hides module soiling; sensor wipes look like small soiling steps. Data: sensor cleaning and calibration log, redundant sensors. Fallback: compare POA with transposed KISR station GHI/DNI and satellite irradiance; use clear-sky days.
6. **Degradation**: about 0.5 to 1 %/yr since commissioning. Data: the whole history. Fallback: re-baseline the model each year on post-cleaning days.
7. **Atmospheric dust**: dim days, not losses, if measured POA is used. Data: POA plus AOD from CAMS or AERONET for flags. Fallback: exclude dust-storm days from slope fits and treat the post-storm level as a step.
8. **Cleaning itself**: monthly water cleaning gives 30-day intervals and recovery steps. Data: cleaning log by block and date, method, partial cleanings.

**Anchor**: absolute soiling will be anchored by assuming each block is clean on the first valid day after a logged full cleaning; we will test that assumption against any clean reference device KISR can provide, and report results as relative to that anchor until then.`,
            explanation: md`A strong register is organised by mechanism, not by data source, and every line ends in an action. The two points reviewers check first are the irradiance sensor (because it hides soiling) and the anchor (because without it any absolute loss is an assumption).`,
            concepts: ["mz03.confounders", "mz03.sensor-soiling", "mz03.identifiability"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to an O&M manager at Shagaya why your analysis needs the pyranometer cleaning log, and why a plant cleaned every day by robots gives you less to work with than one cleaned monthly.",
          keyPoints: [
            "Expected energy is computed from the pyranometer, so a dirty sensor makes expected energy too low and the plant look cleaner than it is",
            "Sensor wipes appear as false downward steps in the performance index",
            "Soiling is only observable through change: gradual decline and recovery at cleanings",
            "Daily cleaning keeps soiling below the noise, so the method needs a soiling station or uncleaned control rows instead",
            "The absolute level always needs an anchor such as clean-after-cleaning or a clean reference",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz03-l01-q1",
      type: "mcq",
      prompt: "A plant shows a steady soiling ratio of 0.95 in every interval, with no visible cleaning steps. What can plant data alone tell you about the absolute soiling level?",
      options: [
        "It is 5 %, because PI is 0.95",
        "Nothing: a constant soiling level cannot be separated from a constant model bias without an anchor such as a cleaning event or a clean reference",
        "It is zero, because there is no decline",
        "It is 5 % minus the degradation rate",
      ],
      answer: 1,
      explanation: md`In PI $= \mathrm{SR}\cdot b \cdots$, a constant SR and a constant bias $b$ are indistinguishable. Soiling becomes observable through changes (declines and recoveries) or a clean reference device.`,
      concepts: ["mz03.identifiability"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "mz03-l01-q2",
      type: "multi",
      prompt: "Which effects push the measured performance index **up** (making a soiled plant look cleaner)? Select all that apply.",
      options: [
        "A pyranometer that has soiled since its last wipe",
        "Including clipped noon hours in the daily PI",
        "A tripped inverter left in the plant-level energy",
        "Ignoring 6 years of degradation in the model",
        "A pyranometer calibration that drifted to read 2 % low",
      ],
      answer: [0, 1, 4],
      explanation: md`A sensor that reads low (from soiling or drift) lowers expected energy, so PI rises. Clipped hours deliver the limit whatever the soiling, so they pull PI towards 1. An outage and unmodelled degradation both push PI **down**, mimicking soiling.`,
      concepts: ["mz03.confounders", "mz03.sensor-soiling"],
      difficulty: 2,
    },
    {
      id: "mz03-l01-q3",
      type: "numeric",
      prompt: md`Irradiance-weighted cell temperature is 35 °C in January and 68 °C in July. The modules have $\gamma = -0.40$ %/°C. Roughly how many percentage points lower is uncorrected PR in July than in January from temperature alone?`,
      answer: 13.2,
      tolerance: { abs: 0.3 },
      unit: "percentage points (of PR, relative)",
      explanation: md`$(68 - 35) \times 0.40 = 13.2$ %. That is more than a month of soiling at 0.4 %/day, which is why temperature correction comes before any soiling claim.`,
      concepts: ["mz03.confounders"],
      difficulty: 1,
    },
    {
      id: "mz03-l01-q4",
      type: "mcq",
      prompt: "The pyranometer is wiped every Thursday; the modules are cleaned monthly. What does a naive soiling algorithm see on Thursdays?",
      options: [
        "Nothing, because sensor cleaning does not affect energy",
        "A small upward step that looks like a partial cleaning",
        "A small downward step in PI that it may call soiling or a soiling event",
        "A change in the degradation rate",
      ],
      answer: 2,
      explanation: md`After the wipe the sensor reads more irradiance, expected energy rises, and PI drops by the sensor's accumulated soiling, though the array did not change.`,
      concepts: ["mz03.sensor-soiling"],
      difficulty: 2,
    },
    {
      id: "mz03-l01-q5",
      type: "decision",
      prompt: md`Your first analysis of a Gulf plant shows a sharp 8 % drop in plant-level PI on one day, with recovery 6 days later. The cleaning log shows no cleaning on the recovery day. What do you do first?`,
      options: [
        { text: "Report a dust-storm soiling event of 8 % with natural recovery by wind.", score: 0.2, feedback: "Possible, but you are reporting the least checked hypothesis. Abrupt drops with clean recoveries are the signature of outages." },
        { text: "Split PI by inverter and check status codes and the outage log for those 6 days.", score: 1, feedback: "Right. If one inverter of twelve was down, plant PI drops about 8 % and recovers on repair. Only after ruling that out do you consider a dust event, checked against AOD and wind." },
        { text: "Exclude the 6 days and move on.", score: 0.4, feedback: "Safe for the soiling fit, but you lose the chance to learn whether it was an outage (an O&M finding) or a real soiling event." },
      ],
      explanation: md`Abrupt drop plus abrupt recovery without cleaning points first to availability. Work per inverter before attributing anything to soiling.`,
      concepts: ["mz03.confounders"],
      difficulty: 2,
    },
    {
      id: "mz03-l01-q6",
      type: "mcq",
      prompt: "Why is a plant cleaned daily by robots a poor candidate for inferring the soiling rate from SCADA data?",
      options: [
        "Robots damage the SCADA sensors",
        "Soiling never accumulates far enough above the noise between cleanings to fit a rate or see a recovery step",
        "Daily cleaning removes the temperature effect",
        "Robots do not log their cleanings",
      ],
      answer: 1,
      explanation: md`At 0.4 %/day, one day of soiling is far below the 1 to 2 % day-to-day noise in PI. The question for such plants becomes cleaning quality, measured with soiling stations or uncleaned control rows.`,
      concepts: ["mz03.identifiability", "mz03.inference-problem"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "mz03-l01-f1", front: "Performance index", back: md`$\mathrm{PI} = E_{\mathrm{meas}}/E_{\mathrm{exp}}$: measured over modelled clean-plant energy. Every unmodelled loss ends up in it.`, concepts: ["mz03.performance-index"] },
    { id: "mz03-l01-f2", front: "What makes soiling observable in plant data?", back: "Change: the gradual decline between cleanings and the recovery step at a cleaning. A constant level is indistinguishable from model bias.", concepts: ["mz03.identifiability"] },
    { id: "mz03-l01-f3", front: "Effect of a dirty pyranometer on inferred soiling", back: md`PI $= \mathrm{SR}/s_G$ rises: it hides soiling. If the sensor soils as fast as the modules, inferred soiling is zero.`, concepts: ["mz03.sensor-soiling"] },
    { id: "mz03-l01-f4", front: "Why filter clipped hours?", back: "In a clipped interval a soiled and a clean array deliver the same AC energy, so soiling is invisible and PI is biased towards 1.", concepts: ["mz03.confounders"] },
    { id: "mz03-l01-f5", front: "Signature of an outage vs soiling", back: "Outage: abrupt negative step on one inverter, abrupt recovery on repair. Soiling: gradual decline on all inverters, recovery at cleaning.", concepts: ["mz03.confounders"] },
    { id: "mz03-l01-f6", front: "Seasonal temperature swing of raw PR in Kuwait", back: "About 12 to 14 % for crystalline silicon (cell temperature roughly 35 °C in January vs 65 to 70 °C in July at −0.4 %/°C).", concepts: ["mz03.confounders"] },
    { id: "mz03-l01-f7", front: "Kuwait time zone for SCADA checks", back: "UTC+3 all year, no daylight saving. Verify historian stamps against modelled sunrise on clear days.", concepts: ["mz03.inference-problem"] },
  ],
};

export default lesson;
