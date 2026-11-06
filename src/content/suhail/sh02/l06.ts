import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh02-l06",
  title: "Running hackathons in the Gulf, Egypt and the Levant: permits, timing, language and partners",
  summary:
    "Everything in the previous lessons applies, but the region changes the constraints: event permits that differ by country (Saudi Arabia's GEA system is the best documented), a calendar shaped by Ramadan, Eid, summer heat and different weekends, bilingual audiences across dialects, cultural norms for mixed overnight events, visas and cross-border prize payments, and a partner landscape of universities, innovation hubs and licensed venues. This lesson turns those into a planning method.",
  minutes: 70,
  objectives: [
    "Describe what is known (and unknown) about event permits in Saudi Arabia and plan a permit path for any country in the region",
    "Choose event dates around Ramadan, Eid, summer heat, academic calendars and different weekends",
    "Plan bilingual communication and judging across Arabic dialects and English",
    "Design overnight events that work culturally, including for women participants and their families",
    "Plan cross-border participation (visas, travel grants, prize payments) and pick the right local partners",
  ],
  concepts: [
    { id: "sh02.permit-path", name: "Event permit path", description: "The sequence of licences and approvals needed to hold an event in a given country: entity and commercial registration, event or venue permit, security or municipal approvals. In Saudi Arabia public or ticketed events need a GEA permit (secondary sources); whether a free, invite-only hackathon does is unverified. Partnering with a licensed host is the usual route.", competency: "sh-events", related: ["sh02.regional-partners"] },
    { id: "sh02.regional-calendar", name: "Regional event calendar", description: "Date choice constrained by Ramadan and the two Eids (lunar dates that move about 11 days earlier each year), Gulf summer heat and travel (June to September), academic exams, national days, major tech weeks and country-specific weekends (Friday to Saturday in most of the region; Saturday to Sunday in the UAE since 2022).", competency: "sh-events", related: ["sh02.permit-path"] },
    { id: "sh02.bilingual-ops", name: "Bilingual operations", description: "Running registration, kick-off, mentoring, demos and judging in Arabic and English, allowing dialects, with judges or interpreters who can follow both, and right-to-left support in materials.", competency: "sh-events", related: ["sh02.regional-calendar"] },
    { id: "sh02.regional-partners", name: "Regional partners", description: "Universities, government innovation hubs, licensed venues and event companies, tech companies and research institutes that provide space, permits, audience and credibility in each country.", competency: "sh-events", related: ["sh02.permit-path"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What the region changes",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Suhail is planned as a builder ecosystem for the Arab world, starting in January 2027. You are based between the Netherlands and Kuwait and speak Arabic and English, which is an advantage few event organisers have. But a playbook copied from Berlin will break on contact with Ramadan, a Friday prayer, a permit nobody told you about, or a parent who will not let his daughter stay overnight. Each of these is predictable and plannable.`,
        },
        {
          kind: "md",
          md: md`### Permits

**Saudi Arabia (best documented, still secondary).** From the research brief (November 2026; secondary sources, to be confirmed with the authorities):

- Public or ticketed events need a **General Entertainment Authority (GEA)** permit, applied for through its e-portal, **one permit per event**.
- **Conferences and exhibitions** fall under the conventions and exhibitions authority (SCEGA). E-sports events fall under a separate federation.
- **Foreign organisers** typically need a MISA (formerly SAGIA) investment licence and a commercial registration first.
- **No hackathon-specific rule was found.** Whether a free, invite-only hackathon needs a GEA or SCEGA permit is unverified.

**Other countries.** The research brief did not cover them, so treat everything here as a question to ask, not a rule. Expect some combination of: a licence for the organising entity, a permit for public events or for the venue, and security or municipal approval for overnight or large gatherings. Universities, government innovation hubs and licensed venues often hold the relevant approvals or know how to get them.

**The practical path, in every country:**

1. Decide who the legal organiser is (Suhail's entity, or the host partner).
2. Ask the venue in writing which permits apply to an overnight event of your size, and who applies.
3. If a licensed partner (university, hub, licensed event company) will be the formal organiser, agree that in writing, with branding and data responsibilities.
4. Budget lead time for approvals (an illustrative 4 to 8 weeks) and do not announce dates you cannot hold.
5. Keep the permit and approvals on paper at the venue on the day.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Permits: confirm before you plan",
          md: md`The Saudi permit picture comes from secondary sources (an events platform blog and law-firm articles; research brief items 3 and 8). Rules for hackathons, and for the UAE, Kuwait, Qatar, Bahrain, Oman, Egypt, Jordan and Lebanon, were not researched and are not stated here. Before the first event in any country, confirm with the authority, the venue and, for a foreign organiser, a local lawyer.`,
        },
        {
          kind: "md",
          md: md`### The calendar

| Constraint | What it means | Design response |
|---|---|---|
| **Ramadan** (lunar; in 2027 expected around early February to early March, depending on moon sighting) | Fasting by day, iftar at sunset, social and religious evenings, shorter work hours; sponsors' decisions slow | Avoid 24-hour events; or run an evening format from iftar to suhoor; close sponsor deals before Ramadan starts |
| **Eid al-Fitr and Eid al-Adha** | Public holidays, travel, family time | Never schedule on or just after; Eid al-Adha in 2027 expected around mid-May |
| **Lunar drift** | Islamic dates move about 11 days earlier each Gregorian year | Re-check every year; do not copy last year's dates |
| **Gulf summer** (roughly June to September) | 45 to 50 °C, many residents travel, universities closed | Main Gulf season October to May; summer only for online events or the Levant |
| **Academic calendar** | Exams roughly December to January and May to June | Avoid exam weeks for student-heavy events |
| **National days and major tech weeks** | Holidays, or competition for attention and sponsors (for example GITEX in Dubai, LEAP in Riyadh) | Check dates; co-locate with a tech week only with a partner who brings the audience |
| **Weekends** | Friday to Saturday in Saudi Arabia, Kuwait, Qatar, Bahrain, Oman, Egypt and Jordan; Saturday to Sunday in the UAE (since 2022; government Friday afternoons off) | Gulf events: start Friday after the midday prayer or Thursday evening; cross-border online events: avoid Friday midday and pick hours that suit all time zones |
| **Daily prayer times** | Five daily prayers; the Friday midday prayer is the most important | Prayer room on site; no announcements, deadlines or demos scheduled on prayer times; publish them in the run-of-show |

### Language

- **Bilingual by default:** registration, reminders, the challenge pack and the code of conduct in Arabic and English. Kick-off in both, briefly.
- **Dialects:** a builder from Casablanca, one from Cairo and one from Kuwait may prefer English with each other. Let teams choose; allow demos in Arabic or English; make sure every panel can follow both, or has a bilingual judge who summarises.
- **Arabic as a technical constraint:** Arabic-first problem statements (Lesson 2) reward regional builders, because dialects, code-switching and right-to-left interfaces are hard to fake. Provide test data in several dialects.
- **Materials:** right-to-left layouts for Arabic slides and the event page; test them on mobile.

### Culture and overnight events

- **Mixed events** are normal in most of the region's tech scene. Plan as if every participant's family will ask what the overnight arrangements are, because some will.
- **For women participants:** separate, lit, lockable rest areas; women volunteers and staff on every shift, including overnight; transport home at any hour; and a **day-only option** (leave at midnight, return at 7 am) that is visible on the event page and does not disadvantage the team.
- **Food and drink:** halal by default, no alcohol, Arabic coffee and dates at kick-off.
- **Dress and conduct norms:** state in the code of conduct that respect for local norms is expected, without turning it into policing.

### Cross-border participation

- **Visas:** citizens of GCC countries generally move freely within the GCC; Egyptian, Jordanian, Lebanese and other builders usually need visas for Gulf events. Allow weeks, not days, and provide invitation letters.
- **Travel grants:** budget per head (flight, two nights, local transport, visa) and select grantees on the same criteria as everyone else.
- **Online qualifiers:** a common pattern is an online round open to the whole region, then a flagship in-person final with travel grants for the finalists.
- **Prize payments:** pay in USD or the local currency by bank transfer after identity checks; cross-border transfers can take weeks, and banking to some countries in the region is restricted. State the payment rules before registration.

### Country notes (planning considerations, not research findings)

| Country | Planning considerations |
|---|---|
| Kuwait | Small, connected community; universities and private venues as hosts; 240 V supply; Friday to Saturday weekend |
| Saudi Arabia | Large audience and sponsor interest around national AI programmes (research brief section 1); GEA and SCEGA permit questions; foreign-organiser licensing; long distances between Riyadh, Jeddah and Dammam |
| UAE | Saturday to Sunday weekend; dense ecosystem of hubs (for example Hub71 in Abu Dhabi, research brief) and AI institutions such as MBZUAI; high venue costs |
| Egypt | Very large talent pool (about 750K graduates a year, research brief); lower venue and food costs; plan for power and connectivity backup |
| Jordan and Lebanon | Strong developer communities in Amman and Beirut; in Lebanon, electricity supply is unreliable, so generator and UPS planning is essential; banking restrictions affect prize payments |`,
        },
        {
          kind: "flow",
          title: "Permit and partner path for a new country",
          steps: [
            { label: "Choose legal organiser", detail: "Suhail's entity or a licensed host partner" },
            { label: "Ask venue and authority", detail: "Which permits apply to an overnight event of this size, and who applies" },
            { label: "Sign partner agreement", detail: "Roles, branding, data responsibility, liability" },
            { label: "Apply and wait", detail: "Illustrative 4 to 8 weeks; no public dates before approval is likely" },
            { label: "Announce", detail: "Event page live with the confirmed venue" },
            { label: "Keep papers on site", detail: "Permit, occupancy certificate, insurance" },
          ],
          caption: "Run this before the first event in each country; afterwards it becomes a template.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Dating and budgeting a 2027 event",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "A first Kuwait hackathon in spring 2027",
          given: md`Suhail's plan starts in January 2027. Ramadan 2027 is expected to start around early February and Eid al-Fitr around early March (approximate; depends on moon sighting). Kuwait weekend: Friday to Saturday. You want a 24-hour event in spring before the heat, avoiding Ramadan and leaving at least six weeks of registration after Eid.`,
          steps: [
            { md: md`**Candidate dates:** a Friday-to-Saturday 24-hour event. Six weeks after Eid (early March) lands in mid-to-late April. **Friday 23 April 2027** fits: after Eid, before the May exam season, before Eid al-Adha (expected mid-May) and before summer.` },
            { md: md`**Back-schedule from 23 April 2027:** T minus 14 weeks (15 January): goal statement, venue hold, permit question to the venue. T minus 10 weeks (12 February, inside Ramadan): sponsor conversations are slow, so the sponsor outreach must start in January and close before Ramadan where possible. T minus 6 weeks (12 March, just after Eid): event page live. T minus 2 weeks (9 April): applications close.` },
            { md: md`**Daily timing:** start Friday at 16:00 (after the midday Friday prayer, Lesson 4 run-of-show); put the Maghrib and Isha prayer times for 23 April in the run-of-show; no announcements on prayer times.` },
            { md: md`**Check against risks:** a Ramadan-shifted sponsor timeline is the biggest risk. Mitigation: aim for sponsor commitments by the start of Ramadan; plan a smaller backup budget if one sponsor slips.` },
          ],
          result: md`Friday 23 April 2027, with sponsor outreach front-loaded into January. Next year the same event moves about 11 days earlier relative to Ramadan, so re-run this check rather than copying the date.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Travel grants for a regional final",
          given: md`Illustrative flagship final in Riyadh: 20 finalists travel from Cairo and Amman. Per person (illustrative): flight USD 250, 2 hotel nights at USD 80, local transport USD 30, visa and processing USD 100.`,
          steps: [
            { md: md`Cost per grantee: $250 + 2 \times 80 + 30 + 100$.` },
            { md: md`$=$ **USD 540**.`, hidden: true, check: { prompt: "Cost per grantee (USD)", answer: 540, tolerance: { abs: 1 }, unit: "USD" } },
            { md: md`Total for 20 grantees: $20 \times 540$.` },
            { md: md`$=$ **USD 10,800**: comparable to the whole prize pool of a 24-hour event. A travel-grant sponsor (an employer that wants regional talent) is a natural fit.`, hidden: true, check: { prompt: "Total travel grants (USD)", answer: 10800, tolerance: { abs: 1 }, unit: "USD" } },
          ],
          result: md`USD 10,800 for 20 grantees. Regional reach costs real money, which is why online qualifiers plus a funded final are the usual structure.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Partners and the local playbook",
      blocks: [
        {
          kind: "md",
          md: md`### Who to partner with

| Partner type | Brings | Wants | Watch out for |
|---|---|---|---|
| **Universities** | Free or cheap venue, students, sometimes approvals | Student outcomes, visibility, industry links | Academic calendar, internal approvals, rules for overnight stays and minors |
| **Government innovation hubs and agencies** | Credibility, venue, sometimes funding, permits | National programme goals, visibility for officials | Slow procurement, protocol, requests for IP or ministerial speeches |
| **Licensed venues and event companies** | Permits, logistics, AV | Fees | Cost; ownership of the attendee relationship |
| **Tech companies** | Sponsorship, credits, mentors, hiring | Adoption, hiring, brand (Lesson 1) | Pressure on results (Lesson 5) |
| **Research institutes** | Datasets, judges, technical depth | Research visibility, recruitment | Data-sharing terms |

Approach partners with the goal statement (Lesson 1) and a draft run-of-show, not with "we would like to do a hackathon". Name no partner publicly until there is a signed agreement.

### What goes wrong

- **Announcing dates before approvals.** Moving an event damages trust more than announcing late.
- **Copying a Western schedule.** A Sunday kick-off in Kuwait, a Friday noon deadline, or a Ramadan 24-hour event.
- **English-only materials.** You lose the builders you most want, and the families who decide about overnight stays.
- **Prize payments that bounce.** Cross-border banking problems surface after the event, in public.
- **A partner who owns the list.** If the host collects registrations, agree in writing that Suhail keeps the community relationship (with participants' consent).`,
        },
        {
          kind: "ask",
          title: "Questions for a candidate venue or host partner",
          items: [
            "Which permits or approvals apply to an overnight event of 150 people here, and who applies for them?",
            "What is the certified occupancy of the hall, and can you provide it in writing?",
            "Are overnight stays allowed, and what are the rules for rest areas and for under-18s?",
            "Who is the legal organiser of record, and who holds the attendee data?",
            "What are your blackout dates (exams, national days, other events) for the next 12 months?",
            "Is there a prayer room and ablution facility, and can the caterer provide halal food with allergy labels?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "sh02-l06-p1",
            type: "short",
            prompt: md`**Write the country launch plan for Suhail's first hackathon outside Kuwait** (Riyadh, Dubai, Cairo or Amman: your choice). Include: (1) the legal organiser and permit path, with what is known and what you must confirm; (2) the date with the calendar reasoning (Ramadan, Eid, weekend, heat, exams, tech weeks); (3) language plan; (4) overnight and women-participant arrangements; (5) cross-border participation (visas, grants, prize payments); (6) the partner you would approach first and what you offer them.`,
            rubric: [
              "Permit path distinguishes what is known (for Riyadh: GEA per event for public or ticketed events, SCEGA for conferences, MISA licence for foreign organisers, all secondary) from what must be confirmed; other countries are flagged as unverified",
              "Date reasoning uses the correct weekend for the country and avoids Ramadan, Eid, exam periods and summer, with lunar dates flagged as approximate",
              "Language plan is bilingual with dialect handling and judges able to follow both languages",
              "Overnight plan includes separate rest areas, women staff on every shift, transport and a day-only option",
              "Cross-border plan covers visas with lead time, travel grants with a per-head budget, and prize payment rules; partner choice states what the partner wants and what Suhail offers, with no partner presented as real",
            ],
            modelAnswer: md`**City:** Riyadh, autumn 2027.

**1. Organiser and permits:** formal organiser: a licensed local host (a university or innovation hub) with Suhail as programme partner, because Suhail would otherwise need a MISA licence and a commercial registration first (research brief, secondary). Known: public or ticketed events need a GEA permit through its e-portal, one per event; conferences and exhibitions sit with SCEGA. Unknown: whether a free, invite-only hackathon needs either. Action: written question to the host and a local lawyer by T minus 14 weeks; no public date until the host confirms.

**2. Date:** Thursday evening to Friday evening is awkward because of the Friday midday prayer, so I start **Friday at 16:00** and end Saturday at 18:00 (Saudi weekend is Friday to Saturday). Season: October to November 2027, after summer and well clear of Ramadan (expected around late January to late February 2028; approximate) and of December exams. Check LEAP and other Riyadh tech weeks and avoid national holidays.

**3. Language:** Arabic and English for the page, challenge pack, reminders and kick-off; demos in either language; every panel has at least one bilingual judge; test data in Gulf, Egyptian and Levantine Arabic.

**4. Overnight:** separate lockable rest areas for women and men, women staff and volunteers on every shift, transport home on request at any hour, and a day-only option (leave at midnight, return at 07:00) stated on the event page; the code of conduct read out at kick-off with named responders.

**5. Cross-border:** 15 travel grants for builders from Cairo and Amman at about USD 540 each (illustrative), selected on the same criteria; invitation letters sent with acceptance, at least 6 weeks before; prizes paid in USD by bank transfer within 30 days after identity checks, stated in the rules.

**6. First partner:** a university with an AI programme: it gets a student-heavy event, industry judges and visibility; Suhail offers the full programme, sponsors and a post-event talent report. Nothing is announced until an agreement is signed.`,
            explanation: md`Graded against the rubric. The strongest answers separate what is known from what must be confirmed and never present a permit rule or a partner as settled when it is not.`,
            concepts: ["sh02.permit-path", "sh02.regional-calendar", "sh02.bilingual-ops", "sh02.regional-partners"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a European co-organiser why Suhail cannot simply reuse the Berlin hackathon schedule in Riyadh or Kuwait.",
          keyPoints: [
            "Weekends differ (Friday to Saturday in most of the region, Saturday to Sunday in the UAE)",
            "Friday midday prayer and daily prayer times shape the run-of-show",
            "Ramadan and the Eids move every year and change work rhythms and sponsor timelines",
            "Gulf summer heat and travel make June to September a poor season for in-person events",
            "Permits, overnight norms, bilingual operations and visas add steps that Berlin does not have",
          ],
        },
        { kind: "sources", refs: ["sh02-r9", "sh02-r10", "sh02-r11", "sh02-r12", "sh02-r2"] },
      ],
    },
  ],
  quiz: [
    {
      id: "sh02-l06-q1",
      type: "mcq",
      prompt: "According to the research brief's (secondary) sources, what do public or ticketed events in Saudi Arabia need?",
      options: ["Nothing beyond a venue booking", "A GEA permit through its e-portal, one per event", "A single annual licence covering all events", "Approval from the Ministry of Education only"],
      answer: 1,
      explanation: md`One GEA permit per event, via the e-portal; conferences and exhibitions fall under SCEGA. Whether a free, invite-only hackathon needs a permit is unverified.`,
      concepts: ["sh02.permit-path"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh02-l06-q2",
      type: "mcq",
      prompt: "Which country in the region moved to a Saturday to Sunday weekend in 2022?",
      options: ["Kuwait", "Saudi Arabia", "United Arab Emirates", "Egypt"],
      answer: 2,
      explanation: md`The UAE moved to Saturday to Sunday (with Friday afternoons off for government). Most other countries in the region keep Friday to Saturday.`,
      concepts: ["sh02.regional-calendar"],
      difficulty: 1,
    },
    {
      id: "sh02-l06-q3",
      type: "numeric",
      prompt: md`The Islamic calendar year is about 11 days shorter than the Gregorian year. If Ramadan starts around 8 February in one year, roughly how many days into the Gregorian year (day of year) does it start the next year? (8 February is day 39.)`,
      answer: 28,
      tolerance: { abs: 1 },
      unit: "day of year",
      explanation: md`$39 - 11 = 28$, around 28 January. Exact dates depend on moon sighting, so re-check every year.`,
      concepts: ["sh02.regional-calendar"],
      difficulty: 2,
    },
    {
      id: "sh02-l06-q4",
      type: "multi",
      prompt: "Which arrangements make an overnight hackathon work for women participants and their families? (Select all that apply.)",
      options: [
        "Separate, lit, lockable rest areas",
        "Women staff and volunteers on every shift",
        "A day-only option that does not disadvantage the team",
        "Transport home at any hour",
        "Requiring a male guardian to attend",
      ],
      answer: [0, 1, 2, 3],
      explanation: md`Design for safety and choice; a guardian requirement for adults would exclude people and is not what most families ask for.`,
      concepts: ["sh02.regional-partners", "sh02.bilingual-ops"],
      difficulty: 1,
    },
    {
      id: "sh02-l06-q5",
      type: "decision",
      prompt: md`A sponsor proposes holding Suhail's 24-hour hackathon in Kuwait in the middle of Ramadan, "because people are free in the evenings". What do you do?`,
      options: [
        { text: "Agree to the 24-hour format during Ramadan.", score: 0.2, feedback: "Fasting builders coding through the day, iftar and suhoor logistics, and lower attendance make a 24-hour format a poor fit." },
        { text: "Propose either an evening format from iftar to suhoor during Ramadan, or the 24-hour event after Eid, and explain the trade-offs.", score: 1, feedback: "Uses what is true in the sponsor's point (evenings are social) while fitting the format to the month." },
        { text: "Refuse any event during Ramadan.", score: 0.5, feedback: "Ramadan evening events can work well; refusing outright loses a real opportunity." },
      ],
      explanation: md`Match the format to the calendar rather than forcing the calendar to fit the format.`,
      concepts: ["sh02.regional-calendar"],
      difficulty: 2,
    },
    {
      id: "sh02-l06-q6",
      type: "numeric",
      prompt: md`Illustrative travel grants: 12 builders, each with flight USD 300, 2 hotel nights at USD 90 and local transport USD 40. What is the total? (USD)`,
      answer: 6240,
      tolerance: { abs: 1 },
      unit: "USD",
      explanation: md`Per person $300 + 180 + 40 = 520$; $12 \times 520 = \text{USD } 6{,}240$.`,
      concepts: ["sh02.regional-partners"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh02-l06-f1", front: "Saudi event permits (research brief, secondary)", back: "Public or ticketed events: GEA permit per event via e-portal; conferences and exhibitions: SCEGA; foreign organisers: MISA licence and CR first. Hackathon rule unverified.", concepts: ["sh02.permit-path"] },
    { id: "sh02-l06-f2", front: "Regional weekends", back: "Friday to Saturday in most of the region (Saudi, Kuwait, Qatar, Bahrain, Oman, Egypt, Jordan); Saturday to Sunday in the UAE since 2022.", concepts: ["sh02.regional-calendar"] },
    { id: "sh02-l06-f3", front: "Lunar drift", back: "Ramadan and the Eids move about 11 days earlier each Gregorian year; re-check dates every year.", concepts: ["sh02.regional-calendar"] },
    { id: "sh02-l06-f4", front: "Gulf in-person season", back: "Roughly October to May; June to September is too hot and many residents travel.", concepts: ["sh02.regional-calendar"] },
    { id: "sh02-l06-f5", front: "Overnight arrangements for women participants", back: "Separate lockable rest areas, women staff each shift, transport at any hour, a day-only option.", concepts: ["sh02.bilingual-ops"] },
    { id: "sh02-l06-f6", front: "Regional structure for reach", back: "Online qualifier open to the region, then an in-person final with travel grants (flight, hotel, transport, visa per head).", concepts: ["sh02.regional-partners"] },
  ],
};

export default lesson;
