import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc07-l02",
  title: "What Pre-seed, Seed and Series A Investors Expect",
  summary:
    "Each round buys down a specific risk. Learn what evidence each stage needs, how big rounds are and how much they dilute, how pre-money, post-money and post-money SAFEs work, how to size a round from milestones, and how the US, Europe and the Gulf differ.",
  minutes: 75,
  objectives: [
    "Name the risk each stage (pre-seed, seed, Series A) is expected to retire and the evidence that shows it",
    "Compute post-money valuation, investor ownership and founder dilution for a priced round and a post-money SAFE",
    "Size a round from milestones, burn and buffer instead of from a headline number",
    "Compare indicative round sizes and dilution across the US, Europe and the Gulf, and say what drives the differences",
  ],
  concepts: [
    { id: "fc07.stage-expectations", name: "Stage expectations", description: "Pre-seed buys team and insight risk, seed buys product and early-market risk, Series A buys repeatability: each round must show the evidence for the risk it retires.", competency: "fc-fundraising", related: ["fc07.why-vcs-say-no"] },
    { id: "fc07.pre-post-money", name: "Pre-money, post-money and ownership", description: "Post-money equals pre-money plus new money; the new investors own new money divided by post-money on a fully diluted basis.", competency: "fc-fundraising", related: ["fc07.option-pool-shuffle"] },
    { id: "fc07.safe-mechanics", name: "Post-money SAFE mechanics", description: "A SAFE converts into shares at the next priced round; with a post-money cap the holder's percentage is fixed at investment divided by cap, and later SAFEs dilute the founders.", competency: "fc-fundraising", related: ["fc07.pre-post-money"] },
    { id: "fc07.round-sizing", name: "Round sizing from milestones", description: "Raise enough to reach the next round's milestones plus a buffer for the next fundraise: average burn times months, minus cash on hand.", competency: "fc-fundraising", related: ["fc07.pre-post-money"] },
    { id: "fc07.regional-norms", name: "US, Europe and Gulf round norms", description: "Rounds and valuations are largest in the US, lower in Europe at the same stage, and in the Gulf shaped by state-backed funds of funds, local-presence expectations and less transparent pricing.", competency: "fc-fundraising", related: ["fc07.stage-expectations"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Risk retired per round, and the arithmetic of dilution",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Afterwave is applying to YC W27 and you are weighing Zurich; Mizan could raise in the Gulf; each choice changes what investors will expect to see and what they will pay. Knowing which risk the next round must retire tells you what to build before you raise (a signed paid pilot, not a nicer deck), and knowing the dilution maths stops you from trading 5 points of ownership for a headline valuation.`,
        },
        {
          kind: "md",
          md: md`### Every round buys down one risk

Investors at each stage price a specific uncertainty. Your job is to show the evidence that retires it.

| Stage | Risk being bought | Evidence that works | For B2B enterprise hardware-adjacent software (Afterwave) |
|---|---|---|---|
| **Pre-seed** | Team and insight: are these the right people with a non-obvious view? | Founder-market fit, a sharp insight, early customer conversations, a prototype | Two ex-Tesla test and validation engineers plus a GTM founder; discovery notes from test teams; Lockstep prototype on a real rig |
| **Seed** | Product and early market: will the target buyer use and pay? | Design partners, paid pilots, LOIs with commercial terms, usage on real data | Paid pilots with hardware test teams; on-prem security review passed once; Ripple recommendations used in a real regression |
| **Series A** | Repeatability: can you acquire customers predictably and expand? | Recurring revenue growing, a sales motion others can run, retention, pipeline coverage | Several enterprise contracts converted from pilots, expansion inside accounts, a repeatable outbound plus partner channel |

A round fails most often when founders raise for the next stage's story with the previous stage's evidence.

### Pre-money, post-money, ownership`,
        },
        { kind: "equation", formula: "fc07-post-money" },
        {
          kind: "md",
          md: md`Everything is **fully diluted**: shares, issued options, the unallocated option pool and any converting SAFEs or notes. EUR 2.5m at EUR 10m pre: post-money EUR 12.5m, investors own $2.5/12.5 = 20\%$, and every existing holder is diluted by 20 %. If the investor also requires a new option pool of 10 % of post-money **in the pre-money**, existing holders are diluted by 30 % in total (Lesson 7, option-pool shuffle).

### SAFEs: the pre-seed instrument

A **SAFE** (Simple Agreement for Future Equity, Y Combinator) is a right to shares at the next priced round, usually with a **valuation cap** and sometimes a **discount**. With YC's post-money SAFE (2018 onwards) the cap is a post-money cap, so the holder's ownership before the next round's new money is fixed:`,
        },
        { kind: "equation", formula: "fc07-safe-ownership" },
        {
          kind: "md",
          md: md`Consequences:

- Stacking several post-money SAFEs dilutes **only the founders and existing common**, not earlier SAFE holders. Add up the percentages before you sign the next one.
- At the priced round, the new money (and any pool increase) dilutes everyone, SAFE holders included.
- An **uncapped MFN SAFE** (most-favoured-nation, as in YC's USD 375k) has no cap of its own; it takes the best terms of any later SAFE issued before the priced round, or converts at the round price.

For Dutch BV or Swiss companies, investors often use the local equivalents (convertible loan agreements in the Netherlands, convertible loans in Switzerland) because a BV share issue needs a notarial deed. The mechanics are the same: a cap, a discount, conversion at the next qualifying round. Legal structuring is in the Equity and Legal module (fc08).

### How much to raise`,
        },
        { kind: "equation", formula: "fc07-round-size" },
        { kind: "equation", formula: "fc07-runway" },
        {
          kind: "md",
          md: md`Rule: raise to reach the milestones of the next round, plus a buffer of about 6 months because raising the next round itself takes 3 to 6 months and plans slip. 18 to 24 months of runway is the common target. Raising more costs dilution; raising less means raising again from a weak position.

### Indicative round norms by region`,
        },
        {
          kind: "md",
          md: md`| Stage | US: typical raise | US: typical post-money | Europe vs US | Dilution per round |
|---|---|---|---|---|
| Pre-seed | USD 0.5 to 2.5m | USD 5 to 15m | Rounds and valuations often 20 to 40 % lower | 7 to 15 % |
| Seed | USD 2 to 5m | USD 12 to 30m | Lower; grants often co-fund | 15 to 25 % |
| Series A | USD 8 to 20m | USD 40 to 100m | Lower; more evidence asked for the same price | 18 to 25 % |

**Gulf (MENA):** MAGNiTT counts USD 3.8bn across 688 deals in 2025 (+74 % year on year), then USD 1.35bn across 214 deals in H1 2026 (funding down 22 %, deal count down 41 %), with AI about half of H1 2026 funding and the UAE 66 % of it. Wamda reports USD 7.5bn for 2025 with a different method that appears to include debt. Do not mix the two series. Patterns that matter to you: state-backed funds of funds (Saudi Venture Capital, Jada) sit behind many regional VCs; investors often expect a regional presence (UAE or Saudi entity or headquarters); seed cheques are generally smaller and valuation data is less transparent.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Round sizes and valuations are indicative",
          md: md`The US and Europe ranges above are a synthesis of widely published 2024 to 2025 market data (Carta, PitchBook and similar) and move every quarter; AI companies currently price well above them. They were not re-checked against a dated primary data set for this course. Before quoting any number to an investor, pull the latest quarterly report and cite it. The MENA totals come from MAGNiTT and Wamda as recorded in the course research brief (November 2026).`,
        },
        {
          kind: "chart",
          chart: "stacked-bar",
          title: "Illustrative founder ownership through three rounds",
          xKey: "stage",
          xLabel: "After each event",
          yLabel: "Fully diluted ownership (%)",
          series: [
            { key: "founders", label: "Founders" },
            { key: "pool", label: "Option pool" },
            { key: "preseed", label: "Pre-seed investors" },
            { key: "seed", label: "Seed investors" },
            { key: "seriesA", label: "Series A investors" },
          ],
          data: [
            { stage: "Founding", founders: 100, pool: 0, preseed: 0, seed: 0, seriesA: 0 },
            { stage: "Pre-seed 10 %", founders: 90, pool: 0, preseed: 10, seed: 0, seriesA: 0 },
            { stage: "Seed 20 % + pool 10 %", founders: 63, pool: 10, preseed: 7, seed: 20, seriesA: 0 },
            { stage: "Series A 20 % + pool top-up 5 %", founders: 47.25, pool: 12.5, preseed: 5.25, seed: 15, seriesA: 20 },
          ],
          caption: "Illustrative. Pools created in the pre-money dilute existing holders only. Founders end near 47 %: still in control of the cap table, but each extra point given away early compounds.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Sizing Afterwave's seed and reading a SAFE stack",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "How much should Afterwave raise at seed?",
          given: md`Illustrative plan, not real Afterwave data. Series A milestones (for example: several pilots converted to paid annual contracts, Ripple running in production at one customer, a repeatable outbound motion) are estimated to take **20 months**. The team grows from 3 to about 9, so average net burn over the plan is **EUR 115k/month**. Cash at close: **EUR 100k**. Buffer: **6 months**. Two offers on the table: EUR 3.0m at EUR 12m pre-money, or EUR 2.0m at EUR 10m pre-money.`,
          steps: [
            { md: md`**Need:** $I = 115\text{k}\times(20+6) - 100\text{k} = 2{,}990 - 100 = 2{,}890$ EUR k. Round up to **EUR 3.0m**.` },
            { md: md`**Offer 1:** post $= 12 + 3 = 15$ EUR m; investors own $3/15 = 20\%$. Runway $= (3.0 + 0.1)/0.115 = 27$ months: milestones plus buffer covered.` },
            { md: md`**Offer 2:** post $= 10 + 2 = 12$ EUR m; investors own $2/12 = 16.7\%$. Runway $= 2.1/0.115 = 18.3$ months: 1.7 months short of the milestones, with no buffer for the Series A process.` },
            { md: md`**Compare:** offer 2 saves 3.3 points of dilution but forces either a bridge round (raised from weakness, often on worse terms) or a Series A pitch without the evidence it needs. Offer 1 costs 3.3 points and buys a clean shot at the A.` },
            { md: md`**Check against norms:** EUR 3m for 20 % sits inside the indicative European seed range. If the lead also wants a 10 % pool in the pre-money, total founder dilution is 30 %: negotiate the pool size against a hiring plan (Lesson 7).` },
          ],
          result: md`Raise **about EUR 3.0m**, roughly 20 % dilution, for 27 months of runway. The cheaper-looking round is the expensive one if it ends before the milestones.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "YC's 7 % SAFE through a priced seed",
          given: md`Illustrative: founders own 100 %. The company takes YC's USD 125k for 7 % on a post-money SAFE (ignore the USD 375k MFN SAFE here). Later it raises a priced seed in which new investors take 20 % and a new 10 % pool is created in the pre-money.`,
          steps: [
            { md: md`Implied post-money cap: $125/0.07 = 1{,}786$ USD k.` },
            { md: md`Before the seed's new money (as converted): YC 7 %, founders 93 %.` },
            { md: md`The seed's new money and pool dilute everyone by $1 - 0.2 - 0.1 = 0.7$. Founders: $93\%\times 0.7$.` },
            { md: md`= **65.1 %**.`, hidden: true, check: { prompt: "Founder ownership after the seed (%)", answer: 65.1, unit: "%", tolerance: { abs: 0.1 } } },
            { md: md`YC: $7\%\times 0.7$ = **4.9 %**.`, hidden: true, check: { prompt: "YC ownership after the seed (%)", answer: 4.9, unit: "%", tolerance: { abs: 0.05 } } },
            { md: md`The uncapped MFN SAFE would convert at the seed price and dilute founders by roughly its share of the post-money (USD 375k on a USD 15m post is about 2.5 %).` },
          ],
          result: md`After YC and a typical seed, founders hold about 63 to 65 % depending on the MFN conversion. Use the widget below to see the same stack with your own numbers.`,
        },
        { kind: "widget", widget: "safe-vs-priced", props: { raise: 3000000, preMoney: 12000000 }, caption: "Compare the same raise as a post-money SAFE, a pre-money SAFE or a priced seed; watch founder ownership after the Series A." },
        {
          kind: "question",
          question: {
            id: "fc07-l02-p1",
            type: "numeric",
            prompt: md`Before any priced round, a company has signed three post-money SAFEs: USD 500k at a USD 5m cap, USD 250k at a USD 5m cap and USD 600k at a USD 8m cap. What percentage do founders hold just before the priced round's new money?`,
            answer: 77.5,
            tolerance: { abs: 0.1 },
            unit: "%",
            explanation: md`SAFE holders: $0.5/5 + 0.25/5 + 0.6/8 = 10\% + 5\% + 7.5\% = 22.5\%$. Founders: $100 - 22.5 = 77.5\%$. Each post-money SAFE takes its percentage from the founders, so add them up before signing the next.`,
            concepts: ["fc07.safe-mechanics"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Showing the right evidence at the right stage",
      blocks: [
        {
          kind: "md",
          md: md`### How investors check your stage claims

- **Pre-seed:** reference calls on the founders (former managers and colleagues), depth of customer discovery, prototype demo. For Afterwave the founders' Tesla validation background is the evidence; let investors speak to people who worked with Ismail and Yusuf.
- **Seed:** customer calls with your design partners and pilot customers. They will ask the customer "would you be upset if this disappeared?" and "who signs the purchase order?". Make sure pilot champions are briefed and willing.
- **Series A:** cohort and pipeline analysis, win/loss records, contract review (term, renewal, price escalators), sales cycle length by segment. Expect a spreadsheet request, not a conversation.

### Regional differences that change your plan

| Topic | US | Europe (NL, CH) | Gulf |
|---|---|---|---|
| Speed and competition | Fastest; more competing term sheets | Slower; fewer leads per round | Relationship-driven; can be fast once a sovereign-linked fund commits |
| Instrument at pre-seed | Post-money SAFE | Convertible loan or SAFE (often with a Delaware flip for US investors) | SAFE or convertible; Hub71 uses a SAFE |
| Non-dilutive co-funding | Limited (SBIR for some sectors) | Strong: WBSO, Innovatiekrediet, EIC, Innosuisse | Programme incentives (Hub71 in-kind), government co-investment |
| Local presence | Not required | Not required within the EU | Often expected: regional entity or headquarters, local hires |
| Governance | NVCA-style terms | Similar, plus notarial requirements (BV) | Similar documents; sometimes ADGM or DIFC holding structures |`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Optimising the headline valuation:** a high price with a big pre-money pool and a short runway beats nothing, but not a fair price with enough runway.
- **Losing track of the SAFE stack:** three SAFEs at different caps silently give away 20 % or more before the seed.
- **Raising seed money on pre-seed evidence:** if the only proof is conversations, raise a pre-seed sized round, or get the paid pilot first.
- **Mixing regional data:** quoting a US seed median to a Dutch or Kuwaiti investor undermines credibility.`,
        },
        {
          kind: "checklist",
          title: "Before you set the round size",
          items: [
            "Next-round milestones written down and agreed with your cofounders",
            "Hiring plan by month, with fully loaded cost per hire",
            "Average net burn computed from the plan, not from today's burn",
            "Buffer of about 6 months for the next fundraise",
            "Dilution computed including any pool increase and converting SAFEs",
            "Range checked against a dated, region-appropriate data source",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc07-l02-p2",
            type: "short",
            prompt: md`Write the **round-sizing memo** for Afterwave's seed (half a page). Define three Series A milestones, a month-by-month hiring plan summary, the average net burn, buffer and the resulting raise. State the target dilution range and what you will trade off if the lead offers a lower amount. Label all numbers as illustrative.`,
            rubric: [
              "Three concrete Series A milestones appropriate to B2B enterprise test infrastructure (paid contracts, Ripple in production, repeatable sales motion), not vanity metrics",
              "Hiring plan with roles and timing that produces the stated average burn",
              "Correct application of raise = average burn x (months + buffer) - cash",
              "Dilution computed from a stated pre-money, with pool effect mentioned",
              "A clear fallback: which milestone or hire is cut, or what bridge is planned, if the raise is smaller",
              "All numbers labelled illustrative; no invented customers or revenue",
            ],
            modelAnswer: md`**Milestones for the A (illustrative):** (1) at least four pilots converted to paid annual Enclave plus Lockstep contracts in two segments (drives and robotics); (2) Ripple used in production by one customer to choose regression tests after firmware changes, with measured rig-hours saved; (3) a repeatable motion: two non-founder-led closes from a documented playbook.

**Hiring plan:** months 1 to 3: two full-stack and data engineers; months 4 to 6: one test-integration engineer and one solutions engineer; months 7 to 12: one account executive and one ML engineer; months 13 to 20: one customer success lead. Team grows from 3 to 10.

**Burn:** fully loaded EUR 8 to 10k per hire per month plus tooling, travel and pilot hardware gives an average net burn of about EUR 115k/month over 20 months.

**Raise:** $115\text{k}\times(20 + 6) - 100\text{k} \approx$ EUR 2.9m, so target **EUR 3.0m**. At EUR 12m pre-money that is 20 % dilution; with a 10 % pre-money pool, 30 % total. Target range: 18 to 25 % from the round itself.

**If the lead offers EUR 2.0m:** take it only with a planned second close of EUR 0.5 to 1.0m within three months, or cut the account executive hire to month 12 and the ML hire, extending runway to about 22 months and moving milestone 3 into the A process. All figures illustrative.`,
            explanation: md`The memo forces the order of operations investors expect: milestones first, then the plan and burn, then the amount and the dilution. A fallback shows you have thought about the round being smaller than planned, which is common.`,
            concepts: ["fc07.round-sizing", "fc07.stage-expectations", "fc07.pre-post-money"],
            difficulty: 2,
          },
        },
        { kind: "sources", refs: ["fc07-r4", "fc07-r5", "fc07-r10", "fc07-r11", "fc07-r12"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc07-l02-q1",
      type: "numeric",
      prompt: md`A company raises EUR 2m at a EUR 8m pre-money valuation. What percentage do the new investors own (fully diluted)?`,
      answer: 20,
      tolerance: { abs: 0.1 },
      unit: "%",
      explanation: md`Post $= 8 + 2 = 10$ EUR m; ownership $= 2/10 = 20\%$.`,
      concepts: ["fc07.pre-post-money"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc07-l02-q2",
      type: "mcq",
      prompt: "Which risk is a Series A investor primarily paying to retire?",
      options: ["Whether the founders can build a prototype", "Whether customers can be acquired and expanded repeatably", "Whether the company can IPO", "Whether the founders know each other well"],
      answer: 1,
      explanation: md`Pre-seed buys team and insight, seed buys product and early market, Series A buys repeatability of acquisition and expansion.`,
      concepts: ["fc07.stage-expectations"],
      difficulty: 1,
    },
    {
      id: "fc07-l02-q3",
      type: "numeric",
      prompt: md`Net burn is EUR 90k/month, milestones need 16 months, you want a 6-month buffer and have EUR 180k in the bank. How much (EUR k) should you raise?`,
      answer: 1800,
      tolerance: { abs: 5 },
      unit: "EUR k",
      explanation: md`$I = 90\times(16 + 6) - 180 = 1{,}980 - 180 = 1{,}800$ EUR k.`,
      concepts: ["fc07.round-sizing"],
      difficulty: 1,
    },
    {
      id: "fc07-l02-q4",
      type: "numeric",
      prompt: md`An investor puts USD 500k into a post-money SAFE with a USD 5m cap. What percentage does it hold just before the next priced round's new money (assuming the round prices above the cap)?`,
      answer: 10,
      tolerance: { abs: 0.05 },
      unit: "%",
      explanation: md`$o = 0.5/5 = 10\%$. That percentage is fixed regardless of later SAFEs; the priced round's new money then dilutes it.`,
      concepts: ["fc07.safe-mechanics"],
      difficulty: 1,
    },
    {
      id: "fc07-l02-q5",
      type: "multi",
      prompt: "Which are typical differences of Gulf venture rounds compared with US rounds? (Select all that apply.)",
      options: [
        "State-backed funds of funds sit behind many regional VCs",
        "Investors often expect a regional entity or headquarters",
        "Valuation data is generally more transparent than in the US",
        "Seed cheques are generally smaller",
        "SAFEs are prohibited",
      ],
      answer: [0, 1, 3],
      explanation: md`Saudi Venture Capital and Jada back many regional funds; local presence is often a condition; cheques are smaller; pricing is less transparent. SAFEs are used (Hub71 uses one).`,
      concepts: ["fc07.regional-norms"],
      difficulty: 2,
    },
    {
      id: "fc07-l02-q6",
      type: "decision",
      prompt: md`Mizan has strong conversations with KISR and plant operators but no signed pilot yet. An angel network offers to lead a EUR 2.5m "seed" if you can show seed-stage traction within two months. What do you do?`,
      options: [
        { text: "Raise a smaller pre-seed (enough to sign and run the Shagaya pilot) now, and raise the seed once the pilot shows results.", score: 1, feedback: "Matches the round to the evidence you have; the pilot then retires the seed-stage risk." },
        { text: "Present the conversations as LOIs to qualify for the seed.", score: 0, feedback: "Misrepresenting evidence destroys trust the moment diligence starts, and it will start." },
        { text: "Wait without raising until the pilot is signed, however long the public process takes.", score: 0.4, feedback: "Avoids misrepresentation, but public procurement timelines can outlast your cash." },
      ],
      explanation: md`Raise for the stage your evidence supports. Overreaching on stage invites a failed round; underfunding leaves you hostage to procurement timing.`,
      concepts: ["fc07.stage-expectations", "fc07.round-sizing"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "fc07-l02-f1", front: "Post-money and investor ownership", back: md`$V_{\text{post}} = V_{\text{pre}} + I$; $o = I/V_{\text{post}}$.`, concepts: ["fc07.pre-post-money"] },
    { id: "fc07-l02-f2", front: "Risk bought per stage", back: "Pre-seed: team and insight. Seed: product and early market. Series A: repeatability.", concepts: ["fc07.stage-expectations"] },
    { id: "fc07-l02-f3", front: "Post-money SAFE ownership", back: md`$I/\text{cap}$, fixed until the priced round; later SAFEs dilute founders, not earlier SAFE holders.`, concepts: ["fc07.safe-mechanics"] },
    { id: "fc07-l02-f4", front: "YC standard deal (W27, per research)", back: "USD 125k for 7 % on a post-money SAFE (implied cap about USD 1.79m) plus USD 375k on an uncapped MFN SAFE.", concepts: ["fc07.safe-mechanics"] },
    { id: "fc07-l02-f5", front: "Round size formula", back: md`$I = \bar{B}(m + b) - K_0$: average burn times (months to milestones plus buffer) minus cash.`, concepts: ["fc07.round-sizing"] },
    { id: "fc07-l02-f6", front: "Typical dilution per round", back: "Roughly 15 to 25 % at seed and Series A; pre-seed 7 to 15 %; pool top-ups extra.", concepts: ["fc07.pre-post-money"] },
    { id: "fc07-l02-f7", front: "MENA VC H1 2026 (MAGNiTT)", back: "USD 1.35bn across 214 deals; funding -22 %, deals -41 % YoY; AI about half; UAE 66 %.", concepts: ["fc07.regional-norms"] },
  ],
};

export default lesson;
