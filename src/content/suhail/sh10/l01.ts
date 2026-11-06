import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh10-l01",
  title: "The brief: event concept, goals and success metrics",
  summary:
    "What the capstone produces (concept, budget and P&L, sponsorship package and pipeline, run-of-show with team plan, risk register and permits, post-event report), how to choose the city and format for Suhail's first hackathon, and how to turn three sets of goals (builders, sponsors, Suhail) into a metric tree with targets you can measure on the day and report afterwards.",
  minutes: 70,
  objectives: [
    "You can list the six capstone artifacts and say which decision each one forces.",
    "You can write goals for the three customers of a hackathon (builders, sponsors, Suhail) and turn each into a measurable metric with a target.",
    "You can work backwards from a target headcount through show-up and acceptance rates to the applications and reach you need.",
    "You can choose a city and format with an explicit weighted score and say how sensitive the choice is to the weights.",
    "You can write a one-page event concept that a sponsor, a volunteer lead and a venue host would all understand.",
  ],
  concepts: [
    {
      id: "sh10.capstone-artifacts",
      name: "The six capstone artifacts",
      description:
        "Event concept and goals; budget and P&L; sponsorship package, target list and pipeline; run-of-show and team plan; risk register and permit plan; post-event report feeding the next round. Each one forces a decision the next one depends on.",
      competency: "sh-events",
    },
    {
      id: "sh10.three-customer-goals",
      name: "Three customers, three sets of goals",
      description:
        "A hackathon serves builders (learning, shipping, being seen), sponsors (adoption, hiring, brand) and the organiser (members, reputation, revenue). A goal that serves only one of them is a cost to the others.",
      competency: "sh-community",
    },
    {
      id: "sh10.success-metrics",
      name: "Event metric tree",
      description:
        "One north-star outcome, three to five metrics per customer with numeric targets, each with a definition, a data source and an owner, fixed before the event so the post-event report cannot be written backwards.",
      competency: "sh-events",
      related: ["sh10.three-customer-goals"],
    },
    {
      id: "sh10.attendance-funnel",
      name: "Attendance funnel",
      description:
        "On-site builders = applications x acceptance rate x show-up rate. Work it backwards from the venue capacity to the applications and reach you need, and accept more people than you have seats for.",
      competency: "sh-events",
    },
    {
      id: "sh10.city-choice",
      name: "City and format choice",
      description:
        "A weighted score over builder density, sponsor budgets nearby, permit and operating simplicity, the team's presence and cost. The weights encode strategy; test how the ranking moves when they change.",
      competency: "sh-events",
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "What the capstone produces and how goals become metrics",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Suhail's plan starts in January 2027 with nothing launched: no members, no sponsors, no past events. The first hackathon is the proof every later sponsor, volunteer and partner will ask about, and you will run it with leads who are unpaid until there is revenue. A first event that loses money, misses its headcount or cannot show a sponsor what they got is hard to recover from. This capstone makes you build the whole plan once, with numbers that reconcile, before any money or reputation is at stake.`,
        },
        {
          kind: "md",
          md: md`### The six artifacts

The capstone is one plan for one event, built as six artifacts. Each lesson produces one or two of them, and each forces a decision that the next depends on.

| # | Artifact | Decision it forces | Lesson |
|---|---|---|---|
| 1 | **Event concept and goals** | City, format, theme, size, date; what success means for builders, sponsors and Suhail | 1 |
| 2 | **Budget and P&L** | What you will spend, what you must raise, the break-even, the contingency, the cash gate | 2 |
| 3 | **Sponsorship package, target list and pipeline** | Tiers and prices, who you will call, whether the pipeline covers the budget in time | 3 |
| 4 | **Run-of-show and team plan** | Who does what, when, with how many volunteer hours | 4 |
| 5 | **Risk register and permit plan** | What can go wrong, what it costs, who holds the permit | 4 |
| 6 | **Post-event report and next round** | What sponsors got, what you learned, how the event feeds the next sponsorship round and the community | 5 |

**The one-plan test.** The headcount in the concept is the headcount the caterer quotes. The sponsor revenue in the P&L is the weighted pipeline in the forecast. The contingency in the P&L covers the expected cost of the risk register. The benefits in the prospectus appear as lines in the run-of-show and as metrics in the post-event report. A sponsor or a host who finds two artifacts that disagree will assume the event is not under control.

### Three customers

A hackathon is a three-sided exchange. Builders give a weekend and get learning, a shipped project, prizes and visibility to employers and investors. Sponsors give money, credits and mentors and get developer adoption, candidates and brand. Suhail gives organisation and curation and gets members, reputation and the margin that keeps the team going. Every design choice moves value between the three: a 36-hour overnight format gives builders more time but costs sponsors energy on day 2 and adds safety and permit risk; sharing attendee data with sponsors raises sponsor value but costs builder trust unless it is opt-in.

### From goals to metrics

A goal is what you want ("Arab builders ship real AI products and get noticed"). A metric is how you will know, with a definition, a source, a target and an owner. Fix the metric tree **before** the event: a post-event report written from whatever numbers look good afterwards is worthless to a sponsor deciding on renewal.`,
        },
        {
          kind: "flow",
          title: "From one goal to a reportable number",
          steps: [
            { label: "Goal", detail: "Builders ship working Arabic-first AI products" },
            { label: "Metric", detail: "Projects submitted with a working demo, as a share of teams formed" },
            { label: "Definition", detail: "Demo runs live or in a recorded video in the submission form; judged eligible" },
            { label: "Source and owner", detail: "Submission form export; Head of Engineering" },
            { label: "Target", detail: "At least 80 % of teams formed (illustrative)" },
            { label: "Report", detail: "Actual vs target in the post-event report, with the reason for any gap" },
          ],
          caption: "If you cannot name the data source and owner, you do not have a metric yet.",
        },
        {
          kind: "md",
          md: md`### The attendance funnel

Seats are the binding constraint for an in-person hackathon: the venue holds a fixed number, catering is ordered per head, and the sponsor package promises a number of builders. Most hackathons are free and approval-gated, so the funnel is applications, then acceptances, then people who actually turn up.`,
        },
        { kind: "equation", formula: "sh10-attendance-funnel" },
        {
          kind: "md",
          md: md`Free events lose many accepted people to no-shows, which is why organisers accept more people than they have seats for and send a reconfirmation 48 to 72 hours before. Your own show-up rate is unknown until your first event; plan with a conservative assumption and a waitlist, and measure it.

### Choosing the city and format

For a first event, choose with a weighted score so the choice is explicit and you can explain it to the team and to sponsors.`,
        },
        { kind: "equation", formula: "sh10-weighted-score" },
        {
          kind: "chart",
          chart: "bar",
          title: "Illustrative city scores under two weightings",
          xKey: "city",
          yLabel: "Weighted score (1 to 5)",
          series: [
            { key: "base", label: "Base weights (sponsors 0.25, permits 0.20)" },
            { key: "permitHeavy", label: "Permit-heavy (sponsors 0.15, permits 0.30)" },
          ],
          data: [
            { city: "Riyadh", base: 3.55, permitHeavy: 3.25 },
            { city: "Dubai", base: 3.45, permitHeavy: 3.25 },
            { city: "Cairo", base: 3.4, permitHeavy: 3.5 },
            { city: "Kuwait City", base: 3.05, permitHeavy: 3.05 },
          ],
          caption: "Scores are illustrative judgements to show the method (see the worked example). A 0.10 shift of weight from sponsor proximity to permit simplicity changes the winner.",
        },
        { kind: "sources", refs: ["sh10-r15", "sh10-r16", "sh10-r6", "sh10-r7"] },
      ],
    },
    {
      layer: "applied",
      title: "Worked concept: Suhail Hack Riyadh 01",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Choose the city with an explicit score",
          given: md`Four candidate cities for Suhail's first hackathon. Criteria and base weights: builder density 0.25, sponsor budgets nearby 0.25, permit and operating simplicity for a first event 0.20, team presence and network 0.15, cost 0.15. Scores 1 to 5 are **illustrative judgements** to show the method; redo them with your own view and evidence.

| City | Builders | Sponsors | Permits | Team | Cost |
|---|---|---|---|---|---|
| Riyadh | 4 | 5 | 2 | 3 | 3 |
| Dubai | 4 | 5 | 3 | 2 | 2 |
| Cairo | 5 | 2 | 3 | 2 | 5 |
| Kuwait City | 2 | 3 | 3 | 5 | 3 |`,
          steps: [
            { md: md`Riyadh: $0.25(4) + 0.25(5) + 0.20(2) + 0.15(3) + 0.15(3) = 1.00 + 1.25 + 0.40 + 0.45 + 0.45 = 3.55$.` },
            { md: md`Dubai: $1.00 + 1.25 + 0.60 + 0.30 + 0.30 = 3.45$. Cairo: $1.25 + 0.50 + 0.60 + 0.30 + 0.75 = 3.40$. Kuwait City: $0.50 + 0.75 + 0.60 + 0.75 + 0.45 = 3.05$.` },
            { md: md`**Sensitivity.** Move 0.10 of weight from sponsors to permits (sponsors 0.15, permits 0.30). Riyadh: $1.00 + 0.75 + 0.60 + 0.45 + 0.45 = 3.25$. Dubai: $1.00 + 0.75 + 0.90 + 0.30 + 0.30 = 3.25$. Cairo: $1.25 + 0.30 + 0.90 + 0.30 + 0.75 = 3.50$. The ranking flips: the choice depends on whether you think sponsor money or operating simplicity is the binding constraint for event one.` },
            { md: md`**Why Riyadh for the worked plan.** Saudi Arabia led Middle East venture funding in 2025 by MAGNiTT's count (USD 1.72 bn), and the large regional AI programmes make sponsor budgets nearby plausible. The weak score is permits: a foreign or unregistered organiser faces a licensing path, so the plan uses a licensed local host (lesson 4). In H1 2026 Saudi funding fell sharply while the UAE took about two thirds of MENA venture money, which is exactly the kind of dated fact that can move the sponsor score; recheck it when you plan.` },
          ],
          result: md`Riyadh (3.55) narrowly leads with base weights; Cairo leads if permits weigh more. The worked plan through this module uses **Riyadh**, with a licensed host to remove most of the permit risk. Your capstone may choose any city if you show the score and the sensitivity.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Work backwards from the seats",
          given: md`**Illustrative plan.** Suhail Hack Riyadh 01: a two-day, daytime (not overnight) AI hackathon on Friday 23 and Saturday 24 April 2027, theme "Arabic-first AI agents", in a host's hall that seats **120 builders**. Free, approval-gated. Assumptions to test at the first event: show-up rate $s = 0.65$ of accepted; you want to accept only the strongest 40 % of applicants ($a = 0.40$); 3 % of people reached by the campaign apply.`,
          steps: [
            {
              md: md`Accepted needed: $N_{\text{acc}} = 120 / 0.65 = 184.6$, so accept **185** and run a waitlist.`,
              hidden: true,
              check: { prompt: "Acceptances needed (round up)", answer: 185, unit: "people", tolerance: { abs: 1 } },
            },
            {
              md: md`Applications needed: $N_{\text{app}} = 185 / 0.40 = 462.5$, so about **463** applications.`,
              hidden: true,
              check: { prompt: "Applications needed", answer: 463, unit: "applications", tolerance: { abs: 2 } },
            },
            {
              md: md`Reach needed: $463 / 0.03 \approx 15{,}400$ people who see the call through partners, university clubs, the newsletter and social posts. With no existing list, most of it must come from partners' channels, which is a sponsor and host benefit you can ask for.`,
              hidden: true,
              check: { prompt: "People reached", answer: 15433, unit: "people", tolerance: { rel: 0.02 } },
            },
            {
              md: md`**Over-show risk.** If show-up turns out to be 0.75, $185 \times 0.75 \approx 139$ arrive for 120 seats. The plan needs a rule: reconfirmation 72 hours before, release unconfirmed places to the waitlist, first-come check-in cut-off at capacity.`,
            },
          ],
          result: md`Target 120 on site means about 185 acceptances, about 463 applications and roughly 15,000 people reached. These are the numbers the marketing plan, the caterer's quote and the sponsor prospectus must all use.`,
        },
        {
          kind: "md",
          md: md`### The illustrative metric tree for Riyadh 01

North star: **working Arabic-first AI products demoed to people who can hire, fund or adopt them.** All targets are illustrative.

| Customer | Metric | Definition and source | Target | Owner |
|---|---|---|---|---|
| Builders | On-site builders | Checked in on day 1 (check-in export) | 120 | Events and Programming |
| Builders | Submission rate | Eligible submissions with working demo / teams formed | at least 80 % | Head of Engineering |
| Builders | Builder NPS | Post-event survey, at least 50 % response | at least 40 | Editorial |
| Sponsors | Tool adoption | Teams using at least one sponsor API or tool in the submission | at least 60 % | Head of Engineering |
| Sponsors | Opted-in profiles | Builders who ticked consent to share their profile with sponsors | at least 70 % of attendees | Partnerships |
| Sponsors | Report on time | Sponsor report delivered | within 14 days | Partnerships |
| Suhail | Newsletter opt-ins | New subscribers from applicants and attendees, with consent | at least 300 | Editorial |
| Suhail | Financial result | Actual surplus after all costs, contingency unspent counted | at least break-even | Finance Lead |
| Suhail | Contributors | Attendees who sign up to volunteer, mentor or organise | at least 10 | Events and Programming |`,
        },
        {
          kind: "question",
          question: {
            id: "sh10-l01-p1",
            type: "numeric",
            prompt: md`A venue in Cairo seats 200 builders. You expect a show-up rate of 0.55 for a free event and want to accept the strongest 50 % of applicants. How many applications do you need (round up)?`,
            answer: 728,
            unit: "applications",
            tolerance: { abs: 2 },
            explanation: md`Accepted $= 200 / 0.55 = 363.6$, so accept 364. Applications $= 364 / 0.50 = 728$. A lower show-up rate inflates every number upstream, which is why reconfirmation and a waitlist are cheaper than more marketing.`,
            concepts: ["sh10.attendance-funnel"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Writing the concept and the metric tree in practice",
      blocks: [
        {
          kind: "md",
          md: md`### How it is done

- **Who writes it.** You draft the concept and the metric tree; Events and Programming owns format and capacity; Partnerships checks that every sponsor benefit you plan to sell can be measured; Finance Lead checks that the headcount matches the budget. The concept is one page, so a volunteer, a host and a sponsor can all read it in two minutes.
- **What the page contains.** Name and date; city, venue type and capacity; format (daytime or overnight, solo or teams, tracks); theme and why now; who it is for and how they are selected; what builders get; what sponsors get; the north star and the metric tree; the team and owners; what is not yet confirmed.
- **Format choices for a first event.** Daytime over two days avoids overnight supervision, sleeping arrangements and extra security, and fits a host's normal opening hours. Teams of 3 to 4 with team formation on site gives 30 to 40 teams for 120 builders, which judges can still review properly. Tracks tied to sponsor tools give sponsors a reason to pay and builders a clearer brief.
- **Calendar.** In the worked plan, Ramadan 2027 is expected to start around 8 February and Eid al-Fitr around 10 March, with Eid al-Adha around 16 May (dates depend on moon sighting). Late April avoids all three. In Saudi Arabia the weekend is Friday and Saturday; plan Friday around Jumu'ah prayer and schedule prayer breaks on both days.
- **Reference model.** {Tech: Europe} runs free, approval-gated AI hackathons with Luma pages, partner credits and sponsor-funded prizes; its larger events have co-hosted with a university. Use it as a pattern, not as a promise of what Suhail will achieve.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How first-event concepts go wrong",
          md: md`**Vanity targets.** "1,000 registrations" says nothing about builders on site or projects shipped, and a sponsor will discount it. **Metrics set afterwards.** Choosing what to report after the event looks like spin, because it is. **Too big.** A first event at 300 people with no list and no past show-up data turns every number into a guess. **No consent design.** Promising sponsors "attendee data" without an opt-in at registration creates a legal and trust problem on day 1. **Invented numbers.** Suhail has no members, no events and no sponsors yet: every number in the concept is a target or an assumption and must say so.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Dated facts in this lesson",
          md: md`Funding figures come from MAGNiTT's FY2025 and H1 2026 reports as recorded in docs/research (November 2026); methods differ between MAGNiTT and Wamda. The {Tech: Europe} pattern is inferred from its public event pages and newsletter, not from the company. Islamic calendar dates for 2027 are astronomical estimates and are confirmed by moon sighting.`,
        },
        {
          kind: "checklist",
          title: "Concept page check before anyone sees it",
          items: [
            "City, venue type, capacity and date are stated, with what is confirmed and what is not.",
            "Every target is labelled as a target or assumption; no traction is implied.",
            "The attendance funnel is worked backwards from capacity and gives acceptances, applications and reach.",
            "Each customer (builders, sponsors, Suhail) has 2 to 4 metrics with definition, source, target and owner.",
            "Data sharing with sponsors is opt-in at registration and the concept says so.",
            "The format choice (daytime or overnight, team size, tracks) has a stated reason.",
          ],
        },
        { kind: "xref", to: "sh02-l01", note: "Hackathon goals and formats, and the {Tech: Europe} and MLH models: the design space this concept chooses from." },
        { kind: "xref", to: "sh02-l03", note: "The participant funnel in depth: registration, acceptance, no-shows and team formation." },
        { kind: "xref", to: "sh01-l05", note: "Community health metrics (active members, repeat rate, NPS): the Suhail side of the metric tree." },
        { kind: "xref", to: "sh01-l06", note: "The Arab context: cities, diaspora, language and event culture behind the city scores." },
        { kind: "xref", to: "sh06-l03", note: "MENA venture capital 2025 to 2026: how to read the funding numbers used in the sponsor-proximity score." },
        { kind: "xref", to: "fc03-l05", note: "Launch planning: tiers, sequencing and metrics. A first event is a launch; use the same discipline for the campaign that fills the funnel." },
        { kind: "xref", to: "fc05-l04", note: "Events and PR in Founder Core: general event marketing and press, which this capstone applies to a hackathon." },
        {
          kind: "question",
          question: {
            id: "sh10-l01-p2",
            type: "short",
            prompt: md`**Capstone artifact 1: the event concept.** For Suhail's first hackathon, write the one-page concept: (1) city and format with a weighted score and one sensitivity test; (2) date, venue type and capacity with the calendar reasoning; (3) theme and why now; (4) the attendance funnel worked back from capacity; (5) the metric tree: a north star and 2 to 4 metrics per customer with definition, source, target and owner. Label every number as illustrative or as a target.`,
            rubric: [
              "City and format are chosen with explicit weights and scores, and one sensitivity test shows whether the choice is robust.",
              "Date and capacity are concrete and justified (religious calendar, weekend, venue hours, daytime vs overnight).",
              "Attendance funnel is worked backwards correctly from capacity through show-up and acceptance to applications and reach, with an over-show rule.",
              "Metric tree has a north star and metrics for all three customers, each with definition, data source, numeric target and an owner from the lead roles.",
              "Sponsor data benefits rest on opt-in consent captured at registration.",
              "No invented members, sponsors, past events or results; every number labelled as target or illustrative.",
            ],
            modelAnswer: md`**Suhail Hack Riyadh 01 (all numbers illustrative targets).**

**City and format.** Weighted score (builders 0.25, sponsors 0.25, permits 0.20, team 0.15, cost 0.15): Riyadh 3.55, Dubai 3.45, Cairo 3.40, Kuwait City 3.05. With permits at 0.30 and sponsors at 0.15, Cairo leads (3.50); so the Riyadh choice rests on sponsor budgets, and the permit weakness is handled by holding the event at a licensed host who confirms permit obligations in writing. Format: two days, daytime only, teams of 3 to 4, three tracks (open, sponsor tools, Arabic language data).

**Date and venue.** Friday 23 and Saturday 24 April 2027: after Ramadan (expected from about 8 February) and Eid al-Fitr (about 10 March), before Eid al-Adha (about 16 May); Friday doors after Jumu'ah; prayer breaks both days. Host's hall, 120 seats, closes at 22:00, so no overnight.

**Theme.** Arabic-first AI agents: open Arabic models such as Jais 2 (open weights, December 2025) and Falcon-H1 Arabic (January 2026) make it possible to build Arabic products on open models, and builders need a place to show it.

**Funnel.** 120 seats / 0.65 show-up = 185 acceptances; / 0.40 acceptance = 463 applications; / 0.03 apply rate = about 15,400 reached, mostly through host and partner channels. Reconfirm at 72 hours, release to the waitlist, check-in cut-off at 120.

**Metric tree.** North star: working Arabic-first AI products demoed to people who can hire, fund or adopt them. Builders: 120 on site (Events), submission rate at least 80 % of teams (Head of Engineering), NPS at least 40 (Editorial). Sponsors: at least 60 % of teams use a sponsor tool (Head of Engineering), at least 70 % opted-in profiles via the registration consent box (Partnerships), report within 14 days (Partnerships). Suhail: at least 300 newsletter opt-ins (Editorial), at least break-even (Finance Lead), at least 10 new contributors (Events).`,
            explanation: md`A strong concept makes the rest of the capstone mechanical: capacity drives the budget, sponsor metrics drive the package, owners drive the team plan and the metric tree is the skeleton of the post-event report.`,
            concepts: ["sh10.capstone-artifacts", "sh10.success-metrics", "sh10.attendance-funnel", "sh10.city-choice", "sh10.three-customer-goals"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a new volunteer lead why we accept 185 people for 120 seats, and why we fixed the metrics before the event instead of after.",
          keyPoints: [
            "Free events have no-shows; on-site = accepted x show-up, so accepted = seats / show-up",
            "Reconfirmation, waitlist and a check-in cut-off handle the case where more people turn up",
            "Metrics fixed in advance, with definitions and owners, are credible to sponsors deciding on renewal",
            "Metrics chosen afterwards look like spin and teach the team nothing",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh10-l01-q1",
      type: "numeric",
      prompt: md`Capacity 90 builders, expected show-up 0.6. How many people should you accept (round up)?`,
      answer: 150,
      unit: "people",
      tolerance: { abs: 1 },
      explanation: md`$90 / 0.6 = 150$. Run a waitlist and reconfirm 72 hours before so that a higher show-up does not overfill the hall.`,
      concepts: ["sh10.attendance-funnel"],
      difficulty: 1,
    },
    {
      id: "sh10-l01-q2",
      type: "multi",
      prompt: md`Which of these are usable metrics for the sponsor side of the metric tree? Select all that apply.`,
      options: [
        "Share of teams using at least one sponsor API in the submission, from the submission form",
        "Number of builders who opted in to share their profile with sponsors, from the registration consent box",
        "Total impressions of all social posts mentioning the event",
        "Sponsor report delivered within 14 days",
        "Sponsors feeling positive about the event",
      ],
      answer: [0, 1, 3],
      explanation: md`Each correct option has a definition, a source and a target you can check. Impressions measure Suhail's reach, not what a sponsor bought, and "feeling positive" has no definition. Ask sponsors a scored question instead.`,
      concepts: ["sh10.success-metrics", "sh10.three-customer-goals"],
      difficulty: 1,
    },
    {
      id: "sh10-l01-q3",
      type: "mcq",
      prompt: md`Why does the worked plan choose a daytime two-day format instead of a 36-hour overnight hackathon for the first event?`,
      options: [
        "Overnight hackathons are banned in Saudi Arabia",
        "It fits the host's opening hours and removes overnight supervision, sleeping arrangements and extra security, at the cost of some hacking time",
        "Builders prefer shorter events",
        "Sponsors refuse to support overnight events",
      ],
      answer: 1,
      explanation: md`It is a risk and cost trade-off, not a rule. No source in the research says overnight events are banned. The format moves value between builders (more time) and the organiser (less risk and cost).`,
      concepts: ["sh10.three-customer-goals", "sh10.city-choice"],
      difficulty: 1,
    },
    {
      id: "sh10-l01-q4",
      type: "numeric",
      prompt: md`Weights: builders 0.3, sponsors 0.3, permits 0.2, cost 0.2. A city scores 4, 3, 4 and 2. What is its weighted score?`,
      answer: 3.3,
      tolerance: { abs: 0.01 },
      explanation: md`$0.3(4) + 0.3(3) + 0.2(4) + 0.2(2) = 1.2 + 0.9 + 0.8 + 0.4 = 3.3$.`,
      concepts: ["sh10.city-choice"],
      difficulty: 1,
    },
    {
      id: "sh10-l01-q5",
      type: "order",
      prompt: md`Put the capstone artifacts in build order.`,
      items: [
        "Event concept and metric tree",
        "Budget and P&L",
        "Sponsorship package, target list and pipeline forecast",
        "Run-of-show, team plan, risk register and permit plan",
        "Post-event report and next sponsorship round",
      ],
      explanation: md`Capacity and goals set the costs; the costs set what sponsorship must raise; the sold benefits and the budget set the run-of-show and risks; the metric tree and the sold benefits become the post-event report.`,
      concepts: ["sh10.capstone-artifacts"],
      difficulty: 1,
    },
    {
      id: "sh10-l01-q6",
      type: "decision",
      prompt: md`A volunteer drafts the concept page with "Suhail's community of 2,000 Arab AI builders" to impress sponsors. Suhail has not launched. What do you do?`,
      options: [
        { text: "Keep it; it is what you expect by April", score: 0, feedback: "It presents a forecast as fact. A sponsor who checks will discount everything else you say." },
        { text: "Replace it with the funnel target (about 460 applications and 120 builders on site, labelled as targets) and what Suhail will do to reach them, such as host and partner channels", score: 1, feedback: "Honest, specific and still useful to a sponsor: it says what they can expect and how you will get there." },
        { text: "Remove all numbers from the concept", score: 0.3, feedback: "Sponsors need a headcount to decide. Give targets, labelled." },
        { text: "Change it to 'a growing community'", score: 0.4, feedback: "Less false but vague; a labelled target is better." },
      ],
      explanation: md`Nothing has launched, so every number is a target or an assumption. Labelled targets plus a credible plan sell better than invented traction, and they survive diligence.`,
      concepts: ["sh10.success-metrics"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh10-l01-f1", front: "The six capstone artifacts", back: "Concept and goals; budget and P&L; sponsorship package, target list and pipeline; run-of-show and team plan; risk register and permits; post-event report and next round.", concepts: ["sh10.capstone-artifacts"] },
    { id: "sh10-l01-f2", front: "Attendance funnel", back: md`$N_{\text{site}} = N_{\text{app}} \cdot a \cdot s$; work backwards: accepted $= $ seats $/ s$, applications $=$ accepted $/ a$.`, concepts: ["sh10.attendance-funnel"] },
    { id: "sh10-l01-f3", front: "The three customers of a hackathon", back: "Builders (learn, ship, be seen), sponsors (adoption, hiring, brand), Suhail (members, reputation, margin).", concepts: ["sh10.three-customer-goals"] },
    { id: "sh10-l01-f4", front: "What makes a metric usable", back: "Definition, data source, numeric target, owner, fixed before the event.", concepts: ["sh10.success-metrics"] },
    { id: "sh10-l01-f5", front: "Worked plan headline numbers", back: "Riyadh, Fri 23 to Sat 24 April 2027, 120 seats, 185 acceptances, about 463 applications, about 15,400 reached (illustrative).", concepts: ["sh10.attendance-funnel", "sh10.city-choice"] },
    { id: "sh10-l01-f6", front: "Weighted score for a city", back: md`$S = \sum_j w_j x_j$ with $\sum w_j = 1$; always test a weight shift, because the ranking can flip.`, concepts: ["sh10.city-choice"] },
  ],
};

export default lesson;
