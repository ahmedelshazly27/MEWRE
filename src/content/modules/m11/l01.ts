import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m11-l01",
  title: "Legal Framework and CAPT",
  summary:
    "The Public Tenders Law 49/2016 and its amendments (Law 74/2019, Law 1/2024, and the new Law 94/2026), the role of the Central Agency for Public Tenders, thresholds and direct contracting, the anti-splitting discipline, and which procurements sit outside CAPT (PPPs under KAPP, G2G, oil-sector carve-outs).",
  minutes: 70,
  objectives: [
    "You can name the laws that govern Kuwaiti public procurement and state what each amendment changed, with confidence levels.",
    "You can route a MEWRE purchase to the correct regime (CAPT tender, direct contracting, KAPP PPP, G2G) under the law before and after Law 94/2026 takes effect.",
    "You can apply the annual aggregation (anti-splitting) test to the KD 1 m direct-contracting limit.",
    "You can explain the agent and local-content changes in Law 94/2026 and what they mean for MEWRE contracts and bidders.",
  ],
  concepts: [
    { id: "m11.tenders-law", name: "Public Tenders Law 49/2016 and amendments", description: "The core procurement statute, amended by Law 74/2019 (national product), Law 1/2024 (Art. 31, no local agent for registered foreign firms) and Law 94/2026 (thresholds, agents, local content).", competency: "procurement", related: ["m11.capt-role", "m11.law-94-2026"] },
    { id: "m11.capt-role", name: "CAPT's role and thresholds", description: "The Central Agency for Public Tenders oversees tenders above KD 75,000 (Art. 19); from ~December 2026 entities may contract directly up to KD 1 m per financial year for the same items without CAPT approval.", competency: "procurement", related: ["m11.anti-splitting"] },
    { id: "m11.anti-splitting", name: "Aggregation and anti-splitting", description: "The direct-contracting limit applies per financial year to the same items or works; splitting a requirement to stay below it is a violation.", competency: "procurement", related: ["m11.capt-role"] },
    { id: "m11.law-94-2026", name: "Law 94/2026 changes", description: "Gazetted 27 Sep 2026 (issue 1810), effective three months later: KD 1 m direct-contracting limit, KPC carve-out above KD 20 m, ban on local/commission agents, 30% local products and 30% local subcontracting, SME 10% margin.", competency: "procurement", related: ["m11.tenders-law"] },
    { id: "m11.procurement-regimes", name: "Procurement regimes outside CAPT", description: "PPPs procured by KAPP under PPP Law 116/2014, government-to-government agreements, and oil-sector procurement by KPC committees below KD 20 m (post-2026).", competency: "procurement", related: ["m11.capt-role"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "The statutes and the agency",
      blocks: [
        {
          kind: "md",
          md: md`## The legal stack

| Instrument | What it does (as reported) | Confidence |
|---|---|---|
| **Public Tenders Law No. 49 of 2016** | Core statute; creates the **Central Agency for Public Tenders (CAPT)** regime; CAPT oversees tenders above **KD 75,000** (Art. 19); final guarantee ≥ 10% of contract value (Art. 65) | Medium–High |
| **Executive Regulations** | Implementing rules (guarantees, procedures). One academic source cites them as issued in 2017 ("Tender Law No. 30 of 2017"), Art. 42 on final guarantee | Low–Medium |
| **Law No. 74 of 2019** | Amends Law 49/2016; defines **national product** (produced in Kuwait or national in origin under the 1982 GCC Unified Economic Agreement); preference rate reported variously | Medium |
| **Law No. 1 of 2024** | Amends **Article 31**: registered foreign firms may bid **without a local agent** | Medium |
| **Law No. 94 of 2026** | Gazetted **27 September 2026** (Kuwait Al-Youm issue 1810), effective **three months after publication** (~27 December 2026). Raises direct contracting without CAPT approval to **KD 1,000,000 per financial year** for the same items/works; KPC domestic contracts under CAPT only above **KD 20 m**; bans local and commission agents; tightens local content | Medium (single law firm + cabinet-stage coverage) |

The consolidated English text itself warns that **the Arabic version prevails**. Read the Arabic articles for anything you will rely on.`,
        },
        { kind: "sources", refs: ["m11-trade-gov-public", "m11-kilaw-guarantees", "m11-unep-law49", "m11-kdipa-law74-2019", "m11-chambers-2025", "m11-tamimi-2026", "m11-deloitte-2026"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "What must be read in the official text",
          md: md`**Unverified:** (1) the exact executive-regulations instrument and article numbers; (2) the final wording of Law 94/2026 — the Deloitte cabinet-stage note said the agent ban would be "subject to controls to be determined by the Council of Ministers", whereas Al Tamimi describes a prohibition; (3) transitional rules for tenders announced before the effective date. **How to verify:** Kuwait Al-Youm issue 1810 (27 Sep 2026); CAPT circulars; ministry legal affairs opinion on which tenders the new rules apply to.`,
        },
        {
          kind: "md",
          md: md`## What CAPT does

CAPT is the central gatekeeper for conventional public procurement. For a MEWRE tender above the threshold, CAPT (in coordination with the ministry) issues the tender, receives and opens bids publicly, receives the ministry's technical evaluation, and decides the award recommendation, after which the **State Audit Bureau** performs prior review before contract signature. The ministry writes the **tender documents** (specifications, conditions, BOQ) and runs the **technical evaluation** through its committee; CAPT owns the procedure and the award decision.

Common procurement methods in Kuwaiti and Gulf tender law (confirm the article numbers in Law 49/2016):

| Method (Arabic) | When used |
|---|---|
| **Public tender** (مناقصة عامة) | Default for works and supplies above threshold; open to all registered bidders |
| **Limited tender** (مناقصة محدودة) | Specialised scope; invited prequalified bidders |
| **Practice / negotiated procedure** (ممارسة) | Urgent or specialised needs; negotiation with a few suppliers |
| **Direct order** (أمر مباشر / تعاقد مباشر) | Below the direct-contracting limit, or justified exceptions |

Award rule in practice: CAPT tenders are usually awarded to the **lowest price once technical compliance is established** (US Commercial Guide). If the winner refuses to sign, the bid bond (and performance bond, reported as 5–10% of contract value) can be confiscated.`,
        },
        { kind: "sources", refs: ["m11-trade-gov-public", "m11-trade-gov-government", "m11-tamimi-new-tender-law", "m11-chambers-proc-2024"] },
        {
          kind: "callout",
          tone: "why",
          title: "Why centralise procurement?",
          md: md`A central agency separates the **user** (MEWRE, which knows what it needs and may have favoured suppliers) from the **buyer** (CAPT, which runs a neutral, public procedure). That reduces collusion and favouritism but adds an interface: every specification ambiguity becomes a CAPT clarification cycle. Law 94/2026 rebalances this by letting ministries buy more themselves (up to KD 1 m/yr per item) while tightening agents and local content.`,
        },
        {
          kind: "md",
          md: md`## Thresholds and the anti-splitting test

Before Law 94/2026 takes effect, anything above **KD 75,000** goes through CAPT. After it takes effect, a ministry may contract directly — without CAPT approval — up to **KD 1,000,000 per financial year for the same items or works**; the Council of Ministers may adjust the figure on CAPT's recommendation. Note what the limit does **not** remove: the State Audit Bureau's prior review (reported threshold KD 100,000) still applies, as do internal delegation-of-authority limits.

The "per financial year, same items" wording is an **aggregation rule**. Formally:`,
        },
        { kind: "equation", formula: "m11-aggregation-test" },
        {
          kind: "md",
          md: md`Splitting a requirement into several orders to keep each below the limit is the classic irregularity auditors look for. A useful self-test: "Would a reasonable auditor see these orders as one need?" Same item, same site, same period, same supplier → aggregate.`,
        },
        {
          kind: "md",
          md: md`## Law 94/2026: what else changes

- **Agents:** use of local or commission-based agents in public procurement is reported as prohibited (amended Art. 31). Law 1/2024 had already allowed registered foreign firms to bid without a local agent; 2026 extends the logic into a ban.
- **Local content:** contractors must buy **at least 30% of products from the Public Authority for Industry's Industrial Guide** and **subcontract at least 30% of works to locally registered contractors** (Al Tamimi). Separately, foreign contractors were already required to source at least 30% of contractual requirements locally (reported in several guides).
- **SMEs:** compliant SME bids within **10%** of the lowest accepted bid may be preferred, but this cannot be combined with the separate product-priority rule (Art. 62) in the same tender.
- **KPC:** CAPT oversight of KPC domestic purchases only above **KD 20 m**; smaller ones by KPC committees.

For a MEWRE renewable PM this means: grid and O&M contracts after ~December 2026 will carry stronger local-content obligations to monitor, and IPP developers' EPC subcontracting strategies may be affected if KAPP projects adopt similar rules (PPP projects are under the PPP law, so check the RFP).`,
        },
        { kind: "sources", refs: ["m11-tamimi-2026", "m11-deloitte-2026", "m11-chambers-2025", "m11-zawya-tender-law"] },
        {
          kind: "md",
          md: md`## Regimes outside CAPT

| Regime | Legal basis | Who procures | MEWRE examples |
|---|---|---|---|
| **PPP / IPP** | PPP Law 116/2014; Decree 78/2015 | KAPP, approvals by the Higher Committee | Shagaya Phase III Zones 1 and 2; AZN 2&3; Al-Khairan |
| **G2G** | Framework agreements between governments | Ministry / government, negotiated | MEWRE–China NEA framework (17 Mar 2025), Shagaya Phases 3–4 |
| **Oil sector** | Law 94/2026 carve-out (KPC < KD 20 m domestic) | KPC committees | KOC/KPC solar plans |
| **Direct contracting** | Law 94/2026 (≤ KD 1 m/FY per item) | The ministry | Spares, small services |

The legal basis by which a G2G agreement is exempted from the tenders law was not found in research — do not assert it.`,
        },
        { kind: "sources", refs: ["m11-kapp-law-116", "m11-kapp-exec-regs", "m11-mees-2025-03-china", "m11-tamimi-2026"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "Exemptions and direct contracting cases",
          md: md`RESEARCH.md does not list the statutory exemptions (urgency, sole source, defence, G2G, etc.) or the exact cases where direct contracting is allowed above the limit. **How to verify:** read the Arabic text of Law 49/2016 as amended (exemptions and practice/direct-order articles), CAPT's published guides, and ask legal affairs for the ministry's standard justification memo for each case.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Routing purchases correctly",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Route five MEWRE purchases before and after Law 94/2026",
          given: md`FY2026/27 (1 Apr 2026 – 31 Mar 2027). Purchases planned by the renewables sector:

1. Spare inverter cards for Shagaya Phase I PV, KD 60,000.
2. Owner's Engineer consultancy for grid interface works, KD 1.2 m.
3. Module-cleaning water truck hire, KD 300,000 per quarter (same supplier type all year).
4. A 1,100 MW solar IPP.
5. A 132 kV substation extension, KD 6 m.`,
          steps: [
            { md: md`**Item 1 (KD 60k):** below KD 75k → direct procurement under both regimes (subject to internal delegation). Below the reported Audit Bureau KD 100k threshold.` },
            { md: md`**Item 2 (KD 1.2 m):** above both KD 75k and KD 1 m → CAPT tender under both regimes, then Audit Bureau prior review.` },
            { md: md`**Item 3:** $4 \times 300{,}000 = 1{,}200{,}000$ KD in the FY for the same service. Before ~Dec 2026 → CAPT (each order > KD 75k anyway). After → still CAPT, because the annual aggregate exceeds KD 1 m. Placing four separate direct orders would be splitting.` },
            { md: md`**Item 4:** PPP under Law 116/2014 → KAPP, not CAPT.` },
            { md: md`**Item 5 (KD 6 m):** CAPT tender + Audit Bureau under both regimes; post-2026, local-content (30% products / 30% subcontracting) obligations apply in the tender documents.` },
          ],
          result: md`Only item 1 avoids CAPT in both regimes. The new KD 1 m limit helps for genuinely small, non-recurring needs — it does not remove the Audit Bureau or permit splitting.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "How much headroom is left for direct orders?",
          given: md`After Law 94/2026 takes effect, the ministry has already placed direct orders for the same PV spare parts in FY2026/27 of KD 280,000, KD 350,000 and KD 190,000. A new requirement for the same parts arises.`,
          steps: [
            {
              md: md`Committed so far: $280{,}000 + 350{,}000 + 190{,}000 = 820{,}000$ KD.`,
              hidden: true,
              check: { prompt: "Total already committed (KD)", answer: 820000, unit: "KD", tolerance: { abs: 1 } },
            },
            {
              md: md`Headroom: $1{,}000{,}000 - 820{,}000 = 180{,}000$ KD.`,
              hidden: true,
              check: { prompt: "Remaining direct-contracting headroom (KD)", answer: 180000, unit: "KD", tolerance: { abs: 1 } },
            },
            { md: md`If the new requirement is KD 250,000 it exceeds the headroom → go through CAPT (or re-plan as a framework tender for next FY). Also check whether the KD 250,000 order needs Audit Bureau prior review (reported threshold KD 100,000).` },
          ],
          result: md`KD 180,000 of headroom. Better practice: forecast recurring needs at the start of the FY and tender a framework agreement through CAPT instead of drifting into the limit.`,
        },
        {
          kind: "question",
          question: {
            id: "m11-l01-p1",
            type: "numeric",
            prompt: md`Law 94/2026 was published in the gazette on 27 September 2026 and takes effect three months after publication. A MEWRE division plans monthly direct orders of KD 95,000 for the same cleaning consumables from 1 January 2027 to 31 March 2027 (end of FY). If the earlier part of the FY had KD 0 of such orders, what is the **total** direct-order value in the FY, in KD, and is it within the limit? Enter the total.`,
            answer: 285000,
            tolerance: { abs: 1 },
            unit: "KD",
            explanation: md`Three monthly orders (Jan, Feb, Mar): $3 \times 95{,}000 = 285{,}000$ KD, below KD 1 m → within the new limit **if** the law is in force (from ~27 Dec 2026) and the rules apply to these orders. Each order is below KD 100,000, so Audit Bureau prior review may not be triggered per order — but auditors may still examine whether the orders are one requirement. Under the old KD 75,000 threshold each order would have required CAPT.`,
            concepts: ["m11.anti-splitting", "m11.law-94-2026"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Working with CAPT and the law in practice",
      blocks: [
        {
          kind: "md",
          md: md`**Who does what on a MEWRE tender**

| Role | Responsibility |
|---|---|
| Requesting sector (you, the PM) | Need, budget certificate, specifications, BOQ, evaluation criteria, technical evaluation |
| Ministry tenders/contracts department | Packages the tender, liaises with CAPT, manages bidder correspondence |
| Ministry legal affairs | Conditions of contract, legal review, Fatwa liaison |
| CAPT | Procedure, issue, bid receipt and opening, award decision |
| State Audit Bureau | Prior review before signature |
| Owner's Engineer / consultant | Drafts specifications, supports evaluation (no conflicts of interest) |

**Documents:** tender booklet (كراسة الشروط والمواصفات), conditions of contract (often FIDIC-based with Kuwaiti particular conditions), BOQ, evaluation criteria, bidder clarification log, evaluation report, award recommendation, contract.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`1. **Splitting** recurring purchases to stay under thresholds — the most common audit observation. 2. **Applying the new KD 1 m limit early** — before ~27 Dec 2026 or to tenders announced earlier, the old rules may govern. 3. **Specifications that name a brand** — restricts competition and invites CAPT/Audit objections; use performance specs "or equivalent". 4. **Forgetting local-content clauses** in post-2026 tenders and contract management. 5. **Assuming PPP rules equal CAPT rules** — KAPP projects follow the PPP law and their own RFPs.`,
        },
        {
          kind: "checklist",
          title: "PM procurement-routing checklist",
          items: [
            "Requirement value estimated with a cost basis; annual aggregate for the same item computed.",
            "Regime chosen (direct / CAPT / KAPP / other) with the legal basis recorded in the file.",
            "Effective-date check: which version of the tenders law applies to this tender's announcement date.",
            "Budget-availability certificate attached.",
            "Specifications are performance-based, brand-neutral, and reviewed by legal affairs.",
            "Local-content and SME/national-product provisions included where applicable.",
            "Audit Bureau prior-review need identified and scheduled.",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask legal affairs and the tenders department",
          items: [
            "Which of our current tenders fall under Law 94/2026 and which under the pre-amendment law?",
            "How will the 30% local products / 30% local subcontracting obligations be written into our standard conditions and verified?",
            "What is CAPT's current average time from bid opening to award recommendation for our tender category?",
            "Which national-product preference percentage does CAPT apply today, and under which article?",
            "What exemption or practice procedure applies if an urgent grid repair exceeds the direct-contracting limit?",
          ],
        },
        { kind: "scenario", scenario: "m11-s1" },
        {
          kind: "feynman",
          prompt: "Explain to a new colleague from the private sector what changes for MEWRE procurement when Law 94/2026 takes effect, and what does not change.",
          keyPoints: [
            "Direct contracting without CAPT approval rises from KD 75,000 to KD 1 m per financial year for the same items/works.",
            "Aggregation applies — splitting is still prohibited.",
            "Audit Bureau prior review and internal approvals still apply.",
            "Agents are banned; local content tightened (30% Industrial Guide products, 30% local subcontracting).",
            "Takes effect three months after the 27 Sep 2026 gazette; PPPs remain under KAPP's law.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m11-l01-q1",
      type: "mcq",
      prompt: md`Under Law 49/2016 before the 2026 amendment, above what value does CAPT oversee a tender (Art. 19)?`,
      options: ["KD 5,000", "KD 75,000", "KD 1,000,000", "KD 20,000,000"],
      answer: 1,
      explanation: md`KD 75,000. Law 94/2026 raises the direct-contracting limit to KD 1 m per FY; KD 20 m is the new KPC carve-out.`,
      concepts: ["m11.capt-role"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m11-l01-q2",
      type: "multi",
      prompt: md`Which changes are attributed to Law No. 94 of 2026? (Select all.)`,
      options: [
        "Direct contracting without CAPT approval up to KD 1 m per financial year for the same items",
        "Abolition of State Audit Bureau prior review",
        "Prohibition of local/commission agents in public procurement",
        "At least 30% of products from the Industrial Guide and 30% local subcontracting",
        "KPC domestic contracts under CAPT only above KD 20 m",
      ],
      answer: [0, 2, 3, 4],
      explanation: md`Audit Bureau prior review is under Law 30/1964 and is not touched by the tenders amendment. Confidence on the other items is medium (single law-firm source).`,
      concepts: ["m11.law-94-2026"],
      difficulty: 2,
    },
    {
      id: "m11-l01-q3",
      type: "mcq",
      prompt: md`Which body procures a solar IPP such as Shagaya Phase III Zone 2?`,
      options: ["CAPT", "KAPP", "The State Audit Bureau", "KPC tender committee"],
      answer: 1,
      explanation: md`PPPs are procured by KAPP under PPP Law 116/2014 and Decree 78/2015, with Higher Committee approvals — a different regime from CAPT tenders.`,
      concepts: ["m11.procurement-regimes"],
      difficulty: 1,
    },
    {
      id: "m11-l01-q4",
      type: "numeric",
      prompt: md`After Law 94/2026 is in force, a sector has placed direct orders for the same transformer spares of KD 400,000 and KD 450,000 this FY. What is the maximum value of a further direct order for the same spares, in KD?`,
      answer: 150000,
      tolerance: { abs: 1 },
      unit: "KD",
      explanation: md`$1{,}000{,}000 - (400{,}000 + 450{,}000) = 150{,}000$ KD. Anything above goes through CAPT.`,
      concepts: ["m11.anti-splitting"],
      difficulty: 1,
    },
    {
      id: "m11-l01-q5",
      type: "decision",
      prompt: md`A colleague proposes splitting a KD 1.4 m O&M service into two KD 700,000 contracts with different start dates "to avoid CAPT delays". What do you do?`,
      options: [
        { text: "Agree — each is below KD 1 m.", score: 0, feedback: "This is splitting: same service, same FY. It is an audit violation and exposes signatories personally." },
        { text: "Decline and propose a CAPT tender now, with a framework structure, and meanwhile check whether a short bridging order within the limit is justified and documented.", score: 1, feedback: "Correct: lawful route plus a documented interim solution if genuinely needed." },
        { text: "Split it across two fiscal years without telling anyone.", score: 0.1, feedback: "Still splitting in substance, and concealment makes it worse." },
        { text: "Ask the contractor to invoice through two different companies.", score: 0, feedback: "Collusive and unlawful." },
      ],
      explanation: md`The KD 1 m limit is per financial year for the same items/works. Plan a proper tender early; use framework agreements for recurring needs.`,
      concepts: ["m11.anti-splitting", "m11.capt-role"],
      difficulty: 2,
    },
    {
      id: "m11-l01-q6",
      type: "mcq",
      prompt: md`What did Law No. 1 of 2024 change?`,
      options: [
        "It created KAPP",
        "It amended Article 31 so registered foreign firms can bid without a local agent",
        "It raised CAPT's threshold to KD 1 m",
        "It abolished national product preference",
      ],
      answer: 1,
      explanation: md`Law 1/2024 amended Art. 31 (Chambers 2025). Law 94/2026 later moved to a ban on agents in public procurement.`,
      concepts: ["m11.tenders-law"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m11-l01-f1", front: "Public Tenders Law number and CAPT threshold", back: "Law 49/2016; CAPT oversees tenders above KD 75,000 (Art. 19).", concepts: ["m11.tenders-law"] },
    { id: "m11-l01-f2", front: "Law 94/2026 — publication and effect", back: "Kuwait Al-Youm issue 1810, 27 Sep 2026; effective 3 months later (~27 Dec 2026).", concepts: ["m11.law-94-2026"] },
    { id: "m11-l01-f3", front: "New direct-contracting limit", back: "KD 1,000,000 per financial year for the same items or works, without CAPT approval (Council of Ministers may adjust).", concepts: ["m11.capt-role"] },
    { id: "m11-l01-f4", front: "Anti-splitting test", back: md`$\sum_{j \in FY} V_j \le L$ for the same items/works — aggregate across orders.`, concepts: ["m11.anti-splitting"] },
    { id: "m11-l01-f5", front: "Law 94/2026 local content", back: "≥30% of products from the PAI Industrial Guide; ≥30% of works subcontracted to local registered contractors.", concepts: ["m11.law-94-2026"] },
    { id: "m11-l01-f6", front: "Law 1/2024", back: "Amended Art. 31: registered foreign firms may bid without a local agent.", concepts: ["m11.tenders-law"] },
    { id: "m11-l01-f7", front: "Law 74/2019", back: "Amended Law 49/2016; defines 'national product'; preference rate reported as 10%, 15% or 20% (unverified).", concepts: ["m11.tenders-law"] },
    { id: "m11-l01-f8", front: "KPC under Law 94/2026", back: "Domestic purchase contracts under CAPT only above KD 20 m; smaller ones by KPC committees.", concepts: ["m11.procurement-regimes"] },
  ],
  scenarios: [
    {
      id: "m11-s1",
      title: "The urgent cleaning contract",
      context: md`January 2027. Law 94/2026 is now in force. Soiling at a ministry-operated PV plant is high after a shamal; the O&M section wants a robotic-cleaning service immediately. Estimated cost: KD 900,000 for the rest of FY2026/27, and KD 1.6 m per year thereafter. A supplier has offered to start next week.`,
      start: "a",
      concepts: ["m11.anti-splitting", "m11.capt-role", "m11.law-94-2026"],
      nodes: {
        a: {
          md: md`How do you structure the procurement?`,
          choices: [
            { text: "Direct contract for the remainder of FY2026/27 (KD 900k, within the KD 1 m limit if no other same-service orders exist), with documented justification and Audit Bureau review; in parallel launch a CAPT tender for the multi-year service.", next: "b", score: 10, feedback: "Lawful short-term solution plus a proper competitive route for the recurring need." },
            { text: "Sign a 3-year direct contract now; it's urgent.", next: "c", score: 0, feedback: "KD ~4 m+ over the term far exceeds the annual limit; this would be an irregular contract." },
            { text: "Wait for a full CAPT tender before doing anything.", next: "b", score: 4, feedback: "Lawful, but you accept months of soiling losses when a lawful interim option exists." },
          ],
        },
        b: {
          md: md`Legal affairs asks whether any other cleaning orders were placed this FY.`,
          choices: [
            { text: "Check the finance system and O&M records, and document the aggregate in the justification memo.", next: "d", score: 10, feedback: "The aggregation test needs evidence, not assumptions." },
            { text: "Say 'I don't think so' and proceed.", next: "d", score: 3, feedback: "If a KD 150k order exists, you've just breached the limit." },
          ],
        },
        c: {
          md: md`The Audit Bureau refuses the contract and asks who authorised the commitment.`,
          choices: [
            { text: "Withdraw, restart with an interim order within the limit and a CAPT tender.", next: "d", score: 3, feedback: "Recovered, but time and credibility lost." },
          ],
        },
        d: {
          md: md`The supplier asks whether they can use their usual local agent to handle the paperwork.`,
          choices: [
            { text: "Explain that Law 94/2026 reportedly prohibits local/commission agents in public procurement; they must deal directly, and confirm with legal affairs.", score: 10, feedback: "Correct and protective of both parties." },
            { text: "Say it's fine as long as the agent isn't paid by the ministry.", score: 2, feedback: "The ban is about the agent relationship in public contracting, not who pays." },
          ],
        },
      },
    },
  ],
};

export default lesson;
