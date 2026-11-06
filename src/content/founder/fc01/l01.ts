import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc01-l01",
  title: "How venture-scale companies work: power laws, growth and default alive",
  summary:
    "Why venture returns follow a power law, what that forces a VC to look for (fund-returners), how weekly and monthly growth rates compound, and the arithmetic that tells you whether a company is default alive or default dead on its current cash.",
  minutes: 75,
  objectives: [
    "Explain why one company usually returns most of a venture fund and what that implies for which companies VCs back",
    "Compute the exit value a company needs to return a fund, given fund size, entry ownership and later dilution",
    "Convert weekly and monthly growth rates to annual multiples and doubling times",
    "Decide whether a company is default alive by computing the month it breaks even and the cash it burns to get there",
    "Judge whether a venture is venture-scale or better financed another way",
  ],
  concepts: [
    { id: "fc01.power-law", name: "Power-law returns", description: "Venture outcomes are extremely skewed: most investments return little or nothing and a few return many times the fund.", competency: "fc-fundamentals", related: ["fc01.fund-returner", "fc01.venture-scale"] },
    { id: "fc01.fund-returner", name: "Fund-returner", description: "A single portfolio company whose exit, at the investor's diluted ownership, returns the whole fund; the outcome every new investment must plausibly be able to reach.", competency: "fc-fundamentals", related: ["fc01.power-law", "fc01.venture-scale"] },
    { id: "fc01.growth-rate", name: "Growth rate and compounding", description: "Revenue or usage growth per week or month; compounding turns small differences in rate into large differences in outcome.", competency: "fc-fundamentals", related: ["fc01.default-alive", "m10.time-value"] },
    { id: "fc01.default-alive", name: "Default alive vs default dead", description: "Whether a company reaches profitability on its current cash if expenses stay as planned and revenue keeps growing at its recent rate.", competency: "fc-fundamentals", related: ["fc01.growth-rate"] },
    { id: "fc01.venture-scale", name: "Venture-scale business", description: "A business that can plausibly grow to a large exit (hundreds of millions to billions) fast enough to fit a VC fund's life; many good businesses are not venture-scale.", competency: "fc-fundamentals", related: ["fc01.power-law", "fc01.fund-returner"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "The power law, the fund-returner and growth arithmetic",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You are about to pitch Afterwave to investors (YC W27, possibly Zurich funds) while also running Mizan and Suhail. Every investor conversation is shaped by one piece of arithmetic you cannot see from the founder's chair: how their fund makes money. If you understand it you can tell which of your ventures should raise venture capital at all, what a VC needs to believe to say yes, and why "are you default alive?" is the most useful question you can ask about your own company every month.`,
        },
        {
          kind: "md",
          md: md`### Venture returns are a power law, not a bell curve

In most of finance outcomes cluster around an average. In venture capital they do not. A seed fund that makes 30 investments typically sees about half of them return nothing, a handful return roughly their money, and one or two return 20x to 100x. The best single company usually returns more than all the others combined.

The mechanism is not luck alone. Software and data businesses have **increasing returns**: near-zero marginal cost per extra customer, network effects, data that improves the product, and switching costs that rise with use. Those forces let the winner in a category take most of the value, so the distribution of company outcomes (and therefore of investor returns) has a fat right tail. A power law means the probability of an outcome at least $x$ times larger falls off like $x^{-\alpha}$, not exponentially; extreme outcomes are rare but not negligible, and they dominate the sum.

Published studies point the same way, though exact figures differ by dataset and period: analyses of tens of thousands of US venture financings have reported that a majority of investments return less than 1x and that a few percent of deals (those returning 10x or more) produce well over half of all returns. Treat the specific percentages in the callout below as indicative.

### Illustrative 30-company seed portfolio

Equal cheques of 1 unit each, outcomes grouped by multiple:

| Outcome | Companies | Multiple each | Returned |
|---|---|---|---|
| Write-off | 15 | 0x | 0 |
| Partial loss | 6 | 0.5x | 3 |
| Modest win | 5 | 2x | 10 |
| Good win | 2 | 5x | 10 |
| Big win | 1 | 20x | 20 |
| Fund-returner | 1 | 60x | 60 |
| **Total** | **30** | | **103** |

Gross multiple $= 103/30 = 3.43$x. Remove the single 60x company and the fund returns $43/30 = 1.43$x, which after fees and the time value of money is a poor fund. **One company is the difference between a top fund and a failed one.** That is the whole logic of venture capital.`,
        },
        {
          kind: "chart",
          chart: "bar",
          title: "Share of companies vs share of returns (illustrative seed portfolio)",
          xKey: "bucket",
          xLabel: "Outcome bucket",
          yLabel: "% of total",
          series: [
            { key: "deals", label: "Share of companies (%)" },
            { key: "returns", label: "Share of money returned (%)" },
          ],
          data: [
            { bucket: "0x", deals: 50, returns: 0 },
            { bucket: "0.5x", deals: 20, returns: 2.9 },
            { bucket: "2x", deals: 16.7, returns: 9.7 },
            { bucket: "5x", deals: 6.7, returns: 9.7 },
            { bucket: "20x", deals: 3.3, returns: 19.4 },
            { bucket: "60x", deals: 3.3, returns: 58.3 },
          ],
          caption: "Half the companies return nothing; 3.3% of the companies (one company) return 58% of the money. Illustrative numbers built to match the shape reported in venture return studies.",
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Return-distribution statistics vary by source",
          md: md`Commonly cited figures include: about 65% of venture financings returning less than 1x and about 4% returning 10x or more (Correlation Ventures analysis of roughly 21,000 US financings, 2004 to 2013), and roughly 6% of deals producing about 60% of returns in Horsley Bridge data (as summarised by Benedict Evans in 2016). These come from secondary summaries and could not be checked against the original datasets for this course. Use them as "the shape", not as precise numbers, and cite the original if you quote them to an investor.`,
        },
        {
          kind: "md",
          md: md`### What the power law forces a VC to do

Because the fund's result depends on one or two outliers, **every investment must be able to become the outlier**. A VC does not ask "is this a good business?" but "if everything goes right, can this company return my fund?". The quantity behind that question is the **fund-returner exit value**:`,
        },
        { kind: "equation", formula: "fc01-fund-returner" },
        {
          kind: "md",
          md: md`The investor's ownership at exit is lower than at entry because later rounds dilute it (unless the investor pays pro-rata to keep its stake):`,
        },
        { kind: "equation", formula: "fc01-ownership-dilution" },
        {
          kind: "md",
          md: md`**Example.** A EUR 50 m seed fund buys 10% at seed. Series A, B and C dilute it by 20%, 15% and 10%: $o_{exit} = 0.10\times0.80\times0.85\times0.90 = 6.12\%$. To return the fund the company must exit at $50/0.0612 = $ **EUR 817 m**. A fund that wants 3x net needs roughly 3.5 to 4x gross, so it needs several such outcomes or one much larger one. This is why a seed investor passes on a company that can "only" become a EUR 100 m business: even a perfect outcome returns 12% of the fund.

Three consequences you will see in every pitch meeting:

1. **Market size matters more than current traction.** The ceiling decides whether the bet is worth taking (Lesson 3 shows how to size it bottom-up).
2. **Speed matters.** A fund has a life of about 10 years (often extended to 12). An outcome that arrives in year 18 does not help it. Growth rate is the proxy for whether the outcome can arrive in time.
3. **VCs accept high failure risk but not low ceilings.** "Probably works, small" loses to "probably fails, huge". This is rational for them and often wrong for you: your personal portfolio has one or a few companies, not 30.

### Growth rate: the number that compounds

Paul Graham's definition of a startup is a company designed to grow fast. Growth is measured per period and compounds:`,
        },
        { kind: "equation", formula: "fc01-compound-growth" },
        { kind: "equation", formula: "fc01-doubling-time" },
        {
          kind: "md",
          md: md`| Growth per period | Per year | Doubling time |
|---|---|---|
| 1% per week | $1.01^{52} = 1.68$x | 70 weeks |
| 5% per week | $1.05^{52} = 12.6$x | 14.2 weeks |
| 7% per week | $1.07^{52} = 33.7$x | 10.2 weeks |
| 5% per month | $1.05^{12} = 1.80$x | 14.2 months |
| 10% per month | $1.10^{12} = 3.14$x | 7.3 months |
| 15% per month | $1.15^{12} = 5.35$x | 5.0 months |
| 20% per month | $1.20^{12} = 8.92$x | 3.8 months |

At YC, Graham described 5 to 7% a week as a good growth rate during the batch, 10% a week as exceptional and 1% a week as a sign the company has not yet found what works. Those benchmarks fit consumer and self-serve products measured weekly. For enterprise B2B with six- to twelve-month sales cycles, such as Afterwave, revenue moves in steps; measure the leading indicators (qualified pipeline, pilots started, pilots converted) weekly and revenue monthly or quarterly. A well-known later-stage SaaS benchmark is **T2D3**: triple, triple, double, double, double annual revenue, which is $3\times3\times2\times2\times2 = 72$x in five years.

### Default alive or default dead

Graham's second key essay asks a sharper question: **if nothing changes (expenses as planned, revenue growing at its recent rate), does the company reach profitability before the cash runs out?** If yes it is default alive; if no it is default dead and must raise money, cut costs or grow faster.

Runway is the naive version:`,
        },
        { kind: "equation", formula: "fc01-net-burn-runway" },
        {
          kind: "md",
          md: md`Runway ignores growth. Default alive includes it. With constant expenses $E$ and revenue $R_0$ growing at $g$ per month, revenue reaches expenses after`,
        },
        { kind: "equation", formula: "fc01-breakeven-month" },
        {
          kind: "md",
          md: md`and the cash consumed until then is the sum of each month's net burn, a geometric series:`,
        },
        { kind: "equation", formula: "fc01-cash-to-breakeven" },
        {
          kind: "md",
          md: md`with $n = \lceil n^{*} \rceil$. **Default alive** if $B_{cum} \le C$ (cash in the bank). The result is very sensitive to $g$, because $g$ sits in an exponent. Two traps: expenses rarely stay flat (every hire raises $E$), and recent growth rates rarely persist. Run the test with the hiring plan you actually intend and with a growth rate you can defend.`,
        },
        {
          kind: "widget",
          widget: "unit-economics",
          props: { cash: 600000, burn: 45000 },
          caption: "Set cash, monthly burn and revenue growth. Watch the default-alive verdict flip as growth moves a few points around 7% per month.",
        },
        {
          kind: "md",
          md: md`### Venture-scale or not

A business is **venture-scale** when three things hold at once: a market large enough that a winner can be worth hundreds of millions to billions; a mechanism that lets one company grow much faster than costs (software margins, network or data effects, repeatable sales); and a timeline that fits a fund. Many excellent businesses fail one test: a regional services firm, a distributor, an events business. They should be financed with revenue, debt, grants or strategic partners, not VC. Raising VC for them sets a growth expectation the business cannot meet, and the investors' preference for a big outcome then works against you.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Default alive with illustrative Afterwave numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Is a 3-person pre-seed team default alive?",
          given: md`Illustrative numbers, not Afterwave's actual financials: cash EUR 600k; expenses EUR 45k/month (three founders on modest salaries, cloud, travel to customer sites); current revenue EUR 8k/month from paid pilots; revenue has grown about 10% per month over the last two quarters; no new hires planned.`,
          steps: [
            { md: md`**Net burn and naive runway:** $B = 45 - 8 = 37$ k/month; runway $= 600/37 = 16.2$ months. This is what most founders quote.` },
            { md: md`**Break-even month:** $n^{*} = \ln(45/8)/\ln(1.10) = 1.7272/0.09531 = 18.12$, so revenue exceeds expenses in month 19.` },
            { md: md`**Cash burned to break-even** ($n = 19$): $B_{cum} = 19\times45 - 8\times(1.10^{19}-1)/0.10 = 855 - 8\times(6.1159-1)/0.10 = 855 - 409.3 = 445.7$ k.` },
            { md: md`**Verdict at 10%/month:** $445.7 < 600$, so default alive with about EUR 154k left at break-even. The naive runway (16.2 months) said the company would be out of money before month 19; growth changes the answer.` },
            { md: md`**Sensitivity to growth** (same model): at 8%/month break-even comes in month 23 with EUR 52k left (alive, barely); at 5%/month the company needs EUR 853k and is **dead in month 19**. The threshold is about 7.3%/month.` },
            { md: md`**Sensitivity to the hiring plan:** keep 10%/month revenue growth but let expenses rise 2%/month (one engineer added over the year): the company runs out of cash in month 19, before break-even. Default dead.` },
          ],
          result: md`At the stated assumptions the company is default alive, but the margin is thin: a 3-point drop in growth or a modest hiring plan flips it to default dead. The honest board-level statement is "default alive only if growth stays above about 7% per month and we do not hire; we will decide on the raise by month 9".`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Fund-returner test for a Zurich seed fund",
          given: md`Illustrative: a CHF 80 m seed fund considers leading Afterwave's seed and buying 12%. It expects dilution of 20% at Series A and 15% at Series B, and no further rounds before exit.`,
          steps: [
            { md: md`Ownership at exit $o_{exit} = 0.12\times0.80\times0.85$.` },
            { md: md`$o_{exit} = 8.16\%$.`, hidden: true, check: { prompt: "Ownership at exit (%)", answer: 8.16, unit: "%", tolerance: { abs: 0.02 } } },
            { md: md`Fund-returner exit value $V = F/o_{exit} = 80/0.0816$.` },
            { md: md`$V \approx$ CHF 980 m.`, hidden: true, check: { prompt: "Exit value to return the fund (CHF m)", answer: 980, unit: "CHF m", tolerance: { rel: 0.01 } } },
            { md: md`If physical-AI infrastructure companies are acquired or listed at about 8x forward revenue (illustrative multiple), the company needs about CHF 980/8 = CHF 122 m of revenue at exit to be a fund-returner.` },
          ],
          result: md`The partner must believe Afterwave can reach roughly CHF 1 bn in value, which at an 8x multiple means more than CHF 100 m of annual revenue. Your market-sizing slide (Lesson 3) has to make that ceiling credible.`,
        },
        {
          kind: "question",
          question: {
            id: "fc01-l01-p1",
            type: "numeric",
            prompt: md`A company has EUR 900k in the bank, expenses of EUR 60k/month (held flat) and revenue of EUR 15k/month growing 8% per month. How much cash (EUR k) does it burn before revenue first meets or exceeds expenses? Use whole months: count every month in which revenue is still below expenses.`,
            answer: 518.3,
            tolerance: { abs: 3 },
            unit: "EUR k",
            explanation: md`$n^{*} = \ln(60/15)/\ln(1.08) = 1.3863/0.07696 = 18.01$, so the company burns in $n = 19$ months (months 0 to 18; revenue in month 18 is $15\times1.08^{18} = 59.94$, still just below 60). The revenue terms form a geometric series of 19 terms: $B_{cum} = 19\times60 - 15\times(1.08^{19}-1)/0.08 = 1{,}140 - 15\times(4.3157-1)/0.08 = 1{,}140 - 621.7 = 518.3$ k. With EUR 900k in the bank the company is default alive with about EUR 382k to spare, even though naive runway is only $900/45 = 20$ months.`,
            concepts: ["fc01.default-alive", "fc01.growth-rate"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Using default alive and fund math in practice",
      blocks: [
        {
          kind: "md",
          md: md`### Who does this and how

- **The CEO owns the model.** In your ventures that is you: a monthly spreadsheet with cash, expenses by line, revenue by customer, and three rows that matter: net burn, runway and default-alive month. Trevor Blackwell's default-alive calculator (linked from Graham's essay) is the minimal version; a real model adds the hiring plan and committed contracts.
- **Investors run the mirror image.** Before a partner meeting an associate builds the fund-returner check: ownership after dilution, the exit needed, and comparable exits in the category. Ask yourself the same question before they do.
- **Board and investor updates** report the same three rows every month. Founders who report runway without growth hide the real question; founders who report default alive with the assumptions written down earn trust.

### What goes wrong`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Classic errors",
          md: md`- **Gross vs net burn:** runway uses net burn (expenses minus revenue), but if revenue is one pilot that might not renew, use gross burn as the stress case.
- **Counting money you do not have:** "runway including the round we are raising" is not runway.
- **Flat expenses forever:** the hiring plan you will execute after raising is part of the model.
- **Extrapolating a lucky quarter:** a 25%/month rate from one large pilot is not a growth rate. Use a trailing 3 to 6 month average and show the range.
- **Raising VC for a non-venture business:** the growth expectation follows the money. If the honest ceiling is EUR 50 m, finance it differently.
- **Starting the raise too late:** a round takes 3 to 6 months from first meeting to cash. With less than 6 months of runway you negotiate from weakness.`,
        },
        {
          kind: "checklist",
          title: "Monthly founder check (each venture)",
          items: [
            "Cash in bank today, from the bank statement, not the forecast",
            "Gross burn, revenue, net burn for the last 3 months",
            "Trailing 3-month and 6-month revenue growth rate per month",
            "Break-even month and cash at break-even under the planned hiring",
            "Growth rate at which the verdict flips (the threshold)",
            "Date by which a raise must start if default dead (runway minus 6 months)",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask an investor (they reveal their fund math)",
          items: [
            "What is your fund size, and how many companies do you plan to back from it?",
            "What ownership do you target at entry, and do you reserve for pro-rata in later rounds?",
            "What would this company need to be worth for it to matter to your fund?",
            "Which exits in physical AI or test infrastructure do you use as comparables?",
          ],
        },
        { kind: "scenario", scenario: "fc01-s1" },
        {
          kind: "question",
          question: {
            id: "fc01-l01-p2",
            type: "short",
            prompt: md`Produce the "cash and runway" section of Afterwave's next monthly investor update. Use your real current numbers if you have them; otherwise use clearly labelled assumptions. It must state cash, gross and net burn, runway, whether the company is default alive (with the break-even month and the growth threshold), and the decision you are taking because of it. Maximum 200 words plus a small table.`,
            rubric: [
              "States cash, gross burn, revenue and net burn for the current month, with units and a date",
              "Computes naive runway correctly as cash divided by net burn",
              "Gives a default-alive verdict with break-even month and cash at break-even, using a stated growth rate and the planned hiring",
              "Names the growth threshold (or cost level) at which the verdict flips",
              "Labels assumptions and illustrative numbers clearly and does not invent customers or revenue",
              "Ends with a concrete decision and date (raise start, hire freeze, price change)",
            ],
            modelAnswer: md`**Cash and runway, 31 Oct 2026 (illustrative numbers, replace with actuals)**

| | EUR k |
|---|---|
| Cash in bank | 600 |
| Gross burn (Oct) | 45 |
| Revenue (Oct, 2 paid pilots) | 8 |
| Net burn | 37 |
| Naive runway | 16.2 months |

Revenue has grown about 10% per month over the trailing six months (two pilots expanded scope; no new logos yet). With expenses held at EUR 45k and that growth, revenue covers expenses in month 19 (May 2028) with about EUR 154k left: **default alive, narrowly**. The verdict flips to default dead below about 7.3% monthly growth, or if we add one engineer (expenses +2%/month).

**Decision:** we will not hire before the seed. We start seed conversations in January 2027 so that we close with at least 9 months of runway left, and we track pilot-to-annual-contract conversion weekly as the leading indicator of the growth rate.`,
            explanation: md`A strong update separates facts (cash, burn) from model outputs (break-even month), states the growth threshold so the reader can judge the risk, and ends with a decision. Investors read the trend across months: consistency of format matters as much as any single number.`,
            concepts: ["fc01.default-alive", "fc01.growth-rate"],
            difficulty: 2,
          },
        },
        { kind: "sources", refs: ["fc01-r1", "fc01-r2", "fc01-r4", "fc01-r12", "fc01-r13", "fc01-r14"] },
        {
          kind: "feynman",
          prompt: "Explain to Ismail and Yusuf, in plain language, why a VC might pass on a profitable EUR 30 m business but invest in a company that will probably fail.",
          keyPoints: [
            "Venture returns follow a power law: one or two companies return most of a fund",
            "So every investment must be able to return the fund on its own (fund-returner test)",
            "Fund-returner exit = fund size divided by ownership at exit after dilution",
            "A EUR 30 m outcome at 6 to 10% ownership returns a small fraction of a typical fund",
            "Founders hold a concentrated portfolio, so their own risk preference can rationally differ from the VC's",
          ],
        },
        { kind: "xref", to: "m10-l01", note: "Discounting, NPV and IRR: the time value of money behind why a fund needs outcomes inside its 10-year life." },
      ],
    },
  ],
  quiz: [
    {
      id: "fc01-l01-q1",
      type: "numeric",
      prompt: md`A EUR 120 m Series A fund buys 15% of a company. It expects 25% dilution at Series B and 20% at Series C before exit. What exit value (EUR m) returns the fund?`,
      answer: 1333.3,
      tolerance: { rel: 0.01 },
      unit: "EUR m",
      explanation: md`$o_{exit} = 0.15\times0.75\times0.80 = 0.09$. $V = 120/0.09 = 1{,}333$ EUR m. A Series A fund of this size needs a unicorn-scale outcome from each company it backs.`,
      concepts: ["fc01.fund-returner"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "fc01-l01-q2",
      type: "numeric",
      prompt: md`Weekly growth of 3% compounds to what annual multiple? (2 decimals)`,
      answer: 4.65,
      tolerance: { abs: 0.03 },
      unit: "x",
      explanation: md`$1.03^{52} = e^{52\ln1.03} = e^{1.5370} = 4.65$x. Small weekly differences matter: 5% a week gives 12.6x.`,
      concepts: ["fc01.growth-rate"],
      difficulty: 1,
    },
    {
      id: "fc01-l01-q3",
      type: "mcq",
      prompt: "In the illustrative 30-company portfolio, the fund returns 3.43x gross. What happens if the single 60x company is removed?",
      options: [
        "It falls to about 3.4x: one company out of 30 barely matters",
        "It falls to about 2.4x",
        "It falls to about 1.43x, a poor fund after fees",
        "It falls below 1x",
      ],
      answer: 2,
      explanation: md`$(103-60)/30 = 1.43$x. One company carries 58% of the returns: the defining property of a power-law portfolio.`,
      concepts: ["fc01.power-law"],
      difficulty: 1,
    },
    {
      id: "fc01-l01-q4",
      type: "multi",
      prompt: "Which statements about default alive are correct? (Select all that apply.)",
      options: [
        "It asks whether the company reaches profitability on current cash at its recent growth rate and planned expenses",
        "A company with 20 months of runway is always default alive",
        "A company with 10 months of runway can be default alive if revenue growth is high enough",
        "Adding planned hires to the expense line can flip a company from alive to dead",
        "It is the same as runway",
      ],
      answer: [0, 2, 3],
      explanation: md`Runway (cash/net burn) ignores growth; default alive includes it. Long runway with no growth can still be default dead (break-even never arrives); short runway with steep growth can be alive. Expense growth raises the bar.`,
      concepts: ["fc01.default-alive"],
      difficulty: 1,
    },
    {
      id: "fc01-l01-q5",
      type: "numeric",
      prompt: md`Revenue is EUR 10k/month and expenses EUR 40k/month (flat). At 12% monthly revenue growth, in how many months (2 decimals, continuous) does revenue reach expenses?`,
      answer: 12.23,
      tolerance: { abs: 0.03 },
      unit: "months",
      explanation: md`$n^{*} = \ln(40/10)/\ln(1.12) = 1.3863/0.11333 = 12.23$ months, so break-even falls in month 13.`,
      concepts: ["fc01.default-alive", "fc01.growth-rate"],
      difficulty: 1,
    },
    {
      id: "fc01-l01-q6",
      type: "decision",
      prompt: md`Suhail could raise a USD 1 m "venture" round from a regional angel group to fund events and a newsletter. Its realistic ceiling as an events and media business is a few million dollars of annual revenue. What do you do?`,
      options: [
        { text: "Take the round: money is money and the brand will grow.", score: 0, feedback: "Venture money carries a venture growth expectation. The investors need an outcome Suhail cannot plausibly produce, which creates pressure to pivot or over-spend." },
        { text: "Finance Suhail with sponsorship, grants and partners, and offer the angels sponsorship or a revenue-share instead of equity; keep venture equity for Afterwave.", score: 1, feedback: "Matches the instrument to the business. A sponsorship-funded ecosystem can be valuable without pretending to be a venture-scale company." },
        { text: "Take the round but promise a pivot to a SaaS product to make the numbers work.", score: 0.2, feedback: "Changing the business to fit the funding source rather than the market is a known path to failure." },
      ],
      explanation: md`Venture-scale is a property of the business, not a label. Suhail's planned research arm or a later product might change the picture; today the honest instrument is non-dilutive or revenue-based.`,
      concepts: ["fc01.venture-scale", "fc01.fund-returner"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "fc01-l01-f1", front: "Fund-returner exit value", back: md`$V = F/o_{exit}$: fund size divided by the investor's ownership at exit after dilution.`, concepts: ["fc01.fund-returner"] },
    { id: "fc01-l01-f2", front: "Power-law portfolio: what share of returns does the best company usually generate?", back: "Often more than all other companies combined (about 58% in the illustrative 30-company portfolio).", concepts: ["fc01.power-law"] },
    { id: "fc01-l01-f3", front: "5% per week and 10% per month as annual multiples", back: md`$1.05^{52} = 12.6$x; $1.10^{12} = 3.14$x.`, concepts: ["fc01.growth-rate"] },
    { id: "fc01-l01-f4", front: "Doubling time formula", back: md`$t_d = \ln2/\ln(1+g)$; 10%/month doubles in 7.3 months.`, concepts: ["fc01.growth-rate"] },
    { id: "fc01-l01-f5", front: "Default alive (definition)", back: "On current cash, planned expenses and recent growth, the company reaches profitability before the money runs out.", concepts: ["fc01.default-alive"] },
    { id: "fc01-l01-f6", front: "Runway vs default alive", back: "Runway = cash / net burn and ignores growth; default alive includes revenue growth and the hiring plan.", concepts: ["fc01.default-alive"] },
    { id: "fc01-l01-f7", front: "T2D3", back: "Later-stage SaaS benchmark: triple, triple, double, double, double annual revenue = 72x in five years.", concepts: ["fc01.growth-rate"] },
  ],
  scenarios: [
    {
      id: "fc01-s1",
      title: "The investor asks: are you default alive?",
      dayInLife: true,
      context: md`You are 20 minutes into a first call with a partner at a European seed fund about Afterwave. The illustrative numbers from the worked example apply: EUR 600k cash, EUR 45k gross burn, EUR 8k revenue growing about 10% per month. She asks: "Are you default alive?"`,
      start: "a",
      concepts: ["fc01.default-alive", "fc01.fund-returner", "fc01.growth-rate"],
      nodes: {
        a: {
          md: md`How do you answer?`,
          choices: [
            { text: "\"Yes, we have 16 months of runway.\"", score: 2, feedback: "That answers a different question. She will notice that runway ignores growth, and that 16 months does not reach break-even in month 19.", next: "b" },
            { text: "\"Narrowly yes: at our trailing 10% monthly growth and flat costs we break even in month 19 with about EUR 150k left. Below about 7% growth, or if we hire, we are default dead, which is why we are raising.\"", score: 10, feedback: "Precise, honest about the threshold, and turns the answer into the reason for the round.", next: "c" },
            { text: "\"We do not think about profitability yet; we are focused on growth.\"", score: 1, feedback: "Signals that you do not know your own numbers. Investors fund founders who control their cash.", next: "b" },
          ],
        },
        b: {
          md: md`She follows up: "What growth rate do you need to be default alive, and what happens to it if you hire the two engineers in your plan?"`,
          choices: [
            { text: "Work it through live: threshold about 7.3% per month at flat costs; with the hires the company is default dead, so the seed must fund the gap to break-even plus a buffer.", score: 8, feedback: "Recovers well by showing the mechanism and connecting it to the size of the raise.", next: "c" },
            { text: "Promise to send the model after the call.", score: 4, feedback: "Acceptable, but you lose the moment. Know the threshold before the meeting.", next: "c" },
          ],
        },
        c: {
          md: md`She asks: "If everything goes right, how big can this get?"`,
          choices: [
            { text: "Give a bottom-up ceiling: number of hardware test teams in the target segments times annual contract value, the path to more than EUR 100 m revenue, and why that clears her fund-returner bar.", score: 10, feedback: "You answered the question behind the question: can this company return her fund?" },
            { text: "Quote a top-down market report: \"the test and measurement market is worth tens of billions\".", score: 3, feedback: "Top-down numbers do not show who buys, at what price. She will discount it heavily." },
          ],
        },
      },
    },
  ],
};

export default lesson;
