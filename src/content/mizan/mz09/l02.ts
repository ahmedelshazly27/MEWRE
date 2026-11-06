import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz09-l02",
  title: "Protocols a seller must understand: Modbus, OPC UA, IEC 61850, DNP3 and MQTT",
  summary:
    "What each industrial protocol in a PV plant carries, who talks to whom, where timestamps come from, how fast data can move, and what each one means for security. Modbus registers and polling budgets, OPC UA information models and certificates, IEC 61850 and DNP3 at the substation and utility edge, and MQTT as the outbound, firewall-friendly route to the cloud. Ends with how to answer an OT security officer.",
  minutes: 75,
  objectives: [
    "Say for each of Modbus RTU and TCP, OPC UA, IEC 61850, DNP3 and MQTT what it carries, where it sits in a plant and how it handles timestamps and security",
    "Decode Modbus register values (scale factors, 32-bit word order) and compute a serial polling cycle",
    "Explain why polling protocols cap data resolution and why MQTT suits edge-to-cloud links",
    "Describe a read-only, outbound-only data access design that an OT security officer can approve",
  ],
  concepts: [
    { id: "mz09.modbus", name: "Modbus RTU and Modbus TCP", description: "Master-slave register protocol on RS-485 or Ethernet (port 502): 16-bit registers, function codes, polling, no timestamps and no security.", competency: "mz-data", related: ["m06.protocols"] },
    { id: "mz09.opc-ua", name: "OPC UA", description: "Platform-independent industrial interoperability standard (IEC 62541): browseable information model, subscriptions with source timestamps and quality, certificate-based security.", competency: "mz-data", related: ["m06.protocols"] },
    { id: "mz09.utility-protocols", name: "IEC 61850 and DNP3 at the plant edge", description: "Substation and utility protocols: IEC 61850 (object model, MMS, GOOSE) and DNP3 (event-driven telemetry with time-stamped events), alongside IEC 60870-5-104 to control centres.", competency: "mz-data", related: ["m06.protocols", "m06.scada-architecture"] },
    { id: "mz09.mqtt", name: "MQTT", description: "Lightweight publish-subscribe protocol through a broker, with outbound client connections, QoS levels and TLS; Sparkplug adds an industrial topic and payload convention.", competency: "mz-data" },
    { id: "mz09.ot-security", name: "Read-only, outbound-only OT data access", description: "Design pattern in which analytics reads from a replica or gateway in a DMZ, never writes to control devices, and only initiates outbound encrypted connections.", competency: "mz-data", related: ["m06.cybersecurity", "fc04.security-review"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Five protocols, what they carry and what they expose",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You will not configure a Modbus driver. But in every Mizan deal an O&M engineer will ask "do you read Modbus or OPC UA?" and an OT security officer will ask "what do you connect to, and can you write to anything?" A wrong answer ("we connect directly to the inverters from our cloud") ends the deal. The right answer ("read-only from your historian replica in the DMZ, outbound TLS only, no write path") gets you to the pilot.`,
        },
        {
          kind: "md",
          md: md`### Four questions to ask of any protocol

1. **Who starts the conversation?** Polling (master asks, slave answers), report by exception (device sends on change), or publish-subscribe through a broker.
2. **What is the data model?** Raw numbered registers, or named objects with units and quality?
3. **Where does the timestamp come from?** From the device at the moment of measurement, or from the poller when the answer arrived?
4. **What security is built in?** None, optional, or mandatory authentication and encryption?

### Modbus: the lingua franca of field devices

Modbus (1979, now maintained by the Modbus Organization) is on almost every inverter, met logger, tracker controller and meter. **Modbus RTU** runs on RS-485 serial lines; **Modbus TCP** carries the same messages over Ethernet on TCP port 502.

- **Model**: four tables of numbered items. Coils (read-write bits), discrete inputs (read-only bits), input registers (read-only 16-bit words), holding registers (read-write 16-bit words). Function code 03 reads holding registers, 04 input registers, 06 and 16 write. One read returns at most **125 registers**.
- **No units, no names**: register 40083 means whatever the vendor's register map says, for that firmware version. Values are 16-bit integers: anything bigger (a 32-bit energy counter, an IEEE 754 float) spans two registers, and vendors disagree on **word order**. Many use **scale factors**: the SunSpec Alliance models used by many inverter makers store a value and a separate power-of-ten scale-factor register.
- **Addressing traps**: documentation may number registers from 1 (40001) while the protocol counts from 0, so off-by-one reads return the neighbouring value, which can look plausible.
- **Polling**: the master asks each slave in turn. On a serial bus only one conversation happens at a time, so the refresh rate of every tag is limited by the sum of all poll times.
- **Timestamps**: none. The time is when the poller received the answer.
- **Security**: none. Any device that can reach port 502 can read **and write** any register the device exposes: including active power limits and on/off commands. A Modbus/TCP Security variant with TLS exists but is rare in field devices.`,
        },
        { kind: "equation", formula: "mz09-modbus-rtu-poll" },
        { kind: "equation", formula: "mz09-bus-cycle" },
        {
          kind: "md",
          md: md`### OPC UA: the modern plant-level standard

**OPC UA** (OPC Unified Architecture, IEC 62541) replaced classic OPC DA, which depended on Windows DCOM and was notoriously hard to secure across firewalls.

- **Model**: a browseable **address space** of nodes with names, data types, engineering units and relationships ("Inverter07 has component MPPT04, which has variable DC current in A"). A client can discover what a server offers without a separate register map.
- **Communication**: client-server on TCP (default port 4840) with **subscriptions**: the client asks to be notified when a monitored item changes beyond a deadband, so traffic follows change rather than fixed polling. A PubSub mode (including over MQTT) also exists.
- **Timestamps and quality**: every value carries a **source timestamp**, a server timestamp and a status code. That is exactly what analytics wants.
- **Security**: built in. Security modes None, Sign, and SignAndEncrypt; applications authenticate with X.509 certificates; users with passwords or certificates. The weak point in practice is configuration: servers left in mode None, or certificates trusted automatically.

SCADA servers, PPCs, edge gateways and historians increasingly expose OPC UA, which makes it the natural interface for a third-party analytics reader **at the SCADA level**, rather than going to the devices.

### IEC 61850 and DNP3: the utility edge

These live at the substation and the link to the grid operator. The seller needs to recognise them, not engineer them.

- **IEC 61850**: object model of logical nodes (MMXU for measurements, XCBR for a breaker), MMS client-server reporting, GOOSE for fast peer-to-peer trips, and SCL configuration files. **IEC 61850-7-420** extends the model to distributed energy resources (PV, storage), so newer PPCs and some inverters speak it. Values carry timestamps and quality.
- **DNP3** (IEEE 1815): telemetry protocol from North American utilities. Outstations buffer **time-stamped events** and report them (also unsolicited), so a communication outage does not lose the sequence of events. Secure Authentication (SAv5) adds message authentication but is not universally deployed.
- **IEC 60870-5-104**: the common European and Middle Eastern choice from plant to control centre (Track 0, m06).`,
        },
        { kind: "xref", to: "m06-l05", note: "Track 0 covers SCADA architecture to the national control centre, IEC 61850 services, IEC 60870-5-104 and IEC 62443 zones and conduits. This lesson adds the analytics-reader view." },
        {
          kind: "md",
          md: md`### MQTT: from site to cloud

**MQTT** (OASIS standard, version 5.0 in 2019) is a small publish-subscribe protocol. Clients connect **outward** to a **broker** and publish messages on topics (for example shg1/b03/inv07/pac); other clients subscribe.

- **Why it suits edge-to-cloud**: the site gateway opens an outbound TLS connection (port 8883) to the broker. No inbound port is opened in the plant firewall, which is the single most important property for an OT security review.
- **Delivery**: QoS 0 (at most once), 1 (at least once, duplicates possible), 2 (exactly once). Retained messages give a late subscriber the last value; a "last will" message signals that a gateway dropped off.
- **Model**: none. Payloads are bytes; teams choose JSON or a binary format. **Sparkplug** (Eclipse Foundation) adds a topic namespace, protobuf payloads, birth and death certificates and state management for industrial use.
- **Security**: TLS and username/password or client certificates, if configured. Port 1883 is plaintext and should never cross the internet.

### Side by side`,
        },
        {
          kind: "md",
          md: md`| | Modbus RTU / TCP | OPC UA | IEC 61850 | DNP3 | MQTT |
|---|---|---|---|---|---|
| **Typical place** | Inverters, loggers, trackers, meters | SCADA, PPC, gateways, historians | Substation IEDs, PPC, newer DER | Utility telemetry, some plants | Edge gateway to cloud |
| **Pattern** | Polling | Client-server subscriptions, PubSub | Client-server reports, GOOSE multicast | Polling plus unsolicited events | Publish-subscribe via broker |
| **Data model** | Numbered registers | Rich, browseable, typed | Standard logical nodes | Indexed points by type | None (Sparkplug adds one) |
| **Timestamp** | At poller | At source | At source | At source for events | Whatever the payload carries |
| **Built-in security** | None | Certificates, sign and encrypt | Via IEC 62351 | SAv5 if enabled | TLS if enabled |
| **Port (default)** | 502 (TCP) | 4840 | 102 (MMS) | 20000 | 1883, 8883 TLS |
| **Seller's takeaway** | Never connect directly; read upstream | Best SCADA-level interface | Recognise; usually not your source | Recognise; events keep timing | Use for outbound link |`,
        },
        {
          kind: "flow",
          title: "A read-only data path an OT security officer can approve",
          steps: [
            { label: "Field devices", detail: "Inverters, met, trackers on Modbus or IEC 61850 (control zone)" },
            { label: "SCADA and historian", detail: "Plant control zone; Mizan never touches this" },
            { label: "Historian replica or OPC UA server in DMZ", detail: "Fed one way from the plant historian, optionally through a unidirectional gateway" },
            { label: "Edge gateway (DMZ)", detail: "Reads only from the replica; buffers locally" },
            { label: "Outbound TLS (MQTT or HTTPS)", detail: "No inbound ports opened" },
            { label: "Analytics environment", detail: "Cloud tenant or on-prem server; reports go back by email or a web portal" },
          ],
          caption: "No path exists from the analytics environment back to any device that can be commanded. That single property answers most security objections.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Registers, word order and polling budgets",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Decoding inverter registers and checking whether 1 second data is possible",
          given: md`Illustrative inverter register map (not a specific vendor). AC power: register value 3,125, scale factor register 2. Total energy: 32-bit unsigned counter in two registers, values 0x0003 and 0x0D40 (3 and 3,392). An RS-485 bus at 9,600 baud carries 30 such inverters; each poll reads 50 registers; 11 bits per character; device latency 50 ms.`,
          steps: [
            { md: md`**Scale factor.** $P = 3{,}125 \times 10^{2} = 312{,}500$ W $= 312.5$ kW. Reading the register without its scale factor gives 3.1 kW: a 100-fold error that looks like a dead inverter.` },
            { md: md`**Word order.** High word first: $3 \times 65{,}536 + 3{,}392 = 200{,}000$ kWh, plausible for a 320 kW inverter after a few years. Swapped: $3{,}392 \times 65{,}536 + 3 = 222{,}298{,}115$ kWh, absurd. Always sanity-check a decoded counter against nameplate times hours.` },
            { md: md`**One poll.** Frame bytes: request 8, response $5 + 2 \times 50 = 105$, total 113. Transmission $113 \times 11/9{,}600 = 0.129$ s; two silent intervals $2 \times 3.5 \times 11/9{,}600 = 0.008$ s; latency 0.05 s. $t_{poll} = 0.1875$ s.` },
            { md: md`**Bus cycle.** $T_{cycle} = 30 \times 0.1875 = 5.6$ s. The best possible refresh of any tag on this bus is about 6 seconds, before retries and timeouts.` },
          ],
          result: md`Scale factors and word order cause errors of 100 times or a million times; both are caught by plausibility checks. A 9,600 baud bus of 30 inverters refreshes each tag every 5 to 6 seconds at best: asking that plant for "1 second inverter data" asks for data that never existed.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: the same bus at 19,200 baud",
          given: md`Same 30 inverters, 50 registers per poll, 11 bits per character, 50 ms latency, but the bus runs at 19,200 baud.`,
          steps: [
            { md: md`Transmission time per poll: $113 \times 11/19{,}200 = 0.0647$ s; silent intervals $77/19{,}200 = 0.0040$ s.` },
            { md: md`$t_{poll} = 0.0647 + 0.0040 + 0.05$.`, hidden: true, check: { prompt: "Poll time per inverter", answer: 0.1188, tolerance: { rel: 0.02 }, unit: "s" } },
            { md: md`$T_{cycle} = 30 \times t_{poll}$.`, hidden: true, check: { prompt: "Bus cycle time", answer: 3.56, tolerance: { rel: 0.02 }, unit: "s" } },
          ],
          result: md`Doubling the baud rate does not halve the cycle (3.6 s instead of 5.6 s) because device latency does not shrink. Fewer devices per bus, or Modbus TCP, is the real fix.`,
        },
        {
          kind: "question",
          question: {
            id: "mz09-l02-p1",
            type: "numeric",
            prompt: md`On the 9,600 baud bus of the worked example ($t_{poll} = 0.1875$ s per inverter), how many inverters at most can share one bus if each tag must refresh at least every 10 s? (Ignore retries; give a whole number.)`,
            answer: 53,
            tolerance: { abs: 0 },
            unit: "inverters",
            explanation: md`$n = \lfloor 10/0.1875 \rfloor = \lfloor 53.3 \rfloor = 53$. In practice the electrical limit of a standard RS-485 segment (32 unit loads without repeaters) and retry margins bind first, so designers put 10 to 30 devices on a bus.`,
            concepts: ["mz09.modbus"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Talking to the O&M engineer and the OT security officer",
      blocks: [
        {
          kind: "md",
          md: md`### What to say, in order of preference

1. **"We read from your historian or SCADA, not from devices."** The historian already holds clean, timestamped values; going to devices adds polling load and risk.
2. **"Read-only, from a replica or OPC UA server in your DMZ."** Name the zone. If they have a unidirectional gateway (data diode), say you are happy to sit behind it.
3. **"Outbound only, encrypted."** The gateway connects out over TLS (MQTT on 8883 or HTTPS on 443); no inbound port is opened and no VPN into the plant is needed.
4. **"No write path exists."** The analytics service cannot send setpoints. If Mizan later sells control functions (stow, tracker strategies), that is a separate, engineered integration under the plant's change control, not a feature of the analytics link.
5. **"Or no connection at all."** For a first pilot, periodic encrypted exports are fine. Offer it before they ask.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How sellers lose the security review",
          md: md`- Proposing a **cloud connection straight to inverters** on Modbus TCP: it exposes unauthenticated write access.
- Asking for **remote desktop or VPN** into the SCADA network "to look around".
- Not knowing whether your gateway software has **any listening port**.
- Using **MQTT on 1883** or OPC UA in **security mode None** across a zone boundary.
- Mixing analytics and control in one product pitch, so the reviewer must treat the analytics link as a control link.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Kuwait specifics to confirm",
          md: md`Which telecontrol protocol the national control centre uses with renewable plants, and what OT security rules MEW or KISR apply to third-party data connections, are not documented in Mizan's research brief. Ask KISR's IT and the plant's O&M contractor; do not assume IEC 60870-5-104 or a specific policy.`,
        },
        { kind: "scenario", scenario: "mz09-s1" },
        {
          kind: "ask",
          title: "Questions for the plant's SCADA and IT teams",
          items: [
            "Does the historian or SCADA expose OPC UA, PI Web API or another read interface, and in which network zone?",
            "Is there a DMZ with a historian replica, and is it fed through a unidirectional gateway?",
            "What is your policy for outbound connections from the DMZ (protocols, ports, approved destinations)?",
            "Do you require on-site hosting of the analytics, or is a dedicated cloud tenant acceptable for anonymised or non-control data?",
            "What scan rates do the inverter and met tags have in SCADA today?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "mz09-l02-p2",
            type: "short",
            prompt: md`Write the **one-page data access and security description** Mizan would attach to its pilot proposal for Shagaya Phase I (targeted, not signed). Cover: data source and zone, protocol and direction, what runs where, what Mizan can and cannot do on the plant network, the fallback option, and how access ends at pilot close.`,
            rubric: [
              "Reads from the historian or SCADA (or a replica / OPC UA server in a DMZ), never from field devices",
              "States read-only access and that no write or command path exists from the analytics side",
              "Specifies outbound-only encrypted transport (MQTT over TLS or HTTPS) with no inbound ports or VPN into the control network",
              "Describes where the gateway and analytics run (DMZ appliance; cloud tenant or on-prem server) and who administers what",
              "Offers a no-connection fallback (periodic encrypted exports) for phase 1",
              "Covers access removal, data deletion or return, and logging at the end of the pilot",
            ],
            modelAnswer: md`**Mizan soiling analytics pilot: data access and security (draft for KISR review)**

**Source.** Read-only access to the plant historian, preferably through a historian replica or an OPC UA server located in the plant DMZ. Mizan does not connect to inverters, trackers, meters or any device in the control zone.

**Direction and protocol.** A Mizan edge gateway (a hardened industrial PC, supplied by Mizan, administered jointly) sits in the DMZ. It reads the agreed tag list (about 400 tags) every 5 minutes using OPC UA in SignAndEncrypt mode with certificates issued by KISR. It sends data outbound only, over TLS (MQTT on port 8883), to Mizan's analytics environment. No inbound port is opened; no VPN or remote desktop into the plant network is requested.

**No write path.** The gateway account has read permission only. Mizan's software has no function to send setpoints or commands. Any future control function would be a separate, engineered integration under KISR's change control.

**Where it runs.** Analytics run in a dedicated tenant (or, if KISR prefers, on a server inside KISR's network, with the same software). Reports are delivered as PDF and a web dashboard; KISR controls user accounts.

**Phase 1 fallback.** Before any connection is approved, KISR exports the tag list monthly as CSV or Parquet to an encrypted share. The analysis method is identical.

**Pilot close.** On termination, KISR revokes the gateway certificate, Mizan removes the gateway, and all raw data is deleted or returned within 30 days, with written confirmation. Access logs are kept and shared on request.`,
            explanation: md`Security reviewers look for three properties: no route to control devices, no inbound connectivity, and a clean exit. Offering a no-connection phase 1 removes the review from the critical path of the pilot.`,
            concepts: ["mz09.ot-security", "mz09.opc-ua", "mz09.mqtt"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a utility manager why Modbus is fine inside the plant but must never be exposed to the internet, and why MQTT is used for the link to the cloud instead.",
          keyPoints: [
            "Modbus has no authentication: anyone who reaches the port can read and write registers, including power limits",
            "Inside a segmented control network that is acceptable because access is physically and logically controlled",
            "MQTT clients connect outward to a broker, so no inbound port is opened in the plant firewall",
            "The MQTT link runs over TLS with certificates; data flows out, nothing flows back to devices",
            "Analytics should read from the historian, not from devices",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz09-l02-q1",
      type: "mcq",
      prompt: md`Where does a Modbus value's timestamp come from?`,
      options: ["The device clock at measurement", "The poller, when the response arrives", "The GPS receiver in the inverter", "The register map"],
      answer: 1,
      explanation: md`Modbus carries no timestamps. The SCADA driver stamps the value on receipt, so polling delays and bus cycles become timing errors. OPC UA, IEC 61850 and DNP3 events carry source timestamps.`,
      concepts: ["mz09.modbus"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz09-l02-q2",
      type: "mcq",
      prompt: md`Why is MQTT well suited to sending plant data to a cloud service?`,
      options: [
        "It has a rich built-in information model",
        "The site client connects outbound to a broker, so no inbound firewall port is needed",
        "It is faster than any other protocol",
        "It needs no encryption",
      ],
      answer: 1,
      explanation: md`Outbound-only connectivity is what OT security teams want. MQTT has no data model of its own (Sparkplug adds one) and must be run over TLS (8883) when it crosses networks.`,
      concepts: ["mz09.mqtt", "mz09.ot-security"],
      difficulty: 1,
    },
    {
      id: "mz09-l02-q3",
      type: "multi",
      prompt: md`Which properties does OPC UA provide that Modbus does not? (Select all.)`,
      options: ["Browseable named data model with units", "Source timestamps and status codes per value", "Certificate-based authentication and encryption", "Subscriptions with deadband", "Operation over RS-485 serial lines only"],
      answer: [0, 1, 2, 3],
      explanation: md`OPC UA carries semantics, timestamps, quality and security, and reports by change through subscriptions. It runs over TCP/IP (and PubSub transports), not RS-485; Modbus RTU is the serial one.`,
      concepts: ["mz09.opc-ua", "mz09.modbus"],
      difficulty: 2,
    },
    {
      id: "mz09-l02-q4",
      type: "numeric",
      prompt: md`A Modbus RTU poll reads 40 registers. How many bytes are in the request plus the response frame?`,
      answer: 93,
      tolerance: { abs: 0 },
      unit: "bytes",
      explanation: md`Request 8 bytes; response $5 + 2 \times 40 = 85$ bytes; total 93. At 9,600 baud and 11 bits per character that is $93 \times 11/9{,}600 = 0.107$ s on the wire.`,
      concepts: ["mz09.modbus"],
      difficulty: 2,
    },
    {
      id: "mz09-l02-q5",
      type: "mcq",
      prompt: md`An inverter's 32-bit energy counter decodes to 222,298,115 kWh. What is the most likely cause?`,
      options: ["The inverter is very old", "Swapped word order of the two 16-bit registers", "A missing scale factor of 10", "Counter reset at midnight"],
      answer: 1,
      explanation: md`A value far above nameplate times hours points to word order: high and low words reversed. A missing scale factor gives errors of powers of ten; a reset gives a drop to near zero.`,
      concepts: ["mz09.modbus"],
      difficulty: 2,
    },
    {
      id: "mz09-l02-q6",
      type: "decision",
      prompt: md`A plant offers you a static IP and port 502 on its inverter network "so your cloud can read whatever it needs". What do you do?`,
      options: [
        { text: "Accept; it is the fastest way to start", score: 0, feedback: "You would be exposing unauthenticated write access to inverters on the internet, and you would carry the blame for any incident." },
        { text: "Decline and propose reading from the historian or an OPC UA server in a DMZ, outbound TLS only, or monthly exports to start", score: 1, feedback: "Right: protect the customer from a risky design and keep your analytics link free of any control path." },
        { text: "Accept but add a VPN", score: 0.3, feedback: "Better than open, but you still reach devices directly with write capability, and a VPN into the plant is hard to approve." },
        { text: "Ask them to move port 502 to a non-standard port", score: 0.1, feedback: "Obscurity is not security; the protocol still has no authentication." },
      ],
      explanation: md`Professional sellers refuse insecure shortcuts even when offered. It builds trust with the engineers who will later decide on control-function purchases.`,
      concepts: ["mz09.ot-security", "mz09.modbus"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz09-l02-f1", front: "Modbus: four data tables", back: "Coils (rw bits), discrete inputs (ro bits), input registers (ro 16-bit), holding registers (rw 16-bit)", concepts: ["mz09.modbus"] },
    { id: "mz09-l02-f2", front: "Max registers per Modbus read (function 03)", back: "125", concepts: ["mz09.modbus"] },
    { id: "mz09-l02-f3", front: "Modbus RTU response size for N registers", back: md`$5 + 2N$ bytes (request is 8 bytes)`, concepts: ["mz09.modbus"] },
    { id: "mz09-l02-f4", front: "OPC UA security modes", back: "None, Sign, SignAndEncrypt; X.509 application certificates", concepts: ["mz09.opc-ua"] },
    { id: "mz09-l02-f5", front: "MQTT QoS levels", back: "0 at most once, 1 at least once, 2 exactly once", concepts: ["mz09.mqtt"] },
    { id: "mz09-l02-f6", front: "Default ports: Modbus TCP, OPC UA, MQTT TLS, DNP3", back: "502, 4840, 8883, 20000", concepts: ["mz09.modbus", "mz09.opc-ua", "mz09.mqtt", "mz09.utility-protocols"] },
    { id: "mz09-l02-f7", front: "Three properties of an approvable analytics link", back: "Reads upstream (historian or DMZ replica), outbound-only encrypted, no write path to devices", concepts: ["mz09.ot-security"] },
  ],
  scenarios: [
    {
      id: "mz09-s1",
      title: "The OT security officer says no",
      dayInLife: true,
      context: md`Illustrative. In a pilot preparation meeting for a Gulf PV plant, the plant's OT security officer says: "No external party connects to our SCADA. Ever." The plant manager and the research partner want the pilot.`,
      start: "a",
      concepts: ["mz09.ot-security", "mz09.mqtt"],
      nodes: {
        a: {
          md: md`The room goes quiet. The plant manager looks at you. What do you say first?`,
          choices: [
            { text: "Agree with the principle, and say phase 1 needs no connection: monthly encrypted exports of about 400 historian tags are enough", next: "b", score: 10, feedback: "You remove the objection from the critical path and show you understand their world." },
            { text: "Explain that your cloud platform is secure and certified, so the risk is low", next: "c", score: 3, feedback: "You are arguing with the person who can veto the pilot, about their own network." },
            { text: "Ask the plant manager to overrule him", score: 0, feedback: "You have made an enemy of the person who signs off every future integration." },
          ],
        },
        b: {
          md: md`The officer relaxes. "Exports are fine. But in six months you will want live data." What do you answer?`,
          choices: [
            { text: "Describe the target design for later: read-only from a DMZ replica, outbound TLS only, no write path, and ask him to set the conditions", score: 10, feedback: "You make him the author of the design. Live data will come when he trusts it." },
            { text: "Say you will cross that bridge later", score: 5, feedback: "Honest, but a missed chance to shape the design with the person who owns it." },
            { text: "Say live data is essential and the pilot will fail without it", score: 1, feedback: "Untrue for soiling analytics, which works on daily aggregates of interval data." },
          ],
        },
        c: {
          md: md`The officer replies: "Your certifications are not my network." The plant manager suggests you take it offline. What now?`,
          choices: [
            { text: "Withdraw the connection request and offer encrypted monthly exports for phase 1", score: 7, feedback: "Recovered, though it took a rebuff to get there." },
            { text: "Send him your security whitepaper after the meeting", score: 3, feedback: "Documents do not answer a principle he has already stated." },
          ],
        },
      },
    },
  ],
};

export default lesson;
