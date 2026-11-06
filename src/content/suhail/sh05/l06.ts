import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh05-l06",
  title: "Monetisation and operations: sponsorship, CPM maths, volunteer workflow and AI with human review",
  summary:
    "How Suhail media pays its way and keeps shipping. The lesson works through CPM and effective-CPM arithmetic for newsletter and podcast placements, shows why audience-based ad revenue is small at launch sizes and why packages tied to events and hiring sell better, defines what a sponsor report contains, then designs the production workflow for a volunteer team (roles, stages, two-person checks) and the rules for AI-assisted production (transcription, translation drafts, show notes, clips) with mandatory human review.",
  minutes: 80,
  objectives: [
    "You can compute placement revenue from CPM, and the effective CPM of a fixed-price package",
    "You can estimate annual media revenue from inventory, fill rate and price, and judge whether it matters at launch scale",
    "You can design sponsorship packages and a sponsor report that use honest, verifiable metrics",
    "You can lay out a volunteer production workflow with roles, stages and checks",
    "You can write an AI-assisted production policy that says what AI drafts and what a human must verify",
  ],
  concepts: [
    { id: "sh05.cpm-pricing", name: "CPM pricing", description: "Cost per mille: the price per 1,000 impressions (delivered emails, IAB downloads). Placement revenue = impressions / 1,000 times CPM. Niche, high-intent audiences command higher CPMs than mass audiences.", competency: "sh-media", related: ["sh05.iab-download"] },
    { id: "sh05.effective-cpm", name: "Effective CPM of a package", description: "Package price divided by thousands of impressions it delivers. Used to sanity-check fixed-price packages against market CPMs and to compare packages.", competency: "sh-media", related: ["sh05.cpm-pricing"] },
    { id: "sh05.inventory-fill", name: "Inventory and fill rate", description: "Inventory is the number of sellable placements (issues times slots, episodes times ad positions); fill rate is the share actually sold. Annual media revenue = inventory times fill times average price.", competency: "sh-media", related: ["sh05.cpm-pricing"] },
    { id: "sh05.sponsor-report", name: "Sponsor report", description: "After each campaign: placements delivered with dates, delivered emails, unique bot-filtered clicks on the sponsor's links, IAB downloads in a fixed window, and downstream actions where measurable. No inflated opens or raw requests.", competency: "sh-media", related: ["sh05.click-metrics"] },
    { id: "sh05.production-workflow", name: "Volunteer production workflow", description: "Defined stages (brief, draft, edit, fact check, language review, sponsor copy check, schedule, publish, report), one owner per stage, a second person for facts and names, and templates so any trained volunteer can run a stage.", competency: "sh-media", related: ["sh05.editorial-calendar"] },
    { id: "sh05.ai-human-review", name: "AI-assisted production with human review", description: "AI drafts transcripts, translations, show notes, subtitles and clip candidates; a named human verifies every quote against the audio, every name, number and claim, and the register. No synthetic voice or likeness of a real person without written consent.", competency: "sh-media", related: ["fc10.human-checkpoints"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "How media earns, and how it is produced",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Suhail's leads are unpaid until revenue, so the media operation must cost little and earn something, and you are the one who will set prices and sign sponsors. The maths here protects you from two errors: overpricing ad slots for a small list (and losing the first sponsors), and believing that newsletter and podcast ads alone can fund the team (they cannot at launch scale). The workflow and AI policy protect the brand: one fabricated quote in a guest's mouth costs more trust than a missed issue.`,
        },
        {
          kind: "md",
          md: md`### CPM arithmetic

Media is sold by attention delivered. For email the impression is a **delivered email** (not an open, for the reasons in Lesson 2); for podcasts it is an **IAB download** in a fixed window; for video, a view as the platform defines it.`,
        },
        { kind: "equation", formula: "sh05-cpm-revenue" },
        { kind: "equation", formula: "sh05-effective-cpm" },
        { kind: "equation", formula: "sh05-annual-media-revenue" },
        {
          kind: "md",
          md: md`CPMs vary widely. A niche, professional, high-intent audience (engineers, founders, hiring managers) commands much higher CPMs than mass consumer media, because a sponsor can reach the same people almost nowhere else. Prices are negotiated, rarely published, and should be tested (the pricing-experiment method in Founder Core): start with a rate card, then adjust from what sells.

### Why audience ads alone will not fund Suhail at launch

At launch scale (a few thousand subscribers, a few thousand downloads per episode) even a good CPM produces a few hundred US dollars per issue or tens per episode. Real money comes from **packages** that bundle media with what sponsors actually want from Suhail's audience:

| Package (illustrative) | Contents | What the sponsor buys |
|---|---|---|
| Hiring | Job listings in the opportunities section across several issues, a hiring slot at a hackathon, a featured role on the site | Candidates, cost per hire |
| Developer adoption | Newsletter placements, a Majlis mention, a hackathon challenge using their API or model, credits for participants | Activated developers |
| Season partner | Logo and copy across the Suhail Season campaign, newsletter and podcast, a talk slot | Brand with the Arab builder community |

Price packages on the outcome (candidates, activated developers) and check the media part with effective CPM so it is neither absurdly high nor given away. Event sponsorship economics are in the event economics module of this track.

### Sponsor reports

Within two weeks of each campaign: placements delivered (issue numbers, dates, episodes, timestamps), delivered emails, unique bot-filtered clicks on the sponsor's tracked links, IAB downloads per episode at 30 days, and downstream outcomes where measurable (applications, sign-ups using the sponsor's code). Never report raw requests, unfiltered clicks or open rates as headlines. A sponsor who can reconcile your report with their own analytics renews.

### The production workflow`,
        },
        {
          kind: "flow",
          title: "One newsletter issue, end to end",
          steps: [
            { label: "Brief (day 1)", detail: "Editorial lead sets the lead story, pillars and sponsor slots in the template." },
            { label: "Collect and draft (days 1 to 5)", detail: "Section owners fill their pillars from submissions and research; AI may draft summaries from sources the owner supplies." },
            { label: "Edit (day 6)", detail: "Editorial lead edits for the promise, voice and length." },
            { label: "Fact and name check (day 6)", detail: "A second person checks every name, title, number, date and link against the source." },
            { label: "Language review (day 7)", detail: "Arabic editor reviews the transcreated digest on the rendered proof." },
            { label: "Sponsor copy check (day 7)", detail: "Partnerships confirms sponsor copy and labels; no editorial changes." },
            { label: "Schedule and send (day 8)", detail: "Test send to both languages on phone and desktop clients, then send." },
            { label: "Report (day 9 onward)", detail: "Metrics logged; sponsor report within two weeks of the campaign end." },
          ],
          caption: "Every stage has one owner and a template. The fact check is never done by the person who wrote the item.",
        },
        {
          kind: "md",
          md: md`### AI-assisted production with human review

AI tools make a volunteer team several times faster at the mechanical stages. They also introduce specific failure modes: transcripts that mishear names and dialect words, translations that are fluent but wrong in register, summaries that attribute claims the guest never made, and confident numbers with no source.

| Task | AI can draft | A human must |
|---|---|---|
| Transcription | Full transcript with timestamps | Correct names, technical terms and dialect words; listen to every passage quoted anywhere |
| Translation | First draft of factual items | Transcreate hooks and calls to action; review register on the rendered proof |
| Show notes and summaries | Draft from the verified transcript | Check every claim against the audio; remove anything the guest did not say |
| Clips | Candidate moments and subtitle timing | Choose clips that keep context; check subtitles word by word; guest sees clips before release |
| Research for landscape items | Lists of candidate developments with sources | Open and read every source; date and verify every number; follow the research brief standard |
| Sponsor copy | Nothing beyond formatting | Sponsor supplies claims; Partnerships checks them against the labelled-placement rules |

Two hard rules: **no synthetic voice, dubbing or likeness of a real person** (guest, host or member) without their written consent for that specific use; and **disclose** AI-generated media (an AI voice for an announcement, a generated image) where readers could otherwise assume it is real.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Arabic speech recognition on dialect and code-switching",
          md: md`Automatic speech recognition is generally reported to be less accurate on dialectal Arabic and on Arabic-English code-switching than on MSA or English, and accuracy varies a lot by dialect and model. No verified error rates for current tools are in this brief. Measure it on Suhail's own episodes: transcribe one episode, correct it fully, and count corrections per minute before deciding how much review time to budget.`,
        },
        { kind: "xref", to: "fc10-l05", note: "Verification habits: recompute every number, open every source, keep a prompt library. The same rules apply to AI-drafted newsletter and podcast material." },
        { kind: "xref", to: "fc10.human-checkpoints", note: "Where to put human approval in an AI workflow, applied here to quotes, names, numbers and anything published under Suhail's name." },
        { kind: "xref", to: "fc06-l06", note: "Pricing economics with a Suhail newsletter sponsorship example: elasticity, optimal price and price discrimination behind the rate card." },
      ],
    },
    {
      layer: "applied",
      title: "Pricing placements and packages",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "What audience ads alone would earn in year one",
          given: md`Illustrative. Newsletter: 6,000 subscribers, 98% delivered (5,880), one primary sponsor slot per issue at a CPM of USD 40 on delivered emails, 26 issues a year. The Majlis: 1,500 IAB downloads per episode at 30 days, two host-read slots at a CPM of USD 25, 26 episodes. Fill rate 50% for both in the first year.`,
          steps: [
            { md: md`**Newsletter slot price:** $P = (5{,}880/1{,}000) \times 40 = 5.88 \times 40 =$ USD 235.20 per issue.` },
            { md: md`**Podcast price per episode (both slots):** $(1{,}500/1{,}000) \times 25 \times 2 =$ USD 75.` },
            { md: md`**Annual newsletter revenue:** $26 \times 1 \times 0.5 \times 235.20 =$ USD 3,058.` },
            { md: md`**Annual podcast revenue:** $26 \times 0.5 \times 75 =$ USD 975.` },
            { md: md`**Total:** about USD 4,000 a year, before the time spent selling and reporting each placement.` },
          ],
          result: md`About **USD 4,000 a year** from CPM placements at launch scale: useful, but nowhere near paying a lead. Sell **packages** tied to hiring, developer adoption and the Season, and use CPM only to check the media part of the price.`,
        },
        {
          kind: "worked",
          mode: "worked",
          title: "Effective CPM of a fixed-price package",
          given: md`Illustrative package at USD 1,500: four primary newsletter placements (5,880 delivered each) and one podcast mention (1,500 downloads).`,
          steps: [
            { md: md`**Impressions:** $4 \times 5{,}880 + 1{,}500 = 23{,}520 + 1{,}500 = 25{,}020$.` },
            { md: md`**Effective CPM:** $1{,}500/(25{,}020/1{,}000) = 1{,}500/25.02 =$ USD 59.95.` },
            { md: md`**Compare** with the rate-card CPMs (USD 40 newsletter, USD 25 podcast): the package costs about 50% more per thousand. Justify it with what CPM does not capture (four consecutive issues, a host-read endorsement), or add value (a job listing, a hackathon mention).` },
          ],
          result: md`eCPM about **USD 60**. A package priced well above the rate card needs a reason the sponsor can see; one priced below it trains sponsors to expect discounts.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A larger package one year later",
          given: md`Illustrative. Package at USD 2,400: six newsletter placements at 7,000 delivered each and two podcast mentions at 2,000 downloads each.`,
          steps: [
            { md: md`Impressions $= 6 \times 7{,}000 + 2 \times 2{,}000$.` },
            { md: md`$= 46{,}000$.`, hidden: true, check: { prompt: "Impressions", answer: 46000, tolerance: { abs: 1 } } },
            { md: md`eCPM $= 2{,}400/46$.` },
            { md: md`$= $ USD 52.17.`, hidden: true, check: { prompt: "Effective CPM (USD)", answer: 52.17, unit: "USD", tolerance: { abs: 0.05 } } },
          ],
          result: md`The larger audience lowers the eCPM at a higher price: the sponsor gets more per dollar and Suhail earns more per package.`,
        },
        {
          kind: "question",
          question: {
            id: "sh05-l06-p1",
            type: "numeric",
            prompt: md`Illustrative. 26 issues a year with two sponsor slots each, 40% fill in year one, average slot price USD 300. What is annual newsletter sponsorship revenue? (USD)`,
            answer: 6240,
            tolerance: { abs: 1 },
            unit: "USD",
            explanation: md`Inventory $= 26 \times 2 = 52$ slots; sold $= 0.40 \times 52 = 20.8$; revenue $= 20.8 \times 300 =$ USD 6,240.`,
            concepts: ["sh05.inventory-fill"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Selling, reporting and producing in practice",
      blocks: [
        {
          kind: "md",
          md: md`### Roles for the media operation (volunteer, until revenue)

| Role | Responsible for | Not responsible for |
|---|---|---|
| Editorial lead | Promise, calendar, final edit, independence | Selling |
| Section owners | One pillar each, from template | Final edit |
| Arabic editor | Transcreation and language review | Facts in English sources |
| Podcast lead and editor | Guests, recording, mastering, clips | Sponsor copy |
| Partnerships lead | Packages, sponsor copy, sponsor reports | Editorial content |
| Head of Engineering | Sending domains, templates, site, analytics | Content |
| Finance lead | Invoicing, revenue recognition for prepaid packages | Pricing decisions |

Volunteers sustain this when every stage has a template, a checklist and a backup person, and when the calendar is planned at utilisation of about 0.8 (Lesson 1). The volunteer-team module of this track covers recruiting, recognition and handover.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`**A rate card built on open rates**, which the first sponsor's link data contradicts. **Selling inventory you cannot deliver** (a weekly slot when issues go out fortnightly). **No sponsor report**, so there is no renewal conversation. **AI show notes published unreviewed**, putting words in a guest's mouth. **Prepaid packages spent as income** before the issues are delivered (the cash is a liability until delivered). **A single volunteer** owning the sending account with no backup access.`,
        },
        {
          kind: "checklist",
          title: "Before signing the first media sponsor",
          items: [
            "Rate card in delivered emails and IAB downloads, with effective CPM computed for each package",
            "Independence and labelling policy attached to the sponsorship contract",
            "Sponsor copy deadline, format and approval route defined",
            "Tracked links and codes prepared for the sponsor's placements",
            "Sponsor report template ready, with metric definitions",
            "Finance lead knows the delivery schedule for revenue recognition",
          ],
        },
        { kind: "scenario", scenario: "sh05-s2" },
        {
          kind: "question",
          question: {
            id: "sh05-l06-p2",
            type: "short",
            prompt: md`**Produce it.** Write Suhail's **media kit and rate card** (one page) plus a half-page **AI-assisted production policy**. The media kit states the audience by role and language (as a model or target, clearly labelled, since nothing has launched), the inventory, prices with CPM basis, two packages with their effective CPM, and what the sponsor report contains. The policy says what AI may draft, what a human must verify, consent and disclosure rules.`,
            rubric: [
              "Audience described honestly as targets or models, with no claimed subscribers, downloads or sponsors",
              "Prices expressed on delivered emails and IAB downloads, with correct CPM and effective-CPM arithmetic",
              "Packages tied to sponsor outcomes (hiring, developer adoption, Season) rather than impressions alone",
              "Sponsor report with verifiable metrics: delivered, bot-filtered clicks, IAB downloads in a window, downstream actions",
              "AI policy separating AI drafts from human verification of quotes, names, numbers and register, with consent for synthetic voice or likeness and disclosure rules",
            ],
            modelAnswer: md`**Suhail media kit (draft, 2027; all figures are targets, not results).**

**Audience model.** Arab builders, founders, students, and the employers and investors who want to reach them. Language preference collected at signup (Arabic, English, both). Target at end of year one: about 5,000 newsletter subscribers and about 1,500 IAB downloads per Majlis episode at 30 days. Sponsors are told these are targets until reached.

**Inventory.** Newsletter fortnightly, one primary slot and one job-listing block per issue. The Majlis fortnightly, two host-read slots per episode.

**Rate card.** Newsletter primary slot: USD 40 CPM on delivered emails (for example 5,880 delivered gives USD 235). Majlis host-read: USD 25 CPM on 30-day IAB downloads (1,500 downloads gives USD 37.50 per slot). Final prices quoted on the latest delivered and download figures.

**Packages.** (1) Hiring: 4 job listings, 2 primary placements, a hiring table at one hackathon: USD 1,800. Media part $2 \times 5{,}880 = 11{,}760$ impressions; the rest is priced on candidates. (2) Developer adoption: 4 primary placements plus 1 Majlis mention: $25{,}020$ impressions at USD 1,500, eCPM USD 60, justified by consecutive issues and a host read.

**Report.** Within two weeks: placements with dates, delivered emails, unique bot-filtered clicks on tracked links, IAB downloads at 30 days, sign-ups or applications via the sponsor's code. Open rates are not reported as a metric.

**AI-assisted production policy.** AI may draft transcripts, translations of factual items, show notes from a verified transcript, subtitle timing and clip candidates, and research leads with sources. A named human verifies every quote against the audio, every name, title, number and date against a source, and the Arabic register on the rendered proof. Guests see clips and show notes before release. No synthetic voice, dubbing or likeness of any real person without written consent for that use. AI-generated media is disclosed. Sponsor claims come from the sponsor and are labelled; AI never writes them.`,
            explanation: md`Prices must be on verifiable impressions with correct CPM arithmetic, packages should sell sponsor outcomes, and the AI policy must leave every quote, name and number to a human and require consent for any synthetic voice or likeness.`,
            concepts: ["sh05.cpm-pricing", "sh05.effective-cpm", "sh05.sponsor-report", "sh05.ai-human-review"],
            difficulty: 3,
          },
        },
        { kind: "sources", refs: ["sh05-r2", "sh05-r13"] },
        {
          kind: "feynman",
          prompt: "Explain to the Finance lead why newsletter and podcast ads will bring in only a few thousand US dollars in year one, and what the media operation is for if not ad revenue.",
          keyPoints: [
            "Revenue = impressions / 1,000 times CPM, and launch-scale impressions are small",
            "Inventory times fill times price gives a few thousand USD a year at illustrative rates",
            "Media builds the audience that event, hiring and Season packages monetise",
            "Packages are priced on sponsor outcomes, with eCPM as a sanity check",
            "Prepaid packages are liabilities until delivered",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh05-l06-q1",
      type: "numeric",
      prompt: md`Illustrative. A placement in an issue delivered to 4,500 inboxes is priced at a CPM of USD 50. What is the price? (USD)`,
      answer: 225,
      tolerance: { abs: 0.5 },
      unit: "USD",
      explanation: md`$P = 4.5 \times 50 =$ USD 225. Price on delivered emails, not opens.`,
      concepts: ["sh05.cpm-pricing"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh05-l06-q2",
      type: "numeric",
      prompt: md`Illustrative. A package costs USD 1,200 for three newsletter placements at 5,000 delivered each and one podcast mention at 1,000 downloads. What is its effective CPM? (USD)`,
      answer: 75,
      tolerance: { abs: 0.1 },
      unit: "USD",
      explanation: md`Impressions $= 3 \times 5{,}000 + 1{,}000 = 16{,}000$; eCPM $= 1{,}200/16 =$ USD 75.`,
      concepts: ["sh05.effective-cpm"],
      difficulty: 1,
    },
    {
      id: "sh05-l06-q3",
      type: "multi",
      prompt: md`Which belong in a Suhail sponsor report?`,
      options: [
        "Delivered emails per placement",
        "Unique, bot-filtered clicks on the sponsor's tracked links",
        "IAB downloads per episode at 30 days",
        "Raw file requests from the host log",
        "Applications or sign-ups using the sponsor's code",
        "Open rate as the headline metric",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`Report what the sponsor can reconcile with its own data. Raw requests and MPP-inflated opens overstate delivery and erode trust when compared.`,
      concepts: ["sh05.sponsor-report"],
      difficulty: 2,
    },
    {
      id: "sh05-l06-q4",
      type: "decision",
      prompt: md`An AI tool produced show notes for a Majlis episode, including "the guest's startup raised USD 2 million last year". The editor is short of time and the episode goes out tonight. What do you do?`,
      options: [
        { text: "Publish: the tool is usually right", score: 0, feedback: "A fabricated or misheard funding figure attributed to a guest is exactly the failure human review exists to stop." },
        { text: "Check the claim against the audio; if the guest did not say it, or it is not public, remove it; publish the rest after the normal name and number check", score: 1, feedback: "Every claim attributed to a guest is verified against the recording." },
        { text: "Delay the episode a week", score: 0.5, feedback: "Safe but unnecessary if the claim can be checked or removed tonight." },
      ],
      explanation: md`AI drafts, humans verify. Funding figures, quotes and names are always checked against the source.`,
      concepts: ["sh05.ai-human-review"],
      difficulty: 1,
    },
    {
      id: "sh05-l06-q5",
      type: "numeric",
      prompt: md`Illustrative. The Majlis releases 26 episodes a year with two ad positions each. Year-one fill is 30% at USD 60 per position. What is annual podcast ad revenue? (USD)`,
      answer: 936,
      tolerance: { abs: 1 },
      unit: "USD",
      explanation: md`Inventory $= 52$ positions; sold $= 15.6$; revenue $= 15.6 \times 60 =$ USD 936. Small: the podcast's value is the audience and the brand, monetised through packages.`,
      concepts: ["sh05.inventory-fill"],
      difficulty: 1,
    },
    {
      id: "sh05-l06-q6",
      type: "mcq",
      prompt: md`Who should check the names and numbers in a newsletter item?`,
      options: [
        "The person who wrote it, carefully",
        "A second person who did not write it, against the sources",
        "The sponsor",
        "The AI tool that drafted it",
      ],
      answer: 1,
      explanation: md`Authors read what they meant to write. A second person checking against the source catches the errors the author cannot see.`,
      concepts: ["sh05.production-workflow"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh05-l06-f1", front: "CPM revenue", back: md`$P = (I/1{,}000) \times \text{CPM}$, with $I$ = delivered emails or IAB downloads.`, concepts: ["sh05.cpm-pricing"] },
    { id: "sh05-l06-f2", front: "Effective CPM", back: md`$\text{eCPM} = P_{\text{pkg}}/(I_{\text{pkg}}/1{,}000)$: sanity check for fixed-price packages.`, concepts: ["sh05.effective-cpm"] },
    { id: "sh05-l06-f3", front: "Annual media revenue", back: md`$\text{Rev} = n \times s \times f \times \bar P$: items per year, slots per item, fill rate, average price.`, concepts: ["sh05.inventory-fill"] },
    { id: "sh05-l06-f4", front: "Why packages, not just ads, at launch?", back: "Launch-scale CPM revenue is a few thousand USD a year; packages tied to hiring, developer adoption and the Season sell outcomes.", concepts: ["sh05.cpm-pricing", "sh05.inventory-fill"] },
    { id: "sh05-l06-f5", front: "AI in production: the two hard rules", back: "Humans verify every quote, name and number; no synthetic voice or likeness of a real person without written consent, and disclose AI media.", concepts: ["sh05.ai-human-review"] },
    { id: "sh05-l06-f6", front: "Who never does the fact check?", back: "The person who wrote the item.", concepts: ["sh05.production-workflow"] },
  ],
  scenarios: [
    {
      id: "sh05-s2",
      title: "The AI dub request",
      context: md`Illustrative, 2027. A Majlis episode with an Egyptian founder is doing well. A volunteer suggests using an AI tool to produce an English dubbed version in the guest's own cloned voice, and a sponsor asks whether its ad can be read in the host's AI voice so the host does not need to record it.`,
      start: "a",
      concepts: ["sh05.ai-human-review", "sh05.editorial-independence"],
      nodes: {
        a: {
          md: md`The volunteer has already produced a test dub and wants to publish it this week.`,
          choices: [
            { text: "Publish the dub; it is great reach in English", next: "b", score: 0, feedback: "Cloning a guest's voice without their consent misrepresents them and can be unlawful; it also breaks the trust the format depends on." },
            { text: "Stop publication; ask the guest for written consent for this specific use, with a review of the dubbed version, and label it as AI-dubbed if published", next: "c", score: 9, feedback: "Consent for the specific use, review and disclosure: the policy in one decision." },
            { text: "Publish English subtitles instead and drop the dub idea entirely", next: "c", score: 7, feedback: "Safe and cheap. Dubbing with consent may still be worth testing later." },
          ],
        },
        b: {
          md: md`The guest hears "themselves" speaking English sentences they never said, including a mistranslated claim about their company. They write to you publicly.`,
          choices: [
            { text: "Take it down, apologise publicly, and adopt a written consent policy", score: 3, feedback: "Necessary, but the damage is done; future guests will ask about it." },
            { text: "Defend it as innovation", score: 0, feedback: "Makes the breach of trust permanent." },
          ],
        },
        c: {
          md: md`Now the sponsor's request: an ad read in the host's AI-cloned voice, from the sponsor's script.`,
          choices: [
            { text: "Decline the cloned read; offer a host-recorded read (labelled as sponsored) or a sponsor-voiced spot, clearly marked", score: 10, feedback: "A host read is an endorsement that should come from the host; a cloned voice blurs that and needs the host's specific consent at minimum." },
            { text: "Accept if the host consents, label the spot as AI-voiced and sponsored", score: 6, feedback: "Defensible with consent and labelling, but it trains sponsors to expect the host's voice on demand, and listeners may still feel misled." },
            { text: "Accept without telling listeners", score: 0, feedback: "Undisclosed synthetic endorsement by the host: the worst combination for trust." },
          ],
        },
      },
    },
  ],
};

export default lesson;
