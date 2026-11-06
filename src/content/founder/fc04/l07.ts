import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc04-l07",
  title: "Pricing, packaging and negotiation",
  summary:
    "Price from the value you create relative to the buyer's next best alternative, not from your cost or a competitor's list. Package around a value metric, anchor with a defensible number, never concede without getting something back, and know both sides' walk-away points before you sit down.",
  minutes: 85,
  objectives: [
    "You can compute economic value to the customer (reference value plus differentiation value) and set a value-based price inside it.",
    "You can design good-better-best packages around a value metric.",
    "You can compute the volume increase a discount requires and explain why discounts are expensive.",
    "You can define BATNA, reservation prices and the ZOPA for a deal with numbers, and run a give-get concession plan.",
  ],
  concepts: [
    { id: "fc04.value-based-pricing", name: "Value-based pricing", description: "Setting price between the cost floor and the economic value to the customer (reference value of the next best alternative plus differentiation value), capturing a share of the value created.", competency: "fc-sales", related: ["fc04.quantified-pain"] },
    { id: "fc04.packaging", name: "Packaging and value metric", description: "Bundling features into tiers (good-better-best) and charging per a unit that scales with customer value (rigs, sites, MW), so price grows with the value delivered.", competency: "fc-sales", related: ["fc04.value-based-pricing"] },
    { id: "fc04.anchoring", name: "Anchoring", description: "The first credible number in a negotiation pulls the final outcome toward it; sellers anchor with a defensible list price and the top tier first.", competency: "fc-sales", related: ["fc04.batna-zopa"] },
    { id: "fc04.give-get", name: "Give-get concessions", description: "Every concession is traded for something of value (term, volume, upfront payment, reference, case study, faster signature), planned in advance and made in decreasing steps.", competency: "fc-sales", related: ["fc04.anchoring"] },
    { id: "fc04.batna-zopa", name: "BATNA, reservation price and ZOPA", description: "BATNA is each side's best alternative if no deal is reached; it sets their reservation price (walk-away point); the ZOPA is the range between the seller's floor and the buyer's ceiling.", competency: "fc-sales", related: ["m13.batna-zopa"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Value, packages and the numbers behind a negotiation",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Your first prices set reference points that every later customer, investor and competitor will see. Under-priced early deals are hard to raise later, and discounts given to "get the logo" become the market price. For Afterwave the value is large and measurable (lesson 2 found EUR 0.63 m/yr of pain at one illustrative prospect); for Mizan the value is energy recovered from soiling. Price from that, and negotiate from a position you have computed.`,
        },
        {
          kind: "md",
          md: md`### Three ways to set a price

| Method | Logic | Problem |
|---|---|---|
| **Cost-plus** | Cost to serve plus a margin | Software's marginal cost is low, so it leaves most value on the table |
| **Competitor-based** | Near what similar tools charge | There may be no true comparable; you inherit their positioning |
| **Value-based** | A share of the value created relative to the buyer's next best alternative | Requires discovery numbers; that is the point |

### Economic value to the customer (EVC)

Nagle's framework splits the buyer's maximum rational price into two parts:`,
        },
        { kind: "equation", formula: "fc04-evc" },
        {
          kind: "md",
          md: md`The **reference value** is what the next best alternative costs (another vendor, hiring, building in-house). The **differentiation value** is the net extra value your product delivers over that alternative (positive or negative). Your price sits between your cost floor and EVC. Where in that range? Leave the buyer an obvious return: a price that is a modest share of the value created (often quoted as 10 to 30 %) makes the business case easy for the champion to sell, and leaves room to negotiate.

### Packaging and the value metric

The **value metric** is the unit you charge for. It should grow with the value the customer gets, be easy to count, and not punish adoption.

| Candidate metric (Afterwave) | Grows with value? | Easy to count? | Punishes adoption? |
|---|---|---|---|
| Per engineer seat | Weakly | Yes | Yes: teams limit logins |
| Per rig (test bench) | Yes: more rigs, more change pain | Yes | No |
| Per GB of captured data | Somewhat | Yes | Yes: teams capture less |
| Per test executed | Inversely (Ripple reduces tests) | Yes | Yes: conflicts with the product |

Then build **good-better-best** tiers. Ramanujam and Tacke recommend designing packages from willingness-to-pay conversations, with features sorted into leaders (drive the purchase), fillers (nice to have) and killers (features some buyers do not want and that put them off a package). Illustrative Afterwave tiers, priced per site per year:

| Tier | Contents | Rigs | Illustrative list price |
|---|---|---|---|
| **Capture** | Lockstep | up to 3 | EUR 30k/yr |
| **Team** | Lockstep + Enclave + Ripple | up to 6 | EUR 90k/yr |
| **Enterprise** | Team + unlimited rigs, on-prem SLA, validation support | unlimited | from EUR 150k/yr |

The middle tier is the one you expect most buyers to choose; the top tier is the **anchor** that makes it look reasonable.

### Discounts are expensive

A discount $d$ on a product with gross margin $GM$ requires more volume to keep the same gross profit:`,
        },
        { kind: "equation", formula: "fc04-discount-volume" },
        {
          kind: "md",
          md: md`At 78 % margin, a 25 % discount needs $0.25/0.53 = 47$ % more volume to break even on gross profit, and in enterprise sales the volume does not appear because of the discount. A discount is therefore only worth giving in exchange for something that is worth its cost: a longer term, more rigs, upfront payment, a reference, a faster signature.

### BATNA, reservation price and ZOPA

From Fisher and Ury's *Getting to Yes*: your **BATNA** (best alternative to a negotiated agreement) is what you will do if this deal does not happen. It sets your **reservation price**, the point at which you walk away. The buyer has one too.`,
        },
        { kind: "equation", formula: "fc04-zopa" },
        {
          kind: "md",
          md: md`The deal lands somewhere inside the ZOPA. Where depends on **anchors** (the first credible number pulls the result toward it), **information** (who knows the other side's reservation price), and **concessions** (their size, sequence and what was traded for them). Improve your BATNA before negotiating: a fuller pipeline is the best discount defence there is.

### Give-get

Plan concessions before the meeting, in decreasing steps, and attach a get to each:

| Give | Get |
|---|---|
| 10 % off list | 3-year term |
| Price lock for 3 years | Annual upfront payment |
| 5 % off | Named reference and case study within 6 months |
| Extra rig at no charge for year 1 | Signature by a date that matters to you |
| Pilot fee fully credited | Conversion within 30 days |

Never give without getting, and never split the difference by reflex: it rewards the more extreme opening position.`,
        },
        {
          kind: "widget",
          widget: "pricing-experiment",
          props: { price: 60, unitCost: 15 },
          caption: "Illustrative Suhail Season ticket (USD): with many buyers you can test prices and see the profit-maximising point. Enterprise deals (a handful a year) cannot be A/B tested; there you price from value and learn from each negotiation instead.",
        },
        { kind: "xref", to: "m13-l05", note: "Track 0 lesson on negotiation and influence (BATNA and ZOPA, interest-based negotiation, Gulf negotiation culture)." },
      ],
    },
    {
      layer: "applied",
      title: "Pricing Ripple and negotiating the deal",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Value-based price and ZOPA for an illustrative Afterwave deal",
          given: md`From lesson 2 (illustrative prospect, numbers confirmed by the buyer): wasted reruns EUR 207,360/yr, escaped defects EUR 300,000/yr, delay EUR 120,000/yr. Assume Afterwave addresses 80 % of the rerun cost, half the escape cost and 2 of the 3 delay weeks. The next best alternative is an in-house rule-based selection script maintained by one engineer at EUR 110k/yr loaded, which addresses about a third of the rerun cost. Afterwave's cost to serve this site is about EUR 20k/yr.`,
          steps: [
            { md: md`**Value delivered by Afterwave:** $0.8\times207{,}360 + 0.5\times300{,}000 + 2\times40{,}000 = 165{,}888 + 150{,}000 + 80{,}000 = 395{,}888$ EUR/yr.` },
            { md: md`**Value delivered by the alternative:** $207{,}360/3 = 69{,}120$ EUR/yr, at a cost (reference value) of EUR 110,000/yr.` },
            { md: md`**Differentiation value:** $V_{diff} = 395{,}888 - 69{,}120 = 326{,}768$ EUR/yr. **EVC** $= 110{,}000 + 326{,}768 = 436{,}768$, about EUR 437k/yr.` },
            { md: md`**Price:** the Team tier at EUR 90k/yr is $90/437 = 21$ % of EVC, gives the buyer about $396/90 = 4.4$x value over price, and a gross margin of $(90-20)/90 = 78$ %.` },
            { md: md`**Reservation prices:** Afterwave's floor is EUR 60k (below that, founder time is better spent on other pipeline, and the price would become the reference for the next customers). The buyer's ceiling is about EUR 100k: the VP can approve up to EUR 100k without the CFO, and above that the in-house option starts to look attractive to finance. **ZOPA** $= [60, 100]$ EUR k, 40k wide.` },
            { md: md`**Anchor and plan:** present Enterprise (from EUR 150k) first, then Team at EUR 90k. Planned gives: 10 % for a 3-year term with annual upfront payment (EUR 81k/yr); a reference and case study for the extra rig in year 1.` },
            { md: md`**Outcome:** EUR 81k/yr for 3 years, total contract value $81\times3 = 243$ EUR k, gross margin $(81-20)/81 = 75$ %. Compare a straight 25 % discount to EUR 67.5k for one year: margin 70 %, no term, and a reference price a quarter below list.` },
          ],
          result: md`Price from value (EUR 90k inside an EVC of about EUR 437k), negotiate inside a ZOPA you have estimated (EUR 60k to 100k), and trade every concession. The 10 % given bought three years of revenue and cash up front.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: discount and ZOPA arithmetic",
          given: md`Illustrative Mizan analytics subscription: gross margin 80 %. A buyer asks for 20 % off. Separately, Mizan's floor for a site is EUR 55k and you estimate the buyer's ceiling at EUR 85k.`,
          steps: [
            { md: md`Volume increase needed to keep gross profit after a 20 % discount: $0.20/(0.80-0.20)$.` },
            { md: md`= **33.3 %** more volume.`, hidden: true, check: { prompt: "Required volume increase (%)", answer: 33.3, unit: "%", tolerance: { abs: 0.3 } } },
            { md: md`ZOPA width: $85-55$.` },
            { md: md`= **EUR 30k**.`, hidden: true, check: { prompt: "ZOPA width (EUR k)", answer: 30, unit: "EUR k", tolerance: { abs: 0 } } },
          ],
          result: md`A 20 % discount needs a third more customers to pay for itself, which one enterprise deal will not supply. Inside a EUR 30k ZOPA, a 20 % discount from a list of EUR 80k (EUR 16k) would give away more than half of the room, so it should cost the buyer a lot.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Pricing pages, negotiation meetings and procurement",
      blocks: [
        {
          kind: "md",
          md: md`### In practice

- **Write prices down early.** A price range in the first or second meeting ("sites like yours typically run EUR 80 to 120k a year") qualifies budget and anchors before the buyer builds a number in their head.
- **Discount authority:** decide your floor and your give-get table before the meeting. With cofounders, agree who can approve what.
- **Procurement is a different negotiation.** The champion and economic buyer negotiate value; procurement is often measured on savings against the first quote. Expect a request for a discount whatever the price, and keep a planned, traded concession for them.
- **Order form hygiene:** list price, discount, term, payment terms, price escalation in later years (for example a fixed annual uplift), and what happens at renewal. Avoid "first-year only" discounts that become a renewal fight.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Pricing and negotiation mistakes",
          md: md`- **Pricing from your cost.** At 80 % margin your cost is irrelevant to the buyer's decision.
- **Discounting to win the logo.** The discount becomes public quickly, and the next buyer asks for it.
- **Negotiating against yourself.** Lowering the price before the buyer has asked, or after silence.
- **Unplanned concessions in the room.** Every unplanned give is a give without a get.
- **Splitting the difference by reflex.** It rewards the more extreme anchor.
- **Lying about BATNA.** Bluffing about other offers is discoverable and ends trust; strengthen your real BATNA instead.`,
        },
        {
          kind: "callout",
          tone: "kuwait",
          title: "Negotiating in the Gulf",
          md: md`Relationship and respect matter more than speed, and senior decisions are often taken in person after several meetings. Bargaining is normal and expected, so leave planned room and trade it. In public procurement, by contrast, price is usually fixed by the tender process and post-bid negotiation is often not permitted (see the Track 0 procurement module): your negotiation happens before the bid, in shaping the requirement and in the price you submit.`,
        },
        { kind: "scenario", scenario: "fc04-s3" },
        {
          kind: "question",
          question: {
            id: "fc04-l07-p1",
            type: "short",
            prompt: md`Produce a pricing and negotiation plan for Afterwave or Mizan. Include: (1) the value metric and why; (2) three packages (good-better-best) with contents and illustrative prices; (3) an EVC calculation for one illustrative buyer (reference value, differentiation value, your price as a share of EVC); (4) your BATNA and reservation price and your estimate of the buyer's, with the ZOPA; (5) a give-get table of at least four concessions; (6) the opening anchor and the first two sentences you will say when you present the price.`,
            rubric: [
              "Value metric grows with customer value, is countable and does not punish adoption, with the trade-offs stated.",
              "Three coherent packages with a clear middle tier and an anchoring top tier; prices labelled illustrative.",
              "EVC computed correctly from a stated next best alternative and differentiation value; price sits well inside EVC and above cost.",
              "BATNAs, reservation prices and ZOPA stated with numbers and reasoning on both sides.",
              "Every concession in the give-get table has a valuable get; concessions decrease in size.",
              "Opening is anchored on value and the top tier, and is defensible rather than inflated.",
            ],
            modelAnswer: md`**Venture:** Afterwave (illustrative).

**Value metric:** per rig per year. Rigs scale with change pain and value, are easy to count, and do not discourage engineers from using the product. Seats punish adoption; per-test pricing conflicts with Ripple, which reduces tests.

**Packages:** Capture (Lockstep, up to 3 rigs) EUR 30k/yr; Team (Lockstep, Enclave, Ripple, up to 6 rigs) EUR 90k/yr; Enterprise (unlimited rigs, on-prem SLA, validation support) from EUR 150k/yr.

**EVC (buyer from lesson 2):** value delivered EUR 396k/yr; alternative = in-house script plus one engineer at EUR 110k/yr delivering EUR 69k/yr; $V_{diff} = 327$k; EVC about EUR 437k. Team at EUR 90k is 21 % of EVC, 4.4x return for the buyer, 78 % gross margin.

**BATNA and ZOPA:** our BATNA is two other S4 deals this quarter; floor EUR 60k. Buyer's BATNA is the in-house script; their ceiling is about EUR 100k (VP approval limit). ZOPA EUR 60k to 100k.

**Give-get:** 10 % off for a 3-year term; price lock for annual upfront payment; 5 % off for a reference and case study within 6 months; an extra rig in year 1 for signature before 30 June; pilot fee credit for conversion within 30 days.

**Opening:** "Based on the numbers your team confirmed, rerun waste, escapes and delay cost you about EUR 630k a year, and we expect to remove about EUR 400k of it. Most labs your size choose the Team plan at EUR 90k a year; teams that want unlimited rigs and validation support take Enterprise, from EUR 150k."`,
            explanation: md`Good plans are built on discovery numbers, put the price well inside EVC, and decide concessions before the meeting.`,
            concepts: ["fc04.value-based-pricing", "fc04.packaging", "fc04.batna-zopa", "fc04.give-get", "fc04.anchoring"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to Omar Abu Harb, before a Mizan negotiation, what BATNA and ZOPA are and how you will use them, with numbers.",
          keyPoints: [
            "BATNA is what each side does if there is no deal; it sets the reservation (walk-away) price.",
            "ZOPA is the range between the seller's floor and the buyer's ceiling; no ZOPA means no deal.",
            "Strengthen your own BATNA (more pipeline) before negotiating.",
            "Estimate the buyer's BATNA (do nothing, another vendor, in-house) to estimate their ceiling.",
            "Anchor first with a defensible number and trade every concession for something of value.",
          ],
        },
        { kind: "sources", refs: ["fc04-r4", "fc04-r5", "fc04-r7"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc04-l07-q1",
      type: "numeric",
      prompt: md`Gross margin is 70 %. You give a 15 % discount. By what percentage must volume rise to keep gross profit unchanged?`,
      answer: 27.3,
      tolerance: { abs: 0.3 },
      unit: "%",
      explanation: md`$d/(GM-d) = 0.15/(0.70-0.15) = 0.15/0.55 = 0.273$, so 27.3 % more volume.`,
      concepts: ["fc04.give-get"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "fc04-l07-q2",
      type: "numeric",
      prompt: md`The buyer's next best alternative costs EUR 120k/yr. Your product delivers EUR 200k/yr more net value than that alternative. What is the EVC (EUR k/yr)?`,
      answer: 320,
      tolerance: { abs: 0.1 },
      unit: "EUR k/yr",
      explanation: md`$EVC = V_{ref} + V_{diff} = 120 + 200 = 320$ EUR k/yr. Your price should sit well inside it.`,
      concepts: ["fc04.value-based-pricing"],
      difficulty: 1,
    },
    {
      id: "fc04-l07-q3",
      type: "mcq",
      prompt: "Seller's reservation price EUR 70k; buyer's reservation price EUR 65k. What follows?",
      options: [
        "The ZOPA is EUR 65k to 70k",
        "There is no ZOPA; no deal is possible unless one side's alternatives or the scope change",
        "Split the difference at EUR 67.5k",
        "The seller should drop to EUR 65k",
      ],
      answer: 1,
      explanation: md`A ZOPA exists only if the buyer's ceiling is at least the seller's floor. Changing scope, term or value (or either BATNA) can create one.`,
      concepts: ["fc04.batna-zopa"],
      difficulty: 1,
    },
    {
      id: "fc04-l07-q4",
      type: "mcq",
      prompt: "Which is the best value metric for a test-selection product like Ripple?",
      options: ["Per test executed", "Per engineer seat", "Per rig or test bench", "Per GB of data stored"],
      answer: 2,
      explanation: md`Rigs scale with value, are easy to count, and do not penalise use. Per-test pricing fights the product (it reduces tests); seats and data volume discourage adoption.`,
      concepts: ["fc04.packaging"],
      difficulty: 2,
    },
    {
      id: "fc04-l07-q5",
      type: "multi",
      prompt: "Which are good 'gets' in exchange for a discount? (Select all that apply.)",
      options: ["A multi-year term", "Annual upfront payment", "A named reference and case study", "Nothing: discounts build goodwill", "Signature by a date that matters to you"],
      answer: [0, 1, 2, 4],
      explanation: md`Each get has real value to you. A discount without a get just moves the price permanently.`,
      concepts: ["fc04.give-get"],
      difficulty: 1,
    },
    {
      id: "fc04-l07-q6",
      type: "order",
      prompt: "Order the steps of preparing a negotiation.",
      items: ["Quantify value and compute EVC", "Set your BATNA and reservation price", "Estimate the buyer's BATNA and ceiling", "Plan the anchor and the give-get table", "Open with the anchor"],
      explanation: md`Value first, then your walk-away, then theirs, then the plan, then the meeting.`,
      concepts: ["fc04.batna-zopa", "fc04.anchoring", "fc04.value-based-pricing"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc04-l07-f1", front: "EVC", back: md`$EVC = V_{ref} + V_{diff}$: cost of the next best alternative plus the net extra value of yours.`, concepts: ["fc04.value-based-pricing"] },
    { id: "fc04-l07-f2", front: "Volume needed to offset a discount", back: md`$\Delta Q/Q = d/(GM-d)$; 25 % off at 78 % margin needs +47 %.`, concepts: ["fc04.give-get"] },
    { id: "fc04-l07-f3", front: "Good value metric", back: "Grows with customer value, easy to count, does not punish adoption (Afterwave: per rig).", concepts: ["fc04.packaging"] },
    { id: "fc04-l07-f4", front: "BATNA", back: "Best alternative to a negotiated agreement; it sets your reservation (walk-away) price.", concepts: ["fc04.batna-zopa"] },
    { id: "fc04-l07-f5", front: "ZOPA", back: "Range between the seller's floor and the buyer's ceiling; if the ceiling is below the floor, there is no deal.", concepts: ["fc04.batna-zopa"] },
    { id: "fc04-l07-f6", front: "Give-get rule", back: "Never concede without getting something of value; plan concessions in decreasing steps before the meeting.", concepts: ["fc04.give-get"] },
    { id: "fc04-l07-f7", front: "Why show the top tier first", back: "Anchoring: it makes the middle tier look reasonable and pulls the negotiation upward.", concepts: ["fc04.anchoring"] },
  ],
  scenarios: [
    {
      id: "fc04-s3",
      title: "The procurement officer says: 25 % off or no signature this quarter",
      dayInLife: true,
      context: md`Illustrative. The VP Engineering at a European drive-unit maker has approved Afterwave's Team plan at EUR 90k/yr. The deal moves to procurement. The category buyer opens: "We need 25 % off to sign this quarter. Your competitors are cheaper." Your floor is EUR 60k; you have two other deals at S4.`,
      start: "a",
      concepts: ["fc04.give-get", "fc04.batna-zopa", "fc04.anchoring"],
      nodes: {
        a: {
          md: md`How do you respond?`,
          choices: [
            { text: "Agree to 25 % to secure the quarter.", score: 1, feedback: "EUR 22.5k a year given with nothing in return, and the new reference price is EUR 67.5k.", next: "d" },
            { text: "Ask which competitor and what scope they quoted, restate the value the VP approved, and ask what would allow them to sign at list this quarter.", score: 9, feedback: "Tests the claim, re-anchors on value, and invites the real requirement without conceding.", next: "b" },
            { text: "Refuse any discount and say the price is final.", score: 4, feedback: "Holds price but ignores that procurement needs to show a saving; may stall the deal.", next: "b" },
          ],
        },
        b: {
          md: md`The buyer admits the comparison is a test-management tool without change impact, and says: "I still need to show a saving."`,
          choices: [
            { text: "Offer 10 % in exchange for a 3-year term with annual upfront payment, documented as a saving against list.", score: 10, feedback: "Procurement gets a recordable saving; you get term and cash. A textbook give-get.", next: "c" },
            { text: "Offer 15 % with no conditions to keep goodwill.", score: 3, feedback: "A larger give with no get. Goodwill does not survive the renewal.", next: "c" },
          ],
        },
        c: {
          md: md`The buyer accepts 10 % for 3 years but asks for the price lock to include annual escalation of 0 %.`,
          choices: [
            { text: "Accept the 0 % escalation for the 3-year term in exchange for a reference and case study within 6 months, and write the renewal terms in the order form.", score: 9, feedback: "A further give traded for a get, and the renewal is protected." },
            { text: "Accept without asking anything.", score: 4, feedback: "Small, but a give without a get teaches procurement that asking works." },
          ],
        },
        d: {
          md: md`Two months later, another prospect's procurement team asks for "the same 25 % you gave your last customer".`,
          choices: [
            { text: "Hold list, explain that terms depend on term and volume, and offer the same give-get table.", score: 5, feedback: "The right repair, but the earlier unearned discount has become a market reference." },
          ],
        },
      },
    },
  ],
};

export default lesson;
