import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc02-l08",
  title: "Working with a technical cofounder who owns the build",
  summary:
    "How the product lead and the engineering lead share a product without stepping on each other: explicit decision rights sorted by impact and reversibility, the economics of technical debt, honest estimation with ranges and three-point estimates, and the weekly and per-cycle rituals that keep both sides informed.",
  minutes: 75,
  objectives: [
    "You can draft a decision-rights charter that says who drives, who approves and who is consulted for each class of product and technical decision.",
    "You can classify decisions by impact and reversibility (one-way versus two-way doors) and match the process to the class.",
    "You can quantify a technical-debt trade-off with principal, interest and break-even time, and decide when to take or repay debt.",
    "You can turn a single-number estimate into a range with a three-point estimate and commit at a sensible confidence level.",
  ],
  concepts: [
    {
      id: "fc02.decision-rights",
      name: "Decision rights",
      description:
        "An explicit agreement on who drives, approves, contributes to and is informed about each class of decision (e.g. DACI). For a non-coding CEO and technical cofounders: the product lead owns what and why, the engineering lead owns how and when it is safe to ship.",
      competency: "fc-product",
      related: ["fc02.prd-vs-design-doc"],
    },
    {
      id: "fc02.reversibility",
      name: "One-way and two-way doors",
      description:
        "Jeff Bezos' distinction (2015 shareholder letter) between irreversible, high-consequence decisions that deserve slow, careful process and reversible ones that should be made quickly by individuals or small groups.",
      competency: "fc-product",
      related: ["fc02.decision-rights"],
    },
    {
      id: "fc02.technical-debt",
      name: "Technical debt",
      description:
        "Ward Cunningham's metaphor: a shortcut that speeds delivery now (the principal) but makes every later change slower (the interest) until it is repaid by rework. Can be deliberate or inadvertent, prudent or reckless (Fowler's quadrant).",
      competency: "fc-product",
    },
    {
      id: "fc02.estimation",
      name: "Estimation under uncertainty",
      description:
        "Estimates are distributions, right-skewed for software. Ask for ranges or three-point estimates, commit externally above the most likely value, and use appetite (a fixed time budget with variable scope) where possible.",
      competency: "fc-product",
      related: ["m08.monte-carlo"],
    },
    {
      id: "fc02.review-rituals",
      name: "Product and engineering review rituals",
      description:
        "A small set of recurring meetings and artefacts (weekly sync, demo, decision log, cycle planning and retro, debt review) that keep product and engineering aligned without status theatre.",
      competency: "fc-product",
      related: ["fc02.decision-rights"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Who decides, what it costs, how long it takes",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`In every one of your ventures, someone else builds the product. At Afterwave that is Ismail and Yusuf, who bring deep test-engineering experience you do not have; at Mizan, Omar. The relationship fails in two predictable ways: you over-reach into the how and lose their respect, or you under-reach, accept every estimate and technical argument, and lose control of the company's priorities. Explicit decision rights, a shared language for technical debt and honest estimates replace both with a working partnership. Cofounder conflict is one of the commonest reasons early startups fail; most of it starts as unclear decision rights.`,
        },
        {
          kind: "md",
          md: md`### Decision rights

Write down who decides what. A common format is **DACI** (used at Atlassian and elsewhere): **D**river (runs the process, writes the proposal), **A**pprover (one person who decides), **C**ontributors (consulted), **I**nformed. One approver per decision class, never a committee.

A starting split for a non-coding CEO with technical cofounders (to be negotiated, not imposed):

| Decision | Driver | Approver | Contributors |
|---|---|---|---|
| Which customer problem to solve next, priorities, roadmap | CEO | CEO | Technical cofounders (feasibility, cost) |
| Requirements, acceptance criteria, non-goals | CEO | CEO | Technical cofounders |
| Architecture, technology choices, code standards | Technical lead | Technical lead | CEO (constraints: cost, security, customer deployment) |
| Estimates and whether a scope fits the appetite | Technical lead | Technical lead | CEO |
| Release readiness (is it safe to ship) | Technical lead | Technical lead | CEO (customer impact) |
| Pilot commitments to customers (scope, dates) | CEO | CEO, after technical lead confirms feasibility | Technical cofounders |
| Hiring engineers | Technical lead | Joint | CEO |
| Large irreversible bets (platform rewrite, hardware platform, on-prem only) | Either | Joint, written memo | All founders |

Two principles: **the person accountable for the outcome approves** (you for customer outcomes, the technical lead for system health), and **you never commit engineering time to a customer without the technical lead's confirmation**.

### One-way and two-way doors

Jeff Bezos' 2015 letter to Amazon shareholders separates **Type 1** decisions (one-way doors: consequential and hard to reverse) from **Type 2** (two-way doors: reversible). Type 1 deserves slow, written, joint decisions; Type 2 should be made fast by whoever owns it. The common failure in growing companies is treating every decision as Type 1.`,
        },
        {
          kind: "matrix",
          title: "Decision process by impact and reversibility",
          xAxis: ["Two-way door (reversible)", "One-way door (irreversible)"],
          yAxis: ["Low impact", "High impact"],
          cells: [
            { label: "Owner decides fast, informs", detail: "E.g. which pilot feature to build first, UI layout, a library choice. Review at the cycle retro." },
            { label: "Joint, written, slow", detail: "E.g. rewrite the capture engine, commit to on-prem only, build the first Afterwave hardware test platform. One-page memo, both sides sign." },
            { label: "Whoever is closest decides", detail: "No meeting. E.g. naming, internal tooling, a test fixture." },
            { label: "Owner decides after consulting", detail: "Rare. E.g. a vendor contract with a long notice period. Ask one person, then decide." },
          ],
          caption: "Match process to the decision. Speed on two-way doors is a competitive advantage; care on one-way doors avoids company-ending mistakes.",
        },
        {
          kind: "md",
          md: md`### Technical debt economics

Ward Cunningham introduced the debt metaphor in 1992: shipping a first version that does not yet reflect your full understanding is like borrowing; it is fine as long as you pay it back by refactoring. Martin Fowler's **technical debt quadrant** classifies debt by two questions: was it **deliberate or inadvertent**, and was it **prudent or reckless**?

| | Deliberate | Inadvertent |
|---|---|---|
| **Prudent** | "We must ship for the pilot now and will deal with the consequences" | "Now we know how we should have designed it" |
| **Reckless** | "We don't have time for design" | "What is layering?" |

Prudent deliberate debt is a legitimate product tool. To decide, put numbers on it:

- **Principal** $S$: effort saved now by the shortcut.
- **Interest** $i$: extra effort per month the shortcut causes = extra time per change times changes per month.
- **Break-even**:`,
        },
        { kind: "equation", formula: "fc02-debt-breakeven" },
        {
          kind: "md",
          md: md`If the code will be replaced or thrown away before $t_{\text{be}}$ (a pilot-only connector, a spike), take the debt. If it sits at the centre of the product, where change frequency will rise, interest grows and the shortcut becomes expensive. Repayment later usually costs more than the original saving, because other code has been built on top.

Your job as product lead is not to judge code quality; it is to **ask for the principal, the interest and the plan**, and to budget repayment time explicitly (many teams reserve 10 to 20% of each cycle, or a cool-down period between cycles as in Shape Up).

### Estimation

Software estimates are uncertain and **right-skewed**: things rarely finish much earlier than expected, often much later. A single number hides this. Ask for three points:`,
        },
        { kind: "equation", formula: "fc02-pert" },
        {
          kind: "md",
          md: md`Use the result in three ways:

1. **Commit externally above the most likely value**, around $E + \sigma$ (roughly the 84th percentile if approximately normal). Customers remember missed dates, not early ones.
2. **Treat a wide range as information**: $P \gg M$ means an unknown; a short spike (2 to 3 days) to shrink it is often the best next step.
3. **Flip the question where you can**: Shape Up's **appetite** fixes the time ("this is worth 6 weeks") and lets scope vary. You decide the appetite; engineering decides what fits.

For many interdependent tasks, Monte Carlo simulation of the whole plan is the rigorous version of the same idea.`,
        },
        { kind: "xref", to: "m08.monte-carlo", note: "Monte Carlo schedule risk analysis (Track 0, m08): how ranged estimates combine into P50 and P80 dates for a whole plan." },
      ],
    },
    {
      layer: "applied",
      title: "Pricing a shortcut and an estimate",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Should Lockstep's DAQ importer take a shortcut? (illustrative)",
          given: md`For a pilot starting in 3 weeks, Yusuf proposes hard-coding the importer for the pilot lab's one DAQ file format instead of building a general plug-in interface. **Illustrative numbers.** Shortcut saves 15 engineer-days now. Each later change touching import (new format, new channel type) costs an extra 0.5 engineer-days because of the hard-coding. Expected changes: 6 per month during the pilot.`,
          steps: [
            { md: md`**Interest.** $i = 0.5 \times 6 = 3$ engineer-days per month.` },
            { md: md`**Break-even.** $t_{\text{be}} = S/i = 15/3 = 5$ months. The pilot lasts about 3 months, so during the pilot the shortcut is cheaper: it saves 15 days and costs about $3 \times 3 = 9$ days of interest, a net gain of 6 days, delivered when they matter most (before kickoff).` },
            { md: md`**After conversion.** If the pilot converts and import becomes core, changes may rise to 12 per month: $i = 6$ days per month and break-even falls to $15/6 = 2.5$ months. Repaying then (building the general interface) might cost 20 days, more than the 15 originally saved, because code now depends on the hard-coded path.` },
            { md: md`**Decision.** Take the debt, deliberately and prudently, and write it down: a repayment item in the backlog, triggered by "pilot converts or a second DAQ format is needed", with the 20-day estimate. Both founders sign off in the decision log.` },
          ],
          result: md`The shortcut is right for the pilot and wrong for the product. The numbers turn a values argument ("clean code" versus "ship fast") into a timing decision with an explicit trigger for repayment.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "From a single estimate to a commitment (illustrative)",
          given: md`You ask Ismail how long the Enclave offline installer will take. He says "about 5 weeks". You ask for three points: optimistic 3 weeks, most likely 5, pessimistic 14 (the pilot lab's IT environment is unknown).`,
          steps: [
            {
              md: md`Expected duration: $E = (3 + 4 \times 5 + 14)/6$.`,
              hidden: true,
              check: { prompt: "Expected duration", answer: 6.17, unit: "weeks", tolerance: { abs: 0.02 } },
            },
            {
              md: md`Standard deviation: $\sigma = (14 - 3)/6$.`,
              hidden: true,
              check: { prompt: "Standard deviation", answer: 1.83, unit: "weeks", tolerance: { abs: 0.02 } },
            },
            {
              md: md`External commitment at about $E + \sigma$.`,
              hidden: true,
              check: { prompt: "Commitment duration", answer: 8, unit: "weeks", tolerance: { abs: 0.05 } },
            },
            { md: md`The 14-week tail comes from one unknown: the lab's IT environment. A 2-day spike (a call with the lab's IT contact and a test install on a machine matching their image) would likely cut $P$ sharply, and with it the commitment.` },
          ],
          result: md`Tell the customer "about 8 weeks, and we will confirm after a short check with your IT team next week", not "5 weeks". Then run the spike.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Rituals and the relationship",
      blocks: [
        {
          kind: "md",
          md: md`### A minimal operating rhythm

| Ritual | Cadence | Length | Output |
|---|---|---|---|
| Product and engineering sync | Weekly | 30 to 45 min | Priorities for the week confirmed; blockers; decisions logged |
| Demo | End of each cycle (or weekly) | 30 min | Working software shown against acceptance criteria; no slides |
| Cycle planning | Every 4 to 6 weeks | 1 to 2 h | What is in now; appetites; what is cut |
| Retrospective | End of each cycle | 45 min | One or two process changes, owned |
| Technical debt review | Monthly | 30 min | Debt list with principal, interest and repayment triggers; budget for next cycle |
| Founder check-in | Monthly | 1 h | How the partnership is working; decision rights revisited; personal load |

Keep artefacts few: the PRD, the design doc, the now-next-later roadmap, the decision log and the debt list. If a meeting does not change one of them, question the meeting.

### Habits of a product lead engineers trust

- **Protect their focus.** Batch questions into the sync; do not interrupt deep work with customer requests that can wait a day.
- **Bring the customer into the room.** Share call recordings and quotes; invite them to discovery calls occasionally. Engineers who hear the customer need fewer specs.
- **Accept "no" on how, and push on why.** If they say a design is unsafe or unmaintainable, believe them and ask what would make it acceptable within the appetite.
- **Never promise dates they have not confirmed.**
- **Learn enough to ask good questions.** You do not need to code, but you should understand the architecture diagram, the deployment model (Enclave on customer servers) and where the debt sits.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Failure patterns",
          md: md`**The CEO as feature dispatcher.** Every customer call produces a new request sent straight to an engineer. Route everything through intake and triage (lesson 5).

**Estimate haggling.** "Can't you do it in 3 weeks instead of 5?" teaches engineers to pad. Negotiate scope against an appetite, never the estimate itself.

**The silent rewrite.** Debt grows unseen until the technical lead announces a rewrite. A monthly debt review with numbers prevents the surprise.

**Unwritten decision rights.** Works until the first real disagreement, then becomes personal. Write the charter while things are going well.`,
        },
        {
          kind: "ask",
          title: "Questions to ask your technical cofounder",
          items: [
            "What are the three biggest items of technical debt, and what does each cost us per month?",
            "What is your optimistic, most likely and pessimistic estimate, and what drives the pessimistic one?",
            "Is this decision a one-way or a two-way door from your side?",
            "What would you cut to fit this into the appetite?",
            "What do you need from me this week to move faster?",
            "Is there anything in how we work together that is costing you time or energy?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc02-l08-p1",
            type: "short",
            prompt: md`Draft a **one-page decision-rights and operating charter for the Afterwave founding team** (you as CEO and GTM lead; Ismail Elmasry and Yusuf Keklik as technical cofounders; propose how build ownership is split between them, labelled as a proposal to discuss). Include: (1) a DACI table for at least seven decision classes, including customer commitments, architecture, release readiness and one-way-door bets; (2) the rule for one-way versus two-way doors; (3) how technical debt is recorded, quantified and budgeted; (4) how estimates are given and turned into customer commitments; (5) the weekly and per-cycle rituals; (6) how a disagreement is escalated and resolved.`,
            rubric: [
              "DACI table with one approver per class: the CEO approves problem, priority and customer commitments; a technical lead approves architecture, estimates and release readiness; one-way-door bets are joint.",
              "Customer commitments require technical confirmation, and the split between the two technical cofounders is presented as a proposal, not as fact.",
              "One-way versus two-way door rule matched to process (fast individual decisions versus written joint decisions).",
              "Technical debt recorded with principal, interest and a repayment trigger, with an explicit budget (share of cycle or cool-down).",
              "Estimates as ranges or three-point estimates, external commitments above the most likely value, and scope negotiated against appetite rather than haggling estimates.",
              "Rituals with cadence and outputs, and a clear escalation path for disagreements (data first, then written memo, then a pre-agreed tie-break).",
            ],
            modelAnswer: md`**Roles (proposal to discuss).** CEO (you): customers, go to market, product priorities, pilots, fundraising. Ismail: technical lead for the product platform and release readiness (Lockstep, Enclave). Yusuf: technical lead for test methodology and data (Ripple, bench data). Titles and the split to be agreed together.

**Decision rights (DACI).**
| Decision | Driver | Approver | Contributors | Informed |
|---|---|---|---|---|
| Next customer problem, roadmap priorities | CEO | CEO | Ismail, Yusuf | All |
| PRD requirements, acceptance criteria, non-goals | CEO | CEO | Ismail, Yusuf | All |
| Pilot scope and dates promised to customers | CEO | CEO after written technical confirmation | Ismail, Yusuf | All |
| Architecture and technology choices | Ismail | Ismail | Yusuf, CEO (constraints) | All |
| Ripple methodology, data model for bench memory | Yusuf | Yusuf | Ismail, CEO | All |
| Estimates and fit to appetite | Relevant technical lead | Same | CEO | All |
| Release readiness | Ismail | Ismail | Yusuf, CEO (customer impact) | All |
| Engineering hires | Relevant technical lead | Joint (all three) | | |
| One-way doors (platform rewrite, on-prem-only strategy, building a hardware test platform) | Any founder | Joint, written memo, unanimous | | |

**Doors.** Two-way doors: the owner decides within a day and logs it. One-way doors: a one-page memo (problem, options, costs, reversibility), discussed within a week, decided unanimously.

**Technical debt.** Every deliberate shortcut is logged with principal (days saved), interest (days per month) and a repayment trigger. Monthly 30-minute review. 15% of each cycle reserved for repayment; the technical leads choose which items.

**Estimates.** Given as optimistic, most likely and pessimistic. External commitments at about $E + \sigma$ and only after the relevant technical lead confirms. Scope is negotiated against an appetite set by the CEO; estimates are not negotiated.

**Rituals.** Weekly 45-minute sync (priorities, blockers, decision log). Demo at the end of each 6-week cycle against acceptance criteria. Cycle planning and retro every 6 weeks, with a 1-week cool-down for debt and spikes. Monthly founder check-in on how the partnership is working.

**Disagreements.** (1) The approver for that class decides after hearing contributors. (2) If a founder believes it is a one-way door, it becomes a written memo decision. (3) If still deadlocked after a week, the founders consult a pre-agreed advisor and then the approver decides; the decision and dissent are logged and revisited at the next retro.`,
            explanation: md`Strong answers give one approver per class, keep the CEO out of the how and the technical leads out of customer priorities, and turn debt and estimates into explicit, numeric processes.`,
            concepts: ["fc02.decision-rights", "fc02.reversibility", "fc02.technical-debt", "fc02.estimation", "fc02.review-rituals"],
            difficulty: 3,
          },
        },
        { kind: "scenario", scenario: "fc02-s3" },
        { kind: "xref", to: "m14.describe-plan-build-test", note: "If you prototype small internal tools yourself with an AI coding assistant (Track 0, m14), the same describe, plan, build, test discipline applies; keep such tools out of the core product unless the technical lead adopts them." },
        { kind: "sources", refs: ["fc02-r17", "fc02-r18", "fc02-r19", "fc02-r20", "fc02-r8"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc02-l08-q1",
      type: "mcq",
      prompt: md`Who should approve architecture decisions in a startup where the CEO does not code?`,
      options: ["The CEO", "The technical lead", "A vote of all employees", "The lead investor"],
      answer: 1,
      explanation: md`The person accountable for system health approves the how; the CEO contributes constraints such as cost, security and customer deployment.`,
      concepts: ["fc02.decision-rights"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc02-l08-q2",
      type: "numeric",
      prompt: md`A shortcut saves 20 engineer-days. It adds 1 engineer-day of extra work per change, and the area changes 4 times per month. What is the break-even time in months?`,
      answer: 5,
      tolerance: { abs: 0.05 },
      unit: "months",
      explanation: md`$i = 1 \times 4 = 4$ days/month; $t_{\text{be}} = 20/4 = 5$ months.`,
      concepts: ["fc02.technical-debt"],
      difficulty: 2,
    },
    {
      id: "fc02-l08-q3",
      type: "numeric",
      prompt: md`Three-point estimate: optimistic 2 weeks, most likely 4, pessimistic 12. What is the PERT expected duration, in weeks (2 decimals)?`,
      answer: 5,
      tolerance: { abs: 0.02 },
      unit: "weeks",
      explanation: md`$E = (2 + 4 \times 4 + 12)/6 = 30/6 = 5.00$ weeks, one week above the most likely value because of the long pessimistic tail. $\sigma = (12 - 2)/6 \approx 1.67$ weeks, so a commitment near $E + \sigma \approx 6.7$ weeks.`,
      concepts: ["fc02.estimation"],
      difficulty: 2,
    },
    {
      id: "fc02-l08-q4",
      type: "mcq",
      prompt: md`Which is a one-way door for Afterwave?`,
      options: [
        "Changing the colour scheme of the Lockstep timeline.",
        "Choosing which DAQ format to support first in a pilot.",
        "Committing the company to build its own instrumented hardware test platform with a long-lead equipment order.",
        "Renaming an internal service.",
      ],
      answer: 2,
      explanation: md`Large capital commitments with long lead times are hard to reverse and consequential: they deserve a written, joint decision.`,
      concepts: ["fc02.reversibility"],
      difficulty: 1,
    },
    {
      id: "fc02-l08-q5",
      type: "multi",
      prompt: md`Which are in Fowler's technical debt quadrant as **prudent** debt? (Select all.)`,
      options: [
        "\"We must ship for the pilot now and will deal with the consequences.\"",
        "\"We don't have time for design.\"",
        "\"Now we know how we should have done it.\"",
        "\"What is layering?\"",
      ],
      answer: [0, 2],
      explanation: md`Prudent deliberate: a conscious trade-off. Prudent inadvertent: learning that reveals a better design. The other two are reckless.`,
      concepts: ["fc02.technical-debt"],
      difficulty: 2,
    },
    {
      id: "fc02-l08-q6",
      type: "decision",
      prompt: md`A customer asks for a feature by the end of the month. Your technical cofounder estimates 5 to 9 weeks. What do you do?`,
      options: [
        { text: "Ask them to do it in 4 weeks; the customer matters.", score: 0, feedback: "Haggling the estimate teaches padding and erodes trust; the work does not get smaller." },
        { text: "Ask what could be delivered within 4 weeks that solves most of the customer's problem, and go back to the customer with that scope and a date the technical lead confirms.", score: 1, feedback: "Negotiates scope against an appetite, not the estimate." },
        { text: "Promise the customer the end of the month and sort it out later.", score: 0, feedback: "You committed engineering time without confirmation: a direct breach of decision rights." },
        { text: "Tell the customer it is impossible.", score: 0.3, feedback: "Possibly true for the full scope, but you skipped the useful question of what fits." },
      ],
      explanation: md`Appetite plus variable scope is the productive response to a range that does not fit the date.`,
      concepts: ["fc02.estimation", "fc02.decision-rights"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "fc02-l08-f1", front: "DACI", back: "Driver, Approver (exactly one), Contributors, Informed.", concepts: ["fc02.decision-rights"] },
    { id: "fc02-l08-f2", front: "One-way vs two-way door", back: "One-way: consequential, hard to reverse, decide slowly and jointly. Two-way: reversible, decide fast by the owner.", concepts: ["fc02.reversibility"] },
    { id: "fc02-l08-f3", front: "Technical debt break-even", back: md`$t_{\text{be}} = S/i$: principal saved divided by monthly interest. Take the debt if the code dies before $t_{\text{be}}$.`, concepts: ["fc02.technical-debt"] },
    { id: "fc02-l08-f4", front: "PERT estimate", back: md`$E = (O + 4M + P)/6$, $\sigma = (P - O)/6$. Commit at about $E + \sigma$.`, concepts: ["fc02.estimation"] },
    { id: "fc02-l08-f5", front: "Negotiate scope or estimate?", back: "Scope, against an appetite. Never haggle the estimate.", concepts: ["fc02.estimation"] },
    { id: "fc02-l08-f6", front: "Fowler's debt quadrant axes", back: "Deliberate vs inadvertent; prudent vs reckless.", concepts: ["fc02.technical-debt"] },
    { id: "fc02-l08-f7", front: "Rule for customer commitments", back: "The CEO commits scope and dates only after the technical lead confirms feasibility.", concepts: ["fc02.decision-rights"] },
  ],
  scenarios: [
    {
      id: "fc02-s3",
      title: "\"We need to rewrite the capture engine\"",
      dayInLife: true,
      context: md`Mid-pilot at two labs (illustrative). At the weekly sync, your technical cofounder says: "The capture engine was built fast for the first pilot. Every new DAQ format now takes a week instead of a day. I want to stop features for 8 weeks and rewrite it." The second lab's pilot readout is in 5 weeks.`,
      start: "a",
      concepts: ["fc02.technical-debt", "fc02.decision-rights", "fc02.reversibility"],
      nodes: {
        a: {
          md: md`How do you respond?`,
          choices: [
            { text: "\"No, the pilots come first. We'll rewrite after the fundraise.\"", score: 2, feedback: "Overrides a system-health judgement without understanding the numbers, and pushes debt into the period when it will cost most.", next: "c" },
            { text: "\"Let's put numbers on it: what does the current design cost us per month, what would the rewrite cost, and is there a staged option that protects the readout?\"", score: 9, feedback: "Turns a values argument into an economic one and invites options, while respecting their ownership of the how.", next: "b" },
            { text: "\"You own the code, do whatever you think is right.\"", score: 3, feedback: "Abdicates your part: the customer commitment (the readout) is your decision area.", next: "c" },
          ],
        },
        b: {
          md: md`They come back: each new format costs 4 extra days; expect 3 new formats a month after the pilots convert (12 days a month of interest). Full rewrite: 8 weeks for two engineers. A staged option: 2 weeks now to put a clean interface around the importer (new formats then cost about 1 extra day), the rest of the rewrite after the readout.`,
          choices: [
            { text: "Choose the staged option, protect the readout, and log the full rewrite as a one-way-door decision to take jointly after the readout with a written memo.", score: 10, feedback: "Pays down the most expensive interest now, keeps the customer commitment, and treats the big rewrite with the process it deserves.", next: "d" },
            { text: "Approve the full 8-week rewrite now.", score: 4, feedback: "Technically sound, but it puts the readout at risk when a cheaper staged option exists." },
          ],
        },
        c: {
          md: md`Six weeks later, two new DAQ formats from a third prospect each took more than a week. Your cofounder is frustrated and the third pilot's start slips.`,
          choices: [
            { text: "Hold a founder check-in, revisit decision rights for system-health calls, and agree a monthly debt review with numbers.", score: 5, feedback: "Repairs the process; the cost was a slipped pilot and some trust." },
          ],
        },
        d: {
          md: md`The interface ships in 2 weeks; new formats now take about a day of extra work. The readout goes ahead on schedule.`,
          choices: [
            { text: "Schedule the rewrite memo for the week after the readout and add a standing monthly debt review.", score: 10, feedback: "Closes the loop: the decision is visible, numeric and on the calendar." },
          ],
        },
      },
    },
  ],
};

export default lesson;
