import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc04-l08",
  title: "Enterprise and government procurement, outbound and CRM hygiene",
  summary:
    "Late-stage deals are won or lost in procurement: RFx documents, vendor onboarding and, in the Gulf, public tender rules. Early-stage pipelines are built by outbound whose arithmetic you can plan. Both depend on a CRM with a few fields kept honest.",
  minutes: 85,
  objectives: [
    "You can distinguish RFI, RFQ and RFP, and decide whether to bid on a request you did not shape.",
    "You can list what vendor onboarding needs and start it early.",
    "You can describe how a Gulf government buyer purchases (CAPT tenders, direct contracting, KAPP for PPPs) and what changes with Kuwait's Law 94/2026, pointing to Track 0 for detail.",
    "You can design a cold outbound sequence and compute the contacts needed for a meeting target.",
    "You can define the CRM fields that matter and the hygiene rules that keep a forecast honest.",
  ],
  concepts: [
    { id: "fc04.rfx", name: "RFI, RFQ and RFP", description: "Request for information (market scan), request for quotation (price for a defined scope) and request for proposal (solution, approach and price evaluated against criteria); in some public and PPP processes RFQ means request for qualification.", competency: "fc-sales", related: ["fc04.paper-process"] },
    { id: "fc04.vendor-onboarding", name: "Vendor onboarding", description: "The buyer's process to register a new supplier: legal and tax documents, bank details, insurance, compliance declarations, security review and portal set-up, often taking weeks.", competency: "fc-sales", related: ["fc04.paper-process", "fc04.security-review"] },
    { id: "fc04.gulf-gov-procurement", name: "Selling to Gulf governments", description: "Public buyers purchase through formal regimes (in Kuwait: CAPT tenders, direct contracting below limits, KAPP for PPPs) with fixed documents, guarantees, local-content rules and audit review; the seller's leverage is before the tender.", competency: "fc-sales", related: ["m11.tender-sequence", "m11.law-94-2026", "m11.procurement-regimes"] },
    { id: "fc04.outbound-sequence", name: "Outbound sequence", description: "A planned series of personalised touches (email, LinkedIn, phone) to named people in target accounts, measured by deliverability, reply rate and positive-reply rate.", competency: "fc-sales", related: ["fc04.sales-stages"] },
    { id: "fc04.crm-hygiene", name: "CRM hygiene", description: "A minimal set of fields (stage, exit evidence, next step and date, close date, amount, qualification, roles, source, loss reason) and rules that keep the pipeline and forecast truthful.", competency: "fc-sales", related: ["fc04.forecast-categories", "fc04.meddpicc"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "How large organisations buy, and how pipelines are built",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Afterwave's buyers are industrial enterprises with procurement departments, supplier portals and security reviews. Mizan's buyers include MEWRE, KAPP and KISR, which buy through public rules where price is fixed at bid time and late surprises are fatal. And neither venture has inbound demand yet: the first pipeline will come from outbound you run yourself. Knowing the procurement path and the outbound arithmetic lets you plan months, not hope for them.`,
        },
        {
          kind: "md",
          md: md`### RFI, RFQ, RFP

| Document | Buyer asks | When | Your move |
|---|---|---|---|
| **RFI** (request for information) | "Who can do this and how?" | Early market scan | Answer well; try to meet the author; shape the next document |
| **RFQ** (request for quotation) | "Price for this defined scope" | Scope fixed, comparing price | Check the scope matches what you sell; price clearly |
| **RFP** (request for proposal) | "Solution, approach, team and price", scored against criteria | Formal selection | Bid only if you can win (below) |

In public and PPP processes **RFQ** often means **request for qualification** (prequalification before the RFP), as in the KAPP sequence described in Track 0.

**Bid or no bid.** An RFP that arrives from an account you have never spoken to was usually written with another vendor's help, and its criteria favour them. A quick test: did you meet the author before it was issued? Do the requirements match your strengths? Do you know the budget and evaluation weights? Is there a way to ask clarifying questions? If most answers are no, your win probability is low and the response (often 30 to 80 hours of founder time) is better spent on outbound. If you do bid, answer every requirement in the buyer's numbering, and use the clarification window.

### Vendor onboarding

Before a large company can pay you, you must exist in its supplier system. Typical requests: company registration extract (for a Dutch company, the KvK extract), VAT number, bank confirmation letter, tax forms, insurance certificates (professional indemnity, general liability, sometimes cyber), supplier code of conduct, anti-bribery and sanctions declarations, sometimes ISO certificates, security questionnaire, and access to the buyer's procurement portal. Payment terms of 30 to 90 days after invoice are common. Ask about onboarding at S3 and start it as soon as a pilot is likely; it is part of the paper process (lesson 4).

### Selling to Gulf governments

Public buyers do not buy like companies. In Kuwait, conventional procurement above thresholds runs through the **Central Agency for Public Tenders (CAPT)**; PPP projects run through **KAPP**; the **State Audit Bureau** reviews contracts above its threshold before signature. Decree-Law 94/2026, published on 27 September 2026 and taking effect three months later, is reported to raise direct contracting without CAPT approval to KD 1 m per financial year for the same items, to ban local and commission agents in public procurement, and to tighten local content. For a seller this means:

- **Your leverage is before the tender:** briefings, demonstrations, technical papers and pilots shape the specification; once the tender is out, communication is formal and the price is fixed at bid time.
- **Documents and guarantees:** registration with the purchasing entity, Arabic and English documents, bid bonds and performance guarantees, fixed validity periods.
- **Lowest compliant price often wins:** technical compliance is pass/fail, then price ranks. Design your offer to be compliant first.
- **Time:** approvals and audit review add months; plan cash accordingly.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Law 94/2026 and research-body procurement",
          md: md`The Law 94/2026 details above come from secondary legal summaries (Al Tamimi, Deloitte) recorded in the course research; the final text, executive regulations and transitional rules must be checked in Kuwait Al-Youm issue 1810 and CAPT circulars. Whether a given KISR or MEWRE analytics or O&M service is procured through CAPT, direct contracting or another route is an inference, not confirmed. Before pricing a Mizan public offer, ask the entity's procurement or legal department which regime applies.`,
        },
        { kind: "xref", to: "m11-l01", note: "Track 0: Kuwait's Public Tenders Law, CAPT thresholds, direct contracting and Law 94/2026 in detail." },
        { kind: "xref", to: "m11-l02", note: "Track 0: the tender sequence, bid and performance guarantees, clarifications and evaluation methods." },
        {
          kind: "md",
          md: md`### Outbound arithmetic

Aaron Ross's *Predictable Revenue* made the case for treating prospecting as a separate, measurable process. The arithmetic of a sequence is a product of rates:`,
        },
        { kind: "equation", formula: "fc04-outbound-meetings" },
        {
          kind: "md",
          md: md`Each factor has a different lever: **deliverability** $d$ (a separate sending domain with SPF, DKIM and DMARC set up, warmed-up inboxes, low daily volumes, clean lists), **reply rate** $r$ (relevance: right persona, a specific observation about their situation, a short ask), and **positive share** $q$ (targeting: accounts that actually fit the ICP). Measure each separately; a low meeting rate tells you nothing until you know which factor failed.

A sequence for a technical persona: 5 to 7 touches over about 3 weeks, mixing email, LinkedIn and phone, each short and specific, each giving a reason to reply.

| Day | Channel | Content |
|---|---|---|
| 1 | Email | One observation about their situation (job post for test engineers, a product launch), one sentence on the problem, a short question |
| 3 | LinkedIn | Connection request with no pitch |
| 5 | Email | A useful asset: a two-page note on change-impact in hardware regression |
| 9 | Phone | 30 seconds: who you are, the question from email 1 |
| 13 | Email | A specific number: "teams we talk to rerun 40 to 60 % of tests that cannot fail" (only if true for your conversations) |
| 20 | Email | Close the loop: "Should I stop writing, or is someone else the right person?" |

### CRM fields that matter

| Field | Why |
|---|---|
| Account, ICP tier | Prioritisation |
| Stage, date entered, exit evidence | Conversions and time in stage (lessons 1 and 5) |
| Next step, owner, date | No date, no deal |
| Expected close date, times moved | Slippage signal |
| Amount (ACV) and term | Weighted pipeline |
| MEDDPICC scores and one-line evidence | Qualification (lesson 4) |
| Champion, economic buyer (names) | Gates |
| Source (outbound, referral, event, inbound) | Which channel works |
| Loss reason (pick list) | Learning |
| Forecast category | Commit vs best case |

**Hygiene rules:** every open deal has a dated next step; a close date moved twice triggers a review; a stage change needs exit evidence; closed-lost needs a reason; activity is logged the same day.`,
        },
        {
          kind: "chart",
          chart: "bar",
          title: "Illustrative cold outbound funnel for 400 contacts",
          xKey: "step",
          xLabel: "Step",
          yLabel: "People or deals",
          series: [{ key: "count", label: "Expected count" }],
          data: [
            { step: "Contacts", count: 400 },
            { step: "Delivered (95 %)", count: 380 },
            { step: "Replied (8 %)", count: 30.4 },
            { step: "Meetings (40 % of replies)", count: 12.2 },
            { step: "Qualified opportunities (50 %)", count: 6.1 },
            { step: "Won (20 %)", count: 1.2 },
          ],
          caption: "Assumed rates for a well-targeted, personalised sequence to a technical persona; your own measured rates replace these after the first few hundred contacts.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Sizing outbound for the first pilots",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "How many people must Afterwave contact for 45 first meetings?",
          given: md`From lesson 1: 45 first meetings by mid-March 2027 (illustrative). Assumed sequence rates: deliverability 95 %, reply rate 8 % over the whole sequence, 40 % of replies positive and booking a meeting. Research and personalisation take about 6 minutes per contact.`,
          steps: [
            { md: md`**Meetings per contact:** $d\,r\,q = 0.95\times0.08\times0.40 = 0.0304$, about 3 meetings per 100 contacts.` },
            { md: md`**Contacts needed:** $N_c = 45/0.0304 = 1{,}480$ contacts.` },
            { md: md`**Accounts:** at about 5 relevant people per account (validation lead, test systems engineer, head of test, quality lead, VP), that is about 296 target accounts.` },
            { md: md`**Founder time:** $1{,}480\times6$ min $= 148$ h of research and writing, about 15 h a week for 10 weeks, before any meetings.` },
            { md: md`**Check against the pilot target:** 45 meetings at 9 % end to end (lesson 1) gives about 4 signed pilots.` },
          ],
          result: md`About 1,500 contacts in about 300 accounts and 150 hours of work for 45 meetings. If you do not have 300 ICP accounts, or 15 hours a week, change the mix: warm introductions (investors, the founding team's Tesla and Signify networks, accelerator networks) convert far better per hour.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: warm introductions",
          given: md`Illustrative: 60 warm introductions through investors and former colleagues. Deliverability 100 % (a personal forward), reply rate 50 %, positive share 60 %.`,
          steps: [
            { md: md`Meetings: $M = 60\times1.0\times0.50\times0.60$.` },
            { md: md`= **18 meetings**.`, hidden: true, check: { prompt: "Meetings from warm introductions", answer: 18, unit: "meetings", tolerance: { abs: 0 } } },
            { md: md`Cold contacts still needed to reach 45 meetings: $(45-18)/0.0304$.` },
            { md: md`= **889 contacts** (888.2, rounded up).`, hidden: true, check: { prompt: "Cold contacts still needed", answer: 889, unit: "contacts", tolerance: { abs: 2 } } },
          ],
          result: md`Sixty warm introductions replace about 590 cold contacts. Ask every investor and adviser for three named introductions in your ICP before you buy a single contact list.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Doing it: procurement files, sequences and the CRM",
      blocks: [
        {
          kind: "md",
          md: md`### A vendor file you prepare once

Keep a folder ready to send the day procurement asks: registration extract, VAT and tax numbers, bank letter on letterhead, insurance certificates, signed code of conduct and anti-bribery declaration, security pack (lesson 6), standard terms (MSA, order form, DPA), a one-page company profile in English (and Arabic for Gulf public buyers), and references when you have them.

### Outbound in practice

- **Lists:** build from the ICP: company type, number of rigs or plants, recent launches or job posts for test engineers. Verify roles on LinkedIn; buy data only to fill gaps.
- **Tools:** a sequencing tool connected to the CRM, a separate sending domain, call notes in the CRM.
- **Rules of law:** B2B cold email in the EU generally relies on legitimate interest under GDPR with a clear opt-out, but national ePrivacy rules differ (some member states are stricter about unsolicited email); check the rules for the recipient's country. In Kuwait and the Gulf, warm introductions and in-person meetings matter more than cold email.
- **Measure weekly:** contacts added, delivered, replies, positive replies, meetings; by persona and message.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Answering every RFP.** Unshaped RFPs consume founder weeks at low win rates.
- **Starting onboarding after the verbal yes.** Weeks of delay at the end of every deal.
- **Missing a tender clarification deadline,** or submitting a qualified price in a public tender: it can make the bid non-compliant.
- **Volume over relevance.** Generic messages at high volume hurt deliverability and the brand.
- **A CRM nobody updates.** If the founder does not keep it current, no one will; forecasts become opinion.`,
        },
        {
          kind: "checklist",
          title: "Weekly CRM hygiene (15 minutes)",
          items: [
            "Every open deal has a dated next step owned by someone",
            "Deals with close dates moved twice are reviewed and re-dated with the buyer",
            "Stage changes this week have exit evidence attached",
            "Closed-lost deals have a loss reason",
            "Outbound metrics updated: delivered, replies, positive replies, meetings",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask a public or enterprise buyer early",
          items: [
            "How will this be purchased: a tender, a direct purchase, a framework, or a research collaboration?",
            "Which documents and registrations do you need from a new supplier, and how long does registration take?",
            "Is there a budget line for this in the current financial year?",
            "Who writes the technical specification, and can we brief them before it is issued?",
            "Which local-content or local-presence rules would apply?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc04-l08-p1",
            type: "short",
            prompt: md`Produce an outbound plan for Afterwave (hardware validation persona) or Mizan (PV plant O&M or utility persona). Include: (1) the ICP and the number of target accounts and contacts; (2) the full sequence: at least five touches with day, channel and the actual text of the first email (under 120 words); (3) the arithmetic: assumed deliverability, reply rate and positive share, expected meetings, and the contacts needed for your meeting target; (4) the CRM fields you will track for these contacts and deals; (5) for Mizan, or for any public buyer, how the plan changes when the buyer purchases through a public tender.`,
            rubric: [
              "ICP is specific (industry, size, signals) and account and contact counts are consistent.",
              "Sequence has five or more touches over two to four weeks across channels; first email is short, specific, persona-relevant and ends with a low-effort question.",
              "Arithmetic uses the product of rates correctly and inverts it to size the list for a stated meeting target.",
              "CRM fields include stage, next step and date, close date, amount, qualification, roles, source and loss reason.",
              "Public-buyer adaptation recognises that leverage is before the tender, the role of formal registration and documents, and points to the procurement regime (CAPT, direct contracting or KAPP) without inventing rules.",
              "No invented traction; numbers labelled illustrative.",
            ],
            modelAnswer: md`**Venture:** Afterwave (illustrative).

**ICP:** European and US companies building drive units, actuators or humanoid robots with at least 4 test rigs and a firmware release cadence of at least monthly; signals: job posts for test or validation engineers, recent product launches. 200 accounts, 5 contacts each: 1,000 contacts.

**Sequence:** day 1 email; day 3 LinkedIn connection; day 6 email with a two-page note on change impact; day 9 call; day 14 email with one number from our discovery calls; day 21 close-the-loop email.

**Email 1:** "Subject: reruns after firmware changes. Hi [name], I saw [company] is hiring two validation engineers for the [product] programme. Teams we speak with often rerun their full regression after every firmware change because nobody can say which tests a change can affect. We are building a tool that answers that from the rig data and the change itself, with the reason for each test. How does your team decide what to rerun today? [signature]"

**Arithmetic:** $d$ = 95 %, $r$ = 8 %, $q$ = 40 %, so 3.04 meetings per 100 contacts: 1,000 contacts give about 30 meetings. For 45 meetings: $45/0.0304 = 1{,}480$ contacts, so add about 100 accounts or about 50 warm introductions (at the 30 % meeting rate of the warm-introduction example).

**CRM fields:** contact role and persona, sequence step, reply type; for deals: stage with entry date and exit evidence, next step and date, close date and times moved, ACV, MEDDPICC scores, champion and economic buyer, source, loss reason, forecast category.

**Public buyer (Mizan):** cold email has little role; the plan becomes briefings and technical presentations to the entity before any tender, a registration file in Arabic and English, a check with the entity's procurement department on the regime (CAPT tender, direct contracting under the new limit, or a research collaboration with KISR), and a calendar built around the tender and approval timeline.`,
            explanation: md`A strong plan shows the product of rates, sizes the list from the meeting target, and adapts to how the buyer actually purchases.`,
            concepts: ["fc04.outbound-sequence", "fc04.crm-hygiene", "fc04.gulf-gov-procurement"],
            difficulty: 2,
          },
        },
        { kind: "sources", refs: ["fc04-r8", "fc04-r16", "fc04-r18"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc04-l08-q1",
      type: "numeric",
      prompt: md`A sequence goes to 600 contacts with 90 % deliverability, a 6 % reply rate and 50 % of replies booking a meeting. How many meetings do you expect?`,
      answer: 16.2,
      tolerance: { abs: 0.1 },
      unit: "meetings",
      explanation: md`$600\times0.90\times0.06\times0.50 = 16.2$ meetings.`,
      concepts: ["fc04.outbound-sequence"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc04-l08-q2",
      type: "numeric",
      prompt: md`You need 30 meetings. Rates: deliverability 95 %, reply 10 %, positive 40 %. How many contacts are needed? (round up)`,
      answer: 790,
      tolerance: { abs: 1 },
      unit: "contacts",
      explanation: md`$d\,r\,q = 0.95\times0.10\times0.40 = 0.038$. $30/0.038 = 789.5$, so 790 contacts.`,
      concepts: ["fc04.outbound-sequence"],
      difficulty: 1,
    },
    {
      id: "fc04-l08-q3",
      type: "decision",
      prompt: md`An RFP arrives from a large industrial company you have never spoken to. It is due in 10 days and lists 140 requirements, several matching a competitor's feature names. What do you do?`,
      options: [
        { text: "Write a full response: every RFP is a chance.", score: 0.2, feedback: "Probably 40 to 80 hours for a low win probability; you were likely invited to make up the numbers." },
        { text: "Use the clarification window to ask questions and request a call with the author; bid only if you learn the criteria fit and you can reach a decision-maker; otherwise decline politely and ask to be included in future market scans.", score: 1, feedback: "Tests whether the RFP is winnable at low cost and leaves a door open." },
        { text: "Ignore it.", score: 0.3, feedback: "Wastes a possible relationship. A short, courteous reply costs little." },
      ],
      explanation: md`Unshaped RFPs have low win rates. The clarification process is the cheap way to find out whether this one is different.`,
      concepts: ["fc04.rfx"],
      difficulty: 2,
    },
    {
      id: "fc04-l08-q4",
      type: "mcq",
      prompt: "Where is a seller's leverage greatest in a public tender?",
      options: [
        "After bid opening, by negotiating price",
        "Before the tender is issued, by informing the specification through briefings, demonstrations and pilots",
        "During evaluation, by contacting evaluators",
        "After award, by renegotiating scope",
      ],
      answer: 1,
      explanation: md`Once the tender is out, communication is formal and the price is fixed; contacting evaluators is improper. Influence the requirement (legitimately) beforehand.`,
      concepts: ["fc04.gulf-gov-procurement"],
      difficulty: 1,
    },
    {
      id: "fc04-l08-q5",
      type: "multi",
      prompt: "Which are typical vendor onboarding requirements? (Select all that apply.)",
      options: ["Company registration extract and VAT number", "Bank confirmation letter", "Insurance certificates", "Anti-bribery and sanctions declarations", "A product roadmap commitment"],
      answer: [0, 1, 2, 3],
      explanation: md`Onboarding is legal, financial and compliance paperwork (plus often a security review). Roadmaps are not part of it.`,
      concepts: ["fc04.vendor-onboarding"],
      difficulty: 1,
    },
    {
      id: "fc04-l08-q6",
      type: "multi",
      prompt: "Which CRM hygiene rules keep a forecast honest? (Select all that apply.)",
      options: [
        "Every open deal has a dated next step",
        "A stage change needs exit evidence",
        "Close dates moved twice trigger a review",
        "Closed-lost deals need a loss reason",
        "Deals are kept open as long as the contact replies to emails",
      ],
      answer: [0, 1, 2, 3],
      explanation: md`Replies are not progress. The four rules tie the CRM to buyer actions and learning.`,
      concepts: ["fc04.crm-hygiene"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc04-l08-f1", front: "RFI vs RFQ vs RFP", back: "Information (market scan) vs quotation (price for a fixed scope) vs proposal (solution and price scored on criteria). In public/PPP use, RFQ can mean request for qualification.", concepts: ["fc04.rfx"] },
    { id: "fc04-l08-f2", front: "Outbound meetings", back: md`$M = N_c\, d\, r\, q$; size the list with $N_c = M/(d\,r\,q)$.`, concepts: ["fc04.outbound-sequence"] },
    { id: "fc04-l08-f3", front: "95 % x 8 % x 40 % gives", back: "About 3 meetings per 100 contacts; 45 meetings need about 1,480 contacts.", concepts: ["fc04.outbound-sequence"] },
    { id: "fc04-l08-f4", front: "Kuwait Law 94/2026 (reported)", back: "Gazetted 27 Sep 2026, effective three months later: direct contracting up to KD 1 m per FY per item without CAPT approval; agents banned; local content tightened. Verify the text.", concepts: ["fc04.gulf-gov-procurement"] },
    { id: "fc04-l08-f5", front: "When to start vendor onboarding", back: "At S3, as soon as a pilot is likely, never after the verbal yes.", concepts: ["fc04.vendor-onboarding"] },
    { id: "fc04-l08-f6", front: "Minimum CRM fields", back: "Stage and exit evidence, next step and date, close date (and times moved), amount, MEDDPICC, champion and economic buyer, source, loss reason, forecast category.", concepts: ["fc04.crm-hygiene"] },
  ],
};

export default lesson;
