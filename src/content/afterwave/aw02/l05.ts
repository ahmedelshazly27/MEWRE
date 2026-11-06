import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw02-l05",
  title: "Capturing on-screen actions and software context alongside signals",
  summary:
    "Signals say what the rig did; software context says why. Event logs, test-sequencer steps, operator actions, configuration and firmware versions, and screen recordings: how each is captured and timestamped, how events are joined to sampled signals, why one clock across all of them matters, what Lockstep's job is (as defined), and the privacy and security questions that screen capture raises.",
  minutes: 70,
  objectives: [
    "Distinguish sampled signals from event data and choose the right join (as-of, interval) to combine them",
    "List the software-context sources on a bench and how each is captured and timestamped",
    "Compute screen-recording volumes and the timing resolution a frame rate gives",
    "Explain with a worked example why one clock is required to read cause and effect across signals and actions",
    "Describe Lockstep's job accurately, without claiming capabilities beyond its definition, and handle privacy and security questions about screen capture",
  ],
  concepts: [
    { id: "aw02.event-data", name: "Event data vs sampled signals", description: "Signals are fixed-rate samples of continuous quantities; events are irregular timestamped records (operator actions, test steps, state changes, alarms). They are combined with as-of joins (latest state before each sample) and interval annotation.", competency: "aw-data", related: ["aw02.clock-fit", "aw02.one-clock"] },
    { id: "aw02.screen-capture", name: "Screen capture as test evidence", description: "Video of the test software and HMIs, with per-frame timestamps, showing what the operator saw and did; compresses to roughly 0.5 to 3 Mbit/s for screen content; timing resolution limited by frame interval and display latency.", competency: "aw-data", related: ["aw02.event-data"] },
    { id: "aw02.one-clock", name: "One clock across signals and actions", description: "Every signal, event and frame mapped to the same time base with known residual error, so ordering and latency between an action and the rig's response can be read directly.", competency: "aw-data", related: ["aw02.clock-drift", "aw02.clock-fit", "aw02.lockstep-capture"] },
    { id: "aw02.lockstep-capture", name: "Lockstep's job", description: "Afterwave's capture app: it records rig signals via data acquisition and on-screen actions on one clock, producing the bench memory that Ripple and later models and agents use.", competency: "aw-data", related: ["aw02.one-clock", "aw02.screen-capture"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Signals tell you what happened; context tells you why",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`This lesson is closest to the product. Lockstep is defined as the capture app that records rig signals via data acquisition **and on-screen actions on one clock**. Many tools record signals; the combination with software context on a common time base is the part you will explain in every first meeting, defend in every technical deep dive and build Ripple on: Ripple can only say "after this firmware change, rerun these tests" if the bench memory knows which firmware, configuration and procedure each test actually ran with.`,
        },
        {
          kind: "md",
          md: md`### Two kinds of data

**Sampled signals** are continuous quantities measured at fixed rates: currents, torques, temperatures. Their time axis is implicit (start plus increment).

**Events** are irregular, discrete records, each with its own timestamp: "operator set torque setpoint to 50 N·m", "sequencer entered step 14: thermal soak", "firmware 3.2.1 flashed", "alarm: over-temperature", "test aborted". They answer the questions signals cannot: what was commanded, by whom, under which configuration, and what the software believed was happening.

### Software-context sources on a bench

| Source | What it contains | How it is usually captured | Timestamp quality |
|---|---|---|---|
| **Test sequencer** (NI TestStand, in-house Python, vendor test software) | Steps, setpoints, limits, pass/fail, retries | Its own result logs or database | PC clock, often wall-clock |
| **Operator HMI and test software GUIs** | Buttons pressed, parameters edited, dialogs dismissed | Often not captured at all; sometimes application logs | PC clock |
| **Device under test firmware** | Internal states, fault codes, its own measurements | Debug logs over UART, CAN or Ethernet; calibration tools | Device clock, often uptime |
| **Configuration and versions** | Firmware build hash, model version, rig configuration, DAQ setup, test procedure version | Manually in a spreadsheet or file name, if at all | Not timestamped |
| **Bus traffic** | CAN, CAN FD, EtherCAT, Ethernet messages | Bus loggers (MDF4, BLF, PCAP) | Logger hardware clock |
| **Screen recording** | What the operator saw and did, including tools with no logs | Screen capture software | Video presentation timestamps |
| **Operator notes** | "Smelled burning at about 14:20", "re-seated connector" | Paper, chat, shift handover | Approximate |

### Joining events to signals

Two joins do most of the work:

- **As-of join:** for each sample (or each window), attach the latest event before it, for example the setpoint and test step in force at that instant. This answers "what state was the rig commanded into when this happened?".
- **Interval annotation:** events that open and close a period (step start and end, alarm active and cleared) define intervals; every sample in the interval inherits the label. This is how you compute "mean winding temperature during each thermal soak step across all runs".

Both are only as correct as the timestamps. An as-of join with events 250 ms off assigns the wrong setpoint to every sample in the first 250 ms after each change.

### Screen capture

Screen recording sounds crude but captures what no log does: tools without APIs, error dialogs, what the operator actually saw, which window was active. For bench use the relevant numbers are:

- **Volume:** screen content is mostly static, so modern codecs (H.264, H.265) compress it extremely well. A 1080p screen at 10 frames per second is about 62 MB/s uncompressed but around 0.5 to 3 Mbit/s encoded, depending on activity.`,
        },
        { kind: "equation", formula: "aw02-video-size" },
        {
          kind: "md",
          md: md`- **Timing resolution:** a change on screen can only be located to within one **frame interval** (100 ms at 10 fps, 33 ms at 30 fps), plus display and capture latency. Each frame must carry a timestamp on the common clock; a video file's nominal frame rate is not enough because capture software drops or duplicates frames under load.
- **Structure:** video alone is hard to query. Its value grows when it is indexed by the same time base as signals and events, so a reviewer can jump from a current spike to what was on screen at that instant.

### Why "one clock" is the point

The previous lesson showed that unsynchronised devices disagree by hundreds of milliseconds per hour. Cause and effect on a bench are often 1 to 100 ms apart: a setpoint change and the current response, a fault code and the contactor opening, a button press and a firmware state change. If the error between sources is larger than the gap between cause and effect, **the order flips** and every causal reading is unreliable. One clock means every signal, event and frame is mapped to the same time base with a known, recorded residual error that is small compared with the dynamics being studied.`,
        },
        {
          kind: "flow",
          title: "From sources to bench memory on one time base",
          steps: [
            { label: "DAQ signals", detail: "Fixed-rate channels with sample clock" },
            { label: "Software events", detail: "Sequencer steps, operator actions, firmware logs, bus messages" },
            { label: "Screen frames", detail: "Video with per-frame timestamps" },
            { label: "One time base", detail: "Sync events, fitted offset and drift, recorded residuals" },
            { label: "Merged timeline per run", detail: "As-of joins and intervals, with configuration and versions" },
            { label: "Bench memory", detail: "Queryable across runs; input to Ripple, models and agents" },
          ],
          caption: "The value is in the merge: signals, actions and context that can be read together without manual alignment.",
        },
        {
          kind: "md",
          md: md`### Lockstep's job, stated precisely

From Afterwave's own definition: **Lockstep is the capture app that records rig signals via data acquisition and on-screen actions on one clock.** Its output is the bench memory that **Ripple** (the change-impact engine: after a firmware, model or rig change, which tests to rerun and why) and, later, models and agents inside **Afterwave Enclave** work on.

When you describe it, stay within that definition. The engineering in this module (sync pulses, PTP, event schemas, frame timestamps) explains **how a capture layer of this kind can be built** and what a buyer will ask. Which of these methods Lockstep uses, which DAQ systems it supports today and what accuracy it achieves are facts that come from Ismail and Yusuf's implementation and measurements, not from this lesson.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Reading cause and effect across sources",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Did the inverter respond before the operator acted?",
          given: md`Illustrative investigation on a drive rig. The test software log says the operator clicked "Apply torque step 50 N·m" at 10:15:02.480 (PC clock, UTC). The DAQ torque channel starts rising at 10:15:02.345 (DAQ reference clock). Sync pulses recorded during the run show the PC clock was 180 ms ahead of the DAQ reference at that time, with a fit residual of 1 ms.`,
          steps: [
            { md: md`**Naive reading (no alignment):** torque rises at 02.345, click at 02.480: the torque moved **135 ms before** the operator asked for it. An engineer might conclude the inverter acted on its own and open a firmware bug.` },
            { md: md`**Map the click onto the reference clock:** $10{:}15{:}02.480 - 0.180 = 10{:}15{:}02.300$.` },
            { md: md`**Corrected reading:** click at 02.300, torque rising at 02.345: a **45 ms response latency** (HMI, sequencer, CAN command, inverter control loop), with about ±1 ms uncertainty from the fit.` },
            { md: md`**Check against expectation:** 45 ms is plausible for a command passing through a PC application, a bus and a control loop; it can now be compared across firmware versions. A change from 45 to 80 ms after a firmware update is a real regression signal that Ripple-style analysis could flag, but only because the clocks agree.` },
          ],
          result: md`Without one clock: a phantom "effect before cause" and possibly a wasted bug hunt. With it: a measurable 45 ms latency that becomes a tracked metric across tests and versions.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Budgeting screen capture for a shift",
          given: md`Illustrative: one 1080p monitor recorded at 10 fps, H.264 average bitrate 1.5 Mbit/s.`,
          steps: [
            {
              md: md`Per hour: $1.5\times10^6\times 3{,}600/8 = 675$ MB.`,
              hidden: true,
              check: { prompt: "Video per hour (MB)", answer: 675, unit: "MB", tolerance: { rel: 0.01 } },
            },
            { md: md`Per 8-hour shift: $675\times 8 = 5.4$ GB, against about 119 GB of DAQ data for the drive rig in Lesson 2. Video is small next to high-rate signals.` },
            { md: md`Uncompressed it would be $1{,}920\times 1{,}080\times 3\times 10 = 62.2$ MB/s, about 224 GB/h: the codec achieves roughly 330x on screen content.` },
            {
              md: md`To locate on-screen changes to within about 33 ms instead of 100 ms, record at 30 fps: frame interval $1{,}000/30 = 33.3$ ms (bitrate rises, but less than 3x for mostly static screens).`,
              hidden: true,
              check: { prompt: "Frame interval at 30 fps (ms)", answer: 33.3, unit: "ms", tolerance: { abs: 0.1 } },
            },
          ],
          result: md`Screen capture costs a few GB per shift; its timing resolution is the frame interval. Per-frame timestamps on the common clock matter more than the frame rate.`,
        },
        {
          kind: "question",
          question: {
            id: "aw02-l05-p1",
            type: "numeric",
            prompt: md`An as-of join attaches the current setpoint to each DAQ sample. The event log is 250 ms behind the DAQ clock (uncorrected). Setpoints change 40 times per hour. How many seconds of data per hour carry the wrong setpoint?`,
            answer: 10,
            unit: "s",
            tolerance: { abs: 0.1 },
            explanation: md`After each change, the first 0.25 s of samples still get the old setpoint (the event appears late). $40\times 0.25 = 10$ s per hour. Small in total, but those 10 seconds are exactly the transients after each change, which are usually the most interesting data.`,
            concepts: ["aw02.event-data", "aw02.one-clock"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Capturing context in real labs: practice, privacy and security",
      blocks: [
        {
          kind: "md",
          md: md`### What labs do today

- Test sequencers write result files and sometimes databases; operator actions in GUIs are rarely logged.
- Configuration is tracked in file names ("run_fw321_new_cooling_v2_FINAL.tdms"), spreadsheets and memory.
- Some teams record screens or point a camera at the rig, but the video is not timestamped against the DAQ, so it is watched, not queried.
- When a regression is found weeks later, the team reconstructs what changed by asking people.

This gap between signals and context is the problem the capture layer addresses. Your job in discovery is to find out how big it is for a specific team, in their numbers: hours spent reconstructing context, tests repeated because the configuration was unknown, arguments about what happened first.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Privacy and labour law: screen capture records people",
          md: md`Recording screens and operator actions records employees' work. In the EU this is processing of personal data under the GDPR, which needs a lawful basis, purpose limitation, data minimisation, retention limits and transparency to the people recorded. In the Netherlands, Germany and Switzerland, systems that can monitor employee behaviour or performance generally involve the works council or employee representatives. Practical design consequences: capture only the test applications, not the whole desktop; blur or exclude personal windows; tie recordings to runs rather than to people where possible; set retention; and agree all of this with the customer's data protection officer before the pilot.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Legal references to confirm",
          md: md`Works council co-determination over technical systems capable of monitoring employees is commonly cited as section 87(1) no. 6 of the German Works Constitution Act (BetrVG) and article 27 of the Dutch Works Councils Act (WOR). Confirm the exact provisions and their application to a specific pilot with counsel before relying on them.`,
        },
        { kind: "xref", to: "fc08-l07", note: "Founder Core: data and training rights in pilot and customer agreements: who owns captured bench data and what Afterwave may do with it." },
        { kind: "xref", to: "fc04-l06", note: "Founder Core: pilots and enterprise security reviews; screen and log capture on test PCs will be examined closely." },
        {
          kind: "callout",
          tone: "pm",
          title: "Security questions you will get",
          md: md`Test PCs often sit on restricted networks and run validated software. Expect: Does the capture software need admin rights? Does it send anything off the machine, and where? Can it be limited to named applications? How is captured data protected at rest and in transit? Does it affect the timing or performance of the test software? Answers must come from the actual implementation; this is also where the Enclave positioning (data stay on customer servers or an isolated tenant) is tested in detail.`,
        },
        { kind: "scenario", scenario: "aw02-s2" },
        {
          kind: "question",
          question: {
            id: "aw02-l05-p2",
            type: "short",
            prompt: md`Produce two things for a first technical meeting with an illustrative humanoid actuator test team. (1) A 120 to 180 word description of what Lockstep does and why one clock matters, accurate to Afterwave's definition and making no claims about supported hardware or accuracy. (2) A draft **event schema** for software context: the fields every captured event should have, with one example event for an operator action and one for a firmware flash.`,
            explanation: md`The description must stay within the definition (rig signals via DAQ and on-screen actions on one clock) and explain value through cause and effect. The schema must make every event joinable to signals (common time base, run id) and traceable (source, versions).`,
            rubric: [
              "Description matches the definition: records rig signals via data acquisition and on-screen actions on one clock; links to bench memory and Ripple without inventing features, integrations, customers or accuracy numbers",
              "Explains one clock through cause and effect (ordering and latency between actions and rig response), in the buyer's language",
              "Schema has identity and linkage fields: event id, run id, source, type",
              "Schema has timing fields: timestamp on the common time base, original source timestamp and clock id, and an uncertainty or alignment reference",
              "Schema has content fields: actor or origin, target (parameter, UI element, device), old and new value, software or firmware version",
              "Two example events are consistent with the schema and realistic",
            ],
            modelAnswer: md`**(1) Description.** Lockstep is Afterwave's capture app. It records your rig's signals through data acquisition and the actions taken on screen during a test, on one clock. That means a setpoint change in your test software, the firmware fault code that follows and the torque and current traces all sit on the same time base, so you can read what happened first and how long the rig took to respond without lining files up by hand. Every run becomes part of your bench memory: signals plus the context of what was commanded and under which configuration. That is what Ripple, our change-impact engine, uses to tell you which tests to rerun after a firmware, model or rig change, and why. Which DAQ systems and applications we connect to on your bench is something we will confirm with you during setup.

**(2) Event schema (draft).**

| Field | Meaning |
|---|---|
| event_id | Unique id |
| run_id | Test run the event belongs to |
| source | Recorder that captured it (screen capture, sequencer log, firmware log, bus logger) |
| type | operator_action, sequencer_step, config_change, firmware_flash, alarm, note |
| t_ref | Timestamp on the run's common time base (UTC, ns resolution) |
| t_source, clock_id | Original timestamp and the clock that produced it |
| align_ref | Id of the clock fit used and its residual |
| actor | Operator id or pseudonym, or "system" |
| target | Parameter, UI element or device acted on |
| old_value, new_value | Values with units |
| versions | Application, firmware and procedure versions in force |
| evidence | Link to frame range or log line |

Examples: operator_action, actor op-07, target joint2.torque_setpoint, old 10 N·m, new 50 N·m, source screen capture plus app log, t_ref 2027-01-15T10:15:02.300Z, frames 6123 to 6125. firmware_flash, actor system, target joint2.controller, old 3.2.0 (hash a1f9), new 3.2.1 (hash 7c2e), source flashing tool log, t_ref 2027-01-15T09:02:11.874Z.`,
            concepts: ["aw02.lockstep-capture", "aw02.event-data", "aw02.one-clock"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a robotics investor why recording on-screen actions on the same clock as rig signals is more than a convenience.",
          keyPoints: [
            "Signals show what the hardware did; actions and configuration show what was commanded and why",
            "Cause and effect on a bench are milliseconds apart, while unsynchronised clocks drift hundreds of milliseconds per hour",
            "Without one clock, ordering flips and causal conclusions are wrong",
            "With one clock, latencies and state become measurable and comparable across runs and versions",
            "That context is what makes bench memory usable for change impact (Ripple) and later for models and agents",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw02-l05-q1",
      type: "mcq",
      prompt: "Which statement describes Lockstep accurately, according to Afterwave's definition?",
      options: [
        "A change-impact engine that decides which tests to rerun",
        "A capture app that records rig signals via data acquisition and on-screen actions on one clock",
        "A private environment for running models and agents on customer servers",
        "A hardware test platform for actuators",
      ],
      answer: 1,
      explanation: md`Ripple is the change-impact engine; Afterwave Enclave is the private environment; instrumented test platforms are a later part of the vision.`,
      concepts: ["aw02.lockstep-capture"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw02-l05-q2",
      type: "mcq",
      prompt: "You need the commanded setpoint in force at every DAQ sample. Which join do you use?",
      options: ["Inner join on exact timestamps", "As-of join: latest setpoint event at or before each sample", "Cross join", "Average of all setpoints in the run"],
      answer: 1,
      explanation: md`Events and samples almost never share exact timestamps. The as-of join carries the last known state forward, which is what a setpoint is.`,
      concepts: ["aw02.event-data"],
      difficulty: 1,
    },
    {
      id: "aw02-l05-q3",
      type: "numeric",
      prompt: md`A screen recording averages 2 Mbit/s. How many GB does a 12-hour overnight run produce?`,
      answer: 10.8,
      unit: "GB",
      tolerance: { rel: 0.01 },
      explanation: md`$2\times10^6\times 43{,}200/8 = 10.8\times10^9$ B.`,
      concepts: ["aw02.screen-capture"],
      difficulty: 1,
    },
    {
      id: "aw02-l05-q4",
      type: "numeric",
      prompt: md`An alarm event is logged at 14:00:00.900 on a PC clock that is 300 ms behind the DAQ reference. The DAQ shows the contactor opening at 14:00:01.150. What is the delay (ms) from alarm to contactor opening on the reference clock?`,
      answer: -50,
      unit: "ms",
      tolerance: { abs: 1 },
      explanation: md`PC behind by 300 ms means reference = PC + 0.300 = 14:00:01.200. Contactor at 01.150 is **50 ms before** the logged alarm: the answer is negative. Either the contactor opened on another trigger (hardware protection acting before software), or the alarm is logged with latency after detection. This is the kind of question one clock lets you ask.`,
      concepts: ["aw02.one-clock", "aw02.event-data"],
      difficulty: 3,
    },
    {
      id: "aw02-l05-q5",
      type: "multi",
      prompt: "Which design choices reduce privacy risk of screen capture on test PCs? (Select all that apply.)",
      options: [
        "Capture only named test applications rather than the full desktop",
        "Agree purpose, retention and access with the customer's data protection officer before the pilot",
        "Record continuously, including breaks, to be complete",
        "Link recordings to runs and use pseudonymous operator ids where possible",
      ],
      answer: [0, 1, 3],
      explanation: md`Data minimisation and purpose limitation favour narrow, run-linked capture with agreed retention. Continuous recording including breaks is the opposite.`,
      concepts: ["aw02.screen-capture"],
      difficulty: 2,
    },
    {
      id: "aw02-l05-q6",
      type: "decision",
      prompt: md`In a demo, a prospect asks: "What timing accuracy does Lockstep achieve between our DAQ and the test software?" You do not have a measured number for their setup. What do you answer?`,
      options: [
        { text: "\"Sub-millisecond.\"", score: 0, feedback: "An unmeasured claim. If it fails in the pilot, you lose credibility on everything else." },
        { text: "Explain how alignment is done and what limits it on their setup, give the residual you have measured on your own bench if Ismail and Yusuf have one, and propose measuring it on their rig in week one of the pilot.", score: 1, feedback: "Correct: honest, specific, and turns the question into a pilot success criterion." },
        { text: "\"It depends,\" and move on.", score: 0.2, feedback: "True but evasive; technical buyers read it as not knowing." },
      ],
      explanation: md`Accuracy depends on the sources and their clocks. Make it measurable and part of the pilot plan.`,
      concepts: ["aw02.lockstep-capture", "aw02.one-clock"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw02-l05-f1", front: "Lockstep (definition)", back: "Afterwave's capture app: records rig signals via data acquisition and on-screen actions on one clock.", concepts: ["aw02.lockstep-capture"] },
    { id: "aw02-l05-f2", front: "Sampled signal vs event", back: "Signal: fixed-rate samples, implicit time axis. Event: irregular record with its own timestamp (action, step, state change).", concepts: ["aw02.event-data"] },
    { id: "aw02-l05-f3", front: "As-of join", back: "Attach to each sample the latest event at or before it (for example the setpoint in force).", concepts: ["aw02.event-data"] },
    { id: "aw02-l05-f4", front: "Screen video volume (1080p, 1.5 Mbit/s)", back: "675 MB per hour, 5.4 GB per 8-hour shift", concepts: ["aw02.screen-capture"] },
    { id: "aw02-l05-f5", front: "Timing resolution of screen capture", back: "One frame interval (100 ms at 10 fps, 33 ms at 30 fps) plus display and capture latency", concepts: ["aw02.screen-capture"] },
    { id: "aw02-l05-f6", front: "When does misalignment flip cause and effect?", back: "When the clock error between sources exceeds the real delay between cause and effect (often 1 to 100 ms on a bench).", concepts: ["aw02.one-clock"] },
  ],
  scenarios: [
    {
      id: "aw02-s2",
      title: "\"We could do this with our DAQ software and a screen recorder\"",
      context: md`Illustrative technical meeting with a battery test engineering manager. After your explanation of Lockstep, he says: "Our DAQ software already logs everything, and I could install a free screen recorder on the test PCs tomorrow. What would we be paying you for?"`,
      start: "a",
      concepts: ["aw02.one-clock", "aw02.screen-capture", "aw02.lockstep-capture"],
      nodes: {
        a: {
          md: md`What is your first move?`,
          choices: [
            { text: "Agree that the pieces exist and ask him to walk through how he would answer a specific question with them: \"On last month's failed run, what did the operator change in the 10 seconds before the cell temperature started rising?\"", score: 10, feedback: "You move from features to a job he must do, which exposes alignment, context and search effort.", next: "b" },
            { text: "List Lockstep's features against the screen recorder's.", score: 3, feedback: "A feature comparison invites him to say 'close enough'.", next: "b" },
            { text: "Say free tools are not enterprise-grade.", score: 1, feedback: "Dismissive and unspecific.", next: "c" },
          ],
        },
        b: {
          md: md`He thinks it through: "I would find the video for that day, find the DAQ file, guess the offset from the clock in the corner of the screen, scrub through... maybe an hour, if the files are where they should be."`,
          choices: [
            { text: "Quantify with him: how often does such a question come up per month, how many engineers, and what happens when the answer is wrong (repeated tests, rig time)? Write his numbers down.", score: 10, feedback: "Now the value is in his numbers, which is what a business case and a pilot success criterion need.", next: "d" },
            { text: "Tell him Lockstep does it in seconds.", score: 4, feedback: "Possibly true, but you skipped quantifying his pain and made a claim you have not demonstrated on his data.", next: "d" },
          ],
        },
        c: {
          md: md`He shrugs: "Our IT has approved that recorder already." The meeting cools.`,
          choices: [
            { text: "Recover by asking for the most recent investigation where they needed to know what happened on screen, and how long it took.", score: 6, feedback: "Back to his work, though you lost some goodwill.", next: "b" },
          ],
        },
        d: {
          md: md`He estimates about 8 such investigations a month, 1 to 3 hours each, and two repeated test runs per quarter because the configuration could not be reconstructed. What do you propose?`,
          choices: [
            { text: "A pilot on one rig with success criteria in his terms: time to answer a context question, residual alignment error measured on his bench, and configuration known for every run; plus a check with his data protection officer on screen capture scope.", score: 10, feedback: "Measurable, scoped, and it anticipates the privacy question before it blocks the pilot." },
            { text: "A company-wide licence quote.", score: 2, feedback: "Too early: nothing has been proven on his rig yet." },
          ],
        },
      },
    },
  ],
};

export default lesson;
