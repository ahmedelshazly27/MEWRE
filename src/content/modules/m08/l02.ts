import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m08-l02",
  title: "Scope & WBS for a 1 GW PV + BESS IPP: Employer's Side vs EPC's Side",
  summary:
    "How to define, decompose and police scope on a utility PV + BESS project: the two WBSs (ministry/offtaker and EPC), the WBS dictionary, Employer's Requirements, scope boundaries at the grid interface, and how scope creep happens and is stopped.",
  minutes: 65,
  objectives: [
    "You can build a deliverable-oriented WBS for a 1 GW PV + BESS IPP from both the ministry's and the EPC's perspective and apply the 100 % rule.",
    "You can write a WBS dictionary entry that a contractor cannot misread.",
    "You can explain what Employer's Requirements must and must not contain under a design-build (FIDIC Yellow/Silver) contract.",
    "You can recognise scope creep and gold-plating and route them through change control.",
  ],
  concepts: [
    { id: "m08.wbs", name: "Work breakdown structure", description: "Hierarchical, deliverable-oriented decomposition of the total scope; the backbone for schedule, cost, EVM and reporting.", competency: "controls", related: ["m07.procurement-packaging"] },
    { id: "m08.hundred-percent-rule", name: "100 % rule", description: "The WBS includes 100 % of the work defined by the scope — and nothing more; children sum exactly to their parent.", competency: "controls", related: ["m08.wbs"] },
    { id: "m08.wbs-dictionary", name: "WBS dictionary", description: "Per-element description of scope, deliverables, boundaries, acceptance criteria, responsible party, interfaces and cost account.", competency: "controls", related: ["m08.wbs"] },
    { id: "m08.employers-requirements", name: "Employer's Requirements", description: "Contract document (design-build) stating purpose, scope, performance and design/quality criteria of the Works; the contractor designs to meet it.", competency: "contracts", related: ["m09.fidic-suite", "m14.deviation-list"] },
    { id: "m08.scope-boundary", name: "Scope boundary / battery limits", description: "Precise physical and functional demarcation between parties' scopes, e.g., at the 400 kV gantry or the metering point.", competency: "delivery", related: ["m08.employers-requirements", "m15.grid-interface", "m06.revenue-metering"] },
    { id: "m08.scope-creep", name: "Scope creep & gold-plating", description: "Uncontrolled growth of scope through informal requests (creep) or unrequested extras by the team (gold-plating).", competency: "controls", related: ["m08.wbs", "m09.variation-valuation"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Scope is a contract, the WBS is its map",
      blocks: [
        {
          kind: "md",
          md: md`**Scope** answers "what will exist at the end, and what will it do?". **Product scope** is the plant's features and performance (1,000 MWac PV, 250 MW / 1,000 MWh BESS, grid-code compliance, availability). **Project scope** is the work to deliver it (design, procure, construct, test, train, document).

A **work breakdown structure** decomposes the total scope into manageable deliverables. The rules that make it useful:

1. **Deliverable-oriented, not activity-oriented.** Level 2–4 elements are nouns ("PV Block 07", "400 kV GIS"), activities ("install", "test") live in the schedule beneath them.
2. **100 % rule.** Each level sums exactly to its parent: nothing missing, nothing extra. Missing scope becomes a variation; extra scope becomes waste.
3. **Mutually exclusive.** No work appears in two elements (otherwise it is double-counted in cost and progress).
4. **Decompose to the work package**, the level at which cost and schedule are planned, measured and owned — typically 1–4 % of the total value, or 80–400 h of design effort, or one physical block of construction. Too fine and control becomes paperwork; too coarse and problems hide.
5. **Code it** (e.g., 1.3.2.4) so P6 activities, cost accounts, documents and EVM all roll up the same way.

### Three WBSs for one plant

On a KAPP IPP, three parties each have their own WBS, and they must reconcile at the interfaces:

| Party | WBS describes | Level-2 elements (typical) |
|---|---|---|
| **MEWRE (offtaker / grid owner)** | Its own deliverables + oversight of the IPP | 400 kV transmission line; remote-end substation bay; telecom/SCADA integration; metering; land & permits; PPA oversight & testing witness; project management |
| **Project company (SPV)** | Development and EPC/O&M contracting | Development & permits; financing; EPC contract management; owner's costs; O&M mobilisation |
| **EPC contractor** | The physical plant | Engineering; procurement (modules, trackers, inverters, BESS, transformers); civil; mechanical; electrical; 400 kV substation; commissioning; documentation & training |

The EPC's WBS is far larger, but the ministry's is the one you are accountable for — and its elements are on the critical path of somebody else's revenue.

### A Level-3 EPC WBS for 1 GW PV + BESS (illustrative)

| Code | Element | Notes |
|---|---|---|
| 1.1 | Engineering | Basic & detailed design, studies (grid, protection, EMT), PVsyst yield |
| 1.2 | PV Field | 1.2.01–1.2.40 PV blocks of ~25 MWac each: piling, trackers, modules, DC cabling, string inverters or central inverter station |
| 1.3 | BESS | Containers/enclosures, PCS, MV transformers, EMS, fire protection, HVAC |
| 1.4 | MV collection | 33 kV cables, ring main units, collector switchgear |
| 1.5 | 400 kV substation | Power transformers, GIS/AIS bays, protection & control, earthing |
| 1.6 | Plant control & SCADA | PPC, SCADA, CCTV, security, met stations, telecom |
| 1.7 | Infrastructure | Roads, fencing, drainage, buildings, water for cleaning |
| 1.8 | Testing & commissioning | Cold/hot commissioning, grid-code compliance tests, performance & reliability tests |
| 1.9 | Project management & documentation | As-builts, O&M manuals, training, spares |

Splitting the PV field by **physical blocks** (not by trade) makes progress measurement honest: a block is either energised or not.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why the WBS is the backbone of control",
          md: md`Every control tool in this module hangs off the WBS: the P6 schedule (activities belong to WBS elements), the cost baseline (cost accounts), EVM (BAC by work package), the risk register (risks tagged to elements), document numbering, and the monthly report. If the contractor's WBS and yours do not reconcile at Level 2–3, you cannot compare their progress claims with your measurements.`,
        },
        {
          kind: "md",
          md: md`### The WBS dictionary

The dictionary is where the WBS becomes enforceable. One entry per work package:

| Field | Example: 1.6.3 Revenue metering |
|---|---|
| Scope | Main and check revenue meters, CTs/VTs of metering class, metering panel, data link to MEWRE settlement system |
| Deliverables | Metering design, type tests, calibrated meters, FAT/SAT records |
| Boundary | From the 400 kV metering CT/VT secondary terminals to the MEWRE metering server interface |
| Excludes | MEWRE settlement software; telecom backbone beyond the plant fence |
| Acceptance criteria | Accuracy class per the PPA and grid code; witnessed SAT; sealed by MEWRE |
| Responsible | EPC (supply/installation); MEWRE metering section (witness, sealing) |
| Interfaces | ICD-MET-001 (metering to SCADA), ICD-TEL-002 (telecom) |
| Cost account / BAC | CA-1.6.3 / USD 1.4 m |
| Schedule | P6 activities MET-1000 to MET-1450; milestone "Meters sealed" before backfeed |

### Employer's Requirements (ERs)

Under design-build contracts (FIDIC Yellow 2017, Silver 2017 "EPC/Turnkey"), the contractor designs the Works to meet the **Employer's Requirements**. Good ERs specify **purpose, performance and constraints**, not the design:

- **Must contain**: purpose; site data and who is responsible for it; performance requirements (net capacity at the point of connection, BESS usable energy at end of life, availability, PR or guaranteed yield, ramp rates, grid code); applicable standards (IEC 61215/61730, IEC 62446, IEC 62933, IEC 61850, grid code); design life; environmental conditions (50 °C+ ambient, dust, sandstorm wind loads); tests on completion and performance tests; documents to submit; interface obligations; training, spares, O&M manuals.
- **Should avoid**: prescriptive designs that transfer design risk back to the Employer; contradictions between chapters; "to be agreed later"; and "the contractor shall comply with best practice" without defining it.

Under FIDIC Silver, the contractor takes on the risk of errors in the Employer's Requirements to a much greater extent than under Yellow, which is why bidders price ambiguity. Ambiguity costs the Employer twice: in a higher bid and later in a variation.`,
        },
        { kind: "sources", refs: ["m08-pmi-pmbok7", "m08-fidic-2017", "m08-agbi-zone1-rfp"] },
      ],
    },
    {
      layer: "applied",
      title: "Building and checking WBS numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "MEWRE-side WBS for the Shagaya grid connection: 100 % rule check",
          given: md`The MEWRE-side project budget for connecting a 1.1 GW Shagaya IPP is **KWD 62.0 m**. Your draft Level-2 WBS: (1) 400 kV OHTL Shagaya–Wafra **48.6**; (2) remote-end bay extension at Wafra substation **6.2**; (3) telecom/OPGW and SCADA integration with the National Control Centre **2.1**; (4) revenue metering witness, sealing and settlement integration **0.6**; (5) land, rights of way and permits **0.4**; (6) Owner's Engineer and PM oversight **3.0**; (7) contingency **1.1** (all KWD m). The OHTL value reflects the reported March 2026 award (about KD 48.6 m).`,
          steps: [
            { md: md`Sum: $48.6 + 6.2 + 2.1 + 0.6 + 0.4 + 3.0 + 1.1 = 62.0$ — the 100 % rule holds numerically.` },
            { md: md`Weight of the OHTL: $48.6 / 62.0 = 78.4\,\%$. One element dominates cost **and** schedule; it should be decomposed further (route sections, tower foundations, stringing, crossings, OPGW, commissioning) to Level 3–4 for control.` },
            { md: md`Scope test (not just arithmetic): walk the energy path from the IPP 400 kV gantry to the grid. Is the **line-end protection coordination** with the IPP substation in (3) or (2)? Is **outage planning** at Wafra (needed to cut in the new bay) anywhere? These are activities without a home — gaps in the 100 % rule that arithmetic will never reveal.` },
            { md: md`Fix: add 2.4 "Protection & settings coordination" under (2) with its own dictionary entry, and an outage-planning work package under (6) owned by the Transmission operations department.` },
          ],
          result: md`The numbers sum, but the **scope** test found two orphan deliverables at the interface. The 100 % rule is a scope rule first and a cost rule second.`,
        },
        { kind: "sources", refs: ["m08-megaproject-400kv"] },
        {
          kind: "worked",
          mode: "faded",
          title: "Scope creep accumulation against the change budget",
          given: md`Six months after NTP on a directly procured MEWRE 250 MW BESS EPC, you list informal requests from ministry departments: **nine** small items (extra SCADA points, additional CCTV coverage, upgraded fire-panel interface, extra spare parts…) averaging **KWD 48 k** each, plus two larger ones: a **spare 33 kV feeder bay** (KWD 0.35 m) and an **additional weather station and soiling sensors** (KWD 0.22 m). The approved change allowance is **KWD 0.80 m**.`,
          steps: [
            { md: md`Small items: $9 \times 0.048 = 0.432$ m.` },
            {
              md: md`Total requested: $0.432 + 0.35 + 0.22 = 1.002$ m.`,
              hidden: true,
              check: { prompt: "Total value of requested changes", answer: 1.002, unit: "KWD m", tolerance: { abs: 0.005 } },
            },
            {
              md: md`Share of the change allowance: $1.002 / 0.80 = 125\,\%$.`,
              hidden: true,
              check: { prompt: "Percent of change allowance consumed", answer: 125.25, unit: "%", tolerance: { abs: 0.5 } },
            },
            { md: md`Action: none of these were raised as change requests, so none has a schedule assessment. Freeze informal requests, route each through the change control board with a justification, and reject the "nice to haves" (CCTV upgrade) to stay within allowance.` },
          ],
          result: md`Informal requests worth about KWD 1.0 m would consume 125 % of the allowance before a single real change (e.g., a ground-condition issue) arrives. Scope creep is lethal because each item looks small.`,
        },
        {
          kind: "question",
          question: {
            id: "m08-l02-p1",
            type: "numeric",
            prompt: md`An EPC's Level-1 progress weights are Engineering 5 %, Procurement 55 %, Construction 35 %, Commissioning 5 %. Reported progress: Engineering 90 %, Procurement 60 %, Construction 25 %, Commissioning 0 %. What is the overall weighted progress?`,
            answer: 46.25,
            unit: "%",
            tolerance: { abs: 0.1 },
            explanation: md`$0.05(90) + 0.55(60) + 0.35(25) + 0.05(0) = 4.5 + 33 + 8.75 + 0 = 46.25\,\%$. Note how procurement (55 % weight) drives the number: if "procurement progress" is credited at purchase order rather than at delivery, overall progress is massively inflated. This is the bridge to EVM in lesson 4.`,
            concepts: ["m08.wbs", "m08.hundred-percent-rule"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Scope on real Gulf PV/BESS projects",
      blocks: [
        {
          kind: "md",
          md: md`### Where scope actually breaks: the boundaries

Most scope disputes on utility PV + BESS are not inside the plant; they are at the **battery limits**:

| Boundary | Classic gap |
|---|---|
| 400 kV point of connection | Who supplies the line-side gantry, the line-end disconnector, the first span? |
| Protection | Line differential relays at both ends must be the same make/compatible — whose scope is the remote end? |
| Telecom | OPGW on the MEWRE line vs plant fibre; who provides the link to the National Control Centre? |
| SCADA / dispatch | Signal list (points list) owned by the Control Centre — often issued late, triggering redesign |
| Metering | Meter supply vs MEWRE witness/sealing; settlement data format |
| Water | Water source for module cleaning in a water-scarce desert site: supplied by whom, at what quality? |
| Auxiliary power | Back-feed supply for construction and commissioning before export is allowed |
| Land | Access roads outside the plot; laydown areas; borrow pits |

On Shagaya Phase III Zone 1, the RFP places a **400 kV substation in the IPP's scope** while MEWRE separately procured the **Shagaya–Wafra 400 kV line**. The boundary between the IPP's substation and MEWRE's line is precisely where you must have a signed scope split and interface control document.`,
        },
        { kind: "sources", refs: ["m08-agbi-zone1-rfp", "m08-megaproject-400kv"] },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Scope failure modes",
          md: md`- **Activity-based WBS** ("Mechanical installation") instead of physical blocks — progress claims cannot be verified.
- **"By others"** in the ERs without naming the other — becomes MEWRE's by default.
- **Gold-plating by the ministry**: departments add features (extra CCTV, architectural buildings) after award, each "small". Gold-plating by the contractor is rarer under lump sum, but watch "upgrades" that change spares and O&M obligations.
- **Scope stated in drawings only**: drawings conflict with the specification; the order of precedence in the contract decides — know it.
- **Undefined end-of-life BESS capacity**: "1,000 MWh" without specifying usable energy at the point of connection after year-N degradation invites a dispute.`,
        },
        {
          kind: "checklist",
          title: "PM scope checklist",
          items: [
            "Ministry-side WBS exists, is coded, and has a dictionary entry for every work package.",
            "EPC/IPP WBS reconciles with yours at Level 2–3 (crosswalk table agreed).",
            "Every battery limit is defined in a signed scope-split matrix and an ICD.",
            "Employer's Requirements state performance at the point of connection (MW, MWh usable at year N, availability).",
            "Order of precedence of contract documents is known and the ERs are consistent with the PPA.",
            "A single route exists for requests from any department: change request form to the CCB.",
            "Scope baseline (ERs + WBS + dictionary) is under document control with revision history.",
          ],
        },
        {
          kind: "ask",
          title: "Ask the contractor",
          items: [
            "Show me your WBS crosswalk to our WBS and to your P6 activity codes.",
            "What is excluded from your scope at the 400 kV interface, item by item?",
            "Which of your work packages exceed 5 % of contract value, and why are they not decomposed further?",
            "Where in your scope is cleaning water supply and storage, and what volume per cleaning cycle did you assume?",
            "What is the BESS usable energy at the point of connection at end of year 1, 10 and 20, and what augmentation is included?",
          ],
        },
        {
          kind: "feynman",
          prompt: "Explain the 100 % rule and why a WBS that sums correctly can still be missing scope.",
          keyPoints: [
            "Children sum exactly to parent; all scope, nothing extra",
            "Arithmetic consistency does not prove completeness",
            "Gaps hide at boundaries and interfaces",
            "Walk the physical/energy path and each interface to test completeness",
            "Missing scope becomes a variation or a dispute",
          ],
        },
        { kind: "scenario", scenario: "m08-s2" },
      ],
    },
  ],
  quiz: [
    {
      id: "m08-l02-q1",
      type: "mcq",
      prompt: "Which WBS element name is best practice for the PV field of an EPC WBS?",
      options: ["Install modules", "Mechanical works", "PV Block 07 (25 MWac)", "Week 14–20 activities"],
      answer: 2,
      explanation: md`WBS elements are **deliverables** (nouns). Physical blocks allow objective progress measurement and commissioning by block. Activities belong in the schedule; trade-based elements hide incomplete blocks.`,
      concepts: ["m08.wbs"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m08-l02-q2",
      type: "multi",
      prompt: "Which items belong in a WBS dictionary entry?",
      options: ["Boundary / exclusions", "Acceptance criteria", "Responsible party", "Contractor's profit margin", "Interfaces (ICD references)", "Cost account / budget"],
      answer: [0, 1, 2, 4, 5],
      explanation: md`The dictionary makes each work package enforceable: what is in and out, how acceptance is judged, who owns it, what it touches and what it costs. Contractor margin is commercial data, not a scope attribute.`,
      concepts: ["m08.wbs-dictionary"],
      difficulty: 1,
    },
    {
      id: "m08-l02-q3",
      type: "mcq",
      prompt: "Under a design-build (FIDIC Yellow/Silver) contract, Employer's Requirements should primarily specify…",
      options: ["The detailed design so the Employer stays in control", "Purpose, performance, standards and constraints", "The contractor's construction methods", "Only the price"],
      answer: 1,
      explanation: md`The contractor carries design responsibility. Prescriptive design in the ERs pulls design risk back to the Employer and invites claims when the prescribed design does not achieve the performance.`,
      concepts: ["m08.employers-requirements"],
      difficulty: 2,
    },
    {
      id: "m08-l02-q4",
      type: "numeric",
      prompt: md`A Level-2 WBS for MEWRE grid scope is: line 30.5, substation bay 5.2, telecom 1.8, metering 0.5, oversight 2.0 (KWD m). The approved budget is KWD 41.5 m including KWD 1.0 m contingency. By how much (KWD m) does the WBS fail the 100 % rule if contingency is meant to be a WBS element?`,
      answer: 0.5,
      unit: "KWD m",
      tolerance: { abs: 0.01 },
      explanation: md`Elements sum to $30.5 + 5.2 + 1.8 + 0.5 + 2.0 = 40.0$; adding contingency 1.0 gives 41.0, short of 41.5 by **0.5** m. Either scope is missing (unallocated budget) or the budget is wrong — investigate before baselining.`,
      concepts: ["m08.hundred-percent-rule"],
      difficulty: 2,
    },
    {
      id: "m08-l02-q5",
      type: "decision",
      prompt: md`The Control Centre asks the IPP's EPC, informally at a site visit, to add 300 SCADA signals beyond the agreed points list. The EPC's site manager agrees "to keep the client happy". You are MEWRE's PM.`,
      options: [
        { text: "Write to the IPP that any change to the signal list must come through the formal change/interface procedure, and ask the Control Centre to submit a justified change request.", score: 1, feedback: "Correct: protects MEWRE from a later variation claim passed through the PPA, and gets the change assessed for schedule impact." },
        { text: "Accept it — it is free.", score: 0.1, feedback: "Nothing is free: it will reappear as a claim or a delay to SCADA testing, possibly delaying COD." },
        { text: "Tell the Control Centre it cannot have the signals.", score: 0.4, feedback: "It may be a legitimate operational need. Route it, don't refuse it." },
      ],
      explanation: md`Informal agreements on site are the main channel of scope creep. A single formal route protects both scope and relationships.`,
      concepts: ["m08.scope-creep", "m08.scope-boundary"],
      difficulty: 2,
    },
    {
      id: "m08-l02-q6",
      type: "short",
      prompt: "Name four battery-limit interfaces between a Shagaya PV IPP and MEWRE that must be defined in the scope split, and why each matters.",
      rubric: [
        "400 kV point of connection (gantry/first span/disconnector)",
        "Protection compatibility at both line ends",
        "Telecom/OPGW and SCADA link to the control centre / points list",
        "Revenue metering supply vs witness/sealing",
        "Water for cleaning, auxiliary power, land/access roads (any acceptable)",
      ],
      modelAnswer: "1) The 400 kV point of connection — who supplies the gantry, line-end disconnector and first span determines energisation readiness. 2) Line protection at both ends — differential relays must be compatible, so the remote-end scope must be fixed. 3) Telecom and SCADA — the OPGW link and the Control Centre points list gate dispatch testing. 4) Revenue metering — the IPP supplies, MEWRE witnesses and seals; without sealed meters there is no COD or settlement. Also water for cleaning and back-feed power for commissioning.",
      explanation: md`Interfaces are where scope gaps hide and where ministry-caused delay creates compensation exposure under the PPA. Each must have an owner, a date, and an ICD.`,
      concepts: ["m08.scope-boundary"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m08-l02-f1", front: "100 % rule", back: "The WBS contains all the scope and only the scope; each level sums exactly to its parent." },
    { id: "m08-l02-f2", front: "WBS element: noun or verb?", back: "Noun — a deliverable. Activities (verbs) live in the schedule under the work package." },
    { id: "m08-l02-f3", front: "Work package", back: "Lowest WBS level where cost and schedule are planned, measured and owned (typically 1–4 % of value)." },
    { id: "m08-l02-f4", front: "Scope creep vs gold-plating", back: "Creep: uncontrolled additions requested by stakeholders. Gold-plating: extras added by the delivery team that nobody asked for." },
    { id: "m08-l02-f5", front: "Employer's Requirements should state…", back: "Purpose, performance, standards, constraints, tests — not the design." },
    { id: "m08-l02-f6", front: "Why split the PV field WBS by physical block?", back: "Objective progress measurement and block-by-block commissioning/energisation." },
    { id: "m08-l02-f7", front: "Shagaya Ph III Zone 1: which 400 kV assets are in which scope?", back: "400 kV substation in the IPP's RFP scope; Shagaya–Wafra 400 kV line procured separately by MEWRE." },
  ],
  scenarios: [
    {
      id: "m08-s2",
      title: "The Undersecretary's extra building",
      context: md`Four months after award of a directly procured MEWRE BESS EPC (lump sum, FIDIC Yellow-based), a senior official visits site and asks for the control building to be enlarged with a visitor gallery and a VIP meeting room "for delegations". The EPC's project director says yes in the meeting.`,
      start: "a",
      concepts: ["m08.scope-creep", "m08.employers-requirements"],
      nodes: {
        a: {
          md: md`Back in the office, what is your first move?`,
          choices: [
            { text: "Ask the EPC for a formal variation proposal (cost, time, design impact) under the contract's variation procedure before anything is designed.", next: "b", score: 10, feedback: "Right: get the facts on a formal basis before the change silently enters design." },
            { text: "Let the EPC proceed — the instruction came from a senior official.", next: "c", score: 2, feedback: "An oral request is not a valid instruction under most contracts, but if the Employer's staff let work proceed, the EPC will claim. You have also lost control of the cost." },
          ],
        },
        b: {
          md: md`The proposal arrives: KWD 0.42 m and 6 weeks on the control building, which is on the near-critical path for SCADA installation (total float 3 weeks).`,
          choices: [
            { text: "Prepare a decision paper: need, cost, 3-week project delay risk, alternatives (temporary visitor cabin, gallery later in a separate contract), and recommend the alternative.", next: "d", score: 10, feedback: "You give leadership a real choice and protect the critical path." },
            { text: "Approve it yourself; it is within the change allowance.", next: "c", score: 3, feedback: "It may be within money, but not within time: 6 weeks against 3 weeks float delays completion. That needs the steering committee." },
          ],
        },
        c: {
          md: md`Two months later the EPC submits a claim for KWD 0.55 m and a 4-week extension of time, citing the official's instruction and redesign.`,
          choices: [
            { text: "Assess it properly with the Engineer; accept the valid portion and record the lesson: no informal instructions.", score: 5, feedback: "Damage control. The claim is probably partly valid because the Employer's side allowed the change." },
            { text: "Reject it outright because there was no written instruction.", score: 2, feedback: "If the Employer's staff accepted the work, a tribunal may find a valid instruction or waiver. Rejection invites a dispute." },
          ],
        },
        d: {
          md: md`The official accepts a temporary cabin now and the gallery as a post-COD minor works package.`,
          choices: [
            { text: "Record the decision, close the request in the change log, and brief site staff that requests must come through the PM.", score: 10, feedback: "Closing the loop prevents the next visit from restarting the same conversation." },
          ],
        },
      },
    },
  ],
};

export default lesson;
