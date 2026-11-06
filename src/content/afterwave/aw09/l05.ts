import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw09-l05",
  title: "Mechanical design basics and safety interlocks",
  summary:
    "The mechanical and safety engineering of a test rig: load-path stiffness and resonance, alignment, stored energy and containment, guards and interlocks, emergency stop and stop categories, safe torque off and safety PLCs, ISO 13849-1 categories and performance levels, and why safety functions must stay independent of test automation and agents.",
  minutes: 80,
  objectives: [
    "Compute stiffness and natural frequencies of rig load paths and explain the design rules that follow",
    "Quantify stored rotational energy and name the energy sources a rig risk assessment must cover",
    "Describe guards, interlocks with guard locking, emergency stop and IEC 60204-1 stop categories",
    "Use the ISO 13849-1 risk graph to find a required performance level and match it to a control architecture",
    "Explain why safety functions must be independent of test automation software and AI agents",
  ],
  concepts: [
    { id: "aw09.rig-stiffness", name: "Rig stiffness and resonance", description: "Load paths (bedplate, brackets, shafts, couplings) designed so that deflection is small and the first natural frequency is well above test and control frequencies.", competency: "aw-platforms", related: ["aw09.shaft-line-resonance"] },
    { id: "aw09.stored-energy", name: "Stored energy and containment", description: "Rotating inertia, elastic energy, DC bus and battery energy, hydraulic pressure: each needs a containment or controlled-release strategy.", competency: "aw-platforms" },
    { id: "aw09.guarding", name: "Guards and interlocks", description: "Fixed guards, movable interlocked guards with guard locking where run-down exists, and protective devices such as light curtains placed at the safety distance.", competency: "aw-platforms", related: ["aw09.stored-energy"] },
    { id: "aw09.emergency-stop", name: "Emergency stop and stop categories", description: "A complementary protective measure (ISO 13850) realised as IEC 60204-1 stop category 0 or 1; not a substitute for guarding.", competency: "aw-platforms" },
    { id: "aw09.performance-level", name: "ISO 13849-1 categories and performance levels", description: "PLr from the risk graph (severity, frequency of exposure, possibility of avoidance); achieved PL from category, MTTFd, diagnostic coverage and common-cause measures.", competency: "aw-safety", related: ["aw09.guarding"] },
    { id: "aw09.safety-independence", name: "Independence of safety functions", description: "Safety-related control (safety relays or PLCs, drive STO) must not depend on the test automation software, scripts or agents that schedule and run tests.", competency: "aw-safety", related: ["aw09.performance-level"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Stiffness, energy and the safety layer",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Stage 3 of the Afterwave vision has agents planning retests and running rigs overnight with human approval. That is only acceptable if the rig's safety does not depend on the agent being right. An Afterwave platform would itself be machinery under the EU Machinery Regulation, and the same reasoning (risk assessment, safety functions, performance levels) is what your customers' safety teams apply to the robots they build. Module aw10 (functional safety and standards) goes deep on ISO 13849, IEC 61508 and safety cases; this lesson is the rig-builder's view.`,
        },
        {
          kind: "md",
          md: md`### Stiffness and resonance

A rig is a measuring instrument with a structure. Every load path (bedplate, DUT bracket, reaction arm, shafts, couplings) is a spring; the DUT and rig masses are what it carries.`,
        },
        { kind: "equation", formula: "aw09-natural-frequency" },
        { kind: "equation", formula: "aw09-torsional-stiffness" },
        {
          kind: "md",
          md: md`Design rules used in practice:

- **First mode well above** the highest test or control frequency (factors of 2 to 3 or more are common rules; for vibration-sensitive measurements more).
- **Short, stiff load paths:** stiffness rises with the fourth power of shaft diameter, falls with length; bending stiffness of brackets with the cube of thickness.
- **Mass helps isolation:** a heavy bedplate (cast iron or steel, often on isolation mounts or a seismic block) decouples the rig from the floor.
- **Alignment and couplings:** flexible couplings tolerate small misalignment but lower torsional stiffness; torsionally stiff (bellows, disc) couplings need better alignment. Misalignment loads the torque transducer in bending (lesson 2).
- **Fatigue and overload:** design shafts and fixtures for the DUT's fault torque (a short-circuit torque on an electric machine can be several times rated) with fatigue margins for millions of cycles in durability tests.

### Stored energy

| Energy source | Example | Typical control |
|---|---|---|
| Rotating inertia | 0.5 kg·m² at 6,000 rpm: 98.7 kJ | Containment guards, overspeed trips, controlled braking, guard locking until standstill |
| Elastic energy | Preloaded springs, wound-up shaft line, compliant fixtures | Release procedures, limits on wind-up |
| Electrical | DC bus capacitors at 48 to 800 V; battery DUTs | Discharge circuits, isolation monitoring, lockout |
| Chemical | Lithium cells under abuse, thermal runaway | Enclosures, gas detection, venting, fire suppression |
| Hydraulic and pneumatic | Servo-hydraulic actuators and shakers | Pressure relief, accumulator dump valves |
| Gravity | Raised DUTs, vertical axes | Mechanical brakes, safe lifting |`,
        },
        { kind: "equation", formula: "aw09-rotational-energy" },
        {
          kind: "md",
          md: md`### Guards, interlocks and stops

The hierarchy is fixed by the machinery framework: **inherently safe design first**, then **safeguarding** (guards and protective devices), then **information for use**. On a rig:

- **Fixed guards** (removable only with a tool) where access is rare.
- **Movable interlocked guards** where access is frequent, for example DUT changeover. Opening the guard must stop hazardous motion; if the machine runs down, **guard locking** keeps it closed until standstill is confirmed (ISO 14119).
- **Protective devices** such as light curtains and laser scanners, placed at the **safety distance**:`,
        },
        { kind: "equation", formula: "aw09-safety-distance" },
        {
          kind: "md",
          md: md`- **Emergency stop** (ISO 13850) is a **complementary** measure for people to stop a hazard that guards did not prevent, never the primary protection. IEC 60204-1 defines **stop categories**: **0** immediate removal of power (uncontrolled coast), **1** controlled braking, then power removed, **2** controlled stop with power maintained. An emergency stop must be category 0 or 1.
- **Drive-integrated safety** (IEC 61800-5-2): **STO** (safe torque off: the drive cannot produce torque, implementing stop category 0), **SS1** (safe stop 1: braking then STO, stop category 1), **SLS** (safely limited speed, for example during jogging with a guard open), **SOS** (safe operating stop: standstill held under control).
- **Safety relays or safety PLCs** (dual-channel, self-monitoring controllers certified for functional safety) read guard switches, e-stops and light curtains and command STO or SS1. The **test automation** PC or PLC may request a stop but is not trusted to ensure it.

### How much safety: ISO 13849-1

The **required performance level** $PL_r$ (a to e) comes from the risk graph in Annex A of ISO 13849-1:

| Severity | Frequency/exposure | Possibility of avoidance | $PL_r$ |
|---|---|---|---|
| S1 slight, reversible | F1 rare | P1 possible / P2 scarcely | a / b |
| S1 | F2 frequent | P1 / P2 | b / c |
| S2 serious, irreversible | F1 rare | P1 / P2 | c / d |
| S2 | F2 frequent | P1 / P2 | d / e |

The **achieved PL** depends on the **category** (architecture), the components' **MTTFd** (mean time to dangerous failure), the **diagnostic coverage** DCavg and **common-cause failure** measures:

| Category | Architecture | Behaviour on a single fault | Typical max PL |
|---|---|---|---|
| B | Single channel, basic principles | Safety function can be lost | b |
| 1 | Single channel, well-tried components | Can be lost, less likely | c |
| 2 | Single channel plus periodic test | Lost between tests | d (with conditions) |
| 3 | Two channels, single fault does not lose the function | Detected where practicable | d, e with high MTTFd and DC |
| 4 | Two channels, faults detected, accumulation considered | Function maintained | e |`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Check editions and scope before citing",
          md: md`ISO 13849-1 is in its 2023 edition; ISO 14119 and ISO 13855 have been revised recently and the editions harmonised under Regulation (EU) 2023/1230 should be checked before quoting clause numbers or K values. Machinery built for a company's own use is generally understood to fall within the machinery framework when it is put into service, so an in-house rig is not exempt by default; confirm the specific case in module aw11 (EU Machinery Regulation) and with the research brief.`,
        },
        { kind: "sources", refs: ["aw09-r18", "aw09-r19", "aw09-r20", "aw09-r21", "aw09-r22", "aw09-r23", "aw09-r13"] },
      ],
    },
    {
      layer: "applied",
      title: "Safety concept for the actuator rig",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "From hazard to safety function: actuator rig changeover (illustrative)",
          given: md`Illustrative rig from lesson 1: 250 N·m direct-drive torque motor, shaft-line inertia 0.31 kg·m², maximum 12 rad/s, DC bus 400 V shared with the DUT drive. Operators open a front guard daily to change DUTs and adjust fixtures. Separately, compare a powertrain dyno: 0.5 kg·m² at 6,000 rpm with 400 N·m of braking torque.`,
          steps: [
            { md: md`**Energy.** Actuator rig: $\tfrac{1}{2} \times 0.31 \times 12^2 = 22$ J of kinetic energy: small. The hazard is **torque**, not energy: 250 N·m at low speed crushes or entangles a hand, and an unexpected start during changeover is the scenario that hurts people. Powertrain dyno: 98.7 kJ, where **containment** and run-down dominate.` },
            { md: md`**Risk graph for access during changeover.** Severity S2 (irreversible hand injury), exposure F2 (daily access), avoidance P2 (an unexpected start gives no time to withdraw): $PL_r =$ **e**.` },
            { md: md`**Safety function SF1: guard open means no hazardous torque.** Two-channel guard interlock (one positive-mode switch and one coded non-contact sensor, or a coded sensor with internal redundancy), read by a safety PLC, which commands **SS1** on the rig drive and **STO** on the DUT drive, with drive STO feedback monitored. Category 3 or 4 architecture with high diagnostic coverage, components with high MTTFd: PL e is reachable; verify by calculation (for example with a tool such as SISTEMA).` },
            { md: md`**Guard locking?** Braking from 12 rad/s with 250 N·m on 0.31 kg·m²: $\alpha = 806$ rad/s², stop in about **15 ms**. No meaningful run-down, so an interlock without locking can be justified. The dyno is different: braking from 628 rad/s at 400 N·m on 0.5 kg·m² takes $0.5 \times 628/400 = 0.79$ s, and coasting after STO would take far longer: guard locking with standstill monitoring is required.` },
            { md: md`**SF2: overtorque and overspeed.** Independent limits in the safety PLC or drive safety functions (SLS, safe torque limits where available) so that a test script or agent commanding a wrong profile cannot exceed the DUT or rig rating. **SF3: emergency stop**, category 1 stop (SS1) in this rig. **DC bus:** discharge time and a voltage indicator before the DUT connectors can be touched.` },
            { md: md`**Independence.** The test automation and any agent sit on a separate controller; they can request a stop but cannot bypass SF1 to SF3. Changes to the safety PLC programme are under change control with a sign-off by a competent person.` },
          ],
          result: md`For the actuator rig the dominant hazard is unexpected torque during changeover, addressed by a PL e guard interlock commanding SS1/STO through a safety PLC, independent torque and speed limits, and an SS1 emergency stop. For a high-speed dyno, add containment and guard locking. In both, safety lives below the automation layer.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Light curtain safety distance (illustrative)",
          given: md`A light curtain with 30 mm resolution protects the loading opening of a linear actuator rig. Measured overall stopping time (curtain response, safety PLC, drive SS1 and mechanical stop) **0.25 s**. Use the ISO 13855 form $S = KT + C$ with $C = 8(d - 14)$, starting with $K = 2{,}000$ mm/s; if $S$ exceeds 500 mm, recalculate with $K = 1{,}600$ mm/s and use that result if it is still at least 500 mm.`,
          steps: [
            { md: md`$C = 8 \times (30 - 14) = 128$ mm.` },
            { md: md`With $K = 2{,}000$ mm/s: $S = 2{,}000 \times 0.25 + 128$.`, hidden: true, check: { prompt: "S with K = 2,000 mm/s", answer: 628, unit: "mm", tolerance: { abs: 1 } } },
            { md: md`Exceeds 500 mm, so recalculate with $K = 1{,}600$ mm/s.`, hidden: true, check: { prompt: "S with K = 1,600 mm/s", answer: 528, unit: "mm", tolerance: { abs: 1 } } },
          ],
          result: md`Mount the curtain at least 528 mm from the hazard, or shorten the stopping time. Every 0.1 s of stopping time costs 160 to 200 mm of floor space; re-measure stopping time whenever the DUT inertia or drive parameters change.`,
        },
        {
          kind: "question",
          question: {
            id: "aw09-l05-p1",
            type: "numeric",
            prompt: md`A linear rig carriage of 15 kg is carried by a load path with stiffness 4 x 10^7 N/m. What is its natural frequency? (Hz)`,
            answer: 259.9,
            tolerance: { abs: 0.5 },
            unit: "Hz",
            explanation: md`$f_n = \frac{1}{2\pi}\sqrt{4\times 10^7/15} = \frac{1}{2\pi} \times 1{,}633 = 259.9$ Hz. Doubling stiffness from $2\times 10^7$ raised it from 184 Hz by $\sqrt{2}$.`,
            concepts: ["aw09.rig-stiffness"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Safety in real test cells, and with agents in the loop",
      blocks: [
        {
          kind: "md",
          md: md`### How it is done

A rig builder (internal or a vendor) performs a **risk assessment** (ISO 12100 method: limits of the machine, hazard identification, risk estimation and evaluation, risk reduction), writes a **safety requirements specification** listing each safety function with its $PL_r$, designs and verifies the safety-related control system (ISO 13849-1 and -2), validates it at commissioning (every guard, every e-stop, measured stopping times, fault injection where specified), and keeps a **technical file**. Test labs add operating rules: permit to work for battery or high-voltage DUTs, lockout and tagout for maintenance, two-person rules for unusual tests. Safety PLCs and relays, coded interlock switches and light curtains come from specialist safety-component makers; drives provide STO and SS1.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`**Interlock bypassed** "just for this test" with a spare actuator key or a jumper, then left. **E-stop treated as the guard.** **Safety logic inside the test automation PLC** with no separate safety controller. **Stopping time measured once** with a light DUT and never again. **Rig modified** (new DUT class, higher speed) without revisiting the risk assessment. **Software limits only**, so a profile error or a script bug can command 2x rated torque.`,
        },
        {
          kind: "callout",
          tone: "ai",
          title: "Agents running rigs overnight",
          md: md`Design rule for Afterwave's stage 3: the agent proposes a plan, a human approves it, the automation executes it, and **hardwired and safety-PLC functions bound what any plan can do** (torque, speed, temperature, energy, access). The agent never holds a safety function, never toggles a bypass, and every unattended run starts only when the safety controller reports guards closed and limits armed. Log the safety state on the same clock as the test data, so the morning report shows it.`,
        },
        {
          kind: "scenario",
          scenario: "aw09-s1",
        },
        {
          kind: "checklist",
          title: "Rig safety review checks",
          items: [
            "Risk assessment covers every energy source, every operating mode (setup, test, maintenance, unattended)",
            "Each safety function listed with its PLr, architecture, achieved PL and validation record",
            "Safety controller separate from test automation; automation can only request stops",
            "Guard locking where run-down exists; stopping times measured with worst-case inertia",
            "Independent overtorque, overspeed and overtemperature limits",
            "DC bus discharge and battery DUT procedures",
            "Change control on safety programme and on rig modifications",
            "Bypass management: no bypass without a written, time-limited permit",
          ],
        },
        {
          kind: "feynman",
          prompt: "Explain to a software engineer on the team why the agent that schedules overnight rig runs must never be part of the safety system, even if it is very reliable.",
          keyPoints: [
            "Safety functions need a demonstrated, quantified failure behaviour (category, PL) that general software and models cannot show",
            "A software or model error, a bad profile or a cyber attack could then disable protection",
            "Independent safety controllers and drive STO bound what any command can do",
            "The agent can request stops and must check safety status before runs, but cannot override it",
            "This also keeps the safety case simple and certifiable",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw09-l05-p2",
            type: "short",
            prompt: md`Write the safety section (6 to 8 bullets) of an Afterwave product principles document that defines how Afterwave agents may and may not interact with customer rigs during unattended runs.`,
            rubric: [
              "States that safety functions are implemented in independent safety-rated hardware (safety PLC, drive STO) and never in Afterwave software or agents",
              "Requires human approval of run plans and defines what the approval covers",
              "Requires pre-run checks of safety state (guards, limits, e-stop circuit healthy) reported by the safety controller",
              "Bounds commands by independent torque, speed, temperature or energy limits set below rig and DUT ratings",
              "Forbids bypasses or changes to safety configuration by agents; changes only by competent people under change control",
              "Requires logging of safety state and stops on the same clock as test data, and escalation rules when a stop occurs",
            ],
            modelAnswer: md`**Agents and rig safety: product principles**
1. **Safety is not ours to hold.** Every safety function on a customer rig lives in safety-rated hardware (safety PLC or relay, drive STO/SS1). Afterwave software and agents are never part of a safety function.
2. **Approve, then run.** An agent may propose a run plan (tests, profiles, limits, duration). A named human approves it; the approval records the plan hash, the rig, the DUT and the limits.
3. **Check before start.** A run starts only when the safety controller reports guards closed and locked where required, e-stop circuit healthy and independent limits armed.
4. **Bounded commands.** Profiles are validated against rig and DUT ratings in software, and independently bounded by safety-rated torque, speed and temperature limits configured by the customer.
5. **No bypasses.** Agents cannot request, apply or schedule bypasses, and cannot change safety parameters. Changes are made by competent customer staff under their change control.
6. **Stop means stop.** Any safety stop ends the unattended session; the agent may not restart without a new human approval.
7. **One clock.** Safety state, stops and alarms are recorded by Lockstep on the same clock as test data and shown in the morning report.`,
            explanation: md`The principle is a strict layering: agents plan, humans approve, automation executes, safety hardware bounds. Writing it down is what lets a customer's safety officer say yes to unattended runs.`,
            concepts: ["aw09.safety-independence", "aw09.performance-level", "aw09.guarding"],
            difficulty: 2,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw09-l05-q1",
      type: "numeric",
      prompt: md`What kinetic energy is stored in a dyno shaft line of 1.2 kg·m² at 4,000 rpm? (kJ, 1 decimal)`,
      answer: 105.3,
      tolerance: { abs: 0.3 },
      unit: "kJ",
      explanation: md`$\omega = 2\pi \times 4{,}000/60 = 418.9$ rad/s; $E = 0.5 \times 1.2 \times 418.9^2 = 105{,}275$ J = 105.3 kJ.`,
      concepts: ["aw09.stored-energy"],
      difficulty: 1,
    },
    {
      id: "aw09-l05-q2",
      type: "mcq",
      prompt: md`Which stop category may an emergency stop use under IEC 60204-1?`,
      options: ["Category 0 or 1", "Category 2 only", "Any category", "Category 1 or 2"],
      answer: 0,
      explanation: md`Emergency stop must be stop category 0 (immediate removal of power) or 1 (controlled stop, then removal of power). Category 2 keeps power on and is not permitted for emergency stop.`,
      concepts: ["aw09.emergency-stop"],
      difficulty: 1,
    },
    {
      id: "aw09-l05-q3",
      type: "mcq",
      prompt: md`Using the ISO 13849-1 risk graph: serious irreversible injury, rare exposure, avoidance scarcely possible. What is PLr?`,
      options: ["b", "c", "d", "e"],
      answer: 2,
      explanation: md`S2, F1, P2 gives PL d. Frequent exposure (F2) with P2 would give e.`,
      concepts: ["aw09.performance-level"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "aw09-l05-q4",
      type: "numeric",
      prompt: md`A steel shaft (G = 79 GPa) is 50 mm in diameter and 0.3 m long. What is its torsional stiffness? (kN·m/rad, nearest whole number)`,
      answer: 162,
      tolerance: { abs: 1 },
      unit: "kN·m/rad",
      explanation: md`$J_p = \pi \times 0.05^4/32 = 6.136\times 10^{-7}$ m⁴; $k_t = 79\times 10^9 \times 6.136\times 10^{-7}/0.3 = 161{,}600$ N·m/rad. A 40 mm shaft gives 66 kN·m/rad: the fourth power at work.`,
      concepts: ["aw09.rig-stiffness"],
      difficulty: 2,
    },
    {
      id: "aw09-l05-q5",
      type: "multi",
      prompt: md`Which belong in the independent safety layer rather than the test automation? (Select all.)`,
      options: [
        "Guard interlock commanding STO or SS1",
        "Overspeed trip",
        "Choice of the next test profile",
        "Emergency stop circuit",
        "Data upload to bench memory",
      ],
      answer: [0, 1, 3],
      explanation: md`Interlocks, overspeed trips and emergency stops are safety functions. Test selection and data upload are automation and software tasks.`,
      concepts: ["aw09.safety-independence"],
      difficulty: 1,
    },
    {
      id: "aw09-l05-q6",
      type: "decision",
      prompt: md`A customer's technician asks whether an Afterwave agent could "temporarily mute the door interlock" so an overnight run can continue after a guard sensor fault. What do you answer?`,
      options: [
        { text: "Yes, if the agent logs it", score: 0, feedback: "Logging a bypass does not make it safe. Agents must never touch safety functions." },
        { text: "No: the run stops, the fault is reported, and a competent person repairs the sensor under the customer's procedures; the agent can reschedule once a human approves a new run", score: 1, feedback: "Correct layering: safety hardware decides, people fix and approve, the agent replans." },
        { text: "Only if a human approves the bypass remotely", score: 0.2, feedback: "Remote approval of a bypass with nobody on site is exactly how unattended accidents happen. Bypass management needs a written, time-limited permit and on-site measures." },
      ],
      explanation: md`Agents plan within limits; they never change or bypass safety functions.`,
      concepts: ["aw09.safety-independence", "aw09.guarding"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw09-l05-f1", front: "Natural frequency", back: md`$f_n = \frac{1}{2\pi}\sqrt{k/m}$; keep the first mode well above test and control frequencies.`, concepts: ["aw09.rig-stiffness"] },
    { id: "aw09-l05-f2", front: "Torsional stiffness of a shaft", back: md`$k_t = GJ_p/L$, $J_p = \pi d^4/32$: fourth power of diameter.`, concepts: ["aw09.rig-stiffness"] },
    { id: "aw09-l05-f3", front: "Rotational energy", back: md`$E = \tfrac{1}{2}J\omega^2$; 0.5 kg·m² at 6,000 rpm is 98.7 kJ, a car at 50 km/h.`, concepts: ["aw09.stored-energy"] },
    { id: "aw09-l05-f4", front: "IEC 60204-1 stop categories", back: "0: immediate power removal. 1: controlled stop then power removal. 2: controlled stop, power kept. E-stop: 0 or 1.", concepts: ["aw09.emergency-stop"] },
    { id: "aw09-l05-f5", front: "STO and SS1", back: "STO: drive cannot produce torque (stop category 0). SS1: controlled braking, then STO (stop category 1).", concepts: ["aw09.emergency-stop", "aw09.guarding"] },
    { id: "aw09-l05-f6", front: "Risk graph parameters", back: "S (severity), F (frequency/exposure), P (possibility of avoidance) give PLr a to e. S2 F2 P2 = e.", concepts: ["aw09.performance-level"] },
    { id: "aw09-l05-f7", front: "Safety distance", back: md`$S = KT + C$; $K = 2{,}000$ mm/s (hands) or 1,600 mm/s; $C = 8(d - 14)$ for light curtains.`, concepts: ["aw09.guarding"] },
  ],
  scenarios: [
    {
      id: "aw09-s1",
      title: "The overnight run and the guard sensor",
      dayInLife: true,
      context: md`Illustrative. A design-partner customer's actuator lab is trialling unattended overnight retests planned by an Afterwave agent and approved by their test lead. At 22:40 the run stops: the safety PLC reports a discrepancy on the two channels of the front guard interlock. The lab's night technician messages your shared channel: "Can your agent just ignore the door signal and continue? It's a sensor glitch, the door is closed, and we need these results for a firmware release tomorrow."`,
      start: "a",
      nodes: {
        a: {
          md: md`The technician is under deadline pressure and the release manager is copied. What is your first response?`,
          choices: [
            { text: "Say clearly that Afterwave software cannot and will not bypass safety functions, that the run stays stopped, and ask them to follow their own fault procedure", next: "b", score: 10, feedback: "Right. The principle protects people and also protects the customer's and Afterwave's position." },
            { text: "Ask your engineers whether the agent could re-run the tests that do not need the door closed", next: "c", score: 4, feedback: "Every powered test needs the guard function. This drifts toward working around safety." },
            { text: "Tell the technician to jumper the sensor if they are sure the door is closed", next: "d", score: 0, feedback: "You are now advising a bypass on a customer's machine. This is how serious accidents and liability start." },
          ],
        },
        b: {
          md: md`The technician says nobody qualified is on site until 07:00. The release manager asks what you can do to save the release.`,
          choices: [
            { text: "Have the agent prepare a prioritised retest plan (Ripple ranking) for 07:00 so the most decisive tests run first after repair, and draft the morning report with the stop logged", next: "e", score: 10, feedback: "You turn the stop into the fastest safe recovery and keep the evidence clean." },
            { text: "Suggest they release without the retests", score: 3, feedback: "Not your call, and it undermines the evidence the release depends on. Offer the fastest safe path instead." },
          ],
        },
        c: {
          md: md`Your engineer points out that every powered test on that rig requires the guard function. The technician is still waiting.`,
          choices: [
            { text: "Go back and state the principle: the run stays stopped until a competent person clears the fault", next: "b", score: 7, feedback: "Recovered, but the first answer should have been the principle." },
          ],
        },
        d: {
          md: md`The test lead, reading the channel, forbids the jumper and asks why Afterwave suggested it.`,
          choices: [
            { text: "Apologise, retract the advice in writing, and propose a written policy that Afterwave staff and agents never advise or perform bypasses", next: "b", score: 4, feedback: "Damage limited, trust dented. Write the policy before the next pilot." },
          ],
        },
        e: {
          md: md`At 07:30 the sensor is replaced and validated. The prioritised plan runs, and by 13:00 the decisive tests have passed. The test lead asks for the stop to be included in the release evidence. What do you include?`,
          choices: [
            { text: "Stop time, safety PLC status and channels, repair and validation record, which tests were affected and rerun, all on the Lockstep timeline", score: 10, feedback: "This is what evidence infrastructure looks like: the interruption is documented, not hidden." },
            { text: "Only the passing results", score: 2, feedback: "Omitting the stop leaves a gap an assessor will find. Include it." },
          ],
        },
      },
      concepts: ["aw09.safety-independence", "aw09.guarding"],
    },
  ],
};

export default lesson;
