import { md, type Question } from "../../schema";

const exam: Question[] = [
  {
    id: "aw07-x1",
    type: "numeric",
    prompt: md`An actuator has $K_t = K_e = 0.10$ N m/A, $R = 0.20\ \Omega$, gear ratio 120 with efficiency 0.80, on a 48 V bus. What voltage is needed at the terminals to deliver 100 N m at 3 rad/s output (1 decimal)? Ignore inductance and voltage utilisation.`,
    answer: 38.1,
    tolerance: { abs: 0.2 },
    unit: "V",
    explanation: md`$\tau_m = 100/(120\times0.8) = 1.042$ N m; $i = 10.42$ A; $\omega_m = 360$ rad/s; $V = 0.2\times10.42 + 0.1\times360 = 2.1 + 36 = 38.1$ V. It fits a 48 V bus; the no-load output speed is $48/0.1/120 = 4$ rad/s.`,
    concepts: ["aw07.torque-constant", "aw07.gear-reduction"],
    difficulty: 2,
  },
  {
    id: "aw07-x2",
    type: "numeric",
    prompt: md`A joint's velocity loop crosses over at 80 Hz with 55° phase margin. A middleware update adds 0.8 ms of delay. What is the new phase margin in degrees (1 decimal)?`,
    answer: 32.0,
    tolerance: { abs: 0.2 },
    unit: "°",
    explanation: md`$\Delta\varphi = 2\pi\times80\times0.0008 = 0.402$ rad $= 23.0°$; $55 - 23.0 = 32.0°$: damping ratio about 0.3, visible overshoot. No gain changed.`,
    concepts: ["aw07.stability-margins"],
    difficulty: 2,
  },
  {
    id: "aw07-x3",
    type: "decision",
    prompt: md`A humanoid customer changes the harmonic drive supplier on the knee. Their learned locomotion policy was trained in simulation with parameters identified on the old drive. What retest scope do you recommend?`,
    options: [
      { text: "Rerun only the knee endurance test.", score: 0.1, feedback: "Misses stiffness, efficiency, resonance, control margins and the simulator's validity." },
      { text: "Characterise the new drive on the bench (stiffness, backlash, efficiency, friction, latency, resonance), recheck the knee control margins, re-identify the simulator's knee parameters and ranges, retrain or verify the policy, and gate the release on real trials with intervals.", score: 1, feedback: "Right: the change propagates from mechanics to control tuning to the simulator to the learned policy's evidence." },
      { text: "Rerun every test in the company's suite.", score: 0.4, feedback: "Covers the risk but wastes rig time on tests the change cannot affect (for example camera calibration)." },
      { text: "Rely on the policy's simulated success rate after retraining.", score: 0, feedback: "The simulator's knee model is now outside its validated range." },
    ],
    explanation: md`Change impact follows dependencies: part, physical parameters, control margins, simulator parameters, policy evidence. That chain is what Ripple encodes.`,
    concepts: ["aw07.harmonic-drive", "aw07.stability-margins", "aw07.sim-evidence"],
    difficulty: 3,
  },
  {
    id: "aw07-x4",
    type: "numeric",
    prompt: md`Scalar Kalman update: prediction 1.0 m with variance 0.50 m², measurement 1.6 m with variance 0.25 m². What is the updated estimate in m (2 decimals)?`,
    answer: 1.4,
    tolerance: { abs: 0.005 },
    unit: "m",
    explanation: md`$K = 0.5/(0.5 + 0.25) = 0.667$; $\hat x = 1.0 + 0.667\times0.6 = 1.40$ m; updated variance $0.333\times0.5 = 0.167$ m².`,
    concepts: ["aw07.kalman-filter"],
    difficulty: 2,
  },
  {
    id: "aw07-x5",
    type: "numeric",
    prompt: md`Stereo camera: $f = 600$ px, $B = 0.08$ m, matching error 0.3 px. What is the depth error at 2.5 m, in cm (1 decimal)?`,
    answer: 3.9,
    tolerance: { abs: 0.1 },
    unit: "cm",
    explanation: md`$\delta Z = Z^2\delta d/(fB) = 6.25\times0.3/48 = 0.039$ m $= 3.9$ cm.`,
    concepts: ["aw07.exteroception"],
    difficulty: 1,
  },
  {
    id: "aw07-x6",
    type: "multi",
    prompt: "Which bench measurements directly calibrate a legged robot's simulator? (Select all that apply.)",
    options: [
      "Joint friction across several units and temperatures",
      "Command-to-torque latency",
      "Gearbox torsional stiffness and backlash",
      "Torque-speed envelope at minimum bus voltage",
      "The company's sales pipeline",
    ],
    answer: [0, 1, 2, 3],
    explanation: md`Friction, latency, compliance and torque limits are the usual dynamics gap sources and are measured on actuator rigs.`,
    concepts: ["aw07.system-identification", "aw07.reality-gap"],
    difficulty: 1,
  },
  {
    id: "aw07-x7",
    type: "numeric",
    prompt: md`A team wants to claim a handover behaviour fails less than 0.5 % of the time (95 %, zero failures). Each trial takes 1.5 minutes. How many robot-hours does that take?`,
    answer: 15,
    tolerance: { abs: 0.2 },
    unit: "h",
    explanation: md`Rule of three: $n = 3/0.005 = 600$ trials; $600\times1.5/60 = 15$ robot-hours, per behaviour, per release, restarting after any failure.`,
    concepts: ["aw07.policy-evaluation", "aw07.evidence-hours"],
    difficulty: 2,
  },
  {
    id: "aw07-x8",
    type: "order",
    prompt: "Order the real-to-sim-to-real loop.",
    items: [
      "Characterise hardware on the bench",
      "Identify simulator parameters and their spread",
      "Train with domain randomisation in simulation",
      "Run real trials with confidence intervals",
      "Analyse the gap by component and update the model",
    ],
    explanation: md`Bench data at both ends; simulation in the middle.`,
    concepts: ["aw07.system-identification", "aw07.sim-evidence"],
    difficulty: 1,
  },
  {
    id: "aw07-x9",
    type: "mcq",
    prompt: "Under the EU Machinery Regulation, what applies to a safety component whose safety function relies on self-evolving machine-learning behaviour?",
    options: [
      "Self-certification (internal control) is always allowed",
      "It is in Annex I Part A, so third-party (notified-body) conformity assessment is required",
      "It is excluded from the Regulation and covered only by the AI Act from 2026",
      "It is covered by ISO 25785-1 certification",
    ],
    answer: 1,
    explanation: md`Annex I Part A lists such safety components and machinery embedding them; no harmonised standard yet covers them. ISO 25785-1 is still a draft.`,
    concepts: ["aw07.validation-bottleneck", "aw07.humanoid-standards-gap"],
    difficulty: 2,
  },
  {
    id: "aw07-x10",
    type: "short",
    prompt: md`A humanoid customer's next release contains three changes: a new VLA checkpoint fine-tuned for a shelf-restocking skill, a new knee gearbox lot, and a camera driver update. Write the **change-impact memo** Ripple should produce: for each change, which tests to run, on which rig or robot, why (mechanism), and the trial counts or criteria (illustrative, labelled). End with the total evidence hours and what you would cut if the fleet only has one night.`,
    rubric: [
      "VLA checkpoint: treated as a global change, smoke tests on all skills, full evaluation on restocking and related skills and safety behaviours, counts justified statistically",
      "Gearbox lot: actuator bench tests (stiffness, backlash, efficiency, resonance), knee control margins, simulator parameter check, with mechanism",
      "Camera driver: timing and latency, camera-IMU offset and calibration checks against a synchronised reference, then perception-dependent skills",
      "Computes total evidence hours with a formula and plausible illustrative numbers",
      "Prioritises explicitly by risk (safety behaviours and the changes with broadest reach first) if capacity is short, and says what risk the cut accepts",
    ],
    modelAnswer: md`**Change-impact memo (illustrative numbers)**

1. **VLA checkpoint (global):** smoke test 20 trials on all 20 skills; full evaluation 250 trials on restocking and 3 skills sharing shelf objects; 300 consecutive clean trials on 2 safety behaviours. Mechanism: shared weights change all skills.
2. **Knee gearbox lot:** bench stiffness, backlash, efficiency and resonance sweep on 3 actuators; knee velocity and position loop frequency response (phase margin at least 45°); compare against the simulator's knee parameters; if outside the validated range, rerun walking and stairs at 200 trials. Mechanism: stiffness and friction move resonance and dynamics.
3. **Camera driver:** exposure-to-timestamp latency and camera-IMU offset on the head fixture with a synchronised reference (difference below 1 ms); if changed, 100 trials on the two most perception-sensitive grasp skills. Mechanism: drivers change buffering and timestamps.

**Hours at 2 min per trial:** smoke $20\times20 = 400$; full $4\times250 = 1{,}000$; safety $600$; locomotion $400$; perception $200$: 2,600 trials, about 87 robot-hours plus about 6 bench hours.

**One night (64 robot-hours):** keep safety behaviours, smoke tests, restocking full evaluation, the knee bench and margin tests and the camera timing check; defer full evaluation of the three related skills and the locomotion rerun unless the bench shows the knee outside its validated range. Accepted risk: a regression in related skills is detected later, at smoke-test sensitivity only.`,
    explanation: md`The memo must follow mechanisms across hardware, control, perception and learned policy, quantify the evidence and make the trade-off under limited capacity explicit.`,
    concepts: ["aw07.policy-evaluation", "aw07.backlash-compliance", "aw07.time-sync", "aw07.evidence-hours"],
    difficulty: 3,
  },
];

export default exam;
