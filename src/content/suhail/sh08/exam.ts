import { md, type Question } from "../../schema";

const exam: Question[] = [
  {
    id: "sh08-x1",
    type: "numeric",
    prompt: md`Illustrative: Suhail keeps 5 lead seats filled at monthly retention 0.94, and recruiting plus onboarding one lead costs about 13 founder hours. How many founder hours a year go into refilling seats?`,
    answer: 46.8,
    tolerance: { abs: 0.2 },
    unit: "h/yr",
    explanation: md`Recruits $H = 12 \times 5 \times 0.06 = 3.6$ a year; $3.6 \times 13 = 46.8$ hours. Raising retention to 0.97 would halve it (1.8 recruits, about 23 hours), which is the business case for matching, recognition and realistic hours.`,
    concepts: ["sh08.volunteer-retention", "sh08.volunteer-pipeline"],
    difficulty: 2,
  },
  {
    id: "sh08-x2",
    type: "numeric",
    prompt: md`Pledges total 32 h/week and the measured availability factor is 0.65. To run at a load factor of 0.75, what is the maximum weekly demand, in hours?`,
    answer: 15.6,
    tolerance: { abs: 0.05 },
    unit: "h/week",
    explanation: md`$C = 0.65 \times 32 = 20.8$ h/week; $D_{\max} = 0.75 \times 20.8 = 15.6$ h/week. A plan at 18.7 h/week would run at 0.90 load, with waits about nine times task duration.`,
    concepts: ["sh08.availability-factor", "sh08.load-factor", "sh08.utilisation-delay"],
    difficulty: 2,
  },
  {
    id: "sh08-x3",
    type: "numeric",
    prompt: md`Three leads are available 17:00 to 21:00 UTC, 16:00 to 19:30 UTC and 18:00 to 22:00 UTC. How long is the live overlap, in hours?`,
    answer: 1.5,
    tolerance: { abs: 0.01 },
    unit: "h",
    explanation: md`Latest start 18:00, earliest end 19:30, so $O = 1.5$ hours. Enough for a 30-minute review with room to spare; everything else stays asynchronous.`,
    concepts: ["sh08.async-first"],
    difficulty: 1,
  },
  {
    id: "sh08-x4",
    type: "numeric",
    prompt: md`A workstream has an owner and a trained backup, each unavailable in a given week with probability 0.25, independently. What is the probability of at least one stalled week in a 12-week quarter? (2 decimals)`,
    answer: 0.54,
    tolerance: { abs: 0.005 },
    explanation: md`Weekly stall $p^2 = 0.0625$; over the quarter $1 - 0.9375^{12} = 0.54$. With one owner it would be $1 - 0.75^{12} = 0.97$. When people are often away, a third able person is worth considering, and shared absences (Ramadan, holidays) make the real number worse.`,
    concepts: ["sh08.bus-factor"],
    difficulty: 2,
  },
  {
    id: "sh08-x5",
    type: "numeric",
    prompt: md`Suhail's policy opens a paid role when the coverage ratio is at least 1.5. A 0.8 FTE role costs USD 40,000 a year fully loaded. What trailing average monthly gross margin is needed, in USD?`,
    answer: 5000,
    tolerance: { abs: 1 },
    unit: "USD/month",
    explanation: md`$\bar{G}^* = 1.5 \times 40{,}000/12 = 5{,}000$ USD per month, together with the reserve test.`,
    concepts: ["sh08.paid-trigger"],
    difficulty: 1,
  },
  {
    id: "sh08-x6",
    type: "numeric",
    prompt: md`The events board has 8 items in progress and an average lead time of 4 weeks. What is the throughput, in items per week?`,
    answer: 2,
    tolerance: { abs: 0.01 },
    unit: "items/week",
    explanation: md`Little's law: $X = L/W = 8/4 = 2$ items a week. Halving WIP to 4 would halve lead time to 2 weeks at the same throughput.`,
    concepts: ["sh08.wip-limit"],
    difficulty: 1,
  },
  {
    id: "sh08-x7",
    type: "decision",
    prompt: md`In June 2027 Suhail's trailing margin covers a paid role 1.3 times (policy: 1.5). The Partnerships lead, who brought in most of the revenue, says they will leave unless they are paid now. What do you do?`,
    options: [
      { text: "Thank them specifically for the revenue, show the numbers against the published trigger, agree what would get to 1.5 and by when, and offer what the policy allows now (expenses, a reference, introductions, first consideration for the role). Accept that they may step down to contributor or leave.", score: 1, feedback: "Right: the policy protects every lead and Suhail's cash. Breaking it for one person makes it worthless." },
      { text: "Pay them from the reserve; they are the revenue engine.", score: 0.2, feedback: "You fund a salary without a run rate, and every other lead learns that threats work." },
      { text: "Offer equity instead.", score: 0, feedback: "Informal equity in a sponsor-funded community is a promise you cannot keep, made under pressure." },
      { text: "Lower the trigger to 1.3 for this case.", score: 0.3, feedback: "Changing the rule for one person is the same as having no rule. Change it, if at all, by the review process and for everyone." },
    ],
    explanation: md`A transition policy is valuable exactly when someone pushes on it. Keep it, explain it, and make the honest offer.`,
    concepts: ["sh08.paid-trigger", "sh08.two-tier-team", "sh08.recognition"],
    difficulty: 3,
  },
  {
    id: "sh08-x8",
    type: "multi",
    prompt: "Which design choices raise monthly volunteer retention? (Select all that apply.)",
    options: [
      "Matching each role to the volunteer's dominant motives",
      "A commitment ladder that allows stepping down without leaving",
      "Planning the quarter at a load factor of 0.95 to make the most of the team",
      "Specific, public recognition on a weekly schedule",
      "A small equal stipend for all leads",
      "Charters with real decision rights",
    ],
    answer: [0, 1, 3, 5],
    explanation: md`Matching, a ladder, specific recognition and real autonomy serve the motives and needs that keep unpaid people. Running at 0.95 load burns people out; small stipends risk crowding out.`,
    concepts: ["sh08.volunteer-functions", "sh08.commitment-ladder", "sh08.recognition", "sh08.lead-charter", "sh08.crowding-out", "sh08.load-factor"],
    difficulty: 2,
  },
  {
    id: "sh08-x9",
    type: "order",
    prompt: "Order the set-up steps for Suhail's volunteer team before January 2027.",
    items: [
      "Take legal advice on the entity and the status of volunteers",
      "Write the five lead charters and the DACI table",
      "Build the Q1 capacity plan, cut list and bus-factor table",
      "Set up the handbook, board and access register",
      "Onboard the leads and run the first weekly review",
    ],
    explanation: md`The entity decides what volunteer roles can legally be; charters define the roles; the capacity plan sizes the work to the people; tools hold all of it; then people start.`,
    concepts: ["sh08.volunteer-legal-status", "sh08.lead-charter", "sh08.load-factor", "sh08.handbook", "sh08.onboarding"],
    difficulty: 2,
  },
  {
    id: "sh08-x10",
    type: "decision",
    prompt: md`The newsletter quality has slipped, and you consider taking over editing every issue yourself until it recovers. What do you do?`,
    options: [
      { text: "Agree a quality bar with the Editorial lead, review two issues against it together, add a trained contributor as reviewer, and stay out of the edit after that.", score: 1, feedback: "Right: you fix the system (a standard, a reviewer, a backup) without removing the lead's autonomy or your hours from Afterwave." },
      { text: "Edit every issue yourself until quality is back.", score: 0.2, feedback: "Quality may improve, but you remove the lead's autonomy and competence, which are what keep them, and you become the bottleneck." },
      { text: "Replace the Editorial lead.", score: 0.3, feedback: "Premature: the problem may be capacity or an unclear standard, not the person." },
      { text: "Reduce the frequency and say nothing about quality.", score: 0.4, feedback: "Frequency cuts can help capacity, but the quality standard still needs to be explicit." },
    ],
    explanation: md`Founder takeover is the most common way to destroy volunteer motivation. Make the standard explicit and build a second reviewer instead.`,
    concepts: ["sh08.self-determination", "sh08.lead-charter", "sh08.bus-factor"],
    difficulty: 2,
  },
  {
    id: "sh08-x11",
    type: "short",
    prompt: md`A sponsor offers USD 12,000 for 2027 and asks how Suhail, with an unpaid team, can guarantee delivery of three hackathons. Write the **half-page answer** you would send, explaining how the team is organised to deliver (charters and single owners, capacity planning at a safe load, backups and access, cadence) without inventing traction or names.`,
    rubric: [
      "Names the single owner role for sponsor fulfilment and for each event, and the Approver for the contract",
      "Explains capacity planning with an availability factor and a target load, and that the plan includes these events",
      "Describes backups and organisation-owned accounts so delivery does not depend on one person",
      "Describes the reporting cadence the sponsor will see (for example a fulfilment page and post-event report within 14 days)",
      "Honest about being a volunteer team in its first year, with no invented traction, names or guarantees beyond the plan",
    ],
    modelAnswer: md`Thank you for the offer. Suhail is in its first year and run by a team of volunteer leads, so we organise for reliability rather than assume it.

**One owner per commitment.** Our Partnerships lead owns your account and fulfilment; our Events and Programming lead owns each hackathon's delivery. The contract is approved by the founder, who stays your escalation point.

**Sized to the team.** We plan each quarter from the hours our leads actually deliver, not what they pledge, and keep the plan below 80% of that capacity. The three hackathons are in the plan; other work is deferred first if capacity drops.

**No single point of failure.** Each event has a trained backup who has the run sheet and access, and all our systems and accounts belong to Suhail rather than to individuals.

**What you will see.** A shared fulfilment page listing every benefit with its owner and date, updated weekly; a check-in call two weeks before each event; and a written report within 14 days after each one, with attendance and outcomes against the goals we agree with you.

We cannot promise what a large events company would. We can promise a named owner, a plan sized to our real capacity, and that you will know early if anything changes.`,
    explanation: md`Sponsors buy reliability. The answer should show the mechanism (owners, capacity, backups, reporting) rather than enthusiasm.`,
    concepts: ["sh08.single-owner", "sh08.load-factor", "sh08.bus-factor", "sh08.access-hygiene", "sh08.meeting-design"],
    difficulty: 3,
  },
];

export default exam;
