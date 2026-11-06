import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz11-l06",
  title: "Pricing analytics: software, service or savings share",
  summary:
    "Mizan can charge per MWp per year, per site, as a managed service or as a share of verified savings. The value per MWp at a Gulf IPP is small (a few hundred USD per MWp per year in the illustrative cases), so the price unit, the site minimum and the share of value you take decide whether a plant is a customer at all. Software carries high margins and scales; services sell more easily early but cap margins; savings shares align incentives but need measurement and verification that both sides trust.",
  minutes: 80,
  objectives: [
    "You can price the same plant three ways (licence, managed service, savings share) and compute fee, value capture and gross margin for each",
    "You can set a per-MWp price with a site minimum and find the plant size below which the minimum binds",
    "You can explain when a savings share works and what baseline, floor, cap and verification it needs",
    "You can produce a price sheet for Mizan's analytics that an IPP or a Kuwaiti public buyer can budget",
  ],
  concepts: [
    {
      id: "mz11.pricing-unit",
      name: "Pricing unit for plant analytics",
      description:
        "The quantity the price scales with: per MWp per year (scales with value and is intuitive to owners; SwishOS is reported to price on a sliding scale by capacity), per site (simple, suits small plants), or per verified saving. Seats and users are the wrong unit for plant analytics.",
      competency: "mz-business",
      related: ["fc04.packaging", "fc04.value-based-pricing"],
    },
    {
      id: "mz11.site-minimum",
      name: "Site minimum fee",
      description:
        "A floor on the annual fee per site that covers onboarding and cost to serve; it binds below a capacity of the minimum divided by the per-MWp price, and it shows quickly which small plants cannot be served profitably.",
      competency: "mz-business",
      related: ["mz11.pricing-unit", "fc03.min-acv"],
    },
    {
      id: "mz11.savings-share",
      name: "Savings-share pricing",
      description:
        "A fee equal to an agreed share of savings verified against a baseline fixed in advance, usually with a floor and a cap. Aligns incentives and lowers the buyer's risk, but carries measurement-and-verification cost, disputes and revenue volatility.",
      competency: "mz-business",
      related: ["mz04.incentive-gap", "mz11.value-capture"],
    },
    {
      id: "mz11.value-capture",
      name: "Value capture ratio",
      description:
        "Fee divided by the buyer's own annual value from the product. Keep it low enough that the buyer's return is obvious and survives a bad year; compute it per buyer type, never with the national value for an IPP.",
      competency: "mz-business",
      related: ["fc04.value-based-pricing", "mz11.value-by-holder"],
    },
    {
      id: "mz11.service-margin",
      name: "Software vs service margin",
      description:
        "A licence carries hosting and support costs only; a managed service adds analyst and site time. The service sells more easily to Gulf O&M teams early but lowers gross margin; report the two lines separately and plan to automate the service.",
      competency: "mz-business",
      related: ["mz11.pricing-unit"],
    },
  ],
  sections: [
    // ------------------------------------------------------------------ THEORY
    {
      layer: "theory",
      title: "What to charge for, and how much of the value to take",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Pricing is the decision that turns lessons 1 to 5 into a business. At Gulf tariffs, the value of soiling analytics per MWp is small, so a price that looks modest per MWp may still be too high for a small plant, and a price that captures too much value makes every O&M budget meeting a fight. You will set this price yourself, defend it to investors as a unit of growth, and live with it for years, because Gulf customers remember the first number.`,
        },
        {
          kind: "xref",
          to: "fc04-l07",
          note: "Founder Core: value-based pricing (EVC), packaging, anchoring, give-get and BATNA/ZOPA. This lesson applies them to plant analytics and adds per-MWp, site-minimum and savings-share mechanics.",
        },
        {
          kind: "md",
          md: md`## The value per MWp is the ceiling

From the illustrative cases in this module:

| Case | Annual value to that buyer | Per MWp |
|---|---|---|
| 500 MWp IPP, 20-day schedule re-optimised (lesson 1) | about USD 156k | about USD 0.31k |
| 800 MWp periodic plant, 4-day cycle re-optimised (lesson 3) | about USD 140k | about USD 0.18k |
| 1,000 MWp robot plant, faster detection of missed rows, energy only (lesson 3) | about USD 8.5k | about USD 0.01k |
| 500 MWp at state fuel value, 20-day schedule (lesson 1) | about USD 454k | about USD 0.91k |

Even before choosing a pricing model, this table says three things. Frequency or interval optimisation alone at an IPP supports a fee of tens of USD per MWp per year, not hundreds. Robot plants need a different value story (fleet O&M, warranty, reporting). And the same product is worth several times more to a state owner, which is why the Kuwaiti state side matters despite its slower procurement.

## Four pricing models

| Model | Fee formula | Strengths | Weaknesses |
|---|---|---|---|
| **Licence per MWp per year** | $p_{\text{MW}} \cdot P$, with a site minimum | Scales with plant and value; easy to budget; high margin | Value per MWp varies by archetype; small plants pay the minimum |
| **Per site** | Flat per site | Simple for research and small plants | Underprices large plants, overprices small ones |
| **Managed service** | Licence plus analyst retainer | Easier first sale to O&M teams that want answers, not dashboards | Lower margin; scales with people |
| **Savings share** | Share of verified savings with floor and cap | Aligns incentives; buyer pays from savings | Baseline disputes, verification cost, revenue volatility; hard in fixed-price public procurement |

A common structure for Gulf IPPs combines them: a per-MWp platform fee with a site minimum, an optional service tier, and a gain-share only where a contract change (such as a new cleaning interval) unlocks a large, measurable saving.`,
        },
        { kind: "equation", formula: "mz11-site-fee" },
        { kind: "equation", formula: "mz11-value-capture" },
        { kind: "equation", formula: "mz11-savings-share" },
        { kind: "equation", formula: "mz04-verified-savings" },
        { kind: "equation", formula: "mz11-service-margin" },
        {
          kind: "chart",
          chart: "bar",
          title: "Fee vs buyer value by plant size (illustrative)",
          xKey: "size",
          xLabel: "Plant size",
          yLabel: "USD k per year",
          series: [
            { key: "value", label: "Buyer value at USD 0.4k/MWp" },
            { key: "permw", label: "Licence: USD 100/MWp, minimum USD 15k" },
            { key: "flat", label: "Flat per site: USD 30k" },
          ],
          data: [
            { size: "11 MWp", value: 4.4, permw: 15, flat: 30 },
            { size: "100 MWp", value: 40, permw: 15, flat: 30 },
            { size: "500 MWp", value: 200, permw: 50, flat: 30 },
            { size: "800 MWp", value: 320, permw: 80, flat: 30 },
            { size: "1,500 MWp", value: 600, permw: 150, flat: 30 },
          ],
          caption: "Illustrative: an IPP buyer value of USD 0.4k per MWp per year (interval optimisation plus event-driven cleaning). At 11 MWp, the size of Shagaya Phase I PV, every fee exceeds the IPP-type value: such a plant is a research and credibility site, not a revenue site. Above about 150 MWp the per-MWp licence takes a steady 25 % of value; a flat fee takes 75 % at 100 MWp and 5 % at 1,500 MWp.",
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Market reference points",
          md: md`Swish Solar's SwishOS is reported to be priced on a sliding scale by plant capacity (pv magazine, March 2026); its actual prices are not public. No published per-MWp prices for soiling analytics in the Gulf were found. All prices in this lesson are illustrative and must be tested in discovery.`,
        },
        {
          kind: "feynman",
          prompt: "Explain to Omar why a savings-share price looks attractive to a Gulf IPP and to Mizan, and why you would still not lead with it.",
          keyPoints: [
            "The buyer pays only from savings, so its risk is low, and Mizan shares in the upside if the product works",
            "Savings must be verified against a baseline fixed in advance; soiling and weather vary by year, so the baseline needs adjustment and both sides must trust the method",
            "Verification has a cost and disputes delay payment; revenue becomes volatile and harder to forecast or show to investors",
            "Public buyers in Kuwait usually need a fixed price; a floor and cap, or a fixed licence plus a small gain-share, is usually the better first structure",
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ APPLIED
    {
      layer: "applied",
      title: "Pricing one plant three ways",
      blocks: [
        {
          kind: "worked",
          title: "Licence, managed service and savings share for a 500 MWp IPP (illustrative)",
          mode: "worked",
          given: md`Illustrative numbers. The 500 MWp IPP plant of lesson 1. Value to the IPP: USD 156k/yr from re-optimising its 20-day schedule plus USD 150k/yr from avoiding two wasted cleaning cycles a year (cleanings just before a dust event), so $V = $ USD 306k/yr in a typical year and USD 150k/yr in a calm year (few dust events, lower soiling). Platform delivery cost (hosting, data pipeline, support) USD 12k/yr. Analyst loaded cost USD 120k per FTE-year.`,
          steps: [
            { md: md`**A. Licence.** USD 100/MWp/yr: $F = 100 \times 500 = 50{,}000$ USD/yr. $\theta = 50/306 = 16$ %. $GM = (50{,}000 - 12{,}000)/50{,}000 = 76$ %.` },
            { md: md`**B. Managed service.** Licence plus monthly analyst-reviewed recommendations and a quarterly site review: USD 90,000/yr. Delivery: $12{,}000 + 0.25 \times 120{,}000 + 6{,}000$ travel $= 48{,}000$ USD. $\theta = 90/306 = 29$ %. $GM = (90{,}000 - 48{,}000)/90{,}000 = 47$ %.` },
            { md: md`**C. Savings share.** $\sigma = 30$ % of verified savings, floor USD 25k, cap USD 120k. Typical year: $0.30 \times 306{,}000 = 91{,}800$. Calm year: $0.30 \times 150{,}000 = 45{,}000$. With equal odds, expected fee $= 68{,}400$ USD/yr. Delivery: $12{,}000$ plus measurement and verification USD 15,000 $= 27{,}000$. Expected $GM = (68{,}400 - 27{,}000)/68{,}400 = 61$ %.` },
            { md: md`**Compare.** Licence: lowest fee, highest margin, most predictable. Service: highest fee, half the margin, easiest first sale to an O&M team that wants answers. Savings share: middle fee, volatile (USD 45k to 92k), plus verification disputes; and in a calm year the IPP pays USD 45k for USD 150k of value, so it is still a good deal for them.` },
          ],
          result: md`For a first Gulf IPP customer the service tier (USD 90k, 47 % margin) is often the easiest yes; the licence (USD 50k, 76 % margin) is the business you want to grow into. A savings share is best kept for a specific contract change, with a floor and a cap, not as the default price.`,
        },
        {
          kind: "worked",
          title: "Your turn: where the site minimum binds",
          mode: "faded",
          given: md`Illustrative licence: USD 100/MWp/yr with a site minimum of USD 15,000/yr. Buyer value USD 400 per MWp per year.`,
          steps: [
            { md: md`Capacity below which the minimum binds: $P_0 = F_{\min}/p_{\text{MW}} = 15{,}000/100$.`, hidden: true, check: { prompt: "P0 (MWp)", answer: 150, unit: "MWp", tolerance: { abs: 0.5 } } },
            { md: md`Fee for a 40 MWp plant: $\max(15{,}000,\ 100 \times 40)$.`, hidden: true, check: { prompt: "Fee for 40 MWp (USD/yr)", answer: 15000, unit: "USD/yr", tolerance: { abs: 1 } } },
            { md: md`Value capture at 40 MWp: $\theta = 15{,}000/(400 \times 40)$.`, hidden: true, check: { prompt: "Value capture ratio at 40 MWp", answer: 0.9375, tolerance: { abs: 0.005 } } },
            { md: md`At $\theta \approx 0.94$ the buyer keeps almost nothing: either serve small plants with a lighter, cheaper product, sell them through a portfolio owner with a portfolio price, or treat them as research sites.` },
          ],
          result: md`The minimum binds below 150 MWp; a 40 MWp plant would pay USD 15k for USD 16k of value. Small plants are not customers for this product at this price.`,
        },
        {
          kind: "widget",
          widget: "unit-economics",
          props: { price: 4200, grossMargin: 76, cac: 40000, churn: 1 },
          caption: "Licence case: about USD 50k/yr is USD 4,200 per month at 76 % margin; CAC USD 40k is illustrative founder-led sales cost. Then set price to 7,500 and margin to 47 % (service case) and compare LTV/CAC and payback.",
        },
      ],
    },
    // ------------------------------------------------------------------ FIELD
    {
      layer: "field",
      title: "Quoting in the Gulf",
      blocks: [
        {
          kind: "md",
          md: md`## How Gulf buyers want prices

- **Gulf IPPs and O&M contractors:** a fixed annual fee in USD (or local currency pegged or managed against it), multi-year, with a clear scope per tier. They compare against an O&M budget line. Volume tiers for a portfolio are expected.
- **Kuwaiti public entities:** a fixed price in KWD, one line per deliverable, valid for the bid validity period. Variable fees such as savings shares are hard to evaluate in a tender and to clear through audit review; if you propose one, add a fixed-price alternative.
- **Taxes:** the UAE charges VAT at 5 % and Saudi Arabia at 15 %; Kuwait and Qatar have no VAT. State whether prices are exclusive of VAT.
- **Currency:** Mizan's costs may be partly in EUR (the Netherlands) and partly in KWD; price in the buyer's currency and track the exposure.

## Rules for discounting

Discount for something: a multi-year term, a portfolio, a public reference, a case study, early payment. Never discount the first year to win and expect to raise it at renewal: Gulf buyers anchor on the first number. If you must lower the price, lower the scope.`,
        },
        {
          kind: "ask",
          title: "Pricing questions to ask in discovery",
          items: [
            "Which budget line would this come from: O&M opex, asset management, IT, research?",
            "What do you pay today for monitoring, cleaning and performance reporting, per MWp or per site?",
            "Would you rather buy a tool your team uses, or a monthly answer from us?",
            "Who would need to agree to a change in cleaning frequency, and would a gain-share help that conversation?",
            "What approval limit applies to an annual fee of USD 50k, and to USD 100k?",
          ],
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Pricing mistakes that stick",
          md: md`**Pricing on the national value** to an IPP. **A flat per-site fee** that is too high for small plants and leaves money on the table at GW plants. **A savings share without a fixed baseline**, so every invoice becomes a debate. **Free first year** that resets the anchor to zero. **Mixing licence and service revenue** in investor reporting, which hides a 47 % margin inside a 76 % story.`,
        },
        { kind: "xref", to: "fc03-l04", note: "Founder Core: GTM motions, minimum ACV and partner economics. Check that the price supports founder-led sales cost in the Gulf." },
        {
          kind: "question",
          question: {
            id: "mz11-l06-p1",
            type: "short",
            prompt: md`Write Mizan's first price sheet for soiling analytics, aimed at Gulf IPPs and O&M contractors, with a note on how you would adapt it for a Kuwaiti public buyer. Include: tiers (what each includes), the pricing unit and site minimum, any gain-share option with its baseline, floor and cap, contract terms (term, currency, VAT, payment), and a short justification of the price as a share of buyer value using labelled illustrative numbers.`,
            rubric: [
              "Uses a sensible unit (per MWp per year with a site minimum, or equivalent) and explains why seats or per-user prices do not fit",
              "Defines tiers clearly (licence vs managed service) with scope differences and illustrative prices",
              "Any gain-share has a baseline method fixed in advance, verification approach, floor and cap",
              "Justifies the price as a share of the buyer's own value (not national value), with arithmetic and labels",
              "States commercial terms (term, currency, VAT treatment by country, payment) and discount rules",
              "Adapts for a Kuwaiti public buyer: fixed KWD price, procurement route, fixed alternative to any variable fee",
            ],
            modelAnswer: md`**Mizan soiling analytics: price sheet v0 (illustrative, for discovery)**

**Unit.** Per MWp DC per year, minimum USD 15,000 per site. Plant analytics value scales with capacity, not with users.

**Tiers.**
- *Platform* (USD 100/MWp/yr): daily soiling estimates from your existing data, cleaning-interval and event-driven recommendations, robot-row miss detection where logs exist, monthly loss report.
- *Managed* (USD 180/MWp/yr): Platform plus analyst-reviewed monthly recommendations, quarterly site review, support for PR and availability disputes with soiling evidence.
- *Gain-share option* (either tier, only for an agreed contract change such as a new cleaning interval): 30 % of verified net savings, baseline fixed from the 12 months before the change and weather-adjusted per the agreed method, floor USD 25k, cap USD 150k per site per year.

**Justification.** For an illustrative 500 MWp plant on a 20-day schedule, interval re-optimisation plus event-driven cleaning is worth about USD 306k/yr to the IPP in a typical year (USD 150k in a calm year). Platform at USD 50k takes 16 % of typical value (33 % in a calm year); Managed at USD 90k takes 29 % (60 % in a calm year, so offer it where the service saves your team's time as well).

**Terms.** Two- or three-year terms; annual in advance; USD; prices exclude VAT (5 % UAE, 15 % Saudi Arabia; none in Kuwait and Qatar). Portfolio tiers above 1 GW. Discounts only for term, portfolio or a public reference.

**Kuwaiti public buyer.** A fixed annual price in KWD per site with scope per deliverable, no variable component unless a fixed-price alternative is offered; route as in lesson 2 (direct contracting or CAPT tender), and declare any research collaboration. For a small state plant such as Shagaya Phase I PV, the commercial case is weak at IPP value: treat it as a research site and price any operational service on cost to serve.`,
            explanation: md`A good price sheet is simple, scales with value, and can be defended with the buyer's own numbers.`,
            concepts: ["mz11.pricing-unit", "mz11.site-minimum", "mz11.savings-share", "mz11.value-capture", "mz11.service-margin"],
            difficulty: 3,
          },
        },
        { kind: "sources", refs: ["mz11-r10", "mz11-r11", "mz11-r14", "mz11-r12"] },
      ],
    },
  ],
  quiz: [
    {
      id: "mz11-l06-q1",
      type: "numeric",
      prompt: md`Illustrative licence at USD 120/MWp/yr with a site minimum of USD 18,000. Below what capacity (MWp) does the minimum bind?`,
      answer: 150,
      tolerance: { abs: 0.5 },
      unit: "MWp",
      explanation: md`$P_0 = 18{,}000/120 = 150$ MWp.`,
      concepts: ["mz11.site-minimum"],
      difficulty: 1,
    },
    {
      id: "mz11-l06-q2",
      type: "numeric",
      prompt: md`Illustrative managed service: revenue USD 90,000/yr, delivery cost USD 48,000/yr. Gross margin (%)?`,
      answer: 46.7,
      tolerance: { abs: 0.2 },
      unit: "%",
      explanation: md`$(90{,}000 - 48{,}000)/90{,}000 = 0.467$.`,
      concepts: ["mz11.service-margin"],
      difficulty: 1,
    },
    {
      id: "mz11-l06-q3",
      type: "numeric",
      prompt: md`Savings share 30 %, floor USD 25k, cap USD 120k. Verified savings this year are USD 70k. What is the fee (USD)?`,
      answer: 25000,
      tolerance: { abs: 1 },
      unit: "USD",
      explanation: md`$0.30 \times 70{,}000 = 21{,}000$, below the floor, so the fee is USD 25,000.`,
      concepts: ["mz11.savings-share"],
      difficulty: 2,
    },
    {
      id: "mz11-l06-q4",
      type: "mcq",
      prompt: md`Why are seats or users the wrong pricing unit for plant soiling analytics?`,
      options: [
        "Gulf buyers do not use software",
        "Value scales with plant capacity and decisions, not with the number of people logging in",
        "Seat pricing is illegal in Kuwait",
        "Seats are too expensive to count",
      ],
      answer: 1,
      explanation: md`A 1.5 GW plant with two performance engineers gets far more value than a 20 MW plant with two; seat pricing would reverse that.`,
      concepts: ["mz11.pricing-unit"],
      difficulty: 1,
    },
    {
      id: "mz11-l06-q5",
      type: "decision",
      prompt: md`A Kuwaiti public entity asks for a price for an operational soiling service. You would like a savings share. What do you submit?`,
      options: [
        { text: "Only a savings share, to show confidence.", score: 0.2, feedback: "Variable fees are hard to evaluate in public procurement and to clear through audit; you may be non-compliant." },
        { text: "A fixed annual KWD price per deliverable, with a savings-share alternative only if the entity's rules allow it, and a clear baseline method.", score: 1, feedback: "Right: compliant first, creative second." },
        { text: "A free first year, then a savings share.", score: 0, feedback: "A free year is not procured and resets the anchor; it looks like an inducement." },
      ],
      explanation: md`Public buyers need a price they can evaluate and budget.`,
      concepts: ["mz11.savings-share", "mz11.pricing-unit"],
      difficulty: 2,
    },
    {
      id: "mz11-l06-q6",
      type: "multi",
      prompt: md`Which are legitimate reasons to discount? (Select all.)`,
      options: ["A three-year term", "A portfolio of several plants", "A public reference or case study", "To win a first year and raise the price at renewal", "Early payment"],
      answer: [0, 1, 2, 4],
      explanation: md`Discount for something of value; Gulf buyers anchor on the first year's price.`,
      concepts: ["mz11.value-capture"],
      difficulty: 1,
    },
    {
      id: "mz11-l06-q7",
      type: "mcq",
      prompt: md`An IPP's value from your product is USD 200k/yr and you charge USD 50k/yr. What is the value capture ratio?`,
      options: ["4.0", "0.25", "0.75", "0.40"],
      answer: 1,
      explanation: md`$\theta = 50/200 = 0.25$.`,
      concepts: ["mz11.value-capture"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "mz11-l06-f1", front: "Four pricing models for plant analytics", back: "Licence per MWp per year (with site minimum), per site, managed service, savings share with floor and cap.", concepts: ["mz11.pricing-unit"] },
    { id: "mz11-l06-f2", front: "Site minimum binds below...", back: md`$P_0 = F_{\min}/p_{\text{MW}}$: e.g. USD 15k / USD 100 per MWp = 150 MWp.`, concepts: ["mz11.site-minimum"] },
    { id: "mz11-l06-f3", front: "Illustrative 500 MWp IPP: three prices", back: "Licence USD 50k (16 % of value, 76 % GM); service USD 90k (29 %, 47 % GM); 30 % savings share USD 45k to 92k (61 % expected GM).", concepts: ["mz11.service-margin", "mz11.value-capture"] },
    { id: "mz11-l06-f4", front: "Savings share needs...", back: "A baseline fixed in advance with weather adjustment, an agreed verification method and cost, a floor and a cap.", concepts: ["mz11.savings-share"] },
    { id: "mz11-l06-f5", front: "VAT in the Gulf", back: "UAE 5 %, Saudi Arabia 15 %, Kuwait and Qatar none. Quote exclusive of VAT and say so.", concepts: ["mz11.pricing-unit"] },
    { id: "mz11-l06-f6", front: "Why small plants are not customers (illustrative)", back: "At USD 0.4k/MWp of value, a 40 MWp plant paying a USD 15k minimum hands over 94 % of its value. Serve via portfolio pricing or as research sites.", concepts: ["mz11.site-minimum"] },
  ],
};

export default lesson;
