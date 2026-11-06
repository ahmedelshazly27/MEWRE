import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc09-l04",
  title: "Board and investor management: composition, meetings, decks, advisors and monthly updates",
  summary:
    "What a board legally is and how its composition shifts by stage, how to prepare a board meeting so it produces decisions, how to write the monthly investor update, how to compute runway and the date you must start raising, and how to structure advisors and angels so they help rather than distract.",
  minutes: 70,
  objectives: [
    "Explain what a board does, who sits on it at pre-seed, seed and Series A, and where investor control really sits",
    "Prepare a board meeting: deck structure, pre-calls, approvals, minutes",
    "Compute runway and the latest date to start a fundraise, and show how a hire changes it",
    "Write a monthly investor update that builds trust and produces help",
    "Structure advisor agreements with vesting and specific deliverables",
  ],
  concepts: [
    { id: "fc09.board-composition", name: "Board composition by stage", description: "Founders only at pre-seed, often founders plus one investor at seed, and a balance of common, preferred and independent seats from Series A; odd numbers avoid deadlock.", competency: "fc-ops" },
    { id: "fc09.board-meeting", name: "Board meeting preparation", description: "A deck sent days ahead, pre-calls with each director, a meeting spent on one or two strategic questions and formal approvals, minutes and follow-ups within days.", competency: "fc-ops", related: ["fc09.board-composition", "fc09.written-culture"] },
    { id: "fc09.investor-update", name: "Monthly investor update", description: "A short, regular written report: headline, metrics versus plan, cash and runway, highlights, lowlights, and specific asks; bad news included and early.", competency: "fc-ops", related: ["fc09.input-output-metrics"] },
    { id: "fc09.runway", name: "Runway and raise trigger", description: "Cash divided by net monthly burn; you must start raising when remaining runway equals the expected fundraising time plus a safety buffer.", competency: "fc-ops", related: ["fc09.investor-update"] },
    { id: "fc09.advisors", name: "Advisor and angel management", description: "Advisors get small, vesting grants tied to specific help; angels get regular updates and targeted asks; neither should get board seats or control by default.", competency: "fc-ops", related: ["fc09.vesting-cliff"] },
    { id: "fc09.fiduciary-duty", name: "Directors' duties", description: "Directors owe duties to the company (care and loyalty, or the equivalent under Dutch or Swiss law), not to whichever shareholder appointed them.", competency: "fc-ops", related: ["fc09.board-composition"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What the board is for and how to run it",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Afterwave has applied to YC W27 and is weighing Zurich; whatever happens, a seed round will bring investors with information rights and, at some point, board seats. Mizan and Suhail will have angels, partners and advisors who expect to hear from you. With three ventures, investor communication can either eat your month or run on a fixed, written rhythm that builds trust and turns investors into a source of introductions and hires. The difference is preparation and regularity.`,
        },
        {
          kind: "md",
          md: md`### What a board legally is

The board of directors is the body that, in law, oversees the company: it appoints and can remove the CEO, approves budgets, option grants, financings and sales of the company, and its members owe duties to the **company** (in common-law terms, care and loyalty), not to the shareholder who appointed them. The structure depends on the legal form:

- **US (Delaware) C-corporation**, the form YC companies use: a single board of directors elected by shareholders under the charter and a voting agreement (the NVCA model documents are the reference).
- **Dutch BV**: a **management board** (bestuur) runs the company; a **supervisory board** (raad van commissarissen) is optional for a small BV. Investors in Dutch rounds often get control through **reserved matters** (consent rights) in the shareholders' agreement rather than through seats.
- **Swiss AG**: a mandatory board of directors (Verwaltungsrat); a GmbH is run by managing directors.

The practical point is the same everywhere: control sits in the combination of **seats** and **consent rights**. Read both.

### Composition by stage

| Stage | Typical board | Notes |
|---|---|---|
| Pre-seed | 1 to 3 founders | No investor seats. Accelerators such as YC do not take board seats. |
| Seed | 2 founders + 0 or 1 investor | Many SAFE and seed rounds carry no seat; a priced seed lead may ask for one. |
| Series A | 2 founders + 1 or 2 investors + 0 or 1 independent (3 or 5 seats) | The common pattern is founders retain a majority or parity, with an independent as the swing seat. |
| Series B and later | 5 to 7 seats | Investor seats grow; independents chosen jointly. |

Keep the number **odd** to avoid deadlock, and resist giving seats to angels or advisors: an observer right or a monthly update gives them information without control.

### The board meeting cycle

A good board meeting is mostly preparation. Its job is to get the directors' judgement on one or two hard questions and to make formal decisions, not to hear a status report they could have read.`,
        },
        {
          kind: "flow",
          title: "Board meeting cycle",
          steps: [
            { label: "T minus 14 days", detail: "Pick the 1 or 2 strategic questions; draft the deck from the monthly metrics" },
            { label: "T minus 7 days", detail: "Send the deck and any resolutions to approve (option grants, budget)" },
            { label: "T minus 5 to 2 days", detail: "Pre-call each director: surface objections and bad news before the meeting" },
            { label: "Meeting (2 to 3 h)", detail: "10 min on metrics, most of the time on the strategic questions, then approvals; closed session without management" },
            { label: "T plus 2 days", detail: "Minutes, resolutions signed, follow-ups with owners and dates" },
          ],
          caption: "No surprises in the meeting: anything a director would be upset to hear for the first time in the room should reach them in a pre-call.",
        },
        {
          kind: "md",
          md: md`**Board deck structure (10 to 15 slides).** (1) Summary: three headlines and what we need from you. (2) Metrics versus plan. (3) Cash, burn, runway. (4 to 8) Deep dive on the strategic questions, with options and a recommendation. (9) Team and hiring. (10) Approvals. Everything else goes in an appendix.

### Runway and when to start raising

Runway is cash divided by net burn. The date that matters is when you must **start** raising, because a seed or Series A process takes months, and raising with less than about six months of cash weakens your negotiating position.`,
        },
        { kind: "equation", formula: "fc09-runway" },
        { kind: "equation", formula: "fc09-raise-trigger" },
        {
          kind: "md",
          md: md`### The monthly investor update

Send it every month, on the same day, whether the month was good or bad. A widely used structure:

1. **Headline** in one line (the most important thing that happened).
2. **Metrics** versus plan (the same 5 to 8 every month, so trends are visible).
3. **Cash and runway.**
4. **Highlights** (3 bullets) and **lowlights** (3 bullets, honestly).
5. **Asks**: 2 or 3 specific requests ("introductions to test leads at humanoid robotics companies in Germany", "a reference for a senior solutions engineer candidate").
6. **Thanks** to whoever helped last month.

Bad news early is the single most valuable habit: investors forgive misses, not surprises, and an early lowlight often comes back as help.

### Advisors and angels

Advisors are useful when the help is specific (a regulatory expert for the EU Machinery Regulation; a former utility executive for Gulf tendering). Give them a small grant that vests monthly over about two years, usually with a short cliff, and write down what you expect. The Founder Institute's FAST agreement offers a standard grid by stage and engagement level:

| Company stage | Standard advisor | Strategic advisor | Expert advisor |
|---|---|---|---|
| Idea | 0.25% | 0.50% | 1.00% |
| Startup | 0.20% | 0.40% | 0.80% |
| Growth | 0.15% | 0.30% | 0.60% |`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Check the FAST grid and the board norms against current sources",
          md: md`The FAST percentages above are as recalled from the Founder Institute template; check the current version before using it. Board composition patterns are market practice for US and European venture-backed companies, not legal requirements; your term sheet, charter and shareholders' agreement decide.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Afterwave's runway and its first update",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "When must Afterwave start its next raise, and what does one hire do to that date?",
          given: md`Illustrative numbers only. Cash EUR 600,000; net burn EUR 45,000 per month. A raise is expected to take 6 months from first meeting to cash, and you want a 3-month buffer. You are considering hiring the solutions engineer from Lesson 1 at a loaded EUR 8,667 per month.`,
          steps: [
            { md: md`**Runway today:** $R = 600{,}000/45{,}000 = 13.3$ months.` },
            { md: md`**Raise trigger:** $t_{\text{start}} = 13.3 - (6 + 3) = 4.3$ months from now.` },
            { md: md`**With the hire:** burn $= 45{,}000 + 8{,}667 = 53{,}667$ EUR/month; runway $= 600{,}000/53{,}667 = 11.2$ months.` },
            { md: md`**New trigger:** $11.2 - 9 = 2.2$ months. The hire brings the start of fundraising forward by about two months.` },
            { md: md`**What goes to the board:** "The hire costs 2.1 months of runway. It is worth it if it lets us run two pilots in parallel, which is the evidence the next round needs. Recommendation: hire, and start investor conversations in month 2."` },
          ],
          result: md`Runway falls from 13.3 to 11.2 months with the hire and the raise must start in about 2 months instead of 4 (illustrative). Every hiring decision is also a fundraising-timing decision; show both in the same slide.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "How much has the advisor earned?",
          given: md`Illustrative. An advisor on EU Machinery Regulation conformity receives 0.25%, vesting monthly over 24 months with a 3-month cliff.`,
          steps: [
            { md: md`**Monthly vesting rate:** $0.25\%/24 = 0.0104\%$ per month.` },
            { md: md`**After 9 months:** $0.25\% \times 9/24$.` },
            { md: md`$= 0.094\%$ vested.`, hidden: true, check: { prompt: "Vested after 9 months (%)", answer: 0.094, unit: "%", tolerance: { abs: 0.001 } } },
            { md: md`**If the advisor stops after 2 months:** before the 3-month cliff, so the vested amount is $0\%$.`, hidden: true, check: { prompt: "Vested if the advisor leaves after 2 months (%)", answer: 0, unit: "%", tolerance: { abs: 0.0001 } } },
          ],
          result: md`Monthly vesting with a short cliff means an advisor who drifts away keeps only what they earned. Pair it with written expectations (for example two hours a month and three introductions a quarter) and review at the cliff.`,
        },
        {
          kind: "question",
          question: {
            id: "fc09-l04-p1",
            type: "numeric",
            prompt: md`Mizan has KWD 90,000 in the bank and net burn of KWD 7,500 per month. A raise is expected to take 5 months and you want a 3-month buffer. In how many months must the raise start? (Illustrative numbers.)`,
            answer: 4,
            tolerance: { abs: 0.05 },
            unit: "months",
            explanation: md`Runway $= 90{,}000/7{,}500 = 12$ months; $t_{\text{start}} = 12 - (5 + 3) = 4$ months. If a pilot payment is expected, do not count it in cash until it is invoiced and paid; public-sector payment cycles can be slow.`,
            concepts: ["fc09.runway"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Investor relations in practice",
      blocks: [
        {
          kind: "md",
          md: md`### Who receives what

| Audience | What they get | Frequency |
|---|---|---|
| Board directors | Board deck, pre-calls, resolutions, closed session | Quarterly at seed; every 6 to 8 weeks from Series A |
| All investors (SAFE holders, angels) | Monthly update | Monthly, same day |
| Advisors | Monthly update plus a targeted ask | Monthly; a call when there is a specific question |
| Prospective investors | A lighter version of the update | Monthly or quarterly, to build a track record before you raise |

### Tools and documents

A template in your document tool for the update (copy last month's, update the numbers), a metrics sheet that feeds both the update and the board deck, a board folder with minutes, resolutions and the cap table, and an email list. Keep a log of asks and who helped: it tells you which investors to go back to.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Surprises in the board meeting.** A director who learns bad news in front of others stops trusting your reporting.
- **Updates only when things go well.** Silence is read as bad news, usually worse than the truth.
- **Status-report board meetings.** Two hours of slides that could have been read leave no time for the decision you needed help with.
- **Seats for angels and advisors.** Easy to give, very hard to take back; use observer rights or updates instead.
- **Advisors with equity and no deliverables.** Vest monthly, write down expectations, review at the cliff.
- **Ignoring consent rights.** In Dutch or Swiss structures, reserved matters in the shareholders' agreement can give an investor a veto without any board seat.`,
        },
        { kind: "sources", refs: ["fc09-r13", "fc09-r14", "fc09-r15", "fc09-r16", "fc09-r17"] },
        {
          kind: "checklist",
          title: "Board pack checklist",
          items: [
            "One-page summary: three headlines and what you need from the board",
            "Metrics versus plan, same definitions as last time",
            "Cash, burn, runway and the raise trigger date",
            "Strategic question(s) with options, analysis and a recommendation",
            "Resolutions to approve (option grants, budget, bank mandates) attached",
            "Sent 7 days ahead; pre-calls booked with each director",
            "Minutes and follow-up list issued within 2 days",
          ],
        },
        {
          kind: "ask",
          title: "Questions before you accept an investor onto your board",
          items: [
            "How often do you expect to meet, and what do you want to see between meetings?",
            "Tell me about a portfolio company that struggled. What did you do? (Then ask that founder.)",
            "What decisions would you expect to have a veto on, through seats or consent rights?",
            "Which introductions can you realistically make for us in the next six months?",
          ],
        },
        { kind: "scenario", scenario: "fc09-s2" },
        {
          kind: "question",
          question: {
            id: "fc09-l04-p2",
            type: "short",
            prompt: md`Write a **monthly investor update** for Afterwave for a month in early 2027. Use clearly labelled illustrative numbers and do not invent real customers, revenue or funding. Include: headline, 5 to 8 metrics versus plan, cash and runway with the raise trigger date, three highlights, three lowlights (at least one real problem), and two or three specific asks. Keep it under 400 words.`,
            rubric: [
              "Follows the structure: headline, metrics versus plan, cash and runway, highlights, lowlights, asks",
              "Metrics are consistent definitions (mostly input metrics plus cash) and are compared with a plan",
              "Runway and raise trigger are computed correctly from the stated cash and burn",
              "Lowlights include at least one genuine problem stated plainly, with what is being done about it",
              "Asks are specific enough that an investor can act on them this week",
              "All numbers are labelled illustrative and no real customers or traction are invented",
            ],
            modelAnswer: md`**Afterwave update, January 2027 (all numbers illustrative)**

**Headline:** second pilot installed; security review time is now our main constraint.

**Metrics (actual / plan):**
- Qualified discovery calls with hardware test leads: 9 / 10
- Pilots installed: 2 / 2
- Synchronised bench hours captured per week: 120 / 150
- Open security reviews: 3, oldest 9 weeks (plan: none older than 6)
- Paid pilots signed: 1 / 2
- Net burn: EUR 47,000 / 45,000

**Cash and runway:** EUR 560,000 cash; runway $560/47 = 11.9$ months. With a 6-month raise and a 3-month buffer, we start investor conversations in about 3 months (April 2027).

**Highlights**
1. Second pilot installed in 4 working days, down from 10 for the first.
2. Ripple's first change-impact report used by a pilot customer to choose which tests to rerun after a firmware change.
3. Playbook for on-prem installation written; a second engineer could now install without the founders.

**Lowlights**
1. A paid pilot slipped to next month: the customer's procurement needed a new supplier registration. Lesson: start supplier onboarding at pilot kickoff, not at contract.
2. Security reviews are taking 9 weeks against a plan of 6. We are preparing a standard security pack (architecture, data flows, Enclave isolation) to send before the first call.
3. Burn 4% over plan from travel to customer sites.

**Asks**
1. Introductions to heads of test or validation at humanoid or drive-unit manufacturers in Germany or the Netherlands.
2. Anyone who has built a security pack for on-prem enterprise software: 30 minutes to review ours.
3. Candidates for a senior solutions engineer (test systems, DAQ, customer-facing).

**Thanks** to the angel who introduced us to a robotics test lead last month.`,
            explanation: md`Investors read dozens of updates. The ones they act on are regular, short, consistent in their metrics, honest in the lowlights and specific in the asks. The runway line with a raise date tells them when you will be back and lets them prepare.`,
            concepts: ["fc09.investor-update", "fc09.runway", "fc09.input-output-metrics"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a first-time founder why you send bad news to investors early, and how that changes what the board does for you.",
          keyPoints: [
            "Investors forgive misses but not surprises; trust is built on consistent, honest reporting",
            "Early bad news gives the board time to help (introductions, advice, bridge financing) before options close",
            "Pre-calls keep surprises out of the meeting so the meeting can be spent on decisions",
            "Regular updates with the same metrics make trends visible and make you credible when you raise",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "fc09-l04-q1",
      type: "numeric",
      prompt: md`Cash EUR 480,000, net burn EUR 40,000/month, expected raise time 6 months, buffer 3 months. In how many months must the raise start?`,
      answer: 3,
      tolerance: { abs: 0.05 },
      unit: "months",
      explanation: md`Runway $= 480/40 = 12$ months; $12 - (6 + 3) = 3$ months.`,
      concepts: ["fc09.runway"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc09-l04-q2",
      type: "mcq",
      prompt: "A director appointed by your seed lead owes their legal duties primarily to:",
      options: ["The seed lead's fund", "The company (and through it, its shareholders as a whole)", "The founders", "Whoever holds the most preferred shares"],
      answer: 1,
      explanation: md`Directors owe duties to the company, whoever appointed them. In practice, investor-directors also have duties to their funds, which is one reason independents matter as a company matures.`,
      concepts: ["fc09.fiduciary-duty"],
      difficulty: 1,
    },
    {
      id: "fc09-l04-q3",
      type: "order",
      prompt: "Order the board meeting cycle.",
      items: [
        "Choose the strategic questions and draft the deck",
        "Send the deck and resolutions",
        "Pre-call each director",
        "Hold the meeting and closed session",
        "Issue minutes, resolutions and follow-ups",
      ],
      explanation: md`Pre-calls come after the deck is sent so directors have read it, and before the meeting so there are no surprises.`,
      concepts: ["fc09.board-meeting"],
      difficulty: 1,
    },
    {
      id: "fc09-l04-q4",
      type: "multi",
      prompt: "Which belong in a monthly investor update? (Select all that apply.)",
      options: [
        "The same core metrics every month, versus plan",
        "Cash and runway",
        "Lowlights, stated plainly",
        "Specific asks",
        "Only the good news, to keep momentum for the next round",
      ],
      answer: [0, 1, 2, 3],
      explanation: md`Consistency, cash, honesty and specific asks are what make updates valuable. Hiding bad news destroys trust when it comes out, which it does.`,
      concepts: ["fc09.investor-update"],
      difficulty: 1,
    },
    {
      id: "fc09-l04-q5",
      type: "decision",
      prompt: md`A well-known angel offers EUR 50,000 into Mizan's pre-seed on condition of a board seat. What do you do?`,
      options: [
        { text: "Accept: the money and the name are worth it.", score: 0.2, feedback: "A seat is hard to take back and changes control at the very first round; it will also shape what the next lead investor expects." },
        { text: "Offer information rights and the monthly update, possibly an advisor role with a small vesting grant, but no seat; walk away if the seat is non-negotiable.", score: 1, feedback: "Gives the angel what they need (information, involvement) without giving control at pre-seed." },
        { text: "Accept but plan to remove them later.", score: 0, feedback: "Removing a director is a fight you will lose time and trust on." },
      ],
      explanation: md`Board seats at pre-seed are rarely justified for small cheques. Information rights, updates and a defined advisory role meet most legitimate angel needs.`,
      concepts: ["fc09.board-composition", "fc09.advisors"],
      difficulty: 2,
    },
    {
      id: "fc09-l04-q6",
      type: "numeric",
      prompt: md`An advisor has 0.40% vesting monthly over 24 months with a 3-month cliff. How much has vested after 12 months? (percent, 2 decimals)`,
      answer: 0.2,
      tolerance: { abs: 0.002 },
      unit: "%",
      explanation: md`$0.40\% \times 12/24 = 0.20\%$. The cliff only matters if they leave before month 3.`,
      concepts: ["fc09.advisors", "fc09.vesting-cliff"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc09-l04-f1", front: "Runway", back: md`$R = \text{cash}/\text{net monthly burn}$`, concepts: ["fc09.runway"] },
    { id: "fc09-l04-f2", front: "When to start raising", back: md`When runway equals raise time plus buffer: $t_{\text{start}} = R - (t_{\text{raise}} + t_{\text{buffer}})$`, concepts: ["fc09.runway"] },
    { id: "fc09-l04-f3", front: "Typical Series A board", back: "2 founders + 1 or 2 investors + 0 or 1 independent; odd number.", concepts: ["fc09.board-composition"] },
    { id: "fc09-l04-f4", front: "Six parts of a monthly update", back: "Headline, metrics vs plan, cash and runway, highlights, lowlights, asks (plus thanks).", concepts: ["fc09.investor-update"] },
    { id: "fc09-l04-f5", front: "Rule for board meetings", back: "No surprises: bad news goes in pre-calls, the meeting goes on decisions.", concepts: ["fc09.board-meeting"] },
    { id: "fc09-l04-f6", front: "Where investor control sits in a Dutch BV", back: "Often in reserved matters (consent rights) in the shareholders' agreement, not only in board seats.", concepts: ["fc09.board-composition"] },
    { id: "fc09-l04-f7", front: "Advisor grant structure", back: "Small grant, monthly vesting over about 2 years, short cliff, written expectations.", concepts: ["fc09.advisors"] },
  ],
  scenarios: [
    {
      id: "fc09-s2",
      title: "The lead investor asks for a seat and a veto",
      dayInLife: true,
      context: md`Hypothetical. Afterwave is closing a priced seed round. The lead investor's term sheet is otherwise reasonable, but the partner adds two requests on a call: a board seat, and a veto on any spending above EUR 50,000 that is not in the approved budget.`,
      start: "a",
      concepts: ["fc09.board-composition", "fc09.fiduciary-duty", "fc09.board-meeting"],
      nodes: {
        a: {
          md: md`The partner says: "This is standard at seed. We need to protect our investment." How do you respond first?`,
          choices: [
            { text: "Agree to both on the call to keep the round moving.", score: 2, feedback: "Speed matters, but you just gave away operating control without understanding its scope.", next: "c" },
            { text: "Separate the two requests: \"A seat for the lead is reasonable; let's talk about the board as a whole. On the spending veto, help me understand what risk you are protecting against.\"", score: 9, feedback: "A lead's seat at a priced seed is common. An operating-level veto is not, and asking for the underlying concern opens a better solution.", next: "b" },
            { text: "Refuse both and threaten to go to another investor.", score: 3, feedback: "You may lose a good lead over a normal request (the seat).", next: "b" },
          ],
        },
        b: {
          md: md`The partner explains: they worry about a large hardware purchase (an instrumented test platform) being made without discussion. The board would be two founders and the investor.`,
          choices: [
            { text: "Propose: 3-person board (2 founders, 1 investor); no spending veto, but board approval of the annual budget and of single commitments above EUR 150,000 or outside the budget, listed as a reserved matter with a clear threshold.", score: 10, feedback: "Addresses the real concern (a big irreversible purchase) at a sensible threshold, keeps day-to-day control with management and puts it in writing." },
            { text: "Accept the EUR 50,000 veto but ask for a 5-person board with two independents.", score: 4, feedback: "A 5-person board at seed is heavy, and the low veto threshold still puts the investor in your operating decisions." },
          ],
        },
        c: {
          md: md`Three months later you need to pay for a security audit (EUR 60,000) required by an enterprise pilot customer. It was not in the budget. The investor is travelling and replies in eight days.`,
          choices: [
            { text: "Use the next board meeting to renegotiate the threshold upward and add a fast written-consent process; meanwhile, get written consent by email.", score: 5, feedback: "Repairable, but the round had the moment to get this right, and the pilot timeline paid for it." },
          ],
        },
      },
    },
  ],
};

export default lesson;
