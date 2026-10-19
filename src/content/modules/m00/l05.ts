import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m00-l05",
  title: "How Ministry Projects Are Approved and Funded",
  summary:
    "The budget cycle (fiscal year April–March), the three delivery routes — budget-funded EPC, PPP/IPP via KAPP, and government-to-government — the KAPP stage process, Audit Bureau prior review, real Kuwaiti timelines, and what a day of delay costs. Where projects stall and what the PM does about it.",
  minutes: 85,
  objectives: [
    "You can describe Kuwait's fiscal year and budget cycle, and how a capital project gets a budget line.",
    "You can compare budget-funded EPC, PPP/IPP and G2G delivery on funding, risk allocation, procurement law and approvals.",
    "You can reconstruct the elapsed time of real Kuwaiti procurements (Zone 1, AZN 2&3, Al-Khairan, the 400 kV line) and use them as planning benchmarks.",
    "You can compute the cost of a commissioning delay in displaced-fuel terms and compare the present value of a PPA with a budget-funded alternative.",
  ],
  concepts: [
    { id: "m00.budget-cycle", name: "Budget cycle and fiscal year", description: "Fiscal year 1 April–31 March; ministry capital requests to the Ministry of Finance, draft budget to cabinet, issued by decree-law while the National Assembly is suspended; multi-year projects need annual allocations.", competency: "finance", related: ["m00.delivery-routes", "m10.budget-cycle", "m10.commitment-expenditure"] },
    { id: "m00.delivery-routes", name: "Delivery routes: EPC, PPP/IPP, G2G", description: "Budget-funded EPC (CAPT tender, state capex and risk), PPP/IPP via KAPP (private finance, long-term PPA payments) and government-to-government agreements (negotiated, terms often opaque).", competency: "delivery", related: ["m00.budget-cycle", "m00.approval-timelines", "m09.contracting-strategy", "m11.procurement-regimes"] },
    { id: "m00.approval-timelines", name: "Real approval and procurement timelines", description: "Kuwaiti benchmarks: Zone 1 RFQ to reported selection ~31 months; AZN 2&3 letter agreement to ECWPA ~6 months; Al-Khairan RFP to bids ~9 months with three extensions; 400 kV line lowest bid to award ~11 months.", competency: "delivery", related: ["m00.delay-cost", "m11.delay-causes", "m11.pert-approvals"] },
    { id: "m00.delay-cost", name: "Cost of delay", description: "Each day a renewable plant is late, the state burns fuel worth roughly (fuel value − tariff) × daily energy; for a 1.1 GW plant this is of the order of KWD 0.1–0.2 m per day.", competency: "finance", related: ["m00.approval-timelines", "m09.deemed-energy", "m01.fuel-displacement"] },
    { id: "m00.vision-2035", name: "Vision 2035 and development planning", description: "Kuwait Vision 2035 'New Kuwait' (seven pillars) and the National Development Plan, overseen by the Supreme Council for Planning and Development, frame project priority and funding.", competency: "context", related: ["m00.budget-cycle"] },
  ],
  sections: [
    // ------------------------------------------------------------------ THEORY
    {
      layer: "theory",
      title: "Money, routes and gates",
      blocks: [
        {
          kind: "md",
          md: md`## The fiscal year and the budget cycle

Kuwait's **fiscal year runs from 1 April to 31 March**; "FY2026/27" means 1 April 2026 – 31 March 2027. The FY2026/27 draft budget, as reported by Kuwait Times in February 2026, projected **spending KD 26.1 bn**, **revenue KD 16.3 bn** and a deficit of about **KD 9.8 bn**, with wages and subsidies about **76%** of spending and **capital spending of about KD 3.1 bn**. These are draft figures from a press report outside the research brief — confirm the enacted budget before quoting them.

The generic cycle for a ministry capital project:

1. **Project identification** in the ministry plan, aligned with the **National Development Plan** and **Vision 2035 "New Kuwait"** (Supreme Council for Planning and Development).
2. **Budget request** from the ministry's sector to its finance department, consolidated and submitted to the **Ministry of Finance** for the next fiscal year, with a multi-year cash-flow forecast.
3. **Draft state budget** to the Council of Ministers (around January–February for an April start).
4. **Enactment** — normally by the National Assembly; since the **10 May 2024 suspension**, by decree-law issued by the Amir and government.
5. **Allocation and commitment** — a budget-availability certificate is needed before tendering and before Audit Bureau submission; multi-year contracts need an allocation every year.

Two consequences for a PM: (a) if your project is not in the budget request submitted months before the fiscal year starts, it waits a year; (b) a tender cannot go to the Audit Bureau without a budget-availability certificate for the current year.`,
        },
        { kind: "sources", refs: ["m00-kt-2026-budget", "m00-constitutionnet-2024-05", "m00-idea-2024-05", "m00-un-sdg-vision", "m00-keo-2019"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "Budget calendar details",
          md: md`**Unknown:** the exact Ministry of Finance budget-circular dates (when ministries must submit requests) and whether the FY2026/27 budget was enacted exactly as drafted. **How to verify:** the Ministry of Finance budget circular for the coming year (ask the ministry's finance department for the internal deadline — usually several months before April); Kuwait Al-Youm for the budget decree-law.`,
        },
        {
          kind: "md",
          md: md`## Three delivery routes

| | **Budget-funded EPC** | **PPP / IPP via KAPP** | **Government-to-government (G2G)** |
|---|---|---|---|
| Legal basis | Public Tenders Law 49/2016 (amended; Law 94/2026 effective ~Dec 2026) | PPP Law 116/2014; Decree 78/2015 | Framework agreements between governments (e.g. MEWRE–China NEA, Mar 2025) |
| Procurer | MEWRE via CAPT | KAPP | Negotiated by the ministry / government |
| Who finances | State capital budget | Developer equity + lenders | Varies (often state-backed foreign financing) — terms not public for Kuwait |
| State pays | Capex upfront + O&M | Tariff per MWh for 25–30 years | Unknown for Shagaya Phases 3–4 |
| Risk on state | Construction, performance, O&M (unless contracted out) | Mainly offtake, change-in-law, grid/interface risks | Unclear |
| Key approvals | CAPT, Audit Bureau, Fatwa/legal | Higher Committee (×2), Audit Bureau, Fatwa | Council of Ministers; others unverified |
| Kuwait examples | Shagaya Phase I (KISR, DBO contracts); Shagaya–Al-Wafra 400 kV line | Zone 1, Zone 2; AZN 1, AZN 2&3; Al-Khairan | Shagaya Phases 3–4 (SPIC, reported) |

The PPP route also has a Kuwait-specific twist: for projects above KD 60 m, PPP Law 116/2014 structures the project company with **50% offered by IPO to Kuwaiti citizens**, 6–24% to public entities and at least 26% to the private investor (secondary legal guide; verify against the law). In practice on IWPPs, developers hold 40% and KAPP 60% (warehousing the IPO shares). AZN 1's citizen IPO in 2019 was oversubscribed and the company listed on Boursa Kuwait.`,
        },
        { kind: "sources", refs: ["m00-trade-gov-public", "m00-tamimi-2026-tenders", "m00-kapp-law-116", "m00-kapp-exec-regs", "m00-mees-2025-03-china", "m00-china-mfa-2025-05", "m00-legal500-entry", "m00-tamimi-ppp", "m00-mees-2026-02-azn", "m00-engie-azn1", "m00-mees-2019-ipo", "m00-reuters-csp"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "PPP terms that are not public",
          md: md`**Unknown:** PPA currency (KWD or USD-indexed), form of government guarantee or support, termination-payment regime; exact shareholding split in the law text (the research brief noted a conflicting "6–26% / 24–44%" formulation). **How to verify:** PPP Law 116/2014 and Decree 78/2015 texts on kapp.gov.kw; the RFP and draft PPA in KAPP's data room (you will have access as offtaker PM). Module m11 lesson 3 covers this in depth.`,
        },
        {
          kind: "md",
          md: md`## Real Kuwaiti timelines (your planning benchmarks)

| Procurement | Start → end | Elapsed |
|---|---|---|
| Zone 1 1,100 MW PV (KAPP) | RFQ Jan 2024 → bids 15 Jan 2026 → financial opening ~Jul 2026 → selection reported ~Aug 2026 | ~24 months to bids; **~31 months to reported selection**, PPA not yet confirmed |
| Zone 2 500 MW PV (KAPP) | RFQ May 2025 → RFP 16 Nov 2025 → bids 26 Jul 2026 | ~14 months to bids (deadline extended at least twice) |
| AZN 2&3 IWPP (KAPP) | Letter agreement 10 Aug 2025 → ECWPA 3 Feb 2026 | **~6 months** from preferred bidder to signature |
| Al-Khairan Phase 1 IWPP (KAPP) | RFP 31 Aug 2025 → bids 1 Jun 2026 | **9 months**, three deadline extensions |
| Shagaya–Al-Wafra 400 kV OHTL (MEWRE/CAPT) | Lowest bid Apr 2025 → award Mar 2026 | **~11 months** from bid opening to award |
| KNPC Dibdibah EPC+F | Bids Apr 2019 → cancelled ~2020 | Re-procured as KAPP IPP: several years lost (Zone 1 selection reported only in 2026) |

Patterns: bid deadlines are routinely extended (bidders need time for Kuwait-specific terms and financing); the post-bid approval phase takes months; cancellations happen (Dibdibah, Abdaliya ISCC). Build these into every schedule as explicit activities with float, not as "admin".`,
        },
        { kind: "sources", refs: ["m00-meed-2024-01-zone1", "m00-agbi-2025-06-zone1", "m00-meed-2026-zone1-bids", "m00-timeskuwait-2026-fin", "m00-meed-2026-08-zone1", "m00-sgp-2025-05-zone2", "m00-sq-2025-11-zone2", "m00-meed-2026-07-zone2", "m00-gic-2025-08", "m00-mees-2026-02-azn", "m00-meed-2026-06-khairan", "m00-gulfbase-2025-ohtl", "m00-megaproject-ohtl", "m00-eu-dibdibah", "m00-ippj-abdaliya"] },
        { kind: "widget", widget: "lifecycle", caption: "Project lifecycle from feasibility to O&M. Overlay the Kuwaiti gates: budget line, Higher Committee, CAPT/KAPP procurement, Audit Bureau, Fatwa, signature, financial close." },
        {
          kind: "md",
          md: md`## What a day of delay costs

A late renewable plant means more fuel burned. Per day:`,
        },
        { kind: "equation", formula: "m00-delay-cost" },
        {
          kind: "md",
          md: md`With the lesson-3 values (crude displaced at ~37 fils/kWh, an assumed tariff of 8 fils/kWh), a 1,100 MW plant at a 25% capacity factor is worth about **KWD 191,000 per day** of operation, or about **KWD 1.3 m per week**. With LNG displacement (~26 fils/kWh) it is about KWD 120,000/day. This is the number to put in front of a committee that is about to defer your item to next month's meeting.

## PPP or budget? A present-value comparison

The state can buy the same energy two ways: pay capex now and O&M yearly (EPC), or pay a tariff per MWh for 30 years (PPP). Compare present values:`,
        },
        { kind: "equation", formula: "m00-pv-annuity" },
        {
          kind: "callout",
          tone: "why",
          title: "Why Kuwait uses PPPs even when budget money exists",
          md: md`PPPs are not automatically cheaper: private capital costs more than the state's. What the state buys is (1) **risk transfer** — construction, performance and O&M risk sit with the developer and lenders; (2) **competitive price discovery** for the tariff; (3) **no upfront capex** in a deficit year; (4) **lender discipline** on design and schedule; and (5) in Kuwait, **citizen participation** through the IPO. The comparison depends heavily on the discount rate you use for the state — see the faded example.`,
        },
      ],
    },
    // ------------------------------------------------------------------ APPLIED
    {
      layer: "applied",
      title: "Delay costs and route comparisons",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "What a one-month committee deferral costs",
          given: md`Zone 1: 1,100 MWac, CF 0.25 (illustrative). Displaced fuel value 36.95 fils/kWh (crude, lesson 3). Assumed tariff 8 fils/kWh (actual tariff not published). Suppose a deferral of the award at the Higher Committee pushes COD by 30 days.`,
          steps: [
            { md: md`Daily energy: $1{,}100 \times 0.25 \times 24 = 6{,}600$ MWh $= 6.6\times10^6$ kWh.` },
            { md: md`Net value per kWh: $36.95 - 8 = 28.95$ fils $= 0.02895$ KWD.` },
            { md: md`Per day: $6.6\times10^6 \times 0.02895 = 191{,}070$ KWD.` },
            { md: md`30 days: $191{,}070 \times 30 \approx$ **KWD 5.7 m**.` },
          ],
          result: md`A one-month slip costs the state roughly KWD 5.7 m in extra fuel (about KWD 3.6 m if LNG is the displaced fuel). Compare this with the cost of the extra internal reviews that would have prevented the deferral — usually a few person-weeks.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "PPA vs budget-funded EPC: the discount rate decides",
          given: md`Same plant. **PPA route:** 2.409 TWh/yr at 8 fils/kWh for 30 years. **EPC route:** capex USD 600/kW × 1,100 MW = USD 660 m = KWD 203 m upfront (1 KWD = 3.25 USD), plus O&M KWD 2.5 m/yr for 30 years (illustrative). Ignore degradation, residual value and risk.`,
          steps: [
            { md: md`PPA annual payment: $A = 2.409\times10^9 \times 0.008 = 19.27$ KWD m.` },
            { md: md`At $r = 5\%$: annuity factor $= (1 - 1.05^{-30})/0.05 = 15.372$. PPA PV $= 19.27 \times 15.372 = 296.3$ KWD m. EPC PV $= 203 + 2.5 \times 15.372 = 241.4$ KWD m.` },
            {
              md: md`At $r = 8\%$: annuity factor $= 11.258$; PPA PV $= 19.27 \times 11.258 = 217.0$ KWD m.`,
              hidden: true,
              check: { prompt: "PPA present value at 8% (KWD million)", answer: 217.0, unit: "KWD m", tolerance: { rel: 0.01 } },
            },
            {
              md: md`EPC PV at 8%: $203 + 2.5 \times 11.258 = 231.1$ KWD m.`,
              hidden: true,
              check: { prompt: "EPC present value at 8% (KWD million)", answer: 231.1, unit: "KWD m", tolerance: { rel: 0.01 } },
            },
            { md: md`At 5% the EPC route looks ~KWD 55 m cheaper; at 8% the PPA looks ~KWD 14 m cheaper. And the EPC figure excludes the state's construction, performance and O&M risk, which the PPA transfers.` },
          ],
          result: md`The ranking flips with the discount rate. A defensible value-for-money test uses a risk-adjusted public-sector comparator, not a raw capex-vs-tariff comparison (module m10).`,
        },
        {
          kind: "question",
          question: {
            id: "m00-l05-p1",
            type: "numeric",
            prompt: md`Zone 2 (500 MWac, CF 0.25) slips by 90 days because a grid-side outage could not be scheduled. Displaced fuel is LNG at 26.25 fils/kWh; the assumed tariff is 8 fils/kWh. What is the extra fuel cost to the state, in **million KWD**?`,
            answer: 4.928,
            tolerance: { rel: 0.02 },
            unit: "KWD m",
            explanation: md`Daily energy $= 500 \times 0.25 \times 24 = 3{,}000$ MWh $= 3\times10^6$ kWh. Net value $= 26.25 - 8 = 18.25$ fils $= 0.01825$ KWD/kWh. Per day: KWD 54,750. 90 days: **KWD 4.93 m**. If the grid delay is on MEWRE's side, the PPA may also require deemed-energy payments to the IPP — making it worse.`,
            concepts: ["m00.delay-cost"],
            difficulty: 2,
          },
        },
      ],
    },
    // ------------------------------------------------------------------ FIELD
    {
      layer: "field",
      title: "Where projects stall and what experienced PMs do",
      blocks: [
        {
          kind: "md",
          md: md`### Who the PM talks to, by phase

| Phase | Your counterparts | Documents you own or contribute |
|---|---|---|
| Concept and budget | Sector leadership, planning, finance department, MoF | Concept note, budget request with multi-year cash flow, cabinet memo draft (مذكرة لمجلس الوزراء) |
| PPP preparation | KAPP project team, transaction advisers (technical/legal/financial) | Technical requirements, grid interface data, offtaker comments on the draft PPA |
| Procurement | KAPP or CAPT, evaluation committee | RFQ/RFP technical schedules, clarification responses, evaluation report inputs |
| Approvals | Legal affairs, Fatwa, Audit Bureau liaison, Higher Committee secretariat | Contract file, compliance matrices, responses to observations |
| Delivery | Developer/EPC, OE, Transmission, EPA | Interface register, outage requests, permits tracker, progress reports |

### Where projects stall (and the countermeasure)

| Stall point | Typical cause | Countermeasure |
|---|---|---|
| Budget line missing | Request not in the MoF submission for the right FY | Track the budget calendar; submit multi-year cash flow early |
| Bid deadline extensions | Bidders need time for financing, Kuwait terms, partner selection | Plan 2–3 extensions; answer clarifications fast and consistently |
| Post-bid approvals | Higher Committee scheduling; Audit Bureau observations; Fatwa comments | Pre-cleared files; compliance matrix; know committee meeting dates |
| Lender vs government terms | Lender conditions conflicting with KAPP requirements (reported by KAPP) | Early market sounding; settle bankability items before RFP |
| Grid interface | MEWRE-side line/substation late; outages unavailable in summer | Interface register; outage windows Nov–Mar; contractual grid dates |
| Land/permits | Overlapping allocations (KAPP vs G2G vs oil sector); EIA | Land allocation decision minuted; EIA early |
| Cancellation | Policy shifts (Dibdibah, Abdaliya) | Keep the business case current; brief leadership regularly |`,
        },
        { kind: "sources", refs: ["m00-meed-kapp-stakeholders", "m00-ijglobal-ppp10", "m00-eu-dibdibah", "m00-ippj-abdaliya"] },
        {
          kind: "callout",
          tone: "pitfall",
          title: "The calendar trap",
          md: md`Committees meet on a calendar. Missing the submission cut-off for a monthly Higher Committee or cabinet meeting by one day costs a month — about KWD 5.7 m in fuel for a 1.1 GW plant. Ramadan, Eid holidays and the summer leave period (July–August, when senior officials travel) thin out meetings. Get the meeting calendars at the start of each year and plan backwards from them.`,
        },
        {
          kind: "checklist",
          title: "PM approval-and-funding checklist",
          items: [
            "Project is in the current fiscal year's budget (or the PPP/G2G route is approved) — document reference recorded.",
            "Budget-availability certificate obtained before tender issue and before Audit Bureau submission.",
            "Approval chain mapped with nominal durations, return probabilities and meeting calendars; float allocated.",
            "Compliance matrix of past Audit Bureau and Fatwa observations applied to the file.",
            "Delay-cost figure (KWD/day) calculated and ready for committee briefings.",
            "Interface dates (grid, land, permits) included in the approval schedule, not tracked separately.",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask",
          items: [
            "Finance department: what is the internal deadline for next fiscal year's capital budget requests, and which form/cash-flow template is required?",
            "KAPP: which Higher Committee meeting is the next realistic target for our item, and what is the submission cut-off?",
            "Legal affairs: will Fatwa review this contract before or after Audit Bureau submission, and what is their current turnaround?",
            "Transmission: which fiscal year funds the MEWRE-side grid works for this project, and is the allocation secured?",
            "Developer: which approvals on your side (lenders' credit committees, KDIPA, permits) could delay financial close?",
          ],
        },
        {
          kind: "bilingual",
          title: "Cabinet memo skeleton (submitted through the Minister)",
          en: md`**Memorandum for the Council of Ministers**
**Subject:** Request for approval of [project] — [capacity] MW solar PV, Shagaya Renewable Energy Park

1. **Background:** Summer peak demand of 17,540 MW (2026, ministry figure); reliably available capacity of about 17 GW; renewable targets of 15% by 2030.
2. **Proposal:** Approve [the award recommendation / the delivery route / the budget allocation].
3. **Benefits:** Estimated net fuel savings of KWD [x] m per year (assumptions annexed); reduction of summer shortfall; contribution to Vision 2035.
4. **Cost and funding:** [PPA payments from the ministry's budget / capital allocation in FY2026/27].
5. **Approvals obtained:** [Higher Committee decision no. …, date]; [State Audit Bureau letter no. …, date].
6. **Recommendation:** Approval of the above.`,
          ar: `**مذكرة إلى مجلس الوزراء**
**الموضوع:** طلب الموافقة على [اسم المشروع] – محطة طاقة شمسية كهروضوئية بقدرة [القدرة] ميجاواط في مجمع الشقايا للطاقة المتجددة

1. **الخلفية:** بلغ الحمل الأقصى الصيفي 17,540 ميجاواط (2026، بيانات الوزارة)، بينما تبلغ القدرة المتاحة بصورة موثوقة نحو 17 جيجاواط، وتستهدف الدولة 15% من الطاقة المتجددة بحلول عام 2030.
2. **المقترح:** الموافقة على [توصية الترسية / أسلوب التنفيذ / الاعتماد المالي].
3. **العوائد:** وفر صافٍ تقديري في الوقود قدره [x] مليون دينار كويتي سنوياً (الافتراضات مرفقة)، وخفض العجز في القدرة صيفاً، والإسهام في تحقيق رؤية الكويت 2035.
4. **التكلفة والتمويل:** [مدفوعات اتفاقية شراء الطاقة من ميزانية الوزارة / الاعتماد الرأسمالي للسنة المالية 2026/2027].
5. **الموافقات الصادرة:** [قرار اللجنة العليا رقم … بتاريخ …]؛ [كتاب ديوان المحاسبة رقم … بتاريخ …].
6. **التوصية:** الموافقة على ما تقدم.`,
        },
        { kind: "scenario", scenario: "m00-s5" },
        {
          kind: "feynman",
          prompt: "Explain to your Director, in two minutes, why the ministry should fight to keep the Zone 1 award on next month's Higher Committee agenda rather than accept a deferral.",
          keyPoints: [
            "A one-month deferral delays COD by roughly a month.",
            "Each day of a 1.1 GW plant's operation saves roughly KWD 0.12–0.19 m in fuel net of tariff.",
            "A month therefore costs ~KWD 3.6–5.7 m, plus a summer of lost peak support if it pushes COD past spring.",
            "The fix is a complete, pre-cleared file submitted before the cut-off, not pressure.",
            "Bid validity and bidder financing commitments may also expire with long deferrals.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m00-l05-q1",
      type: "mcq",
      prompt: md`Kuwait's fiscal year 2026/27 runs from…`,
      options: ["1 Jan 2026 to 31 Dec 2026", "1 Apr 2026 to 31 Mar 2027", "1 Jul 2026 to 30 Jun 2027", "1 Oct 2026 to 30 Sep 2027"],
      answer: 1,
      explanation: md`1 April – 31 March. A project missing from the budget request submitted months before April typically waits a full year for funding.`,
      concepts: ["m00.budget-cycle"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m00-l05-q2",
      type: "multi",
      prompt: md`Which features apply to the PPP/IPP route via KAPP? (Select all.)`,
      options: [
        "Developer equity and lenders finance construction",
        "MEWRE pays a tariff per MWh under a long-term PPA",
        "The state pays the full capex upfront from its capital budget",
        "Approval by the Higher Committee for PPP is required",
        "For large projects, 50% of the project company is earmarked for a citizen IPO (per the PPP law as reported)",
      ],
      answer: [0, 1, 3, 4],
      explanation: md`Upfront capex from the state budget is the EPC route. The PPP route defers payment into a 25–30-year tariff stream and transfers construction and performance risk.`,
      concepts: ["m00.delivery-routes"],
      difficulty: 2,
    },
    {
      id: "m00-l05-q3",
      type: "numeric",
      prompt: md`A 1,100 MW PV plant (CF 0.25) displaces fuel worth 30 fils/kWh and is paid 8 fils/kWh. What is the net cost to the state of a **7-day** delay, in thousand KWD?`,
      answer: 1016.4,
      tolerance: { rel: 0.01 },
      unit: "KWD k",
      explanation: md`Daily energy $6.6\times10^6$ kWh × (30 − 8) fils = KWD 145,200/day. × 7 = **KWD 1,016,400** ≈ KWD 1.0 m per week.`,
      concepts: ["m00.delay-cost"],
      difficulty: 2,
    },
    {
      id: "m00-l05-q4",
      type: "order",
      prompt: md`Order these Zone 1 milestones chronologically.`,
      items: [
        "RFQ issued by KAPP (January 2024)",
        "RFP issued (around June 2025)",
        "Three bids received (15 January 2026)",
        "Financial bids opened (around July 2026)",
        "Masdar + Fouad AlGhanim & Sons reported selected (around August 2026)",
      ],
      explanation: md`About 31 months from RFQ to reported selection, with an RFP deadline extension from September 2025 to January 2026 — a realistic benchmark for a first-of-a-kind Kuwaiti solar IPP.`,
      concepts: ["m00.approval-timelines"],
      difficulty: 1,
    },
    {
      id: "m00-l05-q5",
      type: "mcq",
      prompt: md`AZN 2&3 moved from letter agreement (10 Aug 2025) to ECWPA signature (3 Feb 2026). About how long is that?`,
      options: ["About 2 months", "About 6 months", "About 12 months", "About 18 months"],
      answer: 1,
      explanation: md`Just under six months — a useful benchmark for the post-selection phase (approvals, document finalisation) of a KAPP project.`,
      concepts: ["m00.approval-timelines"],
      difficulty: 1,
    },
    {
      id: "m00-l05-q6",
      type: "decision",
      prompt: md`Two weeks before the fiscal-year budget submission deadline, you realise the MEWRE-side 132 kV upgrade needed for a 2028 PV plant is not in the draft request. What do you do?`,
      options: [
        { text: "Wait for next year's cycle; the plant isn't due until 2028.", score: 0.1, feedback: "Grid works need design, tender (~11 months from bids to award on the 400 kV line) and construction. Missing this cycle likely makes the grid the critical path." },
        { text: "Immediately prepare a costed request with a multi-year cash flow and justification (delay-cost per day, interface dates), get your sector head's sign-off and submit it to the finance department before the deadline; flag the risk in the project register.", score: 1, feedback: "Correct: act within the cycle, make the case in fiscal terms and record the risk." },
        { text: "Ask the IPP developer to build the 132 kV upgrade and add it to their tariff.", score: 0.3, feedback: "Changing scope after the RFP is a variation with procurement implications; it may be possible, but not as a substitute for budgeting your own obligations." },
        { text: "Ask the Minister to approve an emergency allocation later.", score: 0.3, feedback: "Possible as a last resort but costly in political capital; do the normal process first." },
      ],
      explanation: md`Missing the budget cycle is one of the most common and avoidable causes of delay. Use delay-cost numbers to justify the late addition.`,
      concepts: ["m00.budget-cycle", "m00.delay-cost"],
      difficulty: 2,
    },
    {
      id: "m00-l05-q7",
      type: "short",
      prompt: md`Why might a PPA have a higher present value than a budget-funded EPC for the same plant, yet still be the better choice for Kuwait?`,
      rubric: [
        "Private cost of capital and returns are embedded in the tariff.",
        "PPA transfers construction, performance and O&M risk to the developer/lenders.",
        "No upfront capex in a deficit budget.",
        "Competitive tariff discovery and lender discipline; citizen IPO participation.",
        "Comparison depends on the discount rate; use a risk-adjusted public-sector comparator.",
      ],
      modelAnswer: "The tariff embeds private financing costs and developer returns, so at a low public discount rate the PPA's present value can exceed capex plus O&M. But the EPC figure ignores risks the state would retain — cost overruns, delays, underperformance, O&M failures — which the PPA transfers to the developer and lenders. The PPA also avoids upfront capital spending in a deficit year, discovers the price competitively, adds lender scrutiny and, in Kuwait, allows citizen participation through the IPO. A fair comparison uses a risk-adjusted public-sector comparator; the ranking also flips with the discount rate.",
      explanation: md`Value for money is about risk-adjusted cost, not just headline PV. The faded example shows the ranking flips between 5% and 8% discount rates even before pricing risk.`,
      concepts: ["m00.delivery-routes"],
      difficulty: 3,
    },
  ],
  flashcards: [
    { id: "m00-l05-f1", front: "Kuwait fiscal year", back: "1 April – 31 March (FY2026/27 = Apr 2026 – Mar 2027).", concepts: ["m00.budget-cycle"] },
    { id: "m00-l05-f2", front: "FY2026/27 draft capital spending", back: "About KD 3.1 bn within KD 26.1 bn total spending (draft, as reported by Kuwait Times; verify the enacted budget).", concepts: ["m00.budget-cycle"] },
    { id: "m00-l05-f3", front: "Three delivery routes", back: "Budget-funded EPC (CAPT); PPP/IPP (KAPP, PPA); G2G (framework agreement, negotiated).", concepts: ["m00.delivery-routes"] },
    { id: "m00-l05-f4", front: "PPP shareholding under Law 116/2014 (as reported)", back: "50% citizen IPO / 6–24% public entities / ≥26% private investor (projects > KD 60 m). Practice on IWPPs: 40% developer / 60% KAPP.", concepts: ["m00.delivery-routes"] },
    { id: "m00-l05-f5", front: "Cost of delay formula", back: md`$C_d = \Delta t \cdot P \cdot CF \cdot 24 \cdot (v - T)$`, concepts: ["m00.delay-cost"] },
    { id: "m00-l05-f6", front: "Daily net fuel value of a 1.1 GW PV plant (CF 0.25, 37 vs 8 fils)", back: "≈ KWD 191,000 per day ≈ KWD 1.3 m per week.", concepts: ["m00.delay-cost"] },
    { id: "m00-l05-f7", front: "Benchmark: Zone 1 RFQ → reported selection", back: "~31 months (Jan 2024 → ~Aug 2026).", concepts: ["m00.approval-timelines"] },
    { id: "m00-l05-f8", front: "Benchmark: AZN 2&3 letter agreement → ECWPA", back: "~6 months (10 Aug 2025 → 3 Feb 2026).", concepts: ["m00.approval-timelines"] },
    { id: "m00-l05-f9", front: "Vision 2035 owner", back: "Supreme Council for Planning and Development (General Secretariat); 'New Kuwait', seven pillars; National Development Plan.", concepts: ["m00.vision-2035"] },
  ],
  scenarios: [
    {
      id: "m00-s5",
      title: "The deferred agenda item",
      dayInLife: true,
      context: md`Thursday afternoon. KAPP tells you the Zone 2 award recommendation may be deferred from next week's Higher Committee meeting because "the offtaker's comments on two PPA clauses (grid-delay deemed energy and curtailment compensation) are still outstanding". You are the offtaker PM. The comments are sitting with your Director for signature; he is travelling until Sunday.`,
      start: "a",
      concepts: ["m00.delay-cost", "m00.approval-timelines"],
      nodes: {
        a: {
          md: md`What do you do first?`,
          choices: [
            { text: "Call your Director, summarise the issue and the cost of a one-month deferral (about KWD 1.6–2.6 m for 500 MW), and ask whether he can sign electronically or delegate signature to the acting official.", next: "b", score: 10, feedback: "Right: decision-maker informed with numbers; you propose a practical path (delegation exists for exactly this)." },
            { text: "Send KAPP the unsigned comments informally so they can proceed.", next: "c", score: 2, feedback: "Unsigned offtaker positions are not official and can be repudiated; KAPP cannot rely on them in a Higher Committee pack." },
            { text: "Accept the deferral; it's only a month.", next: "d", score: 1, feedback: "A month is real money and may push COD into a later summer; and bid validity may be at stake." },
          ],
        },
        b: {
          md: md`The Director agrees to delegate. The acting Assistant Undersecretary asks you: "Are our comments on deemed energy reasonable, or will they make bidders walk away?"`,
          choices: [
            { text: "Explain the position: the ministry accepts deemed-energy payments only for delays on its side beyond an agreed grace period and caps curtailment compensation to hours above an annual threshold — standard regional practice — and confirm KAPP's advisers reviewed bankability.", next: "e", score: 10, feedback: "Clear, balanced, and you confirmed bankability with the advisers before signature." },
            { text: "Say you're not sure.", next: "e", score: 3, feedback: "You should know your own comments. Prepare a short rationale for each clause before any signature request." },
          ],
        },
        c: {
          md: md`KAPP replies that it needs a signed letter. The deadline passes.`,
          choices: [
            { text: "Escalate honestly to your Director and secure delegated signature for the next meeting.", next: "e", score: 4, feedback: "Recovered for the following meeting, but a month lost." },
          ],
        },
        d: {
          md: md`A month later, one bidder notifies KAPP that its bid validity expires in three weeks and its lenders' credit approval lapses.`,
          choices: [
            { text: "Work with KAPP on a formal bid-validity extension request and finalise the comments immediately.", next: "e", score: 4, feedback: "Necessary now, but avoidable. Extension requests can change bidders' pricing." },
          ],
        },
        e: {
          md: md`Signed comments reach KAPP before the cut-off. What do you do after the meeting?`,
          choices: [
            { text: "Record the decision reference, update the schedule and register, start preparing the Audit Bureau file (compliance matrix, budget certificate for PPA payments) so the next step starts immediately.", score: 10, feedback: "Always prepare the next gate while the current one is in progress." },
            { text: "Celebrate and wait for KAPP to tell you what's next.", score: 3, feedback: "The Audit Bureau file is partly the offtaker's. Get ahead of it." },
          ],
        },
      },
    },
  ],
};

export default lesson;
