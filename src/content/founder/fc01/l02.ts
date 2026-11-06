import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc01-l02",
  title: "Stages and what matters at each: idea to Series A",
  summary:
    "Each stage of a startup exists to retire one dominant risk. What the company's job is at idea, pre-seed, seed and Series A, what evidence moves you to the next stage, what product-market fit looks like in B2B, and how to size a round from the milestones it must buy.",
  minutes: 70,
  objectives: [
    "Name the dominant risk and the job of the company at idea, pre-seed, seed and Series A",
    "List the evidence that typically moves a B2B company from one stage to the next",
    "Recognise product-market fit (and its absence) from retention, pull and sales-cycle signals",
    "Size a round from a month-by-month burn plan to the next milestone plus a buffer, and compute the dilution",
    "Place each of your three ventures at its honest stage",
  ],
  concepts: [
    { id: "fc01.stages", name: "Startup stages", description: "Idea, pre-seed, seed, Series A and later: each defined less by the amount raised than by the risk the company is retiring and the evidence it has.", competency: "fc-fundamentals", related: ["fc01.risk-retirement", "fc01.pmf"] },
    { id: "fc01.risk-retirement", name: "Risk retirement per round", description: "Each financing buys the time and resources to remove one dominant risk (problem, solution, product-market fit, repeatable go-to-market, scale); the next round prices the reduced risk.", competency: "fc-fundamentals", related: ["fc01.stages", "fc01.round-sizing"] },
    { id: "fc01.pmf", name: "Product-market fit", description: "Being in a good market with a product that satisfies it; visible as retention that flattens, customers pulling the product, shortening sales cycles and referrals.", competency: "fc-fundamentals", related: ["fc01.stages", "fc01.default-alive"] },
    { id: "fc01.round-sizing", name: "Round sizing from milestones", description: "Raise enough to reach the next stage's evidence plus a buffer for the next raise: sum of planned net burn over months to milestone plus about six months.", competency: "fc-fundraising", related: ["fc01.risk-retirement", "fc01.default-alive"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Stages as a sequence of risks",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Afterwave, Mizan and Suhail are at different stages, and the mistakes at each stage are different. Pitching Afterwave as "seed-ready" without the evidence a seed investor expects wastes months; running Mizan's Shagaya pilot as if it were a scale-up wastes cash. Knowing the job of each stage tells you what to work on this quarter, what to measure, and how much money to ask for.`,
        },
        {
          kind: "md",
          md: md`### A stage is a risk, not a round size

Round names (pre-seed, seed, Series A) are labels investors use; amounts drift with the market. A more durable definition: **each stage is the period in which the company retires one dominant risk.** Investors pay more per share at the next round because that risk is gone.

| Stage | Dominant risk | Job of the company | Evidence that moves you on |
|---|---|---|---|
| **Idea** | Problem risk: does anyone care enough to act? | Find a painful, frequent, expensive problem and the people who own it | 20 to 50 discovery conversations; a written problem statement buyers agree with; a few saying "I would pay to fix this now" |
| **Pre-seed** | Solution risk: can we build something that solves it? | Build the smallest product that solves the problem for a few design partners | Working product in real use by 2 to 5 design partners; first payments or signed letters of intent; a team that can ship |
| **Seed** | Product-market fit risk: do customers keep using and paying? | Get to repeatable value: customers who renew, expand and refer | Retention and renewal; paying customers beyond friends and design partners; sales cycles shortening; inbound demand starting |
| **Series A** | Go-to-market risk: can we sell it repeatably, at a cost below what customers are worth? | Turn founder-led sales into a repeatable motion; build the team | A sales process others can run; unit economics (CAC payback, gross margin) that work; revenue growing 2 to 3x a year |
| **Series B and later** | Scale risk: can we grow without breaking? | Expand segments and geographies, build the organisation | Efficient growth at scale; multiple channels; strong net revenue retention |

The key word is **evidence**. At each stage you are producing the proof the next investor will ask for. Work that does not produce that proof (a brand book at pre-seed, a second product at seed) is usually a distraction.`,
        },
        {
          kind: "flow",
          title: "The startup stage ladder (B2B)",
          steps: [
            { label: "Idea", detail: "Problem risk. Discovery interviews, problem statement, buyer identified." },
            { label: "Pre-seed", detail: "Solution risk. Design partners using an early product; first payments or LOIs." },
            { label: "Seed", detail: "PMF risk. Paying customers who renew and expand; pull, not push." },
            { label: "Series A", detail: "GTM risk. Repeatable sales motion, working unit economics, 2 to 3x annual growth." },
            { label: "Series B+", detail: "Scale risk. Efficient growth across segments, channels and geographies." },
          ],
          caption: "Each arrow is crossed with evidence, not with a deck. The amount raised at each step follows from what it takes to produce the next step's evidence.",
        },
        {
          kind: "md",
          md: md`### Product-market fit: the line between seed and everything after

Marc Andreessen's definition: product-market fit means **being in a good market with a product that can satisfy that market**. He argued it is the only thing that matters early, because a great market pulls a product out of a team, while a bad market defeats a great team. Before fit, everything else (hiring, brand, process) is premature.

You recognise fit by **pull**, not by effort:

- **Retention flattens.** In a cohort retention curve the share of customers still active stops falling and flattens above zero. A curve that keeps sliding to zero means no fit, whatever the top-line growth.
- **The 40% test.** Sean Ellis's survey asks users how they would feel if they could no longer use the product. If about 40% or more answer "very disappointed", fit is likely. Rahul Vohra (Superhuman) turned this into a repeatable engine for segmenting users and improving the score. The test works for products with many users; for an enterprise product with five customers, use the B2B signals below.
- **B2B signals.** Pilots convert to annual contracts without discounting; customers expand to more teams or sites; buyers introduce you to peers; procurement and security review start without you pushing; sales cycles shorten from one deal to the next.
- **Absence of fit** looks like: every deal needs the CEO; every customer needs custom work; pilots end with "interesting, let us revisit next year"; growth comes only from new logos while old ones churn.

### How much to raise: buy the next milestone plus a buffer

A round should fund the company until it has the next stage's evidence, plus enough time to raise again (a round takes roughly 3 to 6 months). Investors look for about 18 to 24 months of runway after a seed. With a month-by-month plan:`,
        },
        { kind: "equation", formula: "fc01-raise-size" },
        {
          kind: "md",
          md: md`The price of the round sets how much of the company you sell for it:`,
        },
        { kind: "equation", formula: "fc01-post-money-dilution" },
        {
          kind: "md",
          md: md`Raising too little means you hit the next raise without the evidence (the "Series A crunch": many seed-funded companies never raise an A). Raising too much at too high a price sets a bar the next round must clear; if you miss it you face a flat or down round that dilutes founders and damages morale. Size the round to the plan, not to what the market will give.

### Indicative round sizes

| Stage | Typical raise (US, 2024 to 2026, indicative) | Typical dilution |
|---|---|---|
| Pre-seed | USD 0.5 to 2 m, often on SAFEs | 7 to 15% |
| Seed | USD 2 to 5 m | 15 to 25% |
| Series A | USD 8 to 20 m | 15 to 25% |

European rounds have historically been somewhat smaller at the same stage. Accelerators sit at the pre-seed edge: per the course research, Y Combinator's standard deal is USD 500k (USD 125k on a post-money SAFE for 7% plus USD 375k on an uncapped MFN SAFE).`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Round sizes move with the market",
          md: md`The ranges above are indicative medians from well-known industry datasets (for example Carta's quarterly private-market reports) and from practice; they shift by year, sector, geography and whether the company is AI-related. Check a current dataset before quoting a number. The YC deal terms are from secondary sources recorded in docs/research/2026-11-afterwave-market.md and should be confirmed on ycombinator.com/deal.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Sizing an illustrative Afterwave seed from its milestones",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "From Series A evidence back to the seed amount",
          given: md`Illustrative plan, not Afterwave's actual numbers. Series A evidence targeted (indicative bar for enterprise infrastructure): about EUR 1.5 m annual recurring revenue (ARR) from 6 to 10 customers, at least two of them expanded to a second site or team, and at least two deals closed without the CEO in every meeting. The team estimates 18 months to reach this after the seed closes, and wants a 6-month buffer. Planned gross burn: EUR 70k/month in months 1 to 6 (founders plus 2 engineers), EUR 110k in months 7 to 12 (plus a solutions engineer and a first account executive), EUR 160k in months 13 to 24 (team of about 10). Planned revenue collected over the 24 months: EUR 1.2 m in total (illustrative).`,
          steps: [
            { md: md`**Gross spend over 24 months:** $6\times70 + 6\times110 + 12\times160 = 420 + 660 + 1{,}920 = 3{,}000$ k.` },
            { md: md`**Net of planned revenue:** $3{,}000 - 1{,}200 = 1{,}800$ k. But revenue is the least certain line; a seed investor will ask what happens if it arrives six months late.` },
            { md: md`**Stress case:** halve the planned revenue (EUR 600k): net need $= 2{,}400$ k. Add cash on hand of EUR 0 (assume the pre-seed is spent by close).` },
            { md: md`**Decision:** raise **EUR 2.5 m**, which funds the stress case with a small margin and keeps the company default alive if revenue arrives on plan. Raising EUR 3 m would remove the dependency on revenue entirely at the cost of more dilution.` },
            { md: md`**Dilution at an illustrative EUR 10 m pre-money:** post $= 12.5$ m; $d = 2.5/12.5 = 20\%$. At EUR 3 m on the same pre-money: post 13 m, $d = 23.1\%$.` },
          ],
          result: md`The round size comes out of the milestone plan: EUR 2.5 to 3 m for about 24 months, selling roughly 20 to 23%. The pitch then says: "this round buys these specific proofs by this date", which is exactly what a seed investor underwrites.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "What the founders own after the seed",
          given: md`Illustrative: before the seed the founders together own 85% fully diluted (the rest is a pre-seed SAFE and a small option pool, already converted for simplicity). The seed raises EUR 3 m at EUR 12 m pre-money. Assume no change to the option pool in this round.`,
          steps: [
            { md: md`Post-money $= 12 + 3$.` },
            { md: md`Post-money = EUR 15 m.`, hidden: true, check: { prompt: "Post-money valuation (EUR m)", answer: 15, unit: "EUR m", tolerance: { abs: 0.01 } } },
            { md: md`Dilution $d = 3/15$ = 20%. Every existing holder keeps $1 - d = 0.8$ of its stake.` },
            { md: md`Founders after the seed $= 85\%\times0.8$.` },
            { md: md`Founders own **68%**.`, hidden: true, check: { prompt: "Founders' combined ownership after the seed (%)", answer: 68, unit: "%", tolerance: { abs: 0.1 } } },
          ],
          result: md`Founders hold 68% after the seed. If a new investor also demands that a 10% post-money option pool be created before the round (the option-pool shuffle covered in the equity module), founders would fall further. Model it before you sign a term sheet.`,
        },
        {
          kind: "question",
          question: {
            id: "fc01-l02-p1",
            type: "numeric",
            prompt: md`Mizan plans a pre-seed to fund the Shagaya soiling pilot and two follow-on pilots. Illustrative plan: 14 months to the evidence it needs (pilot results validated with the methodology partner and two paying pilots), 6 months buffer, average gross burn KWD 12k/month, revenue in the period KWD 30k. How much should it raise (KWD k)?`,
            answer: 210,
            tolerance: { abs: 1 },
            unit: "KWD k",
            explanation: md`$(14 + 6)\times12 - 30 = 240 - 30 = 210$ KWD k. A careful founder would also show the stress case without the KWD 30k (raise KWD 240k), because pilot revenue in public-sector settings often arrives late.`,
            concepts: ["fc01.round-sizing"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Stage discipline in practice",
      blocks: [
        {
          kind: "md",
          md: md`### Placing your ventures honestly

Using only what is established about each venture:

- **Afterwave**: a team with direct validation experience at Tesla, a defined product architecture (Lockstep, Enclave, Ripple) and a YC W27 application. The stage label depends on evidence you hold and this course does not: design partners using Lockstep on real rigs means pre-seed; paying customers renewing means seed. Write down which proofs you have today.
- **Mizan**: a live soiling-analytics pilot thread targeting Shagaya Phase I with KISR researchers as methodology partner. That is solution-risk work (pre-seed): the pilot exists to prove the analytics produce a validated, decision-useful result.
- **Suhail**: plan starts January 2027 with volunteer leads. That is idea stage for the business: the problem risk is whether sponsors, employers and investors value the community enough to pay.

### Who looks at what, by stage

- **Pre-seed investors and accelerators** underwrite the team and the insight; they read discovery notes and early usage.
- **Seed investors** want retention, renewals and the first non-design-partner customers; they call your customers.
- **Series A investors** rebuild your unit economics and sales funnel from your CRM and billing data; they test whether someone other than you can sell.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Stage mistakes",
          md: md`- **Premature scaling:** hiring sales before fit. Each salesperson then pushes a product that does not pull; burn rises, default alive turns to dead.
- **Raising on the wrong evidence:** showing a large pipeline to a seed investor who wants renewals. Match the proof to the stage.
- **Counting pilots as fit:** unpaid or heavily discounted pilots retire solution risk, not PMF risk. Fit is when pilots convert at full price.
- **Raising for 12 months:** you start fundraising again 6 months after closing, before the milestones are visible.
- **Optimising the valuation instead of the plan:** a high price with a missed milestone becomes a down round.`,
        },
        {
          kind: "checklist",
          title: "Before you call a venture 'seed-ready'",
          items: [
            "At least a few customers paying a real price, not only design partners",
            "Evidence of retention: renewals, expansion or continued weekly use",
            "A written milestone plan for the next 18 to 24 months with the Series A proofs",
            "A month-by-month burn plan and the round size derived from it",
            "Two or three customers willing to take a reference call",
            "A clear answer to: what risk does this round retire?",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask yourself (and that investors will ask)",
          items: [
            "Which risk is still the biggest one, and what experiment retires it fastest?",
            "What evidence would make a Series A investor say yes in 18 months?",
            "Which customers are using the product without us pushing them?",
            "What would we stop doing if we took the stage seriously?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc01-l02-p2",
            type: "short",
            prompt: md`Write Afterwave's "Use of funds and milestones" slide text for its seed round. State the stage you are at today (with the evidence), the risk this round retires, the 3 to 5 milestones it buys with dates, the round size derived from a burn plan, and the runway it gives. Label any illustrative numbers.`,
            rubric: [
              "States the current stage honestly with the evidence held today (no invented customers or revenue)",
              "Names the dominant risk the round retires (product-market fit for a seed)",
              "Lists 3 to 5 measurable milestones with dates that match Series A expectations (ARR, renewals or expansion, repeatable sales)",
              "Derives the round size from a phased burn plan over months to milestone plus a buffer, with arithmetic shown",
              "States runway after closing (about 18 to 24 months) and the dilution at an assumed pre-money",
              "Keeps it concise enough to fit one slide",
            ],
            modelAnswer: md`**Seed: EUR 2.5 m to reach Series A proof by Q2 2029 (illustrative numbers)**

**Today:** pre-seed. Lockstep in use with [N] design partners on real rigs (replace with actual). No recurring revenue yet.

**This round retires:** product-market fit risk. Do hardware test teams renew and expand once Lockstep and Ripple are in their workflow?

**Milestones:**
1. Q3 2027: 3 design partners converted to paid annual contracts at list price.
2. Q1 2028: Enclave deployed on-prem at 2 customers after passing security review.
3. Q3 2028: 6 paying customers, about EUR 1 m ARR; 2 expanded to a second team or site.
4. Q1 2029: 2 deals closed by our first account executive with the CEO in at most one meeting.
5. Q2 2029: EUR 1.5 m ARR, start Series A.

**Use of funds (24 months):** EUR 70k/month for 6 months, EUR 110k for 6, EUR 160k for 12 = EUR 3.0 m gross; planned revenue EUR 1.2 m, stressed to EUR 0.6 m, so net need EUR 2.4 m. **Raise EUR 2.5 m**, 24 months runway, about 20% dilution at an assumed EUR 10 m pre-money.`,
            explanation: md`The strongest version makes every number traceable to the plan and every milestone a proof the next investor will test. Notice that the milestones are about renewals, expansion and repeatability, the seed-to-A evidence, not about features.`,
            concepts: ["fc01.round-sizing", "fc01.risk-retirement", "fc01.stages"],
            difficulty: 2,
          },
        },
        { kind: "sources", refs: ["fc01-r5", "fc01-r20", "fc01-r6", "fc01-r7", "fc01-r15"] },
        {
          kind: "feynman",
          prompt: "Explain to Omar why Mizan's Shagaya pilot is pre-seed work and what would have to be true before Mizan is at product-market fit.",
          keyPoints: [
            "Stages are defined by the risk being retired, not by the amount raised",
            "A pilot with a methodology partner retires solution risk: does the analytics produce a validated, useful result?",
            "PMF requires buyers who pay full price, renew and expand, and who pull the product",
            "B2B signals of fit: pilots convert to contracts without discounts, shorter sales cycles, referrals",
            "Work that does not produce the next stage's evidence is a distraction now",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "fc01-l02-q1",
      type: "order",
      prompt: "Order the risks in the sequence a B2B startup typically retires them.",
      items: [
        "Problem risk: does anyone care enough to act?",
        "Solution risk: can we build something that solves it?",
        "Product-market fit risk: do customers keep using and paying?",
        "Go-to-market risk: can we sell repeatably at a cost below customer value?",
        "Scale risk: can we grow without breaking?",
      ],
      explanation: md`Idea, pre-seed, seed, Series A, Series B and later. Each round is priced on the risk that remains.`,
      concepts: ["fc01.stages", "fc01.risk-retirement"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc01-l02-q2",
      type: "numeric",
      prompt: md`A company raises EUR 4 m at EUR 16 m pre-money. What percentage of the company does the new investor own after the round?`,
      answer: 20,
      tolerance: { abs: 0.1 },
      unit: "%",
      explanation: md`Post $= 16 + 4 = 20$ m; $4/20 = 20\%$. Every existing holder is diluted by 20%.`,
      concepts: ["fc01.round-sizing"],
      difficulty: 1,
    },
    {
      id: "fc01-l02-q3",
      type: "multi",
      prompt: "Which are signs of product-market fit for an enterprise B2B product? (Select all that apply.)",
      options: [
        "Pilots convert to annual contracts at list price",
        "Customers expand to more teams or sites without heavy selling",
        "The CEO must be in every deal to close it",
        "Sales cycles shorten from one deal to the next",
        "Each new customer needs significant custom development",
      ],
      answer: [0, 1, 3],
      explanation: md`Fit shows as pull: conversion without discounting, expansion, shorter cycles, referrals. CEO-dependent sales and heavy customisation are typical of pre-fit companies.`,
      concepts: ["fc01.pmf"],
      difficulty: 1,
    },
    {
      id: "fc01-l02-q4",
      type: "numeric",
      prompt: md`Planned gross burn: EUR 80k/month for 8 months, then EUR 140k/month for 16 months. Planned revenue over the period EUR 900k. What net amount (EUR k) does the plan need?`,
      answer: 1980,
      tolerance: { abs: 5 },
      unit: "EUR k",
      explanation: md`Gross: $8\times80 + 16\times140 = 640 + 2{,}240 = 2{,}880$ k. Net of planned revenue: $2{,}880 - 900 = 1{,}980$ k. Before choosing the round size, also run the stress case with revenue late or halved.`,
      concepts: ["fc01.round-sizing"],
      difficulty: 1,
    },
    {
      id: "fc01-l02-q5",
      type: "mcq",
      prompt: "In a cohort retention curve, what pattern indicates product-market fit?",
      options: [
        "The curve declines steadily toward zero but top-line revenue grows",
        "The curve drops early and then flattens well above zero",
        "The curve starts at 100% in every cohort",
        "The newest cohort is larger than the oldest",
      ],
      answer: 1,
      explanation: md`A flattening curve means a stable share of customers keeps getting value. Top-line growth with a curve sliding to zero means new customers are replacing churned ones: no fit.`,
      concepts: ["fc01.pmf"],
      difficulty: 1,
    },
    {
      id: "fc01-l02-q6",
      type: "decision",
      prompt: md`Afterwave has three unpaid design partners and an investor offers a seed of EUR 4 m at a high valuation, conditional on hiring a sales team within six months. What do you do?`,
      options: [
        { text: "Accept and hire the sales team: the money proves the market.", score: 0.1, feedback: "Hiring sales before fit is premature scaling. The high price also sets a bar the next round must clear with evidence you do not yet have." },
        { text: "Negotiate the use of funds: take a round sized to reach paid conversions and renewals first, with sales hiring triggered by evidence (for example three paid annual contracts), even if that means a smaller round or a different investor.", score: 1, feedback: "Keeps the stage discipline: the round buys the retirement of PMF risk, and the scaling spend follows the evidence." },
        { text: "Decline all funding until you have Series A metrics.", score: 0.3, feedback: "Over-correcting. You may need capital to reach fit; the problem is the conditions, not the round." },
      ],
      explanation: md`Money raised against the wrong milestones can be worse than less money raised against the right ones.`,
      concepts: ["fc01.stages", "fc01.pmf", "fc01.round-sizing"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "fc01-l02-f1", front: "What defines a startup stage?", back: "The dominant risk being retired and the evidence held, not the round size.", concepts: ["fc01.stages"] },
    { id: "fc01-l02-f2", front: "Dominant risk at seed", back: "Product-market fit: do customers keep using, paying, renewing and expanding?", concepts: ["fc01.risk-retirement"] },
    { id: "fc01-l02-f3", front: "Andreessen's definition of product-market fit", back: "Being in a good market with a product that can satisfy that market.", concepts: ["fc01.pmf"] },
    { id: "fc01-l02-f4", front: "Sean Ellis 40% test", back: "If at least about 40% of users would be 'very disappointed' without the product, fit is likely.", concepts: ["fc01.pmf"] },
    { id: "fc01-l02-f5", front: "How to size a round", back: "Net planned burn over months to the next milestone plus about 6 months buffer; 18 to 24 months runway after a seed.", concepts: ["fc01.round-sizing"] },
    { id: "fc01-l02-f6", front: "Dilution from a priced round", back: md`$d = I/(\text{pre} + I)$; existing holders keep $1-d$ of their stakes.`, concepts: ["fc01.round-sizing"] },
  ],
};

export default lesson;
