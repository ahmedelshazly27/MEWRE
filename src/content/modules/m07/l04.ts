import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m07-l04",
  title: "Procurement & Construction Management",
  summary:
    "Packaging and long-lead items (HV transformers 18–24+ months), logistics through Kuwaiti ports and customs, construction sequencing and realistic productivity for a 1 GW PV site (piling, trackers, modules), site organisation and Employer-side supervision.",
  minutes: 80,
  objectives: [
    "You can split a PV+BESS project into procurement packages and identify the long-lead items that set the critical path",
    "You can estimate quantities (piles, modules, containers) and the crews/rigs needed from realistic productivity rates",
    "You can lay out the construction sequence of a GW PV block and the dependencies between trades",
    "You can explain logistics and customs risks for imported equipment into Kuwait",
    "You can organise Employer-side supervision: ITPs, hold/witness points, NCRs and progress reporting",
  ],
  concepts: [
    {
      id: "m07.procurement-packaging",
      name: "Procurement packaging",
      description:
        "Dividing scope into supply and construction packages (modules, trackers, inverters, transformers, BESS, civil, electrical) to balance interface risk, competition and control.",
      competency: "procurement",
      related: ["m07.long-lead-items"],
    },
    {
      id: "m07.long-lead-items",
      name: "Long-lead items",
      description:
        "Equipment whose manufacturing and delivery time exceeds or approaches the construction window (HV transformers, GIS, BESS, inverters), and so must be ordered early to protect the critical path.",
      competency: "controls",
    },
    {
      id: "m07.construction-productivity",
      name: "Construction productivity planning",
      description:
        "Using quantity, productivity per crew/rig and working window to size resources and test schedule realism.",
      competency: "controls",
      related: ["m07.construction-sequencing"],
    },
    {
      id: "m07.construction-sequencing",
      name: "Construction sequencing",
      description:
        "The order and overlap of trades on a PV block — survey, civil, piling, tracker, modules, DC/AC cabling, inverter stations, MV, substation — and the hand-offs between them.",
      competency: "delivery",
    },
    {
      id: "m07.site-supervision",
      name: "Site supervision and quality control",
      description:
        "Employer/OE surveillance using inspection and test plans with hold and witness points, non-conformance reports and daily/weekly progress reporting.",
      competency: "risk",
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Packages, long leads and the logic of a PV build",
      blocks: [
        {
          kind: "md",
          md: md`### Procurement packages

Even under a single EPC contract (or an IPP with one EPC), the EPC buys and subcontracts in packages. The Employer must understand them because each package has its own lead time, factory tests, shipment risk and interfaces.

| Package | Typical lead time (order → site) | Notes |
|---|---|---|
| **HV power transformers (400/132/33 kV, 200–500 MVA)** | **18–24+ months** (post-2022 market) | Global shortage; factory slots booked years ahead; FAT and heavy transport critical |
| GIS / AIS HV switchgear | 12–18 months | Coordinate with transmission owner standards |
| BESS (cells, racks, containers, PCS) | 6–12 months | Cell supply, UL 9540A / fire test data, HVAC sizing for 50 °C |
| Central/string inverters + MV skids | 6–9 months | Derating at 50 °C, firmware/grid code version |
| Trackers | 4–6 months | Steel price exposure; pile sections per soil zone |
| PV modules | 3–6 months + 6–8 weeks sea freight from China | Factory audits, pre-shipment inspection, flash test data |
| MV cable (33 kV) | 6–9 months | Large volumes; drum logistics |
| DC/LV cable, connectors | 3–6 months | Connector compatibility (no cross-mating) |
| SCADA / PPC / telecom | 6–9 months | Integration and MEWRE control-centre interface |
| Civil / piling / electrical installation subcontracts | Mobilisation 1–3 months | Labour availability, rigs |

**Why transformers set the critical path.** On a GW plant, the HV substation must be energised before any block can export (and before hot commissioning). If the transformer order goes out after detailed design freezes, an 18–24 month lead time pushes COD out regardless of how fast the arrays are built. Experienced owners therefore **pre-order or reserve transformer slots** at award (or even before, via early works or a limited notice to proceed), with ratings fixed by a basic design SLD.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why the array is rarely the problem",
          md: md`Arrays are highly repetitive: once the first block is right, productivity is a matter of crews and materials. The critical path of a GW PV project almost always runs through **unique, single-point items**: HV transformers, the substation, the grid connection (often by a separate contract), and approvals. A PM who tracks only "MWp of modules installed" can be 90 % complete and still a year from COD.`,
        },
        {
          kind: "md",
          md: md`### Construction sequence of a PV block

1. **Survey & setting out** (pile positions by GPS/RTK).
2. **Civil**: access roads, drainage, minimal grading, fencing, laydown.
3. **Piling** (driven, or pre-drilled in gatch), with pile proof tests.
4. **Tracker mechanical**: bearings, torque tubes, drives, controllers.
5. **Module installation** (and string wiring).
6. **DC cabling**: string cables, harnesses or combiner boxes; trenching where applicable.
7. **Inverter stations / MV skids**: foundations, placement, connections.
8. **MV collector cables** (trenching, laying, jointing, testing — VLF/tan-delta).
9. **HV substation** (in parallel from early on) and **grid connection**.
10. **SCADA, PPC, telecom**, weather stations.
11. **Pre-commissioning and commissioning** per block, then plant-level tests.

Trades follow each other across blocks like a production line ("**rolling fronts**"). The planner's job is to keep each front moving at a balanced rate: if piling outruns trackers, piles corrode waiting; if module delivery lags, tracker crews stand idle.

### Productivity planning

The core sizing equation is simple:`,
        },
        { kind: "equation", formula: "m07-crew-sizing" },
        {
          kind: "md",
          md: md`Use **effective** daily rates — average over the window including ramp-up, survey hold-ups, breakdowns, heat restrictions and dust storms — not the peak rate a vendor quotes on a good day.

| Activity | Indicative effective rate | Comment |
|---|---|---|
| Pile driving, good sand | 150–250 piles/rig/day | Peak; average lower |
| Pile driving, with pre-drilling (gatch) | 60–120 piles/rig/day | Refusal, rig moves |
| Planning rate for mixed Kuwaiti ground | **~120 piles/rig/day** | Used below |
| Tracker mechanical (1P, ~90 modules/tracker) | 6–10 trackers/crew-day (crew ~8–10) | After learning curve |
| Module installation | 400–600 modules/crew-day (crew ~6–8) | Wind limits on handling |
| Site-wide module install at peak, 1 GW | ~8–12 MWp/day | 20–30 crews |
| MV cable laying | 1–3 km/crew-day | Trench availability |
| Peak workforce, 1 GW PV | ~3,000–5,000 people | Plus camp/logistics |

These are planning ranges from industry practice, not guarantees; ask the EPC for their own productivity basis and compare with actuals from the first month.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Kuwait site constraints — confirm locally",
          md: md`Not in RESEARCH.md: Kuwait applies a **summer midday outdoor work ban** (commonly reported as roughly 11:00–16:00 during June–August); confirm current dates/hours with the Public Authority for Manpower and plan night or early shifts. Main container ports are **Shuwaikh** and **Shuaiba**; confirm berth, customs clearance times and abnormal-load (transformer) transport permits with the port and road authorities. RESEARCH.md does report that the Shagaya Zone 2 RFP allows a customs-duty exemption of up to 10 % on imported equipment for 10 years (exact clause unverified).`,
        },
        { kind: "sources", refs: ["m07-solarquarter-zone2"] },
        {
          kind: "widget",
          widget: "cpm-gantt",
          caption: "Edit durations: watch how a late HV transformer moves the critical path away from the array activities.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Sizing the build of a 1 GW PV plant",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "How many piling rigs?",
          given: md`1,000 MWac / 1,300 MWp; 600 Wp modules; 1P trackers of 90 modules (54 kWp) with 12 piles each. Piling window 150 working days (≈ 6 months at 25 days/month). Effective rate 120 piles/rig/day.`,
          steps: [
            { md: md`Trackers: $1{,}300{,}000\ \text{kWp} / 54 = 24{,}074$ trackers.` },
            { md: md`Piles: $24{,}074 \times 12 = 288{,}889$ ≈ 289,000 piles (~222 per MWp).` },
            { md: md`Rig-days: $288{,}889/120 = 2{,}407$ rig-days.` },
            { md: md`Rigs: $N = 2{,}407/150 = 16.05$ → **17 rigs** (always round up), plus 1–2 spares for breakdowns and pre-drill support.` },
          ],
          result: md`About 17–19 piling rigs for six months. If the geotech shows 30 % of the site needs pre-drilling at 70 piles/rig/day, recompute: the average rate drops and rig numbers rise — or the window grows.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Module crews and container logistics",
          given: md`Same plant. Module installation window 180 working days at 500 modules/crew-day. A 40 ft container carries ~620 modules. Shipments spread over 8 months; trucks run 25 days/month.`,
          steps: [
            { md: md`Modules: $1.3\times10^9\ \text{Wp}/600 = 2{,}166{,}667$.` },
            {
              md: md`Crews: $N = 2{,}166{,}667/(500 \times 180)$ = ? → round up.`,
              hidden: true,
              check: { prompt: "Number of module crews (unrounded)", answer: 24.07, tolerance: { abs: 0.05 } },
            },
            { md: md`So 25 crews, site rate ≈ 12,000 modules/day ≈ 7.2 MWp/day.` },
            {
              md: md`Containers: $2{,}166{,}667/620$ = ?`,
              hidden: true,
              check: { prompt: "Number of 40 ft containers", answer: 3495, tolerance: { rel: 0.01 } },
            },
            { md: md`Per month: $3{,}495/8 = 437$; per working day ≈ 17–18 container trucks into site, every day for 8 months — plus trackers, cables and inverters.` },
          ],
          result: md`25 module crews; ~3,500 containers; ~18 trucks/day for modules alone. Logistics (port clearance, laydown area, unloading crews, waste/packaging removal) becomes a project in itself.`,
        },
        {
          kind: "question",
          question: {
            id: "m07-l04-p1",
            type: "numeric",
            prompt: md`Same plant (24,074 trackers). Tracker crews install 8 trackers/crew-day; the tracker window is 170 working days. How many crews are needed (unrounded)?`,
            answer: 17.7,
            tolerance: { abs: 0.1 },
            explanation: md`$N = 24{,}074/(8 \times 170) = 17.7$ → 18 crews. Check balance: every 100 rig-days of piling (at 120/day) produce piles for ~1,000 trackers; tracker crews must keep pace so piles do not sit exposed and survey references are not lost.`,
            concepts: ["m07.construction-productivity"],
            difficulty: 1,
          },
        },
        {
          kind: "widget",
          widget: "cashflow-scurve",
          props: { contractValue: 600 },
          caption: "Construction cash flow for a USD 600 m EPC: milestone payments, advance recovery and retention shape the S-curve.",
        },
      ],
    },
    {
      layer: "field",
      title: "Managing construction from the Employer's side",
      blocks: [
        {
          kind: "md",
          md: md`### Site organisation (EPC side)

Project director → site/construction manager → **area managers per block** (each owning several hundred MW) → trade supervisors. Supporting: HSE (commonly targeted around 1 HSE officer per ~50 workers on high-risk work), QA/QC, survey, planning, document control, logistics/laydown, stores, camp management, medical, security. A GW site is a small town: camps, water, catering, buses, clinics.

### Employer / OE supervision

- **Inspection and test plans (ITPs)** per work type define checks, acceptance criteria, records and who attends. **Hold points** (work stops until Employer/OE releases — e.g. pile test results before production piling, MV cable test before energisation) and **witness points** (Employer may attend; work continues if they don't).
- **Non-conformance reports (NCRs)**: raised when work fails criteria; tracked to closure with root cause and corrective action.
- **Daily and weekly reports**: progress by front (piles, trackers, modules, cables) vs plan, manpower, equipment, HSE statistics, weather (dust days, heat stoppages), deliveries.
- **Monthly report** to MEWRE management: milestones, critical path, earned value, top risks, approvals pending.

### Logistics and customs

Plan the **import chain** end-to-end: factory → pre-shipment inspection → port of loading → sea freight (~6–8 weeks from China) → Kuwaiti port → customs clearance (with any exemption certificates in hand **before** arrival) → inland transport → site receipt inspection → laydown. Transformers need abnormal-load permits, route surveys and sometimes temporary road works.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong in GW-scale construction",
          md: md`- **Transformer ordered late** → array finished, plant idle for months.
- **Rolling fronts out of balance**: piling far ahead of trackers; modules arrive before trackers, sit in laydown for months in heat and dust.
- **Productivity from brochures**: schedule assumes 200 piles/rig/day; actuals 90 after gatch refusals.
- **Customs exemption not pre-approved**: containers held at port accruing demurrage.
- **Wind limits ignored**: module handling in shamal winds damages modules (micro-cracks visible only under EL later).
- **Heat stress**: summer schedules that ignore midday restrictions and water/rest provisions — HSE incidents and stoppages.
- **Grid works by a separate contract** slip; the IPP claims deemed energy.`,
        },
        {
          kind: "checklist",
          title: "PM construction-control checklist",
          items: [
            "Long-lead tracker: transformer, GIS, BESS, inverter orders placed with FAT dates and shipping windows",
            "Productivity basis documented; first-month actuals compared and schedule re-forecast",
            "Rolling-front balance chart: piles vs trackers vs modules vs DC vs MV per block",
            "ITPs approved before each trade starts; hold points respected",
            "NCR log reviewed weekly; ageing NCRs escalated",
            "Customs and exemption documents ready before shipment arrives",
            "Module handling procedure: wind limits, no stacking/walking, EL sampling of handled modules",
            "Heat-stress and dust-storm procedures in force; summer shift plan",
            "Grid connection and substation schedule integrated with the plant schedule",
          ],
        },
        {
          kind: "ask",
          title: "Ask the EPC at the construction kick-off",
          items: [
            "When are the HV transformer factory slot, FAT and delivery dates, and what is your fallback if FAT fails?",
            "What effective piling rate did you assume, per soil zone, and how many rigs will you mobilise?",
            "Show the rolling-front plan: how many MWp per week per trade at peak?",
            "What is your laydown capacity and how many weeks of modules can it hold?",
            "How will you handle the summer working-hours restriction and shamal days in the schedule?",
            "What percentage of handled modules will you EL-test after installation?",
          ],
        },
        { kind: "scenario", scenario: "m07-s3" },
        {
          kind: "feynman",
          prompt: "Explain why a GW PV project can be '90 % installed' and still be a year from COD.",
          keyPoints: [
            "Arrays are repetitive and fast; critical path runs through unique items",
            "HV transformers have 18–24+ month lead times",
            "Substation and grid connection must be energised before export/commissioning",
            "Approvals and separate grid contracts add interfaces",
            "Track critical path, not just MWp installed",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m07-l04-q1",
      type: "mcq",
      prompt: "Which item most often sets the critical path of a GW PV project today?",
      options: ["PV modules", "HV power transformers and the substation/grid connection", "Fencing", "DC string cable"],
      answer: 1,
      explanation: md`HV transformers have 18–24+ month lead times and the substation must be energised before any block can export. Modules arrive in 3–6 months plus shipping.`,
      concepts: ["m07.long-lead-items"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m07-l04-q2",
      type: "numeric",
      prompt: md`A 500 MWp extension has ~111,000 piles. With 12 rigs at an effective 110 piles/rig/day, how many working days does piling take?`,
      answer: 84.1,
      unit: "days",
      tolerance: { rel: 0.02 },
      explanation: md`$111{,}000/(12 \times 110) = 111{,}000/1{,}320 = 84.1$ working days (≈ 3.4 months at 25 days/month).`,
      concepts: ["m07.construction-productivity"],
      difficulty: 1,
    },
    {
      id: "m07-l04-q3",
      type: "order",
      prompt: "Order the main construction activities for a PV block.",
      items: [
        "Survey and setting out",
        "Civil works (roads, drainage)",
        "Piling",
        "Tracker mechanical installation",
        "Module installation",
        "DC cabling and inverter connection",
        "MV cabling and testing",
        "Commissioning",
      ],
      explanation: md`Each trade depends on the previous one on that block; across blocks they overlap as rolling fronts.`,
      concepts: ["m07.construction-sequencing"],
      difficulty: 1,
    },
    {
      id: "m07-l04-q4",
      type: "mcq",
      prompt: "What is a hold point in an ITP?",
      options: [
        "A point the Employer may attend; work continues if absent",
        "A point beyond which work must not proceed until the Employer/OE releases it",
        "A place to store materials",
        "A payment milestone",
      ],
      answer: 1,
      explanation: md`Hold points stop work pending release (e.g. pile test results before production piling). Witness points allow work to continue if the Employer does not attend after notice.`,
      concepts: ["m07.site-supervision"],
      difficulty: 1,
    },
    {
      id: "m07-l04-q5",
      type: "decision",
      prompt: md`Month 3 of piling: actual effective rate is 85 piles/rig/day vs 120 planned; the EPC says it will "catch up later". 16 rigs are on site. What do you do?`,
      options: [
        { text: "Accept the EPC's assurance", score: 0.1, feedback: "'Catch up later' without a recovery plan is how schedules fail. At 85/day the window grows by ~40 %." },
        { text: "Require a recovery schedule under the contract with resources (rigs, pre-drill units, shifts) and a re-forecast of downstream fronts; track weekly", score: 1, feedback: "Formal recovery plan with resources and re-forecast — and it signals that delay risk is being managed on record." },
        { text: "Immediately apply delay damages", score: 0.2, feedback: "Delay damages apply to milestones/completion dates, not to an intermediate productivity shortfall; premature." },
      ],
      explanation: md`At 85/day, 289,000 piles need 3,400 rig-days — 212 days with 16 rigs vs 150 planned. FIDIC (8.7 in 2017) lets the Engineer require a revised programme and recovery methods when progress is too slow.`,
      concepts: ["m07.construction-productivity", "m07.site-supervision"],
      difficulty: 2,
    },
    {
      id: "m07-l04-q6",
      type: "multi",
      prompt: "Which are good reasons to pre-order (reserve) HV transformer slots before detailed design is complete? Select all.",
      options: [
        "Lead times of 18–24+ months exceed the array construction window",
        "Ratings can be fixed from a basic-design SLD",
        "It makes the transformer cheaper in every case",
        "The substation must be energised before plant export and hot commissioning",
      ],
      answer: [0, 1, 3],
      explanation: md`Early ordering protects the critical path; it is not automatically cheaper. Fix ratings from the basic SLD (MVA, voltage ratio, impedance, vector group) and allow minor detail later.`,
      concepts: ["m07.long-lead-items"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m07-l04-f1", front: "Lead time of HV power transformers (2024–26 market)", back: "~18–24+ months.", concepts: ["m07.long-lead-items"] },
    { id: "m07-l04-f2", front: "Crew sizing equation", back: md`$N = Q/(r\,T)$ — quantity / (effective rate × working days)`, concepts: ["m07.construction-productivity"] },
    { id: "m07-l04-f3", front: "Piles per MWp for 1P trackers (90 modules, 12 piles)", back: "~220 piles/MWp.", concepts: ["m07.construction-productivity"] },
    { id: "m07-l04-f4", front: "Modules per 40 ft container (large-format)", back: "~600–650.", concepts: ["m07.construction-productivity"] },
    { id: "m07-l04-f5", front: "Peak module install rate, 1 GW site", back: "~8–12 MWp/day site-wide with 20–30 crews.", concepts: ["m07.construction-productivity"] },
    { id: "m07-l04-f6", front: "Hold point vs witness point", back: "Hold: stop until released. Witness: may attend; work proceeds if absent after notice.", concepts: ["m07.site-supervision"] },
    { id: "m07-l04-f7", front: "Rolling fronts", back: "Trades follow each other block by block like a production line; keep rates balanced.", concepts: ["m07.construction-sequencing"] },
    { id: "m07-l04-f8", front: "Peak workforce for a 1 GW PV build", back: "~3,000–5,000 people.", concepts: ["m07.construction-productivity"] },
  ],
  scenarios: [
    {
      id: "m07-s3",
      title: "The transformer that failed its FAT",
      dayInLife: true,
      context: md`You are the MEWRE PM on a ministry-procured 400/33 kV collector substation that must energise before a 1 GW IPP's scheduled commissioning. Arrays are 70 % installed. At 08:30 the OE emails: the first 400 MVA transformer failed its factory impulse test.`,
      start: "a",
      concepts: ["m07.long-lead-items", "m07.site-supervision"],
      nodes: {
        a: {
          md: md`The manufacturer says repair and retest will take 10 weeks. The IPP's PPA has deemed-energy provisions if the grid connection is late. What is your first move?`,
          choices: [
            { text: "Wait for the manufacturer's formal report before telling anyone", next: "b", score: 2, feedback: "Bad news ages badly. Management and the IPP interface need early warning." },
            { text: "Same day: notify management with facts and exposure; ask the OE for failure details; request the contractor's recovery options (repair, swap with unit 2, temporary partial energisation)", next: "c", score: 9, feedback: "Early, factual escalation plus options — exactly what a senior official wants." },
            { text: "Instruct the contractor to buy a transformer elsewhere immediately", next: "b", score: 3, feedback: "No transformer of this rating is available off the shelf; an instruction may also become a variation." },
          ],
        },
        b: {
          md: md`Two weeks later the Undersecretary hears about the failure from the IPP's CEO. The meeting is uncomfortable.`,
          choices: [
            { text: "Apologise, present options and a recovery plan", score: 3, feedback: "Recovery is possible, but trust was damaged by silence." },
          ],
        },
        c: {
          md: md`Options: (1) repair unit 1 (10 weeks); (2) ship unit 2 — FAT in 3 weeks — first and energise 50 % of capacity; (3) both. Cost impact on the contractor; deemed-energy exposure on MEWRE is roughly proportional to undeliverable MW.`,
          choices: [
            { text: "Choose option 3: prioritise unit 2 for partial energisation, repair unit 1 in parallel; agree a revised interface date with the IPP in writing", next: "d", score: 10, feedback: "Halving the exposure early is the main value; the written interface agreement prevents disputes on deemed energy." },
            { text: "Choose option 1 only to keep it simple", next: "d", score: 4, feedback: "Simple, but you accept the full 10-week exposure when half could be avoided." },
          ],
        },
        d: {
          md: md`The recovery plan is approved. The contractor asks for an extension of time, citing "manufacturer issues".`,
          choices: [
            { text: "Respond that manufacturing defects are the contractor's risk under the contract; reserve the Employer's rights to delay damages; continue cooperation on recovery", score: 10, feedback: "Correct allocation: a supplier's failure is the contractor's risk. Reserve rights in writing while keeping the recovery collaborative." },
            { text: "Grant the extension to maintain goodwill", score: 2, feedback: "Giving away an entitlement the contractor doesn't have creates audit and precedent problems." },
          ],
        },
      },
    },
  ],
};

export default lesson;
