import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw11-l04",
  title: "The AI Act after the 2026 Digital Omnibus, the Cyber Resilience Act and the rest of the stack",
  summary:
    "How the AI Act (Regulation 2024/1689) reaches AI inside machines, and what the Digital Omnibus on AI (Regulation 2026/1744, in force 27 July 2026) changed: new high-risk dates (2 December 2027 and 2 August 2028) and the move of the Machinery Regulation from Section A to Section B of AI Act Annex I, so AI requirements for machinery arrive through delegated acts amending Machinery Regulation Annex III. Then the Cyber Resilience Act, the new Product Liability Directive and other horizontal rules at the level a CEO needs.",
  minutes: 70,
  objectives: [
    "Explain how an AI system in a machine becomes high-risk under AI Act Art. 6(1)",
    "Explain the difference between AI Act Annex I Section A and Section B and what the omnibus move means for machinery",
    "State the key AI Act, Machinery Regulation, Cyber Resilience Act and Product Liability Directive dates and their status",
    "Map a concrete AI-enabled machine through all applicable regimes with dates",
    "Separate verified facts from unverified claims when briefing a buyer",
  ],
  concepts: [
    { id: "aw11.ai-act-annex-i", name: "AI Act product route (Art. 6(1) and Annex I)", description: "An AI system is high-risk if it is a safety component of, or is itself, a product covered by Annex I legislation that requires third-party conformity assessment; machinery with ML safety functions meets both conditions.", competency: "aw-safety", related: ["aw11.omnibus-section-b", "aw11.annex-i-categories"] },
    { id: "aw11.omnibus-section-b", name: "Omnibus move of machinery to Annex I Section B", description: "Regulation 2026/1744 moves Regulation 2023/1230 from Section A to Section B of AI Act Annex I, so AI Act high-risk requirements reach machinery through Commission delegated acts amending Machinery Regulation Annex III, with timing tied to 2 August 2028.", competency: "aw-safety", related: ["aw11.ai-act-annex-i"] },
    { id: "aw11.cra", name: "Cyber Resilience Act", description: "Regulation 2024/2847 sets cybersecurity requirements for products with digital elements: secure design, vulnerability handling and security updates; reporting from 11 September 2026, full application 11 December 2027.", competency: "aw-safety", related: ["aw11.corruption-protection", "aw11.horizontal-stack"] },
    { id: "aw11.horizontal-stack", name: "Regulatory stack for an AI-enabled machine", description: "The set of Union acts that apply together to one machine (Machinery Regulation, AI Act via the Machinery Regulation, CRA, EMC, radio equipment, product liability, data protection), declared in one EU declaration of conformity where they require it.", competency: "aw-safety", related: ["aw11.cra", "aw11.omnibus-section-b"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "How the AI Act reaches the machine",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Buyers have heard "AI Act" far more often than "Machinery Regulation", and many think the AI Act is what governs their robot from 2026. After the 2026 omnibus that is wrong in an important way: for machinery, the Machinery Regulation is the vehicle, and its AI requirements apply from 20 January 2027. Being the person in the room who explains this correctly, with dates and with the uncertain parts labelled, is a credibility asset worth more than any slide.`,
        },
        {
          kind: "md",
          md: md`### The AI Act in one paragraph

Regulation (EU) 2024/1689 entered into force on 1 August 2024. It bans some practices (from 2 February 2025), regulates general-purpose AI models (from 2 August 2025), imposes **transparency duties** under Art. 50 (for example telling people they are interacting with an AI system; from 2 August 2026), and sets requirements for **high-risk AI systems**: risk management, data governance, technical documentation, record-keeping, transparency to deployers, human oversight, accuracy, robustness and cybersecurity (Chapter III Section 2), a quality management system (Art. 17), logs (Art. 19), post-market monitoring (Art. 72) and serious-incident reporting (Art. 73).

### Two routes to high-risk

- **Art. 6(2), Annex III use cases:** stand-alone uses such as biometrics, critical infrastructure, employment and worker management, education, access to services.
- **Art. 6(1), product route:** the AI system is a **safety component** of a product, or is itself a product, covered by the legislation listed in **Annex I**, and that product must undergo **third-party conformity assessment** under that legislation.

An ML safety function in a machine meets both Art. 6(1) conditions: it is a safety component, and Annex I Part A of the Machinery Regulation requires a notified body.

### Section A versus Section B of AI Act Annex I

| | Section A | Section B |
|---|---|---|
| Kind of legislation | New Legislative Framework acts (toys, lifts, medical devices, radio equipment...) | Older sectoral regimes (vehicles, aviation, marine equipment, rail...) |
| How AI Act requirements apply | **Directly**; checked inside the sectoral conformity assessment | **Not directly**; the Commission must write them into the sectoral law by delegated or implementing acts |
| Machinery before the omnibus | Section A: AI Act high-risk requirements would apply directly from 2 August 2027 | |
| Machinery after the omnibus | | **Section B**, per Regulation 2026/1744 |

### What the Digital Omnibus on AI changed

Per the research brief (dates from secondary summaries; the OJ page could not be fetched):

| Item | Content |
|---|---|
| Act | Regulation (EU) 2026/1744; political agreement about 6 to 7 May 2026; adopted 8 July 2026; OJ 24 July 2026; **in force 27 July 2026** |
| Annex III high-risk (Art. 6(2)) | Applies from **2 December 2027** (was 2 August 2026) |
| Annex I product-embedded high-risk (Art. 6(1)) | Applies from **2 August 2028** (was 2 August 2027) |
| Art. 50 transparency | Still from 2 August 2026 |
| Machinery | Regulation 2023/1230 moved from **Section A to Section B** of Annex I |
| Mechanism | Commission to adopt **delegated acts amending Machinery Regulation Annex III** to carry over Chapter III Section 2 and Arts. 17, 19, 72 and 73; delegation for 5 years from 27 July 2026, target timing tied to 2 August 2028 |
| Interim | AI Act harmonised standards can give presumption of conformity under the Machinery Regulation |

### What this means in practice

1. **From 20 January 2027**, the Machinery Regulation's own AI provisions apply: Part A notified-body assessment for ML safety functions, and the EHSRs from lesson 2 (bounded behaviour, correction, decision logs, lifecycle risk assessment, corruption protection).
2. **Later**, AI-Act-derived obligations (data governance, QMS, post-market monitoring, incident reporting) arrive **inside** the Machinery Regulation through delegated acts, assessed by the same machinery notified body. One regime, one assessment, but the content of those delegated acts is not yet known.
3. **AI in a machine that is not a safety component** is not high-risk under Art. 6(1). It can still be caught by Art. 6(2) if the use falls in Annex III (for example a robot used to monitor or evaluate workers), and by Art. 50 if people interact with it (a humanoid with a conversational voice interface).
4. **General-purpose models** embedded in robots carry obligations for their providers; an OEM that substantially modifies such a model can take on provider duties. Details are outside this module.`,
        },
        {
          kind: "matrix",
          title: "Which rules bite for the AI inside a machine",
          xAxis: ["AI does not ensure a safety function", "AI ensures a safety function"],
          yAxis: ["Rule-based or fixed behaviour", "Fully or partially self-evolving ML behaviour"],
          cells: [
            { label: "Machinery Regulation general EHSRs", detail: "Self-evolving requirements of 1.1.2 and 1.2.1 still apply to the machine's behaviour; not Part A; AI Act high-risk only if an Annex III use; Art. 50 if people interact with it" },
            { label: "Part A plus AI Act via Section B", detail: "Notified body from 20 January 2027; AI-Act-derived requirements through Machinery Regulation delegated acts, timing tied to 2 August 2028" },
            { label: "Ordinary machinery", detail: "Usually Module A; AI Act minimal; CRA if connected" },
            { label: "Classical functional safety", detail: "PL or SIL route; if a locked ML model is involved, Part A status is an open interpretation: plan conservatively" },
          ],
          caption: "Simplified; the Cyber Resilience Act and other acts apply across all four cells when the machine is connected.",
        },
        {
          kind: "md",
          md: md`### The Cyber Resilience Act (high level)

Regulation (EU) 2024/2847 entered into force on 10 December 2024. It covers **products with digital elements** whose intended use includes a data connection to a device or network, which includes most connected machines and many test instruments. Manufacturers must design to essential cybersecurity requirements, handle vulnerabilities, provide security updates over a defined support period, keep a software bill of materials and document all this; it carries its own CE marking logic and conformity assessment (self-assessment for most products, third-party for listed important and critical classes).

| Date | CRA milestone |
|---|---|
| 11 June 2026 | Rules on conformity assessment bodies apply |
| 11 September 2026 | **Reporting** of actively exploited vulnerabilities and severe incidents applies (already in effect) |
| 11 December 2027 | **Main obligations** apply |

The overlap with Machinery Regulation EHSRs 1.1.9 and 1.2.1 is real: the same connected machine must show protection against corruption from 20 January 2027 under the Machinery Regulation, and full CRA conformity from 11 December 2027. That 325-day gap is why machinery associations asked in January 2026 to postpone the Machinery Regulation cyber EHSRs to December 2027. No decision granting it was found as of November 2026.

### The rest of the stack

| Act | Why it matters for an AI-enabled machine |
|---|---|
| **Product Liability Directive (EU) 2024/2853** | Software, including AI and updates, is a product; manufacturers can be liable for defects including those from updates or missing security updates; courts can order disclosure of evidence. Transposition deadline **9 December 2026**, for products placed on the market after that date. Test and log evidence becomes defence evidence. |
| **Market surveillance Regulation (EU) 2019/1020** | Authorities can request documentation and samples; a responsible EU economic operator must exist for products sold into the EU. |
| **EMC Directive 2014/30/EU, Radio Equipment Directive 2014/53/EU** | Electromagnetic compatibility; radio modules (Wi-Fi, 5G) and the RED cybersecurity delegated act for radio equipment. Listed in the same declaration of conformity. |
| **GDPR** | Camera and decision logs that capture people are personal data; the Machinery Regulation's decision-recording duty is explicitly subject to data protection law. |`,
        },
        {
          kind: "chart",
          chart: "bar",
          title: "Days from 6 November 2026 to the next regulatory milestones",
          xKey: "milestone",
          xLabel: "Milestone",
          yLabel: "Days from 6 November 2026",
          series: [{ key: "days", label: "Days" }],
          data: [
            { milestone: "PLD transposition (9 Dec 2026)", days: 33 },
            { milestone: "Machinery Regulation applies (20 Jan 2027)", days: 75 },
            { milestone: "AI Act Annex III high-risk (2 Dec 2027)", days: 391 },
            { milestone: "CRA main obligations (11 Dec 2027)", days: 400 },
            { milestone: "AI Act Annex I high-risk (2 Aug 2028)", days: 635 },
          ],
          caption: "The Machinery Regulation is the first hard date for AI-enabled machines, by about a year. AI Act dates are post-omnibus values from secondary sources.",
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Unverified or open items",
          md: md`- **Omnibus dates and article references** (2026/1744 Art. 1(2)(a) and 1(41)) come from secondary sources; the OJ text was not fetched.
- A new Art. 6(1a) to 6(1c) reportedly **narrows "safety component"**, excluding non-safety functions such as quality control and performance optimisation. Single blog source.
- **Watermarking** duties reportedly moved to 2 December 2026. Unverified.
- **Content of the delegated acts** amending Machinery Regulation Annex III: not yet proposed as far as the research found.
- **CRA presumption** for Machinery Regulation 1.1.9 and 1.2.1 and the outcome of the industry postponement request: not confirmed.
- **Omnibus IV** (digital declaration of conformity): pending.`,
        },
        { kind: "sources", refs: ["aw11-r3", "aw11-r4", "aw11-r5", "aw11-r6", "aw11-r7", "aw11-r8", "aw11-r14", "aw11-r22", "aw11-r23", "aw11-r12", "aw11-r13", "aw11-r26"] },
      ],
    },
    {
      layer: "applied",
      title: "Mapping one machine through the stack",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Regulatory map for an illustrative humanoid",
          given: md`Illustrative, not a real product: a humanoid for warehouse tote handling with (1) an ML person detector that triggers protective stops; (2) an ML grasp planner; (3) a voice interface built on a general-purpose language model that answers workers' questions; (4) Wi-Fi with monthly OTA updates; (5) an optional dashboard that scores each worker's pick rate for supervisors. First EU units planned for September 2027.`,
          steps: [
            { md: md`**Machinery Regulation (applies, since September 2027 is after 20 January 2027):** the person detector is an embedded ML system ensuring a safety function, so Annex I Part A: notified body (B plus C, H or G). EHSRs 1.1.2, 1.1.6, 1.1.9, 1.2.1 and Part 3 (mobility, if it moves autonomously) apply. Monthly OTA updates need a foreseen update envelope to avoid substantial modifications.` },
            { md: md`**AI Act via the Machinery Regulation:** the person detector is high-risk under Art. 6(1), but after the omnibus its AI Act requirements arrive through Machinery Regulation delegated acts, timed toward 2 August 2028, about 11 months after first shipments. Design for them now (data governance, logs, post-market monitoring) because units shipped in 2027 will be in the field when they apply to new units.` },
            { md: md`**Grasp planner:** not a safety function. Not Part A, not high-risk under Art. 6(1); still covered by the general EHSRs, and its updates must not create hazards.` },
            { md: md`**Voice interface:** Art. 50 transparency applies already (from 2 August 2026): workers must be told they are interacting with an AI system unless obvious. The language model's provider has general-purpose model obligations.` },
            { md: md`**Worker-scoring dashboard:** monitoring and evaluating workers is an Annex III employment use, so it may be high-risk under Art. 6(2) from **2 December 2027**. A product decision: ship it later, redesign it, or prepare the high-risk file.` },
            { md: md`**Cyber Resilience Act:** a connected product with digital elements. Reporting duties already apply; full obligations from **11 December 2027**, three months after first shipments. **Product liability:** under the new PLD from transposition (9 December 2026), the software and its updates are part of the product. **Radio equipment and EMC:** in the same declaration.` },
          ],
          result: md`Five regimes, four dates within 12 months of first shipment, and one product decision (the dashboard) driven by the AI Act rather than the Machinery Regulation. The evidence needs overlap heavily: versioned test results, logs, update control and post-market data serve the Machinery Regulation, the AI Act requirements through it, the CRA and a liability defence at once.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: the gaps between dates",
          given: md`Use the dates in this lesson.`,
          steps: [
            { md: md`Days from Machinery Regulation application (20 January 2027) to CRA main obligations (11 December 2027): **325**.`, hidden: true, check: { prompt: "Days from 20 Jan 2027 to 11 Dec 2027", answer: 325, unit: "days", tolerance: { abs: 0 } } },
            { md: md`Days from 20 January 2027 to the AI Act Annex I date (2 August 2028): **560**, about 18.4 months.`, hidden: true, check: { prompt: "Days from 20 Jan 2027 to 2 Aug 2028", answer: 560, unit: "days", tolerance: { abs: 0 } } },
            { md: md`Before the omnibus, the Annex I date was 2 August 2027. The omnibus delay for product-embedded AI is therefore **12** months.`, hidden: true, check: { prompt: "Omnibus delay for Annex I (months)", answer: 12, unit: "months", tolerance: { abs: 0 } } },
          ],
          result: md`For physical AI, the Machinery Regulation leads by 11 to 18 months. Buyers who plan around the AI Act dates alone will be late.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Briefing buyers on a moving stack",
      blocks: [
        {
          kind: "md",
          md: md`### Who owns what inside a manufacturer

- **Product compliance or regulatory affairs:** Machinery Regulation, CE, declaration. Usually the strongest ally for evidence tooling.
- **Legal:** AI Act classification, liability, contracts. Will scrutinise any regulatory claim you make.
- **Product security (PSIRT) and IT security:** CRA, vulnerability handling, 1.1.9 in practice.
- **ML or autonomy team:** model release process, data documentation. Often unaware that Machinery Regulation EHSRs touch their release cadence.

The commercial insight: these groups rarely share one evidence base. A test and evidence layer that each of them can query is valuable precisely because the regimes overlap.

### How to stay current

Regulation in this area moves monthly. Keep a dated one-page "regulatory status" note, with a source and a verified or unverified flag for each line, and refresh it before every important meeting. Primary sources first: the Official Journal (EUR-Lex), the Commission's AI Office and machinery pages, NANDO for notified bodies. Law-firm and certification-body summaries are useful for speed but not for quoting.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Statements that will cost you credibility",
          md: md`- "The AI Act high-risk rules apply to robots from August 2026." (Pre-omnibus Annex III date, and not the route for machinery.)
- "The omnibus delayed AI rules for machines to 2028, so nothing happens in 2027." (The Machinery Regulation's own AI provisions apply from 20 January 2027.)
- "The cyber requirements were postponed." (Requested, not granted as far as found.)
- "Afterwave makes you AI Act compliant." (Never; see lesson 5.)`,
        },
        { kind: "xref", to: "fc10-l01", note: "Research and synthesis with checked citations: the habit behind a reliable dated regulatory status note." },
        {
          kind: "question",
          question: {
            id: "aw11-l04-p1",
            type: "short",
            prompt: md`**Write a one-page regulatory timeline brief** that you could send to the VP of engineering of an illustrative autonomous mobile robot company (ML-based obstacle and person classifier that triggers stops, cloud fleet management, OTA updates, first EU units in Q2 2027). Include: a dated table of the milestones that apply to this product; one sentence each on what changes at each date; which items are verified and which are not; and the three decisions the VP should make in the next quarter. Keep it accurate and do not claim that any product makes the company compliant.`,
            rubric: [
              "Correct dates: Machinery Regulation 20 January 2027; AI Act Annex I 2 August 2028 and Annex III 2 December 2027 (post-omnibus); Art. 50 2 August 2026; CRA reporting 11 September 2026 and main 11 December 2027; PLD 9 December 2026",
              "Explains that machinery AI requirements come through the Machinery Regulation (Section B move) and that Part A applies from January 2027",
              "Marks unverified items (omnibus details from secondary sources, cyber postponement outcome, delegated act content)",
              "Decisions are concrete and owned (classification with a notified body, update-envelope definition, logging and evidence architecture, CRA vulnerability process)",
              "Tone and length suit a VP; no compliance claims for any product",
            ],
            modelAnswer: md`**Regulatory timeline for [AMR product], status 6 November 2026**

| Date | Act | What changes for you | Status |
|---|---|---|---|
| 2 Aug 2026 | AI Act Art. 50 | Transparency if people interact with AI (not your core use) | Verified |
| 11 Sep 2026 | CRA | Report actively exploited vulnerabilities and severe incidents | Verified |
| 9 Dec 2026 | Product Liability Directive | Software and updates are part of the product for liability | Verified (national laws pending) |
| 20 Jan 2027 | Machinery Regulation | Every unit placed on the EU market must comply; ML stop function likely Annex I Part A, notified body required | Verified date; Part A reading for locked models open |
| 11 Dec 2027 | CRA | Full cybersecurity requirements and conformity | Verified |
| 2 Aug 2028 | AI Act via Machinery Regulation | AI Act high-risk requirements carried into Machinery Regulation Annex III by delegated acts | Omnibus dates from secondary sources; delegated acts not yet published |

**Not verified:** the omnibus details are from secondary summaries; industry asked to postpone the Machinery Regulation cyber clauses to December 2027 but no decision has been found.

**Decisions for this quarter:** (1) Regulatory lead: confirm Annex I classification and route with a notified body before design freeze. (2) Head of autonomy: write the update envelope for the classifier (what may change, verified how) into the risk assessment, so bimonthly updates are not substantial modifications. (3) Test and platform leads: decide the logging and evidence architecture (decision records, version logs, synchronised test data) that serves the Machinery Regulation now and the AI Act and CRA later.`,
            explanation: md`Graded against the rubric. A VP should be able to act on it in five minutes and a lawyer should find nothing to correct.`,
            concepts: ["aw11.omnibus-section-b", "aw11.cra", "aw11.horizontal-stack"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to Ismail in plain words what it means that the omnibus moved the Machinery Regulation from Section A to Section B of AI Act Annex I, and why it does not mean 'nothing happens until 2028'.",
          keyPoints: [
            "Section A: AI Act requirements apply directly to the AI in the product; Section B: they must be written into the sectoral law",
            "After the move, AI Act high-risk requirements reach machinery through delegated acts amending Machinery Regulation Annex III, timed toward 2 August 2028",
            "The Machinery Regulation's own AI provisions (Part A notified body, EHSRs on self-evolving behaviour, logs, corruption) still apply from 20 January 2027",
            "One regime and one notified body assess the machine, which simplifies things, but the content of the delegated acts is not yet known",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw11-l04-q1",
      type: "mcq",
      prompt: "After Regulation 2026/1744, from when do AI Act high-risk requirements apply to AI systems embedded in Annex I products (Art. 6(1))?",
      options: ["2 August 2026", "2 August 2027", "2 December 2027", "2 August 2028"],
      answer: 3,
      explanation: md`2 August 2028 for Annex I (was 2 August 2027); 2 December 2027 for Annex III (was 2 August 2026). Dates per secondary summaries of the omnibus.`,
      concepts: ["aw11.ai-act-annex-i"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw11-l04-q2",
      type: "mcq",
      prompt: "What is the practical effect of moving the Machinery Regulation to Section B of AI Act Annex I?",
      options: [
        "AI in machinery is exempt from all AI requirements",
        "AI Act requirements reach machinery through delegated acts amending Machinery Regulation Annex III, assessed within the machinery conformity procedure",
        "Machinery must now get two separate CE markings",
        "The Machinery Regulation no longer applies to AI",
      ],
      answer: 1,
      explanation: md`Section B acts receive AI Act requirements through sectoral delegated or implementing acts. Machinery stays under one regime.`,
      concepts: ["aw11.omnibus-section-b"],
      difficulty: 2,
    },
    {
      id: "aw11-l04-q3",
      type: "numeric",
      prompt: "How many days lie between the Machinery Regulation application date (20 January 2027) and the CRA main obligations (11 December 2027)?",
      answer: 325,
      tolerance: { abs: 0 },
      unit: "days",
      explanation: md`11 days left in January, then February to November (28+31+30+31+30+31+31+30+31+30 = 303) and 11 in December: $11 + 303 + 11 = 325$. This gap drove the industry request to align the cyber EHSRs with the CRA.`,
      concepts: ["aw11.cra"],
      difficulty: 1,
    },
    {
      id: "aw11-l04-q4",
      type: "multi",
      prompt: "Which two conditions make an AI system high-risk under AI Act Art. 6(1)? (Select all that apply.)",
      options: [
        "It is a safety component of a product, or is itself a product, covered by Annex I legislation",
        "The product must undergo third-party conformity assessment under that legislation",
        "It uses more than 1 billion parameters",
        "It is sold to a public authority",
      ],
      answer: [0, 1],
      explanation: md`Both conditions must hold. Model size and buyer type are irrelevant for Art. 6(1).`,
      concepts: ["aw11.ai-act-annex-i"],
      difficulty: 1,
    },
    {
      id: "aw11-l04-q5",
      type: "decision",
      prompt: md`A prospect's head of autonomy says: "The omnibus pushed AI rules for machines to 2028, so we'll deal with compliance in 2028." What is the best reply?`,
      options: [
        { text: "Agree; there is time.", score: 0, feedback: "Misses that the Machinery Regulation's own AI provisions apply from 20 January 2027." },
        { text: "Point out that from 20 January 2027 the Machinery Regulation already requires notified-body assessment for ML safety functions and the AI-specific EHSRs; 2028 is when additional AI Act requirements arrive through the Machinery Regulation.", score: 1, feedback: "Accurate, specific and creates the right urgency." },
        { text: "Tell him the AI Act applies in full from August 2026.", score: 0, feedback: "Wrong date and wrong route." },
      ],
      explanation: md`The first hard date for machinery AI is 20 January 2027.`,
      concepts: ["aw11.omnibus-section-b"],
      difficulty: 2,
    },
    {
      id: "aw11-l04-q6",
      type: "mcq",
      prompt: "Which CRA obligation already applies in November 2026?",
      options: [
        "Full essential cybersecurity requirements and CE marking under the CRA",
        "Reporting of actively exploited vulnerabilities and severe incidents",
        "Nothing; the CRA starts in 2028",
        "Mandatory third-party certification of all connected products",
      ],
      answer: 1,
      explanation: md`Reporting applies from 11 September 2026; the main obligations from 11 December 2027.`,
      concepts: ["aw11.cra"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "aw11-l04-f1", front: "Regulation 2026/1744", back: "Digital Omnibus on AI: in force 27 July 2026; Annex III high-risk 2 December 2027; Annex I high-risk 2 August 2028; machinery moved to Annex I Section B.", concepts: ["aw11.omnibus-section-b"] },
    { id: "aw11-l04-f2", front: "Section A versus Section B", back: "A: AI Act requirements apply directly within sectoral conformity assessment. B: they are written into the sectoral law by delegated or implementing acts.", concepts: ["aw11.omnibus-section-b"] },
    { id: "aw11-l04-f3", front: "AI Act Art. 6(1) conditions", back: "Safety component of (or itself) an Annex I product, and that product needs third-party conformity assessment.", concepts: ["aw11.ai-act-annex-i"] },
    { id: "aw11-l04-f4", front: "CRA dates", back: "In force 10 December 2024; reporting 11 September 2026; main obligations 11 December 2027.", concepts: ["aw11.cra"] },
    { id: "aw11-l04-f5", front: "New Product Liability Directive", back: "(EU) 2024/2853: software and updates are products; transposition 9 December 2026.", concepts: ["aw11.horizontal-stack"] },
    { id: "aw11-l04-f6", front: "First hard date for AI in machinery", back: "20 January 2027 (Machinery Regulation), about 18 months before the AI Act Annex I date.", concepts: ["aw11.omnibus-section-b"] },
  ],
};

export default lesson;
