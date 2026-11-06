import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh07-l05",
  title: "Taking investment or not: what VCs, grant funders and sponsors expect, and what each does to independence",
  summary:
    "Venture capital, accelerators, grants, government programmes, anchor sponsors and earned revenue each buy something different from a community company and each pulls its agenda in a different direction. This lesson applies the fund-returner test to a community business, measures how much of the money is free to spend, and shows how to answer an investor's 'how is this venture scale?' honestly.",
  minutes: 70,
  objectives: [
    "State what a VC, an accelerator, a grant funder, a government programme and a sponsor each expect in return",
    "Apply the fund-returner test to a community company and explain the result",
    "Compute the unrestricted share of income and the payer share of an anchor deal",
    "Place each source on a map of agenda control and money purpose, and explain the independence cost",
    "Answer an investor's 'how does this become venture scale?' question without overclaiming",
  ],
  concepts: [
    { id: "sh07.vc-fit", name: "VC fit for a community company", description: "Venture capital needs each investment to be able to return the fund; a community company's event and media revenue rarely supports that, so VC fits only a part that can become a platform (talent marketplace, data or model company).", competency: "sh-org", related: ["fc07.fund-returner", "fc07.power-law"] },
    { id: "sh07.grant-strings", name: "Grant conditions", description: "Grants are usually restricted to a project, paid in tranches against milestones, limited in the indirect costs they cover, and often available only to nonprofits or universities; they set the agenda through deliverables.", competency: "sh-org", related: ["sh07.restricted-funding", "fc07.non-dilutive"] },
    { id: "sh07.sponsor-capture", name: "Sponsor capture", description: "The gradual drift of programme, speakers, judging or editorial content towards a dominant sponsor's interests, driven by concentration and exclusivity rather than any single explicit demand.", competency: "sh-org", related: ["sh07.concentration-risk"] },
    { id: "sh07.independence-cost", name: "Independence cost of capital", description: "Every source has a price beyond its monetary terms: control rights (VC), deliverables (grants), exclusivity and visibility (sponsors), policy alignment (government). Comparing sources means comparing those prices as well as the amounts.", competency: "sh-org", related: ["sh07.vc-fit", "sh07.grant-strings", "sh07.sponsor-capture"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What each kind of money buys",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Suhail sits next to the people who fund the region: VCs, sovereign-backed programmes, AI companies with partnership budgets. Some of them will offer money early, because a builder community is a deal-flow and hiring channel. Each offer comes with a price that is not on the term sheet, and the first large one will shape what Suhail becomes. You need to know what each source expects before the offer arrives, and you already know the VC side from Afterwave.`,
        },
        {
          kind: "md",
          md: md`### The sources and what they expect

| Source | What they give | What they expect | Time horizon | Pressure on Suhail |
|---|---|---|---|---|
| **Venture capital** | Equity cash, network | A chance at a fund-returning exit; growth; information rights, often a board seat; preferences | 7 to 10 years to exit | Grow fast, find a scalable product, exit |
| **Accelerators** (YC, Antler, Founders, Inc.) | Small cheque for a few % plus a programme | Same logic as VC at an earlier stage; YC funds Delaware, Cayman or Singapore companies (reported 2026) | 3 months programme, then VC path | Incorporate where they fund; behave like a startup |
| **Angels and strategics** | Smaller cheques, introductions | Return, or strategic benefit (deal flow, hiring) | Varies | A strategic may want privileged access |
| **Grant funders** (foundations, research programmes) | Non-dilutive project money | Deliverables, reports, eligible entity (often nonprofit or university), limited overhead | Project length, 1 to 3 years | Agenda follows the call for proposals |
| **Government programmes** | Grants, venues, visibility | Alignment with national priorities, local presence, reporting | Policy cycle | Location and theme follow policy |
| **Sponsors** | Annual marketing, DevRel or recruiting money | Measurable outcomes, visibility, sometimes exclusivity | 1 year, renewable | Programme drifts towards the dominant sponsor |
| **Earned revenue** (tickets, posts, membership) | Unrestricted cash | Value for the payer | Continuous | Least, if spread over many payers |

### The fund-returner test applied to a community company

Venture returns follow a power law: a fund's result is made by one or two companies, so every investment must be able to return the whole fund on its own.`,
        },
        { kind: "equation", formula: "sh07-fund-returner" },
        {
          kind: "md",
          md: md`For a USD 50 m fund that ends with 10 % at exit, $V_{\text{exit}} = 50/0.10 =$ USD 500 m. Event, media and sponsorship businesses are valued on modest multiples of revenue or profit. At an **illustrative** 3x revenue (an assumption for the arithmetic, not market data), USD 500 m needs about USD 167 m of annual revenue: no builder community runs that many hackathons. The honest conclusion is not "never take VC" but "the event and media business is not the VC case". A VC case exists only if one part of Suhail can become a scalable product: a **talent marketplace** matching Arab-world engineers with employers, or a **research and data company** selling evaluation, datasets or models.

On Deck is the cautionary example: a venture-funded community company that grew headcount ahead of its model and cut staff twice in 2022, ending its USD 125k-for-7 % accelerator (TechCrunch, 4 August 2022); the paid, non-dilutive fellowship is what survived.

### The regional funding climate

MAGNiTT counted USD 1.35 bn of MENA venture funding across 214 deals in H1 2026, down 22 % in value and 41 % in deal count year on year, with AI companies taking about half of the money (USD 678 m). Money is scarcer and concentrated in AI. A community company competes for that money badly; its research arm, if it produces credible open Arabic models and benchmarks, competes better, but mostly for grants and compute partnerships rather than equity.

### Free money is rarely free: the unrestricted share`,
        },
        { kind: "equation", formula: "sh07-unrestricted-share" },
        {
          kind: "matrix",
          title: "Where each source sits: purpose of the money and say over the agenda",
          xAxis: ["Tied to a project", "For the organisation"],
          yAxis: ["Little say over the agenda", "Large say over the agenda"],
          cells: [
            { label: "Large restricted grants, government programmes", detail: "Deliverables and themes set by the funder; overhead capped." },
            { label: "VC equity, anchor sponsor with exclusivity", detail: "Control rights or concentration give a large say over strategy, programme or brand." },
            { label: "In-kind credits, small project grants", detail: "Useful, narrow, little influence; do not pay fixed costs." },
            { label: "Many small sponsors, tickets, job posts, membership", detail: "Unrestricted and diffuse: the independent core of the business." },
          ],
          caption: "Build the bottom-right quadrant first; take top-row money only for parts of Suhail that can carry its strings.",
        },
        {
          kind: "xref",
          to: "fc07-l01",
          note: "Fund economics, the power law and the fund-returner test are derived in Founder Core; this lesson only applies them to a community company.",
        },
        {
          kind: "xref",
          to: "fc07-l03",
          note: "The full capital-sources map (angels, VCs, accelerators, grants, Gulf funds and programmes such as Hub71) is in Founder Core.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Comparing three offers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "A VC cheque, a research grant and an anchor sponsor (illustrative)",
          given: md`Illustrative offers in mid-2027, none real. Base revenue without any of them: USD 252k (lesson 3).
(a) A regional fund offers USD 500k for 15 % of a Suhail for-profit holding, with a board seat.
(b) A foundation offers USD 150k over 18 months for an open Arabic benchmark, restricted to the project, with 10 % allowed for indirect costs, quarterly reports, nonprofit or university recipient required.
(c) A cloud provider offers USD 120k a year to be "presenting partner" of all Suhail events with category exclusivity (no other cloud sponsors).`,
          steps: [
            { md: md`(a) Implied post-money: $0.5/0.15 =$ USD 3.33 m. If the fund is USD 50 m and is diluted to 10 % by exit, it needs a USD 500 m exit. The fund is not buying the events business; it is buying an option on a talent or data platform, and the board seat will push towards building it.` },
            { md: md`(b) Unrestricted part: $0.10 \times 150 =$ USD 15k; the other USD 135k must be spent on the benchmark. It needs an eligible recipient, so either a nonprofit research entity or a university partner. Reporting (illustrative 30 hours a quarter) lands on the research lead.` },
            { md: md`(c) Payer share with the deal: $120/(252+120) = 32.3\%$, above the 25 % guardrail. Category exclusivity removes the other cloud providers from the sponsor pool, which also blocks their credits for builders.` },
            { md: md`Independence cost ranking for an independent ecosystem: (c) is the most dangerous for neutrality, (a) changes what the company is, (b) is the cleanest if it goes to the research arm through the right entity.` },
          ],
          result: md`A defensible response: decline (a) unless and until a platform business exists with its own plan; accept (b) through a nonprofit or university partner; counter (c) with a non-exclusive presenting package capped at about USD 60k, so the largest payer stays near a quarter of revenue.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: how much of the money is free to spend?",
          given: md`Illustrative year: earned revenue USD 212k (all unrestricted) plus the USD 150k grant (10 % indirect allowed) received in full in the year.`,
          steps: [
            {
              md: md`Unrestricted income $R_{\text{unres}} = 212 + 0.10 \times 150$ (USD thousand).`,
              hidden: true,
              check: { prompt: "Unrestricted income", answer: 227, unit: "USD thousand", tolerance: { abs: 0.5 } },
            },
            {
              md: md`Unrestricted share $u = R_{\text{unres}}/R = 227/362$.`,
              hidden: true,
              check: { prompt: "Unrestricted share", answer: 0.627, tolerance: { abs: 0.005 } },
            },
          ],
          result: md`Income rose by 70 % but free-to-spend money only by 7 % (212 to 227). The grant makes Suhail busier and more credible in research, not richer.`,
        },
        {
          kind: "question",
          question: {
            id: "sh07-l05-p1",
            type: "numeric",
            prompt: md`A USD 80 m fund expects to own 8 % at exit. What exit value returns the whole fund from this one company? (USD m)`,
            answer: 1000,
            tolerance: { rel: 0.01 },
            unit: "USD m",
            explanation: md`$V_{\text{exit}} = 80/0.08 =$ USD 1,000 m. No events business gets near this; only a platform could.`,
            concepts: ["sh07.vc-fit"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Talking to funders",
      blocks: [
        {
          kind: "md",
          md: md`### How it is done

- **With VCs and angels**: treat them first as sponsors, speakers and judges (within the conflict policy), not as investors. If one wants to invest, ask what part of Suhail they are buying and what exit they imagine; if the answer is "the community", decline politely.
- **With grant funders**: read the call, check entity eligibility first, budget the indirect-cost line and the reporting hours, and agree publication rights (open data and open weights must be allowed by the grant terms).
- **With sponsors**: sell outcomes, cap the top payer, avoid category exclusivity across the whole community (exclusivity per event is negotiable at a higher price).
- **With government programmes**: expect alignment and reporting; be clear which events are Suhail's own and which are programme deliverables.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`**Taking VC to pay volunteers**: the money runs out before a scalable product exists, as with On Deck's 2022 cuts. **Grant-chasing**: rewriting the research agenda for every call. **One anchor sponsor** quietly deciding speakers and themes (sponsor capture). **Promising a funder "the community"** in a deck, which builders will read as being sold. **Signing grant terms that forbid open release** of the datasets or weights that justify the research arm.`,
        },
        {
          kind: "ask",
          title: "Questions to ask any funder before accepting",
          items: [
            "What exactly do you get: equity, deliverables, visibility, exclusivity, data, a seat?",
            "What happens if we miss a milestone or decide to change direction?",
            "Who must the recipient entity be, and in which jurisdiction?",
            "Can we publish everything we produce, under an open licence, without your approval?",
            "Will your name appear on our editorial content, judging or programme, and who decides that?",
          ],
        },
        { kind: "scenario", scenario: "sh07-s2" },
        {
          kind: "question",
          question: {
            id: "sh07-l05-p2",
            type: "short",
            prompt: md`**Write Suhail's one-page funding policy.** State which sources Suhail accepts for which part of the organisation (events and media, talent, research arm), the terms it will not accept, the concentration and unrestricted-share targets, and a three-sentence answer to an investor who asks "how is this venture scale?". Label illustrative numbers.`,
            rubric: [
              "Assigns sources to parts of the organisation (earned revenue and sponsors to events and media; grants and compute to the research arm; equity only to a future platform)",
              "Lists specific unacceptable terms (category exclusivity across the community, sponsor control of editorial or judging, grant terms that forbid open release, equity in the community itself)",
              "Sets numeric targets: largest payer share cap and minimum unrestricted share, consistent with the lesson",
              "The investor answer is honest: the community is not the venture case, names a possible platform and what evidence would be needed",
              "Consistent with the regional funding facts used (H1 2026 decline, AI concentration) with the source date",
            ],
            modelAnswer: md`**Suhail funding policy (illustrative targets)**

- **Events and media** are funded by earned revenue (tickets, job posts, packages) and sponsors. No single payer above 25 % of annual revenue; we start replacing above 20 %. No category exclusivity across the whole community; per-event exclusivity only at a priced premium.
- **Talent** (job board, hiring packages) is funded by employers on non-exclusive terms; members opt in to be visible.
- **Research arm** is funded by grants, compute donations and research partnerships, received through a nonprofit or university partner. We accept only terms that allow open release of datasets, benchmarks and weights, and we publish our research agenda before applying.
- **Equity** is not sold in the community business. If a separate platform (for example a talent marketplace) is built, it may raise equity on its own plan.
- **Targets**: unrestricted share at least 60 % of income; reserve of six months of fixed costs before any new recurring commitment.
- **Never accepted**: sponsor approval of editorial content, sponsor majority on judging panels, private investor access to participants that is not offered to others, grant terms that make the funder the owner of community data.

**Investor answer**: "The community itself is not a venture-scale business, and we are not raising on it. It is the distribution for one that might be: a marketplace for Arab-world engineering talent, which MENA funding (USD 1.35 bn in H1 2026 per MAGNiTT, about half to AI) would value if we show repeat hiring revenue. When the job board and hiring packages show that, we will build it as a separate company and talk to you then."`,
            explanation: md`A policy written in advance lets you decline quickly and consistently, and the honest investor answer usually earns more respect, and later money, than a stretched deck.`,
            concepts: ["sh07.vc-fit", "sh07.grant-strings", "sh07.sponsor-capture", "sh07.independence-cost"],
            difficulty: 3,
          },
        },
        { kind: "sources", refs: ["sh07-r20", "sh07-r14", "sh07-r29"] },
      ],
    },
  ],
  quiz: [
    {
      id: "sh07-l05-q1",
      type: "numeric",
      prompt: md`A USD 40 m fund expects 10 % ownership at exit. What exit value makes this one company a fund returner? (USD m)`,
      answer: 400,
      tolerance: { rel: 0.01 },
      unit: "USD m",
      explanation: md`$40/0.10 =$ USD 400 m.`,
      concepts: ["sh07.vc-fit"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh07-l05-q2",
      type: "numeric",
      prompt: md`Earned revenue USD 180k plus a USD 100k grant with 12 % indirect costs allowed. Unrestricted share of total income? (%, 1 decimal)`,
      answer: 68.6,
      tolerance: { abs: 0.2 },
      unit: "%",
      explanation: md`$R_{\text{unres}} = 180 + 12 = 192$; $u = 192/280 = 68.6\%$.`,
      concepts: ["sh07.grant-strings"],
      difficulty: 2,
    },
    {
      id: "sh07-l05-q3",
      type: "mcq",
      prompt: "Which source typically requires the recipient to be a nonprofit or university?",
      options: ["Venture capital", "Many research and foundation grants", "Hackathon sponsors", "Job-board customers"],
      answer: 1,
      explanation: md`Many grant programmes restrict eligibility by entity type, which is one reason a research arm may need its own nonprofit or a university partner.`,
      concepts: ["sh07.grant-strings"],
      difficulty: 1,
    },
    {
      id: "sh07-l05-q4",
      type: "multi",
      prompt: "Which terms are signs of sponsor capture risk?",
      options: [
        "Category exclusivity across all Suhail events",
        "A sponsor paying more than a third of annual revenue",
        "A post-event report on activated developers",
        "Sponsor approval of newsletter content",
        "A logo on the event page",
      ],
      answer: [0, 1, 3],
      explanation: md`Exclusivity, concentration and editorial control create capture. Reports and logos are normal deliverables.`,
      concepts: ["sh07.sponsor-capture"],
      difficulty: 2,
    },
    {
      id: "sh07-l05-q5",
      type: "mcq",
      prompt: "According to MAGNiTT, how did MENA venture funding in H1 2026 compare with H1 2025?",
      options: [
        "Up 74 % in value",
        "Down 22 % in value and 41 % in deal count, with AI taking about half the money",
        "Flat in value, up in deal count",
        "Down 62 % in value across MENA",
      ],
      answer: 1,
      explanation: md`USD 1.35 bn across 214 deals in H1 2026. The +74 % figure is MAGNiTT's full-year 2025; the 62 % fall was Saudi Arabia in Q1 2026.`,
      concepts: ["sh07.vc-fit"],
      difficulty: 2,
    },
    {
      id: "sh07-l05-q6",
      type: "decision",
      prompt: md`A sovereign-linked programme offers to fund all four Suhail hackathons in 2027 (USD 160k) if they are branded as its initiative and held in its city. Base revenue is USD 252k. What do you do?`,
      options: [
        { text: "Accept as offered: it nearly doubles revenue", score: 0.2, feedback: "The programme would be 39 % of revenue and own the brand of Suhail's main product." },
        { text: "Offer co-branded events (Suhail with the programme as partner) for two of the four, keeping Suhail's judging and programme rules", score: 1, feedback: "Keeps the payer near a quarter of revenue and the Suhail brand on its own product while still taking meaningful money." },
        { text: "Decline any government money", score: 0.3, feedback: "Government programmes are a legitimate and important source in the Gulf; a ban gives up too much." },
        { text: "Accept, and run separate Suhail-branded events later", score: 0.4, feedback: "Splits your scarce lead time and confuses builders about what Suhail is." },
      ],
      explanation: md`$160/(252+160) = 38.8\%$ as offered; $80/(252+80) = 24.1\%$ for two events.`,
      concepts: ["sh07.independence-cost", "sh07.concentration-risk"],
      difficulty: 3,
    },
  ],
  flashcards: [
    { id: "sh07-l05-f1", front: "Fund-returner test", back: md`$V_{\text{exit}} = F_{\text{fund}}/p_{\text{exit}}$. USD 50 m fund at 10 %: USD 500 m exit.`, concepts: ["sh07.vc-fit"] },
    { id: "sh07-l05-f2", front: "When VC fits a community company", back: "Only for a part that can become a scalable product (talent marketplace, data or model company), not the events and media business.", concepts: ["sh07.vc-fit"] },
    { id: "sh07-l05-f3", front: "Unrestricted share", back: md`$u = R_{\text{unres}}/R$; a grant with 10 % indirect adds 90 % restricted money.`, concepts: ["sh07.grant-strings"] },
    { id: "sh07-l05-f4", front: "Sponsor capture", back: "Programme, speakers, judging or editorial drift towards a dominant sponsor; driven by concentration and exclusivity.", concepts: ["sh07.sponsor-capture"] },
    { id: "sh07-l05-f5", front: "MENA VC H1 2026 (MAGNiTT)", back: "USD 1.35 bn, 214 deals; down 22 % in value and 41 % in deals year on year; AI about 50 % (USD 678 m).", concepts: ["sh07.vc-fit"] },
    { id: "sh07-l05-f6", front: "On Deck lesson (2022)", back: "Venture-funded community grew ahead of its model; staff cuts and the ODX accelerator ended; the paid fellowship survived.", concepts: ["sh07.vc-fit"] },
  ],
  scenarios: [
    {
      id: "sh07-s2",
      title: "The investor asks how this is venture scale",
      context: md`Illustrative, late 2027. After a Majlis podcast recording, a partner at a regional seed fund says: "I like what you are building. We would put in USD 400k. How does this become a venture-scale business?" Suhail has an illustrative USD 252k of revenue, a job board and no platform product.`,
      start: "a",
      concepts: ["sh07.vc-fit", "sh07.independence-cost"],
      nodes: {
        a: {
          md: md`How do you answer?`,
          choices: [
            { text: "Pitch the community as a USD 1 bn opportunity because the Arab world has hundreds of millions of people", next: "b", score: 1, feedback: "A top-down number with no mechanism. A good investor will see through it, and if they invest on it you inherit expectations the business cannot meet." },
            { text: "Say honestly that the community is not the venture case, describe the talent-marketplace hypothesis and the evidence you would need, and decline equity in the community", next: "c", score: 9, feedback: "Honest, specific and keeps the relationship. It also tells the investor what would make you investable." },
            { text: "Take the money and work out the model later", next: "d", score: 2, feedback: "The On Deck path: capital ahead of a model." },
          ],
        },
        b: {
          md: md`The partner asks: "What is revenue per member, and how many members are paying anything?"`,
          choices: [
            { text: "Admit the top-down number was not a model and give the honest answer instead", next: "c", score: 6, feedback: "Recovers, at some cost to credibility." },
            { text: "Change the subject to the conference", score: 0, feedback: "The investor now knows you do not have the numbers." },
          ],
        },
        c: {
          md: md`The partner says: "Fair. What would you need to see?" You answer: repeat hiring revenue from at least ten employers, a measurable placement rate, and members who come back. The partner offers instead to sponsor a hackathon and to be an investor judge.`,
          choices: [
            { text: "Accept the sponsorship within the 25 % cap and the conflict and judging rules, and agree to talk about the platform when the evidence exists", score: 10, feedback: "Money on terms that do not change what Suhail is, and a future investor who knows your bar." },
            { text: "Ask for exclusivity on investor access as a favour in return", score: 3, feedback: "Exclusive investor access damages neutrality with other funds and builders." },
          ],
        },
        d: {
          md: md`Six months later the board asks for a growth plan that triples revenue and a platform roadmap. Leads are now partly paid from the investment and revenue has not moved.`,
          choices: [
            { text: "Cut back to the sustainable core and tell the investor plainly", score: 4, feedback: "Right action; the cost was taking money before the model existed." },
          ],
        },
      },
    },
  ],
};

export default lesson;
