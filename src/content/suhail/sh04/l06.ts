import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh04-l06",
  title: "Investors and employers as partners: connecting builders with capital and jobs",
  summary:
    "Investors want early, high-signal deal flow and employers want vetted talent; builders want money and work. Design the exchange so the builder stays the customer: double opt-in introductions, observed work as the signal, priced access instead of success fees on fundraising, and per-hire fees only where the law allows.",
  minutes: 65,
  objectives: [
    "You can state what investors and employers want from Suhail and what Suhail can offer each without compromising builders' interests.",
    "You can design double opt-in investor introductions and measure their quality.",
    "You can compare placement-fee and subscription models for hiring partners and compute the break-even number of hires.",
    "You can identify the regulatory questions (recruitment licensing, arranging investments) before charging for introductions.",
  ],
  concepts: [
    { id: "sh04.builder-first", name: "Builder-first exchange", description: "The rule that builders are the customer: investors and employers pay for access, but every introduction needs the builder's consent and must be in the builder's interest.", competency: "sh-partnerships", related: ["sh04.value-exchange"] },
    { id: "sh04.double-opt-in", name: "Double opt-in introduction", description: "An introduction made only after both sides have agreed separately to it, usually via a short forwardable summary; it protects reputation on both sides and makes intro acceptance measurable.", competency: "sh-partnerships", related: ["fc07.warm-intro"] },
    { id: "sh04.hiring-partner-models", name: "Hiring partner models", description: "Ways employers pay a community for talent access: sponsorship with hiring benefits, annual subscription to a talent pool or job board, sponsored challenges, or per-placement fees (which may need a recruitment licence).", competency: "sh-partnerships", related: ["sh04.partnership-structures"] },
    { id: "sh04.observed-work-signal", name: "Observed work as signal", description: "Hackathon output (code, demos, judged results, teamwork observed over a weekend) is a work sample, a stronger hiring and investing signal than a CV or a pitch, and the core of what Suhail can offer partners.", competency: "sh-partnerships", related: ["sh04.builder-first"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Two marketplaces with the builder in the middle",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Connecting builders with investors and employers is one of Suhail's stated purposes and likely one of its earliest revenue lines; the research brief notes that {Tech: Europe}'s newsletter runs job-post-style issues and a careers board, which suggests hiring is part of how such communities earn (inferred, unverified). Done well, it makes Suhail indispensable to all three sides. Done badly (spammy intros, CVs sold without consent, fees on fundraising), it burns the builders' trust that everything else depends on.`,
        },
        {
          kind: "md",
          md: md`### What each side wants

| Side | Wants | Suhail can offer | Must not happen |
|---|---|---|---|
| **Investors** (angels, seed VCs, accelerators) | Early, technical teams before others see them; a filter that saves time | Judging seats, office hours, demo days, a curated opt-in list of teams wanting to raise | Builders receive unwanted investor contact; Suhail is seen as a gatekeeper that charges founders |
| **Employers** (startups, corporates, labs) | Engineers with proven skills, especially in AI and Arabic NLP | Sponsored challenges, a job board, hiring sessions, opt-in talent profiles built from observed work | Builders' data sold without consent; Suhail acts as an unlicensed agency |
| **Builders** | Money, jobs, feedback, credibility | Introductions they choose, visibility of their work | Being treated as the product |

**Why the timing is good for investors.** MAGNiTT reports that total MENA venture funding fell 22 % year on year in H1 2026 while AI took about half of it (USD 678M); deal count fell 41 %. Fewer deals, concentrated in AI, means investors compete harder for the early technical teams a builder community sees first.

**Why the timing is good for employers.** Egypt's offshoring exports were about USD 5.2bn in 2025 with a USD 6bn target for 2026, Egypt produces about 750K graduates a year, and software development was about 58 % of ICT job openings (ITIDA, Apr 2024). Employers across the region compete for a talent pool they cannot easily evaluate. Rough Egyptian pay data (Payscale 2026: early-career software engineers about EGP 139K a year in Cairo) shows why Gulf and international employers hire there.

### Observed work is the signal

A CV or a pitch is self-reported. A hackathon shows, over a weekend, what a builder ships, how they work in a team and how they handle a hard problem under time pressure: a **work sample**, which Founder Core's hiring lesson identifies as among the most predictive hiring signals. For investors it is the same: they see the team build. That is Suhail's distinctive offer, and the reason to protect its quality.

### Double opt-in introductions

1. The builder or team opts in ("open to investor conversations" or "open to job offers") with a short profile.
2. The investor or employer receives the anonymised or summary profile and asks for an introduction.
3. Suhail asks the builder; only on a yes does it send a short email connecting both, with a forwardable summary.
4. Suhail records the outcome: accepted, meeting held, outcome.

The key metric is not the number of introductions but **intro acceptance** (share of requests builders accept) and **meeting conversion** (share of accepted intros that lead to a meeting); an investor whose requests are often declined is not seen as useful by builders.

### Hiring partner models`,
        },
        { kind: "equation", formula: "sh04-placement-breakeven" },
        {
          kind: "md",
          md: md`| Model | How it works | For Suhail | Caution |
|---|---|---|---|
| **Sponsorship with hiring benefits** | Employer sponsors an event; gets a hiring session and opt-in contacts | Simple, already in the sponsorship template | Benefits must be consent-based |
| **Annual subscription** | Access to job board, opt-in talent profiles, two sponsored challenges a year | Predictable revenue | Must deliver enough quality candidates |
| **Sponsored challenge** | Employer sets a real problem; best teams get interviews | Strong signal, good content | Not free labour: participants own their work |
| **Per-placement fee** | A percentage of the hire's first-year salary when someone is hired | Aligns pay with outcomes | May require a recruitment-agency licence; tracking hires is hard |`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Regulatory questions before charging for introductions",
          md: md`Two activities may be regulated depending on country and structure, and were not verified for this lesson. (1) **Recruitment:** several Gulf countries license private recruitment or employment agencies; charging employers per placement could fall under those rules. (2) **Arranging investments:** taking a fee tied to a successful fundraise (a success fee) can amount to arranging deals or acting as a broker, which is regulated in many jurisdictions, including the financial free zones (ADGM, DIFC) and Saudi Arabia's capital markets rules, and in the EU and US. Until a lawyer confirms otherwise, Suhail should charge investors and employers for **access and programmes**, not for **outcomes**, and never charge founders for introductions to investors.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Pricing a hiring partner offer",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Subscription or per-hire fee for a Gulf employer (illustrative)",
          given: md`Illustrative. A Gulf AI startup expects to hire 1 to 3 engineers a year from the Suhail community at about USD 60k first-year salary. Option 1: placement fee at 15 % of first-year salary (a common agency range is roughly 15 to 25 %). Option 2: annual subscription at USD 12k (job board, opt-in talent profiles, two sponsored challenges).`,
          steps: [
            { md: md`**Fee per hire:** $F_p = f\,S_y = 0.15\times60 = 9$ USD k.` },
            { md: md`**Break-even hires:** $n^{*} = A/F_p = 12/9 = 1.33$ hires a year.` },
            { md: md`**Employer view:** with 2 expected hires, per-hire costs USD 18k against USD 12k subscription: the subscription is cheaper. With 1 hire, per-hire (USD 9k) is cheaper.` },
            { md: md`**Suhail view:** the subscription is predictable, needs no hire tracking, and does not depend on a recruitment licence (to be confirmed). It does require enough candidates that the employer renews.` },
          ],
          result: md`Lead with the subscription at USD 12k for employers expecting two or more hires, and offer event sponsorship with hiring benefits to the rest. Keep per-placement fees off the table until the licensing question is answered.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: the same model for a Cairo role",
          given: md`Illustrative. A Cairo employer hires a mid-level engineer at EGP 600,000 a year (illustrative), at an assumed EGP 48 per USD. Fee rate 15 %.`,
          steps: [
            { md: md`Salary in USD: $600{,}000/48$.` },
            { md: md`$= $ **USD 12,500**.`, hidden: true, check: { prompt: "Salary in USD", answer: 12500, unit: "USD", tolerance: { abs: 1 } } },
            { md: md`Fee per hire: $0.15\times12{,}500$.` },
            { md: md`$= $ **USD 1,875**.`, hidden: true, check: { prompt: "Placement fee in USD", answer: 1875, unit: "USD", tolerance: { abs: 1 } } },
          ],
          result: md`At USD 1,875 a hire, per-placement revenue in Egypt barely covers the work of tracking it. Price Egyptian hiring partners on subscriptions or sponsored challenges, and use Gulf and international employers hiring Egyptian talent as the higher-value segment.`,
        },
        {
          kind: "question",
          question: {
            id: "sh04-l06-p1",
            type: "numeric",
            prompt: md`Illustrative: Suhail made 40 investor introduction requests to builders last quarter; builders accepted 26, and 18 of those led to a first meeting. What share of requests led to a meeting (in %)?`,
            answer: 45,
            tolerance: { abs: 0.5 },
            unit: "%",
            explanation: md`Acceptance $= 26/40 = 65$ %; meeting conversion of accepted $= 18/26 = 69$ %; overall $= 18/40 = 45$ %. Track both: low acceptance means investors ask for the wrong teams; low meeting conversion means introductions are poorly prepared.`,
            concepts: ["sh04.double-opt-in"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running investor and employer partnerships",
      blocks: [
        {
          kind: "md",
          md: md`### Practice

- **Investor partners:** invite a balanced set (several funds, angels, accelerators) so no single investor dominates access. From the research brief, the regional landscape includes Saudi-backed fund programmes (SVC, Jada, Sanabil 500 with 500 Global), accelerators (F6 Group, Hub71) and seed funds (for example Global Ventures, Khwarizmi Ventures with a Fund II first close of USD 70M+ in Feb 2026, Plus VC planning 40 Saudi investments in 2026); verify each fund's current focus before inviting it. Investors judge, hold office hours and may sponsor; they do not get exclusive first looks.
- **Demo days:** curated, opt-in, with a public list of participating investors. Founders own the follow-up.
- **Employer partners:** a job board (on the Suhail site, which already runs on Vercel with Supabase), sponsored challenges with clear IP terms, hiring sessions at events. Ask employers to publish salary ranges: it raises applications and builder trust.
- **Consent and data:** profiles are opt-in, visible only to partners the builder allows, editable and deletable by the builder.
- **Your own ventures:** Afterwave and Mizan may hire from Suhail through the same opt-in process as any employer, with no privileged access (lesson 5).`,
        },
        { kind: "xref", to: "fc07-l03", note: "Founder Core capital sources map, including Gulf funds and accelerators: use it to understand what each investor type needs before you invite it." },
        { kind: "xref", to: "fc09-l01", note: "Founder Core hiring: work samples and structured interviews. Suhail's hackathons are work samples at scale; tell employers how to use them." },
        { kind: "xref", to: "fc07.warm-intro", note: "Warm introductions with a forwardable email and double opt-in: the same mechanics apply to every introduction Suhail makes." },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Charging founders for investor access",
          md: md`Communities that charge founders to pitch investors, or take a cut of the round, lose the best founders, who have other routes, and may be carrying on a regulated activity. Charge investors for programmes they value, keep introductions free and consent-based for builders.`,
        },
        {
          kind: "checklist",
          title: "Before launching investor or employer programmes",
          items: [
            "Every introduction is double opt-in and logged with its outcome.",
            "Builders' profiles are opt-in, visible only to partners they approve, and deletable.",
            "No success fees on fundraising; per-placement fees only after legal confirmation in that country.",
            "No investor or employer has exclusive or first access.",
            "Sponsored challenges state that participants own their work.",
            "Your own ventures go through the same process as everyone else.",
          ],
        },
        { kind: "sources", refs: ["sh04-r1", "sh04-r8", "sh04-r20"] },
        {
          kind: "question",
          question: {
            id: "sh04-l06-p2",
            type: "short",
            explanation: md`A strong design keeps builders as the customer: consent-based double opt-in, observed work as the signal, priced access instead of outcome fees, explicit legal checks, and metrics that measure intro quality rather than volume.`,
            prompt: md`Design Suhail's 2027 investor and employer partner programme on one page: the offer to investors and to employers (with illustrative prices labelled), the double opt-in introduction process, the data and consent rules, the metrics you will report to partners and to builders, the regulatory questions to put to a lawyer, and how Afterwave and Mizan are treated.`,
            rubric: [
              "Separate offers for investors and employers built on observed work (judging, challenges, demo days, talent profiles), with illustrative prices labelled.",
              "Describes double opt-in introductions step by step and keeps them free for builders.",
              "States consent, visibility and deletion rules for builder data.",
              "Defines quality metrics (intro acceptance, meeting conversion, hires) rather than just counts.",
              "Lists the recruitment-licensing and arranging-investments questions for a lawyer and avoids success fees until answered.",
              "Treats the founder's own ventures on the same terms as other partners.",
            ],
            modelAnswer: md`**Suhail investor and employer partners 2027 (draft, prices illustrative)**

**Investors:** "Investor partner" annual programme at USD 5k (illustrative): two judging seats a year, quarterly office hours with opt-in teams, invitation to the Suhail Season demo day, the anonymised quarterly list of teams open to raising. No exclusive or first look; at least five investors per demo day.

**Employers:** "Hiring partner" subscription at USD 12k a year (illustrative): job board listings, access to opt-in talent profiles built from hackathon results, two sponsored challenges, one hiring session per event. Smaller employers buy event sponsorship with a hiring session. Salary ranges required in listings.

**Introductions:** builder opts in and writes a short profile; partner requests an intro from the summary; Suhail asks the builder; on yes, a short connecting email with a forwardable summary; outcome logged at 30 days. Free for builders, always.

**Data:** profiles opt-in, visible only to partners the builder selects, editable and deletable at any time; no partner receives bulk lists.

**Metrics:** to partners: intros requested, acceptance rate, meetings, hires; to builders (published twice a year): intros made, acceptance, meetings, hires and funding rounds reported by teams.

**Lawyer questions:** does a per-placement fee require a recruitment-agency licence in Saudi Arabia, the UAE, Egypt or our entity's country? Does any part of the investor programme count as arranging deals in investments in our entity's jurisdiction or in ADGM, DIFC or Saudi Arabia? Until answered: no success fees, no per-placement fees.

**My ventures:** Afterwave and Mizan may join as hiring partners on the same terms and process; I recuse from decisions about their access.`,
            concepts: ["sh04.builder-first", "sh04.double-opt-in", "sh04.hiring-partner-models", "sh04.observed-work-signal"],
            difficulty: 3,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh04-l06-q1",
      type: "mcq",
      prompt: md`An investor asks Suhail for the contact list of all hackathon participants. The right answer is:`,
      options: [
        "Send it: investors are partners.",
        "Offer double opt-in introductions to teams that have chosen to talk to investors, and decline the list.",
        "Sell the list at a premium.",
        "Send it with emails removed.",
      ],
      answer: 1,
      explanation: md`Builders are the customer. Bulk lists break consent and trust; double opt-in introductions give the investor what it actually wants (conversations with interested teams).`,
      concepts: ["sh04.builder-first", "sh04.double-opt-in"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh04-l06-q2",
      type: "numeric",
      prompt: md`Subscription USD 10k a year; placement fee 20 % of a USD 40k salary. What is the break-even number of hires a year?`,
      answer: 1.25,
      tolerance: { abs: 0.01 },
      unit: "hires/yr",
      explanation: md`$F_p = 0.20\times40 = 8$ USD k; $n^* = 10/8 = 1.25$ hires a year. An employer expecting two hires saves USD 6k with the subscription.`,
      concepts: ["sh04.hiring-partner-models"],
      difficulty: 1,
    },
    {
      id: "sh04-l06-q3",
      type: "multi",
      prompt: md`Which of these should Suhail avoid until a lawyer confirms they are permitted?`,
      options: [
        "A success fee of 2 % of a round raised by a team introduced at a demo day.",
        "A per-placement fee charged to employers.",
        "An annual hiring-partner subscription for job board access.",
        "Charging founders to pitch at a demo day.",
        "Event sponsorship with a hiring session.",
      ],
      answer: [0, 1, 3],
      explanation: md`Success fees on fundraising may be a regulated arranging activity; per-placement fees may need a recruitment licence; charging founders to pitch is both a trust and possibly a regulatory problem. Subscriptions and sponsorship are access products.`,
      concepts: ["sh04.hiring-partner-models", "sh04.builder-first"],
      difficulty: 2,
    },
    {
      id: "sh04-l06-q4",
      type: "mcq",
      prompt: md`Why is hackathon output a stronger signal for employers than a CV?`,
      options: [
        "It is longer.",
        "It is a work sample: observed output and teamwork under real constraints, not self-reported claims.",
        "It is reviewed by a sponsor.",
        "It contains the candidate's salary expectations.",
      ],
      answer: 1,
      explanation: md`Work samples are among the most predictive hiring signals because they show what someone actually does. That is Suhail's distinctive offer to employers.`,
      concepts: ["sh04.observed-work-signal"],
      difficulty: 1,
    },
    {
      id: "sh04-l06-q5",
      type: "decision",
      prompt: md`A large fund offers USD 30k a year to be Suhail's "exclusive investor partner" with first look at every team. What do you do?`,
      options: [
        { text: "Accept: it is the largest offer.", score: 0.2, feedback: "Exclusive first look makes Suhail one fund's funnel; other investors leave and founders lose competitive tension in their rounds." },
        { text: "Decline exclusivity and first look; offer a lead investor-partner package (more judging seats, a named office-hours series) at a price, alongside other investors.", score: 1, feedback: "Right: price visibility and access, keep the market open for builders." },
        { text: "Accept, but keep it secret.", score: 0, feedback: "Hidden exclusivity is worse: builders and other investors will find out." },
      ],
      explanation: md`Founders benefit from several investors seeing them; an exclusive first look serves one fund at their expense.`,
      concepts: ["sh04.builder-first"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "sh04-l06-f1", front: "Builder-first rule", back: "Investors and employers pay for access; builders consent to every introduction and are never charged for investor access.", concepts: ["sh04.builder-first"] },
    { id: "sh04-l06-f2", front: "Double opt-in steps", back: "Builder opts in, partner requests from a summary, Suhail asks the builder, intro on yes, outcome logged.", concepts: ["sh04.double-opt-in"] },
    { id: "sh04-l06-f3", front: "Placement fee break-even", back: md`$n^* = A/(f S_y)$`, concepts: ["sh04.hiring-partner-models"] },
    { id: "sh04-l06-f4", front: "Two regulatory questions before charging for introductions", back: "Recruitment-agency licensing for per-placement fees; arranging investments or broker rules for success fees on fundraising.", concepts: ["sh04.hiring-partner-models"] },
    { id: "sh04-l06-f5", front: "Intro quality metrics", back: "Acceptance rate (requests builders accept) and meeting conversion (accepted intros that lead to a meeting).", concepts: ["sh04.double-opt-in"] },
  ],
};

export default lesson;
