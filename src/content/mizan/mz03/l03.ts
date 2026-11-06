import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz03-l03",
  title: "Modelling expected energy with pvlib and PySAM: transposition, temperature, DC/AC models and residual analysis",
  summary:
    "The denominator of every soiling estimate. Building a clean-plant expected-energy model step by step with pvlib (solar position, decomposition, transposition, tracking, angle-of-incidence, cell temperature, DC and inverter models, clipping) and PySAM (PVWatts and the detailed model), choosing measured versus modelled irradiance, calibrating on post-cleaning days, and reading residuals to find model errors before they are mistaken for soiling.",
  minutes: 85,
  objectives: [
    "Describe each step of a pvlib model chain and the choice that matters most at a Kuwait desert plant",
    "Compute plane-of-array irradiance, cell temperature and AC power for one hour by hand",
    "Choose between measured POA and transposed satellite or station irradiance, knowing what each hides",
    "Read residual plots against temperature, angle of incidence, irradiance and time of day, and name the model error behind each pattern",
    "Specify an expected-energy model for an engineering partner, including calibration and acceptance tests",
  ],
  concepts: [
    { id: "mz03.expected-energy-model", name: "Expected-energy model", description: "A weather-driven physical model of what the clean plant should produce: solar position, transposition, optical losses, temperature, DC and AC conversion and clipping.", competency: "mz-data", related: ["m02.pvsyst-workflow", "m02.loss-tree", "m02.single-diode-model"] },
    { id: "mz03.transposition", name: "Irradiance transposition", description: "Converting GHI, DNI and DHI to plane-of-array irradiance with a sky diffuse model (isotropic, Hay-Davies, Perez) and ground reflection.", competency: "mz-data", related: ["m02.poa-transposition", "m02.irradiance-components"] },
    { id: "mz03.cell-temperature-model", name: "Cell temperature model", description: "Empirical model (SAPM, Faiman, PVsyst) giving cell temperature from irradiance, ambient temperature and wind; drives the temperature loss term.", competency: "mz-data", related: ["m02.cell-temperature", "m02.temperature-coefficient"] },
    { id: "mz03.residual-analysis", name: "Residual analysis", description: "Examining log ratios of measured to modelled power against candidate drivers to expose model errors that would otherwise be read as soiling.", competency: "mz-data", related: ["m12.diagnosis-workflow"] },
    { id: "mz03.model-calibration", name: "Calibration on post-cleaning days", description: "Fitting the model's lumped derate (and sometimes temperature coefficient) on days just after a full cleaning so that clean corresponds to a performance index of 1.", competency: "mz-data" },
  ],
  sections: [
    {
      layer: "theory",
      title: "The model chain, step by step",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Your engineering partners will write the code, but you will be asked by KISR, by an O&M contractor and by investors why Mizan's expected energy is right. Most soiling "findings" that collapse under review are model errors: a temperature coefficient, an albedo, a timestamp. Knowing the chain lets you write the spec, review the residual plots, and refuse to ship a number that the model has not earned.`,
        },
        {
          kind: "flow",
          title: "A clean-plant expected-energy model chain (pvlib names in brackets)",
          steps: [
            { label: "Weather in", detail: "GHI, DNI, DHI or measured POA; ambient temperature; wind; 1 to 15 min" },
            { label: "Sun position", detail: "Zenith, azimuth, extraterrestrial irradiance (solarposition, irradiance.get_extra_radiation)" },
            { label: "Decompose", detail: "Only if just GHI: split into DNI and DHI (Erbs, DISC, DIRINT)" },
            { label: "Orientation", detail: "Fixed tilt, or tracker angle with backtracking and GCR (tracking.singleaxis)" },
            { label: "Transpose", detail: "POA beam, sky diffuse, ground reflected (irradiance.get_total_irradiance, Perez or Hay-Davies)" },
            { label: "Optics", detail: "Angle-of-incidence loss (iam), spectral factor where it matters; soiling set to zero" },
            { label: "Temperature", detail: "Cell temperature (temperature.sapm_cell, faiman, pvsyst_cell)" },
            { label: "DC", detail: "PVWatts or single-diode with module parameters (pvsystem)" },
            { label: "AC", detail: "Inverter model with AC limit, so clipping is modelled (inverter.sandia or pvwatts)" },
            { label: "Compare", detail: "Measured over modelled on valid intervals: the performance index" },
          ],
          caption: "pvlib's ModelChain wires these steps together; doing them explicitly makes every assumption visible.",
        },
        {
          kind: "md",
          md: md`### Sun position and decomposition

Solar position from the NREL SPA algorithm is exact to a small fraction of a degree, *if* the timestamps are right. A historian that stores interval-ending averages, or UTC instead of Kuwait time (UTC+3), shifts the sun by up to an hour and creates a morning-afternoon residual asymmetry. If only GHI is measured, a decomposition model (Erbs, DISC or DIRINT) estimates DNI and DHI; this is the largest single error source on partly cloudy days, but Kuwait's many clear days make it more forgiving, with the exception of dusty, high-AOD days when diffuse fraction rises sharply.

### Transposition

On a clear desert day the beam term dominates POA, so geometry matters more than the sky model:`,
        },
        { kind: "equation", formula: "mz03-poa-isotropic" },
        {
          kind: "md",
          md: md`The isotropic model understates circumsolar diffuse; Hay-Davies and Perez correct for it and are the usual choices. Ground albedo for desert sand is around 0.25 to 0.35 and matters more for bifacial modules (rear irradiance) and steep tracker angles. For trackers, use **measured** tracker angles when the plant logs them: a stuck row or a stow event then shows up correctly instead of as unexplained loss.

### Optics: angle of incidence, spectrum, and soiling = 0

Glass reflects more at grazing angles; pvlib's IAM models (physical, ASHRAE, Martin-Ruiz) take a few percent off in the early morning and late afternoon on fixed tilt. Spectral effects are small for crystalline silicon and larger for some thin films (CdTe responds to precipitable water, and pvlib has a spectral factor model for it). One rule is non-negotiable: **the expected-energy model for soiling inference has no soiling loss**. Any soiling allowance copied from a design model is double counting.

### Cell temperature

The Sandia model is the common default:`,
        },
        { kind: "equation", formula: "mz03-sapm-cell-temp" },
        {
          kind: "md",
          md: md`With open-rack glass/glass coefficients, an 870 W/m² hour at 38 °C and 3 m/s wind gives a cell at about 63 °C; a calm 44 °C summer hour at 950 W/m² gives about 75 °C. If the plant has back-of-module sensors, fit $a$ and $b$ (or Faiman's $u_0$, $u_1$) to them on clean days: wind at the met mast is often not wind at the array.

### DC and AC

The PVWatts DC model is linear in irradiance with a temperature term:`,
        },
        { kind: "equation", formula: "mz03-pvwatts-dc" },
        {
          kind: "md",
          md: md`A single-diode model with datasheet or PAN-file parameters (CEC or De Soto in pvlib) captures low-irradiance efficiency better; for daily soiling work PVWatts plus a high-irradiance filter is usually sufficient. Then DC losses (mismatch, wiring) and an inverter model with its AC limit, so that **clipping is predicted**: intervals where modelled DC exceeds the AC rating are exactly the ones to filter.

### Measured POA or modelled irradiance?

| Input | Strength | Weakness for soiling work |
|---|---|---|
| Plant POA pyranometer or reference cell | Sees the same sky and haze as the array | Soils and drifts; hides plant soiling |
| KISR station GHI/DNI/DHI, transposed | Maintained research-grade sensors, all components | Some distance from the array; transposition error |
| Satellite irradiance (Solargis, Solcast and others) | Never soils; long history; includes AOD | Hourly or 15-min, a few km resolution; errors on dust days |
| Clear-sky model | Free, smooth | Ignores real aerosol; calls a dusty sky a dirty array |

The robust practice: run the model on **two** independent irradiance sources and treat divergence between them as a sensor alarm, not a soiling signal.

### Residual analysis: let the errors show themselves

Write the residual as a log ratio so that losses add:`,
        },
        { kind: "equation", formula: "mz03-log-residual" },
        {
          kind: "md",
          md: md`Then plot residuals **from clean days only** (the first two or three valid days after logged full cleanings) against each candidate driver. On clean days soiling is near zero, so any structure is model error:

| Residual pattern on clean days | Likely model error |
|---|---|
| Falls with cell temperature | Temperature coefficient too small in magnitude, or temperature model too cool |
| Falls at high angle of incidence (morning, evening) | IAM too optimistic, row-to-row shading, or tracker backtracking error |
| Asymmetric morning vs afternoon | Timestamp shift, azimuth error, or terrain shading |
| Falls at low irradiance | Linear DC model overestimating low-light efficiency |
| Flat negative offset | Lumped derate (nameplate tolerance, wiring) mis-set: absorb it in calibration |
| Seasonal wave | Albedo, spectral or temperature model bias: dangerous, because SRR reads slow drifts as soiling |

**Calibration.** Fit the lumped derate (and, if the data supports it, the temperature coefficient) on those clean days so that a clean array gives PI close to 1. Refit once a year to absorb degradation, or model degradation explicitly. Keep the clean-day residual standard deviation as a quality metric: it sets the noise floor for everything in lesson 6.

### PySAM: the same physics, SAM's way

PySAM is NREL's Python wrapper for the System Advisor Model. Its **Pvwattsv8** module gives a fast PVWatts run from a weather table; **Pvsamv1** is the detailed model with module and inverter libraries, losses and trackers, closer to what a bankable design report does. Two practical uses for Mizan: a cross-check of the pvlib model by an independent implementation, and consistency with design energy yield reports. Watch the default losses: PVWatts' default total system loss of 14.08 % includes a 2 % soiling allowance (and 3 % availability), which must be set to zero for a clean-plant expected-energy model.`,
        },
        {
          kind: "md",
          md: md`### What the code looks like (sketches, not production)

A pvlib run on measured weather, step by step:

    import pvlib
    site = pvlib.location.Location(29.2, 47.1, tz='Asia/Kuwait')
    sp = site.get_solarposition(weather.index)
    poa = pvlib.irradiance.get_total_irradiance(25, 180, sp.apparent_zenith, sp.azimuth, weather.dni, weather.ghi, weather.dhi, model='haydavies', dni_extra=pvlib.irradiance.get_extra_radiation(weather.index), albedo=0.3)
    tcell = pvlib.temperature.sapm_cell(poa.poa_global, weather.temp_air, weather.wind_speed, -3.47, -0.0594, 3)
    pdc = pvlib.pvsystem.pvwatts_dc(poa.poa_global, tcell, 10000000, -0.004)
    pac = pvlib.inverter.pvwatts(pdc * 0.95, 9000000 / 0.98)

The same plant in PySAM, in outline:

    import PySAM.Pvwattsv8 as pv
    m = pv.default('PVWattsNone')
    m.SolarResource.solar_resource_data = weather_table
    m.SystemDesign.system_capacity = 10000
    m.SystemDesign.losses = 0
    m.execute()
    hourly_ac = m.Outputs.ac

The coordinates above are a rough location for the Shagaya area for illustration, not the plant's surveyed position. Tilt, azimuth, capacities and coefficients are placeholders to be replaced from the as-built design. Argument names and positions change between library versions: the engineering partner should use keyword arguments and pin versions.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "One hour through the chain, by hand",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Expected AC power for a clear Kuwait hour",
          given: md`Illustrative fixed-tilt block: 10,000 kWp poly-Si, tilt 25° facing south, $\gamma = -0.0040$/°C, DC losses 5 % (derate 0.95), inverter efficiency 98 %, inverter AC limit 9,000 kW, open-rack glass/glass SAPM coefficients ($a = -3.47$, $b = -0.0594$, $\Delta T = 3$ °C), albedo 0.25. Hour near solar noon: sun zenith 30°, angle of incidence 5°, DNI 750 W/m², DHI 120 W/m², ambient 38 °C, wind 3 m/s. Measured AC power 6,120 kW.`,
          steps: [
            { md: md`**Check GHI consistency:** $\mathrm{GHI} = \mathrm{DNI}\cos\theta_z + \mathrm{DHI} = 750 \times 0.866 + 120 = 769.5$ W/m². If the station's measured GHI differed by more than a few percent, one of the three sensors is wrong: stop here.` },
            { md: md`**Transpose (isotropic):** beam $750 \cos 5° = 747.1$; sky diffuse $120 \times (1 + \cos 25°)/2 = 120 \times 0.953 = 114.4$; ground $769.5 \times 0.25 \times (1 - \cos 25°)/2 = 9.0$. $G_{\mathrm{POA}} = 870.5$ W/m². (IAM at 5° is negligible.)` },
            { md: md`**Cell temperature:** $e^{-3.47 - 0.0594 \times 3} = e^{-3.648} = 0.02604$; $T_m = 870.5 \times 0.02604 + 38 = 60.7$ °C; $T_c = 60.7 + 0.8705 \times 3 = 63.3$ °C.` },
            { md: md`**DC power:** $10{,}000 \times 0.8705 \times [1 - 0.004 \times (63.3 - 25)] = 8{,}705 \times 0.847 = 7{,}372$ kW. After DC losses: $7{,}372 \times 0.95 = 7{,}004$ kW.` },
            { md: md`**AC power:** $7{,}004 \times 0.98 = 6{,}864$ kW, below the 9,000 kW limit, so not clipped and valid for soiling analysis.` },
            { md: md`**Performance index for the hour:** $6{,}120 / 6{,}864 = 0.892$.` },
          ],
          result: md`Expected 6,864 kW, measured 6,120 kW, PI 0.89 for this hour. One hour is noise; the soiling estimate comes from the daily series of such ratios over valid hours, after the model has been calibrated on clean days.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A calm July hour, and what ignoring temperature would claim",
          given: md`Same block. POA 950 W/m² (already transposed), ambient 44 °C, wind 1 m/s. Measured AC power 6,500 kW.`,
          steps: [
            { md: md`$e^{-3.47 - 0.0594 \times 1} = e^{-3.529} = 0.02933$; $T_m = 950 \times 0.02933 + 44 = 71.9$ °C.` },
            { md: md`$T_c = 71.9 + 0.95 \times 3 = $ 74.7 °C.`, hidden: true, check: { prompt: "Cell temperature (°C)", answer: 74.7, unit: "°C", tolerance: { abs: 0.3 } } },
            { md: md`$P_{\mathrm{ac}} = 10{,}000 \times 0.95 \times [1 - 0.004 \times (74.7 - 25)] \times 0.95 \times 0.98$.` },
            { md: md`$= 7{,}086$ kW.`, hidden: true, check: { prompt: "Expected AC power (kW)", answer: 7086, unit: "kW", tolerance: { rel: 0.005 } } },
            { md: md`PI $= 6{,}500/7{,}086 = 0.917$. A model that ignored temperature (cell at 25 °C) would expect $10{,}000 \times 0.95 \times 0.95 \times 0.98 = 8{,}845$ kW and report PI $= 0.735$: a fictitious 26 % "soiling loss".` },
          ],
          result: md`At 75 °C the temperature term alone is a 20 % loss. In Kuwait, a soiling claim from a model without a credible temperature term is not a claim.`,
        },
        {
          kind: "question",
          question: {
            id: "mz03-l03-p1",
            type: "numeric",
            prompt: md`On clean days just after cleanings, the log residual $\ln(P_{\mathrm{meas}}/P_{\mathrm{exp}})$ falls by 0.0010 for every 1 °C rise in cell temperature. The model uses $\gamma = -0.35$ %/°C. What temperature coefficient (in %/°C) does the data suggest?`,
            answer: -0.45,
            tolerance: { abs: 0.01 },
            unit: "%/°C",
            explanation: md`The residual slope is the extra temperature sensitivity the model is missing: $-0.10$ %/°C. True $\gamma \approx -0.35 - 0.10 = -0.45$ %/°C. Left uncorrected, the model is too optimistic in summer by $0.10$ % per °C above the calibration temperature, a seasonal wave that SRR would read as faster summer soiling.`,
            concepts: ["mz03.residual-analysis", "mz03.cell-temperature-model"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Building and reviewing the model on a real project",
      blocks: [
        {
          kind: "md",
          md: md`### Who does it and with what

- **Inputs from the asset owner**: as-built single-line diagram, string and inverter layout, module and inverter datasheets (ideally PVsyst PAN and OND files from the EPC), tracker or tilt geometry, the energy yield report, and the commissioning test results.
- **The bankable model** (usually PVsyst, prepared by the EPC or an independent engineer) is the reference for design losses, not a daily operations model. Use it to sanity-check your model's annual energy, not to compute daily PI.
- **The operations model** is pvlib or PySAM code run on measured weather every day. It lives in Mizan's pipeline (module mz09 covers the data plumbing).
- **Review** is a residual plot pack: clean-day residuals against cell temperature, AOI, irradiance, hour of day and month, plus the clean-day residual standard deviation.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Model errors that become soiling claims",
          md: md`- **Soiling left in the model**: the PVWatts 2 % default or a PVsyst soiling line copied into the expected-energy model.
- **Typical meteorological year instead of measured weather**: TMY is for design, not for judging a particular day.
- **Nameplate instead of flash-test power** and no calibration on clean days: a constant offset is fine, but it must be absorbed and documented.
- **Wrong timestamps**: interval-ending versus beginning, UTC versus UTC+3.
- **Wind from a distant mast**: cell temperature wrong by several degrees in calm hours.
- **Ignoring spectral effects on thin film**: a humidity-driven seasonal residual on one technology section only.
- **Albedo constant all year** on bifacial or tracker plants, when wet winter sand and dry summer sand differ.`,
        },
        {
          kind: "checklist",
          title: "Model acceptance checks before soiling analysis",
          items: [
            "Timestamps verified against modelled sunrise and solar noon on clear days",
            "GHI, DNI and DHI consistent within a few percent on clear days, or the model runs from POA with a second source as cross-check",
            "No soiling or availability loss inside the expected-energy model",
            "Calibrated on post-cleaning days; derate and coefficients documented",
            "Clean-day residuals show no trend against cell temperature, AOI, irradiance, hour or month",
            "Clipping predicted by the inverter model and used as a filter",
            "Annual modelled energy reconciled with the design energy yield report, differences explained",
          ],
        },
        {
          kind: "ask",
          title: "Questions to put to the plant owner or EPC",
          items: [
            "Can we have the PAN and OND files and the final energy yield report?",
            "Which sensor is the reference for POA, and where are module temperature sensors mounted?",
            "Are tracker angles (if any) and inverter AC limits logged?",
            "Were modules flash-tested at delivery, and what was the average deviation from nameplate?",
            "Has the inverter firmware or AC limit setting changed since commissioning?",
          ],
        },
        { kind: "sources", refs: ["mz03-r8", "mz03-r9", "mz03-r10", "mz03-r11", "mz03-r12"] },
        { kind: "xref", to: "m02-l01", note: "Track 0, solar resource and sun geometry: irradiance components and transposition at PM level." },
        { kind: "xref", to: "m02-l06", note: "Track 0, energy yield with PVsyst, PR and P50/P90: the design model your operations model is reconciled against." },
        { kind: "xref", to: "fc02-l04", note: "Founder Core, writing PRDs and specs for engineers: the format for the exercise below." },
        {
          kind: "question",
          question: {
            id: "mz03-l03-p2",
            type: "short",
            prompt: md`Write a one-page **specification for the expected-energy model** that Mizan's engineering partners will build for the Shagaya Phase I soiling pilot (two technology sections, monthly water cleaning). State the inputs, the model choice at each step and why, how it is calibrated, the acceptance tests, and the non-goals.`,
            rubric: [
              "Inputs listed with resolution and source, including a second independent irradiance source for cross-checking",
              "Model choice at each step (transposition, IAM, temperature, DC, inverter with clipping), with soiling explicitly excluded",
              "Separate parameters or calibration for the thin-film and poly-Si sections (temperature coefficient, possibly spectral)",
              "Calibration on post-cleaning days, with yearly refit or explicit degradation",
              "Acceptance tests: timestamp check, clean-day residual structure, residual standard deviation target, reconciliation with design yield",
              "Non-goals stated (not a bankable yield model, no forecasting in v1) and versions pinned",
            ],
            modelAnswer: md`**Expected-energy model spec, Shagaya Phase I pilot, v0.1**
*Goal*: hourly and daily expected AC energy of each inverter as if clean, for soiling inference. *Non-goals*: bankable yield, forecasting, fault detection beyond flags.
*Inputs*: 5-minute inverter AC, POA from the plant reference sensor (with cleaning log), GHI/DNI/DHI from the nearest KISR radiometric station, satellite irradiance as third source, back-of-module temperature, ambient, wind, inverter AC limits, as-built layout, PAN/OND files.
*Chain*: solar position (SPA, Kuwait UTC+3 verified); run A from measured POA, run B from station components transposed with Hay-Davies (albedo 0.3, refit monthly on clear days); IAM physical model; soiling loss zero; cell temperature SAPM with coefficients fitted to back-of-module sensors on clean days, separately per section; DC PVWatts with section-specific temperature coefficient from datasheet then data-checked; spectral factor for the thin-film section if residuals show humidity dependence; Sandia inverter model with AC limit, clipping flagged.
*Calibration*: lumped derate per inverter fitted on the first three valid days after each logged full cleaning; refit yearly; degradation tracked separately with year-on-year.
*Acceptance*: clear-day timestamp check within 5 minutes; clean-day residuals with no slope against cell temperature (within 0.03 %/°C), AOI, hour or month; clean-day daily residual standard deviation at or below 1.5 %; runs A and B agree within 2 % on clean days, with divergence raised as a sensor alarm; annual modelled energy within 3 % of the design report after removing its soiling and availability losses, differences explained.
*Engineering*: pvlib and PySAM versions pinned; all parameters in a config file under version control; PySAM PVWatts run with losses set to zero as an independent cross-check.`,
            explanation: md`The spec is judged on whether a reviewer could reproduce the model and whether it builds in checks that catch the classic errors: soiling double counting, temperature, timestamps and a single soiling-prone irradiance source.`,
            concepts: ["mz03.expected-energy-model", "mz03.model-calibration", "mz03.residual-analysis"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a KISR researcher why Mizan calibrates its model on post-cleaning days and runs it on two irradiance sources.",
          keyPoints: [
            "Clean days give soiling near zero, so residual structure on those days is model error",
            "Calibration absorbs the constant offset (nameplate, wiring) and sets clean to a PI of 1",
            "The plant pyranometer soils and drifts; a second independent source exposes sensor problems",
            "Divergence between sources is a sensor alarm, not a soiling signal",
            "Yearly refit or explicit degradation keeps the anchor from drifting",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz03-l03-q1",
      type: "order",
      prompt: "Order the steps of a clean-plant expected-energy model.",
      items: [
        "Solar position from timestamps and coordinates",
        "Transpose irradiance to the plane of array",
        "Apply angle-of-incidence loss",
        "Compute cell temperature",
        "Compute DC power",
        "Apply inverter model with AC limit (clipping)",
      ],
      explanation: md`Geometry first, then irradiance on the plane, optical losses, temperature, DC conversion and finally the inverter, which is where clipping appears.`,
      concepts: ["mz03.expected-energy-model"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz03-l03-q2",
      type: "numeric",
      prompt: md`Fixed tilt 30°, angle of incidence 10°, DNI 800 W/m², DHI 100 W/m², GHI 790 W/m², albedo 0.3. Isotropic POA irradiance (W/m², nearest whole number)?`,
      answer: 897,
      tolerance: { abs: 2 },
      unit: "W/m²",
      explanation: md`Beam $800 \cos 10° = 787.8$; sky $100 \times (1 + 0.866)/2 = 93.3$; ground $790 \times 0.3 \times (1 - 0.866)/2 = 15.9$. Total $\approx 897$ W/m².`,
      concepts: ["mz03.transposition"],
      difficulty: 2,
    },
    {
      id: "mz03-l03-q3",
      type: "mcq",
      prompt: "You build the expected-energy model in PySAM's PVWatts with default losses. What happens to your soiling estimate?",
      options: [
        "Nothing, defaults are calibrated",
        "Expected energy is already reduced by a 2 % soiling allowance (and 3 % availability), so inferred soiling is understated by about that much",
        "Soiling is overstated by 14 %",
        "PVWatts cannot be used for soiling work",
      ],
      answer: 1,
      explanation: md`PVWatts' default 14.08 % total loss includes soiling 2 % and availability 3 %. For a clean-plant model set losses to the non-soiling, non-availability components only (and filter availability separately).`,
      concepts: ["mz03.expected-energy-model"],
      difficulty: 2,
    },
    {
      id: "mz03-l03-q4",
      type: "mcq",
      prompt: "Clean-day residuals are systematically lower in the afternoon than in the morning at the same angle of incidence. Most likely cause?",
      options: [
        "Soiling",
        "Timestamp shift or azimuth error (or afternoon terrain shading)",
        "Temperature coefficient too small",
        "Wrong albedo",
      ],
      answer: 1,
      explanation: md`Soiling does not depend on the time of day for the same geometry, and on clean days it is near zero. A morning-afternoon asymmetry is a geometry or clock error first. Temperature could contribute if afternoons are hotter, so check against cell temperature too.`,
      concepts: ["mz03.residual-analysis"],
      difficulty: 2,
    },
    {
      id: "mz03-l03-q5",
      type: "multi",
      prompt: "Which irradiance inputs can hide or fake soiling in the performance index? Select all that apply.",
      options: [
        "A plant pyranometer that is wiped less often than the modules are cleaned",
        "A clear-sky model on a high-AOD dusty day",
        "A maintained KISR station pyranometer, cleaned daily, transposed correctly",
        "A reference cell mounted next to the modules and never cleaned",
      ],
      answer: [0, 1, 3],
      explanation: md`A soiling sensor hides plant soiling; a clear-sky model on a dusty day calls the dim sky soiling. A clean, maintained station with correct transposition does neither, though it adds transposition and distance error.`,
      concepts: ["mz03.transposition", "mz03.sensor-soiling"],
      difficulty: 1,
    },
    {
      id: "mz03-l03-q6",
      type: "decision",
      prompt: md`Your engineering partner's model shows a clean-day residual that is 2 % lower in July than in January, steadily, on both technology sections. They propose to proceed with SRR "because SRR handles noise". What do you decide?`,
      options: [
        { text: "Proceed; SRR's Monte Carlo will widen the interval.", score: 0, feedback: "A seasonal bias is not noise. It shifts every rep alike and turns into a fake seasonal soiling rate." },
        { text: "Stop and fix the model first: test the temperature coefficient and cell temperature model against clean-day residuals, then albedo and spectral terms, and rerun.", score: 1, feedback: "Right. Clean-day structure is model error by construction; it must be gone before a slope means anything." },
        { text: "Subtract 2 % from July results by hand.", score: 0.3, feedback: "It patches the symptom for one month and hides the cause; the error will be different in other months and other years." },
      ],
      explanation: md`On clean days soiling is near zero, so a seasonal wave in the residual is a model problem, most often temperature. Fix the model, then infer soiling.`,
      concepts: ["mz03.residual-analysis", "mz03.model-calibration"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz03-l03-f1", front: "The one loss the soiling model must not contain", back: "Soiling. Any allowance copied from a design model (PVWatts 2 %, a PVsyst soiling line) is double counting.", concepts: ["mz03.expected-energy-model"] },
    { id: "mz03-l03-f2", front: "SAPM cell temperature (open rack glass/glass)", back: md`$T_m = G e^{-3.47 - 0.0594\,WS} + T_a$; $T_c = T_m + 3\,G/1000$.`, concepts: ["mz03.cell-temperature-model"] },
    { id: "mz03-l03-f3", front: "PVWatts DC", back: md`$P_{dc} = P_{dc0}\,(G/1000)\,[1 + \gamma(T_c - 25)]$`, concepts: ["mz03.expected-energy-model"] },
    { id: "mz03-l03-f4", front: "Why plot residuals from clean days only?", back: "Soiling is near zero right after a full cleaning, so any structure in those residuals is model error.", concepts: ["mz03.residual-analysis"] },
    { id: "mz03-l03-f5", front: "Residual falls with cell temperature", back: "Temperature coefficient too small in magnitude, or temperature model too cool.", concepts: ["mz03.residual-analysis"] },
    { id: "mz03-l03-f6", front: "PySAM modules for PV", back: "Pvwattsv8 (fast PVWatts) and Pvsamv1 (detailed model with libraries); set losses so no soiling or availability is inside.", concepts: ["mz03.expected-energy-model"] },
    { id: "mz03-l03-f7", front: "Two irradiance sources: why", back: "The plant sensor soils and drifts; an independent source (station or satellite) turns divergence into a sensor alarm instead of a false soiling signal.", concepts: ["mz03.transposition", "mz03.sensor-soiling"] },
  ],
};

export default lesson;
