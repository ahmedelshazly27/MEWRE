import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh07-l02",
  title: "Revenue models of community companies: what each stream sells and who has made it work",
  summary:
    "The seven ways builder communities make money (sponsorship, events and tickets, membership, job board and recruiting fees, programmes, media, grants), what the payer is actually buying in each, how sponsorship tiers are priced, and what {Tech: Europe}, MLH, On Deck, Indie Hackers and the Linux Foundation show about which models last.",
  minutes: 75,
  objectives: [
    "Name the seven revenue streams of a community company and state what the payer buys in each",
    "Price a three-tier hackathon sponsorship using the 25 % top-tier rule and published tier benchmarks",
    "Compute a sponsor's cost per activated developer and a recruiting success fee",
    "Describe the {Tech: Europe}, MLH, On Deck, Indie Hackers and Linux Foundation models with their dates, and separate published facts from inference",
    "Write a Suhail revenue menu that lists what is for sale and what is never for sale",
  ],
  concepts: [
    { id: "sh07.revenue-streams", name: "Community revenue streams", description: "Sponsorship, events and tickets, membership, job board and recruiting fees, programmes, media, grants. Each sells something different: attention, access, hires, credentials, or public good.", competency: "sh-org", related: ["sh07.legal-forms"] },
    { id: "sh07.sponsorship-model", name: "Sponsorship as a product", description: "A sponsor buys measurable outcomes (activated developers, candidates, content reach) packaged into a few tiers; cash and in-kind (credits, venue) are priced separately and the top tier is capped at a quarter of the budget.", competency: "sh-org", related: ["sh07.revenue-streams", "sh02.sponsor-outcome-metrics"] },
    { id: "sh07.talent-revenue", name: "Talent revenue", description: "Money from employers for access to builders: job posts, sponsored roles in the newsletter, hiring-partner packages and success fees on hires. High value per deal, slow and lumpy, often licensed.", competency: "sh-org", related: ["sh07.revenue-streams"] },
    { id: "sh07.restricted-funding", name: "Restricted versus unrestricted money", description: "Grants and some sponsorships may only be spent on a named project; unrestricted money (earned revenue, general support) pays for the organisation itself.", competency: "sh-org", related: ["fc07.non-dilutive"] },
    { id: "sh07.community-case-studies", name: "Community-company case studies", description: "{Tech: Europe} (free sponsored hackathons, inferred sponsorship and hiring revenue), MLH (public benefit corporation funded by sponsors), On Deck (VC-funded, cut back in 2022), Indie Hackers (sold to Stripe in 2017, bought back 2023), Linux Foundation (501(c)(6) on memberships and events).", competency: "sh-org", related: ["sh02.community-hackathon-model"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Seven streams and what each one sells",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Suhail's plan is hackathons, a newsletter, a conference, a podcast and builder-to-investor and employer connections, run by unpaid leads until there is revenue. Each of those can be a revenue stream or a cost centre depending on what you sell. If you cannot say what a sponsor is buying in numbers, every renewal becomes a favour, and the leads stay unpaid.`,
        },
        {
          kind: "md",
          md: md`### The catalogue

| Stream | Who pays | What they actually buy | Price basis | Cash timing | Typical margin | Independence risk |
|---|---|---|---|---|---|---|
| **Sponsorship** (hackathons, meetups) | DevRel, cloud, AI-tool and hiring budgets | Developers using their product, hiring signal, brand with builders | Tiers per event or annual package | Before the event, if you insist | Medium (fulfilment, prizes, venue) | Medium: wants talks, judging seats, data |
| **Events and tickets** (Suhail Season) | Attendees, exhibitors, sponsors | Learning, meetings, deal flow | Ticket price times attendance, booth fees | Early-bird cash before costs | Low to medium; venue and production are large fixed costs | Low from tickets, medium from sponsors |
| **Membership** | Individuals or companies | Belonging, perks, a credential, access | Monthly or annual fee | Recurring | High once built | Low (many small payers) |
| **Job board and recruiting** | Employers | Candidates and hires | Per post, per package, or success fee on first-year salary | Per post immediately; success fees months later | High for posts | Medium: employers may want preferential access |
| **Programmes** (fellowships, accelerators, bootcamps) | Participants, sponsors, governments | Structured progress, a network, sometimes capital | Per cohort, or equity | Per cohort | Medium | Depends on funder |
| **Media** (newsletter, podcast) | Advertisers and sponsors | Attention of a defined audience | Per placement, per thousand opens or listens (CPM) | Per issue or episode | High once the audience exists | High if sponsors touch editorial |
| **Grants and donations** | Foundations, governments, companies' social budgets | Public good: open research, datasets, education | Per project budget | In tranches against milestones | Low unrestricted margin | Medium: deliverables and reporting set the agenda |

Read the last column carefully. The streams with the most money per deal (an anchor sponsor, a government programme, a large grant) are also the ones most able to steer the organisation. The streams with the least independence risk (membership, tickets, job posts) are small per payer and slow to build.`,
        },
        {
          kind: "md",
          md: md`### Sponsorship mechanics

A hackathon sponsor is usually a **developer relations** budget (wants people to use its API or tool), a **recruiting** budget (wants candidates), or a **brand** budget (wants to be seen by builders). Sell to the first two with numbers; the third is the first to be cut.

**Tiers.** MLH's organiser guide recommends **three tiers** with the top tier at **no more than 25 % of the event budget**, so losing one sponsor does not cancel the event.`,
        },
        { kind: "equation", formula: "sh07-tier-cap" },
        {
          kind: "chart",
          chart: "bar",
          title: "Published hackathon sponsorship tiers (USD)",
          xKey: "event",
          xLabel: "Event or benchmark",
          yLabel: "USD per sponsor",
          series: [
            { key: "entry", label: "Entry tier" },
            { key: "top", label: "Top tier" },
          ],
          data: [
            { event: "HackPrinceton S25", entry: 1000, top: 7500 },
            { event: "AAAI Hackathon 2025", entry: 2500, top: 10000 },
            { event: "Builderbase rule, 30 to 50 people", entry: 1000, top: 5000 },
          ],
          caption: "Sources: HackPrinceton S25 prospectus (Bronze USD 1k to Platinum 7.5k), AAAI Hackathon 2025 (Bronze 2.5k to Gold 10k, Gold includes a talk, a judging seat and access to submissions), Builderbase playbook (small events: Gold from about 1k, Platinum up to about 5k). University and conference hackathons; Gulf prices are not published and may differ.",
        },
        {
          kind: "md",
          md: md`**In-kind sponsorship** (API credits, GPU hours, venue, food) is valuable to participants but does not pay leads or the accountant. Record it at a fair value for reporting, but budget only on cash.

**What the sponsor measures.** The best single number is cost per activated developer:`,
        },
        { kind: "equation", formula: "sh07-cost-per-activation" },
        {
          kind: "md",
          md: md`### Talent revenue

Builder communities sit on the scarcest input in tech: engineers who ship. Employers pay for access in four forms, in rising value and rising complexity: **job posts** (flat fee per role), **sponsored roles** in the newsletter, **hiring-partner packages** (posts plus a talk plus a curated shortlist), and **success fees** on hires.`,
        },
        { kind: "equation", formula: "sh07-placement-fee" },
        {
          kind: "md",
          md: md`Success fees look attractive (one hire can equal a whole hackathon sponsorship) but they are slow, need a candidate pipeline and a guarantee period, and turn a community into an agency in members' eyes if pushed too hard. Agency fees of 15 to 25 % of first-year salary are common in contingent recruiting; treat that range as a market norm, not a Gulf-specific fact.

### Media

Newsletter and podcast sponsorship is usually priced per placement or per thousand opens or listens (CPM). The arithmetic is sobering for a young audience: 8,000 subscribers with a 45 % open rate give 3,600 opens; at an illustrative USD 40 CPM that is $3.6 \times 40 =$ USD 144 per issue. Media becomes a real stream only with a large or very targeted audience; early on it is better used as a bundle item inside hackathon and hiring packages.

### Case studies, with dates

| Organisation | Structure and model | Dates and facts | What it teaches Suhail |
|---|---|---|---|
| **{Tech: Europe}** (Berlin) | Calls itself Europe's builder community; grew out of {Tech: Berlin}; 2 to 3 AI hackathons a month, a conference, a newsletter; Luma and Discord for distribution | {Tech: Berlin} newsletter and hackathons 2023 to 2024; hackathons free and approval-gated (e.g. 90-person cap); sponsors fund prizes (Peec AI put up EUR 10k; Big Berlin Hack: 300+ builders, EUR 50k+ prizes, co-hosted with CODE University); a careers board exists; no funding round found | Frequent free hackathons as the top of the funnel; money most likely from sponsors and hiring. **The revenue model is inferred, not published.** |
| **MLH** (Major League Hacking) | Public benefit corporation; revenue mainly from corporate sponsors of its hackathon league and programmes (e.g. Meta sponsored the MLH Fellowship) | 80k+ developers a year across 200+ events; no public rate card; revenue said to be under USD 5 m (unverified) | Sponsorship at scale works when you aggregate many events into one sponsor product |
| **On Deck** | Venture-funded community company; ODX accelerator paid USD 125k for 7 % | ODX wound down and staff cut in 2022 (TechCrunch, 4 August 2022); now a paid, non-dilutive fellowship (ODF28 listed for Q3 2026) | Venture money pushed growth faster than the model could sustain; the paid cohort survived |
| **Indie Hackers** | Founder community with content and a forum | Acquired by Stripe in April 2017 at about USD 8k per month of revenue; bought back by Courtland and Channing Allen in 2023, Stripe remains an investor | A community can be an asset a strategic buyer values for reach, not revenue |
| **Linux Foundation** | US 501(c)(6) nonprofit (business league) | Funded by corporate memberships, events and training | A nonprofit can run large commercial-looking events when its members are companies |`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "What is inferred, not published",
          md: md`How {Tech: Europe} makes money is inferred from visible signals (sponsors, a conference, a careers board, newsletter issues titled like job posts); no revenue figures or funding round were found. MLH's revenue figure comes from a data aggregator. Founders, Inc. (up to USD 250k at pre-seed for roughly 4 to 7 %) and Antler terms come from secondary sources. Do not quote any of these as facts in a sponsor or investor conversation without checking.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Pricing a hackathon's sponsorship stack",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Three tiers for a 120-person Suhail hackathon (illustrative)",
          given: md`Illustrative budget for a two-day, 120-participant hackathon in Dubai: $B =$ USD 30,000 (venue 8k, food 7k, prizes 9k, production and swag 3k, contingency 3k). One technology partner gives API credits in kind. Target: cover the cash budget from three tiers.`,
          steps: [
            { md: md`Top-tier cap: $P_{\text{top}} \le 0.25 \times 30{,}000 =$ **USD 7,500**. Gold at USD 7,500, one slot.` },
            { md: md`Silver at USD 4,000, two slots: USD 8,000. Bronze at USD 2,000, three slots: USD 6,000.` },
            { md: md`Cash if all six slots sell: $7{,}500 + 8{,}000 + 6{,}000 =$ USD 21,500, which is 72 % of the budget.` },
            { md: md`Gap: $30{,}000 - 21{,}500 =$ USD 8,500. Options: a venue partner in kind (removes 8k of cost), smaller prizes, or a fourth revenue line (hiring-partner add-on). Do not close it by raising Gold to USD 16,000: one sponsor would then hold more than half the event.` },
            { md: md`Cost per participant: $30{,}000/120 =$ USD 250. A useful sanity check against what sponsors pay per developer at conference booths.` },
          ],
          result: md`The tier structure covers about 72 % of cash cost; the event is viable only with an in-kind venue or a smaller prize pool. That is normal for first events, and it is why Suhail's first hackathons should be budgeted from the sponsor stack backwards, not from the dream venue forwards.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: what Gold costs per activated developer",
          given: md`Same event. After the hackathon, 40 % of the 120 participants used the Gold sponsor's API in their project.`,
          steps: [
            {
              md: md`Activated developers $aN = 0.4 \times 120$.`,
              hidden: true,
              check: { prompt: "Activated developers", answer: 48, unit: "developers", tolerance: { abs: 0 } },
            },
            {
              md: md`Cost per activated developer $c_a = P_s/(aN) = 7{,}500/48$.`,
              hidden: true,
              check: { prompt: "Cost per activated developer", answer: 156.25, unit: "USD", tolerance: { rel: 0.01 } },
            },
          ],
          result: md`About USD 156 per developer who actually built with the product, plus the hiring signal and content. That is the line in the post-event report that wins the renewal.`,
        },
        {
          kind: "question",
          question: {
            id: "sh07-l02-p1",
            type: "numeric",
            prompt: md`Illustrative: an employer hires a Suhail member at AED 300,000 first-year salary under a 15 % success fee. What is the fee in USD at the peg of AED 3.6725 per USD? (USD, nearest 10)`,
            answer: 12253,
            tolerance: { abs: 20 },
            unit: "USD",
            explanation: md`Fee $= 0.15 \times 300{,}000 =$ AED 45,000; $45{,}000/3.6725 \approx$ USD 12,250. One hire equals more than a Gold tier at a 120-person hackathon, which is why talent revenue is attractive, and why it needs a licence check and member trust.`,
            concepts: ["sh07.talent-revenue"],
            difficulty: 1,
          },
        },
        {
          kind: "xref",
          to: "sh02-l01",
          note: "The hackathon module explains the three-sided exchange and the {Tech: Europe} and MLH formats in operational detail; this lesson treats them only as revenue models.",
        },
      ],
    },
    {
      layer: "field",
      title: "Selling streams without selling the community",
      blocks: [
        {
          kind: "md",
          md: md`### Who does it and with what

- **Partnerships lead**: owns the prospectus, the sponsor pipeline and the post-event report. Tools: a one-page prospectus per event type, a CRM (even a spreadsheet), Luma registration data for reporting, a sponsor agreement template.
- **Finance lead**: invoices before the event, tracks cash versus in-kind, separates restricted grant money.
- **Editorial lead**: owns the rule that sponsors never buy editorial content, judging or member data.

### Documents

1. **Prospectus**: audience (who comes, with evidence), three tiers with deliverables, add-ons, dates, payment terms.
2. **Sponsor agreement**: deliverables, payment before the event, cancellation and force majeure, logo use, data handling (no participant data without explicit consent), code of conduct.
3. **Post-event report** within two weeks: registrations, attendance, projects, activation of the sponsor's product, candidates who opted in, content reach, photos.
4. **Rate card** for the job board and newsletter.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`**Selling participant data**: handing CV dumps to sponsors without consent destroys trust and may breach data-protection law; use opt-in candidate lists. **Pay-to-judge**: a sponsor that funds the prize and also judges it invites accusations of a rigged result; keep a majority of independent judges. **Too many tiers**: seven tiers create seven negotiations. **Counting in-kind as revenue**: credits do not pay the venue. **Invoicing after the event**: the sponsor's budget year ends and payment slips by a quarter.`,
        },
        {
          kind: "checklist",
          title: "Before you publish a prospectus",
          items: [
            "Three tiers, top tier at most 25 % of the event budget",
            "Each tier lists outcomes (activation, candidates, content) not only logo sizes",
            "Payment due before the event date, in a currency your entity can invoice",
            "A written list of what is never for sale: judging majority, editorial content, member data without consent",
            "A post-event report template agreed before the event",
          ],
        },
        {
          kind: "question",
          question: {
            id: "sh07-l02-p2",
            type: "short",
            prompt: md`**Write Suhail's 2027 revenue menu.** For at least five streams give: the buyer (budget owner), what they get (deliverables and the metric you will report), the price basis and an illustrative price, payment timing, and the independence safeguard for that stream. End with a short "never for sale" list. All prices illustrative.`,
            rubric: [
              "Covers at least five distinct streams, including sponsorship and talent revenue",
              "Names a budget owner per stream (DevRel, recruiting, brand, grant programme) and a reportable metric",
              "Prices are internally consistent (top hackathon tier at most 25 % of an event budget; media priced realistically for a new audience)",
              "States payment timing and treats in-kind separately from cash",
              "Gives a concrete safeguard per stream and a never-for-sale list covering judging, editorial and member data",
              "No invented sponsors, members or traction; all numbers labelled illustrative",
            ],
            modelAnswer: md`Illustrative 2027 menu:

| Stream | Buyer | Deliverables and reported metric | Price basis (illustrative) | Timing | Safeguard |
|---|---|---|---|---|---|
| Hackathon tiers | DevRel and cloud budgets | API challenge, workshop slot, logo; report: participants, projects using the API, cost per activated developer | Gold USD 7.5k, Silver 4k, Bronze 2k for a 120-person event (budget USD 30k) | 100 % before the event | Independent judging majority; no participant data without opt-in |
| Hiring-partner package | Recruiting budgets | 3 job posts, a talk, opt-in candidate shortlist; report: applicants, interviews | USD 3k per quarter | Quarterly in advance | Members choose to opt in; no exclusivity |
| Job board | Employers | 30-day post in the board and newsletter; report: views, applications | USD 250 per post | On posting | Clear labels; no ranking for pay |
| Suhail Season conference | Sponsors and attendees | Booth or talk slot; tickets; report: attendance by role | Booth USD 10k; ticket USD 150 with free builder tickets | Early-bird and sponsor deposits 90 days before | Programme committee picks talks; sponsored talks labelled |
| Newsletter and Majlis podcast | Brand and DevRel | Placement in issue or episode; report: opens, listens | Bundled into tiers until the audience is large; then CPM | Per issue | Sponsors never edit content |
| Research grants | Grant programmes, compute donors | Open datasets and benchmarks; report: releases, downloads | Per project budget with an indirect-cost line | Tranches | Research agenda set by the research board, published |

Never for sale: the judging majority, editorial content and interviews, member data without explicit opt-in, the research agenda, and exclusivity over the whole community.`,
            explanation: md`A menu forces you to name the buyer and metric for each stream, which is what makes renewals routine, and the never-for-sale list is the independence policy in its most practical form.`,
            concepts: ["sh07.revenue-streams", "sh07.sponsorship-model", "sh07.talent-revenue"],
            difficulty: 2,
          },
        },
        {
          kind: "xref",
          to: "fc05-l04",
          note: "Founder Core's events and PR lesson covers event marketing for a company; here the event is the product.",
        },
        { kind: "sources", refs: ["sh07-r13", "sh07-r14", "sh07-r15", "sh07-r16", "sh07-r17", "sh07-r18", "sh07-r19", "sh07-r3", "sh07-r23", "sh07-r24", "sh07-r25", "sh07-r26"] },
      ],
    },
  ],
  quiz: [
    {
      id: "sh07-l02-q1",
      type: "numeric",
      prompt: md`An event budget is USD 44,000. Under the MLH guidance, what is the maximum price of the top tier? (USD)`,
      answer: 11000,
      tolerance: { abs: 1 },
      unit: "USD",
      explanation: md`$0.25 \times 44{,}000 =$ USD 11,000.`,
      concepts: ["sh07.sponsorship-model"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh07-l02-q2",
      type: "mcq",
      prompt: "Which statement about {Tech: Europe}'s revenue model is accurate?",
      options: [
        "It publishes audited revenue showing most income from tickets",
        "It raised a seed round to fund free hackathons",
        "Its model is inferred from visible sponsorship, a conference and a careers board; no revenue figures or funding round were found",
        "It charges participants a fee for every hackathon",
      ],
      answer: 2,
      explanation: md`Hackathons are free and approval-gated; sponsors fund prizes and partners give credits. Revenue is inferred, so treat it as a hypothesis.`,
      concepts: ["sh07.community-case-studies"],
      difficulty: 1,
    },
    {
      id: "sh07-l02-q3",
      type: "multi",
      prompt: "Which streams carry the highest risk to Suhail's editorial and judging independence?",
      options: [
        "An anchor sponsor paying for most of a hackathon",
        "Many small job posts",
        "Newsletter sponsorship where the sponsor asks to review the issue",
        "Builder ticket sales",
        "A single large grant that defines deliverables",
      ],
      answer: [0, 2, 4],
      explanation: md`Large single payers and anyone touching editorial content can steer the organisation. Many small payers (posts, tickets) have little individual leverage.`,
      concepts: ["sh07.revenue-streams", "sh07.restricted-funding"],
      difficulty: 2,
    },
    {
      id: "sh07-l02-q4",
      type: "numeric",
      prompt: md`A sponsor pays USD 6,000; 150 participants attend and 30 % use its tool. Cost per activated developer? (USD, 1 decimal)`,
      answer: 133.3,
      tolerance: { abs: 0.2 },
      unit: "USD",
      explanation: md`$aN = 0.3 \times 150 = 45$; $c_a = 6{,}000/45 = 133.3$ USD.`,
      concepts: ["sh07.sponsorship-model"],
      difficulty: 1,
    },
    {
      id: "sh07-l02-q5",
      type: "mcq",
      prompt: "What happened to On Deck's ODX accelerator?",
      options: [
        "It was acquired by Stripe in 2017",
        "It was wound down in 2022 amid layoffs, and the company shifted towards pre-seed investing and a paid fellowship",
        "It became a public benefit corporation",
        "It merged with MLH",
      ],
      answer: 1,
      explanation: md`TechCrunch reported the cuts on 4 August 2022. The paid, non-dilutive fellowship continued (ODF28 listed for Q3 2026). Stripe bought Indie Hackers, not On Deck.`,
      concepts: ["sh07.community-case-studies"],
      difficulty: 1,
    },
    {
      id: "sh07-l02-q6",
      type: "decision",
      prompt: md`A recruiting firm offers USD 20,000 for exclusive access to the CVs of everyone who registers for Suhail hackathons in 2027. What do you answer?`,
      options: [
        { text: "Accept: it would fund two events", score: 0, feedback: "Selling participant data without consent breaks trust, may breach data-protection law and turns the community into a lead list." },
        { text: "Offer a hiring-partner package with an opt-in candidate list, non-exclusive, priced per quarter", score: 1, feedback: "Keeps the revenue logic (access to builders) while members choose to be visible. Non-exclusivity keeps other employers and the community's neutrality." },
        { text: "Refuse all recruiting revenue", score: 0.3, feedback: "Protects trust but throws away the stream builders themselves often value (jobs)." },
        { text: "Accept but anonymise the CVs", score: 0.2, feedback: "Anonymised CVs are useless to a recruiter and the exclusivity problem remains." },
      ],
      explanation: md`Talent revenue works when members opt in and no single employer owns access.`,
      concepts: ["sh07.talent-revenue"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "sh07-l02-f1", front: "Seven community revenue streams", back: "Sponsorship, events and tickets, membership, job board and recruiting, programmes, media, grants and donations.", concepts: ["sh07.revenue-streams"] },
    { id: "sh07-l02-f2", front: "MLH tier guidance", back: "Three tiers; top tier at most 25 % of the event budget.", concepts: ["sh07.sponsorship-model"] },
    { id: "sh07-l02-f3", front: "Cost per activated developer", back: md`$c_a = P_s/(aN)$. USD 7.5k, 40 % of 120 participants: about USD 156.`, concepts: ["sh07.sponsorship-model"] },
    { id: "sh07-l02-f4", front: "Indie Hackers", back: "Acquired by Stripe in April 2017 at about USD 8k a month; bought back by its founders in 2023, Stripe still an investor.", concepts: ["sh07.community-case-studies"] },
    { id: "sh07-l02-f5", front: "MLH structure and money", back: "Public benefit corporation; mainly corporate sponsors of its hackathon league and programmes; 80k+ developers a year, 200+ events.", concepts: ["sh07.community-case-studies"] },
    { id: "sh07-l02-f6", front: "In-kind sponsorship rule", back: "Record at fair value for reporting, budget only on cash: credits do not pay the venue or the accountant.", concepts: ["sh07.sponsorship-model"] },
    { id: "sh07-l02-f7", front: "Restricted money", back: "May be spent only on the named project; unrestricted money pays for the organisation itself.", concepts: ["sh07.restricted-funding"] },
  ],
};

export default lesson;
