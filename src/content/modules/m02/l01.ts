import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m02-l01",
  title: "Solar resource & sun geometry",
  summary:
    "Where the energy comes from: extraterrestrial irradiance, air mass, the GHI/DNI/DHI triangle, sun-position geometry, transposition to the module plane, and why a bankable yield needs site-adapted data for Kuwait.",
  minutes: 75,
  objectives: [
    "Compute declination, hour angle, solar elevation, azimuth and air mass for a Kuwait site and time",
    "Use the closure equation to check or derive GHI, DNI and DHI, and transpose them to plane-of-array irradiance",
    "Explain the difference between isotropic and Perez transposition and why it matters for a yield report",
    "Compare TMY data sources (Solargis, Meteonorm, NASA POWER) and specify on-site measurement for a bankable P50/P90",
    "State what is and is not verified about Kuwait's solar resource and how to close the gap",
  ],
  concepts: [
    {
      id: "m02.sun-geometry",
      name: "Sun-position geometry",
      description: "Declination, hour angle, elevation, zenith and azimuth: where the sun is for any site and time.",
      competency: "solar",
      related: ["m02.poa-transposition", "m02.tracker-vs-fixed"],
    },
    {
      id: "m02.irradiance-components",
      name: "Irradiance components (GHI, DNI, DHI)",
      description: "Global, direct-normal and diffuse irradiance, linked by the closure equation; air mass and extraterrestrial irradiance.",
      competency: "solar",
      related: ["m02.poa-transposition", "m02.solar-resource-data"],
    },
    {
      id: "m02.poa-transposition",
      name: "Plane-of-array transposition",
      description: "Converting horizontal irradiance to the tilted/tracking module plane: isotropic vs Perez models, albedo.",
      competency: "solar",
      related: ["m02.bifacial-gain", "m02.loss-tree"],
    },
    {
      id: "m02.solar-resource-data",
      name: "Solar resource data & bankability",
      description: "Satellite TMY sources, ground measurement stations, site adaptation and the role of resource data in P50/P90.",
      competency: "solar",
      related: ["m02.p50-p90", "m02.kuwait-solar-resource"],
    },
    {
      id: "m02.kuwait-solar-resource",
      name: "Kuwait solar resource",
      description: "Kuwait's GHI, DNI, temperature and aerosol climate, and what is verified vs unverified for Shagaya.",
      competency: "solar",
      related: ["m02.soiling", "m02.cell-temperature"],
    },
  ],
  sections: [
    // ============================================================ THEORY
    {
      layer: "theory",
      title: "From the sun to the top of the atmosphere",
      blocks: [
        {
          kind: "md",
          md: md`Every number in a PV yield report — and therefore in the tariff, the debt size and MEWRE's energy forecast — starts with one input: **how much sunlight lands on the module plane, hour by hour, for 25–30 years**. Get the resource wrong by 5 % and no amount of excellent engineering downstream fixes it. This lesson builds that input from first principles so you can interrogate a consultant's resource assessment rather than accept it.

### Extraterrestrial irradiance

The sun radiates as a ~5,800 K blackbody. At the mean Earth–Sun distance the irradiance on a surface normal to the rays, outside the atmosphere, is the **solar constant** $G_{sc} \approx 1361$ W/m². Earth's orbit is slightly elliptical, so the actual top-of-atmosphere normal irradiance varies through the year:`,
        },
        { kind: "equation", formula: "pv-extraterrestrial-irradiance" },
        {
          kind: "md",
          md: md`On 21 June ($n = 172$) this gives ≈ 1,317 W/m²; in early January ≈ 1,406 W/m². Kuwait's peak summer output is *not* because the sun is closer — it is because the sun is high and the days are ~14 h long.

### Air mass

Sunlight crossing the atmosphere is scattered (Rayleigh by molecules, Mie by aerosols and dust) and absorbed (ozone, water vapour, CO₂). The longer the path, the more is lost. **Air mass** measures the path relative to the overhead path:`,
        },
        { kind: "equation", formula: "pv-air-mass" },
        {
          kind: "md",
          md: md`STC module ratings use the **AM 1.5** spectrum (zenith 48.2°). Beyond ~70° zenith the flat-Earth formula blows up and Kasten–Young is used instead. In Kuwait, dust (aerosol optical depth often 0.3–0.8+, much higher in dust events) means that DNI falls off with air mass much faster than in a clean atmosphere — a point that matters a great deal for CSP and for trackers, which earn their extra energy at high air mass in the morning and evening.

### The three components: GHI, DNI, DHI

At the ground, light arrives in two forms:

| Component | What it is | Instrument | Kuwait character |
|---|---|---|---|
| **DNI** — direct normal | Beam from the solar disc (±2.5° half-angle), on a surface tracking the sun | Pyrheliometer on a 2-axis tracker | Reduced strongly by dust; satellite estimates uncertain |
| **DHI** — diffuse horizontal | Scattered skylight on a horizontal surface, sun blocked | Shaded pyranometer (shadow ball) | High fraction for a desert because of aerosols |
| **GHI** — global horizontal | Everything on a horizontal surface | Pyranometer (ISO 9060 Class A for bankable work) | The headline resource number |

They are linked by geometry — the **closure equation**:`,
        },
        { kind: "equation", formula: "pv-closure" },
        {
          kind: "callout",
          tone: "why",
          title: "Why the closure equation is a QA tool, not just physics",
          md: md`Because any two components determine the third, a station measuring all three has a built-in error detector. Persistent closure residuals above ~5 % at high sun tell you a dome is dusty, the tracker has drifted or the shadow ball is misaligned. In a Kuwaiti dust environment, unmaintained ground stations drift fast; **closure checks plus cleaning logs are how you prove a dataset is bankable**. A station that only measures GHI gives no such check — and gives no direct split into beam and diffuse, which the transposition model needs.`,
        },
      ],
    },
    {
      layer: "theory",
      title: "Where is the sun? Deriving declination, hour angle, elevation and azimuth",
      blocks: [
        {
          kind: "md",
          md: md`Picture the celestial sphere centred on the site. Three points matter: the **celestial pole**, the local **zenith**, and the **sun**. They form a spherical triangle whose sides are $90^\circ - \varphi$ (pole to zenith, $\varphi$ = latitude), $90^\circ - \delta$ (pole to sun, $\delta$ = declination) and $\theta_z$ (zenith to sun). The angle at the pole is the **hour angle** $\omega$. Applying the spherical law of cosines gives everything we need.

**Declination** is the latitude where the sun is overhead at solar noon. The Earth's axis is tilted 23.45°, so through the year:`,
        },
        { kind: "equation", formula: "pv-declination" },
        {
          kind: "md",
          md: md`**Hour angle** turns clock time into rotation angle — 15° per hour from solar noon:`,
        },
        { kind: "equation", formula: "pv-hour-angle" },
        {
          kind: "md",
          md: md`Solar time ≠ clock time. Kuwait keeps UTC+3 (reference meridian 45°E) year-round. Shagaya lies at roughly 47°E (approximate), so the longitude correction is $4\ \text{min} \times (47 - 45) \approx 8$ minutes *earlier* solar noon, plus the equation of time (−14 to +16 min). On an hourly simulation a 10-minute timing error at sunrise shifts tracker energy noticeably — check that the yield model's time stamps are interval-centred and in the right time zone.

**Elevation** from the spherical cosine rule, $\cos\theta_z = \sin\varphi\sin\delta + \cos\varphi\cos\delta\cos\omega$, and since $\alpha = 90^\circ - \theta_z$:`,
        },
        { kind: "equation", formula: "pv-solar-elevation" },
        {
          kind: "md",
          md: md`At solar noon ($\omega = 0$), $\alpha_{noon} = 90^\circ - |\varphi - \delta|$. For Shagaya ($\varphi \approx 29.3^\circ$): ≈ 84.2° on 21 June, 60.7° at the equinoxes, 37.3° on 21 December.

**Azimuth** from the same triangle (angle at the zenith):`,
        },
        { kind: "equation", formula: "pv-solar-azimuth" },
        {
          kind: "md",
          md: md`Two practical consequences for Kuwait:

1. **In summer the sun rises north of east and sets north of west.** On 21 June at Shagaya the sunrise azimuth is ≈ 63° (27° north of east). A fixed south-facing array sees the morning and evening sun from *behind* the module for part of the day — wasted. A north–south single-axis tracker rotates east–west and catches it. This is a large part of why trackers win at 29°N.
2. **Winter sun is low (37° at noon).** That sets row spacing for fixed-tilt arrays and backtracking behaviour for trackers (lesson 4).`,
        },
        {
          kind: "widget",
          widget: "sun-path",
          props: { latitude: 29.3, dayOfYear: 172 },
          caption: "Sun path at 29.3°N. Move the day slider from 172 (June) to 355 (December) and watch the noon elevation and sunrise azimuth. Compare tracker vs fixed-tilt POA.",
        },
      ],
    },
    {
      layer: "theory",
      title: "Transposition: from horizontal to the module plane",
      blocks: [
        {
          kind: "md",
          md: md`Modules are tilted (fixed) or rotating (trackers), so we need **plane-of-array (POA)** irradiance. The incidence angle $\theta$ between the sun ray and the module normal comes from the same geometry (PVsyst computes it every hour). The POA irradiance is the sum of three terms:`,
        },
        { kind: "equation", formula: "pv-poa-isotropic" },
        {
          kind: "md",
          md: md`- **Beam**: $DNI\cos\theta$ — exact geometry, no model uncertainty beyond DNI itself.
- **Sky diffuse**: the isotropic model assumes the whole sky dome is equally bright; the module sees a fraction $(1 + \cos\beta)/2$ of it.
- **Ground-reflected**: the module sees $(1 - \cos\beta)/2$ of the ground, which reflects a fraction $\rho$ (albedo) of GHI. For bifacial modules the rear side sees mostly this term (lesson 3).

### Isotropic vs Perez

Real skies are not uniform. Around the sun there is a bright **circumsolar** aureole (forward Mie scattering — very strong in dusty skies), and near the horizon a bright band (**horizon brightening**). The isotropic model treats circumsolar light as if it came from the whole sky, so it *under-predicts* POA on a surface facing the sun — typically by 2–5 % annually for tilted or tracking surfaces.

The **Perez model** (1990) splits sky diffuse into isotropic, circumsolar and horizon components, with coefficients that depend on sky clearness and brightness bins fitted to measurements. It is the PVsyst default and the industry standard for bankable studies. Hay–Davies is a simpler two-component alternative.

| Model | Components | Typical bias on tracker POA | Use |
|---|---|---|---|
| Isotropic (Liu–Jordan) | Uniform sky | −2 to −5 % | Hand checks, conservatism |
| Hay–Davies | Isotropic + circumsolar | −1 to −2 % | Quick models |
| Perez | Isotropic + circumsolar + horizon, empirical bins | Reference | Bankable yield |

Perez coefficients were fitted mostly to temperate-climate data. In a high-aerosol desert the diffuse split and the circumsolar share are uncertain, which is one more reason to measure DNI and DHI on site rather than rely on decomposition models (Erbs, Engerer) that infer them from GHI alone.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why the transposition gain is where yield inflation hides",
          md: md`A tracker plant's POA is ≈ 1.22–1.28 × GHI in Kuwait-like climates. If a consultant uses a decomposition model that over-estimates the beam fraction (too little diffuse), the tracker gain grows — and so does the yield. Always ask for the **POA/GHI ratio** in the report and compare against a second model. A 3 % optimistic transposition gain on a 1.1 GW plant is ~70 GWh/yr of energy that will never arrive.`,
        },
        { kind: "sources", refs: ["perez-1990", "sandia-pvpmc", "nrel-spa", "nrel-solar-resource-handbook-2021"] },
      ],
    },
    // ============================================================ APPLIED
    {
      layer: "applied",
      title: "Computing the sun and the POA for Shagaya",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Sun position at Shagaya, 21 June, 15:00 solar time",
          given: md`Latitude $\varphi = 29.3^\circ$N. Day $n = 172$. Solar time 15:00. Solar constant 1361 W/m².`,
          steps: [
            { md: md`**Declination**: $\delta = 23.45^\circ \sin\left(360^\circ \cdot \frac{284 + 172}{365}\right) = 23.45^\circ \sin(449.75^\circ) = 23.45^\circ \times 1.000 = 23.45^\circ$.` },
            { md: md`**Hour angle**: $\omega = 15^\circ \times (15 - 12) = +45^\circ$ (afternoon).` },
            { md: md`**Elevation**: $\sin\alpha = \sin 29.3^\circ \sin 23.45^\circ + \cos 29.3^\circ \cos 23.45^\circ \cos 45^\circ = 0.4894 \times 0.3979 + 0.8721 \times 0.9174 \times 0.7071 = 0.1947 + 0.5657 = 0.7605$, so $\alpha = 49.5^\circ$ and zenith $\theta_z = 40.5^\circ$.` },
            { md: md`**Azimuth**: $\cos A = \frac{\sin 23.45^\circ - \sin 49.5^\circ \sin 29.3^\circ}{\cos 49.5^\circ \cos 29.3^\circ} = \frac{0.3979 - 0.7605 \times 0.4894}{0.6494 \times 0.8721} = \frac{0.0257}{0.5664} = 0.0454$, so $\arccos = 87.4^\circ$. Afternoon → $A_z = 360^\circ - 87.4^\circ = 272.6^\circ$: the sun is *slightly north of due west* at 15:00.` },
            { md: md`**Air mass**: $AM = 1/\cos 40.5^\circ = 1.31$.` },
            { md: md`**Extraterrestrial normal irradiance**: $G_{on} = 1361 \times [1 + 0.033\cos(360^\circ \times 172/365)] = 1361 \times (1 - 0.0324) = 1317$ W/m².` },
          ],
          result: md`$\alpha \approx 49.5^\circ$, $A_z \approx 272.6^\circ$, $AM \approx 1.31$, $G_{on} \approx 1317$ W/m². A south-facing fixed array at 25° tilt has its normal pointing at azimuth 180°; the sun at 272.6° is almost 93° off in azimuth — the module receives beam at a steep angle. A tracker rolled ~40° to the west faces it almost directly.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Closure and POA at the equinox, solar noon",
          given: md`Equinox, solar noon at Shagaya: $\theta_z = \varphi = 29.3^\circ$. A ground station measures $DNI = 850$ W/m² and $DHI = 120$ W/m². Fixed array facing south, tilt $\beta = 25^\circ$, so the angle of incidence is $\theta = |29.3 - 25| = 4.3^\circ$. Albedo $\rho = 0.30$ (light desert sand). Use the isotropic model.`,
          steps: [
            {
              md: md`**GHI from closure**: $GHI = 850 \cos 29.3^\circ + 120 = 850 \times 0.8721 + 120 = 861$ W/m².`,
              hidden: true,
              check: { prompt: "GHI (W/m²)", answer: 861.3, unit: "W/m²", tolerance: { rel: 0.01 } },
            },
            { md: md`**Beam on plane**: $850 \cos 4.3^\circ = 847.6$ W/m².` },
            { md: md`**Sky diffuse**: $120 \times (1 + \cos 25^\circ)/2 = 120 \times 0.9532 = 114.4$ W/m².` },
            { md: md`**Ground reflected**: $861.3 \times 0.30 \times (1 - \cos 25^\circ)/2 = 861.3 \times 0.30 \times 0.0468 = 12.1$ W/m².` },
            {
              md: md`**POA total**: $847.6 + 114.4 + 12.1 = 974$ W/m².`,
              hidden: true,
              check: { prompt: "POA irradiance (W/m²)", answer: 974.1, unit: "W/m²", tolerance: { rel: 0.01 } },
            },
          ],
          result: md`POA ≈ 974 W/m², i.e. 1.13 × GHI at this moment. The beam term is 87 % of POA — so DNI accuracy dominates POA accuracy. That is exactly why the KISR finding that satellite DNI diverges in Kuwait matters for PV too, not only CSP.`,
        },
        {
          kind: "question",
          question: {
            id: "m02-l01-p1",
            type: "numeric",
            prompt: md`Independent problem. Compute the **air mass at solar noon on 21 December** at Shagaya ($\varphi = 29.3^\circ$, $\delta = -23.45^\circ$). Use $AM = 1/\sin\alpha$.`,
            answer: 1.654,
            tolerance: { rel: 0.02 },
            unit: "—",
            explanation: md`$\alpha_{noon} = 90^\circ - |29.3^\circ - (-23.45^\circ)| = 90^\circ - 52.75^\circ = 37.25^\circ$. $AM = 1/\sin 37.25^\circ = 1/0.6053 = 1.65$. The winter noon sun at Shagaya passes through more atmosphere than the STC reference (AM 1.5) — so winter spectra are redder and DNI more sensitive to dust. This low angle also defines the worst-case row-to-row shading geometry.`,
            concepts: ["m02.sun-geometry", "m02.irradiance-components"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "applied",
      title: "Kuwait's resource: what we know and what we don't",
      blocks: [
        {
          kind: "widget",
          widget: "kuwait-climate",
          props: { metric: "ghi" },
          caption: "Indicative monthly GHI, DNI and temperature climatology for Shagaya/Kuwait. Indicative only — not a bankable dataset.",
        },
        {
          kind: "md",
          md: md`**Indicative profile.** Kuwait is a hot, arid, high-aerosol desert at ~29°N. GHI peaks in May–July (monthly ≈ 220–240 kWh/m² range indicatively) and is lowest in December. DNI is suppressed in late spring/summer by dust and haze — the shamal season — so the DNI/GHI ratio is lower in summer than a clear-sky model predicts. Ambient temperatures above 45 °C are routine in summer afternoons, and the WMO-verified Asian record is 53.9 °C at Mitribah (21 July 2016).`,
        },
        {
          kind: "callout",
          tone: "kuwait",
          title: "What the sources actually say",
          md: md`- **KISR (EuroSun 2014)** compared ground measurements at five Kuwaiti sites with SolarGIS, MERRA and NASA SSE: **GHI agrees reasonably after site adaptation; DNI estimates diverge significantly** because of aerosol uncertainty.
- **Record heat:** 53.9 °C at Mitribah, 21 July 2016, WMO-verified.
- **Soiling at Shagaya:** the KISR-linked PV testbed paper reports substantial soiling and monthly water cleaning (lesson 5).`,
        },
        { kind: "sources", refs: ["kisr-eurosun-2014-resource", "wmo-mitribah-2019", "rser-2020-shagaya-pv-testbed"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "Annual GHI for Shagaya is not verified",
          md: md`The only figure in the research brief — **GHI ≈ 1,900–2,100 kWh/m²/yr** — comes from a secondary market report (Mordor Intelligence). Official GHI, DNI and PVOUT for Shagaya were **not retrieved**. Before using any number in a memo, pull the site from the Global Solar Atlas (globalsolaratlas.info) and request KISR's station data. This course uses ≈ 2,000–2,100 kWh/m²/yr as an *illustrative* value in worked examples.`,
        },
        { kind: "sources", refs: ["mordor-kuwait-solar-ghi", "global-solar-atlas"] },
      ],
    },
    // ============================================================ FIELD
    {
      layer: "field",
      title: "Resource data in practice: TMY sources, ground stations, bankability",
      blocks: [
        {
          kind: "md",
          md: md`### The data sources you will see in every yield report

| Source | Method | Resolution | Strength | Weakness in Kuwait |
|---|---|---|---|---|
| **Solargis** | Satellite (Meteosat) + aerosol (CAMS/MERRA-2) models, 1994/2007–present | ~250 m–2 km, 15 min | Industry bankable reference; uncertainty statements; site adaptation service | Aerosol model drives DNI error in dust |
| **Meteonorm** | Interpolated ground stations + satellite, stochastic hourly generation | Station/interpolated | Cheap, built into PVsyst, includes temperature | Synthetic hourly data; sparse stations in Gulf |
| **NASA POWER** | MERRA-2 reanalysis + CERES satellite | ~0.5° (~50 km) | Free, long record, good for screening | Coarse; not bankable for a GW plant |
| **Global Solar Atlas** | Solargis long-term averages | ~250 m | Free, fast, credible screening map | Annual/monthly averages only |
| **On-site station** | Pyranometers, pyrheliometer, temperature, wind, soiling | Point, 1-min | Ground truth; enables site adaptation | Needs ≥ 12 months, rigorous cleaning and calibration |

A **TMY (typical meteorological year)** stitches together the most "typical" month from each calendar month of a long record into one 8,760-hour year. It is designed to give P50 energy — not the variability. Ask whether the consultant built a TMY for P50 and a separate **P90 year** or used statistical uncertainty on top (lesson 6).

### Why bankable yield needs site data

Satellite models infer irradiance from cloud reflectance and an aerosol model. Over a cloud-free desert the cloud part is easy — the **aerosol part is the error**. **Site adaptation** uses ≥ 12 months of high-quality ground data to correct the long-term satellite series (bias and distribution). Typical outcome: long-term GHI uncertainty falls from ≈ 4–6 % to ≈ 2.5–3.5 %. On a 1.1 GW plant, that tightening raises P90 by tens of GWh per year and therefore debt capacity — which ultimately lowers the tariff MEWRE pays. A good station is a few hundred thousand dollars; it is the best-value item in a development budget.

**Station spec (IEC 61724-1 Class A as reference):** two ISO 9060 Class A (secondary-standard) pyranometers for GHI (redundancy), one in POA; a pyrheliometer on a sun tracker for DNI with shaded pyranometer for DHI; ventilated temperature sensor; ultrasonic anemometer; soiling measurement (paired clean/dirty reference cells or optical soiling sensor); daily cleaning log; annual recalibration traceable to the World Radiometric Reference.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Dirty domes.** In Kuwait a pyranometer left uncleaned for a week can read several percent low. Missing cleaning logs make a year of data worthless.
- **Station placed for convenience** (next to the site office, shaded at sunrise by a container) rather than representative of the array area.
- **Short or gappy records**: a 6-month dataset covering only winter cannot correct a summer aerosol bias.
- **Copy-paste resource**: a bidder's yield report reusing a Meteonorm file for a neighbouring country's site.
- **Time-stamp shift**: data logged in UTC but read as local time — a 3-hour shift that silently corrupts the tracker gain and the hourly profile.`,
        },
        {
          kind: "checklist",
          title: "PM checks on a resource assessment",
          items: [
            "Data sources named, with period of record, resolution and version",
            "Site adaptation performed with ≥ 12 months of on-site data; method and before/after bias shown",
            "Ground station: Class A instruments, cleaning log, calibration certificates, closure-check statistics",
            "Long-term GHI and DNI compared across ≥ 2 independent sources with a reconciliation narrative",
            "Transposition model stated (Perez expected); POA/GHI ratio reported per month",
            "Albedo value justified (measured over local sand, seasonal), not a default 0.2",
            "Resource uncertainty broken down: model, measurement, site adaptation, long-term variability",
            "Time stamps and time zone verified in the hourly file",
          ],
        },
        {
          kind: "ask",
          title: "Ask the consultant / bidder",
          items: [
            "Which satellite source and version did you use, and what is its validated bias against KISR or on-site stations in Kuwait?",
            "What is the DNI/DHI split in your hourly file, and how was it derived — measured or decomposition model?",
            "How many months of on-site data do you have, and how did you treat dust-storm days and cleaning gaps?",
            "What is your long-term GHI uncertainty before and after site adaptation?",
            "What albedo did you assume for the bifacial and ground-reflected terms, and was it measured?",
          ],
        },
        { kind: "scenario", scenario: "m02-s1" },
        {
          kind: "feynman",
          prompt: "Explain to a MEWRE finance colleague why the ministry should fund a ground measurement station a year before the PV tender, even though satellite data for Kuwait is free.",
          keyPoints: [
            "Satellite irradiance over deserts is limited by aerosol modelling, and KISR found DNI diverges in Kuwait",
            "Site adaptation with ≥ 12 months of ground data reduces resource uncertainty",
            "Lower uncertainty raises P90, which increases debt capacity and lowers the bid tariff",
            "The station is cheap relative to the value of a few percent of energy over 30 years",
            "Data quality depends on cleaning, calibration and closure checks",
          ],
        },
        { kind: "sources", refs: ["solargis", "meteonorm", "nasa-power", "global-solar-atlas", "iec-61724-1", "nrel-solar-resource-handbook-2021"] },
      ],
    },
  ],
  quiz: [
    {
      id: "m02-l01-q1",
      type: "mcq",
      prompt: md`A ground station at Shagaya measures GHI = 800 W/m² and DHI = 180 W/m² when the solar zenith is 30°. What DNI does closure imply?`,
      options: ["620 W/m²", "716 W/m²", "537 W/m²", "980 W/m²"],
      answer: 1,
      explanation: md`$DNI = (GHI - DHI)/\cos\theta_z = (800 - 180)/0.866 = 716$ W/m². 620 is the beam on the horizontal, not normal. If the station's own pyrheliometer reads, say, 650 W/m², the 10 % closure residual means something is dirty or misaligned.`,
      concepts: ["m02.irradiance-components"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m02-l01-q2",
      type: "numeric",
      prompt: md`What is the solar elevation at solar noon at Shagaya ($\varphi = 29.3^\circ$N) on the March equinox?`,
      answer: 60.7,
      tolerance: { abs: 0.3 },
      unit: "°",
      explanation: md`At the equinox $\delta = 0$, so $\alpha_{noon} = 90^\circ - |\varphi - 0| = 90 - 29.3 = 60.7^\circ$.`,
      concepts: ["m02.sun-geometry"],
      difficulty: 1,
    },
    {
      id: "m02-l01-q3",
      type: "mcq",
      prompt: md`Why does the isotropic sky model usually under-predict POA irradiance for a tracker compared with Perez?`,
      options: [
        "It ignores ground-reflected irradiance",
        "It spreads bright circumsolar diffuse uniformly over the sky dome, so a sun-facing surface receives too little of it",
        "It uses GHI instead of DNI for the beam component",
        "It assumes the albedo is zero",
      ],
      answer: 1,
      explanation: md`Circumsolar diffuse comes from near the sun's direction — a sun-facing module captures nearly all of it. Isotropic treats it as coming from the whole dome, applying the $(1+\cos\beta)/2$ view factor, so it underestimates. In dusty skies the circumsolar share is large, so the gap can be several percent.`,
      concepts: ["m02.poa-transposition"],
      difficulty: 2,
    },
    {
      id: "m02-l01-q4",
      type: "multi",
      prompt: md`Which statements about Kuwait's solar resource are supported by the sources in this lesson? Select all.`,
      options: [
        "KISR found satellite GHI agrees reasonably with ground data after site adaptation",
        "KISR found satellite DNI estimates diverge significantly from ground data",
        "Official Shagaya GHI is verified at 2,350 kWh/m²/yr",
        "The WMO verified 53.9 °C at Mitribah in July 2016",
      ],
      answer: [0, 1, 3],
      explanation: md`Options 1, 2 and 4 are from KISR (EuroSun 2014) and WMO (2019). No official Shagaya GHI was retrieved; the only figure (1,900–2,100 kWh/m²/yr) is from a secondary source and is flagged unverified. Distinguishing sourced from unsourced numbers is a core PM habit.`,
      concepts: ["m02.kuwait-solar-resource", "m02.solar-resource-data"],
      difficulty: 1,
    },
    {
      id: "m02-l01-q5",
      type: "order",
      prompt: md`Order the steps to turn raw resource data into an hourly POA file for a bankable yield study.`,
      items: [
        "Install Class A ground station and log ≥ 12 months with cleaning records",
        "Quality-control the ground data (closure checks, gap flags, cleaning events)",
        "Site-adapt the long-term satellite series to the ground data",
        "Build P50 TMY (and P90 year if required) from the adapted series",
        "Transpose to POA with Perez using measured albedo",
      ],
      explanation: md`Measurement → QC → site adaptation → TMY → transposition. Doing site adaptation on unchecked data bakes measurement errors into 30 years of forecast.`,
      concepts: ["m02.solar-resource-data", "m02.poa-transposition"],
      difficulty: 2,
    },
    {
      id: "m02-l01-q6",
      type: "decision",
      prompt: md`You are the MEWRE PM. A bidder's yield report for a Shagaya PV IPP uses NASA POWER as the only resource source, with no site adaptation, and claims a resource uncertainty of 3 %. What do you do?`,
      options: [
        { text: "Accept it — NASA is a reputable agency.", score: 0, feedback: "Reputable agency, wrong tool: ~50 km resolution reanalysis is a screening dataset. 3 % uncertainty is not credible without site adaptation." },
        { text: "Issue a clarification asking for a second bankable source (e.g. Solargis), site adaptation against KISR/on-site data, and a justified uncertainty breakdown; flag the yield as unverified in the evaluation.", score: 1, feedback: "Correct: you do not reject the bid outright, but you require bankable inputs and evaluate the yield claim against an independent check." },
        { text: "Reject the bid as non-compliant immediately.", score: 0.3, feedback: "Possibly heavy-handed unless the RFP explicitly required a named bankable source; clarification is the proportionate first step and protects competition." },
        { text: "Replace their yield with your own Global Solar Atlas estimate in the evaluation.", score: 0.4, feedback: "A useful cross-check, but silently substituting numbers in evaluation is procedurally risky; ask the bidder first and document." },
      ],
      explanation: md`In a tariff-based IPP the bidder carries yield risk, but MEWRE still relies on the yield for energy planning and the deemed-energy regime. Insist on bankable sources and transparent uncertainty.`,
      concepts: ["m02.solar-resource-data"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m02-l01-f1", front: "Closure equation", back: md`$GHI = DNI\cos\theta_z + DHI$`, concepts: ["m02.irradiance-components"] },
    { id: "m02-l01-f2", front: "Solar constant (approx.)", back: "≈ 1361 W/m² at mean Earth–Sun distance; varies ±3.3 % over the year.", concepts: ["m02.irradiance-components"] },
    { id: "m02-l01-f3", front: "AM 1.5 corresponds to what zenith angle?", back: "48.2° (the STC reference spectrum).", concepts: ["m02.irradiance-components"] },
    { id: "m02-l01-f4", front: "Solar elevation at noon", back: md`$\alpha_{noon} = 90^\circ - |\varphi - \delta|$`, concepts: ["m02.sun-geometry"] },
    { id: "m02-l01-f5", front: "Shagaya noon elevation: June vs December", back: "≈ 84° (21 June) vs ≈ 37° (21 December) at 29.3°N.", concepts: ["m02.sun-geometry"] },
    { id: "m02-l01-f6", front: "Perez vs isotropic", back: "Perez adds circumsolar and horizon-brightening diffuse; isotropic under-predicts tracker POA by ≈ 2–5 %.", concepts: ["m02.poa-transposition"] },
    { id: "m02-l01-f7", front: "What does site adaptation do?", back: "Corrects a long-term satellite irradiance series using ≥ 12 months of quality ground data, cutting resource uncertainty.", concepts: ["m02.solar-resource-data"] },
    { id: "m02-l01-f8", front: "KISR finding on satellite data in Kuwait", back: "GHI agrees reasonably after site adaptation; DNI diverges significantly (aerosols).", concepts: ["m02.kuwait-solar-resource"] },
    { id: "m02-l01-f9", front: "TMY", back: "Typical meteorological year: 8,760 hours built from the most typical months of a long record; represents P50, not variability.", concepts: ["m02.solar-resource-data"] },
  ],
  scenarios: [
    {
      id: "m02-s1",
      title: "Two resource numbers, one tender",
      dayInLife: true,
      context: md`You are the MEWRE technical PM supporting KAPP on a new 500 MW PV IPP at Shagaya. The Owner's Engineer (OE) is preparing the RFP technical annex, including a reference yield that bidders will see. The OE's draft quotes GHI 2,050 kWh/m²/yr from Solargis. A KISR researcher emails you that their station 15 km away measured about 4 % less over the last two years.`,
      start: "a",
      concepts: ["m02.solar-resource-data", "m02.kuwait-solar-resource"],
      nodes: {
        a: {
          md: md`The RFP is due to be issued in three weeks. The OE says: "Solargis is bankable; the KISR station is probably dirty. Let's not delay." What do you do first?`,
          choices: [
            { text: "Ask KISR for the raw station data, cleaning logs and calibration certificates, and ask the OE to run a comparison against Solargis for the overlap period.", next: "b", score: 10, feedback: "Right first move: evidence before opinion. A 4 % gap is within plausible satellite aerosol bias in Kuwait." },
            { text: "Agree with the OE and issue the RFP as drafted.", next: "c", score: 2, feedback: "You may be publishing a reference yield that is 4 % optimistic, and every bidder will price off it." },
            { text: "Replace the Solargis figure with KISR's lower number in the RFP.", next: "c", score: 4, feedback: "Unchecked ground data can be as wrong as satellite data. You need QC first." },
          ],
        },
        b: {
          md: md`The data arrive. Closure residuals are under 3 % on days with cleaning records, but there are two summer months with no cleaning log. On cleaned days the station is 3.5 % below Solargis for GHI and 9 % below for DNI. What do you put in the RFP?`,
          choices: [
            { text: "Publish the resource as indicative only, provide the KISR dataset as a data-room reference, and require each bidder to submit its own site-adapted resource assessment with an uncertainty breakdown.", next: "d", score: 10, feedback: "Good practice for an IPP: the bidder carries yield risk, and you give them better information to price it, which reduces risk premiums." },
            { text: "Publish Solargis as the binding reference yield for evaluation.", next: "d", score: 3, feedback: "If MEWRE publishes a binding resource figure, MEWRE may end up owning the resource risk in disputes." },
          ],
        },
        c: {
          md: md`Two months after award, the preferred bidder's lenders' technical advisor (LTA) raises a resource gap of 4 % from KISR data. The bidder asks to revisit the tariff before financial close. How do you respond?`,
          choices: [
            { text: "Check the RFP wording: if MEWRE did not warrant the resource, the risk sits with the bidder; record lessons learned and plan a site station for the next tender.", score: 6, feedback: "Defensible contractually, but the delay to financial close is a real cost to MEWRE's schedule that a better process would have avoided." },
            { text: "Agree to re-open the tariff to protect the schedule.", score: 1, feedback: "Re-opening a competitive tariff post-award is a procurement-integrity problem and invites Audit Bureau scrutiny." },
          ],
        },
        d: {
          md: md`Final step: you write a 1-page note to the Director recommending a permanent Class A station network at Shagaya. Which justification will land best?`,
          choices: [
            { text: "It reduces resource uncertainty, which raises P90 and lowers bid tariffs on every future GW procured — a small cost against large tariff savings over 30 years.", score: 10, feedback: "Frames the technical point in the Director's terms: tariff and risk." },
            { text: "Ground stations are international best practice.", score: 5, feedback: "True but not persuasive on its own; ministries fund outcomes, not best practice." },
          ],
        },
      },
    },
  ],
};

export default lesson;
