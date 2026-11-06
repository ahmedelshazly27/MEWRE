import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc08-l02",
  title: "SAFEs and convertible notes",
  summary:
    "How post-money and pre-money SAFEs convert, what caps, discounts and MFN clauses do, how convertible notes and European convertible loans differ, and the exact conversion of the YC standard deal into a seed round.",
  minutes: 75,
  objectives: [
    "Explain what a SAFE is and what happens at a priced round, an exit or a dissolution",
    "Compute conversion price and shares for a capped, discounted or MFN SAFE",
    "Show why post-money SAFEs dilute only existing holders while pre-money SAFEs dilute each other",
    "Convert the YC standard deal into a seed round with exact numbers",
    "Compute the conversion of a convertible note or loan with interest, cap and discount",
  ],
  concepts: [
    { id: "fc08.post-money-safe", name: "Post-money SAFE", description: "YC's 2018 SAFE in which the valuation cap is post-money: the holder's percentage, purchase amount over cap, is fixed at signing and measured on a capitalization that includes all other SAFEs.", competency: "fc-legal", related: ["fc08.dilution"] },
    { id: "fc08.pre-money-safe", name: "Pre-money SAFE", description: "The original SAFE, whose cap is divided by a capitalization that excludes the SAFEs themselves, so later SAFEs dilute earlier ones and the holder's percentage is unknown until conversion.", competency: "fc-legal", related: ["fc08.post-money-safe"] },
    { id: "fc08.safe-terms", name: "Cap, discount and MFN", description: "The valuation cap sets a maximum conversion price, the discount a percentage off the round price, and a most-favoured-nation clause lets the holder adopt better terms given to later investors.", competency: "fc-legal", related: ["fc08.post-money-safe"] },
    { id: "fc08.convertible-note", name: "Convertible note or loan", description: "Debt with interest and a maturity date that converts into equity at the next qualifying round, usually with a cap and discount; in the Netherlands typically a convertible loan agreement.", competency: "fc-legal", related: ["fc08.safe-terms"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "How SAFEs and notes convert",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Afterwave applied to YC W27. If it is accepted, the first money in is two SAFEs, and most pre-seed and angel money you raise for any of your ventures will be a SAFE or a convertible loan. SAFEs feel painless because nothing shows on the cap table until the priced round. That is exactly why founders get surprised by how much they sold. You need to be able to compute the conversion before you sign, not when the seed lawyer sends the pro-forma.`,
        },
        {
          kind: "md",
          md: md`### What a SAFE is

A **SAFE** (Simple Agreement for Future Equity, Y Combinator 2013; post-money version 2018) is a contract: the investor pays now and receives shares later, when the company raises a priced **equity financing**. It is not debt: no interest, no maturity date, no repayment obligation. Three events matter:

| Event | What the SAFE holder gets |
|---|---|
| **Equity financing** (priced round) | Converts into preferred shares (usually a shadow series with the same rights as the new preferred) at the conversion price |
| **Liquidity event** before conversion (sale, IPO) | The greater of its purchase amount (cash out) or the amount it would get as if converted at the cap |
| **Dissolution** | Return of purchase amount, ahead of common, alongside other SAFEs |

### Conversion price

The holder converts at the lower of the cap price and the discounted round price:`,
        },
        { kind: "equation", formula: "fc08-safe-conversion-price" },
        {
          kind: "md",
          md: md`- **Cap only:** protects the investor when the round is priced high.
- **Discount only** (typically 10 to 20 %): rewards early risk, no protection if the round valuation is very high.
- **Cap and discount:** whichever gives the lower price.
- **MFN, uncapped:** converts at the round price, but if the company later issues SAFEs on better terms before the round, the holder may adopt them.

### Post-money versus pre-money: what is in the denominator

The whole difference is $N_{\text{cap}}$, the share count the cap is divided by.

- **Post-money SAFE.** The YC definition of *Company Capitalization* includes all shares, options, the unissued pool **and all converting securities (every SAFE and note)**, but not the new money and not any pool increase made in the round (unless needed for promised options). So the holder's ownership just before the new money is fixed:`,
        },
        { kind: "equation", formula: "fc08-post-safe-ownership" },
        {
          kind: "md",
          md: md`- **Pre-money SAFE.** The cap is divided by a capitalization that **excludes** the SAFEs. Every additional SAFE adds shares on top, so SAFE holders dilute each other and nobody knows their percentage until conversion.

Two SAFEs of USD 1 m, each with a USD 10 m cap, on a company with 10 m founder shares:

| | Post-money SAFEs | Pre-money SAFEs |
|---|---|---|
| Each SAFE before the priced round | $1/10 = 10.0\%$ | $\frac{1\text{ m}}{10\text{ m}+2\times1\text{ m}} = 8.33\%$ |
| Founders before the priced round | 80.0 % | 83.3 % |
| Who bears later SAFEs | Existing holders only (founders) | Everyone, including earlier SAFEs |

The post-money SAFE is more expensive for founders but **transparent**: each signature has a known price in ownership. That is why YC switched, and why you can simply add up post-money SAFE percentages to know where you stand.

### Convertible notes and loans

A **convertible note** (US) or **convertible loan agreement, CLA** (common in the Netherlands and the rest of Europe, where the YC SAFE, written for a Delaware corporation, fits less well) is debt. It accrues interest and has a maturity date; at a qualifying financing the principal plus interest converts at the cap or discount price:`,
        },
        { kind: "equation", formula: "fc08-note-conversion" },
        {
          kind: "md",
          md: md`The maturity date is the real difference. If no round happens in time, the holder can demand repayment or negotiate conversion on their terms, which is leverage over a cash-poor company. Most notes are extended or converted rather than called, but read the maturity clause as if it will be enforced.`,
        },
        { kind: "widget", widget: "safe-vs-priced", props: { raise: 500000, cap: 5000000 }, caption: "Compare the same raise as a post-money SAFE, a pre-money SAFE or a priced seed: conversion price, effective valuation and founder ownership after the Series A." },
      ],
    },
    {
      layer: "applied",
      title: "The YC standard deal and a Dutch convertible loan, with exact numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Converting the YC standard deal into a seed round",
          given: md`**Illustrative Afterwave case.** Before YC the company has 10,000,000 fully diluted shares (founders plus pool). YC invests on its standard deal: **USD 125,000 on a post-money SAFE for 7 %**, plus **USD 375,000 on an uncapped MFN SAFE**. No other SAFEs are issued. Later Afterwave raises a seed of **USD 3,000,000 at USD 12,000,000 pre-money**; the term sheet's pre-money share count includes the converted SAFEs, and the pool is not topped up.`,
          steps: [
            { md: md`**Implied post-money cap of the 7 % SAFE:** $125{,}000/0.07 = $ **USD 1,785,714**.` },
            { md: md`**The MFN SAFE** is uncapped with no discount, so it converts at the seed price. Since that price is pre-money divided by the pre-money capitalization, its share of the pre-money capitalization is $375{,}000/12{,}000{,}000 = 3.125\%$.` },
            { md: md`**Company capitalization just before the new money** ($C$) contains the existing 10,000,000 shares plus both SAFEs: $C = 10{,}000{,}000 + 0.07C + 0.03125C$, so $C = 10{,}000{,}000/0.89875 = $ **11,126,565 shares**.` },
            { md: md`**SAFE shares:** YC 7 % SAFE $0.07\times11{,}126{,}565 = 778{,}860$; MFN SAFE $0.03125\times11{,}126{,}565 = 347{,}705$.` },
            { md: md`**Seed price:** $12{,}000{,}000/11{,}126{,}565 = $ **USD 1.0785** per share. The 7 % SAFE's effective conversion price is $125{,}000/778{,}860 = $ USD 0.1605 (its cap divided by $C$); the MFN SAFE converts at USD 1.0785 ($375{,}000/1.0785 = 347{,}705$ shares).` },
            { md: md`**Seed shares:** $3{,}000{,}000/1.0785 = 2{,}781{,}641$. Post-seed total $= 13{,}908{,}206$.` },
            {
              md: md`**Post-seed fully diluted table:**

| Holder | Shares | Before new money | After seed |
|---|---|---|---|
| Founders and pool | 10,000,000 | 89.875 % | 71.9 % |
| YC 7 % SAFE | 778,860 | 7.000 % | 5.6 % |
| YC MFN SAFE | 347,705 | 3.125 % | 2.5 % |
| Seed investors | 2,781,641 | | 20.0 % |
| **Total** | **13,908,206** | 100 % | 100 % |`,
            },
          ],
          result: md`YC's USD 500k costs the founders **10.125 %** of the company before the seed (7 % fixed plus 3.125 % that depends on the seed valuation), and 8.1 % after it. A higher seed pre-money shrinks only the MFN piece: at USD 20 m pre it would be 1.875 %. The 7 % is fixed whatever happens.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A Dutch convertible loan with interest, cap and discount",
          given: md`**Illustrative.** Angels lend EUR 500,000 on a convertible loan agreement: 6 % simple interest, 20 % discount, cap EUR 6,000,000 pre-money on 10,000,000 fully diluted shares. Eighteen months later a seed round prices at **EUR 1.00 per share** (EUR 10 m pre-money on the same 10,000,000 shares, as agreed with the new lead) and raises EUR 2,500,000. Interest converts with the principal.`,
          steps: [
            { md: md`Accrued amount $= 500{,}000\times(1 + 0.06\times1.5)$.` },
            { md: md`= **EUR 545,000**.`, hidden: true, check: { prompt: "Principal plus accrued interest (EUR)", answer: 545000, unit: "EUR", tolerance: { abs: 1 } } },
            { md: md`Cap price $= 6{,}000{,}000/10{,}000{,}000 = $ EUR 0.60; discount price $= 0.80\times1.00 = $ EUR 0.80.` },
            { md: md`Conversion price = the lower = **EUR 0.60**; the cap binds.`, hidden: true, check: { prompt: "Conversion price (EUR/share)", answer: 0.6, unit: "EUR/share", tolerance: { abs: 0.001 } } },
            { md: md`Conversion shares $= 545{,}000/0.60 = $ **908,333**.`, hidden: true, check: { prompt: "Shares issued to the noteholders", answer: 908333, unit: "shares", tolerance: { rel: 0.001 } } },
            { md: md`New money shares $= 2{,}500{,}000/1.00 = 2{,}500{,}000$. Total $= 10{,}000{,}000 + 908{,}333 + 2{,}500{,}000 = 13{,}408{,}333$. Noteholders 6.8 %, seed investors 18.6 %, existing holders 74.6 %.` },
          ],
          result: md`The cap gives the angels an effective entry valuation of EUR 6 m against the seed's EUR 10 m, and 18 months of interest buys them 9 % more shares. Here the lead agreed to price on the pre-note share count, so the note dilutes the lead too (18.6 % instead of 20 %); most leads insist instead that the pre-money includes the conversion shares, which pushes that dilution onto the founders.`,
        },
        {
          kind: "question",
          question: {
            id: "fc08-l02-p1",
            type: "numeric",
            prompt: md`Before any priced round a company signs three **post-money** SAFEs: USD 500k at a USD 5 m cap, USD 1 m at a USD 10 m cap and USD 250k at a USD 5 m cap. What percentage do the existing holders (founders and pool) own just before the priced round's new money? (%)`,
            answer: 75,
            tolerance: { abs: 0.1 },
            unit: "%",
            explanation: md`Post-money SAFE percentages simply add: $0.5/5 + 1/10 + 0.25/5 = 10\% + 10\% + 5\% = 25\%$. Existing holders keep $100\% - 25\% = 75\%$. With pre-money SAFEs you could not add them this way, because each would dilute the others.`,
            concepts: ["fc08.post-money-safe"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Raising on SAFEs and loans without surprises",
      blocks: [
        {
          kind: "md",
          md: md`### How it is done

- **US or YC-style companies** use the YC post-money SAFE forms unchanged (investors and lawyers trust them because they are standard). Changes go in a **side letter**: pro rata rights, information rights, MFN.
- **Dutch and other European angels** mostly use a **convertible loan agreement** drafted by a Dutch lawyer, or a Dutch adaptation of the SAFE. Expect interest, a maturity date (often 18 to 36 months) and conversion at maturity at a fixed valuation if no round happens.
- **Who models it:** you. Keep a SAFE ledger (amount, cap, pre or post, discount, MFN, side letters) and a pro-forma tab that converts the whole stack at three seed valuations.

### What goes wrong

- **SAFE stacking.** Signing SAFEs one by one at rising caps over 18 months, each one "only 4 %", and finding 25 % gone before the seed.
- **Mixing pre- and post-money SAFEs**, which makes conversion order and definitions disputable.
- **MFN surprises.** An early MFN holder adopts the cap you later gave a strategic investor.
- **Pool shuffle on top.** Post-money SAFEs exclude the round's pool increase from their capitalization, so the founders alone pay for the pool top-up (Lesson 3).
- **Note maturity** arriving during a slow fundraise.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "YC deal terms and eligible jurisdictions (as of the November 2026 research)",
          md: md`Secondary sources report the YC standard deal as **USD 125k for 7 % on a post-money SAFE plus USD 375k on an uncapped MFN SAFE**, unchanged since 2022 and still used in 2026, with an option from Spring 2026 to take the money in USDC. They also report that in January 2026 YC dropped Canada as an eligible incorporation jurisdiction, leaving the **US (Delaware), Cayman and Singapore**; a reversal was reported but not confirmed. The course research could not open ycombinator.com/deal. Confirm the current terms and jurisdictions with YC before you plan a structure around them.`,
        },
        { kind: "sources", refs: ["fc08-r1", "fc08-r2"] },
        {
          kind: "checklist",
          title: "Before you sign any SAFE or convertible loan",
          items: [
            "Post-money or pre-money? Cap, discount, MFN written down in the SAFE ledger",
            "Pro-forma: whole SAFE stack converted at a low, middle and high seed valuation",
            "Total pre-round dilution from all SAFEs stated as one number",
            "Side letters (pro rata, information rights, MFN) listed and consistent",
            "For loans: interest rate, maturity date, what happens at maturity, and whether interest converts",
            "Definition of the qualifying financing (minimum size) that triggers conversion",
          ],
        },
        {
          kind: "ask",
          title: "Questions an investor or their lawyer should be able to answer",
          items: [
            "Is your cap post-money, and does your company capitalization include the pool increase in the next round?",
            "Do you need a pro rata side letter, and on what amount?",
            "If the next round is smaller than the qualifying threshold, does the instrument convert or wait?",
            "On a sale before conversion, do you take the purchase amount or the as-converted amount?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc08-l02-p2",
            type: "short",
            prompt: md`Write a one-page **SAFE round plan for Afterwave** (illustrative numbers) to share with your cofounders: assume the YC standard deal plus USD 750k from angels on post-money SAFEs at a cap of your choice. Show (1) the total percentage sold before the seed, split by instrument, (2) the founders' fully diluted ownership after a seed of USD 3 m at two different pre-money valuations, and (3) one term you will refuse and why.`,
            rubric: [
              "Numbers labelled illustrative; YC 7 % fixed and the MFN piece computed as 375k / seed pre-money (or equivalent)",
              "Angel SAFE percentage = amount / post-money cap and added to the other post-money percentages",
              "Founders' ownership after the seed computed at two pre-money valuations with the seed's 3 m / post-money dilution applied",
              "Shows that a higher seed valuation only helps through the MFN (and seed) pieces, not the capped SAFEs",
              "Names a specific term to refuse (e.g. pre-money SAFE mixed with post-money, full MFN for a large strategic, maturity-style repayment) with a mechanism-based reason",
            ],
            modelAnswer: md`**Illustrative.** YC: 7 % (post-money SAFE) + MFN USD 375k. Angels: USD 750k on a USD 10 m post-money cap = 7.5 %.

**Pre-seed dilution** (as a share of the capitalization before seed money): YC 7 % + angels 7.5 % + MFN $375/V_{\text{pre}}$.
- Seed at USD 12 m pre: MFN 3.125 %; total 17.625 %; founders and pool 82.375 %. After the seed ($d = 3/15 = 20\%$): founders and pool **65.9 %**.
- Seed at USD 18 m pre: MFN 2.083 %; total 16.583 %; founders and pool 83.417 %. After the seed ($d = 3/21 = 14.3\%$): **71.5 %**.

The capped SAFEs (14.5 %) do not move with the seed price; only the MFN and the seed itself get cheaper at a higher valuation.

**Term I will refuse:** an angel's request for a pre-money SAFE alongside our post-money SAFEs, because the two definitions of capitalization conflict at conversion and pre-money SAFEs make the total dilution unknowable until the seed. If they want a better price, I will negotiate the cap, not the definition.`,
            explanation: md`The plan should read like a decision memo: one number per instrument, two seed scenarios, and a term to refuse with the mechanism behind it.`,
            concepts: ["fc08.post-money-safe", "fc08.safe-terms"],
            difficulty: 2,
          },
        },
        { kind: "scenario", scenario: "fc08-s1" },
        {
          kind: "feynman",
          prompt: "Explain to an angel investor why you only issue post-money SAFEs, and what that costs you as a founder.",
          keyPoints: [
            "Post-money cap divides into a capitalization that includes all SAFEs, so each holder's % = amount / cap is fixed",
            "Later SAFEs dilute only existing holders (founders), not earlier SAFEs",
            "Pre-money SAFEs dilute each other, so nobody knows their stake until conversion",
            "Transparency costs founders: they bear all SAFE dilution and the round's pool increase",
            "Cap sets a maximum conversion price; discount applies when the round is priced below the cap",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "fc08-l02-q1",
      type: "numeric",
      prompt: md`An investor puts USD 400k into a post-money SAFE with a USD 8 m cap. What percentage does it hold just before the priced round's new money?`,
      answer: 5,
      tolerance: { abs: 0.01 },
      unit: "%",
      explanation: md`$400/8{,}000 = 5\%$, fixed at signing for a post-money SAFE.`,
      concepts: ["fc08.post-money-safe"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc08-l02-q2",
      type: "numeric",
      prompt: md`A SAFE has a cap price of USD 0.90 per share and a 20 % discount. The priced round is at USD 1.25 per share. At what price does it convert? (USD, 2 decimals)`,
      answer: 0.9,
      tolerance: { abs: 0.005 },
      unit: "USD/share",
      explanation: md`Discount price $= 0.8\times1.25 = 1.00$; cap price $= 0.90$. The lower wins: USD 0.90. At a round price below USD 1.125 the discount would bind instead.`,
      concepts: ["fc08.safe-terms"],
      difficulty: 1,
    },
    {
      id: "fc08-l02-q3",
      type: "mcq",
      prompt: "Why do post-money SAFEs not dilute each other?",
      options: [
        "Because they carry interest that compensates for dilution",
        "Because the capitalization the cap is divided by already includes all converting securities, so each holder's percentage is amount over cap",
        "Because they convert after the new money",
        "Because they are senior to preferred stock",
      ],
      answer: 1,
      explanation: md`YC's Company Capitalization counts every SAFE and note. Each holder's stake is therefore fixed; all extra SAFE dilution falls on existing shareholders.`,
      concepts: ["fc08.post-money-safe", "fc08.pre-money-safe"],
      difficulty: 2,
    },
    {
      id: "fc08-l02-q4",
      type: "numeric",
      prompt: md`A EUR 200k convertible note at 8 % simple interest converts after 2 years at a conversion price of EUR 0.50. How many shares are issued?`,
      answer: 464000,
      tolerance: { rel: 0.001 },
      unit: "shares",
      explanation: md`$200{,}000\times(1 + 0.08\times2) = 232{,}000$; $232{,}000/0.50 = 464{,}000$ shares.`,
      concepts: ["fc08.convertible-note"],
      difficulty: 1,
    },
    {
      id: "fc08-l02-q5",
      type: "multi",
      prompt: "Which statements about the YC standard deal are correct? (Select all.)",
      options: [
        "The USD 125k SAFE implies a post-money cap of about USD 1.79 m",
        "The 7 % stake is fixed regardless of the seed valuation",
        "The USD 375k MFN SAFE takes a larger share when the seed valuation is lower",
        "Both SAFEs carry 7 % interest",
        "The MFN SAFE can adopt better terms given to later SAFE investors before the priced round",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`$125/0.07 = 1{,}786$ k. The MFN piece is $375\text{k}/V_{\text{pre}}$ of the pre-money capitalization, so it shrinks as the valuation rises. SAFEs carry no interest.`,
      concepts: ["fc08.post-money-safe", "fc08.safe-terms"],
      difficulty: 2,
    },
    {
      id: "fc08-l02-q6",
      type: "order",
      prompt: "Order the steps to convert a stack of post-money SAFEs plus an uncapped MFN SAFE into a priced round.",
      items: [
        "List every SAFE with amount, cap and type",
        "Express each capped SAFE as amount/cap and the MFN as amount/pre-money",
        "Solve for the pre-money capitalization including all SAFE shares",
        "Compute the round price as pre-money divided by that capitalization",
        "Issue new-money shares at the round price and compute the post-round table",
      ],
      explanation: md`Fix the percentages first, then the share count that makes them true, then the price, then the new money. This is the order the worked example follows.`,
      concepts: ["fc08.post-money-safe"],
      difficulty: 2,
    },
    {
      id: "fc08-l02-q7",
      type: "decision",
      prompt: md`Six months after signing YC's SAFEs you agree a strategic SAFE with a robotics company at a USD 8 m post-money cap. What must you check before signing?`,
      options: [
        { text: "Nothing; YC's SAFEs are already signed.", score: 0, feedback: "The MFN SAFE can adopt the new, better terms (a cap where it had none). That changes YC's conversion." },
        { text: "Model that YC's MFN SAFE may elect the USD 8 m cap, which would give it about 4.7 % instead of a seed-price conversion, and decide whether the strategic terms are worth that.", score: 1, feedback: "Right: 375/8,000 = 4.69 %. MFN rights make every later concession apply to earlier holders too." },
        { text: "Ask YC to waive its MFN.", score: 0.4, feedback: "You can ask, but first know what you are asking for; the model comes before the negotiation." },
      ],
      explanation: md`An MFN clause imports better later terms. Before giving anyone a cap, compute what it gives every MFN holder.`,
      concepts: ["fc08.safe-terms"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "fc08-l02-f1", front: "SAFE: what is it legally?", back: "A contract for future shares: no interest, no maturity, converts at the next priced round; cash or as-converted on an earlier exit.", concepts: ["fc08.post-money-safe"] },
    { id: "fc08-l02-f2", front: "Post-money SAFE ownership", back: md`$p = I_{\text{SAFE}}/V_{\text{cap,post}}$, fixed at signing; adds up across SAFEs.`, concepts: ["fc08.post-money-safe"] },
    { id: "fc08-l02-f3", front: "Conversion price with cap and discount", back: md`$\min(V_{\text{cap}}/N_{\text{cap}},\ (1-\delta)P_{\text{round}})$`, concepts: ["fc08.safe-terms"] },
    { id: "fc08-l02-f4", front: "YC standard deal (as reported for 2026)", back: "USD 125k for 7 % on a post-money SAFE (cap about USD 1.79 m) + USD 375k uncapped MFN SAFE.", concepts: ["fc08.post-money-safe"] },
    { id: "fc08-l02-f5", front: "Note vs SAFE: the key difference", back: "A note is debt: interest accrues and a maturity date gives the holder leverage if no round happens.", concepts: ["fc08.convertible-note"] },
    { id: "fc08-l02-f6", front: "MFN clause", back: "Lets the holder adopt better terms (cap, discount) given to later investors in the same kind of instrument before conversion.", concepts: ["fc08.safe-terms"] },
    { id: "fc08-l02-f7", front: "Who pays for the pool increase at the priced round under a post-money SAFE?", back: "The existing shareholders (founders): the SAFE capitalization excludes the round's pool increase.", concepts: ["fc08.post-money-safe"] },
  ],
  scenarios: [
    {
      id: "fc08-s1",
      title: "\"Can we do a pre-money SAFE with a discount?\"",
      context: md`Afterwave has signed YC's two SAFEs (illustrative). A Zurich angel offers USD 250k and writes: "I'd prefer a pre-money SAFE at a USD 6 m cap with a 20 % discount, that's what I did last time." Your post-money SAFE ledger currently totals 7 % plus the YC MFN.`,
      start: "a",
      concepts: ["fc08.post-money-safe", "fc08.pre-money-safe", "fc08.safe-terms"],
      nodes: {
        a: {
          md: md`How do you respond first?`,
          choices: [
            { text: "Accept: USD 250k is USD 250k.", score: 2, feedback: "You would mix pre- and post-money definitions in one stack and lose the ability to state your dilution.", next: "c" },
            { text: "Explain you only issue post-money SAFEs on YC's form so every holder's stake is clear, and offer a post-money cap that gives a comparable stake.", score: 9, feedback: "Keeps the stack clean and turns the discussion into price, which is what the angel actually cares about.", next: "b" },
            { text: "Refuse and stop the conversation.", score: 3, feedback: "Clean, but you lose an investor over a form, without even testing price.", next: "c" },
          ],
        },
        b: {
          md: md`The angel asks what a "comparable" post-money cap is. A USD 6 m pre-money cap with only this SAFE would give $0.25/(6+0.25) = 4.0\%$.`,
          choices: [
            { text: "Offer USD 250k on a USD 6.25 m post-money cap (4.0 %), no discount, and show that a 20 % discount only beats that cap if the seed is priced below about USD 7.8 m pre-money (a seed you would not accept anyway).", score: 10, feedback: "Exact equivalence for this investor, simpler paper, and the reasoning shows you understand the mechanism." },
            { text: "Offer a USD 5 m post-money cap to close fast.", score: 4, feedback: "That is 5 %, a 25 % bigger stake than what was asked for. Speed is not worth a point of the company." },
          ],
        },
        c: {
          md: md`Three months later the seed lawyer asks how the pre-money SAFE interacts with the post-money SAFEs' capitalization definition. Nobody can answer cleanly and the lead asks for a fixed-percentage side letter to remove the ambiguity.`,
          choices: [
            { text: "Ask the angel to swap into an equivalent post-money SAFE before closing and cover his legal cost.", score: 6, feedback: "Fixes it, at the cost of goodwill and time that a clean first answer would have saved." },
          ],
        },
      },
    },
  ],
};

export default lesson;
