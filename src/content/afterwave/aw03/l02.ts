import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw03-l02",
  title: "HIL systems in practice: architecture, IO, fault injection and utilisation",
  summary:
    "Inside a HIL rack: host, real-time target, FPGA and IO boards, signal conditioning, failure insertion units, bus interfaces, loads and power supplies, and the software layers above them (experiment tools, ASAM XIL, test automation). How dSPACE-, NI-, Speedgoat- and Vector-style systems differ, how fault injection is done and why the matrix explodes, and the economics: cost per useful hour as a function of utilisation.",
  minutes: 85,
  objectives: [
    "Draw the signal path of a HIL system from the test script to the device's pins and back",
    "Compare dSPACE-, NI-, Speedgoat- and Vector-style architectures by where the model runs, how IO is built and how tests are automated",
    "Explain electrical, bus, sensor and timing fault injection and size a fault-injection matrix",
    "Compute cost per executed hour from capex, fixed cost and utilisation, and explain why overnight automation is the main lever",
    "Handle the objection 'we already have dSPACE' without claiming to replace HIL",
  ],
  concepts: [
    { id: "aw03.hil-architecture", name: "HIL system architecture", description: "Host PC with experiment and automation software; real-time target with CPU cores and FPGA; IO boards and signal conditioning; failure insertion unit; bus interfaces; real or simulated loads; programmable power supplies; harness and break-out box to the device under test.", competency: "aw-test", related: ["aw03.xil-ladder", "aw03.fpga-hil"] },
    { id: "aw03.fault-injection", name: "Fault injection", description: "Deliberately inserting electrical (open, short to ground or supply, pin-to-pin), bus (missing, delayed, corrupted messages), sensor (offset, drift, stuck, noise) and timing faults to test the device's detection and safe reaction.", competency: "aw-test", related: ["aw03.hil-architecture"] },
    { id: "aw03.failure-insertion-unit", name: "Failure insertion unit (FIU)", description: "Relay or semiconductor switching matrix between HIL IO and the device's pins that can open lines or short them to ground, supply or another pin under software control.", competency: "aw-test", related: ["aw03.fault-injection"] },
    { id: "aw03.asam-xil", name: "ASAM XIL", description: "Standard API between test automation software and test benches (model access, signal read and write, electrical error simulation), so test scripts can move between MIL, SIL and HIL and between vendors.", competency: "aw-test", related: ["aw03.hil-architecture"] },
    { id: "aw03.rig-utilisation", name: "Rig utilisation and cost per hour", description: "Executed test hours divided by available hours; because HIL and rig costs are mostly fixed, cost per useful hour falls as 1/u, making unattended overnight execution the main economic lever.", competency: "aw-test", related: ["aw03.hil-architecture"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What is in the rack",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`HIL systems are among the most expensive and most booked assets in a validation lab, and they are owned by the people Afterwave sells to. A prospect will judge you in the first ten minutes on whether you understand what an FIU is, why their HIL sits idle at night, and why a "small" firmware change can trigger thousands of fault cases. It also tells you where Lockstep plugs in (the signals and actions around the HIL) and where it must not (the real-time loop and the safety chain).`,
        },
        {
          kind: "md",
          md: md`### The signal path

From the test engineer's script to the device's pins:

1. **Host PC**: experiment software (dSPACE ControlDesk, NI VeriStand, Simulink Real-Time Explorer, Vector CANoe), test automation (AutomationDesk, TestStand, vTESTstudio, ecu.test, Python), model build toolchain.
2. **Real-time target**: multi-core CPU running a real-time OS, executing the plant model at a fixed step; one or more **FPGA** boards for fast IO and fast models.
3. **IO boards**: analog in and out, digital in and out, PWM capture and generation, resolver, encoder and Hall emulation, resistance simulation (thermistors), current-sensor emulation.
4. **Signal conditioning**: level shifting to automotive or industrial voltages (12, 24, 48 V), protection, galvanic isolation.
5. **Failure insertion unit (FIU)**: switches between IO and device pins that can open a line or short it.
6. **Bus interfaces**: CAN and CAN FD, LIN, FlexRay, automotive Ethernet, EtherCAT and other industrial fieldbuses, with **rest-bus simulation** (the HIL pretends to be every other ECU on the network).
7. **Loads**: real loads (actual solenoids, valves, a small motor) or electronic loads; the device must see realistic current.
8. **Programmable power supplies**: emulate battery voltage, cranking dips, supply interruptions.
9. **Harness and break-out box** to the **device under test (DUT)**, plus a calibration and measurement link into the ECU's internals (XCP over CAN or Ethernet, ASAM MCD-1 XCP).

The interface between automation and bench is standardised by **ASAM XIL**: a script written against XIL can, in principle, run on MIL, SIL or HIL and on different vendors' benches.`,
        },
        {
          kind: "flow",
          title: "HIL signal path",
          steps: [
            { label: "Test script", detail: "Sequencer or Python via ASAM XIL; sets stimuli, reads signals, injects faults" },
            { label: "Real-time target", detail: "CPU cores run the plant model at a fixed step; FPGA runs fast IO and fast models" },
            { label: "IO and conditioning", detail: "Analog, digital, PWM, sensor emulation; level shifting and protection" },
            { label: "FIU", detail: "Open line, short to ground, short to supply, pin to pin" },
            { label: "Harness to DUT", detail: "Real controller with production firmware; XCP for internal variables" },
            { label: "Bus and loads back", detail: "CAN, Ethernet, rest-bus simulation; real or electronic loads close the loop" },
          ],
          caption: "Lockstep-style capture sits alongside this path (recording DAQ signals and operator actions on one clock); it never sits inside the real-time loop or the safety chain.",
        },
        {
          kind: "md",
          md: md`### Four architecture styles

| Style | Where the model runs | IO approach | Automation | Typical strength |
|---|---|---|---|---|
| **dSPACE-style** (SCALEXIO) | Vendor real-time processing units, multi-core, FPGA boards | Vendor IO boards with integrated signal conditioning and FIU channels | ControlDesk, AutomationDesk, XIL API | Automotive ECU and full-vehicle HIL at scale |
| **NI-style** (PXI with VeriStand) | PXI real-time controller, FPGA modules | Modular PXI cards, third-party conditioning and FIU | VeriStand, TestStand, Python | Flexible, mixes DAQ, instruments and HIL; aerospace, energy, industrial |
| **Speedgoat-style** | Target machines running Simulink Real-Time | IO modules and FPGA programmed from Simulink | Simulink Test, MATLAB | Tight MathWorks workflow; rapid control prototyping and HIL in one |
| **Vector-style** (CANoe with VT System) | Network simulation on a PC, simple models; heavy models elsewhere | VT System modules: one channel per ECU pin with measurement, stimulation, load and fault switching | CANoe test modules, vTESTstudio | Network-centric ECU testing, diagnostics, rest-bus |

Power-electronics HIL specialists (Typhoon HIL, OPAL-RT) put switching-level converter models on FPGA at sub-microsecond steps. This table is a simplification from established knowledge of the products; check current product lines before quoting them to a customer.

### Fault injection

A device in a safety-relevant machine must detect faults and reach a safe state. Testing that means creating faults on purpose:

| Class | Examples | Mechanism |
|---|---|---|
| **Electrical** | Open circuit, short to ground, short to supply, pin to pin, increased resistance | FIU relays or semiconductor switches |
| **Bus** | Missing message, wrong cycle time, bad CRC, wrong counter, bus-off, error frames | Rest-bus simulation and bus interface manipulation |
| **Sensor** | Offset, gain error, drift, stuck-at, noise, implausible combination | Model-side manipulation of emulated sensor values |
| **Power** | Undervoltage, cranking dip, interruption, reverse polarity | Programmable supply |
| **Timing** | Delayed response, jitter | Delay in model or bus |

Functional safety standards (ISO 26262 for road vehicles; the same practice spreads to machinery and robotics) list fault injection as a method at system and software integration level. The test matrix grows fast:`,
        },
        { kind: "equation", formula: "aw03-fault-matrix" },
        {
          kind: "md",
          md: md`### Utilisation and cost per hour

A HIL system is mostly fixed cost: depreciation, software licences, maintenance contracts, IO calibration and the engineer who keeps it running. So the cost of a useful hour depends on how many hours it actually runs:`,
        },
        { kind: "equation", formula: "aw03-utilisation" },
        { kind: "equation", formula: "aw03-cost-per-hour" },
        {
          kind: "chart",
          chart: "line",
          title: "Cost per executed HIL hour vs utilisation (illustrative: EUR 230k fixed per year, 8,760 h available)",
          xKey: "u",
          xLabel: "Utilisation of calendar hours",
          yLabel: "EUR per executed hour",
          series: [{ key: "c", label: "Cost per executed hour" }],
          data: [
            { u: "10 %", c: 262.6 },
            { u: "20 %", c: 131.3 },
            { u: "30 %", c: 87.5 },
            { u: "40 %", c: 65.6 },
            { u: "50 %", c: 52.5 },
            { u: "60 %", c: 43.8 },
            { u: "70 %", c: 37.5 },
            { u: "80 %", c: 32.8 },
          ],
          caption: "A one-shift, attended lab sits around 20 to 25 % of calendar hours. Unattended nights and weekends are the steepest part of this curve.",
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "HIL prices are not public",
          md: md`HIL system prices depend on IO count, FPGA content, FIU channels and licences and are quoted per project. Ranges of roughly EUR 100k for a small component HIL to well over EUR 1m for a full-vehicle or multi-ECU system circulate in the industry, but no source in the research brief confirms them. Use the numbers in this lesson as illustrative only and ask the prospect for theirs.`,
        },
        { kind: "widget", widget: "platform-economics", caption: "The same logic for a physical test platform: vary capex, availability and utilisation and watch cost per hour and breakeven move. The curve shape is the same for a HIL rack." },
      ],
    },
    {
      layer: "applied",
      title: "Running the numbers on a HIL lab",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "What overnight automation is worth on one HIL system",
          given: md`Illustrative e-drive validation lab. One HIL system: capex EUR 600k depreciated over 5 years; licences and maintenance EUR 60k/yr; half an HIL engineer (loaded EUR 100k/yr) EUR 50k/yr. Today it runs attended tests only, about 2,190 executed hours per year (25 % of 8,760). With unattended overnight and weekend runs it could reach 6,132 h (70 %). Demand: the team needs about 5,000 HIL hours a year and is buying hours on a second system at the same cost structure to cover the gap.`,
          steps: [
            { md: md`**Fixed cost per year:** $600{,}000/5 + 60{,}000 + 50{,}000 = \text{EUR } 230{,}000$.` },
            { md: md`**Cost per executed hour today:** $c_h = 230{,}000/2{,}190 = \text{EUR } 105$ per hour.` },
            { md: md`**At 70 %:** $c_h = 230{,}000/6{,}132 = \text{EUR } 37.5$ per hour.` },
            { md: md`**Hours covered:** today one system gives 2,190 of the 5,000 hours needed, so a second system is needed; at 70 %, one system gives 6,132 hours and covers demand.` },
            { md: md`**Avoided cost:** not buying the second system saves about EUR 230k a year in fixed cost (or EUR 600k capex up front plus EUR 110k/yr). Unattended operation itself costs something (automation work, recovery hardware such as remote power relays, monitoring), say EUR 60k a year illustrative, so the net is roughly EUR 170k a year.` },
          ],
          result: md`Utilisation, not test duration, drives HIL economics. The obstacles to unattended running are trust (will a failed test leave the rig in a bad state?), recovery (who power-cycles a hung ECU at 03:00?) and knowing which tests are worth running that night. That last one is where change-impact selection and bench memory come in.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Sizing the fault-injection matrix after a firmware change",
          given: md`Illustrative inverter controller: 40 pins routed through the FIU. Single-pin fault types: open, short to ground, short to supply ($n_f = 3$). Each fault is tested at 3 operating points (standstill, mid speed, peak torque). Each case takes 2 minutes including recovery. Pin-to-pin shorts are also possible on any pair.`,
          steps: [
            { md: md`$N_{single} = 40 \times 3 \times 3 = 360$ cases.`, hidden: true, check: { prompt: "Single-pin fault cases", answer: 360, tolerance: { abs: 0 } } },
            { md: md`Time: $360 \times 2 = 720$ min $= 12$ h of HIL.` },
            { md: md`$N_{p2p} = \binom{40}{2} \times 3 = 780 \times 3 = 2{,}340$ cases.`, hidden: true, check: { prompt: "Pin-to-pin cases", answer: 2340, tolerance: { abs: 0 } } },
            { md: md`Time: $2{,}340 \times 2 = 4{,}680$ min $= 78$ h of HIL.`, hidden: true, check: { prompt: "Pin-to-pin HIL hours", answer: 78, unit: "h", tolerance: { abs: 0.5 } } },
            { md: md`In practice teams restrict pin-to-pin shorts to physically adjacent pins in the connector and harness, and choose which cases to rerun after a change by judgement.` },
          ],
          result: md`90 hours of fault injection for one release is a week of one HIL. A firmware change in the overcurrent diagnostic plausibly affects a few dozen of these cases, not all of them; a change in the bootloader, perhaps none. Picking the subset with a written rationale is the Ripple problem in its most concrete form.`,
        },
        {
          kind: "question",
          question: {
            id: "aw03-l02-p1",
            type: "numeric",
            prompt: md`Illustrative: a battery-pack HIL costs EUR 180k a year in fixed cost (depreciation, licences, support) and has 8,760 available hours. It currently executes 1,800 hours of tests a year. What is the cost per executed hour? (EUR)`,
            answer: 100,
            tolerance: { rel: 0.01 },
            unit: "EUR/h",
            explanation: md`$c_h = 180{,}000/1{,}800 = \text{EUR } 100$ per hour; utilisation is $1{,}800/8{,}760 = 20.5\,\%$. Doubling executed hours halves the cost per hour.`,
            concepts: ["aw03.rig-utilisation"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running a HIL lab",
      blocks: [
        {
          kind: "md",
          md: md`### What a HIL team spends its time on

- **Configuration and wiring:** harness per DUT variant, IO mapping, signal conditioning settings. Each change is a rig change that may affect earlier results.
- **Model integration and maintenance:** keeping the plant model in step with hardware revisions; managing model versions per programme.
- **Calibration:** IO channels and conditioning drift; typical calibration intervals are yearly, and an out-of-calibration channel puts every result it touched in question.
- **Debugging the bench, not the DUT:** a large share of "failures" on a HIL are infrastructure: a loose connector, a relay that stuck in the FIU, a licence server timeout. Separating **fail** (DUT behaved wrongly) from **error** (bench could not run the test) is essential (Lesson 5).
- **Scheduling:** the HIL calendar is negotiated between programmes; attended day shifts are booked weeks out.

### Lead times and procurement

New HIL systems are bespoke projects: specification, vendor quotation, build, factory acceptance, installation, then months of integration before productive use. That means HIL capacity is close to fixed within a budget year, and squeezing more useful hours out of existing systems is how most labs respond to demand.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Common HIL lab problems",
          md: md`- **The rig is a pet:** one person knows how to bring it back up, nobody else runs it at night.
- **Configuration drift between "identical" rigs:** a different FIU firmware or harness revision makes results from rig A and rig B incomparable, and halves the effective pool (Lesson 4).
- **Fault cases run once, at the end:** the expensive matrix is run before release; a late failure has nothing to bisect against.
- **Faults injected but reactions not measured precisely:** the requirement says "detect within 10 ms", the test checks only that a fault code appeared. Timing evidence needs the signals, on one clock.`,
        },
        {
          kind: "ask",
          title: "Questions for a HIL lab manager",
          items: [
            "How many HIL systems do you run, how many hours do they execute per week, and how much of that is unattended?",
            "What stops you running them overnight today?",
            "When firmware changes, how do you decide which fault-injection cases to rerun?",
            "How do you tell a bench error from a DUT failure in your results today?",
            "Where do HIL results and signal recordings end up, and can you find last year's run for a given firmware build?",
          ],
        },
        { kind: "scenario", scenario: "aw03-s1" },
        {
          kind: "question",
          question: {
            id: "aw03-l02-p2",
            type: "short",
            prompt: md`**Write the "HIL economics" slide and talk track (one slide, five to eight bullets plus a short table) that you would use with the head of validation at an illustrative e-drive lab.** It must show cost per executed hour at current and target utilisation, the hours gap it closes, what blocks unattended running, and where Afterwave fits (Lockstep capture around the HIL, Ripple choosing what to rerun) without claiming Afterwave replaces or controls the HIL. Label all numbers illustrative and state the formula.`,
            rubric: [
              "States the cost-per-hour formula (fixed annual cost divided by executed hours, or (capex/life + fixed)/(u x available hours)) and computes it correctly at two utilisations",
              "Connects higher utilisation to a concrete outcome (avoided second system, shorter queue, more regression coverage per release)",
              "Names the real blockers to unattended running (recovery from hangs, safe state, trust in results, choosing what to run) rather than generic 'efficiency'",
              "Positions Afterwave correctly: capture of signals and actions on one clock and change-impact selection; explicitly not replacing or controlling the HIL vendor's system",
              "All numbers labelled illustrative; no invented customers or results",
            ],
            modelAnswer: md`**Slide: "Your HIL hours are your most expensive test hours" (illustrative numbers)**

| | Today | Target |
|---|---|---|
| Executed hours / yr | 2,190 (25 %) | 6,132 (70 %) |
| Fixed cost / yr | EUR 230k | EUR 230k |
| Cost per executed hour | EUR 105 | EUR 37.5 |

Formula: $c_h = (C_{cap}/L + C_{fix})/(u \cdot 8{,}760)$.

- Your HIL cost is almost all fixed; every unattended hour lowers the cost of every hour.
- At 70 %, one system covers the 5,000 hours a year you currently plan a second system for.
- What blocks nights today: hung ECUs with nobody to power-cycle, uncertainty whether a red result is the DUT or the bench, and no agreed list of what is worth running after a given change.
- Lockstep records HIL signals and operator actions on one clock, so a night's results can be trusted and debugged the next morning.
- Ripple proposes which tests to rerun after a firmware, model or rig change, with the reason for each, so the night is spent on the tests most likely to catch a regression.
- Your dSPACE or NI system, sequencer and safety chain stay as they are; we work alongside them.

**Talk track:** "Before we talk about us: how many hours did your HIL execute last month, and how many of those were at night?"`,
            explanation: md`Graded against the rubric. The strongest answers make the buyer compute their own number.`,
            concepts: ["aw03.rig-utilisation", "aw03.hil-architecture"],
            difficulty: 2,
          },
        },
        { kind: "xref", to: "fc04-l03", note: "Founder Core, demos that sell: show the outcome (hours recovered) before the how." },
        {
          kind: "feynman",
          prompt: "Explain to a non-engineer what a failure insertion unit does and why fault-injection testing grows so quickly.",
          keyPoints: [
            "An FIU is a switch box between the test system and the device's pins that can cut a wire or short it to ground, supply or another pin on command",
            "The device must detect the fault and react safely within a required time, and the test checks that",
            "Cases multiply: pins times fault types times operating points, and pin-to-pin shorts grow with the square of the pin count",
            "Rerunning everything after each change is too expensive, so someone must choose a subset",
          ],
        },
        { kind: "sources", refs: ["aw03-r2", "aw03-r3", "aw03-r5", "aw03-r6", "aw03-r8", "aw03-r10"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw03-l02-q1",
      type: "mcq",
      prompt: "What does rest-bus simulation do on a HIL?",
      options: [
        "Puts the CAN bus to sleep between tests",
        "Simulates the messages of all the other ECUs on the network so the device under test sees a complete bus",
        "Measures bus load",
        "Replaces the plant model",
      ],
      answer: 1,
      explanation: md`A single ECU expects dozens of messages from its neighbours; without them it raises communication faults. Rest-bus simulation provides them and lets the test manipulate them for bus fault injection.`,
      concepts: ["aw03.hil-architecture"],
      difficulty: 1,
    },
    {
      id: "aw03-l02-q2",
      type: "numeric",
      prompt: md`A connector has 30 pins in the FIU. How many distinct pin-to-pin short pairs exist?`,
      answer: 435,
      tolerance: { abs: 0 },
      unit: "pairs",
      explanation: md`$\binom{30}{2} = 30 \times 29/2 = 435$. At 3 operating points and 2 minutes each, that is 43.5 hours of HIL time.`,
      concepts: ["aw03.fault-injection", "aw03.failure-insertion-unit"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw03-l02-q3",
      type: "numeric",
      prompt: md`Illustrative HIL: capex EUR 400k over 5 years, fixed costs EUR 70k/yr, 8,760 available hours, utilisation 40 %. What is the cost per executed hour? (EUR)`,
      answer: 42.8,
      tolerance: { abs: 0.2 },
      unit: "EUR/h",
      explanation: md`$(400{,}000/5 + 70{,}000)/(0.4 \times 8{,}760) = 150{,}000/3{,}504 = \text{EUR } 42.8$ per hour.`,
      concepts: ["aw03.rig-utilisation"],
      difficulty: 2,
    },
    {
      id: "aw03-l02-q4",
      type: "multi",
      prompt: "Which are bus fault injections? (Select all that apply.)",
      options: ["Wrong message counter", "Short to supply on a sensor line", "Missing cyclic message", "Bad CRC", "Thermistor offset"],
      answer: [0, 2, 3],
      explanation: md`Short to supply is electrical (FIU); thermistor offset is a sensor fault injected in the model or resistance simulation.`,
      concepts: ["aw03.fault-injection"],
      difficulty: 1,
    },
    {
      id: "aw03-l02-q5",
      type: "mcq",
      prompt: "What is the purpose of the ASAM XIL standard?",
      options: [
        "A file format for measurement data",
        "A standard API between test automation and test benches so scripts can be reused across MIL, SIL, HIL and vendors",
        "A functional safety standard",
        "A bus protocol",
      ],
      answer: 1,
      explanation: md`MDF is the data format; XIL is the automation interface. In practice portability is partial, but it reduces lock-in.`,
      concepts: ["aw03.asam-xil"],
      difficulty: 1,
    },
    {
      id: "aw03-l02-q6",
      type: "decision",
      prompt: md`A HIL lab manager says: "We already have dSPACE and TestStand. Why would we need you?" What is the best answer?`,
      options: [
        { text: "Our platform is more modern; you should migrate.", score: 0.1, feedback: "Afterwave does not replace HIL or sequencers, and a migration pitch ends the meeting." },
        { text: "We don't replace either. We capture what happens around your runs on one clock and tell you which tests to rerun after a change and why. How do you choose today?", score: 1, feedback: "Correct positioning, and the question turns the objection into discovery." },
        { text: "We are cheaper than dSPACE.", score: 0.1, feedback: "Not the same product category; inviting a price comparison you cannot win and do not need." },
      ],
      explanation: md`The HIL and the sequencer are the execution layer. Afterwave's products are the capture, memory and selection around them.`,
      concepts: ["aw03.hil-architecture"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw03-l02-f1", front: "FIU", back: "Failure insertion unit: switch matrix that opens lines or shorts device pins to ground, supply or another pin under software control.", concepts: ["aw03.failure-insertion-unit"] },
    { id: "aw03-l02-f2", front: "Five fault-injection classes", back: "Electrical, bus, sensor, power supply, timing.", concepts: ["aw03.fault-injection"] },
    { id: "aw03-l02-f3", front: "Cost per executed hour", back: md`$c_h = (C_{cap}/L + C_{fix})/(u\,H_{avail})$: falls as $1/u$.`, concepts: ["aw03.rig-utilisation"] },
    { id: "aw03-l02-f4", front: "Pin-to-pin cases", back: md`$\binom{n}{2} = n(n-1)/2$ per operating point: 40 pins give 780 pairs.`, concepts: ["aw03.fault-injection"] },
    { id: "aw03-l02-f5", front: "Vector-style vs dSPACE-style HIL", back: "Vector: network-centric, CANoe plus VT System per-pin IO. dSPACE: dedicated real-time processors, integrated IO and FIU, heavy plant models.", concepts: ["aw03.hil-architecture"] },
    { id: "aw03-l02-f6", front: "ASAM XIL", back: "Standard API from test automation to MIL, SIL and HIL benches.", concepts: ["aw03.asam-xil"] },
  ],
  scenarios: [
    {
      id: "aw03-s1",
      title: "The HIL calendar is full",
      dayInLife: true,
      context: md`First meeting with the validation lead of an illustrative drive-unit programme. Ismail is with you. She says: "Our two HIL systems are booked for the next five weeks. Management wants a third. Honestly I'm not sure that's the problem."`,
      start: "a",
      concepts: ["aw03.rig-utilisation", "aw03.fault-injection"],
      nodes: {
        a: {
          md: md`What do you ask first?`,
          choices: [
            { text: "How many hours a week do the two systems actually execute tests, and how many of those are at night or at weekends?", score: 10, feedback: "Booked is not the same as executing. This gets to utilisation directly.", next: "b" },
            { text: "Would you like a demo of Ripple?", score: 2, feedback: "Too early. You do not know where their hours go yet.", next: "b" },
            { text: "Which HIL vendor do you use?", score: 4, feedback: "Useful later, but it does not reach the economics.", next: "b" },
          ],
        },
        b: {
          md: md`She checks: about 45 executed hours per system per week, almost all on the day shift. "Nights are dead. If something hangs at 2am the ECU sits in a fault state and we lose the morning recovering it. And after a firmware drop we just rerun the whole fault matrix because nobody wants to argue about a subset."`,
          choices: [
            { text: "Compute it with her: 45 of 168 hours is 27 % utilisation. Ask what would make nights safe (remote power-cycle, automatic safe state, alerting) and how big the full fault matrix is in hours.", score: 10, feedback: "You turned the anecdote into numbers she can take to management, and you found two separate problems: recovery and selection.", next: "c" },
            { text: "Tell her Afterwave will run her rigs overnight with agents.", score: 1, feedback: "Overstated. Agents running rigs with approval is a later product stage, not something to promise in a first meeting, and it ignores the recovery problem she just described.", next: "c" },
          ],
        },
        c: {
          md: md`She says the fault matrix is about 80 hours per firmware drop, and they get a drop every two weeks. What do you propose as a next step?`,
          choices: [
            { text: "A short, scoped pilot: Lockstep capture on one HIL for the next two drops, and a Ripple analysis of which fault cases each change plausibly affects, compared after the fact with what the full matrix found. Success criteria agreed in writing.", score: 10, feedback: "Concrete, measurable and honest about what is being tested. It also creates the evidence she needs internally." },
            { text: "Send pricing and a deck.", score: 3, feedback: "No pain quantified on paper, no success criteria: this stalls." },
          ],
        },
      },
    },
  ],
};

export default lesson;
