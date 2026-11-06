import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc06-l01",
  title: "Accounting basics: the three statements and how they link",
  summary:
    "P&L, balance sheet and cash flow statement as one connected system: accrual vs cash, deferred revenue, receivables and payables, capitalised costs and depreciation, built up as a complete three-statement example for an illustrative first Afterwave year.",
  minutes: 75,
  objectives: [
    "Explain what each of the three statements measures and how a transaction flows through all three",
    "Distinguish accrual profit from cash and reconcile them with the indirect cash flow method",
    "Treat upfront annual billing correctly: revenue recognised ratably, the rest held as deferred revenue",
    "Explain what capitalising a cost does (and does not do) to profit, assets and cash",
    "Build and tie out a simple three-statement model for one of your ventures",
  ],
  concepts: [
    { id: "fc06.three-statements", name: "The three financial statements", description: "P&L (performance over a period), balance sheet (position at a point in time) and cash flow statement (cash movements over a period), linked through net income, cash and working capital.", competency: "fc-finance", related: ["m10.model-structure"] },
    { id: "fc06.accrual-vs-cash", name: "Accrual vs cash accounting", description: "Accrual accounting records revenue when earned and costs when incurred; cash accounting records money when it moves. The difference sits in working-capital accounts.", competency: "fc-finance" },
    { id: "fc06.deferred-revenue", name: "Deferred revenue and revenue recognition", description: "Cash or invoices received before the service is delivered are a liability, released to revenue as the obligation is satisfied (IFRS 15 / ASC 606).", competency: "fc-finance" },
    { id: "fc06.capitalisation", name: "Capitalised costs, depreciation and amortisation", description: "Spending that creates a multi-year asset goes to the balance sheet and is expensed over its useful life; cash leaves when paid regardless.", competency: "fc-finance" },
    { id: "fc06.working-capital", name: "Working capital", description: "Receivables plus inventory minus payables and deferred revenue: the cash tied up (or supplied) by the timing gap between accrual and cash.", competency: "fc-finance", related: ["fc06.accrual-vs-cash"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Three views of one company",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You will sign off Afterwave's board pack, answer a YC partner's "what's your burn?", sit through security-review-driven enterprise procurement where payment terms run 60 to 90 days, and run Mizan through Kuwaiti public buyers who pay late. Every one of those conversations assumes you read the three statements fluently and know why profit and cash diverge. Engineering partners build the product; the numbers that decide whether the company survives are yours.`,
        },
        {
          kind: "md",
          md: md`### What each statement answers

| Statement | Question it answers | Time basis | Key lines for a startup |
|---|---|---|---|
| **P&L** (income statement) | Did we create or destroy value this period? | Flow over a period | Revenue, COGS, gross profit, opex (R&D, S&M, G&A), EBITDA, depreciation, net income |
| **Balance sheet** | What do we own and owe right now? | Snapshot at a date | Cash, receivables, inventory, equipment, capitalised costs; payables, deferred revenue, loans, convertibles; equity |
| **Cash flow statement** | Where did the cash come from and go? | Flow over a period | Operating, investing, financing cash flows |

The balance sheet obeys one identity, enforced by double entry:`,
        },
        { kind: "equation", formula: "fc06-accounting-identity" },
        {
          kind: "md",
          md: md`### Accrual vs cash: the mechanism

Accrual accounting asks **when was the value earned or the cost incurred?** Cash asks **when did the money move?** Every gap between the two is parked in a balance sheet account:

| Event | P&L effect | Cash effect | Balance sheet account that absorbs the gap |
|---|---|---|---|
| Deliver a pilot, invoice on 60-day terms | Revenue now | Cash later | **Accounts receivable** (asset) up |
| Bill a 12-month licence upfront, customer pays | Revenue month by month | All cash now | **Deferred revenue** (liability) up, then released |
| Receive a supplier invoice, pay in 30 days | Cost now | Cash later | **Accounts payable** (liability) up |
| Buy a EUR 60k test rig | EUR 20k a year over 3 years | EUR 60k now | **Equipment** (asset), depreciated |
| Buy 50 sensor kits for resale | Cost when each is sold | Cash now | **Inventory** (asset) |

Deferred revenue follows the revenue recognition rule (IFRS 15 internationally, ASC 606 in the US): a subscription is an obligation satisfied over time, so it is recognised evenly over the term, whatever the billing schedule.`,
        },
        { kind: "equation", formula: "fc06-revenue-recognition" },
        {
          kind: "md",
          md: md`### Capitalised costs

Capitalising means **recording spending as an asset instead of an expense**, then expensing it over its useful life (depreciation for tangible assets, amortisation for intangibles).`,
        },
        { kind: "equation", formula: "fc06-straight-line-dep" },
        {
          kind: "md",
          md: md`Two rules to hold on to:

1. **Capitalisation changes profit timing, never cash.** The rig money leaves the bank on the day you pay.
2. **Development costs** may be capitalised under IAS 38 only when strict criteria are met (technical feasibility, intention and ability to complete and use or sell, probable future benefits, resources to finish, reliable measurement). Research is always expensed. Most early-stage startups expense all R&D; investors look through capitalised development anyway and compare cash burn.

### How the statements link

The cash flow statement is derived from the other two. Start from net income and reverse everything accrual accounting did that did not move cash:`,
        },
        { kind: "equation", formula: "fc06-ocf-indirect" },
        { kind: "equation", formula: "fc06-cash-roll" },
        {
          kind: "flow",
          title: "How one period flows through the three statements",
          steps: [
            { label: "Transactions", detail: "Invoices, payments, payroll, purchases, equity raised" },
            { label: "P&L", detail: "Revenue earned minus costs incurred gives net income" },
            { label: "Retained earnings", detail: "Net income added to equity on the balance sheet" },
            { label: "Cash flow statement", detail: "Net income + non-cash items - change in working capital, then investing and financing" },
            { label: "Balance sheet cash", detail: "Closing cash from the cash flow statement must equal the cash line" },
            { label: "Check", detail: "Assets = liabilities + equity; if not, find the bug" },
          ],
          caption: "Net income links the P&L to equity; the cash flow statement links the opening and closing cash on the balance sheet.",
        },
      ],
    },
    {
      layer: "applied",
      title: "A complete three-statement year",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Afterwave, first operating year (illustrative numbers only)",
          given: md`Illustrative, not Afterwave data. Opening balance sheet all zero. During the year:
- Raise **EUR 1,500k** equity in January.
- Sign one annual Enclave + Lockstep licence of **EUR 120k**, starting 1 October, invoiced and paid upfront in October.
- Deliver one paid pilot for **EUR 40k** in December, invoiced on 60-day terms (unpaid at year end).
- Direct delivery costs (hosting, on-site deployment travel): **EUR 14k**, paid.
- Salaries **EUR 600k**, paid. Other opex **EUR 150k**, of which **EUR 20k** still unpaid at year end.
- Buy a test rig for **EUR 60k** on 1 January; 3-year life, no residual.`,
          steps: [
            { md: md`**Revenue.** Licence: $120 \times 3/12 = 30$ (Oct to Dec). Pilot: 40 (delivered). Total **EUR 70k**. Deferred revenue at year end: $120 - 30 = 90$.` },
            {
              md: md`**P&L (EUR k)**

| Line | Amount |
|---|---|
| Revenue | 70 |
| COGS | (14) |
| **Gross profit** (GM 80 %) | **56** |
| Salaries | (600) |
| Other opex | (150) |
| **EBITDA** | **(694)** |
| Depreciation $60/3$ | (20) |
| **Net income** (no tax on a loss) | **(714)** |`,
            },
            {
              md: md`**Cash flow statement (EUR k), indirect method**

| Line | Amount |
|---|---|
| Net income | (714) |
| + Depreciation | 20 |
| - Increase in receivables | (40) |
| + Increase in payables | 20 |
| + Increase in deferred revenue | 90 |
| **Cash from operations** | **(624)** |
| Capex (rig) | (60) |
| **Cash from investing** | **(60)** |
| Equity raised | 1,500 |
| **Cash from financing** | **1,500** |
| **Net change in cash** | **816** |

Direct check: cash in $= 120$; cash out $= 14 + 600 + 130 + 60 = 804$; plus equity 1,500: $1{,}500 + 120 - 804 = 816$.`,
            },
            {
              md: md`**Balance sheet at 31 December (EUR k)**

| Assets | | Liabilities and equity | |
|---|---|---|---|
| Cash | 816 | Accounts payable | 20 |
| Accounts receivable | 40 | Deferred revenue | 90 |
| Equipment, net $60 - 20$ | 40 | **Total liabilities** | **110** |
| | | Share capital | 1,500 |
| | | Retained earnings | (714) |
| | | **Total equity** | **786** |
| **Total assets** | **896** | **Total L + E** | **896** |`,
            },
            { md: md`**Read it like an investor.** Net loss 714, cash burn $1{,}500 - 816 = 684$. The 90 of deferred revenue is cash you hold but have not earned: you owe nine months of service. The 40 receivable is revenue you have not collected. Cash burn is the number that sets runway; net loss is the number that tells you whether the model works.` },
          ],
          result: md`Net income EUR -714k; operating cash flow EUR -624k; closing cash EUR 816k; balance sheet balances at EUR 896k. The two reconciling stories: upfront billing pulled EUR 90k of cash forward, the unpaid pilot invoice pushed EUR 40k back.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Mizan: upfront annual billing at a half-year close (illustrative)",
          given: md`Illustrative numbers. Mizan signs an annual soiling analytics subscription worth **KWD 24,000**, service starting **1 March**, invoiced on 1 March, paid on 1 May. What do the statements show at the **30 June** half-year close?`,
          steps: [
            { md: md`Monthly service value: $24{,}000/12 = 2{,}000$ KWD.` },
            { md: md`Service delivered 1 March to 30 June: 4 months, so revenue recognised $= 4\times 2{,}000 =$ **KWD 8,000**.`, hidden: true, check: { prompt: "Revenue recognised by 30 June (KWD)", answer: 8000, unit: "KWD", tolerance: { abs: 1 } } },
            { md: md`Deferred revenue $= 24{,}000 - 8{,}000 =$ **KWD 16,000** (a liability: eight months of service owed).`, hidden: true, check: { prompt: "Deferred revenue at 30 June (KWD)", answer: 16000, unit: "KWD", tolerance: { abs: 1 } } },
            { md: md`Receivable: invoice paid on 1 May, so **zero** at 30 June. Cash received: **KWD 24,000**. Between 1 March and 1 May the full 24,000 sat in receivables.` },
          ],
          result: md`At 30 June: revenue 8,000, deferred revenue 16,000, cash +24,000, receivable 0. Operating cash flow exceeds profit by the 16,000 increase in deferred revenue.`,
        },
        {
          kind: "question",
          question: {
            id: "fc06-l01-p1",
            type: "numeric",
            prompt: md`A hardware-plus-software startup reports for the year: net income EUR -300k, depreciation EUR 15k, receivables up EUR 25k, inventory up EUR 40k, payables up EUR 10k, deferred revenue up EUR 60k. What is cash from operations? (EUR k)`,
            answer: -280,
            tolerance: { abs: 0.5 },
            unit: "EUR k",
            explanation: md`$CFO = -300 + 15 - 25 - 40 + 10 + 60 = -280$. Asset increases (receivables, inventory) consume cash; liability increases (payables, deferred revenue) supply it. Here working capital was a small net source of cash (+5) because customers prepaid.`,
            concepts: ["fc06.accrual-vs-cash", "fc06.working-capital"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running the books in practice",
      blocks: [
        {
          kind: "md",
          md: md`### Who does what

- **Bookkeeper or outsourced finance firm:** records transactions monthly in an accounting system (Xero, Exact Online and Moneybird are common in the Netherlands; QuickBooks in the US; Zoho Books is common in the Gulf). Reconciles bank accounts.
- **Accountant:** year-end statutory accounts and tax filings. For a Dutch BV, annual accounts follow Title 9 of Book 2 of the Dutch Civil Code; Kuwaiti companies generally report under IFRS. A US Delaware C-corp (the usual YC structure) files US tax returns; audits are rarely required at seed.
- **You (CEO):** own the monthly close review, the management accounts and the cash forecast. Delegating bookkeeping is right; delegating understanding is not.

### The monthly close, in order

1. Bank reconciliation: every bank line matched to an invoice, bill or payroll run.
2. Revenue: recognise subscriptions ratably, move the rest to deferred revenue; book delivered pilots.
3. Accruals: costs incurred but not yet invoiced (lawyers, contractors, cloud usage).
4. Depreciation and any capitalised items.
5. Review P&L vs budget, balance sheet movements, and the cash forecast for the next 13 weeks.`,
        },
        { kind: "sources", refs: ["fc06-r1", "fc06-r2", "fc06-r3", "fc06-r19"] },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Booking upfront invoices as revenue.** A EUR 120k annual invoice is not EUR 120k of revenue this month. Investors re-cut your numbers in diligence and the trust cost is high.
- **Counting pilots or signed-but-not-live contracts as ARR.** Label them: contracted ARR vs live ARR, pilot revenue separately.
- **Capitalising development to make the P&L look better.** Cash burn does not change and every serious investor reverses it. Capitalised development also has legal consequences in some regimes (in the Netherlands, a legal reserve is required against capitalised development costs, which restricts distributions: confirm with your accountant).
- **Mixing personal and company spending in the founder period.** It makes the first diligence painful and can create tax issues.
- **VAT treated as revenue.** VAT collected is a liability to the tax authority, not income. Cross-border B2B services within the EU usually use reverse charge; check each contract.`,
        },
        {
          kind: "checklist",
          title: "Monthly finance pack you should see (and understand) by day 10",
          items: [
            "P&L for the month and year to date vs budget, with variances explained",
            "Balance sheet with receivables aged (0-30, 31-60, 61-90, 90+ days)",
            "Deferred revenue roll-forward: opening + billed - recognised = closing",
            "Cash flow statement and closing cash tied to the bank",
            "13-week cash forecast and months of runway",
            "ARR and MRR bridge (new, expansion, contraction, churn), separate from GAAP revenue",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask your bookkeeper or accountant",
          items: [
            "How are we recognising revenue on annual upfront contracts, pilots, installation and hardware? Show me the deferred revenue schedule.",
            "Which costs, if any, are we capitalising, under which policy, and what is the cash impact?",
            "Which customers are past 60 days, and what does that do to next month's cash?",
            "Are there accrued costs (legal, cloud, contractors) not yet in the books?",
            "What is our VAT position by country, and are any invoices missing reverse-charge wording?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc06-l01-p2",
            type: "short",
            prompt: md`Produce the first-year three-statement summary for **one** of your ventures (Afterwave, Mizan or Suhail) using clearly labelled illustrative numbers. Include: (1) at least one upfront or advance payment that creates deferred revenue, (2) at least one receivable from a slow-paying customer, (3) one capitalised asset with its depreciation, (4) the P&L, the indirect cash flow statement and the closing balance sheet, and (5) a three-sentence note explaining to a non-finance cofounder why net loss and cash burn differ.`,
            rubric: [
              "All numbers are labelled illustrative and no traction, customers or funding are presented as real",
              "Revenue is recognised correctly: ratable for subscriptions, on delivery for pilots or events, with a deferred revenue balance that reconciles (billed minus recognised)",
              "Indirect cash flow starts from net income, adds back depreciation and adjusts for each working-capital change with the right sign",
              "Balance sheet balances (assets equal liabilities plus equity) and closing cash equals the cash flow statement",
              "Capitalised asset appears in investing cash flow, on the balance sheet net of depreciation, and only depreciation hits the P&L",
              "The explanatory note names the specific reconciling items (deferred revenue, receivables, capex, depreciation) in plain language",
            ],
            modelAnswer: md`**Suhail, first year (illustrative).** Volunteer-led until revenue, so small numbers. Events: two hackathons. Sponsor A pays **USD 30k** in November for a hackathon held in February next year (deferred). Sponsor B, a university, owes **USD 12k** for a December event, payable in 90 days (receivable). Ticket revenue **USD 8k**, cash. Venue and catering **USD 14k**, paid. Tools and design contractor **USD 9k**, of which **USD 2k** unpaid. Recording kit for The Majlis podcast **USD 6k**, 3-year life (depreciation 2k). Founder grant/donation recorded as capital contribution **USD 20k**.

**P&L:** revenue $12 + 8 = 20$; event costs (14); gross profit 6; tools (9); EBITDA (3); depreciation (2); net income **(5)**.

**Cash flow:** NI (5) + depreciation 2 - receivables increase (12) + payables increase 2 + deferred revenue increase 30 = **CFO 17**; capex (6); capital contributed 20; net change **31**.

**Balance sheet:** cash 31, receivable 12, kit net 4: assets **47**. Payables 2, deferred revenue 30: liabilities 32. Capital 20, retained earnings (5): equity 15. L + E **47**. Balances.

**Note to cofounder:** We lost USD 5k on paper but hold USD 31k because Sponsor A paid 30k early for an event we still owe them; that cash is a liability, not profit. The university still owes us 12k, which is income we have booked but not banked. The podcast kit cost 6k in cash this year but only 2k in the P&L because it lasts three years.`,
            explanation: md`Graded against the rubric. The core skill is the tie-out: deferred revenue, receivables and capex explain the gap between profit and cash, and the balance sheet balances.`,
            concepts: ["fc06.three-statements", "fc06.deferred-revenue", "fc06.capitalisation"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to Ismail, in under two minutes, why Afterwave can have a EUR 714k loss and still have more cash than it would have had without the October contract, and why that cash is not 'ours' yet.",
          keyPoints: [
            "Revenue is recognised as service is delivered, not when the invoice is paid",
            "Upfront payment creates deferred revenue: a liability for service still owed",
            "Operating cash flow = net income + non-cash items - increase in working capital assets + increase in working capital liabilities",
            "Runway depends on cash burn, viability depends on the P&L and unit economics",
            "If the customer cancelled and was owed a refund, the deferred revenue would turn back into cash out",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "fc06-l01-q1",
      type: "mcq",
      prompt: "A customer pays EUR 36k on 1 January for a 3-year licence starting that day. What appears on the balance sheet at 31 December of year 1?",
      options: [
        "Deferred revenue EUR 36k",
        "Deferred revenue EUR 24k",
        "Retained earnings EUR 36k",
        "Accounts receivable EUR 24k",
      ],
      answer: 1,
      explanation: md`Revenue recognised in year 1 $= 36/3 = 12$; the remaining 24 is still owed as service, so deferred revenue is 24. Cash of 36 was received; nothing is receivable.`,
      concepts: ["fc06.deferred-revenue"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc06-l01-q2",
      type: "numeric",
      prompt: md`Net income EUR -450k, depreciation EUR 30k, receivables up EUR 80k, payables up EUR 20k, deferred revenue down EUR 10k. Cash from operations? (EUR k)`,
      answer: -490,
      tolerance: { abs: 0.5 },
      unit: "EUR k",
      explanation: md`$-450 + 30 - 80 + 20 - 10 = -490$. A fall in deferred revenue means you delivered service paid for earlier: revenue without cash, so it consumes cash in this period.`,
      concepts: ["fc06.accrual-vs-cash", "fc06.working-capital"],
      difficulty: 2,
    },
    {
      id: "fc06-l01-q3",
      type: "multi",
      prompt: "Which of these increase cash from operations relative to net income? (Select all.)",
      options: [
        "Customers prepay annual subscriptions",
        "Receivables grow because a public buyer pays late",
        "Depreciation on test equipment",
        "Buying inventory ahead of a hardware delivery",
        "Paying suppliers later (payables increase)",
      ],
      answer: [0, 2, 4],
      explanation: md`Prepayments (deferred revenue up) and payables up are sources of cash; depreciation is a non-cash expense added back. Late receivables and inventory build-up consume cash.`,
      concepts: ["fc06.working-capital", "fc06.capitalisation"],
      difficulty: 1,
    },
    {
      id: "fc06-l01-q4",
      type: "mcq",
      prompt: "A founder proposes capitalising EUR 200k of engineering salaries as development cost. What changes this year?",
      options: [
        "Cash burn falls by EUR 200k",
        "Net loss falls by up to EUR 200k (less any amortisation), cash burn is unchanged",
        "Runway increases because assets increase",
        "Nothing changes in any statement",
      ],
      answer: 1,
      explanation: md`Capitalisation moves the cost from opex to an asset (and the cash outflow from operating to investing). Total cash spent is the same, so runway is the same. Investors compare cash burn and will usually reverse the capitalisation.`,
      concepts: ["fc06.capitalisation"],
      difficulty: 2,
    },
    {
      id: "fc06-l01-q5",
      type: "order",
      prompt: "Order the steps of a monthly close.",
      items: [
        "Reconcile bank accounts to transactions",
        "Recognise revenue and update deferred revenue",
        "Book accruals for costs incurred but not invoiced",
        "Post depreciation and capitalised items",
        "Review P&L vs budget and update the cash forecast",
      ],
      explanation: md`Bank first (the hard truth), then revenue and accruals, then non-cash entries, then analysis. Reviewing before the books are complete produces variances that are just missing entries.`,
      concepts: ["fc06.three-statements"],
      difficulty: 1,
    },
    {
      id: "fc06-l01-q6",
      type: "decision",
      prompt: md`A seed investor's analyst asks for "revenue for the last 12 months". Your finance pack shows GAAP revenue EUR 210k, of which EUR 90k is one-off pilots, and EUR 160k of billed-but-deferred licence fees. What do you send?`,
      options: [
        { text: "EUR 370k: revenue plus deferred revenue, since the cash is in the bank.", score: 0, feedback: "Deferred revenue is not revenue. Diligence will re-cut it and your credibility takes the hit." },
        { text: "EUR 210k GAAP revenue, split into recurring (120k) and pilots (90k), plus current ARR and the deferred revenue balance as separate labelled lines.", score: 1, feedback: "Correct: accurate, decomposed, and it surfaces the good news (prepaid contracts) without mislabelling it." },
        { text: "EUR 210k with no split.", score: 0.5, feedback: "Accurate but hides the quality of revenue; the analyst will ask anyway, and recurring vs one-off is what drives valuation." },
      ],
      explanation: md`Give the accounting number, decompose by quality, and present ARR and deferred revenue as clearly labelled operating metrics.`,
      concepts: ["fc06.deferred-revenue", "fc06.three-statements"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "fc06-l01-f1", front: "Accounting identity", back: md`$A = L + E$; every transaction keeps it balanced (double entry).`, concepts: ["fc06.three-statements"] },
    { id: "fc06-l01-f2", front: "What links the P&L to the balance sheet?", back: "Net income flows into retained earnings (equity).", concepts: ["fc06.three-statements"] },
    { id: "fc06-l01-f3", front: "Deferred revenue is a ... ?", back: "Liability: cash or invoices received for service you still owe; released to revenue as you deliver.", concepts: ["fc06.deferred-revenue"] },
    { id: "fc06-l01-f4", front: "Indirect CFO formula", back: md`$CFO = NI + D\&A - \Delta AR - \Delta Inv + \Delta AP + \Delta DR$`, concepts: ["fc06.accrual-vs-cash"] },
    { id: "fc06-l01-f5", front: "Does capitalising a cost change cash?", back: "No. It changes profit timing and moves the outflow from operating to investing.", concepts: ["fc06.capitalisation"] },
    { id: "fc06-l01-f6", front: "Illustrative Afterwave year: net loss vs cash burn", back: "Net loss EUR 714k, cash burn EUR 684k; deferred revenue (+90) and payables (+20) offset receivables (-40) and capex (-60), with depreciation +20.", concepts: ["fc06.working-capital"] },
    { id: "fc06-l01-f7", front: "IAS 38: research vs development", back: "Research is always expensed; development may be capitalised only when feasibility, intent, ability, probable benefit, resources and reliable measurement are all shown.", concepts: ["fc06.capitalisation"] },
  ],
};

export default lesson;
