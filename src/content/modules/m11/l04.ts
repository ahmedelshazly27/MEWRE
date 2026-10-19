import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m11-l04",
  title: "Approvals, Oversight and Local Content",
  summary:
    "State Audit Bureau prior review and what it checks, the Fatwa and Legislation Department's legal review, national product preference, local-content and agent rules (Law 1/2024, Law 94/2026), the suspended offset programme and investment incentives — with an honest account of what is verified and what is not.",
  minutes: 75,
  objectives: [
    "You can explain what Audit Bureau prior review covers, the reported threshold, and how to assemble a file that passes first time.",
    "You can apply a national-product price preference and an SME margin, and show how the unverified preference rate changes outcomes.",
    "You can test a contractor's compliance with the 30% local-products and 30% local-subcontracting rules reported for Law 94/2026.",
    "You can state the status (and uncertainty) of the offset programme, local agent rules and investment incentives.",
  ],
  concepts: [
    { id: "m11.audit-prior-review", name: "Audit Bureau prior review", description: "Under Law 30/1964 (Arts. 13–14) contracts above a threshold (reported KD 100,000) need the Bureau's prior approval; approvals can be conditional; contracting without approval is a violation.", competency: "procurement", related: ["m11.fatwa-review"] },
    { id: "m11.fatwa-review", name: "Fatwa and Legislation review", description: "Legal review of contract terms and legal opinions for government entities; key for PPAs and lender terms; exact stage in sequences not confirmed.", competency: "procurement", related: ["m11.audit-prior-review"] },
    { id: "m11.national-preference", name: "National product preference and SME margin", description: "Price preference for national products (rate reported as 10%, 15% or 20% — unverified) and a 10% SME margin under Law 94/2026 that cannot be combined with Art. 62 product priority.", competency: "procurement", related: ["m11.local-content"] },
    { id: "m11.local-content", name: "Local content and agents", description: "Foreign contractors source ≥30% locally (reported); Law 94/2026 adds ≥30% products from the PAI Industrial Guide and ≥30% local subcontracting, and bans local/commission agents.", competency: "procurement", related: ["m11.national-preference", "m11.offset-incentives"] },
    { id: "m11.offset-incentives", name: "Offset programme and investment incentives", description: "Historical offset (35% or 30% on civil contracts ≥ KD 10 m, 6% guarantee) suspended in 2014, current status unverified; KDIPA incentives and project-specific customs exemptions.", competency: "procurement", related: ["m11.local-content"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Oversight and preference rules",
      blocks: [
        {
          kind: "md",
          md: md`## State Audit Bureau prior review

The **State Audit Bureau** (ديوان المحاسبة) was created by **Law No. 30 of 1964**, as amended. **Articles 13 and 14** require **prior review** of contracts. A minister quoted by Al-Rai put the threshold at **KD 100,000 and above**. Contracting without the Bureau's approval is a violation: in one period the Bureau counted **28 cases worth KD 63 m**.

The Bureau can approve, reject, or **approve conditionally**: in 2025 it gave **conditional approval for GCCIA power purchases of KWD 161.381 m** for June–December. Conditional approvals carry obligations (documents, price caps, reporting) that the PM must track.

What prior review typically examines (generic good practice for supreme audit institutions; confirm with the ministry's Audit Bureau liaison):

| Area | Typical questions |
|---|---|
| Legality of procedure | Was the right regime used (CAPT/KAPP/direct)? Were thresholds respected (no splitting)? |
| Budget | Is there a budget allocation for this fiscal year and the commitment profile? |
| Price | Is the price reasonable vs estimate and benchmarks? Why not the lowest bidder? |
| Evaluation | Were the published criteria applied consistently? Are minutes signed? |
| Contract terms | Are guarantees, penalties, payment terms per the tender documents and law? |

The **28 cases / KD 63 m** statistic is your argument when someone suggests "starting now and regularising later".`,
        },
        { kind: "sources", refs: ["m11-escwa-law30", "m11-alrai-audit", "m11-kt-audit"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "Audit Bureau threshold and procedure",
          md: md`**Claimed:** KD 100,000 prior-review threshold (minister via Al-Rai, undated). **Unknown:** whether it has been amended; standard review durations; whether PPAs are reviewed under the same articles. **How to verify:** the current text of Law 30/1964 as amended (Audit Bureau website, UN-ESCWA legal portal); the ministry's Audit Bureau liaison office; recent Bureau circulars.`,
        },
        {
          kind: "md",
          md: md`## Fatwa and Legislation Department

The Fatwa and Legislation Department is the government's legal adviser: it reviews contract terms and issues legal opinions. For IPPs, it reviews legal terms — and KAPP has said some **lender conditions conflict with its requirements** (e.g. on termination, step-in, governing law or currency). The exact point at which Fatwa signs off in the KAPP sequence is not confirmed. Practical rule: send Fatwa a clean draft with a **deviation table** (clause, standard position, proposed position, reason, precedent), through ministry legal affairs.`,
        },
        { kind: "sources", refs: ["m11-meed-kapp-stakeholders"] },
        {
          kind: "md",
          md: md`## National product preference

**Law 74/2019** amended the Public Tenders Law and defines a **national product** as one produced in Kuwait, or national in origin under Article III of the **1982 GCC Unified Economic Agreement**. Bids offering national products receive a **price preference**. The rate is **not confirmed**:

| Source | Rate |
|---|---|
| US Commercial Guide (one passage) | 15% for locally produced items |
| US Commercial Guide (another passage) | 10% for Kuwaiti businesses |
| Zawya | raised from 15% to **20%** in 2019 |
| Older USTR reports (RESEARCH.md) | 10%, with 15% proposed |

The mechanics are simple: a national-product bid wins if its price is within the preference margin of the lowest non-national bid:`,
        },
        { kind: "equation", formula: "m11-price-preference" },
        {
          kind: "md",
          md: md`**SME margin (Law 94/2026):** compliant SME bids within **10%** of the lowest accepted bid may be preferred, but this **cannot be combined** with the product-priority rule (Art. 62) in the same tender.`,
        },
        { kind: "sources", refs: ["m11-unep-law49", "m11-kdipa-law74-2019", "m11-trade-gov-public", "m11-zawya-kuwait-made", "m11-tamimi-2026"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "Preference rate",
          md: md`**Claimed:** 10%, 15% or 20%. **Unknown:** the rate CAPT applies today and how it is applied (to the whole price or to the national-content portion). **How to verify:** the Arabic text of Law 74/2019 (controlling version), CAPT's current tender booklet template, and ministry legal affairs. As the worked example shows, the rate can decide the winner — never assume it.`,
        },
        {
          kind: "md",
          md: md`## Local content and agents

- **Existing practice (several guides):** foreign contractors must source **at least 30%** of contractual requirements from the local market or from local suppliers registered with CAPT.
- **Law 94/2026 (Al Tamimi):** contractors must buy **at least 30% of products from the Public Authority for Industry's Industrial Guide** and **subcontract at least 30% of works to locally registered contractors**.
- **Agents:** **Law 1/2024** amended Article 31 so registered foreign firms could bid **without a local agent**; **Law 94/2026** reportedly **prohibits local and commission agents** in public procurement (Deloitte's cabinet-stage note said "subject to controls to be determined by the Council of Ministers").

A local-content share is just a ratio — but **which denominator** (product purchases, works value, contract value) matters and must be defined in the contract:`,
        },
        { kind: "equation", formula: "m11-local-content" },
        {
          kind: "md",
          md: md`**In IPP bids, local partnership is already the norm:** every Zone 1 and Zone 2 bid paired an international developer with a Kuwaiti group (Fouad Alghanim & Sons, Alternative Energy Projects, A. Al-Hamad Al-Sagar & Bros, Al-Ghanim International, Arabian Engineering Projects Contracting, Al-Kharafi & Sons).`,
        },
        { kind: "sources", refs: ["m11-tamimi-2026", "m11-deloitte-2026", "m11-chambers-2025", "m11-meed-2026-zone1-bids", "m11-meed-2026-07-zone2"] },
        {
          kind: "md",
          md: md`## Offset and incentives

- **Offset (National Offset Company):** historically required **35%** offset (some sources say 30%) on civil contracts of **KD 10 m or more**, backed by a **6% guarantee**. It was **suspended for revision in 2014**. Current status: **unverified**.
- **KDIPA (FDI Law 116/2013):** can license up to 100% foreign ownership in non-negative-list sectors; incentives up to 10 years' income-tax exemption and customs relief, case by case.
- **Project-specific:** the Zone 2 RFP reportedly allows a **customs-duty exemption of up to 10%** on imported equipment for the first 10 years (wording unverified).`,
        },
        { kind: "sources", refs: ["m11-obg-offset", "m11-pinsent-offset", "m11-kdipa-faq", "m11-tamimi-fdi", "m11-sq-2025-11-zone2"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "Offset status",
          md: md`**Claimed:** offset programme suspended in 2014. **Unknown:** whether it was reinstated, replaced, or formally abolished, and whether any offset obligation appears in MEWRE or KAPP contracts today. **How to verify:** Ministry of Finance / National Offset Company announcements; ask KAPP whether Zone 1/Zone 2 RFPs contain offset or in-country value obligations.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why local content rules exist — and why PMs care",
          md: md`Local-content rules channel public spending into Kuwaiti industry and employment, a Vision 2035 aim. For the PM they create **compliance obligations to verify** (certificates, invoices, subcontract registers) and **schedule risk** (local supply capacity for large volumes, e.g. cables, structures, civil works). Build the verification into the contract's reporting and payment milestones from day one.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Applying preferences and local-content tests",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Does the preference rate change the winner?",
          given: md`Technically compliant bids for a MEWRE supply contract: lowest non-national bid KD 2.00 m; a bid offering national products KD 2.25 m. Test preference rates of 10% and 15% (illustrative; the actual rate is unverified).`,
          steps: [
            { md: md`At $\pi = 10\%$: threshold $= 1.10 \times 2.00 = 2.20$ KD m. $2.25 > 2.20$ → the non-national bid wins.` },
            { md: md`At $\pi = 15\%$: threshold $= 1.15 \times 2.00 = 2.30$ KD m. $2.25 \le 2.30$ → the national-product bid wins.` },
            { md: md`At 20% the national bid wins with KD 0.15 m to spare.` },
          ],
          result: md`The unverified preference rate decides the award. Before evaluating, obtain the applicable rate and application method in writing from legal affairs/CAPT and put it in the tender documents.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Local-content compliance of a substation EPC",
          given: md`A KD 6 m 132 kV substation EPC (post-Law 94/2026). Contractor's report: product purchases KD 3.5 m, of which KD 1.1 m from Industrial Guide suppliers; works subcontracted KD 2.5 m, of which KD 0.6 m to locally registered contractors. Assume the contract defines the denominators as product purchases and subcontracted works respectively.`,
          steps: [
            {
              md: md`Products: $LC_p = 1.1/3.5 = 31.4\%$ → meets ≥30%.`,
              hidden: true,
              check: { prompt: "Local product share (%)", answer: 31.4, unit: "%", tolerance: { abs: 0.2 } },
            },
            {
              md: md`Subcontracting: $LC_s = 0.6/2.5 = 24.0\%$ → **below** 30%.`,
              hidden: true,
              check: { prompt: "Local subcontracting share (%)", answer: 24.0, unit: "%", tolerance: { abs: 0.2 } },
            },
            { md: md`Shortfall: $0.30 \times 2.5 - 0.6 = 0.15$ KD m of works must move to local subcontractors (or the contract's remedy applies). Raise it now, while there is scope left to re-let.` },
          ],
          result: md`Products compliant (31.4%), subcontracting non-compliant (24%, KD 0.15 m short). Track both monthly; a year-end discovery leaves no room to fix it.`,
        },
        {
          kind: "question",
          question: {
            id: "m11-l04-p1",
            type: "numeric",
            prompt: md`Under the reported Law 94/2026 SME rule, the lowest accepted bid is KD 1.80 m. Up to what price (KD m) can a compliant SME bid be and still fall within the 10% margin?`,
            answer: 1.98,
            tolerance: { abs: 0.005 },
            unit: "KD m",
            explanation: md`$1.10 \times 1.80 = 1.98$ KD m. Remember the SME margin cannot be combined with the Art. 62 product priority in the same tender.`,
            concepts: ["m11.national-preference"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Passing oversight first time",
      blocks: [
        {
          kind: "md",
          md: md`**The Audit Bureau file — what experienced PMs include**

1. Approved need and budget-availability certificate (fiscal year).
2. Procurement route justification with legal basis; for direct contracting, the annual aggregation calculation.
3. Tender documents, addenda and clarification log.
4. Bid opening minutes; evaluation report signed by all members; conflict-of-interest declarations.
5. Price reasonableness memo: pre-tender estimate, benchmarks, explanation if not lowest bidder.
6. Draft contract with legal affairs/Fatwa clearance and a deviation table.
7. Guarantees (bid bond; final guarantee form), insurance requirements.
8. Compliance matrix against the Bureau's observations on the last similar contracts.

**Local-content contract management:** monthly local-content report with invoices and supplier registration evidence; subcontractor register; payment milestones linked to compliance evidence; independent spot checks.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`1. **"Start now, regularise later"** — contracting before approval; one period saw 28 such cases worth KD 63 m. 2. **Conditional approvals forgotten** — conditions not tracked, then flagged at post-audit. 3. **Assuming a preference rate** — wrong award, challenge. 4. **Local content measured at the end** — no time to fix. 5. **Agents** — a supplier's "local representative" may now be prohibited; check before any meeting. 6. **Not explaining non-lowest awards** — like the 400 kV line (lowest KD 41.45 m, awarded KD 48.6 m); the file must explain why.`,
        },
        {
          kind: "checklist",
          title: "Oversight and local-content checklist",
          items: [
            "Audit Bureau need identified at procurement planning; review time in the schedule.",
            "Conditions of any conditional approval logged with owners and due dates.",
            "Preference rate and method confirmed in writing and stated in the tender documents.",
            "Local-content definitions (denominators) and reporting format written into the contract.",
            "Agent/representative arrangements of bidders checked against Law 94/2026.",
            "Price-reasonableness memo prepared for every award, especially non-lowest awards.",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask (legal affairs, Audit Bureau liaison, contractors)",
          items: [
            "What were the Audit Bureau's observations on our last three contracts of this type, and how were they closed?",
            "Which preference rate (national product) and which SME rules apply to this tender, and under which articles?",
            "Contractor: list your Industrial Guide suppliers and locally registered subcontractors with values; how will you report monthly?",
            "Contractor: do you use any local or commission agent for this contract?",
            "KAPP: do the IPP RFPs contain offset, in-country value or Kuwaitisation obligations?",
          ],
        },
        { kind: "scenario", scenario: "m11-s4" },
        {
          kind: "feynman",
          prompt: "Explain to a foreign EPC contractor what oversight and local-content obligations they will face on a MEWRE substation contract signed in 2027.",
          keyPoints: [
            "Contract signature requires State Audit Bureau prior review (reported threshold KD 100,000); no work before approval.",
            "Final guarantee (reported ≥10%) at signature.",
            "Law 94/2026: ≥30% products from the PAI Industrial Guide and ≥30% works subcontracted locally; agents banned.",
            "National product preference may have affected the award; rate must be confirmed.",
            "Monthly local-content reporting with evidence will be tied to payments.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m11-l04-q1",
      type: "mcq",
      prompt: md`Which law created the State Audit Bureau and provides for prior review (Arts. 13–14)?`,
      options: ["Law 49/2016", "Law 30/1964", "Law 116/2014", "Law 94/2026"],
      answer: 1,
      explanation: md`Law No. 30 of 1964, as amended. Law 49/2016 is the tenders law; 116/2014 the PPP law; 94/2026 the 2026 tenders amendment.`,
      concepts: ["m11.audit-prior-review"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m11-l04-q2",
      type: "numeric",
      prompt: md`Lowest non-national bid KD 4.00 m; national-product bid KD 4.50 m. What is the **minimum** preference rate (in %) at which the national-product bid wins?`,
      answer: 12.5,
      tolerance: { abs: 0.05 },
      unit: "%",
      explanation: md`Need $4.50 \le (1+\pi) \times 4.00$ → $\pi \ge 0.125 = 12.5\%$. It wins at 15% or 20% but not at 10% — the unverified rate decides.`,
      concepts: ["m11.national-preference"],
      difficulty: 2,
    },
    {
      id: "m11-l04-q3",
      type: "multi",
      prompt: md`Which statements about the offset programme are supported by the sources? (Select all.)`,
      options: [
        "It historically applied to civil contracts of KD 10 m or more",
        "It required 35% offset (some sources say 30%) with a 6% guarantee",
        "It was suspended for revision in 2014",
        "It was confirmed reinstated in 2025 at 25%",
      ],
      answer: [0, 1, 2],
      explanation: md`No reinstatement was found; current status is unverified. Option D is invented.`,
      concepts: ["m11.offset-incentives"],
      difficulty: 2,
    },
    {
      id: "m11-l04-q4",
      type: "mcq",
      prompt: md`A contractor reports KD 0.9 m of local subcontracting out of KD 3.6 m of subcontracted works. Against a 30% requirement, the contractor is…`,
      options: ["Compliant at 30%", "Non-compliant at 25%", "Compliant at 40%", "Non-compliant at 20%"],
      answer: 1,
      explanation: md`$0.9/3.6 = 25\%$ < 30%: short by $0.3 \times 3.6 - 0.9 = 0.18$ KD m.`,
      concepts: ["m11.local-content"],
      difficulty: 1,
    },
    {
      id: "m11-l04-q5",
      type: "decision",
      prompt: md`The Audit Bureau returns an O&M contract approval with a condition: "price to be reduced to the pre-tender estimate or justified with two benchmarks". The contractor has already mobilised at your Director's verbal instruction. What do you do?`,
      options: [
        { text: "Tell the contractor to continue; the approval will come.", score: 0, feedback: "Work without a fully approved contract is exactly the violation the Bureau counts (28 cases / KD 63 m)." },
        { text: "Brief your Director in writing on the risk, stop further mobilisation pending approval, and prepare the benchmark justification (two comparable ministry/KAPP O&M contracts) or negotiate a compliant price within the tender rules.", score: 1, feedback: "Correct: protect the ministry and your Director, and answer the condition with evidence." },
        { text: "Accept the condition and cut the price unilaterally in the contract.", score: 0.3, feedback: "Unilateral changes to an awarded price may not be lawful; follow legal advice on how to meet the condition." },
        { text: "Ignore the condition; it's only advisory.", score: 0, feedback: "Conditional approvals bind; post-audit will flag non-compliance." },
      ],
      explanation: md`Conditional approval is not approval until the condition is met. Document, stop exposure, and close the condition with evidence.`,
      concepts: ["m11.audit-prior-review"],
      difficulty: 3,
    },
    {
      id: "m11-l04-q6",
      type: "mcq",
      prompt: md`Under the reported Law 94/2026 provisions, can the SME 10% margin be combined with the Art. 62 product-priority rule in the same tender?`,
      options: ["Yes, they stack", "No, they cannot be combined", "Only for KPC tenders", "Only above KD 1 m"],
      answer: 1,
      explanation: md`Reported as not combinable in the same tender. Confirm in the gazetted text.`,
      concepts: ["m11.national-preference"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m11-l04-f1", front: "Audit Bureau prior review — law and threshold", back: "Law 30/1964 Arts. 13–14; reported ≥ KD 100,000 (verify).", concepts: ["m11.audit-prior-review"] },
    { id: "m11-l04-f2", front: "Contracting without Audit Bureau approval", back: "A violation — one period: 28 cases worth KD 63 m.", concepts: ["m11.audit-prior-review"] },
    { id: "m11-l04-f3", front: "National product (Law 74/2019)", back: "Produced in Kuwait or national in origin under Art. III of the 1982 GCC Unified Economic Agreement.", concepts: ["m11.national-preference"] },
    { id: "m11-l04-f4", front: "National product preference rate", back: "Unverified: 10%, 15% or 20% reported. Confirm before evaluating.", concepts: ["m11.national-preference"] },
    { id: "m11-l04-f5", front: "Price preference test", back: md`National bid wins if $P_{\text{nat}} \le (1+\pi)P_{\min}$.`, concepts: ["m11.national-preference"] },
    { id: "m11-l04-f6", front: "Law 94/2026 local content", back: "≥30% products from the PAI Industrial Guide; ≥30% works to local subcontractors; agents banned.", concepts: ["m11.local-content"] },
    { id: "m11-l04-f7", front: "Offset programme", back: "35% (or 30%) on civil contracts ≥ KD 10 m, 6% guarantee; suspended 2014; current status unverified.", concepts: ["m11.offset-incentives"] },
    { id: "m11-l04-f8", front: "KDIPA incentives", back: "Up to 100% foreign ownership; up to 10 years income-tax exemption; customs relief — case by case.", concepts: ["m11.offset-incentives"] },
  ],
  scenarios: [
    {
      id: "m11-s4",
      title: "The local partner who isn't a subcontractor",
      context: md`Six months into a KD 6 m substation EPC (post-Law 94/2026), the contractor's local-content report shows 33% local subcontracting. Your site engineer tells you that one "local subcontractor" worth KD 0.4 m has no site presence and simply re-invoices work done by the contractor's own foreign crew.`,
      start: "a",
      concepts: ["m11.local-content"],
      nodes: {
        a: {
          md: md`What do you do?`,
          choices: [
            { text: "Request evidence formally (subcontract, registration, personnel and equipment records, site attendance) and inform legal affairs; withhold acceptance of that portion of the report pending verification.", next: "b", score: 10, feedback: "Fact-based, formal, proportionate." },
            { text: "Ignore it; the report says 33%.", next: "c", score: 0, feedback: "Pass-through 'subcontracting' defeats the rule and may resemble the agent arrangements the law now prohibits." },
            { text: "Confront the contractor's PM loudly on site.", next: "b", score: 3, feedback: "The concern is valid but the approach damages the relationship and creates no record." },
          ],
        },
        b: {
          md: md`Evidence confirms the subcontractor performs no work. Excluding it, local subcontracting is 17%.`,
          choices: [
            { text: "Issue a formal notice under the contract's local-content clause with a corrective plan deadline, and reflect it in the next payment certificate per the contract.", score: 10, feedback: "Uses the contract's remedies and leaves time to correct." },
            { text: "Terminate the contract immediately.", score: 3, feedback: "Disproportionate as a first step; follow the contract's escalation." },
          ],
        },
        c: {
          md: md`At post-audit, the Audit Bureau finds the pass-through and asks why the ministry certified the reports.`,
          choices: [
            { text: "Acknowledge, issue notices, and introduce evidence-based local-content verification.", score: 2, feedback: "Necessary, but the ministry's certification is now the finding." },
          ],
        },
      },
    },
  ],
};

export default lesson;
