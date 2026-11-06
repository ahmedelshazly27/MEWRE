import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc02-l03",
  title: "Jobs to be done",
  summary:
    "Customers do not buy products, they hire them to make progress in a specific circumstance. How to describe that progress (functional, emotional and social jobs), write job stories, map the real competition including spreadsheets and doing nothing, and use the four forces of progress (push, pull, anxiety, habit) to see why customers switch or stay.",
  minutes: 65,
  objectives: [
    "You can state a job in solution-free terms and split it into functional, emotional and social dimensions.",
    "You can write job stories (When..., I want to..., so I can...) that an engineer can design against.",
    "You can score the four forces of progress for a buyer and identify which force to work on.",
    "You can list the real competing solutions for a job, including non-consumption and in-house tools.",
  ],
  concepts: [
    {
      id: "fc02.jtbd",
      name: "Job to be done",
      description:
        "The progress a person is trying to make in a particular circumstance. Customers \"hire\" a product to do the job and \"fire\" it when something does the job better. The job is stable; solutions change.",
      competency: "fc-product",
      related: ["fc02.problem-statement"],
    },
    {
      id: "fc02.job-dimensions",
      name: "Functional, emotional and social jobs",
      description:
        "Functional: the practical task (find which tests a change affects). Emotional: how the person wants to feel (confident signing off a release). Social: how they want to be seen (as the lead who never lets a regression escape).",
      competency: "fc-product",
      related: ["fc02.jtbd"],
    },
    {
      id: "fc02.job-story",
      name: "Job story",
      description:
        "A requirement framed around situation and motivation rather than persona: \"When [situation], I want to [motivation], so I can [expected outcome].\" Popularised by Alan Klement and Intercom.",
      competency: "fc-product",
      related: ["fc02.jtbd"],
    },
    {
      id: "fc02.forces-of-progress",
      name: "Forces of progress",
      description:
        "Push of the current situation and pull of the new solution promote switching; anxiety about the new solution and habit of the present hold the customer back. A switch happens when push plus pull exceeds anxiety plus habit.",
      competency: "fc-product",
      related: ["fc02.jtbd", "fc02.commitment-advancement"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Progress, not products",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Afterwave sells into test teams who already have a way of working: NI or dSPACE toolchains, in-house scripts, spreadsheets, and habits built over years. Mizan sells into plants that already clean on a calendar. Your real competitor in both is usually "what they do today", and the reason deals stall is rarely a missing feature: it is anxiety (will this pass our security review, will it embarrass me in front of the owner) and habit. Jobs to be done gives you a way to see and work on those forces deliberately, in positioning, product and sales.`,
        },
        {
          kind: "md",
          md: md`### The job

Clayton Christensen and colleagues (*Competing Against Luck*, 2016) define a job as **the progress a person is trying to make in a particular circumstance**. Three consequences:

1. **The circumstance is part of the job.** "Decide which tests to rerun" is a different job right before a design review than on a quiet Monday. Most of the design insight sits in the circumstance.
2. **Jobs are stable, solutions change.** Test teams have needed to "know whether a change broke something" since there were test benches. Spreadsheets, scripts, test-management tools and Ripple are successive solutions to the same job.
3. **Competition is defined by the job, not by the product category.** For Ripple, competitors include rerunning everything, a senior engineer's memory, a spreadsheet, a homegrown script, a test-management tool and doing nothing. Non-consumption (not doing the job at all) is often the biggest competitor.

### Three dimensions of a job

| Dimension | Question | Afterwave (validation lead) | Mizan (plant O&M manager) |
|---|---|---|---|
| **Functional** | What practical task is being done? | Know which tests a firmware or rig change affects, and rerun only those | Keep yield close to expected at the lowest cleaning cost |
| **Emotional** | How do they want to feel? | Confident signing off a release; not anxious about an escape | In control when output drops; not surprised after a dust storm |
| **Social** | How do they want to be seen? | As the lead whose team ships on time without regressions | By the owner or ministry as running a modern, well-managed plant |

Engineers default to the functional row. Purchasing decisions, especially in large organisations, are often settled in the other two: a lead will not stake their reputation on a tool that might embarrass them in a security review.

### Job stories

User stories ("As a test engineer, I want X so that Y") centre a persona and quietly assume a solution. **Job stories** centre the situation:

> **When** a firmware release candidate lands two days before a design review, **I want to** know which tests its changes can affect and why, **so I can** rerun only those and still sign off with confidence.

The "when" gives the engineer the context to design for (time pressure, a review, partial information); the "so I can" gives the acceptance test (sign-off with confidence, not "a list is displayed").

### The forces of progress

Bob Moesta and Chris Spiek (Re-Wired Group; *Demand-Side Sales 101*, Moesta 2020) describe every switch as a balance of four forces:`,
        },
        {
          kind: "matrix",
          title: "Four forces of progress",
          xAxis: ["Current situation", "New solution"],
          yAxis: ["Blocks the switch", "Drives the switch"],
          cells: [
            { label: "Push", detail: "Pain of today: a full regression rerun eats 4 bench-days a release; output dropped 6% before the last cleaning and nobody saw it coming." },
            { label: "Pull", detail: "Attraction of the new: rerun only what matters, with reasons; clean when soiling justifies it." },
            { label: "Habit", detail: "Comfort of the present: the team knows the spreadsheet; the cleaning contract has a fixed monthly schedule." },
            { label: "Anxiety", detail: "Fear of the new: will it miss a test and let a regression escape; will IT block it; will the owner blame me if output drops after we skip a cleaning." },
          ],
          caption: "A switch happens only when the top row outweighs the bottom row. Founders over-invest in pull and under-invest in reducing anxiety and habit.",
        },
        { kind: "equation", formula: "fc02-forces-of-progress" },
        {
          kind: "md",
          md: md`This is a reasoning tool, not a measurement. Scoring each force 1 to 5 from interview evidence (quotes, behaviours) makes the team's reasoning explicit and shows which lever is cheapest. Typical levers:

| Force | Lever | Example |
|---|---|---|
| Increase push | Make today's cost visible | Show the lab its own bench-hours spent on reruns last quarter |
| Increase pull | Sharper value, better demo | Ripple's "why" for each test, tied to a real change from their history |
| Reduce anxiety | Lower risk of trying | Shadow mode (recommend, do not skip), on-prem in Enclave, a reference customer, a time-boxed pilot with exit |
| Reduce habit | Lower switching effort | Import their spreadsheet; keep their existing DAQ formats; no change to the cleaning contract during the pilot |

### The switch timeline

Moesta's switch interviews reconstruct the timeline of a past purchase to find the forces in action: **first thought** (something triggers dissatisfaction), **passive looking**, a **trigger event** that turns it into **active looking**, **deciding**, then **first use** and **ongoing use**. Interview people who recently switched (to anything, including a competitor) and ask what happened at each stage. The trigger events you find are the moments your marketing and sales should target: a failed release, a new regulation such as the EU Machinery Regulation applying from 20 January 2027, a new plant owner, a bad summer.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Forces for a Mizan buyer",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Jobs and forces for a PV plant O&M manager (illustrative)",
          given: md`From discovery conversations (illustrative, not real interview data): a plant O&M manager at a Gulf PV plant cleans on a fixed calendar. Output fell noticeably before the last cleaning after a dust event, and the owner asked why. The cleaning contract runs per cycle. The manager has no soiling measurement she trusts.`,
          steps: [
            {
              md: md`**State the job, solution-free.** "Keep the plant's output close to what the owner expects at the lowest cleaning cost, and be able to explain every drop."`,
            },
            {
              md: md`**Split into dimensions.** Functional: decide when to clean. Emotional: feel in control after a dust storm, not surprised. Social: be seen by the owner as running the plant with data, not guesswork.`,
            },
            {
              md: md`**Write two job stories.**

- When a dust event has passed and output is down, I want to know how much of the drop is soiling, so I can decide whether to bring the next cleaning forward and explain it to the owner.
- When the monthly cleaning date approaches and panels look fairly clean, I want to know whether cleaning now pays for itself, so I can defer it without risking a complaint.`,
            },
            {
              md: md`**Score the forces (1 to 5, from interview evidence).** Push 4 (owner asked about the drop: social pain). Pull 3 (likes the idea, has not seen it work). Anxiety 4 (fears deferring a cleaning and then being blamed; unsure the estimate is accurate). Habit 3 (calendar cleaning is in the contract and easy).

$F_{\text{push}} + F_{\text{pull}} = 7$; $F_{\text{anxiety}} + F_{\text{habit}} = 7$. Balanced: no switch yet.`,
            },
            {
              md: md`**Choose the lever.** Adding features raises pull by perhaps 1. Reducing anxiety is cheaper: run the pilot in **shadow mode** (Mizan recommends, the plant keeps its calendar for the first two months) and validate the estimate against a reference measurement with KISR as methodology partner. That plausibly takes anxiety from 4 to 2.`,
            },
          ],
          result: md`After the shadow-mode pilot design: $7 > 5$, so the switch condition is met. The product decision follows the forces: the first build is a credible soiling estimate with an explanation for each drop, not an automated cleaning scheduler.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Forces for a Ripple buyer (illustrative)",
          given: md`Illustrative interview evidence for a validation lead at a drive-unit lab: Push 3 (reruns are painful but planned for). Pull 4 (strong interest in "why" explanations). Anxiety 5 (an escaped regression from a skipped test would be career-damaging). Habit 2 (the spreadsheet is disliked).`,
          steps: [
            {
              md: md`Promoting forces: $F_{\text{push}} + F_{\text{pull}}$.`,
              hidden: true,
              check: { prompt: "Push plus pull", answer: 7, tolerance: { abs: 0 } },
            },
            {
              md: md`Blocking forces: $F_{\text{anxiety}} + F_{\text{habit}}$.`,
              hidden: true,
              check: { prompt: "Anxiety plus habit", answer: 7, tolerance: { abs: 0 } },
            },
            {
              md: md`Margin after a change that lowers anxiety by 2 (Ripple only ranks tests in pilot; nothing is skipped until its recommendations have matched the full rerun for three releases): $7 - (7 - 2)$.`,
              hidden: true,
              check: { prompt: "Net margin of promoting over blocking forces", answer: 2, tolerance: { abs: 0 } },
            },
          ],
          result: md`The product requirement that came out of the forces analysis is "shadow mode with a measured miss rate", which is a feature list no customer would have asked for directly.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Using jobs in product, positioning and sales",
      blocks: [
        {
          kind: "md",
          md: md`### Where jobs show up in the company

- **Product**: job stories replace persona stories in PRDs (lesson 4); the forces define the pilot design (lesson 6).
- **Positioning**: the job and its circumstance decide your category and your message ("know what a change broke before the design review", not "AI test automation"). The Go-to-market module covers positioning in depth.
- **Sales**: the trigger events from switch interviews tell you when to reach out; the anxiety list becomes your objection-handling and security-review pack.
- **Pricing**: price against the job's value and the competing solutions for that job, including the cost of doing nothing.

### How to collect the evidence

Run **switch interviews** with people who recently changed how they do the job, whether to your product, a competitor or a spreadsheet. Ask for the timeline: "When did you first think the old way wasn't working? What happened that day? What else did you look at? What almost stopped you? What did you have to give up?" The Mom Test rules from lesson 2 still apply: specific past events only.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Common JTBD mistakes",
          md: md`**Jobs that are just features.** "Export to MATLAB" is a task inside a job, not a job. Ask why until you reach progress the person would recognise.

**Jobs too abstract to design against.** "Make the world safer" is not useful. The job needs a circumstance you can observe.

**Ignoring the buyer's job.** In B2B the user (test engineer) and the buyer (head of validation, CFO, plant owner) have different jobs. The buyer's job is often "get the outcome without risk to my budget or reputation".

**Only adding pull.** If the deal is stuck, list the anxieties first. They are usually the cheaper force to move.`,
        },
        {
          kind: "ask",
          title: "Switch interview questions",
          items: [
            "When did you first realise the old way was not working? What happened that day?",
            "What did you do about it at first? What did you look at?",
            "What happened that made you start looking seriously?",
            "What almost stopped you from changing?",
            "What did you have to give up or change in how the team works?",
            "Once you started using it, what surprised you, good or bad?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc02-l03-p1",
            type: "short",
            prompt: md`For **Lockstep** (Afterwave's capture app: rig signals and on-screen actions on one clock), produce: (1) the core job in one solution-free sentence with its circumstance; (2) the functional, emotional and social dimensions for a test engineer **and** for the head of validation who would buy it; (3) three job stories; (4) a forces table (push, pull, anxiety, habit) with a 1 to 5 score and the evidence or reasoning for each; (5) the single cheapest lever to tip the balance and the product or pilot change it implies. Label assumed evidence as illustrative.`,
            rubric: [
              "The core job is solution-free and includes a circumstance (e.g. reproducing or explaining a failure seen on the bench).",
              "Functional, emotional and social dimensions are given separately for the user and the buyer, and they differ in a plausible way.",
              "Job stories follow When / I want to / so I can, with a concrete situation and an outcome that could be tested.",
              "All four forces are scored with reasoning; anxiety includes realistic B2B concerns such as IT security, data leaving the lab, or disrupting existing DAQ setups.",
              "The chosen lever follows from the scores, is cheaper than adding features where appropriate, and maps to a concrete product or pilot change.",
            ],
            modelAnswer: md`**Core job.** When a failure or anomaly appears on a test bench, reconstruct exactly what the rig, the device and the operator were doing at that moment, so the cause can be found and the fix verified.

**Dimensions.**

| | Test engineer (user) | Head of validation (buyer) |
|---|---|---|
| Functional | Line up DAQ signals with what was on the screen and what the operator did, without hand-aligning files | Get faster root cause and repeatable evidence across benches |
| Emotional | Not waste a day aligning timestamps; confidence the timeline is right | Confidence that test evidence will stand up in a design review or audit |
| Social | Be the engineer who finds the cause, not the one who "could not reproduce" | Be seen as running a modern, auditable test organisation (relevant as the Machinery Regulation applies from January 2027) |

**Job stories.**
1. When an intermittent fault appears during an endurance run, I want to see the DAQ traces and the operator's screen actions on one timeline, so I can tell whether the operator or the device caused it.
2. When a firmware change is suspected, I want to compare the same test before and after on the same clock, so I can show the difference in the review.
3. When an auditor or customer asks how a result was obtained, I want the capture and its configuration in one record, so I can answer without rebuilding it.

**Forces (illustrative).** Push 4: engineers describe hours lost aligning screen recordings and DAQ files after faults. Pull 3: interest, but they have not seen it on their rigs. Anxiety 4: IT will not allow a new app on bench PCs that sends data outside; fear it will disturb existing DAQ timing. Habit 3: existing DAQ software and manual notes are familiar. Promoting 7 versus blocking 7: stalled.

**Lever.** Reduce anxiety: deploy inside Afterwave Enclave on the customer's own servers with no outbound data, read existing DAQ files rather than replacing the DAQ software, and offer a one-bench pilot. Product implication: a passive, read-only capture mode with documented network behaviour and a one-page security note, before any new analysis features. That plausibly moves anxiety to 2 and the balance to 7 versus 5.`,
            explanation: md`Good answers separate user and buyer jobs, use real B2B anxieties, and pick a lever that reduces blocking forces rather than defaulting to more features.`,
            concepts: ["fc02.jtbd", "fc02.job-dimensions", "fc02.job-story", "fc02.forces-of-progress"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a technical cofounder why the Mizan pilot should start in shadow mode even though automated cleaning recommendations are more impressive, using the forces of progress.",
          keyPoints: [
            "A switch happens only when push plus pull outweighs anxiety plus habit.",
            "The O&M manager's biggest blocker is anxiety: being blamed if output drops after a deferred cleaning, and doubt about the estimate's accuracy.",
            "Shadow mode reduces that anxiety cheaply because nothing in operations changes until the estimate has been validated.",
            "More impressive features add pull, but pull alone does not tip the balance if anxiety stays high.",
          ],
        },
        { kind: "sources", refs: ["fc02-r5", "fc02-r6", "fc02-r7", "fc02-r21"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc02-l03-q1",
      type: "mcq",
      prompt: md`Which statement is a job, in the JTBD sense?`,
      options: [
        "Use Ripple's dependency graph.",
        "Export test results to MATLAB.",
        "When a firmware change lands before a review, know which tests it can affect so I can sign off with confidence.",
        "Test engineers aged 30 to 45 in German automotive suppliers.",
      ],
      answer: 2,
      explanation: md`A job is progress in a circumstance, without a solution. A and B are features or tasks; D is a segment description.`,
      concepts: ["fc02.jtbd"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc02-l03-q2",
      type: "multi",
      prompt: md`Which are **blocking** forces in the forces of progress? (Select all.)`,
      options: ["Push", "Pull", "Anxiety", "Habit"],
      answer: [2, 3],
      explanation: md`Anxiety (about the new) and habit (of the present) hold the customer back; push and pull drive the switch.`,
      concepts: ["fc02.forces-of-progress"],
      difficulty: 1,
    },
    {
      id: "fc02-l03-q3",
      type: "mcq",
      prompt: md`"I want to be seen by the plant owner as running the plant with data, not guesswork" is which dimension of the job?`,
      options: ["Functional", "Emotional", "Social", "Not a job dimension"],
      answer: 2,
      explanation: md`It is about how the person is perceived by others: social. "Feel in control after a storm" would be emotional.`,
      concepts: ["fc02.job-dimensions"],
      difficulty: 1,
    },
    {
      id: "fc02-l03-q4",
      type: "numeric",
      prompt: md`Scores: push 3, pull 4, anxiety 4, habit 4. By how many points must blocking forces fall (with push and pull unchanged) for promoting forces to exceed them by at least 1?`,
      answer: 2,
      tolerance: { abs: 0 },
      unit: "points",
      explanation: md`Promoting $= 7$, blocking $= 8$. You need blocking $\le 6$, so a reduction of $2$ points.`,
      concepts: ["fc02.forces-of-progress"],
      difficulty: 2,
    },
    {
      id: "fc02-l03-q5",
      type: "decision",
      prompt: md`A large lab likes Ripple's demo but the deal has stalled for two months. The head of validation mentions an escaped regression would "end careers here". What do you prioritise?`,
      options: [
        { text: "Build the three features on their wish list to increase the value.", score: 0.2, feedback: "Adds pull, but the stated blocker is anxiety." },
        { text: "Offer a shadow-mode pilot where Ripple only ranks tests, with its miss rate measured against full reruns for three releases before anything is skipped.", score: 1, feedback: "Directly reduces the dominant anxiety at low cost." },
        { text: "Offer a 30% discount.", score: 0.3, feedback: "Price is not the blocker named; discounts do not reduce fear of an escape." },
        { text: "Wait for their next release cycle.", score: 0.1, feedback: "Habit wins by default if you do nothing." },
      ],
      explanation: md`Read the forces from the evidence. The quote names anxiety; the cheapest lever is to remove the risk of trying.`,
      concepts: ["fc02.forces-of-progress"],
      difficulty: 2,
    },
    {
      id: "fc02-l03-q6",
      type: "mcq",
      prompt: md`What is the main advantage of a job story over a persona-based user story?`,
      options: [
        "It is shorter.",
        "It puts the situation and motivation first, giving the designer context and a testable outcome without assuming a solution.",
        "It removes the need for acceptance criteria.",
        "It is required by Scrum.",
      ],
      answer: 1,
      explanation: md`"When..., I want to..., so I can..." carries the circumstance, which is where design insight lives, and the outcome, which is what to test.`,
      concepts: ["fc02.job-story"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc02-l03-f1", front: "Definition of a job (Christensen)", back: "The progress a person is trying to make in a particular circumstance.", concepts: ["fc02.jtbd"] },
    { id: "fc02-l03-f2", front: "Three dimensions of a job", back: "Functional, emotional, social.", concepts: ["fc02.job-dimensions"] },
    { id: "fc02-l03-f3", front: "Job story template", back: "When [situation], I want to [motivation], so I can [expected outcome].", concepts: ["fc02.job-story"] },
    { id: "fc02-l03-f4", front: "The four forces of progress", back: "Push and pull drive the switch; anxiety and habit block it.", concepts: ["fc02.forces-of-progress"] },
    { id: "fc02-l03-f5", front: "Who is Ripple's biggest competitor?", back: "What labs do today: rerun everything, memory, a spreadsheet or a script. Non-consumption and in-house tools first.", concepts: ["fc02.jtbd"] },
    { id: "fc02-l03-f6", front: "Cheapest force to move in a stalled B2B deal", back: "Usually anxiety: pilot design, shadow mode, on-prem, references, a clear exit.", concepts: ["fc02.forces-of-progress"] },
  ],
};

export default lesson;
