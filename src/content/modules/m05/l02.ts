import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m05-l02",
  title: "Key BESS Parameters: Power, Energy, C-rate, DoD, RTE, SoH and Aging",
  summary:
    "The vocabulary of every BESS specification and guarantee — MW vs MWh, C-rate, SoC window, AC vs DC round-trip efficiency, auxiliary loads at 50 °C, state of health, cycle vs calendar aging and the Arrhenius temperature effect — with the numbers that decide whether a guarantee is worth anything.",
  minutes: 70,
  objectives: [
    "You can distinguish power rating from energy rating and state each at the correct measurement boundary (DC, PCS AC, MV, POI)",
    "You can compute C-rate, usable energy, AC-AC round-trip efficiency from component efficiencies, and RTE including auxiliary loads",
    "You can explain cycle vs calendar aging and use the Arrhenius equation to estimate how cell temperature accelerates aging",
    "You can read a BESS datasheet or guarantee schedule and spot boundary, temperature and test-condition traps",
  ],
  concepts: [
    {
      id: "m05.power-energy",
      name: "Power vs energy rating and measurement boundary",
      description:
        "MW (how fast) vs MWh (how much); nameplate vs usable; DC terminals vs PCS output vs MV vs POI — the boundary changes the number by 5–15 %.",
      competency: "wind-storage",
      related: ["m05.c-rate", "m05.rte"],
    },
    {
      id: "m05.c-rate",
      name: "C-rate and duration",
      description: "Power divided by energy; 0.25C = 4-hour system. Drives heat, efficiency, aging and PCS-to-battery ratio.",
      competency: "wind-storage",
      related: ["m05.power-energy"],
    },
    {
      id: "m05.soc-dod",
      name: "SoC window and depth of discharge",
      description: "Operating limits on state of charge (e.g. 2.5–97.5 %); DoD is the window width. Defines usable energy and affects cycle life.",
      competency: "wind-storage",
      related: ["m05.power-energy", "m05.aging"],
    },
    {
      id: "m05.rte",
      name: "Round-trip efficiency (DC-DC, AC-AC, with auxiliaries)",
      description:
        "Energy out over energy in at a defined boundary; AC-AC ~88–91 % excluding auxiliaries, ~83–87 % including HVAC in a 50 °C summer.",
      competency: "wind-storage",
      related: ["m05.power-energy"],
    },
    {
      id: "m05.soh",
      name: "State of health",
      description: "Measured capacity (or resistance) relative to beginning of life under a reference test; EOL often 60–70 % for stationary LFP.",
      competency: "wind-storage",
      related: ["m05.aging"],
    },
    {
      id: "m05.aging",
      name: "Cycle vs calendar aging and the Arrhenius effect",
      description:
        "Calendar aging (time, SoC, temperature) plus cycle aging (throughput, DoD, C-rate); aging rate roughly doubles per +10 °C near room temperature.",
      competency: "wind-storage",
      related: ["m05.soh", "m05.soc-dod"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "The parameters, derived",
      blocks: [
        {
          kind: "md",
          md: md`### Power and energy are different ratings

A BESS has two independent sizes. **Power (MW)** is set by the power conversion system (PCS) and the current capability of the cells; it says how fast energy can move. **Energy (MWh)** is set by the amount of cell material; it says how long that power can be sustained. "500 MW / 2,000 MWh" therefore means 4 hours at full power — *if both numbers are stated at the same boundary*.

The boundary problem is the single most important idea in this lesson. Energy flows through a chain:

**cells → DC busbar → PCS (inverter) → LV/MV transformer → MV collector → HV transformer → revenue meter at the POI**

and every stage loses 0.4–2.5 %. Auxiliary loads (HVAC, pumps, BMS, lighting) are taken off somewhere along the chain. So the same physical plant can honestly be described as "1,003 MWh" (DC nameplate) or "905 MWh" (deliverable at POI), as you will compute below.

| Boundary | Who quotes it | Typical use |
|---|---|---|
| Cell/DC nameplate (BOL, 0.5C, 25 °C) | Cell OEM, integrator | Datasheets, cell warranty |
| DC usable (after SoC window) | Integrator | DC block warranty |
| PCS AC output | PCS OEM | Power-block tests |
| MV bus | EPC | Collector-level tests |
| **POI / revenue meter** | **Employer, offtaker, grid operator** | **PPA/ESA, capacity tests, LDs** |

As MEWRE you only care about the last row; every guarantee should be expressed there, at a stated ambient temperature.

### C-rate`,
        },
        { kind: "equation", formula: "m05-c-rate" },
        {
          kind: "md",
          md: md`A 4-hour system runs at 0.25C, a 2-hour system at 0.5C, a 1-hour frequency-response system at 1C. Lower C-rate means lower current, lower $I^2R$ heat, higher efficiency and slower aging; the price is more cells per MW. Most Gulf energy-shifting procurements (and MEWRE's reported 1–1.5 GW / 4–6 GWh plan) sit at ~0.25C.

### SoC window, DoD and usable energy

State of charge (SoC) is the fraction of capacity currently stored. The BMS/EMS enforce an operating window, e.g. 2.5–97.5 %, to keep away from the voltage extremes where plating and stress occur. The window width is the depth of discharge (DoD):`,
        },
        { kind: "equation", formula: "m05-usable-energy" },
        {
          kind: "md",
          md: md`Shallower windows extend cycle life (a cell cycled at 80 % DoD may give 30–50 % more cycles than at 100 %), but you pay for unused cells. LFP integrators typically guarantee usable energy at ~90–95 % DoD.

### Round-trip efficiency — derive it

Energy entering at the POI passes the HV transformer, MV transformer, PCS and cells; on discharge it passes them all again. If each stage has one-way efficiency $\eta_k$, and the battery's own DC round trip is $\eta_{RT,DC}$:`,
        },
        { kind: "equation", formula: "m05-rte-ac" },
        {
          kind: "md",
          md: md`Typical component values: LFP DC round trip 94–96 % at 0.25C (falls at higher C-rate and at low temperature), PCS 98.3–98.8 % one-way (CEC-weighted; lower at part load), MV transformer 99.2–99.4 %, HV transformer 99.5–99.7 %. Multiply: AC-AC RTE ≈ 88–91 % **excluding auxiliaries**.

Now the desert correction. Auxiliary loads run continuously, whether or not the battery cycles. In Kuwait's summer the HVAC must hold cells at ~25 °C against 45–50 °C ambient (Mitribah recorded 53.9 °C in July 2016). If auxiliaries are imported from the grid, the honest efficiency is:`,
        },
        { kind: "equation", formula: "m05-rte-aux" },
        {
          kind: "callout",
          tone: "why",
          title: "Why RTE is a money term",
          md: md`Every percentage point of RTE is energy you bought (or PV energy you did not export) and did not get back. On a 2 GWh system cycling daily, one point of RTE is ~20 MWh/day ≈ 7.3 GWh/yr. In a PPA/ESA the offtaker often pays for charging energy or bears the loss, so **the RTE guarantee is a direct financial guarantee** — and the auxiliary-load boundary is where bidders hide the desert penalty.`,
        },
        {
          kind: "md",
          md: md`### State of health and throughput

**SoH** compares today's capacity to beginning-of-life (BOL) capacity under the *same reference test*:`,
        },
        { kind: "equation", formula: "m05-soh" },
        {
          kind: "md",
          md: md`Stationary LFP is typically warranted to ~60–70 % SoH at end of life (EOL). Throughput is counted in **equivalent full cycles (EFC)**:`,
        },
        { kind: "equation", formula: "m05-efc" },
        {
          kind: "md",
          md: md`One full daily cycle for 20 years is 7,300 EFC — exactly the order of magnitude of LFP warranties (6,000–8,000 EFC or 15–20 years, whichever first).

### Cycle aging vs calendar aging

| Mechanism | Driven by | Grows with | What reduces it |
|---|---|---|---|
| **Calendar aging** (SEI growth, electrolyte oxidation) | Time, temperature, **high SoC at rest** | ~√t; Arrhenius in T | Cool cells, rest at mid-SoC |
| **Cycle aging** (particle cracking, SEI repair, plating) | Throughput, DoD, C-rate, charging at low T | ~EFC (roughly linear) | Low C-rate, moderate DoD, no cold charging |

A 4-hour BESS cycling once a day loses capacity from both. In a hot climate calendar aging is often the larger share. **Resting at 100 % SoC** in the afternoon heat (waiting for the evening peak) is the worst case — which is precisely the Kuwaiti PV-shifting duty: charge from PV 10:00–15:00, hold, discharge 18:00–22:00. Smart charging that finishes just before the discharge window is worth real money.

### The Arrhenius temperature effect

Aging reactions are thermally activated; their rate constant follows $k = A\,e^{-E_a/RT}$. Comparing two temperatures:`,
        },
        { kind: "equation", formula: "m05-arrhenius" },
        {
          kind: "md",
          md: md`With $E_a$ ≈ 50 kJ/mol (a typical fit for SEI growth in LFP/graphite), going from 25 °C to 35 °C gives $AF = \exp[\tfrac{50{,}000}{8.314}(\tfrac{1}{298.15}-\tfrac{1}{308.15})] \approx 1.92$ — the engineering rule that **aging doubles every ~10 °C**. Even 25 → 30 °C costs ~1.4×. That is why specifications demand cell temperatures of 20–30 °C and **cell-to-cell temperature spread ≤ 3–5 K** (liquid cooling achieves this; air cooling usually does not in 50 °C ambient).`,
        },
        {
          kind: "md",
          md: md`### Other parameters that appear in schedules

| Parameter | Typical value (LFP utility BESS) | Why it matters |
|---|---|---|
| Response time (0 → 100 % P) | < 200 ms (PCS), < 1 s at POI incl. PPC | Fast frequency response |
| Self-discharge | ~1–3 %/month (cells), but aux loads dominate | Standby losses |
| Availability guarantee | 97–99 % (time- or energy-based) | Revenue and capacity payments |
| SoC accuracy (BMS) | ± 3–5 % | Dispatch confidence for the evening peak |
| Cell temperature spread | ≤ 3–5 K within an enclosure | Uniform aging |
| PCS ambient derating | Full output to ~40–45 °C, derate above (e.g. −1 to −2 %/K) | Power at 50 °C |`,
        },
        { kind: "sources", refs: ["m05-iec-62933", "m05-nrel-atb-bess", "m05-wmo-mitribah"] },
      ],
    },
    {
      layer: "applied",
      title: "Calculating what a BESS really delivers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "\"250 MW / 1,000 MWh\" — what reaches the POI on a 50 °C day?",
          given: md`A bidder offers 200 containers × 5.016 MWh = **1,003.2 MWh DC nameplate**, with 250 MW at POI. SoC window 95 %. DC round-trip efficiency 95 % (so one-way ≈ $\sqrt{0.95}$ = 0.9747). One-way efficiencies: PCS 98.5 %, MV transformer 99.3 %, HV transformer 99.6 %. In August, auxiliary consumption averages **12 kW per container** (chillers, pumps, fans, BMS, fire system, PCS-skid cooling), imported from the grid around the clock.`,
          steps: [
            { md: md`**C-rate**: $250 / 1{,}003.2 = 0.249$C — a nominal 4-hour system.` },
            { md: md`**Usable DC energy**: $1{,}003.2 \times 0.95 = 953.0$ MWh.` },
            { md: md`**At DC terminals after cell losses**: $953.0 \times 0.9747 = 928.9$ MWh.` },
            { md: md`**AC discharge chain**: $0.985 \times 0.993 \times 0.996 = 0.9742$ → at POI: $928.9 \times 0.9742 = 904.9$ MWh. At 250 MW that is **3.62 h**, not 4 h.` },
            { md: md`**AC-AC RTE (ex-aux)**: $0.95 \times 0.985^2 \times 0.993^2 \times 0.996^2 = 0.9016$ → charging energy needed at POI: $904.9 / 0.9016 = 1{,}003.7$ MWh.` },
            { md: md`**Auxiliaries**: $200 \times 12 \text{ kW} \times 24 \text{ h} = 57.6$ MWh/day — 6.4 % of the daily discharge.` },
            { md: md`**RTE incl. aux**: $904.9 / (1{,}003.7 + 57.6) = 0.853$ → **85.3 %**.` },
          ],
          result: md`The plant sold as "250 MW / 1,000 MWh" delivers ~905 MWh at the POI (3.6 h at full power) with ~90.2 % AC-AC RTE excluding auxiliaries but ~85.3 % including a 50 °C summer's auxiliaries. If MEWRE needs a true 4 h × 250 MW = 1,000 MWh at POI, it needs ~1,110 MWh DC at BOL — before any degradation allowance (lesson 3).`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "What does 10 °C hotter do to calendar fade?",
          given: md`An OEM's calendar-fade data show 1.5 %/yr capacity loss at a mean cell temperature of 25 °C. Use $E_a$ = 50 kJ/mol, $R$ = 8.314 J/(mol·K). Estimate the fade rate if the HVAC holds cells at a mean of 35 °C, and at 40 °C.`,
          steps: [
            { md: md`Convert to kelvin: $T_1 = 298.15$ K, $T_2 = 308.15$ K. Compute $\tfrac{1}{T_1} - \tfrac{1}{T_2} = 1.0884 \times 10^{-4}$ K⁻¹.` },
            {
              md: md`$AF = \exp(50{,}000/8.314 \times 1.0884\times10^{-4}) = \exp(0.6546) \approx 1.92$.`,
              hidden: true,
              check: { prompt: "Acceleration factor 25 → 35 °C", answer: 1.92, tolerance: { rel: 0.02 } },
            },
            { md: md`Calendar fade at 35 °C: $1.5 \times 1.92 \approx 2.9$ %/yr.` },
            {
              md: md`At 40 °C: $AF = \exp[\tfrac{50{,}000}{8.314}(\tfrac{1}{298.15}-\tfrac{1}{313.15})] \approx 2.63$, so fade ≈ $1.5 \times 2.63 \approx 3.9$ %/yr.`,
              hidden: true,
              check: { prompt: "Calendar fade at 40 °C", answer: 3.94, unit: "%/yr", tolerance: { rel: 0.03 } },
            },
          ],
          result: md`A 10 °C hotter cell roughly doubles calendar fade (1.5 → 2.9 %/yr); 15 °C hotter multiplies it by ~2.6. An HVAC system that "saves energy" by letting cells float at 35 °C may destroy far more value in augmentation than it saves in electricity.`,
        },
        {
          kind: "question",
          question: {
            id: "m05-l02-p1",
            type: "numeric",
            prompt: md`A BESS delivers 1,800 MWh/day at the POI. Its AC-AC RTE excluding auxiliaries is 88 %. Auxiliary consumption imported from the grid is 70 MWh/day. What is the RTE including auxiliaries, in %?`,
            answer: 85.09,
            unit: "%",
            tolerance: { abs: 0.2 },
            explanation: md`Charging energy: $1{,}800 / 0.88 = 2{,}045.5$ MWh. Add auxiliaries: $2{,}045.5 + 70 = 2{,}115.5$ MWh in. RTE incl. aux $= 1{,}800 / 2{,}115.5 = 0.851$ → 85.1 %. The auxiliaries cost ~3 percentage points.`,
            concepts: ["m05.rte"],
            difficulty: 2,
          },
        },
        { kind: "widget", widget: "bess-sizing", props: { mw: 250, hours: 4 }, caption: "Change DoD, RTE and fade to see how nameplate MWh translates into usable energy over life." },
      ],
    },
    {
      layer: "field",
      title: "Parameters in specifications, guarantees and tests",
      blocks: [
        {
          kind: "md",
          md: md`### How the parameters appear in a contract

A well-drafted BESS performance schedule (EPC + LTSA, or an IPP's energy storage agreement) has, for each guarantee: **value, boundary, conditions, test method, frequency, and remedy**. Example structure:

| Guarantee | Value | Boundary | Conditions | Remedy |
|---|---|---|---|---|
| Discharge power | 500 MW for 4 h | POI meter | At 0.95 PF, 50 °C ambient, any SoC ≥ x | Performance LDs / rejection |
| Usable energy (BOL) | 2,000 MWh | POI meter | Constant power, from SoC max to SoC min | Performance LDs per MWh short |
| Usable energy (year n) | per degradation table | POI meter | Annual capacity test | Augmentation at contractor cost (LTSA) |
| RTE | e.g. ≥ 87 % | POI, **incl. or excl. aux — say which** | Full cycle at rated power, stated ambient | LDs per point |
| Availability | ≥ 98 % | Energy-based | Annual, with defined exclusions | LDs |
| Response time | ≤ 1 s to 90 % | POI | Step test | Rectification |

Test procedures follow IEC 62933-2-1 (unit parameters and test methods) adapted to the site; the Owner's Engineer writes them, the EPC executes them, the Engineer (under FIDIC) witnesses and certifies.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Classic traps in BESS datasheets and bids",
          md: md`- **"1,000 MWh" with no boundary** — usually DC nameplate at BOL.
- **RTE "≥ 92 %"** — DC-DC or PCS-AC, excluding auxiliaries, at 25 °C and 0.5C.
- **Auxiliaries supplied "from the plant"** — so they never appear on the import meter, but they reduce export. Either way they must be counted once.
- **Cycle life "8,000 cycles"** at 25 °C, 0.5C, 80 % DoD to 80 % SoH — not your duty.
- **Rest at high SoC** ignored in the degradation model.
- **PCS rated at 35 °C** — derated output at 50 °C can be 8–15 % lower.
- **Availability measured by time**, so a plant that is "available" but derated to 60 % in summer counts as 100 %.`,
        },
        {
          kind: "checklist",
          title: "PM checks on parameters",
          items: [
            "Every MW/MWh guarantee is stated at the POI revenue meter, at a defined ambient (design 50 °C, survival ≥ 55 °C) and power factor",
            "RTE definition states whether auxiliaries are included and over what period (single cycle vs annual)",
            "Auxiliary supply arrangement and metering are shown on the SLD (separate aux import meter or net metering)",
            "Degradation table is based on the project's dispatch profile (cycles/day, DoD, C-rate, rest SoC, cell temperature)",
            "HVAC design keeps mean cell temperature at ~25 °C ± 3 K and spread ≤ 5 K at 50 °C ambient",
            "BMS SoC accuracy and recalibration procedure are specified; EMS reserves are defined",
            "Availability is energy-based or capacity-weighted, not purely time-based",
          ],
        },
        {
          kind: "ask",
          title: "Ask the contractor",
          items: [
            "At what boundary and ambient is your RTE stated, and does it include HVAC and auxiliary consumption?",
            "What is the August daily auxiliary energy (MWh/day) at 48 °C mean daytime ambient, and how did you calculate it?",
            "What mean cell temperature and cell-to-cell spread does your thermal design hold at 50 °C, at full power discharge?",
            "What is your PCS derating curve above 40 °C, and how many PCS units have you added to cover it?",
            "How does your EMS avoid resting at 100 % SoC during the afternoon heat?",
          ],
        },
        { kind: "scenario", scenario: "m05-s2" },
        {
          kind: "feynman",
          prompt: "A finance colleague says: \"The bid says 1,000 MWh and 92 % efficiency, so we get 920 MWh back for every 1,000 MWh we put in.\" Explain what is wrong, in plain words.",
          keyPoints: [
            "1,000 MWh is probably DC nameplate, not usable energy at the meter",
            "SoC window means not all nameplate energy is usable",
            "92 % is probably DC or PCS-level efficiency excluding transformers and auxiliaries",
            "In a Kuwaiti summer HVAC and auxiliaries take several percent more",
            "Only POI-metered, auxiliaries-included numbers matter for money",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m05-l02-q1",
      type: "numeric",
      prompt: md`A BESS is rated 300 MW / 1,200 MWh. What is its C-rate?`,
      answer: 0.25,
      unit: "C",
      tolerance: { abs: 0.001 },
      explanation: md`$C = P/E = 300/1{,}200 = 0.25$C, i.e. a 4-hour system. Note that C-rate is only meaningful if both numbers are at the same boundary.`,
      concepts: ["m05.c-rate"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m05-l02-q2",
      type: "numeric",
      prompt: md`One-way efficiencies are: PCS 98.5 %, MV transformer 99.3 %, HV transformer 99.6 %; DC round-trip efficiency is 95 %. Compute the AC-AC round-trip efficiency at the POI, excluding auxiliaries, in %.`,
      answer: 90.16,
      unit: "%",
      tolerance: { abs: 0.15 },
      explanation: md`$0.95 \times 0.985^2 \times 0.993^2 \times 0.996^2 = 0.9016$ → 90.2 %. Each AC stage appears squared because energy passes through it on charge and again on discharge.`,
      concepts: ["m05.rte"],
      difficulty: 2,
    },
    {
      id: "m05-l02-q3",
      type: "mcq",
      prompt: md`For a PV-shifting BESS in Kuwait (charge 10:00–15:00, discharge 18:00–22:00), which operating habit most accelerates calendar aging?`,
      options: [
        "Discharging at 0.25C",
        "Resting at ~100 % SoC through the hot afternoon before the evening discharge",
        "Using a 95 % SoC window",
        "Recalibrating SoC monthly",
      ],
      answer: 1,
      explanation: md`Calendar aging grows with time, temperature and SoC at rest. Holding cells full during the hottest hours combines all three. An EMS that times charging to finish just before the discharge window reduces this.`,
      concepts: ["m05.aging", "m05.soc-dod"],
      difficulty: 2,
    },
    {
      id: "m05-l02-q4",
      type: "numeric",
      prompt: md`Using $E_a$ = 50 kJ/mol, by what factor does the aging rate increase when mean cell temperature rises from 25 °C to 45 °C?`,
      answer: 3.55,
      tolerance: { rel: 0.03 },
      explanation: md`$AF = \exp[\tfrac{50{,}000}{8.314}(\tfrac{1}{298.15} - \tfrac{1}{318.15})] = \exp(1.268) \approx 3.55$. An air-cooled enclosure letting cells reach 45 °C in a Kuwaiti summer ages them three to four times faster than a liquid-cooled one at 25 °C.`,
      concepts: ["m05.aging"],
      difficulty: 2,
    },
    {
      id: "m05-l02-q5",
      type: "multi",
      prompt: md`Which of the following belong in a properly defined usable-energy guarantee? (Select all.)`,
      options: [
        "Measurement boundary (e.g. POI revenue meter)",
        "Ambient temperature condition",
        "Discharge power and SoC start/end limits",
        "The cell's gravimetric energy density",
        "Test method and frequency",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`A guarantee needs value, boundary, conditions (ambient, power, SoC limits, PF), test method and remedy. Energy density is a cell property irrelevant to the delivered-energy guarantee.`,
      concepts: ["m05.power-energy"],
      difficulty: 1,
    },
    {
      id: "m05-l02-q6",
      type: "decision",
      prompt: md`Two bids for a 500 MW / 2,000 MWh (at POI) BESS: Bid A guarantees RTE 89 % at POI **excluding** auxiliaries. Bid B guarantees 86 % at POI **including** auxiliaries at 50 °C. Prices are equal. What do you advise the evaluation committee?`,
      options: [
        { text: "Prefer Bid A — 89 % is higher.", score: 0, feedback: "You are comparing numbers on different boundaries. Bid A's real figure including a summer's auxiliaries could be 83–85 %." },
        { text: "Normalise both to the same boundary (ask A for its auxiliary consumption at 50 °C, or apply the OE's estimate) and compare the lifetime cost of losses before scoring.", score: 1, feedback: "Correct: evaluate like-for-like. The tender should have fixed the boundary; if it did not, clarify with both bidders equally." },
        { text: "Prefer Bid B because including auxiliaries shows honesty.", score: 0.3, feedback: "Good instinct, but the decision must be quantitative and fair to both bidders." },
        { text: "Ignore RTE; it is a minor parameter.", score: 0, feedback: "One RTE point on 2 GWh/day is ~7 GWh/yr — real money over 20 years." },
      ],
      explanation: md`The lesson: never compare efficiencies across boundaries. Fix the boundary in the tender (POI, including auxiliaries, at stated ambient), or normalise in evaluation through equal clarifications.`,
      concepts: ["m05.rte", "m05.power-energy"],
      difficulty: 2,
    },
    {
      id: "m05-l02-q7",
      type: "mcq",
      prompt: md`A warranty says "15 years or 6,000 equivalent full cycles, whichever comes first". The BESS performs 1.2 EFC per day. When does the warranty end?`,
      options: ["After 15 years", "After ~13.7 years", "After ~12.5 years", "After 20 years"],
      answer: 1,
      explanation: md`$6{,}000 / (1.2 \times 365) = 13.7$ years — the throughput limit bites before the calendar limit. Adding ancillary services that raise daily cycling shortens warranty cover.`,
      concepts: ["m05.soh", "m05.aging"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m05-l02-f1", front: "C-rate of a 4-hour BESS", back: "0.25C (C = P/E)", concepts: ["m05.c-rate"] },
    { id: "m05-l02-f2", front: "Why are one-way AC efficiencies squared in RTE?", back: "Energy passes each conversion stage twice: on charge and on discharge", concepts: ["m05.rte"] },
    { id: "m05-l02-f3", front: "Typical AC-AC RTE of an LFP BESS (ex-aux)", back: "~88–91 % at POI; DC-DC ~94–96 %", concepts: ["m05.rte"] },
    { id: "m05-l02-f4", front: "Auxiliary penalty on RTE in a 50 °C summer", back: "Several points (~3–7 % of daily throughput), mostly HVAC", concepts: ["m05.rte"] },
    { id: "m05-l02-f5", front: "Rule of thumb for temperature and aging", back: "Aging rate roughly doubles per +10 °C near room temperature (Arrhenius, Ea ≈ 50 kJ/mol)", concepts: ["m05.aging"] },
    { id: "m05-l02-f6", front: "Calendar vs cycle aging drivers", back: "Calendar: time, temperature, rest SoC. Cycle: throughput, DoD, C-rate, cold charging", concepts: ["m05.aging"] },
    { id: "m05-l02-f7", front: "Definition of SoH", back: "Measured capacity ÷ BOL capacity under the same reference test", concepts: ["m05.soh"] },
    { id: "m05-l02-f8", front: "EFC for one daily cycle over 20 years", back: "7,300 equivalent full cycles", concepts: ["m05.soh"] },
    { id: "m05-l02-f9", front: "The boundary MEWRE should use for every BESS guarantee", back: "The POI revenue meter, at stated ambient and power factor, with auxiliaries defined", concepts: ["m05.power-energy"] },
  ],
  scenarios: [
    {
      id: "m05-s2",
      title: "The missing 6 %",
      dayInLife: true,
      context: md`You are MEWRE's PM. The BESS reached commercial operation in May. It is now mid-August; ambient peaks at 49 °C. The control centre reports that the BESS delivered only ~1,880 MWh at the POI yesterday evening against the 2,000 MWh dispatch instruction, and the grid import meter shows ~110 MWh/day of auxiliary consumption.`,
      start: "a",
      concepts: ["m05.rte", "m05.power-energy", "m05.aging"],
      nodes: {
        a: {
          md: md`The EPC's site manager tells you on the phone: "Nothing is wrong; the plant passed its capacity test in April. It's summer — all batteries lose a bit." What is your first move?`,
          choices: [
            { text: "Ask the OE to pull SCADA data (SoC, cell temperatures, PCS output and derating flags, aux meter) for the last 14 days and compare with the April test conditions and the contract's ambient basis.", next: "b", score: 9, feedback: "Good: get facts first, and anchor them to the contractual test conditions." },
            { text: "Issue a notice of defect and threaten liquidated damages immediately.", next: "b", score: 4, feedback: "Premature: you do not yet know if this is a contractual shortfall. A notice may still be wise to preserve rights, but evidence first." },
            { text: "Accept the explanation — the April test was passed.", next: "c", score: 1, feedback: "A spring test at 30 °C says little about performance at 49 °C, which is exactly when the grid needs it." },
          ],
        },
        b: {
          md: md`The data show: mean cell temperature 31 °C (design 25 °C), PCS units derating 6 % from 20:00 because their skid cooling is undersized, and aux consumption 110 MWh/day against 65 MWh/day in the design report. The contract guarantees 500 MW / 2,000 MWh at POI **at 50 °C ambient**.`,
          choices: [
            { text: "Notify the EPC formally of a performance defect against the 50 °C guarantee, request a root-cause analysis and corrective plan (PCS skid cooling, HVAC set-points), and schedule a witnessed hot-weather capacity re-test.", next: "d", score: 10, feedback: "Excellent — the contract's ambient basis makes this the EPC's problem, and the re-test proves the fix in the conditions that matter." },
            { text: "Ask MEWRE's operations team to dispatch only 1,850 MWh for the rest of the summer.", next: "d", score: 3, feedback: "A sensible operational stop-gap, but on its own it silently accepts a shortfall that is the EPC's to fix." },
          ],
        },
        c: {
          md: md`In September, the annual degradation report shows SoH 2 percentage points below the warranted curve. The OEM argues the cells were operated above the 30 °C warranty limit for weeks — which is true.`,
          choices: [
            { text: "Go back to the EPC: the HVAC that let cells exceed 30 °C is part of their design. Seek legal/OE support.", score: 5, feedback: "The right avenue, but the delay has made the record messier and the warranty position weaker." },
            { text: "Accept the OEM's position.", score: 0, feedback: "Never accept warranty loss caused by the contractor's own thermal design." },
          ],
        },
        d: {
          md: md`The EPC replaces the PCS skid cooling units and lowers HVAC set-points. The re-test at 47 °C delivers 2,010 MWh at POI. Aux consumption rises to 120 MWh/day. The LTSA prices auxiliaries as MEWRE's cost.`,
          choices: [
            { text: "Record the result, accept the fix, and open a commercial discussion on the auxiliary-energy allocation for future years, using the lesson to fix the RTE boundary in the next tender.", score: 10, feedback: "Exactly: technical issue closed, commercial lesson captured for the pipeline." },
            { text: "Demand the EPC also pays for the extra auxiliary energy forever.", score: 4, feedback: "Only if the contract says so. Check the RTE/aux boundary first; otherwise take it to the next tender." },
          ],
        },
      },
    },
  ],
};

export default lesson;
