import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m02-l03",
  title: "Modules: technologies, bifacial, qualification & degradation",
  summary:
    "PERC vs TOPCon vs HJT, bifacial gain over desert sand, glass-glass construction, what IEC 61215/61730 do and do not prove, extended reliability testing, degradation mechanisms, warranties and supply-chain traceability.",
  minutes: 80,
  objectives: [
    "Compare PERC, TOPCon and HJT on efficiency, temperature coefficient, bifaciality, degradation and supply risk",
    "Estimate bifacial gain from bifaciality, albedo and rear-irradiance ratio, and challenge inflated claims",
    "Explain what IEC 61215/61730 certification proves, and why extended (PVEL-type) testing is required for a 30-year asset",
    "Identify LID, LeTID, PID, UV-induced degradation and delamination, and how each is detected and mitigated",
    "Read a product and power warranty, compute warranted power in any year, and specify traceability",
  ],
  concepts: [
    {
      id: "m02.cell-technologies",
      name: "Cell technologies (PERC, TOPCon, HJT)",
      description: "p-type vs n-type architectures and their trade-offs in efficiency, temperature coefficient, bifaciality, degradation and cost.",
      competency: "solar",
      related: ["m02.temperature-coefficient", "m02.degradation-mechanisms"],
    },
    {
      id: "m02.bifacial-gain",
      name: "Bifacial gain",
      description: "Extra energy from rear-side irradiance; depends on bifaciality, albedo, height, GCR and rear shading.",
      competency: "solar",
      related: ["m02.poa-transposition", "m02.tracker-vs-fixed"],
    },
    {
      id: "m02.module-qualification",
      name: "Module qualification & reliability testing",
      description: "IEC 61215/61730 type approval vs extended stress testing (PVEL PQP, Scorecard) and high-temperature qualification.",
      competency: "solar",
      related: ["m02.module-procurement-qa"],
    },
    {
      id: "m02.degradation-mechanisms",
      name: "Degradation mechanisms",
      description: "LID, LeTID, PID, UV-induced degradation, delamination, corrosion, cell cracks — causes, detection and mitigation.",
      competency: "solar",
      related: ["m02.module-warranty", "m02.commissioning-tests", "m12.degradation", "m12.failure-modes"],
    },
    {
      id: "m02.module-warranty",
      name: "Module warranties & traceability",
      description: "Product vs linear power warranty, claim mechanics, warrantor credit risk, and supply-chain traceability.",
      competency: "solar",
      related: ["m02.module-procurement-qa", "m12.warranty-claim", "m15.supply-chain-integrity"],
    },
  ],
  sections: [
    // ============================================================ THEORY
    {
      layer: "theory",
      title: "Cell technologies in 2025-era utility modules",
      blocks: [
        {
          kind: "md",
          md: md`Module technology in Gulf utility tenders has moved, within five years, from p-type PERC to n-type TOPCon, with HJT and back-contact (BC) as challengers. The PM does not choose the cell; the IPP/EPC does. But the PM writes the minimum technical requirements, evaluates claims and lives with the asset for 30 years, so you need to know the trade-offs cold.

| Attribute | Mono PERC (p-type) | TOPCon (n-type) | HJT (n-type) |
|---|---|---|---|
| Module efficiency (typ.) | 21–22 % | 22–23.5 % | 22.5–24 % |
| $\gamma$ (Pmp) | −0.34 to −0.37 %/°C | −0.29 to −0.32 %/°C | −0.24 to −0.26 %/°C |
| Bifaciality | ≈ 0.70 | ≈ 0.80 (0.75–0.85) | ≈ 0.85–0.90 |
| First-year degradation (warranty) | 2.0 % | 1.0 % | 1.0 % |
| Annual degradation (warranty) | 0.55 %/yr | 0.40 %/yr | 0.35–0.40 %/yr |
| LID / LeTID | B-O LID & LeTID risk (mitigated by Ga doping, regeneration) | Very low LID; watch UVID | Very low LID; watch UVID, sensitive to moisture at edges |
| Manufacturing | Mature, being phased out | Upgrade of PERC lines; dominant volume | Separate low-temperature process; silver-heavy |
| Main risks | Higher heat loss, LeTID | UV-induced degradation, front-side corrosion sensitivity in damp heat, newer field record | Cost, Ag usage, fewer suppliers, edge sealing |

**Why n-type is less prone to LID.** Classic light-induced degradation in p-type Czochralski silicon comes from **boron–oxygen (B-O) complexes** forming under illumination (1–3 % loss in the first hours/days). n-type wafers are phosphorus-doped — no boron in the bulk, no B-O defect. That is the physical basis of the 1 % (vs 2 %) first-year warranty.

**Module formats.** 182 mm (M10) and 210 mm (G12) wafers dominate; 210R rectangular is common. Modules of 580–720 W, 2.3–2.4 m long, 30–38 kg. Larger modules reduce BOS cost per Wp (fewer pieces, fewer connectors, fewer clamps) but raise wind load per module, glass breakage risk and handling-crack risk.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why the lowest-cost module is rarely the cheapest energy in Kuwait",
          md: md`In a hot desert three module properties are worth more than in Europe: the **temperature coefficient** (≈ 45–50 K above STC at peak), **bifaciality** (bright sand), and **degradation** (UV dose and thermal cycling are severe). A module 1 USD-cent/Wp cheaper but 0.06 %/°C worse loses ~1.4 % of energy per year. Over 30 years at 2,100 kWh/kWp that is ≈ 0.9 MWh per kWp lost — worth far more than 10 USD/kWp at any plausible tariff.`,
        },
      ],
    },
    {
      layer: "theory",
      title: "Bifacial modules and glass-glass construction",
      blocks: [
        {
          kind: "md",
          md: md`A bifacial module uses a transparent rear (glass or transparent backsheet) and cells that collect light on both faces. Energy gain depends on how much light reaches the back:`,
        },
        { kind: "equation", formula: "pv-bifacial-gain" },
        {
          kind: "md",
          md: md`**What drives rear irradiance:**

- **Albedo.** Fresh concrete ≈ 0.3; green grass ≈ 0.2; **light desert sand ≈ 0.25–0.4**; white gravel ≈ 0.4–0.6; snow 0.8. Kuwaiti ground varies — compacted gravelly soil, sand drift, and dust on the ground all change it, and albedo darkens when the ground is wet or disturbed by construction traffic. Measure it (albedometer: up- and down-facing pyranometers) for ≥ 12 months.
- **Height** above ground: higher = more uniform rear light, less self-shading. Single-axis trackers at 1.5–2.5 m hub height do well.
- **GCR**: lower GCR (wider row spacing) lets more light reach the ground between rows.
- **Rear shading** by torque tube, purlins and rails, and **rear mismatch** (bottom of modules sees more light than the centre): typically 5–15 % of rear energy.

Single-axis tracker + TOPCon (0.80) + sand albedo 0.3 typically gives rear/front ratio 7–12 % and **energy gain ≈ 5–9 %**. PVsyst handles this with a 2D view-factor model; for trackers ask for the "unlimited trackers" bifacial model or a 3D ray-tracing cross-check for large plants.

### Glass-glass modules

Two 2.0 mm heat-strengthened glass sheets (instead of 3.2 mm glass + polymer backsheet), usually frameless or with a lighter frame:

- **Pros**: near-zero moisture ingress through the rear, no backsheet cracking/chalking (a major failure mode of some polymer backsheets in hot climates), neutral-axis placement of cells reduces cell cracking under load, longer warranties (30 years).
- **Cons**: heavier, edge-sealing critical, glass breakage risk (thinner heat-strengthened glass, sensitive to clamp design and tracker torsion), higher operating temperature by ~1–2 K in some configurations.
- **Desert note**: front glass **anti-reflective coating (ARC)** abrades under sand-laden wind and abrasive cleaning; ask for abrasion test data (e.g. per IEC 62788-7-3 type tests or manufacturer data) and a cleaning method approved in the warranty.`,
        },
      ],
    },
    {
      layer: "theory",
      title: "Qualification: what IEC 61215 and 61730 prove — and what they don't",
      blocks: [
        {
          kind: "md",
          md: md`**IEC 61215** (design qualification and type approval) and **IEC 61730** (safety) are pass/fail type tests on a small number of samples (a handful of modules per test sequence). Key IEC 61215 sequences:

| Test | Stress | Purpose |
|---|---|---|
| Thermal cycling TC200 | −40 °C ↔ +85 °C, 200 cycles with current | Solder bond and interconnect fatigue |
| Damp heat DH1000 | 85 °C / 85 % RH, 1,000 h | Moisture ingress, corrosion, delamination |
| Humidity freeze HF10 | 85/85 then −40 °C | Adhesion, junction box |
| UV preconditioning | 15 kWh/m² UV | Encapsulant/backsheet UV stability |
| Mechanical load | 2,400 Pa (design load with safety factor) | Glass/frame strength |
| Hail | 25 mm ice ball at 23 m/s | Impact |
| Bypass diode thermal | Diode at Isc, 75 °C | Junction box heat |
| Hot-spot endurance | Shaded cell in reverse bias | Hot-spot robustness |

**What certification proves**: the *design* (bill of materials as tested) survives roughly the first years of stress without infant mortality. **What it does not prove**: 25–30-year durability, behaviour of *your* production batch, or durability if the manufacturer later changes encapsulant, backsheet, solder paste or cell supplier (the BOM). IEC 61215 failure criteria allow ≈ 5 % power loss per sequence.

**Extended testing**: Kiwa PVEL's **Product Qualification Program (PQP)** runs 2–3× the IEC stress (e.g. TC600, DH2000), plus mechanical stress sequences, PID, LeTID and UVID tests, on samples with a **witnessed BOM**. Its annual **PV Module Reliability Scorecard** names "Top Performer" BOMs. Bankable procurement specs typically require: Top Performer status (or PQP results) for the exact BOM supplied, independent factory witness, and contractual BOM lock.

**High temperature**: standard IEC 61215 materials ratings assume module temperatures up to ~70 °C for 98 % of the time. In Kuwait modules reach 75–85 °C. **IEC TS 63126** defines qualification levels (T98 = 80 °C or 90 °C) for higher-temperature operation — junction boxes, connectors, encapsulants and backsheets rated accordingly. Specify it.`,
        },
      ],
    },
    {
      layer: "theory",
      title: "Degradation mechanisms",
      blocks: [
        {
          kind: "md",
          md: md`| Mechanism | Cause | Typical magnitude | Detection | Mitigation |
|---|---|---|---|---|
| **LID** (B-O) | Boron–oxygen complexes in p-type Cz-Si under light | 1–3 % in first days | Flash test before/after light soak | n-type wafers; Ga-doped p-type |
| **LeTID** | Light and elevated temperature (> 50 °C) induced defects (hydrogen-related) in PERC | Up to 2–6 % over months–years, partly recovers | Lab LeTID test (IEC TS 63342) | Process regeneration; n-type; specify test results |
| **PID** | High voltage between cells and grounded frame drives ion (Na⁺) migration from glass; worst at negative pole, high humidity/heat | Up to 30 %+ on susceptible modules | EL (dark cells near string negative end); I-V shunting | PID-resistant cells/encapsulant (IEC TS 62804), negative grounding or night-time offset boxes |
| **UVID** | UV-induced degradation of front passivation (notably some TOPCon/HJT) | 1–4 %+ after UV exposure, product-dependent | UV exposure test (PVEL UVID) | Cell process tuning; specify UVID data |
| **Delamination** | Loss of adhesion of encapsulant from glass/cells (moisture, heat, poor lamination) | Progressive, can lead to corrosion and safety issues | Visual, IR | Lamination QA, gel content tests, DH tests |
| **Corrosion** | Moisture + acetic acid (EVA) attacks fingers/ribbons | Rising $R_s$, FF loss | I-V (knee), EL | POE/EPE encapsulant, glass-glass |
| **Cell cracks** | Handling, transport, installation stepping, wind/snow load, thermal cycling | Inactive cell areas grow over time | EL imaging | Packaging, handling procedures, no stepping on modules |
| **Backsheet cracking** | Polymer degradation (UV, heat) | Safety (insulation) failures, ground faults | Visual, insulation resistance | Glass-glass or proven backsheet |
| **Hot spots / diode failure** | Shading, cell defects, diode overheating | Local; safety risk | IR thermography | Diode rating, cleaning |

**Long-term rates.** NREL's review of ~2,000 field degradation rates (Jordan & Kurtz) found a median of ~0.5 %/yr for crystalline silicon, with hot climates and older technologies at the high end. Modern n-type glass-glass products are warranted at 0.4 %/yr; whether Kuwait fields achieve that is not yet proven — treat 0.4–0.5 %/yr as the realistic planning range and look for regional field data.`,
        },
        {
          kind: "widget",
          widget: "degradation",
          props: { rate: 0.4 },
          caption: "First-year LID plus linear degradation vs the warranty line. Try 0.4 %/yr (n-type warranty) and 0.6 %/yr (stressed desert field) and see when the field line crosses the warranty line.",
        },
      ],
    },
    // ============================================================ APPLIED
    {
      layer: "applied",
      title: "Warranty and bifacial arithmetic",
      blocks: [
        { kind: "equation", formula: "pv-warranty-degradation" },
        {
          kind: "worked",
          mode: "worked",
          title: "Warranted power over 30 years (n-type)",
          given: md`Linear power warranty: ≥ 99.0 % at end of year 1 ($d_1 = 1.0$ %), then −0.40 %/yr ($d_a = 0.004$) to year 30. Plant 500 MWp.`,
          steps: [
            { md: md`**Year 10**: $P_w = 1 - 0.010 - 0.004 \times 9 = 0.954$ (95.4 %).` },
            { md: md`**Year 30**: $P_w = 1 - 0.010 - 0.004 \times 29 = 0.874$ (87.4 %) — the headline "87.4 % at 30 years".` },
            { md: md`**Average warranted factor over 30 years**: arithmetic mean of a linear series = average of first and last: $(0.990 + 0.874)/2 = 0.932$.` },
            { md: md`**Meaning**: if the plant degrades exactly at the warranty line, lifetime energy is 93.2 % of a non-degrading plant. A yield model should use the *expected* degradation (often equal to or slightly better than warranty), not a more optimistic figure without evidence.` },
            { md: md`**Claim threshold**: at year 10 the 500 MWp plant should deliver ≥ 477 MWp at STC (95.4 %), less the measurement tolerance stated in the warranty (commonly ±3 % or the lab's uncertainty). Without a defined test method, a claim becomes an argument about uncertainty.` },
          ],
          result: md`87.4 % at year 30; lifetime average 93.2 %. The warranty is a *floor for claims*, not a promise of energy — and its value depends on the warrantor still existing and paying.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Bifacial gain: TOPCon vs PERC over desert sand",
          given: md`Single-axis tracker over sand, measured albedo 0.30, modelled rear/front irradiance ratio 9 %. Rear losses (structure shading + rear mismatch) 10 %. TOPCon bifaciality 0.80; PERC 0.70. Plant 500 MWp, base specific yield 2,100 kWh/kWp (monofacial).`,
          steps: [
            {
              md: md`**TOPCon gain**: $g = 0.80 \times 0.09 \times (1 - 0.10) = 0.0648$ → 6.5 %.`,
              hidden: true,
              check: { prompt: "TOPCon bifacial gain (%)", answer: 6.48, unit: "%", tolerance: { abs: 0.1 } },
            },
            { md: md`**PERC gain**: $g = 0.70 \times 0.09 \times 0.90 = 0.0567$ → 5.7 %.` },
            {
              md: md`**Extra energy from TOPCon's higher bifaciality**: $500{,}000\ \text{kWp} \times 2{,}100 \times (0.0648 - 0.0567) = 8{,}505$ MWh/yr.`,
              hidden: true,
              check: { prompt: "Extra annual energy (MWh/yr)", answer: 8505, unit: "MWh/yr", tolerance: { rel: 0.02 } },
            },
          ],
          result: md`≈ 6.5 % vs 5.7 %; TOPCon's bifaciality alone adds ≈ 8.5 GWh/yr on 500 MWp — on top of its temperature-coefficient advantage. If a bidder claims 12 % bifacial gain on the same geometry, they need rear/front ≈ 17 %, which requires much higher albedo or height than this site offers: challenge it.`,
        },
        {
          kind: "question",
          question: {
            id: "m02-l03-p1",
            type: "numeric",
            prompt: md`Independent problem. A p-type PERC module has a linear power warranty of 2.0 % in year 1, then 0.55 %/yr. What is the warranted minimum power at the end of year 25, as % of nameplate?`,
            answer: 84.8,
            tolerance: { abs: 0.1 },
            unit: "%",
            explanation: md`$P_w = 1 - 0.020 - 0.0055 \times 24 = 1 - 0.020 - 0.132 = 0.848$ → 84.8 %. Compare with 87.4 % at year *30* for n-type: the n-type warranty is both longer and tighter.`,
            concepts: ["m02.module-warranty"],
            difficulty: 1,
          },
        },
      ],
    },
    // ============================================================ FIELD
    {
      layer: "field",
      title: "Specifying, buying and warranting modules",
      blocks: [
        {
          kind: "md",
          md: md`### Warranty structure

Two separate warranties, often in one document:

| | Product (materials & workmanship) warranty | Power (performance) warranty |
|---|---|---|
| Typical term | 12–15 years (some 25–30 for glass-glass) | 25–30 years |
| Covers | Defects: delamination, junction box failure, frame/glass defects, backsheet cracking | Power below the warranted line at STC |
| Remedy | Repair, replace, or refund (at warrantor's option) | Replace, top-up modules, or cash compensation for the shortfall (pro rata) |
| Typical exclusions | Improper installation, cleaning methods not approved, transport damage, "acts of God" (sandstorms?) | Same; plus measurement method disputes |

**Read the small print for a desert:** approved cleaning methods (brush hardness, water quality, robot type) — a non-approved robot can void the warranty; exclusion of "sand abrasion"; who pays for testing, shipping and labour on claims (often excluded); measurement tolerance; and the **transferability** of the warranty from EPC to IPP SPV to lenders and eventually to MEWRE on transfer (if the PPA contemplates handback).

**Warrantor credit risk** is the hidden issue: a 30-year warranty from a manufacturer that may not exist in year 12 is worth little. Mitigations: tier-1 bankability lists, third-party warranty insurance, parent-company backing, and — most importantly — buying a product that won't fail.

### Supply chain and traceability

Lenders and governments increasingly require **traceability** from polysilicon to module: forced-labour legislation in the US (UFLPA) and EU has made polysilicon origin documentation a procurement condition. For MEWRE, traceability also supports quality: per-serial-number records link each module to its cell lot, BOM, flash-test and EL images.

Minimum asks: serial-numbered BOM (cells, glass, encapsulant, backsheet/rear glass, junction box, connector), polysilicon and wafer origin declarations, third-party supply-chain audit, BOM-lock clause (no BOM change without Employer/OE approval and re-testing), and the right to witness production.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **BOM swap**: the supplier ships modules with a different encapsulant or cell supplier from the one tested by PVEL; failures appear in year 3–5. Countermeasure: BOM lock + factory witness + random sample destructive testing.
- **UVID surprise**: a TOPCon product with strong initial results loses a few percent after a year of intense desert UV; lab UVID data was never requested.
- **PID at the negative end** of 1,500 V strings in humid coastal months, not detected until EL in year 2.
- **Glass breakage** on glass-glass modules from tracker torsion or clamp misplacement outside the approved clamping zones.
- **Warranty voided** by an unapproved cleaning robot or by high-TDS (salty) cleaning water.`,
        },
        {
          kind: "checklist",
          title: "Module specification minimums for a Kuwait IPP (Employer's Requirements)",
          items: [
            "IEC 61215 and IEC 61730 certificates for the exact BOM, by an accredited lab",
            "IEC TS 63126 high-temperature qualification (or equivalent ratings for junction box, connectors, encapsulant)",
            "Extended reliability evidence: PVEL PQP / Scorecard Top Performer for the supplied BOM, including PID, LeTID and UVID",
            "Temperature coefficient γ ≤ specified threshold (e.g. −0.32 %/°C) verified on lot samples",
            "Linear power warranty ≥ 30 years with defined test method and tolerance; product warranty ≥ 12 years",
            "Approved cleaning methods and water quality stated in the warranty and compatible with the O&M cleaning plan",
            "BOM lock, traceability to polysilicon origin, serial-level flash and EL data",
            "Warranty transferable to SPV, lenders and (if applicable) MEWRE",
          ],
        },
        {
          kind: "ask",
          title: "Ask the bidder / module OEM",
          items: [
            "Is the BOM you will supply the same one that achieved PVEL Top Performer status? Show the BOM-level PQP report.",
            "What are your UVID and LeTID test results for this BOM?",
            "What bifacial gain did you model, with what measured albedo and rear-loss assumptions?",
            "Which cleaning methods and robots are approved under the warranty?",
            "Who pays logistics, testing and labour for warranty claims, and what is the measurement tolerance?",
          ],
        },
        { kind: "scenario", scenario: "m02-s3" },
        {
          kind: "feynman",
          prompt: "Explain to a procurement committee member why an IEC 61215 certificate is necessary but not sufficient for buying modules for a 30-year plant in Kuwait.",
          keyPoints: [
            "IEC 61215 is a pass/fail type test on few samples of one BOM",
            "It screens infant mortality, not 30-year wear-out",
            "Production batches and BOM changes are not covered",
            "Extended tests (PVEL PQP: longer TC/DH, PID, LeTID, UVID) and high-temperature qualification are needed",
            "BOM lock, factory witness and lot testing tie the certificate to what is actually shipped",
          ],
        },
        { kind: "sources", refs: ["iec-61215", "iec-61730", "iec-ts-63126", "iec-62804", "pvel-scorecard", "nrel-degradation-2013"] },
      ],
    },
  ],
  quiz: [
    {
      id: "m02-l03-q1",
      type: "mcq",
      prompt: md`Why do n-type TOPCon and HJT modules carry a 1 % first-year degradation warranty versus 2 % for p-type PERC?`,
      options: [
        "They use thicker glass",
        "n-type (phosphorus-doped) wafers have no boron–oxygen complexes, so classic LID is essentially absent",
        "They operate cooler in all climates",
        "Their junction boxes have more bypass diodes",
      ],
      answer: 1,
      explanation: md`B-O LID is a boron-related defect in p-type Cz silicon. n-type bulk avoids it, so the first-year loss allowance can be halved.`,
      concepts: ["m02.cell-technologies", "m02.degradation-mechanisms"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m02-l03-q2",
      type: "numeric",
      prompt: md`Bifaciality 0.85 (HJT), rear/front irradiance ratio 10 %, rear losses 12 %. Estimate the bifacial energy gain in %.`,
      answer: 7.48,
      tolerance: { abs: 0.1 },
      unit: "%",
      explanation: md`$g = 0.85 \times 0.10 \times (1 - 0.12) = 0.0748$ → 7.5 %. Within the 5–9 % range typical for trackers over light sand.`,
      concepts: ["m02.bifacial-gain"],
      difficulty: 1,
    },
    {
      id: "m02-l03-q3",
      type: "multi",
      prompt: md`Which are true of IEC 61215 certification? Select all.`,
      options: [
        "It is a type test on a small number of samples of a specific design/BOM",
        "It demonstrates 30-year field durability",
        "It includes thermal cycling, damp heat and mechanical load tests",
        "It remains valid automatically if the supplier changes encapsulant",
      ],
      answer: [0, 2],
      explanation: md`IEC 61215 screens design weaknesses and infant mortality; it does not prove lifetime, and BOM changes require re-assessment. That is why extended testing and BOM lock exist.`,
      concepts: ["m02.module-qualification"],
      difficulty: 2,
    },
    {
      id: "m02-l03-q4",
      type: "mcq",
      prompt: md`Two years after COD, EL imaging shows modules near the **negative end** of many strings with darkened cells and the I-V curves show reduced shunt resistance. Most likely mechanism?`,
      options: ["LID", "Potential-induced degradation (PID)", "Delamination", "UV-induced degradation"],
      answer: 1,
      explanation: md`PID is driven by the voltage between cells and the grounded frame; the most negative modules see the largest potential and degrade first, showing shunting. Mitigation: PID-resistant BOM, negative grounding or night-time PID recovery devices; warranty claim if the BOM was certified PID-resistant.`,
      concepts: ["m02.degradation-mechanisms"],
      difficulty: 2,
    },
    {
      id: "m02-l03-q5",
      type: "decision",
      prompt: md`You are the MEWRE PM reviewing the IPP's module change request: the EPC wants to switch to a different module supplier because of a delivery delay. The new module has IEC certificates but no PVEL results for its current BOM. Schedule float is 4 weeks.`,
      options: [
        { text: "Approve — IEC certified modules are equivalent.", score: 0, feedback: "IEC certification alone does not prove durability; and a supplier switch is a key point under the PPA technical requirements." },
        { text: "Ask the OE/LTA to assess: require BOM-level extended test evidence (or an accelerated test programme), a factory audit, and confirmation the change meets the PPA minimum technical requirements before no-objection.", score: 1, feedback: "Right: proportionate, evidence-based, and protects the 30-year asset while keeping the schedule conversation open." },
        { text: "Reject any change and insist on the original supplier.", score: 0.3, feedback: "Inflexible; may cause a longer delay than a managed substitution." },
        { text: "Approve on condition the EPC extends the power warranty by 5 years.", score: 0.4, feedback: "A longer warranty from an unproven supplier does not fix technical risk." },
      ],
      explanation: md`Supplier substitutions are one of the highest-risk changes on a PV project. Treat them as a design change requiring evidence equivalent to the original approval.`,
      concepts: ["m02.module-qualification", "m02.module-warranty"],
      difficulty: 2,
    },
    {
      id: "m02-l03-q6",
      type: "numeric",
      prompt: md`n-type warranty: 1 % year 1, then 0.4 %/yr. What warranted power fraction applies at the end of year 20 (in %)?`,
      answer: 91.4,
      tolerance: { abs: 0.1 },
      unit: "%",
      explanation: md`$1 - 0.01 - 0.004 \times 19 = 0.914$ → 91.4 %.`,
      concepts: ["m02.module-warranty"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "m02-l03-f1", front: "Typical bifaciality: PERC / TOPCon / HJT", back: "≈ 0.70 / 0.80 / 0.85–0.90", concepts: ["m02.bifacial-gain"] },
    { id: "m02-l03-f2", front: "Albedo of light desert sand", back: "≈ 0.25–0.4 (measure on site; varies with moisture and dust)", concepts: ["m02.bifacial-gain"] },
    { id: "m02-l03-f3", front: "Typical bifacial gain on trackers over sand", back: "≈ 5–9 %", concepts: ["m02.bifacial-gain"] },
    { id: "m02-l03-f4", front: "n-type 30-year warranted power", back: "87.4 % (1 % yr 1, then 0.4 %/yr)", concepts: ["m02.module-warranty"] },
    { id: "m02-l03-f5", front: "PID", back: "Potential-induced degradation: ion migration driven by cell-to-frame voltage; worst at string negative end; seen as shunting in EL/I-V.", concepts: ["m02.degradation-mechanisms"] },
    { id: "m02-l03-f6", front: "LeTID", back: "Light- and elevated-temperature-induced degradation, mainly PERC; matters in hot climates.", concepts: ["m02.degradation-mechanisms"] },
    { id: "m02-l03-f7", front: "IEC TS 63126", back: "Qualification guidance for modules/components operating at high temperatures (T98 of 80 or 90 °C).", concepts: ["m02.module-qualification"] },
    { id: "m02-l03-f8", front: "Product vs power warranty", back: "Product = defects in materials/workmanship (12–15 yr); power = minimum STC output over 25–30 yr.", concepts: ["m02.module-warranty"] },
    { id: "m02-l03-f9", front: "What is a BOM lock?", back: "Contract clause forbidding changes to module materials/components without approval and re-testing.", concepts: ["m02.module-warranty", "m02.module-qualification"] },
  ],
  scenarios: [
    {
      id: "m02-s3",
      title: "The cheaper module",
      dayInLife: true,
      context: md`An IPP building a 1,100 MW PV plant under a 30-year PPA with MEWRE informs the Employer's team that, because of a price drop, it wants to switch to a different TOPCon supplier, saving roughly 1 USD-cent/Wp. The PPA requires Employer no-objection to changes in "major equipment" listed in the technical schedule. You are the MEWRE PM.`,
      start: "a",
      concepts: ["m02.module-qualification", "m02.cell-technologies", "m02.module-warranty"],
      nodes: {
        a: {
          md: md`The request arrives with IEC 61215/61730 certificates and a datasheet. γ is −0.30 %/°C (original: −0.29). Bifaciality 0.75 (original 0.80). No PVEL report. What do you request?`,
          choices: [
            { text: "A full equivalence package: BOM-level PVEL PQP (incl. UVID, LeTID, PID), lot-sample γ verification, PAN file with independent validation, updated PVsyst energy, warranty terms, and traceability declarations.", next: "b", score: 10, feedback: "Complete and proportionate. You compare like with like." },
            { text: "Just the updated PVsyst yield — energy is what matters.", next: "b", score: 5, feedback: "Energy matters, but durability and warranty risk are not in a year-1 yield run." },
            { text: "No objection — the IPP carries the energy risk anyway.", next: "c", score: 2, feedback: "The IPP carries revenue risk; MEWRE carries supply reliability and possibly handback risk." },
          ],
        },
        b: {
          md: md`The updated PVsyst shows P50 −0.9 % (lower bifaciality and slightly worse γ). PVEL data exist for an older BOM only; UVID results are missing. The IPP says the module saving funds a better cleaning robot fleet. How do you respond?`,
          choices: [
            { text: "No objection only subject to: a UVID test on the actual BOM before shipment, a BOM lock, factory witness by the OE, and confirmation that the PPA's minimum performance obligations are unchanged.", next: "d", score: 10, feedback: "Conditional no-objection with verifiable conditions — the IPP keeps its saving, MEWRE keeps its protection." },
            { text: "Object outright because P50 drops.", next: "d", score: 5, feedback: "Defensible but may not be proportionate if conditions can manage the risk; check PPA wording on grounds for objection." },
          ],
        },
        c: {
          md: md`Three years after COD, EL surveys show UV-related degradation of 3 % beyond the warranty line in a large block. The IPP files a warranty claim, but the OEM disputes the measurement method. MEWRE's contracted capacity is unaffected but delivered energy is down. What is the lesson?`,
          choices: [
            { text: "Major-equipment changes need evidence-based review; MEWRE should also insist on defined warranty test methods in the PPA technical schedule.", score: 8, feedback: "Correct lesson." },
            { text: "Lesson: always choose the original supplier.", score: 3, feedback: "Too blunt; the issue was the lack of evidence, not the change itself." },
          ],
        },
        d: {
          md: md`The UVID test comes back with 1.2 % loss after the PVEL-equivalent dose, comparable to the original module. You close the item. What do you record in the project file?`,
          choices: [
            { text: "The no-objection letter with conditions, evidence reviewed, OE recommendation, and the residual risk (0.9 % lower P50) noted in the risk register.", score: 10, feedback: "Audit-ready: decisions in a ministry must be traceable for the Audit Bureau and successors." },
            { text: "An email to the IPP saying 'OK'.", score: 2, feedback: "Not auditable; a public-sector decision needs a formal record." },
          ],
        },
      },
    },
  ],
};

export default lesson;
