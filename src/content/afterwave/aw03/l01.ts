import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw03-l01",
  title: "MIL, SIL, PIL and HIL: what each simulates and the real-time budget",
  summary:
    "The X-in-the-loop ladder from model to rig: what is real and what is simulated at each rung, how plant models are built (a PMSM drive as the running example), why HIL forces fixed steps, overrun-free execution and a latency budget, and the numbers (step sizes, delays, phase loss) that decide whether a HIL result can be trusted.",
  minutes: 85,
  objectives: [
    "Distinguish MIL, SIL, PIL, HIL, power HIL and physical rig testing by what is real and what is simulated, and say what class of defect each one finds",
    "Explain what a plant model is and write the average-value PMSM model used in drive and actuator HIL",
    "Choose a fixed step size from time constants and PWM periods, and check stability and real-time factor",
    "Compute a HIL latency budget and the phase margin it costs a control loop",
    "Place an Afterwave prospect's test activities on the ladder and say where bench data is produced",
  ],
  concepts: [
    { id: "aw03.xil-ladder", name: "X-in-the-loop ladder", description: "MIL, SIL, PIL, HIL and physical rig testing: successive replacement of simulated parts by real ones (controller model, production code, target processor, real ECU, real power, real plant), each finding different defects at different cost.", competency: "aw-test" },
    { id: "aw03.plant-model", name: "Plant model", description: "A mathematical model of the physical system the device under test controls (motor, battery, vehicle, robot joint), solved in simulation so the controller sees realistic sensor signals in closed loop.", competency: "aw-test", related: ["aw03.xil-ladder"] },
    { id: "aw03.fixed-step-real-time", name: "Fixed-step real-time execution", description: "HIL models run with a fixed solver step that must finish inside wall-clock time every step; an overrun invalidates the run. Step size is set by the fastest dynamic and solver stability.", competency: "aw-test", related: ["aw03.plant-model"] },
    { id: "aw03.latency-budget", name: "HIL latency budget", description: "End-to-end delay added by input capture, model computation and output; it costs phase margin (360 f T degrees) and can make a stable controller look unstable on HIL.", competency: "aw-test", related: ["aw03.fixed-step-real-time"] },
    { id: "aw03.fpga-hil", name: "FPGA-based HIL", description: "Moving the fastest parts (gate-signal capture, switching-level power electronics, encoder or resolver emulation) to an FPGA running at sub-microsecond steps, while slower dynamics stay on CPU cores.", competency: "aw-test", related: ["aw03.fixed-step-real-time", "aw03.latency-budget"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "The ladder from model to rig",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Every Afterwave prospect runs some mix of MIL, SIL, HIL and physical rigs, and the buyer will describe their pain in that vocabulary ("our HIL is booked three weeks out", "SIL passes but the dyno fails"). Ripple's question, which tests to rerun after a change, has a different answer at each rung, because each rung costs a different amount per run and finds different defects. If you cannot say what a 20 microsecond step or an overrun means, you cannot run a credible discovery call with Ismail's former colleagues, and you cannot judge where bench memory has the most value.`,
        },
        {
          kind: "md",
          md: md`### What is real at each rung

"X-in-the-loop" means the controller runs in a closed loop with something that stands in for the physical world. Moving up the ladder, simulated parts are replaced by real ones.

| Rung | Controller | Execution | Plant | Clock | Finds | Typical cost per run (illustrative) |
|---|---|---|---|---|---|---|
| **MIL** (model in the loop) | Control model (Simulink, Modelica, Python) | Desktop, any solver | Model | None: as fast as it computes | Algorithm and requirement errors | Cents, seconds to minutes |
| **SIL** (software in the loop) | Production C/C++ (generated or hand-written), compiled for the host | Desktop or cloud | Model | None, or virtual | Coding errors, integer overflow, scaling, logic, back-to-back mismatch with the model | Cents to euros |
| **PIL** (processor in the loop) | Same code cross-compiled for the target MCU | Target chip or evaluation board, linked to host | Model on host | Step-locked, usually not real time | Compiler and fixed-point effects, stack, execution time on the real core | Euros |
| **HIL** (hardware in the loop) | Real ECU or controller board with production firmware | Real hardware | Real-time model plus emulated sensors, loads and buses | Hard real time | Timing, IO, diagnostics, fault handling, bus behaviour, integration | Tens of euros per hour |
| **Power HIL** | Real controller and real power stage | Real hardware | Model drives a power amplifier or emulator that exchanges real power | Hard real time | Power-stage behaviour, protection, thermal at the interface | Higher |
| **Physical rig** (dyno, actuator rig, cycler, chamber) | Real | Real | Real (or real plus a load machine) | Physical | Everything, including what nobody modelled | Highest per hour, slowest to change |

The classic ordering is the left side of the V-model: requirements and design produce models (MIL), code (SIL, PIL), then the integrated controller (HIL), then the integrated system on rigs and in the field. Each rung is roughly an order of magnitude more expensive per test hour than the one below, and is available later in the programme.

### Plant models

A **plant model** is the physics the controller would otherwise meet in the world. For an Afterwave customer building drive units or humanoid actuators, the core is the permanent-magnet synchronous machine (PMSM) in the rotor (dq) frame:`,
        },
        { kind: "equation", formula: "aw03-pmsm-dq" },
        { kind: "equation", formula: "aw03-pmsm-torque" },
        {
          kind: "md",
          md: md`Around that core sit an inverter model (average-value, or switching-level with dead time and diode conduction), sensors (current sensors with offset and gain, a resolver or encoder that the HIL must **emulate** electrically), thermal models, the load (gearbox, link, vehicle or robot dynamics) and the communication buses. Fidelity is a choice: a model only needs to reproduce what the tests under it observe. A model that is wrong in a region the tests visit gives **false confidence**, which is worse than no test.

### Why HIL forces fixed steps

In MIL and SIL a variable-step solver can shrink the step during fast transients and take long steps elsewhere. A HIL simulator cannot: it must deliver sensor values to real hardware at a fixed rate, so it uses a **fixed-step** solver and every step must finish within its wall-clock slot. Two constraints set the step:`,
        },
        { kind: "equation", formula: "aw03-step-rule" },
        { kind: "equation", formula: "aw03-euler-stability" },
        {
          kind: "md",
          md: md`The first is accuracy, the second is the hard floor for explicit solvers. Then the compute has to fit:`,
        },
        { kind: "equation", formula: "aw03-rtf" },
        {
          kind: "md",
          md: md`An **overrun** (one step that takes longer than $T_s$) means the simulator was late at least once; good HIL systems count overruns and a run with any overrun is invalid. Overruns appear after model changes, after adding logging channels, or when someone runs a heavier variant on the same target. That is a rig change that can invalidate earlier results, exactly the kind of change Ripple has to reason about.

### Typical step sizes

| What is simulated | Typical step | Where it runs |
|---|---|---|
| Vehicle or robot body dynamics, battery pack, thermal | 1 ms (0.5 to 10 ms) | CPU core |
| Average-value motor and inverter model | 10 to 50 $\mu$s | CPU core |
| Switching-level inverter (dead time, ripple), PWM capture, resolver or encoder emulation | 50 ns to 1 $\mu$s | FPGA |
| Bus traffic (CAN cycle times) | 1 to 100 ms message periods | Bus interface cards |

These ranges are typical published practice for automotive and drive HIL, not a vendor specification. Why the FPGA: a 16 kHz PWM has a 62.5 $\mu$s period and dead times around 1 $\mu$s. Sampling gate signals at the CPU step would make the duty cycle almost invisible:`,
        },
        { kind: "equation", formula: "aw03-duty-resolution" },
        {
          kind: "md",
          md: md`### The latency budget

The real motor answers the inverter instantly. A simulated one answers late: input capture, one step of computation, output conversion.`,
        },
        { kind: "equation", formula: "aw03-latency-budget" },
        { kind: "equation", formula: "aw03-delay-phase" },
        {
          kind: "md",
          md: md`A delay costs phase without changing gain, so it eats phase margin. A current loop with 1 kHz bandwidth tolerates a few tens of microseconds; a 10 Hz position loop barely notices a millisecond. The budget is set by the fastest loop the device under test closes through the simulator.`,
        },
        {
          kind: "flow",
          title: "The X-in-the-loop ladder and what each rung replaces",
          steps: [
            { label: "MIL", detail: "Control model + plant model on a desktop. Algorithm errors. Seconds per test." },
            { label: "SIL", detail: "Production code compiled for host + plant model. Code errors, back-to-back vs model. Faster than real time, runs in CI." },
            { label: "PIL", detail: "Code on the target processor. Compiler, fixed point, execution time." },
            { label: "HIL", detail: "Real ECU + real-time plant model + emulated sensors, buses, faults. Timing, IO, diagnostics." },
            { label: "Power HIL / rig", detail: "Real power, real machine, dyno or actuator rig. Everything unmodelled. Most expensive hour." },
          ],
          caption: "Moving right, more is real, defects found are later and closer to the field, and each hour costs more. Bench memory accumulates fastest at HIL and rigs, where runs are expensive and change slowly.",
        },
        {
          kind: "chart",
          chart: "bar",
          title: "Phase lag added at loop crossover by HIL delay (degrees)",
          xKey: "delay",
          xLabel: "Added loop delay",
          yLabel: "Phase lag (degrees)",
          series: [
            { key: "f100", label: "100 Hz loop" },
            { key: "f1k", label: "1 kHz loop" },
            { key: "f2k", label: "2 kHz loop" },
          ],
          data: [
            { delay: "5 us", f100: 0.18, f1k: 1.8, f2k: 3.6 },
            { delay: "25 us", f100: 0.9, f1k: 9, f2k: 18 },
            { delay: "60 us", f100: 2.16, f1k: 21.6, f2k: 43.2 },
            { delay: "100 us", f100: 3.6, f1k: 36, f2k: 72 },
            { delay: "1 ms", f100: 36, f1k: 360, f2k: 720 },
          ],
          caption: "Computed from 360 f T. A 60 microsecond CPU-only loop delay is harmless for a 100 Hz loop and destroys a 2 kHz current loop's phase margin.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Sizing a drive-inverter HIL",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Step size and latency budget for an actuator inverter on HIL",
          given: md`Illustrative humanoid actuator drive: PMSM with $R = 40$ m$\Omega$, $L_q = 0.4$ mH, 7 pole pairs; inverter PWM 16 kHz with 1 $\mu$s dead time; the firmware's current loop runs at 16 kHz with 1 kHz bandwidth and 55 degrees of designed phase margin. The HIL vendor quotes: PWM capture on FPGA, average-value motor model on CPU at 20 $\mu$s, input capture 2 $\mu$s, output (current-sensor emulation via DAC) 3 $\mu$s.`,
          steps: [
            { md: md`**Electrical time constant:** $\tau = L_q/R = 0.4 \times 10^{-3}/0.04 = 10$ ms. With $N = 20$, the motor alone would tolerate $T_s = 500\ \mu$s. The motor is not the binding constraint.` },
            { md: md`**PWM period:** $T_{pwm} = 1/16{,}000 = 62.5\ \mu$s. A 20 $\mu$s step gives about 3 model updates per PWM period, enough for an average-value model that uses the duty cycle measured over each period by the FPGA.` },
            { md: md`**Stability:** forward Euler on the current state needs $T_s < 2\tau = 20$ ms; 20 $\mu$s is 1,000 times inside the limit.` },
            { md: md`**Duty resolution if captured on CPU:** $\Delta d = 20 \times 10^{-6} \times 16{,}000 = 0.32$, i.e. 32 % steps: useless. On FPGA at 10 ns: $\Delta d = 10^{-8} \times 16{,}000 = 0.016\,\%$. Gate capture must be on the FPGA.` },
            { md: md`**Latency:** $T_d = 2 + 20 + 3 = 25\ \mu$s. Phase lag at 1 kHz: $\varphi_d = 360 \times 1{,}000 \times 25 \times 10^{-6} = 9$ degrees. Margin on HIL: about $55 - 9 = 46$ degrees. The loop will look somewhat more damped than designed but stays stable.` },
            { md: md`**Dead-time effects:** 1 $\mu$s dead time is invisible in a 20 $\mu$s average-value model. If tests must verify dead-time compensation, the inverter needs a switching-level FPGA model at 100 ns or less ($\le 1/10$ of the dead time).` },
          ],
          result: md`CPU at 20 $\mu$s plus FPGA gate capture is sufficient for control and diagnostics testing, costing about 9 degrees of phase. Dead-time compensation and current ripple tests need an FPGA switching model or the real power stage (power HIL or a rig). Writing this down turns "the HIL is fine" into an explicit statement of which tests a HIL result is valid for.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Running a drive cycle in SIL faster than real time",
          given: md`Illustrative: the same actuator firmware is compiled for SIL. The plant model and controller step together at $T_s = 50\ \mu$s. On the CI runner each step takes $t_{exec} = 4\ \mu$s. A regression test replays an 8-hour duty cycle recorded on a rig.`,
          steps: [
            { md: md`$\text{RTF} = t_{exec}/T_s = 4/50 = 0.08$.`, hidden: true, check: { prompt: "Real-time factor", answer: 0.08, tolerance: { abs: 0.001 } } },
            { md: md`Speed-up $= 1/0.08 = 12.5$ times real time.` },
            { md: md`Wall-clock time $= 8 \times 60/12.5 = 38.4$ minutes.`, hidden: true, check: { prompt: "Wall-clock time for the 8 h cycle (minutes)", answer: 38.4, unit: "min", tolerance: { rel: 0.01 } } },
            { md: md`On HIL the same cycle takes exactly 8 hours, because HIL is locked to the wall clock.` },
          ],
          result: md`SIL can replay an overnight rig recording in under 40 minutes, so it belongs in the CI pipeline on every merge. HIL hours are the scarce resource; that is where test selection pays most.`,
        },
        {
          kind: "question",
          question: {
            id: "aw03-l01-p1",
            type: "numeric",
            prompt: md`A battery management HIL closes a balancing control loop with 200 Hz bandwidth through a simulator with 400 $\mu$s total loop delay. How many degrees of phase margin does the delay cost at crossover?`,
            answer: 28.8,
            tolerance: { abs: 0.2 },
            unit: "degrees",
            explanation: md`$\varphi_d = 360 \times 200 \times 400 \times 10^{-6} = 28.8$ degrees. That is substantial for a loop designed with 45 to 60 degrees of margin. Either reduce the delay (faster step, FPGA IO) or state that loop-stability results from this HIL are conservative.`,
            concepts: ["aw03.latency-budget"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "How test organisations actually use the ladder",
      blocks: [
        {
          kind: "md",
          md: md`### Who does what

- **Controls and model engineers** own MIL and the plant models (Simulink, Modelica tools, sometimes Python). They run MIL and SIL many times a day.
- **Software and firmware engineers** own SIL and unit tests in CI.
- **HIL or test-systems engineers** own the real-time targets, IO, wiring harnesses, plant model integration and the test automation on top. This is Ismail's world at Signify and was his at Tesla drive unit validation.
- **Validation and reliability engineers** own rigs and dynos (Yusuf's background in drive inverter test and reliability), endurance, environmental and abuse testing.

### Tools you will hear named

MathWorks Simulink with Simulink Test and Simulink Real-Time; real-time targets from **dSPACE** (SCALEXIO), **NI** (PXI with VeriStand), **Speedgoat** (targets for Simulink Real-Time), **Typhoon HIL** and **OPAL-RT** (strong in power electronics), **Vector** (CANoe with VT System IO for ECU testing). SIL platforms include dSPACE VEOS and in-house setups with the compiled code in a container. The next lesson goes inside a HIL rack.

### What goes wrong

- **Model not validated against the rig.** The plant model was tuned once, the motor changed supplier, nobody re-fitted parameters. HIL passes, the dyno fails.
- **Version mismatch.** The HIL ran the right firmware against last month's plant model or IO configuration. Without both versions in the run record nobody can tell later.
- **Overruns ignored.** A model update pushed RTF to 1.05 on a few steps; results look plausible and are invalid.
- **Back-to-back not done.** SIL code and the MIL model diverge silently; equivalence tests (same inputs, compare outputs within tolerance) catch it.
- **Testing on the wrong rung.** Spending HIL hours on logic that SIL would catch in seconds, or trusting SIL for timing behaviour it cannot see.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "Where Afterwave touches this",
          md: md`Lockstep records rig signals and on-screen actions on one clock; on a HIL or rig, that is the run's physical evidence. Ripple's question differs per rung: a firmware change might require rerunning 40 SIL tests (cheap, run them all) but only a subset of 300 HIL and rig tests (expensive, select). In discovery, ask where their hours and their bottleneck sit on the ladder before talking about product. Do not claim Afterwave runs or replaces any rung.`,
        },
        {
          kind: "ask",
          title: "Discovery questions about their test ladder",
          items: [
            "Which rungs do you run today (MIL, SIL, HIL, power HIL, rigs), and roughly how many test hours per week on each?",
            "Which rung is the bottleneck, and how far ahead is it booked?",
            "How do you know the plant model on HIL still matches the real hardware? When was it last re-fitted?",
            "When a test passes on HIL and fails on the rig, how long does it take to find out why, and what data do you look at?",
            "Is the plant model version and the IO configuration recorded with every HIL run?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw03-l01-p2",
            type: "short",
            prompt: md`**Write a one-page "test ladder map" for a prospective Afterwave customer: an illustrative humanoid actuator team (motor, inverter, joint controller firmware).** For each rung they are likely to run (MIL, SIL, HIL, actuator rig): what is real and what is simulated, the typical step size or clock, the defects it finds, an illustrative cost per test hour, and what bench data each produces. Finish with three discovery questions that would tell you where Ripple's selection would save the most hours. Label every number illustrative and do not claim Afterwave features beyond Lockstep capture and Ripple's change-impact selection.`,
            rubric: [
              "Correctly distinguishes what is real vs simulated on each rung (SIL compiled for host, HIL real controller with real-time plant model, rig real everything)",
              "Gives plausible step sizes or clocks (for example 10 to 50 microseconds average-value motor model on CPU, sub-microsecond FPGA for PWM, wall-clock locked for HIL) and notes that SIL can run faster than real time",
              "Names defects per rung (algorithm, code, timing and IO, unmodelled physics) and shows cost per hour rising by roughly an order of magnitude per rung",
              "Identifies HIL and rig as the scarce, expensive hours where selection pays most, and SIL as cheap enough to run fully",
              "Discovery questions target hours per rung, booking backlog and the cost of a missed regression",
              "Labels numbers illustrative and makes no invented product claims or customer facts",
            ],
            modelAnswer: md`**Test ladder map: illustrative humanoid actuator team**

| Rung | Real | Simulated | Clock / step | Finds | Cost per hour (illustrative) | Data produced |
|---|---|---|---|---|---|---|
| MIL | Nothing | Controller model, PMSM, gearbox, joint load | Variable step, faster than real time | Control-law and requirement errors | EUR 1 | Simulation logs |
| SIL | Production firmware compiled for x86 | PMSM and load model | 50 microseconds fixed, RTF about 0.1 | Code, scaling, logic, MIL-SIL mismatch | EUR 2 (CI runner) | CI logs, signals |
| HIL | Real joint controller board and firmware | PMSM average model on CPU at 20 microseconds, PWM capture and encoder emulation on FPGA, CAN bus rest | Wall clock | Timing, diagnostics, fault reactions, bus behaviour | EUR 40 to 100 | MDF or TDMS signals, sequencer results, bus logs |
| Actuator rig | Controller, inverter, motor, gearbox | Load profile via load motor | Physical | Thermal, ripple, wear, unmodelled friction | EUR 150 to 300 | DAQ signals (torque, speed, temperature, currents), operator actions |

Lockstep would capture HIL and rig signals and operator actions on one clock. Ripple's selection matters most on HIL and rig, where a full regression costs hundreds of hours; SIL is cheap enough to run in full on every merge.

**Discovery questions:** (1) How many HIL and rig hours does a full regression take, and how often do you trigger one? (2) How far ahead are the HIL and rigs booked, and what slips when they are? (3) In the last year, what did a regression that escaped to the rig or field cost you in time?`,
            explanation: md`Graded against the rubric. The map is good if a test-systems engineer would recognise their own lab in it and if every number is labelled.`,
            concepts: ["aw03.xil-ladder", "aw03.fixed-step-real-time", "aw03.plant-model"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to an investor, without equations, why a firmware team needs HIL even though SIL already runs the same code against the same model.",
          keyPoints: [
            "SIL runs the code on a PC, so it cannot see the real processor's timing, interrupts, peripherals or IO electronics",
            "HIL runs the real controller hardware against a plant model that is computed in real time, so timing, diagnostics and fault reactions are tested",
            "HIL must keep up with the wall clock every step (no overruns), which is why it is expensive and cannot run faster than real time",
            "Each rung finds different defects at a different cost; SIL is cheap enough to run all the time, HIL hours are scarce",
          ],
        },
        { kind: "sources", refs: ["aw03-r1", "aw03-r2", "aw03-r3", "aw03-r6"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw03-l01-q1",
      type: "order",
      prompt: "Order the rungs from least real to most real.",
      items: ["MIL", "SIL", "PIL", "HIL", "Power HIL", "Physical rig"],
      explanation: md`Each step replaces a simulated part with a real one: model, compiled code, target processor, real ECU, real power exchange, real plant.`,
      concepts: ["aw03.xil-ladder"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw03-l01-q2",
      type: "mcq",
      prompt: "Why can a SIL test run faster than real time but a HIL test cannot?",
      options: [
        "SIL uses a simpler plant model",
        "HIL exchanges signals with real hardware that runs on the wall clock, so each simulation step must happen in real time",
        "HIL firmware is slower than SIL firmware",
        "SIL tests are shorter",
      ],
      answer: 1,
      explanation: md`The real ECU does not wait. In SIL both controller and plant are software, so the simulation can advance as fast as the CPU allows (RTF below 1 means speed-up).`,
      concepts: ["aw03.fixed-step-real-time", "aw03.xil-ladder"],
      difficulty: 1,
    },
    {
      id: "aw03-l01-q3",
      type: "numeric",
      prompt: md`A HIL model step is 25 $\mu$s. The worst step measured over a run took 21 $\mu$s. What is the worst-case real-time factor?`,
      answer: 0.84,
      tolerance: { abs: 0.005 },
      explanation: md`$\text{RTF} = 21/25 = 0.84$. No overrun, but above the 0.6 to 0.7 margin many teams target; adding logging channels could tip it over.`,
      concepts: ["aw03.fixed-step-real-time"],
      difficulty: 1,
    },
    {
      id: "aw03-l01-q4",
      type: "numeric",
      prompt: md`An inverter switches at 20 kHz. The HIL captures gate signals once per 1 $\mu$s CPU step. What duty-cycle resolution does that give, in percent?`,
      answer: 2,
      tolerance: { abs: 0.01 },
      unit: "%",
      explanation: md`$\Delta d = t_{samp} f_{pwm} = 10^{-6} \times 20{,}000 = 0.02 = 2\,\%$. Too coarse for current control; gate capture belongs on an FPGA (10 ns gives 0.02 %).`,
      concepts: ["aw03.fpga-hil"],
      difficulty: 2,
    },
    {
      id: "aw03-l01-q5",
      type: "multi",
      prompt: "Which of these should be recorded with every HIL run for the result to be interpretable later? (Select all that apply.)",
      options: [
        "Firmware build identifier",
        "Plant model version and parameter set",
        "Overrun count",
        "The HIL vendor's share price",
        "IO and harness configuration version",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`A HIL result is a statement about a specific firmware against a specific model on a specific rig configuration, valid only if real time was kept.`,
      concepts: ["aw03.plant-model", "aw03.fixed-step-real-time"],
      difficulty: 1,
    },
    {
      id: "aw03-l01-q6",
      type: "decision",
      prompt: md`A prospect says: "We want to verify our new dead-time compensation on HIL. Our HIL runs an average-value motor model at 20 $\mu$s." What do you (with Ismail) tell them?`,
      options: [
        { text: "That is fine; HIL covers firmware behaviour.", score: 0.1, feedback: "A 20 microsecond average model cannot represent a 1 microsecond dead time; the test would pass regardless." },
        { text: "Dead-time effects need a switching-level model at sub-microsecond steps on FPGA, power HIL, or the real power stage on a rig; the current HIL result would not be evidence for this feature.", score: 1, feedback: "Right: match the rung and model fidelity to what the test must observe." },
        { text: "Run it in SIL instead; it is faster.", score: 0.2, feedback: "SIL uses a model too and sees no real switching at all." },
      ],
      explanation: md`A model reproduces only what it represents. Rule of thumb: step at most a tenth of the shortest event that matters.`,
      concepts: ["aw03.fpga-hil", "aw03.plant-model"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw03-l01-f1", front: "MIL vs SIL vs PIL vs HIL in one line each", back: "MIL: model controller + model plant. SIL: production code on host + model plant. PIL: code on target processor + model plant. HIL: real ECU + real-time plant model and emulated IO.", concepts: ["aw03.xil-ladder"] },
    { id: "aw03-l01-f2", front: "What is an overrun?", back: "A real-time step that took longer than its step size. Any overrun invalidates a HIL run.", concepts: ["aw03.fixed-step-real-time"] },
    { id: "aw03-l01-f3", front: "Phase lag from delay", back: md`$\varphi_d = 360^\circ f_c T_d$. 25 $\mu$s at 1 kHz costs 9 degrees.`, concepts: ["aw03.latency-budget"] },
    { id: "aw03-l01-f4", front: "Typical HIL step sizes", back: md`Body, battery, thermal: about 1 ms on CPU. Average motor model: 10 to 50 $\mu$s on CPU. Switching inverter, PWM capture, encoder emulation: 50 ns to 1 $\mu$s on FPGA.`, concepts: ["aw03.fpga-hil"] },
    { id: "aw03-l01-f5", front: "Forward Euler stability limit", back: md`$T_s < 2\tau$ for a first-order mode; accuracy wants 10 to 20 steps per $\tau$.`, concepts: ["aw03.fixed-step-real-time"] },
    { id: "aw03-l01-f6", front: "Biggest risk in HIL results", back: "A plant model that no longer matches the hardware: tests pass with false confidence.", concepts: ["aw03.plant-model"] },
  ],
};

export default lesson;
