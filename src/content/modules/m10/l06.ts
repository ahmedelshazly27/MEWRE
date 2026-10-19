import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m10-l06",
  title: "Budget Control and Cash-Flow Forecasting on Ministry Projects",
  summary:
    "Tie a construction contract to the state budget: commitments vs expenditure, interim payment certificates, advance payment and its recovery, retention, contingency drawdown, S-curve forecasts by fiscal year and estimate-at-completion — using a KWD 45 m grid-connection package as the worked case.",
  minutes: 80,
  objectives: [
    "Explain the annual budget cycle and why fiscal-year cash forecasts, not contract values, drive budget requests",
    "Distinguish budget, commitment, accrual (certified) and expenditure (paid), and track them for a contract",
    "Forecast monthly net payments from an S-curve or milestone schedule, including advance recovery and retention",
    "Compute EVM indicators and three EAC forecasts, and build an owner-side EAC with contingency drawdown",
    "Defend a contingency movement or a payment-term change to the Audit Bureau with evidence",
  ],
  concepts: [
    { id: "m10.budget-cycle", name: "Budget cycle and fiscal-year cash planning", description: "Annual appropriations by fiscal year; multi-year contracts must be translated into fiscal-year cash needs, with lapse and re-request risk.", competency: "controls", related: ["m10.scurve-forecast"] },
    { id: "m10.commitment-expenditure", name: "Commitment vs expenditure", description: "Budget → commitment (contract/VO signed) → accrual (work certified) → expenditure (cash paid); each answers a different control question.", competency: "controls", related: ["m10.budget-cycle"] },
    { id: "m10.payment-mechanics", name: "Payment certificates, advance and retention", description: "IPC process, advance payment against a guarantee recovered by amortisation, and retention held as security and released in two halves.", competency: "contracts", related: ["m10.commitment-expenditure"] },
    { id: "m10.scurve-forecast", name: "S-curve cash-flow forecasting", description: "Cumulative progress and payment profile over time; converts a contract value into monthly and fiscal-year cash.", competency: "controls", related: ["m10.payment-mechanics", "m10.budget-cycle"] },
    { id: "m10.eac-forecast", name: "Estimate at completion", description: "EVM-based EAC methods and the owner-side EAC (contract + approved variations + expected claims and risks + owner's costs).", competency: "controls", related: ["m10.contingency-drawdown"] },
    { id: "m10.contingency-drawdown", name: "Contingency drawdown and reporting", description: "Controlled release of contingency against approved changes and realised risks, with a log that explains every movement.", competency: "controls", related: ["m10.eac-forecast", "m10.estimate-contingency"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "From contract value to fiscal-year cash",
      blocks: [
        {
          kind: "md",
          md: md`### The budget cycle

A ministry does not receive a contract's value; it receives **annual appropriations**. Each year's budget is prepared months before the fiscal year starts, approved through the state budget process, and spent (or not) within that year. A PM's forecast therefore has to answer, every year: *how much cash will this project need in each fiscal year, and how confident am I?* Over-forecast and money is locked away from other priorities and may lapse at year end; under-forecast and certified invoices cannot be paid on time — the contractor's financing cost and claims rise, and FIDIC-type contracts give the contractor financing charges and, eventually, suspension rights for late payment.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Kuwait fiscal year — confirm the dates",
          md: md`Kuwait's state fiscal year is widely reported to run **1 April to 31 March** (e.g. FY2026/27 = April 2026–March 2027), and the course research shows Audit Bureau approvals of MEWRE spending framed in April–December periods. However, the research brief (docs/RESEARCH.md) contains no primary source for the fiscal-year dates or the ministry budget calendar. Confirm with the Ministry of Finance budget circular before relying on them; the downloadable cash-flow model has a "fiscal year start month" input for this reason.`,
        },
        {
          kind: "md",
          md: md`Two Kuwait-specific facts that interact with budgeting (from the research brief): the **State Audit Bureau** performs prior review of contracts (threshold reported as KD 100,000 and above — verify), and **Law No. 94 of 2026** (effective around December 2026) raises the direct-contracting threshold without CAPT approval to **KD 1,000,000 per financial year** — a limit measured per fiscal year, so fiscal-year bookkeeping becomes a compliance matter, not just a planning one.

### Four numbers, four questions

| Measure | Event that creates it | Question it answers |
|---|---|---|
| **Budget (appropriation)** | Budget law / approved project budget | How much may we spend? |
| **Commitment (obligation)** | Contract signed, variation order approved, purchase order issued | How much have we promised? |
| **Accrual (certified value)** | Engineer certifies an IPC | How much work have we received? |
| **Expenditure (cash paid)** | Payment made | How much cash has left the treasury? |

Commitments ahead of budget are a control failure; cash far behind accruals is a payment-performance failure; certified value far ahead of physical progress is an over-certification risk. A monthly report shows all four against the forecast.

### Interim payment certificates (FIDIC logic)

The contractor submits a monthly Statement (measured or milestone value of work, materials on site if allowed, variations, adjustments); the Engineer certifies an **IPC** within the contractual period (28 days under FIDIC 2017) showing gross value **less** advance recovery and retention; the Employer pays within the contractual period (56 days from the Engineer's receipt of the Statement under FIDIC 2017 defaults). The PM's cash forecast must use these lags, not the date work is done.

### Advance payment

An interest-free advance (often 10–20 % of the Accepted Contract Amount) helps the contractor mobilise and place long-lead orders. It is paid against an **advance payment guarantee** and recovered from IPCs:`,
        },
        { kind: "equation", formula: "m10-advance-recovery" },
        {
          kind: "md",
          md: md`With FIDIC 2017 defaults (start when certified work exceeds 10 % of the contract; amortisation 25 % of each IPC), a 10 % advance is repaid once a further 40 % of the contract is certified — i.e. by about 50 % progress. The guarantee value reduces as the advance is repaid. MEWRE's **exposure** at any time is the unrecovered advance minus the value of work in place it represents.

### Retention`,
        },
        { kind: "equation", formula: "m10-retention" },
        {
          kind: "md",
          md: md`Retention (e.g. 10 % of each IPC up to a 5 % limit) is security for defects. Half is released at the Taking-Over Certificate and half at the end of the Defects Notification Period — so a project still needs **budget two fiscal years after completion**. Retention can often be replaced by a retention money guarantee.

### S-curve forecasting`,
        },
        { kind: "equation", formula: "m10-scurve" },
        {
          kind: "md",
          md: md`The cosine S-curve is a first approximation: slow mobilisation, peak monthly spend at mid-contract (here 2.94 m/month = 6.5 % of value), slow close-out. A better forecast comes from the contractor's **resource-loaded programme** or the **milestone payment schedule** in the contract — but compare it with the cosine: contractors' plans are often front-loaded (optimistic) and their actuals typically lag.

### Estimate at completion`,
        },
        { kind: "equation", formula: "m10-evm-indices" },
        { kind: "equation", formula: "m10-eac" },
        {
          kind: "md",
          md: md`On a **lump-sum** contract, the contractor's productivity problems (CPI < 1 on its own costs) do not directly change MEWRE's price — but they predict delay, claims and financial distress. The **owner-side EAC** is built bottom-up:

$$\text{EAC}_{owner} = \text{Contract} + \text{approved VOs} + \sum p_i\cdot\text{claims/risks}_i + \text{owner's costs}.$$

Contingency is drawn down only when a change is **approved** (or a risk occurs); the expected value of pending items is shown as forecast, not as drawn. The difference between remaining contingency and the expected value of pending items is the **contingency surplus or shortfall** — the number the Audit Bureau will ask about.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why cash forecasting is a PM skill, not an accountant's",
          md: md`Only the PM knows when the GIS will pass factory tests, when the outage window on the existing substation is booked, and whether the contractor's foundation crews are behind. Those events move cash between fiscal years. An accountant can sum the numbers; only the PM can make them true.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Forecasting a KWD 45 m grid-connection package",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Monthly payment forecast and fiscal-year budget request",
          given: md`Illustrative MEWRE contract: 400 kV line and substation-bay works to connect a solar IPP, Accepted Contract Amount **KWD 45.000 m**, signed June 2026 (month 0), 24 months to Taking-Over (June 2028), DNP 12 months. Advance 10 % paid at month 0; recovery starts when certified work exceeds 10 %, at 25 % of each IPC; retention 10 % per IPC up to 5 %; half released at Taking-Over, half at end of DNP. Gross progress follows the cosine S-curve. Fiscal year assumed April–March (verify). Payment lags ignored for clarity (shift by ~2 months in practice).`,
          steps: [
            { md: md`**Month 1 gross:** $45\times[F(1)-F(0)] = 45\times(1-\cos(\pi/24))/2 = 0.192$ KWD m. Retention $0.1\times 0.192 = 0.019$; no recovery yet (cumulative 0.4 % < 10 %). Net 0.173.` },
            { md: md`**Month 5:** cumulative gross reaches 4.650 (10.3 % > 10 %) → recovery starts: $0.25\times 1.635 = 0.409$. Net $= 1.635 - 0.409 - 0.164 = 1.063$.` },
            { md: md`**Month 12:** the advance balance is 0.363 (< 25 % of 2.937), so recovery is 0.363 and the advance is fully repaid at 50 % progress. Retention reaches its 2.250 limit the same month.` },
            {
              md: md`**Monthly table (KWD m):**

__CASHTABLE__`,
            },
            {
              md: md`**Fiscal-year budget request (KWD m):**

| FY | Gross certified | Advance | Recovery | Retention held | Released | **Net cash need** |
|---|---|---|---|---|---|---|
| 2026/27 | 13.890 | 4.500 | 2.719 | 1.389 | — | **14.282** |
| 2027/28 | 29.398 | — | 1.781 | 0.861 | — | **26.755** |
| 2028/29 | 1.713 | — | — | — | 1.125 | **2.838** |
| 2029/30 | — | — | — | — | 1.125 | **1.125** |
| **Total** | 45.000 | 4.500 | 4.500 | 2.250 | 2.250 | **45.000** |`,
            },
          ],
          result: md`Request KWD 14.282 m for FY2026/27 and 26.755 m for FY2027/28, then 2.838 m and 1.125 m — retention means the project needs budget two fiscal years after Taking-Over. A 3-month start delay moves FY2026/27 down to 9.537 m (KWD 4.745 m lapses and must be re-requested) and FY2028/29 up to 7.715 m.`,
        },
        {
          kind: "download",
          file: "/downloads/cashflow-forecast.xlsx",
          title: "Cash-flow forecast model (Excel)",
          description: "S-curve or milestone basis → monthly IPC, advance, recovery, retention and releases → fiscal-year budget table → contingency drawdown log with owner-side EAC.",
        },
        { kind: "widget", widget: "cashflow-scurve", caption: "Change contract value, duration, advance and retention; watch the net-payment S-curve and the fiscal-year split." },
        {
          kind: "worked",
          mode: "faded",
          title: "Month-12 earned value and EAC",
          given: md`Same package, status at month 12 (June 2027). BAC = KWD 45.000 m. Planned value (S-curve) PV = 22.500; measured earned value EV = 19.800; actual cost to MEWRE (certified gross) AC = 21.200 — AC exceeds EV because a provisional-sum item and two variations were certified at higher value than their budgeted work content.`,
          steps: [
            { md: md`CV $= EV - AC = -1.400$; SV $= EV - PV = -2.700$ KWD m.` },
            { md: md`CPI $= 19.8/21.2$ = **0.934**; SPI $= 19.8/22.5$ = **0.880**.`, hidden: true, check: { prompt: "CPI", answer: 0.934, tolerance: { abs: 0.002 } } },
            { md: md`EAC1 $= BAC/CPI = 45/0.934 = 48.18$; EAC2 $= AC + (BAC-EV) = 21.2 + 25.2 = 46.40$.` },
            { md: md`EAC3 $= 21.2 + 25.2/(0.934\times 0.880)$ = **51.86** KWD m.`, hidden: true, check: { prompt: "EAC3 (KWD m)", answer: 51.86, unit: "KWD m", tolerance: { abs: 0.05 } } },
            { md: md`TCPI $= (45 - 19.8)/(45 - 21.2) = 25.2/23.8 = 1.059$ — the remaining work would have to be done 6 % more efficiently than planned to finish on BAC; possible only if the overrun drivers were one-offs.` },
          ],
          result: md`Report a range: KWD 46.4 m (one-off causes) – 48.2 m (current efficiency persists) – 51.9 m (if MEWRE also pushes to recover the 2.7 m schedule slippage). With an approved budget of KWD 51.5 m (contract 45.0 + contingency 4.5 + owner's 2.0), the most likely EAC fits; the pessimistic one does not.`,
        },
        {
          kind: "download",
          file: "/downloads/evm-tracker.xlsx",
          title: "EVM tracker (Excel)",
          description: "Monthly PV/EV/AC with CV, SV, CPI, SPI, three EAC methods, ETC, VAC and TCPI; status dashboard at any month; guidance for owner-side use.",
        },
        {
          kind: "question",
          question: {
            id: "m10-l06-p1",
            type: "numeric",
            prompt: md`Contingency log for the package: contingency in the approved budget KWD 4.500 m; approved variations VO-01 0.950 and VO-02 0.650; pending claims 1.600 (50 % likely) and 0.800 (50 %); risk R-07 2.000 (40 %). What is the contingency surplus (+) or shortfall (−) after deducting the expected value of pending items from the remaining contingency? (KWD m, 3 decimals)`,
            answer: 0.9,
            tolerance: { abs: 0.002 },
            unit: "KWD m",
            explanation: md`Drawn = 0.950 + 0.650 = 1.600 → remaining 4.500 − 1.600 = 2.900. Expected value pending = 0.800 + 0.400 + 0.800 = 2.000. Surplus = 2.900 − 2.000 = **+0.900**. Owner-side EAC = 45.0 + 1.6 + 2.0 + 2.0 (owner's costs) = 50.6 vs budget 51.5.`,
            concepts: ["m10.contingency-drawdown", "m10.eac-forecast"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running the numbers inside MEWRE",
      blocks: [
        {
          kind: "md",
          md: md`### Roles and documents

- **The Engineer / supervision consultant** (FIDIC): measures work, certifies IPCs, evaluates variations and claims — the source of accruals.
- **MEWRE project team (PM):** owns the forecast, the change log, the contingency log and the monthly report; prepares the fiscal-year budget input.
- **MEWRE finance/budget units:** commitment control, payment processing, budget submissions to the Ministry of Finance.
- **Audit Bureau:** prior review of contracts and many variations above its threshold; post-audit of payments and of the reasons for budget movements.
- **Contractor:** Statements, programme updates (P6), cash-flow forecast required by the contract (FIDIC 2017 requires the contractor to submit a non-binding estimate of payments).

Tools: P6 resource-loaded programme → monthly planned value; Aconex or similar for IPC workflow; a controlled spreadsheet or ERP module for commitments; the downloadable models as a cross-check.

### Monthly report — minimum content

1. Budget, commitment, certified, paid, forecast at completion (table).
2. S-curve: planned vs certified vs paid; fiscal-year forecast vs appropriation.
3. EVM indicators with commentary (causes, not just numbers).
4. Change log: approved VOs (drawn), pending (expected value), rejected.
5. Contingency log: opening, drawn, remaining, expected need, surplus/shortfall, with reasons for every movement.
6. Advance and retention balances and the guarantee values that secure them (check expiry dates!).
7. Top cash risks for the next fiscal year (outage windows, factory tests, customs, approvals).`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- Forecasting by contract value ÷ duration (a straight line) — over-requests early, under-requests at peak.
- Forgetting retention releases and final account in the years after completion.
- Advance payment guarantee allowed to **expire** before the advance is recovered.
- Increasing the advance without extending the recovery mechanism — recovery then runs until ~90 % progress.
- Drawing contingency for pending claims before they are agreed, hiding the true remaining contingency.
- Moving money between projects or budget lines without the formal approvals — an Audit Bureau finding.
- Reporting EAC as one number with no range and no causes.`,
        },
        {
          kind: "checklist",
          title: "PM checklist: budget control",
          items: [
            "Fiscal-year cash forecast updated monthly from the programme, not from the contract value",
            "Commitments never exceed the approved budget; every VO checked against remaining contingency before approval",
            "Advance payment guarantee value ≥ unrecovered advance, with expiry beyond expected full recovery",
            "Retention and its release dates in the forecast for the years after Taking-Over",
            "Contingency log reconciles: opening − drawn = remaining; pending shown at expected value",
            "EAC reported as a range with drivers; TCPI sanity-checked",
            "Every movement explainable in one paragraph to the Audit Bureau, with documents attached",
          ],
        },
        {
          kind: "ask",
          title: "Questions for the contractor and the Engineer",
          items: [
            "What is your updated monthly payment forecast to Taking-Over, and which programme activities drive the next three months?",
            "Which IPC items are provisional or estimated, and when will they be remeasured?",
            "What is the status of factory acceptance tests and shipments that drive the next payment milestones?",
            "Which variations or claims are you preparing that are not yet notified?",
            "Engineer: what is your independent estimate of physical progress versus the certified value?",
          ],
        },
        { kind: "scenario", scenario: "m10-s5" },
        { kind: "scenario", scenario: "m10-s6" },
        {
          kind: "bilingual",
          title: "Reply to an Audit Bureau query on contingency movement (template)",
          en: md`Subject: Contract No. [ ] — Movement in project contingency

1. The approved project budget is KWD 51.500 m, comprising the Contract Price (45.000), project contingency (4.500) and owner's costs (2.000).
2. As at [date], contingency of KWD 1.600 m has been drawn against two approved variations (VO-01: additional foundation design for sabkha soil, KWD 0.950 m; VO-02: additional 400 kV bay protection panel requested by MEWRE Transmission, KWD 0.650 m). Approval documents are attached.
3. Pending items are not drawn; their expected value (KWD 2.000 m) is reported as a forecast. Remaining contingency (KWD 2.900 m) covers this expected value with a surplus of KWD 0.900 m.
4. The forecast final cost is KWD 50.600 m, within the approved budget.`,
          ar: `الموضوع: العقد رقم [ ] — حركة بند الاحتياطي (الطوارئ) للمشروع

١. تبلغ الميزانية المعتمدة للمشروع ٥١٫٥٠٠ مليون دينار كويتي، وتشمل قيمة العقد (٤٥٫٠٠٠) واحتياطي الطوارئ (٤٫٥٠٠) وتكاليف المالك (٢٫٠٠٠).
٢. حتى تاريخ [ ]، تم السحب من الاحتياطي بمبلغ ١٫٦٠٠ مليون دينار مقابل أمرين تغييريين معتمدين (أمر التغيير رقم ١: تصميم إضافي للأساسات في التربة السبخية بقيمة ٠٫٩٥٠ مليون دينار؛ أمر التغيير رقم ٢: لوحة حماية إضافية لخلية ٤٠٠ ك.ف بطلب من قطاع النقل بالوزارة بقيمة ٠٫٦٥٠ مليون دينار). مرفق مستندات الاعتماد.
٣. لا يتم السحب مقابل البنود المعلقة، وتُدرج قيمتها المتوقعة (٢٫٠٠٠ مليون دينار) كتوقعات. ويغطي الرصيد المتبقي من الاحتياطي (٢٫٩٠٠ مليون دينار) هذه القيمة بفائض قدره ٠٫٩٠٠ مليون دينار.
٤. تبلغ التكلفة النهائية المتوقعة ٥٠٫٦٠٠ مليون دينار، ضمن الميزانية المعتمدة.`,
        },
        { kind: "sources", refs: ["m10-fidic-2017", "m10-pmi-evm", "m10-sab-law", "m10-tamimi-tenders-2026", "m10-powerline-gccia", "m10-mof-kuwait", "m10-megaproject-400kv"] },
        {
          kind: "feynman",
          prompt: "Explain to a new MEWRE engineer why a KWD 45 m contract does not need KWD 45 m in this year's budget, and what decides how much it does need.",
          keyPoints: [
            "Budgets are annual appropriations; contracts span several fiscal years",
            "Cash follows certified progress (S-curve or milestones) with payment lags",
            "Advance is paid early and recovered later; retention is held and released after completion",
            "Delays move cash into later fiscal years; unspent appropriations may lapse",
            "Commitment, accrual and cash are different numbers and must all be tracked",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m10-l06-q1",
      type: "numeric",
      prompt: md`An IPC certifies gross work of KWD 2.000 m. Advance recovery applies at 25 % and retention at 10 % (limit not yet reached). What is the net amount payable? (KWD m)`,
      answer: 1.3,
      tolerance: { abs: 0.001 },
      unit: "KWD m",
      explanation: md`$2.000 - 0.25\times 2.000 - 0.10\times 2.000 = 2.000 - 0.500 - 0.200 = 1.300$ KWD m.`,
      concepts: ["m10.payment-mechanics"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m10-l06-q2",
      type: "order",
      prompt: "Order these events in the life of a variation's money (first to last).",
      items: ["Contingency shown in approved budget", "Variation order approved (commitment)", "Work measured and certified in an IPC (accrual)", "Payment made (expenditure)", "Retention on that work released after DNP"],
      explanation: md`Budget → commitment → accrual → cash → final release. Each step is a control point with its own record.`,
      concepts: ["m10.commitment-expenditure"],
      difficulty: 1,
    },
    {
      id: "m10-l06-q3",
      type: "numeric",
      prompt: md`A 10 % advance is recovered at 25 % of each IPC starting once certified work exceeds 10 % of the contract. At what cumulative progress (% of contract) is the advance fully recovered, assuming no other deductions? (%)`,
      answer: 50,
      tolerance: { abs: 0.5 },
      unit: "%",
      explanation: md`Recovery needs $10\%/0.25 = 40\%$ of contract value certified after the threshold: 10 % + 40 % = **50 %**. (In the monthly model recovery starts in the IPC that crosses 10 %, so it completes exactly at 50 % in month 12.)`,
      concepts: ["m10.payment-mechanics"],
      difficulty: 2,
    },
    {
      id: "m10-l06-q4",
      type: "numeric",
      prompt: md`BAC = KWD 45.0 m, EV = 19.8, AC = 21.2, PV = 22.5. Compute EAC with the CPI method (BAC/CPI). (KWD m, 2 decimals)`,
      answer: 48.18,
      tolerance: { abs: 0.03 },
      unit: "KWD m",
      explanation: md`CPI $= 19.8/21.2 = 0.934$; EAC $= 45/0.934 = 48.18$. VAC $= 45 - 48.18 = -3.18$ KWD m.`,
      concepts: ["m10.eac-forecast"],
      difficulty: 1,
    },
    {
      id: "m10-l06-q5",
      type: "multi",
      prompt: "Which statements about retention are correct under FIDIC-style terms? (Select all that apply.)",
      options: [
        "It is deducted from each IPC until a limit is reached",
        "Half is typically released at Taking-Over and half after the Defects Notification Period",
        "It is a saving for the Employer that reduces the final contract price",
        "It must be included in budgets for fiscal years after completion",
        "It may often be replaced by a retention money guarantee",
      ],
      answer: [0, 1, 3, 4],
      explanation: md`Retention is security, not a saving: it is paid later. In the worked case KWD 1.125 m is released in each of FY2028/29 and FY2029/30.`,
      concepts: ["m10.payment-mechanics", "m10.budget-cycle"],
      difficulty: 1,
    },
    {
      id: "m10-l06-q6",
      type: "decision",
      prompt: md`In February, the forecast shows FY spend will be KWD 4.7 m below the appropriation because the contract started 3 months late. A colleague suggests certifying materials not yet on site to "use the budget before it lapses". You are the PM. What do you do?`,
      options: [
        { text: "Agree — the money will be needed anyway and the contractor deserves cash flow.", score: 0, feedback: "Over-certification is a control breach and an Audit Bureau finding; it also removes MEWRE's security." },
        { text: "Refuse; report the forecast underspend now, re-phase the request into next fiscal year with the programme evidence, and record the reason (late start).", score: 1, feedback: "Correct: transparent re-phasing with evidence is the defensible path." },
        { text: "Ask the contractor to invoice an advance top-up instead.", score: 0.1, feedback: "Changing payment terms to absorb budget is not a legitimate reason and needs a contract amendment and approvals." },
      ],
      explanation: md`Budget lapse is managed by honest forecasting and re-phasing, not by paying for work not done. The 3-month delay case moves KWD 4.745 m out of FY2026/27.`,
      concepts: ["m10.budget-cycle", "m10.commitment-expenditure"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m10-l06-f1", front: "Commitment vs expenditure", back: "Commitment = contract/VO signed (promised); expenditure = cash paid. Accrual (certified) sits between.", concepts: ["m10.commitment-expenditure"] },
    { id: "m10-l06-f2", front: "FIDIC 2017 default advance recovery", back: "Starts when certified work > 10 % of Accepted Contract Amount; 25 % of each IPC until repaid.", concepts: ["m10.payment-mechanics"] },
    { id: "m10-l06-f3", front: "Retention release (typical FIDIC)", back: "Half at Taking-Over Certificate, half after the Defects Notification Period.", concepts: ["m10.payment-mechanics"] },
    { id: "m10-l06-f4", front: "Cosine S-curve", back: md`$F(t) = (1-\cos(\pi t/T))/2$; peak monthly spend at mid-contract.`, concepts: ["m10.scurve-forecast"] },
    { id: "m10-l06-f5", front: "Owner-side EAC", back: "Contract + approved VOs + expected value of pending claims/risks + owner's costs.", concepts: ["m10.eac-forecast"] },
    { id: "m10-l06-f6", front: "TCPI", back: md`$(BAC-EV)/(BAC-AC)$ — efficiency needed on remaining work to finish within BAC; > 1.10 rarely achieved.`, concepts: ["m10.eac-forecast"] },
    { id: "m10-l06-f7", front: "Kuwait fiscal year (to verify)", back: "Widely reported as 1 April–31 March; confirm with Ministry of Finance.", concepts: ["m10.budget-cycle"] },
    { id: "m10-l06-f8", front: "Contingency surplus/shortfall", back: "Remaining contingency − expected value of pending changes and risks.", concepts: ["m10.contingency-drawdown"] },
    { id: "m10-l06-f9", front: "Worked case FY need (KWD 45 m, start Jun 2026)", back: "FY26/27 14.282 · FY27/28 26.755 · FY28/29 2.838 · FY29/30 1.125 (KWD m).", concepts: ["m10.scurve-forecast"] },
  ],
  scenarios: [
    {
      id: "m10-s5",
      title: "The contractor wants a 20 % advance",
      dayInLife: true,
      context: md`Two weeks after award of the KWD 45 m grid-connection contract (advance 10 %), the contractor writes asking to increase the advance to 20 % "to secure GIS and transformer slots at the factory, given long lead times". It offers a bank guarantee for the extra amount. The current FY2026/27 appropriation was requested on the 10 % basis (KWD 14.282 m net).`,
      start: "a",
      concepts: ["m10.payment-mechanics", "m10.budget-cycle", "m10.scurve-forecast"],
      nodes: {
        a: {
          md: md`What do you analyse first?`,
          choices: [
            { text: "The cash and exposure effects: extra KWD 4.5 m in FY2026/27, how recovery changes, guarantee coverage, and whether the GIS lead-time argument is real.", score: 9, feedback: "Quantify cash, exposure and the justification before deciding.", next: "b" },
            { text: "Agree — a guarantee covers the risk and faster procurement helps the schedule.", score: 3, feedback: "A guarantee covers default, not budget, recovery or precedent issues; and you have not verified the lead-time claim.", next: "c" },
            { text: "Refuse outright — the contract says 10 %.", score: 5, feedback: "Contractually safe, but if the lead-time risk is real a refusal may cost MEWRE months on the critical path.", next: "b" },
          ],
        },
        b: {
          md: md`Your model: with 20 % advance and the same 25 % amortisation, FY2026/27 net rises to KWD 18.782 m (+4.5 m beyond the appropriation) and full recovery slips from month 12 to month 19 (≈ 90 % progress); unrecovered advance at month 12 would be KWD 4.129 m. With 40 % amortisation, recovery completes by month 14. The factory confirms a 14-month GIS lead time with a 30 % down-payment requirement.`,
          choices: [
            { text: "Propose a limited amendment: an additional advance tied specifically to the GIS/transformer orders (paid against proof of order and a guarantee), recovered at a higher amortisation rate, subject to budget availability and the required approvals (Audit Bureau review of the amendment).", score: 10, feedback: "Targets the real need, limits exposure and respects budget and approval rules." },
            { text: "Approve 20 % on the original recovery terms to keep it simple.", score: 3, feedback: "Leaves MEWRE exposed until ~90 % progress and breaks the FY appropriation without a plan." },
            { text: "Reject and tell the contractor to finance the down-payment itself.", score: 6, feedback: "Defensible — the contractor priced the risk — but record the schedule risk and monitor the factory slot." },
          ],
        },
        c: {
          md: md`Finance tells you the FY2026/27 appropriation cannot cover the extra KWD 4.5 m, and the Audit Bureau asks why payment terms changed after award.`,
          choices: [
            { text: "Pause, prepare the analysis (cash, exposure, justification), and route a proper amendment for approval or withdraw the offer.", score: 5, feedback: "Recovers the process; the early approval created avoidable questions." },
          ],
        },
      },
    },
    {
      id: "m10-s6",
      title: "The Audit Bureau asks why contingency rose",
      dayInLife: true,
      context: md`In the FY2027/28 budget submission, the project's contingency line rose from KWD 2.900 m remaining (reported last quarter) to a request for an additional KWD 1.500 m. An Audit Bureau officer asks in writing why the project needs more contingency when "the contractor is on a lump-sum price".`,
      start: "a",
      concepts: ["m10.contingency-drawdown", "m10.eac-forecast", "m10.estimate-contingency"],
      nodes: {
        a: {
          md: md`What do you prepare?`,
          choices: [
            { text: "A reconciliation: opening contingency, each drawdown (approved VO with approval reference), pending items at expected value, the new risk that changed the forecast, and the resulting shortfall — with documents.", score: 10, feedback: "Exactly what an auditor needs: a traceable bridge from the last figure to the new one.", next: "b" },
            { text: "A short reply that lump-sum contracts still have variations.", score: 3, feedback: "True but not evidence; it invites a follow-up finding.", next: "c" },
            { text: "Remove the request to avoid scrutiny and hope the remaining contingency suffices.", score: 1, feedback: "Under-budgeting a known risk is worse than explaining it.", next: "c" },
          ],
        },
        b: {
          md: md`Your bridge: remaining 2.900 → the outage window on the existing Al-Wafra 400 kV substation slipped (risk R-07 occurred: contractor's standby and re-mobilisation claim agreed at KWD 1.300 m), and Claim-01 (late land handover) was agreed at 1.200 m. Remaining 2.900 − 2.500 = 0.400; still pending Claim-02 0.800 at 50 % and a new risk of 1.200 at 50 % → expected 1.000. Shortfall 0.600; with a P80 margin the request is 1.500.`,
          choices: [
            { text: "Submit the bridge, explain that the Employer-side risks (outage windows, land handover) were never in the lump sum, show the P80 basis for 1.500, and list actions to prevent recurrence (outage booking protocol with MEWRE Transmission).", score: 10, feedback: "Clear causality, correct allocation (Employer risks), a quantified basis and corrective action." },
            { text: "Submit the numbers only.", score: 6, feedback: "Correct but misses the 'why' and the lessons-learned the auditor will look for." },
          ],
        },
        c: {
          md: md`The Audit Bureau issues a formal observation requesting the full contingency history and approval documents within 15 days.`,
          choices: [
            { text: "Assemble the reconciliation and documents, and adopt a monthly contingency log going forward.", score: 5, feedback: "Recovers, but a formal observation is now on file." },
          ],
        },
      },
    },
  ],
};

export default lesson;
