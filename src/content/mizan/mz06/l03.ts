import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz06-l03",
  title: "SCADA architecture: RTUs, PLCs, historians, HMI, alarms and IEC 62443",
  summary:
    "The plant SCADA as the system a controls or analytics product has to live inside: field devices, RTUs, PLCs and IEDs, servers, historians and their compression, HMI and alarm management to ISA-18.2 and EEMUA 191, redundancy arithmetic, and IEC 62443 (zones and conduits, foundational requirements, security levels, the parts that apply to owners, integrators and product vendors). Ends with how a third-party product gets data out safely, which is the first question any plant owner will ask Mizan.",
  minutes: 80,
  objectives: [
    "You can sketch a hybrid plant's SCADA from field devices to the control centre and say what RTUs, PLCs, IEDs and historians each do.",
    "You can size historian storage and explain how compression can erase an analytics signal.",
    "You can compute alarm rates per operator and judge them against ISA-18.2 and EEMUA 191 benchmarks.",
    "You can compute availability of redundant servers and explain why common-cause failures break the formula.",
    "You can apply IEC 62443 zones, conduits, security levels and the 4-1 and 4-2 product requirements to a third-party analytics product.",
  ],
  concepts: [
    {
      id: "mz06.scada-components",
      name: "SCADA components: RTU, PLC, IED, servers, HMI",
      description:
        "RTUs concentrate and telemeter data (often to the control centre); PLCs run deterministic local logic (trackers, auxiliaries, BESS balance of plant); IEDs are protection and metering relays; SCADA servers, HMI and historians sit at plant level.",
      competency: "mz-control",
      related: ["m06.scada-architecture", "m06.protocols"],
    },
    {
      id: "mz06.historian",
      name: "Historian and data compression",
      description:
        "Time-series database of tags with timestamps and quality; exception (deadband) and swinging-door compression reduce storage but can remove slow signals such as soiling trends.",
      competency: "mz-control",
      related: ["mz06.scada-components", "m12.monitoring-system"],
    },
    {
      id: "mz06.alarm-management",
      name: "Alarm management (ISA-18.2, EEMUA 191)",
      description:
        "Alarm lifecycle (philosophy, rationalisation, implementation, monitoring), performance benchmarks per operator, floods, chattering and stale alarms; dust storms and tracker communications create floods on PV plants.",
      competency: "mz-control",
      related: ["mz06.scada-components"],
    },
    {
      id: "mz06.redundancy",
      name: "Redundancy and availability",
      description:
        "Hot-standby servers, redundant networks (RSTP, PRP, HSR), dual POI meters and gateways; availability of n parallel units 1-(1-A)^n, degraded by common-cause failures.",
      competency: "mz-control",
      related: ["mz06.scada-components"],
    },
    {
      id: "mz06.iec62443",
      name: "IEC 62443 for plant control systems",
      description:
        "Zones and conduits, seven foundational requirements, security levels SL1 to SL4, Purdue-style levels with a DMZ, and the split of duties: 2-1 owner, 2-4 integrator, 3-2 and 3-3 system, 4-1 and 4-2 product vendor.",
      competency: "mz-control",
      related: ["m06.cybersecurity"],
    },
    {
      id: "mz06.third-party-data-access",
      name: "Third-party data access path",
      description:
        "How an external analytics product receives plant data without creating an attack path: replicated historian or broker in the DMZ, outbound-only or one-way (data diode) transfer, read-only by default, write paths only through a defined, tested interface.",
      competency: "mz-control",
      related: ["mz06.iec62443", "mz06.historian"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "The system your product must live inside",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Mizan's products run on plant data and, for stow and tracker control, eventually write commands back. The first meeting with any plant owner, including KISR for the Shagaya Phase I pilot being prepared, will turn to two questions: where does your data come from, and how do you get in without opening a hole in our control system? Answering them well (historian replication in a DMZ, read-only, IEC 62443 language) makes a pilot easy to approve. Answering them badly ends the conversation regardless of how good the soiling model is.`,
        },
        {
          kind: "xref",
          to: "m06-l05",
          note: "Track 0 covers the plant-to-control-centre SCADA architecture, IEC 61850 and IEC 60870-5-104, protection, revenue metering, IEC 62443 basics and energisation from the owner's side. This lesson adds the components, the data and the vendor's obligations. Mizan module 9 (plant data pipelines) goes deeper into tags, Modbus and OPC UA.",
        },
        {
          kind: "md",
          md: md`### Components and what each one is for

| Component | What it does | Where on a hybrid plant |
|---|---|---|
| **Field devices** | Inverters, PCS, BMS, tracker controllers, met and soiling stations, meters | PV blocks, BESS yard, met masts |
| **IED** (intelligent electronic device) | Protection relay, bay controller, power quality meter, speaking IEC 61850 | Substation, MV switchgear |
| **PLC** | Deterministic scan-cycle logic (IEC 61131-3): interlocks, sequences, local control | Tracker network controllers, BESS auxiliaries and HVAC, substation auxiliaries |
| **RTU** | Collects and telemeters data, protocol conversion, built for remote, harsh sites; to the control centre via IEC 60870-5-104 | Substation gateway to MEWRE |
| **Data logger / gateway** | Polls inverters and sensors in each block, buffers on comms loss | Each PV block |
| **SCADA servers** | Polling engine, tag database, control logic, redundancy | Plant control building |
| **Historian** | Long-term time-series storage, compression, retrieval | Plant level, often replicated to a DMZ or corporate level |
| **HMI** | Operator screens, trends, commands, alarm list | Control room and remote operations centre |
| **PPC and EMS** | Plant control (lessons 1 and 2) | Plant level, often their own redundant hardware |

The RTU/PLC distinction has blurred: modern RTUs run IEC 61131-3 logic and modern PLCs speak telecontrol protocols. What matters is the role: telemetry to an outside party, or deterministic local control.

### Historians and compression

A large PV plant has tens of thousands of tags: every inverter (power, voltages, currents, temperatures, status words), every tracker row (angle, motor current, battery, comms), strings or combiner currents, met and soiling stations. Storage per day:`,
        },
        { kind: "equation", formula: "mz06-historian-volume" },
        {
          kind: "md",
          md: md`Historians compress by **exception** (store a new value only if it differs from the last stored value by more than a deadband) and by **swinging-door** algorithms (store only the points needed to reconstruct the trend within a tolerance). Compression ratios of 5 to 20 are common. For an operator, a 1 % deadband on inverter power is invisible. For a soiling analytics product looking for a trend of 0.2 to 0.5 % per day hidden in noise, it can erase the signal, so **the deadband settings on the tags you use are part of your data requirements**.

Also check **timestamps** (where are they applied: at the device or at the server?), **time synchronisation** (GPS or PTP; drift between met station and inverters ruins irradiance-normalised ratios) and **quality flags** (bad, substituted, stale values must be filtered, not averaged).

### Alarm management

Operators of large PV plants drown in alarms. ISA-18.2 (IEC 62682) and EEMUA 191 define a lifecycle: an **alarm philosophy**, **rationalisation** (every alarm must have a defined operator action, consequence and priority), implementation, and **monitoring** of performance:`,
        },
        { kind: "equation", formula: "mz06-alarm-rate" },
        {
          kind: "md",
          md: md`| Metric (per operator) | Benchmark |
|---|---|
| Average alarm rate | about 1 per 10 min very likely acceptable; about 2 per 10 min maximum manageable |
| Alarm flood | more than 10 alarms in 10 minutes |
| Priority distribution | roughly 80 % low, 15 % medium, 5 % high |
| Chattering and stale alarms | none should persist; tracked and fixed |

On PV plants in the Gulf, **dust storms** produce floods: tracker controllers lose radio links, rows report position faults during stow, soiling stations flag, inverters derate on temperature. A flood hides the alarm that matters (a transformer trip). Suppression by state ("plant in storm stow") is the standard fix, and any Mizan stow function must publish that state.

### Redundancy`,
        },
        { kind: "equation", formula: "mz06-parallel-availability" },
        {
          kind: "md",
          md: md`Plants duplicate SCADA servers (hot standby), PPCs, gateways to the control centre, POI meters, and network paths (fibre rings with RSTP, or PRP and HSR in substations). The formula assumes independent failures. A shared firmware bug, a single UPS or both servers in one dusty cabinet with a failed air conditioner are **common-cause** failures that defeat it.

### IEC 62443 in one page

| Idea | Meaning |
|---|---|
| **Zones and conduits** | Group assets with similar criticality (protection, plant control, BESS, tracker network, DMZ, corporate) and control every path between them |
| **Seven foundational requirements (FR)** | Identification and authentication control, use control, system integrity, data confidentiality, restricted data flow, timely response to events, resource availability |
| **Security levels SL1 to SL4** | Target protection against casual misuse (SL1) up to state-level attackers (SL4); SL2 to SL3 typical for transmission-connected plants |
| **2-1** | Asset owner's security programme |
| **2-4** | Requirements on service providers and integrators |
| **3-2** | Risk assessment, defining zones, conduits and target SLs |
| **3-3** | System security requirements per SL |
| **4-1** | Secure product development lifecycle (for vendors like Mizan) |
| **4-2** | Technical security requirements for components (software applications, embedded devices, hosts, network devices) |

The common reference architecture is Purdue-style:`,
        },
        {
          kind: "flow",
          title: "Purdue-style levels on a PV+BESS plant",
          steps: [
            { label: "Level 0-1: process and basic control", detail: "Inverters, PCS, BMS, tracker motors and controllers, relays, sensors" },
            { label: "Level 2: supervisory control", detail: "SCADA servers, HMI, PPC, EMS, plant historian" },
            { label: "Level 3: site operations", detail: "Engineering workstations, site historian, patch server" },
            { label: "Level 3.5: OT DMZ", detail: "Replicated historian, remote-access jump host, data broker for third parties" },
            { label: "Level 4-5: enterprise and cloud", detail: "Corporate IT, asset management, vendor cloud analytics" },
          ],
          caption: "Traffic never crosses the DMZ directly: each side talks only to servers in it. A third-party analytics product reads from Level 3.5, not from Level 2.",
        },
        { kind: "sources", refs: ["mz06-r5", "mz06-r6", "mz06-r7", "mz06-r8", "mz06-r9"] },
      ],
    },
    {
      layer: "applied",
      title: "Historian, alarm and availability arithmetic",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Historian sizing for a large PV plant",
          given: md`Illustrative: 60,000 tags sampled every 1 s, 12 bytes per stored value (value, timestamp, quality), compression ratio 10.`,
          steps: [
            { md: md`Raw values per day: $60{,}000 \times 86{,}400 = 5.18 \times 10^9$.` },
            { md: md`Raw bytes: $5.18 \times 10^9 \times 12 = 62.2$ GB/day.` },
            { md: md`Compressed: $62.2/10 = 6.22$ GB/day.` },
            { md: md`Per year: $6.22 \times 365 = 2{,}271$ GB, about 2.3 TB.` },
          ],
          result: md`Storage is cheap; the binding constraints are **network bandwidth out of the plant** (6 GB/day is about 0.6 Mbit/s averaged, fine; a full raw backfill of a year is not), the **owner's willingness to replicate** to a DMZ, and **compression settings** on the tags a soiling model needs. Ask for 1 to 5 minute averages of the tags you need plus raw data for a sample of blocks, not everything.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Is this control room overloaded?",
          given: md`Illustrative: a hybrid plant logs 1,500 alarms on a normal day; two operators share the console. On a dust-storm day, 2,000 tracker rows report communication loss within 10 minutes.`,
          steps: [
            {
              md: md`Normal day: $\lambda = 1{,}500 / (2 \times 144) = 5.2$ alarms per operator per 10 min.`,
              hidden: true,
              check: { prompt: "Alarms per operator per 10 minutes", answer: 5.21, unit: "per 10 min", tolerance: { rel: 0.02 } },
            },
            { md: md`Against the benchmark of about 1 (acceptable) and 2 (maximum manageable), that is more than twice the manageable rate before any storm.` },
            {
              md: md`Storm: $2{,}000/2 = 1{,}000$ alarms per operator in 10 minutes, 100 times the flood threshold of 10.`,
              hidden: true,
              check: { prompt: "Alarms per operator in the storm's 10 minutes", answer: 1000, unit: "alarms", tolerance: { rel: 0.01 } },
            },
          ],
          result: md`Rationalise (remove alarms with no operator action), group tracker alarms by block, and **suppress by state** when the plant is in storm stow. A Mizan stow function that publishes "storm stow active, blocks X to Y" is also an alarm-management feature, and saying so is a good sales line for operators.`,
        },
        {
          kind: "question",
          question: {
            id: "mz06-l03-p1",
            type: "numeric",
            prompt: md`A SCADA server has availability 0.995. With a hot-standby pair (independent failures, perfect switchover), how many minutes per year is the SCADA expected to be unavailable?`,
            answer: 13.1,
            unit: "min/yr",
            tolerance: { rel: 0.02 },
            explanation: md`$1 - A_{sys} = 0.005^2 = 2.5 \times 10^{-5}$. Downtime $= 2.5 \times 10^{-5} \times 8{,}760 \times 60 = 13.1$ min/yr, against 43.8 h/yr for a single server. Real pairs do worse because of common-cause failures and imperfect switchover.`,
            concepts: ["mz06.redundancy"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Getting a third-party product into the plant safely",
      blocks: [
        {
          kind: "md",
          md: md`### The access patterns, from easiest to approve to hardest

| Pattern | How it works | Approval effort |
|---|---|---|
| **Data export** | Owner exports CSV or historian extracts on a schedule | Trivial; fine for a validation study, useless for control |
| **DMZ replication, outbound push** | Historian replicates to a DMZ server; a connector pushes selected tags outbound to the vendor's environment | Moderate; common for analytics |
| **One-way gateway (data diode)** | Hardware enforces one-way flow out of the plant | Strong for read-only; no write-back possible by design |
| **On-premise analytics in the DMZ** | Vendor software runs on a server in the DMZ; results shown on HMI or exported | Moderate to high; useful when data may not leave the country or site |
| **Write-back interface** | Commands (stow schedules, availability profiles) to the tracker controller or PPC through a defined conduit | Highest; needs 62443 risk assessment, FAT and SAT, change management |

Start read-only. Write-back comes after the owner trusts the read-only product and the interface has been specified (lesson 1) and tested (lesson 4).

### What the owner will ask a vendor (and what Mizan must prepare)

- A **security questionnaire** mapped to IEC 62443-4-1 (how you develop: threat modelling, code review, vulnerability handling, patch policy) and 4-2 (what the product does: authentication, logging, encryption, least privilege).
- A **data flow diagram**: which tags, which direction, which zone, which conduit, at what rate.
- **Remote access** rules: no standing VPN; access through the owner's jump host, MFA, session recording, time-limited approval.
- **Data residency**: whether data may leave Kuwait, and where it is stored and processed.
- **Incident response**: who you call, how fast, what you log.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- Vendor asks for a **permanent VPN** into Level 2 "for support": instant rejection by any competent owner.
- **Tag naming chaos**: thousands of tags with inconsistent names across blocks and vendors; weeks of mapping before any analytics.
- **No time sync** between met station logger and inverter data loggers: minutes of offset ruin irradiance-normalised ratios.
- **Compression and averaging hide the signal**: 15-minute averages with 1 % deadbands on power.
- **Alarm floods in dust storms** bury the important alarm.
- **Shared accounts and default passwords** on tracker controllers and loggers.`,
        },
        {
          kind: "checklist",
          title: "Mizan's data-access pack for any pilot",
          items: [
            "One-page data flow diagram: tags, direction (read-only), zone, conduit, rate, retention.",
            "Tag list with required sampling, averaging and deadband, and why each tag is needed.",
            "Statement of where data is processed and stored, and data residency options (including on-premise in the DMZ).",
            "IEC 62443-4-1 and 4-2 self-assessment, with gaps and dates to close them.",
            "Remote-access policy compatible with the owner's jump host and MFA.",
            "Time synchronisation and quality-flag requirements for the data delivered.",
          ],
        },
        {
          kind: "ask",
          title: "Questions for the plant owner or SCADA integrator",
          items: [
            "Which historian do you run, and do you already replicate to a DMZ?",
            "What deadband and compression apply to inverter power, POA irradiance and soiling station tags?",
            "How are clocks synchronised across met stations, loggers and SCADA servers?",
            "What is your current alarm rate per operator, and what happens to alarms during a dust storm?",
            "Which IEC 62443 security level have you targeted for the plant control zone, and what do you require from software vendors?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "mz06-l03-p2",
            type: "short",
            prompt: md`Write the **data access and cybersecurity section** (about half a page) of Mizan's proposal for the soiling analytics pilot being prepared with KISR at Shagaya Phase I. State what data Mizan needs, how it gets out of the plant, what Mizan will never do, and how the approach maps to IEC 62443. Do not describe the pilot as signed or running.`,
            rubric: [
              "Lists the data needed (inverter or block power, POA irradiance, module temperature, ambient, soiling station if present, cleaning logs) with resolution and period, including historic data for the 2018 to 2019 cleaning-arm failure period.",
              "Chooses a read-only path: scheduled export or DMZ replication with outbound-only push, or on-premise processing; no inbound connection into control zones.",
              "States explicit prohibitions: no write access, no standing VPN, no changes to SCADA or compression settings without the owner's approval.",
              "Uses IEC 62443 vocabulary correctly: zones, conduits, DMZ, least privilege, and offers the 4-1/4-2 self-assessment.",
              "Addresses data residency, retention and deletion, and confidentiality of KISR data and co-authored results.",
              "Describes the pilot as in preparation or proposed.",
            ],
            modelAnswer: md`**Data access and cybersecurity (proposed pilot, in preparation).** *Data required:* for the PV plant, 5-minute or finer AC power per inverter, POA irradiance, module and ambient temperature, wind speed, any soiling station output, and cleaning logs, from commissioning to date, including 2018 to 2019 when the cleaning arm failed. *Path:* phase 1 uses scheduled read-only exports from the KISR historian, delivered by KISR on encrypted media or by secure file transfer; no connection into the plant network. If a live phase follows, data would be replicated to a server in KISR's OT DMZ and pushed outbound only to Mizan's environment, or Mizan software would run on that DMZ server so data never leaves KISR. *Never:* Mizan will have no write access to any control system, no standing VPN, and will request no change to SCADA, compression or alarm settings without KISR's written approval. *IEC 62443 mapping:* Mizan sits in the enterprise zone or the DMZ, connected through a single conduit with restricted data flow (FR5) and least-privilege accounts (FR1, FR2); remote access, if ever needed, only through KISR's jump host with MFA. Mizan will provide an IEC 62443-4-1 and 4-2 self-assessment with gaps and dates. *Data handling:* data stored in an agreed jurisdiction (in Kuwait if KISR requires), used only for the pilot and joint publication, deleted or returned at the end; publication of results subject to KISR's approval as methodology partner.`,
            explanation: md`Owners approve pilots that ask for little, move data one way, write nothing and speak the owner's security language. A phased path (export first, DMZ later) also lets the validation work start before any network change.`,
            concepts: ["mz06.third-party-data-access", "mz06.iec62443", "mz06.historian"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a non-technical KISR manager why Mizan asks for data to be copied to a DMZ rather than connecting directly to the plant SCADA.",
          keyPoints: [
            "The control network is separated into zones; the DMZ is a buffer between plant control and outside networks.",
            "Outside parties only reach servers in the DMZ, never the controllers.",
            "Data flows one way, out of the plant; no command path exists.",
            "This follows IEC 62443 practice and limits the damage if Mizan's systems were compromised.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz06-l03-q1",
      type: "mcq",
      prompt: "On a hybrid plant, which device most typically runs the deterministic interlock logic of the BESS auxiliaries and HVAC?",
      options: ["The historian", "A PLC", "The HMI", "The revenue meter"],
      answer: 1,
      explanation: md`PLCs run scan-cycle logic programmed in IEC 61131-3 languages for interlocks and sequences. RTUs focus on telemetry, historians store data, HMIs display.`,
      concepts: ["mz06.scada-components"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz06-l03-q2",
      type: "numeric",
      prompt: md`Three operators share a console that logs 2,160 alarms per day. What is the average alarm rate per operator per 10 minutes?`,
      answer: 5,
      unit: "per 10 min",
      tolerance: { rel: 0.02 },
      explanation: md`$2{,}160 / (3 \times 144) = 5.0$, more than twice the "maximum manageable" benchmark of about 2.`,
      concepts: ["mz06.alarm-management"],
      difficulty: 1,
    },
    {
      id: "mz06-l03-q3",
      type: "multi",
      prompt: "Which IEC 62443 parts place obligations on a software product vendor such as Mizan?",
      options: ["62443-4-1 secure development lifecycle", "62443-4-2 component technical requirements", "62443-2-1 asset owner security programme", "62443-3-2 risk assessment for zones and conduits"],
      answer: [0, 1],
      explanation: md`4-1 and 4-2 apply to product suppliers. 2-1 is the owner's programme and 3-2 the system-level risk assessment, though vendors should understand both.`,
      concepts: ["mz06.iec62443"],
      difficulty: 2,
    },
    {
      id: "mz06-l03-q4",
      type: "order",
      prompt: "Order these from closest to the process to furthest from it.",
      items: ["Tracker motor controller", "SCADA server and PPC", "Site engineering workstation", "DMZ historian replica", "Vendor cloud analytics"],
      explanation: md`Purdue-style levels 1, 2, 3, 3.5 and 4/5. Third-party analytics reads from the DMZ.`,
      concepts: ["mz06.iec62443", "mz06.third-party-data-access"],
      difficulty: 1,
    },
    {
      id: "mz06-l03-q5",
      type: "mcq",
      prompt: "Why can historian compression matter more to a soiling analytics product than to an operator?",
      options: [
        "Compression corrupts timestamps.",
        "Deadbands sized for operators can remove slow trends of a fraction of a percent per day that the soiling model needs.",
        "Compressed data cannot be exported.",
        "Compression only applies to alarms.",
      ],
      answer: 1,
      explanation: md`A 1 % deadband is invisible to an operator but comparable to several days of soiling loss.`,
      concepts: ["mz06.historian"],
      difficulty: 2,
    },
    {
      id: "mz06-l03-q6",
      type: "decision",
      prompt: md`Illustrative. During pilot preparation your engineering partner proposes a permanent VPN from Mizan's office into the plant SCADA network "to save time". What do you do?`,
      options: [
        { text: "Accept: it is faster and you will be careful.", score: 0, feedback: "A standing inbound path into control zones is the classic attack route and will be rejected by any competent owner; asking for it damages trust." },
        { text: "Propose read-only exports first, then DMZ replication with outbound push, and use the owner's jump host with MFA if remote access is ever needed.", score: 1, feedback: "Matches IEC 62443 practice and makes the pilot easy to approve." },
        { text: "Ask the owner to open the VPN only during working hours.", score: 0.3, feedback: "Better than permanent, but still an inbound path to Level 2 under Mizan's control rather than the owner's." },
      ],
      explanation: md`Start read-only and one-way; let the owner control any remote access.`,
      concepts: ["mz06.third-party-data-access", "mz06.iec62443"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "mz06-l03-f1", front: "RTU vs PLC", back: "RTU: telemetry and protocol conversion to remote parties (e.g. IEC 60870-5-104). PLC: deterministic local logic (IEC 61131-3). Roles have blurred.", concepts: ["mz06.scada-components"] },
    { id: "mz06-l03-f2", front: "Historian storage per day", back: md`$D = N_{tags}\cdot(86{,}400/T_s)\cdot b / CR$; 60k tags at 1 s, 12 B, CR 10 is about 6.2 GB/day.`, concepts: ["mz06.historian"] },
    { id: "mz06-l03-f3", front: "Alarm-rate benchmarks per operator", back: "About 1 per 10 min acceptable, about 2 maximum manageable, more than 10 in 10 min is a flood (ISA-18.2, EEMUA 191).", concepts: ["mz06.alarm-management"] },
    { id: "mz06-l03-f4", front: "Availability of n redundant units", back: md`$A_{sys} = 1-(1-A)^n$; assumes independent failures, broken by common causes.`, concepts: ["mz06.redundancy"] },
    { id: "mz06-l03-f5", front: "IEC 62443 parts for a product vendor", back: "4-1 secure development lifecycle; 4-2 component technical security requirements.", concepts: ["mz06.iec62443"] },
    { id: "mz06-l03-f6", front: "Seven IEC 62443 foundational requirements", back: "Identification and authentication, use control, system integrity, data confidentiality, restricted data flow, timely response to events, resource availability.", concepts: ["mz06.iec62443"] },
    { id: "mz06-l03-f7", front: "Easiest data path to approve for an analytics pilot", back: "Scheduled read-only exports, then DMZ replication with outbound-only push; no inbound path to control zones.", concepts: ["mz06.third-party-data-access"] },
  ],
};

export default lesson;
