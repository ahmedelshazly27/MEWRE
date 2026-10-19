import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m11-l03",
  title: "PPP Procurement via KAPP",
  summary:
    "PPP Law 116/2014 and Decree 78/2015, the stage-by-stage KAPP process from feasibility to financial close, Kuwait's distinctive project-company shareholding (citizen IPO, public entities, private investor), the Az-Zour North precedent, and what MEWRE's role as offtaker means for the PM over a 30-year PPA.",
  minutes: 80,
  objectives: [
    "You can describe the legal basis and governance of KAPP and the Higher Committee, and the stages of a KAPP procurement with the Kuwaiti approval gates.",
    "You can compute the shareholding of a Kuwaiti PPP project company and explain the IPO mechanism and its conflicts in the sources.",
    "You can label the parties of an IPP structure and explain each party's obligations, with MEWRE as offtaker.",
    "You can compute annual PPA payments including deemed energy and explain why grid delay creates offtaker liability.",
  ],
  concepts: [
    { id: "m11.ppp-law", name: "PPP Law 116/2014 and Decree 78/2015", description: "Kuwait's PPP framework: KAPP (attached to the Minister of Finance), the Higher Committee chaired by the Minister of Finance, procurement stages, and project-company shareholding rules; replaced Law 7/2008.", competency: "procurement", related: ["m11.kapp-stages", "m11.ppp-shareholding", "m00.kapp-higher-committee"] },
    { id: "m11.kapp-stages", name: "KAPP procurement stages", description: "Request → feasibility → Higher Committee → RFQ → RFP (technical then financial) → preferred bidder → Higher Committee → Audit Bureau → PPA signing → financial close.", competency: "procurement", related: ["m11.ppp-law", "m00.decision-chain", "m15.approval-chain"] },
    { id: "m11.ppp-shareholding", name: "PPP project-company shareholding", description: "For projects above KD 60 m: 50% IPO to citizens, 6–24% public entities, at least 26% private (secondary source); IWPP practice 40% developer / 60% KAPP; KAPP warehouses IPO shares until operation.", competency: "finance", related: ["m11.ppp-law", "m09.kuwait-ppp-model", "m10.project-finance"] },
    { id: "m11.offtaker-role", name: "MEWRE as offtaker", description: "Counterparty to the 30-year PPA: pays for delivered (and deemed) energy, provides grid connection and dispatch, manages interfaces, curtailment and change-in-law exposure.", competency: "contracts", related: ["m11.deemed-energy", "m00.mewre-role", "m15.offtaker-pm-role"] },
    { id: "m11.deemed-energy", name: "Deemed energy and grid-delay liability", description: "Energy the plant could have delivered but did not because of offtaker-side events (grid unavailability, curtailment beyond allowances), which the offtaker pays as if delivered.", competency: "contracts", related: ["m11.offtaker-role", "m09.deemed-energy", "m06.deemed-energy"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "The PPP framework",
      blocks: [
        {
          kind: "md",
          md: md`## Legal basis and governance

- **PPP Law No. 116 of 2014** established the **Kuwait Authority for Partnership Projects (KAPP)**, replacing Law 7/2008. Its **Executive Regulations are Decree No. 78 of 2015**.
- KAPP is **attached to the Minister of Finance**.
- The **Higher Committee for PPP**, chaired by the Minister of Finance, sets policy, approves projects and procurement stages, and approves the selected investor on KAPP's recommendation.
- The older **Law No. 39 of 2010** governs joint-stock companies building power and water plants (the IWPP legacy law).
- **No 2025–2026 PPP decree-law or amendment was found** in research.
- Foreign ownership: the Companies Law caps non-GCC ownership at 49% unless **KDIPA** (FDI Law 116/2013) licenses otherwise — KDIPA can license up to 100% and grant incentives (up to 10 years of income-tax exemption, customs relief) case by case. For PPP SPVs the PPP law's own shareholding structure governs.`,
        },
        { kind: "sources", refs: ["m11-kapp-law-116", "m11-kapp-exec-regs", "m11-state-ics-2024", "m11-legal500-entry", "m11-kdipa-faq", "m11-tamimi-fdi"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "PPP law amendments",
          md: md`**Unknown:** whether any amendment to Law 116/2014 or new decree-law was issued in 2025–2026. **How to verify:** kapp.gov.kw legislation page and Kuwait Al-Youm. Read the Arabic text for article numbers before citing any.`,
        },
        {
          kind: "md",
          md: md`## The KAPP stage process

Synthesised from IJGlobal and MEED coverage, with good-practice content (World Bank PPP Reference Guide) for what happens inside each stage:

| # | Stage | What happens | MEWRE PM's contribution |
|---|---|---|---|
| 1 | **Public entity request** | MEWRE requests a project (e.g. 1,100 MW PV at Shagaya) | Need statement, site, grid connection concept, demand case |
| 2 | **KAPP feasibility** | Technical, financial, legal, environmental feasibility; value-for-money; risk allocation; transaction advisers appointed | Technical data, grid studies, land, resource data (KISR) |
| 3 | **Higher Committee approval** | Project approved to proceed as PPP | Offtaker confirmation |
| 4 | **RFQ / prequalification** | Technical and financial capability of developers | Review technical criteria |
| 5 | **RFP** | Draft PPA, technical specifications, evaluation method; clarifications, addenda; technical then financial opening | Technical schedules, PPA offtaker positions, clarification answers |
| 6 | **Preferred bidder** | Evaluation report, recommendation | Technical and deviation evaluation input |
| 7 | **Higher Committee approval** | Selected investor approved | Offtaker readiness |
| 8 | **State Audit Bureau approval** | Prior review | Offtaker parts of the file |
| 9 | **PPA signing** | MEWRE signs as offtaker | Final PPA, CP lists |
| 10 | **Financial close** | Lenders' conditions precedent satisfied | Grid, land, permits CPs on the ministry side |

The **Fatwa and Legislation Department** reviews legal terms (exact stage unconfirmed), and KAPP has said some **lender conditions conflict with its requirements** — a recurring source of delay between stages 6 and 10.`,
        },
        { kind: "sources", refs: ["m11-ijglobal-ppp10", "m11-meed-schools-ppp", "m11-meed-kapp-stakeholders", "m11-wb-ppp"] },
        { kind: "diagram", diagram: "ppp-structure", caption: "A Kuwaiti IPP structure: sponsors and the citizen IPO own the SPV; lenders finance it; EPC and O&M contractors deliver; MEWRE buys the output; KAPP procures and holds state shares." },
        {
          kind: "md",
          md: md`## Shareholding: Kuwait's distinctive feature

For PPP projects above **KD 60 m**, a secondary legal guide describes the project company's ownership as:

- **50%** offered by **IPO to Kuwaiti citizens**;
- **6–24%** to public entities;
- **at least 26%** to the private investor.

KAPP **warehouses the IPO shares** until the project is operating; unsubscribed shares stay with KAPP. In formula form:`,
        },
        { kind: "equation", formula: "m11-share-split" },
        {
          kind: "md",
          md: md`**In practice (IWPPs):** the developer consortium holds **40%** and the state through KAPP **60%** (with 50% earmarked for the IPO). Examples: Az-Zour North 1 and Az-Zour North 2&3.

**Az-Zour North 1 precedent:** ~1,500–1,540 MW plus desalination; owner Shamal Az-Zour Al-Oula KSC; private 40% (ENGIE 17.5%, Sumitomo 17.5%, A.H. Al-Sagar 5%), government 60%; **40-year ECWPA** with MEW. The 50% citizen IPO in 2019 was **oversubscribed** and the company listed on **Boursa Kuwait**; ACWA Power later bought ENGIE's 17.5%.

**AZN 2&3:** ACWA Power + GIC (40%) with KAPP (60%); letter agreement 10 Aug 2025; **25-year ECWPA signed 3 Feb 2026**; ~USD 4.1 bn; EPC SEPCO-III; GE Vernova gas turbines.

**Solar IPPs** (Zones 1–2) use a **30-year PPA with MEWRE**; the Zone 2 RFP reportedly allows a customs-duty exemption of up to 10% on imported equipment for 10 years.`,
        },
        { kind: "sources", refs: ["m11-legal500-entry", "m11-tamimi-ppp", "m11-mondaq-ppp", "m11-engie-azn1", "m11-mees-2019-ipo", "m11-gco-acwa-engie", "m11-gic-2025-08", "m11-mees-2026-02-azn", "m11-pvmag-2025-06-zone1", "m11-sq-2025-11-zone2"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "Shareholding conflict and missing PPA terms",
          md: md`**Conflict:** a "6–26% government / 24–44% private" formulation also circulates; the legal guide says 6–24% public and ≥26% private. **Unknown:** PPA currency (KWD or USD indexation), the form of government guarantee/support, the termination-payment regime, and the exact wording of the Zone 2 customs clause. **How to verify:** Law 116/2014 text (Arabic), Decree 78/2015, and the Zone 1/Zone 2 RFP and draft PPA in KAPP's data room — as offtaker PM you should have access.`,
        },
        {
          kind: "md",
          md: md`## MEWRE as offtaker: what you sign up to

Under a typical solar PPA (generic structure; check the actual Kuwaiti PPA):

- **Payment:** the offtaker pays the tariff for **delivered energy** and for **deemed energy** — energy the plant would have delivered but for offtaker-side events (grid unavailability, curtailment beyond allowances, late grid connection):`,
        },
        { kind: "equation", formula: "m11-ppa-payment" },
        {
          kind: "md",
          md: md`- **Grid connection:** for Zone 1 the developer builds the 400 kV substation, while the Shagaya–Al-Wafra 400 kV line is MEWRE's (awarded March 2026 to Power Grid Company (Kuwait), KD 48.6 m). If MEWRE's line is late, the plant may be "deemed complete" and paid deemed energy — or COD extended — depending on the PPA.
- **Dispatch and curtailment:** the control centre may curtail; above an annual allowance, curtailment is compensated.
- **Change in law, taxes, customs:** typically offtaker/government risk. Law 94/2026's local-content rules raise the question of whether they apply to PPP EPC contracts.
- **Performance:** the IPP guarantees availability/energy; shortfalls lead to LDs or reduced payments.
- **Term:** 30 years for solar — longer than most careers. Your successors inherit the contract you shape now.`,
        },
        { kind: "sources", refs: ["m11-megaproject-ohtl", "m11-taiyang-zone1-rfp"] },
        {
          kind: "callout",
          tone: "why",
          title: "Why the offtaker PM matters even though KAPP procures",
          md: md`KAPP runs the competition, but **MEWRE carries the 30-year obligations**: paying, connecting, dispatching and absorbing interface risk. Every RFP clause on grid delay, curtailment and deemed energy is a contingent liability on the ministry's budget. The offtaker PM's job is to make sure the ministry can actually perform what it promises — and to price the consequences when it can't.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Shares and payments",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Shareholding of a solar SPV",
          given: md`Hypothetical SPV with equity of KWD 120 m, structured on the IWPP practice: developer 40%, KAPP 60% of which 50 points are earmarked for the citizen IPO and 10 points stay with public entities.`,
          steps: [
            { md: md`IPO: $0.50 \times 120 = 60$ KWD m (warehoused by KAPP until operation).` },
            { md: md`Public entities: $0.10 \times 120 = 12$ KWD m.` },
            { md: md`Developer: $0.40 \times 120 = 48$ KWD m.` },
            { md: md`Check against the legal guide: public 10% (within 6–24%), private 40% (≥26%), IPO 50% — compliant.` },
          ],
          result: md`The developer contributes KWD 48 m of equity but the state (via KAPP) is the majority owner until the IPO. Board governance, dividend policy and shareholder approvals involve KAPP — plan for it.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Annual PPA payment with deemed energy",
          given: md`A 1,100 MW plant delivers 2,409,000 MWh in a year. A MEWRE-side 400 kV outage of several days in March (outside allowances) prevented 18,000 MWh that the plant could have exported (verified by the independent engineer from irradiance data). Assumed tariff 8 fils/kWh (actual tariff not published).`,
          steps: [
            {
              md: md`Deemed energy payment: $18{,}000 \times 1{,}000 \times 0.008 = 144{,}000$ KWD.`,
              hidden: true,
              check: { prompt: "Deemed energy payment (KWD)", answer: 144000, unit: "KWD", tolerance: { abs: 10 } },
            },
            {
              md: md`Total: $(2{,}409{,}000 + 18{,}000) \times 1{,}000 \times 0.008 = 19.416$ KWD m.`,
              hidden: true,
              check: { prompt: "Total annual payment (KWD million)", answer: 19.416, unit: "KWD m", tolerance: { abs: 0.005 } },
            },
            { md: md`The ministry pays KWD 144k for energy it never received — and still burns the fuel that energy would have displaced (lesson m00-l03). At the m00-l03 fuel values of 26–37 fils/kWh that replacement fuel costs roughly KWD 0.47–0.67 m, i.e. three to four-and-a-half times the deemed payment itself.` },
          ],
          result: md`About KWD 19.4 m, of which KWD 0.14 m is deemed energy. Grid availability on the ministry side is a budget item, not just an engineering KPI.`,
        },
        {
          kind: "question",
          question: {
            id: "m11-l03-p1",
            type: "numeric",
            prompt: md`Under the legal guide's rule, what is the **minimum** private-investor equity (KWD m) in a PPP project company with total equity of KWD 90 m?`,
            answer: 23.4,
            tolerance: { abs: 0.05 },
            unit: "KWD m",
            explanation: md`At least 26%: $0.26 \times 90 = 23.4$ KWD m. In practice developers have held 40% on Kuwaiti IWPPs. Verify the percentage against the law text — the sources conflict.`,
            concepts: ["m11.ppp-shareholding"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "The offtaker PM inside a KAPP procurement",
      blocks: [
        {
          kind: "md",
          md: md`**Who you work with:** KAPP's project director and its **transaction advisers** (technical, legal, financial); MEWRE Transmission and the control centre; ministry legal affairs; the developer and its **lenders' technical adviser (LTA)**; later the **independent engineer** (IE) who certifies COD and deemed energy.

**Documents you will handle:** RFQ evaluation criteria; RFP technical schedules (minimum functional specification, grid code compliance, performance tests); draft PPA (offtaker sections); grid connection agreement; bidder clarification log; deviation register; conditions-precedent tracker; interface schedule.

**Where PPP procurements stall:**
- RFP deadlines extended (Zone 1: Sep 2025 → Jan 2026; Zone 2: Feb → Apr 2026 and later; Al-Khairan: three extensions).
- Lender requirements vs government positions (termination, step-in, currency) — reported by KAPP.
- Post-selection approvals (Higher Committee, Audit Bureau).
- Interface CPs on the government side: land handover, grid connection dates, permits.
- Cancellations: Abdaliya ISCC (KAPP cancelled before award); Dibdibah EPC+F (cancelled, moved to KAPP).`,
        },
        { kind: "sources", refs: ["m11-zawya-2026-zone2-ext", "m11-meed-2026-06-khairan", "m11-meed-kapp-stakeholders", "m11-ippj-abdaliya", "m11-eu-dibdibah"] },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong for offtakers",
          md: md`1. **Promising grid dates you don't control** — deemed-energy exposure. 2. **Uncapped curtailment compensation** — the control centre will curtail midday PV on low-load winter days. 3. **Technical specs that conflict with the grid code** — late clarifications and addenda. 4. **Not tracking ministry-side CPs** — financial close slips and the bidder's price validity expires. 5. **Treating the PPA as KAPP's document** — MEWRE signs it and lives with it for 30 years.`,
        },
        { kind: "diagram", diagram: "ppp-structure", caption: "Trace the money (tariff → SPV → lenders/sponsors/IPO shareholders) and the risk (who bears grid delay, construction delay, underperformance)." },
        {
          kind: "checklist",
          title: "Offtaker PM checklist for a KAPP IPP",
          items: [
            "Grid connection scope split (developer vs MEWRE) and dates written into both the PPA and MEWRE's own grid project schedule.",
            "Deemed-energy triggers, grace periods and caps reviewed with Transmission and finance.",
            "Curtailment allowance consistent with system studies (winter midday minimum load).",
            "Technical schedules checked against the MEWRE grid code and protection philosophy.",
            "Ministry-side conditions precedent (land, permits, connection agreement) tracked with owners and dates.",
            "Budget provision for PPA payments from COD in the right fiscal year.",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask KAPP's transaction advisers",
          items: [
            "What is the deemed-energy regime if the MEWRE 400 kV line is late, and how is lost energy calculated (irradiance-based model, IE certification)?",
            "What curtailment allowance (hours or MWh per year) is uncompensated, and what studies support it?",
            "Which lender requirements remain open (termination payments, step-in, currency), and which need MEWRE positions?",
            "Does the RFP require the EPC to meet Law 94/2026-style local-content thresholds, and who verifies them?",
            "When will the IPO shares be offered, and what governance role will MEWRE have before then?",
          ],
        },
        { kind: "scenario", scenario: "m11-s3" },
        {
          kind: "feynman",
          prompt: "Explain the Kuwaiti PPP model to a European developer who has only done merchant or utility-owned solar.",
          keyPoints: [
            "KAPP procures under PPP Law 116/2014; the Higher Committee (Minister of Finance) approves projects and investors; Audit Bureau reviews before signing.",
            "MEWRE is the offtaker under a 30-year PPA (25-year ECWPA for IWPPs).",
            "Project company ownership includes a 50% citizen IPO, public entities and a private share (≥26% by law; 40% in IWPP practice).",
            "KAPP warehouses IPO shares until operation; AZN 1 IPO was oversubscribed and listed on Boursa Kuwait.",
            "Offtaker bears grid-delay/curtailment risk via deemed energy; key terms (currency, guarantees, termination) must be read in the RFP.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m11-l03-q1",
      type: "label",
      prompt: md`Label the parties of a Kuwaiti solar IPP structure.`,
      diagram: "ppp-structure",
      markers: [
        { id: "offtaker", answer: "MEWRE" },
        { id: "spv", answer: "Project company (SPV)" },
        { id: "kapp", answer: "KAPP" },
        { id: "public-ipo", answer: "Kuwaiti citizens (IPO)" },
        { id: "lenders", answer: "Lenders" },
        { id: "epc", answer: "EPC contractor" },
      ],
      options: ["MEWRE", "Project company (SPV)", "KAPP", "Kuwaiti citizens (IPO)", "Lenders", "EPC contractor", "CAPT", "State Audit Bureau"],
      explanation: md`MEWRE buys the output; the SPV owns the plant; KAPP procures and holds state shares; citizens own up to 50% through the IPO; lenders provide debt; the EPC builds. CAPT and the Audit Bureau are not parties to the structure (the Bureau reviews before signing).`,
      concepts: ["m11.offtaker-role", "m11.ppp-shareholding"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m11-l03-q2",
      type: "mcq",
      prompt: md`What are the Executive Regulations of the PPP Law?`,
      options: ["Law 7/2008", "Decree No. 78 of 2015", "Law 39/2010", "Law 49/2016"],
      answer: 1,
      explanation: md`Decree 78/2015. Law 7/2008 was the previous PPP law; Law 39/2010 is the IWPP joint-stock company law; Law 49/2016 is the Public Tenders Law.`,
      concepts: ["m11.ppp-law"],
      difficulty: 1,
    },
    {
      id: "m11-l03-q3",
      type: "multi",
      prompt: md`Which describe Az-Zour North 1? (Select all.)`,
      options: [
        "Private 40% (ENGIE 17.5%, Sumitomo 17.5%, A.H. Al-Sagar 5%), government 60%",
        "40-year ECWPA with MEW",
        "Its citizen IPO (2019) was oversubscribed and the company listed on Boursa Kuwait",
        "A 1,100 MW solar IPP",
        "ACWA Power later bought ENGIE's 17.5% stake",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`AZN 1 is a gas-fired IWPP (~1,500 MW + desalination), the precedent for Kuwait's PPP shareholding and IPO model.`,
      concepts: ["m11.ppp-shareholding"],
      difficulty: 2,
    },
    {
      id: "m11-l03-q4",
      type: "numeric",
      prompt: md`A plant is prevented from exporting 25,000 MWh by a MEWRE-side grid outage counted as deemed energy. At a tariff of 9 fils/kWh, what does MEWRE pay for this deemed energy, in KWD?`,
      answer: 225000,
      tolerance: { abs: 10 },
      unit: "KWD",
      explanation: md`$25{,}000 \times 1{,}000 \times 0.009 = 225{,}000$ KWD — paid for energy not received, on top of the extra fuel burned to replace it.`,
      concepts: ["m11.deemed-energy"],
      difficulty: 1,
    },
    {
      id: "m11-l03-q5",
      type: "order",
      prompt: md`Order the KAPP stages after bid submission.`,
      items: [
        "Technical evaluation and financial opening",
        "Preferred bidder recommended by KAPP",
        "Higher Committee approves the selected investor",
        "State Audit Bureau approval",
        "PPA signed by MEWRE",
        "Financial close",
      ],
      explanation: md`Zone 1 had reached the preferred-bidder report (~Aug 2026) with approvals and signing not publicly confirmed at the research date.`,
      concepts: ["m11.kapp-stages"],
      difficulty: 2,
    },
    {
      id: "m11-l03-q6",
      type: "decision",
      prompt: md`During RFP preparation, KAPP's adviser proposes that MEWRE guarantee the 400 kV line will be ready 6 months before scheduled COD, with uncapped deemed energy for any delay. The line was awarded in March 2026. What is your position?`,
      options: [
        { text: "Accept — bidders need certainty.", score: 0.2, feedback: "Bidders do need clarity, but an uncapped guarantee on a date you don't fully control creates open-ended budget exposure." },
        { text: "Propose a defined grid-ready date based on the line contractor's programme with float, a grace period, deemed energy capped or converted to COD extension after a threshold, and an interface schedule; coordinate with Transmission before replying in writing.", score: 1, feedback: "Balanced: bankable for bidders, bounded for the ministry, grounded in the actual line programme." },
        { text: "Refuse any grid commitment.", score: 0.2, feedback: "Unbankable; bidders will price the risk heavily or not bid." },
        { text: "Leave it to KAPP to decide.", score: 0.1, feedback: "MEWRE bears the liability; the offtaker must state its position." },
      ],
      explanation: md`Grid-delay clauses are among the largest contingent liabilities in an IPP. Ground them in the real line schedule and bound the exposure.`,
      concepts: ["m11.deemed-energy", "m11.offtaker-role"],
      difficulty: 3,
    },
  ],
  flashcards: [
    { id: "m11-l03-f1", front: "PPP Law and regulations", back: "Law 116/2014 (replaced Law 7/2008); Executive Regulations Decree 78/2015.", concepts: ["m11.ppp-law"] },
    { id: "m11-l03-f2", front: "KAPP attachment and Higher Committee chair", back: "Both tied to the Minister of Finance (KAPP attached; Committee chaired).", concepts: ["m11.ppp-law"] },
    { id: "m11-l03-f3", front: "PPP shareholding (legal guide, > KD 60 m)", back: "50% citizen IPO / 6–24% public entities / ≥26% private.", concepts: ["m11.ppp-shareholding"] },
    { id: "m11-l03-f4", front: "IWPP practice split", back: "Developer 40% / KAPP 60% (50% earmarked for IPO). E.g. AZN 1, AZN 2&3.", concepts: ["m11.ppp-shareholding"] },
    { id: "m11-l03-f5", front: "Solar IPP vs IWPP term", back: "Solar: 30-year PPA. IWPP: 25-year ECWPA (AZN 1: 40 years).", concepts: ["m11.offtaker-role"] },
    { id: "m11-l03-f6", front: "PPA payment with deemed energy", back: md`$R = T\,(E_{\text{del}} + E_{\text{deemed}})$`, concepts: ["m11.deemed-energy"] },
    { id: "m11-l03-f7", front: "Zone 2 customs incentive (reported)", back: "Customs-duty exemption up to 10% on imported equipment for 10 years (wording unverified).", concepts: ["m11.ppp-law"] },
    { id: "m11-l03-f8", front: "Unknown Kuwaiti PPA terms", back: "Currency/indexation, government guarantee, termination payments — read the RFP/PPA.", concepts: ["m11.offtaker-role"] },
  ],
  scenarios: [
    {
      id: "m11-s3",
      title: "The lenders' wish list",
      context: md`Zone 2 preferred-bidder discussions. The bidder's lenders send a list: (1) USD-indexed tariff, (2) a Ministry of Finance guarantee of MEWRE payments, (3) termination compensation covering full debt in all cases, (4) deemed energy from day one of any grid outage. KAPP asks for MEWRE's position within a week.`,
      start: "a",
      concepts: ["m11.offtaker-role", "m11.deemed-energy", "m11.kapp-stages"],
      nodes: {
        a: {
          md: md`How do you organise MEWRE's response?`,
          choices: [
            { text: "Convene legal affairs, finance and Transmission; classify each item as RFP-compliant / within negotiable range / requires Higher Committee or MoF decision; reply in writing with reasons.", next: "b", score: 10, feedback: "Structured, cross-functional, and it routes decisions to whoever holds authority." },
            { text: "Accept all to protect the award timeline.", next: "c", score: 1, feedback: "Several items are not MEWRE's to give (MoF guarantee) and may breach the RFP terms other bidders priced." },
            { text: "Reject all as non-compliant.", next: "b", score: 4, feedback: "Some may be clarifications within the RFP; blanket rejection risks a failed procurement." },
          ],
        },
        b: {
          md: md`Item 4 (deemed energy from day one of any outage) conflicts with the RFP's grace-period mechanism.`,
          choices: [
            { text: "Hold the RFP position: changing it post-bid would disadvantage other bidders and can trigger challenge; offer clarity on how outages are measured and certified.", score: 10, feedback: "Equal treatment preserved; you add value through clarity instead of concessions." },
            { text: "Concede to keep the bidder happy.", score: 2, feedback: "A post-bid material concession undermines the competition and may be rejected by the Audit Bureau." },
          ],
        },
        c: {
          md: md`The Ministry of Finance replies that MEWRE has no authority to offer an MoF guarantee.`,
          choices: [
            { text: "Withdraw the position and restart the structured review.", next: "b", score: 3, feedback: "Recovered, but credibility with KAPP and the bidder suffered." },
          ],
        },
      },
    },
  ],
};

export default lesson;
