import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh10-l05",
  title: "The post-event report, the next sponsorship round and the community funnel",
  summary:
    "Close the loop: report actuals against the metric tree and the budget, write sponsor reports that show cost per outcome honestly, run the retrospective, and turn the event into the next sponsorship round and into members who stay. The community funnel shows why an event is a reach pulse that decays unless retention does the work.",
  minutes: 75,
  objectives: [
    "You can report actuals against the pre-set metric tree and the budget, with variances explained.",
    "You can write a sponsor report that states delivered outcomes and cost per outcome, including misses.",
    "You can plan the next sponsorship round from renewal evidence, with prices tied to delivered outcomes.",
    "You can model how an event feeds the community with the funnel model and its steady state, and show why retention matters more than the spike.",
    "You can run a retrospective that changes the plan for event two.",
  ],
  concepts: [
    {
      id: "sh10.post-event-report",
      name: "Post-event report",
      description:
        "Actuals against the metric tree fixed before the event, the budget against actual spend with contingency drawn, sponsor outcomes and cost per outcome, incidents and lessons. Delivered within 14 days, with misses stated as plainly as hits.",
      competency: "sh-partnerships",
    },
    {
      id: "sh10.sponsor-renewal",
      name: "Sponsor renewal",
      description:
        "The next sponsorship round starts at the debrief: each sponsor gets its outcomes and cost per outcome, a renewal offer tied to what it measured, and a date. Renewals priced on evidence are cheaper to close than new sponsors.",
      competency: "sh-partnerships",
      related: ["sh10.post-event-report"],
    },
    {
      id: "sh10.community-flywheel",
      name: "Event-community flywheel",
      description:
        "Events create reach and members; members who stay (retention) and bring others (referral) make the next event's funnel cheaper and the next sponsor's audience larger. The funnel's steady state is reach x conversion / (1 - retention - referral).",
      competency: "sh-community",
    },
    {
      id: "sh10.pulse-decay",
      name: "Event pulse decay",
      description:
        "Members gained at one event decay by the factor (retention + referral) each month unless something keeps them active. A one-off spike without a monthly rhythm (newsletter, meetups, contributor roles) mostly disappears within months.",
      competency: "sh-community",
      related: ["sh10.community-flywheel"],
    },
    {
      id: "sh10.retro-variance",
      name: "Retrospective and variance",
      description:
        "Compare plan and actual for every budget line and metric, explain each variance with a cause, and turn the causes into changes to the plan for the next event, owned and dated.",
      competency: "sh-org",
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Reporting against the plan and the funnel model",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`The first event's real product is the evidence it creates: the sponsor report is the prospectus for the second event, the newsletter opt-ins are Suhail's first members, and the retrospective is what makes event two cheaper to run. Most first-time organisers stop when the venue closes. The sponsorship round for event two, and whether Suhail becomes a community or stays a one-off, is decided in the two weeks after.`,
        },
        {
          kind: "md",
          md: md`### The report has three readers

| Reader | What they need | Section |
|---|---|---|
| Each sponsor | What it got, against what it was promised, and what that cost per outcome | Sponsor report (one per sponsor) |
| The team | What happened against plan and budget, why, and what changes | Internal report and retrospective |
| The community and future sponsors | What was built and who built it, with consent | Public wrap-up (newsletter, blog) |

**Rules.** Use the metric tree fixed in lesson 1, unchanged. Report misses with their cause. Separate measured numbers from estimates. Quote builders only from survey answers they agreed to publish. Never share personal data beyond what builders opted into.

### Budget variance

For each line, variance $= $ actual $-$ plan. Overruns drawn from contingency are logged against the named risk. The financial result is the planned surplus plus the unused contingency, minus any overrun beyond it.`,
        },
        { kind: "equation", formula: "sh10-budget-variance" },
        {
          kind: "md",
          md: md`### From event to community: the funnel model

Between events, Suhail grows through reach (newsletter shares, posts, partner channels, events), conversion to members, retention of active members and referrals. The model behind the widget is linear:

$$A_t = r A_{t-1} + R c + k A_{t-1}$$

so it converges, if $r + k < 1$, to a steady state set by reach and by how leaky the community is.`,
        },
        { kind: "equation", formula: "sh10-community-steady-state" },
        { kind: "equation", formula: "sh10-pulse-decay" },
        {
          kind: "widget",
          widget: "community-funnel",
          caption: "Try reach 8,000 a month, conversion 2 %, retention 85 %, referral 3 %: steady state about 1,333 active members. Then raise retention to 90 % and watch it rise to about 2,286. Retention moves the ceiling far more than another event's spike.",
        },
        { kind: "sources", refs: ["sh10-r6", "sh10-r7"] },
      ],
    },
    {
      layer: "applied",
      title: "Worked post-event report and next round",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Actuals against the plan (a hypothetical outcome)",
          given: md`**Hypothetical and illustrative**: suppose Riyadh 01 ran like this. Nothing here has happened.

| Metric | Target | Actual |
|---|---|---|
| On-site builders | 120 | 112 (185 accepted, show-up 60.5 %) |
| Submission rate | at least 80 % | 24 of 29 teams = 82.8 % |
| Builder NPS | at least 40 | 46 (58 % response) |
| Teams using headline tool | at least 60 % | 16 of 29 = 55.2 % |
| Opted-in profiles | at least 70 % | 86 of 112 = 76.8 % |
| Newsletter opt-ins | at least 300 | 340 |
| Contributors | at least 10 | 12 |
| Sponsor reports | within 14 days | day 13 |

Budget actuals (USD): venue 2,000; catering 5,800 (ordered for 120 plus 400 for extra mentors and crew); prizes 6,000; production 6,300 (300 for mobile hotspots in the wifi outage); marketing 900; fulfilment 2,200. Revenue 26,000 (all nine sponsors paid).`,
          steps: [
            { md: md`Actual spend $= 2{,}000 + 5{,}800 + 6{,}000 + 6{,}300 + 900 + 2{,}200 = 23{,}200$. Plan base was 22,600, so $600$ was drawn from the 2,260 contingency (catering +400 against the headcount risk, production +300 against the wifi risk, marketing -100).` },
            { md: md`Surplus $= 26{,}000 - 23{,}200 = 2{,}800$, which equals the planned 1,140 plus unused contingency 1,660. Cost per builder $= 23{,}200 / 112 = 207$ USD, on plan because fewer builders came and per-head costs were ordered for 120.` },
            { md: md`**Headline sponsor's cost per outcome.** About 62 builders in the 16 teams that used its tool: $6{,}000 / 62 \approx 97$ USD per activated builder, against a target of about 83. Missed, and the report says why: the wifi outage cost 45 minutes on day 2 and its workshop clashed with team formation.` },
            { md: md`**Partner (employer) cost per outcome.** $3{,}500 / 86 \approx 41$ USD per opted-in profile, beating the target of about 42 slightly.` },
          ],
          result: md`The report shows a USD 2,800 surplus, six of eight metrics met, one sponsor metric missed with a cause, and an 8-builder shortfall from a 60.5 % show-up rate that becomes the planning assumption for event two.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Will the event's members still be there in six months?",
          given: md`Use the funnel model. 340 newsletter opt-ins arrive as one pulse. Retention 0.85 a month, referral 0.03. Separately, steady monthly reach of 8,000 at 2 % conversion.`,
          steps: [
            {
              md: md`Decay factor per month: $r + k = 0.85 + 0.03 = 0.88$.`,
            },
            {
              md: md`Members from the pulse still active after 6 months: $340 \times 0.88^6 = 340 \times 0.4644 \approx 158$.`,
              hidden: true,
              check: { prompt: "Active members left from the pulse after 6 months", answer: 158, unit: "members", tolerance: { abs: 2 } },
            },
            {
              md: md`Steady state from monthly reach: $A^* = 8{,}000 \times 0.02 / (1 - 0.85 - 0.03) = 160 / 0.12 \approx 1{,}333$.`,
              hidden: true,
              check: { prompt: "Steady-state active members", answer: 1333, unit: "members", tolerance: { abs: 5 } },
            },
            {
              md: md`With retention raised to 0.90 (monthly meetup, contributor roles, a newsletter people read): $A^* = 160 / 0.07 \approx 2{,}286$, a 71 % higher ceiling with no extra reach.`,
              hidden: true,
              check: { prompt: "Steady state at 90 % retention", answer: 2286, unit: "members", tolerance: { abs: 5 } },
            },
          ],
          result: md`The event's spike halves within about six months; the monthly rhythm that lifts retention is worth more than the spike. Next sponsors buy access to the active community, so retention is also a sponsorship metric.`,
        },
        {
          kind: "worked",
          mode: "worked",
          title: "Plan the next sponsorship round from the evidence",
          given: md`**Illustrative.** Event two (a second city in late 2027) budgets USD 30,000 of sponsor revenue. From the debriefs: the headline and two Partners and two Supporters want to renew; renewing sponsors get evidence-based prices 15 % higher.`,
          steps: [
            { md: md`Renewal revenue: Headline $6{,}000 \times 1.15 = 6{,}900$; Partners $2 \times 3{,}500 \times 1.15 = 8{,}050$; Supporters $2 \times 1{,}500 \times 1.15 = 3{,}450$. Total $18{,}400$.` },
            { md: md`New revenue needed: $30{,}000 - 18{,}400 = 11{,}600$, for example 2 Partners and 3 Supporters at the new prices ($8{,}050 + 5{,}175 = 13{,}225$), giving room for one to slip.` },
            { md: md`Target list for the new slots: at the same conversions as before ($0.15$ end to end), 5 new sponsors need $\lceil 5 / 0.15 \rceil = 34$ names. Renewals are worth roughly 7 cold names each in effort saved.` },
            { md: md`**The headline renewal** must answer the missed adoption target: offer a workshop slot before team formation and a guaranteed backup connection, and set the same metric again.` },
          ],
          result: md`About 61 % of event two's sponsor revenue can come from renewals if the reports land well, which turns the second round from cold outreach into five conversations and 34 new names.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Writing the reports and running the loop",
      blocks: [
        {
          kind: "md",
          md: md`### How it is done

- **Owners.** Partnerships writes the sponsor reports (data from the Head of Engineering's forms and Editorial's survey); Finance Lead closes the books and the variance table; Events runs the retrospective; you sign off and make the renewal calls with Partnerships.
- **Sponsor report structure.** One page per sponsor: what it was promised (from its contract), what it got (numbers with definitions), cost per outcome, what went wrong and the fix, consented photos and survey quotes, and the renewal offer with a date.
- **Retrospective.** Within a week, 60 minutes, all leads: what we planned, what happened, why, what we change, who owns the change. Output: an updated assumptions sheet (show-up 0.60, catering crew allowance, workshop timing) for event two.
- **Community follow-through.** Week 1 after: thank-you and wrap-up issue of the newsletter; week 2: invite contributors to a volunteer call; monthly: a meetup or online demo night so the pulse does not decay to nothing. Contributors are the pipeline for future leads.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How post-event reports go wrong",
          md: md`**Changing the metrics afterwards** to show only what looked good. **Hiding a miss**: the sponsor already knows; hiding it costs the renewal. **Vanity substitution**: impressions instead of the adoption metric the sponsor paid for. **Sharing data beyond consent** in the report. **Reporting late**: after three weeks the sponsor's budget conversation has moved on. **No renewal ask**: the report is the best sales document you will ever have; end it with an offer and a date.`,
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Use AI where it helps, and check it",
          md: md`Drafting each sponsor's report from the metric table and its contract is a good AI task. Check every number against the source export, and never let a model invent a builder quote or round up a missed target.`,
        },
        { kind: "xref", to: "sh03-l05", note: "Delivering and renewing sponsors: reports, make-goods, renewal economics and multi-event deals." },
        { kind: "xref", to: "sh02-l05", note: "Judging, demos and after: winners, sponsor reports and follow-up." },
        { kind: "xref", to: "sh05-l05", note: "From content to community: the funnel the post-event newsletter feeds." },
        { kind: "xref", to: "sh01-l03", note: "Rituals, contribution ladders and retention: the actions that slow pulse decay." },
        { kind: "xref", to: "sh08-l04", note: "Recruiting and onboarding volunteers: where the event's contributor sign-ups go next." },
        { kind: "xref", to: "fc07-l05", note: "Data rooms and investor updates in Founder Core: the sponsor report follows the same honest-update discipline as an investor update." },
        { kind: "xref", to: "fc05-l03", note: "Developer marketing, open source and community in Founder Core: the general playbook behind the community follow-through." },
        {
          kind: "question",
          question: {
            id: "sh10-l05-p1",
            type: "short",
            prompt: md`**Capstone artifact 6: post-event report and next round.** Using a hypothetical outcome for your event (label it as such), produce: (1) the actuals-vs-targets table from your metric tree with causes for each miss; (2) the budget variance table, contingency drawn and the financial result; (3) one sponsor report summary with cost per outcome and a renewal offer; (4) the community plan: funnel assumptions, pulse decay over 6 months, steady state, and the two actions that lift retention; (5) the next sponsorship round: renewal revenue, new revenue needed and the target list size.`,
            rubric: [
              "Actuals are reported against the metric tree fixed before the event, unchanged, with each miss given a cause; the outcome is clearly labelled hypothetical.",
              "Budget variance is computed line by line, contingency drawn is tied to named risks, and the result equals planned surplus plus unused contingency (or explains the difference).",
              "Sponsor report states promised vs delivered outcomes with cost per outcome, admits misses with fixes, respects consent, and ends with a dated renewal offer.",
              "Funnel arithmetic is correct (pulse decay with r + k, steady state Rc / (1 - r - k)) and retention actions are concrete.",
              "Next round computes renewal revenue, the new revenue gap and the target list size from conversion rates, consistent with the earlier artifacts.",
            ],
            modelAnswer: md`**Hypothetical outcome for Riyadh 01 (illustrative).**

**(1) Metrics:** builders 112 vs 120 (show-up 60.5 % vs 65 % assumed: no reconfirmation SMS, only email); submissions 82.8 % (met); NPS 46 (met); headline tool use 55.2 % vs 60 % (wifi outage and workshop clashing with team formation); profiles 76.8 % (met); opt-ins 340 (met); contributors 12 (met); reports on day 13 (met).

**(2) Budget (USD):** catering +400 (crew allowance missing, headcount risk), production +300 (hotspots, wifi risk), marketing -100, other lines on plan. Spend 23,200 vs base 22,600: 600 drawn of 2,260 contingency. Surplus 26,000 - 23,200 = 2,800 = 1,140 planned + 1,660 unused.

**(3) Headline report:** promised a track, workshop, judging seat, profiles, talk, two features; delivered all; 16 of 29 teams used the tool (about 62 builders), about USD 97 per activated builder vs about 83 targeted; cause and fix stated. Renewal: headline for event two at USD 6,900 with the workshop before team formation and a guaranteed backup line; decision by a named date.

**(4) Community:** 340 opt-ins x 0.88^6 = about 158 active after six months; reach 8,000 a month at 2 % gives a steady state of about 1,333 at 85 % retention and about 2,286 at 90 %. Actions: a monthly demo night run by contributors and a newsletter section featuring builders' projects.

**(5) Next round:** renewals 6,900 + 8,050 + 3,450 = 18,400; budget 30,000; gap 11,600; 5 new sponsors at 0.15 conversion need 34 names.`,
            explanation: md`The report closes the loop: the same metric tree, the same budget lines and the same tiers, now with actuals, become the evidence that sells event two and shapes the community plan.`,
            concepts: ["sh10.post-event-report", "sh10.sponsor-renewal", "sh10.community-flywheel", "sh10.pulse-decay", "sh10.retro-variance"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to the Editorial lead why a monthly demo night matters more for Suhail than making the next hackathon twice as big.",
          keyPoints: [
            "An event adds a pulse of members that decays by (retention + referral) each month",
            "Steady state is reach x conversion / (1 - retention - referral), so retention moves the ceiling",
            "Raising retention from 85 % to 90 % lifts the ceiling by about 70 % with no extra reach",
            "Sponsors of the next event buy access to the active community, so retention is also revenue",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh10-l05-q1",
      type: "numeric",
      prompt: md`Reach 10,000 a month, conversion 1.5 %, retention 0.80, referral 0.05. What is the steady-state number of active members?`,
      answer: 1000,
      unit: "members",
      tolerance: { abs: 2 },
      explanation: md`$A^* = 10{,}000 \times 0.015 / (1 - 0.80 - 0.05) = 150 / 0.15 = 1{,}000$.`,
      concepts: ["sh10.community-flywheel"],
      difficulty: 1,
    },
    {
      id: "sh10-l05-q2",
      type: "numeric",
      prompt: md`An event adds 500 members. Retention 0.80, referral 0.05. How many are still active after 4 months (round to the nearest member)?`,
      answer: 261,
      unit: "members",
      tolerance: { abs: 2 },
      explanation: md`$500 \times 0.85^4 = 500 \times 0.522 = 261$.`,
      concepts: ["sh10.pulse-decay"],
      difficulty: 1,
    },
    {
      id: "sh10-l05-q3",
      type: "decision",
      prompt: md`The headline sponsor's adoption metric came in at 55 % against a 60 % target. How do you handle it in its report?`,
      options: [
        { text: "Replace it with total social impressions, which beat expectations", score: 0, feedback: "Swapping the metric the sponsor paid for is spin; it costs the renewal and your credibility." },
        { text: "Report 55 % against 60 %, give the causes (wifi outage, workshop timing), the cost per activated builder, the fixes for event two, and a renewal offer that sets the same metric again", score: 1, feedback: "Honest, specific and forward-looking. Sponsors renew with organisers who report misses plainly and fix them." },
        { text: "Round it to 60 % since it was close", score: 0, feedback: "A misstated number the sponsor can check against its own sign-up data." },
        { text: "Leave the metric out of the report", score: 0.2, feedback: "The sponsor will ask for it; an omission looks worse than a miss." },
      ],
      explanation: md`The metric tree was fixed before the event so the report cannot be bent afterwards. A miss with a cause and a fix is a renewal argument; spin is not.`,
      concepts: ["sh10.post-event-report", "sh10.sponsor-renewal"],
      difficulty: 1,
    },
    {
      id: "sh10-l05-q4",
      type: "numeric",
      prompt: md`Planned surplus USD 1,500, contingency USD 2,500, actual overrun drawn from contingency USD 900. What is the actual surplus in USD?`,
      answer: 3100,
      unit: "USD",
      tolerance: { abs: 1 },
      explanation: md`Unused contingency $= 2{,}500 - 900 = 1{,}600$; surplus $= 1{,}500 + 1{,}600 = 3{,}100$ USD.`,
      concepts: ["sh10.retro-variance"],
      difficulty: 1,
    },
    {
      id: "sh10-l05-q5",
      type: "multi",
      prompt: md`Which belong in a sponsor report? Select all that apply.`,
      options: [
        "Promised deliverables from the contract and what was delivered",
        "Outcomes with definitions and cost per outcome",
        "The full attendee contact list",
        "Misses with causes and fixes",
        "A renewal offer with a decision date",
      ],
      answer: [0, 1, 3, 4],
      explanation: md`Only data builders opted into may be shared, and only for the stated purpose. Everything else on the list is what makes a report a renewal document.`,
      concepts: ["sh10.post-event-report", "sh10.sponsor-renewal"],
      difficulty: 1,
    },
    {
      id: "sh10-l05-q6",
      type: "order",
      prompt: md`Put the post-event steps in order.`,
      items: [
        "Close the books and compute variances",
        "Run the retrospective with all leads",
        "Send sponsor reports with renewal offers",
        "Hold renewal calls",
        "Update the assumptions sheet and open the next sponsorship round",
      ],
      explanation: md`Numbers first, then causes, then the sponsor-facing report built on both, then the conversations, then the plan for the next round that uses the new assumptions.`,
      concepts: ["sh10.retro-variance", "sh10.sponsor-renewal"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh10-l05-f1", front: "Community steady state", back: md`$A^* = Rc / (1 - r - k)$; 8,000 x 2 % at 85 % retention and 3 % referral gives about 1,333.`, concepts: ["sh10.community-flywheel"] },
    { id: "sh10-l05-f2", front: "Pulse decay", back: md`$A_t = P (r + k)^t$; 340 opt-ins at 0.88 per month leave about 158 after 6 months.`, concepts: ["sh10.pulse-decay"] },
    { id: "sh10-l05-f3", front: "Three readers of the post-event report", back: "Each sponsor (outcomes and cost per outcome), the team (plan vs actual and changes), the community and future sponsors (what was built, with consent).", concepts: ["sh10.post-event-report"] },
    { id: "sh10-l05-f4", front: "Financial result after the event", back: "Planned surplus plus unused contingency, minus any overrun beyond contingency; hypothetical Riyadh 01: 1,140 + 1,660 = USD 2,800.", concepts: ["sh10.retro-variance"] },
    { id: "sh10-l05-f5", front: "Renewal round arithmetic (illustrative)", back: "Renewals at +15 %: 6,900 + 8,050 + 3,450 = USD 18,400 of a 30,000 budget; 5 new sponsors need 34 names.", concepts: ["sh10.sponsor-renewal"] },
    { id: "sh10-l05-f6", front: "Report rule", back: "Same metric tree as before the event, misses stated with cause and fix, measured vs estimated separated, data only within consent, delivered within 14 days.", concepts: ["sh10.post-event-report"] },
  ],
};

export default lesson;
