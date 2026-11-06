import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh08-l01",
  title: "Motivation without pay: what volunteers get, why they stay and how much to ask of them",
  summary:
    "Suhail's leads will work for no salary until there is revenue. That only works if each lead gets something they value in exchange for their hours, and if you ask for a commitment they can actually keep. This lesson covers the research on why people volunteer (the Volunteer Functions Inventory and self-determination theory), why a small payment can do more harm than none (motivation crowding), the arithmetic of volunteer retention, and how to design a commitment ladder and a volunteer value proposition per role.",
  minutes: 60,
  objectives: [
    "Name the six volunteer functions and match each Suhail lead role to the motives it can actually serve",
    "Explain motivation crowding and decide when a token payment helps or hurts",
    "Convert a monthly retention rate into annual retention, expected tenure and the number of seats you must refill each year",
    "Design a commitment ladder (core lead, contributor, occasional helper) with explicit hours and terms",
    "Write a volunteer value proposition for a lead role that is honest about what Suhail can and cannot give",
  ],
  concepts: [
    { id: "sh08.volunteer-functions", name: "Volunteer functions (VFI)", description: "Clary and colleagues' six motives for volunteering: values, understanding, social, career, protective and enhancement. Volunteers whose dominant motives are served are more satisfied and more likely to continue.", competency: "sh-org" },
    { id: "sh08.self-determination", name: "Self-determination needs", description: "Autonomy, competence and relatedness: the three psychological needs whose satisfaction sustains intrinsic motivation (Ryan and Deci). Unpaid roles live or die on them.", competency: "sh-org", related: ["sh08.volunteer-functions"] },
    { id: "sh08.crowding-out", name: "Motivation crowding out", description: "An external reward, especially a small payment, can replace an intrinsic or social reason to act with a market one, so effort falls below the unpaid level (Gneezy and Rustichini; Frey and Jegen).", competency: "sh-org", related: ["sh08.self-determination"] },
    { id: "sh08.commitment-ladder", name: "Commitment ladder", description: "Explicit tiers of involvement (occasional helper, contributor, core lead) with stated hours, term and rights, so people can step up or down without leaving.", competency: "sh-org", related: ["sh08.volunteer-retention"] },
    { id: "sh08.volunteer-retention", name: "Volunteer retention arithmetic", description: "With monthly retention r, the share still active after t months is r to the power t, expected tenure is 1/(1 minus r) months, and a team of L seats loses about 12L(1 minus r) people a year.", competency: "sh-org" },
    { id: "sh08.volunteer-value-proposition", name: "Volunteer value proposition", description: "A written, role-specific statement of what the volunteer gives (hours, outcomes, term) and what they get (skills, credit, network, references, first consideration for paid roles), without promises the organisation cannot keep.", competency: "sh-org", related: ["sh08.volunteer-functions", "fc09.contractor-volunteer"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Why people work for free, and what makes them stop",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`From January 2027 Suhail runs on five unpaid leads (Partnerships, Events and Programming, Editorial, Head of Engineering, Finance Lead) plus you. There is no salary to pull people back when their day job gets busy, so the only thing that keeps a newsletter going out every week is that each lead gets enough from the role to keep choosing it. If you treat volunteers as free staff, you will lose them in the first quarter and spend the year recruiting replacements instead of building the community.`,
        },
        {
          kind: "md",
          md: md`### The exchange is real, the currency is not money

A volunteer is not working for nothing. They are trading hours for things that are not cash. Clary, Snyder and colleagues (1998) built the **Volunteer Functions Inventory (VFI)** from the observation that the same act (organising a hackathon, editing a newsletter) serves different people for different reasons. They found six functions:

| Function | What the person wants | What a Suhail lead role can offer |
|---|---|---|
| **Values** | Act on beliefs about helping others | Building opportunities for Arab builders who lack peers and visibility |
| **Understanding** | Learn skills, see how things work | Running sponsor deals, programming a conference, shipping a production site |
| **Social** | Be with people they like; meet expectations of people they respect | A small team of peers; the founder and the community |
| **Career** | Experience and contacts that help a career | A title, a portfolio, introductions to investors and employers |
| **Protective** | Reduce guilt or escape personal problems | Rarely a good basis for a lead role; watch for it |
| **Enhancement** | Feel good about oneself, grow | Public credit, speaking slots, being the person who made it happen |

The finding that matters for you: people whose **dominant** motives are served by the role report more satisfaction and greater intention to continue. Matching is the job. A Head of Engineering who joined for **career** and **understanding** needs real architecture decisions and a visible portfolio; give that person only bug fixes and status meetings and they leave, however much they believe in the mission.

### The three needs underneath

Self-determination theory (Ryan and Deci, 2000) says intrinsic motivation is sustained when three needs are met:

- **Autonomy:** the lead decides how to do the work inside a clear boundary (Lesson 2's charter).
- **Competence:** the work is hard enough to grow on and the person can see they are succeeding (outcomes they own, feedback).
- **Relatedness:** they belong to a team that notices what they do.

A paid employee can stay through a quarter where all three are missing. A volunteer will not. Every design choice in this module (charters, capacity plans, recognition, tools) is a way of supplying these three needs cheaply.

### Why a small payment can be worse than none

Gneezy and Rustichini's experiments ("Pay enough or don't pay at all", 2000) found that people offered a **small** payment for a task (collecting donations, answering test questions) performed **worse** than people offered nothing, while a larger payment restored some of the effort. Frey and Jegen (2001) summarise the wider evidence as **motivation crowding**: an external reward that feels controlling replaces an intrinsic or social reason to act with a market one. Once the frame is "this is a job", USD 100 a month is a bad job.

Practical rules that follow:

- Do **not** pay token stipends to some leads and call it fair. Either keep the role clearly voluntary and invest in non-cash returns, or pay a real rate (Lesson 5).
- Reimburse **expenses** (travel to an event, a software seat) in full and fast. Covering costs does not crowd out motivation; making people subsidise the organisation does.
- Non-cash rewards that are **informational** (recognition of specific work, new responsibility) support autonomy and competence. Rewards that feel like **control** (points tables, "top volunteer" leaderboards tied to hours) can crowd out the same way money does.

### Retention arithmetic

Treat each lead's monthly decision to stay as a probability $r$. If it is roughly constant:`,
        },
        { kind: "equation", formula: "sh08-retention-survival" },
        { kind: "equation", formula: "sh08-expected-tenure" },
        { kind: "equation", formula: "sh08-seat-turnover" },
        {
          kind: "md",
          md: md`Small differences in monthly retention are large differences in annual reality. At $r = 0.95$ a lead stays 20 months on average and only 54% of a starting team is still there after a year; at $r = 0.90$ the average is 10 months and 28% remain. The chart shows the three curves.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "Share of a starting lead team still active (illustrative monthly retention rates)",
          xKey: "month",
          xLabel: "Month",
          yLabel: "Share still active (%)",
          series: [
            { key: "r90", label: "r = 0.90" },
            { key: "r95", label: "r = 0.95" },
            { key: "r97", label: "r = 0.97" },
          ],
          data: [
            { month: 0, r90: 100, r95: 100, r97: 100 },
            { month: 2, r90: 81, r95: 90.3, r97: 94.1 },
            { month: 4, r90: 65.6, r95: 81.5, r97: 88.5 },
            { month: 6, r90: 53.1, r95: 73.5, r97: 83.3 },
            { month: 8, r90: 43, r95: 66.3, r97: 78.4 },
            { month: 10, r90: 34.9, r95: 59.9, r97: 73.7 },
            { month: 12, r90: 28.2, r95: 54, r97: 69.4 },
          ],
          caption: "Computed from N(t)/N0 = r^t. The gap between 0.90 and 0.97 per month is the gap between replacing most of the team each year and keeping most of it.",
        },
        {
          kind: "md",
          md: md`### Commitment levels: a ladder, not a binary

Most volunteer programmes fail at the boundary between "in" and "out": a lead whose job gets busy has only two options, carry on badly or quit. A **commitment ladder** gives them a third: step down a rung and stay.

| Rung | Hours per week (illustrative) | Term | Rights and duties |
|---|---|---|---|
| **Core lead** | 5 to 8 | 6 months, renewable | Owns a workstream and its budget line; decides inside the charter; attends weekly review |
| **Contributor** | 2 to 4 | One project or one quarter | Owns tasks, not outcomes; reports to a lead |
| **Occasional helper** | Event days only | Per event | Shows up, follows the run sheet, gets credit |
| **Alumni** | 0 | Open | Stays in the community channel, gets invited back, can be a reference |

Writing down the hours matters more than the exact number. Research on volunteer management (Hager and Brudney, 2004, a US survey of charities) associates retention with a handful of practices: screening and matching people to roles, training, and recognising contributions. A role with stated hours is the precondition for all of them: you cannot match someone to a role whose size nobody knows.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Volunteer retention benchmarks",
          md: md`A widely quoted figure (Eisner, Grimm, Maynard and Washburn, Stanford Social Innovation Review, 2009) is that roughly one in three US volunteers in a given year does not volunteer the following year. It refers to general volunteering, not to skilled leads in a builder community, and the study population and method were not checked for this lesson. Use it as a rough outside view, not a target, and measure Suhail's own retention from month one.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "What retention means for Suhail's five lead seats",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Five lead seats at 95% monthly retention",
          given: md`Illustrative: Suhail starts January 2027 with 5 lead seats filled. Assume each lead has a 5% chance of leaving in any given month, so $r = 0.95$, and that any vacancy is refilled straight away.`,
          steps: [
            { md: md`**Annual retention of one lead:** $R_a = r^{12} = 0.95^{12} = 0.540$. Only about half of the January team is likely to still be in place in January 2028.` },
            { md: md`**Expected tenure:** $T = 1/(1 - r) = 1/0.05 = 20$ months.` },
            { md: md`**Seats to refill per year** (vacancies refilled continuously): $H = 12\,L\,(1 - r) = 12 \times 5 \times 0.05 = 3.0$ recruits a year.` },
            { md: md`**Without refilling** (the original five only): expected leavers $= L(1 - r^{12}) = 5 \times 0.46 = 2.3$. The difference from 3.0 is that replacements can leave too.` },
            { md: md`**What it costs:** if recruiting and onboarding one lead takes you about 13 hours (Lesson 4), three recruits cost about 40 founder hours a year, a full working week, before counting the lost output while the seat is empty.` },
          ],
          result: md`At $r = 0.95$, expect to recruit about **3 leads a year** to keep 5 seats filled (illustrative). Raising retention to 0.97 cuts that to about 1.8, which is why time spent on matching, recognition and realistic hours is cheaper than recruiting.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Six seats at 96% monthly retention",
          given: md`Illustrative: by mid-2027 Suhail adds a sixth lead seat (for example, a Community lead). Monthly retention improves to $r = 0.96$ because roles now have charters and stated hours.`,
          steps: [
            { md: md`**Annual retention:** $R_a = 0.96^{12}$.` },
            { md: md`$R_a = 0.613$, so about 61% of a starting team remains after a year.`, hidden: true, check: { prompt: "Annual retention as a fraction", answer: 0.613, tolerance: { abs: 0.002 } } },
            { md: md`**Expected tenure:** $T = 1/(1 - 0.96)$.` },
            { md: md`$T = 25$ months.`, hidden: true, check: { prompt: "Expected tenure (months)", answer: 25, unit: "months", tolerance: { abs: 0.1 } } },
            { md: md`**Recruits needed per year:** $H = 12 \times 6 \times 0.04$.` },
            { md: md`$H = 2.88$, call it 3 recruits a year.`, hidden: true, check: { prompt: "Recruits per year", answer: 2.88, tolerance: { abs: 0.01 } } },
          ],
          result: md`One more seat with slightly better retention needs roughly the same number of recruits a year (about 3) as five seats at 0.95. Retention gains pay for growth.`,
        },
        {
          kind: "question",
          question: {
            id: "sh08-l01-p1",
            type: "numeric",
            prompt: md`Illustrative: a hackathon volunteer pool (contributors, not leads) has monthly retention of 0.85. What share of a starting pool is still active after 6 months? Give a percentage to one decimal.`,
            answer: 37.7,
            tolerance: { abs: 0.2 },
            unit: "%",
            explanation: md`$0.85^6 = 0.377$, so 37.7%. Event-day helpers churn fast, which is fine if the role is designed for it (per-event commitment, easy re-entry) and a problem if you rely on them for continuous work.`,
            concepts: ["sh08.volunteer-retention"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Designing what each lead gets",
      blocks: [
        {
          kind: "md",
          md: md`### Interview for motives, then design the role around them

When you recruit a lead, spend part of the conversation on why they want it. Ask them to rank the six VFI functions, or simply ask: "A year from now, what would make this worth it for you?" Write the answer down; it becomes the yardstick for the quarterly check-in.

### What Suhail can honestly offer

| Return | How to deliver it | Cost to Suhail |
|---|---|---|
| **Ownership** | A charter with decision rights and a budget line (Lesson 2) | Your willingness to let go |
| **Skill growth** | Real problems: a sponsor negotiation, a conference programme, a production stack on Vercel and Supabase | Tolerance for mistakes |
| **Credit** | Named on the site and in the newsletter, bylines, stage time at events | Near zero |
| **Network** | Introductions to the investors, employers and builders Suhail connects | Your time and reputation |
| **References** | A written reference letter and a LinkedIn recommendation on request | 30 minutes each |
| **First consideration** | Written policy that existing leads are considered first for paid roles (Lesson 5) | A real commitment you must keep |
| **Expenses** | Reimbursed in full within two weeks | Cash, small |

What you must **not** offer: vague equity ("you'll get something when we raise"), guaranteed jobs, or a salary date. fc09 covers why informal equity promises poison trust; Lesson 5 covers what to do instead.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How volunteer motivation is usually destroyed",
          md: md`- **Founder as editor of everything.** Re-writing every newsletter issue removes autonomy and competence at once.
- **Invisible work.** Credit goes to the founder on stage and on LinkedIn; leads stop.
- **Scope creep.** A 5-hour role quietly becomes 12 hours; the lead burns out or vanishes (Lesson 3).
- **Token stipends.** USD 50 a month reframes the role as a bad job.
- **Mission talk instead of returns.** "We are building the Arab builder ecosystem" serves the values function only; career and understanding motives need concrete deliverables.
- **No exit door.** Without a lower rung, a busy lead's only option is to disappear.`,
        },
        {
          kind: "checklist",
          title: "Before a lead starts",
          items: [
            "Their top two motives are written down and the role serves both",
            "Hours per week and term (for example 6 months) are stated and agreed",
            "They know the lower rungs exist and how to step down without leaving",
            "They know what Suhail will and will not give, including on pay and equity",
            "Expenses policy is written and the first reimbursement path is tested",
            "A quarterly check-in date is in both calendars",
          ],
        },
        { kind: "sources", refs: ["sh08-r1", "sh08-r2", "sh08-r3", "sh08-r4", "sh08-r5", "sh08-r6"] },
        { kind: "xref", to: "fc09-l02", note: "Founder Core covers volunteer agreements (role, time, confidentiality, IP) and the legal side of contractors and volunteers; this lesson adds the motivational design." },
        { kind: "xref", to: "fc05-l03", note: "Community health metrics (share of questions answered by members rather than volunteers) tell you whether the volunteer layer is growing a community or substituting for one." },
        {
          kind: "question",
          question: {
            id: "sh08-l01-p2",
            type: "short",
            prompt: md`Write the **volunteer value proposition and commitment ladder** for Suhail's five lead roles (Partnerships, Events and Programming, Editorial, Head of Engineering, Finance Lead) for the January 2027 start. For each role give: the outcome it owns, hours per week and term, the two VFI functions it serves best and how, and what Suhail gives in return. Then define the ladder rungs below lead, and state in one paragraph what Suhail does not promise (pay, equity, jobs). Do not invent names or traction; label numbers illustrative.`,
            rubric: [
              "All five roles are covered, each with an owned outcome (not a task list), hours per week and a term",
              "Each role is matched to specific VFI functions with a concrete way the role serves them",
              "Returns are concrete and deliverable (credit, references, introductions, skills, expenses), not mission slogans",
              "A commitment ladder with at least two lower rungs and a way to step down without leaving",
              "An explicit statement of what is not promised (salary dates, equity, jobs) and no token stipends",
              "No invented names, members, sponsors or numbers; illustrative figures are labelled",
            ],
            modelAnswer: md`**Suhail lead roles, from January 2027 (illustrative hours).**

| Role | Owns | Hours/week, term | Best-served motives | What Suhail gives |
|---|---|---|---|---|
| Partnerships | Sponsor and partner pipeline to the revenue target in the quarterly plan | 6, six months | Career, understanding | Runs real negotiations with sponsors; introductions to the investors and employers Suhail works with; named as partnerships lead in every sponsor deck |
| Events and Programming | Hackathon and meetup programme, run sheets, speaker line-up | 6 (more in event weeks, agreed in advance), six months | Social, enhancement | Stage time as host; credit on every event page; the people they meet are their network |
| Editorial | The newsletter and podcast editorial calendar and quality bar | 5, six months | Enhancement, understanding | Byline; editorial independence inside the style guide; a portfolio of published issues |
| Head of Engineering | suhail.build, its Vercel, Supabase and Resend stack, and tooling | 5, six months | Understanding, career | Architecture decisions are theirs; open-source credit; public write-ups of what they built |
| Finance Lead | Budget, bookkeeping, sponsor invoicing, expense reimbursements | 3, six months | Values, career | Builds a full finance function from zero; reference letter covering it |

**Ladder.** Contributor: 2 to 4 hours a week, one project or one quarter, owns tasks under a lead. Event helper: event days only, per event, credited on the event page. Alumni: no hours, stays in the community channel, invited back first. Any lead can step down to contributor at a quarterly check-in or, if life intervenes, at two weeks' notice, with a handover.

**What we do not promise.** Suhail is unpaid until it has revenue. We do not promise a salary or a date for one, we do not offer equity or "something later", and we do not pay token stipends. We reimburse agreed expenses in full within two weeks. When paid roles open, current leads are considered first against criteria published in advance (Lesson 5).`,
            explanation: md`A good answer makes each role worth choosing for a specific kind of person and is honest about money. The test is whether a candidate reading it could decide, in one sitting, whether the trade suits them.`,
            concepts: ["sh08.volunteer-value-proposition", "sh08.volunteer-functions", "sh08.commitment-ladder", "sh08.crowding-out"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a sponsor who offers to fund a USD 100 per month stipend for each Suhail lead why you might decline, and what you would ask them to fund instead.",
          keyPoints: [
            "Small payments can crowd out intrinsic and social motivation and reframe the role as a badly paid job",
            "Paying some leads and not others creates a two-tier team",
            "Expense reimbursement does not crowd out motivation; covering real costs is welcome",
            "Better uses: travel to events, tooling, a professional development budget, or saving toward a properly paid first role",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh08-l01-q1",
      type: "mcq",
      prompt: "A candidate for Head of Engineering says: \"I want to lead a real production system so I can move into a staff role next year.\" Which VFI functions dominate?",
      options: ["Values and protective", "Career and understanding", "Social and enhancement", "Protective and social"],
      answer: 1,
      explanation: md`Wanting experience that advances a career is the **career** function; wanting to learn by doing real work is **understanding**. The role must give architecture ownership and visible output, or the match fails.`,
      concepts: ["sh08.volunteer-functions"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh08-l01-q2",
      type: "numeric",
      prompt: md`Monthly lead retention is 0.93. What share of a starting team is still active after 12 months? (percent, one decimal)`,
      answer: 41.9,
      tolerance: { abs: 0.2 },
      unit: "%",
      explanation: md`$0.93^{12} = 0.419$, so 41.9%. A 7% monthly loss sounds small and removes most of the team in a year.`,
      concepts: ["sh08.volunteer-retention"],
      difficulty: 1,
    },
    {
      id: "sh08-l01-q3",
      type: "numeric",
      prompt: md`At monthly retention $r = 0.92$, what is the expected tenure of a lead, in months?`,
      answer: 12.5,
      tolerance: { abs: 0.05 },
      unit: "months",
      explanation: md`$T = 1/(1 - r) = 1/0.08 = 12.5$ months (mean of a geometric distribution of months stayed).`,
      concepts: ["sh08.volunteer-retention"],
      difficulty: 1,
    },
    {
      id: "sh08-l01-q4",
      type: "multi",
      prompt: "Which of these support the three self-determination needs (autonomy, competence, relatedness) for a volunteer lead? (Select all that apply.)",
      options: [
        "A charter that lets the lead decide how to run their workstream within a budget",
        "A public leaderboard ranking leads by hours logged",
        "Specific written recognition of what a lead achieved, shared with the team",
        "The founder re-editing every piece of work before release",
        "A weekly review where the team sees each other's progress",
      ],
      answer: [0, 2, 4],
      explanation: md`Charters give autonomy, specific recognition signals competence, and a shared review builds relatedness. Hours leaderboards are controlling rewards that can crowd out motivation, and blanket re-editing removes autonomy and competence.`,
      concepts: ["sh08.self-determination", "sh08.crowding-out"],
      difficulty: 2,
    },
    {
      id: "sh08-l01-q5",
      type: "decision",
      prompt: md`Your Editorial lead's day job has become intense. They tell you they can give 2 hours a week for the next three months instead of 5. What do you do?`,
      options: [
        { text: "Thank them, move them to the contributor rung for the quarter with a smaller scope, and recruit or promote someone to cover the editorial lead seat.", score: 1, feedback: "Right: the ladder keeps them in the team and keeps the commitment honest. Revisit at the next quarterly check-in." },
        { text: "Ask them to keep the lead title and do what they can.", score: 0.3, feedback: "The seat is now under-resourced and the miss will be blamed on them. Titles should match hours." },
        { text: "Tell them it is lead or nothing.", score: 0, feedback: "You lose a trained person who would have stayed at a lower rung." },
        { text: "Offer a small stipend to keep them at 5 hours.", score: 0.1, feedback: "A token payment will not beat a day job and risks crowding out the motivation that brought them in." },
      ],
      explanation: md`A commitment ladder exists for exactly this moment. Matching title to hours protects both the person and the work.`,
      concepts: ["sh08.commitment-ladder", "sh08.crowding-out"],
      difficulty: 2,
    },
    {
      id: "sh08-l01-q6",
      type: "order",
      prompt: "Order the commitment ladder from most to least involvement.",
      items: ["Core lead", "Contributor", "Occasional helper", "Alumni"],
      explanation: md`Core leads own outcomes; contributors own tasks; helpers show up per event; alumni stay connected without hours.`,
      concepts: ["sh08.commitment-ladder"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh08-l01-f1", front: "The six volunteer functions (VFI)", back: "Values, understanding, social, career, protective, enhancement (Clary et al., 1998).", concepts: ["sh08.volunteer-functions"] },
    { id: "sh08-l01-f2", front: "Three self-determination needs", back: "Autonomy, competence, relatedness.", concepts: ["sh08.self-determination"] },
    { id: "sh08-l01-f3", front: "Motivation crowding in one line", back: "A small external reward can replace an intrinsic reason with a market one, so effort falls below the unpaid level.", concepts: ["sh08.crowding-out"] },
    { id: "sh08-l01-f4", front: "Expected tenure at monthly retention r", back: md`$T = 1/(1 - r)$ months; $r = 0.95$ gives 20 months.`, concepts: ["sh08.volunteer-retention"] },
    { id: "sh08-l01-f5", front: "Recruits per year to hold L seats", back: md`$H = 12L(1 - r)$; 5 seats at 0.95 need 3 a year.`, concepts: ["sh08.volunteer-retention"] },
    { id: "sh08-l01-f6", front: "Why a commitment ladder?", back: "It gives a busy volunteer a third option besides carrying on badly or quitting: step down a rung and stay.", concepts: ["sh08.commitment-ladder"] },
  ],
};

export default lesson;
