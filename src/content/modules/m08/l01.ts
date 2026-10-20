import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m08-l01",
  title: "PMBOK and PRINCE2 for Ministry Projects: Governance, Steering Committees and Stage Gates",
  summary:
    "What the two dominant PM frameworks actually say (PMBOK 7 principles and performance domains, the process groups people still use, PRINCE2 7th edition), and how to turn them into a working governance structure for a MEWRE renewable project.",
  minutes: 70,
  objectives: [
    "You can name the PMBOK 7 principles and performance domains and explain why PMI moved away from processes, while still using the five process groups that ministries and contractors talk in.",
    "You can describe PRINCE2 7th edition (principles, practices, processes, roles) and map the Project Board onto MEWRE's steering committee.",
    "You can design a stage-gate and tolerance regime for a ministry project and decide when an issue must be escalated as an exception.",
    "You can tailor the frameworks to an IPP, where MEWRE is offtaker and grid owner rather than the builder.",
  ],
  concepts: [
    { id: "m08.pmbok-principles", name: "PMBOK 7 principles & performance domains", description: "PMI's principle-based standard (2021): 12 principles of good project behaviour and 8 performance domains of outcomes, replacing the process-centric 6th edition.", competency: "delivery" },
    { id: "m08.process-groups", name: "Process groups", description: "Initiating, Planning, Executing, Monitoring & Controlling, Closing — the PMBOK 6 structure (49 processes in 10 knowledge areas) still used as common vocabulary.", competency: "delivery" },
    { id: "m08.prince2", name: "PRINCE2 7th edition", description: "Product- and stage-based method: 7 principles, 7 practices, 7 processes, plus people and project context; Project Board of Executive, Senior User, Senior Supplier.", competency: "delivery" },
    { id: "m08.governance", name: "Project governance & steering committee", description: "The decision structure above the PM: who approves baselines, changes, stage transitions and exceptions, and on what information.", competency: "leadership", related: ["m08.prince2", "m00.decision-chain", "m13.decision-memo"] },
    { id: "m08.stage-gates", name: "Stage gates", description: "Formal decision points where continued business justification, readiness and risk are reviewed before committing the next tranche of money and authority.", competency: "delivery", related: ["m08.governance", "m07.stage-gate", "m07.gate-review"] },
    { id: "m08.tolerances", name: "Tolerances & management by exception", description: "Pre-agreed permissible deviation (time, cost, scope, quality, benefits, risk, sustainability) within which a level of management may act without escalating.", competency: "controls", related: ["m08.governance"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Two frameworks, one job: controlled commitment of public money",
      blocks: [
        {
          kind: "md",
          md: md`A project management framework is a **shared language for making commitments and detecting when they are about to be broken**. For a ministry project the money is public, the approvals are layered (KAPP, Higher Committee, State Audit Bureau, Fatwa and Legislation), and the consequences of a late plant are measured in summer load-shedding. The frameworks matter less as doctrine than as a way to make your governance predictable to everyone around you: consultants trained on PMBOK, European EPCs trained on PRINCE2-style stage control, lenders' advisors who think in gates and conditions precedent.

### PMBOK Guide 7th edition (PMI, 2021)

The 7th edition replaced the familiar 49-process structure with **principles** (how a good project team behaves) and **performance domains** (what must go well). The reason: projects are increasingly hybrid (predictive construction plus agile software, e.g., a PPC/EMS integration), and a process catalogue had become a box-ticking exercise.

**12 principles** (abbreviated):

| # | Principle | What it means on a MEWRE PV/BESS project |
|---|---|---|
| 1 | Be a diligent, respectful and caring **steward** | Public money, Audit Bureau scrutiny, 30-year asset |
| 2 | Create a collaborative **team** environment | Ministry, KAPP, OE, EPC, grid sector — one interface view |
| 3 | Effectively engage with **stakeholders** | Transmission sector, KISR, EPA, Municipality, Customs |
| 4 | Focus on **value** | Energy delivered at the summer peak, not "MW installed" |
| 5 | Recognise and respond to **systems interactions** | Plant + 400 kV line + substation + dispatch as one system |
| 6 | Demonstrate **leadership** behaviours | Make decisions, unblock approvals |
| 7 | **Tailor** based on context | IPP oversight ≠ in-house EPC delivery |
| 8 | Build **quality** into processes and deliverables | ITPs, hold points, not end-of-line inspection |
| 9 | Navigate **complexity** | Two procurement tracks (KAPP IPP and G2G), shared grid |
| 10 | Optimise **risk** responses | Owners, triggers, contingency at P80 |
| 11 | Embrace **adaptability and resiliency** | Summer working restrictions, sandstorms, supply shocks |
| 12 | Enable **change** to achieve the envisioned future state | Ministry capability for 15 %+ renewables |

**8 performance domains**:

- Stakeholders
- Team
- Development approach and life cycle
- Planning
- Project work
- Delivery
- Measurement
- Uncertainty

### The process groups people still use

Nobody in a contractor's monthly meeting says "uncertainty performance domain". They say "we are in execution" and "monitoring and control". The PMBOK 6th edition (2017) structure remains the lingua franca:

| Process group | Typical outputs on a utility PV project |
|---|---|
| **Initiating** | Project charter, stakeholder register, business case reference |
| **Planning** | Project management plan, WBS, baseline schedule (P6), cost baseline, risk register, quality plan, communications plan |
| **Executing** | Design reviews, procurement, construction, team management |
| **Monitoring & Controlling** | EVM, schedule updates, change control, quality inspections, risk reviews |
| **Closing** | Taking-over certificates, as-builts, lessons learned, contract close-out |

The 10 knowledge areas (integration, scope, schedule, cost, quality, resource, communications, risk, procurement, stakeholder) map almost one-to-one onto the lessons of this module.`,
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Edition check",
          md: md`PMI periodically revises the PMBOK Guide; a newer edition may restore more process guidance. When a tender, consultant contract or PMP training cites "PMBOK", check which edition is meant. The concepts in this lesson are stable across editions.`,
        },
        {
          kind: "md",
          md: md`### PRINCE2 7th edition (PeopleCert/AXELOS, 2023)

PRINCE2 is a **method**, not a body of knowledge: it tells you who decides what, when, on what documents. It is built from five integrated elements: **principles, people, practices, processes, project context**.

**7 principles**:

- continued business justification
- learn from experience
- define roles, responsibilities and relationships
- manage by stages
- manage by exception
- focus on products
- tailor to suit the project

**7 practices** (called "themes" until the 6th edition):

- business case
- organizing
- plans
- quality
- risk
- issues
- progress

**7 processes**:

- Starting up a project (SU)
- Directing a project (DP)
- Initiating a project (IP)
- Controlling a stage (CS)
- Managing product delivery (MP)
- Managing a stage boundary (SB)
- Closing a project (CP)

**Project Board** (accountable for success, not day-to-day management):

- **Executive** — owns the business case; single point of accountability. On a MEWRE project: an Assistant Undersecretary or sector head.
- **Senior User** — represents those who will use the output: the Transmission/Control Centre (dispatch), Generation operations.
- **Senior Supplier** — represents those who design and build: on a direct-procured EPC, the contractor's project director; on an IPP oversight project, often the Owner's Engineer or the project company.

**Tolerances** are set for **time, cost, scope, quality, benefits, risk** and, new in the 7th edition, **sustainability**. Within tolerance the level below acts; forecast to exceed tolerance means an **exception** goes up a level. This is the single most useful idea to import into a ministry: it stops trivial decisions clogging the Undersecretary's desk while guaranteeing that real problems surface early.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why management by exception works in a hierarchy",
          md: md`Ministries default to escalating everything (nobody wants to be blamed) or nothing (nobody wants to carry bad news). Explicit tolerances replace personal courage with a rule: "I escalated because the forecast breached the 5 % cost tolerance the committee set" is unarguable. It also protects the PM: decisions within tolerance are yours, and you can show the committee delegated them.`,
        },
        {
          kind: "md",
          md: md`### PMBOK vs PRINCE2 — when to reach for which

| Need | PMBOK gives you | PRINCE2 gives you |
|---|---|---|
| Techniques (EVM, CPM, Monte Carlo, WBS) | Deep coverage | Little — assumes you know them |
| Governance roles and decision rights | Generic | Precise: Board, Executive, tolerances, exception reports |
| Stage control | Phase gates (generic) | Stage boundaries with End Stage Report and next Stage Plan |
| Contract world fit | Neutral | Natural fit with FIDIC/NEC control points |

In practice: **PRINCE2 for the governance skeleton, PMBOK for the techniques**, FIDIC/PPA for the legal duties. ISO 21502 (2020) is a neutral international guidance standard that maps to both and is useful when a ministry wants a non-proprietary reference.

### Stage gates on a MEWRE renewable project

A stage gate asks three questions: **Is it still worth doing? Are we ready for the next stage? Are the risks acceptable for the money we are about to commit?** Typical gates for a KAPP IPP from the ministry's perspective:

| Gate | Decision | Key evidence |
|---|---|---|
| G0 Need | Include in the generation plan | Demand forecast, summer peak (17.5 GW in 2026), fuel displacement |
| G1 Feasibility | Proceed to procurement via KAPP | Feasibility study, site, grid capacity, land |
| G2 RFP release | Approve technical requirements | Employer's/Technical Requirements, PPA draft, grid connection scope |
| G3 Award | Recommend preferred bidder | Evaluation report; Higher Committee and Audit Bureau approvals |
| G4 Financial close / NTP | Commit grid works and interfaces | Signed PPA, interface schedule, land handover |
| G5 Energisation | Allow backfeed | Protection settings, grid-code compliance tests, permits |
| G6 COD | Accept commercial operation | Performance and reliability tests, PPA COD conditions |
| G7 Close-out | Close project, hand over to operations | As-builts, O&M manuals, lessons learned |`,
        },
        { kind: "sources", refs: ["m08-pmi-pmbok7", "m08-prince2-7", "m08-iso-21502", "m08-kapp-ppp-law", "m08-kt-peak-2026"] },
      ],
    },
    {
      layer: "applied",
      title: "Tolerances in numbers: when to escalate",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Cost exception on the 400 kV interconnection stage",
          given: md`The steering committee approved a construction-stage budget of **KWD 2.40 m** for the MEWRE-side 400 kV bay extension at the receiving substation, with cost tolerance **±5 %** and time tolerance **±3 weeks** on a 30-week stage. At week 12 the forecast at completion is KWD 2.58 m and 31 weeks.`,
          steps: [
            { md: md`Cost tolerance band: $2.40 \times 0.05 = 0.12$ m, so the PM may act between KWD 2.28 m and 2.52 m.` },
            { md: md`Forecast overrun: $2.58 - 2.40 = 0.18$ m $= 7.5\,\%$ of budget, i.e., KWD 0.06 m beyond tolerance.` },
            { md: md`Time forecast: 31 − 30 = 1 week late, within ±3 weeks — no time exception.` },
            { md: md`Because a **forecast** breach is enough (do not wait for actual spend), the PM raises an **Exception Report** now: cause (e.g., GIS bay price escalation and extra cable trench), options (de-scope spare bay, use contingency, accept), recommendation, and the impact on the business case and the IPP interface date.` },
          ],
          result: md`Escalate now: the forecast breaches cost tolerance by KWD 0.06 m (7.5 % vs 5 %). Time is within tolerance. The committee may approve an **Exception Plan** replacing the stage plan.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Time tolerance on the design-review stage",
          given: md`Stage: Owner's Engineer review of the IPP's detailed design, planned 16 weeks, time tolerance **±10 %**. After 6 weeks, 30 % of the 120 design documents have been reviewed and returned. Assume the remaining documents continue at the observed rate.`,
          steps: [
            { md: md`Tolerance: $16 \times 0.10 = 1.6$ weeks, so the stage may finish by week 17.6.` },
            { md: md`Observed rate: $0.30 \times 120 = 36$ documents in 6 weeks, i.e., 6 documents/week.` },
            {
              md: md`Forecast duration: $120 / 6 = 20$ weeks.`,
              hidden: true,
              check: { prompt: "Forecast stage duration", answer: 20, unit: "weeks", tolerance: { abs: 0.1 } },
            },
            {
              md: md`Breach beyond tolerance: $20 - 17.6 = 2.4$ weeks → exception.`,
              hidden: true,
              check: { prompt: "Weeks beyond the tolerance limit", answer: 2.4, unit: "weeks", tolerance: { abs: 0.1 } },
            },
          ],
          result: md`Forecast 20 weeks breaches the 17.6-week limit by 2.4 weeks: raise an exception — and first check whether design review is on the IPP's critical path to NTP for piling (it usually is for civil/structural packages).`,
        },
        {
          kind: "question",
          question: {
            id: "m08-l01-p1",
            type: "decision",
            prompt: md`A contractor's interface coordinator informs you the telecom (OPGW/SCADA) interface design will be **one week late**, inside your stage time tolerance of ±3 weeks, and has no effect on energisation. The steering committee meets in three days. What do you do?`,
            options: [
              { text: "Handle it within your authority: record it in the issue log, agree the recovery with the parties, report it in the next highlight report.", score: 1, feedback: "Correct. Inside tolerance the PM manages; the highlight report keeps the Board informed without asking it to decide." },
              { text: "Put it on the steering committee agenda for a decision.", score: 0.3, feedback: "This trains the committee to micromanage and dilutes attention from real exceptions. Inform, don't escalate." },
              { text: "Ignore it; one week does not matter.", score: 0.1, feedback: "Unlogged slips accumulate; three 'one-week' slips on interfaces can easily breach tolerance. Log it." },
              { text: "Issue a formal notice of delay to the contractor under the contract.", score: 0.4, feedback: "Contractual notices may be appropriate later, but a minor interface slip within tolerance is first managed collaboratively; check the contract's notice requirements though." },
            ],
            explanation: md`Management by exception: act within delegated tolerances, escalate only forecast breaches. Every issue is still logged and reported.`,
            concepts: ["m08.tolerances", "m08.governance"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Building governance that works inside a ministry",
      blocks: [
        {
          kind: "md",
          md: md`### Tailoring for an IPP

Under a KAPP-procured IPP (for example Shagaya Phase III Zone 1, where the RFP scope includes design, financing, construction, O&M and a 400 kV substation under a 30-year PPA with MEWRE), **the ministry is not running the EPC**. The project company (SPV) is the Employer under the EPC contract; MEWRE is the **offtaker** and **grid owner**. Your PM framework therefore governs:

1. MEWRE's **own scope**: grid connection (e.g., the Shagaya–Wafra 400 kV line, awarded separately in March 2026 for about KD 48.6 m), land, permits, metering, dispatch readiness.
2. **Oversight** of the IPP against the PPA: milestones, design compliance, testing, COD conditions.
3. **Interfaces** between the two — where most ministry-side delay exposure sits.

For directly procured work (grid packages under CAPT rules, or G2G arrangements), MEWRE is the Employer and the full framework applies.

### A practical governance structure

| Body | Members | Meets | Decides |
|---|---|---|---|
| **Steering Committee** (Project Board) | Executive (sector head), Senior User (Transmission/Control Centre), Senior Supplier (OE or IPP), KAPP observer, Finance | Monthly, plus at gates | Gates, baselines, exceptions, changes beyond PM authority |
| **Project Management Team** | MEWRE PM, OE lead, discipline leads, contracts, HSE | Weekly | Within-tolerance actions, issue resolution |
| **Interface Working Group** | MEWRE transmission, IPP/EPC, telecom, substation contractor | Bi-weekly | Interface dates, ICD sign-off |
| **Change Control Board** | PM, contracts, OE, finance | As needed | Change requests within delegated value |

Write it into a **Project Governance Plan** with a **delegation of authority (DoA) matrix** and get the Undersecretary to sign it. Without signature it is a suggestion.`,
        },
        { kind: "sources", refs: ["m08-agbi-zone1-rfp", "m08-megaproject-400kv", "m08-audit-bureau-law", "m08-tamimi-tenders-2026"] },
        {
          kind: "callout",
          tone: "kuwait",
          title: "The approval chain is part of your schedule, not outside it",
          md: md`KAPP's process runs through the Higher Committee for PPP and the State Audit Bureau before award; the Audit Bureau's prior review applies to contracts above a threshold reported at about KD 100,000 (verify current value). Zone 1's expected award slipped from June to about August 2026 at the approval stage. Put every approval as an activity with realistic duration and float in the governance calendar, and align steering committee dates to submission deadlines.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How ministry governance fails",
          md: md`- **Committee without decision rights**: meets, notes, defers. Fix with a signed DoA and a decision log.
- **Gate as rubber stamp**: the gate pack arrives the night before. Fix: pack issued 5 working days ahead, with a gate checklist.
- **Senior User missing**: the dispatch/control centre first sees the plant at energisation and demands changes (e.g., SCADA points list). Fix: Senior User on the Board from G2.
- **Tolerances never set**: so every slip is either a crisis or ignored.
- **Framework theatre**: 60-page PID nobody reads. Tailor: one-page charter, one-page DoA, one-page gate checklist.`,
        },
        {
          kind: "checklist",
          title: "PM checklist — first 30 days on a project",
          items: [
            "Locate the approved business case / feasibility study and the gate decision that launched the project.",
            "Identify the Executive by name and confirm decision rights in writing (DoA matrix).",
            "Set tolerances for time, cost, scope, quality, risk with the steering committee.",
            "Draft the Project Governance Plan: bodies, members, frequency, decision log, escalation path.",
            "Map the approval chain (KAPP, Higher Committee, Audit Bureau, Fatwa, CAPT where relevant) into the schedule.",
            "Agree reporting cadence and format (highlight report monthly, exception report on breach).",
            "Set up the issue log, risk register, decision log and lessons log from day one.",
          ],
        },
        {
          kind: "ask",
          title: "Ask the Owner's Engineer / IPP",
          items: [
            "Which of your governance meetings should MEWRE attend, and with what decision rights under the PPA?",
            "What are your internal tolerances, and will you notify us when you forecast a breach of a PPA milestone?",
            "Who is your single accountable project director, and who deputises in summer leave periods?",
            "How do your stage gates align with our grid-connection milestones?",
          ],
        },
        {
          kind: "feynman",
          prompt: "Explain to a newly appointed Assistant Undersecretary, in under two minutes, why the steering committee should set tolerances rather than review every issue.",
          keyPoints: [
            "Tolerances delegate authority for deviations within limits to the PM",
            "Forecast breach triggers an exception report — problems surface early",
            "Saves senior time for decisions only they can make",
            "Creates an audit trail for Audit Bureau / accountability",
            "Tolerances cover time, cost, scope, quality, risk, benefits",
          ],
        },
        { kind: "scenario", scenario: "m08-s1" },
      ],
    },
  ],
  quiz: [
    {
      id: "m08-l01-q1",
      type: "mcq",
      prompt: "Which list correctly names the three Project Board roles in PRINCE2?",
      options: ["Sponsor, PM, Engineer", "Executive, Senior User, Senior Supplier", "Chair, Secretary, Auditor", "Owner, Contractor, Engineer"],
      answer: 1,
      explanation: md`The **Executive** owns the business case, the **Senior User** represents the users of the output (e.g., dispatch/operations), and the **Senior Supplier** represents those delivering it. The PM is not a Board member.`,
      concepts: ["m08.prince2"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m08-l01-q2",
      type: "multi",
      prompt: "Which of the following are PMBOK 7th edition **performance domains**?",
      options: ["Uncertainty", "Procurement", "Measurement", "Delivery", "Integration", "Stakeholders"],
      answer: [0, 2, 3, 5],
      explanation: md`The 8 domains: Stakeholders, Team, Development approach & life cycle, Planning, Project work, Delivery, Measurement, Uncertainty. Procurement and Integration are **knowledge areas** from the 6th edition.`,
      concepts: ["m08.pmbok-principles", "m08.process-groups"],
      difficulty: 2,
    },
    {
      id: "m08-l01-q3",
      type: "order",
      prompt: "Order these PMBOK process groups as they first occur on a project.",
      items: ["Initiating", "Planning", "Executing", "Monitoring & Controlling", "Closing"],
      explanation: md`Monitoring & Controlling runs in parallel with Executing (and Planning), but its first meaningful output follows execution starting. The groups overlap — they are not phases.`,
      concepts: ["m08.process-groups"],
      difficulty: 1,
    },
    {
      id: "m08-l01-q4",
      type: "numeric",
      prompt: md`A stage budget is KWD 6.0 m with a cost tolerance of +4 %/−10 %. The latest forecast is KWD 6.30 m. By how many KWD thousands does the forecast exceed the upper tolerance limit?`,
      answer: 60,
      unit: "KWD thousand",
      tolerance: { abs: 1 },
      explanation: md`Upper limit $= 6.0 \times 1.04 = 6.24$ m. Excess $= 6.30 - 6.24 = 0.06$ m $=$ KWD 60 k → exception report. Tolerances can be asymmetric: underspend is less dangerous but may signal scope not being delivered.`,
      concepts: ["m08.tolerances"],
      difficulty: 2,
    },
    {
      id: "m08-l01-q5",
      type: "decision",
      prompt: md`At the G2 gate (approve technical requirements for the RFP), the Transmission sector has not reviewed the grid-connection and SCADA requirements. KAPP wants the RFP out this month. You are the PM.`,
      options: [
        { text: "Recommend a conditional gate pass: release only after Transmission signs off the grid/SCADA chapters within 10 days, with that sign-off as a recorded condition.", score: 1, feedback: "Best: keeps momentum, makes the missing evidence an explicit, owned, time-bound condition. RFP changes after release cost addenda and bid extensions." },
        { text: "Pass the gate; Transmission can comment during clarifications.", score: 0.2, feedback: "Grid requirements changed after bids lead to price claims and delay; the Senior User must be in before the RFP." },
        { text: "Fail the gate and restart the review cycle.", score: 0.5, feedback: "Defensible but slow; a conditional pass with a hard condition achieves the control without losing a month." },
      ],
      explanation: md`Gates exist to stop commitments being made without key evidence. A conditional pass with named owner and date is standard practice when the missing item is bounded.`,
      concepts: ["m08.stage-gates", "m08.governance"],
      difficulty: 2,
    },
    {
      id: "m08-l01-q6",
      type: "short",
      prompt: "Why is a MEWRE PM's governance on a KAPP IPP different from governance on a directly procured EPC?",
      rubric: [
        "Under an IPP the SPV is Employer under the EPC; MEWRE is offtaker and grid owner",
        "MEWRE governs its own scope (grid connection, land, permits) and PPA oversight",
        "Interfaces between MEWRE scope and IPP are the main ministry-side exposure",
        "Direct EPC: MEWRE is Employer with full control/contract administration duties",
      ],
      modelAnswer: "Under a KAPP IPP the project company is the Employer under the EPC contract and MEWRE is the offtaker and grid owner under the PPA. MEWRE's governance therefore covers its own deliverables (grid line, substation bays, land, permits, dispatch readiness), oversight of PPA milestones and tests, and the interfaces between the two, where late MEWRE works can create compensation exposure. On a direct EPC MEWRE is the Employer and administers the whole contract: programme, variations, payments, quality and taking-over.",
      explanation: md`The tailoring principle: the framework must follow the contract structure. Who holds the EPC contract determines who administers it. On an IPP the ministry's leverage is the PPA and its own interface deliverables — so ministry governance concentrates on those, and on early warning of anything that could make MEWRE the cause of delay.`,
      concepts: ["m08.governance", "m08.pmbok-principles"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m08-l01-f1", front: "PMBOK 7: how many principles and performance domains?", back: "12 principles, 8 performance domains." },
    { id: "m08-l01-f2", front: "The 5 PMBOK process groups", back: "Initiating, Planning, Executing, Monitoring & Controlling, Closing." },
    { id: "m08-l01-f3", front: "PRINCE2 7 principles", back: "Continued business justification, learn from experience, defined roles, manage by stages, manage by exception, focus on products, tailor." },
    { id: "m08-l01-f4", front: "PRINCE2 7 practices", back: "Business case, organizing, plans, quality, risk, issues, progress." },
    { id: "m08-l01-f5", front: "Who owns the business case on a PRINCE2 Project Board?", back: "The Executive (single point of accountability)." },
    { id: "m08-l01-f6", front: "PRINCE2 tolerance aspects (7th ed.)", back: "Time, cost, scope, quality, benefits, risk, sustainability." },
    { id: "m08-l01-f7", front: "What triggers an exception report?", back: "A **forecast** that a tolerance will be exceeded — not waiting for the actual breach." },
    { id: "m08-l01-f8", front: "Three questions at every stage gate", back: "Still worth doing? Ready for next stage? Risks acceptable for the money about to be committed?" },
  ],
  scenarios: [
    {
      id: "m08-s1",
      title: "The steering committee that never decides",
      dayInLife: true,
      context: md`You are three weeks into the PM role for MEWRE's grid-connection scope for a 1.1 GW Shagaya IPP. The steering committee has met twice; both times it "noted" the substation land-allocation problem and deferred. The IPP's EPC needs access to the 400 kV switchyard plot in 10 weeks.`,
      start: "a",
      concepts: ["m08.governance", "m08.tolerances", "m08.stage-gates"],
      nodes: {
        a: {
          md: md`Before the next meeting you can prepare one thing. What do you prepare?`,
          choices: [
            { text: "A one-page decision paper: the decision needed, 2–3 options with cost/schedule impact, recommendation, and the date by which a decision avoids delay.", next: "b", score: 10, feedback: "Committees decide on clear options and deadlines. You converted a 'topic' into a decision." },
            { text: "A 40-slide progress presentation covering every workstream.", next: "c", score: 3, feedback: "Volume buries the decision. The land issue becomes slide 27." },
            { text: "Nothing; escalate directly to the Minister's office.", next: "c", score: 1, feedback: "Bypassing the Executive destroys trust and the governance you need for the next three years." },
          ],
        },
        b: {
          md: md`The chair asks: "Is this really for us? Can't the department resolve it?" The land belongs to another authority and requires a ministerial letter.`,
          choices: [
            { text: "Explain that the decision exceeds your delegated authority and the forecast delay breaches the committee's time tolerance; propose the committee approves the letter today and records the decision.", next: "d", score: 10, feedback: "You anchored escalation to the tolerance rule and asked for a recorded decision." },
            { text: "Agree to take it back and try again at department level.", next: "c", score: 3, feedback: "You lose a month and the access date; the problem returns larger." },
          ],
        },
        c: {
          md: md`Another month passes without a decision. The EPC now issues a notice that site access to the switchyard plot is at risk and reserves its rights.`,
          choices: [
            { text: "Prepare the decision paper now, including the new contractual exposure, and request an extraordinary committee meeting.", next: "d", score: 6, feedback: "Recovering — but the delay has already created a claim risk." },
            { text: "Respond to the EPC disputing the notice.", score: 2, feedback: "Disputing a valid notice does not fix the land. Fix the root cause." },
          ],
        },
        d: {
          md: md`The committee approves. What do you do in the next 48 hours?`,
          choices: [
            { text: "Issue the minutes with the decision, owner and due date; update the decision log, risk register and schedule; propose formalising tolerances and a DoA matrix at the next meeting.", score: 10, feedback: "Decisions that are not recorded and actioned evaporate. The DoA prevents a repeat." },
            { text: "Celebrate and move on.", score: 4, feedback: "Without a recorded decision and an owner, the letter may not be issued." },
          ],
        },
      },
    },
  ],
};

export default lesson;
