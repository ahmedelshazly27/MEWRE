import { md, type Question } from "../../schema";

const exam: Question[] = [
  {
    id: "fc01-x1",
    type: "numeric",
    prompt: md`A EUR 60 m seed fund buys 8% of Afterwave and expects two later rounds of 20% dilution each. Comparable companies are valued at 10x revenue, and the illustrative ACV is EUR 150k. How many customers (at that ACV) does Afterwave need at exit to be a fund-returner? (Round to the nearest customer.)`,
    answer: 781,
    tolerance: { abs: 3 },
    unit: "customers",
    explanation: md`$o_{exit} = 0.08\times0.8\times0.8 = 5.12\%$. Exit needed $= 60/0.0512 = 1{,}171.9$ EUR m. Revenue at 10x $= 117.2$ EUR m. Customers $= 117.2/0.15 = 781$. Linking fund math to bottom-up sizing shows why ACV expansion matters: at EUR 400k ACV the same bar needs 293 customers.`,
    concepts: ["fc01.fund-returner", "fc01.market-sizing"],
    difficulty: 3,
  },
  {
    id: "fc01-x2",
    type: "numeric",
    prompt: md`Cash EUR 500k; expenses EUR 50k/month held flat; revenue EUR 10k/month growing 9% per month. How much cash (EUR k) is left in the month revenue first covers expenses? (Count every month in which revenue is below expenses.)`,
    answer: 10.2,
    tolerance: { abs: 1 },
    unit: "EUR k",
    explanation: md`$n^{*} = \ln5/\ln1.09 = 18.68$, so 19 burning months. $B_{cum} = 19\times50 - 10\times(1.09^{19}-1)/0.09 = 950 - 10\times(5.1417-1)/0.09 = 950 - 460.2 = 489.8$ k. Cash left $= 500 - 489.8 = 10.2$ k: default alive by a hair. At 7% growth the company would need EUR 618k and be default dead.`,
    concepts: ["fc01.default-alive", "fc01.growth-rate"],
    difficulty: 2,
  },
  {
    id: "fc01-x3",
    type: "decision",
    prompt: md`An investor offers Mizan a EUR 1.5 m venture round. Your bottom-up model shows a Gulf SAM for soiling analytics of tens of millions of USD per year, and the pilot has not yet produced a paid conversion. What do you do?`,
    options: [
      { text: "Take the round and hire a sales team to cover the Gulf.", score: 0, feedback: "Premature scaling on unproven fit, with venture expectations the analytics-only market may not meet." },
      { text: "Decline for now; finish the staged pilot, test whether the value pool extends to plant control and distribution, and choose the financing (grant, strategic partner, revenue or VC) once the ceiling and fit are known.", score: 1, feedback: "Matches the instrument to evidence: the round should follow the answer to 'is this venture-scale?', not precede it." },
      { text: "Take the round but spend it slowly.", score: 0.4, feedback: "Better than spending fast, but the investors still need a fund-returner outcome; the mismatch remains." },
    ],
    explanation: md`Integrates venture-scale (L1), stage evidence (L2), value-based sizing (L3) and staged bets (L5).`,
    concepts: ["fc01.venture-scale", "fc01.value-capture", "fc01.staged-bets"],
    difficulty: 2,
  },
  {
    id: "fc01-x4",
    type: "multi",
    prompt: "Which pieces of evidence most directly support moving a B2B company from seed to Series A? (Select all that apply.)",
    options: [
      "Deals closed by a salesperson without the CEO in every meeting",
      "A larger number of unpaid pilots",
      "Customers expanding to additional teams or sites",
      "A new product line started in parallel",
      "Cost to acquire a customer recovered within a reasonable payback period",
    ],
    answer: [0, 2, 4],
    explanation: md`Series A retires go-to-market risk: repeatable sales, expansion and working unit economics. More unpaid pilots and a second product are not that evidence.`,
    concepts: ["fc01.stages", "fc01.risk-retirement"],
    difficulty: 2,
  },
  {
    id: "fc01-x5",
    type: "numeric",
    prompt: md`Afterwave considers building its own instrumented test platform: EUR 800k in total, 25% chance there is a paying market, worth EUR 4 m if so. An extra EUR 100k prototype placed with one customer would reveal the answer before the EUR 800k is committed. What is the value of the information the prototype buys (EUR k)?`,
    answer: 500,
    tolerance: { abs: 1 },
    unit: "EUR k",
    explanation: md`$\Delta EV = (1-p)I_2 - I_1 = 0.75\times800 - 100 = 500$ EUR k. Check: all-in $EV = 0.25\times4{,}000 - 800 = 200$; staged $EV = 0.25\times(4{,}000 - 800) - 100 = 700$; difference 500. A cheap prototype before a large hardware commitment is the textbook staged bet.`,
    concepts: ["fc01.staged-bets"],
    difficulty: 3,
  },
  {
    id: "fc01-x6",
    type: "numeric",
    prompt: md`For a qualified opportunity to become a contract, three independent steps must succeed with probabilities 0.5, 0.6 and 0.7. How many qualified opportunities do you need for an expected two contracts? (1 decimal)`,
    answer: 9.5,
    tolerance: { abs: 0.1 },
    unit: "opportunities",
    explanation: md`$P = 0.5\times0.6\times0.7 = 0.21$; $2/0.21 = 9.5$. Raising the weakest step from 0.5 to 0.6 cuts the requirement to 7.9.`,
    concepts: ["fc01.must-go-right"],
    difficulty: 2,
  },
  {
    id: "fc01-x7",
    type: "mcq",
    prompt: "Which grows faster over a year: 2% per week or 9% per month?",
    options: [
      "2% per week, by a wide margin",
      "9% per month, by a wide margin",
      "They are almost identical (about 2.8x per year each)",
      "Cannot be compared without knowing the starting revenue",
    ],
    answer: 2,
    explanation: md`$1.02^{52} = 2.80$ and $1.09^{12} = 2.81$. Always convert to the same period before comparing growth claims.`,
    concepts: ["fc01.growth-rate"],
    difficulty: 1,
  },
  {
    id: "fc01-x8",
    type: "decision",
    prompt: md`Afterwave is default dead on its current plan, with 9 months of runway. A pre-mortem names the weakest link as on-prem security review (probability 0.4). A seed investor is interested but wants to see two paid contracts first. What is the best next move?`,
    options: [
      { text: "Cut all costs to extend runway and stop selling until the round closes.", score: 0.2, feedback: "Extends runway but stops producing the evidence the investor asked for." },
      { text: "Prepare a complete Enclave security package to lift the weakest link, focus the team on converting the two most advanced pilots, start the raise now with the investor's milestone as the explicit goal, and defer hires.", score: 1, feedback: "Attacks the weakest link, produces the stage evidence, respects the 3 to 6 month fundraising lead time and protects default alive." },
      { text: "Hire a salesperson to open more pipeline.", score: 0.1, feedback: "Raises burn (worse default dead) and attacks volume, not the weakest link." },
    ],
    explanation: md`Combines default alive (L1), stage evidence (L2) and must-go-right analysis (L4).`,
    concepts: ["fc01.default-alive", "fc01.must-go-right", "fc01.stages"],
    difficulty: 2,
  },
  {
    id: "fc01-x9",
    type: "multi",
    prompt: md`A post-mortem of a failed hardware-analytics startup lists: "ran out of cash", "pilots never converted to paid contracts", "the two cofounders disagreed about building hardware", and "a large incumbent bundled a similar feature". Which are root mechanisms? (Select all that apply.)`,
    options: [
      "Ran out of cash",
      "Pilots never converted (no market need at that price, or broken business model)",
      "Cofounder disagreement on direction",
      "Incumbent bundling (outcompeted)",
    ],
    answer: [1, 2, 3],
    explanation: md`Cash is the proximate cause. Conversion failure, team conflict and competition are the root mechanisms that drained it.`,
    concepts: ["fc01.failure-modes"],
    difficulty: 1,
  },
  {
    id: "fc01-x10",
    type: "short",
    prompt: md`Write the half-page investment memo a seed partner would write about Afterwave after a first meeting, from the investor's side: the fund-returner question, bottom-up market ceiling, why now, unfair advantage and founder-market fit, stage and the evidence still missing, the top three risks from a pre-mortem, and a recommendation (pass, follow, or invest) with the milestone that would change it. Use labelled assumptions; do not invent traction.`,
    rubric: [
      "Applies the fund-returner test with fund size, ownership after dilution and exit value, and compares it with a bottom-up ceiling",
      "States a specific, checkable why-now and distinguishes real unfair advantages from features",
      "Places the company at an honest stage and names the evidence missing for the next one",
      "Names three root-mechanism risks (market need, business model, team, competition, timing, regulation) with the weakest link identified",
      "Gives a clear recommendation tied to a measurable milestone",
      "Labels all assumptions and invents no customers, revenue or funding",
    ],
    modelAnswer: md`**Afterwave, seed memo (assumptions labelled)**

**Fund math:** our EUR 50 m fund, 10% at seed, about 6% at exit after three rounds: we need an exit of about EUR 800 m, roughly EUR 100 m revenue at 8x.

**Market:** bottom-up SAM of about EUR 300 m (assumed 2,500 physical-AI test teams in the EU and US at EUR 120k). Core 5-year SOM is about EUR 9 m; the fund-returner case requires expansion (more teams per customer, higher ACV from bench memory and change-impact analysis, own test platforms). Unproven.

**Why now:** EU Machinery Regulation applies from 20 Jan 2027 with third-party assessment for ML-based safety components; physical-AI companies are moving to production. Postponement of AI provisions requested by industry; outcome to check.

**Advantage and fit:** cofounders from Tesla drive-unit and inverter validation: credible with test leads and insight into where retest time goes. Product architecture (capture, private environment, change-impact) is copyable; the data accumulated per customer may not be.

**Stage:** pre-seed. Missing: paid conversions at list price, an on-prem deployment through a security review, first expansion.

**Risks:** (1) security review blocks pilots (weakest link); (2) test teams solve change-impact in-house (no market need at the price); (3) CEO's time split with two other ventures (team).

**Recommendation:** follow. Invest when two design partners convert to paid annual contracts and one Enclave deployment passes security review, with founder time commitment agreed in writing.`,
    explanation: md`Writing from the investor's side tests whether you can apply every tool in the module to your own company before someone else does.`,
    concepts: ["fc01.fund-returner", "fc01.market-sizing", "fc01.why-now", "fc01.pre-mortem", "fc01.stages"],
    difficulty: 3,
  },
];

export default exam;
