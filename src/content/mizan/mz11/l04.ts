import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz11-l04",
  title: "Relationships, wasta and trust, done ethically: the seller's side",
  summary:
    "In Kuwait and the Gulf, relationships decide who gets heard, how fast and how candidly. They must never decide outcomes that rules govern. As a seller you control both sides of that line: what you ask for, what you offer, which intermediaries you use and what you write down. Build trust through credibility, reliability and discretion, use introductions for access, and run a small, written integrity practice from day one.",
  minutes: 60,
  objectives: [
    "You can apply the access-versus-outcome test to a seller's requests and offers, not only to an official's decisions",
    "You can explain why warm introductions change sales arithmetic in the Gulf and compute the effect",
    "You can recognise intermediary and gift red flags, including the reported agent ban under Law 94/2026",
    "You can write a one-page integrity practice for Mizan that a partner's compliance team would accept",
  ],
  concepts: [
    {
      id: "mz11.access-vs-outcome-seller",
      name: "Access vs outcome, from the seller's side",
      description:
        "A seller may use relationships to get introductions, meetings, honest feedback and timely attention; never to obtain confidential information, influence an evaluation, award or approval, or give anything of value to someone who decides.",
      competency: "mz-business",
      related: ["m13.relationship-capital", "m13.gulf-culture", "mz11.agent-ban"],
    },
    {
      id: "mz11.trust-ladder",
      name: "Trust ladder with a Gulf buyer",
      description:
        "Introduction (who vouches), competence shown (useful insight, published work), reliability (promises kept), discretion (confidences kept, no data shared across clients), advocacy (they introduce you). Each rung takes time and can be lost in one step.",
      competency: "mz-business",
      related: ["m13.trust-leadership", "fc04.champion-test"],
    },
    {
      id: "mz11.agent-ban",
      name: "Intermediaries and the reported agent ban",
      description:
        "Law 94/2026 reportedly bans local and commission agents in Kuwaiti public procurement. Any intermediary paid on success for a public award, or whose value is who he knows rather than what he delivers, is an integrity risk for Mizan and its partners.",
      competency: "mz-business",
      related: ["m11.law-94-2026", "mz11.access-vs-outcome-seller"],
    },
    {
      id: "mz11.integrity-record",
      name: "Written integrity practice",
      description:
        "A short written policy and log: gifts and hospitality limits, rules for intermediaries, dealing with public employees (including researchers), declarations of prior involvement, and a record of improper approaches. Partners, investors and buyers' compliance teams will ask for it.",
      competency: "mz-business",
      related: ["mz11.agent-ban", "fc04.vendor-onboarding"],
    },
  ],
  sections: [
    // ------------------------------------------------------------------ THEORY
    {
      layer: "theory",
      title: "Why relationships matter, and where they stop",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You are Kuwaiti-connected, Arabic-speaking and building Mizan in a market where people buy from people they know. That is a real advantage over a foreign software vendor. It is also the fastest way to destroy the company if it slides from access into outcomes: a single improper approach on a public award can void a contract, end a KISR collaboration, scare off a foreign partner and follow you into every due-diligence call with investors. The line has to be clear in your head before anyone tests it.`,
        },
        {
          kind: "xref",
          to: "m13-l01",
          note: "Track 0: how a ministry works, relationship capital and wasta from the official's side (the access-versus-outcome rule, declining without humiliation). This lesson applies it to what a seller asks for and offers.",
        },
        {
          kind: "xref",
          to: "m13-l05",
          note: "Track 0: negotiation and Gulf business culture (face, indirect refusals, hospitality, the pace of trust).",
        },
        {
          kind: "md",
          md: md`## Why trust carries more weight here

Three mechanisms make relationships heavier in Gulf B2B and B2G sales than in, say, Dutch enterprise software:

1. **Thin market signals for new vendors.** There are few local references, analyst reports or peer reviews for a start-up. A trusted person's word substitutes for missing evidence.
2. **Collective, slow decisions.** Committees, delegations and audit gates mean many people must be comfortable. A known face reduces the perceived personal risk of each one.
3. **Small networks.** Kuwait's energy sector is a few hundred people across MEWRE, KISR, KAPP, the oil sector, the contractors and the families behind them. Reputation travels in days.

A useful model is the trust equation from professional services:`,
        },
        { kind: "equation", formula: "mz11-trust-equation" },
        {
          kind: "md",
          md: md`For Mizan: **credibility** is the KISR methodology work and published method (the 2020 Shagaya PV paper is the reference point); **reliability** is sending what you promised, when you promised; **intimacy** is the official or engineer telling you what actually worries him; **self-orientation** is visible when every conversation steers to your product or your deal. The denominator is the one people forget.

## The seller's version of access versus outcome

The rule from Track 0 holds: **relationships may buy access and attention, never outcomes the rules decide.** As a seller you control both what you request and what you offer:`,
        },
        {
          kind: "matrix",
          title: "What a seller may ask for and offer",
          xAxis: ["Asks for access or attention", "Asks for or affects an outcome"],
          yAxis: ["Offers nothing of value to a decider", "Offers something of value to a decider"],
          cells: [
            { label: "Legitimate", detail: "Introductions, meetings, a fair hearing, feedback on your proposal, the public schedule, a technical workshop open to all." },
            { label: "Improper", detail: "Asking where you stand in an evaluation, for a competitor's price, for a specification tilted your way, for a committee member to 'look at it again'." },
            { label: "Handle with care", detail: "Hospitality beyond trivial courtesy, travel, sponsored trips, or a job or contract for a relative, even if 'only' for access. Keep to written limits and declare." },
            { label: "Corrupt", detail: "Anything of value tied to an award, evaluation or approval: success fees, gifts, jobs, 'consultancy' to an official or a relative. Walk away and record it." },
          ],
          caption: "Top left is how relationships should work. The bottom row is where most real trouble starts, often with a well-meant gesture.",
        },
        {
          kind: "md",
          md: md`## Intermediaries and the agent ban

Decree-Law 94/2026 reportedly bans local and commission agents in Kuwaiti public procurement (see m11 lesson 1). For Mizan that has two consequences:

- **Do not use one.** A person who offers to "arrange" a public award for a percentage is offering an outcome, and his fee is now reportedly unlawful as well as risky.
- **Be the real local partner, not a name.** Foreign software or hardware partners (a soiling software partner, Chinese integrators for controls, PPC/EMS, BESS or cleaning robots) may approach Mizan as a local face. Partner only where Mizan delivers real work (integration, analytics, local support), and price it as work.

Beyond Kuwaiti law, foreign partners bring their home laws and compliance programmes. Large international companies run due diligence on local partners and often apply anti-bribery rules with extraterritorial reach. Expect a questionnaire; a written integrity practice answers most of it.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Legal points to confirm",
          md: md`The research brief does not cover Kuwaiti anti-corruption law. From general knowledge: Kuwait established its Anti-Corruption Authority (Nazaha) under Law No. 2 of 2016, and bribery of public officials is a criminal offence. The scope of conflict-of-interest rules for researchers at public institutes such as KISR, gift thresholds, and how the Law 94/2026 agent ban is worded and enforced must be confirmed with a Kuwaiti lawyer before you write them into a policy.`,
        },
      ],
    },
    // ------------------------------------------------------------------ APPLIED
    {
      layer: "applied",
      title: "Why introductions change the arithmetic (legitimately)",
      blocks: [
        {
          kind: "worked",
          title: "Cold outreach vs warm introductions to Gulf asset managers (illustrative)",
          mode: "worked",
          given: md`Illustrative assumptions, not Mizan data. Goal: 6 qualified opportunities with Gulf IPP owners or O&M contractors in the next two quarters. Meeting-to-qualified-opportunity rate 25 % either way. Cold outreach turns 3 % of contacts into a first meeting; a warm introduction from someone the buyer trusts turns 40 % into a first meeting. Each cold contact costs about 0.5 hours of research and writing; each warm introduction about 3 hours (identifying the right referrer, briefing him, following up, thanking him).`,
          steps: [
            { md: md`**Meetings needed.** $6 / 0.25 = 24$ first meetings.` },
            { md: md`**Cold.** Contacts $= 24/0.03 = 800$; hours $= 800 \times 0.5 = 400$ hours.` },
            { md: md`**Warm.** Introductions $= 24/0.40 = 60$; hours $= 60 \times 3 = 180$ hours.` },
            { md: md`**Reading.** Warm introductions halve the founder time here and, more importantly, the Gulf market may not contain 800 relevant asset-management contacts at all. The introduction buys **access**: a first meeting where the buyer is willing to listen. It buys nothing after that: the 25 % qualification rate is the same, because the product and the business case still have to convince.` },
          ],
          result: md`About 400 hours cold vs 180 hours warm for the same 24 meetings and 6 opportunities. Relationships legitimately compress the top of the funnel; they do not and must not move the bottom.`,
        },
        {
          kind: "worked",
          title: "Your turn: a smaller market",
          mode: "faded",
          given: md`Illustrative. You want 4 qualified opportunities in Kuwait's future Phase III project companies and O&M contractors. Qualification rate 30 %. Warm introductions convert 50 % to a first meeting.`,
          steps: [
            { md: md`First meetings needed: $4/0.30$, rounded up.`, hidden: true, check: { prompt: "First meetings needed", answer: 14, tolerance: { abs: 0 } } },
            { md: md`Warm introductions needed: $14/0.50$.`, hidden: true, check: { prompt: "Warm introductions needed", answer: 28, tolerance: { abs: 0 } } },
            { md: md`Twenty-eight introductions is most of the relevant people in a market this small. Every introduction you waste with a weak pitch or an improper request is not recoverable.` },
          ],
          result: md`14 meetings from 28 introductions. In a small market, trust is the scarce resource and reputation travels; protect it like cash.`,
        },
      ],
    },
    // ------------------------------------------------------------------ FIELD
    {
      layer: "field",
      title: "Practising it",
      blocks: [
        {
          kind: "md",
          md: md`## Habits that build trust

- **Arrive with something useful.** A short note on a soiling pattern visible in public data, a relevant paper, a question nobody asked them before. Credibility is earned in the first ten minutes.
- **Send what you promised, when you promised.** Minutes the same day, the follow-up note within the week. Reliability is the cheapest rung and the one most start-ups miss.
- **Keep confidences, including data.** Never show one plant's data to another buyer, even anonymised, without written permission. Say so explicitly; it is a differentiator against vendors who demo with customer data.
- **Lower self-orientation.** Ask about their problem, accept "not now", introduce them to someone useful even when there is nothing in it for Mizan.
- **Work through institutions.** With KISR researchers, agree collaboration through KISR, not through personal arrangements; credit them in publications; never pay a public employee personally.
- **Hospitality within limits.** Coffee, a working lunch, a modest token at Eid are courtesy; trips, expensive gifts and anything around a live evaluation are not. Write your limits down.

## Red flags in an intermediary

A fee tied to winning a public award; vagueness about what work he does; insistence on confidentiality about who he knows; requests for cash, offshore payment or payment to a third party; references to "taking care of" a committee; refusal to sign an anti-bribery clause. Any one of these: decline politely and record it.`,
        },
        {
          kind: "bilingual",
          title: "Declining an improper request without loss of face",
          en: md`We value the relationship and your help very much. The procurement rules do not allow us to do this, and we would not want to put you or anyone in a difficult position. We will submit our offer through the official channel and are happy to answer any question there.`,
          ar: "نقدّر علاقتنا وحرصكم على مساعدتنا كثيراً. أنظمة الشراء لا تسمح لنا بذلك، ولا نريد أن نضعكم أو نضع أي أحد في موقف محرج. سنقدّم عرضنا عبر القناة الرسمية، ويسعدنا الرد على أي استفسار من خلالها.",
        },
        {
          kind: "checklist",
          title: "Mizan's minimum integrity practice",
          items: [
            "One-page anti-bribery and gifts policy signed by both founders and every hire",
            "Gifts and hospitality register (given and received) with a value limit",
            "No success fees to intermediaries on public awards; written scope and fixed fees for any adviser",
            "Anti-bribery clause in partner and adviser contracts",
            "Declaration of prior involvement and relationships in every public offer",
            "Log of improper approaches: date, who, what was asked, what you did",
            "Data confidentiality rule: no buyer's data shown to another without written consent",
          ],
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Where good people slip",
          md: md`**"Just asking where we stand"** during an evaluation. **Hiring a decision-maker's relative** as a part-time adviser. **A free pilot offered as a personal favour** to an official rather than as an institutional proposal. **A partner's agent** who joins your meetings and later invoices the partner on success. **Sharing a competitor's price** that someone mentioned to you. Each feels small in the moment; each is the kind of fact that ends up in an audit report.`,
        },
        { kind: "scenario", scenario: "mz11-s2" },
        {
          kind: "question",
          question: {
            id: "mz11-l04-p1",
            type: "short",
            prompt: md`Write Mizan's one-page integrity practice for sales in Kuwait and the Gulf, written so that a foreign partner's compliance team would accept it. Cover: dealing with public officials and public researchers, gifts and hospitality (with a value limit, illustrative), intermediaries and advisers, prior involvement and declarations, data confidentiality, and how an improper approach is handled and recorded.`,
            rubric: [
              "States the access-versus-outcome rule explicitly and applies it to what Mizan asks for and offers",
              "Sets concrete gift and hospitality rules with a value limit and a register",
              "Bans success fees to intermediaries on public awards and requires written scope, fixed fees and anti-bribery clauses for advisers; references the reported Law 94/2026 agent ban",
              "Covers public researchers (e.g. KISR): collaboration through the institution, no personal payments, credit in publications",
              "Requires declarations of prior involvement and a data confidentiality rule across buyers",
              "Defines how improper approaches are declined (politely) and logged, and who in Mizan reviews the log",
            ],
            modelAnswer: md`**Mizan integrity practice (v1)**

**1. Principle.** We use relationships for access and attention: introductions, meetings, feedback. We never seek or accept influence over outcomes that rules govern: tenders, evaluations, approvals, hiring.

**2. Public officials and researchers.** We deal with public bodies through their official channels. Collaboration with researchers at public institutes (such as KISR) is agreed with the institution; we never pay a public employee personally, and we credit researchers in joint publications. We never ask for confidential information, including evaluation status or competitors' prices.

**3. Gifts and hospitality.** Allowed: refreshments, working meals, modest seasonal tokens up to an illustrative USD 50 value. Not allowed: cash, travel, gifts during a live procurement, anything to a member of an evaluation committee. Every gift given or received above token value is recorded in the register.

**4. Intermediaries and advisers.** No success fees on public awards. Any adviser has a written scope of real work, a fixed or time-based fee, and signs our anti-bribery clause. We do not act as, or use, a commission agent in Kuwaiti public procurement (reportedly banned under Decree-Law 94/2026). We partner with foreign vendors only where Mizan delivers real work.

**5. Declarations.** Every public offer declares any prior involvement (research collaboration, input to specifications) and relevant relationships.

**6. Data.** No buyer's data is shown to anyone else without written consent, even anonymised.

**7. Improper approaches.** Declined politely, citing the rules ("the procurement rules do not allow us to do this"). Logged within 48 hours (date, person, request, response) and reviewed by both founders monthly; serious cases go to our lawyer.

Signed by both founders; reviewed annually.`,
            explanation: md`Short, concrete and auditable beats long and aspirational.`,
            concepts: ["mz11.integrity-record", "mz11.access-vs-outcome-seller", "mz11.agent-ban"],
            difficulty: 2,
          },
        },
        { kind: "sources", refs: ["mz11-r2", "mz11-r17", "mz11-r21", "mz11-r1"] },
      ],
    },
  ],
  scenarios: [
    {
      id: "mz11-s2",
      title: "The well-connected friend",
      context: md`Illustrative. A Kuwaiti businessman you have known socially for years hears that a public entity plans to procure a soiling analytics service. Over dinner he says: "I know the people on that committee. Give me 8 % of the contract and I will make sure it goes your way. Everybody does it."`,
      start: "a",
      concepts: ["mz11.access-vs-outcome-seller", "mz11.agent-ban", "mz11.integrity-record"],
      nodes: {
        a: {
          md: md`How do you respond at the table?`,
          choices: [
            { text: "Accept: it is only 8 % and he is a friend.", next: "b", score: 0, feedback: "This is paying for an outcome: corrupt, reportedly unlawful as an agent fee under Law 94/2026, and fatal if discovered." },
            { text: "Thank him warmly, say the procurement rules do not allow it and you would not want to put him or anyone in a difficult position, and change the subject.", next: "c", score: 9, feedback: "Clear, polite, no loss of face for either of you." },
            { text: "Say you will think about it.", next: "d", score: 2, feedback: "Ambiguity is read as a yes in waiting, and it is now a conversation you have to explain." },
          ],
        },
        b: {
          md: md`Mizan wins. A year later a losing bidder complains and the award is reviewed. Payments to your friend's company appear in your accounts.`,
          choices: [
            { text: "Argue it was a consultancy fee.", score: 0, feedback: "A fee with no deliverable, tied to an award: nobody will believe it, and the contract and the company are at risk." },
          ],
        },
        c: {
          md: md`He laughs it off. Next morning, what do you do?`,
          choices: [
            { text: "Log the approach (date, what was offered, your answer) and tell your cofounder; carry on preparing a strong offer through the official channel.", score: 10, feedback: "That is the practice working. If questions arise later, you have a contemporaneous record." },
            { text: "Do nothing; it was just dinner talk.", score: 5, feedback: "The refusal was right, but a written record protects you if he later claims otherwise or approaches a partner." },
          ],
        },
        d: {
          md: md`He calls two days later asking for your answer.`,
          choices: [
            { text: "Decline clearly and politely now, then log both conversations.", score: 7, feedback: "Recovered, but it would have been easier at the table." },
            { text: "Suggest he talks to your foreign partner instead.", score: 0, feedback: "Passing a corrupt offer to a partner exposes both of you and ends the partnership when their compliance team finds out." },
          ],
        },
      },
    },
  ],
  quiz: [
    {
      id: "mz11-l04-q1",
      type: "multi",
      prompt: md`Which seller requests are legitimate uses of a relationship? (Select all.)`,
      options: [
        "Asking a mutual contact to introduce you to the head of a plant's performance team",
        "Asking an evaluation committee member where your bid stands",
        "Asking an official what worries him about soiling, before you write a proposal",
        "Asking someone to tell you a competitor's price",
        "Asking for a meeting slot before the summer recess",
      ],
      answer: [0, 2, 4],
      explanation: md`Access and attention are legitimate; evaluation status and competitors' prices are confidential outcome information.`,
      concepts: ["mz11.access-vs-outcome-seller"],
      difficulty: 1,
    },
    {
      id: "mz11-l04-q2",
      type: "mcq",
      prompt: md`In the trust equation $T = (C + R + I)/S$, which term is most damaged when every conversation steers to your product?`,
      options: ["Credibility C", "Reliability R", "Intimacy I", "Self-orientation S rises"],
      answer: 3,
      explanation: md`Self-orientation is the denominator: visible self-interest divides all the trust you built.`,
      concepts: ["mz11.trust-ladder"],
      difficulty: 1,
    },
    {
      id: "mz11-l04-q3",
      type: "numeric",
      prompt: md`Illustrative. You need 20 first meetings. Cold outreach converts 2.5 % of contacts to a meeting at 0.5 hours per contact. How many founder hours does cold outreach take?`,
      answer: 400,
      tolerance: { abs: 1 },
      unit: "hours",
      explanation: md`Contacts $= 20/0.025 = 800$; hours $= 800 \times 0.5 = 400$.`,
      concepts: ["mz11.trust-ladder"],
      difficulty: 1,
    },
    {
      id: "mz11-l04-q4",
      type: "decision",
      prompt: md`A foreign hardware integrator wants Mizan to be its Kuwait partner. Its regional manager suggests Mizan "just put our product in your name in the tender and keep 10 %". What do you do?`,
      options: [
        { text: "Agree: it is easy money.", score: 0, feedback: "That makes Mizan a commission agent in substance, reportedly banned in public procurement under Law 94/2026, and puts your name on obligations you cannot deliver." },
        { text: "Offer to partner only where Mizan delivers real work (integration, commissioning, analytics, local support), priced as work, with both companies' compliance terms in the contract.", score: 1, feedback: "Right: a real local partner, not a name." },
        { text: "Agree but keep it off paper.", score: 0, feedback: "Worse: hidden arrangements are exactly what audits and partner due diligence look for." },
      ],
      explanation: md`Be the real local partner; never a name on someone else's bid.`,
      concepts: ["mz11.agent-ban"],
      difficulty: 2,
    },
    {
      id: "mz11-l04-q5",
      type: "mcq",
      prompt: md`How should Mizan work with KISR researchers on the targeted Shagaya Phase I pilot?`,
      options: [
        "Pay the researchers personal consulting fees to speed things up",
        "Agree the collaboration with KISR as an institution, credit researchers in publications, and make no personal payments",
        "Avoid any formal agreement to keep it flexible",
        "Offer a researcher's relative a job to build goodwill",
      ],
      answer: 1,
      explanation: md`Public researchers are public employees; work through the institution and keep personal benefits out.`,
      concepts: ["mz11.access-vs-outcome-seller", "mz11.integrity-record"],
      difficulty: 1,
    },
    {
      id: "mz11-l04-q6",
      type: "order",
      prompt: md`Order the trust ladder from first contact to the strongest relationship.`,
      items: ["Introduction by someone who vouches", "Competence shown", "Reliability proven", "Discretion proven", "Advocacy: they introduce you"],
      explanation: md`Each rung builds on the one before; discretion and advocacy come only after repeated reliable behaviour.`,
      concepts: ["mz11.trust-ladder"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "mz11-l04-f1", front: "Seller's access-vs-outcome rule", back: "Ask for introductions, meetings, feedback and attention; never for confidential information or influence over awards, evaluations or approvals; never give value to a decider.", concepts: ["mz11.access-vs-outcome-seller"] },
    { id: "mz11-l04-f2", front: "Trust equation", back: md`$T = (C + R + I)/S$: credibility, reliability, intimacy over self-orientation.`, concepts: ["mz11.trust-ladder"] },
    { id: "mz11-l04-f3", front: "Law 94/2026 and intermediaries (reported)", back: "Local and commission agents banned in public procurement. No success fees on public awards; be a real local partner, not a name.", concepts: ["mz11.agent-ban"] },
    { id: "mz11-l04-f4", front: "Intermediary red flags", back: "Success fee on a public award, vague work, secrecy about contacts, cash or third-party payment, talk of 'taking care of' a committee, refusal of an anti-bribery clause.", concepts: ["mz11.agent-ban"] },
    { id: "mz11-l04-f5", front: "Minimum integrity practice", back: "Signed policy, gifts register with a limit, adviser rules, anti-bribery clauses, declarations of prior involvement, log of improper approaches, data confidentiality rule.", concepts: ["mz11.integrity-record"] },
    { id: "mz11-l04-f6", front: "Warm vs cold (illustrative)", back: "24 meetings: cold 800 contacts and about 400 hours; warm 60 introductions and about 180 hours. Same 25 % qualification afterwards.", concepts: ["mz11.trust-ladder"] },
  ],
};

export default lesson;
