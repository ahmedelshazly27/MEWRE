import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m04-l04",
  title: "Wind Project Delivery and O&M",
  summary:
    "From development to 25 years of operation: contracting structures, blade logistics to an inland desert site, foundations and cranes, installation weather windows in shamal season, commissioning, availability guarantees and O&M contracts.",
  minutes: 75,
  objectives: [
    "You can map the development and delivery stages of a wind project and the contracting options (TSA + BoP vs EPC)",
    "You can plan logistics for oversized components from port to Shagaya and identify constraints",
    "You can estimate an installation schedule with crane weather windows",
    "You can define commissioning tests and the take-over sequence",
    "You can compute time- and energy-based availability and the resulting liquidated damages, and compare O&M contract models",
  ],
  concepts: [
    {
      id: "m04.wind-delivery-structure",
      name: "Wind delivery and contracting structure",
      description: "Development stages and contract splits: turbine supply agreement + balance-of-plant, or full EPC; FIDIC adaptations.",
      competency: "delivery",
      related: ["m04.wind-om-contracts", "m09.contracting-strategy", "m09.fidic-suite"],
    },
    {
      id: "m04.wind-logistics",
      name: "Wind logistics and installation",
      description: "Port handling, oversized transport routes, crane pads, foundations, main crane selection and lifting sequence.",
      competency: "delivery",
      related: ["m04.weather-windows", "m07.long-lead-items", "m07.construction-sequencing"],
    },
    {
      id: "m04.weather-windows",
      name: "Installation weather windows",
      description: "Wind-speed limits for crane lifts (blades, rotor, nacelle), shamal season, heat-stress working restrictions.",
      competency: "delivery",
      related: ["m08.heat-stress"],
    },
    {
      id: "m04.wind-commissioning",
      name: "Wind commissioning and take-over",
      description: "Mechanical completion, energisation, reliability run, grid compliance tests, power-curve test, take-over certificates.",
      competency: "delivery",
      related: ["m07.commissioning-sequence", "m07.grid-compliance-tests", "m07.taking-over"],
    },
    {
      id: "m04.availability-guarantee",
      name: "Availability guarantees",
      description: "Time- and energy-based availability, exclusions, liquidated damages and bonuses in service agreements.",
      competency: "operations",
      related: ["m04.wind-om-contracts", "m09.availability-guarantee", "m12.availability"],
    },
    {
      id: "m04.wind-om-contracts",
      name: "Wind O&M contracts",
      description: "Warranty-period service, full-service agreements, self-perform or independent service providers; scope, spares and KPIs.",
      competency: "operations",
      related: ["m09.om-scope"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "How a wind farm gets built and kept running",
      blocks: [
        {
          kind: "md",
          md: md`## Lifecycle at a glance

| Stage | Key activities | Typical duration |
|---|---|---|
| Site screening & measurement | Global Wind Atlas screening, land, grid, constraints; met mast/LiDAR campaign | 12–24 months |
| Development | EYA, environmental & social assessment, aviation/defence clearance, grid connection study, layout, permits | 12–24 months (parallel) |
| Procurement | Turbine supply (TSA) and BoP tenders or EPC; for an IPP, KAPP RFQ/RFP and PPA | 9–18 months |
| Construction | Roads, crane pads, foundations, cabling, substation; turbine delivery and erection | 12–18 months for 100–200 MW |
| Commissioning | Energisation, reliability run, grid tests, take-over | 2–4 months (rolling) |
| Operation | Warranty period (2–5 yr), then long-term O&M; mid-life refurbishments (blades, gearboxes) | 25–30 years |

## Contracting structures

- **Multi-contract (most common onshore)**: a **Turbine Supply Agreement (TSA)** with the OEM (supply, transport, installation, commissioning — sometimes "supply & install") + one or more **Balance-of-Plant (BoP)** contracts (civil: roads, foundations, crane pads; electrical: collector cables, substation) + a long-term **Service Agreement** with the OEM. The owner manages the interfaces — cheaper, but interface risk (e.g. foundation anchor cage delivered by the OEM, cast by the BoP contractor) sits with the owner.
- **Full EPC** (one wrap): an EPC contractor takes everything including turbines, usually on a FIDIC Silver Book-style basis. Simpler for the owner, higher price for the wrap risk; preferred by lenders in less mature markets.
- **IPP**: for a KAPP-procured wind IPP the developer chooses the structure; MEWRE's interest is in PPA performance, grid interface and the long-term O&M arrangements.

Shagaya's 10 MW farm was delivered by **Elecnor** under a contract reported at about EUR 22.4 m that included building and maintaining the farm.`,
        },
        { kind: "sources", refs: ["m04-elecnor-award", "m04-gdn-commissioning", "m04-fidic"] },
        {
          kind: "md",
          md: md`## Logistics: getting 80 m blades into the desert

A modern onshore turbine arrives as ~10–12 oversized loads: three blades (70–85 m long, 20–30 t each), hub, nacelle (60–100 t+), drivetrain sometimes separate, and tower sections (4–5 sections, 4.5 m+ diameter, up to 80 t). For Kuwait:

- **Port**: Shuwaikh or Shuaiba port handling — laydown area, heavy-lift cranes, customs clearance (check exemptions in the IPP terms).
- **Route survey**: turning radii at roundabouts and junctions, bridges and overpasses (height and load ratings), overhead lines and signage to be removed temporarily, traffic police escort and night-time moves, Ministry of Public Works permits. Blades need specialised extendable or blade-lifter trailers.
- **Distance**: Shagaya is ~100 km inland of Kuwait City; desert access roads must be built or upgraded to take axle loads and blade sweep paths.
- **Site laydown and storage**: components stored on site must be protected from sand (sealed nacelles, blade covers) and heat.

## Foundations and cranes

- **Foundations**: gravity spread footings (~20–25 m diameter, 600–1,000 m³ concrete, 60–100 t rebar) with an anchor cage. Concrete placement in 45 °C heat needs night pours, chilled water/ice, retarders and curing control to prevent thermal cracking. Sabkha (saline soils) and gypsum require sulphate-resistant concrete and geotechnical care.
- **Main crane**: crawler cranes of 600–1,000+ t capacity for hub heights of 100–160 m, assembled on site (mobilisation itself takes a week and many trucks). Crane pads must carry high ground pressures.

## Weather windows

Lifts have **wind-speed limits** set by the OEM and crane manufacturer, measured at hub height:

| Lift | Typical limit (10-min mean / gust) |
|---|---|
| Tower sections | ~12–15 m/s |
| Nacelle | ~10–12 m/s |
| Single blade (blade-by-blade) | ~8–12 m/s |
| Full rotor (star lift) | ~8–10 m/s |

Kuwait's **shamal** (strong NW winds, typically peaking in early summer) can stop blade and rotor lifts for days and brings dust that reduces visibility. Summer heat adds labour restrictions: Kuwait's midday outdoor work ban in summer months limits working hours (verify current dates and hours with the Public Authority for Manpower). The best erection season is usually **October–April**; a construction schedule that puts blade lifts in June–July must carry generous weather contingency.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Check local rules",
          md: md`The summer midday outdoor work ban and its exact hours/months, port heavy-lift capacities and road-permit procedures are not covered in the research brief. Confirm with the Public Authority for Manpower, the Ports Authority and the Ministry of Public Works before baselining a schedule.`,
        },
        {
          kind: "md",
          md: md`## Commissioning and take-over

Typical sequence per turbine and for the farm:

1. **Mechanical completion** — erection complete, torque checks, punch list.
2. **Energisation** of collector circuits and turbine transformer (after substation energisation by MEWRE/EPC).
3. **Turbine commissioning** — safety system tests (emergency stop, overspeed), pitch/yaw tests, converter tests, first rotation and grid synchronisation.
4. **Reliability run** — commonly 240 h (or 120–500 h) of operation with minimal faults.
5. **Grid compliance tests** — reactive power capability, fault ride-through (via simulation and site tests), power quality, frequency response — per MEWRE grid code.
6. **Take-over certificate** per turbine (and farm), starting the warranty/defects notification period and the availability guarantee.
7. **Power-curve verification** (IEC 61400-12-1), often within the first 1–2 years.

## Availability

Availability is the core KPI of every wind service agreement:`,
        },
        { kind: "equation", formula: "wind-availability-time" },
        { kind: "equation", formula: "wind-availability-energy" },
        {
          kind: "md",
          md: md`Example (time-based): a turbine down for 350 h of 8,760 h attributable to the contractor has $A_t = (8{,}760 - 350)/8{,}760 = 96.0$ %.

**Exclusions** — what does not count against the contractor — are where disputes live: grid outages (MEWRE side), owner-requested stops, force majeure, scheduled maintenance up to an allowance (e.g. 60–80 h/turbine/yr), ambient conditions outside the design envelope (e.g. above the shutdown temperature — significant in Kuwait!), lack of wind, and access restrictions (sandstorms).

Typical guarantees: **95–97 % time-based** (or **energy-based**) in years 1–2 rising to 97–98 %, with **LDs** for shortfall (energy lost × tariff or a fixed rate) capped at a share of the annual service fee, and sometimes **bonuses** above target.

## O&M contract models

| Model | Description | Pros | Cons |
|---|---|---|---|
| Warranty-period service | OEM services during 2–5 yr warranty | Aligned with warranty | Short; owner exposed afterwards |
| Full-service agreement (FSA) | OEM covers scheduled + unscheduled maintenance, major components, availability guarantee; 10–20+ yr | Risk transfer, bankable | Expensive; OEM lock-in; data access disputes |
| Basic / partial service | OEM labour, owner pays parts or major components | Cheaper | Owner carries component risk |
| Independent service provider (ISP) | Third party after warranty | Competition, flexibility | Access to OEM parts, software and data |
| Self-perform | Owner's own technicians (with OEM support) | Control, local capability (Kuwaitisation) | Needs scale and skills |

For MEWRE, a key long-term question is building **national O&M capability**: the Shagaya pilot was operated by contractors, and future wind IPPs will be operated by the IPP's service providers. Contract clauses on training Kuwaiti technicians, SCADA data access and spare-parts holdings in-country matter more in Kuwait than in Europe, because the nearest OEM warehouse may be in another country.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why energy-based availability is better for the owner",
          md: md`Time-based availability treats a down hour at 3 m/s the same as one at 14 m/s. Contractors therefore schedule work by convenience. Energy-based availability values downtime by the energy it costs, so the contractor schedules maintenance in calm periods and prioritises repairs during shamal season — exactly aligning with MEWRE's interest in summer energy.`,
        },
        { kind: "widget", widget: "lifecycle", caption: "Walk through the stages and gates — the wind-specific items are the measurement campaign, aviation clearance, logistics route survey and weather-window planning." },
      ],
    },
    {
      layer: "applied",
      title: "Schedules, availability and LDs",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Availability liquidated damages",
          given: md`A 10 × 4.5 MW farm, expected AEP 157,680 MWh (CF 40 %). The service agreement guarantees 97 % energy-based availability; LD rate = energy shortfall × USD 30/MWh (the PPA tariff, illustrative). Measured availability for the year: 95.5 %.`,
          steps: [
            { md: md`**Shortfall:** $97.0 - 95.5 = 1.5$ percentage points.` },
            { md: md`**Energy shortfall** (screening approximation on expected AEP): $157{,}680 \times 0.015 = 2{,}365$ MWh.` },
            { md: md`**LD:** $2{,}365 \times 30 \approx$ USD 70,950 ≈ USD 71,000.` },
            { md: md`**Cap check:** if the annual service fee is USD 2.0 m and LDs are capped at 50 % of the fee, the cap (USD 1.0 m) is not reached.` },
          ],
          result: md`About **USD 71,000** of LDs for the year. Note how small this is relative to the fee — LDs compensate lost revenue but do not punish. A PM must also check exclusions: if 0.8 pp of the downtime was due to a MEWRE grid outage, the shortfall would be only 0.7 pp.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Erection schedule with weather downtime",
          given: md`20 turbines; each needs 3 working days of main-crane time (tower, nacelle, rotor) plus 1 working day to move the crane between positions (19 moves). Historical data show 65 % of days in the planned window are workable for lifts.`,
          steps: [
            { md: md`Crane working days: $20 \times 3 + 19 \times 1$.` },
            {
              md: md`$= 60 + 19 = 79$ working days.`,
              hidden: true,
              check: { prompt: "Crane working days", answer: 79, unit: "days", tolerance: { abs: 0.5 } },
            },
            {
              md: md`Calendar days: $79 / 0.65 = 121.5$ ≈ 122 days (~4 months).`,
              hidden: true,
              check: { prompt: "Calendar days for erection", answer: 121.5, unit: "days", tolerance: { rel: 0.01 } },
            },
            { md: md`If the window shifts into peak shamal season and workability drops to 45 %, the duration becomes $79/0.45 = 176$ days — +54 days, with main-crane standby cost every day.` },
          ],
          result: md`About **4 months** of erection in a good season. Schedule erection for October–April where possible and carry weather contingency based on site hub-height wind statistics, not national averages.`,
        },
        {
          kind: "question",
          question: {
            id: "m04-l04-p1",
            type: "numeric",
            prompt: md`In a year a wind farm produced 52,000 MWh. Using measured wind speeds and the warranted power curve, the energy lost to contractor-attributable downtime is 1,850 MWh. What is the energy-based availability (as a fraction)?`,
            answer: 0.9656,
            tolerance: { abs: 0.001 },
            explanation: md`$A_E = 52{,}000/(52{,}000 + 1{,}850) = 0.9656$ → 96.6 %. Against a 97 % guarantee there is a small shortfall (~0.4 pp).`,
            concepts: ["m04.availability-guarantee"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Managing delivery and O&M as MEWRE",
      blocks: [
        {
          kind: "md",
          md: md`## The PM's interfaces

- **KAPP** (for IPPs) — procurement, PPA; MEWRE input on technical specifications, grid and O&M requirements.
- **EPC/OEM/BoP contractors** — schedule, quality, HSE, interface management (anchor cages, cable terminations, SCADA).
- **MEWRE transmission** — substation and 132/400 kV connection dates; energisation permits; grid code tests.
- **Ministry of Public Works, Interior (traffic), Ports Authority** — transport permits and escorts.
- **Civil aviation and defence** — obstacle lighting, radar clearance.
- **Owner's Engineer** — design review, factory and site inspections (FAT/SAT), witness of commissioning tests, availability verification.
- **KISR** — data and lessons from the Shagaya pilot.

## Documents you will live with

Construction programme (P6) with lift-weather contingency; transport management plan; lifting plans and method statements; ITPs (inspection and test plans); commissioning procedures and test reports; take-over certificates; service agreement with availability calculation method; monthly O&M reports (availability, production, alarms, work orders); SCADA data access protocol.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- Route survey done late → a bridge or roundabout blocks blade transport; months of delay.
- Foundation concrete poured in midday heat → thermal cracking, rejected foundations.
- Blade lifts scheduled in shamal season with no contingency; crane standby costs balloon.
- Substation/grid connection (MEWRE side) late → turbines mechanically complete but not energised; who pays deemed energy?
- Availability definitions vague on high-temperature shutdowns and sandstorm access restrictions → disputes every summer.
- No SCADA data access for the owner → cannot verify availability claims.`,
        },
        {
          kind: "checklist",
          title: "PM checklist — wind delivery and O&M",
          items: [
            "Route survey from port to site completed before contract award; permits plan agreed",
            "Hot-weather concreting plan (night pours, cooling, curing) approved",
            "Erection window and weather contingency based on hub-height wind statistics",
            "Interface matrix TSA/BoP/MEWRE grid with dates and responsibilities",
            "Commissioning test list incl. grid code tests and 240 h reliability run",
            "Availability: definition (time vs energy), exclusions (esp. temperature, sandstorms, grid), LDs, caps, bonuses",
            "Owner access to raw SCADA data (10-min) and right to audit availability calculations",
            "Spares stock in Kuwait for critical components; lead times for major components",
            "Training and Kuwaitisation obligations with measurable milestones",
            "End-of-warranty inspection campaign (blades, gearboxes, bearings) before the warranty expires",
          ],
        },
        {
          kind: "ask",
          title: "Ask the contractor / OEM",
          items: [
            "What hub-height wind limits apply to each lift, and how did you derive your weather contingency?",
            "Which components will be stored on site, for how long, and how are they protected from sand?",
            "How is availability calculated when the turbine shuts down above its design temperature?",
            "Which major components do you hold in-region, and what are the lead times for a gearbox, main bearing or blade?",
            "How many Kuwaiti technicians will you train, to what certification level (e.g. GWO), and by when?",
          ],
        },
        { kind: "scenario", scenario: "m04-s3" },
        {
          kind: "feynman",
          prompt: "Explain to a new MEWRE engineer why the availability definition in the O&M contract matters more than the headline percentage.",
          keyPoints: [
            "Availability can be time-based or energy-based; energy-based aligns incentives with revenue",
            "Exclusions decide which downtime counts — grid outages, extreme temperature, sandstorms, scheduled maintenance",
            "A 97 % guarantee with broad exclusions can be weaker than 95 % with narrow ones",
            "The owner needs SCADA data access to verify the calculation",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m04-l04-q1",
      type: "mcq",
      prompt: "In a multi-contract wind project (TSA + BoP), who typically carries the interface risk between the OEM's anchor cage and the BoP contractor's foundation?",
      options: ["The OEM", "The BoP contractor", "The owner/employer", "The lender"],
      answer: 2,
      explanation: md`With separate contracts the owner coordinates interfaces and bears the risk of mismatches, unless an interface agreement allocates it. That is the price of avoiding an EPC wrap.`,
      concepts: ["m04.wind-delivery-structure"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "m04-l04-q2",
      type: "numeric",
      prompt: md`A turbine had 420 hours of contractor-attributable downtime in a year (8,760 h, no exclusions). What is its time-based availability in %?`,
      answer: 95.21,
      tolerance: { abs: 0.05 },
      unit: "%",
      explanation: md`$(8{,}760 - 420)/8{,}760 = 0.9521$ → 95.2 %.`,
      concepts: ["m04.availability-guarantee"],
      difficulty: 1,
    },
    {
      id: "m04-l04-q3",
      type: "multi",
      prompt: "Which items belong in a transport route survey from port to Shagaya? (select all)",
      options: ["Roundabout and junction turning radii", "Bridge load and clearance ratings", "Overhead lines and signage to be removed", "Turbine power curve", "Escort and night-move permits"],
      answer: [0, 1, 2, 4],
      explanation: md`The power curve is irrelevant to transport. Geometry, structures, obstructions and permits are the core of a route survey.`,
      concepts: ["m04.wind-logistics"],
      difficulty: 1,
    },
    {
      id: "m04-l04-q4",
      type: "order",
      prompt: "Order the commissioning and take-over steps.",
      items: ["Mechanical completion and punch list", "Energisation of collector circuit", "Turbine safety and function tests, synchronisation", "Reliability run (e.g. 240 h)", "Grid compliance tests", "Take-over certificate"],
      explanation: md`Build, energise, test functions, prove reliability, demonstrate grid compliance, then take over — which starts warranty and availability guarantees.`,
      concepts: ["m04.wind-commissioning"],
      difficulty: 2,
    },
    {
      id: "m04-l04-q5",
      type: "mcq",
      prompt: "Why is energy-based availability generally preferred by owners?",
      options: [
        "It is easier to calculate",
        "It values downtime by the energy lost, encouraging maintenance in calm periods",
        "It always gives higher percentages",
        "It excludes grid outages automatically",
      ],
      answer: 1,
      explanation: md`It aligns the service provider's incentives with the owner's revenue — downtime in strong winds costs more.`,
      concepts: ["m04.availability-guarantee"],
      difficulty: 1,
    },
    {
      id: "m04-l04-q6",
      type: "decision",
      prompt: "The OEM's full-service agreement draft excludes from availability 'all periods when ambient temperature exceeds 40 °C'. What do you do?",
      options: [
        { text: "Accept — heat is force majeure", score: 0, feedback: "In Kuwait >40 °C occurs for hundreds of hours per year; it is a design condition, not force majeure." },
        { text: "Limit the exclusion to temperatures above the turbine's specified operating limit (e.g. >50 °C) and require derating per the agreed curve to count as available only within spec", score: 1, feedback: "Correct — exclusions must match the specified design envelope for the site." },
        { text: "Delete all temperature exclusions", score: 0.4, feedback: "Unreasonable beyond the design envelope; the OEM will price it heavily or refuse." },
      ],
      explanation: md`Exclusions should mirror the contractual design conditions. A 40 °C threshold in Kuwait would strip a large part of the summer from the guarantee.`,
      concepts: ["m04.availability-guarantee", "m04.wind-om-contracts"],
      difficulty: 2,
    },
    {
      id: "m04-l04-q7",
      type: "mcq",
      prompt: "The best season for blade and rotor lifts in Kuwait is generally:",
      options: ["June–July", "October–April", "Only during shamal", "Any month equally"],
      answer: 1,
      explanation: md`Cooler months avoid the early-summer shamal peak and summer heat-stress working restrictions.`,
      concepts: ["m04.weather-windows"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "m04-l04-f1", front: "TSA", back: "Turbine Supply Agreement — OEM supplies (often installs and commissions) turbines.", concepts: ["m04.wind-delivery-structure"] },
    { id: "m04-l04-f2", front: "BoP", back: "Balance of plant — roads, crane pads, foundations, cables, substation.", concepts: ["m04.wind-delivery-structure"] },
    { id: "m04-l04-f3", front: "Typical blade lift wind limit", back: "≈8–12 m/s at hub height (OEM/crane specific).", concepts: ["m04.weather-windows"] },
    { id: "m04-l04-f4", front: "Time-based availability", back: md`$A_t = (T - T_{unavail})/T$`, concepts: ["m04.availability-guarantee"] },
    { id: "m04-l04-f5", front: "Energy-based availability", back: md`$A_E = E_{actual}/(E_{actual}+E_{lost})$`, concepts: ["m04.availability-guarantee"] },
    { id: "m04-l04-f6", front: "Typical availability guarantee", back: "95–97 % (rising to 97–98 %), LDs capped at a share of the service fee.", concepts: ["m04.availability-guarantee"] },
    { id: "m04-l04-f7", front: "Typical reliability run before take-over", back: "≈240 h of operation with minimal faults.", concepts: ["m04.wind-commissioning"] },
    { id: "m04-l04-f8", front: "Shagaya wind contractor", back: "Elecnor, ~EUR 22.4 m, build and maintain; commissioned May 2017.", concepts: ["m04.wind-delivery-structure"] },
    { id: "m04-l04-f9", front: "Full-service agreement (FSA)", back: "OEM covers scheduled + unscheduled maintenance and major components, with availability guarantee; 10–20+ yr.", concepts: ["m04.wind-om-contracts"] },
  ],
  scenarios: [
    {
      id: "m04-s3",
      title: "Blade lift on a gusty morning",
      dayInLife: true,
      context: md`It is late May. You are MEWRE's PM (Employer's representative) on a wind project. Erection is 3 weeks behind because of shamal days; the crane costs USD 25,000/day on standby. At 06:00 hub-height wind is 9 m/s, gusting 13 m/s, forecast rising. The lift limit for a single blade is 10 m/s mean / 13 m/s gust. The EPC site manager wants to lift now "while it's still OK".`,
      start: "a",
      nodes: {
        a: {
          md: md`The EPC asks for your informal OK to proceed.`,
          choices: [
            { text: "Give the OK — the schedule is critical", next: "b", score: 1, feedback: "Lift decisions belong to the lift supervisor within the approved lifting plan; pressuring a marginal lift is an HSE failure." },
            { text: "State that the decision rests with the appointed lift supervisor per the approved lift plan and limits; you expect strict compliance, and ask for the recovery plan separately", next: "c", score: 10, feedback: "Correct: HSE first, roles respected, and schedule addressed through a plan, not risk-taking." },
            { text: "Order a stop to all lifting for the week", next: "c", score: 4, feedback: "Overreach: the Employer shouldn't direct means and methods; the limits already define safe lifting." },
          ],
        },
        b: {
          md: md`During the lift a gust spins the blade; tag-line crew lose control and the blade strikes the tower. Nobody is hurt, but the blade is scrapped (lead time 4 months).`,
          choices: [
            { text: "Lead a formal incident investigation, suspend lifts pending review, and review your own role in the decision", score: 5, feedback: "The right response — though the incident was avoidable." },
            { text: "Treat it as the EPC's problem only", score: 1, feedback: "Your informal OK is part of the causal chain; credibility and liability are now at stake." },
          ],
        },
        c: {
          md: md`The lift supervisor stands down. The EPC submits a recovery plan: a second crane for tower sections, night lifts when winds drop, and re-sequencing.`,
          choices: [
            { text: "Review the plan with the OE: check cost responsibility (weather risk allocation in the contract), night-lift safety, and update the P6 programme and the grid energisation interface", score: 10, feedback: "Excellent: contractual, technical and interface checks in one go." },
            { text: "Approve it immediately", score: 5, feedback: "Probably fine, but you need to know who pays for the second crane and whether night lifts are safe." },
          ],
        },
      },
      concepts: ["m04.weather-windows", "m04.wind-logistics"],
    },
  ],
};

export default lesson;
