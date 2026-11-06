import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc04-l03",
  title: "Demos that sell: show the outcome, then the how",
  summary:
    "A demo is a proof that the buyer's specific problem goes away, not a tour of features. Start from the outcome in the buyer's numbers, tell one storyline built from discovery, show the few moments that matter, and handle the technical deep dive as a separate, prepared session.",
  minutes: 60,
  objectives: [
    "You can build a demo storyline from discovery notes that opens with the buyer's outcome and their numbers.",
    "You can compute the outcome metric a change-impact demo should show (rig-hours and wall-clock time per release).",
    "You can run a technical deep dive and handle questions you cannot answer without losing credibility.",
    "You can decide when not to demo yet.",
  ],
  concepts: [
    { id: "fc04.outcome-demo", name: "Outcome-first demo", description: "Open with the end state the buyer wants (their release validated in hours, not days) and only then show how the product gets there; features appear only as steps to that outcome.", competency: "fc-sales", related: ["fc04.quantified-pain"] },
    { id: "fc04.demo-storyline", name: "Tailored demo storyline", description: "One narrative built from discovery: their problem, their data or a realistic replica, three moments that matter, the outcome in their metrics, and a dated next step.", competency: "fc-sales", related: ["fc04.outcome-demo", "fc04.discovery-structure"] },
    { id: "fc04.technical-deep-dive", name: "Technical deep dive", description: "A separate session for technical evaluators covering architecture, data formats, accuracy limits, failure modes and deployment, with an engineering partner present and a written list of open questions closed afterwards.", competency: "fc-sales", related: ["fc04.sales-stages"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Why feature tours lose and outcome demos win",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Ripple's value is invisible unless the buyer sees their own change, their own test list and a clear "rerun these 15 %, here is why". A feature tour of a dependency graph impresses nobody who has to sign. You will give dozens of demos in 2027; each one that starts from the outcome is a demo the champion can repeat to their VP without you.`,
        },
        {
          kind: "md",
          md: md`### The mechanism

A buyer in a demo is running one question in their head: **"Will my problem go away, and what will it cost me to get there?"** Every minute spent on a feature they did not ask about is a minute of cognitive load with no answer to that question, and it raises perceived complexity (which raises perceived switching cost). Two consequences:

1. **Show the end first.** Open with the outcome screen: "Firmware 4.2.1 changed the torque limiter. Ripple selected 180 of your 1,200 regression tests. On four rigs that is 18 hours instead of five days. Here is why each one was selected." Then go back and show how you got there.
2. **Show less.** Three moments that map to the three pains found in discovery. Everything else waits for a question.

### The outcome metric for a change-impact demo`,
        },
        { kind: "equation", formula: "fc04-rerun-savings" },
        {
          kind: "md",
          md: md`Wall-clock time per release is the rig-hours divided by the number of rigs running in parallel. Engineers care about rig-hours (capacity); managers care about wall-clock days (the release date). Show both.

The number is only credible if the buyer also believes the selection is **safe**. A test-selection tool that misses a regression is worse than useless. So the demo must show the reason for each selection (the dependency path from the changed component to the test), an always-run safety set, and evidence on historical changes ("on your last five releases, the selected set would have caught every failure the full run found"). Hide the false-negative question and the technical evaluator will raise it for you, usually after you have left.

### A storyline, not a script

| Minute | Beat | What you show | Mapped to discovery |
|---|---|---|---|
| 0 to 3 | **Their problem, their numbers** | One slide: "24 releases, 160 h each, 60 % unnecessary, 3 weeks of delay" | Confirmed summary email |
| 3 to 7 | **The outcome** | Ripple result for a real or replica change: 180 of 1,200 tests, 18 h vs 5 days | Delay and hours pain |
| 7 to 17 | **How (three moments)** | Lockstep capture with rig signals and screen on one clock; the dependency path behind a selection; the history check | Trust, data, traceability |
| 17 to 25 | **Their questions** | Whatever they ask; park deep technical threads for the deep dive | Objections |
| 25 to 30 | **Next step** | Proposed pilot scope and the mutual action plan | S3 or S4 exit |

### Handling the technical deep dive

The technical evaluator's job is to find the reason it will not work here. Treat that as help. Run the deep dive as a separate session with Ismail or Yusuf, and prepare an architecture diagram, supported DAQ hardware and file formats (for example MDF, TDMS, Parquet), clock and synchronisation approach, deployment options (on-prem, isolated tenant), data flows, and the known limitations. When you do not know: say so, write it down, and send the answer by a stated date. A precise "we have not validated that sampling rate yet; we will test it on your sample data by Friday" builds more credibility than a confident guess.`,
        },
        {
          kind: "flow",
          title: "Demo storyline (30 minutes)",
          steps: [
            { label: "Their numbers", detail: "0 to 3 min, from discovery" },
            { label: "The outcome", detail: "3 to 7 min, end screen first" },
            { label: "Three moments", detail: "7 to 17 min, how it gets there" },
            { label: "Their questions", detail: "17 to 25 min, park deep threads" },
            { label: "Next step", detail: "25 to 30 min, pilot scope and MAP" },
          ],
          caption: "If the buyer remembers only the first seven minutes, they should still be able to explain the value to their boss.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Computing the outcome screen",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "What Ripple's outcome screen should say for this prospect",
          given: md`Illustrative prospect data from discovery: a full regression is 1,200 tests averaging 0.4 rig-hours each; 4 rigs run in parallel; 24 releases a year. On a replica of a recent firmware change, Ripple selects 180 tests (15 %).`,
          steps: [
            { md: md`**Full regression:** $1{,}200\times0.4 = 480$ rig-hours; on 4 rigs, $480/4 = 120$ h of wall-clock time, i.e. 5 days of continuous running.` },
            { md: md`**Selected set:** $180\times0.4 = 72$ rig-hours; on 4 rigs, $72/4 = 18$ h, i.e. overnight plus a morning.` },
            { md: md`**Saved per release:** $480-72 = 408$ rig-hours.` },
            { md: md`**Saved per year:** $H_{saved} = 24\times(1{,}200-180)\times0.4 = 9{,}792$ rig-hours/yr.` },
            { md: md`**What the screen says:** "Firmware change X: 180 of 1,200 tests selected. 18 h on 4 rigs instead of 120 h. Each selection shows its dependency path. Always-run safety set: included." The yearly figure goes on the business-case slide, not the demo screen.` },
          ],
          result: md`The headline is "18 hours instead of 5 days", with the reason for every test one click away. 9,792 rig-hours a year is capacity the lab can use for new test coverage; that framing (more coverage, not fewer engineers) usually lands better with the validation lead.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: a three-rig battery lab",
          given: md`Illustrative: 900 tests at 0.5 rig-hours each, 3 rigs in parallel, Ripple selects 15 % of tests on a replica change.`,
          steps: [
            { md: md`Selected tests: $0.15\times900 = 135$. Full regression $= 900\times0.5 = 450$ rig-hours; selected $= 135\times0.5 = 67.5$ rig-hours.` },
            { md: md`Rig-hours saved per release: $450-67.5$.` },
            { md: md`= **382.5 rig-hours**.`, hidden: true, check: { prompt: "Rig-hours saved per release", answer: 382.5, unit: "h", tolerance: { abs: 0.5 } } },
            { md: md`Wall-clock time with selection on 3 rigs: $67.5/3$.` },
            { md: md`= **22.5 h** (versus 150 h for the full run).`, hidden: true, check: { prompt: "Wall-clock hours with selection", answer: 22.5, unit: "h", tolerance: { abs: 0.1 } } },
          ],
          result: md`"22.5 hours instead of 6 days" on their three rigs. Always check the rig count: the same selection on fewer rigs makes a bigger wall-clock difference.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Running demos in practice",
      blocks: [
        {
          kind: "md",
          md: md`### Practicalities

- **Data:** the best demo uses the buyer's own (sanitised) data; the second best is a realistic replica of their setup. Generic sample data makes the buyer do the translation, and most will not. Ask for a data sample during discovery and treat the request as a qualification test (lesson 4).
- **Environment:** a demo environment that you control and that cannot break: pre-loaded, offline-capable for on-prem prospects, with a recorded fallback video.
- **People:** you run the story; the engineering partner joins for the deep dive or for a short technical segment. Agree beforehand who answers what.
- **Recording:** offer to record for people who could not attend; the champion will reuse it internally.
- **After:** send a short recap within 24 hours: the outcome number, the open questions with owners and dates, and the proposed next step.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Demo failure modes",
          md: md`- **Demo before discovery.** You will show the wrong things. If a prospect insists, show the outcome screen for two minutes and book discovery.
- **The everything tour.** Every extra feature raises perceived complexity and cost of change.
- **Bluffing in the deep dive.** One wrong technical claim found later discredits every other claim.
- **Hiding limitations.** Say what the product does not do yet and what you are doing about it; the evaluator will find out anyway.
- **No ask at the end.** A demo that ends with "any questions?" instead of a proposed next step is a stage that did not move.`,
        },
        {
          kind: "checklist",
          title: "Demo readiness",
          items: [
            "Discovery summary confirmed by the buyer, with numbers",
            "Outcome screen built for their change, with their rig count",
            "Three moments chosen and mapped to three discovered pains",
            "False-negative question prepared: safety set, historical check, dependency path",
            "Deep-dive pack ready: architecture, formats, clocks, deployment, limitations",
            "Next step proposal and draft mutual action plan ready to share",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask at the end of the demo",
          items: [
            "Which part of what you saw matters most for your team, and which matters least?",
            "What would you need to see on your own data to be confident?",
            "Who else should see this before a pilot could be agreed?",
            "If we ran a pilot, what result would make it an obvious yes for your VP?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc04-l03-p1",
            type: "short",
            prompt: md`Write a 30-minute demo storyline for Ripple (Afterwave) for a prospect whose discovery you can describe in two or three lines, or for a Mizan soiling-analytics demo to a PV plant O&M manager. Give: (1) the outcome screen text with the numbers computed from illustrative discovery data; (2) the five beats with timings and what is shown in each; (3) the three moments and the discovered pain each one answers; (4) how you will handle the hardest technical objection; (5) the next step you will propose.`,
            rubric: [
              "Opens with the buyer's own problem and numbers, then the outcome, before any feature walk-through.",
              "Outcome numbers are computed correctly (for Ripple: rig-hours and wall-clock time from tests, hours per test and rigs; for Mizan: energy or revenue recovered from soiling and cleaning inputs).",
              "Exactly three moments, each explicitly mapped to a discovered pain.",
              "Hardest objection identified (for example false negatives, data access, accuracy of soiling estimates) with an honest, specific answer and a follow-up plan.",
              "Ends with a concrete, dated next step such as a deep dive or pilot scoping session.",
              "Numbers labelled illustrative; no invented customers or results.",
            ],
            modelAnswer: md`**Discovery (illustrative):** motor-controller validation team, 1,200 tests at 0.4 h, 4 rigs, 24 releases/yr, main pain: release blocked five days after each change; VP worried about escapes.

**Outcome screen:** "Firmware 3.8 changed the current-loop gains. Ripple selected 180 of 1,200 tests: 72 rig-hours, 18 h on your 4 rigs instead of 120 h. Each selection has a dependency path; the 40-test safety set always runs."

**Beats:** 0 to 3 their numbers (24 releases, 160 h, 60 % unnecessary); 3 to 7 the outcome above; 7 to 17 three moments; 17 to 25 questions; 25 to 30 pilot proposal.

**Three moments:** (1) Lockstep shows rig current and the HMI action on one clock, answering "we cannot reproduce failures"; (2) clicking a selected test shows the path from the changed parameter to the test, answering "we cannot tell what is affected"; (3) history check: on five past releases the selected set caught every failure the full run found, answering the VP's fear of escapes.

**Hardest objection:** "What if it misses something?" Answer: the safety set always runs, selection is conservative when the dependency is unknown, and the pilot success criterion is zero missed regressions versus a parallel full run on the first releases. We will show the historical check on their data in the deep dive.

**Next step:** deep dive with their test systems engineer and Ismail on a named date next week, with two recent changes and a data sample, then a pilot scoping call.`,
            explanation: md`The test is whether the champion could retell the value in one sentence after the first seven minutes.`,
            concepts: ["fc04.outcome-demo", "fc04.demo-storyline", "fc04.technical-deep-dive"],
            difficulty: 2,
          },
        },
        { kind: "sources", refs: ["fc04-r3"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc04-l03-q1",
      type: "mcq",
      prompt: "What should the first substantive screen of a demo show?",
      options: [
        "The company overview and team",
        "The product's architecture",
        "The outcome for the buyer's own problem, in their numbers",
        "The full feature list",
      ],
      answer: 2,
      explanation: md`Start at the end state the buyer wants; then show how the product gets there. Company and architecture come later or on request.`,
      concepts: ["fc04.outcome-demo"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc04-l03-q2",
      type: "numeric",
      prompt: md`A full regression is 800 tests at 0.6 rig-hours each on 2 rigs. Selection picks 10 % of tests. What is the wall-clock time of the selected set (hours)?`,
      answer: 24,
      tolerance: { abs: 0.1 },
      unit: "h",
      explanation: md`Selected: 80 tests $\times$ 0.6 h = 48 rig-hours; on 2 rigs, 24 h (versus 240 h for the full run).`,
      concepts: ["fc04.outcome-demo"],
      difficulty: 1,
    },
    {
      id: "fc04-l03-q3",
      type: "decision",
      prompt: md`In a deep dive, the evaluator asks whether Lockstep supports a DAQ model you have never tested. What do you say?`,
      options: [
        { text: "\"Yes, we support all major DAQ hardware.\"", score: 0, feedback: "A bluff. If it fails in the pilot, every other claim you made loses credibility." },
        { text: "\"We have not validated that model. We support [list]. Can you share its driver and a sample file? We will test it and reply by Friday.\"", score: 1, feedback: "Honest, specific, and it creates a dated next step and a data request." },
        { text: "\"That is a technical detail; let's focus on the business value.\"", score: 0.1, feedback: "Dismissing the technical evaluator turns them into a blocker." },
      ],
      explanation: md`Precision about limits builds trust with engineers. Write the open question down and close it by the stated date.`,
      concepts: ["fc04.technical-deep-dive"],
      difficulty: 1,
    },
    {
      id: "fc04-l03-q4",
      type: "multi",
      prompt: "Which belong in a test-selection demo to address the false-negative concern? (Select all that apply.)",
      options: [
        "The dependency path explaining why each test was selected",
        "An always-run safety set",
        "A historical check: the selected set would have caught the failures past full runs found",
        "A promise that the tool never misses anything",
        "A larger number of features",
      ],
      answer: [0, 1, 2],
      explanation: md`Trust comes from explanation, a safety net and evidence. Absolute promises invite disproof; more features add nothing to trust.`,
      concepts: ["fc04.outcome-demo", "fc04.technical-deep-dive"],
      difficulty: 2,
    },
    {
      id: "fc04-l03-q5",
      type: "order",
      prompt: "Order the beats of an outcome-first demo.",
      items: ["Their problem and numbers", "The outcome screen", "Three moments that show how", "Their questions", "Proposed next step"],
      explanation: md`Problem, outcome, how, questions, ask. The first two beats carry the value; the next step moves the stage.`,
      concepts: ["fc04.demo-storyline"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc04-l03-f1", front: "Outcome-first demo", back: "Show the end state in the buyer's numbers first, then the few steps that get there.", concepts: ["fc04.outcome-demo"] },
    { id: "fc04-l03-f2", front: "Rig-hours saved per year", back: md`$H_{saved} = N_r (n_{full}-n_{sel})\bar t$; wall-clock time = rig-hours / rigs in parallel.`, concepts: ["fc04.outcome-demo"] },
    { id: "fc04-l03-f3", front: "How many moments in a 30-minute demo?", back: "Three, each mapped to a discovered pain.", concepts: ["fc04.demo-storyline"] },
    { id: "fc04-l03-f4", front: "The hardest question for a test-selection product", back: "False negatives: what if it misses a regression? Answer with dependency paths, a safety set and a historical check.", concepts: ["fc04.technical-deep-dive"] },
    { id: "fc04-l03-f5", front: "When you do not know the answer in a deep dive", back: "Say so, write it down, name what you need, reply by a stated date.", concepts: ["fc04.technical-deep-dive"] },
  ],
};

export default lesson;
