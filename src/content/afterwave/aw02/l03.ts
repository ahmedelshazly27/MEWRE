import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw02-l03",
  title: "Clocks, timestamps and synchronisation",
  summary:
    "Why two recordings of the same test disagree about when things happened: oscillator tolerance and drift in ppm, offsets, jitter and latency, monotonic versus wall-clock time, shared sample clocks and hardware triggers, NTP, PTP (IEEE 1588) and GPS/PPS, and how to align a DAQ stream with an application log by fitting offset and drift from sync events.",
  minutes: 80,
  objectives: [
    "Convert a clock drift in ppm into milliseconds of error over a test, and combine it with an initial offset",
    "Distinguish offset, drift, jitter and latency, and monotonic from wall-clock time, and say which one breaks which analysis",
    "Compute PTP offset and path delay from the four timestamps and state the symmetry assumption",
    "Rank synchronisation methods (shared clock and trigger, PTP with hardware timestamps, GPS/PPS, NTP, none) by accuracy and cost",
    "Align a DAQ stream with an application log using sync pulses and a linear fit, and specify what a pilot must record to make that possible",
  ],
  concepts: [
    { id: "aw02.clock-drift", name: "Clock offset, drift and jitter", description: "Offset is the time difference at one instant; drift is the rate difference in ppm (1 ppm = 3.6 ms per hour); jitter is random timestamp scatter; latency is the delay between an event and its timestamp.", competency: "aw-data", related: ["aw02.clock-fit", "aw02.one-clock"] },
    { id: "aw02.hardware-sync", name: "Shared clocks and hardware triggers", description: "Instruments that share a reference or sample clock and a start trigger stay aligned to the sample, with no drift between them; the strongest form of synchronisation on a single rig.", competency: "aw-data", related: ["aw02.clock-drift", "aw02.ptp"] },
    { id: "aw02.ptp", name: "PTP (IEEE 1588) and GPS/PPS", description: "Network time protocol that estimates follower offset and path delay from four timestamps; sub-microsecond with hardware timestamping. GPS receivers deliver a pulse per second aligned to UTC within tens of nanoseconds.", competency: "aw-data", related: ["aw02.hardware-sync", "m06.protocols"] },
    { id: "aw02.clock-fit", name: "Aligning streams by fitting offset and drift", description: "Record common sync events on both streams, fit device time against reference time with a line (offset and slope), and map every timestamp onto the reference clock.", competency: "aw-data", related: ["aw02.clock-drift", "aw02.event-data"] },
    { id: "aw02.monotonic-time", name: "Monotonic vs wall-clock time", description: "Wall-clock (UTC, local) time can jump when NTP corrects it or at time-zone and leap-second changes; monotonic clocks only move forward and are the right base for intervals and ordering.", competency: "aw-data", related: ["aw02.clock-drift"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Every device has its own idea of time",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`"One clock" is in the one-line description of Lockstep. It is the hardest part of the capture problem to explain to a buyer and the easiest to get wrong. If you cannot say how many milliseconds two streams disagree after an hour, and what fixes it, a test lead will not believe the rest of the pitch. This lesson gives you the numbers and the vocabulary, and the bench-sync widget lets you feel how fast misalignment grows.`,
        },
        {
          kind: "md",
          md: md`### Oscillators, ppm and drift

Every DAQ module, PC, controller and camera keeps time by counting the ticks of an oscillator, usually a quartz crystal. The crystal's actual frequency differs from nominal by a **fractional frequency error** $\delta$, quoted in parts per million (ppm). A clock that starts with offset $\theta_0$ and runs fast by $\delta$ is wrong by:`,
        },
        { kind: "equation", formula: "aw02-clock-error" },
        {
          kind: "md",
          md: md`**1 ppm is 1 $\mu$s per second, 3.6 ms per hour, 86.4 ms per day.** Typical figures:

| Oscillator | Typical frequency error | Error after 8 h |
|---|---|---|
| Ordinary crystal (XO), PCs, low-cost modules | ±10 to ±100 ppm (tolerance plus temperature) | 0.29 to 2.9 s |
| Temperature-compensated (TCXO) | ±0.5 to ±2 ppm | 14 to 58 ms |
| Oven-controlled (OCXO) | ±0.01 to ±0.1 ppm | 0.3 to 2.9 ms |
| GPS-disciplined oscillator | Locked to GPS, long-term below 0.001 ppm | Microseconds or better |

Drift is not constant: a crystal's frequency changes with temperature, so a module warming up next to a dyno drifts differently in the first hour than in the fifth.

Drift matters twice for a DAQ. Its **timestamps** drift, and its **sample clock** drifts: a module set to 10 kS/s that runs 40 ppm fast delivers 10,000.4 samples per real second. If you compute time as sample index divided by nominal rate, after one hour the computed time is 144 ms (1,440 samples) off.

### Four different timing errors

- **Offset:** the two clocks disagree by a fixed amount at the start (the PC was set from NTP, the DAQ from its own power-on).
- **Drift:** the disagreement grows linearly (approximately) with time.
- **Jitter:** random scatter of individual timestamps around the truth, from interrupt latency, USB or network buffering, operating system scheduling. Typically microseconds to milliseconds on a PC.
- **Latency:** a systematic delay between when something happened and when it was timestamped: a delta-sigma filter delay (Lesson 2), a video frame captured after the screen refreshed, a log line written after a function returned. Unlike jitter it is a bias, and it differs between sources.

Offset and drift can be measured and removed. Jitter can only be reduced by timestamping closer to the source (in hardware). Latency must be characterised per source.

### Monotonic vs wall-clock time

Operating systems keep two kinds of clocks. **Wall-clock** time (UTC or local time) is what humans read; NTP may **step** it forward or backward to correct it, and local time jumps at daylight-saving changes. A **monotonic** clock only counts forward from boot and is never stepped. If an application log uses wall-clock time and NTP corrects the PC by 300 ms in the middle of a test, the log contains a discontinuity: events can appear out of order or a duration can come out negative. Good practice: timestamp events with a monotonic clock and record, at intervals, the pair (monotonic, UTC) so the log can be mapped to absolute time afterwards. Store absolute times as UTC with an explicit offset (ISO 8601 or RFC 3339), never as local time without a zone.

Time scales also differ: GPS time and TAI do not have leap seconds, UTC does (TAI is 37 s ahead of UTC since 2017, GPS time 18 s ahead). PTP uses a TAI-based time scale by default. A pipeline that mixes them silently is off by tens of seconds.

### Synchronisation methods, strongest first

**1. Shared sample clock and trigger.** Within one DAQ chassis (PXI, CompactDAQ, many Dewesoft and HBK systems) modules share a backplane reference clock and start trigger, so channels are aligned to the sample with no relative drift. Multiple chassis can share a 10 MHz reference and trigger lines over cables. This is the gold standard on a single rig, but it covers only the instruments wired into it.

**2. EtherCAT distributed clocks and similar fieldbus mechanisms.** The bus master distributes time to all slaves, keeping them within well under a microsecond of each other. Useful when the controller and the I/O are on the same bus.

**3. PTP, IEEE 1588 (current edition 1588-2019).** A leader (grandmaster) clock exchanges timestamped messages with followers over Ethernet: $t_1$ leader sends Sync; $t_2$ follower receives it; $t_3$ follower sends Delay_Req; $t_4$ leader receives it. Then:`,
        },
        { kind: "equation", formula: "aw02-ptp-offset" },
        { kind: "equation", formula: "aw02-ptp-delay" },
        {
          kind: "md",
          md: md`The method assumes the path delay is the same in both directions. Asymmetry (different cable lengths, a switch that queues one direction) appears directly as offset error of half the asymmetry. With **hardware timestamping** in network interfaces and PTP-aware switches (boundary or transparent clocks), sub-microsecond accuracy is routine; with software timestamps on a general-purpose OS, expect tens of microseconds to milliseconds. IEEE 802.1AS (gPTP) is the profile used in time-sensitive networking and automotive Ethernet.

**4. GPS/GNSS with PPS.** A GNSS receiver outputs a **pulse per second** (PPS) whose edge is aligned to UTC typically within tens of nanoseconds, plus a message saying which second it was. It can discipline a local oscillator or serve as a PTP grandmaster. Needs antenna sky view, which test cells often lack.

**5. NTP (RFC 5905).** Software protocol on PCs. On a quiet LAN typically around a millisecond or better; over the internet, tens of milliseconds. Good enough to put logs in the right second, not to align a 10 kS/s waveform with a button click.

**6. Nothing.** Each device on its own crystal. Offsets of seconds and drift of tens of ppm.

### Aligning two streams after the fact

When devices cannot share a clock, you create **common events** recorded by both: a digital pulse that the application toggles and the DAQ samples as a channel, a light flash seen by a camera and a photodiode, a CAN message with a known counter. Pair the device time of each event with its reference time and fit a line by least squares. The intercept is the offset, the slope is $1+\delta$. Then map every device timestamp:`,
        },
        { kind: "equation", formula: "aw02-clock-correction" },
        {
          kind: "md",
          md: md`Two events give offset and drift; many events average out jitter and reveal whether drift changes (in which case fit piecewise). The widget below simulates exactly this: a DAQ stream and an app log on different clocks.`,
        },
        {
          kind: "widget",
          widget: "bench-sync",
          caption: "Set offset 120 ms and drift 40 ppm over 60 minutes: raw misalignment reaches about 264 ms. Then shorten the sync interval and add jitter to see how the fitted residual behaves.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Putting numbers on misalignment",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "A DAQ on its own crystal vs the PC that logs operator actions",
          given: md`Illustrative bench. The DAQ timestamps samples from its own oscillator, 40 ppm fast relative to the PC's reference clock, and starts 120 ms ahead. The PC logs operator actions and test-sequencer steps. A sync pulse is sent by the PC and recorded on a DAQ digital channel at the start and end of a 1-hour test.`,
          steps: [
            { md: md`**Error at the end of the test, uncorrected:** $e = 0.120 + 40\times10^{-6}\times 3{,}600 = 0.120 + 0.144 = 0.264$ s. Over an 8-hour shift: $0.120 + 1.152 = 1.272$ s.` },
            { md: md`**Consequence:** an operator setpoint change and the current response 30 ms later appear in the wrong order once misalignment exceeds 30 ms, which happens within the first second because of the 120 ms offset. Any "effect before cause" analysis is meaningless without correction.` },
            { md: md`**Fit from the two pulses:** pulse 1 at reference 0.000 s is seen at DAQ time 0.120 s; pulse 2 at reference 3,600.000 s is seen at DAQ time 3,600.264 s. Slope $= (3{,}600.264 - 0.120)/3{,}600 = 1.000040$, so $\delta = 40$ ppm and $\theta_0 = 0.120$ s.` },
            { md: md`**Map a DAQ timestamp:** an event at DAQ time 1,800.192 s maps to $t_{ref} = (1{,}800.192 - 0.120)/1.000040 = 1{,}800.000$ s.` },
            { md: md`**What limits the result:** timestamp jitter on the PC side (often 0.1 to 1 ms for software-generated pulses), latency between "the PC decided to pulse" and "the pin changed", and drift that changes with temperature between the two pulses. Pulses every minute with a least-squares fit bring the residual close to the jitter level.` },
          ],
          result: md`Uncorrected: 264 ms after one hour, 1.27 s after eight. With offset and drift fitted from sync pulses: residual close to timestamp jitter, around a millisecond for a software-driven pulse and much better with hardware timestamps.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Reading a PTP exchange",
          given: md`Illustrative PTP exchange between a grandmaster (leader) and a DAQ (follower). $t_1 = 1{,}000.000000$ s (leader), $t_2 = 1{,}000.000532$ s (follower), $t_3 = 1{,}000.010000$ s (follower), $t_4 = 1{,}000.009532$ s (leader).`,
          steps: [
            { md: md`Forward difference $t_2 - t_1 = 532\ \mu$s; reverse difference $t_4 - t_3 = -468\ \mu$s.` },
            {
              md: md`Offset $\theta = (532 - (-468))/2 = 500\ \mu$s: the follower is 500 $\mu$s ahead and steps or slews its clock back.`,
              hidden: true,
              check: { prompt: "Follower offset (µs)", answer: 500, unit: "µs", tolerance: { abs: 1 } },
            },
            {
              md: md`Mean path delay $d = (532 + (-468))/2 = 32\ \mu$s.`,
              hidden: true,
              check: { prompt: "Mean path delay (µs)", answer: 32, unit: "µs", tolerance: { abs: 1 } },
            },
            { md: md`If the true delays were 36 $\mu$s forward and 28 $\mu$s back (8 $\mu$s asymmetry), the computed offset would be wrong by 4 $\mu$s, and nothing in the four timestamps would reveal it.` },
          ],
          result: md`PTP separates offset from delay only under symmetry. That is why PTP-aware switches and calibrated asymmetry matter for sub-microsecond work, and why for bench alignment at the millisecond level plain PTP with hardware timestamps is ample.`,
        },
        {
          kind: "question",
          question: {
            id: "aw02-l03-p1",
            type: "numeric",
            prompt: md`A camera recording the rig runs on a free-running clock with 20 ppm error and no synchronisation. After a 12-hour overnight run, how far (in ms) has its time base drifted from the reference, ignoring the initial offset?`,
            answer: 864,
            unit: "ms",
            tolerance: { abs: 2 },
            explanation: md`$20\times10^{-6}\times 43{,}200\ \text{s} = 0.864$ s = 864 ms. At 30 frames per second that is about 26 frames: the video will show an event almost a second away from where the DAQ puts it.`,
            concepts: ["aw02.clock-drift"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Timing on real benches",
      blocks: [
        {
          kind: "md",
          md: md`### What you will find in a test lab

- **Inside one DAQ system:** usually well synchronised (shared clock), and teams trust it.
- **Between the DAQ and everything else** (test sequencer PC, HIL system, power analyser, bus logger, cameras, the operator's HMI, the firmware's own logs): usually NTP at best, often nothing. Each tool's export carries its own timestamps in its own format and time zone.
- **Correlation in practice:** engineers line traces up by eye on a distinctive event ("the contactor closes here"), shift one file, and move on. The shift is rarely recorded, so the next person repeats it.

Power and grid systems solved a version of this long ago: substation protection and sequence-of-events recorders use GPS or PTP so that events across a site are ordered to about a millisecond (see the cross-link below). Test benches often have not.`,
        },
        { kind: "xref", to: "m06-l05", note: "Track 0: SCADA, protection and sequence-of-events recording use GPS/PTP time sync for millisecond event ordering across a substation." },
        { kind: "sources", refs: ["aw02-r6", "aw02-r7", "aw02-r8"] },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Timing mistakes that corrupt bench data",
          md: md`- **Timestamping on arrival at the PC** instead of at the source: USB and network buffering add tens of milliseconds of variable latency.
- **Computing time from sample count and nominal rate** over long runs, ignoring sample-clock drift.
- **Wall-clock steps** from NTP in the middle of a test; daylight-saving changes in overnight runs; local time without a zone in CSV exports.
- **Assuming "synchronised" means aligned:** two instruments both on NTP may still be several milliseconds apart; two DAQ modules with different filter delays are offset even on a shared clock.
- **No record of how sync was done:** the corrected data are fine today, but nobody can reproduce or audit the correction later.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "How to talk about it with a buyer",
          md: md`Lead with a number they recognise: "If your DAQ and your sequencer PC are 50 ppm apart, after an 8-hour run they disagree by 1.4 seconds, plus whatever offset they started with." Then ask how they line streams up today and how long it takes. The value of one clock is not precision for its own sake; it is that cause and effect can be read directly, across sources, without someone shifting files by hand. Keep claims about how Lockstep achieves it to what your cofounders have built and tested.`,
        },
        {
          kind: "ask",
          title: "Discovery questions on timing",
          items: [
            "Which devices on the rig timestamp data, and which clock does each use?",
            "Do you use PTP, GPS, a shared reference clock or NTP, and has anyone measured the residual offset?",
            "When you correlate a sequencer step with a DAQ trace, how do you line them up, and how long does it take?",
            "Has a timing mismatch ever led to a wrong conclusion or a repeated test?",
            "Are timestamps exported in UTC, local time, or relative to test start?",
          ],
        },
        { kind: "scenario", scenario: "aw02-s1" },
        {
          kind: "question",
          question: {
            id: "aw02-l03-p2",
            type: "short",
            explanation: md`A timing plan must give a numeric target, a method per source, sync events on both sides with a fit, an independent verification of the residual, and the metadata that lets someone audit the alignment later.`,
            prompt: md`Write the **timing section of a pilot technical plan** (250 to 400 words) for an illustrative motor test lab with: one DAQ chassis, a test-sequencer PC, a CAN logger and one camera. State the target alignment between streams, the method for each source, the sync events you will record, how you will verify the residual error, and what metadata will be stored so the alignment can be audited later. Mark it as a draft for Ismail and Yusuf to correct.`,
            rubric: [
              "States a numeric alignment target tied to the test question (for example a few ms for operator actions vs signals, sub-ms where waveforms are compared)",
              "Treats each source separately with a realistic method (shared clock in the chassis, PTP or sync pulses for the PC, hardware timestamps or sync messages for CAN, frame timestamps plus a visible sync event for the camera)",
              "Uses sync events recorded on both sides and a fit for offset and drift, not a single manual shift",
              "Includes a verification step with a measured residual (for example an independent pulse not used in the fit)",
              "Specifies stored metadata: clock sources, fit parameters, residuals, time scale (UTC, TAI, monotonic) and software versions",
              "Correctly distinguishes monotonic and wall-clock time and avoids local time",
            ],
            modelAnswer: md`Draft for Ismail and Yusuf to correct (illustrative lab).

**Target.** Operator actions and sequencer steps aligned with DAQ signals within 2 ms; CAN messages within 1 ms; camera frames within one frame (33 ms at 30 fps). Waveform-to-waveform comparisons stay inside the DAQ chassis, which shares one sample clock.

**Reference clock.** The DAQ chassis time base is the reference for the test. If the lab has a PTP grandmaster, the chassis and the sequencer PC follow it with hardware timestamping; otherwise the chassis is the reference and other sources are mapped onto it.

**Sources.** (1) Sequencer PC: events timestamped on the monotonic clock; every 60 s the PC toggles a digital output wired to a DAQ input and logs the monotonic time of the command. (2) CAN logger: the logger timestamps in hardware; the sequencer sends a CAN sync message with a counter at the same time as each pulse. (3) Camera: an LED driven by the same digital output is in frame; frame timestamps plus the visible LED edge give the camera fit.

**Alignment.** For each source, least-squares fit of source time against DAQ time over all sync events; piecewise if residuals show drift changing with temperature.

**Verification.** One extra pulse every 10 minutes from a separate output is excluded from the fit; its predicted vs observed time is the reported residual. Target: 95 % of residuals below 1 ms for PC and CAN.

**Metadata stored per run.** Clock source per device, PTP status if used, sync method, list of sync events, fitted offset and drift per source with residual statistics, time scale (UTC with explicit offset for absolute times, monotonic for intervals), software and firmware versions of each recorder.

**Open questions.** Can the sequencer drive a digital output with known latency? Does the camera expose per-frame hardware timestamps?`,
            concepts: ["aw02.clock-fit", "aw02.ptp", "aw02.monotonic-time", "aw02.hardware-sync"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a non-technical cofounder why two computers both 'synced to the internet' can still put the same event 20 ms apart, and why that matters on a test bench.",
          keyPoints: [
            "Each device counts time with its own crystal, which runs slightly fast or slow (ppm)",
            "NTP corrects clocks only to around milliseconds to tens of milliseconds",
            "Timestamps taken after buffering add variable delay",
            "On a bench, cause and effect can be milliseconds apart, so ordering can flip",
            "Fix: shared clocks, PTP with hardware timestamps, or recorded sync events and a fit",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw02-l03-q1",
      type: "numeric",
      prompt: md`A clock is 50 ppm fast. How many milliseconds does it gain in 8 hours?`,
      answer: 1440,
      unit: "ms",
      tolerance: { abs: 2 },
      explanation: md`$50\times10^{-6}\times 28{,}800 = 1.44$ s. Rule of thumb: 1 ppm = 3.6 ms per hour.`,
      concepts: ["aw02.clock-drift"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw02-l03-q2",
      type: "order",
      prompt: "Order these synchronisation methods from most to least accurate for aligning instruments on a single bench.",
      items: [
        "Shared sample clock and start trigger in one chassis",
        "PTP with hardware timestamping and PTP-aware switches",
        "NTP on a local network",
        "Free-running clocks with no synchronisation",
      ],
      explanation: md`Shared clock: aligned to the sample, no relative drift. PTP with hardware timestamps: sub-microsecond. NTP on a LAN: about a millisecond. Free-running: seconds of offset and tens of ppm drift.`,
      concepts: ["aw02.hardware-sync", "aw02.ptp"],
      difficulty: 1,
    },
    {
      id: "aw02-l03-q3",
      type: "mcq",
      prompt: "What assumption lets PTP separate clock offset from network delay?",
      options: [
        "That the follower clock has zero drift",
        "That the path delay is the same in both directions",
        "That GPS is available",
        "That timestamps are taken in software",
      ],
      answer: 1,
      explanation: md`With symmetric delay, offset $= ((t_2-t_1)-(t_4-t_3))/2$. Asymmetry becomes an undetectable offset error of half its size.`,
      concepts: ["aw02.ptp"],
      difficulty: 1,
    },
    {
      id: "aw02-l03-q4",
      type: "mcq",
      prompt: "An application log shows a test step ending 0.2 s before it started. What is the most likely cause?",
      options: [
        "Aliasing in the DAQ",
        "The log uses wall-clock time and NTP stepped the clock backwards during the step",
        "Too many log lines",
        "PTP path asymmetry",
      ],
      answer: 1,
      explanation: md`Negative durations are the signature of a wall-clock step. Use a monotonic clock for intervals and record (monotonic, UTC) pairs to map to absolute time.`,
      concepts: ["aw02.monotonic-time"],
      difficulty: 2,
    },
    {
      id: "aw02-l03-q5",
      type: "numeric",
      prompt: md`Sync pulses show a device clock reading 0.050 s at reference 0 s and 7,200.310 s at reference 7,200 s. What is the device drift in ppm?`,
      answer: 36.1,
      unit: "ppm",
      tolerance: { abs: 0.2 },
      explanation: md`Slope $= (7{,}200.310 - 0.050)/7{,}200 = 1.0000361$, so $\delta = 36.1$ ppm (fast). Offset 50 ms.`,
      concepts: ["aw02.clock-fit", "aw02.clock-drift"],
      difficulty: 2,
    },
    {
      id: "aw02-l03-q6",
      type: "multi",
      prompt: "Which of these are latency (systematic delay) rather than jitter? (Select all that apply.)",
      options: [
        "Group delay of a delta-sigma ADC's digital filter",
        "Random variation in when the OS services a USB interrupt",
        "A camera frame captured on average half a frame after the screen changed",
        "A log line written after a function returns rather than when it is called",
      ],
      answer: [0, 2, 3],
      explanation: md`Latency is a bias you can characterise and subtract per source. OS interrupt servicing variation is random jitter, reduced only by timestamping in hardware.`,
      concepts: ["aw02.clock-drift"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw02-l03-f1", front: "1 ppm of drift equals", back: "1 µs per second, 3.6 ms per hour, 86.4 ms per day", concepts: ["aw02.clock-drift"] },
    { id: "aw02-l03-f2", front: "PTP offset formula", back: md`$\theta = ((t_2-t_1)-(t_4-t_3))/2$`, concepts: ["aw02.ptp"] },
    { id: "aw02-l03-f3", front: "PTP mean path delay", back: md`$d = ((t_2-t_1)+(t_4-t_3))/2$`, concepts: ["aw02.ptp"] },
    { id: "aw02-l03-f4", front: "Typical crystal vs TCXO vs OCXO", back: "XO ±10 to 100 ppm; TCXO ±0.5 to 2 ppm; OCXO ±0.01 to 0.1 ppm", concepts: ["aw02.clock-drift"] },
    { id: "aw02-l03-f5", front: "How to align two streams on different clocks", back: "Record common sync events on both, fit device time vs reference time with a line (offset, drift), map every timestamp.", concepts: ["aw02.clock-fit"] },
    { id: "aw02-l03-f6", front: "Why use a monotonic clock for event logs?", back: "Wall-clock time can be stepped by NTP or jump at DST; monotonic time only moves forward, so ordering and durations stay correct.", concepts: ["aw02.monotonic-time"] },
    { id: "aw02-l03-f7", front: "NTP vs PTP accuracy (typical)", back: "NTP: about 1 ms on a LAN, tens of ms over the internet. PTP with hardware timestamps: sub-microsecond.", concepts: ["aw02.ptp"] },
  ],
  scenarios: [
    {
      id: "aw02-s1",
      title: "\"We already sync everything with NTP\"",
      dayInLife: true,
      context: md`Illustrative discovery call with the test systems lead at a motor and drive test lab. You have explained that Lockstep records rig signals and on-screen actions on one clock. She replies: "We already sync all our PCs with NTP, and the DAQ is set from the PC at the start of each test. Why would we need anything else?"`,
      start: "a",
      concepts: ["aw02.clock-drift", "aw02.ptp", "aw02.clock-fit"],
      nodes: {
        a: {
          md: md`How do you respond?`,
          choices: [
            { text: "\"NTP is outdated; you should be on PTP.\"", score: 2, feedback: "Lecturing before understanding her problem. She may be right that NTP is enough for her questions.", next: "b" },
            { text: "\"That may be enough. Can I ask what happens after the start? Does the DAQ keep its own clock during the test, and how long are your runs?\"", score: 9, feedback: "You test her assumption with her own facts: the DAQ is set once, then free-runs.", next: "c" },
            { text: "\"Our system makes NTP unnecessary.\"", score: 0, feedback: "An unsupported product claim, and it dismisses her setup.", next: "b" },
          ],
        },
        b: {
          md: md`She is a little defensive: "Our data are fine. We have never had a timing problem."`,
          choices: [
            { text: "Back off and ask how they line up a sequencer step with a DAQ trace today, and how long it takes.", score: 7, feedback: "Recovers by moving to her workflow instead of arguing.", next: "c" },
            { text: "Insist that every lab has timing problems.", score: 0, feedback: "You lose the call." },
          ],
        },
        c: {
          md: md`She says: "The DAQ free-runs during the test. Endurance runs are 8 to 12 hours. When we look at a fault, we line up the sequencer log with the DAQ trace by eye on the contactor event."`,
          choices: [
            { text: "Do the arithmetic with her: \"If the DAQ crystal is 30 ppm off, that is about 0.9 to 1.3 s over your runs, on top of NTP's millisecond-level offset at the start. Lining up by eye on one event fixes the offset at that point but not the drift elsewhere. How often does a fault happen hours after the contactor event?\"", score: 10, feedback: "You turn her own facts into a number and a specific failure mode she can check.", next: "d" },
            { text: "Offer a demo next week.", score: 4, feedback: "Premature: you have not yet established that she has the problem.", next: "d" },
          ],
        },
        d: {
          md: md`She thinks: "Faults usually happen late in endurance runs. We have had arguments about whether the inverter or the sequencer acted first." What next?`,
          choices: [
            { text: "Propose a low-effort check: record a sync pulse from the sequencer PC on a spare DAQ channel every minute for one endurance run, and you will send her the measured offset and drift. Agree a date and who wires it.", score: 10, feedback: "A concrete, cheap experiment with her data that quantifies the problem and earns the next meeting." },
            { text: "Send her a brochure about Lockstep's synchronisation.", score: 3, feedback: "Generic and unproven; the experiment would have been far more persuasive." },
          ],
        },
      },
    },
  ],
};

export default lesson;
