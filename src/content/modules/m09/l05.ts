import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m09-l05",
  title: "PPAs and the Kuwait IPP/PPP structure",
  summary:
    "How a solar IPP is structured around the PPA: Kuwait's PPP model under Law 116/2014 (KAPP, the Higher Committee, the citizen IPO share, MEWRE as offtaker), 25–30 year terms, energy-only versus capacity-plus-energy tariffs, take-or-pay and deemed energy, change in law, FX, termination payments, government support, lenders' step-in and direct agreements.",
  minutes: 80,
  objectives: [
    "You can draw the contract structure of a Kuwait solar IPP and name every party and agreement.",
    "You can describe Kuwait's PPP framework (Law 116/2014, KAPP, approval chain, shareholding) and say which parts are verified.",
    "You can explain energy-only and two-part tariffs, take-or-pay and deemed energy, and compute a deemed-energy payment.",
    "You can explain how change in law, FX, force majeure and termination payments allocate risk between MEWRE and the SPV.",
    "You can explain lenders' step-in rights and direct agreements, and what MEWRE signs up to.",
  ],
  concepts: [
    {
      id: "m09.kuwait-ppp-model",
      name: "Kuwait PPP model (Law 116/2014)",
      description:
        "KAPP procures PPP projects under Law 116/2014 and Decree 78/2015 with Higher Committee and State Audit Bureau approvals; MEWRE is offtaker; for large projects a share of the project company is offered to Kuwaiti citizens by IPO.",
      competency: "contracts",
      related: ["m09.ppa-tariff"],
    },
    {
      id: "m09.ppa-tariff",
      name: "PPA tariff structures",
      description:
        "Energy-only (single price per MWh, typical for solar) versus two-part capacity-plus-energy tariffs (thermal, BESS tolling); indexation and currency of payment.",
      competency: "contracts",
    },
    {
      id: "m09.deemed-energy",
      name: "Take-or-pay and deemed energy",
      description:
        "Mechanisms that make the offtaker pay for energy the plant could have delivered but did not because of curtailment, dispatch instructions or grid unavailability within the offtaker's control.",
      competency: "contracts",
      related: ["m09.ppa-tariff"],
    },
    {
      id: "m09.change-in-law-ppa",
      name: "Change in law, force majeure and government support",
      description:
        "PPA provisions that compensate the SPV for qualifying changes in law and political events (often called material adverse government action), and relieve both parties for natural force majeure.",
      competency: "contracts",
    },
    {
      id: "m09.termination-payments",
      name: "Termination payments",
      description:
        "Compensation on early termination, scaled to fault: SPV default (typically up to senior debt or less), natural force majeure (debt plus part of equity), offtaker default or political force majeure (debt plus equity plus return).",
      competency: "contracts",
      related: ["m09.direct-agreements"],
    },
    {
      id: "m09.direct-agreements",
      name: "Direct agreements and step-in",
      description:
        "Agreements between lenders and project counterparties (offtaker, EPC, O&M) giving lenders notice of defaults, cure periods and the right to step in or novate the contract to a substitute before termination.",
      competency: "contracts",
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "The IPP structure and the PPA's risk machinery",
      blocks: [
        {
          kind: "md",
          md: md`An **Independent Power Producer (IPP)** is a privately financed project company (**SPV**) that builds and operates a plant and sells its output to a public **offtaker** under a long-term **Power Purchase Agreement (PPA)**. The PPA is the revenue contract on which the whole financing rests: lenders lend 70–80% of the capex against it, with recourse only to the SPV's cash flows (**non-recourse project finance**). Every PPA clause is therefore read by lenders as "does this protect the debt?".`,
        },
        {
          kind: "diagram",
          diagram: "ppp-structure",
          caption:
            "Kuwait-style solar IPP: KAPP procures; the SPV signs the PPA with MEWRE as offtaker; sponsors provide equity alongside KAPP's warehoused shares for a later citizen IPO; lenders finance the SPV; the SPV contracts EPC and O&M.",
        },
        {
          kind: "md",
          md: md`| Agreement | Parties | Purpose |
|---|---|---|
| **PPA** | MEWRE ↔ SPV | Sale of energy for 30 years (solar), tariff, COD, grid connection, dispatch, metering, termination |
| Land lease / usufruct | State land authority or MEWRE ↔ SPV | Site rights for the term |
| Shareholders' agreement | Sponsors, KAPP (warehoused IPO shares) | Governance, transfers, IPO |
| **EPC contract** | SPV ↔ EPC Contractor | Turnkey construction, back-to-back with the PPA (lesson 1) |
| **O&M contract / LTSA** | SPV ↔ O&M contractor / OEM | Operation, availability and PR guarantees (lesson 6) |
| Loan agreements, security documents | SPV ↔ lenders | Debt, security over shares, accounts, contracts |
| **Direct agreements** | Lenders ↔ MEWRE; lenders ↔ EPC; lenders ↔ O&M | Step-in and cure rights |
| Grid connection arrangements | MEWRE (transmission) ↔ SPV | Interface, energisation, protection settings |

### Kuwait's PPP model`,
        },
        {
          kind: "callout",
          tone: "kuwait",
          title: "Kuwait PPP framework (sourced)",
          md: md`- **KAPP** (Kuwait Authority for Partnership Projects) was established under **PPP Law No. 116 of 2014**, with Executive Regulations in **Decree No. 78 of 2015**; the law replaced Law 7/2008. KAPP is attached to the Minister of Finance. The **Higher Committee for PPP**, chaired by the Minister of Finance, sets policy, approves projects and procurement stages, and approves the selected investor on KAPP's recommendation.
- **Typical process:** public entity request → KAPP feasibility study → Higher Committee approval → RFQ/prequalification → RFP with technical then financial bid opening → preferred bidder → Higher Committee approval → **State Audit Bureau** approval → PPA/ECWPA signing → financial close. The Fatwa and Legislation Department reviews legal terms; KAPP has said some lender conditions conflict with its requirements.
- **Shareholding (secondary legal guide, projects above KD 60 m):** **50%** offered by IPO to Kuwaiti citizens, **6–24%** to public entities, **at least 26%** to the private investor; KAPP warehouses the IPO shares until the project operates, and unsubscribed shares stay with KAPP. Sources conflict on the exact public/private bands: verify against the law text.
- **In practice (IWPPs):** developer consortium **40%**, state through KAPP **60%** (with 50% earmarked for IPO): Az-Zour North 1 (ENGIE 17.5%, Sumitomo 17.5%, A.H. Al-Sagar 5%; **40-year ECWPA**; IPO oversubscribed in 2019, listed on Boursa Kuwait) and Az-Zour North 2&3 (ACWA Power + GIC; **25-year ECWPA** signed 3 February 2026).
- **Solar IPPs:** **30-year PPA** with **MEWRE** as offtaker. Shagaya Phase III Zone 1 (1,100 MW) RFP scope: development, financing, design, construction and O&M, including a 400 kV substation, with the PPA term starting from COD. Zone 2 (500 MW) reportedly allows a customs-duty exemption of up to 10% on imported equipment for the first 10 years (exact wording unverified).`,
        },
        { kind: "sources", refs: ["m09-kapp-ppp-law-116-2014", "m09-kapp-exec-regs-78-2015", "m09-state-ics-2024-kuwait", "m09-ijglobal-kuwait-ppp-10-years", "m09-meed-kapp-stakeholders", "m09-legal500-kuwait-entry", "m09-tamimi-ppp-kuwait", "m09-engie-azn1", "m09-mees-2019-ipo", "m09-mees-2026-azn23", "m09-agbi-2025-zone1-rfp", "m09-solarquarter-2025-zone2"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "Not established in our research",
          md: md`The **PPA currency** (KWD or USD, and any indexation), the **form of government support or guarantee** for MEWRE's payment obligations, the **termination-payment regime**, the treatment of **curtailment and grid unavailability** (deemed energy) and whether MEWRE signs **direct agreements** with lenders in the Kuwait solar PPAs are not public in the sources found. The mechanisms below are standard international practice (World Bank guidance); confirm the actual Kuwait PPA terms from the signed documents before applying them. The name ECWPA ("Energy Conversion and Water Purchase Agreement") suggests a tolling structure in which the offtaker supplies fuel, but that is an inference to verify.`,
        },
        {
          kind: "widget",
          widget: "institution-map",
          caption: "Who approves what: MEWRE, KAPP, Higher Committee, State Audit Bureau, Fatwa and Legislation Department, Ministry of Finance.",
        },
        {
          kind: "md",
          md: md`### Tariff structures

**Energy-only tariff.** The SPV is paid a single price per MWh delivered (in the Gulf solar IPPs, typically quoted in US cents or fils per kWh). Simple, and suits non-dispatchable PV: the SPV carries resource risk (irradiance, soiling, degradation) and performance risk. This is the norm for solar IPPs.

**Two-part tariff (capacity + energy).** A **capacity charge** per kW-month, paid if the plant is **available**, recovers fixed costs (capex, debt, fixed O&M) regardless of dispatch; an **energy charge** per MWh covers variable costs. Normal for thermal IWPPs and for BESS tolling agreements, where the offtaker controls dispatch.`,
        },
        { kind: "equation", formula: "m09-capacity-energy-tariff" },
        {
          kind: "md",
          md: md`**Indexation.** Tariffs may be flat for the term or partly indexed (to CPI, or to an exchange rate). A common design indexes only the O&M share: if 70% of the tariff services debt, indexing it all would over-compensate.`,
        },
        { kind: "equation", formula: "m09-tariff-indexation" },
        {
          kind: "md",
          md: md`Example: base tariff USD 15/MWh, fixed share $f = 0.7$, CPI up 25% after 10 years: $T_{10} = 15\,[0.7 + 0.3 \times 1.25] = 16.125$ USD/MWh.

**FX.** If the SPV borrows in USD and is paid in KWD, a fall in the KWD against the USD raises the SPV's debt service in KWD terms. Lenders want either USD-denominated tariffs, USD-indexed KWD tariffs, or hedging. The party best able to bear FX risk on a 30-year horizon is usually the state.

### Take-or-pay, must-take and deemed energy

PV cannot store its fuel: energy not taken when the sun shines is lost. So the PPA makes the offtaker carry the risk of events it controls:

- **Must-take / take-or-pay:** the offtaker must accept all energy the plant delivers (or pay for a minimum quantity).
- **Deemed energy:** for **curtailment** by the system operator (other than for the SPV's fault or genuine emergencies), **grid unavailability** (transmission outage, late grid connection) and sometimes **offtaker-caused delays to COD**, the offtaker pays as if the energy had been delivered. Usually there is an annual **allowance** of uncompensated hours.`,
        },
        { kind: "equation", formula: "m09-take-or-pay" },
        { kind: "equation", formula: "m09-deemed-energy" },
        {
          kind: "callout",
          tone: "why",
          title: "Why deemed energy sits with MEWRE",
          md: md`MEWRE builds and operates the transmission grid and dispatches the system. The SPV cannot prevent a 400 kV outage or a curtailment instruction, so if it carried that risk it would price it (risk premium, higher tariff for 30 years) and lenders would size debt more cautiously. Deemed energy is the PPA's version of the risk-allocation principle. The flip side: MEWRE must deliver its grid works on time and manage curtailment, or pay for energy it never receives.`,
        },
        {
          kind: "md",
          md: md`### Change in law, force majeure and government support

- **Change in law.** The SPV is compensated (tariff adjustment or lump sum) for changes in Kuwaiti law after the bid date that increase its costs, often limited to **discriminatory** changes (affecting this project or IPPs specifically) or **specific** changes (e.g. to tax on power generation), with a threshold below which the SPV absorbs the cost. General changes affecting all businesses may stay with the SPV.
- **Natural force majeure** (sandstorm beyond design, earthquake, epidemic): both parties are excused; the term may be extended; prolonged FM allows termination with a payment covering at least the debt.
- **Political force majeure / material adverse government action (MAGA):** war, expropriation, government actions that prevent performance. Treated like offtaker default: the offtaker continues capacity or deemed payments, and termination triggers the highest compensation.
- **Government support.** Where the offtaker is a ministry or a state utility, lenders look at whether its payment obligations are backed by the state (a guarantee, a letter of support, or simply because the offtaker is the state itself). In Kuwait the offtaker is a ministry, so the credit is effectively sovereign; the exact documentation is unverified (see above).

### Termination payments

| Termination cause | Typical compensation to the SPV | Logic |
|---|---|---|
| **SPV default** (abandonment, failure to reach COD by the long-stop date, persistent underperformance) | Nothing before COD (development security forfeited); after COD often a percentage of senior debt, or market value of the project | Equity loses; lenders are partly protected so the project stays bankable |
| **Natural force majeure** (prolonged) | Senior debt + equity invested (without return), sometimes debt only | No one at fault: share the loss |
| **Offtaker default / political FM / MAGA** | Senior debt + breakage costs + equity at an agreed return (or fair market value) + subcontractor termination costs | Full compensation: the offtaker controlled the cause |
| **Offtaker voluntary termination** (if allowed) | As offtaker default | – |

In return for a termination payment covering the debt, the asset transfers to the offtaker (or its nominee).

### Lenders' step-in and direct agreements

Lenders do not want the PPA terminated for an SPV default that they could cure by replacing the operator or injecting funds. The **direct agreement** (also called a consent or tripartite agreement) between the **offtaker**, the **lenders** (through their agent or security trustee) and the SPV typically:

1. Has the offtaker consent to the SPV assigning the PPA to the lenders as security.
2. Requires the offtaker to notify lenders of an SPV default and give them an **extended cure period** before terminating.
3. Gives lenders the right to **step in** (operate through a nominee) during the cure period, and to **novate** the PPA to a suitable substitute owner approved by the offtaker.
4. Sets out what happens on enforcement of share security (change of control).

Lenders take similar direct agreements with the **EPC** and **O&M contractors**, so those contracts cannot be terminated without lenders having a chance to step in.`,
        },
        { kind: "sources", refs: ["m09-wb-ppp-contractual-provisions-2019", "m09-wb-ppplrc", "m09-cldp-understanding-ppas", "m09-wb-ppp-reference-guide"] },
      ],
    },
    {
      layer: "applied",
      title: "Deemed energy and tariff calculations",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Deemed energy for a 6-hour 400 kV outage",
          given: md`A **500 MWac** PV IPP is fully available on a clear July day when MEWRE's 400 kV line trips at 10:00 and is restored at 16:00 (a transmission fault, not caused by the plant). The PPA deems energy for grid unavailability using the agreed plant model applied to on-site pyranometer data, capped at available capacity. Modelled hourly output (MW): 10–11: 455; 11–12: 480; 12–13: 490; 13–14: 488; 14–15: 470; 15–16: 430. Tariff (illustrative): **USD 15/MWh**. The annual allowance of uncompensated outage hours has already been used up this year.`,
          steps: [
            {
              md: md`**Sum the modelled energy:** $E = (455 + 480 + 490 + 488 + 470 + 430) \times 1\ \text{h} = 2{,}813$ MWh.`,
            },
            {
              md: md`**Check the cap:** every hourly value is below 500 MW available AC capacity, so no capping applies. (On a cool clear day with a high DC/AC ratio the model could exceed the export limit; the cap stops the offtaker paying for energy that could never have been exported.)`,
            },
            {
              md: md`**Allowance:** already used, so $E_{\text{allow}} = 0$ and $E_{\text{deemed}} = 2{,}813$ MWh.`,
            },
            {
              md: md`**Payment:** $2{,}813 \times 15 = 42{,}195$ USD.`,
            },
          ],
          result: md`MEWRE owes about USD 42,200 for energy it never received. Over a summer with repeated trips, or months of late grid connection, deemed energy becomes a material budget line for the ministry: the PM must track it.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Annual allowance on grid outages",
          given: md`The same PPA gives an annual allowance of **50 hours** of grid unavailability without compensation. This year, daytime grid unavailability totalled **70 hours**. For the compensable hours, the average modelled output was **420 MW**. Tariff USD 15/MWh.`,
          steps: [
            { md: md`Compensable hours $= 70 - 50 = 20$ h.` },
            {
              md: md`Deemed energy $= 20 \times 420 = 8{,}400$ MWh.`,
              hidden: true,
              check: { prompt: "Deemed energy for the year", answer: 8400, unit: "MWh", tolerance: { rel: 0.01 } },
            },
            {
              md: md`Payment $= 8{,}400 \times 15 = 126{,}000$ USD.`,
              hidden: true,
              check: { prompt: "Deemed energy payment", answer: 126000, unit: "USD", tolerance: { rel: 0.01 } },
            },
          ],
          result: md`USD 126,000. Note the drafting issues: which hours count first (the allowance applied to the lowest-output hours is worth much less than to noon hours), and whether partial curtailments count as unavailability. Settle these in the PPA's schedule, not after the first summer.`,
        },
        {
          kind: "question",
          question: {
            id: "m09-l05-p1",
            type: "numeric",
            prompt: md`A BESS tolling agreement pays a capacity charge of **USD 9/kW-month** on **250 MW** contracted capacity, scaled by $\min(1, A_m/A_{\text{ref}})$ with $A_{\text{ref}} = 97\%$. Measured availability this month is **96%**. What is the month's capacity payment, in USD m (three decimals)?`,
            answer: 2.227,
            unit: "USD m",
            tolerance: { abs: 0.002 },
            explanation: md`$R = 9 \times 250{,}000 \times \min(1, 0.96/0.97) = 2{,}250{,}000 \times 0.98969 = 2{,}226{,}804$ USD ≈ 2.227 USD m. The availability shortfall of one point cost about USD 23,000 this month, which is the incentive for the operator to keep the BESS available at the evening peak.`,
            concepts: ["m09.ppa-tariff"],
            difficulty: 2,
          },
        },
        { kind: "widget", widget: "tariff-eval", caption: "Compare bids by levelized tariff and escalation: the same 30-year PPA can look cheap or expensive depending on indexation." },
      ],
    },
    {
      layer: "field",
      title: "Managing a PPA from MEWRE's side",
      blocks: [
        {
          kind: "md",
          md: md`**MEWRE's role.** KAPP runs the procurement and holds the warehoused shares; MEWRE signs the PPA as offtaker and must then **perform** it for 30 years: deliver the grid connection on time, issue dispatch and curtailment instructions properly, read meters, pay invoices, process deemed-energy claims, witness commissioning tests, and administer change-in-law and force-majeure notices. The PM is MEWRE's contract manager for that agreement and its technical interfaces.

**Key PPA milestones to track:** financial close deadline; scheduled COD and the long-stop date; MEWRE's grid connection date (backfeed and export readiness); commissioning and grid code compliance tests; COD certificate; first invoice; annual capacity/energy reconciliations.

**Documents:** the PPA and its schedules (technical specification, testing, metering, dispatch, deemed energy calculation, tariff, insurance), the grid connection agreement, the direct agreement, and the Independent Engineer's reports.`,
        },
        {
          kind: "callout",
          tone: "kuwait",
          title: "The grid interface is MEWRE's critical path (sourced)",
          md: md`For Shagaya Phase III, the 400 kV overhead line from Shagaya to the Al-Wafra substation is a separate MEWRE contract, awarded in March 2026 to Power Grid Company (Kuwait) for KD 48.6 m. A late grid connection can strand an IPP and usually triggers deemed-energy or compensation exposure for the offtaker.`,
        },
        { kind: "sources", refs: ["m09-megaproject-2026-400kv"] },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- Grid works procured late or slipping, with nobody in MEWRE tracking them against the PPA's grid connection date.
- Curtailment instructions given informally by the control centre without the records the PPA requires, leading to disputed deemed-energy claims.
- Deemed-energy model not agreed in detail (data source, filtering, cap, allowance order), so every claim is a negotiation.
- Change-in-law notices (e.g. new customs or local-content rules) received but not routed to legal and finance.
- Direct agreement cure periods forgotten when an SPV default notice is considered.
- Invoices paid late, triggering interest and a payment-default narrative with lenders.`,
        },
        {
          kind: "checklist",
          title: "PM checklist: PPA administration",
          items: [
            "PPA obligations register for MEWRE (grid date, approvals, metering, dispatch, payments) with owners and dates.",
            "Grid connection programme integrated with the IPP programme; monthly interface meeting with the SPV and MEWRE transmission.",
            "Deemed-energy procedure agreed: data, model, cap, allowance, documentation from the control centre.",
            "Curtailment instructions logged with time, MW and reason.",
            "Change-in-law and force-majeure notices routed to legal (and KAPP) within the PPA's response periods.",
            "Invoice verification against meter data and the tariff schedule; payment within the PPA period.",
            "Direct agreement obligations (notices to lenders, cure periods) built into any default process.",
          ],
        },
        {
          kind: "ask",
          title: "Ask the developer (SPV)",
          items: [
            "Which MEWRE obligations are on your critical path to COD, and what dates do you need?",
            "How will you calculate deemed energy, and can we jointly test the model on a month of real data?",
            "What change-in-law events do you foresee (customs, local content under the new tenders law, taxes)?",
            "Which EPC dates give you float against the PPA scheduled COD and long-stop date?",
            "What do your lenders require from MEWRE under the direct agreement?",
          ],
        },
        { kind: "scenario", scenario: "m09-s4" },
        {
          kind: "feynman",
          prompt:
            "Explain to a MEWRE finance director why the ministry pays for 'deemed energy' it never receives, and how the PM can keep that cost down.",
          keyPoints: [
            "PV energy not taken is lost; the SPV cannot control grid outages or curtailment.",
            "Putting that risk on the SPV would raise the tariff for 30 years and weaken bankability.",
            "Deemed energy pays for modelled output during offtaker-caused unavailability, after any allowance.",
            "Cost control: deliver grid works on time, maintain transmission, plan curtailment, keep records, agree the model precisely.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m09-l05-q1",
      type: "label",
      prompt: md`Label the Kuwait IPP structure.`,
      diagram: "ppp-structure",
      markers: [
        { id: "offtaker", answer: "MEWRE (offtaker)" },
        { id: "spv", answer: "Project company (SPV)" },
        { id: "lenders", answer: "Lenders" },
        { id: "sponsors", answer: "Sponsors" },
        { id: "epc", answer: "EPC Contractor" },
        { id: "om", answer: "O&M Contractor" },
        { id: "kapp", answer: "KAPP" },
        { id: "public-ipo", answer: "Kuwaiti citizens (IPO)" },
      ],
      options: [
        "MEWRE (offtaker)",
        "Project company (SPV)",
        "Lenders",
        "Sponsors",
        "EPC Contractor",
        "O&M Contractor",
        "KAPP",
        "Kuwaiti citizens (IPO)",
        "State Audit Bureau",
      ],
      explanation: md`MEWRE buys the output under the PPA; the SPV owns the plant; sponsors and KAPP (warehousing the IPO shares) hold the equity; lenders finance the SPV; EPC and O&M contractors deliver and run the plant. The State Audit Bureau approves the contract but is not a party to the structure.`,
      concepts: ["m09.kuwait-ppp-model"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m09-l05-q2",
      type: "mcq",
      prompt: md`Why are solar IPP PPAs usually energy-only while BESS and thermal IPPs use capacity-plus-energy tariffs?`,
      options: [
        "Solar plants are cheaper",
        "Solar output is non-dispatchable, so paying per MWh delivered aligns payment with the resource; dispatchable plants need fixed-cost recovery when the offtaker chooses not to dispatch them",
        "Capacity payments are illegal for solar",
        "Energy-only tariffs avoid the need for metering",
      ],
      answer: 1,
      explanation: md`A dispatchable asset's revenue depends on the offtaker's dispatch decisions, so a capacity charge (paid if available) protects fixed-cost recovery. A PV plant produces when the sun shines; with must-take and deemed energy, an energy-only price is enough.`,
      concepts: ["m09.ppa-tariff"],
      difficulty: 1,
    },
    {
      id: "m09-l05-q3",
      type: "multi",
      prompt: md`Which events would normally give a solar IPP **deemed energy** under a well-drafted PPA? Select all that apply.`,
      options: [
        "A transmission line outage on MEWRE's grid not caused by the plant",
        "Curtailment instructions by the system operator for system-balancing reasons",
        "Late completion of MEWRE's grid connection works",
        "Inverter failures inside the plant",
        "Lower irradiance than the P50 forecast",
      ],
      answer: [0, 1, 2],
      explanation: md`Deemed energy covers losses the offtaker controls: grid outages, curtailment and late grid connection. Plant failures and resource variability are the SPV's risk (passed to the O&M contractor and covered by the P50/P90 analysis).`,
      concepts: ["m09.deemed-energy"],
      difficulty: 1,
    },
    {
      id: "m09-l05-q4",
      type: "order",
      prompt: md`Order the typical termination compensation to the SPV, from **lowest** to **highest**.`,
      items: [
        "SPV default before COD",
        "SPV default after COD",
        "Prolonged natural force majeure",
        "Offtaker default or political force majeure",
      ],
      explanation: md`Before COD on SPV default there is usually no payment (and development security is forfeited); after COD a portion of debt or market value; natural FM covers debt and often invested equity without return; offtaker default or political FM covers debt, breakage and equity with a return.`,
      concepts: ["m09.termination-payments"],
      difficulty: 2,
    },
    {
      id: "m09-l05-q5",
      type: "mcq",
      prompt: md`What does a direct agreement between MEWRE and the SPV's lenders typically give the lenders?`,
      options: [
        "A guarantee from MEWRE of the SPV's debt",
        "Notice of SPV defaults, an extended cure period, and the right to step in or novate the PPA to a substitute before MEWRE terminates",
        "The right to set the tariff",
        "Ownership of the plant at COD",
      ],
      answer: 1,
      explanation: md`Direct agreements protect lenders' collateral (the PPA) by giving them time and tools to cure an SPV default. MEWRE does not guarantee the debt; it agrees not to terminate without giving lenders that chance.`,
      concepts: ["m09.direct-agreements"],
      difficulty: 2,
    },
    {
      id: "m09-l05-q6",
      type: "numeric",
      prompt: md`A tariff of **USD 14/MWh** is 60% fixed and 40% indexed to CPI. CPI has risen **18%** since the base date. What is the current tariff in USD/MWh?`,
      answer: 15.008,
      unit: "USD/MWh",
      tolerance: { abs: 0.01 },
      explanation: md`$T = 14\,[0.6 + 0.4 \times 1.18] = 14 \times 1.072 = 15.008$ USD/MWh. Only the indexed share grows with CPI.`,
      concepts: ["m09.ppa-tariff"],
      difficulty: 1,
    },
    {
      id: "m09-l05-q7",
      type: "short",
      prompt: md`Describe Kuwait's PPP shareholding model for large projects and its practical implication for a MEWRE PM. Note which parts need verification.`,
      rubric: [
        "Law 116/2014: 50% offered by IPO to Kuwaiti citizens (per secondary legal guide).",
        "Public entities 6–24%, private investor at least 26% (sources conflict; verify against the law).",
        "KAPP warehouses IPO shares until operation; IWPP practice 40% private / 60% state.",
        "Implication: KAPP is a major shareholder; governance and eventual Boursa listing; MEWRE interacts as offtaker, not owner.",
      ],
      modelAnswer: md`Under PPP Law 116/2014 (as summarised by a secondary legal guide), large projects allocate 50% of the project company to Kuwaiti citizens by IPO, 6–24% to public entities and at least 26% to the private investor; KAPP warehouses the IPO shares until operation. In IWPP practice the developer holds 40% and the state 60% (e.g. Az-Zour North 1 and 2&3). The bands conflict across sources and must be checked in the law. For the PM: the project company has the state as a major shareholder and will eventually be listed, but MEWRE's own rights come from the PPA as offtaker.`,
      explanation: md`Knowing who owns the SPV explains governance, disclosure and the political weight of the project, but the PM's levers are the PPA terms.`,
      concepts: ["m09.kuwait-ppp-model"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m09-l05-f1", front: "Kuwait solar IPP PPA term and offtaker", back: "30 years from COD, with MEWRE as offtaker (procured by KAPP).", concepts: ["m09.kuwait-ppp-model"] },
    { id: "m09-l05-f2", front: "Law establishing KAPP", back: "PPP Law No. 116 of 2014; Executive Regulations Decree No. 78 of 2015.", concepts: ["m09.kuwait-ppp-model"] },
    { id: "m09-l05-f3", front: "Kuwait PPP shareholding (secondary source)", back: "50% citizen IPO, 6–24% public entities, ≥26% private investor; IWPP practice 40% private / 60% state. Verify against the law.", concepts: ["m09.kuwait-ppp-model"] },
    { id: "m09-l05-f4", front: "Capacity charge vs energy charge", back: "Capacity: per kW-month, paid if available, recovers fixed costs. Energy: per MWh, covers variable costs.", concepts: ["m09.ppa-tariff"] },
    { id: "m09-l05-f5", front: "Deemed energy", back: "Energy the offtaker pays for although not delivered, because of curtailment or grid unavailability it controls.", concepts: ["m09.deemed-energy"] },
    { id: "m09-l05-f6", front: "MAGA", back: "Material adverse government action: political events treated like offtaker default, with full compensation.", concepts: ["m09.change-in-law-ppa"] },
    { id: "m09-l05-f7", front: "Termination payment on offtaker default", back: "Senior debt + breakage costs + equity with an agreed return (or fair market value).", concepts: ["m09.termination-payments"] },
    { id: "m09-l05-f8", front: "Step-in right", back: "Lenders' right under a direct agreement to cure an SPV default by taking over performance (through a nominee) before the counterparty terminates.", concepts: ["m09.direct-agreements"] },
    { id: "m09-l05-f9", front: "Kuwait IWPP agreement name and term", back: "ECWPA (Energy Conversion and Water Purchase Agreement), 25 years for recent IWPPs; Az-Zour North 1 had 40 years.", concepts: ["m09.kuwait-ppp-model"] },
    { id: "m09-l05-f10", front: "Approval steps after preferred bidder (Kuwait PPP)", back: "Higher Committee approval → State Audit Bureau approval → PPA signing → financial close.", concepts: ["m09.kuwait-ppp-model"] },
  ],
  scenarios: [
    {
      id: "m09-s4",
      title: "Grid connection late: whose risk under the PPA and the EPC?",
      dayInLife: true,
      context: md`You are the MEWRE PM for the offtaker side of a 500 MW solar IPP at Shagaya. The SPV's EPC Contractor will be ready for backfeed on 1 March. MEWRE's 400 kV line and substation bay, built under a separate MEWRE contract, will not be energised until about 15 May because of a tower foundation redesign. The SPV has sent a formal notice under the PPA.`,
      start: "a",
      concepts: ["m09.deemed-energy", "m09.back-to-back", "m09.direct-agreements"],
      nodes: {
        a: {
          md: md`The notice claims an extension of the scheduled COD and "deemed commissioning" from 1 April (the date the plant could have completed tests if backfed on 1 March). Your director says: "The EPC contractor is the SPV's problem, not ours." How do you analyse responsibility?`,
          choices: [
            {
              text: "Under the PPA, late grid connection is usually an offtaker risk (MEWRE controls it); check the PPA's grid connection date, the relief (COD extension, deemed commissioning, deemed energy) and notice requirements. The EPC Contractor's relief is a separate matter between the SPV and its contractor.",
              next: "b",
              score: 10,
              feedback: "Correct framing. Two contracts, two questions: MEWRE↔SPV under the PPA, and SPV↔EPC under the EPC. MEWRE answers only the first.",
            },
            {
              text: "Agree with the director: the delay is in the EPC chain.",
              next: "b",
              score: 2,
              feedback: "The delay originates in MEWRE's own grid works. Under a typical PPA, MEWRE carries it.",
            },
          ],
        },
        b: {
          md: md`The PPA gives the SPV deemed energy from the date the plant would have achieved COD but for the grid delay, capped at modelled output, after the SPV demonstrates readiness. What do you do first?`,
          choices: [
            {
              text: "Agree a readiness demonstration (mechanical completion certificates, cold commissioning, protection settings approved, Independent Engineer confirmation) and a deemed-commissioning test plan, so the deemed-energy start date is evidence-based.",
              next: "c",
              score: 10,
              feedback: "Right. Deemed energy should start only when the plant is genuinely ready; otherwise MEWRE pays for a plant that could not have run.",
            },
            {
              text: "Accept 1 April as the deemed COD date without evidence to keep the relationship good.",
              next: "c",
              score: 3,
              feedback: "Costly: about 45 days of deemed energy without proof that the plant would have passed its tests.",
            },
          ],
        },
        c: {
          md: md`Meanwhile the SPV tells you its EPC Contractor has claimed EOT and costs from the SPV for the late backfeed, and the SPV wants MEWRE to "confirm the delay is MEWRE's fault" in a letter. How do you respond?`,
          choices: [
            {
              text: "Provide factual information about the grid programme (dates, causes) as the PPA requires, but do not make statements about the EPC contract; route the letter through legal and KAPP.",
              next: "d",
              score: 10,
              feedback: "MEWRE is not a party to the EPC. Facts are fine; admissions drafted for another contract are not.",
            },
            {
              text: "Sign the letter: it is true anyway.",
              next: "d",
              score: 3,
              feedback: "Even if broadly true, a drafted admission can widen MEWRE's PPA exposure (e.g. cost claims) and should be reviewed by legal.",
            },
          ],
        },
        d: {
          md: md`How do you prevent this happening on the next IPP (Zone 2)?`,
          choices: [
            {
              text: "Integrate MEWRE's grid programme with the IPP schedule from RFP stage, set the PPA grid connection date with float after realistic transmission milestones, start grid procurement early, and report the interface monthly to management.",
              score: 10,
              feedback: "The grid is the offtaker's critical path. Treat it as MEWRE's own project with its own float, risks and reporting.",
            },
            {
              text: "Ask KAPP to move grid risk to the developer in the next PPA.",
              score: 4,
              feedback: "The developer cannot control MEWRE's grid; bidders would price it heavily. Manage the risk rather than transferring it.",
            },
          ],
        },
      },
    },
  ],
};

export default lesson;
