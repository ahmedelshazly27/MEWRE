import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw07-l04",
  title: "Learned policies and robot foundation models: imitation learning, RL and vision-language-action models",
  summary:
    "When the controller is a neural network: what a policy is, how imitation learning and reinforcement learning train one, why behaviour cloning compounds its errors, how vision-language-action models are built from a pretrained vision-language backbone plus an action head, and what changes for testing when behaviour lives in weights rather than code. Success rates become statistics: you will compute confidence intervals, the rule of three and the trial counts needed to claim an improvement.",
  minutes: 85,
  objectives: [
    "You can define a policy, and contrast imitation learning (behaviour cloning, DAgger) with reinforcement learning, including when each is used.",
    "You can explain compounding error in behaviour cloning and compute episode success from a per-step failure rate.",
    "You can describe the architecture of a vision-language-action model (backbone, action tokens or action expert, action chunking) and name the main 2023 to 2025 examples.",
    "You can compute a confidence interval on a success rate, the trial count for a target precision, and the rule-of-three bound after zero failures.",
    "You can list what must be versioned and tested when a policy changes, and why a neural policy change is global.",
  ],
  concepts: [
    { id: "aw07.policy", name: "Policy", description: "The mapping from observations to actions, pi(a | o); classical policies are hand-written controllers and planners, learned policies are neural networks whose behaviour is set by weights trained on data.", competency: "aw-physical-ai", related: ["aw07.imitation-learning", "aw07.reinforcement-learning"] },
    { id: "aw07.imitation-learning", name: "Imitation learning and compounding error", description: "Training a policy to reproduce expert (often teleoperated) demonstrations; plain behaviour cloning drifts into states never demonstrated and its errors compound over the horizon, which DAgger-style data collection and action chunking mitigate.", competency: "aw-physical-ai", related: ["aw07.policy", "aw07.vla"] },
    { id: "aw07.reinforcement-learning", name: "Reinforcement learning", description: "Training a policy by trial and error to maximise expected discounted reward, usually in simulation for robots (locomotion is the leading example), with reward design and sim-to-real transfer as the hard parts.", competency: "aw-physical-ai", related: ["aw07.policy"] },
    { id: "aw07.vla", name: "Vision-language-action model", description: "A robot foundation model that starts from a pretrained vision-language model and adds action outputs (discretised action tokens or a continuous action head such as diffusion or flow matching), trained on large multi-robot demonstration datasets and conditioned on language instructions.", competency: "aw-physical-ai", related: ["aw07.imitation-learning", "aw07.action-chunking"] },
    { id: "aw07.action-chunking", name: "Action chunking and inference latency", description: "Predicting a sequence of future actions per inference so a slow model can drive a fast control loop; latency and chunk length set how stale actions are and how quickly the robot can react.", competency: "aw-physical-ai", related: ["aw07.vla"] },
    { id: "aw07.policy-evaluation", name: "Statistical evaluation of learned policies", description: "Success rates measured over repeated trials with confidence intervals; trial counts follow from the binomial standard error, and zero failures in n trials bounds the failure rate at about 3/n (95 %).", competency: "aw-physical-ai", related: ["aw07.policy"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "From hand-written controllers to policies in weights",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`"Physical AI, not generic test automation" is Afterwave's positioning, and this lesson is what the phrase means. When a robot's behaviour comes from a neural network, a one-line change (new weights) can change every skill at once, results vary from trial to trial, and the only evidence that a release is better is many repeated physical trials with statistics. That makes bench time scarce and bench memory valuable, and it makes "which tests to rerun after a model change" a hard, unsolved question. Ripple sits exactly there.`,
        },
        {
          kind: "md",
          md: md`### What a policy is

A **policy** maps observations to actions, $\pi(a\mid o)$. In a classical stack it is a pipeline you can read: state estimation, planner, inverse kinematics, the control loops of lesson 2. In a learned stack some or all of it is a neural network with parameters $\theta$: camera images, joint angles and sometimes a language instruction go in; joint targets, end-effector poses or torques come out, at 10 to 50 Hz for manipulation policies and up to several hundred hertz for locomotion, with the drive's current loop still underneath.

### Imitation learning

The most common way to train manipulation policies today: collect **demonstrations** (usually by teleoperation, a human driving the robot through leader arms, VR or a motion-capture suit), then fit the network to reproduce the demonstrated action for each observation. This is **behaviour cloning**, supervised learning on pairs $(o, a^*)$:`,
        },
        { kind: "equation", formula: "aw07-bc-loss" },
        {
          kind: "md",
          md: md`Its structural weakness is **compounding error**. The policy is trained on states the expert visited. A small mistake moves the robot to a slightly unfamiliar state, where the policy is less accurate, so the next mistake is larger. Ross, Gordon and Bagnell (2011) showed that the expected cost of plain behaviour cloning can grow with the **square** of the horizon, and that collecting corrective labels in the states the policy itself visits (**DAgger**) restores linear growth. Even without distribution shift, independent per-step failures compound:`,
        },
        { kind: "equation", formula: "aw07-episode-success" },
        {
          kind: "md",
          md: md`A policy that fails on 0.1 % of steps completes a 500-step task (10 s at 50 Hz) only 61 % of the time; at 0.2 % it is 37 %. Long-horizon tasks need very reliable steps, recovery behaviour, or both. Modern practice mitigates with **action chunking** (predicting a sequence of actions at once, which reduces the number of decision points), expressive action heads (diffusion or flow matching, which represent several valid ways to do a task instead of averaging them into an invalid one), large and diverse datasets, and demonstrations of recoveries.

### Reinforcement learning

**Reinforcement learning (RL)** trains by trial and error: the policy acts, receives reward $r_t$, and parameters are updated to maximise expected discounted return:`,
        },
        { kind: "equation", formula: "aw07-rl-return" },
        {
          kind: "md",
          md: md`The discount $\gamma$ sets an effective horizon of about $1/(1-\gamma)$ steps: $\gamma = 0.99$ looks about 100 steps ahead. RL needs millions to billions of steps, so robots train it in **simulation** (lesson 5) with thousands of parallel environments on GPUs, using algorithms such as PPO. It is the dominant method for **legged locomotion**: quadrupeds and humanoids walking, recovering from pushes and climbing stairs. Hard parts: reward design (the policy exploits any loophole in the reward), safety during learning, and transfer from simulation to the real robot.

### Robot foundation models and vision-language-action models

The 2023 to 2025 shift was to train one large model on data from many robots and tasks, starting from a model already pretrained on internet images and text. A **vision-language-action (VLA)** model takes camera images and a language instruction ("put the red cup in the sink") and outputs actions. Two output designs exist: **action tokens** (each action dimension discretised into bins and emitted like words) and a continuous **action head** (diffusion or flow matching) attached to the backbone. Many systems split a slow "think" model (a few hertz, scene and instruction understanding) from a fast "act" model (tens to hundreds of hertz, motor commands).

| Model or dataset (year) | Organisation | What it established |
|---|---|---|
| RT-2 (2023) | Google DeepMind | VLM fine-tuned to output discretised action tokens; transfer of web knowledge to robot tasks |
| Open X-Embodiment (2023) | Large academic and industry collaboration | Pooled dataset of over a million real robot trajectories from 22 robot types; cross-robot training helps |
| OpenVLA (2024) | Stanford-led academic team | Open 7-billion-parameter VLA trained on about 970k Open X-Embodiment episodes |
| pi0 (2024) | Physical Intelligence | VLM backbone with a flow-matching action expert producing action chunks for dexterous tasks |
| Helix (2025) | Figure AI | Humanoid VLA split into a slow vision-language system and a fast visuomotor system |
| GR00T N1 (2025) | NVIDIA | Openly released foundation model for humanoids, dual-system design |
| Gemini Robotics (2025) | Google DeepMind | VLA built on Gemini 2.0, with an embodied-reasoning variant |

For the transformer and language-model basics underneath these, see the xref below.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Model details move fast and are self-reported",
          md: md`The architectures, parameter counts, dataset sizes and control rates in the table come from the developers' own papers and announcements (see the references) and from established knowledge, not from the course research brief, and some of them may have been superseded by newer versions during 2026. Performance claims in robot-learning announcements are typically demonstrated on chosen tasks and videos, not on independent benchmarks. Recheck any figure on the primary source before quoting it to a customer or investor.`,
        },
        { kind: "xref", to: "m14-l01", note: "How large language models work (tokens, transformers, probabilistic generation): the backbone a VLA is built on." },
        {
          kind: "flow",
          title: "Inside a typical VLA control stack",
          steps: [
            { label: "Observations", detail: "Camera images, joint states, language instruction" },
            { label: "Vision-language backbone", detail: "Pretrained on web data, fine-tuned on robot data; runs at a few Hz to tens of Hz" },
            { label: "Action head", detail: "Action tokens or a diffusion / flow-matching expert; outputs a chunk of future actions" },
            { label: "Action chunk buffer", detail: "Executed at the control rate while the next inference runs" },
            { label: "Low-level control", detail: "Joint position or impedance targets into the drive loops of lesson 2" },
          ],
          caption: "Everything from the backbone to the action head is weights. A change to any of it, or to preprocessing such as image resolution or action normalisation, changes behaviour everywhere.",
        },
        {
          kind: "md",
          md: md`### What changes when the policy is a neural network

1. **Behaviour has no line-by-line spec.** You cannot read the weights to see what will happen; you can only test.
2. **Changes are global.** Fine-tuning on a new skill can degrade old skills (catastrophic forgetting). A change made for one task invalidates evidence for all tasks until shown otherwise.
3. **Hidden dependencies.** Behaviour depends on weights, training data, preprocessing, action normalisation statistics, camera calibration, control rate, the prompt and the sampling seed. Each must be versioned.
4. **Stochastic outcomes.** The same scene gives different results across trials; evidence is a success **rate** with an uncertainty, not a pass.
5. **Distribution shift.** Performance holds in conditions like the training data and degrades unpredictably outside them: new lighting, objects, floor, wear of the robot itself.

The statistics are simple and unforgiving. With $n$ trials and observed success rate $\hat p$:`,
        },
        { kind: "equation", formula: "aw07-success-ci" },
        { kind: "equation", formula: "aw07-rule-of-three" },
        {
          kind: "chart",
          chart: "bar",
          title: "95 % confidence half-width on an 80 % success rate vs number of trials",
          xKey: "trials",
          xLabel: "Number of trials",
          yLabel: "Half-width (percentage points)",
          series: [{ key: "hw", label: "plus or minus, percentage points" }],
          data: [
            { trials: "10", hw: 24.8 },
            { trials: "25", hw: 15.7 },
            { trials: "50", hw: 11.1 },
            { trials: "100", hw: 7.8 },
            { trials: "200", hw: 5.5 },
            { trials: "400", hw: 3.9 },
            { trials: "800", hw: 2.8 },
          ],
          caption: "Normal approximation, 1.96 standard errors. Precision improves only with the square root of trials: halving the uncertainty costs four times the robot time.",
        },
      ],
    },
    {
      layer: "applied",
      title: "How many trials is evidence?",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "A VLA update claims to improve a pick-and-place skill from 80 % to 85 %",
          given: md`Illustrative humanoid customer. Current policy: 40 successes in 50 trials. New fine-tuned policy: 43 successes in 50 trials on the same task. The robot runs one trial every 2 minutes. Safety requirement for a separate "release grasp near a person" behaviour: show a failure rate below 1 % at 95 % confidence. Policy inference: 100 ms per call, control at 50 Hz, chunk of 50 actions.`,
          steps: [
            { md: md`**Interval on the old policy.** $\hat p = 0.80$, $SE = \sqrt{0.8\times0.2/50} = 0.057$. 95 % interval $0.80 \pm 0.11$: **69 % to 91 %**.` },
            { md: md`**New policy.** $\hat p = 0.86$, $SE = \sqrt{0.86\times0.14/50} = 0.049$, interval about **76 % to 96 %**. The intervals overlap heavily: 50 trials each cannot distinguish 80 % from 85 %.` },
            { md: md`**Trials for a ±5 point interval.** $n = 1.96^2\times0.8\times0.2/0.05^2 = 246$ trials, about 8.2 robot-hours per policy version at 2 minutes per trial.` },
            { md: md`**Trials to detect the 5-point improvement** (two-sided 5 % significance, 80 % power, standard two-proportion formula): about $(1.96 + 0.84)^2(0.16 + 0.1275)/0.05^2 \approx 900$ trials **per arm**, about 60 robot-hours in total. For one skill, one update.` },
            { md: md`**Safety claim.** Zero failures in $n$ trials bounds the failure rate below $3/n$ at 95 %. For below 1 %: $n = 300$ consecutive clean trials (the exact value is 298). One failure resets the argument to a larger $n$.` },
            { md: md`**Latency.** 100 ms inference is 5 control steps at 50 Hz. If inference blocks, the robot pauses 100 ms per 1 s chunk (10 % idle); if it runs asynchronously, each new chunk starts from an observation 5 steps old, which matters when objects move.` },
          ],
          result: md`The update is not shown to be better: 50 trials per version are a demo, not evidence. Proving a 5-point improvement takes about 900 trials per arm, and a 1 % safety bound 300 clean trials. Physical trials are the bottleneck, which is why selecting the right trials after a change (Ripple) and reusing past runs (bench memory) are worth money.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Check a customer's evaluation report",
          given: md`A report says: "New policy: 102 successes in 120 trials. No unsafe events in 150 trials of the handover test." Per-step failure rate of a 200-step drawer-opening task is estimated at 0.1 %.`,
          steps: [
            { md: md`$\hat p = 102/120$.` },
            { md: md`$\hat p = 0.85$; $SE = \sqrt{0.85\times0.15/120} = 0.0326$; half-width $1.96\times0.0326$.` },
            { md: md`Half-width $= 0.064$: interval about 79 % to 91 %.`, hidden: true, check: { prompt: "95 % half-width (fraction)", answer: 0.064, tolerance: { abs: 0.002 } } },
            { md: md`Rule of three on 150 clean trials: upper bound $3/150$.` },
            { md: md`Unsafe-event rate below 2 % at 95 % confidence, not "zero".`, hidden: true, check: { prompt: "Upper bound on unsafe-event rate (fraction)", answer: 0.02, tolerance: { abs: 0.001 } } },
            { md: md`Drawer task: $(1 - 0.001)^{200} = 0.82$ episode success from independent step failures alone.` },
          ],
          result: md`Rewrite the report's claims as intervals: success 79 to 91 %, unsafe events below 2 % (95 %). "No unsafe events" is a statement about 150 trials, not about the policy.`,
        },
        {
          kind: "question",
          question: {
            id: "aw07-l04-p1",
            type: "numeric",
            prompt: md`How many consecutive failure-free trials are needed to claim, at about 95 % confidence, that a behaviour's failure rate is below 0.5 %? (Use the rule of three.)`,
            answer: 600,
            tolerance: { abs: 5 },
            unit: "trials",
            explanation: md`$p_{max} \approx 3/n$, so $n = 3/0.005 = 600$. At 2 minutes per trial that is 20 robot-hours for one behaviour on one software version.`,
            concepts: ["aw07.policy-evaluation"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "How robot-learning teams evaluate, and where it breaks",
      blocks: [
        {
          kind: "md",
          md: md`### Who does it and with what

Robot-learning teams (research and product) train policies; an evaluation function, often small, runs trials. Tools: teleoperation rigs for data collection, dataset formats and libraries such as Hugging Face's LeRobot, simulators (MuJoCo, NVIDIA Isaac Lab) for RL and for cheap pre-screening, experiment trackers, and video plus robot logs from every trial. Artifacts: a dataset card, a model card or release note, and an **evaluation report**: tasks, scenes, number of trials, success rates with intervals, failure taxonomy, interventions.

### A sound evaluation protocol

1. **Fixed task suite** with held-out scenes and objects (not the training scenes), including the long tail: clutter, lighting changes, a worn gripper.
2. **Trial counts set in advance** from the precision needed (the formulas above), and a stop rule, not "until it looks good".
3. **Randomised order and blind scoring** where possible; a clear definition of success and of an intervention.
4. **Paired comparison**: old and new policy on the same scenes in interleaved order, so drift in the robot or room affects both.
5. **Full provenance**: weights hash, training data version, normalisation statistics, preprocessing, control rate, robot hardware revision and calibration, prompt, seed.
6. **Regression across all skills** after any weight change, scaled by risk, because changes are global.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- **Evaluated on training scenes.** High success that disappears in a new kitchen.
- **Videos as evidence.** Cherry-picked, sometimes sped up or teleoperated; useful for marketing, worthless as validation.
- **Too few trials.** 10 to 20 trials per condition cannot separate versions (plus or minus 18 to 25 points).
- **Normalisation mismatch.** Action or observation statistics from one dataset used with a model trained on another: the policy behaves erratically with no code change.
- **Hardware drift ignored.** The policy is blamed for a worn joint or a moved camera; without bench data on the robot itself you cannot tell.
- **Only the new skill tested.** Fine-tuning for task B silently breaks task A.`,
        },
        {
          kind: "ask",
          title: "Questions for a robot-learning lead",
          items: [
            "How many trials do you run per skill per release, and how did you choose that number?",
            "When you fine-tune for a new skill, which old skills do you re-evaluate?",
            "Can you reproduce last month's evaluation run exactly: weights, data, normalisation, robot calibration?",
            "When a policy fails in the field, how do you tell a model problem from a hardware problem?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw07-l04-p2",
            type: "short",
            prompt: md`A humanoid customer releases a new VLA checkpoint every two weeks. Write the **evaluation protocol** you would propose they run with Lockstep and Ripple for each release: task suite structure, trial counts with the reasoning, pairing and stop rules, what Lockstep records per trial, and how Ripple should decide which skills to re-evaluate in full vs a smoke test. Illustrative numbers allowed, labelled.`,
            rubric: [
              "Task suite with held-out scenes and a mix of core, long-tail and safety-relevant skills",
              "Trial counts justified from the binomial standard error, a detectable difference, or the rule of three, with correct arithmetic",
              "Paired, interleaved comparison of old vs new checkpoint and pre-registered stop or pass rules",
              "Per-trial provenance including weights hash, data and normalisation version, robot hardware and calibration, control rate, seed, synchronised video and robot signals",
              "Ripple logic that treats weight changes as global (all skills at least smoke-tested) and escalates full evaluation by risk and by which data or skills the fine-tune touched",
            ],
            modelAnswer: md`**Release evaluation protocol v0 (illustrative)**

**Suite:** 12 core skills, 6 long-tail variants (new objects, low light, clutter), 2 safety behaviours (handover, stop on contact). Held-out scenes only.

**Counts:** smoke test 20 trials per skill (catches collapses: a drop from 85 % to 50 % is visible). Full evaluation 250 trials per skill (±5 points at 80 %). Safety behaviours: 300 consecutive clean trials per release (failure below 1 % at 95 %); any failure stops the release.

**Pairing:** old and new checkpoints interleaved on the same scene list, random order, scorer blind to version. Pass: new lower bound not below old point estimate minus 3 points on any core skill.

**Lockstep per trial:** synchronised video, joint states, commands and drive currents on one clock; weights hash, dataset and normalisation version, prompt, seed, control rate, robot serial, calibration file hash, gripper wear counter; outcome and intervention flags.

**Ripple rules:** any weight change triggers a smoke test on all skills (changes are global). Full evaluation for skills whose training data was added or changed in the fine-tune, skills sharing objects or motions with them, any skill whose smoke result moved by more than 10 points, and both safety behaviours. Preprocessing or normalisation changes trigger full evaluation of everything.`,
            explanation: md`A good protocol fixes counts from statistics rather than habit, treats every weight change as potentially global, and records enough provenance to reproduce and compare runs.`,
            concepts: ["aw07.policy-evaluation", "aw07.vla", "aw07.policy"],
            difficulty: 3,
          },
        },
        { kind: "sources", refs: ["aw07-r21", "aw07-r25", "aw07-r26", "aw07-r27", "aw07-r28", "aw07-r29", "aw07-r30", "aw07-r31", "aw07-r35", "aw07-r37"] },
        {
          kind: "feynman",
          prompt: "Explain to a hardware test engineer who has only tested deterministic firmware why a learned policy needs hundreds of trials per release, and why a change for one skill can break another.",
          keyPoints: [
            "The policy's behaviour is in its weights, not readable code, so only tests reveal it",
            "Outcomes vary from trial to trial, so evidence is a success rate with a confidence interval",
            "Precision improves with the square root of trials: halving uncertainty costs four times the trials",
            "Zero failures in n trials only bounds the failure rate at about 3/n",
            "Fine-tuning changes shared weights, so other skills can regress (catastrophic forgetting)",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw07-l04-q1",
      type: "numeric",
      prompt: md`A policy fails independently on 0.05 % of steps. What is the probability of completing a 1,000-step task without failure (2 decimals)?`,
      answer: 0.61,
      tolerance: { abs: 0.01 },
      explanation: md`$(1 - 0.0005)^{1000} = e^{1000\ln(0.9995)} \approx e^{-0.50} = 0.61$. Long horizons demand very reliable steps or recovery.`,
      concepts: ["aw07.imitation-learning"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "aw07-l04-q2",
      type: "mcq",
      prompt: "Why does plain behaviour cloning suffer from compounding errors?",
      options: [
        "Because neural networks cannot represent continuous actions",
        "Because small mistakes take the robot into states the expert never visited, where the policy is less accurate, so mistakes grow",
        "Because the reward function is badly designed",
        "Because demonstrations are always too slow",
      ],
      answer: 1,
      explanation: md`Distribution shift between expert states and the policy's own states. DAgger collects corrective labels in the policy's own states; action chunking and recovery demonstrations also help.`,
      concepts: ["aw07.imitation-learning"],
      difficulty: 1,
    },
    {
      id: "aw07-l04-q3",
      type: "numeric",
      prompt: md`How many trials give a 95 % confidence half-width of ±4 percentage points on a success rate around 90 %? (Round up.)`,
      answer: 217,
      tolerance: { abs: 1 },
      unit: "trials",
      explanation: md`$n = 1.96^2\times0.9\times0.1/0.04^2 = 3.8416\times0.09/0.0016 = 216.1$, so 217 trials.`,
      concepts: ["aw07.policy-evaluation"],
      difficulty: 2,
    },
    {
      id: "aw07-l04-q4",
      type: "multi",
      prompt: "Which of these must be versioned for a learned policy's evaluation to be reproducible? (Select all that apply.)",
      options: [
        "Model weights",
        "Action and observation normalisation statistics",
        "Camera calibration and robot hardware revision",
        "Control rate and preprocessing (for example image resolution)",
        "The colour of the robot's casing",
      ],
      answer: [0, 1, 2, 3],
      explanation: md`Behaviour depends on weights and on everything that shapes inputs and outputs. Casing colour matters only if it appears in the cameras' view, which is a scene property, not a version.`,
      concepts: ["aw07.policy", "aw07.policy-evaluation"],
      difficulty: 1,
    },
    {
      id: "aw07-l04-q5",
      type: "mcq",
      prompt: "What is action chunking in a VLA?",
      options: [
        "Splitting the training dataset into chunks for parallel training",
        "Predicting a sequence of future actions per inference so a slow model can drive a faster control loop",
        "Compressing actions into language tokens for the user",
        "Running several robots on one model",
      ],
      answer: 1,
      explanation: md`A chunk of, say, 50 actions at 50 Hz covers one second. It reduces decision points and hides inference latency, at the cost of reacting more slowly to changes inside the chunk.`,
      concepts: ["aw07.action-chunking"],
      difficulty: 1,
    },
    {
      id: "aw07-l04-q6",
      type: "decision",
      prompt: md`A customer fine-tuned their VLA to add a new "fold towel" skill. They want to evaluate only towel folding before release. What do you recommend?`,
      options: [
        { text: "Agree: the other skills' code did not change.", score: 0, feedback: "There is no per-skill code: the shared weights changed, so every skill may have regressed." },
        { text: "Smoke-test every skill, run full evaluation on towel folding, skills sharing objects or motions with it, and safety behaviours.", score: 1, feedback: "Right: treat the change as global, but scale effort by risk and relatedness." },
        { text: "Run the full evaluation on every skill.", score: 0.5, feedback: "Safe but expensive; a smoke test on unrelated skills catches collapses at a fraction of the cost." },
      ],
      explanation: md`Weight changes are global. A tiered response (smoke test everywhere, full evaluation where related or safety-relevant) is the Ripple logic for learned policies.`,
      concepts: ["aw07.policy-evaluation", "aw07.vla"],
      difficulty: 2,
    },
    {
      id: "aw07-l04-q7",
      type: "numeric",
      prompt: md`An RL setup uses discount factor $\gamma = 0.995$. What is its effective horizon in steps?`,
      answer: 200,
      tolerance: { abs: 1 },
      unit: "steps",
      explanation: md`$1/(1-\gamma) = 1/0.005 = 200$ steps; at 50 Hz that is about 4 s of look-ahead.`,
      concepts: ["aw07.reinforcement-learning"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "aw07-l04-f1", front: "Policy", back: md`$\pi(a\mid o)$: mapping from observations to actions. Learned policies keep their behaviour in weights.`, concepts: ["aw07.policy"] },
    { id: "aw07-l04-f2", front: "Behaviour cloning vs DAgger", back: "BC fits expert demonstrations and compounds errors (cost up to quadratic in horizon); DAgger adds expert labels on the policy's own states (linear).", concepts: ["aw07.imitation-learning"] },
    { id: "aw07-l04-f3", front: "Episode success from per-step failure p over T steps", back: md`$(1-p)^T$: 0.1 % per step over 500 steps gives 61 %.`, concepts: ["aw07.imitation-learning"] },
    { id: "aw07-l04-f4", front: "VLA", back: "Vision-language-action model: pretrained VLM backbone plus action tokens or a diffusion/flow action head, trained on multi-robot demonstrations, conditioned on language.", concepts: ["aw07.vla"] },
    { id: "aw07-l04-f5", front: "Confidence interval on a success rate", back: md`$\hat p \pm 1.96\sqrt{\hat p(1-\hat p)/n}$; for ±5 points at 80 %: 246 trials.`, concepts: ["aw07.policy-evaluation"] },
    { id: "aw07-l04-f6", front: "Rule of three", back: md`0 failures in $n$ trials: failure rate below $3/n$ at 95 %. Below 1 % needs 300 clean trials.`, concepts: ["aw07.policy-evaluation"] },
    { id: "aw07-l04-f7", front: "Where RL dominates in robotics", back: "Legged locomotion trained in massively parallel simulation (for example with PPO), then transferred to the real robot.", concepts: ["aw07.reinforcement-learning"] },
  ],
};

export default lesson;
