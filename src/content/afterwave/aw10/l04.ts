import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw10-l04",
  title: "Automotive and AI: ISO 26262, SOTIF, ISO/PAS 8800 and ISO/IEC TR 5469",
  summary:
    "The automotive safety model that drive, battery and autonomy teams were trained on: ISO 26262 hazard analysis and ASIL, the V-model, hardware metrics and tool confidence; then ISO 21448 SOTIF for hazards without faults, ISO/PAS 8800 for machine learning in vehicles and ISO/IEC TR 5469 for AI in functional safety generally, with the statistics of why driving or running more hours cannot alone prove an AI function safe.",
  minutes: 80,
  objectives: [
    "Run a simple HARA and assign an ASIL from severity, exposure and controllability",
    "Place work products on the ISO 26262 V-model and explain why verification on the right mirrors specification on the left",
    "Compute single-point and latent fault metrics and compare them with ASIL targets",
    "Explain SOTIF's four areas and triggering conditions, and why SOTIF exists alongside ISO 26262",
    "Summarise what ISO/PAS 8800 and ISO/IEC TR 5469 add for AI, and compute the failure-free exposure needed to demonstrate a target rate",
  ],
  concepts: [
    { id: "aw10.asil", name: "ASIL and HARA", description: "ISO 26262 hazard analysis and risk assessment rates each hazardous event by severity (S0 to S3), exposure (E0 to E4) and controllability (C0 to C3) and assigns an Automotive Safety Integrity Level from QM (no special measures) to ASIL D (most stringent).", competency: "aw-safety", related: ["aw10.plr-risk-graph", "aw10.sil-bands"] },
    { id: "aw10.v-model", name: "V-model", description: "The development model in ISO 26262: requirements and design decompose down the left side (item, system, hardware and software), and each level is verified by an integration or test activity on the right, ending in safety validation of the vehicle.", competency: "aw-safety", related: ["aw10.asil"] },
    { id: "aw10.hw-metrics", name: "Hardware architectural metrics", description: "Single-point fault metric (SPFM), latent fault metric (LFM) and probabilistic metric for random hardware failures (PMHF), with targets per ASIL (for ASIL D: SPFM at least 99%, LFM at least 90%, PMHF below 1e-8 per hour).", competency: "aw-safety", related: ["aw10.failure-modes", "aw10.asil"] },
    { id: "aw10.sotif", name: "SOTIF (ISO 21448)", description: "Safety of the intended functionality: absence of unreasonable risk from functional insufficiencies (incomplete specification, performance limitations of sensors and algorithms) under triggering conditions, when nothing has failed.", competency: "aw-safety", related: ["aw10.random-systematic", "aw10.asil"] },
    { id: "aw10.ai-safety-standards", name: "AI safety standards (ISO/PAS 8800, ISO/IEC TR 5469)", description: "ISO/PAS 8800:2024 adapts automotive safety to machine-learning elements (AI safety requirements, data lifecycle, verification, field monitoring); ISO/IEC TR 5469:2024 is an informative cross-sector report on using AI in and for functional safety.", competency: "aw-safety", related: ["aw10.sotif", "aw10.architectural-constraints"] },
    { id: "aw10.demonstration-statistics", name: "Failure-free demonstration statistics", description: "To show a failure rate below lambda with confidence C and zero failures you need exposure t = -ln(1 - C)/lambda; for rare-event targets this is impractically large, so safety arguments combine testing with design, analysis and coverage.", competency: "aw-safety", related: ["aw10.sotif", "aw10.random-systematic"] },
    { id: "aw10.tool-confidence", name: "Tool confidence level (TCL)", description: "ISO 26262-8 classification of a software tool by tool impact (TI1, TI2: can its error introduce or fail to detect a fault?) and tool error detection (TD1 to TD3), giving TCL1 to TCL3; TCL2 and TCL3 tools need qualification.", competency: "aw-safety", related: ["aw10.v-model"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "ISO 26262, SOTIF and the AI layer",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Ismail and Yusuf validated drive units and inverters at Tesla, and many engineers at humanoid and robotics companies came from automotive. They think in ASILs, the V-model and SOTIF, and they will judge Afterwave by whether it fits that model. Two parts matter most commercially: the right side of the V (where test evidence is produced and must be traceable to requirements) and the AI standards (where nobody yet knows what enough evidence looks like). And one clause matters for the product itself: tool qualification, because a tool that decides which tests to skip can hide a fault.`,
        },
        {
          kind: "md",
          md: md`### ISO 26262 in one page

**ISO 26262:2018** (second edition, 12 parts) is the functional safety standard for electrical and electronic systems in series road vehicles. It is the automotive adaptation of IEC 61508. A third edition is in work with a draft expected around 2026 and publication around 2027 (single secondary source, unverified).

The safety lifecycle starts with the **item** (a system or function at vehicle level, such as "battery management" or "electric drive torque control") and its **hazard analysis and risk assessment (HARA)**. Each hazardous event is rated:

| Parameter | Classes | Meaning |
|---|---|---|
| Severity S | S0 no injuries; S1 light and moderate; S2 severe, survival probable; S3 life-threatening, survival uncertain, fatal | How bad is the harm |
| Exposure E | E0 incredible; E1 very low; E2 low; E3 medium; E4 high probability | How often the operating situation occurs |
| Controllability C | C0 controllable in general; C1 simply; C2 normally; C3 difficult or uncontrollable | Can the driver or others avoid harm |

A useful memory aid for the ASIL table: with S1 to S3, E1 to E4, C1 to C3 counted as numbers, the sum $S+E+C$ gives **10 = ASIL D, 9 = C, 8 = B, 7 = A, 6 or less = QM**. Any class 0 gives QM. Each hazardous event then gets a **safety goal** ("avoid unintended acceleration above x m/s² for longer than y ms") with that ASIL, which flows down to functional and technical safety requirements.`,
        },
        { kind: "equation", formula: "aw10-asil-sum" },
        {
          kind: "md",
          md: md`### The V-model

Left side, top to bottom: item definition and HARA, functional safety concept, technical safety concept and system architecture, hardware and software requirements and design, implementation. Right side, bottom to top: unit verification, software and hardware integration testing, system integration testing, vehicle integration, **safety validation**. Each test activity verifies the specification at the same level on the left, and **bidirectional traceability** (requirement to test, test to requirement) is required. Supporting processes in Part 8 cover configuration management, change management with impact analysis, verification, documentation and **confidence in the use of software tools**. Confirmation measures (reviews, audits and the functional safety assessment) need increasing independence as ASIL rises.

### Hardware metrics

Part 5 asks how well the hardware architecture handles random faults:`,
        },
        { kind: "equation", formula: "aw10-spfm" },
        { kind: "equation", formula: "aw10-lfm" },
        {
          kind: "md",
          md: md`| Target | ASIL B | ASIL C | ASIL D |
|---|---|---|---|
| SPFM | at least 90% | at least 97% | at least 99% |
| LFM | at least 60% | at least 80% | at least 90% |
| PMHF (per hour) | below $10^{-7}$ | below $10^{-7}$ | below $10^{-8}$ |

### Tool confidence: why Ripple is a safety-relevant tool

ISO 26262-8 classifies every software tool used in development by **tool impact** (TI1: no possibility that a malfunction introduces or fails to detect an error in the safety-related item; TI2: possible) and **tool error detection** (TD1 high confidence that a tool error would be caught, TD2 medium, TD3 low). TI1 gives TCL1; TI2 with TD1, TD2, TD3 gives TCL1, TCL2, TCL3. TCL2 and TCL3 tools need **qualification** (increased confidence from use, evaluation of the development process, validation of the tool, or development to a safety standard), with methods chosen by ASIL. IEC 61508-3 has a similar classification (T1, T2, T3). A test-selection tool that tells a team "you do not need to rerun this test" can fail to detect an error: it is TI2, and unless its output is independently checked it is likely TCL2 or TCL3. Lesson 6 turns this into a product decision.

### SOTIF: hazards when nothing is broken

ISO 26262 handles malfunctions. But an automated emergency braking system can work exactly as designed and still brake for a shadow or miss a pedestrian in glare. **ISO 21448:2022, safety of the intended functionality** covers hazards from **functional insufficiencies**: insufficiencies of specification (a situation nobody specified) and **performance limitations** (sensors, perception, algorithms), activated by **triggering conditions** (rain, low sun, an unusual object, an unexpected human action).

SOTIF divides scenarios into four areas and aims to shrink the unsafe ones: identify unknown unsafe scenarios (move area 3 to 2) and then make them safe by design or by restricting the operational design domain (move area 2 to 1). Acceptance is argued with **validation targets**: for example, a rate of hazardous behaviour no worse than a stated reference, demonstrated by a mix of analysis, simulation, test track and road exposure.`,
        },
        {
          kind: "matrix",
          title: "SOTIF scenario areas",
          xAxis: ["Not hazardous", "Hazardous"],
          yAxis: ["Unknown", "Known"],
          cells: [
            { label: "Area 1: known, not hazardous", detail: "Specified and shown safe. The goal is to make this as large as possible." },
            { label: "Area 2: known hazardous", detail: "Identified triggering conditions with unacceptable behaviour: fix by design, restrict the ODD, or warn." },
            { label: "Area 4: unknown, not hazardous", detail: "Not yet analysed but harmless; no action needed beyond discovery." },
            { label: "Area 3: unknown hazardous", detail: "The real danger. Reduced by systematic scenario search, simulation, fleet monitoring and test coverage of triggering conditions." },
          ],
          caption: "Testing finds area 3 scenarios only if the test set covers the triggering conditions. More of the same driving or running mostly re-confirms area 1.",
        },
        {
          kind: "md",
          md: md`### AI-specific documents

**ISO/PAS 8800:2024, Road vehicles: safety and artificial intelligence** (published 13 December 2024, ISO/TC 22/SC 32) applies to machine-learning elements inside vehicle E/E systems. It builds on ISO 26262 and ISO 21448 and adds:

- an AI safety lifecycle with **AI safety requirements** derived from the system (for example per-class performance, robustness to defined perturbations, uncertainty estimation);
- **data as a work product**: dataset requirements, data collection and labelling processes, dataset verification, bias and coverage analysis, data lifecycle management;
- verification and validation of the AI element, including robustness and out-of-distribution testing;
- safety analysis of AI elements and measures such as monitors and fallbacks;
- **field monitoring** after deployment and a process for retraining and change.

A second part was reportedly abandoned as a preliminary work item in March 2026 (unverified).

**ISO/IEC TR 5469:2024, Artificial intelligence: functional safety and AI systems** (published January 2024, ISO/IEC JTC 1/SC 42) is a **Technical Report**: informative, no requirements, nothing to certify against. It discusses how AI can be used inside a safety function, to develop one, or alongside one; properties that matter (robustness, reliability, transparency, controllability); a classification of AI usage and technology by how far existing functional safety methods can be applied; and risk-reduction patterns such as supervising an AI element with a conventional safety monitor. A follow-on technical specification, **ISO/IEC TS 22440**, is in development (stage unverified).

For machinery: the Machinery Regulation puts safety components with self-evolving ML behaviour in **Annex I Part A** (mandatory third-party assessment) from 20 January 2027, and no harmonised standard yet covers them. Module aw11 covers the legal route.

### Why hours alone cannot prove a rare-event rate

If a system has failure rate $\lambda$ and you observe it for $t$ hours (or miles) with zero failures, the confidence that the true rate is below $\lambda$ is $C = 1 - e^{-\lambda t}$. Solving for the exposure:`,
        },
        { kind: "equation", formula: "aw10-zero-failure" },
        {
          kind: "md",
          md: md`At 95% confidence, $-\ln(0.05) = 3.0$: you need about three failure-free exposures of $1/\lambda$. To show $10^{-7}$ per hour that is $3 \times 10^7$ hours (about 3,400 years of one unit). The RAND study by Kalra and Paddock (2016) used the same arithmetic to show an automated vehicle would need about **275 million failure-free miles** to demonstrate, at 95% confidence, a fatality rate no worse than the US human rate of 1.09 per 100 million miles. Hence safety arguments for AI combine targeted testing of triggering conditions, simulation, design measures, monitors and field monitoring rather than relying on accumulated exposure.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "ASIL, metrics and demonstration exposure",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "HARA and hardware metrics for a traction battery overcharge",
          given: md`Illustrative EV traction battery management system. Hazardous event: undetected cell overcharge during DC fast charging leads to thermal runaway and fire while occupants may be inside. Proposed rating: S3 (life-threatening), E4 (fast charging is common), C2 (occupants normally able to exit after a warning). FMEDA of the cell-voltage monitoring hardware: total safety-related failure rate 100 FIT; single-point and residual faults 2 FIT; latent multiple-point faults 10 FIT.`,
          steps: [
            { md: md`ASIL: $S + E + C = 3 + 4 + 2 = 9$, so **ASIL C**. If the analysis argued C3 (no warning possible, sleeping occupant), the sum is 10 and ASIL D.` },
            { md: md`SPFM $= 1 - \lambda_{SPF+RF}/\lambda = 1 - 2/100 = 98\%$: meets ASIL C (at least 97%), not ASIL D (99%).` },
            { md: md`LFM $= 1 - \lambda_{MPF,latent}/(\lambda - \lambda_{SPF+RF}) = 1 - 10/98 = 89.8\%$: meets ASIL C (80%), just misses ASIL D (90%).` },
            { md: md`To reach ASIL D the team would add a periodic self-test of the redundant voltage path (turning latent faults into detected ones) and improve coverage of the remaining single-point faults. Each new diagnostic needs **fault injection testing** to show its coverage, on the bench.` },
          ],
          result: md`ASIL C, with metrics that meet C and miss D narrowly. The controllability argument (C2 vs C3) moves the whole programme, and test evidence of the warning's effectiveness is what supports it.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "How much failure-free running would prove a perception stop?",
          given: md`Illustrative. A mobile robot's camera-based person detection triggers a protective stop. The team wants to claim a dangerous miss rate below $10^{-6}$ per hour at 95% confidence, purely from operating hours with zero misses. Their fleet runs 50 robots for 20 h per day, 300 days per year.`,
          steps: [
            {
              md: md`Required exposure: $t = -\ln(0.05)/10^{-6} = 3.0 \times 10^6$ h.`,
              hidden: true,
              check: { prompt: "Required failure-free hours (in millions)", answer: 3.0, unit: "million h", tolerance: { abs: 0.02 } },
            },
            { md: md`Fleet hours per year: $50 \times 20 \times 300 = 300{,}000$ h.` },
            {
              md: md`Years needed: $3.0 \times 10^6 / 300{,}000 = 10$ years, with zero misses, and restarted after every model update.`,
              hidden: true,
              check: { prompt: "Years of fleet operation", answer: 10, unit: "years", tolerance: { abs: 0.1 } },
            },
          ],
          result: md`Ten years of perfect operation, invalidated by every retrain. The practical argument is different: specify the triggering conditions, test them deliberately (lighting, clothing, occlusion, pose), monitor the model with a conventional safety layer, and track field performance. Evidence about **coverage and change impact** matters more than raw hours.`,
        },
        {
          kind: "question",
          question: {
            id: "aw10-l04-p1",
            type: "mcq",
            prompt: "HARA rating S2, E3, C3. Which ASIL?",
            options: ["QM", "ASIL A", "ASIL B", "ASIL C"],
            answer: 2,
            explanation: md`$2 + 3 + 3 = 8$, which corresponds to ASIL B in the ISO 26262-3 table.`,
            concepts: ["aw10.asil"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "How automotive and AI safety evidence is produced",
      blocks: [
        {
          kind: "md",
          md: md`### Who produces what

- **Functional safety manager**: owns the safety plan, the HARA and the safety case; arranges confirmation measures.
- **System and component engineers**: write requirements and design; run FMEDA and FTA.
- **Test and validation engineers** (where Ismail and Yusuf worked): HIL and bench testing of drive units and inverters, fault injection, environmental and durability testing, regression after every software release. Their output is test reports traced to requirements with configuration identity.
- **Tooling**: requirements and traceability (Polarion, codebeamer, DOORS), test management, HIL systems, data loggers. All tools in the chain get a TCL classification.
- **AI teams**: dataset management, model evaluation, scenario libraries, simulation; under ISO/PAS 8800 their datasets and evaluations become safety work products.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "Product decision: design Ripple for tool classification",
          md: md`Expect safety-minded customers to ask: "What TCL is Ripple, and how is it qualified?" The answer that keeps adoption easy is a design where Ripple **recommends** and a human or a conservative rule **decides**, every skipped test is logged with its reason, and a periodic full regression checks Ripple's recommendations (raising tool error detection). That pushes the classification down and gives customers a qualification argument. Building for this early is cheaper than retrofitting it after the first automotive security and safety review.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- **ASIL shopping**: controllability or exposure argued down to reach a cheaper ASIL without evidence.
- **SOTIF as a mileage count**: millions of nominal kilometres reported as safety evidence while triggering conditions are under-tested.
- **Datasets without configuration control**: the model in the vehicle cannot be tied to the data and evaluation that justified it, which breaks ISO/PAS 8800's data lifecycle.
- **Unqualified tools in the evidence chain**: a script that filters test results quietly decides what the safety case sees.`,
        },
        {
          kind: "question",
          question: {
            id: "aw10-l04-p2",
            type: "short",
            prompt: md`Write the **tool classification note** (half a page) that Afterwave could give a customer's functional safety manager for Ripple: state its use case in their V-model, its tool impact and tool error detection under ISO 26262-8 with your reasoning, the resulting TCL, and the product features and usage constraints that justify that classification.`,
            rubric: [
              "Describes the use case precisely (selecting regression tests after a change on the right side of the V-model)",
              "Correctly argues TI2: a wrong recommendation can fail to detect an error in the safety-related item",
              "Argues a TD level based on concrete detection measures (human review, periodic full regression, conservative rules for safety tests)",
              "Derives the TCL correctly from TI and TD and states whether qualification is needed",
              "Lists product features that support the argument (logged reasons per skipped test, always-run list for safety functions, versioned dependency model, audit export)",
              "Leaves the final classification to the customer's safety process and is honest about what is not yet qualified",
            ],
            modelAnswer: md`**Ripple: tool classification note (draft for customer review).**

**Use case**: after a change to firmware, a model, a parameter set or the rig, Ripple proposes which regression tests to rerun on the right side of the V-model (software integration, system integration, bench validation), with a reason for each test selected or not selected.

**Tool impact: TI2.** If Ripple wrongly excludes a test that would have revealed a fault, an error in the safety-related item could go undetected.

**Tool error detection: TD1 in the recommended configuration.** (1) Every test linked to a safety requirement of ASIL B or higher is on an always-run list and never deselected; (2) every deselection is logged with the dependency path that justified it and reviewed by the test lead before the release; (3) a full regression runs at each release candidate and any failure in a deselected test is reported as a Ripple miss. With these measures a Ripple error is very likely to be detected or prevented. Without them, TD2 or TD3 applies.

**TCL**: TI2 with TD1 gives **TCL1**: no qualification needed in this configuration. If the customer uses Ripple without the always-run list or the full release regression, the classification rises to TCL2 or TCL3 and qualification (for example validation of the tool against a reference test history) is needed.

**Supporting features**: versioned dependency model, immutable log of recommendations and decisions, miss reporting from full regressions, export of the evidence for the safety case.

The customer's functional safety manager owns the final classification; this note is our input to it.`,
            explanation: md`TCL is set by tool impact and tool error detection. A test-selection tool is TI2, so the product and usage rules must raise error detection to keep qualification effort low.`,
            concepts: ["aw10.tool-confidence", "aw10.v-model"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain the difference between ISO 26262 and SOTIF using one example of an automatic emergency braking system.",
          keyPoints: [
            "ISO 26262 covers malfunctions: a failed sensor, a software fault, a broken wire causing wrong braking",
            "SOTIF covers hazards when nothing has failed: the system works as designed but the design is insufficient for a situation",
            "Example: braking for a shadow or missing a pedestrian in glare are triggering conditions exposing performance limitations",
            "SOTIF is addressed by finding triggering conditions, improving the design or restricting the ODD, and validating against targets",
          ],
        },
        { kind: "xref", to: "fc04.security-review", note: "Automotive customers will run a tool qualification and safety review alongside the security review; prepare both packs together." },
        { kind: "sources", refs: ["aw10-r11", "aw10-r13", "aw10-r14", "aw10-r15", "aw10-r19", "aw10-r20"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw10-l04-q1",
      type: "numeric",
      prompt: md`FMEDA: total safety-related failure rate 250 FIT, single-point and residual faults 4 FIT. What is the SPFM in %?`,
      answer: 98.4,
      tolerance: { abs: 0.05 },
      unit: "%",
      explanation: md`$1 - 4/250 = 0.984 = 98.4\%$: meets ASIL C (97%), not ASIL D (99%).`,
      concepts: ["aw10.hw-metrics"],
      difficulty: 1,
    },
    {
      id: "aw10-l04-q2",
      type: "mcq",
      prompt: "Which hazard is primarily a SOTIF issue rather than an ISO 26262 issue?",
      options: [
        "A wheel speed sensor's output sticks at a constant value",
        "A lidar-based detector misses a matte black object at night, with all hardware healthy",
        "A memory bit flip corrupts a torque command",
        "A connector corrodes and opens a brake light circuit",
      ],
      answer: 1,
      explanation: md`Missing an object while everything works as designed is a performance limitation under a triggering condition: SOTIF. The others are malfunctions handled by ISO 26262.`,
      concepts: ["aw10.sotif"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw10-l04-q3",
      type: "numeric",
      prompt: md`Zero failures observed. How many failure-free hours are needed to claim a rate below $10^{-5}$ per hour at 90% confidence?`,
      answer: 230259,
      tolerance: { rel: 0.01 },
      unit: "h",
      explanation: md`$t = -\ln(0.1)/10^{-5} = 2.3026/10^{-5} = 230{,}259$ h. At 95% it would be 299,573 h.`,
      concepts: ["aw10.demonstration-statistics"],
      difficulty: 2,
    },
    {
      id: "aw10-l04-q4",
      type: "mcq",
      prompt: "What is ISO/IEC TR 5469:2024?",
      options: [
        "A certifiable standard for AI in machinery",
        "An informative technical report on functional safety and AI systems, with no requirements",
        "The EU harmonised standard for the AI Act",
        "Part 13 of ISO 26262",
      ],
      answer: 1,
      explanation: md`A Technical Report (JTC 1/SC 42) gives guidance only. A follow-on technical specification, ISO/IEC TS 22440, is being developed.`,
      concepts: ["aw10.ai-safety-standards"],
      difficulty: 1,
    },
    {
      id: "aw10-l04-q5",
      type: "order",
      prompt: "Order these ISO 26262 activities from first to last in the lifecycle.",
      items: [
        "Item definition",
        "Hazard analysis and risk assessment",
        "Functional safety concept",
        "Technical safety concept",
        "Hardware and software integration testing",
        "Safety validation",
      ],
      explanation: md`Down the left side of the V (item, HARA, functional then technical safety concept) and up the right (integration testing, then safety validation at vehicle level).`,
      concepts: ["aw10.v-model"],
      difficulty: 2,
    },
    {
      id: "aw10-l04-q6",
      type: "decision",
      prompt: md`An automotive prospect's safety manager says: "If Ripple tells us to skip tests, it is a TCL3 tool and we would have to qualify it. That kills the deal." What is the best reply?`,
      options: [
        { text: "Ripple is not a safety tool, so TCL does not apply.", score: 0, feedback: "Wrong and it will lose you the room. A test-selection tool clearly has tool impact." },
        { text: "Agree it is TI2, and propose a configuration with an always-run list for safety tests, logged and reviewed deselections, and a full regression per release: that gives high tool error detection (TD1), hence TCL1, and you will document it.", score: 1, feedback: "You accept their framework and change the parameter you control." },
        { text: "Offer a discount to cover qualification effort.", score: 0.2, feedback: "Money does not fix a classification problem; design does." },
      ],
      explanation: md`TCL comes from TI and TD. You cannot change TI for a test-selection tool, but product design and usage rules can raise TD to TD1.`,
      concepts: ["aw10.tool-confidence"],
      difficulty: 3,
    },
    {
      id: "aw10-l04-q7",
      type: "multi",
      prompt: "What does ISO/PAS 8800:2024 treat as safety work products or activities for ML elements?",
      options: [
        "Dataset requirements and dataset verification",
        "AI safety requirements derived from the system",
        "Field monitoring after deployment",
        "A requirement that every ML element reaches ASIL D",
        "Robustness and out-of-distribution testing",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`ISO/PAS 8800 adds a data lifecycle, AI safety requirements, verification and validation including robustness, and field monitoring. It does not mandate ASIL D for ML elements.`,
      concepts: ["aw10.ai-safety-standards"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw10-l04-f1", front: "ASIL sum shortcut", back: "S + E + C (S1 to 3, E1 to 4, C1 to 3): 10 = D, 9 = C, 8 = B, 7 = A, 6 or less = QM. Any class 0 = QM.", concepts: ["aw10.asil"] },
    { id: "aw10-l04-f2", front: "ASIL D hardware targets", back: "SPFM >= 99%, LFM >= 90%, PMHF < 1e-8 per hour.", concepts: ["aw10.hw-metrics"] },
    { id: "aw10-l04-f3", front: "SOTIF in one line", back: "Absence of unreasonable risk from functional insufficiencies (specification gaps, performance limitations) under triggering conditions, with nothing failed.", concepts: ["aw10.sotif"] },
    { id: "aw10-l04-f4", front: "ISO/PAS 8800:2024", back: "Road vehicles, safety and AI. Published 13 Dec 2024 (ISO/TC 22/SC 32). Adds AI safety requirements, data lifecycle, AI V&V, field monitoring.", concepts: ["aw10.ai-safety-standards"] },
    { id: "aw10-l04-f5", front: "ISO/IEC TR 5469:2024", back: "Informative report (JTC 1/SC 42, Jan 2024) on functional safety and AI systems. Follow-on: ISO/IEC TS 22440 in development.", concepts: ["aw10.ai-safety-standards"] },
    { id: "aw10-l04-f6", front: "Zero-failure demonstration exposure", back: md`$t = -\ln(1-C)/\lambda$; at 95% about $3/\lambda$.`, concepts: ["aw10.demonstration-statistics"] },
    { id: "aw10-l04-f7", front: "TCL from TI and TD", back: "TI1: TCL1. TI2 with TD1, TD2, TD3: TCL1, TCL2, TCL3. TCL2 and 3 need qualification.", concepts: ["aw10.tool-confidence"] },
  ],
};

export default lesson;
