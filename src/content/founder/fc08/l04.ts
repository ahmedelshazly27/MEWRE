import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc08-l04",
  title: "Vesting, founder splits, acceleration and founder tax",
  summary:
    "Why founders vest, how cliffs and monthly vesting compute, good and bad leaver terms, single versus double trigger acceleration, how to split founder equity, the US 83(b) election, and the Dutch equivalents (leaver clauses, holding companies, option taxation and the proposed 2027 regime).",
  minutes: 70,
  objectives: [
    "Compute vested and unvested shares at any date, with cliff and acceleration",
    "Explain reverse vesting and how Dutch leaver clauses achieve it",
    "Propose a founder split and vesting terms you can defend to cofounders and investors",
    "Explain the 83(b) election and what goes wrong if it is missed",
    "Describe at concept level how Dutch founder and employee equity is taxed today and under the proposed 2027 option regime",
  ],
  concepts: [
    { id: "fc08.vesting-cliff", name: "Vesting and cliff", description: "Equity is earned over time (typically 48 months, monthly) with nothing earned before a cliff (typically 12 months); founders use reverse vesting on shares they already own.", competency: "fc-legal", related: ["fc08.cap-table"] },
    { id: "fc08.leaver-terms", name: "Good and bad leaver", description: "Shareholders' agreement terms that oblige a departing founder to offer shares back, at fair value or nominal value depending on vesting and the reason for leaving.", competency: "fc-legal", related: ["fc08.vesting-cliff"] },
    { id: "fc08.acceleration", name: "Single and double trigger acceleration", description: "Faster vesting on a change of control alone (single) or on a change of control followed by termination without cause (double).", competency: "fc-legal", related: ["fc08.vesting-cliff"] },
    { id: "fc08.founder-split", name: "Founder equity split", description: "Initial division of founder shares based on role, commitment, contribution and opportunity cost; vesting matters more than the exact split.", competency: "fc-legal", related: ["fc08.vesting-cliff"] },
    { id: "fc08.83b-election", name: "83(b) election (US)", description: "A US tax election, filed within 30 days of receiving restricted stock, to be taxed on its value at grant rather than at each vesting date.", competency: "fc-legal", related: ["fc08.vesting-cliff"] },
    { id: "fc08.nl-equity-tax", name: "Dutch founder and option taxation", description: "Founders typically hold through a personal holding BV; employee options are taxed as wage income; a proposed 2027 regime would tax 65 % of the gain and defer it to sale.", competency: "fc-legal", related: ["fc08.83b-election"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "How vesting works and why investors insist on it",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You are a founder in three ventures with different cofounders. If one of them leaves Afterwave or Mizan after a year holding a third of the company, that stake is **dead equity**: it does no work, it cannot be re-granted, and investors will ask how you plan to fix it. Vesting is the mechanism that prevents this, and it has to be in place before the first investor, because putting it in later means asking cofounders to give something up.`,
        },
        {
          kind: "md",
          md: md`### The standard schedule

Four years, one-year cliff, monthly thereafter:`,
        },
        { kind: "equation", formula: "fc08-vesting" },
        {
          kind: "md",
          md: md`At month 11, nothing has vested. At month 12, 25 % vests at once. Each month after, another $1/48$. The cliff exists so that a cofounder or hire who leaves in the first year walks away with nothing, which makes early separations clean.

**Reverse vesting for founders.** Founders usually own their shares from incorporation (they paid nominal value). Vesting is then imposed in reverse: if a founder leaves, the company (or the other shareholders) may buy back the **unvested** part at a low price. It is common to give founders **credit** for time already worked by backdating the vesting start, and some founder schedules start without a cliff for that reason.

### Good leaver and bad leaver (how Europe does reverse vesting)

In a Dutch BV the buyback is built from the articles' transfer restrictions plus a **shareholders' agreement** clause that obliges a leaver to offer shares for sale. The price depends on why the founder left:

| | Vested shares | Unvested shares |
|---|---|---|
| **Good leaver** (death, illness, dismissal without cause, agreed departure) | Fair market value, or kept | Nominal value (or cost) |
| **Bad leaver** (resignation within a minimum period, dismissal for cause, breach of non-compete) | Often nominal or the lower of nominal and fair value | Nominal value |

Definitions are negotiated hard. "Bad leaver" covering a plain resignation after three years is aggressive; covering fraud is standard.

### Acceleration

- **Single trigger:** some or all unvested shares vest on a change of control. Investors and acquirers dislike it, because it removes the acquirer's retention tool and lowers the price they will pay.
- **Double trigger:** acceleration requires a change of control **and** the founder being terminated without cause (or resigning for good reason) within a window, often 12 months. This is the market norm for founders; 50 to 100 % of unvested shares is common.

### Splitting founder equity

There is no formula, but there are mechanisms. Weigh: who is **full time** now, who brings **IP or capital**, who carries the **future role** (CEO, CTO), and **opportunity cost** (salary given up). Then let vesting do the protective work: an equal split with vesting is safer than a "fair" unequal split without it. Two traps: a 50/50 two-founder company with no deadlock mechanism, and splits that reflect the idea instead of the next four years of work.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "Illustrative: vested shares for a 3,000,000-share founder grant (thousands)",
          xKey: "month",
          xLabel: "Months since vesting start",
          yLabel: "Vested shares (thousands)",
          series: [
            { key: "standard", label: "4-year, 1-year cliff" },
            { key: "accel", label: "Acquired at month 30 and terminated: 50 % double-trigger" },
          ],
          data: [
            { month: 0, standard: 0, accel: 0 },
            { month: 6, standard: 0, accel: 0 },
            { month: 11, standard: 0, accel: 0 },
            { month: 12, standard: 750, accel: 750 },
            { month: 18, standard: 1125, accel: 1125 },
            { month: 24, standard: 1500, accel: 1500 },
            { month: 30, standard: 1875, accel: 2437.5 },
            { month: 36, standard: 2250, accel: 2437.5 },
            { month: 42, standard: 2625, accel: 2437.5 },
            { month: 48, standard: 3000, accel: 2437.5 },
          ],
          caption: "The cliff is the jump at month 12. With double-trigger acceleration the founder gets 50 % of the unvested shares at termination, then stops vesting.",
        },
        {
          kind: "md",
          md: md`### Tax: the US 83(b) election and the Dutch equivalents

**US.** Shares subject to vesting are, for US tax, not yet "yours" (they carry a substantial risk of forfeiture). By default, each time a tranche vests, the founder has **ordinary income** equal to its value then, minus what was paid, with no cash to pay the tax. Under section 83(b) the founder can elect, **within 30 days** of receiving the shares, to be taxed at grant instead. At incorporation the value equals the nominal price paid, so the taxable amount is about zero and later growth is capital gain. The deadline cannot be extended; missing it is one of the few founder mistakes that cannot be repaired. If Afterwave becomes a Delaware company, every US-taxpayer founder and early holder of restricted stock should file; non-US founders need a cross-border adviser to confirm whether it matters for them.

**Netherlands.** There is no 83(b) election. The questions are different:

| Topic | Dutch practice (concept level) |
|---|---|
| Founder shares | Usually held through a **personal holding BV**; dividends and sale gains from the operating BV flow up largely tax-free under the participation exemption, and are taxed in box 2 when paid out to the founder personally |
| Shares bought at nominal value at incorporation | No wage income if price equals value; leaver clauses (reverse vesting) do not by themselves create a tax moment |
| Shares or options for work later (employees, late cofounders) | Benefit is taxed as **wage** (box 1) if received below value; special rules for "lucrative interests" can pull returns into box 1 |
| Employee options today | Taxed as wage when the shares become tradable, or at exercise if the holder elects, often before any cash is available |
| Many Dutch start-ups | Grant depositary receipts via a **STAK** (Lesson 6) or virtual (phantom) shares paid in cash |

The proposed 2027 change matters for every Dutch option plan you design:`,
        },
        { kind: "equation", formula: "fc08-nl-option-2027" },
        {
          kind: "callout",
          tone: "unverified",
          title: "Dutch option regime from 2027: proposed, not confirmed",
          md: md`The *Wet fiscale stimulering startups en scale-ups* (public consultation 1 to 29 April 2026) is intended to apply from **1 January 2027**: only **65 %** of the option gain would be taxed and the tax would be **deferred until the shares are sold**, for options granted from **17 April 2025**. Sources are law-firm summaries (Loyens & Loeff, KPMG, CMS), not the enacted text. Before relying on it, confirm that it was enacted, which companies and employees qualify (start-up and scale-up criteria) and the final percentages with a Dutch tax adviser. The box 1 and box 2 rates also change yearly: check the current year.`,
        },
        { kind: "sources", refs: ["fc08-r5", "fc08-r6", "fc08-r7", "fc08-r18"] },
      ],
    },
    {
      layer: "applied",
      title: "Vesting and tax numbers for Afterwave",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "A cofounder leaves: what vests, what comes back, and the 83(b) difference",
          given: md`**Illustrative.** Founder 3 holds 3,000,000 shares bought at nominal value, on 4-year monthly vesting with a 1-year cliff. Two cases: leaves at month 11, or leaves at month 20 as a good leaver. Separately, a US-taxpayer founder of a Delaware company bought 1,000,000 restricted shares at USD 0.0001 (USD 100 total) when that was their value; one year later 250,000 shares vest when the 409A value is USD 0.50 per share.`,
          steps: [
            { md: md`**Month 11:** $t < t_c$, so 0 shares vested. All 3,000,000 are offered back at nominal value. The company is clean; the departing founder gets nothing.` },
            { md: md`**Month 20:** vested $= 3{,}000{,}000\times20/48 = $ **1,250,000**. Unvested 1,750,000 go back at nominal value. As a good leaver the founder keeps (or sells at fair value) the 1,250,000, about $1{,}250{,}000/13{,}888{,}889 = 9.0\%$ on the post-seed table of Lesson 1.` },
            { md: md`**Without vesting** the same founder would keep 3,000,000 shares (21.6 % post-seed) after 20 months of work. That is the dead-equity problem a seed investor will refuse to fund.` },
            { md: md`**US, no 83(b):** at month 12 the founder has ordinary income of $250{,}000\times(0.50 - 0.0001) \approx$ **USD 124,975**, with no cash from the company, and again at every later vesting date at that date's value.` },
            { md: md`**US, with 83(b) filed within 30 days of purchase:** income at grant $= 1{,}000{,}000\times(0.0001 - 0.0001) = 0$. No tax at vesting; the gain is taxed as capital gain when the shares are sold.` },
          ],
          result: md`The cliff and monthly vesting decide who owns what after a departure; the 83(b) election decides whether US founders pay income tax on paper gains every year. Both cost almost nothing to set up at incorporation and are expensive or impossible to fix later.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Acceleration on an acquisition, and a Dutch option gain",
          given: md`**Illustrative.** The same 3,000,000-share grant. At month 30 Afterwave is acquired and the acquirer terminates the founder without cause. The founder has 50 % double-trigger acceleration. Separately, a Dutch employee's options produce a gain of EUR 100,000; assume a 49.5 % marginal box 1 rate.`,
          steps: [
            { md: md`Vested at month 30 $= 3{,}000{,}000\times30/48 = 1{,}875{,}000$; unvested $= 1{,}125{,}000$.` },
            { md: md`Accelerated $= 0.5\times1{,}125{,}000 = 562{,}500$; total vested $= $ **2,437,500**.`, hidden: true, check: { prompt: "Total vested shares after acceleration", answer: 2437500, unit: "shares", tolerance: { abs: 1 } } },
            { md: md`With single-trigger 100 % acceleration all 3,000,000 would vest at closing, whether or not the founder stays; that is why acquirers price it in.` },
            { md: md`Dutch employee, current rules: tax $= 0.495\times100{,}000 = $ EUR 49,500, possibly due when the shares become tradable, before any sale.` },
            { md: md`Proposed 2027 rules: taxable base $= 0.65\times100{,}000 = 65{,}000$; tax $= 0.495\times65{,}000 = $ **EUR 32,175**, deferred to sale.`, hidden: true, check: { prompt: "Tax under the proposed 2027 regime (EUR)", answer: 32175, unit: "EUR", tolerance: { abs: 5 } } },
          ],
          result: md`Double trigger protects the founder against being fired after a sale without handing the acquirer a reason to cut the price. If the Dutch proposal is enacted as summarised, the effective rate on an option gain falls from 49.5 % to about 32.2 % and the tax moves to the moment there is cash, which makes Dutch option plans much more useful for hiring.`,
        },
        {
          kind: "question",
          question: {
            id: "fc08-l04-p1",
            type: "numeric",
            prompt: md`An early engineer receives 120,000 options on a 4-year monthly schedule with a 1-year cliff and leaves after 31 months. How many options have vested?`,
            answer: 77500,
            tolerance: { abs: 1 },
            unit: "options",
            explanation: md`Past the cliff, so $120{,}000\times31/48 = 77{,}500$. The other 42,500 return to the pool. Check the plan's post-termination exercise window (often 90 days) for the vested ones.`,
            concepts: ["fc08.vesting-cliff"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Setting up founder equity properly",
      blocks: [
        {
          kind: "md",
          md: md`### Documents and who drafts them

- **Founders' agreement or term sheet** (you, then the lawyer): split, roles, vesting, leaver terms, IP assignment, decision-making and deadlock.
- **Articles of association** (notary, NL): share classes and transfer restrictions (the BV's blocking clause).
- **Shareholders' agreement** (lawyer): leaver clauses with prices, drag-along and tag-along, non-compete, information rights. Investors will later rewrite it, but they will start from yours.
- **Option plan and grant letters**, or a STAK with depositary receipts (Lesson 6), or a virtual share plan.
- **US only:** stock purchase agreement with repurchase right, and an **83(b) election** posted to the IRS within 30 days (keep proof of mailing).

### What goes wrong

- No vesting at incorporation "because we trust each other": fixed later under investor pressure, at the worst moment.
- A cofounder who is still employed elsewhere (part-time, notice period) gets the same split and schedule as the full-timers.
- Vesting start dates and credit for past work not written down.
- Bad leaver defined so broadly that cofounders see it as a threat, or so narrowly that it never applies.
- 83(b) not filed after a flip or a new US share issue.
- Option tax designed on the current Dutch rules when the 2027 proposal (if enacted) changes the best structure, or the reverse.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "Your role as the CEO",
          md: md`Raise vesting yourself, early, and apply it to yourself first. The conversation is easier when it is framed as protecting the remaining founders and the company from any departure, including yours.`,
        },
        {
          kind: "checklist",
          title: "Founder equity set-up",
          items: [
            "Split agreed with a written rationale (role, time commitment, contribution, opportunity cost)",
            "Vesting: 48 months, cliff (or credit for past work), vesting start date written down",
            "Leaver terms: good and bad leaver definitions and prices",
            "Acceleration: double trigger, percentage and window",
            "Deadlock mechanism if two founders hold 50/50",
            "IP assignment signed by every founder (Lesson 7)",
            "Tax: holding BV decision (NL), 83(b) filed where relevant (US), option plan design checked against current and proposed rules",
          ],
        },
        {
          kind: "ask",
          title: "Questions for your lawyer and tax adviser",
          items: [
            "Should each founder hold through a personal holding BV, and when must that be in place to avoid a taxable transfer later?",
            "How are leaver clauses enforced in our articles and shareholders' agreement, and what price mechanism holds up in a dispute?",
            "Does any founder or early holder have US tax exposure that requires an 83(b) election?",
            "Do we qualify for the proposed 2027 option regime, and what should our option plan look like if it is enacted or not?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc08-l04-p2",
            type: "short",
            prompt: md`Draft a one-page **founder equity term sheet for Afterwave** (illustrative, not the real split) covering the three founders: split and rationale, vesting schedule and start dates, cliff or credit, good and bad leaver terms with prices, acceleration, and one tax point to settle with an adviser. Take into account that one cofounder may still be employed elsewhere at signing.`,
            rubric: [
              "Split with an explicit rationale based on role, commitment and contribution, labelled illustrative",
              "Vesting: 48 months monthly with cliff or justified credit for past work, start date per founder",
              "A cofounder still employed elsewhere is handled (e.g. vesting starts when full time, or lower split until then) and their employer's IP and side-activity clauses are flagged",
              "Good and bad leaver definitions with prices for vested and unvested shares",
              "Double-trigger acceleration with percentage and window",
              "At least one concrete tax point (holding BV timing, 83(b) after a flip, option regime) for an adviser",
            ],
            modelAnswer: md`**Afterwave founder term sheet (illustrative).**

**Split:** CEO 40 %, Founder 2 30 %, Founder 3 30 %. Rationale: CEO carries GTM, fundraising and company building full time from day one; both technical founders carry the product and test-system depth equally.

**Vesting:** 48 months, monthly. CEO and the full-time technical founder: vesting start backdated to the date full-time work began, no further cliff once 12 months are credited. A founder still employed elsewhere: vesting starts on his first full-time day, with a 12-month cliff from then; his current employer's IP, confidentiality and side-activity clauses are reviewed by our lawyer before he contributes any code or designs.

**Leavers:** good leaver (death, incapacity, dismissal without cause, departure agreed by the board): keeps vested shares, unvested offered back at nominal value. Bad leaver (dismissal for cause, material breach, resignation within 12 months of vesting start): all unvested and 50 % of vested at nominal value, the rest at fair value set by an independent valuer.

**Acceleration:** double trigger, 100 % of unvested if terminated without cause or resigning for good reason within 12 months of a change of control.

**Tax point:** each founder decides on a personal holding BV before shares are issued (a later transfer can be taxable); if we flip to Delaware, US-taxpayer holders file 83(b) within 30 days of the new issue.`,
            explanation: md`The test is whether a seed investor's lawyer could turn this into documents without a second meeting: every term has a number, a definition or a date.`,
            concepts: ["fc08.vesting-cliff", "fc08.leaver-terms", "fc08.founder-split", "fc08.acceleration"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a cofounder why vesting protects him as much as it protects the company, and why the 83(b) deadline matters if you flip to Delaware.",
          keyPoints: [
            "Vesting makes any departure, including yours, clean: unvested shares return and can be re-granted",
            "Without it a departing founder keeps dead equity and investors will not fund",
            "Cliff: nothing vests before 12 months, 25 % at month 12, then monthly",
            "83(b): be taxed on value at grant (about zero) instead of at each vesting date",
            "30-day deadline, cannot be extended",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "fc08-l04-q1",
      type: "numeric",
      prompt: md`A 2,400,000-share founder grant vests over 48 months with a 12-month cliff. How many shares are vested after 27 months?`,
      answer: 1350000,
      tolerance: { abs: 1 },
      unit: "shares",
      explanation: md`$2{,}400{,}000\times27/48 = 1{,}350{,}000$.`,
      concepts: ["fc08.vesting-cliff"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc08-l04-q2",
      type: "mcq",
      prompt: "Why do acquirers dislike single-trigger acceleration?",
      options: [
        "It increases the founder's tax bill",
        "It vests founders at closing, removing the acquirer's retention incentive, so the acquirer pays less or demands new vesting",
        "It is illegal in the Netherlands",
        "It converts preferred shares to common",
      ],
      answer: 1,
      explanation: md`An acquirer buys the team as well as the product. If the team is fully vested at closing, it must spend more on retention or cut the price.`,
      concepts: ["fc08.acceleration"],
      difficulty: 1,
    },
    {
      id: "fc08-l04-q3",
      type: "numeric",
      prompt: md`A founder with 1,600,000 unvested shares has 75 % double-trigger acceleration and is terminated without cause six months after an acquisition. How many unvested shares accelerate?`,
      answer: 1200000,
      tolerance: { abs: 1 },
      unit: "shares",
      explanation: md`Both triggers are met: $0.75\times1{,}600{,}000 = 1{,}200{,}000$ (assuming the termination falls inside the window and all 1,600,000 are still unvested at that moment).`,
      concepts: ["fc08.acceleration"],
      difficulty: 1,
    },
    {
      id: "fc08-l04-q4",
      type: "multi",
      prompt: "Which statements about the 83(b) election are correct? (Select all.)",
      options: [
        "It must be filed within 30 days of receiving the restricted shares",
        "It makes the founder taxable on the value at grant minus the price paid",
        "It can be filed with the next annual tax return",
        "At incorporation the taxable amount is usually close to zero",
        "It is a Dutch tax election for BV shares",
      ],
      answer: [0, 1, 3],
      explanation: md`It is a US election under section 83(b) with a hard 30-day deadline; there is no Dutch equivalent election.`,
      concepts: ["fc08.83b-election"],
      difficulty: 1,
    },
    {
      id: "fc08-l04-q5",
      type: "decision",
      prompt: md`Mizan's cofounders want a 50/50 split between two founders with no vesting "because we've known each other for ten years". You are one of them. What do you propose?`,
      options: [
        { text: "Agree; trust is enough at this stage.", score: 0.1, feedback: "Trust does not survive a change in life circumstances, and investors will require vesting anyway, at a worse moment." },
        { text: "Keep 50/50 if it reflects the work ahead, add 4-year vesting with credit for time already worked, good and bad leaver terms, and a deadlock mechanism (e.g. a chair's casting vote rotating yearly, or an independent board member).", score: 1, feedback: "Right: the split can be equal, but vesting and deadlock rules protect both of you from the scenarios nobody plans for." },
        { text: "Ask for 51/49 so you control decisions.", score: 0.3, feedback: "Solves deadlock crudely and can damage the relationship; it still leaves the dead-equity problem unsolved." },
      ],
      explanation: md`A 50/50 company needs both vesting and a deadlock mechanism. The split itself matters less than what happens if one of you leaves or you disagree.`,
      concepts: ["fc08.founder-split", "fc08.vesting-cliff"],
      difficulty: 2,
    },
    {
      id: "fc08-l04-q6",
      type: "mcq",
      prompt: "Under the proposed Dutch 2027 option regime, as summarised in the course research, what happens to an employee's option gain?",
      options: [
        "100 % taxed at grant",
        "65 % of the gain taxed, with tax deferred until the shares are sold",
        "Fully exempt below EUR 100,000",
        "Taxed in box 3 as savings",
      ],
      answer: 1,
      explanation: md`Proposal (consultation April 2026, intended from 1 January 2027, options granted from 17 April 2025): 65 % taxable and deferral to sale. Confirm enactment before relying on it.`,
      concepts: ["fc08.nl-equity-tax"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc08-l04-f1", front: "Standard vesting", back: "48 months, monthly, 12-month cliff (25 % at month 12).", concepts: ["fc08.vesting-cliff"] },
    { id: "fc08-l04-f2", front: "Reverse vesting", back: "Founders own shares from day one; the company may buy back the unvested part (at nominal) if they leave.", concepts: ["fc08.vesting-cliff"] },
    { id: "fc08-l04-f3", front: "Double trigger", back: "Acceleration only on change of control AND termination without cause (or good-reason resignation) within a window.", concepts: ["fc08.acceleration"] },
    { id: "fc08-l04-f4", front: "Good vs bad leaver (typical)", back: "Good: keep vested (or sell at fair value), unvested back at nominal. Bad: unvested and often some vested back at nominal.", concepts: ["fc08.leaver-terms"] },
    { id: "fc08-l04-f5", front: "83(b) deadline", back: "30 days from receipt of restricted stock; no extension.", concepts: ["fc08.83b-election"] },
    { id: "fc08-l04-f6", front: "Dutch founder holding structure", back: "Personal holding BV owns the operating BV shares; participation exemption on dividends and gains between them; box 2 tax when paid out to the founder.", concepts: ["fc08.nl-equity-tax"] },
    { id: "fc08-l04-f7", front: "Proposed Dutch option regime (2027)", back: "65 % of the gain taxed, deferred until sale, options granted from 17 April 2025. Proposed; confirm enactment.", concepts: ["fc08.nl-equity-tax"] },
  ],
};

export default lesson;
