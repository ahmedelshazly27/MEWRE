import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh02-l05",
  title: "Judging, demos and after: calibration, winners, sponsor reports and follow-up",
  summary:
    "The last four hours of a hackathon decide what everyone remembers, and the next four weeks decide whether anyone comes back. This lesson schedules judging with arithmetic, calibrates judges and normalises their scores, runs a fair announcement, writes a sponsor report built on agreed numbers, and turns attendees into community members with a follow-up sequence and a steady-state community model.",
  minutes: 75,
  objectives: [
    "Schedule judging for any number of teams with parallel panels and a finalist round",
    "Calibrate judges before scoring and normalise scores across panels with z-scores",
    "Run winner announcements and feedback that teams and sponsors accept as fair",
    "Write a sponsor report around agreed outcome metrics",
    "Design a follow-up sequence and use the steady-state community model to see which lever matters",
  ],
  concepts: [
    { id: "sh02.judging-schedule", name: "Judging schedule", description: "Total judging time is teams times minutes per team (demo, questions, changeover) divided by parallel panels; large events use a first round in parallel rooms or an expo, then finalists on stage.", competency: "sh-events", related: ["sh02.score-normalisation"] },
    { id: "sh02.score-normalisation", name: "Judge calibration and score normalisation", description: "Judges differ in harshness and spread. A calibration round on shared sample projects aligns them; z-score normalisation per judge or panel removes remaining differences before ranking, provided teams were assigned to panels at random.", competency: "sh-events", related: ["sh02.judging-schedule"] },
    { id: "sh02.sponsor-report", name: "Sponsor report", description: "A post-event report to each sponsor with the outcome metrics agreed in advance (activations, projects using the product, candidates, reach), the evidence, quotes and photos, and a renewal proposal.", competency: "sh-events", related: ["sh02.follow-up-sequence"] },
    { id: "sh02.follow-up-sequence", name: "Follow-up sequence", description: "Timed actions after the event (thank-you and photos, project gallery, survey, newsletter and podcast features, sponsor report, invitation to the next event) that convert attendees into retained community members.", competency: "sh-events", related: ["sh02.community-steady-state", "sh02.sponsor-report"] },
    { id: "sh02.community-steady-state", name: "Community steady state", description: "With monthly new-member inflow R c, retention r and referral rate f, active members tend toward R c / (1 - r - f); retention and referrals move the steady state far more than reach alone.", competency: "sh-community", related: ["sh02.follow-up-sequence"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Fair judging and the conversion that follows",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Teams will forgive a lot, but not a result they believe was unfair. Sponsors will renew only if they get the numbers they were promised. And Suhail is a community company: an event that does not turn attendees into members who return, read the newsletter and bring friends is a cost, not an asset. This lesson is where hackathons become a flywheel instead of a series of parties.`,
        },
        {
          kind: "md",
          md: md`### Scheduling judging

Total judging time for one panel:`,
        },
        { kind: "equation", formula: "sh02-judging-time" },
        {
          kind: "md",
          md: md`With 30 teams, a 3-minute demo, 2 minutes of questions and 1 minute of changeover, one panel needs $30 \times 6 = 180$ minutes. Nobody, judges included, is at their best after 24 hours and three hours of demos. The standard solutions:

- **Parallel first round:** split teams at random across 3 panels in 3 rooms: $180/3 = 60$ minutes. Each panel nominates its top teams; 5 or 6 finalists demo on stage to all judges and the room.
- **Expo (science-fair) round:** for 50 or more teams, teams stay at their tables and judges walk between them on assigned routes, each team seen by at least two judges. Faster, noisier, and harder to calibrate.
- **Sponsor tracks** are judged in parallel by sponsor judges, from the submissions plus a short visit to each eligible team.

Rules for demos: a hard time limit with a visible timer; **live product, not slides** (one slide for the problem is fine); a shared demo laptop and a tested HDMI or USB-C adapter for teams that need it; a backup recorded video if the live demo fails.

### Calibration before scoring

Judges differ. Some give 2s and 5s, some give everything a 4. Two steps reduce the damage:

1. **Briefing and calibration (15 minutes before round 1):** walk through the rubric and its anchors (Lesson 2); score one or two sample projects together (the best are anonymised projects from a previous event, or a mock demo by a volunteer team); discuss differences until judges agree on what a 3 and a 5 look like.
2. **Conflict of interest:** judges declare any relationship with a team (employer, investor, relative, former colleague) and do not score that team.

### Normalising scores

After calibration, panels still differ in harshness ($\mu$) and spread ($\sigma$). If teams were assigned to panels at random, so that each panel saw a similar mix of quality, normalise each score within its panel:`,
        },
        { kind: "equation", formula: "sh02-z-score" },
        {
          kind: "md",
          md: md`and, if you want a familiar scale back, map it to the overall mean and spread: $S'_{ij} = \bar\mu + z_{ij}\,\bar\sigma$. Rank on $z$ (or $S'$), not on raw scores.

Two cautions. With 8 to 10 teams per panel, $\mu$ and $\sigma$ are noisy, so use normalisation to **nominate finalists**, then let the finalist round (all judges see all finalists) decide the winners. And if assignment was not random (for example, all Arabic NLP teams in one room), normalisation would wrongly penalise a room that happened to get strong teams.

### Announcing winners

- **Order:** thank everyone and show every team's project name on screen; sponsor track prizes first; then category prizes; then the overall winner. Keep it under 30 minutes.
- **Prepared, checked list:** names spelled correctly (Arabic and English), team members' names, prize amounts. Double-check the eligibility rules (one main prize plus at most one sponsor prize).
- **Feedback for all:** each team gets its rubric scores and one or two written comments from judges within a week. This is the cheapest retention tool you have.
- **Payment:** state in the rules how and when prizes are paid (for example bank transfer within 30 days after identity and bank details are received). Cross-border transfers in the region can be slow; tell winners so.

### Sponsor reports

The sponsor report is the renewal conversation in written form. Use the metrics agreed before the event (Lesson 1):

| Section | Content |
|---|---|
| Summary | What the sponsor got, in three numbers |
| Audience | Accepted, checked in, profile mix (roles, experience, cities, gender), all as aggregates |
| Product use | Teams using the product, teams for which it was load-bearing, sign-ups, activations at 30 days (from the sponsor's data) |
| Hiring | Builders who opted in to share profiles, introductions made, interviews (to be updated at 90 days) |
| Content | Posts, newsletter and podcast mentions, photo and video reach |
| Quotes and projects | Two or three projects that used the product well, with team consent |
| Feedback | What builders said about the product (documentation, onboarding, limits): sponsors value this highly |
| Next | A renewal proposal for the next event or a series |

### From attendee to member

The follow-up sequence converts the energy of the event into retained members. A simple model of the community:`,
        },
        { kind: "equation", formula: "sh02-community-steady-state" },
        {
          kind: "md",
          md: md`$R$ is the number of new people reached per month, $c$ the share who become members, $r$ the monthly retention of existing members and $f$ the new members each member brings per month through referral. The model needs $r + f < 1$. Its message: with $R c = 100$ new members a month, $r = 0.80$ and $f = 0.05$, $M^* = 100/0.15 \approx 667$; raising retention to 0.85 gives $M^* = 100/0.10 = 1{,}000$. **Five points of retention add as much as 50 % more reach.** Follow-up is a retention lever.`,
        },
        { kind: "widget", widget: "community-funnel", caption: "Set monthly reach, conversion, retention and referrals. Compare raising reach by 50 % with raising retention by five points: which grows active members more, and how fast?" },
      ],
    },
    {
      layer: "applied",
      title: "Scheduling and normalising judging for 30 teams",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Three panels, two harshness levels, one fair ranking",
          given: md`Illustrative event: 30 teams, demos 3 min, questions 2 min, changeover 1 min. Teams assigned to 3 panels at random. Rubric scores 1 to 5. After round 1: panel A has mean 3.0 and standard deviation 0.6; panel B has mean 3.8 and standard deviation 0.5. Team X (panel A) scored 4.0; team Y (panel B) scored 4.4. Overall mean 3.4, overall standard deviation 0.6.`,
          steps: [
            { md: md`**Schedule:** one panel would need $T = 30 \times (3+2+1) = 180$ min. Three panels in parallel: $180/3 =$ **60 min**. Then 5 finalists on stage: $5 \times 6 = 30$ min. Judging fits in 90 minutes plus a 15-minute calibration.` },
            { md: md`**Team X:** $z = (4.0 - 3.0)/0.6 = 1.67$. **Team Y:** $z = (4.4 - 3.8)/0.5 = 1.20$.` },
            { md: md`**Back on a common scale:** $S'_X = 3.4 + 1.67 \times 0.6 = 4.40$; $S'_Y = 3.4 + 1.20 \times 0.6 = 4.12$.` },
            { md: md`**Reading:** on raw scores Y (4.4) beats X (4.0); after normalisation X is clearly stronger relative to its panel. X goes to the finalist round; whether Y also does depends on the other normalised scores. The final ranking is decided by all judges seeing all finalists.` },
          ],
          result: md`60 minutes of parallel judging plus a 30-minute final, and a finalist list that does not depend on which room a team happened to be sent to.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: a 48-team flagship",
          given: md`48 teams, 4-minute demos, 3 minutes of questions, 1 minute changeover. You have 4 panels for round 1 and want 6 finalists on stage with the same timing.`,
          steps: [
            { md: md`Round 1 time per panel: $T = (48/4) \times (4+3+1)$.` },
            { md: md`$= 12 \times 8 =$ **96 min**.`, hidden: true, check: { prompt: "Round 1 time per panel (min)", answer: 96, tolerance: { abs: 0.5 }, unit: "min" } },
            { md: md`Finalist round: $6 \times 8$.` },
            { md: md`$=$ **48 min**; total about 2 h 24 min plus calibration and deliberation. Consider a 3-minute demo or 6 panels.`, hidden: true, check: { prompt: "Finalist round time (min)", answer: 48, tolerance: { abs: 0.5 }, unit: "min" } },
          ],
          result: md`About two and a half hours of judging. If that is too long for an event that started 24 hours earlier, shorten the questions or add panels; do not cut the calibration.`,
        },
        {
          kind: "question",
          question: {
            id: "sh02-l05-p1",
            type: "numeric",
            prompt: md`A community gains $R c = 60$ new members a month, monthly retention is 0.75 and referral rate is 0.05. What is the steady-state number of active members?`,
            answer: 300,
            tolerance: { abs: 1 },
            unit: "members",
            explanation: md`$M^* = R c/(1 - r - f) = 60/(1 - 0.75 - 0.05) = 60/0.20 = 300$. Raising retention to 0.80 would give $60/0.15 = 400$.`,
            concepts: ["sh02.community-steady-state"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "The follow-up sequence and the sponsor report",
      blocks: [
        {
          kind: "flow",
          title: "Follow-up sequence after a Suhail hackathon (illustrative timings)",
          steps: [
            { label: "Same night", detail: "Winners post, photos, thank-you to sponsors, judges, venue and volunteers" },
            { label: "Within 48 hours", detail: "Thank-you email to all participants with photos, the project gallery and the next event date" },
            { label: "Within 7 days", detail: "Rubric feedback to every team; 5-question survey; volunteers debrief" },
            { label: "Within 14 days", detail: "Newsletter issue on the event; winners on The Majlis; introductions to employers for opted-in builders" },
            { label: "Within 30 days", detail: "Sponsor reports with 30-day activation numbers and a renewal proposal" },
            { label: "At 60 and 90 days", detail: "Retention check (who is still active), hiring follow-up, invitation to contribute (mentor, volunteer, speaker)" },
          ],
          caption: "Each step has an owner (Events, Editorial, Partnerships) and a date in the run-of-show for the event's after-phase.",
        },
        {
          kind: "md",
          md: md`### How it is done

- **Who:** Events owns judging logistics and the participant follow-up; Editorial owns the newsletter and The Majlis features; Partnerships owns sponsor reports and renewals; Finance pays prizes.
- **Tools:** a scoring sheet (one row per judge per team, rubric columns, automatic z-scores per panel); a project gallery (Devpost, or a page on suhail.build); an email tool for the follow-up (the site uses Resend); Discord for the community after the event.
- **Make returning easy:** the next event date, a contributor path (become a mentor, a volunteer, a judge, a newsletter writer) and a reason to stay in the Discord (job posts, office hours, project showcases).

### What goes wrong

- **Judges arrive late and skip calibration.** Then you get raw-score chaos. Make calibration part of the judge invitation, with the time.
- **The sponsor wants to change the result.** See the scenario below.
- **Prizes paid months late.** Winners tell everyone. Pay on the schedule you published.
- **Silence after the event.** The 48-hour email is the one that most attendees read; miss it and the event fades.
- **Sponsor report without the sponsor's numbers.** If activation data was not agreed in the contract, you will be reporting sign-ups and impressions.`,
        },
        { kind: "scenario", scenario: "sh02-s2" },
        {
          kind: "question",
          question: {
            id: "sh02-l05-p2",
            type: "short",
            prompt: md`**Write the sponsor report outline and the participant follow-up plan for an illustrative Suhail hackathon** sponsored by an AI API provider (imagined). Include: (1) the three headline numbers you will report and where each comes from; (2) the report sections; (3) how you handle builder data and consent; (4) the participant follow-up sequence with timings and owners; (5) one retention target for 60 days, and how the steady-state model justifies prioritising it.`,
            rubric: [
              "Headline numbers are outcome metrics agreed in advance (for example 30-day activations from the sponsor's data, load-bearing projects, opted-in candidates), with sources",
              "Report sections cover audience in aggregate, product use, hiring, content, projects with consent, builder feedback and a renewal proposal",
              "Builder data is shared only in aggregate or with explicit opt-in; no CV dump",
              "Follow-up sequence has concrete timings and owners from the same night to 60 or 90 days, including team feedback and a contributor path",
              "Retention target is numeric and justified with the steady-state formula, showing that retention moves members more than reach; all numbers labelled illustrative",
            ],
            modelAnswer: md`**1. Headline numbers (illustrative):** (a) builders still calling the API 30 days after the event, from the sponsor's own dashboard as agreed in the sponsorship contract; (b) teams for which the API was load-bearing, from the track judging sheet; (c) builders who opted in to share profiles with the sponsor, from the registration form.

**2. Sections:** summary; audience (accepted, checked in, roles, experience, cities, gender, in aggregate); product use (teams using the API, load-bearing teams, sign-ups, 30-day activations); hiring (opt-ins, introductions, interviews to be updated at 90 days); content (newsletter, podcast, social reach); three showcase projects with team consent; builder feedback on documentation and onboarding; renewal proposal for a three-event series.

**3. Data:** the sponsor receives only aggregates by default. Profiles go only for builders who ticked the separate opt-in, and only name, role, links and the project. No phone numbers. Data handling stated at registration.

**4. Follow-up:** same night winners post (Editorial); 48 hours thank-you email with photos, gallery and next date (Events); 7 days rubric feedback to every team and survey (Events); 14 days newsletter issue and a Majlis episode with the winners (Editorial); 30 days sponsor report (Partnerships); 60 days retention check and an invitation to mentor or volunteer (Events); 90 days hiring follow-up (Partnerships).

**5. Retention target:** 50 % of attendees still active at 60 days (opened two newsletters, posted in Discord or registered for the next event). Justification: with $M^* = R c/(1 - r - f)$, at an illustrative $R c = 100$ per month and $f = 0.05$, moving monthly retention from 0.80 to 0.85 raises $M^*$ from about 667 to 1,000, the same as 50 % more reach, and follow-up is far cheaper than reach.`,
            explanation: md`Graded against the rubric. The sponsor should be able to forward your report to its own manager unchanged; a builder should never be surprised by what was shared.`,
            concepts: ["sh02.sponsor-report", "sh02.follow-up-sequence", "sh02.community-steady-state"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a first-time judge why you normalise scores across panels and why the final ranking is still decided in a finalist round.",
          keyPoints: [
            "Judges and panels differ in harshness (mean) and spread (standard deviation)",
            "A calibration round on sample projects aligns judges before scoring",
            "With random assignment, z-scores per panel make teams in different rooms comparable",
            "Panels see few teams, so their statistics are noisy; normalisation is used to nominate finalists",
            "All judges see all finalists, which removes the room effect for the decisions that matter most",
          ],
        },
        { kind: "xref", to: "fc05.community-of-practice", note: "Founder Core on building communities of practice around a product; Suhail applies the same logic with the community itself as the product." },
        { kind: "sources", refs: ["sh02-r1", "sh02-r5", "sh02-r6"] },
      ],
    },
  ],
  quiz: [
    {
      id: "sh02-l05-q1",
      type: "numeric",
      prompt: md`36 teams, 3-minute demos, 2 minutes of questions, 1 minute changeover, 3 parallel panels. How long does round 1 take? (min)`,
      answer: 72,
      tolerance: { abs: 0.5 },
      unit: "min",
      explanation: md`$T = (36/3) \times 6 = 72$ min.`,
      concepts: ["sh02.judging-schedule"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh02-l05-q2",
      type: "numeric",
      prompt: md`A judge's scores have mean 3.2 and standard deviation 0.8. She gives a team 4.4. What is the team's z-score?`,
      answer: 1.5,
      tolerance: { abs: 0.01 },
      explanation: md`$z = (4.4 - 3.2)/0.8 = 1.5$.`,
      concepts: ["sh02.score-normalisation"],
      difficulty: 1,
    },
    {
      id: "sh02-l05-q3",
      type: "mcq",
      prompt: "When is z-score normalisation across panels misleading?",
      options: [
        "When panels have different numbers of judges",
        "When teams were not assigned to panels at random, so one panel got systematically stronger teams",
        "When scores are on a 1 to 5 scale",
        "When there are more than three panels",
      ],
      answer: 1,
      explanation: md`Normalisation assumes each panel saw a similar quality mix. A strong room would be penalised for its strength.`,
      concepts: ["sh02.score-normalisation"],
      difficulty: 2,
    },
    {
      id: "sh02-l05-q4",
      type: "numeric",
      prompt: md`$R c = 120$ new members per month, retention 0.85, referral 0.03. Steady-state active members?`,
      answer: 1000,
      tolerance: { abs: 1 },
      unit: "members",
      explanation: md`$M^* = 120/(1 - 0.85 - 0.03) = 120/0.12 = 1{,}000$.`,
      concepts: ["sh02.community-steady-state"],
      difficulty: 2,
    },
    {
      id: "sh02-l05-q5",
      type: "multi",
      prompt: "What belongs in a sponsor report? (Select all that apply.)",
      options: [
        "Outcome metrics agreed before the event",
        "Every participant's phone number",
        "Builder feedback on the sponsor's product",
        "Projects that used the product well, with team consent",
        "A renewal proposal",
      ],
      answer: [0, 2, 3, 4],
      explanation: md`Personal data goes only in aggregate or with opt-in. Product feedback and consented showcases are among the most valuable parts.`,
      concepts: ["sh02.sponsor-report"],
      difficulty: 1,
    },
    {
      id: "sh02-l05-q6",
      type: "order",
      prompt: "Order the follow-up sequence.",
      items: ["Winners post and thank-you to sponsors", "Email to all participants with photos and gallery", "Rubric feedback to every team and survey", "Newsletter and podcast features", "Sponsor reports with 30-day numbers", "60-day retention check and contributor invitation"],
      explanation: md`Fast gratitude first, then feedback, then content, then the numbers that need time to mature.`,
      concepts: ["sh02.follow-up-sequence"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh02-l05-f1", front: "Judging time per panel", back: "$T = n (t_d + t_q + t_c) / p$; 30 teams x 6 min / 3 panels = 60 min.", concepts: ["sh02.judging-schedule"] },
    { id: "sh02-l05-f2", front: "Judge calibration", back: "Rubric walkthrough, score 1 or 2 sample projects together, discuss differences, declare conflicts of interest.", concepts: ["sh02.score-normalisation"] },
    { id: "sh02-l05-f3", front: "Z-score normalisation", back: "$z = (s - \\mu)/\\sigma$ per judge or panel; valid only with random assignment; use it to nominate finalists.", concepts: ["sh02.score-normalisation"] },
    { id: "sh02-l05-f4", front: "Community steady state", back: "$M^* = R c / (1 - r - f)$; five points of retention can be worth 50 % more reach.", concepts: ["sh02.community-steady-state"] },
    { id: "sh02-l05-f5", front: "The most-read follow-up", back: "The 48-hour thank-you email with photos, the project gallery and the next event date.", concepts: ["sh02.follow-up-sequence"] },
    { id: "sh02-l05-f6", front: "Sponsor report headline numbers", back: "Agreed outcome metrics: 30-day activations (sponsor's data), load-bearing projects, opted-in candidates.", concepts: ["sh02.sponsor-report"] },
  ],
  scenarios: [
    {
      id: "sh02-s2",
      title: "The sponsor wants a different winner",
      context: md`Illustrative Suhail hackathon. The sponsor of the AI API track (the largest sponsor) sees the judges' result for its track and the overall prize. Its regional lead takes you aside 20 minutes before the announcement: "The overall winner did not use our API at all. Team K did, beautifully. Can we make Team K the overall winner? We are planning to renew for three events."`,
      start: "a",
      concepts: ["sh02.score-normalisation", "sh02.sponsor-report", "sh02.sponsor-track"],
      nodes: {
        a: {
          md: md`What do you say?`,
          choices: [
            { text: "\"The overall prize is decided by the panel against the published rubric, and I cannot change it. Team K can win your track prize, and I will make sure your team presents it on stage and that Team K features in the newsletter and in your report.\"", score: 10, feedback: "Holds the rule that protects every team's trust, and gives the sponsor what it actually wants: visibility for great use of its product.", next: "b" },
            { text: "\"Let me ask the judges to reconsider.\"", score: 3, feedback: "Opens the door to the sponsor deciding winners. Judges will know why you asked, and so, eventually, will the teams.", next: "c" },
            { text: "Agree: renewal for three events is worth more than one result.", score: 0, feedback: "If this ever comes out (it usually does), no serious builder enters a Suhail hackathon again, and other sponsors lose the reason to pay.", next: "c" },
          ],
        },
        b: {
          md: md`The lead is unhappy: "Then I need to think about the renewal."`,
          choices: [
            { text: "Acknowledge it, and propose a fix for next time in writing: a larger track prize, a track-specific stage slot, and clearer track criteria agreed in the contract. Send the sponsor report on schedule.", score: 10, feedback: "You converted pressure into a better package. Sponsors who stay on these terms are the ones you want." },
            { text: "Offer a discount on the renewal to make up for it.", score: 4, feedback: "Discounting for refusing to rig a result teaches the sponsor that pressure pays." },
          ],
        },
        c: {
          md: md`Two judges object strongly. One says she will not judge for Suhail again if the result changes.`,
          choices: [
            { text: "Reverse course: keep the panel's result, apologise to the judges, and tell the sponsor clearly that results are not negotiable, offering the track-prize visibility instead.", score: 6, feedback: "Recovers the integrity of the result at the cost of some credibility with judges and the sponsor. Write the rule into every sponsor contract from now on." },
          ],
        },
      },
    },
  ],
};

export default lesson;
