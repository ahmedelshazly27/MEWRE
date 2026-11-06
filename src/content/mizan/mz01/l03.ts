import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz01-l03",
  title: "Adhesion and cementation: van der Waals, capillary forces, dew cycles and why mornings matter",
  summary:
    "Why small particles stick, how a film of dew multiplies the grip, how dissolution and recrystallisation cement dust to glass, and why dewy nights raise measured soiling rates in Qatar. The physics behind dew-aware cleaning and night stow.",
  minutes: 75,
  objectives: [
    "Compare van der Waals, capillary, electrostatic, gravitational and aerodynamic forces on a dust particle as a function of size",
    "Compute a dew point and the glass cooling needed for dew, and explain radiative cooling and the sky view factor",
    "Describe the cementation cycle (dissolution, migration, recrystallisation, ageing) and the open debate on its mineralogy",
    "Explain with measured Qatar data why dewy seasons and mornings raise soiling rates, and when condensation cleans instead",
    "Turn the physics into dew-aware rules for cleaning timing and night stow",
  ],
  concepts: [
    {
      id: "mz01.adhesion-forces",
      name: "Adhesion forces (van der Waals, capillary, electrostatic)",
      description: "Short-range forces holding particles on glass; they scale with diameter while weight scales with diameter cubed, so below about 100 µm adhesion dominates, and capillary bridges from adsorbed or condensed water are usually the strongest.",
      competency: "mz-soiling",
      related: ["mz01.resuspension", "mz01.cementation"],
    },
    {
      id: "mz01.dew-formation",
      name: "Dew formation on modules",
      description: "On clear, calm nights the glass radiates to the cold sky and cools below air temperature; when it falls below the dew point (or a few kelvin above it for hygroscopic dust) water condenses on the glass.",
      competency: "mz-soiling",
      related: ["mz01.cementation", "mz01.adhesion-forces"],
    },
    {
      id: "mz01.cementation",
      name: "Cementation",
      description: "Repeated wetting and drying dissolves soluble and reactive phases in the dust (salts, carbonates, clays) and reprecipitates them as solid bridges between particles and glass, producing a crust that wind and dry brushes cannot remove.",
      competency: "mz-soiling",
      related: ["mz01.dust-mineralogy", "mz01.dew-formation", "m02.cleaning-strategy"],
    },
    {
      id: "mz01.dew-soiling-rate",
      name: "Dew and the soiling rate",
      description: "Dew raises soiling rates by increasing particle capture and retention, by capillary ageing and by cementation; Qatar measurements show higher winter rates attributed to overnight dew, while heavy run-off condensation can partly clean.",
      competency: "mz-soiling",
      related: ["mz01.dew-formation", "mz01.cementation"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Why dust sticks, and how water glues it",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`The levers Mizan can sell beyond a dashboard are timing levers: when to dry-clean, when a wet clean is unavoidable, and which night position a tracker should hold. All three come from adhesion and dew physics. If you can show a KISR researcher or an O&M contractor why a dewy night turns loose dust into a crust, you can justify dew-point and glass-temperature sensing in the pilot, and you can explain why a robot that runs at the wrong hour makes things worse.`,
        },
        {
          kind: "md",
          md: md`### The force budget of a particle on glass

Four forces matter for a particle resting on a module:

1. **Weight**, $\rho_p g \pi d^3/6$: scales with $d^3$.
2. **Van der Waals attraction**: induced-dipole forces between particle and glass across a gap of a few tenths of a nanometre. For a sphere on a flat plate:`,
        },
        { kind: "equation", formula: "mz01-vdw" },
        {
          kind: "md",
          md: md`3. **Capillary force**: whenever water is present (adsorbed films at high humidity, or dew), a meniscus forms around the contact and its surface tension pulls the particle down:`,
        },
        { kind: "equation", formula: "mz01-capillary" },
        {
          kind: "md",
          md: md`4. **Electrostatic force**: saltation charges dust grains (triboelectric charging), and dry glass holds charge. Image and Coulomb forces add adhesion in very dry air; humidity raises surface conductivity and bleeds charge away, so electrostatics matter most on dry, windy days.

Against these, wind exerts **drag and lift** in the thin viscous sublayer next to the glass:`,
        },
        { kind: "equation", formula: "mz01-wall-drag" },
        {
          kind: "md",
          md: md`Ideal values for a quartz sphere on glass ($A = 10^{-19}$ J, $z_0 = 0.4$ nm, water $\gamma = 0.072$ N/m, $\theta = 0$, strong wind with $u_* = 0.5$ m/s):

| $d$ (µm) | Weight (N) | Van der Waals (N) | Capillary (N) | Wind drag (N) | Van der Waals / weight |
|---|---|---|---|---|---|
| 1 | $1.4\times10^{-14}$ | $5.2\times10^{-8}$ | $4.5\times10^{-7}$ | $2.3\times10^{-12}$ | about 4 million |
| 10 | $1.4\times10^{-11}$ | $5.2\times10^{-7}$ | $4.5\times10^{-6}$ | $2.3\times10^{-10}$ | about 38,000 |
| 50 | $1.7\times10^{-9}$ | $2.6\times10^{-6}$ | $2.3\times10^{-5}$ | $5.6\times10^{-9}$ | about 1,500 |
| 100 | $1.4\times10^{-8}$ | $5.2\times10^{-6}$ | $4.5\times10^{-5}$ | $2.3\times10^{-8}$ | about 380 |

Three lessons from the table:

- **Gravity is irrelevant for adhesion** below about 100 µm. A tilted module does not shed fine dust by gravity alone; it sheds the large grains.
- **Real adhesion is far below the ideal.** Surface roughness means only nano-asperities touch, cutting van der Waals forces by one to two orders of magnitude, and particles are removed by **rolling** (the drag moment about the contact point beats the adhesion moment) at forces well below the pull-off value. That is why wind does remove particles, starting with the large ones (Lesson 2).
- **Water is the multiplier.** Even ideal, the capillary force is about nine times the van der Waals force, and unlike van der Waals it is not much reduced by roughness, because the liquid fills the gaps. Once a dew film forms, almost nothing short of a brush or a running film of water moves the particle.`,
        },
        {
          kind: "md",
          md: md`### How dew forms on a module

At night the glass exchanges long-wave radiation with the sky. A clear desert sky is radiatively cold (its effective temperature can be 20 K or more below the air), so the glass loses heat and cools **below air temperature**, typically by a few kelvin on clear, calm nights. Wind mixes warmer air to the surface and limits the cooling; clouds and dust haze warm the sky and reduce it.

Dew condenses when the glass surface falls below the **dew point** of the air:`,
        },
        { kind: "equation", formula: "mz01-dew-point" },
        {
          kind: "md",
          md: md`The **dew point depression** $T - T_d$ is how far the glass must cool below the air. It falls steeply as humidity rises:`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "Glass cooling needed for dew vs relative humidity",
          xKey: "rh",
          xLabel: "Relative humidity (%)",
          yLabel: "Dew point depression T − Td (K)",
          series: [
            { key: "t20", label: "Air at 20 °C" },
            { key: "t30", label: "Air at 30 °C" },
          ],
          data: [
            { rh: 20, t20: 23.7, t30: 25.4 },
            { rh: 30, t20: 18.1, t30: 19.5 },
            { rh: 40, t20: 14.0, t30: 15.1 },
            { rh: 50, t20: 10.7, t30: 11.6 },
            { rh: 60, t20: 8.0, t30: 8.6 },
            { rh: 70, t20: 5.6, t30: 6.1 },
            { rh: 80, t20: 3.6, t30: 3.8 },
            { rh: 90, t20: 1.7, t30: 1.8 },
            { rh: 100, t20: 0, t30: 0 },
          ],
          caption: "Computed with the Magnus formula. With night-time radiative cooling of a few kelvin, dew on bare glass needs relative humidity above roughly 75 to 80%. Hygroscopic salts in the dust lower the bar further.",
        },
        {
          kind: "md",
          md: md`Two corrections from the Qatar field work (Figgis et al., 2022): **condensation can begin with the glass a few kelvin above the dew point** computed from weather data, because hygroscopic salts (halite) and fine clays pull water from humid air; and **heavy condensation can clean**, when droplets grow, coalesce and run off a steep enough module, carrying particles with them. The most damaging case is light dew that wets the dust but does not run off.

Tilt matters for dew too. The fraction of the sky a plate sees is:`,
        },
        { kind: "equation", formula: "mz01-sky-view" },
        {
          kind: "md",
          md: md`A flat module sees the whole cold sky; a vertical one sees half sky and half warm ground, so it cools much less and collects less dew. That is one physical reason for steep night stow (Lesson 5).

### Cementation: from loose dust to crust

Cementation is a cycle that repeats on every dewy night:

1. **Wetting:** dew or hygroscopic uptake forms a thin film and menisci at particle contacts.
2. **Dissolution:** soluble phases dissolve: halite and gypsum directly; calcite through carbonic acid from dissolved CO₂, $\mathrm{CaCO_3 + CO_2 + H_2O \rightleftharpoons Ca^{2+} + 2HCO_3^-}$; clays swell and release fine platelets.
3. **Migration:** as the film evaporates after sunrise, the solution retreats into the menisci at the contact points, concentrating dissolved ions exactly where particle meets glass.
4. **Precipitation:** salts, calcite and clay minerals reprecipitate as **solid bridges** at the contact necks.
5. **Ageing:** each cycle adds material to the bridges and increases contact area (**capillary ageing**). After weeks the layer behaves as a weak cement.

The mineralogy of the bridges is still debated. Ilse et al. (2018) found **needle-shaped crystals of palygorskite** (a fibrous clay) precipitating on glass in Qatar; an earlier Doha study (2016) found the needles to be mainly **silicon, magnesium and aluminium oxides**, which challenges the idea that salts drive cementation. Either way, the practical result is the same: a cemented layer resists wind and dry brushing and usually needs water plus mechanical action.`,
        },
        {
          kind: "flow",
          title: "The dew and cementation cycle (one night)",
          steps: [
            { label: "Evening", detail: "Glass radiates to clear sky; wind drops; RH rises as air cools" },
            { label: "Night", detail: "Glass below dew point (or near it with salty dust): film and menisci form" },
            { label: "Capture", detail: "Wet glass holds arriving fines with no bounce; capillary force about 9× van der Waals" },
            { label: "Dissolution", detail: "Salts, gypsum, calcite (via CO₂) dissolve; clays swell" },
            { label: "Sunrise drying", detail: "Solution retreats into contact menisci and reprecipitates" },
            { label: "Ageing", detail: "Bridges thicken night after night: crust that dry brushes cannot lift" },
          ],
          caption: "The morning is when the damage is fixed: the drying front deposits the binder at the particle-glass contact.",
        },
        {
          kind: "md",
          md: md`### Why dew raises measured soiling rates

At the QEERI Outdoor Test Facility in Qatar the average soiling rate on fixed-tilt modules was **0.49 %/day** (about 13% in a month without rain or cleaning) and was **higher in winter because of overnight dew** (PV Tech, reporting QEERI results). A four-year Doha study measured **0.43 ± 1.0 %/day** with six-monthly cleaning and **0.46 ± 1.05 %/day** with two-monthly cleaning; the large standard deviations reflect day-to-day swings between build-up days (75%) and recovery days (25%). Winter in Qatar is not the dustiest season, so a higher winter rate points to **retention**, not arrival.

The mechanisms stack:

- **Capture efficiency rises:** a wet surface catches particles that would have bounced, and holds fines that the next wind would have removed.
- **Adhesion rises:** capillary bridges replace weak van der Waals contacts, and they persist as solid bridges after drying.
- **Removal falls:** dew nights are calm, so there is no wind resuspension while the film is present.
- **The deposit concentrates:** as droplets shrink they drag particles into rings and spots and, on tilted modules, toward the lower edge, which drives non-uniform soiling (Lesson 4).
- **Cleaning gets harder:** cemented dust needs water and brushing, so a dry robot recovers less after a dewy period.`,
        },
        {
          kind: "widget",
          widget: "kuwait-climate",
          props: { metric: "temp" },
          caption: "Use the temperature view with the dew chart: the cooler months bring lower night temperatures and, with humid air, the small dew point depressions that make dew likely. Kuwait-specific night humidity data must come from site or KISR records.",
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Dew frequency at Kuwaiti sites",
          md: md`The research brief contains Qatar dew results but no measured dew frequency for Shagaya or other Kuwaiti PV sites. Kuwait's inland desert is drier than coastal Doha, so dew may be less frequent at Shagaya than at QEERI, while coastal Kuwaiti sites may resemble Doha more closely. Treat any Kuwaiti dew rate as a hypothesis until measured with glass temperature and humidity sensors.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Forces and dew points with numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Force budget of a 10 µm quartz particle",
          given: md`$d = 10$ µm, $\rho_p = 2{,}650$ kg/m³; Hamaker constant $A = 1.0\times10^{-19}$ J; $z_0 = 0.4$ nm; water $\gamma = 0.072$ N/m, contact angle 0 (clean glass); strong wind with friction velocity $u_* = 0.5$ m/s; air at 40 °C, $\mu = 1.91\times10^{-5}$ Pa·s, $\nu = 1.7\times10^{-5}$ m²/s.`,
          steps: [
            { md: md`**Weight:** $\rho_p g \pi d^3/6 = 2{,}650\times9.81\times\pi\times10^{-15}/6 = 1.36\times10^{-11}$ N.` },
            { md: md`**Van der Waals (ideal):** $F = A d/(12 z_0^2) = 10^{-19}\times10^{-5}/(12\times1.6\times10^{-19}) = 5.2\times10^{-7}$ N, about 38,000 times the weight.` },
            { md: md`**Capillary (dew present):** $F = 2\pi\gamma d = 2\pi\times0.072\times10^{-5} = 4.5\times10^{-6}$ N, about 9 times the van der Waals value.` },
            { md: md`**Wind drag:** velocity at the particle centre $u = u_*^2 (d/2)/\nu = 0.25\times5\times10^{-6}/1.7\times10^{-5} = 0.074$ m/s; $F_D = 1.7\times3\pi\times1.91\times10^{-5}\times10^{-5}\times0.074 = 2.3\times10^{-10}$ N.` },
            { md: md`**Comparison:** drag is about 2,000 times below ideal van der Waals adhesion and 20,000 times below capillary adhesion. Removal of dry particles happens only because roughness cuts real adhesion by 10 to 100 times and because rolling needs less force than lift-off; removal of a wetted or cemented particle by wind is effectively impossible.` },
          ],
          result: md`For a 10 µm particle, adhesion beats weight by four to five orders of magnitude and beats strong-wind drag by three to four. Dew turns a marginally removable particle into a permanently attached one. This is the quantitative reason why dry cleaning should run before dew forms, and why a cemented layer needs water.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Will there be dew tonight? Two Kuwaiti nights",
          given: md`Night A (illustrative inland summer night): air 30 °C, RH 40%. Night B (illustrative winter night): air 15 °C, RH 85%. On a clear, calm night the module glass cools about 3 to 5 K below the air. Magnus constants $a = 17.62$, $b = 243.12$ °C.`,
          steps: [
            { md: md`Night A: $\gamma_m = \ln0.40 + 17.62\times30/273.12 = -0.916 + 1.935 = 1.019$.` },
            {
              md: md`$T_d = 243.12\times1.019/(17.62 - 1.019) = 14.9$ °C. The glass would need to cool about 15 K below the air: no dew.`,
              hidden: true,
              check: { prompt: "Dew point on night A (°C)", answer: 14.9, unit: "°C", tolerance: { abs: 0.2 } },
            },
            { md: md`Night B: $\gamma_m = \ln0.85 + 17.62\times15/258.12 = -0.163 + 1.024 = 0.861$.` },
            {
              md: md`$T_d = 243.12\times0.861/(17.62 - 0.861) = 12.5$ °C. Dew point depression 2.5 K: within the 3 to 5 K of radiative cooling, so dew is likely.`,
              hidden: true,
              check: { prompt: "Dew point on night B (°C)", answer: 12.5, unit: "°C", tolerance: { abs: 0.2 } },
            },
          ],
          result: md`Dew risk is set far more by humidity than by temperature. A cleaning or stow rule should use the forecast **dew point depression** and measured **glass temperature**, not a calendar month. With salty dust, start the risk window a few kelvin earlier than the computed dew point.`,
        },
        {
          kind: "question",
          question: {
            id: "mz01-l03-p1",
            type: "numeric",
            prompt: md`A hydrophobic coating raises the water contact angle so that $\cos\theta = 0.5$ (θ = 60°). What is the ideal capillary force on a 20 µm particle (µN)? Water surface tension 0.072 N/m. (2 decimals)`,
            answer: 4.52,
            tolerance: { abs: 0.05 },
            unit: "µN",
            explanation: md`$F = 2\pi\gamma d\cos\theta = 2\pi\times0.072\times2\times10^{-5}\times0.5 = 4.52\times10^{-6}$ N $= 4.52$ µN. Halving $\cos\theta$ halves the capillary force; at θ above 90° the idealised meniscus no longer pulls. In practice the particle's own wettability and the dust's salts matter too, which is one reason coating results vary in the field.`,
            concepts: ["mz01.adhesion-forces"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Dew-aware operation",
      blocks: [
        {
          kind: "md",
          md: md`### What to measure

| Quantity | Why | Practical note |
|---|---|---|
| **Front glass temperature** | The surface that condenses | A back-of-module PT100 reads warmer than the front glass at night; use a front-surface sensor or a correction |
| **Air temperature and RH** at module height | Dew point | Standard met station values at 2 m are acceptable if the station is in the array |
| **Wind speed** | Limits radiative cooling; removal | Calm nights are the risk nights |
| **Sky condition** (pyrgeometer, or cloud and dust proxy) | Radiative cooling strength | Dust haze at night warms the sky and reduces dew |
| **Direct condensation or wetness sensor** | Figgis et al. found direct measurement beats inference | Cheap, and the best single signal for a dew-aware rule |

### Operational levers

- **Dry robot timing:** run dry robots **before dew onset** (early night) or **after the glass has dried** (mid-morning on a sunny day). Running a dry brush over a wet film smears mud and can leave streaks that cement on drying.
- **Wet cleaning timing:** after a run of dewy nights the layer is cemented; a dry robot recovers less. That is the moment a wet clean pays back.
- **Night stow:** on trackers, a steep night angle reduces the sky view factor and so dew, and lets condensate run off; Lesson 5 covers the evidence.
- **Glass heating:** night-time heating of the glass suppresses dew and cementation in experiments, but costs energy; not a utility-scale option today.

The cleaning cost trade-off itself (interval economics, robot vs manual) is in Track 0; the physics here tells you **when** each method works.`,
        },
        { kind: "xref", to: "m12-l04", note: "O&M cleaning strategy, methods and cleaning economics: this lesson supplies the dew physics that decides when dry and wet cleaning are effective." },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Scheduling robots by the clock:** a fixed 03:00 dry run lands in peak dew hours for much of the cool season.
- **Using a back-of-module temperature for dew decisions:** at night the front glass can be several kelvin colder.
- **Reading a winter soiling rise as a dust problem:** if dust concentrations did not rise, look at dew and retention first.
- **Assuming any condensation is harmful:** heavy run-off condensation can clean; light dew is the damaging case.
- **Water quality for wet cleaning:** hard water leaves its own scale; module OEMs specify limits on dissolved solids.`,
        },
        { kind: "scenario", scenario: "mz01-s1" },
        {
          kind: "question",
          question: {
            id: "mz01-l03-p2",
            type: "short",
            prompt: md`Write the specification of a dew-aware cleaning rule that Mizan could propose for a Kuwaiti tracker plant with nightly dry robots and periodic wet cleaning. Give the inputs, the decision logic with explicit thresholds (labelled as initial values to be calibrated), what the rule does on dew nights and after runs of dew, and how you would test that it works.`,
            rubric: [
              "Uses dew-relevant inputs: front glass temperature, air temperature and RH (dew point), wind, and ideally a direct wetness sensor",
              "Defines a dew-risk condition with a margin above the computed dew point to allow for hygroscopic dust, with thresholds labelled as initial values",
              "Moves dry robot runs to before dew onset or after drying, and avoids brushing a wet film",
              "Triggers or advances a wet clean after a defined run of dew nights or when the soiling recovery after dry cleaning falls",
              "Includes night stow position as a coordinated lever and respects robot parking constraints",
              "Proposes a measurable test (A/B rows or blocks, soiling ratio or cleaning recovery) without claiming results",
            ],
            modelAnswer: md`**Dew-aware cleaning rule v0 (thresholds are initial values to calibrate)**

**Inputs (every 10 min):** front glass temperature $T_g$; air temperature and RH at module height (dew point $T_d$); wind speed; wetness sensor state; forecast hourly $T$, RH and wind for the next 12 h; robot status; soiling ratio from the reference pair.

**Dew risk:** $T_g - T_d \le 3$ K, or wetness sensor wet, with wind below 3 m/s. The 3 K margin allows for hygroscopic dust starting condensation above the computed dew point.

**Logic**
1. At sunset, forecast the time $t_{dew}$ at which dew risk begins. If $t_{dew}$ is within the night, schedule the dry robot run to **finish at least 1 h before** $t_{dew}$.
2. If dew risk is already present when the robot would start, **cancel** the dry run and reschedule to the first slot after the wetness sensor reads dry and $T_g - T_d > 5$ K (usually mid-morning; check that robots may run in daylight at that plant).
3. Count consecutive dew nights. After **3 or more**, or when the soiling-ratio recovery after a dry clean falls below **50%** of the pre-clean loss, flag the block for a **wet clean** within 5 days.
4. On dew-risk nights, hold trackers at the **steepest safe night angle** after the robot run and return them to the robot parking angle only for the next run.

**Test:** apply the rule to half the blocks (alternating, to spread wind exposure) for one cool season, keep the clock schedule on the rest, and compare the soiling ratio, cleaning recovery and number of wet cleans. Report the result as a measured difference with uncertainty; no saving is claimed in advance.`,
            explanation: md`A strong answer links each threshold to physics (dew point depression, hygroscopic margin, calm air), coordinates robots and stow, and builds in an honest test.`,
            concepts: ["mz01.dew-formation", "mz01.cementation", "mz01.dew-soiling-rate"],
            difficulty: 3,
          },
        },
        { kind: "sources", refs: ["mz01-r8", "mz01-r7", "mz01-r9", "mz01-r10", "mz01-r11", "mz01-r23"] },
        {
          kind: "feynman",
          prompt: "Explain to an O&M contractor why a dewy winter night can soil his modules more than a dry shamal afternoon, and what he should change in his robot schedule.",
          keyPoints: [
            "Adhesion beats gravity for small particles; water bridges multiply adhesion several times",
            "Wet glass captures particles that would bounce and holds fines the wind would remove",
            "Drying in the morning reprecipitates dissolved salts, carbonates and clays at the contacts: cementation",
            "Qatar data show higher winter soiling rates attributed to overnight dew",
            "Run dry robots before dew forms or after the glass dries, and plan a wet clean after runs of dew nights",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz01-l03-q1",
      type: "mcq",
      prompt: "How do van der Waals adhesion and weight scale with particle diameter d?",
      options: [
        "Both scale with d³",
        "Adhesion with d, weight with d³",
        "Adhesion with d², weight with d",
        "Adhesion is independent of d",
      ],
      answer: 1,
      explanation: md`$F_{vdW} \propto d$, weight $\propto d^3$. The ratio grows as $1/d^2$ toward small sizes, so fine dust sticks regardless of tilt.`,
      concepts: ["mz01.adhesion-forces"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz01-l03-q2",
      type: "numeric",
      prompt: md`Air at 20 °C with RH 70%. Using the Magnus formula ($a = 17.62$, $b = 243.12$ °C), what is the dew point in °C? (1 decimal)`,
      answer: 14.4,
      tolerance: { abs: 0.2 },
      unit: "°C",
      explanation: md`$\gamma_m = \ln0.70 + 17.62\times20/263.12 = -0.357 + 1.339 = 0.983$; $T_d = 243.12\times0.983/(17.62-0.983) = 14.4$ °C. The glass must cool 5.6 K below the air: possible on a very clear, calm night.`,
      concepts: ["mz01.dew-formation"],
      difficulty: 2,
    },
    {
      id: "mz01-l03-q3",
      type: "order",
      prompt: "Order the steps of one cementation cycle.",
      items: [
        "Glass cools below the dew point and a water film forms",
        "Soluble and reactive phases dissolve and clays swell",
        "The drying film retreats into menisci at particle-glass contacts",
        "Dissolved material reprecipitates as solid bridges",
        "Repeated cycles thicken the bridges (ageing)",
      ],
      explanation: md`Wetting, dissolution, migration to the contacts during drying, precipitation, ageing. The morning drying step fixes the binder where it matters.`,
      concepts: ["mz01.cementation"],
      difficulty: 1,
    },
    {
      id: "mz01-l03-q4",
      type: "multi",
      prompt: "Which statements about dew and soiling are supported by the Qatar research? (Select all that apply.)",
      options: [
        "Soiling rates at QEERI were higher in winter because of overnight dew",
        "Condensation can start with the glass a few °C above the dew point computed from weather data",
        "All condensation increases soiling",
        "Needle-shaped palygorskite crystals were found precipitating on glass",
        "The mineralogy of the cementing needles is fully settled",
      ],
      answer: [0, 1, 3],
      explanation: md`Heavy run-off condensation can clean, so not all condensation harms. A 2016 Doha study found Si, Mg and Al oxide needles, so the mineralogy is still debated.`,
      concepts: ["mz01.dew-soiling-rate", "mz01.cementation"],
      difficulty: 2,
    },
    {
      id: "mz01-l03-q5",
      type: "numeric",
      prompt: md`What is the sky view factor of a module stowed at 60° tilt? (2 decimals)`,
      answer: 0.75,
      tolerance: { abs: 0.01 },
      explanation: md`$F_{sky} = (1+\cos60°)/2 = 0.75$. A quarter less sky than a flat module: less radiative cooling, less dew. At 90° it is 0.5.`,
      concepts: ["mz01.dew-formation"],
      difficulty: 1,
    },
    {
      id: "mz01-l03-q6",
      type: "decision",
      prompt: md`After two weeks of dewy nights, the dry robots recover only 30% of the soiling loss after each pass. What do you recommend?`,
      options: [
        { text: "Run the dry robots twice a night.", score: 0.1, feedback: "More passes over a cemented layer recover little and add brush abrasion of the anti-reflective coating." },
        { text: "Schedule a wet clean for the affected blocks, then move dry runs to before dew onset and use a steep night stow on dew-risk nights.", score: 1, feedback: "Removes the cemented layer with the only method that can, then changes timing and position to stop it re-forming." },
        { text: "Wait for the shamal season: wind will clean the modules.", score: 0, feedback: "Wind cannot remove cemented dust; the shamal brings more deposition, not less." },
      ],
      explanation: md`Low dry-clean recovery after dewy periods is the signature of cementation: it needs water and mechanical action, then prevention.`,
      concepts: ["mz01.cementation", "mz01.dew-soiling-rate"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz01-l03-f1", front: "Van der Waals adhesion, sphere on plate", back: md`$F = A d/(12 z_0^2)$; about $5\times10^{-7}$ N for a 10 µm particle (ideal), 38,000 times its weight.`, concepts: ["mz01.adhesion-forces"] },
    { id: "mz01-l03-f2", front: "Capillary adhesion", back: md`$F \approx 2\pi\gamma d\cos\theta$; about 9 times van der Waals on clean glass.`, concepts: ["mz01.adhesion-forces"] },
    { id: "mz01-l03-f3", front: "Dew condition", back: "Glass temperature below the dew point (or a few K above it with hygroscopic dust), on clear, calm, humid nights.", concepts: ["mz01.dew-formation"] },
    { id: "mz01-l03-f4", front: "Qatar QEERI soiling rate", back: "0.49 %/day average on fixed tilt (about 13% per month), higher in winter because of overnight dew.", concepts: ["mz01.dew-soiling-rate"] },
    { id: "mz01-l03-f5", front: "Doha four-year soiling rates", back: "0.43 ± 1.0 %/day (6-monthly cleaning), 0.46 ± 1.05 %/day (2-monthly cleaning).", concepts: ["mz01.dew-soiling-rate"] },
    { id: "mz01-l03-f6", front: "Cementation in one line", back: "Dew dissolves salts, carbonates and clays; drying reprecipitates them as bridges at particle-glass contacts.", concepts: ["mz01.cementation"] },
    { id: "mz01-l03-f7", front: "When to run dry robots", back: "Before dew onset or after the glass is dry; never brush a wet film.", concepts: ["mz01.dew-formation", "mz01.cementation"] },
  ],
  scenarios: [
    {
      id: "mz01-s1",
      title: "The 03:00 robot schedule",
      dayInLife: true,
      context: md`An O&M contractor at an illustrative 300 MW Kuwaiti tracker plant runs waterless robots every night at 03:00, a schedule copied from a vendor reference site. The plant owner has asked Mizan (as an analytics provider in discussion, no contract yet) why the soiling ratio has drifted down through December and January even though there were no dust storms.`,
      start: "a",
      concepts: ["mz01.dew-formation", "mz01.cementation", "mz01.dew-soiling-rate"],
      nodes: {
        a: {
          md: md`You have three months of plant data: inverter output, plane-of-array irradiance, a soiling reference pair, and met station air temperature and RH. No glass temperature or wetness sensor. What is your first analytical step?`,
          choices: [
            { text: "Compute the night-time dew point depression from the met data and mark the nights where dew was likely at 03:00; compare the soiling ratio change on those nights with dry nights.", next: "b", score: 9, feedback: "Tests the physical hypothesis (dew at robot time) with the data you have." },
            { text: "Tell the owner the robots are underperforming and recommend replacing the brushes.", next: "c", score: 2, feedback: "Jumps to a hardware cause without testing the timing hypothesis." },
            { text: "Ask for a satellite dust product to check whether more dust arrived.", next: "b", score: 5, feedback: "Reasonable to rule out arrival, but the drift without storms points first to retention." },
          ],
        },
        b: {
          md: md`The analysis shows that on nights with a dew point depression under 3 K at 03:00, the robot pass recovers little and the loss accumulates night after night; on dry nights the robots recover most of the loss. The contractor says the robots cannot run in daylight because of site safety rules. What do you propose?`,
          choices: [
            { text: "Move the run to early night, finishing before forecast dew onset, add a wetness sensor and front-glass temperature sensor, and schedule a wet clean for the cemented blocks now.", next: "d", score: 10, feedback: "Respects the daylight constraint, prevents brushing wet films, adds the missing measurement and removes the existing crust." },
            { text: "Keep 03:00 but run twice.", score: 1, feedback: "Doubles the time spent brushing wet films and the abrasion of the anti-reflective coating." },
            { text: "Stop robot cleaning in winter.", score: 3, feedback: "Avoids smearing but lets dust accumulate and cement; it does not use the dry early-night window." },
          ],
        },
        c: {
          md: md`The contractor replaces brushes on one block at significant cost; the drift continues on that block as well. The owner asks why the recommendation did not work.`,
          choices: [
            { text: "Acknowledge the miss and run the dew point analysis on the existing data before any further hardware change.", next: "b", score: 6, feedback: "Recovering with evidence is better than defending the first guess." },
            { text: "Recommend replacing the robots.", score: 0, feedback: "Escalates an untested hypothesis and costs the owner more." },
          ],
        },
        d: {
          md: md`The owner agrees to try the early-night schedule on half the blocks for the rest of the cool season. How do you report the outcome?`,
          choices: [
            { text: "Compare soiling ratio and cleaning recovery between the two halves with uncertainty, note the blocks' wind exposure, and state the energy difference as measured, not projected.", score: 10, feedback: "An honest A/B with uncertainty is the kind of evidence that builds trust with a utility owner and with KISR." },
            { text: "Report the best block's improvement as the plant-wide saving.", score: 2, feedback: "Cherry-picking destroys credibility the first time the owner checks." },
          ],
        },
      },
    },
  ],
};

export default lesson;
