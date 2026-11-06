import { md, type Question } from "../../schema";

const exam: Question[] = [
  {
    id: "fc09-x1",
    type: "numeric",
    prompt: md`A bad hire at Afterwave costs EUR 90,000 all in (illustrative). Net burn is EUR 45,000 per month. How many months of runway does the bad hire consume?`,
    answer: 2,
    tolerance: { abs: 0.01 },
    unit: "months",
    explanation: md`$90{,}000/45{,}000 = 2.0$ months. Expressing hiring risk in months of runway makes it comparable with the fundraising timeline: two months moves the raise trigger date by two months.`,
    concepts: ["fc09.bad-hire-cost", "fc09.runway"],
    difficulty: 1,
  },
  {
    id: "fc09-x2",
    type: "numeric",
    prompt: md`A candidate takes EUR 25,000/yr below market for 4 years. You assume retention $\rho = 0.6$, an exit worth EUR 250 m to common with probability 10%, and a strike-implied company value $V_K$ of EUR 5 m. What grant breaks even, risk-neutral? (percent, 2 decimals)`,
    answer: 0.69,
    tolerance: { abs: 0.01 },
    unit: "%",
    explanation: md`$g^* = 100{,}000 / [0.10 \times (0.6 \times 250\text{ m} - 5\text{ m})] = 100{,}000/14.5\text{ m} = 0.69\%$. A risk-averse candidate needs more; discounting over the years to exit would raise it further.`,
    concepts: ["fc09.salary-equity-tradeoff", "fc09.dilution-retention"],
    difficulty: 2,
  },
  {
    id: "fc09-x3",
    type: "numeric",
    prompt: md`A weekly 1-hour meeting has 4 attendees at a loaded EUR 80/h. Because it sits in the middle of a maker morning, each attendee also loses two extra switches of 20 minutes. What is the full annual cost over 48 weeks? (EUR)`,
    answer: 25600,
    tolerance: { abs: 10 },
    unit: "EUR/yr",
    explanation: md`Direct: $4 \times 1 \times 80 = 320$ EUR/week. Switching: $4 \times 2 \times (20/60) \times 80 = 213.3$ EUR/week. Total $533.3 \times 48 = 25{,}600$ EUR/yr, two-thirds more than the direct cost of EUR 15,360. Moving the meeting to the edge of the day removes most of the switching term.`,
    concepts: ["fc09.meeting-cost", "fc09.context-switching"],
    difficulty: 2,
  },
  {
    id: "fc09-x4",
    type: "numeric",
    prompt: md`Two states are equally likely. Action A pays EUR 400 k in state 1 and EUR -100 k in state 2; action B pays EUR 100 k in either state. What is the EVPI, in EUR k?`,
    answer: 100,
    tolerance: { abs: 0.5 },
    unit: "EUR k",
    explanation: md`Without information: EV(A) $= 150$, EV(B) $= 100$, so choose A: 150. With perfect information: choose A in state 1 (400) and B in state 2 (100): $0.5 \times 400 + 0.5 \times 100 = 250$. EVPI $= 250 - 150 = 100$ k. Note also that A has a 50% chance of a 100 k loss: check it against runway.`,
    concepts: ["fc09.value-of-information", "fc09.expected-value"],
    difficulty: 2,
  },
  {
    id: "fc09-x5",
    type: "numeric",
    prompt: md`Base rate: 40% of your Mizan stakeholder introductions lead to a data-sharing agreement (illustrative). After a first meeting, the counterpart asks for the data protection terms in writing. You estimate this request occurs in 60% of introductions that end in agreement and in 40% of those that do not. What is the updated probability of an agreement? (2 decimals)`,
    answer: 0.5,
    tolerance: { abs: 0.005 },
    explanation: md`LR $= 0.6/0.4 = 1.5$. Prior odds $= 0.4/0.6 = 0.667$; posterior odds $= 0.667 \times 1.5 = 1.0$; probability $= 0.50$. A modestly diagnostic signal moves the forecast modestly.`,
    concepts: ["fc09.base-rates"],
    difficulty: 2,
  },
  {
    id: "fc09-x6",
    type: "decision",
    prompt: md`Afterwave has 11 months of runway (illustrative). A raise takes about 6 months and you want a 3-month buffer. A strong solutions-engineer candidate accepts, which would cut runway to 9.5 months. Your board member suggests waiting until after the raise. What do you do?`,
    options: [
      { text: "Wait: preserving runway always comes first.", score: 0.3, feedback: "Runway matters, but the hire may produce the evidence (parallel pilots) the raise depends on; waiting has a cost too." },
      { text: "Hire, start investor conversations now instead of in 2 months (the trigger moves from 2 to 0.5 months), and write the decision and its expected effect on pilots in the decision journal.", score: 1, feedback: "Treats the hire and the raise as one decision, makes the timing consequence explicit and records the bet." },
      { text: "Hire and keep the original fundraising plan.", score: 0, feedback: "Ignores that the raise trigger has moved; you would start raising with too little buffer." },
    ],
    explanation: md`$t_{\text{start}} = R - (t_{\text{raise}} + t_{\text{buffer}})$: from $11 - 9 = 2$ to $9.5 - 9 = 0.5$ months. A hiring decision is also a fundraising-timing decision; show both to the board.`,
    concepts: ["fc09.runway", "fc09.first-ten-hires", "fc09.decision-journal"],
    difficulty: 3,
  },
  {
    id: "fc09-x7",
    type: "multi",
    prompt: "Which actions reduce the expected cost of a bad hire? (Select all that apply.)",
    options: [
      "Written 90-day outcomes that shorten the time to detect a problem",
      "A paid work sample scored against criteria written in advance",
      "Longer notice periods in early contracts",
      "A backchannel reference call",
      "Debriefing as a group before anyone records a score",
    ],
    answer: [0, 1, 3],
    explanation: md`Faster detection cuts the $c_m t_d$ term; work samples and independent references reduce the probability of a bad hire. Longer notice raises $t_x$; group debriefs before scoring add anchoring error.`,
    concepts: ["fc09.bad-hire-cost", "fc09.work-sample", "fc09.reference-check", "fc09.structured-interview"],
    difficulty: 2,
  },
  {
    id: "fc09-x8",
    type: "order",
    prompt: "Order the steps of hiring Afterwave's first senior executive, from first to last.",
    items: [
      "Write the scorecard and agree it with cofounders",
      "Run structured interviews and a work sample",
      "Reference and backchannel calls",
      "Model the offer: salary, grant, dilution and break-even",
      "Board approves the option grant",
      "Start with a written 90-day plan",
    ],
    explanation: md`The scorecard defines the scale; evidence comes before the offer; the board must approve grants under an adopted plan; the 90-day plan makes the hire measurable from day one.`,
    concepts: ["fc09.scorecard", "fc09.option-grant", "fc09.board-meeting"],
    difficulty: 2,
  },
  {
    id: "fc09-x9",
    type: "mcq",
    prompt: "Which pairing of decision and process is most appropriate?",
    options: [
      "A five-year exclusive distribution deal for Mizan: decide on the call to keep momentum",
      "A two-week pricing test for a Suhail sponsorship tier: full pre-mortem and board approval",
      "Moving Afterwave's domicile before a priced round: written memo with options, base rates, worst case and pre-mortem",
      "Changing the format of the weekly metrics review: hold a board vote",
    ],
    answer: 2,
    explanation: md`Domicile is a one-way door with high stakes, so it deserves the full process. The exclusive deal is also a one-way door (not for a quick call); pricing tests and meeting formats are two-way doors to decide fast.`,
    concepts: ["fc09.reversibility", "fc09.premortem"],
    difficulty: 1,
  },
  {
    id: "fc09-x10",
    type: "short",
    prompt: md`Your seed board meets in two weeks (hypothetical: two founders and one investor director). The strategic question is whether to hire two people now (a solutions engineer and a second software engineer) or one now and one after the raise. Write the **one-page board memo** for this question. Use illustrative numbers. Include: the decision and its class (reversible or not); runway and raise trigger under both options; the expected value argument (what each hire is expected to produce, with probabilities); the cost and probability of a bad hire and how the process limits it; the equity each grant uses from the pool; your recommendation and what you ask the board to approve.`,
    rubric: [
      "States the decision clearly and classifies it (largely reversible in timing, partly irreversible in equity and cost of a bad hire)",
      "Computes runway and raise trigger correctly for both options from stated cash and burn",
      "Gives an expected-value or scenario argument for what the hires produce, with labelled probabilities",
      "Quantifies bad-hire risk and names the process controls (scorecard, structured interview, work sample, references, 90-day plan)",
      "States grant sizes as fully diluted percentages and their effect on the pool",
      "Ends with a clear recommendation and specific board approvals requested",
    ],
    modelAnswer: md`**Board memo: hiring plan to the next raise (all numbers illustrative)**

**Decision.** Hire two engineers now (A) or one now and one after the raise (B). Timing is reversible (we can pause hiring); each grant and each wrong hire is not cheaply reversible.

**Runway.** Cash EUR 600,000; burn EUR 45,000/month. Each hire adds EUR 8,667/month loaded. A: burn 62,333, runway 9.6 months, raise trigger $9.6 - 9 = 0.6$ months. B: burn 53,667, runway 11.2 months, trigger 2.2 months.

**What the hires produce.** The next round needs evidence of two pilots running in parallel and one converting. With A, we estimate a 60% chance of two parallel pilots within 5 months; with B, 40% (engineering capacity binds). If the probability of closing the round on good terms rises from, say, 50% to 60% with that evidence, A buys about 10 points of round probability for 1.6 months of runway.

**Bad-hire risk.** Cost about EUR 122,000 per bad hire (Lesson 1 model). With a scorecard, structured interviews, paid work samples and backchannel references we estimate a 20% chance per hire; written 90-day outcomes limit detection to 3 months.

**Equity.** Solutions engineer 0.8%, software engineer 0.8% fully diluted, using 1.6 of the 10 points remaining in the pool; the pool then covers about six more early grants to the Series A.

**Recommendation.** Option A, conditional on both candidates scoring at least 4 of 5 on the work sample; begin investor conversations immediately given the 0.6-month trigger. **Board approvals requested:** the two option grants under the plan; an updated budget with burn of EUR 62,333/month; authority to start the raise now.`,
    explanation: md`A strong memo integrates the module: hiring quality, equity cost, runway arithmetic and decision analysis in one page, ending with exactly what the board must approve. The board's job is to test the probabilities, not to recompute the arithmetic in the meeting.`,
    concepts: ["fc09.runway", "fc09.bad-hire-cost", "fc09.option-grant", "fc09.expected-value", "fc09.board-meeting"],
    difficulty: 3,
  },
];

export default exam;
