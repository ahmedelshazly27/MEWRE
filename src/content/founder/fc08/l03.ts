import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc08-l03",
  title: "Priced rounds and the option pool shuffle",
  summary:
    "Pre-money and post-money, how the price per share is derived from the pre-money fully diluted count, and how putting the option pool top-up inside the pre-money quietly lowers the valuation you negotiated.",
  minutes: 60,
  objectives: [
    "Move between pre-money, post-money, investor stake and price per share without error",
    "Derive the round price from the pre-money fully diluted share count, including pool and SAFE conversions",
    "Quantify the option pool shuffle as an effective pre-money valuation",
    "Counter a pool request with a hiring-plan-based pool and show its value in euros",
    "Name the documents and steps of a priced round in the Netherlands and the US",
  ],
  concepts: [
    { id: "fc08.pre-post-money", name: "Pre-money and post-money valuation", description: "Pre-money is the agreed value of the company before new money; post-money adds the investment; the investor's stake is investment over post-money.", competency: "fc-legal", related: ["fc08.dilution"] },
    { id: "fc08.price-per-share", name: "Round price per share", description: "Pre-money valuation divided by the pre-money fully diluted share count, where that count includes whatever the term sheet places in the pre-money (pool top-up, converting SAFEs and notes).", competency: "fc-legal", related: ["fc08.pre-post-money", "fc08.fully-diluted"] },
    { id: "fc08.option-pool-shuffle", name: "Option pool shuffle", description: "Requiring the post-round option pool to be created inside the pre-money, so only existing holders are diluted by it; equivalent to a lower effective pre-money.", competency: "fc-legal", related: ["fc08.price-per-share"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "From headline valuation to price per share",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`When an Afterwave seed or Series A term sheet arrives, the headline number ("EUR 8 m pre") is what everyone repeats. The number that decides what your shares are worth is the **price per share**, and it depends on what the investor puts into the pre-money share count. The single most common way founders lose a valuation point they thought they had won is the option pool shuffle. You should be able to convert any term sheet into a price per share and an effective pre-money in five minutes.`,
        },
        {
          kind: "md",
          md: md`### The three identities`,
        },
        { kind: "equation", formula: "fc08-post-money" },
        {
          kind: "md",
          md: md`The investor's stake is $d = I/V_{\text{post}}$. "EUR 2 m at 8" means 20 % if 8 is pre-money and 25 % if it is post-money: always ask. The price per share comes from the **pre-money** side:`,
        },
        { kind: "equation", formula: "fc08-price-per-share" },
        {
          kind: "md",
          md: md`Then new shares $= I/P_{\text{round}}$. Everything included in $N_{\text{pre,FD}}$ is paid for by existing holders: the more shares in the denominator, the lower the price, and the new investor still gets exactly $d$ of the post-money company.

### The option pool shuffle, derived

Investors want an unallocated pool large enough for the hires their money is meant to fund (often 10 to 20 % post-money at seed and Series A). The question is whose percentage pays for it. Term sheets usually say the pool must be X % of the **post-money** fully diluted capitalization **and included in the pre-money**.

Let $F$ be existing shares excluding the unallocated pool, $d$ the investor stake, $q$ the post-money pool target (counting any unallocated shares already in the pool). The investor gets exactly $d$, the pool exactly $q$, so existing holders get the rest:

$$\frac{F}{N_{\text{post}}} = 1 - d - q \quad\Rightarrow\quad N_{\text{post}} = \frac{F}{1-d-q}.$$

With $d = 20\%$ and $q = 15\%$ the founders end at **65 %**, not the $80\%\times85\% = 68\%$ they would have if the pool were created after the round and diluted everyone. The investor's percentage is untouched. Expressed as money, the new pool shares are valued at the round price and come out of the pre-money:`,
        },
        { kind: "equation", formula: "fc08-effective-pre-money" },
        {
          kind: "md",
          md: md`If the pool is created from zero, this simplifies to $V_{\text{pre,eff}} = V_{\text{pre}} - q\,V_{\text{post}}$: a "EUR 12 m pre" with a 10 % pool inside a EUR 15 m post is an **effective EUR 10.5 m**. That is the number to compare across term sheets.`,
        },
        {
          kind: "chart",
          chart: "bar",
          title: "Illustrative: founders' ownership after a EUR 2 m seed at EUR 8 m pre",
          xKey: "case",
          xLabel: "Pool treatment",
          yLabel: "Founders, fully diluted (%)",
          series: [{ key: "founders", label: "Founders %" }],
          data: [
            { case: "No pool top-up", founders: 76.0 },
            { case: "15 % pool after round", founders: 67.3 },
            { case: "10 % pool in pre-money", founders: 70.0 },
            { case: "15 % pool in pre-money", founders: 65.0 },
          ],
          caption: "Founders hold 9.5 m shares and 0.5 m unallocated pool shares exist before the round (they count toward the pool target). Numbers from the worked example below.",
        },
        {
          kind: "flow",
          title: "A priced round from term sheet to closing",
          steps: [
            { label: "Term sheet", detail: "Price, pool, preferences, board, protective provisions; usually non-binding except exclusivity and confidentiality" },
            { label: "Due diligence", detail: "Cap table, deeds, IP assignments, contracts, financials, employment" },
            { label: "Definitive documents", detail: "NL: investment agreement, shareholders' agreement, amended articles; US: NVCA set (SPA, charter, IRA, voting, ROFR/co-sale)" },
            { label: "Approvals", detail: "Board and shareholder resolutions, waivers of pre-emption rights" },
            { label: "Closing", detail: "NL: notarial deed of issue and amended articles; US: filing the restated charter; money wired, register updated" },
          ],
          caption: "Four to ten weeks is typical once the term sheet is signed; diligence findings are the usual cause of delay.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Pricing an Afterwave seed with a pool shuffle",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "EUR 2 m at EUR 8 m pre with a 15 % post-money pool in the pre-money",
          given: md`**Illustrative.** Before the round Afterwave has 9,500,000 founder shares and 500,000 unallocated pool shares (10,000,000 fully diluted). The term sheet: EUR 2,000,000 at EUR 8,000,000 pre-money; the unallocated pool must equal 15 % of the post-money fully diluted shares and be included in the pre-money.`,
          steps: [
            { md: md`**Investor stake:** $d = 2/(8+2) = 20\%$.` },
            { md: md`**Post-money share count:** founders keep $1 - 0.20 - 0.15 = 65\%$, so $N_{\text{post}} = 9{,}500{,}000/0.65 = 14{,}615{,}385$.` },
            { md: md`**Pool:** $0.15\times14{,}615{,}385 = 2{,}192{,}308$ total, of which $2{,}192{,}308 - 500{,}000 = $ **1,692,308 new**.` },
            { md: md`**Investor shares:** $0.20\times14{,}615{,}385 = 2{,}923{,}077$.` },
            { md: md`**Price:** $2{,}000{,}000/2{,}923{,}077 = $ **EUR 0.6842**. Check: $V_{\text{pre}}/N_{\text{pre,FD}} = 8{,}000{,}000/(10{,}000{,}000 + 1{,}692{,}308) = 0.6842$.` },
            { md: md`**Effective pre-money:** $8{,}000{,}000 - 1{,}692{,}308\times0.6842 = 8{,}000{,}000 - 1{,}157{,}895 = $ **EUR 6.84 m**.` },
            { md: md`**Counter with a hiring plan.** The 18-month plan needs grants totalling about 10 % post-money. Redo with $q = 10\%$: $N_{\text{post}} = 9{,}500{,}000/0.70 = 13{,}571{,}429$; new pool $= 1{,}357{,}143 - 500{,}000 = 857{,}143$; price $= 2{,}000{,}000/2{,}714{,}286 = $ EUR 0.7368; effective pre-money $= 8{,}000{,}000 - 857{,}143\times0.7368 = $ **EUR 7.37 m**; founders 70.0 %.` },
          ],
          result: md`Same headline (EUR 8 m pre, investor 20 %). Cutting the pool from 15 % to a justified 10 % raises the price per share by 7.7 % and the effective pre-money by EUR 0.53 m, and gives the founders 5 points more. That is a bigger win than most founders get by pushing the headline from 8 to 8.5.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Effective pre-money of a second term sheet",
          given: md`**Illustrative.** A competing term sheet: EUR 3,000,000 at EUR 12,000,000 pre-money, 10 % post-money pool created from zero inside the pre-money. Existing fully diluted shares 10,000,000 (no pool yet).`,
          steps: [
            { md: md`$V_{\text{post}} = $ EUR 15 m, $d = 20\%$; existing holders keep $1 - 0.20 - 0.10 = 70\%$.` },
            { md: md`$N_{\text{post}} = 10{,}000{,}000/0.70 = 14{,}285{,}714$; investor shares $= 2{,}857{,}143$; pool $= 1{,}428{,}571$.` },
            { md: md`Price $= 3{,}000{,}000/2{,}857{,}143$ = **EUR 1.05**.`, hidden: true, check: { prompt: "Price per share (EUR)", answer: 1.05, unit: "EUR/share", tolerance: { abs: 0.002 } } },
            { md: md`Effective pre-money $= 12{,}000{,}000 - 1{,}428{,}571\times1.05$ = **EUR 10.5 m** (equivalently $12 - 0.10\times15$).`, hidden: true, check: { prompt: "Effective pre-money (EUR m)", answer: 10.5, unit: "EUR m", tolerance: { abs: 0.01 } } },
          ],
          result: md`Compare term sheets on price per share and effective pre-money, not on the headline. EUR 12 m with a 10 % pool in the pre-money is worth EUR 10.5 m to the existing holders.`,
        },
        {
          kind: "question",
          question: {
            id: "fc08-l03-p1",
            type: "numeric",
            prompt: md`EUR 4 m at EUR 16 m pre-money, with a 12 % post-money pool created from zero inside the pre-money. What is the effective pre-money? (EUR m, 1 decimal)`,
            answer: 13.6,
            tolerance: { abs: 0.05 },
            unit: "EUR m",
            explanation: md`$V_{\text{post}} = 20$; pool value $= 0.12\times20 = 2.4$; $V_{\text{pre,eff}} = 16 - 2.4 = $ EUR 13.6 m. Existing holders end at $1 - 0.20 - 0.12 = 68\%$.`,
            concepts: ["fc08.option-pool-shuffle"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Negotiating the round you can live with",
      blocks: [
        {
          kind: "md",
          md: md`### Who does what

- **The lead investor** sets price, pool and terms in the term sheet; followers take the same terms.
- **Your lawyer** turns the term sheet into documents. In the Netherlands: an investment agreement, a shareholders' agreement and amended articles of association, with the notary executing the deed of issue (and usually a waiver of statutory pre-emption rights by existing shareholders). In the US: the NVCA model set.
- **You** own the model: pre-money share count, pool size justified by a hiring plan, SAFE conversions and the post-closing cap table. Do not outsource that number.

### How to argue the pool

1. Build an **18 to 24 month hiring plan** with a grant size per role (illustrative: 1 % for a first senior engineer, 0.25 to 0.5 % for later engineers, 0.5 to 1 % for a first sales lead).
2. Add the grants up; that sum, plus a small buffer, is the pool you need now. The next round can top it up, diluting the next investor too.
3. Show the investor the effective pre-money under their pool and yours. Investors accept a lower pool when it is tied to a plan; they rarely accept "we'd like less".
4. Count **promised but ungranted** options in the pool, not on top of it.

### What goes wrong

- Celebrating a headline pre-money and losing 1 to 2 points of it in a pool sized for hires you will never make.
- Forgetting that SAFE conversions are also in the pre-money count, so the founders pay for them as well.
- Agreeing "pre-money" and "post-money" verbally and finding the other one in the term sheet.
- Leaving exclusivity open-ended: a 30 to 45 day no-shop is normal; longer gives the investor time to reprice.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Pool in the pre-money plus post-money SAFEs",
          md: md`Post-money SAFEs exclude the round's pool increase from their capitalization. So with a 15 % pool in the pre-money, a stack of post-money SAFEs and a new investor, **every** dilutive item lands on the founders and the pool that existed before. Model the full stack before you accept the pool percentage.`,
        },
        {
          kind: "checklist",
          title: "Read a term sheet in this order",
          items: [
            "Is the valuation pre-money or post-money?",
            "What exactly is in the pre-money fully diluted share count (pool top-up, SAFEs, notes, warrants)?",
            "Pool target as % of post-money, and is the existing unallocated pool counted toward it?",
            "Price per share and effective pre-money computed by you",
            "Liquidation preference, participation and anti-dilution (Lesson 5)",
            "Board composition, protective provisions, exclusivity period",
          ],
        },
        {
          kind: "ask",
          title: "Questions to put to the lead investor",
          items: [
            "Can you confirm the price per share you calculate, so we start from the same number?",
            "Which hires are you expecting the pool to cover in the next 18 months?",
            "Would you accept a pool sized to our hiring plan with a top-up at the next round?",
            "Is the exclusivity period fixed, and what happens to it if diligence is complete early?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc08-l03-p2",
            type: "short",
            prompt: md`A lead investor offers Afterwave **EUR 2.5 m at EUR 10 m pre-money with a 15 % post-money pool inside the pre-money** (illustrative). Existing fully diluted shares are 10,000,000 with no unallocated pool. Write the counter-proposal email you would send: propose a pool size justified by a short hiring plan, and show the investor's and your effective pre-money and price per share under both pool sizes.`,
            rubric: [
              "Computes the investor stake (20 %) and, for 15 %, founders 65 %, price EUR 0.8125 and effective pre EUR 8.125 m (or equivalent correct figures)",
              "Proposes a smaller pool tied to a concrete hiring plan with grant sizes per role that sum to the proposed pool",
              "Recomputes price and effective pre-money for the proposed pool correctly",
              "Keeps the headline valuation and investor stake unchanged, framing the ask as aligning the pool with the plan",
              "Professional, concise tone with a clear next step (call, revised term sheet)",
            ],
            modelAnswer: md`Subject: Afterwave term sheet: pool sizing

Thanks for the term sheet; we are aligned on EUR 2.5 m at EUR 10 m pre and on your 20 %. One point to align: the pool.

At a 15 % post-money pool inside the pre-money, existing holders end at 65 %: post-money shares $10{,}000{,}000/0.65 = 15{,}384{,}615$, price $10{,}000{,}000/12{,}307{,}692 = $ EUR 0.8125, effective pre-money $10 - 0.15\times12.5 = $ EUR 8.125 m.

Our 18-month hiring plan (illustrative): senior test-systems engineer 1.0 %, two software engineers 0.5 % each, first enterprise AE 0.75 %, field applications engineer 0.5 %, two later hires 0.25 % each, plus a 6 % reserve for later seed-stage hires and refreshes: 9.75 %, rounded to 10 %. At a 10 % pool: existing holders 70 %, post-money shares 14,285,714, price $10{,}000{,}000/11{,}428{,}571 = $ EUR 0.875, effective pre-money $10 - 0.10\times12.5 = $ EUR 8.75 m.

We propose 10 %, with a top-up at the Series A sized to that round's plan. Your ownership is unchanged at 20 %. Happy to walk through the plan on a call this week.`,
            explanation: md`The strongest counter keeps the investor's economics intact and changes only what the founders can justify with a plan; the effective pre-money shows both sides what is at stake in euros.`,
            concepts: ["fc08.option-pool-shuffle", "fc08.price-per-share"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain the option pool shuffle to a first-time founder in three sentences, with a number.",
          keyPoints: [
            "The pool must be X % post-money but is created before the money comes in, inside the pre-money",
            "So only existing holders are diluted by it; the investor's stake is unchanged",
            "It lowers the price per share; effective pre-money = headline minus new pool shares x price",
            "Example: EUR 12 m pre with a 10 % pool on EUR 15 m post is effectively EUR 10.5 m",
            "Counter with a hiring-plan-based pool",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "fc08-l03-q1",
      type: "numeric",
      prompt: md`An investor puts in EUR 1.5 m for 15 % post-money. What is the pre-money valuation? (EUR m)`,
      answer: 8.5,
      tolerance: { abs: 0.01 },
      unit: "EUR m",
      explanation: md`$V_{\text{post}} = 1.5/0.15 = 10$; $V_{\text{pre}} = 10 - 1.5 = $ EUR 8.5 m.`,
      concepts: ["fc08.pre-post-money"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc08-l03-q2",
      type: "numeric",
      prompt: md`Pre-money EUR 10 m; pre-money fully diluted shares are 11,000,000 existing plus a pool top-up of 1,500,000 placed in the pre-money. What is the price per share? (EUR, 2 decimals)`,
      answer: 0.8,
      tolerance: { abs: 0.005 },
      unit: "EUR/share",
      explanation: md`$10{,}000{,}000/12{,}500{,}000 = $ EUR 0.80. Without the top-up in the pre-money it would be EUR 0.909.`,
      concepts: ["fc08.price-per-share"],
      difficulty: 1,
    },
    {
      id: "fc08-l03-q3",
      type: "mcq",
      prompt: "Who is diluted by an option pool created inside the pre-money?",
      options: ["Only the new investor", "Everyone pro rata, including the new investor", "Only the existing holders (founders, existing investors, SAFE holders depending on their terms)", "Nobody, because unallocated options are not shares"],
      answer: 2,
      explanation: md`Inside the pre-money, the pool exists before the new money arrives; the investor buys its fixed percentage of a capitalization that already includes it.`,
      concepts: ["fc08.option-pool-shuffle"],
      difficulty: 1,
    },
    {
      id: "fc08-l03-q4",
      type: "numeric",
      prompt: md`Investor stake 25 %, post-money pool 12 % inside the pre-money, existing unallocated pool zero. What fully diluted percentage do existing holders keep? (%)`,
      answer: 63,
      tolerance: { abs: 0.1 },
      unit: "%",
      explanation: md`$1 - 0.25 - 0.12 = 63\%$. If the pool were created after the round: $75\%\times88\% = 66\%$.`,
      concepts: ["fc08.option-pool-shuffle"],
      difficulty: 1,
    },
    {
      id: "fc08-l03-q5",
      type: "decision",
      prompt: md`Two term sheets: A is EUR 10 m pre with a 20 % post-money pool in the pre-money; B is EUR 9 m pre with a 10 % pool in the pre-money. Both raise EUR 2.5 m and you have no pool today. Which is better for existing holders on price?`,
      options: [
        { text: "A, because the headline is higher.", score: 0, feedback: "A: effective pre $= 10 - 0.20\\times12.5 = 7.5$. Headline numbers mislead." },
        { text: "B, because its effective pre-money is EUR 9 - 0.10 x 11.5 = EUR 7.85 m versus EUR 7.5 m for A.", score: 1, feedback: "Correct. Compare effective pre-money (or price per share), not headline." },
        { text: "They are equivalent.", score: 0, feedback: "They differ by EUR 0.35 m in effective pre-money." },
      ],
      explanation: md`A: $10 - 0.2\times12.5 = 7.5$. B: $9 - 0.1\times11.5 = 7.85$. B also leaves existing holders with $1 - 2.5/11.5 - 0.10 = 68.3\%$ versus $1 - 0.20 - 0.20 = 60\%$ under A, though A's larger pool does fund more hires.`,
      concepts: ["fc08.option-pool-shuffle", "fc08.pre-post-money"],
      difficulty: 2,
    },
    {
      id: "fc08-l03-q6",
      type: "order",
      prompt: "Order the steps of a Dutch priced round.",
      items: [
        "Sign the term sheet (exclusivity and confidentiality binding)",
        "Investor due diligence",
        "Negotiate investment agreement, shareholders' agreement and new articles",
        "Shareholder resolutions and waiver of pre-emption rights",
        "Notarial deed of issue, payment and update of the shareholders' register",
      ],
      explanation: md`In a BV, shares are issued by notarial deed, so the notary is the last step; existing shareholders' statutory pre-emption rights must be waived or excluded first.`,
      concepts: ["fc08.price-per-share"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc08-l03-f1", front: "Post-money valuation", back: md`$V_{\text{post}} = V_{\text{pre}} + I$; investor stake $= I/V_{\text{post}}$.`, concepts: ["fc08.pre-post-money"] },
    { id: "fc08-l03-f2", front: "Round price per share", back: md`$P = V_{\text{pre}}/N_{\text{pre,FD}}$, where the count includes anything the term sheet puts in the pre-money.`, concepts: ["fc08.price-per-share"] },
    { id: "fc08-l03-f3", front: "Existing holders after a pool shuffle", back: md`$1 - d - q$ (investor stake d, post-money pool q).`, concepts: ["fc08.option-pool-shuffle"] },
    { id: "fc08-l03-f4", front: "Effective pre-money (pool from zero)", back: md`$V_{\text{pre}} - q\,V_{\text{post}}$, e.g. 12 - 0.10 x 15 = EUR 10.5 m.`, concepts: ["fc08.option-pool-shuffle"] },
    { id: "fc08-l03-f5", front: "Best counter to a big pool request", back: "An 18 to 24 month hiring plan with grant sizes that add up to the pool you propose.", concepts: ["fc08.option-pool-shuffle"] },
    { id: "fc08-l03-f6", front: "How are BV shares issued?", back: "By notarial deed after shareholder approval (and waiver of statutory pre-emption rights); then the register is updated.", concepts: ["fc08.price-per-share"] },
  ],
};

export default lesson;
