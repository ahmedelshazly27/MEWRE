import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc07-l07",
  title: "Term Sheets: Economics and Control",
  summary:
    "A term sheet sets two things: who gets how much money in each outcome (valuation, option pool, liquidation preference, anti-dilution) and who decides what (board, protective provisions, drag-along, information and pro rata rights). Learn to compute effective pre-money, preference waterfalls and anti-dilution adjustments, and which terms to accept, trade or refuse.",
  minutes: 85,
  objectives: [
    "Separate economic terms from control terms and say which matter in which outcomes",
    "Compute the effective pre-money valuation when the option pool is created in the pre-money",
    "Compute payouts under non-participating and participating liquidation preferences at different exit values",
    "Apply broad-based weighted-average anti-dilution and contrast it with a full ratchet",
    "Write a negotiation position on a seed term sheet: what to accept, what to trade, what to refuse",
  ],
  concepts: [
    { id: "fc07.term-sheet", name: "Term sheet structure", description: "A mostly non-binding summary of a financing (binding on confidentiality, no-shop and costs) whose terms split into economics (who gets money) and control (who decides).", competency: "fc-fundraising", related: ["m13.batna-zopa"] },
    { id: "fc07.option-pool-shuffle", name: "Option-pool shuffle", description: "Requiring a new option pool in the pre-money makes existing holders bear all of its dilution, so the effective pre-money is the headline pre-money minus the pool's post-money value.", competency: "fc-fundraising", related: ["fc07.pre-post-money"] },
    { id: "fc07.liquidation-preference", name: "Liquidation preference", description: "Preferred investors get their money (times a multiple) back before common in a sale or liquidation; non-participating holders choose preference or conversion, participating holders get both.", competency: "fc-fundraising", related: ["fc07.term-sheet"] },
    { id: "fc07.anti-dilution", name: "Anti-dilution protection", description: "Adjustment of the preferred conversion price in a down round; broad-based weighted average is market standard, full ratchet is punitive.", competency: "fc-fundraising", related: ["fc07.liquidation-preference"] },
    { id: "fc07.control-terms", name: "Control terms", description: "Board composition, protective provisions (investor vetoes), drag-along, information rights, pro rata, ROFR and co-sale, founder vesting: they decide who can do what, independent of ownership percentage.", competency: "fc-fundraising", related: ["fc07.term-sheet"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Economics and control, term by term",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`The first term sheet for Afterwave will set terms that every later round copies. A pool sized too big, a participating preference or a broad investor veto costs you more over the life of the company than a point of valuation. You own legal structuring in your ventures; you need to read a term sheet as fluently as a FIDIC clause, know what is market standard in the US, the Netherlands and the Gulf, and negotiate the few terms that matter. The equity mechanics underneath (share classes, vesting, ESOP design, BV and Delaware structures) are covered in the Equity and Legal module (fc08).`,
        },
        {
          kind: "md",
          md: md`### What is binding

A term sheet is mostly **non-binding**, except confidentiality, **exclusivity (no-shop, typically 30 to 60 days)** and sometimes costs. Once signed, you stop talking to other investors, so negotiate everything that matters before signing.

### Economics vs control

| Economics: who gets what money | Control: who decides |
|---|---|
| Pre-money valuation and amount | Board composition |
| Option pool size and where it sits (pre or post) | Protective provisions (investor vetoes) |
| Liquidation preference (multiple, participation) | Drag-along thresholds |
| Anti-dilution | Information rights |
| Dividends (normally non-cumulative, only if declared) | Pro rata (pre-emption) rights |
| Redemption rights (avoid at early stage) | ROFR and co-sale on founder shares |
| Pay-to-play | Founder vesting and acceleration |

### Valuation and the option-pool shuffle

Investors often require a new or enlarged option pool, sized as a percentage of the **post**-money, to be created **in the pre-money**. Then only existing holders are diluted by it:`,
        },
        { kind: "equation", formula: "fc07-effective-pre-money" },
        {
          kind: "md",
          md: md`EUR 12m pre, EUR 3m raise, 20 % post-money pool in the pre: $V_{\text{post}} = 15$, pool $= 3$, effective pre $= 12 - 3 = 9$ EUR m, founders own 60 %. A competing EUR 10.5m pre with a 10 % pool: post 13.5, pool 1.35, effective pre 9.15, founders 67.8 %. The lower headline is the better offer. Negotiate the pool against a **hiring plan** (who you will hire before the next round and the grants they need), not a round number.

### Liquidation preference

In a sale or liquidation, preferred shareholders get their preference before common. The market standard at seed and Series A is **1x non-participating**:`,
        },
        { kind: "equation", formula: "fc07-liq-pref-nonpart" },
        { kind: "equation", formula: "fc07-liq-pref-part" },
        {
          kind: "md",
          md: md`For 1x non-participating, the investor converts when its share of proceeds exceeds its money back: $oV > I$, i.e. $V > I/o = V_{\text{post}}$. Below its own post-money, the preference protects the investor; above it, everyone is pro rata.

| Exit value (EUR m) | 1x non-participating: investor / others | 1x participating (uncapped): investor / others |
|---|---|---|
| 5 | 3.00 / 2.00 | 3.44 / 1.56 |
| 10 | 3.00 / 7.00 | 4.56 / 5.44 |
| 13.5 (= post-money) | 3.00 / 10.50 | 5.33 / 8.17 |
| 30 | 6.67 / 23.33 | 9.00 / 21.00 |
| 100 | 22.22 / 77.78 | 24.56 / 75.44 |

EUR 3m invested for 22.2 % (EUR 10.5m pre). Participation matters most in mid-size exits, exactly the outcomes most likely for most companies. With several rounds, preferences **stack** (later series often senior or pari passu); total preference can exceed a modest acquisition price, leaving common with nothing.

### Anti-dilution

If a later round prices below this round (a down round), the preferred conversion price adjusts:`,
        },
        { kind: "equation", formula: "fc07-weighted-average" },
        {
          kind: "md",
          md: md`**Broad-based weighted average** (A counts all fully diluted shares) is market standard. **Narrow-based** (A counts only preferred or outstanding shares) is harsher. **Full ratchet** resets the conversion price to the new price regardless of how much was raised: refuse it.

### Control terms

- **Board:** at seed, often founders only plus an investor observer, or two founders and one investor. At Series A, commonly 2 founders, 1 investor, or 2-2-1 with an independent. Board control decides CEO hiring and firing, budgets and sale processes.
- **Protective provisions:** a list of actions needing approval of a majority (or more) of preferred: issuing senior or pari passu shares, changing preferred rights, selling or liquidating the company, changing board size, sometimes taking debt above a threshold. Keep the list to actions that change the investor's economic position; refuse operating vetoes (budgets, hiring, product).
- **Drag-along:** a defined majority can force all holders to join a sale. Check the threshold (for example majority of preferred plus majority of common) and that founders are not dragged into terms worse than other holders.
- **Information rights:** monthly or quarterly financials, annual budget. Standard; tie to "major investors" above a cheque size.
- **Pro rata rights:** the right to keep ownership in later rounds. Standard for major investors; YC keeps pro rata.
- **ROFR and co-sale** on founder share transfers, **founder vesting** (often 4 years with a 1-year cliff, sometimes crediting time already served) and acceleration: mechanics in fc08.

### Market standard by region (general patterns)

US seed and Series A documents follow the NVCA model forms; UK follows BVCA forms; Dutch BV rounds use an investment agreement and shareholders' agreement plus articles of association with preference provisions, and new shares are issued by notarial deed. Gulf rounds (ADGM, DIFC or onshore) typically use English-law or NVCA-like terms. Across all, 1x non-participating and broad-based weighted average are the standard you should start from.`,
        },
        {
          kind: "matrix",
          title: "Where to spend negotiation capital",
          xAxis: ["Economic terms", "Control terms"],
          yAxis: ["Usually standard: accept", "Negotiate hard"],
          cells: [
            { label: "Valuation, pool size, participation, multiple above 1x", detail: "Compute effective pre-money and the waterfall at likely exits" },
            { label: "Board composition, veto list scope, drag-along thresholds", detail: "Decide who runs the company in a bad year" },
            { label: "1x non-participating, broad-based WA, non-cumulative dividends", detail: "Market standard; arguing wastes goodwill" },
            { label: "Information rights, pro rata, ROFR and co-sale", detail: "Standard; check thresholds for 'major investor'" },
          ],
          caption: "Spend negotiation capital in the top row; accept the bottom row as written if it matches market standard.",
        },
        { kind: "widget", widget: "cap-table", props: { founders: 3, poolPct: 10 }, caption: "Model founders, pool, SAFEs and a priced round; move the pool between pre and post to see the shuffle." },
      ],
    },
    {
      layer: "applied",
      title: "Comparing two Afterwave term sheets",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Headline price vs effective price (illustrative)",
          given: md`Illustrative seed offers for EUR 3.0m. **Offer A:** EUR 12.0m pre, new pool 20 % of post-money in the pre-money, 1x non-participating, board 2 founders + 1 investor. **Offer B:** EUR 10.5m pre, pool 10 % of post in the pre-money, 1x non-participating, board 2 founders, investor observer. Ignore existing SAFEs and any existing pool.`,
          steps: [
            { md: md`**A:** post $= 15.0$; investor $= 3/15 = 20\%$; pool $= 20\%$; founders $= 60\%$. Effective pre $= 12 - 0.2\times 15 = 9.0$ EUR m.` },
            { md: md`**B:** post $= 13.5$; investor $= 3/13.5 = 22.2\%$; pool $= 10\%$; founders $= 67.8\%$. Effective pre $= 10.5 - 0.1\times 13.5 = 9.15$ EUR m.` },
            { md: md`**Pool need:** the hiring plan (Lesson 2) needs about 7 to 8 % for hires before the Series A. A's 20 % is mostly unallocated at the A, where the A investor will ask for a fresh top-up anyway.` },
            { md: md`**Control:** A puts an investor on the board at seed; B gives an observer seat. With a 2-1 founder board both keep founder control, but A sets a precedent for the A round's board.` },
            { md: md`**Counter to A:** "We like your partnership. We'd accept EUR 12m pre with a 10 % pool sized to our hiring plan (attached), which gives founders 70 %." If A will not move on the pool, B is the better economic offer by 7.8 points of founder ownership.` },
          ],
          result: md`Offer B leaves founders **67.8 %** vs **60 %** under A despite the lower headline. Always convert to effective pre-money and founder ownership before comparing.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "The preference waterfall at a modest exit",
          given: md`Illustrative: an investor put in EUR 3m for 22.2 % (post-money EUR 13.5m) with a 1x preference. The company is acquired for EUR 10m (single preferred class, no debt).`,
          steps: [
            { md: md`As-converted share $= 0.222\times 10 = 2.22$ EUR m, less than the EUR 3m preference, so a non-participating investor takes the preference.` },
            { md: md`Non-participating: investor gets EUR 3m; everyone else shares $10 - 3$.` },
            { md: md`= **EUR 7.0m** for founders, pool and other holders.`, hidden: true, check: { prompt: "Proceeds to others with non-participating preference (EUR m)", answer: 7, unit: "EUR m", tolerance: { abs: 0.02 } } },
            { md: md`Participating: investor gets $3 + 0.222\times(10-3) = 4.56$ EUR m, so others get $10 - 4.56$.` },
            { md: md`= **EUR 5.44m**.`, hidden: true, check: { prompt: "Proceeds to others with participating preference (EUR m)", answer: 5.44, unit: "EUR m", tolerance: { abs: 0.03 } } },
          ],
          result: md`In this EUR 10m exit, participation moves EUR 1.56m from founders and employees to the investor. Above about EUR 13.5m the non-participating investor converts; the participating one keeps double-dipping at every exit value.`,
        },
        {
          kind: "question",
          question: {
            id: "fc07-l07-p1",
            type: "numeric",
            prompt: md`Seed preferred was issued at EUR 1.00 per share. Before a down round there are 8m fully diluted shares. The down round raises EUR 1.5m at EUR 0.60 per share. Under broad-based weighted-average anti-dilution, what is the new seed conversion price (EUR, 3 decimals)?`,
            answer: 0.905,
            tolerance: { abs: 0.002 },
            unit: "EUR/share",
            explanation: md`$B = 1.5\text{m}/1.00 = 1.5$m shares; $C = 1.5\text{m}/0.60 = 2.5$m shares. $CP_2 = 1.00\times(8 + 1.5)/(8 + 2.5) = 9.5/10.5 = 0.905$ EUR. A full ratchet would reset it to 0.600, giving the seed investor about 67 % more shares on conversion instead of about 10 %.`,
            concepts: ["fc07.anti-dilution"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Negotiating a term sheet in practice",
      blocks: [
        {
          kind: "md",
          md: md`### Who does what

- **You:** negotiate valuation, pool, board and the veto list directly with the partner. These are relationship conversations.
- **Your lawyer** (a startup-experienced firm; in the Netherlands also the notary for share issuance): marks up the term sheet, flags off-market terms, drafts or reviews the long-form documents. Fixed-fee seed packages are common; investors often require the company to pay their legal fees up to a cap: check the cap.
- **Your existing investors:** SAFE holders and angels may have pro rata or consent rights; tell them early.

### Process

1. Ask for the term sheet in writing with all economic and control terms, not a summary email.
2. Build the pro forma cap table and the waterfall at three exit values before replying.
3. Reply with one consolidated markup: the few points that matter, with reasons.
4. Sign, then the no-shop starts: close within it.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Terms that should make you stop",
          md: md`- **Participating preference** or a multiple above 1x at seed or Series A.
- **Full-ratchet anti-dilution.**
- **Redemption rights** that let investors demand their money back after a few years.
- **Operating vetoes** (budget, hires, product decisions) inside protective provisions.
- **Cumulative dividends**, which silently grow the preference.
- **A pool far larger than the hiring plan**, created in the pre-money.
- **Long no-shop** (over 60 days) with weak closing conditions.`,
        },
        {
          kind: "ask",
          title: "Questions to ask the lead before signing",
          items: [
            "Can you walk me through the pro forma cap table you expect at closing, including the pool?",
            "Which protective provisions would you need, and why does each one protect your economics?",
            "What board structure do you expect at this round and at the Series A?",
            "What are your conditions to closing, and what confirmatory diligence remains?",
            "What legal-fee cap do you propose, and which law firm and notary do you use?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc07-l07-p2",
            type: "short",
            prompt: md`You receive this illustrative seed term sheet for Afterwave: EUR 3m at EUR 12m pre-money; 18 % post-money pool in the pre-money; 1x participating preference capped at 3x; broad-based weighted-average anti-dilution; board of 2 founders and 1 investor; protective provisions include approval of the annual budget and any hire above EUR 120k salary; 75-day no-shop. Write your **negotiation memo**: compute effective pre-money and founder ownership, rank the terms into accept / trade / refuse with reasons, and draft the three-point counter you will send.`,
            rubric: [
              "Correct effective pre-money (EUR 9.3m) and founder ownership (62 %) with working",
              "Identifies participation (even capped), operating vetoes and the long no-shop as the main issues; treats broad-based WA and 1x as standard",
              "Pool counter tied to a hiring plan with a computed alternative outcome",
              "Counter is concise, prioritised (three points) and preserves the relationship",
              "Mentions the trade-off logic (what you would concede to win the key points) and checks the waterfall at a mid-size exit",
            ],
            modelAnswer: md`**Numbers.** Post $= 15$; investor 20 %; pool $0.18\times 15 = 2.7$; effective pre $= 12 - 2.7 =$ **EUR 9.3m**; founders $= 100 - 20 - 18 =$ **62 %**. With a 10 % pool: effective pre EUR 10.5m, founders 70 %.

**Waterfall check (EUR 15m exit).** Participating: investor $3 + 0.2\times 12 = 5.4$ EUR m vs 3.0 non-participating: EUR 2.4m moves from common.

**Accept:** EUR 12m pre; 1x multiple; broad-based weighted average; 2-1 board (founders keep control); standard information and pro rata rights.

**Trade:** pool size (offer 10 to 12 % sized to the attached hiring plan); no-shop (offer 45 days with a closing timetable).

**Refuse:** participation (ask for 1x non-participating, market standard at seed); budget and hiring vetoes (keep protective provisions to new senior securities, changes to preferred rights, sale or liquidation, board size).

**Counter (to the partner):**
1. "1x non-participating, as is standard at seed; we can't start the company's preference stack with participation."
2. "Protective provisions limited to the standard economic list; operating decisions stay with the board you'll sit on."
3. "Pool of 11 % sized to our hiring plan (attached) and a 45-day no-shop with a closing timetable. On that basis we're ready to sign this week."`,
            explanation: md`A good memo computes before arguing, separates standard terms from real issues, and spends negotiation capital only on the terms that change outcomes or control.`,
            concepts: ["fc07.term-sheet", "fc07.option-pool-shuffle", "fc07.liquidation-preference", "fc07.control-terms"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to Yusuf why a 1x non-participating preference is fair but a participating one is not 'just a small extra', using a EUR 10m and a EUR 100m exit.",
          keyPoints: [
            "Preference returns the investor's money first in a sale or liquidation",
            "Non-participating: investor takes the larger of money back or its pro rata share; converts above its post-money",
            "Participating: money back plus pro rata share of the rest, at every exit value",
            "At EUR 10m the difference is large (EUR 7.0m vs EUR 5.44m to others in the lesson example); at EUR 100m it is small",
            "Mid-size exits are the likely outcomes, so participation mostly takes from founders and employees in realistic cases",
          ],
        },
        { kind: "xref", to: "m13.batna-zopa", note: "Your BATNA in a term sheet negotiation is the next-best term sheet; competition from Lesson 6 is what gives you one." },
        { kind: "sources", refs: ["fc07-r1", "fc07-r15", "fc07-r4"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc07-l07-q1",
      type: "numeric",
      prompt: md`EUR 2m raised at EUR 8m pre-money with a new 15 % post-money pool created in the pre-money. What is the effective pre-money valuation (EUR m)?`,
      answer: 6.5,
      tolerance: { abs: 0.02 },
      unit: "EUR m",
      explanation: md`Post $= 10$; pool $= 0.15\times 10 = 1.5$; effective pre $= 8 - 1.5 = 6.5$ EUR m. Founders own $100 - 20 - 15 = 65\%$.`,
      concepts: ["fc07.option-pool-shuffle"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc07-l07-q2",
      type: "numeric",
      prompt: md`An investor holds 25 % as converted with a 1x non-participating preference on EUR 4m invested. The company sells for EUR 12m. How much does the investor receive (EUR m)?`,
      answer: 4,
      tolerance: { abs: 0.01 },
      unit: "EUR m",
      explanation: md`As converted: $0.25\times 12 = 3$ EUR m < 4, so it takes the preference: EUR 4m. It would convert only above $4/0.25 = 16$ EUR m.`,
      concepts: ["fc07.liquidation-preference"],
      difficulty: 2,
    },
    {
      id: "fc07-l07-q3",
      type: "multi",
      prompt: "Which are control terms rather than economic terms? (Select all that apply.)",
      options: ["Board composition", "Liquidation preference multiple", "Protective provisions", "Drag-along threshold", "Option pool size"],
      answer: [0, 2, 3],
      explanation: md`Board, vetoes and drag-along decide who can do what. Preference and pool size decide who gets what money.`,
      concepts: ["fc07.control-terms"],
      difficulty: 1,
    },
    {
      id: "fc07-l07-q4",
      type: "numeric",
      prompt: md`Original conversion price EUR 2.00; 5m fully diluted shares before a down round that raises EUR 1m at EUR 1.00 per share. New conversion price under broad-based weighted average (EUR, 3 decimals)?`,
      answer: 1.833,
      tolerance: { abs: 0.002 },
      unit: "EUR/share",
      explanation: md`$B = 1/2 = 0.5$m; $C = 1/1 = 1$m. $CP_2 = 2.00\times 5.5/6 = 1.833$. Full ratchet would give 1.00.`,
      concepts: ["fc07.anti-dilution"],
      difficulty: 2,
    },
    {
      id: "fc07-l07-q5",
      type: "mcq",
      prompt: "Which parts of a typical term sheet are binding once signed?",
      options: ["All terms", "Valuation and amount only", "Confidentiality, no-shop (exclusivity) and sometimes costs", "Nothing at all"],
      answer: 2,
      explanation: md`Economic and control terms bind only in the long-form documents; the no-shop binds immediately, which is why you negotiate before signing.`,
      concepts: ["fc07.term-sheet"],
      difficulty: 1,
    },
    {
      id: "fc07-l07-q6",
      type: "decision",
      prompt: md`A lead offers a strong valuation but insists on a protective provision requiring investor approval of the annual budget. Everything else is standard. What do you do?`,
      options: [
        { text: "Propose keeping budget approval at board level (where the investor has a seat) and limiting protective provisions to the standard economic list; offer a quarterly budget review in exchange.", score: 1, feedback: "Addresses the investor's information need without giving a shareholder veto over operations." },
        { text: "Accept; valuation matters more.", score: 0.3, feedback: "An operating veto can block the company in exactly the year you need flexibility." },
        { text: "Walk away from the term sheet immediately.", score: 0.2, feedback: "Premature; this is a negotiable point and the rest is good." },
      ],
      explanation: md`Protective provisions should protect the investor's economic position (senior shares, sale, rights changes), not run the company. Budgets belong to the board.`,
      concepts: ["fc07.control-terms"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "fc07-l07-f1", front: "Effective pre-money", back: md`$V_{\text{pre}} - q V_{\text{post}}$ when the new pool sits in the pre-money.`, concepts: ["fc07.option-pool-shuffle"] },
    { id: "fc07-l07-f2", front: "1x non-participating breakpoint", back: "The investor converts when the exit exceeds its round's post-money value (I / o).", concepts: ["fc07.liquidation-preference"] },
    { id: "fc07-l07-f3", front: "Participating preference", back: "Money back first, then pro rata share of the rest: a double dip that hurts most in mid-size exits.", concepts: ["fc07.liquidation-preference"] },
    { id: "fc07-l07-f4", front: "Broad-based weighted average", back: md`$CP_2 = CP_1 (A+B)/(A+C)$; market standard. Full ratchet resets to the new price: refuse.`, concepts: ["fc07.anti-dilution"] },
    { id: "fc07-l07-f5", front: "Binding parts of a term sheet", back: "Confidentiality, no-shop (30 to 60 days typical) and sometimes costs.", concepts: ["fc07.term-sheet"] },
    { id: "fc07-l07-f6", front: "Standard protective provisions", back: "New senior or pari passu shares, changes to preferred rights, sale or liquidation, board size. Not budgets or hires.", concepts: ["fc07.control-terms"] },
    { id: "fc07-l07-f7", front: "Terms to refuse at seed", back: "Participation, multiple above 1x, full ratchet, redemption, cumulative dividends, operating vetoes.", concepts: ["fc07.control-terms", "fc07.liquidation-preference"] },
  ],
};

export default lesson;
