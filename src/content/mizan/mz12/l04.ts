import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz12-l04",
  title: "Partnering with an analytics vendor like SwishOS versus building in-house: overlap, data rights, white-labelling and revenue share",
  summary:
    "SwishOS (Swish Solar) infers soiling from existing plant data and optimises cleaning schedules, which is close to Mizan's own core. This lesson shows how to analyse that overlap, the partnership options from referral to co-development, the five-year economics of partner, build and hybrid paths, and the terms that decide whether a partnership accelerates Mizan or hollows it out: data rights, model training, white-labelling, revenue share, publication with KISR, non-solicit, change of control and exit.",
  minutes: 75,
  objectives: [
    "You can state what the research says about SwishOS and where it overlaps with and differs from Mizan's planned product.",
    "You can compare referral, resale, white-label, co-development and build options on margin, control, speed and risk.",
    "You can compute Mizan's net under a revenue share and the break-even share for a given volume.",
    "You can set out the data-rights triangle between plant owner, analytics vendor and Mizan, including model training and residency.",
    "You can write a negotiating brief for a first commercial conversation with an analytics vendor.",
  ],
  concepts: [
    {
      id: "mz12.overlap-analysis",
      name: "Partner overlap analysis",
      description:
        "Mapping a prospective partner's product against your own roadmap function by function, to find where the partner is a supplier (fills a gap), a complement (adjacent) or a competitor (same core). With SwishOS the overlap is in the core (soiling inference and cleaning schedules), so any partnership must protect Mizan's differentiators.",
      competency: "mz-business",
      related: ["mz12.build-partner-resell", "mz03.commercial-soiling-models"],
    },
    {
      id: "mz12.white-label",
      name: "White-labelling",
      description:
        "Selling a partner's product under Mizan's brand and interface, with Mizan as first-line support. Gains brand control and speed; leaves the roadmap, model and often the data pipeline with the partner. Needs explicit rights to brand, UI embedding, support tiers and transition on exit.",
      competency: "mz-business",
      related: ["mz12.revenue-share", "mz12.control-points"],
    },
    {
      id: "mz12.revenue-share",
      name: "Revenue share and break-even share",
      description:
        "Mizan keeps a share s of the customer price P and covers local cost c_l and fixed cost F_p: net = (sP - c_l)Q - F_p. The break-even share is s* = (F_p/Q + c_l)/P; below it the partnership loses money at that volume.",
      competency: "mz-business",
      related: ["mz12.breakeven-volume", "fc03.partner-economics"],
    },
    {
      id: "mz12.data-rights-triangle",
      name: "Data-rights triangle",
      description:
        "Plant owner, analytics vendor and Mizan each need defined rights: the owner owns plant data; the vendor gets a licence to process it for the service; model training on it, aggregation, residency and onward transfer need explicit permission; Mizan needs copies of inputs and outputs so it is never locked in.",
      competency: "mz-business",
      related: ["fc08.data-rights", "mz12.control-points"],
    },
    {
      id: "mz12.partner-exit",
      name: "Partner exit protections",
      description:
        "Terms that keep Mizan's customers whole if the partnership ends or the partner changes: termination for change of control, transition assistance, data export in open formats, continuity (escrow or a wind-down licence) if the partner fails, and non-solicitation of Mizan-sourced customers.",
      competency: "mz-business",
      related: ["mz12.white-label", "mz12.termination-compensation"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "A partner that does what you plan to do",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`SwishOS was discussed as a soiling analytics partner for Mizan. Nothing has been agreed. It is the hardest partnership decision in the venture because the partner's product sits in Mizan's own core: inferring soiling from operational data and turning it into cleaning decisions. Done well, a partnership could put a working product on Kuwaiti plants within months while Mizan builds its validated method with KISR. Done badly, Mizan becomes the local sales arm that validates, with KISR's credibility, a foreign competitor's model. You will lead that conversation, so you need the overlap mapped, the economics computed and the terms ready.`,
        },
        {
          kind: "md",
          md: md`### What the research says about SwishOS

From the research brief (search-snippet level; confirm with the company before quoting externally):
- **Company:** Swish Solar, Waterloo, Canada.
- **Product:** SwishOS: AI soiling modelling and cleaning-schedule optimisation from existing plant data, with no extra hardware.
- **Pricing:** a sliding scale by plant capacity.
- **Customers:** early customers in North America and the Middle East; Renko Energy (Turkey, 12 sites) is named.
- **Funding:** USD 1.5 m pre-seed led by Friday Ventures (November 2025); a separate "USD 100K seed" listing is unverified.
- **Coverage:** pv magazine wrote about SwishOS in March 2026.

That is a young, venture-backed company with a product in market and Middle East ambitions, about one funding round ahead of Mizan.

### Overlap analysis

| Function | SwishOS (public description) | Mizan plan | Relationship |
|---|---|---|---|
| Soiling inference from operational data | Yes | Yes (mz03), with an IEC 61724 temperature-corrected PR baseline | **Competitor in the core** |
| Cleaning-schedule optimisation | Yes | Yes (mz04) | **Competitor in the core** |
| Validation with a Kuwaiti research body | Not reported | KISR methodology partnership targeted; Shagaya 2018 to 2019 cleaning-arm failure as a natural experiment | **Mizan differentiator** |
| Kuwait dust and soiling data | Not reported | Planned open Kuwait dust and soiling atlas | **Mizan differentiator** |
| Stow and tracker control under dust | Not reported | Planned (mz05) | **Mizan differentiator** |
| Local presence, Arabic, public procurement | Not reported in Kuwait | Core of the distribution thread | **Mizan differentiator** |
| Hardware (robots, BESS, PPC) integration | Not reported | Distribution thread | Complement |

The conclusion is uncomfortable but useful: in the core, SwishOS is a competitor with a head start; Mizan's defensible ground is validation, local data, control functions and access. Every partnership option must be judged by what it does to those four.

### The options

| Option | What it means | Margin to Mizan | Control | Speed | Main risk |
|---|---|---|---|---|---|
| **Referral** | Mizan introduces SwishOS to Kuwaiti plants for a fee | Very low | None | Fast | Mizan teaches a competitor the market |
| **Resale** | Mizan sells SwishOS subscriptions under SwishOS brand, keeps a share | Low to medium | Customer contract only | Fast | Partner goes direct at renewal |
| **White-label** | SwishOS engine inside a Mizan-branded product; Mizan supports | Medium | Brand, contract, front line | Fast to medium | Roadmap and model stay with partner; exit is hard |
| **Co-develop** | Joint Kuwait module (dust model, validation), shared IP | Depends on the split | Shared | Medium | IP disputes; KISR's interests are a third party in the IP |
| **Build** | Mizan's own engine, perhaps benchmarked against SwishOS | High | Full | Slow | Technical and time risk |
| **Hybrid** | White-label or resale now, own engine later, with clean exit terms | Low now, high later | Grows over time | Fast now | Partner refuses exit terms or blocks benchmarking |`,
        },
        { kind: "equation", formula: "mz12-rev-share-net" },
        { kind: "equation", formula: "mz12-breakeven-share" },
        {
          kind: "chart",
          chart: "line",
          title: "Cumulative profit of three paths (illustrative, USD thousands)",
          xKey: "year",
          xLabel: "Year",
          yLabel: "Cumulative profit, USD k",
          series: [
            { key: "partner", label: "Partner only (resale or white-label)" },
            { key: "build", label: "Build only (ready after 12 months)" },
            { key: "hybrid", label: "Hybrid: partner 2 years, then own engine" },
          ],
          data: [
            { year: "Y1", partner: 10, build: -400, hybrid: -390 },
            { year: "Y2", partner: 110, build: -590, hybrid: -690 },
            { year: "Y3", partner: 330, build: -570, hybrid: -390 },
            { year: "Y4", partner: 730, build: -270, hybrid: 330 },
            { year: "Y5", partner: 1310, build: 450, hybrid: 1470 },
          ],
          caption: "Assumptions from lesson 1 (price USD 1,500 per MW per year; partner contribution USD 600 and fixed USD 80k; build contribution USD 1,400 and fixed USD 400k). Contracted MW 150, 300, 500, 800, 1,100; the build-only path lags one year. Partner-only looks safest on profit, but after five years it owns no engine; hybrid pays for speed and ends with the asset.",
        },
        {
          kind: "md",
          md: md`### The data-rights triangle

| Right | Plant owner | Analytics vendor | Mizan |
|---|---|---|---|
| Ownership of plant data (SCADA, met, cleaning logs) | **Owns** | No | No |
| Process data to deliver the service | Grants | Licensed, limited to the service | Licensed |
| Train or improve models on the data | Must consent explicitly | Only if granted; aggregated and de-identified at most | Same |
| Copies of inputs and outputs (soiling estimates, recommendations) | Yes | Yes | **Must have**, in open formats, continuously |
| Residency and onward transfer | Decides (government plants may require data to stay in Kuwait) | Must comply | Must comply |
| Publication of results (for example with KISR) | Approves | Must not block agreed publications | Co-publishes with KISR |

For government-owned plants (Shagaya Phase I belongs to MEWRE after KISR handed it over), residency and classification can be decisive: a partner hosted abroad may simply not be allowed. Check the buyer's requirements early.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Data residency for Kuwaiti government data",
          md: md`Kuwait's telecommunications regulator (CITRA) has issued data classification and cloud policies that may restrict where government data can be hosted. The research for this course did not verify the current texts or how they apply to plant operational data. Ask the buyer's IT and legal team in writing which classification applies and whether processing abroad is permitted before proposing any foreign-hosted service.`,
        },
        { kind: "sources", refs: ["mz12-r1", "mz12-r2", "mz12-r22"] },
      ],
    },
    {
      layer: "applied",
      title: "Pricing the partnership",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Reading the hybrid path",
          given: md`Use the chart's assumptions (illustrative). Hybrid: resale or white-label for years 1 and 2 while the build team works; switch customers to Mizan's engine from year 3.`,
          steps: [
            { md: md`**Year 1.** Partner profit $600 \times 150 - 80{,}000 = 10{,}000$, minus the build team USD 400,000: USD -390,000.` },
            { md: md`**Year 2.** $600 \times 300 - 80{,}000 - 400{,}000 = -300{,}000$; cumulative USD -690,000. This is the cash the hybrid path needs: it is a fundraising number.` },
            { md: md`**Year 3 onward.** Own engine at USD 1,400 contribution: $1{,}400 \times 500 - 400{,}000 = 300{,}000$; year 4 $1{,}400 \times 800 - 400{,}000 = 720{,}000$; year 5 $1{,}400 \times 1{,}100 - 400{,}000 = 1{,}140{,}000$. Cumulative USD 1.47 m by year 5.` },
            { md: md`**Comparison.** Partner-only reaches USD 1.31 m; build-only USD 0.45 m (it lost a year of customers). Hybrid wins by year 5 and, unlike partner-only, ends with an engine valued as software.` },
            { md: md`**What makes it work.** Customers must move from partner to Mizan engine in year 3. That is only possible if the contract with the owner is Mizan's, the data history is in Mizan's hands, and the partner agreement allows migration without penalty or non-solicit traps. Those terms are what you negotiate.` },
          ],
          result: md`The hybrid path is the economically sensible one, and it is exactly the path a partner will resist once it understands it. Be open about it: offer the partner a fair, time-limited deal (for example a guaranteed minimum term, a transition fee or a continuing licence for non-Kuwait markets) rather than hiding the plan.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Is the offered revenue share enough?",
          given: md`Illustrative. The partner offers Mizan 30 % of a USD 1,500 per MW per year price for reselling. Mizan's local onboarding and support cost is USD 200 per MW per year and its fixed cost for the line USD 80,000 per year. Expected contracted volume: 300 MW.`,
          steps: [
            {
              md: md`**Net per MW at 30 %.** $0.30 \times 1{,}500 - 200 = 250$ USD per MW per year.`,
              hidden: true,
              check: { prompt: "Net per MW (USD per year)", answer: 250, tolerance: { abs: 1 } },
            },
            {
              md: md`**Annual net at 300 MW.** $250 \times 300 - 80{,}000 = -5{,}000$ USD: a loss.`,
              hidden: true,
              check: { prompt: "Annual net (USD)", answer: -5000, tolerance: { abs: 10 } },
            },
            {
              md: md`**Break-even share.** $s^* = (80{,}000/300 + 200)/1{,}500 = (266.7 + 200)/1{,}500 = 0.311$, so 31.1 %.`,
              hidden: true,
              check: { prompt: "Break-even share (%)", answer: 31.1, tolerance: { abs: 0.2 } },
            },
            { md: md`**Counter.** At 45 %: $(0.45 \times 1{,}500 - 200) \times 300 - 80{,}000 = 475 \times 300 - 80{,}000 = $ USD 62,500. Justify it with what Mizan carries: local sales, procurement, Arabic support, data integration and the KISR relationship.` },
          ],
          result: md`At small volumes, standard reseller shares do not cover a local team's fixed cost. Either negotiate a share well above break-even, a white-label wholesale price, or a minimum fee per site, or the partnership is a cost centre.`,
        },
        {
          kind: "question",
          question: {
            id: "mz12-l04-p1",
            type: "numeric",
            prompt: md`At a price of USD 1,200 per MW per year, local cost USD 150 per MW, fixed cost USD 60,000 per year and 400 MW, what is the break-even revenue share for Mizan (in %)?`,
            answer: 25,
            tolerance: { abs: 0.2 },
            unit: "%",
            explanation: md`$s^* = (60{,}000/400 + 150)/1{,}200 = (150 + 150)/1{,}200 = 0.25$.`,
            concepts: ["mz12.revenue-share"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "The negotiation",
      blocks: [
        {
          kind: "xref",
          to: "fc08-l07",
          note: "Founder Core covers data and training rights, liability caps and pilot contracts in general. Here they become the core of a partner agreement.",
        },
        {
          kind: "xref",
          to: "mz03-l04",
          note: "Commercial soiling models and their limits are covered in mz03; use that to judge any partner's technical claims and to design a fair benchmark.",
        },
        {
          kind: "md",
          md: md`### What to negotiate, in order of importance

1. **Customer contract and migration.** Mizan signs with Kuwaiti customers; the partner supplies Mizan. Mizan may migrate customers to its own engine at any renewal after a stated minimum term, with no fee or a fixed transition fee.
2. **Data rights.** Owner owns data; partner processes only for the service; no training on Kuwaiti plant data without owner consent and Mizan's agreement; continuous export of inputs and outputs to Mizan in open formats; residency per buyer requirements.
3. **Validation and publication.** Any validation with KISR is Mizan's and KISR's work. The partner cannot block publication (including unfavourable results) and cannot use KISR's name or results in marketing without written consent.
4. **Benchmarking.** Mizan may benchmark the partner's outputs against its own engine and against ground truth, and share results with customers.
5. **IP on joint work.** Background IP stays with each party; a Kuwait dust or soiling module developed jointly is owned as agreed in writing before work starts (for example Mizan owns Kuwait-specific models, partner owns improvements to its generic engine). Remember KISR may have its own IP policy.
6. **Commercials.** Revenue share above break-even (or wholesale price per MW), a minimum fee per site, price protection on tenders, clear support tiers (Mizan first line, partner second and third line, response times).
7. **White-label rights.** Brand, UI embedding or API access, documentation that can be rebranded, the partner's name disclosed only where procurement requires it.
8. **Territory and exclusivity.** The partner already has Middle East customers, so expect non-exclusivity. Ask for Kuwait exclusivity for government and KISR-related plants, or at least a non-solicit of customers Mizan introduced, for 24 months after termination.
9. **Change of control and continuity.** Mizan may terminate if the partner is acquired by a competitor; continuity licence or escrow of the deployed models and a 12-month wind-down if the partner ceases operating. A pre-seed company's survival is a real risk.
10. **Liability and security.** Mutual caps; the partner's security posture fit for OT data (read-only access, IEC 62443 zoning on the plant side).

### What the partner will want from Mizan

Kuwaiti market access, procurement know-how, Arabic support, introductions (including to KISR), and possibly Kuwaiti data to improve its model. Price each of these. The KISR relationship and Kuwaiti data are the most valuable things Mizan has: do not give them away for a reseller margin.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "Be straight with the partner",
          md: md`Do not pretend Mizan has no plans for its own engine. Founders talk, and SwishOS will read Mizan's site and any KISR paper. Say what you intend: "We are building a validated Kuwait method with KISR and will run our own engine in Kuwait over time. We want a partnership now that gets plants online fast and is fair to you when we migrate, and we are open to a continuing relationship outside Kuwait or for capabilities we do not build." A partner who walks away from that would have been a problem later.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- Introducing the partner to KISR before terms are signed, so the methodology partnership becomes theirs.
- A white-label contract without data export, so the plant history lives only in the partner's cloud.
- A non-compete that stops Mizan selling "soiling analytics" at all, including its own engine.
- No change-of-control clause; the partner is acquired by a large asset-management software company and the price doubles at renewal.
- Revenue share below break-even at realistic Kuwaiti volumes.`,
        },
        {
          kind: "ask",
          title: "Ask in the first commercial conversation",
          items: [
            "Which Middle East plants do you serve today, and do you have or plan direct sales in Kuwait?",
            "Where is customer data hosted and processed, and can you run in-country if a government buyer requires it?",
            "Do you train your models on customer data, and on what terms?",
            "How have you validated your soiling estimates against measured soiling ratio, and would you accept an independent benchmark?",
            "What partner structures do you offer (resale, white-label, API), with what shares or wholesale prices?",
            "What happens to deployed customers if you are acquired or stop operating?",
          ],
        },
        { kind: "scenario", scenario: "mz12-s3" },
        {
          kind: "question",
          question: {
            id: "mz12-l04-p2",
            type: "short",
            prompt: md`Write a one-page negotiating brief for a first commercial conversation with an analytics vendor such as SwishOS. Include your goal, walk-away points, the terms you will propose, what you will offer, and three questions. Do not invent facts about the vendor or about any agreement.`,
            explanation: md`The brief should be honest about Mizan's own engine, protect the customer contract, data export, migration and KISR validation, and set a commercial floor from the break-even share.`,
            rubric: [
              "States a clear goal (for example a hybrid path) and is honest about Mizan's intention to build its own engine",
              "Protects the control points: customer contract, data export, migration rights, KISR validation and publication",
              "Covers data rights (ownership, training, residency) and IP on joint work",
              "Proposes commercial terms above a computed break-even share or an alternative structure, with illustrative numbers",
              "Includes change-of-control, continuity and non-solicit terms",
              "Uses only facts from the research brief about the vendor and labels everything else as an assumption or question",
            ],
            modelAnswer: md`**Goal.** A 24-month white-label or resale partnership that gets soiling analytics onto Kuwaiti plants while Mizan builds and validates its own engine with KISR, with a fair, pre-agreed migration. **What we know (research brief).** SwishOS infers soiling and optimises cleaning from existing plant data without hardware, prices on a sliding scale by capacity, has early North American and Middle East customers (Renko Energy, 12 sites in Turkey, named), and raised USD 1.5 m pre-seed in November 2025. Everything else is a question. **Walk-away points.** (1) Mizan does not hold the customer contract. (2) No continuous export of inputs and outputs. (3) Any restriction on Mizan's own engine or on KISR publications. (4) Training on Kuwaiti plant data without owner and Mizan consent. (5) Net share below break-even. **Proposed terms.** Mizan contracts with customers; partner supplies Mizan. White-label UI or API with Mizan first-line support. Wholesale price per MW per year or revenue share of at least 45 % (illustrative: break-even 31 % at 300 MW, USD 1,500 per MW, USD 200 local cost, USD 80k fixed). Minimum term 24 months per site, then migration at renewal with a fixed transition fee equal to 3 months' fees. Data owned by the plant owner; partner processes only for the service; no model training on Kuwaiti data without written consent; in-country hosting if the buyer requires it. KISR validation and publications belong to Mizan and KISR; benchmarking permitted. Joint Kuwait module: Mizan owns Kuwait-specific models, partner owns generic engine improvements. Change of control: Mizan may terminate with 6 months' transition support. Continuity: 12-month wind-down licence if the partner ceases operating. Mutual non-solicit of customers introduced by the other for 24 months. **What we offer.** Kuwaiti market access and procurement handling, Arabic support, integration with plant SCADA, a guaranteed minimum term per site, and an open conversation about cooperation outside Kuwait. Not offered: introductions to KISR or access to any Kuwaiti dataset before terms are signed. **Questions.** (1) Do you have or plan direct sales in Kuwait? (2) Where is data hosted, and can you run in-country? (3) How have you validated against measured soiling ratio, and will you accept an independent benchmark?`,
            concepts: ["mz12.overlap-analysis", "mz12.data-rights-triangle", "mz12.revenue-share", "mz12.partner-exit", "mz12.white-label"],
            difficulty: 3,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz12-l04-q1",
      type: "mcq",
      prompt: md`What does the research brief report about SwishOS?`,
      options: [
        "A sensor company selling soiling stations",
        "AI soiling modelling and cleaning-schedule optimisation from existing plant data, priced on a sliding scale by plant capacity, after a USD 1.5 m pre-seed in November 2025",
        "A signed partner of Mizan in Kuwait",
        "A tracker vendor with a dust-stow mode",
      ],
      answer: 1,
      explanation: md`SwishOS needs no extra hardware. It was discussed with Mizan as a soiling analytics partner; nothing has been agreed.`,
      concepts: ["mz12.overlap-analysis"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz12-l04-q2",
      type: "multi",
      prompt: md`Which are Mizan's differentiators relative to SwishOS, based on public information?`,
      options: [
        "Validation with KISR, including the Shagaya cleaning-arm failure as a natural experiment",
        "Soiling inference from operational data",
        "Kuwait dust and soiling data (planned atlas)",
        "Stow and tracker control under dust",
        "Local presence, Arabic and public procurement",
      ],
      answer: [0, 2, 3, 4],
      explanation: md`Soiling inference from operational data is what both do: that is the overlap in the core.`,
      concepts: ["mz12.overlap-analysis"],
      difficulty: 2,
    },
    {
      id: "mz12-l04-q3",
      type: "numeric",
      prompt: md`Mizan keeps 40 % of USD 1,500 per MW per year, pays USD 200 per MW in local cost and has USD 80,000 fixed cost. What is the annual net at 500 MW (USD)?`,
      answer: 120000,
      tolerance: { abs: 10 },
      unit: "USD",
      explanation: md`$(0.40 \times 1{,}500 - 200) \times 500 - 80{,}000 = 400 \times 500 - 80{,}000 = $ USD 120,000.`,
      concepts: ["mz12.revenue-share"],
      difficulty: 1,
    },
    {
      id: "mz12-l04-q4",
      type: "mcq",
      prompt: md`In the data-rights triangle, who owns plant SCADA and cleaning data by default?`,
      options: ["The analytics vendor", "Mizan", "The plant owner", "Whoever hosts it"],
      answer: 2,
      explanation: md`The owner owns plant data and licenses it to service providers. Training, residency and onward transfer need explicit permission.`,
      concepts: ["mz12.data-rights-triangle"],
      difficulty: 1,
    },
    {
      id: "mz12-l04-q5",
      type: "multi",
      prompt: md`Which clauses protect Mizan if the analytics partner is acquired or fails?`,
      options: [
        "Termination right on change of control with transition support",
        "Continuity licence or escrow with a wind-down period",
        "Continuous export of inputs and outputs in open formats",
        "A broad non-compete binding Mizan",
        "Non-solicitation of customers Mizan introduced",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`A non-compete binding Mizan protects the partner, not Mizan. The others keep customers whole through a change.`,
      concepts: ["mz12.partner-exit"],
      difficulty: 2,
    },
    {
      id: "mz12-l04-q6",
      type: "decision",
      prompt: md`Before any agreement, the vendor asks for an introduction to the KISR researchers "to align on methodology". What do you do?`,
      options: [
        { text: "Make the introduction to show goodwill.", score: 0.1, feedback: "The KISR relationship is Mizan's most valuable asset; giving it before terms can turn the methodology partnership into theirs." },
        { text: "Decline for now; offer it as part of a signed agreement that sets out validation ownership, publication rights and benchmarking.", score: 1, feedback: "Right: trade the introduction for the terms that protect it." },
        { text: "Introduce them but ask KISR not to share anything.", score: 0.3, feedback: "You lose control of the relationship and put KISR in an awkward position." },
      ],
      explanation: md`Access to KISR and Kuwaiti data are what Mizan brings. They belong in the agreement, not before it.`,
      concepts: ["mz12.data-rights-triangle", "mz12.overlap-analysis"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz12-l04-f1", front: "SwishOS in one line", back: "Swish Solar (Waterloo): AI soiling modelling and cleaning-schedule optimisation from existing plant data, priced by capacity; USD 1.5 m pre-seed (Nov 2025). Discussed with Mizan; nothing agreed.", concepts: ["mz12.overlap-analysis"] },
    { id: "mz12-l04-f2", front: "Where SwishOS overlaps Mizan", back: "In the core: soiling inference and cleaning schedules. Mizan's ground: KISR validation, Kuwait dust data, stow control, local access.", concepts: ["mz12.overlap-analysis"] },
    { id: "mz12-l04-f3", front: "Break-even revenue share", back: md`$s^* = (F_p/Q + c_l)/P$`, concepts: ["mz12.revenue-share"] },
    { id: "mz12-l04-f4", front: "Data-rights triangle", back: "Owner owns; vendor processes for the service only; training, residency and transfer need consent; Mizan always gets inputs and outputs in open formats.", concepts: ["mz12.data-rights-triangle"] },
    { id: "mz12-l04-f5", front: "Exit protections", back: "Change-of-control termination, transition assistance, data export, continuity licence or escrow, non-solicit of introduced customers.", concepts: ["mz12.partner-exit"] },
    { id: "mz12-l04-f6", front: "White-label trade-off", back: "Gains brand, contract and speed; leaves roadmap, model and often data pipeline with the partner. Needs exit terms.", concepts: ["mz12.white-label"] },
  ],
  scenarios: [
    {
      id: "mz12-s3",
      title: "The analytics vendor wants your Kuwait data",
      context: md`Hypothetical and illustrative, not a record of any real conversation. An analytics vendor whose product overlaps Mizan's core proposes: Mizan resells its platform in Kuwait for 30 % of revenue; in exchange for "better results", Mizan shares the Kuwaiti plant data it collects so the vendor can train a Gulf soiling model; the vendor will "co-author" any validation paper.`,
      start: "a",
      concepts: ["mz12.data-rights-triangle", "mz12.revenue-share", "mz12.overlap-analysis"],
      nodes: {
        a: {
          md: md`Which part of the offer do you address first?`,
          choices: [
            { text: "The 30 % share: push it to 45 %.", next: "b", score: 4, feedback: "The share matters, but the data and validation terms decide whether Mizan has a business in two years." },
            { text: "The data and the paper: Mizan does not own plant data, so it cannot grant training rights; any training needs owner consent and Mizan's agreement; validation and publication belong to Mizan and KISR. Then the share.", next: "c", score: 9, feedback: "Right order: control points first, money second." },
            { text: "Accept everything to get started.", next: "b", score: 0, feedback: "You would hand a competitor Kuwaiti training data and the credibility of a validation paper." },
          ],
        },
        b: {
          md: md`The vendor agrees to 40 % but insists on training rights and co-authorship. What now?`,
          choices: [
            { text: "Walk away from the training and co-authorship points; offer a benchmark instead, where their outputs are compared with measured soiling ratio and Mizan's engine.", score: 7, feedback: "Recovers the key points, though starting from the share gave them a concession for nothing." },
            { text: "Agree: 40 % is good.", score: 1, feedback: "The share is now above break-even, but the core is given away." },
          ],
        },
        c: {
          md: md`The vendor replies that without Gulf training data their model will underperform in Kuwait. How do you respond?`,
          choices: [
            { text: "Propose that each owner can opt in to aggregated, de-identified training under a separate licence, with a fee or price reduction to the owner and a right for Mizan to use the resulting Kuwait model outputs; KISR validation stays independent.", score: 10, feedback: "Lawful, owner-led, and shares value without surrendering the validation." },
            { text: "Let them train on the data but keep it confidential.", score: 2, feedback: "Mizan cannot grant rights it does not have, and confidentiality does not undo the transfer of value." },
          ],
        },
      },
    },
  ],
};

export default lesson;
