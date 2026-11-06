import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw06-l02",
  title: "RTOS and control loops in firmware",
  summary:
    "How firmware decides what runs when: super-loops, interrupts and real-time operating systems, priorities and rate-monotonic scheduling, priority inversion, jitter and why fixed-step control loops care about it. Then field-oriented control of a permanent-magnet motor at the level a CEO needs: the Clarke and Park transforms, the torque equation, the loop hierarchy and the delay arithmetic.",
  minutes: 85,
  objectives: [
    "Explain tasks, priorities, preemption and why rate-monotonic priority assignment is the default for periodic control tasks",
    "Check a task set against the Liu and Layland bound and, when the bound fails, with response-time analysis",
    "Explain jitter and loop delay and compute the phase lag a delay costs at a given loop bandwidth",
    "Describe field-oriented control: what the Clarke and Park transforms do, why torque follows the q-axis current, and the nested current, speed and position loops",
    "Compute electrical frequency, angle advance per sample and torque for a permanent-magnet synchronous motor",
  ],
  concepts: [
    { id: "aw06.rtos-scheduling", name: "RTOS scheduling and priorities", description: "An RTOS runs tasks by fixed priority with preemption; for periodic tasks, giving shorter periods higher priority (rate-monotonic) is optimal among fixed-priority schemes, and schedulability is checked with the utilisation bound or response-time analysis.", competency: "aw-physical-ai", related: ["aw06.cycle-budget", "aw06.jitter"] },
    { id: "aw06.jitter", name: "Jitter and loop delay", description: "Jitter is the variation in when a periodic task starts or finishes; delay is the time from sampling to actuation. Both erode a control loop's phase margin, so loop timing is a physical property of the product, not only a software one.", competency: "aw-physical-ai", related: ["aw06.interrupts", "aw06.fixed-step-control"] },
    { id: "aw06.fixed-step-control", name: "Fixed-step discrete control", description: "Firmware control loops run at a fixed sample time; controller gains are designed for that sample time, so changing the loop rate or adding delay changes the closed-loop behaviour even if the code is identical.", competency: "aw-physical-ai", related: ["aw06.jitter", "aw06.foc"] },
    { id: "aw06.foc", name: "Field-oriented control (FOC)", description: "Motor-drive control that transforms the three phase currents into a rotor-fixed d-q frame (Clarke then Park), regulates the d and q currents with PI controllers, and so controls torque directly through the q-axis current.", competency: "aw-physical-ai", related: ["aw06.fixed-step-control", "aw06.cycle-budget"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Scheduling, jitter and field-oriented control",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Drive units, inverters and robot joints are Afterwave's core targets, and both cofounders come from Tesla drive validation. Their customers' most important firmware is a field-oriented control loop scheduled by an RTOS. If you understand why a change in task priority or loop rate can move torque ripple, step response or fault reaction on the dyno, you can explain Ripple's value in the customer's own terms: "this change touched loop timing, so here are the torque and thermal tests that depend on it".`,
        },
        {
          kind: "md",
          md: md`### Three ways to organise firmware

1. **Super-loop**: one infinite loop calls every function in turn. Simple, but the timing of each function depends on everything else in the loop.
2. **Interrupt-driven (foreground/background)**: time-critical work in ISRs triggered by timers or ADCs; everything else in the background loop. Most small motor drives look like this: the current loop is an ADC-triggered ISR.
3. **Real-time operating system (RTOS)**: work is split into **tasks**, each with a **priority**. The scheduler always runs the highest-priority task that is ready and **preempts** lower ones. Tasks communicate through queues, semaphores and mutexes. Common RTOSes: FreeRTOS, Zephyr, Eclipse ThreadX, SafeRTOS and certified commercial kernels; AUTOSAR Classic OS in automotive ECUs. Larger processors use QNX, VxWorks or Linux with real-time patches.

A typical drive: current loop in the highest-priority ISR (tens of kHz), speed and position loops as high-priority tasks (1 to 10 kHz), communication and diagnostics at medium priority (100 Hz to 1 kHz), logging and housekeeping at low priority.

### Rate-monotonic scheduling

For independent periodic tasks with deadlines equal to periods, giving **higher priority to shorter periods** (rate-monotonic, RM) is optimal among fixed-priority schemes (Liu and Layland, 1973). They proved a sufficient test:`,
        },
        { kind: "equation", formula: "aw06-rm-bound" },
        {
          kind: "chart",
          chart: "line",
          title: "Liu and Layland utilisation bound vs number of tasks",
          xKey: "n",
          xLabel: "Number of periodic tasks n",
          yLabel: "Guaranteed-schedulable utilisation",
          series: [{ key: "bound", label: "n(2^(1/n) - 1)" }],
          data: [
            { n: 1, bound: 1.0 },
            { n: 2, bound: 0.8284 },
            { n: 3, bound: 0.7798 },
            { n: 4, bound: 0.7568 },
            { n: 5, bound: 0.7435 },
            { n: 6, bound: 0.7348 },
            { n: 7, bound: 0.7286 },
            { n: 8, bound: 0.7241 },
          ],
          caption: "The bound falls toward ln 2 = 0.693 as tasks are added. Below it, an RM task set is always schedulable; above it, it may still be, and response-time analysis decides.",
        },
        {
          kind: "md",
          md: md`The bound is **sufficient, not necessary**. When it fails, the exact check is **response-time analysis**: the worst-case response time of task $i$ is its own execution plus all preemptions by higher-priority tasks in that window, found by iterating until the value stops changing.`,
        },
        { kind: "equation", formula: "aw06-response-time" },
        {
          kind: "md",
          md: md`### Priority inversion

If a low-priority task holds a mutex that a high-priority task needs, and a medium-priority task preempts the low one, the high-priority task waits for the medium one: **priority inversion**. The well-known case is the 1997 Mars Pathfinder lander, whose repeated resets were traced to priority inversion on a shared bus and fixed in flight by enabling **priority inheritance** on the mutex (the holder temporarily inherits the waiter's priority). Firmware teams prevent it with priority inheritance or ceiling protocols and by keeping shared sections short.

### Jitter, delay and why the control loop cares

A digital controller is designed for a fixed sample time $T_s$. Two timing imperfections change its behaviour:

- **Delay** $T_d$ between sampling and actuation (about $1.5\,T_s$ in a typical drive, lesson 1). A pure delay adds phase lag that grows with frequency:`,
        },
        { kind: "equation", formula: "aw06-delay-phase" },
        {
          kind: "md",
          md: md`  A current loop with 1.5 kHz bandwidth and 75 µs delay loses $360\times1{,}500\times75\times10^{-6} = 40.5°$ of phase at crossover. That is why current-loop bandwidth is usually limited to roughly a tenth to a twentieth of the switching frequency, and why delay, not CPU speed alone, decides how aggressive gains can be.
- **Jitter**: variation of the actual sampling or update instant around the ideal. Jitter acts like noise on time; it adds torque ripple and, at its worst, instability. Current loops are kept in a hardware-triggered ISR precisely so that jitter is set by the timer, not by the scheduler.

A discrete PI controller in firmware looks like $u[k] = K_p e[k] + K_i T_s \sum_{j\le k} e[j]$. Note $T_s$ inside the integral gain: **change the loop rate and the effective gains change** unless the code rescales them. A "rate-only" change is a control change.

### Field-oriented control of a permanent-magnet motor

A permanent-magnet synchronous motor (PMSM) produces torque from the interaction of the rotor magnet flux $\psi_f$ and the stator current. The three phase currents are sinusoids at the electrical frequency:`,
        },
        { kind: "equation", formula: "aw06-electrical-freq" },
        {
          kind: "md",
          md: md`Controlling three AC currents directly is hard. **Field-oriented control (FOC)** transforms them into two DC quantities in a frame that rotates with the rotor:

1. **Clarke transform**: three phase currents to two orthogonal stationary components $i_\alpha, i_\beta$ (using $i_a + i_b + i_c = 0$, so two current sensors suffice).`,
        },
        { kind: "equation", formula: "aw06-clarke" },
        {
          kind: "md",
          md: md`2. **Park transform**: rotate by the electrical rotor angle $\theta_e$ (from the encoder or resolver, or an observer in sensorless drives) to get $i_d$ (aligned with the magnet flux) and $i_q$ (90° ahead, which makes torque).`,
        },
        { kind: "equation", formula: "aw06-park" },
        {
          kind: "md",
          md: md`3. Two **PI controllers** regulate $i_d$ and $i_q$ to their references. The outputs (voltages $v_d, v_q$) go through the **inverse Park** and **inverse Clarke** (or directly into **space-vector PWM**) to set the three duty cycles.

In steady state $i_d$ and $i_q$ are constants, so simple PI control works without tracking an AC signal. The torque is:`,
        },
        { kind: "equation", formula: "aw06-pmsm-torque" },
        {
          kind: "md",
          md: md`For a surface-mounted magnet motor $L_d = L_q$, so torque is simply $T = \tfrac{3}{2} p \psi_f i_q$: **torque command equals q-axis current command**. Interior-magnet motors add reluctance torque through $(L_d - L_q) i_d i_q$, and at high speed the controller drives $i_d$ negative to weaken the field and stay within the inverter voltage (**field weakening**).

The control is nested, each loop several times slower than the one inside it:

| Loop | Typical rate | Output | Runs as |
|---|---|---|---|
| Current (d and q) | 8 to 40 kHz, often equal to PWM frequency | phase voltages | highest-priority ISR |
| Speed | 1 to 10 kHz | $i_q$ reference (torque) | high-priority task or ISR |
| Position | 0.5 to 5 kHz | speed reference | task, or a separate controller |

The rotor angle used in the Park transform must be the angle **at the moment the new voltage is applied**. With a delay $T_d$ the rotor has moved $\Delta\theta_e = 360°\, f_e\, T_d$; drives compensate by extrapolating the angle. Get it wrong and part of the current lands on the d axis: torque falls by $\cos\Delta\theta_e$ and a cross-coupling term of $\sin\Delta\theta_e$ appears.`,
        },
        {
          kind: "flow",
          title: "Field-oriented control, one current-loop period",
          steps: [
            { label: "Measure", detail: "Phase currents i_a, i_b (ADC), rotor angle (encoder, resolver or observer)." },
            { label: "Clarke", detail: "i_a, i_b to i_alpha, i_beta in the stationary frame." },
            { label: "Park", detail: "Rotate by the electrical angle to i_d, i_q: DC in steady state." },
            { label: "PI d and q", detail: "Compare with references (i_q from the speed loop, i_d zero or negative for field weakening)." },
            { label: "Inverse Park", detail: "v_d, v_q back to the stationary frame, with angle compensated for delay." },
            { label: "SVPWM", detail: "Space-vector modulation sets three duty cycles for the next PWM period." },
          ],
          caption: "Everything in this chain must finish inside one PWM period, with the ADC trigger and PWM update locked to the same timer.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Scheduling and FOC numbers for an actuator",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Is the drive's task set schedulable after adding a logging task?",
          given: md`Illustrative task set on one MCU, rate-monotonic priorities, times in µs. $\tau_1$ current loop: $C = 20$, $T = 50$. $\tau_2$ speed loop: $C = 50$, $T = 500$. $\tau_3$ CAN communication: $C = 200$, $T = 1{,}000$. A new firmware release adds $\tau_4$ high-rate logging: $C = 1{,}000$, $T = 10{,}000$.`,
          steps: [
            { md: md`**Utilisation before:** $0.4 + 0.1 + 0.2 = 0.70$. Bound for $n = 3$: $3(2^{1/3} - 1) = 0.780$. $0.70 \le 0.780$, so schedulable by the bound.` },
            { md: md`**After adding** $\tau_4$: $U = 0.70 + 0.10 = 0.80$. Bound for $n = 4$: $0.757$. **The bound fails.** That does not mean the set fails; run response-time analysis for the lowest-priority task.` },
            { md: md`**Iterate** $R_4 = 1{,}000 + \lceil R/50\rceil 20 + \lceil R/500\rceil 50 + \lceil R/1000\rceil 200$. Start at $R = 1{,}270$ (sum of all $C$): next 2,070, then 2,690, 2,980, 3,100, 3,390, 3,510, 3,620, 3,660, 3,680, and 3,680 again: converged.` },
            { md: md`$R_4 = 3{,}680$ µs, well inside its 10,000 µs deadline. The higher-priority tasks are unaffected by $\tau_4$ by construction (it has the lowest priority). Check $\tau_3$ the same way: $R_3 = 430$ µs, inside 1,000 µs.` },
            { md: md`**But**: the analysis assumes $\tau_4$ shares no mutex with higher tasks. If logging locks the CAN driver that $\tau_3$ also uses, $\tau_3$ can be blocked for up to the length of that lock: a blocking term that must be added, and a priority-inversion risk.` },
          ],
          result: md`The release is schedulable (lowest task responds in 3.7 ms of its 10 ms deadline), but total load rises to 80% and a shared-resource path appears. This is a change that "only adds logging" yet should send the communication, diagnostic-timing and fault-reporting tests back to the rig.`,
        },
        {
          kind: "worked",
          mode: "worked",
          title: "Torque, electrical frequency and delay for a joint motor",
          given: md`Illustrative surface-mount PMSM: $p = 4$ pole pairs, $\psi_f = 0.05$ Wb, operating at 3,000 rpm with $i_q = 20$ A, $i_d = 0$. Current loop at 20 kHz with effective delay 75 µs.`,
          steps: [
            { md: md`**Torque:** $T = 1.5\times4\times0.05\times20 = 6.0$ N·m.` },
            { md: md`**Electrical frequency:** $f_e = 4\times3{,}000/60 = 200$ Hz. The phase currents are 200 Hz sinusoids even though the shaft turns at 50 rev/s.` },
            { md: md`**Samples per electrical cycle:** $20{,}000/200 = 100$; angle advance per sample $= 360°/100 = 3.6°$ electrical.` },
            { md: md`**Angle moved during the delay:** $\Delta\theta_e = 360\times200\times75\times10^{-6} = 5.4°$. Uncompensated, torque falls by $\cos5.4° = 0.9956$ (0.4%) and $\sin5.4° = 0.094$ of the current appears on the wrong axis, coupling d and q loops.` },
            { md: md`**At 12,000 rpm** (field-weakening region of a high-speed motor), $f_e = 800$ Hz and the same delay gives $21.6°$: torque error $1 - \cos21.6° = 7\%$ and strong cross-coupling. Delay compensation is not optional at high speed.` },
          ],
          result: md`Torque follows $i_q$ directly (6 N·m at 20 A). Loop delay that is negligible at low speed becomes a 7% torque error at high electrical frequency. Any firmware change that alters loop delay (rate, ISR length, PWM update timing) must be retested across the speed range, especially at the top end.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Clarke and Park by hand",
          given: md`Measured phase currents at one instant: $i_a = 0$ A, $i_b = 8.66$ A ($i_c = -8.66$ A). Electrical rotor angle $\theta_e = 0°$. Same motor: $p = 4$, $\psi_f = 0.05$ Wb, $L_d = L_q$.`,
          steps: [
            { md: md`Clarke: $i_\alpha = i_a = 0$; $i_\beta = (i_a + 2 i_b)/\sqrt3 = 17.32/1.732$.` },
            { md: md`$i_\beta = 10.0$ A.`, hidden: true, check: { prompt: "i_beta (A)", answer: 10, unit: "A", tolerance: { abs: 0.05 } } },
            { md: md`Park at $\theta_e = 0$: $i_d = i_\alpha\cos0 + i_\beta\sin0 = 0$; $i_q = -i_\alpha\sin0 + i_\beta\cos0 = 10$ A. Torque $= 1.5\times4\times0.05\times i_q$.` },
            { md: md`$T = 3.0$ N·m.`, hidden: true, check: { prompt: "Torque (N·m)", answer: 3, unit: "N·m", tolerance: { abs: 0.02 } } },
          ],
          result: md`All the current is on the q axis, so all of it makes torque: 3 N·m at 10 A. If the angle used in the Park transform were wrong by 10°, the controller would see $i_d \neq 0$ and fight it, and the torque delivered would fall.`,
        },
        {
          kind: "question",
          question: {
            id: "aw06-l02-p1",
            type: "numeric",
            prompt: md`A humanoid knee actuator uses a motor with 10 pole pairs at 1,500 rpm. What is the electrical frequency of its phase currents (Hz)?`,
            answer: 250,
            tolerance: { abs: 0.5 },
            unit: "Hz",
            explanation: md`$f_e = p\,n/60 = 10\times1{,}500/60 = 250$ Hz. High pole-count motors (common in compact actuators) reach high electrical frequencies at modest shaft speeds, which tightens the current-loop timing.`,
            concepts: ["aw06.foc"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Loop timing in real firmware teams",
      blocks: [
        {
          kind: "md",
          md: md`### How it is done

- **Control design** usually starts in MATLAB/Simulink or Python with a motor model; gains are tuned in simulation, then on the dyno. Many drive teams generate the FOC code automatically (Embedded Coder) or use vendor libraries (for example TI, ST and Infineon motor-control SDKs).
- **Timing verification**: GPIO toggles on a scope, RTOS trace tools (Tracealyzer, SystemView), and per-release timing tables (lesson 1).
- **Dyno and rig tests** that are sensitive to loop timing: current step response and bandwidth, torque ripple and torque accuracy maps over speed and temperature, field-weakening stability at top speed, fault reaction time (overcurrent, encoder loss), acoustic noise.
- **Tuning parameters** (PI gains, limits, angle offset, delay compensation) usually live in calibration memory, not in code (lesson 4). That makes them easy to change and easy to lose track of.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Classic loop-timing mistakes",
          md: md`- **Loop rate changed, gains not rescaled**: the integral gain in a discrete PI scales with $T_s$; behaviour changes silently.
- **Priority change to "fix" a starving task**: moves jitter onto another loop.
- **Shared mutex between logging and a control-path driver**: priority inversion under load, seen only in long runs.
- **Encoder angle offset recalibrated without retesting top speed**: fine at low speed, torque error at high electrical frequency.
- **Average timing reported, worst case unknown**: a rare branch overruns the period once an hour.`,
        },
        {
          kind: "checklist",
          title: "Evidence to ask for after a change that touches scheduling or loop rate",
          items: [
            "Updated timing table: per ISR and task, period, measured worst-case execution time, total load",
            "Jitter measurement of the current-loop ISR over a long run (minutes, not one capture)",
            "Current step response and bandwidth before and after",
            "Torque accuracy and ripple across the speed range, including field weakening",
            "Fault reaction times (overcurrent, encoder loss) unchanged",
            "Which calibration dataset (gains, offsets) was used with the new build",
          ],
        },
        { kind: "scenario", scenario: "aw06-s1" },
        {
          kind: "question",
          question: {
            id: "aw06-l02-p2",
            type: "short",
            prompt: md`A (hypothetical) drive-unit design partner is moving its current loop from 16 kHz to 20 kHz and adding delay compensation in the same release. Write the **Lockstep capture and retest request** Afterwave's pilot team would send them: which signals and metadata Lockstep must record, at what rates, and which rig tests should be rerun with a one-line reason each, tied to the physics in this lesson.`,
            rubric: [
              "Requests capture of phase currents, DC-link voltage, rotor angle or speed, torque (from a torque transducer) and commanded vs measured d and q currents, at rates high enough for the new loop (tens of kHz or with suitable triggers)",
              "Requests build identity, calibration dataset (gains, angle offset, delay compensation) and hardware revision with every run",
              "Lists rig tests tied to loop rate and delay: current step response, torque accuracy and ripple over speed, field-weakening stability at top speed, fault reaction time, thermal behaviour",
              "Explains at least two reasons with correct physics (gains scale with sample time; angle error grows with electrical frequency times delay; less CPU headroom)",
              "Flags that two changes in one release confound attribution, and suggests testing them separately or with a controlled sequence",
              "Is concise and actionable for a test team",
            ],
            modelAnswer: md`**Retest request: current loop 16 to 20 kHz plus delay compensation (hypothetical partner)**

**Record with every run (Lockstep):** firmware build hash, calibration dataset ID (PI gains, angle offset, delay compensation factor), hardware and MCU revision, dyno setup ID. Signals: phase currents and DC-link voltage at 100 kS/s or more from the DAQ; shaft torque and speed from the dyno at 10 kS/s; $i_d$, $i_q$ references and measurements, duty cycles and ISR execution time streamed over XCP or a debug channel (decimated if bus bandwidth is short); all on one clock.

**Rerun:**
1. **Current step response and bandwidth**: gains interact with $T_s$; confirm the new rate did not change overshoot.
2. **Torque accuracy and ripple map, 0 to max speed**: delay compensation changes the angle used at every speed; error grows with $f_e T_d$.
3. **Field-weakening stability at top speed**: highest electrical frequency, most sensitive to angle error.
4. **Fault reaction (overcurrent, encoder loss)**: ISR load rises from about 48% to 60%; check reaction time is unchanged.
5. **Thermal derating run**: higher switching-event rate (if PWM frequency also rises) increases switching losses.

**Note:** two changes in one release make failures hard to attribute. Prefer a build with only the rate change, then one with compensation, or at minimum keep the calibration dataset fixed between them.`,
            explanation: md`A strong answer connects each retest to a mechanism (sample time in the gains, angle error at high speed, CPU headroom) and makes build and calibration identity part of every record.`,
            concepts: ["aw06.foc", "aw06.jitter", "aw06.fixed-step-control"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a robotics investor why changing a motor controller's loop rate from 16 to 20 kHz is a control change, not just a software change, and what tests it should trigger.",
          keyPoints: [
            "Discrete controllers are designed for a fixed sample time; gains contain the sample time",
            "Loop delay (about 1.5 periods) costs phase margin and angle accuracy; changing the rate changes the delay",
            "FOC turns phase currents into d and q currents; torque follows q current; angle errors leak current to the wrong axis",
            "Angle error grows with electrical frequency times delay, so high-speed behaviour is most sensitive",
            "Higher rate means more CPU load and less headroom, which can affect other tasks",
            "Tests to rerun: step response, torque map over speed, field weakening, fault reaction",
          ],
        },
        { kind: "sources", refs: ["aw06-r2", "aw06-r3", "aw06-r4", "aw06-r5"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw06-l02-q1",
      type: "numeric",
      prompt: md`Three periodic tasks have utilisations 0.30, 0.25 and 0.20. What is the Liu and Layland bound for $n = 3$ (to three decimals), and is the set guaranteed schedulable under rate-monotonic priorities? Enter the bound.`,
      answer: 0.78,
      tolerance: { abs: 0.002 },
      explanation: md`$3(2^{1/3} - 1) = 3\times0.2599 = 0.780$. Total utilisation $0.75 \le 0.780$, so the set is guaranteed schedulable.`,
      concepts: ["aw06.rtos-scheduling"],
      difficulty: 2,
    },
    {
      id: "aw06-l02-q2",
      type: "mcq",
      prompt: "A task set fails the Liu and Layland bound. What can you conclude?",
      options: [
        "It will miss deadlines",
        "Nothing definite: run response-time analysis to decide",
        "It must be moved to a faster processor",
        "Priorities must be assigned by importance instead of rate",
      ],
      answer: 1,
      explanation: md`The bound is sufficient, not necessary. Many sets above it are schedulable, as the worked example (U = 0.80, R4 = 3.68 ms of 10 ms) shows.`,
      concepts: ["aw06.rtos-scheduling"],
      difficulty: 2,
    },
    {
      id: "aw06-l02-q3",
      type: "numeric",
      prompt: md`A speed loop has a bandwidth of 200 Hz and an effective delay of 1 ms. How much phase lag (degrees) does the delay add at 200 Hz?`,
      answer: 72,
      tolerance: { abs: 0.5 },
      unit: "°",
      explanation: md`$\varphi = 360\times f\times T_d = 360\times200\times0.001 = 72°$. That would destroy most of a typical 45 to 60° phase margin, which is why loop delay must be small relative to the loop's bandwidth.`,
      concepts: ["aw06.jitter", "aw06.fixed-step-control"],
      difficulty: 2,
    },
    {
      id: "aw06-l02-q4",
      type: "numeric",
      prompt: md`A surface-mount PMSM has 5 pole pairs and $\psi_f = 0.08$ Wb. What torque (N·m) does it produce at $i_q = 15$ A, $i_d = 0$?`,
      answer: 9,
      tolerance: { abs: 0.05 },
      unit: "N·m",
      explanation: md`$T = \tfrac32 p\psi_f i_q = 1.5\times5\times0.08\times15 = 9.0$ N·m.`,
      concepts: ["aw06.foc"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw06-l02-q5",
      type: "order",
      prompt: "Order the steps of one FOC current-loop period.",
      items: [
        "Sample phase currents and rotor angle",
        "Clarke transform to alpha-beta",
        "Park transform to d-q",
        "PI control of d and q currents",
        "Inverse Park and space-vector PWM",
        "New duty cycles applied at the next PWM period",
      ],
      explanation: md`Measure, transform to a rotating DC frame, control, transform back, modulate, apply. The angle used in the inverse transform should be compensated for the delay until the duty cycles take effect.`,
      concepts: ["aw06.foc"],
      difficulty: 1,
    },
    {
      id: "aw06-l02-q6",
      type: "mcq",
      prompt: "What is priority inversion?",
      options: [
        "Assigning higher priority to longer-period tasks",
        "A high-priority task blocked on a resource held by a low-priority task, while a medium-priority task runs",
        "Two tasks with the same priority alternating",
        "An ISR preempting a task",
      ],
      answer: 1,
      explanation: md`The high-priority task effectively waits for the medium one. Priority inheritance (the holder borrows the waiter's priority) bounds the blocking; it was the fix for Mars Pathfinder in 1997.`,
      concepts: ["aw06.rtos-scheduling"],
      difficulty: 1,
    },
    {
      id: "aw06-l02-q7",
      type: "decision",
      prompt: md`A firmware release doubles the speed-loop rate and the release note says "performance improvement, no functional change". Your design partner's test lead plans to run only the CAN interface smoke test. What do you recommend?`,
      options: [
        { text: "Agree: no functional change was declared.", score: 0, feedback: "A loop-rate change alters the discrete controller's behaviour (gains contain the sample time) and CPU load." },
        { text: "Recommend speed step response, torque and speed accuracy tests and a timing table check, and ask whether the gains were rescaled for the new sample time.", score: 1, feedback: "Targets the tests that depend on loop rate and asks the question that reveals whether behaviour changed." },
        { text: "Recommend rerunning the entire regression on every variant.", score: 0.4, feedback: "Safe but wasteful; the mechanism points at a specific subset." },
      ],
      explanation: md`Rate changes are control changes. The right retest set follows the physics, which is exactly the reasoning Ripple encodes.`,
      concepts: ["aw06.fixed-step-control", "aw06.rtos-scheduling"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw06-l02-f1", front: "Rate-monotonic priority rule", back: "Shorter period, higher priority. Optimal among fixed-priority schemes for independent periodic tasks with deadline = period.", concepts: ["aw06.rtos-scheduling"] },
    { id: "aw06-l02-f2", front: "Liu and Layland bound", back: md`$U \le n(2^{1/n}-1)$: 0.828 for 2 tasks, 0.780 for 3, tends to $\ln2 = 0.693$. Sufficient, not necessary.`, concepts: ["aw06.rtos-scheduling"] },
    { id: "aw06-l02-f3", front: "Phase lag of a pure delay", back: md`$\varphi = 360°\,f\,T_d$; 75 µs at 1.5 kHz costs 40.5°.`, concepts: ["aw06.jitter"] },
    { id: "aw06-l02-f4", front: "Why FOC uses the d-q frame", back: "In the rotor frame the phase currents become DC values, so PI controllers work; q current makes torque, d current controls flux.", concepts: ["aw06.foc"] },
    { id: "aw06-l02-f5", front: "PMSM torque (surface magnets)", back: md`$T = \tfrac32 p\psi_f i_q$`, concepts: ["aw06.foc"] },
    { id: "aw06-l02-f6", front: "Electrical frequency", back: md`$f_e = p\,n/60$ with p pole pairs and n in rpm.`, concepts: ["aw06.foc"] },
    { id: "aw06-l02-f7", front: "Priority inversion fix", back: "Priority inheritance or priority ceiling on shared mutexes; keep shared sections short.", concepts: ["aw06.rtos-scheduling"] },
    { id: "aw06-l02-f8", front: "Why a loop-rate change is a control change", back: md`Discrete gains contain $T_s$ (for example $K_i T_s$), and loop delay changes with the rate.`, concepts: ["aw06.fixed-step-control"] },
  ],
  scenarios: [
    {
      id: "aw06-s1",
      title: "\"We only moved logging to a lower priority\"",
      context: md`Illustrative. During an Afterwave pilot on a (hypothetical) robot-joint drive bench, the customer's firmware team ships a release that moves the high-rate logging task to a lower priority to "free up the CPU". The next night's endurance run shows three unexplained overcurrent fault trips in 8 hours; the previous build had none.`,
      start: "a",
      concepts: ["aw06.rtos-scheduling", "aw06.jitter", "aw06.foc"],
      nodes: {
        a: {
          md: md`The firmware lead says the trips must be a rig problem: "We did not touch the control code." What do you suggest first?`,
          choices: [
            { text: "Agree it is probably the rig and schedule a rig inspection.", score: 2, feedback: "Possible, but the timing coincides with a scheduling change. Check the build-to-symptom link before blaming the rig.", next: "b" },
            { text: "Use Lockstep's records to line up the three trips with the firmware build, task timing and bus traffic around each event, and compare against the previous build's night run.", score: 9, feedback: "Bench memory turns an argument into evidence: same rig, same profile, different build, aligned on one clock.", next: "b" },
            { text: "Roll back the release immediately and stop investigating.", score: 4, feedback: "Rollback is a sensible safety move, but without investigating you learn nothing and the change will return.", next: "b" },
          ],
        },
        b: {
          md: md`The aligned data shows each trip followed a burst of CAN diagnostic traffic. The logging task, now at low priority, holds the CAN driver mutex longer while it is preempted; the diagnostic task that needs the same driver is blocked, and the watchdog-supervised fault-monitoring task misses a deadline, which the firmware treats as a fault and trips the inverter.`,
          choices: [
            { text: "Recommend priority inheritance on the CAN driver mutex (or a separate logging queue), then rerun the endurance test and the fault-reaction and communication timing tests on the fixed build.", score: 10, feedback: "Fixes the mechanism (priority inversion through a shared resource) and retests exactly what depends on it." },
            { text: "Recommend raising the logging task back to its old priority and closing the issue.", score: 5, feedback: "May hide the symptom, but the shared-mutex inversion remains and will reappear under another load pattern." },
            { text: "Recommend increasing the fault-monitoring deadline so it does not trip.", score: 1, feedback: "Weakens a safety-relevant monitor to hide a scheduling bug. Never the first move." },
          ],
        },
      },
    },
  ],
};

export default lesson;
