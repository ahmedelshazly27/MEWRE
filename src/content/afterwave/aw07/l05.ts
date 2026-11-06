import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw07-l05",
  title: "Sim vs real: simulators, the domain gap, domain randomisation and why bench evidence matters",
  summary:
    "What a robot simulator computes (rigid-body dynamics, contact, sensors, rendering) and where it is wrong: actuator dynamics, friction, contact, latency, sensor noise and appearance. How teams close the gap with system identification, learned actuator models and domain randomisation, how to set randomisation ranges from bench data, and how to measure the sim-to-real gap honestly. The conclusion that matters for Afterwave: a simulator is only as valid as the bench data that calibrated it.",
  minutes: 80,
  objectives: [
    "You can write the rigid-body equation of motion a simulator integrates and name the parts of reality it approximates or omits.",
    "You can explain why explicit integration needs small time steps for stiff contact and compute a stability limit.",
    "You can explain domain randomisation and system identification, and set randomisation ranges from bench measurements.",
    "You can quantify a sim-to-real gap with uncertainty and judge whether a simulation result is evidence for a release.",
    "You can write a sim-to-real evidence plan that specifies which bench tests calibrate the simulator and which real tests gate a release.",
  ],
  concepts: [
    { id: "aw07.robot-simulation", name: "Physics simulation for robots", description: "Numerical integration of rigid-body dynamics M(q) q'' + C(q, q') q' + g(q) = tau + J^T f with contact, friction, actuator and sensor models, at fixed time steps (MuJoCo, Isaac Sim and Isaac Lab, Gazebo, Drake, PyBullet).", competency: "aw-physical-ai", related: ["aw07.reality-gap"] },
    { id: "aw07.reality-gap", name: "Reality gap (sim-to-real gap)", description: "The difference between behaviour in simulation and on the real robot, caused by unmodelled or mis-parameterised actuators, friction, contact, latency, sensors and appearance; measured as the drop in task metrics from sim to real.", competency: "aw-physical-ai", related: ["aw07.domain-randomisation", "aw07.system-identification"] },
    { id: "aw07.domain-randomisation", name: "Domain randomisation", description: "Training across randomly varied simulator parameters (masses, friction, latency, motor strength, textures, lighting) so the policy treats the real world as one more variation; too narrow misses reality, too wide makes the policy conservative.", competency: "aw-physical-ai", related: ["aw07.reality-gap", "aw07.system-identification"] },
    { id: "aw07.system-identification", name: "System identification and real-to-sim", description: "Estimating simulator parameters, or learning component models such as an actuator network, from measured bench data so simulation matches the real hardware.", competency: "aw-physical-ai", related: ["aw07.domain-randomisation", "aw07.actuator-chain"] },
    { id: "aw07.sim-evidence", name: "Simulation as evidence", description: "Simulation results count as evidence only within the validated domain of the model, which bench and field data establish; releases of learned systems are gated by real trials, with simulation for screening and coverage.", competency: "aw-physical-ai", related: ["aw07.reality-gap", "aw07.policy-evaluation"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What a simulator computes and where it is wrong",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Every physical AI company trains and screens in simulation, and every investor will ask why Afterwave focuses on bench data when "everything moves to sim". The answer is in this lesson: simulators are calibrated by bench data, the gap between sim and real is measured on benches, and the release evidence for learned systems still comes from real trials. Applied Intuition and NVIDIA sell simulation; Afterwave sells the physical half of the evidence. You must be able to explain that boundary precisely and without dismissing simulation.`,
        },
        {
          kind: "md",
          md: md`### The equation every robot simulator integrates

For a robot with joint coordinates $q$, the rigid-body equation of motion is:`,
        },
        { kind: "equation", formula: "aw07-rigid-body-dynamics" },
        {
          kind: "md",
          md: md`$M(q)$ is the configuration-dependent mass matrix, $C$ collects Coriolis and centrifugal terms, $g(q)$ is gravity, $\tau$ the joint torques from the actuators and $J^\top f$ the contact forces mapped into joint space. The simulator computes contact forces (the hard part: which bodies touch, with what friction), solves for $\ddot q$, and integrates forward by a fixed time step. Common simulators: **MuJoCo** (open source since 2022, a fast soft-contact model widely used for RL), **NVIDIA Isaac Sim and Isaac Lab** (GPU-parallel, photorealistic rendering, thousands of environments at once), **Gazebo** (the ROS ecosystem's simulator), **Drake** (model-based control and optimisation), and **PyBullet**.

### Time steps and stiffness

Contact is stiff: a foot or a fingertip behaves like a very stiff spring. Explicit integrators are stable only if the time step is small compared with the fastest oscillation period:`,
        },
        { kind: "equation", formula: "aw07-integration-stability" },
        {
          kind: "md",
          md: md`A 1 kg body on a $10^5$ N/m contact spring has $\omega_n = 316$ rad/s, so $\Delta t$ must be below 6.3 ms; real simulators use soft or implicit contact and steps of about 1 to 5 ms (MuJoCo's default is 2 ms) and still trade accuracy for speed. Contact parameters are partly numerical choices, not physical constants, which is one source of the gap.

### Where simulation and reality differ

| Gap source | What the simulator usually assumes | What the bench shows |
|---|---|---|
| Actuator dynamics | ideal torque source, perhaps a torque limit | current and voltage limits (lesson 1), backlash, compliance, friction, thermal derating, the control loops and their delays (lesson 2) |
| Friction | Coulomb plus viscous with one coefficient | varies with temperature, wear, lubrication, load direction; stiction |
| Contact | rigid or soft-spring contact, simple friction cone | compliant feet and grippers, surface variation, deformables |
| Latency | zero or one constant delay | variable delays across sensors, computer, bus and drives |
| Sensors | ideal or with Gaussian noise | bias, drift, quantisation, vibration, timestamp errors (lesson 3) |
| Appearance | rendered textures and lighting | real lighting, reflections, motion blur, dirt |
| Mass properties | CAD values | cables, fasteners, manufacturing tolerances |

The friction model most simulators start from:`,
        },
        { kind: "equation", formula: "aw07-friction-model" },
        {
          kind: "md",
          md: md`### Closing the gap

**System identification (real-to-sim).** Measure the real hardware and fit the simulator's parameters: masses and inertias, friction, motor constants, latency, contact parameters. Bench tests from lesson 1 (friction, stiffness, torque-speed) feed this directly.

**Learned component models.** When an analytical model is not good enough, learn one from bench data. A well-known example: Hwangbo and colleagues (2019) trained a neural network on measured actuator data from the ANYmal quadruped (commanded position history in, delivered torque out), placed it in the simulator, and transferred RL locomotion policies to the real robot.

**Domain randomisation.** Instead of one exact simulator, train across many: sample each uncertain parameter from a range at every episode, and optimise expected performance over the distribution:`,
        },
        { kind: "equation", formula: "aw07-domain-randomisation" },
        {
          kind: "md",
          md: md`Tobin and colleagues (2017) randomised textures, lighting and camera pose so a vision model trained only in simulation worked on real images; Peng and colleagues (2018) randomised dynamics (masses, friction, latency, controller gains) so a manipulation policy transferred. The trade-off: ranges too narrow and reality falls outside them; ranges too wide and the policy becomes conservative (slow, timid) because it must work for implausible robots. **Good ranges come from measured spread**: unit-to-unit variation, temperature, wear.

### Measuring the gap

Report the same metric in sim and real on the same task definition, with uncertainty on both. The gap is the difference, and the real side usually dominates the uncertainty because real trials are few. A component-level fidelity metric, such as comparing a simulated actuator's torque trace with the bench trace for the same command, localises the gap:`,
        },
        { kind: "equation", formula: "aw07-nrmse" },
        {
          kind: "flow",
          title: "The real-to-sim-to-real loop, and where bench data enters",
          steps: [
            { label: "Bench characterisation", detail: "Friction, stiffness, torque-speed, latency, sensor noise on real units (lessons 1 to 3)" },
            { label: "System identification", detail: "Fit simulator parameters or learn actuator models; record parameter spread" },
            { label: "Randomised training and screening in sim", detail: "Ranges from the measured spread; thousands of parallel episodes" },
            { label: "Real trials", detail: "Same task metrics on hardware, enough trials for intervals (lesson 4)" },
            { label: "Gap analysis", detail: "Which component explains the gap; update models and ranges; repeat" },
          ],
          caption: "Simulation sits in the middle of the loop; both ends are physical. A change to the hardware invalidates the identified parameters and therefore the simulation's validity, which is a change-impact rule.",
        },
        {
          kind: "matrix",
          title: "What a simulation result is worth as evidence",
          xAxis: ["Model not validated against bench data", "Model validated on bench data for this hardware revision"],
          yAxis: ["Inside the validated range", "Outside the validated range"],
          cells: [
            { label: "Screening only", detail: "Useful to rank candidates and find bugs; not evidence" },
            { label: "Supporting evidence", detail: "Coverage of many conditions between real tests; still gated by real trials" },
            { label: "Speculation", detail: "No basis for claims; also no basis for test selection" },
            { label: "Extrapolation", detail: "Flag for real testing: this is where Ripple should send rig time" },
          ],
          caption: "Bottom-right is the practical case after most changes: the model was validated, but the change moved the system outside the validated range.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Setting randomisation from bench data and measuring the gap",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Calibrate a locomotion policy's simulator from actuator bench data, then measure the gap",
          given: md`Illustrative humanoid customer. Bench data from 12 knee actuators: Coulomb friction mean 0.80 N m, standard deviation 0.15 N m (output side); command-to-torque latency measured between 4 and 9 ms. Simulator currently randomises friction over 0.6 to 1.0 N m and latency over 0 to 5 ms. Policy trained in sim with the old ranges: 96 % success on a stair-climb task in 1,000 simulated episodes; on the real robot 78 successes in 100 trials. Torque-trace comparison for one actuator, same command: RMSE 3.2 N m over an 80 N m range.`,
          steps: [
            { md: md`**Friction range.** ±3 standard deviations covers almost all units: $0.80 \pm 0.45$, so **0.35 to 1.25 N m**. The old range 0.6 to 1.0 covered only about ±1.3 standard deviations, so roughly one unit in five falls outside it.` },
            { md: md`**Latency range.** Measured 4 to 9 ms; the old range topped out at 5 ms. Randomise over about **3 to 10 ms**. At a 10 Hz balance-loop crossover, 9 ms costs $2\pi\times10\times0.009 = 0.57$ rad $= 32°$ of phase versus 14° at 4 ms: a policy never trained with 9 ms will be under-damped on the slowest units.` },
            { md: md`**Real success interval.** $\hat p = 0.78$, $SE = \sqrt{0.78\times0.22/100} = 0.041$, interval **70 % to 86 %**. Simulated 96 % has a much smaller interval (1,000 episodes, about ±1.2 points).` },
            { md: md`**Gap.** $96 - 78 = 18$ points, with a plausible range of about 10 to 26 points. This is not noise: the simulator is optimistic.` },
            { md: md`**Component fidelity.** $NRMSE = 3.2/80 = 4\ \%$ for the actuator torque trace: the actuator model is decent for that unit; the latency and friction ranges are the more likely explanation for the gap.` },
            { md: md`**Next step.** Retrain with the bench-based ranges, then rerun 100 real trials; the release decision uses the real interval, not the simulated number.` },
          ],
          result: md`The simulator was not wrong in its physics; it was wrong in its ranges, because nobody had fed it the spread of real units. The fix is bench data: friction and latency measured across units, versioned with hardware revisions, and an automatic flag when a hardware change invalidates those parameters.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A second actuator family",
          given: md`Bench data from a hip actuator family: friction mean 1.2 N m, standard deviation 0.2 N m. After retraining, the real robot scores 60 successes in 80 trials on a turning task; simulation scores 90 %.`,
          steps: [
            { md: md`Friction randomisation range at ±3 standard deviations: $1.2 \pm 0.6$.` },
            { md: md`Range: 0.6 to 1.8 N m (upper bound 1.8).`, hidden: true, check: { prompt: "Upper bound of the friction range (N m)", answer: 1.8, unit: "N m", tolerance: { abs: 0.01 } } },
            { md: md`Real success $\hat p = 60/80 = 0.75$; half-width $1.96\sqrt{0.75\times0.25/80}$.` },
            { md: md`Half-width $= 0.095$: real interval about 65 % to 85 %.`, hidden: true, check: { prompt: "95 % half-width (fraction)", answer: 0.095, tolerance: { abs: 0.003 } } },
            { md: md`Gap $= 90 - 75 = 15$ points, plausibly 5 to 25.` },
          ],
          result: md`Even after retraining a 15-point gap remains; with 80 trials its size is uncertain by about ±10 points. Find which component explains it (compare torque traces, latency, contact) before randomising further.`,
        },
        {
          kind: "question",
          question: {
            id: "aw07-l05-p1",
            type: "numeric",
            prompt: md`A simulated gripper contact is modelled as a spring of $10^6$ N/m acting on a 0.5 kg finger. Using the explicit stability limit $\Delta t < 2/\omega_n$, what is the largest stable time step in ms (2 decimals)?`,
            answer: 1.41,
            tolerance: { abs: 0.02 },
            unit: "ms",
            explanation: md`$\omega_n = \sqrt{k/m} = \sqrt{2\times10^6} = 1{,}414$ rad/s; $\Delta t < 2/1{,}414 = 1.41$ ms. Stiffer contact or lighter bodies force smaller steps, which is why simulators soften contact.`,
            concepts: ["aw07.robot-simulation"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "How teams use simulation, and what bench evidence it still needs",
      blocks: [
        {
          kind: "md",
          md: md`### In practice

- **Locomotion teams** train almost entirely in simulation with RL and domain randomisation, then fine-tune parameters and validate on hardware. Actuator models and latency are the usual gap.
- **Manipulation teams** train mostly on real teleoperated demonstrations (lesson 4) and use simulation for screening, synthetic data and regression on scripted scenes. Contact and appearance are the usual gap.
- **Release gating** for learned behaviour is on real trials, increasingly with simulation used to choose **which** real trials to run (the conditions where sim predicts trouble, or where the change moved the system outside the validated range).

Documents to ask for: the simulator parameter file and its version, the system-identification report (which bench data, which hardware revision), the randomisation ranges and their justification, and a sim-vs-real comparison table per release.

### Why bench evidence matters more for learned systems, not less

1. **Validation of the simulator itself** is a bench activity: identified parameters, measured spread, component fidelity.
2. **Hardware changes silently invalidate simulation.** A new gearbox supplier changes friction, stiffness and latency; the simulator does not know until someone measures.
3. **Regulators and customers judge real behaviour.** Under the EU Machinery Regulation, safety functions must be shown to work on the machine; simulation can support a safety case but does not replace tests of the real safety function (the regulatory detail is in the functional safety and Machinery Regulation modules of this track).
4. **Real trials are scarce**, so choosing them well is high-leverage.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- **Simulated success reported as product performance.** Investors and customers hear 96 % and the robot does 78 %.
- **Randomisation ranges guessed, not measured.** Either too narrow (reality outside) or too wide (timid policy).
- **Simulator parameters not versioned with hardware.** The model was identified on revision A; the robot is revision C.
- **No component-level comparison.** Only the end-to-end task is compared, so nobody knows which part of the model is wrong.
- **Latency treated as zero.** The single most common dynamics gap for learned controllers.`,
        },
        {
          kind: "ask",
          title: "Questions to ask a simulation or learning lead",
          items: [
            "Where do your simulator's actuator, friction and latency parameters come from, and which hardware revision were they measured on?",
            "How do you choose randomisation ranges?",
            "What was your sim-to-real gap on the last release, per task, with how many real trials?",
            "When the hardware changes, how do you know which simulation results still hold?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw07-l05-p2",
            type: "short",
            prompt: md`Write a **sim-to-real evidence plan** for a customer releasing an RL locomotion policy to a new hardware revision (new ankle gearbox). Cover: which bench tests must calibrate the simulator and why, how randomisation ranges are set, what real trials gate the release (with counts), how the gap is reported, and which of these Ripple should trigger automatically when the gearbox changes.`,
            rubric: [
              "Names concrete bench tests on the new hardware (friction, stiffness and backlash, torque-speed, latency, actuator torque traces) and links them to simulator parameters",
              "Sets randomisation ranges from measured spread (for example mean plus or minus 3 standard deviations across units) rather than guesses",
              "Defines real-trial release gates with counts justified statistically (binomial intervals or rule of three for safety-relevant behaviours)",
              "Reports the gap per task as sim vs real with uncertainty, and includes a component-level fidelity check",
              "States that a gearbox change invalidates the identified ankle parameters, the simulation's validity and the related real evidence, and makes Ripple trigger the recalibration and gating tests",
            ],
            modelAnswer: md`**Sim-to-real evidence plan, ankle gearbox revision (illustrative)**

1. **Bench calibration on 8 new ankle actuators:** friction (Coulomb and viscous, 3 temperatures), stiffness and backlash, torque-speed at minimum bus voltage, command-to-torque latency, torque traces for 10 standard command profiles. These set simulator friction, compliance, torque limits, latency and the actuator model.
2. **Ranges:** friction and stiffness at mean ±3 standard deviations across the 8 units; latency over measured minimum minus 1 ms to maximum plus 1 ms. Ranges stored with the hardware revision.
3. **Fidelity:** torque-trace NRMSE below 5 % per profile before training is allowed to start.
4. **Real gates:** 200 trials each on flat walking, stairs and push recovery (±6 points at 80 %); pass if lower bound at least the previous release minus 3 points. Fall-safe behaviour: 300 consecutive trials without an unsafe fall (below 1 % at 95 %).
5. **Gap report:** per task, sim success (1,000 episodes) vs real with 95 % intervals, plus which component comparison explains any gap above 10 points.
6. **Ripple rule:** a change to the ankle gearbox part number triggers steps 1 to 5 automatically for the ankle and for every policy trained with ankle parameters; it marks prior ankle simulation results as outside the validated range.`,
            explanation: md`The plan's spine is: bench data validates the simulator, real trials gate the release, and a hardware change resets both for the affected parts.`,
            concepts: ["aw07.sim-evidence", "aw07.domain-randomisation", "aw07.system-identification"],
            difficulty: 3,
          },
        },
        { kind: "sources", refs: ["aw07-r22", "aw07-r23", "aw07-r24", "aw07-r32", "aw07-r33"] },
        {
          kind: "feynman",
          prompt: "An investor says: \"Simulation will make physical test benches obsolete.\" Explain, in under two minutes, why that is not true for learned robots, without dismissing simulation.",
          keyPoints: [
            "Simulation is essential: it trains and screens policies at a scale real robots cannot",
            "A simulator is only as good as its parameters, which are measured on benches (friction, latency, stiffness, torque limits)",
            "Hardware changes silently invalidate those parameters; only new bench data revalidates them",
            "The sim-to-real gap is measured with real trials, and release and safety evidence still comes from real behaviour",
            "So simulation increases the value of well-chosen bench tests: it moves the bench from brute-force testing to calibration and targeted validation",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw07-l05-q1",
      type: "mcq",
      prompt: "What does domain randomisation do?",
      options: [
        "Randomly selects which real robot to test on",
        "Trains a policy across randomly varied simulator parameters so the real world is likely to fall within the training distribution",
        "Randomises the order of test cases on the bench",
        "Adds random noise to the policy's actions at deployment",
      ],
      answer: 1,
      explanation: md`It optimises expected performance over a distribution of simulators (masses, friction, latency, appearance). The ranges should come from measured spread.`,
      concepts: ["aw07.domain-randomisation"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw07-l05-q2",
      type: "multi",
      prompt: "Which are common sources of the sim-to-real gap for legged robots? (Select all that apply.)",
      options: [
        "Unmodelled actuator dynamics and torque limits",
        "Latency between command and delivered torque",
        "Friction that varies with temperature and wear",
        "The simulator's programming language",
        "Contact and foot compliance",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`Physics and timing differences cause the gap; the implementation language does not.`,
      concepts: ["aw07.reality-gap"],
      difficulty: 1,
    },
    {
      id: "aw07-l05-q3",
      type: "numeric",
      prompt: md`Bench data across 20 units: viscous friction coefficient mean 0.05 N m s/rad, standard deviation 0.008. What is the upper bound of a ±3 standard deviation randomisation range (3 decimals)?`,
      answer: 0.074,
      tolerance: { abs: 0.001 },
      unit: "N m s/rad",
      explanation: md`$0.05 + 3\times0.008 = 0.074$; the range is 0.026 to 0.074.`,
      concepts: ["aw07.domain-randomisation", "aw07.system-identification"],
      difficulty: 1,
    },
    {
      id: "aw07-l05-q4",
      type: "mcq",
      prompt: "What did the learned actuator model in Hwangbo and colleagues' ANYmal work replace?",
      options: [
        "The robot's camera",
        "An idealised actuator model in the simulator, using a network trained on measured actuator data",
        "The reinforcement learning algorithm",
        "The robot's battery model",
      ],
      answer: 1,
      explanation: md`They trained a network on real actuator measurements and used it inside the simulator, which made RL locomotion policies transfer to the real robot. Bench data made simulation work.`,
      concepts: ["aw07.system-identification"],
      difficulty: 2,
    },
    {
      id: "aw07-l05-q5",
      type: "decision",
      prompt: md`A customer's new hardware revision changes the ankle gearbox. Their plan: reuse the old simulator parameters, retrain in sim, and release if simulated success stays above 95 %. What do you advise?`,
      options: [
        { text: "Fine: simulation success is a good proxy.", score: 0, feedback: "The parameters were identified on the old gearbox; the simulation is now outside its validated range." },
        { text: "Re-identify ankle parameters on the new gearbox on the bench, retrain with ranges from the measured spread, and gate the release on real trials with intervals.", score: 1, feedback: "Right: the hardware change invalidates the simulator's ankle model and the real evidence that depended on it." },
        { text: "Skip simulation and only run real trials.", score: 0.4, feedback: "Real trials are required, but abandoning simulation wastes its screening value and makes training impractical." },
      ],
      explanation: md`A hardware change resets the simulator's validity for the affected parts. Recalibrate on the bench, then validate on the robot.`,
      concepts: ["aw07.sim-evidence", "aw07.reality-gap"],
      difficulty: 2,
    },
    {
      id: "aw07-l05-q6",
      type: "numeric",
      prompt: md`A simulated actuator torque trace differs from the bench trace with RMSE 2.4 N m. The bench trace spans 30 to 90 N m. What is the NRMSE in %?`,
      answer: 4,
      tolerance: { abs: 0.05 },
      unit: "%",
      explanation: md`$NRMSE = 2.4/(90 - 30) = 0.04 = 4\ \%$.`,
      concepts: ["aw07.reality-gap"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "aw07-l05-f1", front: "Rigid-body equation of motion", back: md`$M(q)\ddot q + C(q,\dot q)\dot q + g(q) = \tau + J^\top f$`, concepts: ["aw07.robot-simulation"] },
    { id: "aw07-l05-f2", front: "Explicit integration stability for stiff contact", back: md`$\Delta t < 2/\omega_n$ with $\omega_n = \sqrt{k/m}$; simulators soften contact and use 1 to 5 ms steps (MuJoCo default 2 ms).`, concepts: ["aw07.robot-simulation"] },
    { id: "aw07-l05-f3", front: "Domain randomisation trade-off", back: "Too narrow: reality falls outside. Too wide: conservative policy. Set ranges from measured unit-to-unit spread.", concepts: ["aw07.domain-randomisation"] },
    { id: "aw07-l05-f4", front: "System identification", back: "Fitting simulator parameters (or learning component models) from measured bench data: real-to-sim.", concepts: ["aw07.system-identification"] },
    { id: "aw07-l05-f5", front: "How to report the sim-to-real gap", back: "Same task metric in sim and real, both with confidence intervals; plus component-level fidelity (for example torque-trace NRMSE).", concepts: ["aw07.reality-gap"] },
    { id: "aw07-l05-f6", front: "Why bench evidence matters for learned systems", back: "It validates the simulator, detects when hardware changes invalidate it, measures the gap and supplies release and safety evidence.", concepts: ["aw07.sim-evidence"] },
  ],
};

export default lesson;
