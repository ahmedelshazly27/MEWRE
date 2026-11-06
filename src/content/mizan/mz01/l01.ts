import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz01-l01",
  title: "Dust in Kuwait and the Gulf: sources, sizes, storms and aerosol optical depth",
  summary:
    "Where the dust that soils Kuwaiti PV comes from, what it is made of, how big the particles are, when the shamal and dust storms bring it, and how aerosol optical depth (AERONET Kuwait University) measures what is in the air as opposed to what lands on the glass.",
  minutes: 70,
  objectives: [
    "Name the main dust source regions and emission mechanism (saltation and sandblasting) for Kuwait, and the seasonal pattern of shamal winds and dust storms",
    "Explain PM2.5, PM10 and the coarse and giant fractions, and say which fraction dominates the mass that lands on modules",
    "Link dust mineralogy (quartz, calcite, clays, gypsum, halite, iron oxides) to abrasion, cementation and optical absorption",
    "Compute beam transmittance from aerosol optical depth and air mass, and use the Ångström exponent to tell dust from fine-mode aerosol",
    "Separate the atmospheric effect of a dust event (less light arriving) from the soiling effect (less light passing the glass) in plant data",
  ],
  concepts: [
    {
      id: "mz01.dust-sources",
      name: "Dust sources and emission",
      description: "Regional (southern Iraq, Syrian and Saudi deserts, Iran) and local (Kuwaiti desert surfaces, disturbed ground) dust sources; emission by saltating sand grains that sandblast fine particles loose above a threshold wind speed.",
      competency: "mz-soiling",
      related: ["m02.soiling", "mz01.shamal-climatology"],
    },
    {
      id: "mz01.particle-size",
      name: "Particle size distribution (PM2.5, PM10, coarse, giant)",
      description: "Mineral dust spans sub-micron to over 100 µm; PM10 and PM2.5 are health metrics by aerodynamic diameter, while the mass deposited on modules is dominated by coarse and giant particles that settle fast.",
      competency: "mz-soiling",
      related: ["mz01.dust-sources"],
    },
    {
      id: "mz01.dust-mineralogy",
      name: "Dust mineralogy",
      description: "Quartz, calcite and dolomite, feldspars, clays (palygorskite, kaolinite, illite, smectite), gypsum, halite and iron oxides; each drives a different soiling property (abrasion, cementation, light absorption).",
      competency: "mz-soiling",
      related: ["mz01.particle-size"],
    },
    {
      id: "mz01.shamal-climatology",
      name: "Shamal and dust-storm climatology",
      description: "Northwesterly shamal winds (persistent in early summer, episodic behind winter fronts), dust-storm frequency and the visibility-based definitions used by meteorological services.",
      competency: "mz-soiling",
      related: ["m02.wind-stow", "mz01.dust-sources"],
    },
    {
      id: "mz01.aod",
      name: "Aerosol optical depth (AOD) and Ångström exponent",
      description: "Column-integrated aerosol extinction measured by sun photometers such as AERONET; sets beam attenuation via Beer-Lambert, and its spectral slope (Ångström exponent) separates coarse dust from fine aerosol.",
      competency: "mz-soiling",
      related: ["m02.irradiance-components", "m02.solar-resource-data"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Where the dust comes from and what it is",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Mizan sells soiling analytics and dust-aware plant control in Kuwait, and the pilot it is preparing at Shagaya Phase I would put your methodology in front of KISR researchers who have studied this dust for years. You need to talk about sources, particle sizes, storms and AOD at their level, and you need one distinction cold: a dust event both dims the sky and dirties the glass, and only the second is soiling. Every analytics claim Mizan makes depends on separating the two.`,
        },
        {
          kind: "md",
          md: md`### Sources: regional and local

Kuwait sits downwind of some of the most active dust sources on Earth. The dominant wind, the northwesterly **shamal**, blows down the Tigris-Euphrates valley across southern Iraq and into Kuwait and the northern Gulf.

| Source | What it supplies | When |
|---|---|---|
| **Mesopotamian alluvial plain and dried marshes** (southern Iraq) | Fine silt and clay, carbonate-rich, easily lofted from dry, disturbed soils | Shamal events, spring and early summer |
| **Syrian-Iraqi desert (Jazira) and western Iraq** | Fine to coarse dust carried long distance | Shamal, frontal storms |
| **Northern Saudi Arabia** (Nafud, Ad Dahna sand belts, gravel plains) | Sand and dust, more with southerly and westerly winds | Pre-frontal (kaus) and summer events |
| **Iran** (Khuzestan, across the Gulf) | Dust with easterly or southeasterly flow | Less frequent |
| **Local Kuwaiti surfaces** (desert plains, sabkhas, roads, construction, vehicle tracks, quarries) | Local coarse dust and sand; strongly site-specific | Any windy day |

Kokkalis et al. (2018), using ten years of sun-photometer data in Kuwait City, attribute a significant share of dust events (about 21%) to Iraq and Iran source regions and count sand and dust storms on about **20 days per year** on average. Older Kuwaiti climatology (Safar, 1980) counts about **255 "dusty days" per year** when storms, rising dust and suspended dust are all included. Both numbers are right: they measure different things.

### Emission: saltation and sandblasting

Dust is not lifted grain by grain from a smooth surface. Fine particles stick to the ground too strongly (Lesson 3 explains why adhesion beats weight at small sizes). The sequence is:

1. Wind drag on the surface exceeds a **threshold friction velocity** (order 0.2 to 0.4 m/s on loose, dry soil; much higher on crusted or gravel surfaces).
2. **Sand grains** (about 60 to 2,000 µm) start to hop: **saltation**, mostly within the lowest metre or two.
3. Their impacts **sandblast** aggregates and release fine dust (below about 20 µm), which turbulence carries upward and downwind for hundreds of kilometres.

Two consequences for PV: (a) the **near-ground layer during a storm is full of saltating sand**, which abrades glass and coatings and hits the lower edge of low-mounted modules hardest; (b) **disturbing the desert surface** (construction traffic, unpaved access roads inside the plant) lowers the threshold and creates a local dust source next to your modules.

### Visibility-based definitions

Meteorological services classify dust by visibility (WMO practice): **dust storm** when visibility falls below 1 km, **severe dust storm** below about 200 m, **blowing or rising dust** when dust is lifted locally but visibility stays above 1 km, and **suspended dust (haze)** when dust lingers without local wind. Plant operators care about all four: a haze day with no storm can still deposit dust.`,
        },
        {
          kind: "md",
          md: md`### Particle sizes: PM2.5, PM10 and what lands on the glass

**PM10** and **PM2.5** are mass concentrations of particles with aerodynamic diameter below 10 µm and 2.5 µm. They are **health** metrics: PM2.5 reaches deep into the lungs. The WHO 2021 air quality guidelines are 15 µg/m³ (annual) and 45 µg/m³ (24-hour) for PM10, and 5 and 15 µg/m³ for PM2.5. Desert dust events exceed these by one or two orders of magnitude.

For soiling the useful view is the **whole size distribution**, which for mineral dust near its source is broad and multi-modal:

| Fraction | Diameter | Settling time from 1 m (still air, 40 °C) | Role in soiling |
|---|---|---|---|
| Fine mode | below 2.5 µm | about 30 min (2.5 µm) to 3 h (1 µm) | Dominates AOD and haze; deposits slowly, but blocks the most light per gram and sticks hardest |
| Coarse mode | 2.5 to 10 µm | about 2 to 30 min | Main contributor to PM10 mass during dust events |
| Giant / super-coarse | 10 to 100 µm | about 1 s (100 µm) to 2 min (10 µm) | **Dominates the mass deposited on modules**; not in PM10 at all |
| Sand | above about 60 µm | seconds | Abrasion; saltates near the ground; rarely stays on tilted glass |

The settling times come from Stokes' law (Lesson 2). The point to remember: **PM10 monitors under-report the particles that soil modules**, because much of the deposited mass is above 10 µm, while AOD is dominated by the small particles that deposit least. Neither is a direct soiling measurement.

### Mineralogy: why composition matters

| Mineral | Formula | Why it matters for PV |
|---|---|---|
| Quartz | SiO₂ | Hardness 7 (Mohs), harder than glass (about 5.5): abrades glass and anti-reflective coatings under wind and brushing |
| Calcite, dolomite | CaCO₃, CaMg(CO₃)₂ | Slightly soluble in water with dissolved CO₂: dissolves in dew and reprecipitates as a binder (cementation) |
| Feldspars | (K,Na,Ca) aluminosilicates | Bulk mineral, mostly inert |
| Clays: palygorskite, kaolinite, illite, smectite | Hydrous aluminosilicates | Plate- and needle-shaped, large contact area, swell with water: strong adhesion and cementation |
| Gypsum, halite | CaSO₄·2H₂O, NaCl | Soluble salts: dissolve in dew, recrystallise as bridges between particles and glass; halite is hygroscopic (attracts water below the dew point) |
| Iron oxides: hematite, goethite | Fe₂O₃, FeOOH | Give the reddish-yellow colour and **absorb blue and UV light**: make soiling spectrally selective (Lesson 4) |`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Kuwait-specific dust composition and PM levels",
          md: md`The research brief for this course does not contain sourced mineral fractions for Shagaya dust or annual PM10 means for Kuwaiti stations. The general picture above (quartz and carbonates dominant, clays and salts as minor but important binders) is standard for Gulf dust but must be confirmed site by site: ask KISR for X-ray diffraction (XRD) and particle-size results from Shagaya samples, and use Kuwait Environment Public Authority station data for PM10, before quoting numbers.`,
        },
        {
          kind: "md",
          md: md`### Shamal and storm climatology

- **Summer shamal** (roughly late May to July): a persistent northwesterly wind driven by the pressure gradient between the subtropical high over Arabia and the monsoon low over Iran and Pakistan. Strong by day (often 10 to 15 m/s with higher gusts), weaker at night. Brings the most dust-laden days of the year.
- **Winter shamal** (roughly November to March): episodic, one to a few days behind cold fronts; strong gusts, a sharp dust front, then clear air.
- **Spring** (March to May): frontal and pre-frontal storms; Kuwaiti records show the spring dust trend is the only statistically significant one in the long-term series reviewed in the research brief.
- **Daily cycle**: wind and dust lifting peak in the afternoon when the surface layer is most turbulent; nights are calmer, more humid and favour dew (Lesson 3).

Use the climate widget to set dust against the solar and temperature year: the dusty months are also the high-irradiance, hot months, so a soiling percentage point in June is worth more energy than one in December.`,
        },
        {
          kind: "widget",
          widget: "kuwait-climate",
          props: { metric: "ghi" },
          caption: "Indicative Shagaya and Kuwait climatology. The shamal season (late May to July) coincides with peak GHI: dust losses are concentrated in the months that matter most for energy and for the summer peak.",
        },
        {
          kind: "md",
          md: md`### Aerosol optical depth: measuring dust in the air

**Aerosol optical depth** (AOD, $\tau_a$) is the extinction (scattering plus absorption) by aerosol integrated over the whole atmospheric column, at a given wavelength (commonly 500 nm). It is dimensionless. The direct beam reaching the ground is attenuated according to Beer-Lambert:`,
        },
        { kind: "equation", formula: "mz01-beer-lambert" },
        {
          kind: "md",
          md: md`AOD varies with wavelength. Small particles scatter short wavelengths much more than long ones; large particles scatter almost equally at all wavelengths. The **Ångström exponent** captures that slope:`,
        },
        { kind: "equation", formula: "mz01-angstrom" },
        {
          kind: "md",
          md: md`Rules of thumb: $\alpha$ below about 0.5 with high AOD means **coarse mineral dust**; $\alpha$ above about 1.5 means **fine-mode aerosol** (urban pollution, smoke, sulphate). Kuwait City shows both, often on the same day.

**AERONET** is NASA's global network of CIMEL sun photometers. Each measures direct sun radiance at several wavelengths (and sky radiance for inversions) and reports AOD, Ångström exponent, water vapour and, after inversion, size distribution and absorption. Data are released as Level 1.0 (raw), 1.5 (cloud-screened) and 2.0 (cloud-screened and quality-assured with post-calibration). The **Kuwait University** site (Khalidiyah campus, about 29.32°N, 47.97°E, 42 m) has operated almost continuously since 2008. Kokkalis et al. (2018) analysed 2008 to 2017 and found dust events pushing AOD at 500 nm to between **0.75 and 2.91**.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "Aerosol beam transmittance vs AOD (air mass 1.5)",
          xKey: "aod",
          xLabel: "Aerosol optical depth at 500 nm",
          yLabel: "Beam transmittance (aerosol only)",
          series: [{ key: "t", label: "exp(-1.5 τ)" }],
          data: [
            { aod: 0, t: 1.0 },
            { aod: 0.2, t: 0.741 },
            { aod: 0.4, t: 0.549 },
            { aod: 0.75, t: 0.325 },
            { aod: 1.0, t: 0.223 },
            { aod: 1.5, t: 0.105 },
            { aod: 2.0, t: 0.05 },
            { aod: 2.91, t: 0.013 },
          ],
          caption: "Computed from Beer-Lambert at a relative air mass of 1.5 (sun about 48° above the horizon). At the storm AODs recorded in Kuwait City the direct beam all but disappears; global irradiance falls less because much of the scattered light still reaches the ground as diffuse.",
        },
        {
          kind: "callout",
          tone: "why",
          title: "AOD is not soiling",
          md: md`AOD tells you how much dust is **in the air** above a point; soiling is how much has **landed and stayed** on your glass. High AOD with calm wind and no dew may deposit little; a moderate-AOD night with dew can soil more than the storm. AOD and reanalysis PM (MERRA-2, CAMS) are useful **drivers** in a soiling model, never a substitute for a soiling measurement at the site.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Reading a dust event in the data",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "What a storm does to the direct beam, and why the PV drop is smaller",
          given: md`Illustrative numbers for a Kuwaiti site. Background day: $\tau_a = 0.4$ at 500 nm. Storm: $\tau_a = 2.0$ (inside the 0.75 to 2.91 range recorded in Kuwait City). Sun elevation 48°, so relative air mass $m \approx 1/\sin 48° = 1.35$; use $m = 1.5$ to include some refraction and the slant of the dust layer for simplicity. Consider only aerosol extinction.`,
          steps: [
            { md: md`**Background beam transmittance:** $T_a = e^{-1.5\times0.4} = e^{-0.6} = 0.549$.` },
            { md: md`**Storm beam transmittance:** $T_a = e^{-1.5\times2.0} = e^{-3.0} = 0.050$.` },
            { md: md`**Relative change in direct beam:** $0.050/0.549 = 0.091$, a **91% fall** in DNI. A CSP trough (Shagaya's 50 MW CSP plant uses DNI only) loses almost all output.` },
            { md: md`**Global irradiance falls less.** Dust is a strong forward scatterer, so much of the removed beam arrives as diffuse light. Field records show sudden PV drops of about 30% during Kuwaiti dust storms at Shagaya (Al-Rasheedi et al., 2020), far less than the beam loss.` },
            { md: md`**After the storm:** AOD returns to background within hours to a day, irradiance recovers, but if the PV output does not recover in proportion, the remaining gap is **deposited dust**: the soiling step.` },
          ],
          result: md`A storm produces two signals: an **atmospheric** dip that the plane-of-array pyranometer also sees and that ends when the air clears, and a **soiling step** that only the PV (and a soiled reference) sees and that persists until cleaning or natural removal. Analytics must normalise PV output by measured irradiance to separate them, and must make sure the irradiance sensor itself is clean.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Is it dust or smoke? The Ångström exponent",
          given: md`An AERONET Level 2.0 record from Kuwait University shows $\tau_{440} = 1.20$ and $\tau_{870} = 1.10$ on one day, and $\tau_{440} = 0.60$, $\tau_{870} = 0.20$ on another.`,
          steps: [
            { md: md`$\alpha = -\dfrac{\ln(\tau_{440}/\tau_{870})}{\ln(440/870)}$. The denominator is $\ln(0.5057) = -0.682$.` },
            {
              md: md`Day 1: $\ln(1.20/1.10) = 0.0870$, so $\alpha = 0.0870/0.682 = 0.13$.`,
              hidden: true,
              check: { prompt: "Ångström exponent on day 1", answer: 0.13, tolerance: { abs: 0.02 } },
            },
            {
              md: md`Day 2: $\ln(0.60/0.20) = 1.099$, so $\alpha = 1.099/0.682 = 1.61$.`,
              hidden: true,
              check: { prompt: "Ångström exponent on day 2", answer: 1.61, tolerance: { abs: 0.03 } },
            },
          ],
          result: md`Day 1 ($\alpha \approx 0.13$, high AOD) is a **coarse dust event**: expect heavy deposition if wind and dew allow. Day 2 ($\alpha \approx 1.6$) is **fine-mode aerosol** (urban pollution or smoke): it dims the sky but deposits little mass. A soiling model that uses AOD alone would treat both days alike, which is wrong.`,
        },
        {
          kind: "question",
          question: {
            id: "mz01-l01-p1",
            type: "numeric",
            prompt: md`During a dust event the AOD at 500 nm is 1.0 and the sun is low, giving an air mass of 2.0. What fraction of the direct beam survives aerosol extinction? (3 decimals)`,
            answer: 0.135,
            tolerance: { abs: 0.002 },
            explanation: md`$T_a = e^{-m\tau_a} = e^{-2.0\times1.0} = e^{-2} = 0.135$. Low sun doubles the path, so morning and evening dust hurts beam irradiance much more than at noon.`,
            concepts: ["mz01.aod"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Dust data in practice: who measures what",
      blocks: [
        {
          kind: "md",
          md: md`### The data stack for a Kuwaiti site

| Source | What it gives | Limits |
|---|---|---|
| **AERONET Kuwait University** | AOD at several wavelengths, Ångström exponent, size distribution; since 2008 | One coastal-urban point in Kuwait City, far from Shagaya in the western desert; daytime, cloud-free only |
| **Reanalysis (MERRA-2, CAMS)** | Gridded PM2.5, PM10, dust AOD, hourly, decades back and (CAMS) forecast | Coarse grid (tens of km); poor on giant particles and local sources; used by Solargis and Solcast soiling models |
| **Satellite AOD (MODIS, VIIRS)** | Daily maps of AOD over land | Bright desert surfaces make retrievals harder; daytime only |
| **Air quality stations** (Kuwait Environment Public Authority) | Ground PM10, PM2.5 | Mostly in populated areas; PM10 misses particles above 10 µm |
| **Met stations and SYNOP reports** | Wind, visibility, present-weather codes for dust | Visibility is a proxy, not mass |
| **KISR radiometric stations** | GHI, DNI, DHI; five stations installed in 2012 (Al-Rasheedi et al., EuroSun 2014) | Irradiance, not deposition; sensor cleaning regime matters |
| **On-site soiling station** | Soiling ratio from clean vs soiled reference devices (IEC 61724-1) | The only direct measurement; covers one point of a large plant |

The solar-resource side of this (TMY data, GHI and DNI sources) is in Track 0; here the job is to treat dust as a **driver** with its own data.`,
        },
        { kind: "xref", to: "m02-l01", note: "Solar resource, irradiance components and resource data sources for Kuwait: AOD is one of the inputs that make DNI hard to predict." },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong with dust data",
          md: md`- **The soiled pyranometer:** if the plane-of-array pyranometer gets dirty, irradiance reads low, the performance ratio looks fine, and soiling disappears from the analysis. Check its cleaning log before trusting any normalised metric.
- **Coastal data for an inland site:** Kuwait City AOD and humidity are not Shagaya's. Use them for timing of regional events, not site magnitudes.
- **PM10 as a soiling proxy:** it excludes the giant particles that carry most deposited mass.
- **Treating every dusty day alike:** fine-mode haze, a dry storm and a humid dusty night soil very differently.
- **Ignoring the plant's own dust:** unpaved roads and construction inside the fence can dominate local deposition on downwind rows.`,
        },
        {
          kind: "ask",
          title: "Questions for KISR researchers before the Shagaya pilot",
          items: [
            "Do you hold soiling-station or soiled versus clean reference cell data for the Shagaya PV plant, and for which years?",
            "Have Shagaya dust samples been analysed by XRD and laser particle sizing? Which minerals and size modes dominate?",
            "How are the plane-of-array and reference pyranometers cleaned, how often, and is the log available?",
            "Which dust events in the record caused the largest step losses, and were they dry storms or humid nights?",
            "Do you use AERONET Kuwait University, MERRA-2 or CAMS data in your own work, and how well do they match Shagaya conditions?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "mz01-l01-p2",
            type: "short",
            prompt: md`Write the dust and atmosphere data request Mizan would send to KISR as part of preparing the Shagaya Phase I soiling analytics pilot. List each dataset, the variables, time resolution and period you need, why each is needed for the soiling methodology, and what you will do if it does not exist. Keep the pilot status accurate (in preparation, not agreed).`,
            rubric: [
              "Describes the pilot as targeted or in preparation and KISR as methodology partner, with no invented agreements or data",
              "Requests irradiance (POA and GHI) with sensor cleaning logs, plus PV output at inverter or string level, with resolution and period",
              "Requests dust drivers: wind speed and direction, humidity and temperature (for dew), visibility or dust event records, and any soiling station or reference cell data",
              "Separates atmospheric dust indicators (AOD, PM) from deposition measurements and explains why both are needed",
              "Names external fallbacks (AERONET Kuwait University, MERRA-2 or CAMS, Kuwait EPA stations) and their limits for an inland site",
              "Mentions the 2018 to 2019 cleaning arm failure period or the operating record as a validation opportunity",
            ],
            modelAnswer: md`**To:** KISR Shagaya PV research team. **Subject:** data request for the planned soiling analytics study (in preparation).

Mizan is preparing a soiling analytics pilot at Shagaya Phase I with KISR as methodology partner. To design the method we would like to review the following, under whatever data-sharing terms KISR prefers.

1. **PV output**: inverter (and string, if logged) DC and AC power, 1 to 15 min resolution, full operating record. Needed to compute temperature-corrected performance ratio to IEC 61724 and to detect soiling slopes and cleaning steps.
2. **Irradiance**: plane-of-array and GHI (and DNI, DHI if available) at the same resolution, with **pyranometer cleaning logs**. Without the logs we cannot tell whether the irradiance sensors were soiled.
3. **Module and ambient temperature**, wind speed and direction, relative humidity: for temperature correction and to model dew and wind removal.
4. **Cleaning records**: dates and method of each module wash, including the 2018 to 2019 period when the cleaning arm was out of service. That period is a natural experiment for validating soiling-rate estimates.
5. **Soiling station or reference cell data**, if any, and any dust samples analysed for mineralogy and particle size.
6. **Dust event records** (visibility or present-weather codes) used in KISR's 2020 RSER analysis.

If items 5 or 6 do not exist we will use AERONET Kuwait University AOD and Ångström exponent for event timing, MERRA-2 and CAMS dust fields for regional loading, and Kuwait EPA PM10, accepting that these describe dust in the air over different locations, not deposition at Shagaya. We would then propose installing a clean and soiled reference pair as part of the study.`,
            explanation: md`A strong request ties every dataset to a step in the method, asks for the sensor cleaning logs that make irradiance trustworthy, and keeps air-column dust and deposition separate.`,
            concepts: ["mz01.aod", "mz01.dust-sources", "mz01.particle-size"],
            difficulty: 2,
          },
        },
        { kind: "sources", refs: ["mz01-r1", "mz01-r2", "mz01-r3", "mz01-r18", "mz01-r19", "mz01-r20"] },
        {
          kind: "feynman",
          prompt: "Explain to an O&M manager at a Kuwaiti plant why a high-AOD day and a high-soiling day are not the same thing, and what that means for how Mizan reads his data.",
          keyPoints: [
            "AOD measures dust suspended in the atmospheric column; soiling is dust deposited and retained on the glass",
            "During a storm both irradiance and PV fall; after it clears, the persistent gap is soiling",
            "Deposition depends on particle size, wind and dew, not on AOD alone; humid calm nights can soil more than a dry storm",
            "Normalising PV output by a clean irradiance sensor separates the two effects",
            "The irradiance sensor must itself be kept clean, or soiling disappears from the analysis",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz01-l01-q1",
      type: "mcq",
      prompt: "Which particle fraction dominates the dust mass that accumulates on PV modules near a desert source?",
      options: [
        "Fine mode below 2.5 µm",
        "Coarse and giant particles, roughly 10 to 100 µm",
        "Ultrafine particles below 0.1 µm",
        "Only sand grains above 500 µm",
      ],
      answer: 1,
      explanation: md`Deposited mass is dominated by coarse and giant particles, which settle fast and are outside PM10. Fine particles dominate AOD and block the most light per gram, but deposit slowly. Large sand grains saltate near the ground and bounce or slide off tilted glass.`,
      concepts: ["mz01.particle-size"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "mz01-l01-q2",
      type: "numeric",
      prompt: md`AERONET reports $\tau_{440} = 0.90$ and $\tau_{870} = 0.80$. What is the Ångström exponent? (2 decimals)`,
      answer: 0.17,
      tolerance: { abs: 0.02 },
      explanation: md`$\alpha = -\ln(0.90/0.80)/\ln(440/870) = -0.1178/(-0.682) = 0.17$. Low $\alpha$ with high AOD: coarse mineral dust.`,
      concepts: ["mz01.aod"],
      difficulty: 2,
    },
    {
      id: "mz01-l01-q3",
      type: "multi",
      prompt: "Which minerals in Gulf dust mainly drive cementation when dew forms? (Select all that apply.)",
      options: ["Calcite", "Halite and gypsum", "Quartz", "Clays such as palygorskite", "Hematite"],
      answer: [0, 1, 3],
      explanation: md`Soluble or reactive phases (calcite with dissolved CO₂, halite, gypsum) dissolve and reprecipitate; clays swell and form needle or plate bridges. Quartz is mainly an abrasion problem; hematite mainly absorbs blue light.`,
      concepts: ["mz01.dust-mineralogy"],
      difficulty: 2,
    },
    {
      id: "mz01-l01-q4",
      type: "mcq",
      prompt: "Under WMO-style definitions, what makes a dust event a 'dust storm' rather than 'blowing dust'?",
      options: [
        "Wind speed above 15 m/s",
        "Visibility below 1 km",
        "PM10 above 45 µg/m³",
        "AOD above 1.0",
      ],
      answer: 1,
      explanation: md`Dust storms are defined by visibility below 1 km (severe below about 200 m). Wind speed, PM10 and AOD are correlated with storms but are not the definition.`,
      concepts: ["mz01.shamal-climatology"],
      difficulty: 1,
    },
    {
      id: "mz01-l01-q5",
      type: "decision",
      prompt: md`During a shamal day the plant output drops 28% and the plane-of-array pyranometer drops 26%. The next morning, under clear skies, irradiance is back to normal but output is still 6% below the model. What do you conclude?`,
      options: [
        { text: "The whole 28% drop was soiling; schedule an emergency wash for the entire plant.", score: 0, feedback: "Most of the drop was atmospheric: the pyranometer saw it too. Only the persistent gap after the air cleared is deposition." },
        { text: "About 6% is a soiling step left by the storm (if the pyranometer is clean); the rest was atmospheric. Check the sensor cleaning log, then weigh a targeted clean against the loss.", score: 1, feedback: "Separates the atmospheric dip from the persistent deposition and checks the reference before acting." },
        { text: "Nothing happened that matters; output will recover by itself as the dust settles.", score: 0.2, feedback: "Wind may remove some deposit, but in Kuwait natural recovery is partial and slow; the 6% gap is real until shown otherwise." },
      ],
      explanation: md`Normalise by a clean irradiance sensor: the shared dip is the atmosphere, the persistent residual is soiling.`,
      concepts: ["mz01.aod"],
      difficulty: 2,
    },
    {
      id: "mz01-l01-q6",
      type: "order",
      prompt: "Put the dust emission sequence in order.",
      items: [
        "Surface friction velocity exceeds the threshold",
        "Sand grains begin to saltate",
        "Saltating grains sandblast fine particles loose",
        "Turbulence lifts fine dust and wind carries it downwind",
        "Dust settles or impacts onto surfaces such as PV modules",
      ],
      explanation: md`Fine dust is too sticky to be lifted directly; saltating sand releases it. That is why disturbed, loose surfaces (roads, construction) are such efficient local sources.`,
      concepts: ["mz01.dust-sources"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "mz01-l01-f1", front: "Beer-Lambert for aerosol", back: md`$T_a = e^{-m\tau_a}$: beam transmittance falls exponentially with AOD times air mass.`, concepts: ["mz01.aod"] },
    { id: "mz01-l01-f2", front: "Ångström exponent: dust vs fine aerosol", back: md`$\alpha$ below about 0.5 with high AOD: coarse dust. Above about 1.5: fine-mode pollution or smoke.`, concepts: ["mz01.aod"] },
    { id: "mz01-l01-f3", front: "AERONET Kuwait University site", back: "CIMEL sun photometer, Khalidiyah campus (about 29.32°N, 47.97°E), near-continuous since 2008; dust events reach AOD500 of 0.75 to 2.91 (Kokkalis 2018).", concepts: ["mz01.aod"] },
    { id: "mz01-l01-f4", front: "Why PM10 misses soiling dust", back: "Much of the mass deposited on modules is in particles above 10 µm, which PM10 excludes by definition.", concepts: ["mz01.particle-size"] },
    { id: "mz01-l01-f5", front: "Summer vs winter shamal", back: "Summer: persistent northwesterly, roughly late May to July, dusty. Winter: episodic, one to a few days behind cold fronts.", concepts: ["mz01.shamal-climatology"] },
    { id: "mz01-l01-f6", front: "Two signals of a dust storm in plant data", back: "Atmospheric dip (also in the pyranometer, ends when air clears) and soiling step (only in PV, persists until cleaning).", concepts: ["mz01.aod"] },
    { id: "mz01-l01-f7", front: "Quartz vs glass hardness", back: "Quartz about 7 Mohs, glass about 5.5: quartz dust abrades glass and anti-reflective coatings.", concepts: ["mz01.dust-mineralogy"] },
  ],
};

export default lesson;
