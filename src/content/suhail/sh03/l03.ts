import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh03-l03",
  title: "Sponsorship packages: tiers, what sponsors buy, value-based pricing and benefit cost",
  summary:
    "A sponsorship package is a product with a price, a cost of goods and a buyer who must justify it to their own boss. This lesson takes apart what Gulf sponsors actually buy from a builder community (hiring pipeline, developer adoption, brand, deal flow, ecosystem mandates), sets tier structure and concentration limits, prices tiers from the sponsor's own cost per outcome, and sorts benefits by what they are worth to the sponsor against what they cost you to deliver.",
  minutes: 70,
  objectives: [
    "Name the five reasons a company sponsors a builder event and the metric each sponsor's champion is judged on",
    "Design a three or four tier structure with an anchor tier and a concentration limit of 25 % of budget",
    "Price a tier from the sponsor's expected outcomes and alternative cost per outcome, and test the value-to-price ratio",
    "Sort benefits on a value-to-sponsor vs cost-to-deliver matrix and price category exclusivity from its opportunity cost",
    "Produce a sponsorship tier sheet for a Suhail event with benefits, prices, fulfilment cost and margin",
  ],
  concepts: [
    { id: "sh03.sponsor-motives", name: "What sponsors buy", description: "Hiring pipeline, developer adoption of a platform or API, brand among builders, deal flow (for investors) and ecosystem or national mandates (for government-linked bodies); each has a different internal owner and success metric.", competency: "sh-partnerships", related: ["sh03.value-based-sponsor-pricing"] },
    { id: "sh03.tier-design", name: "Tier design and concentration", description: "Three or four tiers with clear steps in benefits, an anchor tier that makes the middle tier look reasonable, limited slots per tier, and no single sponsor above about 25 % of the budget.", competency: "sh-partnerships", related: ["sh03.tier-contribution"] },
    { id: "sh03.value-based-sponsor-pricing", name: "Value-based sponsorship pricing", description: "Price set from the sponsor's expected outcomes (hires, activated developers, qualified leads) times its alternative cost per outcome, aiming for a value-to-price ratio of about 2 or more on measurable outcomes.", competency: "sh-partnerships", related: ["fc04.value-based-pricing", "fc05.cpql"] },
    { id: "sh03.benefit-cost-matrix", name: "Benefit value vs cost matrix", description: "Each benefit placed by value to the sponsor and cost to deliver: high-value, low-cost benefits (judging seats, named tracks, consented introductions) carry the tiers; low-value, high-cost benefits (generic booths, printed banners) are cut or charged as add-ons.", competency: "sh-partnerships", related: ["sh03.tier-contribution"] },
    { id: "sh03.exclusivity", name: "Category exclusivity", description: "A promise that no competitor of the sponsor will sponsor the same event; priced at least at the expected contribution of the competing sponsors it shuts out.", competency: "sh-partnerships", related: ["sh03.tier-design"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What is actually for sale",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Sponsorship is planned to be most of Suhail's early revenue, and the Partnerships lead will be selling a product that does not exist yet to companies that have never heard of Suhail. A package that lists "logo on website, booth, 5 passes" competes on price with every other event in the Gulf. A package that tells a head of talent how many qualified engineers she will meet, and what that costs her through recruiters, competes on value. The difference is the price you can charge and whether the sponsor renews.`,
        },
        {
          kind: "md",
          md: md`### Five reasons to sponsor a builder community

| Motive | Internal owner at the sponsor | What they are judged on | Benefits that serve it |
|---|---|---|---|
| **Hiring pipeline** | Head of talent, engineering managers | Qualified candidates, interviews, hires, cost per hire | Judging and mentoring seats, consented CV access, hiring lounge, job posts |
| **Developer adoption** | Developer relations, platform or cloud marketing | Sign-ups, activated developers (still using after 30 days), projects built on the API | Named challenge track, workshop slot, credits, technical mentors |
| **Brand among builders** | Marketing, employer brand | Reach, sentiment, content produced | Stage time, naming, newsletter and podcast mentions (labelled as sponsored) |
| **Deal flow** | Investors (VC funds, angel networks) | Founders met, companies entering their pipeline | Judging seats, demo-day access, office hours |
| **Ecosystem or national mandate** | Government-linked innovation bodies, universities, sovereign-linked companies | Participation numbers, nationals trained, startups formed, visibility of the programme | Co-branding, published impact report, programme naming |

The last row is specific to the Gulf. Much of the region's AI activity is state-linked (for example HUMAIN under PIF in Saudi Arabia, G42 and MBZUAI in Abu Dhabi, Qai under QIA in Qatar; research brief, November 2026), and bodies like these often fund ecosystem activity against national targets rather than a marketing funnel. They are candidate sponsor categories, not contacts: nothing here implies any conversation has taken place. They buy different evidence: counts of participants by nationality and gender, skills delivered, and published outcomes.

### Tier structure

Practitioner guidance converges on a few rules:

- **Three tiers, perhaps four.** MLH's organiser guide recommends three; more than four confuses buyers and you cannot differentiate benefits.
- **Limited slots per tier.** Scarcity is real only if you cap it (for example 2 Headline, 6 Gold, 10 Silver).
- **An anchor.** The top tier exists partly to make the middle tier look reasonable; most revenue usually comes from the middle.
- **Concentration limit.** MLH recommends the top tier be no more than 25 % of the budget, so a single sponsor's withdrawal cannot cancel the event.`,
        },
        { kind: "equation", formula: "sh03-concentration" },
        {
          kind: "md",
          md: md`### What other hackathons charge

Published prospectuses (research brief, November 2026) give the order of magnitude:

| Event | Tiers (USD unless stated) |
|---|---|
| HackPrinceton Spring 2025 | Bronze 1K, Silver 2.5K, Gold 5K, Platinum 7.5K |
| AAAI Hackathon 2025 | Bronze 2.5K, Silver 5K, Gold 10K (Gold includes a talk, a judging seat and access to submissions) |
| UNIHACK 2025 (AUD) | 1K, 2K, 4K+, 6K+, 10K+ |
| Builderbase rule of thumb | 30 to 50 participants: Platinum 2 to 5K, Gold 1 to 2K; 500+ participants: Gold 7.5 to 20K |

These are mostly student events in the US and Australia. They set a floor for comparison, not a Gulf price.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "No Gulf rate card found",
          md: md`The research brief found no published sponsorship rate card for a Gulf hackathon or builder conference. Any Gulf price in this module is illustrative. Your real price comes from discovery calls with sponsors about their alternative costs, and from what the first sponsors actually pay.`,
        },
        { kind: "sources", refs: ["sh03-r1", "sh03-r3", "sh03-r4", "sh03-r5"] },
        {
          kind: "md",
          md: md`### Price from the sponsor's outcomes

There are three anchors for a tier price: your **cost floor** (fulfilment plus a fair share of fixed costs), the **market** (comparable events), and the **value** to the sponsor. Charge from value and use the other two as sanity checks. Value is what the sponsor's champion will write in the internal justification:`,
        },
        { kind: "equation", formula: "sh03-sponsor-value" },
        { kind: "equation", formula: "sh03-cost-per-qualified-lead" },
        {
          kind: "md",
          md: md`The alternative costs $a_j$ belong to the sponsor: what a recruiter charges per hire, what paid social or a conference booth costs per qualified developer lead, what a developer-relations team spends per activated developer. Ask for them in discovery ("what does a hire like this usually cost you?"), and do not invent them. Aim for a value-to-price ratio $r \ge 2$ on outcomes the sponsor can measure; brand value is a bonus their champion cannot easily defend.

The Hackathon design and operations module computes cost per activated developer and cost per hire after an event; here the same arithmetic is used before the event, to set the price.

### Benefits: value to them, cost to you`,
        },
        {
          kind: "matrix",
          title: "Benefit value to the sponsor vs cost to deliver",
          xAxis: ["Low cost to deliver", "High cost to deliver"],
          yAxis: ["Low value to sponsor", "High value to sponsor"],
          cells: [
            { label: "Give freely, but they do not sell the tier", detail: "Logo on site and slides, social post, generic newsletter mention. Include in every tier; never the headline benefit." },
            { label: "Cut or charge as an add-on", detail: "Generic booth at a hotel venue, printed banners, swag with logos, extra passes nobody uses. Expensive and rarely tied to the sponsor's metric." },
            { label: "Build the tiers on these", detail: "Judging and mentor seats, a named challenge track, a workshop slot, consented introductions to opted-in builders, first look at projects, a short labelled podcast segment." },
            { label: "Reserve for top tiers and price fully", detail: "Keynote with production, hosted dinner, travel grants for builders, a produced video, exclusivity. Real value and real cost: cost them before you promise them." },
          ],
          caption: "Bottom-left is where sponsorship margin comes from. A tier sheet that is mostly bottom-left benefits can be both cheap to deliver and easy to justify.",
        },
        {
          kind: "md",
          md: md`### Exclusivity has an opportunity cost

"Category exclusive" (no competing model provider, bank or cloud) is one of the most requested and most underpriced benefits. Granting it shuts out every competitor who might have bought. Its minimum price is the expected contribution you forgo:

$$\text{premium}_{min} = \sum_{c \in \text{blocked}} p_c\, m_c$$

where $p_c$ is the probability that blocked prospect $c$ would have signed and $m_c$ its tier contribution. Exclusivity on a narrow category (one hiring lounge, one track) is far cheaper to give than exclusivity on a whole sector.`,
        },
        { kind: "xref", to: "fc04-l07", note: "Founder Core covers value-based pricing, packaging, anchoring and negotiation in general; this lesson applies them to sponsorship tiers." },
      ],
    },
    {
      layer: "applied",
      title: "Building the Suhail Season tier sheet",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Does Gold at USD 15,000 pass the value test?",
          given: md`Illustrative Suhail Season (Lesson 2): 600 attendees, total cost USD 281,750, sponsorship plan 2 Headline at 40,000, 6 Gold at 15,000, 10 Silver at 6,000. Fulfilment per sponsor: Headline 4,000, Gold 1,200, Silver 480 (total 20,000); contingency 15 %. Two Gold prospects. **Hiring sponsor H** (a regional software company): in discovery its head of talent says a mid-level engineer hire through a recruiter costs about 20 % of a USD 60,000 salary, and she would expect about 2 hires from a strong event. **Platform sponsor D** (an AI API provider): its developer-relations lead says a qualified developer lead from paid channels costs about USD 250, and expects 90 qualified, consented leads from a workshop and track.`,
          steps: [
            { md: md`**Tier margins:** Headline $40{,}000 - 4{,}000\times1.15 = 35{,}400$ (88.5 %); Gold $15{,}000 - 1{,}380 = 13{,}620$ (90.8 %); Silver $6{,}000 - 552 = 5{,}448$ (90.8 %). All healthy.` },
            { md: md`**Concentration:** $h = 40{,}000/281{,}750 = 14.2$ %, below the 25 % limit.` },
            { md: md`**Sponsor H:** $a_{hire} = 0.20\times60{,}000 = 12{,}000$. $V = 2\times12{,}000 = 24{,}000$, so $r = 24{,}000/15{,}000 = 1.6$. Below 2: the head of talent can defend it, but only just.` },
            { md: md`**Sponsor D:** $V = 90\times250 = 22{,}500$, $r = 1.5$; $\mathrm{CPQL}_s = 15{,}000/90 = 167$ USD per qualified lead, against 250 from paid channels.` },
            { md: md`**Fix with bottom-left benefits, not discounts.** For H: two judging seats at the conference's builder track and access to the consented CV book a month before the event raise expected hires to 3 (her estimate): $V = 36{,}000$, $r = 2.4$, at almost no cost. For D: a second workshop slot on day 2 and a named track prize raises expected leads to 130: $V = 32{,}500$, $r = 2.2$; the track prize (say USD 2,000) is the only added cost and is charged inside the tier.` },
          ],
          result: md`Gold at USD 15,000 passes for both sponsors once the benefits are matched to each sponsor's metric (illustrative numbers from the sponsors' own alternative costs). The same price works; the package does not. Build Gold as a menu: hiring version and platform version, with the same price and similar fulfilment cost.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: the presenting partner request",
          given: md`A large prospect offers USD 80,000 to be the sole "presenting partner" of the illustrative Suhail Season, replacing both Headline slots, and asks for exclusivity in its category (AI models and cloud). Total cost stays USD 281,750. Two Gold prospects in that category had an estimated 50 % chance each of signing; each Gold contributes USD 13,620.`,
          steps: [
            { md: md`Concentration with one presenting partner: $h = 80{,}000/281{,}750$.` },
            { md: md`$h = 28.4$ %, above the 25 % limit: if this one sponsor withdraws, the event loses more than a quarter of its funding.`, hidden: true, check: { prompt: "Concentration h (%)", answer: 28.4, tolerance: { abs: 0.1 }, unit: "%" } },
            { md: md`Minimum exclusivity premium: $2\times0.5\times13{,}620$.` },
            { md: md`$= 13{,}620$ USD. The offer is the same 80,000 as two Headline slots, so it includes no premium at all for exclusivity.`, hidden: true, check: { prompt: "Minimum exclusivity premium (USD)", answer: 13620, tolerance: { abs: 1 }, unit: "USD" } },
          ],
          result: md`Counter-offer: presenting partner at about USD 95,000 with exclusivity limited to the hiring lounge and one named track (not the whole category), and a payment schedule with at least half paid at signing, or keep two Headline slots. Either way, keep the cancellation clauses tied to the concentration risk.`,
        },
        {
          kind: "question",
          question: {
            id: "sh03-l03-p1",
            type: "numeric",
            prompt: md`An illustrative Silver sponsor pays USD 6,000 and expects 30 qualified, consented developer leads. Its alternative cost is USD 120 per qualified lead. What is the value-to-price ratio $r$?`,
            answer: 0.6,
            tolerance: { abs: 0.01 },
            explanation: md`$V = 30\times120 = 3{,}600$ USD; $r = 3{,}600/6{,}000 = 0.6$. The sponsor would pay more per lead than through its usual channel (USD 200 vs 120). Either the Silver tier needs a benefit that drives more qualified leads (a workshop, a track), or this is a brand purchase and must be sold as one.`,
            concepts: ["sh03.value-based-sponsor-pricing"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Packaging in practice",
      blocks: [
        {
          kind: "md",
          md: md`### What a tier sheet looks like

One page per event (or per season), with: the audience promise (who attends, how selected, expected numbers stated as ranges and labelled as estimates for a first event), three or four tiers with slots, price and benefits in plain words, the add-on menu (booth, dinner, travel grants, video), payment terms, and the reporting promise (what metrics the sponsor gets and when; Lesson 5).

### Consent is part of the product

The most valuable hiring and adoption benefits involve builders' personal data: CVs, emails, project repositories. Sell only what builders opted into at registration, in plain language, per purpose ("share my CV with hiring partners of this event"). Saudi Arabia's Personal Data Protection Law and the UAE's federal data protection law both regulate sharing personal data with third parties; read the current texts or get advice before promising any list.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Data protection specifics",
          md: md`The obligations for sharing attendee data with sponsors (consent form, cross-border transfer, retention) differ between Saudi Arabia (PDPL, SDAIA), the UAE and Kuwait, and implementing rules have changed since 2023. This module does not state them; confirm with counsel before the first event that shares any attendee data.`,
        },
        { kind: "sources", refs: ["sh03-r10"] },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Packaging mistakes",
          md: md`Benefits that cannot be measured ("brand exposure"); unlimited slots per tier; a top tier above 25 % of the budget; sector-wide exclusivity given away for free; booths at every tier; promising stage time to every sponsor (the builders leave); selling sponsored podcast or newsletter content without labelling it, which spends Suhail's editorial credibility; promising attendee lists without consent.`,
        },
        {
          kind: "ask",
          title: "Discovery questions that set the price",
          items: [
            "Who inside your company will judge whether this sponsorship worked, and on what number?",
            "What does a hire like this, or a qualified developer lead, usually cost you through your current channels?",
            "Which other events or programmes are you funding this year, and what did you get from the best one?",
            "What would make you renew for next year without a discussion?",
            "Which benefits do you never use at events?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "sh03-l03-p2",
            type: "short",
            prompt: md`Write the sponsorship tier sheet for one Suhail event (a hackathon or the Suhail Season) using labelled illustrative numbers. Include: (1) the audience promise as ranges, with how builders are selected; (2) three or four tiers with slots, prices and benefits, including at least one hiring version and one platform version of the same tier; (3) fulfilment cost and contribution margin per tier; (4) a value test for one tier using a sponsor alternative cost you would ask for in discovery; (5) the concentration check and your exclusivity policy; (6) the reporting promise and consent rules.`,
            rubric: [
              "Audience promise is stated as ranges with a selection method, and labelled as estimates for a first event",
              "Three or four tiers with capped slots, prices and benefits mapped to sponsor motives (hiring and platform variants present)",
              "Fulfilment cost and contribution margin computed for each tier; physical benefits priced as add-ons",
              "Value test uses V and r correctly with the alternative cost framed as a discovery input, and the tier is adjusted if r is below about 2",
              "Concentration below 25 % of budget and an exclusivity policy priced from opportunity cost",
              "Reporting metrics and data-consent rules are explicit; sponsored content is labelled",
            ],
            modelAnswer: md`**Event (illustrative):** Suhail Hack, 24 h, Kuwait City, 120 to 150 builders selected from applications (portfolio or GitHub, 40 % students cap), free.

**Tiers (USD):** Gold, 2 slots, 10,000: hiring version (2 mentor and judge seats, consented CV book two weeks before, 10-minute recruiting talk at dinner, job posts in the newsletter) or platform version (named challenge track with a USD 2,000 prize inside the price, 45-minute workshop, 3 technical mentors, credits for builders). Silver, 4 slots, 4,000: one mentor seat, logo, job post or credits. Community, 6 slots, 1,000: logo, newsletter mention, for startups. Add-ons: dinner hosting 2,000, travel grants 600 per builder.

**Fulfilment and margin (10 % contingency):** Gold 800, contribution 9,120 (91 %); Silver 300, 3,670 (92 %); Community 100, 890 (89 %).

**Value test (platform Gold):** in discovery I will ask its cost per qualified developer lead; if it is about USD 200 and we expect 60 consented qualified leads from the track and workshop, $V = 12{,}000$, $r = 1.2$, too low; adding a second workshop online in the week before raises expected leads to 100, $V = 20{,}000$, $r = 2.0$.

**Concentration:** largest sponsor 10,000 of a 24,090 budget = 41.5 %: too high for one event. I will sell Gold only as part of a two-event package or add a third Gold at 7,500 so no sponsor exceeds about 25 to 30 % (and state the risk to the Finance Lead).

**Exclusivity:** only within a track (one platform per track); category exclusivity priced at the expected contribution of the blocked prospects.

**Reporting and consent:** report within 14 days with registrations, approvals, show rate, teams, projects using the sponsor's API, consented leads, 30-day activation where the sponsor shares data. CVs and emails shared only with explicit per-purpose opt-in; sponsored newsletter items labelled "sponsored".`,
            explanation: md`The tier sheet is a product spec: who it is for, what it delivers, what it costs to deliver, and how success will be shown.`,
            concepts: ["sh03.tier-design", "sh03.value-based-sponsor-pricing", "sh03.benefit-cost-matrix", "sh03.exclusivity"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a sponsor's head of talent why your Gold package is priced at USD 15,000, without mentioning your costs.",
          keyPoints: [
            "Start from her outcome: qualified candidates met, interviews and hires",
            "Use her own alternative cost per hire (for example a recruiter fee) to value expected hires",
            "Show the value-to-price ratio and the benefits that drive hires (judging seats, early consented CV access)",
            "Separate measurable outcomes from brand value, which is a bonus",
            "Commit to the metrics you will report afterwards",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh03-l03-q1",
      type: "numeric",
      prompt: md`A Gold package costs USD 12,000. The sponsor expects 1.5 hires and its alternative cost per hire is USD 14,000. What is the value-to-price ratio?`,
      answer: 1.75,
      tolerance: { abs: 0.01 },
      explanation: md`$V = 1.5\times14{,}000 = 21{,}000$; $r = 21{,}000/12{,}000 = 1.75$.`,
      concepts: ["sh03.value-based-sponsor-pricing"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh03-l03-q2",
      type: "numeric",
      prompt: md`An event costs USD 120,000. What is the largest single sponsorship (USD) you should accept under the 25 % concentration rule?`,
      answer: 30000,
      tolerance: { abs: 1 },
      unit: "USD",
      explanation: md`$0.25\times120{,}000 = 30{,}000$ USD. Above that, one sponsor's withdrawal could cancel the event.`,
      concepts: ["sh03.tier-design"],
      difficulty: 1,
    },
    {
      id: "sh03-l03-q3",
      type: "mcq",
      prompt: "Which benefit belongs in the high-value, low-cost quadrant for a hiring sponsor?",
      options: ["A branded booth at a hotel venue", "Printed banners at the entrance", "Two mentor and judging seats with the builders", "Branded T-shirts for every attendee"],
      answer: 2,
      explanation: md`Mentoring and judging let engineers watch candidates work, the best hiring signal an event offers, at almost no cost to you.`,
      concepts: ["sh03.benefit-cost-matrix"],
      difficulty: 1,
    },
    {
      id: "sh03-l03-q4",
      type: "numeric",
      prompt: md`Category exclusivity would block three prospects, each with an estimated 40 % chance of buying a Silver tier contributing USD 5,000. What is the minimum exclusivity premium in USD?`,
      answer: 6000,
      tolerance: { abs: 1 },
      unit: "USD",
      explanation: md`$3\times0.4\times5{,}000 = 6{,}000$ USD of expected contribution forgone.`,
      concepts: ["sh03.exclusivity"],
      difficulty: 2,
    },
    {
      id: "sh03-l03-q5",
      type: "multi",
      prompt: "Which are typical internal owners of a builder-event sponsorship at the sponsor? (Select all that apply.)",
      options: ["Head of talent", "Developer relations lead", "Chief financial officer as the day-to-day owner", "Employer brand or marketing", "Investment team at a VC fund"],
      answer: [0, 1, 3, 4],
      explanation: md`Talent, developer relations, marketing and investors each own a motive. The CFO approves budgets but is rarely the owner who judges the outcome.`,
      concepts: ["sh03.sponsor-motives"],
      difficulty: 1,
    },
    {
      id: "sh03-l03-q6",
      type: "decision",
      prompt: md`A government-linked innovation body wants to sponsor a Suhail hackathon. Its contact asks for "the number of participants and their nationalities in a published report". How do you package it?`,
      options: [
        { text: "Sell the standard Gold platform package with an API track.", score: 0.3, feedback: "Its metric is not API adoption; the package does not serve its motive." },
        { text: "Build a programme-partner package: co-branding, a published impact report with consented aggregate demographics (participants, nationals, students, women), skills delivered and startups formed, priced from what similar programme outcomes cost the body.", score: 1, feedback: "Matches an ecosystem mandate with the evidence it needs, uses only aggregate consented data, and prices from its alternative." },
        { text: "Offer the attendee list with nationality fields so it can do its own analysis.", score: 0, feedback: "Personal data shared without purpose-specific consent; also unnecessary, since aggregates answer the question." },
      ],
      explanation: md`Match the package to the sponsor's motive and the evidence its internal owner needs.`,
      concepts: ["sh03.sponsor-motives", "sh03.value-based-sponsor-pricing"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "sh03-l03-f1", front: "Five sponsor motives", back: "Hiring pipeline, developer adoption, brand, deal flow, ecosystem or national mandate.", concepts: ["sh03.sponsor-motives"] },
    { id: "sh03-l03-f2", front: "Sponsor value and ratio", back: md`$V = \sum q_j a_j$, $r = V/P$; aim for $r \ge 2$ on measurable outcomes.`, concepts: ["sh03.value-based-sponsor-pricing"] },
    { id: "sh03-l03-f3", front: "Concentration rule", back: "No single sponsor above about 25 % of the event budget (MLH organiser guide).", concepts: ["sh03.tier-design"] },
    { id: "sh03-l03-f4", front: "Benefits that carry a tier", back: "High value, low cost: judging and mentor seats, named tracks, workshops, consented introductions, first look at projects.", concepts: ["sh03.benefit-cost-matrix"] },
    { id: "sh03-l03-f5", front: "Minimum exclusivity premium", back: md`$\sum p_c m_c$ over blocked prospects: the expected contribution you forgo.`, concepts: ["sh03.exclusivity"] },
    { id: "sh03-l03-f6", front: "Where alternative costs come from", back: "The sponsor's own numbers, asked in discovery, never your assumption.", concepts: ["sh03.value-based-sponsor-pricing"] },
  ],
};

export default lesson;
