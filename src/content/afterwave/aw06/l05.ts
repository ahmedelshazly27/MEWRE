import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw06-l05",
  title: "Firmware testing: unit, SIL, HIL, static analysis, MISRA, coverage",
  summary:
    "How firmware is tested before and after it reaches a rig: the test levels from unit tests on a laptop to hardware-in-the-loop and the physical bench, static analysis and MISRA C, structural coverage up to MC/DC and what the safety standards ask for, the arithmetic of regression time, and the questions a non-coding CEO must ask a firmware team.",
  minutes: 75,
  objectives: [
    "Place unit tests, SIL, PIL, HIL and rig tests on the test pyramid and say what each can and cannot find",
    "Explain what static analysis and MISRA C compliance mean, including deviations",
    "Distinguish statement, branch and MC/DC coverage and compute the minimum MC/DC test count",
    "Compute regression wall-clock time on a pool of HIL or rig benches and the effect of test selection",
    "Ask a firmware team the questions that reveal the real state of its verification",
  ],
  concepts: [
    { id: "aw06.test-levels", name: "Firmware test levels", description: "Unit tests on host, software-in-the-loop with a plant model, processor-in-the-loop on the target chip, hardware-in-the-loop with the real controller against a real-time simulated plant, then rig and field tests with real hardware; each level is cheaper and faster than the next but sees less of the physics.", competency: "aw-test", related: ["aw06.coverage", "aw06.change-ripple"] },
    { id: "aw06.static-analysis", name: "Static analysis and MISRA", description: "Checking source code without running it, from compiler warnings to sound analysers that prove absence of run-time errors; MISRA C is a widely used coding guideline for safety-related C with mandatory, required and advisory rules and a formal deviation process.", competency: "aw-physical-ai", related: ["aw06.test-levels"] },
    { id: "aw06.coverage", name: "Structural coverage and MC/DC", description: "The share of code structure exercised by tests: statements, branches, or modified condition/decision coverage, in which every condition is shown to independently affect its decision; safety standards require stronger coverage at higher integrity levels.", competency: "aw-test", related: ["aw06.test-levels", "aw06.static-analysis"] },
    { id: "aw06.ceo-questions", name: "Verification questions for a non-coding CEO", description: "A short set of questions about test levels, coverage, static analysis, regression time, flaky tests, traceability and release criteria that reveals whether a firmware team's verification is real, without reading code.", competency: "aw-physical-ai", related: ["aw06.test-levels", "aw06.coverage", "aw06.build-identity"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "How firmware is verified",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Every firmware team Afterwave sells to already has some of this machinery: unit tests, a HIL bench, static analysis, maybe a code-level change-based testing tool. Ripple has to fit into it, not compete with it. You need to know what each layer does, where its blind spots are (almost always the physical rig), and which questions show a team's real state, both to position Afterwave and to judge your own team's firmware when Afterwave builds its own test platforms.`,
        },
        {
          kind: "md",
          md: md`### The test levels

| Level | What runs | Against what | Finds | Misses | Speed |
|---|---|---|---|---|---|
| **Unit test** | one function or module, compiled for a PC | stubs and mocks for hardware | logic errors, edge cases, regressions in algorithms | timing, hardware behaviour, integration | milliseconds per test, thousands per minute |
| **MIL** (model-in-the-loop) | the control model (for example Simulink) | a plant model | control design errors | anything in the generated or handwritten code | fast |
| **SIL** (software-in-the-loop) | the production code compiled for a PC | a plant model | integration errors between modules, code-versus-model differences | target compiler, timing, peripherals | faster or slower than real time |
| **PIL** (processor-in-the-loop) | the code on the real MCU or an emulator | a plant model on a PC | target compiler and numeric (fixed-point) issues, execution time | peripherals and real I/O timing | near real time |
| **HIL** (hardware-in-the-loop) | the real controller board with production firmware | a real-time simulator of the plant (motor, battery, vehicle) driving its I/O | I/O, timing, fault handling, diagnostics, communication; faults too dangerous to create physically | real physics: thermal, mechanical, EMC, wear, unmodelled effects | real time, minutes per test, can run unattended |
| **Rig / dyno / bench** | the real product | real loads, real environment | real physics, interactions, durability | rare field conditions | real time, expensive, often hours per test |
| **Field / fleet** | products in use | the world | what nobody imagined | (it is too late for some failures) | slowest |

The cost and realism both rise from top to bottom. A healthy programme catches most defects high in the table and uses the rig for what only the rig can show. Afterwave's capture and impact products live at the bottom two rows, where tests are the most expensive and the least automated.

HIL vendors and tools you will hear: dSPACE (SCALEXIO), NI (PXI with VeriStand and TestStand), Vector (CANoe, VT System), Speedgoat (with Simulink Real-Time), Typhoon HIL and OPAL-RT for power electronics with very fast (sub-microsecond) model steps. Unit test frameworks: Unity, CppUTest, GoogleTest; code-level test tools such as VectorCAST, Parasoft C/C++test, LDRA and Razorcat TESSY add coverage measurement and qualification evidence for safety standards.

### Static analysis and MISRA

**Static analysis** inspects source code without running it:

- **Compiler warnings** at a strict level (treat warnings as errors).
- **Linters and checkers**: clang-tidy, cppcheck, PC-lint Plus.
- **Deep analysers**: Coverity, Klocwork, CodeSonar, Helix QAC; and **sound** abstract-interpretation tools (Polyspace Code Prover, Astrée) that can prove the absence of some run-time errors (division by zero, overflow, out-of-bounds access) for all inputs.

**MISRA C** (from the MISRA consortium; MISRA C:2012 with amendments, consolidated as **MISRA C:2023**; MISRA C++:2023 for C++) is a set of guidelines restricting C to a safer subset: no undefined behaviour, no standard-library dynamic memory allocation, explicit and limited type conversions, a single point of exit per function (advisory), and so on. Guidelines are **mandatory**, **required** or **advisory**. A team may **deviate** from a required rule with a documented, reviewed justification. Compliance means: all mandatory rules met, every required-rule violation either fixed or covered by an approved deviation, and the record to prove it. Hundreds of blanket deviations mean the label is cosmetic.

### Structural coverage

Coverage measures how much of the code's structure the tests exercise:`,
        },
        { kind: "equation", formula: "aw06-coverage" },
        {
          kind: "md",
          md: md`- **Statement coverage**: every statement executed at least once.
- **Branch (decision) coverage**: every decision has taken both true and false outcomes.
- **MC/DC** (modified condition/decision coverage): in addition, every **condition** inside a decision has been shown to **independently** change the decision's outcome while the other conditions are held fixed. For a decision such as **enable AND NOT fault AND (speed below limit OR override)** with four conditions, full combinational testing needs $2^4 = 16$ cases; MC/DC can be achieved with as few as $N + 1 = 5$.`,
        },
        { kind: "equation", formula: "aw06-mcdc-min" },
        {
          kind: "chart",
          chart: "line",
          title: "Test cases per decision: all combinations vs minimum MC/DC",
          xKey: "n",
          xLabel: "Conditions in the decision N",
          yLabel: "Test cases",
          series: [
            { key: "full", label: "All combinations (2^N)" },
            { key: "mcdc", label: "Minimum for MC/DC (N + 1)" },
          ],
          data: [
            { n: 1, full: 2, mcdc: 2 },
            { n: 2, full: 4, mcdc: 3 },
            { n: 3, full: 8, mcdc: 4 },
            { n: 4, full: 16, mcdc: 5 },
            { n: 5, full: 32, mcdc: 6 },
            { n: 6, full: 64, mcdc: 7 },
            { n: 7, full: 128, mcdc: 8 },
            { n: 8, full: 256, mcdc: 9 },
          ],
          caption: "MC/DC grows linearly with the number of conditions while exhaustive testing grows exponentially. This is why safety standards use it at the highest integrity levels.",
        },
        {
          kind: "md",
          md: md`What the standards ask (summary; read the tables in the standard itself):

| Standard | Integrity levels | Structural coverage expectation |
|---|---|---|
| **ISO 26262-6:2018** (road vehicles, software unit level) | ASIL A to D | statement coverage highly recommended at A and B; branch coverage highly recommended at B to D; MC/DC highly recommended at D |
| **IEC 61508-3** (general functional safety) | SIL 1 to 4 | statement coverage, then branch, then MC/DC recommended or highly recommended with rising SIL |
| **DO-178C** (airborne software) | Level A to D | statement (C), plus decision (B), plus MC/DC (A) |
| **ISO 13849-1:2023** (machinery control systems) | PL a to e | new Clause 7 on software safety requirements; software fault avoidance measures in Annex N, including testing; check the text for coverage specifics |

Two cautions: **coverage is necessary, not sufficient** (100% MC/DC with weak assertions proves little), and **coverage on the host is not coverage on the target** (different compiler, different code). Standards also expect **requirements-based tests**: coverage measures what the requirements-based tests missed, not a goal by itself.

### Regression time arithmetic

A HIL or rig regression is limited by bench-hours:`,
        },
        { kind: "equation", formula: "aw06-regression-time" },
        {
          kind: "md",
          md: md`1,200 HIL tests of 3 minutes each are 60 test-hours. On 4 benches at 85% availability: $60/(4\times0.85) = 17.6$ hours, longer than a 14-hour overnight window. Options: more benches (5 gives 14.1 hours, still marginal), faster tests, or **selection**: running the 40% of tests a change actually affects takes $24/(4\times0.85) = 7.1$ hours. On a physical rig, where a single test can take hours and the number of rigs is small, the same arithmetic is far harsher, which is where Ripple earns its place.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Coverage and regression numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "MC/DC for a torque-enable decision",
          given: md`Illustrative decision in a drive's firmware: torque is enabled if **E AND NOT F AND (S OR O)**, where E = enable command, F = fault active, S = speed below limit, O = maintenance override. Find a minimum MC/DC test set.`,
          steps: [
            { md: md`**Baseline true case:** E = 1, F = 0, S = 1, O = 0 gives true (case 1).` },
            { md: md`**Show E matters:** flip E only: E = 0, F = 0, S = 1, O = 0 gives false (case 2). **Show F matters:** from case 1 flip F: E = 1, F = 1, S = 1, O = 0 gives false (case 3).` },
            { md: md`**Show S matters:** from case 1 flip S: E = 1, F = 0, S = 0, O = 0 gives false (case 4). **Show O matters:** from case 4 flip O: E = 1, F = 0, S = 0, O = 1 gives true (case 5).` },
            { md: md`**Result:** 5 cases ($N + 1$ with $N = 4$) show each condition independently changing the outcome, against 16 for all combinations.` },
            { md: md`**What this does not show:** whether the override should ever enable torque at overspeed. MC/DC proves the tests exercised the logic; the requirement (and the safety analysis) decides whether the logic is right.` },
          ],
          result: md`Five tests achieve MC/DC on a four-condition safety decision. Coverage tools (VectorCAST, LDRA, Parasoft, TESSY and others) find such sets and report gaps; the team still has to judge whether each expected result matches the requirement.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Does the HIL regression fit overnight?",
          given: md`Illustrative: same 1,200-test HIL suite, 3 minutes per test (60 test-hours). The team buys two more benches: 6 benches, and improves availability to 90%. Overnight window: 14 hours.`,
          steps: [
            { md: md`Wall-clock time $T = 60/(6\times0.90)$.` },
            { md: md`$T = 11.1$ hours.`, hidden: true, check: { prompt: "Wall-clock regression time (h)", answer: 11.1, unit: "h", tolerance: { abs: 0.1 } } },
            { md: md`It fits the 14-hour window with about 2.9 hours to spare, until the suite grows. At 10% growth a year, the margin is gone in about 2.5 years.` },
          ],
          result: md`Hardware scales regression linearly at full capital cost; selection scales it for free if the selection is trustworthy. Real programmes need both.`,
        },
        {
          kind: "question",
          question: {
            id: "aw06-l05-p1",
            type: "numeric",
            prompt: md`A firmware module has 2,300 branches. Its unit and SIL tests execute 1,840 of them in both directions. What is its branch coverage (%)?`,
            answer: 80,
            tolerance: { abs: 0.1 },
            unit: "%",
            explanation: md`$1{,}840/2{,}300 = 0.80$, so 80%. The useful follow-up question is not "can you reach 100%?" but "what are the 460 uncovered branches?": often error handling and fault paths, which are exactly the ones HIL fault injection should cover.`,
            concepts: ["aw06.coverage"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Asking the right questions",
      blocks: [
        {
          kind: "md",
          md: md`### Who does it

Firmware developers write unit tests; a verification and validation (V&V) or firmware test team owns SIL and HIL; HIL engineers build and maintain plant models and benches; rig or dyno engineers (Ismail's and Yusuf's background) run physical tests; a functional safety manager decides which evidence the safety case needs. In small companies one person does several of these.

### Where firmware testing goes wrong

- **HIL plant model never validated** against the real rig, so HIL passes and the rig fails.
- **Coverage measured on host builds** only, never on the target binary.
- **Flaky tests** ignored or re-run until green; they hide real intermittent defects.
- **MISRA "compliance"** with blanket deviations nobody reviewed.
- **No traceability**: tests cannot be mapped to requirements, so nobody knows what a failure means or what a change affects.
- **Rig tests not in CI**: physical tests run manually, results in spreadsheets, without build identity (lesson 4). This is the gap Afterwave targets.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "Positioning against code-level change-based testing",
          md: md`Per the course research, VectorCAST offers change-based testing that computes the minimal subset of unit and integration tests affected by source-code changes, based on code coverage. Requirements tools (Jama, Polarion, DOORS) flag "suspect links" when a requirement changes. No vendor found in the research offers change-impact test selection for physical rig tests driven by firmware, model and rig changes together. Afterwave's message is complementary: keep your code-level selection; Ripple covers the expensive physical layer those tools cannot see, using bench memory (signals, timing, calibration, rig configuration) rather than code coverage alone.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Check before quoting",
          md: md`The VectorCAST change-based testing description comes from older secondary press material recorded in the research brief (date not available). Confirm the current feature set on the vendor's site before using it in customer-facing material. Coverage recommendations by ASIL and SIL above are summaries; quote the tables of ISO 26262-6 and IEC 61508-3 directly in any formal document.`,
        },
        {
          kind: "ask",
          title: "What a non-coding CEO must ask the firmware team",
          items: [
            "Which test levels do we have (unit, SIL, HIL, rig), and roughly what share of defects did each find in the last few releases?",
            "What is our statement and branch coverage on the target build, and what kinds of code are in the uncovered part?",
            "How many static analysis findings and MISRA deviations are open, and what is the trend per release?",
            "How long does a full HIL regression take, and how long a full rig regression, in bench-hours and wall-clock time?",
            "Which tests are flaky, and what is the plan for each?",
            "Can every test be traced to a requirement, and every requirement to at least one test?",
            "What are the release criteria, and who signs them off?",
            "For the last release, which rig tests did we rerun, why those, and what did we skip?",
            "How is the HIL plant model validated against the real rig?",
            "Which build identity is recorded with each rig test result, and is it read from the device or typed?",
          ],
        },
        { kind: "scenario", scenario: "aw06-s3" },
        {
          kind: "question",
          question: {
            id: "aw06-l05-p2",
            type: "short",
            prompt: md`Afterwave will build its own instrumented actuator test platform (product vision step 4), with its own controller firmware. Write the **firmware verification policy** you, as CEO, would ask the cofounders to adopt for that platform's firmware: test levels and what each must cover, static analysis and coding standard, coverage targets with a justification tied to the platform's safety relevance, regression time targets, and the release criteria. One page.`,
            rubric: [
              "Defines test levels (unit, SIL or HIL, rig) with what each must cover, including fault injection at HIL or rig level",
              "Specifies static analysis and a coding standard (for example MISRA C with a deviation process) proportionate to a small team",
              "Sets coverage targets tied to safety relevance (stronger coverage, up to MC/DC, for interlock and safety-related code; statement or branch for the rest) and measured on the target build",
              "Sets a regression time target (for example the full HIL suite overnight) and uses test selection for rig tests",
              "States release criteria including build identity, traceability and sign-off, and dogfoods Lockstep and Ripple",
              "Is proportionate to an early-stage company: avoids paperwork that would not be maintained",
            ],
            modelAnswer: md`**Firmware verification policy: Afterwave actuator test platform (draft)**

**Scope:** controller firmware of the platform (drive control, load control, interlocks, data capture). Safety-related parts: interlocks, emergency stop handling, torque and speed limits.

**Test levels**
- **Unit tests** on host for all modules; run on every commit in CI.
- **SIL** of the control and interlock logic with a plant model of the platform; run on every merge.
- **HIL** (one bench, real controller board) with fault injection: overcurrent, encoder loss, e-stop, communication loss, sensor out of range; full suite nightly.
- **Rig** (the platform itself): commissioning tests per release; selection by Ripple for minor releases, full suite for major releases.

**Static analysis and coding standard:** compiler warnings as errors; one deep analyser in CI; MISRA C:2023 for safety-related modules with every deviation documented and reviewed by a second engineer; advisory rules elsewhere.

**Coverage (target build):** safety-related modules MC/DC 100% or justified gaps; other modules branch coverage of at least 80%, with uncovered branches reviewed each release.

**Regression time:** full HIL suite under 10 hours; rig selection must fit one overnight window; any test flaky twice is quarantined and fixed within two weeks.

**Release criteria:** all unit, SIL and HIL tests pass; no open high-severity static findings; coverage targets met; every requirement traced to a test; build identity (commit, variant, calibration, bootloader, hardware) recorded by Lockstep with every rig run; Ripple's selection and its rationale attached to the release; sign-off by the firmware owner and a second engineer.`,
            explanation: md`A strong policy is proportionate: rigorous where safety lives (interlocks, limits), lighter elsewhere, and automated so it is actually followed. Using Lockstep and Ripple on Afterwave's own platform is also the best demo.`,
            concepts: ["aw06.test-levels", "aw06.coverage", "aw06.static-analysis", "aw06.ceo-questions"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a design partner's VP of engineering where HIL testing stops being enough and why the physical rig still matters, without implying their HIL is poor.",
          keyPoints: [
            "HIL runs the real controller against a real-time plant model: excellent for I/O, timing, diagnostics and dangerous faults",
            "The plant model is a simplification: thermal, mechanical, EMC, wear and unmodelled effects only appear on real hardware",
            "Rig tests are slow and expensive, so they are the least automated and most selectively run",
            "Code-level coverage and change-based testing do not see the physical layer",
            "Bench memory and change-impact selection target exactly that layer, complementing HIL rather than replacing it",
          ],
        },
        { kind: "sources", refs: ["aw06-r17", "aw06-r18", "aw06-r19", "aw06-r20", "aw06-r21", "aw06-r22", "aw06-r24"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw06-l05-q1",
      type: "order",
      prompt: "Order these test levels from cheapest and fastest per test to most realistic and expensive.",
      items: [
        "Unit test on host",
        "Software-in-the-loop",
        "Processor-in-the-loop",
        "Hardware-in-the-loop",
        "Physical rig or dyno test",
      ],
      explanation: md`Each step adds realism (target compiler, real I/O and timing, real physics) and cost. Defects should be caught as high up as possible; the rig is for what only the rig can show.`,
      concepts: ["aw06.test-levels"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw06-l05-q2",
      type: "numeric",
      prompt: md`A safety decision has 6 conditions. What is the minimum number of test cases for MC/DC?`,
      answer: 7,
      tolerance: { abs: 0 },
      unit: "tests",
      explanation: md`$N + 1 = 7$ in the best case, against $2^6 = 64$ for all combinations. Coupled conditions can make the minimum larger.`,
      concepts: ["aw06.coverage"],
      difficulty: 1,
    },
    {
      id: "aw06-l05-q3",
      type: "mcq",
      prompt: "What does MC/DC require beyond branch coverage?",
      options: [
        "That every statement runs at least twice",
        "That each condition in a decision is shown to independently change the decision's outcome",
        "That all combinations of conditions are tested",
        "That tests run on the target hardware",
      ],
      answer: 1,
      explanation: md`MC/DC adds independence of each condition. All combinations is exhaustive testing, which MC/DC is designed to avoid.`,
      concepts: ["aw06.coverage"],
      difficulty: 1,
    },
    {
      id: "aw06-l05-q4",
      type: "numeric",
      prompt: md`A rig regression has 90 tests averaging 1.5 hours. The team has 3 rigs at 80% availability. How many wall-clock hours does a full regression take?`,
      answer: 56.25,
      tolerance: { abs: 0.1 },
      unit: "h",
      explanation: md`$90\times1.5 = 135$ test-hours; $135/(3\times0.8) = 56.25$ h, more than two days of continuous running. Selecting the affected third would take about 19 hours.`,
      concepts: ["aw06.test-levels"],
      difficulty: 2,
    },
    {
      id: "aw06-l05-q5",
      type: "multi",
      prompt: "Which statements about MISRA C compliance are correct? (Select all that apply.)",
      options: [
        "Mandatory guidelines may not be deviated from",
        "Required guidelines may be deviated from with a documented, approved justification",
        "A project with hundreds of unreviewed blanket deviations can still honestly claim meaningful compliance",
        "Advisory guidelines are recommendations that can be disapplied with less formality",
        "MISRA C compliance proves the code is free of functional bugs",
      ],
      answer: [0, 1, 3],
      explanation: md`Compliance is a disciplined subset of C with a deviation record; it reduces classes of defects but proves nothing about whether the code meets its requirements.`,
      concepts: ["aw06.static-analysis"],
      difficulty: 2,
    },
    {
      id: "aw06-l05-q6",
      type: "decision",
      prompt: md`Your own firmware lead reports 100% statement coverage for the actuator platform's interlock module, measured on host unit tests, and proposes to skip HIL fault-injection tests for this release to save time. What do you decide?`,
      options: [
        { text: "Accept: 100% coverage means the module is fully tested.", score: 0, feedback: "Statement coverage on host says nothing about target compilation, I/O timing or the fault paths' behaviour with real hardware." },
        { text: "Keep the HIL fault-injection tests for the interlock, and ask for branch or MC/DC coverage on the target build for safety-related code.", score: 1, feedback: "Safety-related code needs stronger coverage on the real binary and fault injection with real I/O. Selection can cut other tests, not these." },
        { text: "Run the full HIL suite and the full rig regression.", score: 0.5, feedback: "Safe, but ignores the time the selection could save on non-safety tests; the key is not skipping the interlock tests." },
      ],
      explanation: md`Coverage type and where it is measured matter. For interlocks, fault injection on real hardware is the evidence the safety case needs.`,
      concepts: ["aw06.coverage", "aw06.test-levels", "aw06.ceo-questions"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw06-l05-f1", front: "SIL vs HIL", back: "SIL: production code compiled for a PC against a plant model. HIL: the real controller board against a real-time plant simulator wired to its I/O.", concepts: ["aw06.test-levels"] },
    { id: "aw06-l05-f2", front: "What HIL cannot show", back: "Real physics: thermal, mechanical, EMC, wear and anything the plant model leaves out.", concepts: ["aw06.test-levels"] },
    { id: "aw06-l05-f3", front: "MC/DC in one line", back: "Every condition shown to independently change its decision; minimum N + 1 tests for N conditions.", concepts: ["aw06.coverage"] },
    { id: "aw06-l05-f4", front: "ISO 26262-6 coverage at ASIL D", back: "Branch coverage and MC/DC highly recommended at the software unit level.", concepts: ["aw06.coverage"] },
    { id: "aw06-l05-f5", front: "MISRA guideline categories", back: "Mandatory (no deviation), required (deviation with documented approval), advisory.", concepts: ["aw06.static-analysis"] },
    { id: "aw06-l05-f6", front: "Regression wall-clock time", back: md`$T = N t/(m a)$: tests times duration over benches times availability.`, concepts: ["aw06.test-levels"] },
    { id: "aw06-l05-f7", front: "Two coverage cautions", back: "Coverage is necessary, not sufficient; host coverage is not target coverage.", concepts: ["aw06.coverage"] },
  ],
  scenarios: [
    {
      id: "aw06-s3",
      title: "\"We already have HIL and change-based testing\"",
      context: md`Illustrative. A discovery call with the firmware V&V lead of a (hypothetical) motor-drive manufacturer. Ismail is on the call with you. After your Ripple overview she says: "We have six HIL benches running every night and VectorCAST change-based testing on our unit tests. Why would we need this?"`,
      start: "a",
      concepts: ["aw06.test-levels", "aw06.ceo-questions", "aw06.change-ripple"],
      nodes: {
        a: {
          md: md`How do you respond?`,
          choices: [
            { text: "Say Ripple is better than VectorCAST and HIL.", score: 0, feedback: "It is not comparable and she knows it. You lose credibility in one sentence." },
            { text: "Acknowledge their setup is strong, then ask: \"After a firmware release, how do you decide which dyno tests to rerun, and how many dyno-hours did the last release take?\"", score: 9, feedback: "Moves the conversation to the layer their tools do not cover, using her own numbers.", next: "b" },
            { text: "Offer a discount.", score: 1, feedback: "Price is not the objection; relevance is.", next: "b" },
          ],
        },
        b: {
          md: md`She answers: "The dyno team decides from the release notes and experience. Last major release took about three weeks of dyno time. Sometimes they miss things; we found a derating issue in the field last year." Ismail wants to explain Lockstep in detail.`,
          choices: [
            { text: "Let Ismail describe how a similar decision worked in drive validation in general terms, then propose a scoped pilot: Lockstep on one dyno, Ripple recommendations shadowing the dyno team's own choices for two releases, measured by dyno-hours and misses.", score: 10, feedback: "Credible peer voice, a low-risk shadow pilot and a success measure in her own terms. No claims about her company's past beyond what she said." },
            { text: "Tell her Ripple would certainly have caught last year's field issue.", score: 2, feedback: "You do not know that. Overclaiming to a V&V lead is fatal." },
            { text: "Send a deck after the call.", score: 4, feedback: "Loses the momentum of a stated pain; propose the next step while she is engaged." },
          ],
        },
      },
    },
  ],
};

export default lesson;
