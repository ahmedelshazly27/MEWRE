import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh03-l02",
  title: "Budgeting a meetup, a hackathon and a conference: line items, contingency, cash timing and in-kind",
  summary:
    "The same P&L logic gives three very different budgets: a meetup that lives on an in-kind venue, a hackathon carried by sponsors, and a Suhail Season conference where tickets matter and the cash float is the real risk. This lesson builds all three line by line, sets contingency, draws the month-by-month cash curve of a conference that is profitable on paper but needs about USD 108,000 of float, and sets rules for valuing in-kind contributions.",
  minutes: 75,
  objectives: [
    "Build a line-item budget for a meetup, a 24-hour hackathon and a two-day conference, with stated assumptions",
    "Choose and defend a contingency percentage, and say what contingency may and may not be spent on",
    "Draw a monthly cash curve from deposits, supplier terms and sponsor payment terms, and read off the peak funding need",
    "Compute cancellation exposure at each commitment date and set go/no-go gates on it",
    "Value in-kind contributions (venues, credits, food) for the P&L and for sponsor tiers without inflating either",
  ],
  concepts: [
    { id: "sh03.line-item-budget", name: "Line-item event budget", description: "Every cost as a separate line with quantity, unit price, source (quote or assumption) and owner, grouped as fixed, variable and fulfilment, so it can be checked, compared with quotes and reconciled to invoices.", competency: "sh-events", related: ["sh03.event-pnl"] },
    { id: "sh03.contingency", name: "Event contingency", description: "A percentage held on top of the base budget for unplanned costs on planned scope; sized by novelty of the format (10 % repeat, 15 to 20 % first conference); never spent on upgrades.", competency: "sh-events", related: ["m08.contingency"] },
    { id: "sh03.cash-timing", name: "Event cash timing and peak funding need", description: "Deposits and suppliers are paid before sponsor invoices clear and ticket platforms pay out, so a profitable event needs a cash float equal to the most negative cumulative cash position.", competency: "sh-events", related: ["fc06.accrual-vs-cash"] },
    { id: "sh03.cancellation-exposure", name: "Cancellation exposure", description: "Non-refundable supplier commitments at a date minus the cash you could keep if you cancelled; the basis for go/no-go gates before each deposit.", competency: "sh-events", related: ["sh03.cash-timing"] },
    { id: "sh03.in-kind-valuation", name: "In-kind valuation", description: "Counting donated venues, food or services at the cost you actually avoid, not at the donor's list price, and capping the in-kind share of any tier because in-kind does not pay suppliers.", competency: "sh-partnerships", related: ["sh03.line-item-budget"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Three formats, one structure",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Suhail will run all three formats: frequent meetups and hackathons to build the community, and the Suhail Season conference as the annual flagship. They fail for different reasons. Meetups die when the free venue disappears; hackathons die when prizes are promised before sponsors sign; conferences die from cash, not from losses, because the venue wants its deposit nine months before the sponsors pay. With unpaid leads and no reserves, the cash curve decides whether a first Suhail Season is possible at all.`,
        },
        {
          kind: "md",
          md: md`### What a line item contains

A budget line is not a number; it is a **quantity, a unit price, a source and an owner**. "Catering 4,800" cannot be checked. "Catering: 120 heads x USD 40 (3 meals, snacks, coffee, T-shirt), quote from caterer A dated 12 March, owner Events lead, charged on the guaranteed number fixed 5 days before" can be checked, challenged and reconciled.

### Three illustrative budgets (USD)

All three are illustrative; no Suhail event has run. Currency assumption: USD, with KWD 1 = USD 3.25 for Kuwait quotes; SAR and AED are pegged at about 3.75 and 3.6725 per USD. State in the budget whether figures include VAT (Saudi Arabia charges 15 % and the UAE 5 % on most services).

| Line | Meetup (60 people, evening) | Hackathon (120 builders, 24 h) | Suhail Season (600 attendees, 2 days) |
|---|---|---|---|
| Venue | 0 cash (host company office, worth about 1,500) | 3,000 (university hall) | 60,000 (hotel or convention centre) |
| Production (AV, stage, wifi, streaming) | 0 (host) | 3,000 | 45,000 |
| Catering and swag | 720 (12 per head) | 4,800 (40 per head) | 42,000 (35 per head per day) |
| Prizes | 0 | 8,000 | 0 |
| Speakers (travel, hotels) | 100 (gifts) | 0 | 40,000 (20 speakers x 2,000) |
| Marketing and design | 100 | 1,000 | 15,000 |
| Crew, registration, security | 200 (photographer) | 0 (volunteers, venue security) | 12,000 |
| Print, badges, signage | 60 | 0 | 6,000 |
| Insurance, permits, legal | 0 | 0 | 5,000 |
| Sponsor fulfilment | 0 | 2,100 | 20,000 |
| **Base** | **1,180** | **21,900** | **245,000** |
| Contingency | 10 % = 118 | 10 % = 2,190 | 15 % = 36,750 |
| **Total cost** | **1,298** | **24,090** | **281,750** |
| Revenue | 1 Community sponsor 1,000 + venue in kind | 26,000 sponsorship | 230,000 sponsorship + 60,000 tickets |
| **Result** | **minus 298: needs a food sponsor or a second sponsor** | **plus 1,910** | **plus 8,250 (2.8 % margin)** |

Three structural differences matter more than any single line:

1. **The meetup's real budget is the venue.** Cash costs are small; the in-kind office is the largest value. Lose the host and the meetup's cost roughly doubles.
2. **The hackathon's risk is prizes.** USD 8,000 of prizes is more than a third of the base budget and is usually announced early. Fund each prize with a named sponsor or announce it only when signed.
3. **The conference's risk is cash and attendance mix.** Tickets carry about 21 % of revenue, so a weak ticket campaign is a real loss; and the venue, AV and speaker travel are paid months before sponsors finish paying.`,
        },
        {
          kind: "md",
          md: md`### Contingency: sizing and rules

Contingency covers **unplanned costs on planned scope**: a price rise, an extra security shift, a replacement projector, a speaker's rebooked flight. Size it by novelty, not by optimism:

| Situation | Contingency |
|---|---|
| Repeat of a format you have run, same venue | 5 to 10 % |
| New venue or new city, known format | 10 % |
| First conference, first time with this venue and AV supplier | 15 to 20 % |

Rules that keep it honest: the Finance Lead owns it; any draw is logged with a reason; scope additions (a second stage, nicer badges) are budget changes approved as such, not contingency draws; unused contingency is reported as such after the event and not spent in the last week. This is the same principle as project contingency in Track 0, applied to a one-night project.`,
        },
        { kind: "xref", to: "m08.contingency", note: "Track 0 covers contingency vs management reserve on capital projects; the same separation applies to event budgets." },
        {
          kind: "md",
          md: md`### Cash timing: profitable is not the same as funded

Suppliers and sponsors run on different clocks. Illustrative terms for the Suhail Season budget above (read every real contract):

- **Venue:** 30 % deposit at signing (nine months out), 40 % at four months, 30 % one month before.
- **AV and production:** 30 % at three months, 70 % within 30 days after the event.
- **Catering:** 50 % one month before, 50 % after.
- **Speaker travel:** booked and paid one to two months before.
- **Sponsors:** 50 % invoiced at signing and paid on net 60 terms, 50 % invoiced after the event and paid two months later.
- **Tickets:** conservatively, the ticketing platform pays out after the event (check yours: some pay out on a schedule, some hold funds).

The cumulative position is:`,
        },
        { kind: "equation", formula: "sh03-cash-position" },
        {
          kind: "chart",
          chart: "line",
          title: "Illustrative Suhail Season: cumulative cash (USD k) by month relative to the event (M)",
          xKey: "month",
          xLabel: "Month relative to event",
          yLabel: "Cumulative cash, USD k",
          series: [
            { key: "base", label: "Base terms (50 % at signing, net 60)" },
            { key: "headline", label: "Headline sponsors pay 100 % at signing" },
          ],
          data: [
            { month: "M-9", base: -18, headline: -18 },
            { month: "M-8", base: -18, headline: -18 },
            { month: "M-7", base: -18, headline: -18 },
            { month: "M-6", base: -25.5, headline: -25.5 },
            { month: "M-5", base: -8, headline: 12 },
            { month: "M-4", base: -7, headline: 33 },
            { month: "M-3", base: -9.5, headline: 30.5 },
            { month: "M-2", base: -11, headline: 29 },
            { month: "M-1", base: -79.75, headline: -39.75 },
            { month: "M", base: -108, headline: -68 },
            { month: "M+1", base: -106.75, headline: -66.75 },
            { month: "M+2", base: 8.25, headline: 8.25 },
          ],
          caption: "Same P&L (profit USD 8,250), very different float. Under base terms the event needs about USD 108k of cash at its lowest point; asking the two headline sponsors to pay in full at signing cuts that to USD 68k.",
        },
        {
          kind: "md",
          md: md`### Cancellation exposure

At any date the question is: **if we cancel today, how much do we lose?**`,
        },
        { kind: "equation", formula: "sh03-cancellation-exposure" },
        {
          kind: "md",
          md: md`Signed sponsorship lowers the **probability** that you will have to cancel, but most sponsor contracts oblige you to refund unearned fees if the event does not happen, so it rarely lowers the **loss** if you do. Build the exposure line next to the cash line and put a gate before each deposit: "we pay the second venue deposit only if signed sponsorship is at least 70 % of the sponsorship the budget needs and exposure after payment stays below the reserve we can lose."

### In-kind contributions

In-kind support is common and valuable: a host company's office, a university hall, a cloud provider's credits, a coffee chain's coffee. Three rules keep it from distorting the budget:

1. **Value it at the cost you avoid**, not at the donor's list price. A hotel ballroom "worth" USD 20,000 that you would otherwise have replaced with a USD 3,000 university hall is worth USD 3,000 to the budget.
2. **Show it on both sides** of the P&L (in-kind sponsorship revenue and the matching cost) so the donor gets credit and next year's budget shows what you would pay if the host changes.
3. **Cap in-kind in any tier** (for example at half of the tier price), because in-kind does not pay the caterer. Credits given to builders (API or cloud credits) are valuable to the builders but avoid no Suhail cost: recognise them as a technology partnership, not as cash-equivalent Gold.`,
        },
        { kind: "xref", to: "fc06-l01", note: "Founder Core accounting basics: accrual vs cash and why the P&L and the bank balance diverge." },
      ],
    },
    {
      layer: "applied",
      title: "Reading the conference cash curve",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Where the USD 108k float comes from",
          given: md`Illustrative Suhail Season budget above: total cost USD 281,750 (with 15 % contingency, assumed fully drawn around the event), sponsorship USD 230,000 (2 Headline at 40,000, 6 Gold at 15,000, 10 Silver at 6,000) signed between M-7 and M-1, tickets USD 60,000 (400 paid at an average net USD 150) paid out at M+1. Terms as listed in the theory section.`,
          steps: [
            { md: md`**Early months:** the 30 % venue deposit (USD 18k) at M-9 opens a hole of $-18$k. Insurance, legal and the first marketing spend take it to $-25.5$k at M-6.` },
            { md: md`**Sponsor cash arrives from M-5:** first halves of the Headline and early Gold deals land two months after signing (USD 20k at M-5, 27.5k at M-4). The balance hovers between $-7$k and $-11$k through M-2.` },
            { md: md`**The cliff at M-1:** venue balance 18k, catering deposit 21k, speaker travel 20k, print 6k, fulfilment 10k, marketing 2.5k and a third of contingency 12.25k: outflows of USD 89.75k against inflows of 21k. Balance $-79.75$k.` },
            { md: md`**Event month M:** crew 12k, fulfilment 10k, contingency 12.25k against 6k of sponsor cash: balance $-108$k, the low point. $D_{max} = 108$k.` },
            { md: md`**After the event:** at M+1 AV (31.5k), catering (21k) and the last contingency are paid while the ticket payout (60k) arrives; at M+2 the second halves of all sponsor invoices (115k) arrive and the balance ends at the P&L profit, $+8.25$k.` },
          ],
          result: md`A conference with a positive P&L needs about USD 108k of float for two to three months (illustrative). With unpaid leads and no reserves, Suhail either negotiates the float away (sponsor prepayments, AV paid after the event, a venue with a lower deposit) or does not run a conference of this size in year one.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: move the Headline payments",
          given: md`Same plan, but both Headline sponsors (USD 40,000 each, signed at M-7 and M-6) agree to be invoiced 100 % at signing, still on net 60. Everything else is unchanged. Use the base cash curve: $-18, -18, -18, -25.5, -8, -7, -9.5, -11, -79.75, -108, -106.75, +8.25$ (USD k, M-9 to M+2).`,
          steps: [
            { md: md`Each Headline sponsor's second USD 20k moves from M+2 to two months after signing: +20k at M-5 and +20k at M-4. From M-4 to M+1 the cumulative balance is therefore 40k higher.` },
            { md: md`New low point at M: $-108 + 40 = -68$ USD k.`, hidden: true, check: { prompt: "New peak funding need (USD k)", answer: 68, tolerance: { abs: 0.5 }, unit: "USD k" } },
            { md: md`Reduction in float: $108 - 68 = 40$ USD k, exactly the cash pulled forward, because the low point falls after both payments.`, hidden: true, check: { prompt: "Reduction in peak funding need (USD k)", answer: 40, tolerance: { abs: 0.5 }, unit: "USD k" } },
          ],
          result: md`Two prepayment conversations cut the float by 40k. Offer something that costs you little in exchange (first choice of speaking slot, earlier logo placement, a founding-partner title), not a cash discount larger than your cost of money.`,
        },
        {
          kind: "question",
          question: {
            id: "sh03-l02-p1",
            type: "numeric",
            prompt: md`A cloud provider offers USD 50,000 of credits for hackathon builders plus USD 3,000 cash, and asks for the Gold tier (USD 10,000 cash price, which includes USD 800 of fulfilment). Credits avoid no Suhail cost. If you accept, by how much (USD) does event profit change compared with selling the same Gold slot to a cash sponsor at full price? Ignore contingency.`,
            answer: -7000,
            tolerance: { abs: 1 },
            unit: "USD",
            explanation: md`Both deals carry the same USD 800 fulfilment, so the difference is cash: $3{,}000 - 10{,}000 = -7{,}000$ USD. The credits are valuable to builders and may help attract them, but they do not pay the caterer. Offer a Technology partner recognition for credits plus cash, and keep Gold for cash sponsors.`,
            concepts: ["sh03.in-kind-valuation"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Budgets that survive contact with suppliers",
      blocks: [
        {
          kind: "md",
          md: md`### How it is done

- **Quotes before numbers.** Three quotes for any line over about USD 2,000 (venue, AV, catering). Put the quote reference on the line.
- **Budget versions.** v0 (assumptions), v1 (quotes), v2 (signed contracts), actuals. The Finance Lead keeps the version history; everyone else edits the forecast tab only.
- **Payment calendar.** Every contract's payment and cancellation dates go into one calendar with the cash curve. Venue and AV contracts are where most of the exposure sits.
- **Season and calendar.** Gulf events cluster between October and April; July and August are hot and many people travel. Ramadan moves about 11 days earlier each year (in 2027 it falls around February to early March; check the announced dates) and changes timing, catering and evening programmes. Avoid weeks of major regional tech conferences that compete for the same sponsors and speakers.
- **Permits and venue rules.** Hotels and convention centres often handle part of the permitting; public or ticketed events in Saudi Arabia need permits (see the callout).`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Event permits in Saudi Arabia",
          md: md`Secondary sources (research brief, November 2026) say public or ticketed events in Saudi Arabia need a General Entertainment Authority (GEA) permit, one per event, through its e-portal; conferences and exhibitions fall under the Saudi Conventions and Exhibitions General Authority (SCEGA); foreign organisers typically need a MISA licence and a commercial registration first. Whether a free, invite-only hackathon needs a permit was not found. Confirm with GEA, SCEGA or a local law firm before budgeting a Riyadh or Jeddah event, and budget time as well as fees.`,
        },
        { kind: "sources", refs: ["sh03-r7", "sh03-r8"] },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Common budget failures",
          md: md`Hotel venues with food-and-beverage minimums that exceed your catering line; AV quotes that exclude technicians' overtime; speaker travel booked late at double the fare; "free" university venues that require paid security and cleaning; prize money promised in the launch post before the sponsor signed; and VAT forgotten on Saudi or UAE invoices (15 % and 5 %).`,
        },
        {
          kind: "checklist",
          title: "Budget sign-off checklist (Finance Lead)",
          items: [
            "Every line has quantity, unit price, source (quote or assumption) and owner",
            "Contingency percentage matches the novelty of the format and has a named owner",
            "VAT and currency treatment stated; KWD, SAR and AED quotes converted at a stated rate",
            "Monthly cash curve built from contract terms; peak funding need known and funded",
            "Cancellation exposure computed before each deposit, with a go/no-go gate",
            "In-kind lines valued at avoided cost and shown on both sides of the P&L",
            "Prizes tied to signed sponsor lines",
          ],
        },
        {
          kind: "question",
          question: {
            id: "sh03-l02-p2",
            type: "short",
            prompt: md`Draft the year-one budget memo for Suhail's Finance Lead covering one meetup, one hackathon and a decision on whether to run a first Suhail Season in 2027. Use labelled illustrative numbers. Include: (1) a line-item budget for each format with contingency; (2) the cash curve or a month-by-month cash table for the conference option and its peak funding need; (3) cancellation exposure at the two main deposit dates and the go/no-go gate you will apply; (4) your in-kind valuation rules; (5) a recommendation (run, shrink or postpone the conference) with the two numbers that decide it.`,
            rubric: [
              "Each format has a line-item budget with quantities, unit prices and a contingency percentage justified by novelty",
              "The conference cash view uses explicit payment terms and correctly identifies the peak funding need",
              "Cancellation exposure is computed at named dates and recognises that signed sponsorship is usually refundable on cancellation",
              "In-kind contributions are valued at avoided cost, shown on both sides, and capped in tiers; credits are not treated as cash",
              "The recommendation follows from the numbers (float vs reserves, signed sponsorship vs need) and states a decision date",
              "All venture numbers are labelled illustrative; no invented sponsors or traction",
            ],
            modelAnswer: md`**Meetup (illustrative):** 60 people at a host company's office (in kind, avoided cost USD 1,500 shown on both sides); food 720, gifts 100, marketing 100, photographer 200, badges 60; base 1,180, contingency 10 %, total 1,298; revenue one Community sponsor 1,000; gap 298 closed by a food sponsor.

**Hackathon:** as Lesson 1: total 24,090 with 10 % contingency, sponsorship 26,000, profit 1,910. Prizes released in announcements only when the matching sponsor signs.

**Conference option:** 600 attendees, base 245,000, contingency 15 %, total 281,750; sponsorship 230,000, tickets 60,000; profit 8,250. Cash under standard terms reaches $-108$k at event month; with both Headline sponsors prepaying in full, $-68$k.

**Exposure:** after the first venue deposit (M-9): 18,000 plus the venue's 50 % cancellation fee from M-6, so about 30,000 by M-6. After the second deposit (M-4): 42,000 venue plus 13,500 AV at M-3: about 55,500. Sponsor fees are refundable on cancellation, so they do not offset exposure.

**Gate:** pay the second venue deposit only if signed sponsorship is at least 70 % of 221,750 (about 155,000) and a reserve or sponsor prepayment covers the 68,000 float.

**In-kind rules:** avoided cost; both sides of the P&L; at most 50 % of any tier in kind; credits recognised as Technology partner.

**Recommendation:** postpone the full Suhail Season to 2028 and run a one-day, 250-person Season pilot in late 2027, because (1) the 68 to 108k float exceeds any reserve Suhail will have in 2027 and (2) the 2.8 % margin leaves no room for a weak ticket campaign. Decision date: end of Q2 2027, after four hackathons give real sponsor and no-show data.`,
            explanation: md`The memo is judged on whether the decision follows from cash and exposure, not from enthusiasm.`,
            concepts: ["sh03.line-item-budget", "sh03.cash-timing", "sh03.cancellation-exposure", "sh03.in-kind-valuation"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to Suhail's Partnerships lead why a conference that shows a profit can still be impossible to run, and what two sponsor conversations can fix it.",
          keyPoints: [
            "Profit is earned on the P&L when revenue and costs are recognised; cash moves on contract payment terms",
            "Deposits, travel and suppliers are paid months before sponsor invoices clear and ticket payouts arrive",
            "The most negative cumulative cash position is the float that must be funded",
            "Asking large sponsors to prepay, or suppliers to accept later payment, moves cash and shrinks the float",
            "Signed sponsorship usually has to be refunded if the event is cancelled, so it does not reduce cancellation exposure",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh03-l02-q1",
      type: "numeric",
      prompt: md`Cumulative cash of an event by month is $-12, -20, -5, -46, -31, +6$ USD k. What is the peak funding need in USD k?`,
      answer: 46,
      tolerance: { abs: 0.1 },
      unit: "USD k",
      explanation: md`$D_{max} = -\min_t B_t = 46$ USD k. The event ends in profit (+6k) but needs 46k of float at its lowest point.`,
      concepts: ["sh03.cash-timing"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh03-l02-q2",
      type: "mcq",
      prompt: "A hotel offers its ballroom in kind. Its list price is USD 20,000; without it you would have used a university hall for USD 3,000. At what value should the budget show the in-kind contribution?",
      options: ["USD 20,000", "USD 3,000", "Zero", "USD 11,500 (the midpoint)"],
      answer: 1,
      explanation: md`Value in-kind support at the cost you actually avoid. The donor's list price inflates both sides of the P&L and misleads the next budget.`,
      concepts: ["sh03.in-kind-valuation"],
      difficulty: 1,
    },
    {
      id: "sh03-l02-q3",
      type: "multi",
      prompt: "Which of these are legitimate draws on event contingency? (Select all that apply.)",
      options: [
        "The caterer raises its per-head price by 8 % after the quote expired",
        "Adding a second stage because a sponsor asked for it",
        "An extra overnight security shift required by the venue",
        "Upgrading badges to printed lanyards with sponsor logos",
        "Replacing a projector that failed on the day",
      ],
      answer: [0, 2, 4],
      explanation: md`Contingency covers unplanned costs on planned scope. A second stage and upgraded badges are scope changes, approved as budget changes (and ideally charged to the sponsor who asked).`,
      concepts: ["sh03.contingency"],
      difficulty: 2,
    },
    {
      id: "sh03-l02-q4",
      type: "numeric",
      prompt: md`At M-4 you have paid USD 42,000 of non-refundable venue deposits and owe a further USD 10,000 cancellation fee if you cancel now. Signed sponsorship is USD 160,000, all refundable if the event is cancelled. What is your cancellation exposure in USD?`,
      answer: 52000,
      tolerance: { abs: 1 },
      unit: "USD",
      explanation: md`$E = 42{,}000 + 10{,}000 - 0 = 52{,}000$ USD. Refundable sponsor fees do not offset the loss.`,
      concepts: ["sh03.cancellation-exposure"],
      difficulty: 2,
    },
    {
      id: "sh03-l02-q5",
      type: "decision",
      prompt: md`It is M-4 for an illustrative first Suhail Season. Signed sponsorship is USD 120,000 of the 221,750 needed; the venue's second deposit (USD 24,000) is due this week; Suhail has USD 15,000 of reserves. What do you do?`,
      options: [
        { text: "Pay the deposit: the pipeline is strong and sponsors usually sign late.", score: 0.1, feedback: "Signed is 54 % of need and exposure after payment would exceed reserves. Hope is not a gate." },
        { text: "Ask the venue to move the deposit four weeks or convert to a smaller room, and use those weeks to close the late-stage sponsors; if the gate (70 % signed, exposure within reserves) is not met by then, shrink to a one-day format.", score: 1, feedback: "Keeps the event alive, protects the reserves and makes the decision on evidence by a fixed date." },
        { text: "Cancel the conference now.", score: 0.4, feedback: "Premature: there are cheaper options (renegotiating the deposit, shrinking the format) before cancelling, and the first deposit is already sunk." },
      ],
      explanation: md`Go/no-go gates before each deposit compare signed revenue with need and exposure with what the organisation can lose.`,
      concepts: ["sh03.cancellation-exposure", "sh03.cash-timing"],
      difficulty: 3,
    },
    {
      id: "sh03-l02-q6",
      type: "order",
      prompt: "Order the budget versions from first to last.",
      items: ["v0: assumptions", "v1: quotes", "v2: signed contracts", "Actuals reconciled to invoices"],
      explanation: md`Each version replaces assumptions with firmer evidence; the reconciliation becomes next year's v0.`,
      concepts: ["sh03.line-item-budget"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh03-l02-f1", front: "A budget line contains", back: "Quantity, unit price, source (quote or assumption) and owner.", concepts: ["sh03.line-item-budget"] },
    { id: "sh03-l02-f2", front: "Contingency sizing", back: "5 to 10 % repeat format; 10 % new venue; 15 to 20 % first conference.", concepts: ["sh03.contingency"] },
    { id: "sh03-l02-f3", front: "Peak funding need", back: md`$D_{max} = -\min_t B_t$, the most negative cumulative cash position.`, concepts: ["sh03.cash-timing"] },
    { id: "sh03-l02-f4", front: "Why signed sponsorship does not cut cancellation exposure", back: "Sponsor contracts usually refund unearned fees if the event is cancelled.", concepts: ["sh03.cancellation-exposure"] },
    { id: "sh03-l02-f5", front: "In-kind valuation rule", back: "Avoided cost, shown on both sides of the P&L, capped as a share of any tier.", concepts: ["sh03.in-kind-valuation"] },
    { id: "sh03-l02-f6", front: "API or cloud credits for builders", back: "Valuable to builders, avoid no organiser cost: recognise as a technology partnership, not as cash-equivalent tier value.", concepts: ["sh03.in-kind-valuation"] },
  ],
};

export default lesson;
