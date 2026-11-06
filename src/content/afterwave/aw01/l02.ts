import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw01-l02",
  title: "Test plans and design of experiments",
  summary:
    "How a test case is structured, how acceptance criteria are written so that a pass means something, how to cover an operating envelope without testing every point, and how full and fractional factorial experiments estimate factor effects and interactions, with a worked inverter-loss example.",
  minutes: 75,
  objectives: [
    "Write a test case with requirement trace, preconditions, stimulus, measurements, acceptance and abort criteria",
    "Write acceptance criteria that account for measurement uncertainty (guard banding)",
    "Explain operating envelope coverage and why one-factor-at-a-time testing misses interactions",
    "Compute main effects and interactions from a 2^3 full factorial and spot aliasing in a half fraction",
  ],
  concepts: [
    { id: "aw01.test-case-structure", name: "Test case structure", description: "The fields of a test case: id, objective, requirement trace, DUT configuration, setup, stimulus, measurements, acceptance and abort criteria, outputs.", competency: "aw-test" },
    { id: "aw01.acceptance-criteria", name: "Acceptance criteria and guard banding", description: "Quantitative pass/fail rules stated with the measurement method and a decision rule that accounts for measurement uncertainty.", competency: "aw-test", related: ["aw01.test-case-structure"] },
    { id: "aw01.operating-envelope", name: "Operating envelope coverage", description: "The multi-dimensional region of conditions (speed, torque, voltage, temperature, state of charge) a product must work in, and how a test plan samples it.", competency: "aw-test" },
    { id: "aw01.factorial-doe", name: "Factorial design of experiments", description: "Varying several factors together at planned levels so main effects and interactions can be estimated from few runs.", competency: "aw-test", related: ["aw01.operating-envelope"] },
    { id: "aw01.aliasing", name: "Aliasing and resolution", description: "In a fractional factorial, some effects cannot be separated (they are aliased); the design's resolution says which effects are confounded with which.", competency: "aw-test", related: ["aw01.factorial-doe"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "From requirement to test case to experiment",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Ripple's job is to decide which tests to rerun after a change. That only works if tests are written as structured objects (what they cover, under which conditions, against which criterion), and it only earns trust if you understand how test engineers already think about coverage and factor effects. When a validation lead says "that change only affects the high-voltage corner of the envelope", you need to know exactly what she means.`,
        },
        {
          kind: "md",
          md: md`### Anatomy of a test case

| Field | Content | Example (drive unit peak torque) |
|---|---|---|
| **ID and title** | Unique, versioned | DU-PERF-014 rev C, peak torque at hot coolant |
| **Objective and requirement trace** | Which requirement(s) it evidences | SYS-REQ-221: 300 N·m for 10 s at 65 °C coolant |
| **DUT configuration** | Hardware build, serial, firmware, calibration dataset | B-sample, SN 0042, inverter FW 4.2.1, motor cal set 7 |
| **Setup** | Rig, fixture revision, instruments and their calibration status | Dyno 2, fixture FX-DU-03 rev B, torque flange 500 N·m class 0.05 |
| **Preconditions** | State before stimulus | Coolant 65 °C stable within 1 K for 10 min, DC link 350 V |
| **Stimulus** | Steps, setpoints, ramps, durations | Hold 1,500 rpm on dyno; torque command ramp 0 to 300 N·m in 0.5 s; hold 10 s |
| **Measurements** | Signals, rates, synchronisation | Torque 10 kS/s, speed, DC V and I, phase currents 100 kS/s, winding temperatures 10 S/s, CAN at bus rate |
| **Acceptance criteria** | Quantitative, with decision rule | Mean torque over seconds 1 to 10 at or above 300 N·m minus guard band |
| **Abort criteria** | When to stop to protect DUT, rig and people | Winding over 180 °C, DC current over 600 A, vibration over limit |
| **Outputs** | Data, report, traceability | Raw files, metadata, pass/fail with uncertainty, report linked to requirement |

Test documentation standards exist (ISO/IEC/IEEE 29119-3 for test documentation; automotive teams use the DVP&R format), but labs mostly use their own templates. What matters for Afterwave: every field above is metadata that Ripple can reason over. A test whose conditions live only in a PDF cannot be selected automatically.

### Acceptance criteria that mean something

A criterion has three parts: the **quantity and how it is computed** (mean over which window, filtered how), the **limit**, and the **decision rule** given measurement uncertainty $U$ (expanded, usually $k=2$, about 95 % coverage). Guard banding (ISO 14253-1 uses this logic for conformity decisions) shifts the acceptance limit inward by $U$:

$$\text{pass if } y_{\text{measured}} - U \ge L_{\text{lower}}$$

With $U = 1$ N·m and a 300 N·m limit, a measured 300.4 N·m is **not** a clear pass: the true value could be 299.4. Labs that skip this argue about borderline results for weeks. "Torque shall be adequate" is not a criterion at all.

### Covering the operating envelope

A drive unit operates over speed (0 to 16,000 rpm), torque (minus to plus peak), DC voltage (for example 250 to 470 V), coolant temperature (minus 30 to 70 °C) and ambient. Testing 5 levels of each of 5 factors is $5^5 = 3{,}125$ points; at 20 minutes each that is over 1,000 rig hours for one characterisation. So test plans sample:

- **Corners and edges** (the worst cases: maximum torque at minimum voltage and maximum coolant temperature),
- **The duty-cycle region** where the product spends most of its life,
- **A structured design** (DOE) to learn how factors interact, so the rest can be interpolated.

### Why one-factor-at-a-time fails

Changing one factor at a time from a baseline (OFAT) assumes each factor's effect is the same whatever the others are doing. In power electronics that is false: switching loss is proportional to switching frequency **times** DC voltage, so the effect of frequency depends on voltage. That dependence is an **interaction**, and OFAT cannot see it.

### Factorial experiments

A full factorial at $L$ levels for $k$ factors with $r$ replicates needs:`,
        },
        { kind: "equation", formula: "aw01-factorial-runs" },
        {
          kind: "md",
          md: md`For two levels coded $-1$ and $+1$, the **main effect** of a factor is the average response at its high level minus the average at its low level, using all runs:`,
        },
        { kind: "equation", formula: "aw01-main-effect" },
        {
          kind: "md",
          md: md`An **interaction** AB is computed the same way using the product column $x_A x_B$: half the difference between the effect of A at high B and the effect of A at low B. Every run is used for every estimate, which is why a factorial is far more efficient than OFAT for the same number of runs.

With run-to-run standard deviation $\sigma$ (from replicates or repeat runs), each effect has a standard error:`,
        },
        { kind: "equation", formula: "aw01-effect-se" },
        {
          kind: "md",
          md: md`An effect larger than about $2\,\mathrm{SE}$ is unlikely to be noise.

### Fractional factorials and aliasing

A $2^{k-p}$ fraction runs a planned subset. A half fraction of $2^3$ uses the generator $C = AB$: the four runs where $x_C = x_A x_B$. The price is **aliasing**: in those runs the column for C is identical to the column for AB, so the estimate you call "C" is really $C + AB$. The **resolution** of a design summarises this: Resolution III aliases main effects with two-factor interactions (risky when interactions are strong); Resolution IV aliases two-factor interactions with each other; Resolution V keeps main effects and two-factor interactions clear. Use fractions for screening many factors, then a full factorial or response surface on the few that matter.

Three more rules: **randomise** run order (otherwise slow drifts such as coolant temperature creep get blamed on whatever factor you changed last), **replicate** or add centre points to estimate noise, and **block** by day or DUT if they cannot be held constant.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "Interaction plot: inverter loss vs DC-link voltage at two switching frequencies (illustrative)",
          xKey: "vdc",
          xLabel: "DC-link voltage (V)",
          yLabel: "Inverter loss (W)",
          series: [
            { key: "f8", label: "8 kHz" },
            { key: "f16", label: "16 kHz" },
          ],
          data: [
            { vdc: 300, f8: 855, f16: 1085 },
            { vdc: 450, f8: 915, f16: 1225 },
          ],
          caption: "Averages over coolant temperature from the worked example below. Non-parallel lines are the signature of an interaction: raising voltage costs 60 W at 8 kHz but 140 W at 16 kHz.",
        },
      ],
    },
    {
      layer: "applied",
      title: "A 2^3 factorial on inverter losses",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Main effect of switching frequency from a full factorial",
          given: md`Illustrative experiment on a drive inverter at a fixed operating point (150 A rms phase current, 1,500 rpm). Factors: **A** switching frequency 8 / 16 kHz, **B** DC-link voltage 300 / 450 V, **C** coolant temperature 25 / 65 °C. Response: total inverter loss in W from a power analyser (input DC power minus output AC power). Runs in randomised order; results in standard order:

| Run | A | B | C | Loss (W) |
|---|---|---|---|---|
| 1 | − | − | − | 830 |
| 2 | + | − | − | 1,050 |
| 3 | − | + | − | 890 |
| 4 | + | + | − | 1,190 |
| 5 | − | − | + | 880 |
| 6 | + | − | + | 1,120 |
| 7 | − | + | + | 940 |
| 8 | + | + | + | 1,260 |`,
          steps: [
            { md: md`**Grand mean:** sum $= 8{,}160$ W, mean $= 1{,}020$ W.` },
            { md: md`**A high runs (2, 4, 6, 8):** $(1{,}050 + 1{,}190 + 1{,}120 + 1{,}260)/4 = 4{,}620/4 = 1{,}155$ W.` },
            { md: md`**A low runs (1, 3, 5, 7):** $(830 + 890 + 880 + 940)/4 = 3{,}540/4 = 885$ W.` },
            { md: md`**Main effect of A:** $1{,}155 - 885 = 270$ W. Doubling switching frequency adds 270 W of loss on average over the other factors, which matches the physics: switching loss is proportional to frequency.` },
            { md: md`**Noise check:** repeat runs at the centre point gave $\sigma \approx 15$ W (illustrative). $\mathrm{SE} = 2 \times 15/\sqrt{8} = 10.6$ W, so 270 W is about 25 standard errors: real.` },
          ],
          result: md`Switching frequency is the dominant factor: 270 W out of a 1,020 W mean. Eight runs gave this estimate with the full precision of all eight, plus information on B, C and every interaction.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Effect of DC voltage and the frequency-voltage interaction",
          given: md`Same eight runs. B high runs are 3, 4, 7, 8. For the AB interaction, the product column $x_A x_B$ is $+$ for runs 1, 4, 5, 8 and $-$ for runs 2, 3, 6, 7.`,
          steps: [
            { md: md`B high mean $= (890 + 1{,}190 + 940 + 1{,}260)/4 = 1{,}070$ W; B low mean $= (830 + 1{,}050 + 880 + 1{,}120)/4 = 970$ W.` },
            { md: md`Main effect of B $= 1{,}070 - 970 =$ **100 W**.`, hidden: true, check: { prompt: "Main effect of DC-link voltage B (W)", answer: 100, unit: "W", tolerance: { abs: 1 } } },
            { md: md`AB plus-runs mean $= (830 + 1{,}190 + 880 + 1{,}260)/4 = 1{,}040$ W; AB minus-runs mean $= (1{,}050 + 890 + 1{,}120 + 940)/4 = 1{,}000$ W.` },
            { md: md`AB interaction $= 1{,}040 - 1{,}000 =$ **40 W**, almost 4 SE: real.`, hidden: true, check: { prompt: "AB interaction effect (W)", answer: 40, unit: "W", tolerance: { abs: 1 } } },
            { md: md`Interpretation: effect of A at low B is $1{,}085 - 855 = 230$ W; at high B it is $1{,}225 - 915 = 310$ W. Half their difference is $(310 - 230)/2 = 40$ W, the AB effect. Switching loss scales with frequency times voltage.` },
          ],
          result: md`Full set of effects: A 270, B 100, C 60, AB 40, AC 10, BC 0, ABC 0 W. With SE about 10.6 W, A, B, C and AB matter; AC, BC and ABC are noise.`,
        },
        {
          kind: "question",
          question: {
            id: "aw01-l02-p1",
            type: "numeric",
            prompt: md`To save rig time the team had run only the half fraction with generator $C = AB$: runs 2, 3, 5 and 8 (losses 1,050, 890, 880 and 1,260 W). In that half, C is high in runs 5 and 8. What does the half fraction estimate as the "effect of C" (W)?`,
            answer: 100,
            tolerance: { abs: 1 },
            unit: "W",
            explanation: md`C high: $(880 + 1{,}260)/2 = 1{,}070$; C low: $(1{,}050 + 890)/2 = 970$; estimate $= 100$ W. The true C effect is 60 W: the half fraction reports $C + AB = 60 + 40$. In a Resolution III design you would wrongly conclude coolant temperature matters as much as DC voltage. The cure is the other half fraction (fold-over) or a full factorial when interactions are expected from physics.`,
            concepts: ["aw01.aliasing", "aw01.factorial-doe"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "How test plans are written and argued in practice",
      blocks: [
        {
          kind: "md",
          md: md`### Who writes what, in which tools

- The **validation lead** builds the DVP&R from the requirement set, negotiates sample sizes and rig time with the lab manager, and gets design sign-off on acceptance criteria.
- **Test engineers** write procedures and scripts for each test case, often by copying a previous programme's procedure and editing it (the source of many stale criteria).
- **Tools:** requirements and traceability in Jama Connect, Polarion or IBM DOORS; test cases in Xray, TestRail or a spreadsheet; DOE in JMP, Minitab or Python; scripts in the test executive. The links between them are usually maintained by hand.
- **DOE culture varies:** powertrain and semiconductor teams use DOE routinely for calibration and characterisation; many robotics teams still run OFAT sweeps.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Criteria without a computation**: "peak torque 300 N·m" without saying peak of what (instantaneous, 100 ms mean, 1 s mean) gives different answers on the same data.
- **No decision rule for uncertainty**: borderline results become negotiations.
- **Unrandomised runs**: the DUT warms up through the morning, and the last factor changed gets the blame.
- **Fractional designs where physics says interactions exist**: as in the inverter example, a Resolution III screen misattributes effects.
- **Test conditions stored as free text**: impossible to query "which tests ran above 420 V", which is exactly what you need after a change to the overvoltage protection.`,
        },
        { kind: "sources", refs: ["aw01-r2", "aw01-r3", "aw01-r4"] },
        {
          kind: "checklist",
          title: "Review checklist for any test case",
          items: [
            "Traces to at least one requirement, with the requirement version",
            "DUT configuration pinned: hardware build, serial, firmware, calibration set",
            "Fixture revision and instrument calibration status recorded",
            "Acceptance criterion states quantity, computation window, limit and uncertainty decision rule",
            "Abort criteria protect DUT, rig and people",
            "Conditions stored as structured fields (setpoints and ranges), not prose",
            "If a DOE: factors, levels, run order randomised, replicates or centre points, aliasing stated",
          ],
        },
        {
          kind: "ask",
          title: "Questions that reveal a lab's test-plan maturity",
          items: [
            "Can you show me which test cases cover requirement X, and which requirement each test covers, without opening PDFs?",
            "How are test conditions stored: structured fields or text in the procedure?",
            "When a criterion is borderline, what rule decides pass or fail?",
            "Do you use DOE for characterisation, and who in the team designs them?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw01-l02-p2",
            type: "short",
            prompt: md`Write a complete test case for an illustrative humanoid knee actuator: **continuous torque capability at hot ambient**. Requirement (assumed): the actuator shall deliver 60 N·m continuous at 40 °C ambient for 30 minutes without the winding exceeding 140 °C. Include every field from the lesson table, an acceptance criterion with a guard band (assume torque $U = 0.3$ N·m, temperature $U = 2$ K), abort criteria, and a small DOE (2 or 3 factors) the team could run to understand what drives winding temperature. State which fields Ripple would need to decide whether this test must rerun after a firmware change to the current controller.`,
            rubric: [
              "All test case fields present and concrete (id, objective and trace, DUT configuration, setup, preconditions, stimulus, measurements with rates, acceptance, abort, outputs)",
              "Acceptance criterion defines the computation and applies the guard bands correctly (torque at least 60.3 measured, winding at most 138 °C measured)",
              "Abort criteria protect the DUT and rig with specific limits",
              "DOE has sensible factors and levels (for example ambient, torque level, controller PWM frequency or cooling), randomised order and a stated aliasing or full factorial choice",
              "Identifies the structured fields Ripple needs (firmware version and module, signals affected such as phase current, conditions, requirement trace)",
              "Labels all assumptions as illustrative",
            ],
            modelAnswer: md`**ID:** ACT-KNEE-THERM-003 rev A. **Objective:** evidence REQ-ACT-031 (assumed): 60 N·m continuous at 40 °C ambient for 30 min, winding at most 140 °C. **DUT:** knee actuator B-sample, SN recorded, driver FW version and current-controller module version recorded, encoder calibration set. **Setup:** actuator rig 3, fixture FX-ACT-02 rev B, load motor in speed control at 30 rpm output, inline torque sensor 200 N·m range (U = 0.3 N·m), winding thermocouple embedded plus housing thermocouple (U = 2 K), thermal chamber at 40 °C. **Preconditions:** chamber at 40 ± 1 °C and actuator soaked 60 min; winding within 2 K of ambient. **Stimulus:** command 60 N·m at constant output speed 30 rpm for 30 min. **Measurements:** torque and speed 1 kS/s, phase currents 20 kS/s, winding and housing temperature 10 S/s, driver telemetry from EtherCAT, all on one clock. **Acceptance:** mean torque over minutes 1 to 30 at least 60.3 N·m measured, and maximum winding temperature at most 138 °C measured (limits moved inward by U). **Abort:** winding over 150 °C, phase current over driver rating, torque ripple or vibration over set limit, chamber fault. **Outputs:** raw data, metadata (SN, FW, fixture, calibration), pass/fail with margin, report linked to the requirement.

**DOE (2^3 full factorial, 8 runs plus 2 centre points, randomised):** A ambient 25/40 °C, B torque 45/60 N·m, C PWM frequency 10/20 kHz. Response: steady-state winding temperature rise. Full factorial because a torque-by-ambient interaction is expected (copper resistance rises with temperature).

**For Ripple:** firmware module versions under test, the signals the criterion depends on (phase current, winding temperature), the operating conditions as structured setpoints, and the requirement link. A change to the current controller touches phase current and copper loss, so this test is a strong rerun candidate; a change to the logging module is not.`,
            explanation: md`Strong answers make every field queryable, apply guard bands in the right direction (tighter for the product), pick DOE factors from physics, and recognise that test selection depends on structured links between code modules, signals and criteria.`,
            concepts: ["aw01.test-case-structure", "aw01.acceptance-criteria", "aw01.factorial-doe"],
            difficulty: 2,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw01-l02-q1",
      type: "numeric",
      prompt: md`How many runs does a two-level full factorial with 5 factors and 2 replicates need?`,
      answer: 64,
      tolerance: { abs: 0 },
      unit: "runs",
      explanation: md`$N = r L^k = 2 \times 2^5 = 64$. A $2^{5-1}$ half fraction would need 16 per replicate.`,
      concepts: ["aw01.factorial-doe"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw01-l02-q2",
      type: "mcq",
      prompt: "Measured torque is 300.4 N·m, the lower limit is 300 N·m and expanded uncertainty U is 1 N·m. With a guard-band decision rule, the result is:",
      options: ["Pass", "Fail or indeterminate: not a clear pass", "Pass if the test is repeated once", "Cannot be judged without a DOE"],
      answer: 1,
      explanation: md`$300.4 - 1 = 299.4 < 300$: the true value could be below the limit. Under a guard-band rule this is not a pass; the lab must tighten uncertainty or treat it as indeterminate per its decision rule.`,
      concepts: ["aw01.acceptance-criteria"],
      difficulty: 1,
    },
    {
      id: "aw01-l02-q3",
      type: "mcq",
      prompt: "Why does one-factor-at-a-time testing miss interactions?",
      options: [
        "It uses too few runs",
        "Each factor is varied only at one setting of the others, so it cannot see whether its effect changes when they change",
        "It does not randomise",
        "It needs replicates",
      ],
      answer: 1,
      explanation: md`An interaction is a change in one factor's effect depending on another's level. OFAT never varies two factors together, so it is blind to that by construction.`,
      concepts: ["aw01.factorial-doe"],
      difficulty: 1,
    },
    {
      id: "aw01-l02-q4",
      type: "numeric",
      prompt: md`In a $2^3$ experiment (8 runs), run-to-run standard deviation is 20 W. What is the standard error of an effect (W, 1 decimal)?`,
      answer: 14.1,
      tolerance: { abs: 0.1 },
      unit: "W",
      explanation: md`$\mathrm{SE} = 2\sigma/\sqrt{N} = 40/\sqrt8 = 14.1$ W. Effects above about 28 W are unlikely to be noise.`,
      concepts: ["aw01.factorial-doe"],
      difficulty: 2,
    },
    {
      id: "aw01-l02-q5",
      type: "mcq",
      prompt: "In a 2^(3-1) design with generator C = AB, the estimate labelled 'C' actually measures:",
      options: ["C only", "C + AB", "C + ABC", "A + B"],
      answer: 1,
      explanation: md`In the chosen runs the C column equals the AB column, so their effects add. This is a Resolution III design.`,
      concepts: ["aw01.aliasing"],
      difficulty: 2,
    },
    {
      id: "aw01-l02-q6",
      type: "multi",
      prompt: "Which test-case fields must be structured (not free text) for automated retest selection to work? (Select all that apply.)",
      options: ["Firmware and hardware configuration under test", "Operating conditions as setpoints and ranges", "Requirement trace", "The test engineer's name", "Signals the acceptance criterion depends on"],
      answer: [0, 1, 2, 4],
      explanation: md`Selection reasons over what changed (configuration), where in the envelope the test sits (conditions), what it evidences (requirement) and which signals decide pass/fail. The author's name is useful for questions, not for selection.`,
      concepts: ["aw01.test-case-structure"],
      difficulty: 2,
    },
    {
      id: "aw01-l02-q7",
      type: "decision",
      prompt: md`A validation lead has one week of dyno time to understand what drives inverter loss across 6 candidate factors. Physics suggests two strong interactions among the first three. What do you recommend?`,
      options: [
        { text: "OFAT sweeps on all six factors.", score: 0.1, feedback: "Misses the interactions physics already predicts." },
        { text: "A full 2^6 factorial (64 runs) regardless of time.", score: 0.4, feedback: "Thorough but may not fit the week; wasteful for factors likely to be inert." },
        { text: "A Resolution IV screening fraction (2^(6-2), 16 runs) to find active factors, then a full factorial on the active three with the interactions clear.", score: 1, feedback: "Screen cheaply, then resolve the interactions that matter: the standard sequential DOE approach." },
        { text: "A Resolution III fraction (8 runs) and stop.", score: 0.3, feedback: "Main effects aliased with the very interactions physics predicts: the inverter example in this lesson." },
      ],
      explanation: md`Sequential experimentation spends few runs where little is known and more where it matters, and chooses resolution by what physics says may interact.`,
      concepts: ["aw01.factorial-doe", "aw01.aliasing"],
      difficulty: 3,
    },
  ],
  flashcards: [
    { id: "aw01-l02-f1", front: "Runs in a full factorial", back: md`$N = r L^k$ (replicates times levels to the power of factors)`, concepts: ["aw01.factorial-doe"] },
    { id: "aw01-l02-f2", front: "Main effect (two-level)", back: md`Mean response at $+1$ minus mean at $-1$, over all runs`, concepts: ["aw01.factorial-doe"] },
    { id: "aw01-l02-f3", front: "Interaction", back: "When one factor's effect depends on another factor's level; non-parallel lines on an interaction plot.", concepts: ["aw01.factorial-doe"] },
    { id: "aw01-l02-f4", front: "Guard banding", back: "Move the acceptance limit inward by the expanded uncertainty U before declaring a pass.", concepts: ["aw01.acceptance-criteria"] },
    { id: "aw01-l02-f5", front: "Resolution III", back: "Main effects aliased with two-factor interactions; fine for screening only when interactions are weak.", concepts: ["aw01.aliasing"] },
    { id: "aw01-l02-f6", front: "Three DOE hygiene rules", back: "Randomise run order, replicate (or centre points), block what you cannot hold constant.", concepts: ["aw01.factorial-doe"] },
    { id: "aw01-l02-f7", front: "Effect standard error", back: md`$\mathrm{SE} = 2\sigma/\sqrt{N}$; effects above about 2 SE are real`, concepts: ["aw01.factorial-doe"] },
  ],
};

export default lesson;
