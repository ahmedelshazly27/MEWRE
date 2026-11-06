import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc07-l03",
  title: "The Capital Sources Map: Angels, VCs, Accelerators, Grants and Gulf Funds",
  summary:
    "Every source of money has a price (dilution, debt, time, strings) and a speed. Map angels, accelerators (YC, a16z speedrun, Hub71, Antler), VCs, Dutch and EU non-dilutive programmes (WBSO, Innovatiekrediet, EIC Accelerator) and Gulf capital, compute their true cost, and stack them so equity is the last money you spend.",
  minutes: 80,
  objectives: [
    "Classify a capital source by dilution, speed, certainty and strings attached",
    "Compare accelerator deals by implied post-money valuation and what they add besides cash",
    "Compute the WBSO benefit across both 2026 brackets and the dilution equivalent of non-dilutive money",
    "Judge whether a competitive grant (EIC Accelerator) is worth applying for, using expected value and founder time",
    "Design a capital stack for one of your ventures that matches the venture's shape",
  ],
  concepts: [
    { id: "fc07.capital-sources", name: "Capital sources and their price", description: "Angels, accelerators, VCs, strategics, grants, tax credits, loans and customer money each cost something different: equity, interest, time, control or obligations.", competency: "fc-fundraising", related: ["fc07.fund-structure"] },
    { id: "fc07.accelerator-terms", name: "Accelerator deal terms", description: "Accelerators buy a fixed percentage for a fixed cheque; the implied post-money valuation (cheque divided by percentage) is the price, the network and signal are the rest of the value.", competency: "fc-fundraising", related: ["fc07.safe-mechanics"] },
    { id: "fc07.non-dilutive", name: "Non-dilutive funding", description: "Tax credits (WBSO), innovation loans (Innovatiekrediet) and grants (EIC Accelerator) fund R&D without selling equity, at the cost of eligibility rules, administration and time.", competency: "fc-fundraising", related: ["fc07.capital-sources"] },
    { id: "fc07.gulf-capital", name: "Gulf venture capital landscape", description: "State-backed funds of funds, sovereign-linked investors, regional VCs and programmes such as Hub71 shape MENA venture funding, which is concentrated in the UAE and Saudi Arabia and swung sharply in 2025 to 2026.", competency: "fc-fundraising", related: ["fc07.regional-norms"] },
    { id: "fc07.capital-stacking", name: "Capital stacking", description: "Sequencing sources so the cheapest money (customers, tax credits, grants) funds as much as possible and equity is raised at the highest defensible valuation, while respecting eligibility conflicts such as jurisdiction.", competency: "fc-fundraising", related: ["fc07.non-dilutive", "fc07.round-sizing"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What each source costs, how fast it pays, and what it asks of you",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You run three ventures with three different shapes: Afterwave is venture-shaped (large market, enterprise software, power-law upside), Mizan is a Gulf energy business with public buyers and possibly hardware distribution, Suhail is a community that will live on sponsors and partners. Using the wrong capital for a venture's shape (VC money for Suhail, slow grants as Afterwave's runway) is a strategic mistake that no pitch fixes. And for Afterwave, the choice between YC, a Dutch base and Zurich decides which non-dilutive money you can even apply for.`,
        },
        {
          kind: "md",
          md: md`### The map

| Source | What you give | Typical size | Speed | Best for |
|---|---|---|---|---|
| **Customers** (paid pilots, prepayments) | Delivery obligations | Pilot fees | Fast if a buyer exists | Proof and cash at once; Afterwave pilots, Mizan analytics pilots |
| **Angels** | Equity (SAFE or convertible) | EUR/USD 10 to 250k each | Weeks | Pre-seed; operators who open doors (ex-Tesla, robotics, Gulf energy) |
| **Accelerators** | Fixed equity for a fixed cheque | USD 100k to 1m | One application cycle | Signal, network, structured fundraise at demo day |
| **Seed and Series A VCs** | Equity, board seat at A, protective provisions | EUR 1 to 20m | 2 to 4 months | Venture-shaped companies only (Lesson 1) |
| **Corporate VC / strategics** | Equity plus possible commercial strings | Varies | Slow, many stakeholders | Distribution partners; watch rights of first refusal on acquisition |
| **Tax credits** (WBSO) | Administration of R&D hours | Share of R&D wage costs | Monthly once approved | Any Dutch-payroll R&D team |
| **Innovation loans** (Innovatiekrediet) | Debt, repaid from revenue | EUR 150k+ projects | Months | Defined development projects with a market plan |
| **Competitive grants** (EIC Accelerator) | Proposal effort, reporting | Up to EUR 2.5m grant | 6+ months, low odds | Deep-tech with EU base |
| **Gulf programmes and funds** | Equity, often local presence | Varies | Relationship-driven | Mizan; Afterwave only if Gulf customers matter |

### Accelerators: price = cheque divided by percentage

Use the implied post-money valuation to compare deals:`,
        },
        { kind: "equation", formula: "fc07-safe-ownership" },
        {
          kind: "md",
          md: md`| Programme (as reported, Nov 2026) | Terms | Implied post-money | Status of the figures |
|---|---|---|---|
| **Y Combinator** | USD 125k for 7 % (post-money SAFE) + USD 375k uncapped MFN SAFE; YC keeps pro rata rights | USD 1.79m for the 7 % piece | Multiple secondary sources; ycombinator.com/deal not fetched |
| **a16z speedrun** | Up to USD 1m: USD 500k for about 10 % + USD 500k in the next round within 18 months; USD 5m+ partner credits; no board seat | USD 5m | Secondary; instrument (SAFE vs common) unclear |
| **Antler (EU, 2026)** | EUR 100k on an uncapped MFN SAFE, follow-on up to EUR 250k | No cap | Secondary; varies by country |
| **Antler (US)** | USD 250k for 10 % plus a USD 150k SAFE | USD 2.5m for the first piece | Secondary |
| **Hub71 Access (Abu Dhabi)** | AED 250k in-kind (housing, office, insurance) + AED 250k cash for equity via SAFE; possible AED 250k top-up | Depends on SAFE terms | Secondary; hub71.com not reachable |

YC's 7 % at a USD 1.79m implied post-money is expensive *as a price* and cheap *as a signal*: YC companies typically raise their next round on demo day at valuations many times higher, and the uncapped MFN piece converts at that later price. The question is never "is 7 % a lot?" but "does this programme raise my next round's valuation and odds by more than 7 %?"

Timing (research brief, Nov 2026): YC W27's on-time deadline was 2 Nov 2026 (passed), decisions about mid-December, batch January to March 2027 in San Francisco; YC dropped Canada as an eligible incorporation jurisdiction in January 2026 (US Delaware, Cayman, Singapore remain; a reported reversal is unverified). a16z speedrun SR008 applications closed 1 Nov 2026; the cohort runs February to April 2027.

### Non-dilutive money in the Netherlands and the EU

**WBSO** (R&D tax credit, RVO) reduces the payroll tax and social contributions you remit for staff doing qualifying R&D (S&O) work:`,
        },
        { kind: "equation", formula: "fc07-wbso-benefit" },
        {
          kind: "md",
          md: md`2026 parameters (RVO, per research brief): first bracket **36 %** up to **EUR 391,020** of S&O cost base (raised from EUR 380,000 by a one-off indexation; RVO's earlier 2026 handbook still shows EUR 380,000), **50 %** for qualifying starters, second bracket **16 %**. You apply **before** the period in which the R&D happens and keep an hours administration per project.

**Innovatiekrediet** (RVO): a loan for technically risky development projects with a market plan. For small firms it covers up to **45 %** of project costs without collaboration (35 % medium, 25 % large), from a minimum project size of **EUR 150k** up to **EUR 10m** for technical projects. You must finance the remainder yourself. The 2026 window runs first come, first served until **31 Dec 2026**; the 2026 budget was EUR 50m, possibly raised to EUR 70m (unverified).

**EIC Accelerator** (European Innovation Council): grant up to **EUR 2.5m** plus optional equity of **EUR 1 to 10m** from the EIC Fund. Highly competitive: at the October 2025 cut-off, 121 of 923 applicants were invited to interview and 61 were funded, about **6.6 %**. All 2026 full-proposal cut-offs have passed; the first 2027 cut-off is reportedly 7 January 2027 (unverified).

To decide whether to apply to a competitive grant, compare expected value with the real cost:`,
        },
        { kind: "equation", formula: "fc07-expected-grant" },
        { kind: "equation", formula: "fc07-dilution-equivalent" },
        {
          kind: "callout",
          tone: "unverified",
          title: "Jurisdiction changes eligibility",
          md: md`WBSO requires R&D staff on a **Dutch payroll** (a Dutch BV subsidiary under a Delaware parent qualifies as the withholding agent). Innovatiekrediet is for companies established in the Netherlands. A move to **Zurich** would put Swiss staff outside WBSO; Switzerland's own agency (Innosuisse) and Switzerland's association status for EIC instruments must be checked before you plan on them; neither was verified in the course research. Starter status for WBSO has conditions (newly a withholding agent, limited prior WBSO use): confirm with RVO.`,
        },
        {
          kind: "md",
          md: md`### Gulf capital

- **Market size and swing (MAGNiTT):** MENA USD 3.8bn across 688 deals in 2025 (+74 %), then USD 1.35bn across 214 deals in H1 2026 (funding -22 %, deals -41 % year on year). AI took about half of H1 2026 funding; the UAE took 66 %; Saudi Arabia only USD 219m across 72 deals after a strong 2025.
- **Who sits behind the funds:** Saudi Venture Capital (SVC) and the Jada Fund of Funds co-fund many regional VCs and programmes (for example Global Ventures III, over USD 150m, backed by SVC; F6 Group's Riyadh seed programme co-funded by SVC, Jada and Riyadh Valley). Sanabil (PIF) runs an accelerator with 500 Global. Khwarizmi Ventures Fund II had a first close of USD 70m+ in February 2026.
- **Programmes:** Hub71 in Abu Dhabi (terms above) trades incentives for a UAE presence.
- **Kuwait:** the research found no Kuwait-specific venture data for 2025 to 2026. Kuwait has a state SME fund (the National Fund for SME Development); its current terms were not verified. For Mizan, strategic and family-office capital and customer-funded pilots are likelier first sources than institutional VC.`,
        },
        {
          kind: "matrix",
          title: "Capital sources by dilution and speed",
          xAxis: ["Non-dilutive", "Dilutive"],
          yAxis: ["Slow or uncertain cash", "Fast cash"],
          cells: [
            { label: "Paid pilots, WBSO", detail: "Fast and cheap once a buyer or approval exists; the first money to chase" },
            { label: "Angels, accelerators", detail: "Fast equity; price is percentage per cheque, value is signal and network" },
            { label: "EIC grant, Innovatiekrediet", detail: "No or low dilution but slow and uncertain; never your runway plan" },
            { label: "Institutional VC, Gulf funds", detail: "Large cheques, months of process, governance rights" },
          ],
          caption: "Fund the plan from the top-left first; use the bottom-left as upside, never as the runway assumption.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Stacking capital for Afterwave in 2027",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "An illustrative 2027 capital stack for Afterwave (Dutch BV R&D entity)",
          given: md`Illustrative assumptions, not plans or facts: Afterwave keeps its R&D staff on a Dutch BV payroll (under a Delaware parent if it joins YC). 2027 S&O cost base EUR 300k, starter status. A defined 18-month development project (Ripple on customer bench data) costing EUR 1.2m. Seed at EUR 15m post-money. YC acceptance is **not** assumed; the stack is computed with and without it.`,
          steps: [
            { md: md`**WBSO:** $S = 300\text{k} < 391{,}020$, so $W = 0.50\times 300\text{k} =$ **EUR 150k**, realised as lower monthly payroll-tax payments. Dilution equivalent at the seed price: $150/15{,}000 = 1.0\%$ of the company.` },
            { md: md`**Innovatiekrediet:** up to $0.45\times 1.2\text{m} =$ **EUR 540k** loan for the Ripple project; the other EUR 660k must come from equity. It is debt, so it does not dilute, but it must be repaid from revenue (RVO's terms on repayment if the project fails technically must be checked).` },
            { md: md`**EIC Accelerator:** $E[G] = 0.066\times 2.5\text{m} - c_{\text{app}}$. With an illustrative EUR 50k of consultant fees and founder time, $E[G] \approx 165 - 50 = 115$ EUR k. Positive, but low probability and months of founder time during the seed: treat as upside, not plan.` },
            { md: md`**YC (if accepted):** USD 500k for 7 % plus the MFN conversion. The real value is the demo-day round: a higher seed valuation reduces the dilution of the EUR 3m seed. If YC lifts the seed post-money from EUR 15m to EUR 20m, seed dilution falls from 20 % to 15 %, more than offsetting YC's 7 % on the 125k piece.` },
            { md: md`**Order of operations:** apply for WBSO before the first R&D month; prepare the Innovatiekrediet application in parallel with the seed (it needs the co-financing); run the seed; keep EIC for a later cut-off when a full-time person can own it.` },
          ],
          result: md`Non-dilutive sources fund about **EUR 690k** (EUR 150k WBSO, EUR 540k loan) of the 2027 plan, which reduces the equity needed by the same amount or extends runway by about 6 months at EUR 115k/month. Jurisdiction (Dutch payroll vs Zurich) decides whether this stack exists at all.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "WBSO across both brackets",
          given: md`Illustrative: 2027 S&O cost base EUR 420,000, using the 2026 parameters (36 %, 50 % for starters, ceiling EUR 391,020, second bracket 16 %).`,
          steps: [
            { md: md`Amount above the first-bracket ceiling: $420{,}000 - 391{,}020 = 28{,}980$ EUR.` },
            { md: md`Starter benefit: $0.50\times 391{,}020 + 0.16\times 28{,}980$.` },
            { md: md`= **EUR 200,147**.`, hidden: true, check: { prompt: "WBSO benefit for a starter (EUR)", answer: 200147, unit: "EUR", tolerance: { abs: 50 } } },
            { md: md`Non-starter benefit: $0.36\times 391{,}020 + 0.16\times 28{,}980$ = **EUR 145,404**.`, hidden: true, check: { prompt: "WBSO benefit for a non-starter (EUR)", answer: 145404, unit: "EUR", tolerance: { abs: 50 } } },
          ],
          result: md`Starter status is worth about EUR 55k on this base. The second bracket adds only 16 cents per euro, so the first bracket is where the money is.`,
        },
        {
          kind: "question",
          question: {
            id: "fc07-l03-p1",
            type: "numeric",
            prompt: md`A grant of EUR 400k arrives the same quarter you close a seed at EUR 16m post-money. What ownership (%) would you have sold to raise the same cash as equity?`,
            answer: 2.5,
            tolerance: { abs: 0.02 },
            unit: "%",
            explanation: md`$\Delta o = 0.4/16 = 2.5\%$. Worth real founder time, but compare with what the application and reporting cost.`,
            concepts: ["fc07.non-dilutive"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running applications without stalling the company",
      blocks: [
        {
          kind: "md",
          md: md`### Who does what

- **WBSO:** an accountant or a subsidy adviser files; you own the project descriptions and the hours administration. Engineers log S&O hours per project weekly. RVO audits hours.
- **Innovatiekrediet and EIC:** specialist consultants (often partly on success fee) write with you; you own the market and business case, the engineers own the technical plan. Expect several rounds of drafting.
- **Accelerators:** founders apply; the video and the one-paragraph description matter more than the deck. YC asks what you are making, why you, and what you have learned from users.
- **Gulf funds:** warm introductions through operators and family offices; meetings in person in Riyadh, Abu Dhabi or Dubai; expect questions on local presence and hiring.

### What a good capital stack looks like per venture

| Venture | Shape | First money | Then | Avoid |
|---|---|---|---|---|
| Afterwave | Venture-scale enterprise software, EU and US | Angels or accelerator, WBSO, paid pilots | Seed lead (EU or US), Innovatiekrediet | Grants as runway; Gulf funds without Gulf customers |
| Mizan | Gulf energy analytics and distribution, public buyers | Paid pilot (Shagaya), strategic or family-office angels | Regional VC or strategic investor once the pilot proves value; working capital for distribution | US seed funds that need a billion-dollar path on day one |
| Suhail | Community and media | Sponsors, partners, event revenue | Grants and institutional partners for the research arm | VC equity before a venture-shaped revenue model exists |`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Counting a grant before award:** a runway plan that assumes the EIC grant is a plan to run out of cash.
- **Missing the WBSO application deadline:** it must be filed before the period starts; R&D done before approval earns nothing.
- **Weak hours records:** at audit, unsupported S&O hours are corrected and the benefit clawed back.
- **Jurisdiction blindness:** moving R&D staff to Zurich, or incorporating only in Delaware without a Dutch employer, silently removes WBSO and Innovatiekrediet.
- **Accelerator by brand:** joining a programme whose network has no hardware or industrial buyers adds dilution without distribution.`,
        },
        {
          kind: "ask",
          title: "Questions to ask before taking money from any source",
          items: [
            "What exactly do we give: percentage, interest, reporting, exclusivity, board or observer seat, local presence?",
            "When does the cash actually arrive, and what has to be true first?",
            "Does this source conflict with another (jurisdiction, state aid limits, exclusivity, a competitor's investor)?",
            "Which next-round investors does this source make more or less likely to say yes?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc07-l03-p2",
            type: "short",
            prompt: md`Produce a **12-month capital stack plan** for either Afterwave or Mizan. List each source you would pursue in order, the amount (illustrative), what it costs (dilution, interest, obligations), when cash arrives, eligibility conditions, and one conflict between sources you must manage. Compute the total equity you would still need to raise and its dilution at a stated post-money.`,
            rubric: [
              "Sources ordered from cheapest and fastest to slowest and most dilutive, with reasons",
              "Amounts and costs stated per source and labelled illustrative; uses correct 2026 parameters where it cites WBSO, Innovatiekrediet or EIC",
              "Cash timing realistic (grants not treated as runway)",
              "Eligibility and at least one conflict identified (jurisdiction, co-financing requirement, local presence, competitor investor)",
              "Remaining equity need and dilution computed correctly",
              "Fits the venture's shape (venture-scale vs Gulf energy business)",
            ],
            modelAnswer: md`**Afterwave, 12 months (illustrative).**
1. **Paid pilots** with two hardware test teams: EUR 60k total, cost is delivery effort, cash at signature or milestone.
2. **WBSO (starter):** S&O base EUR 300k, benefit EUR 150k via payroll-tax reduction from the first approved month. Condition: R&D staff on the Dutch BV payroll; file before the period.
3. **Angels:** EUR 250k on a convertible or SAFE with a EUR 8m post-money cap (3.1 %), from operators in robotics and drives who can introduce buyers. Cash in 4 to 6 weeks.
4. **Seed:** see below. **Innovatiekrediet:** EUR 540k loan on a EUR 1.2m Ripple project, applied for alongside the seed because it requires co-financing of the other EUR 660k. Cash after approval, months later.
5. **EIC Accelerator:** not in the plan; revisit for a 2027 cut-off once a seed is closed (expected value about EUR 115k net, 6.6 % odds).

**Conflict:** if Afterwave relocates R&D to Zurich, items 2 and 4 disappear; keep a Dutch BV employing the engineers or replace with Swiss instruments after checking eligibility.

**Equity need:** plan needs EUR 115k/month for 26 months = EUR 2.99m, minus EUR 60k pilots, EUR 150k WBSO, EUR 540k loan and EUR 250k angels gives about **EUR 1.99m**, so a **EUR 2.0m seed** at EUR 12m post-money: 16.7 % dilution instead of 25 % for raising the full EUR 3m at the same price.`,
            explanation: md`The plan is graded on sequencing and honesty about timing: customers and tax credits first, slow and uncertain money as upside, equity sized for the remaining gap at a stated price.`,
            concepts: ["fc07.capital-stacking", "fc07.non-dilutive", "fc07.capital-sources"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to Ismail why giving YC 7 % for USD 125k can be a good deal even though the implied valuation is far below what Afterwave might raise at on its own.",
          keyPoints: [
            "Implied post-money is cheque divided by percentage: about USD 1.79m",
            "The price is high per euro, but the value is the signal, network and demo-day fundraising",
            "If YC raises the next round's valuation, seed dilution falls by more than 7 points",
            "The USD 375k MFN SAFE converts at later terms, so it is priced at the next round",
            "The test is whether the programme improves next-round odds and price by more than it costs",
          ],
        },
        { kind: "sources", refs: ["fc07-r5", "fc07-r6", "fc07-r7", "fc07-r8", "fc07-r9", "fc07-r10", "fc07-r11", "fc07-r13", "fc07-r14"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc07-l03-q1",
      type: "numeric",
      prompt: md`An accelerator offers USD 500k for 10 %. What is the implied post-money valuation (USD m)?`,
      answer: 5,
      tolerance: { abs: 0.01 },
      unit: "USD m",
      explanation: md`$V = 0.5/0.10 = 5$ USD m. This is a16z speedrun's reported first tranche.`,
      concepts: ["fc07.accelerator-terms"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc07-l03-q2",
      type: "numeric",
      prompt: md`Using the 2026 WBSO parameters, what is a non-starter's benefit (EUR) on an S&O cost base of EUR 250,000?`,
      answer: 90000,
      tolerance: { abs: 10 },
      unit: "EUR",
      explanation: md`Below the EUR 391,020 ceiling, so $0.36\times 250{,}000 = 90{,}000$ EUR. A starter would get 50 %: EUR 125,000.`,
      concepts: ["fc07.non-dilutive"],
      difficulty: 1,
    },
    {
      id: "fc07-l03-q3",
      type: "multi",
      prompt: "Which statements about Afterwave's non-dilutive options are correct? (Select all that apply.)",
      options: [
        "WBSO only benefits R&D staff on a Dutch payroll",
        "Innovatiekrediet requires the company to finance the rest of the project",
        "An EIC Accelerator grant is a reliable runway assumption because the grant is large",
        "Moving all engineers to a Zurich entity could remove WBSO eligibility",
        "WBSO can be claimed retroactively for R&D done last year",
      ],
      answer: [0, 1, 3],
      explanation: md`WBSO is a payroll-tax reduction for Dutch withholding agents and must be applied for in advance. Innovatiekrediet covers a share of costs (45 % for small firms). EIC success rates of about 6.6 % make it upside, not runway.`,
      concepts: ["fc07.non-dilutive", "fc07.capital-stacking"],
      difficulty: 2,
    },
    {
      id: "fc07-l03-q4",
      type: "numeric",
      prompt: md`A grant pays EUR 1.5m with a 10 % award probability. Applying costs EUR 40k in fees plus founder time valued at EUR 35k. What is the expected net value of applying (EUR k)?`,
      answer: 75,
      tolerance: { abs: 1 },
      unit: "EUR k",
      explanation: md`$E[G] = 0.10\times 1{,}500 - (40 + 35) = 150 - 75 = 75$ EUR k. Positive, but compare the founder time with what it would do for the seed round.`,
      concepts: ["fc07.non-dilutive"],
      difficulty: 2,
    },
    {
      id: "fc07-l03-q5",
      type: "mcq",
      prompt: "Which capital source fits Suhail best in 2027?",
      options: ["A US seed fund", "Sponsors and institutional partners for events and the research arm", "An a16z speedrun cohort", "Venture debt"],
      answer: 1,
      explanation: md`Suhail is volunteer-led until revenue, with sponsorship and partner economics. It does not pass a VC fund-returner test; sponsors, partners and grants match its shape.`,
      concepts: ["fc07.capital-sources"],
      difficulty: 1,
    },
    {
      id: "fc07-l03-q6",
      type: "order",
      prompt: "Order these sources for Afterwave's 2027 plan, from first to pursue to last.",
      items: ["Paid pilots with hardware test teams", "WBSO application before the first R&D month", "Seed round with a lead investor", "EIC Accelerator at a later cut-off"],
      explanation: md`Cheapest and fastest first (customers, tax credit), then equity for the remaining gap, then the slow and uncertain grant as upside once someone can own it.`,
      concepts: ["fc07.capital-stacking"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "fc07-l03-f1", front: "Implied post-money of an accelerator deal", back: "Cheque divided by percentage: YC USD 125k / 7 % = USD 1.79m; speedrun USD 500k / 10 % = USD 5m.", concepts: ["fc07.accelerator-terms"] },
    { id: "fc07-l03-f2", front: "WBSO 2026", back: "36 % up to EUR 391,020 S&O base (50 % starters), 16 % above; applied for in advance; Dutch payroll only.", concepts: ["fc07.non-dilutive"] },
    { id: "fc07-l03-f3", front: "Innovatiekrediet (small firm)", back: "Loan up to 45 % of project costs, EUR 150k minimum project, up to EUR 10m (technical); open until 31 Dec 2026.", concepts: ["fc07.non-dilutive"] },
    { id: "fc07-l03-f4", front: "EIC Accelerator", back: "Grant up to EUR 2.5m plus EUR 1 to 10m equity; October 2025 cut-off funded 61 of 923 (about 6.6 %).", concepts: ["fc07.non-dilutive"] },
    { id: "fc07-l03-f5", front: "Dilution equivalent of a grant", back: md`$\Delta o = G/V_{\text{post}}$: EUR 150k at EUR 15m post = 1 %.`, concepts: ["fc07.non-dilutive"] },
    { id: "fc07-l03-f6", front: "MENA VC 2025 vs H1 2026 (MAGNiTT)", back: "2025: USD 3.8bn, 688 deals. H1 2026: USD 1.35bn, 214 deals; UAE 66 %; AI about half.", concepts: ["fc07.gulf-capital"] },
    { id: "fc07-l03-f7", front: "Capital stacking rule", back: "Customers and tax credits first, equity for the gap, grants as upside; check jurisdiction conflicts.", concepts: ["fc07.capital-stacking"] },
  ],
};

export default lesson;
