import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh10-l02",
  title: "The budget and P&L: break-even, contingency and the cash gate",
  summary:
    "Build the full event budget line by line (fixed, per-head and sponsor fulfilment costs), run it through the event P&L, find the break-even in sponsor revenue and in headcount, size the contingency from the risk register rather than by habit, treat in-kind support correctly, and set a cash gate that decides whether the event goes ahead.",
  minutes: 80,
  objectives: [
    "You can build an event budget from quotes, separating fixed, per-head and sponsor fulfilment costs.",
    "You can compute event costs with contingency, profit, cost per attendee and the marginal cost of one more builder.",
    "You can find the break-even sponsor revenue and the largest headcount a given revenue supports.",
    "You can size and govern a contingency reserve and explain why it is not spend.",
    "You can set a cash gate with a date that decides go, shrink or cancel.",
  ],
  concepts: [
    {
      id: "sh10.event-pnl",
      name: "Event P&L",
      description:
        "Revenue (tickets plus sponsor tiers) minus costs, where costs are (fixed + per-head x attendees + sponsor fulfilment) x (1 + contingency). For a free hackathon, sponsors carry the event and tickets mostly filter no-shows.",
      competency: "sh-events",
    },
    {
      id: "sh10.break-even-capacity",
      name: "Break-even revenue and capacity",
      description:
        "The sponsor revenue that makes profit zero for a given plan, and the largest headcount a given revenue can support. The gap between plan and break-even is the margin of safety.",
      competency: "sh-events",
      related: ["sh10.event-pnl"],
    },
    {
      id: "sh10.contingency-reserve",
      name: "Contingency reserve",
      description:
        "A budgeted reserve, typically 10 to 15 % of costs for a first event, sized against the expected cost of the risk register, released only by a named person against a named risk; unspent contingency becomes surplus.",
      competency: "sh-events",
    },
    {
      id: "sh10.cash-gate",
      name: "Cash gate",
      description:
        "A dated go, shrink or cancel decision: by the gate, signed and paid sponsor money must cover the costs that become non-refundable after it. Unpaid volunteer teams cannot absorb a loss, so the gate replaces hope.",
      competency: "sh-org",
    },
    {
      id: "sh10.in-kind",
      name: "In-kind support",
      description:
        "Venue, credits, hardware or mentors given instead of cash. Record it at a fair value in the sponsor ledger and report, but never count it as revenue that pays a cash cost.",
      competency: "sh-partnerships",
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "The P&L model and its break-even",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Suhail's leads are unpaid and Suhail has no reserves: a first event that loses USD 5,000 is paid by someone personally, and the team will remember who. The budget is also what you show a sponsor when they ask "what does my money pay for?" and a host when they ask "can you cover security and cleaning?". Getting the P&L right, with a real break-even and a cash gate, is how you run an event with no money in the bank without gambling.`,
        },
        {
          kind: "md",
          md: md`### Three kinds of cost

| Kind | Examples | Behaviour | Where the number comes from |
|---|---|---|---|
| **Fixed** | Venue (or the cash part of a hosted venue), AV and stage, wifi upgrade, power, furniture, photo and video, security, insurance, prizes, design and marketing | Same for 80 or 140 builders | Written quotes |
| **Per head** | Meals, coffee, snacks, water, t-shirts, badges, lanyards | Proportional to people on site (order on accepted x show-up, plus crew) | Caterer's per-head quote x headcount |
| **Sponsor fulfilment** | Booth tables, branded materials, sponsor dinner seats, printed banners, track prize logistics | Proportional to sponsors sold, by tier | Your own estimate per tier |

Then **contingency** on top, as a fraction of all costs. The widget below uses exactly this structure.`,
        },
        { kind: "equation", formula: "sh10-event-cost" },
        { kind: "equation", formula: "sh10-event-profit" },
        {
          kind: "md",
          md: md`### Break-even

For a free hackathon ($p_t = 0$), profit is zero when sponsor revenue equals costs. Two questions follow. **What must sponsorship raise?** The break-even revenue is simply $C$ for the plan. **How many builders can a given revenue support?** Solve the profit equation for $N$:`,
        },
        { kind: "equation", formula: "sh10-capacity-breakeven" },
        {
          kind: "md",
          md: md`The **marginal cost** of one more builder is $v(1+c)$: with USD 45 per head and 10 % contingency, each extra seat costs USD 49.50. That is the number to quote when a sponsor asks "can you add 20 more seats for our engineers?".

### Contingency is a reserve, not a cost line you spend

Contingency covers the known unknowns: a backup wifi line, extra security a permit requires, a caterer's late headcount change. Size it two ways and take the larger: **top-down** (10 to 15 % of costs for a first event with no history) and **bottom-up** (the expected monetary value of the risk register, lesson 4). Name one person who can release it (the Finance Lead), against a named risk, in writing. If it is not used, it becomes surplus and the seed of the next event's float.

### In-kind support

A host hall worth USD 8,000 given free does not pay the caterer. Keep two ledgers: the **cash P&L** (only money that moves) and the **sponsor ledger** (cash plus in-kind at fair value, for recognition and reporting). Cloud credits, API credits and hardware raise the value to builders, and you should report them, but they never enter break-even.`,
        },
        {
          kind: "widget",
          widget: "event-pnl",
          caption: "Set it to the worked plan: 120 attendees, paying 0 %, venue USD 2,000, per head USD 45, prizes USD 6,000, production USD 6,000, marketing USD 1,000, contingency 10 %. The widget's tiers are fixed (USD 25k, 10k, 4k, 1k); use it to feel the sensitivities, and use the worked example for the plan's own three tiers.",
        },
        { kind: "sources", refs: ["sh10-r1", "sh10-r11"] },
      ],
    },
    {
      layer: "applied",
      title: "Worked budget: from a draft that loses money to a plan that holds",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Draft 1: the ambitious version",
          given: md`**Illustrative numbers, USD.** First draft for Riyadh 01, written before any quotes were negotiated: 150 builders, hired venue USD 8,000, catering and swag USD 55 per head, cash prizes USD 15,000, production USD 10,000, marketing USD 3,000. Sponsors: Headline USD 12,000 x 1 (fulfilment 1,500), Gold USD 6,000 x 2 (600), Silver USD 2,500 x 3 (200). Contingency 10 %. Free tickets.`,
          steps: [
            { md: md`Fixed and per head: $8{,}000 + 55 \times 150 + 15{,}000 + 10{,}000 + 3{,}000 = 44{,}250$.` },
            { md: md`Fulfilment: $1{,}500 + 2 \times 600 + 3 \times 200 = 3{,}300$. Base $= 47{,}550$; costs $= 47{,}550 \times 1.10 = 52{,}305$.` },
            { md: md`Revenue: $12{,}000 + 12{,}000 + 7{,}500 = 31{,}500$. Profit $= 31{,}500 - 52{,}305 = -20{,}805$. Cost per attendee $= 52{,}305 / 150 = 348.70$.` },
            { md: md`**Diagnosis.** Prizes alone (USD 15,000) are almost half the sponsor revenue, and a hired venue duplicates what a host could give. The headline tier is 23 % of costs, so concentration is fine; the problem is total cost, not the tiers.` },
          ],
          result: md`Draft 1 loses about USD 20,800. Do not fix it by inventing more sponsors; change the plan.`,
        },
        {
          kind: "worked",
          mode: "worked",
          title: "Draft 2: the committed plan",
          given: md`**Illustrative numbers, USD.** Changes: capacity 120 (the host's hall); hall given in-kind by a licensed host, cash venue cost USD 2,000 (after-hours security and cleaning); catering USD 45 per head; Suhail-funded cash prizes USD 6,000 (3,000 / 2,000 / 1,000), with sponsor track prizes paid by the sponsor directly to winners under the contract; production USD 6,000 (AV, backup wifi line, power strips, photo, insurance); marketing USD 1,000 (design, small paid boost; most reach comes through partners). Three tiers: **Headline USD 6,000 x 1** (fulfilment 600), **Partner USD 3,500 x 4** (300), **Supporter USD 1,500 x 4** (100). Contingency 10 %.`,
          steps: [
            { md: md`Fixed: $F = 2{,}000 + 6{,}000 + 6{,}000 + 1{,}000 = 15{,}000$. Per head: $v N = 45 \times 120 = 5{,}400$.` },
            { md: md`Fulfilment: $600 + 4 \times 300 + 4 \times 100 = 2{,}200$. Base $= 15{,}000 + 5{,}400 + 2{,}200 = 22{,}600$. Contingency $= 2{,}260$. Costs $C = 24{,}860$.` },
            { md: md`Revenue: $6{,}000 + 4 \times 3{,}500 + 4 \times 1{,}500 = 26{,}000$. Profit $= 26{,}000 - 24{,}860 = 1{,}140$ (4.4 % of revenue). Cost per attendee $= 24{,}860 / 120 = 207.17$.` },
            { md: md`**Concentration.** Headline share of costs $= 6{,}000 / 24{,}860 = 24.1\%$: inside the MLH guidance that the top tier should be no more than about 25 % of the budget, so losing the headline sponsor hurts but does not kill the event.` },
            { md: md`**Sensitivity: one Partner withdraws.** Revenue 22,500; fulfilment falls by 300, so costs $= (22{,}600 - 300) \times 1.10 = 24{,}530$; profit $= -2{,}030$. But the contingency of 2,260 is a reserve: if no risk materialises, cash outcome $= -2{,}030 + 2{,}260 = +230$. The nine-sponsor plan has almost no slack, which is why the pipeline must cover more than nine (lesson 3).` },
          ],
          result: md`Committed plan: costs USD 24,860 including USD 2,260 contingency, sponsor revenue USD 26,000 from nine sponsors in three tiers, planned surplus USD 1,140, cost per builder USD 207. In-kind (hall, credits) is recorded in the sponsor ledger, not in this P&L.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "How far can the plan stretch?",
          given: md`Same committed plan: revenue $R = 26{,}000$, fixed $F = 15{,}000$, fulfilment $2{,}200$, per head $v = 45$, contingency $c = 0.10$.`,
          steps: [
            {
              md: md`Marginal cost of one more builder: $v(1+c) = 45 \times 1.10 = 49.50$ USD.`,
              hidden: true,
              check: { prompt: "Marginal cost per extra builder", answer: 49.5, unit: "USD", tolerance: { abs: 0.1 } },
            },
            {
              md: md`Break-even capacity: $N^* = (26{,}000 / 1.10 - 15{,}000 - 2{,}200) / 45 = (23{,}636.4 - 17{,}200) / 45 = 143.0$ builders.`,
              hidden: true,
              check: { prompt: "Largest headcount the revenue supports", answer: 143, unit: "builders", tolerance: { abs: 1 } },
            },
            {
              md: md`If the host could seat 140 and a Partner asks for 20 extra seats for its engineers, the extra cost is $20 \times 49.50 = 990$ USD, inside the margin; but the hall seats 120, so the answer is a waitlist, not a bigger event.`,
              hidden: true,
              check: { prompt: "Extra cost of 20 seats", answer: 990, unit: "USD", tolerance: { abs: 1 } },
            },
          ],
          result: md`Revenue supports up to about 143 builders; the binding constraint is the hall (120), not the money. Quote USD 49.50 per extra seat when sponsors ask.`,
        },
        {
          kind: "chart",
          chart: "bar",
          title: "Committed plan: where the USD 24,860 goes (illustrative)",
          xKey: "line",
          yLabel: "USD",
          series: [{ key: "usd", label: "Budget" }],
          data: [
            { line: "Prizes", usd: 6000 },
            { line: "Production", usd: 6000 },
            { line: "Catering and swag", usd: 5400 },
            { line: "Contingency", usd: 2260 },
            { line: "Fulfilment", usd: 2200 },
            { line: "Venue (cash)", usd: 2000 },
            { line: "Marketing", usd: 1000 },
          ],
          caption: "Prizes and production are the two largest lines; both are fixed, which is why the plan's margin is thin at 120 builders and why sponsor-funded track prizes matter.",
        },
      ],
    },
    {
      layer: "field",
      title: "Quotes, payment terms and the cash gate",
      blocks: [
        {
          kind: "md",
          md: md`### How the budget is built in practice

- **Owner.** The Finance Lead owns the budget sheet; Events and Programming collects quotes; Partnerships owns the sponsor revenue rows; you approve the version that goes to sponsors. One sheet, versioned, with an assumptions tab.
- **Quotes.** At least two written quotes for every line above about USD 1,000. Ask each vendor for the deposit, the cancellation schedule (what is refundable until when) and the headcount change deadline. These dates drive the cash gate.
- **Payment terms with sponsors.** 50 % on signature and the balance by T-4 weeks, or 100 % on signature for Supporter tier. Invoice from the entity that signs the contract; if Suhail has no entity yet, decide that first (Structures module, sh07), because a sponsor's finance team will not pay a personal account.
- **Tax.** Saudi VAT is 15 % on taxable supplies. Whether a sponsorship invoice from a non-Saudi entity to a Saudi sponsor carries Saudi VAT depends on the entity and the supply; get an adviser's answer before you quote prices, and quote ex VAT.
- **Currency.** The Saudi riyal is pegged to the US dollar at 3.75, so USD budgeting for a Riyadh event carries little exchange risk; a Cairo event would not have that property.

### The cash gate

Every vendor has a date after which its deposit or full fee is no longer refundable. List them; the earliest large one sets the gate. In the worked plan the caterer, AV and security commit at **T-6 weeks (Friday 12 March 2027)**. Rule: at the gate, **signed sponsor money (contracts in hand, at least first instalments paid) must cover all costs that become non-refundable after the gate, plus contingency**. If not, shrink (fewer seats, smaller prizes) or move the date; do not go ahead hoping late sponsors close.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "What the Finance Lead checks each week",
          md: md`Signed and paid sponsor revenue vs committed costs; weighted pipeline vs the remaining gap (lesson 3); the next refundability deadline; contingency released to date and against which risk; and whether the headcount assumption still matches acceptances and reconfirmations.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How event budgets go wrong",
          md: md`**Counting in-kind as cash** and discovering the gap when the caterer invoices. **Contingency spent as a slush fund** on upgrades nobody approved. **Prizes promised before money is signed**: announce prizes only once they are funded. **Ignoring fulfilment**: booths, banners and sponsor seats cost money for every tier sold. **No gate**: the event becomes a sunk-cost decision the week before.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Check before you rely on it",
          md: md`Saudi VAT at 15 % and the SAR peg at 3.75 per USD are long-standing, but the VAT treatment of cross-border sponsorship invoices depends on facts about Suhail's entity that do not yet exist. Ask a Saudi tax adviser or check ZATCA guidance before quoting.`,
        },
        { kind: "xref", to: "sh03-l01", note: "Event P&L anatomy: fixed and variable costs, break-even and contribution, taught in full." },
        { kind: "xref", to: "sh03-l02", note: "Budgeting a hackathon: line items, contingency, cash timing and in-kind, the method this capstone applies." },
        { kind: "xref", to: "sh07-l01", note: "Legal structure options and where to incorporate: decides which entity signs sponsor contracts and invoices." },
        { kind: "xref", to: "fc06-l07", note: "Budgeting and scenario planning in Founder Core: base, bear and bull cases and cash triggers. The cash gate here is a cash trigger for one event." },
        { kind: "xref", to: "fc06-l04", note: "Burn, runway and default alive: Suhail has no runway, so each event must be cash-positive or explicitly funded." },
        {
          kind: "question",
          question: {
            id: "sh10-l02-p1",
            type: "short",
            prompt: md`**Capstone artifact 2: the budget and P&L.** For your event (from artifact 1), produce: (1) the budget table with every line classified fixed, per head or fulfilment, and the source of each number (quote, estimate, assumption); (2) the P&L: revenue by tier, costs with contingency, profit, cost per builder; (3) break-even revenue, the break-even capacity and the marginal cost per extra builder; (4) the contingency size, how you sized it and who releases it; (5) the cash gate: date, rule and what you shrink first if you miss it; (6) what is in-kind and how you record it. Use illustrative numbers and show the arithmetic.`,
            rubric: [
              "Budget lines are complete for a hackathon (venue, catering, prizes, production incl. wifi and security, marketing, fulfilment) and classified fixed, per head or fulfilment with a source for each.",
              "P&L arithmetic is correct: C = (F + vN + sum of fulfilment)(1 + c); profit, cost per builder and headline share of costs (at most about 25 %) computed.",
              "Break-even revenue, break-even capacity and marginal cost per builder are computed correctly and interpreted (which constraint binds).",
              "Contingency is sized top-down and bottom-up (risk register EMV), has a named releaser, and is treated as a reserve that becomes surplus if unused.",
              "Cash gate has a date tied to vendor refundability, a rule comparing signed and paid sponsor money with non-refundable costs, and an ordered shrink plan.",
              "In-kind support is kept out of the cash P&L and recorded at fair value in a sponsor ledger; no invented sponsors or past results.",
            ],
            modelAnswer: md`**Riyadh 01, illustrative USD.**

(1) Fixed: venue cash 2,000 (host quote: security and cleaning), prizes 6,000 (decision), production 6,000 (two AV quotes; includes backup wifi line and insurance), marketing 1,000 (estimate). Per head: catering and swag 45 x 120 = 5,400 (caterer quote). Fulfilment: Headline 600, Partner 300, Supporter 100 per sponsor (estimate).

(2) Revenue: 6,000 + 4 x 3,500 + 4 x 1,500 = 26,000. Base 15,000 + 5,400 + 2,200 = 22,600; contingency 10 % = 2,260; costs 24,860. Profit 1,140. Cost per builder 207. Headline 24.1 % of costs.

(3) Break-even revenue 24,860. Capacity $N^* = (26{,}000/1.1 - 17{,}200)/45 = 143$; the hall (120) binds, not money. Marginal cost 49.50 per builder.

(4) Contingency 2,260: top-down 10 %; bottom-up risk register EMV about 2,120 (lesson 4), so 10 % covers it. Released only by the Finance Lead against a named risk, logged; unspent becomes the float for event two.

(5) Gate: Friday 12 March 2027 (T-6 weeks), when catering, AV and security deposits become non-refundable. Rule: signed contracts with first instalments paid must cover the 20,400 of non-fulfilment costs that commit after the gate plus contingency. Shrink order: cash prizes to 3,000 (sponsor track prizes stay), production extras, then capacity to 90.

(6) In-kind: host hall (fair value from the host's rate card), API and cloud credits, mentors; recorded in the sponsor ledger and the post-event report, never in break-even.`,
            explanation: md`A budget that reconciles, with a gate and a governed contingency, is what lets an unpaid team run an event with no reserves.`,
            concepts: ["sh10.event-pnl", "sh10.break-even-capacity", "sh10.contingency-reserve", "sh10.cash-gate", "sh10.in-kind"],
            difficulty: 2,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh10-l02-q1",
      type: "numeric",
      prompt: md`Fixed costs USD 12,000, per head USD 40 for 100 builders, fulfilment USD 1,500, contingency 12 %. What are total costs in USD?`,
      answer: 19600,
      unit: "USD",
      tolerance: { abs: 5 },
      explanation: md`Base $= 12{,}000 + 4{,}000 + 1{,}500 = 17{,}500$; $C = 17{,}500 \times 1.12 = 19{,}600$.`,
      concepts: ["sh10.event-pnl"],
      difficulty: 1,
    },
    {
      id: "sh10-l02-q2",
      type: "numeric",
      prompt: md`Sponsor revenue USD 20,000, fixed costs USD 11,000, fulfilment USD 1,800, per head USD 50, contingency 10 %. What is the largest number of builders this revenue supports (round down)?`,
      answer: 107,
      unit: "builders",
      tolerance: { abs: 1 },
      explanation: md`$N^* = (20{,}000/1.10 - 11{,}000 - 1{,}800)/50 = (18{,}181.8 - 12{,}800)/50 = 107.6$, so 107.`,
      concepts: ["sh10.break-even-capacity"],
      difficulty: 2,
    },
    {
      id: "sh10-l02-q3",
      type: "mcq",
      prompt: md`A host gives its hall free, worth USD 8,000 on its rate card. How does it enter the plan?`,
      options: [
        "As USD 8,000 of revenue, which offsets the caterer's bill",
        "In the sponsor ledger and the report at fair value, with the host recognised; not in the cash P&L or the break-even",
        "Not at all, since no money moves",
        "As a reduction in contingency",
      ],
      answer: 1,
      explanation: md`In-kind support is real value and should be recognised and reported, but it pays no cash cost. Counting it as revenue hides the cash gap.`,
      concepts: ["sh10.in-kind"],
      difficulty: 1,
    },
    {
      id: "sh10-l02-q4",
      type: "decision",
      prompt: md`At the cash gate (T-6 weeks), signed and paid sponsor money covers 70 % of the costs that become non-refundable. Three more sponsors say "very likely, contract next week". What do you do?`,
      options: [
        { text: "Go ahead at full scale; three likely sponsors cover the rest", score: 0.2, feedback: "That is hope, not a gate. If one slips, an unpaid team owns the loss." },
        { text: "Commit only what signed money covers: shrink cash prizes and production extras now, keep the full capacity booking only if the caterer's headcount change deadline allows a later cut, and restore items as contracts arrive", score: 1, feedback: "You keep the event alive, protect the team from a loss and keep upside if the sponsors sign." },
        { text: "Cancel the event", score: 0.3, feedback: "Too early: 70 % covered with a shrink plan is a viable event." },
        { text: "Ask the volunteer leads to guarantee the gap personally", score: 0, feedback: "Never put unpaid leads' money at risk; it breaks the team." },
      ],
      explanation: md`The gate compares signed and paid money with non-refundable commitments. Below it, shrink in the pre-agreed order; do not go ahead on verbal promises.`,
      concepts: ["sh10.cash-gate"],
      difficulty: 2,
    },
    {
      id: "sh10-l02-q5",
      type: "multi",
      prompt: md`Which statements about contingency are correct? Select all that apply.`,
      options: [
        "Size it as the larger of a top-down percentage and the risk register's expected cost",
        "Anyone on the team may spend it on improvements",
        "Unspent contingency becomes surplus",
        "One named person releases it against a named risk",
        "It should be counted as profit in the plan shown to sponsors",
      ],
      answer: [0, 2, 3],
      explanation: md`Contingency is a governed reserve. It is a cost line in the plan, becomes surplus only after the event if unused, and is never presented as profit in advance.`,
      concepts: ["sh10.contingency-reserve"],
      difficulty: 1,
    },
    {
      id: "sh10-l02-q6",
      type: "numeric",
      prompt: md`In the committed plan (costs USD 24,860, revenue USD 26,000), what is the headline sponsor's USD 6,000 as a percentage of costs?`,
      answer: 24.1,
      unit: "%",
      tolerance: { abs: 0.1 },
      explanation: md`$6{,}000 / 24{,}860 = 24.1\%$, just inside the guidance of no more than about 25 % for the top tier.`,
      concepts: ["sh10.event-pnl"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh10-l02-f1", front: "Event cost formula", back: md`$C = (1+c)\left(F + vN + \sum_k f_k n_k\right)$: fixed, per head, fulfilment, then contingency.`, concepts: ["sh10.event-pnl"] },
    { id: "sh10-l02-f2", front: "Break-even capacity", back: md`$N^* = \left(R/(1+c) - F - \sum f_k n_k\right)/v$: the most builders a given revenue supports.`, concepts: ["sh10.break-even-capacity"] },
    { id: "sh10-l02-f3", front: "Marginal cost of one more builder", back: md`$v(1+c)$; USD 49.50 at USD 45 per head and 10 % contingency.`, concepts: ["sh10.break-even-capacity"] },
    { id: "sh10-l02-f4", front: "Cash gate rule", back: "At the earliest big refundability deadline, signed and paid sponsor money must cover the costs that commit after it plus contingency; otherwise shrink in a pre-agreed order.", concepts: ["sh10.cash-gate"] },
    { id: "sh10-l02-f5", front: "In-kind support", back: "Recognise and report it at fair value in the sponsor ledger; never count it as revenue in the cash P&L.", concepts: ["sh10.in-kind"] },
    { id: "sh10-l02-f6", front: "Committed plan numbers (illustrative)", back: "Costs USD 24,860 (incl. 2,260 contingency), revenue USD 26,000 from 9 sponsors, surplus USD 1,140, USD 207 per builder, headline 24.1 % of costs.", concepts: ["sh10.event-pnl", "sh10.contingency-reserve"] },
  ],
};

export default lesson;
