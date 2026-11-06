import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh08-l03",
  title: "Capacity planning: pledged hours, load, burnout maths and the bus test",
  summary:
    "Volunteer hours are small, unreliable and arrive in bursts. Plan with what leads actually deliver, not what they pledge; keep the load well below capacity because queues explode as utilisation approaches 100%; decide in writing what Suhail will not do this quarter; and make sure no workstream stops when one person is away. This lesson gives you the arithmetic for each step and applies it to an illustrative first quarter of 2027.",
  minutes: 70,
  objectives: [
    "Convert pledged hours into effective capacity with an availability factor",
    "Compute a load factor, explain why waiting time grows as load/(1 minus load), and set a safe target load",
    "Build a cut list that brings demand under the target load, and say what is deferred and what is dropped",
    "Compute the probability that a single-owner workstream stalls in a quarter, and the effect of a trained backup",
    "Recognise early burnout signals in volunteers and the structural causes behind them",
  ],
  concepts: [
    { id: "sh08.availability-factor", name: "Availability factor", description: "The share of pledged volunteer hours actually delivered over a period, after day-job peaks, travel, illness, exams and holidays. Planning at 100% of pledges guarantees misses.", competency: "sh-org" },
    { id: "sh08.load-factor", name: "Load factor", description: "Demand hours divided by effective capacity hours per week. Above 1 the backlog grows without limit; below 1 it is stable but waiting time still rises steeply as it approaches 1.", competency: "sh-org", related: ["sh08.availability-factor"] },
    { id: "sh08.utilisation-delay", name: "Utilisation and delay", description: "In a queue, average waiting time scales with u/(1 minus u) times the variability of work and of capacity (Kingman). At 80% load it is four times the service time, at 90% nine times, at 95% nineteen times.", competency: "sh-org", related: ["sh08.load-factor"] },
    { id: "sh08.bus-factor", name: "Bus factor", description: "The smallest number of people whose sudden absence would stall a workstream. A bus factor of one means a single person's bad week stops the work.", competency: "sh-org", related: ["sh08.single-owner"] },
    { id: "sh08.cut-list", name: "Cut list (stop-doing list)", description: "A written list of activities the team will defer or drop to bring demand under the target load, agreed before the quarter and visible to everyone.", competency: "sh-org", related: ["sh08.load-factor"] },
    { id: "sh08.volunteer-burnout", name: "Volunteer burnout", description: "Exhaustion, cynicism and reduced efficacy in unpaid roles, usually caused by structural overload on the most reliable people rather than by individual weakness.", competency: "sh-org", related: ["fc09.burnout", "sh08.load-factor"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "The arithmetic of a volunteer team's week",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`The fastest way to lose Suhail's leads is to plan 2027 as if they were full-time staff. A plan that needs every pledged hour is a plan in which the reliable people quietly absorb everyone else's misses until they burn out. You will make the call on what Suhail does in its first quarter; this lesson gives you the numbers to say no to good ideas before they break the team.`,
        },
        {
          kind: "md",
          md: md`### From pledges to effective capacity

A lead who pledges 6 hours a week will not deliver 6 hours every week. Day-job deadlines, travel, family, illness, exams and Ramadan all take weeks out. Plan with an **availability factor** $a_i$ per person:`,
        },
        { kind: "equation", formula: "sh08-effective-capacity" },
        {
          kind: "md",
          md: md`There is no published standard for $a$ in a volunteer team. A defensible starting assumption is 0.6 to 0.8: measure it from the hours leads actually log in the first month and update the plan.

### Load factor

Add up the weekly demand $D$ (hours of work the plan requires) and compare it with capacity:`,
        },
        { kind: "equation", formula: "sh08-load-factor" },
        {
          kind: "md",
          md: md`If $\lambda > 1$, work arrives faster than it can be done and the backlog grows by $D - C$ hours every week, without limit. Volunteer teams in that state do not announce it; things simply stop shipping and the most conscientious lead starts working 15 hours.

### Why "just under 100%" is still too much

Queueing theory explains why a team at 95% load feels as bad as one that is overloaded. For a single queue with random arrivals and service times (the M/M/1 model), the average time a task waits before anyone starts it, in units of the time it takes to do, is:`,
        },
        { kind: "equation", formula: "sh08-wait-multiplier" },
        {
          kind: "md",
          md: md`Kingman's formula generalises this: waiting time is the utilisation term $u/(1-u)$, multiplied by a term for how variable the work and the capacity are, multiplied by the service time. Reinertsen (*The Principles of Product Development Flow*) makes this the central point of product development: high utilisation of people creates long queues, and queues are where delay hides. Volunteer capacity is **highly** variable (a lead may deliver 0 hours one week and 12 the next), so the variability term is large and you should run at a lower load than a paid team.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "Waiting time multiplier versus load (M/M/1)",
          xKey: "load",
          xLabel: "Load factor u (%)",
          yLabel: "Mean wait / service time",
          series: [{ key: "wait", label: "u / (1 - u)" }],
          data: [
            { load: 50, wait: 1 },
            { load: 60, wait: 1.5 },
            { load: 70, wait: 2.33 },
            { load: 80, wait: 4 },
            { load: 85, wait: 5.67 },
            { load: 90, wait: 9 },
            { load: 95, wait: 19 },
          ],
          caption: "Going from 80% to 95% load roughly quintuples waiting time. For a volunteer team, plan at 70 to 80%.",
        },
        {
          kind: "md",
          md: md`### The bus test

The **bus factor** (or truck factor) is the number of people who would have to disappear for a workstream to stop. Suppose each person who can do a workstream is unavailable in a given week with probability $p$, independently. A workstream with $k$ people able to do it stalls in a week only if all $k$ are out:`,
        },
        { kind: "equation", formula: "sh08-stall-probability" },
        {
          kind: "md",
          md: md`Over a quarter of $n$ weeks, the probability of at least one stalled week is $1 - (1 - p^k)^n$. With $p = 0.15$ and one owner, a 12-week quarter has an 86% chance of at least one stalled week. A trained backup ($k = 2$) brings it to 24%. The independence assumption is optimistic (two leads at the same company share the same crunch, and Ramadan or a regional holiday hits everyone at once), so treat these as lower bounds.

What counts as "able to do it" is concrete: the backup has the credentials (the Resend account, the Vercel project, the newsletter platform), the written procedure, and has done it once with the owner watching.

### Burnout in unpaid roles

Founder Core covers the WHO definition of burnout (exhaustion, cynicism, reduced efficacy). In volunteer teams the cause is usually structural:

- **The reliability tax.** Work flows to whoever has delivered before, until that person carries two workstreams.
- **Guilt as a scheduler.** Volunteers do not say no to a mission they believe in; they say yes and sleep less.
- **Invisible demand.** Community moderation, replying to messages and sponsor follow-ups never appear on a plan but take hours every week.
- **No finish line.** A weekly newsletter or a Discord server never ends; without breaks built into the plan, nobody rests.

Nadia Eghbal's study of open-source maintainers (*Working in Public*) describes the same pattern: a few people carry most of the work and the demands of users grow faster than the maintainers' time. The response is the same: fewer commitments, explicit capacity, backups, and permission to stop.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "How common is a bus factor of one?",
          md: md`A 2016 study of popular GitHub projects (Avelino and colleagues, "A novel approach for estimating truck factors") reported that most of the projects it examined had a truck factor of one or two. The exact share and method were not checked for this lesson. The direction is well established: small volunteer projects routinely depend on one or two people.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Suhail's first quarter on paper",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Q1 2027: capacity, load and the cut list",
          given: md`Illustrative. Pledges per week: Partnerships 6 h, Events and Programming 6 h, Editorial 5 h, Head of Engineering 5 h, Finance Lead 3 h, founder 5 h. Availability factor $a = 0.7$ for everyone. Demand per week from the draft plan: weekly newsletter 5 h, podcast 4 h, hackathon preparation (150 participants) 8 h, sponsor pipeline 5 h, website and tooling 3 h, finance and admin 2 h, social media and community moderation 3 h.`,
          steps: [
            { md: md`**Pledged hours:** $6 + 6 + 5 + 5 + 3 + 5 = 30$ h/week. **Effective capacity:** $C = 0.7 \times 30 = 21$ h/week.` },
            { md: md`**Demand:** $D = 5 + 4 + 8 + 5 + 3 + 2 + 3 = 30$ h/week. **Load:** $\lambda = 30/21 = 1.43$. The plan is overloaded by 9 h/week, so over 12 weeks a backlog of about $9 \times 12 = 108$ hours builds up.` },
            { md: md`**Target load** 0.8, so demand must fall to $0.8 \times 21 = 16.8$ h/week or less. A cut of at least 13.2 h/week is needed.` },
            { md: md`**Cut list.** Defer the podcast to Q2 ($-4$). Newsletter fortnightly instead of weekly ($5 \to 2.5$, $-2.5$). Social media to one channel ($3 \to 1$, $-2$). Freeze new site features, maintenance only ($3 \to 1.5$, $-1.5$). Run the first hackathon for 60 participants instead of 150 ($8 \to 4.5$, $-3.5$). Total cut 13.5 h/week.` },
            { md: md`**New demand:** $30 - 13.5 = 16.5$ h/week. **New load:** $\lambda = 16.5/21 = 0.786$. **Wait multiplier:** $0.786/(1 - 0.786) = 3.67$, down from an unbounded backlog.` },
          ],
          result: md`The draft plan needs 1.43 times the team's real capacity (illustrative). Deferring the podcast, halving newsletter frequency, narrowing social, freezing features and shrinking the first hackathon brings load to 0.79. The cut list is published to the team with the plan, so "we are not doing the podcast this quarter" is a decision, not a failure.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "What a backup is worth for the newsletter",
          given: md`Illustrative: the newsletter has a single owner (Editorial lead) who is unavailable in any given week with probability $p = 0.2$. The quarter has 12 publishing weeks. Compare with a trained contributor who can send an issue from the template, with the same $p$ independently.`,
          steps: [
            { md: md`**One owner:** probability of at least one missed issue $= 1 - (1 - 0.2)^{12} = 1 - 0.8^{12}$.` },
            { md: md`$= 1 - 0.069 = 0.931$: a missed issue is almost certain.`, hidden: true, check: { prompt: "P(at least one stall) with one owner", answer: 0.931, tolerance: { abs: 0.003 } } },
            { md: md`**With a backup:** weekly stall probability $p^2 = 0.04$; over the quarter $1 - 0.96^{12}$.` },
            { md: md`$= 1 - 0.613 = 0.387$.`, hidden: true, check: { prompt: "P(at least one stall) with a backup", answer: 0.387, tolerance: { abs: 0.003 } } },
            { md: md`**Expected stalled weeks:** $12 \times 0.2 = 2.4$ with one owner, $12 \times 0.04 = 0.48$ with a backup.` },
          ],
          result: md`A trained backup cuts expected missed issues from about 2.4 to 0.5 a quarter (illustrative, assuming independent absences). Training one contributor for a few hours is one of the highest-return investments a volunteer team can make.`,
        },
        {
          kind: "question",
          question: {
            id: "sh08-l03-p1",
            type: "numeric",
            prompt: md`Illustrative: pledged hours are 28 per week with an availability factor of 0.75. Demand is 18 h/week. What is the load factor? (2 decimals)`,
            answer: 0.86,
            tolerance: { abs: 0.005 },
            explanation: md`$C = 0.75 \times 28 = 21$ h/week; $\lambda = 18/21 = 0.857 \approx 0.86$. Stable, but above the 0.8 target; expect waiting time of about six times the task duration.`,
            concepts: ["sh08.load-factor", "sh08.availability-factor"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running the capacity plan",
      blocks: [
        {
          kind: "md",
          md: md`### The quarterly capacity review (60 minutes, before the quarter)

1. **Each lead states their pledge** for the coming quarter, honestly, including known bad weeks (exams, travel, Ramadan, launches at the day job).
2. **Measure last quarter's availability factor** from logged hours, per person and for the team.
3. **List demand** per workstream in hours per week, including invisible work (moderation, replies, follow-ups).
4. **Compute load.** If above 0.8, build the cut list together. Each cut is labelled **deferred** (with a quarter) or **dropped**.
5. **Run the bus test.** For each workstream: who is the owner, who is the backup, has the backup done it once, do they have access?
6. **Publish** the plan and the cut list in the handbook (Lesson 6).

### What to cut first

Cut in this order: things with no external promise yet (the podcast before it is announced); frequency before quality (fortnightly newsletter rather than a sloppy weekly one); scope before dates (a 60-person hackathon on the announced date rather than a 150-person one that slips); and never the commitments made to sponsors.`,
        },
        { kind: "widget", widget: "risk-matrix", caption: "Map Suhail's key-person risks: place each workstream by the probability its owner is unavailable at a critical moment and the impact if it stalls. Workstreams in the top-right need a trained backup before the quarter starts." },
        {
          kind: "checklist",
          title: "Burnout early-warning signs to watch in leads",
          items: [
            "Logged hours above pledge for three weeks or more",
            "Messages sent late at night or during their weekend, repeatedly",
            "Taking on tasks from another lead's workstream without a decision",
            "Short, cynical updates where there used to be detail",
            "Missing the weekly update after months of never missing",
            "Saying \"it's fine, I'll handle it\" in reply to an offer of help",
          ],
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How capacity plans fail",
          md: md`- **Planning on pledges.** At $a = 1$ every plan looks feasible.
- **Forgetting invisible work.** Moderation and replies take hours and appear nowhere.
- **Cuts that are not written down.** The team keeps working on "deferred" items because nobody said stop.
- **Backups on paper.** A backup who has never done the task and has no credentials is not a backup.
- **The founder as buffer.** You fill every gap yourself, which hides the overload and costs Afterwave the hours.`,
        },
        { kind: "sources", refs: ["sh08-r14", "sh08-r15", "sh08-r17", "sh08-r18"] },
        { kind: "xref", to: "fc09-l05", note: "Founder Core covers burnout as an occupational syndrome, energy management and your own time across ventures; this lesson applies the same logic to a team of unpaid leads." },
        { kind: "scenario", scenario: "sh08-s1" },
        {
          kind: "question",
          question: {
            id: "sh08-l03-p2",
            type: "short",
            prompt: md`Produce **Suhail's capacity plan for Q1 2027**: a table of pledges per role with an availability factor and the effective capacity; a demand table per workstream (including invisible work); the load factor; a cut list with each item marked deferred (to when) or dropped, bringing load to 0.8 or below; and a bus-factor table naming the owner role, backup role and access the backup needs for each workstream. All numbers illustrative; no personal names.`,
            rubric: [
              "Effective capacity computed from pledges times an explicit availability factor, with the assumption stated",
              "Demand covers every workstream including invisible work (moderation, replies, follow-ups)",
              "Load factor computed correctly before and after cuts, with the after value at or below 0.8",
              "Cut list distinguishes deferred from dropped and protects commitments to sponsors and announced dates",
              "Bus-factor table names owner and backup roles and the concrete access and procedure each backup needs",
              "Numbers labelled illustrative; arithmetic checks out",
            ],
            modelAnswer: md`**Capacity (illustrative).** Pledges: Partnerships 6, Events 6, Editorial 5, Engineering 5, Finance 3, founder 5 = 30 h/week. Availability factor 0.7 (to be replaced with the measured value after January). Effective capacity $C = 21$ h/week; target demand $\le 16.8$.

**Demand before cuts (h/week).** Newsletter weekly 5; podcast 4; hackathon prep (150 people) 8; sponsor pipeline 5; website and tooling 3; finance and admin 2; social and moderation 3. Total 30; $\lambda = 1.43$.

**Cut list.**
| Item | Change | Saving | Status |
|---|---|---|---|
| Podcast | Not started this quarter | 4 | Deferred to Q2 2027 |
| Newsletter | Fortnightly | 2.5 | Deferred: weekly again when an editorial contributor is trained |
| Social | One channel only | 2 | Dropped for Q1 |
| Website | Maintenance only, no new features | 1.5 | Deferred to Q2 |
| First hackathon | 60 participants on the announced date | 3.5 | Scope reduced, date kept |

Demand after cuts 16.5; $\lambda = 0.79$. Sponsor pipeline (5 h) is not cut: it is the path to revenue.

**Bus test.**
| Workstream | Owner | Backup | Backup needs |
|---|---|---|---|
| Newsletter | Editorial | Editorial contributor | Newsletter platform editor access, template, has sent one issue |
| Hackathon | Events | Events contributor | Run sheet, venue contact, registration admin |
| Sponsor pipeline | Partnerships | Founder | CRM access, sponsor prospectus, open threads list |
| Website | Head of Engineering | Second engineering contributor | Vercel and Supabase project roles, Resend access, deploy runbook |
| Finance | Finance Lead | Founder | Bank viewer access, bookkeeping file, expense procedure |

Review at week 6: measured availability factor, logged hours against pledge, any lead above pledge three weeks running.`,
            explanation: md`A strong plan makes the trade-offs visible before the quarter starts, so nobody has to discover the overload by burning out.`,
            concepts: ["sh08.availability-factor", "sh08.load-factor", "sh08.cut-list", "sh08.bus-factor"],
            difficulty: 2,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh08-l03-q1",
      type: "numeric",
      prompt: md`At a load factor of 0.9, what is the M/M/1 waiting time multiplier $u/(1-u)$?`,
      answer: 9,
      tolerance: { abs: 0.01 },
      explanation: md`$0.9/0.1 = 9$: tasks wait on average nine times as long as they take. At 0.8 the multiplier is 4.`,
      concepts: ["sh08.utilisation-delay"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh08-l03-q2",
      type: "numeric",
      prompt: md`Pledges total 25 h/week, availability factor 0.7, demand 21 h/week. By how many hours does the backlog grow over a 12-week quarter?`,
      answer: 42,
      tolerance: { abs: 0.1 },
      unit: "h",
      explanation: md`$C = 0.7 \times 25 = 17.5$ h/week, so $D - C = 3.5$ h/week and $3.5 \times 12 = 42$ hours of backlog by the end of the quarter.`,
      concepts: ["sh08.load-factor", "sh08.availability-factor"],
      difficulty: 2,
    },
    {
      id: "sh08-l03-q3",
      type: "numeric",
      prompt: md`A workstream has one owner who is unavailable in a given week with probability 0.1. What is the probability of at least one stalled week in a 12-week quarter? (2 decimals)`,
      answer: 0.72,
      tolerance: { abs: 0.005 },
      explanation: md`$1 - 0.9^{12} = 1 - 0.282 = 0.718 \approx 0.72$. Even a reliable single owner almost certainly misses a week per quarter.`,
      concepts: ["sh08.bus-factor"],
      difficulty: 2,
    },
    {
      id: "sh08-l03-q4",
      type: "decision",
      prompt: md`Load is 1.2 for next quarter. A lead proposes everyone simply commits 2 more hours a week. What do you do?`,
      options: [
        { text: "Build a cut list to reach 0.8, deferring or dropping items explicitly, and keep pledges where people set them.", score: 1, feedback: "Right. Raising pledges under pressure lowers the availability factor and moves the overload into people's evenings." },
        { text: "Accept the extra pledges and plan at load 0.95.", score: 0.3, feedback: "Even if delivered, waiting time at 0.95 is about 19 times task duration. Plans this tight fail." },
        { text: "Cover the gap yourself.", score: 0.1, feedback: "You become the buffer, hide the overload and take the hours from Afterwave." },
        { text: "Keep the plan and see what happens.", score: 0, feedback: "The backlog grows every week and the most reliable leads absorb it." },
      ],
      explanation: md`Capacity is set by people's lives, not by the plan. The variable you control is demand.`,
      concepts: ["sh08.cut-list", "sh08.load-factor", "sh08.volunteer-burnout"],
      difficulty: 2,
    },
    {
      id: "sh08-l03-q5",
      type: "multi",
      prompt: "Which make someone a real backup for a workstream? (Select all that apply.)",
      options: [
        "They have the credentials and roles on the systems the work needs",
        "Their name is in the backup column of the plan",
        "A written procedure exists for the task",
        "They have done the task once with the owner watching",
        "They are a close friend of the owner",
      ],
      answer: [0, 2, 3],
      explanation: md`Access, a procedure and one supervised run are what turn a name into a backup. A name on a plan alone does not change the stall probability.`,
      concepts: ["sh08.bus-factor"],
      difficulty: 1,
    },
    {
      id: "sh08-l03-q6",
      type: "order",
      prompt: "Order what to cut first when demand is too high.",
      items: [
        "Work with no external promise yet",
        "Frequency (keep quality, publish less often)",
        "Scope of an announced item (keep the date)",
        "Commitments made to sponsors",
      ],
      explanation: md`Cut what nobody outside the team expects first; protect sponsor commitments last, because they are both a promise and the revenue path.`,
      concepts: ["sh08.cut-list"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "sh08-l03-f1", front: "Effective capacity", back: md`$C = \sum_i a_i h_i$: pledged hours times availability factor.`, concepts: ["sh08.availability-factor"] },
    { id: "sh08-l03-f2", front: "Load factor and what it means above 1", back: md`$\lambda = D/C$; above 1 the backlog grows by $D - C$ every week.`, concepts: ["sh08.load-factor"] },
    { id: "sh08-l03-f3", front: "Wait multiplier at 80%, 90%, 95% load", back: "4, 9 and 19 times the task duration (M/M/1).", concepts: ["sh08.utilisation-delay"] },
    { id: "sh08-l03-f4", front: "Probability a workstream stalls in a week with k able people", back: md`$p^k$ (independent absences, each with probability $p$).`, concepts: ["sh08.bus-factor"] },
    { id: "sh08-l03-f5", front: "Target load for a volunteer team", back: "0.7 to 0.8, lower than a paid team because volunteer capacity is so variable.", concepts: ["sh08.utilisation-delay", "sh08.load-factor"] },
    { id: "sh08-l03-f6", front: "Most common structural cause of volunteer burnout", back: "Work flows to the most reliable person until they carry two workstreams (the reliability tax).", concepts: ["sh08.volunteer-burnout"] },
  ],
  scenarios: [
    {
      id: "sh08-s1",
      title: "Two weeks before the hackathon, the Head of Engineering goes quiet",
      dayInLife: true,
      context: md`Illustrative. Suhail's first hackathon is in 14 days, with 60 accepted participants. Registration and acceptance emails run on suhail.build (Vercel, Supabase, Resend). The Head of Engineering owns the stack and has not posted an update for 9 days. Nobody else has deploy access. Acceptance emails for the waiting list must go out in 3 days.`,
      start: "a",
      concepts: ["sh08.bus-factor", "sh08.volunteer-burnout", "sh08.single-owner"],
      nodes: {
        a: {
          md: md`What is your first move?`,
          choices: [
            { text: "Send a short, warm private message: ask if they are OK, say you noticed the silence, and ask whether they can hand over access for the next two weeks.", next: "b", score: 9, feedback: "Good: you treat silence as a signal about the person first, and you ask for the one thing that unblocks the work." },
            { text: "Post in the team channel that engineering is blocking the hackathon.", next: "c", score: 2, feedback: "Public blame of a silent volunteer usually ends their involvement and does not get you access." },
            { text: "Ask a friend who is a developer to rebuild the registration flow on another platform.", next: "d", score: 4, feedback: "It may work, but you create a second system three days before emails go out and bypass the owner." },
          ],
        },
        b: {
          md: md`They reply the next day: their employer has a release crisis and they are working until midnight. They apologise and say they can give 30 minutes on Saturday.`,
          choices: [
            { text: "Thank them, use the 30 minutes to add a second engineering contributor to Vercel, Supabase and Resend with the right roles, and walk through the email send once. Move them to the contributor rung until the crisis ends.", score: 10, feedback: "Excellent: you raise the bus factor from one to two, keep them in the team, and the ladder makes the step down normal." },
            { text: "Ask them to stay on and just send the emails themselves when they can.", score: 4, feedback: "You keep a bus factor of one on a deadline three days away, on a person who has told you they have no time." },
          ],
        },
        c: {
          md: md`The Head of Engineering sees the message, replies "sorry", and leaves the channel. You still have no access.`,
          choices: [
            { text: "Apologise privately, explain the deadline, and ask for 30 minutes to hand over access.", score: 5, feedback: "Recoverable, but you spent trust you will need. Next time, private first." },
            { text: "Contact the hosting providers to try to recover the accounts.", score: 2, feedback: "Account recovery takes days and may not work; it also signals you have written the person off." },
          ],
        },
        d: {
          md: md`Your friend builds a form in two days. Some applicants are now in two systems, and the Head of Engineering later finds out the work was redone without asking.`,
          choices: [
            { text: "Reconcile the lists, apologise to the Head of Engineering, and agree a backup and access policy for every system after the event.", score: 5, feedback: "You recover the event, but the lesson is that a backup with access should have existed before the quarter started." },
            { text: "Keep the new system and move on.", score: 2, feedback: "You now have two systems, one unmaintained, and a lead who feels replaced." },
          ],
        },
      },
    },
  ],
};

export default lesson;
