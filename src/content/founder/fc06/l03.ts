import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc06-l03",
  title: "SaaS and hardware metrics: ARR, retention, burn multiple, margins and inventory",
  summary:
    "The metrics investors and boards use to judge a software or hardware-plus-software company: MRR and ARR bridges, NRR and GRR, logo vs revenue churn, burn multiple, rule of 40, blended gross margin, inventory and the cash conversion cycle.",
  minutes: 70,
  objectives: [
    "Build an ARR bridge and compute NRR, GRR, logo churn and revenue churn from cohort data",
    "Compute and interpret the burn multiple, and say when the rule of 40 applies",
    "Compute blended gross margin for a software plus hardware mix",
    "Compute DIO, DSO, DPO, the cash conversion cycle and the working capital a hardware line ties up",
    "Write a metric dictionary so your numbers mean the same thing every month",
  ],
  concepts: [
    { id: "fc06.arr-bridge", name: "MRR, ARR and the ARR bridge", description: "Recurring revenue run-rate and its decomposition into new, expansion, contraction and churn.", competency: "fc-finance" },
    { id: "fc06.retention", name: "Net and gross revenue retention, logo vs revenue churn", description: "NRR includes expansion and can exceed 100 %; GRR excludes it; logo churn counts customers, revenue churn counts money.", competency: "fc-finance", related: ["fc06.ltv"] },
    { id: "fc06.burn-multiple", name: "Burn multiple and rule of 40", description: "Net burn per unit of net new ARR (capital efficiency); growth plus profit margin for scaled software.", competency: "fc-finance" },
    { id: "fc06.hardware-economics", name: "Hardware gross margin, inventory and cash conversion cycle", description: "Landed unit cost and mix set gross margin; inventory, receivables and payables days set how much cash a hardware line consumes.", competency: "fc-finance", related: ["fc06.working-capital"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Recurring revenue, retention and capital efficiency",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Afterwave starts as software (Lockstep, Enclave, Ripple) and plans its own instrumented test platforms later: you will be judged first on SaaS metrics and then on a blended hardware-software margin. Mizan's distribution thread (turnkey hardware into Kuwait) is a working-capital business sold to public buyers who pay slowly. Knowing which metric matters at which stage, and computing it the standard way, is the difference between a board deck that builds trust and one that gets re-cut by an analyst.`,
        },
        {
          kind: "md",
          md: md`### MRR, ARR and the bridge

**MRR** is the monthly value of committed recurring contracts that are live; **ARR** $= 12\times MRR$. Excluded: one-off pilots, installation, training, hardware sales, usage overages that are not committed. Contracted-but-not-live ARR is reported separately.`,
        },
        { kind: "equation", formula: "fc06-arr" },
        {
          kind: "md",
          md: md`### Retention: four numbers that are not the same

| Metric | Counts | Includes expansion? | Range |
|---|---|---|---|
| **Logo churn** | Customers lost / customers at start | No | 0 to 100 % |
| **Revenue churn** (gross) | (Contraction + churned ARR) / starting ARR | No | 0 to 100 % |
| **GRR** | 1 - gross revenue churn | No | up to 100 % |
| **NRR** | (Start + expansion - contraction - churn) / start | Yes | can exceed 100 % |

Losing 4 of 20 small customers is 20 % logo churn but may be only 10 % revenue churn. Losing your one big customer can be 5 % logo churn and 40 % revenue churn. Report both.`,
        },
        { kind: "equation", formula: "fc06-nrr" },
        { kind: "equation", formula: "fc06-grr" },
        {
          kind: "chart",
          chart: "line",
          title: "What NRR does to a cohort over five years",
          xKey: "year",
          xLabel: "Years since cohort signed",
          yLabel: "Cohort ARR (index, year 0 = 100)",
          series: [
            { key: "nrr120", label: "NRR 120 %" },
            { key: "nrr100", label: "NRR 100 %" },
            { key: "nrr85", label: "NRR 85 %" },
          ],
          data: [
            { year: 0, nrr120: 100, nrr100: 100, nrr85: 100 },
            { year: 1, nrr120: 120, nrr100: 100, nrr85: 85 },
            { year: 2, nrr120: 144, nrr100: 100, nrr85: 72.3 },
            { year: 3, nrr120: 172.8, nrr100: 100, nrr85: 61.4 },
            { year: 4, nrr120: 207.4, nrr100: 100, nrr85: 52.2 },
            { year: 5, nrr120: 248.8, nrr100: 100, nrr85: 44.4 },
          ],
          caption: "Compounding: at 120 % NRR a cohort is worth 2.5x after five years with no further acquisition cost; at 85 % it has lost more than half. This is why land-and-expand infrastructure is valued on NRR.",
        },
        {
          kind: "md",
          md: md`### Capital efficiency

**Burn multiple** asks how many euros of net burn buy one euro of net new ARR. It captures growth and efficiency in one number and punishes both slow growth and wasteful spending.`,
        },
        { kind: "equation", formula: "fc06-burn-multiple" },
        {
          kind: "md",
          md: md`| Burn multiple | Sacks' reading |
|---|---|
| < 1 | Amazing |
| 1 to 1.5 | Great |
| 1.5 to 2 | Good |
| 2 to 3 | Suspect |
| > 3 | Bad |

**Rule of 40** is for scaled software (tens of millions of ARR): growth rate plus profit margin at or above 40 %. At seed it is noise; do not lead with it.`,
        },
        { kind: "equation", formula: "fc06-rule-of-40" },
        {
          kind: "md",
          md: md`### Hardware: margin and cash are different animals

Hardware gross margin uses **landed** unit cost: bill of materials, assembly, test, freight, import duty, and a warranty provision. A mix of software and hardware has a revenue-weighted **blended** margin: 70 % of revenue at 80 % GM plus 30 % at 30 % GM gives $0.7\times 80 + 0.3\times 30 = 65\,\%$. Investors value the two streams differently, so show them separately.`,
        },
        { kind: "equation", formula: "fc06-gross-margin" },
        {
          kind: "md",
          md: md`The second hardware problem is **working capital**. You pay suppliers before the goods ship, hold stock, then wait for the customer to pay:`,
        },
        { kind: "equation", formula: "fc06-ccc" },
        {
          kind: "flow",
          title: "Cash conversion cycle of a hardware sale",
          steps: [
            { label: "Pay supplier", detail: "Day 0 if prepaid; day DPO if on terms" },
            { label: "Hold inventory", detail: "DIO days: shipping, customs, warehouse, waiting for the site to be ready" },
            { label: "Deliver and invoice", detail: "Revenue and receivable recognised" },
            { label: "Collect", detail: "DSO days later; public buyers often take 90 to 180 days" },
          ],
          caption: "CCC = DIO + DSO - DPO: the days your cash is tied up in each unit.",
        },
      ],
    },
    {
      layer: "applied",
      title: "An ARR bridge and a hardware working-capital check",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Board-pack metrics for a Series A-stage infrastructure company (illustrative)",
          given: md`Illustrative numbers, roughly what Afterwave might target two years after seed; not a forecast. Start of year ARR **EUR 1,000k** from 20 customers. During the year: new ARR **600k**; expansion **250k**; contraction **50k**; 4 small customers churned with **100k** ARR. Net burn for the year **EUR 1,400k**.`,
          steps: [
            { md: md`**ARR bridge:** $1{,}000 + 600 + 250 - 50 - 100 = 1{,}700$ EUR k. Net new ARR $= 700$. Growth $= 70\,\%$.` },
            { md: md`**NRR** $= (1{,}000 + 250 - 50 - 100)/1{,}000 = 110\,\%$. **GRR** $= (1{,}000 - 50 - 100)/1{,}000 = 85\,\%$.` },
            { md: md`**Logo churn** $= 4/20 = 20\,\%$; **gross revenue churn** $= 150/1{,}000 = 15\,\%$ (churn alone 10 %). Small customers are leaving: check whether they were a poor fit for the ICP.` },
            { md: md`**Burn multiple** $= 1{,}400/700 = 2.0$: at the edge between good and suspect. To reach 1.5 with the same burn you need 933k net new ARR.` },
            { md: md`**Rule of 40:** revenue for the year is roughly average ARR $(1{,}000 + 1{,}700)/2 = 1{,}350$; FCF margin $\approx -1{,}400/1{,}350 = -104\,\%$; $70 - 104 = -34$. Irrelevant at this stage: the board should watch burn multiple and NRR.` },
          ],
          result: md`ARR 1.7 m (+70 %), NRR 110 %, GRR 85 %, burn multiple 2.0. The story: the base expands well, small-logo churn and capital efficiency need work.`,
        },
        {
          kind: "worked",
          mode: "worked",
          title: "Mizan turnkey hardware distribution: margin vs cash (illustrative)",
          given: md`Illustrative. Mizan imports turnkey soiling measurement stations: landed cost **KWD 4,000** per unit, sold at **KWD 5,600**; **100 units/yr**. Supplier requires prepayment (DPO 0). Stock is held on average **90 days** (shipping, customs, waiting for site access). Public-sector customers pay in **120 days** on average.`,
          steps: [
            { md: md`**Gross margin** $= (5{,}600 - 4{,}000)/5{,}600 = 28.6\,\%$ (a 40 % markup). Annual revenue 560k, COGS 400k, gross profit **KWD 160k**.` },
            { md: md`**CCC** $= 90 + 120 - 0 =$ **210 days**.` },
            { md: md`**Working capital tied up:** inventory $400\times 90/365 = 98.6$; receivables $560\times 120/365 = 184.1$; total **KWD 282.7k**, which is 1.8 years of gross profit.` },
            { md: md`**Negotiate DPO 60 days** with the supplier: payables $400\times 60/365 = 65.8$, so working capital falls to **KWD 216.9k**. A 30 % advance payment from the customer on order would cut it further.` },
          ],
          result: md`A profitable line can still drain cash. Before scaling distribution, secure supplier terms, customer advances (common in Gulf public contracts against an advance payment guarantee) or trade finance.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Cohort retention for an early customer base (illustrative)",
          given: md`Illustrative. Cohort at start of year: 8 customers, **EUR 800k** ARR. During the year: expansion **200k**, contraction **40k**, one customer with **60k** churned.`,
          steps: [
            { md: md`End-of-year cohort ARR $= 800 + 200 - 40 - 60 = 900$.` },
            { md: md`NRR $= 900/800 =$ **112.5 %**.`, hidden: true, check: { prompt: "NRR (%)", answer: 112.5, unit: "%", tolerance: { abs: 0.1 } } },
            { md: md`GRR $= (800 - 40 - 60)/800 =$ **87.5 %**.`, hidden: true, check: { prompt: "GRR (%)", answer: 87.5, unit: "%", tolerance: { abs: 0.1 } } },
            { md: md`Logo churn $= 1/8 = 12.5\,\%$; revenue churn (excluding contraction) $= 60/800 = 7.5\,\%$.` },
          ],
          result: md`NRR 112.5 %, GRR 87.5 %. With 8 customers each event moves the number by several points: state the sample size next to the metric.`,
        },
        {
          kind: "question",
          question: {
            id: "fc06-l03-p1",
            type: "numeric",
            prompt: md`A hardware-plus-software company has inventory EUR 120k, annual COGS EUR 480k, receivables EUR 200k, annual revenue EUR 800k, payables EUR 40k. What is its cash conversion cycle? (days, 1 decimal)`,
            answer: 152.1,
            tolerance: { abs: 0.5 },
            unit: "days",
            explanation: md`$DIO = 120/480\times 365 = 91.25$; $DSO = 200/800\times 365 = 91.25$; $DPO = 40/480\times 365 = 30.4$. $CCC = 91.25 + 91.25 - 30.4 = 152.1$ days.`,
            concepts: ["fc06.hardware-economics"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Metrics in the board pack",
      blocks: [
        {
          kind: "md",
          md: md`### Which metrics, when

| Stage | Lead with | Do not lead with |
|---|---|---|
| Pre-seed, seed | Pilots signed and converted, ACV, design-partner retention, sales cycle length, burn and runway | Rule of 40, LTV/CAC from three customers |
| Series A | ARR and growth, NRR, GRR, burn multiple, CAC payback, gross margin | Vanity totals (registered users, hackathon sign-ups without conversion) |
| Growth | Rule of 40, efficiency by cohort and channel, margin by product line | |

### Write a metric dictionary

One page that fixes definitions: what counts as ARR (live, committed, excluding pilots), when a customer counts as churned (contract end, not last login), how multi-year contracts and price escalators are treated, which cohort NRR uses. Keep it in the data room and never change a definition silently: restate history when you change it.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Annualising a good month.** ARR from committed contracts only; one pilot invoice times 12 is not ARR.
- **NRR on a cherry-picked cohort.** State the cohort (all customers live 12 months ago) and do not exclude churned ones.
- **Mixing hardware revenue into ARR.** Hardware is one-off unless it is leased or sold as a service with committed payments.
- **Ignoring warranty and returns in hardware margin.** Provision for them from the first unit.
- **Forgetting working capital in the runway.** A hardware order you win can shorten runway if you prepay the supplier and the customer pays in 120 days.`,
        },
        { kind: "sources", refs: ["fc06-r5", "fc06-r6", "fc06-r7"] },
        {
          kind: "checklist",
          title: "Board-pack metrics checklist",
          items: [
            "ARR bridge with new, expansion, contraction and churn",
            "NRR and GRR with cohort definition and sample size",
            "Logo churn and revenue churn shown separately",
            "Burn multiple (once ARR exceeds roughly EUR 1 m) and months of runway",
            "Gross margin split by software, services and hardware",
            "DSO and receivables ageing; DIO and inventory if you sell hardware",
          ],
        },
        {
          kind: "ask",
          title: "Questions an investor will ask about your metrics",
          items: [
            "How do you define ARR, and how much of it is live vs contracted?",
            "What is NRR excluding your largest customer?",
            "What share of revenue is one-off (pilots, services, hardware), and what is its margin?",
            "If you win the big hardware order, what happens to cash over the next six months?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc06-l03-p2",
            type: "short",
            prompt: md`Write the **metric dictionary and dashboard spec** you would put in Afterwave's (or Mizan's) data room: 8 to 10 metrics, each with an exact definition, formula, data source, owner and the threshold that would trigger a board discussion. Include at least ARR, NRR, GRR, logo churn, burn multiple or runway, gross margin by stream, and one working-capital metric. Use illustrative thresholds, labelled as such.`,
            rubric: [
              "Each metric has an unambiguous definition (what is included and excluded) and a correct formula",
              "ARR excludes pilots, services and hardware, and distinguishes live from contracted",
              "NRR and GRR specify the cohort and the 12-month window",
              "Includes a working-capital metric (DSO, receivables ageing or CCC) relevant to the venture's buyers",
              "Data source and owner are realistic (CRM, billing, accounting) and thresholds are explicit and labelled illustrative",
              "Stage-appropriate: does not lead with rule of 40 at seed",
            ],
            modelAnswer: md`**Afterwave metric dictionary (illustrative thresholds).**
