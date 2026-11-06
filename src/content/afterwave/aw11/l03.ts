import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw11-l03",
  title: "Conformity assessment, the technical file and CE marking",
  summary:
    "How a manufacturer proves conformity: the Annex I high-risk categories (Part A always needs a notified body, Part B only when harmonised standards are not fully applied), the conformity assessment modules (A, B plus C, H, G), the technical documentation and what it must contain for software and ML, the EU declaration of conformity, CE marking, and harmonised standards with their presumption of conformity, including their status for the Regulation in late 2026. Ends with backward scheduling from a market date.",
  minutes: 80,
  objectives: [
    "Choose the conformity assessment route for a machine from its Annex I classification",
    "Explain what a notified body does in Modules B, C, H and G, and when its number follows the CE marking",
    "List the contents of the technical documentation, including what is specific to software and ML",
    "Explain presumption of conformity, the A, B and C standard types, and the standards status for 2023/1230",
    "Build a backward schedule to a market date and compute slack and evidence coverage",
  ],
  concepts: [
    { id: "aw11.annex-i-categories", name: "Annex I high-risk categories (Parts A and B)", description: "Part A machinery always needs third-party conformity assessment, and includes safety components and embedded systems with self-evolving ML behaviour ensuring safety functions; Part B may use internal control only with harmonised standards or common specifications covering all relevant EHSRs.", competency: "aw-safety", related: ["aw11.conformity-modules", "aw11.harmonised-standards"] },
    { id: "aw11.conformity-modules", name: "Conformity assessment modules", description: "Standard procedures from the New Legislative Framework: Module A internal production control, Module B EU type-examination with Module C conformity to type, Module H full quality assurance, Module G unit verification.", competency: "aw-safety", related: ["aw11.annex-i-categories", "aw11.technical-file"] },
    { id: "aw11.technical-file", name: "Technical documentation (technical file)", description: "The manufacturer's evidence that the machine meets the EHSRs: description, drawings, risk assessment, standards applied, test reports, instructions and, for software and ML, safety software and system characteristics; kept 10 years.", competency: "aw-safety", related: ["aw11.declaration-ce"] },
    { id: "aw11.declaration-ce", name: "EU declaration of conformity and CE marking", description: "The manufacturer's signed statement that the machine meets all applicable Union law, and the marking affixed before placing on the market; partly completed machinery gets a declaration of incorporation instead and no CE marking.", competency: "aw-safety", related: ["aw11.technical-file"] },
    { id: "aw11.harmonised-standards", name: "Harmonised standards and presumption of conformity", description: "European standards produced under a Commission request whose references are published in the Official Journal; applying them gives a presumption of conformity with the EHSRs they cover.", competency: "aw-safety", related: ["aw11.annex-i-categories"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Routes, documents and standards",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`The conformity route decides a manufacturer's calendar: self-certification can be finished in-house, a notified body adds months and an external reviewer who asks for evidence. When a humanoid or cobot maker discovers its ML safety function puts it in Annex I Part A, the test evidence for the technical file becomes the critical path. That is the moment Afterwave is most useful, and you need to recognise it from the first call.`,
        },
        {
          kind: "flow",
          title: "Choosing the conformity assessment route",
          steps: [
            { label: "1. Is it machinery or a related product?", detail: "Machinery, safety component (physical or digital), interchangeable equipment, lifting accessory, partly completed machinery..." },
            { label: "2. Partly completed?", detail: "Declaration of incorporation plus assembly instructions; no CE marking. The integrator assesses the complete machine." },
            { label: "3. Listed in Annex I Part A?", detail: "Includes ML safety components and embedded ML safety systems. Notified body mandatory: B + C, H or G." },
            { label: "4. Listed in Annex I Part B?", detail: "Module A allowed only if harmonised standards or common specifications covering all relevant EHSRs are applied; otherwise B + C, H or G." },
            { label: "5. Not listed", detail: "Module A, internal production control: the manufacturer self-assesses and keeps the technical file." },
            { label: "6. Declare and mark", detail: "EU declaration of conformity, CE marking (plus notified-body number if it controls production), instructions." },
          ],
          caption: "Simplified from the conformity assessment provisions of Regulation 2023/1230. Other Union law (EMC, radio, low voltage, CRA, AI Act via the Regulation) may add its own requirements to the same declaration.",
        },
        {
          kind: "md",
          md: md`### Annex I: what is high-risk

Annex I lists categories that need more than self-assessment.

- **Part A** (third-party assessment always required): a short list including, for the first time, **safety components with fully or partially self-evolving behaviour using machine learning approaches ensuring safety functions**, and **machinery with embedded systems of that kind**, where the system was not placed on the market independently, in respect of those systems only.
- **Part B**: the longer list carried over from the Directive's Annex IV (for example certain woodworking machines, presses, protective devices for detecting persons, logic units for safety functions, rollover protective structures). Self-certification only with full application of harmonised standards or common specifications.

What counts as "self-evolving behaviour using ML" is the most consequential open interpretation for physical AI. A model that keeps learning in the field clearly qualifies. A model trained once and locked at release is read by some as covered (it was produced by ML and its behaviour is not fully specified by rules) and by others as not covered (it does not evolve after placing on the market). Until Commission guidance or notified-body practice settles it, a careful manufacturer with an ML safety function plans for Part A.

### The modules

| Module | Annex | Who does what | NB number after CE? |
|---|---|---|---|
| **A** Internal production control | VI | Manufacturer prepares the technical file, controls production, declares | No NB |
| **B** EU type-examination | VII | NB examines the technical design and, as needed, a specimen; issues an EU type-examination certificate | (B alone does not end in CE) |
| **C** Conformity to type (internal production control) | VIII | Manufacturer ensures each unit matches the examined type | No |
| **H** Full quality assurance | IX | NB approves and surveils the manufacturer's quality system for design, production and testing | Yes |
| **G** Unit verification | X | NB examines and tests each individual unit | Yes |

The notified body's number follows the CE marking when the body is involved in the **production control phase** (H, G); after B plus C the CE marking stands alone.

### Technical documentation (Annex IV)

The technical file must let an authority or notified body judge conformity. Its core contents:

1. General description of the machine, overall drawings, control circuit diagrams and descriptions needed to understand operation.
2. Detailed drawings, calculations and **test results** needed to check conformity with the EHSRs.
3. The **risk assessment**: applicable EHSRs, protective measures, residual risks.
4. **Standards and technical specifications** applied, and which EHSRs they cover.
5. **Technical reports** with results of tests carried out by the manufacturer or a body it chose.
6. Instructions for use and, where relevant, the declaration of incorporation of included partly completed machinery.
7. For series production, the internal measures that keep units in conformity.
8. For safety-related software: on reasoned request, the **source code or programming logic**, to verify conformity.
9. For ML-based systems: a description of the system's **characteristics, capabilities and limitations**, the data, and the **development, testing and validation** processes used.

It is kept for 10 years after placing on the market and supplied on request in a language the authority understands.

### Harmonised standards

A **harmonised standard** is a European standard adopted by CEN, CENELEC or ETSI at the Commission's request, whose reference is **published in the Official Journal** under a given act. Applying it gives a **presumption of conformity** with the EHSRs it covers: the burden shifts, and an authority must show the machine is unsafe despite it. Standards stay voluntary. Machinery standards come in three types: **type A** (basic concepts, ISO 12100), **type B** (generic safety aspects and devices, for example ISO 13849-1, ISO 13855), and **type C** (specific machine types, for example ISO 10218-1 and -2 for industrial robots). Where standards are missing or insufficient, the Commission can adopt **common specifications** by implementing act.

Status for 2023/1230 as of November 2026, per the research brief:

| Item | Status |
|---|---|
| Standardisation request | M/605, Commission Decision C(2025)129 of 20 January 2025, running to 20 January 2035 |
| Approach | Mostly **re-citing** existing Directive standards, some with restrictions on the presumption (presented to the Machinery Expert Group in October 2026) |
| First list under the Regulation | Expected before end-2026 (unverified) |
| ISO 12100 revision | ISO/DIS 12100.3:2026, largely editorial, not yet published |
| ISO 10218-1/-2:2025 | Published February 2025; EN citation under the Regulation unverified |
| Humanoid-specific standard (ISO 25785-1) | Not published; working or committee draft |
| ML or self-evolving safety functions | **No harmonised standard**; ISO/IEC TR 5469 is informative only |

So the AI parts of the Regulation have no presumption route yet. For Part A this changes nothing (a notified body is mandatory anyway), but the notified body will judge evidence against the EHSRs and the state of the art directly, which raises the bar on test evidence.

### Declaration and marking

The **EU declaration of conformity** (Annex V) names the manufacturer (and authorised representative), identifies the machine (model, type, serial number), states that it complies with the Regulation and other applicable Union law, lists harmonised standards or specifications used, names the notified body and certificate where applicable, and is signed. **CE marking** is affixed visibly, legibly and indelibly before placing on the market. Partly completed machinery gets a **declaration of incorporation** and assembly instructions, never a CE marking.

Readiness can be measured with two simple numbers:`,
        },
        { kind: "equation", formula: "aw11-evidence-coverage" },
        { kind: "equation", formula: "aw11-schedule-slack" },
        {
          kind: "callout",
          tone: "unverified",
          title: "Points to confirm in the primary text",
          md: md`From memory and secondary sources, to be checked in the Official Journal: the annex numbering of the modules (VI to X) and of Annex IV and V; the exact wording of the Annex IV items on safety software source code and on ML system characteristics; the full Part A list (only the two ML entries are confirmed by the research brief); the maximum validity of EU type-examination certificates; whether CE marking for software-only safety components may be affixed digitally. Omnibus IV (COM(2025) 504) would allow a **digital EU declaration of conformity**; a single secondary source reports committee approval on 14 July 2026 and a plenary indicatively on 23 November 2026, so treat it as pending.`,
        },
        { kind: "sources", refs: ["aw11-r1", "aw11-r15", "aw11-r10", "aw11-r11", "aw11-r16", "aw11-r18", "aw11-r19", "aw11-r24", "aw11-r25"] },
      ],
    },
    {
      layer: "applied",
      title: "Backward scheduling to a market date",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Can an ML safety function make 20 January 2027? (illustrative humanoid maker)",
          given: md`Illustrative: today is 6 November 2026. A humanoid maker wants its first EU units on the market on 20 January 2027, 75 days away. Its person detection is ML-based and drives protective stops, so it plans for Annex I Part A with Module B plus C. Sequential durations (illustrative; ask notified bodies for current lead times): design freeze and risk assessment update 42 days; verification and validation campaign 70 days; technical file compilation 28 days; notified-body type-examination including queue 112 days. Buffer 28 days.`,
          steps: [
            { md: md`**Sum of durations:** $42 + 70 + 28 + 112 = 252$ days, plus $b = 28$ days.` },
            { md: md`**Slack:** $S = 75 - 252 - 28 = -205$ days. The target is not feasible.` },
            { md: md`**Earliest feasible date:** 6 November 2026 + 280 days = **13 August 2027**.` },
            { md: md`**Option 1, parallelise:** compile the technical file during the test campaign, with evidence flowing in as tests complete. The file drops off the critical path: $252 - 28 = 224$ days plus buffer, so the earliest date is 6 November 2026 + 252 days = **16 July 2027**. This needs evidence that is structured as it is produced, not assembled at the end.` },
            { md: md`**Option 2, change the design for EU units:** make the protective stop depend on a conventional, certified safety sensor (for example a safety laser scanner with an established PL), and keep the ML detector for non-safety functions such as smoother path planning. The ML part then no longer ensures a safety function, which may take it out of the Part A entries; the route depends on the rest of the classification. Engineering and product trade-off, to be confirmed with a notified body.` },
            { md: md`**Option 3, ship before the date under the Directive:** units placed on the market before 20 January 2027 can follow 2006/42/EC, which has no ML category. With 75 days left this only works if the Directive file is already complete, and every unit after the date still needs the Regulation.` },
          ],
          result: md`Slack of minus 205 days; the earliest realistic date is July or August 2027, depending on whether the technical file is built in parallel with testing. The choice between options is a product and commercial decision for the manufacturer. Afterwave's angle is option 1: evidence that is captured, versioned and linked to EHSRs as tests run takes about four weeks off the critical path in this illustration.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: evidence coverage and the cost of closing gaps",
          given: md`Illustrative: a cobot cell maker's risk assessment marks 46 EHSRs applicable. 31 have current, linked evidence. Of the 15 gaps, 9 need new bench tests of 14 rig-hours each at EUR 110 per rig-hour; the other 6 need analysis only.`,
          steps: [
            { md: md`Coverage $\kappa = 31/46 =$ **0.674**.`, hidden: true, check: { prompt: "Coverage ratio", answer: 0.674, tolerance: { abs: 0.002 } } },
            { md: md`Rig-hours for the gaps $= 9 \times 14 =$ **126** rig-h.`, hidden: true, check: { prompt: "Rig-hours needed", answer: 126, unit: "rig-h", tolerance: { abs: 0 } } },
            { md: md`Rig cost $= 126 \times 110 =$ **EUR 13,860**.`, hidden: true, check: { prompt: "Rig cost (EUR)", answer: 13860, unit: "EUR", tolerance: { rel: 0.005 } } },
          ],
          result: md`The money to close the gaps is small; the calendar time and the engineering attention are not. That is why the urgency argument is about dates, not test budgets (lesson 5).`,
        },
      ],
    },
    {
      layer: "field",
      title: "Working with notified bodies and building the file",
      blocks: [
        {
          kind: "md",
          md: md`### Notified bodies in practice

- **Find them in NANDO**, the Commission's database of notified bodies, filtered by Regulation 2023/1230 and the Annex I category. Designation under the Directive does not carry over automatically.
- **Engage early.** A pre-assessment meeting before design freeze is normal; bring the classification reasoning, the operating domain and the test plan. The body will not design your evidence, but it will tell you what it expects to see.
- **Capacity is finite.** The research brief found no data on queue lengths; ask bodies directly and plan for months, not weeks, for a new ML category with no harmonised standard.
- **What they ask for ML** (expected, since practice is new): the operating-domain definition, data and model documentation, the verification statistics and their representativeness argument, regression per update, logging and protection-against-corruption evidence, and how updates are controlled after certification.

### How technical files are built

Most manufacturers keep the file as a structured folder or a module in a PLM or requirements tool: one index document mapping each applicable EHSR to measures and evidence identifiers, plus the underlying reports. The failure mode is the same everywhere: the index is assembled at the end, by hand, from reports whose versions no longer match the machine.

### Structuring the argument

A notified body reads the file as an argument: the claim (the machine meets EHSR 1.2.1), the strategy (by fault analysis and testing over the operating domain), and the evidence (named reports). Goal Structuring Notation makes that argument explicit.`,
        },
        { kind: "widget", widget: "gsn-builder", caption: "Build a small safety case for 'The person-detection protective stop meets EHSR 1.2.1 for release R12': a goal, a strategy (argument over operating-domain cells and fault classes), sub-goals and solutions (the test reports). The structural check shows which goals have no evidence." },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Classifying optimistically.** Assuming a locked ML model is outside Part A and discovering otherwise at the notified body.
- **Treating the file as paperwork.** The file is only as good as the test evidence behind it; an authority can ask for it at any time for 10 years.
- **Version drift.** Reports in the file refer to model R9; the machine ships with R12.
- **Waiting for standards.** No harmonised standard for ML safety functions is coming before 2027; waiting is not a plan.
- **Forgetting other acts.** The declaration must list all applicable Union law (for example EMC, radio equipment), not only the Machinery Regulation.`,
        },
        {
          kind: "ask",
          title: "Questions to ask a prospect about its conformity route",
          items: [
            "How have you classified the machine under Annex I, and has a notified body seen that reasoning?",
            "Which notified body, and what lead time has it given you?",
            "Which harmonised standards do you rely on, and do you know whether they will be cited under the Regulation?",
            "Where does your technical file live, and how do you keep test reports in step with software and model versions?",
            "How long did it take, last time, from test completion to a complete file?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw11-l03-p1",
            type: "short",
            prompt: md`**Produce a conformity-route and readiness memo (one page)** for an illustrative autonomous mobile robot maker whose robots use an ML classifier to trigger protective slowdowns and stops, plan EU deliveries from Q3 2027, and update the classifier every two months. Include: (1) Annex I classification with the uncertainty stated; (2) the conformity route and the notified body's role; (3) the technical file items that are new because of ML and software; (4) a backward schedule with your own illustrative durations and the slack; (5) where Afterwave's capture and bench memory would shorten the critical path, stated without overclaiming.`,
            rubric: [
              "Classification addresses Part A (ML safety function) and states the locked-versus-evolving interpretation as open",
              "Route is correct for Part A (B plus C, H or G, notified body mandatory) and explains the NB role and the NB-number rule",
              "Technical file items include risk assessment, test reports, standards applied, safety software source code or logic on request, ML characteristics, data and validation processes, and logging evidence",
              "Backward schedule uses the slack formula correctly with labelled illustrative durations and draws a decision from the result",
              "Afterwave contribution is specific (evidence structured as produced, version-linked, regression per update) and framed as supporting, not achieving, conformity",
              "Notes that harmonised standards do not yet cover ML safety functions",
            ],
            modelAnswer: md`**1. Classification.** The classifier triggers protective stops, so it ensures a safety function. If it counts as "self-evolving behaviour using ML", the robot falls under Annex I Part A (embedded system not placed on the market independently). Whether a classifier locked between releases qualifies is not settled; plan for Part A and confirm with a notified body.

**2. Route.** Part A: EU type-examination (Module B) plus conformity to type (Module C), or full quality assurance (Module H), or unit verification (Module G). With bimonthly updates, Module H may suit better because the body assesses the quality system that controls each release; with B plus C, each update must be checked against the certified type. The NB number follows the CE marking under H, not under B plus C.

**3. New file items.** Operating-domain specification; model card per version with data and validation description; verification statistics with confidence bounds; regression report per release; update envelope in the risk assessment; software version and intervention log design; corruption tests (1.1.9); safety software source code or logic available on request.

**4. Schedule (illustrative).** Target first EU shipment 1 July 2027, 237 days from 6 November 2026. Durations: design freeze 35 d, V&V 84 d, file 28 d, NB 112 d, buffer 21 d: sum 280 d. Slack $= 237 - 259 - 21 = -43$ days. Building the file during V&V removes 28 days: slack $-15$ days, so the NB engagement must also start earlier (pre-assessment during V&V) or the date moves to late July.

**5. Afterwave.** Lockstep captures rig signals and HMI actions on one clock and bench memory stores each result with model, firmware and rig versions, so the EHSR evidence index can be generated as tests complete, and Ripple identifies which tests each bimonthly update must rerun with a written rationale. That shortens file compilation and per-update regression. Conformity remains the manufacturer's responsibility; no harmonised standard covers ML safety functions yet, so the evidence will be judged against the EHSRs and the state of the art.`,
            explanation: md`Graded against the rubric. The memo should be something a compliance lead would forward to his VP without edits.`,
            concepts: ["aw11.annex-i-categories", "aw11.conformity-modules", "aw11.technical-file"],
            difficulty: 3,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw11-l03-q1",
      type: "mcq",
      prompt: "A machine has an embedded ML system that ensures a safety function and is not sold separately. Under which part of Annex I does it most likely fall?",
      options: ["Not listed: Module A", "Part B: Module A with harmonised standards", "Part A: notified body mandatory", "Only the AI Act applies"],
      answer: 2,
      explanation: md`Embedded systems with fully or partially self-evolving ML behaviour ensuring safety functions are a Part A entry. The interpretation for locked models is open, so plan for Part A.`,
      concepts: ["aw11.annex-i-categories"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw11-l03-q2",
      type: "multi",
      prompt: "Which conformity routes are available for Annex I Part A machinery? (Select all that apply.)",
      options: ["Module A internal production control", "Module B plus Module C", "Module H full quality assurance", "Module G unit verification"],
      answer: [1, 2, 3],
      explanation: md`Part A excludes self-certification even with harmonised standards.`,
      concepts: ["aw11.conformity-modules"],
      difficulty: 2,
    },
    {
      id: "aw11-l03-q3",
      type: "numeric",
      prompt: md`Today is 6 November 2026 and the target is 20 January 2027 (75 days). Sequential activities take 30, 45 and 60 days, with a 10-day buffer. What is the slack in days?`,
      answer: -70,
      tolerance: { abs: 0 },
      unit: "days",
      explanation: md`$S = 75 - (30 + 45 + 60) - 10 = 75 - 135 - 10 = -70$ days. Negative: the date cannot be met without parallelising or changing scope.`,
      concepts: ["aw11.conformity-modules"],
      difficulty: 1,
    },
    {
      id: "aw11-l03-q4",
      type: "mcq",
      prompt: "What does applying a harmonised standard whose reference is published in the Official Journal give a manufacturer?",
      options: [
        "Exemption from the risk assessment",
        "A presumption of conformity with the EHSRs the standard covers",
        "Automatic CE certification by a notified body",
        "Protection from product liability claims",
      ],
      answer: 1,
      explanation: md`It is a rebuttable presumption for the covered EHSRs. The risk assessment is still required, and liability is a separate regime.`,
      concepts: ["aw11.harmonised-standards"],
      difficulty: 1,
    },
    {
      id: "aw11-l03-q5",
      type: "mcq",
      prompt: "A robot arm sold for integration into cells, unable to perform a specific application on its own, is shipped with which documents?",
      options: [
        "EU declaration of conformity and CE marking",
        "Declaration of incorporation and assembly instructions, without CE marking under the Machinery Regulation",
        "Nothing; the integrator handles it all",
        "An EU type-examination certificate",
      ],
      answer: 1,
      explanation: md`Partly completed machinery carries a declaration of incorporation and assembly instructions. The integrator does the conformity assessment of the complete machine and affixes the CE marking.`,
      concepts: ["aw11.declaration-ce"],
      difficulty: 2,
    },
    {
      id: "aw11-l03-q6",
      type: "numeric",
      prompt: md`A risk assessment marks 52 EHSRs applicable; 39 have current linked evidence. What is the coverage ratio $\kappa$?`,
      answer: 0.75,
      tolerance: { abs: 0.005 },
      explanation: md`$\kappa = 39/52 = 0.75$. The target is 1: every applicable EHSR must be addressed.`,
      concepts: ["aw11.technical-file"],
      difficulty: 1,
    },
    {
      id: "aw11-l03-q7",
      type: "decision",
      prompt: md`A cobot maker's ML-based separation monitoring is in Part A. Its compliance lead says: "We'll wait for the harmonised standard for ML safety functions, then do Module A." What do you say?`,
      options: [
        { text: "Sensible; standards make it cheaper.", score: 0, feedback: "Part A does not allow Module A even with standards, and no ML standard is expected soon." },
        { text: "Part A needs a notified body regardless of standards, and no harmonised standard covers ML safety functions yet; engage a notified body now and build the evidence against the EHSRs.", score: 1, feedback: "Correct on both the legal route and the standards status." },
        { text: "Use the AI Act harmonised standards instead to self-certify.", score: 0.2, feedback: "AI Act standards may later give presumption for AI requirements, but they do not remove the notified-body requirement for Part A." },
      ],
      explanation: md`Waiting for standards is not a route for Part A.`,
      concepts: ["aw11.annex-i-categories", "aw11.harmonised-standards"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw11-l03-f1", front: "Annex I Part A versus Part B", back: "Part A: notified body always (B+C, H or G); includes ML safety components and embedded ML safety systems. Part B: Module A only with full harmonised standards or common specifications.", concepts: ["aw11.annex-i-categories"] },
    { id: "aw11-l03-f2", front: "Modules A, B, C, H, G", back: "A internal control; B EU type-examination by NB; C conformity to type; H full quality assurance (NB approves QMS); G unit verification (NB checks each unit).", concepts: ["aw11.conformity-modules"] },
    { id: "aw11-l03-f3", front: "When does the NB number follow the CE marking?", back: "When the notified body is involved in the production control phase, for example Modules H and G; not after B plus C.", concepts: ["aw11.declaration-ce"] },
    { id: "aw11-l03-f4", front: "Technical file items new for software and ML", back: "Safety software source code or logic on request; ML system characteristics, capabilities, limitations, data, development, testing and validation processes.", concepts: ["aw11.technical-file"] },
    { id: "aw11-l03-f5", front: "Standards status, November 2026", back: "M/605 request; mostly re-citing Directive standards; first list expected before end-2026 (unverified); no harmonised standard for ML safety functions.", concepts: ["aw11.harmonised-standards"] },
    { id: "aw11-l03-f6", front: "Type A, B, C standards", back: "A: basic concepts (ISO 12100). B: generic aspects and devices (ISO 13849-1). C: specific machines (ISO 10218 for robots).", concepts: ["aw11.harmonised-standards"] },
    { id: "aw11-l03-f7", front: "Schedule slack", back: md`$S = (T_{target} - T_{now}) - \sum d_i - b$. Negative slack forces a scope, design or date decision.`, concepts: ["aw11.conformity-modules"] },
  ],
};

export default lesson;
