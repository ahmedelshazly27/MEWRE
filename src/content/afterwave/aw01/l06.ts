import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw01-l06",
  title: "Where time and money go in a test organisation",
  summary:
    "The economics of a hardware test lab: how 8,760 calendar hours per rig shrink to a few thousand valid test hours, what a valid test hour really costs, how retest loops and data wrangling consume capacity and engineers, a decision rule for whether to rerun a test, and an illustrative cost model of the levers Afterwave attacks.",
  minutes: 70,
  objectives: [
    "Decompose a rig's calendar hours into downtime, setup, idle, invalid, redundant and useful test hours",
    "Compute the fully loaded cost per valid test hour and the cost of a retest loop",
    "Apply the expected-cost rule for whether to rerun a test after a change",
    "Build an illustrative value model for capture, retest selection and data wrangling, and state when freed hours are worth money",
  ],
  concepts: [
    { id: "aw01.rig-utilisation", name: "Rig utilisation decomposition", description: "Breaking calendar hours into downtime, setup and changeover, idle, invalid runs, redundant retests and useful test hours.", competency: "aw-test" },
    { id: "aw01.cost-per-valid-hour", name: "Cost per valid test hour", description: "Annual fixed cost of a rig (depreciation, facility, maintenance, calibration, allocated staff) divided by valid test hours.", competency: "aw-test", related: ["aw01.rig-utilisation", "fc02.cost-of-delay"] },
    { id: "aw01.retest-loop", name: "Retest loop and selection rule", description: "The regression tests rerun after each change, and the expected-cost rule: rerun a test if its probability of catching a regression times the cost of an escape exceeds its cost.", competency: "aw-test", related: ["aw01.cost-per-valid-hour"] },
    { id: "aw01.data-wrangling", name: "Data wrangling cost", description: "Engineer time spent finding, aligning, cleaning and reformatting test data and assembling reports, rather than deciding.", competency: "aw-test" },
    { id: "aw01.afterwave-economics", name: "Afterwave's economic levers", description: "Fewer invalid runs, fewer redundant retests, less wrangling, faster root cause, and later higher utilisation through supervised overnight runs: valued as capacity, engineer time and schedule.", competency: "aw-business", related: ["aw01.cost-per-valid-hour", "aw01.retest-loop", "fc03.value-quantification"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "The anatomy of a rig-year",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Afterwave's price has to be justified against a lab's own economics. A lab manager thinks in rig hours, programme weeks and headcount, not in "AI". If you can sit with her, decompose one rig-year on a whiteboard, and show which slices Lockstep and Ripple shrink, you have the value case and the pilot success criteria in one picture. This lesson builds that picture with illustrative numbers you will replace with each prospect's.`,
        },
        {
          kind: "md",
          md: md`### From 8,760 hours to valid test hours

Every rig has 8,760 calendar hours a year. Successive losses remove most of them:

1. **Downtime**: breakdowns, planned maintenance, calibration, rig upgrades.
2. **Unscheduled / idle**: no shift staffed, no DUT ready, waiting for parts, firmware or a decision.
3. **Setup and changeover**: installing the DUT, swapping fixtures, wiring and checking instrumentation, warm-up.
4. **Invalid runs**: the test ran but the result cannot be used: wrong firmware loaded, missing channel, sensor fault, rig fault mid-test, data lost or unaligned.
5. **Redundant retests**: valid runs that were not needed: regression tests rerun after a change that could not have affected them.
6. **Useful test hours**: what is left, the only hours that produce new evidence.

This is the test-lab version of manufacturing's overall equipment effectiveness (availability times performance times quality). The fully loaded cost per valid hour is:`,
        },
        { kind: "equation", formula: "aw01-cost-valid-hour" },
        {
          kind: "md",
          md: md`Fixed cost is the right base because most of a rig's cost does not vary with use: depreciation, facility, maintenance contracts, calibration and the staff assigned to it. Lost hours are therefore not "free": they raise the cost of every hour that does count.

### Retest loops

Every change (firmware, calibration, hardware revision, supplier part, rig modification) triggers a question: which tests must run again? Labs typically answer by engineering judgment or by rerunning a fixed regression set. Research on industrial hardware-dependent system testing reports that selection is mostly manual and driven by testers' judgment (an industrial study with OMICRON electronics, arXiv 2212.05960, 2022). Both errors cost money:

- **Over-selection**: rerunning tests the change cannot affect wastes rig hours and delays programmes.
- **Under-selection**: skipping a test that would have caught a regression lets it escape to a later, more expensive level of the V-model, or to the field.

The expected-cost rule for one test $i$ makes the trade explicit: rerun it if the expected cost of not running it exceeds the cost of running it:`,
        },
        { kind: "equation", formula: "aw01-retest-rule" },
        {
          kind: "md",
          md: md`The hard input is $p_i$, the probability that this change breaks what test $i$ checks. That is exactly what a change-impact engine estimates from the dependency structure (which firmware modules, parameters and rig components a test exercises) and from history (what similar changes broke before). The Afterwave widget below combines several weak impact links per test with $1 - \prod(1 - w)$ (each changed artifact can independently affect the test) and shows the rig hours saved against regressions caught as you move the selection threshold.`,
        },
        {
          kind: "widget",
          widget: "change-impact",
          caption: "Pick changed firmware, model or rig artifacts; watch each test's impact score and the trade-off between rig hours saved and expected regressions caught as the threshold moves.",
        },
        {
          kind: "md",
          md: md`### Data wrangling

Engineers in test organisations spend a large share of their time not testing or deciding but **handling data**: finding the files for a run, converting formats, aligning clocks between DAQ, bus logs and power analysers, reconstructing which configuration was installed, building plots and reports by hand. The share varies widely between labs and is rarely measured; it is a number to collect in discovery, not to assert.

### Why late defects cost more

A regression caught in a component test costs one rerun and a fix. The same regression caught at system validation costs the system test, the investigation, the fix, and reruns at every level above the component. Caught in the field, it costs warranty, recalls and reputation.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "The '10x per stage' rule",
          md: md`The claim that defect cost multiplies by about ten at each later stage is widely repeated in engineering and quality literature, but the original data are old, mostly from software projects, and vary enormously by domain. Use the direction (later is much more expensive) and the prospect's own numbers for an escape (rig weeks, programme delay, warranty), not a universal multiplier.`,
        },
        {
          kind: "chart",
          chart: "stacked-bar",
          title: "Illustrative rig-year: today vs with capture and retest selection (hours)",
          xKey: "case",
          xLabel: "Case",
          yLabel: "Hours per year",
          series: [
            { key: "down", label: "Downtime" },
            { key: "setup", label: "Setup and changeover" },
            { key: "idle", label: "Idle / unscheduled" },
            { key: "invalid", label: "Invalid runs" },
            { key: "redundant", label: "Redundant retests" },
            { key: "useful", label: "Useful test hours" },
          ],
          data: [
            { case: "Today", down: 876, setup: 1314, idle: 2628, invalid: 788, redundant: 442, useful: 2712 },
            { case: "With levers", down: 876, setup: 1314, idle: 2628, invalid: 394, redundant: 0, useful: 3548 },
          ],
          caption: "Same rig, same calendar. Halving invalid runs and avoiding redundant retests turns 836 h into useful hours: 31 % more useful evidence from the same asset. Idle hours are the later lever (supervised overnight runs).",
        },
      ],
    },
    {
      layer: "applied",
      title: "An illustrative cost model for a ten-rig lab",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Cost per valid hour and the value of three levers",
          given: md`Illustrative lab (not a customer): 10 drive-unit dynos. Per rig: capex EUR 1.2 m over 8 years; facility, energy, maintenance and calibration EUR 90k/yr; allocated technicians and engineers EUR 260k/yr. Hours: downtime 10 %, setup 15 %, idle 30 %, running 45 %. 20 % of running hours are invalid. 40 % of valid hours are regression reruns after changes, of which an impact-based selection could safely avoid 35 %. 25 test engineers at EUR 130k loaded cost spend 25 % of their time on data wrangling.`,
          steps: [
            { md: md`**Fixed cost per rig:** $1{,}200{,}000/8 + 90{,}000 + 260{,}000 = 150{,}000 + 350{,}000 =$ EUR 500k/yr. Fleet: EUR 5.0 m/yr.` },
            { md: md`**Running hours:** $0.45 \times 8{,}760 = 3{,}942$ h. **Valid hours:** $3{,}942 \times 0.80 = 3{,}153.6$ h.` },
            { md: md`**Cost per valid hour:** $500{,}000/3{,}153.6 =$ **EUR 158.5**, against EUR 126.8 per running hour. One 120 h system test costs about EUR 19,000 of rig capacity.` },
            { md: md`**Lever 1, halve invalid runs** (Lockstep checks configuration and channels before and during the run): $788.4/2 = 394.2$ h per rig, $\times 10 \times 158.5 =$ EUR 625k/yr of capacity.` },
            { md: md`**Lever 2, avoid redundant retests** (Ripple): regression hours $0.40 \times 3{,}153.6 = 1{,}261.4$; avoided $0.35 \times 1{,}261.4 = 441.5$ h per rig, $\times 10 \times 158.5 =$ EUR 700k/yr.` },
            { md: md`**Lever 3, cut wrangling by 40 %**: $25 \times 0.25 \times 130{,}000 = $ EUR 812.5k/yr of wrangling; 40 % is EUR 325k/yr of engineer time.` },
            { md: md`**Total:** about EUR 1.65 m/yr of capacity and engineering time, on EUR 5.0 m of rig cost plus EUR 3.25 m of engineering salaries. In capacity terms the lab gains $(394.2 + 441.5)/3{,}153.6 = 26.5\%$ more valid hours: the equivalent of 2.65 additional rigs, or about EUR 3.2 m of capex it may not need to buy.` },
          ],
          result: md`Valid test hours cost about EUR 160 each; three levers free about EUR 1.65 m a year of capacity and engineer time in this illustrative lab. The money is real only where it converts: deferred rig purchases, programmes finishing earlier, or headcount not hired. That conversion is the core of the business case, and the subject of the field section.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Should this system test rerun?",
          given: md`Same lab, EUR 158.5 per valid hour. After a calibration change to the current controller, three system tests are candidates: durability block D (120 h, estimated $p = 0.02$), thermal derating T (16 h, $p = 0.30$), efficiency spot-check E (8 h, $p = 0.10$). Illustrative cost of a regression escaping to vehicle or robot validation: EUR 250k.`,
          steps: [
            { md: md`Cost to run D: $120 \times 158.5 = $ EUR 19,020. Expected escape cost if skipped: $0.02 \times 250{,}000 = $ EUR 5,000.` },
            { md: md`D: run or skip? Expected escape cost is below run cost, so **skip** (decision value: EUR 19,020 minus 5,000 = EUR 14,020 saved in expectation).`, hidden: true, check: { prompt: "Expected saving from skipping D (EUR)", answer: 14020, unit: "EUR", tolerance: { abs: 20 } } },
            { md: md`T: run cost $16 \times 158.5 = $ EUR 2,536; expected escape $0.30 \times 250{,}000 = $ EUR 75,000. **Run.**` },
            { md: md`E: break-even probability $p^* = 8 \times 158.5/250{,}000$.` },
            { md: md`$p^* =$ **0.0051**; with $p = 0.10$ it is far above, so **run**.`, hidden: true, check: { prompt: "Break-even probability for E", answer: 0.0051, tolerance: { abs: 0.0002 } } },
          ],
          result: md`Run T and E (24 h), skip D (120 h). The rule only works if p is estimated honestly; a Ripple-style engine earns trust by showing why each p is what it is (which artifacts changed, which links, what history) and by logging outcomes so estimates improve.`,
        },
        {
          kind: "question",
          question: {
            id: "aw01-l06-p1",
            type: "numeric",
            prompt: md`A lab has 6 battery cycler racks, each with fixed cost EUR 300k/yr, running 50 % of calendar hours, with 25 % of running hours invalid. What is the cost per valid hour (EUR, 1 decimal)?`,
            answer: 91.3,
            tolerance: { abs: 0.2 },
            unit: "EUR/h",
            explanation: md`Running $= 0.5 \times 8{,}760 = 4{,}380$ h; valid $= 0.75 \times 4{,}380 = 3{,}285$ h; cost $= 300{,}000/3{,}285 = $ EUR 91.3 per valid hour. Halving invalid runs to 12.5 % raises valid hours to 3,832.5 and cuts the cost to EUR 78.3.`,
            concepts: ["aw01.cost-per-valid-hour"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Turning a cost model into a value case",
      blocks: [
        {
          kind: "md",
          md: md`### Collect the numbers, do not assert them

Every input in the model above is a discovery question: rig count and type, capex and age, utilisation (if they track it), invalid-run rate (often unknown: ask for the last month's run log), how often changes trigger reruns and how long each loop takes, engineer count and their own estimate of time spent on data. Run the discovery the way Founder Core teaches it, then build the model **with** the lab manager, so the numbers are hers.

### When freed hours are worth money

- **The rig is the constraint** (booked weeks ahead, programmes queuing): freed hours shorten programmes or defer a rig purchase. Value: cost of delay of the programme, or the capex avoided.
- **Engineers are the constraint**: wrangling time saved becomes analysis time or avoided hires.
- **Neither is the constraint**: freed hours have little cash value. The case must rest on escapes avoided (quality) or on readiness for regulation such as the EU Machinery Regulation 2023/1230 (applies from 20 January 2027, with technical documentation and conformity evidence required), not on utilisation.

### Later levers

Idle hours are the biggest slice in most labs. Afterwave's product vision (agents planning retests and running rigs overnight with human approval) attacks that slice, and Afterwave's own instrumented test platforms would sell rig capacity directly. The platform-economics widget shows how that business depends on utilisation.`,
        },
        {
          kind: "widget",
          widget: "platform-economics",
          caption: "For the later platform business: rig capex, availability, utilisation and price per test hour set breakeven utilisation and payback. The same utilisation logic as this lesson, from the owner's side.",
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How value cases go wrong",
          md: md`- **Counting freed hours as cash** when the lab is not capacity-constrained.
- **Double counting**: an invalid run avoided and the retest it would have caused counted twice.
- **Ignoring the new risk**: a skipped test that would have caught a regression; show the expected-cost logic and the audit trail.
- **Your numbers, not theirs**: a model full of Afterwave assumptions convinces nobody. Leave blanks and fill them together.
- **Promising percentages before a pilot**: state the levers and how the pilot will measure each.`,
        },
        { kind: "sources", refs: ["aw01-r18", "aw01-r19"] },
        {
          kind: "checklist",
          title: "Pilot success criteria derived from the cost model",
          items: [
            "Baseline measured before the pilot: invalid-run rate, retest hours per change, time to assemble data for a report or RCA",
            "Lever 1 metric: invalid runs per 100 running hours on instrumented rigs",
            "Lever 2 metric: rig hours per change with Ripple's selection, and regressions found later that Ripple did not select (should be zero or explained)",
            "Lever 3 metric: engineer hours per test report or RCA data package",
            "Conversion: what the lab did with freed capacity (programme dates, deferred purchases)",
          ],
        },
        {
          kind: "ask",
          title: "Questions for the lab manager",
          items: [
            "Which rig is your bottleneck, and what would one more rig-month be worth to the programme waiting for it?",
            "When did you last buy a rig, why, and what did it cost all-in?",
            "Of last month's runs, how many could not be used, and why?",
            "When firmware changes, how many rig hours does the rerun take, and how often has a skipped test come back to bite you?",
          ],
        },
        {
          kind: "xref",
          to: "fc04-l02",
          note: "Founder Core covers discovery calls and how to quantify pain with the buyer; use it to collect this lesson's inputs.",
        },
        { kind: "scenario", scenario: "aw01-s2" },
        {
          kind: "question",
          question: {
            id: "aw01-l06-p2",
            type: "short",
            prompt: md`Build a **one-page value model** for an illustrative prospect: a battery validation lab with 40 cycler channels grouped into 8 racks, 4 climate chambers and 12 engineers. Use labelled assumptions for every input. Compute the cost per valid hour for a rack, the value of halving invalid runs and avoiding redundant retests, and the wrangling time saved. Then write the paragraph you would show the lab manager stating when this value is real, what the pilot will measure, and which inputs she must confirm.`,
            rubric: [
              "Every input labelled as an assumption, with plausible values (fixed cost per rack, hour shares, invalid rate, regression share, engineer cost and wrangling share)",
              "Correct arithmetic for cost per valid hour and for each lever",
              "Does not double count and distinguishes capacity value from cash",
              "States the conversion condition (capacity or engineer constraint, programme delay, deferred capex) explicitly",
              "Defines pilot metrics with a baseline for each lever",
              "Lists the inputs the lab manager must confirm and avoids invented customer facts",
            ],
            modelAnswer: md`**Assumptions (illustrative, to confirm):** 8 cycler racks, fixed cost EUR 200k/yr each (depreciation of EUR 600k over 6 years = 100k, chamber share and facility 40k, staff allocation 60k). Running 60 % of calendar hours (cyclers run long unattended tests); invalid 15 % of running hours (cell contact faults, wrong schedule, temperature excursions, data gaps); 30 % of valid hours are regression reruns after BMS or cell-supplier changes, 30 % of those avoidable. 12 engineers at EUR 120k loaded, 30 % of time on data.

**Cost per valid hour:** running $= 0.60 \times 8{,}760 = 5{,}256$ h; valid $= 0.85 \times 5{,}256 = 4{,}467.6$ h; cost $= 200{,}000/4{,}467.6 = $ EUR 44.8 per rack-hour.

**Lever 1 (halve invalid):** $0.5 \times 788.4 = 394.2$ h per rack, $\times 8 \times 44.8 = $ EUR 141k/yr.
**Lever 2 (avoid redundant retests):** $0.30 \times 0.30 \times 4{,}467.6 = 402.1$ h per rack, $\times 8 \times 44.8 = $ EUR 144k/yr.
**Lever 3 (wrangling, cut 40 %):** $12 \times 0.30 \times 120{,}000 \times 0.40 = $ EUR 173k/yr.
Total about EUR 458k/yr; capacity gain $(394.2 + 402.1)/4{,}467.6 = 17.8\%$, about 1.4 racks.

**Paragraph for the lab manager:** "These figures are our assumptions until you replace them. The capacity value (about 18 % more valid cycler hours) is real money only if racks are your constraint: if programmes wait for channels or you plan to buy racks next year. If not, the case rests on engineer time (lever 3) and on catching regressions that a fixed rerun list misses. The pilot on two racks will measure, against a four-week baseline: invalid runs per 100 running hours, rack hours per BMS change and any regression found later that Ripple did not select, and engineer hours per weekly report. Please confirm rack cost, the invalid-run rate from last month's log, how many reruns the last three BMS changes caused, and your team's own estimate of time on data."`,
            explanation: md`A credible value model is transparent about every input, avoids double counting, separates capacity from cash, and ends with a measurable pilot and a list of numbers the buyer owns.`,
            concepts: ["aw01.cost-per-valid-hour", "aw01.afterwave-economics", "aw01.retest-loop"],
            difficulty: 3,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw01-l06-q1",
      type: "numeric",
      prompt: md`A rig with fixed cost EUR 400k/yr runs 40 % of calendar hours with 10 % invalid. Cost per valid hour (EUR, 1 decimal)?`,
      answer: 126.8,
      tolerance: { abs: 0.2 },
      unit: "EUR/h",
      explanation: md`Valid $= 8{,}760 \times 0.40 \times 0.90 = 3{,}153.6$ h; $400{,}000/3{,}153.6 = 126.8$ EUR/h.`,
      concepts: ["aw01.cost-per-valid-hour"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw01-l06-q2",
      type: "order",
      prompt: "Order the losses from calendar hours down to useful test hours, as in the lesson's decomposition.",
      items: ["Downtime", "Idle / unscheduled", "Setup and changeover", "Invalid runs", "Redundant retests"],
      explanation: md`Availability first (downtime), then whether a test is scheduled at all, then setup, then whether the run is valid, then whether it was needed. What remains is useful.`,
      concepts: ["aw01.rig-utilisation"],
      difficulty: 1,
    },
    {
      id: "aw01-l06-q3",
      type: "numeric",
      prompt: md`A test takes 40 h at EUR 150 per valid hour. An escaped regression would cost EUR 400k. Above what probability of catching a regression should the test be rerun? (4 decimals)`,
      answer: 0.015,
      tolerance: { abs: 0.0002 },
      explanation: md`$p^* = c_h h_i / C_\text{esc} = 6{,}000/400{,}000 = 0.015$. Rerun if the change has more than a 1.5 % chance of breaking what this test checks.`,
      concepts: ["aw01.retest-loop"],
      difficulty: 2,
    },
    {
      id: "aw01-l06-q4",
      type: "mcq",
      prompt: "A lab's rigs are half empty and programmes never wait for them. Which value claim is strongest?",
      options: [
        "Freed rig hours, priced at the cost per valid hour",
        "Deferred rig purchases",
        "Engineer time saved on data handling and fewer escaped regressions",
        "Higher utilisation",
      ],
      answer: 2,
      explanation: md`Freed capacity is worth little when capacity is not the constraint. Engineer time and quality (escapes avoided, traceable evidence) still convert to value.`,
      concepts: ["aw01.afterwave-economics"],
      difficulty: 2,
    },
    {
      id: "aw01-l06-q5",
      type: "multi",
      prompt: "Which of these are invalid runs rather than redundant retests? (Select all that apply.)",
      options: [
        "A 60 h test where the torque channel was not recorded",
        "A regression test rerun after a change to the logging module only",
        "A test that ran with the previous firmware by mistake",
        "A run aborted by a coolant unit fault",
      ],
      answer: [0, 2, 3],
      explanation: md`Invalid runs produce no usable evidence (missing data, wrong configuration, rig fault). A rerun that could not have been affected by the change is valid but redundant.`,
      concepts: ["aw01.rig-utilisation"],
      difficulty: 1,
    },
    {
      id: "aw01-l06-q6",
      type: "decision",
      prompt: md`In a first meeting, the VP of validation asks: "So how much will you save us?" You have no data from her lab yet. What do you say?`,
      options: [
        { text: "\"Typically 30 to 40 % of test costs.\"", score: 0, feedback: "Invented and unverifiable; it will be held against you." },
        { text: "\"Let's build that number together. Savings come from three places: invalid runs, reruns after changes, and time your engineers spend on data. If you share rough figures for each, I'll model it with you today and the pilot will measure it.\"", score: 1, feedback: "Explains the mechanism, makes her the owner of the numbers, and leads to a measurable pilot." },
        { text: "\"It depends.\"", score: 0.2, feedback: "True but useless: give the structure of the answer." },
      ],
      explanation: md`Value cases built on the buyer's own inputs are believed; vendor percentages are not.`,
      concepts: ["aw01.afterwave-economics"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "aw01-l06-f1", front: "Cost per valid test hour", back: "Annual fixed rig cost divided by valid test hours (not running hours).", concepts: ["aw01.cost-per-valid-hour"] },
    { id: "aw01-l06-f2", front: "Six slices of a rig-year", back: "Downtime, idle, setup, invalid runs, redundant retests, useful hours.", concepts: ["aw01.rig-utilisation"] },
    { id: "aw01-l06-f3", front: "Retest rule", back: md`Rerun test $i$ if $p_i C_\text{esc} > c_h h_i$`, concepts: ["aw01.retest-loop"] },
    { id: "aw01-l06-f4", front: "Invalid vs redundant", back: "Invalid: the run produced no usable evidence. Redundant: valid, but the change could not have affected it.", concepts: ["aw01.rig-utilisation"] },
    { id: "aw01-l06-f5", front: "When freed rig hours are worth money", back: "When rigs or engineers are the constraint: programmes finish earlier, purchases are deferred, hires avoided.", concepts: ["aw01.afterwave-economics"] },
    { id: "aw01-l06-f6", front: "Illustrative ten-rig lab", back: "EUR 158.5 per valid hour; three levers free about EUR 1.65 m/yr, about 2.65 rigs of capacity.", concepts: ["aw01.afterwave-economics"] },
  ],
  scenarios: [
    {
      id: "aw01-s2",
      title: "The finance partner asks for the ROI",
      context: md`Illustrative: after a successful technical evaluation, the prospect's finance business partner joins the call. She says: "Your licence is EUR 180k a year. Show me the return, or this does not get budget."`,
      start: "a",
      concepts: ["aw01.afterwave-economics", "aw01.cost-per-valid-hour"],
      nodes: {
        a: {
          md: md`How do you start?`,
          choices: [
            { text: "Present the generic savings slide with industry percentages.", score: 2, feedback: "Finance discounts vendor claims to zero.", next: "b" },
            { text: "Ask which costs she already tracks for the lab (rig depreciation, staff, programme delays) and offer to build the model on those, with the validation lead's numbers for invalid runs and reruns.", score: 9, feedback: "Starts from her ledger, not your slide.", next: "c" },
          ],
        },
        b: {
          md: md`She asks where the percentages come from. You do not have a source.`,
          choices: [
            { text: "Admit it, withdraw them, and propose building the model from the lab's own numbers.", score: 6, feedback: "Recovers credibility, at a cost.", next: "c" },
          ],
        },
        c: {
          md: md`With the validation lead's inputs the model shows EUR 1.2 m/yr of freed capacity and engineer time (illustrative). She asks: "Is that cash?"`,
          choices: [
            { text: "\"Mostly not, unless you were going to buy rigs or hire. The lab has a rig purchase in next year's plan: if the freed capacity defers it, that is EUR 1.2 m of capex avoided. The engineer time is about EUR 300k of capacity you can redeploy.\"", score: 10, feedback: "Separates capacity from cash and ties value to a real budget line she controls.", next: "d" },
            { text: "\"Yes, EUR 1.2 m of savings.\"", score: 2, feedback: "Overclaims: she will find out and distrust everything else." },
          ],
        },
        d: {
          md: md`She agrees the capex deferral is the strongest lever and asks how she will know it worked.`,
          choices: [
            { text: "Propose pilot metrics with a baseline (valid hours per rig-month, rig hours per change, escapes) and a decision point before next year's rig purchase is committed.", score: 10, feedback: "Ties the purchase decision to measured evidence on her timeline." },
            { text: "Offer a discount instead.", score: 3, feedback: "Price was not the objection; evidence was." },
          ],
        },
      },
    },
  ],
};

export default lesson;
