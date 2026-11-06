import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz11-l02",
  title: "Getting paid by a Kuwaiti public body: tenders, direct contracting and research collaboration",
  summary:
    "A Kuwaiti ministry or institute can pay Mizan through a CAPT tender, through direct contracting (KWD 75,000 today, a reported KWD 1 m per financial year once Decree-Law 94/2026 takes effect around late December 2026), or not pay at all and collaborate on research. Each route has its own signatory, timeline, paperwork and traps. Pick the route on purpose, keep research and procurement separate, and never write the specification you intend to bid on.",
  minutes: 75,
  objectives: [
    "You can route a proposed Mizan analytics contract with a Kuwaiti public entity to CAPT tender, direct contracting or research collaboration, before and after Law 94/2026 takes effect",
    "You can test a multi-year analytics fee against the direct-contracting limit and the reported Audit Bureau prior-review threshold",
    "You can explain how a KISR research collaboration differs from a service purchase in payment, IP, publication and conflict of interest",
    "You can respond professionally when asked to draft a tender specification or to split an order",
  ],
  concepts: [
    {
      id: "mz11.route-to-contract",
      name: "Route to contract with a Kuwaiti public buyer",
      description:
        "The legal path by which a public entity pays for Mizan's work: CAPT public tender, direct contracting below the limit, subcontract under an existing prime contract, or no payment under a research collaboration. The route sets who signs, how long it takes and what can go wrong.",
      competency: "mz-business",
      related: ["m11.procurement-regimes", "m11.capt-role", "fc04.gulf-gov-procurement"],
    },
    {
      id: "mz11.direct-contract-window",
      name: "Direct-contracting window under Law 94/2026",
      description:
        "Once Decree-Law 94/2026 is in force (about 27 Dec 2026), an entity may reportedly contract directly up to KWD 1 m per financial year for the same items without CAPT approval; Audit Bureau prior review (reported above KWD 100,000) and internal delegations still apply. A window for analytics services, not a loophole.",
      competency: "mz-business",
      related: ["m11.law-94-2026", "m11.anti-splitting", "m11.audit-prior-review"],
    },
    {
      id: "mz11.research-vs-procurement",
      name: "Research collaboration vs service procurement",
      description:
        "A research collaboration (e.g. with KISR) shares effort and publishes results under an agreement on IP and publication; it is not a purchase and cannot later stand in for one. A service contract is procured under the tenders law with deliverables, fees and acceptance.",
      competency: "mz-business",
      related: ["mz11.route-to-contract", "mz11.publication-rights"],
    },
    {
      id: "mz11.spec-neutrality",
      name: "Specification neutrality and prior involvement",
      description:
        "A firm that drafts the specification for a tender it later bids in invites disqualification, award challenges and audit findings. Offer public, performance-based input (methods, standards, open data) instead of writing the buyer's tender documents.",
      competency: "mz-business",
      related: ["m11.clarifications", "m11.tender-sequence"],
    },
  ],
  sections: [
    // ------------------------------------------------------------------ THEORY
    {
      layer: "theory",
      title: "Three ways a public body can pay you, and one way it cannot",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Mizan's Kuwaiti buyers on the state side are MEWRE (as owner of state plants) and KISR (as operator and research body). If a meeting ends with "send us a proposal", the next question is not price; it is which legal route lets this entity pay you, who signs, and how many months that takes. Get the route wrong and a friendly yes turns into an irregular contract, an audit finding with your name on it, or a tender you are disqualified from because you helped write it.`,
        },
        {
          kind: "xref",
          to: "m11-l01",
          note: "Track 0: the Public Tenders Law 49/2016 and its amendments, CAPT, thresholds, the anti-splitting test and the Law 94/2026 changes (as gazetted on 27 Sep 2026). Read it first; this lesson applies it to an analytics seller.",
        },
        {
          kind: "xref",
          to: "fc04-l08",
          note: "Founder Core: enterprise and Gulf government procurement in general (RFx, vendor onboarding, why leverage sits before the tender).",
        },
        {
          kind: "md",
          md: md`## The routes

| Route | When it applies | Who signs | Typical time to first payment | What you need |
|---|---|---|---|---|
| **CAPT public tender** | Above the direct-contracting limit for the same item in the financial year | CAPT runs the procedure; the entity's committee evaluates; Audit Bureau prior review above its threshold | Many months (tender, evaluation, award, audit, signature) | Commercial licence, supplier registration, bid bond, Arabic documents, local-content compliance |
| **Direct contracting** | Below KWD 75,000 under the current rule; up to a reported KWD 1 m per FY for the same items once Law 94/2026 is in force | The entity, within its internal delegation of authority; Audit Bureau above its threshold | Weeks to a few months | Quotation, technical offer, justification memo by the entity, registration as a supplier |
| **Subcontract under a prime** | The entity already has an O&M, monitoring or consultancy contract with scope that covers your work | The prime contractor (with the entity's consent if the contract requires it) | Fastest, if the scope fits | Prime's vendor onboarding; check local-content and subcontracting clauses |
| **Research collaboration** | Joint research (method, paper, open dataset) with KISR or a university | The institute's management under its research agreement process | No payment for services; possibly grant funding | Research agreement or MoU: IP, data, publication, confidentiality |

The route that is **not** available: using a research collaboration, a "free trial" or a series of small orders to deliver what is really a recurring commercial service, so that the service is never procured. That is the anti-splitting problem in a different costume.`,
        },
        { kind: "equation", formula: "m11-aggregation-test" },
        { kind: "equation", formula: "mz11-contract-fy-value" },
        {
          kind: "md",
          md: md`## What Law 94/2026 changes for an analytics seller

Decree-Law No. 94 of 2026 was published in Kuwait Al-Youm (issue 1810) on 27 September 2026 and takes effect three months after publication, around 27 December 2026. As reported by law-firm and press summaries (the full text was not read in research):

- **Direct contracting rises** from the KWD 75,000 CAPT threshold to **KWD 1,000,000 per financial year for the same items or works**, without CAPT approval. For software and analytics fees in the tens of thousands of KWD per year, that moves most first contracts from "tender" to "direct", if the entity is willing.
- **Local and commission agents are banned** in public procurement. A foreign analytics or hardware vendor (a soiling software partner, a Chinese integrator) cannot rely on a commission agent. A Kuwaiti company that actually delivers work is a legitimate local partner; a Kuwaiti name on a foreign product is not.
- **Local content tightens**: reported minimums of 30 % local products and 30 % of works subcontracted to local registered contractors, and a price margin for registered SMEs. If Mizan is a registered Kuwaiti SME, that can help; confirm eligibility and how analytics services are classified.

What does **not** change: the Audit Bureau's prior review (reported threshold KWD 100,000), the entity's internal delegation limits, the anti-splitting test, and the fact that an official must justify the direct choice in writing.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Check before relying on it",
          md: md`(1) The final wording of Law 94/2026 and its executive regulations, including transitional rules for procurements started before the effective date. (2) Whether the KWD 100,000 Audit Bureau threshold tests the annual or the total contract value. (3) How "same items" is defined for a software or analytics service. (4) Whether research institutes such as KISR procure under the same law and thresholds or under their own regulations. (5) SME registration requirements for the price margin. Confirm each with the buyer's legal affairs department and a Kuwaiti lawyer before you design an offer around it.`,
        },
        {
          kind: "flow",
          title: "Routing a proposed analytics contract",
          steps: [
            { label: "Is it research or a service?", detail: "Joint method and publication with no service fee: research agreement. Recurring deliverables for operations: procurement." },
            { label: "Does an existing contract cover it?", detail: "If an O&M or monitoring prime's scope fits, subcontract with consent." },
            { label: "FY value for the same item", detail: "Sum this fee and other direct orders for the same service in the financial year." },
            { label: "Compare with the limit", detail: "KWD 75,000 before ~27 Dec 2026; reported KWD 1 m per FY after. Above: CAPT tender." },
            { label: "Audit Bureau and delegation", detail: "Above the reported KWD 100,000: plan for prior review; check who can sign at that value." },
            { label: "Paper the route", detail: "The entity writes the justification; you supply a clean technical and financial offer." },
          ],
          caption: "The entity owns the routing decision; your job is to make the right route easy and never to suggest a wrong one.",
        },
      ],
    },
    // ------------------------------------------------------------------ APPLIED
    {
      layer: "applied",
      title: "Testing an offer against the thresholds",
      blocks: [
        {
          kind: "worked",
          title: "A three-year analytics service for a state-owned plant (illustrative)",
          mode: "worked",
          given: md`Illustrative only. After a successful research phase, a ministry-owned PV plant asks Mizan for a soiling analytics and cleaning-recommendation service: KWD 36,000 per year for three years. The entity has no other direct orders for the same service this financial year (Kuwait's financial year runs 1 April to 31 March). Two cases: an order signed in November 2026 (current rules) and one signed in February 2027 (Law 94/2026 in force, if the transitional rules allow).`,
          steps: [
            { md: md`**Values.** $V_{\text{FY}} = 36{,}000$ KWD in the year; $V_{\text{total}} = 36{,}000 \times 3 = 108{,}000$ KWD.` },
            { md: md`**November 2026.** A three-year contract worth KWD 108,000 exceeds the KWD 75,000 CAPT threshold: CAPT tender. Signing three one-year orders of KWD 36,000 to stay below it would be splitting the same requirement.` },
            { md: md`**February 2027.** $V_{\text{FY}} = 36{,}000 \le 1{,}000{,}000$: within the reported direct-contracting limit, provided the entity justifies the direct choice and its delegation allows.` },
            { md: md`**Audit Bureau.** $V_{\text{total}} = 108{,}000$ exceeds the reported KWD 100,000 prior-review threshold, if the threshold tests the total value. Plan for the review in the timeline rather than cutting the term to two years ($72{,}000$) just to avoid it: a term chosen to dodge oversight is the kind of thing auditors look for.` },
            { md: md`**Sales plan.** Prepare the offer so that it can survive either route: a clear scope, a performance specification the entity can reuse, a price per year with no hidden extras, and a statement of any prior involvement.` },
          ],
          result: md`The same KWD 36,000 per year service is a CAPT tender in November 2026 and a direct contract in February 2027, with Audit Bureau review likely either way. Timing your proposal to the effective date is legitimate; splitting or shortening the term to avoid a gate is not.`,
        },
        {
          kind: "worked",
          title: "Your turn: headroom for a second plant",
          mode: "faded",
          given: md`Illustrative. Law 94/2026 is in force. In the current financial year the same entity has already placed direct orders for plant performance-monitoring services of KWD 610,000 and KWD 280,000. Mizan proposes the same service for a second plant at KWD 48,000 per year.`,
          steps: [
            { md: md`Existing FY total for the same item: $610{,}000 + 280{,}000$.`, hidden: true, check: { prompt: "Existing FY total (KWD)", answer: 890000, unit: "KWD", tolerance: { abs: 1 } } },
            { md: md`Remaining headroom under the reported KWD 1 m limit: $1{,}000{,}000 - 890{,}000$.`, hidden: true, check: { prompt: "Headroom (KWD)", answer: 110000, unit: "KWD", tolerance: { abs: 1 } } },
            { md: md`KWD 48,000 fits this year. Next year, if the other orders recur, the entity's headroom depends on its total; that is its planning problem, but you should know it before promising a renewal date.` },
          ],
          result: md`Headroom KWD 110,000, so a KWD 48,000 direct order fits this financial year. Whether "plant performance monitoring" and "soiling analytics" count as the same item is for the entity's legal affairs to decide.`,
        },
      ],
    },
    // ------------------------------------------------------------------ FIELD
    {
      layer: "field",
      title: "Research first, procurement second, and never mixed",
      blocks: [
        {
          kind: "md",
          md: md`## How a KISR research collaboration differs

The Shagaya Phase I work is targeted as a soiling analytics pilot with KISR researchers as methodology partner (in preparation, not signed). That is a **research collaboration**, and it should be documented and run as one.

| | Research collaboration | Service procurement |
|---|---|---|
| **Purpose** | Answer a method question (KISR confirmed there is no standard way to turn operational data into cleaning decisions) | Deliver an operational result (recommendations, reports, uptime) |
| **Money** | No service fee; each side carries its own costs; possibly joint grant funding | Fee under a procured contract |
| **Deliverable** | Validated method, joint paper, open dataset | Scoped deliverables with acceptance |
| **IP** | Background IP stays with each party; foreground IP and data use agreed in advance | Licence terms in the contract |
| **Publication** | Joint, with review periods; negotiated up front | Usually restricted by confidentiality |
| **Signatory** | Institute management under its research-agreement process | The entity under the tenders law |

Two rules keep the routes clean:

1. **Do not let research become free operations.** When the method works, the entity will want it run monthly. That is a service and must be procured. Say so early: "When we move from validating the method to running it for operations, that becomes a service contract under your procurement rules."
2. **Do not write the tender you will bid on.** If the entity later tenders soiling analytics, a specification you drafted can disqualify you or invite a challenge from a competitor. Contribute in public form instead: the published paper, an open method, the planned open-source Kuwait dust and soiling atlas, and references to IEC 61724-1. A performance specification built on public standards helps the buyer and keeps you eligible.

## Paperwork to have ready before anyone asks

Being ready shortens every route. Most items take weeks.`,
        },
        {
          kind: "checklist",
          title: "Kuwait public-sector readiness for an analytics seller",
          items: [
            "Kuwaiti commercial licence with an activity that covers software, data analysis or engineering consultancy",
            "Supplier registration with the target entity and, for tenders, with CAPT (confirm the current registration process)",
            "Bank relationship able to issue bid and performance guarantees",
            "Standard technical offer and price schedule in English and Arabic",
            "Data-protection and cybersecurity statement: where data is stored, who can access it, read-only connections",
            "Written statement of prior involvement (research collaboration, any input to specifications)",
            "Local-content and SME position under Law 94/2026, once the regulations are clear",
          ],
        },
        {
          kind: "ask",
          title: "Questions for the entity's procurement or legal affairs",
          items: [
            "Which regime applies to this purchase: CAPT tender, direct contracting, or your own regulations?",
            "Does Law 94/2026 apply to procurements started now, or only after the effective date?",
            "How do you define the same item for software and analytics services?",
            "Does the Audit Bureau threshold apply to annual or total contract value for multi-year services?",
            "Would our research collaboration affect our eligibility in a later tender, and how should we declare it?",
          ],
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Ways to lose a Kuwaiti public deal you had already won",
          md: md`**Monthly small orders** for one recurring service (splitting). **A shortened term** designed only to stay under the Audit Bureau threshold. **Drafting the buyer's specification** and then bidding. **Paying anyone a commission** to help with a public award (agents are reportedly banned under Law 94/2026, and success fees to intermediaries for public awards are an integrity risk regardless). **Starting work before signature** because an official said "go ahead": verbal approvals are not contracts, and work done before a contract is often unpaid.`,
        },
        {
          kind: "scenario",
          scenario: "mz11-s1",
        },
        {
          kind: "question",
          question: {
            id: "mz11-l02-p1",
            type: "short",
            prompt: md`A KISR department head tells you: "The method looks promising. Send us something so we can continue next year." Write the one-page note you would send back. It must propose the route (or routes) for next year, state what stays research and what becomes a service, give an indicative structure of any fee in KWD (illustrative), name the approvals you expect, and say how you will avoid prior-involvement problems if a tender follows.`,
            rubric: [
              "Separates the research continuation (method, paper, open data) from any operational service, and proposes the right instrument for each",
              "Routes any service correctly against the direct-contracting limit and Law 94/2026 timing, without splitting or term-shortening to avoid gates",
              "Gives an illustrative fee structure in KWD with term and scope, labelled illustrative",
              "Names expected approvals (internal delegation, Audit Bureau if above the threshold) and asks the entity to confirm regime and thresholds",
              "Addresses prior involvement explicitly: declares the collaboration, offers public performance-based input, does not offer to draft the tender",
              "Professional, short, in a form an official can forward",
            ],
            modelAnswer: md`**Subject: Soiling analytics, Shagaya Phase I: proposal for 2027 (draft for discussion)**

Thank you for the discussion. We propose to keep two tracks separate.

**1. Research (continue under our collaboration).** Complete the validation of the soiling method against the 2018 to 2019 cleaning arm failure and the temperature-corrected PR baseline (IEC 61724-1), and submit a joint paper. Each party carries its own costs. We propose to publish the method and an anonymised summary dataset as part of an open Kuwait soiling atlas, subject to the plant owner's approval.

**2. Operational service (only if the institute wants the method run for operations).** Monthly soiling estimates, cleaning recommendations and a quarterly review for the PV plant. Illustrative fee: KWD 30,000 per year for two years (KWD 60,000 total). We understand this would be procured under the institute's rules; once Decree-Law 94/2026 is in force (about 27 December 2026) it may fall within direct contracting, subject to your legal affairs' confirmation. If you prefer a tender, we will respond to it like any other bidder.

**Approvals.** Internal delegation for the service order; we will plan for Audit Bureau review if the value or your rules require it.

**Prior involvement.** We will declare the research collaboration in any offer. We will not draft tender documents; we are glad to point your team to public standards and our published method for any specification you write.

Could your procurement team confirm which regime and thresholds apply?`,
            explanation: md`The note gives the official an easy, legitimate path and protects Mizan's eligibility later.`,
            concepts: ["mz11.route-to-contract", "mz11.research-vs-procurement", "mz11.spec-neutrality", "mz11.direct-contract-window"],
            difficulty: 2,
          },
        },
        { kind: "xref", to: "m11-l02", note: "Track 0: tender sequence, bid guarantees, evaluation methods and clarifications, if the analytics service goes to CAPT tender." },
        { kind: "xref", to: "m11-l04", note: "Track 0: Audit Bureau prior review, national preference and local content." },
        { kind: "sources", refs: ["mz11-r2", "mz11-r3", "mz11-r4", "mz11-r16", "mz11-r1"] },
      ],
    },
  ],
  scenarios: [
    {
      id: "mz11-s1",
      title: "The official asks you to write the specification",
      context: md`Illustrative, February 2027. Law 94/2026 is in force. After your research presentation, a section head at a public entity that owns a PV plant says: "We will tender a soiling analytics service this year. You know the subject better than we do. Can you send us the technical specification and a price, and we will take it from there?"`,
      start: "a",
      concepts: ["mz11.spec-neutrality", "mz11.route-to-contract", "mz11.direct-contract-window"],
      nodes: {
        a: {
          md: md`What do you reply?`,
          choices: [
            { text: "Send a detailed specification built around Mizan's method and data pipeline, with a price.", next: "b", score: 1, feedback: "You may have just disqualified yourself, and a competitor can challenge the award as tailored." },
            { text: "Thank him, explain that writing the specification could make Mizan ineligible, and offer public material: the published method, IEC 61724-1 references and a list of outcomes a specification could require.", next: "c", score: 9, feedback: "Helpful and protects your eligibility and his process." },
            { text: "Suggest he skips the tender and places a direct order with you instead, since it is below KWD 1 m.", next: "d", score: 4, feedback: "Direct contracting may be lawful, but the choice of route is his, made in writing; pushing it looks self-serving." },
          ],
        },
        b: {
          md: md`Three months later the tender is published using your text. A competitor's clarification asks why the specification names a method only Mizan uses. CAPT or the entity's committee asks about the specification's origin.`,
          choices: [
            { text: "Deny any involvement.", score: 0, feedback: "Untrue and discoverable. This ends careers and companies." },
            { text: "Declare that you provided input and accept that the entity may amend the specification or exclude you.", score: 4, feedback: "Honest damage control, but the damage was avoidable." },
          ],
        },
        c: {
          md: md`He appreciates it but says: "Then at least tell me what a good offer should contain, so we are not fooled by weak bidders."`,
          choices: [
            { text: "Give him a short, vendor-neutral list of evaluation questions (method validated against what reference, data access needs, error metrics, security) that any bidder could answer, and say you will send the same to anyone who asks.", score: 10, feedback: "Public, neutral, useful. You have raised the bar in a way that favours real competence without writing the tender." },
            { text: "Offer to sit on the evaluation committee as an adviser.", score: 0, feedback: "A bidder cannot evaluate its own tender. Never." },
          ],
        },
        d: {
          md: md`He hesitates: "Our legal affairs prefer a tender for new services."`,
          choices: [
            { text: "Accept it, offer public material as in the better option, and prepare to bid.", score: 8, feedback: "Right: the route is his decision. Prepare to win the tender on merit." },
            { text: "Ask a senior contact to call legal affairs and push for direct contracting.", score: 1, feedback: "Using relationships to change a rule-governed decision is the line mz11 lesson 4 and m13 tell you not to cross." },
          ],
        },
      },
    },
  ],
  quiz: [
    {
      id: "mz11-l02-q1",
      type: "mcq",
      prompt: md`When does Decree-Law 94/2026 take effect, as reported?`,
      options: ["On publication, 27 Sep 2026", "About 27 Dec 2026, three months after publication", "1 April 2027, the start of the financial year", "Only after the National Assembly ratifies it"],
      answer: 1,
      explanation: md`Published in Kuwait Al-Youm issue 1810 on 27 September 2026; effective three months after publication. With the Assembly dissolved, legislation proceeds by decree-law.`,
      concepts: ["mz11.direct-contract-window"],
      difficulty: 1,
    },
    {
      id: "mz11-l02-q2",
      type: "numeric",
      prompt: md`Illustrative, Law 94/2026 in force. An entity has placed direct orders of KWD 450,000 and KWD 380,000 for the same service this financial year. What is the maximum further direct order for the same service (KWD)?`,
      answer: 170000,
      tolerance: { abs: 1 },
      unit: "KWD",
      explanation: md`$1{,}000{,}000 - (450{,}000 + 380{,}000) = 170{,}000$ KWD. Above that, CAPT.`,
      concepts: ["mz11.direct-contract-window"],
      difficulty: 1,
    },
    {
      id: "mz11-l02-q3",
      type: "multi",
      prompt: md`Which features belong to a research collaboration rather than a service procurement? (Select all.)`,
      options: [
        "Each party carries its own costs",
        "Publication rights negotiated up front",
        "A monthly fee for operational recommendations",
        "Background IP stays with each party",
        "Acceptance of deliverables by the operations department",
      ],
      answer: [0, 1, 3],
      explanation: md`Fees for operational deliverables with acceptance are a service and must be procured.`,
      concepts: ["mz11.research-vs-procurement"],
      difficulty: 1,
    },
    {
      id: "mz11-l02-q4",
      type: "decision",
      prompt: md`November 2026. An official proposes three one-year orders of KWD 36,000 each for your analytics service "to avoid the tender". What do you do?`,
      options: [
        { text: "Accept: each order is below KWD 75,000.", score: 0, feedback: "Splitting one requirement to stay below the threshold is a violation, and the supplier is exposed too." },
        { text: "Explain that a three-year service is one requirement, propose either a CAPT tender now or a direct contract once Law 94/2026 is in force, and ask legal affairs to confirm.", score: 1, feedback: "Correct and protective of both of you." },
        { text: "Propose a free first year so no procurement is needed, then charge from year two.", score: 0.2, feedback: "A free year does not remove the need to procure the paid years, and it looks like an inducement." },
      ],
      explanation: md`Route the whole requirement; time the offer to the effective date if that helps, never split.`,
      concepts: ["mz11.route-to-contract", "mz11.direct-contract-window"],
      difficulty: 2,
    },
    {
      id: "mz11-l02-q5",
      type: "mcq",
      prompt: md`Why should Mizan avoid drafting a public entity's tender specification for soiling analytics?`,
      options: [
        "Specifications must be written in Arabic only",
        "Prior involvement in drafting can lead to disqualification or an award challenge",
        "CAPT writes all specifications itself",
        "Specifications are confidential and cannot be shared with suppliers",
      ],
      answer: 1,
      explanation: md`The entity writes its tender documents; a bidder who drafted them creates an unfair advantage. Contribute public, neutral material instead.`,
      concepts: ["mz11.spec-neutrality"],
      difficulty: 1,
    },
    {
      id: "mz11-l02-q6",
      type: "order",
      prompt: md`Order the routing steps for a proposed analytics contract.`,
      items: [
        "Decide whether it is research or a service",
        "Check whether an existing prime contract covers it",
        "Sum the financial-year value for the same item",
        "Compare with the direct-contracting limit",
        "Check Audit Bureau review and signing delegation",
      ],
      explanation: md`Classify, look for an existing vehicle, then test values against limits and gates.`,
      concepts: ["mz11.route-to-contract"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz11-l02-f1", front: "Four routes to a Kuwaiti public buyer", back: "CAPT tender; direct contracting below the limit; subcontract under an existing prime; research collaboration (no service fee).", concepts: ["mz11.route-to-contract"] },
    { id: "mz11-l02-f2", front: "Direct-contracting limit before and after Law 94/2026", back: "KWD 75,000 (CAPT threshold) until about 27 Dec 2026; reportedly KWD 1 m per financial year for the same items after.", concepts: ["mz11.direct-contract-window"] },
    { id: "mz11-l02-f3", front: "What Law 94/2026 does not remove", back: "Audit Bureau prior review (reported above KWD 100,000), internal delegation limits, the anti-splitting test, written justification.", concepts: ["mz11.direct-contract-window"] },
    { id: "mz11-l02-f4", front: "Research becomes a service when...", back: "The entity wants the method run for operations with recurring deliverables. Then it must be procured.", concepts: ["mz11.research-vs-procurement"] },
    { id: "mz11-l02-f5", front: "Instead of writing the buyer's specification", back: "Offer public, neutral material: published method, IEC 61724-1 references, open data, and evaluation questions any bidder could answer.", concepts: ["mz11.spec-neutrality"] },
    { id: "mz11-l02-f6", front: "Illustrative KWD 36,000/yr for 3 years", back: "Nov 2026: KWD 108,000 total above KWD 75,000, so CAPT tender. Feb 2027: within the KWD 1 m FY limit, so direct is possible; plan for Audit Bureau review.", concepts: ["mz11.direct-contract-window", "mz11.route-to-contract"] },
  ],
};

export default lesson;