1. **Live ARR:** sum of annualised committed subscription fees for contracts in service at month end; excludes pilots, services, hardware, unsigned renewals. Source: billing; owner: CEO. Trigger: month-on-month decline.
2. **Contracted ARR:** live ARR plus signed contracts not yet live. Trigger: contracted minus live above 30 % for 2 quarters (deployment bottleneck).
3. **Pilot conversion:** pilots converted to annual contracts within 90 days of pilot end / pilots ended. Source: CRM. Trigger: below 40 % over trailing 4 quarters.
4. **NRR:** ARR today from customers live 12 months ago / their ARR then. Owner: CEO. Trigger: below 100 %.
5. **GRR:** as NRR excluding expansion. Trigger: below 85 %.
6. **Logo churn:** customers whose contract ended without renewal in trailing 12 months / customers 12 months ago. Trigger: any churn in a strategic account.
7. **Gross margin by stream:** (revenue - COGS)/revenue for software, services and (later) hardware separately; COGS includes deployment engineering time. Source: accounting. Trigger: software GM below 65 %.
8. **Net burn and runway:** cash out minus cash in, 3-month average; runway = cash / forward net burn. Trigger: runway below 12 months.
9. **Burn multiple** (from EUR 1 m ARR): trailing-12-month net burn / net new ARR. Trigger: above 2.5.
10. **DSO and receivables over 60 days:** receivables / revenue x 365; list of invoices past 60 days. Source: accounting; owner: finance lead. Trigger: any invoice over 90 days or DSO above 75.
Definitions are fixed; any change is noted and history restated.`,
            explanation: md`Graded against the rubric. A good dictionary removes ambiguity and makes every metric auditable.`,
            concepts: ["fc06.arr-bridge", "fc06.retention", "fc06.burn-multiple", "fc06.hardware-economics"],
            difficulty: 2,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "fc06-l03-q1",
      type: "numeric",
      prompt: md`Starting cohort ARR EUR 2.0 m; expansion 0.5 m; contraction 0.1 m; churn 0.2 m. NRR in %?`,
      answer: 110,
      tolerance: { abs: 0.1 },
      unit: "%",
      explanation: md`$(2.0 + 0.5 - 0.1 - 0.2)/2.0 = 2.2/2.0 = 110\,\%$. GRR would be $1.7/2.0 = 85\,\%$.`,
      concepts: ["fc06.retention"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc06-l03-q2",
      type: "numeric",
      prompt: md`Net burn over 12 months EUR 3.0 m; ARR grew from EUR 1.5 m to EUR 3.5 m. Burn multiple?`,
      answer: 1.5,
      tolerance: { abs: 0.01 },
      explanation: md`Net new ARR $= 2.0$ m; $3.0/2.0 = 1.5$: "great" on Sacks' scale.`,
      concepts: ["fc06.burn-multiple"],
      difficulty: 1,
    },
    {
      id: "fc06-l03-q3",
      type: "mcq",
      prompt: "A company loses 1 of 25 customers, but it was the largest, with 30 % of ARR. Which is true?",
      options: [
        "Logo churn 4 %, revenue churn 30 %",
        "Logo churn 30 %, revenue churn 4 %",
        "Both 4 %",
        "NRR is unaffected",
      ],
      answer: 0,
      explanation: md`Logo churn counts customers (1/25); revenue churn counts money (30 %). Concentration risk shows up only in revenue churn.`,
      concepts: ["fc06.retention"],
      difficulty: 1,
    },
    {
      id: "fc06-l03-q4",
      type: "multi",
      prompt: "Which should be excluded from ARR? (Select all.)",
      options: [
        "A EUR 30k one-off paid pilot",
        "A signed 3-year subscription live since last month",
        "Hardware sold outright",
        "Installation and training fees",
        "A committed annual price escalator already in effect",
      ],
      answer: [0, 2, 3],
      explanation: md`ARR is committed, recurring and live. Pilots, outright hardware and one-off services are non-recurring. A live subscription and an escalator already in effect are recurring.`,
      concepts: ["fc06.arr-bridge"],
      difficulty: 1,
    },
    {
      id: "fc06-l03-q5",
      type: "numeric",
      prompt: md`Revenue mix: 60 % software at 78 % GM, 40 % hardware at 32 % GM. Blended gross margin in %?`,
      answer: 59.6,
      tolerance: { abs: 0.1 },
      unit: "%",
      explanation: md`$0.6\times 78 + 0.4\times 32 = 46.8 + 12.8 = 59.6\,\%$. Present both streams; blended alone hides the hardware drag.`,
      concepts: ["fc06.hardware-economics"],
      difficulty: 1,
    },
    {
      id: "fc06-l03-q6",
      type: "decision",
      prompt: md`Mizan is offered a public-sector order for 50 hardware units (gross margin 28 %). Supplier wants full prepayment; the buyer pays 150 days after delivery; you have 7 months of runway. What do you do?`,
      options: [
        { text: "Accept as is: it is profitable.", score: 0.2, feedback: "Profitable, but the cash is out for roughly 8 months, longer than your runway. Profit does not pay salaries." },
        { text: "Accept only with working-capital cover: negotiate an advance payment (against a bank guarantee), supplier terms or trade finance, and model the cash impact month by month first.", score: 1, feedback: "Correct: protect cash first, then take the margin." },
        { text: "Decline all hardware business permanently.", score: 0.3, feedback: "Too blunt: distribution can be good business once working capital is financed." },
      ],
      explanation: md`CCC here is roughly DIO + 150 days with DPO 0: a large cash hole relative to a 7-month runway. Structure the deal before accepting it.`,
      concepts: ["fc06.hardware-economics", "fc06.working-capital"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "fc06-l03-f1", front: "ARR bridge", back: md`$ARR_1 = ARR_0 + \text{new} + \text{expansion} - \text{contraction} - \text{churn}$`, concepts: ["fc06.arr-bridge"] },
    { id: "fc06-l03-f2", front: "NRR vs GRR", back: "NRR includes expansion and can exceed 100 %; GRR excludes expansion and is capped at 100 %.", concepts: ["fc06.retention"] },
    { id: "fc06-l03-f3", front: "Burn multiple and bands", back: "Net burn / net new ARR. <1 amazing, 1-1.5 great, 1.5-2 good, 2-3 suspect, >3 bad (Sacks).", concepts: ["fc06.burn-multiple"] },
    { id: "fc06-l03-f4", front: "Rule of 40", back: "Growth % + profit (FCF or EBITDA) margin % >= 40, for scaled software; noise at seed.", concepts: ["fc06.burn-multiple"] },
    { id: "fc06-l03-f5", front: "Cash conversion cycle", back: "CCC = DIO + DSO - DPO: days cash is tied up between paying suppliers and collecting from customers.", concepts: ["fc06.hardware-economics"] },
    { id: "fc06-l03-f6", front: "Markup vs margin", back: "40 % markup on cost = 28.6 % gross margin.", concepts: ["fc06.hardware-economics"] },
    { id: "fc06-l03-f7", front: "Logo vs revenue churn", back: "Logo churn counts customers lost; revenue churn counts ARR lost. Losing one big customer: low logo churn, high revenue churn.", concepts: ["fc06.retention"] },
  ],
};

export default lesson;
