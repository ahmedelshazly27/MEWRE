import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc03-l06",
  title: "Category Creation vs Entering a Category",
  summary:
    "Creating a category means teaching buyers a problem and a solution before you can sell them anything; entering one means accepting its criteria. Learn the mechanism (extra buying stages, no budget line), the cost in months and cash, when creation works and the examples people cite, then apply it to the live question: is physical AI test infrastructure a category Afterwave should create?",
  minutes: 70,
  objectives: [
    "Explain the buying-process mechanism that makes category creation slow and expensive",
    "Estimate the cash cost of a longer, education-heavy sales cycle against runway",
    "State the conditions under which category creation works and analyse well-known examples",
    "Distinguish the company narrative for investors from the product category for buyers",
    "Write a category decision memo for Afterwave with evidence and a trigger to revisit",
  ],
  concepts: [
    { id: "fc03.category-strategy", name: "Category strategy", description: "The choice between entering an existing category head to head, owning a subcategory (big fish, small pond) or creating a new category.", competency: "fc-gtm", related: ["fc03.market-category"] },
    { id: "fc03.category-creation", name: "Category creation", description: "Defining and teaching a new problem and solution frame so that buyers create a budget line and evaluate vendors on your criteria; expensive and slow, with a large payoff if it succeeds.", competency: "fc-gtm", related: ["fc03.category-strategy"] },
    { id: "fc03.subcategory", name: "Subcategory (category entry with a twist)", description: "Entering an existing category but redefining one dimension (a segment, a delivery model, a job) so that buyers keep their budget line but use your criteria.", competency: "fc-gtm", related: ["fc03.category-strategy", "fc03.beachhead"] },
    { id: "fc03.category-cost", name: "Cost of category creation", description: "Extra buying stages (problem recognition, solution awareness, budget creation) lengthen cycles; the cash cost is roughly the extra months times the burn, plus education spend.", competency: "fc-gtm", related: ["fc03.category-creation", "fc03.cac"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Why new categories are slow, and when they are worth it",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`"Physical AI test infrastructure" is how Afterwave describes itself. It is a good investor story: a market shift (AI moving into machines), a gap, a team. But a test lead does not have a budget line called "physical AI test infrastructure". If you sell the category instead of a product the buyer already has budget for, every deal starts with a lecture. With a seed runway that decision, made implicitly in the first website headline, can be the difference between first revenue in month 9 or month 15.`,
        },
        {
          kind: "md",
          md: md`### The mechanism: extra buying stages

An enterprise purchase passes through stages. In an **existing category** the buyer already has the first ones:

| Stage | Existing category | New category |
|---|---|---|
| 1. Problem recognised | Yes | You must teach that the problem exists and is worth solving |
| 2. Solution type known | Yes | You must teach what kind of solution solves it |
| 3. Budget line exists | Yes (renewal or replacement) | Someone must create one, often next fiscal year |
| 4. Vendor evaluation | On the category's criteria | On your criteria, if stages 1 to 3 succeeded |
| 5. Purchase | Procurement knows the playbook | Procurement asks "what is this, and who else sells it?" |

Each added stage adds months. The first-order cash cost is:`,
        },
        { kind: "equation", formula: "fc03-education-cost" },
        {
          kind: "md",
          md: md`plus the education spend itself (content, events, a book, analyst relations) and the risk that a larger company, once you have taught the market, captures the category you created.

### The payoff

If you succeed, buyers evaluate everyone on your criteria, and the company that defined the category tends to be its leader. *Play Bigger* (Ramadan, Peterson, Lochhead, Maney, 2016) calls this the "category king" and argues that category kings capture most of the value of their categories.

### Three strategies, restated

- **Head to head:** enter the category, beat others on its criteria. Short cycle, hard win.
- **Subcategory (big fish, small pond):** keep the buyer's budget line and vocabulary but change one dimension: a segment ("for physical AI test teams"), a delivery model ("on your own servers"), or a job ("which tests to rerun"). The buyer's stages 1 to 3 mostly survive.
- **Create a new game:** name a new category. Works when stages 1 and 2 are already half-done by a market shift, so you are naming what buyers already feel.

### When category creation works

1. A **real shift** makes the old category's criteria obsolete (cloud for on-prem software; a regulation that changes what evidence is needed).
2. Buyers **feel the pain but have no name for it**, so naming it is relief, not education.
3. You can **fund years** of education (often only after a large round).
4. You have a **point of view and an evangelist** willing to argue it publicly for years.
5. A **budget can be re-pointed** from an existing line (the new category replaces something).

### Examples people cite

| Company | Move | Type | What made it work |
|---|---|---|---|
| Salesforce | "No Software": CRM delivered over the internet | Subcategory of CRM, later the category | Kept the CRM budget line; changed the delivery model |
| HubSpot | "Inbound marketing" (named and taught in a 2009 book) | Category creation | Founders evangelised for years; SMB marketers felt the pain of outbound costs |
| Gainsight | Popularised "customer success" as a function and software category | Category creation | Subscription businesses felt churn pain; a conference and community built the role |
| Snowflake | Entered data warehousing as a cloud data warehouse, later "Data Cloud" | Entry first, broader frame later | Won inside an existing budget, expanded the frame once it led |
| Sift (2026) | "Observability for hardware" | Borrowed category | Imports a frame software buyers already understand to hardware teams |

The pattern: most "category creators" **entered a budget line first** and widened the frame once they led it.`,
        },
        {
          kind: "matrix",
          title: "Category decision",
          xAxis: ["Buyers do not yet recognise the problem", "Buyers recognise the problem"],
          yAxis: ["An existing category fits your strengths", "No existing category fits"],
          cells: [
            { label: "True category creation", detail: "Teach the problem and the solution. Long, expensive; needs a large round and an evangelist." },
            { label: "Name what they feel", detail: "New frame, low education cost. The best window for a new category, often opened by a shift or regulation." },
            { label: "Insight-led selling in a known category", detail: "Teach the problem inside a familiar frame (content, discovery that quantifies pain)." },
            { label: "Enter, or own a subcategory", detail: "Head to head, or big fish, small pond. Short cycles: the default for seed stage." },
          ],
          caption: "Top row = no category fits. Afterwave's Ripple sits between bottom-right and top-right: test teams recognise over-testing pain, and 'change-impact for hardware test' borrows familiar words.",
        },
        {
          kind: "chart",
          chart: "line",
          title: "Cumulative customers: subcategory entry vs category creation (illustrative)",
          xKey: "month",
          xLabel: "Months after seed",
          yLabel: "Cumulative customers",
          series: [
            { key: "sub", label: "Subcategory entry" },
            { key: "cat", label: "Category creation" },
          ],
          data: [
            { month: 0, sub: 0, cat: 0 },
            { month: 3, sub: 0, cat: 0 },
            { month: 6, sub: 0, cat: 0 },
            { month: 9, sub: 1, cat: 0 },
            { month: 12, sub: 3, cat: 0 },
            { month: 15, sub: 5, cat: 1 },
            { month: 18, sub: 8, cat: 3 },
            { month: 21, sub: 11, cat: 6 },
            { month: 24, sub: 14, cat: 10 },
            { month: 27, sub: 17, cat: 15 },
            { month: 30, sub: 20, cat: 21 },
          ],
          caption: "Illustrative shapes, not a forecast. Category creation can grow faster once the category exists, but the crossover comes after the moment (around month 18) when a seed company needs traction to raise again.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Pricing the education cost for Afterwave",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Category creation vs subcategory against a seed runway",
          given: md`Illustrative: seed of EUR 2.4 m, net burn EUR 120k/month, so 20 months of runway. Subcategory positioning ("change-impact analysis for hardware test", sold into the test tooling budget): sales cycle 9 months. Category positioning ("physical AI test infrastructure", buyer needs a new budget line): cycle 15 months.`,
          steps: [
            { md: md`**Extra cycle:** $\Delta t_c = 15 - 9 = 6$ months.` },
            { md: md`**Cash cost:** $C_{edu} = 6 \times 120{,}000 = \text{EUR } 720{,}000$, 30 % of the round, before any education spend.` },
            { md: md`**Traction at the next raise:** a seed company typically starts raising again with about 6 months of runway left, here around month 14. Subcategory: first customer around month 9, three or four by month 14. Category: first customer around month 15, after the raise must already have started.` },
            { md: md`**Upside check:** even if category creation wins faster later (chart: crossover around month 30), the company must survive to month 30. That requires a larger round raised on narrative alone, which is possible but should be a deliberate choice.` },
          ],
          result: md`For Afterwave at seed stage, **enter the buyer's existing budget through a subcategory** (Ripple as change-impact for hardware test, Lockstep as synchronized capture) and use "physical AI test infrastructure" as the **company vision for investors and recruits**, not the label on the first sales call. Revisit when buyers start using the term themselves.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your own numbers",
          given: md`Illustrative: net burn EUR 90k/month, runway 22 months (EUR 1.98 m). Category positioning adds 4 months to the cycle, plus EUR 150k of education spend (content, a conference presence, a technical white paper series).`,
          steps: [
            { md: md`Cycle-extension cost $= 4 \times 90{,}000$.` },
            { md: md`$C_{edu} =$ **EUR 360,000**.`, hidden: true, check: { prompt: "Cycle-extension cost (EUR)", answer: 360000, unit: "EUR", tolerance: { rel: 0.005 } } },
            { md: md`Total cost including education spend $= 360{,}000 + 150{,}000 = 510{,}000$, as a share of the EUR 1.98 m round.` },
            { md: md`Share of round $= 510{,}000/1{,}980{,}000 =$ **25.8 %**.`, hidden: true, check: { prompt: "Share of the round (%)", answer: 25.8, unit: "%", tolerance: { abs: 0.2 } } },
          ],
          result: md`A quarter of the round buys the right to teach the market. Spend it only if conditions 1 to 5 hold, and ideally after the shift has done half the teaching for you.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Physical AI test infrastructure: is it a category yet?",
      blocks: [
        {
          kind: "md",
          md: md`### Evidence to weigh (from the November 2026 research brief)

**For "a category is forming":**
- Investors are funding adjacent hardware-test companies at scale: Nominal (a "continuous test stack for physical systems") reported a USD 80 m round at a USD 1 bn valuation in March 2026; Sift ("observability for hardware") a USD 42 m Series B; Foxglove a USD 40 m Series B in November 2025 under a "physical AI" frame.
- Humanoid and robotics programmes report safety validation as a bottleneck; there is no published humanoid-specific safety standard yet (ISO 25785-1 in draft).
- The EU Machinery Regulation applies from 20 January 2027 and puts ML-based safety functions under third-party assessment: a regulatory forcing function for evidence.

**Against "Afterwave should create it":**
- Buyers hold budgets for test and measurement, HIL, test management and, increasingly, test-data platforms, not for "physical AI test infrastructure".
- Better-funded companies are already teaching the broad frame; Afterwave can **draft behind** them.
- No vendor in the research advertises change-impact test selection for rigs, firmware and models: a subcategory is open now.

**Practical reading:** the broad category is being created by others with far more money. Afterwave's best move is big fish, small pond inside it, owning the change-impact decision, while using the broad frame for vision. The trigger to revisit: prospects using "physical AI test" in their own words, job titles appearing, analyst or conference tracks with that name.

### How to test category language

- Ask in discovery: "What would you call a tool that does this? Where would the budget come from?"
- Look at job titles and conference tracks: categories become real when roles and sessions carry the name.
- Watch competitors' words: if Nominal and Sift start describing change impact, the subcategory is being validated (and contested).
- Search the buyer's procurement categories: what line item would the PO go against?`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Claims to handle carefully",
          md: md`*Play Bigger*'s figure that category kings capture around three quarters of their category's market value comes from the authors' own analysis of a set of tech companies; treat it as an argument, not a law. Funding figures for Nominal, Sift and Foxglove come from search summaries recorded in the research brief (docs/research/2026-11-afterwave-market.md) and must be rechecked on the primary press releases before being quoted externally, for example in an investor deck.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Category mistakes",
          md: md`- **Inventing a word** nobody searches for and putting it in the hero line.
- **Claiming category leadership at seed** ("the category leader in physical AI test"): procurement asks who else is in the category, and you have no answer.
- **Confusing the investor narrative with the buyer category:** investors buy a vision; test leads buy a solution to a problem in their budget.
- **Ignoring a forming category** because you did not name it: drafting behind well-funded educators is cheap distribution.
- **Never revisiting:** the right answer at seed can be wrong at Series A.`,
        },
        { kind: "scenario", scenario: "fc03-s3" },
        {
          kind: "question",
          question: {
            id: "fc03-l06-p1",
            type: "short",
            prompt: md`**Write a one-page category decision memo for Afterwave.** Include: (1) the decision in one sentence, (2) the evidence for and against creating "physical AI test infrastructure" as a buyer category, citing the research brief and labelling anything unverified, (3) the cost estimate with the education-cost formula and illustrative runway numbers, (4) the language you will use with buyers versus with investors, and (5) observable triggers that would make you revisit the decision.`,
            rubric: [
              "States a clear decision (e.g. own the change-impact subcategory now, use the broad frame as vision) rather than hedging",
              "Evidence on both sides is specific (adjacent funding, regulatory date of 20 January 2027, lack of rig change-impact vendors, buyer budget lines) and unverified items are labelled",
              "Cost is computed with the formula (extra cycle months x burn, plus education spend) against a stated illustrative runway",
              "Distinguishes buyer-facing category language from investor and recruiting narrative",
              "Revisit triggers are observable (buyers' own words, job titles, conference or analyst tracks, competitors adopting the frame, a larger round)",
              "No invented customers, traction or competitor facts beyond the research brief",
            ],
            modelAnswer: md`**Decision:** For the next 18 months Afterwave sells into existing test-tooling budgets as "change-impact analysis for hardware test" (Ripple) and "synchronized test capture" (Lockstep), and uses "physical AI test infrastructure" as the company vision for investors and hiring.

**Evidence for a forming broad category:** adjacent companies are being funded under hardware-test and physical-AI frames (Nominal reportedly USD 80 m at USD 1 bn valuation, March 2026; Sift USD 42 m; Foxglove USD 40 m, November 2025; figures from search summaries, to be rechecked); humanoid safety validation reported as a bottleneck; the EU Machinery Regulation applies from 20 January 2027 with ML safety functions under third-party assessment. **Against creating it ourselves:** buyers have budget lines for test tooling, HIL and test data, not for the broad category; others with far more capital are teaching it; no vendor in the research offers rig change-impact selection, so a subcategory is open now.

**Cost:** illustrative burn EUR 120k/month, runway 20 months. Category positioning adds about 6 months to a 9-month cycle: $C_{edu} = 6 \times 120{,}000 = \text{EUR } 720{,}000$ (30 % of a EUR 2.4 m round), plus education spend, and first revenue after the next raise must begin.

**Language.** Buyers: "after every firmware, model or rig change, know which tests to rerun and why". Investors: "the test and evidence layer for physical AI, starting with the change-impact decision no one owns".

**Revisit when** (any two): prospects use "physical AI test" unprompted in discovery; job titles or conference tracks carry the term; Nominal or Sift adopt change-impact language; we raise a round sized for market education; the Machinery Regulation's first notified-body assessments of ML safety functions create a named evidence budget.`,
            explanation: md`Graded against the rubric. The test: would an investor and a test lead each recognise their own version of the story, and would both versions be true?`,
            concepts: ["fc03.category-strategy", "fc03.category-creation", "fc03.subcategory", "fc03.category-cost"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to an investor why Afterwave describes itself as 'physical AI test infrastructure' in the pitch deck but not on the first sales call.",
          keyPoints: [
            "A new buyer category adds stages: recognise the problem, learn the solution type, create a budget line",
            "Each stage lengthens the cycle; the cash cost is roughly extra months times burn",
            "Buyers today have budgets for test tooling, HIL and test data, so selling into them shortens cycles",
            "Better-funded companies are already educating the broad frame; Afterwave can own a subcategory inside it",
            "The investor narrative is the vision; the buyer category is where the budget is; both must be true",
          ],
        },
        { kind: "sources", refs: ["fc03-r4", "fc03-r1", "fc03-r5", "fc03-r11", "fc03-r12", "fc03-r16", "fc03-r9", "fc03-r3"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc03-l06-q1",
      type: "multi",
      prompt: "Which buying stages does category creation add to each deal compared with entering an existing category? (Select all that apply.)",
      options: ["Teaching that the problem exists", "Teaching what kind of solution solves it", "Creating a budget line", "Negotiating payment terms"],
      answer: [0, 1, 2],
      explanation: md`Payment terms exist in every deal. The first three stages are already done for you in an existing category.`,
      concepts: ["fc03.category-cost", "fc03.category-creation"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc03-l06-q2",
      type: "numeric",
      prompt: md`Category positioning lengthens the cycle from 8 to 13 months. Net burn is EUR 100k/month. What is the cycle-extension cash cost? (EUR)`,
      answer: 500000,
      tolerance: { rel: 0.005 },
      unit: "EUR",
      explanation: md`$C_{edu} = (13-8) \times 100{,}000 = \text{EUR } 500{,}000$, before any education spend.`,
      concepts: ["fc03.category-cost"],
      difficulty: 1,
    },
    {
      id: "fc03-l06-q3",
      type: "mcq",
      prompt: "Salesforce's early 'No Software' positioning is best described as:",
      options: [
        "Creating an entirely new category with no existing budget",
        "Entering the CRM category with a new delivery model (a subcategory that later became the category)",
        "Head-to-head competition on on-premise features",
        "A partner-led channel strategy",
      ],
      answer: 1,
      explanation: md`Buyers kept their CRM budget line; Salesforce changed the delivery model and set new criteria (no installation, subscription).`,
      concepts: ["fc03.subcategory"],
      difficulty: 2,
    },
    {
      id: "fc03-l06-q4",
      type: "mcq",
      prompt: "Which condition most reduces the cost of naming a new category?",
      options: [
        "Having a catchy new word",
        "Buyers already feel the pain from a market shift but have no name for it",
        "Having no competitors",
        "A large marketing team",
      ],
      answer: 1,
      explanation: md`If the shift has done the teaching, naming it is relief, not education: stages 1 and 2 are half done.`,
      concepts: ["fc03.category-creation"],
      difficulty: 2,
    },
    {
      id: "fc03-l06-q5",
      type: "decision",
      prompt: md`A lead investor says: "You should own 'physical AI test infrastructure' as a category. Put it on the homepage and every slide." You have 20 months of runway and no customers. What do you do?`,
      options: [
        { text: "Agree and rewrite the website around the category.", score: 0.2, feedback: "Every sales call now starts with education, adding months to cycles you cannot afford." },
        { text: "Keep the broad frame in the investor narrative and recruiting, sell with subcategory language to buyers, and agree with the investor on the triggers that would justify a category push.", score: 1, feedback: "Right: vision and buyer category serve different audiences; the triggers make the decision revisitable." },
        { text: "Reject the idea entirely and never mention physical AI.", score: 0.3, feedback: "Throws away a true and fundable vision, and a trend that supports the message." },
      ],
      explanation: md`The broad frame is valuable for capital and talent; buyers need a frame that maps to a budget line.`,
      concepts: ["fc03.category-strategy"],
      difficulty: 2,
    },
    {
      id: "fc03-l06-q6",
      type: "mcq",
      prompt: "Which is the strongest signal that a new category is becoming real?",
      options: [
        "Your founders like the name",
        "Buyers use the term unprompted, job titles and conference tracks carry it, and competitors adopt it",
        "The domain name was available",
        "A press release used it once",
      ],
      answer: 1,
      explanation: md`Categories are social facts: they exist when buyers, roles, events and competitors use the words.`,
      concepts: ["fc03.category-creation"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc03-l06-f1", front: "Why category creation is slow", back: "It adds buying stages: problem recognition, solution awareness, budget creation.", concepts: ["fc03.category-cost"] },
    { id: "fc03-l06-f2", front: "Education cost formula", back: md`$C_{edu} = \Delta t_c\, B_m$ (extra cycle months x monthly burn), plus education spend.`, concepts: ["fc03.category-cost"] },
    { id: "fc03-l06-f3", front: "Five conditions for category creation", back: "Real shift; pain felt but unnamed; capital for years; an evangelist with a point of view; a budget that can be re-pointed.", concepts: ["fc03.category-creation"] },
    { id: "fc03-l06-f4", front: "Subcategory", back: "Keep the buyer's budget line and vocabulary; change one dimension (segment, delivery model, job).", concepts: ["fc03.subcategory"] },
    { id: "fc03-l06-f5", front: "Afterwave category decision (seed stage)", back: "Own change-impact for hardware test as a subcategory; use 'physical AI test infrastructure' as company vision.", concepts: ["fc03.category-strategy"] },
    { id: "fc03-l06-f6", front: "Category king (Play Bigger)", back: "The company that defines a category tends to lead it and capture most of its value (the authors' analysis; treat as argument).", concepts: ["fc03.category-creation"] },
  ],
  scenarios: [
    {
      id: "fc03-s3",
      title: "\"Who else is in this category?\"",
      context: md`An e-drive supplier's procurement officer is processing a pilot purchase request for Afterwave. She calls you: "Our system needs a category for this purchase and two comparable vendors for the file. What is this, and who else sells it?"`,
      start: "a",
      concepts: ["fc03.subcategory", "fc03.category-strategy"],
      nodes: {
        a: {
          md: md`How do you answer?`,
          choices: [
            { text: "\"It's physical AI test infrastructure; we're the only company in the category.\"", score: 2, feedback: "A sole-source claim in a new category triggers more scrutiny, not less, and she has no line item for it.", next: "b" },
            { text: "\"It's test engineering software, under the same line as your test management and data tools. Comparable tools for the file are test-data platforms and test management systems; our difference is the change-impact selection, which the engineering team can document in the justification.\"", score: 10, feedback: "Maps the purchase onto an existing budget line and gives her what her process needs, while keeping the differentiation for the technical justification." },
          ],
        },
        b: {
          md: md`She says the request will need a sole-source justification signed by a director, which takes four to six weeks.`,
          choices: [
            { text: "Ask the champion to reclassify it under test engineering software with a technical justification, and provide comparable vendors for the file.", score: 7, feedback: "Recovers, at the cost of a few weeks. Next time lead with the buyer's category." },
            { text: "Wait for the sole-source process.", score: 3, feedback: "Six weeks lost on a pilot because of a category label." },
          ],
        },
      },
    },
  ],
};

export default lesson;
