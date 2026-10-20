import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m13-l04",
  title: "Managing Consultants, Contractors, Meetings & Minutes",
  summary:
    "How to direct an Owner's Engineer through scope and KPIs, run progress meetings that produce decisions, write minutes and action logs that stand up as contemporaneous records, and hold contractors accountable firmly and professionally.",
  minutes: 60,
  objectives: [
    "You can explain the principal–agent problem behind consultant and contractor management and the controls that address it",
    "You can define an Owner's Engineer scope and a weighted KPI scorecard, and compute a performance score",
    "You can run a progress meeting with a decision-focused agenda and produce bilingual minutes with an action log",
    "You can spot and neutralise attempts to build claims through minutes",
    "You can apply a proportionate escalation ladder to hold a contractor accountable",
  ],
  concepts: [
    {
      id: "m13.principal-agent",
      name: "Principal–agent problem",
      description:
        "The ministry (principal) relies on consultants and contractors (agents) who know more and whose incentives differ; contracts, KPIs, reporting and verification reduce the gap.",
      competency: "leadership",
      related: ["m13.oe-management", "m09.risk-allocation"],
    },
    {
      id: "m13.oe-management",
      name: "Owner's Engineer management",
      description:
        "Defining the OE's scope, authority, staffing, deliverables and KPIs, and verifying its outputs rather than rubber-stamping them.",
      competency: "leadership",
      related: ["m13.consultant-role", "m07.owners-engineer", "m07.site-supervision"],
    },
    {
      id: "m13.kpi-scorecard",
      name: "Weighted KPI scorecard",
      description:
        "A small set of SMART indicators, each scored and weighted, giving a defensible overall performance score linked to contract remedies or future awards.",
      competency: "controls",
      related: ["m08.hse-kpis", "m08.contractor-mgmt"],
    },
    {
      id: "m13.progress-meeting",
      name: "Progress meeting discipline",
      description:
        "A recurring meeting with a fixed agenda (safety, progress vs programme, look-ahead, risks, decisions, actions) whose output is decisions and owned actions.",
      competency: "leadership",
      related: ["m08.progress-report"],
    },
    {
      id: "m13.minutes-action-log",
      name: "Minutes and action log",
      description:
        "Minutes record decisions and actions (owner, due date, status), not debate; once agreed they are contemporaneous evidence in claims and disputes.",
      competency: "contracts",
      related: ["m13.progress-meeting", "m13.contract-notice", "m08.document-control", "m09.delay-analysis"],
    },
    {
      id: "m13.accountability-ladder",
      name: "Contractor accountability ladder",
      description:
        "Proportionate escalation: discussion → minuted action → letter → contractual Notice/NCR → contractual remedies (delay damages, withholding per contract, security) → termination as last resort.",
      competency: "contracts",
      related: ["m09.delay-lds", "m08.ncr", "m09.performance-security"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Why consultants and contractors need managing — and what managing means",
      blocks: [
        {
          kind: "md",
          md: md`### The principal–agent problem

The ministry hires an Owner's Engineer (OE) and an EPC contractor because it lacks the capacity to design, supervise and build. That creates a **principal–agent problem**: the agent knows more than the principal (**information asymmetry**) and its incentives differ (**misaligned incentives**).

| Agent | What it knows that you don't | Where its incentives diverge from MEWRE's |
|---|---|---|
| EPC contractor | True progress, true causes of delay, cost to complete, design weaknesses | Minimise its cost, maximise variations and EOT, shift risk to the Employer |
| Owner's Engineer | Real quality of design reviews and supervision, staff actually deployed | Maximise billable scope, avoid blame, keep a good relationship with the contractor it will meet on the next job |
| IPP developer (for PPAs) | Its own schedule risks, financing constraints | Maximise deemed energy and compensation events; minimise performance obligations |

Management is the set of controls that close this gap:

1. **Clear contract scope and authority** — what each party must do and may decide.
2. **Incentives** — KPIs linked to payment, retention, future eligibility, delay damages, performance guarantees.
3. **Reporting** — monthly reports, programmes, registers in agreed formats.
4. **Verification** — the principal independently checks a sample: site walks, data, test witnessing, recomputation.
5. **Records** — minutes, notices, registers that make performance and responsibility visible later.

A PM who does only (3) — reads reports — is not managing; they are being informed by the agent about the agent.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why 'trust but verify' is not cynicism",
          md: md`Verification is not an accusation; it is how a principal makes an agent's reports credible. A contractor whose progress figures are regularly checked has a reason to report accurately. An OE whose design-review comments are sampled has a reason to review properly. Unverified reporting drifts — not usually from dishonesty, but from optimism and self-interest.`,
        },
        {
          kind: "md",
          md: md`### The Owner's Engineer: scope and authority

A typical OE scope on a MEWRE grid or generation package:

| Phase | OE services |
|---|---|
| Pre-contract | Employer's Requirements, technical evaluation support, contract technical schedules |
| Design | Review of contractor design submissions against ERs and standards; review comments with codes (e.g. A approved / B approved with comments / C revise and resubmit / D rejected) |
| Manufacturing | Factory inspections and witnessing FATs (transformers, GIS, inverters, modules) |
| Construction | Site supervision, quality inspections, NCRs, HSE monitoring, progress measurement, review of programme updates |
| Commercial | Interim Payment Certificate (IPC) assessment, variation valuation, claims analysis, delay analysis |
| Testing & handover | Witnessing SAT, commissioning, performance tests; punch lists; as-built and O&M documentation review |

Under FIDIC, the OE may be appointed as **the Engineer**, with powers defined by the Contract (e.g. to give instructions, make determinations, certify payments). The Particular Conditions often require the Engineer to obtain the Employer's approval before exercising specified powers — e.g. instructing variations above a value or granting extensions of time. The PM must know that list by heart.

### KPIs that mean something

Good KPIs are **SMART** (specific, measurable, achievable, relevant, time-bound), few (5–8), and mix **leading** indicators (predict problems: review turnaround, staffing compliance, look-ahead quality) with **lagging** ones (record outcomes: milestones met, NCR closure). Each KPI needs a **scoring rule** decided in advance, a **weight**, and a **data source** that is not the consultant's own opinion.`,
        },
        { kind: "equation", formula: "m13-weighted-score" },
        {
          kind: "md",
          md: md`### Meetings as a production system

A meeting is a process whose output is **decisions and owned actions**. Everything else (status reading, debate) is input that should mostly happen before the meeting. The progress meeting's standard agenda:

1. Safety (always first — incidents, near misses, observations)
2. Actions from the previous meeting (by exception: overdue or blocked)
3. Progress vs programme: critical path, float, milestones, look-ahead (3–6 weeks)
4. Engineering and procurement: submittals, approvals, deliveries
5. Quality: NCRs, inspections, test results
6. Risks and issues: new, escalating, closed
7. Commercial: IPCs, variations, notices (often a separate commercial meeting)
8. Decisions required, and from whom
9. New actions — read back owner and due date before closing

FIDIC contracts typically provide for management meetings (for example Sub-Clause 3.8 in the 2017 books, where the Engineer records the meeting and issues the record to the attendees and the parties — check your Contract's numbering and wording). The cost of a meeting is real and easy to underestimate:`,
        },
        { kind: "equation", formula: "m13-meeting-cost" },
        {
          kind: "md",
          md: md`### Minutes are evidence

Approved minutes are **contemporaneous records**. In a delay claim or arbitration, a tribunal gives heavy weight to what was recorded at the time. That makes minutes a battlefield:

- Contractors may try to record statements like "the Contractor stated that the delay is due to late access" — if unchallenged, this becomes evidence that the Employer did not dispute causation.
- The answer is not to refuse to minute contractor statements, but to **record the Employer's response**: "The Employer does not accept this statement; the matter will be addressed through the contractual procedure."
- Minutes must be issued promptly (e.g. within 3 working days), with a deadline for comments (e.g. 5 working days); silence after that period is treated as acceptance if the agreed procedure says so.
- Minutes **do not replace Notices**. A claim must still be notified in the form and time the Contract requires; a minute that "the Contractor reserves its rights" is not usually a valid claim notice — and conversely, the Employer should not rely on minutes for its own notices.

### Holding contractors accountable — the ladder

| Step | Tool | When |
|---|---|---|
| 1 | Discussion at working level | First sign of a problem |
| 2 | Minuted action with owner and date | Problem persists one cycle |
| 3 | Formal letter (non-contractual) | Action missed; pattern emerging |
| 4 | Contractual Notice / NCR / instruction to submit revised programme | Contractual obligation not met |
| 5 | Contractual remedies: delay damages, withholding certification for non-compliant work as the Contract permits, calling performance security in defined circumstances | Defined triggers met |
| 6 | Senior-level escalation (Undersecretary to contractor's regional head) | Strategic risk to the project |
| 7 | Termination | Last resort, with Legal and strong records |

Two principles: **proportionality** (match the tool to the problem; do not threaten what you will not do) and **documentation** (each step is on record before the next).`,
        },
        { kind: "sources", refs: ["m13-fidic", "m13-pmbok"] },
      ],
    },
    {
      layer: "applied",
      title: "Scorecards, meeting economics and minutes",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Quarterly KPI score for the Owner's Engineer",
          given: md`The OE contract defines five KPIs scored 1–5 each quarter: (1) design-review turnaround within 14 days — weight 0.25, score 3; (2) site supervision coverage vs staffing plan — weight 0.20, score 4; (3) quality of monthly reports — weight 0.15, score 2; (4) key-staff compliance (named staff present) — weight 0.25, score 5; (5) responsiveness to Employer requests — weight 0.15, score 3. The contract says scores below 70% trigger a formal improvement plan.`,
          steps: [
            { md: md`Check weights sum to 1: $0.25 + 0.20 + 0.15 + 0.25 + 0.15 = 1.00$.` },
            {
              md: md`Weighted score: $S = 0.25(3) + 0.20(4) + 0.15(2) + 0.25(5) + 0.15(3) = 0.75 + 0.80 + 0.30 + 1.25 + 0.45 = 3.55$ out of 5.`,
            },
            { md: md`As a percentage: $3.55/5 = 71\%$ — just above the 70% trigger.` },
            {
              md: md`**Interpretation.** The headline hides the weak spot: report quality scored 2 and review turnaround 3 — both *leading* indicators of whether the ministry is getting real oversight. Key-staff compliance (5) inflates the total: having the right people on site is necessary, not sufficient.`,
            },
            {
              md: md`**Action.** Write to the OE with the scorecard, commend staffing, and require a short corrective plan for turnaround and reporting within 14 days, even though the formal 70% trigger was not crossed.`,
            },
          ],
          result: md`$S = 3.55/5 = 71\%$. The number is defensible because the weights and rules were agreed in advance; the management value comes from looking at the components, not just the total.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "The cost of the weekly progress meeting",
          given: md`The weekly progress meeting has **14 attendees** (ministry, OE, EPC, subcontractors) and lasts **2.5 hours**. Assume an average fully loaded cost of **KD 25 per person-hour** (an illustrative blended rate across organisations). You propose to cut it to **8 attendees** for **1.5 hours**, with technical topics moved to focused sub-meetings.`,
          steps: [
            {
              md: md`Current cost per meeting: $C = N \cdot h \cdot r = 14 \times 2.5 \times 25 = \text{KD } 875$.`,
              hidden: true,
              check: { prompt: "Current cost per meeting (KD)", answer: 875, unit: "KD", tolerance: { abs: 1 } },
            },
            { md: md`Annual (52 meetings): $875 \times 52 = \text{KD } 45{,}500$.` },
            { md: md`Proposed cost per meeting: $8 \times 1.5 \times 25 = \text{KD } 300$.` },
            {
              md: md`Annual saving: $(875 - 300) \times 52 = 575 \times 52 = \text{KD } 29{,}900$.`,
              hidden: true,
              check: { prompt: "Annual saving (KD)", answer: 29900, unit: "KD", tolerance: { abs: 50 } },
            },
          ],
          result: md`About **KD 30,000 a year** of senior time released — and, more importantly, a meeting small enough to make decisions. The rule: invite those who decide or own actions; inform everyone else through the minutes.`,
        },
        {
          kind: "question",
          question: {
            id: "m13-l04-p1",
            type: "numeric",
            prompt: "Over the last quarter, 46 actions in the progress-meeting log fell due. 29 were closed by their due date. What is the on-time closure rate (%)?",
            answer: 63,
            unit: "%",
            tolerance: { abs: 0.5 },
            explanation: md`$29/46 = 0.630 = 63\%$. Below roughly 80% the action log is losing credibility: actions are being created without real owners or realistic dates. Break the figure down by owner organisation — if most overdue actions sit with the ministry, fix your own house first.`,
            concepts: ["m13.minutes-action-log", "m13.progress-meeting"],
            difficulty: 1,
          },
        },
        {
          kind: "md",
          md: md`### Bilingual minutes template with action log

Keep minutes short: attendance, decisions, actions, and the Employer's position where a contractual point was raised. Discussion is summarised only where needed to understand a decision.`,
        },
        {
          kind: "bilingual",
          title: "Minutes of progress meeting No. [ ]",
          en: md`**MINUTES OF PROGRESS MEETING No. 23**
**Contract:** [ ] — [Project]
**Date / time / place:** [ ]
**Chair:** [Name], Project Manager, MEWRE
**Attendees:** MEWRE: [ ] · Owner's Engineer: [ ] · Contractor: [ ] · Apologies: [ ]
**Minutes prepared by:** [Engineer/OE] · **Issued:** [date] · **Comments by:** [date + 5 working days]

**1. Safety** — No lost-time incidents. One near miss (lifting, 14 [month]); Contractor to submit investigation (A23-01).

**2. Previous actions** — 9 open: 6 closed, 3 overdue (see log).

**3. Progress vs programme** — Overall 61.2% vs 66.0% planned. Critical path: GIS installation, float −38 days. Contractor to submit recovery programme (A23-02).

**4. Engineering & procurement** — Protection settings study submitted Rev B; OE review due [date].

**5. Quality** — NCR-041 (cable trench backfill compaction) open; remedial method statement submitted.

**6. Risks** — New: transformer FAT re-test may slip 3 weeks.

**7. Contractual points raised**
7.1 The Contractor stated that late access to Bay 3 delayed GIS installation.
7.2 **The Employer does not accept this statement.** Access was given on [date] per letter Ref. [ ]. Any claim must follow the procedure in the Contract.

**8. Decisions**
D23-1: Night shift for GIS installation approved, subject to the HSE plan being accepted by the OE.

**ACTION LOG**
| ID | Action | Owner | Due | Status |
|---|---|---|---|---|
| A23-01 | Near-miss investigation report | Contractor — HSE Manager | [ ] | Open |
| A23-02 | Recovery programme with resources | Contractor — Planning Manager | [ ] | Open |
| A23-03 | Review protection settings Rev B | OE — Protection Engineer | [ ] | Open |
| A23-04 | Confirm Bay 3 outage window with Transmission | MEWRE — PM | [ ] | Open |

**Next meeting:** [date / time / place]`,
          ar: md`**محضر اجتماع متابعة سير العمل رقم (23)**
**العقد:** [ ] – [اسم المشروع]
**التاريخ / الوقت / المكان:** [ ]
**رئيس الاجتماع:** [الاسم]، مدير المشروع – الوزارة
**الحضور:** الوزارة: [ ] · مهندس المالك: [ ] · المقاول: [ ] · المعتذرون: [ ]
**أعدّ المحضر:** [المهندس / مهندس المالك] · **تاريخ الإصدار:** [ ] · **آخر موعد للملاحظات:** [خمسة أيام عمل من الإصدار]

**1. السلامة:** لا توجد إصابات مضيّعة للوقت. حادث وشيك واحد (أعمال رفع، بتاريخ 14 [ ])؛ على المقاول تقديم تقرير التحقيق (A23-01).

**2. الإجراءات السابقة:** 9 إجراءات مفتوحة: أُغلق 6، وتأخر 3 (انظر السجل).

**3. التقدم مقارنةً بالبرنامج الزمني:** نسبة الإنجاز الكلية 61.2% مقابل 66.0% مخطط. المسار الحرج: تركيب المحطة المعزولة بالغاز، بفائض زمني سالب قدره (38) يوماً. على المقاول تقديم برنامج تعافٍ (A23-02).

**4. التصميم والتوريد:** قُدّمت دراسة إعدادات الحماية (المراجعة B)؛ موعد مراجعة مهندس المالك [ ].

**5. الجودة:** تقرير عدم المطابقة رقم NCR-041 (دمك ردم خنادق الكابلات) ما زال مفتوحاً؛ وقُدّم بيان طريقة المعالجة.

**6. المخاطر:** جديد: احتمال تأخر إعادة اختبار المحول في المصنع ثلاثة أسابيع.

**7. نقاط تعاقدية مثارة**
7.1 أفاد المقاول بأن التأخر في تسليم الخلية رقم (3) أدى إلى تأخير تركيب المحطة المعزولة بالغاز.
7.2 **لا تقبل الوزارة هذه الإفادة،** إذ تم التسليم بتاريخ [ ] بموجب الكتاب رقم [ ]، وأي مطالبة يجب أن تتبع الإجراءات المنصوص عليها في العقد.

**8. القرارات**
القرار D23-1: الموافقة على وردية ليلية لأعمال تركيب المحطة المعزولة بالغاز، شريطة اعتماد مهندس المالك لخطة الصحة والسلامة.

**سجل الإجراءات**
| الرقم | الإجراء | المسؤول | الموعد | الحالة |
|---|---|---|---|---|
| A23-01 | تقرير التحقيق في الحادث الوشيك | المقاول – مدير السلامة | [ ] | مفتوح |
| A23-02 | برنامج التعافي مع الموارد | المقاول – مدير التخطيط | [ ] | مفتوح |
| A23-03 | مراجعة إعدادات الحماية (المراجعة B) | مهندس المالك – مهندس الحماية | [ ] | مفتوح |
| A23-04 | تأكيد نافذة فصل الخلية رقم (3) مع قطاع النقل | الوزارة – مدير المشروع | [ ] | مفتوح |

**الاجتماع القادم:** [التاريخ / الوقت / المكان]`,
        },
      ],
    },
    {
      layer: "field",
      title: "Directing the OE and the contractor on a real project",
      blocks: [
        {
          kind: "md",
          md: md`### Directing the Owner's Engineer

- **Write an authority matrix** on day one: what the OE may instruct, review, approve or certify alone; what needs your written concurrence; what needs higher approval. Share it with the contractor so there is no ambiguity.
- **Sample its work.** Each month, pick two design-review packages and read the comments yourself; join one factory inspection per quarter; walk the site with the resident engineer unannounced.
- **Own the deliverables register.** OE deliverables (monthly reports, review logs, inspection records, IPC assessments) are tracked with due dates like any contractor submittal.
- **Insist on key-staff compliance.** The named staff in the OE's proposal are why it won; substitutions need your approval with equivalent CVs.
- **Separate advice from decision.** The OE's recommendation goes into your memo as an attachment; the memo is yours.

### Running the meeting

- Circulate the agenda and a **pre-read** (progress dashboard, look-ahead, overdue actions) 24–48 hours ahead.
- Start on time; safety first; take status as read; spend the time on **exceptions and decisions**.
- Use the action log as the spine: every overdue action gets a reason and a new date — or an escalation.
- At the end, **read back** decisions and new actions with owners and dates.
- Issue minutes within 3 working days; track comments; close the loop at the next meeting.
- Keep **commercial and contractual matters** in a separate, smaller meeting with Legal or the contract administrator present when needed.

### Professional firmness

Accountability is easier when the relationship is respectful. In the Gulf, a senior contractor executive who is embarrassed in front of their team becomes harder, not easier, to move. Be warm with people and firm on obligations: "We value the relationship, and the contract requires a recovery programme by the 14th." Then follow through every time — a deadline you do not enforce teaches the contractor that your deadlines are suggestions.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- **Unchallenged contractor statements in minutes** that later underpin a delay claim.
- **Minutes as narrative** — three pages of "discussion" with no decisions, owners or dates.
- **Actions owned by organisations, not people** ("Contractor to advise") — nobody owns them.
- **OE rubber-stamping** — the ministry signs IPCs and approvals without sampling the OE's work.
- **Threats without follow-through** — "we will apply delay damages" repeated monthly and never applied.
- **Meeting bloat** — 20 attendees, 3 hours, no decisions.
- **Using minutes instead of Notices** — rights lost because the formal Notice was never sent.`,
        },
        {
          kind: "checklist",
          title: "Weekly PM routine",
          items: [
            "Review the action log: overdue items by owner; escalate those overdue twice",
            "Check minutes issued within 3 working days and comments resolved",
            "Respond in writing to any contractual statement recorded in minutes",
            "Sample one OE output (review comments, inspection record or IPC assessment)",
            "Check the notices and correspondence register for deadlines falling in the next 14 days",
            "Walk the site or join one inspection",
            "Update the KPI evidence file for the OE and contractor",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask the contractor in progress meetings",
          items: [
            "What is today's critical path, and what changed since last week?",
            "Which activities in the 4-week look-ahead lack resources, materials or approvals?",
            "Which of our (Employer) actions are you waiting for, and since when?",
            "What would it take to recover the float lost this month — resources, sequence, cost?",
            "Which NCRs are older than 30 days, and why?",
          ],
        },
        { kind: "scenario", scenario: "m13-s5" },
        {
          kind: "feynman",
          prompt:
            "Explain why minutes of a progress meeting matter in a later delay claim, and what you do when the contractor's statement is recorded in them.",
          keyPoints: [
            "Approved minutes are contemporaneous records that tribunals rely on",
            "Unchallenged statements can be read as acceptance",
            "Record the Employer's response and route the matter to the contractual procedure",
            "Minutes do not replace contractual Notices",
            "Issue promptly with a comment period; track comments",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m13-l04-q1",
      type: "mcq",
      prompt: "Which best describes the principal–agent problem in managing an EPC contractor?",
      options: [
        "The contractor is legally the principal",
        "The contractor knows more about true progress and costs, and its incentives differ from the ministry's",
        "The ministry must hire two contractors to compare them",
        "Agents cannot be paid by milestone",
      ],
      answer: 1,
      explanation: md`Information asymmetry plus misaligned incentives. The controls are clear scope and authority, incentives, reporting, independent verification and records.`,
      concepts: ["m13.principal-agent"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m13-l04-q2",
      type: "numeric",
      prompt: "An OE scorecard has three KPIs: weight 0.5 score 4, weight 0.3 score 2, weight 0.2 score 5 (scores out of 5). What is the overall score as a percentage?",
      answer: 72,
      unit: "%",
      tolerance: { abs: 0.5 },
      explanation: md`$S = 0.5(4) + 0.3(2) + 0.2(5) = 2.0 + 0.6 + 1.0 = 3.6$; $3.6/5 = 72\%$.`,
      concepts: ["m13.kpi-scorecard"],
      difficulty: 1,
    },
    {
      id: "m13-l04-q3",
      type: "decision",
      prompt: md`You are the PM. Draft minutes issued by the OE record: "The Contractor stated that the delay to cable laying is due to the Employer's late approval of the route." The approval was in fact issued on time. What do you do?`,
      options: [
        { text: "Ask the OE to delete the statement", score: 0.4, feedback: "Deleting what was said looks like suppression and the contractor will object. Record the Employer's response instead." },
        { text: "Comment within the comment period that the Employer does not accept the statement, citing the approval letter reference and date, and that any claim must follow the contractual procedure", score: 1, feedback: "Correct: the record now shows the statement was disputed at the time, with evidence." },
        { text: "Ignore it — minutes are not contractual", score: 0, feedback: "Unchallenged statements in approved minutes can be powerful evidence later." },
        { text: "Send a Notice of claim against the contractor", score: 0.2, feedback: "Disproportionate and misdirected; the issue is the record, not an Employer claim." },
      ],
      explanation: md`Minutes are evidence. Don't erase statements — rebut them on the record with references.`,
      concepts: ["m13.minutes-action-log"],
      difficulty: 2,
    },
    {
      id: "m13-l04-q4",
      type: "order",
      prompt: "Order the contractor accountability ladder from least to most severe.",
      items: [
        "Discussion at working level",
        "Minuted action with owner and date",
        "Formal letter",
        "Contractual Notice / NCR",
        "Contractual remedies (e.g. delay damages)",
        "Termination",
      ],
      explanation: md`Proportionate and documented escalation: each step is on record before the next, and you only threaten what you will do.`,
      concepts: ["m13.accountability-ladder"],
      difficulty: 1,
    },
    {
      id: "m13-l04-q5",
      type: "multi",
      prompt: "Which make a good action-log entry? (Select all that apply.)",
      options: ["A named person as owner", "'Contractor to advise' as the action", "A specific due date", "A unique ID linked to the meeting", "Status updated at each meeting"],
      answer: [0, 2, 3, 4],
      explanation: md`Actions need a person, a date, an ID and status. 'Contractor to advise' has no owner, no deliverable and no date.`,
      concepts: ["m13.minutes-action-log"],
      difficulty: 1,
    },
    {
      id: "m13-l04-q6",
      type: "short",
      prompt: "List five KPIs you would put in an Owner's Engineer contract for a 400 kV substation package, and say for each whether it is leading or lagging.",
      rubric: [
        "Includes design-review turnaround (leading)",
        "Includes key-staff / staffing compliance (leading)",
        "Includes an outcome measure such as NCR closure time, milestones certified on time or IPC assessment timeliness (lagging)",
        "KPIs are measurable from data not controlled solely by the OE",
        "Correctly classifies leading vs lagging",
      ],
      modelAnswer:
        "1) Design submittals reviewed within 14 days (leading). 2) Named key staff present vs staffing plan (leading). 3) Quality of monthly report against a template checklist (leading). 4) IPC assessments issued within the contractual period (lagging). 5) NCRs closed within 30 days of issue (lagging). Data comes from the document control system, timesheets/site access records and the NCR register, not from the OE's own narrative.",
      explanation: md`Leading indicators warn before outcomes deteriorate; lagging indicators confirm outcomes. A good scorecard mixes both and uses independent data.`,
      concepts: ["m13.kpi-scorecard", "m13.oe-management"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m13-l04-f1", front: "Principal–agent problem — two causes", back: "Information asymmetry and misaligned incentives." },
    { id: "m13-l04-f2", front: "Five controls on an agent", back: "- Scope & authority\n- Incentives\n- Reporting\n- Independent verification\n- Records" },
    { id: "m13-l04-f3", front: "Weighted KPI score", back: md`$S = \sum w_i s_i$ with $\sum w_i = 1$.` },
    { id: "m13-l04-f4", front: "Leading vs lagging KPI", back: "Leading predicts (review turnaround, staffing); lagging records (milestones met, NCR closure)." },
    { id: "m13-l04-f5", front: "Response to a disputed contractor statement in minutes", back: "Record 'The Employer does not accept this statement', cite evidence, refer to the contractual procedure." },
    { id: "m13-l04-f6", front: "Do minutes replace Notices?", back: "No. Notices must follow the Contract's form, address and time limits." },
    { id: "m13-l04-f7", front: "Meeting cost", back: md`$C = N \cdot h \cdot r$ — attendees × hours × loaded rate.` },
    { id: "m13-l04-f8", front: "محضر اجتماع / سجل الإجراءات", back: "Minutes of meeting / action log." },
  ],
  scenarios: [
    {
      id: "m13-s5",
      title: "The recovery programme that never comes",
      dayInLife: true,
      context: md`The EPC contractor for MEWRE's 400 kV connecting substation is 38 days behind on the critical path. For three consecutive progress meetings the minutes have recorded "Contractor to submit recovery programme" — each time with a new date, each time missed. The contractor's project director is courteous and always promises "next week".`,
      start: "a",
      concepts: ["m13.accountability-ladder", "m13.minutes-action-log", "m13.progress-meeting"],
      nodes: {
        a: {
          md: md`What is your next step?`,
          choices: [
            { text: "Have the Engineer issue a formal instruction under the rate-of-progress Sub-Clause requiring a revised programme within the contractual period, with rights reserved", next: "b", score: 10, feedback: "Three missed minuted actions is the signal to move up the ladder to a contractual instrument with a contractual deadline." },
            { text: "Record the action a fourth time with a firmer tone", next: "c", score: 2, feedback: "Repeating a missed action teaches the contractor your dates are optional." },
            { text: "Ask the Undersecretary to call the contractor's regional CEO", next: "d", score: 4, feedback: "Senior escalation may come later, but skipping the contractual step wastes it and leaves no formal record." },
          ],
        },
        b: {
          md: md`The contractor submits a programme on the deadline — but it simply moves all remaining activities to the right, showing completion 38 days late with no added resources.`,
          choices: [
            { text: "Have the Engineer respond in writing that the programme does not comply (no revised methods or resources to recover), and require a compliant submission; note that delay damages will apply on the Contract's terms", next: "e", score: 10, feedback: "A programme that only reports the delay is not a recovery programme. Responding formally keeps the record clean and the pressure contractual." },
            { text: "Accept it — at least there is a programme", next: "e", score: 2, feedback: "An accepted programme showing late completion may later be argued as Employer acceptance of the new dates." },
          ],
        },
        c: {
          md: md`A month later the delay is 52 days and the contractor submits an EOT claim citing 'Employer-caused disruption'.`,
          choices: [{ text: "Start building the record now", next: "b", score: 3, feedback: "Late — the weeks without contractual instruments weaken the Employer's position on causation." }],
        },
        d: {
          md: md`The call happens; the CEO promises support. Two weeks later nothing has changed and the contractor's team says they were never formally instructed.`,
          choices: [{ text: "Issue the formal instruction now", next: "b", score: 5, feedback: "Senior goodwill is useful but not a substitute for the contractual record." }],
        },
        e: {
          md: md`The contractor's project director asks for a private meeting "to find a friendly solution".`,
          choices: [
            { text: "Accept the meeting with the OE present, listen to their constraints, and confirm any outcome in writing; make no concessions in the room", score: 10, feedback: "Relationship and record together: dialogue is welcome; commitments are written." },
            { text: "Refuse — everything must be by letter", score: 5, feedback: "Overly rigid; dialogue often unlocks real constraints (e.g. a supplier problem) you can help solve." },
            { text: "Meet alone and agree to waive delay damages if they recover half the delay", score: 0, feedback: "You likely have no authority to waive contractual rights, and a private undocumented deal is an integrity and audit risk." },
          ],
        },
      },
    },
  ],
};

export default lesson;
