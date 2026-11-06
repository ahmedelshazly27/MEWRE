import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc05-l04",
  title: "Events and PR",
  summary:
    "Trade show economics with full cost and cost per qualified lead, why speaking and pre-booked meetings often beat a booth for a startup, how to run an event for qualified conversations, and how PR really works: what is news, the press release format, embargoes and exclusives, working with journalists, and announcing nothing about a partner without their written approval.",
  minutes: 75,
  objectives: [
    "You can compute the full cost, cost per qualified lead, expected pipeline and ROI of an event option",
    "You can choose between a booth, a talk, a hosted dinner, a walking pass with pre-booked meetings and an own event",
    "You can judge whether something is news for a given outlet and write a press release in the standard structure",
    "You can run an embargo or an exclusive correctly and handle a journalist's call about something not yet public",
  ],
  concepts: [
    { id: "fc05.cpql", name: "Cost per qualified lead (CPQL)", description: "Full cost of an activity, including staff time, divided by the leads meeting written qualification criteria. The comparable unit across events, content and outbound.", competency: "fc-marketing", related: ["fc05.content-economics"] },
    { id: "fc05.event-portfolio", name: "Event portfolio", description: "Choosing among booth, speaking slot, hosted dinner or workshop, walking pass with pre-booked meetings and own events by CPQL, audience fit and team time, not by visibility.", competency: "fc-marketing", related: ["fc05.cpql"] },
    { id: "fc05.speaking", name: "Speaking as marketing", description: "A technical talk at the right conference puts founders in front of a pre-selected audience as experts; the value is captured only with a follow-up path (slides, paper, meetings).", competency: "fc-marketing" },
    { id: "fc05.newsworthiness", name: "Newsworthiness", description: "What makes a story news for a specific outlet: new, significant to its readers, concrete (numbers, named parties), timely, and verifiable. Funding and named customers are news; product updates rarely are.", competency: "fc-marketing" },
    { id: "fc05.press-release", name: "Press release structure", description: "Headline, dateline, lede with who, what, when, where and why, supporting facts, one or two real quotes, boilerplate and media contact. Written so a journalist can lift paragraphs.", competency: "fc-marketing", related: ["fc05.newsworthiness"] },
    { id: "fc05.embargo", name: "Embargo and exclusive", description: "An embargo is an agreement that a journalist receives information early but publishes only after a set time; an exclusive gives one outlet the story first. Both must be agreed before sending the information.", competency: "fc-marketing", related: ["fc05.press-release"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Event economics and how PR works",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Hardware test leads, robotics engineers, plant operators and Gulf officials still decide a lot face to face, and trade fairs, conferences and majlis-style gatherings are where that happens. But a booth at a large industrial fair can cost a month of runway for a small team, and a press announcement made before a partner like KISR approves it can damage the relationship that the announcement was meant to celebrate. You need the maths to choose events and the discipline to handle press.`,
        },
        {
          kind: "md",
          md: md`### The full cost of an event

Founders count the stand and forget the people. The full cost is:`,
        },
        { kind: "equation", formula: "fc05-event-cost" },
        {
          kind: "md",
          md: md`and the comparable output is not badge scans but **qualified leads**: people who meet criteria you wrote before the event (for Afterwave: works in test or validation, at a company building robots, drives, batteries or autonomous machines, has a change and regression problem, could start a pilot within 12 months).`,
        },
        { kind: "equation", formula: "fc05-cpql" },
        { kind: "equation", formula: "fc05-event-pipeline" },
        {
          kind: "md",
          md: md`### Booth vs talk vs walking the floor

A booth buys visibility to whoever walks past. A talk buys 30 minutes of attention from a room that self-selected for your topic, and positions the founders as experts. A walking pass with **meetings booked in advance** buys conversations with exactly the people you chose. For a three-person startup with a narrow audience, the last two usually win on CPQL; a booth becomes worthwhile when you have a demo that must be seen in person, a broad enough audience at that show, and the team to staff it without stopping selling.`,
        },
        {
          kind: "chart",
          chart: "bar",
          title: "Cost per qualified lead by event option (illustrative, EUR)",
          xKey: "option",
          xLabel: "Event option",
          yLabel: "EUR per qualified lead",
          series: [{ key: "cpql", label: "Cost per qualified lead" }],
          data: [
            { option: "Booth at major fair", cpql: 1583 },
            { option: "Talk plus hosted dinner", cpql: 1011 },
            { option: "Walking pass, pre-booked meetings", cpql: 567 },
            { option: "Joint webinar", cpql: 300 },
          ],
          caption: "Illustrative numbers from the worked examples. Cheaper is not automatically better: a webinar gives fewer, colder leads, and a demo of physical hardware may need a booth. Compare CPQL together with lead volume and quality.",
        },
        {
          kind: "md",
          md: md`### What journalists treat as news

A journalist's job is to serve their readers, not you. A story is news to a given outlet when it is **new, significant to that outlet's readers, concrete, timely and verifiable**. Rough guide for a startup:

| Usually news | Sometimes news | Rarely news |
|---|---|---|
| Funding round with named investors | A named customer or pilot with a recognisable organisation | Product feature updates |
| Original data on a problem readers care about | A regulatory angle (EU Machinery Regulation readiness) | Awards you applied for |
| A government or major industry partnership, confirmed by the partner | A founder's expert view on a breaking story | "We are excited to announce" anything vague |

Trade and regional press (robotics and test-engineering publications for Afterwave; Gulf business and energy press and Kuwaiti dailies for Mizan) are more realistic targets than general national media, and often more valuable because the readers are your buyers.

### The press release

The format exists so a busy journalist can verify and lift content quickly:

1. **Headline:** the news in one line, no adjectives.
2. **Dateline:** city and date ("AMSTERDAM, 12 March 2027").
3. **Lede:** who did what, when, where and why it matters, in one or two sentences.
4. **Body:** supporting facts and numbers, context, what happens next.
5. **Quotes:** one from you, one from a partner or customer if they approved it; quotes should say something a fact cannot (why, what it means), not "we are thrilled".
6. **Boilerplate:** a fixed paragraph about the company.
7. **Media contact:** a real name, email and phone answered that day.

### Embargoes and exclusives`,
        },
        {
          kind: "flow",
          title: "Running an embargoed announcement",
          steps: [
            { label: "Partner approval", detail: "Written sign-off on the text, quotes and timing from every named party (customer, investor, KISR)." },
            { label: "Ask first", detail: "Email the journalist: a one-line description of the story and \"would you accept this under embargo until 09:00 CET on 12 March?\" Send nothing substantive until they agree." },
            { label: "Send under embargo", detail: "Release marked EMBARGOED UNTIL [time, time zone], plus assets (photos, data, spokesperson availability)." },
            { label: "Briefings", detail: "Interviews before the embargo lifts, so stories can be ready at the time." },
            { label: "Embargo lifts", detail: "Publish on your site and channels at the same time; share the coverage." },
          ],
          caption: "An embargo is an agreement of trust, not a legal contract. A journalist who never agreed is not bound by an 'embargoed' label on an unsolicited email. An exclusive (one outlet gets it first) is a different deal; do not offer both on the same story without saying so.",
        },
        {
          kind: "md",
          md: md`Two definitions to agree explicitly, because outlets use them differently: **"off the record"** (usually: not to be published at all) and **"on background"** (usually: can be used without naming you). Never assume; say "this part is not for publication, agreed?" and wait for a yes. The safest rule for a founder: say nothing you would not want to read in print.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Choosing Afterwave's event options and a Mizan breakfast",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Booth vs talk plus dinner at a European industrial fair",
          given: md`Illustrative. **Option 1, booth:** 18 m² at EUR 350/m², stand build and demo shipping EUR 9,000, travel EUR 4,500, 3 people for 4 days at EUR 600 per person-day, promotion EUR 1,500. Result: 220 badge scans, 18 qualified. **Option 2, talk plus dinner:** 2 conference passes at EUR 600, travel 2 at EUR 1,500, 2 people for 2 days at EUR 600, hosted dinner for 10 invited test leads EUR 2,500. Result: 9 qualified. For both: 30% of qualified leads become opportunities, pilot ACV EUR 60,000, win rate 25%, gross margin 80%.`,
          steps: [
            { md: md`**Booth cost:** $18 \times 350 + 9{,}000 + 4{,}500 + 3 \times 4 \times 600 + 1{,}500 = 6{,}300 + 9{,}000 + 4{,}500 + 7{,}200 + 1{,}500 = $ **EUR 28,500**.` },
            { md: md`**Booth CPQL:** $28{,}500/18 = $ **EUR 1,583** (and EUR 130 per badge scan, which is the number vendors will quote you).` },
            { md: md`**Booth pipeline and bookings:** $P = 18 \times 0.30 \times 60{,}000 = $ EUR 324,000; $B = 0.25 \times 324{,}000 = $ EUR 81,000; gross profit $0.8 \times 81{,}000 = 64{,}800$; ROI $= (64{,}800 - 28{,}500)/28{,}500 = 1.27$.` },
            { md: md`**Talk plus dinner cost:** $2 \times 600 + 2 \times 1{,}500 + 2 \times 2 \times 600 + 2{,}500 = 1{,}200 + 3{,}000 + 2{,}400 + 2{,}500 = $ **EUR 9,100**; CPQL $= 9{,}100/9 = $ **EUR 1,011**.` },
            { md: md`**Talk pipeline:** $P = 9 \times 0.30 \times 60{,}000 = $ EUR 162,000; $B = $ EUR 40,500; gross profit EUR 32,400; ROI $= (32{,}400 - 9{,}100)/9{,}100 = 2.56$.` },
            { md: md`**Team time:** the booth consumes 12 person-days, the talk 4. For a three-person company, 8 extra person-days is most of a week of all-hands selling and building.` },
          ],
          result: md`Talk plus dinner: lower CPQL, roughly double the ROI, a third of the team time, and expert positioning. The booth only wins if the physical demo is decisive or the show's audience is unusually concentrated in your buyers.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Mizan technical breakfast for O&M managers in Kuwait City",
          given: md`Illustrative. A breakfast briefing on soiling losses and cleaning economics: venue and catering KWD 900, printed material KWD 150, 2 people for 1 day at KWD 150 per person-day, invitations and promotion KWD 250. 30 attendees, 8 meet the qualification criteria (asset or O&M decision-maker at an operating or near-operating plant). Assume 1 KWD = 3.25 USD.`,
          steps: [
            { md: md`Full cost $= 900 + 150 + 2 \times 1 \times 150 + 250$.` },
            { md: md`= **KWD 1,600**.`, hidden: true, check: { prompt: "Full cost (KWD)", answer: 1600, unit: "KWD", tolerance: { abs: 1 } } },
            { md: md`CPQL $= 1{,}600/8$.` },
            { md: md`= **KWD 200** per qualified lead.`, hidden: true, check: { prompt: "CPQL (KWD)", answer: 200, unit: "KWD", tolerance: { abs: 0.5 } } },
            { md: md`In USD: $200 \times 3.25 = 650$ USD per qualified lead.` },
          ],
          result: md`A small, well-targeted own event can beat a regional energy exhibition on CPQL, because every seat is chosen. In the Gulf, the personal invitation (often a call, not only an email) is what fills the room.`,
        },
        {
          kind: "question",
          question: {
            id: "fc05-l04-p1",
            type: "numeric",
            prompt: md`A walking pass with pre-booked meetings: pass EUR 100, travel EUR 1,500, 1 person for 3 days at EUR 600 per person-day. It yields 6 qualified leads. What is the CPQL? (EUR, nearest whole number)`,
            answer: 567,
            tolerance: { abs: 1 },
            unit: "EUR",
            explanation: md`Cost $= 100 + 1{,}500 + 3 \times 600 = 3{,}400$ EUR; CPQL $= 3{,}400/6 = 567$ EUR. The work is in the weeks before: identifying exhibitors and visitors who fit and booking 20-minute meetings.`,
            concepts: ["fc05.cpql", "fc05.event-portfolio"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running events and press in practice",
      blocks: [
        {
          kind: "md",
          md: md`### Event playbook (any format)

- **Eight weeks before:** write qualification criteria; list 30 to 50 target people attending (exhibitor lists, speaker lists, LinkedIn); request meetings.
- **During:** short conversations, qualify with three questions (role, current problem, timeline), log notes the same day in the CRM.
- **Within 48 hours:** personal follow-up to every qualified lead referencing the conversation, with one relevant asset (the whitepaper, the app note).
- **Within two weeks:** compute CPQL and opportunities; decide whether to return next year.

### Speaking

Submit talks that teach (a method, data, a failure story), not product pitches; programme committees reject pitches and audiences forget them. Bring a follow-up path: a link to the paper and slides, an offer to review attendees' change-impact problems. Ismail and Yusuf's validation experience makes them credible speakers at test and reliability conferences.

### Relevant venues to evaluate

For Afterwave: large industrial and automation fairs (Hannover Messe), robotics and automation shows (automatica in Munich, Automate in the US), battery and e-mobility shows (The Battery Show Europe), and test and validation conferences where the audience is exactly test engineers. For Mizan: regional energy events in Abu Dhabi and Dubai (World Future Energy Summit, Middle East Energy, Intersolar Middle East), plus Kuwait-based conferences and your own briefings. For Suhail: the events are the product (its own hackathons, Suhail Season).

### PR roles and channels

- **You** are the spokesperson. A PR agency is rarely worth a monthly retainer at seed stage; a freelancer for one funding announcement can be.
- **Media list:** 15 to 30 named journalists who have written about your space in the last year, not a bought list of thousands.
- **Kuwait and the Gulf:** official announcements involving government bodies usually come from the body itself (often via KUNA, the state news agency), in Arabic first. Your role is to supply facts and quotes to their communications team and follow their timing.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Check event facts before you budget",
          md: md`Cadence (annual or biennial), dates, venues and space rates for trade fairs change from year to year; some shows moved from biennial to annual schedules recently. The EUR 350/m² space rate and other costs in this lesson are illustrative. Check the organiser's current exhibitor pages and ask about start-up pavilions, which are often much cheaper than standard space.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Counting badge scans.** A booth that scans 220 people and qualifies 18 has a CPQL of EUR 1,583, not EUR 130.
- **No follow-up within 48 hours.** Most event leads go cold in the first week; a slow follow-up wastes the whole spend.
- **Announcing before approval.** Naming a pilot partner, investor or government body before written approval can end the relationship. With KISR or any ministry, approval of the text and the timing is theirs.
- **Breaking an embargo or offering a fake exclusive.** Journalists remember, and they talk to each other.
- **Press release about nothing.** "Startup launches innovative platform" teaches journalists to ignore your next email.
- **Off-the-record assumptions.** If the terms were not agreed before you spoke, assume everything is on the record.`,
        },
        { kind: "sources", refs: ["fc05-r16", "fc05-r17", "fc05-r10"] },
        {
          kind: "checklist",
          title: "Before an announcement goes out",
          items: [
            "Is it news for this specific outlet's readers?",
            "Every named party has approved text, quotes and timing in writing",
            "Embargo or exclusive agreed with each journalist before sending details",
            "Facts verifiable: numbers with sources, no superlatives",
            "Spokesperson available on the day; website and channels ready at embargo time",
            "Arabic version prepared and reviewed for Gulf audiences (MSA, not machine translation)",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask a journalist before an interview",
          items: [
            "What is the angle of the piece, and who else are you speaking to?",
            "Is this on the record? If I want to give background, how will you use it?",
            "What is your deadline, and will you check technical facts or quotes with me?",
            "Would you like data or images to go with the story?",
          ],
        },
        { kind: "xref", to: "m13-l03", note: "Presenting to senior officials: the same preparation discipline applies to a conference talk in front of Gulf government audiences." },
        {
          kind: "question",
          question: {
            id: "fc05-l04-p2",
            type: "short",
            prompt: md`Assume (hypothetically) that Afterwave decides to release its capture reader as open source. Produce: (1) a press release of 250 to 350 words in the standard structure, with placeholders in square brackets for anything not yet true (dates, quotes not yet approved, links); and (2) a five-line embargo pitch email to a named type of journalist (for example, a robotics trade publication editor). Do not invent customers, users or numbers.`,
            rubric: [
              "Headline states the news plainly with no superlatives; dateline present",
              "Lede answers who, what, when, where and why in one or two sentences; why it matters to test engineers is concrete",
              "Quote from the CEO says something a fact cannot (why open, what it changes) rather than 'excited'",
              "Boilerplate and a real media contact block; placeholders used for unconfirmed facts; no invented traction",
              "Pitch email asks for embargo agreement before sending details, states the embargo time with time zone, and explains relevance to that outlet's readers",
              "Length and structure would let a journalist lift paragraphs directly",
            ],
            modelAnswer: md`**Afterwave releases open-source reader for synchronised rig and screen test data**

AMSTERDAM, [date]: Afterwave, a company building test infrastructure for physical AI, today released [name], an open-source toolkit that loads test captures in which rig signals from data acquisition and on-screen operator actions share one clock. The toolkit is available under the Apache-2.0 licence at [link].

Hardware test teams in robotics, drives and batteries typically record rig signals and software or screen events in separate tools with separate clocks, which makes it slow to reconstruct what happened during a test and hard to use the data for training models. [Name] reads Lockstep captures and imports common DAQ formats, aligns them on a single timeline and plots them in a few lines of Python.

"Test data is only useful if you can trust when things happened," said [CEO name], CEO of Afterwave. "We are opening the reader so any test engineer can inspect the format and use it without asking us, and so the data they capture stays theirs."

The release includes a tutorial with sample data, reference documentation of the capture format and importers for [formats]. Afterwave's commercial products, Afterwave Enclave (a private environment on customer servers) and Ripple (change-impact analysis), build on the same format.

**About Afterwave:** Afterwave builds test infrastructure for physical and embodied AI: capture, private compute and change impact for hardware test teams. It was founded by [names and one-line backgrounds].

**Media contact:** [name], [email], [phone].

**Pitch email:** Subject: Embargo request: open-source tool for synchronised hardware test data. Hi [name], you covered [their recent article] on robot validation. On [date] we are releasing an open-source reader that puts rig signals and operator screen actions on one clock, aimed at test engineers. Would you accept the release and a short briefing under embargo until [09:00 CET, date]? I will send details only once you confirm.`,
            explanation: md`A release about an open-source tool is modest news, best suited to trade press. The discipline is the point: plain headline, verifiable facts, placeholders instead of invention, and embargo terms agreed before sending.`,
            concepts: ["fc05.press-release", "fc05.embargo", "fc05.newsworthiness"],
            difficulty: 2,
          },
        },
        { kind: "scenario", scenario: "fc05-s2" },
      ],
    },
  ],
  quiz: [
    {
      id: "fc05-l04-q1",
      type: "numeric",
      prompt: md`An event costs EUR 15,000 in total and produces 120 badge scans, of which 10 are qualified. What is the cost per qualified lead? (EUR)`,
      answer: 1500,
      tolerance: { abs: 1 },
      unit: "EUR",
      explanation: md`$15{,}000/10 = 1{,}500$ EUR. Cost per scan (EUR 125) is irrelevant to the decision.`,
      concepts: ["fc05.cpql"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc05-l04-q2",
      type: "numeric",
      prompt: md`12 qualified leads, 25% become opportunities, ACV EUR 50,000, win rate 30%. What are the expected bookings? (EUR)`,
      answer: 45000,
      tolerance: { abs: 10 },
      unit: "EUR",
      explanation: md`$P = 12 \times 0.25 \times 50{,}000 = 150{,}000$; $B = 0.30 \times 150{,}000 = 45{,}000$ EUR.`,
      concepts: ["fc05.cpql"],
      difficulty: 2,
    },
    {
      id: "fc05-l04-q3",
      type: "order",
      prompt: "Order the parts of a standard press release from top to bottom.",
      items: ["Headline", "Dateline", "Lede (who, what, when, where, why)", "Supporting facts and quotes", "Boilerplate", "Media contact"],
      explanation: md`Inverted pyramid: the most important information first, so the release still works when cut from the bottom.`,
      concepts: ["fc05.press-release"],
      difficulty: 1,
    },
    {
      id: "fc05-l04-q4",
      type: "mcq",
      prompt: "When is a journalist bound by an embargo?",
      options: [
        "Whenever the email says EMBARGOED in the subject",
        "Only when they agreed to the embargo terms before receiving the information",
        "Always, because embargoes are legally enforceable contracts",
        "Only for government announcements",
      ],
      answer: 1,
      explanation: md`An embargo is an agreement of trust. Ask first, send after a yes.`,
      concepts: ["fc05.embargo"],
      difficulty: 1,
    },
    {
      id: "fc05-l04-q5",
      type: "multi",
      prompt: "Which are likely to be news for a robotics trade publication? (Select all that apply.)",
      options: [
        "A seed round with named investors",
        "Original data on how often regressions slip through after firmware changes, with method",
        "A new colour scheme for the dashboard",
        "A named robotics company running a pilot, confirmed by them",
        "\"Startup launches innovative AI platform\"",
      ],
      answer: [0, 1, 3],
      explanation: md`New, concrete, verifiable and relevant to readers. Cosmetic updates and vague launches are not news.`,
      concepts: ["fc05.newsworthiness"],
      difficulty: 1,
    },
    {
      id: "fc05-l04-q6",
      type: "decision",
      prompt: md`You have one person-week and EUR 10,000 for a European robotics show. Your physical demo is not portable yet. What is the best option?`,
      options: [
        { text: "Book the smallest booth and show slides on a screen.", score: 0.2, feedback: "A booth without a demo buys visibility you cannot convert, and it eats most of the budget and the week." },
        { text: "Submit a technical talk, buy a walking pass for a second founder, pre-book 15 meetings and host a small dinner for test leads.", score: 1, feedback: "Best CPQL, expert positioning, and conversations with chosen people." },
        { text: "Skip the show entirely.", score: 0.3, feedback: "Possible, but you lose the densest gathering of your buyers this year." },
      ],
      explanation: md`Booths win when a physical demo must be seen; otherwise talks and pre-booked meetings dominate on CPQL and team time.`,
      concepts: ["fc05.event-portfolio", "fc05.speaking"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "fc05-l04-f1", front: "CPQL formula", back: md`$\text{CPQL} = C_{\text{event}}/N_q$, with full cost including staff time and written qualification criteria.`, concepts: ["fc05.cpql"] },
    { id: "fc05-l04-f2", front: "The cost founders forget at events", back: "Staff time: people times days times cost per person-day.", concepts: ["fc05.cpql"] },
    { id: "fc05-l04-f3", front: "Follow-up window after an event", back: "48 hours, personal, referencing the conversation, with one relevant asset.", concepts: ["fc05.event-portfolio"] },
    { id: "fc05-l04-f4", front: "Press release lede", back: "Who did what, when, where and why it matters, in one or two sentences.", concepts: ["fc05.press-release"] },
    { id: "fc05-l04-f5", front: "Embargo vs exclusive", back: "Embargo: several outlets get it early, publish at a set time. Exclusive: one outlet gets it first. Agree either before sending.", concepts: ["fc05.embargo"] },
    { id: "fc05-l04-f6", front: "Five tests of newsworthiness", back: "New, significant to that outlet's readers, concrete, timely, verifiable.", concepts: ["fc05.newsworthiness"] },
    { id: "fc05-l04-f7", front: "Who announces a partnership with a Kuwaiti government body?", back: "Usually the body itself, through its communications team (often via KUNA), on its timing. You supply facts and quotes.", concepts: ["fc05.press-release"] },
  ],
  scenarios: [
    {
      id: "fc05-s2",
      title: "The journalist asks about the Shagaya pilot",
      dayInLife: true,
      context: md`A reporter from a Gulf energy and business publication calls you. She has heard "from people at a conference" that Mizan is running a soiling analytics pilot at Shagaya with KISR, and she wants a quote for a piece on AI in Gulf solar O&M due tomorrow. The pilot is still being prepared; nothing is signed or approved for publication.`,
      start: "a",
      concepts: ["fc05.embargo", "fc05.newsworthiness", "fc05.press-release"],
      nodes: {
        a: {
          md: md`What do you say first?`,
          choices: [
            { text: "\"Yes, we are working with KISR at Shagaya, it is very exciting.\"", score: 0, feedback: "You have just announced an unsigned partnership with a government research body without its approval. This is the worst outcome.", next: "c" },
            { text: "\"I cannot comment on any specific project or partner. I am happy to talk on the record about how soiling losses are measured and why cleaning on a calendar wastes money in Kuwait.\"", score: 10, feedback: "Neither confirms nor denies, protects the relationship, and still gives her something useful and gives Mizan visibility as an expert.", next: "b" },
            { text: "\"Off the record, yes, but please do not print it.\"", score: 2, feedback: "Off the record was not agreed before you spoke, and even if it were, you have confirmed a fact that is not yours to confirm.", next: "c" },
          ],
        },
        b: {
          md: md`She presses: "So you are not denying it?" and adds that she will write that Mizan "is understood to be working at Shagaya".`,
          choices: [
            { text: "Repeat calmly that you do not comment on specific projects or partners, offer the expert interview, then inform your KISR counterparts the same day that a journalist is asking.", score: 10, feedback: "Consistent, honest, and your partner hears it from you first, not from the article." },
            { text: "Ask her to send the article for your approval before publication.", score: 3, feedback: "Journalists rarely grant approval rights; asking signals you have something to hide. Offering to check technical facts is acceptable." },
          ],
        },
        c: {
          md: md`The piece runs the next morning naming KISR and Shagaya. Your KISR counterpart calls, unhappy that the institute's name appeared before any approval.`,
          choices: [
            { text: "Apologise without excuses, explain exactly what you said, agree a communications protocol (no comment on partners without written approval), and offer to help with any correction they want.", score: 5, feedback: "Damage limitation. Trust is partly lost; the protocol you should have had from the start now exists." },
          ],
        },
      },
    },
  ],
};

export default lesson;
