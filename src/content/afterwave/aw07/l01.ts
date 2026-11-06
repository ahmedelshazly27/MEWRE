import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw07-l01",
  title: "Actuators and drives: motors, gearboxes, harmonic drives and what limits a joint",
  summary:
    "A robot joint is a power chain: DC bus, inverter, motor, gearbox, output. Learn the motor equations (torque constant, back-EMF, copper loss, motor constant), what the gear ratio does to torque, speed and reflected inertia, why harmonic drives dominate humanoid joints, and how backlash, compliance and thermal limits decide what an actuator really delivers on the bench.",
  minutes: 80,
  objectives: [
    "You can compute motor torque, current, copper loss and required bus voltage for a joint operating point from Kt, R, gear ratio and efficiency.",
    "You can explain why the gear ratio multiplies reflected inertia by N squared and what that means for impacts and back-drivability.",
    "You can compare planetary, harmonic, cycloidal, quasi-direct-drive and screw actuators on torque density, backlash, stiffness and efficiency.",
    "You can estimate continuous vs peak torque from a thermal resistance and the drivetrain resonance from torsional stiffness.",
    "You can draft an actuator characterisation test plan a humanoid test team would recognise.",
  ],
  concepts: [
    { id: "aw07.actuator-chain", name: "Actuator power chain", description: "DC bus, inverter (drive), motor, gearbox and output joint, each with its own limits (voltage, current, torque, speed, temperature) and losses; the weakest link sets the operating envelope.", competency: "aw-physical-ai", related: ["aw07.torque-constant", "aw07.gear-reduction"] },
    { id: "aw07.torque-constant", name: "Torque constant and back-EMF", description: "Motor torque is proportional to current (tau = Kt i); generated voltage is proportional to speed (e = Ke omega); in consistent SI units Kt equals Ke, so torque per amp and volts per rad/s are the same design choice.", competency: "aw-physical-ai", related: ["aw07.actuator-chain", "aw07.thermal-limit"] },
    { id: "aw07.gear-reduction", name: "Gear reduction and reflected inertia", description: "A ratio N multiplies torque by N (times efficiency), divides speed by N and multiplies the motor's inertia seen at the output by N squared.", competency: "aw-physical-ai", related: ["aw07.torque-constant", "aw07.harmonic-drive"] },
    { id: "aw07.harmonic-drive", name: "Harmonic (strain wave) drive", description: "Wave generator, flexspline and circular spline giving 30:1 to 160:1 in one compact stage with near-zero backlash, but with torsional compliance, hysteresis, efficiency that varies with load, speed and temperature, and flexspline fatigue life.", competency: "aw-physical-ai", related: ["aw07.gear-reduction", "aw07.backlash-compliance"] },
    { id: "aw07.backlash-compliance", name: "Backlash, compliance and lost motion", description: "Backlash is free play at torque reversal; compliance is elastic twist under load (tau = k theta); together they set positioning error at the end effector and a drivetrain resonance that caps control bandwidth.", competency: "aw-physical-ai", related: ["aw07.harmonic-drive"] },
    { id: "aw07.thermal-limit", name: "Thermal limit and torque density", description: "Continuous torque is set by how much copper loss the winding can shed at its temperature limit; peak torque by current and magnetic saturation for short durations. Torque density (N m/kg) means little without the duration and cooling stated.", competency: "aw-physical-ai", related: ["aw07.torque-constant"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "From current to joint torque: the equations of an electric actuator",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`The first buyers of Lockstep and Ripple are test teams whose rigs exist to characterise actuators: drive units, motors, gearboxes, humanoid joints. Ismail and Yusuf spent years validating Tesla drive units and inverters, and stage four of the product vision is Afterwave's own generalised actuator test platform. When a humanoid test lead says "the knee runs out of voltage above 4 rad/s" or "we lost 8 Nm of continuous torque after the harmonic drive supplier change", you need to know what that means, what was measured and which tests should rerun.`,
        },
        {
          kind: "md",
          md: md`### The chain

Every electric joint is the same chain: **DC bus** (battery, typically tens of volts in mobile robots) feeding an **inverter** (the drive: power transistors switched by a controller), feeding a **motor** (almost always a permanent-magnet synchronous or brushless DC motor, often "frameless" so the rotor and stator are built into the joint housing), feeding a **gearbox**, feeding the **joint output** and the link it moves. Each element has a limit: the bus limits voltage, the drive limits current, the motor limits temperature and speed, the gearbox limits torque, stiffness and life. The operating envelope is the intersection of all of them.

### The motor in three equations

For a brushless or DC motor seen from its terminals, with winding resistance $R$, inductance $L$, current $i$ and speed $\omega$:`,
        },
        { kind: "equation", formula: "aw07-motor-torque" },
        { kind: "equation", formula: "aw07-back-emf" },
        { kind: "equation", formula: "aw07-motor-voltage" },
        {
          kind: "md",
          md: md`The physics: torque comes from the force on current-carrying conductors in the magnet's field, so it scales with current. The same conductors moving through the same field generate a voltage that scales with speed. Energy conservation forces the two constants to be equal in SI units ($K_t$ in N m/A equals $K_e$ in V s/rad), so **you cannot choose high torque per amp without also choosing high volts per rad/s**. A winding with more turns gives more torque per amp and a lower top speed on the same bus.

At steady speed the $L\,di/dt$ term vanishes and the drive must supply $V = R\,i + K_e\,\omega$. If that exceeds what the bus can provide, the motor cannot hold that torque at that speed. That is the **voltage limit**, the sloped right-hand side of every torque-speed curve. The flat top is the **current limit** of the drive.

Losses that matter for a joint are mostly copper loss:`,
        },
        { kind: "equation", formula: "aw07-copper-loss" },
        { kind: "equation", formula: "aw07-motor-constant" },
        {
          kind: "md",
          md: md`The **motor constant** $K_m$ is the honest figure of merit: torque per square root of watt dissipated. It does not depend on the winding choice (rewinding trades $K_t$ against $R$ but keeps $K_m$), so it compares motors fairly. Torque costs heat as $\tau^2$: doubling torque quadruples copper loss.

### The gearbox

A gear ratio $N$ with efficiency $\eta$ transforms the motor side to the output side:`,
        },
        { kind: "equation", formula: "aw07-gear-torque" },
        { kind: "equation", formula: "aw07-reflected-inertia" },
        {
          kind: "md",
          md: md`Why $N^2$: kinetic energy is $\tfrac12 J_m\omega_m^2 = \tfrac12 J_m N^2\omega_{out}^2$, so seen from the output the rotor behaves like an inertia $N^2 J_m$. A small rotor behind a 100:1 gearbox feels like a heavy flywheel at the joint. Consequences: the joint is hard to **back-drive** (push by hand or by an impact), impact forces at foot strike or on a collision are larger because the reflected inertia cannot get out of the way, and the drive must spend torque accelerating the rotor. This is why some legged robots use **quasi-direct-drive** (large-diameter motor, ratio around 6:1 to 10:1): low reflected inertia, transparent force control, at the cost of a heavier motor per unit torque.

### Gearbox types used in robots

| Type | Typical ratio per stage | Backlash | Stiffness | Efficiency | Where you see it |
|---|---|---|---|---|---|
| Planetary | 3:1 to 10:1 (stacked for more) | arc-minutes (low-backlash versions a few arcmin) | high | high (often above 90 % per stage) | mobile robots, legs with moderate ratio |
| Harmonic (strain wave) | 30:1 to 160:1 in one stage | near zero (sub-arcminute class) | moderate, nonlinear, with hysteresis | load, speed and temperature dependent (often quoted 60 to 85 %) | arms, humanoid upper body and many humanoid joints |
| Cycloidal | 10:1 to 100:1 | low | high, good shock load capacity | good | industrial robot bases, heavy joints |
| Ball or planetary roller screw | rotary to linear | low (preloaded) | high axially | high (ball), good (roller) | linear actuators in humanoid legs and torsos |
| Quasi-direct-drive | 6:1 to 10:1 single planetary | small | high | high | dynamic legged robots, force-transparent joints |

Ranges are typical catalogue values, not a specific vendor's datasheet; always use the supplier's numbers for a real design.

### Harmonic drives, backlash and compliance

A **harmonic drive** has three parts: an elliptical **wave generator** on the motor shaft, a thin flexible **flexspline** with external teeth, and a rigid **circular spline** with slightly more internal teeth (typically two more). As the ellipse rotates, the flexspline engages the circular spline at two zones and walks backwards by two teeth per wave-generator turn, so the ratio is the flexspline tooth count divided by the tooth difference (for 200 teeth and a difference of 2: 100:1). Many teeth are in contact at once, which is why backlash is near zero and torque capacity is high for the size. The price: the flexspline twists elastically under load (**compliance**), shows **hysteresis** (the twist differs loading vs unloading), its efficiency falls at low torque and low temperature, and the flexspline is a fatigue part with a finite rated life.

Two different "errors" must not be confused. **Backlash** is free play at torque reversal: the output moves with no torque until the teeth re-engage. **Compliance** is elastic deflection under load:`,
        },
        { kind: "equation", formula: "aw07-torsional-stiffness" },
        {
          kind: "md",
          md: md`Any angular error $\delta\theta$ at the joint becomes a position error $r\,\delta\theta$ at a link of length $r$. And stiffness with two inertias on either side (reflected rotor, load) makes a spring-mass system with a **resonance**:`,
        },
        { kind: "equation", formula: "aw07-two-mass-resonance" },
        {
          kind: "md",
          md: md`This resonance is the ceiling on how fast the joint's position loop can be tuned (lesson 2). Change the gearbox supplier, the stiffness changes, the resonance moves, and the control tuning and every test that depends on it are suspect. That sentence is a Ripple rule.

### Thermal limit: continuous vs peak

Copper loss heats the winding. With a thermal resistance $R_{th}$ from winding to ambient (K/W) and a winding limit $\Delta T_{max}$ above ambient, the steady-state allowed loss is $\Delta T_{max}/R_{th}$, which gives the **continuous torque**:`,
        },
        { kind: "equation", formula: "aw07-continuous-torque" },
        {
          kind: "md",
          md: md`Peak torque is limited by drive current and magnetic saturation and can be held only for seconds, set by the winding's thermal time constant. So a datasheet "torque density of 100 N m/kg" means nothing until you know: peak or continuous, for how long, at what ambient, with what cooling and mounting. Torque density figures circulating for humanoid actuators usually quote **peak** torque.

Also remember the magnets: NdFeB remanence falls roughly 0.1 % per kelvin, so $K_t$ drops as the rotor heats, while copper resistance rises about 0.39 % per kelvin. A hot motor makes less torque per amp and more heat per amp. Test at temperature, not only at 25 °C.`,
        },
        {
          kind: "flow",
          title: "The joint power chain and the limit each element imposes",
          steps: [
            { label: "DC bus", detail: "Voltage sets the top of the speed range (back-EMF limit)" },
            { label: "Drive (inverter)", detail: "Current limit sets peak torque; switching and conduction losses; current loop runs here" },
            { label: "Motor", detail: "Kt, R, Km; winding temperature limit sets continuous torque" },
            { label: "Gearbox", detail: "Ratio N, efficiency, backlash, stiffness, rated and peak torque, life" },
            { label: "Joint output and link", detail: "Load inertia, impacts, position error r times angle error" },
          ],
          caption: "Each box is also a test boundary: an actuator rig measures across all of them, so a change in any one invalidates results downstream.",
        },
        {
          kind: "chart",
          chart: "line",
          title: "Output torque-speed envelope of one illustrative knee actuator on two bus voltages",
          xKey: "speed",
          xLabel: "Output speed (rad/s)",
          yLabel: "Max output torque (N m)",
          series: [
            { key: "v48", label: "48 V bus" },
            { key: "v80", label: "80 V bus" },
          ],
          data: [
            { speed: 0, v48: 225, v80: 225 },
            { speed: 1, v48: 225, v80: 225 },
            { speed: 2, v48: 225, v80: 225 },
            { speed: 3, v48: 225, v80: 225 },
            { speed: 3.5, v48: 216, v80: 225 },
            { speed: 3.75, v48: 108, v80: 225 },
            { speed: 4, v48: 0, v80: 225 },
            { speed: 5, v48: 0, v80: 225 },
            { speed: 6, v48: 0, v80: 225 },
            { speed: 6.25, v48: 0, v80: 180 },
            { speed: 6.5, v48: 0, v80: 72 },
          ],
          caption: "Illustrative: Kt = 0.12 N m/A, R = 0.25 ohm, drive current limit 25 A, N = 100, efficiency 0.75. Flat top = current limit; cliff = back-EMF reaching the bus. Simplified (no inductance, voltage utilisation or field weakening), but the shape is what a dyno sweep shows.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Sizing check on an illustrative humanoid knee",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Can this knee actuator deliver 150 N m at 6 rad/s on a 48 V bus?",
          given: md`Illustrative actuator (not any vendor's product): frameless motor $K_t = K_e = 0.12$ N m/A (V s/rad), terminal resistance $R = 0.25\ \Omega$, rotor inertia $J_m = 1.5\times10^{-4}$ kg m²; harmonic drive $N = 100$, efficiency $\eta = 0.75$, torsional stiffness $k_\theta = 2.0\times10^4$ N m/rad; shank and foot inertia about the knee $J_L = 0.25$ kg m²; thermal resistance winding to ambient $R_{th} = 2.0$ K/W, allowed winding rise 100 K. Requirement from the gait team: 150 N m at 6 rad/s output during stair climbing.`,
          steps: [
            { md: md`**Motor torque and current.** $\tau_m = \tau_{out}/(N\eta) = 150/(100\times0.75) = 2.0$ N m. $i = \tau_m/K_t = 2.0/0.12 = 16.7$ A.` },
            { md: md`**Copper loss.** $P_{cu} = i^2R = 16.7^2\times0.25 = 69.4$ W.` },
            { md: md`**Speed and back-EMF.** Motor speed $\omega_m = N\omega_{out} = 600$ rad/s (5,730 rpm). $e = K_e\omega_m = 0.12\times600 = 72$ V.` },
            { md: md`**Voltage needed.** $V = R\,i + K_e\omega_m = 4.2 + 72 = 76.2$ V. A 48 V bus cannot supply it: at 48 V the no-load motor speed is $48/0.12 = 400$ rad/s, i.e. **4 rad/s at the output**, so the requirement is impossible as specified, whatever the current.` },
            { md: md`**Reflected inertia.** $N^2J_m = 10^4\times1.5\times10^{-4} = 1.5$ kg m², **six times** the leg's own 0.25 kg m². At foot strike the joint behaves as if a heavy flywheel were bolted to the knee.` },
            { md: md`**Drivetrain resonance.** $f_r = \frac{1}{2\pi}\sqrt{2\times10^4\,(1/1.5 + 1/0.25)} = \frac{1}{2\pi}\sqrt{93{,}333} = 48.6$ Hz. Position loop crossover should stay well below this (lesson 2).` },
            { md: md`**Continuous torque.** Allowed loss $100/2.0 = 50$ W, so $i_{cont} = \sqrt{50/0.25} = 14.1$ A, $\tau_{m,cont} = 1.70$ N m, $\tau_{out,cont} = 1.70\times75 = 127$ N m. 150 N m is a **peak** demand: acceptable only if stair-climbing duty cycles keep the RMS torque below 127 N m.` },
          ],
          result: md`As specified the actuator fails the requirement on voltage, not on torque. Options: raise the bus (at 80 V the 76 V requirement fits with little margin), lower the ratio (lower back-EMF at the output speed, but more current and copper loss, see the next example), use field weakening (more current for less torque), or renegotiate the requirement with the gait team. The test plan must include a torque-speed sweep at the real bus voltage and a duty-cycle thermal test, or the gap appears on the robot.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Lower the ratio: same motor with a 50:1 planetary",
          given: md`Same motor ($K_t = 0.12$ N m/A, $R = 0.25\ \Omega$, $J_m = 1.5\times10^{-4}$ kg m², drive limit 25 A). Gearbox changed to a two-stage planetary $N = 50$, $\eta = 0.90$. Same requirement: 150 N m at 6 rad/s, 48 V bus.`,
          steps: [
            { md: md`Motor torque $\tau_m = 150/(50\times0.90)$.` },
            { md: md`$\tau_m = 3.33$ N m, so $i = 3.33/0.12 = 27.8$ A.`, hidden: true, check: { prompt: "Motor current (A)", answer: 27.8, unit: "A", tolerance: { abs: 0.2 } } },
            { md: md`That exceeds the 25 A drive limit: maximum output torque is $25\times0.12\times50\times0.90 = 135$ N m.` },
            { md: md`Required voltage at the requirement: $\omega_m = 300$ rad/s, $V = 0.25\times27.8 + 0.12\times300$.` },
            { md: md`$V = 6.9 + 36 = 42.9$ V: it now fits the 48 V bus.`, hidden: true, check: { prompt: "Required voltage (V)", answer: 42.9, unit: "V", tolerance: { abs: 0.3 } } },
            { md: md`Copper loss at 27.8 A: $27.8^2\times0.25 = 193$ W, almost three times the 100:1 case. Reflected inertia drops to $50^2\times1.5\times10^{-4} = 0.375$ kg m², a quarter.` },
          ],
          result: md`Halving the ratio fixes the voltage limit and the reflected inertia but breaks the current limit and nearly triples the heat. There is no free lunch: the ratio moves the problem between voltage, current, heat and inertia. A bigger motor (higher $K_m$) is the only way to improve all of them, and it costs mass.`,
        },
        {
          kind: "question",
          question: {
            id: "aw07-l01-p1",
            type: "numeric",
            prompt: md`A gearbox has 10 arcmin of backlash. What is the resulting free play at the tip of a 0.40 m link, in mm (2 decimals)?`,
            answer: 1.16,
            tolerance: { abs: 0.02 },
            unit: "mm",
            explanation: md`10 arcmin $= 10/60$ degrees $= 0.1667\times\pi/180 = 2.909\times10^{-3}$ rad. Free play $= r\,\delta\theta = 0.40\times2.909\times10^{-3} = 1.16\times10^{-3}$ m = **1.16 mm**. A harmonic drive in the sub-arcminute class gives about 0.12 mm at the same radius, which is why arms and hands use them.`,
            concepts: ["aw07.backlash-compliance"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "How actuators are characterised on the bench",
      blocks: [
        {
          kind: "md",
          md: md`### Who does it and with what

Actuator characterisation is done by the actuator or drive-unit test team (at a humanoid OEM, a motor or gearbox supplier, or an automotive drive-unit group: the world Ismail and Yusuf come from). The rig is a **dynamometer**: the actuator under test drives, or is driven by, a **load motor** through an inline **torque transducer**, with **encoders on both sides** of the gearbox, current and voltage sensing on the drive, thermocouples or RTDs in the winding and housing, and often an accelerometer for vibration. The rig controller runs scripted profiles; a DAQ records everything; the drive's own log (currents, commands, faults) runs on a different clock. Getting both on one timeline is exactly Lockstep's job.

### The standard test set

| Test | What it measures | Typical signals |
|---|---|---|
| Torque-speed sweep | Current and voltage limits, field weakening onset | torque, speed, phase currents, bus voltage |
| Efficiency map | Efficiency over the torque-speed plane, motor and gearbox separately | electrical power in, mechanical power out, both encoders |
| Torque constant and ripple | $K_t$ vs current and temperature, cogging and ripple | torque at low speed, current |
| Backlash and hysteresis | Free play at reversal, loading vs unloading curve | output torque vs (motor angle/N minus output angle) |
| Torsional stiffness | $k_\theta$ curve (often three-segment for harmonic drives) | locked output, torque ramp, both encoders |
| Back-drivability | Torque needed to move the output with the motor unpowered or in torque mode | output torque, speed |
| Thermal duty cycle | Winding temperature over a realistic gait or task cycle | winding temperature, RMS current |
| Endurance and life | Flexspline fatigue, bearing wear, efficiency drift over millions of cycles | everything above, trended |
| Frequency response | Drivetrain resonance, control bandwidth | chirp command, torque and position response |

Industrial robots also have a standard for whole-arm performance tests (ISO 9283: pose accuracy and repeatability, path accuracy), which joint-level tests feed.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- **Datasheet peak treated as continuous.** A torque density claim without duration, ambient and mounting is marketing. Ask for the thermal model or test at the real duty cycle.
- **Testing at 25 °C only.** $K_t$ falls and $R$ rises with temperature, and harmonic drive efficiency is poor when cold. A robot in an unheated warehouse in winter behaves differently.
- **One encoder.** Without an output-side encoder you cannot separate backlash, compliance and gearbox wear from motor behaviour.
- **Unrecorded change of supplier or batch.** A new flexspline batch or lubricant changes stiffness, efficiency and life. If the rig data does not record part revision and lot, nobody can say which results still hold.
- **Drive firmware drift.** Current limits, field-weakening tables and protection thresholds live in drive firmware. A silent firmware update invalidates the torque-speed curve.`,
        },
        {
          kind: "checklist",
          title: "What to check when a team shows you actuator results",
          items: [
            "Peak and continuous torque stated with duration, ambient and cooling",
            "Bus voltage used in the test equals the robot's real minimum bus voltage (battery near empty)",
            "Both motor-side and output-side angles recorded",
            "Part numbers, lots and drive firmware version captured in the test record",
            "Temperature-dependent tests (Kt, efficiency, thermal duty) run at the operating range, not only 25 °C",
            "Endurance data trended, not just pass/fail at the end",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask an actuator test lead in discovery",
          items: [
            "Which actuator change last forced you to rerun more tests than you wanted, and how did you decide which?",
            "How do you line up the drive log with the dyno DAQ today?",
            "When the gearbox supplier changes a lot or a lubricant, which of your test results do you treat as invalid?",
            "How long does a full characterisation of one joint take in rig hours, and how many joints and revisions per year?",
          ],
        },
        {
          kind: "widget",
          widget: "platform-economics",
          caption: "Stage four of the vision: a generalised actuator test platform. Play with rig capex, utilisation and price per test hour to see what a single platform has to earn.",
        },
        {
          kind: "question",
          question: {
            id: "aw07-l01-p2",
            type: "short",
            prompt: md`A humanoid company asks Afterwave for a one-page **characterisation test plan** for its new knee actuator (harmonic drive, frameless motor, 48 V bus) so that Lockstep can be set up on their dyno. Write it: list the tests in order, the signals and sample rates Lockstep must capture for each, the pass criteria you would propose (illustrative numbers allowed, labelled), and which tests must be rerun if the harmonic drive supplier changes.`,
            rubric: [
              "Covers at least five relevant tests: torque-speed at real bus voltage, efficiency, backlash and hysteresis, stiffness, thermal duty cycle, endurance or frequency response",
              "Specifies signals including both encoders, torque transducer, phase currents, bus voltage and winding temperature, with plausible sample rates (kHz for currents and torque in dynamic tests, slower for temperature)",
              "States that the drive log and the dyno DAQ must share one clock or be aligned, and records part numbers, lots and firmware versions",
              "Gives measurable pass criteria with units and labels illustrative numbers as such",
              "Correctly identifies that a gearbox supplier change invalidates stiffness, backlash, efficiency, thermal, endurance and control tuning results, while motor-only tests (Kt, winding resistance) can be kept",
            ],
            modelAnswer: md`**Knee actuator characterisation plan (illustrative criteria)**

1. **Incoming checks:** winding resistance (4-wire, at 25 °C), back-EMF constant at 3 speeds. Signals: phase voltage 50 kHz, speed. Pass: Ke within ±5 % of nominal.
2. **Torque constant and ripple:** locked output, current steps 2 to 25 A. Signals: torque transducer and phase currents 10 kHz, winding temperature 10 Hz. Pass: Kt within ±5 %, torque ripple below 3 % of rated.
3. **Torque-speed sweep at 44 V** (bus with battery near empty) and 48 V. Signals: torque, motor and output encoders, phase currents, bus voltage 10 kHz. Pass: envelope covers the gait team's operating points with 10 % margin.
4. **Efficiency map** over 20 torque-speed points at 25 °C and 5 °C. Pass: gearbox efficiency above 70 % at rated point.
5. **Backlash, hysteresis, stiffness:** locked output, slow torque ramp ±rated. Both encoders at 1 kHz. Pass: lost motion below 1 arcmin, stiffness above 1.5e4 N m/rad.
6. **Frequency response:** chirp 1 to 200 Hz. Pass: first resonance above 40 Hz.
7. **Thermal duty cycle:** stair-climb profile for 30 min. Pass: winding below 120 °C.
8. **Endurance:** 2 million gait cycles, steps 3 to 5 repeated every 250k cycles.

Lockstep records the drive log and dyno DAQ on one clock (shared sync pulse), plus part numbers, lot codes and drive firmware version per run.

**If the harmonic drive supplier changes:** rerun 4 to 8 and the control tuning tests; keep 1 and 2 (motor only) and the motor half of 3, but repeat 3 because the efficiency changes output torque.`,
            explanation: md`A strong plan follows the power chain, records both sides of the gearbox, ties every test to signals and a pass criterion, and states the change-impact logic explicitly. That last part is what Ripple automates.`,
            concepts: ["aw07.actuator-chain", "aw07.harmonic-drive", "aw07.thermal-limit"],
            difficulty: 2,
          },
        },
        { kind: "sources", refs: ["aw07-r17", "aw07-r36"] },
        {
          kind: "feynman",
          prompt: "Explain to an investor with no engineering background why a humanoid's knee can have plenty of torque at low speed and still fail to climb stairs quickly.",
          keyPoints: [
            "Torque comes from current; the drive's current limit sets the maximum",
            "Speed generates a back voltage proportional to speed (back-EMF)",
            "When back-EMF plus resistive drop reaches the battery voltage, no more current can be pushed, so torque collapses at high speed",
            "The gear ratio multiplies motor speed, so a high ratio hits the voltage limit at a low joint speed",
            "Fixes trade against each other: higher voltage, lower ratio (more current and heat), or a bigger motor (more mass)",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw07-l01-q1",
      type: "numeric",
      prompt: md`A motor has $K_t = 0.08$ N m/A and $R = 0.4\ \Omega$. It must produce 1.2 N m. What is the copper loss in W?`,
      answer: 90,
      tolerance: { abs: 0.5 },
      unit: "W",
      explanation: md`$i = 1.2/0.08 = 15$ A; $P_{cu} = 15^2\times0.4 = 90$ W. Equivalently $P_{cu} = (\tau/K_m)^2$ with $K_m = 0.08/\sqrt{0.4} = 0.126$ N m/√W.`,
      concepts: ["aw07.torque-constant", "aw07.thermal-limit"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw07-l01-q2",
      type: "numeric",
      prompt: md`A rotor of $J_m = 2\times10^{-4}$ kg m² sits behind an 80:1 gearbox. What inertia does it present at the joint output, in kg m²?`,
      answer: 1.28,
      tolerance: { abs: 0.01 },
      unit: "kg m²",
      explanation: md`$N^2J_m = 6{,}400\times2\times10^{-4} = 1.28$ kg m². The rotor, a few hundred grams, feels like a flywheel at the joint.`,
      concepts: ["aw07.gear-reduction"],
      difficulty: 1,
    },
    {
      id: "aw07-l01-q3",
      type: "mcq",
      prompt: "Why can't a motor designer simply choose a winding with more torque per amp to make a stronger joint at every speed?",
      options: [
        "Because more turns increase the rotor inertia",
        "Because the torque constant equals the back-EMF constant in SI units, so more torque per amp also means more volts per rad/s and a lower top speed on the same bus",
        "Because the gearbox efficiency falls with more turns",
        "Because copper loss is independent of the winding",
      ],
      answer: 1,
      explanation: md`$K_t = K_e$ in consistent SI units: the same conductors in the same field create both torque and back-EMF. The motor constant $K_m$ is unchanged by rewinding; you only move along the torque vs speed trade.`,
      concepts: ["aw07.torque-constant"],
      difficulty: 2,
    },
    {
      id: "aw07-l01-q4",
      type: "multi",
      prompt: "Which are characteristic of a harmonic (strain wave) drive? (Select all that apply.)",
      options: [
        "High ratio (around 30:1 to 160:1) in a single stage",
        "Near-zero backlash",
        "Perfectly rigid, with no torsional compliance",
        "Efficiency that depends on load, speed and temperature",
        "A flexspline that is a fatigue-limited part",
      ],
      answer: [0, 1, 3, 4],
      explanation: md`Harmonic drives are compact, high-ratio and nearly backlash-free because many teeth engage at once, but the flexspline is elastic (compliance and hysteresis) and fatigue-limited, and efficiency drops at low load and low temperature.`,
      concepts: ["aw07.harmonic-drive"],
      difficulty: 1,
    },
    {
      id: "aw07-l01-q5",
      type: "numeric",
      prompt: md`Winding-to-ambient thermal resistance 1.6 K/W, allowed rise 96 K, $R = 0.3\ \Omega$, $K_t = 0.1$ N m/A, gear ratio 60 with efficiency 0.8. Continuous output torque in N m (1 decimal)?`,
      answer: 67.9,
      tolerance: { abs: 0.3 },
      unit: "N m",
      explanation: md`Allowed loss $96/1.6 = 60$ W; $i = \sqrt{60/0.3} = 14.14$ A; $\tau_m = 1.414$ N m; output $1.414\times60\times0.8 = 67.9$ N m.`,
      concepts: ["aw07.thermal-limit", "aw07.gear-reduction"],
      difficulty: 2,
    },
    {
      id: "aw07-l01-q6",
      type: "decision",
      prompt: md`A humanoid customer's gearbox supplier changes the flexspline material. The customer wants to rerun only the endurance test to save rig time. What do you recommend?`,
      options: [
        { text: "Agree: material only matters for fatigue life.", score: 0.2, feedback: "Material changes stiffness, hysteresis and possibly efficiency, which move the resonance and the control tuning." },
        { text: "Rerun stiffness, hysteresis, efficiency, frequency response and thermal duty as well as endurance; keep motor-only tests.", score: 1, feedback: "Right: the change touches every test whose result depends on the gearbox, but not motor-only characterisation." },
        { text: "Rerun the full characterisation including winding resistance and back-EMF.", score: 0.5, feedback: "Safe but wasteful: motor-only tests are unaffected. This is the over-testing Ripple exists to avoid." },
      ],
      explanation: md`Change impact follows the physics: list what the changed part influences (stiffness, hysteresis, efficiency, life, hence resonance and thermal behaviour) and rerun those tests. That is the reasoning Ripple encodes.`,
      concepts: ["aw07.harmonic-drive", "aw07.backlash-compliance"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw07-l01-f1", front: "Motor torque and back-EMF equations", back: md`$\tau = K_t i$, $e = K_e\omega$, and $K_t = K_e$ in SI units.`, concepts: ["aw07.torque-constant"] },
    { id: "aw07-l01-f2", front: "Steady-state voltage a drive must supply", back: md`$V = R\,i + K_e\omega$; when it exceeds the bus, torque collapses (voltage limit).`, concepts: ["aw07.torque-constant"] },
    { id: "aw07-l01-f3", front: "Reflected inertia through a gear ratio N", back: md`$N^2 J_m$: a 100:1 gearbox makes the rotor look 10,000 times heavier at the joint.`, concepts: ["aw07.gear-reduction"] },
    { id: "aw07-l01-f4", front: "Motor constant Km", back: md`$K_m = K_t/\sqrt{R}$ (N m/√W): torque per root watt of copper loss, independent of winding choice.`, concepts: ["aw07.thermal-limit"] },
    { id: "aw07-l01-f5", front: "Backlash vs compliance", back: "Backlash: free play at torque reversal. Compliance: elastic twist under load (tau = k theta). Different tests, different fixes.", concepts: ["aw07.backlash-compliance"] },
    { id: "aw07-l01-f6", front: "Why torque density claims need context", back: "Peak or continuous, duration, ambient, cooling and mounting. Without them the number is not comparable.", concepts: ["aw07.thermal-limit"] },
    { id: "aw07-l01-f7", front: "Quasi-direct-drive", back: "Large motor with a low ratio (about 6:1 to 10:1): low reflected inertia, back-drivable, good for force control and impacts; heavier per unit torque.", concepts: ["aw07.gear-reduction"] },
  ],
};

export default lesson;
