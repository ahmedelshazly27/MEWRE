import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw07-l02",
  title: "Control loops: PID, cascaded current, velocity and position loops, bandwidth and stability margins",
  summary:
    "How a joint follows a command: the PID law, why servo drives nest a fast current loop inside a velocity loop inside a position loop, how to tune each one from the physics (a worked velocity-loop tuning with numbers), and what bandwidth, phase margin and delay margin mean in plain terms. Ends with why a firmware change that adds one millisecond can turn a well-damped joint into an oscillating one, and which tests must catch it.",
  minutes: 85,
  objectives: [
    "You can write the PID law, explain what each term does and name the practical additions (derivative filter, anti-windup, feedforward).",
    "You can explain the cascade of current, velocity and position loops and why each outer loop is several times slower than the inner one.",
    "You can tune a current PI and a velocity PI from motor and inertia parameters to a target crossover and phase margin.",
    "You can explain bandwidth, phase margin, gain margin and delay margin in plain language and compute how much a latency increase erodes phase margin.",
    "You can specify which control tests must rerun after firmware, parameter or mechanical changes.",
  ],
  concepts: [
    { id: "aw07.pid", name: "PID control", description: "Control law u = Kp e + Ki integral(e) + Kd de/dt: proportional reacts to present error, integral removes steady-state error, derivative adds damping; in practice with a filtered derivative, anti-windup and feedforward.", competency: "aw-physical-ai", related: ["aw07.cascaded-loops"] },
    { id: "aw07.cascaded-loops", name: "Cascaded current, velocity and position loops", description: "Servo structure with a fast inner current (torque) loop, a velocity loop around it and a position loop outside, each outer loop several times slower so it sees the inner loop as nearly ideal.", competency: "aw-physical-ai", related: ["aw07.pid", "aw07.bandwidth", "aw07.torque-constant"] },
    { id: "aw07.bandwidth", name: "Bandwidth and crossover frequency", description: "The frequency up to which a loop follows commands and rejects disturbances; for an open loop it is set by the crossover frequency where loop gain equals one.", competency: "aw-physical-ai", related: ["aw07.stability-margins", "aw07.backlash-compliance"] },
    { id: "aw07.stability-margins", name: "Phase, gain and delay margin", description: "How far a loop is from oscillating: extra phase lag (phase margin) or gain (gain margin) it can absorb at crossover; delay margin = phase margin in radians divided by crossover in rad/s.", competency: "aw-physical-ai", related: ["aw07.bandwidth"] },
    { id: "aw07.feedforward", name: "Feedforward and following error", description: "Adding the known required velocity or torque directly to the command so the feedback loop corrects only the residual; without it a P position loop lags by speed divided by loop gain.", competency: "aw-physical-ai", related: ["aw07.cascaded-loops"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Feedback, the PID law and the servo cascade",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Control parameters and control firmware are among the most frequent changes on a robotics test bench, and among the most dangerous: a new filter, a different loop rate, an added logging call or a re-tuned gain can make a joint ring, overshoot or go unstable. Ripple's core promise is to say which tests to rerun after such a change and why. You will only sell that credibly if you can explain, on a whiteboard, why one extra millisecond of latency matters and which tests reveal it.`,
        },
        {
          kind: "md",
          md: md`### Why feedback

Open-loop control (apply the current you computed and hope) fails because the plant is uncertain: friction varies, loads change, $K_t$ drifts with temperature. Feedback measures the output, compares it with the command and corrects the difference, the **error** $e = r - y$. The most widely used law is PID:`,
        },
        { kind: "equation", formula: "aw07-pid" },
        {
          kind: "md",
          md: md`- **P** reacts to the present error. More $K_p$ means a faster, stiffer response, until it rings.
- **I** accumulates past error, so it keeps pushing until the error is zero: it removes steady-state error caused by gravity, friction or a constant load. Too much makes slow oscillation and overshoot.
- **D** reacts to the rate of change of error: it brakes before the target and adds damping. It amplifies sensor noise, so it is always low-pass filtered.

Practical additions you will see in every real drive: a **derivative filter**; **anti-windup** (stop integrating while the output is saturated, otherwise the integrator charges up during a current limit and causes a large overshoot afterwards); **setpoint weighting**; and **feedforward** (add the torque or velocity you already know the motion requires, so feedback only corrects the residual). Controllers run in discrete time at a fixed rate; every sample period and every filter adds **delay**.

### The cascade in a servo drive

A robot joint is almost never one PID. It is three nested loops:

| Loop | Measures | Commands | Typical rate | Typical bandwidth (order of magnitude) |
|---|---|---|---|---|
| Current (torque) | phase currents | inverter voltage | 10 to 40 kHz | 1 to 3 kHz |
| Velocity | encoder speed | current (torque) setpoint | 4 to 20 kHz | 100 to 300 Hz |
| Position | encoder angle | velocity setpoint | 1 to 10 kHz | 10 to 50 Hz |

Ranges are typical for industrial and robot servo drives, not a specific product. The rule: **each outer loop is around 5 to 10 times slower than the loop inside it**, so it sees the inner loop as an almost ideal actuator. The current loop makes the motor a torque source; the velocity loop turns torque into speed through inertia; the position loop turns speed into angle. Legged robots and learned policies often skip the outer loops on the robot computer and send **torque or impedance commands** ($\tau = K_p(q_d - q) + K_d(\dot q_d - \dot q) + \tau_{ff}$) at a few hundred hertz to 1 kHz, but the current loop always remains inside the drive.

### Tuning from the physics

**Current loop.** The winding is $1/(Ls + R)$. A PI whose zero cancels the electrical pole gives an open loop of $\omega_c/s$, a clean first-order response with crossover $\omega_c$:`,
        },
        { kind: "equation", formula: "aw07-current-pi" },
        {
          kind: "md",
          md: md`**Velocity loop.** With an ideal current loop the plant from current to speed is $K_t/(Js)$, where $J$ is the total inertia at the motor ($J_m + J_L/N^2$). A PI with gain $K_p$ and integral time $T_i$ gives crossover where loop gain is one:`,
        },
        { kind: "equation", formula: "aw07-velocity-pi" },
        {
          kind: "md",
          md: md`Choosing $T_i = 4/\omega_c$ puts the PI zero a factor four below crossover; the integrator plant and the PI integrator contribute $-180°$ and the zero gives back $\arctan(\omega_c T_i) = \arctan 4 = 76°$ of phase.

**Position loop.** With the velocity loop much faster, the plant is an integrator and a proportional gain $K_{pp}$ (in (rad/s)/rad) gives crossover $\omega_{cp} = K_{pp}$. A ramp command then lags by the **following error** $e = \dot q/K_{pp}$, which is why velocity feedforward is standard.

**Ziegler-Nichols and autotune.** The classical empirical method raises P until sustained oscillation, notes the ultimate gain and period and derives PID gains from a table. It gives aggressive, lightly damped tuning and is a starting point at best. Drive vendors' autotune routines inject a test signal, identify inertia and sometimes resonances, and set gains plus notch filters. Either way the result must be verified by measurement.

### Bandwidth and stability margins in plain terms

- **Bandwidth** (or crossover frequency $\omega_c$): roughly, how fast the loop can follow and how fast a disturbance is corrected. A 100 Hz velocity loop corrects a torque disturbance in a few milliseconds.
- **Phase margin (PM)**: at crossover, how much extra phase lag the loop could absorb before it oscillates. Rule of thumb: 45 to 60° or more gives a well-damped response; near 30° you see clear overshoot and ringing; 0° is the stability boundary. A useful approximation for well-behaved loops is damping ratio $\zeta \approx PM/100$ (PM in degrees).
- **Gain margin (GM)**: how much the gain could rise (for example because inertia is lower than assumed, or $K_t$ higher) before instability. 6 dB or more is the usual target.
- **Delay margin**: the phase margin converted to time. A pure delay $T_d$ adds phase lag $\omega T_d$ at frequency $\omega$ without changing gain, so:`,
        },
        { kind: "equation", formula: "aw07-delay-phase" },
        {
          kind: "md",
          md: md`Delay is the quiet killer: a new filter, a slower loop rate, a bus with more nodes, a logging call in the control thread. None of them change any "gain" in the parameter file, yet all of them eat phase margin. **Mechanical resonance** is the other ceiling: from lesson 1, the 100:1 knee has a resonance near 49 Hz, so its output-side position loop must stay well below that, and a gearbox change that lowers stiffness can push a previously stable tuning into oscillation.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "Step response of a second-order loop at three damping ratios",
          xKey: "t",
          xLabel: "Time (ms)",
          yLabel: "Position (fraction of step)",
          series: [
            { key: "z02", label: "zeta 0.2 (PM about 20°)" },
            { key: "z07", label: "zeta 0.7 (PM about 65°)" },
            { key: "z10", label: "zeta 1.0 (critically damped)" },
          ],
          data: [
            { t: 0, z02: 0, z07: 0, z10: 0 },
            { t: 10, z02: 0.047, z07: 0.043, z10: 0.04 },
            { t: 20, z02: 0.176, z07: 0.146, z10: 0.131 },
            { t: 30, z02: 0.366, z07: 0.28, z10: 0.243 },
            { t: 40, z02: 0.591, z07: 0.423, z10: 0.358 },
            { t: 50, z02: 0.828, z07: 0.561, z10: 0.466 },
            { t: 60, z02: 1.052, z07: 0.685, z10: 0.562 },
            { t: 80, z02: 1.393, z07: 0.874, z10: 0.715 },
            { t: 100, z02: 1.526, z07: 0.984, z10: 0.821 },
            { t: 120, z02: 1.451, z07: 1.034, z10: 0.89 },
            { t: 150, z02: 1.116, z07: 1.044, z10: 0.949 },
            { t: 200, z02: 0.725, z07: 1.014, z10: 0.986 },
            { t: 250, z02: 0.925, z07: 0.999, z10: 0.997 },
          ],
          caption: "Closed loop with natural frequency 5 Hz. Overshoot is 53 % at zeta 0.2, 4.6 % at zeta 0.7, none at 1.0. A step test logged at loop rate is the cheapest way to see a lost phase margin.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Tuning the knee: current, velocity and position loops with numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Velocity-loop PI for the lesson 1 knee, with phase and delay margins",
          given: md`Illustrative knee actuator from lesson 1: $K_t = 0.12$ N m/A, $J_m = 1.5\times10^{-4}$ kg m², $N = 100$, $J_L = 0.25$ kg m². Current loop assumed ideal (its 2 kHz bandwidth is 20 times faster). Target velocity crossover 100 Hz, PI zero at $\omega_c/4$. Total effective loop delay (sampling at 8 kHz, encoder filtering, current-loop lag) estimated at 250 µs.`,
          steps: [
            { md: md`**Inertia at the motor.** $J = J_m + J_L/N^2 = 1.5\times10^{-4} + 0.25/10^4 = 1.75\times10^{-4}$ kg m². The load is only 14 % of what the motor feels: a high ratio makes the motor-side loop easy and insensitive to load changes.` },
            { md: md`**Crossover.** $\omega_c = 2\pi\times100 = 628.3$ rad/s. $T_i = 4/\omega_c = 6.37$ ms.` },
            { md: md`**Gain.** At crossover the PI magnitude is $K_p\sqrt{1 + 1/(\omega_cT_i)^2} = 1.031\,K_p$. Setting loop gain to one: $K_p = J\omega_c/(1.031\,K_t) = 1.75\times10^{-4}\times628.3/(1.031\times0.12) = 0.889$ A per rad/s. $K_i = K_p/T_i = 139.6$ A/rad.` },
            { md: md`**Phase margin without delay.** $PM_0 = \arctan(\omega_cT_i) = \arctan 4 = 76.0°$.` },
            { md: md`**Delay cost.** $\Delta\varphi = \omega_cT_d = 628.3\times250\times10^{-6} = 0.157$ rad $= 9.0°$. $PM = 76.0 - 9.0 = 67.0°$: well damped.` },
            { md: md`**Delay margin.** $T_{dm} = PM/\omega_c = (67.0\times\pi/180)/628.3 = 1.86$ ms. The loop tolerates about 1.9 ms more delay before it oscillates.` },
            { md: md`**What a 1 ms firmware addition does.** Extra lag at crossover $= 628.3\times0.001 = 0.628$ rad $= 36°$. PM falls to **31°**: damping ratio about 0.3, overshoot in the range of 35 to 40 %, audible ringing on the rig. No gain changed.` },
            { md: md`**Position loop.** Output-side crossover 10 Hz (a factor five below the 49 Hz resonance, a factor ten below the velocity loop): $K_{pp} = 2\pi\times10 = 62.8$ (rad/s)/rad. At 4 rad/s output speed the following error without feedforward is $4/62.8 = 0.064$ rad $= 3.6°$, about 25 mm at the end of a 0.4 m shank: unacceptable for foot placement, so velocity feedforward is added and the residual error is then set by model accuracy.` },
          ],
          result: md`Velocity PI: $K_p = 0.889$ A/(rad/s), $K_i = 139.6$ A/rad, crossover 100 Hz, phase margin 67°, delay margin 1.9 ms. Position P: 62.8 (rad/s)/rad with velocity feedforward. The parameter file is not the whole controller: the loop's real margin depends on delay and resonance, which change with firmware and hardware even when the gains do not.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Current-loop PI by pole-zero cancellation",
          given: md`Same motor: terminal resistance $R = 0.25\ \Omega$, inductance $L = 0.40$ mH. Target current-loop crossover 2 kHz.`,
          steps: [
            { md: md`$\omega_c = 2\pi\times2000 = 12{,}566$ rad/s.` },
            { md: md`$K_p = L\,\omega_c = 0.40\times10^{-3}\times12{,}566$.` },
            { md: md`$K_p = 5.03$ V/A.`, hidden: true, check: { prompt: "Proportional gain Kp (V/A)", answer: 5.03, unit: "V/A", tolerance: { abs: 0.03 } } },
            { md: md`$K_i = R\,\omega_c = 0.25\times12{,}566$.` },
            { md: md`$K_i = 3{,}142$ V/(A s).`, hidden: true, check: { prompt: "Integral gain Ki (V per A s)", answer: 3142, unit: "V/(A s)", tolerance: { rel: 0.01 } } },
            { md: md`The PI zero at $K_i/K_p = R/L = 625$ rad/s cancels the winding's electrical pole, so the open loop is $\omega_c/s$. As $R$ rises about 0.39 % per kelvin, the cancellation drifts: a hot motor behaves slightly differently, one more reason to test hot.` },
          ],
          result: md`$K_p = 5.03$ V/A, $K_i = 3{,}142$ V/(A s). Most drives compute exactly this from the motor parameters you enter, which is why a wrong inductance in a motor parameter file degrades the whole cascade.`,
        },
        {
          kind: "question",
          question: {
            id: "aw07-l02-p1",
            type: "numeric",
            prompt: md`A velocity loop has 100 Hz crossover and 60° phase margin. A firmware update moves the loop from 8 kHz to 4 kHz, adding about 125 µs of effective delay. What is the new phase margin, in degrees (1 decimal)?`,
            answer: 55.5,
            tolerance: { abs: 0.2 },
            unit: "°",
            explanation: md`Extra lag $= \omega_cT_d = 2\pi\times100\times125\times10^{-6} = 0.0785$ rad $= 4.5°$. New PM $= 60 - 4.5 = 55.5°$. Small, but the same update often also changes filters; add up all the delay before signing off.`,
            concepts: ["aw07.stability-margins"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Tuning and verifying loops on real benches, and what must rerun after a change",
      blocks: [
        {
          kind: "md",
          md: md`### How it is done

Control engineers tune on a rig first (actuator dyno or a fixtured robot leg), then on the robot. Tools: the drive vendor's tuning software (autotune, scope, Bode measurement), MATLAB/Simulink or Python for modelling, and high-rate logging of command, feedback and controller internals. The verification set is standard:

- **Step tests** on each loop (current, velocity, position): rise time, overshoot, settling.
- **Frequency response**: inject a chirp or multisine into the loop, measure the open-loop or closed-loop transfer function, read crossover, phase margin, gain margin and resonances directly.
- **Disturbance rejection**: apply a load torque step with the dyno and measure the speed dip and recovery.
- **Tracking tests**: realistic trajectories, following error with and without feedforward.
- **Saturation behaviour**: commands that hit current limits, to verify anti-windup.

The output is a **tuning record**: parameters, the conditions they were tuned at (temperature, load, firmware version, mechanical revision), measured margins and the plots. In mature teams it is versioned with the firmware.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- **Gains in a parameter file that nobody versions.** The robot behaves differently and nobody can say which parameters changed when.
- **Tuned on the bench, run on the robot.** Different inertia, different compliance (the leg structure adds its own resonances), different cable lengths and noise.
- **Delay added outside the control code.** A new logging task, a middleware upgrade or more devices on the real-time bus. Nothing in the controller diff shows it.
- **Margins measured once.** Temperature, wear and payload change them; tests at one condition overstate robustness.
- **Notch filters as patches.** A notch hides a resonance at one frequency; a stiffness change moves the resonance out of the notch.`,
        },
        {
          kind: "matrix",
          title: "Which control tests a change should trigger (Ripple's reasoning)",
          xAxis: ["Changes delay or gains only", "Changes the plant (mechanics)"],
          yAxis: ["Local to one loop", "Affects the whole cascade"],
          cells: [
            { label: "Rerun that loop's step and frequency response", detail: "Example: velocity filter change, or new velocity-loop gains" },
            { label: "Rerun frequency response, resonance and tracking for that joint", detail: "Example: new encoder mounting, new gearbox lot" },
            { label: "Rerun all loops' frequency response and tracking", detail: "Example: loop rate change, RTOS or bus timing change, current-loop parameter change" },
            { label: "Full re-tune and requalification", detail: "Example: new gearbox supplier, new motor, new leg structure" },
          ],
          caption: "Top-left is cheap and frequent; bottom-right is expensive and rare. The value of change-impact analysis is not running bottom-right for a top-left change, and never running top-left for a bottom-right one.",
        },
        { kind: "widget", widget: "change-impact", caption: "Pick a firmware, model or rig change and see which tests the impact score selects and the rig hours saved." },
        {
          kind: "ask",
          title: "Questions to ask a controls lead",
          items: [
            "Where do your gains and filter settings live, and are they versioned together with the firmware?",
            "Do you measure phase margin after every firmware release, or only step responses?",
            "What is your loop delay budget, and who notices when a change eats into it?",
            "Which change last made a joint oscillate on the robot when the bench looked fine?",
          ],
        },
        { kind: "scenario", scenario: "aw07-s1" },
        {
          kind: "question",
          question: {
            id: "aw07-l02-p2",
            type: "short",
            prompt: md`Write the first version of a **Ripple rule set for joint control changes** for a humanoid customer: a table of at least five change types (rows) and the tests each must trigger (columns: tests, rigs, pass criteria), plus one sentence for each rule explaining the physical reason. Use illustrative pass criteria labelled as such.`,
            rubric: [
              "At least five distinct change types including a gain change, a delay or loop-rate change, a filter change, a mechanical change (gearbox, encoder mounting) and a motor parameter change",
              "Each rule names concrete tests (step response, frequency response or margin measurement, disturbance rejection, tracking, saturation) on the right rig",
              "Each rule has a physical justification (delay erodes phase margin, stiffness moves resonance, wrong L or R breaks current-loop cancellation)",
              "Pass criteria are measurable (for example phase margin at least 45°, overshoot below 10 %) and labelled illustrative",
              "Avoids both extremes: does not trigger full requalification for local changes and does not skip tests for mechanical changes",
            ],
            modelAnswer: md`**Joint control change rules v0 (illustrative criteria)**

| Change | Tests | Rig | Pass |
|---|---|---|---|
| Velocity or position gains | step + frequency response of that loop, tracking on 3 gait trajectories | joint dyno | PM at least 45°, GM at least 6 dB, overshoot below 10 % |
| Loop rate, RTOS, fieldbus or logging change | frequency response of all three loops, tracking | joint dyno, then leg rig | PM loss below 5° vs baseline |
| Filter or notch change | frequency response of the affected loop, resonance sweep | joint dyno | PM at least 45°, resonance gain below -6 dB |
| Gearbox lot or supplier, encoder mounting | stiffness, resonance sweep, all loops' frequency response, tracking, disturbance rejection | joint dyno and leg rig | resonance within ±10 % of baseline, margins as above |
| Motor parameter file (R, L, Kt) | current-loop step and frequency response, then velocity loop | joint dyno | current-loop bandwidth within ±10 % of target |

Reasons: gains change crossover and margins only in their own loop; delay adds phase lag $\omega T_d$ in every loop, worst in the fastest; filters add lag and move effective crossover; mechanical changes move the plant's resonance, which no parameter diff shows; a wrong R or L breaks the current PI's pole-zero cancellation and degrades the whole cascade.`,
            explanation: md`The test of a good rule set is that each trigger follows from the mechanism, and that the cost of testing scales with the reach of the change.`,
            concepts: ["aw07.stability-margins", "aw07.cascaded-loops"],
            difficulty: 3,
          },
        },
        { kind: "sources", refs: ["aw07-r18"] },
        {
          kind: "feynman",
          prompt: "Explain phase margin and delay margin to a test manager who has never studied control theory, using the example of a firmware update that added one millisecond.",
          keyPoints: [
            "A feedback loop corrects errors after a delay; if the correction arrives too late it pushes the wrong way and amplifies the motion",
            "Phase margin is how much extra lateness the loop can tolerate at its working speed before that happens",
            "Delay margin is the same margin in milliseconds: phase margin divided by crossover frequency",
            "The update added delay without changing any gain, so a parameter diff looks harmless",
            "Frequency-response or step tests at loop rate reveal the lost margin; these are the tests to rerun",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw07-l02-q1",
      type: "mcq",
      prompt: "In a PID controller, which term removes the steady-state error caused by a constant load such as gravity?",
      options: ["Proportional", "Integral", "Derivative", "Feedforward only"],
      answer: 1,
      explanation: md`The integral keeps accumulating while any error remains, so at steady state it supplies exactly the torque needed against the constant load. Feedforward can do it too if the load is known, but the feedback term that guarantees it is I.`,
      concepts: ["aw07.pid"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw07-l02-q2",
      type: "order",
      prompt: "Order the loops of a servo cascade from fastest (innermost) to slowest (outermost).",
      items: ["Current (torque) loop", "Velocity loop", "Position loop", "Task or trajectory planner"],
      explanation: md`Typical bandwidths: current 1 to 3 kHz, velocity 100 to 300 Hz, position 10 to 50 Hz, planning at tens of hertz or slower. Each outer loop treats the inner one as nearly ideal.`,
      concepts: ["aw07.cascaded-loops"],
      difficulty: 1,
    },
    {
      id: "aw07-l02-q3",
      type: "numeric",
      prompt: md`A loop has 50 Hz crossover and 50° phase margin. What is its delay margin in ms (2 decimals)?`,
      answer: 2.78,
      tolerance: { abs: 0.02 },
      unit: "ms",
      explanation: md`$PM = 50° = 0.8727$ rad; $\omega_c = 2\pi\times50 = 314.2$ rad/s; delay margin $= 0.8727/314.2 = 2.78$ ms.`,
      concepts: ["aw07.stability-margins"],
      difficulty: 2,
    },
    {
      id: "aw07-l02-q4",
      type: "numeric",
      prompt: md`A position loop has proportional gain $K_{pp} = 40$ (rad/s)/rad and no feedforward. The joint moves at a constant 2 rad/s. What is the following error in degrees (1 decimal)?`,
      answer: 2.9,
      tolerance: { abs: 0.1 },
      unit: "°",
      explanation: md`$e = \dot q/K_{pp} = 2/40 = 0.05$ rad $= 2.9°$. Velocity feedforward removes most of it.`,
      concepts: ["aw07.feedforward"],
      difficulty: 1,
    },
    {
      id: "aw07-l02-q5",
      type: "multi",
      prompt: "Which changes can reduce a loop's phase margin even though no controller gain was changed? (Select all that apply.)",
      options: [
        "Lowering the loop sample rate",
        "Adding a low-pass filter on the encoder velocity",
        "A gearbox with lower torsional stiffness",
        "A logging task added to the real-time control thread",
        "Renaming a parameter in the configuration file",
      ],
      answer: [0, 1, 2, 3],
      explanation: md`Sample rate, filters and extra computation add delay (phase lag $\omega T_d$); lower stiffness moves the resonance closer to crossover. A rename changes nothing physical.`,
      concepts: ["aw07.stability-margins", "aw07.bandwidth"],
      difficulty: 2,
    },
    {
      id: "aw07-l02-q6",
      type: "decision",
      prompt: md`After a firmware release a humanoid's ankle shows a faint 30 Hz ringing on the robot, but bench step tests passed. The release changed only "logging infrastructure". What do you advise the test lead?`,
      options: [
        { text: "Ship: bench tests passed and the change did not touch control code.", score: 0, feedback: "Logging in the control thread adds delay; ringing on the robot is the symptom of lost margin." },
        { text: "Measure loop delay and the ankle's frequency response on the old and new firmware, on the robot or leg rig, and compare phase margins.", score: 1, feedback: "Right: quantify the delay and the margin directly, under the real mechanical plant, and tie the result to the change." },
        { text: "Add a notch filter at 30 Hz and move on.", score: 0.2, feedback: "A notch hides the symptom, adds its own lag and does not explain the cause." },
      ],
      explanation: md`The bench and the robot differ in mechanics and the change affected timing, not gains. Frequency response before and after is the decisive evidence.`,
      concepts: ["aw07.stability-margins", "aw07.cascaded-loops"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw07-l02-f1", front: "PID law", back: md`$u = K_pe + K_i\int e\,dt + K_d\,\dot e$, with filtered D, anti-windup and usually feedforward.`, concepts: ["aw07.pid"] },
    { id: "aw07-l02-f2", front: "Cascade rule of thumb", back: "Each outer loop about 5 to 10 times slower than the loop inside it (current kHz, velocity hundreds of Hz, position tens of Hz).", concepts: ["aw07.cascaded-loops"] },
    { id: "aw07-l02-f3", front: "Current-loop PI by cancellation", back: md`$K_p = L\omega_c$, $K_i = R\omega_c$ gives open loop $\omega_c/s$.`, concepts: ["aw07.cascaded-loops"] },
    { id: "aw07-l02-f4", front: "Phase lag from a pure delay", back: md`$\Delta\varphi = \omega T_d$ (rad). 1 ms at 100 Hz crossover costs 36°.`, concepts: ["aw07.stability-margins"] },
    { id: "aw07-l02-f5", front: "Delay margin", back: md`$T_{dm} = PM/\omega_c$ (PM in rad, crossover in rad/s).`, concepts: ["aw07.stability-margins"] },
    { id: "aw07-l02-f6", front: "Phase margin targets", back: "45 to 60° or more: well damped. About 30°: visible overshoot and ringing. 0°: oscillation. Gain margin at least 6 dB.", concepts: ["aw07.stability-margins"] },
    { id: "aw07-l02-f7", front: "Following error of a P position loop", back: md`$e = \dot q/K_{pp}$; removed mostly by velocity feedforward.`, concepts: ["aw07.feedforward"] },
  ],
  scenarios: [
    {
      id: "aw07-s1",
      title: "The firmware update that only touched logging",
      dayInLife: true,
      context: md`You are on a discovery call with the validation lead of a humanoid company (illustrative). Last month a firmware release "only changed logging". Two weeks later the ankle joints started ringing during fast walking on the robot. They spent nine days and full regression on three rigs to find it. He asks whether Ripple would have caught it.`,
      start: "a",
      concepts: ["aw07.stability-margins", "aw07.cascaded-loops"],
      nodes: {
        a: {
          md: md`How do you answer first?`,
          choices: [
            { text: "\"Yes, Ripple would have caught it.\"", score: 2, feedback: "An unqualified promise you cannot back. Ripple can only be as good as the dependencies and evidence it has.", next: "b" },
            { text: "\"Let's reconstruct it. Did the logging run in the real-time control thread, and did anyone measure loop timing before and after?\"", score: 9, feedback: "You go to the mechanism: logging can add delay, delay erodes phase margin. You learn how their evidence is structured.", next: "b" },
            { text: "\"That sounds like a firmware quality issue, not a test issue.\"", score: 1, feedback: "It is exactly a test-selection issue: the right test (frequency response) was not triggered by a change that looked harmless.", next: "c" },
          ],
        },
        b: {
          md: md`He says the logging did run in the control task and loop jitter was never measured as a test. Step tests on the bench passed. What do you propose?`,
          choices: [
            { text: "Propose a pilot where Lockstep captures loop timing and controller signals on one clock with the rig DAQ, and Ripple's first rule is: any change touching the real-time task triggers frequency response on the joints with the smallest delay margin.", score: 10, feedback: "Concrete, mechanism-based, and it uses their own incident as the success criterion for the pilot.", next: "d" },
            { text: "Suggest they rerun full regression after every release to be safe.", score: 3, feedback: "That is what they already do after incidents, and it costs nine days. Over-testing is the pain you sell against.", next: "d" },
          ],
        },
        c: {
          md: md`He disagrees and the call cools. He mentions they already have test automation.`,
          choices: [
            { text: "Recover: ask which test would have revealed the ringing and why it was not run.", score: 5, feedback: "Partial recovery: you return to the mechanism, but you lost the opening." },
          ],
        },
        d: {
          md: md`He asks how you would prove the rule is right, not just plausible.`,
          choices: [
            { text: "Back-test on their history: replay the last 20 releases, see which ones Ripple would have flagged and compare with what actually broke; measure rig hours saved and regressions missed.", score: 10, feedback: "Historical back-testing gives a measurable, buyer-owned success criterion: the basis of a pilot that converts." },
            { text: "Show a demo on synthetic data.", score: 4, feedback: "Useful to explain, not to prove. Their own history is the evidence that matters to them." },
          ],
        },
      },
    },
  ],
};

export default lesson;
