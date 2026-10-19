import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m04-l01",
  title: "Power in the Wind, Betz and Power Curves",
  summary:
    "Derive P = ½ρAv³, see what 45–50 °C air does to it, derive the Betz limit from the actuator disc, and read a power curve — Cp, tip speed ratio, cut-in, rated and cut-out — like an owner.",
  minutes: 70,
  objectives: [
    "You can derive the kinetic energy flux through a rotor and explain the v³ and D² scaling",
    "You can compute air density at Kuwaiti summer temperatures and its effect on output",
    "You can derive the Betz limit from actuator-disc momentum theory",
    "You can use Cp and tip speed ratio to estimate turbine power and rotor speed",
    "You can read a power curve (cut-in, rated, cut-out) and know how it is measured and density-corrected",
  ],
  concepts: [
    {
      id: "m04.wind-power-flux",
      name: "Kinetic power in the wind",
      description: "P = ½ρAv³ — mass flow times kinetic energy per unit mass; cubic in speed, quadratic in diameter, linear in density.",
      competency: "wind-storage",
      related: ["m04.air-density", "m04.betz-limit"],
    },
    {
      id: "m04.air-density",
      name: "Air density in hot climates",
      description: "ρ = p/(R·T); at 45–50 °C air is ~9–11 % less dense than the 1.225 kg/m³ standard, cutting below-rated power proportionally.",
      competency: "wind-storage",
    },
    {
      id: "m04.betz-limit",
      name: "Betz limit",
      description: "Maximum power coefficient of an ideal actuator disc, 16/27 ≈ 0.593, at axial induction a = 1/3.",
      competency: "wind-storage",
    },
    {
      id: "m04.cp-tsr",
      name: "Power coefficient and tip speed ratio",
      description: "Cp(λ, pitch) characterises rotor aerodynamics; variable-speed control holds λ near optimum below rated.",
      competency: "wind-storage",
      related: ["m04.betz-limit"],
    },
    {
      id: "m04.power-curve",
      name: "Power curve and operating regions",
      description: "Cut-in, cubic region, rated, pitch-regulated constant power, cut-out; measured per IEC 61400-12-1 and normalised for density.",
      competency: "wind-storage",
      related: ["m04.air-density"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Where the power comes from — and where it goes",
      blocks: [
        {
          kind: "md",
          md: md`## Kinetic energy flux

Consider air at speed $v$ crossing a disc of area $A$. In time $dt$ a cylinder of air of volume $A\,v\,dt$ passes, with mass $dm = \rho A v\,dt$. Its kinetic energy is $\tfrac12 dm\,v^2 = \tfrac12 \rho A v^3\,dt$. Dividing by $dt$:`,
        },
        { kind: "equation", formula: "wind-power-flux" },
        {
          kind: "md",
          md: md`Three scalings to internalise:

| Change | Effect on available power |
|---|---|
| +10 % wind speed | $1.1^3 = 1.33$ → **+33 %** |
| Rotor diameter 100 → 150 m | $(150/100)^2 = 2.25$ → **+125 %** |
| Air density 1.225 → 1.10 kg/m³ | **−10 %** |

The cube is why a site's mean speed matters enormously, why small errors in measured wind become large errors in energy, and why turbines keep growing taller (faster winds aloft) and wider (more area). Modern onshore turbines are 4–7 MW with 150–175 m rotors; Shagaya's 2017 turbines are 2 MW units, typical of their vintage.

## Air density: the desert penalty

Density follows the ideal gas law:`,
        },
        { kind: "equation", formula: "air-density-ideal-gas" },
        {
          kind: "md",
          md: md`| Condition | T | ρ (kg/m³, sea-level pressure) | vs standard |
|---|---|---|---|
| IEC standard | 15 °C | 1.225 | — |
| Kuwait winter day | 20 °C | 1.204 | −2 % |
| Kuwait summer afternoon | 45 °C | 1.110 | −9.4 % |
| Extreme | 50 °C | 1.092 | −10.8 % |
| Record (Mitribah 53.9 °C, 2016) | 54 °C | 1.079 | −12 % |

Site elevation lowers pressure too (≈ −1.2 % per 100 m). So below rated speed a turbine in Kuwait's summer produces **~9–11 % less** than its brochure power curve at 1.225 kg/m³. Above rated it can still reach rated power — it just needs a higher wind speed to get there: for a pitch-regulated machine the equivalent speed scales as $(\rho/\rho_0)^{1/3}$, so rated 12 m/s at standard density becomes ~12.4 m/s at 1.10 kg/m³.

A partial offset: Kuwait's strongest winds (the summer **shamal**) blow in the hottest months, so the density penalty is applied to the most productive period. Yield assessments must use the **site-specific density by hour**, or at least by month, never the brochure curve.`,
        },
        { kind: "sources", refs: ["m04-wmo-mitribah"] },
        {
          kind: "md",
          md: md`## The Betz limit — actuator disc derivation

A turbine can't extract all the kinetic energy: if it stopped the air completely, no new air could flow through. Model the rotor as an **actuator disc** that causes a pressure drop. Let free-stream speed be $v$; the velocity at the disc is $v(1-a)$, where $a$ is the **axial induction factor**. Bernoulli upstream and downstream of the disc (with the pressure jump across it) shows the far-wake speed is $v(1-2a)$ — half the slowdown happens before the disc, half after.

**Thrust** = mass flow × change in velocity:
$$T = \rho A v(1-a)\,[v - v(1-2a)] = 2\rho A v^2 a(1-a)$$

**Power** = thrust × velocity at the disc:
$$P = T\,v(1-a) = 2\rho A v^3 a(1-a)^2$$

Divide by the available power $\tfrac12\rho A v^3$:`,
        },
        { kind: "equation", formula: "betz-power-coefficient" },
        {
          kind: "md",
          md: md`Maximise: $\dfrac{dC_p}{da} = 4(1-a)^2 - 8a(1-a) = 4(1-a)(1-3a) = 0 \Rightarrow a = \tfrac13$.`,
        },
        { kind: "equation", formula: "betz-limit" },
        {
          kind: "md",
          md: md`At the optimum, air slows to 2/3 of free stream at the disc and 1/3 in the far wake; the thrust coefficient is $C_T = 4a(1-a) = 8/9$. Real rotors lose more to finite blade number (tip losses), wake rotation and profile drag: the best modern rotors reach $C_p \approx 0.48$–0.50, about 80–85 % of Betz. After drivetrain and electrical losses, the wind-to-grid efficiency peaks at ~0.42–0.46.`,
        },
        { kind: "widget", widget: "betz", caption: "Slide the induction factor a. Cp peaks at 16/27 when a = 1/3; push a above 0.4 and momentum theory breaks down (turbulent wake state)." },
        {
          kind: "callout",
          tone: "why",
          title: "Why Betz matters to a PM",
          md: md`Any claim of Cp > 0.593 — ducted "wind lenses", vertical-axis miracles — is physically impossible relative to swept area. More practically, Betz tells you a modern turbine is already within ~15 % of the physical limit: the big gains now come from **bigger rotors, taller towers and better siting**, not from aerodynamics. That frames what you should push contractors on.`,
        },
        {
          kind: "md",
          md: md`## Cp, tip speed ratio and control

A rotor's $C_p$ depends on the **tip speed ratio** and blade pitch angle:`,
        },
        { kind: "equation", formula: "tip-speed-ratio" },
        { kind: "equation", formula: "wind-turbine-power" },
        {
          kind: "md",
          md: md`For a three-bladed rotor $C_p(\lambda)$ peaks at λ ≈ 7–9. Too slow (low λ): air slips between blades unused. Too fast (high λ): the rotor behaves like a solid disc and blocks flow. Modern **variable-speed** turbines (doubly-fed induction or full-converter generators) adjust rotor speed with wind speed to stay at optimum λ in **region 2**.

Tip speed is capped at ~80–90 m/s by noise limits and — critical in Kuwait — **leading-edge erosion**: sand impact damage scales roughly with the 6th–10th power of impact speed, so blade tips suffer far more than the root.

## The power curve

| Region | Wind speed (typical) | What happens |
|---|---|---|
| Below cut-in | < 3 m/s | Rotor idles; no output |
| Region 2 (partial load) | 3 → ~11–13 m/s | Variable speed, max $C_p$; power ∝ ~$v^3$ |
| Rated | ~11–13 m/s | Generator reaches nameplate |
| Region 3 (full load) | rated → 25 m/s | Blades pitch to shed excess power; output held constant |
| Cut-out | ~25 m/s (10-min mean) | Turbine shuts down and feathers to protect structure; many modern turbines "soft cut-out" (ramp down 25→30 m/s) |

Power curves are **measured** per **IEC 61400-12-1**: a met mast at 2–4 rotor diameters upwind (or nacelle LiDAR), 10-minute averages binned in 0.5 m/s bins, normalised to a reference density. The OEM **warrants** the power curve (typically 95 % of the reference curve within measurement uncertainty) — the basis of power-curve LDs.

Things that bend the real curve below the warranted one: high turbulence (smears the knee near rated), low turbulence + high shear (stable desert nights), blade soiling and erosion (1–5 % AEP loss when severe), misaligned yaw, icing (not Kuwait), and temperature derating (lesson 3).`,
        },
        { kind: "widget", widget: "weibull", props: { k: 2, c: 8.9 }, caption: "Preview of lesson 2: the overlaid power curve shows the operating regions against a Shagaya-like wind distribution." },
      ],
    },
    {
      layer: "applied",
      title: "Hot air, rotor speed and the Betz ceiling",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "The same turbine on a cool and a hot day",
          given: md`Rotor diameter 110 m, wind speed 8 m/s (below rated), $C_p$ = 0.45 (overall, wind-to-grid). Compare air density 1.225 kg/m³ (15 °C) with 1.10 kg/m³ (~47 °C summer afternoon).`,
          steps: [
            { md: md`**Swept area:** $A = \pi \times 55^2 = 9{,}503$ m².` },
            { md: md`**Power in the wind at 1.225:** $\tfrac12 \times 1.225 \times 9{,}503 \times 8^3 = 2{,}980$ kW.` },
            { md: md`**Electrical output at 1.225:** $0.45 \times 2{,}980 = 1{,}341$ kW.` },
            { md: md`**At 1.10:** $0.45 \times \tfrac12 \times 1.10 \times 9{,}503 \times 512 = 1{,}204$ kW.` },
            { md: md`**Ratio:** $1{,}204/1{,}341 = 0.898$ → **10.2 % less** power, exactly the density ratio.` },
          ],
          result: md`On a 47 °C afternoon at 8 m/s the turbine produces ~**1.20 MW instead of 1.34 MW**. If a yield report used the 1.225 kg/m³ brochure curve for Kuwait's summer, it would overstate below-rated energy by ~10 % in those hours.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Rotor speed and tip speed at optimum TSR",
          given: md`Same 110 m rotor (R = 55 m) operating at optimum tip speed ratio λ = 8 in 8 m/s wind.`,
          steps: [
            { md: md`From $\lambda = \omega R / v$: $\omega = \lambda v / R$.` },
            {
              md: md`$\omega = 8 \times 8 / 55 = 1.164$ rad/s → $1.164 \times 60 / (2\pi) = 11.1$ rpm.`,
              hidden: true,
              check: { prompt: "Rotor speed", answer: 11.1, unit: "rpm", tolerance: { rel: 0.02 } },
            },
            {
              md: md`Tip speed $= \omega R = 1.164 \times 55 = 64$ m/s.`,
              hidden: true,
              check: { prompt: "Blade tip speed", answer: 64, unit: "m/s", tolerance: { rel: 0.02 } },
            },
            { md: md`At rated wind (~12 m/s) the rotor would want ~96 m/s tip speed at λ = 8, so it is capped at ~80–85 m/s and λ falls — one reason $C_p$ drops before rated.` },
          ],
          result: md`About **11 rpm** and **64 m/s** tip speed — the generator side runs at ~1,100–1,500 rpm through a gearbox ratio of ~100:1, or at rotor speed for direct-drive machines.`,
        },
        {
          kind: "question",
          question: {
            id: "m04-l01-p1",
            type: "numeric",
            prompt: md`What is the absolute maximum (Betz) power a 100 m diameter rotor could extract from a 10 m/s wind at 1.10 kg/m³? Answer in kW.`,
            answer: 2559.8,
            tolerance: { rel: 0.02 },
            unit: "kW",
            explanation: md`$A = \pi \times 50^2 = 7{,}854$ m². $P_{wind} = \tfrac12 \times 1.10 \times 7{,}854 \times 1{,}000 = 4{,}320$ kW. $P_{Betz} = 16/27 \times 4{,}320 = 2{,}560$ kW. A real turbine with $C_p$ ≈ 0.45 overall would deliver ~1,940 kW.`,
            concepts: ["m04.betz-limit", "m04.wind-power-flux"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Power curves in contracts and on site",
      blocks: [
        {
          kind: "md",
          md: md`## Who cares about the power curve

- **OEM (turbine supplier)** — publishes the reference power curve at 1.225 kg/m³ plus density-adjusted curves, and warrants a percentage of it in the Turbine Supply Agreement (TSA).
- **Owner / MEWRE and its Owner's Engineer** — check that the curve used in the yield assessment matches the warranted curve for **site density and turbulence**, and organise power-performance tests.
- **Independent test house** — IEC 61400-12-1 accredited measurement (met mast or nacelle LiDAR with IEC 61400-50-3 verification).
- **Lenders' technical advisor** — scrutinises density, turbulence and temperature-derating treatment because they drive P90.

## What to check in documents

- The **air density** used in the yield model: should be site hourly/monthly density, typically 1.10–1.20 kg/m³ in Kuwait, not 1.225.
- Whether the warranted power curve covers the **full operating temperature range** or only up to e.g. 35–40 °C.
- **Turbulence intensity** and **shear** assumptions behind the curve (the "inner range" in IEC 61400-12-1 Ed. 2).
- **Cut-out strategy**: hard cut-out at 25 m/s or soft (high-wind ride-through); shamal gusts make this material.
- Power curve **test** procedure, number of turbines tested, LD formula and cap.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Common power-curve traps",
          md: md`- Yield assessment uses the **standard-density** curve: 5–10 % overstatement in a hot site.
- Warranted curve applies only within an "inner range" of turbulence/shear that the site often violates — so test results fall outside the warranty and LDs can't be claimed.
- Power-curve test turbine chosen by the OEM (the best one) instead of agreed in advance.
- Sand erosion degrades the curve over years; the warranty covers only the first test after COD.`,
        },
        {
          kind: "checklist",
          title: "PM checklist — power curve and turbine performance",
          items: [
            "Yield model uses site-specific air density by month/hour (≈1.09–1.20 kg/m³ in Kuwait)",
            "Warranted curve valid up to the site's maximum design temperature, or derating curve provided",
            "Turbulence and shear 'inner range' compared with measured site conditions",
            "IEC 61400-12-1 test procedure, test turbine selection, and LD formula agreed in the TSA",
            "Cut-out / high-wind ride-through strategy reviewed against shamal gust statistics",
            "Leading-edge protection specified for sand erosion; tip-speed limit stated",
          ],
        },
        {
          kind: "ask",
          title: "Ask the OEM",
          items: [
            "Please provide power curves at 1.09, 1.12 and 1.15 kg/m³ and the method used to derive them.",
            "Up to what ambient temperature is the full power curve warranted?",
            "What is the maximum tip speed, and what leading-edge protection system is included?",
            "What is the inner range of turbulence intensity and shear for the warranty?",
            "Do you offer soft cut-out above 25 m/s, and how does it affect loads?",
          ],
        },
        {
          kind: "feynman",
          prompt: "Explain to a colleague from finance why a wind turbine in Kuwait produces less in July at the same wind speed as in January — and why July can still be the best month.",
          keyPoints: [
            "Power is proportional to air density; hot air is ~10 % less dense",
            "So below rated speed the turbine produces ~10 % less in July for the same wind",
            "Power also scales with wind speed cubed; Kuwait's summer shamal winds are strong",
            "Stronger wind outweighs the density loss, so summer months can still have the highest capacity factor",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m04-l01-q1",
      type: "numeric",
      prompt: md`If mean wind speed at hub height increases by 15 %, by what factor does available wind power increase (ignore distribution shape)?`,
      answer: 1.521,
      tolerance: { rel: 0.01 },
      explanation: md`$1.15^3 = 1.521$ → +52 %. This cubic sensitivity is why a few tenths of m/s in a resource assessment matter so much.`,
      concepts: ["m04.wind-power-flux"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m04-l01-q2",
      type: "numeric",
      prompt: md`Compute air density at 48 °C and sea-level pressure (101,325 Pa), $R_d$ = 287.05 J/(kg·K).`,
      answer: 1.0991,
      tolerance: { rel: 0.01 },
      unit: "kg/m³",
      explanation: md`$\rho = 101{,}325/(287.05 \times 321.15) = 1.099$ kg/m³ — about 10 % below the 1.225 standard.`,
      concepts: ["m04.air-density"],
      difficulty: 1,
    },
    {
      id: "m04-l01-q3",
      type: "mcq",
      prompt: "At the Betz optimum, the wind speed at the rotor disc and far downstream are respectively:",
      options: ["1/2 and 0 of free stream", "2/3 and 1/3 of free stream", "1/3 and 2/3 of free stream", "Equal to free stream"],
      answer: 1,
      explanation: md`With $a = 1/3$: disc speed $v(1-a) = 2v/3$; far wake $v(1-2a) = v/3$.`,
      concepts: ["m04.betz-limit"],
      difficulty: 2,
    },
    {
      id: "m04-l01-q4",
      type: "order",
      prompt: "Order the power-curve regions with increasing wind speed.",
      items: ["Below cut-in (idling)", "Region 2: variable speed, maximum Cp", "Rated power reached", "Region 3: pitch control holds constant power", "Cut-out and feathering"],
      explanation: md`Cut-in ~3 m/s, cubic region, rated ~11–13 m/s, pitch-regulated constant power, cut-out ~25 m/s.`,
      concepts: ["m04.power-curve"],
      difficulty: 1,
    },
    {
      id: "m04-l01-q5",
      type: "mcq",
      prompt: "Why do modern turbines vary rotor speed below rated wind speed?",
      options: [
        "To keep the tip speed ratio near its optimum so Cp stays maximum",
        "To keep the grid frequency constant",
        "To reduce air density effects",
        "To keep the thrust constant",
      ],
      answer: 0,
      explanation: md`$C_p$ depends on λ; holding λ at optimum as wind changes maximises energy capture. Power electronics decouple rotor speed from grid frequency.`,
      concepts: ["m04.cp-tsr"],
      difficulty: 1,
    },
    {
      id: "m04-l01-q6",
      type: "decision",
      prompt: "The bidder's yield report for a Kuwait wind project uses the OEM's power curve at 1.225 kg/m³ for all hours. What do you require?",
      options: [
        { text: "Nothing — power curves are standardised at 1.225", score: 0, feedback: "Standardised for comparison, not for Kuwait's hot air. This overstates energy by up to ~10 % in summer." },
        { text: "Recalculate with site hourly air density from measured temperature/pressure and the OEM's density-adjusted curves", score: 1, feedback: "Correct — and also check temperature derating above ~40 °C." },
        { text: "Apply a 2 % haircut", score: 0.3, feedback: "Too small and arbitrary for 45–50 °C summers." },
      ],
      explanation: md`IEC 61400-12-1 normalises curves to a reference density; site energy must use site density. In Kuwait the difference is material.`,
      concepts: ["m04.air-density", "m04.power-curve"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m04-l01-f1", front: "Power in the wind", back: md`$P = \tfrac12\rho A v^3$`, concepts: ["m04.wind-power-flux"] },
    { id: "m04-l01-f2", front: "Standard air density (IEC)", back: "1.225 kg/m³ at 15 °C, sea level.", concepts: ["m04.air-density"] },
    { id: "m04-l01-f3", front: "Air density at 45 °C / 50 °C", back: "≈1.11 / ≈1.09 kg/m³ (−9 to −11 %).", concepts: ["m04.air-density"] },
    { id: "m04-l01-f4", front: "Betz limit", back: md`$C_{p,max} = 16/27 \approx 0.593$ at $a = 1/3$.`, concepts: ["m04.betz-limit"] },
    { id: "m04-l01-f5", front: "Actuator disc Cp(a)", back: md`$C_p = 4a(1-a)^2$; $C_T = 4a(1-a)$.`, concepts: ["m04.betz-limit"] },
    { id: "m04-l01-f6", front: "Tip speed ratio", back: md`$\lambda = \omega R/v$; optimum ≈ 7–9 for 3 blades.`, concepts: ["m04.cp-tsr"] },
    { id: "m04-l01-f7", front: "Typical cut-in / rated / cut-out", back: "≈3 / 11–13 / 25 m/s.", concepts: ["m04.power-curve"] },
    { id: "m04-l01-f8", front: "Power curve measurement standard", back: "IEC 61400-12-1.", concepts: ["m04.power-curve"] },
    { id: "m04-l01-f9", front: "Best modern rotor Cp", back: "≈0.48–0.50 (≈80–85 % of Betz).", concepts: ["m04.cp-tsr"] },
  ],
};

export default lesson;
