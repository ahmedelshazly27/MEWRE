import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh05-l05",
  title: "Funnel and growth: from content to community",
  summary:
    "Media is only worth Suhail's volunteer hours if it turns readers and listeners into members who show up, build and bring others. This lesson models that conversion with the community funnel (reach, conversion, retention, referral, contributors) and its steady state, shows why retention and referral beat reach once the loop is near closing, assigns a job to each social channel used in the region, designs referral loops that do not attract junk sign-ups, and sets up attribution so you know which content produced members.",
  minutes: 75,
  objectives: [
    "You can model active members with the community funnel and compute the steady state and its sensitivity to each lever",
    "You can explain why improving retention or referral can beat a larger reach budget",
    "You can assign a role and a metric to each social channel Suhail uses in the region",
    "You can design a referral loop with a measured viral coefficient and safeguards against fake sign-ups",
    "You can set up attribution from content to membership with UTMs and self-reported source",
  ],
  concepts: [
    { id: "sh05.content-to-community", name: "Content-to-community funnel", description: "The path from reach (people who see Suhail content) to member (signed up), to active member, to contributor (speaks, builds, organises). Media's job is measured at each conversion, not at reach.", competency: "sh-media", related: ["fc05.community-of-practice"] },
    { id: "sh05.funnel-steady-state", name: "Funnel steady state", description: "With monthly retention r and referral k, active members follow $A_t = (r+k)A_{t-1} + Rc$ and settle at $A^* = Rc/(1-r-k)$ if $r+k<1$. Near $r+k=1$, small retention or referral gains move the steady state far more than reach.", competency: "sh-media", related: ["sh05.list-dynamics"] },
    { id: "sh05.viral-coefficient", name: "Viral coefficient (referral rate)", description: "New members brought per active member per month: invitations per member times invitation conversion. Below 1 (as nearly always) referral amplifies reach rather than replacing it.", competency: "sh-media", related: ["sh05.funnel-steady-state"] },
    { id: "sh05.channel-roles", name: "Channel roles", description: "Each social channel gets one job (discovery, credibility, conversation, broadcast to members) and one metric, rather than posting the same thing everywhere.", competency: "sh-media", related: ["sh05.clips"] },
    { id: "sh05.content-attribution", name: "Content attribution", description: "Linking members back to the content that brought them, with UTM-tagged links, referral codes and a self-reported 'how did you hear about us' field, compared rather than trusted singly.", competency: "sh-media", related: ["fc05.attribution"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "The community funnel and its steady state",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Sponsors and partners will ask Suhail for members, not impressions; employers want builders who show up and ship. The newsletter and The Majlis are the top of that funnel. With volunteer hours as the scarce resource, you need to know which lever (more reach, better conversion, better retention, referral) buys the most active members, and the funnel maths answers that before you spend a quarter guessing.`,
        },
        {
          kind: "md",
          md: md`### The model

Let $R$ be people reached per month (unique newsletter readers who are not yet members, podcast listeners, social viewers, event audiences), $c$ the share of them who become members, $r$ the monthly retention of active members, and $k$ new members each active member brings per month through referrals. Then:`,
        },
        { kind: "equation", formula: "sh05-community-funnel" },
        { kind: "equation", formula: "sh05-funnel-steady-state" },
        { kind: "equation", formula: "sh05-viral-coefficient" },
        {
          kind: "md",
          md: md`**Why retention and referral dominate near the top.** The steady state has $1 - r - k$ in the denominator. With $r = 0.85$ and $k = 0.05$ the denominator is 0.10; raising retention to 0.90 halves it to 0.05 and **doubles** $A^*$. Doubling reach also doubles $A^*$, but reach costs content hours and ad money every month, while retention comes from the quality of what members experience (useful issues, events that deliver, a responsive community). The sensitivity:

$$\frac{\partial A^*}{\partial r} = \frac{Rc}{(1-r-k)^2} \qquad \frac{\partial A^*}{\partial (Rc)} = \frac{1}{1-r-k}$$

**Contributors** (members who speak, mentor, build or organise) are a share $s$ of active members. They are the community's supply side: speakers, hackathon mentors, future volunteer leads. Track them separately; a large audience with no contributors is a newsletter, not a community.

Try the levers in the model: start with reach 20,000, conversion 1.5%, retention 0.85, referral 0.05, contributor share 5%.`,
        },
        { kind: "widget", widget: "community-funnel", caption: "Change one lever at a time and compare the steady state with the month-12 value. Watch what happens as retention plus referral approaches 1." },
        {
          kind: "chart",
          chart: "line",
          title: "Active members: base case vs +50% reach vs +5 points retention (illustrative)",
          xKey: "month",
          xLabel: "Month",
          yLabel: "Active members",
          series: [
            { key: "base", label: "Base: Rc = 300, r = 0.85, k = 0.05" },
            { key: "reach", label: "Reach +50%: Rc = 450" },
            { key: "ret", label: "Retention 0.90" },
          ],
          data: [
            { month: 1, base: 300, reach: 450, ret: 300 },
            { month: 3, base: 813, reach: 1220, ret: 856 },
            { month: 6, base: 1406, reach: 2109, ret: 1589 },
            { month: 9, base: 1838, reach: 2757, ret: 2219 },
            { month: 12, base: 2153, reach: 3229, ret: 2758 },
            { month: 18, base: 2550, reach: 3825, ret: 3617 },
            { month: 24, base: 2761, reach: 4141, ret: 4248 },
          ],
          caption: "More reach wins early; better retention overtakes it by month 24 and has a higher ceiling (6,000 vs 4,500). Illustrative parameters, not Suhail data.",
        },
        {
          kind: "md",
          md: md`### Content's job at each stage

| Stage | Content that moves people | Metric |
|---|---|---|
| Reach to member | Clips, builder stories shared by the people featured, event recaps, useful opportunity lists | Sign-ups by source; conversion of newsletter readers to members |
| Member to active | Fortnightly issue with something actionable, event invitations, a first "build night" | Share of new members active in month 2 |
| Active to contributor | Calls for speakers and mentors, featuring members' work, The Majlis inviting members as guests | Contributor share; first-time contributors per month |
| Contributor to referrer | Shareable features of their own work, referral codes, credit for bringing teammates | Referral rate $k$ |

Featuring members is the strongest loop: a builder featured in the newsletter or on The Majlis shares it with their own network, which is the most relevant reach Suhail can get.

### Social channels in the region

Give each channel one job:

| Channel | Job for Suhail | Metric |
|---|---|---|
| LinkedIn | Credibility with employers, sponsors, universities and professional builders | Follower fit, inbound partner messages |
| X | Real-time AI and tech conversation, especially in the Gulf | Replies and reposts from builders |
| Instagram, TikTok, YouTube Shorts | Discovery through clips, younger builders and students | Profile visits to sign-ups |
| YouTube | Full Majlis episodes, talks from Suhail Season | Watch time, subscribers |
| WhatsApp (channels and community groups) | Broadcast to members, event logistics; the default messaging layer across the region | Joins, event confirmations |
| Discord or Telegram | Builder chat during and between hackathons | Weekly active members, questions answered by members |

Post natively for each (vertical clips for short video, text and documents for LinkedIn), not the same asset everywhere.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Platform popularity differs by country and changes fast",
          md: md`Which platforms dominate differs across the region (for example Snapchat and X are often described as unusually strong in Saudi Arabia, and Facebook as still large in Egypt), but this brief has no verified 2026 platform-share data. Before committing volunteer hours to a channel, check current country-level data from a recent source (for example DataReportal's country reports) and, better, ask the first few hundred members where they actually spend time.`,
        },
        { kind: "xref", to: "fc05-l03", note: "Community of practice (domain, community, practice) and developer marketing: the general model behind Suhail's member-to-contributor stage." },
      ],
    },
    {
      layer: "applied",
      title: "Which lever buys the most members?",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Base case and three options for the next quarter",
          given: md`Illustrative launch assumptions. Reach $R = 20{,}000$ people per month, conversion $c = 1.5\%$ so $Rc = 300$ new members a month from content. Retention $r = 0.85$, referral $k = 0.05$, contributor share $s = 5\%$, start from zero.`,
          steps: [
            { md: md`**Steady state:** $A^* = 300/(1 - 0.85 - 0.05) = 300/0.10 = 3{,}000$ active members; contributors $0.05 \times 3{,}000 = 150$.` },
            { md: md`**Month 12:** with $A_0 = 0$, $A_t = A^*(1 - (r+k)^t) = 3{,}000(1 - 0.9^{12}) = 3{,}000 \times 0.718 = 2{,}153$.` },
            { md: md`**Option 1, reach +50%** (more clips and a paid push): $Rc = 450$, $A^* = 4{,}500$.` },
            { md: md`**Option 2, retention to 0.90** (a monthly build night and a better onboarding issue): $A^* = 300/0.05 = 6{,}000$.` },
            { md: md`**Option 3, referral to 0.08** (a referral loop: 0.4 invitations per member per month at 20% conversion): $A^* = 300/(1 - 0.85 - 0.08) = 300/0.07 = 4{,}286$.` },
            { md: md`**Sensitivity at the base case:** $\partial A^*/\partial r = 300/0.10^2 = 30{,}000$ members per unit of retention, so each retention point (0.01) is worth about 300 steady-state members, equal to the whole monthly content inflow.` },
          ],
          result: md`Retention has the highest ceiling (6,000) and costs no recurring reach; reach is faster in the first months. Plan: fix onboarding and the monthly build night first, then add a referral loop, then buy reach. Re-estimate $c$, $r$ and $k$ from real cohorts after the first quarter: these are assumptions.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A smaller reach with a strong referral loop",
          given: md`Illustrative. $R = 12{,}000$, $c = 2\%$, $r = 0.82$, invitations per member per month 0.5 with 20% conversion.`,
          steps: [
            { md: md`$Rc = 12{,}000 \times 0.02 = 240$; $k = 0.5 \times 0.2$.` },
            { md: md`$k = 0.10$.`, hidden: true, check: { prompt: "Referral rate k", answer: 0.1, tolerance: { abs: 0.001 } } },
            { md: md`$A^* = 240/(1 - 0.82 - 0.10)$.` },
            { md: md`$A^* = 240/0.08 = 3{,}000$.`, hidden: true, check: { prompt: "Steady-state active members", answer: 3000, tolerance: { abs: 1 } } },
          ],
          result: md`A 40% smaller reach reaches the same steady state as the base case because referral carries more of the load. Verify $k$ on real data: referral numbers are easy to overestimate.`,
        },
        {
          kind: "question",
          question: {
            id: "sh05-l05-p1",
            type: "numeric",
            prompt: md`Illustrative. $Rc = 300$, $r = 0.88$, $k = 0.04$. Starting from zero, how many active members after 12 months? (round to the nearest member)`,
            answer: 2371,
            tolerance: { abs: 3 },
            unit: "members",
            explanation: md`$A^* = 300/(1 - 0.92) = 3{,}750$. From zero, $A_{12} = A^*(1 - 0.92^{12}) = 3{,}750 \times (1 - 0.3677) = 3{,}750 \times 0.6323 = 2{,}371$. After a year the community is at 63% of its ceiling.`,
            concepts: ["sh05.funnel-steady-state"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running growth honestly",
      blocks: [
        {
          kind: "md",
          md: md`### Referral loops that work

- **Give the referrer something social, not cash:** credit in the newsletter, early access to Suhail Season tickets, a team slot at a capped hackathon. Cash rewards attract fake sign-ups.
- **Make referral natural:** "bring your teammate" on hackathon registration; "share your feature" links for builders featured in issues and episodes.
- **Count only confirmed members:** double opt-in and, for rewards, an activity threshold (attended an event, clicked an issue).
- **Measure $k$ by cohort:** referred members per active member per month, and compare the retention of referred members with others (often higher, because a friend brought them).

### Attribution from content to member

Tag every link with **UTM parameters** (source, medium, campaign: for example source=newsletter, medium=email, campaign=issue-12), give featured builders personal referral links, and ask "how did you hear about Suhail?" at sign-up and event registration. The three disagree; that is normal. Self-reported answers capture word of mouth and podcasts, which links miss.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`**Counting followers as members.** **Paid reach before retention works:** you pour people into a leaking bucket. **Cash referral rewards** that produce throwaway accounts. **Same post on every platform.** **Reporting the steady state from a model as if it were traction** in a sponsor deck. **No contributor metric,** so the community is an audience that never produces speakers, mentors or leads.`,
        },
        {
          kind: "checklist",
          title: "Monthly growth review (30 minutes)",
          items: [
            "New members by source (UTM, referral code, self-reported) and conversion of each source",
            "Month-2 activity of last month's cohort (retention estimate)",
            "Referral rate k by cohort and retention of referred vs other members",
            "Contributors this month, and first-time contributors",
            "One lever to change next month, with the expected effect from the funnel model",
          ],
        },
        {
          kind: "question",
          question: {
            id: "sh05-l05-p2",
            type: "short",
            prompt: md`**Produce it.** Write Suhail's **first-year growth model and plan**: funnel definitions (what counts as reach, member, active, contributor), launch assumptions for $R$, $c$, $r$, $k$, $s$ with the steady state and month-12 value, the lever you will work on first and why (with the sensitivity), a referral loop design with safeguards, channel roles with one metric each, and the attribution set-up. All numbers illustrative and labelled.`,
            rubric: [
              "Precise stage definitions, with 'active' and 'contributor' measurable",
              "Correct steady state Rc/(1 − r − k) and month-12 value from the assumptions",
              "Lever prioritised with a sensitivity argument (retention or referral vs reach), and a plan to re-estimate from cohorts",
              "Referral loop with non-cash rewards, confirmation and activity thresholds, and cohort measurement of k",
              "Channel roles with one metric each, and attribution combining UTMs, referral codes and self-report",
            ],
            modelAnswer: md`**Definitions.** Reach: unique people who saw Suhail content in the month (newsletter readers not yet members, podcast downloads deduplicated where possible, clip viewers). Member: confirmed sign-up on suhail.build. Active: attended an event, clicked an issue or posted in community chat in the month. Contributor: spoke, mentored, organised, or shipped a project at a Suhail event.

**Assumptions (illustrative).** $R = 20{,}000$, $c = 1.5\%$ ($Rc = 300$), $r = 0.85$, $k = 0.05$, $s = 5\%$. $A^* = 300/0.10 = 3{,}000$; $A_{12} = 3{,}000(1 - 0.9^{12}) \approx 2{,}150$; contributors at steady state about 150.

**First lever: retention.** $\partial A^*/\partial r = 300/0.01 = 30{,}000$ per unit, so one retention point is worth about 300 members, the whole monthly inflow. Actions: an onboarding issue for new members, a monthly build night, every member invited to one event within 30 days. Re-estimate $r$ from the first three cohorts.

**Referral loop.** "Bring your teammate" in hackathon registration; personal share links for featured builders; rewards are credit in the newsletter and early Suhail Season access; reward only after the referred member confirms and attends or clicks. Track $k$ per cohort and referred members' retention.

**Channels.** LinkedIn: credibility, inbound partner messages. X: builder conversation, replies from builders. Short video: discovery, profile visits to sign-ups. YouTube: full episodes, watch time. WhatsApp: member broadcast, event confirmations. Discord: hackathon chat, questions answered by members.

**Attribution.** UTMs on every link (source, medium, campaign), referral codes, and a self-reported source field at sign-up and registration, reviewed monthly side by side.`,
            explanation: md`The model is only useful if stages are measurable and the lever choice follows from the sensitivity of the steady state. Referral and attribution must be designed so the numbers stay honest.`,
            concepts: ["sh05.content-to-community", "sh05.funnel-steady-state", "sh05.viral-coefficient", "sh05.channel-roles", "sh05.content-attribution"],
            difficulty: 3,
          },
        },
        { kind: "sources", refs: ["sh05-r19"] },
        {
          kind: "feynman",
          prompt: "Explain to the Partnerships lead why you want to spend next quarter's volunteer hours on onboarding and a monthly build night rather than on more clips and a paid social push.",
          keyPoints: [
            "Active members settle where inflow equals loss: A* = Rc/(1 − r − k)",
            "With r + k near 1, a small retention gain moves the ceiling far more than extra reach",
            "Reach costs hours or money every month; retention compounds",
            "More reach into a leaking community mostly produces churned sign-ups",
            "Reach is the next lever once retention is fixed, and the plan will be re-checked against cohort data",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh05-l05-q1",
      type: "numeric",
      prompt: md`Illustrative. $Rc = 200$ new members a month, $r = 0.80$, $k = 0.05$. What is the steady-state number of active members?`,
      answer: 1333,
      tolerance: { abs: 2 },
      unit: "members",
      explanation: md`$A^* = 200/(1 - 0.85) = 200/0.15 = 1{,}333$.`,
      concepts: ["sh05.funnel-steady-state"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh05-l05-q2",
      type: "mcq",
      prompt: md`At $r = 0.85$, $k = 0.05$, which change raises the steady state most?`,
      options: [
        "Reach +30%",
        "Retention from 0.85 to 0.90",
        "Contributor share from 5% to 10%",
        "Conversion from 1.5% to 1.8%",
      ],
      answer: 1,
      explanation: md`Retention 0.90 halves $1 - r - k$ from 0.10 to 0.05, doubling $A^*$. Reach +30% or conversion +20% raise it by 30% and 20%. Contributor share does not change active members at all.`,
      concepts: ["sh05.funnel-steady-state"],
      difficulty: 2,
    },
    {
      id: "sh05-l05-q3",
      type: "numeric",
      prompt: md`Members send on average 0.3 invitations a month and 15% of invitations become members. What is the monthly referral rate $k$?`,
      answer: 0.045,
      tolerance: { abs: 0.001 },
      explanation: md`$k = i \times p_i = 0.3 \times 0.15 = 0.045$ new members per active member per month.`,
      concepts: ["sh05.viral-coefficient"],
      difficulty: 1,
    },
    {
      id: "sh05-l05-q4",
      type: "multi",
      prompt: md`Which are sound safeguards for a Suhail referral programme?`,
      options: [
        "Reward only confirmed members who attend an event or click an issue",
        "Pay USD 5 per referred sign-up",
        "Use social rewards: newsletter credit, early access, team slots",
        "Measure referral rate by cohort and compare referred members' retention",
        "Import referrers' contact lists to send invitations automatically",
      ],
      answer: [0, 2, 3],
      explanation: md`Cash per sign-up attracts fake accounts; importing contacts is a consent and deliverability disaster. Confirmation, activity thresholds, social rewards and cohort measurement keep the loop honest.`,
      concepts: ["sh05.viral-coefficient"],
      difficulty: 2,
    },
    {
      id: "sh05-l05-q5",
      type: "decision",
      prompt: md`A sponsor offers USD 3,000 of ad credit for a paid social push. Month-2 activity of new members is currently 55%. What do you do?`,
      options: [
        { text: "Run the push immediately", score: 0.4, feedback: "Reach is welcome, but with weak retention most new members will churn; the effect fades within months." },
        { text: "Accept, but schedule the push after fixing onboarding, and measure the pushed cohort's month-2 activity against others", score: 1, feedback: "Uses the free reach where it compounds and learns what paid members are worth." },
        { text: "Decline: paid reach is never worth it", score: 0.3, feedback: "Too absolute. Paid reach is a lever like any other once the funnel retains." },
      ],
      explanation: md`Order the levers: retention first, then referral, then reach. Measure each cohort so the next decision uses Suhail's own numbers.`,
      concepts: ["sh05.funnel-steady-state", "sh05.content-to-community"],
      difficulty: 2,
    },
    {
      id: "sh05-l05-q6",
      type: "mcq",
      prompt: md`Why does Suhail ask "how did you hear about us?" when UTMs already track links?`,
      options: [
        "Because UTMs are illegal in the EU",
        "Because word of mouth, podcasts and offline events rarely leave a link trail; self-report catches what links miss",
        "Because self-report is always accurate",
        "Because UTMs break RTL layout",
      ],
      answer: 1,
      explanation: md`Links capture clicked paths; self-report captures influence. Neither is complete, so compare them.`,
      concepts: ["sh05.content-attribution"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh05-l05-f1", front: "Community funnel recursion", back: md`$A_t = (r + k)A_{t-1} + Rc$`, concepts: ["sh05.funnel-steady-state"] },
    { id: "sh05-l05-f2", front: "Funnel steady state", back: md`$A^* = Rc/(1 - r - k)$, if $r + k < 1$.`, concepts: ["sh05.funnel-steady-state"] },
    { id: "sh05-l05-f3", front: "Viral coefficient (per month)", back: md`$k = i \times p_i$: invitations per member times invitation conversion.`, concepts: ["sh05.viral-coefficient"] },
    { id: "sh05-l05-f4", front: "Lever order for community growth", back: "Retention first, then referral, then reach: retention compounds and has the highest ceiling near r + k = 1.", concepts: ["sh05.funnel-steady-state"] },
    { id: "sh05-l05-f5", front: "Strongest content loop", back: "Feature members: they share their own feature with the most relevant network.", concepts: ["sh05.content-to-community"] },
    { id: "sh05-l05-f6", front: "Three attribution sources to compare", back: "UTM-tagged links, referral codes, self-reported 'how did you hear about us'.", concepts: ["sh05.content-attribution"] },
  ],
};

export default lesson;
