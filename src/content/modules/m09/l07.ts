import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m09-l07",
  title: "Variations, claims, delay analysis and disputes",
  summary:
    "Valuing variations; establishing EOT entitlement; the delay analysis methods in the SCL Delay and Disruption Protocol (2nd ed., 2017); concurrent delay; prolongation, disruption and acceleration costs; managing claims from the Employer's side; the DAAB process; and what is (and is not) known about arbitration and Kuwaiti law for government contracts.",
  minutes: 85,
  objectives: [
    "You can value a Variation using contract rates, derived rates and Cost Plus Profit, including omissions.",
    "You can determine an EOT from an updated CPM network using time impact analysis, accounting for float.",
    "You can choose and critique a delay analysis method (impacted as-planned, TIA, windows, as-planned vs as-built, collapsed as-built).",
    "You can apply the SCL Protocol's approach to concurrent delay for time and for money.",
    "You can manage a contractor's claim from the Employer's side through to the DAAB, and explain the dispute route for a Kuwaiti government contract with its uncertainties.",
  ],
  concepts: [
    {
      id: "m09.variation-valuation",
      name: "Variation valuation",
      description:
        "Valuing instructed changes with contract rates where the work is similar, new rates derived from them where not, or Cost Plus Profit; crediting omissions; handling time-related costs separately.",
      competency: "contracts",
      related: ["m08.change-control", "m15.claims-variations"],
    },
    {
      id: "m09.delay-analysis",
      name: "Delay analysis methods",
      description:
        "Techniques to establish the effect of events on completion: impacted as-planned, time impact analysis, time-slice windows, as-planned vs as-built windows, retrospective longest path and collapsed as-built (SCL Protocol 2nd ed.).",
      competency: "contracts",
      related: ["m09.concurrent-delay", "m08.time-impact-analysis", "m08.cpm"],
    },
    {
      id: "m09.concurrent-delay",
      name: "Concurrent delay",
      description:
        "Two or more effective causes of delay to completion, one an Employer risk and one a Contractor risk, whose effects are felt at the same time; under the SCL approach the Contractor gets time but not money for the concurrent period.",
      competency: "contracts",
    },
    {
      id: "m09.prolongation-disruption",
      name: "Prolongation, disruption and acceleration",
      description:
        "Prolongation compensates time-related costs of an extended period; disruption compensates lost productivity (measured mile); acceleration compensates the cost of recovering time when instructed (or constructively required).",
      competency: "contracts",
      related: ["m09.delay-analysis"],
    },
    {
      id: "m09.daab-arbitration",
      name: "DAAB and arbitration",
      description:
        "The FIDIC 2017 standing Dispute Avoidance/Adjudication Board, its binding interim decisions, and final resolution by arbitration (ICC by default), subject to governing law and any restrictions for government contracts.",
      competency: "contracts",
      related: ["m13.claims-settlement"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Valuing change and proving delay",
      blocks: [
        {
          kind: "md",
          md: md`### Variations: how they are valued

A **Variation** is an instructed change to the Works (FIDIC 2017 Clause 13). The money follows a hierarchy:

1. **Contract rates or prices** where the varied work is of similar character and executed under similar conditions.
2. **New rates derived from contract rates**, adjusted for the differences, where no rate is directly applicable. In the Red Book (Clause 12) a new rate is also appropriate where measured quantities change materially from the Bill of Quantities and that change alters the unit cost (the Red Book sets specific thresholds).
3. **Cost Plus Profit** where no rate can reasonably be derived: Cost reasonably incurred plus the profit percentage in the Contract Data (FIDIC 2017 default **5%**).

On Yellow and Silver (lump sum), a Schedule of Rates or a price breakdown, if included, provides the rates; otherwise Cost Plus Profit. An **omission** is valued at the contract rates for the work omitted and credited to the Employer.`,
        },
        { kind: "equation", formula: "m09-variation-cost-plus" },
        {
          kind: "callout",
          tone: "why",
          title: "Why time-related cost is kept out of the rates",
          md: md`Rates price the work itself. If a Variation also delays completion, the Contractor's extra site overheads for the longer period are claimed as **prolongation** with the EOT, once, based on actual costs. Pricing them into both the variation rates and the prolongation claim is the most common double count in variation accounts.`,
        },
        {
          kind: "md",
          md: md`### EOT entitlement

An EOT is due when (FIDIC 2017 8.5): (1) an event at the Employer's risk occurs (or a Variation), (2) the Contractor gives notice and follows Clause 20 (Variations excepted), and (3) the event **delays completion** beyond the Time for Completion. Point (3) is a question of the **critical path** and **float**: an Employer delay to an activity with float delays completion only once that float is used.`,
        },
        { kind: "equation", formula: "m09-eot-float" },
        {
          kind: "md",
          md: md`**Who owns float?** FIDIC 2017 is silent beyond requiring the programme to show it. The **SCL Protocol** (2nd ed.) recommends that, absent express terms, float is not for the exclusive use of either party: an EOT is granted only to the extent the Employer Risk Event is predicted to reduce float to below zero at the time of the event. A Contractor that has already consumed float by its own delays gets less protection.

### Delay analysis methods (SCL Protocol, 2nd edition)

| Method | How it works | Strengths | Weaknesses | Best used |
|---|---|---|---|---|
| **Impacted as-planned** | Insert delay events into the **baseline** programme; measure the shift in completion | Simple, cheap | Ignores actual progress and contractor delays; theoretical | Early, simple claims; rarely persuasive after the event |
| **Time impact analysis (TIA)** | Insert a fragnet for each event into the **updated** programme current at the event; measure the shift | Prospective, reflects progress at the time; SCL's preferred contemporaneous method | Needs a reliable updated programme; predicted not actual effect | **During the project** to decide EOTs |
| **Time-slice windows** | Divide the project into windows; update the programme with actual progress at each; analyse critical path movement in each window | Uses contemporaneous updates; shows the evolving critical path | Effort; depends on quality of updates | After the event, with good monthly updates |
| **As-planned vs as-built windows** | Compare planned and actual dates for critical activities window by window | Factual, intuitive | Identifying the actual critical path can be subjective | Records good, programmes poor |
| **Retrospective longest path** | Trace the longest path back from actual completion in the as-built programme | Shows what actually controlled completion | Needs a reliable as-built logic | After completion |
| **Collapsed as-built** (but-for) | Remove delay events from an as-built programme to show when completion would have occurred "but for" them | Uses actual data; tests causation | Building as-built logic is subjective; sensitive to assumptions | After completion, as a cross-check |

The Protocol's guidance: deal with EOT applications **as the project proceeds** (contemporaneously, using TIA on the updated programme) rather than "wait and see"; after the event, choose a method suited to the contract, the records, the time available and proportionality.`,
        },
        { kind: "widget", widget: "cpm-gantt", caption: "Change durations and see when an activity with float becomes critical: the mechanics behind every EOT." },
        {
          kind: "md",
          md: md`### Concurrent delay

**True concurrency** is rare: two delay events, one an Employer risk and one a Contractor risk, each an **effective cause** of delay to completion, with their effects felt at the same time. More often one event is dominant and the other merely absorbs float.

**SCL Protocol position.** Where Contractor delay to completion is concurrent with Employer delay, the Contractor's concurrent delay should not reduce the EOT due (time), but the Contractor should **not recover compensation** for the concurrent period unless it can separate the costs caused by the Employer event. This "time but not money" approach reflects English cases such as Henry Boot v Malmaison (1999). Some jurisdictions apportion instead (the Scottish City Inn v Shepherd decision, 2010). Parties can contract out: in North Midland Building v Cyden Homes (2018) an English court upheld a clause denying EOT for concurrent delay. FIDIC 2017 8.5 leaves concurrency to the rules in the **Special Provisions**, or otherwise to "all relevant circumstances": check the Particular Conditions.

### Money for time: prolongation, disruption, acceleration`,
        },
        { kind: "equation", formula: "m09-prolongation-cost" },
        { kind: "equation", formula: "m09-disruption-measured-mile" },
        {
          kind: "md",
          md: md`- **Prolongation**: time-related costs (site staff, facilities, equipment on standby, bonds and insurances extended) for the compensable days, based on costs actually incurred in the period when the delay was felt. Head-office overhead is claimable only if proven (formula methods such as Hudson or Emden are treated with caution by the SCL Protocol).
- **Disruption**: loss of productivity without necessarily delaying completion, e.g. piling crews working around late design changes. The SCL Protocol prefers the **measured mile** (compare productivity in disrupted and undisrupted periods of the same work). Example: piling at 0.8 labour-h/pile undisrupted versus 1.3 h/pile disrupted over 40,000 piles at USD 25/h gives $(1.3 - 0.8) \times 40{,}000 \times 25 = 500{,}000$ USD.
- **Acceleration**: cost of recovering time. Instructed acceleration (e.g. under 8.7 if the Contractor is culpable, at its cost; or by Variation if the Employer wants earlier completion) is valued like a Variation. **Constructive acceleration** (the Employer refuses a valid EOT and insists on the original date) is recognised in some jurisdictions but is risky to rely on.
- **Global claims** (total cost minus tender cost, with no causal link per event) are discouraged by the SCL Protocol and often fail.

### Disputes: DAAB, then arbitration

Under FIDIC 2017 Clause 21 the **DAAB** is a standing board (one or three members) appointed at the start, visiting the site regularly and giving **informal assistance** when both Parties ask (21.3). If a 3.7 determination receives a Notice of Dissatisfaction, either Party refers the dispute to the DAAB within 42 days; the DAAB decides within **84 days**; the decision is **binding at once** and must be complied with; an NOD within 28 days preserves the right to arbitrate after an amicable settlement period of 28 days; arbitration under ICC Rules unless agreed otherwise. Failure to comply with a DAAB decision may itself be referred to arbitration (21.7).`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Kuwaiti law, government contracts and arbitration: verify before relying on it",
          md: md`Not established in our research and to be confirmed with MEWRE's legal department and the Fatwa and Legislation Department: (1) whether MEWRE's own construction contracts provide for arbitration, Kuwaiti courts, or a ministry-specific dispute procedure, and whether a DAAB is retained; (2) any approval required for a government entity to agree to arbitration and any restrictions on foreign-seated arbitration; (3) the Kuwaiti statutes governing arbitration (commonly cited as the Civil and Commercial Procedures Code provisions and a 1995 judicial-arbitration law); (4) Kuwait's accession to the New York Convention and any reservations (check the UNCITRAL status table); (5) Kuwaiti Civil Code rules on contractors' liability after handover (decennial liability is commonly cited for Gulf civil codes), which would continue after the FIDIC Performance Certificate. Government contracts in Kuwait are expected to be governed by Kuwaiti law; IPP financing documents are often under English law with offshore arbitration, which KAPP and the Fatwa and Legislation Department review.`,
        },
        { kind: "sources", refs: ["m09-scl-protocol-2017", "m09-fidic-red-2017", "m09-uncitral-ny-convention", "m09-meed-kapp-stakeholders", "m09-chambers-construction-kuwait-2025"] },
      ],
    },
    {
      layer: "applied",
      title: "A variation account and an EOT analysis",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Valuing a 33 kV cable reroute (with omission)",
          given: md`MEWRE instructs a reroute of three 33 kV collector circuits around a newly allocated pipeline corridor. New route: **2,400 m** of trench; original route omitted: **1,900 m**. Contract rates: trenching and backfill **USD 85/m**; cable supply and installation **USD 120/m per circuit**. A 300 m section crosses hard calcrete not covered by any rate; the Contractor's recorded costs for rock breaking: breaker plant **18 days at USD 2,400/day**, labour **18 days × 6 workers × USD 220/worker-day**, consumables **USD 6,000**. Profit percentage in the Contract Data: **5%**.`,
          steps: [
            {
              md: md`**Trenching (rated):** $2{,}400 \times 85 = 204{,}000$ USD.`,
            },
            {
              md: md`**Cable (rated):** $3 \times 2{,}400 \times 120 = 864{,}000$ USD.`,
            },
            {
              md: md`**Rock breaking (Cost Plus Profit):** $C = 18 \times 2{,}400 + 18 \times 6 \times 220 + 6{,}000 = 43{,}200 + 23{,}760 + 6{,}000 = 72{,}960$; with profit $72{,}960 \times 1.05 = 76{,}608$ USD.`,
            },
            {
              md: md`**Gross addition:** $204{,}000 + 864{,}000 + 76{,}608 = 1{,}144{,}608$ USD.`,
            },
            {
              md: md`**Omission credit:** $1{,}900 \times 85 + 3 \times 1{,}900 \times 120 = 161{,}500 + 684{,}000 = 845{,}500$ USD.`,
            },
            {
              md: md`**Net Variation:** $1{,}144{,}608 - 845{,}500 = 299{,}108$ USD. Any EOT (and prolongation) for the reroute is assessed separately under 13.3 with the programme.`,
            },
          ],
          result: md`About USD 0.30 m net. The Engineer checks: quantities against the as-built route survey; that the trench rate's soil assumption excludes calcrete (otherwise no extra); that the Cost records are contemporaneous; and that no time-related costs hide in the Cost Plus Profit element.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Time impact analysis: late grid backfeed plus late piling",
          given: md`Updated programme (days from the analysis date): **A** Piling 0–60 → **B** Structures & modules 60–150 → **D** Electrical 150–190. **C** Inverter delivery 0–120 → D. **E** MEWRE backfeed available at day **170** (Employer obligation). **F** Testing & commissioning (30 days) starts after D and E. Planned completion: day **220**. Event 1 (Employer risk): backfeed slips **35 days** to day 205. Event 2 (Contractor risk on this Silver-based contract): piling takes **20 days** longer. Event 3 (Contractor risk): inverters arrive **25 days** late.`,
          steps: [
            {
              md: md`**Baseline logic:** D finishes at 190 and E is available at 170, so F starts at $\max(190, 170) = 190$ and completion is $190 + 30 = 220$. Backfeed path float $= 190 - 170 = 20$ days.`,
            },
            {
              md: md`**Event 1 alone:** F starts at $\max(190, 205) = 205$, completion 235. EOT $= \max(0, 35 - 20) = 15$ days.`,
              hidden: true,
              check: { prompt: "EOT for the backfeed delay alone", answer: 15, unit: "days", tolerance: { abs: 0 } },
            },
            {
              md: md`**Event 3 alone:** C ends at 145, D still starts at $\max(150, 145) = 150$: inverter float (30 days) absorbs it; no effect on completion.`,
            },
            {
              md: md`**Event 2 added:** A ends at 80, B at 170, D at 210; F starts at $\max(210, 205) = 210$, completion **240**. The Employer event alone gives 235, so the Contractor is entitled to EOT to day 235 (15 days) and is culpable for $240 - 235 = 5$ days.`,
              hidden: true,
              check: { prompt: "Days of culpable (LD-bearing) delay", answer: 5, unit: "days", tolerance: { abs: 0 } },
            },
            {
              md: md`**Concurrency:** between day 220 and 235 both the backfeed delay and the piling delay are effective causes of delay. Under the SCL approach the Contractor gets time for those 15 days but **no prolongation cost** for them (unless it separates costs caused only by the backfeed), and pays delay damages for days 235–240.`,
            },
          ],
          result: md`EOT 15 days (to day 235), 5 days of delay damages, no compensation for the concurrent 15 days under the SCL approach (subject to the Particular Conditions). Without concurrency (if piling had been on time), the Contractor would get 15 days plus prolongation; at USD 45,000/day of time-related cost, that would be $15 \times 45{,}000 = 675{,}000$ USD.`,
        },
        {
          kind: "question",
          question: {
            id: "m09-l07-p1",
            type: "numeric",
            prompt: md`An Employer-caused late design approval delays an activity by **28 days**. In the programme updated to the date of the event, that activity's path has **11 days** of total float, and no Contractor delay affects completion. Using a time impact analysis on that programme, how many days of EOT are due?`,
            answer: 17,
            unit: "days",
            tolerance: { abs: 0 },
            explanation: md`$EOT = \max(0, d - TF) = \max(0, 28 - 11) = 17$ days. Under the SCL Protocol, the 11 days of float are absorbed first (float is not reserved for either party unless the contract says so). If the Contractor had already used that float through its own delays, the analysis on the updated programme would show less float and a larger EOT.`,
            concepts: ["m09.delay-analysis"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Managing claims from the Employer's side",
      blocks: [
        {
          kind: "md",
          md: md`**Roles.** The Engineer (or on Silver the Employer's Representative) receives and assesses claims and determines under 3.7; MEWRE's PM supplies the Employer's facts and records, manages Employer-risk events, and issues the Employer's own claims. A planning consultant (forensic delay analyst) checks the Contractor's delay analysis in Primavera P6; a quantity surveyor checks valuation and Cost records. Legal advice is needed before NODs, DAAB references and arbitration.

**Claim management strategy for the Employer.**

1. **Prevent:** clear Employer's Requirements, good site data, Employer obligations (access, permits, grid dates) planned as rigorously as the Contractor's work.
2. **Detect early:** monthly risk review of potential claims; read every Notice the day it arrives; advance warnings (8.4) both ways.
3. **Keep your own records:** site diaries, weather data, photographs, approvals log, MEWRE network outage records.
4. **Insist on the updated programme:** without an accepted 8.3 programme, every EOT becomes an argument about method.
5. **Assess on the merits, promptly:** contemporaneous TIA; partial EOTs where entitlement is clear; reject what is not supported, with reasons.
6. **Use the DAAB informally** before positions harden.
7. **Settle where the risk-weighted outcome favours it**: a claim with 60% probability of USD 2 m costs MEWRE roughly USD 1.2 m plus legal costs if fought.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- Employer refuses all EOTs "on principle", setting time at large or building a constructive acceleration claim.
- No accepted programme; Contractor and Employer use different baselines and the DAAB has to pick one.
- Delay analysis method chosen to suit the answer (impacted as-planned after the event, ignoring actual progress).
- Variations instructed verbally on site by MEWRE staff without the Engineer, then disputed.
- Concurrent delay ignored in prolongation assessments, so the Employer pays for periods the Contractor also delayed.
- Claims allowed to accumulate to the end, when records are gone and staff have left.
- DAAB decisions not complied with "because we will arbitrate", which is itself a breach (21.7).`,
        },
        {
          kind: "checklist",
          title: "PM checklist: assessing a delay and cost claim",
          items: [
            "Notice of Claim within 28 days? Fully detailed Claim with legal basis within 84 days?",
            "Is the event at the Employer's risk under this book and these Particular Conditions?",
            "Is there an accepted updated programme at the event date? Has a TIA been run on it?",
            "Does the event delay completion (critical path) after float? Any Contractor delay concurrent with it?",
            "Are costs actual, contemporaneous and time-related for the period the delay was felt?",
            "Has disruption been shown by a measured mile, or is it a disguised global claim?",
            "Any double counting between variation rates and prolongation?",
            "Mitigation: did the Contractor take reasonable steps to reduce the delay?",
          ],
        },
        {
          kind: "ask",
          title: "Ask the contractor",
          items: [
            "Which programme update did you use for this TIA, and why is it the right baseline?",
            "Show the critical path before and after the event, and the float you consumed.",
            "Which of your own delays overlap this period, and how have you treated them?",
            "Where do the daily time-related costs come from: tender allowances or actual costs in that period?",
            "What undisrupted period did you use for the measured mile, and why is it comparable?",
          ],
        },
        { kind: "scenario", scenario: "m09-s6" },
        {
          kind: "feynman",
          prompt:
            "Explain to MEWRE's legal adviser, without jargon, why the contractor deserves 15 days of extra time but no extra money for a period when both MEWRE's grid and the contractor's piling were late.",
          keyPoints: [
            "Completion was delayed by both events at the same time; each alone would have delayed it.",
            "The contractor should not pay delay damages for days MEWRE also caused (prevention principle), so it gets time.",
            "MEWRE should not pay the contractor's costs for days the contractor also caused, so no money for the concurrent period.",
            "This is the SCL Protocol approach; the contract's Special Provisions can change it.",
            "The analysis needs an updated programme showing both delays on the critical path.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m09-l07-q1",
      type: "mcq",
      prompt: md`Which delay analysis method does the SCL Protocol (2nd ed.) favour for deciding EOTs **during** the project?`,
      options: [
        "Impacted as-planned on the original baseline",
        "Time impact analysis on the programme updated to the time of the event",
        "Collapsed as-built",
        "A global claim",
      ],
      answer: 1,
      explanation: md`The Protocol recommends that EOTs be dealt with contemporaneously, by inserting the event (as a fragnet) into the updated programme current at the time. Collapsed as-built and windows methods are after-the-event techniques; impacted as-planned ignores actual progress.`,
      concepts: ["m09.delay-analysis"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m09-l07-q2",
      type: "numeric",
      prompt: md`A Contractor is granted a 20-day EOT for an Employer delay with **no** concurrent Contractor delay. Its actual time-related site costs in the delay period were **USD 38,500/day**. What prolongation cost (USD) is due, ignoring head-office overheads?`,
      answer: 770000,
      unit: "USD",
      tolerance: { rel: 0.001 },
      explanation: md`$C_{\text{prol}} = 20 \times 38{,}500 = 770{,}000$ USD. Use actual costs in the period when the delay was felt (often the end of the job, when site staffing differs from the tender average).`,
      concepts: ["m09.prolongation-disruption"],
      difficulty: 1,
    },
    {
      id: "m09-l07-q3",
      type: "mcq",
      prompt: md`Under the SCL Protocol, a period of true concurrent delay (Employer and Contractor events both effective causes) gives the Contractor:`,
      options: [
        "Neither time nor money",
        "Time (EOT) but, unless it can separate the costs, no compensation for that period",
        "Money but no time",
        "Time and money in full",
      ],
      answer: 1,
      explanation: md`"Time but not money": the Contractor is protected from delay damages for the concurrent period (it would be unjust to penalise delay the Employer also caused), but cannot recover its time-related costs that its own delay would have incurred anyway.`,
      concepts: ["m09.concurrent-delay"],
      difficulty: 2,
    },
    {
      id: "m09-l07-q4",
      type: "multi",
      prompt: md`Which are **after-the-event** (retrospective) delay analysis methods? Select all that apply.`,
      options: ["Collapsed as-built", "As-planned vs as-built windows", "Retrospective longest path", "Time impact analysis used contemporaneously", "Time-slice windows analysis"],
      answer: [0, 1, 2, 4],
      explanation: md`Collapsed as-built, as-planned vs as-built, longest path and time-slice windows all rely on actual (as-built or updated) records after the fact. TIA can be used retrospectively too, but its natural use is prospective during the project.`,
      concepts: ["m09.delay-analysis"],
      difficulty: 2,
    },
    {
      id: "m09-l07-q5",
      type: "numeric",
      prompt: md`Measured mile: module installation took **0.42 labour-h/module** in an undisrupted month and **0.61 labour-h/module** in a disrupted month during which **150,000** modules were installed. Labour costs **USD 18/h**. What is the disruption cost (USD)?`,
      answer: 513000,
      unit: "USD",
      tolerance: { rel: 0.005 },
      explanation: md`$C = (0.61 - 0.42) \times 150{,}000 \times 18 = 0.19 \times 2{,}700{,}000 = 513{,}000$ USD. The Engineer should test that the undisrupted month is truly comparable (same crews, weather, module type) and that the disruption is caused by an Employer risk event.`,
      concepts: ["m09.prolongation-disruption"],
      difficulty: 2,
    },
    {
      id: "m09-l07-q6",
      type: "decision",
      prompt: md`You are the MEWRE PM. A DAAB has decided that MEWRE must pay USD 2.4 m for a ground-conditions claim. MEWRE's legal team believes the decision is wrong. What is the right course?`,
      options: [
        {
          text: "Give a Notice of Dissatisfaction within 28 days to preserve the right to arbitrate, and comply with the decision (pay) in the meantime as FIDIC 2017 requires.",
          score: 1,
          feedback: "Correct: the decision is binding until revised by amicable settlement or arbitration. Non-compliance is itself a breach that can be referred directly to arbitration and may give the Contractor suspension or termination rights.",
        },
        {
          text: "Refuse to pay until the arbitration is finished.",
          score: 0.1,
          feedback: "A DAAB decision is binding at once. Withholding payment breaches 21.4 and invites a 21.7 referral and Clause 16 remedies.",
        },
        {
          text: "Pay and do nothing else.",
          score: 0.4,
          feedback: "Compliant, but without an NOD within 28 days the decision becomes final and binding and MEWRE loses the right to challenge it.",
        },
      ],
      explanation: md`"Pay now, argue later" is the core of adjudication: cash flow follows the DAAB decision, rights are preserved by the NOD.`,
      concepts: ["m09.daab-arbitration"],
      difficulty: 2,
    },
    {
      id: "m09-l07-q7",
      type: "short",
      prompt: md`The Contractor submits a prolongation claim of 60 days × its tender daily overhead rate for "MEWRE delays". What would you require before the Engineer can assess it?`,
      rubric: [
        "Identification of each Employer risk event with notices in time.",
        "A delay analysis (TIA/windows) on accepted updated programmes showing the effect on completion and float consumed.",
        "Treatment of concurrent Contractor delay.",
        "Actual time-related costs incurred in the period the delay was felt, not tender rates.",
        "No double counting with variation valuations.",
      ],
      modelAnswer: md`I would require: each delay event identified with its Notice of Claim and fully detailed Claim; a time impact or windows analysis on the accepted updated programmes showing which events delayed completion and by how much after float; identification of any concurrent Contractor delay and the compensable days net of it; actual, recorded time-related costs for the period in which the delay was felt (not tender rates); and confirmation that none of these costs are already in variation valuations. Without that, the claim is a disguised global claim.`,
      explanation: md`Entitlement to money for delay requires cause, effect and quantum, each proven. A days-times-rate claim proves none of them.`,
      concepts: ["m09.prolongation-disruption", "m09.concurrent-delay", "m09.delay-analysis"],
      difficulty: 3,
    },
  ],
  flashcards: [
    { id: "m09-l07-f1", front: "Variation valuation hierarchy", back: "Contract rates for similar work → rates derived from them → Cost Plus Profit (FIDIC 2017 default profit 5%).", concepts: ["m09.variation-valuation"] },
    { id: "m09-l07-f2", front: "EOT from a delay on a path with float", back: "EOT = max(0, delay − total float), assessed on the updated programme at the event.", concepts: ["m09.delay-analysis"] },
    { id: "m09-l07-f3", front: "SCL Protocol edition and date", back: "Delay and Disruption Protocol, 2nd edition, February 2017 (Society of Construction Law).", concepts: ["m09.delay-analysis"] },
    { id: "m09-l07-f4", front: "Impacted as-planned: main weakness", back: "Ignores actual progress and Contractor delays: it shows a theoretical effect on the original plan.", concepts: ["m09.delay-analysis"] },
    { id: "m09-l07-f5", front: "Collapsed as-built", back: "Remove Employer delay events from the as-built programme to see when completion would have occurred 'but for' them.", concepts: ["m09.delay-analysis"] },
    { id: "m09-l07-f6", front: "SCL position on concurrent delay", back: "Time but not money: EOT for the concurrent period, no compensation unless costs can be separated.", concepts: ["m09.concurrent-delay"] },
    { id: "m09-l07-f7", front: "Measured mile", back: "Disruption cost = (hours per unit disrupted − hours per unit undisrupted) × units disrupted × cost per hour.", concepts: ["m09.prolongation-disruption"] },
    { id: "m09-l07-f8", front: "DAAB decision status", back: "Binding at once and must be complied with; NOD within 28 days preserves arbitration; otherwise final and binding.", concepts: ["m09.daab-arbitration"] },
    { id: "m09-l07-f9", front: "North Midland v Cyden Homes (2018)", back: "English court upheld a clause denying EOT for concurrent delay: parties can contract out of the 'time' entitlement.", concepts: ["m09.concurrent-delay"] },
    { id: "m09-l07-f10", front: "Global claim", back: "Total-cost style claim without linking each event to its effect; discouraged by the SCL Protocol and often rejected.", concepts: ["m09.prolongation-disruption"] },
  ],
  scenarios: [
    {
      id: "m09-s6",
      title: "Ground conditions at piling",
      dayInLife: true,
      context: md`MEWRE is Employer on a **FIDIC 2017 Yellow** contract for a 250 MW PV plant with BESS at a new site. The tender included a geotechnical report with 40 boreholes showing dense sand over calcrete at 2.5–3.0 m. Three weeks into piling, 30% of ram-driven piles refuse at 1.2–1.8 m on a shallow, hard calcrete layer in the eastern blocks. The Contractor gives Notice under Sub-Clause 4.12 and a Notice of Claim under 20.2.1, proposing pre-drilling (USD 45 per pile on about 38,000 piles) and a 42-day EOT.`,
      start: "a",
      concepts: ["m09.unforeseeable-conditions", "m09.delay-analysis", "m09.variation-valuation", "m09.claims-time-bar"],
      nodes: {
        a: {
          md: md`The site director wants to tell the Contractor that "ground risk is yours on a design-build contract". What is the correct position?`,
          choices: [
            {
              text: "Under Yellow 2017, 4.12 Unforeseeable Physical Conditions still gives the Contractor EOT and Cost if an experienced contractor could not reasonably have foreseen the conditions by the Base Date, judged against the tender geotechnical data. The question is foreseeability, not who designs.",
              next: "b",
              score: 10,
              feedback: "Correct. Yellow puts design on the Contractor but leaves unforeseeable ground with the Employer (unless the Particular Conditions changed 4.12). Silver would be different.",
            },
            {
              text: "Agree with the site director.",
              next: "b",
              score: 2,
              feedback: "That is the Silver position. Check the Particular Conditions, but under the Yellow General Conditions the Employer carries unforeseeable physical conditions.",
            },
          ],
        },
        b: {
          md: md`Your geotechnical adviser notes: boreholes were at about 250 m spacing; three eastern boreholes recorded "cemented sand, very dense" at 1.5 m that the summary table did not highlight; regional geology makes shallow calcrete common. How do you advise the Engineer?`,
          choices: [
            {
              text: "Provide the full borehole logs and the regional geology evidence: an experienced contractor reviewing the logs (not just the summary) could foresee shallow cemented layers at least in the eastern blocks, so entitlement may be partial. Also ask whether the Contractor's pile test programme before tender or at mobilisation should have revealed it.",
              next: "c",
              score: 10,
              feedback: "Good: foreseeability is judged against all the data available, including logs. A partial entitlement (e.g. for areas between boreholes with no indication) is a likely fair outcome.",
            },
            {
              text: "Tell the Engineer to reject the claim entirely because calcrete is common in Kuwait.",
              next: "c",
              score: 4,
              feedback: "General knowledge helps, but the summary table told bidders calcrete was at 2.5–3.0 m. The Engineer must weigh both; full rejection risks reversal by the DAAB.",
            },
          ],
        },
        c: {
          md: md`The Engineer determines entitlement for the central blocks (about 22,000 piles) but not the eastern blocks. On time, the Contractor's TIA shows 42 days; your planner finds that pre-drilling rigs could have been mobilised within 10 days and that module deliveries were themselves 15 days late (Contractor risk). What is the sensible EOT approach?`,
          choices: [
            {
              text: "Run a TIA on the updated programme with only the entitled piles and a reasonable mitigation (rigs in 10 days), then check concurrency with the late modules: grant the resulting EOT; deny prolongation for any concurrent period.",
              next: "d",
              score: 10,
              feedback: "This applies causation, mitigation and the SCL concurrency approach together, which is what a DAAB will expect.",
            },
            {
              text: "Grant the 42 days to avoid a dispute.",
              next: "d",
              score: 3,
              feedback: "Over-grants time and money: the entitlement covers only part of the piles, and both mitigation and concurrent delay reduce it.",
            },
            {
              text: "Grant nothing on time because modules were late anyway.",
              next: "d",
              score: 3,
              feedback: "Late modules may make some days concurrent, but they do not erase an Employer-risk delay. Denying all time risks setting time at large.",
            },
          ],
        },
        d: {
          md: md`The Contractor gives a Notice of Dissatisfaction and refers the dispute to the DAAB. Meanwhile it threatens to slow piling. What do you do?`,
          choices: [
            {
              text: "Ask the DAAB (both Parties) for informal assistance on the pre-drilling method and price while the formal reference proceeds; remind the Contractor in writing that it must proceed with the Works (Clause 21 does not suspend obligations); keep detailed records of production rates.",
              score: 10,
              feedback: "Uses the DAAB as intended (avoidance as well as adjudication) and protects MEWRE's position on progress.",
            },
            {
              text: "Threaten to call the performance security if piling slows.",
              score: 2,
              feedback: "A bond call needs an entitlement; threats escalate the dispute and may be unjustified.",
            },
          ],
        },
      },
    },
  ],
};

export default lesson;
