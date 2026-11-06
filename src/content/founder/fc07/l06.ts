import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc07-l06",
  title: "Outreach and Running a Round",
  summary:
    "A round is a sales process with a deadline. Build a tiered investor list, get warm introductions, run the funnel maths so the list is big enough, compress meetings into a few weeks so interest overlaps, create real competition, and close: lead first, followers second, documents and money last.",
  minutes: 75,
  objectives: [
    "Explain why warm introductions convert an order of magnitude better than cold outreach, and how to get them",
    "Compute how many investors the pipeline needs from stage conversion rates",
    "Plan a round timeline that compresses first meetings so term sheets arrive together",
    "Handle a lead, followers and an exploding term sheet without losing the round",
    "Describe the closing steps for a SAFE round and for a Dutch BV priced round",
  ],
  concepts: [
    { id: "fc07.warm-intro", name: "Warm introductions", description: "An introduction from someone the investor trusts (portfolio founder, co-investor, operator) carries a signal and converts to meetings far more often than cold outreach; done with a forwardable email and double opt-in.", competency: "fc-fundraising", related: ["fc07.investor-pipeline"] },
    { id: "fc07.investor-pipeline", name: "Investor pipeline and funnel maths", description: "Treating the round as a funnel: target list, intro, first meeting, partner meeting, term sheet, close; required list size equals target term sheets divided by the product of stage conversion rates.", competency: "fc-fundraising", related: ["fc07.why-vcs-say-no"] },
    { id: "fc07.round-momentum", name: "Timeline compression and competition", description: "Batching first meetings into two to three weeks so investor interest overlaps; investors move when others move, so parallel processes create competition and better terms.", competency: "fc-fundraising", related: ["fc07.investor-pipeline"] },
    { id: "fc07.closing", name: "Lead, followers and closing", description: "A lead sets price and terms; followers fill the round once a lead commits; closing runs through confirmatory diligence, documents, signing, funds and (for a BV) notarial share issuance.", competency: "fc-fundraising", related: ["fc07.term-sheet"] },
  ],
  scenarios: [
    {
      id: "fc07-s2",
      title: "The exploding term sheet",
      dayInLife: true,
      context: md`Week 3 of Afterwave's seed process. A European seed fund sends a term sheet: EUR 2.5m at EUR 11m pre-money, 10 % pool in the pre-money, standard 1x non-participating preference, and a 72-hour expiry. Two other funds are in partner meetings this week; one has hinted at a term sheet "in about ten days".`,
      start: "a",
      concepts: ["fc07.round-momentum", "fc07.closing", "fc07.term-sheet"],
      nodes: {
        a: {
          md: md`What is your first move?`,
          choices: [
            { text: "Sign within 72 hours; a bird in the hand.", score: 3, feedback: "Possibly fine terms, but you give up the competition you spent three weeks creating.", next: "e" },
            { text: "Thank them, say you take it seriously, and ask for an extension to a date that fits your process (for example 10 days), explaining honestly that you are in partner meetings with others this week.", score: 9, feedback: "Honest and firm. Most funds extend for a credible founder; expiries are often negotiating tools.", next: "b" },
            { text: "Tell the other two funds you have a term sheet at a EUR 15m pre to push them.", score: 0, feedback: "Lying about terms is discovered quickly in a small market and can end the round.", next: "d" },
          ],
        },
        b: {
          md: md`The fund agrees to 7 days. You tell the other two funds you have a term sheet and a deadline (without inventing terms). One accelerates; the other drops out.`,
          choices: [
            { text: "Use the week to get the accelerating fund to a decision; compare terms on effective pre-money, pool and control, not headline price.", score: 10, feedback: "The comparison that matters is what founders keep and who governs.", next: "c" },
            { text: "Ask for a further extension to wait for the fund that dropped out.", score: 2, feedback: "You risk the term sheet in hand for a fund that has already signalled no.", next: "e" },
          ],
        },
        c: {
          md: md`The second fund offers EUR 3.0m at EUR 12m pre with a 15 % pool in the pre-money and a board seat. The first fund offers to raise to EUR 3.0m at EUR 11m pre with a 10 % pool.`,
          choices: [
            { text: "Compute effective pre-money: offer 1 is 11 - 0.10 x 14 = 9.6m; offer 2 is 12 - 0.15 x 15 = 9.75m. Nearly equal; choose on partner fit and board terms, and ask offer 2 to size the pool to the hiring plan.", score: 10, feedback: "Correct maths and the right tie-breakers." },
            { text: "Take offer 2 because EUR 12m is higher than EUR 11m.", score: 4, feedback: "Headline price misleads when pool sizes differ." },
          ],
        },
        d: {
          md: md`One of the funds asks the first fund's partner, whom they co-invest with, about the deal. Your claimed terms do not match.`,
          choices: [
            { text: "Apologise, correct the record and continue.", score: 2, feedback: "Damage limitation. You have lost credibility with both funds." },
          ],
        },
        e: {
          md: md`You sign quickly. The round closes at EUR 2.5m; a month later the fund that hinted at a term sheet tells you it would have offered more.`,
          choices: [
            { text: "Note the lesson: negotiate expiries, keep processes parallel, and invite that fund to your update list for the A.", score: 5, feedback: "Not a disaster: you raised. But compressed, parallel processes exist precisely to avoid this." },
          ],
        },
      },
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "The round as a funnel with a deadline",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You are based between the Netherlands and Kuwait, raising for a company that could sit in Amsterdam, Zurich or San Francisco, with no fund partners in your existing network by default. That makes process your edge: a large enough list, warm paths built in advance through Tesla, Signify and robotics contacts, and meetings compressed into a short window. Founders who drip meetings over six months raise less, later, on worse terms.`,
        },
        {
          kind: "md",
          md: md`### Warm beats cold, and why

An introduction from someone the investor trusts carries information: "this person, whose judgement I respect, thinks this is worth 30 minutes". Cold email carries none. In practice, warm introductions convert to first meetings at several times (often ten times or more) the rate of cold outreach.

Best sources of warm intros, in order of signal:
1. **Founders in the investor's portfolio** who know your work.
2. **Co-investors** (angels or funds who invest alongside them).
3. **Operators the investor uses for diligence** (for Afterwave: senior test and validation leaders).
4. **Accelerator partners** (YC's network if accepted).

Mechanics: ask the introducer first; send them a **forwardable email** (5 to 7 lines: what Afterwave does, the insight, one proof point, the ask); they forward with **double opt-in** (the investor agrees first).

Cold can work when it is specific: a short note to a partner who has written about hardware testing or physical AI, referencing their thesis, with one hard proof point.

### The funnel`,
        },
        { kind: "equation", formula: "fc07-funnel" },
        {
          kind: "md",
          md: md`Illustrative rates for a seed round: warm intro to first meeting 60 %, cold 5 %; first meeting to partner meeting 30 %; partner meeting to term sheet 25 %. For two term sheets (enough for competition):

$$N_{\text{warm}} = \frac{2}{0.6\times 0.3\times 0.25} = 44.4, \qquad N_{\text{cold}} = \frac{2}{0.05\times 0.3\times 0.25} = 533.$$

You need a list of about 45 well-matched investors with warm paths, or hundreds of cold ones. Measure your own rates after the first ten meetings and resize the list.

### Compress the timeline

Investors are influenced by other investors. If first meetings are spread over three months, the early ones have cooled by the time late ones get interested. Batch:`,
        },
        {
          kind: "flow",
          title: "A compressed seed process",
          steps: [
            { label: "Weeks -6 to -1: prepare", detail: "Deck, data room, metrics, list of 40 to 60 tiered investors, warm paths mapped, forwardable emails sent to introducers" },
            { label: "Week 0: launch", detail: "All intros land within a few days; first meetings scheduled into weeks 1 to 3" },
            { label: "Weeks 1 to 3: first meetings", detail: "Two to four a day; follow-ups within 24 hours; update the pipeline daily" },
            { label: "Weeks 3 to 5: partner meetings", detail: "Diligence calls, customer references; a lead emerges" },
            { label: "Weeks 4 to 6: term sheets", detail: "Compare on effective terms; sign one; no-shop starts" },
            { label: "Weeks 6 to 10: close", detail: "Confirmatory diligence, documents, notary for a BV, wires; followers fill the round" },
          ],
          caption: "Roughly 10 weeks from launch to cash for a well-prepared seed; SAFE rounds can close faster and on a rolling basis.",
        },
        {
          kind: "md",
          md: md`### Lead and followers

A **lead** sets price and terms, writes the largest cheque (often 50 % or more of the round) and usually takes the most governance rights. Most other investors will not commit until a lead exists, so spend early effort on likely leads (funds whose cheque size and stage fit) and treat angels and smaller funds as **followers** once terms are set. In SAFE rounds there may be no formal lead, but the first credible cheque at a cap plays the same role.

### Creating real competition

Competition comes from parallel processes, not bluffs. Tell investors the truth about timing ("we expect to decide within three weeks"), share that you have a term sheet when you do (without inventing terms) and never misstate another investor's offer: partners talk to each other.`,
        },
        { kind: "widget", widget: "pipeline-forecast", props: { target: 3000000, acv: 250000 }, caption: "Read 'deals' as investors and 'ACV' as average cheque: stage probabilities and cycle length give expected commitments against the round target." },
      ],
    },
    {
      layer: "applied",
      title: "Sizing Afterwave's investor list",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "How big must the list be for a EUR 3m seed?",
          given: md`Illustrative plan: a lead for about EUR 1.75m and followers for EUR 1.25m at an average EUR 125k. Conversion rates as above (warm 60 %, cold 5 %, partner meeting 30 %, term sheet 25 %). Followers convert from first meeting to commitment at 40 % once a lead is set. Afterwave can map warm paths to about 35 suitable lead-capable funds.`,
          steps: [
            { md: md`**Term sheets from warm leads:** $35\times 0.6\times 0.3\times 0.25 = 35\times 0.045 = 1.58$ expected term sheets. Short of the two needed for competition.` },
            { md: md`**Add targeted cold outreach:** 150 funds at $0.05\times 0.3\times 0.25 = 0.00375$ each adds $150\times 0.00375 = 0.56$. Total expected: $1.58 + 0.56 = 2.14$ term sheets.` },
            { md: md`**Followers:** $1.25\text{m}/125\text{k} = 10$ commitments; at 40 % that is $10/0.4 = 25$ follower meetings once the lead is in.` },
            { md: md`**Schedule:** about $35\times 0.6 + 150\times 0.05 = 21 + 7.5 \approx 29$ first meetings with lead-capable funds in weeks 1 to 3: about two per working day. Feasible, if you clear your calendar.` },
          ],
          result: md`Plan for about **35 warm and 150 targeted cold** lead-capable funds plus **25 follower meetings**. If your measured warm conversion after ten meetings is below 40 %, the deck or the targeting is the problem, not the list size.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your own rates",
          given: md`Illustrative: after 10 meetings you measure intro to meeting 50 %, meeting to partner meeting 30 %, partner meeting to term sheet 20 %.`,
          steps: [
            { md: md`Combined rate $= 0.5\times 0.3\times 0.2 = 0.03$.` },
            { md: md`Warm contacts for one term sheet $= 1/0.03$ = **33.3** (round up to 34).`, hidden: true, check: { prompt: "Contacts for one term sheet", answer: 33.3, tolerance: { abs: 0.5 } } },
            { md: md`Expected term sheets from 60 warm contacts $= 60\times 0.03$ = **1.8**.`, hidden: true, check: { prompt: "Expected term sheets from 60 contacts", answer: 1.8, tolerance: { abs: 0.05 } } },
          ],
          result: md`Two term sheets would need about 67 warm contacts at these rates: expand the list early, not in week 5.`,
        },
        {
          kind: "question",
          question: {
            id: "fc07-l06-p1",
            type: "numeric",
            prompt: md`With conversion rates of 60 %, 30 % and 25 % (intro to meeting, meeting to partner meeting, partner meeting to term sheet), how many warm contacts are needed for three term sheets?`,
            answer: 66.7,
            tolerance: { abs: 0.5 },
            explanation: md`$N_0 = 3/(0.6\times 0.3\times 0.25) = 3/0.045 = 66.7$, so about 67 warm contacts.`,
            concepts: ["fc07.investor-pipeline"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running the process day to day",
      blocks: [
        {
          kind: "md",
          md: md`### The pipeline sheet

One row per investor: firm, partner, fund size and vintage, cheque range, lead or follow, sector fit, warm path (who), stage, last contact, next step and date, notes on objections. Update it daily during the process. Review it with your cofounders twice a week.

### First meetings

- Open with the one-line claim and the insight; demo early.
- End every meeting with: "What would you need to see to move to a partner meeting, and what is your timeline?"
- Follow up within 24 hours with the deck, answers to open questions, and the next step.

### Closing mechanics

- **SAFE or convertible round:** sign the SAFE (or Dutch convertible loan agreement), investor wires, update the cap table. Can close investor by investor.
- **Priced round in a Dutch BV:** term sheet, confirmatory diligence, investment agreement and shareholders' agreement, amendment of the articles if share classes change (notarial deed), shareholder resolution, **notarial deed of issue** for the new shares, registration in the shareholder register. Book the notary early.
- **Delaware parent (YC path):** stock purchase agreement, investors' rights, voting and ROFR/co-sale agreements (NVCA-style), board consent; no notary.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Dripping the process:** one meeting a week for months; nobody feels urgency.
- **Pitching the best-fit lead first with an untested deck:** do a few practice meetings with lower-priority investors, but not so many that the market hears you have been "out" for months.
- **No lead strategy:** twenty "we'd follow" answers add up to zero.
- **Bluffing about other offers.**
- **Losing focus on the business:** split roles; one founder runs the raise, the others keep pilots moving so the metrics improve during the process.`,
        },
        {
          kind: "ask",
          title: "Questions to close every investor meeting with",
          items: [
            "What would you need to see to move to a partner meeting?",
            "What does your process look like from here, and how long does it usually take?",
            "Do you lead at this stage, and what cheque size would you consider?",
            "Who else should we be talking to?",
          ],
        },
        { kind: "scenario", scenario: "fc07-s2" },
        {
          kind: "question",
          question: {
            id: "fc07-l06-p2",
            type: "short",
            prompt: md`Produce Afterwave's **seed round process plan**: (1) the tiered target list structure (how many investors per tier and what makes a fund tier A), (2) a forwardable intro email (max 7 lines), (3) funnel maths showing the list is big enough for two term sheets, and (4) a week-by-week plan from preparation to close, with who on the team does what.`,
            rubric: [
              "Tiering criteria based on fund fit (stage, cheque size, sector, lead behaviour, conflicts), not brand",
              "Forwardable email states what Afterwave does, the insight, one verifiable proof point and the ask in seven lines or fewer, without invented traction",
              "Correct funnel calculation for two term sheets, with stated assumptions",
              "Timeline compresses first meetings into two to three weeks and includes preparation and closing steps (including notary or Delaware documents)",
              "Clear role split so the business keeps moving during the raise",
            ],
            modelAnswer: md`**(1) Tiers.** Tier A (15): seed funds of EUR 50 to 150m that lead, cheque EUR 1 to 2.5m, portfolio in industrial software, robotics or hardware tooling, no direct competitor held. Tier B (20): multi-stage funds with seed programmes, or seed funds without hardware experience. Tier C (15): angels and operator syndicates from test, validation and robotics (followers). Plus 100 to 150 targeted cold funds by thesis.

**(2) Forwardable email.**
Subject: Afterwave: test infrastructure for physical AI (seed)
Afterwave helps hardware test teams know what to rerun after a firmware, model or rig change.
Insight: in physical AI, choosing the tests is the bottleneck, and it needs rig signals, actions and versions on one clock.
Lockstep captures; Enclave runs on the customer's servers; Ripple selects reruns with reasons.
Team: two ex-Tesla validation and test engineers plus a GTM founder.
Proof: [real proof point, e.g. first paid pilot on a drive test rig].
Raising EUR 3m seed; would you be open to 30 minutes with [partner]?

**(3) Funnel.** Combined warm rate $0.6\times 0.3\times 0.25 = 0.045$; two term sheets need $2/0.045 = 44$ warm contacts. Tiers A and B give 35, so add 150 cold at 0.00375 each (+0.56) for about 2.1 expected term sheets.

**(4) Timeline.** Weeks -6 to -1: CEO finalises deck, data room and list; Ismail and Yusuf prepare demo and security pack; introducers receive forwardables in week -2. Week 0: all intros land. Weeks 1 to 3: CEO takes two to four meetings a day; one engineer joins partner-level technical sessions. Weeks 3 to 5: partner meetings, customer reference calls. Weeks 4 to 6: term sheets, compare effective pre-money and control terms, sign. Weeks 6 to 10: confirmatory diligence, documents (BV: notary booked in week 4; Delaware: NVCA-style set), followers from tier C, wires. Throughout, Yusuf owns pilot delivery so metrics keep improving.`,
            explanation: md`The plan is graded on whether it turns fundraising into a measured, compressed process: fit-based tiers, a forwardable that works without you, funnel maths that justifies the list size, and a timeline with owners.`,
            concepts: ["fc07.investor-pipeline", "fc07.warm-intro", "fc07.round-momentum", "fc07.closing"],
            difficulty: 2,
          },
        },
        { kind: "sources", refs: ["fc07-r3", "fc07-r1", "fc07-r15"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc07-l06-q1",
      type: "numeric",
      prompt: md`Cold outreach converts to first meetings at 4 %, then 30 % to partner meetings, then 25 % to term sheets. How many cold contacts give one expected term sheet?`,
      answer: 333.3,
      tolerance: { abs: 1 },
      explanation: md`$1/(0.04\times 0.3\times 0.25) = 1/0.003 = 333$. Cold outreach is a volume game; warm is a quality game.`,
      concepts: ["fc07.investor-pipeline"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc07-l06-q2",
      type: "mcq",
      prompt: "Why compress first meetings into two to three weeks?",
      options: [
        "To reduce travel costs",
        "So investor interest overlaps and decisions arrive together, creating competition",
        "Because investors only take meetings in certain weeks",
        "To avoid having to send updates",
      ],
      answer: 1,
      explanation: md`Investors move when other investors move. Overlapping interest produces simultaneous term sheets and better terms.`,
      concepts: ["fc07.round-momentum"],
      difficulty: 1,
    },
    {
      id: "fc07-l06-q3",
      type: "multi",
      prompt: "Which make a warm introduction effective? (Select all that apply.)",
      options: [
        "The introducer is trusted by the investor, ideally a portfolio founder or co-investor",
        "A short forwardable email the introducer can send unchanged",
        "Copying ten investors on one email",
        "Double opt-in: the investor agrees before being connected",
        "Attaching the full data room",
      ],
      answer: [0, 1, 3],
      explanation: md`Signal plus low effort for the introducer plus consent. Mass emails and unsolicited data rooms reduce signal and leak information.`,
      concepts: ["fc07.warm-intro"],
      difficulty: 1,
    },
    {
      id: "fc07-l06-q4",
      type: "order",
      prompt: "Order the steps of a priced seed round in a Dutch BV.",
      items: ["Sign term sheet", "Confirmatory diligence", "Investment and shareholders' agreements signed", "Notarial deed of issue of new shares", "Shareholder register updated"],
      explanation: md`BV share issuance requires a notarial deed; book the notary early so closing does not wait on it.`,
      concepts: ["fc07.closing"],
      difficulty: 2,
    },
    {
      id: "fc07-l06-q5",
      type: "decision",
      prompt: md`Twelve investors say "we'd love to participate once you have a lead", none has offered to lead, and you are in week 4. What do you do?`,
      options: [
        { text: "Refocus on lead-capable funds: expand the tier A list, ask the most engaged follower which leads they co-invest with, and consider whether a SAFE at a set cap from a credible angel can anchor the round.", score: 1, feedback: "The constraint is the lead; act on it directly." },
        { text: "Keep meeting more followers; enough of them will add up.", score: 0.2, feedback: "Followers do not set terms; the round stays stuck." },
        { text: "Lower the valuation in a message to all twelve.", score: 0.3, feedback: "Price may help, but the problem is that nobody has taken ownership of leading." },
      ],
      explanation: md`Rounds need a price-setter. Followers are useful only after someone sets terms.`,
      concepts: ["fc07.closing", "fc07.investor-pipeline"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "fc07-l06-f1", front: "Funnel maths", back: md`$N_0 = N_{\text{TS}}/\prod p_k$; 2 term sheets at 60/30/25 % need about 45 warm contacts.`, concepts: ["fc07.investor-pipeline"] },
    { id: "fc07-l06-f2", front: "Best warm-intro sources", back: "Portfolio founders, co-investors, operators the fund trusts, accelerator partners.", concepts: ["fc07.warm-intro"] },
    { id: "fc07-l06-f3", front: "Forwardable email", back: "5 to 7 lines: what you do, the insight, one proof point, the ask; sent by the introducer after double opt-in.", concepts: ["fc07.warm-intro"] },
    { id: "fc07-l06-f4", front: "Lead vs follower", back: "The lead sets price and terms and writes the biggest cheque; followers commit once terms exist.", concepts: ["fc07.closing"] },
    { id: "fc07-l06-f5", front: "Exploding term sheet", back: "Ask for an extension that fits your process, honestly; most credible funds agree.", concepts: ["fc07.round-momentum"] },
    { id: "fc07-l06-f6", front: "Closing a BV priced round", back: "Agreements, shareholder resolution, notarial deed of issue, shareholder register; book the notary early.", concepts: ["fc07.closing"] },
  ],
};

export default lesson;
