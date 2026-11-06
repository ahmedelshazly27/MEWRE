import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh07-l03",
  title: "Unit economics of a community business: contribution by stream, sponsor lifetime value and concentration risk",
  summary:
    "How to turn a community's activities into numbers: contribution margin per stream, operating surplus, sponsor lifetime value and payback, revenue per active member, and the concentration index that tells you how many real revenue sources you have. Built on an illustrative Suhail year-1 mix.",
  minutes: 80,
  objectives: [
    "Build a revenue mix by stream and compute contribution, blended margin and operating surplus",
    "Compute sponsor LTV, LTV/CAC and payback from package value, fulfilment margin and renewal rate",
    "Compute the concentration index and effective number of revenue sources, by stream and by payer",
    "Quantify what losing the largest payer does to the surplus and set a concentration guardrail",
    "Explain why revenue per active member, not list size, is the community metric that ties to money",
  ],
  concepts: [
    { id: "sh07.stream-contribution", name: "Contribution by stream", description: "Revenue minus direct delivery cost per stream; streams differ wildly in margin, so time and attention go where contribution per lead-hour is highest, not where revenue is largest.", competency: "sh-org", related: ["fc06.contribution-margin"] },
    { id: "sh07.concentration-risk", name: "Concentration risk", description: "Dependence on one stream or one payer, measured by the largest share and by the Herfindahl index; a community company whose largest sponsor is above about a quarter of revenue is one email from a crisis.", competency: "sh-org", related: ["sh07.stream-contribution", "sh07.sponsorship-model"] },
    { id: "sh07.sponsor-ltv", name: "Sponsor lifetime value", description: "Annual package value times fulfilment margin times expected years retained (1/(1-r)); compared with the cost of winning the sponsor.", competency: "sh-org", related: ["fc06.ltv", "fc06.cac-payback"] },
    { id: "sh07.revenue-per-member", name: "Revenue per active member", description: "Annual revenue divided by members active that year; the link between community quality and income, since sponsors and employers pay for access to active builders.", competency: "sh-org", related: ["sh07.stream-contribution"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "From activities to a profit and loss by stream",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Community businesses fail quietly: every event is full, the newsletter grows, and the organisation still cannot pay anyone because the busy streams have thin margins and one sponsor carries the rest. Before Suhail's first sponsor signs, you want a model that shows which streams contribute, how many real sources of money there are, and what the year looks like if the largest payer walks away.`,
        },
        {
          kind: "md",
          md: md`### Contribution, not revenue

Split every cost into **direct costs** of a stream (venue, food, prizes, production, fulfilment of sponsor deliverables, grant delivery) and **fixed costs** that exist whatever you run (tools, accounting, legal, insurance, and later paid staff).`,
        },
        { kind: "equation", formula: "sh07-contribution" },
        {
          kind: "md",
          md: md`A conference can bring the most revenue and contribute the least; a restricted grant is mostly spent on the project it funds. A job board can be tiny and contribute almost all of what it earns. Leads' time is the binding constraint while they are unpaid, so the useful ranking is **contribution per lead-hour**.

### Concentration

Compute shares by stream and by payer, then the concentration index:`,
        },
        { kind: "equation", formula: "sh07-revenue-share" },
        { kind: "equation", formula: "sh07-hhi" },
        {
          kind: "md",
          md: md`$H$ runs from $1/N$ (all $N$ sources equal) to 1 (one source). $N_{\text{eff}} = 1/H$ is easier to read: "our six streams behave like 4.3 equal ones". The payer view matters more, because one cloud provider may sponsor hackathons, the conference and the newsletter at once. MLH's rule for events (top tier at most 25 % of the budget) translates into a guardrail for the organisation: **no single payer above about 25 % of annual revenue**, and a written plan when one approaches it.

### Sponsor lifetime value

A sponsor is a customer with an annual contract. With package value $P$, fulfilment margin $m$ and renewal rate $r$, expected years retained is $\sum_{t=0}^{\infty} r^t = 1/(1-r)$:`,
        },
        { kind: "equation", formula: "sh07-sponsor-ltv" },
        {
          kind: "md",
          md: md`The unit-economics calculator below is built for monthly subscriptions, so enter the sponsor as a monthly equivalent: price $P/12$, gross margin $m$, and monthly churn $1 - r^{1/12}$ (an annual renewal of 60 % is a monthly churn of about 4.2 %).`,
        },
        {
          kind: "widget",
          widget: "unit-economics",
          props: { price: 1667, grossMargin: 50, cac: 5000, churn: 4.2, cash: 60000, burn: 2500 },
          caption: "Illustrative Suhail sponsor: USD 20,000 a year (about 1,667 a month), 50 % margin after fulfilment, USD 5,000 to win, 60 % annual renewal (4.2 % monthly churn). Push churn down to 2 % and watch LTV roughly double: renewal is where sponsor economics are won.",
        },
        { kind: "equation", formula: "sh07-arpm" },
        {
          kind: "xref",
          to: "fc06-l02",
          note: "Founder Core derives CAC, LTV, payback and contribution margin for subscription companies; this lesson only adapts them to sponsors, events and a multi-stream community.",
        },
      ],
    },
    {
      layer: "applied",
      title: "An illustrative Suhail year 1",
      blocks: [
        {
          kind: "chart",
          chart: "stacked-bar",
          title: "Illustrative revenue mix and direct costs by stream, year 1 (USD thousand)",
          xKey: "stream",
          yLabel: "USD thousand",
          series: [
            { key: "direct", label: "Direct cost" },
            { key: "contribution", label: "Contribution" },
          ],
          data: [
            { stream: "Hackathon sponsorship", direct: 54, contribution: 36 },
            { stream: "Conference (sponsors + tickets)", direct: 55, contribution: 25 },
            { stream: "Grants and programmes", direct: 34, contribution: 6 },
            { stream: "Media sponsorship", direct: 6, contribution: 18 },
            { stream: "Job board and recruiting", direct: 3, contribution: 15 },
          ],
          caption: "Bar height is revenue. Illustrative only: Suhail has no sponsors, members or revenue yet. The two smallest streams contribute almost as much as the conference.",
        },
        {
          kind: "worked",
          mode: "worked",
          title: "Contribution, surplus and concentration for the illustrative year",
          given: md`Illustrative year-1 revenue (USD thousand): hackathon sponsorship 90 (six events at 15), conference sponsorship 60, conference tickets 20, media sponsorship 24, job board and recruiting 18, grants and programmes 40. Total $R = 252$. Direct costs: hackathons 54, conference 55, media 6, jobs 3, grant delivery 34. Fixed costs with unpaid leads: $F = 30$. One anchor sponsor (a cloud provider, illustrative) pays 30 for hackathons and 30 for the conference.`,
          steps: [
            { md: md`Contribution by stream: hackathons $90-54 = 36$ (40 %); conference $80-55 = 25$ (31 %); media $24-6 = 18$ (75 %); jobs $18-3 = 15$ (83 %); grants $40-34 = 6$ (15 %). Total contribution $= 100$.` },
            { md: md`Blended margin $\bar m = 100/252 = 39.7\%$. Operating surplus $S = 100 - 30 =$ **USD 70k** with unpaid leads.` },
            { md: md`Stream shares: $90/252 = 0.357$, $60/252 = 0.238$, $20/252 = 0.079$, $24/252 = 0.095$, $18/252 = 0.071$, $40/252 = 0.159$.` },
            { md: md`$H = 0.357^2 + 0.238^2 + 0.079^2 + 0.095^2 + 0.071^2 + 0.159^2 = 0.230$, so $N_{\text{eff}} = 1/0.230 = 4.3$: six streams behave like about four equal ones.` },
            { md: md`Payer view: the anchor sponsor pays $60/252 = 23.8\%$ of revenue, just under the 25 % guardrail. Its packages have a margin of about 45 % after fulfilment, so losing it removes $0.45 \times 60 = 27$ of contribution: the surplus falls from 70 to **USD 43k**.` },
            { md: md`Revenue per active member, if 1,500 builders were active in the year: $252{,}000/1{,}500 =$ USD 168.` },
          ],
          result: md`The illustrative year works only because leads are unpaid: a USD 70k surplus would not pay five leads. The job board and media streams earn 17 % of revenue but 33 % of contribution, and the anchor sponsor is close to the concentration limit. Those three facts, not the revenue total, should drive 2027 priorities.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: the sponsor's lifetime value",
          given: md`Illustrative sponsor package $P =$ USD 20,000 a year, fulfilment margin $m = 0.5$, renewal rate $r = 0.6$, cost to win CAC = USD 5,000 (about 40 hours of partnership time plus travel).`,
          steps: [
            {
              md: md`Expected years retained $1/(1-r)$.`,
              hidden: true,
              check: { prompt: "Expected years", answer: 2.5, unit: "years", tolerance: { abs: 0.01 } },
            },
            {
              md: md`$\text{LTV} = P\,m/(1-r)$.`,
              hidden: true,
              check: { prompt: "Sponsor LTV", answer: 25000, unit: "USD", tolerance: { rel: 0.01 } },
            },
            { md: md`LTV/CAC $= 25{,}000/5{,}000 = 5$; payback $= 5{,}000/(20{,}000 \times 0.5) = 0.5$ years.` },
          ],
          result: md`An LTV/CAC of 5 is healthy. Raising renewal to 75 % lifts LTV to USD 40,000 without a single new sponsor, which is why the post-event report is a revenue task.`,
        },
        {
          kind: "question",
          question: {
            id: "sh07-l03-p1",
            type: "numeric",
            prompt: md`Four revenue streams have shares 0.5, 0.2, 0.2 and 0.1. What is the effective number of sources $N_{\text{eff}}$? (2 decimals)`,
            answer: 2.94,
            tolerance: { abs: 0.02 },
            unit: "sources",
            explanation: md`$H = 0.25 + 0.04 + 0.04 + 0.01 = 0.34$; $N_{\text{eff}} = 1/0.34 = 2.94$. Four streams, but the organisation behaves as if it had fewer than three.`,
            concepts: ["sh07.concentration-risk"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running the numbers every month",
      blocks: [
        {
          kind: "md",
          md: md`### Who does it and with what

The **Finance Lead** keeps a monthly sheet with one row per stream and one per payer: revenue booked, cash received, direct costs, contribution, in-kind value (separately), and lead hours spent. The **Partnerships Lead** keeps the sponsor list with package value, renewal date, renewal probability and the owner of the relationship. Once a quarter the leads review three numbers: blended margin, largest payer share and $N_{\text{eff}}$ by payer.

### What to watch

- **Largest payer share** above 20 %: start replacing, not just adding.
- **Restricted share** rising: grants growing faster than earned income means a busier organisation with less freedom.
- **Contribution per lead-hour** by stream: the streams that burn volunteer time for little contribution are the ones that burn out leads.
- **Cash versus booked**: sponsors that pay after the event turn a surplus into an overdraft.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`**Counting in-kind credits as revenue** makes the year look twice as big. **Allocating no lead time** to streams hides that the conference consumed half of everyone's year. **Treating a grant as margin** when 85 % of it must be spent on delivery. **Ignoring payer overlap**: a sponsor that buys the hackathon, the newsletter and the conference is one relationship, and one risk.`,
        },
        {
          kind: "ask",
          title: "Questions to ask at each quarterly review",
          items: [
            "Which stream earns the most contribution per lead-hour, and are we spending our hours there?",
            "What is the largest payer's share, and what happens to the surplus if it does not renew?",
            "How much of next year's revenue is already contracted, and how much is a renewal we are hoping for?",
            "What share of income is restricted, and does the unrestricted part cover fixed costs?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "sh07-l03-p2",
            type: "short",
            prompt: md`**Build Suhail's illustrative 2027 revenue mix model.** Produce a table with at least five streams (revenue, direct cost, contribution, margin, share), the fixed costs, the operating surplus, $H$ and $N_{\text{eff}}$ by stream, the largest payer's share, and the surplus if that payer leaves. Then state two decisions the model leads you to. Label everything illustrative.`,
            rubric: [
              "Table is arithmetically consistent: contributions sum, shares sum to 1, margins correct",
              "Separates direct and fixed costs and treats in-kind separately from cash",
              "Computes H and N_eff correctly from the shares",
              "Identifies the largest payer (not only the largest stream) and recomputes the surplus without it using its margin",
              "Draws two concrete decisions from the numbers (e.g. shift lead time to high-contribution streams, cap or replace the anchor sponsor)",
              "No invented real sponsors or traction; all numbers labelled illustrative",
            ],
            modelAnswer: md`Illustrative 2027 (USD thousand):

| Stream | Revenue | Direct cost | Contribution | Margin | Share |
|---|---|---|---|---|---|
| Hackathon sponsorship | 90 | 54 | 36 | 40 % | 0.357 |
| Conference sponsorship and tickets | 80 | 55 | 25 | 31 % | 0.317 |
| Media sponsorship | 24 | 6 | 18 | 75 % | 0.095 |
| Job board and recruiting | 18 | 3 | 15 | 83 % | 0.071 |
| Grants and programmes | 40 | 34 | 6 | 15 % | 0.159 |
| **Total** | **252** | **152** | **100** | **39.7 %** | 1.000 |

Fixed costs (unpaid leads): 30. Operating surplus: 70. In-kind credits (not in the table): tracked separately.

Concentration by the six original streams (conference sponsorship and tickets split, 0.238 and 0.079): $H = 0.230$, $N_{\text{eff}} = 4.3$. Largest payer: an illustrative anchor cloud sponsor at 60, share 23.8 %, margin about 45 %; without it, contribution falls by 27 and the surplus to 43.

Decisions: (1) Move partnership time from conference sponsorship (31 % margin, high lead hours) towards hiring-partner packages and the job board (83 % margin), with a target of 25 % of contribution from talent revenue. (2) Cap the anchor sponsor at its current value and sign two additional hackathon sponsors before renewing it, so the largest payer falls below 20 %.`,
            explanation: md`The point of the model is the decisions it forces: where leads spend time and how much any single sponsor may matter.`,
            concepts: ["sh07.stream-contribution", "sh07.concentration-risk"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to the Partnerships Lead why signing a second USD 60k anchor sponsor can be worse for Suhail than signing four USD 15k sponsors, even though the revenue is the same.",
          keyPoints: [
            "Concentration: two large payers give a higher H and fewer effective sources than five similar ones",
            "Losing one large payer removes a large slice of contribution at once",
            "Large payers have more leverage over programme and editorial decisions",
            "Four sponsors also mean four renewal chances and more referrals, at the cost of more sales and fulfilment time",
          ],
        },
        { kind: "sources", refs: ["sh07-r13"] },
      ],
    },
  ],
  quiz: [
    {
      id: "sh07-l03-q1",
      type: "numeric",
      prompt: md`A stream earns USD 40k with USD 34k of direct cost. What is its contribution margin? (%)`,
      answer: 15,
      tolerance: { abs: 0.1 },
      unit: "%",
      explanation: md`$(40-34)/40 = 15\%$. Typical of a restricted grant: most of it is spent on delivery.`,
      concepts: ["sh07.stream-contribution"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh07-l03-q2",
      type: "numeric",
      prompt: md`Sponsor package USD 12,000 a year, fulfilment margin 60 %, renewal rate 50 %. LTV? (USD)`,
      answer: 14400,
      tolerance: { rel: 0.01 },
      unit: "USD",
      explanation: md`$\text{LTV} = 12{,}000 \times 0.6/(1-0.5) = 14{,}400$ USD.`,
      concepts: ["sh07.sponsor-ltv"],
      difficulty: 1,
    },
    {
      id: "sh07-l03-q3",
      type: "numeric",
      prompt: md`Three streams have shares 0.6, 0.3 and 0.1. Concentration index $H$? (3 decimals)`,
      answer: 0.46,
      tolerance: { abs: 0.002 },
      explanation: md`$0.36 + 0.09 + 0.01 = 0.46$; $N_{\text{eff}} = 2.17$.`,
      concepts: ["sh07.concentration-risk"],
      difficulty: 1,
    },
    {
      id: "sh07-l03-q4",
      type: "mcq",
      prompt: "Why should payer concentration be computed separately from stream concentration?",
      options: [
        "Because payers pay in different currencies",
        "Because one sponsor often buys across several streams, so stream diversity can hide dependence on one relationship",
        "Because streams have no risk",
        "Because the Herfindahl index only works for payers",
      ],
      answer: 1,
      explanation: md`A cloud provider sponsoring hackathons, the conference and the newsletter appears in three streams but is one renewal decision.`,
      concepts: ["sh07.concentration-risk"],
      difficulty: 2,
    },
    {
      id: "sh07-l03-q5",
      type: "numeric",
      prompt: md`An annual renewal rate of 70 % corresponds to what monthly churn? (%, 2 decimals)`,
      answer: 2.93,
      tolerance: { abs: 0.03 },
      unit: "%",
      explanation: md`Monthly retention $= 0.7^{1/12} = 0.9707$, so monthly churn $= 2.93\%$. Use this when entering a sponsor into a monthly subscription calculator.`,
      concepts: ["sh07.sponsor-ltv"],
      difficulty: 2,
    },
    {
      id: "sh07-l03-q6",
      type: "decision",
      prompt: md`Your quarterly review shows the conference uses 45 % of all lead hours for 25 % of contribution, while the job board uses 5 % of hours for 15 % of contribution. Leads are unpaid and tired. What do you do for 2027?`,
      options: [
        { text: "Cancel the conference", score: 0.3, feedback: "Too blunt: the conference may drive membership, sponsors and the brand that the job board depends on." },
        { text: "Keep the conference but cut its scope (one day, fewer tracks, partner-run production), and move freed hours to hiring-partner packages and the job board", score: 1, feedback: "Uses contribution per lead-hour to rebalance without destroying the flagship. Partner-run production converts lead hours into a direct cost you can price." },
        { text: "Double the conference to make it profitable", score: 0.1, feedback: "Doubles the fixed and volunteer load on the lowest-margin stream." },
        { text: "Change nothing; the conference brings the most revenue", score: 0, feedback: "Revenue is the wrong ranking when lead time is the binding constraint." },
      ],
      explanation: md`With unpaid leads, contribution per lead-hour is the constraint metric.`,
      concepts: ["sh07.stream-contribution"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "sh07-l03-f1", front: "Contribution by stream", back: md`$CM_i = R_i - V_i$; surplus $S = \sum CM_i - F$.`, concepts: ["sh07.stream-contribution"] },
    { id: "sh07-l03-f2", front: "Concentration index", back: md`$H = \sum s_i^2$, $N_{\text{eff}} = 1/H$. Illustrative Suhail mix: $H = 0.230$, $N_{\text{eff}} = 4.3$.`, concepts: ["sh07.concentration-risk"] },
    { id: "sh07-l03-f3", front: "Payer concentration guardrail", back: "No single payer above about 25 % of annual revenue (MLH's event rule applied to the organisation); start replacing above 20 %.", concepts: ["sh07.concentration-risk"] },
    { id: "sh07-l03-f4", front: "Sponsor LTV", back: md`$P\,m/(1-r)$. USD 20k, 50 %, 60 % renewal: USD 25k.`, concepts: ["sh07.sponsor-ltv"] },
    { id: "sh07-l03-f5", front: "Annual renewal to monthly churn", back: md`Monthly churn $= 1 - r^{1/12}$; 60 % renewal is about 4.2 % a month.`, concepts: ["sh07.sponsor-ltv"] },
    { id: "sh07-l03-f6", front: "Revenue per active member", back: "Revenue divided by members active in the year: what sponsors and employers really pay for. Illustrative: USD 252k / 1,500 = USD 168.", concepts: ["sh07.revenue-per-member"] },
  ],
};

export default lesson;
