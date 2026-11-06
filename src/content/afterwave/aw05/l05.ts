import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw05-l05",
  title: "Physical and model changes are different: recalibration, sensor swaps, retrained models, nondeterminism and sim-to-real",
  summary:
    "Why code-centred change impact breaks in physical AI: a taxonomy of firmware, calibration, ML model, rig instrument, fixture, DUT hardware and rig software changes; recalibration as a change to the evidence rather than the product (bias, uncertainty, TUR and re-evaluation from recorded raw data); sensor swaps that change dynamics; model retrains that change every weight and need behavioural replay; nondeterminism that turns reruns into statistical experiments; and the sim-to-real gap.",
  minutes: 85,
  objectives: [
    "Classify a change event and state the evidence and default rerun logic for its class",
    "Apply the re-evaluation rule after a recalibration using bias, expanded uncertainty and margin, and compute TUR",
    "Explain how a sensor swap changes dynamic test results through delay and bandwidth",
    "Localise a model retrain with behavioural replay and a divergence rate",
    "Size a statistical rerun for a success-rate or continuous metric, and say when simulation can triage a physical rerun",
  ],
  concepts: [
    { id: "aw05.change-taxonomy", name: "Change taxonomy for physical AI", description: "Firmware code, calibration data, ML model, rig instrument, fixture, DUT hardware and rig software changes differ in locality, evidence and rerun logic.", competency: "aw-impact", related: ["aw05.edge-provenance"] },
    { id: "aw05.recalibration-impact", name: "Recalibration impact", description: "A recalibration changes the evidence, not the product: results within bias plus expanded uncertainty of a limit are re-evaluated, from recorded raw data where possible.", competency: "aw-impact", related: ["aw05.signal-sensitivity"] },
    { id: "aw05.sensor-swap", name: "Sensor and fixture swaps", description: "A new sensor or fixture changes resolution, bandwidth, delay or stiffness of the measurement chain, which mostly affects dynamic tests; measured with a golden-unit baseline.", competency: "aw-impact", related: ["aw05.recalibration-impact"] },
    { id: "aw05.model-change", name: "Behavioural impact of a model retrain", description: "A retrain changes every weight, so structure says 'everything changed'; replaying recorded inputs through old and new model localises the change in behaviour space.", competency: "aw-physical-ai", related: ["aw05.coverage-based-selection"] },
    { id: "aw05.statistical-rerun", name: "Statistical reruns under nondeterminism", description: "Physical and learned-policy tests vary run to run, so a rerun is an experiment sized for power: about 150 trials to detect 95 % to 90 % success.", competency: "aw-physical-ai" },
    { id: "aw05.sim-to-real", name: "Sim-to-real gap in test selection", description: "Simulation can triage physical reruns only for test families where sim and rig results are shown to agree; elsewhere the rig decides.", competency: "aw-physical-ai", related: ["aw05.model-change"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Seven kinds of change, seven kinds of impact",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`This lesson is Afterwave's positioning in technical form. Software test selection tools assume that only code changes and that runs are repeatable. Physical AI labs change rigs, recalibrate instruments, retrain models, and get different results from the same build twice. If you can explain to a buyer exactly why their encoder swap or their grasp model retrain is invisible to code-centred tools, and what Ripple does instead, you are selling the one thing the research brief found nobody offering.`,
        },
        {
          kind: "md",
          md: md`### The taxonomy

| Change class | What actually changed | Locality | Evidence of impact | Default rerun logic | Can recorded data answer it? |
|---|---|---|---|---|---|
| **Firmware code** | Product behaviour | Local in code | Code coverage, call graph, history | Coverage plus cost rule | No: product changed |
| **Calibration data** (tables, gains) | Product behaviour in some operating regions | Local in data space | Table-cell coverage, envelope | Tests that visited changed cells | No: product changed |
| **ML model** (retrain, fine-tune) | Product behaviour, potentially everywhere | Global in weights, local in behaviour | Replay divergence, sim results | Tests sampling divergent regions, with statistical reruns | Partly: replay is offline |
| **Rig instrument recalibration** | The measurement, not the product | Per channel | Certificate: bias, uncertainty | Re-evaluate results near limits | **Yes**: correct raw data first |
| **Rig sensor or fixture swap** | Measurement chain dynamics, mounting | Per channel or fixture | Datasheets, golden-unit baseline | Dynamic tests, baseline comparison | Partly |
| **DUT hardware revision** (ECO) | Product physics | Via BOM | BOM-to-function graph, history | Broad, by function | No |
| **Rig software** (DAQ firmware, sequencer, drivers) | Timing, scaling, filtering of measurements | Often global and silent | Version records, baseline | Smoke plus baseline comparison | Sometimes |

Two columns do most of the work. **Locality** decides whether structure can narrow the selection at all. **"Can recorded data answer it?"** decides whether a rerun needs rig hours or only compute: if the product did not change, a correction applied to recorded raw signals may settle the question at zero rig cost. That only works if raw signals were kept, which is the Lockstep argument.

### Recalibration: the evidence moved, not the product

A calibration certificate reports **as-found** (how wrong the instrument was before adjustment) and **as-left** values, with an uncertainty. Two things matter for past and future results:
- a **bias** $\Delta b$: the instrument read high or low by a known amount during the period since the last calibration;
- a new **expanded uncertainty** $U$, from the GUM law of propagation:`,
        },
        { kind: "equation", formula: "aw05-combined-uncertainty" },
        {
          kind: "md",
          md: md`The adequacy of the measurement for a limit is summarised by the test uncertainty ratio:`,
        },
        { kind: "equation", formula: "aw05-tur" },
        {
          kind: "md",
          md: md`and the impact rule is about margins, as in Lesson 3:`,
        },
        { kind: "equation", formula: "aw05-recal-margin" },
        {
          kind: "md",
          md: md`Results far from their limits are unaffected. Results within $|\Delta b| + U$ of a limit could flip. ISO/IEC 17025 expects a lab to evaluate the effect of an out-of-tolerance calibration finding on results already reported; ILAC-G8 describes the decision rules (guard bands) for results near a limit. Ripple turns this from a manual review into a query: which tests used this channel since the last good calibration, and which of them passed within the bias plus uncertainty of a limit?

### Sensor and fixture swaps: dynamics change

A replacement sensor can have the same calibration and different **dynamics**: resolution, bandwidth, filtering, latency, mounting stiffness. Static tests (steady-state efficiency) barely notice; dynamic tests (step response, ripple, control loop stability) do. Example: an encoder with 50 µs more interpolation delay in a speed loop with 200 Hz crossover adds phase lag $\Delta\varphi = 360° \cdot f_c \cdot \tau = 360 \times 200 \times 50 \times 10^{-6} = 3.6°$. Phase margin falls by the same amount, and overshoot in the torque or speed step test rises. The clean way to quantify a swap is a **golden-unit baseline**: run a reference DUT on the rig before and after, and measure the shift per test directly.

### ML model changes: no locality in structure

Retraining a grasp policy or a perception model changes essentially every weight. Coverage-style reasoning ("which tests execute the changed part?") returns everything. But behaviour often changes only in some regions: transparent objects, a certain speed range, cluttered scenes. Localise it by **replay**: run recorded inputs from bench memory (observations, states) through both versions offline and measure divergence per region:`,
        },
        { kind: "equation", formula: "aw05-divergence-rate" },
        {
          kind: "flow",
          title: "Impact analysis for a model retrain",
          steps: [
            { label: "Register the new version", detail: "Model id, training data snapshot, intended change" },
            { label: "Offline replay", detail: "Recorded inputs from bench memory through old and new model" },
            { label: "Divergence by region", detail: "D_r per object class, speed range, scene type" },
            { label: "Simulation pass", detail: "Task metrics in sim for divergent regions, where sim is validated" },
            { label: "Physical selection", detail: "Rig tests that sample divergent regions, plus mandatory safety tests" },
            { label: "Statistical rerun", detail: "Enough trials for the effect size that matters" },
          ],
          caption: "Replay and simulation cost compute, not rig hours. The rig is reserved for the regions where behaviour moved.",
        },
        {
          kind: "md",
          md: md`Replay has a limit: it shows how outputs change on **old** inputs. In closed loop the new policy visits different states than the old one did (distribution shift), so low divergence on replay is necessary but not sufficient evidence. That is why the last two steps exist.

### Nondeterminism: a rerun is an experiment

Physical tests are not repeatable to the last digit: thermal state, friction, noise, contact dynamics, and stochastic policies. A single pass after a change says little about a success-rate metric. To detect a drop from $p_0$ to $p_1$ with false-alarm rate $\alpha$ and power $1 - \beta$:`,
        },
        { kind: "equation", formula: "aw05-binomial-n" },
        {
          kind: "md",
          md: md`and for continuous metrics with run-to-run standard deviation $\sigma$:`,
        },
        { kind: "equation", formula: "aw05-two-sample-n" },
        {
          kind: "chart",
          chart: "line",
          title: "Power to detect a success-rate drop from 95 % to 90 % (one-sided, 5 % false-alarm rate)",
          xKey: "trials",
          xLabel: "Trials in the rerun",
          yLabel: "Probability of detecting the drop",
          series: [{ key: "power", label: "Power" }],
          data: [
            { trials: 20, power: 0.33 },
            { trials: 50, power: 0.49 },
            { trials: 100, power: 0.68 },
            { trials: 150, power: 0.8 },
            { trials: 200, power: 0.88 },
            { trials: 300, power: 0.96 },
          ],
          caption: "Normal approximation. A 20-trial rerun misses a real 5-point degradation two times out of three.",
        },
        {
          kind: "md",
          md: md`Consequences for selection: (1) the **cost** of a rerun for a stochastic test is trials times trial duration, which can dwarf a deterministic test; (2) Ripple must know each test's **repeatability** $\sigma$ from repeated baseline runs in bench memory; (3) a failure on one run may be noise, so flake classification (Lesson 4) needs repeat statistics, not a single retry.

### Sim-to-real

Simulation is cheap and parallel, so it is tempting to let it decide which physical tests to rerun. It can, **per test family**, where sim and rig results are shown to agree: for example, across past model versions, sim success rate predicts rig success rate with a small, stable gap. Where the reality gap is large (contact-rich manipulation, deformables, friction-dominated behaviour), sim can rank but not clear a test. Domain randomisation (Tobin et al., 2017) narrows the gap for training; it does not remove the need to validate the correlation for the test family you want to triage.

### Why physical AI makes all of this harder

- More change classes, most of them invisible to code tools.
- Changes to the measurement are as frequent as changes to the product.
- Learned components remove structural locality.
- Nondeterminism multiplies rerun cost and blurs pass and fail.
- Simulation helps only where its agreement with the rig is measured.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Regulatory angle: ML safety functions and model changes",
          md: md`Per the research brief (secondary sources, Nov 2026), the EU Machinery Regulation 2023/1230, applying from 20 January 2027, lists in **Annex I Part A** safety components with fully or partially self-evolving behaviour using machine learning to ensure safety functions, and machinery embedding them; these require third-party (notified-body) conformity assessment. Annex III essential requirement 1.2.1 reportedly addresses control-system safety including self-evolving behaviour and logging. The primary OJ wording was not read. The practical inference (not a legal conclusion): for an ML model that performs a safety function, each retrain needs evidence of which safety tests were rerun and why, which is exactly the record Ripple produces. Check the primary text before using this in sales material.`,
        },
        { kind: "sources", refs: ["aw05-r23", "aw05-r24", "aw05-r25", "aw05-r26", "aw05-r27", "aw05-r12"] },
      ],
    },
    {
      layer: "applied",
      title: "Recalibrations, statistical reruns and model changes in numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "A torque transducer reads high: which past verdicts flip?",
          given: md`Illustrative dyno. Annual calibration finds the torque transducer read **0.4 % high** (as-found) since the last calibration; after adjustment its expanded uncertainty is $U = 0.15\%$ of reading ($k = 2$). Three tests used it in that period:
- (a) rated torque at rated current: limit at least 50.0 Nm, recorded 50.15 Nm;
- (b) peak torque: limit at least 50.0 Nm, recorded 51.20 Nm;
- (c) drive efficiency at the rated point: $\eta = T\omega / P_{el}$, limit at least 95.0 %, recorded 95.3 % (electrical power uncertainty contributes $U \approx 0.2$ points to $\eta$).`,
          steps: [
            { md: md`**Rule:** re-evaluate if margin $< |\Delta b| + U$. (a) margin 0.15 Nm; $\Delta b = 0.004 \times 50.15 = 0.20$ Nm, $U = 0.0015 \times 50 = 0.075$ Nm; $0.15 < 0.275$: **re-evaluate**. (b) margin 1.20 Nm $\gg 0.28$: keep. (c) efficiency is proportional to the torque reading, so $\Delta b = 0.004 \times 95.3 = 0.38$ points; margin 0.30 $< 0.38 + 0.2$: **re-evaluate**.` },
            { md: md`**Correct the recorded values** (the instrument read high, so divide): (a) $50.15/1.004 = 49.95$ Nm: **fails** the 50.0 Nm limit. (c) $95.3/1.004 = 94.92\%$: **fails** the 95.0 % limit. (b) $51.20/1.004 = 51.00$ Nm: still passes with margin.` },
            { md: md`**TUR** for (a) if the tolerance were $\pm 0.5$ Nm around 50 Nm: $1.0/(2 \times 0.075) = 6.7$, above the common 4:1 rule; the issue was the bias, not the uncertainty.` },
            { md: md`**Rig hours used:** zero, if the raw torque and power signals were recorded: the correction is applied to stored data and the verdicts recomputed. Without raw data, (a) and (c) must be rerun on the rig, and any report issued with the old verdicts reviewed.` },
          ],
          result: md`Two of three verdicts flip from pass to fail after a 0.4 % calibration finding, and both can be settled from recorded data with no rig time. The product did not change at all: the evidence did.`,
        },
        {
          kind: "worked",
          mode: "worked",
          title: "How many pick-and-place trials does a model retrain need?",
          given: md`Illustrative humanoid manipulation cell. Baseline grasp success on the standard object set is 95 %. A drop to 90 % would be unacceptable. One-sided $\alpha = 0.05$ ($z = 1.645$), power 80 % ($z = 0.842$). One trial takes 2 minutes including reset.`,
          steps: [
            { md: md`$\sqrt{p_0 q_0} = \sqrt{0.95 \times 0.05} = 0.218$; $\sqrt{p_1 q_1} = \sqrt{0.9 \times 0.1} = 0.300$.` },
            { md: md`$n = \left(\frac{1.645 \times 0.218 + 0.842 \times 0.300}{0.05}\right)^2 = \left(\frac{0.3585 + 0.2525}{0.05}\right)^2 = 12.22^2 = 149.3$, so **150 trials**.` },
            { md: md`**Rig time:** $150 \times 2 = 300$ min = 5 h per object set. The team's habit of 20 trials gives power of about 33 % (chart above).` },
            { md: md`**Where replay helps:** if replay shows divergence only for transparent and deformable objects, spend the 150 trials there, and run a smaller confirmation set elsewhere, instead of 150 trials on every object class.` },
          ],
          result: md`150 trials (5 h) per region where behaviour may have moved. Selection for stochastic tests is about where to spend trials, not only which tests to run.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A continuous metric and a TUR",
          given: md`(a) Torque rise time has a run-to-run standard deviation of 0.4 ms (from 30 baseline runs in bench memory). A shift of 0.5 ms matters. One-sided $\alpha = 0.05$, power 80 %. (b) A current measurement has tolerance $\pm 2$ A and expanded uncertainty $U_{95} = 0.4$ A after a shunt swap.`,
          steps: [
            { md: md`(a) $n = 2(1.645 + 0.842)^2 \times 0.4^2 / 0.5^2 = 2 \times 6.185 \times 0.16 / 0.25$.` },
            { md: md`$= 7.9$, so **8 runs** on each of the old and new configuration.`, hidden: true, check: { prompt: "Runs per configuration", answer: 7.9, tolerance: { abs: 0.2 } } },
            { md: md`(b) $TUR = (USL - LSL)/(2U_{95}) = 4/(2 \times 0.4)$.` },
            { md: md`$= 5$: adequate against a 4:1 rule.`, hidden: true, check: { prompt: "TUR", answer: 5, tolerance: { abs: 0.05 } } },
          ],
          result: md`Eight runs per side for the rise-time comparison, and a TUR of 5 for the current measurement. Both numbers come from data Ripple can only know if repeat runs and calibration records live in bench memory.`,
        },
        {
          kind: "question",
          question: {
            id: "aw05-l05-p1",
            type: "numeric",
            prompt: md`A holding-torque test requires at least 12.00 Nm and recorded 12.05 Nm. The transducer's calibration later shows it read 0.6 % high during that period. What is the corrected result? (Nm, 2 decimals)`,
            answer: 11.98,
            tolerance: { abs: 0.01 },
            unit: "Nm",
            explanation: md`$12.05/1.006 = 11.978 \approx 11.98$ Nm: the verdict flips to fail. The margin (0.05 Nm) was smaller than the bias ($0.006 \times 12.05 = 0.072$ Nm), so the re-evaluation rule flagged it.`,
            concepts: ["aw05.recalibration-impact"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Change intake in a physical AI lab",
      blocks: [
        {
          kind: "md",
          md: md`### What has to be captured for each change class

| Class | Minimum metadata | Usual system of record |
|---|---|---|
| Firmware | Build hash, module diff, A2L version | Build server, git |
| Calibration data | Parameter set id, changed parameters and cells | Calibration tool exports |
| ML model | Model id, parent id, training data snapshot, intended change, eval metrics | Model registry (for example MLflow) |
| Rig instrument | Asset id, serial, certificate with as-found, as-left and $U$ | Asset and calibration database |
| Sensor or fixture swap | Old and new serials, datasheet differences, golden-unit result | Logbook (often paper), asset database |
| DUT hardware | Revision, ECO number, BOM diff | PLM |
| Rig software | DAQ firmware, driver, sequencer versions | Usually nowhere: capture automatically |

Sensors that support transducer electronic data sheets (IEEE 1451.4 TEDS) let the DAQ read the sensor's identity and calibration automatically, which turns a swap into a recorded event. For everything else, the capture app has to record rig state at the start of each run (channel configuration, sensor serials, software versions), so that **silent changes** become change events instead of mysteries.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "The changes that never get logged",
          md: md`- DAQ or driver update pushed by IT over a weekend.
- Cable or connector swap after a fault, with no logbook entry.
- Fixture re-shimmed or re-torqued; wear on couplings after hundreds of cycles.
- Thermal chamber controller retuned.
- Sensor moved to another rig "for a day" and back.
- Model hot-fixed on the robot by a researcher, outside the registry.

Each looks like a product regression when a test fails, and each poisons history (Lesson 4) if not captured.`,
        },
        {
          kind: "checklist",
          title: "Default rules to agree with a lab before the pilot",
          items: [
            "Instrument recalibration: re-evaluate results within bias plus U of a limit since the last good calibration; recompute from raw data first",
            "Sensor or fixture swap: golden-unit baseline on the affected dynamic tests before any DUT results are compared with earlier ones",
            "Model retrain: offline replay divergence report, then physical tests in divergent regions with trial counts sized for the agreed effect",
            "Safety-function tests rerun after any model change that touches a safety-relevant output",
            "Rig software change: smoke suite plus baseline comparison",
            "Unlogged change discovered: affected period marked, its results flagged until reviewed",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask a humanoid or actuator test lead",
          items: [
            "When an instrument is found out of tolerance, how do you decide which past results to revisit today?",
            "Do you keep raw signals, or only the computed metrics and verdicts?",
            "How many trials do you run per grasp or locomotion test after a model update, and how was that number chosen?",
            "For which test families do you trust simulation results, and on what evidence?",
            "Where would a cable swap or a DAQ driver update be recorded?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw05-l05-p2",
            type: "short",
            prompt: md`Write Ripple's **change intake specification** for a humanoid actuator and manipulation lab (illustrative: 3 actuator rigs, one manipulation cell, firmware weekly, policy models retrained every few weeks, instruments calibrated annually). For each change class, give the metadata that must be captured, how it is captured (automatic or manual), and the default impact rule, including how stochastic tests are rerun.`,
            rubric: [
              "Covers at least firmware, calibration data, ML model, instrument recalibration, sensor or fixture swap and rig software",
              "Specifies concrete metadata per class (hashes, model and parent id, certificate as-found and U, serials)",
              "Prefers automatic capture (build hooks, registry, TEDS, rig-state snapshot per run) and says what stays manual",
              "Gives a default impact rule per class consistent with the lesson (margin rule, golden-unit baseline, replay divergence)",
              "Sizes stochastic reruns statistically with an effect size and power, not a fixed habit",
              "Uses recorded raw data to avoid rig hours where the product did not change",
            ],
            explanation: md`Change classes differ in locality and in whether recorded data can answer the question. A good intake spec captures metadata automatically wherever possible, uses raw data before rig hours, and sizes stochastic reruns for an agreed effect and power.`,
            modelAnswer: md`**Firmware:** build hash, module diff, A2L version; automatic from the build server hook. Rule: coverage and history score with the cost rule; mandatory safety set.

**Calibration data:** parameter set id and changed cells; automatic from the calibration tool export. Rule: tests whose recorded operating points visited changed cells.

**Policy model:** model id, parent id, training data snapshot id, intended change, offline eval; automatic from the registry (models deployed outside it block the run). Rule: replay last month's recorded observations through both versions; regions with divergence rate above 2 % get physical tests; trials sized for detecting a 5-point success drop at 80 % power (about 150 trials from a 95 % baseline); other regions get a 30-trial confirmation set; any change in a safety-relevant output (force limits, speed limits near humans) triggers the full safety family.

**Instrument recalibration:** asset id, certificate, as-found bias, as-left, $U$; manual entry from the certificate within 2 days, validated against the asset database. Rule: recompute all results since the previous good calibration from raw data; flag verdicts within $|\Delta b| + U$ of limits; rerun only where raw data is missing.

**Sensor or fixture swap:** old and new serials, datasheet bandwidth and delay; automatic for TEDS sensors, manual via a tablet form otherwise. Rule: golden-unit baseline on dynamic tests; earlier results not compared with later ones until the baseline shift is known.

**Rig software:** DAQ firmware, drivers, sequencer version; automatic rig-state snapshot at the start of every run. Rule: smoke suite plus golden-unit baseline.

**Unlogged change detected** (snapshot differs from last run): run blocked until a human classifies it.`,
            concepts: ["aw05.change-taxonomy", "aw05.recalibration-impact", "aw05.model-change", "aw05.statistical-rerun"],
            difficulty: 3,
          },
        },
        { kind: "scenario", scenario: "aw05-s2" },
        {
          kind: "feynman",
          prompt: "Explain to a software-minded investor why 'rerun the tests that touch the changed code' does not work for a humanoid robot lab.",
          keyPoints: [
            "Many changes are not code: calibration tables, retrained models, recalibrated instruments, swapped sensors, rig software",
            "A recalibration changes the evidence, not the robot, and can often be settled from recorded raw data",
            "A retrained model changes every weight, so behaviour has to be compared by replaying recorded inputs",
            "Physical runs are not repeatable, so a rerun is a statistical experiment with a trial count",
            "Simulation helps only where it has been shown to agree with the rig",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw05-l05-q1",
      type: "mcq",
      prompt: "Which change can often be resolved with zero rig hours if raw signals were recorded?",
      options: ["A firmware change to the current loop", "A retrained grasp policy", "A recalibration of the torque transducer", "A new DUT hardware revision"],
      answer: 2,
      explanation: md`The product did not change, only the measurement. Apply the correction to recorded raw data and recompute the verdicts.`,
      concepts: ["aw05.recalibration-impact", "aw05.change-taxonomy"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw05-l05-q2",
      type: "numeric",
      prompt: md`A tolerance of 10.0 ± 0.3 N is measured with an expanded uncertainty of 0.05 N. What is the TUR?`,
      answer: 6,
      tolerance: { abs: 0.01 },
      explanation: md`$TUR = 0.6/(2 \times 0.05) = 6$.`,
      concepts: ["aw05.recalibration-impact"],
      difficulty: 1,
    },
    {
      id: "aw05-l05-q3",
      type: "numeric",
      prompt: md`An encoder swap adds 80 µs of delay in a loop with 150 Hz crossover. How much phase margin is lost, in degrees? (1 decimal)`,
      answer: 4.3,
      tolerance: { abs: 0.05 },
      unit: "°",
      explanation: md`$\Delta\varphi = 360 \times 150 \times 80 \times 10^{-6} = 4.32°$. Dynamic tests near their overshoot or stability limits need a baseline rerun.`,
      concepts: ["aw05.sensor-swap"],
      difficulty: 2,
    },
    {
      id: "aw05-l05-q4",
      type: "mcq",
      prompt: "Why does low divergence on replay not prove a retrained policy is unchanged in closed loop?",
      options: [
        "Replay is slower than real time",
        "In closed loop the new policy visits different states than the old one did, so replayed old inputs do not cover them",
        "Replay uses simulation physics",
        "Divergence is measured in the wrong units",
      ],
      answer: 1,
      explanation: md`Distribution shift: replay tests the new model on the old model's state distribution. It localises likely change; closed-loop tests confirm it.`,
      concepts: ["aw05.model-change"],
      difficulty: 2,
    },
    {
      id: "aw05-l05-q5",
      type: "numeric",
      prompt: md`To detect a drop in success rate from 90 % to 80 % (one-sided α = 0.05, power 80 %), how many trials are needed? Use $z$ = 1.645 and 0.842. (Round up to a whole number.)`,
      answer: 69,
      tolerance: { abs: 1 },
      explanation: md`$\sqrt{0.9 \times 0.1} = 0.3$, $\sqrt{0.8 \times 0.2} = 0.4$. $n = ((1.645 \times 0.3 + 0.842 \times 0.4)/0.1)^2 = ((0.4935 + 0.3368)/0.1)^2 = 8.303^2 = 68.9$, so **69 trials**. A bigger effect needs far fewer trials than the 95 % to 90 % case (150). A two-sided test or a two-sample design needs more.`,
      concepts: ["aw05.statistical-rerun"],
      difficulty: 2,
    },
    {
      id: "aw05-l05-q6",
      type: "decision",
      prompt: md`A team wants to stop rig testing a family of contact-rich insertion tests after model updates and rely on simulation instead, because sim runs are 50 times cheaper. You have no record of how sim and rig results compared for past model versions. What do you recommend?`,
      options: [
        { text: "Approve: simulation is the industry direction.", score: 0, feedback: "Contact-rich behaviour is where the reality gap is usually largest; without measured agreement the sim result proves nothing about the rig." },
        { text: "Run both sim and rig for the next several model versions, measure the sim-to-rig agreement for this family, and allow sim triage only if the gap is small and stable; keep safety tests on the rig.", score: 1, feedback: "Correct: earn the right to triage with evidence, per test family." },
        { text: "Never use simulation for any selection decision.", score: 0.3, feedback: "Too strong: where agreement is demonstrated, sim triage saves real rig time." },
      ],
      explanation: md`Simulation can triage physical reruns only where its agreement with the rig is measured for that test family.`,
      concepts: ["aw05.sim-to-real"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw05-l05-f1", front: "Recalibration changes what?", back: "The evidence, not the product: past results near limits may flip; correct recorded raw data first.", concepts: ["aw05.recalibration-impact"] },
    { id: "aw05-l05-f2", front: "Re-evaluation rule after a calibration finding", back: md`Re-evaluate if $|m - L| < |\Delta b| + U_{new}$.`, concepts: ["aw05.recalibration-impact"] },
    { id: "aw05-l05-f3", front: "TUR definition (Z540.3 convention)", back: "Tolerance span divided by twice the 95 % expanded uncertainty; rule of thumb at least 4.", concepts: ["aw05.recalibration-impact"] },
    { id: "aw05-l05-f4", front: "Phase lag from added delay", back: md`$\Delta\varphi = 360° \cdot f_c \cdot \tau$; 50 µs at 200 Hz is 3.6°.`, concepts: ["aw05.sensor-swap"] },
    { id: "aw05-l05-f5", front: "Localising a model retrain", back: "Replay recorded inputs through old and new model; divergence rate per region; physical tests where it is high.", concepts: ["aw05.model-change"] },
    { id: "aw05-l05-f6", front: "Trials to detect 95 % to 90 % success", back: "About 150 (one-sided 5 %, power 80 %); 20 trials give about 33 % power.", concepts: ["aw05.statistical-rerun"] },
    { id: "aw05-l05-f7", front: "When can sim triage a rig rerun?", back: "Only for test families where sim and rig agreement has been measured and is small and stable.", concepts: ["aw05.sim-to-real"] },
  ],
  scenarios: [
    {
      id: "aw05-s2",
      title: "Friday night: grasp model v18 arrives",
      dayInLife: true,
      context: md`Illustrative pilot at a humanoid company. Friday 18:00. The ML team registers grasp policy v18 (retrained with more transparent-object data) and wants it on the demo robots on Monday. The test lead asks Ripple for an overnight plan on the manipulation cell: 14 rig hours available. The usual habit is 20 trials per object class across 12 classes.`,
      start: "a",
      concepts: ["aw05.model-change", "aw05.statistical-rerun", "aw05.sim-to-real"],
      nodes: {
        a: {
          md: md`What does Ripple propose first?`,
          choices: [
            { text: "Run the usual 20 trials on all 12 classes (240 trials, 8 h) and report pass or fail.", score: 3, feedback: "Familiar, but 20 trials per class has about one-in-three power to detect a 5-point drop; a 'pass' means little.", next: "c" },
            { text: "Replay last month's recorded observations through v17 and v18 first (compute only, about an hour), and plan physical trials around where behaviour diverged.", score: 10, feedback: "Uses bench memory to localise a global change before spending rig time.", next: "b" },
          ],
        },
        b: {
          md: md`Replay shows divergence above 2 % only for transparent objects (the intended change) and, unexpectedly, for heavy objects above 1.5 kg. Elsewhere divergence is below 0.3 %.`,
          choices: [
            { text: "Plan 150 trials each for transparent and heavy objects (10 h), a 30-trial confirmation on the other classes in the remaining time, plus the mandatory force-limit safety tests, and flag the heavy-object divergence to the ML team as unintended.", score: 10, feedback: "Trials go where behaviour moved; the unintended divergence is surfaced before Monday, which is the real value of the plan.", next: "d" },
            { text: "Test only transparent objects, since that was the intended change.", score: 4, feedback: "Ignores the unintended divergence, which is exactly the kind of regression that escapes.", next: "d" },
          ],
        },
        c: {
          md: md`Monday morning: all classes passed 20 trials. Two weeks later field demos show drops on heavy objects.`,
          choices: [
            { text: "Run the post-mortem: the change was global in weights, local in behaviour, and the trial counts were too small to detect a 5-point drop. Introduce replay and sized trials.", score: 5, feedback: "Right lesson, learned late." },
          ],
        },
        d: {
          md: md`Saturday 08:00: transparent objects improved from 82 % to 91 %; heavy objects fell from 96 % to 89 % over 150 trials. The ML lead asks if v18 can still go on the demo robots.`,
          choices: [
            { text: "Report both results with confidence intervals, recommend v18 only for demos without heavy objects or a fix first, and leave the release decision to the named owner with the evidence attached.", score: 10, feedback: "Evidence, uncertainty and a clear decision owner: the human approval step Lesson 6 is about." },
            { text: "Approve v18 because the intended improvement was achieved.", score: 2, feedback: "Trades a measured regression for a demo; the evidence says otherwise." },
          ],
        },
      },
    },
  ],
};

export default lesson;
