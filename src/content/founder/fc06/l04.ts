import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc06-l04",
  title: "Burn, runway and default alive",
  summary:
    "Gross vs net burn, simple runway, the cash path when revenue grows, the breakeven month, and Paul Graham's default alive test, with cash curves for an illustrative post-seed Afterwave and the fundraising timeline that follows from them.",
  minutes: 60,
  objectives: [
    "Compute gross burn, net burn and simple runway from a cash forecast",
    "Derive the cash path with compounding revenue growth and the month revenue reaches expenses",
    "Decide whether a company is default alive or default dead, and what growth rate it needs",
    "Set a fundraising start date from runway, fundraising duration and a safety buffer",
    "Answer 'what's your runway?' precisely and credibly in an investor meeting",
  ],
  concepts: [
    { id: "fc06.burn", name: "Gross and net burn", description: "Gross burn is total monthly cash out; net burn is cash out minus cash in.", competency: "fc-finance" },
    { id: "fc06.runway", name: "Runway", description: "Months until cash reaches zero at the forward-looking net burn, including committed hires and known receipts.", competency: "fc-finance", related: ["fc06.burn"] },
    { id: "fc06.default-alive", name: "Default alive vs default dead", description: "Default alive: on current expenses and revenue growth, the company reaches profitability before cash runs out without raising again.", competency: "fc-finance", related: ["fc06.runway"] },
    { id: "fc06.fundraise-timing", name: "Fundraising timing", description: "Start raising with enough runway to cover the raise duration plus a buffer, typically 12 to 18 months of runway left at seed.", competency: "fc-fundraising", related: ["fc06.runway"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "The arithmetic of survival",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`A startup dies when it runs out of cash, not when it makes a loss. You run several ventures with different cash profiles: Afterwave will burn investor money to build ahead of enterprise revenue, Mizan depends on slow public payments, Suhail runs on volunteers until revenue arrives in 2027. For each you need to know the zero-cash date, whether growth gets you to breakeven before it, and when to start raising. Every investor will ask, and the precision of your answer is itself a signal.`,
        },
        {
          kind: "md",
          md: md`### Definitions

- **Gross burn:** total cash out per month (salaries, rent, cloud, contractors, travel).
- **Net burn:** cash out minus cash in. This is what consumes the bank balance.
- **Runway:** months until zero at the **forward** net burn: include hires already committed and known receipts, not last month's number.`,
        },
        { kind: "equation", formula: "fc06-runway" },
        {
          kind: "md",
          md: md`### When revenue grows

Let monthly revenue grow at rate $g$ from $R_0$, expenses stay at $E$. Cash after $n$ months is the opening cash minus expenses plus a geometric series of revenue:

$$C_n = C_0 - nE + \sum_{t=1}^{n}R_0(1+g)^t = C_0 - nE + R_0(1+g)\frac{(1+g)^n-1}{g}.$$`,
        },
        { kind: "equation", formula: "fc06-cash-growth" },
        {
          kind: "md",
          md: md`Cash falls while $R_t < E$ and rises after. The minimum sits where revenue catches expenses, $R_0(1+g)^{n^*} = E$:`,
        },
        { kind: "equation", formula: "fc06-breakeven-month" },
        {
          kind: "md",
          md: md`**Default alive** (Paul Graham, 2015) means $C_{n^*} \ge 0$: with today's expenses and growth rate, you reach profitability on the money you have. Default dead means you need someone else's money to survive, which puts the investor in charge of your timeline. The test is brutal because it uses *current* growth, not the plan.

Two properties of $n^* = \ln(E/R_0)/\ln(1+g)$ worth internalising:
1. Halving the gap $E/R_0$ (by cutting cost or a step-change in revenue) saves a fixed $\ln 2/\ln(1+g)$ months: about 9 months at 8 % monthly growth.
2. Growth enters roughly as $1/g$: going from 4 % to 8 % monthly growth halves the time to breakeven.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "Cash path for different monthly revenue growth rates (illustrative)",
          xKey: "month",
          xLabel: "Month",
          yLabel: "Cash (EUR k)",
          series: [
            { key: "g0", label: "0 %/month" },
            { key: "g4", label: "4 %/month" },
            { key: "g6", label: "6 %/month" },
            { key: "g8", label: "8 %/month" },
            { key: "g10", label: "10 %/month" },
          ],
          data: [
            { month: 0, g0: 2000, g4: 2000, g6: 2000, g8: 2000, g10: 2000 },
            { month: 3, g0: 1685, g4: 1689, g6: 1691, g8: 1693, g10: 1695 },
            { month: 6, g0: 1370, g4: 1383, g6: 1391, g8: 1399, g10: 1407 },
            { month: 9, g0: 1055, g4: 1085, g6: 1103, g8: 1122, g10: 1144 },
            { month: 12, g0: 740, g4: 794, g6: 828, g8: 867, g10: 913 },
            { month: 15, g0: 425, g4: 512, g6: 570, g8: 640, g10: 724 },
            { month: 18, g0: 110, g4: 240, g6: 331, g8: 447, g10: 592 },
            { month: 21, g0: -205, g4: -21, g6: 116, g8: 297, g10: 536 },
            { month: 24, g0: -520, g4: -270, g6: -72, g8: 202, g10: 580 },
            { month: 27, g0: -835, g4: -505, g6: -227, g8: 175, g10: 758 },
            { month: 30, g0: -1150, g4: -725, g6: -343, g8: 235, g10: 1114 },
            { month: 33, g0: -1465, g4: -927, g6: -412, g8: 404, g10: 1707 },
            { month: 36, g0: -1780, g4: -1109, g6: -426, g8: 711, g10: 2616 },
          ],
          caption: "Cash EUR 2.0 m, expenses EUR 120k/month flat, revenue EUR 15k/month today. For the first 12 months the curves are almost identical: growth only shows up late. 8 %/month is the dividing line between default alive and default dead here.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Is a post-seed Afterwave default alive?",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Runway and default-alive test (illustrative numbers only)",
          given: md`Illustrative, not Afterwave data: cash **EUR 2,000k** after a seed round; expenses **EUR 120k/month** (team of 7 to 8, cloud, travel), held flat for the test; revenue **EUR 15k/month** today. Monthly growth scenarios 0 to 10 %.`,
          steps: [
            { md: md`**Simple runway** (no growth): net burn $120 - 15 = 105$; runway $= 2{,}000/105 =$ **19.0 months**.` },
            { md: md`**Breakeven month at 8 %:** $n^* = \ln(120/15)/\ln 1.08 = 2.079/0.0770 =$ **27.0 months**.` },
            { md: md`**Cash at month 27:** $1.08^{27} = 7.988$; revenue sum $= 15\times 1.08\times(7.988-1)/0.08 = 16.2\times 87.35 = 1{,}415$; expenses $27\times 120 = 3{,}240$; $C_{27} = 2{,}000 - 3{,}240 + 1{,}415 =$ **EUR 175k**. Positive: **default alive**, but with a thin buffer.` },
            { md: md`**At 6 %:** $n^* = \ln 8/\ln 1.06 = 35.7$ months; cash crosses zero around month 23 and bottoms at about **EUR -428k**. **Default dead** by roughly EUR 430k, plus a buffer.` },
            { md: md`**What it means:** at 6 % growth you need either a bridge or a raise of at least EUR 0.5 m before month 20, or EUR 430k of cost removed over the next two years (about EUR 18k/month), or faster growth. Note that the curves are nearly identical for 12 months: by the time growth is visible, the decision window has nearly closed.` },
          ],
          result: md`Runway 19 months with no growth; default alive at 8 %/month or more; default dead at 6 %. Decide your raise or cost plan by month 9, not month 18.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Mizan before the first tender revenue (illustrative)",
          given: md`Illustrative. Cash **KWD 300k**, expenses **KWD 25k/month** flat, revenue **KWD 5k/month** growing **5 %/month**.`,
          steps: [
            { md: md`Net burn today: $25 - 5 = 20$ KWD k/month.` },
            { md: md`Simple runway $= 300/20 =$ **15 months**.`, hidden: true, check: { prompt: "Simple runway (months)", answer: 15, unit: "months", tolerance: { abs: 0.1 } } },
            { md: md`Breakeven month $n^* = \ln(25/5)/\ln 1.05 =$ **33.0 months**.`, hidden: true, check: { prompt: "Breakeven month n* (months)", answer: 33, unit: "months", tolerance: { abs: 0.3 } } },
            { md: md`Monthly simulation: cash is KWD 38k at month 15 and turns negative in month 18; the trough is about KWD -105k near month 33. Growth must be about **7 %/month** for the company to be default alive on KWD 300k.` },
          ],
          result: md`Default dead at 5 %. Options: win a pilot contract with an advance payment, cut expenses, or raise before month 9.`,
        },
        {
          kind: "question",
          question: {
            id: "fc06-l04-p1",
            type: "numeric",
            prompt: md`Expenses EUR 100k/month (flat), revenue EUR 20k/month growing 5 % per month. In how many months does revenue reach expenses? (1 decimal)`,
            answer: 33,
            tolerance: { abs: 0.2 },
            unit: "months",
            explanation: md`$n^* = \ln(100/20)/\ln 1.05 = 1.6094/0.04879 = 33.0$ months. Then check whether the cash lasts that long: that is the default-alive test.`,
            concepts: ["fc06.default-alive"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Managing runway in practice",
      blocks: [
        {
          kind: "md",
          md: md`### The timeline that runway imposes

| Runway left | What you should be doing |
|---|---|
| > 18 months | Build; collect evidence for the next round; keep a 13-week cash forecast |
| 12 to 18 months | Start investor conversations; decide the raise size from the milestone plan |
| 9 to 12 months | Be in an active process; prepare the cost-cut plan in case it fails |
| 6 to 9 months | Bridge from existing investors or execute cuts; negotiating power is falling |
| < 6 months | Survival mode: cuts, bridge, or an orderly wind-down plan |

A seed or Series A process commonly takes 3 to 6 months from first meeting to cash in the bank, longer in a weak market. Investors can see your runway, and a short one weakens your position on price and terms.

### Tools

- **13-week cash forecast:** weekly receipts and payments; the operational truth.
- **Monthly 18 to 24 month model:** driver-based (next lesson), with base, bear and bull cases.
- **Runway line in every investor update:** cash, net burn (3-month average), runway, and whether default alive.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Using last month's burn.** Committed hires and annual payments (insurance, conference booths, software licences) make the forward burn higher.
- **Counting signed-but-unpaid money.** A term sheet or an invoice to a ministry is not cash. Count receipts when they are reasonably certain, and stress-test their timing.
- **Treating grants and subsidies as certain.** Grant payments arrive late and often in arrears; model them in the bull case until the agreement is signed.
- **Ignoring FX.** If you hold EUR and pay salaries in CHF (Zurich) or KWD, runway moves with the exchange rate.
- **Cutting too late and too little.** One deep cut early beats three shallow ones that destroy morale each time.`,
        },
        {
          kind: "ask",
          title: "Questions to ask every month",
          items: [
            "What is forward net burn including hires already offered?",
            "Which receipts in the next 90 days are certain, likely or hopeful?",
            "At current growth, are we default alive? If not, by how much cash or how many points of growth?",
            "What is the date by which we must start raising, and what evidence will we have by then?",
            "What is the pre-agreed cost plan if the raise slips by three months?",
          ],
        },
        { kind: "sources", refs: ["fc06-r4"] },
        { kind: "scenario", scenario: "fc06-s1" },
        {
          kind: "question",
          question: {
            id: "fc06-l04-p2",
            type: "short",
            prompt: md`Write the **runway section of a monthly investor update** for Afterwave (or Mizan), using illustrative numbers clearly labelled as such. It must state cash, gross and net burn (3-month average), runway, the default-alive test with the growth rate it assumes and the growth rate needed, the date you will start the next raise, and the pre-agreed actions if the raise slips. Keep it under 200 words.`,
            rubric: [
              "Cash, gross burn and net burn are stated with a clear averaging basis and runway follows arithmetically",
              "Default-alive test is explicit: current growth rate, breakeven month, cash at breakeven or the shortfall",
              "States the growth rate (or cost reduction) needed to become default alive",
              "Gives a raise start date consistent with runway minus raise duration minus buffer",
              "Lists concrete contingency actions with their cash effect",
              "Numbers labelled illustrative; tone is factual, no spin",
            ],
            modelAnswer: md`**Runway (illustrative numbers).** Cash at 31 March: **EUR 1,790k**. Gross burn (Jan to Mar average): **EUR 124k/month**; receipts **EUR 17k/month**; net burn **EUR 107k/month**. Runway at forward burn including the field application engineer starting in May (+EUR 8k/month): **15.6 months** (to mid-July next year). Revenue has grown **6 %/month** over the last six months. At that rate revenue reaches expenses in about 35 months and cash bottoms out at roughly **EUR -0.8 m**: we are **default dead**. Default alive needs about **9 %/month** growth, or EUR 25k/month lower costs. **Plan:** start the seed-extension conversations in **September** (10 months of runway left, with a 4 to 6 month process and a 3-month buffer). **If the raise slips past January:** freeze open hiring (EUR 8k/month), shift two pilots to paid with 50 % upfront (about EUR 40k one-off), and cut travel to customer-paid visits only (EUR 6k/month). Together these add a little over 1 month; if there is no term sheet by March we also end two contractor roles (EUR 20k/month), which adds about 2 more. Ask: introductions to robotics test leads in Germany.`,
            explanation: md`Graded against the rubric. Investors value updates that state the default-alive test honestly and show you have a plan before you need it.`,
            concepts: ["fc06.runway", "fc06.default-alive", "fc06.fundraise-timing"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to Omar why a company with 19 months of runway and 6 % monthly revenue growth is in a worse position than it feels, and what 'default dead' means for negotiating with investors.",
          keyPoints: [
            "Runway is cash divided by forward net burn; it falls faster when hires are committed",
            "Revenue growth compounds, so its effect is small in the first year and large later",
            "Default alive means reaching breakeven before cash runs out without new money",
            "At 6 % the cash curve goes negative before revenue catches expenses, so new money is required",
            "Being default dead hands timing and negotiating power to investors; decide early whether to cut, grow faster or raise",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "fc06-l04-q1",
      type: "numeric",
      prompt: md`Cash EUR 1.2 m, gross burn EUR 90k/month, receipts EUR 15k/month. Simple runway in months?`,
      answer: 16,
      tolerance: { abs: 0.05 },
      unit: "months",
      explanation: md`Net burn $= 90 - 15 = 75$; $1{,}200/75 = 16$ months.`,
      concepts: ["fc06.runway", "fc06.burn"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc06-l04-q2",
      type: "mcq",
      prompt: "What does 'default alive' mean?",
      options: [
        "The company has more than 12 months of runway",
        "On current expenses and growth, the company reaches profitability before running out of cash, without new funding",
        "The company has a term sheet",
        "The company is profitable today",
      ],
      answer: 1,
      explanation: md`It is a test of the trajectory, not the bank balance: $C_{n^*} \ge 0$ where $n^*$ is the month revenue catches expenses.`,
      concepts: ["fc06.default-alive"],
      difficulty: 1,
    },
    {
      id: "fc06-l04-q3",
      type: "mcq",
      prompt: md`Expenses are flat at 8x current revenue. Monthly growth doubles from 4 % to 8 %. Roughly what happens to the months until revenue reaches expenses?`,
      options: ["It halves", "It falls by a quarter", "It is unchanged", "It doubles"],
      answer: 0,
      explanation: md`$n^* = \ln 8/\ln(1+g)$: 53.0 months at 4 %, 27.0 at 8 %. Because $\ln(1+g)\approx g$, the time roughly halves.`,
      concepts: ["fc06.default-alive"],
      difficulty: 2,
    },
    {
      id: "fc06-l04-q4",
      type: "multi",
      prompt: "Which should be included in forward net burn? (Select all.)",
      options: [
        "Salary of an engineer who has signed and starts next month",
        "An annual insurance premium due in two months, averaged over the year",
        "A grant that has been applied for but not awarded",
        "Committed cloud costs",
        "A purchase order from a customer that has been received but not invoiced",
      ],
      answer: [0, 1, 3],
      explanation: md`Committed costs belong in the burn. An unawarded grant is not a receipt; a PO is not cash until invoiced and paid, so its receipt timing should be modelled conservatively.`,
      concepts: ["fc06.burn", "fc06.runway"],
      difficulty: 2,
    },
    {
      id: "fc06-l04-q5",
      type: "numeric",
      prompt: md`You have 16 months of runway. A raise takes about 5 months and you want a 4-month buffer at closing. In how many months from now must you start? (months)`,
      answer: 7,
      tolerance: { abs: 0.1 },
      unit: "months",
      explanation: md`$16 - 5 - 4 = 7$. Start conversations no later than month 7, when 9 months of runway remain; earlier is better because evidence takes time to collect and processes slip.`,
      concepts: ["fc06.fundraise-timing"],
      difficulty: 1,
    },
    {
      id: "fc06-l04-q6",
      type: "order",
      prompt: "Order these actions from the most runway left to the least, in a well-run seed company.",
      items: [
        "Build and collect evidence for the next round",
        "Start investor conversations",
        "Run an active fundraising process with a cost-cut plan ready",
        "Bridge from existing investors or execute cuts",
      ],
      explanation: md`Over 18 months: build; 12 to 18: start conversations; 9 to 12: active process; 6 to 9: bridge or cuts.`,
      concepts: ["fc06.fundraise-timing"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc06-l04-f1", front: "Gross vs net burn", back: "Gross = total cash out per month; net = cash out minus cash in.", concepts: ["fc06.burn"] },
    { id: "fc06-l04-f2", front: "Breakeven month with growing revenue", back: md`$n^* = \ln(E/R_0)/\ln(1+g)$`, concepts: ["fc06.default-alive"] },
    { id: "fc06-l04-f3", front: "Default alive test", back: md`Cash at the breakeven month $C_{n^*} \ge 0$ on current expenses and growth.`, concepts: ["fc06.default-alive"] },
    { id: "fc06-l04-f4", front: "When to start raising (seed)", back: "With 12 to 18 months of runway left; processes take 3 to 6 months.", concepts: ["fc06.fundraise-timing"] },
    { id: "fc06-l04-f5", front: "Illustrative Afterwave runway test", back: "EUR 2.0 m, EUR 120k/month costs, EUR 15k/month revenue: 19 months simple; default alive at 8 %/month growth, dead at 6 %.", concepts: ["fc06.runway"] },
    { id: "fc06-l04-f6", front: "Why growth shows up late in the cash curve", back: "Revenue compounds from a small base: after 12 months, 4 % and 10 % growth differ by only EUR 120k of cash in the example.", concepts: ["fc06.default-alive"] },
  ],
  scenarios: [
    {
      id: "fc06-s1",
      title: "The YC partner asks: 'What's your runway?'",
      dayInLife: true,
      context: md`It is your YC interview (illustrative situation). Ten minutes, rapid questions. A partner cuts in: "How much money do you have, what do you burn, and are you default alive?" Your own illustrative numbers: cash EUR 310k from founders and an angel cheque, expenses EUR 28k/month, revenue EUR 6k/month from one paid pilot, growing because a second pilot starts next month.`,
      start: "a",
      concepts: ["fc06.runway", "fc06.default-alive", "fc06.burn"],
      nodes: {
        a: {
          md: md`How do you answer?`,
          choices: [
            { text: "\"EUR 310k in the bank, EUR 22k net burn, so 14 months of runway. We are default dead on current revenue; with the second pilot converting we'd be at about EUR 16k a month.\"", next: "b", score: 10, feedback: "Precise, in one breath, and honest about the default-alive test. Partners trust founders who know their numbers cold." },
            { text: "\"We're very capital efficient, we have plenty of runway.\"", next: "c", score: 2, feedback: "Unquantified. The partner will ask again and you will have lost a minute." },
            { text: "\"About a year, maybe more, depending on the pilots.\"", next: "c", score: 4, feedback: "Approximately right, but vague answers suggest you do not track it." },
          ],
        },
        b: {
          md: md`The partner follows up: "So what's the plan to not die?"`,
          choices: [
            { text: "\"Convert both pilots to annual contracts at about EUR 90k ACV within six months; that brings net burn to about EUR 13k a month and stretches runway to roughly 20 months. We raise in the batch to hire ahead of that curve, not to survive.\"", score: 10, feedback: "Ties the cash path to concrete commercial milestones and explains the role of the raise." },
            { text: "\"We'll raise a big seed after Demo Day.\"", score: 5, feedback: "Plausible, but makes survival depend entirely on investors. Show the commercial path too." },
          ],
        },
        c: {
          md: md`The partner asks again, sharper: "I need the number. Cash and monthly net burn."`,
          choices: [
            { text: "Give the precise numbers and the default-alive status, and say you should have led with them.", score: 6, feedback: "Recovered, but you spent credibility. Rehearse this answer until it is reflexive." },
            { text: "Say you'd need to check with your cofounder.", score: 0, feedback: "The CEO who owns finance must know cash and burn without checking." },
          ],
        },
      },
    },
  ],
};

export default lesson;
