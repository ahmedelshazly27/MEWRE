import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc10-l02",
  title: "Outreach, CRM and lead generation with AI: what to automate and what never to",
  summary:
    "Use Claude to build target lists, enrich them with evidence, write first lines from real signals and keep the CRM clean, while protecting the two assets automation destroys fastest: your sending domain and your personal reputation. Includes the deliverability mechanics, the legal frame and a hard line on LinkedIn.",
  minutes: 80,
  objectives: [
    "Model an outbound campaign as a multiplicative funnel and see why inbox placement matters as much as copy",
    "Explain sender authentication (SPF, DKIM, DMARC), complaint rate and the Gmail and Yahoo bulk-sender rules",
    "Use AI for list building, enrichment, personalisation and CRM hygiene with evidence attached to every field",
    "Draw the automation boundary: never automate LinkedIn messaging, and keep a human on every first batch and every reply",
    "Know the legal frame for B2B outreach in the EU and the US and when to ask counsel",
  ],
  concepts: [
    {
      id: "fc10.icp-list-building",
      name: "ICP-driven list building",
      description:
        "Building target account and contact lists from explicit ideal-customer criteria and observable signals, not from bought lists.",
      competency: "fc-ai",
      related: ["fc10.enrichment"],
    },
    {
      id: "fc10.enrichment",
      name: "Enrichment with evidence",
      description:
        "Adding role, team, trigger events and contact details to a lead, with the source and date for each field so that a wrong field can be traced and fixed.",
      competency: "fc-ai",
      related: ["fc10.citation-check", "fc10.icp-list-building"],
    },
    {
      id: "fc10.personalisation-at-scale",
      name: "Personalisation at scale",
      description:
        "A first line and value statement written from a real, cited signal about the account (a job post, a talk, a product launch), reviewed by a human before sending.",
      competency: "fc-ai",
      related: ["fc10.enrichment"],
    },
    {
      id: "fc10.deliverability",
      name: "Email deliverability and sender reputation",
      description:
        "Whether mail lands in the inbox, governed by authentication (SPF, DKIM, DMARC), domain and IP reputation, complaint and bounce rates, and engagement.",
      competency: "fc-ai",
    },
    {
      id: "fc10.automation-boundary",
      name: "The automation boundary",
      description:
        "The line between tasks AI may do unattended (research, enrichment, drafts, CRM logging) and tasks a founder must do or approve (first-batch sends, replies, anything on LinkedIn).",
      competency: "fc-ai",
      related: ["fc10.deliverability", "m14.ai-governance"],
    },
    {
      id: "fc10.crm-hygiene",
      name: "CRM hygiene with AI",
      description:
        "Using AI to log calls, extract next steps, deduplicate and update stages from your notes, with the founder confirming changes, so pipeline numbers stay trustworthy.",
      competency: "fc-ai",
      related: ["fc10.automation-boundary"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "The outbound funnel, deliverability mechanics and the automation boundary",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Afterwave's first customers will come from founder-led outreach to hardware test leads in robotics, humanoids, drives and batteries: a few hundred accounts worldwide, each worth a long enterprise cycle. Suhail needs sponsors; Mizan sells to institutions where relationships and tenders matter more than email. In every case your name and your domain are the channel. AI makes it cheap to send ten times more messages, and that is the trap: the funnel punishes volume without relevance, and the platforms punish automation.`,
        },
        {
          kind: "md",
          md: md`### The funnel is a product, so one weak factor sinks it

Meetings from an outbound campaign:`,
        },
        { kind: "equation", formula: "fc10-outbound-funnel" },
        {
          kind: "md",
          md: md`Halving inbox placement $\delta$ halves meetings exactly as much as halving the reply rate $r$. Founders tune copy and ignore $\delta$, which is decided before anyone reads a word.

### How a mailbox provider decides inbox or spam

1. **Authentication.** **SPF** (RFC 7208) lists the servers allowed to send for your domain; **DKIM** (RFC 6376) signs each message with a key published in DNS; **DMARC** (RFC 7489) tells receivers what to do when SPF or DKIM fail *and* requires the authenticated domain to align with the visible From domain. Without alignment, a perfectly written email from a new domain looks like spoofing.
2. **Reputation.** Receivers track the history of your domain and sending IPs: complaints, bounces, spam-trap hits, and how recipients engage (open, reply, delete unread, move out of spam).
3. **Content and behaviour.** Sudden volume from a new domain, identical bodies to hundreds of people, link shorteners and tracking-heavy HTML all look like bulk mail.

Since **February 2024, Gmail and Yahoo** require all senders to authenticate (SPF or DKIM) and keep spam complaints low; **bulk senders** (Gmail: about 5,000 or more messages a day to its users) must have SPF, DKIM and DMARC, support **one-click unsubscribe** (RFC 8058) for marketing mail, and keep the user-reported spam rate below **0.3 %** (Google recommends below 0.1 %).`,
        },
        { kind: "equation", formula: "fc10-complaint-rate" },
        {
          kind: "md",
          md: md`The threshold is small in absolute terms. A founder campaign that inboxes 1,200 messages reaches 0.3 % at **3.6 complaints**. A bought list of loosely matched contacts can generate that in an afternoon. A burned domain is not a one-campaign problem: reputation recovers over weeks of clean sending, and if you send from your primary domain, your investor updates and customer replies go to spam too.

### What AI is good at in outbound, and what it destroys

| Task | AI role | Why |
|---|---|---|
| Account research and list building | Do it, cite signals | Reading job posts, talks, docs and launches is slow for humans and fast for Claude |
| Enrichment (role, team, trigger) | Do it, with source and date per field | A wrong title is cheap to fix if you can see where it came from |
| First line and value statement | Draft; human approves | Personalisation from a real signal lifts $r$; invented personalisation is worse than none |
| Sending | Scheduled by a sending tool, at low volume, from an authenticated domain | Volume ramps and identical bodies hurt $\delta$ |
| Replies | Human only (AI may draft) | A reply is a live sales conversation; a wrong automated answer loses the account |
| CRM logging, next steps, dedup | Do it; human confirms changes | Clean pipeline data compounds |
| LinkedIn connection requests, messages, profile scraping | **Never automate** | Prohibited by the platform's terms; your personal account is the asset |`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Never automate LinkedIn messaging",
          md: md`LinkedIn's User Agreement prohibits using bots, browser extensions, scrapers or other automated methods to access the service, add or download contacts, or send or redirect messages. Automation tools that "send 100 personalised connection requests a day" violate it, and LinkedIn detects the patterns (timing, volume, identical structure) and restricts or bans the account. For a B2B founder the personal profile is years of network and credibility; for Afterwave it is how test leads at robotics companies check who you are before replying. The cost asymmetry is total: a few extra meetings against the loss of the account. Use Claude to research the person and draft a note, then **you** open LinkedIn, edit the note and send it by hand. The same rule applies to scraping profiles into a list.`,
        },
        {
          kind: "matrix",
          title: "Where the automation boundary sits",
          xAxis: ["Invisible to the prospect", "Seen by the prospect or the platform"],
          yAxis: ["Judgement or relationship needed", "Little judgement needed"],
          cells: [
            { label: "Automate", detail: "Account research, enrichment with sources, dedup, CRM field updates from your notes." },
            { label: "Automate with guard rails", detail: "Scheduled email sends from an authenticated secondary domain, low daily volume, human-approved copy, unsubscribe honoured." },
            { label: "AI drafts, you decide", detail: "Prioritising accounts, choosing the angle per segment, call prep briefs." },
            { label: "Human only", detail: "Replies, negotiation, anything on LinkedIn, first message to a named enterprise champion, any message to a government buyer." },
          ],
          caption: "Top row: little judgement needed. Bottom row: judgement or relationship needed. The right column is where reputational damage happens.",
        },
        {
          kind: "widget",
          widget: "pipeline-forecast",
          props: { target: 300000, acv: 60000 },
          caption: "Illustrative: an Afterwave pilot pipeline at EUR 60k ACV against a EUR 300k bookings target. Change the number of first meetings and see how little a few extra low-quality meetings move weighted pipeline compared with better stage conversion.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Personalised versus spray: meetings and cost per meeting",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Afterwave first campaign: 400 accounts, verified contacts",
          given: md`Illustrative. ICP: hardware test and validation teams at robotics, humanoid, drive and battery companies in Europe and North America. Claude builds a list of 400 accounts with a cited signal for each (a job post for a test engineer, a conference talk on HIL rigs, a new actuator line). Two contacts per account gives 800; email verification removes 15 %. Sequence: three emails over 12 days from an authenticated secondary domain, about 40 sends a day. Assumptions: inbox placement 85 %, reply rate 6 % over the sequence, 40 % of replies book a meeting. Costs: data and verification EUR 600, tools EUR 300, founder time 25 h at EUR 80/h.`,
          steps: [
            { md: md`**Verified contacts:** $N = 800 \times 0.85 = 680$.` },
            { md: md`**Inboxed:** $680 \times 0.85 = 578$. **Replies:** $578 \times 0.06 = 34.7$.` },
            { md: md`**Meetings:** $M = 680 \times 0.85 \times 0.06 \times 0.40 = 13.9$, about **14 meetings**.` },
            { md: md`**Cost per meeting:** $C_M = (600 + 300 + 25 \times 80)/13.9 = 2{,}900/13.9 =$ **EUR 209**.` },
            { md: md`**Complaint budget:** at Gmail's 0.3 % ceiling, 578 inboxed messages tolerate $578 \times 0.003 = 1.7$ complaints. Two people clicking "report spam" put you over. Relevance is not politeness here; it is the reputation budget.` },
            { md: md`**What the 25 hours buy:** reviewing 400 first lines (about 2 minutes each, 13 h), replies and call scheduling (8 h), list and copy set-up (4 h). AI cut research time per account from perhaps 15 minutes to 2; it did not remove review.` },
          ],
          result: md`About 14 meetings at roughly EUR 209 each, with a complaint budget of under 2. The quality of the account list and the first line drives every factor in the funnel.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "The vendor's alternative: 1,500 contacts from a bought list",
          given: md`Illustrative. A lead vendor offers 1,500 "robotics engineering" contacts for EUR 1,500, plus a tool at EUR 300 that generates generic AI personalisation. Expected: inbox placement 70 % (unverified addresses, identical structure), reply rate 1.5 %, 30 % of replies book a meeting (many replies are "not my area"). Founder time 8 h at EUR 80/h. Compare with the personalised alternative: 300 well-researched contacts, $\delta$ = 0.92, $r$ = 10 %, $q$ = 45 %, costs EUR 2,850 including 30 h of founder time.`,
          steps: [
            { md: md`Bought list meetings: $M = 1{,}500 \times 0.70 \times 0.015 \times 0.30$.` },
            {
              md: md`$M = 4.7$ meetings.`,
              hidden: true,
              check: { prompt: "Meetings from the bought list", answer: 4.725, unit: "meetings", tolerance: { abs: 0.1 } },
            },
            { md: md`Bought list cost per meeting: $(1{,}500 + 300 + 8 \times 80)/4.725$.` },
            {
              md: md`$C_M = 2{,}440/4.725 =$ **EUR 516**.`,
              hidden: true,
              check: { prompt: "Cost per meeting, bought list (EUR)", answer: 516, unit: "EUR", tolerance: { abs: 3 } },
            },
            { md: md`Personalised: $M = 300 \times 0.92 \times 0.10 \times 0.45 = 12.4$ meetings; $C_M = 2{,}850/12.4 =$ EUR 229.` },
            { md: md`And the hidden cost: 1,050 inboxed generic messages at a 0.5 % complaint rate is about 5 complaints, above the 0.3 % ceiling, so the next campaign starts from a damaged domain.` },
          ],
          result: md`Fewer, better-researched contacts produce more than twice the meetings at less than half the cost per meeting, and they protect the domain. Use AI to raise relevance, not volume.`,
        },
        {
          kind: "question",
          question: {
            id: "fc10-l02-p1",
            type: "numeric",
            prompt: md`A Suhail sponsorship campaign inboxes 900 emails. What is the maximum number of spam complaints that keeps the rate at or below Google's recommended 0.1 %? (Give the exact value, not rounded.)`,
            answer: 0.9,
            tolerance: { abs: 0.01 },
            unit: "complaints",
            explanation: md`$900 \times 0.001 = 0.9$. In practice a single complaint already exceeds the recommendation; at the 0.3 % hard ceiling the budget is 2.7. This is why sponsorship outreach should go to a short, researched list with a personal reason for each company.`,
            concepts: ["fc10.deliverability"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running AI-assisted outbound and CRM in practice",
      blocks: [
        {
          kind: "md",
          md: md`### The stack, and who touches what

- **Data:** your own research with Claude (web search) plus, if needed, a reputable B2B data provider for email addresses. Verify every address before the first send.
- **CRM:** a simple CRM or a structured spreadsheet is enough for under 500 accounts. Claude can connect to many CRMs through MCP connectors or exports; give it read access first and propose changes for you to apply.
- **Sending:** a dedicated, authenticated secondary domain (SPF, DKIM, DMARC aligned), warmed up gradually, a few dozen first-touch emails a day per mailbox, plain text, one link at most, a clear opt-out line.
- **People:** you approve copy and the first batch for each segment; you answer every reply.

### Template 1: ICP and list building

    VENTURE CONTEXT: [paste the venture context file]
    ICP: [industry], [team: e.g. hardware test / validation], [company size],
    [geography]. Must show at least one of these signals in the last 12 months:
      S1 job post for test, validation or HIL engineers
      S2 public talk, paper or blog on test rigs, regression or reliability
      S3 new product line that implies new validation work
    TASK: find [N] accounts. For each: company | country | signal id |
    evidence URL | date | one sentence on why the signal matters to us.
    Exclude: [existing customers, competitors, companies under NDA].
    If fewer than [N] meet the bar, return fewer. Do not pad the list.

### Template 2: enrichment with evidence

    For each account below, find the likely owner of [problem] (title, team).
    Return: name | title | evidence URL (company page, talk, paper) | date |
    confidence. If the only evidence is a social-network profile, leave the
    name blank and give the title only; I will look it up myself.
    Never guess an email address pattern.

### Template 3: first-touch email from a real signal

    Write a first email to [title] at [company].
    Signal to use (quote it): [evidence]
    Our relevance in one line: [e.g. after a firmware or rig change, Ripple
    shows which tests to rerun and why]
    Rules: under 90 words; plain text; first sentence about them and the
    signal, not about us; one specific question as the call to action; no
    flattery, no "I hope this finds you well", no claims about customers or
    results we do not have; include "If this is not relevant, reply 'no'
    and I will not follow up." Give me 2 variants and say which signal
    detail each relies on.

### Template 4: CRM update from call notes

    From my notes below, propose CRM updates as a table:
    field | current value | proposed value | evidence (quote from notes).
    Fields: stage, next step, next step date, champion, economic buyer,
    security review needed (Y/N), objections, competitors mentioned.
    Do not change a field without a quote. List anything I promised.

### Template 5: LinkedIn note (drafted by AI, sent by you)

    Draft a LinkedIn connection note under 300 characters to [name, title]
    about [specific talk or post, quoted]. No pitch. I will edit and send it
    myself from my own account.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Legal frame: confirm before a campaign",
          md: md`**EU (GDPR).** A work email with a person's name is personal data. B2B outreach normally relies on **legitimate interests** (Art. 6(1)(f)) with a documented balancing test; when you obtain the data from somewhere other than the person, **Art. 14** requires you to tell them where it came from and their rights, at the latest at the first communication; **Art. 21** gives an absolute right to object to direct marketing, so an opt-out must stop all further messages. **Email rules** come from the ePrivacy Directive as implemented nationally and differ by country: some member states, reportedly including the Netherlands, extend consent requirements to email sent to businesses. Check the current Dutch rule with counsel before campaigns from the Netherlands. **US:** CAN-SPAM requires accurate headers and subject lines, a postal address and a working opt-out honoured within 10 business days. **Kuwait and the Gulf:** for government and utility buyers, cold email is the wrong channel anyway; use formal letters and introductions (see the ministry communication module in Track 0).`,
        },
        {
          kind: "checklist",
          title: "Deliverability and data set-up before the first send",
          items: [
            "Secondary sending domain registered; primary domain kept for investors, customers and team",
            "SPF, DKIM and DMARC published and aligned (start DMARC at p=none with reporting, then tighten)",
            "Every address verified; bounce rate on the first batch watched (stop and investigate if it is more than a couple of per cent)",
            "Volume ramps gradually; plain text; at most one link; no link shorteners",
            "Opt-out line in every email and a suppression list honoured across all tools",
            "Every enriched field has a source and date; no guessed email patterns",
            "No LinkedIn automation, scraping or browser extensions that act on your account",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask any outreach tool vendor",
          items: [
            "Where does your contact data come from, and what is your lawful basis for processing it in the EU?",
            "Does any feature act on my LinkedIn account automatically? (If yes, do not use it.)",
            "How do you handle opt-outs across sequences and mailboxes?",
            "What daily volume per mailbox do you default to, and can I cap it?",
            "Can I export every message sent and every field you enriched, with sources?",
          ],
        },
        { kind: "scenario", scenario: "fc10-s1" },
        {
          kind: "question",
          question: {
            id: "fc10-l02-p2",
            type: "short",
            prompt: md`**Produce it.** For Afterwave's first outbound segment (choose one: humanoid robotics, drives and motors, or battery packs), write (a) the ICP with three observable signals, (b) a three-touch email sequence where touch 1 is under 90 words and built from a placeholder signal, and (c) a one-paragraph automation boundary stating what Claude does, what tools do, and what you do by hand.`,
            rubric: [
              "ICP names team, company type, geography and three signals that can be observed and cited (job post, talk, product launch)",
              "Touch 1 is under 90 words, opens with the prospect's signal, makes one concrete relevance claim and asks one specific question",
              "No invented customers, results or metrics; touch 2 and 3 add new value (a short insight, a question) rather than 'bumping'",
              "Every touch has an opt-out line; sending is from an authenticated secondary domain at low volume",
              "Automation boundary explicitly excludes LinkedIn automation and automated replies; human approves the first batch",
              "Mentions verification of addresses and source for each enriched field",
            ],
            modelAnswer: md`**(a) ICP: drives and motors.** Validation and test teams (test lead, head of validation, test systems engineer) at companies developing electric drive units, inverters or actuators for robotics and vehicles, 200 to 5,000 staff, Europe. Signals in the last 12 months: S1 a job post for HIL or end-of-line test engineers; S2 a talk or paper on drive-unit validation, durability or regression; S3 a new drive or actuator product announced.

**(b) Sequence.**
Touch 1 (day 0, 74 words): "Hi [name], saw your team is hiring two HIL test engineers for the new [product] line [S1]. When firmware or a rig changes mid-programme, how do you decide which tests to rerun today? We are building Ripple at Afterwave: it maps a change to the tests it affects, with the reason, from your own rig data. Would a 20-minute call to compare notes be useful? If this is not relevant, reply 'no' and I will not follow up."
Touch 2 (day 5): a three-line insight on one regression pattern in drive-unit validation that the team (ex-Tesla drive unit and inverter test) can stand behind, for example faults that only show when rig signals and operator actions are aligned on one clock, with the same question.
Touch 3 (day 12): "Last note from me. If test selection after changes is not a pain on [product], I will leave it there. If it is, who owns it?"

**(c) Boundary.** Claude researches accounts and signals with cited URLs and drafts touch 1 variants; a verification tool checks every address; a sending tool schedules about 30 emails a day from an authenticated secondary domain (SPF, DKIM, DMARC aligned) with a shared suppression list. I approve every first line in the first batch of each segment, read every reply and answer it myself. LinkedIn is manual only: Claude may draft a connection note; I send it. No scraping, no extensions, no automated replies.`,
            explanation: md`The grader looks for relevance from evidence, honesty (no invented proof), deliverability hygiene and an explicit boundary.`,
            concepts: ["fc10.personalisation-at-scale", "fc10.automation-boundary", "fc10.deliverability", "fc10.icp-list-building"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a new sales hire why you will not let them use a tool that sends 200 LinkedIn messages a day, even if it books meetings.",
          keyPoints: [
            "LinkedIn's terms prohibit automated messaging and contact collection; accounts get restricted",
            "The founder's and team's profiles are long-lived assets; a few extra meetings do not justify the risk",
            "Prospects recognise automated patterns and it damages the brand with a small enterprise market",
            "AI can still research and draft; the human sends",
            "The same logic applies to email volume: complaints burn the domain",
          ],
        },
        { kind: "sources", refs: ["fc10-r5", "fc10-r6", "fc10-r7", "fc10-r8", "fc10-r9", "fc10-r10", "fc10-r11", "fc10-r12", "fc10-r13", "fc10-r20"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc10-l02-q1",
      type: "numeric",
      prompt: md`500 verified sends, 90 % inbox placement, 5 % reply rate, 40 % of replies book a meeting. How many meetings?`,
      answer: 9,
      tolerance: { abs: 0.05 },
      unit: "meetings",
      explanation: md`$M = 500 \times 0.9 \times 0.05 \times 0.4 = 9$.`,
      concepts: ["fc10.personalisation-at-scale"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc10-l02-q2",
      type: "mcq",
      prompt: "What does DMARC add on top of SPF and DKIM?",
      options: [
        "It encrypts the message in transit",
        "It requires the authenticated domain to align with the visible From domain and tells receivers what to do on failure",
        "It verifies that the recipient address exists",
        "It sets the daily sending limit",
      ],
      answer: 1,
      explanation: md`SPF authorises sending servers, DKIM signs messages, DMARC ties them to the From domain (alignment) and publishes a policy (none, quarantine, reject) with reporting.`,
      concepts: ["fc10.deliverability"],
      difficulty: 2,
    },
    {
      id: "fc10-l02-q3",
      type: "multi",
      prompt: "Which tasks sit on the safe side of the automation boundary? (Select all that apply.)",
      options: [
        "Researching accounts and citing hiring signals",
        "Proposing CRM field updates from call notes for you to confirm",
        "Sending LinkedIn connection requests from your account through an extension",
        "Replying automatically to prospects who ask about pricing",
        "Deduplicating contacts across two lists",
      ],
      answer: [0, 1, 4],
      explanation: md`Research, proposed CRM updates and dedup are invisible to the prospect and low-judgement. LinkedIn automation breaches the platform's terms; automated replies to live buying questions hand a sales conversation to a model.`,
      concepts: ["fc10.automation-boundary", "fc10.crm-hygiene"],
      difficulty: 1,
    },
    {
      id: "fc10-l02-q4",
      type: "decision",
      prompt: md`Your co-founder wants to send the next campaign from the primary company domain "because it looks more legitimate". What do you decide?`,
      options: [
        { text: "Agree: legitimacy matters more than anything.", score: 0.2, feedback: "If the campaign draws complaints, investor updates, customer replies and hiring emails from the primary domain start landing in spam." },
        { text: "Use an authenticated secondary domain with aligned SPF, DKIM and DMARC, low volume and a clear signature linking to the main site.", score: 1, feedback: "Standard practice: isolates the reputation risk while staying transparent about who is writing." },
        { text: "Use a free webmail account to avoid any domain risk.", score: 0, feedback: "Looks unprofessional to enterprise buyers, and free-mail providers restrict bulk-like sending." },
      ],
      explanation: md`Reputation is per domain; isolate the outbound risk without hiding who you are.`,
      concepts: ["fc10.deliverability"],
      difficulty: 2,
    },
    {
      id: "fc10-l02-q5",
      type: "mcq",
      prompt: "Under the GDPR, a prospect replies 'stop emailing me'. What must happen?",
      options: [
        "You may send one more email explaining your offer",
        "All further direct-marketing messages to that person stop, across every tool and mailbox",
        "You stop only the current sequence",
        "Nothing, because B2B email is exempt from the GDPR",
      ],
      answer: 1,
      explanation: md`Art. 21 gives an absolute right to object to direct marketing. A shared suppression list across tools is the practical control.`,
      concepts: ["fc10.automation-boundary"],
      difficulty: 1,
    },
    {
      id: "fc10-l02-q6",
      type: "order",
      prompt: "Order the set-up steps for a first AI-assisted campaign.",
      items: [
        "Write the ICP and observable signals",
        "Build and cite the account list with Claude",
        "Enrich contacts with sources and verify every address",
        "Authenticate and warm up the secondary sending domain",
        "Approve copy and the first batch by hand",
        "Send at low volume and answer replies yourself",
      ],
      explanation: md`Targeting before data, data before copy, infrastructure before sending, human review before volume. (Domain warm-up can run in parallel with list building; it must finish before the first send.)`,
      concepts: ["fc10.icp-list-building", "fc10.deliverability"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "fc10-l02-f1", front: "Outbound funnel", back: md`$M = N\cdot\delta\cdot r\cdot q$: sends, inbox placement, reply rate, reply-to-meeting.`, concepts: ["fc10.personalisation-at-scale"] },
    { id: "fc10-l02-f2", front: "Gmail spam-rate thresholds", back: "Keep below 0.1 %; never reach 0.3 % (user-reported spam over inboxed mail).", concepts: ["fc10.deliverability"] },
    { id: "fc10-l02-f3", front: "SPF, DKIM, DMARC in one line each", back: "SPF: which servers may send. DKIM: signature in DNS. DMARC: alignment with From plus policy and reports.", concepts: ["fc10.deliverability"] },
    { id: "fc10-l02-f4", front: "LinkedIn rule", back: "Never automate messaging, connection requests or scraping. AI drafts; you send by hand.", concepts: ["fc10.automation-boundary"] },
    { id: "fc10-l02-f5", front: "Enrichment rule", back: "Every field has a source and date; never guess email patterns.", concepts: ["fc10.enrichment"] },
    { id: "fc10-l02-f6", front: "GDPR articles for B2B outreach", back: "Art. 6(1)(f) legitimate interests; Art. 14 tell them the source; Art. 21 absolute right to object.", concepts: ["fc10.automation-boundary"] },
  ],
  scenarios: [
    {
      id: "fc10-s1",
      title: "The growth-hacking stack",
      dayInLife: true,
      context: md`Three weeks before YC interviews, an advisor introduces you to a growth agency. Their pitch: an AI agent that scrapes LinkedIn for "test engineer" titles, sends 150 personalised connection requests a day from your account, follows up automatically, and sends 2,000 emails a day from your main domain. "Founders using this book 30 meetings a month."`,
      start: "a",
      concepts: ["fc10.automation-boundary", "fc10.deliverability"],
      nodes: {
        a: {
          md: md`The advisor is on the call and clearly likes the agency. What do you say?`,
          choices: [
            { text: "Sign up for a two-week trial to see the numbers.", score: 1, feedback: "Two weeks is enough to get the account restricted and the domain flagged, right before interviews where partners will look you up.", next: "b" },
            { text: "Decline the LinkedIn and main-domain parts, explain why in one sentence, and ask whether they can help with account research and copy instead.", score: 9, feedback: "Clear boundary, no burned relationship with the advisor, and you keep what is useful.", next: "c" },
            { text: "End the call without explanation.", score: 4, feedback: "Right decision, poor execution: the advisor will not understand why and may push again.", next: "c" },
          ],
        },
        b: {
          md: md`Day 9: LinkedIn shows a warning about automated activity and restricts your account pending verification. Gmail Postmaster shows your main domain's spam rate at 0.6 %. A customer's reply to your pilot proposal lands in their own spam folder.`,
          choices: [
            { text: "Stop everything, remove the tool's access, verify the account, switch customer email to a clean path and tell the customer directly by phone.", score: 5, feedback: "Damage control. Reputation will take weeks of clean sending to recover." },
            { text: "Reduce the volume by half and continue.", score: 0, feedback: "The account and domain are already flagged; continuing compounds both." },
          ],
        },
        c: {
          md: md`The agency offers a compromise: they research accounts, Claude drafts first lines, and you review and send from a secondary domain at 40 a day. They ask for read access to your CRM.`,
          choices: [
            { text: "Accept with written terms: read-only CRM export of the target segment only, data processing terms, a shared suppression list, and no action on your LinkedIn account.", score: 10, feedback: "Useful help with the risks contained and documented." },
            { text: "Give them full CRM admin access so they can update stages.", score: 3, feedback: "Pipeline data is the basis of your forecast and investor updates; third parties propose, you confirm." },
          ],
        },
      },
    },
  ],
};

export default lesson;
