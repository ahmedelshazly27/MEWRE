import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc11-l02",
  title: "Building the package: five artifacts, one story",
  summary:
    "How to build each artifact to the bar: a driver-based model with unit economics and burn multiple, a deck narrative with a bottom-up market, a fully diluted cap table with SAFE conversion and the option pool shuffle, an investor funnel sized with pipeline maths, and a data room index. A complete worked package for a fictional company, then five graded exercises for your venture.",
  minutes: 90,
  objectives: [
    "You can build a driver-based seed model and derive raise size, runway, unit economics and burn multiple from it.",
    "You can write a deck narrative in which each slide makes one claim backed by one piece of evidence, with a bottom-up market size.",
    "You can model a fully diluted cap table through SAFE conversion and a priced seed with an option pool top-up, and compute price per share and effective pre-money.",
    "You can size an investor list from funnel conversion rates and sequence outreach so meetings cluster.",
    "You can write a data room index in which every claim in the deck has a document behind it.",
  ],
  concepts: [
    {
      id: "fc11.driver-model",
      name: "Driver-based seed model",
      description:
        "A monthly model in which revenue comes from customers x price x ramp and costs from a dated hiring plan, so that raise size, runway, unit economics and burn multiple are outputs, not inputs.",
      competency: "fc-finance",
      related: ["m10.model-structure", "m10.model-audit"],
    },
    {
      id: "fc11.deck-narrative",
      name: "Deck narrative",
      description:
        "A 10 to 14 slide argument (problem, why now, solution, market, evidence, model, go-to-market, competition, team, plan and ask) in which each slide makes one claim with one proof and the ask follows from the plan.",
      competency: "fc-fundraising",
    },
    {
      id: "fc11.post-money-ownership",
      name: "Post-money ownership and SAFE conversion",
      description:
        "Investor ownership is new money divided by post-money; a post-money SAFE holder owns investment divided by the post-money cap; everything issued in the round scales existing holders by the same factor.",
      competency: "fc-fundraising",
    },
    {
      id: "fc11.option-pool-shuffle",
      name: "Option pool shuffle",
      description:
        "Counting the option pool top-up in the pre-money, so that it dilutes only existing holders and lowers the effective pre-money valuation.",
      competency: "fc-legal",
    },
    {
      id: "fc11.investor-funnel",
      name: "Investor funnel and process design",
      description:
        "Treating the raise as a sales pipeline: a tiered list long enough that funnel conversion yields at least two term sheets, contacted in a compressed window so meetings and decisions cluster.",
      competency: "fc-fundraising",
    },
    {
      id: "fc11.data-room",
      name: "Data room index",
      description:
        "The organised set of documents that lets an investor verify every claim in a week: corporate, cap table, financials, commercial, product and security, team, IP and legal, market.",
      competency: "fc-fundraising",
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "How each artifact is built",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`In each of your ventures you are the person who will be asked "send me the model" and "who else is on your cap table?" The engineering partners cannot do this for you. Each artifact below is a system with inputs and outputs, much like a test rig: if the drivers are right the outputs follow, and an investor can audit it in minutes. Build each one so it survives that audit.`,
        },
        {
          kind: "md",
          md: md`### 1. The financial model: drivers in, decisions out

A seed model has three sheets that matter: **assumptions** (every input, with a source or the word "estimate"), **monthly plan** (24 months), and **summary** (the six numbers an investor reads). Revenue is built from drivers, never typed in:

$$\text{MRR}_t = \sum_{\text{customers } i \text{ live at } t} \frac{\text{ACV}_i}{12}, \qquad \text{new customers}_t = \text{ramped sellers}_t \times \text{deals per seller per month}$$

Costs come from a **dated hiring plan** (role, start month, loaded salary) plus non-people costs. Net burn is costs minus cash collected, not revenue booked: B2B customers pay 30 to 60 days after invoice, and annual prepayment changes the picture completely.

The summary has six numbers: **raise**, **runway**, **milestone month**, **ARR at milestone**, **burn multiple** and **unit economics** (LTV/CAC and CAC payback). At seed, unit economics come from a handful of customers. Show them, show the sample size, and say which input is least certain.`,
        },
        { kind: "equation", formula: "fc11-ltv" },
        { kind: "equation", formula: "fc11-burn-multiple" },
        {
          kind: "widget",
          widget: "unit-economics",
          props: { price: 2500, grossMargin: 0.75, cac: 36000, churn: 0.0067, cash: 2800000, burn: 115000 },
          caption: "Preset to the fictional Coldline example below (EUR 2,500/month per customer, 75 % gross margin, EUR 36k CAC, 0.67 %/month churn, EUR 2.8 m cash, EUR 115k/month burn). Move churn and CAC: which one breaks LTV/CAC first?",
        },
        { kind: "xref", to: "m10.model-audit", note: "The same model discipline you learned for project finance models applies: one input sheet, no hard-coded numbers in formulas, a check row that must read zero." },
        {
          kind: "md",
          md: md`### 2. The deck narrative: one claim, one proof, per slide

Investors read a deck as an argument. Each slide answers one question and earns the next one. The sequence below follows the classic Sequoia structure, adapted for B2B infrastructure.

| # | Slide | The claim | The proof the bar requires |
|---|---|---|---|
| 1 | Title and one-liner | What you do, for whom, in one line | A sentence a partner could repeat to the partnership |
| 2 | Problem | A specific, costly pain for a named buyer | A number: hours, euros, failure rates; a quote from a buyer |
| 3 | Why now | Something changed recently | The change, dated (regulation, cost curve, platform shift) |
| 4 | Solution and demo | How you remove the pain | Screenshot or 60-second video of the real product |
| 5 | Evidence | People want this | Signed contracts, paid pilots, usage; each labelled for what it is |
| 6 | Market | It is big enough | Bottom-up: countable accounts x ACV, with the source of the count |
| 7 | Business model | It makes money | Price, gross margin, ACV, sales motion |
| 8 | Go-to-market | You can reach the buyer repeatedly | First segment, channel, cycle length, first 10 targets by type |
| 9 | Competition | You understand the landscape and have an edge | Named alternatives (including "do nothing" and in-house tools) and the axis on which you win |
| 10 | Team | You are the people to do this | Why this team has an unfair insight; who does what |
| 11 | Plan and milestone | The money becomes evidence | Hiring plan, milestone, month |
| 12 | The ask | The amount follows from the plan | Round thesis; instrument; use of funds |`,
        },
        { kind: "equation", formula: "fc11-bottom-up-market" },
        {
          kind: "md",
          md: md`### 3. Round design and the cap table

Choose the instrument for a reason. A **post-money SAFE** is fast and cheap (one standard document, no board, no price negotiation) and fits small, rolling seed rounds and accelerator money. A **priced seed** sets a share price, brings a lead investor with a board seat or observer, and costs more in legal fees, but it settles the cap table and is what many European institutional seed funds expect.`,
        },
        { kind: "equation", formula: "fc11-post-money" },
        { kind: "equation", formula: "fc11-price-per-share" },
        { kind: "equation", formula: "fc11-safe-conversion" },
        { kind: "equation", formula: "fc11-dilution" },
        { kind: "equation", formula: "fc11-effective-pre" },
        {
          kind: "widget",
          widget: "cap-table",
          props: { founders: 3, poolPct: 10 },
          caption: "Model founders, option pool, a post-money SAFE converting at the priced seed, and a Series A. Watch the founders' line: where does it cross 50 %?",
        },
        {
          kind: "widget",
          widget: "safe-vs-priced",
          props: { raise: 2500000, cap: 12500000, discount: 0.2, preMoney: 10000000 },
          caption: "Compare the same EUR 2.5 m as a post-money SAFE, a pre-money SAFE and a priced seed. Note who absorbs the dilution from each additional SAFE.",
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Instrument and jurisdiction: check with counsel",
          md: md`The YC SAFE is written for US (typically Delaware) companies. Dutch BVs and Swiss AGs issue shares by notarial deed and shareholder resolution, and European seed rounds commonly use a **convertible loan agreement** or a priced round instead of a US SAFE; some investors also ask for a holding-company flip to Delaware. Treat this as general practice to verify with a local lawyer for the entity you actually use, not as legal advice.`,
        },
        {
          kind: "md",
          md: md`### 4. The investor list and outreach plan

Fundraising is a pipeline with funds as accounts. A qualified name invests at your **stage** (seed), in your **sector** (or thesis), at your **cheque size**, in your **geography**, and has not funded a direct competitor. Tier the list: **A** (ideal lead, warm path), **B** (good fit, lead or follow), **C** (follow-on cheques, angels, strategics). Contact B-tier first by a week, to rehearse on real investors, then A-tier, all within two weeks, so that first meetings, partner meetings and decisions happen in the same window. Momentum is the strongest negotiating position a seed founder has.`,
        },
        { kind: "equation", formula: "fc11-investor-funnel" },
        {
          kind: "widget",
          widget: "pipeline-forecast",
          props: { target: 2500000, acv: 250000 },
          caption: "The sales pipeline forecaster used as an analogy: treat each fund as a deal, the average cheque as the deal value and the round size as the target. Weighted pipeline must cover the round several times over before you start closing.",
        },
        {
          kind: "md",
          md: md`### 5. The data room index

The data room is the evidence behind the deck. Build the **index** first: a numbered list of folders and documents, each with a status (ready, in draft, missing). Open a light version (deck, model summary, cap table) after a first meeting and the full room after a partner meeting, with access logs and watermarking if your tool supports it.

| Folder | Contents |
|---|---|
| 1 Corporate | Articles, registry extract, shareholder and board resolutions, founders' agreement |
| 2 Cap table and securities | Fully diluted cap table, SAFEs or convertible loans, option plan and grants, vesting schedules |
| 3 Financials | Model, bank statements, management accounts, budget vs actual |
| 4 Commercial | Customer and pilot contracts (with success criteria), pricing, pipeline export, reference list |
| 5 Product and security | Architecture overview, roadmap, security and deployment documentation, demo video |
| 6 Team | Org chart, bios, key employment and contractor agreements, hiring plan |
| 7 IP and legal | IP assignments from every founder, employee and contractor, trademarks, open-source licence register, data processing agreements, disputes (or a statement that there are none) |
| 8 Market | Bottom-up market workbook, competitive landscape with sources |`,
        },
        { kind: "sources", refs: ["fc11-r1", "fc11-r4", "fc11-r6", "fc11-r11", "fc11-r12"] },
      ],
    },
    {
      layer: "applied",
      title: "The standard: a complete package for a fictional company",
      blocks: [
        {
          kind: "callout",
          tone: "tip",
          title: "Coldline is fictional",
          md: md`**Coldline BV does not exist.** It is an invented company used only to show the standard of a complete package: predictive maintenance software for industrial refrigeration compressors in European cold-storage warehouses, 3 founders, 8 paying customers. Every number about it is invented and internally consistent. It is not modelled on Afterwave, Mizan or Suhail.`,
        },
        {
          kind: "worked",
          mode: "worked",
          title: "Coldline artifact 1: the model summary and raise",
          given: md`**Fictional facts at month 0.** 8 customers on annual contracts at EUR 30k ACV (ARR EUR 240k), gross margin 75 %, net burn EUR 60k/month, cash EUR 300k. Over the last 12 months: net burn EUR 600k, net new ARR EUR 200k. Fully loaded CAC from the last 5 deals: EUR 36k. Annual logo churn: 1 loss in 12.5 customer-years, about 8 %. Hiring plan: 2 account executives (months 1 and 4), 1 customer success manager (month 3), 3 engineers (months 1, 2, 6), giving an average net burn of EUR 115k/month over 18 months.`,
          steps: [
            { md: md`**Milestone (month 18):** ARR EUR 1.2 m from about 40 customers, net revenue retention above 110 %, burn multiple below 2 over the last 6 months. This is what Coldline's target Series A funds say they look for (fictional).` },
            { md: md`**Raise:** $R = 115 \times 18 \times 1.25 - 300 = 2{,}587.5 - 300 = 2{,}287.5$ k EUR, rounded to **EUR 2.5 m**. **Runway:** $(300 + 2{,}500)/115 = 24.3$ months.` },
            { md: md`**Burn multiple today:** $600 / 200 = 3.0$. Honest and weak: the deck says so and shows why the plan brings it below 2 (two ramped sellers on a proven playbook instead of founder-led sales).` },
            { md: md`**Unit economics:** $\text{LTV} = 30 \times 0.75 / 0.08 = 281$ k EUR, but the 12.5-year implied life is not credible, so the deck uses a 6-year cap: $30 \times 0.75 \times 6 = 135$ k EUR, LTV/CAC $= 135/36 = 3.75$. CAC payback $= 36 / (30 \times 0.75 / 12) = 19.2$ months, acceptable for mid-market B2B. Sample: 8 customers, 5 recent deals; stated on the slide.` },
          ],
          result: md`**Summary row:** raise EUR 2.5 m, runway 24 months, milestone month 18, ARR EUR 1.2 m at milestone, burn multiple 3.0 today and below 2 at milestone, LTV/CAC 3.75 (6-year cap), payback 19 months. Six numbers, each traceable to a driver.`,
        },
        {
          kind: "worked",
          mode: "worked",
          title: "Coldline artifact 2: the deck narrative (12 slides, claim and proof)",
          given: md`The narrative is written as one claim per slide, each claim earning the next. Numbers are fictional and match the model.`,
          steps: [
            { md: md`**1 One-liner:** "Coldline predicts compressor failures in cold-storage warehouses 10 days ahead, so operators stop losing stock." **2 Problem:** an unplanned compressor failure in a large cold store risks stock worth hundreds of thousands of euros; customers report 2 to 4 such events a year (from 14 discovery interviews, quotes in the data room). **3 Why now:** cheap retrofit vibration and current sensors, plus EU refrigerant rules forcing compressor replacement and monitoring upgrades.` },
            { md: md`**4 Solution:** 40-second demo video of a real alert. **5 Evidence:** 8 paying customers, EUR 240k ARR, 1 customer lost since launch, 2 expansions; pilots and LOIs listed separately and labelled as such. **6 Market:** about 4,000 cold-storage sites in the EU above the size threshold (count from an industry association register, cited) x EUR 30k = **EUR 120 m/yr SAM**; expansion to food processing plants shown as upside, not in the number.` },
            { md: md`**7 Business model:** annual subscription per site, 75 % gross margin, hardware passed through at cost. **8 GTM:** mid-size operators with 3 to 10 sites; outbound plus refrigeration-contractor referrals; 4-month cycle. **9 Competition:** OEM monitoring portals (locked to one brand), generic industrial IoT platforms (no compressor models), and "do nothing plus a maintenance contract"; Coldline wins on multi-brand failure prediction trained on its fleet data. **10 Team:** a refrigeration engineer, an ML engineer and a commercial founder who sold to the same buyers for 6 years.` },
            { md: md`**11 Plan:** the hiring plan from the model, milestone month 18. **12 Ask:** "EUR 2.5 m priced seed buys EUR 1.2 m ARR, NRR above 110 % and a burn multiple below 2 in 18 months: 55 % go-to-market, 35 % product, 10 % G&A."` },
          ],
          result: md`Every number on the slides appears in the model or the data room. A partner can forward this deck without Coldline in the room and the argument still holds.`,
        },
        {
          kind: "worked",
          mode: "worked",
          title: "Coldline artifact 3: cap table and round design",
          given: md`**Fictional cap table before any conversion:** founders 9,000,000 shares (3,000,000 each), 1,000,000 options already granted to the first two engineers, no unallocated pool. An earlier **EUR 500k post-money SAFE with a EUR 5 m cap**. New round: **EUR 2.5 m priced seed at EUR 10 m pre-money**, lead requires an unallocated pool of **10 % post-money**, counted in the pre-money.`,
          steps: [
            { md: md`**SAFE conversion.** $s_{\text{SAFE}} = 0.5 / 5 = 10\%$ of the capitalization before new money. SAFE shares $X$ satisfy $X / (10{,}000{,}000 + X) = 0.10$, so $X = 1{,}111{,}111$. Capitalization after conversion: 11,111,111 shares. SAFE conversion price $= 5{,}000{,}000 / 11{,}111{,}111 = $ EUR 0.45/share.` },
            { md: md`**Round.** $V_{\text{post}} = 10 + 2.5 = 12.5$ m, $s_{\text{inv}} = 2.5 / 12.5 = 20\%$. Pool top-up 10 %. Existing holders scale by $1 - 0.20 - 0.10 = 0.70$: post-money fully diluted shares $N = 11{,}111{,}111 / 0.70 = 15{,}873{,}016$.` },
            { md: md`**Shares and price.** Investors $0.20 N = 3{,}174{,}603$ shares; pool $0.10 N = 1{,}587{,}302$. Pre-money shares $= 11{,}111{,}111 + 1{,}587{,}302 = 12{,}698{,}413$; $p = 10{,}000{,}000 / 12{,}698{,}413 = $ EUR 0.7875/share, and $3{,}174{,}603 \times 0.7875 = $ EUR 2.5 m. The SAFE holder bought at EUR 0.45, a 43 % discount to the round price, as the cap intended.` },
            { md: md`**After the round (fully diluted):**

| Holder | Shares | % |
|---|---|---|
| Founders (3) | 9,000,000 | 56.7 |
| Granted options | 1,000,000 | 6.3 |
| SAFE holder | 1,111,111 | 7.0 |
| New pool (unallocated) | 1,587,302 | 10.0 |
| Seed investors | 3,174,603 | 20.0 |
| **Total** | **15,873,016** | **100.0** |

**Effective pre-money:** $10 - 0.10 \times 12.5 = 8.75$ m EUR. The pool was sized from the hiring plan: 6 hires in 18 months at 0.5 to 2.0 % each is about 7 %, plus a reserve for the first Series A hires.` },
            { md: md`**Series A check (illustrative):** a 20 % Series A with a 5 % pool top-up scales everyone by 0.75: founders $56.7 \times 0.75 = 42.5\%$. The table shows founders still holding a large enough stake to stay motivated after two rounds, which is what the lead checks.` },
          ],
          result: md`The cap table, the pool and the hiring plan agree. The founders know before the first meeting that the headline EUR 10 m pre is EUR 8.75 m effective, and can negotiate the pool size from the hiring plan rather than accept a round number.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "What if Coldline's SAFE had a EUR 4 m cap?",
          given: md`Same fictional facts as above, but the EUR 500k post-money SAFE has a **EUR 4 m** post-money cap. Seed and pool unchanged (20 % new investors, 10 % pool, both in the post-money).`,
          steps: [
            {
              md: md`SAFE ownership before new money: $s_{\text{SAFE}} = 0.5 / 4 = 12.5\%$.`,
              hidden: true,
              check: { prompt: "SAFE ownership before the seed money", answer: 12.5, unit: "%", tolerance: { abs: 0.1 } },
            },
            { md: md`Founders before conversion hold $9/10 = 90\%$; after conversion $90 \times (1 - 0.125) = 78.75\%$.` },
            {
              md: md`After the seed, everything scales by 0.70: founders $78.75 \times 0.70 = 55.1\%$.`,
              hidden: true,
              check: { prompt: "Founders' fully diluted ownership after the seed", answer: 55.1, unit: "%", tolerance: { abs: 0.2 } },
            },
          ],
          result: md`A EUR 1 m lower cap costs the founders 1.6 points (56.7 to 55.1 %) and gives the SAFE holder 8.75 % instead of 7.0 % after the seed. Small here; much larger when several SAFEs at low caps are stacked before a round.`,
        },
        {
          kind: "worked",
          mode: "worked",
          title: "Coldline artifacts 4 and 5: investor funnel and data room index",
          given: md`Fictional. Coldline wants at least 2 term sheets from a lead. Its past rates on warm introductions: contact to first meeting 35 %, first meeting to partner meeting 30 %, partner meeting to term sheet 25 %. Average seed cheque in its target funds: EUR 1.0 to 1.5 m for a lead, EUR 250k for followers.`,
          steps: [
            { md: md`**List length:** $N_0 = 2 / (0.35 \times 0.30 \times 0.25) = 2 / 0.02625 = 76$. Build **80**: 20 A-tier (European seed funds with industrial or climate-adjacent theses and a partner who has sold to operations buyers), 35 B-tier, 25 C-tier (angels from refrigeration and food logistics, two strategics' venture arms). Expected term sheets $80 \times 0.02625 = 2.1$.` },
            { md: md`**Sequence:** week 0, data room light version ready and 30 warm-intro requests sent with a forwardable 5-line email; week 1, first meetings with 8 B-tier funds; weeks 2 and 3, A-tier first meetings (target 7); weeks 3 to 5, partner meetings; weeks 5 to 7, term sheets and choice of lead; weeks 7 to 12, diligence and closing. One shared tracker: fund, partner, tier, intro path, stage, next step, date.` },
            { md: md`**Data room index (status):** 1 Corporate (ready); 2 Cap table with SAFE conversion model (ready); 3 Financials: model, 12 months bank statements (ready); 4 Commercial: 8 customer contracts, 2 pilot agreements with success criteria, reference list of 4 customers who agreed to calls (ready); 5 Product and security: architecture, sensor data flow, GDPR position (draft); 6 Team (ready); 7 IP: assignments from all 3 founders and 2 engineers (ready), from one freelance data scientist (**missing**: fix before outreach); 8 Market: site count workbook with source (ready).` },
          ],
          result: md`The funnel tells Coldline that 20 names would produce about 0.5 term sheets: a process that dies quietly. The index exposes the one missing IP assignment before an investor's lawyer does.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Your package: five exercises",
      blocks: [
        {
          kind: "md",
          md: md`### How it is done in practice

- **Model:** a spreadsheet (Google Sheets or Excel) with one assumptions tab; investors will open it, so no macros, no hidden sheets, no circular references. Keep a "what changed" log between versions.
- **Deck:** 12 slides plus an appendix; a PDF for sending and a slightly different version for presenting. Write the slide titles as claims first ("Hardware test teams rerun everything after every firmware change"), then fill each slide with its proof.
- **Cap table:** a cap table tool (Carta, Ledgy and others) or a clean spreadsheet with a conversion model; your lawyer must reconcile it with the registry.
- **Investor list and process:** a CRM or a shared spreadsheet; one row per fund and partner, intro path, stage, next step and date. Reviewed weekly with your cofounders.
- **Data room:** a shared drive or a data room tool with access logs. The index is a document in folder 0.

Build the five artifacts for **the venture you chose in lesson 1**. Each exercise below is graded against its rubric. Use illustrative numbers where you have no facts, and label them.`,
        },
        {
          kind: "callout",
          tone: "ai",
          title: "Use AI as a hostile reader, not as an author",
          md: md`Give a model your deck text and model summary and ask it to act as a seed partner looking for the three places where the artifacts disagree, and the five questions it would ask first. Do not let it generate numbers for your venture: it will invent plausible traction. Keep the data you share inside your company's policy, especially anything from customers under NDA.`,
        },
        {
          kind: "question",
          question: {
            id: "fc11-l02-p1",
            type: "short",
            prompt: md`**Artifact 1: model summary.** For your chosen venture, write the assumptions list (at least 8 drivers, each marked fact or illustrative), the dated hiring plan for the round, and the six-number summary: raise, runway, milestone month, revenue or ARR at milestone, burn multiple (or why it is not yet meaningful) and unit economics with sample size.`,
            rubric: [
              "Revenue is built from drivers (customers or contracts, price or ACV, ramp, sales cycle), not typed in as a curve.",
              "Costs come from a dated hiring plan plus non-people costs; net burn uses cash collected, not revenue booked.",
              "Raise size follows from burn x months x (1 + buffer) minus cash and matches the round thesis from lesson 1.",
              "Unit economics shown with formula, sample size and the least certain input named; implausible lifetimes capped.",
              "Every venture-specific number is a fact the learner knows or is labelled illustrative; no invented traction.",
              "Burn multiple handled honestly: computed if there is recurring revenue, otherwise explained as not yet meaningful.",
            ],
            modelAnswer: md`**Afterwave, illustrative.** Drivers: pilot price EUR 40k for 4 months (illustrative); conversion to annual Lockstep plus Enclave at EUR 120k ACV (illustrative); pilot-to-annual conversion 50 % (estimate); sales cycle 6 months including security review (estimate); 1 new pilot per month from month 4 rising to 2 from month 10 (estimate); gross margin 70 % with on-prem support costs (estimate); payment terms 45 days (estimate); team today 3 (fact).

Hiring plan: 2 software engineers (months 1 and 2), 1 field applications engineer (month 3), 1 data and ML engineer (month 6), 1 account executive (month 9); loaded cost EUR 8 to 11k/month each (illustrative); infrastructure and security certification EUR 6k/month.

Summary: raise EUR 3.0 m; runway 26 months at EUR 120k average net burn; milestone month 20; ARR at milestone about EUR 0.7 m from 6 annual contracts (illustrative output of the drivers above); burn multiple not yet meaningful (no recurring revenue at month 0), target below 3 in months 15 to 20; unit economics: CAC estimated EUR 60k per enterprise logo, payback $60 / (120 \times 0.7/12) \approx 8.6$ months on the illustrative ACV, sample size zero, so the deck shows it as a target with the conversion rate as the least certain input.`,
            explanation: md`The grader looks for the mechanism (drivers to outputs) and for honesty about what is fact and what is estimate. A seed investor forgives estimates; they do not forgive a model that hides them.`,
            concepts: ["fc11.driver-model", "fc11.raise-sizing"],
            difficulty: 3,
          },
        },
        {
          kind: "question",
          question: {
            id: "fc11-l02-p2",
            type: "short",
            prompt: md`**Artifact 2: deck narrative.** Write the 12 slide titles as claims, each with the one piece of evidence that proves it, for your chosen venture. Include a bottom-up market calculation (accounts x ACV, with the source or method for the account count) and the ask slide as a round thesis.`,
            rubric: [
              "Twelve slides in a logical argument: problem, why now, solution, evidence, market, model, GTM, competition, team, plan, ask (or a justified variant).",
              "Each title is a claim, not a label, and each has one specific piece of evidence or an honest gap.",
              "Market is bottom-up with a countable account base and an ACV that matches the model; top-down figures at most as context.",
              "Evidence slide separates contracts, paid pilots, LOIs and conversations, and invents none.",
              "Ask slide states amount, milestone, months and instrument consistent with the model, plus use of funds.",
            ],
            modelAnswer: md`**Afterwave, illustrative.**
1. "Physical AI teams cannot tell which tests to rerun after a change": quote from a validation lead (interview).
2. "Every firmware, model or rig change triggers days of reruns or untested risk": cost per rerun cycle from discovery calls (to be collected).
3. "Why now: AI enters safety functions while the EU Machinery Regulation applies from 20 January 2027": the regulation, dated, with the AI provisions.
4. "Lockstep captures rig signals and screen actions on one clock; Ripple says what to rerun and why": 60-second demo.
5. "Design partners are testing it on real benches": list of design-partner engagements by status (only what is signed).
6. "Market: N hardware test teams in robotics, humanoids, drives, batteries and powertrains x EUR 120k ACV (illustrative)": account count method (funded robotics and humanoid companies plus drive and battery OEM validation groups, from a public list).
7. "Infrastructure pricing with on-prem Enclave": price per bench or site, gross margin estimate.
8. "Land with one test team, expand across programmes": first segment, cycle, security review playbook.
9. "Test-data platforms store data; Ripple decides what to test": Nominal, Sift, Foxglove, NI and Vector named; change impact for physical benches not advertised by any of them (research, dated).
10. "Built by the people who validated Tesla drive units and inverters": Ismail Elmasry, Yusuf Keklik, the CEO's GTM role.
11. "EUR 3.0 m turns pilots into annual contracts in 20 months": hiring plan and milestone.
12. "Ask: EUR 3.0 m priced seed (or post-money SAFE) for milestone X by month 20": use of funds 50 % engineering, 30 % GTM, 20 % security, compliance and G&A.`,
            explanation: md`A partner will reconstruct your argument from the slide titles alone. If the titles read as a story, the deck works without you in the room.`,
            concepts: ["fc11.deck-narrative"],
            difficulty: 2,
          },
        },
        {
          kind: "question",
          question: {
            id: "fc11-l02-p3",
            type: "short",
            prompt: md`**Artifact 3: cap table and round design.** For your chosen venture, choose the instrument and justify it (including the jurisdiction of the entity), set a valuation range with the reasoning, size the option pool from the hiring plan, and show the fully diluted cap table today, after the round (including any SAFE conversion) and after an illustrative Series A. Compute the effective pre-money.`,
            rubric: [
              "Instrument chosen with a reason tied to round size, investor type and entity jurisdiction (SAFE, convertible loan or priced round).",
              "Valuation range justified by dilution target and comparables or market practice, not asserted.",
              "Pool sized from named hires and grant ranges, and placement (pre or post money) stated with its effect.",
              "Cap table arithmetic is correct: post = pre + money, ownership = money / post, SAFE conversion, scaling of existing holders; totals 100 %.",
              "Effective pre-money computed and founders' ownership after a Series A shown.",
              "Uses illustrative numbers where facts are unknown and does not describe any undisclosed cofounder.",
            ],
            modelAnswer: md`**Afterwave, illustrative.** Founders hold 100 % today across the three named founders (split not stated here). If YC accepts, its standard deal would add a USD 125k post-money SAFE for 7 % and a USD 375k uncapped MFN SAFE (to confirm on YC's site), which would convert in the seed.

Instrument: priced seed of EUR 3.0 m led by a European seed fund, because the round is large enough for the legal cost to be small relative to it, it settles the YC SAFEs, and the entity choice (Delaware parent if YC, otherwise a Dutch BV or Swiss AG) must be fixed before closing.

Valuation: EUR 12 m pre (20 % dilution) as the target, EUR 10 to 14 m as the range, justified by the 15 to 25 % seed dilution band.

Pool: 5 hires over 20 months at 0.5 to 1.5 % each, about 5 %, plus Series A senior-hire reserve, so 8 % post-money, in the pre-money.

After the seed (illustrative): the YC 7 % SAFE converts first, so founders hold 93 % before new money. Assume the uncapped MFN SAFE converts at the seed price and is counted inside the EUR 3.0 m round. New money (seed investors plus MFN SAFE) 20 %, pool 8 %: founders $= 93\% \times (1 - 0.20 - 0.08) = 67.0\%$, YC capped SAFE $7\% \times 0.72 = 5.0\%$. Effective pre $= 12 - 0.08 \times 15 = 10.8$ m EUR. Series A at 20 % plus 5 % pool: founders $67.0 \times 0.75 \approx 50.2\%$.`,
            explanation: md`The grader checks the arithmetic and the reasoning behind each choice. Most founders lose more value to an oversized pool in the pre-money than to a slightly lower headline valuation.`,
            concepts: ["fc11.post-money-ownership", "fc11.option-pool-shuffle"],
            difficulty: 3,
          },
        },
        {
          kind: "question",
          question: {
            id: "fc11-l02-p4",
            type: "short",
            prompt: md`**Artifact 4: investor list and outreach plan.** Define what makes an investor qualified for your round, give the list structure (tiers and counts with example investor types), size the list with funnel maths, write the forwardable intro email (5 lines) and the week-by-week sequence to close.`,
            rubric: [
              "Qualification criteria cover stage, sector or thesis, cheque size, geography and conflicts with competitors.",
              "Tiers with counts, and the list length derived from conversion rates to give at least 2 expected term sheets.",
              "Outreach is compressed and sequenced (B before A, all within about 2 weeks) so meetings and decisions cluster.",
              "Forwardable email is 5 lines or fewer, states what, why now, evidence, team and the ask, and contains only true claims.",
              "Process has a tracker, weekly review and a plan for what to do if no lead emerges by a set week.",
            ],
            modelAnswer: md`**Afterwave, illustrative.** Qualified: leads seed rounds of EUR 2 to 4 m; thesis in industrial software, robotics, physical AI or developer infrastructure; invests in the Netherlands, Switzerland or the US; no investment in Nominal, Sift or a direct equivalent.

Tiers: A, 20 seed funds with a partner who has backed hardware or industrial infrastructure software; B, 35 generalist seed funds and robotics-focused funds; C, 25 angels (validation and test leaders, robotics founders) and venture arms of drive, battery or robotics companies.

Funnel (illustrative rates): $80 \times 0.35 \times 0.30 \times 0.25 = 2.1$ term sheets; 80 names needed for 2.

Email: "Afterwave builds test infrastructure for physical AI: Lockstep captures rig and screen data on one clock, Ripple tells hardware teams which tests to rerun after a firmware, model or rig change. Why now: AI is entering machine safety functions and the EU Machinery Regulation applies from 20 January 2027. Founders validated drive units and inverters at Tesla. We are raising EUR 3.0 m to turn design-partner pilots into annual contracts. Deck attached; 30 minutes in the next two weeks?"

Sequence: week 0 intros requested; week 1 B-tier first meetings; weeks 2 to 3 A-tier; weeks 3 to 5 partner meetings; week 6 lead decision. If no partner meetings by week 4, stop, debrief the objections, fix the package and restart in 6 weeks rather than drip on.`,
            explanation: md`A good list is as much about who not to contact (conflicted, wrong stage, wrong cheque) as who to contact. The funnel maths stops you starting a process that cannot close.`,
            concepts: ["fc11.investor-funnel"],
            difficulty: 2,
          },
        },
        {
          kind: "question",
          question: {
            id: "fc11-l02-p5",
            type: "short",
            prompt: md`**Artifact 5: data room index.** Write the numbered index for your venture's data room: folders, documents, and status (ready, draft, missing). Map each claim on your deck's evidence, market, team and ask slides to the document that proves it, and list what you must fix before outreach.`,
            rubric: [
              "Covers corporate, cap table and securities, financials, commercial, product and security, team, IP and legal, market.",
              "Each deck claim on the key slides is mapped to a specific document.",
              "IP assignment from every founder, employee and contractor and the cofounder agreement are explicitly checked.",
              "Status is honest; missing items have an owner and a date before outreach starts.",
              "Staged access (light room after first meeting, full room after partner meeting) is planned.",
            ],
            modelAnswer: md`**Afterwave, illustrative.** 0 Index and Q&A log. 1 Corporate: articles, registry extract, founders' agreement with vesting (draft), shareholder resolutions. 2 Cap table: fully diluted table and conversion model for any SAFEs (ready after YC decision). 3 Financials: model, bank statements, budget vs actual (ready). 4 Commercial: design-partner and pilot agreements with success criteria and prices (only signed ones), pipeline export, reference contacts who have agreed to calls (to collect). 5 Product and security: Lockstep, Enclave and Ripple architecture; on-prem deployment and isolated-tenant description; security questionnaire answers; demo video (draft). 6 Team: bios, roles, hiring plan, contractor agreements. 7 IP and legal: IP assignments from all three founders and every contractor (check: any code written before incorporation must be assigned), confirmation that former employers' IP is not used, open-source licence register, data processing agreement template. 8 Market: account count workbook and competitor table with dated sources.

Claim map: "why now" slide to the regulation text; "team" slide to bios and references; "competition" to the dated competitor table; "ask" to the model. Fix before outreach: founders' agreement and IP assignments signed, security pack in a shareable form, two reference customers confirmed.`,
            explanation: md`For a company whose founders came from large employers, the IP and prior-employer questions are the first thing an investor's lawyer checks. Answer them before they are asked.`,
            concepts: ["fc11.data-room"],
            difficulty: 2,
          },
        },
        {
          kind: "checklist",
          title: "Reconciliation check before any outreach",
          items: [
            "The ask on slide 12 equals the raise in the model summary and the new money in the cap table.",
            "The hiring plan in the model matches the pool sizing and the use of funds on the ask slide.",
            "The milestone on the plan slide is the month in the model where ARR or evidence reaches the next-round bar.",
            "Every number on the evidence slide is backed by a signed document in folder 4.",
            "The market ACV equals the ACV in the model.",
            "The cap table totals 100 % fully diluted, and the founders' share after an illustrative Series A is shown.",
            "IP assignments and the founders' agreement are signed.",
          ],
        },
        {
          kind: "ask",
          title: "Questions for your lawyer before you send a term sheet or SAFE",
          items: [
            "Which entity should raise (Dutch BV, Swiss AG, Delaware parent) given where investors and the team are, and what does a flip cost later?",
            "Does our instrument's capitalization definition include the pool increase, and who bears dilution from later SAFEs?",
            "Are all founders' and contractors' IP assignments effective under the law of their residence, including work done before incorporation?",
            "What founder vesting and leaver terms are market for this investor base?",
            "What disclosures must we make about founders' other ventures and time commitments?",
          ],
        },
        { kind: "xref", to: "m10.tornado-scenario", note: "Run a tornado on your seed model the same way: which three drivers move the milestone month most? Those are the assumptions investors will attack." },
      ],
    },
  ],
  quiz: [
    {
      id: "fc11-l02-q1",
      type: "numeric",
      prompt: md`A seed fund invests EUR 3 m at a EUR 9 m pre-money valuation. What percentage of the company (fully diluted, post-money) does it own?`,
      answer: 25,
      unit: "%",
      tolerance: { abs: 0.1 },
      explanation: md`$V_{\text{post}} = 9 + 3 = 12$ m; $s = 3/12 = 25\%$.`,
      concepts: ["fc11.post-money-ownership"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc11-l02-q2",
      type: "numeric",
      prompt: md`Headline pre-money EUR 8 m, raise EUR 2 m, and the lead requires a 12 % post-money unallocated pool counted in the pre-money. What is the effective pre-money valuation in EUR m?`,
      answer: 6.8,
      unit: "EUR m",
      tolerance: { abs: 0.02 },
      explanation: md`$V_{\text{post}} = 10$ m; pool value $= 0.12 \times 10 = 1.2$ m; $V_{\text{pre,eff}} = 8 - 1.2 = 6.8$ m. The existing holders are really selling at EUR 6.8 m, not 8 m.`,
      concepts: ["fc11.option-pool-shuffle"],
      difficulty: 2,
    },
    {
      id: "fc11-l02-q3",
      type: "numeric",
      prompt: md`An angel invests EUR 200k on a post-money SAFE with a EUR 4 m cap. The company then raises a priced seed in which new investors take 20 % and the pool top-up is 10 %, both of the post-money. What is the SAFE holder's ownership after the seed, in %?`,
      answer: 3.5,
      unit: "%",
      tolerance: { abs: 0.05 },
      explanation: md`Before new money: $0.2 / 4 = 5\%$. Scaled by $1 - 0.20 - 0.10 = 0.70$: $5 \times 0.70 = 3.5\%$.`,
      concepts: ["fc11.post-money-ownership"],
      difficulty: 2,
    },
    {
      id: "fc11-l02-q4",
      type: "numeric",
      prompt: md`Conversion rates: contact to first meeting 40 %, first meeting to partner meeting 25 %, partner meeting to term sheet 20 %. How many qualified investors must you contact to expect 2 term sheets?`,
      answer: 100,
      unit: "investors",
      tolerance: { abs: 1 },
      explanation: md`$\prod r = 0.40 \times 0.25 \times 0.20 = 0.02$; $N_0 = 2 / 0.02 = 100$.`,
      concepts: ["fc11.investor-funnel"],
      difficulty: 1,
    },
    {
      id: "fc11-l02-q5",
      type: "numeric",
      prompt: md`Over the last 12 months a company burned EUR 1.8 m net and grew ARR from EUR 0.4 m to EUR 1.3 m. What is its burn multiple?`,
      answer: 2,
      tolerance: { abs: 0.01 },
      explanation: md`Net new ARR $= 1.3 - 0.4 = 0.9$ m; $\text{BM} = 1.8 / 0.9 = 2.0$. Good, not exceptional.`,
      concepts: ["fc11.driver-model"],
      difficulty: 1,
    },
    {
      id: "fc11-l02-q6",
      type: "mcq",
      prompt: md`Which market slide meets the bar for a B2B seed deck?`,
      options: [
        "The global test and measurement market is worth tens of billions of USD; we only need 1 %.",
        "About 1,200 target test teams (method and source in the appendix) x EUR 100k ACV = EUR 120 m per year serviceable market.",
        "Analysts expect physical AI to be the next trillion-dollar market.",
        "Our market is every company that builds hardware.",
      ],
      answer: 1,
      explanation: md`Bottom-up: countable accounts with a stated source times an ACV that matches the model. Top-down "1 % of a huge market" is discounted to zero by investors.`,
      concepts: ["fc11.deck-narrative"],
      difficulty: 1,
    },
    {
      id: "fc11-l02-q7",
      type: "multi",
      prompt: md`Which items must be in the data room before a partner meeting? Select all that apply.`,
      options: [
        "IP assignments from every founder, employee and contractor",
        "Fully diluted cap table with any SAFE conversion modelled",
        "Signed contracts behind every number on the evidence slide",
        "Personal tax returns of the founders",
        "The financial model with its assumptions sheet",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`Personal tax returns are not part of a seed data room. IP, cap table, contracts behind the evidence and the model are what investors verify first.`,
      concepts: ["fc11.data-room"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc11-l02-f1", front: "Post-money and investor ownership", back: md`$V_{\text{post}} = V_{\text{pre}} + I$; $s = I / V_{\text{post}}$.`, concepts: ["fc11.post-money-ownership"] },
    { id: "fc11-l02-f2", front: "Post-money SAFE ownership (cap applies)", back: md`$s = I_{\text{SAFE}} / V_{\text{cap,post}}$, measured before the new money; later SAFEs dilute the founders, not earlier SAFE holders.`, concepts: ["fc11.post-money-ownership"] },
    { id: "fc11-l02-f3", front: "Option pool shuffle", back: md`Pool top-up counted in the pre-money dilutes only existing holders: $V_{\text{pre,eff}} = V_{\text{pre}} - s_{\text{pool}} V_{\text{post}}$.`, concepts: ["fc11.option-pool-shuffle"] },
    { id: "fc11-l02-f4", front: "Burn multiple bands", back: "Net burn / net new ARR. Below 1 excellent, 1 to 2 good, above 3 needs an explanation.", concepts: ["fc11.driver-model"] },
    { id: "fc11-l02-f5", front: "Investor list length", back: md`$N_0 = \text{TS}_{\text{target}} / \prod r_k$; with 35 %, 30 %, 25 % and 2 term sheets, about 76 names.`, concepts: ["fc11.investor-funnel"] },
    { id: "fc11-l02-f6", front: "Bottom-up market", back: "Countable accounts in your ICP (with source) x realistic ACV that matches the model.", concepts: ["fc11.deck-narrative"] },
    { id: "fc11-l02-f7", front: "Data room: the first folder an investor's lawyer opens", back: "IP and legal: assignments from every founder, employee and contractor, and the founders' agreement with vesting.", concepts: ["fc11.data-room"] },
    { id: "fc11-l02-f8", front: "Outreach sequencing", back: "B-tier a week before A-tier, all first meetings within about 2 weeks, so partner meetings and term sheets cluster and create momentum.", concepts: ["fc11.investor-funnel"] },
  ],
};

export default lesson;
