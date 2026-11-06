import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh01-l04",
  title: "Trust, quality and curation: filters, codes of conduct, moderation and dilution",
  summary:
    "Quality is the product of a builder community, and it decays by default as the community grows. This lesson covers application filters as a Bayes problem (why where you recruit beats how you screen), codes of conduct with a real enforcement ladder, moderation capacity as arithmetic, and the dilution problem with the newcomer ratio as an early-warning signal. It ends with handling an incident involving a sponsor.",
  minutes: 75,
  objectives: [
    "You can compute the precision of an application filter and choose between improving the filter and improving the pool",
    "You can write a code of conduct with scope, reporting, responders and a four-step enforcement ladder",
    "You can size volunteer moderation from activity, incident rate and handling time",
    "You can detect and counter dilution as the community grows",
    "You can handle an incident that involves a sponsor without losing either builders' trust or the partner",
  ],
  concepts: [
    { id: "sh01.application-filter", name: "Application filter", description: "A screen on who joins or attends (proof of work, a short question, a reference). Its precision depends on its sensitivity, false-positive rate and the base rate of strong applicants in the pool.", competency: "sh-community" },
    { id: "sh01.code-of-conduct", name: "Code of conduct and enforcement", description: "Written norms with scope, unacceptable behaviour, a reporting channel, named responders and a graded enforcement ladder (correction, warning, temporary ban, permanent ban). Credible only if enforced.", competency: "sh-community" },
    { id: "sh01.moderation-capacity", name: "Moderation capacity", description: "Moderator time needed scales with activity: active members times posts per member times share needing action times minutes per action, divided by minutes each volunteer gives.", competency: "sh-community", related: ["sh01.code-of-conduct"] },
    { id: "sh01.dilution", name: "Dilution", description: "Loss of quality and norms when newcomers arrive faster than established members can socialise them (the 'Eternal September' pattern); tracked with the newcomer ratio and incident rates.", competency: "sh-community", related: ["sh01.application-filter", "sh01.retention-lever"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Why quality decays and how filters, norms and moderation hold it",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Arab tech ecosystems are small and connected: one bad hackathon, one harassment incident handled badly, or one sponsor spamming members with recruiter messages travels through every WhatsApp group in Kuwait or Riyadh within a day. Suhail's promise to sponsors (good builders) and to builders (good peers, no pitches, safe events) is the same promise: quality. You will make the final call on who gets in, what happens when someone breaks the rules, and when growth is starting to cost more than it adds.`,
        },
        {
          kind: "md",
          md: md`### Quality decays by default

Three forces push a growing community toward lower quality:

1. **Adverse selection.** As a community becomes known, it attracts people who want what it has (access to sponsors and investors) more than people who will add to it.
2. **Dilution of norms.** Norms are taught person to person. When newcomers arrive faster than existing members can show them how things work, they learn from other newcomers. Usenet's "Eternal September" is the classic case: from September 1993 a continuous flow of new users arrived through a large online service, and the yearly cycle of absorbing a new student intake broke down.
3. **Departure of the best.** Strong builders have the most alternatives and leave first when quality drops, which lowers quality further.

The tools against them are filters (who gets in), norms and enforcement (how people behave) and structure (small groups and staged intake so norms can spread).

### Application filters are a Bayes problem

Suppose a share $\pi$ of applicants to a hackathon are a strong fit. A filter accepts a share $s$ of strong applicants (sensitivity) and a share $f$ of weak ones (false-positive rate). The share of accepted people who are strong is:`,
        },
        { kind: "equation", formula: "sh01-filter-precision" },
        {
          kind: "md",
          md: md`The formula says something that surprises most organisers: **when the pool is weak, the filter matters less than the pool**. With $\pi = 0.3$, even a decent filter ($s = 0.8$, $f = 0.2$) gives precision 63 %. Raising the base rate to 0.5, by recruiting where strong builders are (university labs, open-source contributors, referrals from alumni, sponsor engineering teams), lifts precision to 80 % with the same filter.

**What a good builder filter asks for:**

- **Proof of work**: a link to something built (code, model, dataset, product, paper). Strongest single signal and cheap to check.
- **One specific question**: "What would you build in 24 hours with this sponsor's API, and why?" Separates engaged applicants from form-fillers.
- **Team intent**: solo, team formed, or looking for a team. Helps you balance teams.
- **Not**: university prestige, employer brand or years of experience as hard filters. They exclude many strong self-taught and early-career builders, especially outside the richest cities, and mostly measure access.

### Codes of conduct that work

A code of conduct is only as good as its enforcement. The widely used **Contributor Covenant 2.1** gives a reusable structure: expected and unacceptable behaviour, scope (online spaces and in-person events, including sponsor staff), a reporting channel, a commitment to confidentiality and a four-step enforcement ladder.`,
        },
        {
          kind: "flow",
          title: "Enforcement ladder (Contributor Covenant 2.1 structure)",
          steps: [
            { label: "Correction", detail: "Inappropriate language or minor unwelcome behaviour. Private written note explaining the issue; possibly a public apology." },
            { label: "Warning", detail: "A violation or a pattern. Warning with consequences; no interaction with the people involved for a period." },
            { label: "Temporary ban", detail: "Serious violation or sustained inappropriate behaviour. Banned from all spaces and events for a set time." },
            { label: "Permanent ban", detail: "Pattern of violations, harassment, or aggression towards anyone. Removed from all community spaces for good." },
          ],
          caption: "Severe incidents (physical threats, sexual harassment) go straight to the top of the ladder and, where relevant, to venue security or the authorities. The ladder is for proportion, not a requirement to start at step one.",
        },
        {
          kind: "md",
          md: md`Three design rules for Suhail:

1. **Two named responders at every event and online**, of different genders where possible, with a conflict-of-interest rule (a responder never handles a case involving their own employer, a sponsor they manage, or a friend).
2. **Sponsors are in scope.** Sponsor staff sign the same code. Recruiting rules are explicit: no unsolicited direct messages to members, no collecting attendee contacts without consent, no pitching during technical sessions.
3. **Local law and culture.** Several Gulf states have strict laws on online speech, defamation and privacy. Write the code in English and Arabic, have it reviewed locally, and avoid public naming of individuals in enforcement communications.

### Moderation is arithmetic

Moderation load scales with activity, not with list size:`,
        },
        { kind: "equation", formula: "sh01-moderators" },
        {
          kind: "md",
          md: md`Volunteer moderators also go quiet during exams, Ramadan schedules, travel and summer. Plan cover of 1.5 to 2 times the computed $M$, and rotate so no one moderates every day.

### Dilution and the newcomer ratio

A simple signal of dilution risk is the number of newcomers per established contributor per month:`,
        },
        { kind: "equation", formula: "sh01-newcomer-ratio" },
        {
          kind: "md",
          md: md`There is no universal safe value. What matters is the trend and its relation to incidents and quality signals. Counter-measures when it rises:

- **Staged intake**: admit new members in monthly cohorts with a group welcome, rather than continuously.
- **Gates proportional to growth**: tighten the proof-of-work requirement as applications grow.
- **Small groups**: city and interest channels with their own organisers, so each newcomer meets a few established members.
- **Visible norms**: pinned examples of good posts, a welcome thread where leads model behaviour.
- **Hosts and buddies**: each new member is introduced by name to one contributor.

Kraut and Resnick's evidence-based review of online communities supports most of these: socialising newcomers explicitly, making norms visible and using graduated sanctions all improve retention and behaviour.`,
        },
        {
          kind: "matrix",
          title: "Openness vs curation",
          xAxis: ["Low curation effort", "High curation effort"],
          yAxis: ["Closed (invite or application)", "Open (anyone joins)"],
          cells: [
            { label: "Open and unmoderated", detail: "Fast growth, quality decays, best builders leave. Typical large public chat groups." },
            { label: "Open with strong moderation", detail: "Scales, but moderation cost grows with activity; needs volunteer depth. Newsletter and public events." },
            { label: "Closed and neglected", detail: "Friends list. Feels unfair in small ecosystems; stagnates." },
            { label: "Curated", detail: "Application with proof of work, staged intake, enforced code. Hackathons, alumni channel, core tier." },
          ],
          caption: "Suhail can use different quadrants for different tiers: open audience at the top right, curated hackathons and alumni at the bottom right.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Sizing filters and moderation",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "A hackathon application filter (illustrative)",
          given: md`Illustrative: a 90-seat hackathon receives 600 applications. You estimate 30 % are a strong fit. The current form (proof-of-work link plus one question) accepts 80 % of strong applicants and 20 % of weak ones.`,
          steps: [
            { md: md`**Strong accepted:** $600 \times 0.30 \times 0.80 = 144$.` },
            { md: md`**Weak accepted:** $600 \times 0.70 \times 0.20 = 84$.` },
            { md: md`**Precision:** $P = 144/(144 + 84) = 0.632$, or from the formula $0.8 \times 0.3 / (0.8 \times 0.3 + 0.2 \times 0.7) = 0.24/0.38 = 0.632$.` },
            { md: md`**Seats:** 228 pass for 90 seats, so you still rank or balance (teams, skills, first-timers, gender, cities). Ranking by proof-of-work quality pushes precision among the 90 above 63 %.` },
          ],
          result: md`About a third of those who pass the filter are a weak fit. Before redesigning the form, look at where applicants come from.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Better filter or better pool? (illustrative)",
          given: md`Same 600 applicants. Option 1: a stricter review that cuts the false-positive rate to $f = 0.10$ with $s = 0.80$ and $\pi = 0.30$. Option 2: keep the form ($s = 0.8$, $f = 0.2$) but recruit through alumni referrals, university labs and sponsor engineering teams so that $\pi = 0.50$.`,
          steps: [
            { md: md`**Option 1 precision:** $0.24/(0.24 + 0.10 \times 0.70) = 0.24/0.31 = 0.774$.`, hidden: true, check: { prompt: "Option 1 precision (fraction)", answer: 0.774, tolerance: { abs: 0.005 } } },
            { md: md`**Option 1 passing:** $144 + 42 = 186$.`, hidden: true, check: { prompt: "Option 1 applicants passing", answer: 186, tolerance: { abs: 1 } } },
            { md: md`**Option 2 precision:** $0.8 \times 0.5 / (0.4 + 0.2 \times 0.5) = 0.40/0.50 = 0.80$.`, hidden: true, check: { prompt: "Option 2 precision (fraction)", answer: 0.8, tolerance: { abs: 0.005 } } },
          ],
          result: md`Both improve precision; Option 2 does slightly better and also grows the strong pool for every future event (300 strong applicants instead of 180). A stricter review costs reviewer hours on every event; better recruiting compounds. Do both eventually, recruiting first.`,
        },
        {
          kind: "worked",
          mode: "worked",
          title: "Moderator headcount and newcomer ratio (illustrative)",
          given: md`Illustrative: 1,500 active members in Suhail's community space; 0.4 posts per active member per day; 2 % of posts need moderator action (spam, off-topic recruiting, a heated exchange); 6 minutes per action; each volunteer moderator gives 30 minutes a day. 300 newcomers a month; 137 established contributors.`,
          steps: [
            { md: md`**Daily posts:** $1{,}500 \times 0.4 = 600$. **Actions:** $600 \times 0.02 = 12$ per day.` },
            { md: md`**Minutes:** $12 \times 6 = 72$ min per day. **Moderators:** $\lceil 72/30 \rceil = \lceil 2.4 \rceil = 3$ on any given day.` },
            { md: md`**With cover (1.5 to 2 times):** 5 to 6 volunteer moderators on a rota.` },
            { md: md`**Newcomer ratio:** $\nu = 300/137 = 2.2$ newcomers per contributor per month. If each contributor can personally welcome about one person a month, most newcomers will not be welcomed by anyone experienced; switch to monthly cohort welcomes and buddy assignments.` },
          ],
          result: md`Moderation for a community this size is a real volunteer role, not a side task for a lead. Recruit moderators from the contributor rung and give them the role, the rota and recognition.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Running trust and safety on a volunteer team",
      blocks: [
        {
          kind: "callout",
          tone: "pitfall",
          title: "A code of conduct nobody enforces",
          md: md`Publishing a code and then letting a well-connected member or a sponsor's engineer off with nothing is worse than having no code: it tells everyone the rules are for people without connections. Decide in advance who decides, how fast (acknowledge reports within 24 hours, decide within a week) and how decisions are recorded.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Filters that measure access, not ability",
          md: md`Requiring a top university or a big-tech employer looks like quality control but mostly filters by privilege and city. Many of the region's strongest builders are self-taught, at smaller universities or in cities with few employers. Ask for proof of work and judge the work.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "Member data and consent",
          md: md`Sponsors will ask for attendee lists. Suhail shares data only when a member opted in for that purpose (for example a talent list for a named sponsor), records the consent, and never shares contact details by default. Saudi Arabia's Personal Data Protection Law, the UAE's federal data protection law and Qatar's data privacy law apply to members there, and the EU GDPR applies to members in Europe; take local advice before the first sponsor data share.`,
        },
        {
          kind: "checklist",
          title: "Trust and safety setup before the first event",
          items: [
            "Code of conduct in English and Arabic, reviewed locally, covering online spaces, events and sponsor staff",
            "Reporting channel (form and a named phone or chat contact at events), monitored daily",
            "Two trained responders per event with a conflict-of-interest rule",
            "Enforcement ladder and decision log; who decides and how fast",
            "Sponsor rules: recruiting, data, conduct, signed with the sponsorship agreement",
            "Application form with proof of work, one specific question and team intent",
            "Moderator rota with cover, and a handover note each week",
            "Consent flags in the member database for each data use",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask before admitting a new city chapter or partner community",
          items: [
            "Who will be the responders, and have they handled a report before?",
            "How do you currently deal with recruiter spam and off-topic selling?",
            "Will you adopt Suhail's code of conduct as written, including for your sponsors?",
            "What happened the last time someone broke the rules in your group?",
          ],
        },
        { kind: "scenario", scenario: "sh01-s2" },
        {
          kind: "question",
          question: {
            id: "sh01-l04-p1",
            type: "short",
            prompt: md`Draft Suhail's **one-page code of conduct summary and enforcement procedure** for its first hackathon: scope, expected and unacceptable behaviour (including sponsor recruiting rules), how to report, who responds (by role), the enforcement ladder with examples, response times, confidentiality, and how member data is shared with sponsors.`,
            rubric: [
              "Scope covers online spaces, in-person events and sponsor staff",
              "Unacceptable behaviour is specific, and sponsor recruiting and data rules are explicit",
              "Reporting channel, named responder roles, a conflict-of-interest rule and response times are given",
              "Enforcement ladder has graded steps with examples, and severe cases can go straight to removal or authorities",
              "Data sharing with sponsors is opt-in, purpose-specific and recorded",
              "Notes bilingual publication and local legal review",
            ],
            modelAnswer: md`**Suhail code of conduct (summary, first hackathon)**

**Scope.** All Suhail spaces: the community server, WhatsApp groups run by Suhail, events, and Suhail-organised dinners. Applies to members, volunteers, speakers, judges and sponsor staff. Published in Arabic and English; reviewed by local counsel.

**Expected.** Help others learn, credit others' work, keep feedback about the work, respect prayer times and quiet spaces at events.

**Unacceptable.** Harassment, insults or discriminatory remarks; unwanted physical contact; sharing someone's photo or details without consent; plagiarism of code or projects; **sponsor recruiting by unsolicited direct message, collecting attendee contacts without consent, or pitching during technical sessions**.

**Report.** Form linked on every event page and in the server; at events, the two responders wear identifiable lanyards and their numbers are on the welcome slide.

**Responders.** Events lead and one trained volunteer per event, of different genders where possible. Nobody handles a case involving their employer, a sponsor they manage or a friend; the case moves to another lead.

**Response.** Acknowledge within 24 hours; decision within 7 days; immediate action at events for safety.

**Ladder.** (1) Correction: off-topic recruiting post, private note. (2) Warning: repeated unsolicited messages after a correction, warning and no-contact period. (3) Temporary ban: insulting a participant, banned from events and spaces for six months. (4) Permanent ban: harassment or threats; venue security and authorities involved where relevant. Severe cases skip steps.

**Confidentiality.** Reporter identity shared only with responders; no public naming; decisions logged privately.

**Data.** Sponsors receive member contact details only for members who opted in for that sponsor and purpose; consent recorded in the member database; default is no sharing.`,
            explanation: md`A credible code names who decides, how fast and with what consequences, and covers sponsors explicitly.`,
            concepts: ["sh01.code-of-conduct", "sh01.moderation-capacity"],
            difficulty: 2,
          },
        },
        { kind: "sources", refs: ["sh01-r19", "sh01-r16"] },
        {
          kind: "feynman",
          prompt: "Explain to a volunteer reviewer why recruiting from better places usually improves hackathon quality more than a stricter application form.",
          keyPoints: [
            "Precision depends on the base rate of strong applicants as well as the filter",
            "With a weak pool, even a good filter lets in many weak applicants",
            "Raising the base rate improves precision for every future event",
            "Stricter review costs reviewer time every time",
            "Filters should judge proof of work, not credentials",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh01-l04-q1",
      type: "numeric",
      prompt: md`Base rate of strong applicants 0.40, sensitivity 0.75, false-positive rate 0.15. What is the precision of the filter? Three decimals.`,
      answer: 0.769,
      tolerance: { abs: 0.003 },
      explanation: md`$P = 0.75 \times 0.40 / (0.30 + 0.15 \times 0.60) = 0.30/0.39 = 0.769$.`,
      concepts: ["sh01.application-filter"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "sh01-l04-q2",
      type: "order",
      prompt: md`Order the steps of the Contributor Covenant 2.1 enforcement ladder from least to most severe.`,
      items: ["Correction", "Warning", "Temporary ban", "Permanent ban"],
      explanation: md`The ladder gives proportion; severe incidents can go straight to the top.`,
      concepts: ["sh01.code-of-conduct"],
      difficulty: 1,
    },
    {
      id: "sh01-l04-q3",
      type: "numeric",
      prompt: md`2,000 active members, 0.3 posts per member per day, 3 % need action, 5 minutes per action, 40 minutes per volunteer per day. How many moderators are needed on a given day (before cover)?`,
      answer: 3,
      tolerance: { abs: 0 },
      unit: "moderators",
      explanation: md`$2{,}000 \times 0.3 \times 0.03 \times 5 = 90$ minutes; $90/40 = 2.25$, round up to 3. With cover, 5 to 6 on a rota.`,
      concepts: ["sh01.moderation-capacity"],
      difficulty: 2,
    },
    {
      id: "sh01-l04-q4",
      type: "multi",
      prompt: md`Which are effective counter-measures when the newcomer ratio rises? Select all that apply.`,
      options: [
        "Admit newcomers in monthly cohorts with a group welcome",
        "Remove the code of conduct to feel more welcoming",
        "Assign each newcomer to a named contributor",
        "Split into city and interest groups with their own organisers",
        "Stop all recruiting permanently",
      ],
      answer: [0, 2, 3],
      explanation: md`Staged intake, buddies and small groups let norms spread person to person. Removing norms or stopping growth entirely are not remedies.`,
      concepts: ["sh01.dilution"],
      difficulty: 1,
    },
    {
      id: "sh01-l04-q5",
      type: "mcq",
      prompt: md`Why are university prestige and big-tech employers poor hard filters for Suhail?`,
      options: [
        "They are hard to verify",
        "They mostly measure access and city, excluding many strong self-taught and early-career builders",
        "Sponsors dislike them",
        "They are illegal to ask about",
      ],
      answer: 1,
      explanation: md`Proof of work measures ability directly; credentials measure where someone had the chance to be.`,
      concepts: ["sh01.application-filter"],
      difficulty: 1,
    },
    {
      id: "sh01-l04-q6",
      type: "decision",
      prompt: md`A sponsor's recruiter has messaged 40 hackathon participants directly with job offers, against the sponsor rules. Several complained. What do you do?`,
      options: [
        { text: "Ignore it: the sponsor pays for the event.", score: 0, feedback: "Every participant learns the rules do not apply to money. Builders leave; other sponsors notice too." },
        { text: "Correction to the sponsor contact in writing, ask the recruiter to stop and apologise to recipients, offer the sponsor the opt-in talent list as the right channel, and record the case.", score: 1, feedback: "Right: proportionate, enforced, and it gives the sponsor a legitimate way to get what it wants." },
        { text: "Publicly name the company and terminate the sponsorship.", score: 0.3, feedback: "Disproportionate for a first breach and risky under local defamation law; you lose the partner and gain little." },
      ],
      explanation: md`Sponsors are in scope. Enforce proportionately and channel the underlying need (hiring) into a consented mechanism.`,
      concepts: ["sh01.code-of-conduct"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "sh01-l04-f1", front: "Filter precision formula", back: md`$P = s\pi/(s\pi + f(1-\pi))$. With a weak pool, the pool matters more than the filter.`, concepts: ["sh01.application-filter"] },
    { id: "sh01-l04-f2", front: "Best single application signal", back: "Proof of work: a link to something the applicant built.", concepts: ["sh01.application-filter"] },
    { id: "sh01-l04-f3", front: "Contributor Covenant 2.1 ladder", back: "Correction, warning, temporary ban, permanent ban.", concepts: ["sh01.code-of-conduct"] },
    { id: "sh01-l04-f4", front: "Moderator headcount", back: md`$M = \lceil A p \rho \tau / T_m \rceil$, plus 1.5 to 2 times cover.`, concepts: ["sh01.moderation-capacity"] },
    { id: "sh01-l04-f5", front: "Eternal September", back: "Usenet from September 1993: a continuous flow of newcomers broke the community's ability to teach norms. The archetype of dilution.", concepts: ["sh01.dilution"] },
    { id: "sh01-l04-f6", front: "Newcomer ratio", back: md`$\nu = N_\text{new}/C$: newcomers per established contributor per month; watch its trend with incidents.`, concepts: ["sh01.dilution"] },
  ],
  scenarios: [
    {
      id: "sh01-s2",
      title: "An incident at the hackathon involving a sponsor mentor",
      dayInLife: true,
      context: md`Illustrative scenario. Saturday evening at a Suhail hackathon. A participant tells one of your responders that a mentor from the title sponsor made repeated comments about her appearance and asked for her personal number. The sponsor's country manager is in the room and is due to present prizes tomorrow.`,
      start: "a",
      nodes: {
        a: {
          md: md`The responder brings it to you. The participant wants it handled but does not want a scene. What do you do first?`,
          choices: [
            { text: "Thank her, ask what she needs right now (to keep working safely), offer to move the mentor away from her team immediately, and write down what she reported.", next: "b", score: 10, feedback: "Safety and the reporter's wishes first, a record second, judgement after." },
            { text: "Tell her you will raise it with the sponsor after the event to avoid disruption.", next: "c", score: 2, feedback: "She stays exposed for another day, and you have signalled that the sponsor comes first." },
            { text: "Go straight to the mentor in front of his team and confront him.", next: "b", score: 3, feedback: "Creates the scene she asked to avoid and gives you no chance to hear him privately." },
          ],
        },
        b: {
          md: md`The mentor has been reassigned. You speak with him privately with a second responder present. He says it was a misunderstanding. The country manager hears about it and asks you to "keep this between us".`,
          choices: [
            { text: "Explain that the code applies to sponsor staff, that the mentor will not mentor for the rest of the event pending a decision, and that you will share the outcome with the sponsor in writing within a week.", next: "d", score: 10, feedback: "Clear, proportionate and consistent with the code the sponsor signed." },
            { text: "Agree to keep it quiet in exchange for the sponsor's commitment to next season.", score: 0, feedback: "You have traded a participant's safety for revenue. If it becomes known, and it will, Suhail loses its builders." },
            { text: "Ban the mentor permanently on the spot and announce it publicly.", score: 4, feedback: "Decisive but skips hearing both sides properly, and public naming is risky under local law." },
          ],
        },
        c: {
          md: md`On Sunday morning the participant's teammate posts in a WhatsApp group that Suhail "protects sponsors". Other participants are asking questions.`,
          choices: [
            { text: "Act now: remove the mentor from the event, speak to the participant and apologise for the delay, and tell participants that a report is being handled under the code without naming anyone.", next: "d", score: 6, feedback: "Recovers some trust, but the delay has cost you." },
            { text: "Ask the teammate to delete the post.", score: 0, feedback: "Confirms the accusation." },
          ],
        },
        d: {
          md: md`After review, the responders conclude the comments breached the code. What outcome do you set?`,
          choices: [
            { text: "Temporary ban from Suhail events and mentoring, written outcome to the sponsor, a check-in with the participant, and an anonymised note in the decision log.", score: 10, feedback: "Proportionate to repeated unwanted comments, consistent and documented. A sponsor that values builders will accept it." },
            { text: "A private correction only.", score: 4, feedback: "Too light for repeated personal comments and a request for a personal number." },
          ],
        },
      },
      concepts: ["sh01.code-of-conduct"],
    },
  ],
};

export default lesson;
