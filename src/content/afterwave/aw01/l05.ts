import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw01-l05",
  title: "Failure analysis and root cause",
  summary:
    "How hardware teams go from 'it failed' to a verified fix: physical failure analysis, the 8D discipline, fishbone and 5-whys, fault trees with gate probabilities, physics-of-failure reasoning, and why test data with full context is what makes root cause analysis fast instead of a month of arguments.",
  minutes: 75,
  objectives: [
    "Run the 8D sequence and distinguish containment, occurrence root cause, escape root cause and systemic prevention",
    "Use a fishbone, an is/is-not table and 5-whys on a test-lab failure, and know their limits",
    "Compute a top-event probability from a small fault tree with AND and OR gates",
    "Explain physics-of-failure reasoning and link it to the acceleration models of Lesson 3",
    "Use test data (populations, configuration history, rates) to confirm or reject a root-cause hypothesis",
  ],
  concepts: [
    { id: "aw01.8d", name: "8D problem solving", description: "Eight-discipline method: team, problem description, containment, root cause (occurrence and escape), corrective action, implementation and validation, prevention, recognition.", competency: "aw-test" },
    { id: "aw01.fishbone-5whys", name: "Fishbone and 5-whys", description: "Ishikawa diagram to list candidate causes by category (people, machine, method, material, measurement, environment) and repeated why-questions to follow one causal chain to a systemic cause.", competency: "aw-test", related: ["m12.rca-tools", "aw01.8d"] },
    { id: "aw01.fault-tree", name: "Fault tree analysis", description: "Top-down logic diagram from an undesired top event through AND and OR gates to basic events; gives minimal cut sets and top-event probability.", competency: "aw-test", related: ["m12.fault-tree"] },
    { id: "aw01.physics-of-failure", name: "Physics of failure", description: "Explaining a failure by its mechanism (load, stress, damage accumulation, failure) and a mechanism model, rather than by statistics alone.", competency: "aw-test", related: ["aw01.arrhenius", "aw01.coffin-manson"] },
    { id: "aw01.rca-data", name: "Data in root cause analysis", description: "Using populations, configuration history, timing and rates to separate causes: what is different between failing and passing units, and when did it change.", competency: "aw-test", related: ["aw01.8d"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "From failure to verified root cause",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Root cause analysis is where test labs lose the most engineer time per incident, and where bench memory pays off most visibly. When a drive unit trips on the dyno at 2 a.m., the first questions are always: what was different about this unit, this run, this rig, this firmware? If the answers live in five tools on five clocks, an 8D takes weeks. If they live in one aligned record, the D4 hypothesis can be tested in an afternoon. That difference is a story you will tell in every sales call, so learn the method behind it.`,
        },
        {
          kind: "md",
          md: md`### Failure analysis and root cause analysis are different jobs

- **Failure analysis (FA)** is the physical investigation of the failed part: visual and optical inspection, X-ray and CT, scanning acoustic microscopy (delamination), electrical characterisation, then destructive steps: decapsulation, cross-sectioning, scanning electron microscopy with EDX (elemental analysis). FA answers **what physically failed and by which mechanism** (a cracked solder layer, a lifted wire bond, a pitted bearing race).
- **Root cause analysis (RCA)** asks **why** that mechanism occurred and why it was not caught, and fixes it in the design, the process or the system. A lifted wire bond is the mechanism; the root cause might be a bonding parameter drift at a supplier, a thermal cycle the design did not anticipate, or a firmware change that raised junction temperature swings.

### The 8D discipline

The 8D method (from automotive quality practice; AIAG's CQI-20 guideline describes effective problem solving in the same spirit) forces the order of work:`,
        },
        {
          kind: "flow",
          title: "8D: eight disciplines",
          steps: [
            { label: "D0 Prepare", detail: "Emergency response, is an 8D warranted" },
            { label: "D1 Team", detail: "Cross-functional: test, design, quality, reliability, supplier" },
            { label: "D2 Describe the problem", detail: "What, where, when, how many; is / is-not; quantified" },
            { label: "D3 Contain", detail: "Protect customers and programmes now: quarantine units, stop the rig, add a check" },
            { label: "D4 Root cause", detail: "Occurrence cause and escape (why not detected); verified by turning it on and off" },
            { label: "D5 Choose and verify corrective actions", detail: "Show the fix removes the cause without new problems" },
            { label: "D6 Implement and validate", detail: "Roll out, remove containment, confirm with data" },
            { label: "D7 Prevent recurrence", detail: "Systemic: update FMEA, standards, test plans, design rules" },
            { label: "D8 Recognise the team", detail: "Close and capture lessons" },
          ],
          caption: "D3 before D4: protect first, then understand. D4 has two halves: why it happened, and why the test or process let it escape.",
        },
        {
          kind: "md",
          md: md`### D2: describe before you explain

The **is / is-not** table is the most underrated tool in RCA. For each dimension, write where the problem **is** and where it could be but **is not**:

| Dimension | Is | Is not | Distinction to explain |
|---|---|---|---|
| What | Overtemperature trip on drive units | Other fault codes | Thermal path or thermal measurement |
| Where | Dyno 2 and dyno 3 | Dyno 1 | What differs between rigs? |
| When | Since 14 October, hours 30 to 60 of the cycle | Before 14 October | What changed on 14 October? |
| How many | 5 trips on 3 of 8 units | The other 5 units | What do the 3 units share? |

Each distinction becomes a hypothesis. The table can only be filled if you can query history by rig, date, unit and configuration: this is RCA's dependency on data.

### Fishbone and 5-whys

An **Ishikawa (fishbone)** diagram lists candidate causes by category so nobody fixates on the first idea. In a test lab the classic 6M categories read:

- **People**: operator steps, shift handover.
- **Machine**: the rig itself: dyno controller, coolant conditioning unit, fixture.
- **Method**: procedure, test sequence, firmware under test, settings.
- **Material**: DUT build, supplier lot, coolant mixture.
- **Measurement**: sensor placement, calibration, sampling, timestamps.
- **Environment**: cell temperature, humidity, mains quality.

Note how many of these are **the rig, not the DUT**. A large fraction of failures on new rigs are test-system failures; RCA must rule them out early.

**5-whys** follows one chain: the unit tripped (why?) because the winding sensor read 182 °C (why?) because the actual winding was hot (why?) because derating started late (why?) because the derating threshold moved in firmware 4.2 (why?) because a calibration change was merged without a thermal test in the change checklist. The fifth answer is systemic: it explains the escape. Limits: one chain only, easy to stop at a person ("operator error" is never a root cause), and it needs evidence at each step.

### Fault tree analysis

A fault tree (IEC 61025) works top-down from an undesired **top event** through logic gates to **basic events**. For independent basic events:`,
        },
        { kind: "equation", formula: "aw01-ft-or" },
        { kind: "equation", formula: "aw01-ft-and" },
        {
          kind: "md",
          md: md`A **minimal cut set** is a smallest set of basic events that together cause the top event. Single-event cut sets are single points of failure. FTA is the top-down complement of **FMEA** (IEC 60812), which works bottom-up from each component's failure modes to their effects.

### Physics of failure

Physics of failure (PoF) explains a failure through its mechanism: **load** (temperature swing, current, vibration) produces **stress** (thermo-mechanical strain, current density) that **accumulates damage** (crack growth, diffusion, wear) until **failure**. Each mechanism has a model: Arrhenius for thermally activated chemistry, Coffin-Manson for thermal fatigue (Lesson 3), Black's equation for electromigration, Paris' law for crack growth. PoF is what makes an accelerated test valid and what turns "3 units failed" into "the junction temperature swing rose from 60 K to 70 K, which by Coffin-Manson with n = 2.5 cuts solder life by about a third ($(60/70)^{2.5} = 0.68$)".

### The role of data

Every serious RCA ends up comparing **populations**: failing versus passing units, before versus after a change, rig A versus rig B. Three patterns recur:

1. **Change-point**: failures start at a time; what changed then (firmware, supplier lot, rig maintenance, procedure revision)?
2. **Segregation**: failures cluster in a subset; what attribute do they share?
3. **Rate comparison**: is the difference in failure rates larger than chance? For rare events, Poisson reasoning answers that quickly.

Without aligned, queryable history (configuration, timing and signals together), each of these takes days of manual file archaeology.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "An overtemperature trip after a firmware change",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Testing the firmware hypothesis with rates",
          given: md`Illustrative endurance programme on 8 drive units. Firmware 4.1 ran 600 unit-hours on the cycle with 0 overtemperature trips. Firmware 4.2 (introduced 14 October) has run 400 unit-hours with 5 trips, on 3 of the units.`,
          steps: [
            { md: md`**Rates:** 4.1: $0/600$; 4.2: $5/400 = 0.0125$ trips per unit-hour (one per 80 h).` },
            { md: md`**Hypothesis test:** if firmware made no difference, the 4.1 period should have seen trips at the 4.2 rate. Expected count $= 0.0125 \times 600 = 7.5$.` },
            { md: md`**Poisson probability of zero:** $P(0) = e^{-7.5} = 0.00055$. Seeing no trips in 600 h under the 4.2 rate would be a 1 in 1,800 event: the rate really changed around the firmware change.` },
            { md: md`**But correlation in time is not yet cause:** what else changed around 14 October? The is / is-not table showed trips on dynos 2 and 3 but not dyno 1. Data check: dyno 1 ran only 4.1 until 20 October, then 4.2 for 60 h with no trips (expected $0.0125 \times 60 = 0.75$, $P(0) = e^{-0.75} = 0.47$, so not informative).` },
            { md: md`**Turn it on and off:** rerun one tripping unit on dyno 2 with 4.1 for 120 h (expected trips under 4.2 rate 1.5): zero trips. Back to 4.2: trip at hour 41. Signal review of the aligned data shows derating starting 9 K later in 4.2: the calibration change in the thermal model.` },
          ],
          result: md`Occurrence root cause: the 4.2 thermal model calibration delays derating by about 9 K. Escape root cause: the firmware release checklist did not require the thermal derating test for calibration-only changes. Verified by switching the cause on and off. The analysis used only data the lab already had, provided it could be queried by firmware version, unit, rig and time.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A small fault tree for the same top event",
          given: md`Top event: drive unit trips on overtemperature during a 100 h endurance block. Illustrative probabilities per block, independent: coolant pump failure 0.002 (basic event A), winding sensor fault 0.001 (B), and the AND of derating disabled by a firmware defect 0.05 (C) with ambient above 35 °C in the cell 0.2 (D). Top = A OR B OR (C AND D).`,
          steps: [
            { md: md`AND gate: $P(C \cap D) = 0.05 \times 0.2$.` },
            { md: md`$P(C \cap D) =$ **0.01**.`, hidden: true, check: { prompt: "Probability of the AND gate", answer: 0.01, tolerance: { abs: 0.0001 } } },
            { md: md`OR gate: $P(\text{top}) = 1 - (1 - 0.002)(1 - 0.001)(1 - 0.01)$.` },
            { md: md`$P(\text{top}) =$ **0.0130** (rare-event approximation: $0.002 + 0.001 + 0.01 = 0.013$).`, hidden: true, check: { prompt: "Top event probability per block", answer: 0.013, tolerance: { abs: 0.0002 } } },
            { md: md`Minimal cut sets: {A}, {B}, {C, D}. The firmware branch contributes $0.01/0.013 = 77\%$ of the risk, and it needs a hot cell to show up: test plans that only run at cool cell temperatures will let it escape.` },
          ],
          result: md`Top event about 1.3 % per block, dominated by the firmware-plus-hot-ambient cut set. Fault trees tell you which conditions a retest must include to catch a cause.`,
        },
        {
          kind: "question",
          question: {
            id: "aw01-l05-p1",
            type: "numeric",
            prompt: md`A rig fault (coolant flow loss) has occurred 4 times in 2,000 rig-hours on rig A. Rig B has run 1,000 hours without one. If rig B had rig A's rate, what is the probability of seeing zero events on rig B? (3 decimals)`,
            answer: 0.135,
            tolerance: { abs: 0.002 },
            explanation: md`Rate $= 4/2{,}000 = 0.002$ per hour; expected on B $= 2$; $P(0) = e^{-2} = 0.135$. A 13.5 % chance: the absence on rig B is weak evidence that B is different. Rare events need exposure before conclusions.`,
            concepts: ["aw01.rca-data"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "How RCA really runs, and where it stalls",
      blocks: [
        {
          kind: "md",
          md: md`### Who does what

- **Quality engineers** usually own the 8D and its deadlines (customer-facing 8Ds in automotive often have containment due within 24 to 48 hours).
- **Test engineers** reconstruct what happened on the rig; **test systems engineers** pull data from loggers and align it; **design engineers** form mechanism hypotheses; the **FA lab** (in-house or external) does the physical analysis; **reliability engineers** judge whether the mechanism affects life predictions.
- **Documents**: the 8D report, FA report, updated DFMEA or PFMEA, test-plan changes, lessons-learned entries.

### Where the time goes

In most labs the slow part is not thinking; it is **assembling the evidence**: finding the DAQ file, the CAN log, the power analyser export and the operator notes for the right unit and run, aligning their clocks, and finding out which firmware and fixture were actually installed. That is the step bench memory removes.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How RCA goes wrong",
          md: md`- **Stopping at a person**: "operator error" is a symptom of a method or interface that allowed the error.
- **No escape analysis**: fixing why it happened but not why the test missed it, so the next defect of the same kind escapes too.
- **Confirmation by story**: a plausible mechanism accepted without switching the cause on and off.
- **Ignoring the rig**: hours spent on the DUT before someone checks the coolant conditioning unit or a loose sensor.
- **Containment forgotten**: suspect units keep running in other tests while the root cause is debated.`,
        },
        { kind: "sources", refs: ["aw01-r15", "aw01-r16", "aw01-r17"] },
        {
          kind: "checklist",
          title: "Evidence an RCA needs within the first day",
          items: [
            "Exact configuration of the failing unit at the time of failure: hardware build, firmware, calibration, fixture revision",
            "Aligned signals around the event from all loggers, plus operator actions",
            "The same signals from passing units or earlier runs under the same conditions",
            "Change history: firmware, rig maintenance, procedures, supplier lots, around the first occurrence",
            "Is / is-not table filled with numbers",
            "Rig health check results (sensors, coolant, controller logs) to rule the test system in or out",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask about a lab's last hard RCA",
          items: [
            "How long from the first failure to a verified root cause, and how much of that was collecting and aligning data?",
            "Was the first suspected cause the real one?",
            "Did the 8D include an escape analysis, and did the test plan change as a result?",
            "How often does an investigation end with the rig, not the DUT, as the cause?",
          ],
        },
        { kind: "scenario", scenario: "aw01-s1" },
        {
          kind: "xref",
          to: "m12-l02",
          note: "Track 0 applies the same RCA tools (fishbone, 5-whys, fault trees) to PV plant underperformance; compare how signature-based diagnosis works on operational data.",
        },
        {
          kind: "question",
          question: {
            id: "aw01-l05-p2",
            type: "short",
            prompt: md`Write the **D2 (problem description) and D4 (root cause) sections** of an 8D for the illustrative overtemperature trips in this lesson's worked example. D2 must contain a quantified is / is-not table. D4 must state the occurrence and escape root causes, the evidence that verifies each (including the on/off test), and the data Afterwave's bench memory would have had to provide for this to be done in one day.`,
            rubric: [
              "D2 is quantified (counts, unit-hours, dates, rigs, units) and uses is / is-not for what, where, when and how many",
              "D4 separates occurrence root cause (calibration delays derating) from escape root cause (release checklist gap)",
              "Verification includes the rate comparison and the on/off switch of the cause, with numbers",
              "Rules out the rig and other changes explicitly (dyno 1, coolant, sensors)",
              "Names the specific data needed: per-unit firmware history, aligned temperature and derating signals, rig change logs, queryable by unit, rig and time",
              "Avoids blaming a person",
            ],
            modelAnswer: md`**D2.** Drive units on the endurance cycle trip on winding overtemperature (fault code OT-W). Since 14 October: 5 trips in 400 unit-hours on firmware 4.2, on 3 of 8 units (SN 03, 05, 07), between cycle hours 30 and 60, on dynos 2 and 3. Before 14 October: 0 trips in 600 unit-hours on firmware 4.1.

| | Is | Is not |
|---|---|---|
| What | OT-W trips | Other fault codes |
| Where | Dynos 2 and 3 | Dyno 1 (60 h on 4.2 only, not informative) |
| When | After 14 October (4.2), cycle hours 30 to 60 | Before 14 October (4.1) |
| How many | 5 trips, 3 units | 5 units without trips (fewer hours at high load) |

**D4 occurrence:** firmware 4.2 changed the thermal model calibration, delaying derating by about 9 K, so windings exceed the trip limit during the hot part of the cycle. **Evidence:** rate 0.0125 per unit-hour on 4.2 vs 0 in 600 h on 4.1 (P = 0.00055 if no change); unit SN 05 back on 4.1 for 120 h, no trips (1.5 expected); returned to 4.2, trip at hour 41; aligned signals show derating onset 9 K later. Coolant flow and temperature, sensor calibration and dyno controller logs checked normal on all rigs.

**D4 escape:** the firmware release checklist exempts calibration-only changes from the thermal derating test, so no test exercised the derating threshold before the endurance programme.

**Data needed in one day:** per-unit firmware version history with timestamps; winding temperature, derating flag and torque command on one timebase for every run; rig change and maintenance logs; all queryable by unit, rig, firmware and date. With that, D2 and the rate check are queries, not archaeology.`,
            explanation: md`A strong 8D quantifies before explaining, separates occurrence and escape, verifies by switching the cause, rules out the rig, and is honest that speed depends on queryable, aligned data.`,
            concepts: ["aw01.8d", "aw01.rca-data", "aw01.fishbone-5whys"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a new sales hire why 'operator error' is never an acceptable root cause in an 8D, and what the escape root cause is.",
          keyPoints: [
            "Root cause must be something the organisation can change: a method, design, interface or process",
            "Operator error is a symptom of a method or interface that allowed the error",
            "The escape root cause explains why tests or checks did not catch the problem",
            "Both are needed; fixing only the occurrence lets the next similar defect escape",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw01-l05-q1",
      type: "order",
      prompt: "Put these 8D disciplines in order.",
      items: ["Form the team", "Describe the problem (is / is-not)", "Contain", "Find occurrence and escape root causes", "Choose and verify corrective actions", "Prevent recurrence systemically"],
      explanation: md`D1 team, D2 describe, D3 contain, D4 root cause, D5 corrective actions, D7 prevention (D6 implement sits between). Containment comes before root cause: protect first.`,
      concepts: ["aw01.8d"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw01-l05-q2",
      type: "numeric",
      prompt: md`Fault tree: top = A OR (B AND C), with $P(A) = 0.01$, $P(B) = 0.1$, $P(C) = 0.05$, independent. Top-event probability? (4 decimals)`,
      answer: 0.0149,
      tolerance: { abs: 0.0001 },
      explanation: md`$P(B \cap C) = 0.005$; $P(\text{top}) = 1 - (0.99)(0.995) = 1 - 0.98505 = 0.01495$. Minimal cut sets {A} and {B, C}.`,
      concepts: ["aw01.fault-tree"],
      difficulty: 2,
    },
    {
      id: "aw01-l05-q3",
      type: "mcq",
      prompt: "Failure analysis finds a lifted wire bond in a power module. That finding is:",
      options: ["The root cause", "The failure mechanism; the root cause is why it happened and why it escaped", "The containment action", "The escape root cause"],
      answer: 1,
      explanation: md`FA identifies the physical mechanism. RCA asks what in design, process or use drove it (for example larger thermal swings from a firmware change) and why testing did not catch it.`,
      concepts: ["aw01.physics-of-failure", "aw01.8d"],
      difficulty: 1,
    },
    {
      id: "aw01-l05-q4",
      type: "multi",
      prompt: "Which fishbone categories point at the test system rather than the DUT? (Select all that apply.)",
      options: ["Machine (dyno controller, coolant unit, fixture)", "Measurement (sensor placement, calibration, timestamps)", "Material (DUT supplier lot)", "Method (test procedure)"],
      answer: [0, 1, 3],
      explanation: md`Machine, measurement and the test method are all properties of the rig and the procedure. Material refers to the DUT build. Ruling out the test system early saves days.`,
      concepts: ["aw01.fishbone-5whys"],
      difficulty: 2,
    },
    {
      id: "aw01-l05-q5",
      type: "mcq",
      prompt: "What is the strongest verification of a root-cause hypothesis?",
      options: [
        "A senior engineer agrees with it",
        "It explains the failure plausibly",
        "Switching the suspected cause on and off makes the failure appear and disappear",
        "It appears in the FMEA",
      ],
      answer: 2,
      explanation: md`On/off control is the experimental test of causation. Plausibility and agreement are where many wrong root causes come from.`,
      concepts: ["aw01.8d", "aw01.rca-data"],
      difficulty: 1,
    },
    {
      id: "aw01-l05-q6",
      type: "numeric",
      prompt: md`After a change, 3 failures occurred in 300 unit-hours. Before it, 900 unit-hours had 0 failures. If the post-change rate had applied before, how many failures would have been expected in the earlier period?`,
      answer: 9,
      tolerance: { abs: 0.01 },
      unit: "failures",
      explanation: md`Rate $= 3/300 = 0.01$ per hour; $0.01 \times 900 = 9$ expected; $P(0) = e^{-9} = 0.00012$. Strong evidence the change matters, pending on/off confirmation.`,
      concepts: ["aw01.rca-data"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "aw01-l05-f1", front: "8D: D3 vs D4", back: "D3 contains the problem now; D4 finds the occurrence and escape root causes.", concepts: ["aw01.8d"] },
    { id: "aw01-l05-f2", front: "Escape root cause", back: "Why the test, inspection or process did not detect the problem.", concepts: ["aw01.8d"] },
    { id: "aw01-l05-f3", front: "Is / is-not", back: "For what, where, when and how many: where the problem is and where it could be but is not. Each distinction is a hypothesis.", concepts: ["aw01.rca-data"] },
    { id: "aw01-l05-f4", front: "Fault tree OR and AND (independent)", back: md`OR: $1 - \prod(1 - p_i)$; AND: $\prod p_i$`, concepts: ["aw01.fault-tree"] },
    { id: "aw01-l05-f5", front: "Minimal cut set", back: "Smallest set of basic events that together cause the top event; size-one sets are single points of failure.", concepts: ["aw01.fault-tree"] },
    { id: "aw01-l05-f6", front: "Physics of failure chain", back: "Load, stress, damage accumulation, failure, with a mechanism model.", concepts: ["aw01.physics-of-failure"] },
    { id: "aw01-l05-f7", front: "FA vs RCA", back: "FA: what physically failed and how. RCA: why, and why it escaped.", concepts: ["aw01.physics-of-failure"] },
  ],
  scenarios: [
    {
      id: "aw01-s1",
      title: "The 2 a.m. trip in a pilot lab",
      dayInLife: true,
      context: md`Illustrative: Afterwave is running a pilot with Lockstep on two of a prospect's six dynos. At 2 a.m. a drive unit on dyno 4 (not instrumented by Lockstep) trips during a customer-programme durability run. The validation lead messages you at 8 a.m.: "Can your system tell us what happened?"`,
      start: "a",
      concepts: ["aw01.8d", "aw01.rca-data"],
      nodes: {
        a: {
          md: md`What do you reply first?`,
          choices: [
            { text: "\"Yes, send us the files and we'll find the root cause.\"", score: 2, feedback: "Overpromises: dyno 4 has no Lockstep, so you have no aligned record, and you are not the owner of their 8D.", next: "b" },
            { text: "\"Dyno 4 isn't on Lockstep, so we can't see it directly. We can help: if you share the raw logs we'll align them and compare against similar runs on dynos 1 and 2, and we'll flag what we can and cannot conclude.\"", score: 9, feedback: "Honest about scope, still useful, and shows the value of capture by contrast.", next: "c" },
            { text: "Say nothing until the pilot review.", score: 0, feedback: "A live incident is the best moment to show value or at least care.", next: "b" },
          ],
        },
        b: {
          md: md`Two days later the lab is still assembling files from three loggers. The validation lead says their 8D D2 is late.`,
          choices: [
            { text: "Offer to run the alignment and an is / is-not comparison now, with clear caveats on clock accuracy for the uninstrumented rig.", score: 6, feedback: "Recovers, but you lost the chance to set expectations early.", next: "c" },
          ],
        },
        c: {
          md: md`Aligning the dyno 4 logs takes your team half a day because their clocks drift apart by about 1.8 s over the run. The comparison shows the trip followed a coolant flow drop that also appears, smaller, on dyno 2's Lockstep record two days earlier. What do you do with this?`,
          choices: [
            { text: "Share the finding as a hypothesis with evidence (both records, aligned), recommend a rig health check on both dynos' coolant loops as D3 containment, and let the lab own the conclusion.", score: 10, feedback: "Right role: you provide evidence, they own the 8D. It also shows bench memory found an early warning on an instrumented rig.", next: "d" },
            { text: "Announce in the pilot channel that Lockstep found the root cause.", score: 3, feedback: "Unverified and not your call. One wrong claim costs more credibility than the pilot can earn back." },
          ],
        },
        d: {
          md: md`The check finds a partly blocked coolant filter shared by dynos 2 and 4. The lab manager asks what it would take to have every rig on Lockstep.`,
          choices: [
            { text: "Quantify with them: time spent on this RCA, the half-day of alignment, the early warning that was visible on dyno 2. Then propose a scoped expansion with success criteria.", score: 10, feedback: "Turns an incident into a measured value case, built on their own numbers." },
            { text: "Send the standard price list.", score: 4, feedback: "Misses the moment to anchor value on evidence they just experienced." },
          ],
        },
      },
    },
  ],
};

export default lesson;
