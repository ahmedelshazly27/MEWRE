import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m06-l04",
  title: "Interconnection Studies, Hosting Capacity and Curtailment",
  summary:
    "The study set that proves a plant can connect — load flow, short circuit, transient stability, EMT, harmonics and protection coordination — who performs and reviews them with which tools, how hosting capacity and N-1 limits are found, and how curtailment is classified and compensated through deemed energy in the PPA.",
  minutes: 80,
  objectives: [
    "You can state what each interconnection study answers, its inputs, tools and acceptance criteria",
    "You can run a first-pass N-1 thermal and voltage check on a renewable export corridor and estimate hosting capacity",
    "You can classify curtailment types and determine which are compensable under a typical IPP PPA",
    "You can compute deemed energy and compensation above an allowance, and identify the estimation disputes",
    "You can manage the study process between developer, consultant and MEWRE Transmission",
  ],
  concepts: [
    {
      id: "m06.load-flow",
      name: "Load-flow (power-flow) studies and N-1",
      description: "Steady-state voltages, line/transformer loadings, losses and reactive capability across load/generation scenarios and contingencies.",
      competency: "grid",
      related: ["m06.hosting-capacity"],
    },
    {
      id: "m06.dynamic-studies",
      name: "Short-circuit, stability and EMT studies",
      description: "IEC 60909 fault levels; RMS transient/frequency/voltage stability; EMT for weak-grid control interaction, resonance, switching; harmonics; protection coordination.",
      competency: "grid",
      related: ["m06.load-flow"],
    },
    {
      id: "m06.study-governance",
      name: "Study process and governance",
      description: "Developer's consultant performs studies with TSO data and models (PSS/E, PowerFactory, PSCAD); TSO reviews, may run system-wide studies; results set connection conditions.",
      competency: "grid",
      related: ["m06.dynamic-studies"],
    },
    {
      id: "m06.hosting-capacity",
      name: "Hosting capacity",
      description: "Maximum generation a node/corridor accepts without violating thermal, voltage, fault-level, power-quality or stability limits, normally under N-1.",
      competency: "grid",
      related: ["m06.load-flow", "m06.curtailment"],
    },
    {
      id: "m06.curtailment",
      name: "Curtailment types",
      description: "Grid-constraint, system-security, oversupply/economic, grid unavailability and plant-caused reductions — with different compensation treatment.",
      competency: "contracts",
      related: ["m06.deemed-energy"],
    },
    {
      id: "m06.deemed-energy",
      name: "Deemed energy compensation",
      description: "PPA mechanism paying the IPP for energy it could have delivered but for offtaker/grid events, estimated by an agreed method, often above an allowance.",
      competency: "contracts",
      related: ["m06.curtailment"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "The study set and what each one proves",
      blocks: [
        {
          kind: "md",
          md: md`Before a gigawatt plant connects, the system operator needs evidence that the network can carry its power in every credible condition, that equipment ratings are respected, that the plant behaves stably during disturbances, and that it will not pollute power quality or confuse protection. Each study answers one of those questions.

| Study | Question it answers | Typical tool | Key inputs | Acceptance criteria |
|---|---|---|---|---|
| **Load flow (steady state)** | Do voltages and loadings stay within limits in normal (N) and contingency (N-1, sometimes N-1-1) conditions? Can the plant meet its Q capability at the POI? | PSS/E, PowerFactory | Network model, load/generation scenarios (summer peak, midday min load, night), ratings at 50 °C | Voltages within e.g. 0.95–1.05 pu (N), 0.90–1.10 (N-1); loading ≤ 100 % of seasonal rating |
| **Short circuit** | Max fault levels vs equipment ratings; min fault levels for protection and SCR | IEC 60909 in PowerFactory/ETAP/PSS/E | Source impedances, transformer data, IBR contribution | Below breaker/busbar ratings with margin; min level adequate for protection |
| **Transient (RMS) stability** | Does the system stay stable for faults/trips? Does the plant ride through? | PSS/E, PowerFactory (validated generic/OEM models) | Dynamic models, protection clearing times | Angle and voltage recovery; frequency within limits; no plant tripping |
| **EMT** | Weak-grid control interaction, resonance, energisation transients, sub-synchronous interaction, detailed FRT | PSCAD/EMTDC, PowerFactory EMT | OEM black-box EMT models, detailed network | Damped responses, no instability at minimum SCR |
| **Harmonics** | Emission and resonance (frequency scan) at the POI | PowerFactory, PSCAD | Inverter harmonic spectra, cable data, background | Allocated limits (IEEE 519 / IEC TR 61000-3-6) |
| **Protection coordination** | Do relays detect and clear faults selectively with IBR's limited fault current? | Relay-setting tools, PowerFactory, ETAP | Fault study results, relay characteristics | Selectivity, clearing times, no mal-operation |
| **Insulation coordination / TOV** | Over-voltages from switching/lightning | EMT | Arresters, BIL | Within BIL with margin |

Studies are iterative: load flow fixes the transformer and reactive equipment, which changes short-circuit and stability results, which may change protection.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why the summer midday and the winter midday are both critical",
          md: md`In Kuwait, summer midday has high load (~17.5 GW) and maximum PV, so PV mostly feeds local load. **Winter midday** (much lower load, still strong sun) is when large PV exports can overload corridors, push voltages up and displace most thermal units (low inertia, low fault level). Studies must cover both, plus the evening peak with BESS discharging.`,
        },
        { kind: "sources", refs: ["m06-kuwaittimes-peak-2026", "m06-pss-e", "m06-powerfactory", "m06-pscad", "m06-iec-61000-3-6"] },
        {
          kind: "md",
          md: md`### Thermal and voltage limits on a corridor

A line's thermal limit is a current; at nominal voltage that is an MVA limit, which falls on hot days because conductors are already at high ambient temperature:`,
        },
        { kind: "equation", formula: "m06-apparent-power-3ph" },
        {
          kind: "md",
          md: md`Voltage along the corridor depends on P and Q flow:`,
        },
        { kind: "equation", formula: "m06-voltage-sensitivity" },
        {
          kind: "md",
          md: md`On EHV lines $X/R \approx 10$–15, so exporting P raises the sending-end voltage modestly while Q dominates; a plant can hold voltage by absorbing Q roughly equal to $P \cdot R/X$.

### Hosting capacity

Hosting capacity is the largest generation a node or corridor accepts with **all** limits respected under N-1: thermal (lines, transformers), voltage (steady state and step changes), fault level (ratings and minimum SCR), power quality, and stability. The binding limit differs by location: thermal on long radial corridors (like a desert solar park connected by a few 400 kV circuits), SCR at weak nodes, voltage at the end of long lines. Planning tools compute it by incrementally adding generation and re-running contingencies.

When hosting capacity is exceeded, options are: reinforce (new circuit, transformer), add equipment (STATCOM, synchronous condenser), accept **curtailment** under constraint, or use a **special protection scheme (SPS)** / generation runback that trips or ramps down plants after a contingency (fast, cheap, but adds operational risk).

### Curtailment — types and compensation

| Type | Cause | Typical PPA treatment |
|---|---|---|
| **Grid constraint** | Thermal/voltage limit, often after a line outage | Compensable (deemed energy), sometimes above an annual allowance |
| **System security** | Too little inertia/SCR, frequency control, voltage stability | Usually compensable; may be in an allowance |
| **Oversupply / economic** | Must-run thermal or water production limits, low load | Depends on PPA: often compensable for a take-or-pay PPA; some PPAs include an uncompensated allowance |
| **Grid unavailability** | Planned/forced outage of offtaker's network; **late grid connection** | Compensable (deemed energy from scheduled connection date) |
| **Emergency (system-wide)** | Black-out, emergency instructions | May be force majeure — check definitions |
| **Plant-caused** | IPP equipment failure, non-compliance | **Not** compensable |

The compensable energy is estimated as **deemed energy**:`,
        },
        { kind: "equation", formula: "m06-deemed-energy" },
        { kind: "equation", formula: "m06-curtailment-payment" },
        {
          kind: "callout",
          tone: "unverified",
          title: "Kuwaiti PPA terms not public",
          md: md`Kuwait's solar IPPs use a **30-year PPA with MEWRE** (confirmed in our sources). The curtailment allowance, deemed-energy method, grid-unavailability provisions, PPA currency and indexation were **not found** in public sources (RESEARCH.md open question 11). The structures in this lesson are typical of Gulf and international IPP PPAs (see the World Bank PPP Legal Resource Center), not confirmed Kuwaiti terms.`,
        },
        { kind: "sources", refs: ["m06-agbi-zone1-rfp", "m06-wb-ppa"] },
      ],
    },
    {
      layer: "applied",
      title: "Corridor capacity, voltage and deemed energy",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Can one double-circuit 400 kV line export Shagaya's solar under N-1?",
          given: md`A desert solar park exports through one double-circuit 400 kV line. Each circuit's summer rating is **2.5 kA**. Planned connections: a 1,100 MW plant and a 500 MW plant, both able to operate at 0.95 PF at the POI. A later phase of ~1,700 MW is proposed. Local load at the park is negligible. (Illustrative values — actual ratings of the Shagaya–Al-Wafra line were not available.)`,
          steps: [
            { md: md`**Circuit rating**: $S = \sqrt3 \times 400 \times 2.5 = 1{,}732$ MVA per circuit.` },
            { md: md`**Worst-case export** of 1,600 MW at 0.95 PF: $S = 1{,}600/0.95 = 1{,}684$ MVA.` },
            { md: md`**N (both circuits)**: 842 MVA each — 49 % loading. ✓` },
            { md: md`**N-1 (one circuit out)**: 1,684 MVA on the remaining circuit — 97 % loading. ✓ but with only 3 % margin, and only if the hot-day rating truly is 2.5 kA.` },
            { md: md`**Adding the ~1,700 MW phase**: 3,300 MW → ≥ 3,300 MVA (unity PF) against 1,732 MVA under N-1: **N-1 fails by ~1,600 MVA**. Even under N (3,464 MVA capacity) loading would be ~95 % at unity PF.` },
            { md: md`**Options**: second double-circuit line or a second route (best, long lead), SPS that runs back ~1,600 MW within seconds of a circuit trip (cheap, operational risk, curtailment cost), or co-located BESS absorbing part of the export.` },
          ],
          result: md`The first 1.6 GW fits within N-1 with almost no margin; further phases need new transmission or a runback scheme with curtailment exposure. This is why MEWRE's transmission planning must lead renewable procurement by several years — and why the research brief identifies grid works as the critical path.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Deemed energy for a curtailment day, and the annual bill",
          given: md`A 1,100 MW plant is instructed by the control centre to cap output at 600 MW from 10:00 to 15:00 due to a line outage (grid constraint, compensable). The agreed estimation method (reference inverters plus irradiance model) gives an average available power of 950 MW over the period. Over the year, such events total 70 GWh of deemed energy. The PPA has an uncompensated allowance of 1 % of annual P50 energy (2,400 GWh). Use an **illustrative** tariff of USD 13/MWh (Gulf PV IPPs have bid ~USD 10–17/MWh; Kuwait's tariff is not public).`,
          steps: [
            { md: md`Curtailed power: $950 - 600 = 350$ MW for 5 h.` },
            {
              md: md`Deemed energy for the day: $350 \times 5 = 1{,}750$ MWh.`,
              hidden: true,
              check: { prompt: "Deemed energy for the event", answer: 1750, unit: "MWh", tolerance: { rel: 0.01 } },
            },
            { md: md`Allowance: $0.01 \times 2{,}400 = 24$ GWh.` },
            {
              md: md`Compensable above allowance: $70 - 24 = 46$ GWh → $46{,}000 \times 13 = $ USD 598,000 for the year.`,
              hidden: true,
              check: { prompt: "Annual compensation", answer: 598000, unit: "USD", tolerance: { rel: 0.01 } },
            },
          ],
          result: md`About USD 0.6 m/yr at this tariff — small per year, but recurring for decades and scaling with every constrained gigawatt. The bigger exposure is a **late grid connection**: deemed energy for a whole plant for months (lesson 1 scenario). The PM's leverage is in the estimation method (agreed, auditable, with data access for MEWRE) and in grid planning that avoids constraints.`,
        },
        {
          kind: "question",
          question: {
            id: "m06-l04-p1",
            type: "numeric",
            prompt: md`A 400 kV, 100 km line has R = 3 Ω and X = 30 Ω (on a 100 MVA base: r = 0.001875 pu, x = 0.01875 pu). A plant at the far end injects 1,100 MW (11 pu). Using $\Delta v \approx r\,p + x\,q$, how many Mvar must the plant **absorb** for zero voltage change along the line?`,
            answer: 110,
            unit: "Mvar",
            tolerance: { rel: 0.01 },
            explanation: md`Set $0 = r p + x q$ → $q = -r p/x = -0.1 \times 11 = -1.1$ pu = −110 Mvar (absorbing). With X/R = 10 the plant absorbs ~10 % of its MW to hold voltage — well inside a ±0.33 Pmax capability, which is why voltage control at large PV plants often runs slightly under-excited at full output.`,
            concepts: ["m06.load-flow"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running the study process and managing curtailment",
      blocks: [
        {
          kind: "md",
          md: md`### Who performs and who decides

- **Developer's grid consultant** (for an IPP) or **MEWRE's consultant** (for a MEWRE-procured BESS) performs the plant-specific studies, using MEWRE's network model and data under a confidentiality agreement, and the inverter OEM's validated models.
- **MEWRE Transmission / planning** provides network data and study scenarios, reviews results, may run system-wide studies (multiple plants, GCCIA flows), and issues connection conditions. In many TSOs the TSO itself runs the integrated studies; the division of work in Kuwait is **not publicly documented** — agree it in writing at project start.
- **OE / LTA** reviews for the employer or lenders; **inverter OEM** supports EMT models and tuning.

### A practical study timeline (IPP)

| Stage | Studies | Owner |
|---|---|---|
| Pre-tender (transaction advisor / MEWRE) | Preliminary load flow and SC for the connection concept; hosting capacity of the corridor | MEWRE / advisor |
| Bid | Plant concept: reactive capability at POI at 50 °C, SC contribution, preliminary harmonics | Bidder |
| Post-award (design) | Full set: LF, SC, RMS, EMT, harmonics, protection, insulation coordination | IPP consultant → MEWRE review |
| Pre-energisation | Final studies with as-built data and final firmware; protection settings | IPP → MEWRE approval |
| Post-COD | Model validation against measured events; updates after changes | IPP/MEWRE |`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- Network data handed over late, or an outdated model (missing recent stations) — studies redone at design stage.
- Generic inverter models in the bid; OEM EMT model arrives after protection settings are frozen.
- Only summer-peak scenarios studied; winter-midday export constraints discovered after COD.
- Each plant studied alone; combined effect of neighbouring plants (WSCR, cumulative harmonics) missed.
- Deemed-energy method vague ("as reasonably estimated by the Seller") → annual disputes.
- Curtailment instructions given verbally; no time-stamped record of cause and duration.`,
        },
        {
          kind: "checklist",
          title: "PM checks: studies and curtailment",
          items: [
            "Study scope, scenarios (summer peak, winter midday, evening with BESS, N-1) and criteria agreed with MEWRE Transmission in writing",
            "Network data and model version controlled; NDA in place",
            "OEM-validated RMS and EMT models used; firmware version stated",
            "Cumulative studies with neighbouring and planned plants (Zones 1, 2, G2G phases)",
            "Hosting capacity of the corridor known before tendering further phases",
            "PPA: curtailment categories, allowance, deemed-energy estimation method (reference inverters, met stations, model), data access and audit rights",
            "Control-centre curtailment instructions logged electronically with cause codes",
          ],
        },
        {
          kind: "ask",
          title: "Ask the contractor / consultant",
          items: [
            "Which network model version and which scenarios did you study, and who at MEWRE approved them?",
            "What is the minimum SCR at the POI under N-1, and did you run EMT at that condition?",
            "How did you model neighbouring plants and future phases?",
            "Which reference inverters and irradiance sensors will feed the available-power estimate, and how are they kept unbiased (not curtailed, clean)?",
            "What runback or SPS actions does your plant support, and how fast?",
          ],
        },
        { kind: "scenario", scenario: "m06-s4" },
        {
          kind: "feynman",
          prompt: "Explain to the Audit Bureau why MEWRE paid a solar IPP for electricity it never delivered.",
          keyPoints: [
            "The PPA allocates grid risk to the offtaker: if MEWRE's grid or instructions prevent delivery, the IPP is compensated",
            "This lowers the tariff because bidders do not price grid risk they cannot control",
            "Payment is for deemed energy estimated by an agreed, auditable method",
            "Only offtaker/grid-caused curtailment is paid, often above an allowance; plant faults are not",
            "The way to reduce payments is timely grid investment and good planning",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m06-l04-q1",
      type: "mcq",
      prompt: md`Which study would you rely on to detect control interaction and oscillation risk for a large inverter plant at a weak (low-SCR) node?`,
      options: ["Load flow", "IEC 60909 short circuit", "EMT (electromagnetic transient) study", "Economic dispatch"],
      answer: 2,
      explanation: md`RMS models average out fast inverter dynamics; EMT (PSCAD or equivalent) with OEM models captures PLL and current-control interactions, resonance and fast transients.`,
      concepts: ["m06.dynamic-studies"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m06-l04-q2",
      type: "numeric",
      prompt: md`A 400 kV circuit has a summer rating of 2.2 kA. What is its MVA rating?`,
      answer: 1524.2,
      unit: "MVA",
      tolerance: { rel: 0.01 },
      explanation: md`$\sqrt3 \times 400 \times 2.2 = 1{,}524$ MVA. Seasonal ratings matter: a 50 °C summer rating can be 10–20 % below the winter rating.`,
      concepts: ["m06.load-flow", "m06.hosting-capacity"],
      difficulty: 1,
    },
    {
      id: "m06-l04-q3",
      type: "multi",
      prompt: md`Under a typical IPP PPA, which reductions are normally compensable as deemed energy? (Select all.)`,
      options: [
        "Curtailment due to a transmission line outage",
        "Delay of the offtaker's grid connection beyond the scheduled date",
        "Inverter failures inside the plant",
        "Curtailment to maintain system frequency security",
        "Plant tripping because it failed FRT requirements",
      ],
      answer: [0, 1, 3],
      explanation: md`Offtaker/grid-caused events are compensated (sometimes above an allowance). Plant-caused losses — equipment failures or non-compliance — are the IPP's risk.`,
      concepts: ["m06.curtailment", "m06.deemed-energy"],
      difficulty: 2,
    },
    {
      id: "m06-l04-q4",
      type: "order",
      prompt: md`Order the typical interconnection study flow for an IPP after award.`,
      items: [
        "Agree scope, scenarios and data with MEWRE Transmission",
        "Load flow and short-circuit studies (size transformers and reactive equipment)",
        "RMS stability and EMT studies with OEM-validated models",
        "Harmonic and protection-coordination studies",
        "Final studies with as-built data and settings; MEWRE approval before energisation",
      ],
      explanation: md`Steady-state results size the equipment that the dynamic, harmonic and protection studies then verify; everything is re-confirmed with as-built data before energisation.`,
      concepts: ["m06.study-governance"],
      difficulty: 2,
    },
    {
      id: "m06-l04-q5",
      type: "decision",
      prompt: md`The draft PPA says deemed energy will be "as reasonably estimated by the Seller using its monitoring system". What do you request?`,
      options: [
        { text: "Accept — the Seller has the data.", score: 0, feedback: "One-sided estimation guarantees disputes and over-payment risk." },
        { text: "Define the method: designated reference inverters kept uncurtailed, calibrated met stations, an agreed model and loss assumptions, MEWRE real-time data access and audit rights, and a dispute procedure via an independent engineer.", score: 1, feedback: "Correct — objective, auditable, agreed in advance." },
        { text: "Delete deemed energy from the PPA.", score: 0.1, feedback: "Bidders would price the grid risk into the tariff (or not bid). Allocate and define, don't delete." },
      ],
      explanation: md`Deemed energy is fair risk allocation; the money is in the estimation method. Make it objective and auditable.`,
      concepts: ["m06.deemed-energy"],
      difficulty: 2,
    },
    {
      id: "m06-l04-q6",
      type: "numeric",
      prompt: md`Over a year, compensable curtailment totals 55 GWh. The PPA allows 2 % of 2,400 GWh uncompensated. Tariff USD 15/MWh (illustrative). What does MEWRE pay (USD thousand)?`,
      answer: 105,
      unit: "USD thousand",
      tolerance: { rel: 0.01 },
      explanation: md`Allowance $0.02 \times 2{,}400 = 48$ GWh; excess $55 - 48 = 7$ GWh $= 7{,}000$ MWh; $7{,}000 \times 15 = $ USD 105,000.`,
      concepts: ["m06.deemed-energy"],
      difficulty: 2,
    },
    {
      id: "m06-l04-q7",
      type: "short",
      prompt: md`Why must interconnection studies for a new Shagaya phase include the other planned plants and a winter-midday scenario?`,
      rubric: [
        "Plants share the same corridor and grid strength: cumulative thermal loading, WSCR, harmonics",
        "Winter midday combines low load and high PV: maximum export and minimum thermal units online",
        "Low inertia and fault level at that time affect stability and protection",
        "Studying plants alone overestimates hosting capacity",
      ],
      modelAnswer: md`The phases share the same export corridor and grid strength, so thermal loading, voltage, weighted SCR and harmonic emissions are cumulative; studying one plant alone overstates hosting capacity. Winter midday has low demand but strong sun, so export through the corridor peaks while few thermal units are online — fault level and inertia are lowest. That is when thermal, voltage and stability limits bind.`,
      concepts: ["m06.hosting-capacity", "m06.load-flow"],
      difficulty: 2,
      explanation: md`Hosting capacity is a corridor property, and the binding operating condition is low load with high renewables — not the summer peak.`,
    },
  ],
  flashcards: [
    { id: "m06-l04-f1", front: "What load flow answers", back: "Steady-state voltages, loadings and Q capability in N and N-1 scenarios", concepts: ["m06.load-flow"] },
    { id: "m06-l04-f2", front: "When an EMT study is needed", back: "Weak grid (low SCR), control interaction, resonance, energisation transients, detailed FRT", concepts: ["m06.dynamic-studies"] },
    { id: "m06-l04-f3", front: "Tools: RMS vs EMT", back: "RMS: PSS/E, PowerFactory. EMT: PSCAD/EMTDC (or PowerFactory EMT)", concepts: ["m06.dynamic-studies"] },
    { id: "m06-l04-f4", front: "Hosting capacity definition", back: "Max generation a node/corridor accepts under N-1 without violating thermal, voltage, fault, PQ or stability limits", concepts: ["m06.hosting-capacity"] },
    { id: "m06-l04-f5", front: "Deemed energy formula", back: md`$E = \sum (P_{avail} - P_{actual})\Delta t$`, concepts: ["m06.deemed-energy"] },
    { id: "m06-l04-f6", front: "Who bears grid-caused curtailment in a typical IPP PPA", back: "The offtaker (MEWRE), via deemed energy, sometimes above an allowance", concepts: ["m06.curtailment"] },
    { id: "m06-l04-f7", front: "Critical Kuwaiti study scenario besides summer peak", back: "Winter midday: low load, high PV export, low inertia and fault level", concepts: ["m06.load-flow"] },
    { id: "m06-l04-f8", front: "Q needed for zero voltage change on a line with X/R = 10", back: "Absorb ≈ 10 % of P (q = −r p/x)", concepts: ["m06.load-flow"] },
  ],
  scenarios: [
    {
      id: "m06-s4",
      title: "The curtailment invoice",
      dayInLife: true,
      context: md`You are MEWRE's contract manager for a 1,100 MW solar IPP in its second year. The IPP's quarterly invoice includes 38 GWh of deemed energy for "grid constraints". The control centre's records show curtailment instructions totalling ~24 GWh by its own estimate.`,
      start: "a",
      concepts: ["m06.deemed-energy", "m06.curtailment"],
      nodes: {
        a: {
          md: md`Finance wants to know whether to pay. What do you do first?`,
          choices: [
            { text: "Reconcile event by event: control-centre instruction logs (time, cause, set-point) against the IPP's claim; check each event's category and the estimation inputs (reference inverters, irradiance) per the PPA method.", next: "b", score: 10, feedback: "Right — disputes are resolved event by event, using the PPA's method." },
            { text: "Pay the undisputed 24 GWh and reject the rest.", next: "b", score: 6, feedback: "A sensible interim position if the PPA allows partial payment, but you still need to know why the numbers differ." },
            { text: "Pay the full invoice to avoid a dispute.", next: "c", score: 1, feedback: "Paying unsupported claims is an audit finding waiting to happen." },
          ],
        },
        b: {
          md: md`The reconciliation finds: (1) 6 GWh claimed for periods when the plant had its own inverter outages (plant-caused); (2) 5 GWh where reference inverters were themselves curtailed, inflating "available power"; (3) 3 GWh of genuine constraints missing from the control-centre log because instructions were given by phone.`,
          choices: [
            { text: "Reject (1); recalculate (2) with valid reference data or the irradiance fallback in the PPA; accept (3) with evidence; fix the control-centre logging process; document everything for audit.", next: "d", score: 10, feedback: "Fair to both sides and fixes the root causes." },
            { text: "Reject everything not in the control-centre log, including (3).", next: "d", score: 4, feedback: "Phone instructions are MEWRE's process failure; refusing valid claims invites a dispute MEWRE may lose." },
          ],
        },
        c: {
          md: md`The Audit Bureau's review a year later questions the payments; the PPA required instruction records that MEWRE cannot produce.`,
          choices: [
            { text: "Commission a retrospective reconciliation and fix logging.", score: 3, feedback: "Necessary, but recovering over-payments is now harder." },
          ],
        },
        d: {
          md: md`The settled figure is 27 GWh. The director asks how to reduce constraint payments structurally.`,
          choices: [
            { text: "Feed the constraint data into transmission planning (reinforcement case), consider a co-located BESS to absorb constrained energy, and tighten estimation/logging procedures in future PPAs.", score: 10, feedback: "Excellent — turns a dispute into a planning signal." },
            { text: "Ask the IPP to accept lower tariffs.", score: 1, feedback: "The PPA is binding; this is not a lever." },
          ],
        },
      },
    },
  ],
};

export default lesson;
