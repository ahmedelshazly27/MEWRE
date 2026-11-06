import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc09-l05",
  title: "Founder psychology and time across multiple ventures",
  summary:
    "Running three ventures is a scheduling and energy problem with hard physics: context switches cost real hours, attention leaves residue, sleep debt degrades judgement, and burnout has recognisable early signals. Design a calendar architecture that batches work by venture and mode, fits the Netherlands and Kuwait working weeks, delegates by design, and has tripwires.",
  minutes: 65,
  objectives: [
    "Quantify the cost of context switching across ventures with a switch-cost model and Weinberg's rule of thumb",
    "Design a weekly calendar architecture with venture days, maker and manager blocks, and Netherlands and Kuwait overlap",
    "Decide what to delegate using urgency, importance and reversibility",
    "Recognise the three dimensions of burnout and set personal tripwires",
  ],
  concepts: [
    { id: "fc09.context-switching", name: "Context-switch cost", description: "Each switch between ventures or tasks costs recovery time and leaves attention residue; the share of time lost grows quickly with the number of concurrent projects.", competency: "fc-ops" },
    { id: "fc09.attention-residue", name: "Attention residue", description: "Part of attention stays on the previous, unfinished task after a switch, lowering performance on the next one (Leroy, 2009).", competency: "fc-ops", related: ["fc09.context-switching"] },
    { id: "fc09.calendar-architecture", name: "Calendar architecture", description: "A fixed weekly template that batches work by venture and by mode (maker or manager), protects deep work, and fits partners' time zones and working weeks.", competency: "fc-ops", related: ["fc09.context-switching", "fc09.operating-cadence"] },
    { id: "fc09.energy-management", name: "Energy management", description: "Managing sleep, recovery and the timing of demanding work, because the quality of an hour depends on the energy brought to it.", competency: "fc-ops", related: ["fc09.burnout"] },
    { id: "fc09.delegation", name: "Delegation by design", description: "Assigning work by importance, urgency and reversibility, with a clear owner, outcome and decision rights, so the founder's time goes to what only the founder can do.", competency: "fc-ops", related: ["fc09.calendar-architecture"] },
    { id: "fc09.burnout", name: "Burnout signals", description: "An occupational syndrome (WHO ICD-11) with three dimensions: exhaustion, mental distance or cynicism about the job, and reduced professional efficacy.", competency: "fc-ops", related: ["fc09.energy-management"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "The physics of founder time",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You run go-to-market, finance, legal and operations for Afterwave, Mizan and Suhail, across the Netherlands and Kuwait, with different working weeks and customers in different time zones. Your hours are the binding constraint for all three companies at once. If a third of them leak away in switches and recovery, every venture gets slower, and the decisions you make tired are the ones that are hardest to reverse.`,
        },
        {
          kind: "md",
          md: md`### Context switching has a price

Gerald Weinberg (*Quality Software Management*, 1992) gave a rule of thumb for how much of a person's time goes to switching overhead as they carry more concurrent projects. It is an estimate from experience, not a controlled experiment, but it matches what most people who run several things observe:

| Concurrent projects | Time per project | Lost to switching |
|---|---|---|
| 1 | 100% | 0% |
| 2 | 40% | 20% |
| 3 | 20% | 40% |
| 4 | 10% | 60% |
| 5 | 5% | 75% |

The research mechanism behind it is **attention residue** (Sophie Leroy, 2009): when you switch away from an unfinished task, part of your attention stays on it, and performance on the next task drops. The residue is worst when the first task was left unfinished and under time pressure, which describes most founder days.

A simple model you can calibrate on your own week:`,
        },
        { kind: "equation", formula: "fc09-switch-cost" },
        { kind: "equation", formula: "fc09-weinberg-share" },
        {
          kind: "chart",
          chart: "stacked-bar",
          title: "Weinberg's rule of thumb: useful versus lost time by number of concurrent projects",
          xKey: "projects",
          xLabel: "Concurrent projects",
          yLabel: "Share of working time (%)",
          series: [
            { key: "useful", label: "Useful work (all projects)" },
            { key: "lost", label: "Lost to switching" },
          ],
          data: [
            { projects: "1", useful: 100, lost: 0 },
            { projects: "2", useful: 80, lost: 20 },
            { projects: "3", useful: 60, lost: 40 },
            { projects: "4", useful: 40, lost: 60 },
            { projects: "5", useful: 25, lost: 75 },
          ],
          caption: "Three ventures interleaved through the day sit at the 40% loss level. Batching (venture days) does not change the number of ventures but cuts the number of switches, which is what the loss really depends on.",
        },
        {
          kind: "md",
          md: md`### Maker time and manager time

Paul Graham's essay *Maker's Schedule, Manager's Schedule* (2009) names the other half of the problem. Manager work comes in one-hour slots and a meeting costs an hour. Maker work (writing a pricing model, a grant application, a fundraising narrative, a tender response) needs half-day blocks, and a single meeting in the middle of the block destroys most of it. You are both: manager for most of the week, maker for the documents that matter most. Protect maker blocks in the morning, when energy is highest for most people, and stack meetings together.

### Energy, not only hours

Loehr and Schwartz (*The Power of Full Engagement*) argue that performance depends on energy brought to the hour, not only the number of hours. The hardest evidence is on sleep: in a well-known laboratory study (Van Dongen and colleagues, 2003), people restricted to 6 hours a night for two weeks showed attention deficits similar to one or two nights of total sleep deprivation, while rating themselves only slightly sleepy. The danger for a founder is the second half of that finding: you do not notice the degradation.

### Delegation by design

What only you can do across three ventures is small: fundraising, key hires, the largest customer relationships, strategy, and decisions that are hard to reverse. Everything else should have another owner, even if that owner is a contractor or a volunteer lead.`,
        },
        {
          kind: "matrix",
          title: "What to do with each piece of work",
          xAxis: ["Not urgent", "Urgent"],
          yAxis: ["Less important", "Important"],
          cells: [
            { label: "Schedule it (maker blocks)", detail: "Strategy, fundraising narrative, hiring plan, key relationships: put it in protected time before it becomes urgent" },
            { label: "Do it now, then fix the cause", detail: "A customer escalation, a tender deadline: handle it, then ask why it reached you" },
            { label: "Drop it", detail: "Low-value requests, most conferences, 'quick calls' with no agenda" },
            { label: "Delegate it", detail: "Scheduling, invoicing, event logistics, routine customer questions: give an owner, an outcome and decision rights" },
          ],
          caption: "Eisenhower-style matrix. Add one more test before delegating: if the decision is hard to reverse, keep it or review it; if it is reversible, delegate the decision as well as the task.",
        },
        {
          kind: "md",
          md: md`### Burnout

The WHO's ICD-11 (2019) describes burnout as an occupational phenomenon resulting from chronic workplace stress that has not been successfully managed, with three dimensions: **exhaustion**, **increased mental distance from the job or cynicism**, and **reduced professional efficacy**. It is not a medical diagnosis in ICD-11 but a factor influencing health. The useful founder translation: tired is normal; tired plus "I no longer care about these customers" plus "I am not getting anything done" is a pattern to act on, early.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Your week, measured",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Interleaved versus batched: a 55-hour week across three ventures",
          given: md`Illustrative. You work 55 hours a week. Interleaved week: you move between Afterwave, Mizan and Suhail about 12 times a day, 5 days a week. Batched week: venture days and fixed blocks, about 2 cross-venture switches a day. Assume a recovery cost of 20 minutes per switch, in line with commonly reported resumption times.`,
          steps: [
            { md: md`**Interleaved:** $k = 12 \times 5 = 60$ switches; lost $= 60 \times 20/60 = 20$ h; $H_{\text{eff}} = 55 - 20 = 35$ h.` },
            { md: md`**Batched:** $k = 2 \times 5 = 10$ switches; lost $= 10 \times 20/60 = 3.3$ h; $H_{\text{eff}} = 55 - 3.3 = 51.7$ h.` },
            { md: md`**Difference:** $51.7 - 35 = 16.7$ effective hours a week, about two extra working days, without working a single extra hour.` },
            { md: md`**Sanity check against Weinberg:** at three concurrent projects his table predicts 40% loss, $55 \times 0.6 = 33$ h, close to the interleaved estimate of 35 h.` },
          ],
          result: md`Batching by venture recovers about 17 effective hours a week (illustrative). That is more than any productivity tool can give you, and it costs only the discipline of saying "Thursday" when someone asks for a Mizan call on Monday.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "What dropping to two active ventures would buy",
          given: md`Use Weinberg's table and a 55-hour week. Compare three ventures you actively manage with a set-up where Suhail runs on its volunteer leads and you join only the weekly review (treat it as two concurrent projects).`,
          steps: [
            { md: md`**Three projects:** $H_{\text{useful}} = 55 \times (1 - 0.40)$.` },
            { md: md`$= 33$ h, about 11 h per venture.`, hidden: true, check: { prompt: "Useful hours with three projects (h/week)", answer: 33, unit: "h", tolerance: { abs: 0.1 } } },
            { md: md`**Two projects:** $H_{\text{useful}} = 55 \times (1 - 0.20)$.` },
            { md: md`$= 44$ h, or 22 h each for Afterwave and Mizan.`, hidden: true, check: { prompt: "Useful hours with two projects (h/week)", answer: 44, unit: "h", tolerance: { abs: 0.1 } } },
          ],
          result: md`Handing Suhail's operations to volunteer leads (with a weekly review) could double the useful hours per remaining venture, from about 11 to 22. This is why delegation and a working cadence (Lesson 3) are time-management tools, not management niceties.`,
        },
        {
          kind: "question",
          question: {
            id: "fc09-l05-p1",
            type: "numeric",
            prompt: md`You work 50 hours a week, switch between ventures 8 times a day for 5 days, and estimate 15 minutes of recovery per switch. What are your effective hours? (h/week)`,
            answer: 40,
            tolerance: { abs: 0.1 },
            unit: "h",
            explanation: md`$k = 8 \times 5 = 40$; lost $= 40 \times 0.25 = 10$ h; $H_{\text{eff}} = 50 - 10 = 40$ h.`,
            concepts: ["fc09.context-switching"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Calendar architecture between the Netherlands and Kuwait",
      blocks: [
        {
          kind: "md",
          md: md`### The constraints

| Constraint | Netherlands | Kuwait |
|---|---|---|
| Time zone | CET (UTC+1) in winter, CEST (UTC+2) from the last Sunday of March to the last Sunday of October | AST (UTC+3) all year, no daylight saving |
| Difference | Kuwait is 2 h ahead in winter, 1 h ahead in summer | |
| Working week | Monday to Friday | Sunday to Thursday (weekend Friday and Saturday) |
| Shared working days | Monday to Thursday | Monday to Thursday |

Many Kuwaiti government bodies and companies work mornings into early afternoon, so Kuwait calls fit best in the Dutch morning (09:00 Dutch time is 11:00 in Kuwait in winter). Confirm hours with each counterpart. During Ramadan working hours in Kuwait are shortened; Ramadan 2027 is expected to begin around 8 February 2027, with the exact date set by moon sighting, so plan Mizan meetings for February and March 2027 accordingly.

### An illustrative weekly template (when based in the Netherlands)

| Day | Morning (maker) | Afternoon (manager) |
|---|---|---|
| Monday | Afterwave: fundraising and pricing documents | Afterwave: customer and investor calls; weekly metrics review |
| Tuesday | Afterwave: pilot and partner work with engineering | Afterwave: discovery calls |
| Wednesday | Mizan: Kuwait calls 09:00 to 12:00 Dutch time (KISR, operators, distribution) | Mizan: analysis, tender and pilot documents |
| Thursday | Mizan: Kuwait calls; Mizan weekly review | Suhail: sponsor calls, volunteer one-on-ones, Suhail weekly review |
| Friday | Cross-venture finance, legal, admin (batched) | Reading, writing, planning next week; no meetings |

When based in Kuwait, shift Mizan to Sunday to Tuesday and keep European calls on Monday to Thursday afternoons, which are Kuwait late afternoons.

### Tripwires for burnout

Write them down now, while rested, and share them with a cofounder or a friend who will ask:
- Sleep below 6.5 hours on average for two weeks.
- A full week without a maker block.
- Dreading a customer or partner you used to enjoy (the cynicism signal).
- Three weeks where the weekly review shows the same red items with no movement (the efficacy signal).

When two trip, cancel something for a week. That is a decision, not a weakness.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How founder time leaks",
          md: md`- **The open calendar.** Anyone can book any slot, so every day becomes interleaved.
- **Messaging as the default channel.** Every notification is a switch; batch messages into two or three windows a day.
- **Saying yes to every event.** Conferences and panels feel like work but rarely move the constraint of any venture.
- **Delegating tasks but not decisions.** If every delegated task comes back for approval, you have not delegated.
- **Working through Kuwait's weekend and Europe's.** With different weekends you can work seven days without noticing. Pick one weekend and protect it.`,
        },
        { kind: "sources", refs: ["fc09-r18", "fc09-r19", "fc09-r20", "fc09-r21", "fc09-r22", "fc09-r23"] },
        {
          kind: "checklist",
          title: "Weekly calendar audit (15 minutes on Friday)",
          items: [
            "Count cross-venture switches this week and compare with last week",
            "At least three maker blocks of 3 or more hours, kept",
            "Every meeting next week has an owner and a purpose; cancel those that do not",
            "One thing delegated this week, with outcome and decision rights",
            "Sleep average and tripwires reviewed",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc09-l05-p2",
            type: "short",
            prompt: md`Design your **calendar architecture** for a typical two-week period in early 2027 (one week based in the Netherlands, one in Kuwait). Produce: (1) a weekly template for each location with venture days or blocks, maker and manager time, and the slots for Kuwait and European calls with times in both zones; (2) an estimate of your cross-venture switches per week before and after, and the effective hours recovered (state the recovery-time assumption); (3) three things you will delegate, to whom, with the decision rights; (4) your burnout tripwires and what you do when they trip.`,
            rubric: [
              "Templates batch work by venture and by maker or manager mode, with protected maker blocks",
              "Time zones and working weeks are handled correctly (Kuwait UTC+3, 2 h ahead of the Netherlands in winter, Sunday to Thursday week; Monday to Thursday overlap)",
              "Switch counts and effective hours are computed with a stated recovery assumption and correct arithmetic",
              "Delegated items name an owner, an outcome and what they may decide without you",
              "Tripwires are specific and observable, covering exhaustion, cynicism and efficacy, with a concrete action",
            ],
            modelAnswer: md`**Netherlands week (winter, Kuwait = NL + 2 h).** Monday and Tuesday Afterwave: maker 08:30 to 12:00 (fundraising narrative, pricing), manager 13:00 to 17:30 (customer and investor calls, Monday 30-minute metrics review). Wednesday Mizan: Kuwait calls 09:00 to 12:00 NL (11:00 to 14:00 Kuwait), afternoon tender and pilot documents. Thursday morning Mizan (calls and weekly review), afternoon Suhail (sponsor calls, volunteer one-on-ones, weekly review). Friday morning cross-venture finance and legal; afternoon no meetings, planning.

**Kuwait week (Sunday to Thursday locally).** Sunday to Tuesday Mizan: site visits, KISR and operator meetings 08:00 to 14:00 Kuwait, documents in the afternoon. Monday to Thursday 15:00 to 18:00 Kuwait (13:00 to 16:00 NL): Afterwave European calls. Wednesday and Thursday mornings Afterwave maker blocks. Thursday evening Suhail weekly review. Friday and Saturday off; Friday is a Dutch working day, so set an auto-reply.

**Switches (illustrative).** Before: about 10 cross-venture switches a day over 6 days, 60 a week. After: about 2 a day over 5 days, 10 a week. At 20 minutes each, lost time falls from 20 h to 3.3 h: about 16.7 effective hours recovered per week.

**Delegation.** (1) Suhail event logistics to the events volunteer lead: may book venue and suppliers within the approved budget; anything over budget comes to me. (2) Calendar and travel to a part-time assistant: may accept meetings that fit the template; may not move maker blocks. (3) First-line Lockstep installation questions to the solutions engineer once hired: may commit to install dates; commercial terms stay with me.

**Tripwires.** Sleep average under 6.5 h for two weeks; a week with no maker block kept; dreading calls with a partner I usually enjoy; the same red metrics three weeks running. When any two trip: cancel all non-customer meetings for the next week, and tell my cofounders why.`,
            explanation: md`A strong answer is specific enough that an assistant could enforce it: fixed days, fixed call windows in both time zones, numbers on switches, and delegation with decision rights. The tripwires matter because the degradation from fatigue is the thing you are least able to notice yourself.`,
            concepts: ["fc09.calendar-architecture", "fc09.context-switching", "fc09.delegation", "fc09.burnout"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to an investor who worries that you run three ventures why your effective time per venture is not simply a third of your week, and what you do about it.",
          keyPoints: [
            "Each switch between ventures costs recovery time and leaves attention residue",
            "Interleaving three projects can lose 40% of working time (Weinberg's rule of thumb)",
            "Batching by venture day and by maker or manager mode cuts the number of switches, which is what drives the loss",
            "Delegating operations to owners with decision rights reduces the number of concurrent projects the founder actively carries",
            "Energy and sleep determine the quality of the hours; fatigue is hard to self-detect, so tripwires are set in advance",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "fc09-l05-q1",
      type: "numeric",
      prompt: md`By Weinberg's rule of thumb, what share of time is lost to switching with 4 concurrent projects? (percent)`,
      answer: 60,
      tolerance: { abs: 0.5 },
      unit: "%",
      explanation: md`1: 0%, 2: 20%, 3: 40%, 4: 60%, 5: 75%. With 4 projects each gets about 10% of the time.`,
      concepts: ["fc09.context-switching"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc09-l05-q2",
      type: "mcq",
      prompt: "It is 10:00 in Amsterdam on a Wednesday in January. What time is it in Kuwait City?",
      options: ["09:00", "11:00", "12:00", "13:00"],
      answer: 2,
      explanation: md`In winter the Netherlands is on CET (UTC+1) and Kuwait on AST (UTC+3): Kuwait is 2 hours ahead, so 12:00. In summer (CEST, UTC+2) the gap is 1 hour.`,
      concepts: ["fc09.calendar-architecture"],
      difficulty: 1,
    },
    {
      id: "fc09-l05-q3",
      type: "multi",
      prompt: "Which are the three dimensions of burnout in the WHO ICD-11 description? (Select all that apply.)",
      options: [
        "Feelings of energy depletion or exhaustion",
        "Increased mental distance from the job, or cynicism about it",
        "Reduced professional efficacy",
        "Working more than 50 hours a week",
        "Disagreement with cofounders",
      ],
      answer: [0, 1, 2],
      explanation: md`Hours and conflict can contribute, but the three dimensions are exhaustion, mental distance or cynicism, and reduced efficacy.`,
      concepts: ["fc09.burnout"],
      difficulty: 1,
    },
    {
      id: "fc09-l05-q4",
      type: "mcq",
      prompt: "What is 'attention residue'?",
      options: [
        "Notifications that remain unread",
        "Part of your attention staying on a previous unfinished task after you switch, lowering performance on the next",
        "The tiredness at the end of the day",
        "Tasks left on the to-do list",
      ],
      answer: 1,
      explanation: md`Leroy (2009) showed that switching away from unfinished work leaves residue that hurts the next task, especially under time pressure.`,
      concepts: ["fc09.attention-residue"],
      difficulty: 1,
    },
    {
      id: "fc09-l05-q5",
      type: "decision",
      prompt: md`A Mizan partner in Kuwait asks for a "quick call" on Monday at 14:00 Kuwait time, in the middle of your Afterwave maker block. The topic is not urgent. What do you do?`,
      options: [
        { text: "Accept: it's only 30 minutes.", score: 0.2, feedback: "The call costs 30 minutes plus the recovery and residue on both sides of it, and it breaks a half-day block." },
        { text: "Propose Wednesday morning Dutch time (late morning in Kuwait), your Mizan call window, and ask for the agenda in advance.", score: 1, feedback: "Keeps the architecture, respects the partner with a near-term slot and makes the call better prepared." },
        { text: "Ignore the request until Wednesday.", score: 0.1, feedback: "Silence damages the relationship; reply quickly with a slot." },
      ],
      explanation: md`The architecture only works if you defend it with fast, specific alternatives. Non-urgent requests go to the venture's window.`,
      concepts: ["fc09.calendar-architecture", "fc09.context-switching"],
      difficulty: 1,
    },
    {
      id: "fc09-l05-q6",
      type: "numeric",
      prompt: md`You cut cross-venture switches from 45 to 15 a week. At 20 minutes recovery per switch, how many effective hours per week do you recover?`,
      answer: 10,
      tolerance: { abs: 0.05 },
      unit: "h",
      explanation: md`$(45 - 15) \times 20/60 = 10$ h a week.`,
      concepts: ["fc09.context-switching"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc09-l05-f1", front: "Weinberg: time lost with 2, 3, 4, 5 projects", back: "20%, 40%, 60%, 75%.", concepts: ["fc09.context-switching"] },
    { id: "fc09-l05-f2", front: "Switch-cost model", back: md`$H_{\text{eff}} = H - k\,s$`, concepts: ["fc09.context-switching"] },
    { id: "fc09-l05-f3", front: "Netherlands to Kuwait time difference", back: "Kuwait is 2 h ahead in winter (CET), 1 h ahead in summer (CEST); Kuwait has no daylight saving.", concepts: ["fc09.calendar-architecture"] },
    { id: "fc09-l05-f4", front: "Shared working days, Netherlands and Kuwait", back: "Monday to Thursday (Kuwait works Sunday to Thursday).", concepts: ["fc09.calendar-architecture"] },
    { id: "fc09-l05-f5", front: "Three dimensions of burnout (ICD-11)", back: "Exhaustion; mental distance or cynicism; reduced professional efficacy.", concepts: ["fc09.burnout"] },
    { id: "fc09-l05-f6", front: "Maker vs manager schedule", back: "Makers need half-day blocks; managers work in hours. One meeting can wreck a maker block.", concepts: ["fc09.calendar-architecture"] },
    { id: "fc09-l05-f7", front: "Delegation that works", back: "An owner, an outcome and explicit decision rights; reversible decisions are delegated too.", concepts: ["fc09.delegation"] },
  ],
};

export default lesson;
