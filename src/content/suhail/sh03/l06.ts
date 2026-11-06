import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh03-l06",
  title: "Ticket pricing and free vs paid events: no-shows, overbooking, price tests and subsidies",
  summary:
    "For most Suhail events the ticket is not a revenue line but a control: it sets who registers, how many turn up and how much food is wasted. This lesson models no-shows and overbooking, compares free, paid and deposit models, prices a conference ticket where every attendee also sells sponsorship (and the room has a fixed number of seats), designs ticket tiers and subsidies for builders across very different incomes, and sets up price experiments that are honest about sample size.",
  minutes: 70,
  objectives: [
    "Compute expected attendance and its spread from registrations and a no-show rate, and set an overbooking level",
    "Compare free, paid and refundable-deposit models on attendance, predictability, revenue and inclusion",
    "Price a conference ticket with the Lerner rule adjusted for sponsor value per attendee and for venue capacity",
    "Design ticket tiers and sponsor-funded subsidies, and compute the average net ticket price after fees",
    "Plan a price experiment with an adequate sample, or recognise when an event cannot supply one",
  ],
  concepts: [
    { id: "sh03.no-show-rate", name: "No-show rate", description: "Share of registered or approved people who do not attend. High for free events, lower for paid ones; it drives catering waste, room overflow risk and the gap between registrations and the attendance you can report.", competency: "sh-events", related: ["sh03.break-even-attendance"] },
    { id: "sh03.overbooking", name: "Overbooking", description: "Accepting more registrations than seats because some will not come; set so that expected attendance plus about two standard deviations stays within capacity, backed by a waitlist and a confirmation step.", competency: "sh-events", related: ["sh03.no-show-rate"] },
    { id: "sh03.free-vs-paid", name: "Free, paid or deposit", description: "A price works as a commitment device: even a small ticket or a deposit refunded on check-in cuts no-shows, at the cost of fewer registrations and some excluded builders; the choice is about predictability and audience, more than revenue.", competency: "sh-events", related: ["sh03.no-show-rate"] },
    { id: "sh03.two-sided-ticket-price", name: "Two-sided ticket pricing", description: "In an event funded by both tickets and sponsors, each extra attendee also raises sponsor value, so the profit-maximising ticket price is lower than the one-sided Lerner price; capacity can then force the price back up.", competency: "sh-events", related: ["fc06.optimal-price", "fc06.elasticity"] },
    { id: "sh03.ticket-tiers", name: "Ticket tiers and subsidies", description: "Early-bird, standard, corporate and student or builder tickets, plus sponsor-funded passes and travel grants, segment willingness to pay and keep the event open to builders on low incomes.", competency: "sh-events", related: ["fc06.price-discrimination"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "The ticket as a control, not a revenue line",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Suhail's audience spans builders in Kuwait, Riyadh and Dubai and builders in Cairo or Amman whose monthly pay is a fraction of a Gulf salary. A price that is trivial for one group excludes the other. At the same time, free events in every community suffer heavy no-shows, which wastes food, misleads sponsors and makes room planning a guess. The ticket decision for each format (free, small fee, deposit, tiered conference pass) is one of the few levers you control fully, and it changes both the P&L and who your community is.`,
        },
        {
          kind: "md",
          md: md`### No-shows and the attendance you can plan

Organisers commonly report that a large share of people registered for free events do not attend, often a third or more, and that even a small price cuts this sharply. These are practitioner rules of thumb, not measured Suhail data: **measure your own rate from the first events** (approved vs checked in) and use it from then on. With $R$ accepted registrations and no-show rate $r$:`,
        },
        { kind: "equation", formula: "sh03-show-up" },
        {
          kind: "md",
          md: md`If you accept $R = \text{cap}/(1-r)$, expected attendance equals capacity and the room overflows about half the time. A safer rule is $\mathbb{E}[N] + 2\sigma_N \le \text{cap}$. For a 120-seat room and $r = 0.4$, solving $0.6R + 2\sqrt{0.24R} = 120$ gives $R \approx 178$, not 200.

The binomial spread assumes builders decide independently. In reality no-shows move together: a sandstorm, a traffic jam, a competing event or a deadline at a large employer shifts everyone. Uncertainty in $r$ is usually bigger than the binomial noise, which is why the operational tools matter more than the formula:

- **Confirmation step** 48 hours before ("confirm or release your seat"), which converts silent no-shows into released seats.
- **Waitlist** with automatic offers as seats are released.
- **Approval-gated registration** (the {Tech: Europe} pattern: free, but selected), which raises commitment because a seat was granted.

### Free, paid or deposit

| Model | No-shows | Registrations | Revenue | Inclusion | Fits |
|---|---|---|---|---|---|
| **Free, open** | Highest | Highest | None | Best | Large meetups with cheap catering |
| **Free, approval-gated** | Lower | Selected | None | Good, if criteria are fair | Hackathons (the community default) |
| **Small fee** (for example USD 5 to 15) | Low | Lower | Small, eaten by fixed fees | Excludes some students and low-income builders | Popular meetups, workshops |
| **Deposit refunded on check-in** | Low | Moderate | Only from no-shows | Better than a fee, but needs a card and cash flow | Hackathons with costly catering |
| **Tiered conference pass** | Lowest | Shaped by tiers | Material | Managed by student and sponsored passes | Suhail Season |

Small fees also run into fixed per-ticket fees:`,
        },
        { kind: "equation", formula: "sh03-net-ticket" },
        {
          kind: "md",
          md: md`With 5 % plus USD 0.50 per ticket (illustrative; check your platform and payment processor), a USD 5 ticket nets USD 4.25: 15 % gone before any cost.

### Pricing a conference ticket when attendees also sell sponsorship

Founder Core finance derives the profit-maximising price for constant-elasticity demand (the Lerner rule): $p^{*} = c\,e/(e-1)$, where $c$ is marginal cost. At a conference, an extra attendee also raises what sponsors will pay (this year through audience-based benefits, next year through the audience number in the deck). Treat that sponsor value per attendee, $u$, as a negative marginal cost:`,
        },
        { kind: "equation", formula: "fc06-lerner" },
        { kind: "equation", formula: "sh03-two-sided-price" },
        {
          kind: "md",
          md: md`Two further constraints override the formula. **Capacity:** if demand at $p^{*}$ exceeds the seats you have, the right price is the one that fills the room, not $p^{*}$. **Audience mix:** sponsors pay for builders, so a price that fills the room with buyers from large companies but no engineers destroys sponsor value; tiers solve this better than one price.`,
        },
        {
          kind: "widget",
          widget: "pricing-experiment",
          props: { price: 150, elasticity: 2, unitCost: 90 },
          caption: "Set customers at the reference price to 400. The widget's profit-maximising price is the one-sided Lerner price (180). Lower the unit cost to 60 (90 minus 30 of sponsor value per attendee) to see the two-sided price (120), then remember the room only holds 400 paid seats.",
        },
        { kind: "xref", to: "fc06-l06", note: "Founder Core pricing economics: elasticity, the Lerner rule, value pricing and price discrimination, derived in general." },
      ],
    },
    {
      layer: "applied",
      title: "Pricing the Suhail Season pass",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "One-sided, two-sided and capacity-constrained prices",
          given: md`Illustrative Suhail Season: 600 attendees, of which 200 are complimentary (speakers, sponsors' passes, press, sponsored builder passes), so at most 400 paid seats. Marginal cost per paid attendee $c$ = USD 90 (two days of catering 70, badge and print 10, fees and extras 10). Demand estimate: 400 paid at USD 150, constant elasticity $e = 2$ (an assumption to test). Sponsor value per extra attendee $u$ = USD 30 (illustrative: the next Season's sponsorship grows with the audience it can show).`,
          steps: [
            { md: md`**One-sided Lerner price:** $p^{*} = 90\times2/(2-1) = 180$ USD. Demand $Q(180) = 400\times(180/150)^{-2} = 277.8$. Ticket contribution $(180-90)\times277.8 = 25{,}000$ USD vs $(150-90)\times400 = 24{,}000$ at 150.` },
            { md: md`**Add sponsor value:** total contribution including $u$: at 180, $25{,}000 + 30\times277.8 = 33{,}333$; at 150, $24{,}000 + 12{,}000 = 36{,}000$. The higher price loses once sponsors are counted.` },
            { md: md`**Two-sided price:** $p^{*} = (90-30)\times2 = 120$ USD. Demand $Q(120) = 400\times(120/150)^{-2} = 625$, total contribution $(120-90)\times625 + 30\times625 = 37{,}500$ USD.` },
            { md: md`**Capacity:** only 400 paid seats exist. At 120 you would turn away 225 buyers. With capacity binding, the best single price is the one where demand equals capacity: **USD 150**, contribution 36,000.` },
            { md: md`**Average cost check (not a pricing input):** cost per attendee is $281{,}750/600 = 470$ USD. Pricing at average cost would ask USD 470 and sell about $400\times(470/150)^{-2} = 41$ paid tickets.` },
          ],
          result: md`Set the standard pass near USD 150 to 180 and use tiers rather than one price (illustrative). Never price from average cost: the fixed costs are sponsors' job. The elasticity is the weakest input; the early-bird window is your first measurement of it.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: overbooking a free hackathon",
          given: md`Illustrative free, approval-gated hackathon in a 180-seat hall. From two earlier events you estimate a no-show rate of 35 % among approved builders. You plan to approve 250.`,
          steps: [
            { md: md`Expected attendance: $250\times(1-0.35)$.` },
            { md: md`$= 162.5$ builders.`, hidden: true, check: { prompt: "Expected attendance", answer: 162.5, tolerance: { abs: 0.5 }, unit: "attendees" } },
            { md: md`Standard deviation if independent: $\sqrt{250\times0.35\times0.65}$.` },
            { md: md`$= \sqrt{56.9} = 7.5$ builders, so $\mathbb{E}[N] + 2\sigma = 177.6$: within 180 seats.`, hidden: true, check: { prompt: "Standard deviation of attendance", answer: 7.54, tolerance: { abs: 0.1 }, unit: "attendees" } },
          ],
          result: md`250 approvals fit on binomial arithmetic alone. But if the true no-show rate is 28 % instead of 35 %, attendance averages 180: no margin at all. Add a confirmation step at 48 hours and a waitlist, and check the break-even ceiling from Lesson 1 for 180 heads.`,
        },
        {
          kind: "question",
          question: {
            id: "sh03-l06-p1",
            type: "numeric",
            prompt: md`A workshop series has marginal cost USD 80 per attendee, sponsor value per attendee USD 20, and ticket demand elasticity 2.5. What is the two-sided profit-maximising ticket price (USD), ignoring capacity?`,
            answer: 100,
            tolerance: { abs: 0.5 },
            unit: "USD",
            explanation: md`$p^{*} = (80-20)\times2.5/(2.5-1) = 60\times1.667 = 100$ USD. The one-sided price would be $80\times1.667 = 133$ USD.`,
            concepts: ["sh03.two-sided-ticket-price"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Tiers, subsidies and price tests in practice",
      blocks: [
        {
          kind: "md",
          md: md`### An illustrative Suhail Season ticket ladder

| Tier | Price (USD) | Seats | Rule | Gross (USD) |
|---|---|---|---|---|
| Early bird | 99 | 100 | Until sold out or M-3 | 9,900 |
| Standard | 179 | 160 | | 28,640 |
| Corporate | 349 | 70 | Companies buying for staff; invoice available | 24,430 |
| Student and builder | 29 | 70 | Verified student or selected builder | 2,030 |
| Sponsored builder pass | 0 (funded) | inside comps | Selected by application; funded by sponsors or travel grants | 0 |
| **Total paid** | | **400** | | **65,000** |

After 5 % plus USD 0.50 per ticket of fees: $65{,}000\times0.95 - 400\times0.5 = 61{,}550$ USD, an average net of about USD 154 per paid ticket, in line with the USD 60,000 in the Lesson 2 budget.

### Subsidies and who you are building for

The research brief notes early-career software engineers in Cairo earning around E£139K a year (Payscale, 2026). At an assumed EGP 50 per USD (check the current rate) that is about USD 2,800 a year, so a USD 150 pass is roughly 5 % of annual pay before flights and hotels. Builder passes and travel grants funded by sponsors (a "sponsor a builder" add-on, for example USD 600 per travel grant) keep the Season regional rather than local, and are among the easiest benefits to sell to hiring and mandate-driven sponsors. Select grantees by published criteria (portfolio, need, country mix), not by who asks loudest.

### Price experiments without fooling yourself`,
        },
        { kind: "equation", formula: "fc06-ab-sample-size" },
        {
          kind: "md",
          md: md`To detect a fall in registration conversion from 20 % to 15 % of page visitors at the usual 5 % significance and 80 % power you need about 900 visitors per arm, roughly 1,800 in total. A first Suhail event page may never see that many visitors. Practical substitutes: early-bird windows as a sequential test (how fast each tier sells), the same price change across several meetups in a row, and asking 20 builders directly what they would pay and why (directional only). Report results as estimates with their sample size, and avoid showing different prices to different visitors for the same seat: it is the fastest way to lose builders' trust.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Ticketing can change the permit question in Saudi Arabia",
          md: md`Secondary sources say public or ticketed events in Saudi Arabia need a GEA permit, with conferences under SCEGA; whether a free, invite-only hackathon needs one was not found (research brief, November 2026). Moving a Riyadh event from free to paid may therefore change its licensing. Confirm before you put a price on a Saudi event page.`,
        },
        { kind: "sources", refs: ["sh03-r7", "sh03-r6"] },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Ticket mistakes",
          md: md`Reporting registrations as attendance to sponsors; catering for registrations; a USD 5 fee that loses 15 % to fees and still excludes students; a single conference price that either empties the student seats or the corporate ones; refunds promised without a cut-off date; and early-bird windows extended three times, which teaches buyers to wait.`,
        },
        {
          kind: "question",
          question: {
            id: "sh03-l06-p2",
            type: "short",
            prompt: md`Write the ticketing policy for Suhail's 2027 events (meetups, hackathons and a Season pilot), using labelled illustrative numbers. Include: (1) the model for each format (free open, approval-gated, fee, deposit or tiered) and why; (2) the no-show assumption, how you will measure it and the overbooking rule with a worked number; (3) the Season ticket ladder with average net price after fees; (4) the two-sided pricing logic, including the capacity check; (5) subsidies and selection criteria for builders on low incomes; (6) one price test you can actually run, with its sample-size limitation.`,
            rubric: [
              "Each format has a model chosen for a stated reason (predictability, audience, inclusion), not only revenue",
              "No-show assumption is labelled, measurement method is defined (approved vs checked in) and an overbooking number is computed with a spread or margin",
              "Ticket ladder sums correctly and average net price accounts for percentage and fixed fees",
              "Pricing uses marginal cost, sponsor value per attendee and the capacity constraint, never average cost",
              "Subsidies are funded (sponsor passes or grants) with published selection criteria",
              "The price test is feasible for Suhail's traffic and its sample-size limitation is stated",
            ],
            modelAnswer: md`**Models (illustrative):** meetups free and open with a 48-hour confirmation step (food is cheap, reach matters); hackathons free and approval-gated (selection raises commitment and quality); Season pilot tiered.

**No-shows:** assume 40 % for open meetups and 30 % for approved hackathon builders until measured; measured as checked-in divided by approved, per event, in the post-event report. Hackathon in a 150-seat hall: approve $R$ such that $0.7R + 2\sqrt{0.21R} \le 150$, about 200 ($\mathbb{E}[N] = 140$, $\sigma = 6.5$, $\mathbb{E}[N] + 2\sigma = 153$, so 195 approvals), plus waitlist.

**Season pilot ladder (250 people, 170 paid):** early bird 79 x 50, standard 149 x 70, corporate 299 x 25, student and builder 19 x 25: gross $3{,}950 + 10{,}430 + 7{,}475 + 475 = 22{,}330$; net after 5 % and USD 0.50: $22{,}330\times0.95 - 85 = 21{,}129$, average USD 124.

**Pricing logic:** marginal cost about USD 45 for one day, sponsor value per attendee about 20, elasticity assumed 2: two-sided $p^{*} = (45-20)\times2 = 50$, but 170 paid seats would sell out far below the standard price, so capacity sets the price; tiers capture willingness to pay.

**Subsidies:** 30 sponsored builder passes and 10 travel grants at USD 600 funded by a "sponsor a builder" add-on; criteria published: portfolio, financial need, country mix, at least 40 % from outside the host country.

**Test:** early-bird sell-through speed at 79 vs a 99 early bird at the second pilot; with about 50 early-bird buyers per event the test is directional only, reported with its sample size.`,
            explanation: md`A ticketing policy is good when it controls attendance and audience mix, prices from marginal cost and capacity, and stays honest about evidence.`,
            concepts: ["sh03.free-vs-paid", "sh03.overbooking", "sh03.two-sided-ticket-price", "sh03.ticket-tiers"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to Suhail's Events lead why the Season ticket should not be priced at the cost per attendee, and what sets it instead.",
          keyPoints: [
            "Average cost per attendee includes fixed costs that sponsors are meant to cover",
            "The pricing input is marginal cost per extra attendee, plus demand elasticity",
            "Each attendee also raises sponsor value, which lowers the best ticket price",
            "When seats are limited, the price that fills the room overrides the formula",
            "Tiers and sponsored passes serve different willingness to pay and keep builders in the room",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh03-l06-q1",
      type: "numeric",
      prompt: md`You accept 300 registrations for a free meetup with an expected no-show rate of 45 %. What is the expected attendance?`,
      answer: 165,
      tolerance: { abs: 0.5 },
      unit: "attendees",
      explanation: md`$300\times(1-0.45) = 165$.`,
      concepts: ["sh03.no-show-rate"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh03-l06-q2",
      type: "mcq",
      prompt: md`A 100-seat room, no-show rate 0.4. You accept $R = 100/0.6 = 167$ registrations. What is the approximate probability the room overflows?`,
      options: ["About 2 %", "About 16 %", "About 50 %", "About 95 %"],
      answer: 2,
      explanation: md`Expected attendance equals capacity, so attendance is above capacity about half the time. Accept fewer, so that the mean plus two standard deviations fits.`,
      concepts: ["sh03.overbooking"],
      difficulty: 2,
    },
    {
      id: "sh03-l06-q3",
      type: "numeric",
      prompt: md`A ticket costs USD 10 with 5 % percentage fees and a USD 0.50 fixed fee. What is the net revenue per ticket in USD?`,
      answer: 9,
      tolerance: { abs: 0.01 },
      unit: "USD",
      explanation: md`$10\times0.95 - 0.5 = 9.00$ USD.`,
      concepts: ["sh03.free-vs-paid"],
      difficulty: 1,
    },
    {
      id: "sh03-l06-q4",
      type: "numeric",
      prompt: md`Marginal cost per conference attendee is USD 100 and elasticity is 3. What is the one-sided Lerner price (USD)?`,
      answer: 150,
      tolerance: { abs: 0.5 },
      unit: "USD",
      explanation: md`$p^{*} = 100\times3/(3-1) = 150$ USD.`,
      concepts: ["sh03.two-sided-ticket-price"],
      difficulty: 1,
    },
    {
      id: "sh03-l06-q5",
      type: "decision",
      prompt: md`Your free Suhail meetups have a 50 % no-show rate and you waste about a third of the food. The Events lead proposes a USD 10 fee. Many attendees are students. What do you do?`,
      options: [
        { text: "Introduce the USD 10 fee for everyone.", score: 0.4, feedback: "Cuts no-shows but excludes students and earns little after fees." },
        { text: "Keep it free, add a 48-hour confirm-or-release step and a waitlist, cater on confirmations, and test a refundable deposit at one event.", score: 1, feedback: "Attacks the no-show mechanism directly while keeping the event open; the deposit test gives evidence before a policy change." },
        { text: "Keep everything as it is; no-shows are normal.", score: 0, feedback: "Food waste and unpredictable rooms are costs you can reduce cheaply." },
      ],
      explanation: md`A price is one commitment device among several; confirmation steps and deposits achieve much of the effect with less exclusion.`,
      concepts: ["sh03.free-vs-paid", "sh03.no-show-rate"],
      difficulty: 2,
    },
    {
      id: "sh03-l06-q6",
      type: "multi",
      prompt: "Which are legitimate inputs to the conference ticket price? (Select all that apply.)",
      options: ["Marginal cost per extra attendee", "Average cost per attendee including the venue", "Price elasticity of demand", "Sponsor value per extra attendee", "Number of paid seats available"],
      answer: [0, 2, 3, 4],
      explanation: md`Average cost includes fixed costs that do not change with one more attendee; pricing from it is the classic error.`,
      concepts: ["sh03.two-sided-ticket-price"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "sh03-l06-f1", front: "Expected attendance and spread", back: md`$\mathbb{E}[N] = R(1-r)$, $\sigma_N = \sqrt{R r (1-r)}$.`, concepts: ["sh03.no-show-rate"] },
    { id: "sh03-l06-f2", front: "Safe overbooking rule", back: md`Choose $R$ so that $\mathbb{E}[N] + 2\sigma_N \le$ capacity, plus a confirmation step and a waitlist.`, concepts: ["sh03.overbooking"] },
    { id: "sh03-l06-f3", front: "Two-sided ticket price", back: md`$p^{*} = (c-u)\,e/(e-1)$: sponsor value per attendee lowers the price; capacity can raise it back.`, concepts: ["sh03.two-sided-ticket-price"] },
    { id: "sh03-l06-f4", front: "Net ticket revenue", back: md`$p(1-\phi) - \phi_0$; small tickets lose a large share to fixed fees.`, concepts: ["sh03.free-vs-paid"] },
    { id: "sh03-l06-f5", front: "Refundable deposit", back: "Charged at registration, refunded on check-in: commitment without a net price, revenue only from no-shows.", concepts: ["sh03.free-vs-paid"] },
    { id: "sh03-l06-f6", front: "Why not price from cost per attendee", back: "It includes fixed costs; price from marginal cost, elasticity, sponsor value and capacity.", concepts: ["sh03.two-sided-ticket-price", "sh03.ticket-tiers"] },
  ],
};

export default lesson;
