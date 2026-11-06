import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc08-l01",
  title: "Cap tables and dilution math",
  summary:
    "What a cap table records, issued versus fully diluted shares, the one-line dilution formula, how many shares a round must issue, and why owning a smaller slice of a larger company is the point.",
  minutes: 55,
  objectives: [
    "Read a cap table and compute each holder's fully diluted ownership",
    "Derive and apply the dilution formula across several rounds",
    "Compute the number of new shares and the price per share for a target investor stake",
    "Build a pro-forma cap table for a venture through pool creation, seed and Series A",
    "Spot the cap-table errors that stall due diligence",
  ],
  concepts: [
    { id: "fc08.cap-table", name: "Capitalization table", description: "The ledger of every share, option, warrant and convertible instrument, by holder and class, with ownership percentages.", competency: "fc-legal" },
    { id: "fc08.fully-diluted", name: "Fully diluted ownership", description: "Ownership measured against all shares that exist or could exist: issued shares, granted options, the unallocated pool and warrants (and converting instruments once their terms are fixed).", competency: "fc-legal", related: ["fc08.cap-table"] },
    { id: "fc08.dilution", name: "Dilution", description: "The reduction in a holder's percentage when new shares are issued; each round multiplies every existing stake by (1 - d).", competency: "fc-legal", related: ["fc08.fully-diluted"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What a cap table is and how dilution works",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You will negotiate the Afterwave seed and maybe a YC deal, grant equity to early hires and advisors, and set up Mizan with partners. Every one of those decisions is a line in a cap table. If you cannot reproduce the table yourself, you cannot tell whether a term sheet is generous or expensive, and investors notice within minutes when a founder does not know his own fully diluted number.`,
        },
        {
          kind: "md",
          md: md`### The ledger

A **cap table** lists every security the company has issued or promised:

| Layer | What it is | Is it a share today? |
|---|---|---|
| Common (ordinary) shares | Founders, early employees after exercise | Yes |
| Preferred shares | Issued to investors in priced rounds, with extra rights (Lesson 5) | Yes |
| Granted options | Rights to buy common at a fixed exercise price, subject to vesting | No, but will be |
| Unallocated option pool | Shares reserved for future grants | No, but investors count it |
| Warrants | Rights to buy shares, often given to lenders or partners | No, but will be |
| SAFEs and convertible notes | Contracts that become shares at the next priced round | No; share count unknown until then |

**Issued and outstanding** shares are the first two rows. **Fully diluted (FD)** shares add everything that can become a share. Investors always price and quote percentages on a fully diluted basis, so you should too:`,
        },
        { kind: "equation", formula: "fc08-ownership" },
        {
          kind: "md",
          md: md`### Deriving the dilution formula

You hold $n$ of $N$ fully diluted shares, so $p_{\text{before}} = n/N$. The company issues $\Delta N$ new shares. Your share count does not change; the denominator does:

$$p_{\text{after}} = \frac{n}{N + \Delta N} = \frac{n}{N}\cdot\frac{N}{N+\Delta N} = p_{\text{before}}\left(1 - \frac{\Delta N}{N+\Delta N}\right).$$

Call $d = \Delta N/(N+\Delta N)$ the fraction sold. In a priced round the new investor pays $I$ for exactly that fraction of the post-money company, so $d = I/V_{\text{post}}$:`,
        },
        { kind: "equation", formula: "fc08-dilution" },
        {
          kind: "md",
          md: md`Three consequences:

1. **Everyone is diluted by the same factor.** A 40 % founder and a 5 % angel both keep $(1-d)$ of their stake.
2. **Rounds multiply.** Selling 20 %, then 20 %, then 15 % leaves $0.8\times0.8\times0.85 = 0.544$. A founder who starts at 40 % ends at 21.8 % before any pool top-ups.
3. **Dilution is not value loss when the price rises.** 30 % of a company worth EUR 2 m is EUR 0.6 m; 24 % of a company worth EUR 10 m after a round is EUR 2.4 m. What you should resist is dilution at a *low* price, or dilution that does not buy enough runway to reach the next milestone.

### How many shares to issue

Rearrange $d = \Delta N/(N+\Delta N)$ for $\Delta N$:`,
        },
        { kind: "equation", formula: "fc08-new-shares" },
        {
          kind: "md",
          md: md`To give a seed investor 20 % of an 11,111,111-share company you issue $11{,}111{,}111\times0.20/0.80 = 2{,}777{,}778$ shares, **not** 20 % of 11.1 m. The same formula sizes a pool that must equal 10 % of the post-pool total. The share count itself is arbitrary (a BV can have 100 shares or 10 m); what matters is ratios. Start with a large count (several million) so small grants are whole numbers.`,
        },
        {
          kind: "chart",
          chart: "stacked-bar",
          title: "Illustrative Afterwave ownership through three steps (fully diluted, %)",
          xKey: "step",
          xLabel: "Step",
          yLabel: "Ownership (%)",
          series: [
            { key: "founders", label: "Founders" },
            { key: "pool", label: "Option pool" },
            { key: "seed", label: "Seed investors" },
            { key: "seriesA", label: "Series A" },
          ],
          data: [
            { step: "Founding", founders: 100, pool: 0, seed: 0, seriesA: 0 },
            { step: "10 % pool", founders: 90, pool: 10, seed: 0, seriesA: 0 },
            { step: "Seed (20 %)", founders: 72, pool: 8, seed: 20, seriesA: 0 },
            { step: "Series A (20 %)", founders: 57.6, pool: 6.4, seed: 16, seriesA: 20 },
          ],
          caption: "Each step multiplies every earlier holder by (1 - d). Numbers from the worked example below; illustrative only, not Afterwave's real cap table.",
        },
        { kind: "widget", widget: "cap-table", caption: "Run the same sequence: change founder shares and pool size, add SAFEs and a Series A, and watch the fully diluted percentages." },
      ],
    },
    {
      layer: "applied",
      title: "A pro-forma cap table for Afterwave",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Founding to seed: pool creation and a priced seed round",
          given: md`**Illustrative**, not the real Afterwave split or terms. Three founders hold 10,000,000 common shares: Founder 1 (CEO) 4,000,000, Founders 2 and 3 3,000,000 each. Before the seed the company reserves an option pool equal to 10 % of the fully diluted total. A seed investor then puts in EUR 2,000,000 at EUR 8,000,000 pre-money.`,
          steps: [
            { md: md`**Pool size.** Target $d = 0.10$ of the post-pool total: $\Delta N = 10{,}000{,}000\times0.10/0.90 = 1{,}111{,}111$ pool shares. FD total $= 11{,}111{,}111$. Founder 1: $4{,}000{,}000/11{,}111{,}111 = 36.0\%$.` },
            { md: md`**Seed stake.** $V_{\text{post}} = 8 + 2 = $ EUR 10 m, so $d = 2/10 = 20\%$.` },
            { md: md`**Price per share.** $P = V_{\text{pre}}/N_{\text{pre,FD}} = 8{,}000{,}000/11{,}111{,}111 = $ **EUR 0.72**.` },
            { md: md`**New shares.** $2{,}000{,}000/0.72 = 2{,}777{,}778$ (check: $11{,}111{,}111\times0.25 = 2{,}777{,}778$). Post-seed FD total $= 13{,}888{,}889$.` },
            {
              md: md`**Post-seed cap table:**

| Holder | Shares | FD % |
|---|---|---|
| Founder 1 (CEO) | 4,000,000 | 28.8 % |
| Founder 2 | 3,000,000 | 21.6 % |
| Founder 3 | 3,000,000 | 21.6 % |
| Option pool | 1,111,111 | 8.0 % |
| Seed investor | 2,777,778 | 20.0 % |
| **Total** | **13,888,889** | **100 %** |`,
            },
            { md: md`**Check with the formula.** Founder 1: $36.0\%\times(1-0.20) = 28.8\%$. Value of the stake at the seed price: $4{,}000{,}000\times0.72 = $ EUR 2.88 m (on paper; common is worth less than preferred in practice).` },
          ],
          result: md`The seed costs every holder 20 % of their stake; the founders together go from 90 % to 72 %. The pool also shrinks from 10 % to 8 %, which is why investors usually ask for a top-up before the next round (Lesson 3).`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Add the Series A",
          given: md`Start from the post-seed table above (13,888,889 FD shares). A Series A investor puts in EUR 6,000,000 at EUR 24,000,000 pre-money. Assume no pool top-up. Illustrative.`,
          steps: [
            { md: md`$V_{\text{post}} = 24 + 6 = $ EUR 30 m, so $d = 6/30 = 20\%$.` },
            { md: md`Price per share $= 24{,}000{,}000/13{,}888{,}889$.` },
            { md: md`= **EUR 1.728** per share.`, hidden: true, check: { prompt: "Series A price per share (EUR)", answer: 1.728, unit: "EUR/share", tolerance: { abs: 0.002 } } },
            { md: md`New shares $= 6{,}000{,}000/1.728 = 3{,}472{,}222$; FD total $= 17{,}361{,}111$.`, hidden: true, check: { prompt: "Series A shares issued", answer: 3472222, unit: "shares", tolerance: { rel: 0.001 } } },
            { md: md`Founder 1: $4{,}000{,}000/17{,}361{,}111 = 23.04\%$ (or $28.8\%\times0.8$).`, hidden: true, check: { prompt: "Founder 1 fully diluted ownership after the Series A (%)", answer: 23.04, unit: "%", tolerance: { abs: 0.05 } } },
          ],
          result: md`After two 20 % rounds the CEO holds 23.04 % (founders together 57.6 %, pool 6.4 %, seed 16 %, Series A 20 %). Paper value of the CEO stake at the Series A price: $4{,}000{,}000\times1.728 = $ EUR 6.9 m, up from EUR 2.88 m at the seed: diluted and richer.`,
        },
        {
          kind: "question",
          question: {
            id: "fc08-l01-p1",
            type: "numeric",
            prompt: md`A founder owns 50 % fully diluted. The company then sells 20 % in a seed round, tops up the option pool by issuing new pool shares equal to 5 % of the post-top-up total, and sells 25 % in a Series A. What does the founder own at the end? (%, 1 decimal)`,
            answer: 28.5,
            tolerance: { abs: 0.1 },
            unit: "%",
            explanation: md`Each step multiplies by $(1-d)$: $50\%\times0.80\times0.95\times0.75 = 28.5\%$. A pool top-up dilutes exactly like a round, it just raises no money.`,
            concepts: ["fc08.dilution"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Keeping a clean cap table in practice",
      blocks: [
        {
          kind: "md",
          md: md`### Who keeps it and where

- **The legal record** is the shareholders' register. A Dutch BV must keep one (aandeelhoudersregister) and shares are issued and transferred by notarial deed, so the notary's deeds and the register must agree. A Delaware C-corp keeps a stock ledger, and issuances need board approval.
- **The working model** is a spreadsheet (fine until about the seed) or a cap-table tool such as Carta, Pulley or Ledgy. The model must reconcile, share for share, to the legal record.
- **Your lawyer** prepares the pro-forma for each round; you should be able to rebuild it and catch errors, because the lawyer works from what you tell them.

### What goes wrong

- **Informal promises.** "You'll get 2 % for helping" in an email or WhatsApp to an advisor is a liability in due diligence. Either document it (an advisor agreement with vesting) or retract it in writing.
- **Missing convertibles.** Every SAFE and note must appear as a row with its cap, discount and amount, even though the share count is unknown until the priced round.
- **Wrong base.** Percentages quoted on issued shares instead of fully diluted; pool sized as a percentage of the wrong total.
- **Founder shares never formally issued**, or issued without vesting, or held personally when the plan was a personal holding company (Lesson 6).
- **Register out of date** after transfers, so the legal record and the model disagree.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "The diligence test",
          md: md`A seed investor's lawyer will ask for the cap table, every deed or board consent behind it, every SAFE and option agreement, and a fully diluted pro-forma for the round. If any row cannot be traced to a signed document, closing waits until it is fixed. Fixing old mistakes after the fact (re-papering a grant, buying back a promised stake) costs far more than doing it right the first time.`,
        },
        {
          kind: "checklist",
          title: "Cap table hygiene",
          items: [
            "One master cap table with issued, granted, pool, warrants and convertibles in separate rows",
            "Every row tied to a signed document (deed, board resolution, SAFE, option or advisor agreement)",
            "Fully diluted percentages, with the base stated in the header",
            "A pro-forma tab per scenario: next SAFE, next priced round, pool top-up",
            "Shareholders' register (or stock ledger) reconciled after every change",
            "No equity promised in writing that is not on the table",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask your lawyer before a round",
          items: [
            "Which instruments are included in the pre-money fully diluted share count in this term sheet?",
            "Does the pro-forma reconcile to the shareholders' register and every deed share for share?",
            "Are any outstanding promises (advisors, early contributors) that we must paper before closing?",
            "How large must the pool be post-closing, and is the top-up in the pre-money?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc08-l01-p2",
            type: "short",
            prompt: md`Produce a pro-forma cap table scenario for **Afterwave** (illustrative numbers, clearly labelled). Start with a founder share count and split of your choice for the three founders, create an option pool, add one seed round with a stated amount and pre-money valuation, and show the fully diluted table after the seed. Then state, in one or two sentences, the single number you would watch most closely in negotiation and why.`,
            rubric: [
              "Numbers are labelled illustrative and the table has holder, shares and fully diluted % columns that sum to 100 %",
              "Pool shares are computed with N d/(1-d) (or equivalent) on the correct base",
              "Seed price per share = pre-money / pre-money fully diluted shares, and new shares = investment / price",
              "Each founder's post-seed % equals pre-seed % times (1 - d), and the arithmetic is internally consistent",
              "Identifies a sensible key number (e.g. founders' combined FD % after the round, or the pool size inside the pre-money) with a reason tied to control, incentives or the next round",
            ],
            modelAnswer: md`**Illustrative only.** 9,000,000 founder shares split 3,600,000 (CEO) / 2,700,000 / 2,700,000. Pool 12 % of FD: $9{,}000{,}000\times0.12/0.88 = 1{,}227{,}273$; FD total 10,227,273. Seed EUR 1.5 m at EUR 6 m pre: $V_{\text{post}} = $ EUR 7.5 m, $d = 20\%$. Price $= 6{,}000{,}000/10{,}227{,}273 = $ EUR 0.5867. New shares $= 1{,}500{,}000/0.5867 = 2{,}556{,}818$. FD total 12,784,091.

| Holder | Shares | FD % |
|---|---|---|
| CEO | 3,600,000 | 28.2 % |
| Founder 2 | 2,700,000 | 21.1 % |
| Founder 3 | 2,700,000 | 21.1 % |
| Pool | 1,227,273 | 9.6 % |
| Seed | 2,556,818 | 20.0 % |
| Total | 12,784,091 | 100 % |

Check: CEO $35.2\%\times0.8 = 28.2\%$. **Key number:** founders' combined 70.4 % after the seed, because it must stay comfortably above 50 % after a Series A of about 20 % plus a pool top-up (roughly 52 % to 55 %), or the founders lose majority control two rounds earlier than they need to.`,
            explanation: md`A good answer computes every row from the formulas (pool with $N\,d/(1-d)$, price as pre-money over pre-money fully diluted shares), states that the numbers are illustrative, and links the key number to control or the next round rather than to the headline valuation.`,
            concepts: ["fc08.cap-table", "fc08.dilution", "fc08.fully-diluted"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to Ismail and Yusuf why going from 33 % to 26 % after a seed round can make them richer, and when dilution really is bad.",
          keyPoints: [
            "Value of a stake = percentage x company valuation; a round raises the valuation",
            "Every holder is multiplied by the same (1 - d), so dilution is shared, not targeted",
            "Dilution is bad when the price per share is low or the money does not buy a milestone that raises the next price",
            "Pool top-ups dilute like a round but raise no cash",
            "Percentages must be fully diluted to be comparable",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "fc08-l01-q1",
      type: "mcq",
      prompt: "Which share count do investors use when they say 'you will own 20 %'?",
      options: ["Issued common shares only", "Issued and outstanding shares (common and preferred)", "Fully diluted shares: issued shares plus granted options, the unallocated pool and warrants", "Authorised share capital in the articles"],
      answer: 2,
      explanation: md`Venture percentages are fully diluted. Issued-only percentages overstate everyone, because options and the pool will become shares. Authorised capital is a legal ceiling, not ownership.`,
      concepts: ["fc08.fully-diluted"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc08-l01-q2",
      type: "numeric",
      prompt: md`A company has 8,000,000 fully diluted shares. An investor must end up with 25 % of the post-round total. How many new shares are issued?`,
      answer: 2666667,
      tolerance: { rel: 0.001 },
      unit: "shares",
      explanation: md`$\Delta N = N\,d/(1-d) = 8{,}000{,}000\times0.25/0.75 = 2{,}666{,}667$. Check: $2.667/(8+2.667) = 25\%$.`,
      concepts: ["fc08.dilution"],
      difficulty: 1,
    },
    {
      id: "fc08-l01-q3",
      type: "numeric",
      prompt: md`A founder starts at 45 % and goes through rounds selling 15 %, 20 % and 18 %. What is the founder's final fully diluted ownership? (%, 1 decimal)`,
      answer: 25.1,
      tolerance: { abs: 0.1 },
      unit: "%",
      explanation: md`$45\%\times0.85\times0.80\times0.82 = 25.09\%$.`,
      concepts: ["fc08.dilution"],
      difficulty: 1,
    },
    {
      id: "fc08-l01-q4",
      type: "multi",
      prompt: "Which items belong on a complete cap table? (Select all.)",
      options: ["Unallocated option pool", "Signed SAFEs, with cap and discount", "Granted but unvested options", "A verbal promise of equity to an advisor", "Warrants issued to a lender"],
      answer: [0, 1, 2, 4],
      explanation: md`A verbal promise is not a security; it is a risk to resolve (paper it or withdraw it) before diligence. Everything else is a real or future share and must be tracked.`,
      concepts: ["fc08.cap-table"],
      difficulty: 1,
    },
    {
      id: "fc08-l01-q5",
      type: "numeric",
      prompt: md`Pre-money EUR 9 m, pre-money fully diluted shares 12,000,000, raise EUR 3 m. What is the price per share? (EUR, 2 decimals)`,
      answer: 0.75,
      tolerance: { abs: 0.005 },
      unit: "EUR/share",
      explanation: md`$P = V_{\text{pre}}/N_{\text{pre,FD}} = 9{,}000{,}000/12{,}000{,}000 = $ EUR 0.75. The investor gets $3{,}000{,}000/0.75 = 4{,}000{,}000$ shares $= 25\%$ of 16 m.`,
      concepts: ["fc08.cap-table", "fc08.dilution"],
      difficulty: 1,
    },
    {
      id: "fc08-l01-q6",
      type: "decision",
      prompt: md`Two weeks before a seed closing you find an old email in which you offered a former mentor "1 % for his help". Nothing was signed. What do you do?`,
      options: [
        { text: "Ignore it; it was never signed.", score: 0, feedback: "Unsigned promises still surface in diligence or later as claims. Ignoring it is the expensive option." },
        { text: "Tell your lawyer now, then either paper it as an advisor grant with vesting (if it was earned and you want to honour it) or agree in writing with the mentor that no equity is owed.", score: 1, feedback: "Correct: disclose, resolve on paper, and keep the cap table complete before closing." },
        { text: "Issue him 1 % of common immediately with no vesting to close the matter.", score: 0.3, feedback: "Resolves the claim but gives away fully vested equity without process, board approval or advisor terms." },
      ],
      explanation: md`Clean cap tables come from resolving every promise in writing. Disclosure to your counsel before closing is cheap; a dispute after the round is not.`,
      concepts: ["fc08.cap-table"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc08-l01-f1", front: "Fully diluted shares", back: "Issued shares + granted options + unallocated pool + warrants (and convertibles once their terms fix a share count).", concepts: ["fc08.fully-diluted"] },
    { id: "fc08-l01-f2", front: "Dilution formula", back: md`$p_{\text{after}} = p_{\text{before}}(1-d)$, with $d = I/V_{\text{post}}$`, concepts: ["fc08.dilution"] },
    { id: "fc08-l01-f3", front: "New shares for a target stake d", back: md`$\Delta N = N\,d/(1-d)$: for 20 % issue 25 % of the existing count.`, concepts: ["fc08.dilution"] },
    { id: "fc08-l01-f4", front: "Price per share in a priced round", back: md`$P = V_{\text{pre}}/N_{\text{pre,FD}}$`, concepts: ["fc08.cap-table"] },
    { id: "fc08-l01-f5", front: "Three rounds of 20 %, 20 %, 15 %: what fraction of your stake remains?", back: "0.8 x 0.8 x 0.85 = 0.544 (54.4 %).", concepts: ["fc08.dilution"] },
    { id: "fc08-l01-f6", front: "When is dilution bad?", back: "When it happens at a low price, or the money raised does not buy the milestone that lifts the next round's price.", concepts: ["fc08.dilution"] },
  ],
};

export default lesson;
