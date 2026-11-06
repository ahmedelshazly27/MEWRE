import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw11-l01",
  title: "From the Machinery Directive 2006/42/EC to Regulation (EU) 2023/1230",
  summary:
    "What the new Machinery Regulation is, why it replaces a directive with a directly applicable regulation, when it applies (20 January 2027, notified-body rules since 20 January 2024), what products and digital components it covers, who carries obligations (manufacturer, authorised representative, importer, distributor) and how a substantial modification, including one made by software, turns the modifier into a manufacturer.",
  minutes: 65,
  objectives: [
    "State the key dates of Regulation (EU) 2023/1230 and explain why the change from a directive to a regulation matters",
    "Explain 'placing on the market' per individual unit and compute which shipments fall under the new rules",
    "Distinguish the obligations of manufacturer, authorised representative, importer and distributor",
    "Apply the substantial-modification test to physical and software changes, including model updates",
    "Identify the main changes from the Directive that touch AI, software and connected machines",
  ],
  concepts: [
    { id: "aw11.regulation-shift", name: "Directive to Regulation shift", description: "Regulation (EU) 2023/1230 replaces Directive 2006/42/EC from 20 January 2027; it applies directly in every Member State without national transposition and adds requirements for software, connectivity and AI.", competency: "aw-safety", related: ["aw11.placing-on-market", "aw11.economic-operators"] },
    { id: "aw11.placing-on-market", name: "Placing on the market (per unit)", description: "The first making available of an individual product on the EU market; the rules in force on that date apply to that unit, whatever the date of the model's design or first sale.", competency: "aw-safety", related: ["aw11.regulation-shift"] },
    { id: "aw11.economic-operators", name: "Economic operators", description: "Manufacturer, authorised representative, importer and distributor, each with defined obligations; an importer or distributor who brands or modifies the machine takes on manufacturer obligations.", competency: "aw-safety", related: ["aw11.substantial-modification"] },
    { id: "aw11.substantial-modification", name: "Substantial modification", description: "A physical or digital modification not foreseen or planned by the manufacturer that creates a new hazard or increases a risk enough to need new protective measures; whoever makes it is treated as the manufacturer.", competency: "aw-safety", related: ["aw11.economic-operators", "aw11.regulation-shift"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What changed and who it binds",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`The EU Machinery Regulation is Afterwave's regulatory entry point: from 20 January 2027 every robot, humanoid, drive-equipped machine and autonomous platform placed on the EU market must meet it, and the new parts are exactly about software, updates and machine learning. When a test lead or a head of product compliance asks "what does this actually change for us?", you must answer in their vocabulary, with correct dates and without overclaiming. This lesson gives you the legal skeleton the next four lessons hang on.`,
        },
        {
          kind: "md",
          md: md`### Directive versus regulation

A **directive** binds Member States to a result; each state writes its own law to transpose it. A **regulation** is directly applicable law in every Member State on the same day, with the same text. The Machinery Directive 2006/42/EC (applied from 29 December 2009) worked well enough, but national transposition created small differences, and the Directive predates connected, software-updated and learning machines.

Regulation (EU) 2023/1230 was adopted on 14 June 2023, published in the Official Journal on 29 June 2023 and entered into force on 19 July 2023. It has a long run-in:

| Date | What happens | Status |
|---|---|---|
| 19 July 2023 | Regulation enters into force | Fact |
| 20 January 2024 | Rules on notifying authorities and **notified bodies** apply, so bodies can be designated in time | Fact (research brief) |
| 20 January 2027 | **The Regulation applies**; Directive 2006/42/EC is repealed | Fact; no general postponement found as of November 2026 |
| After 20 January 2027 | Every unit placed on the market must comply with 2023/1230 | Consequence |

Today (6 November 2026) is 75 days before the application date.

### What changed, in one table

| Topic | Directive 2006/42/EC | Regulation 2023/1230 |
|---|---|---|
| Legal form | Directive, transposed nationally | Regulation, directly applicable |
| High-risk list | Annex IV (self-certification allowed when harmonised standards are fully applied) | **Annex I Part A** (third-party assessment mandatory) and **Part B** (self-certification only with harmonised standards or common specifications) |
| AI and ML | Not addressed | Safety components and embedded systems with fully or partially **self-evolving behaviour using machine learning** that ensure safety functions are in Part A |
| Software | Implicit | A **safety component** can be physical or **digital, including software** placed on the market on its own |
| Cybersecurity | Not addressed | New EHSR 1.1.9 **protection against corruption**; control systems must withstand malicious attempts (1.2.1) |
| Logging | Not addressed | Tracing logs of safety software versions and interventions, and for self-evolving systems data on safety-related decisions (EHSR 1.2.1) |
| Human-machine interaction | General ergonomics | Ergonomics explicitly covers psychological stress and machines that **communicate planned actions** (EHSR 1.1.6) |
| Instructions | Paper | **Digital** instructions allowed; paper on request |
| Modification | Case law and guidance | Defined **substantial modification**, explicitly including digital means |
| Operators | Mainly the manufacturer | Manufacturer, authorised representative, **importer**, **distributor** with Regulation-level duties (New Legislative Framework alignment) |

### Scope: what is covered

The Regulation covers machinery and "related products": interchangeable equipment, **safety components**, lifting accessories, chains, ropes and webbing, removable mechanical transmission devices, and **partly completed machinery** (which cannot work on its own and is meant for incorporation, such as a robot arm sold without its cell). A machine is an assembly of linked parts, at least one moving, joined for a specific application; the definition now also covers assemblies that lack only their software or connection to energy for the intended application.

For Afterwave's segments: a humanoid, an autonomous mobile robot, a cobot cell, an actuator test rig with moving parts, an e-drive end-of-line tester: all machinery. A battery pack on its own is not machinery (other rules apply), but the machine it powers is. An ML-based person-detection module sold separately to perform a safety function is a safety component.

### Placing on the market is per unit

"Placing on the market" is the **first making available of an individual product** in the EU (Blue Guide). It is not the date the model was designed, type-tested or first sold. So if a manufacturer ships unit 1 to unit 23 of a model before 20 January 2027 and unit 24 afterwards, unit 24 must comply with the Regulation. Units already on the market under the Directive may continue to be made available.`,
        },
        { kind: "equation", formula: "aw11-mr-share" },
        {
          kind: "md",
          md: md`### Who carries obligations

| Operator | Core obligations (simplified) |
|---|---|
| **Manufacturer** (makes or has the machine designed and made, and markets it under its name) | Meet the EHSRs, do the risk assessment, run the conformity assessment, draw up the **technical documentation** and **EU declaration of conformity**, affix **CE marking**, provide instructions, keep documentation for **10 years**, act on non-conformities |
| **Authorised representative** (EU-based, written mandate) | Holds the declaration and documentation for authorities, cooperates with them; required in practice for non-EU manufacturers |
| **Importer** (EU-based, places a third-country product on the market) | Checks that conformity assessment was done, documentation exists, CE marking and instructions are present; puts its own name and address on the product; keeps the declaration 10 years |
| **Distributor** | Checks CE marking, documents and instructions; does not make available a product it believes non-conforming |
| **Anyone who substantially modifies** | Becomes the manufacturer for that machine, with all manufacturer obligations |

An importer or distributor who places a machine under its own name or modifies it so compliance may be affected is treated as the manufacturer. A US or Chinese humanoid maker selling into the EU therefore needs an EU-side partner (authorised representative or importer), and market surveillance authorities will deal with that partner (Regulation (EU) 2019/1020).

### Substantial modification

The Regulation defines a **substantial modification** as a modification, by physical or **digital** means, after the machine was placed on the market or put into service, that was **not foreseen or planned by the manufacturer**, and that affects safety by creating a new hazard or increasing an existing risk so that new guards or protective devices (requiring changes to the safety control system) or extra protective measures for stability or mechanical strength are needed.

Two words carry most of the weight for physical AI companies:
1. **Digital**: an over-the-air firmware or model update can be a substantial modification.
2. **Foreseen or planned**: if the original risk assessment and conformity assessment covered the update envelope (what can change, within which limits, verified how), the update is not a substantial modification. If not, whoever pushes the update may become the manufacturer of a new machine.

The test result therefore depends on documentation that existed **before** the change.`,
        },
        {
          kind: "matrix",
          title: "Is this change a substantial modification?",
          xAxis: ["Foreseen and planned in the original assessment", "Not foreseen or planned"],
          yAxis: ["No new hazard, no risk increase needing new measures", "New hazard or increased risk needing new protective measures"],
          cells: [
            { label: "Covered update", detail: "Within the assessed envelope: not substantial, but re-verify and record that it stayed within the envelope" },
            { label: "Substantial modification", detail: "Modifier becomes manufacturer: new risk assessment, conformity assessment, declaration and CE marking" },
            { label: "Routine maintenance or update", detail: "Not substantial; keep the change record and software version log" },
            { label: "Unplanned but harmless", detail: "Not substantial, but document why safety is unaffected; this reasoning is what an authority will ask for" },
          ],
          caption: "Top row: the change affects safety. The deciding evidence is the pre-change risk assessment and the post-change verification. Simplified reading of the definition; borderline cases need legal and notified-body input.",
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "What to double-check in the primary text",
          md: md`The research session could not open EUR-Lex, so article numbers and annex wording here are from secondary summaries and memory. Check before quoting externally: (1) the exact transitional provisions for EC type-examination certificates issued under the Directive; (2) the article numbers (definitions in Art. 3, operators who become manufacturers in Arts. 17 and 18, application in Art. 54); (3) the exact wording of the substantial-modification definition. The industry request to postpone some cybersecurity EHSRs (January and February 2026) had no Commission decision found as of November 2026: do not tell a buyer the date has moved.`,
        },
        { kind: "sources", refs: ["aw11-r1", "aw11-r2", "aw11-r9", "aw11-r15", "aw11-r21", "aw11-r12"] },
      ],
    },
    {
      layer: "applied",
      title: "Classifying a manufacturer's exposure",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Which units and which changes fall under the Regulation (illustrative mobile manipulator maker)",
          given: md`Illustrative, not a real company: a European maker of mobile manipulators (an autonomous base plus a 6-axis arm) has 48 units in its order book. Planned deliveries: 8 in November 2026, 10 in December 2026, 5 between 1 and 19 January 2027, and 25 from February 2027. In 2027 it plans three changes: (a) a new grasp-planning model that only affects pick success rate; (b) a retrained ML person-detection model that triggers protective stops, outside the update envelope described in its current risk assessment; (c) a customer's integrator adds a second arm and a higher payload to some units.`,
          steps: [
            { md: md`**Units under the Directive:** placed on the market before 20 January 2027: $8 + 10 + 5 = 23$ units. Each must conform to Directive 2006/42/EC.` },
            { md: md`**Units under the Regulation:** $N_{\geq T} = 25$, so $\varphi = 25/48 = 0.52$. More than half of the order book needs the full 2023/1230 conformity, whatever was done for the first 23.` },
            { md: md`**Change (a), grasp model:** not a safety function; it does not create a new hazard or need new protective measures. Not a substantial modification. Keep the version log and a short safety-impact note: the reason it is harmless is evidence.` },
            { md: md`**Change (b), person-detection model:** a safety function, and the update was not foreseen in the assessed envelope. If it increases risk (for example a different miss rate in poor lighting) and needs new protective measures, it is a substantial modification for units already in the field. For new units it is simply part of the design, but the safety function uses ML, which points to **Annex I Part A** and a notified body (lesson 3).` },
            { md: md`**Change (c), integrator adds an arm:** new hazards (reach, payload, mass, stability). Clearly a substantial modification; the **integrator** becomes the manufacturer of the modified machine and owes a new risk assessment, conformity assessment, declaration and CE marking.` },
          ],
          result: md`52 % of the order book must meet the Regulation; one of three planned changes is likely substantial for fielded units and pushes the design toward third-party assessment; one change moves manufacturer status to the integrator. Every conclusion rests on documents: the delivery dates, the original risk assessment's update envelope, and post-change verification. Those are test-and-evidence problems, which is where Afterwave sits.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: a drive-unit test rig maker",
          given: md`Illustrative: a maker of e-drive test rigs (machinery with rotating parts) has 30 rigs to deliver: 6 before 20 January 2027 and the rest after. It also plans a firmware update to the rig's overspeed monitoring, foreseen in its risk assessment with a defined verification test.`,
          steps: [
            { md: md`Units placed on the market from 20 January 2027: $N_{\geq T} = 30 - 6 =$ **24**.`, hidden: true, check: { prompt: "Units under the Regulation", answer: 24, unit: "units", tolerance: { abs: 0 } } },
            { md: md`Share $\varphi = 24/30 =$ **0.80**.`, hidden: true, check: { prompt: "Share under the Regulation (fraction)", answer: 0.8, tolerance: { abs: 0.005 } } },
            { md: md`The overspeed firmware update was foreseen and has a defined verification test, so if the test passes and results are recorded it is **not** a substantial modification. The record of the test is what proves it.` },
          ],
          result: md`80 % exposure, and the update question is answered by evidence that the change stayed inside a pre-assessed envelope.`,
        },
      ],
    },
    {
      layer: "field",
      title: "How compliance teams actually handle the transition",
      blocks: [
        {
          kind: "md",
          md: md`### Who does the work

- **Product safety or compliance engineer** (in larger OEMs a "CE coordinator"): owns the risk assessment, EHSR checklist, technical file and declaration. Your most important non-test contact.
- **Test and validation teams**: produce the test reports in the file. Your users.
- **Notified bodies** (large testing and certification groups): needed for Annex I Part A and for Part B without full harmonised standards. Check designation under 2023/1230 in the Commission's NANDO database, not the body's marketing.
- **Authorised representative or importer**: required in practice for non-EU manufacturers, and often the first to ask hard questions because it carries liability in the EU.
- **Integrators and end users**: integrators who build cells or add tooling routinely become manufacturers of the assembly.

### What compliance teams are doing in late 2026

1. Gap analysis: Directive EHSR checklist versus Regulation Annex III, row by row.
2. Re-checking whether any product falls in the new Annex I categories, especially anything with an ML safety function.
3. Rewriting the risk assessment to cover software updates, connectivity and the update envelope.
4. Identifying which shipments fall after 20 January 2027 and freezing designs accordingly.
5. Lining up a notified body where needed, and finding out which harmonised standards will be cited (lesson 3).`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Common mistakes",
          md: md`- **"Our model type was certified, so we are fine."** Each unit placed after 20 January 2027 must meet the Regulation.
- **"Software updates are not modifications."** The definition explicitly includes digital means.
- **"The integrator's problem, not ours."** True for the integrator's modification, but the OEM's instructions and update envelope decide how much the integrator inherits.
- **"The date will slip."** No general postponement was found as of November 2026; only a sectoral cyber postponement was requested, with no decision found.`,
        },
        {
          kind: "ask",
          title: "Questions to ask a prospect's compliance lead",
          items: [
            "Which of your products ship units after 20 January 2027, and what share of next year's volume is that?",
            "Does any safety function in your machines use a trained model? Is it locked at release or updated later?",
            "How does your current risk assessment describe which software and model updates are foreseen, and how each is verified?",
            "When you push an update today, who signs off that it is not a substantial modification, and what evidence do they look at?",
            "Do integrators or customers modify your machines, and what do your instructions say about it?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw11-l01-p1",
            type: "short",
            prompt: md`**Produce a one-page "Machinery Regulation exposure map" for an illustrative prospect profile**: a non-EU humanoid maker planning its first EU deliveries in 2027, with an ML-based person-detection safety function and monthly over-the-air updates. Cover: (1) applicable dates; (2) which operators are involved and who becomes manufacturer when; (3) whether its updates risk being substantial modifications and what evidence would show they are not; (4) three questions you would ask in the first call. Use no fabricated facts about real companies.`,
            rubric: [
              "States 20 January 2027 as application date and explains per-unit placing on the market correctly",
              "Identifies the need for an EU authorised representative or importer and their obligations, and that integrators or modifiers can become manufacturers",
              "Applies the substantial-modification test correctly: digital means included, 'foreseen or planned' as the key, and pre-defined update envelope plus post-update verification as the evidence",
              "Flags that an ML safety function likely brings Annex I Part A (third-party assessment) without overstating details covered later",
              "Questions are specific, open and aimed at evidence (who signs off updates, what verification exists)",
              "No compliance promises, no invented facts; uncertain points marked as such",
            ],
            modelAnswer: md`**1. Dates.** Regulation (EU) 2023/1230 applies from 20 January 2027; every humanoid unit first made available in the EU after that date must comply, regardless of earlier sales elsewhere. Notified bodies can be designated since 20 January 2024.

**2. Operators.** As a non-EU manufacturer it needs an EU authorised representative (written mandate, holds the declaration and technical file for authorities) and its EU importer must check conformity, put its name on the product and keep the declaration for 10 years. A distributor or importer that rebrands becomes the manufacturer; a customer or integrator that adds tooling or changes payload may become the manufacturer of the modified machine.

**3. Updates.** Monthly OTA updates are digital modifications. They are not substantial if the original risk assessment foresaw them: a defined envelope (which parameters and models may change, within which limits) and a verification procedure for each class of change. Evidence: the envelope in the risk assessment, the regression results for each release, the software version log required by EHSR 1.2.1, and a signed safety-impact note per release. Without these, an update to the person-detection model that changes its performance could be a substantial modification for fielded units. Because the safety function uses ML, the robot probably falls under Annex I Part A and needs a notified body (to be confirmed with one).

**4. First-call questions.** (a) Which share of 2027 deliveries will go to EU customers, and when is the first? (b) How is the person-detection model released: locked, or retrained after deployment, and who approves each release? (c) What does your risk assessment say today about future software updates, and what test evidence does each update produce?`,
            explanation: md`Graded against the rubric. The strongest answers turn every legal point into a question about evidence, because evidence is what Afterwave produces.`,
            concepts: ["aw11.substantial-modification", "aw11.economic-operators", "aw11.placing-on-market"],
            difficulty: 2,
          },
        },
        { kind: "scenario", scenario: "aw11-s1" },
        { kind: "xref", to: "fc03-l02", note: "The 20 January 2027 date is listed there as a buying trigger in Afterwave's ICP; this module gives you the mechanism behind it." },
      ],
    },
  ],
  scenarios: [
    {
      id: "aw11-s1",
      title: "The overnight model update",
      context: md`Illustrative. A robotics customer in a pilot with Afterwave has 14 autonomous mobile robots in an EU warehouse, all placed on the market in 2027 under Regulation 2023/1230. Its ML team wants to push a retrained obstacle and person classifier tonight. The test systems lead asks you, on the pilot channel, whether Ripple's output "proves it is not a substantial modification".`,
      start: "a",
      concepts: ["aw11.substantial-modification", "aw11.economic-operators"],
      nodes: {
        a: {
          md: md`What do you reply first?`,
          choices: [
            { text: "\"Yes, if Ripple says the impact is low you are covered.\"", score: 0, feedback: "Ripple cannot decide a legal classification, and the customer could act on your sentence. This is the overclaim that ends vendor relationships." },
            { text: "\"Ripple can show which tests the change affects and whether they pass. Whether it is substantial depends on whether this kind of update was foreseen in your risk assessment. Who owns that document?\"", score: 10, feedback: "Separates evidence (yours) from classification (theirs) and moves to the person who decides.", next: "b" },
            { text: "\"Not our area, ask legal.\"", score: 3, feedback: "Honest, but walks away from the exact point where your product is useful.", next: "b" },
          ],
        },
        b: {
          md: md`The compliance lead joins. The risk assessment says classifier updates are foreseen "within the validated operating domain", verified by a defined regression suite. Ripple's analysis shows the new classifier changes behaviour in low-light scenarios that are inside the operating domain, and two low-light protective-stop tests are flagged.`,
          choices: [
            { text: "Recommend running the flagged tests plus the defined regression suite before deployment, and attach Ripple's rationale and the results to the release record.", score: 10, feedback: "This is the evidence that the update stayed within the foreseen envelope, or the early warning that it did not.", next: "c" },
            { text: "Suggest deploying tonight and testing next week, since the change is foreseen.", score: 1, feedback: "'Foreseen' only holds if the defined verification was done before deployment." },
          ],
        },
        c: {
          md: md`One low-light test fails: the stop distance grows beyond the value in the risk assessment.`,
          choices: [
            { text: "Advise holding the release, escalate to the compliance lead, and note that a change that increases risk beyond the assessed limits may need new protective measures, which is the substantial-modification territory.", score: 10, feedback: "Correct. The evidence did its job: it caught the change before it reached the field. Classification and the fix stay with the manufacturer." },
            { text: "Quietly rerun the test until it passes.", score: 0, feedback: "Destroys the evidence value of bench memory and exposes everyone." },
          ],
        },
      },
    },
  ],
  quiz: [
    {
      id: "aw11-l01-q1",
      type: "mcq",
      prompt: "From what date does Regulation (EU) 2023/1230 generally apply?",
      options: ["19 July 2023", "20 January 2024", "20 January 2027", "2 August 2028"],
      answer: 2,
      explanation: md`It entered into force on 19 July 2023, the notified-body rules applied from 20 January 2024, and the Regulation as a whole applies from 20 January 2027. 2 August 2028 is the AI Act date for product-embedded high-risk AI after the 2026 omnibus.`,
      concepts: ["aw11.regulation-shift"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw11-l01-q2",
      type: "numeric",
      prompt: md`A cobot maker has 120 units to deliver in its plan; 42 will be placed on the market before 20 January 2027. What fraction must conform to Regulation 2023/1230?`,
      answer: 0.65,
      tolerance: { abs: 0.005 },
      explanation: md`$\varphi = (120 - 42)/120 = 78/120 = 0.65$. Placing on the market is per individual unit.`,
      concepts: ["aw11.placing-on-market"],
      difficulty: 1,
    },
    {
      id: "aw11-l01-q3",
      type: "multi",
      prompt: "Which statements about a substantial modification are correct? (Select all that apply.)",
      options: [
        "It can be made by digital means, such as a software or model update",
        "It is any modification after placing on the market",
        "Whoever makes it is treated as the manufacturer of the modified machine",
        "A modification foreseen and planned by the manufacturer is not a substantial modification",
      ],
      answer: [0, 2, 3],
      explanation: md`Only unforeseen modifications that create a new hazard or raise a risk enough to need new protective measures are substantial. Digital means are included; the modifier takes on manufacturer obligations.`,
      concepts: ["aw11.substantial-modification"],
      difficulty: 2,
    },
    {
      id: "aw11-l01-q4",
      type: "mcq",
      prompt: "A US humanoid maker sells into Germany through an EU importer. Which obligation sits with the importer?",
      options: [
        "Running the notified-body assessment itself",
        "Checking that conformity assessment was done, documentation exists, CE marking is affixed, and adding its own name and address",
        "Nothing, because the importer only resells",
        "Writing new instructions in German from scratch",
      ],
      answer: 1,
      explanation: md`Importers verify and add their identification; they keep the declaration for 10 years and cooperate with authorities. They become the manufacturer only if they rebrand or modify the product.`,
      concepts: ["aw11.economic-operators"],
      difficulty: 1,
    },
    {
      id: "aw11-l01-q5",
      type: "decision",
      prompt: md`A prospect says: "We certified the model type in 2025 under the Directive, so the new Regulation does not affect us." What is the best response?`,
      options: [
        { text: "Agree; type approval carries over.", score: 0, feedback: "Wrong: the rules apply per unit placed on the market." },
        { text: "Explain that each unit placed on the EU market from 20 January 2027 must conform to the Regulation, and ask what share of 2027 shipments that is.", score: 1, feedback: "Correct and turns the misconception into a quantified exposure." },
        { text: "Say the Regulation probably will be postponed anyway.", score: 0.1, feedback: "No general postponement was found as of November 2026. Never sell on speculation." },
      ],
      explanation: md`Placing on the market refers to each individual product. The design date or an older certificate does not exempt later units.`,
      concepts: ["aw11.placing-on-market"],
      difficulty: 2,
    },
    {
      id: "aw11-l01-q6",
      type: "mcq",
      prompt: "Why does replacing a directive with a regulation matter to a manufacturer selling in several EU countries?",
      options: [
        "It removes the need for CE marking",
        "The same text applies directly in every Member State on the same day, without national transposition differences",
        "Each country can now choose its own application date",
        "It only applies to EU-based manufacturers",
      ],
      answer: 1,
      explanation: md`A regulation is directly applicable. National penalties and market surveillance practice still differ, but the requirements are identical.`,
      concepts: ["aw11.regulation-shift"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "aw11-l01-f1", front: "Key dates of Regulation 2023/1230", back: "In force 19 July 2023; notified-body rules 20 January 2024; applies 20 January 2027 (Directive 2006/42/EC repealed).", concepts: ["aw11.regulation-shift"] },
    { id: "aw11-l01-f2", front: "Placing on the market", back: "First making available of an individual unit in the EU. The rules on that unit's date apply, not the model's design date.", concepts: ["aw11.placing-on-market"] },
    { id: "aw11-l01-f3", front: "Substantial modification (three conditions)", back: "Physical or digital change after placing on the market; not foreseen or planned by the manufacturer; creates a new hazard or raises a risk so new protective measures are needed.", concepts: ["aw11.substantial-modification"] },
    { id: "aw11-l01-f4", front: "Consequence of a substantial modification", back: "The person who made it is treated as the manufacturer: new risk assessment, conformity assessment, declaration and CE marking.", concepts: ["aw11.substantial-modification", "aw11.economic-operators"] },
    { id: "aw11-l01-f5", front: "Four economic operators", back: "Manufacturer, authorised representative, importer, distributor. Rebranding or modifying makes an importer or distributor a manufacturer.", concepts: ["aw11.economic-operators"] },
    { id: "aw11-l01-f6", front: "Documentation retention", back: "Technical documentation and EU declaration of conformity kept for 10 years after the machine is placed on the market.", concepts: ["aw11.economic-operators"] },
    { id: "aw11-l01-f7", front: "Biggest content changes for AI-enabled machines", back: "ML safety functions in Annex I Part A; software as a safety component; protection against corruption; logging; HMI for autonomous machines; digital substantial modification.", concepts: ["aw11.regulation-shift"] },
  ],
};

export default lesson;
