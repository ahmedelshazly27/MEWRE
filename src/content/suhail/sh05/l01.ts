import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh05-l01",
  title: "Editorial strategy: audience, positioning, calendar and independence",
  summary:
    "Suhail's newsletter and The Majlis podcast are the community's always-on product between events. This lesson defines who they are for, what Suhail publishes and why, how to turn that into content pillars and an editorial calendar a volunteer team can actually sustain (production load and utilisation), and the independence rules that keep sponsors from buying editorial judgement.",
  minutes: 70,
  objectives: [
    "You can define Suhail's editorial audience by job to be done and write a one-sentence editorial promise",
    "You can derive three to five content pillars from the mission and test each against reader value and production cost",
    "You can compute the weekly production load of a calendar and its utilisation of volunteer hours, and set a cadence that holds",
    "You can write an editorial independence policy: labelling, sponsor access, conflicts of interest and corrections",
  ],
  concepts: [
    { id: "sh05.editorial-promise", name: "Editorial promise", description: "One sentence stating who the publication is for, what it gives them every issue and why only this publication can: the test every story idea is held against.", competency: "sh-media", related: ["fc03.positioning"] },
    { id: "sh05.content-pillars", name: "Content pillars", description: "Three to five recurring categories of content derived from the mission (for Suhail: builder stories, Arab AI landscape, opportunities, community news, research notes), each with a format, owner and cadence.", competency: "sh-media", related: ["sh05.editorial-promise"] },
    { id: "sh05.editorial-calendar", name: "Editorial calendar and production load", description: "The planned schedule of issues and episodes, with each item's production hours; load per week divided by available volunteer hours gives utilisation, which should stay at or below about 80%.", competency: "sh-media", related: ["sh05.content-pillars"] },
    { id: "sh05.editorial-independence", name: "Editorial independence", description: "Rules that separate paid content from editorial: clear labels, no sponsor preview or veto of editorial, declared conflicts of interest, and a corrections policy. Independence is what gives sponsored placements their value.", competency: "sh-media", related: ["sh05.editorial-promise"] },
    { id: "sh05.audience-jobs", name: "Audience by job to be done", description: "Defining readers by what they hire the publication for (find collaborators, track Arab AI, find jobs or investors) rather than by demographics, so each segment's value can be served and measured.", competency: "sh-media", related: ["fc03.icp"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What Suhail publishes and why",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Events happen a few times a quarter; the newsletter and The Majlis reach builders every week or two. They are how a builder in Cairo or Riyadh first meets Suhail, how sponsors judge whether Suhail has an audience worth paying for, and how the research arm's work gets read. With volunteer leads and no budget in 2027, the editorial strategy decides whether media is an engine of the community or a weekly chore that quietly dies after issue nine.`,
        },
        {
          kind: "md",
          md: md`### Start from the audience's jobs, not demographics

"Arab tech people" is not an audience. Define readers by what they **hire** the publication to do (the jobs-to-be-done lens from product management):

| Segment (illustrative) | Job they hire Suhail media for | What success looks like for them |
|---|---|---|
| Builders (engineers, ML practitioners, students) | Find peers, events, datasets, jobs; learn what Arab teams are shipping | Registers for a hackathon, joins a team, gets a job lead |
| Founders | Track funding, programmes, investors, hiring | Meets an investor or hire through Suhail |
| Investors and employers | Find talent and deal flow early | Contacts a builder featured in an issue |
| Ecosystem (universities, governments, labs) | Understand the builder community | Partners on an event or dataset |

The first two segments are the core. Investors and employers are the **monetisable** side, but they only pay attention because the builders are there. That ordering is the whole strategy: serve builders first, and sponsors follow the audience.

### The editorial promise

Write one sentence that every story idea must pass:

> **For builders across the Arab world: the people, tools, opportunities and research worth your time this fortnight, written by people who build.**

The promise has three working parts: **who** (builders, Arab world), **what** (people, tools, opportunities, research), **why us** (curated by builders, regional, bilingual). An idea that serves none of these goes elsewhere, however interesting.

### Content pillars

Pillars turn the promise into repeatable slots. Each pillar has a format, an owner and a cadence, so a volunteer can produce it without asking the editor what to write.`,
        },
        {
          kind: "matrix",
          title: "Testing candidate pillars: reader value vs production cost",
          xAxis: ["Low production cost", "High production cost"],
          yAxis: ["Low reader value", "High reader value"],
          cells: [
            { label: "Opportunities and community news", detail: "Calls for hackathon teams, open roles, grants, programme deadlines, member launches. Cheap to compile from submissions; high value to builders. The backbone of every issue." },
            { label: "Builder stories and The Majlis", detail: "Profiles and long conversations with Arab builders. Expensive (interviews, editing, Arabic and English) but the reason people forward the newsletter. Ration it: one per issue or episode." },
            { label: "Generic AI news roundup", detail: "Rewriting global headlines. Cheap, but readers already get it elsewhere. Only include items with an Arab-world angle Suhail can add." },
            { label: "Opinion essays with no evidence", detail: "Costly to write well, low value if they are not grounded in data or experience. Avoid until the editorial team has earned the voice." },
          ],
          caption: "A pillar earns its slot if it serves the promise and someone can produce it repeatedly. Research notes from the planned research arm (datasets, benchmark results) sit top right once that arm exists.",
        },
        {
          kind: "md",
          md: md`A first set of pillars for Suhail (to be tested, not a launched plan):

1. **Opportunities**: hackathons, roles, grants, calls for papers, in the region and remote-friendly.
2. **Builder story**: one Arab builder or team, what they built, how, what they need.
3. **Arab AI landscape**: one development explained (an open Arabic model release, a new benchmark, a sovereign compute deal), with what it means for builders. The landscape module of this track is the source base.
4. **Community**: what happened at Suhail events, member launches, volunteer calls.
5. **Research notes** (later): results and datasets from the research arm.

### The calendar is a capacity problem

An editorial calendar is a schedule of items, each with a production cost in hours. The constraint is volunteer time, so plan it like a production line:`,
        },
        { kind: "equation", formula: "sh05-production-load" },
        { kind: "equation", formula: "sh05-utilisation" },
        {
          kind: "md",
          md: md`Keep utilisation **at or below about 0.8**. Volunteer hours are the least reliable resource in the plan: exams, jobs, Ramadan and summer travel take them away without notice. A calendar planned at 100% misses its first deadline and then its second, and a newsletter that skips issues loses trust faster than one that publishes less often on schedule. Consistency beats frequency.

### Independence is the product

Sponsors pay for the attention of readers who **trust** the publication. If readers suspect coverage is for sale, the attention and the sponsorship value disappear together. The rules are simple and must be written before the first sponsor signs:

- **Labels:** every paid placement is marked "Sponsored" (in Arabic **برعاية** or **محتوى مدفوع**) at the placement, not in a footer.
- **No preview, no veto:** sponsors see their own ad copy before publication, never editorial content. A sponsor is never told in advance whether it will be covered.
- **Conflicts declared:** when Suhail writes about a sponsor, a partner, a lead's employer, or its own research arm's results, the piece says so.
- **Sponsors cannot buy rankings:** benchmark coverage, "top builders" lists and research results are never sold. This matters doubly once the research arm publishes Arabic model evaluations that sponsors' models appear in.
- **Corrections:** errors are corrected visibly in the next issue and in the web archive.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Advertising disclosure rules differ by market",
          md: md`In the EU, the Unfair Commercial Practices Directive (2005/29/EC, Annex I) bans editorial content paid for by a trader without making that clear, and the US FTC Endorsement Guides require clear disclosure of material connections. Gulf states have their own media and advertising licensing regimes for online content and advertising (for example in the UAE and Saudi Arabia) that have changed several times since 2018. Before Suhail sells its first placement, check the current rules in the country where Suhail is registered and where it targets readers; this brief has not verified the Gulf rules.`,
        },
        { kind: "xref", to: "fc03.positioning", note: "Positioning method (competitive alternatives, unique attributes, value) applied here to a publication instead of a product." },
        { kind: "xref", to: "fc05-l02", note: "Content economics and content by buying stage: the general marketing view of content that this lesson applies to a media product." },
      ],
    },
    {
      layer: "applied",
      title: "Sizing a calendar the team can sustain",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Weekly newsletter plus fortnightly podcast, or something smaller?",
          given: md`Illustrative plan for Q1 2027. Volunteer hours available per week: Editorial lead 6 h, three volunteers at 3 h each, so $H = 15$ h/week. Production cost per item: newsletter issue 10 h (research and curation 4, writing 3, Arabic edition 2, QA and send 1); Majlis episode 14 h (guest prep 2, recording 2, editing 6, show notes and clips 4). Target utilisation at most 0.8.`,
          steps: [
            { md: md`**Option 1, weekly newsletter and fortnightly podcast.** $L = 10 \times 1 + 14 \times 0.5 = 17$ h/week. $U = 17/15 = 1.13$. Over capacity before anyone is ill.` },
            { md: md`**Usable hours:** $0.8 \times 15 = 12$ h/week.` },
            { md: md`**Option 2, weekly newsletter and monthly podcast.** Monthly is $12/52 = 0.231$ episodes per week. $L = 10 + 14 \times 0.231 = 13.2$ h/week, $U = 0.88$. Still above target.` },
            { md: md`**Option 3, fortnightly newsletter and fortnightly podcast.** $L = 10 \times 0.5 + 14 \times 0.5 = 12$ h/week, $U = 12/15 = 0.80$. On target.` },
            { md: md`**Check the trade-off:** Option 3 gives 26 issues and 26 episodes a year. A fortnightly issue is also easier to fill with genuinely useful opportunities than a thin weekly one.` },
          ],
          result: md`Launch with a **fortnightly newsletter and a fortnightly Majlis**, alternating weeks so the team has one deliverable per week. Move to weekly only after adding volunteer hours or cutting per-issue cost (templates, a submissions form for opportunities), and re-run the load calculation first.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A leaner plan with a monthly podcast",
          given: md`Illustrative. $H = 14$ h/week. Weekly newsletter at 8 h per issue (no Arabic edition yet). Monthly Majlis episode at 16 h.`,
          steps: [
            { md: md`Podcast frequency $f = 12/52$ episodes per week; podcast load $= 16 \times 12/52$.` },
            { md: md`$= 3.69$ h/week.`, hidden: true, check: { prompt: "Podcast load (h/week)", answer: 3.69, unit: "h/week", tolerance: { abs: 0.02 } } },
            { md: md`Total $L = 8 + 3.69 = 11.69$ h/week; $U = 11.69/14$.` },
            { md: md`$U = 0.84$.`, hidden: true, check: { prompt: "Utilisation", answer: 0.835, tolerance: { abs: 0.01 } } },
          ],
          result: md`At 0.84 the plan is slightly over target with no slack for the Arabic edition. Either cut newsletter cost to about 7 h or add a volunteer before launch.`,
        },
        {
          kind: "question",
          question: {
            id: "sh05-l01-p1",
            type: "numeric",
            prompt: md`Illustrative. The team adds a second Editorial volunteer, raising $H$ to 18 h/week. The plan is a weekly newsletter at 9 h per issue and a fortnightly Majlis episode at 12 h. What is the utilisation $U$? (2 decimals)`,
            answer: 0.83,
            tolerance: { abs: 0.01 },
            explanation: md`$L = 9 \times 1 + 12 \times 0.5 = 15$ h/week; $U = 15/18 = 0.83$. Just above the 0.8 target: workable for a quarter, but with no slack for a guest cancellation or exam season.`,
            concepts: ["sh05.editorial-calendar"],
            difficulty: 1,
          },
        },
        {
          kind: "md",
          md: md`### A four-week calendar on one page (illustrative)

| Week | Newsletter (fortnightly) | The Majlis (fortnightly) | Owner |
|---|---|---|---|
| 1 | Issue: opportunities, builder story, landscape explainer | | Editorial lead |
| 2 | | Episode with a builder featured in a past issue, plus two clips | Podcast volunteer |
| 3 | Issue: opportunities, hackathon recap, community | | Editorial lead |
| 4 | | Episode recorded at the hackathon, plus clips | Podcast volunteer |

Recording is always at least two episodes ahead of release (a **buffer**), so one cancellation does not break the schedule.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Running editorial in practice",
      blocks: [
        {
          kind: "md",
          md: md`### Who does what

- **Editorial lead:** owns the promise, the calendar and the final yes on every issue. Writes or edits the lead story.
- **Section owners (volunteers):** each owns one pillar and a template for it.
- **Partnerships lead:** sells sponsorship and handles sponsor copy, but has **no** say on editorial. This separation is the most important line in the org chart for media.
- **Founder:** sets strategy and defends independence when a sponsor pushes; does not edit every issue.

### Documents to create before issue 1

1. **Editorial charter** (one page): audience, promise, pillars, cadence, independence rules.
2. **Style guide**: Arabic register, how to write names in both scripts, numbers, dates, inclusive language, banned phrases (startup hype words without evidence).
3. **Templates** per pillar, and a submissions form for opportunities and community news.
4. **Sponsorship policy**: what can be sold, labels, sponsor copy deadlines, what sponsors never get.
5. **Corrections and complaints procedure**.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`**Launching weekly on enthusiasm:** issue 1 to 6 arrive on time, then exams start. **Pillars that need the editor:** if only the lead can write a section, the publication has one point of failure. **Sponsor creep:** a "partner spotlight" that is really an ad, unlabelled, in issue 4. **News roundups with no regional angle:** readers unsubscribe because they already read the same headlines elsewhere. **Covering a sponsor's model favourably in a benchmark story** without a disclosure, which damages both the newsletter and the research arm.`,
        },
        {
          kind: "checklist",
          title: "Before publishing any issue",
          items: [
            "Every item passes the editorial promise (who, what, why us)",
            "Every paid placement is labelled at the placement, in both languages",
            "Conflicts of interest are disclosed in the piece (sponsor, partner, lead's employer, research arm)",
            "Names, titles, numbers and links checked by a second person",
            "No claim of Suhail traction that does not exist (members, sponsors, attendance)",
            "Calendar utilisation for the next four weeks recalculated after any volunteer change",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask a volunteer pitching a new section",
          items: [
            "Which reader job does it serve, and how will we know it worked?",
            "How many hours per issue, and who covers it when you are away?",
            "Can it be produced from a template and submissions, or does it need original reporting every time?",
            "Does it create a conflict with a sponsor or partner?",
          ],
        },
        { kind: "scenario", scenario: "sh05-s1" },
        {
          kind: "question",
          question: {
            id: "sh05-l01-p2",
            type: "short",
            prompt: md`**Produce it.** Write Suhail's one-page **editorial charter** for the launch in January 2027: audience segments with their jobs, the editorial promise in one sentence, three to five pillars with format and cadence, the launch calendar with its utilisation calculation (use illustrative volunteer hours), and the independence rules. Do not claim any traction.`,
            rubric: [
              "Audience defined by jobs to be done, with builders as the core and sponsors as the monetisable side",
              "A one-sentence promise naming who, what and why Suhail",
              "Three to five pillars, each with format, owner role and cadence",
              "A cadence justified by a production-load and utilisation calculation at or below about 0.8",
              "Independence rules covering labels in both languages, no sponsor preview or veto, conflict disclosure, rankings not for sale, corrections",
              "No invented members, sponsors or numbers; illustrative numbers labelled",
            ],
            modelAnswer: md`**Suhail editorial charter (draft, January 2027).**

**Audience.** Core: Arab builders (engineers, ML practitioners, students) who want peers, events, datasets and jobs; founders who want investors, programmes and hires. Monetisable side: employers and investors looking for talent and deal flow; ecosystem partners. We serve builders first.

**Promise.** For builders across the Arab world: the people, tools, opportunities and research worth your time this fortnight, written by people who build.

**Pillars.** (1) Opportunities: hackathons, roles, grants, deadlines; template plus submissions form; every issue; volunteer owner. (2) Builder story: one profile, 600 words, Arabic and English; every issue; Editorial lead. (3) Arab AI landscape: one development explained with what it means for builders; every issue; volunteer. (4) Community: event recaps and member launches; when there is news. (5) Research notes once the research arm publishes.

**Cadence.** Illustrative capacity 15 h/week. Newsletter 10 h per issue, Majlis 14 h per episode. Fortnightly both, alternating weeks: $L = 5 + 7 = 12$ h/week, $U = 0.80$. Weekly only after hours rise and the load is recalculated. Two episodes recorded ahead of release.

**Independence.** Paid placements labelled Sponsored / برعاية at the placement. Sponsors approve their own ad copy only; they never preview or veto editorial and are not told in advance about coverage. Conflicts (sponsors, partners, leads' employers, our research arm) disclosed in the piece. Rankings, benchmark coverage and research results are never for sale. Errors corrected in the next issue and the archive. The Partnerships lead sells, the Editorial lead decides; disputes go to the founder, whose default is the reader.`,
            explanation: md`A strong charter starts from reader jobs, derives pillars from a one-sentence promise, sizes the cadence with the production-load calculation, and writes the independence rules before any sponsor is signed. Check every number is labelled illustrative.`,
            concepts: ["sh05.editorial-promise", "sh05.content-pillars", "sh05.editorial-calendar", "sh05.editorial-independence"],
            difficulty: 2,
          },
        },
        { kind: "sources", refs: ["sh05-r1", "sh05-r2", "sh05-r3"] },
        {
          kind: "feynman",
          prompt: "Explain to a prospective sponsor, in under a minute, why Suhail will not let them preview or approve editorial coverage, and why that makes their sponsorship worth more.",
          keyPoints: [
            "Sponsors buy the attention of readers who trust the publication",
            "If coverage looks bought, readers discount everything including the sponsor's ad",
            "Sponsors approve their own labelled copy, never editorial",
            "Conflicts are disclosed, rankings and research results are never for sale",
            "Independence protects the sponsor too: being featured editorially then means something",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh05-l01-q1",
      type: "mcq",
      prompt: md`Which definition of Suhail's editorial audience is most useful for planning content?`,
      options: [
        "Arabic-speaking people interested in technology, aged 18 to 40",
        "Builders across the Arab world who want peers, events, datasets and jobs, plus founders tracking investors and hires",
        "Anyone who might sponsor an event",
        "All subscribers of competing newsletters",
      ],
      answer: 1,
      explanation: md`Defining readers by the job they hire the publication for tells you what to publish and how to measure success. Demographics and sponsor lists do neither. Sponsors follow the builder audience; they are not the audience.`,
      concepts: ["sh05.audience-jobs"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh05-l01-q2",
      type: "numeric",
      prompt: md`Illustrative. Volunteer hours $H = 12$ h/week. A weekly newsletter costs 7 h per issue. What is the maximum number of hours per Majlis episode for a fortnightly podcast that keeps utilisation at 0.8?`,
      answer: 5.2,
      tolerance: { abs: 0.05 },
      unit: "h",
      explanation: md`Usable hours $= 0.8 \times 12 = 9.6$ h/week. Newsletter takes 7, leaving 2.6 h/week. Fortnightly means 0.5 episodes per week, so $h = 2.6/0.5 = 5.2$ h per episode, which is too little for a well-edited interview. Choose a monthly podcast or cut the newsletter cost.`,
      concepts: ["sh05.editorial-calendar"],
      difficulty: 2,
    },
    {
      id: "sh05-l01-q3",
      type: "multi",
      prompt: md`Which belong in Suhail's editorial independence policy?`,
      options: [
        "Paid placements are labelled at the placement in Arabic and English",
        "Sponsors may review articles that mention them before publication",
        "Coverage of a sponsor's model in a benchmark story discloses the sponsorship",
        "Rankings and research results are never sold",
        "Sponsors approve the copy of their own ad",
      ],
      answer: [0, 2, 3, 4],
      explanation: md`Sponsors control their own labelled ad copy, nothing else. Pre-publication review of editorial by a sponsor is exactly the access that destroys reader trust.`,
      concepts: ["sh05.editorial-independence"],
      difficulty: 1,
    },
    {
      id: "sh05-l01-q4",
      type: "decision",
      prompt: md`Three months after launch, the Editorial lead proposes going from a fortnightly to a weekly newsletter because open rates are good. Current utilisation is 0.78. What do you do?`,
      options: [
        { text: "Approve: momentum matters", score: 0.2, feedback: "Weekly doubles the newsletter load; utilisation would jump well above 1 and the schedule would break within weeks." },
        { text: "Recalculate the load for weekly, and approve only with added volunteer hours or a cheaper issue format that keeps utilisation at or below about 0.8", score: 1, feedback: "Right: cadence is a capacity decision. Good open rates are also a weak signal (see Lesson 2 on Apple MPP)." },
        { text: "Refuse permanently: fortnightly is the policy", score: 0.4, feedback: "The policy should follow capacity and reader value, not be fixed forever." },
        { text: "Go weekly but drop the Arabic edition to save time", score: 0.3, feedback: "This trades the mission (Arabic-first readers) for frequency without asking whether readers want more issues." },
      ],
      explanation: md`Frequency is constrained by volunteer hours, and missed issues cost more trust than a lower cadence. Decide with the production-load calculation and reader evidence (clicks, replies, forwards), not with open rates alone.`,
      concepts: ["sh05.editorial-calendar"],
      difficulty: 2,
    },
    {
      id: "sh05-l01-q5",
      type: "mcq",
      prompt: md`Which candidate pillar should Suhail cut or reshape first?`,
      options: [
        "Opportunities compiled from a submissions form",
        "One builder story per issue",
        "A rewrite of the week's global AI headlines with no regional angle",
        "Recaps of Suhail hackathons",
      ],
      answer: 2,
      explanation: md`A generic roundup is low value because readers get it elsewhere; it fails the "why us" part of the promise. Keep only items where Suhail adds an Arab-world angle.`,
      concepts: ["sh05.content-pillars", "sh05.editorial-promise"],
      difficulty: 1,
    },
    {
      id: "sh05-l01-q6",
      type: "order",
      prompt: md`Order the steps to set up Suhail's editorial operation.`,
      items: [
        "Define audience segments by job to be done",
        "Write the one-sentence editorial promise",
        "Choose pillars and templates",
        "Size the calendar against volunteer hours",
        "Write the independence and sponsorship policy before the first sale",
      ],
      explanation: md`Audience and promise come first because pillars are derived from them; the calendar is sized from pillar costs; the independence policy must exist before Partnerships sells anything.`,
      concepts: ["sh05.audience-jobs", "sh05.editorial-promise", "sh05.content-pillars", "sh05.editorial-calendar", "sh05.editorial-independence"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh05-l01-f1", front: "Suhail's editorial promise has which three parts?", back: "Who (builders across the Arab world), what (people, tools, opportunities, research), why us (curated by builders, regional, bilingual).", concepts: ["sh05.editorial-promise"] },
    { id: "sh05-l01-f2", front: "Production load formula", back: md`$L = \sum_i h_i f_i$: hours per item times items per week, summed.`, concepts: ["sh05.editorial-calendar"] },
    { id: "sh05-l01-f3", front: "Target utilisation for a volunteer editorial calendar", back: "At or below about 0.8; volunteer hours are the least reliable resource.", concepts: ["sh05.editorial-calendar"] },
    { id: "sh05-l01-f4", front: "What may a sponsor approve?", back: "Only the copy of its own labelled placement. Never editorial content, never rankings or research results.", concepts: ["sh05.editorial-independence"] },
    { id: "sh05-l01-f5", front: "Arabic labels for paid content", back: "برعاية (sponsored by) or محتوى مدفوع (paid content), at the placement.", concepts: ["sh05.editorial-independence"] },
    { id: "sh05-l01-f6", front: "Why keep a recording buffer for The Majlis?", back: "At least two episodes recorded ahead of release, so one guest cancellation does not break the schedule.", concepts: ["sh05.editorial-calendar"] },
  ],
  scenarios: [
    {
      id: "sh05-s1",
      title: "The sponsor wants to see the benchmark story",
      dayInLife: true,
      context: md`Illustrative, mid-2027. A hypothetical Gulf model lab, "Lab X", has signed a sponsorship package for four newsletter issues. The Editorial lead is preparing a landscape piece comparing open Arabic models on a public leaderboard; Lab X's model ranks fourth. Lab X's marketing manager emails the Partnerships lead.`,
      start: "a",
      concepts: ["sh05.editorial-independence"],
      nodes: {
        a: {
          md: md`"We heard you are writing about Arabic model rankings. As a sponsor we would like to review the piece before it goes out, to make sure our model is described accurately." The Partnerships lead forwards it to you and says the sponsor is worth a lot to the first quarter's budget.`,
          choices: [
            { text: "Let them review it: accuracy is in everyone's interest", next: "b", score: 1, feedback: "Pre-publication review by a sponsor is the access that destroys independence, whatever the stated reason." },
            { text: "Decline the review, offer a factual check: they may send corrections on facts about their model (parameters, licence, release date) and the piece will disclose the sponsorship", next: "c", score: 9, feedback: "Separates fact-checking from editorial control and makes the conflict visible to readers." },
            { text: "Drop Lab X from the piece to avoid the issue", next: "d", score: 4, feedback: "Avoids conflict, but distorts the coverage readers are owed. Sponsors should not change what is covered in either direction." },
          ],
        },
        b: {
          md: md`Lab X asks to change "ranks fourth" to "among the leading models" and to drop a sentence noting that the leaderboard figures are self-reported by vendors. The Editorial lead objects.`,
          choices: [
            { text: "Accept the changes this once", score: 0, feedback: "You have now sold editorial. If readers or another lab notice, the newsletter and the research arm both lose credibility." },
            { text: "Reverse course: publish the original wording with a sponsorship disclosure and tell Lab X the review was a mistake on your side", score: 6, feedback: "The right outcome, at the cost of an awkward conversation that a written policy would have prevented." },
          ],
        },
        c: {
          md: md`Lab X replies that other media let sponsors review "partner mentions" and asks whether you are sure about this.`,
          choices: [
            { text: "Point to the written independence policy they received with the contract, restate the factual-check offer, and confirm the sponsorship will continue to be labelled", score: 10, feedback: "Policy before pressure. Most serious sponsors accept a clear rule they were told about in advance." },
            { text: "Escalate to a call and negotiate a compromise wording", score: 5, feedback: "Negotiating wording with a sponsor is still editorial control. Talk to them, but do not trade words." },
          ],
        },
        d: {
          md: md`A reader notices that Lab X, a known sponsor, is missing from a ranking story it should be in, and posts about it.`,
          choices: [
            { text: "Publish a correction adding Lab X with a disclosure, and adopt the factual-check rule", score: 6, feedback: "Recovers, but the omission already signalled that sponsorship changes coverage." },
            { text: "Ignore it", score: 1, feedback: "Silence reads as confirmation." },
          ],
        },
      },
    },
  ],
};

export default lesson;
