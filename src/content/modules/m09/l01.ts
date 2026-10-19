import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m09-l01",
  title: "Contracting strategies and the FIDIC suites",
  summary:
    "EPC turnkey, multi-contract, EPCM, DBO and IPP/BOO/BOT; the FIDIC Red, Yellow, Silver, Gold and Emerald books; who designs, who carries which risk, the Engineer versus the Employer's Representative, and why IPP EPCs are Silver-like and back-to-back with the PPA.",
  minutes: 75,
  objectives: [
    "You can choose a contracting strategy (EPC, multi-contract, EPCM, DBO, IPP) for a given MEWRE project and defend the choice in terms of risk, control, price and schedule certainty.",
    "You can state for each 2017 FIDIC book (Red, Yellow, Silver) who designs, how price is fixed and who administers the contract.",
    "You can explain the difference between a FIDIC Engineer and an Employer's Representative and what that means for MEWRE's staff.",
    "You can explain why lenders push IPP EPC contracts towards Silver-book risk allocation with obligations back-to-back to the PPA.",
    "You can quantify why moving a risk to the party that cannot control it raises the price.",
  ],
  concepts: [
    {
      id: "m09.contracting-strategy",
      name: "Contracting strategy",
      description:
        "How the work is split into contracts and who carries design, interface and financing risk: EPC turnkey, multi-contract/split packages, EPCM, DBO, and IPP models (BOO/BOT).",
      competency: "contracts",
    },
    {
      id: "m09.fidic-suite",
      name: "FIDIC rainbow suite",
      description:
        "Standard international forms: Red (Construction, Employer designs), Yellow (Plant & Design-Build), Silver (EPC/Turnkey), Gold (DBO), Emerald (underground works), plus White (consultancy) and Green (short form).",
      competency: "contracts",
      related: ["m09.contracting-strategy", "m09.risk-allocation"],
    },
    {
      id: "m09.risk-allocation",
      name: "Risk allocation principle",
      description:
        "Allocate each risk to the party best able to control it, or best able to bear it at least cost; moving uncontrollable risk to a contractor buys certainty at a premium.",
      competency: "contracts",
      related: ["m09.fidic-suite"],
    },
    {
      id: "m09.engineer-vs-er",
      name: "Engineer vs Employer's Representative",
      description:
        "Under Red and Yellow, the Engineer administers the contract and must make neutral determinations; under Silver, the Employer's Representative acts for the Employer with no duty of neutrality (but determinations must still be fair).",
      competency: "contracts",
      related: ["m09.fidic-suite"],
    },
    {
      id: "m09.back-to-back",
      name: "Back-to-back obligations",
      description:
        "Flowing down the SPV's obligations and exposures under the PPA (dates, LDs, performance, change in law) into the EPC and O&M contracts so that the SPV is a pass-through and lenders see no gap.",
      competency: "contracts",
      related: ["m09.risk-allocation", "m09.contracting-strategy"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Contracting strategies: how to split the work",
      blocks: [
        {
          kind: "md",
          md: md`A **contracting strategy** answers three questions before any contract is drafted:

1. **Who designs?** The Employer (through a consultant) or the contractor.
2. **How many contracts, and who manages the interfaces between them?**
3. **Who finances, and who owns the asset over its life?**

Each answer moves risk. In a utility-scale PV or BESS project the main risks are design adequacy, ground conditions, equipment performance, interfaces (PV plant to substation to grid), schedule, price escalation, change in law and grid availability. The strategy decides where each one lands.

| Strategy | Design by | Contracts | Interface risk | Price certainty | Employer control | Typical use |
|---|---|---|---|---|---|---|
| **EPC turnkey** (single point) | Contractor | 1 | Contractor | High (lump sum) | Low | Lender-financed IPPs; MEWRE-owned plants where in-house design capacity is thin |
| **Multi-contract / split packages** | Employer + package contractors | 3–10 (e.g. civil, PV supply, trackers, inverters, BOP electrical, substation) | **Employer** | Medium | High | Utilities with strong owner's engineering; cheapest on paper |
| **EPCM** | EPCM consultant designs and manages; Employer contracts trades | Many + 1 EPCM | Mostly Employer (EPCM liable only for negligence, usually capped at fee) | Low | High | Mining/process; rare for PV |
| **DBO** (design-build-operate) | Contractor | 1 (build + long operation period) | Contractor, including design-for-O&M | High | Medium | Public owner wants whole-life responsibility without project finance |
| **IPP: BOO / BOT** | Developer (via its EPC) | PPA + Implementation/land agreements; SPV then signs EPC, O&M, financing | SPV (passed to EPC/O&M) | Tariff fixed for 25–30 years | Lowest (output-based specification) | Kuwait solar IPPs (Shagaya Phase III) |

**BOO** (build-own-operate): the private company keeps the asset at the end. **BOT** (build-operate-transfer): the asset transfers to the public party at the end of the term. **BOOT** adds explicit ownership during the term. In all IPP variants the public body buys an **output** (MWh, available MW) rather than a plant.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why single-point responsibility costs more and is still chosen",
          md: md`In a split-package strategy, when the inverters trip because of a harmonic interaction with the tracker motor drives, each contractor blames the other and the Employer pays for the investigation and the delay. An EPC contractor cannot blame anyone, so it prices that risk (typically several percent on top of the sum of the packages). Lenders accept a higher capex in exchange for that certainty because their debt is repaid only from energy revenue: an unfinished plant earns nothing. A government owner with a strong owner's engineer may rationally choose split packages; a non-recourse lender almost never will.`,
        },
        {
          kind: "md",
          md: md`### The FIDIC rainbow (2017 second editions)

FIDIC (the International Federation of Consulting Engineers) publishes the forms used on most Gulf infrastructure. The 2017 second editions of the three main books were reprinted with amendments in 2022. Each book has General Conditions (GC), Particular Conditions Part A (Contract Data) and Part B (Special Provisions, where the Employer amends the GC).

| Book | Full name | Who designs | Price basis | Administered by | Ground risk (Sub-Clause 4.12) |
|---|---|---|---|---|---|
| **Red** | Conditions of Contract for Construction | **Employer** (Contractor may design minor parts) | Measured: Bill of Quantities x rates, remeasured | **Engineer** | **Employer**: unforeseeable physical conditions give time and cost |
| **Yellow** | Conditions of Contract for Plant and Design-Build | **Contractor**, to the Employer's Requirements | Lump sum, with payment schedule | **Engineer** | **Employer**: unforeseeable physical conditions give time and cost |
| **Silver** | Conditions of Contract for EPC/Turnkey Projects | **Contractor**, fully responsible, including for most of the Employer's Requirements data | Lump sum, fixed | **Employer's Representative** (Employer administers) | **Contractor**: "Unforeseeable Difficulties" are at the Contractor's risk; price not adjusted |
| **Gold** | Design, Build and Operate | Contractor | Lump sum + operation service payments | Employer's Representative | Contractor-leaning |
| **Emerald** | Underground Works (2019, with ITA-AITES) | Contractor | Lump sum with a Geotechnical Baseline Report sharing ground risk | Engineer | Shared via the baseline |

Others you will meet: the **White Book** (client–consultant services, used for the Owner's Engineer appointment), the **Green Book** (short form for small works), and the **Pink Book** (the multilateral-development-bank harmonised edition of Red, relevant only if a development bank finances the works).`,
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Read Silver's own warning",
          md: md`FIDIC's guidance says the Silver Book is **not** suitable where (a) bidders have too little time or information to scrutinise the Employer's Requirements and carry out risk assessment, (b) construction involves substantial underground or other work the bidders cannot inspect, (c) the Employer intends to supervise closely or review most construction drawings, or (d) interim payments are to be measured by an official. MEWRE's habit of reviewing every drawing on a Silver contract quietly turns it into a hybrid and invites claims.`,
        },
        {
          kind: "md",
          md: md`### Who does what under FIDIC

The four parties you must keep straight are the **Employer** (the owner who pays), the **Contractor**, the **Engineer** (or Employer's Representative on Silver), and the **DAAB** (Dispute Avoidance/Adjudication Board). Subcontractors have no contract with the Employer.`,
        },
        {
          kind: "diagram",
          diagram: "fidic-parties",
          caption:
            "Contractual relationships under a FIDIC 2017 contract. The Engineer is appointed and paid by the Employer but has a duty of neutrality when agreeing or determining matters under Sub-Clause 3.7; the DAAB is appointed jointly.",
        },
        {
          kind: "md",
          md: md`**The Engineer (Red and Yellow, Clause 3).** A professional firm (often the Owner's Engineer) named in the contract. It issues instructions, certifies payment, reviews programmes, receives notices, issues the Taking-Over Certificate and, crucially, **agrees or determines** claims under **Sub-Clause 3.7**. When doing so it "shall not be deemed to act for the Employer" and must act neutrally. Its determination binds both parties unless one gives a Notice of Dissatisfaction within 28 days, after which the dispute goes to the DAAB.

**The Employer's Representative (Silver, Clause 3 "The Employer's Administration").** Appointed by the Employer and acts on its behalf. Silver still requires a fair determination procedure (Sub-Clause 3.5 in the 2017 Silver Book), but the person deciding is on the Employer's side of the table. Contractors price that.

**What this means for you at MEWRE.** On a MEWRE-procured Red or Yellow contract (for example a substation or a BESS built for MEWRE's own account), MEWRE staff are the Employer and should not make the Engineer's determinations themselves: doing so compromises neutrality and hands the contractor a procedural argument. On an IPP, MEWRE is neither Employer nor Engineer under the EPC: the SPV is the Employer and appoints its own representative; MEWRE's leverage is through the **PPA** and the **grid connection** obligations.`,
        },
        {
          kind: "md",
          md: md`### The risk-allocation principle

A risk should sit with the party that can **control** it; if nobody controls it, with the party that can **bear** it at least cost (diversify it, insure it, or absorb it on a strong balance sheet). Moving a risk to a party that can do neither does not remove it; it converts it into a **risk premium** in the price, plus a dispute when the event occurs. Define the expected cost of a risk:`,
        },
        { kind: "equation", formula: "m09-risk-expected-value" },
        {
          kind: "md",
          md: md`and the price a contractor adds if it must carry it:`,
        },
        { kind: "equation", formula: "m09-risk-premium" },
        {
          kind: "md",
          md: md`The loading factor $k$ is above 1 because the contractor cannot diversify across many projects as cheaply as a sovereign or an insurer, often lacks the information (site data, grid plans), and must protect itself against the tail, not the mean. Typical $k$ ranges from about 1.5 for a well-understood risk with good data to 3 or more for a risk the contractor cannot control at all (grid availability, change in law). If the Employer keeps the risk it pays, on average, only $EV$ plus the cost of administering claims.`,
        },
        { kind: "widget", widget: "risk-allocation", caption: "Click a cell to see how each FIDIC book and a typical IPP EPC allocate the risk, and the clause behind it." },
        {
          kind: "md",
          md: md`### Why IPP EPC contracts look like Silver

In a project-financed IPP the chain is: **MEWRE (offtaker) ↔ SPV (project company) ↔ EPC Contractor / O&M Contractor**, with lenders lending to the SPV against its revenue. The SPV is a thin company with no other assets. Every exposure it has under the PPA must therefore be either:

- **passed through** to the EPC contractor or O&M contractor on matching terms (**back-to-back**), or
- **retained** and covered by equity, contingency or insurance, which lenders will size conservatively.

Hence a typical IPP EPC is a lump-sum, date-certain, single-point turnkey contract, usually drafted on a Silver base (or a developer's own form) with:

| PPA exposure of the SPV | Matching EPC provision |
|---|---|
| Scheduled COD; PPA delay penalties; risk of PPA termination for long-stop delay | Time for Completion earlier than PPA scheduled COD (a **float buffer**, often 1–3 months); delay LDs sized to cover PPA penalties + debt interest + lost revenue |
| Contracted capacity and energy/PR expectations underpinning the tariff | Performance guarantees (capacity at the point of interconnection, PR, auxiliary consumption) with performance LDs (buy-down) |
| Grid code compliance tests by MEWRE | EPC tests include grid code compliance; Contractor carries failure |
| Change in law relief under the PPA (often limited to discriminatory or specific changes) | EPC change-in-law relief **no wider** than the SPV obtains from MEWRE |
| Force majeure relief under the PPA | EPC exceptional-event relief aligned in definition and notice periods |

The weak points are where the chain cannot be closed: an EPC contractor will not accept a risk that the SPV has itself received relief for (it will argue the SPV should pass the relief down), and it will not accept unlimited LDs. These gaps, called **"leakage"**, are what lenders' advisors hunt for in due diligence.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "The notice-period mismatch",
          md: md`If the PPA requires the SPV to notify MEWRE of a force majeure event within 7 days, and the EPC gives the contractor 14 days (the FIDIC 2017 Clause 18 period) to notify the SPV, the SPV can be time-barred under the PPA before it even knows. Back-to-back means **shorter** periods downstream, not identical ones.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Pricing risk allocation in numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Ground risk at piling: Red/Yellow versus Silver",
          given: md`A 500 MWac single-axis tracker PV plant needs about 180,000 driven piles. The geotechnical survey covers 0.5% of pile locations. The geotechnical consultant estimates a **15%** probability that a hard calcrete (gatch) layer requires **pre-drilling on 40%** of piles at an extra **USD 60** per pile. The contractor's loading factor for a risk it cannot fully investigate at tender is $k = 2.5$. Administering a ground claim costs the Employer about USD 0.1 m (Engineer time, expert, records).`,
          steps: [
            {
              md: md`**Impact if the risk occurs:** $I = 0.40 \times 180{,}000 \times 60 = 4{,}320{,}000$ USD = USD 4.32 m.`,
            },
            {
              md: md`**Expected value:** $EV = p \cdot I = 0.15 \times 4.32 = 0.648$ USD m.`,
            },
            {
              md: md`**Silver (Contractor carries it):** the contractor adds $RP = k \cdot EV = 2.5 \times 0.648 = 1.62$ USD m to its lump sum, paid whether or not the calcrete appears.`,
            },
            {
              md: md`**Red/Yellow (Employer carries it under 4.12 if Unforeseeable):** expected cost to the Employer is $EV + \text{admin} = 0.648 + 0.10 = 0.748$ USD m, but with a 15% chance of a USD 4.42 m outturn hit.`,
            },
            {
              md: md`**Comparison:** keeping the risk saves $1.62 - 0.748 = 0.872$ USD m in expectation. Spending, say, USD 0.3 m on a denser geotechnical campaign that cuts $p$ to 5% would cut the contractor's premium to $2.5 \times 0.05 \times 4.32 = 0.54$ USD m: information is the cheapest risk mitigation.`,
            },
          ],
          result: md`A government owner with a balance sheet and many projects is the cheaper bearer of ground risk (saves about USD 0.87 m here). A lender-financed IPP pays the premium because the SPV cannot absorb a USD 4.4 m surprise without breaching its financing covenants. Either way, a better geotechnical campaign pays for itself.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Grid connection delay: why nobody wants it in the EPC",
          given: md`For a PV IPP, the 400 kV connection is built by MEWRE (a separate contract). The developer estimates a **30%** chance the connection is **60 days** late. Each day of delay costs the project about **USD 110,000** (lost revenue plus interest during construction). An EPC contractor asked to carry this risk, which it cannot influence at all, would load it at $k = 3$.`,
          steps: [
            { md: md`Impact if it occurs: $I = 60 \times 110{,}000 = 6.6$ USD m.` },
            {
              md: md`Expected value $EV = p \cdot I = 0.30 \times 6.6 = 1.98$ USD m.`,
              hidden: true,
              check: { prompt: "Expected value of the grid-delay risk", answer: 1.98, unit: "USD m", tolerance: { rel: 0.01 } },
            },
            {
              md: md`Contractor's premium $RP = k \cdot EV = 3 \times 1.98 = 5.94$ USD m.`,
              hidden: true,
              check: { prompt: "Risk premium the EPC contractor would add", answer: 5.94, unit: "USD m", tolerance: { rel: 0.01 } },
            },
            {
              md: md`The party that controls the risk is MEWRE (it builds the line). Under a well-drafted PPA, a late grid connection gives the SPV **deemed commissioning / deemed energy** or an extension of the scheduled COD; the EPC contract then gives the contractor time (and usually cost) for late backfeed, as an Employer risk.`,
            },
          ],
          result: md`Putting grid risk on the EPC contractor would cost about USD 5.94 m in price for a USD 1.98 m expected loss: a USD 3.96 m transfer for nothing. It sits with MEWRE under the PPA because MEWRE controls it, which is why the MEWRE PM must protect the grid interface dates.`,
        },
        {
          kind: "question",
          question: {
            id: "m09-l01-p1",
            type: "numeric",
            prompt: md`An Employer considers making the EPC contractor responsible for delays caused by late customs clearance of Employer-procured transformers. There is a **20%** chance of a **45-day** delay to completion, and each day of delay costs **USD 160,000**. What is the expected value of this risk, in USD m?`,
            answer: 1.44,
            unit: "USD m",
            tolerance: { rel: 0.01 },
            explanation: md`$EV = p \cdot I = 0.20 \times (45 \times 160{,}000) = 0.20 \times 7.2 = 1.44$ USD m. Because the Employer procures the transformers, the Employer controls the customs process; a contractor would load this at $k \geq 2$, so the Employer would pay at least USD 2.9 m for a USD 1.44 m expected risk. Keep Employer-supplied items at Employer risk and manage them.`,
            concepts: ["m09.risk-allocation"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Choosing and living with the strategy at MEWRE",
      blocks: [
        {
          kind: "md",
          md: md`### Two very different jobs

**1. MEWRE as Employer (conventional procurement).** Grid works (for example the Shagaya–Wafra 400 kV overhead line), substations, MEWRE-owned plants and possibly BESS are procured by MEWRE through public tenders. Here MEWRE chooses the contract form. Check which conditions your project actually uses (FIDIC-based or ministry-specific) before quoting FIDIC sub-clauses to a contractor.

**2. MEWRE as offtaker (IPP).** For Shagaya Phase III Zone 1 (1,100 MW) and Zone 2 (500 MW), KAPP runs the procurement and MEWRE signs a **30-year PPA** as offtaker. The EPC and O&M contracts belong to the SPV. MEWRE reviews them only indirectly (through the RFP's minimum requirements, the Owner's/Independent Engineer's reports, and the PPA's technical schedules).`,
        },
        {
          kind: "callout",
          tone: "kuwait",
          title: "Kuwait context (sourced)",
          md: md`MEWRE is the offtaker for solar IPPs under a 30-year PPA, while KAPP (established under PPP Law No. 116 of 2014) runs IPP procurement. MEWRE also procures grid works directly through conventional public tenders, for example the Shagaya–Wafra 400 kV line awarded in March 2026 for KD 48.6 m. The Shagaya Phase I contracts (2015) included 6-year design-build-operate periods, a DBO-style strategy.`,
        },
        { kind: "sources", refs: ["m09-pvmag-2025-zone1-prequal", "m09-kapp-ppp-law-116-2014", "m09-megaproject-2026-400kv"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "Check before relying on it",
          md: md`Which standard conditions MEWRE currently uses for its own EPC and grid contracts (FIDIC-based or ministry-specific), and whether the KAPP solar IPP RFPs prescribe a form for the SPV's EPC contract, are not established in our research. Ask the contracts department for the template and its Particular Conditions.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- **Silver in name, Red in behaviour:** the Employer reviews and "approves" every drawing, then the contractor argues the Employer assumed design responsibility.
- **Split packages without an integrator:** the Employer discovers at energisation that nobody owns the protection coordination study across the PV plant, the substation and MEWRE's grid.
- **Employer's Requirements that prescribe both outputs and solutions** ("guarantee 82% PR" and "use string inverters of make X"): the contractor gets an argument that a shortfall is caused by the Employer's prescription.
- **Engineer captured by the Employer:** determinations dictated by the ministry are overturned by the DAAB, with costs and lost credibility.
- **Back-to-back gaps** between PPA and EPC that nobody maps until a claim arrives.`,
        },
        {
          kind: "checklist",
          title: "PM checklist: before you sign off a contracting strategy",
          items: [
            "Who carries design responsibility, and is it consistent with how much the Employer intends to review?",
            "List every interface (PV plant/substation/grid/SCADA/telecoms) and name the party that owns each one.",
            "Is the geotechnical and topographic data good enough for bidders to price ground risk without a large premium?",
            "For each top-10 risk, who controls it, and does the draft contract put it there?",
            "Is there a neutral Engineer (Red/Yellow) or an Employer's Representative (Silver)? Have staff been told what they may not do?",
            "For IPPs: map PPA obligations against EPC and O&M obligations line by line (dates, LDs, tests, notices, change in law, force majeure).",
            "Are notice periods shorter downstream than upstream?",
            "Is a DAAB to be constituted at the start (FIDIC 2017 default) and budgeted?",
          ],
        },
        {
          kind: "ask",
          title: "Ask the contractor (or developer)",
          items: [
            "Which risks in our draft contract have you priced as contingency, and roughly how much for each?",
            "Which of our Employer's Requirements do you consider prescriptive rather than performance-based, and why does that matter to your guarantees?",
            "How is your EPC Time for Completion buffered against the PPA scheduled COD?",
            "Which PPA obligations are not passed down to your EPC or O&M contractor, and how is the gap covered?",
            "Who on your side owns the grid-code compliance study and the protection coordination with MEWRE?",
          ],
        },
        { kind: "scenario", scenario: "m09-s1" },
        {
          kind: "feynman",
          prompt:
            "Explain to a MEWRE undersecretary, in under two minutes, why the ministry should not insist on reviewing every construction drawing on a Silver (EPC/Turnkey) contract.",
          keyPoints: [
            "Silver puts design responsibility and most design risk on the contractor in exchange for a fixed lump sum.",
            "Detailed Employer review blurs responsibility: the contractor can claim the Employer adopted or changed the design.",
            "FIDIC itself says Silver is unsuitable where the Employer wants to supervise closely or review most drawings.",
            "Use performance requirements, hold points at key tests and an Owner's Engineer audit instead.",
            "If MEWRE wants control, choose Yellow or Red and accept the risk that comes with it.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m09-l01-q1",
      type: "mcq",
      prompt: md`Under the FIDIC 2017 **Silver** Book, who bears the risk of physical ground conditions that an experienced contractor could not have foreseen at tender?`,
      options: [
        "The Employer, with extension of time and Cost under Sub-Clause 4.12",
        "The Contractor: the price is not adjusted for unforeseeable difficulties",
        "Shared 50/50 by default",
        "The Engineer, who must determine a fair split",
      ],
      answer: 1,
      explanation: md`Silver's Sub-Clause 4.12 is titled **Unforeseeable Difficulties** and places them on the Contractor: it is deemed to have obtained all necessary information and the Contract Price is not adjusted. Red and Yellow 4.12 (**Unforeseeable Physical Conditions**) give time and Cost. Silver also has no Engineer.`,
      concepts: ["m09.fidic-suite", "m09.risk-allocation"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m09-l01-q2",
      type: "multi",
      prompt: md`Which statements about the FIDIC Engineer under the 2017 Red and Yellow Books are correct? Select all that apply.`,
      options: [
        "The Engineer is appointed and paid by the Employer.",
        "When agreeing or determining under Sub-Clause 3.7 the Engineer shall not be deemed to act for the Employer.",
        "A determination binds the parties unless a Notice of Dissatisfaction is given within 28 days.",
        "The Engineer is a party to the Contract and can be sued under it by the Contractor.",
        "The Silver Book uses the same Engineer role.",
      ],
      answer: [0, 1, 2],
      explanation: md`The Engineer is the Employer's appointee but must act neutrally under 3.7; a determination becomes final and binding if no NOD is given within 28 days. The Engineer is not a party to the construction contract, and Silver replaces the Engineer with the Employer's Representative.`,
      concepts: ["m09.engineer-vs-er"],
      difficulty: 2,
    },
    {
      id: "m09-l01-q3",
      type: "mcq",
      prompt: md`A government utility with a strong in-house engineering department wants the lowest capex for a 300 MW PV plant and is willing to manage interfaces. Which strategy fits best?`,
      options: ["EPC turnkey on Silver", "Multi-contract / split packages", "BOO IPP", "EPCM with a capped-fee consultant"],
      answer: 1,
      explanation: md`Split packages avoid the EPC contractor's integration premium but put **interface risk on the Employer**. That is rational only if the Employer has the engineering and contract-management capacity to coordinate designs, programmes and testing across packages. A lender-financed IPP would not accept it.`,
      concepts: ["m09.contracting-strategy"],
      difficulty: 2,
    },
    {
      id: "m09-l01-q4",
      type: "label",
      prompt: md`Label the parties on the FIDIC contract structure diagram.`,
      diagram: "fidic-parties",
      markers: [
        { id: "employer", answer: "Employer" },
        { id: "engineer", answer: "Engineer" },
        { id: "contractor", answer: "Contractor" },
        { id: "subcontractor", answer: "Subcontractor" },
        { id: "dab", answer: "DAAB" },
      ],
      options: ["Employer", "Engineer", "Contractor", "Subcontractor", "DAAB", "Lenders", "Offtaker"],
      explanation: md`The Employer contracts with the Contractor and appoints the Engineer. Subcontractors contract only with the Contractor. The DAAB is appointed jointly by both parties (with the DAAB members under a tripartite agreement). Lenders and offtakers belong to the IPP structure, not the FIDIC construction contract.`,
      concepts: ["m09.fidic-suite", "m09.engineer-vs-er"],
      difficulty: 1,
    },
    {
      id: "m09-l01-q5",
      type: "decision",
      prompt: md`You are the MEWRE PM reviewing the SPV's EPC term sheet for a solar IPP (shared under the PPA's information rights). The PPA scheduled COD is 30 June 2029. The EPC Time for Completion is also 30 June 2029. What do you do?`,
      options: [
        {
          text: "Flag to KAPP and the lenders' advisors that there is no float buffer between EPC completion and PPA COD, and ask how the SPV covers PPA delay exposure.",
          score: 1,
          feedback: "Correct. MEWRE's interest is a plant on time. A zero buffer means any EPC slippage becomes a PPA delay; the developer should show a buffer or delay LDs that fully cover PPA penalties.",
        },
        {
          text: "Ignore it: the EPC contract is the SPV's business, not MEWRE's.",
          score: 0.2,
          feedback: "Partly true contractually, but MEWRE bears the system consequence of a late plant (summer capacity). Raising it through the proper channel is good practice.",
        },
        {
          text: "Instruct the EPC contractor to shorten its programme.",
          score: 0,
          feedback: "MEWRE has no contract with the EPC contractor and cannot instruct it. Doing so could even create liability.",
        },
        {
          text: "Ask the SPV to add MEWRE as a party to the EPC contract.",
          score: 0.1,
          feedback: "Unworkable and undesirable: it would drag MEWRE into construction risk that the IPP model is designed to transfer.",
        },
      ],
      explanation: md`Back-to-back structuring normally sets EPC completion **before** PPA scheduled COD (often 1–3 months) so that EPC slippage is absorbed. MEWRE acts through KAPP and the PPA, not by instructing the SPV's contractors.`,
      concepts: ["m09.back-to-back"],
      difficulty: 2,
    },
    {
      id: "m09-l01-q6",
      type: "short",
      prompt: md`Explain, using the risk-allocation principle, why change-in-law risk in a Kuwait solar IPP usually sits with the offtaker side rather than with the EPC contractor.`,
      rubric: [
        "Change in law is controlled by the state, not by the contractor or SPV.",
        "A contractor cannot diversify or insure it, so would apply a high loading factor.",
        "The SPV obtains relief under the PPA; EPC relief is aligned and no wider than the PPA relief.",
        "Allocating it to the state lowers the tariff because bidders do not price the tail risk.",
      ],
      modelAnswer: md`The state makes the law, so the state side (MEWRE/KAPP) is the only party with control. An EPC contractor or SPV cannot diversify or insure the risk and would price the tail at a high loading factor, raising the tariff for 30 years. So the PPA gives the SPV relief (tariff adjustment or compensation) for qualifying changes in law, and the EPC contract passes down relief that is no wider than what the SPV receives, keeping the chain back-to-back.`,
      explanation: md`The test is **control**: whoever can prevent or influence the event should carry it. Only the state changes Kuwaiti law. Loading it onto the EPC contractor would add a premium of roughly $k \cdot EV$ with a high $k$, paid for 30 years through the tariff, and the contractor still could not prevent the event. Keep EPC relief no wider than PPA relief so the SPV is not left with a gap.`,
      concepts: ["m09.risk-allocation", "m09.back-to-back"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m09-l01-f1", front: "FIDIC Red Book 2017: who designs?", back: "The Employer (Contractor may design minor parts). Remeasured BoQ, administered by the Engineer.", concepts: ["m09.fidic-suite"] },
    { id: "m09-l01-f2", front: "FIDIC Yellow Book 2017: full name and design responsibility", back: "Plant and Design-Build. The Contractor designs to the Employer's Requirements; lump sum; Engineer administers.", concepts: ["m09.fidic-suite"] },
    { id: "m09-l01-f3", front: "FIDIC Silver Book 2017: full name and who administers", back: "EPC/Turnkey Projects. The Employer administers through an Employer's Representative; no Engineer.", concepts: ["m09.fidic-suite", "m09.engineer-vs-er"] },
    { id: "m09-l01-f4", front: "Silver Sub-Clause 4.12 title and effect", back: "Unforeseeable Difficulties: at the Contractor's risk; Contract Price not adjusted.", concepts: ["m09.risk-allocation"] },
    { id: "m09-l01-f5", front: "BOO vs BOT", back: "BOO: private owner keeps the asset at the end. BOT: asset transfers to the public party at the end of the term.", concepts: ["m09.contracting-strategy"] },
    { id: "m09-l01-f6", front: "Risk-allocation principle", back: "Put each risk with the party that controls it; if none, with the party that bears it most cheaply. Otherwise you pay a premium of k x EV with k > 1.", concepts: ["m09.risk-allocation"] },
    { id: "m09-l01-f7", front: "What does 'back-to-back' mean in an IPP?", back: "SPV obligations under the PPA are passed down to EPC/O&M contracts on matching (and shorter-notice) terms so the SPV is a pass-through.", concepts: ["m09.back-to-back"] },
    { id: "m09-l01-f8", front: "Gold Book and Emerald Book", back: "Gold: Design, Build and Operate (DBO). Emerald (2019): Underground Works, ground risk shared via a Geotechnical Baseline Report.", concepts: ["m09.fidic-suite"] },
    { id: "m09-l01-f9", front: "FIDIC White Book", back: "Client/Consultant Model Services Agreement: used to appoint the Owner's Engineer.", concepts: ["m09.fidic-suite"] },
  ],
  scenarios: [
    {
      id: "m09-s1",
      title: "Which form for MEWRE's own BESS?",
      context: md`MEWRE has decided to procure a grid-scale BESS for its own account (not as an IPP), funded from the state budget. The design consultant drafted a performance specification (MW, MWh, round-trip efficiency, availability) and has done no detailed design. The tender committee asks you, the PM, which FIDIC form to recommend.`,
      start: "a",
      concepts: ["m09.fidic-suite", "m09.contracting-strategy", "m09.engineer-vs-er"],
      nodes: {
        a: {
          md: md`The deputy director says: "Use the Red Book, we always do; then we control everything." What do you recommend?`,
          choices: [
            {
              text: "Yellow (Plant & Design-Build): the contractor designs to a performance specification, with an Engineer administering.",
              next: "b",
              score: 9,
              feedback: "Good fit: BESS is plant-heavy and OEM-designed, MEWRE has only a performance specification, and Yellow keeps a neutral Engineer and Employer ground risk (small for a BESS on a prepared pad).",
            },
            {
              text: "Red Book, as the deputy director wants.",
              next: "c",
              score: 2,
              feedback: "Red assumes the Employer has designed the works. With only a performance specification, MEWRE would have to complete the design itself or issue a hybrid contract, creating design-responsibility gaps.",
            },
            {
              text: "Silver (EPC/Turnkey), for maximum price certainty.",
              next: "d",
              score: 6,
              feedback: "Defensible for price certainty, but MEWRE's habit of close supervision and drawing review sits badly with Silver, and bidders will price the risk premium. Fine if MEWRE truly steps back.",
            },
          ],
        },
        b: {
          md: md`The committee agrees on Yellow. Someone proposes that the MEWRE section head acts as "the Engineer" to save consultancy fees. Your response?`,
          choices: [
            {
              text: "Recommend appointing an independent firm (e.g. the Owner's Engineer under a White Book agreement) as Engineer, with MEWRE retaining Employer approvals listed in the Particular Conditions.",
              score: 10,
              feedback: "Best practice. The Engineer must make neutral determinations under 3.7; a ministry employee doing so will be challenged and the DAAB will discount the determinations.",
            },
            {
              text: "Accept: FIDIC allows the Employer's staff to be the Engineer, so do it but train the section head on neutrality.",
              score: 5,
              feedback: "FIDIC does allow an Employer employee to be named Engineer, but the neutrality obligation becomes very hard to demonstrate in a ministry hierarchy. Acceptable only with strong safeguards.",
            },
          ],
        },
        c: {
          md: md`The committee goes with Red. Six months in, the contractor's BESS container layout clashes with the fire-separation distances in the specification. Who is responsible?`,
          choices: [
            {
              text: "Probably MEWRE: under Red, the Employer is responsible for the design it provides, and the specification was incomplete.",
              score: 8,
              feedback: "Correct reading. This is the cost of using Red without a complete Employer design: the clash becomes an Employer-risk variation.",
            },
            {
              text: "The contractor, because it should have spotted the clash.",
              score: 3,
              feedback: "The contractor may have a duty to notify errors it discovers, but under Red design responsibility stays with the Employer for the parts it designed.",
            },
          ],
        },
        d: {
          md: md`Silver is chosen. The design consultant proposes that MEWRE "approves" all detailed drawings within 14 days. What do you do?`,
          choices: [
            {
              text: "Replace approval with review-and-comment at defined hold points plus audits, making clear the contractor keeps full design responsibility.",
              score: 9,
              feedback: "Right: preserves Silver's single-point responsibility while giving MEWRE visibility.",
            },
            {
              text: "Keep the approval process: MEWRE must protect itself.",
              score: 3,
              feedback: "Formal approval of every drawing undermines Silver and invites the argument that MEWRE adopted the design.",
            },
          ],
        },
      },
    },
  ],
};

export default lesson;
