import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m05-l01",
  title: "Battery Chemistries for Utility BESS: LFP, NMC, Sodium-ion, Vanadium Flow",
  summary:
    "The electrochemistry behind lithium-ion and flow batteries, how the chemistries compare on energy density, cycle life, thermal stability and cost, why LFP in 280/314 Ah prismatic cells dominates utility storage, and what the supply chain means for a Kuwaiti procurement.",
  minutes: 75,
  objectives: [
    "You can explain how an intercalation cell and a vanadium redox flow cell store energy, using voltage, capacity and Faraday's law",
    "You can compare LFP, NMC, sodium-ion and vanadium flow on energy density, cycle life, efficiency, thermal stability, temperature window and cost, with typical numbers",
    "You can justify why LFP prismatic cells (280/314 Ah and larger) are the default for a 4-hour utility BESS in a 50 °C desert, and when an alternative deserves evaluation",
    "You can compute cell, rack and container energy and the number of containers for a given DC energy",
    "You can identify supply-chain, traceability and change-of-cell risks a MEWRE PM must control in the tender and contract",
  ],
  concepts: [
    {
      id: "m05.electrochemistry",
      name: "Cell electrochemistry basics",
      description:
        "Anode, cathode, electrolyte, separator; intercalation; cell voltage set by Gibbs free energy; capacity set by Faraday's law; SEI layer as the main aging mechanism.",
      competency: "wind-storage",
    },
    {
      id: "m05.lfp",
      name: "Lithium iron phosphate (LFP)",
      description:
        "Olivine LiFePO₄ cathode with graphite anode: 3.2 V nominal, ~160–190 Wh/kg cell, 6,000–10,000+ cycles, high thermal stability, no nickel/cobalt — the utility-BESS default.",
      competency: "wind-storage",
      related: ["m05.electrochemistry", "m05.cell-format"],
    },
    {
      id: "m05.nmc",
      name: "Nickel manganese cobalt (NMC)",
      description:
        "Layered-oxide cathode with higher voltage and energy density but lower cycle life and lower thermal-runaway onset; releases oxygen when overheated. Largely displaced from stationary storage.",
      competency: "wind-storage",
      related: ["m05.lfp"],
    },
    {
      id: "m05.sodium-ion",
      name: "Sodium-ion",
      description:
        "Na⁺ intercalation chemistry (layered oxide or Prussian-blue cathode, hard-carbon anode): lower energy density, no lithium/cobalt, good low-temperature behaviour; early utility deployments.",
      competency: "wind-storage",
      related: ["m05.lfp"],
    },
    {
      id: "m05.flow-battery",
      name: "Vanadium redox flow battery (VRFB)",
      description:
        "Energy stored in liquid vanadium electrolytes in tanks; power set by stacks, energy by tank volume; non-flammable, very long cycle life, ~65–75 % RTE, electrolyte temperature limits.",
      competency: "wind-storage",
      related: ["m05.electrochemistry", "m03.two-tank-storage"],
    },
    {
      id: "m05.cell-format",
      name: "Cell formats and DC block architecture",
      description:
        "Prismatic 280/314 Ah (and 500+ Ah) LFP cells assembled into modules, racks and liquid-cooled 20-ft DC blocks of ~3.7–6+ MWh at up to 1,500 V DC.",
      competency: "wind-storage",
      related: ["m05.lfp"],
    },
    {
      id: "m05.supply-chain",
      name: "BESS supply chain and cell traceability",
      description:
        "Concentration of LFP cathode, anode and cell manufacturing in China; tier-1 vs integrator; change-of-cell clauses, traceability, factory audits and bankability lists.",
      competency: "wind-storage",
      related: ["m05.cell-format", "m02.module-procurement-qa", "m15.supply-chain-integrity"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "How a battery cell stores energy",
      blocks: [
        {
          kind: "md",
          md: md`A battery is a controlled chemical reaction split into two half-reactions so that electrons are forced to travel through your external circuit while ions travel internally through the electrolyte. Four parts matter:

| Part | Lithium-ion (LFP) | Role |
|---|---|---|
| **Cathode** (positive) | LiFePO₄ coated on aluminium foil | Hosts Li⁺ when discharged |
| **Anode** (negative) | Graphite (C₆) on copper foil | Hosts Li⁺ when charged (LiC₆) |
| **Electrolyte** | LiPF₆ salt in organic carbonates (flammable) | Conducts ions, not electrons |
| **Separator** | Porous PE/PP film, often ceramic-coated | Prevents anode–cathode contact; shuts down when melted |

On **discharge**, lithium leaves the graphite as Li⁺ + e⁻; the ion crosses the electrolyte, the electron flows through the load, and both re-join in the cathode:

$$\text{LiC}_6 \rightarrow \text{C}_6 + \text{Li}^+ + e^- \qquad \text{FePO}_4 + \text{Li}^+ + e^- \rightarrow \text{LiFePO}_4$$

Charging reverses this. Because lithium simply moves in and out of host lattices without dissolving the electrodes, this is called **intercalation** (the "rocking-chair" cell). That is why lithium-ion can do thousands of cycles.

**Two numbers define a chemistry.** The **voltage** is set by thermodynamics — the free-energy difference of lithium in the two hosts:`,
        },
        { kind: "equation", formula: "m05-gibbs-emf" },
        {
          kind: "md",
          md: md`LFP/graphite sits at ~3.2–3.3 V with a famously **flat voltage plateau** from ~10 % to ~90 % SoC. That flatness is great for power electronics but makes **SoC estimation hard** (voltage tells the BMS almost nothing mid-range, so it relies on coulomb counting with periodic recalibration at full charge — remember this when the contractor asks for "calibration cycles" during commissioning).

The **capacity** per gram of active material comes from Faraday's law: every lithium ion carries one electron, so the charge per mole of host is $nF$:`,
        },
        { kind: "equation", formula: "m05-specific-capacity" },
        {
          kind: "md",
          md: md`For LiFePO₄ ($M$ = 157.76 g/mol, $n$ = 1) this gives ~170 mAh/g; good commercial cells extract ~150–160 mAh/g. Multiply voltage by charge and you get energy. At the cell level:`,
        },
        { kind: "equation", formula: "m05-cell-energy" },
        {
          kind: "callout",
          tone: "why",
          title: "Why cells age: the SEI",
          md: md`On the first charge the electrolyte reacts with the graphite surface and forms a thin **solid-electrolyte interphase (SEI)**. It protects the anode but grows slowly for life, consuming cyclable lithium. Lost lithium = lost capacity. SEI growth is a chemical reaction, so it is **temperature-activated** (Arrhenius — lesson 2) and grows roughly with $\sqrt{t}$. Other mechanisms: lithium plating (charging too fast or too cold), particle cracking (deep, fast cycling), and cathode dissolution. Every warranty clause about temperature, C-rate and SoC window traces back to these mechanisms.`,
        },
        {
          kind: "md",
          md: md`### Thermal runaway in one paragraph

If a cell gets hot enough (internal short, overcharge, external fire, crush), exothermic reactions start: SEI breakdown (~80–120 °C), anode–electrolyte reaction, separator melt (~130–165 °C), then cathode decomposition. In **layered oxides (NMC)** the cathode releases **oxygen** from ~150–200 °C, which burns the electrolyte inside the cell — fast, hot, self-sustaining. The olivine **LFP** lattice holds its oxygen tightly (strong P–O bonds), so full runaway triggers later (typically ~200 °C+ in accelerating-rate calorimetry, versus ~150–200 °C for high-nickel NMC), peaks much cooler and releases far less heat. **But LFP still vents large volumes of flammable gas** (H₂, CO, CO₂, hydrocarbons) — the explosion hazard of lesson 5 does not disappear with LFP.

### The four chemistries a MEWRE PM will hear about

| Parameter (typical, 2024–2026) | **LFP** | **NMC** (811/622) | **Sodium-ion** | **Vanadium flow** |
|---|---|---|---|---|
| Nominal cell voltage | 3.2 V | 3.6–3.7 V | ~3.0–3.1 V | 1.26 V (per stack cell) |
| Cell energy density | 160–190 Wh/kg; 350–420 Wh/L | 220–280 Wh/kg | 120–160 Wh/kg | 15–25 Wh/L electrolyte |
| Cycle life (to 70–80 % SoH) | 6,000–10,000+ | 2,000–5,000 | 3,000–6,000 (claims; limited field data) | 15,000–20,000+, little fade |
| DC round-trip efficiency | 94–96 % at 0.25–0.5C | 94–96 % | 90–93 % | 75–80 % stack; 65–75 % AC-AC incl. pumps |
| Thermal stability | High (no O₂ release) | Low–medium (O₂ release) | High; can ship at 0 V | Non-flammable aqueous electrolyte |
| Temperature sensitivity | Ages fast > 35 °C; no charge < 0 °C | Ages fast > 35 °C | Good low-temp; high-temp data thin | Electrolyte limited to ~10–40 °C (V⁵⁺ precipitation when hot) |
| Critical materials | Li, graphite (no Ni/Co) | Li, Ni, Co, Mn, graphite | Na, hard carbon, Al (no Cu, no Li) | Vanadium (price-volatile) |
| Typical utility role | 2–4 h shifting, FFR | Legacy BESS (2015–2020), EVs | Emerging; China pilots 2023–2025 | 4–10 h long-duration niche |
| Footprint (4 h) | Smallest | Small | ~1.3× LFP | 3–5× LFP |

Treat the numbers as screening ranges, not specifications; your tender asks for the bidder's datasheet and test reports.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why LFP dominates utility BESS",
          md: md`1. **Cycle life × price**: 6,000–10,000 cycles at cell prices that fell to roughly USD 40–60/kWh in 2024–2025 (Chinese market) makes LFP the lowest cost per MWh *throughput*. Energy density, where NMC wins, barely matters on a 50-hectare desert site.
2. **Safety**: higher runaway onset, no oxygen, lower heat release → simpler propagation control and easier UL 9540A outcomes.
3. **No nickel/cobalt**: less price and ESG exposure.
4. **Scale**: the EV and stationary industry in China standardised LFP prismatic cells (280 Ah → 314 Ah → 500+ Ah), so supply is deep and competitive.

IEA reports LFP now accounts for the large majority of new stationary storage. That said, the flat voltage curve (SoC estimation), sensitivity to heat, and flammable vent gas are LFP weaknesses you still have to engineer around.`,
        },
        {
          kind: "md",
          md: md`### Flow batteries: a different machine

In a **vanadium redox flow battery**, both electrolytes are vanadium dissolved in sulphuric acid, stored in external tanks and pumped through a stack of cells separated by an ion-exchange membrane:

$$\text{Positive: } \text{VO}_2^+ + 2\text{H}^+ + e^- \rightleftharpoons \text{VO}^{2+} + \text{H}_2\text{O} \qquad \text{Negative: } \text{V}^{2+} \rightleftharpoons \text{V}^{3+} + e^-$$

Consequences: **power (stack area) and energy (tank volume) are sized independently**, so a 10-hour system costs relatively little more than a 4-hour one; the electrolyte does not wear out (cross-over is rebalanced), giving very long life; but RTE is low (pumps, shunt currents, low cell voltage), footprint is large, and — critical for Kuwait — the positive electrolyte precipitates V₂O₅ above roughly 40 °C, so tanks and stacks need active cooling in summer. Flow is worth evaluating only for long durations (6–10 h+) or where fire risk acceptance is very low.

### Sodium-ion

Sodium-ion uses the same rocking-chair principle with Na⁺. It avoids lithium and copper (aluminium current collectors on both electrodes), tolerates cold, and can be transported at 0 V (safer logistics). Energy density is ~20–30 % below LFP and field degradation data are short. First 100 MWh-class grid projects were commissioned in China in 2024. For a 2027 Kuwaiti procurement, treat it as an alternative to **permit** (not require), subject to the same UL 9540A and bankability evidence as LFP.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "Cell formats you will see in bids",
          md: md`- **280 Ah LFP prismatic** (~0.9 kWh): the 2020–2023 workhorse; 20-ft DC block ~3.7–3.8 MWh.
- **314 Ah LFP prismatic** (~1.0 kWh): standard since 2024; 20-ft liquid-cooled DC block ~5.0 MWh.
- **500–600 Ah+ cells** (~1.6–2.0 kWh): launched 2024–2025 for 6.25–7 MWh blocks; fewer cells and connections but less field history.
- Cylindrical (e.g. 21700) and pouch formats are now rare in utility BESS.

Bigger cells reduce part count and cost, but each cell holds more energy (bigger runaway event) and long-term data are thinner. A bid that switches cell size after award changes the UL 9540A basis, the thermal design and the degradation curve — it is a variation, not a detail.`,
        },
        { kind: "diagram", diagram: "bess", caption: "Hierarchy of a utility BESS: cell → module → rack (with BMS) → enclosure with HVAC and fire suppression → PCS → MV transformer, all coordinated by the EMS." },
        { kind: "sources", refs: ["m05-iea-batteries-2024", "m05-irena-storage-2017", "m05-nrel-atb-bess", "m05-iec-62619"] },
      ],
    },
    {
      layer: "applied",
      title: "From cell to container to gigawatt-hour",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "How many 314 Ah containers for 1,000 MWh DC?",
          given: md`A bidder offers 20-ft liquid-cooled DC blocks built from 3.2 V, 314 Ah LFP cells. Each rack is 1P416S (one string of 416 cells in series); each container holds 12 racks. The project needs **1,000 MWh DC nameplate** (beginning of life).`,
          steps: [
            { md: md`**Cell energy**: $E_{cell} = 3.2 \times 314 = 1{,}004.8$ Wh ≈ 1.005 kWh.` },
            { md: md`**Rack voltage**: $416 \times 3.2 = 1{,}331$ V nominal. At 3.65 V/cell full charge that is ~1,518 V — so the DC system must be rated 1,500 V class with the BMS stopping charge just under the limit. (Check: the PCS DC input window must cover ~1,040 V at 2.5 V/cell empty up to ~1,500 V.)` },
            { md: md`**Rack energy**: $E_{rack} = 416 \times 1{,}004.8 = 417{,}997$ Wh ≈ 418.0 kWh.` },
            { md: md`**Container energy**: $12 \times 418.0 = 5{,}016$ kWh ≈ **5.016 MWh**.` },
            { md: md`**Containers**: $1{,}000 / 5.016 = 199.3$ → round up to **200 containers** (1,003 MWh). Total cells: $200 \times 12 \times 416 = 998{,}400$ — about one million cells, each with a serial number you will want traceable.` },
          ],
          result: md`200 × 5.016 MWh containers = 1,003 MWh DC nameplate, ~1.0 million cells, ~1,331 V nominal strings. Note that "nameplate" is at the cell's rated test condition (typically 0.5C, 25 °C); usable energy at POI will be ~10–15 % lower (lesson 2).`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "How much cathode material is in one 314 Ah cell?",
          given: md`LiFePO₄ has molar mass 157.76 g/mol and transfers one electron per formula unit. A commercial cathode achieves 155 mAh/g. Estimate the theoretical specific capacity and the active cathode mass in one 314 Ah cell.`,
          steps: [
            { md: md`Charge of one mole of electrons: $F/3.6 = 96{,}485/3.6 = 26{,}801$ mAh/mol.` },
            {
              md: md`Theoretical capacity: $q_{th} = 26{,}801 / 157.76 \approx 169.9$ mAh/g.`,
              hidden: true,
              check: { prompt: "Theoretical specific capacity of LiFePO₄", answer: 169.9, unit: "mAh/g", tolerance: { rel: 0.01 } },
            },
            { md: md`Practical utilisation: $155/169.9 = 91$ % of theoretical.` },
            {
              md: md`Active cathode mass: $m = 314{,}000 \text{ mAh} / 155 \text{ mAh/g} \approx 2{,}026$ g ≈ 2.0 kg.`,
              hidden: true,
              check: { prompt: "Active cathode mass per cell", answer: 2026, unit: "g", tolerance: { rel: 0.01 } },
            },
          ],
          result: md`~170 mAh/g theoretical, ~2.0 kg of LiFePO₄ per 314 Ah cell. Scale to one million cells and the project consumes ~2,000 t of cathode powder — which is why cathode supply (and its concentration in China) is a real procurement risk.`,
        },
        {
          kind: "question",
          question: {
            id: "m05-l01-p1",
            type: "numeric",
            prompt: md`A 314 Ah, 3.2 V LFP prismatic cell weighs 5.6 kg. What is its gravimetric energy density in Wh/kg?`,
            answer: 179.4,
            unit: "Wh/kg",
            tolerance: { rel: 0.01 },
            explanation: md`$E = 3.2 \times 314 = 1{,}004.8$ Wh; $1{,}004.8 / 5.6 = 179.4$ Wh/kg. That is typical for a modern LFP cell (160–190 Wh/kg). An NMC cell would be 220–280 Wh/kg — irrelevant for a desert site where land is cheap, but decisive in an EV.`,
            concepts: ["m05.lfp", "m05.cell-format"],
            difficulty: 1,
          },
        },
        {
          kind: "md",
          md: md`### Choosing a chemistry for a Kuwaiti 4-hour project — a scoring view

| Criterion (weight) | LFP | NMC | Na-ion | VRFB |
|---|---|---|---|---|
| Lifetime cost per MWh delivered (35 %) | 5 | 2 | 3 | 3 |
| Safety / fire propagation (20 %) | 4 | 2 | 4 | 5 |
| Performance at 50 °C ambient with HVAC (15 %) | 3 | 2 | 3 | 2 |
| Bankability / field record (20 %) | 5 | 4 | 2 | 3 |
| Footprint & logistics (10 %) | 5 | 5 | 4 | 2 |
| **Weighted score (out of 5)** | **4.5** | **2.7** | **3.1** | **3.15** |

The point of the exercise is not the exact score: it is that LFP wins on the criteria that matter for a large merchant-sized 4-hour system, while flow becomes interesting only if the duration requirement grows to 8–10 h or the AHJ refuses lithium near a populated site. (Weighted score check for LFP: 0.35×5 + 0.20×4 + 0.15×3 + 0.20×5 + 0.10×5 = 4.5.)`,
        },
      ],
    },
    {
      layer: "field",
      title: "Chemistry and supply chain on real projects",
      blocks: [
        {
          kind: "md",
          md: md`### Who decides what

- **MEWRE / employer (or KAPP for a PPP)** sets the *functional* requirement: MW, MWh at POI, duration, cycles per year, design life, availability, safety standards. Good practice is to be **technology-neutral but standards-heavy**: do not mandate LFP, but mandate UL 9540 certification, UL 9540A test data, IEC 62619/62933 compliance and a field record.
- **Owner's Engineer (OE)** writes the technical specification, reviews cell datasheets, degradation curves, UL 9540A reports and factory audit findings.
- **EPC / integrator** (e.g. a Chinese, Korean or Western system integrator) chooses the cell OEM and DC block. Integrators often buy cells from tier-1 makers; the integrator's warranty is only as strong as its back-to-back with the cell maker.
- **Lenders' technical advisor (LTA)** (for an IPP) judges bankability: cell maker on a recognised tier-1/bankability list, audited factory, warranty backed by a creditworthy entity.

### Supply chain realities

China hosts the overwhelming majority of LFP cathode, graphite anode and LFP cell capacity (IEA). Consequences for a Kuwaiti PM: lead times of 4–8 months for DC blocks from order, shipping by sea to Shuwaikh or Shuaiba port, exposure to freight and policy shocks, and the need to audit factories you will never otherwise visit. Kuwait's March 2025 G2G framework with China's National Energy Administration covers solar expansion; whether storage procurement follows a G2G or tender route is **not confirmed** (see callout).`,
        },
        {
          kind: "callout",
          tone: "kuwait",
          title: "Kuwait's BESS plans (as reported)",
          md: md`In November 2025 MEWRE announced a **1–1.5 GW / 4–6 GWh** battery storage project, described as "in negotiation". In June 2026 sites at **Al-Mutlaa and Jaber Al-Ahmad** totalling 1.5 GW were reported approved, with the **first 500 MW targeted for summer 2027**; US trade.gov describes two phases starting 2027. The 4–6 GWh / 1–1.5 GW ratio implies **~4-hour duration** — consistent with LFP energy-shifting for the evening peak.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Not confirmed",
          md: md`The BESS counterparty, procurement route (G2G vs. competitive tender), chemistry and cell supplier have **not** been confirmed in public sources (RESEARCH.md open question 18). The June 2026 site approval comes from a single digest of a MEED report. Re-verify with MEWRE/KAPP before quoting any of this in an official document.`,
        },
        { kind: "sources", refs: ["m05-agbi-kuwait-bess-2025", "m05-solarquarter-kuwait-bess-2025", "m05-ice-meed-bess-sites-2026", "m05-trade-gov-kuwait-bess"] },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Silent cell substitution**: the bid names tier-1 cells; deliveries arrive from a second-source maker or a different factory/line. Degradation, UL 9540A basis and warranty may all be invalid.
- **Cell size change mid-project** (280 → 314 → 500 Ah) "for your benefit": fewer containers, but new thermal design, new propagation test and possibly no field data.
- **Grade-B cells**: cells binned out of EV production sold into storage. Capacity matching across a rack degrades the whole string.
- **Datasheet cycle life at 25 °C, 0.5C, 80 % DoD** quoted against a Kuwaiti duty at 30–35 °C cell temperature and 95 % DoD — the real number can be half.
- **Integrator insolvency**: the cell maker's warranty is to the integrator, not to you. Require direct warranty assignment or parent guarantee.`,
        },
        {
          kind: "checklist",
          title: "PM checks at tender and design review",
          items: [
            "Specification is chemistry-neutral but requires UL 9540 listing, full UL 9540A (cell, module, unit, and installation level if indoor), IEC 62619 and IEC 62933-5-2",
            "Cell OEM, factory location and production line are named in the contract; any change is a Variation requiring Engineer's consent and new test evidence",
            "Cell datasheet, degradation curves at the project's actual temperature/C-rate/DoD and the OEM's warranty are attached to the bid",
            "Factory audit (cell and DC block) and witnessed FAT included in the inspection & test plan",
            "Cell traceability: serial numbers mapped to module/rack/container in a register handed over at completion",
            "Warranty and LTSA backed by a creditworthy entity with direct rights for MEWRE/SPV",
            "Shipping: UN 3480 / Class 9 dangerous-goods compliance under the IMDG Code, agreed shipping SoC (typically ~30 % or lower — mandatory for air under IATA, good practice by sea), port storage plan out of direct sun",
          ],
        },
        {
          kind: "ask",
          title: "Ask the contractor",
          items: [
            "Which cell (maker, model, factory, line) is in your bid, and what is your second source? Has the second source passed the same UL 9540A tests?",
            "Show me the degradation curve for 1 cycle/day at 95 % DoD, 0.25C and 30 °C average cell temperature — not 25 °C, 0.5C, 80 % DoD.",
            "How many MWh of this exact cell and DC block are in operation, for how long, and in what climate?",
            "What is the cell-to-cell capacity and impedance matching tolerance at module assembly?",
            "If the cell OEM changes the cell design during the 20-year life, how will you supply compatible augmentation and spare modules?",
          ],
        },
        { kind: "scenario", scenario: "m05-s1" },
        {
          kind: "feynman",
          prompt: "Explain to the MEWRE Assistant Undersecretary, in under two minutes, why the ministry's 4-hour storage project will almost certainly use LFP and not NMC or flow batteries — and the one risk that still remains with LFP.",
          keyPoints: [
            "LFP has the lowest cost per MWh delivered over life because of long cycle life and low cell price",
            "LFP does not release oxygen, so thermal runaway is less violent than NMC",
            "Energy density does not matter much on a desert site; NMC's advantage is irrelevant",
            "Flow batteries make sense mainly for long durations (8–10 h) and have low efficiency and large footprint; electrolyte temperature limits matter at 50 °C",
            "Remaining risk: LFP still vents flammable gas (explosion hazard) and ages fast if hot — HVAC and safety design remain critical",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m05-l01-q1",
      type: "mcq",
      prompt: md`Why does an LFP cell typically reach thermal runaway at a higher temperature and with less heat release than an NMC cell?`,
      options: [
        "LFP uses a non-flammable electrolyte",
        "The olivine phosphate lattice binds oxygen strongly, so the cathode does not release oxygen to feed combustion",
        "LFP cells have no separator",
        "LFP cells operate at higher voltage, which stabilises the cathode",
      ],
      answer: 1,
      explanation: md`Both chemistries use the same flammable carbonate electrolyte. The difference is the cathode: layered NMC oxides release O₂ when heated (~150–200 °C), which burns the electrolyte inside the cell. The strong P–O bonds in LiFePO₄ keep the oxygen locked in, delaying and moderating runaway. LFP still vents flammable gas, so explosion control is still required.`,
      concepts: ["m05.lfp", "m05.nmc", "m05.electrochemistry"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "m05-l01-q2",
      type: "numeric",
      prompt: md`A 20-ft DC block contains 10 racks of 1P416S using 280 Ah, 3.2 V cells. What is its nominal energy in MWh?`,
      answer: 3.727,
      unit: "MWh",
      tolerance: { rel: 0.01 },
      explanation: md`Cell: $3.2 \times 280 = 896$ Wh. Rack: $416 \times 896 = 372{,}736$ Wh. Ten racks: 3.727 MWh — the classic "3.7 MWh container" of the 280 Ah generation. The same box with 314 Ah cells and 12 racks gives ~5 MWh.`,
      concepts: ["m05.cell-format"],
      difficulty: 1,
    },
    {
      id: "m05-l01-q3",
      type: "multi",
      prompt: md`Which statements about vanadium redox flow batteries are correct? (Select all.)`,
      options: [
        "Power and energy can be sized independently (stacks vs. tank volume)",
        "AC-AC round-trip efficiency is typically higher than LFP",
        "The electrolyte is aqueous and non-flammable",
        "Positive electrolyte can precipitate at high temperature, so cooling matters in a Kuwaiti summer",
        "They have the smallest footprint per MWh of the four chemistries",
      ],
      answer: [0, 2, 3],
      explanation: md`Flow batteries decouple power (stacks) and energy (tanks), use non-flammable aqueous electrolytes and have very long life. But RTE is lower (~65–75 % AC-AC including pumps) and footprint is 3–5× LFP. Vanadium(V) species precipitate above ~40 °C, a real design constraint at 50 °C ambient.`,
      concepts: ["m05.flow-battery"],
      difficulty: 2,
    },
    {
      id: "m05-l01-q4",
      type: "mcq",
      prompt: md`The flat voltage plateau of LFP (≈3.2–3.3 V between ~10 % and ~90 % SoC) mainly creates which operational issue?`,
      options: [
        "Higher fire risk",
        "Inaccurate SoC estimation from voltage, requiring coulomb counting and periodic full-charge recalibration",
        "Inability to discharge below 50 % SoC",
        "Need for a DC/DC converter in every rack",
      ],
      answer: 1,
      explanation: md`Because voltage barely changes with SoC, the BMS cannot infer SoC from voltage mid-range. SoC drift accumulates, and the EMS may think it has more (or less) energy than it does — dangerous when you have committed 4 h at the evening peak. Recalibration requires periodic full charges, which operations must schedule.`,
      concepts: ["m05.lfp", "m05.electrochemistry"],
      difficulty: 2,
    },
    {
      id: "m05-l01-q5",
      type: "decision",
      prompt: md`Six months after award, the EPC writes that it will switch from the 314 Ah cell named in the contract to a new 587 Ah cell from the same maker, "reducing container count by 40 % at no extra cost". The UL 9540A report for the new cell is "in progress". As MEWRE's PM, what do you do?`,
      options: [
        { text: "Accept: same maker, fewer containers, lower O&M — a clear benefit.", score: 0, feedback: "The safety basis (UL 9540A), thermal design, spacing, degradation curve and warranty all change. Accepting without evidence transfers unquantified risk to MEWRE." },
        { text: "Treat it as a proposed Variation: request UL 9540A (cell/module/unit), updated thermal and spacing design, degradation data, field record and warranty terms; OE review; decide on evidence and any price adjustment.", score: 1, feedback: "Correct. A change of cell is a change of design basis. Use the contract's variation procedure and insist on the same evidence as at tender; consider sharing the savings." },
        { text: "Reject outright because the contract names the 314 Ah cell.", score: 0.4, feedback: "Contractually defensible but may forfeit real value (cost, schedule, supply security). Better to evaluate on evidence, with rejection as the default if evidence is missing." },
        { text: "Accept on condition that the EPC extends the warranty by two years.", score: 0.2, feedback: "A longer warranty does not fix a missing safety test or an unproven thermal design." },
      ],
      explanation: md`Cell changes look commercial but are engineering changes. The PM's job is to route them through the contractual change procedure with the OE, and to decide on evidence (UL 9540A, thermal, degradation, warranty).`,
      concepts: ["m05.cell-format", "m05.supply-chain"],
      difficulty: 2,
    },
    {
      id: "m05-l01-q6",
      type: "order",
      prompt: md`Order the hierarchy of a utility BESS from smallest to largest unit.`,
      items: ["Cell", "Module", "Rack (with BMS slave/master)", "Enclosure / DC block (with HVAC and fire system)", "PCS + MV transformer skid (power block)"],
      explanation: md`Cells are assembled into modules (typically 48–104 cells), modules into racks (one series string at ~1,000–1,500 V with rack BMS), racks into a DC block enclosure, and one or more enclosures connect to a PCS and MV transformer forming a power block.`,
      concepts: ["m05.cell-format"],
      difficulty: 1,
    },
    {
      id: "m05-l01-q7",
      type: "short",
      prompt: md`Give three reasons why a technology-neutral tender for MEWRE's 4-hour BESS should nevertheless specify UL 9540, UL 9540A and IEC 62619 compliance.`,
      rubric: [
        "Standards give an objective, chemistry-neutral safety and performance baseline",
        "UL 9540A provides vent-gas and propagation data needed to design spacing, explosion control and suppression",
        "Certification evidence supports bankability, insurance and AHJ/civil-defence approval",
        "Prevents unproven products entering on price alone",
      ],
      modelAnswer: md`Technology neutrality keeps competition open, but standards stop it from becoming a race to the bottom. UL 9540 certifies the whole system (battery, PCS, controls) as safe; UL 9540A gives the vent-gas volume, composition and propagation behaviour that the designer needs to size spacing, deflagration venting and suppression; IEC 62619 covers cell/battery safety and BMS functional safety. Together they give MEWRE, lenders, insurers and Kuwait's fire authority (the AHJ) an objective basis for approval regardless of chemistry.`,
      concepts: ["m05.supply-chain", "m05.lfp"],
      difficulty: 2,
      explanation: md`Neutrality on chemistry and strictness on standards are complementary: the standards define *what safe and proven means* without naming a technology. UL 9540A data in particular are design inputs (spacing, explosion control), not just certificates.`,
    },
  ],
  flashcards: [
    { id: "m05-l01-f1", front: "Nominal voltage of an LFP cell", back: "3.2 V (range ~2.5–3.65 V), with a flat plateau ~3.2–3.3 V", concepts: ["m05.lfp"] },
    { id: "m05-l01-f2", front: "Energy of a 314 Ah LFP cell", back: md`$3.2 \times 314 \approx 1.0$ kWh`, concepts: ["m05.cell-format"] },
    { id: "m05-l01-f3", front: "Theoretical specific capacity of LiFePO₄", back: md`~170 mAh/g ($q = nF/3.6M$, M = 157.76 g/mol)`, concepts: ["m05.electrochemistry"] },
    { id: "m05-l01-f4", front: "Main aging mechanism in lithium-ion cells", back: "Growth of the SEI layer on the anode, consuming cyclable lithium (temperature-activated, ~√t)", concepts: ["m05.electrochemistry"] },
    { id: "m05-l01-f5", front: "Why NMC runaway is more violent than LFP", back: "Layered-oxide NMC cathode releases oxygen when hot, burning the electrolyte inside the cell", concepts: ["m05.nmc"] },
    { id: "m05-l01-f6", front: "Typical cycle life: LFP vs NMC vs VRFB", back: "LFP 6,000–10,000+; NMC 2,000–5,000; VRFB 15,000–20,000+", concepts: ["m05.lfp", "m05.nmc", "m05.flow-battery"] },
    { id: "m05-l01-f7", front: "VRFB key advantage and key Kuwaiti constraint", back: "Power and energy sized independently / long life; electrolyte must be kept below ~40 °C", concepts: ["m05.flow-battery"] },
    { id: "m05-l01-f8", front: "Typical 20-ft DC block energy (280 Ah vs 314 Ah generation)", back: "~3.7 MWh vs ~5.0 MWh", concepts: ["m05.cell-format"] },
    { id: "m05-l01-f9", front: "Sodium-ion: two advantages, one drawback", back: "No lithium/cobalt/copper and good low-temperature/0 V shipping; lower energy density and short field record", concepts: ["m05.sodium-ion"] },
    { id: "m05-l01-f10", front: "Is a change of cell model after award a variation?", back: "Yes — it changes the safety (UL 9540A), thermal, degradation and warranty basis; route through the change procedure with evidence", concepts: ["m05.supply-chain"] },
  ],
  scenarios: [
    {
      id: "m05-s1",
      title: "The cheaper cell",
      context: md`You are MEWRE's project manager for a 500 MW / 2,000 MWh BESS under an EPC contract based on FIDIC Yellow Book. The Owner's Engineer is a European consultancy. Containers are due to ship from China in four months.`,
      start: "a",
      concepts: ["m05.supply-chain", "m05.cell-format", "m05.lfp"],
      nodes: {
        a: {
          md: md`During a routine factory visit, the OE's inspector notices that cells on the module line carry a different maker's logo from the tier-1 maker named in the contract. The EPC's site manager says it is "a sister company using the same chemistry and the same equipment, fully equivalent". Shipment of the first 40 containers is planned in three weeks.`,
          choices: [
            { text: "Issue a formal notice requiring the EPC to stop incorporating the alternative cells into contract works until equivalence is demonstrated, and ask the OE for a list of required evidence.", next: "b", score: 9, feedback: "Right: protect the contract position immediately (notice, hold on incorporation) while keeping the door open to evidence." },
            { text: "Accept the explanation; the chemistry is the same and the schedule is tight.", next: "c", score: 1, feedback: "You have just accepted an undocumented change of design basis on ~400,000 cells." },
            { text: "Instruct the EPC to scrap all modules made with the alternative cells.", next: "b", score: 4, feedback: "Premature: you do not yet know whether the cells are equivalent. An instruction like this can also give the EPC a claim if the cells prove compliant." },
          ],
        },
        b: {
          md: md`The OE lists the evidence: UL 9540A cell and module reports for the alternative cell, IEC 62619 certificate, the cell maker's degradation data at project conditions, factory audit, and the cell warranty with direct rights to MEWRE. The EPC says two of these will take ten weeks, threatening the summer-2027 target. The Assistant Undersecretary asks you for a recommendation by tomorrow.`,
          choices: [
            { text: "Recommend: keep shipping containers built with contract cells only; allow alternative cells only after evidence; ask the EPC for a recovery programme and reserve MEWRE's rights on delay (it is the EPC's risk).", score: 10, feedback: "Excellent: safety and bankability are protected, the schedule risk is placed with the party that caused it, and you give leadership a clear decision." },
            { text: "Recommend accepting the alternative cells now and collecting the evidence later.", score: 3, feedback: "If the UL 9540A results later show propagation, you may have to retrofit spacing or suppression on energised plant — far worse than ten weeks." },
            { text: "Recommend terminating the contract for default.", score: 2, feedback: "Disproportionate. Termination is a last resort and would cost far more than a ten-week delay." },
          ],
        },
        c: {
          md: md`Eight months after COD, the BESS fails its year-1 capacity test by 4 %. The OEM of the tier-1 cell refuses warranty: the cells are not theirs. The sister company is not a party to any MEWRE contract.`,
          choices: [
            { text: "Pursue the EPC under the contract (defects and performance guarantees) and record the lesson for future tenders.", score: 5, feedback: "Still the right avenue — the EPC remains liable — but your negotiating position is weaker because MEWRE's representatives knew and acquiesced." },
            { text: "Accept the shortfall; the cells were accepted at the time.", score: 0, feedback: "Never waive contractual remedies by inaction. Seek legal advice on the effect of the earlier acceptance." },
          ],
        },
      },
    },
  ],
};

export default lesson;
