import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m11-l05",
  title: "Navigating Delays",
  summary:
    "What really slows Kuwaiti public projects — approval ping-pong, bid-deadline extensions, re-tenders and cancellations, budget allocation, land and permits, committee calendars — how to estimate approval durations probabilistically, and the practical moves experienced MEWRE PMs use to keep projects moving without cutting corners.",
  minutes: 75,
  objectives: [
    "You can name the main causes of procurement and approval delay in Kuwait and give a real example of each.",
    "You can estimate an approval chain's mean and P80 duration with three-point (PERT) estimates and show which step to attack.",
    "You can choose practical, lawful countermeasures for a given delay and justify them with delay-cost numbers.",
    "You can handle typical delay scenarios (re-tender decision, bid validity expiry, committee deferral) as an experienced PM would.",
  ],
  concepts: [
    { id: "m11.delay-causes", name: "Causes of delay in Kuwaiti procurement", description: "Approval ping-pong, deadline extensions, re-tenders and cancellations, budget allocation, land/permits, committee scheduling, lender–government term conflicts.", competency: "delivery", related: ["m11.pert-approvals", "m11.delay-countermeasures"] },
    { id: "m11.pert-approvals", name: "Probabilistic approval scheduling", description: "Three-point estimates per approval step, summed means and variances, P80 = mean + 0.84σ; reduce the step with the largest variance first.", competency: "controls", related: ["m11.delay-causes"] },
    { id: "m11.delay-countermeasures", name: "Practical countermeasures", description: "Approval calendars, pre-cleared files, parallel preparation, standard documents, bid-validity management, formal escalation with delay-cost numbers, referral registers.", competency: "delivery", related: ["m11.delay-causes"] },
    { id: "m11.retender-decision", name: "Re-tender vs proceed decisions", description: "Weighing the cost and delay of cancelling and re-tendering against risks of proceeding with a weak competition or non-compliant bids.", competency: "procurement", related: ["m11.delay-countermeasures"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Why Kuwaiti projects slow down",
      blocks: [
        {
          kind: "md",
          md: md`## The delay catalogue, with Kuwaiti evidence

| Cause | Kuwaiti example | Mechanism |
|---|---|---|
| **Bid-deadline extensions** | Zone 1 RFP deadline 14 Sep 2025 → **15 Jan 2026**; Zone 2 16 Feb → 30 Apr 2026 and later; Al-Khairan **three** extensions to 31 May 2026 | Bidders need time for financing, partners, Kuwait-specific terms; addenda reset the clock |
| **Post-bid approvals** | Zone 1 award expected June 2026 → Q3 2026; preferred bidder reported ~Aug 2026, PPA not confirmed | Higher Committee scheduling, Audit Bureau review, Fatwa comments |
| **Approval ping-pong** | (generic) files returned with observations | Each return restarts a review cycle (m00-l02: $t/(1-p)$) |
| **Cancellations / re-tenders** | KNPC Dibdibah EPC+F cancelled (2020); Abdaliya ISCC cancelled by KAPP before award | Policy change, market conditions, weak competition |
| **Lender–government conflicts** | KAPP said some lender conditions conflict with its requirements | Bankability items left to post-bid stage |
| **Non-lowest awards** | 400 kV line: lowest ~KD 41.45 m (Apr 2025) → awarded KD 48.6 m (Mar 2026), ~11 months | Compliance disputes, justification, possible challenges |
| **Budget allocation** | (generic) projects not in the FY budget request | Wait for next fiscal year (Apr–Mar) |
| **Committee calendars** | (generic) monthly meetings, Ramadan, summer leave | A missed cut-off costs a month |
| **Land and permits** | (generic) overlapping allocations, EIA | Conditions precedent not met at financial close |

Two lessons from the evidence: (1) **extensions are the norm, not the exception** — plan for them; (2) **the post-bid phase is long** (AZN 2&3: ~6 months from letter agreement to ECWPA; Zone 1: months after financial opening).`,
        },
        { kind: "sources", refs: ["m11-agbi-2025-06-zone1", "m11-taiyang-zone1-rfp", "m11-zawya-2026-zone2-ext", "m11-meed-2026-06-khairan", "m11-zawya-2026-q3", "m11-meed-2026-08-zone1", "m11-eu-dibdibah", "m11-ippj-abdaliya", "m11-meed-kapp-stakeholders", "m11-gulfbase-2025-ohtl", "m11-megaproject-ohtl", "m11-gic-2025-08", "m11-mees-2026-02-azn"] },
        {
          kind: "md",
          md: md`## Scheduling approvals probabilistically

Single-point approval durations ("Audit Bureau: 6 weeks") are always wrong. Use three-point estimates — optimistic $a$, most likely $m$, pessimistic $b$ — and the PERT approximation:`,
        },
        { kind: "equation", formula: "m11-pert" },
        {
          kind: "md",
          md: md`For sequential steps, means add and (assuming independence) variances add; with several steps the total is roughly normal, so $P80 \approx \mu + 0.84\sigma$ and $P90 \approx \mu + 1.28\sigma$. Pessimistic values should include a return-for-observations cycle — that is where the right tail comes from. Attack the step contributing most **variance**, not just the longest mean.`,
        },
        { kind: "widget", widget: "monte-carlo", caption: "Enter the four approval steps from the worked example as triangular estimates and compare the simulated P80 with the PERT approximation." },
        {
          kind: "callout",
          tone: "why",
          title: "Why delays compound",
          md: md`Delays in Kuwaiti procurement are rarely independent: an Audit Bureau return can push the file past a Higher Committee meeting, which pushes signature past bid validity, which forces an extension request, which may change prices and restart parts of the evaluation. One slip can cost months. That is why experienced PMs manage **calendars and validity dates** as carefully as technical scope.`,
        },
        {
          kind: "md",
          md: md`## What experienced PMs actually do

1. **Map the approval calendar** at the start of the year — Higher Committee, cabinet, tender committee meeting dates and submission cut-offs; Ramadan, Eid and summer leave.
2. **Pre-clear files** — informal pre-review with legal affairs and the Audit Bureau liaison using a compliance matrix of past observations; reduce return probability.
3. **Prepare the next gate in parallel** — draft the Audit Bureau file while the Higher Committee item is pending; prepare contract execution copies while Fatwa reviews.
4. **Standardise** — use the ministry's approved templates and KAPP's standard documents; every bespoke clause is a review question.
5. **Fix bankability before RFP** — market sounding with developers and lenders; settle currency, termination and grid-risk positions early.
6. **Manage bid validity** — track expiry against the P80 approval date; request extensions early and formally.
7. **Escalate with numbers** — a one-page note: what is blocked, since when, who holds it, cost of delay per day (m00-l05), decision needed.
8. **Run a referral register** — every file movement logged; weekly follow-up.
9. **Write in good Arabic** — official correspondence quality matters; poorly drafted letters get returned.
10. **Never cut corners** — starting work before approval converts a delay problem into a violation (28 cases / KD 63 m in one period).`,
        },
        { kind: "sources", refs: ["m11-alrai-audit", "m11-wb-ppp"] },
      ],
    },
    {
      layer: "applied",
      title: "Estimating and compressing approval time",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "P80 for a post-bid approval chain",
          given: md`Three-point estimates (weeks; illustrative):

| Step | a | m | b |
|---|---|---|---|
| Higher Committee | 2 | 4 | 10 |
| Audit Bureau | 4 | 6 | 16 |
| Fatwa | 2 | 4 | 8 |
| Signing | 1 | 2 | 4 |`,
          steps: [
            { md: md`Means $t_e = (a+4m+b)/6$: HC 4.667; AB 7.333; Fatwa 4.333; Sign 2.167. Total $\mu = 18.50$ weeks.` },
            { md: md`Standard deviations $(b-a)/6$: 1.333; 2.000; 1.000; 0.500. Variance sum $= 1.778 + 4.000 + 1.000 + 0.250 = 7.028$, $\sigma = 2.651$ weeks.` },
            { md: md`$P80 \approx 18.50 + 0.8416 \times 2.651 = 20.73$ weeks; $P90 \approx 21.90$ weeks.` },
            { md: md`The Audit Bureau contributes **57%** of the variance ($4.0/7.03$) — the step to attack.` },
          ],
          result: md`Plan signature at ~21 weeks (P80) after the preferred bidder, not at the "most likely" 16 weeks. Ensure bid validity covers at least the P90 plus margin.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Effect of pre-clearing the Audit Bureau file",
          given: md`A pre-submission review with the Audit Bureau liaison and a compliance matrix changes the Audit Bureau estimate to a = 3, m = 5, b = 8 weeks. Other steps unchanged.`,
          steps: [
            {
              md: md`New AB mean: $(3 + 20 + 8)/6 = 5.167$ weeks; sd $= 5/6 = 0.833$.`,
              hidden: true,
              check: { prompt: "New Audit Bureau mean (weeks)", answer: 5.167, unit: "weeks", tolerance: { abs: 0.01 } },
            },
            { md: md`New total mean: $4.667 + 5.167 + 4.333 + 2.167 = 16.33$ weeks. Variance $1.778 + 0.694 + 1.000 + 0.250 = 3.722$, $\sigma = 1.929$.` },
            {
              md: md`New P80: $16.33 + 0.8416 \times 1.929 = 17.96$ weeks.`,
              hidden: true,
              check: { prompt: "New P80 (weeks)", answer: 17.96, unit: "weeks", tolerance: { abs: 0.05 } },
            },
            { md: md`P80 improvement: $20.73 - 17.96 = 2.8$ weeks. For a 1.1 GW plant at ~KWD 1.3 m per week of displaced fuel (m00-l05), that is worth roughly **KWD 3.6 m**.` },
          ],
          result: md`Pre-clearing one file cut the P80 by ~2.8 weeks and shrank uncertainty by over a quarter. Reducing variance is often worth more than shaving the most-likely value.`,
        },
        {
          kind: "question",
          question: {
            id: "m11-l05-p1",
            type: "numeric",
            prompt: md`A re-tender step is estimated at a = 3, m = 6, b = 21 months (the pessimistic case includes another cancellation). What is its PERT mean duration in months?`,
            answer: 8,
            tolerance: { abs: 0.05 },
            unit: "months",
            explanation: md`$t_e = (3 + 4 \times 6 + 21)/6 = 48/6 = 8$ months, with $\sigma = (21-3)/6 = 3$ months. The long right tail pulls the mean 2 months above the most-likely value — typical of Kuwaiti re-tenders.`,
            concepts: ["m11.pert-approvals"],
            difficulty: 1,
          },
        },
        { kind: "widget", widget: "cpm-gantt", caption: "Add approval steps as activities in the project network and see whether they, rather than construction, form the critical path." },
      ],
    },
    {
      layer: "field",
      title: "Delay management in practice",
      blocks: [
        {
          kind: "callout",
          tone: "pitfall",
          title: "Common delay traps",
          md: md`1. **Treating approvals as admin** — not in the schedule, no float. 2. **Escalating without facts** — senior officials ask "who has it, since when, what's missing?". 3. **Accepting deadline extensions without a revised schedule** — the whole programme shifts silently. 4. **Letting bid validity lapse** — bidders reprice or walk. 5. **Re-tendering by reflex** — a re-tender costs months (and may attract fewer bidders); test whether clarification or a compliant award is possible first. 6. **Bypassing the chain** to "save time" — the file returns.`,
        },
        {
          kind: "checklist",
          title: "Weekly delay-control routine",
          items: [
            "Update the referral register: each file's holder, days held, next action, follow-up date.",
            "Compare approval progress against P50/P80 dates; flag any step beyond P80.",
            "Check bid validity and guarantee expiry dates against the P90 approval date.",
            "Check upcoming committee cut-offs (next 6 weeks) and file readiness for each.",
            "Recompute delay cost (KWD/day) for any critical-path slip and include it in the status note.",
            "Log decisions needed from leadership with a requested date.",
          ],
        },
        {
          kind: "ask",
          title: "Questions experienced PMs ask",
          items: [
            "What exactly is missing from the file, and who can provide it by when?",
            "When is the next meeting, and what is the submission cut-off?",
            "What did the reviewer observe on the last similar file, and have we pre-empted it?",
            "If this slips to the next meeting, does it push signature past bid validity or COD past next summer?",
            "Can any downstream step proceed lawfully in parallel while this approval is pending?",
          ],
        },
        {
          kind: "bilingual",
          title: "Request to bidders for extension of bid validity",
          en: md`**Ref.:** [ ] — **Date:** [ ]
**To:** [Bidder], Authorised Representative
**Subject:** Tender/RFP No. [ ] — Request for Extension of Bid Validity and Bid Guarantee

Dear Sir/Madam,

As the approval procedures for the above tender are still in progress, we kindly request that you extend the validity of your bid, together with the bid guarantee, for an additional period of [90] days, until [date], **without any change to the price or other terms of your bid**.

Please confirm your acceptance in writing and submit the amended bid guarantee no later than [date]. A bidder who declines may withdraw without forfeiting its bid guarantee, in accordance with the tender conditions.

Yours faithfully,`,
          ar: `**الإشارة:** [ ] — **التاريخ:** [ ]
**إلى:** السادة/ [اسم المناقص] – الممثل المفوض المحترمين
**الموضوع:** المناقصة/طلب العروض رقم [ ] — طلب تمديد صلاحية العطاء والكفالة الأولية

تحية طيبة وبعد،

نظراً لاستمرار إجراءات الاعتماد الخاصة بالمناقصة المشار إليها أعلاه، نرجو التكرم بتمديد صلاحية عطائكم والكفالة الأولية المرفقة به لمدة إضافية قدرها [90] يوماً، حتى تاريخ [التاريخ]، **دون أي تغيير في السعر أو في أي من شروط العطاء**.

يرجى تأكيد موافقتكم كتابياً وتقديم الكفالة المعدّلة في موعد أقصاه [التاريخ]. ويحق للمناقص الذي لا يرغب في التمديد سحب عطائه دون مصادرة الكفالة الأولية، وفقاً لشروط المناقصة.

وتفضلوا بقبول فائق الاحترام،`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Withdrawal without forfeiture",
          md: md`The template's last sentence reflects common international practice (World Bank-style conditions). Whether Kuwaiti tender conditions grant the same right on a validity-extension request must be checked in the specific tender booklet or RFP.`,
        },
        { kind: "scenario", scenario: "m11-s5" },
        { kind: "scenario", scenario: "m11-s6" },
        {
          kind: "feynman",
          prompt: "Explain to a newly arrived project director from abroad why 'approvals' should be modelled as schedule activities with uncertainty, and what you do each week to keep them moving.",
          keyPoints: [
            "Kuwaiti approvals (Higher Committee, Audit Bureau, Fatwa, CAPT) are sequential gates with real durations and return risk.",
            "Three-point estimates give a mean and P80; the variance shows where to act.",
            "Bid validity, committee calendars and fiscal-year budgets interact with approval dates.",
            "Weekly routine: referral register, P80 tracking, validity dates, cut-offs, delay-cost reporting.",
            "Countermeasures are lawful: pre-clearance, parallel preparation, standard documents, formal escalation with numbers.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m11-l05-q1",
      type: "numeric",
      prompt: md`An approval step has a = 3, m = 5, b = 13 weeks. What is its PERT mean (weeks)?`,
      answer: 6,
      tolerance: { abs: 0.01 },
      unit: "weeks",
      explanation: md`$(3 + 20 + 13)/6 = 36/6 = 6$ weeks; $\sigma = 10/6 = 1.67$ weeks.`,
      concepts: ["m11.pert-approvals"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m11-l05-q2",
      type: "multi",
      prompt: md`Which delays are documented in the research for Kuwaiti power procurements? (Select all.)`,
      options: [
        "Zone 1 RFP deadline extended from September 2025 to January 2026",
        "Al-Khairan Phase 1 bid deadline extended three times",
        "Zone 1 award expectation slipping from June 2026 to Q3 2026",
        "AZN 2&3 ECWPA delayed by four years",
        "KNPC Dibdibah tender cancelled and re-procured through KAPP",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`AZN 2&3 moved from letter agreement (Aug 2025) to ECWPA (Feb 2026) in about six months — fast by Kuwaiti standards.`,
      concepts: ["m11.delay-causes"],
      difficulty: 1,
    },
    {
      id: "m11-l05-q3",
      type: "mcq",
      prompt: md`Your approval chain has steps with standard deviations 1.0, 2.5, 0.8 and 0.5 weeks. Which step should you attack first to tighten P80?`,
      options: ["The 1.0-week step", "The 2.5-week step", "The 0.8-week step", "The 0.5-week step"],
      answer: 1,
      explanation: md`Variance contributions: 1.0, 6.25, 0.64, 0.25 — the 2.5-week step contributes ~76% of total variance.`,
      concepts: ["m11.pert-approvals"],
      difficulty: 2,
    },
    {
      id: "m11-l05-q4",
      type: "decision",
      prompt: md`A conventional MEWRE tender received only one compliant bid, 18% above the estimate. Re-tendering would take an estimated 6–9 months. The works are on the critical path for a 500 MW IPP's grid connection. What do you recommend?`,
      options: [
        { text: "Award immediately to avoid delay.", score: 0.3, feedback: "Possible, but a single bid 18% over estimate needs a price-reasonableness justification the Audit Bureau will accept; without it the award may be returned anyway." },
        { text: "Prepare a decision memo comparing (a) award with a benchmarked price justification and the legal basis for a single-bid award, versus (b) re-tender, including the cost of delay (deemed-energy exposure and fuel) for 6–9 months; seek legal affairs' view and let the authorised official decide.", score: 1, feedback: "Correct: quantify both options, check legality, and route the decision properly." },
        { text: "Cancel and re-tender automatically.", score: 0.3, feedback: "Re-tendering by reflex can cost far more than the 18% premium once delay costs are counted." },
        { text: "Negotiate the price down with the single bidder.", score: 0.4, feedback: "Only if the tender rules permit negotiation in single-bid situations — confirm with legal affairs first." },
      ],
      explanation: md`The PM's value is turning a procedural dilemma into a quantified, lawful decision for the authorised official.`,
      concepts: ["m11.retender-decision", "m11.delay-countermeasures"],
      difficulty: 3,
    },
    {
      id: "m11-l05-q5",
      type: "order",
      prompt: md`Order an effective escalation for a stalled approval.`,
      items: [
        "Check the referral register and confirm who holds the file and since when",
        "Ask the holder (through the proper channel) exactly what is missing",
        "Supply the missing items with a compliance matrix",
        "If still stalled, send a one-page note to your Director with delay cost per day and the decision needed",
        "Director raises it at the appropriate level with the facts",
      ],
      explanation: md`Escalate only after the facts are established and your own side's gaps are closed; escalate with numbers.`,
      concepts: ["m11.delay-countermeasures"],
      difficulty: 2,
    },
    {
      id: "m11-l05-q6",
      type: "short",
      prompt: md`List four lawful moves that can shorten the time between preferred-bidder selection and PPA signature on a KAPP IPP.`,
      rubric: [
        "Pre-clear the Audit Bureau/Fatwa files with compliance matrices (reduce return probability).",
        "Prepare the next approval's file in parallel while the current approval is pending.",
        "Plan submissions against the Higher Committee/cabinet calendar cut-offs.",
        "Resolve lender/government term conflicts (bankability) before or early in the RFP.",
        "Manage bid validity and guarantee extensions early.",
        "Use standard templates; minimise bespoke clauses.",
      ],
      modelAnswer: "First, pre-clear the Audit Bureau and Fatwa files using compliance matrices built from past observations, to cut return probability. Second, prepare each next file in parallel, e.g. draft the Audit Bureau submission while the Higher Committee item is pending. Third, plan submissions backwards from the Higher Committee and cabinet meeting cut-offs, avoiding Ramadan and summer gaps. Fourth, settle bankability conflicts such as currency, termination and grid-delay terms with lenders before or early in the RFP, so they don't surface post-selection — and track bid validity so no extension crisis forces repricing.",
      explanation: md`All four reduce either the expected duration or its variance without bypassing any control body.`,
      concepts: ["m11.delay-countermeasures"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m11-l05-f1", front: "PERT mean and sd", back: md`$t_e = (a + 4m + b)/6$, $\sigma = (b - a)/6$.`, concepts: ["m11.pert-approvals"] },
    { id: "m11-l05-f2", front: "P80 of a chain (normal approx.)", back: md`$P80 \approx \mu + 0.84\,\sigma$; $P90 \approx \mu + 1.28\,\sigma$ with $\sigma^2 = \sum \sigma_i^2$.`, concepts: ["m11.pert-approvals"] },
    { id: "m11-l05-f3", front: "Which approval step to attack first", back: "The one contributing the most variance, not necessarily the longest mean.", concepts: ["m11.pert-approvals"] },
    { id: "m11-l05-f4", front: "Zone 1 RFP deadline history", back: "14 Sep 2025 → 15 Jan 2026.", concepts: ["m11.delay-causes"] },
    { id: "m11-l05-f5", front: "Al-Khairan Phase 1 bidding", back: "RFP 31 Aug 2025; three extensions to 31 May 2026; two bids 1 Jun 2026.", concepts: ["m11.delay-causes"] },
    { id: "m11-l05-f6", front: "Kuwaiti power tenders cancelled before award", back: "KNPC Dibdibah EPC+F (moved to KAPP Phase III); Abdaliya ISCC (KAPP cancelled).", concepts: ["m11.retender-decision"] },
    { id: "m11-l05-f7", front: "Five lawful delay countermeasures", back: "Approval calendar; pre-cleared files; parallel preparation; bid-validity management; escalation with delay-cost numbers.", concepts: ["m11.delay-countermeasures"] },
    { id: "m11-l05-f8", front: "Bid validity rule of thumb", back: "Validity (plus extensions) must cover the P90 approval date with margin; request extensions early and formally.", concepts: ["m11.delay-countermeasures"] },
  ],
  scenarios: [
    {
      id: "m11-s5",
      title: "Bid validity versus the Audit Bureau",
      dayInLife: true,
      context: md`Zone 2-type IPP. The preferred bidder's validity expires in 30 days. The Higher Committee approved the award last week; the Audit Bureau file has not yet been submitted because the offtaker's budget-provision letter for PPA payments (from COD) is still with the finance department. Your P80 for Audit Bureau review is 7 weeks.`,
      start: "a",
      concepts: ["m11.delay-countermeasures", "m11.pert-approvals"],
      nodes: {
        a: {
          md: md`What is your first action today?`,
          choices: [
            { text: "Ask KAPP to issue a formal validity-extension request to the preferred bidder (and reserve bidder) now, and get the finance department's budget-provision letter signed this week by escalating with the delay-cost numbers.", next: "b", score: 10, feedback: "Both critical items attacked at once: validity and the missing document." },
            { text: "Submit the Audit Bureau file without the budget letter to save time.", next: "c", score: 2, feedback: "An incomplete file will be returned; you lose more time than you save." },
            { text: "Hope the Bureau is fast.", next: "c", score: 0, feedback: "P80 is 7 weeks; validity is 30 days. Hope is not a plan." },
          ],
        },
        b: {
          md: md`The bidder agrees to extend by 90 days but asks to "update module prices" as a condition.`,
          choices: [
            { text: "Reply through KAPP that extensions must be without any change to price or terms per the tender conditions; if they decline, consider the reserve bidder as the RFP allows.", next: "d", score: 10, feedback: "Holds the line on equal treatment; a conditional extension would be a post-bid price change." },
            { text: "Accept a 2% price increase to keep the bidder.", next: "d", score: 1, feedback: "A post-bid price change undermines the competition and will likely be rejected at the Audit Bureau." },
          ],
        },
        c: {
          md: md`The Bureau returns the file for the missing budget letter after three weeks. Validity now expires in 9 days.`,
          choices: [
            { text: "Urgent formal extension request via KAPP plus the missing letter; brief your Director honestly.", next: "d", score: 3, feedback: "Recovery is possible, but the bidder now has leverage." },
          ],
        },
        d: {
          md: md`The extension is secured without price change. How do you prevent a repeat on the next project?`,
          choices: [
            { text: "Add 'budget-provision letter for PPA payments' and 'validity vs P90' to the standard pre-award checklist, and start the letter at RFP issue.", score: 10, feedback: "Lessons learned turned into process." },
            { text: "Move on; it worked out.", score: 3, feedback: "The same gap will recur." },
          ],
        },
      },
    },
    {
      id: "m11-s6",
      title: "The committee deferral and the summer",
      context: md`It is late May. A KD 9 m grid-reinforcement contract needed for a PV plant's export must be signed by mid-July for energisation works in November–March. The tender committee deferred your award recommendation, asking for "additional justification of the technical evaluation". Many senior officials will be on leave from mid-July to late August.`,
      start: "a",
      concepts: ["m11.delay-causes", "m11.delay-countermeasures"],
      nodes: {
        a: {
          md: md`How do you respond to the deferral?`,
          choices: [
            { text: "Within days, submit a supplementary technical memo addressing the committee's question point by point (criteria, scores, evidence, OE review), and ask the secretariat for the earliest meeting date and the acting signatories for July–August.", next: "b", score: 10, feedback: "Fast, targeted response plus calendar management for the leave period." },
            { text: "Ask the OE to rewrite the whole evaluation report.", next: "b", score: 5, feedback: "Responsive but slow and may introduce inconsistencies; answer the specific question." },
            { text: "Wait until September when everyone is back.", next: "c", score: 1, feedback: "You lose the winter energisation window — a year's delay." },
          ],
        },
        b: {
          md: md`The committee approves in mid-June. The Audit Bureau file must now be submitted.`,
          choices: [
            { text: "Submit the pre-cleared file the same week (prepared in parallel), confirm acting signatories for July–August, and pre-book contract signature logistics.", score: 10, feedback: "Parallel preparation pays off; the leave period is covered." },
            { text: "Start preparing the Audit Bureau file now.", score: 4, feedback: "You should have prepared it during the committee review." },
          ],
        },
        c: {
          md: md`In September the contractor reprices due to the expired validity.`,
          choices: [
            { text: "Re-evaluate or re-tender per legal advice, and reschedule energisation to the next winter.", score: 2, feedback: "A costly year lost — the delay-cost of a 1 GW-class plant is millions of KWD per month." },
          ],
        },
      },
    },
  ],
};

export default lesson;
