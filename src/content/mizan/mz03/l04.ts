import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz03-l04",
  title: "Satellite and reanalysis proxies: CAMS and MERRA-2 dust, aerosol optical depth, commercial soiling models and their uncertainty",
  summary:
    "What reanalysis and satellite products actually measure (column aerosol optical depth, modelled surface particulate concentration) and the long chain from there to a soiling loss on tilted glass. CAMS EAC4 and forecasts, MERRA-2, AERONET in Kuwait, the HSU and Kimber deposition models in pvlib, the Solargis and Solcast soiling products, and how to use proxies honestly: as timing priors, event flags and calibrated extrapolations, never as the measurement of record.",
  minutes: 75,
  objectives: [
    "Distinguish aerosol optical depth, surface PM concentration, deposition flux and soiling ratio, and say which one each data product gives",
    "Describe CAMS EAC4, CAMS forecasts and MERRA-2: resolution, period, time base, and what they assimilate",
    "Compute accumulated dust mass and soiling ratio with the HSU model, and a site calibration factor against plant data",
    "List the main error sources of proxy soiling models in Kuwait and the published validation evidence for commercial products",
    "Design a proxy-use policy for a product such as Mizan's planned Kuwait dust and soiling atlas",
  ],
  concepts: [
    { id: "mz03.aerosol-reanalysis", name: "Aerosol reanalysis (CAMS, MERRA-2)", description: "Global atmospheric models that assimilate satellite aerosol observations to give gridded AOD and surface particulate concentrations over decades, at tens of kilometres resolution.", competency: "mz-data", related: ["m02.solar-resource-data"] },
    { id: "mz03.aod-vs-pm", name: "AOD versus surface PM", description: "AOD is a column optical quantity that dims the sun; surface PM is mass near the ground that deposits on modules; they can diverge when dust is lofted aloft.", competency: "mz-data" },
    { id: "mz03.deposition-model", name: "Deposition-based soiling models (HSU, Kimber)", description: "Models that accumulate dust mass from PM concentration and deposition velocity (HSU) or apply a constant rate reset by rain (Kimber), converting to a soiling ratio.", competency: "mz-data", related: ["m02.soiling"] },
    { id: "mz03.commercial-soiling-models", name: "Commercial soiling models", description: "Solargis and Solcast soiling products driven by MERRA-2 and CAMS particulate data, with published validation showing compression towards the mean.", competency: "mz-data" },
    { id: "mz03.proxy-calibration", name: "Proxy calibration and fusion", description: "Using a proxy for timing and spatial pattern, with its level calibrated to local ground truth and the calibration tested out of sample.", competency: "mz-data", related: ["mz03.srr"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "From a dusty atmosphere to dust on glass",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Most Gulf plants have no soiling station, and many prospects will ask why they should not just buy a soiling time series from Solargis or Solcast. Proxies are also how Mizan scales beyond one instrumented plant, and the basis of the planned open-source Kuwait dust and soiling atlas. You need to know exactly what these products can and cannot say, so you can use them as a strength (coverage, forecasts) without overclaiming (site-level loss).`,
        },
        {
          kind: "flow",
          title: "The causal chain, and where each data product sits",
          steps: [
            { label: "Emission", detail: "Dust lifted from source regions (Iraq and Iran contribute significantly to Kuwait dust) and local sources" },
            { label: "Column AOD", detail: "Satellites and AERONET see this: how much the whole atmosphere dims the sun" },
            { label: "Surface PM", detail: "Reanalysis diagnostic: PM2.5, PM10, dust mass near the ground" },
            { label: "Deposition", detail: "Modelled: concentration times deposition velocity; depends on particle size, wind, tilt, surface stickiness" },
            { label: "Adhesion", detail: "Dew and cementation fix particles; wind and rain remove them" },
            { label: "Soiling ratio", detail: "Optical loss on the glass; only plant data or a soiling station see this" },
          ],
          caption: "Each arrow adds uncertainty. A product that starts at AOD and ends at soiling ratio has crossed four modelled links.",
        },
        {
          kind: "md",
          md: md`### Four quantities that people confuse

- **Aerosol optical depth (AOD)**, usually at 550 nm (500 nm at AERONET): a column-integrated, dimensionless measure of how much aerosol attenuates sunlight. Over Kuwait City the AERONET record (Kokkalis et al. 2018, 2008 to 2017) shows AOD500 reaching 0.75 to 2.91 in dust events, with sand and dust storms on about 20 days a year. AOD dims DNI, so it matters for **expected energy**; satellite irradiance products already include it.
- **Surface particulate concentration** (PM2.5, PM10, dust surface mass, in µg/m³): mass in the air near the ground. This is what deposits. Reanalyses provide it as a modelled diagnostic, not a direct observation.
- **Deposition flux** (g/m²/day): concentration times a deposition velocity, for each size class, onto a surface at a tilt. Purely modelled.
- **Soiling ratio**: the optical consequence on the glass, after adhesion, dew cementation and removal by wind, rain and crews.

AOD and surface PM can diverge: dust transported aloft raises AOD with little surface deposition; a local haboob or construction plume can do the opposite.

### The datasets

| Product | Who | Coverage | Resolution | Use for Mizan |
|---|---|---|---|---|
| CAMS global reanalysis (EAC4) | ECMWF, Copernicus | 2003 onwards | About 0.75° (roughly 80 km), 3-hourly | History of AOD, PM, dust; event climatology |
| CAMS global forecasts | ECMWF, Copernicus | Live, several days ahead | About 0.4° (roughly 40 km) | Dust-event warnings for cleaning and stow planning |
| MERRA-2 | NASA GMAO | 1980 onwards | 0.5° by 0.625°, hourly aerosol diagnostics | Long history of AOD and dust surface mass |
| AERONET Kuwait University | NASA network | Since 2008 | Point, sun photometer | Ground truth for AOD (not for deposition) |

Both reanalyses assimilate satellite aerosol observations, which constrains AOD far better than surface concentration. All timestamps are **UTC**: three hours off Kuwait local time. A MERRA-2 cell at 29° N is about 56 km by 61 km, some 3,400 km²: it averages Shagaya together with large areas of open desert, roads and farms. Local sources invisible at that scale (unpaved access roads, construction, a nearby quarry) can dominate soiling at a specific site.

### Deposition models you can run yourself (pvlib)

The **HSU model** (Coello and Boyle 2019) accumulates mass from PM2.5 and coarse PM:`,
        },
        { kind: "equation", formula: "mz03-hsu-mass" },
        { kind: "equation", formula: "mz03-hsu-sr" },
        {
          kind: "md",
          md: md`Mass resets when rain over the accumulation window exceeds a cleaning threshold. In Kuwait that happens a few times each winter at most, so in practice the reset is the cleaning crew, which the model does not know about: you must feed it the cleaning log.

The **Kimber model** (2006) is simpler: a constant soiling rate, reset by rain above a threshold, with a grace period after rain and a maximum loss. pvlib's defaults (6 mm threshold, 0.15 %/day, 14-day grace period, 30 % cap) come from California experience and say nothing about Kuwait.

Neither model knows about dew. Qatar work (QEERI, Fraunhofer CSP) shows dew dissolves soluble species and recrystallises them as the glass dries, cementing particles. Kuwait winter nights with high humidity are exactly when mass-based models underestimate stickiness. A 2026 EGU study found mass-balance soiling models very sensitive to deposition parameters and called for co-located atmospheric, dust-mass and soiling-loss data.

### Commercial soiling products

- **Solargis** models soiling from PM2.5 and PM10 taken from MERRA-2 and CAMS EAC4. Its own validation against 51 ground stations reports that the model **overestimates where soiling is low and underestimates where it is high**, and that wet deposition is not modelled.
- **Solcast** uses MERRA-2 particulate data for history and CAMS for live and forecast soiling (blog of 18 December 2025).
- Independent literature: in Australia, MERRA-2 beat CAMS on dust AOD near Lake Eyre (Applied Energy 2022); in West Africa an adjusted Coello model driven by MERRA-2 and satellite PM roughly halved the error (Applied Energy 2023).

The pattern "too high where low, too low where high" is typical of a coarse proxy: it is compressed towards the regional mean. Kuwait is a high-soiling site, so the expected direction of error there is an **underestimate**, until a local calibration shows otherwise.

### Where the uncertainty comes from

| Source | Effect in Kuwait | Can local data fix it? |
|---|---|---|
| Grid cell of 3,000 to 6,000 km² | Misses local sources and microclimate | Partly: a site factor |
| Surface PM is modelled, not observed | Event timing good, magnitude uncertain | Partly: compare with local PM monitors |
| Deposition velocity | Factor of several uncertainty | Yes: calibrate against plant or station rates |
| Dew and cementation | Underestimates winter stickiness | Partly: humidity and dew-point terms |
| Wind resuspension | Overestimates during windy clear spells | Partly |
| Cleaning schedule unknown to the model | Profile meaningless without the log | Yes: feed the log |
| Tilt, tracker stow angle | Deposition depends on angle to the wind | Yes: use actual angles |

### Using a proxy honestly

1. **Timing prior and event flag**: AOD or dust mass spikes tell you when a step in PI is likely a dust event (lessons 2 and 5).
2. **Regressor**: dust mass as an explanatory variable for interval-to-interval rate changes.
3. **Calibrated extrapolation**: keep the proxy's time pattern and correct its level with a site factor:`,
        },
        { kind: "equation", formula: "mz03-proxy-calibration" },
        {
          kind: "md",
          md: md`4. **Forecasting**: CAMS forecasts to pre-position cleaning crews and inform stow decisions (module mz05).
5. **Never the measurement of record** for a contract or a validation claim. That needs plant data or a soiling station.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "Proxy, calibrated proxy and plant estimate over one cleaning interval (illustrative)",
          xKey: "day",
          xLabel: "Days since full cleaning",
          yLabel: "Soiling ratio",
          series: [
            { key: "model", label: "HSU from reanalysis PM (uncalibrated)" },
            { key: "cal", label: "HSU calibrated, k = 1.77" },
            { key: "plant", label: "Plant SRR estimate, 0.40 %/day" },
          ],
          data: [
            { day: 0, model: 1, cal: 1, plant: 1 }, { day: 3, model: 0.99, cal: 0.983, plant: 0.988 }, { day: 6, model: 0.983, cal: 0.969, plant: 0.976 },
            { day: 9, model: 0.975, cal: 0.956, plant: 0.964 }, { day: 12, model: 0.969, cal: 0.944, plant: 0.952 }, { day: 15, model: 0.962, cal: 0.933, plant: 0.94 },
            { day: 18, model: 0.956, cal: 0.922, plant: 0.928 }, { day: 21, model: 0.95, cal: 0.911, plant: 0.916 }, { day: 24, model: 0.944, cal: 0.9, plant: 0.904 },
            { day: 27, model: 0.938, cal: 0.89, plant: 0.892 }, { day: 30, model: 0.932, cal: 0.88, plant: 0.88 },
          ],
          caption: "Synthetic: PM2.5 50 µg/m³ and PM10 150 µg/m³ constant, tilt 25°, pvlib default deposition velocities. The uncalibrated proxy understates soiling by almost half; one calibration factor fixes the end point, but the shapes differ (HSU saturates, the plant estimate is linear). Calibrate on some intervals and test on others.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Running the HSU model and calibrating it",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Thirty days of dust on a fixed-tilt array",
          given: md`Illustrative constant surface concentrations for a dusty month: PM2.5 = 50 µg/m³ = $50 \times 10^{-6}$ g/m³, PM10 = 150 µg/m³. Deposition velocities (pvlib defaults) $v_{2.5} = 0.0009$ m/s, $v_{10} = 0.004$ m/s. Tilt 25°. No rain. Plant SRR over the same interval gives 0.40 %/day.`,
          steps: [
            { md: md`**Flux:** $50\times10^{-6} \times 0.0009 + (150-50)\times10^{-6} \times 0.004 = 4.5\times10^{-8} + 4.0\times10^{-7} = 4.45\times10^{-7}$ g/m²/s. Coarse particles carry 90 % of it.` },
            { md: md`**Per day, tilted:** $4.45\times10^{-7} \times 86{,}400 = 0.0385$ g/m²/day; times $\cos 25° = 0.906$ gives 0.0349 g/m²/day.` },
            { md: md`**After 30 days:** $\omega = 1.045$ g/m². $\omega^{0.8473} = 1.038$; $0.17 \times 1.038 = 0.176$; $\operatorname{erf}(0.176) = 0.197$; $\mathrm{SR} = 1 - 0.3437 \times 0.197 = 0.932$.` },
            { md: md`**Average modelled rate:** $(1 - 0.932)/30 = 0.226$ %/day, against 0.40 %/day from the plant.` },
            { md: md`**Calibration factor:** $k = 0.40/0.226 = 1.77$. The proxy understates soiling by 44 % at this site, consistent with the "low where high" pattern of coarse models.` },
          ],
          result: md`One calibration interval gives k = 1.77. It means nothing until tested on other intervals: if k is stable across seasons, the proxy's timing is useful; if it swings from 1.2 in summer to 2.5 in winter, the model is missing a mechanism (dew, most likely) and needs a humidity term, not a bigger k.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Applying the calibration to a new month",
          given: md`Next month the uncalibrated HSU model predicts SR = 0.950 at day 30 after cleaning. Use k = 1.77. The plant later shows SR = 0.900 at day 30.`,
          steps: [
            { md: md`Modelled loss at day 30 $= 1 - 0.950 = 5.0$ %.` },
            { md: md`Calibrated loss $= 1.77 \times 5.0$ %.` },
            { md: md`$= 8.85$ %, so calibrated SR $= 0.9115$.`, hidden: true, check: { prompt: "Calibrated SR at day 30", answer: 0.9115, tolerance: { abs: 0.002 } } },
            { md: md`Error of the calibrated proxy against the plant: $0.9115 - 0.900 = +0.0115$, i.e. it understates the loss by about 1.2 points (the uncalibrated proxy understated it by 5 points).`, hidden: true, check: { prompt: "Calibrated minus plant SR", answer: 0.0115, tolerance: { abs: 0.002 } } },
          ],
          result: md`Calibration removed most of the bias out of sample. Report this kind of out-of-sample error, not the fit on the calibration interval, as the proxy's skill.`,
        },
        {
          kind: "question",
          question: {
            id: "mz03-l04-p1",
            type: "numeric",
            prompt: md`A MERRA-2 grid cell is 0.5° in latitude by 0.625° in longitude. At 29° N, with 111.2 km per degree of latitude, roughly what area does it cover (km²)?`,
            answer: 3380,
            tolerance: { rel: 0.03 },
            unit: "km²",
            explanation: md`North-south $0.5 \times 111.2 = 55.6$ km; east-west $0.625 \times 111.2 \times \cos 29° = 60.8$ km; area $\approx 3{,}380$ km². An 11 MW plant covers a fraction of a square kilometre of that cell.`,
            concepts: ["mz03.aerosol-reanalysis"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Buying, building and positioning proxy soiling data",
      blocks: [
        {
          kind: "md",
          md: md`### How proxies are used in practice

- **Developers and lenders** use commercial soiling estimates in energy yield assessments where no site data exists, as a monthly loss profile, often with a generous uncertainty.
- **Operators** use dust forecasts (CAMS-based or national meteorological services) to plan crews and, on trackers, to consider stow.
- **Analysts** use reanalysis to label events and explain rate changes in plant data.

For Mizan, the defensible product is a **fusion**: plant-data inference where cleaning regimes allow it, soiling stations where they exist, and proxies for timing, forecasts and plants without data, calibrated and tested against the first two. The planned open-source Kuwait dust and soiling atlas is a natural vehicle: reanalysis climatology plus whatever calibrated site factors can be published with partners such as KISR.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "What is not known about commercial products in Kuwait",
          md: md`The research brief found no published Kuwait-specific validation of the Solargis or Solcast soiling models, and their exact model formulations are proprietary. The Solargis validation summary (51 stations, compression towards the mean, no wet deposition) and the Solcast data sources are from the vendors' own pages, read at snippet level and undated in Solargis' case. Do not quote vendor error figures for Kuwait until a site comparison exists.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Common proxy mistakes",
          md: md`- **Treating AOD as soiling**: a high-AOD day is a dim day; it may or may not leave a deposit.
- **Mixing UTC reanalysis with local-time SCADA**: a 3-hour shift misaligns every dust event.
- **Running a deposition model without the cleaning log**: it produces the soiling of a plant nobody cleans.
- **Calibrating and testing on the same interval**: the reported skill is meaningless.
- **Quoting a regional soiling rate for a site next to an unpaved road or construction**.
- **Using Kimber's default parameters** outside the climate they came from.`,
        },
        {
          kind: "checklist",
          title: "Before using a proxy soiling estimate",
          items: [
            "Know which quantity the product gives (AOD, PM, deposition, SR) and its grid size and time base",
            "Feed actual cleaning dates and tilt or tracker angles into any deposition model",
            "Calibrate the level against plant SRR or a soiling station, and test out of sample",
            "Check calibration stability by season (dew season vs dry summer)",
            "Report out-of-sample error and the direction of bias",
            "State in writing that the proxy is not the measurement of record",
          ],
        },
        {
          kind: "ask",
          title: "Questions to put to a commercial soiling data vendor",
          items: [
            "Which particulate inputs and deposition velocities do you use, and are they tuned by region?",
            "How many validation stations are in the Gulf, and what is your bias at high-soiling sites?",
            "How do you treat dew, wind resuspension and rain in an arid climate?",
            "Can you ingest our cleaning log and tracker angles, or is the output a natural (uncleaned) soiling curve?",
            "What is the time base of your data, and how are dust-storm events represented?",
          ],
        },
        { kind: "sources", refs: ["mz03-r18", "mz03-r19", "mz03-r20", "mz03-r21", "mz03-r22", "mz03-r23", "mz03-r24", "mz03-r25", "mz03-r26", "mz03-r27"] },
        { kind: "xref", to: "fc05-l03", note: "Founder Core, open source and community: how an open atlas or dataset builds credibility with technical buyers and researchers." },
        {
          kind: "question",
          question: {
            id: "mz03-l04-p2",
            type: "short",
            prompt: md`Write the **method note (one page) for version 0 of Mizan's open-source Kuwait dust and soiling atlas**: data sources, what quantity each map shows, how site calibration works, how uncertainty is expressed, intended uses and explicit non-uses. Close with a three-sentence answer to a plant owner who asks: "Why would I pay Mizan when I can buy a soiling time series from a satellite data vendor?"`,
            rubric: [
              "Names appropriate sources (CAMS EAC4, MERRA-2, AERONET Kuwait University, station data) with resolution and time base",
              "Distinguishes AOD, surface PM and modelled soiling and labels what each layer shows",
              "Describes calibration against plant SRR or soiling stations with out-of-sample testing and seasonal checks",
              "Expresses uncertainty honestly (grid size, deposition velocity, dew, known compression towards the mean)",
              "States intended uses (screening, timing, forecasting, prior) and non-uses (contractual measurement, site-level guarantee)",
              "The answer to the plant owner is specific: proxies are calibrated to their plant and fused with their own data into a cleaning decision, without disparaging vendors or inventing Mizan results",
            ],
            modelAnswer: md`**Kuwait dust and soiling atlas, v0 method note.**
*Layers*: (1) Monthly climatology of AOD at 550 nm from CAMS EAC4 (2003 onwards, about 0.75°, 3-hourly) and MERRA-2 (1980 onwards, 0.5° by 0.625°, hourly), cross-checked against AERONET Kuwait University AOD500. (2) Monthly surface dust and PM10 from both reanalyses, labelled "modelled near-surface concentration". (3) Modelled natural soiling rate (%/day, no cleaning) from the HSU model with pvlib default deposition velocities at 25° tilt, labelled "uncalibrated proxy". (4) Where partners agree to publish, calibrated site factors k from plant SRR or soiling stations. All timestamps UTC.
*Calibration*: k fitted per site on alternate cleaning intervals and tested on the others; seasonal k reported separately for November to March (dew season) and April to October.
*Uncertainty*: cells of 3,000 to 6,000 km² miss local sources; deposition velocity uncertain by a factor of several; dew and resuspension not modelled; published validations of similar models show underestimates at high-soiling sites. Layer 3 carries a "screening only" label.
*Uses*: site screening, seasonal planning, dust-event timing, priors for plant-data analysis. *Non-uses*: contractual loss measurement, performance guarantees, any site-level number without local calibration.
*Licence*: open data with source attribution to Copernicus and NASA.

**Answer to the plant owner**: A satellite soiling series is a regional estimate made without knowing your cleaning schedule, your tilt or the road next to your array, and these models tend to understate soiling at very dusty sites. Mizan uses that kind of data as one input, calibrates it to your plant's own performance data, and turns the result into a cleaning and alert decision with stated confidence. You pay for the decision about your plant, not for a map.`,
            explanation: md`The grader looks for correct labelling of quantities, honest uncertainty, out-of-sample calibration and a positioning answer built on the mechanism (regional proxy versus plant-calibrated decision).`,
            concepts: ["mz03.aerosol-reanalysis", "mz03.proxy-calibration", "mz03.commercial-soiling-models"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a Kuwaiti utility engineer the difference between aerosol optical depth, surface dust concentration and soiling loss, and why a dusty-sky day is not necessarily a soiling day.",
          keyPoints: [
            "AOD measures how much the whole air column dims the sun",
            "Surface concentration is the dust near the ground that can settle on modules",
            "Soiling loss depends on deposition, stickiness (dew) and removal, not just on how dusty the air is",
            "Dust aloft raises AOD with little deposition; a local plume can soil without high AOD",
            "Reanalysis gives the first two at tens of kilometres; only plant data or a station gives soiling",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz03-l04-q1",
      type: "mcq",
      prompt: "Which quantity does a reanalysis such as MERRA-2 constrain best through data assimilation?",
      options: ["Soiling ratio on tilted glass", "Column aerosol optical depth", "Deposition velocity of PM10", "Dew-driven cementation"],
      answer: 1,
      explanation: md`Reanalyses assimilate satellite (and for MERRA-2 also AERONET) aerosol optical depth. Surface concentrations are modelled diagnostics; deposition and soiling are further downstream.`,
      concepts: ["mz03.aerosol-reanalysis", "mz03.aod-vs-pm"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz03-l04-q2",
      type: "multi",
      prompt: "Which statements about the Solargis soiling model are supported by its own published validation summary? Select all that apply.",
      options: [
        "It uses PM2.5 and PM10 from MERRA-2 and CAMS",
        "It overestimates where soiling is low and underestimates where it is high",
        "It models wet deposition by rain",
        "It has been validated at a Kuwait soiling station",
      ],
      answer: [0, 1],
      explanation: md`The validation page reports 51 stations, compression towards the mean, and no wet deposition. No Kuwait-specific validation was found.`,
      concepts: ["mz03.commercial-soiling-models"],
      difficulty: 2,
    },
    {
      id: "mz03-l04-q3",
      type: "numeric",
      prompt: md`HSU flux: PM2.5 = 40 µg/m³, PM10 = 120 µg/m³, $v_{2.5} = 0.0009$ m/s, $v_{10} = 0.004$ m/s, horizontal surface. Daily deposited mass in g/m²/day (3 decimals)?`,
      answer: 0.031,
      tolerance: { abs: 0.0015 },
      unit: "g/m²/day",
      explanation: md`$40\times10^{-6}\times0.0009 + 80\times10^{-6}\times0.004 = 3.6\times10^{-8} + 3.2\times10^{-7} = 3.56\times10^{-7}$ g/m²/s; $\times 86{,}400 = 0.0308$ g/m²/day.`,
      concepts: ["mz03.deposition-model"],
      difficulty: 2,
    },
    {
      id: "mz03-l04-q4",
      type: "mcq",
      prompt: "You align CAMS dust events with SCADA and find every event appears three hours early in CAMS. What happened?",
      options: ["CAMS forecasts are biased early", "CAMS timestamps are UTC and SCADA is Kuwait local time (UTC+3)", "Dust takes three hours to deposit", "The pyranometer is dirty"],
      answer: 1,
      explanation: md`Reanalysis and forecast products use UTC. Convert before any alignment.`,
      concepts: ["mz03.aerosol-reanalysis"],
      difficulty: 1,
    },
    {
      id: "mz03-l04-q5",
      type: "decision",
      prompt: md`A prospect's 200 MW plant has no soiling station and is cleaned by robots every 2 days. They want a soiling loss figure for their lender. What do you offer?`,
      options: [
        { text: "Run SRR on their SCADA data and quote the result.", score: 0, feedback: "With 2-day cleaning there are no soiling intervals to fit; the output would be meaningless precision." },
        { text: "Quote the commercial satellite soiling estimate as the plant's loss.", score: 0.2, feedback: "A regional, uncalibrated proxy that does not know their cleaning regime; likely compressed towards the mean." },
        { text: "Propose a short campaign: a soiling station or uncleaned control rows to measure the natural rate and the robots' residual soiling, then use the calibrated proxy for seasonal extrapolation, with stated uncertainty.", score: 1, feedback: "Right: ground truth where the method cannot see, proxies for timing and extrapolation once calibrated." },
      ],
      explanation: md`Plant-data inference needs intervals; proxies need calibration. Frequent cleaning calls for direct measurement first.`,
      concepts: ["mz03.proxy-calibration", "mz03.identifiability"],
      difficulty: 2,
    },
    {
      id: "mz03-l04-q6",
      type: "mcq",
      prompt: "A calibration factor k fitted on summer intervals is 1.3; on winter intervals it is 2.4. The best interpretation?",
      options: [
        "Average them to 1.85 and move on",
        "The proxy misses a seasonal mechanism, most plausibly dew-driven adhesion in winter; add a humidity or dew term rather than one global factor",
        "The plant data is wrong in winter",
        "Winter has more dust storms, so k should be higher",
      ],
      answer: 1,
      explanation: md`A seasonally varying k says the error is structural. In the Gulf, dew and cementation in humid winter nights are the leading candidate (Qatar studies).`,
      concepts: ["mz03.proxy-calibration", "mz03.deposition-model"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz03-l04-f1", front: "CAMS EAC4", back: "ECMWF/Copernicus aerosol reanalysis, 2003 onwards, about 0.75°, 3-hourly, UTC.", concepts: ["mz03.aerosol-reanalysis"] },
    { id: "mz03-l04-f2", front: "MERRA-2", back: "NASA GMAO reanalysis, 1980 onwards, 0.5° by 0.625°, hourly aerosol diagnostics; assimilates AOD.", concepts: ["mz03.aerosol-reanalysis"] },
    { id: "mz03-l04-f3", front: "AOD vs surface PM", back: "AOD: column dimming of sunlight. Surface PM: mass near the ground that deposits. They diverge when dust is aloft.", concepts: ["mz03.aod-vs-pm"] },
    { id: "mz03-l04-f4", front: "HSU soiling ratio", back: md`$\mathrm{SR} = 1 - 0.3437\,\operatorname{erf}(0.17\,\omega^{0.8473})$, $\omega$ in g/m².`, concepts: ["mz03.deposition-model"] },
    { id: "mz03-l04-f5", front: "Typical bias of coarse soiling proxies", back: "Compressed towards the mean: too high at low-soiling sites, too low at high-soiling sites such as Kuwait.", concepts: ["mz03.commercial-soiling-models"] },
    { id: "mz03-l04-f6", front: "Kuwait AOD in dust events (AERONET)", back: "AOD500 of 0.75 to 2.91; about 20 sand and dust storm days a year (Kokkalis et al. 2018).", concepts: ["mz03.aod-vs-pm"] },
    { id: "mz03-l04-f7", front: "Honest uses of a soiling proxy", back: "Timing prior, event flag, regressor, calibrated extrapolation, forecasting. Never the measurement of record.", concepts: ["mz03.proxy-calibration"] },
  ],
};

export default lesson;
