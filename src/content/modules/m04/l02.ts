import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m04-l02",
  title: "Wind Resource: Weibull, Shear, Measurement and AEP",
  summary:
    "How wind speed is distributed (Weibull), why the cube mean matters, how speed varies with height, how a bankable measurement campaign and MCP work, how AEP and its losses are built up to P50/P90 — and what Shagaya's 10 MW farm tells us.",
  minutes: 80,
  objectives: [
    "You can fit and use a Weibull distribution (k, c) to compute time fractions and mean power density",
    "You can explain why mean power density is not ½ρ·(mean speed)³ and quantify the energy pattern factor",
    "You can extrapolate wind speed to hub height with power and log laws and judge their limits in desert conditions",
    "You can describe a bankable measurement campaign (met mast, LiDAR, MCP) and build AEP from gross to net to P90",
    "You can state what is known about Shagaya's wind performance and flag inconsistencies in the sources",
  ],
  concepts: [
    {
      id: "m04.weibull",
      name: "Weibull wind distribution",
      description: "Two-parameter (k shape, c scale) distribution of wind speeds; k≈2 typical, higher k for steadier regimes.",
      competency: "wind-storage",
      related: ["m04.cube-mean", "m04.aep"],
    },
    {
      id: "m04.cube-mean",
      name: "Cube mean and energy pattern factor",
      description: "Mean power density depends on the mean of v³, ~1.9× the cube of mean speed for k=2.",
      competency: "wind-storage",
    },
    {
      id: "m04.wind-shear",
      name: "Wind shear",
      description: "Increase of wind speed with height, modelled by power or log law; strongly dependent on atmospheric stability.",
      competency: "wind-storage",
    },
    {
      id: "m04.wind-measurement",
      name: "Wind measurement and MCP",
      description: "Met masts, LiDAR, data quality, and measure-correlate-predict against a long-term reference.",
      competency: "wind-storage",
      related: ["m04.aep", "m02.solar-resource-data"],
    },
    {
      id: "m04.aep",
      name: "AEP, losses and P50/P90",
      description: "Gross energy from power curve × distribution, net after losses, and exceedance values from combined uncertainty.",
      competency: "wind-storage",
      related: ["m02.p50-p90", "m15.energy-yield-basis"],
    },
    {
      id: "m04.shagaya-wind",
      name: "Shagaya 10 MW wind farm",
      description: "Kuwait's first wind farm: five 2 MW turbines, 7.9 m/s at 80 m, ~42–45 % capacity factor in first years.",
      competency: "wind-storage",
      related: ["m04.aep", "m00.shagaya-phase1"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Describing the wind statistically",
      blocks: [
        {
          kind: "md",
          md: md`## Why a distribution, not an average

Because power goes as $v^3$, a site that blows 4 m/s half the time and 12 m/s the other half (mean 8) has far more energy than a site steady at 8 m/s: $\tfrac12(4^3 + 12^3) = 896$ versus $8^3 = 512$. So energy yield depends on the **whole distribution** of wind speeds at hub height, not just its mean.

## The Weibull distribution`,
        },
        { kind: "equation", formula: "weibull-pdf" },
        {
          kind: "md",
          md: md`- **Scale c** (m/s) sets the overall speed level (for k = 2, $c \approx 1.128\,\bar v$).
- **Shape k** sets the spread: k ≈ 1.5–2 for variable continental sites, k = 2 is the **Rayleigh** special case, k ≈ 2.5–3.5 for steady trade-wind or monsoon regimes. Steady seasonal winds such as Kuwait's summer shamal tend to raise k in those months.
- Fraction of time above speed $v$: $e^{-(v/c)^k}$ — useful for estimating hours at rated power or above cut-out.

## Mean vs cube mean`,
        },
        { kind: "equation", formula: "weibull-moments" },
        {
          kind: "md",
          md: md`Mean power density = $\tfrac12\rho\,\overline{v^3}$. The ratio $\overline{v^3}/\bar v^3$ — the **energy pattern factor** — is:

| k | 1.5 | 2.0 | 2.5 | 3.0 |
|---|---|---|---|---|
| EPF | 2.72 | 1.91 | 1.58 | 1.40 |

So for the same mean speed, a gusty site (low k) has **more** power density than a steady site — but a turbine can't harvest it all, because power above rated is shed by pitching and power below cut-in is lost. That is why AEP must be computed by integrating the actual power curve against the distribution, not from power density.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why the cube mean trips people up",
          md: md`Write $\tfrac12\rho\bar v^3$ with Shagaya's 7.9 m/s and ρ = 1.10 and you get ~271 W/m². The correct Weibull (k = 2) power density is ~518 W/m² — nearly double. Errors like this in quick estimates lead to wrong technology comparisons. Always ask: "Is that the cube of the mean, or the mean of the cube?"`,
        },
        {
          kind: "md",
          md: md`## Wind shear: speed versus height

Wind speed increases with height above ground because surface friction slows the air near the ground. Two models:`,
        },
        { kind: "equation", formula: "wind-shear-power-law" },
        { kind: "equation", formula: "wind-shear-log-law" },
        {
          kind: "md",
          md: md`Desert specifics:

- **Daytime** (strong surface heating, convective mixing): low shear, α ≈ 0.08–0.14.
- **Night** (radiative cooling, stable stratification): high shear, α ≈ 0.25–0.4+, sometimes with a **low-level jet** at 100–300 m — great for tall turbines, but creates large speed differences across the rotor (fatigue loads) and power-curve deviations.
- The smooth sand surface ($z_0 \approx 0.0003$ m) means the neutral log law predicts low shear, which underestimates night-time shear. **Use measured shear by hour and season** from at least two (preferably three or more) measurement heights.

## Measuring the resource

A bankable assessment needs **at least 12 months** of on-site measurement at or near hub height, correlated to **10–20+ years** of long-term reference data.

| Tool | Strengths | Weaknesses |
|---|---|---|
| **Met mast** (lattice, 80–120 m+) with cup/sonic anemometers at 3+ heights, wind vanes, T/p/RH | Traceable (MEASNET-calibrated cups), IEC 61400-50-1, lenders trust it | Expensive, slow to permit/erect, below modern hub heights (120–160 m) |
| **Ground LiDAR** (vertical profiling) | Measures to 200–300 m; mobile; quick | Needs verification against a mast (IEC 61400-50-2); dust and low aerosol can affect data availability; power supply in the desert |
| **Nacelle LiDAR** | Power-curve testing, yaw alignment | Not for pre-construction resource |
| **SCADA of existing turbines** | Real long-term data (e.g. Shagaya) | Affected by wakes, curtailment, availability |

**MCP (measure–correlate–predict)**: correlate concurrent on-site and reference data (reanalysis such as ERA5/MERRA-2, or a nearby airport station), build a relationship (linear regression, variance ratio, matrix method by direction sector), and apply it to the long-term reference record to predict the long-term site distribution. This corrects for the fact that the measurement year may have been windier or calmer than average. Inter-annual variability of mean wind speed is typically ~5–7 % (≈ 10–14 % in energy).

## From wind to AEP`,
        },
        { kind: "equation", formula: "wind-aep" },
        {
          kind: "md",
          md: md`Typical onshore loss stack (product, not sum):

| Loss category | Typical | Desert notes |
|---|---|---|
| Wake | 5–12 % | Low turbulence + stable nights → slower recovery |
| Availability (turbine, BoP, grid) | 3–6 % | Remote spares logistics; grid outages |
| Electrical (collection, transformer) | 2–3 % | Higher resistive losses at high temperature |
| Turbine performance (power curve, hysteresis) | 1–3 % | Turbulence/shear outside inner range |
| Environmental (blade soiling/erosion, high-temperature derating) | 1–4 % | Sand erosion, derating above ~40 °C |
| Curtailment (grid, environmental) | 0–5 % | Depends on MEWRE dispatch and grid strength |

Total losses of 10–20 % are normal; net CF = gross CF × (1 − L).

## Uncertainty and P-values`,
        },
        { kind: "equation", formula: "wind-exceedance" },
        {
          kind: "md",
          md: md`Uncertainty components (expressed as % of energy) are combined by root-sum-square: measurement (2–4 %), long-term correlation (2–4 %), future inter-annual variability (1-year ~6–10 %, 10-year ~2–3 %), vertical extrapolation (1–5 %), flow/wake modelling (3–6 %), power curve and losses (2–4 %). Total 10-year uncertainty is typically 8–12 %. Lenders size debt on P90 (1-year or 10-year); equity looks at P50.`,
        },
        { kind: "widget", widget: "weibull", props: { k: 2, c: 8.9 }, caption: "Set c = 8.9 m/s and vary k from 1.6 to 3. Watch how AEP and capacity factor change even though the mean speed hardly moves." },
        { kind: "widget", widget: "p50-p90", props: { p50: 150, sigma: 8 }, caption: "Exceedance values for a 150 GWh/yr farm with 8 % uncertainty." },
        {
          kind: "md",
          md: md`## Shagaya: what the data say

Kuwait's only operating wind farm is the 10 MW Shagaya Phase I farm (five 2 MW turbines; Elecnor; commissioned May 2017).`,
        },
        {
          kind: "callout",
          tone: "kuwait",
          title: "Shagaya wind performance (published)",
          md: md`- Long-term mean wind speed **7.9 m/s at 80 m**.
- Capacity factor **45.2 % in year 1 (~40 GWh)** and **42.1 % in year 2 (~37 GWh)**; about **70 % CF in summer months** (peer-reviewed study, ~2021).
- A KISR conference paper reports **42.59 GWh in year 1, "21 % above" a 31.16 GWh contractual figure**.

These are high capacity factors for 2 MW-class turbines, driven by strong, steady summer (shamal) winds — which coincide with Kuwait's peak demand season, a valuable correlation.`,
        },
        { kind: "sources", refs: ["m04-shagaya-wind-performance", "m04-kisr-e3s-2021", "m04-elecnor-award"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "Inconsistencies to resolve before quoting",
          md: md`- 42.59 GWh on 10 MW is a **48.6 % CF**, not 45.2 %; the two studies use different periods/methods.
- 42.59 / 31.16 = 1.37, i.e. **37 % above** the contractual figure, not 21 % as stated — either the contractual figure, the period, or the percentage is misreported.
- Turbine model, hub height and the contractual (P50?) basis are not given in the research brief.
Ask KISR for the operating SCADA data and the contract energy definition before using these numbers in any official comparison.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "From mean speed to bankable energy",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Weibull statistics and AEP for a Shagaya-like site",
          given: md`Long-term hub-height mean speed 7.9 m/s, Weibull k = 2 (assumed), air density 1.10 kg/m³. A generic 2 MW turbine: cut-in 3 m/s, rated 12 m/s, cut-out 25 m/s, with $P = 2{,}000\,(v^3 - 27)/(12^3 - 27)$ kW between cut-in and rated. Losses 12 %, 10-year uncertainty 10 %.`,
          steps: [
            { md: md`**Scale factor:** $c = \bar v / \Gamma(1.5) = 7.9 / 0.8862 = 8.91$ m/s.` },
            { md: md`**Time above rated:** $e^{-(12/8.91)^2} = e^{-1.81} = 0.163$ → 16 % of hours (~1,430 h) at full power.` },
            { md: md`**Time below cut-in:** $1 - e^{-(3/8.91)^2} = 0.107$ → 11 % idle.` },
            { md: md`**Mean power density:** $\tfrac12 \times 1.10 \times 8.91^3 \times \Gamma(2.5) = 0.55 \times 708.3 \times 1.329 = 518$ W/m² (vs 271 W/m² from the cube of the mean).` },
            { md: md`**Gross AEP** by numerically integrating $P(v) f(v)$ over 0–30 m/s × 8,760 h: ≈ **6,470 MWh** → gross CF 36.9 %.` },
            { md: md`**Net P50:** $6{,}474 \times 0.88 = 5{,}697$ MWh → net CF 32.5 %.` },
            { md: md`**P90 (10-yr):** $5{,}697 \times (1 - 1.282 \times 0.10) = 4{,}967$ MWh.` },
          ],
          result: md`About **5.7 GWh/yr P50** and **5.0 GWh/yr P90** per 2 MW turbine with these generic assumptions. Shagaya's measured ~42–45 % CF is well above this 32.5 % estimate — implying a higher effective k (steady shamal), a lower-specific-power rotor, or strong seasonality that a single annual Weibull hides. **Lesson: fit Weibulls by month or use the measured time series; an annual k = 2 can badly misrepresent a monsoon-like regime.**`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Extrapolating a 50 m mast to a 100 m hub",
          given: md`Long-term mean at 50 m is 7.0 m/s. Daytime-dominated shear exponent α = 0.14. Also compare a log law with $z_0$ = 0.0003 m.`,
          steps: [
            { md: md`Power law: $v_{100} = 7.0 \times (100/50)^{0.14}$.` },
            {
              md: md`$2^{0.14} = 1.102$ → $v_{100} = 7.71$ m/s.`,
              hidden: true,
              check: { prompt: "Hub-height mean speed (power law)", answer: 7.71, unit: "m/s", tolerance: { rel: 0.01 } },
            },
            {
              md: md`Log law: $7.0 \times \ln(100/0.0003)/\ln(50/0.0003) = 7.0 \times 12.72/12.02 = 7.40$ m/s.`,
              hidden: true,
              check: { prompt: "Hub-height mean speed (log law)", answer: 7.40, unit: "m/s", tolerance: { rel: 0.01 } },
            },
            { md: md`If stable nights push the effective α to 0.25: $7.0 \times 2^{0.25} = 8.32$ m/s. The spread 7.40–8.32 m/s is ~12 % in speed and ~40 % in power density ($1.124^3 \approx 1.42$).` },
          ],
          result: md`Shear assumptions can swing hub-height energy by tens of percent. This is why modern campaigns measure at or above hub height (tall masts or LiDAR) rather than extrapolating from 50 m.`,
        },
        {
          kind: "question",
          question: {
            id: "m04-l02-p1",
            type: "numeric",
            prompt: md`A wind farm has net P50 = 150 GWh/yr and combined 10-year uncertainty σ = 8 %. What is the P90 (10-year) energy in GWh/yr?`,
            answer: 134.62,
            tolerance: { rel: 0.01 },
            unit: "GWh/yr",
            explanation: md`$P_{90} = 150 \times (1 - 1.2816 \times 0.08) = 150 \times 0.8975 = 134.6$ GWh/yr. P99 would be $150 \times (1 - 2.326 \times 0.08) = 122.1$ GWh/yr. Lenders typically size debt so DSCR holds at P90 (or P99 1-yr).`,
            concepts: ["m04.aep"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running a bankable wind measurement campaign",
      blocks: [
        {
          kind: "md",
          md: md`## Roles and documents

- **MEWRE / KAPP** — for an IPP, the procurer may provide a measurement dataset in the data room to reduce bidder risk and level the field; for a ministry-owned project MEWRE commissions the campaign.
- **Wind consultant / Owner's Engineer** — designs the campaign, installs and maintains instruments, quality-controls data, runs MCP, flow and wake modelling (WAsP, WindPRO, WindFarmer, CFD), and issues the **energy yield assessment (EYA)**.
- **Independent engineer for lenders** — reviews the EYA and often issues its own P50/P90.
- **KISR** — holds historical measurements and Shagaya SCADA, and is the natural partner for long-term reference data.
- **Meteorological Department / airport stations** — long-term references (check for instrument changes and sheltering).

Key documents: measurement plan, instrument calibration certificates (MEASNET), monthly data reports with recovery rates (>90 % target), site visit reports, MCP report, EYA with loss and uncertainty tables.

## Desert-specific campaign issues

- **Dust on instruments**: cup anemometer bearings wear faster; sonic anemometers and LiDAR optics need cleaning. Plan monthly maintenance visits.
- **Heat**: logger and LiDAR electronics must be rated (or shaded/ventilated) for 55 °C+; solar-battery power systems sized for dust on panels.
- **Lightning**: masts need proper earthing; spring and autumn thunderstorms damage loggers.
- **Security and access**: remote desert sites and military/oil-sector zones need permits.
- **Shamal and dust storms**: data loss exactly during the most energetic periods biases the dataset if not handled.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- Measurement shorter than 12 months → seasonal bias; in Kuwait missing a shamal season is fatal.
- Using an airport reference that changed instruments or had new buildings built nearby → spurious long-term trend.
- Extrapolating from a 50–60 m mast to a 140 m hub with a single α.
- Ignoring data gaps during dust storms (the windiest periods), which biases mean speed down — or filling them naively.
- Annual Weibull fits that mask strong seasonality.`,
        },
        {
          kind: "checklist",
          title: "PM checklist — wind resource assessment",
          items: [
            "≥12 months on-site data, preferably ≥2/3 of hub height or LiDAR to hub height",
            "Instrument calibration certificates (MEASNET) and maintenance log",
            "Data recovery ≥90 % with documented gap treatment (especially dust storms)",
            "MCP against a validated long-term reference (≥10 years), method and correlation statistics shown",
            "Shear measured at ≥2–3 heights, analysed by hour and season",
            "Site air density by month used with density-adjusted power curve",
            "Loss table and uncertainty table itemised; P50, P75, P90 (1-yr and 10-yr) reported",
            "Comparison against Shagaya SCADA data where relevant (KISR)",
          ],
        },
        {
          kind: "ask",
          title: "Ask the wind consultant",
          items: [
            "Which long-term reference did you use, and how did you test its consistency over time?",
            "What is the monthly Weibull k, and why does an annual fit or a time-series approach better represent this site?",
            "How did you treat data gaps during dust storms?",
            "What shear did you measure at night versus day, and how does it affect hub-height speed and loads?",
            "What are the five largest uncertainty components, and what would reduce them?",
          ],
        },
        { kind: "scenario", scenario: "m04-s1" },
        {
          kind: "feynman",
          prompt: "Explain to the KAPP evaluation committee why two sites with the same mean wind speed can have very different energy yields.",
          keyPoints: [
            "Power depends on the cube of wind speed, so the spread of speeds matters",
            "The Weibull shape factor k describes that spread",
            "The turbine power curve caps output above rated and gives nothing below cut-in, so the useful energy depends on how much time is spent in the productive range",
            "Air density, shear and seasonality also differ between sites",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m04-l02-q1",
      type: "numeric",
      prompt: md`For a Weibull distribution with k = 2 and c = 9 m/s, what fraction of time is wind speed above 12 m/s?`,
      answer: 0.169,
      tolerance: { abs: 0.003 },
      explanation: md`$e^{-(12/9)^2} = e^{-1.778} = 0.169$ → ~17 % of hours (~1,480 h/yr).`,
      concepts: ["m04.weibull"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "m04-l02-q2",
      type: "mcq",
      prompt: "For k = 2, the mean power density is approximately how many times ½ρ(mean speed)³?",
      options: ["1.0", "1.4", "1.9", "3.0"],
      answer: 2,
      explanation: md`Energy pattern factor $\Gamma(2.5)/\Gamma(1.5)^3 = 1.329/0.696 = 1.91$.`,
      concepts: ["m04.cube-mean"],
      difficulty: 2,
    },
    {
      id: "m04-l02-q3",
      type: "multi",
      prompt: "Which statements about wind shear in Kuwait's desert are correct? (select all)",
      options: [
        "Daytime convective mixing gives low shear",
        "Stable nights can give high shear and low-level jets",
        "A single neutral log law with sand roughness is sufficient for hub-height extrapolation",
        "Shear should be measured at several heights by hour and season",
      ],
      answer: [0, 1, 3],
      explanation: md`Stability dominates desert shear. The neutral log law with tiny $z_0$ underestimates night shear.`,
      concepts: ["m04.wind-shear"],
      difficulty: 2,
    },
    {
      id: "m04-l02-q4",
      type: "order",
      prompt: "Order the steps of an energy yield assessment.",
      items: [
        "On-site measurement campaign (≥12 months)",
        "Data QC and gap treatment",
        "MCP to long-term reference",
        "Vertical and horizontal extrapolation (shear, flow model)",
        "Gross AEP with site-density power curve",
        "Apply losses → net P50",
        "Combine uncertainties → P90",
      ],
      explanation: md`Measure → clean → long-term correct → extrapolate → gross energy → net → uncertainty.`,
      concepts: ["m04.wind-measurement", "m04.aep"],
      difficulty: 2,
    },
    {
      id: "m04-l02-q5",
      type: "numeric",
      prompt: md`Shagaya's 10 MW farm produced about 37 GWh in year 2. What capacity factor is that, in %?`,
      answer: 42.2,
      tolerance: { abs: 0.5 },
      unit: "%",
      explanation: md`$37{,}000/(10 \times 8{,}760) = 0.422$ → 42 %, consistent with the published 42.1 %.`,
      concepts: ["m04.shagaya-wind"],
      difficulty: 1,
    },
    {
      id: "m04-l02-q6",
      type: "decision",
      prompt: "A developer offers a wind EYA based on 7 months of LiDAR data (October–April) and a satellite-reanalysis MCP. What do you do?",
      options: [
        { text: "Accept — LiDAR is modern and MCP corrects for the period", score: 0.2, feedback: "MCP corrects inter-annual variation, but 7 months missing the summer shamal season risks a biased relationship exactly in the most productive months." },
        { text: "Require at least 12 months including the summer, verify the LiDAR against a mast or validated reference, and increase uncertainty until then", score: 1, feedback: "Correct. A full annual cycle is essential where seasonality is strong." },
        { text: "Reject the project", score: 0.1, feedback: "Excessive — the fix is more data and appropriate uncertainty, not rejection." },
      ],
      explanation: md`Kuwait's wind regime is strongly seasonal (summer CF ~70 % at Shagaya). An MCP built on winter-only data can misrepresent summer behaviour.`,
      concepts: ["m04.wind-measurement"],
      difficulty: 2,
    },
    {
      id: "m04-l02-q7",
      type: "short",
      prompt: "The KISR paper says Shagaya produced 42.59 GWh in year 1, '21 % above' a 31.16 GWh contractual figure. What is wrong and what would you do?",
      rubric: [
        "42.59/31.16 = 1.37, i.e. 37 % above, not 21 %",
        "42.59 GWh also implies 48.6 % CF vs 45.2 % in the journal paper",
        "Possible differences in period, method, contractual basis",
        "Request SCADA data and contract energy definition from KISR before quoting",
      ],
      modelAnswer:
        "42.59/31.16 = 1.367, so the output would be 37 % above the contract figure, not 21 %; and 42.59 GWh is a 48.6 % CF, while the journal paper gives 45.2 % (~40 GWh) for year 1. The papers probably use different periods or definitions, or a figure is misreported. I would not quote either until I obtained the SCADA data and the contractual energy definition (P50? net of availability?) from KISR.",
      explanation: md`Always recompute published numbers. Internal inconsistencies are common and a PM who spots them protects the ministry from repeating errors.`,
      concepts: ["m04.shagaya-wind"],
      difficulty: 3,
    },
  ],
  flashcards: [
    { id: "m04-l02-f1", front: "Weibull CDF / fraction above v", back: md`$F = 1 - e^{-(v/c)^k}$; above $v$: $e^{-(v/c)^k}$.`, concepts: ["m04.weibull"] },
    { id: "m04-l02-f2", front: "Weibull mean", back: md`$\bar v = c\,\Gamma(1+1/k)$; k=2 → $c \approx 1.128\bar v$.`, concepts: ["m04.weibull"] },
    { id: "m04-l02-f3", front: "Energy pattern factor at k = 2", back: "≈1.91.", concepts: ["m04.cube-mean"] },
    { id: "m04-l02-f4", front: "Power-law shear", back: md`$v_2/v_1 = (h_2/h_1)^\alpha$; desert day α≈0.1–0.14, stable night 0.25–0.4.`, concepts: ["m04.wind-shear"] },
    { id: "m04-l02-f5", front: "MCP", back: "Measure–correlate–predict: correlate short on-site data with a long-term reference to estimate the long-term site distribution.", concepts: ["m04.wind-measurement"] },
    { id: "m04-l02-f6", front: "P90 formula", back: md`$P_{90} = P_{50}(1 - 1.282\sigma)$.`, concepts: ["m04.aep"] },
    { id: "m04-l02-f7", front: "Typical total onshore losses", back: "≈10–20 % (wake, availability, electrical, performance, environmental, curtailment).", concepts: ["m04.aep"] },
    { id: "m04-l02-f8", front: "Shagaya mean wind speed", back: "7.9 m/s at 80 m (long-term).", concepts: ["m04.shagaya-wind"] },
    { id: "m04-l02-f9", front: "Shagaya wind CF (published)", back: "45.2 % yr 1 (~40 GWh), 42.1 % yr 2 (~37 GWh); ~70 % in summer months.", concepts: ["m04.shagaya-wind"] },
  ],
  scenarios: [
    {
      id: "m04-s1",
      title: "Wind data room for a Shagaya wind tender",
      context: md`MEWRE is considering a 100–150 MW wind IPP at Shagaya to be tendered by KAPP. You must decide what wind data to provide to bidders. Available: Shagaya 10 MW SCADA since 2017 (held by KISR), an old 50 m mast record, and reanalysis data. A new LiDAR campaign would take 12 months.`,
      start: "a",
      nodes: {
        a: {
          md: md`The KAPP project director wants to launch the RFP in three months. What do you propose?`,
          choices: [
            { text: "Launch now with no data — bidders do their own assessments", next: "b", score: 3, feedback: "Bidders will price the uncertainty (higher tariff) or drop out; some will rely on satellite data with optimistic results." },
            { text: "Start a 12-month LiDAR + mast campaign immediately; release KISR SCADA and old mast data with QC report at RFQ, and the new data progressively before bid submission", next: "c", score: 9, feedback: "Balances schedule and risk: data arrive in time for bids, and early data allow bidders to start." },
            { text: "Delay the RFP by 12 months until the campaign is complete", next: "c", score: 6, feedback: "Lowest risk but costs a year; parallel paths are usually possible." },
          ],
        },
        b: {
          md: md`Two bidders withdraw, citing resource uncertainty; the remaining bids are 20 % above the expected tariff.`,
          choices: [
            { text: "Cancel and relaunch with a proper data package", score: 5, feedback: "Recoverable, but the lost time is what you were trying to save." },
            { text: "Award anyway", score: 2, feedback: "The ministry pays the risk premium for 25–30 years." },
          ],
        },
        c: {
          md: md`KISR is reluctant to release SCADA data, citing research confidentiality.`,
          choices: [
            { text: "Escalate through the Undersecretary for a data-sharing agreement with KISR, offering co-authorship and anonymised turbine data", score: 10, feedback: "Uses institutional channels and gives KISR something in return." },
            { text: "Proceed without the SCADA data", score: 5, feedback: "Loses the best long-term local evidence of performance in Kuwaiti dust and heat." },
          ],
        },
      },
      concepts: ["m04.wind-measurement", "m04.shagaya-wind"],
    },
  ],
};

export default lesson;
