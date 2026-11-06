import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc04-l04",
  title: "Qualification with MEDDIC and MEDDPICC",
  summary:
    "Qualification is deciding where your scarce selling time goes. MEDDPICC lists the eight things you must know about an enterprise deal; scoring each one on evidence, with hard gates on the economic buyer and the champion, turns gut feel into a consistent pipeline and an honest forecast.",
  minutes: 70,
  objectives: [
    "You can state what each MEDDPICC letter means and what evidence confirms it.",
    "You can score a deal with a weighted 0 to 3 scale and apply gating rules.",
    "You can test whether a contact is a real champion.",
    "You can recognise the red flags that should take a deal out of the forecast or out of the pipeline.",
  ],
  concepts: [
    { id: "fc04.meddpicc", name: "MEDDPICC", description: "Metrics, Economic buyer, Decision criteria, Decision process, Paper process, Identify pain, Champion, Competition: the elements of an enterprise deal that must be known and evidenced. MEDDIC (PTC, 1990s) is the original six.", competency: "fc-sales", related: ["fc04.quantified-pain", "fc04.buying-committee"] },
    { id: "fc04.deal-scoring", name: "Deal scoring and gates", description: "Scoring each qualification element 0 to 3 on buyer evidence, weighting the critical ones, and gating the forecast on non-negotiable elements such as access to the economic buyer and a tested champion.", competency: "fc-sales", related: ["fc04.meddpicc", "fc04.weighted-pipeline"] },
    { id: "fc04.champion-test", name: "Champion test", description: "A champion has power or influence, a personal stake in your success, and has acted for you (shared internal information, arranged access to the economic buyer, sold in your absence).", competency: "fc-sales", related: ["fc04.buying-committee"] },
    { id: "fc04.paper-process", name: "Paper process", description: "The steps and documents between a verbal yes and a signed contract: vendor onboarding, security review, legal redlines, procurement approvals, PO issuance, and their lead times.", competency: "fc-sales", related: ["fc04.vendor-onboarding"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Eight things you must know, and how sure you are",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Your scarcest resource is founder hours, and every hour on a deal that cannot close is an hour taken from one that can (and from fundraising, hiring and product). Investors will also ask how much of your pipeline is real. A consistent qualification method lets you answer with evidence, and lets you drop deals early without guilt.`,
        },
        {
          kind: "md",
          md: md`### The letters

MEDDIC was developed at PTC in the 1990s (credited to Dick Dunkel and Jack Napoli) and later extended to MEDDICC and MEDDPICC. The extensions add the **paper process** and **competition**. Each element is a question with an evidence standard:

| Letter | Question | Confirmed when (evidence) | Afterwave example |
|---|---|---|---|
| **M** Metrics | What measurable outcome does the buyer expect, in their units? | Buyer confirmed the numbers in writing | "Regression wall time from 5 days to under 1; reruns cut 60 %" |
| **E** Economic buyer | Who can approve the spend, and have we met them? | Name, title, met or spoke, knows the business case | VP Engineering, met in the demo |
| **D** Decision criteria | What will they judge options on (technical, commercial, risk)? | Written list from the buyer | On-prem only; supports MDF and TDMS; zero missed regressions in pilot |
| **D** Decision process | Which steps, people and dates lead to a decision? | Steps and dates in the mutual action plan | Pilot review, VP sign-off, budget committee in March |
| **P** Paper process | What happens between yes and signature? | Steps, owners, lead times known | Vendor onboarding 3 weeks, security questionnaire, MSA redlines, PO |
| **I** Identify pain | What is broken, what does it cost, why now? | Quantified pain and compelling event confirmed | EUR 0.63 m/yr; SOP date in Q3 |
| **C** Champion | Who sells for us inside, and have they acted? | Passed the champion test | Validation manager arranged the VP meeting |
| **C** Competition | What else could they choose, including doing nothing or building it? | Named alternatives and our position | Internal scripts team; rerun everything; a test-management vendor |

Note that **"do nothing"** and **"build it ourselves"** are competitors in almost every early-stage deal, and usually the strongest ones.

### Scoring

Score each element on evidence, not optimism:

| Score | Meaning |
|---|---|
| 0 | Unknown |
| 1 | Assumed or heard second-hand |
| 2 | Partly confirmed by the buyer |
| 3 | Confirmed by the buyer, documented |

Weight the elements that most often kill deals. A reasonable starting weighting for an early-stage enterprise seller: Economic buyer, Identify pain and Champion count double. Then:`,
        },
        { kind: "equation", formula: "fc04-deal-score" },
        {
          kind: "md",
          md: md`The score is a **consistency tool**, not a probability. Pair it with **gates**: rules that override the total.

- **E = 0 or Champion = 0:** not in the commit forecast, whatever the score.
- **I = 0** (no quantified pain) after two meetings: disqualify or move to nurture.
- **Paper process unknown** within 30 days of the expected close date: the close date is not credible; move it.

### The champion test

A champion has three properties, and you need evidence for each:

1. **Power or influence:** others listen to them; they can get a meeting with the economic buyer.
2. **Personal stake:** solving this helps their goals (promotion, a team problem, a project deadline).
3. **Action:** they have done something for you that cost them effort or political capital: shared the budget process, introduced you to the VP, forwarded your summary with their endorsement, told you about a competitor.

A friendly contact who has done none of these is a **coach** at best. Test by asking for an action: "Could you set up 30 minutes with your VP so we can confirm the pilot criteria?" A champion says yes or explains the right route; a coach changes the subject.`,
        },
        {
          kind: "chart",
          chart: "bar",
          title: "Two deals scored element by element (illustrative)",
          xKey: "element",
          xLabel: "MEDDPICC element",
          yLabel: "Score (0 to 3)",
          series: [
            { key: "dealA", label: "Deal A: robotics validation team" },
            { key: "dealB", label: "Deal B: battery lab" },
          ],
          data: [
            { element: "Metrics", dealA: 2, dealB: 3 },
            { element: "Economic buyer", dealA: 1, dealB: 3 },
            { element: "Decision criteria", dealA: 2, dealB: 2 },
            { element: "Decision process", dealA: 1, dealB: 2 },
            { element: "Paper process", dealA: 0, dealB: 1 },
            { element: "Identify pain", dealA: 3, dealB: 2 },
            { element: "Champion", dealA: 2, dealB: 2 },
            { element: "Competition", dealA: 2, dealB: 1 },
          ],
          caption: "Deal A has the strongest pain but no route to the economic buyer and no paper process: interesting, not forecastable. Deal B is less dramatic and much closer to a signature.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Scoring two deals",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Deal A: strong pain, weak access",
          given: md`Illustrative scores for deal A (from the chart): M 2, E 1, Dc 2, Dp 1, P 0, I 3, Ch 2, Co 2. Weights: E, I and Ch = 2; all others = 1. Maximum element score 3.`,
          steps: [
            { md: md`**Unweighted:** $2+1+2+1+0+3+2+2 = 13$ of 24, so 54 %.` },
            { md: md`**Weighted sum:** $2\cdot1 + 1\cdot2 + 2\cdot1 + 1\cdot1 + 0\cdot1 + 3\cdot2 + 2\cdot2 + 2\cdot1 = 19$.` },
            { md: md`**Weighted maximum:** $3\times(1+2+1+1+1+2+2+1) = 3\times11 = 33$.` },
            { md: md`**Score:** $S = 19/33 = 0.576$, so 58 %.` },
            { md: md`**Gates:** E = 1 (assumed only) and P = 0. The deal passes no forecast gate even though its score looks mid-range. The single most valuable action is to ask the champion for the economic buyer meeting; the second is to ask how their last tool purchase went through procurement.` },
          ],
          result: md`58 %, but not forecastable. Keep it in pipeline with a dated action to reach the economic buyer within two weeks; if the champion cannot or will not arrange it, downgrade the champion to coach and re-score.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: score deal B",
          given: md`Deal B scores: M 3, E 3, Dc 2, Dp 2, P 1, I 2, Ch 2, Co 1. Same weights (E, I, Ch double).`,
          steps: [
            { md: md`Weighted sum $= 3\cdot1 + 3\cdot2 + 2\cdot1 + 2\cdot1 + 1\cdot1 + 2\cdot2 + 2\cdot2 + 1\cdot1$.` },
            { md: md`= **23**.`, hidden: true, check: { prompt: "Weighted sum", answer: 23, tolerance: { abs: 0 } } },
            { md: md`Score $S = 23/33$.` },
            { md: md`= **0.697**, about 70 %.`, hidden: true, check: { prompt: "Weighted score (as a decimal)", answer: 0.697, tolerance: { abs: 0.003 } } },
          ],
          result: md`About 70 %, and both gates (E and Champion) are passed. The weak spots are paper process (1) and competition (1): find out who else they are talking to and map the procurement steps now, not after the verbal yes.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Qualification in practice, and the red flags",
      blocks: [
        {
          kind: "md",
          md: md`### How it is used

- **In the CRM:** one field per letter (score and a one-line evidence note), plus the champion's and economic buyer's names. Review the scores, not the narrative.
- **In every meeting plan:** pick the one or two lowest letters and plan the question that would raise them. Qualification is not a form you fill once; it is the agenda of the next meeting.
- **In the weekly review:** any deal whose score has not moved in three weeks is stalled. Ask why, or close it as lost.
- **Disqualify early and politely:** "From what you have told me, this is not a priority for this year. Shall I check back after your budget cycle in September?" Buyers respect it, and it often surfaces the real objection.

### Red flags

| Signal | What it often means |
|---|---|
| "Send me the pricing and we will get back to you" before discovery is complete | You are a price benchmark for another vendor or for an internal build |
| Only one contact, who avoids introductions | Coach, not champion; or the project has no sponsor |
| Decision date keeps moving with no new reason | No compelling event; low priority |
| "We need to see a bit more" after each meeting | No decision criteria agreed |
| RFP arrives that you did not help shape | Requirements written around a competitor (lesson 8) |
| Free pilot requested with no success criteria | Evaluation without commitment (lesson 6) |
| Security or procurement "will be fine" but nobody has asked them | Paper process unknown; expect months |`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How qualification frameworks fail",
          md: md`- **Scoring on hope.** A 3 needs buyer evidence. If you cannot paste the email that proves it, it is a 1.
- **Interrogation.** MEDDPICC is your checklist, not the buyer's questionnaire. Never ask "who is your economic buyer?"; ask "who else would need to be comfortable with this?"
- **Over-engineering early.** With five deals, a CRM with 40 fields will not be maintained. Start with the eight letters and two names.`,
        },
        { kind: "scenario", scenario: "fc04-s1" },
        {
          kind: "question",
          question: {
            id: "fc04-l04-p1",
            type: "short",
            prompt: md`Take one realistic Afterwave or Mizan opportunity (describe it in three lines, illustrative). Produce its MEDDPICC qualification sheet: for each of the eight elements give the current score (0 to 3), the evidence you have, and the specific question or action that would raise it next. Then compute the weighted score (E, I and Champion double), state which gates it passes, and write the one-sentence decision: pursue now, nurture, or disqualify.`,
            rubric: [
              "All eight elements present with correct meaning (including paper process and competition, with do-nothing or build in-house considered).",
              "Scores are tied to buyer evidence; assumed facts are scored 1 or lower.",
              "Each element has a concrete next question or action, phrased as it would be said to the buyer.",
              "Weighted score computed correctly with the stated weights and maximum of 33.",
              "Gates applied (economic buyer, champion, pain) and the decision follows logically from them.",
              "Opportunity is plausible for the venture and labelled illustrative.",
            ],
            modelAnswer: md`**Opportunity (illustrative):** Mizan soiling-analytics pilot with an O&M contractor at a 300 MW PV plant in Kuwait; contact is the performance engineer; plant owner approval needed.

| Element | Score | Evidence | Next question or action |
|---|---|---|---|
| Metrics | 2 | Engineer estimates 3 to 5 % summer soiling loss; not confirmed by the O&M manager | "Can we look at last summer's PR and cleaning log together to pin the loss down?" |
| Economic buyer | 1 | Heard the O&M manager signs up to a limit; never met | Ask the engineer to set up 30 minutes with the O&M manager |
| Decision criteria | 1 | Assumed: accuracy and cost | "How would you judge whether a soiling estimate is good enough?" |
| Decision process | 1 | Unknown beyond "manager decides" | "What happened the last time you added a monitoring service?" |
| Paper process | 0 | Unknown; owner approval may be needed | "Does a contract like this need the plant owner's approval?" |
| Identify pain | 2 | Cleaning cost and water constraints discussed; no dated event | Probe summer dust season and contract renewal date |
| Champion | 1 | Friendly engineer, no action yet | Ask for the manager meeting (champion test) |
| Competition | 1 | Current fixed cleaning schedule (do nothing) | "What would you do if you did not do this?" |

**Weighted sum:** $2 + 1\cdot2 + 1 + 1 + 0 + 2\cdot2 + 1\cdot2 + 1 = 13$; $S = 13/33 = 39$ %. **Gates:** E and Champion are both below 2; fails. **Decision:** nurture with one dated action: the champion test (manager meeting within two weeks); if it does not happen, move to nurture until the next dust season.`,
            explanation: md`The quality signal is evidence-based scoring and a next action per letter, not the final number.`,
            concepts: ["fc04.meddpicc", "fc04.deal-scoring", "fc04.champion-test"],
            difficulty: 2,
          },
        },
        { kind: "sources", refs: ["fc04-r2"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc04-l04-q1",
      type: "order",
      prompt: "Put the MEDDPICC letters in order.",
      items: ["Metrics", "Economic buyer", "Decision criteria", "Decision process", "Paper process", "Identify pain", "Champion", "Competition"],
      explanation: md`M, E, D, D, P, I, C, C. MEDDIC is the original six; P (paper process) and the second C (competition) are the later additions.`,
      concepts: ["fc04.meddpicc"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc04-l04-q2",
      type: "numeric",
      prompt: md`Scores: M 3, E 2, Dc 1, Dp 1, P 1, I 3, Ch 3, Co 2. Weights: E, I, Ch = 2; others 1; maximum 3 per element (weighted maximum 33). What is the weighted score as a decimal (3 decimals)?`,
      answer: 0.727,
      tolerance: { abs: 0.003 },
      explanation: md`Weighted sum $= 3\cdot1 + 2\cdot2 + 1 + 1 + 1 + 3\cdot2 + 3\cdot2 + 2\cdot1 = 3+4+1+1+1+6+6+2 = 24$. $S = 24/33 = 0.727$. Both gates pass (E = 2, Champion = 3); the weak spots are decision criteria, decision process and paper process.`,
      concepts: ["fc04.deal-scoring"],
      difficulty: 1,
    },
    {
      id: "fc04-l04-q3",
      type: "mcq",
      prompt: "Which is the strongest evidence that a contact is a champion?",
      options: [
        "They said the product is the best they have seen",
        "They replied quickly to your emails",
        "They arranged a meeting with their VP and shared how the budget is approved",
        "They connected with you on LinkedIn",
      ],
      answer: 2,
      explanation: md`A champion acts, spending effort or political capital for you. Enthusiasm and responsiveness are coach behaviour.`,
      concepts: ["fc04.champion-test"],
      difficulty: 1,
    },
    {
      id: "fc04-l04-q4",
      type: "multi",
      prompt: "Which belong to the paper process? (Select all that apply.)",
      options: [
        "Vendor onboarding and supplier registration",
        "Security questionnaire and review",
        "Legal redlines of the master agreement",
        "The demo storyline",
        "Purchase order issuance",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`Paper process is everything between a verbal yes and a signed, purchasable contract. The demo is part of the evaluation, not the paper.`,
      concepts: ["fc04.paper-process"],
      difficulty: 1,
    },
    {
      id: "fc04-l04-q5",
      type: "decision",
      prompt: md`A deal scores 72 % but you have never met or even identified the economic buyer. The quarter ends in three weeks and an investor asks what you will close. What do you report?`,
      options: [
        { text: "Include it in commit: 72 % is high.", score: 0, feedback: "The score is not a probability, and the economic-buyer gate fails. This is how founders lose credibility with investors." },
        { text: "Report it as upside (best case), not commit, and state the action that would move it: meeting the economic buyer this week.", score: 1, feedback: "Honest categorisation with a concrete path. Investors trust founders whose forecasts are conservative and explained." },
        { text: "Leave it out of the conversation entirely.", score: 0.4, feedback: "Under-reports a real opportunity. Better to show it as upside with its gap." },
      ],
      explanation: md`Gates override scores. Commit means you would be surprised if it did not close; without the economic buyer, you cannot be.`,
      concepts: ["fc04.deal-scoring"],
      difficulty: 2,
    },
    {
      id: "fc04-l04-q6",
      type: "mcq",
      prompt: "In an early-stage enterprise deal, which competitor is most often the strongest?",
      options: ["The market leader", "Do nothing, or build it in-house", "A cheaper startup", "An open-source tool"],
      answer: 1,
      explanation: md`Status quo and in-house builds cost nothing new to approve. Name them as competition and quantify why they lose (cost of pain, maintenance, opportunity cost).`,
      concepts: ["fc04.meddpicc"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc04-l04-f1", front: "MEDDPICC", back: "Metrics, Economic buyer, Decision criteria, Decision process, Paper process, Identify pain, Champion, Competition.", concepts: ["fc04.meddpicc"] },
    { id: "fc04-l04-f2", front: "Scoring scale per element", back: "0 unknown, 1 assumed, 2 partly confirmed by the buyer, 3 confirmed and documented.", concepts: ["fc04.deal-scoring"] },
    { id: "fc04-l04-f3", front: "Two forecast gates", back: "No commit without (1) access to the economic buyer and (2) a tested champion, whatever the score.", concepts: ["fc04.deal-scoring"] },
    { id: "fc04-l04-f4", front: "Champion test (three properties)", back: "Power or influence, personal stake, and has acted for you.", concepts: ["fc04.champion-test"] },
    { id: "fc04-l04-f5", front: "Paper process", back: "Everything between verbal yes and signature: onboarding, security review, legal redlines, approvals, PO, with lead times.", concepts: ["fc04.paper-process"] },
    { id: "fc04-l04-f6", front: "Red flag: 'send me pricing' before discovery", back: "You may be a benchmark for another vendor or an internal build. Ask what decision the price will inform.", concepts: ["fc04.meddpicc"] },
  ],
  scenarios: [
    {
      id: "fc04-s1",
      title: "The champion goes quiet",
      dayInLife: true,
      context: md`Illustrative. An Afterwave deal with a humanoid robotics company was at S4: pilot scope drafted, VP Engineering briefly met, decision meeting planned for 12 March. Your champion, the validation manager, has not replied to two emails in ten days. The investor update is due Friday.`,
      start: "a",
      concepts: ["fc04.champion-test", "fc04.deal-scoring", "fc04.meddpicc"],
      nodes: {
        a: {
          md: md`What do you do first?`,
          choices: [
            { text: "Send a third email with the pilot proposal attached again.", score: 2, feedback: "More of what is not working. You learn nothing about why they went quiet.", next: "b" },
            { text: "Send a short, honest note: 'It seems priorities may have shifted, which happens. Should I pause this until later in the year, or is something blocking it I can help with?' and call once.", score: 9, feedback: "Gives them an easy way to tell you the truth. Often surfaces the real issue within a day.", next: "c" },
            { text: "Email the VP directly to say the champion is not responding.", score: 1, feedback: "Going over your champion's head publicly burns the relationship you most need.", next: "b" },
          ],
        },
        b: {
          md: md`A week later there is still no reply. The decision meeting date passes.`,
          choices: [
            { text: "Move the deal back to S2, score E and Champion at 1, remove it from the forecast and say so in the investor update.", score: 7, feedback: "Late but honest. Investors care more about forecast discipline than about one deal." },
            { text: "Keep it at S4 for now; it may come back.", score: 0, feedback: "A stale deal at a late stage inflates the pipeline and the forecast." },
          ],
        },
        c: {
          md: md`The champion calls back: a humanoid field trial slipped, and the VP has frozen new tool spend until the trial is fixed, probably for six weeks. The champion still wants the pilot.`,
          choices: [
            { text: "Ask whether the trial issue is one Afterwave could help diagnose (captured rig data, change impact), and offer a short, scoped piece of help that links the pilot to the VP's current priority.", score: 10, feedback: "Ties your product to the new compelling event. If it fits, the deal can accelerate; if not, you learned it honestly.", next: "d" },
            { text: "Offer a 30 % discount to get it signed before the freeze.", score: 1, feedback: "A spend freeze is not a price problem. You give away margin and still do not get a signature." },
            { text: "Agree to pause, move the close date six weeks out, keep it out of commit, and schedule a check-in.", score: 7, feedback: "Sound and honest. It misses the chance to connect to the new priority.", next: "d" },
          ],
        },
        d: {
          md: md`It is Friday. How do you report this deal in the investor update?`,
          choices: [
            { text: "As pipeline at S4 with a revised close date, out of this quarter's commit, with one line on why (customer spend freeze tied to a field trial) and what you are doing.", score: 10, feedback: "Specific, honest, and shows you understand the deal." },
            { text: "Do not mention it.", score: 3, feedback: "If you listed it last month, silence looks like hiding bad news." },
          ],
        },
      },
    },
  ],
};

export default lesson;
