import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m15-l01",
  title: "Project brief: NAJM-1000 PV + BESS",
  summary:
    "The capstone project: a MEWRE-offtaken 1,000 MWac single-axis tracker PV plant with a 250 MW / 1,000 MWh BESS near Shagaya/Dibdibah, procured as an IPP through KAPP. Key numbers, contract stack, stakeholder map, your role and the rules of the simulation.",
  minutes: 60,
  objectives: [
    "You can describe the NAJM-1000 project in two minutes: scope, structure, key numbers and the critical interfaces.",
    "You can draw the contract stack (PPA, EPC, O&M, LTSA, financing, direct agreements) and say which risks sit where and what MEWRE controls through each.",
    "You can explain what MEWRE's project manager does on an IPP — and what they must not do — relative to KAPP, the project company, the Owner's Engineer and the lenders' advisors.",
    "You can sanity-check the headline numbers (capacity factor, yield, capex, tariff revenue, deemed-energy exposure) with back-of-envelope arithmetic.",
    "You can state the KPIs and scoring rules of the capstone simulation and how to approach it.",
  ],
  concepts: [
    {
      id: "m15.ipp-structure",
      name: "IPP structure via KAPP",
      description:
        "A private project company (SPV) finances, builds, owns and operates the plant under a long-term PPA with MEWRE, after a competitive KAPP process approved by the Higher Committee and reviewed by the State Audit Bureau.",
      competency: "contracts",
      related: ["m00.kapp-higher-committee", "m09.risk-allocation"],
    },
    {
      id: "m15.contract-stack",
      name: "Project contract stack",
      description:
        "The set of interlocking agreements — PPA, EPC, O&M, BESS LTSA, financing, direct agreements, land and grid connection — whose risk allocation must be back-to-back so that no risk falls through the gaps.",
      competency: "contracts",
      related: ["m09.back-to-back"],
    },
    {
      id: "m15.offtaker-pm-role",
      name: "Offtaker-side PM role",
      description:
        "MEWRE's PM manages the PPA and MEWRE-side interfaces (grid, land, approvals, dispatch, payments), protects the state's interest and technical integrity, and influences the IPP through contract rights and relationships — not by directing the EPC contractor.",
      competency: "delivery",
      related: ["m07.owners-engineer", "m13.oe-management"],
    },
    {
      id: "m15.energy-yield-basis",
      name: "Energy yield basis",
      description:
        "The agreed resource data, loss assumptions and P50/P90 method that underpin the tariff, the lenders' sizing and the performance tests. A weak basis in the RFP creates disputes at every later stage.",
      competency: "solar",
      related: ["m02.solar-resource-data", "m02.soiling"],
    },
    {
      id: "m15.grid-interface",
      name: "Grid connection interface",
      description:
        "The physical and contractual boundary between the IPP's plant substation and MEWRE's transmission works, with interface dates, responsibilities, energisation sequence and remedies (deemed energy) if MEWRE is late.",
      competency: "grid",
      related: ["m08.interface-management", "m07.grid-studies"],
    },
    {
      id: "m15.tariff-structure",
      name: "PV + BESS tariff structure",
      description:
        "A two-part payment: an energy charge per delivered MWh of PV energy plus a capacity (availability) charge per MW-month for the BESS, with indexation, availability deductions, and performance liquidated damages.",
      competency: "finance",
      related: ["m10.lcoe"],
    },
    {
      id: "m15.stakeholder-map",
      name: "Capstone stakeholder map",
      description:
        "Who holds power, interest and information on the project — MEWRE units, KAPP, Higher Committee, State Audit Bureau, Fatwa and Legislation, the IPP and its contractors, lenders and advisors — and how the PM engages each.",
      competency: "leadership",
      related: ["m00.decision-chain", "m13.relationship-capital"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "The project in one page",
      blocks: [
        {
          kind: "callout",
          tone: "unverified",
          title: "This is a training scenario",
          md: md`**NAJM-1000 is fictional.** It is modelled on the real Kuwaiti programme (Shagaya Phase III zones procured by KAPP, MEWRE's planned BESS, the Shagaya–Al-Wafra 400 kV line) but it is not a real tender, and none of its tariffs, bidders, dates or contract terms describe a real project. Real facts used for context are cited below; everything labelled "illustrative" was built for training, with the arithmetic shown so you can rebuild it.`,
        },
        {
          kind: "md",
          md: md`### What you are delivering

MEWRE needs daytime energy that displaces liquid fuel and gas, and evening capacity that eases the post-sunset peak. The ministry has asked KAPP to procure, as an **independent power project (IPP)**, a plant we will call **NAJM-1000**:

- **1,000 MWac** of single-axis tracker (SAT) PV with bifacial modules, about **1,300 MWp** DC (DC/AC ratio 1.30).
- A co-located **250 MW / 1,000 MWh** lithium iron phosphate (LFP) battery energy storage system, AC-coupled at the plant's 33 kV collector system, rated at the point of interconnection (POI).
- A plant-side **400/33 kV substation** built by the project company, connecting to a MEWRE 400 kV transmission line and substation bay built by MEWRE.
- Location: desert land in the Shagaya / Dibdibah area of Jahra Governorate, west of Kuwait City. The real Shagaya park covers about 84 km² — an SAT plant of this size needs roughly 20–25 km² including roads, BESS yard and substation.
- A **30-year PPA** with MEWRE as sole offtaker, from commercial operation date (COD), mirroring the tenor reported for Kuwait's solar IPPs.

### Why this configuration

The PV shape matches Kuwait's long midday-to-afternoon summer load. Peak demand has been running at about **17.5–17.7 GW** against roughly 17 GW of reliably available capacity, and in June 2025 available capacity was reported at about 16.3 GW against a 17 GW peak — so every MW that shows up on a July afternoon is a reliability asset, not just a climate asset. The battery carries four hours of energy into the evening when PV collapses but air-conditioning load does not.`,
        },
        { kind: "sources", refs: ["m15-pvmag-2025-zone1", "m15-agbi-2025-zone1-rfp", "m15-pvmag-2021-confusion", "m15-kt-2026-peak", "m15-mees-2025-06-capacity"] },
        {
          kind: "md",
          md: md`### Key numbers (illustrative base case)

| Item | Base case | Range / note |
|---|---|---|
| PV capacity | 1,000 MWac / 1,300 MWp | DC/AC 1.30, bifacial SAT |
| Modules | ≈ 2.1 million × 620 Wp | 1,300 MWp ÷ 620 Wp |
| BESS | 250 MW / 1,000 MWh usable at POI | LFP, 4 h, ≈ 85 % AC round-trip at POI |
| P50 year-1 PV energy at POI | ≈ 2,900 GWh | specific yield ≈ 2,230 kWh/kWp |
| P90 (1-year) | ≈ 2,680 GWh | combined uncertainty σ ≈ 6 % |
| AC capacity factor | ≈ 33 % | SAT, DC/AC 1.3 |
| BESS throughput | ≈ 330 cycles/yr, ≈ 330 GWh/yr discharged | evening shifting |
| Capex (EPC + owner's costs) | ≈ USD 720 m (≈ KWD 222 m) | USD 680–800 m |
| of which PV EPC | ≈ USD 468 m | 1,300 MWp × USD 0.36/Wp |
| of which BESS | ≈ USD 200 m | 1,000 MWh × USD 200/kWh |
| of which 400 kV substation + interconnection (IPP side) | ≈ USD 35 m | MEWRE line and bay extra |
| PV energy charge | ≈ 5.0 fils/kWh (≈ 1.6 US¢) | illustrative, levelised |
| BESS capacity charge | ≈ KWD 2,300 per MW-month | illustrative |
| Schedule: RFP issue → COD | ≈ 1,200 days (39 months) | 6 bid + 5 evaluation/approvals + 4 to financial close + 24 build |
| PPA tenor | 30 years from COD | as reported for Kuwaiti solar IPPs |

Exchange rate assumed throughout: **1 KWD ≈ 3.25 USD**.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Tariffs: there is no published Kuwaiti benchmark yet",
          md: md`No tariff has been published for Shagaya Phase III Zone 1 as of the research cut-off, and the PPA's currency, indexation, government support and termination regime were not found in public sources. The 5.0 fils/kWh and KWD 2,300/MW-month figures above are **derived for training** from the capex, a 6.5 % real WACC and 30-year recovery (the derivation is the worked example below). Analysts quoted in 2026 put Kuwaiti solar at 7–8 fils/kWh — treat every number here as a sanity-check anchor, never as a quote.`,
        },
        { kind: "equation", formula: "m15-capacity-factor" },
        {
          kind: "callout",
          tone: "why",
          title: "Why a PM memorises these numbers",
          md: md`In a ministry, credibility is built in the first ten minutes of a meeting. When the undersecretary asks "how much energy, how much money, when?" the PM who answers "about 2.9 TWh a year, roughly KWD 21 m a year in payments, COD in 39 months from RFP if approvals run to plan" — and can say where each number comes from — is the person whose next recommendation gets approved. The numbers are also your first line of defence: a bid that claims 3.4 TWh from the same plant is either using a different resource dataset or assuming away soiling, and you will see it instantly.`,
        },
        {
          kind: "md",
          md: md`### The IPP structure and the contract stack

Under PPP Law No. 116 of 2014 and its Executive Regulations (Decree 78/2015), **KAPP** runs the procurement for the public entity (MEWRE), the **Higher Committee for PPP** approves the stages and the selected investor, and the **State Audit Bureau** reviews the contract before signing. The winning consortium forms a Kuwaiti **project company** (the SPV). For large projects the law's model splits the SPV's shares between a public IPO to Kuwaiti citizens, public entities and the private investor; in practice on IWPPs the developer has held 40 % and the state 60 %. KAPP has said that some lender conditions conflict with its requirements — which is why financial close can take months after signing.

| Contract | Parties | What it allocates | MEWRE's lever |
|---|---|---|---|
| **PPA** | MEWRE ↔ project company | Tariff, COD conditions and tests, delay LDs, availability and performance, deemed energy, dispatch, metering, change in law, termination | Direct: this is the PM's main instrument |
| **Grid connection / interface schedule** (often a PPA schedule) | MEWRE transmission ↔ project company | Boundary, energisation sequence, interface dates, protection settings, grid code compliance | Direct, and MEWRE is the party that can be late |
| **EPC contract(s)** | Project company ↔ EPC contractor | Design, procurement, construction, testing; delay and performance LDs; defects liability | Indirect: through PPA requirements, technical schedules and the right to review |
| **O&M agreement** | Project company ↔ O&M contractor | Availability, PR guarantees, cleaning, spares, staffing (including Kuwaiti nationals) | Indirect: PPA availability and performance regime |
| **BESS supply + LTSA** | Project company ↔ OEM | Capacity retention, augmentation, round-trip efficiency, availability, fire safety | Indirect: PPA capacity test and availability charge |
| **Financing agreements** | Project company ↔ lenders | Debt sizing (DSCR on P90), conditions precedent, step-in | Direct agreements with MEWRE give lenders cure and step-in rights |
| **Land / usufruct** | State land authority ↔ project company | Site handover, access, easements | MEWRE often coordinates handover — a classic delay source |

The architecture principle is **back-to-back**: every obligation the project company owes MEWRE should be flowed down to the contractor best able to manage it, with matching LDs and time-bars. Where the chain breaks, the project company absorbs the risk — and a thinly capitalised SPV that absorbs too much risk eventually passes it back to MEWRE as claims, delay or distress.`,
        },
        { kind: "sources", refs: ["m15-kapp-ppp-law", "m15-kapp-exec-regs", "m15-legal500-entry", "m15-ijglobal-ppp10"] },
        { kind: "diagram", diagram: "ppp-structure", caption: "PPP/IPP structure: offtaker, KAPP, project company, sponsors, lenders, EPC, O&M and the public IPO tranche." },
        {
          kind: "md",
          md: md`### Tariff structure: who gets paid for what

For PV + BESS, a single blended tariff hides the battery's value and invites gaming. NAJM-1000 uses a **two-part tariff**:

1. **Energy charge** $\tau_E$ (fils/kWh) for every MWh of PV energy delivered at the POI, including energy routed through the battery. The developer carries the yield risk: if the plant underperforms, it earns less.
2. **Capacity charge** $\tau_C$ (KWD per MW-month) for the BESS, paid against **demonstrated available capacity** — a monthly availability factor and periodic capacity tests reduce the payment if the battery cannot deliver 250 MW for 4 h at the POI.

Around these sit: delay LDs if COD is late (per day per MW, capped), performance LDs if the COD tests fall short, **deemed energy** if MEWRE's grid or dispatch prevents delivery beyond an allowance, and a change-in-law mechanism.`,
        },
        { kind: "equation", formula: "m15-deemed-energy" },
        {
          kind: "md",
          md: md`### The approval chain sets the critical path

The typical KAPP sequence, synthesised from sources, is: MEWRE request → KAPP feasibility → Higher Committee approval → RFQ and prequalification → RFP with technical then financial bid opening → preferred bidder → Higher Committee approval → **State Audit Bureau** review → PPA signing → financial close. Shagaya Zone 1's expected award slipped from June to Q3 2026 at exactly this approval stage. Every schedule you build must carry approval float, and every submission to a control body must be complete the first time — an incomplete Audit Bureau file costs weeks per round trip.`,
        },
        { kind: "sources", refs: ["m15-ijglobal-ppp10", "m15-zawya-2026-q3", "m15-escwa-audit-law"] },
        { kind: "widget", widget: "institution-map", caption: "Kuwait decision chain: click each body to recall its role before you plan approvals." },
      ],
    },
    {
      layer: "applied",
      title: "Back-of-envelope checks on the brief",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Deriving the illustrative PV energy charge",
          given: md`PV-related capex USD 520 m (PV EPC 468 + 400 kV substation 35 + owner's costs 17). Fixed O&M ≈ USD 5.5 per kWp-year on 1,300 MWp. Real WACC 6.5 %, recovery over 30 years. P50 energy 2,900 GWh/yr. 1 KWD = 3.25 USD.`,
          steps: [
            { md: md`Capital recovery factor: $\text{CRF} = \dfrac{r(1+r)^n}{(1+r)^n - 1} = \dfrac{0.065 \times 1.065^{30}}{1.065^{30} - 1} = 0.0766$` },
            { md: md`Annual capital charge: $520 \times 0.0766 = 39.8$ USD m/yr` },
            { md: md`Annual O&M: $1{,}300{,}000\ \text{kWp} \times 5.5 = 7.15$ USD m/yr. Total ≈ $47.0$ USD m/yr.` },
            { md: md`Levelised cost per kWh: $47.0 \times 10^6 / 2.9 \times 10^9\ \text{kWh} = 0.0162$ USD/kWh = 1.62 US¢/kWh.` },
            { md: md`In fils: $0.0162 / 3.25 \times 1000 = 4.98$ fils/kWh ≈ **5.0 fils/kWh**.` },
          ],
          result: md`About **5.0 fils/kWh (1.6 US¢/kWh)** — the illustrative energy charge. Annual PV payments ≈ 2,900 GWh × 5.0 fils ≈ **KWD 14.5 m**. A bid far below this needs a cheaper capex, a lower WACC or a higher yield — find out which.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "The BESS capacity charge and total annual payments",
          given: md`BESS capex USD 200 m; annual fixed O&M + LTSA ≈ USD 4 m; augmentation reserve ≈ USD 3 m/yr; same CRF 0.0766. 250 MW contracted. PV payments KWD 14.5 m/yr from the previous example.`,
          steps: [
            { md: md`Annual BESS revenue requirement: $200 \times 0.0766 + 4 + 3 = 22.3$ USD m/yr.` },
            {
              md: md`Per MW-month: $22.3 \times 10^6 / (250 \times 12) = 7{,}440$ USD ≈ KWD 2,290 per MW-month.`,
              hidden: true,
              check: { prompt: "Capacity charge in KWD per MW-month", answer: 2289, unit: "KWD/MW-month", tolerance: { rel: 0.02 } },
            },
            {
              md: md`Annual BESS payments: $250 \times 2{,}290 \times 12 = 6.87$ KWD m; total with PV ≈ $14.5 + 6.9 = 21.4$ KWD m/yr.`,
              hidden: true,
              check: { prompt: "Total annual payments (PV + BESS)", answer: 21.4, unit: "KWD m", tolerance: { rel: 0.02 } },
            },
          ],
          result: md`Roughly **KWD 21 m a year** (≈ USD 70 m) in payments from MEWRE — about 640 m over 30 years in nominal terms before indexation. This is the number the Ministry of Finance budget team and the Audit Bureau will ask about first.`,
        },
        {
          kind: "question",
          question: {
            id: "m15-l01-p1",
            type: "numeric",
            prompt: md`MEWRE's 400 kV line is forecast to be **4 months late** for NAJM-1000's grid connection. Assume deemed energy applies to the whole period, the P50 energy is 2,900 GWh/yr spread evenly, and the energy charge is 5.0 fils/kWh. Estimate MEWRE's deemed-energy liability in **KWD million**.`,
            answer: 4.83,
            unit: "KWD m",
            tolerance: { rel: 0.03 },
            explanation: md`Energy not delivered: $2{,}900 \times 4/12 = 966.7$ GWh $= 966.7 \times 10^6$ kWh. Payment: $966.7 \times 10^6 \times 0.005$ KWD $= 4.83$ KWD m (≈ USD 15.7 m). In reality summer months carry more energy than winter months, so a delay through May–August costs more than the even-spread figure — the PM should compute it month by month from the P50 profile. And this is money for **zero electrons** at the time Kuwait needs them most: the real cost to the system also includes the fuel or imports that had to replace the missing energy.`,
            concepts: ["m15.grid-interface", "m15.tariff-structure"],
            difficulty: 2,
          },
        },
        { kind: "widget", widget: "capacity-factor", props: { mw: 1000, mwh: 2900000 }, caption: "Check the capacity factor of the base case against PV, wind and CSP ranges." },
      ],
    },
    {
      layer: "field",
      title: "Your role, the stakeholders and the rules of the game",
      blocks: [
        {
          kind: "md",
          md: md`### You are MEWRE's project manager

You sit on the **employer / offtaker side**. You do not employ the EPC contractor, you do not approve its invoices, and you cannot instruct its site manager. You do own:

- **The PPA relationship** — notices, approvals and consents the PPA gives MEWRE, COD certification inputs, payment calculations, disputes.
- **MEWRE's own obligations** — land handover support, the 400 kV line and bay (with MEWRE's transmission sector and its contractor), protection settings, energisation permits, metering, dispatch arrangements, payments on time.
- **Technical integrity** — through MEWRE's **Owner's Engineer (OE)**, you review designs, witness factory and site tests and commissioning, and confirm the plant meets the PPA's technical schedules and the grid code.
- **Governance** — keeping the file audit-ready for the State Audit Bureau, briefing leadership, and coordinating with KAPP, which remains the procuring authority and a shareholder.

The **lenders' technical advisor (LTA)** works for the banks, not for you, but their interests overlap with yours on quality and schedule; their monthly reports are a free second opinion. KAPP's transaction advisors (legal, technical, financial) work for KAPP during procurement.`,
        },
        {
          kind: "md",
          md: md`### Stakeholder map

| Stakeholder | Interest | Power | What they need from you |
|---|---|---|---|
| Minister / Undersecretary (MEWRE) | Summer capacity, renewables target, public credibility | Very high | Accurate one-page briefs; no surprises; dates you can defend |
| MEWRE renewables sector (your line) | Delivery on time and on spec | High | Weekly status, decisions framed with options |
| MEWRE transmission / system control | Grid security, protection, dispatch | High (can block energisation) | Early studies, models, test plans, honest interface dates |
| MEWRE finance / legal | Budget, payment calculations, PPA interpretation | Medium–high | Clean calculations and clause references |
| KAPP | Process integrity, PPP programme reputation, shareholding | Very high during procurement | Technical input on time; respect its process |
| Higher Committee for PPP | Approves stages and investor | Very high, episodic | Complete, well-reasoned recommendations via KAPP |
| State Audit Bureau | Legality and value for money | Very high (prior review, post-audit) | Complete documented trail, fast answers |
| Fatwa and Legislation Department | Legal soundness of terms | High on drafting | Clear positions, precedents |
| Project company (IPP) + sponsors | Return, bankability, schedule | High | Fair, timely decisions; predictable counterpart |
| EPC, O&M, BESS OEM | Margin, scope clarity | Medium (through IPP) | Clear requirements; fast reviews via the IPP |
| Lenders + LTA | Debt repayment | High at financial close | Robust PPA, credible grid date |
| KISR | Data, research, technical credibility | Medium | Access to ground data; collaboration on performance |
| Environment Public Authority, civil defence and fire authorities, labour authority | Permits, safety, labour rules | High on their permits | Early engagement; compliant submissions |
| Kuwaiti local partners, community, media | Local value, jobs, reputation | Medium | Credible local content and Kuwaitisation reporting |

**Engagement rule of thumb:** manage closely those with high power and high interest (leadership, KAPP, transmission, the IPP); keep satisfied those with high power and episodic interest (Higher Committee, Audit Bureau, Fatwa); keep informed the rest — and never let the Audit Bureau or the minister be the last to know something.`,
        },
        {
          kind: "callout",
          tone: "kuwait",
          title: "Real context the scenario borrows",
          md: md`MEWRE procures grid works directly through conventional public tenders — the Shagaya–Al-Wafra 400 kV overhead line was awarded in March 2026 for about KD 48.6 m, separately from the IPP. MEWRE has also announced a 1–1.5 GW / 4–6 GWh BESS programme. The 2026 amendment to the Public Tenders Law (Law 94/2026) tightens local-content rules and bans agents in public contracting from about late December 2026 — relevant to MEWRE's own grid, consultancy and O&M support contracts around the IPP.`,
        },
        { kind: "sources", refs: ["m15-megaproject-400kv", "m15-agbi-2025-11-bess", "m15-tamimi-2026-tenders"] },
        {
          kind: "callout",
          tone: "pitfall",
          title: "The three classic offtaker-PM mistakes",
          md: md`1. **Acting like the EPC's employer.** Instructing the contractor directly ("move that crane", "use that supplier") creates a variation for which MEWRE may pay and blurs liability. Act through the PPA and the project company.
2. **Treating MEWRE-side interfaces as "someone else's".** Land handover, the 400 kV line, protection settings and energisation permits are MEWRE's obligations. When they slip, MEWRE pays deemed energy or grants extensions.
3. **Letting the file go stale.** Decisions made in meetings but not recorded in letters, minutes and approval memos cannot be defended at the Audit Bureau three years later.`,
        },
        {
          kind: "md",
          md: md`### Rules of the capstone simulation

The simulation runs from pre-tender to COD and handover in **8 stages** and **27 decisions**. Each decision has 3–4 options. Each option:

- changes six KPIs (shown live in the side panel), and
- carries a hidden **decision-quality score** from 0 to 10 — what an experienced MEWRE PM panel would give that choice, regardless of luck.

| KPI | Starts at | Target | Better |
|---|---|---|---|
| Forecast cost at completion (whole-project capex plus MEWRE claims and deemed-energy exposure) | USD 720 m | ≤ 760 | lower |
| Days to COD from RFP issue | 1,200 | ≤ 1,260 | lower |
| Quality / technical integrity index | 70 | ≥ 85 | higher |
| Stakeholder trust index | 60 | ≥ 80 | higher |
| Safety performance index | 80 | ≥ 90 | higher |
| Energy yield vs P50 | 100 % | ≥ 100 % | higher |

**Scoring:** 50 % from the mean KPI score at the end, 50 % from the mean decision quality (formulas in lesson 2). Hitting a target earns full marks for that KPI; beating it earns nothing extra.

**How effects work:** an option's KPI effects represent its **expected lifecycle consequence**, not just this month's. A shortcut that saves USD 10 m today but triggers a USD 25 m claim later shows up as a net cost increase. Several options look cheap or fast on the surface — read the effect after you commit, then read the feedback to see why.

**Approach:** for each decision ask the five questions in the pre-briefing (lesson 2): what does the contract say, who owns this risk, what does each KPI lose or gain over the life of the project, what would the Audit Bureau see in the file, and what does safety demand.`,
        },
        {
          kind: "checklist",
          title: "Day-one brief checklist for NAJM-1000",
          items: [
            "Read the PPA's COD conditions, test schedules, LD regime, deemed-energy clause and notice provisions before anything else.",
            "Map every MEWRE obligation with a date (land, 400 kV line, bay, protection settings, metering, permits) into one interface schedule owned by you.",
            "Confirm the energy yield basis: which dataset, which loss assumptions, which P50/P90 method, who reviewed it.",
            "Get the approval path and expected durations from KAPP in writing; add float for each control body.",
            "Agree the OE's scope: design review, factory audits, test witnessing, grid compliance, monthly reporting.",
            "Set up the decision log and correspondence register that the Audit Bureau will eventually read.",
            "Meet the transmission sector lead and the system control lead in week one.",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask in the first meeting with the project company",
          items: [
            "Which resource dataset and soiling assumption underpin your P50, and has the LTA reviewed them?",
            "What is your critical path from financial close to COD, and which MEWRE dates sit on it?",
            "Where are the 400/33 kV transformers in your procurement plan, and when do they need to be ordered?",
            "What is your module supply chain from polysilicon to module, and what traceability evidence will you provide?",
            "What is your BESS augmentation strategy to hold 1,000 MWh usable at the POI for the PPA term?",
            "What are your heat-stress and lifting-safety plans for the summer construction season?",
          ],
        },
        { kind: "scenario", scenario: "m15-s1" },
        {
          kind: "feynman",
          prompt: "Explain to a newly appointed MEWRE director, in under two minutes, what NAJM-1000 is, who carries which risks, and what MEWRE's PM actually controls.",
          keyPoints: [
            "1 GWac SAT PV + 250 MW / 1,000 MWh BESS, about 2.9 TWh/yr, 30-year PPA with MEWRE as offtaker",
            "Procured by KAPP as an IPP; Higher Committee and State Audit Bureau approvals sit on the critical path",
            "Project company carries build, yield and performance risk; MEWRE carries grid connection, land and dispatch risk and pays deemed energy if it is late",
            "Two-part tariff: energy charge for PV energy plus capacity charge for the BESS, about KWD 21 m/yr (illustrative)",
            "The PM manages the PPA and MEWRE-side interfaces through the Owner's Engineer, not by directing the EPC",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m15-l01-q1",
      type: "mcq",
      prompt: md`On NAJM-1000, the EPC contractor's site manager asks you, MEWRE's PM, to approve a change of pile type to save three weeks. What is the correct channel?`,
      options: [
        "Approve it on site — saving three weeks helps MEWRE's summer capacity",
        "Refuse to discuss it; the EPC is not MEWRE's contractor",
        "Ask the project company to submit the change formally under the PPA's design review procedure, with the OE's technical review, and respond through the PPA channel",
        "Forward it to KAPP for a decision",
      ],
      answer: 2,
      explanation: md`MEWRE has no contract with the EPC. A direct instruction could make MEWRE liable for the consequences and blurs the project company's responsibility. Refusing to talk is also wrong — you want early visibility. The right move is to route it through the project company under the PPA's review rights, with the OE checking the engineering (pile pull-out, corrosion). KAPP runs procurement; it does not approve design changes.`,
      concepts: ["m15.offtaker-pm-role", "m15.contract-stack"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m15-l01-q2",
      type: "numeric",
      prompt: md`A bidder claims year-1 P50 energy of **3,250 GWh** for a 1,000 MWac plant. What AC capacity factor does that imply, in percent?`,
      answer: 37.1,
      unit: "%",
      tolerance: { abs: 0.3 },
      explanation: md`$\text{CF} = 3{,}250{,}000 / (1{,}000 \times 8{,}760) = 0.371$ = 37.1 %. For SAT at DC/AC 1.3 in Kuwait conditions 30–34 % is typical. 37 % implies a much higher DC/AC ratio, an optimistic dataset, low soiling or omitted losses — all worth a formal clarification through KAPP before evaluation.`,
      concepts: ["m15.energy-yield-basis"],
      difficulty: 2,
    },
    {
      id: "m15-l01-q3",
      type: "multi",
      prompt: md`Which of these are **MEWRE's** obligations (and therefore MEWRE's risk) on NAJM-1000? Select all that apply.`,
      options: [
        "Completing the 400 kV transmission line and substation bay by the interface date",
        "Achieving the guaranteed performance ratio at the COD test",
        "Issuing protection settings and energisation permits on time",
        "Ordering the 400/33 kV plant transformers",
        "Paying invoices under the PPA on time",
      ],
      answer: [0, 2, 4],
      explanation: md`The line and bay, protection settings and energisation permits, and timely payment are MEWRE's. Performance at the COD test and the plant transformers are the project company's (flowed down to its EPC). Knowing exactly where the boundary sits is how you avoid paying for someone else's risk — and how you avoid being blindsided when your own side slips.`,
      concepts: ["m15.grid-interface", "m15.contract-stack"],
      difficulty: 1,
    },
    {
      id: "m15-l01-q4",
      type: "order",
      prompt: md`Put the typical KAPP IPP steps in order.`,
      items: [
        "KAPP feasibility study and Higher Committee approval",
        "RFQ and prequalification",
        "RFP with technical then financial bid opening",
        "Preferred bidder and Higher Committee approval",
        "State Audit Bureau review",
        "PPA signing",
        "Financial close",
      ],
      explanation: md`This sequence (synthesised from sources on Kuwaiti PPPs) is the backbone of every schedule. The approval steps after preferred-bidder selection are where Shagaya Zone 1 slipped in 2026 — plan float there and prepare the Audit Bureau pack before you need it.`,
      concepts: ["m15.ipp-structure"],
      difficulty: 1,
    },
    {
      id: "m15-l01-q5",
      type: "mcq",
      prompt: md`Why does NAJM-1000 use a two-part tariff (energy charge + BESS capacity charge) rather than one blended price per kWh?`,
      options: [
        "Because KAPP law requires two-part tariffs",
        "So that the BESS is paid for available, tested capacity in the evening rather than hidden inside an energy price that rewards midday export",
        "Because batteries generate energy and must be paid separately",
        "To reduce the total payment to the project company",
      ],
      answer: 1,
      explanation: md`A blended energy price pays the same for a midday kWh as for an evening kWh, so a developer could under-use or under-maintain the battery and still earn. A capacity charge tied to demonstrated MW-for-4-hours with availability deductions pays for what MEWRE actually needs: evening capacity. Batteries store energy; they do not generate it. No law requiring two-part tariffs was found.`,
      concepts: ["m15.tariff-structure"],
      difficulty: 2,
    },
    {
      id: "m15-l01-q6",
      type: "decision",
      prompt: md`Week one. The transmission sector tells you informally that the 400 kV line contractor "might be a few months late". What do you do first?`,
      options: [
        { text: "Wait for formal confirmation before acting — it may be rumour", score: 0.2, feedback: "By the time it is formal, the cheap mitigations are gone. Informal early warnings are the most valuable information a PM gets." },
        { text: "Get the line contractor's current programme and critical path from transmission, quantify MEWRE's deemed-energy exposure, put it on the risk register and agree a joint recovery review this week", score: 1, feedback: "Right: verify, quantify, own it and start mitigation. You will also need to decide when to notify the project company under the PPA — but with facts." },
        { text: "Immediately write to the project company warning them of a delay", score: 0.5, feedback: "Notice may be required, but sending it before you know the size of the delay can trigger claims and alarm lenders. Verify first, then notify per the PPA." },
        { text: "Escalate to the minister", score: 0.3, feedback: "Premature escalation without facts or options burns credibility. Leadership needs a quantified issue and a recommendation." },
      ],
      explanation: md`The interface is MEWRE's risk. The PM's job is to turn a rumour into a quantified, owned risk with a mitigation plan — then notify and escalate on facts.`,
      concepts: ["m15.grid-interface", "m15.offtaker-pm-role"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m15-l01-f1", front: "NAJM-1000 scope in one line", back: "1,000 MWac / 1,300 MWp bifacial single-axis tracker PV + 250 MW / 1,000 MWh LFP BESS, plant 400/33 kV substation, 30-year PPA with MEWRE (training scenario).", concepts: ["m15.ipp-structure"] },
    { id: "m15-l01-f2", front: "NAJM-1000 P50 year-1 energy and capacity factor", back: "≈ 2,900 GWh/yr at the POI; ≈ 33 % AC capacity factor.", concepts: ["m15.energy-yield-basis"] },
    { id: "m15-l01-f3", front: "NAJM-1000 base-case capex", back: "≈ USD 720 m (≈ KWD 222 m at 3.25 USD/KWD): PV EPC ≈ 468, BESS ≈ 200, 400 kV substation ≈ 35, owner's costs ≈ 17.", concepts: ["m15.tariff-structure"] },
    { id: "m15-l01-f4", front: "Two parts of the NAJM-1000 tariff", back: "Energy charge per delivered PV MWh (≈ 5.0 fils/kWh, illustrative) + BESS capacity charge per MW-month against tested availability (≈ KWD 2,300/MW-month, illustrative).", concepts: ["m15.tariff-structure"] },
    { id: "m15-l01-f5", front: "Deemed energy — one sentence", back: "Payment by the offtaker for energy the plant could have delivered but was prevented from delivering by offtaker-caused grid unavailability or curtailment beyond an allowance.", concepts: ["m15.grid-interface"] },
    { id: "m15-l01-f6", front: "Who does MEWRE's PM act through to influence the EPC?", back: "The project company, under the PPA's rights (reviews, tests, notices), with the Owner's Engineer for technical review — never by instructing the EPC directly.", concepts: ["m15.offtaker-pm-role"] },
    { id: "m15-l01-f7", front: "Back-to-back principle", back: "Each obligation the project company owes under the PPA is flowed down to the contractor best able to manage it, with matching LDs and time-bars, so no risk falls through gaps.", concepts: ["m15.contract-stack"] },
    { id: "m15-l01-f8", front: "Capstone KPIs and targets", back: "Cost ≤ USD 760 m; days to COD ≤ 1,260; quality ≥ 85; trust ≥ 80; safety ≥ 90; yield ≥ 100 % of P50. Score = 50 % KPIs + 50 % decision quality.", concepts: ["m15.stakeholder-map"] },
  ],
  scenarios: [
    {
      id: "m15-s1",
      title: "First week on NAJM-1000",
      dayInLife: true,
      context: md`You joined MEWRE's renewables sector on Sunday. By Tuesday you have the NAJM-1000 file: the KAPP RFP is in preparation, your director wants a one-page status by Thursday, and three people have asked for meetings.`,
      start: "a",
      concepts: ["m15.stakeholder-map", "m15.offtaker-pm-role"],
      nodes: {
        a: {
          md: md`Your calendar for Wednesday has room for **one** two-hour meeting before the Thursday brief. Who do you see?`,
          choices: [
            { text: "MEWRE's transmission sector lead, to understand the 400 kV line and bay status and dates", next: "b", score: 10, feedback: "The grid interface is MEWRE's biggest risk and the one you directly own. Knowing its real status makes your Thursday brief credible." },
            { text: "The KAPP transaction advisor, to review the draft RFP", next: "b", score: 7, feedback: "Valuable — the RFP is where many later problems are prevented — but the grid status is the fact your director will most need, and KAPP's timetable allows a meeting next week." },
            { text: "A prospective bidder who has asked for a courtesy visit", next: "c", score: 1, feedback: "During a live procurement, private meetings with prospective bidders are a serious integrity risk. All bidder contact goes through KAPP's formal channel." },
          ],
        },
        b: {
          md: md`Transmission says the line is "on track" but cannot show you a current programme. How do you write that in Thursday's brief?`,
          choices: [
            { text: "\"Grid: on track per transmission.\"", score: 3, feedback: "You are now the owner of an unverified claim. If it slips, your brief is the record." },
            { text: "\"Grid: transmission reports on track; updated contractor programme requested by Sunday; until verified, rated amber. Exposure if 4 months late ≈ KWD 4.8 m deemed energy.\"", score: 10, feedback: "Honest status, an action with a date, and a quantified consequence — the format leaders trust." },
            { text: "Leave the grid out until you know more", score: 2, feedback: "Omitting the biggest risk is worse than reporting it with uncertainty." },
          ],
        },
        c: {
          md: md`The bidder's representative offers "background information on what the other bidders are planning". What now?`,
          choices: [
            { text: "End the conversation, document it, and report the contact to your director and KAPP", score: 10, feedback: "Correct: protect the process and yourself. A written record made the same day is your defence." },
            { text: "Listen but don't take notes", score: 0, feedback: "This compromises the procurement and you personally. Bid-related information from a competitor is exactly what an integrity investigation looks for." },
          ],
        },
      },
    },
  ],
};

export default lesson;
