import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m12-l05",
  title: "Asset Management & Lifecycle Decisions",
  summary:
    "Managing a 25–30-year PV/BESS asset the ISO 55000 way: lifecycle cost, degradation tracking, inverter replacement around years 12–15, repowering, BESS augmentation, end-of-life — and how to report performance to the ministry so decisions get made.",
  minutes: 70,
  objectives: [
    "You can explain ISO 55000 asset management principles and translate them into a plant-level asset management plan",
    "You can model degradation and compare it with warranty lines over the plant life",
    "You can evaluate inverter replacement and repowering decisions using lifecycle cost and NPV, and explain why the answer depends on whose value of energy you use",
    "You can structure a monthly/annual performance report to MEWRE management (EN/AR)",
  ],
  concepts: [
    {
      id: "m12.iso-55000",
      name: "ISO 55000 asset management",
      description:
        "Coordinated activity to realise value from assets, balancing cost, risk and performance over the lifecycle, with line of sight from organisational objectives to asset decisions.",
      competency: "operations",
      related: ["m12.lifecycle-cost"],
    },
    {
      id: "m12.lifecycle-cost",
      name: "Lifecycle cost (LCC)",
      description:
        "Present value of all costs of owning an asset — acquisition, operation, maintenance, replacement, disposal — minus residual value; basis for comparing lifecycle options.",
      competency: "finance",
    },
    {
      id: "m12.degradation",
      name: "Degradation tracking",
      description:
        "Measuring the long-term decline of plant output (typically 0.3–0.8 %/yr for modules) from performance data and comparing with warranty and model assumptions.",
      competency: "operations",
    },
    {
      id: "m12.repowering",
      name: "Replacement, repowering and end-of-life",
      description:
        "Mid-life inverter replacement, partial or full module repowering, BESS augmentation and decommissioning/recycling decisions.",
      competency: "operations",
    },
    {
      id: "m12.performance-reporting",
      name: "Performance reporting to the ministry",
      description:
        "Concise, validated reporting of energy, KPIs, losses, incidents and decisions needed, using consistent definitions aligned with the PPA/O&M contract.",
      competency: "leadership",
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Thinking in lifecycles",
      blocks: [
        {
          kind: "md",
          md: md`### ISO 55000 in one page

The ISO 55000 series (55000 overview and terminology, 55001 requirements for an asset management system, 55002 guidance) defines asset management as the **coordinated activity of an organisation to realise value from assets**. Core ideas:

| Principle | Meaning for a MEWRE PV/BESS portfolio |
|---|---|
| **Value** | Assets exist to deliver energy and capacity at the right time (summer peak, evening) at least lifecycle cost |
| **Alignment / line of sight** | Ministry objectives (renewable targets, reliability at a ~17.5 GW peak) → strategic asset management plan (SAMP) → plant asset management plans → work orders |
| **Leadership** | Clear accountability for asset decisions across operations, finance and planning |
| **Assurance** | Data, audits and reviews show the assets perform as intended |

Practical artefacts: **asset register** (from handover), **criticality and risk assessment**, **asset management plan** per plant (maintenance strategy, spares, replacement forecast, budget for 5–10 years), **performance and condition monitoring**, **decision records** for major interventions.

For an **IPP**, the developer owns and manages the asset; MEWRE's asset-management role is to protect delivered energy and capacity through the PPA (performance obligations, reporting, end-of-term conditions). For **ministry-owned** plants (EPC model), MEWRE is the asset owner and the full ISO 55000 discipline applies.

### Lifecycle cost`,
        },
        { kind: "equation", formula: "m12-lcc" },
        {
          kind: "md",
          md: md`For PV+BESS, the big lifecycle events are predictable:

| Event | Typical timing | Indicative cost driver |
|---|---|---|
| Inverter wear-out / replacement | Years ~12–15 (capacitors, fans, power modules; obsolescence of spares) | ~USD 25–40/kWac for string inverters (market-dependent) |
| Tracker drives/controllers | Years 10–15 | Motors, controller batteries |
| BESS augmentation | Years 3–10 (adding modules to restore usable MWh) | Depends on guarantee and cycling |
| BESS major replacement | Years 12–20 | Cell price at that time |
| MV/HV equipment | 30–40+ years | Usually outlives the PPA |
| Module repowering | Years 15–25 (optional) | Driven by new-module economics, grid limits, PPA terms |
| Decommissioning | End of life/PPA | Net of scrap/recycling value |

### Degradation

Long-term module degradation is usually modelled as a first-year drop plus a linear annual rate:`,
        },
        { kind: "equation", formula: "m12-degradation" },
        {
          kind: "md",
          md: md`NREL's review of field data puts the median module degradation around 0.5 %/yr, with hot climates tending higher. Plant-level degradation (including balance-of-system) is estimated from years of temperature-corrected performance data, e.g. with year-on-year methods (NREL RdTools) that are robust to soiling and outliers. A measured plant degradation of 0.8 %/yr against a model assumption of 0.4 %/yr is a 30-year energy gap of ~5–6 % — a warranty and financial question, not a curiosity.`,
        },
        {
          kind: "widget",
          widget: "degradation",
          props: { rate: 0.4 },
          caption: "Compare a degradation path with the warranty line; try 0.8 %/yr to see when a claim becomes possible.",
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why the same replacement decision can be right for MEWRE and wrong for an IPP",
          md: md`Lifecycle decisions value **avoided downtime and extra energy** at some price. An IPP uses its tariff; a ministry-owned plant should use the economic value of energy (avoided fuel, avoided imports, reliability at peak), which in Kuwait is far higher than a Gulf solar tariff. Expensive interventions that only marginally raise energy (inverter replacement, robotic cleaning, repowering) look worse at the tariff and better at the economic value. Make the value assumption explicit in every decision memo.`,
        },
        {
          kind: "md",
          md: md`### Replacement decisions with NPV

Compare "replace now" against "keep (run to failure / repair)" over the remaining life using the incremental annual cash flows:`,
        },
        { kind: "equation", formula: "m12-npv-replacement" },
        {
          kind: "md",
          md: md`Add the risks that don't show in averages: **spares obsolescence** (OEM ends support → long outages), **serial defects**, grid-code changes requiring new firmware/hardware, and safety.

### Repowering and end-of-life

**Repowering** replaces modules (and often inverters) with newer, higher-power equipment on the same land and grid connection. Constraints: the PPA (contracted capacity, energy caps, whether extra energy is paid), grid capacity at the POI (export limit), permits, tracker compatibility (module dimensions), and disposal of old modules. **End-of-life**: decommissioning plan and financial security, module recycling (glass, aluminium, silicon, silver), BESS recycling (cell chemistry dependent), site restoration.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Kuwait-specific lifecycle questions — not in RESEARCH.md",
          md: md`RESEARCH.md confirms 30-year PPAs with MEWRE for the Shagaya Phase III solar IPPs, but not: end-of-term asset transfer or decommissioning obligations, any Kuwaiti regulation on PV module or battery recycling, or how repowering would be treated under the PPA. These must be confirmed from the signed PPA and with the Environment Public Authority before advising on end-of-life strategy.`,
        },
        { kind: "sources", refs: ["m12-pvmag-zone1", "m12-nrel-degradation", "m12-iso-55000"] },
      ],
    },
    {
      layer: "applied",
      title: "Should we replace the inverters at year 15?",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Inverter replacement at the IPP's tariff value",
          given: md`1,000 MWac plant, year 15, 15 years remaining. Option A (keep): repairs average USD 2.4 m/yr; downtime energy loss valued at the tariff USD 0.6 m/yr. Option B (replace all string inverters): capex USD 30 m; repairs then USD 0.3 m/yr (new warranty); efficiency gain worth USD 0.16 m/yr at tariff; downtime loss assumed negligible. Discount rate 6 %.`,
          steps: [
            { md: md`Annual saving of B vs A: $\Delta CF = 2.4 + 0.6 - 0.3 + 0.16 = 2.86$ m/yr.` },
            { md: md`Annuity factor: $AF = \dfrac{1-(1.06)^{-15}}{0.06} = 9.712$.` },
            { md: md`PV of savings: $2.86 \times 9.712 = 27.78$ m.` },
            { md: md`$\text{NPV} = 27.78 - 30 = -2.22$ m.` },
          ],
          result: md`At tariff value, wholesale replacement does not pay (NPV ≈ −USD 2.2 m). A typical IPP strategy is repair, cannibalise and replace progressively — unless spares obsolescence or rising failure rates change the inputs.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Same decision for a ministry-owned plant",
          given: md`Value energy at an illustrative avoided-fuel cost of USD 55/MWh instead of USD 14/MWh. Energy-related items scale by $55/14 = 3.93$: downtime loss becomes $0.6 \times 3.93 = 2.36$ m/yr; efficiency gain $0.16 \times 3.93 = 0.63$ m/yr. Repair costs and capex unchanged.`,
          steps: [
            {
              md: md`$\Delta CF = 2.4 + 2.36 - 0.3 + 0.63$ = ? USD m/yr`,
              hidden: true,
              check: { prompt: "Annual saving at economic value", answer: 5.09, unit: "USD m/yr", tolerance: { abs: 0.02 } },
            },
            {
              md: md`$\text{NPV} = 5.09 \times 9.712 - 30$ = ? USD m`,
              hidden: true,
              check: { prompt: "NPV of replacement at economic value", answer: 19.4, unit: "USD m", tolerance: { abs: 0.2 } },
            },
          ],
          result: md`NPV ≈ +USD 19.4 m: replacement is clearly worthwhile from the national economic perspective. The decision memo must state which value of energy it uses and why.`,
        },
        {
          kind: "question",
          question: {
            id: "m12-l05-p1",
            type: "numeric",
            prompt: md`Module warranty/model: 1 % first-year degradation, then 0.4 %/yr. What fraction of initial nameplate output remains in year 20 (in %)?`,
            answer: 91.4,
            unit: "%",
            tolerance: { abs: 0.05 },
            explanation: md`$1 - 0.01 - 0.004 \times 19 = 0.914$ → 91.4 %. For a 2,795 GWh first-year-equivalent plant, year 20 delivers ≈ 2,555 GWh (all else equal). If measured degradation is 0.8 %/yr, year 20 is ≈ 83.8 % — far below the warranty line, and a claim is likely.`,
            concepts: ["m12.degradation"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Asset management and reporting in the ministry",
      blocks: [
        {
          kind: "md",
          md: md`### The annual asset management cycle

1. **Q1**: annual performance review — degradation estimate, top losses, failure trends, warranty status.
2. **Q2**: update the asset management plan — maintenance strategy changes, spares, replacement forecast (5–10 years), budget request.
3. **Pre-summer**: readiness review (BESS HVAC, inverter cooling, spares, staffing) — summer peak is when capacity matters most.
4. **Q3**: summer performance and incidents; BESS capacity check.
5. **Q4**: budget and decisions for major interventions (inverter replacement waves, BESS augmentation, repowering studies).

### Reporting to MEWRE management

Senior officials need four things: **Are we delivering? Why not? What is being done? What do you need from me?** A good monthly report (1–2 pages plus annex):

| Section | Content |
|---|---|
| Headline | Energy vs weather-adjusted expected and vs P50; contribution at summer peak hours |
| KPIs | PR (raw and temperature-corrected), availability (energy-based), curtailment, BESS availability and efficiency |
| Losses | Top 5 losses in MWh with owner and action |
| Incidents | HSE, equipment failures, grid events |
| Contract | LDs, deemed energy/curtailment claims, warranty claims status |
| Decisions needed | E.g. approve spares budget, approve inverter replacement study |

Use consistent definitions with the PPA and O&M contract; never change a KPI basis silently.`,
        },
        {
          kind: "bilingual",
          title: "Monthly performance summary — template",
          en: md`**Shagaya PV Plant X — Monthly Performance Summary (July)**

1. Energy delivered: 265 GWh (93.0 % of weather-adjusted expected; 101 % of P50 for July).
2. Performance ratio: 0.799 (temperature-corrected 0.87); energy-based availability 98.8 %.
3. Curtailment instructed by the National Control Centre: 6.0 GWh (claim under review).
4. Main losses: soiling 4.4 GWh, inverter downtime 3.2 GWh, string faults 2.3 GWh, tracker faults 2.1 GWh.
5. Actions: additional cleaning cycle in dusty weeks; string repair campaign; tracker firmware update.
6. Decision requested: approval of critical spares budget for summer readiness.`,
          ar: `**محطة الشقايا الكهروضوئية (س) — ملخص الأداء الشهري (يوليو)**

١. الطاقة المسلّمة: ٢٦٥ جيجاواط ساعة (٩٣٫٠٪ من المتوقع المعدّل وفق الطقس الفعلي؛ ١٠١٪ من قيمة P50 لشهر يوليو).
٢. نسبة الأداء: ٠٫٧٩٩ (بعد التصحيح الحراري ٠٫٨٧)؛ الإتاحية على أساس الطاقة ٩٨٫٨٪.
٣. تقليص الإنتاج بتعليمات من مركز التحكم الوطني: ٦٫٠ جيجاواط ساعة (المطالبة قيد المراجعة).
٤. أهم الفواقد: الاتساخ ٤٫٤، توقف العواكس ٣٫٢، أعطال السلاسل ٢٫٣، أعطال المتتبعات ٢٫١ جيجاواط ساعة.
٥. الإجراءات: دورة تنظيف إضافية في الأسابيع المغبرة؛ حملة إصلاح السلاسل؛ تحديث البرمجيات الثابتة للمتتبعات.
٦. القرار المطلوب: اعتماد ميزانية قطع الغيار الحرجة للاستعداد لفصل الصيف.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Lifecycle and reporting mistakes",
          md: md`- Replacement decisions taken only when units fail en masse, during summer, with no spares.
- Degradation never measured, so warranty claims are never made.
- BESS augmentation forgotten until usable MWh falls below the contracted capacity.
- Reports full of raw numbers, no expected-energy comparison, no decision asked.
- Different PR definitions month to month; officials lose trust in all numbers.`,
        },
        {
          kind: "checklist",
          title: "PM asset-management checklist",
          items: [
            "Asset register complete and linked to CMMS and warranty data",
            "Annual degradation estimate from temperature-corrected data (year-on-year method)",
            "5–10 year replacement forecast (inverters, tracker parts, BESS augmentation) with budget",
            "Spares obsolescence watch: OEM end-of-support dates",
            "Decision memos state the value of energy used (tariff vs economic) and sensitivity",
            "Pre-summer readiness review held and recorded",
            "Monthly report: expected vs actual, top losses, actions, decisions needed; definitions fixed",
            "End-of-life and repowering obligations checked against the PPA/contract",
          ],
        },
        {
          kind: "ask",
          title: "Ask the IPP / O&M contractor / OEMs",
          items: [
            "What plant-level degradation rate do your data show, and with what method and uncertainty?",
            "When does the inverter OEM end support for this model, and what is your replacement plan?",
            "How will BESS usable energy be maintained to the contracted value over the PPA term?",
            "What are the end-of-PPA obligations for the site and equipment?",
            "What assumptions sit behind your 10-year capex forecast?",
          ],
        },
        { kind: "scenario", scenario: "m12-s5" },
        {
          kind: "feynman",
          prompt: "Explain to the Undersecretary why the ministry should evaluate inverter replacement differently from how a private IPP would.",
          keyPoints: [
            "NPV compares replacement capex with savings over remaining life",
            "Savings include avoided downtime and efficiency gains valued at a price of energy",
            "IPP uses tariff; ministry should use economic value (avoided fuel, reliability)",
            "Higher value makes replacement worthwhile sooner; state the assumption explicitly",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m12-l05-q1",
      type: "mcq",
      prompt: "ISO 55000 defines asset management primarily as…",
      options: [
        "Maintaining equipment on schedule",
        "Coordinated activity of an organisation to realise value from assets",
        "Accounting for depreciation",
        "Buying the cheapest equipment",
      ],
      answer: 1,
      explanation: md`Value realisation, balancing cost, risk and performance over the lifecycle, aligned with organisational objectives.`,
      concepts: ["m12.iso-55000"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m12-l05-q2",
      type: "numeric",
      prompt: md`An intervention costs USD 12 m and saves USD 1.5 m/yr for 12 years at 6 %. What is its NPV (USD m)? (Annuity factor $= (1-1.06^{-12})/0.06$.)`,
      answer: 0.58,
      unit: "USD m",
      tolerance: { abs: 0.03 },
      explanation: md`$AF = (1 - 1.06^{-12})/0.06 = 8.384$. PV $= 1.5 \times 8.384 = 12.58$ m. NPV $= 12.58 - 12 = 0.58$ m — marginal; sensitivity to the savings estimate decides it.`,
      concepts: ["m12.lifecycle-cost"],
      difficulty: 2,
    },
    {
      id: "m12-l05-q3",
      type: "mcq",
      prompt: "When do string/central inverters typically reach wear-out and become replacement candidates?",
      options: ["Years 2–3", "Years ~12–15", "Year 30+", "Never"],
      answer: 1,
      explanation: md`Capacitors, fans and power electronics age (faster in heat), and spares support often ends around this time.`,
      concepts: ["m12.repowering"],
      difficulty: 1,
    },
    {
      id: "m12-l05-q4",
      type: "multi",
      prompt: "Which constraints affect a module repowering decision? Select all.",
      options: [
        "PPA terms on contracted capacity and payment for extra energy",
        "Grid export limit at the POI",
        "Tracker compatibility with new module dimensions",
        "The colour of the inverter housings",
        "Disposal/recycling of removed modules",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`Repowering is constrained by contract, grid, mechanics and end-of-life handling.`,
      concepts: ["m12.repowering"],
      difficulty: 1,
    },
    {
      id: "m12-l05-q5",
      type: "decision",
      prompt: md`Year 6 data show plant degradation of 0.85 %/yr vs 0.4 %/yr assumed. What is your first step?`,
      options: [
        { text: "Revise the long-term forecast and move on", score: 0.3, feedback: "You may be leaving a warranty claim and a technical root cause on the table." },
        { text: "Verify the estimate (method, soiling, sensor drift), then commission IV/EL/flash sampling to identify the mechanism (PID, LeTID, encapsulant) and check against warranty lines", score: 1, feedback: "Verify, diagnose, then claim — and fix the cause if possible (e.g. PID mitigation)." },
        { text: "File a warranty claim immediately on the whole plant", score: 0.4, feedback: "Claims need accredited sample evidence; plant-level data alone rarely suffice." },
      ],
      explanation: md`Plant-level degradation includes soiling trends and sensor drift; confirm before acting, then gather module-level evidence.`,
      concepts: ["m12.degradation"],
      difficulty: 2,
    },
    {
      id: "m12-l05-q6",
      type: "short",
      prompt: "What four questions should a monthly performance report to senior MEWRE officials answer, and why?",
      rubric: [
        "Are we delivering (vs expected and P50)?",
        "Why not (main losses)?",
        "What is being done (actions, owners)?",
        "What decision or support is needed from management?",
      ],
      modelAnswer:
        "Are we delivering — energy vs weather-adjusted expected and P50, especially at peak; why not — top losses in MWh; what is being done — actions with owners and dates; what do you need from me — explicit decisions or approvals. Officials have little time; reports that end with a clear request get action.",
      explanation: md`Reports exist to drive decisions. Consistent KPI definitions build trust over time.`,
      concepts: ["m12.performance-reporting"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "m12-l05-f1", front: "Lifecycle cost", back: md`$LCC = C_0 + \sum_t \dfrac{O_t + M_t + R_t}{(1+r)^t} - \dfrac{V_{res}}{(1+r)^T}$`, concepts: ["m12.lifecycle-cost"] },
    { id: "m12-l05-f2", front: "Degradation model (first-year + linear)", back: md`$P_n = P_0[1 - d_1 - d(n-1)]$`, concepts: ["m12.degradation"] },
    { id: "m12-l05-f3", front: "Median module degradation (NREL field review)", back: "~0.5 %/yr; hot climates tend higher.", concepts: ["m12.degradation"] },
    { id: "m12-l05-f4", front: "ISO 55000 / 55001 / 55002", back: "Overview & terminology / requirements for an AM system / guidance.", concepts: ["m12.iso-55000"] },
    { id: "m12-l05-f5", front: "Annuity factor", back: md`$AF = \dfrac{1-(1+r)^{-n}}{r}$; 6 %/15 yr = 9.712`, concepts: ["m12.lifecycle-cost"] },
    { id: "m12-l05-f6", front: "Why ministry and IPP lifecycle decisions differ", back: "Different value of energy: tariff vs economic (avoided fuel, reliability).", concepts: ["m12.lifecycle-cost"] },
    { id: "m12-l05-f7", front: "Tool for robust degradation estimates", back: "Year-on-year analysis of temperature-corrected data (e.g. NREL RdTools).", concepts: ["m12.degradation"] },
    { id: "m12-l05-f8", front: "Four questions of a ministry performance report", back: "Delivering? Why not? What's being done? What do you need from me?", concepts: ["m12.performance-reporting"] },
  ],
  scenarios: [
    {
      id: "m12-s5",
      title: "The inverter replacement memo",
      context: md`You are the MEWRE asset manager for a ministry-owned 1 GW PV plant in year 14. Inverter failures rose from 3 % to 7 % per year; the OEM announced end of support in 3 years. Finance asks for a recommendation before the budget deadline.`,
      start: "a",
      concepts: ["m12.lifecycle-cost", "m12.repowering", "m12.performance-reporting"],
      nodes: {
        a: {
          md: md`Your analyst's NPV at the IPP-style tariff value is −USD 2 m for full replacement. At an economic value of energy it is +USD 19 m.`,
          choices: [
            { text: "Recommend against replacement — NPV is negative", next: "b", score: 3, feedback: "You used the wrong value of energy for a ministry-owned asset and ignored obsolescence risk." },
            { text: "Recommend a phased replacement programme starting before summer, justified at economic value with sensitivity, and highlight end-of-support risk", next: "c", score: 10, feedback: "Right value basis, risk-aware, phased to protect summer capacity and budget." },
            { text: "Recommend replacing everything immediately", next: "c", score: 6, feedback: "Directionally right, but a phased plan reduces execution risk and spreads budget." },
          ],
        },
        b: {
          md: md`Two summers later, failures reach 12 %/yr and spares are unavailable; 80 MW is out for weeks at peak.`,
          choices: [{ text: "Emergency procurement", score: 2, feedback: "Costlier and slower than a planned programme." }],
        },
        c: {
          md: md`Finance asks: "Why does your NPV differ from the private-sector logic?"`,
          choices: [
            { text: "Explain: the ministry's benefit is avoided fuel and peak reliability, not the tariff; show the sensitivity table and the break-even energy value", next: "d", score: 10, feedback: "Transparent assumptions win approvals." },
            { text: "Say the analyst's model is confidential", score: 1, feedback: "Opaque analysis loses trust." },
          ],
        },
        d: {
          md: md`The programme is approved in three phases. What do you add to the plan?`,
          choices: [
            { text: "Procurement timeline with lead times, pre-summer installation windows, grid-code compliance testing of new inverters, and a lessons-learned record for future plants", score: 10, feedback: "Execution detail is what turns an approved memo into delivered capacity." },
          ],
        },
      },
    },
  ],
};

export default lesson;
