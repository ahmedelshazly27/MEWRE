import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh04-l02",
  title: "Value exchange design: structures, MOUs, contracts and exclusivity",
  summary:
    "Choose the partnership structure (sponsor, co-host, venue, programme, data, credits, media partner) that matches what each side gives and gets; know what an MOU does and does not bind; put the money, rights and exits in a contract; and price exclusivity as the opportunity cost it is.",
  minutes: 75,
  objectives: [
    "You can choose between sponsor, co-host, venue partner, programme partner, data partner, credits partner and media partner for a given trade.",
    "You can explain what an MOU binds and what it does not, and list the clauses a sponsorship or co-hosting contract must contain.",
    "You can compute the net value of a partnership including in-kind support and delivery cost.",
    "You can compute the opportunity cost of exclusivity and the minimum price that justifies it.",
  ],
  concepts: [
    { id: "sh04.partnership-structures", name: "Partnership structures", description: "Sponsor, co-host, venue partner, programme partner, data partner, credits partner and media partner: standard shapes that fix who pays, who controls the programme, who owns the brand and the data, and who carries the risk.", competency: "sh-partnerships", related: ["sh04.value-exchange"] },
    { id: "sh04.mou-vs-contract", name: "MOU versus contract", description: "A memorandum of understanding records intent and is usually drafted as non-binding except for named clauses (confidentiality, governing law); a contract binds deliverables, payment, rights and termination. Binding force depends on wording and intent, not the title.", competency: "sh-partnerships", related: ["fc08.nda"] },
    { id: "sh04.net-partnership-value", name: "Net partnership value", description: "Cash plus the usable share of in-kind support, minus the cost of delivering the partner's benefits and the opportunity cost of restrictions such as exclusivity.", competency: "sh-partnerships", related: ["sh04.value-exchange"] },
    { id: "sh04.exclusivity", name: "Exclusivity and its cost", description: "A promise not to partner with a partner's competitors (by category, territory, event or period); its price must at least cover the expected net revenue forgone from the excluded competitors.", competency: "sh-partnerships", related: ["sh04.net-partnership-value"] },
    { id: "sh04.data-partner", name: "Data partner terms", description: "Terms for datasets, benchmarks or participant data flowing between Suhail and a partner: licence, permitted use, attribution, consent, retention and where it may be processed.", competency: "sh-partnerships", related: ["fc08.data-rights"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Structures, documents and the price of restrictions",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`The first partner who says yes to Suhail will also propose the terms: their logo first, their category locked, their access to participant data. If you accept a bad structure in the first deal, it becomes the template every later partner asks for. Designing the value exchange yourself, and knowing what each clause costs, is how a community with no track record negotiates as an equal.`,
        },
        {
          kind: "md",
          md: md`### Seven structures

| Structure | Partner gives | Partner gets | Who controls the programme | Main risk |
|---|---|---|---|---|
| **Sponsor** | Cash, sometimes prizes | Visibility, a talk or workshop, judging seat, hiring access, a report | Suhail | Under-delivery of promised benefits |
| **Co-host** | Shared costs, people, audience | Shared brand and ownership of the event | Shared, by written split | Disputes over brand, money and decisions |
| **Venue partner** | Space, AV, sometimes food | Footfall, association, a speaking slot | Suhail | Venue rules (catering, hours, security) that raise cost |
| **Programme partner** | Designs a challenge or track, brings experts and prizes | Builders solving its problem on its platform | Shared for that track | The track becomes an advert; quality drops |
| **Data partner** | Dataset, benchmark or evaluation access | Results, feedback, adoption, citations | Suhail, within licence terms | Licence or consent problems, contaminated benchmarks |
| **Credits partner** | API or compute credits for participants | Developers trying its platform | Suhail | Credits that expire or need a card, friction for builders |
| **Media partner** | Coverage, distribution | Content, access, exclusives | Suhail | Loss of editorial independence if mixed with sponsorship |

Two published patterns from the research brief show how communities combine them. {Tech: Europe} runs free, approval-gated hackathons where technology partners such as OpenAI provide credits and sponsors fund prizes (one sponsor put up a EUR 10K prize; one Berlin hackathon had more than 300 builders and more than EUR 50K in prizes, co-hosted with a university). MLH's organiser guide recommends **three sponsorship tiers with the top tier at no more than 25 % of the event budget**, so no single sponsor carries the event. Package design and tier pricing belong to the event economics module; here the question is which structure each relationship should take.

### MOU, letter of intent, contract

The documents form a ladder, and each rung should be reached only when the one below is real.`,
        },
        {
          kind: "flow",
          title: "The agreement ladder",
          steps: [
            { label: "NDA (if needed)", detail: "Only if confidential information must flow; most sponsorship talks need none." },
            { label: "Proposal or term sheet", detail: "One page: structure, deliverables both ways, price, dates, exclusivity if any." },
            { label: "MOU or letter of intent", detail: "Optional. Records intent; usually non-binding except confidentiality and governing law. Common with government entities." },
            { label: "Contract", detail: "Binding: scope, benefits, payment schedule, brand and IP use, data, cancellation, force majeure, termination, governing law." },
            { label: "Invoice and payment", detail: "Money in the bank before you spend against it." },
            { label: "Activation and report", detail: "Deliver every benefit; send a results report within two weeks." },
            { label: "Renewal", detail: "Start the next conversation with the report, three to six months before their budget is set." },
          ],
          caption: "Skipping rungs upward (announcing before a contract) creates obligations without money; skipping downward (spending before payment) creates debt.",
        },
        {
          kind: "md",
          md: md`**What an MOU does.** It records that two parties intend to work together on stated areas. It usually says it is not legally binding, except for clauses that the parties say are binding (confidentiality, costs, governing law, sometimes exclusivity for a period). It is useful with government entities, where an MOU is often the formal step that lets an official assign staff time, and as a public signal. It carries **no money and no deliverables** unless it says so.

**What decides whether a document binds.** Not its title. Courts in most legal systems look at the wording and the parties' intention: a document called "MOU" with firm obligations, consideration and signatures can bind; a "contract" marked "subject to contract" may not. Write "this memorandum is not legally binding, except clauses X and Y" when that is what you mean.

**What a sponsorship or co-hosting contract must contain:** parties and entities (who invoices whom); scope and each benefit with a measurable definition; price, VAT treatment, withholding, payment schedule and late payment; brand use and approvals; IP in materials and in participants' projects (participants keep their own IP is the builder-friendly default); data (what participant data, if any, the partner receives and on what consent); exclusivity (scope, term, price); cancellation and postponement (who bears which costs); force majeure; termination for breach and for reputational reasons (both directions); liability cap; governing law and dispute forum.`,
        },
        { kind: "equation", formula: "sh04-net-value" },
        {
          kind: "md",
          md: md`### Exclusivity is a product with a cost

Partners ask for **category exclusivity** ("the only cloud provider"), **territorial** ("the only one in Saudi Arabia"), **event** or **period** exclusivity. Each blocks revenue from competitors. The expected cost is the probability that each excluded competitor would have partnered times what it would have paid net of delivery cost:`,
        },
        { kind: "equation", formula: "sh04-exclusivity-cost" },
        {
          kind: "md",
          md: md`Exclusivity also has costs no formula captures. Builders at a hackathon want to choose their model and cloud; a community that looks owned by one vendor loses credibility with exactly the engineers it exists for. That is why narrow exclusivity (one category, one event, one track) is often acceptable and broad exclusivity rarely is. For an open-model research arm, exclusivity on models or datasets is a red flag: it contradicts the purpose.`,
        },
        { kind: "xref", to: "fc08-l07", note: "Founder Core contracts: NDAs, IP assignment, pilot and customer agreements, liability caps. The clauses above apply the same mechanics to sponsorship and co-hosting." },
      ],
    },
    {
      layer: "applied",
      title: "Pricing an exclusive offer and valuing in-kind support",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "A cloud provider asks for 12-month category exclusivity (illustrative)",
          given: md`Illustrative numbers; no partner exists. A cloud provider offers Suhail USD 15k cash plus USD 50k in credits for participants, for category exclusivity ("only cloud partner") across all Suhail events for 12 months. Delivery cost of its benefits (logo placement, workshop slot, report, staff time valued) $D = $ USD 2k. Two other cloud providers could plausibly sponsor during the year: competitor 1 with probability 0.5 at USD 20k, competitor 2 with probability 0.3 at USD 15k, each with USD 2k delivery cost.`,
          steps: [
            { md: md`**Credits** go to participants. They create value for builders but do not reduce Suhail's costs, so they are not in $C$ or $F$. Report them separately as builder value.` },
            { md: md`**Opportunity cost:** $E = 0.5\times(20 - 2) + 0.3\times(15 - 2) = 9.0 + 3.9 = 12.9$ USD k.` },
            { md: md`**Net value of the offer as proposed:** $V_{net} = 15 + 0 - 2 - 12.9 = 0.1$ USD k. Exclusivity eats almost all of the cash.` },
            { md: md`**Minimum exclusive price:** without exclusivity this provider would pay $C_0 = 15$, so $C_{excl} \ge 15 + 12.9 = 27.9$ USD k, about USD 28k.` },
            { md: md`**Narrow the scope instead:** exclusivity for one flagship event only. If that event carries one third of the expected competitor revenue, $E \approx 12.9/3 = 4.3$ and the minimum price drops to about USD 19.3k.` },
          ],
          result: md`Counter-offer: USD 15k non-exclusive, or USD 28k for 12-month category exclusivity, or about USD 19k for exclusivity at one flagship event. Credits are welcome on any option. You have turned "can we be exclusive?" into a priced menu, and the partner chooses.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: is the venue partner worth it?",
          given: md`Illustrative. A Riyadh innovation centre offers its auditorium for a two-day hackathon. Fair market value $F = $ USD 12k. Suhail would otherwise rent a smaller hall for USD 9k, so $u = 9/12 = 0.75$. No cash. The venue asks for a 20-minute welcome talk, logo placement and a short report: delivery cost $D = $ USD 1.5k. No exclusivity.`,
          steps: [
            { md: md`Usable in-kind value: $u\,F = 0.75\times12$.` },
            { md: md`$= $ **9.0 USD k**.`, hidden: true, check: { prompt: "Usable in-kind value (USD k)", answer: 9, unit: "USD k", tolerance: { abs: 0.05 } } },
            { md: md`Net value: $V_{net} = 0 + 9.0 - 1.5 - 0$.` },
            { md: md`$= $ **7.5 USD k**.`, hidden: true, check: { prompt: "Net value of the venue partnership (USD k)", answer: 7.5, unit: "USD k", tolerance: { abs: 0.05 } } },
            { md: md`Now the venue requires its own caterer at USD 25 per person for 150 people, against your planned USD 15 per person. Extra cost: $150\times(25-15) = 1{,}500$ USD, so $V_{net}$ falls to USD 6.0k. Still positive, but read the venue rules before you sign.` },
          ],
          result: md`In-kind deals are valued at what they save you, not at the partner's list price, and venue conditions (catering, security, hours, AV) are part of the cost.`,
        },
        {
          kind: "question",
          question: {
            id: "sh04-l02-p1",
            type: "numeric",
            prompt: md`Illustrative. A model provider wants exclusivity as "only model partner" at one hackathon. Three other model providers might have joined: probabilities 0.4, 0.3 and 0.2, each paying USD 8k with USD 1.5k delivery cost. The provider would pay USD 10k without exclusivity. What is the minimum exclusive price in USD k?`,
            answer: 15.85,
            tolerance: { abs: 0.05 },
            unit: "USD k",
            explanation: md`$E = (0.4 + 0.3 + 0.2)\times(8 - 1.5) = 0.9\times6.5 = 5.85$ USD k. $C_{excl} \ge 10 + 5.85 = 15.85$ USD k. Then ask the non-cash question: will builders accept a hackathon where only one model is allowed? For an Arabic NLP event, probably not: offer a "featured model" track instead.`,
            concepts: ["sh04.exclusivity"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Negotiating terms in practice",
      blocks: [
        {
          kind: "md",
          md: md`### Who does what

The Partnerships lead drafts the one-page proposal and runs the conversation; the Finance lead checks invoicing entity, VAT and withholding (lesson 3) and the payment schedule; you approve anything with exclusivity, data sharing or government involvement. Use one standard sponsorship agreement and one co-hosting agreement, reviewed once by a lawyer in the governing-law country, and change only the schedule of benefits per partner. Every deviation from the template is logged.

### Standard Suhail positions (a starting policy)

- **Participants own their projects.** Partners get no IP in hackathon submissions; they may get a licence to show public demos with attribution.
- **No participant data without consent.** Partners receive participant contact details only for people who opted in to that partner, by name, on the registration form.
- **Exclusivity only narrow, only priced.** One category, one event or one track; never on models, datasets or research outputs.
- **Editorial independence.** No partner approves speakers, judges, the newsletter or podcast content; sponsored segments are labelled.
- **Cash before spend.** No commitment of funds against an unpaid invoice.
- **Reputational termination both ways.** Either side may exit if the other's conduct would seriously harm its reputation, with a pro-rata refund rule.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "The MOU that became a press release and nothing else",
          md: md`A signed MOU with a well-known entity, announced loudly, creates expectations among builders and other partners ("Suhail is backed by X") while bringing no resources. If the relationship stalls, you carry the reputational cost of a partnership that never existed. Announce activities, not MOUs.`,
        },
        { kind: "sources", refs: ["sh04-r7", "sh04-r19"] },
        { kind: "xref", to: "fc04-l07", note: "Founder Core negotiation: anchoring, BATNA and ZOPA. Your BATNA in a sponsorship talk is the expected value of the other partners in your pipeline (lesson 4)." },
        { kind: "xref", to: "fc08.data-rights", note: "Data and training rights in customer contracts: the same structure (ownership, permitted use, processing location) applies to datasets and participant data with a data partner." },
        {
          kind: "checklist",
          title: "Before you send a partnership contract",
          items: [
            "The structure matches who pays and who controls the programme.",
            "Every benefit is defined so both sides can tell whether it was delivered.",
            "Invoicing entity, VAT, withholding and payment dates are confirmed by the Finance lead.",
            "Exclusivity, if any, is narrow, time-limited and priced with a written calculation.",
            "Data clauses state consent, permitted use and retention.",
            "Cancellation, postponement and reputational termination are covered in both directions.",
          ],
        },
        { kind: "scenario", scenario: "sh04-s1" },
        {
          kind: "feynman",
          prompt: "Explain to a volunteer lead why Suhail does not accept broad exclusivity, even when the partner offers more money for it.",
          keyPoints: [
            "Exclusivity blocks revenue from competitors; the expected forgone revenue is its cash cost.",
            "Builders want to choose their tools; a community seen as owned by one vendor loses the engineers it exists for.",
            "Narrow exclusivity (one category, one event, one track, short term) can be priced and accepted.",
            "A first partner's terms become the template others ask for.",
          ],
        },
        {
          kind: "question",
          question: {
            id: "sh04-l02-p2",
            type: "short",
            explanation: md`The structure must follow the trade: a lab that wants builders on its open weights is a programme partner. Keep control of judging and content, avoid exclusivity on models, protect participant IP and data, and treat payment, not an MOU, as the step that makes the deal real.`,
            prompt: md`Draft the one-page partnership proposal Suhail would send to a sovereign AI lab that has released open Arabic weights, for a programme-partner track at Suhail's first Arabic NLP hackathon (illustrative date in 2027). Include: structure and why; what the lab gives and gets (measurable); what Suhail controls; price or in-kind contribution (illustrative, labelled); exclusivity position; data and IP terms; the documents and timeline from proposal to payment.`,
            rubric: [
              "Chooses programme partner (possibly with sponsor elements) and explains why that structure fits the trade.",
              "Benefits on both sides are measurable (number of builders on the track, evaluation results shared, judging seats, report date).",
              "Keeps programme, judging and editorial control with Suhail and states it.",
              "States a narrow or no exclusivity position consistent with an open-model community, with reasoning.",
              "Covers participant IP and data consent explicitly, and the licence of any dataset or benchmark used.",
              "Lists the agreement ladder steps with dates and does not treat an MOU as the money step; all numbers labelled illustrative.",
            ],
            modelAnswer: md`**Suhail x [Lab]: Arabic open-model track (proposal, illustrative)**

**Structure:** programme partner for one track ("Build on open Arabic weights") at Suhail's first Arabic NLP hackathon, plus a cash contribution to prizes. A programme partner fits because the lab's goal is builders using its open model, and the track delivers exactly that.

**Lab gives:** USD 10k prize pool for the track (illustrative); inference or compute access for registered teams for 30 days; two engineers as mentors for the weekend; one judge on the track panel.
**Lab gets:** at least 15 teams building on its open weights (target, illustrative); a public results post with each team's demo and an anonymised summary of failure cases we observed; a 20-minute technical talk; a report within 14 days with usage numbers.

**Suhail controls:** the overall programme, judging criteria and final decision (the lab's judge is one of three on the track); the newsletter and podcast coverage. Sponsored content is labelled.

**Exclusivity:** none on models. Teams in other tracks may use any model. The lab is the only featured partner of this track.

**IP and data:** teams own their projects. The lab receives contact details only of participants who opt in to the lab on the registration form. Any benchmark used is under its published licence; we will not use blind test sets for training or tuning.

**Documents and timeline:** proposal (week 0); call with developer relations and research lead (week 1); sponsorship and track agreement from Suhail's template, governing law agreed (weeks 2 to 4); invoice on signature, payment by week 8; track announced only after signature; event (week 12); report (week 14); renewal conversation using the report (month 4). An MOU is not needed; if the lab requires one for internal approval, it will be non-binding except confidentiality and will not be announced separately.`,
            concepts: ["sh04.partnership-structures", "sh04.mou-vs-contract", "sh04.exclusivity", "sh04.data-partner"],
            difficulty: 3,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh04-l02-q1",
      type: "mcq",
      prompt: md`A university offers its hall, students and two professors as judges, and wants its name on the event alongside Suhail's. It pays no cash. Which structure fits best?`,
      options: ["Sponsor", "Co-host with a written split of brand and decisions", "Media partner", "Credits partner"],
      answer: 1,
      explanation: md`The university brings venue, audience and people and wants shared branding: that is co-hosting. Write the split (who decides programme, judging and money) before the event, because co-host disputes are about exactly those.`,
      concepts: ["sh04.partnership-structures"],
      difficulty: 1,
    },
    {
      id: "sh04-l02-q2",
      type: "multi",
      prompt: md`Which statements about MOUs are correct?`,
      options: [
        "An MOU is binding if it is titled 'contract'.",
        "Whether a document binds depends on its wording and the parties' intent, not its title.",
        "An MOU usually states it is non-binding except named clauses such as confidentiality and governing law.",
        "An MOU with a government entity guarantees funding.",
        "With government entities, an MOU can be the formal step that lets officials assign staff time.",
      ],
      answer: [1, 2, 4],
      explanation: md`Titles do not decide binding force; wording and intent do. MOUs are typically non-binding except named clauses and carry no money unless they say so. With government entities they often unlock internal approval for staff time.`,
      concepts: ["sh04.mou-vs-contract"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "sh04-l02-q3",
      type: "numeric",
      prompt: md`Illustrative: a sponsor pays USD 8k cash and provides catering worth USD 4k that replaces USD 3k you would have spent. Delivering its benefits costs USD 1.2k. No exclusivity. What is the net value in USD k?`,
      answer: 9.8,
      tolerance: { abs: 0.05 },
      unit: "USD k",
      explanation: md`$V_{net} = 8 + 3 - 1.2 - 0 = 9.8$ USD k. The catering counts at the USD 3k it saves ($u = 0.75$), not at its USD 4k list value.`,
      concepts: ["sh04.net-partnership-value"],
      difficulty: 1,
    },
    {
      id: "sh04-l02-q4",
      type: "numeric",
      prompt: md`Exclusivity would exclude two competitors with probabilities 0.6 and 0.25, paying USD 12k and USD 10k, each with USD 2k delivery cost. What is the exclusivity opportunity cost in USD k?`,
      answer: 8,
      tolerance: { abs: 0.05 },
      unit: "USD k",
      explanation: md`$E = 0.6\times(12-2) + 0.25\times(10-2) = 6.0 + 2.0 = 8.0$ USD k. Subtract delivery cost before weighting: you would not have kept the gross revenue, only what is left after delivering the competitor's benefits.`,
      concepts: ["sh04.exclusivity"],
      difficulty: 2,
    },
    {
      id: "sh04-l02-q5",
      type: "order",
      prompt: md`Put the agreement ladder in order.`,
      items: ["Proposal or term sheet", "MOU or letter of intent (optional)", "Signed contract", "Invoice paid", "Activation and results report", "Renewal conversation"],
      explanation: md`Each rung is reached only when the one below is real: never announce before the contract, never spend before payment, and start renewal with the report.`,
      concepts: ["sh04.mou-vs-contract"],
      difficulty: 1,
    },
    {
      id: "sh04-l02-q6",
      type: "decision",
      prompt: md`A data partner offers a large, high-quality Arabic dialect dataset for a hackathon, but its licence forbids publishing models trained on it. Your research arm plans open weights. What do you do?`,
      options: [
        { text: "Accept it for the whole programme including the research arm; deal with the licence later.", score: 0, feedback: "Using data against its licence exposes Suhail and participants to claims and contradicts the open-model purpose." },
        { text: "Accept it for a clearly labelled hackathon track where outputs are demos, not published models, with the licence shown to participants; keep it out of the research arm unless the licence is renegotiated.", score: 1, feedback: "Right: match the use to the licence, make the restriction visible to builders, and protect the research arm's open outputs." },
        { text: "Decline any dataset with restrictions.", score: 0.5, feedback: "Safe but loses a useful resource; a scoped use within the licence is possible." },
        { text: "Accept it and tell participants they may publish anyway because hackathon projects are informal.", score: 0, feedback: "Informality does not change the licence; you would be inducing participants to breach it." },
      ],
      explanation: md`Data partner terms fix permitted use. Scope the use to the licence, disclose it, and keep restricted data out of anything you intend to publish openly.`,
      concepts: ["sh04.data-partner"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "sh04-l02-f1", front: "Seven partnership structures", back: "Sponsor, co-host, venue partner, programme partner, data partner, credits partner, media partner.", concepts: ["sh04.partnership-structures"] },
    { id: "sh04-l02-f2", front: "What decides whether an MOU binds?", back: "Its wording and the parties' intent, not its title. State explicitly which clauses bind.", concepts: ["sh04.mou-vs-contract"] },
    { id: "sh04-l02-f3", front: "Net partnership value", back: md`$V_{net} = C + uF - D - E$: cash, plus usable in-kind, minus delivery cost and exclusivity cost.`, concepts: ["sh04.net-partnership-value"] },
    { id: "sh04-l02-f4", front: "Minimum exclusive price", back: md`$C_{excl} \ge C_0 + \sum_k p_k (R_k - D_k)$`, concepts: ["sh04.exclusivity"] },
    { id: "sh04-l02-f5", front: "MLH guidance on the top sponsorship tier", back: "Three tiers, with the top tier at no more than 25 % of the event budget, so no single sponsor carries the event.", concepts: ["sh04.partnership-structures"] },
    { id: "sh04-l02-f6", front: "Suhail default on participant IP and data", back: "Participants own their projects; partners receive contact details only for participants who opted in to that partner.", concepts: ["sh04.data-partner"] },
  ],
  scenarios: [
    {
      id: "sh04-s1",
      title: "The first big sponsor wants everything",
      context: md`Illustrative. Six weeks before Suhail's first hackathon, a large technology company (the only cash sponsor so far) offers USD 25k if it gets: title naming ("[Company] Suhail Hackathon"), category exclusivity across all Suhail events for 12 months, the full participant list with emails, and approval of the judging panel. Your budget gap for the event is USD 18k.`,
      start: "a",
      concepts: ["sh04.exclusivity", "sh04.partnership-structures", "sh04.data-partner"],
      nodes: {
        a: {
          md: md`The sponsor's contact wants an answer by Friday. Your Events lead says "take it, we need the money". What is your first move?`,
          choices: [
            { text: "Accept all terms: the event happens and you can renegotiate next year.", next: "b", score: 2, feedback: "The money solves this event but the data and judging terms are hard to undo, and this deal becomes the template others will ask for." },
            { text: "Unbundle the ask: separate what you can sell (naming for this event, narrow exclusivity) from what you will not (participant data without consent, judging approval), and price each.", next: "c", score: 9, feedback: "Right: turning a bundle into a menu keeps the deal alive while protecting the community." },
            { text: "Refuse the whole offer on principle.", next: "d", score: 3, feedback: "Principled but leaves a USD 18k gap with six weeks to go, and loses a willing partner over terms you could have negotiated." },
          ],
        },
        b: {
          md: md`Two weeks later a model provider offers USD 8k for a track, but your exclusivity clause blocks it. Participants complain on Discord that a sponsor received their emails. What now?`,
          choices: [
            { text: "Ask the main sponsor for a waiver for the model provider and publish a clear data policy for the future.", score: 5, feedback: "Damage limitation. You have learned the cost of unpriced exclusivity and data terms; write the standard positions now." },
            { text: "Ignore the complaints; it is in the registration terms.", score: 1, feedback: "Legal cover is thin under data-protection laws that require specific consent, and trust with builders is what Suhail sells." },
          ],
        },
        c: {
          md: md`You counter: USD 15k for event title naming and a featured workshop; plus USD 8k for exclusivity in the cloud category for this event only; opt-in contact sharing (participants tick a box for this sponsor); one judge seat out of five, no approval rights. The sponsor's contact says marketing needs the full list to justify the spend.`,
          choices: [
            { text: "Offer a measurable alternative: a lead report with the number of opted-in participants, workshop attendance and projects built on its platform, plus a guaranteed recruiting session.", score: 9, feedback: "Right: give the sponsor's marketing team a number to report without handing over non-consenting people's data." },
            { text: "Give them the full list but ask them not to email anyone.", score: 1, feedback: "You would be sharing personal data without consent and relying on a promise you cannot enforce." },
          ],
        },
        d: {
          md: md`The sponsor withdraws. You have six weeks and a USD 18k gap. What is the best recovery?`,
          choices: [
            { text: "Go back with an unbundled offer before Friday, then cut scope (smaller venue, fewer prizes) for whatever gap remains.", score: 7, feedback: "Recoverable: a priced menu may still win the deal, and scope cuts protect cash." },
            { text: "Postpone the event indefinitely.", score: 3, feedback: "Sometimes necessary, but announcing a postponement of the very first event damages trust; try the menu and scope cuts first." },
          ],
        },
      },
    },
  ],
};

export default lesson;
