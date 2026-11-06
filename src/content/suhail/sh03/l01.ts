import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh03-l01",
  title: "Event P&L anatomy: fixed and variable costs, break-even and contribution",
  summary:
    "Every Suhail event is a small business with one night of revenue. This lesson builds the event P&L the way the event-pnl widget computes it: fixed costs, per-head costs, sponsor fulfilment and contingency against ticket and sponsor revenue. It shows why a free hackathon has a break-even ceiling rather than a floor, why cost per attendee misleads, and how to read the contribution margin of each sponsor tier.",
  minutes: 70,
  objectives: [
    "Split an event budget into fixed costs, variable costs per attendee and sponsor fulfilment, with contingency on top",
    "Compute profit, cost per attendee, sponsor share of revenue and contribution per attendee for any format",
    "Derive break-even attendance and say whether it is a minimum (paid event) or a maximum (free event)",
    "Compute the contribution margin of each sponsor tier and spot tiers that cost too much to deliver",
    "Produce a one-page P&L for a first Suhail event that a Finance Lead can check line by line",
  ],
  concepts: [
    { id: "sh03.event-pnl", name: "Event P&L", description: "Revenue (tickets plus sponsorship) minus total cost (fixed, variable per attendee, sponsor fulfilment, contingency) for one event, built before any money is committed and reconciled after.", competency: "sh-events", related: ["fc06.contribution-margin"] },
    { id: "sh03.fixed-variable", name: "Fixed vs variable event costs", description: "Fixed costs (venue, production, prizes, marketing) do not change with headcount; variable costs (catering, swag, badges) scale with attendees. Sponsor fulfilment scales with sponsors sold.", competency: "sh-events", related: ["sh03.event-pnl"] },
    { id: "sh03.break-even-attendance", name: "Break-even attendance", description: "Attendance at which revenue equals cost. A floor when each attendee contributes positively (paid tickets above per-head cost), a ceiling when each attendee costs money (free events funded by sponsors).", competency: "sh-events", related: ["sh03.fixed-variable"] },
    { id: "sh03.tier-contribution", name: "Sponsor tier contribution margin", description: "Tier price minus the cost of delivering its benefits (with contingency), as a share of price. Benefits that need goods, seats or production erode margin; digital and access benefits do not.", competency: "sh-partnerships", related: ["sh03.event-pnl"] },
    { id: "sh03.average-cost-trap", name: "The cost-per-attendee trap", description: "Average cost per attendee falls as headcount rises because fixed costs are spread, even when profit is falling. Decisions use marginal cost and contribution, not the average.", competency: "sh-events", related: ["sh03.break-even-attendance"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "The anatomy of an event P&L",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Suhail's leads are unpaid until there is revenue, and the plan starts in January 2027 with no members, sponsors or events yet. The first hackathons will be judged by builders on the night, but they will be judged by your Finance Lead and your first sponsors on the P&L. If you cannot say before signing the venue what attendance breaks even, how much contingency you hold and which sponsor tier actually makes money, a single bad night can consume the reserves the whole volunteer team depends on.`,
        },
        {
          kind: "md",
          md: md`### Four cost lines and two revenue lines

An event P&L has the same structure whether it is a 40-person meetup or the Suhail Season conference. On the cost side:

| Line | Behaviour | Examples | Driver |
|---|---|---|---|
| **Fixed costs** $F$ | Paid whether 50 or 150 people come | Venue hire, AV and wifi, stage, prizes, marketing, insurance | The format you chose |
| **Variable costs** $v N$ | Scale with attendees | Catering, swag, badges, wristbands, per-head venue charges | Show-ups (and catering orders placed on registrations) |
| **Sponsor fulfilment** $\sum f_i n_i$ | Scale with sponsors sold | Booth build, dinner seats, sponsor video, printed branding | The benefits you promised |
| **Contingency** $k$ | A percentage held on top | Price rises, a second generator, extra security, late AV fixes | Your experience with the format |

On the revenue side there are only two lines: **tickets** (attendees times paying share times price) and **sponsorship** (tier price times number sold). Community hackathons are usually free for builders, so sponsorship is the whole revenue line; tickets become material only at a conference.`,
        },
        { kind: "equation", formula: "sh03-event-cost" },
        { kind: "equation", formula: "sh03-event-revenue" },
        {
          kind: "md",
          md: md`Profit is $\Pi = R - C$. The event-pnl widget below implements exactly these two equations (contingency multiplies every cost line, including fulfilment). Its default settings describe a mature 150-person hackathon with eleven sponsors and USD 62,000 of sponsorship; that is a target state, not a first event. Move the sliders to the worked example in the next section before you trust any number.

### Contribution per attendee and the sign that changes everything

Differentiate profit with respect to attendance. Sponsorship does not change with one more attendee, so the marginal effect of one attendee is:`,
        },
        { kind: "equation", formula: "sh03-contribution-attendee" },
        {
          kind: "md",
          md: md`For a **paid** meetup with a USD 25 ticket and USD 12 of food, $m_a = 25 - 12\times1.1 = 11.8$: each extra attendee earns money, and you need a minimum number of them. For a **free** hackathon with USD 40 per head, $m_a = 0 - 40\times1.1 = -44$: each extra builder costs USD 44, and sponsors must cover fixed costs plus all those heads. Setting $R = C$ and solving for $N$:`,
        },
        { kind: "equation", formula: "sh03-break-even-attendance" },
        {
          kind: "md",
          md: md`When $m_a < 0$ the numerator is negative too (sponsors exceed fixed costs), and $N^{*}$ becomes the **largest** crowd the sponsorship can feed. Organisers who think "more people is always better" overrun this ceiling every season, usually by opening a waitlist on the day.

### Cost per attendee is a reporting number

Average cost $\bar c = C/N$ is what sponsors and press ask about. It always falls as attendance grows, because fixed costs are spread over more people. In a free event profit is falling at the same time. Use $\bar c$ in the sponsor report; use $m_a$ and $N^{*}$ for decisions.`,
        },
        { kind: "equation", formula: "sh03-cost-per-attendee" },
        {
          kind: "md",
          md: md`### Every sponsor tier has its own margin

Selling a tier costs you its benefits. A logo on the site and a judging seat cost nothing extra; a booth, four dinner seats and a produced video can cost thousands.`,
        },
        { kind: "equation", formula: "sh03-tier-contribution" },
        {
          kind: "md",
          md: md`With the widget's tier settings (all illustrative):

| Tier | Price (USD) | Fulfilment (USD) | Contribution at $k$ = 10 % (USD) | Margin |
|---|---|---|---|---|
| Headline | 25,000 | 2,000 | 22,800 | 91 % |
| Gold | 10,000 | 800 | 9,120 | 91 % |
| Silver | 4,000 | 300 | 3,670 | 92 % |
| Community | 1,000 | 100 | 890 | 89 % |

All four are healthy because the fulfilment is modest. The common way to destroy a tier is adding one physical benefit (a booth with furniture and power at a hotel venue) to a small tier: USD 1,000 of booth on a USD 1,000 Community tier is a margin of about minus 10 % once contingency is counted.`,
        },
        {
          kind: "widget",
          widget: "event-pnl",
          caption: "Set: 120 attendees, 0 % paying, 0 Headline, 1 Gold, 3 Silver, 4 Community, venue 3,000, catering 40, prizes 8,000, production 3,000, marketing 1,000, contingency 10 %. Then raise attendance to 170 and watch profit turn negative while cost per attendee falls.",
        },
      ],
    },
    {
      layer: "applied",
      title: "A first Suhail hackathon, line by line",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Illustrative 24-hour hackathon in Kuwait City, 120 builders",
          given: md`Illustrative only: nothing has run yet. Free for builders. Sponsors at the widget's tier prices: 1 Gold (USD 10,000, fulfilment 800), 3 Silver (USD 4,000, fulfilment 300 each), 4 Community (USD 1,000, fulfilment 100 each). Venue USD 3,000 (a university hall with a hire fee), catering and swag USD 40 per head for 24 hours (three meals, snacks, coffee, a T-shirt), prizes USD 8,000, production (AV, extra wifi, power strips) USD 3,000, marketing USD 1,000, contingency 10 %. Expected attendance 120.`,
          steps: [
            { md: md`**Sponsor revenue:** $10{,}000 + 3\times4{,}000 + 4\times1{,}000 = 26{,}000$ USD. Tickets: 0. Sponsor share of revenue: 100 %.` },
            { md: md`**Fulfilment:** $800 + 3\times300 + 4\times100 = 2{,}100$ USD. **Fixed:** $F = 3{,}000 + 8{,}000 + 3{,}000 + 1{,}000 = 15{,}000$ USD. **Variable:** $40\times120 = 4{,}800$ USD.` },
            { md: md`**Base cost** $= 15{,}000 + 4{,}800 + 2{,}100 = 21{,}900$ USD. **Total with contingency:** $C = 21{,}900\times1.10 = 24{,}090$ USD.` },
            { md: md`**Profit:** $\Pi = 26{,}000 - 24{,}090 = 1{,}910$ USD (7 % of revenue). **Cost per attendee:** $24{,}090/120 = 200.75$ USD.` },
            { md: md`**Contribution per attendee:** $m_a = 0 - 40\times1.1 = -44$ USD. **Break-even:** $N^{*} = \dfrac{(15{,}000 + 2{,}100)\times1.1 - 26{,}000}{-44} = \dfrac{18{,}810 - 26{,}000}{-44} = 163.4$. Because $m_a < 0$, this is a **ceiling**: above about 163 builders the event loses money.` },
            { md: md`**Check with the widget:** at 170 attendees profit is $-290$ USD while cost per attendee has dropped to USD 154.6. The average looks better and the P&L is worse.` },
          ],
          result: md`Profit USD 1,910 at 120 builders, a break-even ceiling of about 163, and cost per attendee USD 201 (illustrative). Two practical rules follow: cap approved registrations so expected show-ups stay well below 163 (Lesson 6 does the no-show arithmetic), and treat the USD 2,409 of contingency as money to protect, not profit to spend.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: a paid evening meetup",
          given: md`Illustrative Suhail meetup: room capacity 100. Ticket USD 25, everyone pays ($s = 1$). Food and drinks USD 12 per head. Venue USD 1,000, production USD 500, marketing USD 300, no prizes. One Community sponsor at USD 1,000 with USD 100 fulfilment. Contingency 10 %.`,
          steps: [
            { md: md`Contribution per attendee: $m_a = 25 - 12\times1.1$.` },
            { md: md`$m_a = 25 - 13.2 = 11.8$ USD per attendee (positive, so break-even is a floor).`, hidden: true, check: { prompt: "Contribution per attendee (USD)", answer: 11.8, tolerance: { abs: 0.05 }, unit: "USD" } },
            { md: md`Numerator: $(F + \text{fulfilment})(1+k) - S = (1{,}800 + 100)\times1.1 - 1{,}000$.` },
            { md: md`$= 2{,}090 - 1{,}000 = 1{,}090$ USD. Break-even $N^{*} = 1{,}090/11.8 = 92.4$, so you need **93 paying attendees** in a 100-seat room.`, hidden: true, check: { prompt: "Break-even attendance (people)", answer: 92.4, tolerance: { abs: 0.6 }, unit: "attendees" } },
          ],
          result: md`About 93 of 100 seats must sell just to break even: a USD 25 ticket cannot carry a paid venue at this size. Either get the venue in kind from a host company (fixed cost drops by 1,100 with contingency, and break-even falls to zero), or sell a second sponsor. Small events live on in-kind venues.`,
        },
        {
          kind: "question",
          question: {
            id: "sh03-l01-p1",
            type: "numeric",
            prompt: md`In the hackathon above, the Gold sponsor asks for a booth at the venue that costs USD 1,500 to build, on top of its existing USD 800 fulfilment. What is the Gold tier's contribution margin (in %) after the change, with 10 % contingency?`,
            answer: 74.7,
            tolerance: { abs: 0.2 },
            unit: "%",
            explanation: md`Fulfilment becomes $800 + 1{,}500 = 2{,}300$ USD, or $2{,}530$ with contingency. Contribution $= 10{,}000 - 2{,}530 = 7{,}470$ USD, a margin of 74.7 % (down from 91.2 %). Event profit falls from USD 1,910 to USD 260. Price the booth as an add-on or offer a benefit that costs nothing, such as a named challenge track.`,
            concepts: ["sh03.tier-contribution"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running the P&L in practice",
      blocks: [
        {
          kind: "md",
          md: md`### Who owns what

At Suhail the **Events and Programming lead** owns the cost lines and the run sheet, the **Partnerships lead** owns sponsor revenue and fulfilment promises, and the **Finance Lead** owns the model, the contingency and the reconciliation. The P&L is one shared sheet with three tabs: **budget** (signed off before any deposit), **forecast** (updated weekly as quotes and sponsors land), and **actuals** (reconciled within two weeks of the event, every line against an invoice or receipt).

### Where event P&Ls go wrong

- **Per-head costs quoted per registration, consumed per attendee.** Caterers quote per head and you order on registrations days before; a 40 % no-show rate turns a USD 40 head cost into roughly USD 67 per actual attendee.
- **Venue "extras".** Hotel venues add charges for power, rigging, cleaning, security, overtime past midnight and internet. Ask for the full list in writing before comparing quotes.
- **Prizes as a fixed cost nobody funded.** Prize money is usually announced before all sponsors sign. Tie each prize to a named sponsor line or keep it small until the money is signed.
- **In-kind contributions left out.** A venue given in kind is real value: show it as both a revenue line (in-kind sponsorship) and a cost line, so the sponsor gets credit and next year's budget is not a surprise when the host changes (Lesson 2).
- **Contingency spent on upgrades.** If contingency is consumed by a nicer stage, it was a budget increase, not contingency.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Do not report profit before the invoices clear",
          md: md`A P&L shows sponsorship when it is earned; the bank shows it when it is paid, which in Gulf corporates can be 60 to 90 days after the invoice (illustrative range; ask each sponsor's finance team). The event can be profitable and still leave Suhail short of cash for the next one. Lesson 2 builds the cash view.`,
        },
        {
          kind: "checklist",
          title: "Before you sign a venue",
          items: [
            "Budget tab complete: every fixed, variable and fulfilment line has a written quote or a stated assumption",
            "Contingency set (10 % for a repeated format, 15 to 20 % for a first conference) and owned by the Finance Lead",
            "Contribution per attendee computed, and break-even attendance stated as a floor or a ceiling",
            "Each sponsor tier's fulfilment costed and its margin above about 80 %",
            "Signed (not promised) sponsorship covers the non-refundable deposits you are about to pay",
            "Registration cap set from the break-even ceiling and the no-show assumption",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask the venue and caterer",
          items: [
            "What is included in the hire fee, and what is charged separately (power, rigging, cleaning, security, internet, overtime)?",
            "Is catering charged on the guaranteed number or on actual attendance, and when is the guaranteed number fixed?",
            "What is the cancellation schedule: how much of the fee is refundable at 90, 60, 30 and 7 days?",
            "Who provides wifi, what is its real capacity for 150 laptops, and can we test it a week before?",
            "Are there minimum spends on food and beverage, and are service charges added on top?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "sh03-l01-p2",
            type: "short",
            prompt: md`Write the one-page P&L for Suhail's first event (choose a hackathon or a meetup, in a city you name). Use clearly labelled illustrative numbers. Include: (1) every cost line grouped as fixed, variable per attendee and sponsor fulfilment, with contingency; (2) revenue by sponsor tier and tickets; (3) profit, cost per attendee and sponsor share of revenue; (4) contribution per attendee and break-even attendance, stated as a floor or a ceiling, with the registration cap you will set; (5) the two lines you are least sure of and how you will firm them up before signing the venue.`,
            rubric: [
              "Costs are correctly split into fixed, variable per attendee and fulfilment, with contingency applied to the base, and all numbers are labelled illustrative",
              "Revenue, profit, cost per attendee and sponsor share are arithmetically correct and consistent with the event-pnl model",
              "Contribution per attendee and break-even attendance are computed, with the correct interpretation (floor for positive contribution, ceiling for negative)",
              "A registration cap is set and justified from the break-even and an explicit no-show assumption",
              "Tier fulfilment is costed and no tier has a margin below about 80 % without a stated reason",
              "The two most uncertain lines are named with a concrete action and date to firm them up",
            ],
            modelAnswer: md`**Event (illustrative):** Suhail Hack 01, 24 hours, a university hall in Kuwait City, free for builders, target 120 attendees.

**Costs (USD):** fixed: venue 3,000, prizes 8,000, production 3,000, marketing 1,000 (total 15,000). Variable: catering and swag 40 per head, 4,800 at 120. Fulfilment: Gold 800, 3 Silver at 300, 4 Community at 100 (total 2,100). Base 21,900; contingency 10 % = 2,190; total 24,090.

**Revenue:** 1 Gold 10,000, 3 Silver 12,000, 4 Community 4,000: 26,000 (100 % sponsorship, no tickets).

**Results:** profit 1,910; cost per attendee 200.75; sponsor share 100 %.

**Break-even:** contribution per attendee $= -44$ USD, so break-even is a ceiling at $(18{,}810 - 26{,}000)/(-44) = 163$ attendees. With a 40 % no-show assumption on approved registrations, I approve at most 200, giving 120 expected and keeping the 95th-percentile turnout well below 163.

**Tier margins:** 91 to 92 %; no booth is offered at this venue.

**Least sure:** (1) catering, because the caterer charges on a guaranteed number fixed 5 days before: I will get the guarantee terms in writing this week and order on 75 % of approvals; (2) production, because the hall's wifi capacity is unknown: technical visit with a load test three weeks before, with a USD 1,000 quote for a backup line held in contingency.`,
            explanation: md`A credible event P&L names its assumptions, applies contingency, and turns break-even into an operational rule (the registration cap).`,
            concepts: ["sh03.event-pnl", "sh03.break-even-attendance", "sh03.tier-contribution"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a new volunteer why a free hackathon can lose money by being too popular, and why the falling cost per attendee does not prove the opposite.",
          keyPoints: [
            "Sponsorship is fixed in the short run; it does not grow with attendance",
            "Each free attendee adds variable cost (food, swag) with contingency, so contribution per attendee is negative",
            "Break-even attendance is therefore a maximum, not a minimum",
            "Average cost per attendee falls because fixed costs are spread, while total cost and losses still rise",
            "The practical control is a registration cap derived from break-even and the no-show rate",
          ],
        },
        { kind: "xref", to: "fc06-l02", note: "Founder Core unit economics covers contribution margin and the general logic of marginal vs average cost; here it is applied to one event." },
        { kind: "sources", refs: ["sh03-r1", "sh03-r3"] },
      ],
    },
  ],
  quiz: [
    {
      id: "sh03-l01-q1",
      type: "numeric",
      prompt: md`An illustrative free hackathon has fixed costs of USD 12,000, catering at USD 35 per head, sponsor fulfilment of USD 1,000, contingency 10 % and USD 20,000 of sponsorship. What is the break-even attendance (people)?`,
      answer: 148,
      tolerance: { abs: 0.6 },
      unit: "attendees",
      explanation: md`Contribution per attendee $m_a = -35\times1.1 = -38.5$ USD. Numerator: $(12{,}000 + 1{,}000)\times1.1 - 20{,}000 = 14{,}300 - 20{,}000 = -5{,}700$ USD. $N^{*} = -5{,}700/-38.5 = 148$. Because each builder costs money, 148 is a ceiling, not a minimum.`,
      concepts: ["sh03.break-even-attendance"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "sh03-l01-q2",
      type: "mcq",
      prompt: "A free, sponsor-funded hackathon has a break-even attendance of 160. What does that number mean?",
      options: [
        "You need at least 160 builders to cover costs",
        "Above about 160 builders the event starts losing money",
        "The venue capacity must be 160",
        "Cost per attendee is minimised at 160",
      ],
      answer: 1,
      explanation: md`With no ticket income, each attendee has negative contribution (food and swag). Sponsorship covers fixed costs plus a limited number of heads, so break-even is a ceiling.`,
      concepts: ["sh03.break-even-attendance"],
      difficulty: 1,
    },
    {
      id: "sh03-l01-q3",
      type: "multi",
      prompt: "Which of these are fixed costs for a 24-hour hackathon? (Select all that apply.)",
      options: ["Venue hire fee", "Prize pool", "Breakfast per attendee", "AV and stage production", "T-shirt per attendee", "Marketing spend"],
      answer: [0, 1, 3, 5],
      explanation: md`Venue, prizes, production and marketing do not change with headcount. Breakfast and T-shirts scale with attendees (variable).`,
      concepts: ["sh03.fixed-variable"],
      difficulty: 1,
    },
    {
      id: "sh03-l01-q4",
      type: "numeric",
      prompt: md`A Silver tier sells at USD 4,000. Its benefits cost USD 300 to deliver and contingency is 10 %. What is the tier's contribution in USD?`,
      answer: 3670,
      tolerance: { abs: 1 },
      unit: "USD",
      explanation: md`$m = 4{,}000 - 300\times1.1 = 4{,}000 - 330 = 3{,}670$ USD, a 91.8 % margin.`,
      concepts: ["sh03.tier-contribution"],
      difficulty: 1,
    },
    {
      id: "sh03-l01-q5",
      type: "decision",
      prompt: md`Your free hackathon is at 120 approved builders and profit is forecast at about USD 1,900. The Events lead wants to approve 60 more from the waitlist "because cost per attendee goes down". Contribution per attendee is minus USD 44. What do you decide?`,
      options: [
        { text: "Approve all 60: lower cost per attendee proves the event gets more efficient.", score: 0, feedback: "Average cost falls, but 60 more show-ups at minus USD 44 each would cost about USD 2,640 and turn the event into a loss." },
        { text: "Approve a number whose expected show-ups keep attendance below break-even, and only if a new sponsor or in-kind catering covers the extra heads.", score: 1, feedback: "Ties capacity to the P&L: extra heads are funded explicitly, and the waitlist becomes a selling point for a late Community sponsor." },
        { text: "Refuse any waitlist approvals.", score: 0.4, feedback: "Safe for the P&L, but it ignores that some approved builders will not show; a modest top-up based on the no-show rate is reasonable." },
      ],
      explanation: md`Use contribution per attendee and break-even for capacity decisions, not average cost.`,
      concepts: ["sh03.average-cost-trap", "sh03.break-even-attendance"],
      difficulty: 2,
    },
    {
      id: "sh03-l01-q6",
      type: "numeric",
      prompt: md`Base costs (before contingency) of an event are USD 30,000, contingency is 15 %, sponsorship USD 32,000 and tickets USD 3,500. What is the profit in USD?`,
      answer: 1000,
      tolerance: { abs: 1 },
      unit: "USD",
      explanation: md`$C = 30{,}000\times1.15 = 34{,}500$. $R = 35{,}500$. $\Pi = 1{,}000$ USD.`,
      concepts: ["sh03.event-pnl"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh03-l01-f1", front: "Event cost model", back: md`$C = (F + vN + \sum f_i n_i)(1+k)$: fixed, variable per head, sponsor fulfilment, times contingency.`, concepts: ["sh03.event-pnl"] },
    { id: "sh03-l01-f2", front: "Contribution per attendee", back: md`$m_a = s\,p - v(1+k)$. Negative for free events.`, concepts: ["sh03.break-even-attendance"] },
    { id: "sh03-l01-f3", front: "Break-even attendance for a free hackathon", back: "A ceiling: above it, the extra heads cost more than the fixed sponsorship covers.", concepts: ["sh03.break-even-attendance"] },
    { id: "sh03-l01-f4", front: "Why cost per attendee misleads", back: "It falls with headcount because fixed costs are spread, even while profit falls. Report it; do not decide with it.", concepts: ["sh03.average-cost-trap"] },
    { id: "sh03-l01-f5", front: "Tier contribution margin", back: md`$(P_i - f_i(1+k))/P_i$; aim for 80 % or more. Physical benefits (booths, dinners, video) are what erode it.`, concepts: ["sh03.tier-contribution"] },
    { id: "sh03-l01-f6", front: "Typical contingency", back: "10 % for a format you have run before, 15 to 20 % for a first conference. Owned by the Finance Lead.", concepts: ["sh03.event-pnl"] },
  ],
};

export default lesson;
