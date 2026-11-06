import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh02-l01",
  title: "What a hackathon is for: goals, formats and the {Tech: Europe} and MLH models",
  summary:
    "A hackathon is a three-sided exchange between builders, sponsors and the organiser. Each side wants something different (skills, prizes and jobs; developer adoption, hiring and brand; community and revenue), and the format you choose decides which of those goals you can actually deliver. This lesson takes the goals apart, compares formats, and reads the {Tech: Europe} and MLH models as two working answers to the same design problem.",
  minutes: 60,
  objectives: [
    "State what builders, sponsors and the organiser each want from a hackathon, and where those goals conflict",
    "Choose a format (24 h, weekend, online, themed, corporate, university) from the goal, not from habit",
    "Describe the {Tech: Europe} and MLH operating models and what Suhail can borrow from each",
    "Compute a sponsor's cost per activated developer and cost per hire, and use it to frame the sponsor's value",
    "Write a one-page event goal statement with measurable outcomes for all three sides",
  ],
  concepts: [
    { id: "sh02.three-sided-exchange", name: "The three-sided exchange", description: "A hackathon trades value between builders (learning, prizes, visibility, jobs), sponsors (developer adoption, hiring, brand) and the organiser (community growth, content, revenue). A design that serves only one side fails the other two.", competency: "sh-events", related: ["sh02.sponsor-outcome-metrics"] },
    { id: "sh02.format-choice", name: "Hackathon format choice", description: "Duration (one evening, 24 h, weekend), mode (in person, online, hybrid), theme and host (community, corporate, university) are chosen to match the goal: depth of product, reach, hiring signal, or cost.", competency: "sh-events", related: ["sh02.three-sided-exchange"] },
    { id: "sh02.sponsor-outcome-metrics", name: "Sponsor outcome metrics", description: "What a sponsor actually buys, expressed as numbers it can compare with other channels: activated developers, cost per activated developer, qualified candidates, cost per hire, content reach.", competency: "sh-events", related: ["sh02.three-sided-exchange"] },
    { id: "sh02.community-hackathon-model", name: "Community hackathon model", description: "Free for participants, approval-gated registration, frequent small events, technology partners give credits and sponsors fund prizes; the hackathon is the top of a community funnel rather than a stand-alone product ({Tech: Europe} pattern).", competency: "sh-events", related: ["sh02.format-choice"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Three parties, three different goals",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Hackathons are planned to be Suhail's most frequent product and the main way builders first meet the community. Nothing has launched yet, so every decision is still open: how long, how big, which theme, who pays. If you cannot say in one sentence what each side gets, you will build an event that is fun on the night, leaves sponsors with nothing to report, and adds nobody to the community afterwards.`,
        },
        {
          kind: "md",
          md: md`### The three-sided exchange

A hackathon looks like a party with laptops. Underneath it is a market with three parties, each giving something and expecting something back.

| Party | Gives | Wants | Measurable outcome |
|---|---|---|---|
| **Builders** | 24 to 48 hours of skilled work, attention, their data in your registration form | Learning, a shipped project, prizes, visibility to employers and investors, friends | Projects shipped, offers or interviews, return rate to the next event |
| **Sponsors** | Cash, API or compute credits, mentors, judges, sometimes the venue | Developer adoption of their product, hiring pipeline, brand among builders, content | Developers activated, candidates met, projects using their tech, reach |
| **Organiser (Suhail)** | Design, operations, audience, reputation | Community growth, content (newsletter, The Majlis episodes), sponsor revenue, a reputation that makes the next event easier | New members retained, contribution margin, sponsor renewal |

The parties conflict in predictable places:

- **Prizes vs collaboration.** Large cash prizes attract strong teams but also people who bring a finished project and leave. Builders who came to learn feel cheated.
- **Sponsor visibility vs builder time.** Every sponsor talk is 15 minutes less building. Three sponsor keynotes at kick-off is the fastest way to empty the room.
- **Data vs trust.** Sponsors want CVs and contact lists; builders gave you their data for an event, not for a recruiter's outreach. Consent has to be explicit and opt-in.
- **Scale vs quality.** The organiser wants a big number for the sponsor deck; a big room with poor wifi and no mentors produces worse projects and fewer returners.

### What sponsors actually buy

There are four reasons a company sponsors a hackathon, and each one implies a different design.

1. **API or platform adoption (developer relations).** The sponsor wants developers to sign up, build something real and keep using the product. Metric: activated developers (still making API calls 30 days later), not sign-ups.
2. **Hiring.** The sponsor wants to watch candidates work under pressure, which is a better signal than an interview. Metric: qualified candidates met, interviews, hires.
3. **Brand and positioning.** The sponsor wants to be seen as the company builders like. Metric: reach, sentiment, content produced.
4. **Problem scouting or open innovation.** Corporates and governments want ideas or prototypes on their problem. Metric: usable prototypes, follow-on pilots. This is where intellectual property terms become sensitive (Lesson 2).

The cost-per-outcome arithmetic is what makes the conversation with a sponsor concrete:`,
        },
        { kind: "equation", formula: "sh02-cost-per-activated" },
        { kind: "equation", formula: "sh02-cost-per-hire" },
        {
          kind: "md",
          md: md`These two ratios let a developer-relations lead or a head of talent compare your hackathon with every other channel they spend on (paid ads, conference booths, recruiter fees). You do not need to know their internal benchmarks; you need to give them the numerator and denominator honestly after the event.

### Formats

| Format | Typical size | Builds | Best for | Weakness |
|---|---|---|---|---|
| **Evening or one-day sprint** (4 to 10 h) | 30 to 80 | Demos and prototypes | Frequent community touchpoints, sponsor API trials | Little depth, little hiring signal |
| **24-hour** | 60 to 200 | Working prototypes | Energy, a clean story, one venue booking | Overnight safety and catering, exhausted demos |
| **Weekend** (Friday to Saturday or 36 to 48 h) | 100 to 500+ | Products with real depth | Hiring signal, serious projects, flagship events | Cost, sleep logistics, higher no-show risk |
| **Online** (2 days to 4 weeks) | 100 to thousands | Uneven | Reach across countries, low cost | Low completion, weak relationships, hard to stop pre-built projects |
| **Themed** (AI agents, Arabic NLP, climate) | any | Focused projects | Sponsor alignment, comparable projects for judging | Narrower audience |
| **Corporate (internal or client-hosted)** | 20 to 300 | Prototypes on the company's problems | Paid service revenue | Builders are employees; IP belongs to the host |
| **University** | 50 to 500 | Student projects | Volume, early talent, free venues | Less experienced teams, academic calendar |

A rule that survives contact with reality: **choose duration from the depth of project the goal needs, and size from the venue and the mentor count you can actually staff**, not from the number you want on the sponsor deck.`,
        },
        {
          kind: "matrix",
          title: "Which goal does a format serve?",
          xAxis: ["Reach (many builders, light touch)", "Depth (fewer builders, serious projects)"],
          yAxis: ["Low organiser cost", "High organiser cost"],
          cells: [
            { label: "Online challenge, evening sprint", detail: "Cheap and wide. Good for sponsor API trials and for discovering builders across the region." },
            { label: "Small approval-gated 24 h event", detail: "The {Tech: Europe} pattern: 60 to 120 selected builders, partner venue, sponsor-funded prizes. Best value per relationship." },
            { label: "Large open university hackathon", detail: "Volume and student talent; quality varies; venue often free but food and staffing scale with headcount." },
            { label: "Flagship weekend (e.g. at Suhail Season)", detail: "Serious projects, investor and employer judges, travel grants. Expensive; run once or twice a year." },
          ],
          caption: "Plot each planned event before you budget it. A calendar heavy in the top-right cell is how most new organisers run out of volunteers and money.",
        },
        {
          kind: "md",
          md: md`### Two working models

**{Tech: Europe}** (Berlin, grew out of {Tech: Berlin} in 2023 to 2024; research brief, November 2026) runs two to three AI hackathons a month across European cities, plus a conference and a newsletter. Hackathons are free for participants with approval-gated registration (for example a 90-person cap). Technology partners such as OpenAI provide credits and sponsors fund prizes (one sponsor put up a EUR 10K prize; the "Big Berlin Hack" had more than 300 builders and more than EUR 50K in prizes, co-hosted with CODE University). Distribution runs through Luma event pages and Discord. The hackathon is not the product on its own; it is the top of a funnel that feeds the newsletter, the conference and hiring features.

**MLH (Major League Hacking)** is a Public Benefit Corporation that reaches more than 80K developers a year across more than 200 events (research brief). It mostly does not run events itself: it supports a league of student-organised member hackathons with a playbook, a code of conduct, hardware and sponsor relationships, and earns most of its revenue from corporate sponsors of the league and its programmes. MLH's organiser guide recommends three sponsorship tiers with the top tier at no more than 25 % of the budget, so no single sponsor can sink the event by walking away.

What Suhail can borrow: from {Tech: Europe}, the cadence (small, frequent, selective events feeding one community) and the free-for-builders, sponsor-funded economics; from MLH, the standardisation (one playbook, one code of conduct, one sponsor package reused across many local organisers), which is how a volunteer team covers Kuwait, Riyadh, Dubai, Cairo and Amman without being in every city.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "How these models make money",
          md: md`{Tech: Europe}'s revenue model is inferred, not confirmed: the visible signals are sponsorship, conference tickets and hiring features (research brief, open item 6). MLH's revenue is reported as under USD 5M by one aggregator (unverified). Do not quote either as fact in a sponsor deck or investor material.`,
        },
        { kind: "xref", to: "fc05.event-portfolio", note: "Founder Core treats events as a marketing portfolio. Here the event is Suhail's product, so the design questions go much deeper." },
      ],
    },
    {
      layer: "applied",
      title: "Pricing the sponsor's outcome",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "What did an API sponsor and a hiring sponsor get for their money?",
          given: md`Illustrative Suhail 24-hour AI hackathon (no such event has run yet): 120 builders in 30 teams. Sponsor A (an AI API provider) pays USD 8,000 cash plus API credits. Sponsor B (a regional software company hiring engineers) pays USD 6,000. After the event: 45 builders created accounts on Sponsor A's platform, 18 teams used its API in their project, and 12 builders were still making API calls 30 days later. Sponsor B interviewed 6 builders and hired 1. Sponsor B's recruiter fee alternative: 20 % of a USD 60,000 first-year salary (illustrative).`,
          steps: [
            { md: md`**Sponsor A, naive metric:** USD 8,000 / 45 sign-ups = USD 178 per sign-up. This is the number organisers like to report; it flatters, because most sign-ups never return.` },
            { md: md`**Sponsor A, the metric its developer-relations lead is judged on:** $c_{act} = 8{,}000 / 12 =$ **USD 667 per activated developer**. If you can also report that 18 of 30 teams (60 %) built on the API, the lead can show depth of use, not just reach.` },
            { md: md`**Sponsor B:** $c_{hire} = 6{,}000 / 1 =$ **USD 6,000 per hire**, against an alternative recruiter fee of $0.20 \times 60{,}000 =$ USD 12,000. Even one hire beats the alternative by a factor of 2; the 5 other interviewed candidates are pipeline the sponsor did not pay a recruiter for.` },
            { md: md`**The organiser's lesson:** both sponsors are only renewable if you **measure** the denominators. The API activation count needs the sponsor's own data (agree in the contract that they share the 30-day number); the hiring count needs a consent-based CV opt-in at registration and a follow-up at 90 days.` },
          ],
          result: md`USD 667 per activated developer and USD 6,000 per hire (illustrative). The design implication: an API sponsor needs a challenge where its product is genuinely useful (Lesson 2), and a hiring sponsor needs engineers on its team in the room, as mentors and judges, during the build.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: a smaller evening sprint",
          given: md`Illustrative evening sprint: 50 builders. An AI API sponsor pays USD 3,000. 28 builders sign up to its platform; 7 are still active after 30 days.`,
          steps: [
            { md: md`Cost per sign-up: $3{,}000 / 28$.` },
            { md: md`$= $ USD 107 per sign-up.`, hidden: true, check: { prompt: "Cost per sign-up (USD)", answer: 107.14, tolerance: { abs: 1 }, unit: "USD" } },
            { md: md`Cost per activated developer: $3{,}000 / 7$.` },
            { md: md`$=$ **USD 429** per activated developer: cheaper than the 24-hour event per activation, but with shallower projects. Report both the number and the depth (how many teams built on the API).`, hidden: true, check: { prompt: "Cost per activated developer (USD)", answer: 428.57, tolerance: { abs: 1 }, unit: "USD" } },
          ],
          result: md`USD 429 per activated developer. Smaller, cheaper formats can beat flagships on cost per outcome, which is why a frequent-event calendar is a sound default for a new community.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Writing the goal statement before anything else",
      blocks: [
        {
          kind: "md",
          md: md`### How it is done

- **Who:** the Events and Programming lead owns the goal statement; the Partnerships lead signs off on the sponsor outcomes; the Finance lead signs off on the budget it implies.
- **When:** before the venue is booked and before the first sponsor email. Everything later (theme, size, duration, prizes, judging) is checked against it.
- **Format:** one page. Purpose in one sentence, then one measurable outcome per party, then the format and size that follow from them, then what you will **not** do.
- **Tools:** a shared doc, a Luma event page for registration, Discord or WhatsApp for participant communication, a spreadsheet for the budget. {Tech: Europe} and many AI communities run on Luma plus Discord; nothing more is needed for the first events.

### What goes wrong

- **Goal by imitation.** "Let us do a 48-hour hackathon like the big ones" with no reason for 48 hours.
- **Vanity outcomes.** "500 registrations" is not an outcome; 500 registrations with 40 % show-up and no follow-up is a cost.
- **No denominator agreed with sponsors.** If you do not agree in advance how activation and hiring are counted, the sponsor's renewal decision will be made on impressions.
- **One-event thinking.** A hackathon that does not feed the newsletter, the podcast and the next event is an expensive party.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "What to check before you commit to a format",
          md: md`Can you name the outcome per party with a number and a measurement method? Do you have enough mentors for the size (roughly one mentor per four to six teams during build hours, illustrative rule of thumb)? Does the venue support the duration (overnight access, security, sleeping area)? Does the date avoid Ramadan nights, exam weeks and major regional tech weeks (Lesson 6)?`,
        },
        {
          kind: "question",
          question: {
            id: "sh02-l01-p1",
            type: "short",
            prompt: md`**Write the one-page goal statement for Suhail's first hackathon** (planned for 2027, location your choice in the Gulf). Include: (1) the purpose in one sentence; (2) one measurable outcome and its measurement method for builders, for sponsors (pick an API sponsor or a hiring sponsor) and for Suhail; (3) the format and size you choose and why they follow from the outcomes; (4) three things you will deliberately not do. Use only labelled illustrative numbers; do not invent sponsors or results.`,
            rubric: [
              "Purpose sentence names who it is for and what changes for them, not a slogan",
              "Each of the three parties has a numeric outcome and a concrete measurement method (for example 30-day API activation shared by the sponsor, 90-day hiring follow-up, members still active at 60 days)",
              "Format and size are justified from the outcomes and from staffing or venue limits, not from imitation",
              "The 'will not do' list addresses at least one real conflict (prizes vs collaboration, sponsor talks vs build time, data sharing without consent)",
              "Numbers are labelled illustrative and no sponsor, partner or result is presented as real",
            ],
            modelAnswer: md`**Purpose:** give 100 selected Gulf builders 24 hours to ship a working AI agent with real Arabic-language users in mind, and connect the best of them to employers and investors who are in the room.

**Outcomes (illustrative targets):**
- Builders: at least 22 of 25 teams demo a working product (not slides); measured on the demo schedule. 30 % of attendees say in the 7-day survey they met someone they will work with again.
- API sponsor: at least 10 builders still calling the sponsor's API 30 days after the event; the sponsor agrees in the contract to share this number with us. Secondary: number of teams whose project depends on the API.
- Suhail: 50 attendees still active in the community 60 days later (newsletter opens, Discord posts or a second event); measured from our own list and Discord.

**Format and size:** 24 hours, in person, 100 participants in teams of 3 to 5. 24 hours is enough for a working agent with an API and a front end, and we can staff one night shift with eight volunteers. 100 seats because a partner venue holds 130 people including staff and we can find five mentors (about one per five teams). Approval-gated, free for builders.

**We will not:** run more than one 10-minute sponsor slot at kick-off; share any attendee data with sponsors without a separate opt-in; offer a single grand prize larger than all other prizes combined (it rewards pre-built projects).`,
            explanation: md`Graded against the rubric. The test is whether a sponsor could read the page and know exactly what number they will receive after the event, and whether a volunteer could read it and know what the event is not.`,
            concepts: ["sh02.three-sided-exchange", "sh02.sponsor-outcome-metrics", "sh02.format-choice"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a new volunteer why Suhail runs small, selective hackathons often instead of one huge open hackathon a year.",
          keyPoints: [
            "Each event serves builders, sponsors and the organiser; small selective events make it easier to deliver all three",
            "Frequent events keep the community active and feed the newsletter and podcast",
            "Cost per activated developer or per relationship can be lower at small events",
            "Staffing (mentors, volunteers) and venue limits cap quality, not ambition",
            "This mirrors the {Tech: Europe} cadence; flagship events still have a place once or twice a year",
          ],
        },
        { kind: "sources", refs: ["sh02-r1", "sh02-r2", "sh02-r3", "sh02-r4"] },
      ],
    },
  ],
  quiz: [
    {
      id: "sh02-l01-q1",
      type: "multi",
      prompt: "Which of these are outcomes an AI API sponsor would genuinely care about? (Select all that apply.)",
      options: [
        "Developers still calling the API 30 days after the event",
        "Number of teams whose project depends on the API",
        "Number of registrations on the event page",
        "Number of free pizzas served",
        "Feedback from builders on the API's documentation",
      ],
      answer: [0, 1, 4],
      explanation: md`Activation and depth of use are what developer-relations teams are measured on; documentation feedback is product research they would otherwise pay for. Registrations are a vanity number.`,
      concepts: ["sh02.sponsor-outcome-metrics"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh02-l01-q2",
      type: "numeric",
      prompt: md`An illustrative hiring sponsor pays USD 9,000 and makes 2 hires from the event. What is its cost per hire? (USD)`,
      answer: 4500,
      tolerance: { abs: 1 },
      unit: "USD",
      explanation: md`$c_{hire} = 9{,}000 / 2 = \text{USD } 4{,}500$. Compare with a recruiter fee (often a percentage of first-year salary) to frame the value.`,
      concepts: ["sh02.sponsor-outcome-metrics"],
      difficulty: 1,
    },
    {
      id: "sh02-l01-q3",
      type: "mcq",
      prompt: "Which format best suits a goal of discovering builders across six Arab countries at low cost?",
      options: ["A 48-hour flagship in one city", "An online challenge over two to four weeks", "A corporate internal hackathon", "A 24-hour university event"],
      answer: 1,
      explanation: md`Online formats maximise reach and minimise cost. The price is lower completion rates, weaker relationships and a harder time preventing pre-built projects.`,
      concepts: ["sh02.format-choice"],
      difficulty: 1,
    },
    {
      id: "sh02-l01-q4",
      type: "mcq",
      prompt: "According to MLH's organiser guide (research brief), the top sponsorship tier should be no more than what share of the budget?",
      options: ["10 %", "25 %", "50 %", "75 %"],
      answer: 1,
      explanation: md`No more than 25 %, so that losing one sponsor does not cancel the event. It also keeps any single sponsor from dominating the event.`,
      concepts: ["sh02.community-hackathon-model"],
      difficulty: 1,
    },
    {
      id: "sh02-l01-q5",
      type: "decision",
      prompt: md`A prospective sponsor offers to cover the entire budget of Suhail's first hackathon if it can give a 30-minute keynote at kick-off and receive every participant's CV. What do you do?`,
      options: [
        { text: "Accept: the event is fully funded.", score: 0.1, feedback: "One sponsor at 100 % of the budget can cancel the event, the keynote eats build time, and sharing CVs without consent breaks builders' trust and probably data protection rules." },
        { text: "Counter: a capped share of the budget (top tier), a 10-minute slot, mentors and judges on the floor, and CVs only from builders who opt in.", score: 1, feedback: "Keeps the sponsor's real goal (hiring) achievable, protects builders' time and consent, and limits concentration risk." },
        { text: "Decline any sponsor that wants hiring access.", score: 0.3, feedback: "Hiring is a legitimate sponsor goal and valuable to builders; the fix is consent and format, not refusal." },
      ],
      explanation: md`Sponsor goals are legitimate; the organiser's job is to serve them without spending the builders' trust. Concentration limits, consent and format constraints do that.`,
      concepts: ["sh02.three-sided-exchange", "sh02.community-hackathon-model"],
      difficulty: 2,
    },
    {
      id: "sh02-l01-q6",
      type: "mcq",
      prompt: "In the {Tech: Europe} model described in the research brief, who pays for prizes?",
      options: ["Participants through ticket fees", "Sponsors and technology partners", "The city government", "The venue"],
      answer: 1,
      explanation: md`Participation is free and approval-gated; sponsors fund prizes and technology partners give credits.`,
      concepts: ["sh02.community-hackathon-model"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh02-l01-f1", front: "The three parties in a hackathon", back: "Builders (learning, prizes, jobs), sponsors (adoption, hiring, brand, scouting), organiser (community, content, revenue).", concepts: ["sh02.three-sided-exchange"] },
    { id: "sh02-l01-f2", front: "Cost per activated developer", back: "Sponsor spend / developers still active 30 days later. Sign-ups flatter; activation is what developer-relations teams are judged on.", concepts: ["sh02.sponsor-outcome-metrics"] },
    { id: "sh02-l01-f3", front: "Four reasons companies sponsor hackathons", back: "API or platform adoption, hiring, brand, problem scouting (open innovation).", concepts: ["sh02.sponsor-outcome-metrics"] },
    { id: "sh02-l01-f4", front: "{Tech: Europe} hackathon pattern", back: "Free, approval-gated (e.g. 90 cap), 2 to 3 events a month, partners give credits, sponsors fund prizes, Luma plus Discord, feeds newsletter and conference.", concepts: ["sh02.community-hackathon-model"] },
    { id: "sh02-l01-f5", front: "MLH model", back: "PBC supporting a league of member hackathons with a playbook, code of conduct and sponsor relationships; revenue mostly from corporate sponsors; three tiers, top tier at most 25 % of budget.", concepts: ["sh02.community-hackathon-model"] },
    { id: "sh02-l01-f6", front: "How to choose duration and size", back: "Duration from the depth of project the goal needs; size from venue capacity and the mentors and volunteers you can staff.", concepts: ["sh02.format-choice"] },
  ],
};

export default lesson;
