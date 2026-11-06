import { md, type Question } from "../../schema";

const exam: Question[] = [
  {
    id: "fc04-x1",
    type: "numeric",
    prompt: md`You want 3 signed pilots. Stage conversions from first meeting to signature are 60 %, 50 %, 60 % and 50 %. Your cold outbound converts contacts to first meetings at $0.95\times0.08\times0.40$. How many contacts must enter the sequence? (round meetings up first, then contacts up)`,
    answer: 1119,
    tolerance: { abs: 5 },
    unit: "contacts",
    explanation: md`End-to-end conversion $= 0.09$, so meetings $= \lceil 3/0.09\rceil = \lceil 33.3\rceil = 34$. Meetings per contact $= 0.0304$, so contacts $= \lceil 34/0.0304\rceil = \lceil 1{,}118.4\rceil = 1{,}119$. Funnel and outbound arithmetic chain together.`,
    concepts: ["fc04.sales-stages", "fc04.outbound-sequence"],
    difficulty: 2,
  },
  {
    id: "fc04-x2",
    type: "numeric",
    prompt: md`Half-year target EUR 500k, EUR 150k already booked. In-period unweighted pipeline is EUR 1,050k and historically wins at 30 %. How much more in-period pipeline (EUR k) do you need to expect to hit the target?`,
    answer: 116.7,
    tolerance: { abs: 0.5 },
    unit: "EUR k",
    explanation: md`Remaining $= 350$. Required pipeline $= 350/0.30 = 1{,}166.7$. Shortfall $= 1{,}166.7 - 1{,}050 = 116.7$ EUR k. Current coverage is 3.0x, but at a 30 % win rate you need 3.33x: "3x coverage" is not a universal rule.`,
    concepts: ["fc04.pipeline-coverage"],
    difficulty: 2,
  },
  {
    id: "fc04-x3",
    type: "decision",
    prompt: md`Illustrative. After a successful Mizan briefing, an official at a Kuwaiti public entity says: "We like this. Send a quotation and we will issue a small direct order each month for the analytics service, so we avoid the tender." What do you do?`,
    options: [
        { text: "Send monthly quotations sized under the threshold, as suggested.", score: 0, feedback: "Splitting a recurring requirement to stay under a direct-contracting limit is exactly what the anti-splitting rules prohibit. It exposes the official and Mizan in audit." },
        { text: "Thank them, propose that their procurement or legal department confirms the right regime for the full annual value (direct contracting within the annual limit, a CAPT tender, or another route), and offer documents and a scoped first phase that fit that regime.", score: 1, feedback: "Keeps the opportunity, protects the official and builds a compliant path. Track 0 module 11 covers the thresholds and aggregation test." },
        { text: "Decline to proceed until a public tender is issued.", score: 0.3, feedback: "Too passive: there may be a legitimate route, and your leverage is before any tender." },
    ],
    explanation: md`Direct-contracting limits apply to the annual aggregate of the same items. The seller's job is to help the buyer find a compliant route, not to engineer around the rules.`,
    concepts: ["fc04.gulf-gov-procurement"],
    difficulty: 2,
  },
  {
    id: "fc04-x4",
    type: "numeric",
    prompt: md`A buyer's next best alternative costs EUR 80k/yr; your product delivers EUR 220k/yr more net value than that alternative. You price at EUR 75k/yr. What share of EVC is your price, in %?`,
    answer: 25,
    tolerance: { abs: 0.1 },
    unit: "%",
    explanation: md`$EVC = 80 + 220 = 300$ EUR k/yr. $75/300 = 25$ %. The buyer keeps EUR 225k/yr of value, a 4x return on the price.`,
    concepts: ["fc04.value-based-pricing"],
    difficulty: 1,
  },
  {
    id: "fc04-x5",
    type: "multi",
    prompt: "A deal is in your commit forecast. Which new facts should move it out of commit? (Select all that apply.)",
    options: [
      "The champion has changed jobs and nobody else in the account has met you",
      "Procurement reveals vendor onboarding takes six weeks and the quarter ends in three",
      "The buyer asks for a reference call with an existing customer",
      "The security team has not started reviewing your questionnaire answers",
      "The economic buyer confirms the decision date in writing",
    ],
    answer: [0, 1, 3],
    explanation: md`Losing the champion breaks a gate; onboarding and security timelines that exceed the period break the paper process. A reference request is a buying signal; a confirmed date strengthens commit.`,
    concepts: ["fc04.forecast-categories", "fc04.paper-process", "fc04.champion-test"],
    difficulty: 2,
  },
  {
    id: "fc04-x6",
    type: "numeric",
    prompt: md`Gross margin 75 %. Procurement asks for 20 % off. By what percentage would volume need to rise to keep gross profit unchanged?`,
    answer: 36.4,
    tolerance: { abs: 0.3 },
    unit: "%",
    explanation: md`$d/(GM-d) = 0.20/0.55 = 0.364$, so +36.4 %. In an enterprise deal that volume does not arrive, so the discount must buy something else (term, upfront payment, reference).`,
    concepts: ["fc04.give-get"],
    difficulty: 2,
  },
  {
    id: "fc04-x7",
    type: "order",
    prompt: "Order these steps of an Afterwave enterprise deal.",
    items: [
      "Discovery confirms quantified pain and a compelling event",
      "Outcome-first demo and technical deep dive",
      "Pilot scope, success criteria and conversion clause agreed",
      "Pilot installed and run with weekly reviews",
      "Decision meeting with the economic buyer",
      "Annual contract signed on pre-agreed terms",
    ],
    explanation: md`Discovery before demo, criteria and conversion terms before installation, decision at a fixed meeting, contract on terms agreed earlier. Security review and onboarding run in parallel from the demo stage.`,
    concepts: ["fc04.sales-stages", "fc04.success-criteria", "fc04.conversion-clause"],
    difficulty: 1,
  },
  {
    id: "fc04-x8",
    type: "short",
    prompt: md`Write a one-page deal review for one illustrative Afterwave or Mizan opportunity that is currently at the proposal stage. Include: the MEDDPICC scores with evidence and the weighted score; the forecast category and why; the pilot success criteria and conversion terms; your price, the buyer's EVC and the ZOPA; the two biggest risks and the dated actions that address them.`,
    rubric: [
      "MEDDPICC scored on evidence with a correctly computed weighted score and gates applied.",
      "Forecast category follows from gates, paper process and dates, not from the score alone.",
      "Success criteria are measurable (metric, threshold, method, data, date, judge) and conversion terms are fixed.",
      "Price sits inside a correctly computed EVC; BATNA-based reservation prices and ZOPA are stated.",
      "Risks are specific (single-threading, security review, procurement timing, competing internal build) with owners and dates.",
      "Numbers labelled illustrative and consistent with the venture facts.",
    ],
    modelAnswer: md`**Deal (illustrative):** Afterwave, motor-controller validation team, proposal agreed in principle.

**MEDDPICC:** M 3 (buyer confirmed EUR 0.4 m/yr addressable), E 2 (VP met once), Dc 2, Dp 2, P 1 (onboarding unknown), I 3, Ch 3 (manager arranged VP meeting), Co 2 (in-house script). Weighted $= 3 + 4 + 2 + 2 + 1 + 6 + 6 + 2 = 26$; $26/33 = 79$ %. Gates passed.

**Category:** best case, not commit: paper process unknown with five weeks left in the quarter.

**Pilot:** 10 weeks, 2 rigs; criteria: 100 % of failures found by full runs caught on 5 historical changes, at most 25 % of rig-hours, judged by the validation manager by week 8; zero data loss in a 20-run audit sample. Conversion: Team plan EUR 90k/yr for up to 6 rigs from the month after the decision meeting; EUR 25k pilot fee credited if signed within 30 days.

**Price and ZOPA:** EVC about EUR 437k/yr; price EUR 90k (21 %). Our floor EUR 60k (two other S4 deals); buyer ceiling about EUR 100k (VP approval limit). ZOPA EUR 60k to 100k. Give-get: 10 % for a 3-year term with upfront payment.

**Risks and actions:** (1) onboarding and security delay: ask procurement for onboarding steps and send the security pack by Friday (me); (2) internal script team positions itself as an alternative: offer a joint session with their lead to show the history check on their data, next Tuesday (me and Ismail).`,
    explanation: md`The review integrates qualification, forecasting, pilot design and pricing into one decision document.`,
    concepts: ["fc04.meddpicc", "fc04.forecast-categories", "fc04.success-criteria", "fc04.batna-zopa"],
    difficulty: 3,
  },
  {
    id: "fc04-x9",
    type: "mcq",
    prompt: "Your pipeline has many early-stage deals and few late-stage ones. Velocity is low because cycles are long. Which action most directly raises velocity?",
    options: [
      "Adding more first meetings without changing anything else",
      "Disqualifying stalled deals early and starting security review and onboarding at the technical-validation stage",
      "Raising list prices by 5 %",
      "Discounting to close faster",
    ],
    answer: 1,
    explanation: md`Velocity rises with win rate and falls with cycle length. Early disqualification raises the win rate of what remains and frees time; starting the paper process early shortens the cycle. Discounting cuts ACV and trains buyers to wait.`,
    concepts: ["fc04.sales-velocity", "fc04.paper-process"],
    difficulty: 2,
  },
  {
    id: "fc04-x10",
    type: "decision",
    prompt: md`In negotiation, the VP says: "Honestly, my team could build this in-house. Why should we pay EUR 90k a year?" What is your best response?`,
    options: [
      { text: "Offer 30 % off to remove the objection.", score: 0, feedback: "Concedes without testing the claim, and anchors future negotiations lower." },
      { text: "Agree that they could, and walk through the in-house cost with their numbers: engineers to build and maintain, time to first result, the part of the problem a script covers, and the opportunity cost of those engineers; compare with EUR 90k and the value already confirmed.", score: 1, feedback: "Treats the in-house option as their BATNA, quantifies it honestly, and shows that it sets a ceiling above your price." },
      { text: "Say that in-house tools always fail.", score: 0.2, feedback: "Dismissive and unprovable; it insults the team you want to win over." },
    ],
    explanation: md`The buyer's BATNA defines their ceiling. Quantifying it with their numbers usually shows the ZOPA is wider than the objection suggests.`,
    concepts: ["fc04.batna-zopa", "fc04.value-based-pricing"],
    difficulty: 2,
  },
  {
    id: "fc04-x11",
    type: "numeric",
    prompt: md`A free pilot will cost EUR 40k to deliver. On conversion the contract is EUR 100k/yr at 80 % gross margin for an expected 2 years. What is the break-even conversion probability, in %?`,
    answer: 25,
    tolerance: { abs: 0.1 },
    unit: "%",
    explanation: md`$p_c^* = C_d/(\mathrm{ACV}\cdot GM\cdot n) = 40/(100\times0.8\times2) = 40/160 = 25$ %. If your honest conversion estimate for a free pilot is below that, charge a fee or cut the scope.`,
    concepts: ["fc04.paid-pilot"],
    difficulty: 1,
  },
];

export default exam;
