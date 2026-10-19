import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m13-l05",
  title: "Negotiation & Influence",
  summary:
    "BATNA, reservation prices and ZOPA; interest-based negotiation applied to contractor claims; the constraints of negotiating with public money; Gulf cultural context; conflict-handling modes; and how to build durable trust with leadership.",
  minutes: 60,
  objectives: [
    "You can compute expected award, reservation prices and the ZOPA for a claim settlement, and explain why the public sector cannot settle on expected value alone",
    "You can prepare an interest-based negotiation: interests, options, objective criteria, BATNA",
    "You can adapt your negotiation style to Gulf business culture without compromising integrity",
    "You can choose a conflict-handling mode deliberately and influence ethically",
    "You can describe and apply the components of trust with senior leadership",
  ],
  concepts: [
    {
      id: "m13.batna-zopa",
      name: "BATNA, reservation price and ZOPA",
      description:
        "BATNA is your best alternative if talks fail; it sets your reservation (walk-away) price; the ZOPA is the overlap between the parties' reservation prices.",
      competency: "contracts",
      related: ["m13.interest-based", "m09.daab-arbitration"],
    },
    {
      id: "m13.interest-based",
      name: "Interest-based (principled) negotiation",
      description:
        "Separate people from the problem; focus on interests, not positions; generate options for mutual gain; insist on objective criteria.",
      competency: "leadership",
    },
    {
      id: "m13.claims-settlement",
      name: "Claims settlement in the public sector",
      description:
        "Settlements must be justified by entitlement and quantum under the Contract (e.g. via the Engineer's determination), defensible to auditors, and documented — not merely split the difference.",
      competency: "contracts",
      related: ["m13.batna-zopa", "m13.contract-notice", "m09.engineer-determination", "m09.prolongation-disruption", "m15.claims-variations"],
    },
    {
      id: "m13.gulf-culture",
      name: "Negotiation culture in the Gulf",
      description:
        "Relationship-first, high-context communication, face-saving, hospitality, senior-to-senior decisions and patience; commitments become real when written and signed.",
      competency: "leadership",
      related: ["m13.relationship-capital"],
    },
    {
      id: "m13.conflict-modes",
      name: "Conflict-handling modes",
      description:
        "Competing, collaborating, compromising, avoiding and accommodating — each appropriate in different situations of stakes and relationship importance.",
      competency: "leadership",
    },
    {
      id: "m13.trust-leadership",
      name: "Building trust with leadership",
      description:
        "Trust grows with credibility, reliability and intimacy (being safe to confide in) and falls with self-orientation; no surprises, protect superiors, be right and brief.",
      competency: "leadership",
      related: ["m15.first-90-days"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "The structure of a negotiation",
      blocks: [
        {
          kind: "md",
          md: md`A PM at MEWRE negotiates constantly: claims and variations with EPC contractors, interface responsibilities with IPP developers, scope and fees with consultants, outage windows with Transmission, priorities with other sectors, timing with the State Audit Bureau's reviewers. Most of these are not one-off bargains but **repeated games** with the same counterparties over years. That single fact changes the optimal strategy: reputation and trust are assets worth more than winning any one round.

### BATNA, reservation price, ZOPA

- **BATNA** — *Best Alternative To a Negotiated Agreement*: what you will do if no deal is reached. For a claim: let the Engineer determine and, if disputed, go to the DAAB and then arbitration or the courts.
- **Reservation price** — the worst deal you would accept, derived from your BATNA. Accepting anything worse than your BATNA is irrational.
- **ZOPA** — *Zone Of Possible Agreement*: the range between the two parties' reservation prices. If it exists, a deal is possible; if not, someone's BATNA must change (or the parties' perceptions of it) before agreement is possible.

For a monetary claim, each party's BATNA is the **expected outcome of the dispute process, adjusted for its costs**:`,
        },
        { kind: "equation", formula: "m13-expected-award" },
        { kind: "equation", formula: "m13-zopa" },
        {
          kind: "md",
          md: md`The Employer would rationally pay up to the expected award plus what the dispute would cost it (lawyers, experts, management time, delay to the project). The contractor would rationally accept down to the expected award minus its costs. The **dispute costs of both sides create the ZOPA** — they are the value that settlement saves.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why the public sector cannot simply settle at expected value",
          md: md`A private company may pay a claim it believes is 50% likely to succeed, simply to save legal costs. A ministry spends public money under audit: the State Audit Bureau and internal control will ask **what the contractor was entitled to under the Contract**, not what was commercially convenient. So the expected-value analysis tells you *whether settlement is rational and where the bargaining range is*, but the settlement memo must rest on **entitlement and quantum**: which events were Employer risks under which clauses, which delay analysis supports how many days, which costs are substantiated. In FIDIC terms this is typically delivered through the Engineer's consultation and determination process (Sub-Clause 3.7 in the 2017 books). A settlement that cannot be explained clause by clause is a liability for the official who signs it.`,
        },
        {
          kind: "md",
          md: md`### Interest-based negotiation

Fisher and Ury's principled negotiation (Harvard Program on Negotiation) has four rules:

1. **Separate the people from the problem.** Be soft on people, hard on the problem. In the Gulf this matters doubly: an insulted counterpart will not concede even when the facts are against them.
2. **Focus on interests, not positions.** The contractor's *position* is "KD 3.2 m and 120 days EOT". Its *interests* may be cash flow, avoiding delay damages, protecting its reputation with the ministry for the next tender, and a face-saving story for its head office. The ministry's interests: a defensible settlement, the plant connected before summer, no precedent that invites similar claims, and a contractor still motivated to finish well.
3. **Invent options for mutual gain.** EOT without costs; costs paid against acceleration commitments; release of retention against an advance-payment guarantee; agreed delay-damages treatment tied to a firm milestone; a joint programme review. Time and money are separate currencies — trade them.
4. **Insist on objective criteria.** Contract clauses, accepted programme, contemporaneous records, recognised delay-analysis methods, published indices, market rates. Criteria let both sides concede to a standard rather than to each other — which saves face.

### Anchoring and concessions

The first credible number anchors the discussion. Anchor with a **justified** figure (the Engineer's assessment, with its reasoning), not an arbitrary low number that destroys credibility. Concede slowly, in decreasing steps, and **always in exchange for something** (a firm milestone, withdrawal of other claims, a waiver of further claims for the same events).

### Conflict-handling modes

The Thomas–Kilmann model gives five modes along two axes — concern for your own outcome and concern for the other's:

| Mode | Use when | Risk if overused |
|---|---|---|
| **Competing** | Safety, integrity, clear contractual rights, emergencies | Damaged relationships, retaliation |
| **Collaborating** | High stakes and important relationship; time available | Slow; can be exploited |
| **Compromising** | Moderate stakes, equal power, deadline pressure | Splitting the difference without justification (dangerous with public money) |
| **Avoiding** | Trivial issues; cooling-off needed | Problems grow unseen |
| **Accommodating** | You are wrong; issue matters more to them; building goodwill | Seen as weak; precedent |

Effective PMs switch modes deliberately: *competing* on safety and integrity, *collaborating* on recovery plans, *accommodating* on trivial points to build credit.`,
        },
        {
          kind: "md",
          md: md`### Cultural context in the Gulf

Generalisations about culture are starting hypotheses, not rules — individuals vary, and many Kuwaiti officials and executives are internationally educated. Still, several patterns are widely observed in Gulf business settings:

- **Relationship before transaction.** Coffee, courtesies and personal conversation precede business. Rushing to the agenda signals disrespect.
- **High-context communication.** Disagreement is often indirect ("this may be difficult", "we will study it"). "إن شاء الله" may express sincere intention or polite non-commitment. Confirm in writing.
- **Face (ماء الوجه).** Public criticism or cornering someone in front of their team is very costly. Give the counterpart a dignified path to concede — objective criteria, a senior-level "gesture", a joint solution.
- **Hierarchy and senior-to-senior decisions.** Final concessions are often reserved for the most senior person; working-level negotiators may lack authority. Plan for a senior closing meeting and do not spend all your concessions beforehand.
- **Patience and timing.** Deadlines may be treated flexibly until a senior figure attaches importance to them. Ramadan and summer leave periods change availability.
- **Hospitality and gifts.** Accept coffee and normal courtesy; decline anything beyond trivial value from parties you manage, per your integrity rules.

Speaking Arabic and knowing the forms of respect builds rapport — and as a Kuwaiti/Egyptian Arabic speaker you hold an advantage over many expatriate managers. Use it to build trust, not to blur integrity lines.`,
        },
        {
          kind: "md",
          md: md`### Building trust with leadership

David Maister's **trust equation** is a useful diagnostic:`,
        },
        { kind: "equation", formula: "m13-trust-equation" },
        {
          kind: "md",
          md: md`- **Credibility** — you are right about facts and numbers; you say "I don't know, I'll check" rather than guess.
- **Reliability** — you do what you say, when you say; small promises kept build the case for big ones.
- **Intimacy** — your superior can tell you about a concern without it leaking; you handle sensitive matters discreetly.
- **Self-orientation** (the denominator) — the perception that you are serving your own career or agenda. It divides everything else. Presenting your superior's success, not yours, reduces it.

Behaviours that compound trust in a ministry: **no surprises** (bad news early, through the chain), **protect your superior** (never let them be embarrassed by information you had), **be brief and right**, **bring solutions with problems**, and **give credit upward and to your team**.`,
        },
        { kind: "sources", refs: ["m13-pon", "m13-culture-map", "m13-fidic"] },
      ],
    },
    {
      layer: "applied",
      title: "Pricing a claim settlement and planning the negotiation",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "A KD 3.2 m prolongation claim — where is the ZOPA?",
          given: md`An EPC contractor claims **KD 3.2 m** plus EOT for delayed access to part of the site. The Engineer's preliminary analysis: access was indeed late (an Employer risk under the Contract) for one area, but much of the claimed cost is unsubstantiated or concurrent with contractor delay. Legal and the OE estimate that if the matter goes to the DAAB: **70%** chance of an award around **KD 1.4 m**, **30%** chance around **KD 2.6 m**. Estimated dispute costs: Employer **KD 0.25 m** (advisers, experts, management time), contractor **KD 0.30 m**.`,
          steps: [
            {
              md: md`**Expected award.** $EV = 0.7 \times 1.4 + 0.3 \times 2.6 = 0.98 + 0.78 = \text{KD } 1.76$ m.`,
            },
            {
              md: md`**Employer's reservation price.** $RP_E = EV + C_E = 1.76 + 0.25 = \text{KD } 2.01$ m. Paying more than this is worse than the dispute route.`,
            },
            {
              md: md`**Contractor's reservation price.** $RP_C = EV - C_C = 1.76 - 0.30 = \text{KD } 1.46$ m. Accepting less is worse for the contractor than the dispute route (if it shares the same estimate).`,
            },
            {
              md: md`**ZOPA** $= [1.46,\ 2.01]$ — KD 0.55 m wide, equal to the combined dispute costs. A midpoint would be about KD 1.74 m.`,
            },
            {
              md: md`**Public-sector filter.** The settlement must be supported by entitlement: the Engineer's determination should value the *substantiated* prolongation for the Employer-risk period. Suppose it supports KD 1.55 m. That is inside the ZOPA, and defensible clause by clause — the target.`,
            },
            {
              md: md`**Trading currencies.** Offer KD 1.55 m plus the EOT for the Employer-risk period (which removes delay-damage exposure for those days — high value to the contractor, low cost to MEWRE if the plant's connection date is protected), in exchange for a firm recovery milestone and a full and final settlement of all claims for these events.`,
            },
          ],
          result: md`ZOPA **KD 1.46–2.01 m**; target settlement **KD 1.55 m + justified EOT**, anchored on the Engineer's substantiated assessment, traded for a milestone commitment and a waiver of further claims on the same events. The expected-value analysis shows settlement is rational; the entitlement analysis makes it defensible.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A smaller variation dispute",
          given: md`A contractor claims **KD 1.8 m** for a disputed variation. Assessment of the dispute route: **60%** chance of an award around **KD 0.6 m**, **40%** chance around **KD 1.2 m**. Dispute costs: Employer **KD 0.15 m**, contractor **KD 0.20 m**.`,
          steps: [
            {
              md: md`Expected award: $EV = 0.6 \times 0.6 + 0.4 \times 1.2 = 0.36 + 0.48 = \text{KD } 0.84$ m.`,
              hidden: true,
              check: { prompt: "Expected award (KD million)", answer: 0.84, unit: "KD m", tolerance: { abs: 0.005 } },
            },
            { md: md`Reservation prices: $RP_E = 0.84 + 0.15 = 0.99$; $RP_C = 0.84 - 0.20 = 0.64$ (KD m).` },
            {
              md: md`ZOPA width: $0.99 - 0.64 = \text{KD } 0.35$ m.`,
              hidden: true,
              check: { prompt: "ZOPA width (KD million)", answer: 0.35, unit: "KD m", tolerance: { abs: 0.005 } },
            },
          ],
          result: md`A settlement between **KD 0.64 m and 0.99 m** beats the dispute route for both sides. The contractor's KD 1.8 m opening position is far outside it — a signal that either its view of the odds is very different or it is anchoring high. Explore which: ask what evidence supports its valuation.`,
        },
        {
          kind: "question",
          question: {
            id: "m13-l05-p1",
            type: "numeric",
            prompt: "For a claim, the dispute route is assessed as 40% chance of an award of KD 2.0 m and 60% chance of KD 0.5 m. The Employer's dispute costs are KD 0.2 m. What is the Employer's reservation price (KD million)?",
            answer: 1.3,
            unit: "KD m",
            tolerance: { abs: 0.005 },
            explanation: md`$EV = 0.4 \times 2.0 + 0.6 \times 0.5 = 0.8 + 0.3 = 1.1$; $RP_E = 1.1 + 0.2 = \text{KD } 1.3$ m. Paying more than KD 1.3 m is worse than litigating — but remember the settlement figure itself must still be justified by entitlement.`,
            concepts: ["m13.batna-zopa"],
            difficulty: 2,
          },
        },
        {
          kind: "md",
          md: md`### A one-page negotiation plan

| Element | Ministry | Contractor (your best estimate) |
|---|---|---|
| Position | Pay substantiated prolongation only | KD 3.2 m + 120 days EOT |
| Interests | Defensible settlement; connection before summer; no precedent; motivated contractor | Cash flow; avoid delay damages; reputation for next tender; head-office story |
| BATNA | Engineer's determination → DAAB | DAAB → arbitration; slow-down risk |
| Reservation price | KD 2.01 m (but entitlement cap ~KD 1.55 m) | KD 1.46 m |
| Objective criteria | Contract clauses, accepted programme, site access records, delay analysis method | Same — insist on them |
| Options | EOT for Employer-risk days; money vs milestone; retention release vs guarantee; joint programme | — |
| Concession plan | Open at Engineer's assessment; concede on EOT and payment timing before money | — |
| Authority | Who can approve what; Audit Bureau review if required | Who at the contractor can sign |
| Walk-away signal | Below entitlement analysis we will not go above; refer to DAAB | — |

Fill this in **before** every significant negotiation — including internal ones with other sectors.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Negotiating and influencing on real projects",
      blocks: [
        {
          kind: "md",
          md: md`### How claims negotiations actually unfold

1. **Notice and particulars.** The contractor gives notice and then a fully detailed claim (in FIDIC 2017, a notice within 28 days of awareness and a fully detailed claim within 84 days, with possible extensions — check your Contract).
2. **Engineer's analysis and consultation.** The Engineer (often the OE) analyses entitlement and quantum and consults both parties to try to reach agreement.
3. **Agreement or determination.** If agreement is not reached in the contractual period, the Engineer makes a fair determination; a party dissatisfied must give notice within the contractual period or the determination becomes final and binding.
4. **Escalation.** DAAB, amicable settlement period, arbitration (or local courts, depending on the Contract and Kuwaiti law).
5. **Approvals.** Any settlement that changes the contract price may require internal approvals and, depending on value, prior review — build this into the timeline and tell the contractor, so the delay is not misread as bad faith.

The PM's role is to make sure the Engineer's analysis is rigorous, the ministry's interests are clear, the approvals are anticipated, and the relationship survives.

### Influence inside the ministry

Most of your negotiations are internal: persuading Transmission to give an outage window, Financial Affairs to release budget, Legal to accept a pragmatic clause. Ethical influence tools (Cialdini's principles applied honestly):

- **Reciprocity** — help other sectors with their problems; they remember.
- **Consistency** — link your request to commitments already made ("the steering committee agreed the Q2 connection target").
- **Social proof / precedent** — "Saudi and UAE utilities require this in their PV IPPs."
- **Authority** — an international standard, the grid code, a recognised consultant's study.
- **Liking** — genuine relationships built over time.
- **Scarcity** — real deadlines ("the air-freight slot expires on the 12th") — never invented urgency.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- **Splitting the difference** on a claim without entitlement analysis — indefensible to auditors and invites inflated future claims.
- **Negotiating without authority** — agreeing a figure in the room that the ministry cannot approve, then reneging and losing trust.
- **Spending all concessions at working level**, leaving nothing for the senior closing meeting where the counterpart expects a gesture.
- **Mistaking politeness for agreement** — "we will look into it" recorded as a commitment.
- **Cornering a counterpart publicly** — the facts were on your side, but the person could not concede without losing face.
- **Ignoring the next game** — a "win" that leaves the contractor demotivated for the remaining 18 months of construction.`,
        },
        {
          kind: "checklist",
          title: "Negotiation preparation checklist",
          items: [
            "Positions and interests of both sides written down",
            "BATNA for both sides assessed; expected award and reservation prices computed",
            "Entitlement analysis (clauses, records, delay method) supports your target",
            "Options that trade different currencies (time, money, milestones, guarantees, waivers)",
            "Objective criteria identified and documents at hand",
            "Your authority confirmed in writing; approvals and prior review timeline known",
            "Concession plan, including what is held back for the senior meeting",
            "Who attends, who speaks, and how the outcome will be recorded and signed",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask the contractor in a claim negotiation",
          items: [
            "Which contemporaneous records support each element of the quantum?",
            "Which delay-analysis method did you use, and what does it show for concurrent delay?",
            "What matters most to you: time, cash flow or the final amount?",
            "If we agree the EOT, what firm milestone can you commit to?",
            "Who on your side has authority to sign a full and final settlement?",
          ],
        },
        { kind: "scenario", scenario: "m13-s6" },
        { kind: "scenario", scenario: "m13-s7" },
        {
          kind: "feynman",
          prompt:
            "Explain to a finance colleague why MEWRE should settle a claim at KD 1.55 m when the expected value of litigating is KD 1.76 m plus KD 0.25 m costs — and why the settlement must still be justified clause by clause.",
          keyPoints: [
            "Reservation price = expected award + own dispute costs; both sides' costs create the ZOPA",
            "KD 1.55 m is inside the ZOPA and below the Employer's reservation price",
            "Public money requires the settlement to rest on contractual entitlement and substantiated quantum",
            "Engineer's consultation/determination provides the defensible basis",
            "Trade time (EOT) for commitments; obtain a full and final settlement for the events",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m13-l05-q1",
      type: "mcq",
      prompt: "What creates the ZOPA in a claim settlement where both parties estimate the same expected award?",
      options: ["The contractor's opening position", "The two parties' dispute costs", "The contract price", "The Engineer's fee"],
      answer: 1,
      explanation: md`With the same expected award $EV$, the Employer's ceiling is $EV + C_E$ and the contractor's floor is $EV - C_C$; the gap equals $C_E + C_C$ — the value settlement saves.`,
      concepts: ["m13.batna-zopa"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "m13-l05-q2",
      type: "multi",
      prompt: "Which are principles of interest-based negotiation? (Select all that apply.)",
      options: ["Separate the people from the problem", "Open with an extreme anchor to win", "Focus on interests, not positions", "Invent options for mutual gain", "Insist on objective criteria"],
      answer: [0, 2, 3, 4],
      explanation: md`Fisher and Ury's four principles. Extreme anchors destroy credibility; anchor with a justified figure instead.`,
      concepts: ["m13.interest-based"],
      difficulty: 1,
    },
    {
      id: "m13-l05-q3",
      type: "decision",
      prompt: md`You are the PM in a claim negotiation. The contractor's regional director proposes: "Let's split the difference between our KD 3.2 m and your KD 1.2 m — KD 2.2 m — and move on." What do you do?`,
      options: [
        { text: "Agree — it saves time and legal costs", score: 0, feedback: "KD 2.2 m exceeds the Employer's reservation price in this case and is not supported by entitlement — indefensible to auditors." },
        { text: "Decline courteously; explain the ministry can only settle on substantiated entitlement; walk through the Engineer's assessment and invite evidence for any items they believe are undervalued; explore EOT and milestone options", score: 1, feedback: "Objective criteria keep the discussion defensible and give the contractor a face-saving path: concede to evidence, not to you." },
        { text: "Walk out to show strength", score: 0.1, feedback: "Damages the relationship and the next game without improving your position." },
        { text: "Counter with 'split' at KD 1.7 m", score: 0.4, feedback: "A number without a justification just restarts positional haggling." },
      ],
      explanation: md`With public money, the criterion is entitlement under the Contract. Use it as the objective standard that both sides can accept without losing face.`,
      concepts: ["m13.claims-settlement", "m13.interest-based"],
      difficulty: 2,
    },
    {
      id: "m13-l05-q4",
      type: "mcq",
      prompt: "A senior contractor executive says 'إن شاء الله, we will deliver the recovery programme next week.' What is the best professional response?",
      options: [
        "Record it as a firm contractual commitment",
        "Thank him, and confirm the date and content in the minutes and, if the obligation is contractual, through the formal instruction",
        "Challenge him publicly to commit properly",
        "Ignore it as meaningless",
      ],
      answer: 1,
      explanation: md`High-context communication: respect the expression, and convert intention into a written, dated commitment through the proper channel.`,
      concepts: ["m13.gulf-culture"],
      difficulty: 1,
    },
    {
      id: "m13-l05-q5",
      type: "mcq",
      prompt: "A contractor's site team is about to energise a cable without a valid permit-to-work. Which conflict mode is appropriate?",
      options: ["Collaborating", "Compromising", "Competing", "Accommodating"],
      answer: 2,
      explanation: md`Safety and integrity are where *competing* — asserting your position firmly and immediately — is right. Discuss process improvements collaboratively afterwards.`,
      concepts: ["m13.conflict-modes"],
      difficulty: 1,
    },
    {
      id: "m13-l05-q6",
      type: "short",
      prompt: "Using the trust equation, describe three concrete behaviours that would raise your Assistant Undersecretary's trust in you during your first six months.",
      rubric: [
        "Names the components: credibility, reliability, intimacy, self-orientation",
        "At least one behaviour on credibility (accurate numbers, admitting unknowns)",
        "At least one on reliability (kept commitments, timely follow-ups)",
        "At least one on intimacy or reducing self-orientation (discretion, no surprises, credit upward)",
        "Behaviours are concrete and ministry-relevant",
      ],
      modelAnswer:
        "Trust = (credibility + reliability + intimacy) / self-orientation. (1) Credibility: every number I give is checked; when I don't know, I say so and reply by the promised date. (2) Reliability: I deliver the weekly one-page status every Thursday without being asked and meet every deadline I set myself. (3) Intimacy and low self-orientation: I tell her about problems before anyone else does, keep sensitive matters discreet, and present successes as the sector's, not mine.",
      explanation: md`Trust is built by small, repeated proofs. Self-orientation divides all the rest, so visible credit-seeking is the fastest way to lose it.`,
      concepts: ["m13.trust-leadership"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m13-l05-f1", front: "BATNA", back: "Best Alternative To a Negotiated Agreement — what you do if talks fail; it sets your reservation price." },
    { id: "m13-l05-f2", front: "ZOPA for a claim (same EV estimate)", back: md`$[EV - C_C,\ EV + C_E]$ — width equals combined dispute costs.` },
    { id: "m13-l05-f3", front: "Four principles of principled negotiation", back: "People vs problem · interests not positions · options for mutual gain · objective criteria." },
    { id: "m13-l05-f4", front: "Why not split the difference on a claim at MEWRE?", back: "Public money: settlement must be justified by contractual entitlement and substantiated quantum, defensible to auditors." },
    { id: "m13-l05-f5", front: "Trust equation", back: md`$T = (C + R + I)/S$ — credibility, reliability, intimacy over self-orientation.` },
    { id: "m13-l05-f6", front: "Face (ماء الوجه) in negotiation", back: "Avoid cornering counterparts publicly; give a dignified path to concede (objective criteria, senior gesture)." },
    { id: "m13-l05-f7", front: "Five Thomas–Kilmann modes", back: "Competing · collaborating · compromising · avoiding · accommodating." },
    { id: "m13-l05-f8", front: "Trading currencies in claims", back: "Time (EOT), money, payment timing, milestones, guarantees, waivers — trade low-cost-to-you for high-value-to-them." },
  ],
  scenarios: [
    {
      id: "m13-s6",
      title: "The settlement meeting",
      dayInLife: true,
      context: md`You lead MEWRE's side in a settlement meeting on a KD 3.2 m prolongation claim. The Engineer's substantiated assessment is KD 1.55 m plus 45 days' EOT. Your Assistant Undersecretary has authorised you to agree up to the Engineer's assessment, subject to the usual approvals. The contractor's regional director has flown in.`,
      start: "a",
      concepts: ["m13.claims-settlement", "m13.gulf-culture", "m13.batna-zopa"],
      nodes: {
        a: {
          md: md`The meeting opens. How do you start?`,
          choices: [
            { text: "Coffee and courtesies, then thank them for coming, restate the shared goal (connection before summer), and propose to walk through the Engineer's assessment item by item", next: "b", score: 10, feedback: "Relationship first, then an objective frame both sides can work within." },
            { text: "Open immediately with 'our maximum is KD 1.2 m'", next: "c", score: 3, feedback: "Abrupt, and a number below your own Engineer's assessment undermines your credibility when the analysis is shared." },
          ],
        },
        b: {
          md: md`After two hours the contractor accepts most items but insists on KD 1.9 m, citing head-office pressure. It asks for a "gesture".`,
          choices: [
            { text: "Hold the money at KD 1.55 m (the defensible figure) but offer value elsewhere: EOT of 45 days confirmed promptly, faster payment of the settled sum after approvals, and retention release against a guarantee", next: "d", score: 10, feedback: "You give the director a story for head office (time, cash flow) without exceeding what the ministry can defend." },
            { text: "Agree KD 1.9 m to close", next: "e", score: 1, feedback: "Beyond your authority and the entitlement analysis." },
            { text: "End the meeting and refer to the DAAB", next: "e", score: 4, feedback: "Premature: there is a ZOPA and value left to trade." },
          ],
        },
        c: {
          md: md`The contractor produces your own Engineer's draft assessment showing KD 1.55 m. The atmosphere sours.`,
          choices: [{ text: "Reset: acknowledge the assessment and propose to work through it", next: "b", score: 5, feedback: "Recovered, but your credibility took a hit." }],
        },
        d: {
          md: md`The director agrees in principle. How do you close?`,
          choices: [
            { text: "Summarise the agreed terms in writing before leaving, make clear it is subject to internal approvals (and prior review if required), and agree that the Engineer will record it as an agreement under the Contract procedure", score: 10, feedback: "Written, conditional on approvals, and routed through the contractual mechanism — durable and defensible." },
            { text: "Shake hands and draft the paperwork next week", score: 5, feedback: "Memories diverge quickly; capture the terms before people leave the room." },
          ],
        },
        e: {
          md: md`Afterwards, your Assistant Undersecretary asks how the outcome can be justified to Financial Affairs and, if necessary, the Audit Bureau.`,
          choices: [{ text: "Prepare the justification", score: 2, feedback: "Without an entitlement basis, the justification is weak; the settlement may not be approved." }],
        },
      },
    },
    {
      id: "m13-s7",
      title: "The sceptical new Assistant Undersecretary",
      dayInLife: true,
      context: md`A new Assistant Undersecretary takes over your sector. In your first meeting she says, politely but clearly, that she prefers "people who have been in the ministry for years" and that she has heard you are "very private-sector".`,
      start: "a",
      concepts: ["m13.trust-leadership", "m13.protocol"],
      nodes: {
        a: {
          md: md`How do you respond in that first meeting?`,
          choices: [
            { text: "Thank her, acknowledge you have much to learn about ministry practice, and ask what she most needs from your project in the next three months", next: "b", score: 10, feedback: "Lowers self-orientation, shows respect for institutional experience, and focuses on her priorities." },
            { text: "List your achievements at Vanderlande to establish credibility", next: "c", score: 3, feedback: "Raises self-orientation exactly when she suspects it." },
          ],
        },
        b: {
          md: md`She asks for a weekly status note. What do you send?`,
          choices: [
            { text: "A one-page note every Thursday: BLUF, MW/KWD/date/risk, decisions needed, and anything she might hear about from others", next: "d", score: 10, feedback: "Reliability (every week), credibility (numbers), and no surprises." },
            { text: "The OE's monthly report forwarded each month", next: "d", score: 3, feedback: "Not what she asked for, and not your voice." },
          ],
        },
        c: {
          md: md`She nods politely. The next week, she asks a long-serving controller to "double-check" your memos.`,
          choices: [{ text: "Welcome the review and ask the controller for advice on ministry practice", next: "b", score: 6, feedback: "Turning a check into mentorship rebuilds trust and teaches you the house style." }],
        },
        d: {
          md: md`Two months in, you learn that the contractor is about to escalate a dispute to the Undersecretary. She does not know.`,
          choices: [
            { text: "Tell her immediately, with the facts and your recommended response, before the escalation arrives", score: 10, feedback: "Protecting your superior from surprise is the single strongest trust-builder." },
            { text: "Wait to see if the contractor actually escalates", score: 2, feedback: "If the Undersecretary hears first, you lose most of what you built." },
          ],
        },
      },
    },
  ],
};

export default lesson;
