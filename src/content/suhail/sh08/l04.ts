import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh08-l04",
  title: "Recruiting, onboarding, recognising and offboarding volunteers",
  summary:
    "At realistic retention Suhail will recruit several leads a year, so recruiting is a standing process, not an emergency. This lesson builds the volunteer pipeline (where leads come from, how many applicants you need, a time-boxed trial project instead of a long interview), a first-30-days onboarding plan, recognition that is specific and public, and the hardest part: ending a volunteer's role kindly and cleanly, including the access and handover checklist.",
  minutes: 65,
  objectives: [
    "Size a volunteer pipeline backwards from the seats you need, using stage conversion rates",
    "Design a short, fair trial project and a screening conversation for a lead role",
    "Write a first-30-days onboarding plan that gets a new lead to a visible first win",
    "Recognise volunteers specifically and publicly, without controlling rewards",
    "Run a kind exit: one honest conversation, a lower rung or reset, a clean handover and same-day access removal",
  ],
  concepts: [
    { id: "sh08.volunteer-pipeline", name: "Volunteer pipeline", description: "Sourcing and selection stages from interest to an active lead, with conversion rates per stage; sized backwards from the seats to fill. Most good leads come from people already contributing.", competency: "sh-org", related: ["sh08.volunteer-retention"] },
    { id: "sh08.trial-project", name: "Trial project", description: "A small, time-boxed, real piece of work (for example drafting one sponsor email sequence or one newsletter section) agreed in advance, used to see how a candidate works; the volunteer analogue of a work sample.", competency: "sh-org", related: ["fc09.work-sample", "sh08.volunteer-pipeline"] },
    { id: "sh08.onboarding", name: "Volunteer onboarding", description: "A planned first 30 days: welcome, charter, access, a buddy, and a first visible win in the first two weeks; early integration predicts whether a volunteer stays.", competency: "sh-org", related: ["sh08.lead-charter"] },
    { id: "sh08.recognition", name: "Specific recognition", description: "Public, specific acknowledgement of what a volunteer did and what it changed, delivered soon after; informational rather than controlling, so it supports competence and relatedness.", competency: "sh-org", related: ["sh08.self-determination"] },
    { id: "sh08.kind-exit", name: "Kind exit (offboarding)", description: "Ending or reducing a volunteer's role with a direct, private conversation based on agreed expectations, an offer of a lower rung where appropriate, a handover, public thanks and same-day removal of access.", competency: "sh-org", related: ["sh08.commitment-ladder", "sh08.access-hygiene"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Recruiting is a funnel, and leaving is part of the design",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Lesson 1 showed that five seats at 95% monthly retention need about three recruits a year. If each recruit is an emergency, Suhail loses a workstream for a month every time. And because volunteers cannot be dismissed the way employees can, a lead who has stopped delivering can freeze a workstream for a quarter while everyone avoids the conversation. You will run both processes; doing them well is cheaper than doing them late.`,
        },
        {
          kind: "md",
          md: md`### Where leads come from

The best predictor that someone will do a lead role well is that they have already done some of it. In a community like Suhail, the natural pipeline is: attendees become helpers at an event, helpers become contributors on a project, contributors become leads. Open calls ("we're looking for a Partnerships lead") are a second source; personal referrals from current leads are a third. The **contributor share** of the community (how many members actively contribute rather than only attend) is your bench.`,
        },
        { kind: "widget", widget: "community-funnel", caption: "The contributor share of the community funnel is where future leads come from. A community with healthy reach but almost no contributors will struggle to refill lead seats." },
        {
          kind: "md",
          md: md`### Sizing the pipeline backwards

Each stage converts a fraction $c_i$ of people to the next. To end with $N$ new leads you need at the top:`,
        },
        { kind: "equation", formula: "sh08-pipeline-yield" },
        {
          kind: "flow",
          title: "A volunteer lead pipeline (illustrative conversion rates)",
          steps: [
            { label: "Application", detail: "Short form: role, motives, hours available, one example of relevant work." },
            { label: "Screening call (50%)", detail: "30 minutes: motives (VFI), hours, term, what Suhail gives and does not give." },
            { label: "Trial project offered (50%)", detail: "A 3 to 4 hour real task with criteria written in advance." },
            { label: "Trial completed (60%)", detail: "Reviewed against the criteria; feedback given either way." },
            { label: "Offer accepted (70%)", detail: "Charter agreed, start date, buddy assigned." },
          ],
          caption: "End-to-end yield 0.5 x 0.5 x 0.6 x 0.7 = 0.105: about 20 applications per two leads.",
        },
        {
          kind: "md",
          md: md`### Trial project, not a long interview

fc09 shows that work samples predict job performance better than unstructured interviews. For volunteers the same logic applies with two adjustments: keep it short (3 to 4 hours at most, because it is unpaid) and make it **real but not critical**, so the work has value if it is good and costs nothing if it is not. Examples: Partnerships drafts a three-email sequence to one sponsor category; Editorial writes one newsletter section to the style guide; Head of Engineering fixes one scoped issue in the site repository; Finance Lead sets up the expense log for one past event. Write the criteria before you send it.

A trial also tests the thing interviews never reveal: whether the person delivers when they said they would.

### Onboarding: integration in the first weeks

Research on volunteer retention consistently points to the early period: people who feel integrated into the organisation and see their contribution matter are more likely to stay (Omoto and Snyder's work on sustained volunteering is the classic reference). The design goal of onboarding is a **visible first win within two weeks**: something the new lead owned, shipped and got thanked for.

| Day | What happens |
|---|---|
| 0 | Welcome message from the founder; charter signed off; access granted to the systems in the charter (least privilege, Lesson 6) |
| 1 to 3 | 45-minute handover from the previous owner or founder; read the handbook pages for their workstream |
| 1 to 14 | A buddy (another lead) for questions; first owned deliverable chosen and scheduled |
| 14 | First win shipped and recognised in the weekly review |
| 30 | Check-in: is the role what they expected; hours versus pledge; adjust |

### Recognition that works

Recognition is the main non-cash return, so it must be done properly. Following Lesson 1, keep it **informational** rather than controlling: specific ("your sponsor follow-up sequence got two replies from companies we had never reached"), public where the person wants it, soon after the work, and tied to what it changed. Generic thanks at the end of the year and hours leaderboards are weak or harmful.

| Recognition | When | Cost |
|---|---|---|
| Specific thanks in the weekly review | Weekly | Zero |
| Named credit on the event page, newsletter and site team page | Each output | Zero |
| Stage time: host a session, introduce a speaker | Each event | Zero |
| LinkedIn recommendation or reference letter | On request, and at the end of each term | 30 minutes |
| Introductions to investors and employers in Suhail's network | When it fits their goals | Your reputation |
| Paid travel to an event they run | Per event | Cash, budgeted |

### Ending a role

Volunteers leave for good reasons (a new job, a child, a move) and for bad ones (the role was badly designed). Sometimes you must end a role: commitments are missed repeatedly, or someone's behaviour harms the team. Kim Scott's *Radical Candor* frame fits: **care personally and challenge directly.** Avoiding the conversation is not kindness; it lets the person fail in public and the workstream stall.

Two different processes:

1. **Performance or fit** (missed commitments, wrong role). Private conversation based on the agreed charter and the evidence; offer a lower rung or a time-boxed reset; if it does not work, end the role with thanks, a handover and alumni status.
2. **Conduct** (harassment, breach of the code of conduct, misuse of data or money). Follow the code-of-conduct process, remove access immediately, no public thanks, and record what happened. Kindness here is owed first to the people affected.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "How many applicants, and how many of your hours",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Refilling two lead seats",
          given: md`Illustrative: Suhail needs two new leads for the second half of 2027. Conversion rates as in the flow above: screening call 0.5, trial offered 0.5, trial completed 0.6, offer accepted 0.7. Founder time: 15 minutes to read an application, 30 minutes per screening call, 1.5 hours to review a completed trial, 6 hours of onboarding per new lead.`,
          steps: [
            { md: md`**End-to-end yield:** $0.5 \times 0.5 \times 0.6 \times 0.7 = 0.105$.` },
            { md: md`**Applications needed:** $N_{\text{top}} = 2/0.105 = 19.0$, so plan for **20 applications**.` },
            { md: md`**Funnel:** 20 applications, 10 screening calls, 5 trials offered, 3 completed, about 2.1 accepted.` },
            { md: md`**Founder hours:** reading $20 \times 0.25 = 5$; calls $10 \times 0.5 = 5$; trial reviews $3 \times 1.5 = 4.5$; onboarding $2 \times 6 = 12$. Total 26.5 hours, about **13 hours per lead**.` },
            { md: md`**Where to cut the hours:** a current lead runs the screening calls and reviews trials in their own area, which removes 9.5 hours from you and is also recognition (trusted with hiring). The founder keeps the final conversation.` },
          ],
          result: md`Two leads need about 20 applications and 26.5 hours of founder time (illustrative), or about 17 if current leads run screening and trial review. Starting the search when a lead first signals they may step down, not when they leave, avoids an empty seat.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Event helpers for the first hackathon",
          given: md`Illustrative: the 60-person hackathon needs 6 helpers on the day. From past community events (assumed), 60% of people who sign up to help confirm in the final week, and 75% of those who confirm show up.`,
          steps: [
            { md: md`**Yield:** $0.6 \times 0.75$.` },
            { md: md`$= 0.45$.`, hidden: true, check: { prompt: "Sign-up to show-up yield", answer: 0.45, tolerance: { abs: 0.005 } } },
            { md: md`**Sign-ups needed:** $6/0.45$.` },
            { md: md`$= 13.3$, so recruit **14** helper sign-ups.`, hidden: true, check: { prompt: "Sign-ups needed (unrounded)", answer: 13.33, tolerance: { abs: 0.02 } } },
          ],
          result: md`Recruit 14 sign-ups for 6 helpers (illustrative). Asking only 6 people guarantees a short-staffed event.`,
        },
        {
          kind: "question",
          question: {
            id: "sh08-l04-p1",
            type: "numeric",
            prompt: md`Illustrative: you need 3 contributors for the newsletter. Stages: interest form to intro call 0.6, intro call to trial 0.7, trial to active contributor 0.5. How many interest forms do you need? (round up to a whole number)`,
            answer: 15,
            tolerance: { abs: 0.01 },
            explanation: md`Yield $= 0.6 \times 0.7 \times 0.5 = 0.21$; $3/0.21 = 14.3$, so 15 forms.`,
            concepts: ["sh08.volunteer-pipeline"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running the volunteer lifecycle",
      blocks: [
        {
          kind: "md",
          md: md`### The step-down conversation (performance or fit)

1. **Prepare the evidence** against the charter: owned outcomes, the commitments in the weekly updates, what was missed and when. No adjectives.
2. **Private, live, short.** Not in writing first; a message reads colder than you intend.
3. **Open with the relationship, then the facts.** "I value what you've done on X. I want to talk about the last six weeks: three of six issues did not go out on the agreed date."
4. **Ask before proposing.** "What's going on?" Often the answer is the day job, and the solution is the ladder.
5. **Offer options:** a lower rung (contributor), a smaller scope, or a 4-week reset with one specific commitment. Agree it in writing after the call.
6. **If the reset fails,** end the role in a second conversation: thank them, agree the handover, offer alumni status and a reference for what they did well.

### Offboarding checklist

| Step | When |
|---|---|
| Handover document: open threads, contacts, files, recurring tasks | Before the last day |
| Remove or downgrade access: email aliases, workspace, project board, Vercel, Supabase, Resend, newsletter platform, social accounts, bank and card | Same day the role ends (immediately for conduct cases) |
| Rotate any shared passwords or API keys they knew | Same day |
| Update the team page, charter and DACI table | Within a week |
| Public thanks with specifics (not for conduct cases) | At the next newsletter or weekly review |
| Alumni channel invitation and reference offer | At the end |`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Recruiting only when a seat is empty.** The seat stays empty for a month or more.
- **Unpaid trials that are really free work.** A 20-hour "trial" is exploitation and damages Suhail's reputation with exactly the builders it serves.
- **Onboarding by chat.** "Ask me if you need anything" is not a plan; the new lead has no first win and drifts.
- **Thanking only the visible roles.** Finance and engineering work is invisible; recognise it explicitly.
- **Avoiding the conversation.** Three months of missed issues before anyone says anything.
- **Leaving access in place.** A former volunteer still holds the admin login to the newsletter or a Supabase key months later.`,
        },
        { kind: "scenario", scenario: "sh08-s2" },
        { kind: "sources", refs: ["sh08-r7", "sh08-r19", "sh08-r1"] },
        { kind: "xref", to: "fc09-l01", note: "Founder Core covers scorecards, structured interviews and work samples for paid hires; the trial project here is the volunteer version of the work sample." },
        {
          kind: "question",
          question: {
            id: "sh08-l04-p2",
            type: "short",
            prompt: md`Suhail's Partnerships lead has said they will step down at the end of June 2027. Write the **recruiting and onboarding pack** for the replacement: (1) a public role post (under 200 words) that is honest about hours, term and what Suhail does and does not give; (2) the screening call questions; (3) a trial project with written criteria; (4) a first-30-days onboarding plan with a first win by day 14; (5) the pipeline sizing with assumed conversion rates. No names; numbers illustrative.`,
            rubric: [
              "Role post states owned outcomes, hours per week, term, returns and that the role is unpaid, with no equity or salary promises",
              "Screening questions probe motives, real availability (including known busy periods) and relevant experience",
              "Trial project is real, small (3 to 4 hours), not business-critical, with criteria written in advance",
              "Onboarding plan includes access, handover from the outgoing lead, a buddy and a specific first win by day 14",
              "Pipeline is sized backwards with explicit conversion rates and starts early enough to overlap with the outgoing lead",
              "No invented sponsors, names or traction",
            ],
            modelAnswer: md`**(1) Role post.** *Suhail is looking for a volunteer Partnerships lead.* Suhail is a builder community for the Arab world: hackathons, a newsletter, a podcast and a conference that connect builders with investors and employers. You will own our sponsor and partner pipeline: building the target list, running conversations, writing proposals on our standard tiers and making sure sponsors get what they paid for. About 6 hours a week, for a six-month renewable term starting July 2027. The role is unpaid until Suhail has revenue: no salary, no equity. What you get: real deal experience, decision rights within a charter, introductions across the investors and employers we work with, named credit, a reference, expenses covered and first consideration when paid roles open. Apply with a short note and one example of a deal or partnership you have worked on.

**(2) Screening questions.** What would make this worth it for you a year from now? Which weeks between July and December are already busy for you? Tell me about a deal you moved from first contact to signature: what did you do? What would you need from the founder, and what would you rather decide yourself? How do you prefer to work across time zones?

**(3) Trial project (3 hours, criteria first).** Draft a three-email sequence to one sponsor category (for example developer tool companies) for a 60-person hackathon, plus a one-paragraph rationale. Criteria: leads with the sponsor's outcome rather than our needs; one clear ask; uses the standard tiers; under 120 words per email; delivered on the agreed date.

**(4) First 30 days.** Day 0: charter, CRM, shared drive and email alias access. Days 1 to 7: two handover calls with the outgoing lead, who introduces them to every open conversation by email. Buddy: Events and Programming lead. First win by day 14: send the follow-up proposals to two open conversations from the handover and present them at the weekly review. Day 30: check-in on hours, fit and the Q3 targets.

**(5) Pipeline.** Yield $0.5 \times 0.5 \times 0.6 \times 0.7 = 0.105$; for one lead, $1/0.105 \approx 10$ applications. Post in mid-April via the newsletter and community channels and ask current contributors directly, so the new lead overlaps for at least four weeks with the outgoing one.`,
            explanation: md`A strong pack is honest enough that the wrong candidates self-select out, and specific enough that the new lead can do something visible in the first two weeks.`,
            concepts: ["sh08.volunteer-pipeline", "sh08.trial-project", "sh08.onboarding", "sh08.volunteer-value-proposition"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a Suhail lead who is uncomfortable with it why ending a volunteer's role directly can be kinder than letting it drift.",
          keyPoints: [
            "Drift lets the person fail in public and the workstream stall, which hurts them and the team",
            "A direct, private conversation based on agreed commitments is respectful and specific",
            "Offer a lower rung or a reset first; most cases end with the person staying in a smaller role",
            "If the role ends: handover, same-day access removal, public thanks and alumni status",
            "Conduct cases follow a different process: protect the people affected first",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh08-l04-q1",
      type: "numeric",
      prompt: md`Stage conversions are 0.4, 0.5 and 0.5. How many applicants do you need for 2 new leads?`,
      answer: 20,
      tolerance: { abs: 0.01 },
      explanation: md`Yield $= 0.4 \times 0.5 \times 0.5 = 0.1$; $2/0.1 = 20$.`,
      concepts: ["sh08.volunteer-pipeline"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh08-l04-q2",
      type: "mcq",
      prompt: "Which is the best trial project for a Head of Engineering candidate?",
      options: [
        "Rebuild the registration system over a weekend",
        "Fix one scoped issue in the site repository, about 3 hours, with acceptance criteria written in advance",
        "Answer ten trivia questions about JavaScript",
        "No trial; a one-hour conversation is enough",
      ],
      answer: 1,
      explanation: md`It is real, small, not critical and judged against criteria written first. A weekend rebuild is unpaid labour on a critical system; trivia does not predict how someone works.`,
      concepts: ["sh08.trial-project"],
      difficulty: 1,
    },
    {
      id: "sh08-l04-q3",
      type: "multi",
      prompt: "Which are examples of informational (not controlling) recognition? (Select all that apply.)",
      options: [
        "\"Your sponsor follow-up got replies from two companies we had never reached\" said in the weekly review",
        "A monthly ranking of leads by hours logged",
        "Named credit on the event page for the run sheet",
        "Inviting a lead to host the opening session they programmed",
        "A points system redeemable for merchandise",
      ],
      answer: [0, 2, 3],
      explanation: md`Specific, public acknowledgement and new responsibility signal competence. Rankings and points tie the reward to a metric and can crowd out intrinsic motivation.`,
      concepts: ["sh08.recognition", "sh08.crowding-out"],
      difficulty: 2,
    },
    {
      id: "sh08-l04-q4",
      type: "order",
      prompt: "Order the steps of a kind exit for a lead who keeps missing commitments.",
      items: [
        "Prepare evidence against the charter and weekly updates",
        "Private live conversation: relationship first, then the facts, then ask what is going on",
        "Offer a lower rung or a time-boxed reset, confirmed in writing",
        "If the reset fails, end the role and agree the handover",
        "Remove access the same day and thank them publicly",
      ],
      explanation: md`Evidence, conversation, an option to stay in a smaller role, then a clean exit if needed.`,
      concepts: ["sh08.kind-exit"],
      difficulty: 1,
    },
    {
      id: "sh08-l04-q5",
      type: "decision",
      prompt: md`A volunteer at a Suhail hackathon is reported by two participants for repeated unwanted comments. The volunteer is also an excellent contributor. What do you do?`,
      options: [
        { text: "Follow the code-of-conduct process: speak to the reporters, remove the volunteer from the event and their access immediately, record what happened, and decide on future involvement under the policy.", score: 1, feedback: "Right. Conduct cases protect the people affected first; contribution quality is irrelevant." },
        { text: "Have a quiet word and let them carry on, because they are valuable.", score: 0, feedback: "This tells participants their safety matters less than a helper's output and exposes Suhail to serious harm." },
        { text: "Move them to a back-office role for the rest of the event.", score: 0.2, feedback: "Still avoids the process and leaves the reporters without a response." },
        { text: "Post about it in the community channel.", score: 0, feedback: "Public disclosure before a process harms everyone involved, including the reporters." },
      ],
      explanation: md`Performance problems get a kind, gradual process; conduct problems get a firm, immediate one with a record.`,
      concepts: ["sh08.kind-exit"],
      difficulty: 2,
    },
    {
      id: "sh08-l04-q6",
      type: "mcq",
      prompt: "What is the main design goal of a volunteer lead's first two weeks?",
      options: [
        "Read the entire handbook",
        "Attend every meeting",
        "Ship a visible first win they owned, and get recognised for it",
        "Shadow the founder",
      ],
      answer: 2,
      explanation: md`Early integration and a sense that the contribution matters are what keep volunteers. A first win gives competence and relatedness at once.`,
      concepts: ["sh08.onboarding"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh08-l04-f1", front: "Applicants needed for N leads", back: md`$N_{\text{top}} = N / \prod_i c_i$; at 0.105 yield, about 10 per lead.`, concepts: ["sh08.volunteer-pipeline"] },
    { id: "sh08-l04-f2", front: "Best source of future leads", back: "People already contributing: helpers become contributors, contributors become leads.", concepts: ["sh08.volunteer-pipeline"] },
    { id: "sh08-l04-f3", front: "Volunteer trial project rules", back: "Real, small (3 to 4 h), not critical, criteria written in advance, feedback either way.", concepts: ["sh08.trial-project"] },
    { id: "sh08-l04-f4", front: "Onboarding milestone at day 14", back: "A visible first win the new lead owned, recognised in the weekly review.", concepts: ["sh08.onboarding"] },
    { id: "sh08-l04-f5", front: "Recognition that works", back: "Specific, public (if wanted), soon after, tied to what it changed.", concepts: ["sh08.recognition"] },
    { id: "sh08-l04-f6", front: "Performance exit versus conduct exit", back: "Performance: private talk, lower rung or reset, then thanks and handover. Conduct: code-of-conduct process, immediate access removal, no public thanks.", concepts: ["sh08.kind-exit"] },
  ],
  scenarios: [
    {
      id: "sh08-s2",
      title: "The Editorial lead who will not step down",
      context: md`Illustrative. Over the last six weeks, three of six newsletter issues went out late or not at all. The Editorial lead's weekly updates say "on track" each time. Two contributors have privately told you they are frustrated. The lead joined in January and was excellent for the first two months.`,
      start: "a",
      concepts: ["sh08.kind-exit", "sh08.commitment-ladder", "sh08.recognition"],
      nodes: {
        a: {
          md: md`How do you open?`,
          choices: [
            { text: "Ask for a 30-minute call. Open with what they did well in January and February, then state the facts: three of six issues missed against the charter. Ask what is going on.", next: "b", score: 9, feedback: "Good: private, live, relationship first, facts without adjectives, and a question before a proposal." },
            { text: "Send a written message listing the missed issues and asking them to step down.", next: "c", score: 3, feedback: "Accurate but cold; a message like this usually ends the relationship and often the conversation." },
            { text: "Quietly ask one of the contributors to produce the next issues instead.", next: "d", score: 1, feedback: "You create a shadow owner, the lead finds out, and nobody has addressed the problem." },
          ],
        },
        b: {
          md: md`They admit they started a new job in March and have about 2 hours a week, but they love the newsletter and do not want to give it up.`,
          choices: [
            { text: "Offer the contributor rung: they write one section per issue, which fits 2 hours, and a contributor who has been running issues steps up to lead. Confirm in writing and thank them publicly for the first quarter.", score: 10, feedback: "Excellent: they stay, the workstream gets an owner with real hours, and the ladder makes the change honourable." },
            { text: "Agree they keep the lead role but promise to try harder.", score: 3, feedback: "Nothing has changed except a promise. The next miss will be worse for everyone." },
            { text: "Give them a 4-week reset with one specific commitment (two issues on time) and review.", score: 6, feedback: "Reasonable if they believe they can find the hours; with only 2 hours a week the rung change is more honest." },
          ],
        },
        c: {
          md: md`They reply defensively that nobody told them there was a problem, which is true: their updates said "on track" and nobody challenged them.`,
          choices: [
            { text: "Apologise for raising it in writing, offer a call, and acknowledge the updates should have been questioned earlier.", score: 6, feedback: "Recoverable. The lesson: compare updates with outcomes every week, so problems surface early." },
            { text: "Insist that the facts speak for themselves.", score: 1, feedback: "They do, but you have made it about winning the argument." },
          ],
        },
        d: {
          md: md`The lead sees an issue go out that they did not write and leaves the team without a word.`,
          choices: [
            { text: "Contact them, apologise for going around them, thank them for their work, and offer alumni status and a reference.", score: 4, feedback: "You save some of the relationship. The workstream now needs a proper handover you never got." },
            { text: "Let it go; the problem solved itself.", score: 0, feedback: "You lost a person who was excellent for two months, and every other lead saw how it happened." },
          ],
        },
      },
    },
  ],
};

export default lesson;
