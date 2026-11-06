import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh01-l03",
  title: "Designing Suhail's community: tiers, rituals, contribution ladders and retention",
  summary:
    "The design layer: membership tiers that reward contribution rather than payment, rituals with a fixed cadence, a contribution ladder from lurker to organiser with a small first ask at each rung, and retention mechanics. The funnel maths shows why retention, not reach, sets the size of the community: steady state, time to get there and expected member lifetime.",
  minutes: 85,
  objectives: [
    "You can design membership tiers with clear entry criteria and benefits for each",
    "You can build a ritual calendar a volunteer team can sustain",
    "You can design a contribution ladder with a trigger, a first ask and recognition at each rung",
    "You can compute steady-state active members, time to steady state and expected member lifetime from the funnel model",
    "You can compare the effect of reach, conversion, retention and referral levers",
  ],
  concepts: [
    { id: "sh01.membership-tiers", name: "Membership tiers", description: "Levels of access and responsibility (audience, member, builder alumni, core, leads), entered by a clear criterion, ideally contribution rather than payment.", competency: "sh-community" },
    { id: "sh01.rituals", name: "Community rituals", description: "Recurring events and artefacts with a fixed cadence (weekly newsletter, monthly hackathon, annual Suhail Season) that create habits and give members a reason to return.", competency: "sh-community", related: ["sh01.membership-tiers"] },
    { id: "sh01.contribution-ladder", name: "Contribution ladder", description: "The path from lurker to participant, contributor, collaborator and organiser, with a trigger, a small first ask and recognition at each rung.", competency: "sh-community", related: ["fc05.community-of-practice"] },
    { id: "sh01.funnel-steady-state", name: "Funnel steady state", description: "With monthly intake Rc, retention r and referral k, active members converge to Rc/(1 - r - k); the gap closes by a factor (r + k) each month.", competency: "sh-community", related: ["sh01.retention-lever"] },
    { id: "sh01.retention-lever", name: "Retention as the main lever", description: "Retention sets the multiplier 1/(1 - r - k) on intake and the member lifetime 1/(1 - r); small retention gains are worth large reach gains.", competency: "sh-community", related: ["fc02.retention-cohort"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Structure, rhythm and the maths of retention",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Suhail starts in January 2027 with a volunteer team and no members. The first design choices (who is a member, what happens every week, how someone goes from reading the newsletter to running a hackathon) decide whether the community grows on its own or whether five unpaid leads carry it until they burn out. The funnel maths lets you set honest targets for sponsors and for your team, and shows where the effort pays.`,
        },
        {
          kind: "md",
          md: md`### Membership tiers

Tiers give people a visible path and let you match access to trust. A design for Suhail (proposed, not launched):

| Tier | Entry criterion | Gets | Gives |
|---|---|---|---|
| **Audience** | Subscribes, follows, listens | Newsletter, The Majlis, public events | Attention |
| **Member** | Short profile with a link to real work (GitHub, Hugging Face, portfolio) | Community space, event applications, job board | A profile, basic norms |
| **Builder alumni** | Attended a Suhail hackathon or shipped a listed project | Alumni channel, sponsor challenges, opt-in talent list | Projects, feedback, referrals |
| **Core** | Invited after repeated contribution (mentoring, writing, co-hosting) | Early access, Suhail Season roles, direct line to leads | Regular time |
| **Leads** | The volunteer team | Decision rights | Ownership |

Two principles:

1. **Tiers by contribution, not payment, at the start.** Payment tiers attract people buying access; contribution tiers attract people building. Whether Suhail ever charges members is a structures decision, covered later in the track.
2. **Each tier has a written criterion.** "Invited by a lead" without a criterion becomes a friends list, which kills trust quickly in small ecosystems where everyone knows everyone.

### Rituals

A **ritual** is a recurring event or artefact with a fixed cadence that people can plan around. Rituals turn one-off attendance into a habit.

| Cadence | Suhail ritual (proposed) | Purpose |
|---|---|---|
| Weekly | Newsletter (jobs, projects, events) | Habit, distribution, sponsor inventory |
| Weekly or biweekly | Online build night or office hours | Keeps builders active between events |
| Monthly | Hackathon in one lead city; The Majlis episode | Visible work; story |
| Quarterly | A build season (for example six weeks, ends with a showcase) | Batch effect without investment |
| Annual | Suhail Season conference | Concentrated sponsor and media moment |

Design properties: **fixed day and time**, **low cost to run** (a volunteer team must sustain it for years), **something to show** at the end (a project, a post, an episode), and **a role for members**, not only for leads.

### The contribution ladder

Participation is very unequal: Nielsen's 90-9-1 heuristic (most read, a few contribute sometimes, very few create most content) holds roughly in most online communities. You cannot change the shape, but you can raise each rung's conversion by making the next step small and visible.`,
        },
        {
          kind: "flow",
          title: "Suhail contribution ladder (proposed)",
          steps: [
            { label: "Lurker", detail: "Reads the newsletter, listens to The Majlis. First ask: reply to one question in the newsletter." },
            { label: "Participant", detail: "Attends an event, reacts, asks. Trigger: first attendance. First ask: post what you built in the showcase channel." },
            { label: "Contributor", detail: "Shares projects, answers questions. Trigger: second post. First ask: review one newcomer's project." },
            { label: "Collaborator", detail: "Mentors at a hackathon, writes a guest piece, co-hosts a build night. Trigger: a lead asks personally." },
            { label: "Organiser", detail: "Runs a build night or a city edition with a playbook. Trigger: two successful co-hosts." },
            { label: "Lead", detail: "Owns a function (events, editorial, partnerships). Trigger: invited, with a written role." },
          ],
          caption: "Each rung needs a trigger (when to ask), a first ask small enough to say yes to, and recognition (credit in the newsletter, a role badge, a thank-you from a lead). People move up because someone asked them, rarely on their own.",
        },
        {
          kind: "md",
          md: md`Wenger's term for the bottom rungs is **legitimate peripheral participation**: newcomers learn by doing small, real tasks at the edge of the community, watched and helped by experienced members. The design job is to provide those tasks.

### The funnel model

Let $R$ be monthly reach (people who see Suhail), $c$ the share who become members, $r$ the monthly retention of active members and $k$ the new members each active member brings per month through referrals.`,
        },
        { kind: "equation", formula: "sh01-funnel" },
        {
          kind: "md",
          md: md`Setting $A_t = A_{t-1} = A^*$ gives the steady state:`,
        },
        { kind: "equation", formula: "sh01-steady-state" },
        {
          kind: "md",
          md: md`**Derivation.** $A^* = (r+k)A^* + Rc \Rightarrow A^*(1 - r - k) = Rc$. Valid only for $r + k < 1$. If retention plus referral reaches 1, every month adds more than it loses and the community compounds until it runs out of reachable people, which in practice means the model's constant $R$ and $k$ stop holding.

Subtract $A^*$ from both sides of the recurrence: $A_t - A^* = (r+k)(A_{t-1} - A^*)$. The gap shrinks by the factor $(r+k)$ every month, so from $A_0 = 0$:`,
        },
        { kind: "equation", formula: "sh01-approach" },
        { kind: "equation", formula: "sh01-time-to-steady" },
        {
          kind: "md",
          md: md`And with constant monthly retention, a member's active life is geometric:`,
        },
        { kind: "equation", formula: "sh01-lifetime" },
        {
          kind: "md",
          md: md`Three consequences:

1. **Intake sets the scale, retention sets the multiplier.** The multiplier $1/(1-r-k)$ is 6.7 at $r + k = 0.85$ and 10 at 0.90. Moving from 0.85 to 0.90 is worth as much as 50 % more reach.
2. **High retention is slow.** At $r + k = 0.85$, reaching 90 % of steady state takes about 14 months. Sponsor promises must sit on the curve, not on the ceiling.
3. **Referrals behave like retention.** Each referred member is a member you did not have to reach. Formats that make members bring a friend (team-based hackathons, plus-one invites) raise $k$.`,
        },
        { kind: "widget", widget: "community-funnel", caption: "Illustrative defaults: 20,000 reach, 1.5 % conversion, 80 % retention, 5 % referral: steady state 300 / 0.15 = 2,000. Raise retention to 85 % and watch the ceiling move to 3,000, then raise reach to 30,000 at 80 % retention instead: also 3,000." },
      ],
    },
    {
      layer: "applied",
      title: "Setting funnel targets for Suhail's first year",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Steady state, the first year and member lifetime (illustrative)",
          given: md`Illustrative inputs, not forecasts: monthly reach $R = 20{,}000$ (newsletter forwards, social, partner channels, event pages), conversion $c = 1.5\,\%$, retention $r = 0.80$, referral $k = 0.05$. Start from zero in January 2027.`,
          steps: [
            { md: md`**Intake:** $Rc = 20{,}000 \times 0.015 = 300$ new members per month.` },
            { md: md`**Steady state:** $A^* = 300 / (1 - 0.80 - 0.05) = 300 / 0.15 = 2{,}000$ active members.` },
            { md: md`**After 12 months:** $A_{12} = 2{,}000 \times (1 - 0.85^{12}) = 2{,}000 \times (1 - 0.142) = 1{,}716$.` },
            { md: md`**Time to 90 %:** $t_{0.9} = \ln 0.1 / \ln 0.85 = -2.303 / -0.1625 = 14.2$ months.` },
            { md: md`**Member lifetime:** $\bar L = 1/(1 - 0.80) = 5$ months active on average.` },
            { md: md`**Contributors at 8 %:** $0.08 \times 1{,}716 \approx 137$ by month 12. If 10 % of contributors become organisers, about 14 people can run events, which is the real capacity limit of a volunteer community.` },
          ],
          result: md`A five-month average lifetime means most members drift away before Suhail Season if nothing pulls them back. The highest-return work is the ritual calendar and onboarding, not more reach.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A smaller city launch (illustrative)",
          given: md`Illustrative: a single-city launch with $R = 12{,}000$, $c = 2\,\%$, $r = 0.75$, $k = 0.03$, starting from zero.`,
          steps: [
            { md: md`**Intake:** $Rc = 240$ per month.` },
            { md: md`**Steady state:** $A^* = 240 / (1 - 0.75 - 0.03) = 240/0.22 = 1{,}091$.`, hidden: true, check: { prompt: "Steady-state active members", answer: 1091, tolerance: { abs: 2 } } },
            { md: md`**After 6 months:** $1{,}091 \times (1 - 0.78^6) = 1{,}091 \times (1 - 0.225) = 845$.`, hidden: true, check: { prompt: "Active members after 6 months", answer: 845, tolerance: { abs: 3 } } },
            { md: md`**Member lifetime:** $1/(1-0.75) = 4$ months.`, hidden: true, check: { prompt: "Expected active lifetime", answer: 4, unit: "months", tolerance: { abs: 0.01 } } },
          ],
          result: md`Lower retention means a faster approach (90 % in about 9 months) but a lower ceiling. A city with fewer builders but a stronger habit can outgrow a larger city with weak rituals.`,
        },
        {
          kind: "question",
          question: {
            id: "sh01-l03-p1",
            type: "numeric",
            prompt: md`Illustrative: with $Rc = 300$ per month and $k = 0.05$, what monthly retention $r$ gives a steady state of 3,000 active members? (Answer as a fraction, two decimals.)`,
            answer: 0.85,
            tolerance: { abs: 0.005 },
            explanation: md`$3{,}000 = 300 / (1 - r - 0.05) \Rightarrow 1 - r - 0.05 = 0.10 \Rightarrow r = 0.85$. Five points of retention lift the ceiling by 50 %, the same as raising reach from 20,000 to 30,000.`,
            concepts: ["sh01.funnel-steady-state", "sh01.retention-lever"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running the design in practice",
      blocks: [
        {
          kind: "md",
          md: md`### Retention mechanics that work in builder communities

| Mechanic | How | Which parameter |
|---|---|---|
| **First-week action** | Every new member gets a personal welcome and one concrete invitation (next build night, a channel to post in) within seven days | $r$ in month 1, the steepest drop |
| **Small groups** | Teams, city chapters, interest channels (Arabic NLP, robotics, fintech) so people form a few strong ties | $r$ |
| **Cadence** | Never more than two weeks without a reason to come back | $r$ |
| **Visible progress** | Build seasons with a showcase; project pages that persist | $r$, contribution |
| **Recognition** | Credit in the newsletter, roles, thanks from leads | Ladder conversion |
| **Team formats** | Hackathon teams of three to four; bring-a-friend invites | $k$ |
| **Reactivation** | A short, personal note to members silent for two months, with one specific reason to return | $r$ |

### Who does what

On a volunteer team: the Events and Programming lead owns the ritual calendar; Editorial owns the newsletter and recognition; the Head of Engineering owns the member data (sign-up, profiles, consent, the activity definition in Supabase); Partnerships brings sponsor challenges that give members something real to build. You own the targets and the weekly review.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Designing for 10,000 members before you have 10",
          md: md`Elaborate tiers, badges and point systems built before launch usually go unused. In the first months the ladder is personal: a lead noticing a good project and asking its builder to demo it. Write the tiers and the ladder down, but run them by hand until the patterns are clear. Recruiting the first members one by one is not a failure of scale; it is how communities start.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "More rituals than the team can carry",
          md: md`Each ritual is a promise. A weekly build night that is cancelled twice teaches members the calendar is unreliable. Start with fewer rituals at a fixed cadence (newsletter weekly, one event monthly), keep them for six months, and add only when an organiser from the community, not a lead, can own the new one.`,
        },
        {
          kind: "checklist",
          title: "Community design checklist",
          items: [
            "Tiers written with entry criteria, gets and gives",
            "Ritual calendar for six months with an owner per ritual",
            "Ladder with trigger, first ask and recognition per rung",
            "Definition of active member and of contribution, written and fixed",
            "Funnel inputs estimated with ranges and a target curve, not only a ceiling",
            "Onboarding sequence for the first seven days",
            "Reactivation rule for silent members",
          ],
        },
        { kind: "xref", to: "fc05-l03", note: "Communities of practice, participation inequality and engineer trust signals in general; this lesson adds Suhail's tiers, rituals and funnel targets." },
        {
          kind: "question",
          question: {
            id: "sh01-l03-p2",
            type: "short",
            prompt: md`Produce Suhail's **community design one-pager for January to June 2027**: (1) tiers with entry criteria; (2) a ritual calendar with cadence and an owner role for each; (3) a contribution ladder with trigger, first ask and recognition for at least four rungs; (4) illustrative funnel inputs with a stated range, the resulting steady state, the month-6 value from the closed form, and the one lever you will focus on and why.`,
            rubric: [
              "Tiers have written, contribution-based entry criteria and distinct benefits",
              "Rituals have a fixed cadence, an owner role from the real team (Events and Programming, Editorial, Partnerships, Head of Engineering, Finance) and are sustainable for volunteers",
              "Ladder has at least four rungs, each with a trigger, a small first ask and a form of recognition",
              "Funnel inputs are labelled illustrative with ranges; steady state and month-6 values are computed correctly",
              "Names one lever with a reason grounded in the maths (for example retention multiplier vs cost of reach)",
              "Claims no existing members, sponsors or events",
            ],
            modelAnswer: md`**Tiers:** Audience (subscribe); Member (profile with a link to real work); Builder alumni (attended a hackathon or shipped a listed project); Core (invited after three contributions in a quarter); Leads.

**Rituals (Jan to Jun 2027):** Weekly newsletter, Thursday (Editorial). Biweekly online build night, Tuesday 20:00 Gulf time (Events and Programming). Monthly hackathon in one city, Kuwait City then Riyadh (Events and Programming with Partnerships for sponsor challenges). Monthly Majlis episode (Editorial). Six-week build season from mid-April ending in a showcase (Events and Programming). Ramadan (about February to March 2027, depending on moon sighting): replace the hackathon with late-evening build nights.

**Ladder:** Lurker to participant: trigger, third newsletter opened; ask, reply with what you are building; recognition, featured reply. Participant to contributor: trigger, first event attended; ask, post your project in the showcase; recognition, project listed in the newsletter. Contributor to collaborator: trigger, two posts; ask, mentor one team at the next hackathon (lead asks personally); recognition, mentor credit on the event page. Collaborator to organiser: trigger, two mentoring sessions; ask, co-host a build night with the playbook; recognition, organiser role and a Season role.

**Funnel (illustrative):** $R$ = 8,000 to 15,000 a month, take 10,000; $c$ = 2 %; $r$ = 0.75 to 0.85, take 0.80; $k$ = 0.04. $Rc = 200$; $A^* = 200/0.16 = 1{,}250$; $A_6 = 1{,}250 (1 - 0.84^6) = 1{,}250 (1 - 0.351) = 811$.

**Lever:** retention. Each point of $r$ near 0.80 raises the ceiling about 6 %, and the first-week welcome, build nights and showcase cost volunteer hours we have, while extra reach costs money we do not have.`,
            explanation: md`The answer must tie design choices to the funnel parameters and use honest, labelled numbers.`,
            concepts: ["sh01.membership-tiers", "sh01.rituals", "sh01.contribution-ladder", "sh01.funnel-steady-state"],
            difficulty: 3,
          },
        },
        { kind: "sources", refs: ["sh01-r17", "sh01-r18", "sh01-r16", "sh01-r32"] },
        {
          kind: "feynman",
          prompt: "Explain to your Partnerships lead why improving retention from 80 % to 85 % is worth as much as growing reach by half.",
          keyPoints: [
            "Steady state is intake divided by (1 - retention - referral)",
            "At 5 % referral the denominator goes from 0.15 to 0.10",
            "That multiplies the ceiling by 1.5, the same as 50 % more intake",
            "Retention gains also lengthen member lifetime (5 to 6.7 months)",
            "But higher retention means a slower approach to the ceiling",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh01-l03-q1",
      type: "numeric",
      prompt: md`Monthly intake $Rc = 400$, retention 0.70, referral 0.10. What is the steady-state number of active members?`,
      answer: 2000,
      tolerance: { abs: 1 },
      unit: "members",
      explanation: md`$A^* = 400 / (1 - 0.70 - 0.10) = 400/0.20 = 2{,}000$.`,
      concepts: ["sh01.funnel-steady-state"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh01-l03-q2",
      type: "numeric",
      prompt: md`With $r + k = 0.90$, how many months does it take to reach 90 % of steady state from zero? One decimal.`,
      answer: 21.9,
      tolerance: { abs: 0.1 },
      unit: "months",
      explanation: md`$t = \ln 0.1/\ln 0.9 = -2.303/-0.1054 = 21.9$ months. A higher ceiling, reached more slowly.`,
      concepts: ["sh01.funnel-steady-state", "sh01.retention-lever"],
      difficulty: 2,
    },
    {
      id: "sh01-l03-q3",
      type: "numeric",
      prompt: md`At 90 % monthly retention, what is a member's expected active lifetime?`,
      answer: 10,
      tolerance: { abs: 0.01 },
      unit: "months",
      explanation: md`$\bar L = 1/(1-0.9) = 10$ months, twice the 5 months at 80 %.`,
      concepts: ["sh01.retention-lever"],
      difficulty: 1,
    },
    {
      id: "sh01-l03-q4",
      type: "mcq",
      prompt: md`Why should Suhail's tiers be entered by contribution rather than payment at launch?`,
      options: [
        "Payment processing is hard to set up",
        "Contribution tiers attract and reward people who build, which is what makes the community valuable to everyone else",
        "Paid tiers are illegal in the Gulf",
        "Members never pay for communities",
      ],
      answer: 1,
      explanation: md`Members' value comes from other members' work. Rewarding contribution compounds that; paid access attracts people buying proximity. Charging may come later as a structures decision.`,
      concepts: ["sh01.membership-tiers"],
      difficulty: 1,
    },
    {
      id: "sh01-l03-q5",
      type: "order",
      prompt: md`Order the rungs of the contribution ladder.`,
      items: ["Lurker", "Participant", "Contributor", "Collaborator", "Organiser"],
      explanation: md`Each rung needs a trigger, a small first ask and recognition.`,
      concepts: ["sh01.contribution-ladder"],
      difficulty: 1,
    },
    {
      id: "sh01-l03-q6",
      type: "decision",
      prompt: md`Three months in, your Events lead wants to add a weekly in-person meetup in a second city on top of the monthly hackathon and biweekly build nights. Nobody outside the lead team has organised anything yet. What do you decide?`,
      options: [
        { text: "Approve: more rituals mean more retention.", score: 0.2, feedback: "Only if they run reliably. A ritual the team cannot sustain teaches members the calendar cannot be trusted." },
        { text: "Hold until a member from that city has co-hosted twice and can own it with the playbook; meanwhile run one pilot evening there.", score: 1, feedback: "Right: add rituals when community organisers, not leads, can carry them." },
        { text: "Cancel the build nights to make room.", score: 0.3, feedback: "Swapping a working ritual for an untested one loses the habit you built." },
      ],
      explanation: md`Ritual count is limited by organiser capacity, which comes from the ladder.`,
      concepts: ["sh01.rituals", "sh01.contribution-ladder"],
      difficulty: 2,
    },
    {
      id: "sh01-l03-q7",
      type: "mcq",
      prompt: md`What does the referral rate $k$ do in the funnel model?`,
      options: [
        "Nothing once retention is high",
        "It acts like extra retention: it adds to r in the multiplier 1/(1 - r - k)",
        "It only changes the time to steady state",
        "It multiplies reach",
      ],
      answer: 1,
      explanation: md`New members from referrals are proportional to active members, exactly like retained ones, so $k$ enters next to $r$.`,
      concepts: ["sh01.funnel-steady-state"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "sh01-l03-f1", front: "Steady-state active members", back: md`$A^* = Rc/(1 - r - k)$, valid for $r + k < 1$.`, concepts: ["sh01.funnel-steady-state"] },
    { id: "sh01-l03-f2", front: "Approach to steady state", back: md`$A_t = A^*[1-(r+k)^t]$; 90 % takes $\ln 0.1/\ln(r+k)$ months (14 at 0.85).`, concepts: ["sh01.funnel-steady-state"] },
    { id: "sh01-l03-f3", front: "Expected member lifetime", back: md`$1/(1-r)$: 5 months at 80 %, 10 at 90 %.`, concepts: ["sh01.retention-lever"] },
    { id: "sh01-l03-f4", front: "Three parts of each ladder rung", back: "A trigger (when to ask), a small first ask, and recognition.", concepts: ["sh01.contribution-ladder"] },
    { id: "sh01-l03-f5", front: "Properties of a good ritual", back: "Fixed cadence, low cost to run, something to show at the end, a role for members.", concepts: ["sh01.rituals"] },
    { id: "sh01-l03-f6", front: "Legitimate peripheral participation", back: "Wenger: newcomers learn by doing small, real tasks at the edge of the community, helped by experienced members.", concepts: ["sh01.contribution-ladder"] },
  ],
};

export default lesson;
