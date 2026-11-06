import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh08-l06",
  title: "Tools and rituals: the handbook, the board, meetings worth having and access hygiene",
  summary:
    "A volunteer team that meets for 30 minutes a week lives in its written tools. This lesson sets up Suhail's minimum stack: a handbook as the single source of truth, a project board with work-in-progress limits (and Little's law to show why they matter), a small set of meetings designed around pre-reads, rituals that deliver recognition and learning, and an access register so that accounts, keys and personal data stay under Suhail's control as people come and go.",
  minutes: 60,
  objectives: [
    "Set up a handbook as the single source of truth and decide what lives there versus in chat",
    "Use Little's law to set work-in-progress limits on a volunteer project board",
    "Design the team's few meetings and rituals (weekly review, retro, demo, term review) with pre-reads and outputs",
    "Build an access register with least privilege, organisation-owned accounts and same-day offboarding",
    "Pick a minimal tool stack and avoid tool sprawl",
  ],
  concepts: [
    { id: "sh08.handbook", name: "Handbook as single source of truth", description: "One written place holding charters, the DACI table, policies, procedures and the decision log; if a rule is not in the handbook it is not a rule. Adapted from GitLab's handbook-first practice.", competency: "sh-org", related: ["fc09.written-culture", "sh08.lead-charter"] },
    { id: "sh08.wip-limit", name: "Work-in-progress limit", description: "A cap on items in progress per person or per column. By Little's law, average lead time equals work in progress divided by throughput, so limiting WIP shortens lead time without adding hours.", competency: "sh-org", related: ["sh08.utilisation-delay"] },
    { id: "sh08.meeting-design", name: "Meeting design for volunteers", description: "Few meetings, each with a purpose, a pre-read, a time box in the overlap window, a named decider where a decision is needed, and a written output.", competency: "sh-org", related: ["sh08.async-first", "fc09.meeting-cost"] },
    { id: "sh08.team-rituals", name: "Team rituals", description: "Recurring, lightweight practices (thank-you round, demo, retrospective, term review) that deliver recognition, learning and belonging on a schedule rather than by chance.", competency: "sh-org", related: ["sh08.recognition"] },
    { id: "sh08.access-hygiene", name: "Access hygiene", description: "Organisation-owned accounts, named logins with least privilege, two-factor authentication, a shared password manager, an access register reviewed quarterly and same-day removal when someone leaves.", competency: "sh-org", related: ["sh08.bus-factor"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "The written operating system",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Suhail's team will spend perhaps 30 minutes a week together live and 20 hours apart. Everything you designed in this module (charters, decision rights, capacity plans, policies) only works if it is written where everyone can find it, and if the accounts that run suhail.build, the newsletter and the bank belong to Suhail rather than to whoever set them up. You decide the stack in December 2026; changing it later, with people and data in it, is much harder.`,
        },
        {
          kind: "md",
          md: md`### The handbook

GitLab, a fully remote company, runs on a public handbook: the written page is the source of truth, and changing a process means changing the page first. A volunteer team needs a much smaller version, but the rule is the same: **if it is not in the handbook, it is not a rule.** Minimum contents for Suhail:

| Section | Contents |
|---|---|
| Start here | What Suhail is, the plan for the quarter, how the team works, the code of conduct |
| People and roles | Every lead charter, the commitment ladder, the DACI table |
| Policies | Expenses, paid transition (Lesson 5), data protection, brand use, conflicts of interest |
| Procedures | Run sheets for a hackathon, sending a newsletter issue, onboarding a sponsor, offboarding a volunteer |
| Decision log | Date, decision, owner, why, review date |
| Quarter | OKRs, capacity plan and cut list (Lesson 3) |

**Chat is for conversation, the handbook is for memory.** A decision made in chat is copied into the log the same day, or it did not happen.

### The board and Little's law

Volunteer teams start more than they finish: every new idea becomes a card and nobody closes old ones. Little's law (Little, 1961) holds for any stable system averaged over time:`,
        },
        { kind: "equation", formula: "sh08-littles-law" },
        {
          kind: "md",
          md: md`With throughput fixed by capacity (Lesson 3), the only way to shorten lead time is to hold less work in progress. A **WIP limit** on the "in progress" column (for example two items per lead) does that without adding a single hour. It also makes overload visible: when the column is full, the next idea waits in the backlog, in public, instead of in someone's evening.

### Meetings: few, short, written around

Lesson 2 found a live window of about an hour a week. Spend it carefully. Founder Core prices a meeting as people times hours times hourly rate times frequency; for volunteers the rate is a shadow rate, but the hours are the scarcest thing they give you.`,
        },
        { kind: "equation", formula: "fc09-meeting-cost" },
        {
          kind: "md",
          md: md`### Rituals: recognition and learning on a schedule

Recognition (Lesson 4) and learning do not happen by chance in a team that rarely meets. Put them in the calendar:

| Ritual | Frequency | Time | Output |
|---|---|---|---|
| Thank-you round | Weekly, first 3 minutes of the review | 3 min | Specific thanks, recorded in the weekly notes |
| Written weekly update | Weekly, Monday | 10 min each, async | Five lines per lead (Lesson 2) |
| Live weekly review | Weekly, overlap slot | 30 min | Decisions in the log, actions on the board |
| Demo | Monthly | 20 min | Each lead shows one thing that shipped; recorded for the community |
| Event post-mortem | Within 14 days of each event | 45 min + written pre-read | What went well, what did not, three changes to the run sheet |
| Quarterly capacity and OKR review | Quarterly | 60 to 90 min | Next quarter's plan, cut list, charter updates |
| Term review | Every 6 months per lead | 30 min one-to-one | Renew, change rung or step down; reference offered |

A retrospective asks three questions: what went well, what did not, what will we change. The output is changes to procedures in the handbook, not a list of feelings.

### Access hygiene

Every account that runs Suhail is a key-person risk (Lesson 3) and a security risk. The principles are standard:

- **Organisation-owned.** Root and billing accounts (domain registrar for suhail.build, Vercel, Supabase, Resend, newsletter platform, social media, bank) are registered to Suhail addresses, not personal ones, with at least two owners.
- **Named accounts, least privilege.** Each person has their own login with the lowest role that does the job; no shared passwords for daily work.
- **Two-factor authentication** on every account that supports it.
- **A shared password manager** for the few credentials that cannot be individual, with vaults per workstream.
- **Access register:** system, owner role, who has what role, last reviewed. Review quarterly and at every offboarding.
- **Personal data:** registration forms and newsletter lists hold personal data of builders; if Suhail processes data of people in the EU, the GDPR applies. Keep the data in the systems listed in the register, and never in personal spreadsheets.`,
        },
        {
          kind: "flow",
          title: "From idea to done on Suhail's board",
          steps: [
            { label: "Backlog", detail: "Anyone may add. Unlimited, reviewed at the quarterly planning." },
            { label: "Next (this quarter)", detail: "Only items in the quarter's plan. Each has an owner." },
            { label: "In progress (WIP limit 2 per lead)", detail: "Pulled, never pushed. Full column means finish something first." },
            { label: "Review", detail: "Another lead or the Approver checks it against the criteria." },
            { label: "Done", detail: "Shipped, logged, and mentioned in the next thank-you round." },
          ],
          caption: "Work is pulled into progress only when there is room. The limit is what keeps lead time short.",
        },
      ],
    },
    {
      layer: "applied",
      title: "What a WIP limit does to lead time",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "The editorial pipeline",
          given: md`Illustrative: the Editorial lead and two contributors have 12 pieces in progress (newsletter features, guest interviews, event write-ups). They finish 2 pieces a week on average, and that throughput is set by their hours.`,
          steps: [
            { md: md`**Current lead time:** $W = L/X = 12/2 = 6$ weeks from start to publication, on average.` },
            { md: md`**Apply a WIP limit** of 4 pieces in progress (others wait in the backlog, not started). Throughput is unchanged at 2 a week.` },
            { md: md`**New lead time:** $W = 4/2 = 2$ weeks. Pieces about an event now appear while the event is still news.` },
            { md: md`**What changed:** nobody worked more. Fewer pieces started means each one gets attention sooner, with less context switching.` },
          ],
          result: md`Cutting WIP from 12 to 4 reduces average lead time from 6 weeks to 2 (illustrative) with no extra hours. The backlog still exists, but it is visible and ordered rather than half-written.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "The engineering board",
          given: md`Illustrative: the site has 15 open issues in progress across the Head of Engineering and two contributors, who close about 3 a week.`,
          steps: [
            { md: md`**Current lead time:** $W = 15/3$.` },
            { md: md`$W = 5$ weeks.`, hidden: true, check: { prompt: "Current lead time (weeks)", answer: 5, unit: "weeks", tolerance: { abs: 0.01 } } },
            { md: md`**With a WIP limit of 2 per person** (3 people): $L = 6$, so $W = 6/3$.` },
            { md: md`$W = 2$ weeks.`, hidden: true, check: { prompt: "Lead time with WIP limit (weeks)", answer: 2, unit: "weeks", tolerance: { abs: 0.01 } } },
          ],
          result: md`From 5 weeks to 2 (illustrative). A sponsor's request for a landing page now has a believable delivery date.`,
        },
        {
          kind: "question",
          question: {
            id: "sh08-l06-p1",
            type: "numeric",
            prompt: md`The Partnerships board shows an average lead time of 4 weeks from first contact to a sent proposal, with a throughput of 2.5 proposals a week. How many prospects are in progress on average?`,
            answer: 10,
            tolerance: { abs: 0.01 },
            explanation: md`Little's law rearranged: $L = X\,W = 2.5 \times 4 = 10$ prospects in progress.`,
            concepts: ["sh08.wip-limit"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Setting up Suhail's stack and rhythm",
      blocks: [
        {
          kind: "md",
          md: md`### A minimal stack

Choose one tool per job and resist adding more. Stated tools are examples, not recommendations from a review.

| Job | Example tools | Note |
|---|---|---|
| Handbook and documents | Notion or Google Docs | One workspace; one page per charter and procedure |
| Project board | Linear, GitHub Projects or Trello | GitHub Projects keeps engineering work next to the code |
| Team chat | Slack or Discord | Builder communities often already live on Discord; keep a separate private team space |
| Events and registration | Luma, or registration on suhail.build | The research brief records {Tech: Europe} using Luma pages and Discord |
| Newsletter | A newsletter platform, or Resend from suhail.build | Decide who owns the subscriber list and where it is stored |
| Website and data | Vercel, Supabase, Resend (already chosen) | Project roles per person; at least two owners |
| Credentials | A team password manager | Vaults per workstream |
| Money | Bank account in Suhail's name, expense log | Finance Lead and founder as signatories |

### What to check before January 2027`,
        },
        {
          kind: "checklist",
          title: "Stack and access checklist",
          items: [
            "Domain, hosting, database, email and newsletter accounts registered to Suhail addresses with two owners each",
            "Every lead has a named login with the lowest role that does the job, and two-factor authentication on",
            "Access register created: system, owner role, people and roles, last review date",
            "Handbook has the start page, all five charters, the DACI table, expenses and paid-transition policies, and the decision log",
            "Board has a WIP limit on the in-progress column",
            "Weekly update template, review agenda and post-mortem template exist in the handbook",
            "Offboarding procedure lists every system in the register",
          ],
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How tools fail volunteer teams",
          md: md`- **Tool sprawl.** Five places to look means nobody looks in any of them. One handbook, one board, one chat.
- **The founder's personal accounts.** The newsletter list lives in your personal account and the domain renews on your card. If you are unavailable, Suhail stops.
- **Shared admin passwords.** Everyone knows the admin login and nobody can be removed without changing it for all.
- **Handbook rot.** Pages written in January and never updated. Make "update the handbook" the last step of every procedure change and every post-mortem.
- **Meetings creeping back.** Each new problem gets a new recurring call. Re-justify every recurring meeting at the quarterly review.`,
        },
        {
          kind: "callout",
          tone: "ai",
          title: "Using AI in the written operating system",
          md: md`AI is useful for drafting procedures from a recorded walkthrough, summarising a long thread into a decision-log entry, turning a post-mortem discussion into handbook changes, and checking that a new charter is consistent with the DACI table. Keep personal data of members and sponsors out of tools that are not in the access register, and have a person approve every policy text.`,
        },
        { kind: "sources", refs: ["sh08-r13", "sh08-r16"] },
        { kind: "xref", to: "fc09-l03", note: "Founder Core's cadence lesson covers meeting cost, OKRs, weekly metrics and written culture; this lesson is the volunteer team's version of the same system." },
        { kind: "xref", to: "fc10-l05", note: "Founder Core covers verification habits and reusable prompt libraries for AI-assisted work, useful for keeping the handbook current." },
        {
          kind: "question",
          question: {
            id: "sh08-l06-p2",
            type: "short",
            prompt: md`Produce **Suhail's operating kit for January 2027**: (1) the handbook table of contents with one line per page; (2) the board columns and WIP limits; (3) the meeting and ritual calendar for a quarter, with duration, participants, pre-read and output for each, placed in the overlap window and respecting Gulf and European weekends; (4) an access register covering at least eight systems, with owner role, roles granted and review date; (5) the offboarding steps for a lead. No names; illustrative.`,
            rubric: [
              "Handbook covers start page, charters, DACI, policies (expenses, paid transition, data protection, conduct), procedures and decision log",
              "Board has explicit columns with a WIP limit and a pull rule, with Little's law reasoning",
              "Meetings and rituals are few, time-boxed, each with a pre-read or template and a written output, scheduled in the overlap window and not on Friday or Saturday",
              "Access register covers domain, hosting, database, email, newsletter, chat, social, bank and password manager, with organisation-owned accounts, two owners and least privilege",
              "Offboarding steps include same-day access removal, credential rotation, handover and register update",
              "No invented names or traction; tools stated as examples",
            ],
            modelAnswer: md`**(1) Handbook.** Start here (what Suhail is, Q1 plan, how we work, code of conduct). People: five lead charters, commitment ladder, DACI table, team page. Policies: expenses, paid transition, data protection (what personal data we hold, where, who can access, retention), brand use, conflicts of interest. Procedures: hackathon run sheet, newsletter send, sponsor onboarding and fulfilment, volunteer onboarding, volunteer offboarding, incident response. Quarter: OKRs, capacity plan and cut list. Decision log.

**(2) Board.** Backlog (anyone adds) / Next (this quarter, owned) / In progress (WIP 2 per lead, pulled) / Review / Done. With throughput fixed by hours, $W = L/X$: limiting WIP is the only free lever on lead time.

**(3) Calendar (illustrative, overlap slot Wednesday 18:00 to 19:00 UTC).** Monday by 12:00 UTC: written updates (template, async). Wednesday 30 minutes: live review, all leads, pre-read is the updates and red items, output decisions in the log and actions on the board; first 3 minutes thank-you round. First Wednesday of the month: +20 minutes demo, recorded for the community. Within 14 days of each event: 45-minute post-mortem on a written pre-read; output three run-sheet changes in the handbook. End of March: 90-minute quarterly review (capacity, OKRs, charters). Every 6 months per lead: 30-minute term review. Deadlines fall on Thursdays; nothing on Friday or Saturday.

**(4) Access register.**
| System | Owner role | Roles granted | Review |
|---|---|---|---|
| Domain registrar (suhail.build) | Founder + Finance Lead | Owners only | Quarterly |
| Vercel | Head of Engineering + founder | Engineering contributors: developer | Quarterly |
| Supabase | Head of Engineering + founder | Contributors: least role needed; no production data export | Quarterly |
| Resend | Head of Engineering + founder | Editorial: sending only | Quarterly |
| Newsletter platform | Editorial + founder | Contributors: editor, not admin | Quarterly |
| Team chat and community server | Founder + Events | Leads: moderators | Quarterly |
| Social accounts | Editorial + founder | Via password manager vault | Quarterly |
| Bank and cards | Finance Lead + founder | Signatories; leads submit expenses | Quarterly |
| Password manager | Founder + Head of Engineering | Vault per workstream | Quarterly |

**(5) Offboarding.** Handover document before the last day; same day: remove or downgrade every role in the register, rotate any shared credential they knew, transfer ownership of any document they created; within a week: update charter, DACI and team page; thank publicly and invite to alumni.`,
            explanation: md`A strong kit lets a new lead find any rule, any task and any account owner without asking the founder, and lets anyone leave without taking Suhail's keys with them.`,
            concepts: ["sh08.handbook", "sh08.wip-limit", "sh08.meeting-design", "sh08.team-rituals", "sh08.access-hygiene"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to Suhail's Head of Engineering why the team limits work in progress on the board, even though everyone is eager to start new things.",
          keyPoints: [
            "Little's law: average lead time equals work in progress divided by throughput",
            "Throughput is fixed by volunteer hours, so WIP is the only free lever on lead time",
            "Fewer items in progress means less context switching and faster delivery of each one",
            "A full column makes overload visible instead of hiding it in people's evenings",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh08-l06-q1",
      type: "numeric",
      prompt: md`A board holds 9 items in progress and the team finishes 1.5 items a week. What is the average lead time, in weeks?`,
      answer: 6,
      tolerance: { abs: 0.01 },
      unit: "weeks",
      explanation: md`$W = L/X = 9/1.5 = 6$ weeks.`,
      concepts: ["sh08.wip-limit"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh08-l06-q2",
      type: "mcq",
      prompt: "A decision was agreed in a chat thread. What should happen next?",
      options: [
        "Nothing; the thread is the record",
        "Copy it into the decision log the same day with owner, reason and review date",
        "Raise it again at the next live meeting",
        "Pin the message",
      ],
      answer: 1,
      explanation: md`Chat is for conversation, the handbook is for memory. A decision not in the log will be re-argued in six weeks.`,
      concepts: ["sh08.handbook"],
      difficulty: 1,
    },
    {
      id: "sh08-l06-q3",
      type: "multi",
      prompt: "Which are good access practices for Suhail's systems? (Select all that apply.)",
      options: [
        "Registering the domain and hosting to a Suhail address with two owners",
        "One shared admin login for the newsletter platform used by every lead",
        "Named logins with the lowest role that does the job",
        "A quarterly review of an access register",
        "Keeping registration data exports in a lead's personal spreadsheet for convenience",
      ],
      answer: [0, 2, 3],
      explanation: md`Organisation ownership, least privilege and regular review keep control with Suhail. Shared admin logins cannot be revoked per person, and personal exports put members' data outside any control.`,
      concepts: ["sh08.access-hygiene"],
      difficulty: 1,
    },
    {
      id: "sh08-l06-q4",
      type: "decision",
      prompt: md`A lead proposes a new 45-minute weekly call to coordinate sponsors and events, in addition to the 30-minute review. The overlap window is one hour. What do you do?`,
      options: [
        { text: "Ask what decisions the call would make, and handle them with a shared fulfilment page and a 10-minute slot in the existing review instead.", score: 1, feedback: "Right: the overlap hour is scarce, and most coordination is information exchange that a written page does better." },
        { text: "Approve it; more coordination is better.", score: 0.2, feedback: "It uses most of the overlap window, adds a weekly cost for everyone and duplicates the review." },
        { text: "Make it optional.", score: 0.4, feedback: "Optional meetings drift into mandatory ones and split information between attendees and non-attendees." },
      ],
      explanation: md`Every recurring meeting must beat its cost. For volunteers, the cost is their scarcest hours.`,
      concepts: ["sh08.meeting-design"],
      difficulty: 2,
    },
    {
      id: "sh08-l06-q5",
      type: "order",
      prompt: "Order the columns of the board from idea to finished.",
      items: ["Backlog", "Next (this quarter)", "In progress", "Review", "Done"],
      explanation: md`Items are pulled into progress only when the WIP limit allows, then checked before they count as done.`,
      concepts: ["sh08.wip-limit"],
      difficulty: 1,
    },
    {
      id: "sh08-l06-q6",
      type: "mcq",
      prompt: "What is the output of a good event post-mortem?",
      options: [
        "A list of who was to blame",
        "Changes to the run sheet and procedures in the handbook",
        "A recording of the meeting",
        "A satisfaction score",
      ],
      answer: 1,
      explanation: md`A retrospective is worth its time only if it changes how the next event is run, and that change lives in the handbook.`,
      concepts: ["sh08.team-rituals", "sh08.handbook"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh08-l06-f1", front: "Little's law", back: md`$W = L/X$: lead time = work in progress / throughput.`, concepts: ["sh08.wip-limit"] },
    { id: "sh08-l06-f2", front: "Handbook rule", back: "If it is not in the handbook, it is not a rule. Chat is for conversation, the handbook is for memory.", concepts: ["sh08.handbook"] },
    { id: "sh08-l06-f3", front: "Three retrospective questions", back: "What went well, what did not, what will we change (and the change goes in the handbook).", concepts: ["sh08.team-rituals"] },
    { id: "sh08-l06-f4", front: "Five access-hygiene rules", back: "Organisation-owned accounts with two owners, named logins with least privilege, 2FA, a password manager, an access register reviewed quarterly.", concepts: ["sh08.access-hygiene"] },
    { id: "sh08-l06-f5", front: "Every meeting needs", back: "A purpose, a pre-read, a time box in the overlap window, a decider if deciding, and a written output.", concepts: ["sh08.meeting-design"] },
    { id: "sh08-l06-f6", front: "Weekly thank-you round", back: "First 3 minutes of the review: specific thanks, recorded in the notes. Recognition on a schedule.", concepts: ["sh08.team-rituals", "sh08.recognition"] },
  ],
};

export default lesson;
