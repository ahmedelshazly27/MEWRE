import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw01-l01",
  title: "Anatomy of a test bench and a validation organisation",
  summary:
    "What physically sits on a hardware test bench (DUT, fixture, load, sources, instrumentation, automation, safety), how the V-model splits evidence into component, subsystem and system levels, and who in a validation organisation owns which part of it.",
  minutes: 60,
  objectives: [
    "Name the seven functional blocks of a test bench and what each contributes to a valid measurement",
    "Explain the V-model and the difference between verification and validation, with drive-unit examples",
    "Map who does what in a validation organisation: test engineers, technicians, test systems, validation leads, reliability and quality",
    "Estimate where rig hours concentrate across component, subsystem and system levels of a test plan",
  ],
  concepts: [
    { id: "aw01.test-bench-anatomy", name: "Test bench anatomy", description: "The functional blocks of a rig: DUT, fixture, load, sources and conditioning, instrumentation and DAQ, automation and control, safety system, plus data storage.", competency: "aw-test" },
    { id: "aw01.dut-fixture", name: "DUT and fixture", description: "The device under test and the mechanical, electrical and thermal interface that holds it, connects it and defines its boundary conditions.", competency: "aw-test", related: ["aw01.test-bench-anatomy"] },
    { id: "aw01.v-model", name: "V-model", description: "Development model pairing each design level (system, subsystem, component) on the left with a test level on the right that verifies it.", competency: "aw-test" },
    { id: "aw01.verification-vs-validation", name: "Verification vs validation", description: "Verification: did we build it to the specification? Validation: does it do the job in the real use conditions?", competency: "aw-test", related: ["aw01.v-model"] },
    { id: "aw01.validation-roles", name: "Validation organisation roles", description: "Test engineer, technician, test systems engineer, validation lead, reliability engineer, quality engineer, lab manager and design engineer, and what each owns.", competency: "aw-test" },
    { id: "aw01.bench-safety", name: "Bench safety system", description: "Interlocks, emergency stop, guarding, burst containment, high-voltage discharge and insulation monitoring, battery fire protection: the hardware that keeps people safe when the DUT or the test misbehaves.", competency: "aw-test", related: ["aw01.test-bench-anatomy"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What a bench is, and how evidence is organised",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Every Afterwave conversation starts at a bench. Lockstep sits between the instruments and the test executive, Ripple reasons over the tests a validation lead owns, and Enclave stores what the rig produced. If you cannot draw the bench and the org chart around it on a whiteboard, you cannot tell a lab manager where the product plugs in, who signs the purchase order, or why your cofounders' Tesla experience in drive unit and inverter validation is credible. This lesson gives you that drawing.`,
        },
        {
          kind: "md",
          md: md`### A bench is a controlled boundary around a device

A test bench (rig) exists to put a **device under test (DUT)** into known, repeatable conditions, push it through a defined stimulus, and record its response with known uncertainty. Every block on the bench exists to control one of those three things.

| Block | What it does | Drive unit example | Humanoid actuator example | Battery example |
|---|---|---|---|---|
| **DUT** | The thing whose behaviour is in question | Inverter, motor and gearbox as one unit | Joint actuator (motor, harmonic drive, encoder, driver) | Cell, module or pack |
| **Fixture** | Holds and connects the DUT; defines its boundary conditions | Adapter plate, shaft coupling, coolant manifold, HV and LV harness | Clamp, inertia disc or load arm, cable breakout | Cell holder with spring contacts, compression plate, busbars |
| **Load / absorber** | Takes the power out or drives the DUT | Dynamometer (load machine), 250 kW class | Second motor as brake, or a load cell against a fixed arm | Bidirectional cycler channel |
| **Sources and conditioning** | Supplies energy and environment | Battery emulator (DC source), coolant conditioning unit, climate chamber | Low-voltage supply, thermal chamber | Climate chamber, cycler as source |
| **Instrumentation and DAQ** | Converts physics into timestamped numbers | Torque flange, encoder, power analyser, current probes, thermocouples, CAN logger | Torque sensor, encoder, current shunt, IMU, EtherCAT log | Voltage sense leads, current shunt, thermocouples |
| **Automation and control** | Sequences the test, closes control loops | Real-time controller, test executive, HIL for the vehicle simulation | Test script on a PC, motion controller | Cycler schedule software |
| **Safety system** | Stops the test safely when anything goes wrong | Interlocked cell doors, e-stop, burst guard, HV discharge, insulation monitor | Guarding, torque limit, e-stop | Fire detection and suppression, venting, cell voltage limits |

Add **data storage and metadata** (which DUT serial, which firmware, which fixture revision, which calibration) and you have the full rig. Afterwave's thesis lives in that last row: most labs capture the signals but lose the context.

### The measurement chain

Each signal goes through the same chain, and each link adds error:

$$\text{physics} \rightarrow \text{sensor} \rightarrow \text{conditioning} \rightarrow \text{ADC} \rightarrow \text{timestamp} \rightarrow \text{file + metadata}$$

A torque flange with accuracy class 0.05 on a 500 N·m range carries about $\pm 0.25$ N·m of uncertainty at any torque, which is 0.17 % at 150 N·m but 2.5 % at 10 N·m. Range selection is a design decision. The **timestamp** link is where the bench usually breaks: the DAQ, the CAN logger, the power analyser and the test executive each run on their own clock. That problem is aw02's subject and the reason Lockstep exists.

### The V-model: evidence at three levels

The V-model pairs each design step on the left with a test step on the right that checks it. Requirements flow down the left; evidence flows up the right.`,
        },
        {
          kind: "flow",
          title: "The V-model for a drive unit (left side down, right side up)",
          steps: [
            { label: "Customer and system requirements", detail: "Vehicle or robot needs: peak torque, efficiency, noise, life, safety goals" },
            { label: "System design", detail: "Drive unit architecture: inverter, motor, gearbox, cooling, controls" },
            { label: "Subsystem design", detail: "Inverter, motor, gearbox specs and interfaces" },
            { label: "Component design and build", detail: "Power module, gate driver, current sensor, rotor, bearings, firmware modules" },
            { label: "Component verification", detail: "Power module double-pulse and thermal cycling, sensor accuracy, firmware unit tests" },
            { label: "Subsystem verification", detail: "Inverter on a motor emulator, motor on a dyno with a lab inverter, gearbox efficiency rig" },
            { label: "System verification", detail: "Full drive unit on a dyno: performance, efficiency map, durability cycles, thermal limits" },
            { label: "System validation", detail: "Drive unit in the vehicle or robot under real duty cycles: does it do the job?" },
          ],
          caption: "Each right-hand step checks the left-hand step at the same height. Defects found low on the right are cheap; defects found at system validation cost rig weeks and design loops.",
        },
        {
          kind: "md",
          md: md`### Verification is not validation

- **Verification**: "did we build it right?" Compare the product with its specification. A component test that shows the current sensor is within $\pm 0.5$ % over temperature verifies the sensor spec.
- **Validation**: "did we build the right thing?" Show that the product meets the user's need in real conditions. A humanoid walking up stairs for 8 hours without its knee actuator derating validates the actuator, even if every spec was verified.

Standards draw the same line (ISO 26262 and ISO 9001 both use it). In practice labs say "DV" (design validation, prototypes built to show the design meets requirements), "PV" (production validation, parts from production tooling) and "EOL" (end-of-line tests on every production unit, short and pass/fail). The automotive planning document is the **DVP&R** (design verification plan and report): one row per test, with the requirement it covers, sample size, acceptance criterion, rig, schedule and result.

### Who does what

| Role | Owns | Typical day |
|---|---|---|
| **Test engineer** | Test procedures, rig configuration, running and analysing tests | Writes the procedure, sets up the DUT, watches the first run, chases anomalies, writes the report |
| **Test technician** | Fixture build, DUT installation, shift operation | Mounts DUTs, wires sensors, runs overnight shifts, logs events |
| **Test systems / automation engineer** | Rig software, DAQ configuration, test executive, data pipeline | Keeps the rig running, adds channels, fixes logging, integrates new instruments |
| **Validation lead / manager** | The DVP&R, coverage of requirements, sign-off, rig scheduling for a programme | Decides what gets tested, in what order, and whether results are good enough to release |
| **Reliability engineer** | Life tests, accelerated tests, Weibull analysis, field return analysis | Designs life tests, sizes samples, fits failure data, predicts warranty |
| **Quality engineer** | Production and supplier quality, 8D problem solving, PPAP | Runs containment and root cause when parts fail, owns corrective action |
| **Lab manager** | Capacity, budget, rig utilisation, safety, staff | Allocates rig hours between programmes, buys rigs, answers to the VP |
| **Design engineer** | The design; the main consumer of test results | Requests tests, argues about results, changes the design |

Ismail Elmasry's background (drive unit validation, then test systems) spans the validation lead and test systems rows; Yusuf Keklik's (inverter test and reliability) spans test engineer and reliability. That combination is exactly the set of people who will evaluate Afterwave in a customer lab.`,
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Safety is part of the bench, not an add-on",
          md: md`High-voltage drive rigs run 400 to 800 V DC (automotive standards such as ISO 6469-3 treat DC above 60 V as voltage class B, requiring protection against electric shock). A 20,000 rpm rotor stores enough kinetic energy to need burst containment. A battery cell in thermal runaway vents flammable gas. So rigs have interlocked cell doors, e-stops wired into a safety relay or safety PLC, active discharge of DC links, insulation monitoring, and for batteries gas detection and suppression. Any software Afterwave installs must sit outside this safety chain: it may read safety states, it must never be needed for them to work. Expect lab managers to ask this in the first meeting.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Where the rig hours sit in a test plan",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Rig hours by V-model level for a drive unit DV programme",
          given: md`Illustrative DVP&R for one drive unit design validation phase: 60 component tests averaging 8 rig hours each, 50 subsystem tests averaging 20 h, 30 system tests averaging 120 h (system tests include durability cycles). The lab has 2 system dynos, each available 4,000 h per year for this programme.`,
          steps: [
            { md: md`**Component hours:** $60 \times 8 = 480$ h.` },
            { md: md`**Subsystem hours:** $50 \times 20 = 1{,}000$ h.` },
            { md: md`**System hours:** $30 \times 120 = 3{,}600$ h.` },
            { md: md`**Total:** $480 + 1{,}000 + 3{,}600 = 5{,}080$ h. System tests are $30/140 = 21\%$ of the test count but $3{,}600/5{,}080 = 70.9\%$ of the hours.` },
            { md: md`**Calendar:** 3,600 system hours on 2 dynos at 4,000 h/yr each is $3{,}600/8{,}000 = 0.45$ years, about 5.4 months of both dynos, before any retest.` },
            { md: md`**A single retest loop** (a firmware change that forces 10 of the 30 system tests to rerun) adds $10 \times 120 = 1{,}200$ h, a third more system time: 1.8 months of both dynos.` },
          ],
          result: md`System-level tests are few but dominate rig hours and the schedule. That is why the question "which of these system tests must we rerun after this change?" is worth money, and why Ripple's first buyer is the person who owns the system dynos.`,
        },
        {
          kind: "question",
          question: {
            id: "aw01-l01-p1",
            type: "numeric",
            prompt: md`Same programme. A gearbox change means 6 subsystem tests and 4 system tests must rerun. How many rig hours does the change cost?`,
            answer: 600,
            tolerance: { abs: 1 },
            unit: "h",
            explanation: md`$6 \times 20 + 4 \times 120 = 120 + 480 = 600$ h. Four system tests cost four times the six subsystem tests: always look at which level a change pushes you back to.`,
            concepts: ["aw01.v-model"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Walking into a validation lab",
      blocks: [
        {
          kind: "md",
          md: md`### What you see on a lab tour, and what to read from it

- **Whiteboards with rig schedules**: rigs booked weeks ahead means capacity is the constraint, and retest avoidance sells. Empty slots mean the constraint is elsewhere (DUT availability, staff).
- **Fixture shelves**: many fixture revisions with handwritten labels means configuration is tracked in people's heads. Ask how they know which fixture a past result used.
- **USB sticks and shared drives**: data leaves the rig PC manually. Ask how long it takes to find the raw data behind a test report from six months ago.
- **A test executive on every rig** (NI TestStand, LabVIEW, Python frameworks, Vector CANoe for ECU tests, dSPACE for HIL, in-house tools): this is what Lockstep must coexist with, not replace.
- **Separate tools for each data stream**: DAQ files in TDMS or MDF, CAN logs, power analyser exports, screen recordings of the HMI. Each on its own clock.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Mistakes outsiders make in a test lab",
          md: md`- **Calling everything "testing"**: a validation lead hears "we automate testing" and thinks you mean the test executive. Say which level and which job: capture, change impact, retest selection.
- **Ignoring the fixture**: half of all "DUT failures" on a new rig turn out to be fixture or harness problems. A product that records DUT signals but not fixture revision misses the most common root cause.
- **Talking to the design engineer only**: the design engineer consumes results; the validation lead and lab manager own rig hours and budget.
- **Touching the safety chain**: proposing software that sits in the stop path will end the meeting.`,
        },
        { kind: "sources", refs: ["aw01-r1", "aw01-r20", "aw01-r19"] },
        {
          kind: "checklist",
          title: "What to establish in the first lab conversation",
          items: [
            "Which DUTs, at which V-model levels, on how many rigs of which types",
            "Who owns the DVP&R, who owns rig scheduling, who owns rig software and data",
            "Which test executive, DAQ hardware and file formats are in use",
            "How results are traced to DUT serial, firmware version, fixture revision and calibration",
            "How the lab decides what to retest after a change, and how long that decision takes",
            "Safety architecture: what is in the safety chain and what software may only observe",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask a validation lead",
          items: [
            "Walk me through the last time a firmware change landed late in DV. What did you rerun, and how did you decide?",
            "Which of your rigs is the bottleneck, and how far ahead is it booked?",
            "If I pick a test report from last year, how long to find its raw data and the exact DUT configuration?",
            "Which roles touch a test from request to report, and where does it wait?",
          ],
        },
        {
          kind: "xref",
          to: "m05-l05",
          note: "Track 0 covers factory and site acceptance testing (FAT/SAT) for BESS: the same verification logic at the delivery end of a project.",
        },
        {
          kind: "question",
          question: {
            id: "aw01-l01-p2",
            type: "short",
            prompt: md`Produce a one-page **lab map** for an illustrative Afterwave target: the actuator validation team of a humanoid robot company with 6 joint actuator rigs, 1 full-leg rig and a battery lab. Include: (1) the bench blocks for the actuator rig, (2) the V-model levels they test at, (3) the roles you expect and what each would want from Afterwave, (4) where Lockstep, Ripple and Enclave plug in, and (5) what must stay outside Afterwave's scope for safety.`,
            rubric: [
              "Lists the bench blocks correctly for a joint actuator rig (DUT, fixture, load or brake motor, supply, instrumentation and DAQ, automation, safety)",
              "Places tests at component (actuator), subsystem (leg) and system (robot) levels, with an example at each",
              "Names at least five roles and gives each a specific, different interest in the product",
              "Places Lockstep at capture (DAQ and on-screen actions on one clock), Ripple at retest decisions, Enclave as the private data and model environment",
              "States clearly that Afterwave observes but is never part of the safety chain",
              "Uses no invented customer facts and labels assumptions",
            ],
            modelAnswer: md`**Bench (joint actuator rig):** DUT = joint actuator (BLDC motor, harmonic drive, output encoder, driver board, firmware). Fixture = rigid mounting plate, output coupling, cable breakout. Load = second servo motor in torque control as a brake, or a load arm with inertia disc. Sources = 48 V supply, thermal chamber for hot tests. Instrumentation = inline torque sensor, motor and output encoders, phase current shunts, winding and housing thermocouples, EtherCAT bus log. Automation = Python test scripts and a motion controller. Safety = guard with interlocked door, torque and speed limits in the brake drive, hardware e-stop.

**V-model levels:** component = actuator on this rig (torque constant, backlash, efficiency, thermal derating, life). Subsystem = full-leg rig (gait cycle loads, impact). System = whole robot (walking, stairs, fall recovery). Battery lab = component and subsystem tests for the pack.

**Roles and interests (assumed):** test engineer wants less setup and faster reports; test systems engineer wants one capture path instead of five loggers; validation lead wants to know what to rerun after a firmware or gear change; reliability engineer wants life data with full context per unit; lab manager wants rig utilisation and fewer wasted runs; design engineer wants raw data fast, linked to the exact build.

**Afterwave fit:** Lockstep on each rig PC records DAQ, bus and screen actions on one clock with DUT serial, firmware and fixture metadata. Ripple ingests the test catalogue and change history and proposes the rerun list after each change, for the validation lead to approve. Enclave runs on the customer's servers and holds bench memory and models.

**Out of scope:** Afterwave reads safety states but sits outside the interlock and e-stop chain; no Afterwave component is required for the rig to stop safely. All numbers and the org shape are assumptions to verify in discovery.`,
            explanation: md`A good lab map is concrete at the bench level, separates the V-model levels, gives each role a distinct reason to care, places each Afterwave product at a specific point in the workflow, and draws the safety boundary explicitly. Everything not confirmed by the customer is marked as an assumption.`,
            concepts: ["aw01.test-bench-anatomy", "aw01.v-model", "aw01.validation-roles", "aw01.bench-safety"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a generalist investor, in under two minutes, what a test bench is and why system-level tests are the expensive part.",
          keyPoints: [
            "A bench puts a device in known conditions, stimulates it and records its response with known uncertainty",
            "Blocks: DUT, fixture, load, sources, instrumentation, automation, safety, plus data",
            "V-model: component, subsystem and system tests each check a level of the design",
            "System tests are few but take most rig hours, so retests at that level dominate cost and schedule",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw01-l01-q1",
      type: "mcq",
      prompt: "A humanoid actuator meets every component specification but derates after 40 minutes of stair climbing in the robot. Which statement is correct?",
      options: [
        "Verification failed",
        "Verification passed, validation failed",
        "Both passed, the robot is at fault",
        "Neither can be judged without a DOE",
      ],
      answer: 1,
      explanation: md`The actuator was built to spec (verified) but does not do the job under the real duty cycle (not validated). Often the specification itself missed the real thermal load: a requirements gap, found late at the top of the V.`,
      concepts: ["aw01.verification-vs-validation"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw01-l01-q2",
      type: "multi",
      prompt: "Which items belong to the fixture rather than the instrumentation? (Select all that apply.)",
      options: ["Shaft coupling and adapter plate", "Coolant manifold", "Torque flange", "Power analyser", "HV and LV harness to the DUT"],
      answer: [0, 1, 4],
      explanation: md`The fixture holds and connects the DUT and sets its boundary conditions (mechanical, coolant, electrical connection). Torque flange and power analyser measure: they are instrumentation, even though the flange sits mechanically in the drive line.`,
      concepts: ["aw01.dut-fixture"],
      difficulty: 1,
    },
    {
      id: "aw01-l01-q3",
      type: "order",
      prompt: "Order the right side of the V-model from first executed to last.",
      items: ["Component verification", "Subsystem verification", "System verification", "System validation in the product"],
      explanation: md`Evidence builds upward: parts first, then assemblies, then the full system on a rig, then the system in its real use.`,
      concepts: ["aw01.v-model"],
      difficulty: 1,
    },
    {
      id: "aw01-l01-q4",
      type: "numeric",
      prompt: md`A torque flange has $\pm 0.25$ N·m absolute uncertainty. What is the relative uncertainty at 12.5 N·m, in %?`,
      answer: 2,
      tolerance: { abs: 0.05 },
      unit: "%",
      explanation: md`$0.25/12.5 = 0.02 = 2\%$. At 150 N·m it is 0.17 %. Low-load efficiency points need a smaller-range flange or the efficiency map is noise at the bottom.`,
      concepts: ["aw01.test-bench-anatomy"],
      difficulty: 1,
    },
    {
      id: "aw01-l01-q5",
      type: "mcq",
      prompt: "Who normally owns the decision of which tests to rerun after a late design change in a DV programme?",
      options: ["Test technician", "Validation lead", "Quality engineer", "Procurement"],
      answer: 1,
      explanation: md`The validation lead owns the DVP&R and coverage, so the rerun decision (and the rig hours it consumes) is theirs, with the lab manager arbitrating capacity. That makes the validation lead Ripple's natural champion.`,
      concepts: ["aw01.validation-roles"],
      difficulty: 1,
    },
    {
      id: "aw01-l01-q6",
      type: "decision",
      prompt: md`A lab manager asks whether Lockstep can trigger the rig's emergency stop when it sees an anomaly. You are the CEO. What do you answer?`,
      options: [
        { text: "Yes, that is a great feature and we will build it.", score: 0, feedback: "Putting capture software in the safety chain makes it safety-relevant under functional safety rules and destroys your simple deployment story." },
        { text: "No: Lockstep observes and records safety states but never sits in the stop path. It can flag anomalies to the operator or the test executive, which already has a controlled abort.", score: 1, feedback: "Correct. Keep the safety chain in certified hardware; offer alerts and a request to the test executive to abort through its own logic." },
        { text: "Maybe later, once we have more customers.", score: 0.3, feedback: "Avoids the question. The answer is architectural, not a roadmap item." },
      ],
      explanation: md`Safety functions belong in the safety relay or safety PLC and are designed to standards such as ISO 13849. Software that only observes stays out of that scope.`,
      concepts: ["aw01.bench-safety"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw01-l01-f1", front: "DUT", back: "Device under test: the item whose behaviour the test is about.", concepts: ["aw01.dut-fixture"] },
    { id: "aw01-l01-f2", front: "Seven functional blocks of a bench", back: "DUT, fixture, load, sources and conditioning, instrumentation and DAQ, automation and control, safety (plus data and metadata).", concepts: ["aw01.test-bench-anatomy"] },
    { id: "aw01-l01-f3", front: "Verification vs validation", back: "Verification: built to spec? Validation: does the job in real use?", concepts: ["aw01.verification-vs-validation"] },
    { id: "aw01-l01-f4", front: "DVP&R", back: "Design verification plan and report: one row per test with requirement, samples, criterion, rig, schedule and result.", concepts: ["aw01.v-model"] },
    { id: "aw01-l01-f5", front: "DV, PV, EOL", back: "Design validation (prototypes), production validation (production-tooled parts), end-of-line (every unit, short pass/fail).", concepts: ["aw01.v-model"] },
    { id: "aw01-l01-f6", front: "Where system tests sit in rig hours", back: "Few tests, most hours: in the illustrative plan 21 % of tests took 71 % of rig hours.", concepts: ["aw01.v-model"] },
    { id: "aw01-l01-f7", front: "Afterwave and the safety chain", back: "Observe and record safety states; never sit in the stop path.", concepts: ["aw01.bench-safety"] },
  ],
};

export default lesson;
