import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m07-l01",
  title: "Stage Gates, Feasibility & the Business Case",
  summary:
    "How a utility-scale PV/BESS project moves from idea to investment decision: pre-feasibility, feasibility study contents, options analysis, the business case and the gate reviews that stop bad projects early.",
  minutes: 70,
  objectives: [
    "You can explain why stage-gated development exists and what decision each gate makes",
    "You can list what a bankable feasibility study for a PV+BESS project must contain and spot what is missing",
    "You can run an options analysis using annualised cost (CRF/LCOE) and a weighted multi-criteria score",
    "You can structure a business case for a MEWRE decision-maker around avoided cost, risk and deliverability",
    "You can chair (or prepare for) a gate review with clear go / recycle / stop criteria",
  ],
  concepts: [
    {
      id: "m07.stage-gate",
      name: "Stage-gate lifecycle",
      description:
        "A project is divided into stages separated by gates; at each gate a decision-maker approves, recycles or stops the project based on defined deliverables and criteria.",
      competency: "delivery",
      related: ["m07.feasibility-study", "m07.business-case", "m08.stage-gates"],
    },
    {
      id: "m07.feasibility-study",
      name: "Feasibility study",
      description:
        "Structured technical, environmental, commercial and financial analysis that tests whether a project can be built and financed and what the preferred option is.",
      competency: "delivery",
      related: ["m07.options-analysis", "m02.p50-p90"],
    },
    {
      id: "m07.options-analysis",
      name: "Options analysis",
      description:
        "Comparing alternative ways to meet the need (technology, size, site, procurement route) on a like-for-like basis, using annualised cost and multi-criteria scoring.",
      competency: "finance",
      related: ["m07.business-case", "m10.crf", "m10.lcoe"],
    },
    {
      id: "m07.business-case",
      name: "Business case",
      description:
        "The decision document that justifies investment: strategic need, economic value, commercial route, affordability and management plan.",
      competency: "delivery",
      related: ["m00.displaced-fuel-value", "m00.economic-vs-financial"],
    },
    {
      id: "m07.gate-review",
      name: "Gate review",
      description:
        "A formal review at the end of a stage, using a checklist of required deliverables and criteria, producing a recorded decision with conditions.",
      competency: "delivery",
      related: ["m07.stage-gate"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Why projects are gated",
      blocks: [
        {
          kind: "md",
          md: md`A 1 GW PV + BESS project in Kuwait is a USD 0.6–1.2 bn commitment that will run for 25–30 years. The cheapest moment to change it is before anyone has signed anything. The **ability to influence** outcome is highest at concept, while the **cost of change** rises almost exponentially once detailed design, procurement and construction begin. Stage-gating exists to exploit that asymmetry: spend a small amount of money (typically 1–3 % of capex across all development stages) to buy information that reduces the uncertainty on the big spend.

A **stage** is a period of work producing defined deliverables. A **gate** is a decision point where an accountable person or committee looks at those deliverables and decides:

| Decision | Meaning | Typical trigger |
|---|---|---|
| **Go** | Release budget and authority for the next stage | Criteria met, risks acceptable |
| **Go with conditions** | Proceed, but specific actions must close by a date | Minor gaps, e.g. geotech pending |
| **Recycle / hold** | Redo or extend the current stage | Major gap or changed assumption |
| **Stop** | Kill the project, record lessons | Not needed, not affordable, not deliverable |

The single most useful mental model: **each gate answers a different question**. Mixing the questions is the classic failure.`,
        },
        {
          kind: "md",
          md: md`### A typical gate sequence for a utility PV/BESS project

| Gate | Question it answers | Key inputs | Typical duration of preceding stage |
|---|---|---|---|
| **G0 — Need / mandate** | Is there a real need we are mandated to meet? | Demand forecast, policy target, capacity gap | 1–3 months |
| **G1 — Pre-feasibility** | Is it worth studying in detail? Which options survive? | Desktop resource, site screening, order-of-magnitude cost (±30–50 %) | 2–4 months |
| **G2 — Feasibility / option selection** | Which option, where, how procured, at what cost (±15–25 %)? | Feasibility study, site surveys, grid pre-study, EIA scoping, business case | 6–12 months |
| **G3 — Investment / procurement decision** | Do we commit to tender? | Final business case, tender documents, budget approval, permits path | 3–6 months |
| **G4 — Award / financial close** | Do we sign and commit capital? | Evaluated bids, contract terms, approvals (e.g. Audit Bureau), financing | 6–18 months |
| **G5 — Construction readiness / NTP** | Can construction start safely? | Design basis frozen, land handed over, permits, HSE plan | 1–3 months |
| **G6 — COD / taking over** | Does the plant meet the contract? | Test results, punch list, documentation | 1–3 months |
| **G7 — Close-out / final acceptance** | Is everything finished and learned? | Performance certificate, lessons learned, final account | end of DNP |

Estimate accuracy narrows as you pass gates. AACE-style estimate classes are a good reference: Class 5 (concept screening) roughly −50 %/+100 %, Class 4 (feasibility) roughly −30 %/+50 %, Class 3 (budget authorisation) roughly −20 %/+30 %, Class 2 (control/bid check) roughly −15 %/+20 %. A PM who presents a Class 5 number as if it were a budget figure has created a future overrun.`,
        },
        {
          kind: "widget",
          widget: "lifecycle",
          caption: "Click each stage: deliverables, typical duration and the gate decision that closes it.",
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why gates fail in practice",
          md: md`Gates fail when they become ceremonies. Three mechanisms: (1) **sunk-cost pressure** — "we have already spent two years and KWD 2 m on studies", which is irrelevant to whether the next KWD 300 m should be spent; (2) **political momentum** — a target date has been announced, so nobody wants to recycle; (3) **missing criteria** — if nobody wrote down in advance what "good enough" means, every gate passes. A good gate has *pre-agreed, written criteria* and a decision-maker who is allowed to say no.`,
        },
        {
          kind: "md",
          md: md`### Pre-feasibility vs feasibility

**Pre-feasibility** is a screening exercise. It uses desktop data (satellite irradiance such as Solargis or Global Solar Atlas, published cost benchmarks, Google Earth site screening, the transmission map) to discard options that are clearly bad and size the opportunity. Output: a short list of 2–4 options, an order-of-magnitude cost and energy figure, a list of fatal-flaw risks to investigate.

**Feasibility** is the real engineering. For a PV+BESS plant it must contain at least:

1. **Need and strategic fit** — load forecast, capacity gap, renewable target, role of storage (evening peak shifting).
2. **Resource assessment** — long-term irradiance (GHI, DNI, DHI) from satellite data **site-adapted** with ground measurements; temperature, wind (design and stow), dust and soiling assumptions; P50/P90 yield.
3. **Site assessment** — land status and ownership, topography, geotechnical desk study and preliminary investigation, hydrology/flash flood screening, access, existing infrastructure (pipelines, oilfield assets, OHLs), UXO risk.
4. **Technology options** — fixed tilt vs single-axis tracker, monofacial vs bifacial, central vs string inverters, DC/AC ratio, BESS power/energy, coupling (AC vs DC).
5. **Conceptual design** — layout, block size, SLD to point of interconnection, preliminary grid study (load flow, short circuit) or at least a grid capacity statement from the transmission owner.
6. **Energy yield model** — PVsyst or equivalent with loss tree; BESS dispatch model.
7. **Environmental and social screening** — EIA scoping, ecology, archaeology, water use (cleaning!).
8. **Cost estimate** — capex and opex with stated class and contingency.
9. **Procurement route options** — EPC by the ministry (public tender), IPP/PPP via KAPP, G2G.
10. **Financial/economic analysis** — LCOE, NPV, avoided-cost, sensitivity and break-even.
11. **Risk register** and **implementation schedule** to COD.
12. **Recommendation** with conditions.

A feasibility study that cannot answer "where exactly will this connect, at what voltage, and when will that substation be ready?" is not finished.`,
        },
        {
          kind: "md",
          md: md`### Comparing options: annualised cost

Options with different capex, opex and energy must be compared on a common basis. The cleanest is to convert capex into an equivalent annual payment with the **capital recovery factor**:`,
        },
        { kind: "equation", formula: "m07-crf" },
        {
          kind: "md",
          md: md`Then a simple levelised cost (constant annual energy, constant real opex) is:`,
        },
        { kind: "equation", formula: "m07-lcoe-simple" },
        {
          kind: "md",
          md: md`This is not a substitute for a full discounted cash-flow LCOE (degradation, replacement of inverters, BESS augmentation, tax), but it is exactly what you need at pre-feasibility and in a gate meeting to sanity-check a consultant's numbers in two minutes.

Not everything is money. Grid proximity, ground conditions, land conflicts and flood risk are scored with a **weighted multi-criteria analysis (MCA)**:`,
        },
        { kind: "equation", formula: "m07-mca-score" },
        {
          kind: "callout",
          tone: "pitfall",
          title: "MCA abuse",
          md: md`MCA is easy to rig: change weights until the favoured option wins. Defend against this by (a) fixing weights **before** scoring, (b) running a sensitivity on weights (does the ranking survive ±10 % weight shifts?), (c) never letting MCA override a **fatal flaw** — a site in a wadi flood path or on an active oilfield lease is excluded, not scored low.`,
        },
        {
          kind: "md",
          md: md`### The business case

Many governments use a **five-case model** (originating in the UK Treasury Green Book, adopted widely in PPP practice): **strategic** (why it is needed), **economic** (value to the country — avoided fuel, reliability, emissions), **commercial** (procurement route and risk allocation), **financial** (affordability, budget, tariff), **management** (who delivers, governance, schedule, risk). It maps neatly onto a MEWRE approval memo.

For Kuwait the economic case is dominated by **avoided cost**. Residential tariffs are a small fraction of the cost of supply, so revenue at retail tariffs is meaningless as a benefit. The benefit of a solar kWh is the liquid fuel or LNG it displaces, the summer imports it reduces, and the load-shedding it helps avoid.`,
        },
        {
          kind: "callout",
          tone: "kuwait",
          title: "What RESEARCH.md supports for a Kuwait business case",
          md: md`- Peak demand ~17.5–17.7 GW (2024–2026) against roughly 17 GW reliably available capacity; scheduled cuts in 2024 and 2025.
- Citizen residential tariff 2 fils/kWh, far below any estimate of cost of supply (estimates conflict; no current official figure).
- GCCIA summer imports: Audit Bureau conditional approval of about KWD 161 m for June–December 2025.
- Targets: 15 % renewables by 2030 (original); a 30/40/50 % path by 2030/2040/2050 cited by a MEWRE official.
- Typical PPP sequence for IPPs: entity request → KAPP feasibility → Higher Committee → RFQ → RFP → preferred bidder → Higher Committee → Audit Bureau → PPA signing → financial close.

Use these with their citations; re-check before an official submission.`,
        },
        { kind: "sources", refs: ["m07-kapp-ppp-law", "m07-ijglobal-kuwait-ppp", "m07-mees-power-crisis-2024", "m07-powerline-gccia-2025", "m07-theenergyyear-2025"] },
      ],
    },
    {
      layer: "applied",
      title: "Options analysis with Kuwait numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Fixed tilt vs single-axis tracker for 1,000 MWac",
          given: md`Plant 1,000 MWac / 1,300 MWp (DC/AC 1.3). Real WACC 6 %, life 30 years. Illustrative assumptions: fixed tilt capex USD 0.40/Wp + USD 60 m grid/common works; tracker capex USD 0.44/Wp + USD 60 m. Opex 6.5 vs 7.5 USD/kWp/yr. Specific yield 1,850 vs 2,250 kWh/kWp/yr (bifacial tracker in Kuwait gains ~20 %).`,
          steps: [
            { md: md`**CRF**: $\text{CRF} = \dfrac{0.06(1.06)^{30}}{(1.06)^{30}-1} = 0.07265$.` },
            { md: md`**Capex**: fixed $= 0.40 \times 1{,}300\text{ m} + 60\text{ m} = $ USD 580 m; tracker $= 0.44 \times 1{,}300\text{ m} + 60\text{ m} =$ USD 632 m.` },
            { md: md`**Annualised capex**: fixed $580 \times 0.07265 = 42.14$ m/yr; tracker $632 \times 0.07265 = 45.91$ m/yr.` },
            { md: md`**Opex**: fixed $6.5 \times 1{,}300{,}000 = 8.45$ m/yr; tracker $7.5 \times 1{,}300{,}000 = 9.75$ m/yr.` },
            { md: md`**Energy**: fixed $1{,}850 \times 1.3\ \text{GWp} = 2{,}405$ GWh/yr; tracker $2{,}250 \times 1.3 = 2{,}925$ GWh/yr.` },
            { md: md`**LCOE**: fixed $(42.14 + 8.45)/2{,}405\ \text{GWh} = 2.10$ US¢/kWh; tracker $(45.91 + 9.75)/2{,}925 = 1.90$ US¢/kWh.` },
            { md: md`**Incremental check**: the tracker adds $(45.91-42.14)+(9.75-8.45) = 5.08$ m/yr for 520 GWh/yr extra — the marginal energy costs about 0.98 US¢/kWh, cheaper than the base plant. That is why almost all recent Gulf utility PV uses trackers.` },
          ],
          result: md`Tracker LCOE ≈ 1.90 US¢/kWh vs fixed ≈ 2.10 US¢/kWh. The tracker wins **if** the soil allows reliable piling, the tracker stows safely in shamal winds, and O&M can keep dust out of the drive train — conditions the feasibility study must verify, not assume.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Site selection MCA",
          given: md`Three candidate sites, weights fixed in advance: grid proximity 0.30, ground conditions 0.20, land availability/conflicts 0.25, flood risk 0.15, access/logistics 0.10. Scores (1–5): Site A = 4, 3, 5, 4, 3; Site B = 5, 2, 3, 3, 5; Site C = 3, 5, 4, 2, 4.`,
          steps: [
            { md: md`Site B: $0.30(5) + 0.20(2) + 0.25(3) + 0.15(3) + 0.10(5) = 1.50 + 0.40 + 0.75 + 0.45 + 0.50 = 3.60$.` },
            { md: md`Site C: $0.90 + 1.00 + 1.00 + 0.30 + 0.40 = 3.60$.` },
            {
              md: md`Site A: $0.30(4) + 0.20(3) + 0.25(5) + 0.15(4) + 0.10(3) = 3.95$.`,
              hidden: true,
              check: { prompt: "Weighted score of Site A", answer: 3.95, tolerance: { abs: 0.01 } },
            },
            { md: md`Sensitivity: B and C tie. If flood risk weight rises (a wadi crosses C), C falls; if ground conditions dominate (B has gypsum/sabkha), B falls. Site A leads by 0.35 points — robust to modest weight changes.` },
          ],
          result: md`Site A ranks first (3.95). Before the gate, confirm A has no fatal flaw (oilfield lease, military zone, protected area) — MCA ranks only the sites that survived screening.`,
        },
        {
          kind: "question",
          question: {
            id: "m07-l01-p1",
            type: "numeric",
            prompt: md`For the tracker option (2,925 GWh/yr), the economic case values each MWh at its **avoided fuel cost**. Using an illustrative avoided fuel cost of USD 55/MWh, what is the annual economic benefit in USD million?`,
            answer: 160.9,
            unit: "USD m/yr",
            tolerance: { rel: 0.01 },
            explanation: md`$2{,}925\ \text{GWh} = 2{,}925{,}000\ \text{MWh}$; $2{,}925{,}000 \times 55 = 160.9$ m USD/yr. Compare with the annualised cost of about USD 55.7 m/yr: a benefit/cost ratio near 3. The real avoided cost depends on which fuel is displaced at the margin (crude/gasoil in summer vs gas) — the feasibility study must justify it, ideally with MEWRE fuel data.`,
            concepts: ["m07.business-case", "m07.options-analysis"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running gates at a ministry",
      blocks: [
        {
          kind: "md",
          md: md`### Who does what in development

| Role | Development-stage responsibility |
|---|---|
| **MEWRE (Employer / offtaker)** | Defines need and technical requirements, grid connection point and interface dates, owns the business case for EPC projects, approves gates |
| **KAPP** | For PPP/IPP: feasibility, transaction structuring, RFQ/RFP, evaluation; recommends to the Higher Committee |
| **Transaction / technical advisor** | Writes feasibility, yield and grid studies, drafts tender documents; often an international engineering consultancy |
| **Owner's Engineer (OE)** | Independent technical reviewer for the employer; on IPPs, the employer's technical eyes on the developer's design |
| **KISR** | Resource data (five inland measurement stations), technical know-how from Shagaya Phase I |
| **Ministry of Finance / Audit Bureau** | Budget and prior review of contracts |

### What goes wrong at the feasibility stage

- **Resource optimism**: satellite GHI used without ground site adaptation; soiling assumed at 2 % when monthly cleaning in Kuwait sees much higher losses between cleanings.
- **Grid as an afterthought**: the plant is studied in detail, but the 400 kV connection depends on a separately procured line and substation that has its own timeline.
- **No water strategy**: water cleaning assumed with no source, cost or permit.
- **Single-point cost**: one capex number with no class or range, later treated as a budget.
- **Land assumed available**: competing claims (oilfield operations, military, grazing, other ministries) found after tender.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "The grid interface trap",
          md: md`RESEARCH.md shows the Shagaya Zone 1 IPP scope includes a 400 kV substation, while the Shagaya–Wafra 400 kV line was procured separately by MEWRE (awarded March 2026). That is a classic interface: if the line is late, the IPP may be complete but unable to export, and under most PPAs the offtaker pays deemed energy. A feasibility study and gate review must check **both** schedules together.`,
        },
        { kind: "sources", refs: ["m07-agbi-zone1-rfp", "m07-megaproject-400kv"] },
        {
          kind: "checklist",
          title: "PM gate-review checklist (G2 feasibility)",
          items: [
            "Need statement quantified (MW, MWh, which hours) and linked to an approved target or plan",
            "Resource data: source, period, site adaptation method, P50 and P90 stated",
            "Soiling and cleaning assumptions justified with Kuwait data, water source identified",
            "Grid: connection point, voltage, capacity, and the delivery date of the grid works confirmed in writing",
            "Site: land status letter, fatal-flaw screening (oil and gas assets, military, flood, UXO), preliminary geotech",
            "Cost estimate class stated, contingency explicit, benchmark comparison included",
            "Options compared on annualised cost and MCA, weights fixed before scoring, sensitivity shown",
            "Procurement route recommended with rationale (EPC vs IPP vs G2G)",
            "Risk register with owners; top 10 risks have mitigation",
            "Schedule to COD includes approval durations (Higher Committee, Audit Bureau) with float",
            "Gate decision recorded with conditions, owners and due dates",
          ],
        },
        {
          kind: "ask",
          title: "Ask the feasibility consultant",
          items: [
            "Which irradiance dataset did you use, how was it site-adapted, and what is the P90/P50 ratio?",
            "What soiling loss and cleaning frequency did you assume, and where does the cleaning water come from?",
            "What happens to the ranking of options if capex is +15 % or yield is −5 %?",
            "Who confirmed grid capacity at the connection point, and on what date will that substation be energised?",
            "What fatal flaws did you screen for, and which ones are still open?",
            "What estimate class is this capex, and what is in the contingency?",
          ],
        },
        { kind: "scenario", scenario: "m07-s1" },
        {
          kind: "feynman",
          prompt:
            "Explain to a newly appointed Assistant Undersecretary, in under two minutes, why the ministry should spend money on a feasibility study and a gate review instead of tendering the 1 GW plant immediately.",
          keyPoints: [
            "Cost of change is lowest early; influence is highest early",
            "Feasibility buys information that reduces risk on a much larger spend (studies ~1–3 % of capex)",
            "Gate = explicit go / recycle / stop decision with written criteria",
            "Fatal flaws (grid, land, flood) found before tender avoid claims and deemed energy later",
            "Economic case is avoided fuel and reliability, not retail tariff revenue",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m07-l01-q1",
      type: "mcq",
      prompt: "Which question does the feasibility (G2) gate primarily answer?",
      options: [
        "Is there a mandate for any project at all?",
        "Which option, at which site, procured how, at roughly what cost?",
        "Has the contractor met the performance guarantees?",
        "Can the retention money be released?",
      ],
      answer: 1,
      explanation: md`G2 is option selection: technology, size, site, procurement route and a ±15–25 % cost. Need/mandate is G0; performance guarantees are tested at COD; retention release is close-out.`,
      concepts: ["m07.stage-gate", "m07.gate-review"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m07-l01-q2",
      type: "numeric",
      prompt: md`A BESS option costs USD 300 m with real WACC 7 % over 20 years. What is its annualised capex (USD m/yr)? Use $\text{CRF} = r(1+r)^n/((1+r)^n-1)$.`,
      answer: 28.32,
      unit: "USD m/yr",
      tolerance: { rel: 0.01 },
      explanation: md`$(1.07)^{20} = 3.8697$. CRF $= 0.07 \times 3.8697 / 2.8697 = 0.09439$. Annualised capex $= 300 \times 0.09439 = 28.3$ m/yr. Note the shorter life and higher WACC push CRF well above the 0.0727 of a 30-year PV plant at 6 %.`,
      concepts: ["m07.options-analysis"],
      difficulty: 2,
    },
    {
      id: "m07-l01-q3",
      type: "multi",
      prompt: "Which items must a bankable PV+BESS feasibility study contain? Select all that apply.",
      options: [
        "Site-adapted long-term irradiance with P50/P90",
        "A grid connection statement with point, voltage and date",
        "The final protection relay settings",
        "Cost estimate with stated class and contingency",
        "Water source for module cleaning",
        "As-built drawings",
      ],
      answer: [0, 1, 3, 4],
      explanation: md`Relay settings are produced in detailed design and finalised at commissioning; as-builts come at handover. Everything else is feasibility content. The water item is often forgotten in Kuwait, where water cleaning has a real cost and supply constraint.`,
      concepts: ["m07.feasibility-study"],
      difficulty: 1,
    },
    {
      id: "m07-l01-q4",
      type: "decision",
      prompt: md`You chair the G2 gate. The consultant's study is strong, but the transmission department has not confirmed the 400 kV substation date; it says "probably 2028". COD target is 2028. What do you decide?`,
      options: [
        { text: "Go — the study is good and the target date is announced", score: 0.1, feedback: "This is exactly the momentum failure gates exist to prevent. An unconfirmed grid date is a top risk for deemed energy." },
        { text: "Go with conditions: written grid date and interface schedule from transmission before tender documents are issued; add grid delay to the risk register with an owner", score: 1, feedback: "Right: the study can proceed to tender preparation, but the tender cannot be released without a confirmed interface. Conditions have owners and dates." },
        { text: "Stop the project", score: 0.2, feedback: "Too drastic — the need and option are valid; the gap is closable." },
        { text: "Recycle the entire feasibility study", score: 0.4, feedback: "Overreaction: only the grid interface is open. Recycling the whole study wastes months." },
      ],
      explanation: md`Use "go with conditions" when the gap is specific and closable, and attach owners and deadlines. An open grid interface is a condition precedent to tender release, not something to fix after award.`,
      concepts: ["m07.gate-review"],
      difficulty: 2,
    },
    {
      id: "m07-l01-q5",
      type: "order",
      prompt: "Order the gates of a typical PV IPP lifecycle.",
      items: [
        "Need / mandate",
        "Pre-feasibility",
        "Feasibility & option selection",
        "Investment / procurement decision",
        "Award & financial close",
        "Construction readiness (NTP)",
        "COD / taking over",
      ],
      explanation: md`Each gate narrows uncertainty: need → screening → selection → commit to tender → commit to contract → start works → accept plant.`,
      concepts: ["m07.stage-gate"],
      difficulty: 1,
    },
    {
      id: "m07-l01-q6",
      type: "short",
      prompt: "Why is retail tariff revenue the wrong benefit measure for a MEWRE solar business case, and what should be used instead?",
      rubric: [
        "Retail tariffs are heavily subsidised (e.g. 2 fils/kWh) and far below cost of supply",
        "The economic benefit is avoided fuel (crude, gasoil, LNG) and avoided imports",
        "Reliability value: reduced load-shedding risk at peak",
        "Possibly emissions / target compliance",
      ],
      modelAnswer:
        "Retail tariffs (2 fils/kWh for citizens) are a policy price far below the cost of supply, so revenue at those tariffs grossly understates value. The economic case should value each MWh at the avoided marginal fuel cost (liquids or LNG displaced), avoided summer imports, and the reliability value of capacity at peak, plus contribution to renewable targets.",
      explanation: md`Economic appraisal values resources at their opportunity cost to the country. In Kuwait, the opportunity cost of burning crude or gasoil in summer is its export or import-parity value, which is far above the subsidised retail tariff. Reliability value matters because peak demand has exceeded reliably available capacity.`,
      concepts: ["m07.business-case"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m07-l01-f1", front: "What three decisions can a gate make (besides 'go with conditions')?", back: "Go, recycle/hold, stop.", concepts: ["m07.stage-gate"] },
    { id: "m07-l01-f2", front: "Capital recovery factor formula", back: md`$\text{CRF} = \dfrac{r(1+r)^n}{(1+r)^n - 1}$`, concepts: ["m07.options-analysis"] },
    { id: "m07-l01-f3", front: "CRF at 6 % over 30 years", back: "≈ 0.0727 (annual payment per unit of capex).", concepts: ["m07.options-analysis"] },
    { id: "m07-l01-f4", front: "Typical accuracy of a feasibility-stage (Class 4) estimate", back: "Roughly −30 % / +50 %.", concepts: ["m07.feasibility-study"] },
    { id: "m07-l01-f5", front: "Five cases of a business case", back: "Strategic, economic, commercial, financial, management.", concepts: ["m07.business-case"] },
    { id: "m07-l01-f6", front: "Golden rule for MCA weights", back: "Fix weights before scoring; test sensitivity; never let MCA override a fatal flaw.", concepts: ["m07.options-analysis"] },
    { id: "m07-l01-f7", front: "Main economic benefit of a Kuwait solar MWh", back: "Avoided fuel (liquids/LNG) and imports, plus reliability at peak — not retail tariff revenue.", concepts: ["m07.business-case"] },
    { id: "m07-l01-f8", front: "Development spend as share of capex", back: "Typically ~1–3 % across all development stages.", concepts: ["m07.stage-gate"] },
  ],
  scenarios: [
    {
      id: "m07-s1",
      title: "The gate that everyone wants to pass",
      dayInLife: true,
      context: md`You are the MEWRE PM for a proposed 1 GW PV + 250 MW / 1,000 MWh BESS project. The minister's office has publicly mentioned a 2029 COD. The feasibility consultant presents at the G2 gate tomorrow. You have just read the final report.`,
      start: "a",
      concepts: ["m07.gate-review", "m07.feasibility-study"],
      nodes: {
        a: {
          md: md`Reading the report you find: (1) yield uses satellite GHI with no ground adaptation; (2) soiling 2 % with "periodic cleaning"; (3) grid connection "to be confirmed by MEWRE Transmission"; (4) capex single figure, no class. The consultant's lead calls: "Can we present as final? The Undersecretary wants it done."`,
          choices: [
            { text: "Agree — the issues can be fixed in the tender phase", next: "b", score: 1, feedback: "Every one of these gaps becomes a tender ambiguity or a claim later." },
            { text: "Ask for a 2-page gap note to present alongside the report, and propose 'go with conditions' with dated actions", next: "c", score: 9, feedback: "You keep momentum while being honest about gaps. Decision-makers prefer a clear conditional path to a surprise later." },
            { text: "Cancel tomorrow's gate", next: "d", score: 4, feedback: "Postponing loses credibility and time; the gaps are closable with conditions." },
          ],
        },
        b: {
          md: md`The gate passes. Six months later, bidders' clarification questions flood in about the grid point and soiling, and the RFP deadline is extended twice. The Undersecretary asks why.`,
          choices: [
            { text: "Blame the consultant", score: 1, feedback: "The PM owns the gate. Lesson: unresolved feasibility gaps reappear as tender delays." },
            { text: "Own it, issue an addendum with confirmed grid data, and add a gap-check step to future gates", score: 5, feedback: "Recovery is right, but the delay was avoidable." },
          ],
        },
        c: {
          md: md`At the gate the Undersecretary asks: "Do these conditions delay the 2029 COD?" The consultant estimates 8 weeks to close them, overlapping with tender drafting.`,
          choices: [
            { text: "Explain that conditions run in parallel with tender drafting, so COD is not affected, and that closing them reduces bid prices and clarifications", next: "e", score: 10, feedback: "You frame rigour as schedule protection — the language decision-makers respond to." },
            { text: "Say COD may slip but quality matters more", next: "e", score: 5, feedback: "True but poorly framed; you lost an opportunity to show conditions protect the date." },
          ],
        },
        d: {
          md: md`The Undersecretary's office is unhappy. You must reschedule within the week.`,
          choices: [
            { text: "Reschedule with the gap note and conditional recommendation", score: 5, feedback: "You reach the right place, at a cost in trust." },
          ],
        },
        e: {
          md: md`Decision recorded: Go with conditions — (1) ground-adapted resource using KISR station data, (2) soiling/cleaning study with water source, (3) written grid date from Transmission, (4) Class 4 estimate with contingency. Owners and dates minuted.`,
          choices: [
            { text: "Track the four conditions weekly and report closure before tender release", score: 10, feedback: "Excellent — conditions without follow-up are just words." },
          ],
        },
      },
    },
  ],
};

export default lesson;
