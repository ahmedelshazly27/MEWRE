import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m06-l01",
  title: "Transmission Networks and Substations: Voltages, Configurations, SLDs, GIS vs AIS",
  summary:
    "Why power moves at 400 kV, how Kuwait's network is layered, what is inside a substation and how bus configurations trade cost against reliability, how to read a single-line diagram, how fault levels drive switchgear ratings, and how to choose between GIS and AIS in a dusty 50 °C desert.",
  minutes: 75,
  objectives: [
    "You can explain why transmission voltage is chosen and describe Kuwait's voltage levels (and which are confirmed)",
    "You can compare single bus, double bus, breaker-and-a-half and ring configurations on reliability, maintainability and cost",
    "You can read a substation single-line diagram and name the function of each component",
    "You can calculate fault levels through transformers and check them against switchgear ratings",
    "You can argue GIS vs AIS for a desert substation and list the PM interfaces between an IPP and MEWRE's transmission works",
  ],
  concepts: [
    {
      id: "m06.transmission-voltage",
      name: "Transmission voltage levels",
      description: "Losses scale with I²R, i.e. with 1/V² for a given power; hence EHV (400 kV) for bulk transfer, 132 kV sub-transmission, 33/11 kV distribution.",
      competency: "grid",
    },
    {
      id: "m06.bus-configuration",
      name: "Substation bus configurations",
      description: "Single bus, sectionalised, double bus with coupler, breaker-and-a-half, ring, double-breaker: reliability, maintainability and cost trade-offs.",
      competency: "grid",
      related: ["m06.substation-components"],
    },
    {
      id: "m06.substation-components",
      name: "Substation components",
      description: "Circuit breakers, disconnectors, earthing switches, CTs, VTs, surge arresters, power transformers with OLTC, busbars, reactive compensation, protection and auxiliaries.",
      competency: "grid",
      related: ["m06.sld-reading"],
    },
    {
      id: "m06.sld-reading",
      name: "Reading a single-line diagram",
      description: "One line represents three phases; standard symbols and ratings; bays; normal open/closed states; metering and protection points.",
      competency: "grid",
      related: ["m06.substation-components"],
    },
    {
      id: "m06.fault-level",
      name: "Fault level and switchgear ratings",
      description: "Short-circuit current/MVA at a bus from source and transformer impedances; must stay below breaker and busbar ratings.",
      competency: "grid",
      related: ["m06.transmission-voltage"],
    },
    {
      id: "m06.gis-ais",
      name: "GIS vs AIS in the desert",
      description: "Gas-insulated (compact, sealed against dust, higher cost, SF₆ management) vs air-insulated (cheaper, larger, exposed to dust/pollution flashover).",
      competency: "grid",
      related: ["m06.substation-components"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Why high voltage, and what a substation does",
      blocks: [
        {
          kind: "md",
          md: md`### Why bulk power moves at 400 kV

For a given power $P$ at power factor $\cos\varphi$, line current is $I = P/(\sqrt3 V \cos\varphi)$ and losses are $3I^2R$. Losses therefore scale with $1/V^2$: moving 1,100 MW at 400 kV instead of 132 kV cuts current by ~3× and $I^2R$ losses (per ohm of conductor) by ~9×. Higher voltage also raises the maximum power transferable over distance (which is limited by $V^2/X$). The price is larger insulation clearances, bigger and costlier equipment, and higher fault levels.`,
        },
        { kind: "equation", formula: "m06-apparent-power-3ph" },
        {
          kind: "md",
          md: md`### Kuwait's network layers

| Level | Role | Status in our sources |
|---|---|---|
| **400 kV** | Bulk transmission, GCCIA interconnection, new renewable connections (Shagaya–Al-Wafra 400 kV line; Zone 1 RFP includes a 400 kV substation) | **Confirmed** (RESEARCH.md) |
| 300 kV or 275 kV | Older EHV backbone | **Unverified** — sources differ on the exact level |
| 132 kV | Sub-transmission to grid stations | Commonly cited, **unverified** here |
| 33 kV and 11 kV | Primary distribution; PV plant collector systems typically 33 kV | Commonly cited, **unverified** here |

Frequency is 50 Hz. The GCCIA interconnector links Kuwait to the other GCC grids at 400 kV, with a back-to-back HVDC converter to Saudi Arabia's 60 Hz system; Kuwait imported 500 MW via GCCIA in summer 2024.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Check the voltage levels",
          md: md`Only 400 kV is confirmed in our research brief (Shagaya–Al-Wafra line; Zone 1 substation scope). The intermediate EHV level is quoted variously as 300 kV and 275 kV, and 132/33/11 kV are commonly cited but not verified here. Confirm against MEWRE's Transmission sector documents (network maps, grid-station standards) before using these in any specification.`,
        },
        { kind: "sources", refs: ["m06-megaproject-400kv", "m06-agbi-zone1-rfp", "m06-gccia", "m06-mees-gccia-2024"] },
        {
          kind: "md",
          md: md`### What is inside a substation

| Component | Function | PM-relevant ratings |
|---|---|---|
| **Busbar** | Common node joining bays | Continuous current, short-time withstand (kA for 1 or 3 s) |
| **Circuit breaker (CB)** | Makes and breaks load and **fault** current | Rated voltage, continuous current, **breaking current (kA)**, operating time; SF₆, vacuum (MV) or SF₆-free alternatives |
| **Disconnector (isolator)** | Visible isolation for maintenance; **no load breaking** | Interlocked with CB |
| **Earthing switch** | Earths isolated equipment for safe work | Short-time current |
| **Current transformer (CT)** | Scales current for protection and metering | Ratio, class (5P20 protection; 0.2S metering), burden |
| **Voltage transformer (VT/CVT)** | Scales voltage | Ratio, class (0.2 metering; 3P protection) |
| **Surge arrester** | Clamps lightning/switching overvoltages | Rated voltage, energy class |
| **Power transformer** | Changes voltage level (e.g. 400/33 kV) | MVA, impedance %, vector group, **on-load tap changer**, cooling (ONAN/ONAF) and **50 °C derating** |
| **Shunt reactor / capacitor / STATCOM / SVC** | Reactive power and voltage control | Mvar |
| **Protection & control** | Relays, bay controllers, SCADA gateway | IEC 61850 (lesson 5) |
| **Auxiliaries** | LV AC supply, 110/125 V DC battery systems for tripping | Autonomy hours |

A **bay** is the set of equipment that connects one circuit (line, transformer, feeder) to the busbar: typically CB + disconnectors + earthing switches + CTs + VT + arresters.

### Bus configurations

| Configuration | Breakers per circuit | Single-CB failure / bus fault effect | Maintenance | Relative cost | Typical use |
|---|---|---|---|---|---|
| **Single bus** | 1 | Bus fault loses **all** circuits | Bus outage needed | 1.0 | Small MV, collector substations |
| **Single bus, sectionalised** | ~1 | Bus fault loses one section | Partial | ~1.1 | 33 kV PV collector boards |
| **Double bus with coupler** | 1 (+ coupler) | Circuits re-assigned to healthy bus after switching | Good (one bus at a time) | ~1.3–1.5 | 132 kV grid stations, many utilities |
| **Ring bus** | 1 | A fault opens two CBs, ring stays mostly intact; becomes weak when open for maintenance | Good | ~1.2 | Small HV stations (≤ 6 circuits) |
| **Breaker-and-a-half** | **1.5** (3 CBs per 2 circuits) | Bus fault loses **no** circuits; CB maintenance without outage | Excellent | ~1.5–1.8 | EHV (400 kV) bulk stations |
| **Double bus, double breaker** | 2 | Highest | Excellent | ~2 | Critical nodes |

The choice is a reliability decision: how much does losing the connection cost? Losing a 1,100 MW solar plant's export for a day of maintenance in July costs the offtaker deemed-energy payments (lesson 4) and the grid a peak resource — exactly why 400 kV renewable hubs tend to use breaker-and-a-half.`,
        },
        { kind: "widget", widget: "substation-sld", caption: "Click each component of a 400/132/33 kV substation SLD to see its role, ratings and what to check." },
        {
          kind: "callout",
          tone: "why",
          title: "Why fault level is a design constraint",
          md: md`Every bus has a fault level set by the impedance back to all sources. Breakers must interrupt it, busbars and earthing must withstand it, and protection relies on it. Adding transformers in parallel, new generation (synchronous especially) or new interconnections **raises** fault levels; existing switchgear can become under-rated. Conversely, inverter-based plants contribute little fault current (~1.1–1.5 pu), which weakens protection (lesson 3–5).`,
        },
        { kind: "equation", formula: "m06-fault-level" },
        { kind: "equation", formula: "m06-fault-mva-impedance" },
        {
          kind: "md",
          md: md`### GIS vs AIS in a desert

| Factor | **AIS** (air-insulated) | **GIS** (gas-insulated) |
|---|---|---|
| Footprint (400 kV) | Large (several hectares) | ~10–20 % of AIS |
| Exposure to dust/sand | Insulators exposed: dust + dew/humidity → pollution flashover; requires creepage for very heavy pollution (IEC TS 60815: up to ~31 mm/kV specific creepage), washing or silicone coatings | Live parts sealed in metal enclosures; building filters dust |
| Heat | Outdoor equipment derating; direct sun on cabinets | Indoor with HVAC; enclosure temperature-rise limits |
| Capex | Lower | Higher (but less civil/land) |
| Maintenance | Frequent cleaning, more visible | Low, but specialised (OEM-dependent); gas handling |
| Environment | No SF₆ in main insulation (breakers still often SF₆) | SF₆ (GWP ~23,500) — leakage monitoring; SF₆-free options emerging |
| Expansion | Easy | Must use same OEM/interface or adapters |
| Typical Gulf choice | Remote inland sites with land | Urban/coastal sites, and increasingly EHV substations |

Shagaya is an inland desert site with abundant land but severe dust and shamal storms; coastal Kuwaiti substations add salt fog and humidity. Both options are defensible; the decision should be a life-cycle cost and reliability study, not a default.`,
        },
        { kind: "diagram", diagram: "substation", caption: "A substation bay on the SLD: line bay, busbar, circuit breaker, disconnector, earthing switch, CT, VT, power transformer and surge arrester." },
      ],
    },
    {
      layer: "applied",
      title: "Fault levels through transformers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Can the 33 kV switchgear survive a fault?",
          given: md`A PV collector substation has a 400/33 kV, **300 MVA** transformer with impedance **14 %** on its rating. The 400 kV bus fault level (without the PV plant) is **15,000 MVA**. The 33 kV switchgear offered is rated **31.5 kA**. Neglect resistance and the PV plant's own contribution.`,
          steps: [
            { md: md`Choose $S_{base}$ = 300 MVA. Source impedance: $z_s = 300/15{,}000 = 0.02$ pu.` },
            { md: md`Total impedance to a 33 kV fault: $z_s + z_T = 0.02 + 0.14 = 0.16$ pu.` },
            { md: md`Fault MVA: $S_{sc} = 300/0.16 = 1{,}875$ MVA.` },
            { md: md`Fault current: $I_{sc} = 1{,}875/(\sqrt3 \times 33) = 32.8$ kA.` },
            { md: md`Compare: 32.8 kA > 31.5 kA rating — **non-compliant**, before even adding the inverters' contribution (~1.1–1.2 pu of their rating) and any future grid strengthening.` },
          ],
          result: md`The switchgear is under-rated. Options: 40 kA switchgear (cost), a higher-impedance transformer (e.g. 16–18 %, at the cost of more reactive loss and voltage drop), or splitting the 33 kV board so each transformer feeds a separate section. The OE must also apply a **future fault-level margin**: the 400 kV fault level will rise as Kuwait's network grows — ask MEWRE Transmission for the design fault level (often the 400 kV equipment rating, e.g. 50 or 63 kA), not today's value.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Two transformers in parallel on one 33 kV bus",
          given: md`Same substation, but the designer proposes **two** identical 300 MVA, 14 % transformers feeding a single 33 kV bus with the bus coupler closed. Source still 15,000 MVA. Work on a 300 MVA base.`,
          steps: [
            { md: md`Two equal transformers in parallel: $z_T = 0.14/2 = 0.07$ pu.` },
            { md: md`Total: $0.02 + 0.07 = 0.09$ pu.` },
            {
              md: md`Fault MVA: $300/0.09 = 3{,}333$ MVA.`,
              hidden: true,
              check: { prompt: "Fault MVA at 33 kV with parallel transformers", answer: 3333, unit: "MVA", tolerance: { rel: 0.01 } },
            },
            {
              md: md`Fault current: $3{,}333/(\sqrt3 \times 33) = 58.3$ kA — far beyond any standard 33 kV switchgear (max commonly 40–50 kA).`,
              hidden: true,
              check: { prompt: "Fault current at 33 kV", answer: 58.3, unit: "kA", tolerance: { rel: 0.01 } },
            },
          ],
          result: md`Paralleling transformers on one MV bus nearly doubles fault current. Standard practice: each transformer feeds its own 33 kV section with a **normally-open** bus coupler (interlocked so that two transformers are never paralleled through it), as you will see on most PV-plant SLDs.`,
        },
        {
          kind: "question",
          question: {
            id: "m06-l01-p1",
            type: "numeric",
            prompt: md`A 400/132 kV, 500 MVA transformer has 15 % impedance. The 400 kV bus fault level is 20,000 MVA. What is the three-phase fault current at the 132 kV terminals (kA), fed through this transformer only?`,
            answer: 12.5,
            unit: "kA",
            tolerance: { rel: 0.01 },
            explanation: md`Base 500 MVA: $z_s = 500/20{,}000 = 0.025$; total $0.025 + 0.15 = 0.175$ pu; $S_{sc} = 500/0.175 = 2{,}857$ MVA; $I = 2{,}857/(\sqrt3 \times 132) = 12.5$ kA. Well within typical 132 kV ratings (31.5–40 kA), but remember other infeeds to the 132 kV bus add in parallel.`,
            concepts: ["m06.fault-level"],
            difficulty: 2,
          },
        },
        { kind: "widget", widget: "per-unit", caption: "Use the per-unit converter to check base impedances and change transformer impedances to a common base." },
      ],
    },
    {
      layer: "field",
      title: "Substations and transmission interfaces on real projects",
      blocks: [
        {
          kind: "md",
          md: md`### Who builds what

On a KAPP solar IPP like Shagaya Phase III Zone 1, the developer's EPC builds the PV plant, 33 kV collector system and — per the RFP as reported — a **400 kV substation**; MEWRE separately procures the **transmission line** to the grid (the Shagaya–Al-Wafra 400 kV OHTL was awarded in March 2026 to Power Grid Company for KD 48.6 m, through a conventional tender). Ownership and operation of the 400 kV substation after COD (transfer to MEWRE or retained by the SPV) depends on the PPA and connection agreement — check, do not assume.

**Roles**: MEWRE Transmission sector (network owner/operator, specifies grid-station standards, approves designs, operates the National Control Centre), the IPP's EPC and its HV subcontractor (often a major OEM for GIS/transformers), the IPP's owner's engineer and lenders' technical advisor, MEWRE's own OE for the transmission line, and the Engineer under each FIDIC contract.

**Documents**: connection agreement, SLDs and protection SLDs, equipment specifications, insulation coordination study, earthing study (step and touch voltages in high-resistivity desert sand), lightning protection study, fault-level and protection-coordination studies, type-test reports, FAT reports, interface matrices and an interface schedule.`,
        },
        {
          kind: "callout",
          tone: "kuwait",
          title: "Interfaces drive the schedule",
          md: md`The research brief notes that MEWRE procures grid works separately (e.g. the Shagaya–Al-Wafra line via CAPT tender) while the IPP builds the plant. A late line strands a completed solar plant and usually triggers deemed-energy compensation to the IPP. The line award (March 2026) went to the second-lowest bidder; the reason was not found. Track the line's critical path as closely as the plant's.`,
        },
        { kind: "sources", refs: ["m06-megaproject-400kv", "m06-meed-shagaya-grid", "m06-agbi-zone1-rfp"] },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Design fault level** taken from today's network, not MEWRE's future planning value → under-rated switchgear.
- **Earthing** designed on optimistic soil resistivity — dry desert sand can exceed 1,000–5,000 Ω·m; step/touch voltages fail at SAT.
- **Transformer rating at 50 °C** not checked — standard IEC ratings assume 40 °C max ambient; a 50 °C site needs derating or larger cooling.
- **Insulator pollution** under-specified for dust + dew → flashovers in humid winter mornings.
- **Interface gaps**: who supplies the line bay at the remote end, the protection signalling (OPGW), the metering CTs, the SCADA RTU.
- **Long-lead items**: EHV transformers and GIS have 12–24-month lead times; they are on the critical path.`,
        },
        {
          kind: "checklist",
          title: "PM checks for a substation design review",
          items: [
            "Design fault level and duration agreed with MEWRE Transmission (future network, not today's)",
            "Bus configuration justified by reliability/availability analysis and MEWRE standards",
            "Transformer MVA and cooling verified at 50 °C ambient and maximum loading with reactive export",
            "Insulation coordination and creepage per site pollution class; GIS/AIS decision supported by life-cycle cost",
            "Earthing study with measured soil resistivity; step/touch voltages compliant",
            "SLD shows normal open/closed states, interlocks, CT/VT classes, metering points",
            "Interface matrix complete (line bays, OPGW, SCADA, metering, protection signalling); long-lead items in the schedule",
          ],
        },
        {
          kind: "ask",
          title: "Ask the contractor",
          items: [
            "What fault level and duration did you design to, and where did that value come from?",
            "What is the transformer's continuous rating at 50 °C ambient, and what is the hot-spot temperature at that loading?",
            "Why did you choose breaker-and-a-half (or double bus) — what availability does it achieve versus the alternative?",
            "What creepage distance and insulator material did you specify, and on what pollution assessment?",
            "Which items are long-lead and what are their FAT dates?",
          ],
        },
        { kind: "scenario", scenario: "m06-s1" },
        {
          kind: "feynman",
          prompt: "Explain to a non-technical director why the substation for a 1.1 GW solar plant costs so much more if it uses breaker-and-a-half than single bus — and why it may still be worth it.",
          keyPoints: [
            "Breaker-and-a-half uses three breakers for every two circuits (more equipment)",
            "With a single bus, one bus fault or maintenance disconnects everything",
            "Breaker-and-a-half lets you maintain any breaker or lose a bus without losing a circuit",
            "Losing 1.1 GW at the summer peak costs the grid reliability and MEWRE deemed-energy payments",
            "The extra capex is weighed against expected outage costs over 30 years",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m06-l01-q1",
      type: "numeric",
      prompt: md`For the same power and power factor, by what factor do I²R line losses fall if transmission voltage rises from 132 kV to 400 kV (same conductor resistance)?`,
      answer: 9.18,
      tolerance: { rel: 0.02 },
      explanation: md`Losses ∝ $I^2$ ∝ $1/V^2$: $(400/132)^2 = 9.18$. This is the core reason for EHV bulk transmission.`,
      concepts: ["m06.transmission-voltage"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m06-l01-q2",
      type: "label",
      prompt: md`Label the substation diagram.`,
      diagram: "substation",
      markers: [
        { id: "line-bay", answer: "Line bay" },
        { id: "busbar", answer: "Busbar" },
        { id: "circuit-breaker", answer: "Circuit breaker" },
        { id: "disconnector", answer: "Disconnector" },
        { id: "ct", answer: "Current transformer" },
        { id: "vt", answer: "Voltage transformer" },
        { id: "power-transformer", answer: "Power transformer" },
        { id: "surge-arrester", answer: "Surge arrester" },
        { id: "earthing-switch", answer: "Earthing switch" },
      ],
      options: [
        "Line bay",
        "Busbar",
        "Circuit breaker",
        "Disconnector",
        "Current transformer",
        "Voltage transformer",
        "Power transformer",
        "Surge arrester",
        "Earthing switch",
        "Shunt reactor",
        "Wave trap",
      ],
      explanation: md`The breaker interrupts fault current; disconnectors give visible isolation (no load breaking); earthing switches earth isolated sections; CTs/VTs feed protection and metering; arresters limit overvoltages; the power transformer changes voltage level.`,
      concepts: ["m06.substation-components", "m06.sld-reading"],
      difficulty: 1,
    },
    {
      id: "m06-l01-q3",
      type: "mcq",
      prompt: md`In a breaker-and-a-half scheme, what happens to the connected circuits if one busbar suffers a fault?`,
      options: [
        "All circuits are lost until the bus is repaired",
        "Half the circuits are lost",
        "No circuit is lost — each remains connected through the other bus via its diameter",
        "Only transformer circuits are lost",
      ],
      answer: 2,
      explanation: md`Each diameter connects two circuits between the two buses with three breakers. A bus fault trips the breakers adjacent to that bus; every circuit stays connected through the middle breaker to the other bus.`,
      concepts: ["m06.bus-configuration"],
      difficulty: 2,
    },
    {
      id: "m06-l01-q4",
      type: "mcq",
      prompt: md`Which device must NOT be used to interrupt load current?`,
      options: ["Circuit breaker", "Disconnector (isolator)", "Vacuum contactor", "Load-break switch"],
      answer: 1,
      explanation: md`Disconnectors provide visible isolation but have no arc-quenching capability; they are interlocked so they operate only when the breaker is open.`,
      concepts: ["m06.substation-components"],
      difficulty: 1,
    },
    {
      id: "m06-l01-q5",
      type: "multi",
      prompt: md`Which are genuine advantages of GIS over AIS at a dusty desert site? (Select all.)`,
      options: [
        "Live parts sealed from dust and pollution",
        "Much smaller footprint",
        "No greenhouse-gas management needed",
        "Lower maintenance of insulation",
        "Easiest to extend with any OEM's bays",
      ],
      answer: [0, 1, 3],
      explanation: md`GIS is compact, sealed and low-maintenance, but uses SF₆ (GWP ~23,500 — leakage must be monitored) unless an SF₆-free design is chosen, and extensions are usually tied to the original OEM.`,
      concepts: ["m06.gis-ais"],
      difficulty: 2,
    },
    {
      id: "m06-l01-q6",
      type: "decision",
      prompt: md`The EPC's SLD shows two 400/33 kV transformers feeding one 33 kV bus with the coupler normally closed "for flexibility". The fault study shows 54 kA at 33 kV; switchgear is 40 kA. What do you request?`,
      options: [
        { text: "Accept, since the coupler can be opened during faults.", score: 0, feedback: "Breakers must interrupt the prospective fault current that exists when the fault occurs — opening the coupler afterwards does not help." },
        { text: "Require a normally-open, interlocked coupler (no paralleling) or switchgear rated for the actual fault level, with a revised fault study including future grid fault levels and inverter contribution.", score: 1, feedback: "Correct — standard practice and verifiable." },
        { text: "Ask for higher-impedance transformers only.", score: 0.5, feedback: "Possible, but increases reactive losses and voltage regulation; the coupler arrangement is the simpler fix." },
      ],
      explanation: md`Fault level must be within ratings in every permitted switching configuration. Interlocks enforce the configurations assumed in the study.`,
      concepts: ["m06.fault-level", "m06.bus-configuration"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m06-l01-f1", front: "Why transmit at 400 kV rather than 132 kV?", back: "Losses ∝ 1/V² for the same power (≈9× lower) and higher transfer capacity (∝ V²/X)", concepts: ["m06.transmission-voltage"] },
    { id: "m06-l01-f2", front: "Breakers per circuit in breaker-and-a-half", back: "1.5 (three breakers per two circuits)", concepts: ["m06.bus-configuration"] },
    { id: "m06-l01-f3", front: "Disconnector vs circuit breaker", back: "Breaker interrupts load and fault current; disconnector only isolates (no load breaking)", concepts: ["m06.substation-components"] },
    { id: "m06-l01-f4", front: "Fault MVA formula through a transformer", back: md`$S_{sc} = S_{base}/(z_s + z_T)$ with $z_s = S_{base}/S_{sc,source}$`, concepts: ["m06.fault-level"] },
    { id: "m06-l01-f5", front: "Why MV bus couplers in PV substations are normally open", back: "To avoid paralleling transformers, which would roughly double MV fault current", concepts: ["m06.fault-level"] },
    { id: "m06-l01-f6", front: "CT classes for protection vs metering", back: "Protection e.g. 5P20; revenue metering 0.2S", concepts: ["m06.substation-components"] },
    { id: "m06-l01-f7", front: "Main desert risk for AIS insulators", back: "Pollution flashover from dust plus dew/humidity — needs creepage, coatings or washing", concepts: ["m06.gis-ais"] },
    { id: "m06-l01-f8", front: "Kuwait voltage level confirmed in sources for new renewables", back: "400 kV (Shagaya–Al-Wafra line; Zone 1 substation)", concepts: ["m06.transmission-voltage"] },
  ],
  scenarios: [
    {
      id: "m06-s1",
      title: "The line is late",
      dayInLife: true,
      context: md`You are the MEWRE PM coordinating grid interfaces for a 1,100 MW solar IPP. The IPP's plant and 400 kV substation are 70 % complete and on schedule for COD in 14 months. MEWRE's separately tendered 400 kV overhead line to the grid station is reported at 35 % with a revised forecast 5 months after the IPP's scheduled COD.`,
      start: "a",
      concepts: ["m06.transmission-voltage", "m06.bus-configuration"],
      nodes: {
        a: {
          md: md`Under the PPA, if the grid connection is not available when the plant is ready, MEWRE pays deemed energy from the "scheduled grid connection date". Your director asks what to do first.`,
          choices: [
            { text: "Commission an independent schedule review of the line (critical path, tower deliveries, crossings, permits), quantify the deemed-energy exposure per month, and brief leadership with recovery options.", next: "b", score: 10, feedback: "Facts and money first: leadership needs exposure and options, not just a problem." },
            { text: "Ask the IPP to slow down to match the line.", next: "c", score: 2, feedback: "The IPP has no obligation to slow down; MEWRE remains exposed and gains nothing." },
            { text: "Wait for the next monthly report.", next: "c", score: 0, feedback: "A 5-month gap discovered 14 months out is precisely when recovery is still possible. Waiting wastes it." },
          ],
        },
        b: {
          md: md`The review finds tower steel deliveries and two road/pipeline crossing permits on the critical path. Exposure: 1,100 MW × ~8 h/day equivalent × ~150 days ≈ 1.3 TWh of deemed energy over 5 months. Options: (1) acceleration of the line contractor (paid overtime, extra stringing gangs); (2) a temporary connection of part of the plant at a lower voltage to a nearby station; (3) negotiate PPA relief (unlikely).`,
          choices: [
            { text: "Pursue acceleration (with a cost–benefit vs. deemed energy), escalate the crossing permits through the ministry, and ask the IPP/MEWRE planning to study a partial early connection — in parallel.", next: "d", score: 9, feedback: "Good — parallel paths, each justified by the exposure." },
            { text: "Choose only the temporary connection option.", next: "d", score: 5, feedback: "Worth studying, but alone it may only cover a fraction of the plant and needs its own studies and approvals." },
          ],
        },
        c: {
          md: md`Six months later the gap has grown to 7 months. The Audit Bureau asks why no action was taken when the delay was first reported.`,
          choices: [
            { text: "Prepare an honest chronology and a recovery plan now.", score: 3, feedback: "Necessary, but the delay in acting is now part of the record." },
          ],
        },
        d: {
          md: md`Acceleration recovers 3 months; the crossing permits are issued after escalation. The remaining 2-month gap will cost deemed energy.`,
          choices: [
            { text: "Record the lessons: grid works must be awarded early enough to precede IPP COD with float, and line progress must be tracked in the same integrated schedule as the IPP.", score: 10, feedback: "Exactly the institutional lesson the research brief flags: grid interfaces are the critical path." },
            { text: "Blame the line contractor in the report and move on.", score: 3, feedback: "Contractor performance matters, but the structural issue is the late award and fragmented scheduling." },
          ],
        },
      },
    },
  ],
};

export default lesson;
