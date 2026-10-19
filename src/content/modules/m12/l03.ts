import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m12-l03",
  title: "Failures, Inspections & Warranty Claims",
  summary:
    "How PV and BESS equipment fails in a hot, dusty desert — PID, hot spots, delamination, connectors, inverter IGBTs and fans, tracker drives and controllers, BESS HVAC — how to find failures with drone IR thermography, EL imaging and IV-curve tracing, and how to build a warranty claim that an OEM cannot easily reject.",
  minutes: 75,
  objectives: [
    "You can name the dominant failure modes of PV modules, inverters, trackers and BESS in Kuwaiti conditions and their mechanisms",
    "You can specify and interpret drone IR thermography, EL imaging and IV-curve tracing campaigns",
    "You can quantify the energy and money at stake from a defect population",
    "You can assemble a warranty claim with evidence that meets typical OEM warranty terms",
  ],
  concepts: [
    {
      id: "m12.failure-modes",
      name: "Desert failure modes",
      description:
        "Mechanisms by which PV, inverter, tracker and BESS components degrade or fail under heat, UV, dust, thermal cycling, humidity at night and high system voltage.",
      competency: "operations",
      related: ["m12.ir-thermography", "m12.warranty-claim", "m02.degradation-mechanisms", "m04.desert-failure-modes", "m05.thermal-runaway"],
    },
    {
      id: "m12.ir-thermography",
      name: "IR thermography",
      description:
        "Infrared imaging (now mostly by drone) of operating modules and electrical equipment to find hot spots, bypass diode activation, string outages and hot connections, per IEC TS 62446-3.",
      competency: "operations",
      related: ["m02.commissioning-tests"],
    },
    {
      id: "m12.el-iv-testing",
      name: "EL imaging and IV-curve tracing",
      description:
        "Electroluminescence imaging reveals cracks and inactive cell areas; IV-curve tracing measures string/module electrical characteristics and translates them to STC for comparison with nameplate.",
      competency: "operations",
      related: ["m02.iv-parameters"],
    },
    {
      id: "m12.warranty-claim",
      name: "Warranty claim",
      description:
        "A formal, evidence-based claim against an OEM under product or performance warranty terms, including notice, sampling, accredited testing and remedy calculation.",
      competency: "contracts",
      related: ["m02.module-warranty", "m05.warranty"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "How things fail in the desert",
      blocks: [
        {
          kind: "md",
          md: md`### Stressors in Kuwait

- **Heat**: ambient 45–50 °C in summer (record 53.9 °C at Mitribah, 2016); module temperatures 70–80 °C; inverter and BESS cooling at their limits.
- **UV**: high annual irradiation accelerates polymer ageing (backsheets, encapsulant, cable insulation).
- **Dust and sand**: abrasion of glass coatings, dust ingress into inverters, tracker gearboxes and connectors; soiling-induced hot spots.
- **Thermal cycling**: large day–night swings (20 °C+), especially in winter and spring.
- **Night humidity / dew**: winter mornings bring condensation; combined with salt-laden dust it creates conductive films — relevant for **PID** and corrosion.
- **High system voltage**: 1,500 V DC strings raise the electric field between cells and grounded frames.`,
        },
        { kind: "sources", refs: ["m12-wmo-mitribah"] },
        {
          kind: "md",
          md: md`### Failure modes table

| Component | Failure mode | Mechanism | Detection | Typical impact |
|---|---|---|---|---|
| Modules | **PID** (potential-induced degradation) | Leakage current/ion migration under high negative voltage to ground, aided by humidity | Pattern in IR/EL (cells near negative end of string darker/hotter), IV (low FF, low Voc), IEC TS 62804-1 lab test | Up to 10–30 % string loss if unchecked; partly reversible (night-time offset) |
| Modules | **Hot spots** | Shading/soiling, cracked cells, solder bond failure → reverse-biased cells heat | IR thermography | Local power loss, backsheet burn, fire risk in extreme cases |
| Modules | **Bypass diode failure** | Overheating at high ambient; surge damage | IR (whole substring warm), IV (step in curve), Voc drop | One-third module loss (one substring) |
| Modules | **Delamination / encapsulant browning** | UV + heat + moisture | Visual, IR | Moisture ingress, corrosion, power loss |
| Modules | **Cell cracks** | Handling, wind/snow loads, thermal cycling (in Kuwait: transport, installation, robot cleaning) | EL | Grow over time; hot spots |
| Modules | **LID/LeTID** | Light- and elevated-temperature-induced degradation in some cell technologies | IV/flash test trend | 1–5 % early loss |
| Connectors / cables | **Connector failure** | Cross-mating different brands, poor crimping, dust ingress, UV | IR (hot connector), string current loss | Arcing, fire, string outage |
| Inverters | **IGBT / power module failure** | Thermal cycling of semiconductors, high junction temperatures | Fault codes, trips | Unit outage; repair/replace module |
| Inverters | **Fan / filter failure** | Dust clogging, bearing wear | Over-temperature derating flags | Derating at peak; secondary failures |
| Inverters | **Capacitor ageing** | Electrolytic capacitors age with temperature (rate roughly doubles per 10 °C) | Ripple, efficiency trends | Wear-out at ~10–15 years |
| Trackers | **Motor/gearbox/controller faults** | Dust ingress, heat, firmware bugs, battery failure (self-powered controllers) | Angle error alarms, row comparison | Stuck rows; stow failures in wind |
| BESS | **HVAC failure** | Compressors/condensers at 50 °C+ ambient, dust on condenser coils | Cell temperature rise, SoH acceleration, alarms | Derating, accelerated degradation, safety risk |
| BESS | **Cell imbalance / thermal anomalies** | Manufacturing defects, poor thermal management | BMS data | Capacity loss; in worst case thermal runaway |
| MV/HV | **Transformer, switchgear, cable joints** | Overheating, partial discharge, poor jointing | DGA, PD tests, IR | Large outages |

The **bathtub curve** describes failure rate over life: early (infant mortality — installation defects, DOA units), random (constant rate), and wear-out (inverters ~12–15 years, capacitors, fans, BESS cells). Warranty strategy and spares plans should follow the curve.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why heat doubles failure rates",
          md: md`Many electronic and chemical degradation processes follow Arrhenius behaviour: a rough rule of thumb is that reaction rates double for every ~10 °C rise. An inverter whose internal components run 10 °C hotter in Kuwait than in Europe may age roughly twice as fast. That is why derating curves, cooling design, filter maintenance and BESS HVAC redundancy matter far more here than OEM brochures suggest.`,
        },
        {
          kind: "md",
          md: md`### Inspection techniques

**Drone IR thermography (IEC TS 62446-3)**: thermal camera on a drone flies the array under stable irradiance (the standard sets a minimum of about 600 W/m² in the module plane) with sufficient spatial resolution to resolve individual cells. Findings are classified by temperature difference and pattern (single cell hot spot, substring/diode, whole module, string off, PID-like patterns, hot connector). A full 1 GW scan is feasible in days to weeks; a baseline at handover and annual scans thereafter are good practice.

**EL imaging (IEC TS 60904-13)**: modules are forward-biased with a DC supply and photographed (at night or with filters) in the near-infrared; cracks, broken fingers and inactive areas appear dark. Now available as mobile/drone EL at night. Essential for handling damage and crack claims.

**IV-curve tracing (IEC 62446-1)**: a tracer sweeps the string from short circuit to open circuit; measured curves are translated to STC (IEC 60891) and compared with expected. Signatures: low $I_{sc}$ → soiling/shading/degradation; low $V_{oc}$ → PID, bypass diode short, missing modules; steps → bypass diode activation/mismatch; low fill factor → series resistance (connectors, solder bonds) or shunt (PID).`,
        },
        {
          kind: "widget",
          widget: "iv-curve",
          props: { irradiance: 900, temperature: 65 },
          caption: "See how a hot Kuwaiti module shifts Voc and Pmax; then imagine the steps a failed bypass diode would add.",
        },
        {
          kind: "md",
          md: md`### Warranty structures

| Warranty | Typical terms | Notes |
|---|---|---|
| Module **product** warranty | 12–15 years (some 25+ for glass-glass) against defects in materials and workmanship | Repair, replace or refund |
| Module **performance** (power) warranty | Linear: e.g. ≤ 1 % year 1, then ≤ 0.4 %/yr → ≥ 87.4 % at year 30 (TOPCon-type) | Measured at STC by accredited lab, with measurement tolerance |
| Inverter | 5–10 years standard, extendable to 15–20 by service agreement | Often repair-or-replace with downtime limits only in O&M/LTSA |
| Tracker | 5–10 years structure; 5 years drives/electronics | Corrosion coverage depends on soil class assumptions |
| BESS | Capacity retention guarantee (e.g. % of usable energy by year) under defined cycling/temperature conditions | Voided if HVAC/temperature limits breached — keep the logs |

Warranted power at year $n$ for a linear warranty:`,
        },
        { kind: "equation", formula: "m12-warranted-power" },
        {
          kind: "md",
          md: md`and a refund-type remedy is commonly calculated as:`,
        },
        { kind: "equation", formula: "m12-warranty-claim-value" },
      ],
    },
    {
      layer: "applied",
      title: "Putting numbers on defects and claims",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Module power warranty claim",
          given: md`Batch of 120,000 modules × 600 Wp, in year 6. Linear warranty: ≤ 1 % year 1, ≤ 0.4 %/yr thereafter. A random, stratified sample of 300 modules, flash-tested at an ISO/IEC 17025 lab and corrected to STC, averages **93.2 %** of nameplate. Warranty: claim valid if measured < warranted − 3 % measurement tolerance; remedy at OEM's option: replace, or refund the shortfall at USD 0.11/Wp (current market price). Lost energy is excluded (no consequential losses).`,
          steps: [
            { md: md`Warranted at year 6: $1 - 0.01 - 0.004 \times 5 = 0.970$ (97.0 %).` },
            { md: md`Threshold: $97.0 - 3.0 = 94.0\,\%$; measured 93.2 % < 94.0 % → **claim valid**.` },
            { md: md`Remedy if shortfall is measured from the warranted value: $120{,}000 \times 600 \times 0.038 \times 0.11 =$ USD 300,960.` },
            { md: md`If the contract measures shortfall only beyond the tolerance (0.8 %): $120{,}000 \times 600 \times 0.008 \times 0.11 =$ USD 63,360.` },
            { md: md`Energy actually lost: $72{,}000\ \text{kWp} \times 2{,}250\ \text{kWh/kWp} \times 0.038 = 6{,}156$ MWh/yr, ≈ USD 86 k/yr at USD 14/MWh (illustrative), or USD 2.1 m undiscounted over 24 remaining years — and growing if degradation continues.` },
          ],
          result: md`The refund (USD 63 k–301 k) is a fraction of the lost energy (~USD 2 m over life). Push for **replacement** where degradation is progressive, negotiate the tolerance definition at procurement, and keep the energy argument for commercial negotiation.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Inverter IGBT failures in the second summer",
          given: md`3,125 string inverters (each ~416 kWp DC). OEM's expected annual failure rate 1.5 %. Observed: 140 failures in 12 months, mean time to restore 6 days (spares + technician). Specific yield 2,250 kWh/kWp/yr.`,
          steps: [
            {
              md: md`Observed failure rate $= 140/3{,}125$ = ? %`,
              hidden: true,
              check: { prompt: "Observed failure rate", answer: 4.48, unit: "%", tolerance: { abs: 0.03 } },
            },
            { md: md`That is ~3× the OEM expectation — a **serial defect** argument may apply (many warranties define serial defect as a failure rate above a threshold in a population, triggering root-cause investigation and fleet-wide remedy).` },
            {
              md: md`Energy lost: daily energy per inverter $= 416 \times 2{,}250/365 = 2{,}564$ kWh/day; lost $= 140 \times 6 \times 2{,}564$ = ? MWh`,
              hidden: true,
              check: { prompt: "Energy lost to IGBT failures", answer: 2154, unit: "MWh", tolerance: { rel: 0.01 } },
            },
          ],
          result: md`4.5 % failure rate (≈3× expected) and ~2,150 MWh lost. Evidence for a serial-defect claim: failure logs with serial numbers and dates, fault codes, failed-part analysis, ambient/internal temperature data showing operation within OEM limits, and maintenance records (filters changed per manual).`,
        },
        {
          kind: "question",
          question: {
            id: "m12-l03-p1",
            type: "numeric",
            prompt: md`A drone IR survey finds 3,200 modules (600 Wp) each with one bypass-diode substring inactive (one-third of the module lost). At 2,250 kWh/kWp/yr, how much energy is lost per year (MWh)?`,
            answer: 1440,
            unit: "MWh/yr",
            tolerance: { rel: 0.01 },
            explanation: md`Lost DC power $= 3{,}200 \times 600 \times \tfrac13 = 640$ kWp. Energy $= 640 \times 2{,}250 = 1{,}440{,}000$ kWh = 1,440 MWh/yr. Also a safety issue: hot substrings stress backsheets — prioritise replacement under product warranty.`,
            concepts: ["m12.ir-thermography", "m12.failure-modes"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Building a claim that sticks",
      blocks: [
        {
          kind: "md",
          md: md`### Who does what

- **O&M contractor**: inspections, first-line diagnosis, failure logs, spare swaps, RMA (return material authorisation) handling.
- **Asset owner / IPP (or MEWRE for ministry-owned plants)**: owns warranties, decides strategy, signs claims.
- **Independent test lab / consultant**: sampling plan, accredited testing, failure analysis.
- **OEM**: investigates, accepts/rejects, remedies.
- **MEWRE as offtaker of an IPP**: not a warranty party, but wants assurance that systemic defects (e.g. PID across the plant) are being remedied because they reduce delivered energy over 30 years.

### The evidence pack

1. **Notice within the warranty notice period** (often 30–60 days of discovery) — in writing, referencing serial numbers.
2. **Population and sampling**: define the affected population (batch, production dates, blocks) and a statistically defensible random/stratified sample.
3. **Accredited testing**: STC flash tests (ISO/IEC 17025 lab), EL images, IR images, IV curves translated per IEC 60891.
4. **Proof of correct installation and operation**: commissioning records, handling procedures, cleaning methods within OEM rules (e.g. no high-pressure water, approved brushes for robots), inverter/BESS operation within temperature and voltage limits.
5. **Monitoring data**: performance trend showing onset and progression.
6. **Failure analysis**: root cause (e.g. encapsulant formulation, connector crimp, IGBT batch).
7. **Claim calculation**: per warranty formula, plus a separate commercial position on lost energy.
8. **Chain of custody** for returned parts.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Why claims get rejected",
          md: md`- Notice sent after the notice period; serial numbers missing.
- Testing at a non-accredited lab or without STC correction and uncertainty statement.
- Cleaning method not approved by the OEM (warranty voided).
- Mixed connectors (cross-mating) — OEM blames installer.
- BESS operated outside temperature window when HVAC failed — capacity guarantee voided.
- OEM insolvent or exited the market — check OEM financial strength at procurement and require warranty insurance or escrow where possible.`,
        },
        {
          kind: "question",
          question: {
            id: "m12-l03-p2",
            type: "label",
            prompt: "Label the BESS components you would inspect after a summer of rising cell temperatures.",
            diagram: "bess",
            markers: [
              { id: "hvac", answer: "HVAC (thermal management)" },
              { id: "bms", answer: "Battery management system" },
              { id: "pcs", answer: "Power conversion system" },
              { id: "fire-suppression", answer: "Fire detection & suppression" },
            ],
            options: ["HVAC (thermal management)", "Battery management system", "Power conversion system", "Fire detection & suppression", "Tracker controller"],
            explanation: md`Rising cell temperatures point first at HVAC capacity/condenser fouling; the BMS holds the cell data (and the warranty evidence); the PCS may derate; fire systems must be verified healthy when thermal margins shrink.`,
            concepts: ["m12.failure-modes"],
            difficulty: 1,
          },
        },
        {
          kind: "checklist",
          title: "PM checklist: inspections and warranty management",
          items: [
            "Baseline IR (and EL sample) at handover; annual drone IR; post-storm targeted inspections",
            "Warranty register: OEM, scope, start/end, notice periods, remedy terms, serial numbers",
            "Failure log in CMMS with serial number, fault code, date, ambient conditions, action",
            "Failure-rate tracking vs OEM expectation by component and batch (serial-defect triggers)",
            "Cleaning and operating practices documented as compliant with OEM warranty terms",
            "BESS temperature/SoC logs archived for capacity-guarantee claims",
            "Claims: notice sent in time, sampling plan agreed, accredited lab, chain of custody",
          ],
        },
        {
          kind: "ask",
          title: "Ask the OEM / O&M contractor",
          items: [
            "What failure rate is 'normal' for this component in this climate, and what triggers a serial-defect process?",
            "Which cleaning methods and robot brushes are approved under the module warranty?",
            "How is measurement tolerance applied in the power warranty — to eligibility, to the remedy, or both?",
            "What is the RMA turnaround time and who pays for logistics and labour?",
            "Show the BESS temperature history: were cells ever outside the warranty window?",
          ],
        },
        { kind: "scenario", scenario: "m12-s3" },
        {
          kind: "feynman",
          prompt: "Explain to a finance colleague why a module warranty refund rarely compensates the true loss, and what you do about it.",
          keyPoints: [
            "Refund is based on module price × power shortfall, not on lost energy",
            "Consequential losses are excluded",
            "Measurement tolerance can shrink the remedy",
            "Prefer replacement for progressive defects; negotiate terms at procurement; insure warranties",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m12-l03-q1",
      type: "mcq",
      prompt: "An IR image shows one-third of a module uniformly warmer than the rest. Most likely cause?",
      options: ["Single cracked cell", "Active/failed bypass diode substring", "Soiling on one corner", "Inverter fault"],
      answer: 1,
      explanation: md`A uniform warm substring (one-third of a 3-diode module) indicates that substring is bypassed — diode failure (short) or a substring open circuit.`,
      concepts: ["m12.ir-thermography"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m12-l03-q2",
      type: "mcq",
      prompt: "Which test best reveals micro-cracks from rough handling during installation?",
      options: ["IR thermography", "EL imaging", "Insulation resistance test", "Revenue meter reading"],
      answer: 1,
      explanation: md`EL shows cracks and inactive cell areas directly; IR shows them only once they cause hot spots.`,
      concepts: ["m12.el-iv-testing"],
      difficulty: 1,
    },
    {
      id: "m12-l03-q3",
      type: "multi",
      prompt: "IV-curve signatures: which pairings are correct? Select all.",
      options: [
        "Low Voc in a string → possible PID or shorted bypass diodes",
        "Steps in the curve → bypass diode activation / mismatch",
        "Low fill factor → series resistance or shunt problems",
        "Low Isc → always an inverter fault",
      ],
      answer: [0, 1, 2],
      explanation: md`Low Isc usually indicates soiling, shading or current-related degradation, not the inverter (which is disconnected during IV tracing).`,
      concepts: ["m12.el-iv-testing"],
      difficulty: 2,
    },
    {
      id: "m12-l03-q4",
      type: "numeric",
      prompt: md`Linear module warranty: ≤ 2 % in year 1, then ≤ 0.55 %/yr. What is the warranted power at year 10 (% of nameplate)?`,
      answer: 93.05,
      unit: "%",
      tolerance: { abs: 0.05 },
      explanation: md`$100 - 2 - 0.55 \times 9 = 93.05\,\%$. (Year 1 loss, then 9 further years.) This is a typical older PERC warranty; newer n-type warranties are tighter (e.g. 1 % + 0.4 %/yr).`,
      concepts: ["m12.warranty-claim"],
      difficulty: 2,
    },
    {
      id: "m12-l03-q5",
      type: "decision",
      prompt: md`Your O&M contractor proposes switching to a cheaper robotic brush to cut cleaning costs. What do you check first?`,
      options: [
        { text: "Nothing; cheaper is better", score: 0.1, feedback: "An unapproved cleaning method can void the module warranty across the plant." },
        { text: "Whether the module OEM approves the brush/method under the warranty (abrasion of anti-reflective coating, micro-crack risk), and request trial data with EL before/after", score: 1, feedback: "Protects the warranty and gives evidence about crack risk." },
        { text: "Only the robot vendor's brochure", score: 0.3, feedback: "The robot vendor doesn't warrant your modules." },
      ],
      explanation: md`Module warranties commonly specify allowable cleaning methods. Changing method without OEM approval risks voiding coverage on hundreds of millions of dollars of modules.`,
      concepts: ["m12.warranty-claim"],
      difficulty: 2,
    },
    {
      id: "m12-l03-q6",
      type: "mcq",
      prompt: "Why is PID a particular concern for 1,500 V desert plants despite the dry climate?",
      options: [
        "Deserts have no PID risk",
        "High system voltage plus night-time dew and conductive dust films enable leakage currents",
        "Only thin-film modules have PID",
        "PID is caused by trackers",
      ],
      answer: 1,
      explanation: md`PID needs voltage stress and a leakage path. Winter dew on dusty, salty glass provides the path in Kuwait; 1,500 V strings provide the stress. Mitigations: PID-resistant modules (tested per IEC TS 62804-1), inverter negative-pole grounding or night-time offset boxes.`,
      concepts: ["m12.failure-modes"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m12-l03-f1", front: "IEC standard for PV IR thermography", back: "IEC TS 62446-3 (min ~600 W/m² POA, stable conditions).", concepts: ["m12.ir-thermography"] },
    { id: "m12-l03-f2", front: "IEC standard for EL imaging of PV modules", back: "IEC TS 60904-13.", concepts: ["m12.el-iv-testing"] },
    { id: "m12-l03-f3", front: "Linear warranted power at year n", back: md`$W_n = 1 - d_1 - d\,(n-1)$`, concepts: ["m12.warranty-claim"] },
    { id: "m12-l03-f4", front: "Rule of thumb: heat and ageing", back: "Degradation rates roughly double per ~10 °C (Arrhenius).", concepts: ["m12.failure-modes"] },
    { id: "m12-l03-f5", front: "Do module warranties pay for lost energy?", back: "Usually no — consequential losses are excluded; remedy is repair, replace or refund.", concepts: ["m12.warranty-claim"] },
    { id: "m12-l03-f6", front: "Serial defect", back: "Failure rate in a population above a contractual threshold, triggering fleet-wide investigation and remedy.", concepts: ["m12.warranty-claim"] },
    { id: "m12-l03-f7", front: "Main BESS failure risk in Kuwait summers", back: "HVAC capacity/condenser fouling → high cell temperatures → derating, faster degradation, voided warranty.", concepts: ["m12.failure-modes"] },
    { id: "m12-l03-f8", front: "Translation of IV curves to STC", back: "IEC 60891 procedures.", concepts: ["m12.el-iv-testing"] },
  ],
  scenarios: [
    {
      id: "m12-s3",
      title: "The module OEM says 'not our problem'",
      context: md`You manage a MEWRE-owned 300 MW PV plant in year 5. An IV and EL campaign shows strings in Blocks 7–9 with low Voc and dark cells near the negative end of strings — a PID pattern. 60,000 modules from two production months are affected. The OEM's first response: "Degradation is due to improper grounding by the EPC."`,
      start: "a",
      concepts: ["m12.warranty-claim", "m12.failure-modes"],
      nodes: {
        a: {
          md: md`The inverters use the configuration approved in the design review; the OEM's installation manual permits it. Your notice period is 60 days from discovery; 20 days have passed.`,
          choices: [
            { text: "Send formal notice now with serial numbers and initial evidence; propose a joint sampling plan with an accredited lab", next: "b", score: 10, feedback: "Notice first to protect rights; joint sampling avoids later disputes over the evidence." },
            { text: "Wait until the full lab report is ready (in 8 weeks)", next: "c", score: 2, feedback: "You would miss the 60-day notice window." },
          ],
        },
        b: {
          md: md`Lab results: affected modules fail IEC TS 62804-1 PID testing, unaffected batches pass. Same grounding across all blocks.`,
          choices: [
            { text: "Present the comparison (same grounding, different batches, different outcomes) as evidence of a material defect; request replacement plus PID mitigation (night-time offset boxes) at OEM cost", next: "d", score: 10, feedback: "The controlled comparison removes the grounding defence." },
            { text: "Accept a 50/50 split immediately", next: "d", score: 4, feedback: "Premature: your evidence is strong." },
          ],
        },
        c: {
          md: md`The OEM rejects the claim as out of time.`,
          choices: [{ text: "Seek legal advice", score: 2, feedback: "Lesson: notice periods are absolute; send notice first, evidence later." }],
        },
        d: {
          md: md`The OEM offers replacement modules but not labour or logistics.`,
          choices: [
            { text: "Negotiate labour cost sharing using the lost-energy figure as leverage; record lessons for future procurement (PID test certificates per batch, labour in warranty scope)", score: 9, feedback: "Commercial leverage plus procurement lessons." },
          ],
        },
      },
    },
  ],
};

export default lesson;
