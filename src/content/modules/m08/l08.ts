import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m08-l08",
  title: "Stakeholders, Contractor Management and Reporting to Leadership",
  summary:
    "Mapping and managing Kuwait's renewable-project stakeholders, managing contractors with evidence and leverage, writing honest monthly reports and dashboards with defensible RAG status, escalating well, using early/advance warning (NEC clause 15 vs FIDIC 8.4), and running progress meetings that produce decisions.",
  minutes: 75,
  objectives: [
    "You can build a stakeholder map for a MEWRE renewable project and plan engagement for each group.",
    "You can define objective RAG criteria, compute them from EVM/schedule data, and resist 'watermelon' reporting.",
    "You can structure a monthly progress report and a leadership dashboard, and write a concise escalation memo (EN/AR).",
    "You can compare NEC4 early warning with FIDIC 2017 Sub-Clause 8.4 advance warning and use both proactively.",
    "You can run a progress meeting that ends with decisions, owners and dates.",
  ],
  concepts: [
    { id: "m08.stakeholder-mgmt", name: "Stakeholder mapping & engagement", description: "Identifying stakeholders, analysing power/interest/attitude, and planning engagement to secure decisions and avoid surprises.", competency: "leadership", related: ["m08.governance", "m15.stakeholder-map", "m13.ministry-hierarchy"] },
    { id: "m08.rag-reporting", name: "RAG status & honest reporting", description: "Red/amber/green ratings driven by pre-defined quantitative criteria and forecasts, with trend and path to green.", competency: "leadership", related: ["m08.evm-basics", "m08.tolerances", "m13.bad-news"] },
    { id: "m08.progress-report", name: "Monthly progress report & dashboard", description: "Structured monthly reporting (FIDIC 4.20-type contractor report and the PM's report to leadership) with S-curves, forecasts, risks, decisions needed.", competency: "leadership", related: ["m08.rag-reporting", "m13.bluf", "m12.performance-reporting"] },
    { id: "m08.early-warning", name: "Early / advance warning", description: "Contractual duty to notify matters that may affect cost, time or performance: NEC4 clause 15 (with register and meetings) vs FIDIC 2017 Sub-Clause 8.4.", competency: "contracts", related: ["m08.risk-register", "m08.change-control", "m09.programme-eot"] },
    { id: "m08.contractor-mgmt", name: "Contractor management & escalation", description: "Managing contractors through clear expectations, evidence, performance reviews, contractual levers and a defined escalation ladder.", competency: "leadership", related: ["m08.stakeholder-mgmt", "m13.accountability-ladder", "m13.progress-meeting"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Information, influence and honesty",
      blocks: [
        {
          kind: "md",
          md: md`A ministry PM rarely has direct authority over most of the people who decide the project's fate. The levers are **information** (who knows what, when), **relationships** and **process** (governance, contracts). Reporting is how information flows upward; stakeholder management is how it flows sideways; contractor management is how it turns into action.

### Stakeholder mapping

Classic **power/interest grid**: manage closely (high power, high interest), keep satisfied (high power, low interest), keep informed (low power, high interest), monitor (low/low). Add **attitude** (supporter / neutral / blocker) and **what they need from you** and **what you need from them**.

| Stakeholder | Role for a MEWRE renewable project | You need from them |
|---|---|---|
| MEWRE leadership (Minister, Undersecretary, sector heads) | Executive authority, offtaker, grid owner | Decisions, budget, priority |
| MEWRE Transmission / National Control Centre | Grid connection, protection, SCADA, dispatch | Interface deliverables, outage windows, test windows |
| KAPP | Procures IPPs; shareholder in project companies | Alignment on PPA administration and changes |
| Higher Committee for PPP, Ministry of Finance | Approvals, budget | Timely approvals |
| State Audit Bureau | Prior review of contracts above threshold | Approval without re-submission |
| Fatwa and Legislation Department | Legal review of contract terms | Timely legal clearance |
| CAPT | Oversight of public tenders (grid packages) | Tender approvals |
| KISR | Resource data, technical know-how | Irradiance data, studies |
| KPC/KOC | Competing captive solar plans for land and grid | Coordination on land/grid capacity |
| EPA, permitting bodies | Environmental approval, permits | Permits on time |
| IPP sponsors, EPC, OEMs, lenders | Deliver and finance | Performance, early warning, transparency |

### What makes a RAG status honest

RAG ratings are only meaningful if **defined before the data arrive**:

| Dimension | Green | Amber | Red |
|---|---|---|---|
| Schedule (forecast vs baseline completion) | On time or early; CP float ≥ 0 | 1–4 weeks late, or SPI(t) 0.90–0.95 | > 4 weeks late, or SPI(t) < 0.90, or a PPA/contract key date at risk |
| Cost (EAC vs budget) | CPI ≥ 0.97 and EAC within budget | CPI 0.92–0.97, or EAC needs contingency | CPI < 0.92, or EAC exceeds budget + contingency |
| HSE | No LTI; leading indicators on target | LTI or adverse leading trend | Fatality, serious incident, or systemic failure |
| Interfaces | All MEWRE gives on time | Any give < 4 weeks late within float | Any give late beyond float |

Report **status + trend arrow + path to green** (actions, owners, dates). Amber is not a failure; it is a request for attention. Red is a request for a decision.

### Monthly progress reports

FIDIC 2017 Sub-Clause 4.20 requires the contractor's monthly progress report within 7 days after each period, including: charts and descriptions of progress (design, documents, procurement, manufacture, delivery, construction, testing); photographs; manufacturing status of main items; personnel and equipment; quality and HSE records; comparisons of actual and planned progress, with details of events that could jeopardise completion and the measures taken.

The **PM's report to leadership** is a different document: 2–4 pages, decisions first.

1. Overall status and **decisions needed** (top of page 1).
2. Key dates: baseline vs forecast (COD, energisation, grid connection).
3. Schedule: critical path and float, SPI(t), BEI; S-curves (planned vs actual for piles, trackers, MW installed, MW energised).
4. Cost: budget, EAC range, contingency drawdown.
5. HSE and quality.
6. Top 5 risks and issues; interface status (MEWRE-side deliverables).
7. Stakeholder/approval status.

### Early warning: NEC vs FIDIC

| | **NEC4 ECC clause 15** | **FIDIC 2017 Sub-Clause 8.4 Advance Warning** |
|---|---|---|
| Who | Contractor **and** Project Manager | Each Party (and the Engineer) |
| Trigger | Matters that could increase total of Prices, delay Completion or a Key Date, or impair performance in use | Known or probable future events that may adversely affect contractor's personnel, performance of the Works, increase the Contract Price, or delay execution |
| Mechanism | **Early warning register**; early-warning meetings to find solutions | Notice; Engineer may request a proposal under Sub-Clause 13.3.2 |
| Consequence of failure | If the contractor failed to give an early warning an experienced contractor could have given, a compensation event is assessed as if the warning had been given | No explicit sanction in 8.4 itself; failure may be relevant when assessing claims |

Both are tools for collaboration, but only if the Employer side also warns: late MEWRE grid works, a late points list, an approval delay. The ministry PM who warns early converts a future claim into a joint problem.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why 'watermelon' reporting happens — and why it fails",
          md: md`Status turns green outside, red inside when reporting is punished, when RAG criteria are undefined, and when the reporter fears being blamed for problems caused by others. It always fails the same way: a sudden jump from green to red when the slip can no longer be hidden, by which time recovery options are gone. Objective criteria and a culture that rewards early amber are the cure; as PM you model it by reporting your own side's problems first.`,
        },
        { kind: "equation", formula: "evm-spi-t" },
        { kind: "equation", formula: "evm-cpi" },
        { kind: "sources", refs: ["m08-fidic-2017", "m08-nec4", "m08-kapp-ppp-law", "m08-audit-bureau-law", "m08-tamimi-tenders-2026"] },
      ],
    },
    {
      layer: "applied",
      title: "Computing defensible RAG status",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "RAG status for three workstreams",
          given: md`Using the RAG criteria table, status at month 11:

| Workstream | Data |
|---|---|
| IPP plant (1.1 GW) | Forecast COD 3 weeks after PPA scheduled COD; SPI(t) 0.93; no LTI |
| MEWRE 400 kV line | Critical path float −2 weeks to the "line ready for energisation" interface date; CPI 0.95 |
| Metering & SCADA integration | On time; CPI 1.00; points list issued 2 weeks late but within 5 weeks' float |`,
          steps: [
            { md: md`**IPP plant**: 3 weeks late and SPI(t) 0.93 → **Amber** (1–4 weeks; 0.90–0.95). Trend: ask whether last month was 2 or 4 weeks late.` },
            { md: md`**400 kV line**: negative float of 2 weeks against an interface date that gates the IPP's energisation — a **contract/PPA key date at risk** → **Red** for schedule, even though the delay is "only 2 weeks". Cost: CPI 0.95 → Amber.` },
            { md: md`**Metering & SCADA**: interface give late but within float → **Amber** for interfaces (per criteria), green otherwise.` },
            { md: md`**Overall**: report Red, driven by MEWRE's own line. The headline is uncomfortable but correct: the ministry's scope is the one most likely to cause PPA relief or deemed-energy exposure. Decision needed: approve line contractor acceleration (extra stringing crews) or accept the risk.` },
          ],
          result: md`IPP Amber; 400 kV line Red (schedule), Amber (cost); Metering/SCADA Amber (interfaces). Overall Red with a specific decision request. Note how "small" numbers can be red when they hit a key date — RAG must follow consequences, not magnitudes.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Rating the line contractor from raw EVM data",
          given: md`400 kV line contract: BAC KWD 48.6 m. End of month 11: PV = 20.0, EV = 17.5, AC = 18.9 (KWD m; AC = certified + accrued). Baseline cumulative PV: month 9 = 15.8, month 10 = 18.2, month 11 = 20.0. The contractor's report says "Green — progressing well".`,
          steps: [
            {
              md: md`$CPI = 17.5/18.9 = 0.926$ → Amber (0.92–0.97).`,
              hidden: true,
              check: { prompt: "CPI", answer: 0.926, tolerance: { abs: 0.002 } },
            },
            {
              md: md`EV 17.5 lies between PV(9) = 15.8 and PV(10) = 18.2: $ES = 9 + (17.5 - 15.8)/(18.2 - 15.8) = 9.708$; $SPI(t) = 9.708/11 = 0.883$ → Red (< 0.90).`,
              hidden: true,
              check: { prompt: "SPI(t)", answer: 0.883, tolerance: { abs: 0.003 } },
            },
            { md: md`Schedule slip ≈ $11 - 9.71 = 1.3$ months of earned schedule. The contractor's "Green" contradicts both indices.` },
          ],
          result: md`Cost Amber (CPI 0.93), schedule Red (SPI(t) 0.88, about 1.3 months behind). Report Red with the evidence and request the contractor's recovery programme; do not adopt the contractor's self-assessment.`,
        },
        {
          kind: "question",
          question: {
            id: "m08-l08-p1",
            type: "decision",
            prompt: md`You learn that the MEWRE substation bay extension (Employer scope) will be about 6 weeks late. The IPP's EPC has not noticed yet. The contract (FIDIC 2017-based for the bay; PPA for the IPP) includes advance-warning obligations. What do you do?`,
            options: [
              { text: "Give advance warning now to the IPP and the relevant parties, quantify float and impact, propose mitigation options jointly, and inform leadership in the same week.", score: 1, feedback: "Correct: early warning is an obligation and a strategy; it turns a future claim into a joint mitigation problem and preserves trust." },
              { text: "Wait to see whether the IPP's own delays absorb it (concurrent delay).", score: 0.2, feedback: "Hoping for concurrency is a gamble; if discovered, it destroys trust and weakens MEWRE's position." },
              { text: "Instruct the bay contractor to accelerate at any cost and tell nobody.", score: 0.4, feedback: "Acceleration may be right, but silence breaches warning duties and leaves the IPP planning on wrong dates." },
            ],
            explanation: md`Both NEC and FIDIC 2017 expect parties to warn of probable future adverse events. Employer-side warning is as important as contractor-side.`,
            concepts: ["m08.early-warning", "m08.stakeholder-mgmt"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running the project through people",
      blocks: [
        {
          kind: "md",
          md: md`### Contractor management that works

- **Clear expectations at kick-off**: reporting format, XER with every update, rules of credit, document review periods, interface procedures, HSE non-negotiables.
- **Evidence, not adjectives**: every conversation about performance starts from data (SPI(t), BEI, NCR trends, units installed per week).
- **Contractual levers, in proportion**: certification of milestones only when achieved; notices when required; performance security and delay damages as last resorts. Use them predictably — erratic enforcement destroys cooperation.
- **Escalation ladder**: site managers (daily) → project managers (weekly) → project directors (monthly) → executive/steering (quarterly or on exception) → dispute avoidance (FIDIC 2017 DAAB, Clause 21). Each level gets a defined time to resolve before it goes up.
- **Contractor scorecard** quarterly: schedule, quality, HSE, documentation, collaboration — shared and discussed, not filed.
- **Respect**: the EPC's project director has his own board. Help him win internal resources by giving him a clear, documented case.

### Running a progress meeting

| Item | Practice |
|---|---|
| Purpose | Decisions and actions — not reading the report aloud |
| Pre-read | Contractor report and updated XER 2 working days before |
| Agenda | 1) HSE moment; 2) actions from last meeting; 3) critical path and 3-week look-ahead; 4) interfaces & MEWRE gives; 5) risks/early warnings; 6) documents & RFIs overdue; 7) decisions needed |
| Chair | MEWRE PM (or the Engineer, per contract) |
| Output | Action log (action, owner, date), decision log; minutes issued within 48 h, accepted next meeting |
| Language | Agree English or Arabic for minutes; record contractual statements precisely |

### Reporting to leadership in a ministry

Leadership reads page 1. Put the **decision needed** first, with options and a recommendation; then the status with RAG and trend; then the evidence. Use the same format every month so changes jump out. Never surprise your Executive in a meeting with the Minister: pre-brief bad news privately, with a plan.`,
        },
        {
          kind: "bilingual",
          title: "Escalation memo template (EN / AR)",
          en: md`**To:** Assistant Undersecretary, Renewable Energy
**From:** Project Manager, Shagaya grid connection
**Subject:** Decision required — acceleration of 400 kV line stringing

**Decision needed by:** 30 October
**Issue:** The line is forecast 2 weeks late against the interface date for IPP energisation (float −2 weeks; schedule SPI(t) 0.88).
**Consequence if no action:** Possible PPA relief to the IPP and delay to summer-peak capacity.
**Options:** (1) Approve two additional stringing crews, est. KWD 0.30 m, recovers 2 weeks; (2) Re-sequence energisation by circuit, no cost, recovers 1 week; (3) Accept the delay.
**Recommendation:** Option 1, funded from the approved contingency.`,
          ar: `**إلى:** الوكيل المساعد لقطاع الطاقة المتجددة
**من:** مدير مشروع ربط الشقايا بالشبكة
**الموضوع:** مطلوب اتخاذ قرار — تسريع أعمال شد موصلات خط 400 ك.ف

**الموعد المطلوب للقرار:** 30 أكتوبر
**المشكلة:** من المتوقع تأخر الخط أسبوعين عن موعد الواجهة اللازم لتشغيل محطة المنتج المستقل (الفائض الزمني −2 أسبوع؛ مؤشر أداء الجدول الزمني 0.88).
**الأثر في حال عدم اتخاذ إجراء:** احتمال منح المنتج المستقل إعفاءً بموجب اتفاقية شراء الطاقة وتأخر دخول القدرة قبل ذروة الصيف.
**الخيارات:** (1) الموافقة على فريقين إضافيين لشد الموصلات بتكلفة تقديرية 0.30 مليون د.ك لاستعادة أسبوعين؛ (2) إعادة تسلسل التشغيل حسب الدائرة دون تكلفة لاستعادة أسبوع واحد؛ (3) قبول التأخير.
**التوصية:** الخيار (1) بتمويل من مخصص الطوارئ المعتمد.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Reporting and stakeholder failure modes",
          md: md`- Forwarding the contractor's report as the ministry's report.
- RAG by feeling; colours change with the audience.
- 30-page reports with the decision on page 22.
- Silence on MEWRE-side problems while criticising the contractor.
- Stakeholders met only when something is needed from them (Audit Bureau, Control Centre).
- Escalating to the Minister's office around your Executive.
- Minutes that record discussion but not decisions, owners and dates.`,
        },
        {
          kind: "checklist",
          title: "PM reporting & stakeholder checklist",
          items: [
            "Stakeholder map with owner per relationship and engagement plan; reviewed quarterly.",
            "RAG criteria approved by the steering committee and printed on every report.",
            "Monthly leadership report: decisions first, key dates baseline vs forecast, S-curves, EAC, top risks, interfaces.",
            "Contractor reports checked against XER, EVM and inspection records before summarising.",
            "Early-warning register (or equivalent) shared with contractor/IPP; MEWRE-side warnings issued too.",
            "Meeting action and decision logs live; minutes within 48 hours.",
            "Escalation ladder and timelines agreed with the contractor at kick-off.",
          ],
        },
        {
          kind: "ask",
          title: "Ask the contractor / IPP",
          items: [
            "What would make this project red in your own internal report, and what is your internal RAG today?",
            "Which early warnings have you raised internally that you have not yet raised with us?",
            "What decision do you need from MEWRE this month, and by when?",
            "How many actions from our action log are overdue on your side and on ours?",
          ],
        },
        {
          kind: "feynman",
          prompt: "Explain to a senior official why an 'amber' status this month is better news than a 'green' that turns 'red' in three months.",
          keyPoints: [
            "Early amber preserves recovery options",
            "Objective criteria make colours meaningful",
            "Late red means options are gone and costs higher",
            "Trend and path to green accompany the status",
            "Honest reporting builds trust for when decisions are needed",
          ],
        },
        { kind: "scenario", scenario: "m08-s8" },
        { kind: "sources", refs: ["m08-fidic-2017", "m08-nec4", "m08-meed-zone1", "m08-kt-peak-2026"] },
      ],
    },
  ],
  quiz: [
    {
      id: "m08-l08-q1",
      type: "mcq",
      prompt: "In a power/interest grid, the State Audit Bureau on a MEWRE contract award is best classified as…",
      options: ["Monitor", "Keep informed", "Keep satisfied / manage closely at approval stages", "Not a stakeholder"],
      answer: 2,
      explanation: md`The Audit Bureau holds decisive power at prior review (contracts above the threshold). Interest is episodic, so keep satisfied — and manage closely around submissions with complete, well-structured packs.`,
      concepts: ["m08.stakeholder-mgmt"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m08-l08-q2",
      type: "multi",
      prompt: "Which are features of NEC4 clause 15 early warning that FIDIC 2017 Sub-Clause 8.4 does not explicitly include?",
      options: [
        "An early warning register",
        "Early warning meetings to find solutions",
        "Assessment of a compensation event as if a warning had been given when the contractor failed to warn",
        "A duty on both parties to warn",
      ],
      answer: [0, 1, 2],
      explanation: md`Both forms impose a mutual duty to warn. NEC adds the register, meetings and an explicit consequence for the contractor's failure to warn; FIDIC 8.4 lets the Engineer request a proposal under 13.3.2.`,
      concepts: ["m08.early-warning"],
      difficulty: 2,
    },
    {
      id: "m08-l08-q3",
      type: "numeric",
      prompt: md`Using the lesson's RAG criteria: a workstream has EV = 31.0, AC = 32.6 (KWD m). What is its CPI (to 3 decimals)? (Then decide its cost colour.)`,
      answer: 0.951,
      tolerance: { abs: 0.002 },
      explanation: md`$CPI = 31.0/32.6 = 0.951$ → **Amber** (0.92–0.97).`,
      concepts: ["m08.rag-reporting"],
      difficulty: 1,
    },
    {
      id: "m08-l08-q4",
      type: "order",
      prompt: "Order the sections of a leadership monthly report as recommended in the lesson.",
      items: ["Overall status and decisions needed", "Key dates: baseline vs forecast", "Schedule and progress S-curves", "Cost and EAC", "HSE and quality", "Top risks, issues and interfaces"],
      explanation: md`Decisions first: leadership attention is scarce. Then the dates everyone cares about, then the evidence.`,
      concepts: ["m08.progress-report"],
      difficulty: 1,
    },
    {
      id: "m08-l08-q5",
      type: "mcq",
      prompt: "Under FIDIC 2017, by when must the contractor's monthly progress report be submitted?",
      options: ["Within 7 days after the last day of the period", "Within 28 days", "With the interim payment application only", "At each stage gate"],
      answer: 0,
      explanation: md`Sub-Clause 4.20 (2017): within 7 days after the last day of the period to which it relates, continuing until completion of all outstanding work.`,
      concepts: ["m08.progress-report"],
      difficulty: 2,
    },
    {
      id: "m08-l08-q6",
      type: "decision",
      prompt: md`The EPC's project director asks you, before the monthly meeting with the Undersecretary, to keep the overall status "green" because "the board in Europe will panic". Data: SPI(t) 0.89, forecast COD 5 weeks late.`,
      options: [
        { text: "Decline politely: report Red per the approved criteria, but present the contractor's recovery plan alongside and pre-brief the director on what you will say.", score: 1, feedback: "Honest, criteria-based, and fair to the contractor — no surprises for either side." },
        { text: "Agree to amber as a compromise.", score: 0.3, feedback: "Negotiated colours make the reporting system meaningless." },
        { text: "Report green this month and red next month if it doesn't improve.", score: 0, feedback: "Watermelon reporting; a 5-week slip on COD is red by your own criteria." },
      ],
      explanation: md`RAG must follow pre-agreed criteria. Pre-briefing and including the recovery plan preserves the relationship without compromising integrity.`,
      concepts: ["m08.rag-reporting", "m08.contractor-mgmt"],
      difficulty: 2,
    },
    {
      id: "m08-l08-q7",
      type: "short",
      prompt: "List the essential outputs of a well-run weekly progress meeting and explain why each matters.",
      rubric: [
        "Action log with owner and due date",
        "Decision log",
        "Minutes issued quickly (≈48 h) and accepted at next meeting",
        "Updated 3-week look-ahead / critical path review",
        "Records serve as contractual evidence",
      ],
      modelAnswer: "An action log (action, owner, date) so commitments are trackable; a decision log so decisions are not relitigated; minutes issued within 48 hours and accepted at the next meeting so they become an agreed record usable in claims; a reviewed 3-week look-ahead and critical path so near-term risks are visible; and an updated list of overdue documents/RFIs and interface items.",
      explanation: md`Meetings that produce no recorded decisions and actions are reporting sessions. Minutes are also contemporaneous evidence in any later dispute.`,
      concepts: ["m08.contractor-mgmt", "m08.progress-report"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "m08-l08-f1", front: "Power/interest grid quadrants", back: "Manage closely (high/high), keep satisfied (high power), keep informed (high interest), monitor (low/low)." },
    { id: "m08-l08-f2", front: "Watermelon reporting", back: "Green outside, red inside: status that hides problems until recovery options are gone." },
    { id: "m08-l08-f3", front: "Three elements of a good status line", back: "Colour by pre-defined criteria + trend arrow + path to green (actions, owners, dates)." },
    { id: "m08-l08-f4", front: "NEC4 early warning clause", back: "Clause 15 — register, meetings; failure to warn affects compensation event assessment." },
    { id: "m08-l08-f5", front: "FIDIC 2017 advance warning", back: "Sub-Clause 8.4 — each Party warns of probable adverse events; Engineer may request a proposal (13.3.2)." },
    { id: "m08-l08-f6", front: "FIDIC 2017 progress report clause and deadline", back: "Sub-Clause 4.20; within 7 days after the end of each period." },
    { id: "m08-l08-f7", front: "First item of a leadership report", back: "Decisions needed — with options, recommendation and deadline." },
    { id: "m08-l08-f8", front: "FIDIC 2017 dispute avoidance body", back: "DAAB — Dispute Avoidance/Adjudication Board (Clause 21)." },
  ],
  scenarios: [
    {
      id: "m08-s8",
      title: "The briefing before summer",
      dayInLife: true,
      context: md`It is February. The Undersecretary asks you for a one-page brief: "Will the new solar capacity be available for this summer's peak?" Your data: IPP forecast COD 5 weeks after the PPA scheduled COD (which itself was early June); MEWRE 400 kV line float −2 weeks; module deliveries recovering; one LTI last month. Summer peak demand last year was about 17.5 GW.`,
      start: "a",
      concepts: ["m08.rag-reporting", "m08.progress-report", "m08.stakeholder-mgmt", "m08.early-warning"],
      nodes: {
        a: {
          md: md`How do you open the brief?`,
          choices: [
            { text: "Answer the question in the first line: 'Partial availability is likely from mid-July; full capacity is at risk for this summer', followed by the drivers, MEWRE-side actions and decisions needed.", next: "b", score: 10, feedback: "Bottom line up front, honest, with the ministry's own actions visible." },
            { text: "Start with project background and a progress table; leave the conclusion for the end.", next: "c", score: 3, feedback: "A busy official may never reach the answer." },
            { text: "Say 'yes, on track' because the IPP's PPA date is early June.", next: "c", score: 0, feedback: "The forecast says otherwise; this answer will be remembered in July." },
          ],
        },
        b: {
          md: md`The Undersecretary asks: "Whose fault is it?"`,
          choices: [
            { text: "Give a factual split: about 3 weeks from IPP module logistics (IPP risk), and the line's −2 weeks of float is MEWRE scope; recommend approving line acceleration now, which also protects MEWRE from PPA relief claims.", next: "d", score: 10, feedback: "Honest about MEWRE's share and turns it into a decision that reduces exposure." },
            { text: "Blame the IPP entirely.", next: "c", score: 2, feedback: "The line delay will surface; your credibility goes with it." },
          ],
        },
        c: {
          md: md`In May the Undersecretary hears from KAPP that COD will slip into August, and asks why the ministry was not told earlier.`,
          choices: [
            { text: "Acknowledge, present the full current picture and the decisions now needed, and introduce objective RAG criteria for future reports.", next: "d", score: 4, feedback: "Recovering trust takes time; the early-warning window was missed." },
            { text: "Explain that the contractor's reports were green.", score: 1, feedback: "Relaying a contractor's status without analysis is the PM's failure, not the contractor's." },
          ],
        },
        d: {
          md: md`Acceleration is approved. What do you do to keep stakeholders aligned through the summer?`,
          choices: [
            { text: "Inform the Control Centre of revised energisation and test windows, issue advance warning updates to the IPP, brief KAPP, and add a weekly 'summer readiness' line to the leadership dashboard.", score: 10, feedback: "Every stakeholder whose plans depend on the date hears it from you first." },
            { text: "Nothing more until COD.", score: 2, feedback: "Dispatch planning, KAPP and the IPP all need the revised dates." },
          ],
        },
      },
    },
  ],
};

export default lesson;
