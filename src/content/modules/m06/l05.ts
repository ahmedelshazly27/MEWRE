import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m06-l05",
  title: "SCADA/EMS, Protection, Metering, Cybersecurity and Energisation",
  summary:
    "How a PV/BESS plant is monitored and controlled from the national control centre (SCADA architecture, IEC 61850, IEC 60870-5-104, OPGW telecom), how it is protected (distance, differential, overcurrent) when inverters give little fault current, how revenue metering is specified, how IEC 62443 secures it, and how first energisation and grid-compliance testing are run.",
  minutes: 85,
  objectives: [
    "You can sketch a plant-to-control-centre SCADA architecture and explain the role of IEC 61850, IEC 60870-5-104 and OPGW",
    "You can explain distance, differential and overcurrent protection, compute relay settings in secondary ohms, and state how IBR fault behaviour affects them",
    "You can specify revenue metering (classes, CT/VT, main/check) and quantify the cost of metering error",
    "You can apply IEC 62443 zones-and-conduits thinking and list the cybersecurity controls a PM must require",
    "You can plan an energisation sequence with hold points and the grid-compliance tests that follow",
  ],
  concepts: [
    {
      id: "m06.scada-architecture",
      name: "SCADA/EMS architecture",
      description: "Field devices → plant network → SCADA/PPC/historian → gateway/RTU → telecom (OPGW) → national control centre EMS (state estimation, AGC, contingency analysis).",
      competency: "grid",
      related: ["m06.protocols"],
    },
    {
      id: "m06.protocols",
      name: "IEC 61850 and IEC 60870-5-104",
      description: "61850: substation data model, MMS, GOOSE, SV, SCL engineering files; 104: telecontrol to control centre over TCP/IP; time sync and SOE.",
      competency: "grid",
      related: ["m06.scada-architecture", "m06.cybersecurity"],
    },
    {
      id: "m06.protection",
      name: "Protection schemes",
      description: "Distance (21), line/transformer/busbar differential (87), overcurrent/earth fault (50/51), breaker failure, voltage/frequency; selectivity, speed, redundancy; IBR fault-current effects.",
      competency: "grid",
      related: ["m06.scada-architecture"],
    },
    {
      id: "m06.revenue-metering",
      name: "Revenue metering",
      description: "Class 0.2S meters with 0.2S CTs and 0.2 VTs at the POI, main and check meters, sealing, calibration and data access.",
      competency: "grid",
      related: ["m06.protection"],
    },
    {
      id: "m06.cybersecurity",
      name: "OT cybersecurity (IEC 62443)",
      description: "Zones and conduits, security levels, DMZ, secure remote access, patch and account management, supplier requirements, monitoring and incident response.",
      competency: "risk",
      related: ["m06.protocols"],
    },
    {
      id: "m06.energisation",
      name: "Energisation and grid-compliance testing",
      description: "Prerequisites and hold points, switching programme, back-feed and staged energisation, hot commissioning, compliance tests, trial operation, COD.",
      competency: "delivery",
      related: ["m06.protection", "m06.scada-architecture"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Seeing, controlling and protecting the plant",
      blocks: [
        {
          kind: "md",
          md: md`### SCADA architecture, layer by layer

| Layer | Contents | Typical technology |
|---|---|---|
| **Field / process** | Inverters, PCS, BMS, trackers, met stations, protection relays (IEDs), meters, transformer monitors | Modbus TCP, IEC 61850 MMS/GOOSE, hard-wired I/O |
| **Plant network** | Fibre rings across the PV field / BESS yard, managed industrial switches | Redundant rings (RSTP, PRP/HSR in substations) |
| **Plant control** | SCADA servers and HMI, **PPC**, BESS EMS, historian, alarm management, SOE recorder | Redundant servers, GPS/PTP time sync (SOE resolution ~1 ms) |
| **Gateway / RTU** | Protocol conversion and data concentration toward the TSO | IEC 60870-5-104 (TCP/IP) or IEC 61850 to the control centre |
| **Telecom** | **OPGW** (fibre in the earth wire of the 400 kV line), redundant path (second OPGW/route, microwave or leased circuit) | SDH/MPLS-TP; teleprotection channels |
| **Control centre** | MEWRE's national control centre EMS: state estimation, AGC, economic dispatch, contingency analysis, outage management | Vendor EMS; ICCP between control centres (e.g. GCCIA) |

**Signals to the control centre** (agreed in a "signal list"): P, Q, V, f at POI; breaker/disconnector statuses; available power; BESS SoC and available MWh; alarms and protection operations; met data; set-point feedback. **From** the control centre: P set-point/curtailment, Q/V set-points, mode commands, BESS dispatch schedules.

### IEC 61850 and IEC 60870-5-104

**IEC 61850** is the substation automation standard. It defines an object data model (logical nodes such as XCBR for a breaker, MMXU for measurements), services (**MMS** client–server for SCADA, **GOOSE** for fast peer-to-peer trips and interlocks over Ethernet within ~4 ms, **Sampled Values** for digital CTs/VTs), and engineering files in SCL (ICD, SCD, CID). It replaces copper wiring between relays with configured messages — powerful, but the **SCD file** becomes a critical, version-controlled design document.

**IEC 60870-5-104** is the telecontrol protocol most commonly used between plants and control centres: TCP/IP (port 2404), information objects addressed by IOA, spontaneous and cyclic reporting, commands with select-before-operate. Neither protocol was originally secure; **IEC 62351** adds TLS and authentication.`,
        },
        { kind: "sources", refs: ["m06-iec-61850", "m06-iec-60870-5-104", "m06-iec-62351"] },
        {
          kind: "md",
          md: md`### Protection — principles and schemes

Protection must be **selective** (trip only the faulted element), **fast** (400 kV faults cleared in ~80–120 ms including breaker time, to preserve stability), **sensitive**, and **reliable** (dependable — always trips when it should; secure — never trips when it shouldn't). At 400 kV, two independent **Main 1 / Main 2** protections (often different principles or vendors) plus breaker-failure protection are normal.

| Device number / name | Principle | Typical use in a PV/BESS connection |
|---|---|---|
| **87L line differential** | Compares currents at both line ends via fibre (OPGW); trips if they differ | Main protection of the 400 kV export line — immune to weak infeed |
| **21 distance** | Measures impedance V/I; trips if fault is within zone reach | Main/back-up on lines; zone 1 instant, zone 2/3 delayed |
| **87T transformer differential** | Current in vs out (with ratio/vector compensation, inrush blocking) | Every HV and large MV transformer |
| **87B busbar differential** | Sum of currents into a bus ≈ 0 | 400 kV and 33 kV busbars |
| **50/51, 50N/51N overcurrent / earth fault** | Current above pick-up, inverse-time or instantaneous | MV feeders, back-up |
| **50BF breaker failure** | Trips adjacent breakers if a breaker fails to open | All HV breakers |
| **27/59/81 under/over-voltage, frequency** | Interface protection | Must be set to **allow** FRT and frequency ranges of the grid code |

For a distance relay, the reach is set in primary ohms and converted to what the relay sees through the CTs and VTs:`,
        },
        { kind: "equation", formula: "m06-distance-zone1" },
        { kind: "equation", formula: "m06-impedance-secondary" },
        {
          kind: "callout",
          tone: "why",
          title: "Why inverter plants complicate protection",
          md: md`A synchronous generator delivers 5–7 pu fault current with a natural negative-sequence path. An inverter limits fault current to ~1.1–1.2 pu and its sequence content is set by its control software. Distance and directional relays at the plant end may then see unusual impedances or fail to determine direction; overcurrent relays may not pick up. Remedies: line differential over fibre as main protection, IEEE 2800-style negative-sequence current injection, careful relay settings verified in EMT studies, and communication-aided schemes.`,
        },
        {
          kind: "md",
          md: md`### Revenue metering

Revenue meters at the POI settle every MWh of a 30-year PPA. Typical specification: **active-energy meters class 0.2S** (IEC 62053-22), **CTs class 0.2S** and **VTs class 0.2** (IEC 61869), dedicated metering cores, burden within rating, **main and check meters** (sometimes owned by different parties), sealed terminals, 15-minute (or shorter) interval data with remote reading by MEWRE, periodic calibration and a procedure for meter failure (check meter substitution). The cost of error is easy to quantify:`,
        },
        { kind: "equation", formula: "m06-metering-error" },
        {
          kind: "md",
          md: md`### Cybersecurity with IEC 62443

A gigawatt of remotely controllable inverters and batteries is critical national infrastructure. IEC 62443 provides the structure:

- **Zones and conduits**: group assets by criticality (e.g. protection zone, plant control zone, BESS zone, corporate IT) and control every communication path (conduit) between them with firewalls and allow-lists.
- **Security levels (SL1–SL4)**: target levels per zone based on threat (SL3 — sophisticated attacker with moderate resources — is common for transmission-connected plants).
- **DMZ** between plant OT and any external network (control centre, OEM, corporate); no direct internet paths to controllers.
- **Secure remote access**: OEM access only via jump host, MFA, session recording, time-limited approval.
- **Hardening and patching**: disable unused services/ports, default passwords changed, signed firmware, patch process tested offline.
- **Supplier requirements**: IEC 62443-4-1 (secure development) and 4-2 (component requirements) for inverters/PPC; 62443-2-4 for integrators.
- **Monitoring and response**: OT intrusion detection, logging, backups, incident-response plan coordinated with MEWRE and national authorities.

Real attacks on power grids (Ukraine 2015 and 2016) used stolen credentials and remote access to open breakers — exactly the paths above.`,
        },
        { kind: "sources", refs: ["m06-isa-iec-62443", "m06-iec-62053", "m06-iec-60255", "m06-ieee-2800"] },
        {
          kind: "md",
          md: md`### Energisation and grid-compliance testing

First energisation is the moment a construction site becomes a live power system. It is run under a **switching programme** approved by MEWRE's control centre, with formal safety rules (permits to work, sanctions for test, lock-out/tag-out) and **hold points**:

1. **Prerequisites**: mechanical completion; cold commissioning (insulation resistance, CT/VT ratio and polarity, relay secondary injection, breaker timing, SF₆ checks, earthing tests); protection settings **approved by MEWRE** and tested; SCADA point-to-point tests to the control centre; metering commissioned; energisation programme approved; site transfer to "live" safety regime.
2. **Back-feed** of the HV substation from the grid: energise 400 kV bus, then each HV transformer (inrush!), soak (often 24 h) while monitoring.
3. **Progressive energisation** of 33 kV boards, collector feeders and MV transformers.
4. **Hot commissioning**: inverters/PCS synchronised block by block; PPC closed-loop tests at low power.
5. **Grid-compliance tests** (witnessed): reactive capability at several P levels, voltage-control step tests, P set-point and ramp tests, frequency response by injected test signals, power-quality measurements, SCADA command tests.
6. **Tests on Completion / performance tests**, **trial operation** (reliability run), **COD** once PPA conditions are met.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Relay settings and metering error",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Zone-1 setting of a distance relay on a 100 km, 400 kV line",
          given: md`Line: 100 km, positive-sequence impedance magnitude 0.28 Ω/km. CT ratio 2000/1 A. VT ratio 400 kV / 110 V. Zone 1 reach = 80 % of line impedance.`,
          steps: [
            { md: md`Line impedance: $Z_L = 0.28 \times 100 = 28$ Ω primary.` },
            { md: md`Zone 1 primary reach: $0.8 \times 28 = 22.4$ Ω.` },
            { md: md`Ratios: $CTR = 2000$; $VTR = 400{,}000/110 = 3{,}636.4$; $CTR/VTR = 0.55$.` },
            { md: md`Secondary reach: $Z_{sec} = 22.4 \times 0.55 = 12.32$ Ω.` },
          ],
          result: md`Set zone 1 at **12.32 Ω secondary** (at the line angle). A common commissioning error is entering primary ohms, or using the wrong CT tap: with CTR wrongly taken as 1000, the relay would under-reach to 40 % of the line. This is why secondary injection tests and a MEWRE-approved settings file are prerequisites for energisation.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "What does a 0.2 % metering error cost?",
          given: md`A 1,100 MW PV plant with annual capacity factor 25 %. Metering chain error 0.2 % (class 0.2S meter and transformers at their limit). Illustrative tariff USD 13/MWh (Kuwait's tariff is not public). PPA term 30 years.`,
          steps: [
            {
              md: md`Annual energy: $1{,}100 \times 8{,}760 \times 0.25 = 2{,}409{,}000$ MWh ≈ 2,409 GWh.`,
              hidden: true,
              check: { prompt: "Annual energy", answer: 2409, unit: "GWh", tolerance: { rel: 0.01 } },
            },
            { md: md`Energy error: $2{,}409 \times 0.002 = 4.82$ GWh/yr.` },
            {
              md: md`Revenue error: $4{,}818 \times 13 = $ USD 62,600/yr → about USD 1.9 m over 30 years (undiscounted).`,
              hidden: true,
              check: { prompt: "Annual revenue error", answer: 62634, unit: "USD", tolerance: { rel: 0.01 } },
            },
          ],
          result: md`A 0.2 % error is worth ~USD 63 k/yr here; a class 0.5 chain would be 2.5× that, and a wrong CT ratio entered in the meter would be catastrophic. Main/check meters and periodic comparison catch drift; data access lets MEWRE audit independently.`,
        },
        {
          kind: "question",
          question: {
            id: "m06-l05-p1",
            type: "numeric",
            prompt: md`For the same line, relay and instrument transformers as the worked example, zone 2 is set to 120 % of the line impedance. What is the zone-2 reach in secondary ohms?`,
            answer: 18.48,
            unit: "Ω",
            tolerance: { rel: 0.01 },
            explanation: md`Primary: $1.2 \times 28 = 33.6$ Ω; secondary: $33.6 \times 0.55 = 18.48$ Ω. Zone 2 over-reaches into the next line, so it is time-delayed (~300–400 ms) to coordinate with that line's zone 1.`,
            concepts: ["m06.protection"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Getting interfaces, cyber and energisation right",
      blocks: [
        {
          kind: "md",
          md: md`### Interface ownership (typical; confirm per contract)

| Interface | Plant side (IPP/EPC) | MEWRE side |
|---|---|---|
| Signal list and protocol profile | Implements in gateway | Specifies, tests with control centre |
| OPGW / telecom | Substation terminal equipment | Line contractor installs OPGW (e.g. on the Shagaya–Al-Wafra line); remote-end equipment |
| Line protection | Local-end relays | Remote-end relays at the grid station; settings coordination |
| Revenue metering | Supplies/installs to MEWRE spec (or MEWRE supplies) | Owns/approves, seals, reads |
| Cyber | Plant OT security per IEC 62443 | Control-centre connection rules, DMZ, monitoring |
| Energisation | Requests, prepares, executes plant side | Approves programme, operates grid side, witnesses |

The 400 kV line and the plant are separate contracts; OPGW, remote-end protection and the grid-station bay are the classic **interface gaps**: each contractor assumes the other is responsible.`,
        },
        {
          kind: "callout",
          tone: "kuwait",
          title: "Separate contracts, shared critical path",
          md: md`Shagaya Phase III Zone 1's IPP scope includes a 400 kV substation, while MEWRE awarded the Shagaya–Al-Wafra 400 kV line separately (Power Grid Company, KD 48.6 m, March 2026). OPGW commissioning and remote-end protection at Al-Wafra therefore sit on the energisation critical path of both projects.`,
        },
        { kind: "sources", refs: ["m06-agbi-zone1-rfp", "m06-megaproject-400kv"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "Kuwaiti cyber and control-centre requirements",
          md: md`MEWRE's specific control-centre protocol profile, signal-list template and any national OT-cybersecurity regulation applicable to power plants were not found in our sources. Obtain them from MEWRE's control-centre and IT/security functions before specifying.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- Signal list agreed late; control-centre database not ready → plant cannot be dispatched at COD.
- OPGW not spliced/tested when the plant is ready; temporary telecom without teleprotection → reduced protection.
- Relay settings calculated by the EPC but never approved by MEWRE; energisation postponed on the day.
- IEC 61850 SCD file versions diverge between relay vendor and SCADA integrator.
- OEM remote access via a 4G router "for commissioning" left in place after COD.
- Meter CT ratio programmed wrongly; discovered at first invoice reconciliation.
- Compliance tests scheduled before PPC tuning is finished; repeated failures erode the control centre's trust.`,
        },
        {
          kind: "checklist",
          title: "PM energisation readiness checklist",
          items: [
            "Signal list, protocol profile and point-to-point tests with the control centre completed",
            "OPGW/telecom (main and back-up) commissioned; teleprotection end-to-end tested",
            "Protection settings approved by MEWRE, secondary injection and trip tests done, records signed",
            "Revenue metering commissioned, sealed and witnessed; CT/VT ratios verified in meter configuration",
            "Cyber: zones/conduits implemented, default credentials removed, remote access via jump host only, no undocumented modems",
            "Switching programme and energisation procedure approved; safety rules and permits in place",
            "Compliance test plan agreed with witnesses; PPC tuning completed in studies",
          ],
        },
        {
          kind: "ask",
          title: "Ask the contractor",
          items: [
            "Show me the signed point-to-point test sheets with the control centre for every signal.",
            "What is the main and back-up telecom path, and what protection degrades if one fails?",
            "Who maintains the master SCD file and how are changes controlled?",
            "List every remote-access path into the plant OT network, and how each is authorised and logged.",
            "Which IEC 62443 security level did you design to, and what evidence (4-1/4-2 certificates) do your vendors have?",
          ],
        },
        { kind: "scenario", scenario: "m06-s5" },
        {
          kind: "feynman",
          prompt: "Explain to a senior official why a solar plant that is \"finished\" cannot simply be switched on, and what has to be proven first.",
          keyPoints: [
            "Energisation makes the site part of the live national grid; faults affect others",
            "Protection must be set, approved and tested so faults are cleared quickly and selectively",
            "SCADA and telecom must work so the control centre can see and command the plant",
            "Metering must be correct because every MWh is paid for 30 years",
            "A formal switching programme and safety rules protect people; compliance tests then prove grid-code behaviour",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m06-l05-q1",
      type: "mcq",
      prompt: md`Which IEC 61850 service is used for fast peer-to-peer trip and interlock messages between IEDs?`,
      options: ["MMS", "GOOSE", "IEC 60870-5-104 ASDU", "Modbus"],
      answer: 1,
      explanation: md`GOOSE messages are multicast directly on the station Ethernet within a few milliseconds and replace hard-wired trip/interlock signals. MMS is client–server for SCADA; 104 is the telecontrol protocol to the control centre.`,
      concepts: ["m06.protocols"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m06-l05-q2",
      type: "mcq",
      prompt: md`Why is line differential (87L) preferred over distance protection as main protection for a 400 kV line connecting a large inverter-based plant?`,
      options: [
        "It needs no communication",
        "It compares currents at both ends, so it works regardless of the low and software-defined fault current from inverters",
        "It is cheaper than distance protection",
        "It also provides revenue metering",
      ],
      answer: 1,
      explanation: md`Differential protection is inherently selective and does not rely on impedance measurement, which can be distorted by limited IBR fault current. It requires a reliable fibre channel (OPGW).`,
      concepts: ["m06.protection"],
      difficulty: 2,
    },
    {
      id: "m06-l05-q3",
      type: "numeric",
      prompt: md`A 1,100 MW plant generates 2,409 GWh/yr. Metering is class 0.5 instead of 0.2S, i.e. a possible 0.5 % error. At an illustrative USD 13/MWh, what is the potential annual revenue error (USD thousand)?`,
      answer: 156.6,
      unit: "USD thousand",
      tolerance: { rel: 0.01 },
      explanation: md`$2{,}409 \times 0.005 = 12.05$ GWh; $12{,}045 \times 13 = $ USD 156.6 k/yr — 2.5× the class 0.2S case. The meter cost difference is trivial in comparison.`,
      concepts: ["m06.revenue-metering"],
      difficulty: 2,
    },
    {
      id: "m06-l05-q4",
      type: "order",
      prompt: md`Order the energisation sequence for a new PV plant's 400 kV substation and collector system.`,
      items: [
        "Cold commissioning complete; MEWRE-approved protection settings tested",
        "SCADA point-to-point tests with the control centre",
        "Back-feed energisation of 400 kV bus and HV transformers; soak period",
        "Progressive energisation of 33 kV boards, feeders and MV transformers",
        "Inverters synchronised; PPC closed-loop commissioning",
        "Witnessed grid-compliance tests, then trial operation and COD",
      ],
      explanation: md`Protection and visibility before energy; HV before MV; passive equipment before generation; control tuning before compliance tests.`,
      concepts: ["m06.energisation"],
      difficulty: 2,
    },
    {
      id: "m06-l05-q5",
      type: "multi",
      prompt: md`Which are IEC 62443-consistent controls for a PV/BESS plant? (Select all.)`,
      options: [
        "Segmenting the network into zones with controlled conduits",
        "OEM remote access via jump host with MFA and session logging",
        "A permanent 4G modem on the PPC for vendor convenience",
        "Removing default passwords and disabling unused services",
        "Requiring vendors to show IEC 62443-4-1/4-2 evidence",
      ],
      answer: [0, 1, 3, 4],
      explanation: md`Uncontrolled modems bypass every zone boundary — a classic attack path. The rest are core 62443 controls.`,
      concepts: ["m06.cybersecurity"],
      difficulty: 1,
    },
    {
      id: "m06-l05-q6",
      type: "decision",
      prompt: md`On energisation day, the EPC reports that the remote-end line protection at the grid station is not yet commissioned, but proposes to energise using only the local distance relay "with zone 1 extended to 120 %". What do you do?`,
      options: [
        { text: "Agree — schedule is critical.", score: 0, feedback: "An over-reaching zone 1 can trip for faults on adjacent lines, and without the remote end there is no proper protection of the line from the grid side." },
        { text: "Postpone energisation of the line until protection at both ends is commissioned and approved by MEWRE; re-sequence other activities and record the cause (interface delay) for contractual purposes.", score: 1, feedback: "Correct — protection is a hard prerequisite; also document who caused the delay." },
        { text: "Energise but ask the control centre to watch carefully.", score: 0, feedback: "Watching does not clear faults in 100 ms." },
      ],
      explanation: md`Energisation hold points exist to protect the grid and people. The PM's job is to enforce them and to manage the commercial consequences of interface delays.`,
      concepts: ["m06.energisation", "m06.protection"],
      difficulty: 2,
    },
    {
      id: "m06-l05-q7",
      type: "mcq",
      prompt: md`What is the main function of OPGW on the 400 kV export line?`,
      options: [
        "To increase the line's thermal rating",
        "To provide a fibre-optic path (in the earth wire) for teleprotection and SCADA while also shielding the line from lightning",
        "To measure revenue energy",
        "To reduce corona losses",
      ],
      answer: 1,
      explanation: md`Optical ground wire combines the overhead earth wire's lightning shielding with fibres for line differential protection, SCADA and telephony between plant and grid station.`,
      concepts: ["m06.scada-architecture"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "m06-l05-f1", front: "IEC 61850 services: MMS, GOOSE, SV", back: "MMS: client–server SCADA; GOOSE: fast peer-to-peer trips/interlocks; SV: digital sampled CT/VT values", concepts: ["m06.protocols"] },
    { id: "m06-l05-f2", front: "Typical plant-to-control-centre protocol", back: "IEC 60870-5-104 over TCP/IP (secured with IEC 62351)", concepts: ["m06.protocols"] },
    { id: "m06-l05-f3", front: "Distance zone 1 reach and why", back: "~80 % of line impedance, instantaneous; under-reaches to avoid tripping for faults on the next line", concepts: ["m06.protection"] },
    { id: "m06-l05-f4", front: "Secondary impedance conversion", back: md`$Z_{sec} = Z_{prim} \times CTR/VTR$`, concepts: ["m06.protection"] },
    { id: "m06-l05-f5", front: "Revenue metering classes", back: "Meter 0.2S, CT 0.2S, VT 0.2; main + check meters", concepts: ["m06.revenue-metering"] },
    { id: "m06-l05-f6", front: "IEC 62443 core idea", back: "Zones and conduits with target security levels; control every path between zones", concepts: ["m06.cybersecurity"] },
    { id: "m06-l05-f7", front: "Why IBR complicate protection", back: "Fault current limited to ~1.1–1.2 pu and sequence content set by software — distance/directional/overcurrent elements may misjudge", concepts: ["m06.protection"] },
    { id: "m06-l05-f8", front: "Three hard prerequisites before first energisation", back: "Approved and tested protection; SCADA/telecom with control centre; approved switching programme and safety rules", concepts: ["m06.energisation"] },
  ],
  scenarios: [
    {
      id: "m06-s5",
      title: "Energisation day",
      dayInLife: true,
      context: md`You are MEWRE's PM on site for the first back-feed energisation of a solar IPP's 400 kV substation. The switching programme starts at 06:00 to avoid midday heat. Present: EPC commissioning manager, IPP representative, OE, MEWRE control-centre engineer on the phone, grid-station operator at the remote end.`,
      start: "a",
      concepts: ["m06.energisation", "m06.cybersecurity", "m06.protection"],
      nodes: {
        a: {
          md: md`At 05:40 the OE notices that the protection settings file loaded in the HV transformer differential relay has a different revision number from the one MEWRE approved last week. The EPC says "only the display labels changed".`,
          choices: [
            { text: "Hold the programme for that bay: compare the loaded file against the approved one (the OE and EPC together), and proceed only when they match or MEWRE approves the change in writing.", next: "b", score: 10, feedback: "Correct: protection settings are an approval hold point; verify, don't trust." },
            { text: "Proceed — labels don't matter.", next: "c", score: 1, feedback: "You don't know that only labels changed. A wrong differential slope or CT ratio can trip on inrush or fail to trip on a fault." },
          ],
        },
        b: {
          md: md`The comparison takes 50 minutes: the CT ratio compensation was also changed (to correct an error the EPC found). MEWRE's protection engineer reviews it by phone and approves in writing. Energisation proceeds at 07:10. During the soak, the cyber checklist shows a 4G modem connected to the PPC "for OEM remote support".`,
          choices: [
            { text: "Require the modem to be disconnected before any generation is connected; OEM access only through the approved jump host; record it as a non-conformance.", next: "d", score: 10, feedback: "Right — an uncontrolled path into the plant controller is unacceptable once the plant is live." },
            { text: "Allow it until COD for convenience.", next: "d", score: 3, feedback: "Commissioning is when attackers and mistakes find the gaps; temporary paths tend to become permanent." },
          ],
        },
        c: {
          md: md`On energising the HV transformer, the differential relay trips on inrush. Investigation finds the CT ratio compensation in the loaded file was wrong. The transformer must be re-inspected before re-energisation; the programme slips a week.`,
          choices: [
            { text: "Run a formal incident review and reinforce the settings-approval hold point.", score: 4, feedback: "Necessary — the slip was avoidable by a 50-minute check." },
          ],
        },
        d: {
          md: md`By the end of the day, the substation and two MV feeders are energised. The IPP asks to start grid-compliance tests tomorrow "to keep momentum", although PPC tuning studies are not yet finished.`,
          choices: [
            { text: "Agree a sequence: complete PPC tuning and hot commissioning first, then run witnessed compliance tests per the agreed plan with the control centre's availability.", score: 10, feedback: "Compliance tests should confirm a tuned system, not debug it in front of the system operator." },
            { text: "Start tests tomorrow; failures can be repeated.", score: 4, feedback: "Repeated failures waste control-centre time and credibility." },
          ],
        },
      },
    },
  ],
};

export default lesson;
