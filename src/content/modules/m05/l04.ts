import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m05-l04",
  title: "Degradation, Augmentation, Warranties and Performance Testing",
  summary:
    "How LFP capacity fades over 20 years, how to keep a POI energy commitment alive by overbuilding or periodic augmentation (with a costed schedule), how cell warranties, throughput limits and LTSA capacity guarantees fit together, and how capacity and RTE tests are run and enforced.",
  minutes: 80,
  objectives: [
    "You can read a capacity-fade curve and explain calendar, cycle and knee-point behaviour",
    "You can build an augmentation schedule that keeps a POI energy requirement for 20 years and compare it with up-front overbuild on a present-value basis",
    "You can distinguish product warranty, performance (capacity-retention) warranty with throughput limits, and LTSA capacity/availability guarantees — and spot gaps between them",
    "You can specify and witness capacity and RTE tests, including corrections, and compute the consequence of a shortfall",
  ],
  concepts: [
    {
      id: "m05.capacity-fade",
      name: "Capacity fade curves",
      description:
        "SoH vs time/throughput: early fast fade (SEI formation), quasi-linear middle, possible knee at end of life; plus resistance growth (power fade).",
      competency: "wind-storage",
      related: ["m05.aging", "m05.augmentation"],
    },
    {
      id: "m05.augmentation",
      name: "Augmentation strategies",
      description:
        "Overbuild at BOL vs periodic addition of new capacity (AC- or DC-level) vs replacement; trade-off of up-front capex against deferred, cheaper but riskier works.",
      competency: "wind-storage",
      related: ["m05.capacity-fade", "m05.bess-sizing"],
    },
    {
      id: "m05.warranty",
      name: "BESS warranties and throughput limits",
      description:
        "Product (defects) warranty, capacity-retention warranty bounded by years and EFC/MWh throughput, with operating-condition exclusions and data obligations.",
      competency: "contracts",
      related: ["m05.capacity-fade"],
    },
    {
      id: "m05.ltsa-guarantee",
      name: "LTSA capacity and availability guarantees",
      description:
        "Long-term service agreement in which the contractor guarantees POI capacity (by augmenting) and availability, with LDs; bridges cell warranty and owner's requirement.",
      competency: "contracts",
      related: ["m05.warranty", "m05.augmentation"],
    },
    {
      id: "m05.capacity-test",
      name: "Capacity and RTE testing",
      description:
        "Witnessed full charge–rest–discharge tests at rated power measured at the POI meter, with temperature/aux corrections, used for acceptance and annual verification.",
      competency: "wind-storage",
      related: ["m05.ltsa-guarantee", "m05.rte"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Why and how capacity fades — and what to do about it",
      blocks: [
        {
          kind: "md",
          md: md`### The shape of a fade curve

Plot SoH against time for an LFP system cycled once a day and you typically see three regions:

1. **Early fast fade (first months to year 1)**: SEI formation and stabilisation consume lithium quickly — often 2–4 % in year 1.
2. **Quasi-linear region**: steady loss of ~1–2 %/yr from combined calendar and cycle aging. Calendar fade follows roughly $\sqrt{t}$; cycle fade roughly follows throughput.
3. **Knee (end of life)**: beyond ~70–80 % SoH some cells accelerate (lithium plating, electrolyte dry-out, loss of active material). Integrators avoid operating near the knee; warranties often end before it.

A planning model combining the two mechanisms:`,
        },
        { kind: "equation", formula: "m05-fade-model" },
        {
          kind: "md",
          md: md`In bids you will usually receive an OEM **degradation table** (SoH by year for a stated duty: cycles/day, DoD, C-rate, mean cell temperature, rest SoC). Treat it as a model fit with a confidence band, not a promise. For this lesson we use a simple piecewise-linear table: **−3 % in year 1, then −1.6 %/yr**, giving SoH ≈ 0.666 at the end of year 20.

**Power fade** also matters: internal resistance grows (typically +30–50 % over life), raising heat and lowering the voltage under load. At 0.25C the PCS usually hits its limits before resistance does, but at the low-SoC end of a discharge on a hot evening the string voltage can fall below the PCS minimum DC voltage — truncating the last minutes of the 4-hour block.

### Augmentation: three strategies

| Strategy | What | Pros | Cons |
|---|---|---|---|
| **Overbuild** | Install enough at BOL to meet year-20 requirement | Simple, no future works, lower C-rate early | Highest capex now; pays for cells that sit idle for years; cells age anyway |
| **Periodic augmentation** | Install for a SoH floor; add new blocks every ~4–6 years | Defers capex, benefits from falling cell prices; newer chemistry | Works on an energised plant; compatibility; needs space, PCS/MV provisions; integration risk |
| **Replacement / repowering** | Replace modules or whole blocks at mid-life | Restores full capacity; resets technology | Disposal/recycling; outage; large mid-life capex |

Periodic augmentation can be **AC-level** (add complete new containers with their own PCS and MV transformer on spare feeder bays — clean, independent, easiest to warrant) or **DC-level** (add racks to existing PCS — cheaper per MWh but mixing old and new cells on one DC bus causes circulating current, unequal SoC and complex BMS integration; generally only with the original OEM).

The size of each tranche comes from the deficit at the end of the coverage period, remembering that the new block itself fades:`,
        },
        { kind: "equation", formula: "m05-augmentation-energy" },
        {
          kind: "md",
          md: md`And the value of deferral comes from discounting and price decline:`,
        },
        { kind: "equation", formula: "m05-pv-cost" },
        {
          kind: "callout",
          tone: "why",
          title: "Why augmentation usually wins — and when it doesn't",
          md: md`Cell prices fell by well over half between 2022 and 2025, and money has a time value. A kWh bought in year 10 at a 5 %/yr real price decline and 8 % real discount rate costs ~28 % of a kWh bought today. **But** augmentation shifts risk into the future: the OEM may no longer make compatible products, the site may lack space or feeder bays, a future MEWRE permit regime may differ, and a contractor (or IPP) can go bust. Augmentation is only as good as the contract that obliges someone creditworthy to do it, and the physical provisions made on day one.`,
        },
        {
          kind: "md",
          md: md`### Warranties: what each one actually covers

| Instrument | Given by | Covers | Typical term | Typical limits |
|---|---|---|---|---|
| **Product warranty** | Cell OEM / integrator | Defects in materials and workmanship (replace failed modules) | 2–5 yr | Excludes misuse, environment |
| **Performance (capacity-retention) warranty** | Cell OEM / integrator | SoH not below the warranted curve | 10–20 yr | **Years or throughput (EFC or MWh), whichever first**; operating window (cell temp, C-rate, SoC, rest SoC); data reporting; annual test |
| **LTSA capacity guarantee** | Integrator / O&M contractor | **POI energy** maintained each year (by augmentation at contractor cost) | 10–20 yr | Dispatch profile within agreed envelope; LD cap |
| **Availability guarantee** | LTSA contractor | % of time/energy available | annual | Exclusions (grid outages, force majeure, owner's dispatch) |
| **EPC performance guarantees** | EPC | BOL POI MW/MWh, RTE, response | at Taking-Over | LDs, rejection |

The throughput limit:`,
        },
        { kind: "equation", formula: "m05-throughput-life" },
        {
          kind: "md",
          md: md`### Tests

**Capacity test** (based on IEC 62933-2-1 principles, adapted in the contract): balance and fully charge to SoC max; rest (e.g. 30–60 min) to equalise temperature; discharge at **rated POI power** until the EMS stops at SoC min (or a voltage limit); integrate energy at the **POI revenue meter**; record ambient, cell temperatures and auxiliary consumption; correct only as the contract allows (e.g. for ambient outside the reference band or aux metered separately). Repeat 2–3 times; take the agreed statistic (mean, or each test must pass).

**RTE test**: start at SoC min, charge at rated power to SoC max, rest, discharge to SoC min; $\eta_{RT} = E_{out}/E_{in}$ at the POI, with auxiliaries treated per the definition. Also: power capability at 50 °C, ramp/response tests, reactive capability tests, and grid-code compliance tests (module 6).`,
        },
        { kind: "sources", refs: ["m05-iec-62933", "m05-nrel-atb-bess", "m05-nrel-cost-2023", "m05-fidic"] },
      ],
    },
    {
      layer: "applied",
      title: "Building and pricing an augmentation schedule",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Keep 2,000 MWh at POI for 20 years",
          given: md`From lesson 3: delivering 2,000 MWh at POI requires an effective DC capacity of **2,261.3 MWh** (nameplate × SoH). The plant is built with **2,513 MWh** DC (sized to a 0.90 SoH floor). Fade table: $SoH(a) = 1 - 0.03 - 0.016\,(a-1)$ for age $a \ge 1$ year (so 0.97 at end of year 1, 0.906 at year 5, 0.826 at year 10, 0.666 at year 20). Strategy: augment with new AC-coupled containers; each campaign must hold the requirement for 5 years.`,
          steps: [
            { md: md`**When is the first campaign needed?** Original block at end of year 5: $2{,}513 \times 0.906 = 2{,}276.8$ MWh ≥ 2,261.3 ✓. End of year 6: $2{,}513 \times 0.890 = 2{,}236.6$ < 2,261.3 ✗. So augment **at the end of year 5**.` },
            { md: md`**Size campaign 1 to hold until the end of year 10.** Original block at year 10: $2{,}513 \times 0.826 = 2{,}075.7$ MWh. Deficit: $2{,}261.3 - 2{,}075.7 = 185.6$ MWh.` },
            { md: md`New block will be 5 years old at the end of year 10: $SoH(5) = 0.906$. Install $185.6/0.906 = 204.8$ MWh (≈ 41 containers of 5.016 MWh).` },
            { md: md`**Repeat** for campaigns 2 and 3 (same method, summing all existing blocks at the target date): **240.0 MWh at end of year 10**, **261.2 MWh at end of year 15**. Each campaign is bigger because the original block keeps fading.` },
            { md: md`**Total installed** over life: $2{,}513 + 204.8 + 240.0 + 261.2 = 3{,}219$ MWh.` },
            { md: md`**Compare with overbuild**: meeting the requirement at year 20 up front needs $2{,}261.3/0.666 = 3{,}395$ MWh at BOL — 882 MWh more on day one, and 176 MWh more in total than the augmentation path.` },
          ],
          result: md`Schedule: **2,513 MWh at COD; +205 MWh (yr 5); +240 MWh (yr 10); +261 MWh (yr 15)**. Effective capacity saw-tooths between ~2,261 and ~2,470 MWh. Physical provisions on day one: land and foundations for ~140 additional containers, MV feeder bays/RMUs, PCS and transformer positions, SCADA/EMS capacity, and a grid-connection agreement that already covers the augmented equipment.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Overbuild vs augmentation in present-value terms",
          given: md`Installed DC cost today $c_0$ = USD 150/kWh (USD 150,000/MWh), falling 5 %/yr in real terms; real discount rate 8 %. Compare Strategy A (3,395 MWh at COD) with Strategy B (2,513 MWh at COD + 204.8 / 240.0 / 261.2 MWh at years 5 / 10 / 15). Ignore O&M differences.`,
          steps: [
            { md: md`**Strategy A**: $3{,}395 \times 0.15 = $ USD 509.3 m (all at year 0).` },
            { md: md`**Strategy B, year 0**: $2{,}513 \times 0.15 = $ USD 377.0 m.` },
            { md: md`Deferral factors $(0.95/1.08)^n$: year 5 → 0.5266; year 10 → 0.2773; year 15 → 0.1460.` },
            {
              md: md`Year 5 campaign PV: $204.8 \times 0.15 \times 0.5266 = $ USD 16.2 m.`,
              hidden: true,
              check: { prompt: "PV of the year-5 augmentation", answer: 16.18, unit: "USD m", tolerance: { rel: 0.01 } },
            },
            { md: md`Year 10: $240.0 \times 0.15 \times 0.2773 = $ USD 10.0 m. Year 15: $261.2 \times 0.15 \times 0.1460 = $ USD 5.7 m.` },
            {
              md: md`**Strategy B total PV**: $377.0 + 16.2 + 10.0 + 5.7 = $ USD 408.8 m — about USD 100 m (≈ 20 %) cheaper than A.`,
              hidden: true,
              check: { prompt: "Total PV of Strategy B", answer: 408.8, unit: "USD m", tolerance: { rel: 0.01 } },
            },
          ],
          result: md`Augmentation saves ~USD 100 m in PV on this example. The PM's job is to make sure that saving is not bought with unpriced risk: who is obliged to augment, with what security, on which land and feeder bays, and with what compatibility guarantee.`,
        },
        {
          kind: "question",
          question: {
            id: "m05-l04-p1",
            type: "numeric",
            prompt: md`A capacity-retention warranty covers "20 years or 7,300 equivalent full cycles, whichever comes first". MEWRE's operator adds frequency services that raise cycling to 1.3 EFC per day. After how many years does the warranty expire?`,
            answer: 15.38,
            unit: "years",
            tolerance: { rel: 0.01 },
            explanation: md`$t = 7{,}300/(1.3 \times 365) = 15.4$ years — almost five years of cover lost. Before adding services, the operator must check the warranty's throughput limit and, ideally, negotiate a higher EFC cap or MWh-throughput pricing.`,
            concepts: ["m05.warranty"],
            difficulty: 2,
          },
        },
        { kind: "widget", widget: "bess-sizing", props: { mw: 500, hours: 4 }, caption: "Switch the augmentation strategy between overbuild and periodic augmentation and compare usable energy over life." },
      ],
    },
    {
      layer: "field",
      title: "Making warranties and tests enforceable",
      blocks: [
        {
          kind: "md",
          md: md`### The contract stack MEWRE needs

For a MEWRE-owned BESS (EPC route), the robust package is: **EPC contract** (FIDIC Yellow or Silver) with BOL performance guarantees and Tests on Completion → **LTSA** (10–20 years) with POI capacity guarantee (contractor augments at its cost), availability guarantee and LD regime → **back-to-back** OEM cell/PCS warranties **assigned or with direct rights** to MEWRE → **parent-company guarantee or performance security** for the LTSA. For an IPP (KAPP PPP route), the SPV carries all of this and MEWRE's protection is the PPA/ESA: capacity payments reduced or LDs if the POI capacity test fails.

### What goes wrong`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Gaps between warranty and requirement",
          md: md`- **Warranty is on DC SoH, guarantee you need is POI MWh**: losses, aux and PCS derating fall in the gap.
- **Warranty voided by operation** outside the window (cell temperature > 30–35 °C, C-rate, rest SoC) — often caused by the contractor's own HVAC or EMS design.
- **Throughput limit exhausted** by stacked services the warranty didn't anticipate.
- **Data obligations** (monthly BMS data upload to OEM) not met → warranty claim refused.
- **Augmentation "at owner's option"** in the LTSA — then it is the owner's cost.
- **Capacity test procedure** written by the contractor with generous corrections (e.g. "aux excluded", "temperature-normalised to 25 °C").
- **LD cap** so low that paying LDs is cheaper than augmenting.`,
        },
        {
          kind: "checklist",
          title: "PM checks: degradation, augmentation, warranty, testing",
          items: [
            "Degradation table is for the project's duty (cycles/day, DoD, C-rate, rest SoC, mean cell temperature at 50 °C ambient)",
            "LTSA guarantees POI MWh every year with augmentation at contractor cost; LD rate exceeds the cost of augmenting",
            "Augmentation provisions built at COD: land, foundations, cable routes, feeder bays/RMUs, PCS/transformer positions, SCADA/EMS capacity, grid-connection approval",
            "OEM warranties assigned or with direct rights to MEWRE; parent-company guarantee for the LTSA",
            "Warranty operating window is achievable with the contracted HVAC; data reporting process assigned to the O&M team",
            "Capacity and RTE test procedures written by the OE, at the POI meter, with only contractually agreed corrections; witnessed by the Engineer",
            "Annual capacity test scheduled in summer (worst case), not in winter",
          ],
        },
        {
          kind: "ask",
          title: "Ask the contractor",
          items: [
            "What is your SoH confidence band (P50/P90) for year 10 under our duty, and what test data support it?",
            "Will augmentation be AC-level (new containers + PCS) or DC-level? If DC-level, how do you manage mixed-age strings?",
            "Will you guarantee compatible augmentation products for 20 years, or price a replacement path if the cell is discontinued?",
            "Which operating conditions void your warranty, and does your own HVAC/EMS design guarantee we stay inside them?",
            "Show me your proposed capacity test procedure — every correction factor, and why.",
          ],
        },
        { kind: "scenario", scenario: "m05-s4" },
        {
          kind: "feynman",
          prompt: "Explain to the Audit Bureau reviewer why paying for a BESS that is 25 % bigger than the contracted energy — and committing to buy more batteries in years 5, 10 and 15 — is good value and not waste.",
          keyPoints: [
            "Batteries lose capacity every year (fade), so extra capacity is needed to keep the contracted energy",
            "Buying it later (augmentation) is cheaper in present-value terms than overbuilding now because prices fall and money has time value",
            "Losses and auxiliaries mean DC energy must exceed POI energy",
            "The contractor is obliged (LTSA) to augment at its cost, so the risk is not MEWRE's",
            "Day-one provisions (land, bays) make later augmentation possible",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m05-l04-q1",
      type: "mcq",
      prompt: md`Why is year-1 capacity fade of an LFP BESS typically larger than the annual fade in years 2–10?`,
      options: [
        "Because the PCS is less efficient when new",
        "Because SEI formation and stabilisation consume lithium fastest early in life (calendar fade ~√t)",
        "Because commissioning tests overcharge the cells",
        "Because the BMS is not yet calibrated",
      ],
      answer: 1,
      explanation: md`The SEI grows fastest when thin; its growth rate slows roughly as $1/\sqrt{t}$, so cumulative calendar fade follows $\sqrt{t}$. Planning curves therefore show a 2–4 % first-year drop followed by ~1–2 %/yr.`,
      concepts: ["m05.capacity-fade"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "m05-l04-q2",
      type: "numeric",
      prompt: md`The year-3 capacity test guarantees 2,000 MWh at the POI. Three valid tests average 1,952 MWh. The LTSA LD rate is USD 200,000 per MWh of shortfall (one-off, unless the contractor augments within 90 days). What is the LD exposure in USD million?`,
      answer: 9.6,
      unit: "USD m",
      tolerance: { rel: 0.01 },
      explanation: md`Shortfall $= 2{,}000 - 1{,}952 = 48$ MWh (2.4 %). LD $= 48 \times 0.2 = $ USD 9.6 m. Compare with augmenting: 48 MWh at POI needs about $48/(0.9742 \times 0.9747 \times 0.95 \times 0.97) \approx 55$ MWh of new DC capacity, ≈ USD 8 m at USD 150/kWh: the LD rate is set so that augmenting is cheaper than paying — which is the point.`,
      concepts: ["m05.ltsa-guarantee", "m05.capacity-test"],
      difficulty: 2,
    },
    {
      id: "m05-l04-q3",
      type: "multi",
      prompt: md`Which day-one provisions are needed to make periodic AC-level augmentation feasible? (Select all.)`,
      options: [
        "Reserved land and foundations (or foundation design) for future containers",
        "Spare MV feeder bays / RMU positions and cable routes",
        "Grid-connection agreement covering the augmented equipment",
        "Oversizing every cell by 25 %",
        "EMS/SCADA capacity for additional units",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`AC-level augmentation adds containers with their own PCS/transformers; they need land, electrical bays, control-system capacity and a grid-connection approval that already includes them. Oversizing cells is the overbuild strategy, not an augmentation provision.`,
      concepts: ["m05.augmentation"],
      difficulty: 2,
    },
    {
      id: "m05-l04-q4",
      type: "mcq",
      prompt: md`A cell OEM refuses a capacity warranty claim because monthly mean cell temperatures exceeded 32 °C in July–August. The HVAC was designed and supplied by the EPC. Who should MEWRE pursue?`,
      options: [
        "Nobody — warranty conditions were breached",
        "The cell OEM, since the cells degraded",
        "The EPC/LTSA contractor, whose thermal design or operation failed to keep cells inside the warranty window",
        "The weather service",
      ],
      answer: 2,
      explanation: md`The owner's requirement and the EPC's fitness-for-purpose obligations include keeping equipment within its manufacturers' conditions at the specified 50 °C ambient. The EPC carries the gap between its design and the OEM warranty.`,
      concepts: ["m05.warranty", "m05.ltsa-guarantee"],
      difficulty: 2,
    },
    {
      id: "m05-l04-q5",
      type: "order",
      prompt: md`Put the steps of a POI capacity test in order.`,
      items: [
        "Agree test procedure, meters and correction rules (OE-drafted, contract-based)",
        "Charge to SoC max and balance cells",
        "Rest to equalise temperature",
        "Discharge at rated POI power until the EMS stops at SoC min",
        "Integrate POI-meter energy, record ambient, cell temperatures and aux; apply only agreed corrections",
        "Compare with guarantee; certify or apply remedy",
      ],
      explanation: md`The procedure is agreed before testing, not after. Measurement is at the revenue meter; corrections are only those written in the contract.`,
      concepts: ["m05.capacity-test"],
      difficulty: 1,
    },
    {
      id: "m05-l04-q6",
      type: "decision",
      prompt: md`The LTSA draft from the bidder says: "Augmentation may be performed at the Owner's request and cost to restore capacity." The LTSA price is attractive. What do you do?`,
      options: [
        { text: "Accept — the price is good and MEWRE controls when to augment.", score: 0, feedback: "The bidder has shifted all degradation risk to MEWRE; the attractive price is the reason." },
        { text: "Require the contractor to guarantee POI capacity each year, augmenting at its own cost, with LDs above the cost of augmentation and a parent guarantee; evaluate the revised price.", score: 1, feedback: "Correct — this is the core purpose of an LTSA capacity guarantee." },
        { text: "Delete augmentation from the LTSA and budget it separately.", score: 0.3, feedback: "Possible, but you then carry degradation risk and lose the single point of responsibility." },
      ],
      explanation: md`Degradation is the dominant long-term BESS risk. Put it on the party best able to manage it (integrator/OEM) and price it competitively in the tender.`,
      concepts: ["m05.ltsa-guarantee", "m05.augmentation"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m05-l04-f1", front: "Three regions of an LFP fade curve", back: "Early fast fade (SEI), quasi-linear middle, end-of-life knee", concepts: ["m05.capacity-fade"] },
    { id: "m05-l04-f2", front: "Overbuild vs augmentation — core trade-off", back: "Overbuild: high capex now, no future works. Augmentation: deferred cheaper capex, but future integration and counterparty risk", concepts: ["m05.augmentation"] },
    { id: "m05-l04-f3", front: "AC-level vs DC-level augmentation", back: "AC: new containers with own PCS on spare bays (clean). DC: add racks to existing PCS (cheaper, mixed-age string issues)", concepts: ["m05.augmentation"] },
    { id: "m05-l04-f4", front: "Deferral factor for year-10 purchase at 5 %/yr price decline and 8 % discount", back: md`$(0.95/1.08)^{10} \approx 0.28$`, concepts: ["m05.augmentation"] },
    { id: "m05-l04-f5", front: "Typical performance warranty limit wording", back: "X years or Y EFC (or MWh throughput), whichever comes first, within an operating window", concepts: ["m05.warranty"] },
    { id: "m05-l04-f6", front: "What an LTSA capacity guarantee adds to a cell warranty", back: "A POI-energy commitment every year, met by contractor-funded augmentation, with LDs", concepts: ["m05.ltsa-guarantee"] },
    { id: "m05-l04-f7", front: "When to schedule the annual capacity test in Kuwait", back: "In summer (worst-case ambient), at the POI meter, witnessed", concepts: ["m05.capacity-test"] },
    { id: "m05-l04-f8", front: "RTE test sequence", back: "SoC min → charge at rated power to SoC max → rest → discharge to SoC min; RTE = E_out / E_in at POI", concepts: ["m05.capacity-test"] },
  ],
  scenarios: [
    {
      id: "m05-s4",
      title: "Year-3 capacity test, 46 °C",
      dayInLife: true,
      context: md`You are MEWRE's asset PM for a 500 MW / 2,000 MWh BESS in year 3 of a 15-year LTSA. The annual capacity test is being witnessed today by the Owner's Engineer. It is 46 °C at 14:00.`,
      start: "a",
      concepts: ["m05.capacity-test", "m05.ltsa-guarantee", "m05.warranty"],
      nodes: {
        a: {
          md: md`Test 1 delivers 1,948 MWh at the POI. The LTSA contractor's engineer proposes to (1) exclude the 38 MWh of auxiliary consumption during the test, "as the warranty is DC-based", and (2) repeat the test at night when it is cooler. The test procedure in the LTSA says energy is measured at the POI meter with auxiliaries supplied from the plant, and makes no ambient correction between 20 °C and 50 °C.`,
          choices: [
            { text: "Hold to the agreed procedure: POI meter, auxiliaries included, no correction inside 20–50 °C; complete the planned three tests today.", next: "b", score: 10, feedback: "Correct. The procedure was agreed in advance precisely to avoid on-the-day renegotiation." },
            { text: "Agree to repeat at night as a goodwill gesture.", next: "c", score: 3, feedback: "The night test is not a contractual test, and you are creating a precedent that undermines the summer guarantee." },
            { text: "Accept excluding the auxiliaries since the warranty is DC-based.", next: "c", score: 1, feedback: "The OEM warranty is the contractor's business; MEWRE's guarantee is POI-based." },
          ],
        },
        b: {
          md: md`Three tests average 1,952 MWh: a 48 MWh (2.4 %) shortfall. The contractor offers to pay LDs of USD 9.6 m, or to augment within 120 days (the LTSA allows 90).`,
          choices: [
            { text: "Insist on augmentation within the LTSA period (90 days) with a witnessed re-test; LDs apply if not achieved; agree a short extension only against a formal variation that preserves MEWRE's rights.", next: "d", score: 9, feedback: "Good: MEWRE needs the MWh for the evening peak more than the cash." },
            { text: "Take the USD 9.6 m LDs.", next: "d", score: 5, feedback: "Contractually valid but the grid still lacks 48 MWh every evening for the next 12 years unless something else changes." },
          ],
        },
        c: {
          md: md`The night test with auxiliaries excluded gives 2,004 MWh. Your director asks you whether the plant is "compliant". The OE has written a dissent noting the deviations from the procedure.`,
          choices: [
            { text: "Report honestly: the contractual test was not completed; propose re-testing per procedure within the summer window.", score: 6, feedback: "You recover the position, at the cost of a delay and an awkward conversation." },
            { text: "Report compliance based on the night test.", score: 0, feedback: "You have certified something that is not true under the contract — an audit and integrity problem." },
          ],
        },
        d: {
          md: md`Root-cause analysis shows faster-than-modelled degradation in containers in the southern row, where HVAC condensers recirculate hot air in shamal-driven dust. Cell temperatures there average 31 °C.`,
          choices: [
            { text: "Require a thermal fix (condenser baffles, cleaning schedule, set-point change) as part of the LTSA obligations, and ask the OE to check whether warranty conditions are at risk elsewhere.", score: 10, feedback: "Excellent: fix the cause, not only the symptom — otherwise you will be back next summer." },
            { text: "Augment only; the cause is the weather.", score: 3, feedback: "The weather is a design condition, not an excuse. Without the fix, fade continues and the OEM warranty is at risk." },
          ],
        },
      },
    },
  ],
};

export default lesson;
