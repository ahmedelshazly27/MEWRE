import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc07-l05",
  title: "Data Rooms and Investor Updates",
  summary:
    "Diligence is investors checking your claims; a data room makes that fast and in your control. Investor updates turn existing and future investors into a pipeline for the next round. Learn what goes in each, which metrics to report (cash, net burn, runway, ARR, burn multiple, pipeline), and how to write an update people read.",
  minutes: 60,
  objectives: [
    "Assemble a seed-stage data room and know what to hold back until a term sheet",
    "Compute runway, burn multiple and compound monthly growth from a month's numbers",
    "Write a monthly investor update with a fixed structure, honest metrics and specific asks",
    "Protect customer and personal data while sharing enough for diligence",
  ],
  concepts: [
    { id: "fc07.data-room", name: "Data room", description: "A structured, access-controlled folder of documents that let investors verify your claims (corporate, cap table, financials, customer evidence, product, team, legal), released in stages as the process advances.", competency: "fc-fundraising", related: ["m14.data-classification"] },
    { id: "fc07.investor-update", name: "Investor update", description: "A short, regular (usually monthly) email to investors and warm prospects with headline, metrics, wins, misses, and specific asks; it builds trust and the next round's pipeline.", competency: "fc-fundraising", related: ["fc07.data-room"] },
    { id: "fc07.startup-metrics", name: "Core startup metrics", description: "Cash, net burn, runway, ARR and its growth, burn multiple and stage-appropriate leading indicators (pilots, pipeline, usage), reported on a consistent definition every month.", competency: "fc-fundraising", related: ["fc07.round-sizing"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What diligence checks and what investors want to see every month",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You run several ventures; investors in any of them will judge you on how you report. A clean data room cuts weeks off Afterwave's seed and stops diligence from becoming a fishing trip into customer data you are contractually bound to protect (Enclave's whole point is that data stays private). A monthly update is the cheapest fundraising tool there is: the Series A lead is often someone who has read twelve of your updates.`,
        },
        {
          kind: "md",
          md: md`### What a data room is for

Diligence is the investor confirming that what you said is true and that nothing will blow up after they wire. The data room is the evidence, organised so a partner or their lawyer can find any answer in minutes.

| Section | Seed contents | Added at Series A |
|---|---|---|
| **Corporate** | Articles of association, registry extract (KvK for a BV; Delaware certificate if flipped), shareholder agreement, board and shareholder resolutions | Subsidiary structure, prior financing documents |
| **Cap table** | Fully diluted cap table with all SAFEs and convertibles, option pool, vesting schedules | Pro forma for the new round, 409A or equivalent valuation |
| **Financials** | Monthly P&L and cash for the last 12 months, budget, hiring plan, runway model | Audited or reviewed accounts, cohort and revenue analysis |
| **Customers** | Pilot and design-partner agreements (redacted where required), pipeline export, reference contacts | All customer contracts, renewal and churn history, win/loss |
| **Product and tech** | Architecture overview, security posture for on-prem deployments, roadmap | Security audits, open-source licence inventory |
| **IP** | IP assignment from every founder and contractor, patent filings if any | Freedom-to-operate notes |
| **Team** | Org chart, key contracts, ESOP plan | Employment contracts, policies |
| **Legal and compliance** | Material contracts, any disputes, grant and subsidy agreements (WBSO decisions, loan agreements) | Data-protection records, regulatory analysis (Machinery Regulation relevance) |

Release in stages: a **teaser set** (deck, one-pager, metrics) before the partner meeting, the **full room** after a term sheet or when a lead is clearly in process. Most VCs do not sign NDAs at first meetings; keep truly sensitive items (customer names under NDA, source code) for confirmatory diligence and share them under the term sheet's confidentiality clause.

### The metrics, defined once and reported the same way every month`,
        },
        { kind: "equation", formula: "fc07-runway" },
        { kind: "equation", formula: "fc07-burn-multiple" },
        { kind: "equation", formula: "fc07-cmgr" },
        {
          kind: "md",
          md: md`- **Cash:** bank balance at month end. Not "cash plus committed grants".
- **Net burn:** cash out minus cash in; report the trailing 3-month average as well as the month.
- **Runway:** cash divided by average net burn, and the month you run out ("zero-cash date").
- **ARR:** annualised value of signed recurring contracts. Pilots are not ARR; report them separately as pilot revenue and pilot count.
- **Burn multiple:** net burn divided by net new ARR. At seed it is usually high (above 3); what matters is the trend.
- **Leading indicators for Afterwave:** pilots active and their stage, rigs connected through Lockstep, Ripple recommendations accepted, security reviews passed, weighted pipeline.

Definitions must not change between updates. If they must, say so explicitly.

### The update structure

1. **Headline:** one sentence on the month.
2. **Metrics table:** same rows every month, with last month and target.
3. **Wins:** two to four concrete items.
4. **Misses and lowlights:** what went wrong and what you are doing about it. This section is what builds trust.
5. **Asks:** specific introductions or help ("intro to the head of validation at a European drive manufacturer").
6. **Thanks:** name the people who helped last month.

Short (under one screen), on the same day each month, from the CEO.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "Illustrative cash runway: hiring on plan vs front-loaded hiring",
          xKey: "month",
          xLabel: "Months after the seed closes",
          yLabel: "Cash (EUR m)",
          series: [
            { key: "plan", label: "On plan: EUR 115k/month" },
            { key: "frontloaded", label: "Front-loaded: EUR 150k/month from month 3" },
          ],
          data: [
            { month: 0, plan: 2.9, frontloaded: 2.9 },
            { month: 3, plan: 2.555, frontloaded: 2.555 },
            { month: 6, plan: 2.21, frontloaded: 2.105 },
            { month: 9, plan: 1.865, frontloaded: 1.655 },
            { month: 12, plan: 1.52, frontloaded: 1.205 },
            { month: 15, plan: 1.175, frontloaded: 0.755 },
            { month: 18, plan: 0.83, frontloaded: 0.305 },
            { month: 21, plan: 0.485, frontloaded: 0 },
            { month: 24, plan: 0.14, frontloaded: 0 },
          ],
          caption: "Illustrative. Front-loaded hiring runs out in about month 20 instead of 25, and the next raise must start around month 11 rather than month 16. Show investors the zero-cash date every month.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Computing the numbers for one month's update",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Afterwave month 9 after a seed (illustrative)",
          given: md`Illustrative numbers, not real data. Month-end cash EUR 2,180k. Gross spend this month EUR 128k; cash received EUR 18k (pilot invoices paid). Net burn for the last three months: EUR 98k, 107k and this month's figure. Signed ARR rose from EUR 90k to EUR 150k over the quarter. Rigs connected through Lockstep: 4 three months ago, 9 now.`,
          steps: [
            { md: md`**Net burn this month:** $128 - 18 = 110$ EUR k.` },
            { md: md`**Trailing 3-month average:** $(98 + 107 + 110)/3 = 105$ EUR k.` },
            { md: md`**Runway:** $R = 2{,}180/105 = 20.8$ months; zero-cash date about 21 months out. Start the Series A process no later than about 12 months from now (6 months of process plus buffer).` },
            { md: md`**Burn multiple (quarter):** net burn over the quarter $= 315$ EUR k; net new ARR $= 150 - 90 = 60$ EUR k; $\text{BM} = 315/60 = 5.25$. High, as expected at seed while the team is building; report the trend, not the level.` },
            { md: md`**Rig growth:** $g = (9/4)^{1/3} - 1 = 31\%$ per month over the quarter.` },
          ],
          result: md`Metrics table rows: cash EUR 2.18m; net burn EUR 110k (3-month average 105k); runway 20.8 months; ARR EUR 150k (+67 % QoQ); burn multiple 5.3 (quarter); rigs connected 9 (31 % CMGR). Every number traces back to the bank statement, contracts or product logs.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Next month's figures",
          given: md`Illustrative: month-end cash EUR 2,060k; trailing 3-month average net burn EUR 112k; over the last quarter net burn totalled EUR 336k while ARR rose from EUR 120k to EUR 204k.`,
          steps: [
            { md: md`Runway $= 2{,}060/112$.` },
            { md: md`= **18.4 months**.`, hidden: true, check: { prompt: "Runway (months)", answer: 18.4, unit: "months", tolerance: { abs: 0.1 } } },
            { md: md`Net new ARR $= 204 - 120 = 84$ EUR k; burn multiple $= 336/84$ = **4.0**.`, hidden: true, check: { prompt: "Burn multiple", answer: 4, tolerance: { abs: 0.05 } } },
          ],
          result: md`Runway fell by more than one month in one month (burn rising) while the burn multiple improved. Say both in the update; do not report only the good one.`,
        },
        {
          kind: "question",
          question: {
            id: "fc07-l05-p1",
            type: "numeric",
            prompt: md`A metric grows from 20 to 45 over 4 months. What is the compound monthly growth rate (%)?`,
            answer: 22.5,
            tolerance: { abs: 0.2 },
            unit: "%",
            explanation: md`$g = (45/20)^{1/4} - 1 = 2.25^{0.25} - 1 = 1.2247 - 1 = 22.5\%$ per month.`,
            concepts: ["fc07.startup-metrics"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running the data room and the update habit",
      blocks: [
        {
          kind: "md",
          md: md`### Tools and owners

- **Data room:** a shared drive with view-only links, or a virtual data room with per-document access logs. Name files consistently (01_Corporate/01.03_Shareholders_Agreement_2026-10.pdf). One owner (you), one index document.
- **Cap table:** a cap-table tool or a single controlled spreadsheet reconciled with the notary's shareholder register (BV) and every SAFE or convertible.
- **Financials:** bookkeeping system export reconciled to the bank monthly; an accountant reviews before it goes in the room.
- **Updates:** a template in your email tool; metrics pulled from one source of truth so numbers match the data room.

### Confidentiality

Customer test data, rig recordings and anything from inside a customer's Enclave never go into a data room. Pilot agreements often prohibit disclosure of the customer's name without consent: ask, or redact. Personal data (salaries, contracts) only to the lead and its lawyers, at confirmatory diligence.`,
        },
        {
          kind: "checklist",
          title: "Seed data room readiness",
          items: [
            "Fully diluted cap table reconciles with the shareholder register and every SAFE or convertible",
            "IP assignment signed by every founder, employee and contractor who wrote code or designs",
            "12 months of monthly P&L and cash reconciled to the bank",
            "Runway model with hiring plan and zero-cash date",
            "Pilot and design-partner agreements, redacted or with customer consent",
            "Security overview for on-prem deployment (what runs where, who has access)",
            "Grant and subsidy decisions (WBSO) and any loan agreements",
            "Index document with owner and last-updated date per file",
          ],
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Missing IP assignments:** the most common seed diligence finding, and a closing condition. Fix it before you raise.
- **Numbers that differ** between the deck, the update and the data room.
- **Updates that stop when things go badly:** silence is read as the worst case. Send the bad month.
- **Counting pilots as ARR**, or grants as cash.
- **Sharing customer data** to prove traction, breaching the contract that gave you the traction.`,
        },
        {
          kind: "question",
          question: {
            id: "fc07-l05-p2",
            type: "short",
            prompt: md`Write Afterwave's **first monthly investor update** (to angels, YC contacts and warm prospects), for a month of your choice. Use the six-part structure, a metrics table with consistent definitions, at least one honest lowlight, and two specific asks. Use bracketed placeholders or clearly labelled illustrative numbers; do not invent customers.`,
            rubric: [
              "Follows the structure: headline, metrics, wins, lowlights, asks, thanks",
              "Metrics table includes cash, net burn, runway and stage-appropriate leading indicators with clear definitions",
              "At least one honest lowlight with a corrective action",
              "Asks are specific (named role, company type, segment) and actionable by the reader",
              "Short and scannable (fits roughly one screen)",
              "No invented customers or revenue; placeholders or labelled illustrative numbers only",
            ],
            modelAnswer: md`**Subject: Afterwave update, [Month 2027]: first paid pilot live, security review slower than planned**

**Headline:** Our first paid pilot started on a drive test rig; the second is stuck in an on-prem security review.

| Metric (definition) | This month | Last month |
|---|---|---|
| Cash at month end | EUR [x]k | EUR [x]k |
| Net burn (cash out minus cash in) | EUR [x]k | EUR [x]k |
| Runway (cash / 3-month avg net burn) | [x] months | [x] months |
| Paid pilots active | [1] | [0] |
| Rigs connected via Lockstep | [x] | [x] |
| Ripple rerun lists accepted by test leads | [x] of [y] | n/a |
| Weighted pipeline (stage-probability) | EUR [x]k | EUR [x]k |

**Wins:** (1) First paid pilot live: Lockstep capturing [signals] on [rig type]. (2) Yusuf rebuilt the clock alignment so DAQ and screen events agree within [x] ms. (3) Two new discovery calls with battery test teams.

**Lowlight:** Pilot 2's IT security review has taken six weeks instead of two. We underestimated documentation. Fix: we are writing a standard on-prem security pack (architecture, data flows, access model) so the next review starts with answers.

**Asks:** (1) An intro to a head of validation at a European e-axle or inverter manufacturer. (2) Anyone who has sold on-prem software through a corporate security review in automotive: 30 minutes to review our security pack.

**Thanks:** [Name] for the intro to [company type]; [Name] for reviewing our pilot contract.`,
            explanation: md`An update is graded on trust signals: consistent definitions, a real lowlight with a fix, and asks precise enough that a reader knows whom to introduce.`,
            concepts: ["fc07.investor-update", "fc07.startup-metrics"],
            difficulty: 2,
          },
        },
        { kind: "xref", to: "m14.data-classification", note: "Classify documents before they enter the data room; the same rules apply to AI tools you use to prepare it." },
        { kind: "sources", refs: ["fc07-r1", "fc07-r3"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc07-l05-q1",
      type: "numeric",
      prompt: md`Cash EUR 1.5m, trailing 3-month average net burn EUR 125k. What is the runway (months)?`,
      answer: 12,
      tolerance: { abs: 0.05 },
      unit: "months",
      explanation: md`$R = 1{,}500/125 = 12$ months. With 3 to 6 months for a raise plus buffer, the next round should already be in preparation.`,
      concepts: ["fc07.startup-metrics"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc07-l05-q2",
      type: "numeric",
      prompt: md`Over a quarter a company burned EUR 600k net and added EUR 300k of net new ARR. What is its burn multiple?`,
      answer: 2,
      tolerance: { abs: 0.01 },
      explanation: md`$\text{BM} = 600/300 = 2.0$: every euro of new ARR cost two euros of burn.`,
      concepts: ["fc07.startup-metrics"],
      difficulty: 1,
    },
    {
      id: "fc07-l05-q3",
      type: "multi",
      prompt: "Which belong in a seed data room before a term sheet? (Select all that apply.)",
      options: [
        "Fully diluted cap table including SAFEs",
        "Raw test data recorded inside a customer's Enclave",
        "IP assignment agreements from founders and contractors",
        "Monthly P&L and cash for the last 12 months",
        "Unredacted customer contracts whose NDA forbids disclosure",
      ],
      answer: [0, 2, 3],
      explanation: md`Customer data never goes in the room; confidential contracts go in redacted or with consent, normally at confirmatory diligence.`,
      concepts: ["fc07.data-room"],
      difficulty: 1,
    },
    {
      id: "fc07-l05-q4",
      type: "order",
      prompt: "Order the sections of a monthly investor update.",
      items: ["Headline", "Metrics table", "Wins", "Lowlights and fixes", "Asks", "Thanks"],
      explanation: md`Readers scan the headline and metrics first; lowlights build trust; asks turn readers into help; thanks reinforce that help is noticed.`,
      concepts: ["fc07.investor-update"],
      difficulty: 1,
    },
    {
      id: "fc07-l05-q5",
      type: "decision",
      prompt: md`A bad month: a pilot paused and burn rose. Your angels are expecting the monthly update. What do you do?`,
      options: [
        { text: "Send it on schedule with the pause and burn as lowlights, the cause and your fix, and a specific ask.", score: 1, feedback: "Consistency in bad months is what makes investors trust good months." },
        { text: "Skip this month and send a combined update when the pilot restarts.", score: 0.1, feedback: "Silence is read as worse than the truth." },
        { text: "Send it but leave out the pilot pause.", score: 0, feedback: "They will find out; then every number you report is doubted." },
      ],
      explanation: md`Updates are a trust instrument. Their value comes from regularity and candour.`,
      concepts: ["fc07.investor-update"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc07-l05-f1", front: "Runway", back: md`$R = K/B_{\text{net}}$ using trailing 3-month average net burn; also state the zero-cash date.`, concepts: ["fc07.startup-metrics"] },
    { id: "fc07-l05-f2", front: "Burn multiple", back: md`$\text{BM} = B_{\text{net}}/\Delta\text{ARR}$; below 1 excellent, 1 to 2 good, above 3 a concern at growth stage.`, concepts: ["fc07.startup-metrics"] },
    { id: "fc07-l05-f3", front: "Pilots vs ARR", back: "Pilots are not ARR; report pilot count and pilot revenue separately from signed recurring contracts.", concepts: ["fc07.startup-metrics"] },
    { id: "fc07-l05-f4", front: "Most common seed diligence finding", back: "Missing IP assignments from founders or contractors.", concepts: ["fc07.data-room"] },
    { id: "fc07-l05-f5", front: "Update structure", back: "Headline, metrics, wins, lowlights, asks, thanks: under one screen, same day each month.", concepts: ["fc07.investor-update"] },
    { id: "fc07-l05-f6", front: "Staged data room release", back: "Teaser set before partner meeting; full room once a lead is in process; sensitive items under term-sheet confidentiality.", concepts: ["fc07.data-room"] },
  ],
};

export default lesson;
