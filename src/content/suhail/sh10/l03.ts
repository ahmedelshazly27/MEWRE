import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh10-l03",
  title: "The sponsorship package, target list and pipeline forecast",
  summary:
    "Design three sponsor tiers priced from what each sponsor type buys (developer adoption, candidates, deal flow, brand), write the prospectus and the contract terms that protect builders, build a scored target list sized from conversion rates, and forecast the pipeline by stage and date so you know weeks before the cash gate whether sponsorship will cover the budget.",
  minutes: 85,
  objectives: [
    "You can say what each sponsor type buys at a hackathon and price a tier from the cost per outcome it delivers.",
    "You can design three tiers that respect the concentration rule and cost what they promise to deliver.",
    "You can size a target list from stage conversion rates and score it for fit, budget and access.",
    "You can compute weighted pipeline and coverage and decide what to do when the forecast falls short of the budget.",
    "You can write the contract terms that matter: payment schedule, cancellation, data, IP, judging independence and exclusivity.",
  ],
  concepts: [
    {
      id: "sh10.sponsor-value",
      name: "What sponsors buy",
      description:
        "Developer adoption (builders using their API or tool), candidates (opted-in profiles and interviews), deal flow (early sight of teams) and brand with a specific audience. Price follows the outcome a sponsor can measure, expressed as cost per outcome.",
      competency: "sh-partnerships",
    },
    {
      id: "sh10.tier-design",
      name: "Tier design",
      description:
        "Three tiers, clearly different in what they deliver, with the top tier no more than about 25 % of the budget, a limited number of slots per tier and fulfilment costed for each. In-kind partners are listed separately.",
      competency: "sh-partnerships",
      related: ["sh10.sponsor-value"],
    },
    {
      id: "sh10.sponsor-target-list",
      name: "Sponsor target list",
      description:
        "Named organisations in a few segments, each scored for fit with the theme, budget owner known, and a warm path, sized backwards from the sponsors you need through stage conversion rates.",
      competency: "sh-partnerships",
    },
    {
      id: "sh10.sponsor-pipeline",
      name: "Sponsor pipeline forecast",
      description:
        "Deals by stage, each weighted by its stage probability and dated against the cash gate. Weighted pipeline must cover the sponsor revenue in the budget, and unweighted coverage of about 3 to 4 times the target is a healthy early-stage rule of thumb.",
      competency: "sh-partnerships",
    },
    {
      id: "sh10.sponsor-contract",
      name: "Sponsor contract terms",
      description:
        "Deliverables per tier, payment schedule, cancellation and refund rules, opt-in only data sharing, builders keep their IP, independent judging, scope of any category exclusivity and logo use.",
      competency: "sh-partnerships",
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Pricing from outcomes and forecasting the pipeline",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`In the committed plan, nine sponsors pay for everything. You own Partnerships with your Partnerships lead, and the first sponsors are buying a promise from an organisation with no track record. A prospectus that prices from what the sponsor gets, contract terms that protect builders, and a pipeline you can read honestly every week are what separates a funded event from a cancelled one.`,
        },
        {
          kind: "md",
          md: md`### What each sponsor type buys

| Sponsor type | What they buy | Outcome they can measure | Benefits that deliver it |
|---|---|---|---|
| AI model, cloud or developer tool | Builders adopting their API or tool | Teams and builders using it; sign-ups; credits activated | Track with a prize, workshop, starter kit, credits, mentors on site |
| Employer hiring engineers | Candidates | Opted-in profiles, interviews, hires | Profile access (opt-in only), recruiting table, judging seat, talk |
| VC, accelerator, programme | Deal flow and brand with founders | Teams met, follow-up meetings | Judging seat, office hours, demo access |
| Government-linked or ecosystem programme | Ecosystem visibility, mandate | Participants, local talent engaged | Co-hosting, venue, recognition |

Price follows the outcome. A sponsor's finance team compares your price with what the same outcome costs elsewhere.`,
        },
        { kind: "equation", formula: "sh10-cost-per-outcome" },
        {
          kind: "md",
          md: md`Illustrative: a Partner at USD 3,500 that receives about 84 opted-in profiles (70 % of 120) pays $3{,}500 / 84 \approx 42$ USD per profile of a screened AI builder. A Headline at USD 6,000 whose tool is used by 18 of 30 teams (about 72 builders) pays about USD 83 per activated builder. Put these numbers in the sales conversation, labelled as targets.

### Tier design rules

1. **Three tiers**, as MLH's organiser guide recommends; more tiers blur the differences.
2. **Concentration**: the top tier no more than about 25 % of the budget (MLH guidance).
3. **Scarcity**: a fixed number of slots per tier (1 Headline, 4 Partners, 4 Supporters in the plan).
4. **Cost what you promise**: every benefit has a fulfilment cost (lesson 2) and an owner in the run-of-show (lesson 4).
5. **Anchor to public tiers**: HackPrinceton S25 published USD 1k to 7.5k, AAAI's 2025 hackathon USD 2.5k, 5k and 10k (Gold with a talk and a judging seat); a playbook rule of thumb puts a 30 to 50 person event's top tier at USD 2 to 5k. A 120-builder first event at USD 6,000 headline sits in that range.`,
        },
        { kind: "equation", formula: "sh10-sponsor-concentration" },
        {
          kind: "md",
          md: md`### Sizing the target list

Work backwards from the sponsors you need through the conversion rates at each stage (contact to first call, call to proposal, proposal to signed).`,
        },
        { kind: "equation", formula: "sh10-required-targets" },
        {
          kind: "md",
          md: md`### The pipeline forecast

Each deal sits at a stage with a probability of closing. The **weighted pipeline** is the expected sponsor revenue; it must cover the budget's sponsor revenue by the cash gate, not merely by event day.`,
        },
        { kind: "equation", formula: "sh10-weighted-pipeline" },
        {
          kind: "widget",
          widget: "pipeline-forecast",
          props: { target: 26000, acv: 3000 },
          caption: "Set the target to the budget's sponsor revenue (USD 26,000) and the average deal to about USD 3,000. The widget's stages are B2B labels; map them as Discovery = contacted, Qualified = call held with budget owner, Technical eval = proposal sent, Pilot = verbal yes, Procurement = contract sent.",
        },
        { kind: "sources", refs: ["sh10-r1", "sh10-r2", "sh10-r3", "sh10-r4", "sh10-r5", "sh10-r12"] },
      ],
    },
    {
      layer: "applied",
      title: "Worked package and forecast for Riyadh 01",
      blocks: [
        {
          kind: "md",
          md: md`### The prospectus tiers (illustrative)

| | **Headline** USD 6,000 (1 slot) | **Partner** USD 3,500 (4 slots) | **Supporter** USD 1,500 (4 slots) |
|---|---|---|---|
| Recognition | "Presented with", stage and all materials | Logo on site and pages | Logo on pages |
| Builder adoption | Own track with sponsor-funded prize, 30-minute workshop, starter kit with credits | Workshop or mentor table, optional sponsor-funded track prize | 2 mentors on site |
| Candidates | Opted-in profiles of all builders | Opted-in profiles of all builders | Opted-in profiles of finalists |
| Judging | One seat on the final panel | Track judging if it funds a track | None |
| Media | Opening talk (10 min), 2 newsletter features | 1 newsletter mention | Listed in the wrap-up |
| Report | Full sponsor report with usage of its tool | Sponsor report | Summary report |
| Fulfilment cost (lesson 2) | USD 600 | USD 300 | USD 100 |

**In-kind technology partners** (credits, hardware, venue) are listed as partners and reported at fair value; they do not fill a cash tier.`,
        },
        {
          kind: "worked",
          mode: "worked",
          title: "Size the target list and read the pipeline at T-10 weeks",
          given: md`**Illustrative.** Need 9 signed sponsors (USD 26,000). Assumed conversions for a first event with warm intros: contact to call 0.50, call to proposal 0.60, proposal to signed 0.50. Pipeline on Friday 12 February 2027 (T-10 weeks, just after Ramadan is expected to begin):

| Stage (probability) | Deals and value | Weighted |
|---|---|---|
| Contract sent (0.80) | 1 Partner, 3,500 | 2,800 |
| Verbal yes (0.55) | 1 Headline 6,000; 1 Supporter 1,500 | 3,300 + 825 |
| Proposal sent (0.35) | 3 Partners 10,500; 2 Supporters 3,000 | 3,675 + 1,050 |
| Call held (0.20) | 4 Partners 14,000; 4 Supporters 6,000 | 2,800 + 1,200 |
| Contacted (0.10) | 2 Headline 12,000; 6 Partners 21,000; 8 Supporters 12,000 | 1,200 + 2,100 + 1,200 |`,
          steps: [
            { md: md`Targets needed: $N_0 = \lceil 9 / (0.50 \times 0.60 \times 0.50) \rceil = \lceil 9 / 0.15 \rceil = 60$ named organisations. The pipeline holds 32, so 28 more names are needed or the conversion assumptions must be shown to be better.` },
            { md: md`Unweighted pipeline: $3{,}500 + 7{,}500 + 13{,}500 + 20{,}000 + 45{,}000 = 89{,}500$; coverage $89{,}500 / 26{,}000 = 3.44$ times, which looks healthy.` },
            { md: md`Weighted pipeline: $2{,}800 + 4{,}125 + 4{,}725 + 4{,}000 + 4{,}500 = 20{,}150$; weighted coverage $20{,}150 / 26{,}000 = 77.5\%$. Expected shortfall about USD 5,850.` },
            { md: md`**Timing.** Only the top two stages (USD 7,000 weighted) are likely to sign before the gate on 12 March, because Ramadan slows decisions for most of the four weeks in between. Deals still at "contacted" today will mostly not close in time.` },
          ],
          result: md`Coverage looks fine unweighted (3.4 times) but the weighted forecast is 77.5 % of the budget and most of it is too late for the gate. Actions: add 28 names now, push the three Partner proposals to decision before Ramadan's first week ends, offer a Partner track slot to the headline candidates who are not chosen, and prepare the shrink plan (cash prizes to USD 3,000) in case the gate is missed.`,
        },
        {
          kind: "question",
          question: {
            id: "sh10-l03-p1",
            type: "numeric",
            prompt: md`You need 7 sponsors. Contact to call 0.40, call to proposal 0.50, proposal to signed 0.50. How many named organisations must the target list hold?`,
            answer: 70,
            unit: "organisations",
            tolerance: { abs: 0.5 },
            explanation: md`$0.40 \times 0.50 \times 0.50 = 0.10$; $N_0 = 7 / 0.10 = 70$. Warm introductions that lift the first rate to 0.60 would cut it to 47.`,
            concepts: ["sh10.sponsor-target-list"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Selling, contracting and keeping the forecast honest",
      blocks: [
        {
          kind: "md",
          md: md`### The target list in practice

- **Segments.** Model, cloud and developer-tool companies with regional teams; employers hiring AI engineers in the city; VCs and accelerators active at pre-seed and seed; ecosystem programmes and universities (often in-kind, slow). Fill each segment with real organisations you have checked; never present a target as a committed sponsor.
- **Scoring.** For each name: fit with the theme (1 to 5), known budget owner (developer relations, talent, marketing, platform), warm path (who introduces you), and timing (budget cycle, Ramadan, fiscal year). Sort by score and call the top 20 first.
- **Who sells.** Your Partnerships lead and you; the first five sponsors usually need the founder on the call. Use a shared CRM sheet with stage, next step and date; update it weekly before the Finance Lead's gate review.
- **The first call.** Ask what they need this quarter (adoption, hiring, brand), who decides and what they measured at the last event they sponsored. Then offer the tier that delivers that outcome, with the cost per outcome.

### Contract terms that matter

| Term | Position |
|---|---|
| Payment | 50 % on signature, balance by T-4 weeks; Supporter 100 % on signature |
| Cancellation by sponsor | Non-refundable after T-6 weeks (the cash gate) |
| Cancellation by Suhail | Refund of unspent sponsor money; force majeure clause |
| Data | Only profiles of builders who opted in at registration, for the stated purpose; Saudi PDPL and the sponsor's own obligations apply |
| IP | Builders keep all rights in their projects; sponsors get none by default; track rules state any licence needed to use the sponsor's API |
| Judging | Published criteria; sponsor judges declare conflicts; final panel majority independent of sponsors |
| Exclusivity | Category exclusivity only (for example one cloud provider as headline), never exclusivity over all AI tools |
| Track prizes | Paid by the sponsor directly to winners within 30 days; amount fixed in the contract |`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How sponsorship rounds go wrong",
          md: md`**Selling benefits you cannot measure** ("brand awareness") and then having nothing to report. **Selling the attendee list**: a full email list without opt-in damages builder trust and breaches data protection law. **Too many tiers and custom packages** that the team cannot deliver. **Reading unweighted coverage**: 3 times coverage of deals that cannot close before the gate is not cover. **Starting too late**: corporate approvals take 4 to 8 weeks, and Ramadan and year-end slow them further.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Sources and their limits",
          md: md`Published tiers come from the events' own prospectuses (HackPrinceton S25, AAAI 2025, UNIHACK 2025) and a commercial playbook, as recorded in docs/research in November 2026; MLH's three-tier and 25 % guidance is from its organiser guide. None of these is Gulf pricing: treat them as anchors and test them on your first calls. Saudi PDPL obligations for sharing attendee profiles must be confirmed with counsel for Suhail's actual entity.`,
        },
        { kind: "xref", to: "sh03-l03", note: "Sponsorship packages: tiers, what sponsors buy, value-based pricing and benefit cost." },
        { kind: "xref", to: "sh03-l04", note: "Selling sponsorship: target list, outreach, the call, objections, Gulf budget cycles and forecasting." },
        { kind: "xref", to: "sh04-l02", note: "Value exchange design: structures, contracts and exclusivity for partners." },
        { kind: "xref", to: "sh04-l05", note: "Governance and reputation: conflicts, independence and saying no, the basis for the scenario below." },
        { kind: "xref", to: "fc04-l05", note: "Pipeline management and forecasting in Founder Core: stage definitions, probabilities, coverage and forecast hygiene." },
        { kind: "xref", to: "fc04-l07", note: "Pricing, packaging and negotiation: how to hold price and trade terms, applied here to sponsor tiers." },
        { kind: "xref", to: "fc08-l07", note: "Contracts in Founder Core: IP, NDAs and customer agreements; the sponsor contract applies the same discipline." },
        { kind: "scenario", scenario: "sh10-s1" },
        {
          kind: "question",
          question: {
            id: "sh10-l03-p2",
            type: "short",
            prompt: md`**Capstone artifact 3: sponsorship package, target list and forecast.** Produce: (1) three tiers with price, slots, deliverables and fulfilment cost, checked against the concentration rule and the budget's sponsor revenue; (2) the cost-per-outcome argument for two sponsor types; (3) the target list design: segments, scoring criteria, and the number of names from your conversion assumptions; (4) a pipeline snapshot by stage with weighted value and coverage, dated against your cash gate, and what you do about any gap; (5) the five contract terms you will not give up. Illustrative numbers only.`,
            rubric: [
              "Three distinct tiers with prices, slot counts, deliverables and fulfilment costs; total at planned slots matches the budget's sponsor revenue; top tier at most about 25 % of costs.",
              "Cost per outcome computed for at least two sponsor types (for example per activated builder and per opted-in profile) and used as the pricing argument.",
              "Target list size derived from stage conversion rates; segments and scoring criteria (fit, budget owner, warm path, timing) stated; no real organisation presented as committed.",
              "Pipeline snapshot has stages with probabilities, weighted and unweighted totals and coverage computed correctly, and timing against the cash gate, with concrete actions for the gap.",
              "Contract terms protect builders and the cash plan: payment schedule tied to the gate, opt-in data only, builders keep IP, independent judging, limited exclusivity.",
            ],
            modelAnswer: md`**(1) Tiers (illustrative USD):** Headline 6,000 x 1 (own track with sponsor-funded prize, workshop, final judging seat, opted-in profiles, opening talk, 2 newsletter features, full report; fulfilment 600). Partner 3,500 x 4 (workshop or mentor table, optional track prize, profiles, newsletter mention, report; 300). Supporter 1,500 x 4 (mentors, finalists' profiles, logo, summary report; 100). Total 26,000 = budget. Headline 6,000 / 24,860 = 24.1 %.

**(2) Cost per outcome:** developer-tool Headline: 18 of 30 teams (about 72 builders) using the tool, about USD 83 per activated builder. Employer Partner: about 84 opted-in profiles, about USD 42 per screened profile, before any interview.

**(3) Target list:** segments: model, cloud and tool companies; employers hiring AI engineers in Riyadh; seed VCs and accelerators; ecosystem programmes and universities (in-kind). Score: fit 1 to 5, budget owner known, warm path, timing. Need $9 / (0.5 \times 0.6 \times 0.5) = 60$ names.

**(4) Pipeline at T-10 weeks (12 February 2027):** contract 3,500 at 0.8; verbal 7,500 at 0.55; proposals 13,500 at 0.35; calls 20,000 at 0.2; contacted 45,000 at 0.1. Unweighted 89,500 (3.4 times), weighted 20,150 (77.5 %). Only about 7,000 weighted can close before the 12 March gate. Actions: 28 more names this week, push the three Partner proposals to decision in the first week of Ramadan, convert losing headline candidates to Partner tracks, prepare the prize shrink.

**(5) Non-negotiables:** payment 50 % at signature and balance by T-4 weeks, non-refundable after the gate; opt-in profile sharing only, under PDPL; builders keep their IP; published judging criteria with an independent majority; category exclusivity only.`,
            explanation: md`The package must reconcile with the budget, the forecast must be read weighted and dated, and the contract must protect the builders who are the reason sponsors pay.`,
            concepts: ["sh10.tier-design", "sh10.sponsor-value", "sh10.sponsor-target-list", "sh10.sponsor-pipeline", "sh10.sponsor-contract"],
            difficulty: 2,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh10-l03-q1",
      type: "numeric",
      prompt: md`Pipeline: 2 deals of USD 4,000 at 0.55, 3 of USD 2,000 at 0.35 and 10 of USD 2,500 at 0.10. What is the weighted pipeline in USD?`,
      answer: 9000,
      unit: "USD",
      tolerance: { abs: 5 },
      explanation: md`$8{,}000 \times 0.55 + 6{,}000 \times 0.35 + 25{,}000 \times 0.10 = 4{,}400 + 2{,}100 + 2{,}500 = 9{,}000$ USD. The ten early-stage deals hold most of the unweighted value but only 2,500 of the weighted value.`,
      concepts: ["sh10.sponsor-pipeline"],
      difficulty: 1,
    },
    {
      id: "sh10-l03-q2",
      type: "mcq",
      prompt: md`An employer pays USD 3,000 for a Partner tier and receives 60 opted-in profiles. What is its cost per profile, and why does the number matter in the sales call?`,
      options: [
        "USD 50; it lets the sponsor compare the tier with what a screened candidate costs through other channels",
        "USD 20; it proves the event is cheap",
        "USD 50; it is the price Suhail should charge per attendee",
        "USD 180; it includes the fulfilment cost",
      ],
      answer: 0,
      explanation: md`$3{,}000 / 60 = 50$ USD per profile. Sponsors buy outcomes; a cost per outcome lets their finance team compare you with alternatives.`,
      concepts: ["sh10.sponsor-value"],
      difficulty: 1,
    },
    {
      id: "sh10-l03-q3",
      type: "multi",
      prompt: md`Which contract terms protect builders? Select all that apply.`,
      options: [
        "Builders keep all IP in their projects",
        "Only profiles of builders who opted in are shared, for a stated purpose",
        "The headline sponsor may veto any winning team",
        "Judging criteria are published and the final panel has an independent majority",
        "Sponsors receive every attendee's email address",
      ],
      answer: [0, 1, 3],
      explanation: md`A sponsor veto or a full email list breaks builder trust and, for the list, data protection rules. Builders are the reason sponsors pay; protecting them protects the event.`,
      concepts: ["sh10.sponsor-contract"],
      difficulty: 1,
    },
    {
      id: "sh10-l03-q4",
      type: "decision",
      prompt: md`Unweighted coverage is 3.5 times the sponsor target, but weighted coverage is 70 % and the cash gate is in four weeks. What is the best reading?`,
      options: [
        { text: "Coverage is above 3 times; relax", score: 0.1, feedback: "Unweighted coverage counts deals that will not close in time." },
        { text: "Expect a shortfall at the gate: add names now, push late-stage deals to decision, prepare the shrink plan, and report the weighted figure to the team", score: 1, feedback: "Weighted and dated is the honest reading; the shrink plan protects the team if it holds." },
        { text: "Raise all tier prices by 30 %", score: 0.2, feedback: "Higher prices on an unproven event slow closes further." },
        { text: "Count expected in-kind credits as cash to close the gap", score: 0, feedback: "In-kind never pays a cash cost." },
      ],
      explanation: md`Read the pipeline weighted and against the gate date; unweighted coverage is a prospecting signal, not a forecast.`,
      concepts: ["sh10.sponsor-pipeline"],
      difficulty: 2,
    },
    {
      id: "sh10-l03-q5",
      type: "numeric",
      prompt: md`Costs are USD 30,000. What is the highest headline price that keeps the top tier within 25 % of the budget?`,
      answer: 7500,
      unit: "USD",
      tolerance: { abs: 1 },
      explanation: md`$0.25 \times 30{,}000 = 7{,}500$. Above it, losing one sponsor would put the event at risk.`,
      concepts: ["sh10.tier-design"],
      difficulty: 1,
    },
    {
      id: "sh10-l03-q6",
      type: "mcq",
      prompt: md`A cloud provider wants to be the headline sponsor. Which exclusivity can you offer?`,
      options: [
        "Exclusive over all AI tools used at the event",
        "Category exclusivity as the only cloud provider at headline level, while builders may use any tool",
        "Its tool is mandatory for every team",
        "No other sponsor may speak",
      ],
      answer: 1,
      explanation: md`Category exclusivity protects the sponsor's position without restricting builders or blocking other sponsor categories.`,
      concepts: ["sh10.sponsor-contract", "sh10.tier-design"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh10-l03-f1", front: "What sponsors buy at a hackathon", back: "Developer adoption, candidates, deal flow and brand with a specific audience; price each as cost per outcome.", concepts: ["sh10.sponsor-value"] },
    { id: "sh10-l03-f2", front: "Tier design rules", back: "Three tiers; top tier at most about 25 % of the budget; limited slots; every benefit costed and owned; anchor to published tiers.", concepts: ["sh10.tier-design"] },
    { id: "sh10-l03-f3", front: "Target list size", back: md`$N_0 = \lceil n / \prod r_k \rceil$; 9 sponsors at $0.5 \times 0.6 \times 0.5$ needs 60 names.`, concepts: ["sh10.sponsor-target-list"] },
    { id: "sh10-l03-f4", front: "Weighted pipeline", back: md`$W = \sum n_i v_i \pi_i$; compare with the budget's sponsor revenue, dated against the cash gate.`, concepts: ["sh10.sponsor-pipeline"] },
    { id: "sh10-l03-f5", front: "Five contract non-negotiables", back: "Payment tied to the gate; opt-in data only; builders keep IP; independent judging; category exclusivity only.", concepts: ["sh10.sponsor-contract"] },
    { id: "sh10-l03-f6", front: "Worked forecast at T-10 weeks", back: "Unweighted USD 89,500 (3.4 times), weighted USD 20,150 (77.5 % of 26,000); most of it too late for the gate (illustrative).", concepts: ["sh10.sponsor-pipeline"] },
  ],
  scenarios: [
    {
      id: "sh10-s1",
      title: "The headline sponsor wants more",
      dayInLife: true,
      context: md`T-9 weeks. A cloud provider's regional developer relations lead says: "We can do USD 10,000 instead of the 6,000 headline, if three things are true: we are exclusive across all AI model and tool providers, we get the full attendee email list, and our engineers judge every prize." Your weighted pipeline is 77.5 % of budget.`,
      start: "a",
      concepts: ["sh10.sponsor-contract", "sh10.tier-design", "sh10.sponsor-value"],
      nodes: {
        a: {
          md: md`The extra USD 4,000 would close most of your forecast gap. What do you answer?`,
          choices: [
            {
              text: "Thank them, separate the three asks, and offer: category exclusivity as the only cloud headline; opted-in profiles only, which you expect to be most attendees; one seat on the final panel plus judging of their own track. Propose USD 8,000 for the extra track prize and workshop, and ask what outcome they need to report internally",
              next: "b",
              score: 10,
              feedback: "You kept the event's integrity, gave them a measurable outcome and traded scope for price instead of trading builders' trust.",
            },
            {
              text: "Accept all three; the money closes the gap",
              next: "c",
              score: 1,
              feedback: "Exclusivity over all tools pushes out other sponsors, the email list breaks consent and data protection, and sponsor-controlled judging makes every prize suspect.",
            },
            {
              text: "Refuse the whole offer and keep USD 6,000",
              next: "b",
              score: 4,
              feedback: "You protected integrity but left value on the table; most of what they want can be met in a form you can accept.",
            },
            {
              text: "Accept the money and decide the details later",
              next: "c",
              score: 2,
              feedback: "Unagreed terms become disputes in event week, when you have no leverage left.",
            },
          ],
        },
        b: {
          md: md`They reply: "Opt-in only is a problem. Our last event got the full list. Can you at least pre-tick the consent box?"`,
          choices: [
            {
              text: "No pre-ticked boxes: consent must be freely given and specific. Offer instead a clear one-line opt-in at registration that names the sponsors and the purpose, and a sponsor-run raffle or office hours that builders can choose to join, which tends to produce better leads",
              score: 10,
              feedback: "Pre-ticked consent is not valid consent under modern data protection law, and builders notice. A clear, specific opt-in protects everyone.",
            },
            {
              text: "Agree to pre-tick it, since builders can untick",
              score: 1,
              feedback: "Pre-ticked boxes are not valid consent and turn the first Suhail event into a trust problem.",
            },
            {
              text: "Offer to send their marketing email to all attendees on their behalf",
              score: 4,
              feedback: "Better than sharing the list, but still uses data for a purpose builders did not agree to unless the registration said so.",
            },
          ],
        },
        c: {
          md: md`Two other sponsors (an AI model company at Partner level and a developer-tool startup at Supporter) hear about the exclusivity and ask whether they are still allowed to run their tracks.`,
          choices: [
            {
              text: "Go back to the cloud provider, explain that the terms conflict with existing commitments, and renegotiate to category exclusivity and opt-in data before signing anything further",
              score: 7,
              feedback: "The right repair, but it costs trust with all three sponsors; agreeing terms before accepting money would have avoided it.",
            },
            {
              text: "Tell the other two they must drop their tracks",
              score: 0,
              feedback: "You lose USD 5,000 of signed or near-signed revenue and your reputation with the developer-tool segment.",
            },
          ],
        },
      },
    },
  ],
};

export default lesson;
