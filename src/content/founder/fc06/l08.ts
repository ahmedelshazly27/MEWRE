import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc06-l08",
  title: "Micro and macro for startups: market structure, moats, rates and funding cycles",
  summary:
    "The economics behind competitive advantage and the funding climate: market structures, economies of scale and learning curves, network effects and switching costs, when markets tip to winner-take-most, and how interest rates propagate into valuations and venture funding, including the Gulf peg context.",
  minutes: 75,
  objectives: [
    "Classify a market by structure and predict how prices and margins behave in it",
    "Quantify economies of scale and learning-curve cost declines",
    "Distinguish direct, indirect and data network effects from switching costs, and test claims of each",
    "State the conditions under which markets tip to winner-take-most",
    "Explain the mechanism from central bank rates to startup valuations and round sizes, including in pegged Gulf economies",
  ],
  concepts: [
    { id: "fc06.market-structure", name: "Market structure", description: "Perfect competition, monopolistic competition, oligopoly and monopoly differ in number of firms, differentiation and entry barriers, which set how far price can sit above marginal cost.", competency: "fc-finance" },
    { id: "fc06.economies-of-scale", name: "Economies of scale and learning curves", description: "Average cost falls with volume when fixed costs are high (AC = F/Q + c) and unit cost falls with cumulative output (Wright's law).", competency: "fc-finance", related: ["fc06.market-structure"] },
    { id: "fc06.network-effects", name: "Network effects", description: "A product becomes more valuable to each user as more users (direct) or more participants on the other side (indirect) join; data network effects are weaker and must be shown.", competency: "fc-finance", related: ["fc06.market-structure"] },
    { id: "fc06.switching-costs", name: "Switching costs and lock-in", description: "The cost to a customer of moving to an alternative (data, integration, retraining, re-validation, contracts), which lets an incumbent price above a rival without losing the customer.", competency: "fc-finance", related: ["fc06.retention"] },
    { id: "fc06.rates-and-venture", name: "Interest rates and venture funding cycles", description: "Higher rates raise discount rates, compress valuations of long-duration growth assets, close exit windows and slow LP commitments, reducing venture funding with a lag.", competency: "fc-finance", related: ["m10.wacc", "m10.npv"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Why some companies keep their margins",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Every investor asks "what's the moat?" and "why now?". The first is microeconomics: scale, network effects, switching costs. The second is partly macroeconomics: the cost of capital and where the funding cycle is. Afterwave's bench memory, Mizan's plant data and Suhail's two-sided community each create a different kind of advantage, and claiming the wrong one (for example a data network effect you cannot have, because Enclave keeps each customer's data private) costs credibility in a partner meeting.`,
        },
        {
          kind: "md",
          md: md`### Market structure in one table

| Structure | Firms | Product | Entry | Price vs marginal cost | Example close to your ventures |
|---|---|---|---|---|---|
| Perfect competition | Many | Identical | Free | $P = MC$, no economic profit | PV module cleaning labour in a mature market |
| Monopolistic competition | Many | Differentiated | Easy | $P > MC$, profits competed away over time | Event organisers, developer communities |
| Oligopoly | Few | Similar or differentiated | Hard | $P > MC$, strategic interaction (price wars or tacit restraint) | Test and measurement hardware vendors; utility-scale EPCs |
| Monopoly | One | No close substitute | Blocked | $P$ set by the Lerner condition | A regulated grid operator; a de facto standard tool |

Startups enter as differentiated challengers and try to build the barriers that move them up this table.

### Economies of scale`,
        },
        { kind: "equation", formula: "fc06-average-cost" },
        {
          kind: "md",
          md: md`Software and regulated hardware have large fixed costs $F$ (R&D, security certifications, functional safety work, integrations) and small variable costs $c$. Illustrative: a test-infrastructure platform with $F$ = EUR 3 m/yr and $c$ = EUR 15k per customer costs EUR 165k per customer at 20 customers, EUR 45k at 100 and EUR 21k at 500. The bigger player can profitably charge less: a force towards concentration.

### Learning curves`,
        },
        { kind: "equation", formula: "fc06-wright" },
        {
          kind: "md",
          md: md`With progress ratio $b$, each doubling of cumulative output multiplies unit cost by $b$. The exponent is $\log_2 b$: for $b = 0.85$, $\log_2 0.85 = -0.234$. Learning curves reward the first mover only if it keeps the volume lead, and they leak (suppliers, staff and published designs carry learning to competitors).

### Network effects`,
        },
        { kind: "equation", formula: "fc06-metcalfe" },
        {
          kind: "md",
          md: md`- **Direct:** each user benefits from more users of the same kind (messaging). Potential links grow as $n^2$; useful links grow much more slowly.
- **Indirect or two-sided:** each side benefits from the other side's size. Suhail is two-sided: builders want investors and employers present; investors, employers and sponsors want many good builders. The hard part is the **cold start**: subsidise the side that is harder to attract (usually by making it free).
- **Data network effects:** more usage produces data that improves the product for everyone. Real only if data from customer A improves the product for customer B, and the improvement keeps mattering. For Afterwave, Enclave keeps data on customer premises or in isolated tenants, so cross-customer pooling is contractually limited; the advantage is more honestly described as **per-customer switching cost** (bench memory) plus **know-how** that improves Ripple's models generically.

### Switching costs

A customer stays as long as the price premium over a rival is smaller than the cost of switching: data migration, integration, retraining, re-validation of test procedures, contract exit, and the risk of the move. For test infrastructure, years of synchronised bench data, test definitions and traceability records referenced in compliance files are a strong switching cost. Switching costs raise retention (higher NRR, lower churn) but buyers know this, so they demand open formats and exit clauses up front.`,
        },
        {
          kind: "matrix",
          title: "Where durable margins come from",
          xAxis: ["Low switching costs", "High switching costs"],
          yAxis: ["Weak network or scale effects", "Strong network or scale effects"],
          cells: [
            { label: "Platform that must keep winning", detail: "Users could leave but the network keeps them (marketplaces, communities). Suhail's goal: make the network the reason to stay." },
            { label: "Fortress", detail: "Network or scale effects plus lock-in: winner-take-most territory. Rare and valuable." },
            { label: "Commodity", detail: "Competes on price and service. Margins trend to cost. Avoid or differentiate." },
            { label: "Sticky niche", detail: "Each customer is locked in but there is no flywheel across customers: enterprise tools with deep integration. Afterwave's starting position." },
          ],
          caption: "Top row: strong network or scale effects. Bottom row: weak. Left: low switching costs. Right: high.",
        },
        {
          kind: "md",
          md: md`### When markets tip to winner-take-most

Markets concentrate when (1) network effects or scale economies are strong, (2) switching costs are high, (3) **multi-homing** is costly (customers do not easily use two providers at once), and (4) customers' needs are homogeneous. Break any one and multiple players survive: test teams in batteries and humanoids have different rigs and standards, which favours several specialised winners over one. Regulation can push either way: common data formats lower switching costs, while certification burdens raise fixed costs and favour scale.

### Macro: from central bank rates to your round

The value of a cash flow far in the future is very sensitive to the discount rate. For a growing perpetuity:`,
        },
        { kind: "equation", formula: "fc06-gordon" },
        {
          kind: "md",
          md: md`Startups are long-duration assets: most of their value is in cash flows ten or more years out, equivalent to a small $r - g$. When the risk-free rate rises, the discount rate rises and valuations of such assets fall the most. The chain, with lags:

1. **Rates up** raise the discount rate and the return available on safe assets.
2. **Public growth multiples compress**; IPO and M&A exit windows narrow.
3. **Late-stage valuations reset**, then growth rounds slow; crossover funds retreat.
4. **LPs** (pension funds, endowments, sovereign funds) slow new commitments to venture funds, partly because private holdings become a larger share of shrunken portfolios (the denominator effect).
5. **Seed and Series A** slow last and least, but round sizes, valuations and the bar for traction move.

The 2020 to 2023 cycle is the textbook case: the US federal funds target range sat at 0 to 0.25 % from March 2020 to March 2022, then rose to 5.25 to 5.50 % by July 2023; global venture funding peaked in 2021 and fell sharply in 2022 and 2023. The ECB moved its deposit rate from -0.50 % to 4.00 % over 2022 to 2023.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "US federal funds target range, upper bound at year end",
          xKey: "year",
          xLabel: "Year end",
          yLabel: "Upper bound (%)",
          series: [{ key: "ffr", label: "Federal funds target, upper bound" }],
          data: [
            { year: "2019", ffr: 1.75 },
            { year: "2020", ffr: 0.25 },
            { year: "2021", ffr: 0.25 },
            { year: "2022", ffr: 4.5 },
            { year: "2023", ffr: 5.5 },
            { year: "2024", ffr: 4.5 },
          ],
          caption: "Source: Federal Reserve FOMC decisions. The 2022 to 2023 hikes were the fastest in four decades and coincided with the venture downturn. Check the current rate on the Federal Reserve website before quoting it.",
        },
        {
          kind: "md",
          md: md`### The Gulf and Europe

- **Pegs:** the Saudi riyal and UAE dirham are pegged to the US dollar, so their policy rates broadly track the Fed. The Kuwaiti dinar has been pegged to an undisclosed basket of currencies since 2007, in which the dollar is understood to dominate; the Central Bank of Kuwait usually moves with the Fed but not always one for one. A Kuwaiti borrower's cost of money is therefore largely imported from Washington.
- **Sovereign capital:** Gulf venture activity is heavily shaped by state-linked funds and fund-of-funds programmes, which makes it partly counter-cyclical to US conditions but sensitive to oil revenues and policy priorities.
- **MENA venture data** (MAGNiTT): USD 3.8 bn across 688 deals in 2025 (+74 % year on year), then USD 1.35 bn across 214 deals in H1 2026 (-22 % year on year, deal count -41 %), with AI taking about half of H1 2026 funding. Wamda, using a different methodology, reported USD 7.5 bn for 2025. Data providers disagree: always quote the source and its definition.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Current rates and the latest funding data",
          md: md`Rate levels after 2024 and the H2 2026 MENA funding figures are not recorded in this course's research notes. Before quoting a current policy rate (Federal Reserve, ECB, SNB, Central Bank of Kuwait) or a current funding total, check the central bank's own website and the data provider's latest report. The MENA figures above come from MAGNiTT and Wamda reports as recorded in the course research brief (November 2026).`,
        },
        { kind: "sources", refs: ["fc06-r12", "fc06-r13", "fc06-r14", "fc06-r15", "fc06-r16", "fc06-r17", "fc06-r8", "fc06-r11", "fc06-r18"] },
      ],
    },
    {
      layer: "applied",
      title: "Moats and rates, in numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Why a 2-point rate rise hits a growth company harder (illustrative)",
          given: md`Illustrative. Two companies each expect free cash flow of EUR 1 m next year. A mature company grows at 2 %/yr forever; a growth company is approximated as growing at 6 %/yr forever. Discount rate rises from 10 % to 12 %.`,
          steps: [
            { md: md`**Mature, before:** $V = 1/(0.10-0.02) = 12.5$ EUR m. **After:** $1/(0.12-0.02) = 10.0$. Change **-20 %**.` },
            { md: md`**Growth, before:** $V = 1/(0.10-0.06) = 25.0$ EUR m. **After:** $1/(0.12-0.06) = 16.7$. Change **-33 %**.` },
            { md: md`**Mechanism:** sensitivity $\partial V/\partial r = -CF_1/(r-g)^2$, so in relative terms $-1/(r-g)$: at the margin about 12.5 % of value per percentage point of $r$ for the mature firm ($1/0.08$) and 25 % for the growth firm ($1/0.04$). Long-duration value is rate-sensitive.` },
            { md: md`**What it means for a founder:** in a rising-rate year, investors pay less for the same traction and ask for a shorter path to efficiency (burn multiple, default alive). Raise when you can, not when you must.` },
          ],
          result: md`The same 2-point rate rise cuts the growth company's value by a third and the mature company's by a fifth.`,
        },
        {
          kind: "worked",
          mode: "worked",
          title: "Afterwave competitive position: which moat, honestly (illustrative)",
          given: md`Qualitative assessment for a pitch, using the economics above. No customer data is assumed.`,
          steps: [
            { md: md`**Scale economies:** moderate. Security reviews, on-prem deployment tooling and integrations with data acquisition systems are fixed costs; each new customer makes the next deployment cheaper.` },
            { md: md`**Switching costs:** potentially high. Bench memory (synchronised rig signals and on-screen actions on one clock), test definitions and change-impact history in Ripple accumulate per customer and are referenced in validation and compliance files. Customers will ask for open export formats: offer them and win on workflow, not on hostage-taking.` },
            { md: md`**Network effects:** weak to none across customers, because data stays private in Enclave. Some generic learning (model architectures, change-impact heuristics) transfers without moving customer data. Do not claim a data network effect.` },
            { md: md`**Market structure:** the broader test and measurement market is an oligopoly of large hardware and software vendors; physical AI test infrastructure is a new niche. Different rig types and standards (robots, drives, batteries) limit winner-take-all; several specialised winners are likely.` },
          ],
          result: md`Pitch the moat as switching costs plus deployment know-how in a niche with regulatory timing (EU Machinery Regulation from 20 January 2027), not as a network effect.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Learning curve for Afterwave's own test platforms (illustrative)",
          given: md`Illustrative. The first instrumented test platform costs **EUR 200k** to build; progress ratio **0.85**.`,
          steps: [
            { md: md`Exponent: $\log_2 0.85 = -0.2345$.` },
            { md: md`Unit 4 (two doublings): $200\times 0.85^2 =$ **EUR 144.5k**.`, hidden: true, check: { prompt: "Cost of unit 4 (EUR k)", answer: 144.5, unit: "EUR k", tolerance: { abs: 0.1 } } },
            { md: md`Unit 8 (three doublings): $200\times 0.85^3 =$ **EUR 122.8k**.`, hidden: true, check: { prompt: "Cost of unit 8 (EUR k)", answer: 122.8, unit: "EUR k", tolerance: { abs: 0.1 } } },
            { md: md`Unit 20: $200\times 20^{-0.2345} = 200\times 0.4955 = 99.1$ EUR k. Halving the cost takes about 20 units: the first platforms should be priced on value, not on the cost of unit 1.` },
          ],
          result: md`Unit 8 costs about 61 % of unit 1. Price early platforms against the expected cost curve and the customer's value, and capture learning in documented build procedures.`,
        },
        {
          kind: "question",
          question: {
            id: "fc06-l08-p1",
            type: "numeric",
            prompt: md`A company's free cash flow next year is EUR 2 m, growing 8 %/yr indefinitely; the discount rate is 14 %. What is its Gordon value? (EUR m, 1 decimal)`,
            answer: 33.3,
            tolerance: { abs: 0.1 },
            unit: "EUR m",
            explanation: md`$V = 2/(0.14 - 0.08) = 33.3$ EUR m. At 15 % it would be $2/0.07 = 28.6$: one point of rate costs 14 % of value.`,
            concepts: ["fc06.rates-and-venture"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Using economics in strategy and fundraising",
      blocks: [
        {
          kind: "md",
          md: md`### How investors test a moat claim

| Claim | Evidence they will ask for |
|---|---|
| Network effect | A metric that improves for each user as the network grows (match rate, time to hire, sponsor ROI) and a cohort comparison |
| Data network effect | Proof that customer A's data improves outcomes for customer B, and that the improvement does not plateau early |
| Switching costs | Gross retention, renewal rates, the cost of a competitor displacing you (migration effort in weeks) |
| Scale economies | Unit cost or deployment time falling with customer count |
| Brand or community | Organic share of pipeline; retention of community members over seasons |

### Reading the funding climate

- Watch: policy rates and their expected path, public software multiples, IPO activity, late-stage round sizes, and reports from data providers (PitchBook, Crunchbase, MAGNiTT for MENA) with their methodology.
- In a tight market: raise smaller and earlier rounds on clear milestones, lengthen runway, prioritise efficiency metrics.
- In a loose market: raise more than you need if terms are clean; do not let a high valuation set a bar the next round cannot clear.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Claiming network effects for a tool with private data.** Investors check; the correction costs more than the claim gained.
- **Mistaking first-mover for moat.** Learning leaks; being first matters only if it compounds into scale, data or lock-in.
- **Ignoring multi-homing.** A community whose members also join three other communities has a weaker network effect than its size suggests.
- **Treating the funding climate as fixed.** A plan that only works if the next round closes at a higher valuation is a bet on macro, not on your company.`,
        },
        {
          kind: "ask",
          title: "Questions to ask yourself before writing the moat slide",
          items: [
            "Does each new customer make the product better for existing customers, or only for themselves?",
            "How many weeks would it take a competitor to migrate one of our customers, and what would they lose?",
            "Which fixed costs do we incur once that a new entrant must also incur?",
            "Can customers easily use two providers at once?",
            "What happens to our plan if rates rise two points and our next round is 30 % smaller?",
          ],
        },
        { kind: "xref", to: "m10.wacc", note: "How the cost of capital is built from the risk-free rate, risk premia and capital structure is covered in Track 0, Module 10." },
        {
          kind: "question",
          question: {
            id: "fc06-l08-p2",
            type: "short",
            prompt: md`Write a **one-page competitive dynamics memo** for one venture (Afterwave, Mizan or Suhail) for your investor data room: market structure today, which of scale economies, network effects (direct, indirect, data) and switching costs apply and how strongly, with one metric you will use to prove each; whether the market is likely to tip to winner-take-most and why; and how a two-point rise in interest rates would change your fundraising plan.`,
            rubric: [
              "Market structure is classified correctly with reasoning about number of firms, differentiation and entry barriers",
              "Each advantage type is assessed honestly, including saying 'weak' or 'none' where appropriate (for example no cross-customer data network effect for private on-prem data)",
              "A specific, measurable proof metric is given for each claimed advantage",
              "The winner-take-most assessment uses the tipping conditions (network or scale strength, switching costs, multi-homing, need homogeneity)",
              "The rate scenario links rates to valuation, round size or timing through the discount-rate mechanism and gives a concrete plan change",
              "No invented traction, customers or market numbers; uncertain facts flagged",
            ],
            modelAnswer: md`**Suhail competitive dynamics (illustrative).** **Structure:** monopolistic competition. Many communities, newsletters and event organisers serve Arab builders; differentiation is by language, quality of curation and who attends; entry is easy. **Network effects:** indirect, two-sided, potentially strong: builders join where investors and employers are; sponsors and employers pay where good builders are. Proof metric: share of hackathon finalists receiving an investor or employer meeting within 60 days, tracked per season. **Direct network effects:** moderate among builders (peer learning). Proof metric: returning participants across seasons. **Data network effects:** none today; the planned research arm (open-weight models, datasets, benchmarks) creates reputation, not a data flywheel. **Scale economies:** moderate: sponsorship sales, production of Suhail Season and The Majlis have fixed costs spread over more events. Proof metric: cost per attendee falling across events. **Switching costs:** low for builders (multi-homing is easy), moderate for sponsors with multi-season packages. **Tipping:** unlikely to winner-take-all, because builders multi-home and needs differ by country and language; more likely a few leading communities, so the strategy is to own a clear position (Arabic-first, research-linked, investor access) rather than be the largest. **Rates:** a two-point rise reduces investor activity in the region with a lag (MENA funding already fell 22 % year on year in H1 2026 per MAGNiTT), so sponsor budgets from VCs may shrink. Plan change: shift sponsorship mix towards employers and governments, sell multi-season packages before budgets tighten, and keep events break-even on ticket and employer revenue without investor sponsors.`,
            explanation: md`Graded against the rubric. Honesty about weak advantages is what makes the strong ones believable.`,
            concepts: ["fc06.market-structure", "fc06.network-effects", "fc06.switching-costs", "fc06.rates-and-venture"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a Suhail volunteer lead why a decision by the US Federal Reserve can shrink the sponsorship budgets of Gulf investors two years later.",
          keyPoints: [
            "Higher rates raise the discount rate, so long-duration growth assets lose more value",
            "Public multiples fall and exit windows close, so late-stage rounds reset first",
            "LPs commit less to new venture funds, so funds raise less and invest more slowly",
            "Gulf currencies are pegged (USD for Saudi Arabia and the UAE, a USD-dominated basket for Kuwait), so local rates largely follow the Fed",
            "Investors cut discretionary spending such as event sponsorship when their own fundraising slows",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "fc06-l08-q1",
      type: "numeric",
      prompt: md`Fixed cost EUR 2 m/yr, variable cost EUR 10k per customer. Average cost per customer at 50 customers? (EUR k)`,
      answer: 50,
      tolerance: { abs: 0.1 },
      unit: "EUR k",
      explanation: md`$AC = 2{,}000/50 + 10 = 40 + 10 = 50$ EUR k. At 200 customers it is $10 + 10 = 20$.`,
      concepts: ["fc06.economies-of-scale"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc06-l08-q2",
      type: "mcq",
      prompt: "Afterwave Enclave keeps each customer's data on its own servers. Which advantage can it most credibly claim?",
      options: [
        "A strong cross-customer data network effect",
        "Per-customer switching costs from accumulated bench memory and integrations",
        "A direct network effect between test engineers at different companies",
        "Perfect competition",
      ],
      answer: 1,
      explanation: md`Private data cannot pool across customers, so the data network effect is weak. Accumulated, synchronised test data and integrations create switching costs.`,
      concepts: ["fc06.switching-costs", "fc06.network-effects"],
      difficulty: 1,
    },
    {
      id: "fc06-l08-q3",
      type: "multi",
      prompt: "Which conditions push a market towards winner-take-most? (Select all.)",
      options: [
        "Strong network effects or scale economies",
        "High switching costs",
        "Cheap and common multi-homing",
        "Homogeneous customer needs",
        "Many differentiated niches with different standards",
      ],
      answer: [0, 1, 3],
      explanation: md`Easy multi-homing and heterogeneous needs both allow several players to survive.`,
      concepts: ["fc06.market-structure", "fc06.network-effects"],
      difficulty: 2,
    },
    {
      id: "fc06-l08-q4",
      type: "numeric",
      prompt: md`Wright's law with progress ratio 0.80; the first unit costs EUR 100k. Cost of unit 16? (EUR k, 1 decimal)`,
      answer: 41,
      tolerance: { abs: 0.1 },
      unit: "EUR k",
      explanation: md`16 is four doublings: $100\times 0.8^4 = 40.96$ EUR k.`,
      concepts: ["fc06.economies-of-scale"],
      difficulty: 1,
    },
    {
      id: "fc06-l08-q5",
      type: "order",
      prompt: "Order the typical transmission of a rate-hiking cycle into startup funding (first to last).",
      items: [
        "Policy rates and discount rates rise",
        "Public growth multiples compress and exit windows narrow",
        "Late-stage and growth rounds reset",
        "LPs slow commitments to new venture funds",
        "Seed and Series A terms tighten",
      ],
      explanation: md`Public markets reprice first; private late stage follows; fund formation slows; early stage moves last and least.`,
      concepts: ["fc06.rates-and-venture"],
      difficulty: 2,
    },
    {
      id: "fc06-l08-q6",
      type: "mcq",
      prompt: "Why do Kuwaiti interest rates largely follow US rates?",
      options: [
        "Kuwait uses the US dollar as legal tender",
        "The Kuwaiti dinar is pegged to an undisclosed currency basket in which the US dollar is understood to dominate, so the central bank cannot diverge far from US rates without pressure on the peg",
        "The Federal Reserve sets Kuwait's rates",
        "They do not; Kuwaiti rates are independent",
      ],
      answer: 1,
      explanation: md`A peg imports the anchor's monetary policy. With a basket the link is looser than the riyal's or dirham's direct dollar peg, which is why the Central Bank of Kuwait does not always move one for one.`,
      concepts: ["fc06.rates-and-venture"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "fc06-l08-f1", front: "Average cost with fixed and variable cost", back: md`$AC = F/Q + c$: falls towards $c$ as volume grows.`, concepts: ["fc06.economies-of-scale"] },
    { id: "fc06-l08-f2", front: "Wright's law", back: md`$C_n = C_1 n^{\log_2 b}$: cost multiplies by $b$ per doubling of cumulative output.`, concepts: ["fc06.economies-of-scale"] },
    { id: "fc06-l08-f3", front: "Direct vs indirect network effects", back: "Direct: value rises with users of the same kind. Indirect (two-sided): value rises with participants on the other side.", concepts: ["fc06.network-effects"] },
    { id: "fc06-l08-f4", front: "Test for a data network effect", back: "Does customer A's data improve outcomes for customer B, without plateauing early?", concepts: ["fc06.network-effects"] },
    { id: "fc06-l08-f5", front: "Gordon value and rate sensitivity", back: md`$V = CF_1/(r-g)$; relative sensitivity $-1/(r-g)$ per unit of $r$: long-duration assets are most rate-sensitive.`, concepts: ["fc06.rates-and-venture"] },
    { id: "fc06-l08-f6", front: "Fed funds target 2020 to 2023", back: "0 to 0.25 % from March 2020 to March 2022; 5.25 to 5.50 % by July 2023.", concepts: ["fc06.rates-and-venture"] },
    { id: "fc06-l08-f7", front: "Four tipping conditions", back: "Strong network or scale effects, high switching costs, costly multi-homing, homogeneous needs.", concepts: ["fc06.market-structure"] },
  ],
};

export default lesson;
