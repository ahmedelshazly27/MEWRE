import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh07-l06",
  title: "Choosing for Suhail: criteria, a weighted decision and the structure memo",
  summary:
    "Turning the module into a decision: the criteria that matter for Suhail, a weighted scoring of four structure options with a sensitivity test, why reversibility favours starting for-profit and adding a nonprofit later, and how to write the one-page decision memo the leads and counsel will work from.",
  minutes: 65,
  objectives: [
    "Choose and weight decision criteria before scoring options",
    "Score four structure options and test the result's sensitivity to the uncertain weights",
    "Explain the asymmetric reversibility between starting nonprofit and starting for-profit",
    "Write a staged structure plan with explicit triggers for each step",
    "Produce a one-page decision memo with recommendation, criteria, risks and questions for counsel",
  ],
  concepts: [
    { id: "sh07.decision-criteria", name: "Weighted decision criteria", description: "A fixed list of criteria and weights agreed before options are scored; options are compared by weighted score and the result is trusted only if it survives plausible changes in the weights.", competency: "sh-org", related: ["fc09.expected-value"] },
    { id: "sh07.staged-structure", name: "Staged structure", description: "Start with the simplest structure that can take the first revenue, and add entities (for example a nonprofit research foundation) when a written trigger is met, rather than building the final structure on day one.", competency: "sh-org", related: ["sh07.hybrid-structure", "fc09.reversibility"] },
    { id: "sh07.decision-memo", name: "Structure decision memo", description: "One page stating the decision, options considered, criteria and weights, scores and sensitivity, the recommendation with triggers, risks, and the questions counsel must answer before incorporation.", competency: "sh-org", related: ["sh07.decision-criteria", "sh07.staged-structure"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Deciding with criteria fixed in advance",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You will make this decision once, with volunteers who each have a view and counsel who bills by the hour. A written set of criteria, weights and triggers lets the leads argue about the weights (which is the real disagreement) instead of about the answer, and gives counsel a precise brief. It is also the document a future sponsor, grant funder or investor will ask for when they ask "what is Suhail, legally?".`,
        },
        {
          kind: "md",
          md: md`### The criteria that matter for Suhail

From the previous lessons, seven criteria decide the structure. Weights below are illustrative and should be set by the leads before scoring:

| Criterion | Why it matters for Suhail | Weight |
|---|---|---|
| **Commercial revenue** | Sponsorship, tickets, job posts and recruiting are most of the plausible money | 0.20 |
| **Grants and compute for research** | The research arm needs eligible-entity status | 0.15 |
| **Cost and complexity** | Volunteers run the admin; running cost matters more than set-up | 0.15 |
| **Neutrality and builder trust** | The community's value depends on being nobody's channel | 0.15 |
| **Option to raise investment later** | Only for a possible platform business | 0.10 |
| **Ability to reward leads** | Stipends now, equity possibly | 0.10 |
| **Gulf banking and invoicing** | Sponsors pay from UAE, Saudi and international entities | 0.15 |`,
        },
        { kind: "equation", formula: "sh07-weighted-score" },
        {
          kind: "md",
          md: md`### Four options

- **A. Nonprofit only** (an association or foundation, regional or Dutch).
- **B. For-profit only** (one operating company, for example a UAE free-zone company).
- **C. Staged hybrid**: a for-profit operating company now, with mission commitments in the articles and the transparency policy; a separate nonprofit research foundation (or a university partner) added when the first research grant requires it.
- **D. Fiscal sponsorship** under a host for the first year or longer.

### Reversibility is not symmetric

Moving from a for-profit to a hybrid is an **addition**: create a foundation, sign an intercompany agreement, move the research activity. Moving from a nonprofit to a for-profit is a **conversion**: the nonprofit's assets are locked to its purpose, so its brand, list and surplus usually cannot simply be handed to a new company owned by the founders. Under uncertainty, prefer the choice you can extend over the one you would have to unwind. This is the same logic as two-way and one-way doors in decision making.`,
        },
        {
          kind: "xref",
          to: "fc09-l06",
          note: "Founder Core's decision-making lesson covers expected value, reversibility, base rates and pre-mortems; this lesson applies them to the structure choice.",
        },
        {
          kind: "chart",
          chart: "bar",
          title: "Weighted scores of the four options (illustrative weights and scores)",
          xKey: "option",
          yLabel: "Weighted score (1 to 5)",
          series: [
            { key: "base", label: "Base weights" },
            { key: "neutral", label: "Neutrality +0.05 (from cost)" },
            { key: "invest", label: "Investment +0.05 (from neutrality)" },
          ],
          data: [
            { option: "A Nonprofit only", base: 2.8, neutral: 2.95, invest: 2.6 },
            { option: "B For-profit only", base: 3.95, neutral: 3.9, invest: 4.05 },
            { option: "C Staged hybrid", base: 4.05, neutral: 4.1, invest: 4.05 },
            { option: "D Fiscal sponsorship", base: 3.2, neutral: 3.15, invest: 3.05 },
          ],
          caption: "C never loses across these weight changes; B ties it only when investment is weighted more than neutrality. That robustness, not the 0.1-point lead, is the argument for C.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Scoring the options",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "The weighted matrix (illustrative scores, 1 to 5)",
          given: md`Weights (revenue, grants, cost, neutrality, investment, leads, banking) = (0.20, 0.15, 0.15, 0.15, 0.10, 0.10, 0.15). Scores:

| Option | Revenue | Grants | Cost | Neutrality | Investment | Leads | Banking |
|---|---|---|---|---|---|---|---|
| A Nonprofit only | 2 | 5 | 2 | 5 | 1 | 2 | 2 |
| B For-profit only | 5 | 2 | 4 | 3 | 5 | 5 | 4 |
| C Staged hybrid | 5 | 4 | 3 | 4 | 4 | 4 | 4 |
| D Fiscal sponsorship | 3 | 4 | 5 | 4 | 1 | 1 | 3 |`,
          steps: [
            { md: md`$S_A = 0.2(2) + 0.15(5) + 0.15(2) + 0.15(5) + 0.1(1) + 0.1(2) + 0.15(2) = 0.4 + 0.75 + 0.3 + 0.75 + 0.1 + 0.2 + 0.3 = 2.80$.` },
            { md: md`$S_B = 1.0 + 0.3 + 0.6 + 0.45 + 0.5 + 0.5 + 0.6 = 3.95$.` },
            { md: md`$S_C = 1.0 + 0.6 + 0.45 + 0.6 + 0.4 + 0.4 + 0.6 = 4.05$.` },
            { md: md`$S_D = 0.6 + 0.6 + 0.75 + 0.6 + 0.1 + 0.1 + 0.45 = 3.20$.` },
            { md: md`Sensitivity: moving 0.05 from cost to neutrality gives B 3.90, C 4.10; moving 0.05 from neutrality to investment gives B 4.05, C 4.05. C is never beaten; B and C differ by at most 0.2.` },
          ],
          result: md`B and C are close; A and D are clearly behind. The tie-breaker is reversibility: C starts as B (one for-profit company) and adds the foundation only when a grant needs it, so choosing C costs nothing now and keeps the research option open. Recommendation: **C, staged**.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: if grants mattered more",
          given: md`The research lead argues the research arm is central and proposes weights (0.20, 0.25, 0.15, 0.15, 0.05, 0.05, 0.15): grants up 0.10, investment and leads down 0.05 each. Same scores.`,
          steps: [
            {
              md: md`$S_B = 0.2(5) + 0.25(2) + 0.15(4) + 0.15(3) + 0.05(5) + 0.05(5) + 0.15(4)$.`,
              hidden: true,
              check: { prompt: "Score of B", answer: 3.65, tolerance: { abs: 0.01 } },
            },
            {
              md: md`$S_C = 0.2(5) + 0.25(4) + 0.15(3) + 0.15(4) + 0.05(4) + 0.05(4) + 0.15(4)$.`,
              hidden: true,
              check: { prompt: "Score of C", answer: 4.05, tolerance: { abs: 0.01 } },
            },
            { md: md`$S_A = 3.15$, $S_D = 3.50$: the nonprofit options gain but stay behind C.` },
          ],
          result: md`With research weighted up, C's lead over B widens to 0.4 and nothing overtakes it. The disagreement about weights does not change the decision, which is exactly what you want to show the leads.`,
        },
        {
          kind: "flow",
          title: "Staged structure plan with triggers (illustrative)",
          steps: [
            { label: "Q1 2027: hosted or single company", detail: "If no entity is ready for the first sponsor: a written hosting arrangement with an exit clause. Incorporate the operating company in parallel." },
            { label: "Operating company live", detail: "Trigger: entity licensed for events, media and (if needed) recruiting; bank account open; brand, domain and lists assigned to it." },
            { label: "Leads compact and pay trigger adopted", detail: "Before the first stipend; equity pool only by board resolution." },
            { label: "Research foundation or university partner", detail: "Trigger: a grant or compute donation that requires an eligible nonprofit recipient." },
            { label: "Separate platform company (only if)", detail: "Trigger: repeat hiring revenue from at least ten employers; this, not the community, could raise equity." },
          ],
        },
        {
          kind: "question",
          question: {
            id: "sh07-l06-p1",
            type: "numeric",
            prompt: md`Weights (0.5, 0.3, 0.2); option X scores (4, 2, 5). Weighted score? (2 decimals)`,
            answer: 3.6,
            tolerance: { abs: 0.01 },
            explanation: md`$0.5(4) + 0.3(2) + 0.2(5) = 2.0 + 0.6 + 1.0 = 3.60$.`,
            concepts: ["sh07.decision-criteria"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Writing and using the memo",
      blocks: [
        {
          kind: "md",
          md: md`### Structure of a one-page decision memo

1. **Decision required and by when** (for example: entity able to invoice by 1 March 2027).
2. **Options considered** (A to D), one line each.
3. **Criteria and weights**, agreed by the leads before scoring.
4. **Scores and sensitivity**: the table and the one or two weight changes that could flip it.
5. **Recommendation with triggers**: what is done now, what is added later and on which condition.
6. **Risks and mitigations**: concentration, sponsor capture, volunteer burnout, licence gaps.
7. **Questions for counsel**: the specific facts that would change the answer (licence scope, onshore and cross-border events, recruiting licence, foundation jurisdiction and board composition).
8. **Owner and review date.**

### Who does what

You write the memo; the Finance Lead checks the numbers; every lead signs off on the weights; counsel answers section 7 in writing; the memo is filed with the leads compact and reviewed at each trigger.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "What you must check before signing",
          md: md`That the weights were fixed before the scores; that every number is labelled illustrative until real; that each trigger is observable (a signed grant, a bank account, ten employers) and not a feeling; that the brand, domain and lists are assigned to the entity in the same week it is created; and that counsel has confirmed, in writing, the licence activities for every revenue stream in lesson 2's menu.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Jurisdiction is still open",
          md: md`This lesson deliberately does not pick the jurisdiction. Free-zone licence scope, cross-border event rules in Saudi Arabia and Kuwait, recruiting licences, and the best home for a research foundation (ADGM or DIFC foundation, Dutch stichting, US nonprofit, university partnership) were not verified in course research and must come from counsel before the memo is final.`,
        },
        {
          kind: "question",
          question: {
            id: "sh07-l06-p2",
            type: "short",
            prompt: md`**Write the Suhail structure decision memo** (one page, following the eight-part structure). Use your own weights and scores (show both), include one sensitivity test, a staged recommendation with observable triggers, the top three risks with mitigations, and at least four questions for counsel. Label all numbers illustrative and do not claim any sponsor, member or revenue exists.`,
            rubric: [
              "States the decision, deadline and at least three options including a nonprofit and a for-profit",
              "Weights are explicit, sum to 1 and the weighted scores are computed correctly",
              "Includes a sensitivity test and interprets it (robust or not)",
              "Recommendation is staged with observable triggers, and uses the reversibility argument",
              "Risks include concentration or sponsor capture and volunteer or governance risk, each with a concrete mitigation",
              "Questions for counsel are specific (licence activities, cross-border events, recruiting licence, foundation jurisdiction); no invented facts",
            ],
            modelAnswer: md`**Decision memo: Suhail legal structure** (illustrative; owner: CEO; review at each trigger)

1. **Decision**: the entity that will contract with sponsors and hold Suhail's assets, able to invoice by 1 March 2027.
2. **Options**: A nonprofit only; B for-profit only; C for-profit now plus a nonprofit research foundation later; D fiscal sponsorship.
3. **Weights** (agreed by leads): revenue 0.20, grants 0.15, cost 0.15, neutrality 0.15, investment 0.10, lead rewards 0.10, Gulf banking 0.15.
4. **Scores** (1 to 5): A 2.80, B 3.95, C 4.05, D 3.20. Sensitivity: neutrality +0.05 from cost gives C 4.10, B 3.90; grants +0.10 gives C 4.05, B 3.65. C is never beaten; B is close only if investment is weighted up.
5. **Recommendation: C, staged.** Now: one for-profit operating company in the jurisdiction counsel confirms for events, media and recruiting, with a purpose clause, the transparency policy and the leads compact. If the first sponsor arrives first, a written hosting arrangement with an exit clause. Trigger for the research foundation: the first grant or compute donation that requires a nonprofit recipient. Trigger for any equity raise: a separate platform with repeat hiring revenue from ten employers. Reason for C over B: same today, and adding a foundation later is easy, while converting a nonprofit later is not.
6. **Risks**: (i) anchor sponsor concentration: cap any payer at 25 % of revenue, no community-wide category exclusivity; (ii) volunteer burnout and pay disputes: the numeric pay trigger and contribution per lead-hour review; (iii) licence gap for recruiting or Saudi events: counsel sign-off before selling those streams.
7. **Questions for counsel**: Which licence activities cover hackathons, a ticketed conference, newsletter and podcast sponsorship and a job board with success fees? Can the entity run events in Saudi Arabia and Kuwait without a local entity, and which permits apply (GEA, SCEGA)? Does success-fee recruiting need a recruitment-agency licence? Which jurisdiction best hosts a research foundation that receives international grants and compute donations, and may the company's founders sit on its board?
8. **Sign-off**: all five leads on the weights; Finance Lead on the numbers; counsel on section 7.`,
            explanation: md`The memo is the module's output: it combines the structure options (lesson 1), the revenue menu (lesson 2), the numbers (lesson 3), the governance rules (lesson 4) and the funding policy (lesson 5) into a single decision others can act on.`,
            concepts: ["sh07.decision-memo", "sh07.decision-criteria", "sh07.staged-structure"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a sponsor's partnerships manager, in under a minute, what Suhail legally is and why it is structured that way.",
          keyPoints: [
            "A for-profit operating company that contracts with sponsors and holds the brand",
            "Mission and neutrality held by published rules (judging, editorial, concentration cap, transparency), not only by legal form",
            "A separate nonprofit (or university partner) for the research arm when grants require it",
            "Why: most revenue is commercial, and starting for-profit keeps the option to add the nonprofit later",
          ],
        },
        { kind: "sources", refs: ["sh07-r6", "sh07-r7", "sh07-r12", "sh07-r30"] },
      ],
    },
  ],
  quiz: [
    {
      id: "sh07-l06-q1",
      type: "numeric",
      prompt: md`Weights (0.4, 0.4, 0.2). Option P scores (5, 2, 3); option Q scores (3, 4, 4). By how much does Q's weighted score exceed P's? (2 decimals)`,
      answer: 0.2,
      tolerance: { abs: 0.01 },
      explanation: md`$S_P = 2.0 + 0.8 + 0.6 = 3.4$; $S_Q = 1.2 + 1.6 + 0.8 = 3.6$; difference 0.20. Within about 0.2, run a sensitivity test before trusting it.`,
      concepts: ["sh07.decision-criteria"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh07-l06-q2",
      type: "mcq",
      prompt: "Why is starting for-profit and adding a nonprofit later more reversible than the opposite?",
      options: [
        "Because for-profit companies cannot own foundations",
        "Because a nonprofit's assets are locked to its purpose and usually cannot be handed to a founder-owned company, while adding a foundation is just an addition",
        "Because nonprofits cannot be dissolved",
        "Because foundations are cheaper",
      ],
      answer: 1,
      explanation: md`Asymmetric reversibility: the addition path is easy, the conversion path is hard.`,
      concepts: ["sh07.staged-structure"],
      difficulty: 2,
    },
    {
      id: "sh07-l06-q3",
      type: "order",
      prompt: "Order the steps of a sound structure decision.",
      items: [
        "Agree criteria and weights with the leads",
        "Score each option against the criteria",
        "Test sensitivity to the uncertain weights",
        "Write the staged recommendation with triggers",
        "Get counsel's written answers and sign off",
      ],
      explanation: md`Weights before scores, sensitivity before recommendation, counsel before signature.`,
      concepts: ["sh07.decision-memo"],
      difficulty: 1,
    },
    {
      id: "sh07-l06-q4",
      type: "multi",
      prompt: "Which are observable triggers suitable for a staged plan?",
      options: [
        "A signed grant that requires a nonprofit recipient",
        "Feeling that the community is ready",
        "Repeat hiring revenue from at least ten employers",
        "Bank account open and brand assigned to the entity",
        "Leads being enthusiastic",
      ],
      answer: [0, 2, 3],
      explanation: md`A trigger must be checkable by someone else: documents, counts, accounts.`,
      concepts: ["sh07.staged-structure"],
      difficulty: 1,
    },
    {
      id: "sh07-l06-q5",
      type: "decision",
      prompt: md`Two leads want a nonprofit "because builders will trust it more"; two want a plain company "because sponsors pay companies". The scores are A 2.80 and B 3.95, C 4.05. What do you do?`,
      options: [
        { text: "Vote and go with the majority", score: 0.2, feedback: "A tie, and a vote does not resolve what each side values." },
        { text: "Show that the disagreement is about the neutrality and revenue weights, run the sensitivity with each side's weights, and show that C wins or ties under both", score: 1, feedback: "Moves the argument to the weights and shows the decision survives both views." },
        { text: "Pick the nonprofit to avoid conflict", score: 0.1, feedback: "Chooses the hardest-to-reverse option to avoid a conversation." },
        { text: "Postpone the decision until a sponsor asks", score: 0.3, feedback: "The first sponsor will then decide for you, under time pressure." },
      ],
      explanation: md`Weighted scoring is most useful as a way to locate the real disagreement.`,
      concepts: ["sh07.decision-criteria", "sh07.decision-memo"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "sh07-l06-f1", front: "Weighted score", back: md`$S_j = \sum_i w_i x_{ij}$, weights fixed before scoring, summing to 1.`, concepts: ["sh07.decision-criteria"] },
    { id: "sh07-l06-f2", front: "Illustrative Suhail scores", back: "A nonprofit 2.80, B for-profit 3.95, C staged hybrid 4.05, D fiscal sponsorship 3.20; C never beaten in the sensitivity tests.", concepts: ["sh07.decision-criteria"] },
    { id: "sh07-l06-f3", front: "Asymmetric reversibility", back: "For-profit to hybrid is an addition; nonprofit to for-profit is a conversion of locked assets. Prefer the extendable choice.", concepts: ["sh07.staged-structure"] },
    { id: "sh07-l06-f4", front: "Research foundation trigger", back: "The first grant or compute donation that requires an eligible nonprofit recipient.", concepts: ["sh07.staged-structure"] },
    { id: "sh07-l06-f5", front: "Eight parts of the decision memo", back: "Decision and deadline; options; criteria and weights; scores and sensitivity; staged recommendation; risks; questions for counsel; owner and review.", concepts: ["sh07.decision-memo"] },
  ],
};

export default lesson;
