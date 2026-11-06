import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh05-l02",
  title: "Newsletter mechanics: list growth, metrics, deliverability and segmentation",
  summary:
    "The newsletter is a list whose size is set by two rates: acquisition and churn. This lesson derives the list's steady state and growth curve, explains why open rates stopped meaning much after Apple Mail Privacy Protection and what to measure instead, walks through deliverability (SPF, DKIM, DMARC, alignment, sender reputation, the 2024 Gmail and Yahoo bulk-sender rules) for suhail.build on Resend, and sets up segmentation by language, role and engagement.",
  minutes: 85,
  objectives: [
    "You can model list size with acquisition and churn, compute the steady state and the time to reach it",
    "You can explain why open rates are inflated by Apple Mail Privacy Protection and estimate a non-MPP open rate",
    "You can define click-through and click-to-open rates and name the measurement problems with each",
    "You can specify SPF, DKIM and DMARC records and a sending-domain plan for suhail.build, and explain alignment",
    "You can design segments and a sunset policy based on clicks, not opens",
  ],
  concepts: [
    { id: "sh05.list-dynamics", name: "List dynamics (acquisition and churn)", description: "Monthly list change is acquisitions minus churn: $\\Delta N = A - cN$. The list converges to a steady state $N^* = A/c$; churn, not acquisition alone, sets the ceiling.", competency: "sh-media", related: ["fc02.retention-cohort"] },
    { id: "sh05.open-rate-mpp", name: "Open rate and Apple Mail Privacy Protection", description: "Opens are measured by a tracking pixel. Since iOS 15 (September 2021), Apple Mail Privacy Protection preloads remote content through a proxy, so MPP recipients register opens whether or not they read. Open rates are inflated and unreliable for decisions.", competency: "sh-media", related: ["sh05.click-metrics"] },
    { id: "sh05.click-metrics", name: "Click-through and click-to-open rate", description: "CTR = unique clickers / delivered; CTOR = unique clickers / unique openers. Clicks are the better engagement signal but are inflated by security scanners that follow links, so filter bot clicks.", competency: "sh-media", related: ["sh05.open-rate-mpp"] },
    { id: "sh05.email-authentication", name: "Email authentication: SPF, DKIM, DMARC", description: "SPF lists servers allowed to send for a domain; DKIM signs messages with a domain key; DMARC tells receivers what to do when neither passes in alignment with the visible From domain, and sends reports.", competency: "sh-media", related: ["sh05.sender-reputation"] },
    { id: "sh05.sender-reputation", name: "Sender reputation and deliverability", description: "Mailbox providers place mail in inbox or spam from the domain's history: complaint rate, bounces, engagement, authentication. Gmail requires bulk senders to keep reported spam below 0.3% and recommends below 0.1%.", competency: "sh-media", related: ["sh05.email-authentication"] },
    { id: "sh05.segmentation", name: "Segmentation and sunset policy", description: "Splitting the list by language preference, role, country and engagement so each reader gets relevant content, and removing long-inactive subscribers (judged by clicks and visits, not opens) to protect reputation.", competency: "sh-media", related: ["sh05.list-dynamics"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "A list is a stock with an inflow and a leak",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Every sponsor conversation for Suhail will start with "how big is the list and how engaged is it?". If you report inflated opens, a sponsor's own tracking will expose it; if the mail lands in spam because DMARC was never set up, the list is worth nothing. And as a systems engineer you already know the model: a stock with an inflow and a proportional outflow settles at inflow divided by the outflow rate.`,
        },
        {
          kind: "md",
          md: md`### Growth maths

Let $N$ be subscribers, $A$ new confirmed subscribers per month, and $c$ the monthly churn rate (unsubscribes, hard bounces, spam complaints and sunset removals as a share of the list).`,
        },
        { kind: "equation", formula: "sh05-net-growth" },
        { kind: "equation", formula: "sh05-list-steady-state" },
        { kind: "equation", formula: "sh05-list-trajectory" },
        {
          kind: "md",
          md: md`Three consequences that drive decisions:

1. **Churn sets the ceiling.** With $A = 400$/month, 2% churn gives $N^* = 20{,}000$; 4% gives 10,000. Halving churn is worth as much as doubling acquisition in the long run.
2. **Convergence is slow.** The gap to $N^*$ shrinks by a factor $(1-c)$ per month. At 2% churn it takes $\ln 0.5/\ln 0.98 \approx 34$ months to get halfway. Growth that feels like it is "flattening" may simply be the curve, not a failure.
3. **Acquisition is lumpy.** A hackathon or a viral post adds a step to $N$; the curve then relaxes toward $N^*$. Model events as one-off additions on top of the base rate.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "List size from zero with 400 new subscribers a month (illustrative)",
          xKey: "month",
          xLabel: "Month",
          yLabel: "Subscribers",
          series: [
            { key: "c2", label: "2% monthly churn (N* = 20,000)" },
            { key: "c4", label: "4% monthly churn (N* = 10,000)" },
          ],
          data: [
            { month: 0, c2: 0, c4: 0 },
            { month: 6, c2: 2283, c4: 2172 },
            { month: 12, c2: 4306, c4: 3873 },
            { month: 18, c2: 6097, c4: 5204 },
            { month: 24, c2: 7684, c4: 6246 },
            { month: 30, c2: 9090, c4: 7061 },
            { month: 36, c2: 10336, c4: 7700 },
          ],
          caption: "The curves look similar in year one and diverge later: churn shows up in the ceiling, not in the first months. Illustrative rates, not Suhail data.",
        },
        {
          kind: "md",
          md: md`### Measurement: what opens, clicks and replies really tell you

**Opens** are counted when the email client loads an invisible tracking image. Since **iOS 15 (September 2021)**, **Apple Mail Privacy Protection (MPP)** lets Apple Mail users have remote content preloaded through Apple's proxy servers, regardless of whether they read the email. Every MPP recipient tends to register an "open", often shortly after delivery, with a proxy location instead of the reader's. Effects:

- Open rates are **inflated**, often heavily if many readers use Apple Mail.
- Open-based decisions break: subject-line A/B tests on opens, "send time optimisation", and sunset rules that remove "non-openers" (MPP users never look inactive).
- Other clients block or proxy images too, so a real reader can also be counted as a non-opener.

You can estimate a cleaner open rate by excluding opens your platform flags as machine or MPP opens (many platforms flag them), or by approximating:`,
        },
        { kind: "equation", formula: "sh05-non-mpp-open-rate" },
        { kind: "equation", formula: "sh05-ctr" },
        { kind: "equation", formula: "sh05-ctor" },
        {
          kind: "md",
          md: md`**Clicks** are better evidence of attention, but not clean either: corporate security gateways and some mail providers follow every link to scan it, producing clicks within seconds of delivery from data-centre addresses. Filter clicks that happen on every link at once or within a few seconds of delivery. **Replies, forwards, event registrations from newsletter links and sponsor link clicks** are the metrics that matter to the business. Track them with UTM parameters on every link and a "how did you hear about us" field on event registration.

### Deliverability: getting to the inbox

Mailbox providers (Gmail, Outlook, Yahoo, Apple) decide inbox or spam from **authentication** and **reputation**.`,
        },
        {
          kind: "flow",
          title: "What a receiving mail server checks",
          steps: [
            { label: "SPF (RFC 7208)", detail: "Is the sending server's IP listed in the TXT record of the envelope sender (Return-Path) domain?" },
            { label: "DKIM (RFC 6376)", detail: "Does the signature in the header verify against the public key published at selector._domainkey.domain?" },
            { label: "DMARC alignment (RFC 7489)", detail: "Does the domain that passed SPF or DKIM match the visible From domain (same organisational domain in relaxed mode)?" },
            { label: "DMARC policy", detail: "If neither aligns: none (monitor), quarantine (spam folder) or reject, as published at _dmarc.domain. Aggregate reports go to the rua address." },
            { label: "Reputation and content", detail: "Domain and IP history: spam complaints, bounces, engagement, list-unsubscribe support, volume spikes." },
          ],
          caption: "Authentication proves who sent it; reputation decides whether the receiver wants it. Both are necessary.",
        },
        {
          kind: "md",
          md: md`**Alignment is the part people miss.** An email service provider can pass SPF with its own bounce domain and DKIM with its own signing domain, and DMARC still fails because neither matches suhail.build. Setting up a custom sending domain (DKIM signed with d=suhail.build or a subdomain of it) fixes that.

**The 2024 bulk-sender rules.** From February 2024 Google and Yahoo require senders of large volumes (Google: more than 5,000 messages a day to Gmail accounts) to authenticate with SPF and DKIM, publish DMARC (at least p=none) with alignment, support **one-click unsubscribe** (the List-Unsubscribe-Post header of RFC 8058) and honour it within two days, and keep reported spam below **0.3%** (Google recommends below 0.1%). Suhail will be far below 5,000 a day at launch, but these are the rules the providers now use to judge everyone: implement them from issue 1.

**Sender reputation** is built by sending wanted mail consistently: confirmed opt-in, steady volume, prompt removal of hard bounces, low complaints. A new domain has no history, so start with the most engaged segment and grow volume gradually (**warm-up**).

### Segmentation

Collect a few fields at signup and use them:

| Field | Values | Used for |
|---|---|---|
| Language | Arabic, English, both | Which edition or which version of a bilingual issue |
| Role | Builder, student, founder, investor, employer, other | Opportunities emphasis, sponsor targeting (aggregate only) |
| Country | Free choice | Local events, permits, time zones |
| Engagement | Active (clicked in 90 days), cooling, inactive | Re-engagement and sunset |

A **sunset policy** removes subscribers with no clicks, replies or site visits for a set period (for example 120 days) after a re-engagement email. Base it on **clicks and site activity, not opens**, because MPP makes everyone look like an opener.`,
        },
        { kind: "xref", to: "fc04-l08", note: "The same SPF, DKIM and DMARC basics applied to founder outbound sequences; keep outbound on a different domain from the newsletter." },
      ],
    },
    {
      layer: "applied",
      title: "Modelling the list and cleaning the metrics",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Where will the list be after year one?",
          given: md`Illustrative. Suhail starts January 2027 with $N_0 = 1{,}000$ confirmed subscribers from a pre-launch waitlist. Base acquisition $A = 400$/month from site signups, events and referrals. Monthly churn $c = 2.5\%$.`,
          steps: [
            { md: md`**Steady state:** $N^* = A/c = 400/0.025 = 16{,}000$.` },
            { md: md`**Gap at start:** $N_0 - N^* = 1{,}000 - 16{,}000 = -15{,}000$.` },
            { md: md`**Decay factor over 12 months:** $(1 - 0.025)^{12} = 0.975^{12} = 0.738$.` },
            { md: md`**After 12 months:** $N_{12} = 16{,}000 - 15{,}000 \times 0.738 = 16{,}000 - 11{,}070 = 4{,}930$.` },
            { md: md`**Monthly churn at month 12:** $cN = 0.025 \times 4{,}930 = 123$ leave each month while 400 join; net growth 277/month and falling.` },
          ],
          result: md`About **4,900 subscribers** after a year, under a third of the 16,000 ceiling. To raise the ceiling, reduce churn (relevance, segmentation, cadence) as well as adding acquisition. Report this as a model in the sponsor kit, never as achieved traction.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Cleaning one issue's metrics",
          given: md`Illustrative issue: delivered $D = 5{,}000$. Platform reports 3,100 unique opens (62%) and 240 unique clickers after bot-click filtering. Estimated share of recipients on Apple Mail with MPP: $m = 0.40$.`,
          steps: [
            { md: md`MPP recipients count as opens: $mD = 0.40 \times 5{,}000 = 2{,}000$.` },
            { md: md`Non-MPP opens $= 3{,}100 - 2{,}000 = 1{,}100$ out of $(1-m)D = 3{,}000$ non-MPP recipients.` },
            { md: md`Non-MPP open rate $= 1{,}100/3{,}000$.`, hidden: true, check: { prompt: "Non-MPP open rate (%)", answer: 36.7, unit: "%", tolerance: { abs: 0.2 } } },
            { md: md`CTR $= 240/5{,}000$.`, hidden: true, check: { prompt: "Click-through rate (%)", answer: 4.8, unit: "%", tolerance: { abs: 0.05 } } },
            { md: md`CTOR on reported opens $= 240/3{,}100 = 7.7\%$: understated, because the denominator is inflated by MPP.` },
          ],
          result: md`Report **delivered, CTR and downstream actions** to sponsors; treat the 62% open rate as an upper bound and the 37% non-MPP rate as an estimate with stated assumptions.`,
        },
        {
          kind: "question",
          question: {
            id: "sh05-l02-p1",
            type: "numeric",
            prompt: md`Illustrative. Acquisition is 250 new subscribers a month and churn 2% a month. Starting from zero, after how many months does the list reach half its steady state? (1 decimal)`,
            answer: 34.3,
            tolerance: { abs: 0.2 },
            unit: "months",
            explanation: md`$N^* = 12{,}500$. Half the steady state means $(1-c)^t = 0.5$, so $t = \ln 0.5/\ln 0.98 = 34.3$ months. The halfway time depends only on churn, not on acquisition.`,
            concepts: ["sh05.list-dynamics"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Setting up suhail.build to send well",
      blocks: [
        {
          kind: "md",
          md: md`### A sending-domain plan

Suhail's site runs on Vercel with its own Supabase and Resend. Use separate subdomains so one stream cannot damage the other's reputation:

| Stream | Example From | Purpose |
|---|---|---|
| Transactional | no-reply at auth.suhail.build | Sign-in links, event confirmations (Supabase auth via Resend) |
| Newsletter | newsletter at news.suhail.build | Issues, announcements |
| People | named addresses at suhail.build | Partnerships, editorial replies |

For each sending subdomain, Resend generates the DNS records to add (an SPF record and a DKIM public key, plus a bounce or return-path record); copy them exactly from the Resend dashboard and verify the domain there. Then publish DMARC at the organisational domain, for example:

| Record | Name | Value (example) |
|---|---|---|
| DMARC, start | _dmarc.suhail.build | v=DMARC1; p=none; rua=mailto:dmarc-reports at suhail.build |
| DMARC, after 4 to 8 weeks of clean reports | _dmarc.suhail.build | v=DMARC1; p=quarantine; rua=... |
| DMARC, target | _dmarc.suhail.build | v=DMARC1; p=reject; rua=... |

("at" stands for the @ sign.) Read the aggregate reports before tightening the policy: they show every service sending as suhail.build, including ones the team forgot (a form tool, a calendar invite service).

### Signup and list hygiene

- **Confirmed (double) opt-in:** the subscriber clicks a confirmation link. Fewer fake or mistyped addresses, a consent record (who, when, which form), and much better reputation. Required in practice for EU subscribers under GDPR's consent and accountability rules, and good practice everywhere.
- **One-click unsubscribe** in the header and a visible link in both languages.
- **Remove hard bounces immediately**; suppress complainers permanently.
- **Never import a list** collected by someone else (a sponsor's attendee list, scraped addresses). It wrecks reputation and is unlawful in many jurisdictions.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Check the current platform features and data-protection rules",
          md: md`Resend's broadcast and audience features, and the exact DNS records it generates, have changed since its launch; follow its current documentation rather than this lesson for record values. Data-protection law applies by where subscribers are: GDPR in the EU, and Gulf laws such as Saudi Arabia's Personal Data Protection Law and the UAE's federal data-protection law. Confirm current obligations (consent records, cross-border transfer rules) with counsel before collecting subscribers in those markets.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`**Reporting open rates to sponsors** that their own link tracking contradicts. **No DMARC at all**, then a spoofed "Suhail" phishing mail damages the domain. **Same domain for newsletter and sign-in links**, so a spam complaint wave delays everyone's login emails. **Sunsetting by opens**, which keeps every MPP user forever and removes real readers who block images. **A big first send to a cold list**, which looks like spam to providers.`,
        },
        {
          kind: "checklist",
          title: "Before the first issue",
          items: [
            "Sending subdomains verified in Resend; SPF and DKIM pass; DMARC p=none with reports arriving",
            "DKIM signing domain aligned with the From domain",
            "Double opt-in with stored consent records; language and role fields at signup",
            "One-click unsubscribe header plus visible bilingual link",
            "UTM convention for every link; bot-click filtering understood in the analytics",
            "Metric definitions written down: delivered, CTR, non-MPP open estimate, downstream actions",
            "Sunset rule defined on clicks and site activity",
          ],
        },
        {
          kind: "question",
          question: {
            id: "sh05-l02-p2",
            type: "short",
            prompt: md`**Produce it.** Write the one-page **newsletter technical and measurement plan** for suhail.build: sending subdomains and their purpose, the DNS records to create and the DMARC progression, signup fields and consent, the metrics you will report to sponsors with exact definitions (and what you will not report as a headline), segments, and the sunset rule. Include a 12-month list projection with illustrative acquisition and churn.`,
            rubric: [
              "Separate subdomains for transactional and newsletter mail, with SPF, DKIM (aligned) and a DMARC plan from p=none to quarantine or reject driven by reports",
              "Double opt-in with consent records, one-click unsubscribe, bounce and complaint handling",
              "Metric definitions: delivered, CTR with bot filtering, downstream actions; open rate treated as inflated by MPP",
              "Segments by language, role, country and engagement, and a sunset rule based on clicks or site activity",
              "A list projection using steady state A/c and the trajectory formula, with labelled illustrative numbers",
            ],
            modelAnswer: md`**Domains.** auth.suhail.build for Supabase sign-in and event confirmations; news.suhail.build for the newsletter; people mail on suhail.build. Each sending subdomain verified in Resend with its SPF and DKIM records exactly as generated; DKIM signs with the subdomain, which aligns with From under relaxed DMARC. DMARC at _dmarc.suhail.build: p=none with rua reports for 4 to 8 weeks, then quarantine once only known senders appear, then reject.

**Signup.** Double opt-in; store timestamp, form, IP and consent text. Fields: language (Arabic, English, both), role, country. One-click unsubscribe header (RFC 8058) and a bilingual footer link. Hard bounces removed at once; complainers suppressed.

**Metrics for sponsors.** Delivered (sent minus bounces); CTR = unique human clickers / delivered, filtering clicks within seconds of delivery or on all links at once; sponsor link clicks; registrations via UTM. Open rate is shown only as "reported opens, inflated by Apple MPP", never as a headline.

**Segments.** Language edition; role for opportunity emphasis; country for local events; engagement tiers active, cooling, inactive.

**Sunset.** No click, reply or site visit in 120 days triggers one re-engagement email; no response in 14 days, remove.

**Projection (illustrative).** Start 1,000, $A = 400$/month, $c = 2.5\%$: $N^* = 16{,}000$, $N_{12} = 16{,}000 - 15{,}000 \times 0.975^{12} \approx 4{,}930$. Shown as a model, not traction.`,
            explanation: md`The plan must make the newsletter deliverable (aligned authentication, a staged DMARC policy, hygiene) and its numbers honest (delivered, bot-filtered clicks, downstream actions; opens treated as inflated). The projection uses the steady-state model, presented as a model.`,
            concepts: ["sh05.email-authentication", "sh05.sender-reputation", "sh05.open-rate-mpp", "sh05.segmentation", "sh05.list-dynamics"],
            difficulty: 3,
          },
        },
        { kind: "sources", refs: ["sh05-r4", "sh05-r5", "sh05-r6", "sh05-r7", "sh05-r8", "sh05-r9", "sh05-r10", "sh05-r20", "sh05-r21"] },
        {
          kind: "feynman",
          prompt: "Explain to the Editorial lead why a 62% open rate does not mean 62% of subscribers read the issue, and what you will look at instead.",
          keyPoints: [
            "Opens are counted by a tracking image loading",
            "Apple MPP preloads images for Apple Mail users, counting opens without reading",
            "Image blocking can hide real readers, so opens are noisy in both directions",
            "Clicks (bot-filtered), replies and downstream actions are better signals",
            "Report delivered and CTR to sponsors; treat opens as an upper bound",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh05-l02-q1",
      type: "numeric",
      prompt: md`Illustrative. 300 new subscribers a month, monthly churn 3%. What is the steady-state list size?`,
      answer: 10000,
      tolerance: { abs: 1 },
      unit: "subscribers",
      explanation: md`$N^* = A/c = 300/0.03 = 10{,}000$. At steady state 300 leave each month, exactly balancing 300 joins.`,
      concepts: ["sh05.list-dynamics"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh05-l02-q2",
      type: "mcq",
      prompt: md`Why did open rates become unreliable after September 2021?`,
      options: [
        "Gmail stopped showing images by default",
        "Apple Mail Privacy Protection preloads remote content, including tracking pixels, for Apple Mail users whether or not they read",
        "DMARC began rejecting tracked emails",
        "Mailbox providers began hiding the subject line",
      ],
      answer: 1,
      explanation: md`MPP, introduced with iOS 15, fetches remote content through Apple's proxy, so the pixel loads for most Apple Mail recipients. Opens are inflated and their timing and location are meaningless for those users.`,
      concepts: ["sh05.open-rate-mpp"],
      difficulty: 1,
    },
    {
      id: "sh05-l02-q3",
      type: "multi",
      prompt: md`An issue goes out through an email service with SPF and DKIM passing on the provider's own domains, and DMARC fails for suhail.build. Which fixes address the cause?`,
      options: [
        "Set up a custom sending domain so DKIM signs with suhail.build or a subdomain",
        "Use a custom return-path (bounce) subdomain under suhail.build so SPF aligns",
        "Change DMARC to p=reject",
        "Add more links to the email",
      ],
      answer: [0, 1],
      explanation: md`DMARC needs SPF or DKIM to pass **in alignment** with the From domain. Passing on the provider's domains does not count. Tightening the policy before alignment works would send the newsletter to spam or reject it.`,
      concepts: ["sh05.email-authentication"],
      difficulty: 2,
    },
    {
      id: "sh05-l02-q4",
      type: "numeric",
      prompt: md`Illustrative. 8,000 delivered, 2,600 unique opens reported, 30% of recipients on Apple Mail with MPP. Estimate the non-MPP open rate (%).`,
      answer: 3.57,
      tolerance: { abs: 0.1 },
      unit: "%",
      explanation: md`MPP opens $\approx 0.30 \times 8{,}000 = 2{,}400$; non-MPP opens $= 2{,}600 - 2{,}400 = 200$ out of 5,600 non-MPP recipients, so 3.6%. A result this low says the MPP share assumption is probably too high, or many MPP users did not trigger opens: the estimate is only as good as $m$. Use the platform's machine-open flags where available.`,
      concepts: ["sh05.open-rate-mpp"],
      difficulty: 3,
    },
    {
      id: "sh05-l02-q5",
      type: "decision",
      prompt: md`The list has 6,000 subscribers. 1,500 have not clicked anything in six months but most show "opens". The Editorial lead wants to keep them for the sponsor kit. What do you do?`,
      options: [
        { text: "Keep them: the list size is what sponsors buy", score: 0.2, feedback: "Inactive subscribers hurt reputation and sponsors measure clicks; the size is hollow." },
        { text: "Send a re-engagement email, then remove those who do not click or visit, and report the smaller, engaged list", score: 1, feedback: "Correct: opens are inflated by MPP, so judge on clicks and activity, protect reputation and report honestly." },
        { text: "Delete them immediately with no notice", score: 0.5, feedback: "Defensible, but a re-engagement step recovers some real readers who block tracking." },
        { text: "Move them to a separate list and keep sending", score: 0.3, feedback: "Still damages reputation and still inflates nothing useful." },
      ],
      explanation: md`A sunset rule based on clicks and site activity protects deliverability and makes the numbers in the sponsor kit true.`,
      concepts: ["sh05.segmentation", "sh05.sender-reputation", "sh05.open-rate-mpp"],
      difficulty: 2,
    },
    {
      id: "sh05-l02-q6",
      type: "mcq",
      prompt: md`Under Gmail's 2024 bulk-sender guidance, what spam complaint rate should a sender stay below, and what is the recommended target?`,
      options: ["1% and 0.5%", "0.3% and 0.1%", "5% and 2%", "There is no threshold"],
      answer: 1,
      explanation: md`Google asks bulk senders to keep the user-reported spam rate below 0.3% and recommends staying below 0.1%. Confirmed opt-in, relevance and an easy unsubscribe keep complaints low.`,
      concepts: ["sh05.sender-reputation"],
      difficulty: 1,
    },
    {
      id: "sh05-l02-q7",
      type: "order",
      prompt: md`Order the DMARC rollout for suhail.build.`,
      items: [
        "Verify SPF and DKIM for each sending subdomain",
        "Publish DMARC with p=none and a report address",
        "Read aggregate reports and fix unknown or unaligned senders",
        "Move to p=quarantine",
        "Move to p=reject",
      ],
      explanation: md`Monitor first, fix what reports reveal, then tighten. Jumping to reject before knowing every sender blocks legitimate mail.`,
      concepts: ["sh05.email-authentication"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "sh05-l02-f1", front: "List steady state", back: md`$N^* = A/c$: monthly acquisitions over monthly churn rate.`, concepts: ["sh05.list-dynamics"] },
    { id: "sh05-l02-f2", front: "Time to halfway to steady state", back: md`$t_{1/2} = \ln 0.5/\ln(1-c)$; at 2% churn about 34 months. Depends only on churn.`, concepts: ["sh05.list-dynamics"] },
    { id: "sh05-l02-f3", front: "Apple MPP", back: "Mail Privacy Protection (iOS 15, September 2021): preloads remote content through a proxy, so Apple Mail recipients register opens without reading.", concepts: ["sh05.open-rate-mpp"] },
    { id: "sh05-l02-f4", front: "CTR vs CTOR", back: "CTR = unique clickers / delivered. CTOR = unique clickers / unique openers (distorted by MPP-inflated opens).", concepts: ["sh05.click-metrics"] },
    { id: "sh05-l02-f5", front: "SPF, DKIM, DMARC in one line each", back: "SPF: which servers may send for the domain. DKIM: a signature verified with the domain's published key. DMARC: what to do if neither passes aligned with From, plus reports.", concepts: ["sh05.email-authentication"] },
    { id: "sh05-l02-f6", front: "DMARC alignment", back: "The domain that passed SPF or DKIM must match the visible From domain (organisational domain in relaxed mode).", concepts: ["sh05.email-authentication"] },
    { id: "sh05-l02-f7", front: "Sunset policy basis", back: "Clicks, replies and site activity over about 120 days, never opens.", concepts: ["sh05.segmentation"] },
  ],
};

export default lesson;
