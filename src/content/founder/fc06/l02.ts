import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc06-l02",
  title: "Unit economics: CAC, LTV, payback and margins",
  summary:
    "Derive LTV from churn and gross margin (and its discounted form), measure CAC honestly including founder time and pilot costs, compute payback, separate gross from contribution margin, and apply it to an illustrative Afterwave enterprise motion.",
  minutes: 70,
  objectives: [
    "Derive LTV = ARPA x GM / churn from the geometric customer lifetime, and its discounted version",
    "Compute fully loaded CAC for a founder-led enterprise motion, including unpaid pilots",
    "Compute CAC payback and explain why it matters more than LTV/CAC for cash",
    "Distinguish gross margin from contribution margin and say which costs belong in each",
    "Diagnose which lever (price, margin, churn, CAC) moves unit economics most for your venture",
  ],
  concepts: [
    { id: "fc06.cac", name: "Customer acquisition cost", description: "Fully loaded sales and marketing cost divided by new paying customers, lagged by the sales cycle.", competency: "fc-finance" },
    { id: "fc06.ltv", name: "Customer lifetime value", description: "Gross profit per period times expected customer lifetime (1/churn), optionally discounted: ARPA x GM / (churn + discount rate).", competency: "fc-finance", related: ["m10.npv"] },
    { id: "fc06.cac-payback", name: "CAC payback", description: "Months of gross profit from a customer needed to recover what it cost to acquire them.", competency: "fc-finance", related: ["m10.payback"] },
    { id: "fc06.contribution-margin", name: "Gross vs contribution margin", description: "Gross margin subtracts COGS; contribution margin also subtracts every other cost that scales with each unit or customer.", competency: "fc-finance" },
  ],
  sections: [
    {
      layer: "theory",
      title: "What one customer is worth and what it costs",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Afterwave sells six-figure enterprise contracts after security reviews and pilots; Mizan sells to utilities and O&M contractors through tenders; Suhail will sell sponsorships and employer access. Each has a different cost to win a customer and a different lifetime. Unit economics is how you decide whether to hire a salesperson, whether pilots should be paid, and what price floor you can accept, and it is the first slide a Series A investor will test.`,
        },
        {
          kind: "md",
          md: md`### Lifetime from churn: the derivation

Let monthly churn be $c$: each customer independently has probability $c$ of leaving in any month. The probability a customer is still active after $t$ months is $(1-c)^t$. Expected lifetime is the sum of survival probabilities:`,
        },
        { kind: "equation", formula: "fc06-expected-lifetime" },
        {
          kind: "md",
          md: md`Each active month the customer pays $ARPA$ (average revenue per account) and costs you $ARPA\cdot(1-GM)$ to serve, leaving gross profit $ARPA\cdot GM$. Multiply by the expected lifetime:`,
        },
        { kind: "equation", formula: "fc06-ltv" },
        {
          kind: "md",
          md: md`Money later is worth less than money now (see Track 0, NPV). Discounting at rate $d$ per period, with payment at the end of each surviving period:

$$LTV_d = \frac{ARPA\cdot GM}{1+d}\sum_{t=0}^{\infty}\left(\frac{1-c}{1+d}\right)^t = \frac{ARPA\cdot GM}{1+d}\cdot\frac{1+d}{c+d} = \frac{ARPA\cdot GM}{c+d}.$$

The discount rate simply adds to churn. For a low-churn enterprise customer (say 10 % a year) and a startup cost of capital of 20 to 30 % a year, discounting cuts LTV by two thirds or more. That is why experienced investors look at **payback** and at LTV capped to 3 to 5 years.`,
        },
        { kind: "equation", formula: "fc06-ltv-discounted" },
        {
          kind: "md",
          md: md`### The cost side

$$\text{CAC} = \frac{\text{fully loaded S\&M in the period}}{\text{new customers won}}$$

"Fully loaded" means everything you spent to win them: sales and marketing salaries **including the share of founder time spent selling**, sales engineers, travel, trade fairs, tools, and the unpaid part of pilots. With 6 to 12 month enterprise cycles, divide by customers won one cycle later.`,
        },
        { kind: "equation", formula: "fc06-cac" },
        { kind: "equation", formula: "fc06-cac-payback" },
        {
          kind: "md",
          md: md`### Gross margin vs contribution margin

| | Gross margin | Contribution margin |
|---|---|---|
| Subtracts | COGS: hosting, deployment, support tied to delivery, hardware unit cost | COGS **plus** every other cost that scales per customer: payment fees, sales commissions, dedicated customer success, per-site travel |
| Answers | Is the product itself profitable to deliver? | What does one more customer add towards fixed costs? |
| Used in | LTV, valuation benchmarks | Pricing floors, channel decisions, whether to take a deal |

On-prem enterprise software (Afterwave Enclave runs on customer servers) typically has lower gross margin than multi-tenant SaaS, because deployment, upgrades and security reviews take engineer time per customer.`,
        },
        { kind: "equation", formula: "fc06-contribution-margin" },
        {
          kind: "matrix",
          title: "Reading LTV/CAC together with payback",
          xAxis: ["Long payback (> 24 months)", "Short payback (< 12 months)"],
          yAxis: ["LTV/CAC < 3", "LTV/CAC > 3"],
          cells: [
            { label: "Valuable but cash-hungry", detail: "Enterprise land-and-expand. Grow only as fast as financing allows; push for annual upfront billing and paid pilots." },
            { label: "Scale it", detail: "Each customer pays back fast and creates value. Spend more on acquisition until marginal CAC rises." },
            { label: "Broken", detail: "Fix price, churn or the sales motion before spending a euro more on growth." },
            { label: "Fast but thin", detail: "Cash comes back quickly but lifetime is short; usually a churn problem. Work on retention before scaling." },
          ],
          caption: "Top row: LTV/CAC above 3. Bottom row: below 3. Left column: long payback; right column: short payback.",
        },
        { kind: "widget", widget: "unit-economics", props: { price: 8000, cac: 150000 }, caption: "Set price per month, gross margin, CAC and churn; watch LTV, LTV/CAC and payback. Try halving churn, then halving CAC: which helps cash more?" },
      ],
    },
    {
      layer: "applied",
      title: "Unit economics of an enterprise test-infrastructure motion",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Afterwave founder-led enterprise sales (illustrative numbers only)",
          given: md`Illustrative, not Afterwave data. Contract: Enclave + Lockstep for one test lab at **EUR 96k ACV** (ARPA EUR 8k/month). Gross margin **75 %** (on-prem deployment and support). Annual logo churn **10 %**. Year's S&M: CEO selling time valued at EUR 50k, one sales/solutions engineer EUR 110k loaded, travel and trade fairs EUR 60k, unpaid pilot engineering and hardware EUR 80k. Customers won from that year's effort: **2**. Per-customer customer-success and upgrade support: EUR 12k/yr.`,
          steps: [
            { md: md`**CAC** $= (50 + 110 + 60 + 80)/2 = 300/2 =$ **EUR 150k** per customer. Note the 80k of unpaid pilot cost: more than a quarter of CAC.` },
            { md: md`**Gross profit per customer per year** $= 96 \times 0.75 = 72$ EUR k.` },
            { md: md`**Undiscounted LTV** $= 72/0.10 =$ **EUR 720k**; LTV/CAC $= 720/150 = 4.8$.` },
            { md: md`**Capped at 5 years** (common investor haircut): $72\times\sum_{t=0}^{4}0.9^t = 72\times\frac{1-0.9^5}{0.1} = 72\times 4.095 =$ **EUR 295k**; LTV/CAC $\approx 2.0$.` },
            { md: md`**Discounted at 20 %/yr:** $LTV_d = 72/(0.10+0.20) =$ **EUR 240k**; LTV/CAC $= 1.6$.` },
            { md: md`**CAC payback** $= 150/72 = 2.08$ years $\approx$ **25 months** on gross profit. On contribution ($72 - 12 = 60$ k/yr): $150/60 = 2.5$ years.` },
            { md: md`**Levers.** (a) Paid pilots at EUR 40k each would remove the 80k pilot cost and could add pilot revenue: CAC falls to 110k, payback to 18 months. (b) Expansion to a second lab at 115 % NRR raises lifetime value without new CAC. (c) Churn from 10 % to 5 % doubles undiscounted LTV but changes payback not at all.` },
          ],
          result: md`The headline 4.8x LTV/CAC looks great; the 25-month payback and the 1.6 to 2.0x after realistic haircuts say the motion is cash-hungry. The cheapest fix is commercial, not technical: paid pilots and annual upfront billing.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Suhail employer subscription (illustrative)",
          given: md`Illustrative. Suhail offers employers a hiring-access subscription at **USD 300/month**, gross margin **85 %**, monthly logo churn **4 %**, blended CAC **USD 1,500**.`,
          steps: [
            { md: md`Gross profit per month: $300\times 0.85 = 255$ USD.` },
            { md: md`LTV $= 255/0.04 =$ **USD 6,375**; LTV/CAC $= 6{,}375/1{,}500 = 4.25$.`, hidden: true, check: { prompt: "Undiscounted LTV (USD)", answer: 6375, unit: "USD", tolerance: { abs: 1 } } },
            { md: md`CAC payback $= 1{,}500/255 =$ **5.9 months**.`, hidden: true, check: { prompt: "CAC payback (months)", answer: 5.88, unit: "months", tolerance: { abs: 0.05 } } },
            { md: md`Expected lifetime $1/0.04 = 25$ months; discounted at 1.5 %/month: $255/0.055 = 4{,}636$ USD.` },
          ],
          result: md`Fast payback, healthy ratio: if the CAC holds as spend scales, this is the "scale it" quadrant. The risk is the 4 % monthly churn (40 % a year), typical of employer products tied to hiring cycles.`,
        },
        {
          kind: "question",
          question: {
            id: "fc06-l02-p1",
            type: "numeric",
            prompt: md`ARPA EUR 2,000/month, gross margin 70 %, monthly churn 1.5 %, discount rate 1 % per month. What is the discounted LTV? (EUR)`,
            answer: 56000,
            tolerance: { rel: 0.005 },
            unit: "EUR",
            explanation: md`$LTV_d = 2{,}000\times 0.70/(0.015+0.01) = 1{,}400/0.025 = 56{,}000$ EUR. Undiscounted it would be $1{,}400/0.015 = 93{,}333$: discounting removes 40 % because the customer's value sits far out.`,
            concepts: ["fc06.ltv"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Measuring unit economics without fooling yourself",
      blocks: [
        {
          kind: "callout",
          tone: "pitfall",
          title: "The classic ways founders inflate unit economics",
          md: md`- **Leaving founder selling time out of CAC.** At seed, the CEO is the sales team. Value the time at what a hire would cost.
- **Ignoring unpaid pilots.** Engineering weeks, hardware shipped, travel: all CAC.
- **LTV on revenue instead of gross profit.** For on-prem or hardware-heavy products this can double the number.
- **Churn from cohorts that are too young.** Three customers who have not reached their first renewal give you no churn data. Say "no renewals yet" rather than "0 % churn".
- **Blended CAC that hides paid channels.** Organic referrals make blended CAC look cheap; marginal CAC on the next channel is what you will actually pay.
- **Mixing periods.** Monthly ARPA with annual churn gives nonsense; convert first: $c_m = 1-(1-c_a)^{1/12}$.`,
        },
        {
          kind: "md",
          md: md`### Who owns it and where it lives

- **Data:** CRM (HubSpot, Pipedrive, Attio) for opportunities, stage dates and won/lost; billing system (Stripe, Chargebee, or your accounting system for invoiced enterprise contracts) for revenue per account; accounting for S&M and COGS.
- **Cadence:** quarterly unit-economics review, by segment (robotics vs batteries vs drives; utilities vs O&M contractors), not one blended number.
- **What investors expect at seed:** honest early signals (pilot conversion, ACV, first expansions) and a believable path to payback under 24 months for enterprise. At Series A: cohort retention, NRR and CAC by channel.`,
        },
        {
          kind: "checklist",
          title: "Unit economics sanity checks",
          items: [
            "CAC includes founder selling time, sales engineers, travel, events and unpaid pilot costs",
            "LTV uses gross profit, and the churn period matches the ARPA period",
            "Churn is measured only on cohorts that have reached a renewal date",
            "Payback is shown alongside LTV/CAC, on gross profit and on contribution",
            "Numbers are split by segment and by channel",
            "Sample size is stated: 'based on 3 customers' is honest and expected at seed",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask yourself before you quote LTV/CAC to an investor",
          items: [
            "How many customers have actually renewed, and what happened to their contract value?",
            "If I priced the founder time at market rate, what is CAC?",
            "Which costs scale with each new customer that are not in COGS?",
            "What would payback be with paid pilots and annual upfront billing?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc06-l02-p2",
            type: "short",
            prompt: md`Build a one-page unit-economics sheet for **one** of your ventures (illustrative numbers, clearly labelled). Include: ARPA or ACV, gross margin with the main COGS items named, churn assumption and its evidence status, fully loaded CAC broken into components, undiscounted and discounted LTV, LTV/CAC, CAC payback on gross profit and on contribution, and the single lever you would pull first, with its quantified effect.`,
            rubric: [
              "COGS items are specific to the venture (for example on-prem deployment for Afterwave, sensor hardware or cleaning crews for Mizan, venue costs for Suhail) and gross margin follows from them",
              "CAC includes founder selling time and unpaid pilot or proposal costs, with components summing correctly",
              "LTV computed correctly from ARPA x GM / churn with consistent periods, plus a discounted or capped version",
              "Payback computed on gross profit and contribution, with the difference explained",
              "The chosen lever is quantified (before and after) and justified against the alternatives",
              "Evidence status of each assumption is stated (measured, benchmark or guess)",
            ],
            modelAnswer: md`**Mizan soiling analytics for a 100 MW plant (illustrative).** ACV **KWD 18,000** (KWD 1,500/month). COGS: cloud and data pipeline KWD 1,200/yr, analyst time for monthly reports KWD 2,400/yr, data integration amortised KWD 900/yr: total 4,500, so **GM 75 %**. Churn: guess **15 %/yr** (no renewals yet; utilities often renew if the pilot shows avoided losses). CAC: founder time on tender and site visits KWD 6,000, proposal and translation KWD 1,500, unpaid 3-month pilot KWD 4,500: **KWD 12,000**. Gross profit **KWD 13,500/yr**. LTV $= 13{,}500/0.15 =$ **KWD 90,000**; capped 5 years $13{,}500\times(1-0.85^5)/0.15 = 13{,}500\times 3.71 = 50{,}100$; discounted at 20 % $= 13{,}500/0.35 = 38{,}600$. LTV/CAC 7.5 (undiscounted), 3.2 (discounted). Payback on gross profit $12{,}000/13{,}500 = 0.89$ years (11 months); contribution after KWD 1,500/yr account management: $12{,}000/12{,}000 = 1.0$ year. **First lever:** make the pilot paid at KWD 3,000 (credited against year 1): CAC drops to KWD 9,000 (unpaid pilot cost falls from 4,500 to 1,500), payback to 8 months, and a paying pilot customer is a stronger signal for the tender committee. Status: ACV and churn are guesses; COGS are estimates from the pipeline design.`,
            explanation: md`Graded against the rubric. The point is honest inputs and the payback view, not a big ratio.`,
            concepts: ["fc06.ltv", "fc06.cac", "fc06.cac-payback", "fc06.contribution-margin"],
            difficulty: 2,
          },
        },
        { kind: "sources", refs: ["fc06-r7"] },
        { kind: "xref", to: "m10-l01", note: "Discounting, NPV and the time value of money behind the discounted LTV formula are derived in Track 0, Module 10, Lesson 1." },
      ],
    },
  ],
  quiz: [
    {
      id: "fc06-l02-q1",
      type: "numeric",
      prompt: md`ARPA EUR 500/month, gross margin 80 %, monthly churn 2 %. Undiscounted LTV? (EUR)`,
      answer: 20000,
      tolerance: { rel: 0.005 },
      unit: "EUR",
      explanation: md`$500\times 0.8/0.02 = 400\times 50 = 20{,}000$ EUR. Expected lifetime is $1/0.02 = 50$ months.`,
      concepts: ["fc06.ltv"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc06-l02-q2",
      type: "numeric",
      prompt: md`Same customer, CAC EUR 6,000. CAC payback in months?`,
      answer: 15,
      tolerance: { abs: 0.1 },
      unit: "months",
      explanation: md`$6{,}000/(500\times 0.8) = 6{,}000/400 = 15$ months.`,
      concepts: ["fc06.cac-payback"],
      difficulty: 1,
    },
    {
      id: "fc06-l02-q3",
      type: "mcq",
      prompt: "Why does LTV use gross profit rather than revenue?",
      options: [
        "Because revenue is not audited",
        "Because the cost to serve each customer is real and scales with lifetime; only gross profit is available to repay CAC and fixed costs",
        "Because investors prefer smaller numbers",
        "Because revenue includes VAT",
      ],
      answer: 1,
      explanation: md`LTV is meant to compare with CAC: both must be in the same currency of value. Revenue includes money you spend again to deliver the service.`,
      concepts: ["fc06.ltv"],
      difficulty: 1,
    },
    {
      id: "fc06-l02-q4",
      type: "multi",
      prompt: "Which belong in fully loaded CAC for a founder-led B2B motion? (Select all.)",
      options: [
        "Share of CEO time spent selling, valued at market cost",
        "Unpaid pilot engineering time and hardware",
        "Cloud hosting for existing customers",
        "Trade fair booth and travel to prospects",
        "R&D salaries for the core product roadmap",
      ],
      answer: [0, 1, 3],
      explanation: md`Hosting for existing customers is COGS; core R&D is a fixed cost. Founder selling time, unpaid pilots and travel are all costs of winning new customers.`,
      concepts: ["fc06.cac"],
      difficulty: 1,
    },
    {
      id: "fc06-l02-q5",
      type: "mcq",
      prompt: "Monthly churn falls from 2 % to 1 %. What happens to undiscounted LTV and to CAC payback?",
      options: [
        "LTV doubles; payback unchanged",
        "LTV doubles; payback halves",
        "LTV unchanged; payback halves",
        "Both unchanged",
      ],
      answer: 0,
      explanation: md`LTV is proportional to $1/c$, so it doubles. Payback $= CAC/(ARPA\cdot GM)$ does not depend on churn (as long as the customer stays through the payback period).`,
      concepts: ["fc06.ltv", "fc06.cac-payback"],
      difficulty: 2,
    },
    {
      id: "fc06-l02-q6",
      type: "decision",
      prompt: md`In a seed pitch rehearsal, a cofounder wants to show "LTV/CAC = 12x" based on three pilot customers, none of whom has renewed, using 0 % churn capped at 10 years. What do you put on the slide?`,
      options: [
        { text: "Keep 12x: it is mathematically correct for the inputs.", score: 0, feedback: "Inputs with no evidence produce a number that an experienced investor will discount to zero, and it damages trust in the rest of the deck." },
        { text: "Show ACV, gross margin, pilot-to-paid conversion and expected payback, state that no renewals have occurred yet, and give the churn assumption as a labelled benchmark.", score: 1, feedback: "Right: at seed, investors want honest leading indicators and a credible path to payback." },
        { text: "Remove unit economics entirely.", score: 0.3, feedback: "Hiding them suggests you have not thought about them. Show what you know and what you assume." },
      ],
      explanation: md`Unit economics at seed are a hypothesis with early evidence. Present them as such.`,
      concepts: ["fc06.ltv", "fc06.cac"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "fc06-l02-f1", front: "LTV (undiscounted)", back: md`$LTV = ARPA\cdot GM/c$`, concepts: ["fc06.ltv"] },
    { id: "fc06-l02-f2", front: "LTV (discounted)", back: md`$LTV_d = ARPA\cdot GM/(c+d)$: the discount rate adds to churn.`, concepts: ["fc06.ltv"] },
    { id: "fc06-l02-f3", front: "Expected lifetime with churn c", back: md`$1/c$ periods (geometric survival).`, concepts: ["fc06.ltv"] },
    { id: "fc06-l02-f4", front: "CAC payback", back: md`$CAC/(ARPA\cdot GM)$; does not depend on churn.`, concepts: ["fc06.cac-payback"] },
    { id: "fc06-l02-f5", front: "Gross vs contribution margin", back: "Gross subtracts COGS; contribution also subtracts every other per-customer cost (commissions, payment fees, dedicated success).", concepts: ["fc06.contribution-margin"] },
    { id: "fc06-l02-f6", front: "Monthly from annual churn", back: md`$c_m = 1-(1-c_a)^{1/12}$; 10 %/yr is 0.87 %/month.`, concepts: ["fc06.ltv"] },
    { id: "fc06-l02-f7", front: "Illustrative Afterwave enterprise unit economics", back: "ACV EUR 96k, GM 75 %, CAC EUR 150k: LTV/CAC 4.8 undiscounted, about 2.0 capped at 5 years; payback about 25 months.", concepts: ["fc06.cac-payback"] },
  ],
};

export default lesson;
