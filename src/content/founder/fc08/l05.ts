import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc08-l05",
  title: "Preferences, anti-dilution and control",
  summary:
    "The economic terms that decide who gets paid in an exit (liquidation preference, participation, seniority), the terms that protect investors in a down round (weighted average versus full ratchet), pro rata rights, and the control terms that sit beside them.",
  minutes: 80,
  objectives: [
    "Compute a liquidation waterfall for non-participating, participating and capped preferences at several exit values",
    "Find the exit value above which a preferred holder converts",
    "Run a two-class stack with seniority and conversion decisions",
    "Compute broad-based weighted average and full ratchet adjustments and their effect on founders",
    "Separate economic terms from control terms and know which to concede",
  ],
  concepts: [
    { id: "fc08.liquidation-preference", name: "Liquidation preference", description: "The right of preferred holders to be paid a multiple of their investment before common in a sale or liquidation; non-participating holders take the preference or convert, whichever is larger.", competency: "fc-legal", related: ["fc08.cap-table"] },
    { id: "fc08.participation", name: "Participating preferred", description: "Preferred that receives its preference and then also shares pro rata in the remainder (double dip), sometimes capped at a total multiple.", competency: "fc-legal", related: ["fc08.liquidation-preference"] },
    { id: "fc08.anti-dilution", name: "Anti-dilution protection", description: "Adjustment of the preferred conversion price after a down round: broad-based weighted average (market standard) or full ratchet (reprice to the new low).", competency: "fc-legal", related: ["fc08.dilution"] },
    { id: "fc08.pro-rata", name: "Pro rata right", description: "The right of an existing investor to buy enough of a future round to keep its percentage: its ownership times the round size.", competency: "fc-legal", related: ["fc08.dilution"] },
    { id: "fc08.control-terms", name: "Control terms", description: "Board composition, protective provisions (investor vetoes), drag-along, information rights: who decides, as opposed to who gets paid.", competency: "fc-legal", related: ["fc08.liquidation-preference"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Waterfalls, anti-dilution and the terms behind them",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`A term sheet with a higher valuation and worse preferences can leave you with less money in every exit you are likely to see. As the person who will negotiate Afterwave's rounds and, later, any sale, you must be able to turn "1x participating, senior" into euros for the founders at EUR 20 m and EUR 100 m. Investors do this in a spreadsheet before they send the term sheet.`,
        },
        {
          kind: "md",
          md: md`### Liquidation preference

Investors buy **preferred** shares. In a sale or liquidation (and contractually in any "deemed liquidation", i.e. a merger or sale of the company), preferred holders are paid first. The standard seed and Series A term in healthy markets is **1x non-participating**: the holder takes back its investment **or** converts to common and takes its percentage, whichever is larger:`,
        },
        { kind: "equation", formula: "fc08-nonparticipating" },
        {
          kind: "md",
          md: md`For one investor who put in EUR 6 m for 25 %, the preference binds below $E^{*} = 6/0.25 = $ EUR 24 m. At a EUR 10 m exit the investor takes 6 and the common gets 4 (40 % for holding 75 %). Above EUR 24 m everyone is pro rata.

### Participation

**Participating** preferred takes the preference **and** its share of what is left:`,
        },
        { kind: "equation", formula: "fc08-participating" },
        {
          kind: "md",
          md: md`At EUR 10 m: $6 + 0.25\times4 = 7$, common 3. At EUR 100 m: $6 + 0.25\times94 = 29.5$, common 70.5 instead of 75. The cost to the common is $p\cdot mI = 0.25\times6 = $ EUR 1.5 m at every exit above EUR 6 m. A **cap** (e.g. total 3x = EUR 18 m) limits this: above the cap the holder converts once $pE > 18$, i.e. $E > 72$.

**Multiples** above 1x (2x, 3x) appear in weak markets or for rescue rounds. **Seniority**: later rounds are often senior (paid first), or **pari passu** (all preferred share the preference pot pro rata to their preferences).`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "Common holders' proceeds vs exit value: one investor, EUR 6 m for 25 % (EUR m)",
          xKey: "exit",
          xLabel: "Exit proceeds (EUR m)",
          yLabel: "Paid to common (EUR m)",
          series: [
            { key: "nonpart", label: "1x non-participating" },
            { key: "part", label: "1x participating, uncapped" },
            { key: "cap3", label: "1x participating, 3x cap" },
          ],
          data: [
            { exit: 0, nonpart: 0, part: 0, cap3: 0 },
            { exit: 5, nonpart: 0, part: 0, cap3: 0 },
            { exit: 10, nonpart: 4, part: 3, cap3: 3 },
            { exit: 15, nonpart: 9, part: 6.75, cap3: 6.75 },
            { exit: 20, nonpart: 14, part: 10.5, cap3: 10.5 },
            { exit: 24, nonpart: 18, part: 13.5, cap3: 13.5 },
            { exit: 30, nonpart: 22.5, part: 18, cap3: 18 },
            { exit: 40, nonpart: 30, part: 25.5, cap3: 25.5 },
            { exit: 60, nonpart: 45, part: 40.5, cap3: 42 },
            { exit: 72, nonpart: 54, part: 49.5, cap3: 54 },
            { exit: 80, nonpart: 60, part: 55.5, cap3: 60 },
            { exit: 100, nonpart: 75, part: 70.5, cap3: 75 },
          ],
          caption: "Below EUR 6 m the common gets nothing in every case. Non-participating converts above EUR 24 m; the capped participating holder converts above EUR 72 m; uncapped participation costs the common EUR 1.5 m at every exit above EUR 6 m.",
        },
        {
          kind: "md",
          md: md`### Anti-dilution: what happens in a down round

If a later round is priced **below** the protected investor's price, its **conversion price** is lowered so it converts into more common. The market standard (NVCA) is **broad-based weighted average**:`,
        },
        { kind: "equation", formula: "fc08-bbwa" },
        {
          kind: "md",
          md: md`$A$ is the broad fully diluted base (all common, preferred as converted, options and pool), $B$ the shares the new money would have bought at the old price, $C$ the shares actually issued. The more of the company the down round represents, the larger the adjustment. The protected holder then converts into:`,
        },
        { kind: "equation", formula: "fc08-conversion-shares" },
        {
          kind: "md",
          md: md`**Full ratchet** resets the conversion price to the new price, whatever the size of the down round:`,
        },
        { kind: "equation", formula: "fc08-full-ratchet" },
        {
          kind: "md",
          md: md`Selling one share at a low price triggers the whole adjustment, so a full ratchet can transfer a large part of the company to one investor in a small bridge. Founders should accept broad-based weighted average and refuse full ratchet.

### Pro rata rights

An investor with ownership $p$ who buys $p$ of the next round's new shares stays at $p$:`,
        },
        { kind: "equation", formula: "fc08-pro-rata" },
        {
          kind: "md",
          md: md`Pro rata is valuable to investors (they double down on winners) and mostly harmless to founders, until many small holders all have it and a new lead cannot get the allocation it needs. Give it to meaningful investors, often only above a threshold ("major investors").

### Control terms

Economics decide who gets paid; control decides who decides.

| Term | What it does | Founder-friendly norm at seed / Series A |
|---|---|---|
| Board composition | Who appoints directors (BV: supervisory board or one-tier board) | Founders keep a majority at seed; balanced (e.g. 2 founders, 1 investor, 1 independent) at Series A |
| Protective provisions | Investor vetoes: new senior shares, changes to their rights, sale, liquidation, large debt | Limited to actions that change their rights; no veto on budgets or hiring |
| Drag-along | Majority can force minority to join a sale | Threshold that includes founders and requires a minimum price |
| Information rights | Monthly or quarterly financials, annual budget | Standard; reserve for major investors |
| Redemption | Investor can demand repayment after N years | Avoid |`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Running the Afterwave waterfall and a down round",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Two-class waterfall at four exit values",
          given: md`**Illustrative**, using the post-Series A table from Lesson 1: Series A invested EUR 6 m for 20 %, seed EUR 2 m for 16 %, common 64 % (founders 57.6 %, pool 6.4 %; assume the whole pool is granted and exercised, and ignore exercise prices). Both preferred are 1x non-participating; Series A is senior to seed, seed senior to common. CEO holds 23.04 %, i.e. $23.04/64 = 36\%$ of the common. Exit proceeds after debt and fees: EUR 6 m, 15 m, 25 m, 50 m.`,
          steps: [
            { md: md`**EUR 6 m.** Series A takes its EUR 6 m preference (converting would give $0.20\times6 = 1.2$). Nothing remains: seed 0, common 0, CEO **0**.` },
            { md: md`**EUR 15 m.** Series A: preference 6 beats conversion ($0.20\times15 = 3$). Remaining 9. Seed: preference 2, or convert and share the 9 with the common: $16/80\times9 = 1.8 < 2$, so it takes 2. Common gets 7; CEO $0.36\times7 = $ **EUR 2.52 m**.` },
            { md: md`**EUR 25 m.** Series A: if everyone converted it would get $0.20\times25 = 5 < 6$, so it takes 6. Remaining 19. Seed converting gets $16/80\times19 = 3.8 > 2$, so it converts. Common gets $64/80\times19 = 15.2$; CEO **EUR 5.47 m**.` },
            { md: md`**EUR 50 m.** If all convert: Series A $0.20\times50 = 10 > 6$, seed $0.16\times50 = 8 > 2$. Both convert; common gets 32; CEO $0.2304\times50 = $ **EUR 11.52 m**.` },
            {
              md: md`**Summary (EUR m):**

| Exit | Series A | Seed | Common | CEO | CEO % of proceeds |
|---|---|---|---|---|---|
| 6 | 6.0 | 0.0 | 0.0 | 0.00 | 0 % |
| 15 | 6.0 | 2.0 | 7.0 | 2.52 | 16.8 % |
| 25 | 6.0 | 3.8 | 15.2 | 5.47 | 21.9 % |
| 50 | 10.0 | 8.0 | 32.0 | 11.52 | 23.0 % |`,
            },
          ],
          result: md`The CEO's 23.04 % is only worth 23.04 % of the proceeds once every preferred class converts (here above EUR 30 m, where the Series A converts: $6/0.20 = 30$). Below that, the preference stack takes a growing share. Raising EUR 8 m of preferred means the founders need an exit well above EUR 8 m to see real money.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A down round: weighted average versus full ratchet",
          given: md`**Illustrative.** After the Series A (EUR 6 m at EUR 1.728 per share, 3,472,222 shares) the company has 17,361,111 fully diluted shares. It misses its plan and raises a EUR 4 m bridge at **EUR 1.00 per share** (4,000,000 new shares). The Series A has anti-dilution protection. CEO holds 4,000,000 shares.`,
          steps: [
            { md: md`$A = 17{,}361{,}111$; $B = 4{,}000{,}000/1.728 = 2{,}314{,}815$; $C = 4{,}000{,}000$.` },
            { md: md`Broad-based WA: $CP_2 = 1.728\times(17{,}361{,}111 + 2{,}314{,}815)/(17{,}361{,}111 + 4{,}000{,}000)$ = **EUR 1.5917**.`, hidden: true, check: { prompt: "Adjusted conversion price (EUR)", answer: 1.5917, unit: "EUR/share", tolerance: { abs: 0.001 } } },
            { md: md`Series A now converts into $6{,}000{,}000/1.5917 = $ **3,769,608** shares (+297,386).`, hidden: true, check: { prompt: "Series A as-converted shares under weighted average", answer: 3769608, unit: "shares", tolerance: { rel: 0.001 } } },
            { md: md`Full ratchet: $CP_2 = 1.00$, so Series A converts into 6,000,000 shares (+2,527,778).` },
            { md: md`CEO ownership: no adjustment $4{,}000{,}000/21{,}361{,}111 = 18.73\%$; weighted average $4{,}000{,}000/21{,}658{,}497 = 18.47\%$; full ratchet $4{,}000{,}000/23{,}888{,}889$ = **16.74 %**.`, hidden: true, check: { prompt: "CEO ownership under full ratchet (%)", answer: 16.74, unit: "%", tolerance: { abs: 0.03 } } },
          ],
          result: md`The down round itself costs the CEO 4.3 points (23.04 % to 18.73 %). Weighted average adds 0.26 points; full ratchet adds about 2 points, eight times as much, and would do the same even if the bridge were only EUR 100k.`,
        },
        {
          kind: "question",
          question: {
            id: "fc08-l05-p1",
            type: "numeric",
            prompt: md`An investor holds 1x **participating** (uncapped) preferred: EUR 5 m invested for 25 %. The company is sold for EUR 30 m. How much goes to the common holders? (EUR m)`,
            answer: 18.75,
            tolerance: { abs: 0.01 },
            unit: "EUR m",
            explanation: md`Investor: $5 + 0.25\times(30-5) = 11.25$. Common: $30 - 11.25 = 18.75$. With 1x non-participating the investor would convert ($0.25\times30 = 7.5 > 5$) and common would get 22.5: participation costs the common EUR 3.75 m here.`,
            concepts: ["fc08.participation"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "What to concede and what to hold",
      blocks: [
        {
          kind: "md",
          md: md`### Market norms (healthy seed and Series A markets)

- **1x non-participating**, pari passu or standard seniority: accept.
- **Participation**: resist; if conceded, insist on a cap (2x to 3x total).
- **Multiples above 1x**: only in rescue situations, and price them as a valuation cut.
- **Broad-based weighted average** anti-dilution: accept. **Full ratchet** or **narrow-based**: refuse.
- **Pro rata** for major investors: accept. **Super pro rata** (more than their percentage): resist.
- **Protective provisions** that protect the investor's rights: accept. Vetoes over operations (budget, hires, pricing): refuse.
- **Redemption rights** and **cumulative dividends**: refuse at seed and Series A.

### How it is done

Your lawyer marks up the term sheet; you model every economic term before the call. Investors expect founders to trade: a slightly lower valuation for clean terms is often the better deal (see the exercise). Keep the waterfall model alive: every later round adds a class to the stack, and acquirers model it too.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Valuation is not the deal",
          md: md`Founders celebrate the headline valuation and sign participation, a 2x preference or a full ratchet to get it. Those terms are paid at exactly the moderate exits that most companies end up with. Compare term sheets by founder proceeds at three or four realistic exit values, not by pre-money.`,
        },
        {
          kind: "checklist",
          title: "Term sheet economics check",
          items: [
            "Preference multiple, participation and cap written into the model",
            "Seniority of each class (senior, pari passu)",
            "Indifference (conversion) exit value for each class computed",
            "Founder proceeds at three or four exit values, side by side for each term sheet",
            "Anti-dilution type (broad-based weighted average) and carve-outs (pool grants, conversions)",
            "Pro rata thresholds and any super pro rata",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask the investor",
          items: [
            "What exit value do you underwrite, and what do the founders receive there under your terms?",
            "Would you trade participation for a lower headline valuation?",
            "Which actions need your consent under the protective provisions, exactly?",
            "Does the anti-dilution carve out pool grants and SAFE conversions?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc08-l05-p2",
            type: "short",
            prompt: md`Afterwave (illustrative) has two seed term sheets, each for EUR 3 m. **A:** EUR 10 m pre-money, 1x non-participating, broad-based weighted average. **B:** EUR 12 m pre-money, 1x participating uncapped, full ratchet. Ignore the pool. Write a short recommendation memo to your cofounders: compute what the existing holders receive under each at exits of EUR 10 m, 20 m and 100 m, find the exit value where B starts to beat A, and recommend.`,
            rubric: [
              "Investor stakes correct: A 3/13 = 23.1 %, B 3/15 = 20 %",
              "A uses max(pref, pro rata); B uses pref plus 20 % of the remainder; existing-holder amounts correct at 10, 20 and 100 (A: 7.0, 15.4, 76.9; B: 5.6, 13.6, 77.6)",
              "Crossover found at about EUR 78 m",
              "Flags full ratchet as a separate down-round risk that makes B worse than the waterfall alone shows",
              "Clear recommendation with reasoning based on the likely range of exits",
            ],
            modelAnswer: md`**Recommendation: term sheet A.**

Stakes: A $3/13 = 23.1\%$ (existing holders 76.9 %); B $3/15 = 20\%$ (80 %).

| Exit (EUR m) | A: existing holders | B: existing holders |
|---|---|---|
| 10 | $10 - 3 = 7.0$ (preference binds) | $10 - (3 + 0.2\times7) = 5.6$ |
| 20 | $0.769\times20 = 15.4$ (investor converts) | $20 - (3 + 0.2\times17) = 13.6$ |
| 100 | $0.769\times100 = 76.9$ | $100 - (3 + 0.2\times97) = 77.6$ |

Crossover: $0.7692E = 0.8E - 2.4$, so $E \approx$ EUR 78 m. B only wins above a EUR 78 m exit, and by at most $0.0308E - 2.4$ (EUR 0.7 m at 100 m). Below that A is better, by EUR 1.4 to 1.8 m in the EUR 10 to 20 m range.

B also has a full ratchet: any bridge below its price reprices its whole EUR 3 m. That risk is largest exactly in the scenarios where the participation already hurts. The EUR 2 m higher headline is not worth it. If we want to negotiate, ask A's investor for EUR 11 m pre on A's terms.`,
            explanation: md`The memo should show that the higher headline is paid for by participation at moderate exits and by full-ratchet risk in a down round.`,
            concepts: ["fc08.liquidation-preference", "fc08.participation", "fc08.anti-dilution"],
            difficulty: 3,
          },
        },
        { kind: "scenario", scenario: "fc08-s2" },
        {
          kind: "feynman",
          prompt: "Explain to a cofounder, with one number, why a 1x non-participating preference is fair and a participating one is a double dip.",
          keyPoints: [
            "Non-participating: investor takes its money back or converts, whichever is larger",
            "It protects the investor in a low exit and costs nothing in a high one (above the conversion point)",
            "Participating takes the money back and its percentage of the rest",
            "Cost to common = percentage x preference at every exit above the preference until a cap",
            "Example: EUR 6 m for 25 %: EUR 1.5 m less for the common at any exit above EUR 6 m",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "fc08-l05-q1",
      type: "numeric",
      prompt: md`An investor holds 1x non-participating preferred: EUR 4 m for 20 %. Above what exit value does it convert to common? (EUR m)`,
      answer: 20,
      tolerance: { abs: 0.01 },
      unit: "EUR m",
      explanation: md`$E^{*} = mI/p = 4/0.20 = $ EUR 20 m. Below it the EUR 4 m preference is worth more than 20 % of the exit.`,
      concepts: ["fc08.liquidation-preference"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc08-l05-q2",
      type: "numeric",
      prompt: md`Same investor (EUR 4 m for 20 %), 1x non-participating. The company sells for EUR 12 m. How much do the common holders receive? (EUR m)`,
      answer: 8,
      tolerance: { abs: 0.01 },
      unit: "EUR m",
      explanation: md`Preference 4 beats conversion $0.2\times12 = 2.4$; common gets $12 - 4 = 8$, i.e. 66.7 % of proceeds for 80 % of the shares.`,
      concepts: ["fc08.liquidation-preference"],
      difficulty: 1,
    },
    {
      id: "fc08-l05-q3",
      type: "numeric",
      prompt: md`Broad-based weighted average: old conversion price EUR 2.00; fully diluted shares before the new issue 10,000,000; a down round raises EUR 3 m at EUR 1.00 per share. What is the new conversion price? (EUR, 3 decimals)`,
      answer: 1.769,
      tolerance: { abs: 0.002 },
      unit: "EUR/share",
      explanation: md`$B = 3{,}000{,}000/2 = 1{,}500{,}000$; $C = 3{,}000{,}000$. $CP_2 = 2\times11.5/13 = 1.769$. Full ratchet would give EUR 1.00.`,
      concepts: ["fc08.anti-dilution"],
      difficulty: 2,
    },
    {
      id: "fc08-l05-q4",
      type: "numeric",
      prompt: md`A seed investor owns 12 % fully diluted. The Series A raises EUR 10 m. How much must it invest to keep 12 % (ignoring any pool top-up)? (EUR m)`,
      answer: 1.2,
      tolerance: { abs: 0.01 },
      unit: "EUR m",
      explanation: md`Pro rata $= p\times I_{\text{round}} = 0.12\times10 = $ EUR 1.2 m.`,
      concepts: ["fc08.pro-rata"],
      difficulty: 1,
    },
    {
      id: "fc08-l05-q5",
      type: "mcq",
      prompt: "Which term is an economic term rather than a control term?",
      options: ["Protective provisions", "Board seat", "Liquidation preference", "Information rights"],
      answer: 2,
      explanation: md`Preferences decide who gets paid. Board seats, vetoes and information rights decide who decides and who knows what.`,
      concepts: ["fc08.control-terms", "fc08.liquidation-preference"],
      difficulty: 1,
    },
    {
      id: "fc08-l05-q6",
      type: "multi",
      prompt: "Which terms should a founder normally refuse at seed or Series A? (Select all.)",
      options: ["Full ratchet anti-dilution", "1x non-participating preference", "Uncapped participation", "Broad-based weighted average anti-dilution", "Redemption rights after five years"],
      answer: [0, 2, 4],
      explanation: md`1x non-participating and broad-based weighted average are market standard. Full ratchet, uncapped participation and redemption shift value or control to the investor in exactly the scenarios that hurt founders most.`,
      concepts: ["fc08.anti-dilution", "fc08.participation", "fc08.control-terms"],
      difficulty: 1,
    },
    {
      id: "fc08-l05-q7",
      type: "decision",
      prompt: md`A Series A lead offers a 15 % higher pre-money than the competing term sheet if you accept 1x participating preferred with a 3x cap. Your realistic exit range is EUR 30 to 80 m. What do you do?`,
      options: [
        { text: "Take it: 15 % more valuation is significant.", score: 0.2, feedback: "Participation is paid in exactly that exit range; you have not checked whether the extra valuation covers it." },
        { text: "Model founder proceeds at EUR 30, 50 and 80 m under both term sheets, then decide or counter (e.g. accept the lower valuation with non-participating, or ask for a 2x cap).", score: 1, feedback: "Correct: convert both offers to founder euros in the realistic range before choosing." },
        { text: "Reject any participation on principle without modelling.", score: 0.5, feedback: "Often the right answer, but you should know the number before you refuse; sometimes the extra valuation does pay for it." },
      ],
      explanation: md`Term sheets are compared in founder proceeds across realistic exits, not by headline valuation.`,
      concepts: ["fc08.participation"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "fc08-l05-f1", front: "1x non-participating payout", back: md`$\max(\min(I, E),\ pE)$; converts above $E^{*} = I/p$.`, concepts: ["fc08.liquidation-preference"] },
    { id: "fc08-l05-f2", front: "Participating payout", back: md`$\min(mI, E) + p\max(E - mI, 0)$; costs common $p\,mI$ above the preference.`, concepts: ["fc08.participation"] },
    { id: "fc08-l05-f3", front: "Broad-based weighted average", back: md`$CP_2 = CP_1(A+B)/(A+C)$, A = all fully diluted shares before, B = money/CP1, C = new shares.`, concepts: ["fc08.anti-dilution"] },
    { id: "fc08-l05-f4", front: "Full ratchet", back: "Conversion price resets to the new lower price, regardless of the round size. Refuse.", concepts: ["fc08.anti-dilution"] },
    { id: "fc08-l05-f5", front: "Pro rata amount", back: md`$p\times I_{\text{round}}$`, concepts: ["fc08.pro-rata"] },
    { id: "fc08-l05-f6", front: "Senior vs pari passu", back: "Senior: paid in full before the next class. Pari passu: classes share the preference pot pro rata to their preferences.", concepts: ["fc08.liquidation-preference"] },
    { id: "fc08-l05-f7", front: "Economic vs control terms", back: "Economic: price, pool, preferences, anti-dilution, pro rata. Control: board, protective provisions, drag-along, information rights.", concepts: ["fc08.control-terms"] },
  ],
  scenarios: [
    {
      id: "fc08-s2",
      title: "\"We need 2x participating to make the numbers work\"",
      context: md`Illustrative. A Series A lead likes Afterwave but writes: "At EUR 24 m pre we need a 2x participating preference to make our fund model work." Your other option is a EUR 20 m pre-money, 1x non-participating term sheet from a smaller fund. Both invest EUR 6 m.`,
      start: "a",
      concepts: ["fc08.liquidation-preference", "fc08.participation"],
      nodes: {
        a: {
          md: md`What is your first move?`,
          choices: [
            { text: "Model both at EUR 30 m, 60 m and 120 m exits before replying.", score: 9, feedback: "Lead: 20 % stake, 2x participating takes $12 + 0.2(E-12)$: 15.6 at 30 m, 21.6 at 60 m, 33.6 at 120 m. Other fund: 23.1 %, converts above 26 m: 6.9, 13.8, 27.7. The lead takes EUR 6 to 9 m more in every case.", next: "b" },
            { text: "Accept: the EUR 24 m headline is better for the next round's valuation story.", score: 2, feedback: "The next round will see the 2x participating preference too, and price in the stack.", next: "c" },
          ],
        },
        b: {
          md: md`Your model shows the higher headline costs the existing holders EUR 6 to 9 m in exits from EUR 30 to 120 m. How do you reply to the lead?`,
          choices: [
            { text: "Show the lead your numbers and offer EUR 21 m pre at 1x non-participating; say you have a clean alternative.", score: 10, feedback: "Converts the debate to price, which is negotiable, and away from structure, which compounds." },
            { text: "Ask for 1x participating with a 2x cap at EUR 24 m as a compromise.", score: 6, feedback: "Better than the original, but still costs real money in the EUR 30 to 60 m range; model it before offering." },
          ],
        },
        c: {
          md: md`Two years later an acquirer offers EUR 40 m. The Series A takes $12 + 0.2\times28 = $ EUR 17.6 m (44 % of the proceeds for 20 % of the shares). The founders' team asks why their payout is so low.`,
          choices: [
            { text: "Negotiate a management carve-out with the investors to keep the team motivated through the sale.", score: 4, feedback: "Common damage control, but it is paid for out of a deal that should not have needed it." },
          ],
        },
      },
    },
  ],
};

export default lesson;
