import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw09-l01",
  title: "Dynamometers and actuator test rigs",
  summary:
    "How rotating test rigs work: absorber and driver configurations, four-quadrant operation and regeneration, inertia matching through gear ratios, inline torque transducers, shaft-line resonance, and a worked sizing of an actuator test rig for a humanoid-class joint.",
  minutes: 80,
  objectives: [
    "Explain absorber-only, driver, back-to-back and four-quadrant dynamometer configurations and when each is used",
    "Place a test in the torque-speed plane and say which quadrants the rig must cover",
    "Compute reflected inertia, acceleration torque and the torsional resonance of a shaft line",
    "Size the load motor, gearbox, torque transducer and power supply of an actuator test rig from a DUT specification",
    "Ask a rig vendor the questions that expose an undersized or over-inert design",
  ],
  concepts: [
    { id: "aw09.dyno-configurations", name: "Dynamometer configurations", description: "Absorber-only brakes (eddy current, hysteresis, water brake), motoring dynos, AC four-quadrant dynos and back-to-back rigs with a common DC bus.", competency: "aw-platforms" },
    { id: "aw09.four-quadrant", name: "Four-quadrant operation", description: "Torque and speed each positive or negative: motoring in quadrants 1 and 3, braking or regenerating in 2 and 4. A rig must cover every quadrant the DUT's duty cycle visits.", competency: "aw-platforms", related: ["aw09.dyno-configurations"] },
    { id: "aw09.inertia-matching", name: "Inertia matching", description: "Rig inertia reflected through a gear ratio scales with N squared; it must be matched to, or electronically compensated against, the inertia the DUT sees in its real application.", competency: "aw-platforms" },
    { id: "aw09.torque-transducer", name: "Inline torque transducer", description: "Strain-gauge flange or shaft sensor in the load path between DUT and rig, chosen for range, accuracy class, stiffness, speed and overload capacity.", competency: "aw-platforms" },
    { id: "aw09.shaft-line-resonance", name: "Shaft-line torsional resonance", description: "The DUT, couplings, transducer and rig form a two-inertia spring system whose first mode limits control bandwidth and test frequency.", competency: "aw-platforms", related: ["aw09.inertia-matching"] },
    { id: "aw09.rig-sizing", name: "Actuator rig sizing", description: "Deriving rig motor torque, speed, power, inertia, transducer range and supply from the DUT envelope plus margins.", competency: "aw-platforms", related: ["aw09.four-quadrant", "aw09.inertia-matching"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What a dynamometer does, and the physics of the shaft line",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Afterwave's long-term roadmap includes its own hardware test platforms, the first plausibly a generalised actuator test platform. Your customers (humanoid, robotics, drives and powertrain teams) already run dynos and actuator rigs, and Ismail and Yusuf spent years on drive unit and inverter test benches. To sell Lockstep into those labs, challenge a platform spec and price a rig honestly, you need to read a dyno datasheet and know which numbers decide whether a rig is fit for purpose.`,
        },
        {
          kind: "md",
          md: md`### The job of a dyno

A **dynamometer** applies a controlled load to a rotating device under test (**DUT**: motor, gearbox, actuator, drive unit, engine) and measures torque and speed, so that power, efficiency, torque ripple, thermal behaviour and durability can be computed. An **actuator test rig** is a dyno specialised for robot joints: low speed, high torque, fast torque changes, and both directions of motion.`,
        },
        { kind: "equation", formula: "aw09-mech-power" },
        {
          kind: "md",
          md: md`### Configurations

| Configuration | How it loads the DUT | Quadrants | Typical use | Limits |
|---|---|---|---|---|
| **Eddy-current brake** | Rotating disc in a controlled magnetic field; energy becomes heat (water or air cooled) | Absorb only, and no torque at standstill | Engine and motor end-of-line, cheap power absorption | Cannot drive the DUT, poor at low speed |
| **Hysteresis brake** | Magnetic hysteresis in a rotor; torque nearly independent of speed, including standstill | Absorb only | Small motors, low power, smooth torque | Small power, heat-limited |
| **Water brake (hydraulic)** | Fluid shear | Absorb only | Very high power (large engines, turbines) | Slow response, absorb only |
| **AC dyno (motoring)** | Electric machine with an inverter, speed or torque controlled | All four | EV drive units, gearboxes, actuators, transient cycles | Higher cost; inertia of the machine |
| **Back-to-back** | Two machines coupled, each with an inverter on a shared DC bus | All four | Drive unit and gearbox testing, actuator pairs | Two machines to calibrate and protect |
| **Linear rig** | Linear motor, ball screw or servo-hydraulic cylinder with a load cell | Push and pull, both directions | Linear actuators, legs, grippers | Stroke, side loads, stiffness |

Absorb-only brakes cannot spin a DUT, cannot back-drive a gearbox and cannot test regeneration. For robotics and EV work the standard is an **electric four-quadrant** machine.`,
        },
        {
          kind: "matrix",
          title: "The torque-speed plane: four quadrants",
          xAxis: ["Speed negative", "Speed positive"],
          yAxis: ["Torque negative", "Torque positive"],
          cells: [
            { label: "Q2: braking in reverse", detail: "Positive torque, negative speed: the DUT resists a backward motion (a knee lowering a body), power flows into the DUT side" },
            { label: "Q1: forward motoring", detail: "Positive torque, positive speed: the DUT drives, the rig absorbs" },
            { label: "Q3: reverse motoring", detail: "Negative torque, negative speed: the DUT drives backwards" },
            { label: "Q4: forward braking", detail: "Negative torque, positive speed: the DUT brakes or regenerates, the rig drives" },
          ],
          caption: "A walking humanoid's knee crosses all four quadrants in every gait cycle: it lifts the body (motoring) and lowers it under control (braking, often regenerating). An absorber-only brake can reproduce at most the motoring part.",
        },
        {
          kind: "md",
          md: md`### Regeneration and the common DC bus

When the rig absorbs power it must put it somewhere: a braking resistor (heat), the grid (an **active front end**), or the DUT's own supply via a shared DC bus. In a **back-to-back** rig the absorbed power circulates and the grid supplies only the losses.`,
        },
        { kind: "equation", formula: "aw09-regen-grid-power" },
        {
          kind: "md",
          md: md`### Inertia: the hidden load

Every rotating part on the shaft line adds inertia. Through a gearbox it scales with the square of the ratio:`,
        },
        { kind: "equation", formula: "aw09-reflected-inertia" },
        { kind: "equation", formula: "aw09-accel-torque" },
        {
          kind: "md",
          md: md`Two consequences. First, during fast transients the DUT spends torque accelerating the rig rather than doing the test. Second, the DUT's controller is tuned against a load inertia; if the rig presents a very different inertia from the real robot leg or vehicle, the closed-loop behaviour on the rig is not the behaviour in the field. Options: choose a low-inertia direct-drive torque motor, add a flywheel to raise inertia to the target, or **emulate** inertia electronically (the rig controller commands $T = -J_{\text{virtual}}\,\alpha$), which works only within the rig's torque-control bandwidth.

### The torque transducer and the shaft line

An **inline torque transducer** (flange or shaft type, strain-gauge based, lesson 2) sits between DUT and rig. Choose it on: **nominal range** (cover the peak with overload headroom; very large ranges lose low-torque resolution), **accuracy class**, **maximum speed**, **torsional stiffness**, and tolerance to **parasitic loads** (bending, axial force from misalignment). The transducer and couplings are springs; DUT and rig are flywheels:`,
        },
        { kind: "equation", formula: "aw09-two-mass-resonance" },
        {
          kind: "md",
          md: md`If the test asks for torque changes faster than about a third of $f_n$, the measured torque includes the shaft line's own oscillation. Stiff transducers, short shafts, torsionally stiff couplings and good alignment raise $f_n$; backlash in a gearbox makes it non-linear and is the classic source of "noise" that is actually physics.`,
        },
        { kind: "equation", formula: "aw09-rig-motor-torque" },
        { kind: "sources", refs: ["aw09-r13"] },
      ],
    },
    {
      layer: "applied",
      title: "Sizing an actuator rig for a humanoid-class knee joint",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Actuator rig sizing (illustrative numbers)",
          given: md`Illustrative DUT, not a real customer: a humanoid-class rotary knee actuator. Peak output torque **200 N·m**, continuous **80 N·m**, maximum speed **12 rad/s** (115 rpm), with a power corner at 200 N·m and 6 rad/s. Reflected DUT inertia at the output **0.25 kg·m²**. Test needs: efficiency maps in all four quadrants, torque steps with 50 rad/s² accelerations, back-drive tests. Two rig options: (A) servo motor, rotor plus gearbox inertia 0.0055 kg·m², through a 10:1 planetary gearbox, efficiency 95 %; (B) direct-drive torque motor, rotor inertia 0.06 kg·m². Sizing margin 1.25. Combined shaft-line stiffness (transducer plus couplings) **15,000 N·m/rad**.`,
          steps: [
            { md: md`**Power envelope.** Corner power $P = 200 \times 6 = 1{,}200$ W; at top speed with 100 N·m it is also 1.2 kW. The rig must absorb **and** drive 1.2 kW mechanical, in all four quadrants. With margin and machine losses plan about **1.6 kW** of rig drive rating. Small: power is not the hard part of an actuator rig.` },
            { md: md`**Option A motor torque and speed.** $T_m = 1.25 \times 200/(10 \times 0.95) = 26.3$ N·m peak; $\omega_m = 10 \times 12 = 120$ rad/s = **1,146 rpm**. A mid-size servo motor covers this easily.` },
            { md: md`**Option A inertia.** Reflected to the DUT side: $J = 10^2 \times 0.0055 = 0.55$ kg·m², more than twice the DUT's own 0.25. Accelerating the shaft line at 50 rad/s² costs $(0.55 + 0.25) \times 50 = 40$ N·m, of which 27.5 N·m is the rig. That is 14 % of the DUT's peak torque spent on the rig, and a gearbox with backlash in the load path.` },
            { md: md`**Option B.** The torque motor must deliver $1.25 \times 200 = 250$ N·m directly at 12 rad/s. Shaft-line inertia $0.06 + 0.25 = 0.31$ kg·m²; the acceleration torque is 15.5 N·m, of which only 3 N·m is the rig. No backlash. The motor is larger and dearer (a large frameless torque motor plus drive), but this is why direct-drive is common for joint testing. If the application inertia is higher (a leg plus body share), add a flywheel or emulate inertia in software.` },
            { md: md`**Torsional resonance (option B).** $f_n = \frac{1}{2\pi}\sqrt{15{,}000 \times 0.31/(0.06 \times 0.25)} = 88.6$ Hz. Keep torque-control bandwidth and excitation below about 30 Hz, or stiffen the line. Gait-like profiles (1 to 3 Hz fundamentals with harmonics to perhaps 20 Hz) fit.` },
            { md: md`**Transducer range.** A 250 N·m transducer covers the 200 N·m peak with headroom. At accuracy class 0.05 its error band is about 0.125 N·m: 0.06 % at peak but 0.6 % when measuring a 20 N·m back-drive friction torque. For low-torque friction and efficiency at light load, plan a second, smaller transducer or a dual-range sensor.` },
            { md: md`**Supply.** Put both drives on a common DC bus. At 1.2 kW, with DUT drive-chain efficiency 0.85 and rig regenerating efficiency 0.88, the grid supplies $1.2 \times (1/0.85 - 0.88) = 0.36$ kW instead of 1.41 kW.` },
          ],
          result: md`Choose option B: a 250 N·m direct-drive torque motor with a four-quadrant drive on a shared DC bus, a 250 N·m class 0.05 flange transducer plus a small-range transducer for friction work, and a shaft line stiff enough to keep the first mode near 90 Hz. Option A is cheaper but adds 0.55 kg·m² and backlash, which distorts exactly the dynamic tests a humanoid team cares about.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Check a vendor quote for the same DUT (illustrative)",
          given: md`A vendor proposes a servo motor with 0.004 kg·m² rotor inertia (gearbox included) through a **7:1** gearbox, efficiency 0.95, sizing margin 1.25. DUT as above (200 N·m peak, 12 rad/s, 0.25 kg·m²).`,
          steps: [
            { md: md`Reflected rig inertia: $J = N^2 J_{\text{in}} = 49 \times 0.004$.`, hidden: true, check: { prompt: "Reflected rig inertia at the DUT side", answer: 0.196, unit: "kg·m²", tolerance: { rel: 0.01 } } },
            { md: md`Required motor peak torque: $T_m = 1.25 \times 200/(7 \times 0.95)$.`, hidden: true, check: { prompt: "Rig motor peak torque", answer: 37.6, unit: "N·m", tolerance: { rel: 0.01 } } },
            { md: md`Motor speed: $7 \times 12 = 84$ rad/s (802 rpm). Acceleration torque at 50 rad/s²: $(0.196 + 0.25) \times 50 = 22.3$ N·m.` },
          ],
          result: md`Rig inertia 0.196 kg·m², motor torque 37.6 N·m. Better than the 10:1 option, still geared: ask for the gearbox backlash and torsional stiffness before accepting.`,
        },
        {
          kind: "question",
          question: {
            id: "aw09-l01-p1",
            type: "numeric",
            prompt: md`A rig shaft line has a rig-side inertia of 0.10 kg·m², a DUT-side inertia of 0.40 kg·m² and a series torsional stiffness of 20,000 N·m/rad. What is the first torsional natural frequency? (Hz, 1 decimal)`,
            answer: 79.6,
            tolerance: { abs: 0.3 },
            unit: "Hz",
            explanation: md`$f_n = \frac{1}{2\pi}\sqrt{20{,}000 \times 0.5/(0.10 \times 0.40)} = \frac{1}{2\pi}\sqrt{250{,}000} = 500/6.283 = 79.6$ Hz. Keep test excitation and torque-loop bandwidth below roughly 25 Hz.`,
            concepts: ["aw09.shaft-line-resonance"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Buying, commissioning and running a rig",
      blocks: [
        {
          kind: "md",
          md: md`### Who does what

Large labs buy dynos from specialist vendors (powertrain dyno makers, drive and torque-motor suppliers, transducer makers such as the major strain-gauge sensor companies) and integrate them with a test automation system and DAQ. Robotics companies often build actuator rigs in-house from a torque motor, a drive, a flange transducer and a bedplate, because commercial actuator rigs are few and expensive. The rig engineer owns the mechanical layout, alignment and commissioning; the test engineer owns the profiles and the data. Signals typically recorded: DUT phase currents and voltages, DC bus voltage and current, torque, speed and position (encoder), temperatures (windings, housing, gearbox oil), vibration, and controller-internal variables over CAN or EtherCAT. Getting all of those onto one clock is exactly Lockstep's job.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`**Peak torque sized, inertia ignored:** the rig passes acceptance on steady-state points and then distorts every transient test. **Misalignment:** angular or parallel offset puts bending into the torque transducer and shows up as a once-per-revolution torque ripple that is blamed on the DUT. **Transducer far too large:** a 1,000 N·m sensor "for future DUTs" makes low-torque efficiency data useless. **Absorber-only brake bought for a robotics lab:** no back-drive, no regeneration, no quadrant 2 and 4 testing. **No overspeed and overtorque trips** independent of the control software (lesson 5).`,
        },
        {
          kind: "checklist",
          title: "Rig specification checks",
          items: [
            "DUT torque-speed envelope drawn in all four quadrants, with the duty cycles the tests will run",
            "Rig continuous and peak torque at DUT speed, including gear losses and a stated margin",
            "Reflected rig inertia at the DUT side versus the application's load inertia; inertia emulation bandwidth if offered",
            "Torque transducer range, accuracy class, maximum speed, torsional stiffness and permitted parasitic loads",
            "First torsional natural frequency of the assembled shaft line, by calculation and by measurement at commissioning",
            "Power path: braking resistor, active front end or common DC bus; grid connection size",
            "Alignment tolerances, coupling type and the alignment procedure on DUT changeover",
            "Encoder resolution and how speed is derived (differentiated position adds noise)",
          ],
        },
        {
          kind: "ask",
          title: "Questions for a rig vendor or an in-house rig engineer",
          items: [
            "What is the reflected inertia of the rig at the DUT flange, and can the controller emulate a different inertia? Up to what frequency?",
            "What is the measured first torsional mode with a typical DUT mounted?",
            "Which quadrants can the rig run continuously, and where does the regenerated power go?",
            "What happens to the DUT if the rig drive trips mid-test at full speed: does it coast, brake or drive?",
            "How is the torque transducer protected against overload and bending, and when was it last calibrated?",
            "How long does a DUT changeover take, including alignment?",
          ],
        },
        {
          kind: "feynman",
          prompt: "Explain to a non-technical investor why a robot joint test rig needs a big, expensive direct-drive motor even though the joint only produces about 1 kW.",
          keyPoints: [
            "The difficult number is torque at low speed (hundreds of N·m), not power",
            "A cheaper geared motor adds inertia that grows with the square of the gear ratio, plus backlash",
            "That extra inertia and backlash distort the fast, back-and-forth tests that matter for walking robots",
            "The rig must drive and brake in both directions (four quadrants), which rules out simple brakes",
            "Bad rig dynamics produce bad data, which undermines everything built on that data",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw09-l01-p2",
            type: "short",
            prompt: md`A humanoid robotics team tells you on a discovery call: "Our actuator rig is fine, we just need better data tooling." Write the five technical questions you would ask in that call to judge whether their rig data is trustworthy enough for Ripple-style regression decisions, and for each say in one line what answer would worry you.`,
            rubric: [
              "Asks about rig inertia or inertia emulation relative to the real leg load, and flags a geared rig with much higher inertia as a worry",
              "Asks about quadrant coverage or back-drive capability, and flags absorb-only operation",
              "Asks about torque transducer range, accuracy class and calibration status, and flags an oversized or uncalibrated sensor",
              "Asks about time synchronisation of rig signals and controller data, and flags separate unsynchronised logs",
              "Asks about shaft-line resonance, alignment or repeatability across DUT changeovers",
              "Keeps the questions in the customer's language and ties at least one to a business consequence (wasted retests, wrong regression calls)",
            ],
            modelAnswer: md`1. **What inertia does the rig present at the joint, compared with the leg it drives in the robot?** Worry: a geared load motor several times the leg inertia, with no emulation, so transient tests do not represent walking.
2. **Can the rig back-drive the joint and absorb regenerated power, so you can test lowering and braking?** Worry: an absorb-only brake, so quadrants 2 and 4 are never tested.
3. **What torque sensor is in the line, what range and class, and when was it last calibrated?** Worry: a 1,000 N·m sensor used to measure 20 N·m friction, or no calibration record.
4. **How do you line up rig torque and speed with the joint controller's internal signals in time?** Worry: two logs merged by hand on PC timestamps, which is exactly where a regression call goes wrong.
5. **If you rerun the same profile after remounting the actuator, how close do the results come?** Worry: nobody knows, or changeover alignment is undocumented: then any firmware comparison is mixed with fixture noise, and Ripple would be ranking noise.`,
            explanation: md`Good discovery questions on rig quality do two things: they show the customer you understand their bench, and they reveal whether their data is clean enough for automated regression decisions. Inertia, quadrant coverage, transducer fitness, time alignment and changeover repeatability are the five places where rig data most often looks fine and is not.`,
            concepts: ["aw09.inertia-matching", "aw09.four-quadrant", "aw09.torque-transducer"],
            difficulty: 2,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw09-l01-q1",
      type: "mcq",
      prompt: md`A robotics lab wants to test a knee actuator lowering a body under control (positive torque, negative speed). Which dynamometer type can do this?`,
      options: ["Eddy-current brake", "Water brake", "AC four-quadrant dyno or a back-to-back rig", "Hysteresis brake"],
      answer: 2,
      explanation: md`Lowering under control is quadrant 2: the rig must drive the joint backwards while the joint resists. Only an electric machine with an inverter (or a back-to-back pair) can drive the DUT; brakes only absorb.`,
      concepts: ["aw09.four-quadrant", "aw09.dyno-configurations"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw09-l01-q2",
      type: "numeric",
      prompt: md`A load motor with 0.008 kg·m² inertia drives the DUT through a 12:1 gearbox. What inertia does the DUT see from the rig? (kg·m²)`,
      answer: 1.152,
      tolerance: { rel: 0.01 },
      unit: "kg·m²",
      explanation: md`$J_{\text{out}} = N^2 J_{\text{in}} = 144 \times 0.008 = 1.152$ kg·m². Inertia scales with the square of the ratio.`,
      concepts: ["aw09.inertia-matching"],
      difficulty: 1,
    },
    {
      id: "aw09-l01-q3",
      type: "numeric",
      prompt: md`A drive unit is tested at 250 N·m and 3,000 rpm. What is the shaft power? (kW, 1 decimal)`,
      answer: 78.5,
      tolerance: { abs: 0.2 },
      unit: "kW",
      explanation: md`$\omega = 2\pi \times 3{,}000/60 = 314.2$ rad/s; $P = 250 \times 314.2 = 78{,}540$ W = 78.5 kW.`,
      concepts: ["aw09.rig-sizing"],
      difficulty: 1,
    },
    {
      id: "aw09-l01-q4",
      type: "multi",
      prompt: md`Which changes raise the first torsional natural frequency of a shaft line? (Select all.)`,
      options: [
        "A torsionally stiffer coupling",
        "A longer intermediate shaft",
        "A lower-inertia rig motor",
        "A torque transducer with higher torsional stiffness",
        "Adding a flywheel on the rig side",
      ],
      answer: [0, 2, 3],
      explanation: md`$f_n$ rises with stiffness and falls with inertia. A longer shaft is softer; a flywheel adds inertia. Lower rig inertia raises the frequency.`,
      concepts: ["aw09.shaft-line-resonance"],
      difficulty: 2,
    },
    {
      id: "aw09-l01-q5",
      type: "numeric",
      prompt: md`A back-to-back gearbox rig circulates 100 kW of mechanical power. Motoring-side efficiency is 0.94, regenerating-side 0.93. Approximately how much power does the grid supply? (kW, 1 decimal)`,
      answer: 13.4,
      tolerance: { abs: 0.2 },
      unit: "kW",
      explanation: md`$P_{\text{grid}} = 100 \times (1/0.94 - 0.93) = 100 \times (1.0638 - 0.93) = 13.4$ kW, against 106.4 kW with no regeneration.`,
      concepts: ["aw09.dyno-configurations"],
      difficulty: 2,
    },
    {
      id: "aw09-l01-q6",
      type: "decision",
      prompt: md`An in-house team proposes a 1,000 N·m torque transducer for a rig whose current DUTs peak at 150 N·m, "so we never have to buy another". What do you advise?`,
      options: [
        { text: "Agree: one large sensor saves money", score: 0, feedback: "A class 0.05 sensor at 1,000 N·m has an error band near 0.5 N·m: 2.5 % of a 20 N·m friction torque. The data becomes useless at low load." },
        { text: "Size for current DUTs with headroom (about 200 to 250 N·m) and add a smaller range sensor for low-torque work; buy a larger one when a larger DUT appears", score: 1, feedback: "Right: accuracy classes are percent of full scale, so range is chosen for the torques you actually measure." },
        { text: "Use the 1,000 N·m sensor and fix accuracy by averaging more samples", score: 0.2, feedback: "Averaging reduces random noise, not the full-scale-proportional errors (linearity, temperature effect on zero) that dominate here." },
      ],
      explanation: md`Transducer errors scale with full scale. Oversizing trades a small saving for poor data at the operating points that matter (efficiency at light load, friction, cogging).`,
      concepts: ["aw09.torque-transducer"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw09-l01-f1", front: "Shaft power from torque and rpm", back: md`$P = T\omega$, $\omega = 2\pi n/60$. 1,000 rpm = 104.7 rad/s.`, concepts: ["aw09.rig-sizing"] },
    { id: "aw09-l01-f2", front: "Reflected inertia through ratio N", back: md`$J_{\text{out}} = N^2 J_{\text{in}}$: a 10:1 gearbox multiplies the motor's inertia by 100 at the DUT.`, concepts: ["aw09.inertia-matching"] },
    { id: "aw09-l01-f3", front: "Which dyno types can drive the DUT?", back: "Only electric motoring machines (AC dynos, servo or torque motors, back-to-back pairs). Eddy-current, hysteresis and water brakes only absorb.", concepts: ["aw09.dyno-configurations"] },
    { id: "aw09-l01-f4", front: "Quadrants 2 and 4", back: "Torque and speed have opposite signs: the DUT brakes or regenerates and the rig must drive. Essential for robot joints and EV regeneration.", concepts: ["aw09.four-quadrant"] },
    { id: "aw09-l01-f5", front: "Two-inertia torsional resonance", back: md`$f_n = \frac{1}{2\pi}\sqrt{k_t (J_1 + J_2)/(J_1 J_2)}$; keep test and control bandwidth below about $f_n/3$.`, concepts: ["aw09.shaft-line-resonance"] },
    { id: "aw09-l01-f6", front: "Why share a DC bus between DUT and rig drives?", back: "Absorbed power circulates back to the DUT side; the grid supplies only the losses.", concepts: ["aw09.dyno-configurations"] },
    { id: "aw09-l01-f7", front: "Three ways to match application inertia on a rig", back: "Choose a low-inertia direct-drive machine, add a flywheel, or emulate inertia in the rig controller (within its bandwidth).", concepts: ["aw09.inertia-matching"] },
  ],
};

export default lesson;
