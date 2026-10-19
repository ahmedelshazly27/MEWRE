import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m00-l02",
  title: "Institutions and Decision Chains",
  summary:
    "Who decides what in Kuwait's power sector — MEWRE, KAPP and the Higher Committee, CAPT, the State Audit Bureau, the Fatwa and Legislation Department, the Ministry of Finance, the Council of Ministers, KISR, EPA and the Supreme Council for Planning — and how a decision actually travels between them.",
  minutes: 80,
  objectives: [
    "You can name each institution in the renewable-project decision chain, its legal basis where known, and what it approves or controls.",
    "You can trace the approval path of a KAPP solar IPP and of a conventional MEWRE grid contract, step by step.",
    "You can estimate the expected duration of an approval chain that includes rework loops (returned files), and explain why rework, not first-pass review, dominates.",
    "You can identify which of your counterparts owns each document a PM handles (cabinet memo, RFQ/RFP, PPA, contract, budget request).",
  ],
  concepts: [
    { id: "m00.mewre-role", name: "MEWRE's roles", description: "Policy owner, system operator/transmission owner, offtaker under IPP PPAs/ECWPAs, and direct procurer of grid and EPC works under the Public Tenders Law.", competency: "context", related: ["m00.kapp-higher-committee", "m00.control-bodies"] },
    { id: "m00.kapp-higher-committee", name: "KAPP and the Higher Committee for PPP", description: "KAPP (PPP Law 116/2014, Executive Regulations Decree 78/2015) runs PPP procurement; the Higher Committee chaired by the Minister of Finance approves projects, stages and the selected investor.", competency: "context", related: ["m00.mewre-role", "m00.decision-chain"] },
    { id: "m00.control-bodies", name: "Control bodies: Audit Bureau, Fatwa, CAPT", description: "The State Audit Bureau (Law 30/1964) performs prior review of contracts; the Fatwa and Legislation Department reviews legal terms; CAPT (Law 49/2016) governs public tenders.", competency: "procurement", related: ["m00.decision-chain"] },
    { id: "m00.policy-bodies", name: "Policy and technical bodies", description: "Council of Ministers, Ministry of Finance, Supreme Council for Planning and Development (Vision 2035), KISR (resource data, Shagaya Phase I), EPA (environment, climate strategy), KDIPA (foreign investment).", competency: "context", related: ["m00.mewre-role"] },
    { id: "m00.decision-chain", name: "Decision chain and rework loops", description: "Sequential approvals where any body can return a file; expected duration grows as t/(1−p) per step, so the probability of return dominates the schedule.", competency: "delivery", related: ["m00.control-bodies", "m00.kapp-higher-committee"] },
  ],
  sections: [
    // ------------------------------------------------------------------ THEORY
    {
      layer: "theory",
      title: "The institutional map",
      blocks: [
        {
          kind: "md",
          md: md`Kuwaiti public projects are not delayed by a lack of engineering competence. They are paced by a chain of institutions, each of which has a legal right to say "not yet". Your job as a MEWRE PM is to know every link in that chain, what it checks, what documents it needs, and how long it really takes.

### MEWRE — four hats

The Ministry of Electricity and Water was established on **17 January 1962**; "Renewable Energy" was added to its name later (the renaming decree was not found in research). It reportedly has about 11 subdivisions covering power stations, transmission, distribution, water and project tendering. The ministry wears four hats:

1. **Policy owner** — renewable targets and strategy (e.g. the 2030–2050 strategy unveiled 7 March 2024).
2. **System operator and transmission owner** — dispatch, the 400/132 kV network, connection of new plants.
3. **Offtaker** — counterparty to the **30-year PPA** for solar IPPs and the **25-year ECWPA** (Energy Conversion and Water Purchase Agreement) for IWPPs.
4. **Direct procurer** — grid works and conventional EPC contracts through the Public Tenders Law, e.g. the **Shagaya–Al-Wafra 400 kV line**, awarded March 2026 to Power Grid Company (Kuwait) for **KD 48.6 m**.

Leadership as of the research date: Minister **Dr. Sabeeh Al-Mukhaizeem** (Amiri decree 24 March 2025; confirmed in office May 2026), Undersecretary **Adel Al-Zamel** (signed the March 2025 China framework agreement). A 2023 plan to corporatise the ministry into electricity, water and renewables subsidiaries has no evidence of implementation.`,
        },
        { kind: "sources", refs: ["m00-wiki-mewre", "m00-mew-org", "m00-agbi-2024-03-strategy", "m00-pvmag-2025-06-zone1", "m00-mees-2026-02-azn", "m00-megaproject-ohtl", "m00-amiri-2025-03", "m00-az-embassy-2026-05", "m00-mees-2025-03-china", "m00-sq-2023-corporation"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "Ministry structure and leadership",
          md: md`**Unknown:** (1) the decree and date that renamed MEW to MEWRE; (2) the exact names of the renewable-energy sector units in the org chart; (3) whether Dr. Al-Mukhaizeem is still minister in October 2026; (4) whether corporatisation happened. **How to verify:** mew.gov.kw organisational structure page; Kuwait Al-Youm (official gazette) for decrees; Amiri Diwan and KUNA news for cabinet changes. On your first day, get the current internal org chart from HR and note who signs what.`,
        },
        {
          kind: "md",
          md: md`### KAPP and the Higher Committee — the PPP engine

The **Kuwait Authority for Partnership Projects (KAPP)** was established under **PPP Law No. 116 of 2014** (replacing Law 7/2008); its **Executive Regulations are Decree No. 78 of 2015**. KAPP is attached to the **Minister of Finance**. The **Higher Committee for PPP**, chaired by the Minister of Finance, sets policy, approves projects and procurement stages, and approves the selected investor on KAPP's recommendation.

For a solar IPP, **KAPP is the procurer and MEWRE is the offtaker**. KAPP ran the RFQ, RFP and evaluation for Shagaya Phase III Zone 1 (1,100 MW) and Zone 2 (500 MW). On IWPPs KAPP also becomes a **shareholder**: in Az-Zour North 2&3 the ACWA Power/GIC consortium holds 40% and KAPP 60% (with 50% of the company earmarked for an IPO to Kuwaiti citizens). This makes KAPP your partner, your gatekeeper and — on the project company board — a co-owner.`,
        },
        { kind: "sources", refs: ["m00-kapp-law-116", "m00-kapp-exec-regs", "m00-state-ics-2024", "m00-meed-2024-01-zone1", "m00-mees-2026-02-azn", "m00-legal500-entry"] },
        {
          kind: "md",
          md: md`### The control bodies

| Body | Legal basis (as reported) | What it controls | Why it matters to you |
|---|---|---|---|
| **Central Agency for Public Tenders (CAPT)** | Public Tenders Law **49/2016** | Public tenders above **KD 75,000** (Art. 19). **Law 94/2026** (gazetted 27 Sep 2026, effective ~3 months later) raises the direct-contracting limit without CAPT approval to **KD 1,000,000 per financial year** | Every MEWRE-procured contract (grid, OE consultancy, O&M) runs through CAPT rules |
| **State Audit Bureau** (Diwan Al-Muhasaba) | Law **30/1964** as amended; Arts. 13–14 prior review | **Prior review** of contracts — reported threshold **KD 100,000** and above | Nothing signs without it; contracting without approval is a violation (one period: 28 cases worth KD 63 m) |
| **Fatwa and Legislation Department** | (not detailed in research) | Legal review of contract terms and government legal opinions | PPAs and lender terms; KAPP has said some lender conditions conflict with its requirements |

The Audit Bureau's role is not ceremonial. Even the 2025 GCCIA emergency power imports needed its **conditional approval** (KWD 161.381 m for June–December 2025).`,
        },
        { kind: "sources", refs: ["m00-trade-gov-public", "m00-tamimi-2026-tenders", "m00-escwa-law30", "m00-alrai-audit", "m00-kt-audit", "m00-meed-kapp-stakeholders", "m00-powerline-2025-07-gccia"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "Thresholds and Fatwa's formal stage",
          md: md`**Audit Bureau threshold KD 100,000:** reported by a minister via Al-Rai (undated) — low-to-medium confidence; may have been amended. **Fatwa's formal position in the PPP sequence:** not confirmed; in practice it reviews legal terms, but whether it signs off before or after the Audit Bureau varies by contract type. **Law 94/2026 details:** single law-firm source (Al Tamimi). **How to verify:** the Audit Bureau's own site and the text of Law 30/1964 as amended; Kuwait Al-Youm issue 1810 (27 Sep 2026) for Law 94/2026; ask the ministry's legal affairs department how Fatwa review is sequenced for PPAs.`,
        },
        {
          kind: "md",
          md: md`### Policy and technical bodies

- **Council of Ministers** — the top executive decision-maker. It cancelled the KNPC Al-Dibdibah EPC+F solar tender (citing COVID-19 and market impact) and approved the draft Public Tenders Law amendments on 9 September 2026. Since **10 May 2024**, when the Amir dissolved the National Assembly and suspended several constitutional provisions for up to four years, legislative power sits with the Amir and government: laws (including budgets and Law 94/2026) are issued by decree-law without parliamentary debate. Faster in principle — but the bottleneck moves to cabinet agendas.
- **Ministry of Finance** — prepares the state budget (fiscal year **1 April – 31 March**), allocates ministry capital budgets, and its Minister chairs the PPP Higher Committee.
- **Supreme Council for Planning and Development** (General Secretariat) — owns **Kuwait Vision 2035 "New Kuwait"** (seven pillars) and the National Development Plan; Shagaya and Dibdibah are linked in coverage to the 15%-by-2030 goal.
- **KISR** (Kuwait Institute for Scientific Research) — developed **Shagaya Phase I with MEW**; runs solar resource stations at five inland sites (GHI, DNI, DHI); co-authored the Kuwait Energy Outlook 2019 with UNDP. Your source of ground-truth irradiance and the institutional memory of the Shagaya pilot.
- **Environment Public Authority (EPA)** — environmental approvals and climate policy; launched a 2050 Low-Carbon Strategy in November 2023.
- **KDIPA** — Foreign Direct Investment Law **116/2013** (note: different year from PPP Law 116/2014); can license up to 100% foreign ownership.
- **KPC / KOC / KNPC** — the oil sector: separate captive solar plans (KOC–MEWRE 1 GW MoU 2024; KPC up to 2 GW plan 2026) that compete for land and grid capacity.`,
        },
        { kind: "sources", refs: ["m00-eu-dibdibah", "m00-pvmag-2021-confusion", "m00-tamimi-2026-tenders", "m00-constitutionnet-2024-05", "m00-idea-2024-05", "m00-kt-2026-budget", "m00-un-sdg-vision", "m00-keo-2019", "m00-iea-5540", "m00-aawsat-kisr", "m00-enerdata-2022-netzero", "m00-sq-2024-05-koc", "m00-sq-2026-01-kpc"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "EPA permitting law",
          md: md`RESEARCH.md does not give the environmental law number or the EIA procedure for utility PV. Do not cite a law number from memory. **How to verify:** EPA (epa.org.kw) and the ministry's environment/HSE department; ask the Owner's Engineer for the last EIA approval letter issued for a Shagaya project.`,
        },
        { kind: "widget", widget: "institution-map", caption: "Click each institution to see its role. Then trace the path a Zone 1-type IPP award takes from KAPP's evaluation to PPA signing." },
        {
          kind: "md",
          md: md`## How a decision actually flows

**Track A — a KAPP solar IPP** (synthesised from IJGlobal/MEED coverage of Kuwait PPPs):

1. MEWRE (public entity) requests the project → 2. KAPP feasibility study → 3. **Higher Committee approval** → 4. RFQ and prequalification → 5. RFP; technical, then financial bid opening → 6. Preferred bidder → 7. **Higher Committee approval** → 8. **State Audit Bureau approval** → 9. PPA signing (MEWRE) → 10. Financial close.

Zone 1 shows the pacing: RFQ January 2024 → RFP ~June 2025 → bids 15 January 2026 → financial bids opened ~July 2026 → Masdar/Fouad AlGhanim consortium **reported** selected ~August 2026 (MEED). The award "first expected in June 2026" slipped to Q3. Steps 7–10 were not publicly confirmed at the research date.

**Track B — a MEWRE-procured grid contract** (e.g. the 400 kV line):

1. Need identified, budget line in the ministry capital budget (MoF) → 2. Tender documents by MEWRE (often with a consultant) → 3. Tender through CAPT (above thresholds) → 4. Public bid opening → 5. Technical/commercial evaluation by a ministry committee → 6. CAPT award decision → 7. **Audit Bureau prior review** → 8. Contract signature (legal review as required).

Track B evidence: L&T was **lowest bidder at about KD 41.45 m in April 2025**; the contract was awarded to Power Grid Company (Kuwait) for **KD 48.6 m in March 2026** — roughly 11 months, and not to the lowest bidder (reason not found).`,
        },
        { kind: "sources", refs: ["m00-ijglobal-ppp10", "m00-meed-schools-ppp", "m00-meed-2024-01-zone1", "m00-agbi-2025-06-zone1", "m00-meed-2026-zone1-bids", "m00-timeskuwait-2026-fin", "m00-meed-2026-08-zone1", "m00-zawya-2026-q3", "m00-gulfbase-2025-ohtl", "m00-megaproject-ohtl"] },
        {
          kind: "md",
          md: md`### Modelling the chain: why rework dominates

Each approval body reviews a file in some time $t_i$. With probability $p_i$ it returns the file with observations ("ملاحظات"); you fix them and resubmit, and the clock restarts. If each cycle has the same duration and return probability, the number of cycles is geometric with mean $1/(1-p_i)$, so:`,
        },
        { kind: "equation", formula: "m00-approval-path" },
        {
          kind: "md",
          md: md`This simple model makes the PM's lever obvious: **reducing $p_i$ (getting it right the first time) is worth more than chasing the reviewer to shorten $t_i$**. A step with $p = 0.5$ takes on average twice its nominal time. Real reviews are not memoryless — the second pass is usually faster — so treat the formula as a conservative planning heuristic.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why so many gates?",
          md: md`Kuwait's control architecture is a deliberate response to public-money risk: separation between the entity that needs something (MEWRE), the one that buys it (CAPT or KAPP), the one that checks legality (Fatwa) and the one that checks financial propriety (Audit Bureau). Each gate has personal accountability for its signatories. Officials are rarely punished for delay but can be for an irregular approval — so incomplete files get returned. Your counter-strategy is **complete, pre-cleared files**, not pressure.`,
        },
      ],
    },
    // ------------------------------------------------------------------ APPLIED
    {
      layer: "applied",
      title: "Estimating approval-chain durations",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Post-bid chain for a solar IPP award",
          given: md`Illustrative planning assumptions (not official data) for the steps after KAPP recommends a preferred bidder:

| Step | Nominal review time $t_i$ | Return probability $p_i$ |
|---|---|---|
| Higher Committee approval | 4 weeks | 0.20 |
| State Audit Bureau prior review | 6 weeks | 0.40 |
| Fatwa legal review of PPA | 4 weeks | 0.25 |
| PPA signing logistics | 3 weeks | 0 |`,
          steps: [
            { md: md`Higher Committee: $4/(1-0.2) = 5.0$ weeks.` },
            { md: md`Audit Bureau: $6/(1-0.4) = 10.0$ weeks.` },
            { md: md`Fatwa: $4/(1-0.25) = 5.33$ weeks.` },
            { md: md`Signing: $3/(1-0) = 3.0$ weeks.` },
            { md: md`Expected total: $5.0 + 10.0 + 5.33 + 3.0 = 23.3$ weeks, against a "naive" $4+6+4+3 = 17$ weeks. The rework loops add **6.3 weeks (37%)**, and the Audit Bureau alone contributes 4 of them.` },
          ],
          result: md`About 23 weeks (~5.4 months) from preferred bidder to PPA signature under these assumptions. If you bring the Audit Bureau's return probability down from 0.4 to 0.2 (pre-submission checklist, complete annexes), its expected time drops from 10 to 7.5 weeks.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Improving first-pass quality",
          given: md`Same chain, but you run a pre-submission "red team" review with ministry legal and finance so that the Higher Committee return probability falls to 0.2 (unchanged), the Audit Bureau's to 0.2, and Fatwa's stays at 0.25.`,
          steps: [
            { md: md`Higher Committee: 5.0 weeks (unchanged).` },
            {
              md: md`Audit Bureau: $6/(1-0.2) = 7.5$ weeks.`,
              hidden: true,
              check: { prompt: "Expected Audit Bureau duration with p = 0.2", answer: 7.5, unit: "weeks", tolerance: { abs: 0.05 } },
            },
            {
              md: md`Total: $5.0 + 7.5 + 5.33 + 3.0 = 20.83$ weeks.`,
              hidden: true,
              check: { prompt: "New expected total duration", answer: 20.83, unit: "weeks", tolerance: { abs: 0.1 } },
            },
            { md: md`Saving: $23.33 - 20.83 = 2.5$ weeks. For a 1,100 MW plant, lesson 5 shows each week of delay can be worth well over KWD 1 m in displaced fuel — the red-team review pays for itself many times over.` },
          ],
          result: md`About 20.8 weeks, a 2.5-week saving from one process change that costs a few days of internal review.`,
        },
        {
          kind: "question",
          question: {
            id: "m00-l02-p1",
            type: "numeric",
            prompt: md`A MEWRE consultancy contract must pass Fatwa review (nominal 5 weeks, return probability 0.3) and then Audit Bureau prior review (nominal 8 weeks, return probability 0.5). Using the rework model, what is the expected total duration in weeks?`,
            answer: 23.14,
            tolerance: { abs: 0.15 },
            unit: "weeks",
            explanation: md`Fatwa: $5/(1-0.3) = 7.14$ weeks. Audit Bureau: $8/(1-0.5) = 16$ weeks. Total $\approx 23.1$ weeks — versus 13 weeks nominal. A 50% return probability doubles a step. This is why experienced PMs ask the Audit Bureau liaison what observations were raised on the last similar contract and pre-empt them.`,
            concepts: ["m00.decision-chain"],
            difficulty: 2,
          },
        },
      ],
    },
    // ------------------------------------------------------------------ FIELD
    {
      layer: "field",
      title: "Who the PM talks to, and about what",
      blocks: [
        {
          kind: "md",
          md: md`| Counterpart | What they need from you | Documents | Cadence |
|---|---|---|---|
| Your sector Assistant Undersecretary / Undersecretary | Clear status, decisions needed, risks to the Minister | Weekly status note; decision memos (مذكرة) | Weekly; ad hoc for crises |
| KAPP project team and its transaction advisers | Technical requirements, offtaker positions on PPA, grid interface data, evaluation input | RFQ/RFP technical schedules, PPA mark-ups, clarification responses | Weekly during procurement |
| MEWRE Transmission / control centre | Connection studies, outage requests, protection settings | Grid connection agreement inputs, outage requests, energisation plan | Monthly, then weekly near energisation |
| Ministry legal affairs; Fatwa (through legal affairs) | Contract drafts, deviation lists, legal questions | Draft contracts, legal opinion requests | Per milestone |
| Ministry finance / budget department; MoF | Budget requests, cash-flow forecasts, payment certificates | Budget submission for next FY, cash-flow S-curve | Annual cycle + quarterly |
| State Audit Bureau (via ministry liaison) | Complete contract file, justification of price and procedure | Contract, tender minutes, evaluation report, budget certificate | Per contract |
| CAPT | Tender documents, evaluation reports, award recommendations | Tender booklet, technical evaluation report | Per tender |
| KISR | Data requests, lessons learned from Shagaya Phase I | Data-sharing letters | As needed |
| Owner's Engineer (OE), developer, EPC | Decisions, approvals, interface information | Design submittals, progress reports, NCRs, variation requests | Weekly |

The Arabic word you will hear most is **"إحالة"** (referral): files move by being formally referred from one desk to another. Track every referral — date sent, to whom, reference number — in a simple register. When something "disappears", the register tells you where it is.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Classic institutional mistakes",
          md: md`1. **Going around the chain** — contacting the Audit Bureau or Fatwa directly instead of through the ministry's liaison/legal affairs. It annoys your own hierarchy and the file still won't move. 2. **Assuming KAPP speaks for MEWRE** — on PPA offtaker positions, MEWRE must state its own view in writing. 3. **Treating a press report as a decision** — a MEED "selected" report is not an Higher Committee approval or a signed PPA. 4. **Forgetting the oil sector** — KOC/KPC solar plans can claim the same land corridor or substation capacity. 5. **Submitting incomplete files** — each return costs a full review cycle.`,
        },
        {
          kind: "checklist",
          title: "First-30-days institutional checklist",
          items: [
            "Obtain the current ministry org chart and the delegation-of-authority matrix (who signs what, up to which value).",
            "Identify your named counterpart at KAPP, Transmission, legal affairs, budget, and the Audit Bureau liaison.",
            "Set up a referral register (file, reference number, date, holder, due date).",
            "Collect the last three Audit Bureau observation letters on similar contracts and list the recurring observations.",
            "Read PPP Law 116/2014, Decree 78/2015 and Public Tenders Law 49/2016 (with Law 94/2026 changes) — at least the articles on approvals.",
            "Meet KISR's solar resource team and request the Shagaya measurement data and Phase I lessons learned.",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask on day one",
          items: [
            "Which approvals on my projects are pending today, with whom, since when, and what observations were raised?",
            "What is the ministry's practice for Fatwa review of PPAs and of EPC contracts — before or after Audit Bureau submission?",
            "Who on KAPP's side owns the PPA mark-up, and who on MEWRE's side has authority to agree offtaker positions?",
            "Which grid works for my project are on MEWRE's side, what is their budget line, and which fiscal year funds them?",
            "Is any oil-sector (KOC/KPC) solar project planned near our site or substation?",
          ],
        },
        {
          kind: "bilingual",
          title: "Cover memo template: referral of a file for review",
          en: md`**To:** Director, Legal Affairs Department
**From:** Project Manager, Renewable Energy Projects
**Subject:** Referral of the draft [contract name] for legal review prior to submission to the State Audit Bureau

With reference to the above subject, please find attached the draft contract together with the tender committee minutes, the technical evaluation report, and the budget availability certificate for fiscal year 2026/2027.

We kindly request your review and observations by [date], in order to submit the file to the State Audit Bureau for prior review within the project schedule. The attached checklist confirms that all documents required in previous Audit Bureau observations are included.

With best regards,`,
          ar: `**إلى:** السيد/ مدير إدارة الشؤون القانونية المحترم
**من:** مدير المشروع – مشاريع الطاقة المتجددة
**الموضوع:** إحالة مسودة عقد [اسم العقد] للمراجعة القانونية قبل العرض على ديوان المحاسبة

بالإشارة إلى الموضوع أعلاه، نرفق لكم مسودة العقد مع محضر لجنة المناقصة، وتقرير التقييم الفني، وشهادة توفر الاعتماد المالي للسنة المالية 2026/2027.

نرجو التكرم بمراجعة المسودة وإفادتنا بملاحظاتكم في موعد أقصاه [التاريخ]، وذلك تمهيداً لعرض الملف على ديوان المحاسبة للرقابة المسبقة ضمن الجدول الزمني للمشروع. وتؤكد قائمة التحقق المرفقة استيفاء جميع المستندات التي وردت في ملاحظات ديوان المحاسبة السابقة.

وتفضلوا بقبول فائق الاحترام والتقدير،`,
        },
        { kind: "scenario", scenario: "m00-s2" },
        {
          kind: "feynman",
          prompt: "Explain to a foreign developer's project director why the award of a Kuwaiti solar IPP can be announced in the press months before a PPA is signed.",
          keyPoints: [
            "KAPP runs procurement and recommends a preferred bidder; MEWRE is the offtaker.",
            "The Higher Committee for PPP (chaired by the Minister of Finance) must approve the selected investor.",
            "The State Audit Bureau performs prior review before signature; Fatwa reviews legal terms.",
            "Each body can return the file with observations; returns dominate the timeline.",
            "Press reports (e.g. MEED) of a 'selection' precede these formal approvals.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m00-l02-q1",
      type: "mcq",
      prompt: md`For a Shagaya Phase III solar IPP, which statement is correct?`,
      options: [
        "MEWRE runs the RFP and KAPP signs the PPA",
        "KAPP runs the procurement and MEWRE is the offtaker under a 30-year PPA",
        "CAPT runs the procurement because the value exceeds KD 75,000",
        "The developer is selected by the Council of Ministers directly",
      ],
      answer: 1,
      explanation: md`KAPP (PPP Law 116/2014) procures; the Higher Committee approves; MEWRE signs the 30-year PPA as offtaker. CAPT governs conventional public tenders, not PPP procurement under the PPP Law.`,
      concepts: ["m00.kapp-higher-committee", "m00.mewre-role"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m00-l02-q2",
      type: "order",
      prompt: md`Put the main steps of a KAPP PPP procurement in order.`,
      items: [
        "Public entity (MEWRE) request",
        "KAPP feasibility study",
        "Higher Committee approval of the project",
        "RFQ and prequalification",
        "RFP and bid opening (technical, then financial)",
        "Preferred bidder and Higher Committee approval",
        "State Audit Bureau approval",
        "PPA signing and financial close",
      ],
      explanation: md`This sequence is synthesised from IJGlobal and MEED coverage. Notice two Higher Committee gates (project and investor) and that the Audit Bureau comes after the Higher Committee but before signature. Fatwa's exact position is unconfirmed.`,
      concepts: ["m00.decision-chain", "m00.kapp-higher-committee"],
      difficulty: 2,
    },
    {
      id: "m00-l02-q3",
      type: "multi",
      prompt: md`Which statements about the State Audit Bureau are supported by the research? (Select all.)`,
      options: [
        "It was created by Law No. 30 of 1964",
        "It performs prior review of contracts (Arts. 13–14)",
        "It approved the 2025 GCCIA power imports conditionally",
        "It runs the technical evaluation of IPP bids",
        "A reported prior-review threshold is KD 100,000 (to be verified)",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`The Bureau does not evaluate bids technically — KAPP (for PPPs) or the ministry's committees (for tenders) do. The KD 100,000 threshold is low-to-medium confidence and must be re-checked.`,
      concepts: ["m00.control-bodies"],
      difficulty: 2,
    },
    {
      id: "m00-l02-q4",
      type: "mcq",
      prompt: md`Who chairs the Higher Committee for PPP?`,
      options: ["The Minister of Electricity, Water and Renewable Energy", "The Prime Minister", "The Minister of Finance", "The President of the Audit Bureau"],
      answer: 2,
      explanation: md`The Minister of Finance chairs it, and KAPP is attached to the Minister of Finance. This is why fiscal considerations weigh heavily in PPP approvals.`,
      concepts: ["m00.kapp-higher-committee"],
      difficulty: 1,
    },
    {
      id: "m00-l02-q5",
      type: "numeric",
      prompt: md`An approval step has a nominal review time of 6 weeks and a 40% chance of being returned for rework each time. What is its expected duration in weeks?`,
      answer: 10,
      tolerance: { abs: 0.1 },
      unit: "weeks",
      explanation: md`$E[T] = t/(1-p) = 6/0.6 = 10$ weeks. The 40% return probability adds 4 weeks on average.`,
      concepts: ["m00.decision-chain"],
      difficulty: 2,
    },
    {
      id: "m00-l02-q6",
      type: "decision",
      prompt: md`The Audit Bureau returns your OE consultancy contract with five observations, three of which concern missing documents you had sent separately by email. What do you do?`,
      options: [
        { text: "Call the Audit Bureau examiner directly and explain the documents were emailed.", score: 0.2, feedback: "Bypassing the ministry liaison is poor form and emails are not part of the formal file. The file is what counts." },
        { text: "Prepare a formal response through the ministry liaison addressing all five observations point by point, attach the missing documents to the official file, and add them to your pre-submission checklist for future contracts.", score: 1, feedback: "Correct: formal, complete, and you reduce the return probability on future files." },
        { text: "Escalate to the Undersecretary to pressure the Bureau.", score: 0.1, feedback: "Pressure on a control body rarely helps and can backfire; the observations are legitimate if documents were missing from the file." },
        { text: "Resubmit only the three missing documents and argue the other two observations later.", score: 0.4, feedback: "Partial responses invite another return cycle. Address everything in one submission." },
      ],
      explanation: md`Every return is a full review cycle. Respond formally and completely through the proper channel, then fix the process that caused the return.`,
      concepts: ["m00.control-bodies", "m00.decision-chain"],
      difficulty: 2,
    },
    {
      id: "m00-l02-q7",
      type: "mcq",
      prompt: md`Since May 2024, how are laws such as the 2026 Public Tenders Law amendment (Law 94/2026) enacted?`,
      options: [
        "Passed by the National Assembly after three readings",
        "Issued by decree-law by the Amir and government while the Assembly is suspended",
        "Issued by CAPT as regulations",
        "By referendum",
      ],
      answer: 1,
      explanation: md`On 10 May 2024 the Amir dissolved the National Assembly and suspended several constitutional provisions for up to four years, consolidating legislative power with the Amir and government. The cabinet approved the draft amendment on 9 September 2026 and it was gazetted on 27 September 2026.`,
      concepts: ["m00.policy-bodies"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m00-l02-f1", front: "KAPP legal basis", back: "PPP Law No. 116 of 2014; Executive Regulations Decree No. 78 of 2015; attached to the Minister of Finance.", concepts: ["m00.kapp-higher-committee"] },
    { id: "m00-l02-f2", front: "Higher Committee for PPP — chair and powers", back: "Chaired by the Minister of Finance; approves projects, procurement stages and the selected investor on KAPP's recommendation.", concepts: ["m00.kapp-higher-committee"] },
    { id: "m00-l02-f3", front: "State Audit Bureau — basis and role", back: "Law No. 30 of 1964 as amended; prior review of contracts (Arts. 13–14); reported threshold KD 100,000 (verify).", concepts: ["m00.control-bodies"] },
    { id: "m00-l02-f4", front: "CAPT — law and threshold", back: "Public Tenders Law 49/2016: tenders above KD 75,000 (Art. 19). Law 94/2026: direct contracting up to KD 1 m per FY without CAPT approval (effective ~late Dec 2026).", concepts: ["m00.control-bodies"] },
    { id: "m00-l02-f5", front: "MEWRE's four hats", back: "Policy owner; system operator/transmission owner; offtaker (30-yr PPA, 25-yr ECWPA); direct procurer of grid/EPC works.", concepts: ["m00.mewre-role"] },
    { id: "m00-l02-f6", front: "Expected duration of a step with rework", back: md`$E[T] = t/(1-p)$ — a 50% return probability doubles the step.`, concepts: ["m00.decision-chain"] },
    { id: "m00-l02-f7", front: "KISR's role for a MEWRE solar PM", back: "Developed Shagaya Phase I with MEW; runs 5 inland solar resource stations (GHI/DNI/DHI); KEO 2019 with UNDP.", concepts: ["m00.policy-bodies"] },
    { id: "m00-l02-f8", front: "PPP Law 116/2014 vs FDI Law 116/2013", back: "Same number, different years: 116/2014 = PPP law (KAPP); 116/2013 = FDI law (KDIPA).", concepts: ["m00.policy-bodies", "m00.kapp-higher-committee"] },
    { id: "m00-l02-f9", front: "Shagaya–Al-Wafra 400 kV line award", back: "Lowest bid L&T ~KD 41.45 m (Apr 2025); awarded to Power Grid Company (Kuwait) KD 48.6 m (Mar 2026). Reason for non-lowest award not found.", concepts: ["m00.mewre-role", "m00.decision-chain"] },
  ],
  scenarios: [
    {
      id: "m00-s2",
      title: "The file that keeps coming back",
      dayInLife: true,
      context: md`You inherited the Owner's Engineer consultancy contract for the ministry's Shagaya grid interface works. It has been returned once by the Audit Bureau and is now with Legal Affairs. The OE's mobilisation is on the critical path for the 400 kV substation design review. Your Director wants it signed "this month".`,
      start: "a",
      concepts: ["m00.control-bodies", "m00.decision-chain"],
      nodes: {
        a: {
          md: md`What is your first move?`,
          choices: [
            { text: "Pull the first Audit Bureau observation letter and the current file; build a point-by-point compliance matrix.", next: "b", score: 10, feedback: "Start with the facts: what exactly was observed, and is every point closed in the file?" },
            { text: "Ask your Director to call the Audit Bureau President.", next: "c", score: 2, feedback: "Escalating before you know the status wastes senior capital and may embarrass your Director." },
            { text: "Tell the OE to mobilise at risk.", next: "d", score: 0, feedback: "Contracting or starting work without Audit Bureau approval is a violation — the Bureau counted 28 such cases worth KD 63 m in one period. Never do this." },
          ],
        },
        b: {
          md: md`The matrix shows two observations still open: the price-reasonableness justification and the budget availability certificate for the new fiscal year. Legal Affairs is waiting for them.`,
          choices: [
            { text: "Get the budget certificate from the finance department and write a price justification benchmarking the OE fee against two comparable ministry/KAPP contracts; send both to Legal Affairs with the matrix.", next: "e", score: 10, feedback: "You closed the real blockers. A benchmarked price justification is exactly what the Bureau looks for." },
            { text: "Ask Legal Affairs to submit anyway and handle the two points if raised again.", next: "e", score: 3, feedback: "Near-certain second return — another full cycle." },
          ],
        },
        c: {
          md: md`Your Director asks you, "What exactly is outstanding?" You don't know.`,
          choices: [
            { text: "Apologise, go back and build the compliance matrix.", next: "b", score: 5, feedback: "Recovered, but you spent credibility. Know the file before escalating." },
          ],
        },
        d: {
          md: md`The finance department refuses to process the OE's first invoice: there is no approved contract.`,
          choices: [
            { text: "Stop the OE, regularise through the formal route, and brief your Director honestly.", next: "b", score: 3, feedback: "Right correction, but the OE may claim costs and the irregularity may itself be reported." },
          ],
        },
        e: {
          md: md`The file is resubmitted. What do you do while it is under review?`,
          choices: [
            { text: "Log it in the referral register with a follow-up date, prepare the OE kick-off pack so mobilisation can start the day after signature, and inform the substation design team of the realistic date.", score: 10, feedback: "Excellent: you use the review time productively and manage downstream expectations." },
            { text: "Wait.", score: 4, feedback: "Passive. Prepare everything that can be prepared without a contract." },
          ],
        },
      },
    },
  ],
};

export default lesson;
