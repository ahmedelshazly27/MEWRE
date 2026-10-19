import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m03-l04",
  title: "CSP vs PV+BESS: The Decision",
  summary:
    "Dispatchability, LCOE trends, why new projects in the Gulf choose PV+BESS, where CSP may still fit, and a structured decision framework a ministry can defend.",
  minutes: 70,
  objectives: [
    "You can compute a screening LCOE with a capital recovery factor and compare CSP with PV+BESS on cost per delivered evening MWh",
    "You can explain dispatchability and what CSP storage and batteries each provide to the grid",
    "You can summarise IRENA cost trends and why PV+BESS has displaced most new CSP",
    "You can identify the niches where CSP may still be competitive",
    "You can structure a technology-choice decision for MEWRE with criteria, weights and risks",
  ],
  concepts: [
    {
      id: "m03.dispatchability",
      name: "Dispatchability",
      description: "Ability to deliver energy when the system operator needs it; CSP via thermal storage and a synchronous turbine, PV via batteries and inverters.",
      competency: "solar",
      related: ["m03.pvbess-competition", "m05.energy-shifting", "m06.inertia", "m06.grid-forming"],
    },
    {
      id: "m03.lcoe-comparison",
      name: "LCOE comparison",
      description: "Levelised cost per MWh using CRF; must be compared on the same delivery profile, not on raw MWh.",
      competency: "finance",
      related: ["m10.lcoe", "m10.crf"],
    },
    {
      id: "m03.pvbess-competition",
      name: "PV+BESS competition",
      description: "Cheap PV plus falling battery costs deliver evening energy at lower cost and with faster construction than CSP.",
      competency: "solar",
      related: ["m05.pv-firming", "m05.bess-sizing"],
    },
    {
      id: "m03.csp-niche",
      name: "Where CSP still fits",
      description: "Long-duration (10–15 h) night supply, synchronous inertia, high DNI sites, industrial heat and hybrid PV-CSP.",
      competency: "solar",
      related: ["m06.system-strength"],
    },
    {
      id: "m03.technology-decision",
      name: "Technology decision framework",
      description: "Define the service required, compare options on delivered cost, risk, schedule, grid value and local factors, then decide with sensitivities.",
      competency: "delivery",
      related: ["m03.lcoe-comparison", "m03.csp-niche", "m07.options-analysis"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "What each option actually delivers",
      blocks: [
        {
          kind: "md",
          md: md`## Start from the service, not the technology

The wrong question is "Which is cheaper, CSP or PV?" — PV wins that every time. The right question is: **what service does the grid need, and which option delivers that service at the lowest total cost and risk?** For Kuwait the services are:

1. **Daytime energy** during the 11:00–17:00 summer peak — PV does this natively and cheaply.
2. **Evening and night energy** after sunset when air-conditioning load stays high — needs storage (CSP TES or BESS) or conventional plant.
3. **Firm capacity** — will the plant reliably be there during the annual peak hour?
4. **Grid support** — inertia, fault level, frequency and voltage control.

## Dispatchability

**CSP with storage** decouples collection from generation: heat collected at noon can be turned into electricity at 22:00. The turbine is a **synchronous generator** — it provides real inertia and short-circuit current, like a gas plant. Ramp rates are moderate (a few %/min) and start-ups take 30–90 minutes. Storage of 10–15 h is cheap to add because the marginal cost is just salt and tanks.

**PV + BESS** stores electricity, not heat. Batteries respond in milliseconds, can provide fast frequency response, black start (with grid-forming inverters) and synthetic inertia. But the marginal cost of each extra hour of battery storage is the full cost of more cells — duration is expensive, and 4 h is the current sweet spot; 6–8 h systems exist and are increasingly tendered. Batteries degrade with cycling and need augmentation over life.

| Attribute | CSP with TES | PV + BESS |
|---|---|---|
| Storage medium | Heat (molten salt) | Electrochemical (LFP) |
| Cheap duration | 6–15 h | 2–4 h (6–8 h emerging) |
| Round-trip efficiency | ~93–98 % thermal (but electricity conversion happens after storage) | ~85–90 % AC-AC |
| Grid support | Synchronous inertia, fault current | Fast response, grid-forming possible |
| Construction time | 3–4 years | 1.5–2.5 years |
| Modularity | Large lumps (50–200 MW units) | Highly modular |
| O&M staff (100 MW class) | 50–80 | 10–20 |
| Water | 0.2–0.4 m³/MWh dry-cooled | PV washing only |
| Technology risk | Moderate–high (tanks, receivers) | Low–moderate (fire safety, degradation) |
| Supply chain | Few EPCs/technology providers | Deep, competitive |

## Cost trends — what IRENA shows

IRENA's annual *Renewable Power Generation Costs* series is the reference for global cost trends. Between 2010 and 2023, the global weighted-average LCOE of utility-scale PV fell by roughly 90 % to around USD 0.04–0.05/kWh, while CSP fell by roughly 70 % to around USD 0.12/kWh — impressive, but from a much higher base and with far fewer projects (only a handful per year, mostly in China, the Middle East and Morocco). Battery pack prices fell by roughly 90 % over the same period. Record Gulf PV tariffs fell below USD 0.015/kWh (UAE and Saudi tenders around 2020–2021). Against that, even the record CSP tariff of about USD 0.073/kWh at Noor Energy 1 is ~5× PV's daytime energy price.

Read the latest edition before quoting: numbers are revised each year and depend on the year's small CSP sample.`,
        },
        { kind: "sources", refs: ["m03-irena-costs-2023", "m03-dewa-mbr-park"] },
        {
          kind: "md",
          md: md`## Screening LCOE

For a quick comparison, annualise capex with the capital recovery factor:`,
        },
        { kind: "equation", formula: "m03-crf" },
        { kind: "equation", formula: "m03-lcoe-simple" },
        {
          kind: "md",
          md: md`But LCOE comparisons are **only valid for the same delivery profile**. One MWh of PV at 13:00 in April is worth far less to Kuwait than one MWh at 21:00 in August. The fair comparison is the **cost of delivering the required profile**: e.g. "100 MW firm from 17:00 to 23:00 every day plus whatever daytime energy comes with it". That is what the widget below does.

## Why new projects choose PV+BESS

1. **Cost of the evening MWh**: PV energy at ~USD 15–20/MWh plus battery storage at ~USD 50–80/MWh-delivered (2024–25 Middle East pricing) typically beats CSP at ~USD 100–130/MWh for 4–6 h evening needs.
2. **Speed**: PV+BESS can be built in under two years; CSP takes 3–4 years with long commissioning.
3. **Risk and bankability**: deep EPC market, many reference plants, simple O&M; lenders price CSP technology risk higher.
4. **Modularity and phasing**: add BESS blocks as the evening peak grows; augment batteries as they degrade.
5. **Grid services**: grid-forming BESS now offers much of what the synchronous turbine offered.

## Where CSP may still fit

- **Long duration (10–15 h) overnight supply** where batteries would need to be very large — the economics cross over somewhere around 8–12 h depending on battery prices.
- **Hybrid PV-CSP** (Noor Energy 1, Chile's Cerro Dominador, Morocco's Noor Midelt concept): PV supplies the day, CSP storage supplies the night, sharing a grid connection.
- **High, reliable DNI sites** (Atacama, parts of Morocco, Saudi north-west). Kuwait's dusty, aerosol-laden DNI is a disadvantage.
- **System strength**: where the grid needs synchronous machines and grid-forming BESS is not yet trusted.
- **Industrial process heat** (e.g. steam for enhanced oil recovery or desalination) where heat is the product.
- **Industrial policy** (local manufacturing of steel structures, mirrors, tanks).`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why the crossover depends on duration",
          md: md`CSP's cost is dominated by the field and power block; each extra hour of salt storage is cheap. A battery's cost scales almost linearly with MWh. So at 2–4 h, batteries win comfortably; at 12–15 h of nightly supply, CSP's cheap duration starts to compete. As battery prices keep falling, the crossover duration keeps moving out — which is why the decision must be re-tested with current prices, not 2015 assumptions.`,
        },
        { kind: "widget", widget: "csp-vs-pvbess", caption: "Set an evening delivery requirement (MW and hours) and compare capex, LCOE and the dispatch profile of CSP+TES against PV+BESS." },
      ],
    },
    {
      layer: "applied",
      title: "Comparing costs per delivered MWh",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Screening LCOE of a 100 MW CSP plant with 10 h storage",
          given: md`Illustrative assumptions (not a quote): 100 MW net tower/trough with 10 h TES, installed cost USD 5,500/kW, fixed O&M 2 % of capex per year, capacity factor 55 %, real WACC 7 %, life 30 years.`,
          steps: [
            { md: md`**Capex:** $100{,}000\ \text{kW} \times 5{,}500 = $ USD 550 m.` },
            { md: md`**CRF:** $0.07 \times 1.07^{30} / (1.07^{30} - 1) = 0.08059$.` },
            { md: md`**Annualised capex:** $550\text{ m} \times 0.08059 = $ USD 44.3 m/yr.` },
            { md: md`**O&M:** $0.02 \times 550\text{ m} = $ USD 11 m/yr.` },
            { md: md`**Energy:** $100 \times 8{,}760 \times 0.55 = 481{,}800$ MWh/yr.` },
            { md: md`**LCOE:** $(44.3 + 11)\text{ m} / 481{,}800 = $ USD 114.8/MWh.` },
          ],
          result: md`About **USD 115/MWh** (≈ 35 fils/kWh at 1 KWD = 3.25 USD). Sensitivity: CF of 45 % instead of 55 % (e.g. due to lower measured DNI) raises it to ~USD 140/MWh — DNI risk is cost risk.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Cost of an evening MWh from a battery charged by PV",
          given: md`A 100 MW / 600 MWh (usable) LFP BESS delivering 6 h every evening, 365 days/yr. Installed cost USD 200/kWh usable, fixed O&M 2 % of capex/yr, life 20 years (augmentation included in O&M for simplicity), WACC 7 %. Charging energy from PV costs USD 15/MWh; round-trip efficiency 87 %.`,
          steps: [
            { md: md`Capex: $600{,}000\ \text{kWh} \times 200 = $ USD 120 m. CRF(7 %, 20 yr) = 0.09439.` },
            { md: md`Annual cost: $120\text{ m} \times 0.09439 + 0.02 \times 120\text{ m} = $ USD 13.73 m/yr.` },
            {
              md: md`Energy delivered: $600 \times 365 = 219{,}000$ MWh/yr → storage cost $13.73\text{ m} / 219{,}000 \approx$ USD 62.7/MWh.`,
              hidden: true,
              check: { prompt: "Storage cost per delivered MWh", answer: 62.7, unit: "USD/MWh", tolerance: { rel: 0.02 } },
            },
            {
              md: md`Charging cost per delivered MWh: $15 / 0.87 = $ USD 17.2/MWh → total ≈ USD 79.9/MWh.`,
              hidden: true,
              check: { prompt: "Total cost per delivered evening MWh", answer: 79.9, unit: "USD/MWh", tolerance: { rel: 0.02 } },
            },
          ],
          result: md`About **USD 80/MWh** for 6 h evening delivery versus ~USD 115/MWh for the CSP plant's average MWh. Note the CSP also delivers daytime energy and its storage is cheaper per extra hour; at 12 h+ durations or higher battery prices the comparison narrows. Always run sensitivities on battery price, PV tariff, DNI and WACC.`,
        },
        {
          kind: "question",
          question: {
            id: "m03-l04-p1",
            type: "numeric",
            prompt: md`Recompute the CSP screening LCOE with: installed cost USD 4,500/kW, O&M 2 % of capex/yr, capacity factor 50 %, WACC 8 %, life 25 years, 100 MW. Answer in USD/MWh.`,
            answer: 116.8,
            tolerance: { rel: 0.02 },
            unit: "USD/MWh",
            explanation: md`Capex USD 450 m; CRF(8 %, 25) = $0.08 \times 1.08^{25}/(1.08^{25}-1) = 0.09368$ → USD 42.2 m/yr; O&M USD 9 m/yr; energy $100 \times 8{,}760 \times 0.5 = 438{,}000$ MWh. LCOE = 51.2 m / 438,000 ≈ **USD 116.8/MWh**. An 18 % cheaper plant ends up at almost the same LCOE because of higher WACC, shorter life and lower CF — financing and resource matter as much as capex.`,
            concepts: ["m03.lcoe-comparison"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "A decision framework a ministry can defend",
      blocks: [
        {
          kind: "md",
          md: md`## Seven steps

1. **Define the need** in grid terms with MEWRE's system planning: MW and MWh by hour and season, firm capacity at peak, grid-support requirements. Use the actual load curve, not averages.
2. **Generate options**: PV+BESS (4 h, 6 h, 8 h), CSP+TES, hybrid PV-CSP, gas peakers/CCGT as reference, demand response, GCCIA imports.
3. **Model delivered cost** for the same profile (hourly simulation, SAM or PLEXOS-class tools), using local resource data (ground DNI for CSP), local costs and current prices.
4. **Score non-cost criteria**: schedule to COD, technology and construction risk, bankability, water, land, O&M staffing and Kuwaitisation potential, grid support, local content.
5. **Quantify risk**: Monte Carlo or at least sensitivities on DNI, battery price, WACC, schedule delay; P90 cases.
6. **Decide and document** in a memo with clear recommendation, criteria weights agreed upfront, and the conditions that would change the answer.
7. **Procure accordingly**: technology-neutral tenders (specify the service: "X MW firm 17:00–23:00") can let the market choose — a powerful approach if KAPP's evaluation can handle it.

## Typical weighted-criteria table (illustrative)

| Criterion | Weight | PV+4h BESS | CSP 10 h | Hybrid PV-CSP |
|---|---|---|---|---|
| Delivered cost of required profile | 35 % | High score | Low | Medium |
| Schedule to COD | 15 % | High | Low | Low–medium |
| Technology/operational risk | 15 % | High | Medium–low | Medium |
| Grid support (inertia, fault level) | 10 % | Medium (grid-forming) | High | High |
| Water use | 10 % | High | Medium | Medium |
| Local jobs/O&M Kuwaitisation | 10 % | Medium | High | High |
| Long-duration capability | 5 % | Low | High | High |

The weights are policy choices — that is exactly why they must be agreed **before** scores are known, or the result will look reverse-engineered.`,
        },
        {
          kind: "callout",
          tone: "kuwait",
          title: "Kuwait's current direction",
          md: md`Kuwait's current utility-scale pipeline (Shagaya Phase III zones procured by KAPP) is solar PV, with battery storage planned separately; the 200 MW Phase 2 CSP plant was never procured. Any proposal to revisit CSP should therefore be framed as a long-duration or hybrid niche with fresh analysis, not a return to the 2014 masterplan.`,
        },
        { kind: "sources", refs: ["m03-iea-policy-5541", "m03-ice-phase2"] },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Mistakes in technology comparisons",
          md: md`- Comparing CSP LCOE with PV LCOE without equalising the delivery profile.
- Using a 2015 battery price or a 2015 CSP cost.
- Ignoring battery augmentation and replacement at year 10–15.
- Using satellite DNI for CSP in Kuwait.
- Ignoring construction time: a 2-year delay in a summer-deficit system has real cost (imports, load shedding).
- Treating "dispatchable" as binary — 4 h BESS is dispatchable for 4 h, not overnight.`,
        },
        {
          kind: "checklist",
          title: "PM checklist — technology options paper",
          items: [
            "Need defined as an hourly profile with MEWRE system planning sign-off",
            "Same delivery profile used for all options",
            "Current cost data (IRENA latest edition, recent Gulf tariffs, BESS tender prices) with dates",
            "Ground-measured DNI basis for any CSP option",
            "Battery degradation and augmentation explicitly costed",
            "Schedule to COD and its cost (imports, outages avoided) included",
            "Criteria and weights agreed before scoring",
            "Sensitivities and the 'what would change our mind' conditions stated",
          ],
        },
        {
          kind: "ask",
          title: "Ask the consultant",
          items: [
            "Which delivery profile did you compare, and how was the hourly value of energy modelled?",
            "What battery price and augmentation schedule did you assume, and from which tenders?",
            "At what storage duration does CSP become cheaper than PV+BESS under your assumptions?",
            "How would a 10 % lower DNI change the CSP case?",
            "What grid-support services does the system need, and can grid-forming BESS provide them?",
          ],
        },
        { kind: "scenario", scenario: "m03-s3" },
        {
          kind: "feynman",
          prompt: "Explain to a member of the Higher Committee why 'CSP is dispatchable, PV is not' is no longer a sufficient reason to choose CSP.",
          keyPoints: [
            "Batteries make PV dispatchable for the duration of the storage",
            "PV plus 4–6 h BESS usually delivers evening energy more cheaply and faster than CSP",
            "CSP's advantage is cheap long duration (10–15 h) and synchronous grid support",
            "The decision should compare delivered cost of the required profile and risk, not technology labels",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m03-l04-q1",
      type: "mcq",
      prompt: "The main structural cost advantage of CSP over PV+BESS is:",
      options: ["Cheaper daytime energy", "Cheap additional hours of storage (salt and tanks)", "Faster construction", "Fewer staff"],
      answer: 1,
      explanation: md`Thermal storage duration is cheap at the margin; battery duration is not. Everything else in the list favours PV+BESS.`,
      concepts: ["m03.csp-niche"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m03-l04-q2",
      type: "numeric",
      prompt: md`What is the capital recovery factor at 7 % over 30 years? (4 decimal places)`,
      answer: 0.0806,
      tolerance: { abs: 0.0005 },
      explanation: md`$CRF = 0.07 \times 1.07^{30} / (1.07^{30} - 1) = 0.07 \times 7.612 / 6.612 = 0.0806$.`,
      concepts: ["m03.lcoe-comparison"],
      difficulty: 1,
    },
    {
      id: "m03-l04-q3",
      type: "multi",
      prompt: "Which conditions favour CSP over PV+BESS? (select all)",
      options: ["Need for 12–15 h overnight supply", "High, reliable DNI with low aerosols", "Need for delivery within 18 months", "Grid needs synchronous inertia and fault level", "Very low battery prices"],
      answer: [0, 1, 3],
      explanation: md`Long duration, clear DNI and need for synchronous machines favour CSP. Fast delivery and cheap batteries favour PV+BESS.`,
      concepts: ["m03.csp-niche", "m03.dispatchability"],
      difficulty: 2,
    },
    {
      id: "m03-l04-q4",
      type: "mcq",
      prompt: "Why is comparing raw LCOE of CSP (USD 115/MWh) with PV (USD 18/MWh) misleading?",
      options: [
        "LCOE ignores capex",
        "They deliver different profiles — PV energy arrives only in daylight, CSP energy can be shifted to evening/night",
        "PV LCOE is always understated",
        "CSP LCOE includes tax",
      ],
      answer: 1,
      explanation: md`LCOE is a cost per MWh regardless of when it arrives. Compare options delivering the same profile — e.g. PV+BESS vs CSP for the same evening requirement.`,
      concepts: ["m03.lcoe-comparison", "m03.dispatchability"],
      difficulty: 1,
    },
    {
      id: "m03-l04-q5",
      type: "order",
      prompt: "Order the steps of a defensible technology decision.",
      items: [
        "Define the grid need as an hourly profile",
        "Generate technology options",
        "Model delivered cost of the same profile",
        "Score non-cost criteria with pre-agreed weights",
        "Run sensitivities and risk analysis",
        "Recommend and document conditions that would change the answer",
      ],
      explanation: md`Need first, options second, then cost and non-cost evaluation, risk, and a documented recommendation. Weights agreed before scoring keep the process credible to the Audit Bureau and Higher Committee.`,
      concepts: ["m03.technology-decision"],
      difficulty: 2,
    },
    {
      id: "m03-l04-q6",
      type: "decision",
      prompt: "A vendor proposes a 200 MW CSP plant to MEWRE as an unsolicited proposal, claiming it is 'the only dispatchable solar'. What is your response?",
      options: [
        { text: "Recommend direct negotiation — CSP is unique", score: 0, feedback: "Not unique (PV+BESS is dispatchable) and direct award bypasses competition and likely procurement rules." },
        { text: "Thank them; include CSP as one option in a technology-neutral needs analysis and, if justified, a competitive KAPP tender for the service", score: 1, feedback: "Correct: needs-based, technology-neutral and competitive." },
        { text: "Reject because PV is cheaper", score: 0.3, feedback: "Likely right on cost for short durations, but a reasoned analysis is needed — there may be a long-duration niche." },
      ],
      explanation: md`Unsolicited proposals should be routed into a structured, competitive process defined by the service needed.`,
      concepts: ["m03.technology-decision", "m03.pvbess-competition"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m03-l04-f1", front: "Capital recovery factor", back: md`$CRF = r(1+r)^n/((1+r)^n-1)$; 7 %/30 yr ≈ 0.0806.`, concepts: ["m03.lcoe-comparison"] },
    { id: "m03-l04-f2", front: "Screening LCOE", back: md`$(\text{CAPEX}\cdot CRF + \text{OPEX})/E$.`, concepts: ["m03.lcoe-comparison"] },
    { id: "m03-l04-f3", front: "Global CSP LCOE trend 2010–2023 (IRENA, approx.)", back: "Fell ~70 % to ≈USD 0.12/kWh; PV fell ~90 % to ≈USD 0.04–0.05/kWh.", concepts: ["m03.pvbess-competition"] },
    { id: "m03-l04-f4", front: "Battery 'sweet spot' duration today", back: "≈4 h (6–8 h emerging).", concepts: ["m03.dispatchability"] },
    { id: "m03-l04-f5", front: "CSP's unique grid contribution", back: "Synchronous generator: inertia and fault current; plus cheap long-duration storage.", concepts: ["m03.csp-niche"] },
    { id: "m03-l04-f6", front: "Technology-neutral tender", back: "Specify the service (e.g. 'X MW firm 17:00–23:00'), let bidders choose technology.", concepts: ["m03.technology-decision"] },
    { id: "m03-l04-f7", front: "Construction time: CSP vs PV+BESS", back: "≈3–4 years vs ≈1.5–2.5 years.", concepts: ["m03.pvbess-competition"] },
  ],
  scenarios: [
    {
      id: "m03-s3",
      title: "Evening peak options paper",
      context: md`MEWRE's planning department projects a 1,000 MW evening shortfall (18:00–23:00) by summer 2029. You are asked to lead the technology options paper. A senior engineer strongly favours CSP "because Shagaya already has it"; the finance team favours PV+BESS.`,
      start: "a",
      nodes: {
        a: {
          md: md`What do you do first?`,
          choices: [
            { text: "Convene planning, finance and engineering to agree the need profile and evaluation criteria/weights before any technology is scored", next: "b", score: 10, feedback: "Locks in a fair process and gets buy-in from both camps." },
            { text: "Ask a consultant for an LCOE comparison of CSP and PV", next: "c", score: 4, feedback: "Misses the delivery profile and non-cost criteria." },
            { text: "Go with PV+BESS since the finance team is right on cost", next: "c", score: 3, feedback: "Probably the outcome, but deciding before analysis undermines credibility." },
          ],
        },
        b: {
          md: md`The agreed need is 1,000 MW for 5 h nightly by 2029. Analysis: PV+5h BESS delivered cost ~USD 85/MWh, COD feasible 2028; CSP 10 h ~USD 120/MWh, earliest COD 2030.`,
          choices: [
            { text: "Recommend PV+BESS, note CSP as a future option if >10 h duration needs emerge, and show sensitivities", score: 10, feedback: "Clear, evidence-based and keeps options open." },
            { text: "Recommend a 50/50 split to keep both camps happy", score: 3, feedback: "Splitting to avoid conflict costs money and misses the 2029 deadline on the CSP half." },
          ],
        },
        c: {
          md: md`The Undersecretary asks why your paper does not address the schedule — the shortfall arrives in 2029.`,
          choices: [
            { text: "Revise: add schedule-to-COD and the cost of shortfall to the criteria", score: 6, feedback: "Recovered, but late." },
            { text: "Argue that cost is the main criterion", score: 2, feedback: "A plant that arrives after the shortfall has no value in that shortfall." },
          ],
        },
      },
      concepts: ["m03.technology-decision", "m03.pvbess-competition"],
    },
  ],
};

export default lesson;
