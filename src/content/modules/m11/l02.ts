import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m11-l02",
  title: "Tendering Process and Bid Evaluation",
  summary:
    "From prequalification to award: tender documents, bid bonds, clarifications and addenda, public bid opening, and the evaluation methods you will meet — lowest compliant price (CAPT), two-envelope technical-then-financial opening (KAPP), quality-and-cost scoring (consultancy), and levelized-tariff comparison for IPPs.",
  minutes: 80,
  objectives: [
    "You can lay out the sequence of a Kuwaiti tender and a KAPP IPP procurement, naming the documents and guarantees at each step.",
    "You can choose an evaluation method for a given procurement and defend the choice.",
    "You can compute levelized tariffs for escalating bids and show why the lowest first-year tariff may not be the cheapest.",
    "You can run a quality-and-cost-based (QCBS) evaluation and test its sensitivity to the weighting.",
    "You can draft a compliant clarification request to bidders in English and Arabic.",
  ],
  concepts: [
    { id: "m11.tender-sequence", name: "Tender sequence and documents", description: "Prequalification (RFQ), tender documents/RFP, clarifications and addenda, bid submission with bid bond, public opening, evaluation, award, final guarantee, contract.", competency: "procurement", related: ["m11.evaluation-methods"] },
    { id: "m11.bid-guarantees", name: "Bid and performance guarantees", description: "Initial (bid) guarantee accompanying the bid (Art. 45 reported) and final guarantee of at least 10% of contract value (Art. 65 reported); forfeiture if the winner refuses to sign.", competency: "contracts", related: ["m11.tender-sequence"] },
    { id: "m11.evaluation-methods", name: "Evaluation methods", description: "Lowest technically compliant price; two-envelope (technical pass/score, then price); QCBS weighted scoring; levelized tariff for IPPs.", competency: "procurement", related: ["m11.levelized-tariff", "m11.qcbs"] },
    { id: "m11.levelized-tariff", name: "Levelized tariff comparison", description: "Discounted average tariff over the PPA term accounting for escalation and energy profile; the fair basis to compare IPP bids.", competency: "finance", related: ["m11.evaluation-methods"] },
    { id: "m11.qcbs", name: "Quality- and cost-based selection (QCBS)", description: "Combined score = w_T × technical + w_F × financial, with financial score = 100 × lowest price / price; weights decide the winner.", competency: "procurement", related: ["m11.evaluation-methods"] },
    { id: "m11.clarifications", name: "Clarifications and evaluation integrity", description: "Written, equal-treatment clarifications that cannot change price or substance; confidentiality and conflict-of-interest rules for evaluators.", competency: "procurement", related: ["m11.tender-sequence"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "From RFQ to award",
      blocks: [
        {
          kind: "md",
          md: md`## The sequence

| Step | Conventional tender (CAPT) | IPP (KAPP) — Zone 1 example |
|---|---|---|
| 1. Prequalification | Contractor registration/classification; sometimes a prequalification round | **RFQ** Jan 2024; responses due 7 Mar 2024; **6 prequalified** |
| 2. Tender documents | Tender booklet: instructions, conditions, specs, BOQ, forms | **RFP** ~Jun 2025: development, financing, design, construction, O&M incl. 400 kV substation; draft 30-yr PPA |
| 3. Clarifications/addenda | Written questions; answers issued to all bidders | Deadline extended 14 Sep 2025 → **15 Jan 2026** |
| 4. Submission | Sealed bid + **initial (bid) guarantee** | 3 consortium bids, 15 Jan 2026 |
| 5. Opening | Public opening, prices read out | **Technical** envelopes first; **financial** envelopes opened ~Jul 2026 |
| 6. Evaluation | Technical compliance, then lowest price | Technical evaluation, then tariff comparison |
| 7. Award | CAPT decision → Audit Bureau → contract + **final guarantee** | Preferred bidder (Masdar + Fouad AlGhanim reported ~Aug 2026) → Higher Committee → Audit Bureau → PPA |

Kuwaiti tenders are typically awarded to the **lowest price once technical compliance is established**. Under the law as described by a Kuwaiti academic source, the **initial guarantee must accompany the bid**, unconditional and in favour of the agency (Art. 45), and the winner provides a **final guarantee of not less than 10% of the contract value** (Art. 65; executive regulations Art. 42). The US Commercial Guide notes that if the winner refuses to sign, the bid bond (and performance bond, 5–10%) can be confiscated.`,
        },
        { kind: "sources", refs: ["m11-meed-2024-01-zone1", "m11-sq-2024-01-zone1", "m11-pvmag-2025-06-zone1", "m11-agbi-2025-06-zone1", "m11-taiyang-zone1-rfp", "m11-meed-2026-zone1-bids", "m11-timeskuwait-2026-fin", "m11-meed-2026-08-zone1", "m11-trade-gov-public", "m11-kilaw-guarantees"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "Guarantee percentages",
          md: md`**Unknown:** the initial (bid) guarantee percentage under Law 49/2016 and its regulations (not found); confirmation of the 10% final guarantee article numbers (single academic source). KAPP RFPs set their own bid-bond amounts (not public). **How to verify:** the Arabic text of Law 49/2016 and its executive regulations; the tender booklet of a recent MEWRE tender; KAPP RFP instructions to bidders.`,
        },
        {
          kind: "md",
          md: md`## Guarantees: the arithmetic

A bid guarantee is a percentage of the bid price, sized to make withdrawal painful but not to exclude smaller bidders:`,
        },
        { kind: "equation", formula: "m11-guarantee" },
        {
          kind: "md",
          md: md`Illustration: on the 400 kV line, the lowest bid was about KD 41.45 m (L&T, April 2025); a hypothetical 2% bid bond would be KD 0.83 m. The final award was KD 48.6 m to Power Grid Company (Kuwait); a 10% final guarantee would be KD 4.86 m. (Neither the actual bond rates nor the reason the award did not go to the lowest bidder was found — a reminder that "lowest price" applies only among technically compliant bids, and that other factors, e.g. compliance or preference rules, can change the ranking.)`,
        },
        { kind: "sources", refs: ["m11-gulfbase-2025-ohtl", "m11-megaproject-ohtl", "m11-meed-ohtl"] },
        {
          kind: "md",
          md: md`## Evaluation methods

**1. Lowest technically compliant price** (CAPT default). Technical evaluation is pass/fail against mandatory requirements; among compliant bids, lowest evaluated price wins. Simple and auditable; weak where quality varies a lot (consultancy) or where costs extend over decades (IPPs).

**2. Two-envelope.** Technical and financial proposals in separate sealed envelopes. Technical envelopes are opened and evaluated first (pass/fail or scored); only bidders who pass have their financial envelopes opened. Used by KAPP: Zone 1 technical envelopes in January 2026, financial opened around July 2026. The separation prevents price from biasing technical judgement.

**3. QCBS (scoring).** Common for consultancy (Owner's Engineer, transaction advisers). Each bid gets a technical score $S_T$ and a financial score; the combined score decides:`,
        },
        { kind: "equation", formula: "m11-financial-score" },
        { kind: "equation", formula: "m11-qcbs" },
        {
          kind: "md",
          md: md`**4. Levelized tariff (IPPs).** Bidders quote a tariff (fils/kWh or US¢/kWh) that may escalate. A flat 4.20 and an escalating 3.90 cannot be compared by their first-year values. The fair comparison discounts payments and energy over the PPA term:`,
        },
        { kind: "equation", formula: "m11-levelized-tariff" },
        {
          kind: "callout",
          tone: "why",
          title: "Why discount energy as well as money?",
          md: md`The levelized tariff is the **constant** tariff that would give the offtaker the same present value of payments for the same energy. Discounting only the payments would produce a PV in KWD, not a tariff; dividing by discounted energy turns it back into fils/kWh. If energy is constant, the energy terms simplify, but with degradation or a ramp-up they matter.`,
        },
        { kind: "widget", widget: "tariff-eval", caption: "Enter three IPP bids with different first-year tariffs and escalation rates; vary the discount rate and the technical weighting and watch the ranking change." },
        {
          kind: "md",
          md: md`## Clarifications and integrity

Rules of good practice (OECD, World Bank; mirrored in Kuwaiti practice):

- **Before submission:** bidder questions answered **in writing to all bidders**, without revealing who asked; material changes issued as **addenda**, with deadline extensions if needed (Zone 1 and Zone 2 deadlines were each extended).
- **After opening:** clarifications may **not** change price or the substance of the bid. You may ask a bidder to confirm an ambiguity or correct an obvious arithmetic error per the stated rule; you may not invite improvements.
- **Evaluators:** sign conflict-of-interest and confidentiality declarations; scores are individual first, then moderated; reasons recorded.
- **Bid validity:** watch expiry; long approval chains may require extension requests, which can change bidders' pricing.

Ambiguity is costly in Kuwait specifically because every bidder question becomes an addendum, and every addendum risks a deadline extension.`,
        },
        { kind: "sources", refs: ["m11-oecd-integrity", "m11-wb-procurement", "m11-irena-auctions", "m11-zawya-2026-zone2-ext"] },
      ],
    },
    {
      layer: "applied",
      title: "Evaluating bids",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Levelizing three hypothetical IPP tariff bids",
          given: md`Hypothetical bids (not real Kuwait bids) for a 30-year solar PPA with constant annual energy; discount rate 7%:

| Bid | Year-1 tariff (fils/kWh) | Escalation |
|---|---|---|
| A | 4.20 | 0%/yr |
| B | 3.90 | 1.5%/yr |
| C | 4.00 | 0.5%/yr |`,
          steps: [
            { md: md`With constant energy, $T_{\text{lev}} = \dfrac{\sum_t T_1 (1+g)^{t-1}(1+r)^{-t}}{\sum_t (1+r)^{-t}}$.` },
            { md: md`A (flat): $T_{\text{lev}} = 4.20$ fils/kWh.` },
            { md: md`B: computing the sums over $t = 1..30$ gives $T_{\text{lev}} = 4.541$ fils/kWh.` },
            { md: md`C: $T_{\text{lev}} = 4.203$ fils/kWh.` },
            { md: md`Ranking: A (4.200) ≈ C (4.203) < B (4.541). The bid with the **lowest year-1 tariff is the most expensive**. A and C are within 0.1%: a technical tie-break or sensitivity (at 5% discount C = 4.229 vs A = 4.200) matters.` },
          ],
          result: md`Always evaluate on a levelized basis with the RFP-stated discount rate. RFPs should fix the discount rate, energy profile and indexation assumptions in advance so the evaluation is mechanical and auditable.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "QCBS for an Owner's Engineer: does the weighting decide?",
          given: md`Three consultancy bids. Technical scores: X 88, Y 75, Z 92. Prices: X KWD 1.20 m, Y KWD 0.95 m, Z KWD 1.40 m. Evaluate at 70/30 and at 80/20 (technical/financial).`,
          steps: [
            { md: md`Financial scores ($100 \times P_{\min}/P_i$, $P_{\min} = 0.95$): X 79.17, Y 100, Z 67.86.` },
            { md: md`70/30: X $= 0.7\times88 + 0.3\times79.17 = 85.35$; Y $= 0.7\times75 + 0.3\times100 = 82.50$.` },
            {
              md: md`70/30: Z $= 0.7\times92 + 0.3\times67.86 = 84.76$. Winner: **X**.`,
              hidden: true,
              check: { prompt: "Combined score of Z at 70/30", answer: 84.76, tolerance: { abs: 0.05 } },
            },
            {
              md: md`80/20: X $= 86.23$, Y $= 80.00$, Z $= 0.8\times92 + 0.2\times67.86 = 87.17$. Winner: **Z**.`,
              hidden: true,
              check: { prompt: "Combined score of Z at 80/20", answer: 87.17, tolerance: { abs: 0.05 } },
            },
          ],
          result: md`Moving from 70/30 to 80/20 flips the winner from X to Z. Weights must be fixed in the tender documents **before** bids are opened and justified by the nature of the service — for an OE on a GW-scale IPP, quality usually deserves 80% or more.`,
        },
        {
          kind: "question",
          question: {
            id: "m11-l02-p1",
            type: "numeric",
            prompt: md`A fourth hypothetical bid D offers 3.80 fils/kWh in year 1, escalating 2%/yr for 30 years, constant energy, discount rate 7%. What is its levelized tariff (fils/kWh)? (Use a spreadsheet or the formula; answer to 2 decimals.)`,
            answer: 4.667,
            tolerance: { abs: 0.01 },
            unit: "fils/kWh",
            explanation: md`$T_{\text{lev}} = 3.80 \times \dfrac{\sum_{t=1}^{30} 1.02^{t-1}/1.07^t}{\sum_{t=1}^{30} 1/1.07^t} \approx 4.667$ fils/kWh — the most expensive of A–D despite the lowest headline. Escalation of 2%/yr over 30 years raises the final-year tariff to $3.80 \times 1.02^{29} \approx 6.75$ fils.`,
            concepts: ["m11.levelized-tariff"],
            difficulty: 3,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running a clean evaluation",
      blocks: [
        {
          kind: "md",
          md: md`**Roles.** For MEWRE tenders the ministry's technical evaluation committee (often supported by the OE) evaluates; CAPT owns the procedure and award; legal affairs reviews deviations. For KAPP IPPs, KAPP and its transaction advisers (technical, legal, financial) run the evaluation; **MEWRE's offtaker team contributes technical and PPA-deviation input** — that is where you sit.

**Tools.** A locked evaluation workbook (levelized tariff calculator with the RFP's stated discount rate and indexation; compliance matrix per requirement; deviation register with legal classification: acceptable / clarify / non-compliant), version-controlled and access-restricted.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong in evaluations",
          md: md`1. **Weights or discount rate decided after opening** — fatal to fairness and audit. 2. **Clarifications that let a bidder fix a non-compliance** — unequal treatment. 3. **Deviations buried in cover letters** ("subject to lenders' approval") — make the bid conditional; every qualification must be in the deviation register. 4. **Unrealistically low bids** not tested for deliverability. 5. **Leaks** of prices or scores before award. 6. **Inconsistent bid counts** in public reporting (Zone 2: two vs three) — keep the official opening minutes as the single source of truth.`,
        },
        {
          kind: "checklist",
          title: "Evaluation committee checklist",
          items: [
            "Method, weights, discount rate, indexation and tie-break rules fixed in the tender documents.",
            "Conflict-of-interest and confidentiality declarations signed by every evaluator and adviser.",
            "Bid opening minutes signed, listing bidders, bid bonds and (where applicable) prices read out.",
            "Compliance matrix completed for each bid; deviations classified with legal input.",
            "Clarification requests written, numbered, sent through the official channel, with deadlines; no price changes.",
            "Arithmetic checks and levelized-tariff calculations independently reproduced by a second evaluator.",
            "Bid validity expiry dates tracked against the approval schedule.",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask bidders (through formal clarification only)",
          items: [
            "Please confirm that your tariff is unconditional and not subject to lenders' or board approvals beyond those listed in the RFP.",
            "Please confirm the escalation basis and index applied to the tariff in your financial proposal form.",
            "Please confirm the guaranteed energy, degradation and availability figures used in your proposal for the first five years.",
            "Please confirm that the proposed module and inverter suppliers are those listed in your technical proposal, or identify alternatives.",
            "Please confirm your local-content commitments and the Kuwaiti entities that will deliver them.",
          ],
        },
        {
          kind: "bilingual",
          title: "Clarification request to a bidder (after bid opening)",
          en: md`**Ref.:** [Ministry ref. no.] — **Date:** [date]
**To:** [Bidder name], Authorised Representative
**Subject:** Tender No. [ ] — [Project name] — Request for Clarification No. [ ]

Dear Sir/Madam,

In the course of evaluating your bid for the above tender, the Evaluation Committee requests clarification of the following points:

1. Section [x] of your technical proposal states [quote]. Please confirm whether [specific question].
2. Your financial proposal form shows [item]. Please confirm the arithmetic basis of [item] without altering the bid price.

This request does not permit any change to the price or the substance of your bid. Please submit your written response to [address/portal] no later than [date, time]. Responses received after this deadline, or that alter the bid, will not be considered.

Yours faithfully,
[Name], Chairman, Technical Evaluation Committee`,
          ar: `**الإشارة:** [رقم الوزارة] — **التاريخ:** [التاريخ]
**إلى:** السادة/ [اسم المناقص] – الممثل المفوض المحترمين
**الموضوع:** المناقصة رقم [ ] — [اسم المشروع] — طلب استيضاح رقم [ ]

تحية طيبة وبعد،

في إطار دراسة العطاء المقدم منكم في المناقصة المشار إليها أعلاه، تطلب لجنة التقييم الفني استيضاح النقاط التالية:

1. ورد في البند [x] من العرض الفني ما يلي: [النص]. يرجى تأكيد [السؤال المحدد].
2. يتضمن نموذج العرض المالي [البند]. يرجى توضيح الأساس الحسابي لـ [البند] دون أي تعديل على قيمة العطاء.

ولا يجيز هذا الطلب إجراء أي تعديل على السعر أو على جوهر العطاء. يرجى تقديم ردكم كتابياً إلى [العنوان/البوابة] في موعد أقصاه [التاريخ والساعة]، ولن يُعتد بأي رد يرد بعد هذا الموعد أو يتضمن تعديلاً على العطاء.

وتفضلوا بقبول فائق الاحترام،
[الاسم]، رئيس لجنة التقييم الفني`,
        },
        { kind: "scenario", scenario: "m11-s2" },
        {
          kind: "feynman",
          prompt: "Explain to a ministry finance official why the IPP bid with the lowest first-year tariff might lose, and why that is fair.",
          keyPoints: [
            "IPP tariffs run 30 years and may escalate; first-year price is not total cost.",
            "Levelized tariff discounts payments and energy over the term to a constant equivalent tariff.",
            "An escalating bid (e.g. 3.90 at 1.5%/yr) can be more expensive than a flat 4.20 at a 7% discount rate.",
            "The RFP fixes the discount rate and method in advance, so the comparison is mechanical and auditable.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m11-l02-q1",
      type: "mcq",
      prompt: md`In a two-envelope procurement, when are financial proposals opened?`,
      options: [
        "At the same public session as technical proposals",
        "Only for bidders who pass the technical evaluation, after it is complete",
        "Before technical proposals, to shortlist the cheapest",
        "Only for the top-ranked technical bidder",
      ],
      answer: 1,
      explanation: md`Technical first, then financial for those who pass — as KAPP did for Zone 1 (technical January 2026, financial ~July 2026). This keeps price from biasing technical scoring.`,
      concepts: ["m11.evaluation-methods"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m11-l02-q2",
      type: "numeric",
      prompt: md`Technical score 82, price KWD 1.10 m; lowest price among bids KWD 0.88 m. With weights 75/25, what is the combined score?`,
      answer: 81.5,
      tolerance: { abs: 0.05 },
      explanation: md`$S_F = 100 \times 0.88/1.10 = 80$. Combined $= 0.75 \times 82 + 0.25 \times 80 = 61.5 + 20 = 81.5$.`,
      concepts: ["m11.qcbs"],
      difficulty: 2,
    },
    {
      id: "m11-l02-q3",
      type: "mcq",
      prompt: md`Two IPP bids: flat 4.20 fils/kWh vs 3.90 fils/kWh escalating 1.5%/yr for 30 years, discount rate 7%. Which is cheaper for the offtaker?`,
      options: ["The 3.90 escalating bid", "The flat 4.20 bid", "They are identical", "Cannot be compared"],
      answer: 1,
      explanation: md`The escalating bid levelizes to ~4.54 fils/kWh, above 4.20. The flat bid is cheaper.`,
      concepts: ["m11.levelized-tariff"],
      difficulty: 2,
    },
    {
      id: "m11-l02-q4",
      type: "order",
      prompt: md`Order the steps of a Kuwaiti conventional tender.`,
      items: [
        "Tender documents issued",
        "Written clarifications and addenda to all bidders",
        "Sealed bids submitted with initial guarantee",
        "Public bid opening",
        "Technical evaluation and lowest compliant price",
        "Award decision and Audit Bureau prior review",
        "Contract signature with final guarantee",
      ],
      explanation: md`The final guarantee (reported ≥10%) replaces the bid guarantee at contract signature; Audit Bureau review precedes signature.`,
      concepts: ["m11.tender-sequence", "m11.bid-guarantees"],
      difficulty: 1,
    },
    {
      id: "m11-l02-q5",
      type: "decision",
      prompt: md`After opening, the lowest bidder's cover letter says its price is "subject to final confirmation of module prices". The second-lowest is 3% higher and unconditional. What does the committee do?`,
      options: [
        { text: "Ask the lowest bidder to remove the condition and keep its price.", score: 0.3, feedback: "Inviting a bidder to cure a material qualification after opening is unequal treatment; it may be permissible only if the rules allow clarification of non-material items." },
        { text: "Record the qualification as a material deviation, seek legal affairs' view, and if confirmed treat the bid as non-compliant per the tender rules; evaluate the remaining compliant bids.", score: 1, feedback: "Correct: a price subject to confirmation is not a firm offer. Follow the rules and document the legal view." },
        { text: "Ignore the cover letter; the price form is what counts.", score: 0.2, feedback: "Cover-letter qualifications are part of the bid and can be invoked later." },
        { text: "Negotiate with both bidders for a better price.", score: 0, feedback: "Post-bid negotiation is not part of a public tender and would invalidate the process." },
      ],
      explanation: md`Conditional prices are material deviations. Consistency, documentation and legal advice protect the award from challenge and audit.`,
      concepts: ["m11.clarifications", "m11.evaluation-methods"],
      difficulty: 3,
    },
    {
      id: "m11-l02-q6",
      type: "numeric",
      prompt: md`A contract is awarded at KD 48.6 m. If the final guarantee is 10% of contract value, what is its amount in KD million?`,
      answer: 4.86,
      tolerance: { abs: 0.01 },
      unit: "KD m",
      explanation: md`$0.10 \times 48.6 = 4.86$ KD m. (The ≥10% rule is reported from Art. 65 and executive regulations Art. 42 by a secondary source.)`,
      concepts: ["m11.bid-guarantees"],
      difficulty: 1,
    },
    {
      id: "m11-l02-q7",
      type: "multi",
      prompt: md`Which are acceptable post-opening clarification requests? (Select all.)`,
      options: [
        "Asking a bidder to confirm which index its tariff escalation uses, where the form is ambiguous",
        "Inviting a bidder to reduce its price to match a competitor",
        "Asking a bidder to confirm an obvious arithmetic total per the tender's correction rule",
        "Allowing a bidder to add a missing mandatory performance guarantee",
      ],
      answer: [0, 2],
      explanation: md`Clarifications may resolve ambiguity or apply stated correction rules; they may not change price or cure material omissions.`,
      concepts: ["m11.clarifications"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m11-l02-f1", front: "CAPT default award rule", back: "Lowest price among technically compliant bids.", concepts: ["m11.evaluation-methods"] },
    { id: "m11-l02-f2", front: "Final guarantee (as reported)", back: "Not less than 10% of contract value (Art. 65; exec. regs Art. 42).", concepts: ["m11.bid-guarantees"] },
    { id: "m11-l02-f3", front: "Two-envelope method", back: "Technical opened and evaluated first; financial opened only for technically passing bidders.", concepts: ["m11.evaluation-methods"] },
    { id: "m11-l02-f4", front: "QCBS combined score", back: md`$S = w_T S_T + w_F S_F$, $S_F = 100\,P_{\min}/P_i$.`, concepts: ["m11.qcbs"] },
    { id: "m11-l02-f5", front: "Levelized tariff", back: md`$T_{\text{lev}} = \sum T_t E_t (1+r)^{-t} / \sum E_t (1+r)^{-t}$`, concepts: ["m11.levelized-tariff"] },
    { id: "m11-l02-f6", front: "Golden rule of clarifications", back: "In writing, equal treatment, no change to price or substance.", concepts: ["m11.clarifications"] },
    { id: "m11-l02-f7", front: "Zone 1 envelope timing", back: "Technical bids 15 Jan 2026; financial bids opened ~Jul 2026.", concepts: ["m11.tender-sequence"] },
    { id: "m11-l02-f8", front: "What to fix before opening", back: "Method, weights, discount rate, indexation, tie-break rules — in the tender documents.", concepts: ["m11.evaluation-methods"] },
  ],
  scenarios: [
    {
      id: "m11-s2",
      title: "The evaluation-room phone call",
      dayInLife: true,
      context: md`You are the MEWRE technical member of a ministry evaluation committee for a KD 6 m 132 kV substation extension. Financial envelopes are opened tomorrow. Tonight a senior person from one bidder's Kuwaiti partner calls your mobile "just to see if anything is missing from our technical file".`,
      start: "a",
      concepts: ["m11.clarifications"],
      nodes: {
        a: {
          md: md`How do you respond on the call?`,
          choices: [
            { text: "Politely decline to discuss the tender, say all communication must go through the official channel, end the call, and report the contact to the committee chairman in writing the next morning.", next: "b", score: 10, feedback: "Exactly right: courteous, firm, documented." },
            { text: "Tell them informally that their file is fine.", next: "c", score: 0, feedback: "Any disclosure during evaluation breaches confidentiality and taints the tender." },
            { text: "Hang up and say nothing to anyone.", next: "b", score: 5, feedback: "You avoided disclosure, but undisclosed contact can look like concealment later. Report it." },
          ],
        },
        b: {
          md: md`The chairman thanks you and asks whether you have any relationship with the bidder's partner.`,
          choices: [
            { text: "Disclose that you have met the caller socially at a diwaniya, and offer to abstain if the chairman judges it necessary; record it in the conflict-of-interest register.", score: 10, feedback: "Transparency protects you and the tender. Diwaniya relationships are normal in Kuwait; undisclosed ones are the problem." },
            { text: "Say no, to avoid complications.", score: 2, feedback: "If the relationship emerges later, it will look much worse than a disclosure now." },
          ],
        },
        c: {
          md: md`A competing bidder later complains that the winner "knew things in advance". CAPT opens an inquiry.`,
          choices: [
            { text: "Disclose the call fully and cooperate.", score: 2, feedback: "Necessary now, but the damage is done; the tender may be cancelled." },
          ],
        },
      },
    },
  ],
};

export default lesson;
