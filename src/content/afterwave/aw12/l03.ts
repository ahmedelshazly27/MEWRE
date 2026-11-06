import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw12-l03",
  title: "Pilot design for test infrastructure",
  summary:
    "How to design an Afterwave pilot that a validation organisation can say yes to: which rig and programme to scope, the backtest, shadow and gated phases, success metrics that a validation manager trusts (selection ratio, miss rate with a statistical bound, capture completeness, sync accuracy), the data access you need, duration from release cadence, pilot pricing and a conversion clause that scales from one rig to the programme.",
  minutes: 80,
  objectives: [
    "You can choose the rig and programme for a pilot using explicit criteria.",
    "You can design the three phases of a Ripple pilot (backtest, shadow, gated) and say what each proves.",
    "You can compute how many historical failures a backtest needs to support a miss-rate claim, using the rule of three.",
    "You can list the data access a pilot needs and write success criteria, price and a scale-up conversion clause specific to test infrastructure.",
  ],
  concepts: [
    { id: "aw12.pilot-scope", name: "Pilot scope for test infrastructure", description: "One programme, one or two rigs, one change stream (firmware, model or rig configuration) with a release cadence high enough to produce evidence inside the pilot window, owned by the champion and off the programme's critical path.", competency: "aw-business", related: ["fc04.paid-pilot", "fc02.pilot-success-criteria"] },
    { id: "aw12.backtest-shadow-gated", name: "Backtest, shadow and gated phases", description: "Backtest: replay historical changes and check the selected sets would have caught known failures. Shadow: recommend on live changes while the full suite still runs, and compare. Gated: run only the selected set, with a human approval and a periodic full run as a safety net.", competency: "aw-business", related: ["aw12.pilot-scope"] },
    { id: "aw12.miss-rate-bound", name: "Miss-rate bound (rule of three)", description: "After zero misses in n independent failing-test events, the 95 % upper bound on the miss rate is about 3/n; it fixes how much history a backtest needs before a validation manager can accept a claim.", competency: "aw-business", related: ["aw12.backtest-shadow-gated"] },
    { id: "aw12.pilot-data-access", name: "Pilot data access", description: "What the pilot must be given: historical run results and DAQ files, the test catalogue with requirement links, change history (firmware and model versions, rig configuration), sequencer logs, and access to bench PCs for capture.", competency: "aw-business", related: ["aw12.pilot-scope"] },
    { id: "aw12.scale-up-clause", name: "Scale-up conversion clause", description: "A conversion clause that fixes the price and timing for expanding from the pilot rigs to the programme or lab (per rig, per programme or site licence), so success converts into the larger contract without a new negotiation.", competency: "aw-business", related: ["fc04.conversion-clause"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What a test infrastructure pilot must prove",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Every Afterwave sale will go through a pilot: no validation manager will let a tool decide what not to test on the strength of a demo. The pilot is where you either produce evidence that a sceptical engineer accepts, or spend three months on an integration that ends in "interesting". Ripple has a specific burden: it must show it does **not miss** failures, which is a statistical claim, and statistics needs data volume you have to plan for.`,
        },
        {
          kind: "xref",
          to: "fc04-l06",
          note: "Founder Core: paid vs free pilots, expected value of a pilot, generic success criteria, conversion clause, security review and on-prem deployment basics. This lesson applies them to test rigs and change-impact selection.",
        },
        {
          kind: "md",
          md: md`### Choosing the rig and the programme

Pick the scope that produces evidence fastest with the least risk to the buyer:

| Criterion | Good | Bad |
|---|---|---|
| **Change cadence** | Weekly or faster firmware or model releases | Quarterly releases (too few events in 10 weeks) |
| **History** | 12 to 24 months of results and change records | New programme, no history |
| **Data state** | Digital DAQ files, sequencer logs, versioned firmware | Paper logs, unversioned scripts |
| **Ownership** | Champion owns the rig and bench PCs | Shared rig owned by another department |
| **Critical path** | Important but not on the gate to start of production | The rig that gates next month's milestone |
| **Representativeness** | Typical of the rigs you would scale to | A one-off special rig |

For a humanoid company, an actuator life-test or dyno rig with weekly joint-controller firmware releases is usually ideal. For an e-drive department, an inverter HIL bench with frequent software drops.

### The three phases of a Ripple pilot

1. **Backtest (history):** replay past changes. For each, Ripple selects a set; check whether the tests that actually failed in the full regression are inside it. Fast evidence, no risk to the buyer, needs history.
2. **Shadow (live, no risk):** on each live change, Ripple recommends, but the full suite still runs. Compare. Proves it works on new changes, but gives few events in a short window.
3. **Gated (live, with savings):** only the selected set runs, with a human approving the selection and a periodic full run as a safety net. This is where rig-hours are actually released.

Capture (Lockstep) is installed first: it produces the synchronised data the shadow and gated phases use, and its own criteria (completeness, sync accuracy, time to root cause) are measurable within weeks.`,
        },
        {
          kind: "flow",
          title: "A 12-week Afterwave pilot",
          steps: [
            { label: "Weeks 0 to 2: install", detail: "Enclave server, Lockstep on 2 bench PCs, data import" },
            { label: "Weeks 2 to 5: backtest", detail: "18 months of changes and results" },
            { label: "Weeks 4 to 10: shadow", detail: "Recommend on live releases; full suite still runs" },
            { label: "Weeks 9 to 11: gated", detail: "Selected sets with approval; one full run as net" },
            { label: "Week 12: decision", detail: "Scorecard to the economic buyer" },
          ],
          caption: "Phases overlap. The backtest carries the statistical weight; shadow and gated show it works live.",
        },
        {
          kind: "md",
          md: md`### How much evidence is enough

The validation manager's question is "how often will it miss a failure?". If the selected sets contained every one of $n$ failing tests in the backtest, the honest answer is not "never" but an upper bound:`,
        },
        { kind: "equation", formula: "aw12-rule-of-three" },
        {
          kind: "md",
          md: md`| Failing-test events with zero misses ($n$) | 95 % upper bound on miss rate |
|---|---|
| 10 | about 26 % (exact $1 - 0.05^{1/10} = 25.9\%$) |
| 30 | about 10 % |
| 60 | about 5 % |
| 100 | about 3 % |

A 10-week shadow phase with one release a week might see 10 to 25 failing tests: not enough for a strong claim. The backtest over 12 to 24 months of history is where the numbers come from. That is why **historical data access** is a precondition of the pilot, not a nice-to-have. Count events per failing test, not per release, but discount events that are clustered (ten tests failing from one root cause are not ten independent events).

### Success criteria specific to test infrastructure

| Product | Metric | Example threshold (illustrative) |
|---|---|---|
| Lockstep | Capture completeness | All configured channels and HMI events for 100 % of runs in a 20-run audit sample |
| Lockstep | Sync accuracy | Offset between DAQ and HMI events within an agreed tolerance (for example 1 ms) against a sync pulse check |
| Lockstep | Time to root cause | Median time to explain a data-caused anomaly falls by an agreed amount |
| Ripple | Selection ratio $s$ | At most 40 % of full-regression rig-hours on backtested changes |
| Ripple | Miss rate | Zero misses on at least 60 historical failing tests, i.e. 95 % bound below 5 % |
| Ripple | Explainability | Every skipped test has a stated reason the validation manager accepts on a sample |

### Pricing the pilot and the conversion

A paid pilot fee that covers most of the delivery cost, credited against year 1 if signed within a window, is the default (Founder Core lesson on pilots). For test infrastructure, add a **scale-up clause**: the pilot covers 2 rigs; on success, the annual contract covers the programme or lab at a pre-agreed price per rig or per programme, with the start date and the rig count fixed. Use the pilot expected-value formula to check the fee:`,
        },
        { kind: "equation", formula: "fc04-pilot-ev" },
      ],
    },
    {
      layer: "applied",
      title: "Sizing the evidence, the duration and the fee",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Designing the backtest and the fee for an illustrative actuator lab",
          given: md`**Illustrative.** Actuator test lab at a humanoid company, 50 firmware releases a year. 18 months of history: 75 releases, of which 28 produced at least one regression failure, 64 failing tests in total, which the champion judges to be roughly independent root causes. Delivery cost: 240 engineering hours at EUR 120/h plus EUR 4k travel. Annual contract on conversion (programme-wide): EUR 120k at 75 % gross margin, expected 3 years. Assumed conversion probability with a paid pilot: 50 %.`,
          steps: [
            { md: md`**Miss-rate bound if the backtest has zero misses:** $p_{up} \approx 3/64 = 4.7\%$ (exact $1 - 0.05^{1/64} = 4.6\%$). That clears a "below 5 %" criterion.` },
            { md: md`**What shadow adds:** 8 weeks at about 1 release a week, with about 0.85 failing tests per release on history ($64/75$), gives about 7 events. Alone that supports only a bound near $3/7 = 43\%$; its job is to show live behaviour, not to carry the statistics.` },
            { md: md`**Delivery cost:** $C_d = 240 \times 120 + 4{,}000 = 32{,}800$ EUR.` },
            { md: md`**Fee and EV:** fee $F$ = EUR 30k. $EV = 30 - 32.8 + 0.5 \times 120 \times 0.75 \times 3 = -2.8 + 135 =$ **EUR 132.2k**.` },
            { md: md`**Scale-up clause:** pilot on 2 rigs for 12 weeks; on meeting criteria, annual subscription for the programme (up to 14 rigs) at EUR 120k/yr, starting the first of the month after the decision meeting; EUR 30k credited if signed within 30 days.` },
          ],
          result: md`The backtest on 18 months of history carries the miss-rate claim (below 5 % at 95 % confidence if no misses); shadow and gated phases show it working live. A EUR 30k fee nearly covers delivery, and the pilot's expected value is about EUR 132k under these assumptions.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: a stricter validation manager",
          given: md`The validation manager wants the 95 % bound below 3 %. The same lab has 0.85 failing tests per release on average and releases about once a week.`,
          steps: [
            { md: md`Required failing-test events with zero misses: $n \approx 3/0.03$.` },
            { md: md`$n \approx$ **100** events.`, hidden: true, check: { prompt: "Events needed (count)", answer: 100, unit: "events", tolerance: { abs: 1 } } },
            { md: md`Releases of history needed at 0.85 failing tests per release: $100/0.85$.` },
            { md: md`$\approx$ **118** releases, about 2.3 years at 50 a year. The lab has 75.`, hidden: true, check: { prompt: "Releases of history needed", answer: 118, unit: "releases", tolerance: { abs: 1 } } },
          ],
          result: md`The lab does not have enough history for a 3 % claim. Options: widen the backtest to a second rig family with similar history, accept a 5 % bound for the pilot with a gated-phase safety net (periodic full runs), or agree that the 3 % target is a year-1 metric measured in production. Agree this before the pilot, not at the decision meeting.`,
        },
        {
          kind: "widget",
          widget: "change-impact",
          caption: "Pick changed firmware, model or rig artifacts and watch the selected set, rig-hours saved and expected regressions caught. Use it to explain the selection ratio and the miss trade-off to a validation manager.",
        },
      ],
    },
    {
      layer: "field",
      title: "Running the pilot in a lab",
      blocks: [
        {
          kind: "checklist",
          title: "Data access to agree before week 0",
          items: [
            "Historical test results (pass, fail, values) for the backtest window, with release identifiers",
            "Change history: firmware and model versions, rig configuration changes, calibration events",
            "Test catalogue with test-to-requirement and test-to-component links, if they exist",
            "Raw DAQ files and sequencer logs for a sample of runs (format: TDMS, MDF, CSV, Parquet or vendor-specific)",
            "Access to the 2 bench PCs for Lockstep, approved by whoever owns them (lesson 4)",
            "A named person at the buyer for 2 to 4 hours a week, and the validation manager for weekly reviews",
            "Written agreement on who owns captured data and models trained on it, and deletion at the end",
          ],
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How test infrastructure pilots go wrong",
          md: md`- **Pilot on the critical-path rig.** Any disturbance is blamed on you; nobody lets you run gated mode.
- **No history.** Without a backtest, a 10-week shadow phase cannot support a miss-rate claim, and the decision is postponed for "more data".
- **Counting releases instead of failures.** "We tested 10 releases" says little if only 3 had failures.
- **Treating clustered failures as independent.** Ten tests failing from one root cause are one event for the bound.
- **Gated mode without a safety net.** A single miss without a periodic full run destroys trust; always keep a scheduled full regression during the pilot.
- **Scale-up not priced.** The pilot succeeds on 2 rigs and the expansion to 14 is a new negotiation.`,
        },
        {
          kind: "ask",
          title: "Questions for the pilot scoping meeting",
          items: [
            "Which rig has frequent changes, good history and is not gating your next milestone?",
            "How many releases and how many regression failures do you have records for, and in what form?",
            "What miss rate would your validation manager accept, and at what confidence?",
            "Who owns the bench PCs and can approve Lockstep on them?",
            "If the pilot meets the criteria, how many rigs would the first annual contract cover, and from which budget?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw12-l03-p1",
            type: "short",
            prompt: md`Write the one-page pilot design for an **illustrative** Afterwave pilot at an account archetype of your choice (do not name a real company). Include: (1) rig and programme choice against the criteria; (2) the three phases with dates; (3) success criteria for Lockstep and Ripple, including a miss-rate criterion with the number of historical failing tests needed and the bound it supports; (4) data access; (5) fee with its expected-value check; (6) the scale-up conversion clause.`,
            rubric: [
              "Rig and programme choice is justified against cadence, history, data state, ownership and critical path.",
              "Backtest, shadow and gated phases are defined with dates and with what each proves; gated mode has a safety net.",
              "Miss-rate criterion uses the rule of three correctly (n events, bound about 3/n) and checks the history is sufficient.",
              "Lockstep criteria include completeness and sync accuracy with a measurement method.",
              "Data access list is concrete (results, change history, DAQ files, bench PC access, named people, data ownership).",
              "Fee is checked with the pilot EV formula, and the scale-up clause fixes rig count, price, start date and credit window; all numbers labelled illustrative.",
            ],
            modelAnswer: md`**Pilot design (illustrative): inverter HIL bench, e-drive validation department of a tier-1.**

**Scope:** 2 inverter HIL benches running the software regression for one e-drive programme; about 2 software drops a week; 20 months of history in the test management tool; bench PCs owned by the champion's test systems group; programme is in B-sample phase, not gating start of production.

**Phases:** weeks 0 to 2 install Enclave on a customer server and Lockstep on both bench PCs; weeks 2 to 5 backtest on 20 months (about 170 drops); weeks 4 to 10 shadow on live drops; weeks 9 to 11 gated with validation manager approval of each selection and a full regression every Friday; week 12 decision meeting.

**Criteria:** (1) Lockstep captures all configured channels and HMI events in a 20-run audit sample, judged by the test systems engineer, week 6. (2) DAQ-to-HMI offset within 1 ms on a sync pulse check, week 6. (3) Backtest: zero misses on at least 60 independent failing tests (history shows about 90), supporting a 95 % bound below 5 %; selection ratio at most 45 % of rig-hours; judged by the validation manager, week 5. (4) Shadow: no miss on live drops; every skipped test has an accepted reason on a 30-test sample, week 10.

**Data access:** results and drop identifiers for 20 months; software version history; test catalogue with requirement links; sample of 200 raw MDF files; bench PC admin approval; 3 h/week of the champion; weekly 30-minute review with the validation manager; data deleted or handed over at the end.

**Fee:** EUR 35k. Delivery cost about EUR 34k. Annual on conversion EUR 150k, 75 % margin, 3 years, conversion 45 %: $EV = 35 - 34 + 0.45 \times 150 \times 0.75 \times 3 = 1 + 151.9 = 152.9$ EUR k.

**Scale-up clause:** on meeting criteria 1 to 4, annual subscription for all 12 HIL benches of the department at EUR 150k/yr, starting the first of the month after the decision, EUR 35k credited if signed within 30 days; one 4-week extension if a criterion is missed for reasons outside Afterwave's control.`,
            explanation: md`A good design makes the statistical claim feasible before the pilot starts and fixes what success buys.`,
            concepts: ["aw12.pilot-scope", "aw12.backtest-shadow-gated", "aw12.miss-rate-bound", "aw12.pilot-data-access", "aw12.scale-up-clause"],
            difficulty: 3,
          },
        },
        {
          kind: "xref",
          to: "fc02-l06",
          note: "Founder Core Product: MVP scoping, pilot success criteria and pilot purgatory, from the product side.",
        },
        {
          kind: "feynman",
          prompt: "The validation manager says: 'Your tool caught every failure in ten releases, so it never misses?' Explain why that is not the right conclusion and what you will do instead.",
          keyPoints: [
            "Zero misses in a small sample only bounds the miss rate: about 3/n at 95 % confidence.",
            "Count failing-test events, not releases; ten releases may contain only a few failures.",
            "Clustered failures from one root cause are not independent events.",
            "Use the historical backtest to get enough events, and keep a periodic full run as a safety net in gated mode.",
          ],
        },
        { kind: "sources", refs: ["aw12-r15", "aw12-r17"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw12-l03-q1",
      type: "numeric",
      prompt: md`A backtest finds zero misses on 50 independent failing tests. Using the rule of three, what is the approximate 95 % upper bound on the miss rate (%)?`,
      answer: 6,
      tolerance: { abs: 0.2 },
      unit: "%",
      explanation: md`$3/50 = 0.06$, i.e. 6 % (exact $1 - 0.05^{1/50} = 5.8\%$).`,
      concepts: ["aw12.miss-rate-bound"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw12-l03-q2",
      type: "order",
      prompt: "Order the phases of a Ripple pilot.",
      items: ["Install capture and import history", "Backtest on historical changes", "Shadow mode on live changes with the full suite still running", "Gated mode with approval and a periodic full run", "Decision meeting with a scorecard"],
      explanation: md`History first (fast evidence, no risk), then live without risk, then live with savings, then decide.`,
      concepts: ["aw12.backtest-shadow-gated"],
      difficulty: 1,
    },
    {
      id: "aw12-l03-q3",
      type: "mcq",
      prompt: "Which rig is the best pilot candidate?",
      options: [
        "The rig that gates next month's start-of-production milestone",
        "A rig with weekly firmware releases, 18 months of digital history, owned by the champion and off the critical path",
        "A new rig commissioned last week",
        "A rig shared with another department that changes quarterly",
      ],
      answer: 1,
      explanation: md`Cadence and history produce evidence; ownership and being off the critical path reduce risk and friction.`,
      concepts: ["aw12.pilot-scope"],
      difficulty: 1,
    },
    {
      id: "aw12-l03-q4",
      type: "multi",
      prompt: "Which items belong in the data access agreement for a Ripple pilot? (Select all that apply.)",
      options: [
        "Historical test results with release identifiers",
        "Firmware, model and rig configuration change history",
        "Access to the bench PCs approved by their owner",
        "The buyer's customer list",
        "Who owns captured data and trained models, and deletion at the end",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`Results, change history, bench access and data ownership are needed; the buyer's customer list is not.`,
      concepts: ["aw12.pilot-data-access"],
      difficulty: 1,
    },
    {
      id: "aw12-l03-q5",
      type: "decision",
      prompt: md`Illustrative. In week 10, in gated mode, a test that Ripple skipped would have failed: it is caught by the scheduled Friday full run. The validation manager is alarmed. What do you do?`,
      options: [
        { text: "Argue that one miss is statistically insignificant.", score: 0.2, feedback: "True perhaps, but it dismisses the concern of the person who signs the report." },
        { text: "Show that the safety net worked as designed, run a root-cause analysis of why the dependency was missed (for example a missing link between the firmware module and that test), fix the model, re-run the backtest including this case, and report the updated bound and the fix in writing.", score: 1, feedback: "Treats the miss as engineering evidence, shows the process works and improves the model." },
        { text: "Stop gated mode and finish the pilot in shadow mode without comment.", score: 0.4, feedback: "Safe, but without an explanation the decision meeting will focus on the unexplained miss." },
      ],
      explanation: md`A miss caught by the safety net is the system working. Explaining and fixing it builds more trust than a clean record.`,
      concepts: ["aw12.backtest-shadow-gated", "aw12.miss-rate-bound"],
      difficulty: 2,
    },
    {
      id: "aw12-l03-q6",
      type: "mcq",
      prompt: "What does a scale-up conversion clause add to a standard conversion clause?",
      options: [
        "Nothing",
        "It fixes the price, rig count and start date for expanding from the pilot rigs to the programme or lab, so expansion does not need a new negotiation",
        "It makes the pilot free",
        "It removes the decision meeting",
      ],
      answer: 1,
      explanation: md`Test infrastructure pilots run on 1 or 2 rigs; the value is in the programme. Price the expansion while you still have leverage.`,
      concepts: ["aw12.scale-up-clause"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "aw12-l03-f1", front: "Rule of three", back: md`Zero misses in $n$ events: 95 % upper bound on the miss rate $\approx 3/n$ (60 events for 5 %, 100 for 3 %).`, concepts: ["aw12.miss-rate-bound"] },
    { id: "aw12-l03-f2", front: "Three phases of a Ripple pilot", back: "Backtest on history; shadow on live changes with the full suite still running; gated with approval and a periodic full run.", concepts: ["aw12.backtest-shadow-gated"] },
    { id: "aw12-l03-f3", front: "Why the backtest carries the statistics", back: "A 10-week shadow phase sees only a handful of failing tests; 12 to 24 months of history gives enough events for a bound.", concepts: ["aw12.miss-rate-bound"] },
    { id: "aw12-l03-f4", front: "Pilot rig criteria", back: "Frequent changes, long digital history, champion owns it, off the critical path, representative of the rigs you scale to.", concepts: ["aw12.pilot-scope"] },
    { id: "aw12-l03-f5", front: "Lockstep pilot metrics", back: "Capture completeness on an audit sample; DAQ-to-HMI sync accuracy against a sync pulse; time to root cause.", concepts: ["aw12.pilot-scope"] },
    { id: "aw12-l03-f6", front: "Scale-up clause", back: "On success: programme or lab coverage, price per rig or programme, start date, fee credit window, fixed in the pilot agreement.", concepts: ["aw12.scale-up-clause"] },
  ],
};

export default lesson;
