import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw04-l02",
  title: "The trace matrix and the V-model: coverage and suspect links",
  summary:
    "How the V-model pairs each requirement level with a verification level, what bidirectional traceability means in a data model, the coverage metrics that matter (link coverage, passing coverage on the current baseline, orphans), and how suspect links flag what a change might break, including why they explode and get ignored.",
  minutes: 75,
  objectives: [
    "Draw the V-model for a hardware product and name the verification activity paired with each requirement level",
    "Explain forward and backward traceability and what each one catches",
    "Compute link coverage, passing coverage on a baseline and the orphan rate, and explain why they differ",
    "Explain how suspect links work, estimate the suspect set for a change, and cost the retest",
    "Spot the failure modes of suspect-link processes (bulk clearing, one-level propagation, changes that are not items)",
  ],
  concepts: [
    { id: "aw04.v-model", name: "V-model", description: "Lifecycle view in which each decomposition level on the left (requirements, architecture, design) is paired with an integration and verification level on the right.", competency: "aw-impact", related: ["aw04.requirement-levels"] },
    { id: "aw04.bidirectional-traceability", name: "Bidirectional traceability", description: "Forward (requirement to design, implementation and verification) and backward (test or code back to the requirement that justifies it) links, so gaps and gold-plating are both visible.", competency: "aw-impact", related: ["aw04.v-model"] },
    { id: "aw04.trace-matrix", name: "Traceability matrix", description: "Tabular view of links between two artifact sets (for example requirements and test cases), used to show coverage and to find gaps and orphans.", competency: "aw-impact", related: ["aw04.bidirectional-traceability"] },
    { id: "aw04.coverage-metrics", name: "Coverage metrics", description: "Link coverage (share of requirements with a verification link), passing coverage on the current baseline, and orphan rate; only passing coverage on the current baseline says the product is verified.", competency: "aw-impact", related: ["aw04.trace-matrix"] },
    { id: "aw04.suspect-link", name: "Suspect link", description: "A trace link a tool flags for review because an item at one end changed after the link was last confirmed; the basis of traceability-level impact analysis.", competency: "aw-impact", related: ["aw04.bidirectional-traceability", "m08.change-control"] },
    { id: "aw04.baseline", name: "Baseline", description: "A frozen, identified version of a set of items (requirements, firmware, hardware revision, model, rig configuration) against which verification results are recorded.", competency: "aw-impact", related: ["aw04.coverage-metrics"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Two legs of the V and the links between them",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Suspect links are the closest thing your buyers already own to Ripple. When a test lead says "Polarion already does impact analysis", you must know exactly what it does (flags links next to a changed requirement for a human to review) and what it does not (look at a firmware diff, a model retrain, a rig swap or the bench data). This lesson gives you the mechanics and the numbers to make that distinction precisely, without overselling.`,
        },
        {
          kind: "flow",
          title: "The V-model for an actuator program (left leg down, right leg up)",
          steps: [
            { label: "Stakeholder requirements", detail: "Paired with validation (robot in its use context)" },
            { label: "System requirements", detail: "Paired with system test (full joint or robot)" },
            { label: "Architecture and subsystem requirements", detail: "Paired with integration test (actuator on dyno, HIL)" },
            { label: "Software and hardware requirements", detail: "Paired with SW and HW verification (SIL, board test)" },
            { label: "Implementation", detail: "Code, PCB, mechanics: the bottom of the V" },
          ],
          caption: "Each horizontal pair is a verification relationship. The trace links run down the left leg (decomposition) and across the V (verifies).",
        },
        {
          kind: "md",
          md: md`### Traceability as a graph

Strip the tools away and traceability is a **directed graph**: nodes are artifacts (requirements, design elements, code units, test cases, test runs, results), edges are typed links (**derives from**, **satisfies**, **verifies**, **implements**, **depends on**). Two directions:

- **Forward traceability** (requirement to verification): for every requirement, which design implements it and which test verifies it? Catches **gaps**: requirements nobody tests.
- **Backward traceability** (test or code to requirement): for every test case or code unit, which requirement justifies it? Catches **orphans** and **gold-plating**: tests nobody needs, features nobody asked for.

**Bidirectional** means both are maintained and navigable. In a database it is one link queried from both ends; in a spreadsheet it is two columns that disagree within a month.

### The traceability matrix

A matrix is a view of the graph between two sets. Illustrative extract:

| Requirement | TC-201 torque sweep | TC-202 ripple | TC-310 STO timing | TC-311 encoder loss | TC-400 thermal soak |
|---|---|---|---|---|---|
| ACT-01 backdrive torque | | | | | |
| ACT-02 STO within 10 ms | | | X | | |
| ACT-04 encoder loss to STO | | | | X | |
| ACT-05 torque rise time | X | | | | |
| ACT-06 torque ripple | X | X | | | |
| (no requirement) | | | | | X |

Read it two ways: an empty **row** (ACT-01) is a coverage gap; an empty **column** for every requirement (TC-400) is an orphan test. A cell says a link exists, not that the test passed.

### Coverage metrics

Three numbers, and the difference between them is where most programs hide:`,
        },
        { kind: "equation", formula: "aw04-link-coverage" },
        { kind: "equation", formula: "aw04-pass-coverage" },
        { kind: "equation", formula: "aw04-orphan-rate" },
        {
          kind: "md",
          md: md`**Baseline matters.** A pass on firmware v2.3 says nothing about v2.4 unless someone has argued, in writing, that the change cannot affect it. So $C_{pass}$ is always "on baseline B". Many dashboards silently show "last result ever", which overstates verification after every release.

### Suspect links

When an item changes, requirements tools (DOORS, DOORS Next, Polarion, Jama, Codebeamer) can mark the links attached to it as **suspect**. Someone reviews each suspect link: either the linked item is still valid (clear the flag) or it must change too (edit it, and its own links become suspect). For a test case, a suspect flag means "the requirement this test verifies changed: is the test still right, and does it need to run again?"

How far the flag travels matters. Propagating only to direct neighbours misses second-order effects. Propagating transitively explodes. For a uniform tree:`,
        },
        { kind: "equation", formula: "aw04-suspect-fanout" },
        {
          kind: "md",
          md: md`With fan-out 3 and depth 3, one edit flags 39 items. Engineers then **bulk-clear** suspect flags to get a release out, and the mechanism becomes noise. The deeper limitation: suspect links only fire when a **linked item in the requirements tool** changes. A firmware commit, a retrained model, a swapped load cell or a new calibration file is usually not an item in that graph, so no flag fires at all.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Tool behaviour varies",
          md: md`Default suspect propagation (direct links only, or configurable depth), whether a change to an attribute rather than the main text triggers suspicion, and how test management tools receive the flag differ by tool, version and configuration. The research brief (Nov 2026) confirms suspect links in Jama, Polarion and DOORS Next at the traceability level; Polarion documentation was not retrieved. Check the specific behaviour in a prospect's instance before claiming what it does or does not do.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "Illustrative program: link coverage vs passing coverage on the current baseline",
          xKey: "week",
          xLabel: "Program week",
          yLabel: "Share of 240 requirements (%)",
          series: [
            { key: "link", label: "Link coverage" },
            { key: "pass", label: "Passing coverage, current baseline" },
          ],
          data: [
            { week: 1, link: 62, pass: 20 },
            { week: 2, link: 70, pass: 31 },
            { week: 3, link: 76, pass: 44 },
            { week: 4, link: 81, pass: 58 },
            { week: 5, link: 85, pass: 69 },
            { week: 6, link: 88, pass: 34 },
            { week: 7, link: 88, pass: 52 },
            { week: 8, link: 88, pass: 75 },
          ],
          caption: "Illustrative numbers. Firmware v2.4 lands in week 6: link coverage is unchanged, but every requirement whose evidence is on v2.3 drops out of passing coverage until it is rerun or argued unaffected.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Reading a coverage report and costing a change",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Three coverage numbers for one program",
          given: md`Illustrative humanoid actuator program on baseline FW v2.4 / HW rev C: 240 system and software requirements; 212 have at least one verification link; 180 have all linked verifications passed on v2.4 / rev C; 410 test cases exist, of which 37 link to no requirement.`,
          steps: [
            { md: md`$C_{link} = 212/240 = 0.883$, so **88.3 %** of requirements have a planned verification.` },
            { md: md`$C_{pass} = 180/240 = 0.750$, so **75.0 %** are verified on the current baseline. The 32 linked-but-not-passing requirements are either failed, not yet run on v2.4, or blocked.` },
            { md: md`28 requirements (240 minus 212) have no verification at all: the coverage **gap**. They need a test, an analysis, or a written rationale (for example verified at a higher level).` },
            { md: md`$O = 37/410 = 0.090$, so **9.0 %** orphan tests. Each orphan is either a missing requirement (write it) or a dead test (delete it and save rig time).` },
          ],
          result: md`A dashboard showing "88 % coverage" is reporting link coverage. The honest release-gate number is 75 % on v2.4 / rev C, with 28 gaps and 37 orphans to resolve.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A firmware change hits the current-loop requirement",
          given: md`Firmware v2.5 changes the current-controller gains, which edits software requirement SWR-112 (current-loop bandwidth). Idealised trace tree below SWR-112: fan-out 3, depth 3. Of the suspect items, 18 are test cases averaging 5.5 rig-hours each. Rig-hour cost EUR 110 (illustrative, fully loaded). Full regression is 1,200 rig-hours.`,
          steps: [
            { md: md`Suspect set with transitive propagation: $|I| = \sum_{k=1}^{3} 3^k = 3 + 9 + 27$.` },
            { md: md`$|I| = 39$ items to review.`, hidden: true, check: { prompt: "Number of suspect items", answer: 39, tolerance: { abs: 0.5 } } },
            { md: md`Retest cost of the 18 suspect tests: $C_{rt} = 110 \times 18 \times 5.5$.` },
            { md: md`$C_{rt} = \text{EUR } 10{,}890$ (99 rig-hours).`, hidden: true, check: { prompt: "Retest cost of the suspect tests (EUR)", answer: 10890, unit: "EUR", tolerance: { rel: 0.01 } } },
            { md: md`Full regression: $1{,}200 \times 110 = \text{EUR } 132{,}000$. The trace-based selection is about 8 % of the full cost, if the trace graph is complete.` },
          ],
          result: md`Trace-based impact analysis is cheap when the graph is right. The risk is what is not in the graph: tests that depend on current-loop behaviour (thermal soak, acoustic noise, encoder-loss reaction timing) but link only to other requirements. That missing-dependency risk is what Lesson 5 and Ripple address.`,
        },
        {
          kind: "question",
          question: {
            id: "aw04-l02-p1",
            type: "numeric",
            prompt: md`A program has 500 requirements. 470 have a verification link; 390 passed on the current baseline. What is the passing coverage on the current baseline? (%)`,
            answer: 78,
            tolerance: { abs: 0.1 },
            unit: "%",
            explanation: md`$C_{pass} = 390/500 = 78$ %. The denominator is all requirements, not the 470 linked ones: an unlinked requirement is unverified.`,
            concepts: ["aw04.coverage-metrics"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Traceability practice and its failure modes",
      blocks: [
        {
          kind: "md",
          md: md`### How it is run

- **Who:** a requirements or systems engineer curates links; test engineers link test cases; a configuration manager owns baselines; a safety manager reviews traceability for safety requirements.
- **Rhythm:** links are reviewed at design reviews and before release gates. The release gate reads $C_{pass}$ on the release baseline, open suspect links and open gaps.
- **Change control:** a change request names the affected items; the impact analysis lists suspect links and tests to rerun; a change board approves. This is the same discipline as construction change control (see the Track 0 lesson below), applied to a design graph.

### Where it breaks

1. **Links drift.** Links are made once, at test creation, and never revisited.
2. **Spreadsheet traceability.** Matrices in Excel, regenerated by hand before each audit.
3. **Bulk clearing.** Suspect flags cleared in hundreds to unblock a release.
4. **The graph stops at the test case.** The link goes requirement to test case; the **test run** (which firmware, which rig, which calibration, which data) lives in another tool or a folder.
5. **Changes outside the graph.** Firmware commits, model retrains, rig and fixture changes, DAQ configuration changes, calibration updates: none of them is a requirement item, so none triggers a flag.`,
        },
        { kind: "xref", to: "m08-l06", note: "Change control, interface management and document control on construction projects: the same change board discipline, here applied to requirement and test baselines." },
        {
          kind: "callout",
          tone: "pm",
          title: "Ask for the number behind the number",
          md: md`When a prospect quotes coverage, ask three things: link or passing? On which baseline? What happens to the number on the day a new firmware lands? A lab that cannot answer the third question is a lab where Ripple's "which tests to rerun and why" has an obvious, measurable job.`,
        },
        {
          kind: "ask",
          title: "Questions for a test lead about their trace process",
          items: [
            "When firmware changes, what triggers the decision about which bench tests to rerun?",
            "How many suspect links were open at your last release, and how were they closed?",
            "Is a rig, fixture or calibration change an item anyone can link to?",
            "Does a test result record the exact firmware build, hardware revision and rig that produced it?",
            "How long does it take to produce a coverage report for an audit or customer review?",
          ],
        },
        { kind: "scenario", scenario: "aw04-s1" },
        {
          kind: "question",
          question: {
            id: "aw04-l02-p2",
            type: "short",
            prompt: md`**Produce a one-page 'coverage truth' report template** that an Afterwave pilot could deliver to a prospect's validation lead in week 2 of a pilot (illustrative: do not invent the prospect's numbers, use placeholders or labelled illustrative values). It must define each metric with its formula and denominator, state the baseline, separate gaps, orphans, failed and stale items, and end with the three decisions the validation lead should take.`,
            rubric: [
              "Defines link coverage, passing coverage on a named baseline and orphan rate with correct formulas and denominators",
              "States the baseline explicitly (firmware build, hardware revision, rig configuration) and treats results on older baselines as stale unless argued",
              "Separates gaps (no link), failed, not-yet-run or stale, and orphans as distinct lists",
              "Includes open suspect links and how they would be closed",
              "Ends with concrete decisions (for example write missing requirements, delete or justify orphans, rerun stale tests on scarce rigs first)",
              "Uses placeholders or labelled illustrative numbers only; no invented customer data",
            ],
            modelAnswer: md`**Coverage truth report, program [X], baseline FW [build hash] / HW rev [C] / rig config [ID, date]** (illustrative values in brackets)

| Metric | Formula | Value |
|---|---|---|
| Link coverage | requirements with at least one verification link / all requirements in scope | [212/240 = 88.3 %] |
| Passing coverage, this baseline | requirements with all linked verifications passed on this baseline / all requirements | [180/240 = 75.0 %] |
| Orphan rate | test cases with no requirement link / all test cases | [37/410 = 9.0 %] |
| Open suspect links | count, oldest first | [n] |

**Lists:** (1) Gaps: requirements with no verification [28 IDs]. (2) Failed on this baseline [IDs, test, run link]. (3) Stale: passed only on an earlier baseline, with the change that made them stale [IDs]. (4) Orphans [test IDs, rig-hours per run]. (5) Open suspect links [link, changed item, date].

**Decisions for the validation lead:** (a) For each gap: write a test, assign an analysis, or record why it is verified at another level. (b) For orphans: write the missing requirement or retire the test, and reclaim its rig hours. (c) For stale items: rerun the ones on the bottleneck rig first, or record an impact argument signed by the owner; nothing stays stale silently at the release gate.`,
            explanation: md`Graded against the rubric. The test is whether two different people would compute the same numbers from the same data using your definitions.`,
            concepts: ["aw04.coverage-metrics", "aw04.baseline", "aw04.suspect-link"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to an investor why '90 % requirements coverage' can mean the product is far from verified.",
          keyPoints: [
            "Most tools report link coverage: a test is linked, not passed",
            "Verification only counts on the current baseline; every firmware or hardware change makes old passes stale",
            "Unlinked requirements are unverified and orphan tests waste rig time",
            "Suspect links only fire when items in the requirements tool change, not for firmware, model or rig changes",
            "The honest number is passing coverage on the current baseline, which can drop sharply after each release",
          ],
        },
        { kind: "sources", refs: ["aw04-r3", "aw04-r4", "aw04-r8", "aw04-r11"] },
      ],
    },
  ],
  scenarios: [
    {
      id: "aw04-s1",
      title: "The suspect-link storm before a release",
      dayInLife: true,
      context: md`You are on a pilot call with the validation lead of an illustrative actuator company (an archetype, not a real prospect). Firmware v3.0 ships to a customer in 10 days. A requirements refactor last week left 640 suspect links open in their requirements tool. Their bench capacity is about 900 rig-hours before the ship date; full regression is 1,400 rig-hours.`,
      start: "a",
      concepts: ["aw04.suspect-link", "aw04.coverage-metrics", "aw04.baseline"],
      nodes: {
        a: {
          md: md`The validation lead says: "Management wants us to clear the suspect links by Friday. My team will just bulk-clear the ones that look cosmetic. Can Afterwave help?" What do you say first?`,
          choices: [
            { text: "Yes: Ripple can clear suspect links automatically.", next: "b", score: 1, feedback: "Overclaim. Ripple tells engineers which tests to rerun and why after a change; it does not replace their review, and you have no evidence yet it can classify their links." },
            { text: "Separate the two problems: which suspect links reflect a real behaviour change (firmware, requirement text) and which are editorial, and which tests must rerun on v3.0 given 900 rig-hours. Offer to help with the second using their change list and test history.", next: "c", score: 9, feedback: "Right framing: suspect review is a traceability task; retest selection under a rig-hour budget is the decision that matters for the ship date." },
            { text: "Bulk-clearing is fine if they are cosmetic.", next: "b", score: 3, feedback: "Possibly true for some, but you are endorsing a practice that auditors flag, without knowing which ones are cosmetic." },
          ],
        },
        b: {
          md: md`The lead is interested but asks: "So what would you actually do this week?"`,
          choices: [
            { text: "Pull back to scope: list the v3.0 change set (firmware diff, requirement edits, any rig changes), map changed items to tests through the trace graph and test history, rank tests, and fit the top ones into 900 rig-hours with a written rationale per skipped test.", next: "c", score: 7, feedback: "Recovered. A clear, bounded plan that does not overclaim." },
            { text: "Promise a full Ripple deployment by Friday.", score: 0, feedback: "Unrealistic on an on-prem pilot and it puts your credibility on a ship date you do not control." },
          ],
        },
        c: {
          md: md`Analysis shows 210 suspect links touch requirements whose text changed in meaning; the rest are editorial (ID renames, formatting). Trace links plus the firmware diff select 61 tests worth 780 rig-hours. But the firmware diff also touches the encoder driver, and 9 tests that exercise encoder faults link only to a safety requirement that did not change. What do you recommend?`,
          choices: [
            { text: "Run only the 61 trace-selected tests: the trace graph is the official record.", score: 3, feedback: "The trace graph is incomplete: the encoder driver change is a real dependency the links do not capture. That is exactly the gap that causes escapes." },
            { text: "Add the 9 encoder-fault tests (they depend on changed code even though their requirement did not change), document why, flag the missing dependency for the requirements owner, and record every skipped test with its rationale.", score: 10, feedback: "Best answer: trace links plus code and bench dependencies, explicit rationale for skips, and a fix to the graph so it is right next time." },
            { text: "Run the full regression anyway and slip the ship date.", score: 5, feedback: "Safe, but 1,400 rig-hours do not fit in 900, and it ignores that a reasoned selection exists. A slip is the last resort, not the default." },
          ],
        },
      },
    },
  ],
  quiz: [
    {
      id: "aw04-l02-q1",
      type: "mcq",
      prompt: "A traceability matrix row for requirement R-17 is empty. What does that mean?",
      options: ["R-17 failed its test", "R-17 has no linked verification: a coverage gap", "R-17 is an orphan", "R-17 is suspect"],
      answer: 1,
      explanation: md`Empty row = no verification link (gap). Orphan is the opposite direction: a test with no requirement.`,
      concepts: ["aw04.trace-matrix"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw04-l02-q2",
      type: "numeric",
      prompt: md`Fan-out 4, depth 2 below a changed requirement, transitive suspect propagation. How many items become suspect?`,
      answer: 20,
      tolerance: { abs: 0.5 },
      explanation: md`$|I| = 4 + 4^2 = 20$. With depth 3 it would be 84: the geometric growth is why bulk clearing happens.`,
      concepts: ["aw04.suspect-link"],
      difficulty: 1,
    },
    {
      id: "aw04-l02-q3",
      type: "multi",
      prompt: "Which of these changes would typically NOT trigger a suspect link in a requirements tool? (Select all that apply.)",
      options: [
        "Editing the text of a linked system requirement",
        "A firmware commit changing current-controller gains",
        "Replacing the load cell on the dyno with a different model",
        "Retraining the grasp model on new data",
        "Editing a linked software requirement",
      ],
      answer: [1, 2, 3],
      explanation: md`Suspect links fire on changes to linked items inside the tool. Firmware commits, rig hardware and model weights normally live elsewhere (Git, asset registers, model registries) and are not linked items, so nothing fires.`,
      concepts: ["aw04.suspect-link"],
      difficulty: 2,
    },
    {
      id: "aw04-l02-q4",
      type: "order",
      prompt: "Order the V-model levels on the right leg from first executed to last.",
      items: [
        "Software and hardware unit verification",
        "Integration test (actuator on dyno, HIL)",
        "System test",
        "Validation in the use context",
      ],
      explanation: md`The right leg climbs: units first, then integration, then the system, then validation against stakeholder needs.`,
      concepts: ["aw04.v-model"],
      difficulty: 1,
    },
    {
      id: "aw04-l02-q5",
      type: "mcq",
      prompt: "Why must passing coverage be quoted 'on baseline B'?",
      options: [
        "Because tools cannot count without a baseline",
        "Because a pass on an earlier firmware, hardware or rig configuration does not prove the current one unless an impact argument covers the change",
        "Because auditors only read the latest baseline",
        "Because link coverage changes with every baseline",
      ],
      answer: 1,
      explanation: md`Evidence is tied to a configuration. Link coverage usually does not change with a firmware release; passing coverage should.`,
      concepts: ["aw04.baseline", "aw04.coverage-metrics"],
      difficulty: 2,
    },
    {
      id: "aw04-l02-q6",
      type: "decision",
      prompt: md`Before a release, 300 suspect links are open. The engineering director proposes bulk-clearing all of them because "most are cosmetic". You advise the validation lead. What do you recommend?`,
      options: [
        { text: "Bulk-clear; there is no time.", score: 0, feedback: "Removes the only signal the process has, and leaves an audit finding." },
        { text: "Triage: filter suspects whose source change is editorial (renames, formatting) and clear those with a recorded reason; review the rest individually, prioritising links to safety requirements and to tests on scarce rigs.", score: 1, feedback: "Right: fast where it is safe, careful where it matters, with a record." },
        { text: "Rerun every test linked to a suspect link.", score: 0.4, feedback: "Safe for those tests but may not fit the rig budget, and does not cover dependencies outside the graph." },
      ],
      explanation: md`Suspect links are a review queue. Triage by the type of source change and by consequence keeps the signal without blocking the release.`,
      concepts: ["aw04.suspect-link"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw04-l02-f1", front: "Forward vs backward traceability", back: "Forward: requirement to design and verification (finds gaps). Backward: test or code to requirement (finds orphans and gold-plating).", concepts: ["aw04.bidirectional-traceability"] },
    { id: "aw04-l02-f2", front: "Link coverage vs passing coverage", back: md`$C_{link}$: share with a verification link. $C_{pass}$: share with all linked verifications passed on the current baseline. Only $C_{pass}$ means verified.`, concepts: ["aw04.coverage-metrics"] },
    { id: "aw04-l02-f3", front: "Suspect link", back: "A trace link flagged for review because an item at one end changed after the link was confirmed.", concepts: ["aw04.suspect-link"] },
    { id: "aw04-l02-f4", front: "Suspect set growth", back: md`$|I| = \sum_{k=1}^{d} f^k$: fan-out 3, depth 3 gives 39 items for one edit.`, concepts: ["aw04.suspect-link"] },
    { id: "aw04-l02-f5", front: "What suspect links miss", back: "Changes outside the requirements graph: firmware commits, model retrains, rig, fixture, DAQ and calibration changes.", concepts: ["aw04.suspect-link"] },
    { id: "aw04-l02-f6", front: "Empty matrix row vs empty column", back: "Empty row: requirement with no verification (gap). Test linked to no requirement: orphan.", concepts: ["aw04.trace-matrix"] },
    { id: "aw04-l02-f7", front: "Baseline", back: "A frozen, identified version of items (requirements, firmware, hardware, model, rig) against which results are recorded.", concepts: ["aw04.baseline"] },
  ],
};

export default lesson;
