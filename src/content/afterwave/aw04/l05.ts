import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw04-l05",
  title: "From traceability to evidence: test runs, bench data and change impact",
  summary:
    "Extending the trace chain past the test case to the test run, its configuration and the raw bench data; the gaps that make change-impact analysis slow and unreliable (changes that are not items, missing run context, verdicts without data, implicit dependencies, no history); how stale evidence and impact scores are computed; and how bench memory, as described in Afterwave's product vision, could close those gaps.",
  minutes: 80,
  objectives: [
    "Draw the full evidence chain from requirement to raw signal and name the link that is usually missing",
    "List the gaps that make change-impact analysis hard, and say which ones a requirements tool can and cannot fix",
    "Compute the stale-evidence share for a baseline and a combined impact score for a test under several changes",
    "Explain how Lockstep capture, bench memory and Ripple map onto those gaps, staying within the described product",
    "Design pilot success criteria that prove change-impact value without overclaiming",
  ],
  concepts: [
    { id: "aw04.evidence-chain", name: "Evidence chain", description: "Requirement, test case, test run, run context (configuration), raw data, derived metric, verdict: the full path an assessor or engineer follows to trust a result.", competency: "aw-impact", related: ["aw04.run-context", "aw04.bidirectional-traceability"] },
    { id: "aw04.stale-evidence", name: "Stale evidence (verification debt)", description: "Requirements whose latest passing evidence predates a change somewhere in their dependency chain; each needs a rerun or a written impact argument.", competency: "aw-impact", related: ["aw04.baseline", "aw04.coverage-metrics"] },
    { id: "aw04.implicit-dependency", name: "Implicit dependency", description: "A real dependency of a test on a firmware module, model, rig part or calibration that no trace link records; the main cause of missed regressions after trace-based selection.", competency: "aw-impact", related: ["aw04.suspect-link", "aw04.evidence-chain"] },
    { id: "aw04.impact-score", name: "Combined impact score", description: "Noisy-OR combination of per-change probabilities that a test's outcome is affected, used to rank and select tests to rerun under a rig-hour budget.", competency: "aw-impact", related: ["aw04.implicit-dependency"] },
    { id: "aw04.bench-memory-trace", name: "Bench memory as the evidence layer", description: "Accumulated captured runs (signals and on-screen actions on one clock, with configuration) linked to test runs and requirements, so changes can be traced to past measurements.", competency: "aw-impact", related: ["aw04.evidence-chain", "aw04.run-context"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "The chain past the test case",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`This lesson is the bridge from your buyers' world (requirements tools, coverage, assessors) to Afterwave's product. You will use it in discovery calls ("show me how you decide what to rerun after a firmware change"), in the Ripple demo narrative, and when a cofounder proposes a feature: does it close a real gap in the evidence chain, or is it a dashboard? Keep one discipline: describe what Lockstep, Enclave, Ripple and bench memory are meant to do as the product vision says, and leave claims about what ships today to your cofounders and to evidence.`,
        },
        {
          kind: "flow",
          title: "The full evidence chain",
          steps: [
            { label: "Requirement", detail: "ACT-04: encoder loss to STO within 5 ms (ASIL attribute, baseline version)" },
            { label: "Test case", detail: "TC-311: procedure, fault injection, acceptance limit 4.8 ms" },
            { label: "Test run", detail: "Execution on a date, by an operator, for a release" },
            { label: "Run context", detail: "Firmware build hash, HW revision, rig and fixture, calibration, DAQ config, model version" },
            { label: "Raw data", detail: "Signals and on-screen actions on one clock (fault edge, gate signals, torque)" },
            { label: "Derived metric and verdict", detail: "STO time 4.1 ms computed by a versioned script; PASS" },
          ],
          caption: "Requirements and test tools hold the first three links. The last three usually live in files, scripts and people's memory, so they cannot be queried when something changes.",
        },
        {
          kind: "md",
          md: md`### The gaps that make change impact hard

| Gap | Symptom | Can a requirements tool fix it? |
|---|---|---|
| **Changes are not items** | Firmware commits, model retrains, rig swaps and calibrations never raise a suspect flag | Partly, if every change is modelled as an item, which few teams do |
| **Run context missing** | "PASS on v3.0" without the build hash, rig or calibration | No: the context is produced at the bench, not in the tool |
| **Verdict without data** | The waveform is a screenshot attached to the run, or nowhere | No |
| **Unversioned derived metrics** | The script computing rise time changed; old verdicts are not comparable | No |
| **Implicit dependencies** | A thermal test depends on current-loop gains but links only to a thermal requirement | Only if someone writes the link, and they do not know it exists |
| **No time alignment** | Command logged by the test software, response by the DAQ, on different clocks | No: needs synchronised capture |
| **No queryable history** | Nobody can ask "which past changes moved this measurement?" | No |

Lesson 2 showed that a trace-based selection is cheap when the graph is complete. These gaps are why it is not complete: the graph models what engineers **intended** to depend on, not what the measurements **show** depends on what.

### Measuring the debt

After a change, the honest question is how much of the evidence is now stale:`,
        },
        { kind: "equation", formula: "aw04-stale-evidence" },
        {
          kind: "md",
          md: md`Computing $D$ needs $t_{chg}(r)$, the time of the last change anywhere in the chain of $r$, including firmware, rig and calibration. If those changes are not recorded as items with timestamps, $D$ is unknown, and teams default to "rerun everything" or "rerun what the senior engineer remembers". Industrial research on hardware-dependent system tests reports exactly this: selection is mostly manual and based on tester judgement (OMICRON study, research brief).

### Combining evidence about impact

Trace links give a first estimate of which tests a change touches. History gives a second: did past changes to this firmware module move this test's measurement? A simple way to combine several changes on one test is the noisy-OR score:`,
        },
        { kind: "equation", formula: "aw04-impact-score" },
        {
          kind: "md",
          md: md`Each weight $w_{i,t}$ can start from the trace graph (linked: high; not linked: low but not zero) and be updated from bench history (a test whose metric shifted after earlier changes to the same module gets a higher weight). Select tests above a threshold, or greedily by score per rig-hour until the rig budget is spent. Two numbers judge the result: rig-hours saved against a full regression, and the **escape rate**, the share of real regressions the selection missed (found later by a full run or in the field). A selector that saves 80 % of rig-hours with escapes is worse than useless on safety requirements.

### Where bench memory fits

Afterwave's product vision maps onto the gaps directly:

- **Lockstep** records rig signals via data acquisition and on-screen actions on **one clock**, so the raw data and the time alignment exist for every run, with the configuration captured alongside.
- **Bench memory** is the accumulated record of those runs, so history becomes queryable: which changes moved which measurements.
- **Ripple** uses the change set, the customer's trace links and bench memory to say **which tests to rerun and why** after a firmware, model or rig change.
- **Afterwave Enclave** keeps captured data, models and agents on customer servers or an isolated tenant, which is what makes it acceptable to put safety evidence there.
- Later in the vision, agents plan retests and run rigs overnight **with human approval** and write reports: the impact analysis record an assessor reads in Lesson 4.

The requirements tool stays the owner of the requirement graph; bench memory supplies the links from verdicts to evidence and the history that reveals implicit dependencies.`,
        },
        {
          kind: "widget",
          widget: "change-impact",
          caption: "Pick changed firmware, model or rig artifacts and watch the impact score per test, the selected set at your threshold, rig hours saved and expected regressions caught. Try lowering a weight that represents a missing trace link and see which test drops out.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Stale evidence and impact scores for one release",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "How much evidence did the release invalidate, and what to rerun first",
          given: md`Illustrative program from Lesson 2: 240 requirements. Release 3.1 changes the current-controller gains (firmware) and replaces the load cell on rig R2 (new calibration). Using captured run context, 31 requirements have their latest passing evidence from before one of these changes in their chain. Test TC-311 (encoder-loss reaction) is linked to the firmware change through no trace link, but bench history shows its timing shifted after two earlier current-loop changes: weight 0.6 for the firmware change. It runs on R2: weight 0.2 for the load-cell change.`,
          steps: [
            { md: md`**Stale share:** $D = 31/240 = 0.129$, so **12.9 %** of requirements need a rerun or a written impact argument before release 3.1 can claim them.` },
            { md: md`**Impact score for TC-311:** $s = 1 - (1 - 0.6)(1 - 0.2) = 1 - 0.4 \times 0.8 = 0.68$.` },
            { md: md`**Selection:** with a threshold of 0.3, TC-311 is selected although no trace link connects it to the firmware change. A purely trace-based selection would have skipped it: an implicit dependency revealed by history.` },
            { md: md`**Record:** the reason for selection (history of timing shifts after current-loop changes; rig calibration change) goes with the recommendation, so an engineer can approve it and the assessor can read it.` },
          ],
          result: md`The stale share sizes the work; the impact score orders it. The value is not the arithmetic, it is having the timestamps, the context and the history to do it at all.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Three small changes on one test",
          given: md`Test TC-202 (torque ripple). Changes in the release with estimated weights on TC-202: PWM frequency table edit 0.3, encoder offset recalibration 0.2, DAQ anti-alias filter change 0.1. Threshold 0.4. Total requirements 300, of which 45 are stale.`,
          steps: [
            { md: md`$s = 1 - (1 - 0.3)(1 - 0.2)(1 - 0.1) = 1 - 0.7 \times 0.8 \times 0.9$` },
            { md: md`$s = 1 - 0.504 = 0.496$: selected (above 0.4), although no single change would be.`, hidden: true, check: { prompt: "Combined impact score", answer: 0.496, tolerance: { abs: 0.005 } } },
            { md: md`Stale share $D = 45/300$.` },
            { md: md`$D = 0.15$, so **15 %**.`, hidden: true, check: { prompt: "Stale evidence share (%)", answer: 15, unit: "%", tolerance: { abs: 0.1 } } },
          ],
          result: md`Several small changes add up. Reviewers who look at changes one at a time, as suspect-link review does, miss this accumulation.`,
        },
        {
          kind: "question",
          question: {
            id: "aw04-l05-p1",
            type: "numeric",
            prompt: md`Two changes affect test TC-400 with weights 0.25 and 0.25. What is the combined impact score?`,
            answer: 0.4375,
            tolerance: { abs: 0.002 },
            explanation: md`$s = 1 - 0.75^2 = 1 - 0.5625 = 0.4375$. Not 0.5: the noisy-OR assumes independent effects and never exceeds 1.`,
            concepts: ["aw04.impact-score"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Selling and proving the evidence layer",
      blocks: [
        {
          kind: "md",
          md: md`### What you will find in a real lab

- Requirements in a tool (or a spreadsheet), test cases linked by ID, verdicts in a test tool, and **bench data on a network share named by date and rig**.
- One or two senior engineers who know which tests "always break when the current loop changes". That knowledge is the implicit dependency graph, and it leaves when they do.
- Regression after each firmware release run in full when rigs allow, cut by judgement when they do not.

### How to prove value in a pilot

The pilot must show three things, measured on the customer's own changes:

1. **Coverage truth:** the stale share and gaps before and after capture (Lesson 2 report), computed in hours instead of days.
2. **Selection quality:** for a set of past or live changes, the tests Ripple would rerun versus the full regression results: rig-hours saved and **escapes** (regressions the selection would have missed). Report both; never only the savings.
3. **Explainability:** each recommendation carries its reasons, so an engineer can approve it and an assessor could read it (Lesson 4).

A cold start is normal: bench memory begins empty, so early selections lean on trace links and engineer weights, and history improves them over time. Say so up front.`,
        },
        { kind: "xref", to: "fc02-l06", note: "MVP scoping and pilots: how to write success criteria so a pilot converts instead of stalling." },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Overclaiming kills credibility with validation leads",
          md: md`Validation leads have watched many tools promise to "reduce testing by 70 %". If you quote savings without escapes, or present the product vision (agents running rigs overnight, Afterwave's own test platforms) as shipped, you lose the room. Lead with the evidence chain gap they already feel, show the reasoning on their own data, and let the numbers come from their changes.`,
        },
        {
          kind: "checklist",
          title: "Evidence-chain audit for a prospect lab (first visit)",
          items: [
            "Pick three recent PASS verdicts: can they produce the firmware build hash, hardware revision, rig and calibration for each in under 10 minutes?",
            "For one of them, can they open the raw signals and recompute the metric with the same script version?",
            "Are firmware, model and rig changes recorded with timestamps anywhere queryable?",
            "Is the command (test software) and the response (DAQ) on one clock for timing requirements?",
            "Who decides what to rerun after a firmware change, and is the decision written down?",
            "When did a regression last escape to a later stage, and which test would have caught it?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw04-l05-p2",
            type: "short",
            prompt: md`**Produce the Ripple demo narrative** (about 300 words, five beats) for a validation lead at an illustrative humanoid actuator lab. It must start from their evidence-chain gap, show one change flowing through requirements, tests, run context and bench history to a recommendation with reasons, include both rig-hours saved and an escape check, and end with a pilot proposal. Use only labelled illustrative numbers and stay within the described product (Lockstep, Enclave, Ripple, bench memory); flag anything that is vision rather than shipped.`,
            rubric: [
              "Opens with a concrete evidence-chain gap the buyer recognises (verdicts without run context, changes outside the trace graph, judgement-based reruns)",
              "Walks one change end to end: change set, trace links, run context and bench history, recommendation with reasons per test",
              "Shows an implicit dependency caught through history that trace links alone would miss",
              "Reports rig-hours saved and escapes (or an escape check against full regression), not savings alone",
              "Keeps data in Enclave, uses labelled illustrative numbers, and separates vision (agents, own platforms) from what is demonstrated",
              "Ends with a specific pilot proposal with measurable success criteria",
            ],
            modelAnswer: md`**Beat 1, the gap.** "Last release, how did you decide which actuator tests to rerun? Your requirements tool flagged suspect links for two edited requirements, but the firmware change itself raised nothing, and your PASS records say 'v3.0' without a build hash or rig calibration."

**Beat 2, capture.** Lockstep records the DAQ signals and the test software's on-screen actions on one clock for every run on rig R2, with build hash, hardware revision, fixture and calibration. It all stays in Afterwave Enclave on your servers.

**Beat 3, one change.** (Illustrative.) Release 3.1 changes current-controller gains. Ripple reads your trace links: 14 tests verify the affected requirements. Bench memory adds what the links miss: the encoder-loss reaction test (TC-311) shifted its timing after the last two current-loop changes, so it is selected with the reason shown. 19 tests, 105 of 1,200 rig-hours.

**Beat 4, trust.** We replay your last six releases: Ripple's selection versus the full regressions you actually ran. Illustrative result format: rig-hours saved per release, and every regression the selection would have missed, listed. If there are escapes, we show them and why. Every recommendation is a list an engineer approves.

**Beat 5, pilot.** Eight weeks on two rigs: capture all runs, replay past releases, run Ripple live on two new releases in parallel with your normal process. Success criteria: zero escapes on safety-linked tests, at least X % rig-hours saved on the rest, impact report produced in under one day. Agents that plan and run retests overnight are on the roadmap, not part of this pilot.`,
            explanation: md`Graded against the rubric. The strongest narratives let the buyer's own data make the argument, and treat escapes as a first-class result.`,
            concepts: ["aw04.evidence-chain", "aw04.implicit-dependency", "aw04.impact-score", "aw04.bench-memory-trace"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to Ismail and Yusuf, in five sentences, why a complete requirements trace graph still lets regressions escape after a firmware change, and what bench memory adds.",
          keyPoints: [
            "The trace graph records intended dependencies between requirements and tests, not the actual dependencies of measurements on code, models and rigs",
            "Firmware, model, rig and calibration changes are usually not items in the graph, so they raise no suspect flags",
            "Verdicts lack run context and raw data, so nobody can check which past results depended on what changed",
            "Bench memory links each verdict to captured signals and configuration on one clock, making history queryable",
            "History reveals implicit dependencies (tests whose metrics moved after similar changes), which Ripple can use with reasons an engineer approves",
          ],
        },
        { kind: "sources", refs: ["aw04-r16", "aw04-r11", "aw04-r8"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw04-l05-q1",
      type: "order",
      prompt: "Order the evidence chain from requirement to verdict.",
      items: ["Requirement", "Test case", "Test run", "Run context", "Raw data", "Derived metric and verdict"],
      explanation: md`The requirement is verified by a test case, executed as a run on a configuration (context), producing raw data from which a versioned script computes the metric and the verdict.`,
      concepts: ["aw04.evidence-chain"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw04-l05-q2",
      type: "numeric",
      prompt: md`Weights of three changes on one test: 0.5, 0.2 and 0.2. What is the combined impact score?`,
      answer: 0.68,
      tolerance: { abs: 0.005 },
      explanation: md`$1 - 0.5 \times 0.8 \times 0.8 = 1 - 0.32 = 0.68$.`,
      concepts: ["aw04.impact-score"],
      difficulty: 1,
    },
    {
      id: "aw04-l05-q3",
      type: "mcq",
      prompt: "Which gap can a requirements tool NOT fix by itself, however well configured?",
      options: [
        "Missing links between requirements and test cases",
        "Missing run context (build hash, rig, calibration) on each bench result",
        "Unreviewed suspect links",
        "Requirements without a verification method attribute",
      ],
      answer: 1,
      explanation: md`Run context is produced at the bench when the test runs. The tool can store it if something captures it, but it cannot create it.`,
      concepts: ["aw04.evidence-chain"],
      difficulty: 2,
    },
    {
      id: "aw04-l05-q4",
      type: "mcq",
      prompt: "A thermal soak test fails after a current-controller gain change, although it links only to a thermal requirement that did not change. What is this?",
      options: ["An orphan test", "An implicit dependency", "A suspect link", "A coverage gap"],
      answer: 1,
      explanation: md`The test truly depends on the controller (gains change copper losses and heating), but no trace link records it. Trace-based selection misses it; bench history can reveal it.`,
      concepts: ["aw04.implicit-dependency"],
      difficulty: 1,
    },
    {
      id: "aw04-l05-q5",
      type: "numeric",
      prompt: md`Of 400 requirements, 52 have their latest passing evidence from before a change in their chain. What is the stale share? (%)`,
      answer: 13,
      tolerance: { abs: 0.1 },
      unit: "%",
      explanation: md`$D = 52/400 = 0.13 = 13$ %. Each needs a rerun or a written impact argument before the release claims them.`,
      concepts: ["aw04.stale-evidence"],
      difficulty: 1,
    },
    {
      id: "aw04-l05-q6",
      type: "decision",
      prompt: md`In a pilot replay of six past releases, Ripple's selections would have saved 78 % of rig-hours but missed one regression on a test linked to a safety requirement. How do you report it to the customer?`,
      options: [
        { text: "Lead with the 78 % and mention the miss only if asked.", score: 0, feedback: "Validation leads will find it, and you will lose trust permanently." },
        { text: "Report both: savings and the escape, with its cause (for example a dependency neither the links nor the history captured yet), the fix, and a rule that safety-linked tests are always selected when any upstream item changes until history supports otherwise.", score: 1, feedback: "Right: escapes are a first-class result, and the fix turns the miss into a stronger product." },
        { text: "Remove the safety-linked tests from the replay so the result is clean.", score: 0, feedback: "Manipulating the evaluation. It also hides exactly the case the customer cares about most." },
      ],
      explanation: md`Selection quality is two numbers, savings and escapes. On safety requirements, escapes dominate.`,
      concepts: ["aw04.impact-score", "aw04.bench-memory-trace"],
      difficulty: 2,
    },
    {
      id: "aw04-l05-q7",
      type: "multi",
      prompt: "Which statements about bench memory stay within Afterwave's described product? (Select all that apply.)",
      options: [
        "Lockstep records rig signals and on-screen actions on one clock",
        "Captured data and models can run in Enclave on customer servers or an isolated tenant",
        "Ripple says which tests to rerun and why after a firmware, model or rig change",
        "Afterwave already certifies customers' products under ISO 26262",
        "Agents planning retests with human approval are part of the later product vision",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`The first three and the last match the product description. Afterwave does not certify products; assessors and notified bodies do.`,
      concepts: ["aw04.bench-memory-trace"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "aw04-l05-f1", front: "The link usually missing in the evidence chain", back: "From the verdict to its run context and raw data (build hash, rig, calibration, DAQ config, signals).", concepts: ["aw04.evidence-chain"] },
    { id: "aw04-l05-f2", front: "Stale evidence share", back: md`$D$ = requirements whose latest pass predates a change in their chain / all requirements.`, concepts: ["aw04.stale-evidence"] },
    { id: "aw04-l05-f3", front: "Noisy-OR impact score", back: md`$s_t = 1 - \prod (1 - w_{i,t})$; several small changes can add up to a selection.`, concepts: ["aw04.impact-score"] },
    { id: "aw04-l05-f4", front: "Implicit dependency", back: "A real dependency of a test on code, model, rig or calibration that no trace link records.", concepts: ["aw04.implicit-dependency"] },
    { id: "aw04-l05-f5", front: "Two numbers that judge test selection", back: "Rig-hours saved and escape rate (regressions missed). Never report only savings.", concepts: ["aw04.impact-score"] },
    { id: "aw04-l05-f6", front: "What bench memory adds to a trace graph", back: "Verdict-to-evidence links and queryable history, which reveal implicit dependencies.", concepts: ["aw04.bench-memory-trace"] },
  ],
};

export default lesson;
