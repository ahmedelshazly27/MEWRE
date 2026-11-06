import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh06-l06",
  title: "Reading the landscape: a living map, sources to follow and how to check a claim",
  summary:
    "Turn this module into a working tool: a living landscape map with a fixed schema, status vocabulary and last-verified dates; a tiered list of sources to follow across infrastructure, models, funding and talent; a five-step method for checking a claim before Suhail repeats it; and a review cadence sized to the time volunteer leads actually have.",
  minutes: 60,
  objectives: [
    "Design a landscape map schema with status, source tier, confidence and last-verified date",
    "Classify sources into tiers and know which to follow for each layer of the landscape",
    "Check a claim in five steps and write the result as a dated, labelled sentence",
    "Size the review workload with L = sum of N t / T and adjust intervals to the time available",
    "Produce the first entries of Suhail's landscape map",
  ],
  concepts: [
    { id: "sh06.landscape-map", name: "Living landscape map", description: "A structured, dated register of the entities, models, funds, programmes and claims that matter to Suhail, with a status, source, confidence and last-verified date for each entry, maintained on a cadence.", competency: "sh-landscape", related: ["sh06.claim-check", "fc10.market-map"] },
    { id: "sh06.source-tiers", name: "Source tiers", description: "Tier 1: the issuer or primary record (release, regulator, model card, paper, the data provider's own report). Tier 2: reputable press and data trackers. Tier 3: aggregators, social posts, single unnamed sources. Claims are only as strong as their best tier and their independence.", competency: "sh-landscape", related: ["sh06.claim-check"] },
    { id: "sh06.claim-check", name: "Five-step claim check", description: "Find the primary source; date it; read the definition and status; seek an independent second source; sanity-check the arithmetic. Then write the claim with its source, date and label.", competency: "sh-landscape", related: ["sh06.source-tiers", "sh06.announcement-status", "fc10.claim-ledger"] },
    { id: "sh06.review-cadence", name: "Review cadence", description: "Fast-moving entries (compute status, model releases, funding totals) need short re-verification intervals; slow ones (institutions) long. The cadence must fit the hours the team has, or the map goes stale silently.", competency: "sh-landscape", related: ["sh06.landscape-map"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "A map that stays true",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Everything in Lessons 1 to 5 has a date on it, and much of it will be wrong within a year: data centres go live or slip, models are released, a half-year of funding data arrives. Suhail's editorial credibility, its sponsor decks and its partnership targeting all depend on one shared, current picture. A living map, owned by the Editorial lead and used by Partnerships, is how a volunteer team keeps that picture without each lead redoing the research.`,
        },
        {
          kind: "md",
          md: md`### The map's schema

One row per entity or claim. Keep it in a shared table (a Supabase table behind suhail.build, or a spreadsheet to start).

| Field | Example | Why |
|---|---|---|
| **Entity** | Stargate UAE | What the row is about |
| **Type** | Compute project / model / benchmark / fund / programme / institution / funding datum | Drives the review interval |
| **Country** | UAE | Filters and neutrality checks |
| **Claim** | 1 GW cluster; first 200 MW due Q3 2026 | The fact, in one line |
| **Status** | Announced / financed / under construction / operating; released / open weights / closed | Lesson 1's vocabulary |
| **Source and tier** | The National, 5 Dec 2025 (Tier 2); Epoch AI, 3 Jul 2026 (Tier 2) | Where it comes from |
| **Confidence** | Verified / reported / unverified | What we can say in public |
| **Last verified** | 2026-11-06 | When a lead last checked |
| **Relevance to Suhail** | Possible credits partner via G42; newsletter topic | Why it is on the map at all |
| **Owner** | Editorial lead | Who re-checks it |

### Source tiers

| Tier | What | Examples for this landscape |
|---|---|---|
| **1: primary** | The issuer or the original record | SDAIA, HUMAIN, G42, MBZUAI, TII, QCRI and QIA announcements; model and dataset cards on Hugging Face; arXiv and ACL Anthology papers; the MAGNiTT or Wamda report itself; regulator pages |
| **2: reputable secondary** | Press with editorial standards; independent trackers | The National, AGBI, Arab News, Semafor, DatacenterDynamics, Epoch AI's data-centre directory |
| **3: weak** | Aggregators, summaries, social posts, one unnamed source | Content farms summarising announcements, LinkedIn posts, leaderboard screenshots |

A Tier 1 source is authoritative about what the issuer **says**, not about whether it is **true**: HUMAIN is the best source for HUMAIN's plans and a weak one for whether they are on schedule. Independence matters as much as tier.`,
        },
        {
          kind: "flow",
          title: "Five-step claim check",
          steps: [
            { label: "1. Primary", detail: "Find the issuer's own release, card, paper or report" },
            { label: "2. Date", detail: "When was it said, and about which period?" },
            { label: "3. Definition and status", detail: "What exactly is counted; announced or operating?" },
            { label: "4. Independent second source", detail: "A tracker, regulator or reputable press not repeating the release" },
            { label: "5. Arithmetic", detail: "Do the numbers fit together (MW and chips, totals and shares)?" },
          ],
          caption: "Then write the claim with source, date and label (verified, reported, unverified). If step 1 fails, the claim is at best 'reported'.",
        },
        {
          kind: "md",
          md: md`### Superlatives need special care

"First", "largest", "best" and "only" are the claims most often wrong and most often repeated. Example: is Jais 2 "the largest open Arabic model"? Jais 2 is 70B with open weights (Dec 2025); K2 Think's second edition is also 70B and fully open (Jan 2026), though it is a reasoning system rather than an Arabic-centric model. The defensible sentence is "one of the largest open-weight Arabic-centric models (70B, Dec 2025)". Rewrite superlatives into specific, checkable statements.

### Sources to follow, by layer

| Layer | Follow | Cadence |
|---|---|---|
| Compute and infrastructure | Issuer newsrooms (HUMAIN, G42 and Khazna, QIA), Epoch AI data-centre directory, DatacenterDynamics | Monthly |
| Models and benchmarks | Hugging Face (organisation pages of SDAIA, TII, Inception, QCRI; OALL), arXiv cs.CL, ACL Anthology (ArabicNLP), BALSAM site | Monthly |
| Funding | MAGNiTT and Wamda quarterly and half-year reports | Quarterly |
| Policy and talent | Government portals, national statistics offices, Zawya and The National for summaries | Semi-annual |
| Regional AI news | Middle East AI News, AGBI, The National, Arab News | Weekly skim |`,
        },
        { kind: "equation", formula: "sh06-review-load" },
        {
          kind: "widget",
          widget: "concept-map",
          props: { module: "sh06" },
          caption: "How the concepts in this module connect: the landscape map is where they all meet.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Checking a claim and sizing the workload",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Claim: 'Stargate UAE is now live'",
          given: md`A sponsor's slide says "Stargate UAE is now live". You have the course sources (Lesson 1). Today is 6 Nov 2026.`,
          steps: [
            { md: md`**1. Primary:** the course sources contain no OpenAI, G42 or Khazna statement that the site is operating. Result: no Tier 1 confirmation.` },
            { md: md`**2. Date:** announcement May 2025 (Tom's Hardware); an official said in Dec 2025 that the first 200 MW would be ready in Q3 2026 (The National). Q3 2026 ended on 30 Sep 2026.` },
            { md: md`**3. Definition and status:** "live" could mean the first 200 MW phase or the full 1 GW. The full 1 GW is certainly not complete; the first phase is the only candidate.` },
            { md: md`**4. Independent source:** Epoch AI (updated 3 Jul 2026) listed it as under construction, estimating 200 MW by Dec 2026.` },
            { md: md`**5. Arithmetic:** 200 MW is on the order of 100,000 GPUs (Lesson 1); a go-live of that size would normally be announced by the partners, so absence of an announcement is informative.` },
          ],
          result: md`Write: "Stargate UAE's first 200 MW phase was due in Q3 2026 (The National, Dec 2025); Epoch AI listed it as under construction in July 2026. We could not confirm it is operating as of 6 Nov 2026." Confidence: unverified for "live". Map row: status under construction, last verified 2026-11-06, re-check monthly.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Can the Editorial lead keep the map current?",
          given: md`Illustrative map: 15 compute entries (0.5 h each to re-verify, monthly), 25 models and benchmarks (0.25 h, monthly), 20 funding and fund entries (0.5 h, every 3 months), 40 institutions and programmes (0.25 h, every 6 months). The Editorial lead has about 8 volunteer hours a month for this.`,
          steps: [
            { md: md`Compute: $15\times0.5/1 = 7.5$ h. Models: $25\times0.25/1 = 6.25$ h.` },
            { md: md`Funding: $20\times0.5/3$; institutions: $40\times0.25/6$.` },
            { md: md`$= 3.33$ h and $1.67$ h.`, hidden: true, check: { prompt: "Funding review hours per month", answer: 3.33, unit: "h/month", tolerance: { abs: 0.05 } } },
            { md: md`Total $L = 7.5 + 6.25 + 3.33 + 1.67$.` },
            { md: md`$= 18.75$ h per month, more than twice the time available.`, hidden: true, check: { prompt: "Total review load (h/month)", answer: 18.75, unit: "h/month", tolerance: { abs: 0.1 } } },
            { md: md`Fix: re-verify compute and models every 2 months, and keep only the 8 compute projects that matter to Suhail: $8\times0.5/2 + 25\times0.25/2 + 3.33 + 1.67$.` },
            { md: md`$= 2 + 3.125 + 3.33 + 1.67 \approx 8.1$ h per month, close to the budget.`, hidden: true, check: { prompt: "Revised load (h/month)", answer: 8.13, unit: "h/month", tolerance: { abs: 0.1 } } },
          ],
          result: md`A map nobody can maintain is worse than a small accurate one, because it looks current when it is not. Cut entries to those relevant to Suhail, lengthen intervals for slow categories, and add "last verified" to every public use.`,
        },
        {
          kind: "question",
          question: {
            id: "sh06-l06-p1",
            type: "numeric",
            prompt: md`A map has 30 model entries at 0.2 h each, re-verified every 2 months, and 12 funding entries at 0.5 h each, every 3 months. What is the monthly review load in hours?`,
            answer: 5,
            tolerance: { abs: 0.05 },
            unit: "h/month",
            explanation: md`$30\times0.2/2 + 12\times0.5/3 = 3 + 2 = 5$ h per month.`,
            concepts: ["sh06.review-cadence"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running the map as a team",
      blocks: [
        {
          kind: "md",
          md: md`### Roles

- **Editorial lead** owns the map, the source list and the claim-check rule for anything Suhail publishes.
- **Partnerships lead** adds a relevance note and contact owner for entities Suhail may approach; never records a partnership as existing before it is signed.
- **Head of Engineering** keeps the map in a table that the website and newsletter can query (and records the last-verified date automatically when a row is edited).
- **Everyone** files new claims they see into an inbox row marked "unverified" rather than repeating them.

### Using AI to maintain it

AI assistants are good at drafting rows from a release, finding the date and pulling the numbers, and bad at telling announced from operating or catching a mixed-up data provider. Use them for the first draft and the arithmetic; keep the status and confidence labels a human decision.`,
        },
        {
          kind: "callout",
          tone: "ai",
          title: "Prompt pattern for a map row",
          md: md`"Here is the text of a release [paste]. Extract: entity, type, country, the claim in one line, any numbers with units, the date of the statement and the period it refers to. Do not infer status; quote the words the release uses about timing. List anything that would need a second source." Then do steps 4 and 5 of the claim check yourself.`,
        },
        {
          kind: "checklist",
          title: "Before anything from the map goes into a Suhail publication",
          items: [
            "Last verified within its category's interval?",
            "Source named, with date, and tier noted?",
            "Status word used exactly (announced, under construction, operating; open weights, closed)?",
            "Superlatives rewritten into specific claims?",
            "Derived numbers labelled as our calculation?",
            "Unverified items either removed or explicitly labelled?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "sh06-l06-p2",
            type: "short",
            prompt: md`Produce the first ten rows of Suhail's landscape map using the schema in this lesson. Include at least two compute projects, three models or benchmarks, two funding data points or funds, and one talent or policy item, spread across at least three countries. Fill every field, including status, source with date and tier, confidence and last verified (today), and a relevance-to-Suhail note that does not claim any existing relationship.`,
            rubric: [
              "Ten rows using the full schema (entity, type, country, claim, status, source and tier, confidence, last verified, relevance, owner)",
              "Facts, dates and sources match the course research",
              "Status and confidence are correct, including unverified items (Stargate UAE operating, HUMAIN sites, ALLaM 34B weights)",
              "Covers the required categories and at least three countries",
              "Relevance notes are useful and do not invent partnerships",
              "Funding rows name a single provider and its definition",
            ],
            modelAnswer: md`| Entity | Type | Country | Claim | Status | Source (tier) | Confidence | Last verified | Relevance | Owner |
|---|---|---|---|---|---|---|---|---|---|
| Stargate UAE | Compute | UAE | 1 GW; first 200 MW due Q3 2026 | Under construction | The National 5 Dec 2025 (2); Epoch AI 3 Jul 2026 (2) | Unverified that operating | 2026-11-06 | Possible credits source via G42; newsletter | Editorial |
| HUMAIN Riyadh and Dammam DCs | Compute | KSA | First go-live targeted Q2 2026 | Under construction (reported) | DCD 2025 (2) | Unverified that live | 2026-11-06 | Possible credits and hiring partner | Editorial |
| Jais 2 | Model | UAE | 70B, open weights, about 600B Arabic tokens | Released, open weights | MBZUAI 9 Dec 2025 (1) | Verified (release) | 2026-11-06 | Recommended model for hackathons, licence to check | Editorial |
| Falcon-H1 Arabic | Model | UAE | 3B, 7B, 34B; hybrid Mamba-Transformer; Falcon LLM License | Released, open weights | TII via Business Wire 5 Jan 2026 (1) | Verified (release); OALL rank vendor-reported | 2026-11-06 | Small-model track | Editorial |
| ALLaM 34B | Model | KSA | Powers HUMAIN Chat (Aug 2025) | Closed (reported) | Middle East AI News Aug 2025 (2) | Weights status unverified | 2026-11-06 | Coverage; not usable as open weights | Editorial |
| BALSAM | Benchmark | KSA | 78 tasks, 52K examples, blind test sets | Live platform | arXiv 2507.22603, Jul 2025 (1) | Verified (paper) | 2026-11-06 | Evaluation partner candidate for research arm | Engineering |
| MAGNiTT H1 2026 | Funding datum | MENA | USD 1.35 bn, 214 deals; -22%, -41% YoY | Published | MAGNiTT Jul 2026 (1) | Verified (provider's own figure) | 2026-11-06 | Sponsor deck; pull Q3 2026 update | Finance |
| Khwarizmi Ventures Fund II | Fund | KSA | First close USD 70 m+, targeting more than USD 100 m | First close | Pulse, Feb 2026 (2) | Reported | 2026-11-06 | Investor-track invitee | Partnerships |
| Qai and Brookfield JV | Compute and capital | Qatar | USD 20 bn AI-infrastructure JV, 9 Dec 2025 | Announced | QIA newsroom (1) | Verified (announcement) | 2026-11-06 | Qatar landscape; not an early-stage partner | Editorial |
| Egypt offshoring exports | Talent | Egypt | About USD 5.2 bn 2025; USD 6 bn target 2026 | 2025 reported; 2026 target | Zawya 2026 (2) | Reported | 2026-11-06 | Case for Cairo events and remote-hiring track | Partnerships |`,
            explanation: md`Graders check schema completeness, factual accuracy against the research, correct status and confidence labels and relevance notes that do not invent relationships.`,
            concepts: ["sh06.landscape-map", "sh06.claim-check", "sh06.source-tiers"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a new volunteer why Suhail writes 'announced', 'under construction' or 'operating' next to every infrastructure claim, and how to check one in five steps.",
          keyPoints: [
            "Most Gulf AI headlines are plans or first phases; repeating them as fact costs credibility",
            "Status words are a fixed vocabulary recorded with the date of last verification",
            "Steps: primary source, date, definition and status, independent second source, arithmetic",
            "A Tier 1 source is authoritative on what the issuer says, not on whether it happened",
            "If a claim cannot be checked, publish it as reported or unverified, or not at all",
          ],
        },
        { kind: "xref", to: "fc10-l01", note: "Research and synthesis with Claude: market maps, teardowns and checked citations. The general method behind Suhail's landscape map." },
        { kind: "xref", to: "fc10-l05", note: "Verification habits and number checking when AI drafts the rows." },
        { kind: "sources", refs: ["sh06-r8", "sh06-r9", "sh06-r10", "sh06-r13", "sh06-r15", "sh06-r35", "sh06-r48"] },
      ],
    },
  ],
  quiz: [
    {
      id: "sh06-l06-q1",
      type: "order",
      prompt: "Put the five-step claim check in order.",
      items: ["Find the primary source", "Date it", "Read the definition and status", "Find an independent second source", "Sanity-check the arithmetic"],
      explanation: md`Primary first, because everything else is checked against it; arithmetic last, once you know what the numbers refer to.`,
      concepts: ["sh06.claim-check"],
      difficulty: 1,
    },
    {
      id: "sh06-l06-q2",
      type: "mcq",
      prompt: "HUMAIN's own press release says its data centres are on schedule. What does that establish?",
      options: [
        "That they are on schedule (Tier 1 source)",
        "What HUMAIN says about its schedule; an independent source is still needed for whether it is true",
        "Nothing, because company releases are Tier 3",
        "That they are operating",
      ],
      answer: 1,
      explanation: md`Tier 1 is authoritative about the issuer's statement, not about outcomes it has an interest in. Pair it with an independent tracker.`,
      concepts: ["sh06.source-tiers"],
      difficulty: 1,
    },
    {
      id: "sh06-l06-q3",
      type: "multi",
      prompt: "Which fields does every landscape map row need before it is used in public? (Select all that apply.)",
      options: ["Status", "Source with date", "Last verified date", "The sponsor's preferred wording", "Confidence label"],
      answer: [0, 1, 2, 4],
      explanation: md`Status, dated source, last verified and confidence make the row usable; sponsor wording is not a field.`,
      concepts: ["sh06.landscape-map"],
      difficulty: 1,
    },
    {
      id: "sh06-l06-q4",
      type: "numeric",
      prompt: md`40 entries at 0.25 h each, re-verified every 2 months. Monthly load in hours?`,
      answer: 5,
      tolerance: { abs: 0.05 },
      unit: "h/month",
      explanation: md`$40\times0.25/2 = 5$ h per month.`,
      concepts: ["sh06.review-cadence"],
      difficulty: 1,
    },
    {
      id: "sh06-l06-q5",
      type: "mcq",
      prompt: "Which rewrite of 'Jais 2 is the largest open Arabic model' is defensible from the course sources?",
      options: [
        "Keep it: MBZUAI said so",
        "'Jais 2 is the only open Arabic model'",
        "'Jais 2 is one of the largest open-weight Arabic-centric models (70B, Dec 2025)'",
        "'Jais 2 beats every other model on every Arabic benchmark'",
      ],
      answer: 2,
      explanation: md`K2 Think's second edition is also 70B and fully open (Jan 2026). A specific, dated statement survives; a superlative does not.`,
      concepts: ["sh06.claim-check"],
      difficulty: 2,
    },
    {
      id: "sh06-l06-q6",
      type: "decision",
      prompt: md`The map has grown to 150 rows and the Editorial lead now spends 20 hours a month on it, against 8 available. What do you do?`,
      options: [
        { text: "Keep all rows and re-verify when there is time.", score: 0.1, feedback: "The map will silently go stale while still looking authoritative." },
        { text: "Compute the review load by category, cut rows with no relevance to Suhail, lengthen intervals for slow categories, and show 'last verified' on every public use.", score: 1, feedback: "Sizes the map to the team, which keeps it true." },
        { text: "Let an AI assistant re-verify everything automatically.", score: 0.3, feedback: "AI can draft and extract, but status and confidence need a human; full automation reintroduces the errors the map exists to prevent." },
      ],
      explanation: md`Use $L = \sum N_i t_i/T_i$ to match the map to the hours available.`,
      concepts: ["sh06.review-cadence", "sh06.landscape-map"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "sh06-l06-f1", front: "Landscape map schema", back: "Entity, type, country, claim, status, source and tier, confidence, last verified, relevance to Suhail, owner.", concepts: ["sh06.landscape-map"] },
    { id: "sh06-l06-f2", front: "Three source tiers", back: "1: issuer or primary record; 2: reputable press and independent trackers; 3: aggregators, social posts, single unnamed sources.", concepts: ["sh06.source-tiers"] },
    { id: "sh06-l06-f3", front: "Five-step claim check", back: "Primary, date, definition and status, independent second source, arithmetic. Then write it with source, date and label.", concepts: ["sh06.claim-check"] },
    { id: "sh06-l06-f4", front: "Review load", back: md`$L = \sum N_i t_i/T_i$ hours per month; must fit the volunteer time available.`, concepts: ["sh06.review-cadence"] },
    { id: "sh06-l06-f5", front: "What a Tier 1 source proves", back: "What the issuer says, not whether it is true or on schedule.", concepts: ["sh06.source-tiers"] },
    { id: "sh06-l06-f6", front: "Handling superlatives", back: "Rewrite 'first, largest, best, only' into a specific, dated, checkable statement.", concepts: ["sh06.claim-check"] },
  ],
};

export default lesson;
