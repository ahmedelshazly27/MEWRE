import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh01-l02",
  title: "How the reference communities work: YC, {Tech: Europe}, On Deck, Founders Inc, Antler, Indie Hackers",
  summary:
    "Six communities Suhail is compared with, taken apart by mechanism: the batch, demo day and alumni network at Y Combinator; the free, approval-gated hackathon machine and newsletter of {Tech: Europe}; On Deck's fellowships and why its accelerator closed; Founders Inc's event-fed investing; Antler's pre-team residency; and Indie Hackers' transparency content and changing ownership. For each: what creates value, who pays, and what Suhail can copy without capital.",
  minutes: 80,
  objectives: [
    "You can explain the mechanism behind a batch, a demo day and an alumni network, not just their names",
    "You can compute the implied valuation of a fixed accelerator deal and say what the discount buys",
    "You can describe the {Tech: Europe} model and separate its published facts from inferred economics",
    "You can explain why On Deck closed its accelerator and what that implies for a community company's growth and funding",
    "You can decide which mechanisms Suhail should adopt, adapt or reject",
  ],
  concepts: [
    { id: "sh01.batch-model", name: "Batch model", description: "Admitting a cohort that starts and finishes together, so deadlines, peer comparison and shared experiences create urgency and lifelong ties; the core of YC, Antler residencies and fellowships.", competency: "sh-community", related: ["fc07.accelerator-terms"] },
    { id: "sh01.demo-day", name: "Demo day", description: "A single scheduled event where a whole cohort presents to many investors at once; concentrated attention and scarcity create competition between investors and a hard deadline for founders.", competency: "sh-community", related: ["sh01.batch-model"] },
    { id: "sh01.alumni-network", name: "Alumni network", description: "The accumulated graph of past participants who help, hire, buy from and invest in each other; the asset that compounds and is hardest to copy.", competency: "sh-community", related: ["sh01.batch-model"] },
    { id: "sh01.builder-community-model", name: "Builder community model ({Tech: Europe} type)", description: "Free, approval-gated hackathons funded by sponsor prizes and partner credits, plus a newsletter, a conference and job features; distribution through event pages and chat servers.", competency: "sh-community" },
    { id: "sh01.community-business-risk", name: "Community business risk", description: "Community companies fail when growth is funded ahead of unit economics, when programmes multiply faster than curation, or when an owner's strategy diverges from members' interests (On Deck, Indie Hackers ownership changes).", competency: "sh-community", related: ["sh01.builder-community-model"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Six communities, taken apart by mechanism",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Every partner, sponsor and volunteer you pitch will say "so you are the YC of the Arab world" or "like {Tech: Europe} but for the Gulf". You need to know exactly which part you are copying, why it works there, and whether the conditions exist in Riyadh, Kuwait or Cairo. Copying the form (a demo day, a Discord) without the mechanism (investors who can write cheques that week, members who talk to each other) is the most common way young communities waste a year.`,
        },
        {
          kind: "md",
          md: md`### Y Combinator: batch, demo day, alumni network

Y Combinator (founded 2005 by Paul Graham, Jessica Livingston, Robert Morris and Trevor Blackwell) invests a fixed amount in many very early companies at once and runs them through a short programme. Its 2026 standard deal is USD 500K: **USD 125K for 7 % on a post-money SAFE plus USD 375K on an uncapped MFN SAFE** (per the research brief, unchanged since 2022; YC's own page could not be fetched). It now runs four batches a year.

Three mechanisms do most of the work:

1. **The batch.** A few hundred companies start on the same day and finish on the same day. Shared deadlines, weekly group sessions and visible peer progress create urgency that no individual mentor can. Batchmates become each other's first customers, testers and hires.
2. **Demo Day.** Every company presents in one scheduled window to a large, curated investor audience. Concentrating attention creates **competition between investors**, which raises prices and speeds decisions. It also forces founders to have a story and metrics by a fixed date.
3. **The alumni network.** Thousands of past founders on an internal platform (Bookface) help with intros, advice, hiring and sales. Every new batch adds to it. This is the compounding asset; the cash is replaceable, the network is not.

Selectivity ties them together: because admission is hard, admission itself is a **signal** to investors and employees.`,
        },
        { kind: "equation", formula: "sh01-implied-valuation" },
        {
          kind: "md",
          md: md`For the fixed part, $V_\text{post} = 125{,}000/0.07 \approx$ USD 1.79M. Many accepted companies could raise at higher valuations; the discount is the price of the batch, demo day and network.

### {Tech: Europe}: the builder-community machine

The closest model for Suhail. Per the research brief (all from secondary snippets, Nov 2026):

- Calls itself "Europe's Builder Community", headquartered in Berlin, grown out of **{Tech: Berlin}** (newsletter and hackathons, 2023 to 2024).
- Runs **2 to 3 AI hackathons a month** across European cities (Berlin, Copenhagen, Zurich and others), a **conference for engineers** and a **newsletter**.
- Distribution through **Luma** event pages and **Discord**.
- Hackathons are **free for participants** with **approval-gated registration** (for example a 90-person cap). **Technology partners** provide credits; **sponsors fund prizes** (one sponsor put up a EUR 10K prize; the Big Berlin Hack had more than 300 builders and more than EUR 50K in prizes, co-hosted with CODE University).
- Revenue model **not published**. Visible signals: sponsorship of hackathons and the conference, conference tickets, and hiring features (newsletter issues titled like job posts, a careers board).

The mechanism: **high-frequency, low-cost events** create a constant stream of builders doing visible work; sponsors pay to be present where builders build; the newsletter turns event attendance into a weekly habit and a distribution channel for jobs. Approval gating keeps quality high, which keeps sponsors paying, which keeps events free.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "What we do not know about {Tech: Europe}",
          md: md`Its revenue mix, margins, team size and funding are not public; the research brief found no funding round. Treat any claim about how much it earns from sponsorship versus hiring as inference. When you cite it to partners, cite the format (free, gated, sponsor-funded hackathons; newsletter; conference), not numbers you cannot source.`,
        },
        {
          kind: "md",
          md: md`### On Deck: fellowships, and why the accelerator closed

On Deck (founded 2019) started as **paid, cohort-based fellowships**: professionals paid a fee to join a curated cohort (founders, angels, operators, writers) with programming and a member directory. It raised venture capital, multiplied programmes and in 2021 launched **ODX**, an accelerator investing USD 125K for 7 %, the same headline terms as YC's fixed part.

In 2022 it made two rounds of layoffs, the second cutting about a third of staff, **wound down ODX** and shifted to pre-seed investing (TechCrunch, 4 Aug 2022). Today the **On Deck Fellowship is a paid, non-dilutive cohort community** (ODF28 listed for Q3 2026, secondary source).

The mechanism lessons, which are interpretation rather than reported fact:

1. **Venture money forces venture growth.** A community funded like a software company must grow like one; cohorts multiplied faster than curation could keep up, and quality is the product.
2. **Fees tie revenue to selling the next cohort.** Each cohort is a new sales cycle with its own acquisition cost, so revenue does not compound the way subscriptions do.
3. **An accelerator needs a fund-sized balance sheet and investor-grade selection.** Competing with YC on identical terms without YC's signal or alumni network is a weak position, and the 2022 downturn exposed it.

### Founders, Inc.

A San Francisco investor and community. Self-reported: up to USD 250K at pre-seed for about 4 to 7 %, programmes such as Canopy (5 weeks) and Blueprint II (30 Sep to 11 Dec 2026, USD 150K offer), and heavy use of open Luma events (for example Night Hack). The mechanism: **open events are top-of-funnel for an investing programme**; the community is how the fund finds founders. These figures are from a single secondary source.

### Antler: assembling founders before there is a team

Antler (founded in Singapore in 2017, now in many countries) runs **residencies for individuals**, not companies. People apply alone, spend weeks meeting potential cofounders and testing ideas, and Antler invests when a team forms. Terms vary by region (research brief): EU 2026, EUR 100K on an uncapped MFN SAFE with follow-on up to EUR 250K; US, USD 250K for 10 % plus a USD 150K SAFE. The mechanism: **cofounder matching is the scarce service**; the batch is a structured search process.

### Indie Hackers: transparency content and changing owners

Indie Hackers (started by Courtland Allen in 2016) built a community around **founders openly sharing revenue numbers** in interviews, a forum and a podcast. **Stripe acquired it in April 2017**, when it made about USD 8K a month. In **2023 Courtland and Channing Allen bought it back**; Stripe remains an investor. The mechanisms: concrete, numerical stories create trust and repeat reading; and **ownership shapes the community**, because an owner's strategy (a payment company's interest in more internet businesses) is not the same as the members' interests, and both sides had reasons to change the arrangement.`,
        },
        {
          kind: "matrix",
          title: "Where each model sits",
          xAxis: ["Open admission", "Selective admission"],
          yAxis: ["No capital invested", "Invests in members"],
          cells: [
            { label: "Open funnel, invests", detail: "Founders Inc: open Luma events feed a selective investing programme." },
            { label: "Selective, invests", detail: "YC, Antler. Admission is a signal; the network compounds; needs a fund." },
            { label: "Open, no capital", detail: "Indie Hackers; MLH-style hackathons. Scale and content; revenue from sponsors or an owner." },
            { label: "Selective, no capital", detail: "{Tech: Europe} hackathons (approval-gated), On Deck Fellowship (paid). Curation without a balance sheet." },
          ],
          caption: "Suhail at launch belongs bottom-right: curated, sponsor-funded, no fund. Moving up requires capital and investor-grade selection, which is a separate decision.",
        },
        { kind: "xref", to: "fc07.accelerator-terms", note: "How accelerator deal terms are priced and compared, including SAFEs, from the founder's side." },
      ],
    },
    {
      layer: "applied",
      title: "Pricing the programmes and choosing what to copy",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Implied valuations of fixed deals",
          given: md`Deals from the research brief (Nov 2026): YC fixed part USD 125K for 7 %; On Deck ODX (2021 to 2022) USD 125K for 7 %; Antler US USD 250K for 10 %; Antler EU EUR 100K on an uncapped MFN SAFE.`,
          steps: [
            { md: md`**YC fixed part:** $125{,}000 / 0.07 = $ USD 1.786M post-money.` },
            { md: md`**ODX:** identical terms, USD 1.786M, but without YC's signal or alumni network. Same price, less product.` },
            { md: md`**Antler US fixed part:** $250{,}000 / 0.10 = $ USD 2.5M post-money.` },
            { md: md`**Antler EU:** uncapped MFN SAFE: no implied valuation today. It converts at the next round's price (or matches better terms given to later SAFE holders), so the founder gives up whatever percentage EUR 100K buys at that round.` },
          ],
          result: md`The discount to what a strong team could raise elsewhere is the price of the programme. A community without a fund cannot offer this trade, so Suhail must deliver value that does not depend on a cheque: peers, visibility, hires and introductions.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "What a programme's discount costs a founder (illustrative)",
          given: md`Illustrative: a team accepted to YC believes it could otherwise raise a USD 125K pre-seed on a USD 4M post-money SAFE. Compare the ownership given up for USD 125K at YC terms and at that market valuation.`,
          steps: [
            { md: md`**At YC terms:** 7 % for USD 125K.` },
            { md: md`**At the market valuation:** $125{,}000 / 4{,}000{,}000 = 3.125\,\%$.`, hidden: true, check: { prompt: "Ownership for USD 125K at USD 4M post-money", answer: 3.125, unit: "%", tolerance: { abs: 0.01 } } },
            { md: md`**Extra ownership paid for the programme:** $7 - 3.125 = 3.875$ percentage points.`, hidden: true, check: { prompt: "Extra percentage points paid for the programme", answer: 3.875, unit: "pp", tolerance: { abs: 0.01 } } },
          ],
          result: md`Founders pay almost 4 points of their company for batch, demo day and network. That is a useful benchmark when someone asks what a Suhail programme is worth: if founders would not give up anything for it, it has to earn its value through outcomes they can see.`,
        },
        {
          kind: "md",
          md: md`### Adopt, adapt, reject: a first cut for Suhail

| Mechanism | Source | Suhail decision | Why |
|---|---|---|---|
| Free, approval-gated hackathons funded by sponsors | {Tech: Europe} | **Adopt** | Cheap, frequent, visible work; gating protects quality |
| Weekly newsletter with jobs | {Tech: Europe} | **Adopt** | Turns attendance into a habit and a job channel |
| Annual conference | {Tech: Europe} | **Adopt as Suhail Season** | One concentrated moment for sponsors and media |
| Batch with fixed start and end | YC, Antler | **Adapt** | Short cohorts (for example a 6-week build season) without investment |
| Demo day | YC | **Adapt** | Demo nights only with investors who can actually invest in the region |
| Alumni network | YC | **Adapt** | Directory of hackathon winners and contributors, opt-in |
| Cofounder matching | Antler | **Adapt later** | High value, high curation cost |
| Paid fellowship | On Deck | **Reject at launch** | Revenue tied to cohort sales; quality risk |
| Investing programme | YC, Founders Inc | **Reject at launch** | Needs a fund and investor-grade selection; separate decision |
| Revenue transparency content | Indie Hackers | **Adapt for The Majlis and the newsletter** | Concrete numbers build trust, if founders consent |`,
        },
        {
          kind: "question",
          question: {
            id: "sh01-l02-p1",
            type: "numeric",
            prompt: md`Founders, Inc. self-reports up to USD 250K for about 4 to 7 %. What implied post-money valuation does USD 250K for 5 % give, in USD millions?`,
            answer: 5,
            tolerance: { abs: 0.01 },
            unit: "USD M",
            explanation: md`$250{,}000 / 0.05 = $ USD 5.0M. At 4 % it would be USD 6.25M, at 7 % USD 3.57M. The figures are self-reported and unverified.`,
            concepts: ["sh01.batch-model"],
            difficulty: 1,
          },
        },
      ],
      },
    {
      layer: "field",
      title: "Copying mechanisms, not forms",
      blocks: [
        {
          kind: "callout",
          tone: "pitfall",
          title: "A demo day without investors who can invest",
          md: md`A demo day works because investors with money and authority compete in one room. If the audience is mostly corporate innovation staff, government observers and other founders, you get applause and no term sheets, and founders learn the event is theatre. Before calling anything a demo night, count the people in the room who have written a pre-seed cheque in the last year.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Raising venture money on a community too early",
          md: md`On Deck shows the pattern: outside capital demands growth, growth multiplies programmes, programmes outrun curation, quality falls and the best members leave first. Suhail's plan (volunteer leads, sponsor-funded, from January 2027) avoids this by design. If you ever raise for Suhail, raise for a specific engine with its own economics (a fund, a research arm, a paid product), not for "growing the community". The structures module covers the options.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "Read the ownership and incentives of every model",
          md: md`Before copying a model, ask who owns it and who pays. Indie Hackers under Stripe, Founders Inc as a fund, YC as a fund, {Tech: Europe} as an independent community: each makes decisions that serve its owner. Suhail's members, sponsors and volunteer leads will ask the same about you, so write down early who owns Suhail, how it makes money and what it will never do (for example: sell member data, give one sponsor exclusive access to all builders).`,
        },
        {
          kind: "checklist",
          title: "Mechanism teardown template",
          items: [
            "Who is admitted, how, and how selective",
            "What creates value for members (the mechanism, in one sentence)",
            "Who pays, for what, and how often",
            "What compounds over time (network, brand, content, data)",
            "What breaks it (scale, owner incentives, funding, quality)",
            "Which conditions it needs that may not exist in the Arab cities Suhail targets",
          ],
        },
        { kind: "scenario", scenario: "sh01-s1" },
        {
          kind: "question",
          question: {
            id: "sh01-l02-p2",
            type: "short",
            prompt: md`Write a one-page **mechanism teardown** of {Tech: Europe} or Y Combinator for Suhail's leads, using the checklist above. End with three mechanisms Suhail will adopt or adapt in 2027 and one it will explicitly reject, each with a one-line reason. Separate published facts from your inferences.`,
            rubric: [
              "Describes admission, value mechanism, payer, what compounds and what breaks it, accurately for the chosen model",
              "Uses only facts from the research brief or well-established knowledge, with inferred economics labelled as inference",
              "Names conditions the model needs and whether they exist in Suhail's target cities",
              "Gives three adopt or adapt decisions and one reject, each with a concrete reason tied to Suhail's constraints (volunteer team, no fund, sponsor-funded)",
              "Does not claim Suhail has members, sponsors or events",
            ],
            modelAnswer: md`**{Tech: Europe} teardown (for Suhail leads, Jan 2027 planning)**

Facts (research brief, secondary sources, Nov 2026): Berlin-based "Europe's Builder Community", grown from {Tech: Berlin}. Runs 2 to 3 AI hackathons a month across European cities, a conference for engineers and a newsletter. Distribution on Luma and Discord. Hackathons free, approval-gated (for example a 90-person cap), prizes from sponsors (EUR 10K from one sponsor; Big Berlin Hack: more than 300 builders, more than EUR 50K prizes, co-hosted with CODE University), credits from technology partners. A careers board exists; newsletter issues read like job posts.

Inference (unverified): revenue from hackathon and conference sponsorship, conference tickets and hiring features. No funding round found.

Mechanism: frequent, free, curated hackathons produce visible work; sponsors pay to be where builders build; the newsletter converts one-off attendance into a weekly habit and a job channel. Compounds: brand, member list, sponsor relationships, city chapters. Breaks if: quality drops as cities multiply, or sponsors see no hires.

Conditions: dense builder pools in many cities, venues, AI companies with developer-relations budgets, open event culture. In the Arab world these exist in Riyadh, Dubai, Abu Dhabi and Cairo; permits matter in Saudi Arabia; Kuwait and Amman are smaller pools.

Adopt: (1) free, approval-gated hackathons with sponsor prizes, because cost per event is low and gating protects sponsor value; (2) a weekly newsletter with curated jobs, because it is the cheapest retention ritual; (3) one annual conference (Suhail Season) to concentrate sponsor and media attention.
Reject: running hackathons in many cities in year one, because a volunteer team cannot curate more than one or two cities well.`,
            explanation: md`A good teardown separates facts from inference and ends with decisions tied to Suhail's real constraints.`,
            concepts: ["sh01.builder-community-model", "sh01.community-business-risk", "sh01.batch-model"],
            difficulty: 2,
          },
        },
        { kind: "sources", refs: ["sh01-r1", "sh01-r2", "sh01-r3", "sh01-r4", "sh01-r5", "sh01-r6", "sh01-r7", "sh01-r8", "sh01-r9", "sh01-r10", "sh01-r11"] },
        {
          kind: "feynman",
          prompt: "Explain to a new Suhail volunteer lead why Y Combinator's demo day works and why simply running a 'Suhail Demo Day' might not.",
          keyPoints: [
            "Demo day concentrates many investors with money into one scheduled window",
            "That creates competition between investors and a hard deadline for founders",
            "It relies on selective admission as a signal, so investors trust the pool",
            "Without investors who can write cheques, it is a showcase, not a market",
            "Suhail should adapt the format only when the investor side is real",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh01-l02-q1",
      type: "mcq",
      prompt: md`Which mechanism of Y Combinator is hardest for a new entrant to copy?`,
      options: ["The USD 500K deal", "The fixed batch calendar", "The alumni network", "The demo day format"],
      answer: 2,
      explanation: md`Cash and calendars are easy to copy (On Deck copied the headline terms). The alumni network compounds over two decades of batches and is the source of much of the signal and practical help.`,
      concepts: ["sh01.alumni-network"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh01-l02-q2",
      type: "numeric",
      prompt: md`What post-money valuation (USD millions) is implied by USD 125K for 7 %? Two decimals.`,
      answer: 1.79,
      tolerance: { abs: 0.01 },
      unit: "USD M",
      explanation: md`$125{,}000 / 0.07 = 1{,}785{,}714$, about USD 1.79M.`,
      concepts: ["sh01.batch-model"],
      difficulty: 1,
    },
    {
      id: "sh01-l02-q3",
      type: "multi",
      prompt: md`Which of these are reported facts (research brief) about {Tech: Europe}, not inferences? Select all that apply.`,
      options: [
        "Hackathons are free for participants with approval-gated registration",
        "Most of its revenue comes from recruiting fees",
        "It runs 2 to 3 AI hackathons a month across European cities",
        "It grew out of {Tech: Berlin}",
        "It is profitable",
      ],
      answer: [0, 2, 3],
      explanation: md`The format and origin are reported. Revenue mix and profitability are not published; the research brief marks the business model as inferred and unverified.`,
      concepts: ["sh01.builder-community-model"],
      difficulty: 2,
    },
    {
      id: "sh01-l02-q4",
      type: "mcq",
      prompt: md`Which lesson from On Deck applies most directly to Suhail?`,
      options: [
        "Paid fellowships cannot work anywhere",
        "Outside venture capital forces growth that can outrun curation, and an accelerator without a fund-grade signal is a weak position",
        "Communities should never charge members",
        "Accelerators should invest more than USD 125K",
      ],
      answer: 1,
      explanation: md`On Deck still runs a paid fellowship, so fees can work. The transferable lesson is about funding, growth pressure, curation and competing with YC on its own terms without its assets.`,
      concepts: ["sh01.community-business-risk"],
      difficulty: 2,
    },
    {
      id: "sh01-l02-q5",
      type: "mcq",
      prompt: md`What is the scarce service in Antler's model?`,
      options: ["Office space", "Cofounder matching before a team exists", "Demo day access", "Cloud credits"],
      answer: 1,
      explanation: md`Antler admits individuals and invests when teams form; structured cofounder search is the product.`,
      concepts: ["sh01.batch-model"],
      difficulty: 1,
    },
    {
      id: "sh01-l02-q6",
      type: "decision",
      prompt: md`A volunteer lead proposes a "Suhail Demo Day" at the first hackathon in Kuwait to impress sponsors. Two angels have confirmed; the rest of the audience will be students and sponsor staff. What do you decide?`,
      options: [
        { text: "Run it as a Demo Day and promote it widely.", score: 0.2, feedback: "Founders will pitch to an audience that cannot invest, and the name will lose meaning before it means anything." },
        { text: "Call it a project showcase, invite the two angels as judges, and build the investor list until a real demo night is credible.", score: 1, feedback: "Right: honest naming protects the format for later, and judges with cheque-writing experience still add signal." },
        { text: "Cancel any presentation format until a fund partners with Suhail.", score: 0.5, feedback: "Too cautious: visible work and judging are valuable for builders and sponsors even without investors." },
      ],
      explanation: md`Copy mechanisms, not names. A demo day needs competing investors.`,
      concepts: ["sh01.demo-day"],
      difficulty: 2,
    },
    {
      id: "sh01-l02-q7",
      type: "mcq",
      prompt: md`What does the Indie Hackers ownership history illustrate?`,
      options: [
        "Communities cannot be sold",
        "An owner's strategy can differ from the members' interests, and ownership structure shapes what a community can do",
        "Stripe closed Indie Hackers",
        "Revenue transparency drives members away",
      ],
      answer: 1,
      explanation: md`Stripe acquired it in 2017 (about USD 8K a month at the time); the founders bought it back in 2023 with Stripe remaining an investor.`,
      concepts: ["sh01.community-business-risk"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh01-l02-f1", front: "YC standard deal (2026)", back: "USD 500K: USD 125K for 7 % on a post-money SAFE plus USD 375K on an uncapped MFN SAFE (research brief, secondary).", concepts: ["sh01.batch-model"] },
    { id: "sh01-l02-f2", front: "Why demo day works", back: "Concentrated, curated investor attention in one window creates competition between investors and a hard deadline for founders.", concepts: ["sh01.demo-day"] },
    { id: "sh01-l02-f3", front: "{Tech: Europe} format", back: "2 to 3 free, approval-gated AI hackathons a month; sponsor prizes and partner credits; newsletter; engineer conference; Luma and Discord.", concepts: ["sh01.builder-community-model"] },
    { id: "sh01-l02-f4", front: "On Deck ODX", back: "Accelerator at USD 125K for 7 %, wound down in 2022 amid layoffs; On Deck now runs a paid, non-dilutive fellowship.", concepts: ["sh01.community-business-risk"] },
    { id: "sh01-l02-f5", front: "Indie Hackers ownership", back: "Stripe acquired it in April 2017 (about USD 8K a month); Courtland and Channing Allen bought it back in 2023; Stripe remains an investor.", concepts: ["sh01.community-business-risk"] },
    { id: "sh01-l02-f6", front: "Antler model", back: "Residency for individuals; invests when a team forms. EU 2026: EUR 100K uncapped MFN SAFE; US: USD 250K for 10 % plus USD 150K SAFE.", concepts: ["sh01.batch-model"] },
  ],
  scenarios: [
    {
      id: "sh01-s1",
      title: "A fund offers to underwrite Suhail's first season",
      context: md`Illustrative scenario, nothing has been agreed. A regional VC fund's partner likes Suhail's plan and offers to cover the prize pool and venue for the first three hackathons. In return the fund asks for "exclusive first look" at every team and project, its logo as presenting partner, and a fund partner as head judge at every event.`,
      start: "a",
      nodes: {
        a: {
          md: md`The offer would solve your first-season budget. Your Partnerships lead is keen; your Events lead worries builders will see Suhail as the fund's deal-flow funnel. What is your first response?`,
          choices: [
            { text: "Accept as offered: money is the bottleneck in season one.", next: "b", score: 2, feedback: "Exclusivity on all builders hands one fund the asset every other investor and sponsor would pay for, and tells builders whose community this is." },
            { text: "Decline: no investor money in year one.", score: 4, feedback: "Protects neutrality but rejects a partner who could be valuable on fair terms. Usually there is a better structure." },
            { text: "Thank them, and counter with a non-exclusive presenting partnership: logo, one judge seat among several, and a time-limited first look only at teams that opt in.", next: "c", score: 9, feedback: "Keeps the fund's core interest (early sight of founders) while protecting builder trust and the value for other partners." },
          ],
        },
        b: {
          md: md`Two months later another fund and an AI company approach you as sponsors. Both ask whether they will see the teams. You have promised exclusivity.`,
          choices: [
            { text: "Tell them exclusivity is taken and offer logo placement only.", score: 2, feedback: "You have capped your sponsor revenue and made Suhail one investor's channel." },
            { text: "Renegotiate with the first fund to make the first look opt-in and time-limited, and accept the cost to the relationship.", score: 6, feedback: "The right correction, but harder and more costly than setting the terms correctly at the start." },
          ],
        },
        c: {
          md: md`The partner says the first look must cover all teams, not only opt-in ones, or the fund's investment committee will not approve the spend.`,
          choices: [
            { text: "Hold the line on opt-in, offer a 14-day first look and a private session with opted-in teams, and ask what number the committee needs to see.", score: 10, feedback: "Builder consent is non-negotiable; everything else is commercial. Asking what the committee measures turns a demand into a design problem." },
            { text: "Concede all teams to close the deal.", score: 3, feedback: "Builders did not consent to being shown to one investor; when they find out, trust goes first, then the best builders." },
            { text: "End the conversation.", score: 5, feedback: "Safe, but you lose a partner whose underlying need may be satisfiable." },
          ],
        },
      },
      concepts: ["sh01.community-business-risk", "sh01.value-flows"],
    },
  ],
};

export default lesson;
