import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw04-l04",
  title: "Traceability in regulated domains: ISO 26262, IEC 61508 and the Machinery Regulation",
  summary:
    "What functional safety standards and the EU Machinery Regulation actually demand of traceability: the chain from hazard to safety goal to requirement to verification evidence, integrity levels (ASIL, SIL, PL) that scale the rigour, change management and impact analysis, tool confidence for the tools that make verification decisions, and what assessors and notified bodies look for in the file.",
  minutes: 85,
  objectives: [
    "Trace the ISO 26262 chain from hazard analysis to safety goals, functional and technical safety requirements, and verification, and determine an ASIL",
    "State the IEC 61508 SIL targets and explain why test hours alone cannot demonstrate high integrity",
    "Describe what Regulation (EU) 2023/1230 expects in the technical documentation and how traceability supports it",
    "Classify a verification tool under ISO 26262-8 tool confidence (TI, TD, TCL) and IEC 61508-3 tool classes, and apply it to a change-impact tool",
    "List what an assessor or notified body checks in a traceability and verification file, and prepare for it",
  ],
  concepts: [
    { id: "aw04.safety-requirement-chain", name: "Safety requirement chain", description: "Hazard and risk analysis produces safety goals; these are refined into functional, then technical, then hardware and software safety requirements, each traced up to its source and down to its verification.", competency: "aw-safety", related: ["aw04.bidirectional-traceability", "aw04.requirement-levels"] },
    { id: "aw04.integrity-levels", name: "Integrity levels (ASIL, SIL, PL)", description: "Risk-derived levels that scale the rigour of methods, verification and independence: ASIL A to D (ISO 26262), SIL 1 to 4 (IEC 61508), PL a to e (ISO 13849).", competency: "aw-safety", related: ["aw04.safety-requirement-chain"] },
    { id: "aw04.change-impact-regulated", name: "Change management and impact analysis (regulated)", description: "Every change request gets a documented impact analysis on safety requirements, work products and verification, and affected verification is repeated or justified before release.", competency: "aw-impact", related: ["aw04.suspect-link", "aw04.baseline"] },
    { id: "aw04.tool-confidence", name: "Tool confidence and qualification", description: "ISO 26262-8 rates a tool by tool impact (TI) and tool error detection (TD) to a tool confidence level (TCL1 to 3); IEC 61508-3 classes tools T1 to T3. Higher levels need qualification evidence.", competency: "aw-safety", related: ["aw04.change-impact-regulated"] },
    { id: "aw04.technical-file", name: "Machinery technical documentation", description: "The file a manufacturer keeps to show conformity with Regulation (EU) 2023/1230: risk assessment, EHSRs applied and measures taken, standards, test reports and results of checks, instructions and declaration.", competency: "aw-safety", related: ["aw04.safety-requirement-chain"] },
    { id: "aw04.confirmation-measures", name: "Confirmation measures and independence", description: "Reviews, audits and assessments by people independent of the work, with independence increasing with the integrity level (ISO 26262 I0 to I3).", competency: "aw-safety", related: ["aw04.integrity-levels"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What the standards demand, and why traceability is the backbone",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Afterwave's regulatory entry point is the EU Machinery Regulation, applying from 20 January 2027, and your cofounders' background is automotive drive validation, where ISO 26262 and Automotive SPICE audits are routine. In both worlds, "show me the evidence that this requirement is met on the product you ship, and show me you re-verified after the last change" is the central question. If Ripple tells an engineer to skip a test, Ripple becomes part of that argument. You need to know what assessors expect, and what that implies for how Ripple must justify its output.`,
        },
        {
          kind: "md",
          md: md`### The common shape across standards

All the functional safety standards share one structure:

1. **Hazard and risk analysis** identifies what can hurt someone and how badly.
2. Each unacceptable risk gets a **safety goal** or **safety function** with an **integrity level**.
3. Goals are refined into **safety requirements** at each architecture level, allocated to hardware and software.
4. Each safety requirement is **verified** (review, analysis, test) with rigour scaled to its integrity level.
5. **Change management** keeps that chain valid after every change.
6. **Confirmation measures** by independent people check that the chain is complete and the evidence real.

Traceability is what makes steps 3 to 6 checkable.

### ISO 26262 (road vehicles, 2018 edition)

- **Part 3** (concept): hazard analysis and risk assessment (HARA) rates each hazardous event for **severity** S0 to S3, **exposure** E0 to E4 and **controllability** C0 to C3, giving an **ASIL** (A lowest to D highest, or QM for no safety requirement). Each hazard with an ASIL gets a **safety goal**, refined into **functional safety requirements** in the functional safety concept.
- **Part 4** (system): **technical safety requirements** in the technical safety concept, allocated to hardware and software.
- **Parts 5 and 6**: hardware and software safety requirements, design and verification.
- **Part 8** (supporting processes): specification and management of safety requirements (unique ID, status, ASIL, traceability to source, to derived requirements and to verification), configuration management, **change management with impact analysis**, verification, documentation and **confidence in the use of software tools**.
- **Part 2**: confirmation reviews, functional safety audit and functional safety assessment, with independence levels I0 to I3 rising with ASIL.

The ASIL table reduces to a sum rule for S1 to S3, E1 to E4, C1 to C3:`,
        },
        { kind: "equation", formula: "aw04-asil-sum" },
        {
          kind: "md",
          md: md`**Automotive SPICE** sits beside ISO 26262 in supplier audits. Its system and software engineering processes contain base practices for **bidirectional traceability and consistency** between stakeholder requirements, system and software requirements, architecture, tests and test results. Many suppliers fail ASPICE assessments on traceability before anything else.

### IEC 61508 (generic E/E/PE safety, 2010 edition)

The parent standard for industrial functional safety (IEC 62061 for machinery control, IEC 61511 for process industry and others derive from it). Integrity is expressed as a **safety integrity level** with quantitative targets:

| SIL | PFH, high demand or continuous (dangerous failures per hour) | PFDavg, low demand |
|---|---|---|
| 4 | $\ge 10^{-9}$ to $< 10^{-8}$ | $\ge 10^{-5}$ to $< 10^{-4}$ |
| 3 | $\ge 10^{-8}$ to $< 10^{-7}$ | $\ge 10^{-4}$ to $< 10^{-3}$ |
| 2 | $\ge 10^{-7}$ to $< 10^{-6}$ | $\ge 10^{-3}$ to $< 10^{-2}$ |
| 1 | $\ge 10^{-6}$ to $< 10^{-5}$ | $\ge 10^{-2}$ to $< 10^{-1}$ |

IEC 61508-3 (software) lists techniques, including forward and backward traceability between safety requirements, design and tests, with recommendation strength rising with SIL. Verification and functional safety assessment independence also rise with SIL.

### Why test hours cannot carry the argument

Demonstrating a constant failure rate $\lambda$ with zero observed failures at confidence $C$ needs:`,
        },
        { kind: "equation", formula: "aw04-zero-failure-test" },
        {
          kind: "md",
          md: md`At the SIL 3 boundary ($10^{-7}$/h) and 95 % confidence that is about $3.0 \times 10^{7}$ failure-free hours. No test lab has that. So the standards combine **analysis** (FMEDA, fault trees with component data) for random hardware failures with a **traced, disciplined process** against systematic failures (design errors, software bugs), where verification is complete and repeated after change. Traceability is the proof that the process happened.

### ISO 13849 and the Machinery Regulation

For machinery control systems, **ISO 13849-1** (2023 edition) rates safety functions by **performance level** PL a to e, and now has a clause on software safety requirements, with validation content from ISO 13849-2 merged in (research brief). **Regulation (EU) 2023/1230** applies from 20 January 2027. The manufacturer must keep **technical documentation** that demonstrates conformity, including, in summary:

- general description, drawings and control circuit descriptions;
- the **risk assessment** and the essential health and safety requirements (EHSRs) applied, with the protective measures taken;
- the harmonised standards and other specifications used;
- **reports and results of tests and checks** carried out to verify conformity;
- for safety-related software, a description and, on reasoned request, access to source code or programming logic;
- instructions and the EU declaration of conformity.

Machinery in **Annex I Part A**, which now includes safety components and machinery with fully or partially **self-evolving behaviour using machine learning for safety functions**, needs notified-body assessment; no harmonised standard yet covers AI safety functions (research brief, Nov 2026).`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Exact Annex wording not checked",
          md: md`The list above summarises Annex IV of Regulation 2023/1230 from secondary sources; the primary Official Journal text was not read for this module (research brief method note). The retention period (commonly cited as at least 10 years after placing on the market), the logging requirement for self-evolving safety behaviour in EHSR 1.2.1, and how AI Act obligations will be carried into the Regulation by delegated acts after the Digital Omnibus on AI (Regulation 2026/1744) must be checked against EUR-Lex before you quote them to a customer.`,
        },
        {
          kind: "md",
          md: md`### Tools that make verification decisions

If a tool's output feeds a safety argument, the standards ask how much you can trust it.

**ISO 26262-8 tool confidence:**

| Tool impact | Tool error detection | Tool confidence level |
|---|---|---|
| TI1: no possibility that a malfunction introduces or fails to detect an error | (any) | TCL1: no qualification needed |
| TI2: a malfunction can introduce or fail to detect an error | TD1: high confidence the error would be detected | TCL1 |
| TI2 | TD2: medium | TCL2 |
| TI2 | TD3: low or none | TCL3 |

TCL2 and TCL3 need qualification by one or more of: increased confidence from use, evaluation of the tool development process, validation of the tool, or development according to a safety standard (the strength required depends on the ASIL).

**IEC 61508-3 tool classes:** **T1** cannot affect the executable code (a text editor); **T2** supports test or verification, where an error could fail to reveal a defect but cannot create one (test tools, coverage tools); **T3** generates outputs that directly contribute to the executable (compilers, code generators).

A change-impact engine that decides which tests are **not** rerun is a textbook case of a tool that could **fail to detect** an error: TI2 in ISO 26262 terms, T2 in IEC 61508 terms. Its TCL depends on whether other measures would catch a wrong selection (TD).`,
        },
        {
          kind: "widget",
          widget: "gsn-builder",
          caption: "Build the argument an assessor reads: a goal ('the encoder-loss reaction is verified on release 3.0'), a strategy ('argue over the requirement chain and change impact'), sub-goals per requirement and per change, and solutions that are concrete evidence items (test runs on the release baseline, impact analysis records). Every goal must end in evidence.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Integrity levels and the limits of testing, in numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "ASILs for two hazards of an e-drive inverter",
          given: md`Illustrative HARA rows (not from any real program) for a traction inverter. H1: unintended torque at standstill while pedestrians are near the vehicle, rated S3, E4, C3. H2: loss of torque on a motorway, rated S2, E4, C2. A third row, H3: audible whine at low speed, has no injury potential (S0).`,
          steps: [
            { md: md`**H1:** $\Sigma = 3 + 4 + 3 = 10$, so **ASIL D**. Its safety goal ("avoid unintended torque above X Nm at standstill") carries ASIL D into every derived safety requirement unless ASIL decomposition is argued.` },
            { md: md`**H2:** $\Sigma = 2 + 4 + 2 = 8$, so **ASIL B**.` },
            { md: md`**H3:** S0, so no ASIL (QM). It is a quality requirement, managed but without functional safety rigour.` },
            { md: md`**Traceability consequence:** every software requirement derived from the H1 safety goal (current sensing plausibility, torque monitoring, safe state) inherits ASIL D attributes, needs I3 independence for the functional safety assessment, and its verification after each change must be complete or argued.` },
          ],
          result: md`The ASIL is an attribute that travels down the trace chain. A test linked to an ASIL D requirement is not a test you skip on a hunch after a firmware change; skipping it needs a written impact argument that an assessor will read.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "How many rig-hours to demonstrate a failure rate by test alone?",
          given: md`Target: dangerous failure rate below $10^{-7}$/h (SIL 3 boundary), 95 % confidence, zero failures. Illustrative lab: 20 endurance rigs each running 6,000 h per year.`,
          steps: [
            { md: md`$T \ge -\ln(1 - 0.95)/10^{-7} = 2.996/10^{-7}$` },
            { md: md`$T \approx 3.0 \times 10^{7}$ h.`, hidden: true, check: { prompt: "Required failure-free test hours (h)", answer: 29957323, unit: "h", tolerance: { rel: 0.01 } } },
            { md: md`Lab capacity: $20 \times 6{,}000 = 120{,}000$ h/yr, so years needed $= 2.996 \times 10^{7} / 1.2 \times 10^{5}$.` },
            { md: md`About **250 years**.`, hidden: true, check: { prompt: "Years of testing with the whole lab", answer: 250, unit: "yr", tolerance: { rel: 0.01 } } },
          ],
          result: md`Even at SIL 1 ($10^{-5}$/h) it is $3.0 \times 10^{5}$ h, two and a half years of the whole lab. Test hours verify functions and diagnostics; integrity claims rest on analysis plus a traced process. Bench evidence is necessary but never sufficient, which is why its traceability, not its volume, is what assessors check.`,
        },
        {
          kind: "question",
          question: {
            id: "aw04-l04-p1",
            type: "numeric",
            prompt: md`A hazardous event is rated S2, E3, C3. What is its ASIL, expressed as a number (A = 1, B = 2, C = 3, D = 4, QM = 0)?`,
            answer: 2,
            tolerance: { abs: 0.1 },
            explanation: md`$\Sigma = 2 + 3 + 3 = 8$, so **ASIL B** (2). The sum rule reproduces the ISO 26262-3 table for S1 to S3, E1 to E4, C1 to C3.`,
            concepts: ["aw04.integrity-levels"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "What assessors and notified bodies actually check",
      blocks: [
        {
          kind: "md",
          md: md`### Who audits what

- **Internal safety manager** runs confirmation reviews and keeps the safety case current.
- **Independent assessors** (functional safety assessment): third-party bodies such as TÜV organisations or specialist consultancies, or an independent internal department where the integrity level allows.
- **ASPICE assessors** sent or commissioned by OEMs audit suppliers' processes, including traceability.
- **Notified bodies** under the Machinery Regulation for Annex I Part A machinery, including ML-based safety functions from 20 January 2027.
- **Market surveillance authorities** can request the technical documentation after the product is on the market.

### Auditor question to evidence

| What they ask | Evidence that answers it |
|---|---|
| Is every safety goal refined into requirements, down to HW and SW? | Trace report hazard to goal to FSR to TSR to HW/SW requirement, no dangling items |
| Is every safety requirement verified with a method fitting its ASIL or SIL? | Requirement to verification spec links, method attribute, review records |
| Did verification pass **on the released configuration**? | Results tied to a baseline (firmware build, hardware revision), not "latest" |
| What changed since the last assessment, and what did you re-verify? | Change requests with impact analyses, list of reruns and justified skips |
| Can you trust the tools that produced the evidence? | Tool classification (TCL or T-class) and qualification reports |
| Are the test rigs and instruments fit for purpose? | Calibration records valid on the run date, rig configuration records |
| Was it reviewed independently? | Confirmation review records with names and independence level |

### What goes wrong

- A trace report generated the week before the audit, with links added to make it look complete.
- Results recorded against "v3.0" when three builds carried that label.
- Calibration expired between the test and the release; nobody linked the two.
- Impact analyses that say "no impact" with no reasoning.
- Test tools and scripts never classified; a homegrown pass/fail script that nobody qualified decides verdicts for ASIL C requirements.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "Design implication for Ripple",
          md: md`If a customer uses Ripple's output to skip tests on safety-relevant requirements, Ripple is a tool that can fail to detect an error. Two product consequences follow. First, every recommendation must carry its **reasoning** (which change, which link or history, which tests were excluded and why) so a human can review it, which raises error detection (TD) and can lower the required TCL. Second, a customer with ASIL or SIL work will ask for a **tool qualification kit**. Plan for both before the first safety-critical pilot, and position Ripple's output as an engineer-approved recommendation, consistent with the product vision of human approval.`,
        },
        { kind: "scenario", scenario: "aw04-s2" },
        {
          kind: "ask",
          title: "Questions for a prospect's safety manager",
          items: [
            "Which standards and integrity levels apply to the products this lab tests?",
            "When was your last functional safety assessment or ASPICE assessment, and what were the traceability findings?",
            "How do you document the impact analysis for a firmware change today, and who signs it?",
            "Which of your test tools have a TCL or T-class assigned, and who qualified them?",
            "From 20 January 2027, which of your machinery falls under Annex I Part A, and have you engaged a notified body?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw04-l04-p2",
            type: "short",
            prompt: md`**Produce a tool-confidence argument for Ripple** as a customer's safety manager would need it for a drive inverter program with ASIL C software requirements. Classify Ripple under ISO 26262-8 (TI, TD, resulting TCL) and IEC 61508-3 (T-class), explain the reasoning for each, propose two product features that raise error detection, and list the qualification evidence Afterwave would need to provide. Present it as an analysis to validate with an assessor, not as an existing certification.`,
            rubric: [
              "Classifies TI2 with a correct reason (a wrong selection could fail to detect an error by skipping a needed test) and T2 under IEC 61508-3 (supports verification, cannot create defects in the executable)",
              "Derives TCL from TD correctly (TD1 gives TCL1, TD2 gives TCL2, TD3 gives TCL3) and argues which TD is realistic with and without human review",
              "Proposes features that raise detection, such as per-recommendation reasoning, conservative defaults for safety requirements, periodic full regression to detect escapes, or comparison against trace-based selection",
              "Lists qualification evidence consistent with the standard (validation of the tool against known cases, evaluation of the development process, increased confidence from use) scaled to ASIL C",
              "Frames everything as a proposal to confirm with an assessor; makes no claim of existing certification or customers",
            ],
            modelAnswer: md`**Use case:** Ripple recommends which bench tests to rerun after a change; engineers may skip tests Ripple does not select.

**ISO 26262-8 classification.** **TI2**: if Ripple wrongly omits a test that would have revealed a defect in an ASIL C function, the error goes undetected. **TD** depends on the workflow. Without review, TD3 (nothing else would catch it before release), so **TCL3**. With mandatory engineer review of each recommendation against the change list and trace links, plus a full regression at each release candidate, a wrong omission is likely to be caught: TD1 or TD2, so TCL1 or TCL2. Proposal: target TD2 as a conservative claim, so **TCL2**, and confirm with the assessor.

**IEC 61508-3:** **T2**, a verification support tool whose errors can fail to reveal defects but cannot introduce them into the executable.

**Features that raise detection:** (1) every recommendation shows its reasons: the changed artifacts, the trace links and the bench-history evidence for each selected test, and why each excluded test was excluded; (2) a safety mode where tests linked to ASIL C or D requirements are always selected when any upstream item changed, unless an engineer signs an exclusion; (3) an escape monitor: periodic full regressions compared against Ripple's earlier selections, with misses reported.

**Qualification evidence (for TCL2 at ASIL C):** a tool validation report (a test suite of known change scenarios with expected selections, including regressions that must be caught), a description of the tool's development and configuration management process, a tool safety manual (intended use, known limitations, required workflow), version identification so the qualified version is the one in use, and, as pilots accumulate, an increased-confidence-from-use record. All of this is a plan to be validated with an assessor; nothing here is an existing certification.`,
            explanation: md`Graded against the rubric. The core insight: a test-selection tool sits in the verification argument, so its classification and its transparency are product requirements, not paperwork.`,
            concepts: ["aw04.tool-confidence", "aw04.change-impact-regulated", "aw04.integrity-levels"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a robotics CEO, who has never been through a safety assessment, why the assessor cares more about traceability than about how many hours of testing they ran.",
          keyPoints: [
            "High integrity failure rates cannot be demonstrated by test hours (zero-failure demonstration needs tens of millions of hours)",
            "So the argument combines analysis of random failures with a disciplined process against systematic errors",
            "Traceability is the proof the process happened: every hazard leads to requirements, every requirement to verification on the released configuration",
            "After every change, an impact analysis shows what was re-verified and why the rest is still valid",
            "Tools and rigs that produce the evidence must themselves be trustworthy (tool confidence, calibration)",
          ],
        },
        { kind: "sources", refs: ["aw04-r12", "aw04-r13", "aw04-r14", "aw04-r15", "aw04-r11"] },
      ],
    },
  ],
  scenarios: [
    {
      id: "aw04-s2",
      title: "The assessor asks for the chain",
      dayInLife: true,
      context: md`You sit in, at the customer's invitation, on a functional safety assessment preparation meeting for an illustrative drive program (an archetype). The program's software release 4.1 changed the torque-monitoring module. The assessor's pre-read question: "For safety goal SG-02 (no unintended torque), show me the verification of every derived requirement on release 4.1, and the impact analysis of the torque-monitoring change."`,
      start: "a",
      concepts: ["aw04.safety-requirement-chain", "aw04.change-impact-regulated", "aw04.tool-confidence"],
      nodes: {
        a: {
          md: md`The test lead has a trace report from the requirements tool showing all 46 requirements under SG-02 linked to tests, and an Xray execution for "4.1" with all PASS. The safety manager asks you whether that is enough. What do you point out?`,
          choices: [
            { text: "It looks complete: 46 of 46 linked and passing.", next: "b", score: 2, feedback: "That is link coverage plus a label. The assessor will ask which build '4.1' was, and whether all 46 were run on it or carried over." },
            { text: "Check two things: that each PASS was produced on the actual 4.1 build (hash), hardware revision and a calibrated rig; and that the impact analysis lists which of the 46 were rerun because of the torque-monitoring change and justifies any that were not.", next: "c", score: 9, feedback: "Exactly the assessor's two questions: evidence on the released configuration, and a reasoned change impact." },
          ],
        },
        b: {
          md: md`The safety manager checks: 12 of the 46 PASS results were carried over from release 4.0 because "nothing changed for them". There is no written analysis. What now?`,
          choices: [
            { text: "Write an impact analysis for each of the 12: the torque-monitoring change, why it cannot affect them (or rerun those it can), signed by the owner.", next: "c", score: 7, feedback: "Recovers the situation. Carry-over is allowed when reasoned and recorded." },
            { text: "Mark them as passed on 4.1 in Xray to tidy the report.", score: 0, feedback: "That falsifies evidence. It is the worst possible outcome in an assessment and can invalidate the whole safety case." },
          ],
        },
        c: {
          md: md`The analysis finds 8 tests that depend on the torque-monitoring module but were not rerun. Two of them run on an endurance rig booked for two weeks. Release to the customer is in five days. The program manager suggests Ripple's selection, which did not include those 8, is "good enough evidence". What do you advise?`,
          choices: [
            { text: "Agree: Ripple's selection is the impact analysis.", score: 1, feedback: "A tool recommendation is not evidence. Ripple missed a real dependency here, and without qualification and review it cannot carry an ASIL argument." },
            { text: "Rerun the 6 tests that fit this week; for the 2 endurance tests, either negotiate rig time, or release with a documented deviation the safety manager and assessor accept, with the reruns scheduled. Feed the missed dependency back so the trace graph and Ripple's model include it.", score: 10, feedback: "Right: evidence first, a transparent deviation where physics and time do not allow, and the escape turned into a fix of the dependency model." },
            { text: "Delay the release until all 8 are done, without discussing options.", score: 6, feedback: "Safe, but you skipped the documented-deviation route that the customer and assessor may accept for the endurance tests." },
          ],
        },
      },
    },
  ],
  quiz: [
    {
      id: "aw04-l04-q1",
      type: "numeric",
      prompt: md`A hazardous event is rated S3, E3, C3. Using the sum rule, what is the ASIL as a number (A = 1, B = 2, C = 3, D = 4)?`,
      answer: 3,
      tolerance: { abs: 0.1 },
      explanation: md`$3 + 3 + 3 = 9$, so **ASIL C**.`,
      concepts: ["aw04.integrity-levels"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw04-l04-q2",
      type: "mcq",
      prompt: "In IEC 61508, what PFH range corresponds to SIL 2 for a high-demand or continuous safety function?",
      options: ["1e-6 to 1e-5 per hour", "1e-7 to 1e-6 per hour", "1e-8 to 1e-7 per hour", "1e-3 to 1e-2 per hour"],
      answer: 1,
      explanation: md`SIL 2: $\ge 10^{-7}$ to $< 10^{-6}$ dangerous failures per hour. The 1e-3 to 1e-2 range is SIL 2 for **low-demand** PFDavg, a common mix-up.`,
      concepts: ["aw04.integrity-levels"],
      difficulty: 2,
    },
    {
      id: "aw04-l04-q3",
      type: "mcq",
      prompt: "Under ISO 26262-8, a tool with TI2 and TD3 has which tool confidence level?",
      options: ["TCL1", "TCL2", "TCL3", "No TCL is needed"],
      answer: 2,
      explanation: md`TI2 (can fail to detect or introduce an error) with TD3 (low chance anything else catches it) gives **TCL3**, the most demanding qualification.`,
      concepts: ["aw04.tool-confidence"],
      difficulty: 2,
    },
    {
      id: "aw04-l04-q4",
      type: "multi",
      prompt: "Which items would you expect in the technical documentation for machinery under Regulation (EU) 2023/1230? (Select all that apply.)",
      options: [
        "Risk assessment and the protective measures taken",
        "Reports and results of tests and checks",
        "The list of harmonised standards or other specifications applied",
        "Marketing materials and price lists",
        "Instructions and the EU declaration of conformity",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`The file shows conformity: risks, measures, standards, verification evidence, instructions and the declaration. Commercial materials are not part of it.`,
      concepts: ["aw04.technical-file"],
      difficulty: 1,
    },
    {
      id: "aw04-l04-q5",
      type: "numeric",
      prompt: md`How many failure-free hours are needed to demonstrate $\lambda < 10^{-6}$/h with 90 % confidence? (h)`,
      answer: 2302585,
      tolerance: { rel: 0.01 },
      unit: "h",
      explanation: md`$T = -\ln(0.10)/10^{-6} = 2.303/10^{-6} \approx 2.3 \times 10^{6}$ h, over 260 rig-years. Integrity claims need analysis plus process, not test hours alone.`,
      concepts: ["aw04.integrity-levels"],
      difficulty: 2,
    },
    {
      id: "aw04-l04-q6",
      type: "mcq",
      prompt: "Which IEC 61508-3 tool class fits a tool that selects which regression tests to run?",
      options: ["T1: cannot affect the executable", "T2: supports verification; an error could fail to reveal a defect", "T3: generates executable outputs", "Not a tool in the sense of the standard"],
      answer: 1,
      explanation: md`It cannot create defects in the code, but a wrong selection can leave one undetected: T2.`,
      concepts: ["aw04.tool-confidence"],
      difficulty: 2,
    },
    {
      id: "aw04-l04-q7",
      type: "decision",
      prompt: md`A customer's validation lead asks Afterwave to state in the proposal that "Ripple is ISO 26262 compliant". What do you write?`,
      options: [
        { text: "Write it: it will help close the deal.", score: 0, feedback: "Tools are not 'compliant'; they are classified and qualified for a use case by the customer, with the vendor's evidence. A false claim is a legal and reputational risk." },
        { text: "Explain that tool confidence is determined by the customer for their use case (TI, TD, TCL), and offer the reasoning output, a tool safety manual and a qualification plan to support it, to be confirmed with their assessor.", score: 1, feedback: "Accurate, useful and still sells: it shows you understand their process." },
        { text: "Say nothing about standards.", score: 0.3, feedback: "Avoids the false claim but misses the chance to show you understand what their assessor will ask." },
      ],
      explanation: md`ISO 26262-8 places tool classification with the user, for a defined use case. The vendor provides evidence that makes qualification possible.`,
      concepts: ["aw04.tool-confidence"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw04-l04-f1", front: "ISO 26262 chain", back: "HARA (S, E, C) to ASIL and safety goals, to functional safety requirements, to technical safety requirements, to HW and SW safety requirements, each traced to verification.", concepts: ["aw04.safety-requirement-chain"] },
    { id: "aw04-l04-f2", front: "ASIL sum rule", back: md`$S + E + C$: 10 = D, 9 = C, 8 = B, 7 = A, 6 or less = QM (for S1 to S3, E1 to E4, C1 to C3).`, concepts: ["aw04.integrity-levels"] },
    { id: "aw04-l04-f3", front: "SIL 3 PFH range", back: md`$10^{-8}$ to $10^{-7}$ dangerous failures per hour (high demand or continuous).`, concepts: ["aw04.integrity-levels"] },
    { id: "aw04-l04-f4", front: "Zero-failure test time", back: md`$T = -\ln(1-C)/\lambda$: $10^{-7}$/h at 95 % needs about $3 \times 10^{7}$ h.`, concepts: ["aw04.integrity-levels"] },
    { id: "aw04-l04-f5", front: "TCL from TI and TD", back: "TI1 gives TCL1. TI2 with TD1, TD2, TD3 gives TCL1, TCL2, TCL3.", concepts: ["aw04.tool-confidence"] },
    { id: "aw04-l04-f6", front: "IEC 61508-3 tool classes", back: "T1 no effect on executable; T2 verification support (can miss defects); T3 generates the executable.", concepts: ["aw04.tool-confidence"] },
    { id: "aw04-l04-f7", front: "Machinery Regulation entry date", back: "Regulation (EU) 2023/1230 applies from 20 January 2027; ML-based safety functions fall under Annex I Part A (notified body).", concepts: ["aw04.technical-file"] },
    { id: "aw04-l04-f8", front: "Two assessor questions after a change", back: "Was every requirement verified on the released configuration? What changed, and what was re-verified or justified?", concepts: ["aw04.change-impact-regulated"] },
  ],
};

export default lesson;
