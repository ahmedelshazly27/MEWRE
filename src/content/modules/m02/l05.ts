import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m02-l05",
  title: "Soiling, dust & desert design",
  summary:
    "Designing and operating PV for Kuwait's desert: soiling physics and rates, shamal dust storms, cleaning strategy and water scarcity, anti-soiling coatings, high-temperature derating of inverters and transformers, sand ingress, and tracker wind stow.",
  minutes: 75,
  objectives: [
    "Explain the soiling mechanisms specific to hot, dusty, dewy deserts and interpret soiling-ratio data",
    "Compute average soiling loss and the cost-optimal cleaning interval, and compare robotic dry cleaning with water cleaning",
    "Specify high-temperature derating, sand ingress protection and cooling for inverters, transformers and cables",
    "Describe tracker wind-stow strategies and what can go wrong in a shamal",
    "Write PM-level cleaning and desert-design requirements for an IPP contract",
  ],
  concepts: [
    {
      id: "m02.soiling",
      name: "Soiling",
      description: "Dust accumulation on modules: mechanisms, rates, measurement (soiling ratio) and impact on energy in Kuwait.",
      competency: "solar",
      related: ["m02.cleaning-strategy", "m02.loss-tree", "m02.kuwait-solar-resource", "m12.cleaning-economics"],
    },
    {
      id: "m02.cleaning-strategy",
      name: "Cleaning strategy",
      description: "Manual wet, semi-automatic and robotic dry cleaning; optimal interval economics; water scarcity; anti-soiling coatings.",
      competency: "operations",
      related: ["m02.soiling", "m02.module-warranty", "m12.cleaning-economics", "m10.cleaning-economics"],
    },
    {
      id: "m02.thermal-derating",
      name: "High-temperature derating & sand ingress",
      description: "How 45–55 °C ambient derates inverters, transformers and cables, and the IP and filtration measures against dust.",
      competency: "solar",
      related: ["m02.inverter-architecture", "m02.cell-temperature", "m01.transformer-derating", "m05.desert-hvac"],
    },
    {
      id: "m02.wind-stow",
      name: "Tracker wind stow",
      description: "Stow strategies, aeroelastic instability, wind thresholds and controller behaviour during storms.",
      competency: "solar",
      related: ["m02.tracker-vs-fixed"],
    },
  ],
  sections: [
    // ============================================================ THEORY
    {
      layer: "theory",
      title: "How dust kills yield",
      blocks: [
        {
          kind: "md",
          md: md`**Soiling** is the loss of light transmission through the front glass caused by deposited particles. In Kuwait it is the second-largest controllable loss after temperature, and the largest *operational* one.

### Mechanisms

1. **Deposition.** Airborne dust (mineral particles, mostly 1–100 µm; quartz, calcite, clays) settles by gravity, impacts in wind, and adheres by van der Waals and electrostatic forces. Rate depends on ambient dust concentration (high during shamal and local dust events), wind speed and module tilt.
2. **Cementation.** At night the module cools below the dew point (radiative cooling to a clear sky). **Dew** dissolves soluble salts and clays in the dust; at sunrise it evaporates and leaves a **cemented crust** that wind cannot remove and dry brushes struggle with. Kuwait's coastal humidity, especially in late summer and winter nights, makes this significant inland too.
3. **Removal.** Wind, gravity on steep tilts and rain clean modules naturally — but Kuwait has very little rain (a handful of events per year, mostly winter), so natural cleaning is negligible for most of the year. Light rain can even make soiling *worse* (mud).
4. **Non-uniformity.** Dust collects at the lower edge of tilted modules (frame lip) and on the lower cells; a soiled bottom row of cells on a portrait module can trigger bypass diodes — the loss becomes worse than the transmission loss alone. Frameless glass-glass modules shed dust better at the edge.

### Soiling rate and measurement

The **soiling rate** $r$ is the daily loss in the absence of cleaning (%/day). **Soiling ratio** (IEC 61724-1) = actual power / power if clean, measured by paired reference devices (one cleaned daily, one left soiled) or optical sensors. Typical values:

| Environment | Typical soiling rate |
|---|---|
| Temperate, regular rain | 0.01–0.05 %/day |
| Semi-arid | 0.05–0.2 %/day |
| Middle East deserts (dry season) | 0.2–0.6 %/day |
| Dust events / shamal season | 0.5–1 %/day or step losses of several % in one storm |

Between cleanings the loss builds up roughly as a sawtooth; the average loss over an interval of $N$ days is:`,
        },
        { kind: "equation", formula: "pv-soiling-average" },
        {
          kind: "callout",
          tone: "kuwait",
          title: "Kuwait soiling evidence",
          md: md`- The KISR-linked Shagaya PV testbed paper reports **substantial soiling requiring monthly water cleaning**.
- Kuwaiti studies summarised in a JEAS review table report **≈ 17 % power loss after 6 days of exposure** in one experiment, and **8.7–15.1 % losses with monthly cleaning, depending on season**. With $\bar{L} = rN/2$ and $N = 30$, 8.7–15.1 % average implies ≈ 0.6–1.0 %/day — much higher than global desert averages.`,
        },
        { kind: "sources", refs: ["rser-2020-shagaya-pv-testbed", "jeas-kuwait-soiling"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "No published Shagaya daily soiling rate",
          md: md`A Shagaya-specific daily soiling rate was **not found** in the research. The JEAS figures come from experimental setups that may not represent a utility tracker plant (tilt, height, module type). This lesson uses **0.3 %/day (base) and 0.6 %/day (dusty season)** as illustrative values. A bankable assessment must use on-site soiling-station data (≥ 12 months) — another reason to install a measurement station before tender.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why soiling is a contract issue, not just an O&M issue",
          md: md`Soiling loss is set by the cleaning frequency, which is a cost the IPP chooses. The IPP optimises against its tariff; MEWRE values each MWh at the avoided cost of liquid fuel and summer imports, which can be several times the PV tariff. So the IPP's optimal cleaning interval is longer than the system's optimum. If MEWRE wants more energy, it must write it in: minimum cleaning obligations, soiling-ratio thresholds, or performance guarantees that include soiling.`,
        },
      ],
    },
    {
      layer: "theory",
      title: "Cleaning methods, water and coatings",
      blocks: [
        {
          kind: "md",
          md: md`| Method | How | Water | Cost profile | Pros | Cons |
|---|---|---|---|---|---|
| **Manual wet** | Crews with brushes and demineralised water from bowsers | ≈ 0.5–2 L/m² per clean (indicative) | Low capex, high labour/opex | Removes cemented dust; flexible | Water logistics; slow on GW scale; labour HSE in heat; breakage risk |
| **Semi-automatic (vehicle-mounted)** | Tractor with rotating brush, with or without water | Low–moderate | Medium | Fast on fixed rows | Needs wide aisles; vehicle traffic damages ground/cables; not ideal for trackers |
| **Robotic dry** | Autonomous robot per row (or shuttle between rows), microfibre brush, nightly | None | High capex (robot per row), low opex | Frequent cleaning keeps loss ≈ 0.5–1.5 %; no water; night operation | Struggles with cemented dust after dew; brush abrasion of ARC; robot reliability and spares in heat/sand; warranty approval needed |
| **Robotic wet / hybrid** | Robot with water or periodic wet clean | Low | High | Handles crusts | Water logistics remain |

**Water scarcity.** Kuwait relies on desalinated water; groundwater is brackish. Cleaning water must be **demineralised** (low total dissolved solids — module OEMs typically specify limits on TDS/hardness, pH and chloride) to avoid residues and glass/ARC damage. For a 500 MWp plant (≈ 2.2 million m² of modules), 12 wet cleans a year at 1 L/m² is ≈ 27,000 m³/yr — trucked, stored and treated in the desert. That is why robotic dry cleaning is now the default in large Gulf plants, with periodic wet cleaning for crusts.

**Anti-soiling coatings (ASC).** Hydrophobic or hydrophilic nano-coatings that reduce adhesion or promote dew run-off. Field results are mixed: some show 20–50 % lower soiling rates initially; durability under sand abrasion and brushing is the issue (coatings can wear off in 1–3 years) and some reduce initial transmission. Ask for field data from a comparable desert site and confirm warranty compatibility.

**Tracker tricks.** Night-time stow at high tilt reduces dew and dust deposition on some sites; robots on trackers require all rows to be flat at cleaning time — a controller interface to specify.`,
        },
        { kind: "equation", formula: "pv-cleaning-optimum" },
        {
          kind: "widget",
          widget: "soiling",
          caption: "Change the soiling rate, cleaning cost and tariff: the optimal interval moves with the square root of cost/(value × rate).",
        },
      ],
    },
    {
      layer: "theory",
      title: "Heat, sand and wind: designing the rest of the plant",
      blocks: [
        {
          kind: "md",
          md: md`### High-temperature derating

| Equipment | Standard rating basis | Kuwait reality | What to specify |
|---|---|---|---|
| **Inverters** | Full power typically to 35–45 °C ambient, then linear derate (e.g. to ≈ 80–90 % at 50 °C), shutdown ≈ 55–60 °C (OEM-specific) | 45–50 °C afternoons; 53.9 °C record (Mitribah) | Derating curve at site altitude; output at 50 °C and 55 °C; derating included in PVsyst; shading/canopy for skids; cooling-filter maintenance |
| **Transformers** | IEC 60076-2: max ambient 40 °C, monthly average 30 °C, yearly average 20 °C | All three exceeded | Reduced temperature-rise design for actual ambient profile; oil and winding hot-spot limits at 50 °C+; solar radiation on tank |
| **Cables** | Ampacity tables at 30 °C air / 20 °C ground | Air 50 °C; hot sand with high thermal resistivity | Derating factors for air/ground temperature, grouping and soil resistivity (dry sand often 2.5–3 K·m/W) |
| **Switchgear / RMU** | 40 °C ambient | Enclosures in direct sun reach 60 °C+ inside | Ventilation/air-conditioning, sun shields |
| **Batteries in tracker controllers / UPS** | 25 °C life rating | Heat halves life per ~10 K | Chemistry and enclosure for heat |

The WMO-verified 53.9 °C at Mitribah (21 July 2016) is a credible upper bound for design. Plants also see **solar radiation load** on enclosures and transformer tanks, adding 10–15 K internal temperature without shading.

### Sand ingress (IEC 60529 IP code)

- First digit = solids: **5** = dust-protected (limited ingress, no harmful deposit); **6** = dust-tight.
- Second digit = water: 4 splashing, 5 jets, 6 powerful jets.
- String inverters and combiner boxes outdoors: **IP65/IP66**. Skid-housed central inverters: the cabinet's power section often IP54–IP65 with filtered forced air — **filters clog fast in dust storms**; their replacement interval is a key O&M item and a frequent cause of thermal derating and trips.
- Tracker motors, gearboxes, slew drives and controllers: IP65+ with sealed bearings; grease that does not trap sand; check actuator dust testing.
- Connectors: IP68 when mated — but unmated connectors left on the ground during construction fill with sand (lesson 7).

### Wind and tracker stow

The **shamal** is a northwesterly wind that blows over Kuwait mostly in summer (strongest typically June–July), often 10–15 m/s sustained with higher gusts, carrying dust; winter frontal storms also bring strong gusts. Single-axis trackers are long, flexible structures: above a threshold wind speed, the controller drives all rows to a **stow** position.

- **Stow angle**: some designs stow flat (0°), others at a steep angle (e.g. 30°+), because flat stow can trigger **aeroelastic instabilities** (torsional galloping, flutter) in long rows. The right stow angle comes from a **wind-tunnel study** (static and dynamic), not intuition.
- **Thresholds**: stow is triggered on a measured wind speed (e.g. a 3-s gust or 10-min mean above a set value, often around 15–20 m/s depending on design) from site anemometers, with hysteresis and minimum stow duration. Response time matters: a row needs several minutes to rotate to stow — the controller must act on forecasts/trends, not only on the current gust.
- **Failure modes**: anemometers clogged with dust or failed; communication loss (wireless) leaving rows unstowed; battery-backed controllers with dead batteries after summer heat; stow rows at night left in a cleaning-robot position.
- **Energy cost**: stowing costs energy; frequent shamal stow events in summer can cost 0.5–1 % annually on badly tuned systems.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Kuwait wind and dust climatology",
          md: md`The research brief records Shagaya's long-term mean wind speed (7.9 m/s at 80 m, from the wind-farm study) but no sourced extreme-wind, dust-storm frequency or shamal statistics for PV design. The descriptions above are general meteorology. Design wind speeds must come from the applicable building code/wind study and long-term station data for the site.`,
        },
      ],
    },
    // ============================================================ APPLIED
    {
      layer: "applied",
      title: "Soiling economics",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Optimal cleaning interval for a 500 MWp plant",
          given: md`500 MWp, unsoiled annual energy $E = 500{,}000\ \text{kWp} \times 2{,}100 = 1{,}050{,}000$ MWh/yr. Soiling rate $r = 0.3$ %/day. Full-plant manual wet clean $C$ = USD 150/MWp × 500 = USD 75,000 per cycle (illustrative). Value of energy $p$ = USD 15/MWh (illustrative IPP tariff).`,
          steps: [
            { md: md`**Optimum**: $N^* = \sqrt{\frac{2 \times 365 \times 75{,}000}{1{,}050{,}000 \times 15 \times 0.003}} = \sqrt{\frac{54{,}750{,}000}{47{,}250}} = \sqrt{1{,}158.7} = 34.0$ days.` },
            { md: md`**Average soiling loss at the optimum**: $\bar{L} = 0.003 \times 34/2 = 5.1$ %.` },
            { md: md`**Annual cleaning cost**: $(365/34) \times 75{,}000 =$ USD 0.80 m. **Annual soiling loss value**: $1{,}050{,}000 \times 15 \times 0.051 =$ USD 0.80 m. Equal at the optimum, as theory says.` },
            { md: md`**Sensitivity**: total cost at 14 days ≈ USD 2.29 m; at 30 days ≈ USD 1.62 m; at 34 days ≈ USD 1.61 m; at 60 days ≈ USD 1.87 m. The curve is flat near the optimum.` },
            { md: md`**MEWRE's view**: value the energy at an illustrative economic cost of USD 60/MWh (avoided liquid fuel) instead: $N^* = 34 \times \sqrt{15/60} = 17$ days, average loss 2.6 %. The system optimum cleans twice as often as the IPP optimum.` },
          ],
          result: md`IPP optimum ≈ monthly cleaning with ≈ 5 % average soiling loss — consistent with the Shagaya testbed's monthly cleaning. The system optimum is ≈ fortnightly. That gap is what an Employer's cleaning obligation or soiling-inclusive performance guarantee must address.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Shamal-season interval",
          given: md`Same plant and costs, but during the dusty season the soiling rate doubles to $r = 0.6$ %/day.`,
          steps: [
            {
              md: md`**Optimum**: $N^* = \sqrt{54{,}750{,}000/(1{,}050{,}000 \times 15 \times 0.006)} = \sqrt{579.4} = 24.1$ days.`,
              hidden: true,
              check: { prompt: "Optimal interval (days)", answer: 24.07, unit: "days", tolerance: { rel: 0.02 } },
            },
            {
              md: md`**Average loss**: $0.006 \times 24.1/2 = 7.2$ %.`,
              hidden: true,
              check: { prompt: "Average soiling loss (%)", answer: 7.22, unit: "%", tolerance: { abs: 0.1 } },
            },
            { md: md`**Comparison with a robotic dry fleet**: illustrative capex USD 12,000/MWp over 10 years (USD 0.6 m/yr) + opex USD 1,500/MWp/yr (USD 0.75 m/yr) with residual loss ≈ 1 % (USD 0.16 m/yr) → ≈ USD 1.51 m/yr, slightly cheaper than the manual optimum *and* saving ≈ 27,000 m³/yr of water.` },
          ],
          result: md`Doubling the soiling rate cuts the optimal interval by $\sqrt{2}$ (34 → 24 days) and raises the average loss to ≈ 7 %. A seasonal cleaning plan (or robots) beats a fixed annual schedule.`,
        },
        {
          kind: "question",
          question: {
            id: "m02-l05-p1",
            type: "numeric",
            prompt: md`Independent problem. A plant soils at 0.25 %/day and is cleaned every 14 days. What is the average soiling loss in %?`,
            answer: 1.75,
            tolerance: { abs: 0.05 },
            unit: "%",
            explanation: md`$\bar{L} = rN/2 = 0.25 \times 14/2 = 1.75$ %. Halving the interval halves the average loss — but doubles cleaning cost.`,
            concepts: ["m02.soiling"],
            difficulty: 1,
          },
        },
      ],
    },
    // ============================================================ FIELD
    {
      layer: "field",
      title: "Desert operations and contracts",
      blocks: [
        {
          kind: "md",
          md: md`**Monitoring soiling.** IEC 61724-1 Class A monitoring includes soiling measurement. Install ≥ 2 soiling stations per ~100 MW (paired cleaned/uncleaned reference modules or optical sensors) at representative positions (edges near dust sources and in the interior). The soiling ratio should drive the cleaning schedule dynamically: clean when the soiling ratio crosses a threshold, and immediately after dust storms.

**Contract tools for MEWRE.**
- PPA technical schedule: cleaning system type (e.g. robotic dry with periodic wet), minimum frequency, water source and quality, soiling monitoring.
- Performance KPI that includes soiling (e.g. PR without soiling correction, or energy guarantee) — or a soiling-ratio floor with remedies.
- Water: source (no groundwater abstraction without permits), storage, treatment, wastewater handling.
- HSE: heat-stress rules for manual crews (work-hour restrictions in summer midday), night-work lighting, robot safety.

**Desert design at tender stage.** Specify ambient design range (e.g. −5 to +55 °C; confirm with meteorological data), sand/dust ingress ratings, derating curves to be submitted and modelled, wind-tunnel study for trackers, anti-corrosion class for steel (coastal sites: C4–C5; inland desert: C3–C4 typical, but saline soils attack piles — ask for soil chemistry and coating/galvanising thickness).`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Robot fleet availability collapses in summer**: batteries and motors fail in heat; spare robots not stocked; rows go weeks uncleaned in the worst season.
- **Cemented dust after dew** that dry robots cannot remove; no wet-cleaning back-up planned or budgeted.
- **Abrasive cleaning destroys ARC**: transmission permanently down 1–2 %, warranty denied because method not approved.
- **Inverter filters clogged** after a dust storm → thermal derating and trips during peak; filter changes not in the O&M schedule.
- **Trackers fail to stow** during a gust front because the anemometer was coated in dust; torque tubes twisted, modules cracked.
- **Water from brackish wells** leaves scale and chloride on glass.`,
        },
        {
          kind: "checklist",
          title: "PM checks: desert design and cleaning",
          items: [
            "Site-measured soiling rate (≥ 12 months) used in PVsyst, with seasonal profile; not a default 2 %",
            "Cleaning method approved in module warranty; brush/water specification documented",
            "Cleaning frequency/trigger defined in O&M plan and linked to soiling-ratio monitoring",
            "Water source, quality (demineralised), quantity and logistics confirmed",
            "Inverter, transformer, cable and switchgear derating at 50–55 °C submitted and modelled",
            "IP ratings: outdoor electronics IP65/66; filter maintenance plan for forced-air equipment",
            "Tracker wind-tunnel report, stow angle and thresholds, anemometer redundancy and cleaning, battery/UPS heat rating",
            "Heat-stress HSE plan for summer works",
          ],
        },
        {
          kind: "ask",
          title: "Ask the IPP / O&M contractor",
          items: [
            "What soiling rate did you measure on site, and how does your cleaning schedule respond to dust storms?",
            "What is the robot fleet's guaranteed availability in July–August, and how many spares are stocked?",
            "What is your back-up method for cemented dust, and how much water does it need?",
            "Show the inverter derating curve and the PVsyst setting that models it.",
            "What wind speed and averaging period trigger stow, how long does the full plant take to stow, and what happens if communications are lost?",
          ],
        },
        { kind: "scenario", scenario: "m02-s5" },
        {
          kind: "feynman",
          prompt: "Explain to the MEWRE undersecretary why the ministry might want the IPP to clean modules more often than the IPP would choose on its own.",
          keyPoints: [
            "Soiling loss grows with time between cleanings (average ≈ rate × interval / 2)",
            "The IPP values energy at the PPA tariff, MEWRE at avoided fuel/import cost",
            "Optimal interval scales with the square root of cleaning cost over energy value",
            "Higher value → shorter interval; system optimum cleans more often",
            "Contract must specify cleaning obligations or soiling-inclusive KPIs",
          ],
        },
        { kind: "sources", refs: ["iec-61724-1", "iec-60529", "iec-62817", "wmo-mitribah-2019", "rser-2020-shagaya-pv-testbed"] },
      ],
    },
  ],
  quiz: [
    {
      id: "m02-l05-q1",
      type: "mcq",
      prompt: md`Why can dew make desert soiling worse rather than better?`,
      options: [
        "Dew increases module temperature",
        "Dew dissolves salts/clays in the dust, which then cement into a crust as it evaporates",
        "Dew attracts more sand by magnetism",
        "Dew damages the anti-reflective coating chemically",
      ],
      answer: 1,
      explanation: md`Light moisture without run-off produces cementation: the residue adheres strongly and resists wind and dry brushing. Heavy rain cleans; dew and drizzle cement.`,
      concepts: ["m02.soiling"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m02-l05-q2",
      type: "numeric",
      prompt: md`Cleaning cost USD 60,000 per cycle; annual energy 800,000 MWh; value USD 20/MWh; soiling rate 0.4 %/day. What is the optimal cleaning interval in days?`,
      answer: 26.2,
      tolerance: { rel: 0.02 },
      unit: "days",
      explanation: md`$N^* = \sqrt{2 \times 365 \times 60{,}000/(800{,}000 \times 20 \times 0.004)} = \sqrt{43{,}800{,}000/64{,}000} = \sqrt{684.4} = 26.2$ days. Average loss at the optimum $= 0.004 \times 26.2/2 = 5.2$ %; cleaning spend ≈ loss value ≈ USD 0.84 m/yr.`,
      concepts: ["m02.cleaning-strategy"],
      difficulty: 2,
    },
    {
      id: "m02-l05-q3",
      type: "mcq",
      prompt: md`A transformer specified to IEC 60076 default ambient conditions is installed at Shagaya. What is the main issue?`,
      options: [
        "None; IEC 60076 covers all climates",
        "The default basis (40 °C max, 30 °C monthly avg, 20 °C yearly avg) is exceeded, so the unit will run hotter than designed and age faster unless rated for the actual ambient",
        "It will be over-sized",
        "The insulation class is irrelevant to temperature",
      ],
      answer: 1,
      explanation: md`Insulation ageing roughly doubles per ~6 K above design hot-spot temperature. Kuwait's ambient exceeds all three IEC 60076 defaults, so specify reduced temperature rise or derated capacity for the real profile.`,
      concepts: ["m02.thermal-derating"],
      difficulty: 2,
    },
    {
      id: "m02-l05-q4",
      type: "multi",
      prompt: md`Which are valid reasons robotic dry cleaning dominates new Gulf PV plants? Select all.`,
      options: [
        "No water consumption in a water-scarce country",
        "High cleaning frequency keeps average soiling loss low",
        "It removes cemented dust better than wet cleaning",
        "Low labour exposure to heat stress",
      ],
      answer: [0, 1, 3],
      explanation: md`Dry robots struggle with cemented crusts — that is their main weakness, needing periodic wet cleaning as back-up.`,
      concepts: ["m02.cleaning-strategy"],
      difficulty: 1,
    },
    {
      id: "m02-l05-q5",
      type: "decision",
      prompt: md`You are the MEWRE PM. A shamal is forecast with gusts above the tracker stow threshold within 3 hours. The IPP's SCADA shows 8 % of tracker rows with communication faults. What do you ask the IPP to do?`,
      options: [
        { text: "Nothing — stow is the IPP's responsibility.", score: 0.2, feedback: "True contractually, but as offtaker and grid stakeholder you should ensure the risk is managed; a structural failure affects availability for months." },
        { text: "Ask the IPP to confirm its storm procedure: dispatch technicians to manually stow the uncommunicative rows before the gust front, verify anemometer health, and report the stow status and any damage after the event.", score: 1, feedback: "Correct: targeted, procedural, and creates a record." },
        { text: "Order the whole plant disconnected from the grid.", score: 0.1, feedback: "Disconnection does not stow trackers and costs energy; it is not your call under the PPA." },
      ],
      explanation: md`Wind stow failures are a leading cause of tracker damage. Communication faults before a storm must be treated as an urgent field action.`,
      concepts: ["m02.wind-stow"],
      difficulty: 2,
    },
    {
      id: "m02-l05-q6",
      type: "mcq",
      prompt: md`An IP code of IP65 on a string inverter means:`,
      options: [
        "Dust-protected, protected against splashing",
        "Dust-tight, protected against water jets",
        "Dust-tight, protected against immersion",
        "Protected against objects > 1 mm, jets",
      ],
      answer: 1,
      explanation: md`First digit 6 = dust-tight; second digit 5 = water jets. IP54 would be dust-protected (limited ingress) and splash-proof — weaker for desert sand.`,
      concepts: ["m02.thermal-derating"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "m02-l05-f1", front: "Average soiling loss with linear accumulation", back: md`$\bar{L} = rN/2$`, concepts: ["m02.soiling"] },
    { id: "m02-l05-f2", front: "Optimal cleaning interval", back: md`$N^* = \sqrt{730\,C/(E\,p\,r)}$; at the optimum cleaning cost = soiling loss value.`, concepts: ["m02.cleaning-strategy"] },
    { id: "m02-l05-f3", front: "Shagaya cleaning practice reported for the PV testbed", back: "Monthly water cleaning (substantial soiling).", concepts: ["m02.soiling"] },
    { id: "m02-l05-f4", front: "Soiling ratio", back: "Actual power ÷ power if clean (IEC 61724-1), measured by paired clean/soiled references or optical sensors.", concepts: ["m02.soiling"] },
    { id: "m02-l05-f5", front: "IEC 60076 default ambient for transformers", back: "Max 40 °C, monthly average 30 °C, yearly average 20 °C — all exceeded in Kuwait.", concepts: ["m02.thermal-derating"] },
    { id: "m02-l05-f6", front: "IP6X vs IP5X", back: "6 = dust-tight; 5 = dust-protected (limited ingress).", concepts: ["m02.thermal-derating"] },
    { id: "m02-l05-f7", front: "Why trackers may stow at a steep angle rather than flat", back: "Flat stow can trigger aeroelastic instability (torsional galloping) in long rows; stow angle comes from wind-tunnel tests.", concepts: ["m02.wind-stow"] },
    { id: "m02-l05-f8", front: "Shamal", back: "Northwesterly wind over Kuwait/Gulf, strongest in summer, often carrying dust; drives soiling spikes and tracker stow events.", concepts: ["m02.wind-stow", "m02.soiling"] },
  ],
  scenarios: [
    {
      id: "m02-s5",
      title: "After the dust storm",
      dayInLife: true,
      context: md`It is late June. A severe dust storm passed over Shagaya yesterday. Your morning dashboard shows the 500 MW IPP's output at 11:00 is 18 % below the clear-sky expectation despite a blue sky today. MEWRE's control centre expects a 17.5 GW peak this afternoon.`,
      start: "a",
      concepts: ["m02.soiling", "m02.cleaning-strategy", "m02.wind-stow"],
      nodes: {
        a: {
          md: md`You call the IPP's plant manager. What do you ask first?`,
          choices: [
            { text: "Ask for the soiling-station readings, tracker stow/position status, inverter alarms (filters/thermal), and their cleaning response plan with timing.", next: "b", score: 10, feedback: "You separate the possible causes: soiling, trackers stuck in stow, inverter derating." },
            { text: "Ask them to clean the whole plant today.", next: "b", score: 5, feedback: "Possibly needed, but you have not yet established whether the loss is soiling, trackers or inverters." },
            { text: "Wait for the monthly report.", next: "c", score: 0, feedback: "Peak-day energy matters now, and post-storm problems compound." },
          ],
        },
        b: {
          md: md`Soiling ratio is 0.88 (12 % loss). 4 % of trackers are stuck in stow after a controller fault. Three inverters show filter-clog thermal derating. The robot fleet can clean the plant in 4 nights; a wet crew is needed for crusted rows. What do you prioritise in your note to the IPP and the Director?`,
          choices: [
            { text: "Inverter filters and stuck trackers today (hours to fix, immediate MW), robots tonight on all rows, wet crew targeted at crusted blocks; request a post-event report with energy lost and root causes.", next: "d", score: 10, feedback: "Fastest MW first, then the bulk soiling, with a record of lost energy for PPA purposes." },
            { text: "Wet-clean everything first; leave trackers and inverters for next week.", next: "d", score: 4, feedback: "Wet cleaning 500 MW takes weeks; the quick fixes give MW today." },
          ],
        },
        c: {
          md: md`The monthly report shows June energy 7 % below P50, attributed to "weather". Nobody can separate soiling from equipment issues after the fact. What lesson do you record?`,
          choices: [
            { text: "Post-storm response must be a defined procedure with KPIs and reporting, written into the O&M obligations.", score: 7, feedback: "Right lesson, learnt the expensive way." },
          ],
        },
        d: {
          md: md`In the post-event review, the IPP proposes declaring the storm a force majeure event for availability purposes. How do you respond?`,
          choices: [
            { text: "Check the PPA definitions: dust storms are a foreseeable site condition in Kuwait; the soiling/cleaning loss and stuck trackers are normally the IPP's risk unless the PPA says otherwise. Ask legal/contract team to review before replying.", score: 10, feedback: "Correct instinct: foreseeable climate events are rarely force majeure, but the contract wording governs." },
            { text: "Accept — storms are acts of God.", score: 2, feedback: "Dust storms are a known Kuwaiti condition; accepting FM sets a costly precedent." },
          ],
        },
      },
    },
  ],
};

export default lesson;
