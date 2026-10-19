import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m01-l04",
  title: "Per-Unit, Transformers and Fault Levels",
  summary:
    "The per-unit system that makes multi-voltage networks tractable, the transformer datasheet line by line (ratio, impedance, losses, ONAN/ONAF, 50 °C derating), and how to estimate short-circuit levels and check switchgear duty.",
  minutes: 65,
  objectives: [
    "You can convert impedances between ohms and per unit and change base (MVA and kV).",
    "You can read a power-transformer datasheet: ratio and taps, vector group, impedance, no-load and load losses, cooling class and ambient basis.",
    "You can explain why a transformer specified to IEC default ambient is not rated for Kuwait and what to specify instead.",
    "You can estimate three-phase fault level and current at a bus from grid fault level and transformer impedance, and compare with switchgear ratings.",
  ],
  concepts: [
    {
      id: "m01.per-unit",
      name: "Per-unit system",
      description: "Expressing quantities as fractions of chosen bases (MVA, kV) so transformer ratios disappear and impedances can be added directly.",
      competency: "engineering",
      related: ["m01.fault-level", "m06.load-flow"],
    },
    {
      id: "m01.transformer-ratings",
      name: "Transformer ratings and losses",
      description: "Turns ratio and taps, short-circuit impedance, no-load and load losses, cooling class (ONAN/ONAF), temperature-rise limits and ambient basis.",
      competency: "engineering",
      related: ["m01.transformer-derating", "m07.long-lead-items"],
    },
    {
      id: "m01.transformer-derating",
      name: "Transformer derating for hot climates",
      description: "IEC 60076-2 rises assume max 40 °C, monthly average 30 °C, yearly average 20 °C ambient; Kuwaiti sites exceed these, so limits must be reduced or the unit designed for site ambient.",
      competency: "engineering",
      related: ["m02.thermal-derating", "m00.available-capacity"],
    },
    {
      id: "m01.fault-level",
      name: "Short-circuit level and fault current",
      description: "Fault MVA and kA at a bus, set by source and series impedances; determines switchgear duty and indicates system strength.",
      competency: "grid",
      related: ["m01.system-strength", "m06.fault-level", "m06.protection"],
    },
  ],
  sections: [
    // ================================================================ THEORY
    {
      layer: "theory",
      title: "Per unit, transformers and short circuits",
      blocks: [
        {
          kind: "md",
          md: md`### Transformers first

An ideal transformer couples two windings on a common core. The same flux links both, so voltage per turn is equal; power in equals power out, so current scales inversely:`,
        },
        { kind: "equation", formula: "m01-turns-ratio" },
        {
          kind: "md",
          md: md`A 400/33 kV transformer has a ratio of 12.12. A 10 Ω impedance on the 33 kV side looks like $10 \times 12.12^2 = 1{,}469$ Ω from the 400 kV side. With four or five voltage levels on a PV plant (0.8 kV, 33 kV, 132 kV, 400 kV), this referral bookkeeping becomes error-prone — hence per unit.

A real transformer adds:

- **Leakage reactance** (flux that does not link both windings) — appears as the **short-circuit impedance** $u_k$ or $z$ (%), measured by shorting one winding and raising voltage on the other until rated current flows. Typical: 6% (distribution), 8–10% (inverter step-up), 12–16% (132/33 kV and 400/33 kV units), up to 18–20% for large 400 kV units.
- **Winding resistance** → **load (copper) losses** $P_k$, ∝ current².
- **Core magnetisation and hysteresis/eddy currents** → **no-load (iron) losses** $P_0$, present whenever energised.
- **Tap changer** — on-load (OLTC, e.g. ±10 × 1.25%) on grid transformers to hold MV voltage; off-circuit taps (±2 × 2.5%) on inverter transformers.

### The per-unit system

Choose two bases — usually $S_\text{base} = 100$ MVA (system-wide) and $V_\text{base}$ = nominal line voltage of each zone. The others follow:`,
        },
        { kind: "equation", formula: "m01-base-impedance" },
        { kind: "equation", formula: "m01-base-current" },
        { kind: "equation", formula: "m01-per-unit" },
        {
          kind: "md",
          md: md`Because voltage bases change across a transformer in the ratio of its rated voltages, **a transformer's per-unit impedance is the same from both sides** and the ideal transformer vanishes from the circuit. A nameplate 12% is simply $z = 0.12$ pu on the transformer's own MVA rating. To combine elements, put them on the same base:`,
        },
        { kind: "equation", formula: "m01-base-change" },
        {
          kind: "callout",
          tone: "why",
          title: "Why engineers love per unit",
          md: md`(1) Transformer ratios disappear — the whole multi-voltage network becomes one circuit. (2) Values fall in narrow typical ranges (transformer z 0.06–0.20 pu, generator x''d 0.15–0.25 pu), so errors jump out. (3) Voltages near 1.0 pu are "normal" at any level — 0.9 or 1.1 pu means the same thing at 33 kV and at 400 kV. Every grid study you receive (load flow, short circuit, stability) is in per unit.`,
        },
        { kind: "widget", widget: "per-unit", caption: "Try: 100 MVA base at 33 kV gives Z_base = 10.89 Ω and I_base = 1,750 A. Convert a 0.5 Ω cable to per unit, then re-base a 90 MVA, 12% transformer onto 100 MVA." },
        {
          kind: "md",
          md: md`### Losses and efficiency`,
        },
        { kind: "equation", formula: "m01-transformer-losses" },
        {
          kind: "md",
          md: md`Large power transformers are 99.5–99.8% efficient at rated load, but the absolute losses are large: a 250 MVA unit might have $P_0 \approx 100$–150 kW and $P_k \approx 700$–900 kW. For a PV plant the main transformer is energised 8,760 h/yr but loaded only in daylight, so **no-load losses** accumulate around the clock and are often 40–50% of annual transformer loss energy. Tender evaluations therefore **capitalise losses**: bid price + A × P₀ + B × P_k (A and B in KWD/kW, from tariff and discount rate), so a cheaper but lossier transformer does not win.

### Cooling classes: ONAN, ONAF and friends

The four-letter IEC code describes the internal coolant and its circulation, then the external coolant and its circulation:

| Code | Meaning | Typical use |
|---|---|---|
| ONAN | Oil Natural, Air Natural (radiators, no fans) | Base rating; inverter step-up units |
| ONAF | Oil Natural, Air Forced (fans on radiators) | Second rating step, e.g. ONAN/ONAF 200/250 MVA |
| OFAF / ODAF | Oil Forced (pumps) / Directed, Air Forced | Large grid transformers |
| KNAN | K-class ester fluid (less flammable), natural cooling | Indoor or fire-sensitive locations |

"ONAN/ONAF 200/250 MVA" means 200 MVA with fans off and 250 MVA with fans running — fans add 25%. Losing fans in a sandstorm (clogged filters, failed motors) drops capacity to the ONAN value.

### Temperature-rise limits and why 50 °C matters

IEC 60076-2 specifies temperature-rise limits (for mineral-oil ONAN/ONAF units: top oil 60 K, average winding 65 K, hot-spot 78 K) **above an ambient of max 40 °C, hottest-month average 30 °C and yearly average 20 °C**. Insulation ageing roughly doubles for every 6 K of hot-spot temperature above ~98 °C (IEC 60076-7). Where the site exceeds these normal ambient values, IEC requires the rise limits to be **reduced by the excess**.

Kuwait routinely exceeds all three (summer maxima ≥ 50 °C, hottest-month averages well above 30 °C, yearly average well above 20 °C). A transformer designed to the IEC default will run hotter than intended and age prematurely at nameplate load. Options:

1. **Specify site ambient** in the purchase specification (e.g. max 55 °C, monthly average 40 °C, yearly average 30 °C, plus solar radiation and dust), so the manufacturer designs reduced rises in — the correct approach for new projects.
2. **Derate** an existing standard unit — as a planning rule of thumb, roughly 1% of rating per K of excess ambient for ONAN/ONAF units (always confirm with the manufacturer's thermal calculation per IEC 60076-7).`,
        },
        { kind: "equation", formula: "m01-fault-current-transformer" },
        {
          kind: "md",
          md: md`### Short-circuit level

When a three-phase fault occurs, current is limited only by the impedances between sources and fault. Using per unit on a common base, add series impedances and divide:`,
        },
        { kind: "equation", formula: "m01-fault-level" },
        {
          kind: "md",
          md: md`Key points:

- **Sources differ hugely.** A synchronous generator contributes 4–7× rated current in the first cycles (subtransient reactance $x''_d$ ≈ 0.15–0.25 pu). An inverter is current-limited to about **1.0–1.5× rated** — it barely adds to fault level. This is the root of "system strength" problems (lesson 6).
- **X/R and DC offset.** The first peak includes a decaying DC component; IEC 60909 peak current $i_p = \kappa\sqrt2\,I_k''$ with κ ≈ 1.8–1.9 at high X/R. Breakers must make (close onto) this peak and break the symmetrical RMS current.
- **Voltage factor.** IEC 60909 multiplies the pre-fault voltage by c = 1.1 for maximum fault current at MV/HV.
- **Fault level is both a constraint and a resource.** High fault level stresses switchgear (rated e.g. 50 kA at 400 kV, 40 kA at 132 kV, 25 or 31.5 kA at 33 kV) but means a strong, stiff grid where voltage hardly moves when a PV plant ramps.`,
        },
        { kind: "sources", refs: ["m01-iec-60076", "m01-iec-60909"] },
      ],
    },
    // ================================================================ APPLIED
    {
      layer: "applied",
      title: "Fault levels and transformer numbers on a PV plant",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "33 kV fault level behind a 400/33 kV, 250 MVA PV main transformer",
          given: md`The 400 kV grid at the plant's substation has a three-phase fault level of 15,000 MVA (illustrative — the real value comes from the MEWRE Transmission study). The main transformer is 250 MVA, 400/33 kV, $u_k$ = 14%. The 33 kV switchgear is offered at 25 kA, 3 s. Use 100 MVA base. Ignore cable impedance and the inverters' own contribution at first.`,
          steps: [
            { md: md`**Grid impedance.** $z_\text{grid} = S_\text{base}/S_\text{sc,grid} = 100/15{,}000 = 0.00667$ pu.` },
            { md: md`**Transformer on 100 MVA base.** $z_T = 0.14 \times 100/250 = 0.056$ pu (voltage bases equal rated voltages, so no voltage correction).` },
            { md: md`**Total.** $z = 0.00667 + 0.056 = 0.0627$ pu.` },
            { md: md`**Fault level at 33 kV.** $S_\text{sc} = 100/0.0627 = 1{,}596$ MVA. **Current:** $I = 1{,}596/(\sqrt3 \times 33) = 27.9$ kA. With IEC 60909 c = 1.1: about **30.7 kA**.` },
            { md: md`**Add inverters.** 250 MVA of inverters at ~1.2 pu current contribute about $250 \times 1.2/(\sqrt3\times33) = 5.2$ kA more (much less than equivalent synchronous machines would).` },
          ],
          result: md`Prospective 33 kV fault current ≈ **31–36 kA** — the 25 kA switchgear is **inadequate**. Options: 40 kA (or 31.5 kA with careful verification) switchgear, a higher-impedance transformer (e.g. 18%, at the cost of more reactive loss and voltage regulation), or splitting the 33 kV bus with two transformers. This is exactly the kind of interface number a PM must make the EPC verify against the grid operator's declared maximum fault level — which will rise over the plant's life as the grid grows.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Re-basing and adding impedances on a 132/33 kV feeder",
          given: md`A 33 kV collector cable has impedance 0.5 Ω per phase (mostly reactive, for simplicity treat as magnitude). It is fed by a 90 MVA, 132/33 kV transformer with $u_k$ = 12%, from a 132 kV grid with fault level 5,000 MVA. Base: 100 MVA, 33 kV in the cable zone.`,
          steps: [
            { md: md`Base impedance at 33 kV: $Z_\text{base} = 33^2/100 = 10.89$ Ω.` },
            {
              md: md`Cable: $z = 0.5/10.89 = 0.0459$ pu.`,
              hidden: true,
              check: { prompt: "Cable impedance in pu on 100 MVA", answer: 0.0459, unit: "pu", tolerance: { rel: 0.02 } },
            },
            {
              md: md`Transformer: $z = 0.12 \times 100/90 = 0.1333$ pu.`,
              hidden: true,
              check: { prompt: "Transformer impedance on 100 MVA base", answer: 0.1333, unit: "pu", tolerance: { rel: 0.01 } },
            },
            { md: md`Grid: $100/5{,}000 = 0.020$ pu. Total to the cable end: $0.020 + 0.1333 + 0.0459 = 0.199$ pu.` },
            { md: md`Fault level at the cable end: $100/0.199 = 502$ MVA → $I = 502/(\sqrt3\times33) = 8.8$ kA.` },
          ],
          result: md`≈ **502 MVA / 8.8 kA** at the remote end, versus ≈ 652 MVA / 11.4 kA at the 33 kV busbar. Fault level falls along feeders — relevant to protection settings (remote faults must still be detected) and to inverter voltage stability at the far end.`,
        },
        {
          kind: "question",
          question: {
            id: "m01-l04-p1",
            type: "numeric",
            prompt: md`A 250 MVA PV main transformer has no-load loss $P_0$ = 110 kW. It stays energised all year (8,760 h). How much energy (MWh/yr) does the no-load loss alone consume?`,
            answer: 963.6,
            tolerance: { rel: 0.01 },
            unit: "MWh",
            explanation: md`$110\ \text{kW} \times 8{,}760\ \text{h} = 963{,}600$ kWh = **963.6 MWh/yr** — the output of roughly 0.4 MW of PV for a year, lost regardless of how much the plant generates. At an illustrative 10 fils/kWh that is about KWD 9,600/yr, or almost KWD 290,000 over a 30-year PPA (undiscounted). That is why loss capitalisation belongs in transformer bid evaluation.`,
            concepts: ["m01.transformer-ratings"],
            difficulty: 1,
          },
        },
      ],
    },
    // ================================================================ FIELD
    {
      layer: "field",
      title: "Checking a transformer datasheet and the fault-level interface",
      blocks: [
        {
          kind: "md",
          md: md`### The transformer datasheet, line by line

| Datasheet line | What to check | Typical red flag |
|---|---|---|
| Rated power, e.g. ONAN/ONAF 200/250 MVA | Which rating is used in the plant design; is ONAN enough if fans fail? | Design uses ONAF rating with no fan redundancy (N+1) |
| Ambient basis | Must be site values (max ≥ 50–55 °C, monthly and yearly averages) | "IEC 60076-2 normal service conditions" (40/30/20 °C) |
| Temperature rises | Top oil / winding / hot-spot reduced for site ambient | Standard 60/65/78 K with no reduction |
| Voltage ratio and taps | OLTC range covers grid voltage band and reactive requirement | Tap range too narrow for 0.9–1.1 pu operation at full Q |
| Vector group | Consistent with grid earthing and protection design | Mismatch with grid operator's requirement |
| Impedance $u_k$ and tolerance | Consistent with fault-level and reactive studies; IEC tolerance ±7.5% (±10% for some) | Study used a different value than the datasheet |
| $P_0$, $P_k$ (guaranteed, with tolerance) | Match the loss-capitalised bid evaluation; penalties for exceedance at FAT | No loss penalty clause |
| Short-circuit withstand (IEC 60076-5) | Rated for the declared maximum fault level, ideally with growth margin | Fault level used is today's, not future |
| Insulation levels (LI/SI/AC) | Per IEC 60076-3 for system voltage; altitude/pollution | — |
| Sound level, dimensions, transport weight | Route survey for 200+ t units to Shagaya | Transport not checked against road/bridge limits |

### Factory and site tests

At the factory acceptance test (FAT) — which the Employer's or OE's inspector should witness for main transformers — routine tests include ratio and vector group, winding resistance, impedance and load loss, no-load loss and current, dielectric tests, and **SFRA** fingerprint. A **temperature-rise (heat-run) test** is a type/special test: specify it for the first unit of a design, because it is the only direct proof of the hot-climate rating. On site: SFRA again (to detect transport damage), oil tests (DGA), insulation resistance, and impact-recorder readings from the shipment.`,
        },
        { kind: "widget", widget: "pv-sld", caption: "Find each transformer on the SLD (inverter step-up, main 400/33 kV) and ask: on what ambient basis is it rated, and what fault level must it withstand?" },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Long lead times and the 'standard design' temptation",
          md: md`Large power transformers have had lead times of 2–4 years in the 2023–2026 market. Under schedule pressure, contractors propose a manufacturer's "standard" design built for IEC normal ambient. Accepting it unchanged in Kuwait trades schedule for a transformer that ages faster every summer — a 30-year asset problem for the Ministry, long after the EPC's defects liability period. If time forces a standard unit, agree a documented derating, loading limits in the O&M manual, and fan/radiator redundancy.`,
        },
        {
          kind: "callout",
          tone: "kuwait",
          title: "Who owns the 400 kV interface on Shagaya",
          md: md`For Shagaya Phase III Zone 1, the IPP's scope includes a 400 kV substation, while the Shagaya–Al-Wafra 400 kV overhead line was procured separately by MEWRE (awarded March 2026 to Power Grid Company (Kuwait), KD 48.6 m). The maximum and minimum fault levels at the 400 kV interface are therefore an **interface data item** that MEWRE Transmission must declare and the IPP must design for. Make sure the declared values, their future growth and the date they apply are recorded in the interface documentation.`,
        },
        { kind: "sources", refs: ["m01-agbi-zone1-rfp", "m01-megaproject-400kv"] },
        {
          kind: "checklist",
          title: "PM checklist — transformers and fault level",
          items: [
            "Purchase specification states site ambient (max, hottest-month average, yearly average), solar radiation, dust and altitude — not 'IEC normal'.",
            "Temperature-rise limits reduced accordingly; heat-run test specified for the first unit of each design.",
            "ONAN rating adequate for the critical load case if fans fail, or N+1 fans and dust-proof filters specified.",
            "Losses guaranteed with penalty rates matching the capitalisation used in evaluation.",
            "Maximum (and minimum) fault level at the POC declared in writing by the grid operator, including future growth.",
            "Switchgear short-circuit ratings ≥ calculated maximum with IEC 60909 c = 1.1 plus inverter contribution and margin.",
            "Transport route survey for the main transformer done before the order is placed.",
            "FAT witness plan and site SFRA/DGA tests included in the ITP.",
          ],
        },
        {
          kind: "ask",
          title: "Ask the EPC / transformer manufacturer",
          items: [
            "What ambient conditions is this transformer designed for, and what are the guaranteed rises at those conditions?",
            "What is the ONAN rating, and what load can be carried with one fan group out of service at 50 °C?",
            "What maximum fault level at the 400 kV and 33 kV buses did you design to, and who declared it?",
            "Which impedance value (with tolerance) did you use in the short-circuit and reactive-power studies?",
            "Will you perform a temperature-rise test, and on which unit?",
            "What is the delivery lead time, and what is the route and transport plan to site?",
          ],
        },
        { kind: "scenario", scenario: "m01-s3" },
        {
          kind: "feynman",
          prompt: "Explain what 'fault level' means and why a high one is both a problem and a good thing.",
          keyPoints: [
            "Fault level is the current (or MVA) that would flow into a short circuit at a point.",
            "It is set by how strong the sources are and how much impedance lies between them and the fault.",
            "Switchgear, busbars and transformers must withstand it, so a high fault level means expensive, heavily rated equipment.",
            "A high fault level also means a stiff grid where voltage barely changes when loads or generators change.",
            "Inverters add little fault current, so as they replace synchronous machines, fault level and grid strength fall.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m01-l04-q1",
      type: "numeric",
      prompt: md`What is the base impedance (Ω) at 132 kV on a 100 MVA base?`,
      answer: 174.24,
      tolerance: { rel: 0.01 },
      unit: "Ω",
      explanation: md`$Z_\text{base} = 132^2/100 = 174.24$ Ω. Using kV² / MVA gives ohms directly.`,
      concepts: ["m01.per-unit"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m01-l04-q2",
      type: "numeric",
      prompt: md`A 500 MVA transformer has $u_k$ = 16%. What is its impedance on a 100 MVA base (pu)?`,
      answer: 0.032,
      tolerance: { rel: 0.01 },
      unit: "pu",
      explanation: md`$z_\text{new} = 0.16 \times 100/500 = 0.032$ pu. A bigger transformer with the same percentage impedance has a smaller per-unit impedance on a common base — it lets more fault current through.`,
      concepts: ["m01.per-unit"],
      difficulty: 2,
    },
    {
      id: "m01-l04-q3",
      type: "numeric",
      prompt: md`A 90 MVA, 132/33 kV transformer with $u_k$ = 12% is fed from an infinitely strong 132 kV source. What is the maximum symmetrical three-phase fault current on the 33 kV side (kA), ignoring the c factor?`,
      answer: 13.1,
      tolerance: { rel: 0.02 },
      unit: "kA",
      explanation: md`$I_r = 90/(\sqrt3\times33) = 1.575$ kA; $I_\text{sc} = 1.575/0.12 = 13.1$ kA (fault level 750 MVA). A real grid adds source impedance and lowers this slightly (11.4 kA with a 5,000 MVA grid).`,
      concepts: ["m01.fault-level"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "m01-l04-q4",
      type: "mcq",
      prompt: md`A transformer nameplate reads "ONAN/ONAF 160/200 MVA". What does it mean?`,
      options: [
        "160 MVA continuous, 200 MVA for 1 hour emergency.",
        "160 MVA with natural oil and air cooling; 200 MVA with fans running on the radiators.",
        "160 MVA at 50 °C ambient, 200 MVA at 20 °C ambient.",
        "160 MVA on the LV winding, 200 MVA on the HV winding.",
      ],
      answer: 1,
      explanation: md`ON = oil natural circulation; AN/AF = air natural/forced. Fans add 25% here. Both ratings are at the specified ambient basis — which must be checked separately.`,
      concepts: ["m01.transformer-ratings"],
      difficulty: 1,
    },
    {
      id: "m01-l04-q5",
      type: "multi",
      prompt: md`Which statements about transformers in Kuwaiti PV plants are correct? Select all that apply.`,
      options: [
        "IEC 60076-2 default rises assume a maximum ambient of 40 °C, so a Kuwaiti site exceeds normal service conditions.",
        "No-load losses matter more for PV plants because the transformer is energised 24 h but loaded only in daylight.",
        "Per-unit impedance of a transformer differs depending on which side you view it from.",
        "Loss of cooling fans reduces available capacity to the ONAN rating.",
        "Temperature-rise test is a routine test performed on every unit.",
      ],
      answer: [0, 1, 3],
      explanation: md`IEC normal ambient is 40/30/20 °C; Kuwait exceeds it. No-load loss accrues 8,760 h. Per-unit impedance is the same from both sides (that is the point of per unit). Fans failing drops capacity to ONAN. Heat-run is a type/special test — specify it explicitly.`,
      concepts: ["m01.transformer-derating", "m01.transformer-ratings", "m01.per-unit"],
      difficulty: 2,
    },
    {
      id: "m01-l04-q6",
      type: "short",
      prompt: md`Why do inverter-based plants contribute much less fault current than synchronous generators, and what is one consequence for the grid?`,
      rubric: [
        "Inverter output current is limited by power-semiconductor ratings, typically 1.0–1.5 pu.",
        "Synchronous machines are limited only by their internal (subtransient) reactance, giving 4–7 pu.",
        "Consequence: lower fault levels/system strength as IBR displace synchronous plant.",
        "Effects such as protection relays struggling to detect faults, larger voltage swings, or need for synchronous condensers/grid-forming.",
      ],
      modelAnswer: md`An inverter's IGBTs would be destroyed by high currents, so its controls clamp output current at about 1.0–1.5 times rated, even during a fault. A synchronous generator is limited only by its subtransient reactance (~0.2 pu), so it pushes 4–7 times rated current. As PV and BESS replace synchronous units, the grid's fault level falls: protection that relies on high fault currents may not operate reliably, voltage dips spread further, and weak-grid control instability can appear — which may require synchronous condensers, STATCOMs or grid-forming inverters.`,
      explanation: md`This links lesson 4 (fault level) to lesson 6 (system strength). Fault level is both a duty for equipment and the measure of how stiff the grid is.`,
      concepts: ["m01.fault-level"],
      difficulty: 3,
    },
  ],
  flashcards: [
    { id: "m01-l04-f1", front: "Base impedance", back: md`$Z_\text{base} = V_\text{base}^2/S_\text{base}$ (kV²/MVA → Ω)`, concepts: ["m01.per-unit"] },
    { id: "m01-l04-f2", front: "Change of MVA base for an impedance", back: md`$z_\text{new} = z_\text{old}\,S_\text{new}/S_\text{old}$ (same kV)`, concepts: ["m01.per-unit"] },
    { id: "m01-l04-f3", front: "Fault current through a transformer from a stiff grid", back: md`$I_\text{sc} = I_r/z_\text{pu}$`, concepts: ["m01.fault-level"] },
    { id: "m01-l04-f4", front: "Fault level from total per-unit impedance", back: md`$S_\text{sc} = S_\text{base}/z_\text{total}$`, concepts: ["m01.fault-level"] },
    { id: "m01-l04-f5", front: "IEC 60076-2 normal ambient", back: "Max 40 °C, hottest-month average 30 °C, yearly average 20 °C", concepts: ["m01.transformer-derating"] },
    { id: "m01-l04-f6", front: "ONAN vs ONAF", back: "Oil natural/air natural vs oil natural/air forced (fans) — fans typically add ~25–33% rating", concepts: ["m01.transformer-ratings"] },
    { id: "m01-l04-f7", front: "Inverter vs synchronous fault contribution", back: "Inverter ≈ 1.0–1.5 pu; synchronous ≈ 4–7 pu", concepts: ["m01.fault-level"] },
    { id: "m01-l04-f8", front: "Transformer loss equation", back: md`$P_\text{loss} = P_0 + P_k(S/S_r)^2$`, concepts: ["m01.transformer-ratings"] },
    { id: "m01-l04-f9", front: "IEC 60909 voltage factor for maximum fault current (MV/HV)", back: "c = 1.1", concepts: ["m01.fault-level"] },
  ],
  scenarios: [
    {
      id: "m01-s3",
      title: "The 'standard' 400/33 kV transformer",
      context: md`Week 30 of construction on a 1 GW PV IPP. The EPC writes that the specified main transformers (site-ambient design, 55 °C max) have a 34-month lead time that would delay COD by 9 months. It proposes a manufacturer's standard ONAN/ONAF 200/250 MVA design, designed for IEC normal ambient, available in 20 months. The OE estimates the standard unit should be derated by about 10–12% for Shagaya conditions.`,
      start: "a",
      concepts: ["m01.transformer-derating", "m01.transformer-ratings", "m01.fault-level"],
      nodes: {
        a: {
          md: md`The plant needs about 1,100 MVA of transformation at the POC (P plus reactive requirement), split across five main transformers. What is your first move?`,
          choices: [
            { text: "Ask the OE to calculate whether five derated standard units (≈ 220–225 MVA each at site ambient) can carry the full P and Q requirement at 50 °C, including one-fan-group-out cases.", next: "b", score: 10, feedback: "Quantify before deciding. 5 × ~222 MVA ≈ 1,110 MVA — marginal, with no spare for fan failures." },
            { text: "Accept immediately — 9 months of delay costs far more.", next: "c", score: 3, feedback: "Schedule matters, but you are accepting a 30-year asset risk without numbers." },
            { text: "Reject — the contract specification is clear.", next: "c", score: 4, feedback: "Contractually defensible, but you may be rejecting a workable solution and handing the EPC a delay argument." },
          ],
        },
        b: {
          md: md`The OE finds five derated units give ≈ 1,110 MVA at 50 °C with all fans — no margin; with one fan group out on one unit, the plant would need to curtail ~3% on peak summer afternoons. The EPC offers a sixth unit at its own cost if MEWRE accepts the standard design.`,
          choices: [
            { text: "Pursue it as a formal variation proposal: sixth unit at EPC cost, documented derating and loading limits, N+1 fans and dust filters, heat-run test on the first unit, extended transformer warranty, and OE/grid-operator sign-off on revised studies (fault level rises with six units).", next: "d", score: 10, feedback: "Converts the problem into a controlled, documented change with the technical risks closed and the cost where it belongs." },
            { text: "Accept the five units with an informal note that summer curtailment is the IPP's problem.", next: "d", score: 4, feedback: "Curtailment on summer peaks hurts the system exactly when MEWRE needs energy, and an informal note is not enforceable." },
          ],
        },
        c: {
          md: md`Two weeks pass without resolution while the EPC builds its delay narrative. The Undersecretary asks for a recommendation by Thursday.`,
          choices: [
            { text: "Commission the OE calculation now and present options with numbers by Thursday.", next: "b", score: 6, feedback: "Recovers, though time was lost." },
          ],
        },
        d: {
          md: md`Last check before you sign the recommendation: what changed in the fault-level picture?`,
          choices: [
            { text: "Wherever the added unit runs in parallel with others (shared 33 kV bus sections or bus couplers closed), the equivalent impedance falls and 33 kV fault level rises — ask the EPC to confirm switchgear ratings still exceed the new maximum fault current.", score: 10, feedback: "Exactly. Every change to transformation changes fault levels; switchgear duty must be re-verified." },
            { text: "Nothing — fault level depends only on the grid.", score: 0, feedback: "Fault level depends on all series and parallel impedances between sources and the fault, including transformers." },
          ],
        },
      },
    },
  ],
};

export default lesson;
