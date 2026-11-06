import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw05-l03",
  title: "Coverage in software and in hardware: where edge weights come from",
  summary:
    "Coverage used two ways, as test adequacy and as dependency evidence: statement, branch and MC/DC coverage of firmware and what the standards ask for; calibration-parameter coverage for data changes; requirement coverage and suspect links; operating-envelope coverage computed from measured rig signals; and margin-normalised signal sensitivity, which turns sensor and rig changes into weighted graph edges.",
  minutes: 80,
  objectives: [
    "Define statement, branch and MC/DC coverage and construct a minimal MC/DC test set for a decision",
    "Explain why code coverage cannot see calibration and model changes, and what parameter-read coverage adds",
    "Compute linked versus verified requirement coverage and explain suspect links",
    "Compute operating-envelope coverage from recorded signals",
    "Compute margin-normalised signal sensitivity weights for a rig change and use them as edges",
  ],
  concepts: [
    { id: "aw05.structural-coverage", name: "Structural code coverage", description: "Statement, branch (decision) and MC/DC coverage of firmware; MC/DC shows each condition independently changes a decision's outcome.", competency: "aw-impact", related: ["aw05.dependency-graph"] },
    { id: "aw05.coverage-based-selection", name: "Coverage-based selection", description: "Select tests whose recorded coverage intersects the changed code, weighted by the share covered; code-level, blind to data, rig and model changes.", competency: "aw-impact", related: ["aw05.structural-coverage", "aw05.edge-provenance"] },
    { id: "aw05.parameter-coverage", name: "Calibration-parameter coverage", description: "Which calibration parameters, and which lookup-table cells, a test actually read during the run; the coverage that sees data changes.", competency: "aw-impact", related: ["aw05.coverage-based-selection"] },
    { id: "aw05.requirement-coverage", name: "Requirement coverage and suspect links", description: "Share of requirements with a linked test (linked) or a current passing linked test (verified); suspect links demote coverage after a change.", competency: "aw-impact" },
    { id: "aw05.envelope-coverage", name: "Operating-envelope coverage", description: "Share of feasible cells of the discretised operating space (speed, torque, temperature, voltage) visited by tests, from measured signals.", competency: "aw-impact" },
    { id: "aw05.signal-sensitivity", name: "Margin-normalised signal sensitivity", description: "Fraction of a test's margin to its limit that a physical change could consume; the edge weight from a rig element or signal to a test.", competency: "aw-impact", related: ["aw05.impact-score"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Four kinds of coverage, one job: weight the edges",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Every buyer already has a coverage story: firmware engineers have gcov or VectorCAST reports, systems engineers have a traceability matrix, test engineers have a test matrix over speed and torque. Ripple's edge is joining them and adding the one nobody has: how sensitive each test's verdict is to each rig sensor and calibration. When you can say which coverage type sees which change, and which sees none, you can position Ripple against VectorCAST's change-based testing and requirements tools without overclaiming.`,
        },
        {
          kind: "md",
          md: md`### Two uses of coverage

Coverage is usually read as **adequacy**: how much of the system the suite exercises. For change impact it is read as **dependency evidence**: if test $t$ exercised element $e$, then a change to $e$ can affect $t$, with a weight related to how much of $e$ it exercised. Same data, different question.

### Structural code coverage

| Criterion | Requirement | Minimum tests for one decision with N conditions |
|---|---|---|
| **Statement** | Every statement executed at least once | 1 or more |
| **Branch / decision** | Every decision takes both true and false | 2 |
| **MC/DC** | Every condition takes both values, every decision both outcomes, and each condition is shown to **independently** change the outcome with the others held fixed | $N+1$ |
| **Multiple condition** | All $2^N$ combinations | $2^N$ |`,
        },
        { kind: "equation", formula: "aw05-mcdc-min" },
        {
          kind: "md",
          md: md`MC/DC (Chilenski and Miller, 1994) is required by **DO-178C** for Level A airborne software. In automotive, **ISO 26262-6:2018** recommends statement, branch and MC/DC coverage at unit level with increasing strength by ASIL. Humanoid and industrial robot programmes often borrow these targets for safety-related firmware even where no standard mandates a criterion.

**Embedded reality.** Coverage on target needs instrumentation (probe code at each branch), which costs cycles. A 20 kHz current loop has a 50 µs period; instrumented code can miss deadlines and change behaviour, which is exactly what you were trying to observe. Options: hardware trace (for example Arm CoreSight ETM) for non-intrusive coverage, coverage on software-in-the-loop or processor-in-the-loop builds as a proxy, or instrumenting only non-real-time code. Whatever the method, record **which binary** the coverage belongs to: a coverage map from a debug build does not describe the release binary on the bench.

### Coverage-based selection and what it cannot see

The selection rule is direct: select $t$ if $\mathrm{cov}(t) \cap \Delta \neq \emptyset$, where $\Delta$ is the set of changed functions or basic blocks, and use the covered share as the edge weight. This is the logic of **VectorCAST change-based testing**, the closest commercial analogue the research brief found. It is precise for code and **blind** to three kinds of change that dominate physical AI labs:
- **Calibration data.** A changed lookup table executes exactly the same code. Coverage says "nothing changed in the paths this test took".
- **Model weights.** A retrained network runs the same inference code; every weight changed, so either nothing or everything is "covered".
- **Rig hardware.** The encoder is not in the firmware's coverage map at all.

### Parameter-read coverage

The fix for calibration changes is to record **which parameters a test read, and which table cells**. A derating table indexed by winding temperature and speed is only exercised at the cells the test reached. If a release changes only the cells above 120 °C, only tests whose measured winding temperature passed 120 °C are affected. This is coverage measured in the **data** space, and it links naturally to the envelope coverage below. In practice it comes from A2L/XCP measurement of the parameters during the run, or from recorded signals plus the table's breakpoints.

### Requirement coverage`,
        },
        { kind: "equation", formula: "aw05-requirement-coverage" },
        {
          kind: "md",
          md: md`Two numbers, often confused: **linked** coverage (a test is traced to the requirement) and **verified** coverage (the latest linked result is a pass on the current configuration). Requirements tools (Jama Connect, Polarion, IBM DOORS Next) mark trace links **suspect** when the upstream item changes. That is change impact at the traceability level: correct in spirit, manual, and driven by requirement edits rather than by firmware diffs, recalibrations or model versions.

### Operating-envelope coverage

A physical system's input space is continuous: speed, torque, winding and coolant temperature, DC bus voltage, payload, ambient. Discretise it into cells and ask which feasible cells the suite actually visited:`,
        },
        { kind: "equation", formula: "aw05-envelope-coverage" },
        {
          kind: "md",
          md: md`Two rules make it honest. Compute $\mathcal{V}$ from **measured** signals, not from the test plan (a run planned at 4,000 rpm that reached 3,600 rpm covers the 3,600 rpm cell). And exclude infeasible cells (above the power limit hyperbola $T \cdot \omega \le P_{max}$) from $\mathcal{F}$, otherwise coverage can never reach 100 %. A **duty-weighted** variant weights each cell by expected time in service, so the cruise region counts more than a corner seen once a year, while safety corners get their own explicit targets.

For impact, envelope coverage gives the edge from a changed **region** (a derating table above 120 °C, a field-weakening gain above base speed) to the tests that visited it.

### Signal sensitivity: edges for rig changes

A rig change (new encoder, recalibrated load cell, different filter) has no code coverage. Its effect on a test is through the **signals the verdict uses**. Weight the edge by the share of the test's margin the change could consume:`,
        },
        { kind: "equation", formula: "aw05-sensitivity-weight" },
        {
          kind: "md",
          md: md`$\partial m_t / \partial x$ comes from how the metric is computed (a force error in % moves one-for-one with a gain error in %; an overshoot depends on encoder delay through the loop dynamics) or empirically from bench memory. $M_t$ is the distance from the last result to the limit, so a test that passed with a large margin is robust to small rig changes and a marginal pass is not. That is how an engineer reasons informally ("that test was close to its limit, recheck it"); the formula makes it reproducible.`,
        },
        {
          kind: "matrix",
          title: "Which coverage sees which change",
          xAxis: ["Code or firmware change", "Data, model or rig change"],
          yAxis: ["Behavioural evidence (what the run did)", "Structural evidence (what the design says)"],
          cells: [
            { label: "Code coverage", detail: "Statement, branch, MC/DC on target or SiL; drives code-level selection" },
            { label: "Traceability and parameter maps", detail: "Requirement links, A2L parameter-to-module maps, rig configuration sheets" },
            { label: "Executed-path traces", detail: "Which functions and tasks actually ran on the bench, from trace or logs" },
            { label: "Envelope, parameter-read and signal sensitivity", detail: "Measured operating cells, table cells read, margin-normalised sensitivity to each channel" },
          ],
          caption: "Ripple's distinctive evidence sits bottom-right: computed from what Lockstep recorded on the bench.",
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Standards detail to check before quoting",
          md: md`The ASIL-by-ASIL recommendation levels for statement, branch and MC/DC coverage are in a table of ISO 26262-6:2018 (unit-level structural coverage). The exact "recommended" versus "highly recommended" entries were not re-read for this lesson; check the current table before quoting them to a customer. ISO 26262's third edition is in development, with release expected around 2027 per a single secondary source in the research brief (unverified).`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Coverage numbers on a drive and actuator rig",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "A minimal MC/DC set for a derating decision",
          given: md`Firmware decision: derate $= (A \wedge B) \vee C$ with $A$: winding temperature above limit, $B$: temperature sensor plausible, $C$: thermal fault latched. $N = 3$ conditions.`,
          steps: [
            { md: md`**Branch coverage** needs only two vectors, one true and one false, for example $(1,1,0) \to 1$ and $(0,1,0) \to 0$. It never shows that $B$ or $C$ matter.` },
            {
              md: md`**MC/DC** needs at least $N + 1 = 4$ vectors. One valid set:

| Vector | A | B | C | derate |
|---|---|---|---|---|
| 1 | 1 | 1 | 0 | 1 |
| 2 | 0 | 1 | 0 | 0 |
| 3 | 1 | 0 | 0 | 0 |
| 4 | 1 | 0 | 1 | 1 |`,
            },
            { md: md`**Independence pairs:** 1 and 2 differ only in $A$ and flip the outcome; 1 and 3 differ only in $B$; 3 and 4 differ only in $C$. Each condition is shown to matter on its own.` },
            { md: md`**On a rig**, vector 3 (hot winding, implausible sensor, no latched fault) means injecting a sensor fault while the winding is hot: a fault-injection fixture or a HIL model, not a normal dyno run. MC/DC on safety logic usually forces HIL or fault-injection tests that a plain performance suite never contains.` },
          ],
          result: md`Four vectors instead of two (branch) or eight (exhaustive). For change impact, each MC/DC test carries a precise edge: a change to the plausibility check affects vectors 1 and 3, whose outcome depends on $B$.`,
        },
        {
          kind: "worked",
          mode: "worked",
          title: "Edge weights for a load cell recalibration",
          given: md`Illustrative actuator rig. The gripper load cell was recalibrated; the as-found result shows a gain error of 0.3 % of reading, now corrected. Three tests read that channel or not:
- **Grip force accuracy:** metric = force error in %, limit 2.0 %, last result 1.6 %.
- **Overload derating onset:** onset torque must lie in 105 to 115 % of rated, measured from the load cell through the lever arm; last result 108 %.
- **2 h thermal soak:** verdict on winding temperature only.`,
          steps: [
            { md: md`**Grip force:** an error in % moves one-for-one with a gain error in %, so $\Delta m = 0.3$ points; margin $M = 2.0 - 1.6 = 0.4$ points. $w = \min(1, 0.3/0.4) = 0.75$.` },
            { md: md`**Derating onset:** a 0.3 % gain error shifts a 108 % reading by $0.003 \times 108 = 0.32$ points; nearest limit 105 %, margin 3 points. $w = 0.32/3 = 0.11$.` },
            { md: md`**Thermal soak:** the verdict does not use the load cell, $\partial m/\partial x = 0$, $w = 0$. No edge.` },
            { md: md`**Decision at a 0.5 threshold:** rerun grip force (or, better, recompute it from the recorded raw signal with the corrected gain, Lesson 5); keep derating and thermal soak results.` },
          ],
          result: md`Weights 0.75, 0.11 and 0. The same recalibration matters for one test because it passed close to its limit, barely for another, and not at all for the third. A spreadsheet of "tests that use the load cell" would have flagged the first two equally.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Envelope coverage of a torque-speed map",
          given: md`Illustrative drive. The speed range 0 to 8,000 rpm is split into 8 bins and the torque range 0 to 300 Nm into 6 bins: 48 cells. 8 cells lie above the power limit and are infeasible. From recorded signals, the current suite visited 29 feasible cells.`,
          steps: [
            { md: md`$|\mathcal{F}| = 48 - 8 = 40$.` },
            { md: md`$C_{env} = 29/40$.` },
            { md: md`$= 72.5\%$.`, hidden: true, check: { prompt: "Envelope coverage (%)", answer: 72.5, unit: "%", tolerance: { abs: 0.1 } } },
            { md: md`A new field-weakening sweep at high speed visits 6 previously unvisited feasible cells.` },
            { md: md`New coverage $= 35/40 = 87.5\%$.`, hidden: true, check: { prompt: "Envelope coverage after the new test (%)", answer: 87.5, unit: "%", tolerance: { abs: 0.1 } } },
            { md: md`A firmware change to the field-weakening controller now has edges to the new sweep (strong) and to the old tests that touched high-speed cells (weak), instead of to nothing.` },
          ],
          result: md`Envelope coverage rose from 72.5 % to 87.5 %. The gap before the new test was also an impact blind spot: a change in the unvisited region could not be caught by any test, whatever the selector chose.`,
        },
        {
          kind: "question",
          question: {
            id: "aw05-l03-p1",
            type: "numeric",
            prompt: md`A rated-torque test requires at least 50.0 Nm; the last result was 50.6 Nm. The torque transducer is replaced and the new one reads 0.5 % lower than the old one at this load (gain difference, illustrative). What is the margin-normalised sensitivity weight of this change for the test? (2 decimals)`,
            answer: 0.42,
            tolerance: { abs: 0.01 },
            explanation: md`$\Delta m = 0.005 \times 50.6 = 0.253$ Nm; margin $M = 50.6 - 50.0 = 0.6$ Nm; $w = 0.253/0.6 = 0.42$. Below a 0.5 threshold, but close; a cost rule (Lesson 2) with a cheap test would rerun it, and the reading of 50.6 Nm itself must be reinterpreted with the new transducer's calibration (Lesson 5).`,
            concepts: ["aw05.signal-sensitivity"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Collecting coverage in a real lab",
      blocks: [
        {
          kind: "md",
          md: md`### Who produces which coverage, with what

| Coverage | Who owns it | Typical tools and artefacts | What Ripple needs from it |
|---|---|---|---|
| Code (statement, branch, MC/DC) | Firmware team, software QA | gcov/lcov, LLVM source-based coverage, VectorCAST, LDRA, Testwell CTC++, BullseyeCoverage; hardware trace on target | Per-test coverage maps, tied to the binary hash |
| Calibration parameters | Calibration and controls engineers | A2L files, XCP/CCP measurement, calibration tools (for example Vector CANape, ETAS INCA) | Which parameters and table cells each test read |
| Requirements | Systems engineering | Jama Connect, Polarion, IBM DOORS Next; Xray or TestRail coverage reports | Test-to-requirement links, latest result per link, suspect flags |
| Envelope | Test engineers | Test matrices in spreadsheets; recorded DAQ data (TDMS, MDF4, Parquet) | Measured operating points per test run |
| Signal sensitivity | Test engineers, metrology | Channel lists in sequencer configs (TestStand, OpenTAP), limits, calibration certificates | Which channels feed each verdict, limits, last margins |

The last two rows are where labs have the least structure and where Lockstep's recordings (rig signals and on-screen actions on one clock) let Ripple compute coverage from data instead of asking engineers to maintain it by hand.`,
        },
        { kind: "sources", refs: ["aw05-r7", "aw05-r8", "aw05-r9", "aw05-r10", "aw05-r11"] },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Coverage traps",
          md: md`- **Coverage is not correctness.** A test can execute every branch and check nothing (the oracle problem). For impact this matters less: an edge only says the test *can* be affected.
- **Wrong binary.** Coverage from a debug or SiL build used for a release binary with different optimisation.
- **Instrumentation changes timing.** Probe code in a fast control loop can change the behaviour being tested.
- **Planned instead of measured envelope.** Test-plan operating points overstate coverage; derates, trips and aborted runs never reached them.
- **Linked counted as verified.** A requirement linked to a test that last ran three firmware versions ago is not verified.
- **Margins forgotten.** A rig change judged by "does the test use this sensor" instead of by margin over-selects robust tests and under-weights marginal ones.`,
        },
        {
          kind: "checklist",
          title: "Coverage data a Ripple pilot should secure in the first month",
          items: [
            "Per-test code coverage for the safety-relevant firmware modules, keyed by binary hash",
            "A2L or parameter list per firmware build, and the parameters each test touches",
            "Traceability export with latest result per link",
            "Recorded operating points for every run (speed, torque, temperatures, bus voltage at minimum)",
            "For every test: channels used in the verdict, limits and last results (margins)",
            "Calibration certificates for rig instruments with as-found and as-left values",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask a firmware and test team",
          items: [
            "Do you measure coverage on target, on SiL, or not at all, and for which modules?",
            "Can you tell, for a past run, which calibration table cells were active?",
            "Which tests passed within 20 % of their limit in the last full regression?",
            "Where are operating points recorded, and can you show coverage of your torque-speed map from measured data?",
            "When a requirement changes, who reviews the suspect links, and how long does it take?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw05-l03-p2",
            type: "short",
            prompt: md`Write a one-page **coverage evidence plan** for a Ripple pilot at an e-motor and inverter validation lab (illustrative: firmware with current loop, field weakening, thermal derating and safe torque off; one dyno with torque transducer, encoder and thermal chamber). For each change type (firmware code, calibration table, rig instrument), say which coverage you will collect, from which source, how it becomes an edge weight, and its known blind spot.`,
            rubric: [
              "Firmware code changes: code coverage per test (method and binary identity), weight from covered share; notes timing intrusion or SiL proxy limits",
              "Calibration changes: parameter-read or table-cell coverage from XCP/A2L or recorded signals plus breakpoints; links to envelope regions",
              "Rig instrument changes: channels used per verdict with margin-normalised sensitivity from limits and last results",
              "Uses measured envelope coverage (not planned) and excludes infeasible cells",
              "States at least one blind spot per evidence type and how the policy covers it (mandatory set, shadow sampling or history)",
              "Keeps it to concrete sources the lab already has, with what Lockstep adds",
            ],
            explanation: md`Each change type needs the evidence that can actually see it: code coverage for firmware, table-cell and envelope coverage for calibration, margin-normalised sensitivity for rig instruments. Naming each blind spot shows where the policy must compensate.`,
            modelAnswer: md`**Firmware code.** Collect per-test function and branch coverage for current loop, field weakening, derating and STO on the processor-in-the-loop build that matches the release compiler settings; on target, use trace where the MCU supports it and keep instrumentation out of the 20 kHz loop. Edge weight = share of the changed functions' branches the test covered. Blind spot: timing and real hardware interactions; covered by learned edges and shadow sampling.

**Calibration tables.** From each build's A2L, map tables to modules. From Lockstep recordings plus table breakpoints, compute which cells each run visited (for derating: winding temperature by speed). Edge weight = share of the changed cells the test visited, weighted by dwell time. Blind spot: cells no test reaches; reported as envelope gaps with a proposed test.

**Rig instruments.** From TestStand sequences, list channels used in each verdict, its limits and last result. For each recalibration or swap, take the as-found error from the certificate, compute $w = \min(1, |\partial m/\partial x|\,\Delta x / M)$. Blind spot: dynamic properties (bandwidth, delay) not in the certificate; for dynamic tests (step response) add a fixed weight of 0.5 until a baseline rerun measures the effect.

**Envelope.** Torque-speed-temperature map from measured data, infeasible cells removed, reported weekly.

**STO** stays mandatory regardless of coverage.`,
            concepts: ["aw05.coverage-based-selection", "aw05.parameter-coverage", "aw05.signal-sensitivity", "aw05.envelope-coverage"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a firmware lead who trusts his VectorCAST change-based testing why Ripple still adds value in his lab.",
          keyPoints: [
            "Code coverage is the right evidence for code changes, and Ripple should use it",
            "Calibration table changes run the same code, so coverage cannot see them; table-cell coverage from recorded runs can",
            "Rig changes are not in the code at all; their effect goes through the signals the verdict uses and the margin to the limit",
            "Retrained models change everything structurally; behaviour comparison is needed (next lesson)",
            "Ripple joins code, parameter, requirement, envelope and sensitivity evidence in one graph",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw05-l03-q1",
      type: "numeric",
      prompt: md`A safety decision has 5 independent conditions. What is the minimum number of test vectors for MC/DC?`,
      answer: 6,
      tolerance: { abs: 0 },
      explanation: md`$N + 1 = 6$, versus $2^5 = 32$ for multiple-condition coverage and 2 for branch coverage.`,
      concepts: ["aw05.structural-coverage"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw05-l03-q2",
      type: "mcq",
      prompt: "A release changes only the cells of the thermal derating table above 120 °C winding temperature. What evidence best decides which tests are affected?",
      options: [
        "Branch coverage of the derating module",
        "Which tests' recorded winding temperature exceeded 120 °C (table-cell coverage)",
        "Requirement links to the derating requirement",
        "All tests that read any temperature channel",
      ],
      answer: 1,
      explanation: md`The code path through the table lookup is identical, so code coverage cannot discriminate. Only tests that visited the changed cells can see the change.`,
      concepts: ["aw05.parameter-coverage"],
      difficulty: 2,
    },
    {
      id: "aw05-l03-q3",
      type: "numeric",
      prompt: md`180 requirements are in scope. 171 have a linked test; of those, 150 have a passing result on the current configuration. What is the verified requirement coverage, in %? (1 decimal)`,
      answer: 83.3,
      tolerance: { abs: 0.1 },
      unit: "%",
      explanation: md`Verified $= 150/180 = 83.3\%$. Linked coverage is $171/180 = 95\%$. The 12-point gap is the work a change creates: suspect or stale links.`,
      concepts: ["aw05.requirement-coverage"],
      difficulty: 1,
    },
    {
      id: "aw05-l03-q4",
      type: "mcq",
      prompt: "Why must envelope coverage be computed from measured signals rather than from the test plan?",
      options: [
        "Because test plans are confidential",
        "Because runs derate, trip or abort and may never reach planned operating points",
        "Because measured signals are smaller files",
        "Because planned points include infeasible cells",
      ],
      answer: 1,
      explanation: md`The plan states intent; the recording states what the system actually experienced. Only the latter tells you which region a change in that region could affect.`,
      concepts: ["aw05.envelope-coverage"],
      difficulty: 1,
    },
    {
      id: "aw05-l03-q5",
      type: "numeric",
      prompt: md`A step-response test's overshoot limit is 10 %; the last result was 8 %. A new encoder adds delay that is expected to raise overshoot by 1.2 points. What is the sensitivity weight?`,
      answer: 0.6,
      tolerance: { abs: 0.01 },
      explanation: md`$w = \min(1, 1.2 / (10 - 8)) = 0.6$. More than half the margin could be consumed, so the old verdict is not reliable.`,
      concepts: ["aw05.signal-sensitivity"],
      difficulty: 2,
    },
    {
      id: "aw05-l03-q6",
      type: "multi",
      prompt: "Which changes are invisible to code-coverage-based selection? (Select all that apply.)",
      options: [
        "A changed calibration lookup table",
        "A retrained grasp policy running the same inference code",
        "A replaced torque transducer on the rig",
        "A modified branch in the current controller",
      ],
      answer: [0, 1, 2],
      explanation: md`Code coverage sees code. Data, model weights and rig hardware need parameter coverage, behavioural comparison and signal sensitivity respectively.`,
      concepts: ["aw05.coverage-based-selection"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "aw05-l03-f1", front: "MC/DC in one line", back: "Each condition is shown to independently flip the decision outcome; minimum N + 1 tests for N conditions.", concepts: ["aw05.structural-coverage"] },
    { id: "aw05-l03-f2", front: "Where MC/DC is required", back: "DO-178C Level A; ISO 26262-6 recommends it most strongly at the highest ASIL.", concepts: ["aw05.structural-coverage"] },
    { id: "aw05-l03-f3", front: "Linked vs verified requirement coverage", back: "Linked: a test is traced to the requirement. Verified: the latest linked result is a pass on the current configuration.", concepts: ["aw05.requirement-coverage"] },
    { id: "aw05-l03-f4", front: "Envelope coverage", back: "Visited feasible cells / feasible cells, from measured signals; exclude cells above the power limit.", concepts: ["aw05.envelope-coverage"] },
    { id: "aw05-l03-f5", front: "Margin-normalised sensitivity", back: md`$w = \min(1, |\partial m/\partial x|\,\Delta x / M)$: share of the test's margin a rig change could consume.`, concepts: ["aw05.signal-sensitivity"] },
    { id: "aw05-l03-f6", front: "What code coverage cannot see", back: "Calibration data changes, model weight changes and rig hardware changes.", concepts: ["aw05.coverage-based-selection"] },
  ],
};

export default lesson;
