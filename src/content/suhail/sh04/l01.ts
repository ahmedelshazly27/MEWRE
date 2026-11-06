import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh04-l01",
  title: "The partner map: who is in the room and what each wants",
  summary:
    "Seven partner types surround an Arab builder ecosystem: government entities, sovereign AI programmes, VCs, corporates, universities, other communities and media. Each wants something specific and can give something specific. Map them on resources and alignment, score fit with a weighted model, and start with the few that move the mission.",
  minutes: 70,
  objectives: [
    "You can name the seven partner types around Suhail and state, for each, what it typically wants and what it can typically give.",
    "You can place real organisations on an alignment and resources map using only dated, sourced facts, and flag the rest as unverified.",
    "You can compute a weighted partner fit score and use it to rank a target list.",
    "You can identify who actually decides inside each partner type, and which budget line the money would come from.",
  ],
  concepts: [
    { id: "sh04.partner-types", name: "Partner types", description: "The seven kinds of organisation an ecosystem builder partners with (government, sovereign AI programmes, VCs, corporates, universities, other communities, media), each with its own goals, resources, budget lines and decision speed.", competency: "sh-partnerships", related: ["fc03.partner-economics"] },
    { id: "sh04.value-exchange", name: "Value exchange", description: "The explicit trade in a partnership: what the partner gets (audience, talent, adoption, data, brand, deal flow) against what it gives (cash, in-kind, credits, venue, judges, distribution); a partnership is durable only if both sides can name their side in numbers.", competency: "sh-partnerships", related: ["sh04.partner-types"] },
    { id: "sh04.alignment-resources-map", name: "Alignment and resources map", description: "A 2x2 placing candidate partners by how aligned they are with the builder mission and how many resources they control, giving four plays: anchor, brand buyer, ally, decline.", competency: "sh-partnerships", related: ["sh04.partner-types"] },
    { id: "sh04.fit-score", name: "Partner fit score", description: "A weighted sum of 0 to 5 scores on criteria such as mission alignment, resources, decision speed, credibility with builders and independence risk, used to rank targets before spending outreach time.", competency: "sh-partnerships", related: ["sh04.alignment-resources-map"] },
    { id: "sh04.budget-line", name: "Budget line and decision owner", description: "The specific budget (marketing, developer relations, CSR, talent, research, government programme) and the person who controls it; the same organisation can say yes from one line and no from another.", competency: "sh-partnerships", related: ["sh04.partner-types"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Seven partner types and what each one trades",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Suhail has no members, sponsors or events yet, and the leads are unpaid until revenue. Every partnership conversation you start in January 2027 costs volunteer hours you cannot get back. If you know what a sovereign AI lab, a Riyadh VC or a university dean actually wants before the first meeting, you pitch the right trade to the right person and stop spending weeks on organisations that cannot say yes.`,
        },
        {
          kind: "md",
          md: md`### The mechanism: a partnership is a trade, not a favour

A partner gives you something only if it buys something it needs more. Write both sides down:

- **They get:** audience (builders, students, founders), talent signal, adoption of their platform or model, data or benchmark results, brand association, deal flow, a story for their own stakeholders.
- **They give:** cash, in-kind goods (venue, food, travel), platform or compute credits, people (judges, mentors, speakers), distribution (their newsletter, their students), credibility (a government or university logo).

If you cannot write their side in one sentence with a number in it ("200 Arabic NLP builders try your model in one weekend"), you do not have a partnership yet, you have a meeting. Founder Core covers partner economics for reseller and integrator channels; here the "product" is access to a community, so the trade is different, but the test is the same: the partner must be better off in its own metrics.

### The seven types

| Type | What they typically want | What they can typically give | Typical decision owner | Speed |
|---|---|---|---|---|
| **Government entities** (digital and AI authorities, ministries, investment agencies) | Visible progress on national strategies, local talent, citizen-facing stories, attributable outcomes | Venue, logo and convening power, sometimes programme funding, permits and access | Programme director, then a senior official; formal letters | Slow, budget-cycle bound |
| **Sovereign AI programmes and national labs** | Adoption of their models and platforms, Arabic evaluation results, talent pipeline, international visibility | API or compute access, model experts as judges, datasets, prizes | Developer relations or research leadership | Medium |
| **Venture investors and accelerators** | Early, high-signal deal flow; brand with technical founders | Judges, office hours, modest sponsorship, follow-up meetings | A partner or platform head | Fast for small asks |
| **Corporates** (hyperscalers, telcos, banks, conglomerates) | Developer adoption, hiring, innovation narrative, ESG or CSR outcomes | Cash sponsorship, cloud credits, venues, hiring commitments | Developer relations, marketing, HR or CSR, each with its own budget | Medium, budget-season bound |
| **Universities** | Student outcomes, research visibility, rankings signals, industry links | Venues, students, faculty, credibility, sometimes research collaboration | Dean, research office or student-affairs office | Slow, semester bound |
| **Other communities** (city hackathon groups, developer groups, open-source and women-in-tech groups) | Audience, co-branding, content, volunteers | Distribution, volunteers, local knowledge | The organiser personally | Fast |
| **Media** | Stories, data, exclusives, audience growth | Reach, credibility, coverage | Editor or partnerships manager | Fast |

The same organisation often contains several types. A hyperscaler has a developer-relations budget (wants builders on its platform), a marketing budget (wants brand), an HR budget (wants hires) and sometimes a public-sector team (wants government goodwill). These are **different budget lines with different owners**, and a no from marketing says nothing about developer relations.`,
        },
        {
          kind: "md",
          md: md`### What the research brief says about the landscape (dated facts only)

You may use these facts in partner materials, with their dates. Everything else about these organisations is unknown to you until you talk to them.

| Organisation | Dated fact | What it suggests a partner would care about |
|---|---|---|
| **HUMAIN** (PIF-owned, Saudi Arabia) | HUMAIN Chat launched Aug 2025 on ALLaM 34B; Jan 2026 plan for about 6 GW of data-centre capacity (secondary sources) | Builder adoption of a national model and platform |
| **SDAIA** with KSGAAL and partners | BALSAM Arabic benchmark: 78 tasks, 52K examples, blind test sets (arXiv, 30 Jul 2025); ALLaM-7B-Instruct-preview on Hugging Face | Evaluation and Arabic-language quality |
| **Inception (G42), Cerebras, MBZUAI** | Jais 2 released 9 Dec 2025: 70B parameters, open weights | Developers building on open Arabic weights |
| **MBZUAI and G42** | K2 Think, Sep 2025, 32B, fully open; second edition Jan 2026 | Open research reputation, reasoning models |
| **TII** (Abu Dhabi) | Falcon-H1 Arabic, 5 to 6 Jan 2026, 3B/7B/34B, Falcon LLM License | Usage and benchmarks of its Arabic models |
| **QCRI / HBKU** (Qatar) | Fanar platform late 2024; Fanar-1-9B on Hugging Face | Arabic model adoption, research links |
| **Qai** (QIA, Qatar) | Launched Dec 2025; USD 20bn AI infrastructure JV with Brookfield, 9 Dec 2025 | Infrastructure users, ecosystem story |
| **Microsoft and the Government of Kuwait** | Partnership announced 6 Mar 2025: AI-powered Azure region, AI data centre, innovation hub | A Kuwait innovation hub needs local builders |
| **MENA VCs** | MAGNiTT: AI took 22 % of MENA VC in FY2025 (USD 858M) and about 50 % in H1 2026 (USD 678M), while total H1 2026 funding fell 22 % YoY | Investors want AI deal flow in a tighter market |`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "What you do not know yet",
          md: md`The research brief records launches and announcements, mostly from secondary sources. It does **not** tell you whether any of these organisations runs a community, hackathon or sponsorship programme, what budget it has, or who owns it. Several items are explicitly unverified (for example whether Stargate UAE's first 200 MW or HUMAIN's Riyadh and Dammam data centres were live in November 2026, and whether ALLaM 34B weights are public). Never write "X supports builders through programme Y" in a deck unless you have seen programme Y on the organisation's own site, dated.`,
        },
        {
          kind: "chart",
          chart: "bar",
          title: "AI share of MENA venture funding (MAGNiTT)",
          xKey: "period",
          xLabel: "Period",
          yLabel: "USD m",
          series: [
            { key: "ai", label: "AI funding (USD m)" },
            { key: "other", label: "Non-AI funding (USD m)" },
          ],
          data: [
            { period: "FY2025 (full year)", ai: 858, other: 2942 },
            { period: "H1 2026 (half year)", ai: 678, other: 672 },
          ],
          caption: "MAGNiTT FY2025 total USD 3.8bn, H1 2026 total USD 1.35bn (different period lengths). Non-AI is total minus AI. Investors chasing fewer, larger AI deals is the reason a builder community is worth a VC's time.",
        },
        {
          kind: "matrix",
          title: "Alignment and resources map",
          xAxis: ["Low alignment with the builder mission", "High alignment with the builder mission"],
          yAxis: ["Few resources", "Many resources"],
          cells: [
            { label: "Brand buyers", detail: "Many resources, low alignment (a conglomerate or bank wanting visibility). Sell a priced package, cap their influence on content, never let them anchor the programme." },
            { label: "Anchor partners", detail: "Many resources, high alignment (a lab that needs builders on its open models, a cloud developer programme). Design multi-event programmes with them; this is where most effort goes." },
            { label: "Decline politely", detail: "Few resources, low alignment. Thank them, keep them on the newsletter, spend no partnership hours." },
            { label: "Allies", detail: "Few resources, high alignment (city communities, university AI clubs, open-source groups). Co-host and swap distribution; they bring people and credibility, not cash." },
          ],
          caption: "Place each candidate using evidence about its goals and budgets, not hope.",
        },
        {
          kind: "md",
          md: md`### Ranking candidates: the fit score

With dozens of possible partners and a handful of volunteer hours, rank before you reach out:`,
        },
        { kind: "equation", formula: "sh04-fit-score" },
        {
          kind: "md",
          md: md`A sensible starting weight set for Suhail (yours to change, but decide it before you score, or you will bend the weights to favour the partner you already like):

| Criterion | Weight $w_i$ | 5 means |
|---|---|---|
| Mission alignment | 0.30 | Their goal is more and better Arab builders, open models, local talent |
| Resources available to Suhail | 0.25 | They control a budget or in-kind assets that fit an event |
| Decision speed | 0.15 | Can say yes within one quarter |
| Credibility with builders | 0.20 | Engineers respect them and would show up because of them |
| Independence risk (inverted) | 0.10 | 5 means low risk to Suhail's editorial and programme independence |

The score is a triage tool, not a verdict. Two candidates at 3.7 and 3.8 are equal; a candidate at 2.5 is not worth a cold approach this quarter.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Scoring a first target list",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Ranking three archetype partners for Suhail's first hackathon season (illustrative)",
          given: md`Illustrative scores, no contact has been made with anyone. Weights 0.30 / 0.25 / 0.15 / 0.20 / 0.10 as in the table. Candidates are archetypes, not named organisations:
- **A:** a Gulf sovereign AI lab that has released open Arabic weights. Scores: alignment 5, resources 5, speed 2, credibility 4, independence 2.
- **B:** a regional seed VC investing in AI. Scores: 4, 3, 4, 4, 4.
- **C:** a large bank's innovation unit. Scores: 2, 4, 3, 2, 4.`,
          steps: [
            { md: md`**A:** $S = 0.30\times5 + 0.25\times5 + 0.15\times2 + 0.20\times4 + 0.10\times2 = 1.50 + 1.25 + 0.30 + 0.80 + 0.20 = 4.05$.` },
            { md: md`**B:** $S = 0.30\times4 + 0.25\times3 + 0.15\times4 + 0.20\times4 + 0.10\times4 = 1.20 + 0.75 + 0.60 + 0.80 + 0.40 = 3.75$.` },
            { md: md`**C:** $S = 0.30\times2 + 0.25\times4 + 0.15\times3 + 0.20\times2 + 0.10\times4 = 0.60 + 1.00 + 0.45 + 0.40 + 0.40 = 2.85$.` },
            { md: md`**Read the components, not just the total.** A wins on alignment and resources but scores 2 on speed and 2 on independence: it is an anchor partner with a long cycle and a governance question (lesson 5). B is fast and clean but modest in resources: a good first yes that proves the model. C is a brand buyer: sell it a priced package later, once there is an audience to sell.` },
          ],
          result: md`Sequence: start B now (fast, credible first partner), open A in parallel because its cycle is long, and park C until the first event has real attendance numbers. The score ranks; the components tell you how to approach each one.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: a university AI lab",
          given: md`Illustrative. Candidate **D**: a university AI research group in the Gulf. Scores: alignment 4, resources 2, speed 1, credibility 5, independence 5. Same weights.`,
          steps: [
            { md: md`$S = 0.30\times4 + 0.25\times2 + 0.15\times1 + 0.20\times5 + 0.10\times5$.` },
            { md: md`$= 1.20 + 0.50 + 0.15 + 1.00 + 0.50 = $ **3.35**.`, hidden: true, check: { prompt: "Fit score of candidate D", answer: 3.35, tolerance: { abs: 0.01 } } },
            { md: md`Which single criterion drags D down most relative to B? Speed: semester calendars and approvals. Plan a university co-host for an event at least two terms ahead.` },
          ],
          result: md`D ranks between B and C. High credibility and independence make it an ideal **ally** and co-host (venue, students, judges), even though it brings little cash.`,
        },
        {
          kind: "question",
          question: {
            id: "sh04-l01-p1",
            type: "numeric",
            prompt: md`You decide independence matters more after a bad experience and change the weights to alignment 0.25, resources 0.20, speed 0.15, credibility 0.20, independence 0.20. Recompute candidate A (scores 5, 5, 2, 4, 2).`,
            answer: 3.75,
            tolerance: { abs: 0.01 },
            explanation: md`$0.25\times5 + 0.20\times5 + 0.15\times2 + 0.20\times4 + 0.20\times2 = 1.25 + 1.00 + 0.30 + 0.80 + 0.40 = 3.75$. A drops from 4.05 to 3.75 and now ties B. Weights encode strategy: decide them before scoring, write them down, and change them only for a stated reason.`,
            concepts: ["sh04.fit-score"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Mapping partners in practice",
      blocks: [
        {
          kind: "md",
          md: md`### Who does it and with what

The **Partnerships lead** owns the map; you own the top ten relationships personally until the model is proven. The map lives in one shared table (Supabase, Notion or a spreadsheet), not in anyone's WhatsApp: volunteer leads rotate and the relationships must survive them. Minimum columns: organisation, type, budget line, decision owner (name and title once known), what they want (their words), what we can offer, fit score with components, source and date of every fact, status, next step and date.

### Finding the real decision owner

- **Government:** the programme director runs it; a senior official approves; an official letter starts it. Track 0 explains how a Kuwaiti ministry's decision chain works, and the pattern (desk officer, director, undersecretary, minister's office) is similar elsewhere in the Gulf.
- **Sovereign labs:** developer relations or the research lead, not the CEO's office. Ask who ran their last external developer event.
- **VCs:** one partner who cares; the platform or community head executes.
- **Corporates:** find which of the four budgets (developer relations, marketing, HR, CSR) the ask fits, then the owner of that budget.
- **Universities:** a faculty champion first, then the dean's office or the office that signs venue agreements.`,
        },
        { kind: "xref", to: "m13-l01", note: "How a ministry actually works: desk officers, directors and the approval chain. Apply it to any government partner in the Gulf." },
        { kind: "xref", to: "fc03.partner-economics", note: "Founder Core partner economics for resellers and integrators: the same test (the partner must be better off in its own metrics) applies to community partnerships." },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Logo chasing",
          md: md`The most common failure in ecosystem building is collecting logos: MOUs and announcements with big names that bring no money, no people and no programme. A logo slide impresses for one week. Measure each partnership by what changed for builders (people who attended, projects built, hires made, introductions that turned into meetings), and by cash received.`,
        },
        {
          kind: "checklist",
          title: "Before you put an organisation on the target list",
          items: [
            "Every fact about it has a source and a date; anything else is marked unverified.",
            "You can name the budget line the money or in-kind support would come from.",
            "You can state in one sentence, with a number, what it gets from Suhail.",
            "You have scored it with weights fixed before scoring.",
            "You know whether anyone on the Suhail team has a personal or professional tie to it (lesson 5).",
          ],
        },
        {
          kind: "ask",
          title: "Questions for a first partner conversation",
          items: [
            "What does success look like for your team this year, and how is it measured?",
            "Which external builder or developer events did you support last year, and what did you get from them?",
            "Which budget would something like this come from, and when is that budget set for next year?",
            "Who besides you would need to agree, and what would they need to see?",
            "What would make you say this was a waste of your time?",
          ],
        },
        { kind: "sources", refs: ["sh04-r1", "sh04-r2", "sh04-r3", "sh04-r4", "sh04-r5", "sh04-r6"] },
        {
          kind: "question",
          question: {
            id: "sh04-l01-p2",
            type: "short",
            explanation: md`A good map uses only dated, sourced facts, names a budget line and owner for each organisation, shows the trade both ways with a number, and sequences the first approaches by speed and anchor value rather than by score alone.`,
            prompt: md`Produce Suhail's first partner map for January to June 2027. List at least eight real target organisations across at least five of the seven partner types. For each: type, what it wants (with the dated fact that suggests it, or "unverified"), what Suhail could offer, the budget line and likely decision owner (role, not name, unless known), a fit score with components, and the play (anchor, brand buyer, ally, decline). End with your top three to approach first and why.`,
            rubric: [
              "Covers at least eight organisations across at least five partner types, using real organisation names.",
              "Every factual claim about an organisation carries a date and source or is explicitly marked unverified; no invented programmes, budgets or relationships.",
              "States the value exchange both ways for each, with at least one number or measurable outcome on the partner's side.",
              "Identifies a plausible budget line and decision owner role for each.",
              "Fit scores use pre-declared weights and show components, and the play follows from the scores.",
              "The top three are sequenced with a reason (speed, credibility, anchor value), not just the highest totals.",
            ],
            modelAnswer: md`Weights: alignment 0.30, resources 0.25, speed 0.15, credibility 0.20, independence 0.10. No contact made with any organisation; all scores are my estimates.

| Organisation | Type | Why they might care (dated) | Suhail offers | Budget line / owner | Score (A,R,S,C,I) | Play |
|---|---|---|---|---|---|---|
| Inception / MBZUAI (Jais 2) | Sovereign lab | Jais 2 open weights, 9 Dec 2025 | Builders building on Jais 2 at a hackathon track; public results | Developer relations / research lead | 5,4,2,4,3 = 3.90 | Anchor |
| TII (Falcon-H1 Arabic) | Sovereign lab | Falcon-H1 Arabic, Jan 2026 | Arabic evaluation track | Research comms | 5,4,2,4,3 = 3.90 | Anchor |
| QCRI (Fanar) | Sovereign lab / university | Fanar-1-9B on Hugging Face | Doha or remote track | Research lead | 5,3,2,4,4 = 3.75 | Anchor |
| A regional AI-focused seed VC (to pick from MAGNiTT data) | VC | AI about 50 % of MENA VC in H1 2026 | Deal flow, judging seats | Partner | 4,3,4,4,4 = 3.75 | First yes |
| Hub71 | Accelerator / government | Access Programme terms (unverified on hub71.com) | Pipeline of applicants | Programme team | 4,3,3,4,3 = 3.50 | Anchor later |
| Microsoft Kuwait | Corporate | Kuwait partnership, 6 Mar 2025, innovation hub | Kuwait builders for the hub | Developer relations | 4,4,3,3,3 = 3.55 | Anchor |
| A Kuwait or Riyadh university AI club | Ally | none needed | Co-host, students | Faculty champion | 4,1,4,4,5 = 3.35 | Ally |
| Wamda | Media | Publishes MENA funding data (Jan and Jul 2026 reports) | Stories, builder data | Editor | 4,2,4,4,4 = 3.50 | Media ally |
| A large Gulf bank | Corporate | unverified | Priced visibility package | Marketing | 2,4,3,2,4 = 2.85 | Brand buyer, later |

Top three: (1) a seed VC, because a fast first yes proves the format and gives judges; (2) Inception/MBZUAI, opened now because the cycle is long and open weights fit our research arm; (3) a university AI club as co-host for venue and students, which makes the first event real. The bank waits until we have attendance numbers to sell.`,
            concepts: ["sh04.partner-types", "sh04.value-exchange", "sh04.fit-score", "sh04.budget-line"],
            difficulty: 3,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh04-l01-q1",
      type: "mcq",
      prompt: md`A hyperscaler's marketing team declines to sponsor your hackathon. What is the best next move?`,
      options: [
        "Remove the company from the target list for the year.",
        "Ask which other budget (developer relations, HR, public sector) might own builder programmes and approach its owner with a trade that fits it.",
        "Offer the marketing team a lower price.",
        "Ask a government contact to pressure the company.",
      ],
      answer: 1,
      explanation: md`Large organisations hold several budget lines with different owners and goals. A no from marketing says nothing about developer relations, whose goal (builders on the platform) fits a hackathon better. Discounting to the wrong buyer does not fix a mismatch, and pressure through officials damages the relationship.`,
      concepts: ["sh04.budget-line"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh04-l01-q2",
      type: "multi",
      prompt: md`Which of these can you state in a Suhail partner deck as fact, with the date, based on the research brief?`,
      options: [
        "Jais 2 was released on 9 Dec 2025 as a 70B open-weight model.",
        "HUMAIN's Riyadh and Dammam data centres were live in November 2026.",
        "Microsoft and the Government of Kuwait announced a partnership including an innovation hub on 6 Mar 2025.",
        "MBZUAI runs a hackathon sponsorship programme for external communities.",
        "AI took about half of MENA venture funding in H1 2026 according to MAGNiTT.",
      ],
      answer: [0, 2, 4],
      explanation: md`Jais 2, the Microsoft and Kuwait announcement and the MAGNiTT H1 2026 AI share are in the brief with dates and sources. The data-centre go-live is explicitly unverified, and nothing in the brief says MBZUAI runs a sponsorship programme: claiming it would be inventing a fact.`,
      concepts: ["sh04.partner-types"],
      difficulty: 2,
    },
    {
      id: "sh04-l01-q3",
      type: "numeric",
      prompt: md`Weights 0.30 / 0.25 / 0.15 / 0.20 / 0.10 (alignment, resources, speed, credibility, independence). A city developer community scores 5, 1, 5, 4, 5. What is its fit score?`,
      answer: 3.7,
      tolerance: { abs: 0.01 },
      explanation: md`$0.30\times5 + 0.25\times1 + 0.15\times5 + 0.20\times4 + 0.10\times5 = 1.50 + 0.25 + 0.75 + 0.80 + 0.50 = 3.70$. A high score with almost no resources: a classic ally. Co-host and share distribution, do not expect cash.`,
      concepts: ["sh04.fit-score", "sh04.alignment-resources-map"],
      difficulty: 1,
    },
    {
      id: "sh04-l01-q4",
      type: "mcq",
      prompt: md`On the alignment and resources map, a conglomerate with a large marketing budget and little interest in builders is a:`,
      options: ["Anchor partner", "Ally", "Brand buyer", "Decline politely"],
      answer: 2,
      explanation: md`Many resources and low alignment make it a brand buyer: sell a priced package with clear deliverables and keep its influence away from programme and content decisions.`,
      concepts: ["sh04.alignment-resources-map"],
      difficulty: 1,
    },
    {
      id: "sh04-l01-q5",
      type: "decision",
      prompt: md`A volunteer lead returns from a conference excited: "A senior official said they love Suhail and want to sign an MOU." There is no budget, programme or named counterpart. What do you do?`,
      options: [
        { text: "Draft the MOU and announce it on LinkedIn to build momentum.", score: 0.2, feedback: "An announcement without substance is logo chasing; it also commits you publicly before you know what they want." },
        { text: "Thank the official, then ask for a working-level counterpart and a first concrete joint activity with dates and resources; the MOU, if any, follows the activity.", score: 1, feedback: "Right: convert goodwill into a named counterpart and a concrete trade. An MOU is useful only to frame something real." },
        { text: "Ignore it; government partners are too slow.", score: 0.3, feedback: "Government partners are slow but can give venues, convening power and credibility. Qualify, do not ignore." },
        { text: "Ask the official directly for a large sponsorship cheque.", score: 0.4, feedback: "Premature: you do not yet know the budget line or what they need. Discovery first." },
      ],
      explanation: md`Goodwill becomes a partnership only when there is a counterpart, a budget line and a concrete exchange. Secure the working-level owner and one dated activity first.`,
      concepts: ["sh04.value-exchange", "sh04.budget-line"],
      difficulty: 2,
    },
    {
      id: "sh04-l01-q6",
      type: "mcq",
      prompt: md`Why fix the fit-score weights before scoring candidates?`,
      options: [
        "Because the validator requires it.",
        "So the weights reflect strategy and are not bent afterwards to justify a partner you already like.",
        "Because weights must always sum to more than one.",
        "So every candidate gets the same total.",
      ],
      answer: 1,
      explanation: md`Choosing weights after seeing scores lets bias in. Weights encode what Suhail values (alignment, independence, speed); set them first and change them only for a stated reason.`,
      concepts: ["sh04.fit-score"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh04-l01-f1", front: "The seven partner types around Suhail", back: "Government entities, sovereign AI programmes and labs, VCs and accelerators, corporates, universities, other communities, media.", concepts: ["sh04.partner-types"] },
    { id: "sh04-l01-f2", front: "Test of a real partnership", back: "You can write both sides of the trade in one sentence each, with a number on the partner's side.", concepts: ["sh04.value-exchange"] },
    { id: "sh04-l01-f3", front: "Four plays on the alignment and resources map", back: "Anchor (many resources, high alignment), brand buyer (many resources, low alignment), ally (few resources, high alignment), decline (few, low).", concepts: ["sh04.alignment-resources-map"] },
    { id: "sh04-l01-f4", front: "Fit score formula", back: md`$S = \sum_i w_i s_i$ with $\sum_i w_i = 1$ and $s_i$ from 0 to 5.`, concepts: ["sh04.fit-score"] },
    { id: "sh04-l01-f5", front: "Four budget lines inside a large corporate", back: "Developer relations, marketing, HR (talent), CSR or public sector. Different owners, different goals.", concepts: ["sh04.budget-line"] },
    { id: "sh04-l01-f6", front: "Rule for facts about partner organisations", back: "Only dated, sourced facts in materials; everything else is marked unverified until confirmed on the organisation's own site or by the organisation.", concepts: ["sh04.partner-types"] },
  ],
};

export default lesson;
