import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc09-l03",
  title: "Running the company cadence: meetings, OKRs, weekly metrics and written culture",
  summary:
    "Build the operating rhythm of a small company: the few meetings that earn their cost, OKRs with key results that measure outcomes, a weekly metrics review on controllable inputs, and a written culture that lets a team spread across the Netherlands and Kuwait decide without waiting for you.",
  minutes: 70,
  objectives: [
    "Compute what a recurring meeting costs and redesign it around a written pre-read",
    "Write objectives and key results that measure outcomes, and score them at quarter end",
    "Choose leading (input) and lagging (output) metrics for a weekly review",
    "Set up a weekly, monthly and quarterly cadence that works across several ventures",
  ],
  concepts: [
    { id: "fc09.operating-cadence", name: "Operating cadence", description: "The fixed rhythm of daily, weekly, monthly, quarterly and annual rituals through which a company sets goals, reviews progress and makes decisions.", competency: "fc-ops", related: ["m13.progress-meeting"] },
    { id: "fc09.okr", name: "Objectives and key results (OKRs)", description: "A qualitative objective with 3 to 5 measurable key results that define what achieving it means, set quarterly and scored 0 to 1.", competency: "fc-ops", related: ["fc09.operating-cadence"] },
    { id: "fc09.key-result-quality", name: "Good key results", description: "A key result is an outcome with a baseline, a target and a date, measurable without debate, and not a task or an activity count.", competency: "fc-ops", related: ["fc09.okr"] },
    { id: "fc09.meeting-cost", name: "Meeting cost", description: "People times hours times loaded hourly cost times frequency, plus the context-switch cost it imposes; the price a meeting must beat.", competency: "fc-ops", related: ["fc09.operating-cadence"] },
    { id: "fc09.input-output-metrics", name: "Input and output metrics", description: "Output (lagging) metrics such as revenue show results; input (leading) metrics such as qualified discovery calls are controllable and drive them. A weekly review focuses on inputs.", competency: "fc-ops", related: ["fc09.okr", "m13.kpi-scorecard"] },
    { id: "fc09.written-culture", name: "Written culture", description: "Decisions, proposals and status are written first and discussed second, so meetings are shorter, decisions are recorded and absent or remote people can contribute.", competency: "fc-ops", related: ["m13.minutes-action-log"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "The mechanics of cadence",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You split your time between three ventures and two countries. If information only moves when you are in the room, every venture stalls on the days you are in another one. A cadence (fixed rituals, short meetings on top of written material, a small set of metrics) is how Afterwave, Mizan and Suhail keep moving while your attention is elsewhere, and how your cofounders and investors can see the state of each company without asking you.`,
        },
        {
          kind: "md",
          md: md`### Meetings are a production process

Andy Grove's point in *High Output Management* is that a manager's output is the output of the organisation they influence, and meetings are the medium through which most of that influence flows. Treat each recurring meeting as a production process with a cost and an output. The direct cost is simple:`,
        },
        { kind: "equation", formula: "fc09-meeting-cost" },
        {
          kind: "md",
          md: md`To this add the context-switch cost the meeting imposes on everyone's day (Lesson 5): a meeting in the middle of a maker's morning costs more than its hour. Grove separates **process meetings** (regular: one-on-ones, staff meetings, operation reviews), whose job is information exchange, from **mission meetings** (ad hoc, called to make one decision), which should have a named decision-maker and end with a decision. Most early-stage meeting waste is a process meeting doing the job of a document.

### OKRs

An **objective** says where you want to go, in words that motivate. **Key results** (3 to 5 per objective) say how you will know you got there. The system, developed by Grove at Intel and spread by John Doerr (*Measure What Matters*), has a few working rules:

- Set **quarterly**, at most 3 objectives per team for a small company.
- Key results are **outcomes, not activities**: "3 paid pilots signed" rather than "send 50 proposals".
- Each KR has a **baseline, a target and a date**, and is measurable without debate.
- Score each KR from 0 to 1 at quarter end. For **aspirational** OKRs, an average around 0.6 to 0.7 means the targets were properly ambitious; consistently 1.0 means sandbagging. **Committed** OKRs (things that must happen, such as passing a customer security review) are expected to reach 1.0.
- OKRs are **not** a bonus formula. Tie pay to them and people set targets they know they will hit.

For a KR that moves a metric from a baseline:`,
        },
        { kind: "equation", formula: "fc09-kr-score" },
        {
          kind: "md",
          md: md`| Weak key result | Why it is weak | Better key result |
|---|---|---|
| Improve Lockstep onboarding | No number, no date | Median time from arrival on site to first synchronised capture falls from 10 to 3 working days by 31 March |
| Send 50 outreach emails | Activity, not outcome | 12 qualified discovery calls with hardware test leads (budget owner identified) by 31 March |
| Launch the Suhail newsletter | Binary task | 1,500 subscribers with 45% average open rate across the last 4 issues of the quarter |
| Make progress on the Shagaya pilot | Unmeasurable | Signed data-sharing agreement and 90 days of historical soiling and SCADA data received by 31 March |

### Weekly metrics: inputs over outputs

**Output** metrics (revenue, signed contracts) are lagging: by the time they move, the quarter is over. **Input** metrics (qualified discovery calls, pilot installs completed, data received, event registrations) are leading and, crucially, controllable. A weekly review spends its time on inputs: what moved, why, and what we will do this week. Amazon's weekly business review, as described by Bryar and Carr in *Working Backwards*, is built around exactly this idea of controllable input metrics.

### Written culture

Writing forces the author to finish the thinking before the meeting, lets people read at their own time and in their own time zone, and leaves a record of what was decided and why. Amazon replaced slide decks in senior meetings with narrative memos read silently at the start; GitLab runs a public, handbook-first company where the written page is the source of truth. You do not need either at their scale. You need three habits: **a pre-read for every decision meeting, a decision log, and written weekly updates.**`,
        },
        {
          kind: "flow",
          title: "A cadence for a 3 to 10 person company",
          steps: [
            { label: "Daily (async, 5 min)", detail: "Written check-in: yesterday, today, blocked. No meeting." },
            { label: "Weekly metrics review (30 to 45 min)", detail: "Input and output metrics, red items only, owners and actions. Pre-read posted the day before." },
            { label: "Weekly one-on-ones (30 min)", detail: "The report's agenda: problems, priorities, development." },
            { label: "Monthly (60 min + update)", detail: "OKR check-in, cash and runway, investor update sent." },
            { label: "Quarterly (half day)", detail: "Score last quarter's OKRs, set the next; board meeting." },
            { label: "Annual", detail: "Plan and budget, strategy refresh, compensation review." },
          ],
          caption: "Each layer feeds the next: the weekly review produces the numbers for the monthly update, which feeds the quarterly OKR scoring and the board deck.",
        },
        {
          kind: "matrix",
          title: "Which medium for which job",
          xAxis: ["Information", "Decision"],
          yAxis: ["Asynchronous", "Synchronous"],
          cells: [
            { label: "Conflict, feedback, relationships", detail: "One-on-ones, hard conversations, customer escalations" },
            { label: "Live discussion of a decision", detail: "Mission meeting with a pre-read, a named decider and a recorded outcome" },
            { label: "Written updates", detail: "Daily check-ins, weekly metrics, monthly investor update, handbook" },
            { label: "Written proposal and comments", detail: "Memo with options and a recommendation; decide in writing when reversible" },
          ],
          caption: "Top row: synchronous; bottom row: asynchronous. Default to the bottom row and move up only when the topic needs live interaction.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Afterwave's quarter in numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Scoring an Afterwave Q1 objective",
          given: md`Illustrative. Objective: "Prove that Lockstep earns its place on a customer's bench." Key results: KR1 sign 3 paid pilots (achieved 2). KR2 raise weekly synchronised bench hours captured across customers from 40 to 200 (achieved 150). KR3 cut median security-review time for an on-prem install from 10 weeks to 6 (achieved 7).`,
          steps: [
            { md: md`**KR1** (count from zero): $s_1 = 2/3 = 0.67$.` },
            { md: md`**KR2:** $s_2 = (150 - 40)/(200 - 40) = 110/160 = 0.69$.` },
            { md: md`**KR3** (target below baseline, the formula still works): $s_3 = (7 - 10)/(6 - 10) = (-3)/(-4) = 0.75$.` },
            { md: md`**Objective score:** $(0.67 + 0.69 + 0.75)/3 = 0.70$, in the 0.6 to 0.7 band expected of an aspirational objective.` },
            { md: md`**What the review asks:** not "why did we miss?" but "what did we learn?" Here, the security-review KR moved most; the pilot KR is constrained by the number of qualified opportunities, which points to an input metric for next quarter (qualified discovery calls).` },
          ],
          result: md`Objective score 0.70 (illustrative). The score is a conversation starter: the useful output is next quarter's KRs, re-aimed at the binding constraint.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "What the weekly team sync really costs",
          given: md`Illustrative. A weekly 60-minute sync with 6 people at a loaded EUR 75/h, 48 working weeks a year. Proposal: replace it with a 30-minute review on top of a written pre-read that takes one person 1 hour a week to prepare.`,
          steps: [
            { md: md`**Current cost:** $C = N\,h\,w\,f = 6 \times 1 \times 75 \times 48$.` },
            { md: md`$C = 21{,}600$ EUR per year.`, hidden: true, check: { prompt: "Annual cost of the current meeting (EUR)", answer: 21600, unit: "EUR/yr", tolerance: { abs: 10 } } },
            { md: md`**New cost:** meeting $6 \times 0.5 \times 75 \times 48 = 10{,}800$ plus pre-read $1 \times 1 \times 75 \times 48 = 3{,}600$.` },
            { md: md`New total $= 14{,}400$ EUR per year, a saving of $7{,}200$ EUR, and the pre-read is also the record.`, hidden: true, check: { prompt: "Annual saving (EUR)", answer: 7200, unit: "EUR/yr", tolerance: { abs: 10 } } },
          ],
          result: md`Halving the meeting and adding a pre-read saves about EUR 7,200 a year in direct cost (illustrative), before counting the better decisions and the context switches avoided. The pre-read is what makes the shorter meeting possible.`,
        },
        {
          kind: "question",
          question: {
            id: "fc09-l03-p1",
            type: "numeric",
            prompt: md`A Suhail KR: "Grow newsletter subscribers from 600 to 1,500 by 31 March." On 31 March there are 1,140 subscribers. What is the KR score? (2 decimals)`,
            answer: 0.6,
            tolerance: { abs: 0.005 },
            explanation: md`$s = (1{,}140 - 600)/(1{,}500 - 600) = 540/900 = 0.60$. Scoring against the baseline, not from zero, avoids crediting the subscribers you already had (scoring from zero would give 0.76).`,
            concepts: ["fc09.okr", "fc09.key-result-quality"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running the rhythm across three ventures",
      blocks: [
        {
          kind: "md",
          md: md`### A weekly metrics review that takes 30 minutes

**Before (the day before, async):** each metric owner updates a shared sheet or page: value this week, last week, 4-week trend, target, red/amber/green, one sentence on anything red. The CEO reads it and adds questions in comments.

**In the meeting:** green items are not discussed. Each red item gets two minutes: what happened, what we do this week, who owns it. Decisions are written into the decision log during the meeting.

**After:** actions in the task tracker within an hour; the numbers flow into the monthly investor update.

A starting metric set per venture (choose 5 to 8, mostly inputs):

| Venture | Input metrics (weekly) | Output metrics (monthly) |
|---|---|---|
| Afterwave | Qualified discovery calls; pilots installed; synchronised bench hours captured; open security reviews and their age | Paid pilots signed; contracted ARR; cash and runway |
| Mizan | Plant data received (days of SCADA and soiling data); stakeholder meetings held with KISR and operators; tender documents reviewed | Pilot milestones met; signed agreements; cash |
| Suhail | Event registrations; newsletter growth and open rate; sponsor conversations; active volunteer leads | Sponsorship revenue committed; event attendance; podcast downloads |

### Tools

A shared document workspace (Notion, Google Docs), a task tracker (Linear, Asana or a simple board), a spreadsheet for metrics, and a calendar with fixed slots. Use one structure across all three ventures so you do not re-learn the system each time you switch.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How cadence decays",
          md: md`- **OKRs as a to-do list.** Ten KRs that are all tasks ("hire designer", "launch website") turn OKRs into project management, without the outcome focus.
- **Too many objectives.** More than three per team per quarter and nothing is a priority.
- **Metric theatre.** A dashboard of 40 numbers that nobody acts on. If a metric has not triggered an action in two months, drop it.
- **Meetings that never die.** Every recurring meeting should be re-justified each quarter against its cost.
- **Decisions that live in chat.** Six weeks later nobody remembers why. If it was decided, it goes in the log.`,
        },
        { kind: "sources", refs: ["fc09-r9", "fc09-r10", "fc09-r11", "fc09-r12"] },
        {
          kind: "callout",
          tone: "pm",
          title: "Checks on any key result",
          md: md`Read each KR and ask: Is there a baseline? Is there a target number and a date? Could two people disagree about whether it was achieved? Is it an outcome rather than an activity? Does the team control enough of it to move it this quarter? If any answer is wrong, rewrite it before the quarter starts.`,
        },
        { kind: "xref", to: "m13-l04", note: "Meeting agendas, minutes and action logs from Track 0 apply directly to your weekly review and board meetings." },
        { kind: "xref", to: "m08-l08", note: "RAG status reporting to leadership, the same discipline as the red/amber/green metric review." },
        {
          kind: "question",
          question: {
            id: "fc09-l03-p2",
            type: "short",
            prompt: md`Write the **Q1 2027 operating plan for one venture** (Suhail, whose plan starts in January 2027, or Afterwave). Produce: (1) 2 or 3 objectives with 3 key results each, each KR with baseline, target and date; mark which OKR is committed and which aspirational; (2) a weekly metrics review: 5 to 8 metrics, each labelled input or output, with an owner; (3) the meeting cadence for the quarter with the cost of the recurring meetings (illustrative hourly rate).`,
            rubric: [
              "Objectives are qualitative and directional; no more than 3",
              "Every key result has a baseline, a numeric target and a date, and is an outcome rather than an activity",
              "At least one committed and one aspirational OKR are distinguished, with the right scoring expectation",
              "Weekly metrics are mostly controllable inputs, each with an owner, and link to the KRs",
              "Cadence lists the recurring meetings with duration, participants and a computed annual or quarterly cost",
              "Numbers are labelled illustrative and nothing invents traction for the venture",
            ],
            modelAnswer: md`**Suhail, Q1 2027 (all numbers illustrative).**

**O1 (aspirational): Make Suhail the place Arab builders hear about first.**
- KR1: newsletter subscribers from 600 to 1,500 by 31 March, with average open rate of at least 45% over the last 4 issues.
- KR2: 6 episodes of The Majlis published by 31 March (baseline 0), with at least 500 average plays in the first 30 days.
- KR3: 300 registrations for the first 2027 hackathon by 15 March (baseline 0).

**O2 (committed): Fund the first hackathon before we run it.**
- KR1: EUR 30,000 of sponsorship signed by 28 February (baseline 0).
- KR2: venue and date contracted by 31 January.
- KR3: 3 hiring or investor partners signed up to meet participants by 15 March.

**O3 (aspirational): Build a volunteer team that runs without the founder.**
- KR1: 5 active volunteer leads (baseline 2), each owning a workstream, by 31 January.
- KR2: 2 of 6 newsletter issues produced end to end without founder edits by 31 March.
- KR3: volunteer lead retention 100% through the quarter.

Committed O2 is expected to score 1.0; O1 and O3 are expected around 0.6 to 0.7.

**Weekly metrics (owner).** Newsletter subscribers and open rate (output, newsletter lead); sponsor conversations held this week (input, founder); proposals sent and their value (input, founder); hackathon registrations (output, events lead); podcast episodes in production by stage (input, podcast lead); active volunteer leads and hours logged (input, founder); cash committed versus event budget (output, founder).

**Cadence.** Monday 30-minute metrics review, 5 people, on top of a sheet updated Sunday: illustrative EUR 40/h shadow rate gives $5 \times 0.5 \times 40 \times 12 = 1{,}200$ EUR for the quarter. Weekly 30-minute one-on-ones with each of 5 leads: $5 \times 2 \times 0.5 \times 40 \times 12 = 2{,}400$ EUR of time. Monthly 60-minute OKR check-in with all leads. End-of-quarter half-day: score OKRs, set Q2. Decision log in the shared workspace; no decision counts unless it is written there.`,
            explanation: md`The test of a good plan is whether someone other than you could run the weekly review from it: the metrics are defined, owned and tied to KRs, and every KR can be scored without an argument on 31 March.`,
            concepts: ["fc09.okr", "fc09.key-result-quality", "fc09.input-output-metrics", "fc09.operating-cadence", "fc09.meeting-cost"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a volunteer lead at Suhail why 'send 50 sponsor emails' is a weak key result and what you want instead.",
          keyPoints: [
            "A key result measures an outcome, not effort; emails sent can rise while sponsorship stays at zero",
            "A good KR has a baseline, a target and a date, and is measurable without debate",
            "Activity counts belong in the weekly input metrics, where they help explain the outcome",
            "Aspirational KRs are expected to score around 0.6 to 0.7; committed ones at 1.0",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "fc09-l03-q1",
      type: "mcq",
      prompt: "Which is the best key result for Afterwave's objective \"Prove Lockstep earns its place on a customer's bench\"?",
      options: [
        "Improve the onboarding experience",
        "Hold 20 demo calls",
        "Median time from arrival on site to first synchronised capture falls from 10 to 3 working days by 31 March",
        "Ship the new installer",
      ],
      answer: 2,
      explanation: md`It is an outcome with a baseline, a target and a date, and it cannot be argued about. The others are vague, an activity count, or a task.`,
      concepts: ["fc09.key-result-quality"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc09-l03-q2",
      type: "numeric",
      prompt: md`A 90-minute monthly all-hands with 9 people at a loaded EUR 70/h. What does it cost per year (12 meetings), in EUR?`,
      answer: 11340,
      tolerance: { abs: 5 },
      unit: "EUR/yr",
      explanation: md`$C = 9 \times 1.5 \times 70 \times 12 = 11{,}340$ EUR, before context-switch costs. It may well be worth it; the point is to know the price.`,
      concepts: ["fc09.meeting-cost"],
      difficulty: 1,
    },
    {
      id: "fc09-l03-q3",
      type: "numeric",
      prompt: md`KR: "reduce median security-review time from 12 weeks to 6 weeks". Achieved: 8 weeks. What is the score? (2 decimals)`,
      answer: 0.67,
      tolerance: { abs: 0.005 },
      explanation: md`$s = (8 - 12)/(6 - 12) = (-4)/(-6) = 0.67$. The same formula works when the target is below the baseline.`,
      concepts: ["fc09.okr"],
      difficulty: 2,
    },
    {
      id: "fc09-l03-q4",
      type: "multi",
      prompt: "Which are input (leading, controllable) metrics for Mizan's soiling analytics pilot? (Select all that apply.)",
      options: [
        "Days of SCADA and soiling data received from the plant this week",
        "Signed commercial contract value",
        "Methodology review sessions held with the research partner",
        "Annual revenue",
        "Data quality issues opened and closed",
      ],
      answer: [0, 2, 4],
      explanation: md`Data received, review sessions and data issues are within the team's control week by week and drive the outputs (signed contracts, revenue), which lag.`,
      concepts: ["fc09.input-output-metrics"],
      difficulty: 1,
    },
    {
      id: "fc09-l03-q5",
      type: "decision",
      prompt: md`Your team wants to tie quarterly bonuses to OKR scores to "make them real". What do you do?`,
      options: [
        { text: "Agree: money focuses the mind.", score: 0.1, feedback: "People will set targets they know they can hit, and the aspirational part of OKRs disappears." },
        { text: "Keep OKRs separate from pay; review performance on a broader basis, and keep committed OKRs (which must hit 1.0) clearly marked.", score: 1, feedback: "Right: OKRs are a goal-setting and learning tool. Coupling them to pay causes sandbagging." },
        { text: "Drop OKRs and use bonuses on revenue only.", score: 0.3, feedback: "Revenue is a lagging output; it says little about what each person should do this quarter." },
      ],
      explanation: md`Doerr and Grove both separate OKRs from compensation for this reason. A score of 0.6 to 0.7 on an aspirational OKR should be a good quarter, which a bonus formula cannot express.`,
      concepts: ["fc09.okr"],
      difficulty: 2,
    },
    {
      id: "fc09-l03-q6",
      type: "order",
      prompt: "Order the steps of a weekly metrics review.",
      items: [
        "Owners update metrics and notes the day before",
        "CEO reads and comments asynchronously",
        "Meeting covers red items only, with owners and actions",
        "Decisions written into the decision log",
        "Actions created in the tracker; numbers feed the monthly update",
      ],
      explanation: md`The pre-read carries the information so the meeting can be short and spent only on what needs a decision.`,
      concepts: ["fc09.operating-cadence", "fc09.written-culture"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc09-l03-f1", front: "Meeting cost formula", back: md`$C = N\,h\,w\,f$ (people x hours x loaded rate x frequency)`, concepts: ["fc09.meeting-cost"] },
    { id: "fc09-l03-f2", front: "Key result test", back: "Baseline, target, date, outcome not activity, measurable without debate.", concepts: ["fc09.key-result-quality"] },
    { id: "fc09-l03-f3", front: "KR score from a baseline", back: md`$s = (x - x_0)/(x^* - x_0)$, clamped to 0 to 1`, concepts: ["fc09.okr"] },
    { id: "fc09-l03-f4", front: "Healthy score for an aspirational OKR", back: "Around 0.6 to 0.7; committed OKRs should reach 1.0.", concepts: ["fc09.okr"] },
    { id: "fc09-l03-f5", front: "Process vs mission meeting (Grove)", back: "Process: recurring, information exchange. Mission: ad hoc, one decision, named decider.", concepts: ["fc09.operating-cadence"] },
    { id: "fc09-l03-f6", front: "Three habits of a written culture", back: "Pre-read for every decision meeting, a decision log, written weekly updates.", concepts: ["fc09.written-culture"] },
  ],
};

export default lesson;
