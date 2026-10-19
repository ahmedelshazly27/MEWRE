import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m08-l06",
  title: "Change Control, Interface Management and Document Control",
  summary:
    "The three administrative systems that decide who pays when things change: change control (variations, time impact analysis, valuation), interface management (EPC/grid/substation/telecom interfaces, registers, ICDs) and document control (numbering, transmittals, review codes, EDMS, RFIs, NCRs).",
  minutes: 75,
  objectives: [
    "You can run a change request from identification to approved variation, including a time impact analysis on the CPM network and valuation with prolongation cost.",
    "You can set up an interface register and interface control documents for a PV IPP's grid, substation, telecom and SCADA interfaces.",
    "You can design a document numbering and review system, interpret review codes A/B/C, and use an EDMS such as Aconex as a contractual record.",
    "You can distinguish RFIs, technical queries, site instructions, NCRs and variations, and prevent RFIs from becoming unpriced change.",
  ],
  concepts: [
    { id: "m08.change-control", name: "Change control", description: "Formal process to identify, assess (cost, time, risk, quality), approve or reject, implement and record changes to the baseline.", competency: "controls", related: ["m08.scope-creep", "m09.variation-valuation"] },
    { id: "m08.time-impact-analysis", name: "Time impact analysis (TIA)", description: "Prospective delay analysis: insert a fragnet representing the change into the current schedule and measure the effect on completion.", competency: "controls", related: ["m08.cpm", "m08.change-control", "m09.delay-analysis"] },
    { id: "m08.interface-management", name: "Interface management", description: "Identifying, documenting and controlling the physical, functional and organisational interfaces between scopes and parties through a register and ICDs.", competency: "delivery", related: ["m08.scope-boundary", "m15.grid-interface", "m06.scada-architecture"] },
    { id: "m08.document-control", name: "Document control & EDMS", description: "Numbering, revision, transmittal, review-code and records system — usually on an EDMS (e.g., Aconex) — that forms the contractual record.", competency: "delivery", related: ["m07.design-review"] },
    { id: "m08.rfi-ncr", name: "RFIs, NCRs and instructions", description: "RFI: request for clarification. NCR: record of non-conformance. Instruction/variation: change to the Works. Mixing them creates disputes.", competency: "contracts", related: ["m08.change-control", "m08.document-control", "m09.claims-time-bar"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Three systems, one purpose: an unarguable record",
      blocks: [
        {
          kind: "md",
          md: md`Every large project changes. Disputes do not come from change; they come from **unrecorded, unassessed, or ambiguously authorised** change. Change control, interface management and document control are three views of the same discipline: making sure that for every change, interface and document there is one authoritative version, one owner, and a time-stamped trail.

### Change control

A **baseline** (scope, schedule, cost) is what you measure against. Change control protects it:

1. **Identify** — change request (CR) from any party, or a contractor's notice.
2. **Log** — change register entry with unique number.
3. **Assess** — technical need, cost, time (TIA), risk, quality, HSE, O&M and PPA implications.
4. **Decide** — by the authority set in the DoA (PM / Change Control Board / steering committee).
5. **Instruct** — formal variation instruction under the contract (never oral).
6. **Implement and re-baseline** — update scope documents, schedule, budget, EVM.
7. **Close** — agreed final value and time.

Under FIDIC 2017, Clause 13 governs variations: **13.1** right to vary (Engineer/Employer may instruct; contractor may object on limited grounds), **13.2** value engineering (contractor proposals), **13.3** variation procedure — either by **instruction** (13.3.1) or by **request for proposal** (13.3.2). Claims for time and money that are not variations go through **Clause 20** (2017: notice within 28 days of becoming aware; fully detailed claim within 84 days). The notice periods are strict: missing them can bar the claim, which is why disciplined parties notify everything.

### Valuing a change: direct cost + time

Value = direct cost with overhead and profit, plus time-related cost for each week **completion** is delayed:`,
        },
        { kind: "equation", formula: "change-valuation" },
        {
          kind: "md",
          md: md`Time-related costs (site management, facilities, equipment hire, insurance, bonds) are typically quoted per week. Prolongation is paid only when **completion** is delayed — which is why the time impact analysis, not the duration of the changed activity, decides the money.

### Time impact analysis (prospective)

1. Take the latest accepted schedule update (data date before the change).
2. Build a **fragnet**: the new/changed activities and their logic.
3. Insert it, recalculate, and compare completion before/after.
4. The difference is the delay attributable to the change (consider concurrent delay and mitigation).

AACE RP 29R-03 describes this as a "modeled / additive / single base" method; for disputes after the fact, other methods (windows analysis, as-planned vs as-built) are used.

### Interface management

An **interface** is any point where one party's scope, design or activity depends on another's. Types: **physical** (a cable termination at a gantry), **functional** (protection signals, SCADA points), **contractual** (who provides what by when), **organisational** (approvals, outages). Tools:

- **Interface register**: ID, parties, description, type, need-date, give-date, status, owner, linked ICD, linked schedule activities.
- **Interface control document (ICD)**: the technical agreement — drawings, ratings, protocols, signal lists, connection details, responsibilities, test responsibilities — signed by both sides and under revision control.
- **Interface milestones** in each party's schedule with matched dates ("Give" in one schedule = "Need" in the other).

### Document control

| Element | Practice |
|---|---|
| **Numbering** | Project–Originator–Area–Discipline–Type–Sequence, e.g., SHG3-EPC-400-ELE-SLD-0001 |
| **Revisions** | Letters (A, B, C…) before construction issue; numbers (0, 1, 2…) from IFC; never reuse a number |
| **Status** | IFR (for review), IFA (for approval), IFC (for construction), As-built |
| **Transmittal** | Every issue under a numbered transmittal stating purpose and required response date |
| **Review codes** | **A** — no comments, proceed; **B** — proceed subject to incorporating comments, resubmit; **C** — rejected/revise and resubmit, do not proceed; (**D** — for information/no review) |
| **Review period** | Contractual (FIDIC Yellow 2017 default Review Period: 21 days unless stated otherwise) |
| **EDMS** | Aconex-type platform: controlled workflows, audit trail, formal correspondence, registers |

A document review comment is **not** a variation instruction. If a reviewer's comment changes the Employer's Requirements, the contractor will (correctly) notify a variation. Reviewers must comment against the ERs, not preferences.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why records win disputes",
          md: md`In a delay or variation dispute, the tribunal reconstructs events from **contemporaneous records**: transmittal dates, review returns, RFI responses, site diaries, minutes. Memory and email threads lose. An EDMS with a complete audit trail is worth more to MEWRE in a claim than any expert's opinion — but only if everyone, including senior officials, uses it rather than WhatsApp.`,
        },
        { kind: "sources", refs: ["m08-fidic-2017", "m08-aace-rp", "m08-aconex"] },
      ],
    },
    {
      layer: "applied",
      title: "Assessing a change and measuring document flow",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Time impact analysis and valuation of a variation",
          given: md`Use the lesson-3 network (62 weeks; I inverter/MV installation 34–40, TF 6; J DC/AC cabling 44–54, TF 2; L commissioning 56–62). MEWRE instructs the addition of **DC-coupled BESS provisions** in 20 PV blocks: inverter station installation I becomes **8 weeks** (+2) and cabling J becomes **13 weeks** (+3). Direct cost including overhead and profit: **KWD 0.85 m**. Contract time-related cost: **KWD 75 k per week** of completion delay.`,
          steps: [
            { md: md`Fragnet inserted: I: ES 34 → EF 42. J: ES = max(EF F = 44, EF I = 42) = 44 → EF 57.` },
            { md: md`L: ES = max(EF G = 56, EF J = 57, EF K = 40) = 57 → EF **63**. Completion delay = 63 − 62 = **1 week**. The I change (+2 weeks) was absorbed by I's free float (4 weeks); the J change (+3) exceeded J's total float (2) by 1 week.` },
            { md: md`Valuation: $0.85 + 1 \times 0.075 = 0.925$ m.` },
            { md: md`The contractor is entitled to **1 week EOT** and KWD 0.925 m (subject to the contract's valuation rules). The new critical path now includes J — a near-critical activity became critical, so monitor cabling productivity.` },
          ],
          result: md`EOT 1 week; value ≈ KWD 0.925 m. Note how the contractor may initially claim 5 weeks (2 + 3) — summing changed durations is the classic error; only the effect on completion counts.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Document review performance and cycle time",
          given: md`In the last quarter MEWRE/OE returned **420** first submissions of IPP design documents: **110** code A, **190** code B, **120** code C. Contract Review Period: 21 days. Assume each code C document is resubmitted after 14 days and then reviewed again (21 days) and accepted.`,
          steps: [
            {
              md: md`Share returned code C: $120/420 = 28.6\,\%$; first-time acceptance (A+B): $300/420 = 71.4\,\%$.`,
              hidden: true,
              check: { prompt: "Percent of documents returned code C", answer: 28.57, unit: "%", tolerance: { abs: 0.1 } },
            },
            {
              md: md`Expected cycle time to acceptance: $21 + 0.286 \times (14 + 21) = 31$ days.`,
              hidden: true,
              check: { prompt: "Expected cycle time per document", answer: 31, unit: "days", tolerance: { abs: 0.3 } },
            },
            { md: md`Diagnosis: a 29 % rejection rate adds 10 days on average. If the C-codes concentrate on a critical discipline (e.g., piling design), design approval drives the critical path. Root-cause the C-codes: poor contractor quality, or reviewers commenting beyond the ERs?` },
          ],
          result: md`28.6 % code C; average 31 days to acceptance vs 21 nominal. Track by discipline and reviewer, and check every code C comment cites an ER/standard clause — otherwise it may be a disguised variation.`,
        },
        {
          kind: "question",
          question: {
            id: "m08-l06-p1",
            type: "decision",
            prompt: md`The EPC submits an RFI: "Please confirm cable trench depth at road crossings." Your OE drafts a response: "Use 1.5 m depth with concrete encasement" — the ERs specify 0.8 m with protective tiles. You are the PM.`,
            options: [
              { text: "Do not issue as an RFI response; if the deeper design is genuinely required, assess it through change control (cost/time) and instruct it as a variation; otherwise answer per the ERs.", score: 1, feedback: "Correct: an RFI response that changes requirements is an instruction in disguise, and the contractor will claim for it." },
              { text: "Issue the OE's response — safer design.", score: 0.2, feedback: "It changes the ERs; expect a variation claim and argue about it later." },
              { text: "Ignore the RFI until the contractor proposes a depth.", score: 0.1, feedback: "Unanswered RFIs within the response period become delay claims." },
            ],
            explanation: md`RFIs clarify; they do not change scope. Any answer that changes the requirements must go through change control.`,
            concepts: ["m08.rfi-ncr", "m08.change-control"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running the systems on a PV IPP with MEWRE grid works",
      blocks: [
        {
          kind: "md",
          md: md`### The interface register for a Shagaya-type IPP

| ID | Interface | Parties | Type | Give / need | ICD |
|---|---|---|---|---|---|
| IF-001 | 400 kV line termination at IPP substation gantry | MEWRE line contractor ↔ IPP EPC | Physical | Gantry design: IPP gives by M6; line contractor needs by M7 | ICD-HV-001 |
| IF-002 | Line protection (differential) both ends, settings | MEWRE Transmission ↔ IPP | Functional | Relay type agreed M4; settings M18 | ICD-PROT-001 |
| IF-003 | OPGW/telecom to National Control Centre | MEWRE telecom ↔ IPP | Physical/functional | Fibre path M12; link test M20 | ICD-TEL-001 |
| IF-004 | SCADA points list and protocol (IEC 60870-5-104 / IEC 61850) | Control Centre ↔ IPP | Functional | Points list by M8 | ICD-SCADA-001 |
| IF-005 | Revenue metering | MEWRE metering ↔ IPP | Contractual/functional | Meter type approval M10; sealing before backfeed | ICD-MET-001 |
| IF-006 | Backfeed / energisation permit and outage windows | MEWRE operations ↔ IPP | Organisational | Outage request 8 weeks ahead | — |
| IF-007 | Grid-code compliance testing windows | Control Centre ↔ IPP | Organisational | Test plan M20; tests M22–24 | ICD-GCT-001 |

Match each "give" date to a P6 milestone in MEWRE's schedule with float visible. Review the register in the bi-weekly Interface Working Group; anything forecast late is reported in the monthly report and treated as an early warning.

### Change control in a ministry

- **Single entry point**: all departments' requests come as CRs to the PM; no direct requests to contractors.
- **Change Control Board** with contracts, finance, OE, operations; DoA thresholds for approval (and note that variations may need State Audit Bureau review depending on value and contract — verify current rules).
- **Change register** visible monthly: approved, pending, rejected, potential (notified but not assessed); and cumulative change as % of contract value.
- On an **IPP**, changes MEWRE requests to the plant usually flow through the PPA's change provisions and can increase the tariff or shift dates — the "cheap" ministry request becomes a 25-year cost.

### Document control and correspondence

Set up the EDMS before NTP: numbering procedure, distribution matrix (who reviews which discipline), review-code definitions, response periods per contract, templates (transmittal, RFI, TQ, NCR, site instruction, letter). Formal correspondence by letter on the EDMS; minutes issued within 48 hours and agreed at the next meeting. Arabic/English: decide which language governs the contract and correspondence, and keep certified translations of key letters.

### RFIs, TQs, NCRs, SIs — keep them separate

| Document | Purpose | From → to | Can change scope? |
|---|---|---|---|
| **RFI / TQ** | Clarify an ambiguity | Contractor → Engineer/Employer | No |
| **Site instruction (SI)** | Direct site work within contract | Engineer → Contractor | Only if issued as a variation |
| **Variation instruction** | Change the Works | Engineer/Employer → Contractor | Yes, with valuation and time |
| **NCR** | Record work not meeting requirements | QA/QC → Contractor | No — contractor fixes at own cost |
| **Notice / claim** | Contractual entitlement (time/money) | Either party | Triggers Clause 20 process |`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Where these systems break",
          md: md`- Senior officials giving instructions by phone or WhatsApp; contractor executes and claims.
- Interface "give" dates in the contractor's schedule with no matching activity in MEWRE's.
- Points list issued late by the Control Centre — the classic ministry-caused delay on PV projects.
- Reviewers using code C for preferences, creating disguised variations and delay claims.
- RFI log with hundreds of open items past the response period.
- Two EDMSs (contractor's and Employer's) with no single record of truth.`,
        },
        {
          kind: "checklist",
          title: "PM checklist — change, interfaces, documents",
          items: [
            "Change procedure and DoA approved; single entry point communicated to all departments.",
            "Change register reported monthly with potential changes and cumulative % of contract.",
            "Every change assessed with a TIA on the current schedule before approval.",
            "Interface register live; every MEWRE 'give' is a milestone in MEWRE's schedule.",
            "ICDs signed for HV, protection, telecom, SCADA, metering before detailed design freeze.",
            "EDMS configured: numbering, workflows, review codes, response periods, distribution matrix.",
            "RFI/NCR/SI logs with ageing reports; overdue responses escalated weekly.",
          ],
        },
        {
          kind: "ask",
          title: "Ask the contractor / OE",
          items: [
            "Which interface 'need' dates in your schedule depend on MEWRE, and how much float do they have?",
            "How many RFIs are open past the response period, and which are on the critical path?",
            "Show me the TIA fragnet for this change, built on the last accepted update.",
            "Which code C comments do you consider changes to the Employer's Requirements?",
            "What is your NCR closure time by discipline, and what are the repeat NCR categories?",
          ],
        },
        {
          kind: "feynman",
          prompt: "Explain why an RFI response must never change the Employer's Requirements, and what to do when the right answer does change them.",
          keyPoints: [
            "RFI is clarification, not instruction",
            "Changing requirements entitles the contractor to a variation",
            "Unpriced changes become disputes/claims",
            "Route genuine changes through change control with TIA and valuation",
            "Records: the RFI response is a contractual document",
          ],
        },
        { kind: "scenario", scenario: "m08-s6" },
        { kind: "sources", refs: ["m08-fidic-2017", "m08-megaproject-400kv", "m08-audit-bureau-law"] },
      ],
    },
  ],
  quiz: [
    {
      id: "m08-l06-q1",
      type: "mcq",
      prompt: "A document returned with review code **B** means…",
      options: ["Rejected; do not proceed", "Proceed subject to incorporating comments; resubmit", "For information only", "Approved as built"],
      answer: 1,
      explanation: md`A: proceed, no comments. B: proceed with comments incorporated, resubmit. C: rejected, revise and resubmit, do not proceed. Definitions must be in the project's document control procedure.`,
      concepts: ["m08.document-control"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m08-l06-q2",
      type: "numeric",
      prompt: md`A change adds 5 weeks to an activity with total float 3 weeks and free float 1 week. Time-related cost is KWD 60 k/week; direct cost KWD 0.4 m. What is the variation value (KWD m), assuming the float is not otherwise consumed?`,
      answer: 0.52,
      unit: "KWD m",
      tolerance: { abs: 0.005 },
      explanation: md`Completion delay = 5 − 3 = 2 weeks. Value = 0.4 + 2 × 0.06 = **0.52** m. Free float tells you successors are disturbed after 1 week, but completion moves only once total float is exhausted.`,
      concepts: ["m08.time-impact-analysis", "m08.change-control"],
      difficulty: 2,
    },
    {
      id: "m08-l06-q3",
      type: "order",
      prompt: "Order the change control steps.",
      items: ["Identify and raise change request", "Log in change register", "Assess cost, time (TIA), risk, quality", "Decide per delegation of authority", "Issue formal variation instruction", "Implement and update baselines", "Agree final value and close"],
      explanation: md`Skipping assessment or formal instruction is where disputes start. Re-baselining keeps EVM honest after approved changes.`,
      concepts: ["m08.change-control"],
      difficulty: 1,
    },
    {
      id: "m08-l06-q4",
      type: "multi",
      prompt: "Which belong in an interface control document (ICD) for the SCADA interface between an IPP and the National Control Centre?",
      options: ["Points/signal list", "Communication protocol and redundancy", "Responsibility for each side's equipment and tests", "The EPC's profit margin", "Revision history and signatures of both parties"],
      answer: [0, 1, 2, 4],
      explanation: md`An ICD is the technical and responsibility agreement for the interface, under revision control and signed by both parties. Commercial data belongs elsewhere.`,
      concepts: ["m08.interface-management"],
      difficulty: 1,
    },
    {
      id: "m08-l06-q5",
      type: "mcq",
      prompt: "Under FIDIC 2017 Clause 20, within how many days of becoming aware of the event must the contractor give notice of a claim?",
      options: ["7 days", "14 days", "28 days", "84 days"],
      answer: 2,
      explanation: md`28 days for the notice; the fully detailed claim follows within 84 days. Late notice can bar the claim (subject to the contract and governing law) — which is why contractors notify defensively and why Employers must track notices.`,
      concepts: ["m08.change-control", "m08.rfi-ncr"],
      difficulty: 2,
    },
    {
      id: "m08-l06-q6",
      type: "short",
      prompt: "The Control Centre will issue the SCADA points list 6 weeks after the ICD need-date. Describe what you do as MEWRE PM in the next week.",
      rubric: [
        "Quantify schedule impact using float on the IPP/EPC schedule",
        "Treat it as Employer-side delay risk / early warning; notify/discuss with IPP",
        "Escalate within MEWRE with options (interim list, phased list)",
        "Update interface register and risk register",
        "Keep records for potential claim / PPA relief",
      ],
      modelAnswer: "Check the IPP's schedule: where does the points list feed (SCADA configuration, FAT, site tests) and how much float exists. If the 6 weeks exceed float, this is a MEWRE-caused delay creating EOT/PPA relief exposure. Raise it immediately in the interface working group as an early warning, agree mitigation (an interim points list covering 90 % of standard signals now, with the rest later), escalate within MEWRE to the Control Centre head with a decision paper, update the interface and risk registers, and keep all records.",
      explanation: md`Ministry-side interface deliverables are where MEWRE most often becomes the cause of delay. Early quantification and a mitigation option usually prevent a claim.`,
      concepts: ["m08.interface-management", "m08.time-impact-analysis"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m08-l06-f1", front: "Review codes A / B / C", back: "A: proceed, no comments. B: proceed incorporating comments, resubmit. C: rejected, revise and resubmit, do not proceed." },
    { id: "m08-l06-f2", front: "FIDIC 2017 Clause 13.3 variation routes", back: "13.3.1 by instruction; 13.3.2 by request for proposal." },
    { id: "m08-l06-f3", front: "FIDIC 2017 claim notice and detailed claim periods", back: "Notice within 28 days of awareness; fully detailed claim within 84 days." },
    { id: "m08-l06-f4", front: "Time impact analysis", back: "Insert a fragnet of the change into the current schedule; completion difference = delay due to the change." },
    { id: "m08-l06-f5", front: "When is prolongation cost payable for a change?", back: "Only when completion is delayed (float exhausted), not when the changed activity is longer." },
    { id: "m08-l06-f6", front: "ICD", back: "Interface control document: signed technical/responsibility agreement for one interface, under revision control." },
    { id: "m08-l06-f7", front: "RFI vs variation", back: "RFI clarifies existing requirements; a variation changes them (with valuation and time)." },
    { id: "m08-l06-f8", front: "Revision convention", back: "Letters (A, B…) before construction issue; numbers (0, 1…) from IFC onwards." },
  ],
  scenarios: [
    {
      id: "m08-s6",
      title: "The points list nobody owns",
      dayInLife: true,
      context: md`Month 7 of a 1.1 GW IPP. At the Interface Working Group, the IPP's EPC states that the National Control Centre's SCADA points list (ICD-SCADA-001 need-date: month 8) has not been started. The Control Centre representative says they "were never asked formally" and are busy with summer peak operations.`,
      start: "a",
      concepts: ["m08.interface-management", "m08.document-control", "m08.time-impact-analysis"],
      nodes: {
        a: {
          md: md`What do you do first?`,
          choices: [
            { text: "Check the interface register and EDMS for the formal request trail, and ask the IPP for the float on the SCADA configuration path.", next: "b", score: 10, feedback: "Facts first: was it requested, and how much time do we have?" },
            { text: "Promise the EPC the list next week to calm things down.", next: "c", score: 2, feedback: "A promise you cannot keep becomes evidence of Employer delay." },
          ],
        },
        b: {
          md: md`The register shows the interface but no formal transmittal to the Control Centre — the previous PM requested it by email. The SCADA path has 5 weeks of float; the Control Centre says it needs 10 weeks during summer.`,
          choices: [
            { text: "Issue a formal request through the EDMS; propose an interim standard points list (from a previous plant) within 3 weeks with the plant-specific remainder later; escalate to the Control Centre head with the delay exposure; log an early warning with the IPP.", next: "d", score: 10, feedback: "Formalises the request, mitigates with a phased list, and gives leadership the exposure." },
            { text: "Ask the IPP to start SCADA configuration without the list.", next: "c", score: 3, feedback: "Configuration without the list means rework — and a claim for it." },
          ],
        },
        c: {
          md: md`Month 10: the IPP notifies a delay event under the PPA, citing late Employer information, and claims 5 weeks of relief on the scheduled COD.`,
          choices: [
            { text: "Assess the notice with records, negotiate the relief based on the TIA, and fix the interface process.", score: 5, feedback: "Damage control; the PPA relief may cost deemed-energy payments or pushes COD into the next summer." },
            { text: "Reject the notice — the EPC should have chased.", score: 1, feedback: "The obligation was MEWRE's; rejection will likely fail and sour the relationship." },
          ],
        },
        d: {
          md: md`The interim list is issued in week 3. What prevents a repeat?`,
          choices: [
            { text: "Audit every MEWRE 'give' in the interface register: owner, formal request sent via EDMS, matching milestone in MEWRE's schedule, and review at each Interface Working Group.", score: 10, feedback: "Systemic fix: the next missing item gets caught months earlier." },
            { text: "Remind the Control Centre to be faster next time.", score: 3, feedback: "Exhortation is not a system." },
          ],
        },
      },
    },
  ],
};

export default lesson;
