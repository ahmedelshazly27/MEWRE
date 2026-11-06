import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw10-l05",
  title: "Safety cases and GSN: claims, arguments and credible evidence",
  summary:
    "What a safety case is and why regulators and assessors increasingly want one; Goal Structuring Notation (goals, strategies, solutions, context, assumptions, justifications) built hands-on; common argument patterns; and what makes evidence credible: relevance, coverage, trustworthiness, independence and currency after change. Includes the failure modes of paper safety cases and the idea of living safety cases fed by operational data.",
  minutes: 75,
  objectives: [
    "Define a safety case and explain the difference between argument and evidence",
    "Read and build a GSN structure with goals, strategies, solutions, context, assumptions and justifications",
    "Apply a hazard-directed argument pattern to a test rig or robot application",
    "Judge a piece of evidence on relevance, coverage, trustworthiness and currency, and name an assurance deficit",
    "Explain why safety cases go stale after changes and what a living safety case needs from test data",
  ],
  concepts: [
    { id: "aw10.safety-case", name: "Safety case", description: "A structured argument, supported by a body of evidence, that a system is acceptably safe for a given application in a given operating environment. It makes the reasoning explicit so others can challenge it.", competency: "aw-safety", related: ["aw10.hazard-risk", "aw10.gsn"] },
    { id: "aw10.gsn", name: "Goal Structuring Notation (GSN)", description: "A graphical notation for arguments: goals (claims) are broken down by strategies into sub-goals until solutions (evidence) support them, with context, assumptions and justifications stating the conditions. Standardised by the Assurance Case Working Group (GSN Community Standard v3).", competency: "aw-safety", related: ["aw10.safety-case"] },
    { id: "aw10.argument-patterns", name: "Argument patterns", description: "Reusable structures such as argument over each identified hazard, over each safety requirement, over lifecycle phases, or a product plus process argument; they make cases consistent and reviewable.", competency: "aw-safety", related: ["aw10.gsn"] },
    { id: "aw10.evidence-credibility", name: "Evidence credibility", description: "Whether evidence actually supports its claim: relevance (right claim, right configuration), coverage (all conditions and hazards), trustworthiness (provenance, independence, calibrated and qualified tools, integrity) and currency (still valid after changes).", competency: "aw-safety", related: ["aw10.safety-case", "aw10.tool-confidence"] },
    { id: "aw10.assurance-deficit", name: "Assurance deficit and defeaters", description: "A gap between the confidence the argument needs and what the evidence gives; a defeater is a specific reason a claim might be false (an untested condition, an unqualified tool). Good cases list and address them.", competency: "aw-safety", related: ["aw10.evidence-credibility"] },
    { id: "aw10.living-safety-case", name: "Living (dynamic) safety case", description: "A safety case kept current through the life of the system: changes trigger impact analysis on the argument, and operational and test data are monitored against the assumptions the case relies on.", competency: "aw-safety", related: ["aw10.safety-case", "aw10.evidence-credibility"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Arguments, evidence and the notation",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`"Safety evidence infrastructure" is Afterwave's long-term positioning. A safety case is where evidence is consumed: if you know what an argument needs from each piece of evidence, you know what Lockstep must capture, what Enclave must preserve and what Ripple must flag when something changes. It is also the most useful frame for talking to humanoid and AI-heavy customers, whose products have no settled standard: when there is nothing to tick off, the safety case is how they will show assessors, customers and insurers that the robot is acceptably safe.`,
        },
        {
          kind: "md",
          md: md`### What a safety case is

The classic definition (UK Defence Standard 00-56) is: a structured argument, supported by a body of evidence, that provides a compelling, comprehensible and valid case that a system is safe for a given application in a given operating environment. Three parts:

- **Claims**: what is asserted ("the test station is acceptably safe to operate", "hazard H3 is adequately mitigated", "STO reaches torque off within 50 ms").
- **Argument**: why the claims follow from the evidence (the reasoning, usually a decomposition).
- **Evidence**: test reports, analyses, calculations, reviews, field data, certificates.

Safety cases are mandatory in some regimes (UK nuclear, rail, defence, offshore after Piper Alpha) and required as a work product in **ISO 26262** (Part 2). **UL 4600** (safety for the evaluation of autonomous products) is built around a safety case: it does not prescribe a design, it requires a well-argued case and lists what the argument must cover. Machinery CE marking asks for a technical file rather than a safety case, but for ML-based safety functions going to a notified body under the Machinery Regulation an explicit argument is the natural way to present why the function is adequate (an inference, not a legal requirement).

A safety case is not evidence by bulk. The Nimrod Review (Haddon-Cave, 2009), into the loss of an RAF aircraft in 2006, criticised a safety case that had become a paperwork exercise: assembled to satisfy a process, never challenged, and blind to the hazard that destroyed the aircraft. The lesson most practitioners took: an argument must be **challengeable**, and its evidence must actually support each claim.

### GSN elements

Goal Structuring Notation (GSN Community Standard, version 3, 2021, from the Assurance Case Working Group of the Safety-Critical Systems Club) has a small vocabulary:

| Element | Shape | Role |
|---|---|---|
| **Goal** | Rectangle | A claim. The top goal is the overall safety claim. |
| **Strategy** | Parallelogram | How a goal is broken into sub-goals ("argue over each identified hazard"). |
| **Solution** | Circle | A reference to evidence (test report, analysis). |
| **Context** | Rounded rectangle | Scope and definitions the claim depends on (operating environment, hazard log version). |
| **Assumption** | Oval marked A | Something taken as true without further argument. |
| **Justification** | Oval marked J | Why a strategy or goal is acceptable. |
| **Undeveloped** | Diamond on an element | Not yet developed: an open item. |

Two links: **SupportedBy** (solid arrowhead: goal to strategy, strategy to goal, goal to solution) and **InContextOf** (hollow arrowhead: to context, assumption, justification). Larger cases are split into **modules** with **away goals** referring to claims argued elsewhere (for example a supplier's drive STO claim).

The **Claims, Arguments, Evidence (CAE)** notation from Adelard does the same with different symbols, and **ISO/IEC/IEEE 15026-2** standardises the structure of assurance cases in general.

### Patterns

- **Hazard-directed**: top goal, context = hazard log; strategy "argue over each identified hazard"; one sub-goal per hazard; each argued by its mitigations.
- **Requirement-directed**: argue that each safety requirement is satisfied, and that the requirements are complete and correct.
- **Product plus process**: argue the product is safe (hazards mitigated) and the process that produced it was adequate (competence, standards followed, independent assessment). The process leg is how systematic failures are addressed.
- **Confidence argument**: a separate argument for why the evidence is trustworthy, so the main argument stays readable.

Below is the builder. Start with the top goal for a test station or robot application, add a hazard strategy, then sub-goals and solutions, and let the structural checks tell you which goals are not yet supported by evidence.`,
        },
        {
          kind: "widget",
          widget: "gsn-builder",
          caption: "Build a safety case for the actuator test station from lesson 2: top goal in the context of the operating envelope and hazard log; strategy over hazards; a goal per hazard; solutions pointing at the PL calculation, validation tests and fault injection log. Every goal must end in evidence or be marked undeveloped.",
        },
        {
          kind: "md",
          md: md`### What makes evidence credible

Assessors ask four questions of every solution:

1. **Relevance**: does it test the claim it is attached to, on the configuration the claim is about? A stop-time test on firmware 3.1 does not support a claim about 3.2.
2. **Coverage**: does it cover the conditions in the claim's context: all speeds, payloads, temperatures, the triggering conditions for perception, every door and every fault class?
3. **Trustworthiness**: where did it come from and could it be wrong? Calibrated instruments (calibration traceable to ISO/IEC 17025 labs), qualified tools, raw data retained, integrity protected (no silent edits), produced or reviewed with appropriate independence, test procedures followed.
4. **Currency**: is it still valid? Every change to the system, its environment or its use can make evidence stale. A safety case is only as current as its oldest relevant evidence.

Where any answer is weak there is an **assurance deficit**. Good practice names them explicitly, often as **defeaters**: concrete reasons a claim might be false ("the fault injection campaign did not include encoder disagreement"), each either eliminated by more evidence or accepted with justification. This eliminative style (developed in work at Carnegie Mellon's Software Engineering Institute) is the opposite of the Nimrod failure: it actively looks for why the case could be wrong.

### Living safety cases

A system that changes weekly (firmware, ML policies, rigs) cannot rely on a safety case written once. Research on **dynamic safety cases** (Denney, Pai and Habli, 2015) proposes keeping the case linked to the system: changes trigger impact analysis on the argument, and monitored data are checked against the assumptions the case depends on (demand rates, failure rates, operating conditions). This needs exactly three things from the test infrastructure: evidence linked to configuration, a dependency model from evidence to system parts, and change detection. Those are Lockstep, bench memory and Ripple.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Building and stress-testing a case",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "A GSN outline for the actuator end-of-line test station",
          given: md`The station and safety function SF-01 from lessons 1 and 2 (illustrative). Hazard log v1.2 lists H1 contact with rotating coupling, H2 ejection of a part at speed, H3 electric shock from the DUT power stage, H4 burns from a hot actuator.`,
          steps: [
            { md: md`**G1** (goal): The station is acceptably safe to operate within its defined operating envelope. **C1** (context): operating envelope (DUT up to 3,000 rpm, 80 Nm, 48 V; trained operators; 16 h per day). **C2**: hazard log v1.2. **J1**: risk acceptance criteria from the company's machinery safety procedure.` },
            { md: md`**S1** (strategy): Argue over each hazard in C2. **A1** (assumption): the hazard log is complete (supported separately by **G6**: hazard identification followed ISO 12100 with a cross-functional HAZOP, evidence **Sn6** workshop record).` },
            { md: md`**G2**: H1 is adequately mitigated. **S2**: argue by the three-step method: inherent design (**G2.1** coupling guard, evidence **Sn1** drawing and inspection record) and safety function SF-01 (**G2.2** SF-01 achieves PL d, at least PLr d).` },
            { md: md`**G2.2** is supported by **Sn2** PL calculation report (SISTEMA), **Sn3** validation test report (function and reaction time at three speeds), **Sn4** fault injection log (8 fault classes, all detected), and **G2.3** "SF-01 evidence is current for the deployed configuration", supported by **Sn5** configuration record linking Sn3 and Sn4 to drive firmware hash, PLC checksum and wiring revision.` },
            { md: md`**G3** to **G5** (H2 to H4) are developed the same way; until then they are marked **undeveloped** and the case cannot be claimed complete.` },
          ],
          result: md`A small, reviewable structure where every claim ends in specific evidence, the completeness of the hazard list is argued, not assumed silently, and **currency** is an explicit goal. G2.3 is the goal that bench memory and Ripple serve directly.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "How much of the case does a firmware update invalidate?",
          given: md`Illustrative. The full case for the station has 24 solutions. A new drive firmware is released. A dependency model shows: 6 solutions depend on drive firmware directly (stop times, STO tests, fault injection on the drive), 3 more depend on them indirectly (the PL calculation uses the measured DC; the stopping distance used for guard placement; the validation summary), and the rest (drawings, hazard workshop, electrical inspection, burn tests) are unaffected.`,
          steps: [
            {
              md: md`Stale solutions: $6 + 3 = 9$ of 24.`,
              hidden: true,
              check: { prompt: "Number of stale solutions", answer: 9, unit: "solutions", tolerance: { abs: 0 } },
            },
            {
              md: md`Share of evidence to redo or re-review: $9/24 = 37.5\%$.`,
              hidden: true,
              check: { prompt: "Share of evidence affected", answer: 37.5, unit: "%", tolerance: { abs: 0.5 } },
            },
            { md: md`Of the 9, the 6 direct ones need retesting; the 3 indirect ones need re-review once new results are in. Without a dependency model the team either retests everything (expensive) or retests by memory (and misses one of the 9, leaving a goal supported by stale evidence).` },
          ],
          result: md`37.5% of the case is affected, and knowing **which** 37.5% is the value. That is a change-impact question asked of a safety argument rather than of a test suite: the same engine, one level up.`,
        },
        {
          kind: "question",
          question: {
            id: "aw10-l05-p1",
            type: "mcq",
            prompt: "In GSN, \"Argue over each identified hazard\" is which element?",
            options: ["Goal", "Strategy", "Solution", "Context"],
            answer: 1,
            explanation: md`A strategy explains how a goal is decomposed into sub-goals. The hazard log it refers to would be a context element.`,
            concepts: ["aw10.gsn"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Safety cases in real organisations",
      blocks: [
        {
          kind: "md",
          md: md`### Who writes and reads them

- **Authors**: the functional safety manager or system safety engineer, with inputs from design, test and operations. Tools range from Word and Visio to dedicated assurance-case tools (for example Astah GSN, Adelard ASCE, and newer model-based tools).
- **Readers**: independent assessors, notified bodies, customers' safety teams (an integrator reviewing a robot supplier's case), regulators in goal-based regimes, and increasingly insurers and investors in autonomous systems.
- **Where test teams come in**: they produce most of the solutions. In practice the link from a solution in the case to the actual run, data and configuration is a document number in a spreadsheet, and that link is where most credibility is lost.

### What reviewers attack first

Unsupported leaps from one goal to its children (a strategy that does not cover the goal), evidence attached to the wrong configuration, context that quietly narrows the claim ("in normal operation"), assumptions that are really the hard part, and missing process arguments for software and AI.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- **Evidence by the kilogram**: hundreds of reports attached to a top goal with no argument linking them.
- **Circularity**: the claim is restated as its own justification ("SF-01 is reliable because it was designed to PL d").
- **Stale solutions**: test reports from an earlier software release still cited after five updates.
- **Unexamined assumptions**: "operators will not bypass the interlock", with no evidence of the human factors.
- **Context drift**: the deployed robot runs outside the operating envelope stated in C1, and nobody notices because the case is not monitored.`,
        },
        {
          kind: "checklist",
          title: "Credibility check for one solution",
          items: [
            "Which goal does it support, and does it test that claim directly?",
            "Which exact configuration (hardware revision, firmware and model hash, parameters, rig) did it run on, and does that match the deployed one?",
            "Which conditions does it cover, and which conditions in the goal's context does it not cover?",
            "Were instruments calibrated and tools qualified; is the raw data kept and integrity-protected?",
            "Who produced and who reviewed it, and is that independent enough for the integrity level?",
            "Has anything it depends on changed since it was produced?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw10-l05-p2",
            type: "short",
            prompt: md`Draft the **GSN structure (in text)** for one safety function of a humanoid or mobile robot customer (illustrative), down to evidence, and then write the **confidence assessment** for the two weakest solutions: what defeaters apply and what additional bench evidence would remove each.`,
            rubric: [
              "Top goal with explicit context (operating environment, configuration, hazard log) and a stated strategy",
              "Decomposition reaches concrete solutions for each leaf goal, with no unsupported goals (or undeveloped goals marked as such)",
              "Includes at least one assumption or justification and treats completeness or process (systematic failures) explicitly",
              "Identifies two weak solutions and names specific defeaters for each (configuration mismatch, untested condition, unqualified tool, uncalibrated instrument, stale after change)",
              "Proposes specific bench evidence that would eliminate each defeater, with conditions and configuration capture",
              "Includes a currency goal or mechanism so evidence is revalidated after changes",
            ],
            modelAnswer: md`**G1**: The protective-stop function PS-1 of the mobile manipulator reduces the risk of collision with a person to an acceptable level in context **C1** (warehouse aisles, people walking up to 1.6 m/s, robot software release R7, safety parameter set P3) and **C2** (hazard log v2.0, H5 collision with person). **J1**: target PL d from the ISO 13849-1 risk graph (S2, F2, P1).

**S1**: argue over specification, implementation and verification of PS-1, plus currency.
- **G2** PS-1 specification is adequate: zone sized with the protective separation distance. **Sn1** separation distance calculation; **A1** person speed 1.6 m/s.
- **G3** PS-1 implementation achieves PL d: **Sn2** PL calculation; **Sn3** certified safety laser scanner certificate (away goal to supplier).
- **G4** PS-1 performs as specified: **G4.1** stop time within 0.5 s at all speeds and payloads, **Sn4** stop-time test report; **G4.2** detection of persons in all specified poses and clothing, **Sn5** detection test report; **G4.3** diagnostics detect scanner and encoder faults, **Sn6** fault injection log.
- **G5** evidence is current for R7 and P3: **Sn7** configuration record and Ripple change-impact report.
- **G6** (process) development followed ISO 13849-1 software requirements: **Sn8** software verification report.

**Confidence assessment.**
*Sn4 stop-time report.* Defeaters: tests run with a new brake at room temperature (wear and cold not covered); run on R6 not R7; payload only up to 60% of maximum. Evidence to eliminate: stop-time tests at 0, 50 and 100% payload, at 5 and 35 °C, after the brake wear endurance cycle, on R7 with configuration captured; trend of stop times across releases from bench memory.
*Sn5 detection test.* Defeaters: test set lacks crouching persons and dark, low-reflectivity clothing; no low-light condition. Evidence: structured test matrix (poses times clothing reflectivity times lighting), at least 30 trials per cell, results linked to scanner firmware and field settings.

Both new campaigns are flagged by Ripple for rerun on any release that touches the brake controller or scanner configuration.`,
            explanation: md`A case is only as credible as its weakest solutions; naming defeaters and the bench evidence that removes them is how test teams strengthen the argument.`,
            concepts: ["aw10.gsn", "aw10.evidence-credibility", "aw10.assurance-deficit"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a procurement manager at a car plant what a safety case is and why a pile of test reports is not one.",
          keyPoints: [
            "A safety case states a claim that the system is acceptably safe in a defined context",
            "It argues step by step how that claim follows, down to specific evidence for each sub-claim",
            "Test reports are evidence; without the argument nobody can see what they prove or what is missing",
            "Evidence must match the deployed configuration and be current after changes",
          ],
        },
        { kind: "sources", refs: ["aw10-r16", "aw10-r17", "aw10-r18", "aw10-r24", "aw10-r25"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw10-l05-q1",
      type: "mcq",
      prompt: "Which GSN element represents a reference to evidence?",
      options: ["Goal (rectangle)", "Strategy (parallelogram)", "Solution (circle)", "Assumption (oval)"],
      answer: 2,
      explanation: md`Solutions are references to evidence items. Goals are claims; strategies explain decompositions; assumptions are accepted without argument.`,
      concepts: ["aw10.gsn"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw10-l05-q2",
      type: "multi",
      prompt: "Which are defeaters against the claim \"STO reaches torque off within 50 ms\" supported by a single test report?",
      options: [
        "The test ran on an earlier drive firmware than the deployed one",
        "Only nominal speed was tested",
        "The DAQ used to time the test had an expired calibration",
        "The report was signed by the test lead",
        "The report is in PDF",
      ],
      answer: [0, 1, 2],
      explanation: md`Configuration mismatch (currency, relevance), narrow coverage and untrusted instrumentation are real reasons the claim might be false. Signature and file format are not.`,
      concepts: ["aw10.assurance-deficit", "aw10.evidence-credibility"],
      difficulty: 2,
    },
    {
      id: "aw10-l05-q3",
      type: "mcq",
      prompt: "What was the core criticism of the Nimrod safety case in the Haddon-Cave review (2009)?",
      options: [
        "It used the wrong notation",
        "It had become a paperwork exercise that was not challenged and missed the hazard that caused the loss",
        "It was too short",
        "It relied on quantitative failure rates",
      ],
      answer: 1,
      explanation: md`The review found a safety case produced to satisfy a process rather than to find hazards. The practical lesson: arguments must be challengeable and evidence must really support claims.`,
      concepts: ["aw10.safety-case"],
      difficulty: 2,
    },
    {
      id: "aw10-l05-q4",
      type: "order",
      prompt: "Order a hazard-directed GSN argument from top to bottom.",
      items: [
        "Goal: system acceptably safe in context",
        "Strategy: argue over each identified hazard",
        "Goal: hazard H1 adequately mitigated",
        "Goal: safety function SF-01 achieves its PLr",
        "Solution: validation test report for SF-01",
      ],
      explanation: md`Top claim, decomposition by hazard, one goal per hazard, mitigation claims, then evidence.`,
      concepts: ["aw10.argument-patterns", "aw10.gsn"],
      difficulty: 1,
    },
    {
      id: "aw10-l05-q5",
      type: "decision",
      prompt: md`A customer's safety case cites 140 test reports as solutions directly under the top goal "Robot is safe". They ask Afterwave to "add our new test data". What do you recommend?`,
      options: [
        { text: "Attach the new reports under the top goal too.", score: 0, feedback: "More evidence without argument makes the case harder to review, not stronger." },
        { text: "Propose restructuring: a strategy over hazards and safety functions, each leaf goal tied to specific runs with configuration, plus a currency goal, and then map the existing and new evidence onto it, listing goals still unsupported.", score: 1, feedback: "You turn a pile into an argument and expose the real gaps, which is where new testing should go." },
        { text: "Tell them a safety case is not your business.", score: 0.2, feedback: "The case is where your evidence is used; helping them structure it is how they see your value." },
      ],
      explanation: md`Evidence credibility depends on its link to specific claims. Restructuring also makes gaps visible, which tells the team which tests to run next.`,
      concepts: ["aw10.argument-patterns", "aw10.evidence-credibility"],
      difficulty: 2,
    },
    {
      id: "aw10-l05-q6",
      type: "mcq",
      prompt: "What distinguishes a living (dynamic) safety case?",
      options: [
        "It is written in a web tool",
        "Changes trigger impact analysis on the argument, and operational and test data are monitored against its assumptions",
        "It has no assumptions",
        "It is approved annually",
      ],
      answer: 1,
      explanation: md`The case is kept linked to the system through life: change impact on evidence and monitoring of the assumptions it depends on.`,
      concepts: ["aw10.living-safety-case"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "aw10-l05-f1", front: "Safety case (definition)", back: "A structured argument, supported by evidence, that a system is acceptably safe for a given application in a given environment.", concepts: ["aw10.safety-case"] },
    { id: "aw10-l05-f2", front: "GSN core elements", back: "Goal (claim), Strategy (decomposition), Solution (evidence), Context, Assumption, Justification; links SupportedBy and InContextOf.", concepts: ["aw10.gsn"] },
    { id: "aw10-l05-f3", front: "Four tests of evidence credibility", back: "Relevance, coverage, trustworthiness, currency.", concepts: ["aw10.evidence-credibility"] },
    { id: "aw10-l05-f4", front: "Defeater", back: "A specific reason a claim might be false; eliminated with more evidence or accepted with justification.", concepts: ["aw10.assurance-deficit"] },
    { id: "aw10-l05-f5", front: "Standards built around safety cases", back: "ISO 26262 (safety case work product), UL 4600 (autonomous products), ISO/IEC/IEEE 15026-2 (assurance case structure); GSN Community Standard v3 for notation.", concepts: ["aw10.safety-case"] },
    { id: "aw10-l05-f6", front: "Product plus process argument", back: "Argue the product is safe (hazards mitigated) and the process was adequate (addresses systematic failures).", concepts: ["aw10.argument-patterns"] },
    { id: "aw10-l05-f7", front: "What a living safety case needs from test infrastructure", back: "Evidence linked to configuration, a dependency model from evidence to system parts, and change detection.", concepts: ["aw10.living-safety-case"] },
  ],
};

export default lesson;
