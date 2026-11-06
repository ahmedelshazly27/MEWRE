import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh10-l04",
  title: "Run-of-show, team plan, risk register and permits",
  summary:
    "Turn the plan into execution: a T-minus timeline and a minute-by-minute run-of-show, a team plan that fits the real hours of five unpaid leads, a risk register whose expected cost checks the contingency, the safeguarding and judging rules, and a permit plan for Riyadh that puts the licence with a local host.",
  minutes: 85,
  objectives: [
    "You can write a T-minus plan and an event-day run-of-show with an owner on every line.",
    "You can compute the reliable hours an unpaid team can give and close the gap with explicit choices.",
    "You can assign one accountable owner per workstream with a RACI and a named backup.",
    "You can build a risk register with probability, impact, expected monetary value, owner and trigger, and check it against the contingency.",
    "You can write a permit plan for a Riyadh event that states what is known, what is unverified and who confirms it.",
  ],
  concepts: [
    {
      id: "sh10.run-of-show",
      name: "Run-of-show",
      description:
        "The T-minus plan from T-12 weeks to T+2 weeks and the minute-by-minute event-day schedule, each line with an owner, a backup and the sponsor benefit or metric it delivers.",
      competency: "sh-events",
    },
    {
      id: "sh10.volunteer-capacity",
      name: "Volunteer capacity",
      description:
        "Reliable hours = sum of committed weekly hours x weeks x a reliability factor (about 0.7 to 0.8 for unpaid leads with day jobs). Compare it with the hours each workstream needs and close the gap before the plan is promised to sponsors.",
      competency: "sh-org",
    },
    {
      id: "sh10.raci",
      name: "Workstream ownership (RACI)",
      description:
        "Each workstream has exactly one Accountable lead, named Responsible doers, who is Consulted and who is Informed, plus a backup. For an unpaid team, single ownership and a backup matter more than titles.",
      competency: "sh-org",
      related: ["sh10.volunteer-capacity"],
    },
    {
      id: "sh10.risk-register",
      name: "Event risk register",
      description:
        "Risks with probability, cost impact, expected monetary value, owner, trigger and response. The sum of expected costs is the bottom-up check on contingency; non-financial risks (safety, conduct, data, judging) get responses even when their cost is hard to price.",
      competency: "sh-events",
    },
    {
      id: "sh10.permits",
      name: "Permit plan",
      description:
        "Which authority's permit or licence may apply, who applies (ideally the licensed local host), the timeline and the written confirmation. For Saudi Arabia: GEA for public or ticketed events, SCEGA for conferences and exhibitions, MISA and a commercial registration for foreign organisers; hackathon treatment unverified.",
      competency: "sh-events",
    },
    {
      id: "sh10.code-of-conduct",
      name: "Code of conduct and judging integrity",
      description:
        "A published code of conduct with a reporting channel and named responders, an 18-plus age rule, photo consent, published judging criteria and conflict declarations. These protect builders and make sponsor prizes credible.",
      competency: "sh-community",
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Timeline, capacity and risk",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Your leads have day jobs and no salary. A plan that silently assumes 10 hours a week from each of them fails in week 6, usually on the workstream with the most deadlines. And on event day you are responsible for 120 people in someone else's building, in a country whose event licensing you have not navigated before. The run-of-show, the capacity check, the risk register and the permit plan are how you turn that into a set of named owners and dates.`,
        },
        {
          kind: "flow",
          title: "T-minus plan for Riyadh 01 (Friday 23 April 2027)",
          steps: [
            { label: "T-12 weeks (29 Jan)", detail: "Host agreement signed; permit question sent to host in writing; prospectus out; applications open" },
            { label: "T-10 weeks (12 Feb)", detail: "Pipeline review; judges and mentors invited; Ramadan expected from about 8 Feb: front-load sponsor decisions" },
            { label: "T-8 weeks (26 Feb)", detail: "Permit position confirmed in writing; vendor quotes final; code of conduct and rules published" },
            { label: "T-6 weeks (12 Mar)", detail: "Cash gate: go, shrink or move; caterer, AV, security committed" },
            { label: "T-4 weeks (26 Mar)", detail: "Acceptances sent (185); sponsor balances due; tracks and starter kits final" },
            { label: "T-1 week (16 Apr)", detail: "Reconfirmations at 72 hours; volunteer briefing; dry run of wifi, judging form, submission form" },
            { label: "Event (23 to 24 Apr)", detail: "Run-of-show below" },
            { label: "T+2 weeks (7 May)", detail: "Sponsor reports out; post-event report; renewal calls booked" },
          ],
          caption: "Work backwards from the event and from the cash gate; Ramadan and Eid sit between T-11 and T-6 weeks in this plan.",
        },
        {
          kind: "md",
          md: md`### How many hours the team really has

Unpaid leads give what their jobs and families allow. Plan with committed hours times a reliability factor, and compare it with what each workstream needs.`,
        },
        { kind: "equation", formula: "sh10-volunteer-capacity" },
        {
          kind: "md",
          md: md`Illustrative: five leads commit 6 hours a week for 12 weeks. Committed $5 \times 6 \times 12 = 360$ hours; reliable at $\rho = 0.75$: 270 hours. The workstreams need about 360 hours, so the gap is 90 hours **before** event days. It is closed by explicit choices (founder hours, event-day volunteers, cutting scope), not by hoping people work harder.

### Risk register and expected monetary value

For each risk, estimate its probability and its cost if it happens. The expected monetary value is the probability-weighted cost; the sum over the register is the bottom-up check on the contingency in the budget.`,
        },
        { kind: "equation", formula: "sh10-emv" },
        {
          kind: "widget",
          widget: "risk-matrix",
          caption: "Place the worked plan's risks on a 5 x 5 probability-impact grid. Expected cost decides contingency; the grid decides attention: a low-cost, high-harm safety risk still needs an owner and a response.",
        },
        { kind: "xref", to: "m08-l05", note: "Risk registers, probability-impact matrices and Monte Carlo in Track 0: the method in depth; here it is applied to one event." },
      ],
    },
    {
      layer: "applied",
      title: "Worked team plan, run-of-show and register",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Fit the workstreams to the team",
          given: md`**Illustrative.** Each lead commits 6 h/week for 12 weeks; $\rho = 0.75$, so each lead's reliable capacity is $6 \times 12 \times 0.75 = 54$ h. You (founder) commit 8 h/week: 96 h. Hours each workstream needs before event days:

| Workstream | Accountable | Needs (h) |
|---|---|---|
| Sponsors: targets, calls, contracts, fulfilment | Partnerships | 90 |
| Venue, vendors, programme, judges, volunteers | Events and Programming | 120 |
| Campaign, applications comms, newsletter, content | Editorial | 60 |
| Application and submission forms, judging tool, wifi spec, starter kit | Head of Engineering | 50 |
| Budget, invoices, payments, gate, VAT question | Finance Lead | 40 |`,
          steps: [
            { md: md`Gaps per lead against 54 h: Partnerships $90 - 54 = 36$; Events $120 - 54 = 66$; Editorial $60 - 54 = 6$; Engineering $50 - 54 = -4$ (spare); Finance $40 - 54 = -14$ (spare). Total gap $36 + 66 + 6 = 108$; spare $18$; net gap $90$ hours.` },
            { md: md`**Close it explicitly.** Founder: 40 h on sponsors (first calls, top five deals) and 50 h on Events (host relationship, permits, judges). Finance Lead's spare 14 h takes vendor payments and quotes off Events. Engineering's spare 4 h covers the Editorial gap with automated application emails. Remaining Events gap $66 - 50 - 14 = 2$ h, and Editorial $6 - 4 = 2$ h: absorbed by trimming scope (no printed programme).` },
            { md: md`**Event days.** 120 builders at about 1 floor volunteer per 15 builders gives 8 floor volunteers, plus 3 at check-in and 2 runners: 13 event-day volunteers recruited from applicants who were not accepted and from the host's student clubs, each with a 2-hour briefing. Security and first aid come from the host or a contracted provider, never volunteers.` },
            { md: md`**Backups.** Every Accountable lead names a backup who is Consulted on all decisions from T-6 weeks: if a lead's job takes over in event week, the backup steps in without a handover meeting.` },
          ],
          result: md`The plan needs 360 hours; the team reliably gives 270 plus the founder's 96. It fits only because the founder carries 90 hours and scope is trimmed. That is the honest picture to show the team before anyone promises sponsors more.`,
        },
        {
          kind: "md",
          md: md`### Event-day run-of-show (illustrative, Riyadh 01)

| Time | Day 1, Friday 23 April | Owner | Delivers |
|---|---|---|---|
| 12:00 | Crew in; wifi, power, AV and backup line tested | Head of Engineering | Uptime |
| 14:00 | Doors open after Jumu'ah; check-in to 120, then waitlist | Events | On-site count |
| 15:00 | Opening: welcome, code of conduct, rules, tracks; headline talk (10 min) | Founder; Headline | Headline benefit |
| 15:45 | Team formation; sponsor tables open | Events; Partnerships | Teams formed |
| 16:30 | Hacking starts; workshops from 17:00 | Events; sponsors | Adoption |
| Asr and Maghrib | Prayer breaks at local times; prayer room signed | Events | Respect, attendance |
| 19:30 | Dinner | Events | |
| 22:00 | Venue closes; builders leave (no overnight) | Events; host security | Safety |

| Time | Day 2, Saturday 24 April | Owner | Delivers |
|---|---|---|---|
| 09:00 | Doors; breakfast; mentor office hours | Events | |
| 12:30 | Lunch; submission form reminder | Head of Engineering | Submission rate |
| 15:00 | Submissions close (form timestamp) | Head of Engineering | Submissions |
| 15:15 | Round 1 judging, table style: 4 panels, 7 to 8 teams each | Events; judges | Fair judging |
| 17:00 | Finalists announced (6); track winners confirmed by track judges | Events | |
| 17:30 | Finals on stage, 4 min each plus 2 min questions | Founder (host) | Visibility |
| 18:45 | Awards; group photo with consent markers | Founder; Editorial | Media |
| 19:30 | Close; consent-based survey link; sponsor debrief | Editorial; Partnerships | NPS, report data |`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Risk register: does the contingency cover it?",
          given: md`**Illustrative register, USD.** Contingency in the budget: 2,260.

| Risk | p | Cost if it happens |
|---|---|---|
| A Partner withdraws or pays late after the gate | 0.20 | 3,200 (lost revenue net of saved fulfilment) |
| Catering headcount wrong (walk-ins, mentors, extra crew) | 0.40 | 600 |
| Venue wifi or power fails; emergency rental | 0.15 | 2,000 |
| Host or permit conditions add security or a medic | 0.25 | 1,600 |
| Show-up below 55 %, wasted catering | 0.30 | 800 |
| A key lead is unavailable in event week; paid freelance coordinator | 0.25 | 1,200 |`,
          steps: [
            {
              md: md`EMVs: $0.20 \times 3{,}200 = 640$; $0.40 \times 600 = 240$; $0.15 \times 2{,}000 = 300$; $0.25 \times 1{,}600 = 400$; $0.30 \times 800 = 240$; $0.25 \times 1{,}200 = 300$.`,
            },
            {
              md: md`Total expected cost $= 640 + 240 + 300 + 400 + 240 + 300 = 2{,}120$ USD.`,
              hidden: true,
              check: { prompt: "Sum of expected monetary values", answer: 2120, unit: "USD", tolerance: { abs: 5 } },
            },
            {
              md: md`Contingency 2,260 covers the expected cost with a margin of $2{,}260 - 2{,}120 = 140$ USD, but not the worst single risk plus another: a Partner withdrawal (3,200) alone exceeds it. The response to that risk is in the contract (non-refundable after the gate) and the pipeline (more than nine sponsors in play), not in the contingency.`,
              hidden: true,
              check: { prompt: "Contingency margin over expected cost", answer: 140, unit: "USD", tolerance: { abs: 5 } },
            },
          ],
          result: md`Bottom-up expected cost (USD 2,120) is just below the top-down contingency (USD 2,260), so 10 % is adequate for the expected case. Large single risks are handled by contract terms, pipeline coverage and the shrink plan.`,
        },
        {
          kind: "md",
          md: md`### Non-financial risks with owners

| Risk | Response | Owner |
|---|---|---|
| Harassment or misconduct | Published code of conduct (MLH or Hack Code of Conduct based), two trained responders of different genders, a reporting channel, removal power | Founder; Events |
| Medical or heat incident | First aid from host or contractor, water, an incident log; indoor venue, April | Events; host |
| Personal data misuse | Opt-in consent at registration; profiles shared only with signed sponsors for the stated purpose; deletion date | Partnerships; Head of Engineering |
| Judging dispute or conflict | Published criteria; conflicts declared; independent majority; scores kept | Events |
| IP dispute between team members or with a sponsor | Rules: builders keep IP; teams agree ownership among themselves; pre-existing code allowed if declared | Head of Engineering |
| Minors attending | 18-plus rule in the application and at check-in | Events |`,
        },
      ],
    },
    {
      layer: "field",
      title: "Permits for Riyadh and the event-day reality",
      blocks: [
        {
          kind: "md",
          md: md`### What the research says about Saudi event permits

- Public or ticketed events need a permit from the **General Entertainment Authority (GEA)** through its e-portal, one permit per event.
- Conferences and exhibitions fall under the **Saudi Conventions and Exhibitions General Authority (SCEGA)**.
- Foreign organisers typically need a **MISA** investment licence and a commercial registration before they can organise in their own name.
- No hackathon-specific rule was found, and whether a free, invite-only hackathon needs a permit at all is **unverified**.

### The plan that follows from that

1. **Hold the event at a licensed local host** (a university, an innovation hub or a venue operator) that runs events regularly. Suhail is the programme and community partner.
2. **Ask in writing at T-12 weeks**: does this event need a GEA or SCEGA permit or any other approval, who applies, what conditions (security, medic, occupancy) apply, and by when? Get the answer in writing by T-8 weeks.
3. **If a permit is needed**, the host or a licensed local event company applies as organiser; Suhail does not apply in its own name until it has the licences to do so.
4. **Budget the conditions**: extra security or a medic is a line in the risk register (USD 1,600 at 0.25 in the worked plan).
5. **Contracts**: if Suhail has no entity able to sign and invoice in Saudi Arabia, the sponsor contracts and host agreement must say which entity signs and receives money (Structures module, sh07).

For Dubai, Kuwait City or Cairo, the research does not cover permits; the same five steps apply with the local authority, and the answer must come from the host or a local adviser in writing.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Permit facts are from secondary sources",
          md: md`The GEA, SCEGA and MISA points come from a law-firm briefing and an event-platform blog recorded in docs/research (November 2026); the GEA website was not reachable. Whether a free, approval-gated hackathon at a university needs any permit is unknown. Confirm with GEA or SCEGA directly or through the host's legal team before you publish the date.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "The event-day control loop",
          md: md`One person (Events lead) runs the floor with a radio or group chat; one person (you) handles sponsors, judges and the stage; the Head of Engineering owns connectivity and the submission form. Every hour: headcount, wifi status, incident log, food, timing. Decide in advance who can change the schedule (Events lead) and who can spend contingency (Finance Lead).`,
        },
        { kind: "sources", refs: ["sh10-r9", "sh10-r8", "sh10-r10", "sh10-r13", "sh10-r14", "sh10-r12"] },
        { kind: "xref", to: "sh02-l04", note: "Hackathon operations: venue, power and network, food, safety, volunteers and run-of-show in depth." },
        { kind: "xref", to: "sh02-l06", note: "Running hackathons in the Gulf, Egypt and the Levant: permits, timing, language and partners." },
        { kind: "xref", to: "sh02-l02", note: "Themes, sponsor tracks, prizes and judging rubrics: the rules behind the judging setup." },
        { kind: "xref", to: "sh01-l04", note: "Trust and curation: codes of conduct and moderation for the safeguarding plan." },
        { kind: "xref", to: "sh08-l02", note: "Lead charters and decision rights: the ownership model behind the RACI." },
        { kind: "xref", to: "sh08-l03", note: "Capacity planning for volunteers: pledged hours, load, burnout maths and the bus test." },
        { kind: "xref", to: "fc09-l03", note: "Company cadence in Founder Core: weekly metrics and written culture, applied here to a 12-week volunteer plan." },
        { kind: "xref", to: "fc09-l05", note: "Founder time across several ventures: the 96 founder hours in this plan compete with Afterwave and Mizan." },
        { kind: "scenario", scenario: "sh10-s2" },
        {
          kind: "question",
          question: {
            id: "sh10-l04-p1",
            type: "short",
            prompt: md`**Capstone artifacts 4 and 5: execution and risk.** For your event, produce: (1) a T-minus plan from T-12 weeks to T+2 weeks with the cash gate and permit dates; (2) the event-day run-of-show with an owner on each line and the sponsor benefit or metric it delivers; (3) the team plan: workstreams with one Accountable lead each, hours needed, reliable capacity with a stated reliability factor, how you close the gap, backups and event-day volunteers; (4) a risk register of at least six risks with p, cost, EMV, owner and response, its EMV total compared with your contingency, plus the non-financial risks; (5) the permit plan for your city, separating what is known from what is unverified and naming who confirms it.`,
            rubric: [
              "T-minus plan has dated milestones including the cash gate, permit confirmation, acceptances, reconfirmation and sponsor reports, consistent with the budget and pipeline lessons.",
              "Run-of-show covers both days with owners, local constraints (for example prayer times, venue hours) and links lines to sponsor benefits and metrics.",
              "Team plan computes reliable capacity with a reliability factor, compares it with workstream hours, closes the gap with explicit choices and names a backup per workstream; security and first aid are not volunteers.",
              "Risk register has p, cost, EMV and owner per risk; EMV total is computed and compared with contingency; large single risks have structural responses; non-financial risks (conduct, safety, data, judging, IP, minors) are covered.",
              "Permit plan states the known regulatory facts with dates and sources, flags what is unverified, puts the application with a licensed local party and sets a written confirmation deadline.",
              "Numbers are illustrative and consistent with artifacts 1 to 3; nothing implies Suhail has run events before.",
            ],
            modelAnswer: md`**(1) T-minus (Riyadh 01, Fri 23 April 2027):** T-12 (29 Jan) host signed, permit question sent, prospectus and applications live; T-10 (12 Feb) pipeline review, judges invited; T-8 (26 Feb) permit position in writing, rules and code of conduct published; T-6 (12 Mar) cash gate; T-4 (26 Mar) 185 acceptances, balances due; T-1 (16 Apr) reconfirmations, volunteer briefing, dry run; T+2 (7 May) sponsor reports and post-event report.

**(2) Run-of-show:** Day 1 doors 14:00 after Jumu'ah, opening with code of conduct and headline talk 15:00, teams 15:45, hacking 16:30, workshops from 17:00, prayer breaks, venue closes 22:00. Day 2 doors 09:00, submissions close 15:00, table judging 15:15 (4 panels), finals 17:30, awards 18:45, survey and sponsor debrief 19:30. Owners: Events (floor), Head of Engineering (wifi, forms), founder (stage, sponsors), Partnerships (sponsor tables), Editorial (photo consent, survey).

**(3) Team:** needs 360 h (Partnerships 90, Events 120, Editorial 60, Engineering 50, Finance 40). Five leads x 6 h x 12 weeks x 0.75 = 270 h; founder 96 h. Founder 40 h on sponsors and 50 h on host, permits and judges; Finance takes vendor payments (14 h) from Events; Engineering automates application emails; no printed programme. Backups named for each workstream from T-6. 13 event-day volunteers (8 floor, 3 check-in, 2 runners). Security and first aid from the host or a contractor.

**(4) Register:** Partner withdrawal 0.20 x 3,200 = 640 (non-refundable after gate, extra pipeline); catering headcount 0.40 x 600 = 240; wifi failure 0.15 x 2,000 = 300 (backup line tested at 12:00); permit conditions 0.25 x 1,600 = 400; low show-up 0.30 x 800 = 240 (reconfirmation, waitlist); lead unavailable 0.25 x 1,200 = 300 (backups). EMV 2,120 vs contingency 2,260. Non-financial: code of conduct with two responders, first aid, opt-in data, published judging criteria and conflicts, IP rules, 18-plus.

**(5) Permits:** known (secondary, November 2026): GEA permits for public or ticketed events, SCEGA for conferences and exhibitions, MISA and CR for foreign organisers. Unverified: whether a free approval-gated hackathon needs a permit. Plan: licensed university host confirms in writing by 26 February which permit applies and applies itself if needed; conditions budgeted; Suhail signs as programme partner through its chosen entity.`,
            explanation: md`Execution artifacts are credible when every line has an owner, the hours add up, the risks are priced against the contingency and the regulatory position is honest about what is not yet known.`,
            concepts: ["sh10.run-of-show", "sh10.volunteer-capacity", "sh10.raci", "sh10.risk-register", "sh10.permits", "sh10.code-of-conduct"],
            difficulty: 3,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh10-l04-q1",
      type: "numeric",
      prompt: md`Four leads commit 5 h/week each for 10 weeks with a reliability factor of 0.7. How many reliable hours does the team have?`,
      answer: 140,
      unit: "h",
      tolerance: { abs: 0.5 },
      explanation: md`$H = 0.7 \times 10 \times (4 \times 5) = 140$ h. Committed hours (200) overstate what unpaid leads with day jobs deliver.`,
      concepts: ["sh10.volunteer-capacity"],
      difficulty: 1,
    },
    {
      id: "sh10-l04-q2",
      type: "numeric",
      prompt: md`Three risks: p = 0.1 with cost USD 5,000; p = 0.3 with cost USD 1,000; p = 0.5 with cost USD 400. What is the total expected monetary value in USD?`,
      answer: 1000,
      unit: "USD",
      tolerance: { abs: 1 },
      explanation: md`$500 + 300 + 200 = 1{,}000$ USD. Compare it with the contingency; the USD 5,000 risk needs a structural response as well.`,
      concepts: ["sh10.risk-register"],
      difficulty: 1,
    },
    {
      id: "sh10-l04-q3",
      type: "mcq",
      prompt: md`Who should apply for any event permit for Riyadh 01, given what the research says?`,
      options: [
        "Suhail in its own name, because it designs the programme",
        "The licensed local host or a licensed local event company, after confirming in writing which permit applies",
        "Nobody: hackathons are exempt",
        "Each sponsor separately",
      ],
      answer: 1,
      explanation: md`Foreign organisers typically need a MISA licence and a commercial registration first; the hackathon position is unverified. A licensed local party with event experience is the safe applicant, with the position confirmed in writing.`,
      concepts: ["sh10.permits"],
      difficulty: 1,
    },
    {
      id: "sh10-l04-q4",
      type: "multi",
      prompt: md`Which belong in the run-of-show for Riyadh 01? Select all that apply.`,
      options: [
        "Doors on Friday after Jumu'ah prayer",
        "Prayer breaks at local Asr and Maghrib times",
        "Hacking through the night in the host's hall",
        "Submission close time enforced by the form timestamp",
        "Code of conduct read at the opening",
      ],
      answer: [0, 1, 3, 4],
      explanation: md`The plan is daytime only (the venue closes at 22:00), which removes overnight supervision and security costs.`,
      concepts: ["sh10.run-of-show", "sh10.code-of-conduct"],
      difficulty: 1,
    },
    {
      id: "sh10-l04-q5",
      type: "decision",
      prompt: md`At T-3 weeks the Events lead's employer sends her abroad for event week. What do you do?`,
      options: [
        { text: "Run Events yourself on the day alongside the stage", score: 0.3, feedback: "You cannot run the floor and the stage at once; both suffer." },
        { text: "Activate the named backup, who has been Consulted since T-6; move vendor contacts to the backup this week; fund the freelance coordinator line from contingency if the backup lacks hours", score: 1, feedback: "This is why backups and the risk line exist. It is one of the register's planned responses." },
        { text: "Ask her to manage remotely during the event", score: 0.4, feedback: "Remote floor management fails in an incident." },
        { text: "Postpone the event", score: 0.1, feedback: "Disproportionate when a backup and a budget line exist." },
      ],
      explanation: md`Volunteer teams lose people at the worst moment. A named backup with context and a priced response turn a crisis into a handover.`,
      concepts: ["sh10.raci", "sh10.risk-register"],
      difficulty: 2,
    },
    {
      id: "sh10-l04-q6",
      type: "mcq",
      prompt: md`Which judging setup makes sponsor prizes most credible?`,
      options: [
        "The headline sponsor's engineers judge all prizes",
        "Published criteria, conflicts declared, a final panel with an independent majority, and track prizes judged by the track sponsor against the same criteria",
        "Audience vote only",
        "Organisers decide privately",
      ],
      answer: 1,
      explanation: md`Builders and other sponsors accept results when criteria are public, conflicts are declared and no single sponsor controls the outcome.`,
      concepts: ["sh10.code-of-conduct"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh10-l04-f1", front: "Reliable volunteer hours", back: md`$H = \rho\, W \sum_i h_i$ with $\rho \approx 0.7$ to $0.8$; worked plan: $0.75 \times 12 \times 30 = 270$ h against 360 needed.`, concepts: ["sh10.volunteer-capacity"] },
    { id: "sh10-l04-f2", front: "Expected monetary value", back: md`$\text{EMV} = \sum_i p_i I_i$; the register total is the bottom-up check on contingency (USD 2,120 vs 2,260 in the plan).`, concepts: ["sh10.risk-register"] },
    { id: "sh10-l04-f3", front: "Saudi permit facts (secondary, Nov 2026)", back: "GEA permit for public or ticketed events; SCEGA for conferences and exhibitions; MISA licence and CR for foreign organisers; hackathon treatment unverified.", concepts: ["sh10.permits"] },
    { id: "sh10-l04-f4", front: "RACI rule for an unpaid team", back: "One Accountable lead per workstream, a named backup Consulted from T-6 weeks; security and first aid never volunteers.", concepts: ["sh10.raci"] },
    { id: "sh10-l04-f5", front: "Riyadh 01 day shape", back: "Fri doors 14:00 after Jumu'ah, hack to 22:00; Sat 09:00, submissions 15:00, table judging, finals 17:30, awards 18:45; prayer breaks both days.", concepts: ["sh10.run-of-show"] },
    { id: "sh10-l04-f6", front: "Safeguarding minimum", back: "Published code of conduct, two responders, reporting channel, 18-plus, photo consent, opt-in data, published judging criteria.", concepts: ["sh10.code-of-conduct"] },
  ],
  scenarios: [
    {
      id: "sh10-s2",
      title: "Saturday, 10:40: the wifi goes down",
      dayInLife: true,
      context: md`Day 2 of Riyadh 01. 112 builders on site. At 10:40 the host's wifi drops; the host's IT contact says "maybe an hour". Submissions close at 15:00. The headline sponsor's track depends on its cloud API.`,
      start: "a",
      concepts: ["sh10.run-of-show", "sh10.risk-register", "sh10.raci"],
      nodes: {
        a: {
          md: md`What is your first move?`,
          choices: [
            {
              text: "Head of Engineering switches to the backup line tested at 12:00 on day 1 and the pre-agreed mobile hotspots; Events announces the status, the expected time and that the deadline is under review; you inform the headline sponsor; Finance Lead is told contingency may be needed",
              next: "b",
              score: 10,
              feedback: "The register's planned response, executed by the named owners, with communication to builders and the sponsor at once.",
            },
            {
              text: "Wait for the host's IT to fix it",
              next: "b",
              score: 2,
              feedback: "An hour of lost hacking on day 2 is a large share of the event; the backup exists for this.",
            },
            {
              text: "Immediately extend the deadline by two hours",
              next: "b",
              score: 5,
              feedback: "Possibly right later, but deciding before you know the outage length breaks the judging schedule and the host's closing time.",
            },
          ],
        },
        b: {
          md: md`Connectivity is back at 11:25 on the backup line. Builders lost about 45 minutes. A judge tells you privately that one finalist candidate team includes her former colleague.`,
          choices: [
            {
              text: "Move the submission deadline to 15:30 within the judging buffer and announce it; log the outage and the cost; record the judge's conflict and reassign that team to another panel",
              score: 10,
              feedback: "Fair to builders, inside the schedule's buffer, and the conflict is handled by the published rule. Both go into the post-event report.",
            },
            {
              text: "Keep 15:00 because the rules say so; let the judge stay on the panel since she disclosed it",
              score: 3,
              feedback: "Rigid on time and too loose on the conflict: disclosure is the first step, reassignment the second.",
            },
            {
              text: "Extend to 17:00 and cancel round 1 judging",
              score: 2,
              feedback: "Breaks the run-of-show and the venue's closing time, and judges see each team for less time.",
            },
          ],
        },
      },
    },
  ],
};

export default lesson;
