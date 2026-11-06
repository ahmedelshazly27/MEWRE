import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh07-l04",
  title: "Governance and money: unpaid leads, equity or not, conflicts of interest and transparency",
  summary:
    "How a volunteer-led community company handles money fairly: a numeric rule for when leads start being paid, the options for rewarding leads (stipends, profit share, equity, phantom equity) and which structures allow each, how to run conflicts of interest when leads work for sponsors, investors or startups in the community, and what to publish so builders and sponsors trust the books.",
  minutes: 70,
  objectives: [
    "Write a numeric pay trigger for leads and compute the revenue needed to fund it",
    "Compare stipends, profit share, equity and phantom equity for leads, and state which a nonprofit may use",
    "Identify the four common conflicts of interest in a builder community and apply declare, record, recuse, approve",
    "Design payment controls (dual approval, separation of duties) for a small team",
    "Draft a transparency commitment that publishes enough to earn trust without exposing sponsors' commercial terms",
  ],
  concepts: [
    { id: "sh07.pay-trigger", name: "Lead pay trigger", description: "A written rule that leads start receiving stipends only when trailing surplus covers the stipend bill and unrestricted reserves cover k months of costs including stipends.", competency: "sh-org", related: ["sh07.stream-contribution", "fc09.contractor-volunteer"] },
    { id: "sh07.lead-equity", name: "Equity versus no equity for leads", description: "Leads can be rewarded with stipends, a profit-share pool, vested equity or phantom equity; equity exists only in a for-profit, vests over time, and is worth little unless the company can be sold or pay dividends.", competency: "sh-org", related: ["fc08.vesting-cliff", "sh07.legal-forms"] },
    { id: "sh07.conflict-of-interest", name: "Conflict of interest", description: "A lead's personal or employer interest that could influence a decision for Suhail: sponsor deals, judging, investor introductions, vendor choice. Managed by declaration, a register, recusal and approval by people without the interest.", competency: "sh-org", related: ["fc09.fiduciary-duty"] },
    { id: "sh07.financial-transparency", name: "Financial transparency", description: "Publishing revenue by stream, the sponsor list, how surplus is used, the conflict register summary and judging rules, so that builders and sponsors can check neutrality without needing to trust individuals.", competency: "sh-org", related: ["sh07.conflict-of-interest"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Paying people, sharing upside and keeping decisions clean",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Suhail's leads (Partnerships, Events and Programming, Editorial, Head of Engineering, Finance Lead) are unpaid until revenue. That arrangement works for months, not years, and it breaks in predictable ways: an argument about who gets paid first, a lead whose employer becomes a sponsor, a hackathon won by a lead's friend. Every one of those is cheaper to solve with a rule written before the money arrives than with a conversation after.`,
        },
        {
          kind: "md",
          md: md`### When do volunteers start being paid?

"When there is revenue" is not a rule; the first sponsor cheque will be followed by a request to pay everyone. A rule has two tests: is pay affordable from **operations** (not from one lucky sponsor), and does the organisation **survive a bad quarter** after pay starts.`,
        },
        { kind: "equation", formula: "sh07-pay-trigger" },
        { kind: "equation", formula: "sh07-required-revenue" },
        {
          kind: "md",
          md: md`### Four ways to reward leads

| Reward | What it is | Allowed in a nonprofit? | Works when | Problem |
|---|---|---|---|---|
| **Stipend** | Fixed monthly amount, below market pay | Yes, if reasonable for the work | Revenue is recurring and the trigger is met | Creates two classes if only some leads are paid |
| **Profit-share pool** | A share of surplus above the reserve target, split by points | Risky: pay tied to net revenue can look like distributing surplus | Surplus exists but is volatile | Leads may favour short-term sponsor deals |
| **Equity** (shares or options, vested) | Ownership in a for-profit company | No (no shares) | The company may be sold, raise money or pay dividends | Worth nothing if neither ever happens; dilutes future hires and investors |
| **Phantom equity** | A contract paying a share of sale proceeds or dividends as if the lead held shares | No | You want upside alignment without shareholders on the register | Taxed as income in many places; needs a lawyer |

Equity follows the normal rules: **vesting** over about four years with a one-year cliff, a leaver clause, and a clear pool size. A typical community-company shape (illustrative, not a recommendation): founders hold the company, a 10 % pool is reserved for leads, each core lead receives 1 to 2 % vesting over four years, and stipends replace equity grants once the pay trigger is met for new leads.`,
        },
        {
          kind: "matrix",
          title: "Which reward fits which lead",
          xAxis: ["Occasional contribution", "Core, weekly commitment"],
          yAxis: ["No recurring revenue yet", "Recurring revenue"],
          cells: [
            { label: "Recognition and expenses", detail: "Named credit, expenses reimbursed, first refusal on paid roles later." },
            { label: "Vested equity or phantom equity (for-profit only)", detail: "Upside for people building the organisation before it can pay; cliff and leaver terms." },
            { label: "Paid per task", detail: "A fee for a defined deliverable (design, an event day), on a contractor agreement with IP assignment." },
            { label: "Stipend plus small equity top-up", detail: "Meets the pay trigger; equity only for long-term roles." },
          ],
          caption: "Top row: revenue exists; bottom row: it does not. Whatever the reward, a written volunteer or contractor agreement assigns IP and sets confidentiality.",
        },
        {
          kind: "md",
          md: md`### Conflicts of interest in a builder community

Four conflicts recur, because the leads you want are exactly the people embedded in the ecosystem:

1. **Employer-sponsor**: a lead works for a company that sponsors, or competes with a sponsor.
2. **Investor**: a lead works for a fund that wants first look at hackathon teams or investor-introduction slots.
3. **Participant**: a lead's own startup, friend or relative competes, applies for a programme, or is introduced to investors.
4. **Vendor**: a lead's agency, venue or production company is hired by Suhail.

None of these is forbidden. Each needs the same four steps: **declare** (annual and per decision), **record** (a register the leads can see), **recuse** (the conflicted lead does not vote, judge or negotiate), **approve** (people without the interest decide, and the decision is minuted).

### Money controls for a five-person team

- **Separation of duties**: the person who approves a payment is not the person who receives or initiates it. The Finance Lead never approves their own expenses.
- **Dual approval** above a threshold (illustrative: USD 1,000).
- **Budget per event approved in advance**; overruns above 10 % need a second approval.
- **Monthly reconciliation** shared with all leads; quarterly figures shared publicly in summary.`,
        },
        {
          kind: "flow",
          title: "How a sponsor dollar moves through Suhail (illustrative controls)",
          steps: [
            { label: "Contract", detail: "Signed by the entity; conflicts declared by the negotiating lead" },
            { label: "Invoice and receipt", detail: "Finance Lead invoices before the event; restricted money tagged" },
            { label: "Event budget", detail: "Approved by two leads before spending starts" },
            { label: "Spend", detail: "Payments above the threshold need dual approval; no self-approval" },
            { label: "Reconcile", detail: "Monthly, shared with all leads" },
            { label: "Report", detail: "Sponsor report within two weeks; public annual summary" },
          ],
        },
        {
          kind: "xref",
          to: "fc09-l02",
          note: "Founder Core covers early team design, salary-equity trade-offs and option grants for a startup; this lesson applies them to volunteer leads in a community company.",
        },
        {
          kind: "xref",
          to: "fc08-l04",
          note: "Vesting, cliffs and leaver terms are derived in Founder Core; use the same mechanics for any lead equity.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Setting the pay trigger",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Can Suhail pay five leads after the illustrative year 1?",
          given: md`From lesson 3 (illustrative): trailing operating surplus $S_{12} =$ USD 70k, blended margin $\bar m = 39.7\%$, fixed costs $F =$ USD 30k a year ($F_m =$ USD 2.5k a month). Proposal: $n = 5$ leads at $\sigma =$ USD 1,500 a month. Reserve policy $k = 6$ months.`,
          steps: [
            { md: md`Annual stipend bill: $12 \times 5 \times 1{,}500 =$ USD 90,000.` },
            { md: md`Surplus test: $S_{12} = 70{,}000 < 90{,}000$. **Fails.**` },
            { md: md`Reserve required: $k(F_m + n\sigma) = 6 \times (2{,}500 + 7{,}500) =$ USD 60,000 of unrestricted cash.` },
            { md: md`Revenue needed to break even with stipends: $R_{\text{req}} = (30{,}000 + 90{,}000)/0.397 \approx$ USD 302,000, against 252,000 now: about 20 % growth at the same mix.` },
            { md: md`Alternative: raise the blended margin. Shifting USD 30k of revenue from conference sponsorship (31 %) to hiring packages (83 %) adds about $30{,}000 \times (0.83 - 0.31) \approx$ USD 15,600 of contribution without growing revenue.` },
          ],
          result: md`The illustrative year 1 cannot pay five leads at USD 1,500. The rule tells everyone what must be true first: about USD 302k of revenue at today's margin (or a richer mix), and USD 60k in the bank. That is a target the team can work towards together, instead of a monthly argument.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: a smaller stipend",
          given: md`Same organisation, but the proposal is $\sigma =$ USD 1,000 a month for the five leads, $k = 6$.`,
          steps: [
            {
              md: md`Annual stipend bill $12 n \sigma$.`,
              hidden: true,
              check: { prompt: "Annual stipend bill", answer: 60000, unit: "USD", tolerance: { abs: 1 } },
            },
            { md: md`Surplus test: $70{,}000 \ge 60{,}000$: passes.` },
            {
              md: md`Reserve required $k(F_m + n\sigma) = 6 \times (2{,}500 + 5{,}000)$.`,
              hidden: true,
              check: { prompt: "Reserve required", answer: 45000, unit: "USD", tolerance: { abs: 1 } },
            },
            { md: md`$R_{\text{req}} = (30{,}000 + 60{,}000)/0.397 \approx$ USD 227,000, below the 252,000 earned.` },
          ],
          result: md`At USD 1,000 a month the surplus test passes; pay can start once USD 45k of unrestricted cash is in the bank. Whether a symbolic stipend is better than waiting for a real one is a team decision, but now it is a decision about numbers.`,
        },
        {
          kind: "question",
          question: {
            id: "sh07-l04-p1",
            type: "numeric",
            prompt: md`Fixed costs USD 36k a year, three leads at USD 2,000 a month, blended margin 45 %. What annual revenue is needed to break even with stipends? (USD)`,
            answer: 240000,
            tolerance: { rel: 0.01 },
            unit: "USD/yr",
            explanation: md`Stipends $12 \times 3 \times 2{,}000 = 72{,}000$. $R_{\text{req}} = (36{,}000 + 72{,}000)/0.45 =$ USD 240,000.`,
            concepts: ["sh07.pay-trigger"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running conflicts and publishing the books",
      blocks: [
        {
          kind: "md",
          md: md`### Documents

1. **Leads compact**: role, time expectation, the pay trigger, the equity or no-equity position, expenses policy, IP assignment, confidentiality, how a lead leaves.
2. **Conflict-of-interest policy and register**: annual declaration form, per-decision declaration, recusal rule, who approves.
3. **Payment controls**: threshold for dual approval, who may sign, budget approval per event.
4. **Transparency page** on suhail.build: sponsors per event, revenue by stream (annual), what surplus funded, judging rules and judges, a summary of the conflict register (roles, not personal details).

### Transparency without exposing sponsors

Publish **categories and totals**, not individual contract prices: "Sponsorship: USD 150k from 11 sponsors; the largest was 19 % of revenue." That gives builders the concentration fact they care about and keeps commercial terms confidential.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`**Paying one lead first** because they asked loudest. **Equity promised in a chat message** with no vesting, no pool and no company to hold it. **Leads judging their friends' teams** at the first hackathon. **The Finance Lead approving their own reimbursements.** **A lead's employer getting free sponsor benefits** because nobody priced them. **Publishing nothing** and then being accused of profiting from volunteers.`,
        },
        { kind: "scenario", scenario: "sh07-s1" },
        {
          kind: "question",
          question: {
            id: "sh07-l04-p2",
            type: "short",
            prompt: md`**Write Suhail's Leads Compact (money sections).** Include: (1) the pay trigger with your illustrative numbers and the revenue it implies; (2) the position on equity for leads, conditional on the structure; (3) the conflict-of-interest procedure with the four conflict types; (4) payment controls; (5) what Suhail will publish each year. Keep it to one page.`,
            rubric: [
              "Pay trigger is numeric, has both a surplus test and a reserve test, and the implied revenue is computed correctly",
              "Equity position distinguishes nonprofit (no equity, reasonable stipends only) from for-profit (vested equity or phantom equity with cliff and leaver terms)",
              "Covers all four conflict types (employer-sponsor, investor, participant, vendor) with declare, record, recuse, approve",
              "Payment controls include separation of duties and a dual-approval threshold",
              "Publication commitment gives totals and concentration without exposing individual sponsor prices",
              "Tone is a usable policy, not an essay; numbers labelled illustrative",
            ],
            modelAnswer: md`**Suhail Leads Compact: money (illustrative numbers)**

1. **Pay trigger.** Stipends start for all five leads at the same time when (a) trailing 12-month operating surplus before stipends is at least the annual stipend bill and (b) unrestricted cash covers six months of fixed costs plus stipends. At USD 1,500 per lead per month: bill USD 90k, reserve USD 60k, implied revenue about USD 302k at a 39.7 % blended margin. Reviewed quarterly by all leads.
2. **Equity.** If Suhail operates through a for-profit company: a 10 % lead pool; core leads receive 1 to 2 % each, four-year vesting, one-year cliff, good and bad leaver terms, granted only by board resolution. No equity promises outside that process. If a nonprofit entity is used for any activity, leads in that entity receive only reasonable stipends, never a share of surplus.
3. **Conflicts.** Every lead declares annually and before any decision: employer or client relationships with sponsors; roles at investment funds; personal links to participants, programme applicants or startups seeking introductions; ownership of vendors. Declarations go in a register visible to all leads. A conflicted lead does not negotiate, vote, judge or introduce on that matter; two non-conflicted leads approve and the decision is minuted.
4. **Payment controls.** Event budgets approved by two leads before spending. Payments above USD 1,000 need two approvals; nobody approves a payment to themselves. Monthly reconciliation shared with all leads.
5. **Publication.** Each year on suhail.build: revenue and contribution by stream, number of sponsors and the largest payer's share, what surplus funded, judging rules and judges per event, and a summary of declared conflicts by type.`,
            explanation: md`Writing the compact before the first sponsor turns every predictable dispute into a lookup.`,
            concepts: ["sh07.pay-trigger", "sh07.lead-equity", "sh07.conflict-of-interest", "sh07.financial-transparency"],
            difficulty: 2,
          },
        },
        {
          kind: "xref",
          to: "fc09.contractor-volunteer",
          note: "Written volunteer and contractor terms (scope, IP assignment, confidentiality, allowance, employment-status facts) are covered in Founder Core.",
        },
        { kind: "sources", refs: ["sh07-r3"] },
      ],
    },
  ],
  quiz: [
    {
      id: "sh07-l04-q1",
      type: "numeric",
      prompt: md`Monthly fixed costs USD 3,000, four leads at USD 1,250 a month, reserve policy 6 months. What unrestricted reserve does the trigger require? (USD)`,
      answer: 48000,
      tolerance: { abs: 1 },
      unit: "USD",
      explanation: md`$6 \times (3{,}000 + 4 \times 1{,}250) = 6 \times 8{,}000 =$ USD 48,000.`,
      concepts: ["sh07.pay-trigger"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh07-l04-q2",
      type: "mcq",
      prompt: "Which reward is generally unavailable in a nonprofit entity?",
      options: ["Reimbursed expenses", "A reasonable stipend", "Vested equity", "Public recognition"],
      answer: 2,
      explanation: md`A nonprofit has no shares; phantom equity tied to a sale or to surplus is also problematic because it resembles distributing surplus.`,
      concepts: ["sh07.lead-equity", "sh07.legal-forms"],
      difficulty: 1,
    },
    {
      id: "sh07-l04-q3",
      type: "order",
      prompt: "Put the conflict-of-interest procedure in order.",
      items: ["Declare the interest", "Record it in the register", "Conflicted lead recuses", "Non-conflicted leads approve and minute the decision"],
      explanation: md`Declare, record, recuse, approve. Skipping the record step makes later disputes unresolvable.`,
      concepts: ["sh07.conflict-of-interest"],
      difficulty: 1,
    },
    {
      id: "sh07-l04-q4",
      type: "multi",
      prompt: "Which are conflicts of interest that require declaration and recusal?",
      options: [
        "The Partnerships Lead's employer negotiating a sponsorship with Suhail",
        "The Editorial Lead's cofounder entering a Suhail hackathon the lead is judging",
        "A lead attending a hackathon as a mentor",
        "The Events Lead's agency being hired to produce Suhail Season",
        "A lead working at a fund that wants first look at hackathon teams",
      ],
      answer: [0, 1, 3, 4],
      explanation: md`Employer-sponsor, participant, vendor and investor conflicts. Mentoring with no decision role is not a conflict.`,
      concepts: ["sh07.conflict-of-interest"],
      difficulty: 2,
    },
    {
      id: "sh07-l04-q5",
      type: "decision",
      prompt: md`Suhail receives its first USD 25,000 sponsorship in March 2027. Two leads ask to be paid immediately; the others are happy to wait. No pay rule exists. What do you do?`,
      options: [
        { text: "Pay the two who asked, since the others do not mind", score: 0, feedback: "Creates two classes of lead and rewards whoever asks first." },
        { text: "Pay everyone equally from the sponsorship", score: 0.2, feedback: "Fair between leads but spends one sponsor's money on recurring cost with no reserve." },
        { text: "Agree a written pay trigger with all leads within two weeks, apply it to everyone, and pay nobody until it is met", score: 1, feedback: "Converts a personal negotiation into a shared rule that applies equally." },
        { text: "Refuse to discuss pay until year-end", score: 0.3, feedback: "Avoids the mistake but leaves resentment to grow." },
      ],
      explanation: md`The first payment sets the precedent; set the rule before it.`,
      concepts: ["sh07.pay-trigger"],
      difficulty: 2,
    },
    {
      id: "sh07-l04-q6",
      type: "mcq",
      prompt: "What is the best publication format for sponsor money in Suhail's annual transparency report?",
      options: [
        "Each sponsor's contract price",
        "Nothing, to protect sponsors",
        "Totals by stream, number of sponsors and the largest payer's share",
        "Only the list of logos",
      ],
      answer: 2,
      explanation: md`Totals and concentration give builders what they need to judge neutrality without breaking sponsors' commercial confidentiality.`,
      concepts: ["sh07.financial-transparency"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh07-l04-f1", front: "Lead pay trigger (two tests)", back: md`Surplus: $S_{12} \ge 12n\sigma$. Reserve: $C_{\text{unres}} \ge k(F_m + n\sigma)$.`, concepts: ["sh07.pay-trigger"] },
    { id: "sh07-l04-f2", front: "Revenue needed with stipends", back: md`$R_{\text{req}} = (F + 12n\sigma)/\bar m$. Illustrative: (30k + 90k)/0.397 = USD 302k.`, concepts: ["sh07.pay-trigger"] },
    { id: "sh07-l04-f3", front: "Four rewards for leads", back: "Stipend, profit-share pool, vested equity, phantom equity. Only stipends and expenses are clean in a nonprofit.", concepts: ["sh07.lead-equity"] },
    { id: "sh07-l04-f4", front: "Four recurring conflicts", back: "Employer-sponsor, investor, participant (own startup, friends), vendor.", concepts: ["sh07.conflict-of-interest"] },
    { id: "sh07-l04-f5", front: "Conflict procedure", back: "Declare, record, recuse, approve (by non-conflicted leads, minuted).", concepts: ["sh07.conflict-of-interest"] },
    { id: "sh07-l04-f6", front: "Separation of duties", back: "Whoever approves a payment does not initiate or receive it; dual approval above a threshold.", concepts: ["sh07.financial-transparency"] },
  ],
  scenarios: [
    {
      id: "sh07-s1",
      title: "The Partnerships Lead's employer wants to sponsor and judge",
      dayInLife: true,
      context: md`April 2027 (illustrative). Suhail's Partnerships Lead works full time at a regional VC fund. The fund offers USD 15,000 to be Gold sponsor of Suhail's next Riyadh hackathon, asks for one judging seat for a partner, and wants a private dinner with the top five teams. The hackathon budget is USD 40,000.`,
      start: "a",
      concepts: ["sh07.conflict-of-interest", "sh07.sponsorship-model"],
      nodes: {
        a: {
          md: md`The Partnerships Lead brings you the offer and says: "I can close this by Friday, it's my own fund." What first?`,
          choices: [
            { text: "Thank them, record the conflict, and hand the negotiation to another lead with you", next: "b", score: 9, feedback: "Declare, record, recuse. The deal may still be good; the person negotiating must not be the one who benefits on both sides." },
            { text: "Let them close it fast; the money is needed", next: "c", score: 2, feedback: "Speed now, credibility problem later: builders will learn who negotiated." },
            { text: "Refuse all sponsorship from funds where leads work", next: "d", score: 4, feedback: "Clean but throws away a legitimate sponsor category; a procedure handles this better than a ban." },
          ],
        },
        b: {
          md: md`Another lead negotiates. Gold at USD 15,000 is 37.5 % of the USD 40,000 budget. The fund insists on the judging seat and the dinner.`,
          choices: [
            { text: "Cap Gold at USD 10,000 (25 %), offer one seat on a panel where independent judges are the majority, and make the dinner an open investor session for all finalists with other funds invited", next: "e", score: 10, feedback: "Concentration within the 25 % rule, judging integrity protected by a majority, and investor access made non-exclusive so builders benefit." },
            { text: "Accept everything at USD 15,000", next: "c", score: 3, feedback: "Over the concentration limit and gives one fund exclusive access to the best teams: other funds and builders will notice." },
          ],
        },
        c: {
          md: md`After the event, two finalist teams post that the sponsoring fund's partner judged them and then offered term sheets at the private dinner. Other funds ask whether Suhail is a deal-flow channel for one investor.`,
          choices: [
            { text: "Publish the conflict policy, the judging rules and a correction, and apply the procedure from now on", score: 5, feedback: "Recovers some trust; the cost was avoidable." },
            { text: "Say nothing", score: 0, feedback: "Silence confirms the suspicion." },
          ],
        },
        d: {
          md: md`The fund sponsors a competing community instead. Your other leads point out that half the ecosystem works for funds or sponsors.`,
          choices: [
            { text: "Replace the ban with the declare, record, recuse, approve procedure", score: 7, feedback: "Right policy, one deal late." },
          ],
        },
        e: {
          md: md`The fund accepts at USD 10,000. You publish the sponsor list, judges and judging criteria before the event.`,
          choices: [
            { text: "Record the decision and the recusal in the register and add the fund to the annual transparency report", score: 10, feedback: "The procedure is now visible precedent for the next lead with the same conflict." },
          ],
        },
      },
    },
  ],
};

export default lesson;
