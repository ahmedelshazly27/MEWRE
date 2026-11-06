import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw15-l02",
  title: "The Ripple demo narrative",
  summary:
    "Build the demo story for a change-impact scenario: one change, the stakes in rig-hours, Ripple's ranked and explained selection, the threshold trade-off, the one-clock proof from Lockstep, and the ask. Then handle the technical deep-dive questions a principal test engineer will ask, and write the one-page leave-behind.",
  minutes: 80,
  objectives: [
    "You can tell the Ripple demo as five beats (change, stakes, answer, proof, ask) with real arithmetic on screen.",
    "You can compute impact scores, the selected rig-hours and the model-expected recall for a change, and explain the threshold trade-off.",
    "You can explain why one clock across DAQ and app events is a precondition for credible dependency weights, with the drift arithmetic.",
    "You can answer the standard technical deep-dive questions with an answer, a thing to show, and a stated limit.",
    "You can write a one-page leave-behind that the champion can forward without you in the room.",
  ],
  concepts: [
    {
      id: "aw15.demo-arc",
      name: "The five-beat demo arc",
      description:
        "Change, stakes, answer, proof, ask: start from one concrete change the buyer recognises, show what a full regression costs, show Ripple's ranked and explained selection, prove it (threshold curve, safety floor, replayed recall), and end with the pilot ask.",
      competency: "aw-business",
      related: ["fc04.outcome-demo", "fc04.demo-storyline"],
    },
    {
      id: "aw15.explainable-selection",
      name: "Explainable selection with a safety floor",
      description:
        "Every selected test shows why (which changed artifact, through which dependency, with what weight and history), and safety-tagged tests are always run regardless of score. Engineers trust a selection they can audit, not a black-box ranking.",
      competency: "aw-business",
      related: ["aw15.demo-arc"],
    },
    {
      id: "aw15.threshold-tradeoff",
      name: "Threshold trade-off: rig-hours vs expected recall",
      description:
        "Lowering the impact-score threshold adds tests, rig-hours and expected recall. The curve is steep early and flat late, where long low-score tests buy little recall. The customer, not Afterwave, sets the operating point.",
      competency: "aw-impact",
      related: ["aw15.explainable-selection"],
    },
    {
      id: "aw15.one-clock-proof",
      name: "One clock as the basis of evidence",
      description:
        "DAQ signals and on-screen or app events recorded on free-running clocks drift apart by offset plus ppm times elapsed time; fitting both from sync events puts cause and effect in the right order, which Ripple's dependency weights and any later safety evidence rely on.",
      competency: "aw-data",
    },
    {
      id: "aw15.deep-dive-answer",
      name: "Deep-dive answer: answer, show, limit",
      description:
        "For a technical challenge: answer in one sentence, show the thing on screen or in data, and state the limit honestly (what the model assumes, what the pilot will measure). Claiming more than the data supports loses the engineer in the room.",
      competency: "aw-business",
      related: ["fc04.technical-deep-dive"],
    },
    {
      id: "aw15.leave-behind",
      name: "One-page leave-behind",
      description:
        "A single page the champion forwards to the economic buyer and security: the problem in their numbers, what Ripple does, the demo result with its caveat, how data stays in Enclave, the pilot offer with success criteria, and who the team is.",
      competency: "aw-business",
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "The demo as an argument: change, stakes, answer, proof, ask",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You will give the Ripple demo more times than any other piece of work this year: to heads of test, to principal engineers who want to break it, to investors, maybe on YC demo day. Ismail and Yusuf can explain the engine; you must make it land in twelve minutes as an argument about rig-hours and escaped regressions, and survive the deep dive without over-claiming. A demo that over-claims once in front of an engineer is repeated in every validation team in the segment.`,
        },
        {
          kind: "md",
          md: md`### Five beats

Founder Core taught the outcome-first demo in general. For Ripple, the outcome is a **smaller, explained retest list after a change**, and the argument has five beats:

1. **The change.** One concrete change the buyer recognises: "motor control firmware v2.4 lands on Tuesday." Not a product tour.
2. **The stakes.** The full suite on this rig line is 71 rig-hours; on two rigs that is about a day and a half per change, and still someone decides by judgement what to skip. Published industrial research describes exactly that: hardware-dependent system tests mostly selected manually, by tester judgement.
3. **The answer.** Ripple's ranked list: each test with its impact score and the reason (changed artifact, dependency, weight, history). Safety-tagged tests pinned at the top regardless of score.
4. **The proof.** Move the threshold and show hours against expected recall; then show replayed recall on past releases (in a pilot, on their data). Say clearly which number is a model estimate and which is measured.
5. **The ask.** A 12-week shadow-mode pilot with paired success criteria (lesson 1).

### The engine on one slide

Each test depends on artifacts (firmware modules, models, rig components, calibrations) with weights between 0 and 1. A change touches a set of artifacts. Treating each changed dependency as an independent route for a regression to reach the test:`,
        },
        { kind: "equation", formula: "aw15-impact-score" },
        {
          kind: "md",
          md: md`Tests at or above a threshold $\theta$ are selected. To say how much of the regression risk the selection covers, weight each test's score by its historical fail rate:`,
        },
        { kind: "equation", formula: "aw15-expected-recall" },
        {
          kind: "widget",
          widget: "change-impact",
          caption:
            "The default scenario is the demo: only 'Motor control firmware v2.4' changed. At threshold 0.35 Ripple selects torque step response, speed ripple and emergency stop timing: 6 of 71 rig-hours. Drop the threshold to 0.30 and pick-and-place joins (11 h). Then tick 'Rig encoder replaced' too and watch which scores rise.",
        },
        {
          kind: "md",
          md: md`### The numbers behind the default demo

Change: motor control firmware only. Scores equal the weights on that one dependency. Fail rates are the widget's illustrative values.

| Test | Score $s_t$ | Fail rate $f_t$ | $s_t f_t$ | Rig-hours |
|---|---|---|---|---|
| Torque step response | 0.90 | 0.30 | 0.270 | 2 |
| Speed ripple at low rpm | 0.70 | 0.25 | 0.175 | 3 |
| Emergency stop timing | 0.40 | 0.10 | 0.040 | 1 |
| Pick-and-place success rate | 0.30 | 0.35 | 0.105 | 5 |
| Thermal soak 2 h | 0.20 | 0.15 | 0.030 | 6 |
| Endurance 48 h | 0.20 | 0.05 | 0.010 | 48 |
| Overload derating, grip force accuracy | 0 | | 0 | 6 |
| **Total** | | | **0.630** | **71** |

| Threshold | Selected | Rig-hours | Expected recall |
|---|---|---|---|
| 0.35 | torque step, speed ripple, e-stop | 6 | $0.485 / 0.630 = 77\%$ |
| 0.30 | plus pick-and-place | 11 | $0.590 / 0.630 = 94\%$ |
| 0.20 | plus thermal soak and endurance | 65 | 100 % |
| run everything | all 8 | 71 | 100 % |

The last 6 % of expected recall costs 54 rig-hours, almost all of it the 48-hour endurance run. That is the sentence the head of test remembers. Two cautions you must say out loud: **expected recall is relative to the model's own weights**, not measured; and **emergency stop timing is safety-tagged**, so in a real deployment it runs whatever its score.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "Default demo: expected recall vs rig-hours as the threshold falls",
          xKey: "point",
          xLabel: "rig-hours selected (threshold)",
          yLabel: "expected recall (%)",
          series: [{ key: "recall", label: "Expected recall (%)" }],
          data: [
            { point: "0 h", recall: 0 },
            { point: "2 h (0.90)", recall: 42.9 },
            { point: "5 h (0.70)", recall: 70.6 },
            { point: "6 h (0.40)", recall: 77.0 },
            { point: "11 h (0.30)", recall: 93.7 },
            { point: "65 h (0.20)", recall: 100 },
          ],
          caption: "Illustrative widget values. The curve is steep for the first 11 rig-hours and flat afterwards: the knee is where the customer usually sets the threshold, with safety-tagged tests always added.",
        },
        {
          kind: "md",
          md: md`### Why the demo needs one clock

Ripple's weights come partly from history: which signals moved, and which tests failed, after which change. That history is only evidence if the rig signals (DAQ) and the test-app events (setpoints sent, steps started, operator actions on screen) are on **one clock**. Two free-running clocks drift apart:`,
        },
        { kind: "equation", formula: "aw15-clock-misalignment" },
        {
          kind: "md",
          md: md`Quartz oscillators commonly have frequency errors of tens of ppm. Say the DAQ runs 30 ppm fast and the test PC 20 ppm slow: the relative drift is 50 ppm, and after one hour $\Delta t = 50 \times 10^{-6} \times 3{,}600 = 0.18$ s. At 1 kHz that is 180 samples. A torque step settles in tens of milliseconds (illustrative), so the "setpoint sent" event can appear after the torque rose: effect before cause. Fitting offset and drift from shared sync events (a hardware trigger pulse, or PTP per IEEE 1588) removes both terms and leaves only jitter. This is Lockstep's job, and in the demo it is a 60-second beat: show the two streams drifting apart, then snapping together after the fit.`,
        },
        {
          kind: "widget",
          widget: "bench-sync",
          caption: "Set a relative drift of about 50 ppm and watch misalignment grow over an hour; then apply the fit from sync pulses. In the demo, this is the answer to 'why should I trust the history Ripple learned from?'",
        },
        { kind: "sources", refs: ["aw15-r3", "aw15-r8"] },
      ],
    },
    {
      layer: "applied",
      title: "Scripting the demo and working the numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "A 12-minute Ripple demo inside a 45-minute meeting",
          given: md`Audience: head of test (economic buyer) and a principal test engineer (the skeptic). Data: the widget's illustrative actuator rig line (8 tests, 71 rig-hours), not customer data. Afterwave's side: you narrate, Yusuf drives and takes engineering questions.`,
          steps: [
            { md: md`**Minute 0 to 1, the change.** "Tuesday, motor control firmware v2.4 lands. Your team has two rigs and 71 rig-hours of tests on this line. What do you rerun?" Pause; let the engineer answer from experience. Their answer is your baseline.` },
            { md: md`**Minute 1 to 3, the stakes.** Full suite: 71 rig-hours, about 36 hours of wall-clock on two rigs. If you skip by judgement, you are betting on memory. If 24 changes a year each trigger a full run, that is $24 \times 71 = 1{,}704$ rig-hours a year (illustrative). Ask them to correct the numbers; write theirs on the board.` },
            { md: md`**Minute 3 to 6, the answer.** Ripple's list at threshold 0.35: torque step response (0.90), speed ripple (0.70), emergency stop timing (0.40, and safety-tagged, so it runs regardless). Click a test: the reason is "motor control firmware, weight 0.9, 3 failures in the last 10 changes to this module" (illustrative history). 6 rig-hours.` },
            { md: md`**Minute 6 to 9, the proof.** Move the threshold to 0.30: pick-and-place joins, 11 rig-hours, expected recall 94 %. Move it to 0.20: 65 rig-hours for the last 6 %. Say: "This recall is the model's estimate. In a pilot we measure real recall on your last ten full regressions." Then the 60-second bench-sync beat: drifted streams, fit, aligned.` },
            { md: md`**Minute 9 to 11, the second change.** Tick "rig encoder replaced" as well. Torque step rises to 0.96, speed ripple to 0.94. Point out that a **rig** change, not just firmware, changes what must be retested: that is what generic test management cannot see.` },
            { md: md`**Minute 11 to 12, the ask.** "Here is what we would do on your rig line: 12 weeks, shadow mode, Ripple recommends and your normal regression scores it, success is recall above an agreed level and rig-hours below an agreed level, all data stays on your servers in Enclave. Who else would need to see this?"` },
          ],
          result: md`The demo argues one thing: **on this rig line, after this change, about 11 of 71 rig-hours cover about 94 % of the expected regression risk, and here is why for every test.** Everything else (the engine, the clock, the data) is evidence for that sentence.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Two changes at once: firmware and rig encoder",
          given: md`Same widget data. Changed: motor control firmware (fw) and rig encoder (enc). Torque step response depends on fw with weight 0.9 and enc with 0.6; speed ripple on fw 0.7 and enc 0.8. Other tests as in the table above (none of them depends on the encoder). Threshold 0.35.`,
          steps: [
            {
              md: md`Torque step: $s = 1 - (1 - 0.9)(1 - 0.6) = 1 - 0.1 \times 0.4 = 0.96$.`,
              hidden: true,
              check: { prompt: "Impact score of torque step response", answer: 0.96, tolerance: { abs: 0.005 } },
            },
            {
              md: md`Speed ripple: $s = 1 - (1 - 0.7)(1 - 0.8) = 1 - 0.3 \times 0.2 = 0.94$.`,
              hidden: true,
              check: { prompt: "Impact score of speed ripple", answer: 0.94, tolerance: { abs: 0.005 } },
            },
            {
              md: md`Selected at 0.35: torque step (0.96), speed ripple (0.94), e-stop (0.40): still 6 rig-hours. Weighted values: $0.96 \times 0.30 = 0.288$, $0.94 \times 0.25 = 0.235$, e-stop 0.040; unselected: pick-and-place 0.105, soak 0.030, endurance 0.010. Total 0.708.`,
            },
            {
              md: md`Expected recall: $(0.288 + 0.235 + 0.040) / 0.708 = 0.563 / 0.708 = 79.5\%$.`,
              hidden: true,
              check: { prompt: "Expected recall at threshold 0.35, in %", answer: 79.5, unit: "%", tolerance: { abs: 0.3 } },
            },
          ],
          result: md`The encoder change raises the scores of the two tests that read the encoder but does not change the selection at 0.35. What changes is the confidence: both are now near-certain. In the demo, that is the moment to say "a rig change is a change", which most test management tools do not model.`,
        },
        {
          kind: "question",
          question: {
            id: "aw15-l02-p1",
            type: "numeric",
            prompt: md`A DAQ chassis and the test PC start aligned to within 5 ms. Their relative frequency error is 40 ppm. With no resynchronisation, what is the worst-case misalignment after a 2-hour thermal soak, in ms?`,
            answer: 293,
            unit: "ms",
            tolerance: { abs: 1 },
            explanation: md`$\Delta t = 0.005 + 40 \times 10^{-6} \times 7{,}200 = 0.005 + 0.288 = 0.293$ s $= 293$ ms. Long tests are where drift hurts most, and they are exactly the tests whose history Ripple learns from.`,
            concepts: ["aw15.one-clock-proof"],
            difficulty: 2,
          },
        },
        { kind: "xref", to: "fc04-l03", note: "Outcome-first demos and the demo storyline in general form; the rig-hours saved formula." },
      ],
    },
    {
      layer: "field",
      title: "The deep dive, the leave-behind and the exercises",
      blocks: [
        {
          kind: "md",
          md: md`### The technical deep dive: answer, show, limit

The principal engineer's job in your meeting is to find where Ripple breaks. Welcome it: an engineer who tried to break it and could not is your champion. For every question: **answer** in one sentence, **show** something, state the **limit**.

| Question | Answer | Show | Limit to state |
|---|---|---|---|
| Where do the weights come from? | Three sources: declared dependencies (traceability, which test reads which signal), measured signal sensitivity, and learned failure history. | The reason panel for one test, with each source | Cold start relies on declared dependencies; learned weights need history, which is why the pilot imports past regressions |
| Your recall is circular: the model scores itself. | Yes, expected recall is a model estimate. Measured recall comes from replaying your past full regressions. | The replay method and the success pair | Until the pilot, nobody has measured recall on your rigs, including us |
| What if Ripple misses a regression? | Safety-tagged tests always run, Ripple is advisory until the customer sets a policy, and every miss in shadow mode is logged and fed back. | The safety floor setting; the miss log | No selection method guarantees zero misses; the customer chooses the operating point |
| You assume independence. | Correct, the score assumes independent routes. If routes are positively correlated, the true chance is lower, so the assumption errs towards selecting more. | Two-dependency example: 0.9 and 0.6 give 0.96 | Negative correlations are rare but would make it optimistic; history-learned weights absorb some of this |
| A brand-new test with no history? | Runs by default until it has history, or gets a prior from declared dependencies. | Policy setting for new tests | New tests cost rig-hours until learned |
| Does our data leave the site? | No. Lockstep and Ripple run inside Enclave on your servers or an isolated tenant; no egress by default. | Architecture slide from the security pack | Support access is customer-initiated and logged |
| Does this certify us for the Machinery Regulation? | No. It produces time-aligned, traceable test evidence that a conformity assessment can use. | Evidence trail for one test | Conformity is the manufacturer's and, for Annex I Part A, a notified body's call |

### The one-page leave-behind

After the meeting the champion has to sell it internally without you. The leave-behind is one page, written for the economic buyer and forwarded to security:

1. **Headline:** the outcome in one sentence, in their language.
2. **The problem in their numbers** (from discovery).
3. **What Ripple does**, in three lines, with Lockstep and Enclave named for what they do.
4. **The demo result**, with its caveat ("model estimate on illustrative data").
5. **Data and security** in three lines.
6. **The pilot offer**: scope, success pair, fee, conversion price, timeline.
7. **The team** in two lines (true, specific) and one contact.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How a Ripple demo loses the room",
          md: md`**Feature tour first:** the engineer stops listening before the change appears. **Presenting expected recall as measured:** the principal engineer spots the circularity and stops trusting every other number. **Black-box ranking:** no reason panel, no trust. **Live demo on the customer's data without a dry run:** a format error at minute 4 is all they remember. **Over-claiming regulation:** Ripple produces evidence; it does not make a machine compliant. **Disparaging a competitor's data platform:** they may already use it, and Ripple can sit on top of it.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Facts to check before you say them in a demo",
          md: md`The research notes (November 2026, from search summaries) record that no test-data platform (Nominal, Sift, Marple, Foxglove, Rerun) advertises change-impact test selection for physical benches, that VectorCAST's change-based testing is code-level, and that requirements tools flag "suspect links" at traceability level. Product pages change monthly: re-check before saying "nobody does this", and prefer "as of my check on [date]". The Machinery Regulation applies from 20 January 2027; the AI-related delegated acts are still to come.`,
        },
        { kind: "sources", refs: ["aw15-r1", "aw15-r2"] },
        {
          kind: "question",
          question: {
            id: "aw15-l02-p2",
            type: "short",
            prompt: md`**Exercise 1: the demo story.** Write the beat-by-beat script for a 12-minute Ripple demo on a change-impact scenario of your choice (a firmware, model or rig change on an actuator, drive, battery or humanoid rig line; illustrative data). For each beat give the minute range, what is on screen, the words you say, and the number the audience should remember. End with the ask.`,
            rubric: [
              "Follows the five beats in order: one concrete change, stakes in rig-hours or calendar time, ranked and explained selection, proof, ask.",
              "Uses correct arithmetic for impact scores, selected rig-hours and expected recall, with numbers labelled illustrative.",
              "States that expected recall is a model estimate and that the pilot measures real recall on replayed history; safety-tagged tests always run.",
              "Includes the one-clock beat or another piece of evidence for why the history is trustworthy.",
              "Ends with a specific shadow-mode pilot ask and a question about who else must see it; no invented customers or results.",
            ],
            modelAnswer: md`**Scenario (illustrative):** a battery pack rig line, 10 tests, 90 rig-hours; change: new cell-balancing firmware.

**0 to 1, change:** screen shows the release note. "Balancing firmware 3.1 lands today. What would you rerun?" Remember: their answer.
**1 to 3, stakes:** full suite 90 rig-hours, about 2 days on two rigs; 20 changes a year is 1,800 rig-hours. Remember: 1,800.
**3 to 6, answer:** Ripple list at 0.35: cell-voltage balance accuracy (0.90), thermal gradient under charge (0.60, two routes 0.5 and 0.2 give $1 - 0.5 \times 0.8 = 0.60$), BMS fault injection (safety-tagged, always runs). 9 rig-hours. Click each for its reason. Remember: 9 of 90.
**6 to 9, proof:** lower to 0.30: capacity fade check joins, 21 rig-hours, expected recall rises from 81 % to 95 % (model estimate on illustrative weights). "In a pilot we measure real recall on your last ten full runs." Bench-sync: DAQ and BMS log drift 0.18 s per hour at 50 ppm; after the fit they align.
**9 to 11, second change:** add "current sensor recalibrated": the thermal test's score rises; a rig change is a change.
**11 to 12, ask:** "12 weeks, shadow mode on one rig line, success is recall at or above an agreed level with rig-hours at or below an agreed level, data stays in Enclave on your servers. Who else needs to see this?"`,
            explanation: md`The demo is an argument for one sentence about hours and risk on their rig. Every screen should serve that sentence.`,
            concepts: ["aw15.demo-arc", "aw15.threshold-tradeoff", "aw15.explainable-selection"],
            difficulty: 2,
          },
        },
        {
          kind: "question",
          question: {
            id: "aw15-l02-p3",
            type: "short",
            prompt: md`**Exercise 2: the deep dive.** A principal test engineer asks, in order: (1) "Your 94 % is the model grading itself, isn't it?" (2) "Our tests share signals, so your independence assumption is wrong." (3) "What happens the first time Ripple skips a test that would have failed?" (4) "We change rig fixtures every month; how does Ripple even know?" (5) "Why not just use our requirements tool's suspect links?" Write each answer in answer, show, limit form, at most four sentences each.`,
            rubric: [
              "Concedes the circularity of expected recall and points to measured recall on replayed history as the pilot metric.",
              "Explains that positive correlation makes the independence score conservative (selects more), and states the limit.",
              "Answers the miss question with the safety floor, advisory or shadow mode, logging and the customer-owned operating point; no guarantee of zero misses.",
              "Explains that rig changes are captured as artifacts (Lockstep records rig configuration, calibration and fixture changes) and states what must be declared by the customer.",
              "Distinguishes traceability-level suspect links from signal- and history-driven selection that includes rig and model changes, without disparaging the tool, and offers to use its links as an input.",
            ],
            modelAnswer: md`**(1)** Yes, that 94 % is the model's estimate under its own weights. Here is how the pilot replaces it: replay your last ten full regressions, where the true failures are known, and count how many Ripple would have caught. Until that is done, nobody has measured recall on your rigs, including us.

**(2)** The score assumes independent routes. When routes share a signal they are positively correlated, so the true chance is lower than the score: the assumption errs towards selecting more tests, not fewer. Learned weights from your history absorb part of the overlap. If you have a case of negative correlation, I want to see it.

**(3)** During the pilot it cannot cause harm: Ripple only recommends and your full regression runs, so a would-be miss is logged and analysed. In production, safety-tagged tests always run and you set the threshold. No selection method gives zero misses; the question is whether it misses less than judgement does today, at a fraction of the hours.

**(4)** Rig configuration is an artifact like firmware: Lockstep records the rig's configuration and calibration state with each run, and a fixture or sensor change is a change event. What we need from you is the mapping of fixtures to tests at the start; after that, history refines it.

**(5)** Suspect links are useful and we can import them as declared dependencies. They flag tests when a requirement changes; they do not see a firmware module, a model or a rig sensor change, and they do not use signal or failure history. Ripple sits on top of them, not instead of them.`,
            explanation: md`Conceding the true point first is what earns the right to make the strong point second.`,
            concepts: ["aw15.deep-dive-answer", "aw15.explainable-selection", "aw15.threshold-tradeoff"],
            difficulty: 3,
          },
        },
        {
          kind: "question",
          question: {
            id: "aw15-l02-p4",
            type: "short",
            prompt: md`**Exercise 3: the one-page leave-behind.** Write the leave-behind for the head of test after the demo (as text, under 300 words), following the seven parts: headline, problem in their numbers, what Ripple does, demo result with caveat, data and security, pilot offer, team and contact.`,
            rubric: [
              "Headline states the outcome for the buyer (fewer rig-hours per change with an explained, auditable selection), not a product description.",
              "Problem uses the buyer's numbers from discovery, labelled illustrative where they are examples.",
              "Demo result is stated with the caveat that it is a model estimate on illustrative data, and the pilot measures real recall.",
              "Data and security: Enclave on their infrastructure, no egress by default, customer owns data and models.",
              "Pilot offer matches lesson 1 (scope, success pair, fee, conversion price, timeline); team described truthfully with no invented customers or logos.",
            ],
            modelAnswer: md`**Retest what a change actually touches, and know why.**

**Your numbers (from our call, illustrative):** 24 changes a year, 71 rig-hours per full regression on 2 rigs: about 1,700 rig-hours and 36 wall-clock hours per change.

**What Afterwave does:** Lockstep records rig signals and test-app actions on one clock. Ripple uses that history and your test dependencies to rank, after any firmware, model or rig change, which tests to rerun, with the reason for each. Enclave keeps it all on your infrastructure.

**What you saw (model estimate on illustrative data):** after a motor-control firmware change, 11 of 71 rig-hours covered about 94 % of expected regression risk; safety-tagged tests always run. A pilot measures real recall on your own past regressions.

**Data and security:** runs on your servers or an isolated tenant; no outbound connection by default; you own captured data, bench memory and any model trained on it. Security pack attached.

**Pilot offer:** 12 weeks on one rig line, shadow mode (Ripple recommends, your normal regression runs). Success: recall at or above 95 % on non-safety failing tests and selected rig-hours at or below 30 % of the suite, judged by you at week 12. EUR 20k, credited against a EUR 48k first-year licence if signed within 30 days.

**Team:** Ismail Elmasry (drive unit validation at Tesla, test systems at Signify) and Yusuf Keklik (drive inverter test and reliability at Tesla) build it; I run the company. Contact: [name, email, phone].`,
            explanation: md`If the economic buyer can decide from this page alone, the leave-behind is done.`,
            concepts: ["aw15.leave-behind", "aw15.demo-arc"],
            difficulty: 2,
          },
        },
        { kind: "scenario", scenario: "aw15-s2" },
        {
          kind: "feynman",
          prompt:
            "Explain to a head of test who has never seen Ripple, in under two minutes, how an impact score is computed, what the threshold does, why the expected recall on the demo screen is not the same as measured recall, and why the rig and app data must be on one clock.",
          keyPoints: [
            "Each test depends on artifacts with weights; after a change, the score is one minus the product of (1 minus weight) over the changed dependencies.",
            "The threshold selects tests; lowering it adds rig-hours and expected recall, with diminishing returns.",
            "Expected recall is the model's own estimate; measured recall comes from replaying past full regressions where the true failures are known.",
            "Safety-tagged tests always run regardless of score.",
            "Free-running clocks drift by offset plus ppm times time; without one clock, cause and effect in the history can be misordered, so learned weights would be wrong.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw15-l02-q1",
      type: "order",
      prompt: md`Put the beats of the Ripple demo in order.`,
      items: ["The change", "The stakes in rig-hours", "Ripple's ranked, explained selection", "The proof: threshold curve, safety floor, replayed recall", "The pilot ask"],
      explanation: md`Outcome first: the audience must care about the change and its cost before the engine means anything.`,
      concepts: ["aw15.demo-arc"],
      difficulty: 1,
    },
    {
      id: "aw15-l02-q2",
      type: "numeric",
      prompt: md`A test depends on a changed firmware module with weight 0.5 and on a changed model with weight 0.4. What is its impact score?`,
      answer: 0.7,
      tolerance: { abs: 0.005 },
      explanation: md`$s = 1 - (1 - 0.5)(1 - 0.4) = 1 - 0.5 \times 0.6 = 0.70$.`,
      concepts: ["aw15.threshold-tradeoff"],
      difficulty: 1,
    },
    {
      id: "aw15-l02-q3",
      type: "mcq",
      prompt: md`In the default demo, lowering the threshold from 0.30 to 0.20 raises expected recall from about 94 % to 100 %. What does it cost?`,
      options: ["5 rig-hours", "11 rig-hours", "54 rig-hours", "71 rig-hours"],
      answer: 2,
      explanation: md`It adds the thermal soak (6 h) and the 48 h endurance run: 54 rig-hours, from 11 to 65. The flat end of the curve is where the customer usually stops, with safety-tagged tests always added.`,
      concepts: ["aw15.threshold-tradeoff"],
      difficulty: 1,
    },
    {
      id: "aw15-l02-q4",
      type: "numeric",
      prompt: md`Two clocks have a relative frequency error of 25 ppm and start perfectly aligned. After how many seconds does the misalignment reach 10 ms?`,
      answer: 400,
      unit: "s",
      tolerance: { rel: 0.01 },
      explanation: md`$\tau = 0.010 / (25 \times 10^{-6}) = 400$ s, under 7 minutes. Any test longer than that needs a sync fit, not just a start-of-test alignment.`,
      concepts: ["aw15.one-clock-proof"],
      difficulty: 2,
    },
    {
      id: "aw15-l02-q5",
      type: "decision",
      prompt: md`Mid-demo, the principal engineer says: "That 94 % is meaningless, it is your model grading itself." What do you do?`,
      options: [
        { text: "Agree that it is a model estimate, explain that the pilot measures real recall by replaying their past full regressions, and offer to define that metric together now", score: 1, feedback: "You conceded the true point and turned it into the pilot's success criterion, co-designed with the skeptic." },
        { text: "Insist that the model is validated and move on", score: 0.1, feedback: "Untrue for their rigs, and the engineer now discounts everything else." },
        { text: "Hand over to Yusuf for a 10-minute explanation of the algorithm", score: 0.4, feedback: "Depth without the point. The objection is about evidence, not about the algorithm." },
        { text: "Remove the recall number from the demo for future meetings", score: 0.3, feedback: "The number is useful with its caveat; hiding it loses the threshold story." },
      ],
      explanation: md`Answer, show, limit: concede the limit, show the method that removes it.`,
      concepts: ["aw15.deep-dive-answer"],
      difficulty: 2,
    },
    {
      id: "aw15-l02-q6",
      type: "multi",
      prompt: md`Which belong on the one-page leave-behind? Select all that apply.`,
      options: [
        "The problem in the buyer's own numbers",
        "The demo result with the caveat that it is a model estimate",
        "How data and models stay on the buyer's infrastructure",
        "The pilot offer with the success pair and conversion price",
        "A list of target logos to suggest traction",
        "A detailed description of the scoring algorithm",
      ],
      answer: [0, 1, 2, 3],
      explanation: md`Target logos imply customers that do not exist; the algorithm belongs in the technical appendix, not the page the economic buyer reads.`,
      concepts: ["aw15.leave-behind"],
      difficulty: 1,
    },
    {
      id: "aw15-l02-q7",
      type: "mcq",
      prompt: md`Why is the independence assumption in the impact score conservative when dependencies share signals?`,
      options: [
        "Because shared signals make weights larger",
        "Because positively correlated routes make the true probability lower than the independence formula, so more tests are selected than strictly needed",
        "Because the formula ignores shared signals entirely",
        "It is not conservative; it always under-selects",
      ],
      answer: 1,
      explanation: md`For positively correlated events, the chance that at least one occurs is lower than under independence. The formula then over-estimates the score and errs towards selecting the test.`,
      concepts: ["aw15.deep-dive-answer", "aw15.threshold-tradeoff"],
      difficulty: 3,
    },
  ],
  flashcards: [
    { id: "aw15-l02-f1", front: "The five beats of the Ripple demo", back: "Change, stakes, answer, proof, ask.", concepts: ["aw15.demo-arc"] },
    { id: "aw15-l02-f2", front: "Impact score", back: md`$s_t = 1 - \prod (1 - w_{t,i})$ over changed dependencies. 0.9 and 0.6 give 0.96.`, concepts: ["aw15.threshold-tradeoff"] },
    { id: "aw15-l02-f3", front: "Default demo numbers", back: "Firmware change, 71 rig-hours suite: 6 h at 0.35 (77 % expected recall), 11 h at 0.30 (94 %), 65 h at 0.20 (100 %).", concepts: ["aw15.threshold-tradeoff", "aw15.demo-arc"] },
    { id: "aw15-l02-f4", front: "Expected vs measured recall", back: "Expected recall is the model's estimate under its own weights; measured recall comes from replaying past full regressions with known failures. Say which one is on screen.", concepts: ["aw15.deep-dive-answer"] },
    { id: "aw15-l02-f5", front: "Drift arithmetic", back: md`$\Delta t = \Delta\theta + \Delta\rho \cdot 10^{-6} \cdot \tau$: 50 ppm for one hour is 0.18 s, 180 samples at 1 kHz.`, concepts: ["aw15.one-clock-proof"] },
    { id: "aw15-l02-f6", front: "Deep-dive answer form", back: "Answer in one sentence, show something, state the limit.", concepts: ["aw15.deep-dive-answer"] },
    { id: "aw15-l02-f7", front: "Safety floor", back: "Safety-tagged tests always run regardless of impact score; Ripple is advisory until the customer sets a policy.", concepts: ["aw15.explainable-selection"] },
  ],
  scenarios: [
    {
      id: "aw15-s2",
      title: "The principal engineer tries to break the demo",
      context: md`Second meeting at a hypothetical humanoid company (illustrative, not a real account). The head of test invited a principal test engineer who has built the team's in-house regression scripts. Five minutes into the demo she interrupts: "Our scripts already rerun everything tagged with the changed firmware module. What does this add?"`,
      start: "a",
      concepts: ["aw15.deep-dive-answer", "aw15.explainable-selection", "aw15.demo-arc"],
      nodes: {
        a: {
          md: md`How do you respond?`,
          choices: [
            {
              text: "Ask how the tags are maintained and what happens after a rig or model change; then show the encoder change in the demo, where tests not tagged with the firmware module change score, and offer to import her tags as declared dependencies",
              next: "b",
              score: 10,
              feedback: "You treated her scripts as a strong baseline, found the gap they cannot see (rig and model changes, history), and made her work an input rather than a rival.",
            },
            {
              text: "Explain that tag-based selection is outdated",
              next: "b",
              score: 1,
              feedback: "You just told the person who built it, in front of her boss, that her work is outdated. You have lost the skeptic who could have been your champion.",
            },
            {
              text: "Skip ahead to the ask; the head of test is the buyer",
              next: "b",
              score: 2,
              feedback: "The head of test will not buy over the objection of the engineer who owns the process.",
            },
            {
              text: "Promise that Ripple will be 10 times better than her scripts",
              next: "b",
              score: 0,
              feedback: "An unmeasured claim to an engineer. You have nothing to back it.",
            },
          ],
        },
        b: {
          md: md`She is interested but pushes: "Show me it on our data, now. We have a dump of last month's runs."`,
          choices: [
            {
              text: "Decline a live run on unseen data, explain why (format mapping and dependency import take a day), and propose a scheduled replay session on their last ten full regressions within two weeks, with her defining the success metric",
              next: "c",
              score: 10,
              feedback: "You protected the demo from a format failure and converted her challenge into the pilot's first step, owned by her.",
            },
            {
              text: "Try it live",
              next: "c",
              score: 3,
              feedback: "A parse error at minute 20 is what everyone remembers. Live runs on unseen data belong in a scheduled session.",
            },
            {
              text: "Say the data is probably not good enough for Ripple",
              next: "c",
              score: 2,
              feedback: "Insulting her data is insulting her team's work, and you have not looked at it.",
            },
          ],
        },
        c: {
          md: md`At the end, the head of test asks: "If we do this, does it help us with the Machinery Regulation next year?"`,
          choices: [
            {
              text: "Say it does not make anything compliant; it produces time-aligned, traceable test evidence that their conformity work, and a notified body for Annex I Part A cases, can use; offer the dated note on what applies from 20 January 2027",
              score: 10,
              feedback: "Accurate, useful and humble. Over-claiming regulation in front of a principal engineer would undo the last 40 minutes.",
            },
            {
              text: "Say yes, Ripple makes them compliant with the AI requirements",
              score: 0,
              feedback: "False, and the AI-related requirements for machinery are still to come through delegated acts.",
            },
            {
              text: "Say regulation is not relevant to test selection",
              score: 4,
              feedback: "Missed opportunity: traceable evidence is relevant, as long as you do not over-claim.",
            },
          ],
        },
      },
    },
  ],
};

export default lesson;
