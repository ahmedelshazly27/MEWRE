import { md, type Question } from "../../schema";

const exam: Question[] = [
  {
    id: "sh04-x1",
    type: "numeric",
    prompt: md`Illustrative. A model provider offers USD 12k non-exclusive, or asks for category exclusivity at one hackathon. Two competitors could join with probabilities 0.5 and 0.4, paying USD 9k and USD 6k, each with USD 1k delivery cost. Suhail must receive the price net of a 5 % withholding tax. What gross exclusive price (USD k, before VAT) should the contract state at minimum?`,
    answer: 18.95,
    tolerance: { abs: 0.05 },
    unit: "USD k",
    explanation: md`$E = 0.5\times(9-1) + 0.4\times(6-1) = 4.0 + 2.0 = 6.0$ USD k. Minimum net exclusive price $= 12 + 6 = 18$ USD k. Gross up for withholding: $G = 18/(1-0.05) = 18.95$ USD k. (Competitor revenues are taken as net amounts received.) Grossing up by adding 5 % instead would give 18.90 and leave Suhail short.`,
    concepts: ["sh04.exclusivity", "sh04.vat-withholding"],
    difficulty: 3,
  },
  {
    id: "sh04-x2",
    type: "decision",
    prompt: md`Illustrative. In January 2027 a sovereign AI lab (fit score 4.1, slow decisions) and a regional seed VC (fit score 3.8, fast) both want to talk. Your first hackathon is in 10 weeks and has no cash partner yet. How do you sequence?`,
    options: [
      { text: "Focus only on the lab: highest score.", score: 0.3, feedback: "The lab's cycle likely exceeds 10 weeks; you would reach the event unfunded." },
      { text: "Close the VC as first partner for this event, and open the lab in parallel for a programme track later in the year.", score: 1, feedback: "Right: the fast yes funds the first event and proves the format; the anchor relationship starts now because its cycle is long." },
      { text: "Wait until the lab decides before talking to the VC, to offer it exclusivity.", score: 0.1, feedback: "Unpriced exclusivity and a stalled pipeline: both costly." },
      { text: "Postpone the hackathon to the summer.", score: 0.2, feedback: "Summer is the slowest Gulf period; it pushes everything later." },
    ],
    explanation: md`Fit scores rank; timing and components decide sequence. A fast, credible first partner funds the event; the anchor partner's long cycle means starting now.`,
    concepts: ["sh04.fit-score", "sh04.weighted-forecast"],
    difficulty: 2,
  },
  {
    id: "sh04-x3",
    type: "numeric",
    prompt: md`Illustrative. Assumed conversions: P2 to P3 0.5, P3 to P4 0.6, P4 to P5 0.8, P5 to paid 0.9. In-period pipeline: USD 40k at P2, USD 30k at P3, USD 20k at P4. What is the weighted forecast in USD k?`,
    answer: 36,
    tolerance: { abs: 0.05 },
    unit: "USD k",
    explanation: md`$p_{P4} = 0.8\times0.9 = 0.72$; $p_{P3} = 0.6\times0.72 = 0.432$; $p_{P2} = 0.5\times0.432 = 0.216$. Forecast $= 40\times0.216 + 30\times0.432 + 20\times0.72 = 8.64 + 12.96 + 14.40 = 36.00$ USD k.`,
    concepts: ["sh04.weighted-forecast"],
    difficulty: 2,
  },
  {
    id: "sh04-x4",
    type: "multi",
    prompt: md`A government-linked entity offers to fund 50 % of Suhail Season. Which conditions can you accept?`,
    options: [
      "Its minister gives the opening keynote.",
      "It approves the final speaker list.",
      "Its logo appears as host partner.",
      "It receives the full attendee list with emails.",
      "A clause allowing either side to exit for serious reputational harm, with pro-rata refund.",
      "Category exclusivity on AI models across all Suhail events for three years.",
    ],
    answer: [0, 2, 4],
    explanation: md`A keynote, host branding and mutual reputational termination are normal. Speaker approval breaks editorial independence; bulk attendee data needs per-partner consent; long exclusivity on models contradicts an open-model community. At 50 % of revenue, concentration also needs a written exception under the policy.`,
    concepts: ["sh04.alignment-independence", "sh04.partner-policy", "sh04.data-partner"],
    difficulty: 2,
  },
  {
    id: "sh04-x5",
    type: "numeric",
    prompt: md`Partner revenue for the year: USD 45k, 25k, 15k, 10k, 5k. What is the effective number of partners ($1/\text{HHI}$)? Round to one decimal.`,
    answer: 3.3,
    tolerance: { abs: 0.05 },
    explanation: md`Total 100; shares 0.45, 0.25, 0.15, 0.10, 0.05. HHI $= 0.2025 + 0.0625 + 0.0225 + 0.01 + 0.0025 = 0.30$. $1/0.30 = 3.3$. Five partners behave like about 3.3 equal ones, and the top share of 45 % exceeds a 30 % limit.`,
    concepts: ["sh04.revenue-concentration"],
    difficulty: 2,
  },
  {
    id: "sh04-x6",
    type: "decision",
    prompt: md`Illustrative. KISR, which is Mizan's targeted methodology partner for the Shagaya soiling pilot, invites Suhail to co-host an AI-for-energy hackathon. You lead both Mizan and Suhail. What do you do?`,
    options: [
      { text: "Accept and lead the negotiation yourself: you know the people best.", score: 0.2, feedback: "You would sit on both sides of related relationships; even if nothing improper happens, it can appear so." },
      { text: "Disclose the Mizan relationship in the conflict register, recuse yourself from the Suhail decision and terms, let another lead negotiate, and keep Mizan out of the hackathon's content and data.", score: 1, feedback: "Right: disclose, recuse, separate. The co-hosting may well be good for Suhail; the process makes it defensible." },
      { text: "Decline: any overlap is a conflict.", score: 0.4, feedback: "Conflicts are managed, not always avoided; declining may lose a good partner unnecessarily." },
      { text: "Accept and include a Mizan challenge track to make use of the overlap.", score: 0, feedback: "Using Suhail to advance Mizan's commercial interest with the same institution is the conflict in its clearest form." },
    ],
    explanation: md`The conflict register and recusal exist for exactly this case: the founder's other ventures dealing with the same institutions.`,
    concepts: ["sh04.conflict-of-interest"],
    difficulty: 3,
  },
  {
    id: "sh04-x7",
    type: "numeric",
    prompt: md`Illustrative. A Saudi sponsor pays a fee that must net USD 25k to a non-resident Suhail entity after an assumed 5 % withholding; Suhail is required to charge 15 % VAT on the fee (assumption to confirm). What is the invoice total in USD k?`,
    answer: 30.26,
    tolerance: { abs: 0.05 },
    unit: "USD k",
    explanation: md`$G = 25/0.95 = 26.32$; $I = 26.32\times1.15 = 30.26$ USD k. Both the withholding and the VAT treatment must be confirmed with a Saudi adviser before quoting.`,
    concepts: ["sh04.vat-withholding"],
    difficulty: 2,
  },
  {
    id: "sh04-x8",
    type: "mcq",
    prompt: md`Which statement about MOUs and contracts is correct?`,
    options: [
      "An MOU always binds because it is signed.",
      "A contract titled 'MOU' can never bind.",
      "Binding force depends on the wording and the parties' intent; an MOU should state which clauses, if any, bind.",
      "MOUs with government entities include funding by default.",
    ],
    answer: 2,
    explanation: md`Titles do not decide; wording and intent do. State binding clauses explicitly and never treat an MOU as money.`,
    concepts: ["sh04.mou-vs-contract"],
    difficulty: 1,
  },
  {
    id: "sh04-x9",
    type: "order",
    prompt: md`Order the steps for a new partner from first contact to renewal.`,
    items: [
      "Qualify: budget, mandate, fit, timing, champion",
      "Conflict register check and sanctions screening",
      "Proposal reviewed with the decision owner",
      "Contract signed and invoice accepted",
      "Payment received",
      "Benefits delivered and results report sent",
      "Renewal conversation before the partner's budget is set",
    ],
    explanation: md`Qualify first, screen before P3, then proposal, contract, cash, delivery and report, and renewal timed to the partner's budget calendar.`,
    concepts: ["sh04.partner-stages", "sh04.sanctions-screening", "sh04.budget-calendar"],
    difficulty: 2,
  },
  {
    id: "sh04-x10",
    type: "short",
    prompt: md`It is November 2026. Write the email (in English, about 200 words) you would send to the developer-relations lead of a Gulf AI lab that has released open Arabic weights, after a warm introduction, proposing a first conversation about a programme-partner track at Suhail's first Arabic NLP hackathon in 2027. Use only dated public facts about the lab, state what Suhail is (and that it has not launched yet), propose the trade, and ask for the right next step.`,
    rubric: [
      "Honest about Suhail's stage: planned, starting January 2027, no past events or numbers claimed.",
      "Refers to the lab's public work with a correct date and no invented programmes.",
      "Proposes a clear two-sided trade with a measurable benefit for the lab.",
      "Mentions budget timing (2027 budgets being set) without pressure.",
      "Asks for a specific next step (a 30-minute call, who else should join) and is short and professional.",
    ],
    modelAnswer: md`Subject: Builders on open Arabic weights: Suhail hackathon track, 2027

Dear [Name],

[Mutual contact] suggested I write. I am [name], founder of Suhail (suhail.build), a builder community for the Arab world that starts its programme in January 2027 with hackathons, a newsletter and a planned open research arm. We have not run an event yet, so I will not quote numbers we do not have.

Your team's release of [model] as open weights on [date] is exactly what our builders need to work with. We would like to propose a track at our first Arabic NLP hackathon (planned for spring 2027) where teams build on your model. Your team would see real applications and failure cases from builders across the region, with a public results write-up and a usage report within two weeks; we would ask for mentors, a judge and support for the track's prizes or compute.

I understand 2027 budgets are being set now, so I wanted to reach you early rather than ask for anything this week. Could we have a 30-minute call in the next two weeks? If someone in research or partnerships should join, please include them.

With thanks,
[Name]`,
    explanation: md`The email is honest about stage, uses only dated public facts, proposes a measurable two-sided trade and asks for a small, specific next step timed to the budget calendar.`,
    concepts: ["sh04.value-exchange", "sh04.partner-qualification", "sh04.budget-calendar"],
    difficulty: 2,
  },
];

export default exam;
