import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh03-l04",
  title: "Selling sponsorship: target list, outreach, the call, objections, Gulf budget cycles and forecasting",
  summary:
    "Sponsorship is B2B sales with a hard deadline: the event date. This lesson builds the target list by sponsor motive and budget owner, sizes outreach with funnel arithmetic, structures the deck and the first call, handles the objections a new community hears, explains how Gulf marketing and procurement cycles shape timing, and forecasts sponsorship revenue with the pipeline-forecast widget against a go/no-go gate.",
  minutes: 80,
  objectives: [
    "Build a sponsor target list segmented by motive, budget owner, buying trigger and warm path",
    "Compute how many accounts must be contacted to reach a sponsorship target, and how warm introductions change it",
    "Run a first sponsor call that finds the budget owner, the metric and the paper process",
    "Answer the common objections to a new community without discounting first",
    "Time the sales cycle to Gulf budget and procurement cycles, and forecast sponsorship revenue against the event's gates",
  ],
  concepts: [
    { id: "sh03.sponsor-target-list", name: "Sponsor target list", description: "Accounts grouped by motive (hiring, adoption, brand, deal flow, mandate), with the named budget owner, the buying trigger and the warmest path in; ranked by fit and timing, not by logo size.", competency: "sh-partnerships", related: ["sh03.sponsor-motives", "fc03.icp"] },
    { id: "sh03.sponsor-funnel", name: "Sponsorship funnel arithmetic", description: "Accounts to contact equals deals needed divided by the product of call rate and win rate; warm introductions raise the call rate several-fold and are the main lever.", competency: "sh-partnerships", related: ["fc04.outbound-sequence"] },
    { id: "sh03.budget-cycle", name: "Gulf budget and procurement cycles", description: "Most sponsor budgets are set for the next fiscal year months in advance (calendar-year fiscal years are common in the Gulf); unplanned spend comes from other pockets (talent, developer relations, CSR) and still passes vendor registration and a purchase order.", competency: "sh-partnerships", related: ["fc04.paper-process", "fc04.gulf-gov-procurement"] },
    { id: "sh03.sponsor-objections", name: "Sponsor objections", description: "The recurring objections to a new community (no budget, no track record, send the deck, we only do big events, give us the list) each have a structural answer: another budget pocket, founding-partner terms with make-goods, a booked follow-up, cost per outcome, consented opt-in.", competency: "sh-partnerships", related: ["sh03.sponsor-target-list"] },
    { id: "sh03.sponsor-forecast", name: "Sponsorship forecast and gates", description: "Weighted pipeline by stage, with stage probabilities from your own conversions, compared with the sponsorship the budget needs; commitments (deposits) gated on signed revenue, not on weighted pipeline.", competency: "sh-partnerships", related: ["fc04.weighted-pipeline", "sh03.cancellation-exposure"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Sponsorship as a sales process with a deadline",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Every Suhail event will be sold before it exists, by volunteers, to companies that set their budgets months ahead. The Partnerships lead's pipeline decides whether the Events lead can pay the venue deposit. Founder Core already teaches the B2B sales process; what changes here is the deadline (an event date that does not move), the buyer (a marketing, talent or developer-relations budget owner rather than an engineering team), and the Gulf calendar, which means the first sponsors of a plan starting in January 2027 will mostly come from budgets that were set in late 2026.`,
        },
        { kind: "xref", to: "fc04-l01", note: "The B2B sales process, stages with buyer-verifiable exit criteria and founder-led sales: the base for everything in this lesson." },
        {
          kind: "md",
          md: md`### The target list

Start from motives (Lesson 3), not from a list of famous logos. For each candidate account record: **motive**, **budget owner** (title, and name when known), **trigger** (they are hiring engineers, launching an API or Arabic model, opening a regional office, running a national skills programme), **warm path** (who can introduce you), and **timing** (when their budget is set). Candidate categories for an Arab builder community:

| Category | Typical motive | Typical owner |
|---|---|---|
| AI model and cloud providers, including regional sovereign-linked labs | Developer adoption, brand | Developer relations, regional marketing |
| Software companies and scale-ups hiring engineers | Hiring | Head of talent, CTO |
| Banks, telcos and fintechs (fintech took about 58 % of MENA funding in 2025, Wamda) | Hiring, brand, open innovation | Innovation lab, employer brand |
| VC funds and accelerators | Deal flow | Partners, platform team |
| Government innovation bodies, universities | Ecosystem mandate | Programme directors |
| Developer tools and startups | Adoption | Founders (small tickets, Community tier) |

### Funnel arithmetic`,
        },
        { kind: "equation", formula: "sh03-outbound-required" },
        {
          kind: "md",
          md: md`For a target of USD 230,000 at an average deal of about USD 12,800 (the Lesson 3 plan: 18 sponsors), with 25 % of contacted accounts taking a first call and 30 % of calls signing (illustrative), you need $\lceil 18/(0.25\times0.30)\rceil = 240$ accounts. With warm introductions that lift the call rate to 60 %, it is $\lceil 18/(0.60\times0.30)\rceil = 100$. Introductions are worth more than any template; this is why Suhail's investor and employer network is a sales asset, not only a member benefit.

### The deck and the first call

A sponsorship deck is short (8 to 10 slides): who attends and how they are selected; why this community (the gap it fills in the region); formats and calendar; the audience evidence you actually have (for a first event: team, applications, partner venues, no invented numbers); packages by motive; outcomes and the reporting promise; terms; the ask. Send it after the first call, not instead of it.

The first call is a discovery call. You need four things before you send a proposal: **the motive and the metric** the owner is judged on, **the alternative cost** per outcome (Lesson 3), **the budget**: which budget, how much is left, when next year's is set, and **the paper process**: vendor registration, purchase order, payment terms. These map directly onto Founder Core's MEDDPICC: metrics, economic buyer, decision process, paper process.`,
        },
        { kind: "xref", to: "fc04-l02", note: "Discovery call structure and quantifying pain in the buyer's own numbers." },
        {
          kind: "md",
          md: md`### Gulf budget and procurement cycles

- **Budgets are set ahead.** Calendar-year fiscal years are common across the Gulf (the Saudi government budget, for example, runs on the calendar year). Marketing and events budgets for next year are typically drafted in the third quarter and approved in the fourth. If Suhail Season 2027 is not in a sponsor's plan by about November 2026, it will be funded from leftover or reallocated money, if at all.
- **Other pockets exist.** Talent acquisition, developer relations, CSR, innovation labs and national programmes have separate budgets. A head of talent with a recruiter-fee budget can often fund a hiring package mid-year when marketing cannot.
- **Use-it-or-lose-it.** Some organisations reallocate unspent budget late in the fiscal year; a ready, small package can catch it. Do not plan around it.
- **Procurement is a gate, not a formality.** Large companies and government-linked bodies require vendor registration (commercial registration, tax and VAT certificates, bank letter, sometimes local-content documents), a purchase order before an invoice, and payment terms that are often 30 to 90 days (illustrative; ask). Suhail needs a legal entity able to sign contracts and issue invoices before the first large sponsor can pay.
- **Ramadan, summer and year-end** compress decision windows; plan the sales calendar around them.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Check these locally",
          md: md`Budget timing varies by company and is not documented in the research brief: confirm each sponsor's fiscal year and approval calendar in discovery. VAT on sponsorship invoices (15 % in Saudi Arabia and 5 % in the UAE) depends on where Suhail's invoicing entity is registered and where the sponsor is; Kuwait had not introduced VAT at the time of writing. Confirm with an accountant before the first invoice.`,
        },
        { kind: "xref", to: "fc04-l08", note: "Enterprise and government procurement, vendor onboarding, outbound sequences and CRM hygiene in Founder Core." },
        {
          kind: "md",
          md: md`### Forecasting sponsorship revenue

The pipeline-forecast widget computes weighted pipeline from deals per stage and stage probabilities. Its stage names come from enterprise software; map them onto a sponsorship process:

| Widget stage | Sponsorship meaning | Exit criterion (buyer action) |
|---|---|---|
| Discovery (10 %) | First call held | Owner has described motive and metric |
| Qualified (20 %) | Budget confirmed | Owner names the budget and amount available |
| Technical eval (35 %) | Proposal under review | Owner has the tailored package and a decision date |
| Pilot (55 %) | Verbal yes | Tier and price agreed by the budget owner |
| Procurement (80 %) | Contract and PO | Vendor registered, contract in signature, PO requested |

The default probabilities and months-to-close in the widget are generic B2B values; replace them with your own conversion data after the first few events, and ignore its quarterly timing for an event that is less than a quarter away. Use it to answer one question: **is the weighted pipeline large enough, early enough, to pay the next deposit?** The gate itself uses signed revenue (Lesson 2).`,
        },
        { kind: "equation", formula: "fc04-weighted-pipeline" },
        {
          kind: "widget",
          widget: "pipeline-forecast",
          props: { target: 230000, acv: 15000 },
          caption: "Set the deal counts to 12, 7, 5, 3, 2 (Discovery to Procurement). The widget uses one average deal size; the worked example below uses deal-specific values.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Sizing the sales effort for Suhail Season",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Pipeline at eight months out",
          given: md`Illustrative Suhail Season with a sponsorship need of USD 221,750 to break even and a plan of USD 230,000 (Lesson 2). At M-8, before any signature, the Partnerships lead's CRM shows: Discovery 12 deals averaging USD 10k; Qualified 7 at 15k; Proposal under review 5 at 18k; Verbal yes 3 at 20k; Contract and PO 2 at 40k (the Headline candidates). Stage probabilities as in the widget (10, 20, 35, 55, 80 %).`,
          steps: [
            { md: md`**Unweighted pipeline:** $120 + 105 + 90 + 60 + 80 = 455$ USD k. Coverage $455/230 = 1.98$x.` },
            { md: md`**Weighted pipeline:** $120\times0.10 + 105\times0.20 + 90\times0.35 + 60\times0.55 + 80\times0.80 = 12 + 21 + 31.5 + 33 + 64 = 161.5$ USD k, 70 % of plan.` },
            { md: md`**Gap:** $230 - 161.5 = 68.5$ USD k expected shortfall. Blended win rate $161.5/455 = 35.5$ %, so the coverage needed is about $1/0.355 = 2.8$x (648k), not 2x.` },
            { md: md`**Where to add:** filling 68.5k at the Discovery stage needs $68.5/0.10 = 685$k of new discovery pipeline; moving three Proposal deals to Verbal yes adds $3\times18\times(0.55-0.35) = 10.8$k of weighted value. Neither closes the gap alone: the pipeline needs both more qualified accounts (about 240 contacts at cold rates, 100 with introductions) and a cheaper plan B.` },
            { md: md`**Gate link:** the second venue deposit at M-4 requires signed sponsorship of at least 70 % of the need (about USD 155k). Today's weighted pipeline would barely cover that even if every expectation came true on time.` },
          ],
          result: md`Weighted pipeline USD 161.5k against a USD 230k plan (illustrative): the event is under-sold at M-8. Actions: a target-list sprint with introductions from Suhail's network, a smaller one-day plan B costed now, and the M-4 gate written into the plan so that nobody pays a deposit on hope.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: a hackathon sponsorship target",
          given: md`Illustrative Suhail hackathon needing USD 26,000 of sponsorship from 8 sponsors (average about USD 3,250). Cold outreach: 20 % of accounts take a call; 35 % of calls sign. With introductions from two VC partners of the community, the call rate rises to 55 %.`,
          steps: [
            { md: md`Accounts needed cold: $\lceil 8/(0.20\times0.35)\rceil$.` },
            { md: md`$8/0.07 = 114.3$, so **115 accounts**.`, hidden: true, check: { prompt: "Accounts needed with cold outreach", answer: 115, tolerance: { abs: 0.5 }, unit: "accounts" } },
            { md: md`Accounts needed with introductions: $\lceil 8/(0.55\times0.35)\rceil$.` },
            { md: md`$8/0.1925 = 41.6$, so **42 accounts**.`, hidden: true, check: { prompt: "Accounts needed with warm introductions", answer: 42, tolerance: { abs: 0.5 }, unit: "accounts" } },
          ],
          result: md`Introductions cut the list from 115 to 42 accounts. For a volunteer Partnerships lead with perhaps 8 hours a week, that is the difference between a feasible and an impossible sales plan.`,
        },
        {
          kind: "question",
          question: {
            id: "sh03-l04-p1",
            type: "numeric",
            prompt: md`Four sponsorship deals: USD 15k at Qualified (20 %), USD 15k at Proposal (35 %), USD 6k at Verbal yes (55 %) and USD 40k at Contract (80 %). What is the weighted pipeline in USD k?`,
            answer: 43.55,
            tolerance: { abs: 0.05 },
            unit: "USD k",
            explanation: md`$15\times0.20 + 15\times0.35 + 6\times0.55 + 40\times0.80 = 3 + 5.25 + 3.3 + 32 = 43.55$ USD k. Note how much rests on the single Headline deal: if it slips, three quarters of the weighted value goes with it.`,
            concepts: ["sh03.sponsor-forecast"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Calls, objections and procurement",
      blocks: [
        {
          kind: "md",
          md: md`### Objections a new community hears, and structural answers

| Objection | What is usually behind it | Answer |
|---|---|---|
| "No budget this year." | Marketing budget already allocated | Ask which other budget fits (talent, developer relations, CSR); offer a small package now and a slot in next year's plan; ask when planning starts and book that meeting. |
| "You have no track record." | Risk to the champion's reputation | Founding-partner terms: lower price, stated audience ranges, make-good credits if floors are missed, refund if cancelled. Show the team, the selection process and the applications to date. |
| "Send me the deck." | A polite exit | Agree, ask two discovery questions first ("who would judge this a success, and on what number?"), and book the follow-up before hanging up. |
| "We already sponsor GITEX or LEAP." | Events budget committed to large shows | Different outcome: a few hundred selected builders instead of visitors; compare cost per qualified lead or per hire. |
| "Can we have the attendee list?" | Hiring or lead targets | Only consented, per-purpose opt-ins (CV book, intro emails); never raw lists. |
| "Exclusive in our category?" | Fear of competitors | Narrow exclusivity (a track, a lounge), priced from the expected contribution it blocks. |
| "We pay after the event." | Standard terms | 50 % at signing is standard for events; prepayment earns benefits that cost you little (earlier logo, first choice of slots). |

Do not open with a discount. Discounts teach the market your list price is fiction and make renewal harder. Change scope, terms or benefits first.`,
        },
        { kind: "scenario", scenario: "sh03-s1" },
        {
          kind: "checklist",
          title: "Before you send a sponsorship proposal",
          items: [
            "Motive, metric and internal owner written down from the call",
            "Sponsor's alternative cost per outcome captured, or explicitly unknown",
            "Budget pocket, amount and approval date known",
            "Paper process mapped: vendor registration documents, PO, payment terms, who signs",
            "Proposal tailored to the motive (hiring or platform version), with a decision date",
            "CRM updated with stage, exit evidence and next step",
          ],
        },
        {
          kind: "callout",
          tone: "ai",
          title: "Using AI in sponsor outreach",
          md: md`Use AI to research accounts, draft tailored proposals and summarise calls; a human writes and sends every message, and nothing is sent to a list automatically. Founder Core's lesson on outreach with AI sets out what to automate and what never to.`,
        },
        { kind: "xref", to: "fc10-l02", note: "Outreach, CRM and lead generation with AI: what to automate and what never to." },
        {
          kind: "question",
          question: {
            id: "sh03-l04-p2",
            type: "short",
            prompt: md`Produce the sponsorship sales plan for Suhail's first two hackathons in 2027 (illustrative numbers). Include: (1) a target list of 12 to 15 accounts described by category (no claims of existing relationships), each with motive, budget owner title, trigger and warm path; (2) the funnel arithmetic for your target, cold and with introductions; (3) a first-call script with the four things you must learn; (4) answers to the three objections you expect most; (5) the timing plan against Gulf budget cycles, given that the plan starts in January 2027; (6) the forecast method and the gate that decides whether the first event goes ahead.`,
            rubric: [
              "Target list segmented by motive with budget owner, trigger and warm path; no invented relationships or traction",
              "Funnel arithmetic correct, showing the effect of warm introductions",
              "Call script captures motive and metric, alternative cost, budget pocket and timing, and paper process",
              "Objection answers are structural (other budget pocket, founding-partner terms, consented data) rather than discounts",
              "Timing reflects that early-2027 sponsors come mostly from already-set budgets and non-marketing pockets, and books next-year planning meetings",
              "Forecast uses weighted pipeline with mapped stages, and the go/no-go gate uses signed revenue",
            ],
            modelAnswer: md`**Target (illustrative):** USD 26,000 per hackathon, 8 sponsors each, first event April 2027, second June 2027.

**Target list (categories, no contact yet):** 3 regional software scale-ups hiring engineers (motive hiring; owner head of talent; trigger open engineering roles; path Suhail's employer network); 2 AI API or model providers with Arabic models (adoption; developer relations; trigger new model release; path a builder who uses their API); 2 cloud providers' regional teams (adoption, credits; startup programme lead; trigger regional data centre or region launch; path an accelerator); 2 banks' innovation labs (open innovation, hiring; lab director; trigger digital programme; path a fintech founder); 2 VC funds (deal flow; platform partner; trigger new fund; path investor members); 2 universities (venue in kind, mandate; dean of computing; path faculty); 2 developer-tool startups (Community tier; founders).

**Funnel:** cold $\lceil 8/(0.20\times0.35)\rceil = 115$ accounts per event; with introductions $\lceil 8/(0.55\times0.35)\rceil = 42$. Plan: 50 accounts for both events, 70 % introduced.

**Call script:** (1) Who judges success and on what number? (2) What does a hire or a qualified developer lead cost you today? (3) Which budget would this come from, how much is left this year, and when is next year's set? (4) What does vendor registration and a PO take, and who signs?

**Objections:** no budget: talent or developer-relations budget now, Season in next year's plan, meeting booked for September 2027. No track record: founding-partner rate at 20 % below list, audience floors with make-good credit, refund if cancelled. Attendee list: consented CV book and opt-in intros only.

**Timing:** January to March 2027 sell hackathons from non-marketing pockets and leftover 2027 lines; from July 2027 present 2028 Season packages before budgets are drafted; avoid Ramadan for decision meetings.

**Forecast and gate:** weekly weighted pipeline with stages mapped as in this lesson; venue deposit for event 1 paid only when signed sponsorship reaches 70 % of USD 26,000 (USD 18,200) six weeks out; otherwise shrink to an evening sprint.`,
            explanation: md`A sales plan is credible when the target list, funnel, timing and gate are consistent with each other.`,
            concepts: ["sh03.sponsor-target-list", "sh03.sponsor-funnel", "sh03.budget-cycle", "sh03.sponsor-objections", "sh03.sponsor-forecast"],
            difficulty: 3,
          },
        },
        { kind: "xref", to: "fc04-l05", note: "Pipeline management and forecasting: weighted pipeline, coverage, velocity and forecast categories." },
      ],
    },
  ],
  scenarios: [
    {
      id: "sh03-s1",
      title: "The procurement wall six weeks out",
      dayInLife: true,
      context: md`Illustrative. A regional software company's head of talent has agreed verbally to a USD 10,000 Gold hiring package for Suhail's first hackathon, six weeks away. Today her procurement team emails: "New vendors must register (commercial registration, tax certificate, bank letter), we need three quotes for any spend above our threshold, and payment is net 60 after a purchase order. Registration takes about eight weeks."`,
      start: "a",
      concepts: ["sh03.budget-cycle", "sh03.sponsor-objections"],
      nodes: {
        a: {
          md: md`The event is in six weeks; registration takes eight. Prizes have been announced assuming this Gold. What do you do first?`,
          choices: [
            { text: "Ask the head of talent to push procurement to skip registration because it is a small amount.", next: "b", score: 3, feedback: "Asking your champion to bend her own company's rules spends her credibility and rarely works." },
            { text: "Call the head of talent: ask whether procurement has a fast track for event sponsorships or a sole-source justification, and send every registration document today.", next: "c", score: 9, feedback: "Uses the champion correctly (she knows the internal routes) and removes every delay on your side." },
            { text: "Drop the deal and look for another Gold sponsor.", next: "d", score: 2, feedback: "Six weeks out, a new Gold sponsor is less likely than solving this one." },
          ],
        },
        b: {
          md: md`She tries; procurement says no exceptions. Two weeks have gone.`,
          choices: [
            { text: "Ask her whether the hiring budget could pay through an existing vendor (for example an agency already registered) or whether a sole-source justification is possible.", next: "c", score: 7, feedback: "Recovers, but two weeks were lost." },
            { text: "Announce that the prize is cancelled.", score: 2, feedback: "Premature and damaging to builders' trust." },
          ],
        },
        c: {
          md: md`Procurement accepts a sole-source justification ("unique access to a selected builder audience") and registration starts, but the purchase order will only issue after the event, with payment net 60: cash arrives about three months from now. The Gold prize is USD 4,000, due to winners within two weeks of the event.`,
          choices: [
            { text: "Keep the benefits as agreed, fund the prize temporarily from contingency, record a receivable, and tell the Finance Lead the cash gap and date.", score: 9, feedback: "The P&L is unchanged and the cash gap is explicit, owned and dated. Confirm in writing what the sponsor gets, and that payment does not depend on outcomes you cannot control." },
            { text: "Tell the sponsor its benefits start only when payment arrives.", score: 3, feedback: "Technically defensible, but it punishes the champion for her procurement and ends the relationship." },
            { text: "Pay the winners late, after the sponsor pays.", score: 1, feedback: "Breaks a promise to builders, Suhail's core users, to manage a sponsor's paper process." },
          ],
        },
        d: {
          md: md`You find no replacement in two weeks. The original sponsor is still willing.`,
          choices: [
            { text: "Go back and work the procurement route with the head of talent.", next: "c", score: 5, feedback: "Right answer, late." },
            { text: "Cut the prize to USD 1,000.", score: 3, feedback: "Saves cash but breaks an announcement; avoidable if prizes are announced only when signed." },
          ],
        },
      },
    },
  ],
  quiz: [
    {
      id: "sh03-l04-q1",
      type: "numeric",
      prompt: md`You need 12 sponsors. 30 % of contacted accounts take a call and 25 % of calls sign. How many accounts must you contact?`,
      answer: 160,
      tolerance: { abs: 0.5 },
      unit: "accounts",
      explanation: md`$\lceil 12/(0.30\times0.25)\rceil = \lceil 160\rceil = 160$ accounts.`,
      concepts: ["sh03.sponsor-funnel"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh03-l04-q2",
      type: "mcq",
      prompt: "It is February 2027 and a sponsor's marketing budget for 2027 is fully allocated. Which is the best next step?",
      options: [
        "Offer a 40 % discount so it fits in leftover money",
        "Ask whether a talent or developer-relations budget fits a smaller package now, and book a meeting before the 2028 budget is drafted",
        "Wait until December and try again",
        "Ask the sponsor to reallocate money from another event",
      ],
      answer: 1,
      explanation: md`Different budget pockets have different owners and cycles; next year's plan is decided months before it starts.`,
      concepts: ["sh03.budget-cycle"],
      difficulty: 1,
    },
    {
      id: "sh03-l04-q3",
      type: "order",
      prompt: "Order the sponsorship stages, from first to last.",
      items: ["First call held, motive and metric described", "Budget pocket and amount confirmed", "Tailored proposal under review with a decision date", "Verbal yes on tier and price", "Contract and purchase order"],
      explanation: md`Each stage is defined by a buyer action you can evidence.`,
      concepts: ["sh03.sponsor-forecast"],
      difficulty: 1,
    },
    {
      id: "sh03-l04-q4",
      type: "multi",
      prompt: "Which are good answers to \"you have no track record\" from a first-time sponsor? (Select all that apply.)",
      options: [
        "Founding-partner pricing with stated audience ranges",
        "A make-good credit if audience floors are missed",
        "An invented attendance figure from a previous event",
        "A full refund if the event is cancelled",
        "Showing the selection process and applications received so far",
      ],
      answer: [0, 1, 3, 4],
      explanation: md`Reduce the champion's risk with terms and evidence you actually have. Inventing history is fabrication and ends the relationship when discovered.`,
      concepts: ["sh03.sponsor-objections"],
      difficulty: 1,
    },
    {
      id: "sh03-l04-q5",
      type: "numeric",
      prompt: md`Weighted sponsorship pipeline is USD 150k and the blended win rate of the open pipeline is 30 %. The event needs USD 200k. Roughly how much unweighted pipeline (USD k) do you need in total?`,
      answer: 666.7,
      tolerance: { abs: 1 },
      unit: "USD k",
      explanation: md`Required unweighted $\approx 200/0.30 = 666.7$ USD k. You have $150/0.30 = 500$k, so about 167k more at the same mix.`,
      concepts: ["sh03.sponsor-forecast"],
      difficulty: 2,
    },
    {
      id: "sh03-l04-q6",
      type: "decision",
      prompt: md`A prospect's marketing manager says: "Send me the deck and I'll get back to you."`,
      options: [
        { text: "Send the deck immediately and follow up in two weeks.", score: 0.2, feedback: "Most decks sent this way are never opened; you learned nothing about motive, budget or process." },
        { text: "Agree, ask who would judge success and on which number, and what budget it would come from; tailor the deck and book a 20-minute review before hanging up.", score: 1, feedback: "Turns an exit into discovery and a dated next step." },
        { text: "Offer a discount to get a decision now.", score: 0, feedback: "Discounting before discovery signals your price is not real." },
      ],
      explanation: md`A booked next step with a tailored proposal beats a generic deck.`,
      concepts: ["sh03.sponsor-objections"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh03-l04-f1", front: "Accounts to contact", back: md`$A = \lceil (T/\bar P)/(c_{call}\,w)\rceil$; warm introductions raise $c_{call}$ the most.`, concepts: ["sh03.sponsor-funnel"] },
    { id: "sh03-l04-f2", front: "Four things to learn on a first sponsor call", back: "Motive and metric, alternative cost per outcome, budget pocket and timing, paper process.", concepts: ["sh03.sponsor-target-list"] },
    { id: "sh03-l04-f3", front: "When next year's sponsor budgets are set", back: "Typically drafted in Q3 and approved in Q4 for calendar-year companies; confirm each sponsor's cycle.", concepts: ["sh03.budget-cycle"] },
    { id: "sh03-l04-f4", front: "Procurement gate", back: "Vendor registration, PO before invoice, payment often 30 to 90 days: map it before you count the money.", concepts: ["sh03.budget-cycle"] },
    { id: "sh03-l04-f5", front: "Forecast vs gate", back: "Weighted pipeline tells you whether to sell harder; signed revenue decides whether to pay a deposit.", concepts: ["sh03.sponsor-forecast"] },
    { id: "sh03-l04-f6", front: "First answer to an objection", back: "Change scope, terms or benefits; discount last.", concepts: ["sh03.sponsor-objections"] },
  ],
};

export default lesson;
