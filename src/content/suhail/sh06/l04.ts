import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh06-l04",
  title: "Talent: where Arab builders are, how they move, and who hires them",
  summary:
    "The geography of Arab technical talent: large producing markets (Egypt, the Maghreb, the Levant), capital-rich hiring magnets (UAE, Saudi Arabia, Qatar, Kuwait), the research universities and institutes, and the diaspora in Europe and North America. How talent moves (emigration, remote work, return), the policies that shape it (residency programmes, nationalisation quotas), what the data does and does not tell us, and how Suhail can serve each segment.",
  minutes: 65,
  objectives: [
    "Describe the main talent segments (producing markets, Gulf hiring markets, research hubs, diaspora) and what each wants",
    "Explain brain drain, brain circulation and return, and the policies that push and pull talent",
    "Use the Egypt data in the course research correctly and state what migration data is missing",
    "Compute a growth rate from a target and convert pay data with an explicit exchange-rate assumption",
    "Design a talent map that links each segment to a Suhail product and a metric",
  ],
  concepts: [
    { id: "sh06.talent-geography", name: "Talent geography", description: "Arab technical talent is produced in large numbers in Egypt, the Maghreb and the Levant, while capital and senior hiring concentrate in the UAE and Saudi Arabia; research depth sits in a few institutes and in the diaspora.", competency: "sh-landscape", related: ["sh06.brain-circulation", "sh06.research-hubs"] },
    { id: "sh06.brain-circulation", name: "Brain drain and brain circulation", description: "Drain is a one-way loss of skilled people; circulation is movement that returns value (remote work, return migration, diaspora investment and mentoring). Communities can turn drain into circulation by keeping people connected.", competency: "sh-landscape", related: ["sh06.talent-geography", "sh06.diaspora"] },
    { id: "sh06.diaspora", name: "Diaspora builders", description: "Arab engineers, researchers and founders working in Europe, North America and Asia: senior skills, networks and capital that can be engaged as mentors, judges, angels, hires or returning founders.", competency: "sh-landscape", related: ["sh06.brain-circulation"] },
    { id: "sh06.research-hubs", name: "Research hubs", description: "Universities and institutes with AI research depth in the region (MBZUAI, KAUST, TII, QCRI and HBKU, major national universities) that train researchers, publish models and recruit students.", competency: "sh-landscape", related: ["sh06.talent-geography"] },
    { id: "sh06.talent-policy", name: "Talent policy levers", description: "Long-term residency schemes (UAE Golden Visa, Saudi Premium Residency), nationalisation quotas (Nitaqat, Emiratisation, Kuwaitisation), national skills programmes (Egypt's ICT training targets) and offshoring promotion shape where builders can work.", competency: "sh-landscape", related: ["sh06.talent-geography"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Where the builders are and why they move",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Builders are Suhail's community and employers are among its best-paying partners. If you know where talent is produced, where it is hired and why it moves, you can choose host cities, design hiring products sponsors will pay for, and give diaspora engineers a reason to stay connected. It also stops a common mistake: designing a "pan-Arab" community that is really a Dubai community.`,
        },
        {
          kind: "md",
          md: md`### Four talent segments

| Segment | Where | Strength | What they want from a community |
|---|---|---|---|
| **Producing markets** | Egypt, Jordan, Tunisia, Morocco, Lebanon, Algeria | Large graduate volumes, strong software services and offshoring industries, lower cost | Visibility to Gulf and global employers and investors, remote roles, credits and mentors |
| **Gulf hiring markets** | UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman | Capital, national AI programmes, senior roles, high pay | Pipelines of experienced engineers, national talent development, local partners |
| **Research hubs** | MBZUAI, KAUST, TII, QCRI and HBKU, national universities | Research depth, compute, models | Students, collaborators, adoption of their models |
| **Diaspora** | Europe, North America, Asia | Senior engineering and research experience, networks, angel capital | Meaningful ways to contribute, a credible path back, founder opportunities |

**What the course research records for Egypt** (the one producing market with data in it):

- Offshoring exports were about **USD 5.2 bn in 2025**, with a target of **USD 6 bn in 2026** (Zawya, 2026).
- The government targets **800K ICT-trained people**; Egypt produces about **750K graduates a year** (Zawya, 2026).
- Software development was about **58% of ICT job openings** (ITIDA, Apr 2024, via Egyptian Gazette).
- Early-career software engineers in Cairo average about **E£139K a year** (Payscale, 2026); FollowICT (Feb 2025) gives E£120K to 240K.
- **Emigration data: not found.**`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "What we do not know about talent flows",
          md: md`The research found no reliable 2025 to 2026 numbers on emigration of Arab engineers, the size of the Arab tech diaspora, AI researcher counts by country or Gulf tech salaries. Self-reported salary sites (Payscale) have small samples. Do not quote brain-drain percentages, diaspora sizes or salary comparisons in Suhail material without a dated primary source (national statistics office, OECD migration data, a peer-reviewed study).`,
        },
        {
          kind: "matrix",
          title: "Talent supply vs local capital and demand",
          xAxis: ["Less local capital and senior demand", "More local capital and senior demand"],
          yAxis: ["Smaller local talent pool", "Larger local talent pool"],
          cells: [
            { label: "Producers", detail: "Egypt, Maghreb, Levant: many engineers, fewer senior local roles and smaller rounds. Talent exports through emigration, offshoring and remote work." },
            { label: "Rising hubs", detail: "Saudi Arabia: large national population and heavy state investment; local pool growing alongside imported talent." },
            { label: "Diaspora (outside the region)", detail: "Small in number per city but senior; connected to the region by family, language and often a wish to return." },
            { label: "Magnets", detail: "UAE, Qatar, Kuwait: capital and pay attract talent from producers and diaspora; local national pools are small relative to demand." },
          ],
          caption: "Top-left, top-right, bottom-left, bottom-right. Placement is qualitative. Talent flows mostly from the top-left to the bottom-right and top-right; a regional community's job is to keep both ends connected.",
        },
        {
          kind: "md",
          md: md`### How talent moves

- **Emigration (drain).** Engineers leave for higher pay, research environments or stability. The producing country loses training investment; the community loses members unless it stays connected.
- **Remote and offshore work.** Engineers stay at home and work for Gulf or global companies. Egypt's offshoring exports are the industrial form of this.
- **Intra-regional moves.** From producers to Gulf magnets on employment visas; residency schemes such as the UAE Golden Visa (long-term residency introduced in 2019) and Saudi Premium Residency (2019) lower the friction for senior people.
- **Return.** Diaspora founders and researchers come back, often to Gulf hubs, bringing skills and networks.

### What pushes and pulls

| Lever | Effect on builders |
|---|---|
| **Pay and currency** | Large wage gradients between producer and magnet markets drive emigration and remote work. Currency depreciation in a producer market widens the gap in USD terms. |
| **Nationalisation quotas** (Saudi Nitaqat, Emiratisation, Kuwaitisation) | Raise demand for nationals in private firms; employers seek national tech talent and training programmes. |
| **Residency schemes** | Make senior expatriates and founders more willing to commit long term. |
| **National AI programmes** | Create research and engineering jobs at HUMAIN, G42, TII, QCRI and similar (Lesson 1). |
| **Research environment** | Compute, supervisors and publication culture decide where researchers go; MBZUAI and KAUST compete globally for them. |

The exact rules of quotas and residency schemes change often and differ by sector; check the current government source before advising anyone.`,
        },
        {
          kind: "flow",
          title: "From brain drain to brain circulation",
          steps: [
            { label: "Train", detail: "Universities and bootcamps in producing markets" },
            { label: "Leave or go remote", detail: "Gulf, Europe, North America; offshoring" },
            { label: "Stay connected", detail: "Community, newsletter, podcast, online events" },
            { label: "Contribute", detail: "Mentor, judge, hire, invest as an angel" },
            { label: "Return or build", detail: "Found or join a regional company, often in a Gulf hub" },
          ],
          caption: "A community like Suhail works at step 3; without it, steps 4 and 5 rarely happen at scale.",
        },
        {
          kind: "chart",
          chart: "bar",
          title: "Egypt offshoring exports: 2025 actual vs 2026 target (USD bn)",
          xKey: "year",
          xLabel: "Year",
          yLabel: "USD bn",
          series: [{ key: "usd", label: "Offshoring exports (USD bn)" }],
          data: [
            { year: "2025 (about)", usd: 5.2 },
            { year: "2026 (target)", usd: 6.0 },
          ],
          caption: "Source: Zawya, 2026. The 2026 value is a government target, not an outcome.",
        },
        { kind: "equation", formula: "sh06-cagr" },
      ],
    },
    {
      layer: "applied",
      title: "Working with talent numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "How ambitious is Egypt's offshoring target?",
          given: md`About USD 5.2 bn in 2025, target USD 6 bn in 2026 (Zawya, 2026).`,
          steps: [
            { md: md`**One-year growth:** $g = 6.0/5.2 - 1 = 0.154$, about **15%**.` },
            { md: md`**Absolute increase:** USD 0.8 bn of additional exported services in one year.` },
            { md: md`**What it implies for Suhail:** a growing services industry means more engineers employed by foreign clients from Egypt, which is a large pool of experienced builders who may never relocate. Online events and remote-friendly hackathon tracks reach them; Gulf-only in-person events do not.` },
          ],
          result: md`A target is a policy signal, not a forecast. Record it as "target" in the landscape map and update it when the 2026 outcome is published.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Converting pay data honestly",
          given: md`Early-career software engineer, Cairo: about E£139K per year (Payscale, 2026). **Assumption for illustration:** E£48 per USD (state the rate and its date whenever you convert; the Egyptian pound has moved a lot since 2023).`,
          steps: [
            { md: md`Annual pay in USD: $139{,}000/48$.` },
            { md: md`$\approx$ USD 2,900 per year.`, hidden: true, check: { prompt: "Annual pay (USD)", answer: 2896, unit: "USD", tolerance: { abs: 30 } } },
            { md: md`Monthly: $2{,}896/12$.` },
            { md: md`$\approx$ USD 240 per month.`, hidden: true, check: { prompt: "Monthly pay (USD)", answer: 241, unit: "USD", tolerance: { abs: 5 } } },
            { md: md`Sensitivity: at E£50 per USD the annual figure is $139{,}000/50 = $ USD 2,780, about 4% lower. The FollowICT range (E£120K to 240K) is wider than any exchange-rate effect.` },
          ],
          result: md`Even with uncertainty, the order of magnitude is clear: a remote USD salary at a fraction of Gulf pay can be a large raise for an early-career Cairo engineer. That is why remote hiring tracks are valuable to both sides, and why Suhail must police fairness (no unpaid "test projects" disguised as hackathons).`,
        },
        {
          kind: "question",
          question: {
            id: "sh06-l04-p1",
            type: "numeric",
            prompt: md`A national skills programme reports 500K trained people and targets 800K in three years. What compound annual growth rate does the target imply, in percent?`,
            answer: 17,
            tolerance: { abs: 0.3 },
            unit: "% per year",
            explanation: md`$g = (800/500)^{1/3} - 1 = 1.6^{0.333} - 1 = 1.170 - 1 = 17.0\%$ per year. (Illustrative starting value; the research records Egypt's 800K target but not its baseline or timeline.)`,
            concepts: ["sh06.talent-policy"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Serving each talent segment",
      blocks: [
        {
          kind: "md",
          md: md`### What Suhail can offer each segment

| Segment | Suhail product | Metric to track | Partner type |
|---|---|---|---|
| Producing-market builders | Online and in-person hackathons in Cairo, Amman, Tunis, Casablanca; job and project showcase | Finalists receiving employer or investor meetings within 60 days | Offshoring firms, Gulf employers hiring remotely, universities |
| Gulf nationals | Hackathon tracks and workshops with national employers; Arabic-first content | National participants, placements into national programmes | National champions, government digital agencies |
| Researchers | Research talks, benchmark and dataset challenges, the research arm | Submissions, papers or datasets released | MBZUAI, KAUST, TII, QCRI |
| Diaspora | The Majlis podcast guests, remote mentoring and judging, returning-founder sessions at Suhail Season | Diaspora mentors active per season, returners | Diaspora professional networks, VCs |

### Practices that build trust

- **Consent for talent data.** Builders opt in to share profiles with employers; Suhail never sells a contact list.
- **Fair hackathons.** No sponsor problems that are really unpaid work; IP stays with teams unless clearly agreed.
- **Language.** Arabic-first content reaches builders who are underserved by English-only tech media; bilingual is the default.
- **Location.** Rotate in-person events between producing and hiring markets, and keep an online track.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Ways a talent product goes wrong",
          md: md`- A "regional" job board where 90% of roles are in Dubai and require relocation.
- Selling sponsor access to CVs without explicit consent.
- Celebrating emigration ("our alumni now work in London") in a way that alienates producing-market partners.
- Quoting brain-drain statistics with no source.`,
        },
        {
          kind: "ask",
          title: "Questions to ask an employer who wants to hire through Suhail",
          items: [
            "Which roles, which seniority, and can they be remote from Cairo, Amman or Tunis?",
            "Do you sponsor visas, and for which nationalities?",
            "Are there nationalisation requirements for these roles?",
            "What does a hire cost you through your current channel, and how long does it take?",
            "How will you give feedback to candidates you meet at our events?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "sh06-l04-p2",
            type: "short",
            prompt: md`Produce Suhail's first "talent map": a one-page table covering the four segments, with for each: where they are (named countries or institutions), what they need, the Suhail product that serves them, one metric with a first-season target (labelled illustrative), and one partner type. Add three lines on data Suhail should start collecting (with consent) because public data is missing.`,
            rubric: [
              "Covers all four segments with concrete places and institutions",
              "Needs are specific to each segment, not generic",
              "Each segment maps to a real Suhail product (hackathons, newsletter, The Majlis, Suhail Season, research arm, employer and investor connections)",
              "Metrics are measurable outcomes, with targets clearly labelled illustrative and no invented traction",
              "Addresses consent and fairness",
              "Identifies data gaps (emigration, diaspora size, salaries) and a sensible first-party data plan",
            ],
            modelAnswer: md`**Suhail talent map v1 (targets illustrative, for season one)**

| Segment | Where | Need | Suhail product | Metric (illustrative target) | Partner |
|---|---|---|---|---|---|
| Producing markets | Cairo, Alexandria, Amman, Tunis, Casablanca | Visibility to employers and investors; remote roles | Online plus Cairo hackathon; finalist showcase | 30% of finalists get an employer or investor meeting within 60 days | Offshoring firms; Gulf employers hiring remotely |
| Gulf nationals | Riyadh, Abu Dhabi, Dubai, Kuwait City, Doha | Hands-on AI projects; links to national programmes | Arabic-first workshops and a national-employer track | 40% of in-person participants are nationals | National champions; digital agencies |
| Researchers | MBZUAI, KAUST, TII, QCRI, national universities | Datasets, collaborators, audiences for their models | Dialect benchmark challenge; research talks | 20 benchmark submissions | Research institutes |
| Diaspora | London, Berlin, Paris, Bay Area, Toronto | Ways to contribute; path back | Remote mentoring and judging; The Majlis guests; returner session at Suhail Season | 25 active diaspora mentors | Diaspora networks; VCs |

**Principles:** opt-in profiles only; no sponsor problem that is unpaid client work; bilingual content; rotate cities.

**Data to collect (with consent):** (1) home country, current country and willingness to relocate or work remotely, at registration; (2) 60 and 180-day follow-up on meetings, offers and hires; (3) annual anonymous pay and migration survey of members, published in aggregate, because no reliable public data exists.`,
            explanation: md`Graders check coverage, specificity, links to real Suhail products, measurable illustrative targets, consent and a credible plan for missing data.`,
            concepts: ["sh06.talent-geography", "sh06.brain-circulation", "sh06.diaspora"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain the difference between brain drain and brain circulation, and what a community can do about it, to an Egyptian university dean.",
          keyPoints: [
            "Drain: skilled people leave and the home market loses them",
            "Circulation: people who leave or work remotely keep contributing (mentoring, hiring, investing, returning)",
            "Remote and offshore work let engineers earn global pay without leaving; Egypt's offshoring exports were about USD 5.2 bn in 2025",
            "A community keeps people connected across borders and creates the occasions for contribution",
            "Reliable migration data is missing, so claims should be modest and first-party data collected with consent",
          ],
        },
        { kind: "xref", to: "fc09-l01", note: "Hiring and interviewing (scorecards, work samples): what employers who hire through Suhail should do, and what Suhail's own team hiring follows." },
        { kind: "xref", to: "sh02-l01", note: "Sponsor outcome metrics such as cost per hire: how a hiring sponsor judges a Suhail hackathon." },
        { kind: "sources", refs: ["sh06-r45", "sh06-r46", "sh06-r47"] },
      ],
    },
  ],
  quiz: [
    {
      id: "sh06-l04-q1",
      type: "mcq",
      prompt: "Which talent fact is recorded in the course research?",
      options: [
        "Egypt's offshoring exports were about USD 5.2 bn in 2025 with a USD 6 bn target for 2026",
        "One in three Arab engineers emigrates within five years",
        "The Arab tech diaspora numbers about 2 million",
        "Gulf AI salaries are ten times Egyptian salaries",
      ],
      answer: 0,
      explanation: md`Only the Egypt offshoring figure (Zawya, 2026) is in the research; emigration, diaspora size and salary ratios were not found and must not be quoted without a source.`,
      concepts: ["sh06.talent-geography"],
      difficulty: 1,
    },
    {
      id: "sh06-l04-q2",
      type: "numeric",
      prompt: md`Egypt offshoring: USD 5.2 bn (2025) to a USD 6 bn target (2026). Implied growth in percent?`,
      answer: 15.4,
      tolerance: { abs: 0.2 },
      unit: "%",
      explanation: md`$6.0/5.2 - 1 = 0.154$, about 15.4%.`,
      concepts: ["sh06.talent-policy"],
      difficulty: 1,
    },
    {
      id: "sh06-l04-q3",
      type: "multi",
      prompt: "Which are examples of brain circulation rather than brain drain? (Select all that apply.)",
      options: [
        "A Cairo engineer works remotely for a Riyadh startup",
        "A Berlin-based Arab ML lead judges and mentors at a Suhail hackathon",
        "An engineer emigrates and loses all contact with the region",
        "A diaspora founder returns to start a company in Abu Dhabi",
        "A London researcher angel-invests in a Tunisian startup",
      ],
      answer: [0, 1, 3, 4],
      explanation: md`Circulation keeps skills and capital flowing back; only the engineer who disconnects is pure drain.`,
      concepts: ["sh06.brain-circulation"],
      difficulty: 1,
    },
    {
      id: "sh06-l04-q4",
      type: "mcq",
      prompt: "A Riyadh employer asks Suhail for a CSV of all hackathon participants' contacts. What is the right response?",
      options: [
        "Send it: participants registered for the event",
        "Offer opt-in profiles of participants who consented to share with employers, plus introductions",
        "Sell it at a premium tier",
        "Send only the winners' contacts without asking them",
      ],
      answer: 1,
      explanation: md`Builders gave data for the event, not for recruiting. Opt-in sharing keeps trust and is what a durable talent product rests on.`,
      concepts: ["sh06.talent-geography"],
      difficulty: 1,
    },
    {
      id: "sh06-l04-q5",
      type: "numeric",
      prompt: md`E£180K per year at an assumed E£50 per USD is how many USD per year?`,
      answer: 3600,
      tolerance: { abs: 10 },
      unit: "USD",
      explanation: md`$180{,}000/50 = 3{,}600$ USD. Always state the rate and its date.`,
      concepts: ["sh06.talent-geography"],
      difficulty: 1,
    },
    {
      id: "sh06-l04-q6",
      type: "decision",
      prompt: md`You must choose the city for Suhail's first in-person hackathon. Sponsors are mostly Gulf employers; the largest builder pools are in producing markets. What do you do?`,
      options: [
        { text: "Dubai only, because the sponsors are there.", score: 0.4, feedback: "Easy for sponsors, but it excludes most builders who cannot get visas or travel funding, and makes Suhail look like a Dubai community." },
        { text: "Pick one city with good sponsor access and visa-light travel for regional builders, add an online track, fund some travel for finalists from producing markets, and plan the next event in a producing market.", score: 1, feedback: "Balances sponsor access with builder reach and commits to rotation." },
        { text: "Cairo only, because the talent is there.", score: 0.6, feedback: "Strong builder pool; sponsors may still come, but test that first and plan employer attendance carefully." },
      ],
      explanation: md`The talent geography argues for rotation and an online track; the first event's city is a trade-off, not an identity.`,
      concepts: ["sh06.talent-geography", "sh06.brain-circulation"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "sh06-l04-f1", front: "Four talent segments", back: "Producing markets (Egypt, Maghreb, Levant), Gulf hiring markets, research hubs (MBZUAI, KAUST, TII, QCRI), diaspora.", concepts: ["sh06.talent-geography"] },
    { id: "sh06-l04-f2", front: "Egypt talent facts (research)", back: "Offshoring about USD 5.2 bn 2025, target USD 6 bn 2026; 800K ICT-trained target; about 750K graduates a year (Zawya, 2026).", concepts: ["sh06.talent-geography"] },
    { id: "sh06-l04-f3", front: "Brain circulation", back: "Movement that returns value: remote work, mentoring, angel investing, return migration. Communities keep people connected so it happens.", concepts: ["sh06.brain-circulation"] },
    { id: "sh06-l04-f4", front: "Policy levers on talent", back: "Residency schemes (UAE Golden Visa, Saudi Premium Residency, both 2019), nationalisation quotas (Nitaqat, Emiratisation, Kuwaitisation), skills targets, offshoring promotion.", concepts: ["sh06.talent-policy"] },
    { id: "sh06-l04-f5", front: "Missing talent data", back: "Emigration, diaspora size, researcher counts, reliable salaries: not found. Do not quote without a dated primary source.", concepts: ["sh06.talent-geography"] },
    { id: "sh06-l04-f6", front: "Rule for pay conversions", back: "State the exchange rate and its date; show the sensitivity. Self-reported salary data has small samples.", concepts: ["sh06.talent-geography"] },
  ],
};

export default lesson;
