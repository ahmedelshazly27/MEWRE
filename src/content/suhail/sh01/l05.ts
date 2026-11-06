import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh01-l05",
  title: "Measuring community health: active members, contribution, cohorts, repeat rate and NPS",
  summary:
    "A small set of definitions and metrics that tell you whether Suhail is healthy: an action-based definition of active, stickiness, contribution rate, cohort retention curves, growth accounting with the quick ratio, event repeat rate read with first-timer counts, and outcome metrics for sponsors. NPS is covered with its maths and its caveats: the standard error at community sample sizes, response bias and why behaviour beats surveys.",
  minutes: 80,
  objectives: [
    "You can write an action-based definition of an active member and a contributor and keep it fixed",
    "You can compute stickiness, contribution rate, event repeat rate and the quick ratio from raw counts",
    "You can read cohort retention curves and tell whether a community has found a core",
    "You can compute an NPS with its confidence interval and explain when a change is noise",
    "You can design a health dashboard that drives decisions, not vanity",
  ],
  concepts: [
    { id: "sh01.active-member", name: "Active member", description: "A member who took a defined action (attended, posted, replied, opened and clicked, joined a call) within a fixed window; the base of every other metric. List size and follower counts are not activity.", competency: "sh-community" },
    { id: "sh01.contribution-rate", name: "Contribution rate", description: "Share of active members who contributed in the period (shared a project, answered a question, mentored, spoke, organised); shows whether the community runs on members or on staff.", competency: "sh-community", related: ["sh01.active-member", "sh01.contribution-ladder"] },
    { id: "sh01.cohort-retention", name: "Cohort retention", description: "Following groups of members who joined in the same period and measuring the share still active after t periods; a curve that flattens above zero shows a core that stays.", competency: "sh-community", related: ["fc02.retention-cohort", "sh01.retention-lever"] },
    { id: "sh01.event-repeat-rate", name: "Event repeat rate", description: "Share of checked-in attendees who attended a previous event; read together with first-timer counts to tell habit from closure.", competency: "sh-community", related: ["sh01.rituals"] },
    { id: "sh01.nps-caveats", name: "NPS and its caveats", description: "Net Promoter Score is promoters minus detractors on a 0 to 10 likelihood-to-recommend question; at community sample sizes its 95 % interval is often 15 to 20 points, it is biased by who responds and by cultural response styles, and behaviour is a better signal.", competency: "sh-community" },
  ],
  sections: [
    {
      layer: "theory",
      title: "Definitions first, then a few metrics that drive decisions",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Sponsors, partners and your own leads will each want a number. If you have not defined "active" and "contributor" before launch, each will get a different number, the totals will drift upward with every report, and nobody will trust any of them. A short, honest dashboard is also how a volunteer team decides where to spend its limited hours: on onboarding, on rituals, or on reach.`,
        },
        {
          kind: "md",
          md: md`### Define active before you count it

An **active member** is someone who took a defined action within a fixed window. For Suhail, a reasonable starting definition (to be fixed in writing):

> Active in a month = checked in at an event, **or** posted or replied in the community space, **or** clicked a link in at least one newsletter, **or** submitted a project.

Rules for the definition:

- **Actions, not states.** Being on the list, following an account or having a profile is not activity.
- **Check-ins, not registrations.** Free events have high no-show rates; count who came.
- **Fixed window and fixed definition.** Changing the definition to make a month look better destroys the series. If you must change it, report both for three months.
- **Opens are weak.** Email clients pre-load images, so open rates overstate reading. Clicks and replies are stronger.

### The core metrics

| Metric | Formula | Tells you | Watch for |
|---|---|---|---|
| **Monthly active (MAU)** | Count by definition | Scale of the real community | Definition drift |
| **Stickiness** | WAU/MAU | How habitual participation is | Weekly is the right unit for builders |
| **Contribution rate** | Contributors / active | Whether members carry the community | Low and falling means staff dependence |
| **Cohort retention** | Active in cohort at $t$ / cohort size | Whether newcomers stay | Curve keeps falling to zero |
| **Quick ratio** | (new + resurrected) / churned | Quality of growth | High intake hiding high churn |
| **Event repeat rate** | Returning check-ins / check-ins | Whether events build a habit | Very high with flat totals: closing in |
| **Outcomes** | Hires, intros, projects, grants traced to Suhail | Whether the value loop closes | Counting claims instead of confirmed outcomes |`,
        },
        { kind: "equation", formula: "sh01-stickiness" },
        { kind: "equation", formula: "sh01-contribution-rate" },
        { kind: "equation", formula: "sh01-cohort-retention" },
        {
          kind: "chart",
          chart: "line",
          title: "Cohort retention: two monthly cohorts (illustrative)",
          xKey: "month",
          xLabel: "months since joining",
          yLabel: "% of cohort active",
          series: [
            { key: "before", label: "Cohort before onboarding changes" },
            { key: "after", label: "Cohort after first-week welcome and buddy" },
          ],
          data: [
            { month: 0, before: 100, after: 100 },
            { month: 1, before: 52, after: 63 },
            { month: 2, before: 41, after: 52 },
            { month: 3, before: 36, after: 47 },
            { month: 4, before: 33, after: 44 },
            { month: 5, before: 31, after: 42 },
            { month: 6, before: 30, after: 41 },
          ],
          caption: "Illustrative numbers, not Suhail data. Both curves flatten, which means a core stays. Most of the gap opens in month one: the first week decides retention, so that is where to work.",
        },
        {
          kind: "md",
          md: md`### Growth accounting: what is inside the total

A rising MAU can hide a community that loses most of its members every month and refills from paid reach. Decompose it:`,
        },
        { kind: "equation", formula: "sh01-growth-accounting" },
        {
          kind: "chart",
          chart: "stacked-bar",
          title: "Monthly active members by source (illustrative)",
          xKey: "month",
          xLabel: "month since launch",
          yLabel: "active members",
          series: [
            { key: "retained", label: "Retained from last month" },
            { key: "new", label: "New" },
            { key: "resurrected", label: "Resurrected" },
          ],
          data: [
            { month: "M1", retained: 0, new: 300, resurrected: 0 },
            { month: "M2", retained: 228, new: 300, resurrected: 10 },
            { month: "M3", retained: 409, new: 300, resurrected: 20 },
            { month: "M4", retained: 554, new: 300, resurrected: 25 },
            { month: "M5", retained: 668, new: 300, resurrected: 30 },
            { month: "M6", retained: 758, new: 300, resurrected: 35 },
          ],
          caption: "Illustrative: 300 new a month and 76 % month-on-month retention. As the retained block grows, constant intake matters less and retention matters more.",
        },
        {
          kind: "md",
          md: md`### Events: repeat rate and first-timers`,
        },
        { kind: "equation", formula: "sh01-repeat-rate" },
        {
          kind: "md",
          md: md`Read it with the number of first-timers. A low repeat rate means events are one-offs that do not build habit. A very high repeat rate with flat attendance means the same people come every time and the community is closing in on itself, which newcomers feel immediately. A healthy pattern is a growing absolute number of both.

### NPS: useful, noisy and biased

The Net Promoter Score (Reichheld, 2003) asks "How likely are you to recommend Suhail to a friend or colleague?" on 0 to 10. Promoters answer 9 or 10, detractors 0 to 6:`,
        },
        { kind: "equation", formula: "sh01-nps" },
        {
          kind: "md",
          md: md`Each answer is effectively scored +1, 0 or -1. The variance of that score is $P + D - (P-D)^2$, so:`,
        },
        { kind: "equation", formula: "sh01-nps-se" },
        {
          kind: "md",
          md: md`**Caveats you must state whenever you report it:**

1. **Sample size.** With a few dozen to a hundred responses, the 95 % interval is typically $\pm 15$ to $20$ points. A move from 35 to 45 is usually noise.
2. **Non-response bias.** The people who answer post-event surveys are disproportionately the happiest and the angriest. The quiet middle, who simply do not come back, are missing.
3. **Information loss.** Scores of 7 and 8 count as zero; a 6 counts the same as a 0.
4. **Response styles differ across cultures and languages.** Scale use varies between populations, so do not compare Suhail's score with a European community's or a SaaS benchmark. Compare Suhail with itself, in the same language, over time.
5. **Weak evidence for prediction.** Keiningham and colleagues (2007) found no evidence that NPS predicts growth better than other satisfaction measures.

Use NPS as a trend with its interval, always next to the open question "What is the one thing we should change?", and trust **behaviour** (repeat attendance, contribution, referrals) more than any survey.`,
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Goodhart's law in communities",
          md: md`When a measure becomes a target it stops being a good measure. If leads are judged on MAU, they will count opens; if on posts, they will run low-effort prompts. Review metrics together and keep outcome metrics (confirmed hires, projects shipped, sponsor renewals) in the same view.`,
        },
        { kind: "xref", to: "fc02.retention-cohort", note: "Cohort analysis in product analytics generally; the same tables apply to community cohorts." },
      ],
    },
    {
      layer: "applied",
      title: "A monthly health review with real arithmetic",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "One month's dashboard (illustrative)",
          given: md`Illustrative month, not Suhail data. Active members by definition: 1,200. Average weekly active: 420. Members who contributed: 96. Monthly hackathon: 85 checked in, of whom 26 attended a previous Suhail event. Post-event survey: 80 responses, 40 promoters, 25 passives, 15 detractors.`,
          steps: [
            { md: md`**Stickiness:** $S = 420/1{,}200 = 0.35$. On average a monthly active member is active in about a third of weeks.` },
            { md: md`**Contribution rate:** $c_r = 96/1{,}200 = 8\,\%$.` },
            { md: md`**Repeat rate:** $26/85 = 30.6\,\%$; first-timers $85 - 26 = 59$.` },
            { md: md`**NPS:** $P = 40/80 = 0.50$, $D = 15/80 = 0.1875$, $\text{NPS} = 100 \times (0.50 - 0.1875) = 31.25$.` },
            { md: md`**Standard error:** $\sqrt{(0.50 + 0.1875 - 0.3125^2)/80} = \sqrt{0.5898/80} = \sqrt{0.007373} = 0.0859$, so 8.6 points. **95 % interval:** $31 \pm 1.96 \times 8.6 = 31 \pm 17$, from about 14 to 48.` },
          ],
          result: md`Report: "NPS 31 (95 % interval roughly 14 to 48, n = 80)". Last month's 38 is not evidence of decline. The stronger signals this month are behavioural: 59 first-timers and a 31 % repeat rate suggest events are both attracting and retaining.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Growth accounting (illustrative)",
          given: md`Illustrative: last month 1,000 active members. This month: 760 of them were active again, 300 new members were active for the first time, and 60 members who were inactive last month came back.`,
          steps: [
            { md: md`**Churned:** $X = 1{,}000 - 760 = 240$.` },
            { md: md`**This month's active:** $A_t = 1{,}000 - 240 + 300 + 60 = 1{,}120$.`, hidden: true, check: { prompt: "Active members this month", answer: 1120, tolerance: { abs: 0 } } },
            { md: md`**Quick ratio:** $Q = (300 + 60)/240 = 1.5$.`, hidden: true, check: { prompt: "Quick ratio", answer: 1.5, tolerance: { abs: 0.01 } } },
            { md: md`**Month-on-month retention:** $760/1{,}000 = 76\,\%$.`, hidden: true, check: { prompt: "Retention", answer: 76, unit: "%", tolerance: { abs: 0.1 } } },
          ],
          result: md`Growing 12 % a month while losing 24 % of last month's members. Three members gained for every two lost. Before spending on reach, find out why a quarter leave each month.`,
        },
        {
          kind: "question",
          question: {
            id: "sh01-l05-p1",
            type: "numeric",
            prompt: md`A survey of 50 members gives 30 % promoters and 20 % detractors. What is the 95 % interval half-width of the NPS, in points? (One decimal.)`,
            answer: 19.4,
            tolerance: { abs: 0.3 },
            unit: "points",
            explanation: md`$\text{NPS} = 100 \times (0.30 - 0.20) = 10$. $\text{SE} = 100\sqrt{(0.30 + 0.20 - 0.10^2)/50} = 100\sqrt{0.0098} = 9.90$. Half-width $1.96 \times 9.90 = 19.4$ points: the true score could plausibly be anywhere from about -9 to +29.`,
            concepts: ["sh01.nps-caveats"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Instrumenting and reviewing community health",
      blocks: [
        {
          kind: "md",
          md: md`### Where the data comes from

Suhail's stack (from the venture context): the site on Vercel with its own **Supabase** database, and **Resend** for email. Typical sources:

| Signal | Source | Note |
|---|---|---|
| Members, profiles, tiers, consent flags | Supabase | One member id across all sources |
| Newsletter clicks, replies | Resend events (webhooks) into Supabase | Treat opens as weak |
| Event registrations and check-ins | Event platform export or own check-in, into Supabase | Count check-ins |
| Community posts and replies | Chat platform export or bot | Respect platform terms and member privacy |
| Outcomes (hires, intros, projects) | Short confirmation form to member and sponsor | Count only confirmed outcomes |
| Survey (NPS plus open question) | Form after each event | Report with n and interval |

The Head of Engineering owns the pipeline and the definitions table; you own the monthly review.

### The monthly review

One page, the same every month: the core metrics with last three months, one cohort chart, events table (check-ins, first-timers, repeat rate), confirmed outcomes, NPS with interval and three verbatim comments, and **one decision** for next month.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Reporting registrations and list size to sponsors",
          md: md`Free events commonly see a large share of registrants not show up. Reporting registrations as attendance, or list size as community, inflates numbers once; after that, sponsors discount everything you say. Report check-ins, active members by a stated definition, and confirmed outcomes.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Treating a 7-point NPS change as news",
          md: md`At community sample sizes the interval is wider than most month-to-month changes. Do not celebrate or panic on NPS alone; look for agreement with repeat rate, contribution and churn.`,
        },
        {
          kind: "checklist",
          title: "Health dashboard checklist",
          items: [
            "Written definitions of active, contributor, returning attendee and confirmed outcome",
            "One member id across Supabase, email, events and community space",
            "Core metrics with three-month history",
            "Cohort chart updated monthly",
            "Growth accounting with quick ratio",
            "Events table with check-ins, first-timers and repeat rate",
            "NPS with n and 95 % interval, plus the open question",
            "One decision recorded per review",
          ],
        },
        { kind: "xref", to: "fc09.input-output-metrics", note: "Input versus output metrics in a weekly operating review; community inputs (welcomes sent, build nights held) drive outputs (retention, outcomes)." },
        {
          kind: "question",
          question: {
            id: "sh01-l05-p2",
            type: "short",
            prompt: md`Design Suhail's **community health dashboard** for 2027: 6 to 8 metrics, each with a precise definition, data source in Suhail's stack, review cadence, an illustrative target with the reasoning behind it, and the decision it drives. Include your NPS reporting rule and one guard against Goodhart's law.`,
            rubric: [
              "Defines active and contributor as actions within a fixed window, using check-ins not registrations",
              "Includes retention by cohort and growth accounting or quick ratio, not only totals",
              "Maps each metric to a real data source (Supabase, Resend, event check-ins, confirmation forms)",
              "Targets are labelled illustrative with reasoning, and each metric names the decision it drives",
              "NPS rule includes sample size and confidence interval and pairs it with behaviour",
              "Includes a concrete guard against gaming (fixed definitions, outcome metrics in the same view, metrics reviewed together)",
            ],
            modelAnswer: md`**Definitions (fixed for 2027).** Active in a month: event check-in, a post or reply in the community space, a newsletter click, or a project submission. Contributor: shared a project, answered a question, mentored, spoke or organised.

| Metric | Definition | Source | Cadence | Target (illustrative) | Decision |
|---|---|---|---|---|---|
| MAU | Active members by definition | Supabase (joins of all sources) | Monthly | Follow the funnel curve, not a fixed number | Reach vs retention spend |
| Month-1 cohort retention | Share of a month's joiners active the next month | Supabase cohorts | Monthly | Over 55 %, since month one is the steepest drop | Onboarding changes |
| Quick ratio | (new + resurrected) / churned | Supabase | Monthly | Above 1.5 in year one | Whether to fix churn before reach |
| Contribution rate | Contributors / active | Supabase plus community export | Monthly | 8 to 10 %, consistent with participation inequality | Ladder asks, recognition |
| Stickiness | WAU/MAU | Supabase | Monthly | Rising trend | Build-night cadence |
| Event repeat rate and first-timers | Returning check-ins / check-ins; count of first-timers | Check-in export | Per event | Both rising in absolute terms | Recruiting vs retention for events |
| Confirmed outcomes | Hires, intros, grants confirmed by both sides | Confirmation form | Quarterly | At least one per sponsor per season | Sponsor renewals, editorial stories |
| NPS | 9-10 minus 0-6 | Post-event form | Per event | Trend only | Combined with open comments |

**NPS rule:** always reported as "NPS x (95 % interval a to b, n = N)" with three verbatim comments; never acted on alone.

**Goodhart guard:** definitions locked in a table in Supabase; changes reported with both series for three months; leads reviewed on the whole page, including confirmed outcomes, never on MAU alone.`,
            explanation: md`A dashboard is good if every metric is defined, sourced and tied to a decision.`,
            concepts: ["sh01.active-member", "sh01.contribution-rate", "sh01.cohort-retention", "sh01.event-repeat-rate", "sh01.nps-caveats"],
            difficulty: 2,
          },
        },
        { kind: "sources", refs: ["sh01-r20", "sh01-r21", "sh01-r32"] },
        {
          kind: "feynman",
          prompt: "Explain to a sponsor why Suhail reports an NPS with an interval, and why you trust repeat attendance more.",
          keyPoints: [
            "NPS is promoters minus detractors",
            "At tens of responses the 95 % interval is roughly 15 to 20 points",
            "Who answers is biased toward the very happy and very unhappy",
            "Cultural response styles make cross-community comparisons unsafe",
            "Behaviour (coming back, contributing, referring) is a direct signal",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh01-l05-q1",
      type: "mcq",
      prompt: md`Which is the best definition of an active member for Suhail?`,
      options: [
        "Anyone on the newsletter list",
        "Anyone who registered for an event this year",
        "Anyone who checked in at an event, posted or replied, clicked a newsletter link or submitted a project in the last month",
        "Anyone who follows Suhail on social media",
      ],
      answer: 2,
      explanation: md`Actions within a fixed window, with check-ins rather than registrations and clicks rather than opens.`,
      concepts: ["sh01.active-member"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh01-l05-q2",
      type: "numeric",
      prompt: md`120 attendees checked in; 42 had attended a previous Suhail event. What is the repeat rate, in %?`,
      answer: 35,
      tolerance: { abs: 0.1 },
      unit: "%",
      explanation: md`$42/120 = 35\,\%$, with 78 first-timers.`,
      concepts: ["sh01.event-repeat-rate"],
      difficulty: 1,
    },
    {
      id: "sh01-l05-q3",
      type: "numeric",
      prompt: md`200 responses: 90 promoters, 70 passives, 40 detractors. What is the NPS?`,
      answer: 25,
      tolerance: { abs: 0.1 },
      unit: "points",
      explanation: md`$P = 0.45$, $D = 0.20$, $\text{NPS} = 100 \times 0.25 = 25$. SE $= 100\sqrt{(0.65 - 0.0625)/200} = 5.4$, so the 95 % interval is about 14 to 36.`,
      concepts: ["sh01.nps-caveats"],
      difficulty: 1,
    },
    {
      id: "sh01-l05-q4",
      type: "numeric",
      prompt: md`Last month 800 active. This month 560 of them were active again, 250 new and 40 resurrected. What is the quick ratio? (Two decimals.)`,
      answer: 1.21,
      tolerance: { abs: 0.01 },
      explanation: md`Churned $= 800 - 560 = 240$; $Q = (250 + 40)/240 = 1.21$. Active this month $= 850$.`,
      concepts: ["sh01.cohort-retention"],
      difficulty: 2,
    },
    {
      id: "sh01-l05-q5",
      type: "mcq",
      prompt: md`Two cohorts' retention curves both flatten at around 30 % and 40 % after month four. What does that tell you?`,
      options: [
        "The community is failing",
        "A core of members stays; the gap between cohorts mostly opened early, so onboarding is the lever",
        "The NPS must be falling",
        "Reach should be cut",
      ],
      answer: 1,
      explanation: md`Flattening above zero shows a stable core. Differences that open in month one point at the first-week experience.`,
      concepts: ["sh01.cohort-retention"],
      difficulty: 2,
    },
    {
      id: "sh01-l05-q6",
      type: "multi",
      prompt: md`Which are valid caveats when reporting an NPS from a post-event survey? Select all that apply.`,
      options: [
        "The 95 % interval can be 15 to 20 points at a few dozen responses",
        "Respondents over-represent the very happy and very unhappy",
        "Scores of 7 and 8 count as zero",
        "NPS is proven to predict growth better than other satisfaction measures",
        "Response styles differ across cultures, so cross-community benchmarks mislead",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`Keiningham et al. (2007) found no evidence that NPS predicts growth better than other measures; the other four caveats hold.`,
      concepts: ["sh01.nps-caveats"],
      difficulty: 2,
    },
    {
      id: "sh01-l05-q7",
      type: "decision",
      prompt: md`Your Editorial lead proposes switching the active-member definition from "clicked" to "opened" a newsletter because it "reflects reach better". MAU would roughly double. What do you decide?`,
      options: [
        { text: "Switch and report the new MAU to sponsors.", score: 0, feedback: "Opens are inflated by image pre-loading, and a silent definition change destroys the series and your credibility." },
        { text: "Keep clicks as the active definition; report newsletter reach (opens) as a separate audience metric, labelled.", score: 1, feedback: "Right: different questions, different metrics, no definition drift." },
        { text: "Switch, but report both for three months.", score: 0.5, feedback: "Better than a silent change, but the underlying metric is weaker. Keep reach and activity separate." },
      ],
      explanation: md`Fixed, action-based definitions protect the series. Reach is an audience metric, not activity.`,
      concepts: ["sh01.active-member"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "sh01-l05-f1", front: "Active member (Suhail definition)", back: "In the month: event check-in, post or reply, newsletter click, or project submission. Fixed in writing.", concepts: ["sh01.active-member"] },
    { id: "sh01-l05-f2", front: "Stickiness for a builder community", back: "WAU/MAU, because builder participation is a weekly habit, not daily.", concepts: ["sh01.active-member"] },
    { id: "sh01-l05-f3", front: "Quick ratio", back: md`$(\text{new} + \text{resurrected})/\text{churned}$; above 1 grows.`, concepts: ["sh01.cohort-retention"] },
    { id: "sh01-l05-f4", front: "How to read event repeat rate", back: "With first-timer counts: low means one-offs; very high with flat totals means closing in.", concepts: ["sh01.event-repeat-rate"] },
    { id: "sh01-l05-f5", front: "NPS standard error", back: md`$100\sqrt{(P + D - (P-D)^2)/n}$; 95 % interval about $\pm 1.96$ SE.`, concepts: ["sh01.nps-caveats"] },
    { id: "sh01-l05-f6", front: "Goodhart's law", back: "When a measure becomes a target it stops being a good measure. Review metrics together, with outcomes.", concepts: ["sh01.active-member"] },
  ],
};

export default lesson;
