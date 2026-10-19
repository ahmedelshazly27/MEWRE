import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m05-l05",
  title: "BESS Safety, Fire Codes and Desert Operation (incl. FAT/SAT)",
  summary:
    "Thermal runaway and propagation, the code stack (NFPA 855, UL 9540/9540A, IEC 62933, NFPA 68/69), gas detection and explosion control, the fire-suppression debate, spacing, HVAC sizing at 50 °C with sand filtration, emergency response planning, and factory/site acceptance testing of BESS containers.",
  minutes: 85,
  objectives: [
    "You can explain how thermal runaway starts, propagates and produces fire, toxic and explosion hazards — and which design layers stop each",
    "You can map NFPA 855, UL 9540, UL 9540A, IEC 62933-5-2, IEC 62619 and NFPA 68/69 to what each requires or proves",
    "You can estimate the cooling load and HVAC electrical demand of a BESS container at 50 °C, and the flammable-gas concentration and exhaust rate for a venting event",
    "You can specify desert-specific requirements (HVAC rating, sand filtration, shading, redundancy) and review an emergency response plan",
    "You can plan FAT and SAT for BESS containers with the right hold points and witnesses",
  ],
  concepts: [
    {
      id: "m05.thermal-runaway",
      name: "Thermal runaway and propagation",
      description:
        "Self-accelerating exothermic decomposition in a cell, triggered by electrical, thermal, mechanical or internal faults; propagation cell → module → rack → unit → neighbour.",
      competency: "risk",
      related: ["m05.lfp", "m05.explosion-control"],
    },
    {
      id: "m05.bess-codes",
      name: "BESS safety code stack",
      description:
        "NFPA 855 (installation), UL 9540 (system listing), UL 9540A (propagation test method), IEC 62933-5-2 and IEC 62619 (safety), NFPA 68/69 (explosion control).",
      competency: "risk",
      related: ["m05.thermal-runaway"],
    },
    {
      id: "m05.explosion-control",
      name: "Gas detection and explosion control",
      description:
        "Off-gas/H₂/CO detection, exhaust ventilation keeping vent gas below 25 % LFL (NFPA 69) or deflagration venting panels (NFPA 68).",
      competency: "risk",
      related: ["m05.thermal-runaway", "m05.bess-codes"],
    },
    {
      id: "m05.fire-suppression",
      name: "Fire suppression strategy",
      description:
        "Clean agent vs aerosol vs water vs no internal suppression with propagation-resistant design; cooling vs knock-down; re-ignition and stranded energy.",
      competency: "risk",
      related: ["m05.thermal-runaway"],
    },
    {
      id: "m05.desert-hvac",
      name: "Desert HVAC and sand protection",
      description:
        "Cooling load at 50 °C (battery heat, envelope, solar), COP collapse with ambient, N+1 redundancy, sand-trap louvres and filters, condenser recirculation.",
      competency: "wind-storage",
      related: ["m05.aging", "m05.rte"],
    },
    {
      id: "m05.erp",
      name: "Emergency response plan",
      description:
        "Site-specific plan agreed with the fire authority: detection/alarm, isolation, no-entry rules, exposure protection, water supply, monitoring, re-ignition watch, post-incident handling.",
      competency: "risk",
      related: ["m05.fire-suppression"],
    },
    {
      id: "m05.fat-sat",
      name: "FAT and SAT of BESS containers",
      description:
        "Factory acceptance (BMS, HVAC, fire system, insulation, IP, EMS interface) and site acceptance (integrated safety, HVAC under load, PCS, energisation, capacity/RTE) with hold points.",
      competency: "risk",
      related: ["m05.bess-codes"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Hazards, codes and the physics of desert cooling",
      blocks: [
        {
          kind: "md",
          md: md`### How a BESS fire happens

**Triggers**

| Type | Examples | Main barrier |
|---|---|---|
| Electrical abuse | Overcharge (BMS/PCS failure), external short circuit, insulation failure | BMS protection, contactors, fuses, insulation monitoring |
| Thermal abuse | HVAC failure in 50 °C ambient, external fire, hot spot at a loose busbar joint | HVAC redundancy, thermal sensors, torque checks, IR thermography |
| Mechanical abuse | Crush/drop in transport or installation, seismic | Handling procedures, receiving inspection |
| Internal defect | Metal particle contamination, separator defect, dendrites | Cell-maker quality, factory audit, cell-level monitoring |

**Sequence in one cell**: heating → SEI decomposition (~80–120 °C) → separator shrink/melt (~130–165 °C) → internal short → electrolyte and electrode reactions → **venting** of flammable, toxic gas (H₂, CO, CO₂, CH₄, C₂H₄, electrolyte vapour, HF) → possible ignition. LFP releases less heat than NMC, but the **vent gas is H₂-rich** and may not ignite immediately — which is how explosions happen.

**Propagation**: one cell heats its neighbours. Module design (spacing, insulating barriers, cell venting direction), rack design and unit spacing decide whether one failed cell stays one failed cell or becomes a container fire, then a site fire.

**Three hazards, three different defences**

| Hazard | Mechanism | Defence |
|---|---|---|
| **Fire** | Ignited vent gas and combustibles | Propagation-resistant design, spacing, suppression, exposure protection |
| **Explosion (deflagration)** | Vent gas accumulates unignited, then finds an ignition source (often when a door is opened) | Gas detection + exhaust ventilation (NFPA 69) or deflagration vents (NFPA 68); **never open doors early** |
| **Toxic exposure** | CO, HF, others | Plume modelling, exclusion zones, responder PPE/SCBA |

The 2019 McMicken incident in Arizona is the case every responder now studies: a cell in an NMC-based system went into runaway, the clean-agent system discharged but could not stop gas generation, and when firefighters opened the door hours later, the accumulated gas deflagrated, seriously injuring several of them. The lesson shaped today's explosion-control requirements.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why clean-agent suppression is no longer \"the answer\"",
          md: md`Gaseous agents (FK-5-1-12, HFCs) and aerosols knock down **flame** but do not **cool** cells or stop the chemical reactions inside them. Runaway continues, gas keeps venting into an enclosure that has been sealed to hold the agent — creating exactly the explosive atmosphere you fear. Modern practice is layered: prevent (BMS, HVAC), detect early (off-gas sensors), **design so one cell cannot propagate** (proved by UL 9540A), **manage gas** (ventilation/venting), then either let a unit burn out under exposure protection or use water-based cooling where tests show it helps. Note also that 3M stopped producing its FK-5-1-12 agent (Novec 1230) at the end of 2025, pushing integrators toward alternatives.`,
        },
        {
          kind: "md",
          md: md`### The code stack — who proves what

| Document | Type | What it does | PM use |
|---|---|---|---|
| **NFPA 855** | Installation standard | Hazard mitigation analysis, size/separation limits, explosion control, detection/suppression, ERP, commissioning & decommissioning | Design basis for site layout and safety systems (adopted by reference — Kuwait has no BESS-specific code that we could confirm) |
| **UL 9540** | System safety listing | Certifies the complete ESS (battery + PCS + controls + enclosure) | Mandatory in specification |
| **UL 9540A** | Test **method** (not pass/fail) | Cell → module → unit → installation tests: vent-gas volume and composition, propagation, heat release | Input for spacing, explosion control, suppression decisions |
| **IEC 62933-5-2** | Safety for grid-integrated electrochemical EES | Hazard analysis and safety requirements at system level | IEC-world equivalent; specify alongside NFPA 855 |
| **IEC 62619** | Cell/battery safety (industrial Li) | Abuse tests, propagation test, BMS functional safety | Cell/module certification |
| **NFPA 68 / NFPA 69** | Explosion protection | Deflagration venting / prevention by ventilation (< 25 % LFL) | Explosion-control design |
| **IEC 60364 / IEC 61936** | Electrical installations | LV and > 1 kV installations | Electrical safety design |

**Spacing**: NFPA 855 sets default separations (e.g. ~3 m / 10 ft from buildings, lot lines and other exposures for outdoor installations, ~0.9 m / 3 ft between units or groups in many configurations — check the edition adopted) that may be reduced when large-scale fire testing (UL 9540A unit/installation level, or the large-scale fire testing introduced in recent NFPA 855 editions) demonstrates no propagation to adjacent units. Integrators routinely place containers back-to-back or 0.15 m apart on the strength of such tests; your OE must check the test configuration actually matches the layout.

### Gas: how much is too much?

Take the UL 9540A cell-level vent-gas volume and ask what happens in a closed enclosure:`,
        },
        { kind: "equation", formula: "m05-gas-concentration" },
        {
          kind: "md",
          md: md`and size exhaust (NFPA 69) to keep the concentration below 25 % of the lower flammability limit:`,
        },
        { kind: "equation", formula: "m05-vent-rate" },
        {
          kind: "md",
          md: md`### Desert cooling physics

The HVAC must remove four heat flows: battery heat, envelope conduction, solar gain and internal electronics.`,
        },
        { kind: "equation", formula: "m05-heat-gen" },
        { kind: "equation", formula: "m05-conduction" },
        { kind: "equation", formula: "m05-sol-air" },
        { kind: "equation", formula: "m05-hvac-power" },
        {
          kind: "md",
          md: md`The chiller rejects heat into 50 °C air, so its condensing temperature is ~60–65 °C: COP falls from ~4 at 35 °C to ~2.5 at 50 °C, and many standard units **trip on high head pressure** above ~52 °C. Kuwait's record (53.9 °C, Mitribah, 2016) means design ambient of 50 °C with survival/operation at 55 °C is a sensible specification.

**Sand and dust**: shamal winds carry fine dust that blocks condenser coils and filters within days. Countermeasures: sand-trap louvres and G4 + F7 filter stages on fresh-air paths, IP55+ enclosures (IP65 for electronics), positive pressurisation where applicable, condensers oriented away from prevailing wind with spacing to prevent hot-air recirculation, coated (e.g. epoxy) coils, and a cleaning regime tied to dust events.`,
        },
        { kind: "sources", refs: ["m05-nfpa-855", "m05-ul-9540", "m05-ul-9540a", "m05-iec-62933", "m05-iec-62619", "m05-nfpa-68-69", "m05-epri-failure-db", "m05-wmo-mitribah"] },
      ],
    },
    {
      layer: "applied",
      title: "Cooling and gas calculations for a 5 MWh container",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Cooling load and HVAC power at 50 °C",
          given: md`A 20-ft liquid-cooled 5.016 MWh container (external 6.06 × 2.44 × 2.90 m) discharges at 0.25C (1,254 kW DC). One-way DC efficiency 97.5 %. Insulated panels U = 0.6 W/(m²·K). Cells held at 25 °C. Ambient 50 °C; roof irradiance 1,000 W/m², white roof α = 0.3, $h_o$ = 17 W/(m²·K). Internal electronics (BMS, fans, lighting, fire panel) 2 kW. Design margin 20 % for filter fouling and aging. Chiller COP at 50 °C = 2.5.`,
          steps: [
            { md: md`**Battery heat**: $\dot{Q}_{gen} = 1{,}254 \times (1 - 0.975) = 31.35$ kW.` },
            { md: md`**Envelope area**: $2(6.06 \times 2.44 + 6.06 \times 2.90 + 2.44 \times 2.90) = 78.9$ m². **Conduction** at 25 K: $0.6 \times 78.9 \times 25 = 1{,}183$ W ≈ 1.18 kW.` },
            { md: md`**Roof solar extra**: sol-air $T_{sa} = 50 + 0.3 \times 1{,}000/17 = 67.6$ °C. Roof area 14.8 m²; extra over the conduction already counted: $0.6 \times 14.8 \times (67.6 - 50) = 157$ W ≈ 0.16 kW.` },
            { md: md`**Total**: $31.35 + 1.18 + 0.16 + 2.0 = 34.7$ kW thermal. With 20 % margin: **41.6 kW cooling capacity**.` },
            { md: md`**Electrical input**: $41.6/2.5 = 16.7$ kW at full design load (vs ~10.4 kW if COP were 4 at 35 °C).` },
          ],
          result: md`Specify ≥ 42 kW of cooling at 50 °C ambient (with N+1 redundancy, i.e. two units each able to carry the load, or 3 × 50 %), rated to operate at 55 °C. **Battery heat dominates** (~90 % of load during cycling); envelope and solar matter mainly when idle. At 0.5C, battery heat roughly doubles — check the HVAC rating against the highest C-rate the EMS will ever use (e.g. FFR bursts).`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "When does vent gas become an explosion hazard?",
          given: md`UL 9540A cell-level testing reports **0.12 m³** of vent gas per cell in thermal runaway, mixture LFL ≈ **8 %** by volume. The container's free gas volume is **20 m³**. A module contains 8 cells; in the UL 9540A module test the whole module went into runaway over ~5 minutes. Assume perfect mixing.`,
          steps: [
            { md: md`25 % of LFL $= 0.25 \times 8 = 2.0$ % by volume.` },
            { md: md`One cell: $C = 0.12/20 = 0.6$ % — 7.5 % of LFL. Not yet dangerous.` },
            {
              md: md`Cells needed to reach 25 % LFL: $N = 0.02 \times 20/0.12 = 3.3$ → **4 cells**.`,
              hidden: true,
              check: { prompt: "Number of cells (decimal) to reach 25 % LFL", answer: 3.33, tolerance: { rel: 0.02 } },
            },
            { md: md`Whole module: $8 \times 0.12/20 = 4.8$ % — 60 % of LFL, inside the flammable region's approach. Explosion control is mandatory.` },
            {
              md: md`Exhaust rate to hold < 25 % LFL: release rate $\dot{G} = 0.96/300 = 0.0032$ m³/s; $\dot{V} = 0.0032/0.02 = 0.16$ m³/s = 576 m³/h; with mixing factor K = 4: **≈ 2,300 m³/h**.`,
              hidden: true,
              check: { prompt: "Exhaust flow with K = 4", answer: 2304, unit: "m³/h", tolerance: { rel: 0.02 } },
            },
          ],
          result: md`Four venting cells in a sealed 20-ft container can create an explosive atmosphere. Hence NFPA 855's requirement for explosion control: gas-detection-triggered exhaust sized from UL 9540A data (here ~2,300 m³/h, on UPS-backed power) **or** deflagration vent panels on the roof — and an ERP rule that responders never open doors on a gassing container.`,
        },
        {
          kind: "question",
          question: {
            id: "m05-l05-p1",
            type: "numeric",
            prompt: md`Using the worked example's container: during cycling (8 h/day) the thermal load is 34.7 kW; while idle (16 h/day) it is 3.34 kW (envelope + solar + electronics). COP is 2.5 all day (a conservative August assumption). The plant has 500 such containers and delivers 2,000 MWh/day at the POI. What is the daily HVAC electrical energy for the whole plant in MWh?`,
            answer: 66.19,
            unit: "MWh/day",
            tolerance: { rel: 0.02 },
            explanation: md`Per container thermal: $34.7 \times 8 + 3.34 \times 16 = 277.6 + 53.4 = 331.0$ kWh_th; electrical $331.0/2.5 = 132.4$ kWh. Plant: $132.4 \times 500 = 66.2$ MWh/day ≈ 3.3 % of the 2,000 MWh discharge — and that is only the compressors; pumps, fans, PCS-skid cooling and auxiliaries push the total toward 5–6 %.`,
            concepts: ["m05.desert-hvac"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Safety management, desert O&M and acceptance testing",
      blocks: [
        {
          kind: "callout",
          tone: "unverified",
          title: "Kuwaiti approvals — to confirm",
          md: md`No Kuwait-specific BESS fire code or approval procedure was found in our sources. Fire-safety approval in Kuwait is understood to rest with the national fire authority (the Kuwait Fire Force), and environmental permits with the Environment Public Authority, but the documents they will require for a utility BESS (e.g. acceptance of NFPA 855 / UL 9540A, plume studies, water supply) are **not verified**. Engage both early and record what they accept in writing.`,
        },
        {
          kind: "md",
          md: md`### Hazard Mitigation Analysis (HMA) and the ERP

NFPA 855 requires an HMA for large installations: what failure modes exist (BMS failure, HVAC failure, thermal runaway of one cell, external fire), what barriers stop each, and what happens if a barrier fails. It draws on UL 9540A data and on plume/explosion modelling (often by a fire-engineering consultant with CFD).

The **Emergency Response Plan** is written by the EPC/operator with the fire authority, and includes: alarm and notification chain (BMS/EMS → control room → MEWRE duty engineer → fire authority); remote isolation (PCS stop, DC contactors, MV breaker); exclusion zones from plume modelling; **no door opening on a gassing unit**; exposure protection (cooling neighbouring units with hose streams if needed); water supply (desert sites have no hydrants — tanks sized on test data); monitoring for 24–72 h; re-ignition watch; handling of damaged modules with stranded energy; site familiarisation drills for responders before COD.

### Desert O&M essentials

- **HVAC is safety equipment**: N+1 redundancy, alarms on high cell temperature and on HVAC fault, automatic PCS power reduction before cells exceed limits.
- **Dust events**: post-shamal inspection and coil/filter cleaning; differential-pressure monitoring on filters.
- **Thermography**: annual IR scans of busbars and DC connections (loose joints cause hot spots).
- **Insulation monitoring**: DC ground-fault detection on each string.
- **Spare parts**: HVAC compressors, fans, filters on site — a failed HVAC in August can force a container offline within hours.`,
        },
        {
          kind: "md",
          md: md`### FAT and SAT for BESS containers

| Stage | Where / who | Typical tests | Hold/witness |
|---|---|---|---|
| **Cell & module FAT** | Cell factory; OE inspector | Capacity/impedance sorting records, traceability, visual, welding QC | Review records; sample witness |
| **Container FAT** | Integrator factory; OE + Employer | Insulation resistance and hipot, BMS functional tests (over/under-voltage and temperature trips), contactor operation, HVAC run test (ideally in a hot room), fire detection and gas detection functional test, exhaust/vent function, IP water-spray test, torque audit, EMS/SCADA interface simulation | **Hold point** before shipment |
| **PCS FAT** | PCS factory | Type tests reference, routine tests, grid-code functions on test bench | Witness |
| **Receiving inspection** | Site | Shock/tilt indicators, SoC on arrival, visual damage, documentation | Hold before installation |
| **SAT / commissioning** | Site; EPC, OE, Engineer, fire authority | Mechanical completion, cable IR, BMS commissioning, HVAC under load, integrated fire/gas/exhaust test (with authority), PCS and protection, energisation, EMS functions | **Hold points**: integrated safety test before energisation; energisation permit |
| **Performance tests** | Site; Engineer witness | Capacity, RTE, power at 50 °C, response, reactive capability, grid-compliance tests | Tests on Completion (FIDIC Cl. 9) |`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- HVAC rated at 46 °C "standard Middle East" — trips at 51 °C in the first August.
- Condenser hot-air recirculation between closely spaced rows (layout optimised for land, not airflow).
- UL 9540A tests done on a different module/rack variant from the one delivered.
- Fire system commissioned in isolation; the **integrated** sequence (detection → PCS trip → exhaust → alarm to control room) never tested end-to-end.
- No water supply at a remote desert site; ERP assumes hydrants.
- Containers stored at port in direct sun at high SoC for weeks.
- Responders first see the site during an incident.`,
        },
        {
          kind: "checklist",
          title: "PM safety and desert checklist",
          items: [
            "UL 9540 listing and UL 9540A reports for the exact cell/module/unit delivered; layout matches test configuration",
            "HMA (NFPA 855) and explosion-control design (NFPA 68/69) reviewed by an independent fire engineer",
            "HVAC rated at 50 °C design / 55 °C operation, N+1, with cell-temperature-based PCS derating",
            "Sand-trap louvres, filter stages and IP ratings specified; condenser orientation and spacing checked for recirculation",
            "ERP agreed with the fire authority; water storage sized; responder drills before energisation",
            "FAT hold point before shipment; integrated fire/gas/exhaust SAT witnessed before energisation",
            "Receiving inspection and port storage plan (shade, SoC ≤ agreed level)",
          ],
        },
        {
          kind: "ask",
          title: "Ask the contractor",
          items: [
            "Show me the UL 9540A unit-level report: did the initiating module propagate, and what were vent-gas volume and composition?",
            "What is your explosion-control concept — exhaust (flow, trigger, power backup) or deflagration panels (area, location)?",
            "At what ambient does your HVAC trip on high pressure, and what happens to the battery then?",
            "What is your suppression philosophy and what evidence shows it helps rather than hinders?",
            "How will you test the integrated safety sequence end-to-end at SAT, and who from the fire authority will witness?",
          ],
        },
        { kind: "scenario", scenario: "m05-s5" },
        {
          kind: "feynman",
          prompt: "Explain to a Kuwaiti fire-service officer why firefighters must not open the doors of a BESS container that is alarming for gas, even if there are no visible flames.",
          keyPoints: [
            "Cells in thermal runaway vent flammable gas (hydrogen, CO) that may not ignite immediately",
            "Gas accumulates in the closed container toward its flammability limit",
            "Opening the door admits air and possibly an ignition source, causing a deflagration",
            "Suppression agents do not stop gas generation",
            "Correct response: isolate remotely, keep exclusion zone, let ventilation/vents work, monitor, protect neighbours",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m05-l05-q1",
      type: "mcq",
      prompt: md`What is UL 9540A?`,
      options: [
        "A pass/fail safety certification for complete BESS",
        "A test method that characterises thermal-runaway propagation, vent gas and heat release at cell, module, unit and installation level",
        "An installation code for BESS spacing",
        "A cell performance standard for cycle life",
      ],
      answer: 1,
      explanation: md`UL 9540 is the system listing; UL 9540A is the test **method** whose data (gas volume/composition, propagation, heat release) feed design decisions under NFPA 855 — spacing, explosion control and suppression.`,
      concepts: ["m05.bess-codes"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m05-l05-q2",
      type: "multi",
      prompt: md`Which statements about BESS fire hazards are correct? (Select all.)`,
      options: [
        "LFP cells do not vent flammable gas",
        "Clean-agent suppression can extinguish flames but does not stop gas generation in runaway cells",
        "Explosion risk arises when vent gas accumulates unignited",
        "NFPA 69 exhaust ventilation aims to keep vent gas below 25 % of LFL",
        "Opening container doors quickly is the best way to vent gas",
      ],
      answer: [1, 2, 3],
      explanation: md`LFP does vent flammable gas (H₂-rich). Gaseous agents knock down flame without cooling cells. Unignited accumulation causes deflagrations; NFPA 69 exhaust keeps the atmosphere below 25 % LFL. Opening doors introduces air and ignition — the McMicken lesson.`,
      concepts: ["m05.thermal-runaway", "m05.explosion-control", "m05.fire-suppression"],
      difficulty: 2,
    },
    {
      id: "m05-l05-q3",
      type: "numeric",
      prompt: md`A container's battery heat during discharge is 31.4 kW, other gains total 3.3 kW. With a 20 % margin and COP 2.5 at 50 °C, what HVAC electrical input (kW) is required?`,
      answer: 16.66,
      unit: "kW",
      tolerance: { rel: 0.02 },
      explanation: md`$(31.4 + 3.3) \times 1.2 / 2.5 = 34.7 \times 1.2/2.5 = 16.66$ kW. At COP 4 (35 °C) it would be ~10.4 kW: the desert costs ~60 % more HVAC energy for the same cooling.`,
      concepts: ["m05.desert-hvac"],
      difficulty: 2,
    },
    {
      id: "m05-l05-q4",
      type: "label",
      prompt: md`Label the components of the BESS diagram.`,
      diagram: "bess",
      markers: [
        { id: "cell", answer: "Cell" },
        { id: "rack", answer: "Rack" },
        { id: "bms", answer: "Battery management system" },
        { id: "pcs", answer: "Power conversion system" },
        { id: "hvac", answer: "HVAC / thermal management" },
        { id: "fire-suppression", answer: "Fire detection & suppression" },
        { id: "ems", answer: "Energy management system" },
      ],
      options: [
        "Cell",
        "Rack",
        "Battery management system",
        "Power conversion system",
        "HVAC / thermal management",
        "Fire detection & suppression",
        "Energy management system",
        "STATCOM",
        "Revenue meter",
      ],
      explanation: md`The BMS protects cells (voltages, temperatures, contactors); the PCS converts DC↔AC; HVAC keeps cells near 25 °C; fire detection/suppression and gas detection manage hazards; the EMS dispatches the plant and talks to SCADA/PPC.`,
      concepts: ["m05.fat-sat", "m05.desert-hvac"],
      difficulty: 1,
    },
    {
      id: "m05-l05-q5",
      type: "decision",
      prompt: md`At SAT, the EPC proposes to energise the BESS and test the fire, gas-detection and exhaust systems "in parallel over the next month to save schedule". The fire authority has not yet witnessed the integrated test. What do you do?`,
      options: [
        { text: "Agree — the systems were tested at FAT.", score: 0, feedback: "FAT tested components in the factory, not the integrated site sequence. Energising before proving safety systems is unacceptable risk." },
        { text: "Maintain the hold point: no energisation of battery DC systems until the integrated detection → trip → exhaust → alarm sequence is tested end-to-end and witnessed as required; help the EPC re-sequence other activities.", score: 1, feedback: "Correct — this is exactly what hold points exist for." },
        { text: "Allow energisation of half the containers.", score: 0.2, feedback: "Half of an unproven safety system is still unproven." },
      ],
      explanation: md`Safety hold points are non-negotiable schedule constraints. The PM's job is to protect them while helping the contractor find float elsewhere.`,
      concepts: ["m05.fat-sat", "m05.bess-codes"],
      difficulty: 2,
    },
    {
      id: "m05-l05-q6",
      type: "numeric",
      prompt: md`UL 9540A data: 0.10 m³ of vent gas per cell, LFL 7 %. Container free volume 25 m³. How many cells (decimal) can vent before the average concentration reaches 25 % of LFL?`,
      answer: 4.375,
      tolerance: { rel: 0.02 },
      explanation: md`25 % LFL = 1.75 %. $N = 0.0175 \times 25 / 0.10 = 4.375$ cells. A handful of cells is enough — which is why explosion control is required even for LFP.`,
      concepts: ["m05.explosion-control"],
      difficulty: 2,
    },
    {
      id: "m05-l05-q7",
      type: "short",
      prompt: md`List five desert-specific requirements you would add to a BESS specification for Shagaya.`,
      rubric: [
        "HVAC sized at 50 °C design ambient and able to operate at ~55 °C, with N+1 redundancy",
        "Sand-trap louvres, multi-stage filtration, IP55/IP65 ratings",
        "Condenser layout and spacing preventing hot-air recirculation; light coatings/sunshades",
        "PCS derating curve and capacity at 50 °C",
        "Water storage for firefighting; dust-event cleaning regime; port storage/transport heat controls",
      ],
      modelAnswer: md`(1) HVAC rated for 50 °C design and 55 °C operation with N+1 and cell-temperature-based derating; (2) sand-trap louvres, G4/F7 filtration with differential-pressure monitoring, IP55 enclosures and IP65 electronics; (3) condenser orientation away from shamal winds, row spacing to prevent recirculation, white coatings and shading; (4) guaranteed PCS MVA at 50 °C; (5) on-site fire-water storage sized on UL 9540A data, plus post-dust-storm inspection and cleaning procedures and shaded, low-SoC port storage.`,
      concepts: ["m05.desert-hvac"],
      difficulty: 2,
      explanation: md`The desert affects cooling capacity (COP and trip limits), contamination (dust), layout (recirculation) and emergency logistics (water). A good specification addresses each explicitly instead of relying on "suitable for site conditions".`,
    },
  ],
  flashcards: [
    { id: "m05-l05-f1", front: "UL 9540 vs UL 9540A", back: "9540: system safety listing. 9540A: propagation test method providing gas/heat/propagation data", concepts: ["m05.bess-codes"] },
    { id: "m05-l05-f2", front: "NFPA 855 scope", back: "Installation of stationary ESS: HMA, separation/size limits, explosion control, detection/suppression, ERP, commissioning/decommissioning", concepts: ["m05.bess-codes"] },
    { id: "m05-l05-f3", front: "Explosion-control options referenced by NFPA 855", back: "NFPA 69 exhaust ventilation (< 25 % LFL) or NFPA 68 deflagration venting", concepts: ["m05.explosion-control"] },
    { id: "m05-l05-f4", front: "Main lesson of McMicken (2019)", back: "Unignited vent gas accumulated in a sealed container and deflagrated when the door was opened", concepts: ["m05.thermal-runaway"] },
    { id: "m05-l05-f5", front: "Why clean agents fall short on Li-ion fires", back: "They knock down flame but do not cool cells or stop gas generation", concepts: ["m05.fire-suppression"] },
    { id: "m05-l05-f6", front: "Chiller COP trend from 35 °C to 50 °C ambient", back: "Falls from ~4 to ~2.5 — ~60 % more electricity for the same cooling", concepts: ["m05.desert-hvac"] },
    { id: "m05-l05-f7", front: "Dominant HVAC load during cycling", back: "Battery heat (~90 %); envelope and solar dominate only when idle", concepts: ["m05.desert-hvac"] },
    { id: "m05-l05-f8", front: "Key SAT hold point for BESS safety", back: "Integrated detection → PCS trip → exhaust → alarm test witnessed before energisation", concepts: ["m05.fat-sat"] },
    { id: "m05-l05-f9", front: "Desert-specific ERP item often forgotten", back: "Fire-water storage — remote sites have no hydrants", concepts: ["m05.erp"] },
  ],
  scenarios: [
    {
      id: "m05-s5",
      title: "02:40 — gas alarm in container B-17",
      dayInLife: true,
      context: md`You are MEWRE's duty PM for the BESS this week. At 02:40 the control room calls: off-gas and H₂ detectors alarmed in container B-17; the BMS shows one module at 78 °C and rising; the exhaust fans started automatically and the PCS for that block tripped. Ambient is 37 °C. The O&M contractor's night technician is on site.`,
      start: "a",
      concepts: ["m05.erp", "m05.thermal-runaway", "m05.explosion-control"],
      nodes: {
        a: {
          md: md`The technician asks whether he should open B-17's door to check visually and use a portable extinguisher.`,
          choices: [
            { text: "No. Order him to keep out of the exclusion zone, confirm remote isolation (DC contactors and MV breaker open), and activate the ERP: call the fire authority and the O&M site manager.", next: "b", score: 10, feedback: "Exactly the ERP: isolate remotely, keep people away from a gassing enclosure, call responders." },
            { text: "Yes, but only with full PPE.", next: "c", score: 0, feedback: "PPE does not protect against a deflagration. This is the McMicken scenario." },
            { text: "Tell him to wait until morning when the EPC's specialist arrives.", next: "b", score: 3, feedback: "Doing nothing is not the plan — the ERP must be activated and responders informed now." },
          ],
        },
        b: {
          md: md`Fire crews arrive at 03:25. The module temperature reaches 190 °C, then two adjacent modules begin to rise. Exhaust is running; gas readings stay below 10 % LFL. The fire officer asks whether to apply water to B-17.`,
          choices: [
            { text: "Follow the agreed ERP: no entry; use hose streams to cool neighbouring containers (exposure protection) if their temperatures rise; let B-17's design (propagation barriers, exhaust) work; keep monitoring.", next: "d", score: 9, feedback: "Good — consistent with a pre-agreed plan based on UL 9540A behaviour." },
            { text: "Ask the fire crew to cut into the container and flood it.", next: "d", score: 3, feedback: "Breaching a gassing container is dangerous; any internal water application should follow the pre-agreed plan and the integrator's guidance." },
          ],
        },
        c: {
          md: md`As the door opens, a flash deflagration throws the technician back. He is injured. The incident is now a serious HSE event with regulatory and criminal implications.`,
          choices: [
            { text: "Activate emergency medical response and the ERP, secure the site, notify authorities and preserve evidence.", score: 2, feedback: "The right actions now — but the injury was avoidable. Review training and ERP communication." },
          ],
        },
        d: {
          md: md`By 09:00 temperatures fall; the event stayed within two modules. MEWRE leadership wants to know "when the BESS will be back to full capacity" and whether to inform the media.`,
          choices: [
            { text: "Brief leadership factually: event contained to two modules in one container, no injuries, rest of plant can return in stages after inspection; require root-cause analysis (EPC/OEM/independent), keep B-17 isolated and monitored for re-ignition, notify insurers; coordinate media lines through the ministry's communication office.", score: 10, feedback: "Excellent: facts, safety first, staged return, RCA, insurance and controlled communication." },
            { text: "Restart the whole plant immediately to protect the evening peak.", score: 2, feedback: "Without root cause, you risk a repeat in an identical container. Return in stages after inspection." },
          ],
        },
      },
    },
  ],
};

export default lesson;
