import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh08-l02",
  title: "Roles and ownership: lead charters, decision rights and an async-first cadence across time zones",
  summary:
    "A volunteer team with no structure does not become flat: it develops an informal hierarchy around whoever has the most time and the most context, usually the founder. This lesson gives each Suhail lead a written charter, makes decision rights explicit with RACI and DACI, sets thresholds for what a lead may decide alone, and designs an operating cadence that works when the team is spread across time zones and different weekends and can only meet in the evenings.",
  minutes: 75,
  objectives: [
    "Write a lead charter: mission, owned outcomes, decision rights, budget, interfaces and term",
    "Assign decision roles with RACI or DACI so every recurring decision has exactly one owner",
    "Set thresholds for decisions a lead takes alone, by lazy consensus, or with founder approval",
    "Compute the live overlap window across time zones and design an async-first weekly cadence",
    "Explain the tyranny of structurelessness and why volunteer teams need more written structure, not less",
  ],
  concepts: [
    { id: "sh08.lead-charter", name: "Lead charter", description: "A one-page written mandate for a volunteer lead: mission, owned outcomes with measures, decision rights and limits, budget line, interfaces with other leads, hours and term.", competency: "sh-org", related: ["sh08.decision-rights", "fc09.scorecard"] },
    { id: "sh08.decision-rights", name: "Decision rights (RACI, DACI)", description: "An explicit assignment of roles per decision: RACI names who is Responsible, Accountable, Consulted and Informed; DACI names the Driver, the single Approver, Contributors and the Informed.", competency: "sh-org", related: ["sh08.single-owner", "fc09.reversibility"] },
    { id: "sh08.single-owner", name: "Single owner (DRI)", description: "Exactly one directly responsible individual per outcome or decision. Shared ownership in a volunteer team usually means nobody acts when everyone is busy.", competency: "sh-org", related: ["sh08.decision-rights"] },
    { id: "sh08.lazy-consensus", name: "Lazy consensus", description: "A proposal posted in writing is approved unless someone objects within a stated window (for example 48 or 72 hours); silence is consent. Used by the Apache Software Foundation for reversible decisions.", competency: "sh-org", related: ["sh08.decision-rights", "sh08.async-first"] },
    { id: "sh08.async-first", name: "Async-first cadence", description: "Work is coordinated through written updates, proposals and decision logs by default, and live meetings are reserved for what needs real-time interaction; necessary when the live overlap window is short.", competency: "sh-org", related: ["fc09.written-culture", "fc09.operating-cadence"] },
    { id: "sh08.structurelessness", name: "Tyranny of structurelessness", description: "Jo Freeman's observation that groups without formal structure develop informal elites whose power is unaccountable because it is unwritten.", competency: "sh-org", related: ["sh08.lead-charter"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Structure is what lets volunteers act without you",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You run Afterwave full time and Mizan alongside it. If Suhail's leads must ask you before booking a venue, sending a sponsor proposal or merging a change to suhail.build, Suhail moves at the speed of your inbox. Written charters and decision rights are how you give the five leads real authority, which is also the autonomy that keeps unpaid people motivated (Lesson 1).`,
        },
        {
          kind: "md",
          md: md`### Structureless groups are not flat

Jo Freeman's essay "The Tyranny of Structurelessness" (written about the women's movement in the early 1970s) is the best short text on volunteer organisations. Her argument: there is no such thing as a structureless group. When nobody writes down who decides what, decisions still get made, by an informal elite of friends, early members or whoever has most time. Because that power is unwritten, it is unaccountable and newcomers cannot see how to earn it. In a founder-led volunteer team, the informal elite is usually the founder, which turns every lead into an assistant.

Freeman's remedies read like a modern operating manual: delegate specific authority to specific people for specific tasks; make people responsible to those who delegated it; distribute authority widely; rotate tasks; allocate tasks on ability and interest; share information widely; give everyone access to resources.

### Coordination grows faster than the team

Every pair of people who must coordinate is a communication channel. Brooks (*The Mythical Man-Month*) used this to explain why adding people to a late project makes it later:`,
        },
        { kind: "equation", formula: "sh08-coordination-links" },
        {
          kind: "md",
          md: md`Six people (five leads and you) have 15 possible channels; ten have 45. Charters cut the channels that must be active: each lead has a short list of named interfaces, and everything else goes through the shared written record rather than one-to-one messages. The hub-and-spoke alternative (everything through the founder) has only $n - 1$ links but makes you the bottleneck.

### The lead charter

A charter is the volunteer version of fc09's role scorecard, with decision rights added because volunteers cannot be managed by hierarchy:

| Field | What it says |
|---|---|
| **Mission** | One sentence: why this workstream exists |
| **Owned outcomes** | 2 or 3 measurable results for the term (the KRs this lead owns) |
| **Decides alone** | Decisions inside the role up to a limit (money, reach, reversibility) |
| **Proposes, others approve** | Decisions above the limit and who approves them |
| **Budget line** | Amount for the quarter and the approval rule for spending it |
| **Interfaces** | Which other leads they depend on, and for what |
| **Hours and term** | Hours per week, 6-month term, review date |
| **Backup** | Who can cover for 2 weeks (Lesson 3) |

### Decision rights: RACI and DACI

**RACI** assigns four roles per activity or decision: **R**esponsible (does the work), **A**ccountable (owns the outcome, exactly one person), **C**onsulted (two-way input before) and **I**nformed (told after). It is good for recurring activities.

**DACI** (popularised by Intuit and in Atlassian's team playbook) is built for decisions: the **D**river runs the process and writes the proposal; the **A**pprover makes the call, and there is **exactly one**; **C**ontributors give input; the **I**nformed are told. Bain's RAPID (Rogers and Blenko, "Who Has the D?", HBR 2006) adds a separate role for whoever must perform the decision and one for agreement (veto) rights. For a six-person team, DACI is enough.

The single most useful rule from all three: **one Accountable or Approver per decision.** "The leads decide together" means nobody decides when everyone is busy.

### Thresholds instead of permission

Combine decision rights with fc09's reversibility test. A lead should not need permission for a reversible, low-impact decision; you should not be surprised by an irreversible, high-impact one.`,
        },
        {
          kind: "matrix",
          title: "Who decides, by impact and reversibility",
          xAxis: ["Low impact", "High impact"],
          yAxis: ["Hard to reverse", "Easy to reverse"],
          cells: [
            { label: "Lead decides alone", detail: "Newsletter topic, event run sheet, site copy change. Logged, nobody asked." },
            { label: "Lazy consensus (48 to 72 h)", detail: "Hackathon theme, new recurring section, tooling change. Written proposal; approved unless someone objects." },
            { label: "Lead decides after one consult", detail: "Booking a small venue with a deposit, publishing a guest's interview. One named person consulted first." },
            { label: "DACI with a single Approver", detail: "Sponsor contract, conference date, spending above the budget line, anything legal or reputational. Written proposal, founder or Finance Lead approves." },
          ],
          caption: "Top row: easy to reverse. Bottom row: hard to reverse. Write the money and reach limits into each charter so the boxes are not argued case by case.",
        },
        {
          kind: "md",
          md: md`**Lazy consensus**, used by the Apache Software Foundation, is the volunteer team's best tool for the top-right box: the driver posts a proposal with a deadline ("Approved unless anyone objects by Thursday 18:00 UTC"); silence is consent; an objection must come with a reason and moves the decision into DACI. It keeps work moving when people read messages days apart.

### Async-first, because the overlap is small

Volunteers work around day jobs, so their live hours are mostly evenings, and Suhail's team may be spread across several Arab countries and Europe. The live window is the intersection of everyone's availability, computed in UTC:`,
        },
        { kind: "equation", formula: "sh08-overlap-window" },
        {
          kind: "md",
          md: md`Two calendar facts compound this:

- **Weekends differ.** Kuwait, Saudi Arabia and Egypt take Friday and Saturday; the UAE moved to Saturday and Sunday (with a short Friday for government) in January 2022; the Netherlands takes Saturday and Sunday. The only day off shared by all of them is **Saturday**.
- **Ramadan** shifts working hours shorter and social life later into the evening across the region; plan lighter loads and later live slots for that month, and avoid scheduling launches against Eid.

When the overlap is an hour or less, the default must be written: weekly updates, proposals with lazy-consensus deadlines, a decision log, and one short live meeting a week in the overlap slot.`,
        },
        {
          kind: "flow",
          title: "An async-first week for Suhail's leads (illustrative)",
          steps: [
            { label: "Sunday to Monday: written updates", detail: "Each lead posts a 5-line update by Monday 12:00 UTC: outcome metric, done, next, blocked, decisions needed." },
            { label: "Monday to Tuesday: proposals and comments", detail: "Proposals posted with a lazy-consensus deadline; comments in the document, not in chat." },
            { label: "Wednesday: 30-minute live review", detail: "In the overlap slot. Only red items and decisions that drew objections. Decisions written into the log during the call." },
            { label: "Thursday: deadlines close", detail: "Lazy-consensus deadlines fall here, before the Gulf weekend starts on Friday." },
            { label: "Saturday: shared day off", detail: "No deadlines, no expectation of replies. Event days are planned exceptions." },
          ],
          caption: "Deadlines land on Thursday so they do not fall on anyone's weekend, and the one live meeting sits in the overlap window.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Finding the live window",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Winter overlap for four evening schedules",
          given: md`Illustrative: suppose Suhail's leads live in Amsterdam (UTC+1 in winter), Kuwait City (UTC+3), Dubai (UTC+4) and Cairo (UTC+2 in winter), and each is available 19:00 to 22:00 local on weekday evenings. This is a planning assumption, not where any lead actually lives.`,
          steps: [
            { md: md`**Convert to UTC.** Amsterdam 19 to 22 local is 18 to 21 UTC. Kuwait 19 to 22 is 16 to 19 UTC. Dubai 19 to 22 is 15 to 18 UTC. Cairo 19 to 22 is 17 to 20 UTC.` },
            { md: md`**Latest start:** $\max_i s_i = 18$ UTC (Amsterdam). **Earliest end:** $\min_i e_i = 18$ UTC (Dubai).` },
            { md: md`**Overlap:** $O = \max(0,\ 18 - 18) = 0$ hours. There is no evening hour in which all four can meet.` },
            { md: md`**Negotiate one hour.** If the Dubai lead agrees to stay until 23:00 local (19 UTC) on one evening, $\min_i e_i = \min(21, 19, 19, 20) = 19$ UTC and $O = 19 - 18 = 1$ hour: 18:00 to 19:00 UTC, which is 19:00 Amsterdam, 21:00 Kuwait, 22:00 Dubai and 20:00 Cairo.` },
          ],
          result: md`With evening-only availability the natural overlap is zero (illustrative). One negotiated late evening buys a single weekly hour. Everything else must be asynchronous, which is why the cadence above has one 30-minute live slot.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Summer overlap and the coordination load",
          given: md`Same four leads in summer. Amsterdam moves to UTC+2. Egypt observes summer time (UTC+3) under its current rules (check the year's dates). Kuwait (UTC+3) and Dubai (UTC+4) do not change. The Dubai lead keeps the 23:00 evening. Then the team grows from 6 to 10 people.`,
          steps: [
            { md: md`**UTC windows:** Amsterdam 19 to 22 local is 17 to 20 UTC; Kuwait 16 to 19; Dubai 15 to 19; Cairo (UTC+3) 16 to 19.` },
            { md: md`**Overlap:** latest start 17, earliest end 19, so $O = 19 - 17$.` },
            { md: md`$O = 2$ hours (17:00 to 19:00 UTC).`, hidden: true, check: { prompt: "Summer overlap (hours)", answer: 2, unit: "h", tolerance: { abs: 0.01 } } },
            { md: md`**Channels at 6 people:** $6 \times 5/2 = 15$. **At 10 people:** $10 \times 9/2$.` },
            { md: md`45 channels, three times as many for less than twice the people.`, hidden: true, check: { prompt: "Channels at 10 people", answer: 45, tolerance: { abs: 0.01 } } },
          ],
          result: md`Summer time opens a 2-hour window (illustrative), but growing to 10 people triples the possible channels. Charters with named interfaces and a single written record keep the active channels close to the number of real dependencies.`,
        },
        {
          kind: "question",
          question: {
            id: "sh08-l02-p1",
            type: "numeric",
            prompt: md`Three leads are available 18:00 to 21:00 UTC, 17:30 to 20:00 UTC and 19:00 to 23:00 UTC. How many hours of live overlap do they share?`,
            answer: 1,
            tolerance: { abs: 0.01 },
            unit: "h",
            explanation: md`Latest start $= 19{:}00$, earliest end $= 20{:}00$, so $O = 1$ hour.`,
            concepts: ["sh08.async-first"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Charters and decision tables in practice",
      blocks: [
        {
          kind: "md",
          md: md`### A starting DACI table for Suhail (illustrative thresholds)

| Decision | Driver | Approver | Contributors | Informed |
|---|---|---|---|---|
| Sponsor deal up to USD 10k on the standard tiers | Partnerships | Partnerships | Finance, Events | All leads |
| Sponsor deal above USD 10k or non-standard terms | Partnerships | Founder | Finance, Events | All leads |
| Hackathon date, venue and theme | Events and Programming | Events and Programming (lazy consensus 72 h) | Partnerships, Engineering | All leads |
| Spend above a lead's quarterly budget line | The lead | Finance Lead | Founder | All leads |
| Newsletter issue content | Editorial | Editorial | Any lead | Founder |
| Change to data collection on suhail.build (new personal data, new processor) | Head of Engineering | Founder | Finance, Editorial | All leads |
| New lead appointed or a lead stepping down | Founder | Founder | All leads | Community |

Two notes. First, the founder approves few things, and they are the irreversible or reputational ones. Second, anything touching personal data, contracts or bank accounts has an Approver who is not the Driver.

### Where volunteer structure goes wrong`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Common failures",
          md: md`- **Two Approvers.** "Partnerships and Events approve sponsor packages together" means the package waits until both are free.
- **Charters nobody reads.** A charter that is not used in the quarterly check-in is a dead document. Review owned outcomes against it every quarter.
- **The founder as shadow Approver.** You re-open decisions a lead made within their charter. After the second time, leads stop deciding.
- **Decisions in direct messages.** A DM decision has two witnesses and no record. If it was decided, it goes in the log.
- **Meetings at a time that suits the founder.** The live slot belongs in the overlap window, even if it is late for you.
- **Deadlines on Friday.** Half the team is on its weekend.`,
        },
        {
          kind: "ask",
          title: "Questions to settle with each lead before January 2027",
          items: [
            "What can you decide without asking anyone, and up to what amount?",
            "Which decisions in your area are hard to reverse, and who approves them?",
            "Which other leads do you depend on, and for what, each week?",
            "Which evening hours can you reliably be live, in your local time?",
            "Who covers for you if you are away for two weeks?",
          ],
        },
        { kind: "sources", refs: ["sh08-r8", "sh08-r9", "sh08-r10", "sh08-r11", "sh08-r12", "sh08-r13"] },
        { kind: "xref", to: "fc09-l03", note: "Founder Core's cadence lesson covers OKRs, weekly metrics and written culture in general; this lesson adapts them to unpaid leads, evening hours and Gulf and European weekends." },
        { kind: "xref", to: "fc09-l06", note: "The reversible and irreversible (two-way and one-way door) distinction used for the decision thresholds is taught in Founder Core." },
        {
          kind: "question",
          question: {
            id: "sh08-l02-p2",
            type: "short",
            prompt: md`Write the **charter for Suhail's Events and Programming lead** for January to June 2027, and a **DACI table for six recurring decisions** that involve this lead. The charter must include mission, 2 or 3 owned outcomes with measures, what the lead decides alone (with limits), what needs approval and by whom, budget line rule, interfaces with the other four leads, hours and term, and a named backup role. Use illustrative numbers and no personal names.`,
            rubric: [
              "Mission is one sentence and owned outcomes are measurable with a date, not a task list",
              "Decision rights are explicit, with money, reach or reversibility limits, and only one Approver per decision",
              "Interfaces with Partnerships, Editorial, Head of Engineering and Finance Lead are specific (what is exchanged, when)",
              "Hours per week, term and review date are stated, and a backup role is named for absences",
              "DACI table covers six realistic recurring decisions with Driver, single Approver, Contributors and Informed",
              "Uses lazy consensus or another async mechanism for reversible decisions; no invented names or traction",
            ],
            modelAnswer: md`**Charter: Events and Programming lead, January to June 2027 (illustrative).**

**Mission.** Run a programme of events where Arab builders ship projects and meet the people who can hire or fund them.

**Owned outcomes.** (1) Two hackathons delivered by 30 June, each with a written run sheet and a post-event report within 14 days. (2) At least 60% of accepted participants submit a project at each hackathon. (3) Post-event survey: at least 70% of participants would recommend the event.

**Decides alone.** Run sheets, judging format, schedule, catering choices and supplier bookings within the approved event budget; any single commitment up to USD 2,000 that is refundable.

**Proposes, others approve.** Hackathon date, venue and theme: lazy consensus, 72 hours. Non-refundable deposits above USD 2,000 or any spend above the event budget: Finance Lead approves. Anything requiring a permit, a contract with a venue or partner, or public statements on behalf of Suhail: founder approves.

**Budget line.** The event budget agreed with Finance Lead per event; spend tracked in the shared sheet weekly.

**Interfaces.** Partnerships: sponsor commitments and fulfilment list two weeks before each event. Editorial: event announcement copy one week before registration opens; wrap-up piece after. Head of Engineering: registration form and acceptance flow on suhail.build, live three weeks before. Finance Lead: budget approval at event go decision; receipts within 7 days after.

**Hours and term.** 6 hours a week, 10 to 12 in the two weeks before each event (agreed in advance). Term January to June 2027; review at end of March and end of June.

**Backup.** A trained events contributor can run an event from the run sheet if the lead is unavailable.

**DACI (Driver / Approver / Contributors / Informed).**
1. Hackathon date and venue: Events / Events via lazy consensus 72 h / Partnerships, Engineering / all leads.
2. Theme and challenge tracks: Events / Events via lazy consensus 72 h / Partnerships, Editorial / all leads.
3. Event budget: Events / Finance Lead / Partnerships / founder.
4. Sponsor fulfilment at the event (booths, talks, judging seats): Partnerships / Partnerships / Events / all leads.
5. Participant acceptance criteria: Events / Events / Engineering / all leads.
6. Code of conduct incident response at an event: Events / founder / one other lead / as needed, confidentially.`,
            explanation: md`A strong charter could be handed to a new lead and used on day one without asking the founder anything. Look for one Approver per decision and limits written as numbers.`,
            concepts: ["sh08.lead-charter", "sh08.decision-rights", "sh08.single-owner", "sh08.lazy-consensus"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a new Suhail lead why the team writes down who decides what, even though everyone is a volunteer and the team is small.",
          keyPoints: [
            "Groups without written structure still have power, held informally by whoever has most time or context",
            "Written decision rights let a lead act without waiting for the founder, which is also what keeps the role motivating",
            "Exactly one Approver per decision prevents work stalling when people are busy",
            "Lazy consensus and a decision log let a team spread across time zones decide asynchronously",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh08-l02-q1",
      type: "mcq",
      prompt: "In DACI, how many Approvers should a decision have?",
      options: ["One", "Two, for balance", "All contributors", "None; the Driver decides"],
      answer: 0,
      explanation: md`Exactly one. A decision with two Approvers waits for both to be available and lets each assume the other is checking.`,
      concepts: ["sh08.decision-rights", "sh08.single-owner"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh08-l02-q2",
      type: "numeric",
      prompt: md`How many pairwise communication channels does a team of 8 people have?`,
      answer: 28,
      tolerance: { abs: 0.01 },
      explanation: md`$n(n - 1)/2 = 8 \times 7/2 = 28$.`,
      concepts: ["sh08.lead-charter"],
      difficulty: 1,
    },
    {
      id: "sh08-l02-q3",
      type: "mcq",
      prompt: "Which day off is shared by Kuwait, Saudi Arabia, Egypt, the UAE and the Netherlands under their standard weekends?",
      options: ["Friday", "Saturday", "Sunday", "None"],
      answer: 1,
      explanation: md`Kuwait, Saudi Arabia and Egypt rest Friday and Saturday; the UAE and the Netherlands rest Saturday and Sunday. Saturday is the only common day off, so no deadlines should fall on it.`,
      concepts: ["sh08.async-first"],
      difficulty: 1,
    },
    {
      id: "sh08-l02-q4",
      type: "decision",
      prompt: md`The Events lead booked a venue for the second hackathon within budget and charter. You prefer a different venue. What do you do?`,
      options: [
        { text: "Let the decision stand, and if you have a concern for future events, raise it as a proposal to change the charter or criteria.", score: 1, feedback: "Right. Re-opening a decision made inside a charter teaches leads that the charter is not real." },
        { text: "Quietly ask the venue you prefer for a quote and present it to the lead.", score: 0.2, feedback: "This undermines the lead and signals that you are the shadow Approver." },
        { text: "Overrule it: you are the founder.", score: 0, feedback: "You may be right about the venue and still lose the lead." },
        { text: "Ask the whole team to vote on the venue.", score: 0.3, feedback: "This turns a delegated decision into a committee and wastes the overlap hour." },
      ],
      explanation: md`Delegated authority that the founder can reverse at will is not authority. Change the rule for next time, not the decision this time, unless the decision breaks the charter.`,
      concepts: ["sh08.lead-charter", "sh08.decision-rights", "sh08.structurelessness"],
      difficulty: 2,
    },
    {
      id: "sh08-l02-q5",
      type: "multi",
      prompt: "Which decisions fit lazy consensus? (Select all that apply.)",
      options: [
        "Choosing next quarter's hackathon theme",
        "Signing a USD 25k sponsorship with exclusivity terms",
        "Adding a new recurring section to the newsletter",
        "Changing the project board columns",
        "Adding a new third-party processor of members' personal data",
      ],
      answer: [0, 2, 3],
      explanation: md`Lazy consensus suits reversible decisions where silence is a reasonable signal. Contracts with lasting terms and changes to how personal data is processed need a named Approver.`,
      concepts: ["sh08.lazy-consensus", "sh08.decision-rights"],
      difficulty: 2,
    },
    {
      id: "sh08-l02-q6",
      type: "mcq",
      prompt: "What is Jo Freeman's core claim in \"The Tyranny of Structurelessness\"?",
      options: [
        "Volunteer groups should avoid all hierarchy",
        "Groups without formal structure develop informal elites whose power is unaccountable",
        "Structure always reduces motivation",
        "Only paid organisations need written roles",
      ],
      answer: 1,
      explanation: md`Freeman argues there is no structureless group, only groups whose structure is hidden. Making authority explicit, delegated and rotated is what makes it accountable.`,
      concepts: ["sh08.structurelessness"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh08-l02-f1", front: "Fields of a lead charter", back: "Mission, owned outcomes, decides alone, proposes for approval, budget line, interfaces, hours and term, backup.", concepts: ["sh08.lead-charter"] },
    { id: "sh08-l02-f2", front: "DACI roles", back: "Driver, Approver (exactly one), Contributors, Informed.", concepts: ["sh08.decision-rights"] },
    { id: "sh08-l02-f3", front: "Lazy consensus", back: "Written proposal with a deadline; approved unless someone objects with a reason. For reversible decisions.", concepts: ["sh08.lazy-consensus"] },
    { id: "sh08-l02-f4", front: "Live overlap window", back: md`$O = \max(0, \min_i e_i - \max_i s_i)$, all times in UTC.`, concepts: ["sh08.async-first"] },
    { id: "sh08-l02-f5", front: "Communication channels in a team of n", back: md`$n(n-1)/2$: 6 people give 15, 10 give 45.`, concepts: ["sh08.lead-charter"] },
    { id: "sh08-l02-f6", front: "Where to put deadlines for a Gulf and European team", back: "Thursday, before the Friday to Saturday Gulf weekend; never Saturday, the only shared day off.", concepts: ["sh08.async-first"] },
  ],
};

export default lesson;
