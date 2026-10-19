import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m07-l03",
  title: "Design Stages, Design Review & the Owner's Engineer",
  summary:
    "Concept, basic/FEED and detailed design for PV+BESS; what the Owner's Engineer does; how design review with codes A/B/C really works; and the key deliverables — layout, SLD, cable sizing, earthing, PVsyst, protection settings and grid studies — with hot-climate cable calculations.",
  minutes: 75,
  objectives: [
    "You can describe what is decided at concept, basic (FEED) and detailed design and what each stage freezes",
    "You can explain the Owner's Engineer role on EPC and IPP projects and how it differs from the Engineer under FIDIC and the lenders' technical advisor",
    "You can run a design review process using review codes A/B/C and a comment-response sheet",
    "You can check DC voltage drop and MV cable derating for Kuwaiti conditions",
    "You can list the key PV+BESS design deliverables and the review questions for each",
  ],
  concepts: [
    {
      id: "m07.design-stages",
      name: "Design stages",
      description:
        "Concept → basic/FEED → detailed design, each narrowing options and freezing parameters (design basis, layout, equipment ratings) so procurement and construction can proceed.",
      competency: "delivery",
      related: ["m07.design-review"],
    },
    {
      id: "m07.owners-engineer",
      name: "Owner's Engineer",
      description:
        "Independent technical consultant acting for the employer/owner: reviews design, witnesses tests, monitors quality and progress, and advises on technical claims.",
      competency: "delivery",
    },
    {
      id: "m07.design-review",
      name: "Design review and review codes",
      description:
        "Structured review of contractor submittals with status codes (A approved/no objection, B approved with comments, C rejected — revise and resubmit) tracked in a document register.",
      competency: "risk",
    },
    {
      id: "m07.cable-sizing",
      name: "Cable sizing and derating",
      description:
        "Choosing conductor sizes so that current rating after temperature, soil resistivity and grouping derating exceeds load, and voltage drop/losses stay within limits.",
      competency: "engineering",
    },
    {
      id: "m07.grid-studies",
      name: "Grid compliance studies",
      description:
        "Load flow, short circuit, reactive capability, harmonics, stability (RMS/EMT) and protection coordination studies proving the plant meets the grid code.",
      competency: "grid",
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "From concept to construction drawings",
      blocks: [
        {
          kind: "md",
          md: md`### The three design stages

| Stage | Main questions | Freezes | Typical outputs | Who (EPC model / IPP model) |
|---|---|---|---|---|
| **Concept** | What plant? Which technology, size, connection? | Capacity (MWac/MWp, MW/MWh), technology family, connection voltage | Concept layout, preliminary SLD, yield estimate, cost class 4 | Feasibility consultant / bidder's proposal |
| **Basic design / FEED** | What exactly will be built, to which requirements? | **Design basis**: site conditions (50 °C+), standards, equipment ratings, block size, DC/AC ratio, BESS architecture, protection philosophy | Design basis report, general arrangement, key SLDs, equipment specs, preliminary grid studies, PVsyst P50/P90 | Employer's consultant (for EPC tenders) / developer's engineer (IPP) |
| **Detailed design** | How is it built, to the last bolt? | Construction drawings, cable schedules, settings | Detailed layouts, cable sizing & schedules, earthing, civil/structural, protection settings, final grid studies, SCADA I/O lists | EPC contractor and its subcontractors |

Two ideas matter most:

1. **The design basis is the contract's technical spine.** Ambient design temperature, soiling, wind speeds, applicable standards, grid code version — once frozen, a change becomes a variation. In Kuwait, the design temperature must reflect reality: the national record is **53.9 °C (Mitribah, 2016)**, so equipment rated to 50 °C without derating data is a real risk.
2. **Late changes are expensive in proportion to how much is built on them.** Changing the inverter model after the cable schedule, earthing study and SCADA I/O list are done cascades through dozens of deliverables.`,
        },
        { kind: "sources", refs: ["m07-wmo-mitribah"] },
        {
          kind: "callout",
          tone: "why",
          title: "Why FEED is worth paying for even under a design-build contract",
          md: md`Under FIDIC Yellow or Silver, the contractor designs. But if the Employer's Requirements are vague ("plant shall comply with good industry practice"), each bidder prices a different plant and the cheapest bid is often the least compliant. A **FEED-level Employer's Requirements** — design basis, performance tests, minimum equipment specs, grid code requirements — makes bids comparable and defines what "complete" means at COD.`,
        },
        {
          kind: "md",
          md: md`### Roles: Owner's Engineer, the Engineer, the Lenders' Technical Advisor

| Role | Acts for | Typical powers | Typical projects |
|---|---|---|---|
| **The Engineer (FIDIC Red/Yellow)** | Named in the contract, appointed by Employer; must act neutrally when making determinations (Clause 3.7 in 2017) | Instructions, review of designs, certificates (payment, taking over), determinations of claims | Ministry-procured EPC (e.g. grid works) |
| **Employer's Representative (FIDIC Silver)** | Employer | Less formal powers; Employer administers | EPC turnkey |
| **Owner's Engineer (OE)** | The owner/employer (not neutral) | Advisory: reviews, witnessing, reports. On an IPP it may review designs for **compliance with the PPA technical requirements and grid interface**, not approve the developer's design | MEWRE on IPP; any owner |
| **Lenders' Technical Advisor / Independent Engineer (LTA/IE)** | Lenders | Due diligence, construction monitoring, sign-off on drawdowns and completion tests | Project-financed IPPs |

On a Kuwait IPP (e.g. Shagaya Phase III zones procured by KAPP with a 30-year PPA to MEWRE), MEWRE's interest is concentrated where the plant meets the grid and where PPA performance is measured: point of interconnection, metering, protection, PPC behaviour, grid compliance tests, and the PR/capacity tests that define COD. The OE is MEWRE's technical eyes there.

### Design review mechanics

Each submittal (drawing, calculation, specification, study) is logged in the document control system (e.g. Aconex) with number, revision, discipline and due date. The reviewer returns it with a status code:

| Code | Meaning | Contractor action |
|---|---|---|
| **A** | Approved / no objection | Proceed; issue for construction |
| **B** | Approved with comments | Proceed incorporating comments; resubmit next revision |
| **C** | Rejected / revise and resubmit | Do not proceed on this item; revise and resubmit |
| (D / I) | For information only / not reviewed | No action |

Comments go in a **comment-response sheet (CRS)**: each comment has a number, reference, severity, the contractor's response and the reviewer's closure. A review is not a design: the reviewer checks **compliance with Employer's Requirements, standards and good practice**, not "how I would have designed it". Under FIDIC 2017 Yellow the Engineer's review period for contractor documents is stated in the contract (21 days by default if not otherwise stated), and if the Engineer does not respond in time the document may be deemed to have received a notice of no-objection — so late review is a real contractual risk.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Review is not design approval of liability",
          md: md`A Code A does **not** transfer design responsibility to the Employer. FIDIC is explicit that the Engineer's review or no-objection does not relieve the contractor of its obligations. Still, write comments carefully: an instruction disguised as a comment ("change the cable to 400 mm²") can become a variation. Comment on non-compliance; let the contractor choose the fix.`,
        },
        {
          kind: "md",
          md: md`### Two calculations every PM should be able to check

**DC string voltage drop.** For a two-conductor DC circuit of one-way length $L$:`,
        },
        { kind: "equation", formula: "m07-dc-voltage-drop" },
        {
          kind: "md",
          md: md`Conductor resistance must be taken at operating temperature, not 20 °C — in Kuwait, module-level DC cables in summer run at 70–90 °C:`,
        },
        { kind: "equation", formula: "m07-conductor-resistance-temp" },
        {
          kind: "md",
          md: md`Typical design limits: DC voltage drop/loss ≤ 1–1.5 % at STC current, AC LV ≤ 1 %, total cable losses ≤ 2–2.5 % — the contract or design basis sets them.

**MV cable derating.** Catalogue current ratings assume IEC 60287 reference conditions (e.g. 20 °C ground, soil thermal resistivity 1.5 K·m/W, single circuit, defined depth). Actual rating:`,
        },
        { kind: "equation", formula: "m07-cable-derating" },
        {
          kind: "md",
          md: md`For XLPE (90 °C maximum conductor temperature) the ground-temperature factor is approximately $k_T = \sqrt{(90 - T_g)/(90 - 20)}$. In Kuwaiti sand at 35 °C ground temperature $k_T \approx 0.89$; with dry sand at 2.5 K·m/W, $k_\rho \approx 0.8$; grouping three circuits in one trench, $k_g \approx 0.8$. Multiply: the cable carries only ~58 % of catalogue rating.

### Key design deliverables for PV+BESS

| Deliverable | What to check |
|---|---|
| **General layout** | Row spacing (GCR), roads, fire breaks, drainage, setbacks, flood zones avoided, inverter/BESS locations minimise cable length |
| **Single-line diagram (SLD)** | Block structure, transformer ratings at 50 °C, protection devices, metering at POI, BESS coupling, auxiliary supplies |
| **Cable sizing & schedule** | Derating factors match site tests; voltage drop/losses within limits; short-circuit withstand |
| **Earthing & lightning** | Soil resistivity model, step/touch voltages (IEEE 80), substation grid, array bonding |
| **PVsyst / yield report** | Meteo source, losses (soiling, temperature, mismatch, clipping, availability), P50/P90 consistent with tender basis |
| **Protection settings & coordination** | Relay settings, discrimination, fault ride-through compatibility, anti-islanding |
| **Grid studies** | Load flow, short-circuit, reactive capability at POI over voltage range and temperature, harmonics, RMS/EMT stability, PPC tuning |
| **BESS design** | Container layout and spacing (fire), HVAC sizing at 50 °C+, fire detection/suppression, augmentation plan |
| **SCADA / PPC / telecom** | I/O lists, protocols (IEC 61850/104), cyber security, interface to MEWRE control centre |
| **Civil/structural** | Pile design per soil zone, foundations for transformers, drainage, roads |`,
        },
        {
          kind: "widget",
          widget: "pv-sld",
          caption: "Walk the SLD from module to grid: at each component ask what rating, what derating at 50 °C, and which deliverable defines it.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Checking cable calculations for a Kuwaiti site",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "DC string voltage drop at summer temperature",
          given: md`String of 28 modules, $V_{mp} = 42$ V each, $I_{mp} = 13.5$ A. 6 mm² copper string cable, one-way length 120 m to the string inverter/combiner. $R_{20} = 3.08$ Ω/km, $\alpha_{Cu} = 0.00393$ /°C, design conductor temperature 70 °C.`,
          steps: [
            { md: md`String voltage: $V = 28 \times 42 = 1{,}176$ V; power $P = 1{,}176 \times 13.5 = 15{,}876$ W.` },
            { md: md`Resistance at 70 °C: $R_{70} = 3.08 \times [1 + 0.00393 \times 50] = 3.685$ Ω/km.` },
            { md: md`Voltage drop: $\Delta V = 2 \times 0.120 \times 13.5 \times 3.685 = 11.94$ V.` },
            { md: md`Percentage: $11.94 / 1{,}176 = 1.02\,\%$. For DC, power loss % equals voltage drop %: $I^2 R = 13.5^2 \times 0.884 = 161$ W, i.e. 1.02 % of 15,876 W.` },
          ],
          result: md`≈ 1.0 % at STC current and 70 °C — acceptable against a typical 1.5 % DC limit. Had the designer used $R_{20}$, he would have reported 0.85 % and understated losses by ~20 %.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "33 kV collector feeder rating in dry desert sand",
          given: md`33 kV, 3×1c 300 mm² Al XLPE, catalogue rating 465 A at reference conditions (20 °C ground, 1.5 K·m/W). Site: ground temperature 35 °C at burial depth; measured dry thermal resistivity 2.5 K·m/W ($k_\rho = 0.82$); 3 circuits in one trench ($k_g = 0.80$).`,
          steps: [
            {
              md: md`Temperature factor: $k_T = \sqrt{(90-35)/(90-20)}$ = ?`,
              hidden: true,
              check: { prompt: "k_T", answer: 0.886, tolerance: { abs: 0.005 } },
            },
            {
              md: md`Derated rating: $I_z = 465 \times k_T \times 0.82 \times 0.80$ = ? A`,
              hidden: true,
              check: { prompt: "Derated current", answer: 270.4, unit: "A", tolerance: { rel: 0.01 } },
            },
            { md: md`Feeder capacity at 33 kV: $S = \sqrt3 \times 33 \times 0.2704 = 15.45$ MVA — vs 26.6 MVA if the catalogue rating were used.` },
          ],
          result: md`Each feeder can carry about 15 MVA, not 26.6 MVA. A layout that strings four 6.6 MVA inverter stations on one feeder would overload it in summer — exactly the kind of error design review must catch.`,
        },
        {
          kind: "question",
          question: {
            id: "m07-l03-p1",
            type: "numeric",
            prompt: md`A designer proposes 4 mm² Cu string cable (R₂₀ = 4.61 Ω/km) for the longest strings: one-way length 150 m, $I_{mp} = 13.5$ A, $V = 1{,}176$ V, conductor at 70 °C ($\alpha = 0.00393$). What is the voltage drop in %?`,
            answer: 1.9,
            unit: "%",
            tolerance: { abs: 0.03 },
            explanation: md`$R_{70} = 4.61 \times 1.1965 = 5.516$ Ω/km. $\Delta V = 2 \times 0.150 \times 13.5 \times 5.516 = 22.34$ V → $22.34/1{,}176 = 1.90\,\%$. That exceeds a 1.5 % DC limit: comment Code B/C — upsize to 6 mm² on long strings or re-route.`,
            concepts: ["m07.cable-sizing"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running design review as the Employer",
      blocks: [
        {
          kind: "md",
          md: md`### Volumes and pace

A 1 GW PV + BESS project generates roughly 1,500–3,000 design deliverables across civil, structural, electrical, SCADA, BESS, HV substation and grid. With a 21-day review period and multiple revisions, review capacity is a critical resource. A typical OE team at peak: lead engineer, PV/electrical, HV/protection, grid studies, civil/geotech, structural, BESS/fire, SCADA/telecom, QA/document controller.

**Prioritise by consequence**: design basis, layout, SLDs, grid studies, protection philosophy, pile design and BESS fire design first — they feed everything else. Low-risk items (signage, minor buildings) get lighter review.

### Grid studies — where MEWRE's interest peaks

The transmission owner (MEWRE) needs **validated models** (PSS/E or DIgSILENT PowerFactory, and EMT models in PSCAD for weak-grid/converter interactions) to check that 1 GW of inverter-based generation will not destabilise the network. Studies cover steady-state load flow and voltage at POI, short-circuit contribution, reactive power capability across voltage and **at 50 °C** (inverters derate at high temperature), harmonics, fault ride-through and stability. Models are re-validated with commissioning test data.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Classic design-stage failures",
          md: md`- **Inverter derating ignored**: reactive capability at 50 °C is lower than at 25 °C; the plant cannot meet the Q requirement at POI on a summer afternoon.
- **Transformer rated at 40 °C ambient** standard conditions, with no uprating/derating calculation for 50 °C+.
- **Review bottleneck**: Employer misses review periods, deemed no-objection kicks in, poor designs proceed.
- **Comments as instructions**: reviewer dictates solutions and creates variations.
- **Design frozen too late**: procurement of long-lead transformers starts before SLD ratings are fixed.`,
        },
        {
          kind: "checklist",
          title: "PM design-review checklist",
          items: [
            "Design basis approved first: ambient max/min, design temperature for equipment, soiling, wind, standards list, grid code version",
            "Document register shows every deliverable, revision, status code and due date; overdue reviews flagged weekly",
            "Comment-response sheets closed formally; no Code C item goes to construction",
            "Cable derating uses measured thermal resistivity and ground temperature",
            "Transformer and inverter ratings verified at 50 °C+ with OEM derating curves",
            "Grid studies use validated models; reactive capability checked at high temperature",
            "Protection settings study coordinated with MEWRE transmission protection",
            "BESS fire design reviewed against NFPA 855 / OEM test data and local civil defence requirements",
            "PVsyst assumptions match the tender basis (meteo, soiling, availability, degradation)",
          ],
        },
        {
          kind: "ask",
          title: "Ask the EPC / developer design team",
          items: [
            "What conductor temperature and soil thermal resistivity did you use for each cable type?",
            "Show the inverter P–Q capability at 50 °C and the plant capability at POI over the full voltage range.",
            "What ambient temperature is the main transformer rated for, and what is the derating at 50 °C?",
            "Which documents are on the critical path for procurement, and when will they be submitted?",
            "What changed between PVsyst at bid and PVsyst now, and why?",
            "How will the EMT model be validated against commissioning tests?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "m07-l03-p2",
            type: "label",
            prompt: "Label the PV plant components you would check in the SLD review.",
            diagram: "pv-plant",
            markers: [
              { id: "string", answer: "String (series modules)" },
              { id: "inverter", answer: "Inverter" },
              { id: "mv-transformer", answer: "MV step-up transformer" },
              { id: "hv-transformer", answer: "HV power transformer" },
              { id: "collector-substation", answer: "Collector substation" },
            ],
            options: [
              "String (series modules)",
              "Inverter",
              "MV step-up transformer",
              "HV power transformer",
              "Collector substation",
              "Busbar trunking",
            ],
            explanation: md`Each labelled item has a design-review question: string sizing (Voc at minimum temperature), inverter derating at 50 °C, MV transformer rating and losses, HV transformer long-lead and impedance, collector substation protection and metering.`,
            concepts: ["m07.design-review"],
            difficulty: 1,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a new graduate engineer the difference between the Owner's Engineer, the Engineer under FIDIC, and the lenders' technical advisor.",
          keyPoints: [
            "The Engineer is a contract role with powers to certify and determine, and must act neutrally on determinations",
            "The OE advises the owner and is not neutral; powers come from its consultancy contract",
            "LTA/IE acts for lenders: due diligence, drawdown and completion sign-off",
            "On an IPP, MEWRE's OE focuses on grid interface, PPA technical requirements and tests",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m07-l03-q1",
      type: "mcq",
      prompt: "A submittal is returned 'Code B'. What should the contractor do?",
      options: [
        "Stop work on the item and redesign",
        "Proceed, incorporating the comments, and resubmit the next revision",
        "Ignore it — Code B is information only",
        "Claim a variation",
      ],
      answer: 1,
      explanation: md`Code B = approved with comments: work may proceed provided comments are incorporated. Code C stops the item.`,
      concepts: ["m07.design-review"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m07-l03-q2",
      type: "numeric",
      prompt: md`An XLPE cable (90 °C max) is buried where ground temperature is 40 °C. Using $k_T = \sqrt{(90 - T_g)/(90 - 20)}$, what is $k_T$?`,
      answer: 0.845,
      tolerance: { abs: 0.005 },
      explanation: md`$\sqrt{50/70} = \sqrt{0.714} = 0.845$. Combine with soil resistivity and grouping factors; in Kuwait the product often falls below 0.6.`,
      concepts: ["m07.cable-sizing"],
      difficulty: 2,
    },
    {
      id: "m07-l03-q3",
      type: "mcq",
      prompt: "Which document is the technical 'spine' frozen during basic design/FEED?",
      options: ["The punch list", "The design basis", "The O&M manual", "The as-built drawings"],
      answer: 1,
      explanation: md`The design basis fixes site conditions, standards and key ratings. Later changes to it are variations that cascade through all downstream deliverables.`,
      concepts: ["m07.design-stages"],
      difficulty: 1,
    },
    {
      id: "m07-l03-q4",
      type: "multi",
      prompt: "Which studies belong in the grid compliance study package for a 1 GW PV plant? Select all.",
      options: ["Load flow", "Short circuit", "Reactive capability at POI", "Harmonics", "Pile pull-out", "RMS/EMT stability"],
      answer: [0, 1, 2, 3, 5],
      explanation: md`Pile pull-out is geotechnical. The grid package covers steady state, faults, reactive capability, power quality and dynamic stability.`,
      concepts: ["m07.grid-studies"],
      difficulty: 1,
    },
    {
      id: "m07-l03-q5",
      type: "decision",
      prompt: md`The EPC submits 180 drawings in one week, three days before a holiday. Your OE team can review 60 per week. The contract has a 21-day review period with deemed no-objection. What do you do?`,
      options: [
        { text: "Review in arrival order and accept that some go deemed", score: 0.2, feedback: "Deemed no-objection on critical items is how bad designs reach construction." },
        { text: "Triage by consequence, review critical items (SLD, protection, piles, BESS) within the period, issue a formal notice on the rest referencing the agreed submission schedule, and surge OE resources", score: 1, feedback: "Triage + contract notice + resources. Also raise the submission-schedule breach at the progress meeting." },
        { text: "Return all 180 as Code C because of overload", score: 0.1, feedback: "Rejecting without technical review is not a valid basis and invites a dispute." },
      ],
      explanation: md`Agree a submission schedule early (who submits what, when) so review load is smooth. When it is breached, protect critical documents first and put the issue on record.`,
      concepts: ["m07.design-review", "m07.owners-engineer"],
      difficulty: 2,
    },
    {
      id: "m07-l03-q6",
      type: "mcq",
      prompt: "On a KAPP-procured IPP, where is the MEWRE Owner's Engineer's review effort mainly concentrated?",
      options: [
        "Approving the developer's module supplier choice",
        "Grid interface, PPA technical requirements, metering, protection and the COD tests",
        "Approving the developer's financing model",
        "Designing the trackers",
      ],
      answer: 1,
      explanation: md`Under an IPP the developer owns its design and risk. The offtaker's leverage is the PPA technical schedule and the grid interface; that is where the OE focuses.`,
      concepts: ["m07.owners-engineer"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m07-l03-f1", front: "Review codes A / B / C", back: "A = approved/no objection; B = approved with comments, proceed and resubmit; C = rejected, revise and resubmit.", concepts: ["m07.design-review"] },
    { id: "m07-l03-f2", front: "DC voltage drop", back: md`$\Delta V = 2 L I R'$ (R' at operating temperature)`, concepts: ["m07.cable-sizing"] },
    { id: "m07-l03-f3", front: "XLPE ground-temperature derating factor", back: md`$k_T \approx \sqrt{(90-T_g)/(90-20)}$`, concepts: ["m07.cable-sizing"] },
    { id: "m07-l03-f4", front: "Does a Code A transfer design liability to the Employer?", back: "No — review/no-objection does not relieve the contractor of design obligations.", concepts: ["m07.design-review"] },
    { id: "m07-l03-f5", front: "OE vs Engineer (FIDIC)", back: "OE advises the owner (not neutral); the Engineer is a contract role that certifies and must make neutral determinations.", concepts: ["m07.owners-engineer"] },
    { id: "m07-l03-f6", front: "Why check inverter reactive capability at 50 °C?", back: "Inverters derate at high temperature; Q at POI may fall short on summer afternoons.", concepts: ["m07.grid-studies"] },
    { id: "m07-l03-f7", front: "Default FIDIC 2017 Yellow review period for contractor documents", back: "21 days unless otherwise stated; late review may give deemed no-objection.", concepts: ["m07.design-review"] },
    { id: "m07-l03-f8", front: "Typical number of design deliverables on a 1 GW PV+BESS project", back: "~1,500–3,000.", concepts: ["m07.design-stages"] },
  ],
};

export default lesson;
