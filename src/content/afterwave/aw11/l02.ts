import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw11-l02",
  title: "Essential health and safety requirements for AI, software and connected machines",
  summary:
    "The essential health and safety requirements (EHSRs) in Annex III are what a machine must achieve; standards and tests are how you show it. This lesson goes through the requirements that are new or sharpened for AI and software: lifecycle risk assessment including self-evolving behaviour, ergonomics and human-machine interaction for autonomous machines, protection against corruption, and safety and reliability of control systems with tracing logs and decision records. It turns each into the test evidence a bench must produce, with the statistics and data volumes involved.",
  minutes: 75,
  objectives: [
    "Explain how EHSRs, the risk assessment and the three-step method fit together",
    "Describe the AI-relevant EHSRs (1.1.2, 1.1.6, 1.1.9, 1.2.1 and autonomous mobile machinery) and the evidence each needs",
    "Explain why ML-based safety functions are hard to verify and size a failure-free test campaign with the zero-failure bound",
    "Size the storage for the tracing and decision logs of a fleet",
    "Turn an EHSR into a concrete test and evidence plan for a prospect",
  ],
  concepts: [
    { id: "aw11.ehsr", name: "Essential health and safety requirements (EHSRs)", description: "The mandatory safety objectives in Annex III of Regulation 2023/1230; they state what must be achieved, while harmonised standards and tests show how.", competency: "aw-safety", related: ["aw11.self-evolving", "aw11.corruption-protection"] },
    { id: "aw11.self-evolving", name: "Self-evolving behaviour and ML safety functions", description: "Machinery or safety components whose behaviour is fully or partially shaped by machine learning; the Regulation requires bounded actions, lifecycle risk assessment, correction by the operator and decision records.", competency: "aw-safety", related: ["aw11.ehsr", "aw11.hmi-autonomy"] },
    { id: "aw11.corruption-protection", name: "Protection against corruption and tracing logs", description: "EHSR 1.1.9 and 1.2.1 duties: connected devices must not create hazards, safety-critical software and data must be protected and identifiable, interventions must leave evidence, and safety software versions and interventions must be logged.", competency: "aw-safety", related: ["aw11.ehsr"] },
    { id: "aw11.hmi-autonomy", name: "Human-machine interaction for autonomous machines", description: "EHSR 1.1.6 ergonomics extended to psychological stress and to machines that must respond appropriately to people and communicate their planned actions; autonomous mobile machinery needs a supervisory function.", competency: "aw-safety", related: ["aw11.self-evolving"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What the machine must achieve, and how you show it",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Every EHSR ends up as a row in a compliance engineer's checklist with a column called "evidence". For the new AI and software requirements that column is often empty today, because nobody has had to produce decision logs, update-envelope verification or protection-against-corruption tests for a machine before. Those empty cells are Afterwave's market. You need to read the requirement, see which test produces the evidence, and estimate what it costs, so that Ismail and Yusuf can design the capture and you can price it.`,
        },
        {
          kind: "md",
          md: md`### How EHSRs work

Annex III lists the **essential health and safety requirements**. They are **objectives** ("the control system shall be designed so that a fault does not lead to a hazardous situation"), not designs. The manufacturer must:

1. Carry out a **risk assessment**: define the machine's limits (use, space, time), identify hazards across the lifecycle, estimate and evaluate each risk.
2. Reduce risk with the **three-step method** of ISO 12100: inherently safe design first, then safeguarding and complementary protective measures, then information for use (warnings, instructions, training).
3. Show, for every applicable EHSR, how it is met: by applying a **harmonised standard** (presumption of conformity, lesson 3), or by other technical solutions with their own justification and test evidence.

Part 1 of Annex III applies to all machinery; later parts add requirements for particular hazards and types (for example mobility in Part 3 and lifting in Parts 4 and 6).

### The requirements that matter for AI and software

| EHSR | What it requires (paraphrased) | Evidence a test team produces |
|---|---|---|
| **1.1.2 Principles of safety integration** | Risk assessment covers the whole lifecycle, including risks foreseeable at placing on the market from the **intended evolution of self-evolving behaviour** and from varying levels of autonomy | Defined operating domain and update envelope; regression evidence that each release stays inside it |
| **1.1.6 Ergonomics** | Account for operator characteristics and **psychological stress**; machines with self-evolving or autonomous behaviour must **respond to people appropriately** and **communicate planned actions** (what and why) comprehensibly | HRI tests: intent signalling, response to gestures or speech where used, user studies, stop and recovery behaviour |
| **1.1.9 Protection against corruption** | Connecting another device, directly or remotely, must not create a hazardous situation; hardware and software critical for compliance protected against accidental or intentional corruption; the machine **collects evidence of legitimate or illegitimate interventions**; installed safety-relevant software is **identified** and its version readable | Interface fuzzing and misuse tests, tamper-evidence tests, software bill and version readout checks, integrity verification at boot |
| **1.2.1 Safety and reliability of control systems** | Withstand operating stresses and external influences **including malicious attempts**; a fault in hardware or **software logic** or a foreseeable human error must not lead to a hazardous situation; **tracing log** of interventions and safety software versions uploaded after placing on the market; for self-evolving systems, no actions **beyond the defined task and movement space**, the operator can **correct** the machine, and **data on safety-related decisions** are recorded | Fault-injection tests, version and intervention logs with integrity, boundary tests of task and movement space, decision-log completeness checks |
| **1.3.7 Moving parts** and Part 3 mobility | Prevent contact risks, including for **autonomous mobile machinery**, which needs a **supervisory function** able to stop and restart it remotely and to monitor its movement area | Stop-distance and protective-field tests, supervisor command latency, behaviour on communication loss |

### Why ML safety functions are hard to verify

A classical safety function (a light curtain, a speed monitor) has a specification you can test exhaustively at its boundaries. An ML function (a person detector, a learned controller) has three properties that break this:

- **No complete specification:** "detect a person" cannot be written as a finite set of rules; the specification is the training and test data plus the **operating domain** (lighting, clothing, postures, occlusion, distances).
- **Statistical behaviour:** performance is a rate, not a pass or fail. It must be estimated with confidence over representative cases.
- **Change with every retrain:** two models with the same accuracy can fail on different cases, so every update can move the failure set.

For the statistics, a failure-free test campaign gives an upper bound on the failure probability per demand:`,
        },
        { kind: "equation", formula: "aw11-zero-failure-bound" },
        {
          kind: "md",
          md: md`At 95 % confidence, $p_U \approx 3/n$. To support a miss probability of at most $10^{-4}$ per demand you need about **30,000 independent, representative, failure-free trials**; one failure pushes the requirement higher. Physical trials at that scale are expensive, so manufacturers combine simulation, recorded field data replay and targeted physical bench tests, and must argue that the mix is representative. That argument, and the traceability from each trial to the operating domain, is evidence that lives in bench memory.

The PL and SIL analysis (ISO 13849-1, IEC 61508) still applies to the safety function as a whole; ISO/IEC TR 5469:2024 gives informative guidance on using AI inside it. Neither is a harmonised standard for ML safety functions under the Regulation (lesson 3). The functional-safety module of this track covers PL, SIL and safety cases in depth.

### Logs are data, and data has a size

The 1.2.1 logging duties are an engineering requirement on the machine and a storage requirement on the manufacturer. Size it:`,
        },
        { kind: "equation", formula: "aw11-log-volume" },
        {
          kind: "callout",
          tone: "unverified",
          title: "Exact Annex III wording and retention periods",
          md: md`The paraphrases above come from secondary summaries (UL, Baker McKenzie, EP summary) and memory; the research brief marks the Annex III wording as unverified. In particular, the retention periods commonly cited (tracing log of interventions and safety software versions enabled for **five years** after upload, and data on safety-related decisions of self-evolving systems kept for **one year**, both only to demonstrate conformity on a reasoned request from a national authority) must be checked in the Official Journal text before they appear in any customer material. Industry also asked in January 2026 to postpone 1.1.9 and 1.2.1(f) to align with the Cyber Resilience Act; no decision granting it was found.`,
        },
        { kind: "widget", widget: "risk-matrix", caption: "Place the hazards of an AI-enabled machine (missed person detection, unexpected start after an update, corrupted configuration over the network, robot leaving its movement space) and see which ones need risk reduction first. This is the starting point of every EHSR row." },
        { kind: "sources", refs: ["aw11-r1", "aw11-r20", "aw11-r16", "aw11-r17", "aw11-r19", "aw11-r12"] },
      ],
    },
    {
      layer: "applied",
      title: "Sizing the evidence: logs and trials",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Decision-log storage and a person-detection test campaign (illustrative humanoid fleet)",
          given: md`Illustrative: a humanoid maker plans a first EU fleet of 50 robots. Its ML person detector makes safety-relevant decisions (slow, stop, continue) at 20 Hz. Each decision record holds a compact summary of inputs, the output, confidence, timestamps and model and firmware versions: 1.5 kB. Each robot operates 3,000 hours a year. Retention for decision data: 1 year (to be confirmed in the primary text). The safety requirement allocated to the detector: miss probability at most $10^{-4}$ per demand, at 95 % confidence.`,
          steps: [
            { md: md`**Operating seconds:** $t_{op} = 3{,}000 \times 3{,}600 = 1.08 \times 10^{7}$ s/yr.` },
            { md: md`**Volume per robot:** $V = 20 \times 1{,}500 \times 1.08 \times 10^{7} = 3.24 \times 10^{11}$ B $= 324$ GB per year. With a 1-year retention the rolling store is also about 324 GB.` },
            { md: md`**Fleet:** $50 \times 324 = 16{,}200$ GB $\approx 16.2$ TB of rolling storage, plus integrity protection (hashing, write-once storage) so the log is credible evidence. The tracing log of software versions is tiny by comparison (tens of entries a year), but must survive five years.` },
            { md: md`**Trials for the detector:** $n = \ln 0.05 / \ln(1 - 10^{-4}) \approx 29{,}956$, about 30,000 independent failure-free demands. At an illustrative 120 physical approach trials per rig-shift, that is 250 shifts if done only on the bench; hence the usual mix of replayed field recordings, simulation and a smaller targeted physical set, with an argument for representativeness.` },
            { md: md`**What must be traceable:** each trial linked to its operating-domain cell (lighting, posture, occlusion, distance), the model version, the rig configuration and the result. Without that link, the 30,000 trials prove nothing about the next model.` },
          ],
          result: md`About 324 GB per robot per year and 16 TB for the fleet for decision logs, and on the order of 30,000 representative trials per model version for a $10^{-4}$ claim. Both are data problems with a strict synchronisation and traceability requirement: exactly what Lockstep (one clock for rig signals and actions) and bench memory are designed for.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: an autonomous mobile robot fleet",
          given: md`Illustrative: an AMR maker logs safety decisions at 10 Hz, 4 kB per record, 2,000 operating hours a year per robot, fleet of 120. The allocated miss probability for its obstacle and person classifier is $10^{-3}$ per demand at 95 % confidence.`,
          steps: [
            { md: md`$t_{op} = 2{,}000 \times 3{,}600 = 7.2 \times 10^{6}$ s.` },
            { md: md`Volume per robot $V = 10 \times 4{,}000 \times 7.2 \times 10^{6}$ B $=$ **288 GB** per year.`, hidden: true, check: { prompt: "Log volume per robot (GB/yr)", answer: 288, unit: "GB", tolerance: { rel: 0.01 } } },
            { md: md`Fleet storage $= 120 \times 288$ GB $=$ **34.56 TB**.`, hidden: true, check: { prompt: "Fleet storage (TB)", answer: 34.56, unit: "TB", tolerance: { rel: 0.01 } } },
            { md: md`Failure-free trials $n = \ln 0.05/\ln(1 - 10^{-3}) \approx$ **2,994** (rule of three: 3,000).`, hidden: true, check: { prompt: "Failure-free trials needed", answer: 2994, unit: "trials", tolerance: { rel: 0.01 } } },
          ],
          result: md`A tenfold looser target needs a tenfold smaller campaign: the allocation of the safety requirement drives test cost linearly, which is why manufacturers argue hard about it.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Turning EHSRs into a test plan",
      blocks: [
        {
          kind: "md",
          md: md`### How it is done in practice

- The compliance engineer keeps an **EHSR checklist** (a spreadsheet or a module of a requirements tool): one row per Annex III clause, marked applicable or not, with the justification, the standard applied, the protective measure and the evidence reference.
- The **test plan** derives from that checklist: each applicable row needs at least one verification activity (test, analysis, inspection) and a report with a unique identifier that goes into the technical file.
- For ML safety functions, teams add an **operating-domain specification**, a **data and model card** for each version, a scenario catalogue with coverage targets, and a per-release regression report.
- For 1.1.9, IT security teams and product safety teams have to work together; they usually have not. Penetration tests on IT systems are not the same as tests showing that a corrupted input cannot create a hazardous movement.

### What goes wrong

- **Accuracy is reported, not safety.** "98 % mAP" says nothing about the miss rate in the operating-domain cells where people get hurt.
- **Logs exist but are not evidence.** No integrity protection, no version stamp, clocks not synchronised between the safety controller and the perception computer, so the record cannot show what the machine knew when it decided.
- **The update envelope is not written down.** Then every model update is a potential substantial modification (lesson 1).
- **Fault injection stops at hardware.** Software-logic faults and corrupted configuration files are part of 1.2.1 too.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "Product implication for Afterwave",
          md: md`Every item in the evidence column of the table above is a data object with a timestamp, a version and a link to a requirement. If Lockstep captures rig signals and operator or HMI actions on one clock, and bench memory stores them with the software, model and rig versions, then Afterwave can generate the evidence index for a release instead of an engineer assembling it by hand. Decide with Ismail which three EHSR rows the first pilot will cover end to end; do not promise all of Annex III.`,
        },
        {
          kind: "checklist",
          title: "Minimum evidence set for an ML safety function, per release",
          items: [
            "Operating-domain specification and the version of it the release was tested against",
            "Model card: training data summary, version, intended use, known limitations",
            "Scenario coverage report against the operating domain, with the confidence bound achieved",
            "Boundary tests for task and movement space, and operator correction and stop tests",
            "Fault-injection and corrupted-input results for the control path",
            "Software version log entry and integrity check of the installed safety software",
            "Signed safety-impact note: inside the foreseen update envelope or not",
          ],
        },
        { kind: "xref", to: "m06-l05", note: "Industrial cybersecurity (zones, conduits, IEC 62443 thinking) from the grid module: the same discipline underlies EHSR 1.1.9 for connected machines." },
        {
          kind: "question",
          question: {
            id: "aw11-l02-p1",
            type: "short",
            prompt: md`**Produce an EHSR-to-evidence matrix** for an illustrative collaborative robot cell that uses an ML vision model to adjust speed and separation when people approach, receives model updates quarterly and is connected to the plant network. Give at least five rows (EHSR, what it requires, the test or analysis, the evidence artefact, who produces it), then say which two rows Afterwave's first pilot should cover and why.`,
            rubric: [
              "Rows include 1.1.2 (lifecycle risk including self-evolving behaviour), 1.1.9 (corruption), 1.2.1 (control systems and logs) and at least one HRI or moving-parts requirement",
              "Each row names a concrete test or analysis, not just 'testing', and a concrete artefact (report, log, model card)",
              "Uses statistical language correctly for the ML function (rate with confidence over the operating domain, not accuracy alone)",
              "Assigns producers realistically (test team, ML team, compliance engineer, IT security)",
              "Pilot choice is justified by what Afterwave's capture and bench memory actually produce, and is limited in scope",
              "Paraphrases are marked as such; no claim that the matrix makes the cell compliant",
            ],
            modelAnswer: md`| EHSR | Requirement (paraphrase) | Test or analysis | Artefact | Producer |
|---|---|---|---|---|
| 1.1.2 | Lifecycle risk incl. foreseeable evolution of ML behaviour | Define operating domain and quarterly update envelope; regression suite per release | Risk assessment section, envelope spec, release regression report | Compliance engineer, ML team, test team |
| 1.1.6 | Respond appropriately to people, communicate planned actions | Approach tests with intent display; user study of operator understanding | HRI test report | Test team, human factors |
| 1.1.9 | Connected devices must not create hazards; protect safety software; evidence of intervention | Malformed network commands, configuration tampering, version readout | Corruption test report, software inventory | IT security with test team |
| 1.2.1 | Faults and software-logic errors safe; logs of versions and interventions; ML bounded and correctable | Fault injection on vision path (dropped frames, wrong calibration), boundary tests of speed and separation, log completeness check | Fault-injection report, log integrity report | Test team, controls engineers |
| 1.3.7 | Prevent contact injuries | Separation distance and stopping time measured across speeds and payloads | Stop-time and distance report | Test team |

**ML statistics:** the vision model's miss rate per approach is estimated per operating-domain cell; with zero misses in 3,000 approaches the 95 % bound is about $10^{-3}$.

**Pilot scope:** rows 1.2.1 (fault injection and boundary tests) and the 1.1.2 per-release regression. Both are bench tests whose evidence is synchronised signals plus versions, which is what Lockstep and bench memory capture, and both recur every quarter with each model update, so the value compounds. The matrix supports the manufacturer's conformity work; it does not establish conformity.`,
            explanation: md`Graded against the rubric. A good matrix lets a test lead start work tomorrow, and lets a compliance engineer see where his file is empty.`,
            concepts: ["aw11.ehsr", "aw11.self-evolving", "aw11.corruption-protection"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to Yusuf, who knows drive-inverter testing but not ML, why a person-detection model needs a different kind of evidence than an overcurrent trip, and what the Regulation asks for on top.",
          keyPoints: [
            "An overcurrent trip has a precise specification that can be tested at its boundaries; an ML detector's specification is its operating domain and data",
            "ML performance is a rate that must be estimated with confidence over representative cases (about 3/n bound with zero failures)",
            "Every retrain can move the set of failures, so each release needs regression evidence",
            "The Regulation adds bounded task and movement space, operator correction, decision and version logs, and lifecycle risk assessment of self-evolving behaviour",
            "The evidence must be traceable to model version, rig configuration and operating-domain cell",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw11-l02-q1",
      type: "mcq",
      prompt: "What is an essential health and safety requirement (EHSR)?",
      options: [
        "A harmonised standard that must be applied",
        "A mandatory safety objective in Annex III that the machine must achieve",
        "A test procedure defined by the notified body",
        "A voluntary best practice",
      ],
      answer: 1,
      explanation: md`EHSRs are binding objectives. Harmonised standards are voluntary ways to meet them that give a presumption of conformity.`,
      concepts: ["aw11.ehsr"],
      difficulty: 1,
    },
    {
      id: "aw11-l02-q2",
      type: "numeric",
      prompt: md`A person detector has passed $n = 6{,}000$ independent, representative trials with zero misses. Using the rule of three, what is the approximate 95 % upper bound on the miss probability per demand?`,
      answer: 0.0005,
      tolerance: { rel: 0.02 },
      explanation: md`$p_U \approx 3/n = 3/6{,}000 = 5 \times 10^{-4}$. The exact value $1 - 0.05^{1/6000}$ is $4.99 \times 10^{-4}$.`,
      concepts: ["aw11.self-evolving"],
      difficulty: 2,
    },
    {
      id: "aw11-l02-q3",
      type: "numeric",
      prompt: md`A robot logs safety decisions at 25 Hz, 2 kB per record, 4,000 operating hours a year. How many GB per year does that produce (decimal GB)?`,
      answer: 720,
      tolerance: { rel: 0.01 },
      unit: "GB",
      explanation: md`$V = 25 \times 2{,}000 \times 4{,}000 \times 3{,}600 = 7.2 \times 10^{11}$ B $= 720$ GB.`,
      concepts: ["aw11.corruption-protection"],
      difficulty: 1,
    },
    {
      id: "aw11-l02-q4",
      type: "multi",
      prompt: "Which are requirements of EHSR 1.1.9 (protection against corruption), as summarised in this lesson? (Select all that apply.)",
      options: [
        "Connecting another device must not lead to a hazardous situation",
        "The machine collects evidence of legitimate or illegitimate interventions in safety-relevant software",
        "Installed safety-relevant software is identified and its version can be read",
        "All machines must be certified to IEC 62443 by a notified body",
      ],
      answer: [0, 1, 2],
      explanation: md`1.1.9 sets objectives; it does not mandate a specific security standard or certificate.`,
      concepts: ["aw11.corruption-protection"],
      difficulty: 2,
    },
    {
      id: "aw11-l02-q5",
      type: "order",
      prompt: "Order the ISO 12100 three-step method for risk reduction.",
      items: ["Inherently safe design measures", "Safeguarding and complementary protective measures", "Information for use"],
      explanation: md`Design the hazard out first; guard what remains; then warn and instruct. Instructions never substitute for a feasible design measure.`,
      concepts: ["aw11.ehsr"],
      difficulty: 1,
    },
    {
      id: "aw11-l02-q6",
      type: "decision",
      prompt: md`A humanoid maker shows you "98 % detection accuracy on our validation set" as its evidence for the person-detection safety function. What do you advise?`,
      options: [
        { text: "That is enough for the technical file.", score: 0, feedback: "Accuracy on an unspecified set says nothing about miss rate per demand in the operating domain." },
        { text: "Report the miss rate per operating-domain cell with a confidence bound, tied to model version and rig configuration, and plan regression per release.", score: 1, feedback: "This is evidence a notified body can assess." },
        { text: "Retrain until accuracy reaches 99.9 %.", score: 0.2, feedback: "Higher accuracy may help but does not create the missing evidence structure." },
      ],
      explanation: md`Safety evidence for ML functions is a rate with confidence over a defined operating domain, traceable to versions.`,
      concepts: ["aw11.self-evolving"],
      difficulty: 2,
    },
    {
      id: "aw11-l02-q7",
      type: "mcq",
      prompt: "What does the Regulation add for autonomous mobile machinery, as summarised in this lesson?",
      options: [
        "A ban on operation near people",
        "A supervisory function able to stop and restart the machine remotely and monitor its movement area",
        "Mandatory human drivers",
        "Speed limits of 1 m/s",
      ],
      answer: 1,
      explanation: md`Autonomous mobile machinery must have a supervisor function; specific speeds come from the risk assessment and standards, not from the Regulation.`,
      concepts: ["aw11.hmi-autonomy"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "aw11-l02-f1", front: "EHSRs versus standards", back: "EHSRs (Annex III) are binding objectives; harmonised standards are voluntary means that give a presumption of conformity.", concepts: ["aw11.ehsr"] },
    { id: "aw11-l02-f2", front: "EHSR 1.1.9", back: "Protection against corruption: safe connection of other devices, protected and identified safety software, evidence of interventions.", concepts: ["aw11.corruption-protection"] },
    { id: "aw11-l02-f3", front: "EHSR 1.2.1 additions for self-evolving systems", back: "No actions beyond defined task and movement space; operator can correct; safety-related decision data recorded; plus version and intervention tracing logs.", concepts: ["aw11.self-evolving", "aw11.corruption-protection"] },
    { id: "aw11-l02-f4", front: "EHSR 1.1.6 for autonomous machines", back: "Ergonomics including psychological stress; respond to people appropriately and communicate planned actions comprehensibly.", concepts: ["aw11.hmi-autonomy"] },
    { id: "aw11-l02-f5", front: "Rule of three", back: md`Zero failures in $n$ independent trials: 95 % upper bound $p_U \approx 3/n$. For $10^{-4}$, about 30,000 trials.`, concepts: ["aw11.self-evolving"] },
    { id: "aw11-l02-f6", front: "Log volume formula", back: md`$V = f \, s \, t_{op}$. 20 Hz x 1.5 kB x 3,000 h = 324 GB per robot per year.`, concepts: ["aw11.corruption-protection"] },
    { id: "aw11-l02-f7", front: "Why logs are not automatically evidence", back: "They need integrity protection, version stamps and synchronised clocks so they show what the machine knew when it decided.", concepts: ["aw11.corruption-protection"] },
  ],
};

export default lesson;
