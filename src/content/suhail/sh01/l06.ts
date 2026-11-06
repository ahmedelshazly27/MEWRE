import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh01-l06",
  title: "The Arab context: cities, diaspora, language, event culture and what transplants from Europe",
  summary:
    "Suhail is modelled partly on {Tech: Europe}, but the Arab world is not a set of European cities with warmer weather. This lesson profiles the eight cities that matter (Riyadh, Dubai, Abu Dhabi, Doha, Kuwait, Cairo, Amman, Beirut) by builder pool, capital, institutions and event constraints; covers the diaspora as a resource; sets a language policy across English, Modern Standard Arabic and dialects; and works through event culture (majlis and diwaniya, Ramadan, weekends, permits, channels). It ends with a transplant test for each European mechanism and a weighted city choice.",
  minutes: 85,
  objectives: [
    "You can describe the role each of eight Arab cities can play in Suhail, with dated facts and stated uncertainty",
    "You can explain how the diaspora can be a bridge rather than a loss, and design formats for it",
    "You can set a language policy for events, newsletter and podcast across English, MSA and dialect",
    "You can plan an event calendar around Ramadan, weekends, summer and permits",
    "You can apply a transplant test to European community mechanisms and choose launch cities with a weighted score and a sensitivity check",
  ],
  concepts: [
    { id: "sh01.city-roles", name: "City roles in the Arab ecosystem", description: "Each city offers a different mix: capital and government programmes (Riyadh), regional HQs and event logistics (Dubai), AI research institutions (Abu Dhabi, Doha), talent depth (Cairo, Amman), diaspora and design talent (Beirut), a close-knit home network (Kuwait).", competency: "sh-community" },
    { id: "sh01.diaspora", name: "Diaspora as a bridge", description: "Arab builders working in other Gulf cities, Europe and North America carry skills, capital and networks; online formats and diaspora chapters turn emigration from a loss into a link.", competency: "sh-community", related: ["sh01.city-roles"] },
    { id: "sh01.language-register", name: "Language policy", description: "English for code and technical sessions, Modern Standard Arabic for formal and written institutional communication, dialects (Gulf, Egyptian, Levantine) for podcast and community voice; bilingual by default.", competency: "sh-community", related: ["fc05.arabic-register"] },
    { id: "sh01.event-culture", name: "Arab event culture", description: "Hospitality traditions (majlis, diwaniya), Ramadan and Eid timing, different weekends, summer heat and travel, permits in Saudi Arabia, personal invitations and WhatsApp as the main channel.", competency: "sh-community", related: ["sh01.rituals"] },
    { id: "sh01.transplant-test", name: "Transplant test", description: "For each mechanism borrowed from another ecosystem, checking whether the conditions that make it work exist locally, and adopting, adapting or rejecting it accordingly.", competency: "sh-community", related: ["sh01.builder-community-model"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Eight cities, one diaspora, three registers and a different calendar",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You know Kuwait and the Netherlands from the inside, and {Tech: Europe} from the outside. Suhail's leads, sponsors and members will be spread across Gulf, Egyptian and Levantine cities with different money, rules, calendars and expectations of a host. Getting the city order, the language and the calendar right in 2027 matters more than any feature of the community platform.`,
        },
        {
          kind: "md",
          md: md`### The cities

Dated facts come from the research brief (Nov 2026); general characterisations are well known but should be checked locally before you rely on them.

| City | Builder pool | Capital and programmes | AI and institutions | Event notes |
|---|---|---|---|---|
| **Riyadh** | Large, young, growing fast; strong government pull | KSA led the Middle East in 2025 (MAGNiTT: USD 1.72bn), but only USD 219M across 72 deals in H1 2026. SVC, Jada Fund of Funds, Sanabil 500, F6's sixth Riyadh seed programme (60 startups, USD 17M, Jan 2026) | HUMAIN (ALLaM), SDAIA, the BALSAM benchmark | Public or ticketed events need a GEA permit; conferences fall under SCEGA; hackathon rule unclear. Large set-piece conferences (for example LEAP) |
| **Dubai** | Large expat and regional builder pool | Regional HQs, many funds and corporates; the UAE took 66 % of MENA funding in H1 2026 (USD 895M, MAGNiTT) | Corporate AI teams, regional offices of global firms | Easiest logistics; very crowded event calendar, so quality must stand out |
| **Abu Dhabi** | Research-heavy, smaller startup pool | Hub71 (Access Programme terms per secondary sources), MGX, Mubadala | MBZUAI, TII (Falcon), G42 and Inception (Jais 2, open weights, Dec 2025), Stargate UAE under construction | Strong research audience for the research arm; government and sovereign partners |
| **Doha** | Smaller, concentrated | QIA; Qai (national AI company, Dec 2025) and a USD 20bn AI-infrastructure JV with Brookfield | QCRI and HBKU (Fanar) | Institution-led; partnerships matter more than open calls |
| **Kuwait City** | Small, close-knit, many engineers in government and banks | Private wealth, smaller VC activity | Microsoft partnership for an Azure region and AI hub (Mar 2025); no national open-weight LLM found | Diwaniya culture; personal networks decide attendance; your home base |
| **Cairo** | Deepest talent pool in the region | Algebra Ventures; F6 Group (formerly Flat6Labs) originated in Cairo | Large university system; offshoring exports about USD 5.2bn in 2025 and about 750K graduates a year | Lower costs; strong developer communities; travel and payment friction for Gulf sponsors |
| **Amman** | Strong developers and Arabic content talent | Smaller funds; long-running accelerators (Oasis500) | Engineering teams of regional tech companies | Cost-effective, good for build seasons and remote talent |
| **Beirut** | Highly educated, multilingual, much of it now abroad | Funding collapsed with the banking crisis from 2019; earlier the central bank's Circular 331 (2013) channelled bank capital into startups | Design, product and engineering talent | Run with care for local conditions; diaspora formats matter most |`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Check before relying on these",
          md: md`Whether a free, invite-only hackathon in Saudi Arabia needs a GEA or SCEGA permit is unverified (research brief); confirm with the authorities or a local venue partner before announcing. Current Hub71 package figures could not be checked on hub71.com. Stargate UAE's operational status in November 2026 is unverified. Funding figures differ between MAGNiTT and Wamda because of method (Wamda appears to include debt): always name the source and period.`,
        },
        {
          kind: "md",
          md: md`### The diaspora: a bridge, not only a loss

Large numbers of Arab engineers and researchers work outside their home country: Egyptians, Jordanians, Lebanese and Syrians across the Gulf, and Arab builders in Europe and North America. Emigration data was not found for the research brief, so treat specific numbers with caution; the pattern is well known.

Three ways Suhail can use it:

1. **Online formats that do not depend on geography**: build nights, The Majlis, a newsletter with diaspora authors.
2. **Diaspora chapters later** (for example London, Berlin, Amsterdam) that run occasional events and connect people to roles and founders in the region. You are based partly in the Netherlands, which makes Amsterdam a natural test.
3. **Return paths**: people abroad often want a way back in (advising, angel investing, joining a startup, research collaboration). Make those paths visible.

### Language policy

| Context | Language | Why |
|---|---|---|
| Code, technical talks, documentation | **English** (Arabic welcome) | Working language of software; sponsors' engineers |
| Formal communication with governments, universities, sovereign partners | **Modern Standard Arabic**, with English | Respect and seriousness; official records |
| Newsletter | **Bilingual**, Arabic and English, or separate editions | Reach and identity; Arabic content is scarce |
| The Majlis podcast, community voice | **Dialect** (Gulf, Egyptian, Levantine as fits the guest) with mixed English terms | Closeness and authenticity |
| Research arm | Arabic as the subject: dialect coverage, benchmarks, datasets | Suhail's long-term differentiator |

The policy is "bilingual by default, register by context". An Arabic-first builder community is itself a statement in a field where most technical content is in English.

### Event culture

- **Hospitality.** The majlis and the diwaniya are centuries-old formats for regular, open-door gatherings with a host. A good host is judged by welcome, food and coffee, and by who else is in the room. Suhail can borrow the format directly: The Majlis podcast, and small recurring evening sessions with a host.
- **Ramadan and Eid.** Daytime energy drops and evenings come alive. Events move to after iftar or late evening; suhoor gatherings are a natural format. Ramadan 2027 is expected around 8 February to 9 March, with Eid al-Fitr around 9 to 10 March and Eid al-Adha around mid-May, depending on moon sighting.
- **Weekends.** Saudi Arabia, Kuwait, Qatar, Egypt and Jordan have Friday and Saturday weekends; the UAE moved to Saturday and Sunday (with a short Friday for government) from January 2022. A Saturday hackathon works almost everywhere; a Friday daytime one does not.
- **Summer.** July and August bring extreme heat in the Gulf and heavy travel. Plan the main season from October to May.
- **Channels.** WhatsApp groups and personal invitations carry more weight than public posts; Luma pages work for registration, but the invite that fills the room is usually a personal message.
- **Mixed events.** Mixed-gender professional events are now normal in the main Gulf cities; still provide comfortable logistics (prayer rooms, family-friendly hours, women-focused sessions where useful) and a strong code of conduct.
- **Status and patronage.** Senior officials or well-known founders attending lends credibility; it also brings protocol. Decide in advance which events are for builders and which are for visibility.`,
        },
        {
          kind: "md",
          md: md`### The transplant test

For each mechanism, ask: **what conditions make it work in Europe, and do they exist here?**

| European mechanism | Condition it relies on | Arab context | Decision |
|---|---|---|---|
| Free, approval-gated hackathons | Venues, sponsors with developer budgets, builders free on weekends | Venues and sponsors exist; sponsor base leans to government, telcos, banks, sovereign-linked AI firms | **Adopt**, with sponsor challenges that fit those buyers |
| Sponsor-funded prizes and credits | AI companies seeking developers | Global AI firms and regional players seek Arabic-speaking builders | **Adopt** |
| Discord as the community home | Developers already on Discord | Many builders live in WhatsApp | **Adapt**: WhatsApp community for announcements, a server or forum for projects |
| Luma event pages | Habit of public registration | Works, but personal invites fill rooms | **Adopt plus personal invites** |
| Evening drinks networking | Bar culture | Coffee, dates and food; alcohol not part of it | **Replace** with majlis-style hospitality |
| Spontaneous public events | Light regulation | Permits in Saudi Arabia; venue rules elsewhere | **Adapt**: venue partners, permits checked |
| English-only content | English as the shared language | Arabic is an asset and a gap | **Reject**: bilingual by default |
| Many cities quickly | A volunteer chapter model with dense builders in each city | Uneven density; volunteer depth unknown | **Adapt**: two cities first, then expand |`,
        },
        {
          kind: "matrix",
          title: "Mechanisms by ease of transplant and value",
          xAxis: ["Hard to transplant", "Easy to transplant"],
          yAxis: ["Lower value here", "Higher value here"],
          cells: [
            { label: "Adapt carefully", detail: "Multi-city chapter network, demo nights with investors: high value, needs local organisers and real investors." },
            { label: "Do first", detail: "Gated hackathons with sponsor challenges, bilingual newsletter, majlis-format evenings, Luma plus personal invites." },
            { label: "Skip", detail: "Bar-based networking, Friday daytime events, unpermitted public events in Saudi Arabia." },
            { label: "Optional", detail: "Discord-only community, English-only podcast: easy but they underperform in this context." },
          ],
          caption: "Start top-right, build toward top-left as volunteer organisers appear.",
        },
        { kind: "xref", to: "fc05.arabic-register", note: "MSA versus Gulf dialect and register choice in founder communication; this lesson applies it to community channels." },
      ],
    },
    {
      layer: "applied",
      title: "Choosing launch cities with a weighted score",
      blocks: [
        { kind: "equation", formula: "sh01-weighted-score" },
        {
          kind: "worked",
          mode: "worked",
          title: "Kuwait City, Riyadh or Dubai first? (illustrative scores)",
          given: md`Illustrative: the scores below are a judgement exercise, not data. Criteria and weights: builder pool depth 0.30; sponsor and employer density 0.25; team presence and personal network 0.20; ease of running events (permits, venues, cost) 0.15; AI research ecosystem 0.10. Scores 1 to 5: Kuwait City 2, 3, 5, 4, 2; Riyadh 5, 5, 2, 2, 4; Dubai 4, 5, 3, 5, 3.`,
          steps: [
            { md: md`**Kuwait City:** $0.30 \times 2 + 0.25 \times 3 + 0.20 \times 5 + 0.15 \times 4 + 0.10 \times 2 = 0.60 + 0.75 + 1.00 + 0.60 + 0.20 = 3.15$.` },
            { md: md`**Riyadh:** $1.50 + 1.25 + 0.40 + 0.30 + 0.40 = 3.85$.` },
            { md: md`**Dubai:** $1.20 + 1.25 + 0.60 + 0.75 + 0.30 = 4.10$.` },
            { md: md`**Ranking:** Dubai, Riyadh, Kuwait City under these weights.` },
          ],
          result: md`The weights carry the decision. Before acting, test whether the ranking survives a reasonable change in weights.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Sensitivity: weight the team's own network more",
          given: md`Same illustrative scores. Argue that a volunteer team can only run events well where its own people are, and move 0.15 of weight from builder pool to team presence: weights 0.15, 0.25, 0.35, 0.15, 0.10.`,
          steps: [
            { md: md`**Kuwait City:** $0.15 \times 2 + 0.25 \times 3 + 0.35 \times 5 + 0.15 \times 4 + 0.10 \times 2 = 3.60$.`, hidden: true, check: { prompt: "Kuwait City score", answer: 3.6, tolerance: { abs: 0.01 } } },
            { md: md`**Riyadh:** $0.75 + 1.25 + 0.70 + 0.30 + 0.40 = 3.40$.`, hidden: true, check: { prompt: "Riyadh score", answer: 3.4, tolerance: { abs: 0.01 } } },
            { md: md`**Dubai:** $0.60 + 1.25 + 1.05 + 0.75 + 0.30 = 3.95$.`, hidden: true, check: { prompt: "Dubai score", answer: 3.95, tolerance: { abs: 0.01 } } },
          ],
          result: md`Dubai stays first; Kuwait City overtakes Riyadh. The robust conclusion is "Dubai, plus one of Kuwait City or Riyadh depending on where the team actually has organisers". That is a question about people, not about markets, and it is the one to answer first.`,
        },
        {
          kind: "md",
          md: md`### A first-half 2027 calendar skeleton (proposed)

| Month (2027) | Constraint | Format |
|---|---|---|
| January | Launch month, cool weather | Newsletter launch; first hackathon in city 1 (Saturday) |
| February to early March | Ramadan expected about 8 Feb to 9 Mar | Late-evening build nights, a suhoor majlis session; no daytime hackathon |
| March (after Eid) | Eid al-Fitr about 9 to 10 Mar | Hackathon in city 2 late March |
| April | Good season | Six-week build season starts |
| May | Eid al-Adha around mid-May | Build season showcase before Eid |
| June | Heat rising, exams, travel starts | Online formats; plan Suhail Season for the autumn |`,
        },
      ],
    },
    {
      layer: "field",
      title: "Operating across Arab cities",
      blocks: [
        {
          kind: "callout",
          tone: "pitfall",
          title: "Assuming Saudi rules match Dubai's",
          md: md`Running an event in Riyadh involves permits (GEA for public or ticketed events, SCEGA for conferences), and foreign organisers typically need a MISA licence and commercial registration first (secondary sources). Partner with a licensed local venue or organiser for early events and confirm the hackathon question in writing.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "A public post as the only invitation",
          md: md`In most of the region the invitation that fills a room is a personal message from someone you know. Use the Luma page for registration and approval, and have every lead and organiser personally invite ten people. Ask sponsors and university partners to do the same.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "Who you need in each city",
          md: md`Before announcing a city: one local organiser from the community (not only a lead), one venue partner, one sponsor with an engineering team that will show up, one university contact, and the permit question answered. Without the organiser, do online formats for that city instead.`,
        },
        {
          kind: "checklist",
          title: "City launch checklist",
          items: [
            "Local organiser and two responders identified",
            "Venue partner confirmed; permit and licensing question answered in writing",
            "Date checked against Ramadan, Eid, the local weekend, exams and summer",
            "Sponsor challenge relevant to local employers",
            "Code of conduct in Arabic and English, reviewed locally",
            "Personal invitation plan: every lead and organiser invites ten people",
            "Hospitality plan: food, coffee, prayer space, end time",
            "Language plan for the event, talks and follow-up content",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask a local partner",
          items: [
            "Who already convenes builders here, and how can we support rather than compete?",
            "What permits or approvals have you needed for similar events?",
            "Which day and time get the best turnout here, and what clashes should we avoid?",
            "Which language do people here expect for talks, and for the follow-up?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "sh01-l06-p1",
            type: "short",
            prompt: md`Produce Suhail's **2027 launch city plan**: choose the first two cities with a weighted score (state weights and illustrative scores, then one sensitivity test), explain how you will involve the diaspora, give the language policy for events, newsletter and The Majlis, list three European mechanisms you adopt, adapt or reject for those cities with reasons, and give the January to June calendar with Ramadan, Eid and weekend constraints.`,
            rubric: [
              "Weighted scoring with explicit weights, labelled illustrative scores, correct arithmetic and a sensitivity test that is interpreted",
              "City facts are accurate and dated where numeric (research brief), with uncertain points flagged (for example Saudi permits)",
              "Diaspora plan names concrete formats (online sessions, a chapter, return paths)",
              "Language policy distinguishes English, MSA and dialect by context",
              "Three transplant decisions with conditions explained",
              "Calendar respects Ramadan 2027 (approximate dates), Eid, local weekends and summer",
            ],
            modelAnswer: md`**Scoring (illustrative).** Weights: builder pool 0.25, sponsors 0.25, team presence 0.25, event ease 0.15, AI ecosystem 0.10. Scores: Dubai 4, 5, 3, 5, 3 = 4.05; Kuwait City 2, 3, 5, 4, 2 = 3.30; Riyadh 5, 5, 2, 2, 4 = 3.70. Sensitivity: with team presence at 0.35 (builder pool 0.15), Kuwait City (3.60) passes Riyadh (3.40). Decision: Dubai and Kuwait City in H1, Riyadh in H2 once a local organiser and venue partner are confirmed and the permit question is answered in writing.

**Diaspora.** Biweekly online build nights in Gulf evening time; an Amsterdam evening once per quarter (I am based partly in the Netherlands); a "return paths" section in the newsletter (advisers, angels, roles).

**Language.** Technical sessions in English with Arabic welcome; partner and government letters in MSA with English; newsletter bilingual; The Majlis in the guest's dialect.

**Transplants.** Adopt free, approval-gated hackathons with sponsor prizes (venues and sponsors exist in both cities). Adapt Discord: WhatsApp community for announcements plus a forum for projects, because builders here live in WhatsApp. Reject evening drinks networking: replace with majlis-style hospitality and coffee.

**Calendar.** Jan: newsletter launch, Dubai hackathon (Saturday, UAE weekend). Feb to early Mar (Ramadan expected about 8 Feb to 9 Mar): late-evening online build nights, a suhoor majlis in Kuwait City. Late Mar: Kuwait City hackathon on a Saturday (Kuwait weekend Friday and Saturday). Apr to mid-May: six-week build season, showcase before Eid al-Adha (around mid-May). June: online only; plan Suhail Season for the autumn.`,
            explanation: md`A strong plan makes the weights explicit, tests them, and grounds every constraint in a real calendar or rule.`,
            concepts: ["sh01.city-roles", "sh01.diaspora", "sh01.language-register", "sh01.event-culture", "sh01.transplant-test"],
            difficulty: 3,
          },
        },
        { kind: "sources", refs: ["sh01-r22", "sh01-r23", "sh01-r24", "sh01-r25", "sh01-r26", "sh01-r27", "sh01-r28", "sh01-r29", "sh01-r30", "sh01-r12"] },
        {
          kind: "feynman",
          prompt: "Explain to a {Tech: Europe} organiser what will and will not transplant if they helped launch Suhail in Kuwait City and Riyadh.",
          keyPoints: [
            "Free, gated hackathons with sponsor prizes transplant",
            "Personal invitations and WhatsApp matter more than public posts and Discord",
            "Hospitality replaces bar networking; Ramadan and weekends reshape the calendar",
            "Saudi events may need permits and a local partner",
            "Bilingual content is an asset, not a translation cost",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh01-l06-q1",
      type: "mcq",
      prompt: md`Which city is the natural home for Suhail's research-arm audience, given the institutions there?`,
      options: ["Amman", "Abu Dhabi", "Beirut", "Kuwait City"],
      answer: 1,
      explanation: md`Abu Dhabi hosts MBZUAI, TII (Falcon) and G42 and Inception (Jais 2). Doha (QCRI, Fanar) is the second.`,
      concepts: ["sh01.city-roles"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh01-l06-q2",
      type: "mcq",
      prompt: md`Which weekend day is a safe default for a hackathon across Saudi Arabia, Kuwait, Qatar, the UAE, Egypt and Jordan?`,
      options: ["Friday", "Saturday", "Sunday", "Thursday"],
      answer: 1,
      explanation: md`Most of these have Friday and Saturday weekends; the UAE has Saturday and Sunday since January 2022. Saturday is a weekend day in all of them.`,
      concepts: ["sh01.event-culture"],
      difficulty: 1,
    },
    {
      id: "sh01-l06-q3",
      type: "multi",
      prompt: md`Which statements about Saudi events are supported by the research brief? Select all that apply.`,
      options: [
        "Public or ticketed events need a GEA permit",
        "Conferences and exhibitions fall under SCEGA",
        "Free, invite-only hackathons are confirmed to be exempt from permits",
        "Foreign organisers typically need a MISA licence and commercial registration first",
      ],
      answer: [0, 1, 3],
      explanation: md`The hackathon question is explicitly unverified; confirm it before announcing.`,
      concepts: ["sh01.event-culture"],
      difficulty: 2,
    },
    {
      id: "sh01-l06-q4",
      type: "numeric",
      prompt: md`Weights 0.4, 0.3, 0.3 and scores 3, 5, 4 for a city. What is its weighted score?`,
      answer: 3.9,
      tolerance: { abs: 0.01 },
      explanation: md`$0.4 \times 3 + 0.3 \times 5 + 0.3 \times 4 = 1.2 + 1.5 + 1.2 = 3.9$.`,
      concepts: ["sh01.transplant-test"],
      difficulty: 1,
    },
    {
      id: "sh01-l06-q5",
      type: "decision",
      prompt: md`A sponsor wants Suhail's first Riyadh hackathon on a Friday afternoon in late February 2027 because their executives are in town. What do you advise?`,
      options: [
        { text: "Accept: sponsor executives matter most.", score: 0.1, feedback: "Friday afternoon clashes with Friday prayer and family time, and late February 2027 is expected to fall in Ramadan. Turnout will be poor." },
        { text: "Propose a Saturday after Eid in late March for the hackathon, and a late-evening Ramadan majlis in February where the executives can meet builders.", score: 1, feedback: "Right: respects the calendar and still gives the sponsor what it wants (contact with builders)." },
        { text: "Run it online to avoid the issue.", score: 0.4, feedback: "Avoids the clash but loses the in-person contact the sponsor is paying for." },
      ],
      explanation: md`Calendar fit drives turnout. Meet the sponsor's real need with a format that fits Ramadan.`,
      concepts: ["sh01.event-culture"],
      difficulty: 2,
    },
    {
      id: "sh01-l06-q6",
      type: "mcq",
      prompt: md`What is the best language policy for The Majlis podcast?`,
      options: [
        "Formal MSA only",
        "English only, for sponsor reach",
        "The guest's dialect with natural English technical terms",
        "Alternate languages each episode at random",
      ],
      answer: 2,
      explanation: md`A podcast's value is closeness and authenticity; dialect does that. MSA suits formal and written institutional communication.`,
      concepts: ["sh01.language-register"],
      difficulty: 1,
    },
    {
      id: "sh01-l06-q7",
      type: "mcq",
      prompt: md`Which European mechanism fails the transplant test most clearly?`,
      options: ["Free, approval-gated hackathons", "Sponsor-funded prizes", "Evening drinks networking", "A weekly newsletter"],
      answer: 2,
      explanation: md`It depends on a bar culture that is not part of professional life in most of the region; majlis-style hospitality replaces it.`,
      concepts: ["sh01.transplant-test"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh01-l06-f1", front: "Riyadh in two lines", back: "Largest capital and government programmes (KSA USD 1.72bn in 2025, MAGNiTT) but sharply lower in H1 2026; events need permits (GEA, SCEGA).", concepts: ["sh01.city-roles"] },
    { id: "sh01-l06-f2", front: "Abu Dhabi's role", back: "AI research hub: MBZUAI, TII (Falcon), G42 and Inception (Jais 2), Hub71, MGX.", concepts: ["sh01.city-roles"] },
    { id: "sh01-l06-f3", front: "Cairo's role", back: "Deepest talent pool: about 750K graduates a year, offshoring exports about USD 5.2bn (2025).", concepts: ["sh01.city-roles"] },
    { id: "sh01-l06-f4", front: "Ramadan 2027", back: "Expected about 8 Feb to 9 Mar (moon sighting); move events to late evening; suhoor formats.", concepts: ["sh01.event-culture"] },
    { id: "sh01-l06-f5", front: "Language policy", back: "English for code and technical talks; MSA for formal and institutional; dialect for podcast and community; bilingual by default.", concepts: ["sh01.language-register"] },
    { id: "sh01-l06-f6", front: "Transplant test", back: "What conditions make the mechanism work at home, and do they exist here? Then adopt, adapt or reject.", concepts: ["sh01.transplant-test"] },
    { id: "sh01-l06-f7", front: "Using the diaspora", back: "Online formats, diaspora chapters, visible return paths (advising, angel investing, roles, research).", concepts: ["sh01.diaspora"] },
  ],
};

export default lesson;
