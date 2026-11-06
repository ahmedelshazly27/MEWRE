import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw06-l03",
  title: "Communication buses: CAN, EtherCAT, SPI, I2C, UART",
  summary:
    "The buses that connect firmware to the rest of the machine and to the bench: classic CAN and CAN FD (arbitration, frame overhead, bus load), EtherCAT (processing on the fly, distributed clocks), on-board SPI, I2C and UART, and the arithmetic of bandwidth and latency for each. Then how buses are logged on a test bench: DBC files, XCP, MDF, hardware timestamps, and what breaks.",
  minutes: 75,
  objectives: [
    "Explain CAN arbitration, frame structure and why bit stuffing makes frame length variable",
    "Compute frame time, bus load and the maximum message rate of a CAN or CAN FD bus",
    "Explain why EtherCAT reaches cycle times around 100 µs with sub-microsecond synchronisation",
    "Compare SPI, I2C and UART for on-board sensors and compute their transfer times",
    "Specify how buses must be logged on a test bench so the data is decodable and aligned with DAQ signals",
  ],
  concepts: [
    { id: "aw06.can", name: "CAN and CAN FD", description: "A two-wire differential multi-master bus where nodes broadcast frames identified by an ID; collisions are resolved bit by bit without loss (lowest ID wins). Classic CAN carries 8 data bytes at up to 1 Mbit/s; CAN FD carries up to 64 bytes and switches to a faster data-phase bit rate.", competency: "aw-physical-ai", related: ["aw06.bus-load", "aw06.bench-logging"] },
    { id: "aw06.bus-load", name: "Bus load and frame time", description: "The share of a bus's bit time occupied by frames: sum over messages of frame length in bits times rate, divided by bit rate. Worst-case stuffing lengthens CAN frames by up to about 20%; high load increases the latency of low-priority messages.", competency: "aw-physical-ai", related: ["aw06.can", "aw06.cycle-budget"] },
    { id: "aw06.fieldbus-ethercat", name: "EtherCAT", description: "An Ethernet-based fieldbus (IEC 61158) in which one frame passes through every device and each device reads and writes its data on the fly; distributed clocks synchronise devices to well under a microsecond, enabling cycle times around 100 µs for many servo axes.", competency: "aw-physical-ai", related: ["aw06.can", "aw06.bench-logging"] },
    { id: "aw06.board-buses", name: "SPI, I2C and UART", description: "On-board serial links: SPI is a fast synchronous full-duplex bus with chip selects; I2C is a two-wire addressed bus at 100 kHz to about 1 MHz with an acknowledge bit per byte; UART is asynchronous point-to-point with start and stop bits.", competency: "aw-physical-ai", related: ["aw06.bus-load"] },
    { id: "aw06.bench-logging", name: "Bus logging on the bench", description: "Recording bus traffic with hardware timestamps into standard files (for example ASAM MDF4), decoding it with the signal database (DBC or ARXML) that matches the firmware build, and measuring internal variables over XCP, all aligned with DAQ signals on one clock.", competency: "aw-physical-ai", related: ["aw06.can", "aw06.build-identity"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "How the buses work and what they cost in time",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Lockstep records rig signals and the device's own view of itself, and most of that device view arrives over a bus: CAN in drives, batteries and vehicles; EtherCAT in robots and industrial machines; SPI and I2C between sensors and MCUs. If you can do the bus arithmetic you can tell in a discovery call whether a customer's logging plan will drop data, and you can explain why a firmware change that edits a CAN message definition is a test-impact event in its own right.`,
        },
        {
          kind: "md",
          md: md`### Classic CAN

**Controller Area Network** (ISO 11898-1; Bosch, 1980s) is a two-wire differential bus terminated with 120 Ω at each end (a healthy bus measures about 60 Ω between CAN-H and CAN-L with power off). Key properties:

- **Broadcast with identifiers**: frames are not addressed to a node; each carries an 11-bit (standard) or 29-bit (extended) **identifier** that names the content and sets its priority.
- **Non-destructive bitwise arbitration**: nodes start sending at the same time; a dominant bit (0) overwrites a recessive bit (1). A node that sends recessive and reads dominant stops. **The lowest identifier wins** and its frame continues undamaged. So CAN is deterministic for the highest-priority message and only statistically fast for low-priority ones.
- **Data field** of 0 to 8 bytes; a 15-bit CRC; an acknowledge slot in which every receiver confirms.
- **Error handling**: error frames, error counters, and **bus-off**, where a node that keeps causing errors disconnects itself.
- **Bit rates** up to 1 Mbit/s; the practical limit falls with cable length (about 40 m at 1 Mbit/s, about 100 m at 500 kbit/s) because a bit must reach the far end and back within one bit time for arbitration.

**Frame length.** A standard frame with 8 data bytes has 108 bits from start of frame to end of frame, plus 3 bits of interframe space: 111 bits. CAN inserts a **stuff bit** after five identical bits so receivers stay synchronised, which lengthens frames by a data-dependent amount. The worst case (Davis et al., 2007):`,
        },
        { kind: "equation", formula: "aw06-can-frame-bits" },
        {
          kind: "md",
          md: md`For 8 bytes this gives 135 bits. Frame time is bits divided by bit rate: at 500 kbit/s an 8-byte frame takes 222 µs without stuffing and up to 270 µs with worst-case stuffing. Only 64 of the 111 bits are payload: **about 58% efficiency** at best.`,
        },
        { kind: "equation", formula: "aw06-bus-load" },
        {
          kind: "md",
          md: md`**Bus load** above about 100% means frames queue without bound and low-priority messages are never sent. Long before that, the latency of low-priority messages grows because every higher-priority frame can delay them. Many teams target a design bus load well below 70% to leave room for bursts, error frames and future messages; practice varies by industry and OEM.

### CAN FD and beyond

**CAN FD** (flexible data rate, ISO 11898-1:2015) keeps arbitration at the nominal rate (for example 500 kbit/s) so that physics and priority still work, then switches to a faster **data-phase** rate (commonly 2 to 5 Mbit/s) and allows up to **64 data bytes**. A 64-byte CAN FD frame with 11-bit ID needs roughly 30 bits at the nominal rate and about 550 at the data rate (before dynamic stuffing). At 500 kbit/s / 2 Mbit/s that is about $30/0.5 + 550/2 = 60 + 275 = 335$ µs for 64 bytes, against $8\times222 = 1{,}776$ µs for the same payload in eight classic frames.

**CAN XL** extends payloads to 2,048 bytes with data rates around 10 Mbit/s and beyond; it is specified by CAN in Automation (CiA) and is starting to appear in automotive architectures (check the current state of its ISO standardisation before quoting it).

### EtherCAT

**EtherCAT** (Beckhoff, 2003; standardised in IEC 61158 and IEC 61784) is the dominant real-time fieldbus in many industrial and robotic machines. It uses standard 100 Mbit/s Ethernet frames, but differently from office Ethernet:

- One master sends a frame that passes **through every device in a logical ring**. Each device's EtherCAT slave controller reads its outputs and inserts its inputs **on the fly**, delaying the frame by well under a microsecond to about a microsecond, instead of storing and forwarding it.
- A single frame can carry the process data of many devices, so the protocol overhead is shared and bus efficiency is high.
- **Distributed clocks** align every device's local clock to a reference with well below 1 µs deviation, so all drives sample and apply outputs at the same instant.
- Typical cycle times are 100 µs to 1 ms; vendors quote around 100 µs for on the order of 100 servo axes.

Wire time is simple: at 100 Mbit/s each byte takes 80 ns.`,
        },
        { kind: "equation", formula: "aw06-serialisation-time" },
        {
          kind: "md",
          md: md`### On-board buses: SPI, I2C, UART

| Bus | Wires | Clocking | Typical speed | Addressing | Typical use |
|---|---|---|---|---|---|
| **SPI** | 4 (SCLK, MOSI, MISO, CS per device) | synchronous, master clock | 1 to 50 MHz | chip-select line per device | ADCs, IMUs, encoders, gate drivers, flash |
| **I2C** | 2 (SDA, SCL), open drain with pull-ups | synchronous | 100 kHz, 400 kHz, 1 MHz (Fm+) | 7-bit address in the frame | temperature sensors, EEPROMs, power monitors |
| **UART** | 2 (TX, RX) point to point | asynchronous, agreed baud rate | 115.2 kbaud to a few Mbaud | none | debug consoles, GPS, simple sensor links; RS-485 for longer runs |

Arithmetic:

- **I2C** sends 9 clock bits per byte (8 data plus acknowledge). Reading 6 bytes from an IMU register: address and write (9) + register (9) + repeated start + address and read (9) + 6 data bytes (54) = **81 bit times**, about 202 µs at 400 kHz. In a 1 kHz control loop that is 20% of the period if the read blocks.
- **SPI** at 10 MHz reads the same 6 bytes plus a command byte (56 bits) in 5.6 µs.
- **UART 8N1** sends 10 bits per byte (start, 8 data, stop): 115,200 baud carries 11,520 bytes/s.`,
        },
        { kind: "equation", formula: "aw06-uart-throughput" },
        {
          kind: "md",
          md: md`### Comparison

| Bus | Raw rate | Payload per frame | Topology | Determinism | Where you meet it on a bench |
|---|---|---|---|---|---|
| Classic CAN | up to 1 Mbit/s | 8 bytes | multi-drop line | by priority (ID) | drives, BMS, vehicles, many robots |
| CAN FD | 0.5 to 1 Mbit/s arbitration, 2 to 8 Mbit/s data | 64 bytes | multi-drop line | by priority | newer vehicles and drives |
| EtherCAT | 100 Mbit/s | about 1,500 bytes per Ethernet frame, shared by all devices | line or ring through devices | cyclic, distributed clocks | robot arms, humanoid joints, machine axes, test rigs |
| SPI | 1 to 50 MHz | any | point to point with CS | master-timed | sensors inside the device |
| I2C | 0.1 to 1 MHz | any | two-wire shared | master-timed, slow | slow sensors inside the device |
| UART | 0.1 to a few Mbaud | any | point to point | none built in | debug console, simple links |`,
        },
        {
          kind: "md",
          md: md`### Logging buses on the bench

Bus data becomes test evidence only if three things are right:

1. **Decoding**: raw frames are bytes. A **signal database** maps identifiers and bit positions to named, scaled signals: **DBC** files for CAN (a de facto standard from Vector), **ARXML** in AUTOSAR systems, **ESI** XML files for EtherCAT devices. The database must match the **firmware build** that produced the frames; a firmware change that rescales a signal without updating the DBC makes every downstream test read wrong values, silently.
2. **Measurement and calibration access**: **XCP** (ASAM MCD-1 XCP) lets a PC tool read internal ECU variables at fixed rates (DAQ lists) and change calibration parameters over CAN, CAN FD or Ethernet, using an **A2L** file that describes variable addresses. The A2L is build-specific: addresses move when code is rebuilt. XCP traffic adds bus load.
3. **Time**: a good interface (Vector, Kvaser, PEAK, Intrepid, NI and others) stamps each frame in hardware when it is received, with microsecond resolution. Timestamps taken by a PC application when the driver delivers the frame carry milliseconds of jitter. Logs are usually written as **ASAM MDF4** (also Vector BLF, ASC, or Parquet in data platforms).

To align a bus log with DAQ signals and screen events, the clocks must be related: shared hardware sync, PTP (IEEE 1588), or fitting offset and drift from common sync pulses. The widget below shows what happens when two streams run on clocks with offset and drift, and how sync pulses recover alignment.`,
        },
        {
          kind: "widget",
          widget: "bench-sync",
          caption: "A DAQ stream and a second log on different clocks: misalignment grows with drift (ppm) until offset and drift are fitted from sync pulses. A bus logger without hardware timestamps behaves like the jittery stream.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Bus budgets for an actuator test bench",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Will the bench CAN bus carry the extra measurement traffic?",
          given: md`Illustrative actuator drive bench, classic CAN at **500 kbit/s**, all frames 8 data bytes, 11-bit IDs. Traffic: drive status at 1 kHz; command frame from the rig controller at 1 kHz; four diagnostic frames at 100 Hz each; heartbeat at 10 Hz. The test team wants to add XCP measurement of three more 8-byte frames at 1 kHz each to see internal FOC variables.`,
          steps: [
            { md: md`**Frames per second today:** $1{,}000 + 1{,}000 + 4\times100 + 10 = 2{,}410$.` },
            { md: md`**Nominal load:** $2{,}410\times111/500{,}000 = 0.535$, so 53.5%. **Worst-case stuffing:** $2{,}410\times135/500{,}000 = 0.651$, so 65.1%. Already near a typical design ceiling.` },
            { md: md`**With XCP:** $2{,}410 + 3\times1{,}000 = 5{,}410$ frames/s. Nominal load $= 5{,}410\times111/500{,}000 = 1.20$: **120%, impossible.** Low-priority frames (diagnostics, XCP, depending on IDs) would be delayed without bound and the logger would show gaps.` },
            { md: md`**Options:** (a) run XCP at 200 Hz instead of 1 kHz: $2{,}410 + 600 = 3{,}010$ frames, $3{,}010\times135/500{,}000 = 81\%$ worst case, still high; (b) a separate CAN channel for XCP; (c) move to 1 Mbit/s if cable length allows; (d) CAN FD with 64-byte frames; (e) record FOC internals on the device into RAM and dump after the test.` },
          ],
          result: md`The bus that works today is at 54 to 65% load; adding 1 kHz XCP measurement would overload it by 20%. The logging plan must be designed with the bus arithmetic, and the test record must show which messages were actually received (gaps, error frames), or bench memory will contain silent holes.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Same traffic on a 1 Mbit/s bus",
          given: md`The bench cable is 15 m, short enough for 1 Mbit/s. Keep all 5,410 frames/s (including 1 kHz XCP), 8 bytes each.`,
          steps: [
            { md: md`Worst-case bits per second $= 5{,}410\times135$.` },
            { md: md`$= 730{,}350$ bit/s.`, hidden: true, check: { prompt: "Worst-case bits per second", answer: 730350, unit: "bit/s", tolerance: { rel: 0.005 } } },
            { md: md`Worst-case load $= 730{,}350/1{,}000{,}000$.` },
            { md: md`Load = **73.0%** worst case (60.1% nominal).`, hidden: true, check: { prompt: "Worst-case bus load (%)", answer: 73.0, unit: "%", tolerance: { abs: 0.3 } } },
          ],
          result: md`At 1 Mbit/s the traffic fits, with little margin in the worst case. A separate XCP channel or CAN FD would leave more headroom; every node's bit rate setting must change together, which is itself a firmware and configuration change that needs a communication retest.`,
        },
        {
          kind: "question",
          question: {
            id: "aw06-l03-p1",
            type: "numeric",
            prompt: md`What is the maximum number of 8-byte standard CAN frames per second a 1 Mbit/s bus can carry at 100% load, ignoring stuff bits (111 bits per frame including interframe space)? Round to the nearest frame.`,
            answer: 9009,
            tolerance: { abs: 2 },
            unit: "frames/s",
            explanation: md`$10^6/111 = 9{,}009$ frames/s. With worst-case stuffing (135 bits) it is 7,407. In practice you design well below either figure.`,
            concepts: ["aw06.bus-load", "aw06.can"],
            difficulty: 1,
          },
        },
        {
          kind: "question",
          question: {
            id: "aw06-l03-p2",
            type: "numeric",
            prompt: md`A rig controller sends a 32-byte telemetry message at 1 kHz over a UART with 8N1 framing. What is the minimum baud rate (in kbaud) needed just to carry it, with no margin?`,
            answer: 320,
            tolerance: { abs: 1 },
            unit: "kbaud",
            explanation: md`$32\times10 = 320$ bits per message; $\times1{,}000 = 320{,}000$ baud. 115.2 kbaud is far too slow; a standard 460.8 or 921.6 kbaud setting would carry it with margin.`,
            concepts: ["aw06.board-buses"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Buses on real benches",
      blocks: [
        {
          kind: "md",
          md: md`### Tools and documents

- **Interfaces and loggers**: Vector (CANoe, CANalyzer, VN interfaces), Kvaser, PEAK-System, Intrepid Control Systems, NI XNET, plus standalone loggers for in-vehicle and long-duration runs. EtherCAT is usually captured by mirroring traffic to a network tap and a PC with Wireshark (which has an EtherCAT dissector) or by the EtherCAT master logging process data.
- **Signal databases**: DBC, ARXML, A2L (for XCP), ESI (EtherCAT). These are **versioned artifacts**: each belongs to a firmware build.
- **File formats**: ASAM MDF4 for measurement data (widely used in automotive test), BLF and ASC for CAN logs, PCAP for Ethernet captures.
- **Physical checks**: termination (about 60 Ω across CAN-H/CAN-L unpowered), ground, shield, stub lengths, matching bit timing on every node.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong in bench bus logging",
          md: md`- **DBC does not match the build**: a signal was rescaled or moved in the new firmware; the old DBC decodes nonsense that looks plausible.
- **Dropped frames**: logger buffer overflow or bus overload; the file has gaps nobody notices because plots interpolate.
- **PC timestamps**: frames stamped when software received them, with milliseconds of jitter, then aligned with a 100 kS/s DAQ stream.
- **XCP added without load check**: measurement traffic delays control or diagnostic frames and changes the behaviour under test.
- **Error frames ignored**: a marginal transceiver or termination causes intermittent errors that look like firmware bugs.
- **Two clocks, no sync**: CAN log and DAQ recorded on different PCs, aligned by hand at the start of the run; drift of 50 ppm becomes 180 ms after an hour.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "Product implications for Afterwave",
          md: md`Lockstep should treat signal databases (DBC, A2L, ESI) as part of the configuration of every run and refuse, or at least flag, a decode with a database whose build does not match. Ripple should treat a change to a message definition as an interface change: every test whose pass criteria read that signal, on the device or on the rig, is in the impact set even if no control code changed.`,
        },
        {
          kind: "ask",
          title: "Questions for a customer's test lead about buses",
          items: [
            "Which buses carry device data on your benches (CAN, CAN FD, EtherCAT, others) and at what bit rates?",
            "What is the bus load in your heaviest test, and how did you measure it?",
            "Are frames timestamped in hardware, and how is the bus log aligned with the DAQ?",
            "How do you make sure the DBC or A2L used to decode a log matches the firmware that produced it?",
            "Do you measure internal ECU variables over XCP during tests, and at what rates?",
            "How do you detect dropped frames or error frames in a log?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw06-l03-p3",
            type: "short",
            prompt: md`Draft the **bus and logging specification** section of a Lockstep pilot plan for a (hypothetical) battery-pack test bench where the BMS talks classic CAN at 500 kbit/s and the cycler is controlled over Ethernet. Cover: which traffic to record and how, a bus load estimate with stated illustrative message rates, timestamping and clock alignment with the DAQ, signal database versioning, and how gaps and errors are detected and reported.`,
            rubric: [
              "Lists the traffic to record (BMS CAN frames, any XCP measurement, cycler commands and status) and the interface type with hardware timestamps",
              "Gives a bus load estimate with explicit illustrative rates and correct arithmetic (frame bits times rate over bit rate, with a stuffing margin)",
              "Specifies clock alignment between bus log, DAQ and cycler (shared sync, PTP or sync pulses with offset and drift fit) and an alignment accuracy target",
              "Requires the DBC or A2L version to be tied to the BMS firmware build and recorded with each run",
              "Specifies detection and reporting of dropped frames, error frames and bus-off events in the run record",
              "Is written as a usable spec (numbers, owners or acceptance criteria), not an essay",
            ],
            modelAnswer: md`**Bus and logging specification (illustrative pilot plan)**

**Traffic recorded:** all BMS CAN frames (500 kbit/s, 11-bit IDs) via a hardware-timestamping USB-CAN interface (1 µs resolution); cycler commands and status over Ethernet captured by the Lockstep host; no XCP in phase 1.

**Bus load estimate (illustrative rates):** 96 cell-voltage values in 24 frames at 10 Hz = 240 frames/s; 12 temperature frames at 10 Hz = 120; pack status at 100 Hz = 100; current and SOC at 100 Hz = 100; contactor and fault frames at 10 Hz x 4 = 40. Total 600 frames/s. Worst case $600\times135/500{,}000 = 16\%$. Room for XCP in phase 2: adding 5 frames at 200 Hz (1,000 frames/s) takes the worst case to $1{,}600\times135/500{,}000 = 43\%$.

**Time:** DAQ (voltage taps, shunt, thermocouples) is the reference clock. A 1 Hz sync pulse from the DAQ is fed to the CAN interface's trigger input; Lockstep fits offset and drift per run. Target alignment: better than 100 µs over an 8-hour run.

**Signal database:** the BMS DBC is versioned with the BMS firmware; the build hash is read from the BMS version frame at start of run and must match the DBC's recorded build. A mismatch blocks decoding and raises a flag in the run record.

**Integrity:** Lockstep records error frames, bus-off events and per-ID frame counts against expected rates; any ID below 99.9% of its expected count, or any bus-off, is listed in the run summary and the run is marked "data incomplete" for the affected signals.`,
            explanation: md`The model answer turns bus arithmetic, timestamps and database versioning into acceptance criteria. That is what makes bench memory trustworthy enough for Ripple to reason over.`,
            concepts: ["aw06.bench-logging", "aw06.bus-load", "aw06.can"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a new Afterwave sales hire how CAN decides which message goes first, why a CAN bus can be full long before the wires are 'busy', and why a CAN log without the matching DBC file is nearly useless.",
          keyPoints: [
            "Every frame has an identifier; arbitration is bitwise and the lowest ID wins without destroying the frame",
            "An 8-byte frame is 111 bits plus stuff bits (up to 135); only 64 bits are payload",
            "Bus load is frame bits times rate over bit rate; low-priority messages get delayed as load rises",
            "Frames are raw bytes; the DBC maps them to scaled named signals and must match the firmware build",
            "Hardware timestamps and clock alignment are needed to line up bus data with DAQ signals",
          ],
        },
        { kind: "sources", refs: ["aw06-r6", "aw06-r7", "aw06-r8", "aw06-r9", "aw06-r10", "aw06-r11", "aw06-r25"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw06-l03-q1",
      type: "mcq",
      prompt: "Two CAN nodes start transmitting at the same instant, with IDs 0x120 and 0x0F0. What happens?",
      options: [
        "Both frames collide and are retransmitted after a random back-off",
        "The node with ID 0x0F0 wins arbitration and its frame continues undamaged; the other retries after",
        "The node with ID 0x120 wins because it is larger",
        "The bus enters bus-off",
      ],
      answer: 1,
      explanation: md`Arbitration is bitwise with dominant 0s: the lower ID has a 0 where the higher has a 1 and wins. No frame is destroyed, which is why CAN gives deterministic latency to the highest-priority message.`,
      concepts: ["aw06.can"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw06-l03-q2",
      type: "numeric",
      prompt: md`Using the worst-case formula, how many bits does a standard CAN frame with 4 data bytes take (including the 3-bit interframe space)?`,
      answer: 95,
      tolerance: { abs: 0 },
      unit: "bits",
      explanation: md`$47 + 8\times4 + \lfloor(34 + 32 - 1)/4\rfloor = 47 + 32 + \lfloor65/4\rfloor = 79 + 16 = 95$ bits.`,
      concepts: ["aw06.bus-load", "aw06.can"],
      difficulty: 2,
    },
    {
      id: "aw06-l03-q3",
      type: "numeric",
      prompt: md`A 250 kbit/s CAN bus carries 1,200 frames/s of 8 bytes. What is the worst-case bus load (%) using 135 bits per frame?`,
      answer: 64.8,
      tolerance: { abs: 0.2 },
      unit: "%",
      explanation: md`$1{,}200\times135/250{,}000 = 0.648$, so 64.8%.`,
      concepts: ["aw06.bus-load"],
      difficulty: 1,
    },
    {
      id: "aw06-l03-q4",
      type: "multi",
      prompt: "Which statements about EtherCAT are correct? (Select all that apply.)",
      options: [
        "Each device processes the frame on the fly instead of storing and forwarding it",
        "Distributed clocks synchronise devices to well below a microsecond",
        "Each device needs its own Ethernet frame from the master every cycle",
        "It is standardised within IEC 61158",
        "It runs on the CAN physical layer",
      ],
      answer: [0, 1, 3],
      explanation: md`One frame passes through all devices, which read and insert data as it passes. Distributed clocks give sub-microsecond sync. It uses standard 100 Mbit/s Ethernet physical layers.`,
      concepts: ["aw06.fieldbus-ethercat"],
      difficulty: 1,
    },
    {
      id: "aw06-l03-q5",
      type: "numeric",
      prompt: md`How long (µs) does an I2C read of 81 bit times take at 400 kHz?`,
      answer: 202.5,
      tolerance: { abs: 0.5 },
      unit: "µs",
      explanation: md`$81/400{,}000 = 202.5$ µs. The same read over SPI at 10 MHz takes about 5.6 µs, which is why fast sensors in control loops sit on SPI.`,
      concepts: ["aw06.board-buses"],
      difficulty: 1,
    },
    {
      id: "aw06-l03-q6",
      type: "decision",
      prompt: md`A design partner's new firmware renames and rescales the phase-current CAN signal. Their bench scripts compute a thermal-derating pass/fail from that signal. They plan to rerun only the CAN interface test. What do you recommend?`,
      options: [
        { text: "Rerun the CAN interface test only; the signal is a communication detail.", score: 0.1, feedback: "Every test whose pass criteria read the signal is affected: with an old DBC the derating test computes the wrong current and may pass when it should fail." },
        { text: "Update and version the DBC with the build, then rerun the CAN interface test and every test whose pass criteria or scripts read that signal, including thermal derating.", score: 1, feedback: "Treats the message definition as an interface: the impact follows signal consumers, not only the code that sends them." },
        { text: "Rerun the full regression on every variant.", score: 0.4, feedback: "Catches the problem, but at large rig-hour cost; the consumers of the signal are the targeted set." },
      ],
      explanation: md`A signal database change is an interface change. Its impact set is every consumer of the signal, on the device and on the bench.`,
      concepts: ["aw06.bench-logging", "aw06.can"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw06-l03-f1", front: "CAN arbitration rule", back: "Bitwise, dominant 0 wins: the lowest identifier wins and its frame continues undamaged.", concepts: ["aw06.can"] },
    { id: "aw06-l03-f2", front: "8-byte standard CAN frame length", back: "111 bits including interframe space; up to 135 bits with worst-case stuffing. 222 to 270 µs at 500 kbit/s.", concepts: ["aw06.bus-load"] },
    { id: "aw06-l03-f3", front: "Bus load", back: md`$U_{bus} = \sum L_i r_i / R_{bit}$; design well below 70% for headroom.`, concepts: ["aw06.bus-load"] },
    { id: "aw06-l03-f4", front: "CAN FD in one line", back: "Arbitration at nominal rate, data phase at 2 to 8 Mbit/s, up to 64 data bytes.", concepts: ["aw06.can"] },
    { id: "aw06-l03-f5", front: "EtherCAT key ideas", back: "One frame through all devices, processing on the fly, distributed clocks below 1 µs, cycles around 100 µs.", concepts: ["aw06.fieldbus-ethercat"] },
    { id: "aw06-l03-f6", front: "I2C bits per byte", back: "9 (8 data plus acknowledge). UART 8N1: 10 bits per byte.", concepts: ["aw06.board-buses"] },
    { id: "aw06-l03-f7", front: "DBC and A2L files", back: "DBC maps CAN frames to scaled signals; A2L maps XCP addresses to ECU variables. Both are build-specific artifacts.", concepts: ["aw06.bench-logging"] },
  ],
};

export default lesson;
