import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz01-l02",
  title: "Deposition physics: settling, impaction, wind, tilt and resuspension",
  summary:
    "How airborne dust reaches the glass: Stokes settling with a worked example and its limits, inertial impaction and the Stokes number, deposition flux and velocity, the effect of tilt and wind direction, and why wind removes large particles but not small ones.",
  minutes: 75,
  objectives: [
    "Derive and apply Stokes' law for terminal settling velocity, including the Cunningham correction and the particle Reynolds number check",
    "Use the Stokes number to decide when inertial impaction on frames, edges and module faces matters",
    "Estimate a daily deposition mass flux from a size-binned concentration, deposition velocity and module tilt",
    "Explain how tilt and wind direction change deposition and accumulation (Figgis et al. 2019)",
    "Explain resuspension as a balance of aerodynamic removal against adhesion, and why it favours removing large particles",
  ],
  concepts: [
    {
      id: "mz01.stokes-settling",
      name: "Stokes settling velocity",
      description: "Terminal velocity of a small sphere when viscous drag balances weight: v = ρp g d² Cc / (18 μ); valid for particle Reynolds number below about 0.1 to 1; scales with diameter squared.",
      competency: "mz-soiling",
      related: ["mz01.particle-size", "mz01.deposition-flux"],
    },
    {
      id: "mz01.impaction",
      name: "Inertial impaction and Stokes number",
      description: "Particles too heavy to follow streamlines around an obstacle hit it; governed by Stk = τp U / L. Matters for coarse particles on frames, edges and windward faces in strong wind.",
      competency: "mz-soiling",
      related: ["mz01.stokes-settling"],
    },
    {
      id: "mz01.deposition-flux",
      name: "Deposition flux and deposition velocity",
      description: "Mass deposited per unit area and time, F = v_d C, summed over size bins; gravitational part scales with the cosine of module tilt; turbulent, impaction and Brownian terms add to it.",
      competency: "mz-soiling",
      related: ["mz01.stokes-settling", "mz01.tilt-wind"],
    },
    {
      id: "mz01.tilt-wind",
      name: "Tilt and wind effects on deposition",
      description: "Steeper tilt reduces gravitational deposition and helps particles slide; wind toward the face raises impaction while leeward recirculation collects fines; Figgis et al. found deposition peaking near 45° facing the wind and accumulation near 22° facing away.",
      competency: "mz-soiling",
      related: ["mz01.deposition-flux", "m02.wind-stow"],
    },
    {
      id: "mz01.resuspension",
      name: "Resuspension and natural recovery",
      description: "Wind removes a deposited particle when aerodynamic drag and lift moments exceed the adhesion moment; drag scales with d² and adhesion with d, so large particles go first and fines stay.",
      competency: "mz-soiling",
      related: ["mz01.tilt-wind"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "From the air to the glass",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Every soiling model Mizan might build or license, from a reanalysis-driven estimate to a site-calibrated one, is a deposition model underneath: concentration times deposition velocity, minus what the wind takes back. The EGU 2026 work in the research brief found such mass-balance models very sensitive to their deposition parameters. If you understand Stokes settling, impaction and resuspension you can judge which model is credible, explain to KISR why tilt and stow change the soiling rate, and see where control (stow angle) can move the physics.`,
        },
        {
          kind: "md",
          md: md`### Deposition mechanisms by particle size

| Mechanism | Dominant size | What drives it |
|---|---|---|
| **Gravitational settling** | above about 5 µm | Weight against viscous drag; flux on a tilted plate scales with $\cos\beta$ |
| **Inertial impaction** | above about 10 µm in strong wind | Particle inertia carries it across curving streamlines into an obstacle |
| **Interception** | similar to obstacle roughness | Particle centre follows the streamline but its radius touches the surface |
| **Turbulent diffusion** | about 1 to 20 µm | Eddies carry particles through the boundary layer to the surface |
| **Brownian diffusion** | below about 0.5 µm | Random molecular collisions; negligible mass for mineral dust |
| **Electrostatic** | small, charged particles | Charge on dust (from saltation) and on dry glass; strongest in very dry air |

Once a particle touches the glass it either **sticks** (adhesion, Lesson 3), **bounces** (large, fast, dry particles on hard glass) or is later **resuspended** by wind. The net accumulation is the difference.

### Stokes settling

For a small sphere of diameter $d$ falling in still air, the viscous drag is $F_D = 3\pi\mu d v$ (Stokes, valid at low Reynolds number). At terminal velocity drag balances weight minus buoyancy, $3\pi\mu d v = (\rho_p - \rho_a)\frac{\pi d^3}{6} g$. Since $\rho_p \gg \rho_a$ (2,650 vs about 1.1 kg/m³), drop $\rho_a$:`,
        },
        { kind: "equation", formula: "mz01-stokes" },
        {
          kind: "md",
          md: md`Two corrections bound its validity:

- **Small particles (slip):** below a few µm the particle is comparable to the mean free path of air molecules (about 0.07 µm at 40 °C), drag falls and particles settle faster than Stokes predicts. The **Cunningham slip correction** $C_c$ fixes this; it is 1.18 at 1 µm, 1.07 at 2.5 µm and under 1.02 above 10 µm.
- **Large particles (inertia):** Stokes drag assumes the particle Reynolds number is small. Check it every time.`,
        },
        { kind: "equation", formula: "mz01-cunningham" },
        { kind: "equation", formula: "mz01-particle-reynolds" },
        {
          kind: "md",
          md: md`For quartz-density dust in air at 40 °C ($\mu = 1.91\times10^{-5}$ Pa·s, $\rho_a = 1.13$ kg/m³):

| $d$ (µm) | $v_s$ (cm/s) | Time to fall 1 m | $Re_p$ | Stokes error |
|---|---|---|---|---|
| 1 | 0.0089 | about 3.1 h | $5\times10^{-6}$ | none |
| 2.5 | 0.051 | about 33 min | $7\times10^{-5}$ | none |
| 10 | 0.77 | about 2.2 min | 0.005 | under 1% |
| 20 | 3.1 | about 33 s | 0.04 | about 1.5% |
| 50 | 19 | about 5 s | 0.56 | about 10% too fast |
| 100 | 76 (Stokes) | about 1.3 s | 4.5 | about 40% too fast; use a drag correlation |

Because $v_s \propto d^2$, a particle three times larger settles **nine times faster**. That single scaling explains why the giant fraction dominates deposited mass even though the fine fraction dominates the number of particles and the AOD.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "Stokes settling velocity of mineral dust at 40 °C",
          xKey: "d",
          xLabel: "Particle diameter (µm)",
          yLabel: "Settling velocity (cm/s)",
          series: [{ key: "v", label: "v_s (cm/s), ρp = 2,650 kg/m³" }],
          data: [
            { d: 1, v: 0.009 },
            { d: 2.5, v: 0.051 },
            { d: 5, v: 0.196 },
            { d: 7.5, v: 0.435 },
            { d: 10, v: 0.768 },
            { d: 15, v: 1.71 },
            { d: 20, v: 3.01 },
            { d: 25, v: 4.65 },
            { d: 30, v: 6.62 },
            { d: 40, v: 11.4 },
          ],
          caption: "Computed with the Cunningham correction and a small inertial drag correction above 20 µm. The parabola is the d² law: deposition is a large-particle business.",
        },
        {
          kind: "md",
          md: md`### Inertial impaction and the Stokes number

A particle with **relaxation time** $\tau_p = v_s/g$ (the time it needs to adjust to a change in air velocity) approaching an obstacle of size $L$ at wind speed $U$ either follows the air around it or hits it. The ratio is the **Stokes number**:`,
        },
        { kind: "equation", formula: "mz01-stokes-number" },
        {
          kind: "md",
          md: md`$Stk \ll 0.1$: particles follow the flow and miss. $Stk$ of order 1 or above: a large fraction impacts. For a 1 m wide module face in an 8 m/s wind, even a 20 µm particle has $Stk \approx 0.025$: impaction on the open face is weak. On a **4 cm frame lip or the lower edge**, the same particle has $Stk \approx 0.6$: strong impaction. This is one reason dust bands form along the lower frame and on windward edges, and why frameless glass-glass modules collect less at the edge.

### Deposition flux

Engineers lump all the mechanisms into a **deposition velocity** $v_d$, defined so that flux equals velocity times concentration, and sum over size bins:`,
        },
        { kind: "equation", formula: "mz01-deposition-flux" },
        {
          kind: "md",
          md: md`For coarse particles the gravitational term dominates and only the horizontal projection of the module collects settling particles, hence $\cos\beta$. In still air a module at 30° receives 87% of the settling flux of a horizontal plate, at 60° half, and a vertical plate almost none. Wind adds impaction and turbulent terms that do **not** follow $\cos\beta$.

### Tilt and wind direction

Figgis et al. (Solar Energy, 2019), on plates in a perpendicular wind in Qatar, separated deposition from what stays:

- **Deposition** (particles arriving) peaked at about **45° tilt facing into the wind**: the windward face intercepts and impacts more particles.
- **Accumulation** (net, after removal) peaked at about **22° tilt facing away from the wind**: on the leeward side recirculating air drops fine particles in a sheltered zone where the wind cannot remove them.
- Steep tilts favour **removal**: gravity's component along the glass helps particles slide and roll, and the face is more exposed to wind shear.

Their recommendation for single-axis trackers: **stow at maximum tilt toward the wind at night**. Lesson 5 weighs the evidence.

### Resuspension and natural recovery

A deposited particle is removed when the aerodynamic **drag and lift moment** about its contact point exceed the **adhesion moment**. Drag in the near-wall layer scales roughly with $d^2$ (area times local velocity, which itself grows with height above the wall), while adhesion (van der Waals, capillary) scales with $d$ (Lesson 3). So the ratio of removal to adhesion grows with $d$: **wind removes the large particles first and leaves the fines**. Over time the deposit becomes enriched in fine particles, which block the most light per gram.

The Doha four-year study (Solar Energy, 2020) found that on about **75% of days** soiling built up and on about **25%** there was natural recovery, mostly from wind resuspension; dust storms raised the annual mean soiling rate by about 23%. In Kuwait, with rain on only a handful of days a year, wind and condensation are the only natural cleaners.`,
        },
        {
          kind: "flow",
          title: "The life of a dust particle near a PV row",
          steps: [
            { label: "Emission", detail: "Saltation sandblasts fine dust from a source surface" },
            { label: "Transport", detail: "Turbulent mixing and wind carry it, often hundreds of km" },
            { label: "Arrival", detail: "Settling (cos β), impaction (Stokes number), turbulent and Brownian diffusion" },
            { label: "Contact", detail: "Sticks, or bounces if large, fast and dry" },
            { label: "Ageing", detail: "Dew cycles build capillary bridges and cement (Lesson 3)" },
            { label: "Removal", detail: "Wind resuspension (large first), condensation run-off, rain, cleaning" },
          ],
          caption: "Net soiling rate = arrival flux × sticking probability − removal. Each box is a different lever for analytics and control.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Numbers: settling, impaction and a day's deposit",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Stokes settling of a 10 µm quartz particle at 40 °C",
          given: md`$d = 10$ µm $= 1.0\times10^{-5}$ m; $\rho_p = 2{,}650$ kg/m³ (quartz); $g = 9.81$ m/s²; air at 40 °C: $\mu = 1.91\times10^{-5}$ Pa·s, $\rho_a = 1.13$ kg/m³; $C_c \approx 1.02$.`,
          steps: [
            { md: md`**Numerator:** $\rho_p g d^2 = 2{,}650\times9.81\times(1.0\times10^{-5})^2 = 2.60\times10^{-6}$ kg/(m·s²).` },
            { md: md`**Denominator:** $18\mu = 18\times1.91\times10^{-5} = 3.43\times10^{-4}$ Pa·s.` },
            { md: md`**Velocity:** $v_s = 2.60\times10^{-6}/3.43\times10^{-4} \times 1.02 = 7.7\times10^{-3}$ m/s $= 0.77$ cm/s.` },
            { md: md`**Validity:** $Re_p = \rho_a v_s d/\mu = 1.13\times7.7\times10^{-3}\times10^{-5}/1.91\times10^{-5} = 0.0046$, far below 0.1. Stokes holds.` },
            { md: md`**Time to settle 2 m** (the height of the upper edge of a typical fixed table): $2/0.0077 = 260$ s, about 4 min in still air. A 2.5 µm particle needs about 65 min; a 1 µm particle about 6 h.` },
            { md: md`**Relaxation time:** $\tau_p = v_s/g = 7.9\times10^{-4}$ s. On a 4 cm frame lip at 8 m/s: $Stk = 7.9\times10^{-4}\times8/0.04 = 0.16$: some impaction at the edge, little on the open face.` },
          ],
          result: md`A 10 µm particle settles at under 1 cm/s and follows the air around a module face but partly impacts the frame. Doubling diameter to 20 µm quadruples $v_s$ to about 3 cm/s and raises the frame Stokes number to about 0.6.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A dusty day's deposit on a 25° module",
          given: md`Illustrative size-binned concentration at module height on a dusty, calm day (not measured data): 60 µg/m³ in a 5 µm bin, 40 µg/m³ at 10 µm, 20 µg/m³ at 20 µm, 5 µg/m³ at 40 µm. Use settling only, $v_d = v_s\cos\beta$ with $\cos25° = 0.906$. Settling velocities from the table: 0.196, 0.768, 3.01 and 11.4 cm/s. Convert: $F$ (mg/m²/day) $= C$ (µg/m³) $\times v$ (m/s) $\times 86.4\times\cos\beta$.`,
          steps: [
            { md: md`5 µm: $60\times0.00196\times86.4\times0.906 = 9.2$ mg/m²/day.` },
            { md: md`10 µm: $40\times0.00768\times86.4\times0.906 = 24.0$ mg/m²/day.` },
            {
              md: md`20 µm: $20\times0.0301\times86.4\times0.906 = 47.1$ mg/m²/day.`,
              hidden: true,
              check: { prompt: "Deposition flux in the 20 µm bin (mg/m²/day)", answer: 47.1, unit: "mg/m²/day", tolerance: { abs: 0.6 } },
            },
            { md: md`40 µm: $5\times0.114\times86.4\times0.906 = 44.8$ mg/m²/day.` },
            {
              md: md`Total: $9.2 + 24.0 + 47.1 + 44.8 = 125$ mg/m²/day, about 0.13 g/m²/day.`,
              hidden: true,
              check: { prompt: "Total deposition flux (mg/m²/day)", answer: 125, unit: "mg/m²/day", tolerance: { abs: 2 } },
            },
          ],
          result: md`The two largest bins carry only 20% of the airborne mass (25 of 125 µg/m³) but **73% of the deposit**. A horizontal plate would collect $125/0.906 = 138$ mg/m²/day. This is a gross flux: bounce and wind resuspension remove part of it, and dew raises the sticking fraction. Lesson 4 converts grams per square metre into a soiling percentage.`,
        },
        {
          kind: "question",
          question: {
            id: "mz01-l02-p1",
            type: "numeric",
            prompt: md`A 30 µm dust particle has a relaxation time of $7.0\times10^{-3}$ s. The wind is 6 m/s across a 5 cm tracker torque-tube clamp. What is the Stokes number? (2 decimals)`,
            answer: 0.84,
            tolerance: { abs: 0.02 },
            explanation: md`$Stk = \tau_p U/L = 7.0\times10^{-3}\times6/0.05 = 0.84$. Of order 1: a large share of these particles impact the clamp rather than flowing around it. On the 2 m wide module face, $Stk = 0.021$: they mostly follow the flow.`,
            concepts: ["mz01.impaction"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Deposition physics in plant design and analytics",
      blocks: [
        {
          kind: "md",
          md: md`### What the physics says about where to look

- **Height:** coarse dust concentration falls with height above a dusty surface; the lower edge of a fixed table and low tracker positions see more giant particles and saltating sand.
- **Position in the plant:** windward edge rows (northwest side, for the shamal) take the impaction load; interior rows are sheltered but may collect fines in recirculation. Soiling is spatially non-uniform, which is why the IEA PVPS Task 13 report insists on multi-sensor networks.
- **Local sources:** an unpaved road or laydown area upwind of a block can dominate its deposition. Map them before choosing sensor locations.
- **Orientation vs wind:** single-axis trackers with north-south axes tilt east or west; the shamal blows from the northwest, so the face meets it obliquely. The angle between the wind and the face normal, not just the tilt, sets impaction.
- **Time of day:** afternoon winds lift and carry dust; calm, humid nights let fines settle and stick. A deposition model needs hourly, not daily, inputs.`,
        },
        { kind: "xref", to: "m02-l05", note: "Track 0 overview of soiling mechanisms, typical rates and cleaning methods; this lesson goes one level down into the physics." },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Where deposition estimates go wrong",
          md: md`- **Applying Stokes beyond its range:** above about 50 µm it overpredicts settling; use a drag correlation such as $C_D = \frac{24}{Re}(1 + 0.15Re^{0.687})$.
- **Driving the model with PM10:** it excludes the giant bins that carry most deposited mass. Reanalysis PM has the same blind spot.
- **Ignoring resuspension:** a model with deposition only will overpredict on windy sites and miss natural recovery days.
- **One deposition velocity for all sizes:** $v_d$ spans four orders of magnitude between 1 and 100 µm.
- **Treating tilt as a constant on trackers:** the tilt changes all day and night; a tracker's night position sets the dew and calm-air deposition for 10 to 12 hours.`,
        },
        {
          kind: "checklist",
          title: "Checks on any soiling model offered to Mizan or by a vendor",
          items: [
            "Which particle size bins does it use, and does it include particles above 10 µm?",
            "Is deposition velocity size-dependent, and is the tilt effect applied correctly (and hourly for trackers)?",
            "Is there a resuspension or natural-recovery term driven by wind speed?",
            "Is wet deposition or dew handled, or explicitly excluded (as in the Solargis model)?",
            "What ground soiling data was it calibrated against, and how far is that from a Kuwaiti inland site?",
          ],
        },
        {
          kind: "ask",
          title: "Ask the soiling-model vendor or partner",
          items: [
            "Show the validation of your soiling model against ground stations in hot desert climates: bias where soiling is high?",
            "How does your model treat a tracker's changing tilt, including the night-time position?",
            "Can your model use our site wind, humidity and dust event records, or only reanalysis inputs?",
            "How sensitive is the output to the assumed deposition velocity and sticking fraction?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "mz01-l02-p2",
            type: "short",
            prompt: md`Write a one-page technical note for Mizan's product specification: the physical scope of version 1 of a soiling-rate model for Kuwaiti plants. State which deposition and removal mechanisms it includes, the inputs it needs and at what time resolution, the simplifications you accept and why, and how you would calibrate it. Do not claim any data or results Mizan does not have.`,
            rubric: [
              "Includes size-dependent gravitational settling with tilt (cos β) and justifies dropping or simplifying Brownian and electrostatic terms",
              "Includes a wind-driven resuspension or recovery term and a dew or humidity effect on sticking, with reasons",
              "Lists inputs (size-binned or proxy concentration, wind speed and direction, RH and temperature, tracker angle) at hourly or finer resolution",
              "Names the limits of PM10 and reanalysis inputs for deposited mass and how calibration corrects them",
              "Proposes calibration against measured soiling ratio or PV-derived soiling rates at a site, without claiming results",
              "Keeps claims honest: model is a hypothesis to validate, e.g. in the planned Shagaya study",
            ],
            modelAnswer: md`**Soiling-rate model v1: physical scope**

**Purpose:** estimate the daily soiling rate (%/day) at a Kuwaiti PV site from weather and dust drivers, to feed cleaning optimisation and stow logic. It is a hypothesis to be calibrated, first in the planned Shagaya Phase I study with KISR.

**Mechanisms included**
1. **Gravitational settling**, size-dependent (Stokes with Cunningham and drag correction), in four bins (5, 10, 20, 40 µm), applied to the module's actual tilt each hour ($\cos\beta$). This carries most deposited mass.
2. **Wind enhancement** as a multiplier on deposition for the windward-facing component (impaction), tuned in calibration.
3. **Sticking fraction** raised when glass temperature is near or below the dew point (Lesson 3), because capillary bridges and cementation turn arrivals into retained dust.
4. **Resuspension**: a fractional removal per hour above a wind-speed threshold, acting more on the large bins.

**Excluded:** Brownian diffusion (negligible mass), electrostatics (second order in humid nights), rain (a handful of events per year; handled as observed cleaning events).

**Inputs (hourly):** dust concentration proxy (CAMS or MERRA-2 dust PM scaled to giant bins), wind speed and direction at module height, air temperature and RH, tracker angle or fixed tilt.

**Known weaknesses:** reanalysis and PM10 under-represent particles above 10 µm and local sources; the scaling factor from PM to giant-bin concentration is the main unknown.

**Calibration:** fit the scaling and sticking parameters to measured soiling ratio (reference pair) or to soiling rates extracted from PV data between cleanings, then test on a held-out period such as the 2018 to 2019 cleaning outage at Shagaya, if KISR shares the data.`,
            explanation: md`A good note chooses mechanisms by their mass contribution, keeps the tilt and wind effects, admits the input weakness and makes calibration the core of credibility.`,
            concepts: ["mz01.deposition-flux", "mz01.resuspension", "mz01.stokes-settling"],
            difficulty: 3,
          },
        },
        { kind: "sources", refs: ["mz01-r5", "mz01-r7", "mz01-r12", "mz01-r16", "mz01-r21"] },
        {
          kind: "feynman",
          prompt: "Explain to a non-specialist investor why the dust you can see in the air (haze) is not the dust that soils solar panels, using settling velocity.",
          keyPoints: [
            "Settling velocity scales with diameter squared, so large particles fall many times faster",
            "Haze and AOD are dominated by fine particles that stay up for hours or days",
            "Mass deposited on panels is dominated by coarse and giant particles near the source",
            "Wind removes large particles more easily than small ones, so the remaining deposit gets finer over time",
            "So a soiling model needs size-resolved inputs and site calibration, not just a haze index",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz01-l02-q1",
      type: "numeric",
      prompt: md`In Stokes' regime, if a 10 µm particle settles at 0.77 cm/s, how fast does a 30 µm particle of the same density settle (cm/s)? Ignore slip and inertial corrections.`,
      answer: 6.93,
      tolerance: { abs: 0.1 },
      unit: "cm/s",
      explanation: md`$v_s \propto d^2$: $0.77\times(30/10)^2 = 0.77\times9 = 6.93$ cm/s. The full calculation with a small drag correction gives about 6.6 cm/s.`,
      concepts: ["mz01.stokes-settling"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz01-l02-q2",
      type: "mcq",
      prompt: "Why does Stokes' law overpredict the settling velocity of a 100 µm sand grain?",
      options: [
        "Slip flow reduces drag at that size",
        "The particle Reynolds number is about 4.5, so drag exceeds the Stokes value",
        "Buoyancy becomes significant",
        "Brownian motion slows the fall",
      ],
      answer: 1,
      explanation: md`Stokes drag assumes $Re_p \ll 1$. At $Re_p \approx 4.5$ the true drag is about 40% higher, so the real velocity is lower. Slip matters only for small particles; buoyancy is negligible for dust in air.`,
      concepts: ["mz01.stokes-settling"],
      difficulty: 2,
    },
    {
      id: "mz01-l02-q3",
      type: "numeric",
      prompt: md`In still air, what fraction of a horizontal plate's gravitational deposition flux does a module at 60° tilt receive? (2 decimals)`,
      answer: 0.5,
      tolerance: { abs: 0.01 },
      explanation: md`Settling flux scales with the horizontal projection: $\cos60° = 0.50$. Wind-driven terms do not follow this cosine, which is why real tilt effects are smaller and depend on wind direction.`,
      concepts: ["mz01.deposition-flux", "mz01.tilt-wind"],
      difficulty: 1,
    },
    {
      id: "mz01-l02-q4",
      type: "multi",
      prompt: "Per Figgis et al. (2019), which statements about tilt in a perpendicular wind are correct? (Select all that apply.)",
      options: [
        "Deposition peaked near 45° tilt facing into the wind",
        "Accumulation peaked near 22° tilt facing away from the wind",
        "Horizontal plates always accumulated the least",
        "They recommended night stow of single-axis trackers at maximum tilt toward the wind",
      ],
      answer: [0, 1, 3],
      explanation: md`Deposition (arrivals) and accumulation (net) peak at different geometries: windward faces receive more, leeward moderate tilts keep more. Steep windward stow exposes the face to wind removal and reduces settling.`,
      concepts: ["mz01.tilt-wind"],
      difficulty: 2,
    },
    {
      id: "mz01-l02-q5",
      type: "mcq",
      prompt: "Why does wind resuspension leave a deposit enriched in fine particles?",
      options: [
        "Fine particles are denser",
        "Aerodynamic removal scales roughly with d² while adhesion scales with d, so the removal-to-adhesion ratio falls for small particles",
        "Fine particles are electrically neutral",
        "Large particles cement faster",
      ],
      answer: 1,
      explanation: md`Removal grows faster with size than adhesion does, so large particles go first. The fines left behind block the most light per gram (Lesson 4), so natural recovery recovers less transmission than mass.`,
      concepts: ["mz01.resuspension"],
      difficulty: 2,
    },
    {
      id: "mz01-l02-q6",
      type: "decision",
      prompt: md`You place the first soiling reference pair at a new 500 MW Kuwaiti plant. Options for its location:`,
      options: [
        { text: "Next to the substation building for easy power and communications.", score: 0.2, feedback: "Convenient, but buildings shelter or channel wind and nearby roads add local dust: the readings may not represent the arrays." },
        { text: "Inside a representative array block, at module height and tilt (or on a tracker), away from roads, with further pairs planned at the windward edge and an interior block.", score: 1, feedback: "Matches the physics: same tilt, height and exposure as the modules, and acknowledges spatial non-uniformity." },
        { text: "On the windward northwest corner only, since it will read the worst case.", score: 0.4, feedback: "Useful as one point, but a single edge location biases the plant-average estimate upward." },
      ],
      explanation: md`Deposition depends on height, tilt, wind exposure and local sources; a reference must share them with the modules it represents, and one point cannot represent a large plant.`,
      concepts: ["mz01.deposition-flux", "mz01.tilt-wind"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz01-l02-f1", front: "Stokes settling velocity", back: md`$v_s = \dfrac{\rho_p g d^2 C_c}{18\mu}$; valid for $Re_p$ below about 0.1 to 1.`, concepts: ["mz01.stokes-settling"] },
    { id: "mz01-l02-f2", front: "Settling velocity of 10 µm dust at 40 °C", back: "About 0.77 cm/s; 2 m fall in about 4 minutes.", concepts: ["mz01.stokes-settling"] },
    { id: "mz01-l02-f3", front: "Stokes number", back: md`$Stk = \tau_p U/L$ with $\tau_p = v_s/g$. Above about 1: particles impact the obstacle.`, concepts: ["mz01.impaction"] },
    { id: "mz01-l02-f4", front: "Deposition flux", back: md`$F = \sum_i v_{d,i} C_i$; gravitational part $\propto \cos\beta$.`, concepts: ["mz01.deposition-flux"] },
    { id: "mz01-l02-f5", front: "Figgis 2019 tilt findings", back: "Deposition peaks near 45° facing the wind; accumulation peaks near 22° facing away; stow trackers steep toward the wind at night.", concepts: ["mz01.tilt-wind"] },
    { id: "mz01-l02-f6", front: "Doha natural recovery share", back: "About 25% of days showed natural recovery (mostly wind); 75% build-up; dust storms raised the annual mean rate about 23%.", concepts: ["mz01.resuspension"] },
  ],
};

export default lesson;
