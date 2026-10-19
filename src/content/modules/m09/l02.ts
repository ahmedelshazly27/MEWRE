import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m09-l02",
  title: "Key FIDIC 2017 clauses a PM must know",
  summary:
    "A clause-by-clause tour of the FIDIC 2017 Red/Yellow/Silver mechanisms that run a project day to day: notices, the Engineer's 3.7 determinations, unforeseeable physical conditions, programme and EOT, delay damages, testing and taking over, defects, variations and change in law, payment, termination, care of the Works, exceptional events, claims time-bars and the DAAB.",
  minutes: 90,
  objectives: [
    "You can find and apply the FIDIC 2017 sub-clause that governs a given site event (ground conditions, late drawings, change in law, sandstorm, suspension).",
    "You can run the claims clock: 28-day Notice of Claim, 84-day fully detailed Claim, 42+42-day agreement/determination, 28-day Notice of Dissatisfaction, DAAB decision in 84 days.",
    "You can compute an Interim Payment Certificate with retention and advance payment recovery.",
    "You can explain the testing and handover sequence: Tests on Completion, Taking-Over, Defects Notification Period, Tests after Completion, Performance Certificate.",
    "You can state how Red, Yellow and Silver differ on the clauses that move money and time.",
  ],
  concepts: [
    {
      id: "m09.engineer-determination",
      name: "Agreement or determination (Sub-Clause 3.7)",
      description:
        "The Engineer's two-step procedure for claims and other matters: consult to reach agreement (42 days), then make a fair determination (42 days); binding unless a Notice of Dissatisfaction is given within 28 days.",
      competency: "contracts",
      related: ["m09.claims-time-bar", "m13.claims-settlement"],
    },
    {
      id: "m09.claims-time-bar",
      name: "Claims procedure and time-bars (Clause 20)",
      description:
        "Notice of Claim within 28 days of awareness or entitlement is lost; fully detailed Claim within 84 days including the contractual or legal basis, or the Notice lapses; continuing claims updated monthly. Applies to Employer's and Contractor's claims alike.",
      competency: "contracts",
      related: ["m09.engineer-determination", "m13.contract-notice"],
    },
    {
      id: "m09.unforeseeable-conditions",
      name: "Unforeseeable physical conditions (Sub-Clause 4.12)",
      description:
        "Under Red/Yellow, physical conditions not reasonably foreseeable by an experienced contractor at the Base Date entitle the Contractor to EOT and Cost; under Silver, unforeseeable difficulties are the Contractor's risk.",
      competency: "contracts",
      related: ["m07.geotech-investigation"],
    },
    {
      id: "m09.programme-eot",
      name: "Programme, advance warning and EOT (Clause 8)",
      description:
        "Commencement (8.1), the 8.3 programme as the baseline for delay assessment, advance warning (8.4), EOT grounds (8.5), delay damages (8.8) and suspension (8.9–8.13).",
      competency: "contracts",
      related: ["m09.claims-time-bar", "m08.time-impact-analysis"],
    },
    {
      id: "m09.payment-ipc",
      name: "Contract price and payment (Clause 14)",
      description:
        "Advance payment and its recovery, monthly Statements, Interim Payment Certificates within 28 days, payment within 56 days, retention and its release, Statement at Completion and Final Statement.",
      competency: "contracts",
      related: ["m10.payment-mechanics"],
    },
    {
      id: "m09.taking-over-defects",
      name: "Testing, taking over and defects (Clauses 9–12)",
      description:
        "Tests on Completion, Taking-Over Certificate (risk and care pass to the Employer, delay damages stop), Defects Notification Period, Tests after Completion (Yellow/Silver) and the Performance Certificate as the only acceptance of the Works.",
      competency: "contracts",
      related: ["m07.taking-over", "m07.dnp"],
    },
    {
      id: "m09.exceptional-events",
      name: "Exceptional Events (Clause 18)",
      description:
        "FIDIC 2017's replacement for force majeure: events beyond a Party's control that it could not reasonably have provided against or avoided; notice within 14 days; EOT always, Cost only for listed man-made events in the Country; optional termination after 84 continuous or 140 cumulative days.",
      competency: "contracts",
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "How the 2017 books work, clause by clause",
      blocks: [
        {
          kind: "md",
          md: md`The 2017 FIDIC books are longer than the 1999 editions (roughly 50% more words) and far more **procedural**: they set time limits for almost every step and apply them to both Parties. The intent is to surface problems early and stop claims piling up until the end. For the PM this means the contract is managed through **Notices** and **registers**, not conversations.

**Sub-Clause 1.3 (Notices and other communications).** A Notice must be in writing, identified as a Notice, and refer to the Sub-Clause under which it is given. An email saying "we are being delayed by the sandstorm" is probably not a Notice of Claim. A letter headed "Notice of Claim under Sub-Clause 20.2.1" is.

**Base Date.** The date 28 days before the latest date for submission of the Tender. Foreseeability (4.12), change in law (13.6) and many price risks are tested against it.

Clause numbers below are for the **Red** and **Yellow** Books 2017 unless stated; the **Silver** Book uses the same numbering for most clauses but with the Employer (through the Employer's Representative) in place of the Engineer, and with different risk allocation where noted.`,
        },
        {
          kind: "md",
          md: md`### Clause 1: two sub-clauses that start many claims

- **1.9 (Red: Delayed Drawings or Instructions).** If the Contractor gives Notice that it needs a drawing or instruction by a reasonable date and the Engineer fails to provide it, the Contractor is entitled to EOT and Cost Plus Profit (through the Clause 20 procedure). In **Yellow**, 1.9 deals instead with **Errors in the Employer's Requirements**: if an error is found that an experienced contractor exercising due care would not have discovered when scrutinising the Requirements before tender, the Contractor gets EOT and Cost Plus Profit. **Silver** puts nearly all of that risk on the Contractor (Sub-Clause 5.1 makes the Employer responsible only for a short list of data, such as portions stated to be immutable and criteria for testing and performance).
- **1.13 (Compliance with Laws).** The Employer obtains the permits it is responsible for (typically planning and the permanent-works permissions listed in the Specification or Employer's Requirements); the Contractor gives notices, pays fees and obtains the permits needed to execute the Works. In Kuwait, permits held by other state bodies (land allocation, environmental clearance, municipality) are frequent critical-path items: the contract must say who obtains each one.

### Clause 3: the Engineer and Sub-Clause 3.7

The Engineer instructs, certifies and receives notices. Its single most important power is **3.7 Agreement or Determination**:

| Step | Time limit (2017 default) |
|---|---|
| Engineer consults both Parties to try to reach agreement | 42 days from the trigger (e.g. receipt of a fully detailed Claim) |
| If no agreement, Engineer gives Notice of a fair **determination** | within 42 days after the end of the agreement period |
| Either Party may give a **Notice of Dissatisfaction (NOD)** | within 28 days after receiving the determination |
| No NOD in time | determination becomes **final and binding** |
| Engineer fails to determine in time | claim is deemed rejected; the claiming Party may go to the DAAB |
| Party with an NOD refers the dispute to the DAAB | within 42 days of the NOD, or the NOD lapses |

In carrying out 3.7 the Engineer "shall not be deemed to act for the Employer". On the Silver Book the equivalent is 3.5, with the Employer's Representative deciding.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why the 2017 books bind both sides to the clock",
          md: md`Under the 1999 books only the Contractor faced a time-bar. The 2017 books make **Employer's claims** (including delay damages and extension of the Defects Notification Period) go through the same 28-day Notice and 84-day detailed claim procedure. An Employer that deducts delay damages from an IPC without giving a Notice of Claim can lose the deduction. MEWRE staff used to "just deducting" need to learn this.`,
        },
        {
          kind: "md",
          md: md`### Sub-Clause 4.12: Unforeseeable Physical Conditions (Red/Yellow)

"Physical conditions" means natural physical conditions and man-made or other physical obstructions and pollutants found on site during execution, **including sub-surface and hydrological conditions** but excluding climatic conditions. "Unforeseeable" means not reasonably foreseeable by an experienced contractor by the Base Date.

Procedure: the Contractor gives a Notice as soon as practicable describing the conditions; continues working using proper measures; complies with any Engineer instructions; and, if it suffers delay or Cost, claims under 20.2. The Engineer may also consider whether other parts of the Works encountered **more favourable** conditions than could reasonably have been foreseen and take that into account, but this cannot produce a net reduction in the Contract Price.

The Contractor is deemed to have inspected the site and the information available (4.10 Use of Site Data). Ground data the Employer provides at tender therefore matters twice: it sets what was "foreseeable", and the Employer is responsible for its accuracy in Red/Yellow (but not, beyond the limited list, in Silver).

On **Silver**, 4.12 is **Unforeseeable Difficulties**: the Contractor accepts total responsibility for having foreseen all difficulties and costs, and the Contract Price is not adjusted.`,
        },
        {
          kind: "md",
          md: md`### Clause 8: Commencement, Delays and Suspension

| Sub-Clause | What it does | Key numbers |
|---|---|---|
| **8.1 Commencement** | Engineer gives Notice of the Commencement Date | Notice not less than 14 days before; Commencement within 42 days after the Letter of Acceptance unless the Particular Conditions say otherwise |
| **8.2 Time for Completion** | Complete the Works (and Sections), including passing Tests on Completion | From the Contract Data |
| **8.3 Programme** | Initial programme, then revised programmes whenever the current one ceases to reflect progress | Initial within 28 days of the 8.1 Notice; Engineer may give Notice of non-compliance within 21 days. The 2017 text requires logic, critical path, float and review periods to be shown |
| **8.4 Advance Warning** | Each Party must warn the other (and the Engineer) of known or probable future events that may delay the Works, increase the Price or adversely affect the work | No time-bar in itself, but failure to warn can reduce an entitlement |
| **8.5 Extension of Time** | EOT if completion is or will be delayed by: (a) a Variation; (b) a cause giving entitlement under another Sub-Clause; (c) exceptionally adverse climatic conditions; (d) Unforeseeable shortages of personnel or Goods caused by epidemic or governmental actions; (e) delay attributable to the Employer, its Personnel or other contractors | Concurrent delay assessed by the rules in the Special Provisions (if none, "as appropriate taking due regard of all relevant circumstances"). **Silver omits (c) and (d).** |
| **8.6 Delays caused by Authorities** | Delay by public authorities that an experienced contractor could not foresee, where the Contractor followed their procedures diligently | EOT (time only) |
| **8.7 Rate of Progress** | Engineer may instruct a revised programme/methods to catch up a Contractor-caused delay | Contractor bears the cost, and still pays delay damages |
| **8.8 Delay Damages** | Contractor pays the daily rate in the Contract Data for each day beyond the Time for Completion (as extended) until the Taking-Over date | Capped at the maximum in the Contract Data; sole remedy for delay (except termination); cap does not apply to fraud, gross negligence, deliberate default or reckless misconduct |
| **8.9–8.13 Suspension** | Engineer may instruct suspension; Contractor protects the Works; EOT and Cost unless suspension was the Contractor's fault; prolonged suspension beyond 84 days lets the Contractor request permission to proceed and eventually treat it as an omission or terminate | 84 days; 28 days for the Engineer to respond |

The "exceptionally adverse climatic conditions" ground in 8.5 is defined by reference to climatic data the Employer made available and data published in the Country for the site's location. **Seasonal shamal sandstorms are foreseeable in Kuwait**: only conditions exceptional relative to that data qualify, and climatic conditions give **time, not money**.`,
        },
        {
          kind: "md",
          md: md`### Clauses 9–12: from testing to final acceptance

| Stage | Clause | What happens | Why it matters to the PM |
|---|---|---|---|
| **Tests on Completion** | 9 | Contractor submits a test programme, gives notice of readiness and carries out tests (for PV: mechanical completion, cold and hot commissioning, IEC 62446-1 inspections, grid code compliance, reliability run, capacity test) | Failure (9.4) lets the Employer order retests, reject the Works, or take over with a reduced price |
| **Taking-Over** | 10 | Contractor applies by Notice not earlier than 14 days before completion; Engineer issues the Taking-Over Certificate (TOC) or rejects with reasons within 28 days. Failure to respond, where the Works substantially comply, results in deemed taking over. Use of part of the Works by the Employer can amount to taking over of that part (10.2) | At TOC: **delay damages stop**, **care of the Works passes to the Employer** (17.1), first half of retention is released, Defects Notification Period starts |
| **Defects Notification Period (DNP)** | 11 | Contractor completes outstanding work and remedies notified defects; DNP can be extended for defects that prevent use, by no more than 2 years beyond the original DNP (11.3) | Typical DNP 12–24 months; PV and BESS EPCs often 24 months with longer equipment warranties assigned to the Employer |
| **Tests after Completion** | 12 (Yellow/Silver) | Performance tests after taking over (PR test, availability run, guaranteed capacity at reference conditions) | Where the contract states non-performance damages, the Contractor pays them for a failed test; the IPP EPC usually ties these to the performance LDs (lesson 4). In the **Red** Book, Clause 12 is instead Measurement and Valuation |
| **Performance Certificate** | 11.9 | Issued within 28 days after the latest DNP expiry once all defects remedied | **Only the Performance Certificate is deemed to constitute acceptance of the Works.** Second half of retention released; performance security returned |

### Clause 13: Variations and Adjustments

- **13.1 Right to Vary.** The Engineer may initiate a Variation at any time before the Performance Certificate. The Contractor is bound unless it promptly gives a Notice with reasons (for example the varied work was Unforeseeable in scope and nature, it cannot readily obtain the Goods, or it adversely affects health and safety; in Yellow/Silver also that it would adversely affect the performance guarantees). A Variation cannot omit work so that the Employer or others can do it, unless agreed.
- **13.2 Value Engineering.** Contractor proposals that accelerate completion, reduce cost or improve value; if approved, the Engineer agrees or determines the valuation, including any sharing of the benefit, costs or delay that the Particular Conditions provide for.
- **13.3 Variation Procedure.** By instruction (13.3.1: Contractor submits particulars including a proposed EOT and valuation; Engineer agrees or determines under 3.7) or by request for proposal (13.3.2). The 2017 books assess the time effect of a Variation without needing a Notice of Claim.
- **13.6 Adjustments for Changes in Laws.** The Contract Price is adjusted for any increase or decrease in Cost from a change in the Laws of the Country (including new laws, repeal or modification, and changes in judicial or official governmental interpretation), or in permits, made after the Base Date. The Contractor claims EOT and/or Cost through 20.2; the Employer is entitled to a reduction if Cost falls.
- **13.7 Adjustments for Changes in Cost.** Indexation formula, only if a schedule of cost indexation is included.

### Clause 14: Contract Price and Payment`,
        },
        { kind: "equation", formula: "m09-advance-recovery" },
        { kind: "equation", formula: "m09-retention-deduction" },
        { kind: "equation", formula: "m09-ipc-net" },
        {
          kind: "md",
          md: md`Key payment mechanics (2017 defaults; the Contract Data can change them):

- **14.2 Advance Payment** against an Advance Payment Guarantee (and after the Performance Security is delivered). Recovered by deductions starting in the IPC in which certified payments exceed **10% of the Accepted Contract Amount less Provisional Sums**, at the amortisation rate in the Contract Data (**25%** if not stated) of each IPC. Any unrecovered balance at Taking-Over or termination becomes immediately due.
- **14.3 Application for IPCs.** Monthly Statement with supporting documents (progress report, measurements, evidence of payments to nominated subcontractors).
- **14.6 Issue of IPC.** Engineer issues within **28 days** of receiving the Statement. The Engineer may withhold amounts for work not in accordance with the Contract, but cannot withhold the whole IPC except where the 2017 text allows (for example, no Performance Security).
- **14.7 Payment.** Employer pays each IPC within **56 days** of the Engineer receiving the Statement; final payment within 56 days after receiving the Final Payment Certificate.
- **14.8 Delayed Payment.** Financing charges on late payments, at the rate in the Contract Data.
- **14.9 Release of Retention.** First half at the Taking-Over Certificate for the Works (proportionally for Sections); second half after the latest DNP expires. The 2017 books allow a **Retention Money Guarantee** to replace cash retention if the Particular Conditions provide for it.
- **14.10–14.13** Statement at Completion (within 84 days of TOC), Final Statement (after the Performance Certificate), discharge, and Final Payment Certificate.`,
        },
        { kind: "widget", widget: "cashflow-scurve", props: { contractValue: 400 }, caption: "See how the milestone schedule, 10% advance, its recovery and retention shape the Contractor's cash position and the Employer's payments." },
        {
          kind: "md",
          md: md`### Clauses 15 and 16: Termination

| | By the Employer (15) | By the Contractor (16) |
|---|---|---|
| Warning step | **15.1 Notice to Correct**: specify the failure and a reasonable time to remedy | **16.1 Suspension**: after not less than 21 days' Notice for non-certification, non-payment, or failure to show financial arrangements (2.4) |
| Default termination | **15.2**: Notice of intention to terminate (14 days) for listed defaults such as failure to comply with a Notice to Correct, abandonment, failure to proceed under Clause 8, subcontracting the whole Works, failure to comply with a binding DAAB decision; immediate termination for insolvency or corrupt practice | **16.2**: for listed Employer defaults, e.g. not paying within 42 days after the 14.7 period, prolonged suspension, failure to comply with a DAAB decision |
| Money after termination | Employer may complete with others and recover the extra cost of completion, delay damages and other losses (15.3–15.4); may call the Performance Security | Contractor receives value of work done, plant, demobilisation and **loss of profit** (16.4) |
| Convenience | **15.5**: Employer may terminate for convenience, but not in order to execute the Works itself or give them to another contractor; Contractor receives the 15.6 valuation including loss of profit | – |

### Clause 17: Care of the Works and Indemnities

The Contractor has full responsibility for the care of the Works from the Commencement Date until the Taking-Over Certificate (17.1); responsibility then passes to the Employer for the parts taken over. The Contractor must make good loss or damage at its own risk **except** for loss caused by the listed Employer risks (17.2), which include interference with rights of way and the Employer's use of the Works, design by the Employer, **forces of nature that are Unforeseeable or against which an experienced contractor could not reasonably have taken adequate precautions**, Exceptional Events, and acts of the Employer. Each Party indemnifies the other for specified third-party claims (17.4, 17.5), with shared indemnity where both contributed (17.6).

### Clause 18: Exceptional Events

An **Exceptional Event** is an event or circumstance (i) beyond a Party's control, (ii) which it could not reasonably have provided against before entering the Contract, (iii) which, having arisen, it could not reasonably have avoided or overcome, and (iv) which is not substantially attributable to the other Party. The non-exhaustive list includes war, terrorism, riot by persons other than the Contractor's Personnel, strikes not solely involving the Contractor's workforce, munitions and radiation, and natural catastrophes such as earthquake, tsunami, volcanic activity, hurricane or typhoon.

- Notice within **14 days** of becoming aware (18.2); duty to minimise delay (18.3).
- Consequence (18.4): **EOT always**; **Cost** only for the man-made events of the kind listed in (a) to (e) and, for most of those, only if they occur in the Country. Natural catastrophes give time only.
- Optional termination (18.5) if the Works are prevented for **84 continuous days** or for multiple periods totalling more than **140 days** due to the same event.

### Clause 20: Claims`,
        },
        { kind: "equation", formula: "m09-claim-deadlines" },
        {
          kind: "md",
          md: md`| Step | Sub-Clause | Time limit | Consequence of missing it |
|---|---|---|---|
| Notice of Claim describing the event | 20.2.1 | **28 days** after the claiming Party became aware (or should have become aware) | **Not entitled** to the time/money claimed; the other Party is discharged. The Engineer gives a Notice within 14 days if it considers the Notice late; the claimant can argue late submission is justified, which the Engineer/DAAB may accept |
| Engineer's initial response | 20.2.2 | 14 days | If none, the Notice of Claim is deemed valid (but can still be disputed) |
| Keep contemporary records | 20.2.3 | Throughout | Engineer may inspect and instruct further records; weak records weaken the claim |
| **Fully detailed Claim**: description, **contractual and/or legal basis**, contemporary records, quantified time and money | 20.2.4 | **84 days** after awareness, or as agreed | If the statement of contractual or legal basis is not submitted in time, the Notice of Claim **lapses** |
| Agreement or determination | 20.2.5 → 3.7 | 42 + 42 days | Then NOD within 28 days, DAAB |
| Continuing effect | 20.2.6 | First fully detailed Claim treated as interim; further interim claims **monthly**; final claim within 28 days after the effects end | – |

### Clause 21: DAAB and arbitration

The 2017 books create a **standing Dispute Avoidance/Adjudication Board**, appointed jointly at the start (by the date in the Contract Data; 28 days after the Letter of Acceptance by default), visiting site regularly and available for **informal assistance** (21.3) before positions harden. Formal route: refer the dispute within 42 days of an NOD on a 3.7 determination → DAAB decision within **84 days** → decision **binding** immediately (comply even if you disagree) → NOD on the decision within **28 days**, or it becomes final and binding → amicable settlement attempt → arbitration may start on or after the **28th day** after the NOD (21.5–21.6; ICC Rules by default). Failure to comply with a DAAB decision can be referred directly to arbitration (21.7).`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Particular Conditions change everything",
          md: md`Employers in the region often delete the DAAB, extend the Engineer's time limits, require Employer approval before the Engineer determines, delete 4.12 on Yellow, or make the Engineer's determination subject to ministry sign-off. FIDIC's **Golden Principles** say such amendments should not change the balance of risk or the Engineer's neutrality, but the Particular Conditions prevail. **Always read Part B before quoting a General Condition.**`,
        },
        { kind: "sources", refs: ["m09-fidic-red-2017", "m09-fidic-yellow-2017", "m09-fidic-silver-2017", "m09-fidic-golden-principles"] },
      ],
    },
    {
      layer: "applied",
      title: "Running the numbers: IPCs, retention and advance recovery",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "IPCs 1–4 for a USD 400 m PV EPC",
          given: md`Accepted Contract Amount (ACA) **USD 400 m**, of which Provisional Sums **USD 20 m**. Advance payment **10% of ACA = USD 40 m**, paid against an APG. Recovery threshold 10% of (ACA − PS) = **USD 38 m**; amortisation rate **25%** of each IPC. Retention **10%** of each IPC up to a limit of **5% of ACA = USD 20 m**. Gross value certified per month (USD m): M1 = 10, M2 = 25, M3 = 30, M4 = 40.`,
          steps: [
            {
              md: md`**IPC 1:** cumulative 10 ≤ 38, so no recovery. Retention $0.10 \times 10 = 1.0$. Net $N_1 = 10 - 1.0 = 9.0$ USD m.`,
            },
            {
              md: md`**IPC 2:** cumulative 35 ≤ 38, still no recovery. Retention 2.5 (cumulative 3.5). Net $N_2 = 25 - 2.5 = 22.5$ USD m.`,
            },
            {
              md: md`**IPC 3:** cumulative 65 > 38, so recovery starts **in this IPC** at 25% of the whole IPC: $\Delta A_3 = 0.25 \times 30 = 7.5$. Retention 3.0 (cumulative 6.5). Net $N_3 = 30 - 3.0 - 7.5 = 19.5$ USD m.`,
            },
            {
              md: md`**IPC 4:** $\Delta A_4 = 0.25 \times 40 = 10.0$ (cumulative recovered 17.5). Retention 4.0 (cumulative 10.5). Net $N_4 = 40 - 4.0 - 10.0 = 26.0$ USD m.`,
            },
            {
              md: md`**Positions after IPC 4:** advance outstanding $40 - 17.5 = 22.5$ USD m (so the APG can reduce to USD 22.5 m); retention held 10.5 of the 20 limit. At 25%, the remaining USD 22.5 m needs a further $22.5 / 0.25 = 90$ USD m of certified work to recover.`,
            },
          ],
          result: md`Net payments: 9.0, 22.5, 19.5, 26.0 USD m. Note the cash dip in IPC 3 when recovery starts: contractors plan for it; Employers should expect queries about it.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "IPCs 5–6: hitting both caps",
          given: md`Same contract. After IPC 4: advance recovered **17.5**, retention held **10.5** (USD m). Gross value certified: M5 = **50**, M6 = **60** USD m.`,
          steps: [
            {
              md: md`**IPC 5:** recovery $0.25 \times 50 = 12.5$ (cumulative 30.0); retention $0.10 \times 50 = 5.0$ (cumulative 15.5).`,
            },
            {
              md: md`Net $N_5 = 50 - 5.0 - 12.5 = 32.5$ USD m.`,
              hidden: true,
              check: { prompt: "Net amount of IPC 5", answer: 32.5, unit: "USD m", tolerance: { abs: 0.05 } },
            },
            {
              md: md`**IPC 6:** 25% would be 15.0, but only $40 - 30 = 10.0$ remains, so $\Delta A_6 = 10.0$ (advance fully recovered). Retention 10% would be 6.0, but only $20 - 15.5 = 4.5$ remains to the limit, so $\Delta R_6 = 4.5$.`,
            },
            {
              md: md`Net $N_6 = 60 - 4.5 - 10.0 = 45.5$ USD m.`,
              hidden: true,
              check: { prompt: "Net amount of IPC 6", answer: 45.5, unit: "USD m", tolerance: { abs: 0.05 } },
            },
          ],
          result: md`From IPC 7 onward, with both caps reached, the Contractor receives the full gross value (subject to other adjustments). At Taking-Over, USD 10 m (half the retention) is released; the other USD 10 m after the DNP. The APG can be released once IPC 6 is certified.`,
        },
        {
          kind: "question",
          question: {
            id: "m09-l02-p1",
            type: "numeric",
            prompt: md`On another contract, an IPC certifies gross work of **USD 48 m**. Recovery has started, the amortisation rate is 25%, and **USD 4 m** of advance remains outstanding. Retention is 10% per IPC; **USD 19 m** has been retained against a limit of **USD 20 m**. What is the net amount of the IPC, in USD m (ignore other adjustments)?`,
            answer: 43,
            unit: "USD m",
            tolerance: { abs: 0.05 },
            explanation: md`Recovery = $\min(0.25 \times 48,\ 4) = \min(12, 4) = 4$. Retention = $\min(0.10 \times 48,\ 20 - 19) = \min(4.8, 1) = 1$. Net = $48 - 4 - 1 = 43$ USD m. Both deductions are capped by the remaining balance, a common error in Employer-prepared IPC checks.`,
            concepts: ["m09.payment-ipc"],
            difficulty: 2,
          },
        },
        {
          kind: "md",
          md: md`### The claims clock in dates

The Contractor's site manager records on **3 March 2027** that piling rigs are refusing on an unexpected boulder layer. Running the 2017 defaults:

| Step | Date |
|---|---|
| Awareness | 3 March 2027 |
| Notice of Claim due (28 days) | **31 March 2027** |
| Engineer's Notice if it considers the claim late (14 days after receiving the Notice) | 14 days after receipt |
| Fully detailed Claim due (84 days) | **26 May 2027** |
| Engineer's agreement period (42 days from receipt of the fully detailed Claim) | about 7 July 2027 if submitted on 26 May |
| Determination (further 42 days) | about 18 August 2027 |
| NOD (28 days after determination) | about 15 September 2027 |

Put every one of these dates in the **notices and claims register** the day the Notice arrives.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Administering FIDIC from the Employer's side",
      blocks: [
        {
          kind: "md",
          md: md`**Who does what.** On a MEWRE-procured contract, the Engineer (usually the Owner's Engineer consultant) runs the 3.7 process, certifies IPCs and reviews programmes; MEWRE's PM manages the Employer's obligations (site access, permits, Employer-supplied items, grid interface, timely payment) and the Employer's own claims. Contract-management software (Aconex, Oracle Primavera Unifier, or a well-controlled SharePoint register) holds the correspondence, with a **notices register** recording every Notice, the sub-clause, the date received and the response deadline.

**Records win claims.** Daily site diaries, weather station logs (wind speed, visibility, PM10), resource histograms, photographs with timestamps, and the updated 8.3 programme are what the DAAB will look at. The Employer needs its own records; relying on the Contractor's is a mistake.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong on the Employer's side",
          md: md`- No reply to an 8.3 programme within 21 days, so the Contractor's programme (with its optimistic Employer dates) becomes the baseline by default.
- Engineer's 3.7 determinations delayed for ministry approvals, so claims are deemed rejected and go straight to the DAAB.
- Delay damages deducted from IPCs without an Employer's Notice of Claim under 20.2.
- Employer "uses" an energised block for grid testing before Taking-Over, triggering a taking over of that part (10.2) and passing care and risk.
- DAAB never constituted because nobody budgeted for it; disputes then go straight to arbitration under 21.8.
- Particular Conditions lengthen the Engineer's periods but leave the Contractor's 28-day time-bar, which a tribunal may view as unbalanced.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Kuwait law and FIDIC time-bars",
          md: md`Whether Kuwaiti courts or tribunals strictly enforce contractual time-bars such as the 28-day Notice of Claim, and how Kuwaiti civil-law principles of good faith interact with them, is not established in our research. Treat time-bars as enforceable when managing your own notices, and take legal advice (MEWRE legal department, Fatwa and Legislation Department) before relying on a time-bar to reject a claim.`,
        },
        {
          kind: "checklist",
          title: "PM checklist: weekly contract administration",
          items: [
            "Notices register updated; every incoming Notice has an owner and a response deadline.",
            "Employer's own claims (delay damages, defects, DNP extension) notified under 20.2 within 28 days.",
            "Latest 8.3 programme reviewed within 21 days; Notice of non-compliance given if it does not meet the specification.",
            "Advance warnings (8.4) raised for Employer-side risks: permits, grid backfeed date, Employer-supplied items.",
            "IPC checks: measured progress, retention cap, advance recovery threshold and balance, withheld items justified.",
            "Payment due dates (56 days) tracked so MEWRE does not trigger 16.1 suspension rights or financing charges.",
            "DAAB site visits scheduled; issues raised informally under 21.3 before they become disputes.",
            "Taking-over applications and Tests on Completion notices tracked against the 14- and 28-day periods.",
          ],
        },
        {
          kind: "ask",
          title: "Ask the contractor",
          items: [
            "Which events are you currently tracking as potential claims, and when did you first become aware of each?",
            "What contemporary records are you keeping for the sandstorm and ground-conditions events, and can the Engineer inspect them weekly?",
            "Does your revised programme show the critical path and float through Tests on Completion and grid energisation?",
            "Which Employer obligations in the next 90 days are on your critical path?",
            "For your last IPC, how did you compute the advance recovery and retention, and do they match the Contract Data?",
          ],
        },
        { kind: "scenario", scenario: "m09-s2" },
        {
          kind: "feynman",
          prompt:
            "Explain to a new MEWRE engineer how a FIDIC 2017 claim travels from the first site event to a binding outcome, with each time limit.",
          keyPoints: [
            "Notice of Claim within 28 days of awareness or the claim is lost (subject to late-submission review).",
            "Contemporary records kept throughout; fully detailed Claim with legal basis within 84 days or the Notice lapses.",
            "Engineer consults for agreement (42 days) then determines (42 days) neutrally under 3.7.",
            "Notice of Dissatisfaction within 28 days or the determination is final and binding.",
            "DAAB decision within 84 days, binding immediately; NOD within 28 days; then amicable settlement and arbitration.",
            "The same rules apply to the Employer's claims, including delay damages.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m09-l02-q1",
      type: "order",
      prompt: md`Put the FIDIC 2017 claim steps in order.`,
      items: [
        "Notice of Claim within 28 days of awareness",
        "Fully detailed Claim within 84 days of awareness",
        "Engineer consults to reach agreement (42 days)",
        "Engineer's determination (further 42 days)",
        "Notice of Dissatisfaction within 28 days",
        "Reference to the DAAB and decision within 84 days",
        "Arbitration after an NOD on the DAAB decision",
      ],
      explanation: md`20.2.1 → 20.2.4 → 3.7 consultation → 3.7 determination → NOD (3.7.5) → DAAB (21.4) → NOD on the decision, amicable settlement period and arbitration (21.5–21.6). Each step has a time limit; missing the first or the NOD steps is usually fatal.`,
      concepts: ["m09.claims-time-bar", "m09.engineer-determination"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m09-l02-q2",
      type: "mcq",
      prompt: md`Under the 2017 Red Book, an exceptional shamal storm (well beyond the published climatic data) stops piling for 9 days. What is the Contractor's most likely entitlement?`,
      options: [
        "EOT and Cost under Sub-Clause 4.12",
        "EOT only, under Sub-Clause 8.5(c), if completion is delayed and the Notice of Claim is in time",
        "EOT and Cost Plus Profit under Sub-Clause 1.9",
        "Nothing: weather is always the Contractor's risk",
      ],
      answer: 1,
      explanation: md`4.12 expressly excludes climatic conditions. Exceptionally adverse climatic conditions (Unforeseeable against the Employer's and published data) give an EOT under 8.5(c), not Cost. The delay must affect completion (critical path), and the 20.2 procedure applies. Under Silver, this ground does not exist.`,
      concepts: ["m09.programme-eot", "m09.unforeseeable-conditions"],
      difficulty: 2,
    },
    {
      id: "m09-l02-q3",
      type: "multi",
      prompt: md`Which of the following happen at the issue of the Taking-Over Certificate for the Works under FIDIC 2017? Select all that apply.`,
      options: [
        "Delay damages stop accruing",
        "Responsibility for care of the Works passes to the Employer",
        "The first half of the Retention Money becomes due for release",
        "The Defects Notification Period begins",
        "The Works are deemed accepted, ending the Contractor's liability for defects",
      ],
      answer: [0, 1, 2, 3],
      explanation: md`Taking over stops delay damages (8.8), transfers care (17.1), releases half the retention (14.9) and starts the DNP (11). Only the **Performance Certificate** constitutes acceptance of the Works (11.9).`,
      concepts: ["m09.taking-over-defects"],
      difficulty: 1,
    },
    {
      id: "m09-l02-q4",
      type: "numeric",
      prompt: md`ACA = USD 250 m, Provisional Sums = USD 10 m. At what cumulative value of certified interim payments (USD m) does advance-payment recovery start under the FIDIC 2017 default?`,
      answer: 24,
      unit: "USD m",
      tolerance: { abs: 0.05 },
      explanation: md`Threshold = 10% × (ACA − PS) = $0.10 \times (250 - 10) = 24$ USD m. Deductions start in the IPC in which certified payments exceed this amount, at the amortisation rate (25% default) of each IPC.`,
      concepts: ["m09.payment-ipc"],
      difficulty: 1,
    },
    {
      id: "m09-l02-q5",
      type: "decision",
      prompt: md`You are the MEWRE PM on a Red Book substation contract. The Engineer has drafted a 3.7 determination awarding the Contractor 25 days' EOT for late access to the existing 400 kV bay. Your director wants you to tell the Engineer to cut it to 10 days.`,
      options: [
        {
          text: "Explain to the director that the Engineer must determine neutrally; offer instead to submit MEWRE's evidence (outage permits, access records) to the Engineer during consultation, and use an NOD if MEWRE disagrees with the outcome.",
          score: 1,
          feedback: "Correct. Influence the determination with evidence during the consultation phase; challenge the result through the NOD and DAAB, not by instruction.",
        },
        {
          text: "Instruct the Engineer to issue 10 days: MEWRE pays the Engineer's fees.",
          score: 0,
          feedback: "This breaches 3.7 neutrality. The DAAB would likely restore the EOT and question every other determination.",
        },
        {
          text: "Do nothing and let the 25 days stand without reviewing it.",
          score: 0.3,
          feedback: "Neutral but passive. MEWRE should check the analysis and provide its records during consultation.",
        },
      ],
      explanation: md`The Engineer acts for neither Party under 3.7. The Employer's legitimate tools are evidence during consultation and the Notice of Dissatisfaction afterwards.`,
      concepts: ["m09.engineer-determination"],
      difficulty: 2,
    },
    {
      id: "m09-l02-q6",
      type: "mcq",
      prompt: md`Which events entitle the Contractor to **Cost** (not only time) under Clause 18 of FIDIC 2017?`,
      options: [
        "Any Exceptional Event, wherever it occurs",
        "Natural catastrophes such as earthquakes, but not man-made events",
        "The man-made events listed in 18.1(a) to (e), most of them only if they occur in the Country",
        "None: Clause 18 gives time only",
      ],
      answer: 2,
      explanation: md`18.4 gives EOT for any Exceptional Event, and Cost only for war-type, riot, strike, munitions and similar listed events, with (b) to (e) limited to events in the Country. Natural catastrophes give time only.`,
      concepts: ["m09.exceptional-events"],
      difficulty: 2,
    },
    {
      id: "m09-l02-q7",
      type: "short",
      prompt: md`A Contractor on a Yellow Book PV contract discovers that the Employer's Requirements specify a 33 kV cable rating that cannot carry the stated plant output at 50 °C soil conditions. Which sub-clause applies, and what decides whether it gets EOT and Cost Plus Profit?`,
      rubric: [
        "Yellow Sub-Clause 1.9 Errors in the Employer's Requirements (with 5.1 design obligations).",
        "Test: would an experienced contractor exercising due care have discovered the error when scrutinising the Requirements before tender?",
        "If not discoverable, EOT and Cost Plus Profit through the Clause 20 procedure.",
        "Notice of Claim within 28 days of discovering it.",
      ],
      modelAnswer: md`Yellow 1.9 (Errors in the Employer's Requirements), read with 5.1. The Engineer decides under 3.7 whether there is an error and whether an experienced contractor exercising due care would have discovered it when scrutinising the Requirements at tender. If it would not, the Contractor is entitled to EOT and Cost Plus Profit, subject to giving a Notice of Claim within 28 days and following 20.2.`,
      explanation: md`In Yellow, the Employer remains responsible for errors in its Requirements that a careful tenderer could not reasonably spot. Under Silver the Contractor would usually carry this, unless the cable rating was stated as an immutable item or a performance criterion the Employer is responsible for.`,
      concepts: ["m09.claims-time-bar", "m09.unforeseeable-conditions"],
      difficulty: 3,
    },
  ],
  flashcards: [
    { id: "m09-l02-f1", front: "FIDIC 2017 Notice of Claim deadline", back: "28 days after the claiming Party became aware, or should have become aware, of the event (20.2.1).", concepts: ["m09.claims-time-bar"] },
    { id: "m09-l02-f2", front: "FIDIC 2017 fully detailed Claim deadline", back: "84 days after awareness (or as agreed); missing the contractual/legal basis makes the Notice of Claim lapse (20.2.4).", concepts: ["m09.claims-time-bar"] },
    { id: "m09-l02-f3", front: "3.7 time limits", back: "42 days to reach agreement, then 42 days to determine; NOD within 28 days or the determination is final and binding.", concepts: ["m09.engineer-determination"] },
    { id: "m09-l02-f4", front: "8.3 initial programme deadline", back: "Within 28 days after receiving the 8.1 Commencement Notice; Engineer has 21 days to give Notice of non-compliance.", concepts: ["m09.programme-eot"] },
    { id: "m09-l02-f5", front: "8.5 EOT grounds (Red/Yellow 2017)", back: "Variation; cause under another Sub-Clause; exceptionally adverse climatic conditions; Unforeseeable shortages from epidemic/government action; Employer-caused delay. Silver omits climate and shortages.", concepts: ["m09.programme-eot"] },
    { id: "m09-l02-f6", front: "Advance recovery default (14.2.3)", back: "Starts when certified IPCs exceed 10% of (ACA − Provisional Sums); 25% of each IPC until repaid.", concepts: ["m09.payment-ipc"] },
    { id: "m09-l02-f7", front: "IPC timing (14.6/14.7)", back: "Engineer certifies within 28 days of the Statement; Employer pays within 56 days of the Engineer receiving it.", concepts: ["m09.payment-ipc"] },
    { id: "m09-l02-f8", front: "Only document deemed to be acceptance of the Works", back: "The Performance Certificate (11.9), issued after the latest DNP expires.", concepts: ["m09.taking-over-defects"] },
    { id: "m09-l02-f9", front: "DAAB decision timing", back: "Within 84 days of the reference; binding at once; NOD within 28 days or final and binding.", concepts: ["m09.engineer-determination"] },
    { id: "m09-l02-f10", front: "Exceptional Event notice and termination thresholds", back: "Notice within 14 days; optional termination if prevented 84 continuous days or more than 140 days in total.", concepts: ["m09.exceptional-events"] },
    { id: "m09-l02-f11", front: "Base Date", back: "28 days before the latest date for submission of the Tender; reference for foreseeability and change in law.", concepts: ["m09.unforeseeable-conditions"] },
    { id: "m09-l02-f12", front: "13.6 Changes in Laws", back: "Price adjusted (up or down) for changes in the Laws of the Country, their official interpretation or permits after the Base Date; Contractor claims EOT/Cost under 20.2.", concepts: ["m09.claims-time-bar"] },
  ],
  scenarios: [
    {
      id: "m09-s2",
      title: "Notice of claim for sandstorm delays",
      dayInLife: true,
      context: md`You are the MEWRE PM on a MEWRE-procured 33/132 kV collector substation and BOP contract at Shagaya on **FIDIC 2017 Yellow** (Particular Conditions keep 8.5 unchanged). On 12 July a letter arrives from the Contractor headed "Notice of Claim under Sub-Clause 20.2.1": it claims 11 days of EOT and USD 1.3 m Cost for "severe sandstorms between 10 June and 2 July that prevented crane lifts and contaminated GIS installation areas". The Engineer is an international consultancy; you represent the Employer.`,
      start: "a",
      concepts: ["m09.claims-time-bar", "m09.programme-eot", "m09.engineer-determination"],
      nodes: {
        a: {
          md: md`Your director asks: "Is this claim even valid? It is mid-July and the storms started on 10 June." What is your first step?`,
          choices: [
            {
              text: "Check with the Engineer when the Contractor became aware of each delay event, and whether the 28-day period is met for each storm day (continuing events).",
              next: "b",
              score: 10,
              feedback: "Right. The 28 days run from awareness of each event; for storms on 10–14 June the Notice may be late, while later days are within time. The Engineer must give a Notice within 14 days if it considers the claim late.",
            },
            {
              text: "Tell the director the whole claim is time-barred because the storms started more than 28 days ago.",
              next: "b",
              score: 4,
              feedback: "Too quick. Some storm days may be within time; and the 2017 books let the Engineer/DAAB consider whether late submission is justified. A blanket rejection invites a dispute you might lose.",
            },
            {
              text: "Accept the claim to keep good relations: sandstorms are obviously real.",
              next: "b",
              score: 1,
              feedback: "The Employer does not accept or reject: the Engineer agrees or determines under 3.7. And foreseeable weather is not an entitlement.",
            },
          ],
        },
        b: {
          md: md`The Engineer confirms the Notice is in time for storms after 14 June. The Contractor's basis is 8.5(c), exceptionally adverse climatic conditions. What evidence should the Employer give the Engineer during the 3.7 consultation?`,
          choices: [
            {
              text: "The climatic data made available at tender and the published Kuwait data for the site area (days with dust storms, wind speeds and visibility for June–July over many years), compared with the actual on-site weather-station record.",
              next: "c",
              score: 10,
              feedback: "This is the test in 8.5(c): only conditions Unforeseeable against that data qualify. June–July shamal winds are a normal seasonal feature in Kuwait, so the Contractor must show these storms were exceptional relative to the record.",
            },
            {
              text: "A statement from the MEWRE director that sandstorms are normal in Kuwait.",
              next: "c",
              score: 4,
              feedback: "Directionally right but weak: the Engineer and DAAB need data, not assertion.",
            },
          ],
        },
        c: {
          md: md`Analysis shows 4 of the claimed 11 days had conditions well beyond the historical record; the others were within normal seasonal ranges. The crane lifts were on the critical path. How do you expect the entitlement to come out, and what about the USD 1.3 m?`,
          choices: [
            {
              text: "Up to 4 days' EOT (if they delayed completion), and no Cost: 8.5(c) gives time only. The GIS contamination cleanup is the Contractor's risk unless it qualifies as damage from forces of nature under 17.2 that an experienced contractor could not have guarded against.",
              next: "d",
              score: 10,
              feedback: "Correct reading of Yellow 2017: climatic conditions give time, not money. Damage to the Works is a separate 17.2 question, and protecting GIS from dust is a foreseeable precaution in Kuwait.",
            },
            {
              text: "11 days' EOT and USD 1.3 m: the Notice was valid so everything follows.",
              next: "d",
              score: 1,
              feedback: "A valid Notice preserves the right to claim; it does not prove entitlement. Only exceptional days, on the critical path, count, and only for time.",
            },
            {
              text: "Zero: sandstorms are never exceptional in Kuwait.",
              next: "d",
              score: 4,
              feedback: "Overstated. The data showed 4 days beyond the record; a determination of zero would likely be overturned by the DAAB.",
            },
          ],
        },
        d: {
          md: md`The Contractor says the storms are continuing into August. What do you ask the Engineer to require?`,
          choices: [
            {
              text: "Monthly interim updates under 20.2.6 with weather-station records and the updated programme, and a final claim within 28 days after the effects end.",
              score: 10,
              feedback: "Correct handling of a claim with continuing effect; it keeps the evidence contemporaneous for both sides.",
            },
            {
              text: "Nothing until the Contractor submits a final claim at the end of the project.",
              score: 2,
              feedback: "That is the 1999-era habit 2017 was designed to end. Records go stale and disputes harden.",
            },
          ],
        },
      },
    },
  ],
};

export default lesson;
