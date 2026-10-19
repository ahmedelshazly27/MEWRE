import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m05-l03",
  title: "BESS Use Cases and Sizing: From Evening Peak to Frequency Response",
  summary:
    "What utility storage is used for in a system like Kuwait's — evening-peak energy shifting, peak capacity, fast frequency response, PV firming and ramp control, black start — and how to size MW and MWh from the POI requirement back to DC nameplate, with a full worked sizing for a 1 GW PV plant.",
  minutes: 80,
  objectives: [
    "You can match each BESS use case to its power, duration, response-time and cycling requirements",
    "You can size a BESS from a POI requirement back to PCS MW/MVA and DC nameplate MWh, including losses, auxiliaries, SoC window and degradation margin",
    "You can size symmetric frequency-response and PV ramp-control duties",
    "You can explain AC- vs DC-coupling and why POI rating, PCS rating and DC nameplate differ",
    "You can write a sizing requirement in a tender that bidders cannot game",
  ],
  concepts: [
    {
      id: "m05.energy-shifting",
      name: "Energy shifting and peak capacity",
      description:
        "Charging from midday PV (or off-peak grid) and discharging into the evening/night peak; also counting as firm capacity for resource adequacy.",
      competency: "wind-storage",
      related: ["m05.bess-sizing"],
    },
    {
      id: "m05.frequency-response",
      name: "Frequency response services (FFR/FCR)",
      description:
        "Sub-second to seconds active-power response to frequency deviations; symmetric energy reservation around a mid-SoC set-point.",
      competency: "wind-storage",
      related: ["m05.bess-sizing"],
    },
    {
      id: "m05.pv-firming",
      name: "PV firming and ramp-rate control",
      description: "Using BESS power to limit PV ramp rates (cloud/dust fronts) and to firm hourly schedules; power-heavy, energy-light.",
      competency: "wind-storage",
      related: ["m05.energy-shifting"],
    },
    {
      id: "m05.black-start",
      name: "Black start and grid-forming BESS",
      description: "Energising a dead network section from a BESS with grid-forming inverters; transformer inrush, voltage/frequency setting.",
      competency: "wind-storage",
    },
    {
      id: "m05.bess-sizing",
      name: "BESS sizing chain (POI → PCS → DC)",
      description:
        "Working back from POI MW/MWh through transformer, PCS, DC and SoC-window losses plus auxiliaries and degradation margin to PCS MVA and DC nameplate MWh.",
      competency: "wind-storage",
      related: ["m05.energy-shifting", "m05.coupling"],
    },
    {
      id: "m05.coupling",
      name: "AC-coupled vs DC-coupled hybrids",
      description:
        "AC coupling: BESS has its own PCS on the MV collector; DC coupling: battery on the PV inverter DC bus via DC/DC converter — recovers clipped energy but limits flexibility.",
      competency: "wind-storage",
      related: ["m05.bess-sizing"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "What storage does for a system like Kuwait's",
      blocks: [
        {
          kind: "md",
          md: md`### The system problem

Kuwait's summer peak has been ~17.5–17.7 GW (17,540 MW in summer 2026 per the ministry; MEES reported 17.71 GW in July 2025) against roughly 17 GW of reliably available thermal capacity. Today the peak sits in the hot afternoon, when the ministry has asked consumers to cut use between 11:00 and 17:00. PV is perfectly aligned with that midday-afternoon peak — at first. As PV grows to gigawatts (Shagaya Phase III Zones 1 and 2, the China G2G phases), the *net* load (load minus PV) peaks later: after sunset, when air-conditioning load is still high (ambient still ~40 °C at 20:00 in August) and PV is zero. This is the Gulf's version of the duck curve, and it is the main reason MEWRE is buying multi-hour BESS.`,
        },
        { kind: "widget", widget: "load-curve", props: { pvMW: 4000, season: "summer" }, caption: "Increase PV and watch the net-load peak move into the evening — the hours a 4-hour BESS must cover." },
        { kind: "sources", refs: ["m05-kuwaittimes-peak-2026", "m05-mees-kuwait-peak-2025", "m05-agbi-kuwait-bess-2025"] },
        {
          kind: "md",
          md: md`### The use cases

| Use case | Power | Duration | Response | Cycles/yr | Key spec |
|---|---|---|---|---|---|
| **Energy shifting / evening peak** | 100s of MW | 2–6 h | minutes | 300–365 | MWh at POI over life |
| **Peak capacity (resource adequacy)** | 100s of MW | 4 h+ (capacity credit falls for shorter) | minutes | tens–hundreds | Availability at system peak |
| **Fast frequency response (FFR)** | tens–100s MW | seconds–minutes | < 0.5–1 s | many shallow | Response time, headroom both directions |
| **Frequency containment (FCR / primary)** | tens–100s MW | 15–30 min each direction | ~seconds (droop) | many shallow | Symmetric energy reserve, droop accuracy |
| **PV firming / ramp control** | ~30–70 % of PV MW | minutes | seconds | many | Power, not energy |
| **Black start** | tens of MW | 1–3 h | — | ~1/yr test | Grid-forming PCS, inrush capability |
| **Voltage support** | Mvar (PCS) | continuous | cycles | — | PCS MVA headroom |
| **Congestion relief / grid deferral** | tens–100s MW | 2–4 h | minutes | seasonal | Location on the network |

Most utility BESS **stack** services: e.g. evening shifting every day, plus FFR headroom reserved at all times. Stacking raises cycles (warranty!) and requires the EMS to prioritise.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why MW and MWh must be sized separately",
          md: md`MW buys PCS, transformers, switchgear and grid connection; MWh buys cells, enclosures and HVAC. A 500 MW / 2,000 MWh system and a 500 MW / 1,000 MWh system have nearly the same grid connection but very different cell cost. The ratio (duration) should come from the *system study* — how long the net-load peak lasts and how much capacity credit each extra hour earns — not from a vendor's standard product.`,
        },
        {
          kind: "md",
          md: md`### The sizing chain

Work **backwards from the meter**. Power first: auxiliaries and transformer losses sit between the PCS and the POI.`,
        },
        { kind: "equation", formula: "m05-pcs-power" },
        {
          kind: "md",
          md: md`Then convert to MVA. If the grid code requires reactive capability of 0.95 PF at the POI while at full active power (module 6), the PCS must also supply Q — so PCS apparent rating ≈ $P_{PCS}/0.95$ plus transformer reactive losses, **at 50 °C after derating**.

Energy next. Each loss and margin inflates the DC energy:`,
        },
        { kind: "equation", formula: "m05-dc-nameplate" },
        {
          kind: "md",
          md: md`Finally the charging side: the PV plant (or grid) must supply`,
        },
        { kind: "equation", formula: "m05-charge-energy" },
        {
          kind: "md",
          md: md`For ramp control the requirement is a power triangle:`,
        },
        { kind: "equation", formula: "m05-ramp-energy" },
        {
          kind: "md",
          md: md`### AC-coupled vs DC-coupled

| | **AC-coupled** | **DC-coupled** |
|---|---|---|
| Topology | BESS with own PCS + MV transformer on the plant's MV collector | Battery on PV inverter DC bus via DC/DC converter |
| Grid charging | Yes, easily | Limited (through PV inverter) |
| Clipping recovery | No (PV inverter clips first) | Yes — stores DC energy above inverter limit |
| Efficiency PV → battery → grid | Two conversions (DC→AC→DC→AC) | One fewer conversion |
| Independence / retrofit | Independent operation, easy augmentation | Tied to PV inverter availability and ratings |
| Typical utility choice | **Most large standalone and hybrid BESS** | Some hybrids with high DC/AC ratio |

For a multi-GW Kuwaiti portfolio where storage must also serve the grid at night and charge from the grid in winter, AC coupling at the PV plant's MV/HV substation — or standalone BESS at substations like the reported Al-Mutlaa and Jaber Al-Ahmad sites — is the norm.

### Black start

Black start means energising a dead section of network from the BESS: the PCS must be **grid-forming** (it sets voltage and frequency itself rather than following the grid), able to energise large transformers (inrush currents of 5–10× rated, mitigated by soft-energisation / ramped voltage), and pick up load blocks without collapsing. It requires a protection setting group for islanded operation and a coordinated black-start plan with the transmission operator. Grid-forming is covered in module 6.`,
        },
        { kind: "diagram", diagram: "bess", caption: "The sizing chain runs from the POI back through the transformer and PCS to the racks: every block in this picture adds a loss or a margin." },
      ],
    },
    {
      layer: "applied",
      title: "Sizing a BESS for a 1 GW PV plant",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "1 GW PV + BESS: 500 MW for 4 h into the evening peak",
          given: md`A 1,000 MWac PV plant at Shagaya is to be paired with an AC-coupled BESS that must deliver **500 MW at the POI for 4 h (18:00–22:00), i.e. 2,000 MWh at POI, every day for 20 years**. Assumptions: one-way efficiencies PCS 98.5 %, MV transformer 99.3 %, HV transformer 99.6 %; DC round trip 95 % (one-way 0.9747); SoC window 95 %; HVAC and auxiliaries 10 MW during discharge, supplied from the MV bus; the contractor will augment whenever SoH of the fleet would drop below 0.90 (so size for $SoH_{min}$ = 0.90). Containers are 5.016 MWh. PCS units are rated 4.2 MVA at 35 °C, derating to 3.78 MVA at 50 °C. Grid code: 0.95 PF at POI at full power.`,
          steps: [
            { md: md`**Power at MV bus**: $500/0.996 + 10 = 512.0$ MW.` },
            { md: md`**PCS active power**: $P_{PCS} = 512.0/0.993 = 515.6$ MW.` },
            { md: md`**PCS apparent power** (first estimate, at 0.95 PF): $515.6/0.95 = 542.8$ MVA. With units at 3.78 MVA (50 °C): $542.8/3.78 = 143.6$ → **144 PCS units** (plus transformer reactive losses — module 6 refines this).` },
            { md: md`**Energy at MV bus**: $2{,}000/0.996 + 10 \times 4 = 2{,}008.0 + 40 = 2{,}048.0$ MWh.` },
            { md: md`**Energy at PCS AC terminals**: $2{,}048.0/0.993 = 2{,}062.5$ MWh. **At DC terminals**: $2{,}062.5/0.985 = 2{,}093.9$ MWh.` },
            { md: md`**Energy the cells must release** (DC one-way losses): $2{,}093.9/0.9747 = 2{,}148.3$ MWh.` },
            { md: md`**BOL nameplate** (95 % SoC window): $2{,}148.3/0.95 = 2{,}261.3$ MWh DC → $2{,}261.3/5.016 = 450.8$ → 451 containers.` },
            { md: md`**With degradation margin** ($SoH_{min}$ = 0.90): $2{,}261.3/0.90 = 2{,}512.6$ MWh → **501 containers** (≈ 2,513 MWh DC).` },
            { md: md`**Charging energy at POI**: AC-AC RTE ex-aux = 0.9016 → $2{,}000/0.9016 = 2{,}218$ MWh/day from PV, plus auxiliaries during charging. A 1 GW Kuwaiti PV plant on single-axis trackers produces roughly 7–8 GWh on a clear summer day, so ~30 % of its output is diverted into the BESS.` },
          ],
          result: md`**PCS ≈ 516 MW / ~543 MVA at 50 °C (144 × 3.78 MVA units); DC nameplate ≈ 2,513 MWh (501 containers) for 2,000 MWh at POI.** Ratios to remember: DC nameplate ≈ 1.26 × POI MWh; PCS MW ≈ 1.03 × POI MW; PCS MVA ≈ 1.09 × POI MW. "500 MW / 2,000 MWh" in the PPA is a ~516 MW / 2.5 GWh machine on site.`,
        },
        { kind: "widget", widget: "bess-sizing", props: { mw: 500, hours: 4 }, caption: "Reproduce the worked example: 500 MW, 4 h, then change DoD, RTE and augmentation strategy." },
        {
          kind: "worked",
          mode: "faded",
          title: "Symmetric frequency containment reserve",
          given: md`A BESS must provide **±100 MW of frequency containment at the POI**, sustained for **30 minutes in either direction**, starting from a mid-SoC set-point. Same efficiencies as above (AC chain one-way 0.9742; DC one-way 0.9747; SoC window 95 %). Ignore auxiliaries. What DC nameplate energy is needed (BOL)?`,
          steps: [
            { md: md`Energy at POI each direction: $100 \text{ MW} \times 0.5 \text{ h} = 50$ MWh.` },
            {
              md: md`**Discharge direction** (cells must release more than POI receives): $50 / (0.9742 \times 0.9747) = 52.66$ MWh.`,
              hidden: true,
              check: { prompt: "Energy cells must release for 50 MWh at POI", answer: 52.66, unit: "MWh", tolerance: { rel: 0.01 } },
            },
            { md: md`**Charge direction** (cells receive less than POI absorbs): $50 \times 0.9742 \times 0.9747 = 47.48$ MWh.` },
            {
              md: md`Total SoC window needed: $52.66 + 47.48 = 100.1$ MWh → nameplate $= 100.1/0.95 = 105.4$ MWh, with the set-point at the point that leaves 52.66 MWh above SoC min (i.e. slightly above mid-window).`,
              hidden: true,
              check: { prompt: "BOL DC nameplate for ±100 MW / 30 min", answer: 105.4, unit: "MWh", tolerance: { rel: 0.01 } },
            },
          ],
          result: md`~105 MWh DC for a ±100 MW / 30 min service — about a 1C system. Frequency services are power-heavy; energy shifting is energy-heavy. Stacking both on one plant means reserving headroom (power) *and* SoC margin (energy) every hour.`,
        },
        {
          kind: "question",
          question: {
            id: "m05-l03-p1",
            type: "numeric",
            prompt: md`A 1,000 MW PV plant must not ramp down faster than 10 % of rated power per minute (100 MW/min). A dust front causes an instantaneous 700 MW drop. How much energy (MWh) must the BESS discharge to hold the plant on the permitted ramp?`,
            answer: 40.83,
            unit: "MWh",
            tolerance: { rel: 0.02 },
            explanation: md`Ramp-down time at 100 MW/min: $700/100 = 7$ min = 0.1167 h. The BESS fills the triangle: $E = \tfrac{1}{2} \times 700 \times 0.1167 = 40.8$ MWh. Power required: 700 MW, though. Ramp control is a *power* requirement — it is why hybrid PV+BESS plants size BESS MW at 30–70 % of PV MW even when energy needs are modest.`,
            concepts: ["m05.pv-firming"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Sizing in tenders and studies",
      blocks: [
        {
          kind: "md",
          md: md`### Who sizes, with what

1. **System planning** (MEWRE planning / transmission, possibly with a consultant) determines the need: production-cost and adequacy modelling (PLEXOS, PSS/E for grid impact) of future load and PV growth gives the MW and hours at which storage earns capacity credit and avoids liquid-fuel burn and GCCIA imports.
2. **Feasibility / transaction advisor** (for a KAPP PPP or a MEWRE EPC) turns that into a **functional requirement at the POI** and a reference design: MW, MWh, duration, cycles, life, augmentation responsibility, location, grid connection.
3. **Bidders / EPC** do the detailed sizing chain you just worked through, with their own efficiencies, derating and degradation.
4. **Owner's Engineer** checks it: recomputes the chain, challenges the degradation model and the HVAC load, verifies PCS derating.

### Writing a requirement bidders cannot game

- State **MW and MWh at the POI**, at **50 °C ambient** and **0.95 PF**, for the **whole contract life** (not BOL), with **auxiliaries inside the boundary**.
- Make the **contractor responsible for degradation and augmentation** to meet the requirement every year (EPC + LTSA, or IPP).
- Specify **cycles per year and the dispatch profile** (and stacked services) so the degradation model is project-specific.
- Require the **sizing calculation** in the bid in a fixed template, so evaluators can compare like-for-like.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Common sizing errors",
          md: md`- Treating **MWh nameplate as POI energy** (5–15 % short at day one).
- Forgetting **auxiliaries during discharge** reduce export.
- **PCS sized at 35 °C rating** and **without reactive capability** — at 50 °C and 0.95 PF the plant cannot reach 500 MW.
- Sizing to **BOL only**, so the plant is short in year 2 unless augmentation is contracted.
- **Charging energy** not checked against PV availability on dusty or winter days.
- **Stacked services** (FFR headroom) not deducted from the energy-shifting MW.`,
        },
        {
          kind: "checklist",
          title: "PM checks on a sizing submission",
          items: [
            "Requirement stated at POI, 50 °C, 0.95 PF, for each contract year",
            "Each efficiency in the chain cited from a datasheet or test report",
            "Auxiliary load at 50 °C calculated and included (power and energy)",
            "PCS count based on derated MVA at 50 °C and reactive requirement",
            "SoC window and degradation margin (SoH floor or overbuild) explicit",
            "Charging energy reconciled with PV yield (P50 and a dusty-week case) or grid-charging allowance",
            "Stacked services and reserve headroom shown in the dispatch profile",
          ],
        },
        {
          kind: "ask",
          title: "Ask the contractor",
          items: [
            "Walk me through your sizing chain from POI MWh to DC nameplate, one efficiency at a time.",
            "What is your PCS MVA at 50 °C with the grid-code reactive requirement — and how many units are spares vs needed?",
            "What SoH floor have you assumed before augmentation, and what does your year-by-year POI energy table look like?",
            "How does your EMS reserve FFR headroom while delivering the evening shifting schedule?",
            "If the dispatch increases to 1.3 cycles/day, what changes in your sizing and warranty?",
          ],
        },
        { kind: "scenario", scenario: "m05-s3" },
        {
          kind: "feynman",
          prompt: "Explain to a non-engineer why a battery sold as \"500 MW / 2,000 MWh\" needs about 2,500 MWh of batteries on site.",
          keyPoints: [
            "Losses in transformers, inverters and the cells themselves between battery and meter",
            "Auxiliary loads like air-conditioning consume part of the output",
            "Cells cannot be fully emptied or filled (SoC window)",
            "Cells lose capacity with age, so extra is installed (or added later) to keep 2,000 MWh deliverable",
            "The ratio is roughly 1.25 MWh DC per MWh at the meter",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m05-l03-q1",
      type: "mcq",
      prompt: md`As PV penetration in Kuwait grows, why does the BESS requirement shift toward 4-hour energy shifting rather than 1-hour power?`,
      options: [
        "Because PV output is highest in the evening",
        "Because the net-load peak moves after sunset, when air-conditioning load remains high for several hours and PV is zero",
        "Because frequency response is no longer needed",
        "Because 4-hour systems are cheaper per MW",
      ],
      answer: 1,
      explanation: md`PV covers the midday/afternoon peak, so the residual (net-load) peak moves into the evening. In a Kuwaiti summer, evening temperatures stay near 40 °C and cooling load persists for hours — the storage must cover that duration.`,
      concepts: ["m05.energy-shifting"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m05-l03-q2",
      type: "numeric",
      prompt: md`A BESS must deliver 1,000 MWh at the POI. The combined one-way discharge efficiency from cells to POI (DC + PCS + transformers) is 0.95, the SoC window is 92 %, and augmentation keeps SoH above 0.88. Ignoring auxiliaries, what DC nameplate energy is required (MWh)?`,
      answer: 1300.2,
      unit: "MWh",
      tolerance: { rel: 0.01 },
      explanation: md`$E = 1{,}000 / (0.95 \times 0.92 \times 0.88) = 1{,}000/0.76912 = 1{,}300.2$ MWh. Every factor below 1 compounds — about 30 % more DC energy than POI energy.`,
      concepts: ["m05.bess-sizing"],
      difficulty: 2,
    },
    {
      id: "m05-l03-q3",
      type: "multi",
      prompt: md`Which use cases are primarily **power-limited** rather than energy-limited? (Select all.)`,
      options: ["PV ramp-rate control", "Fast frequency response", "4-hour evening energy shifting", "Voltage (reactive) support", "Peak capacity for resource adequacy"],
      answer: [0, 1, 3],
      explanation: md`Ramp control and FFR need large MW for minutes or seconds; reactive support uses PCS MVA with little energy. Energy shifting and resource adequacy are defined by sustained hours.`,
      concepts: ["m05.pv-firming", "m05.frequency-response", "m05.energy-shifting"],
      difficulty: 2,
    },
    {
      id: "m05-l03-q4",
      type: "mcq",
      prompt: md`What is the main advantage of DC-coupling a BESS to a PV plant with a high DC/AC ratio?`,
      options: [
        "Easier grid charging at night",
        "It can capture PV energy that would otherwise be clipped by the PV inverter",
        "It eliminates the need for a BMS",
        "It allows independent maintenance of PV and BESS",
      ],
      answer: 1,
      explanation: md`In DC coupling the battery sits on the PV inverter's DC bus (via a DC/DC converter) and can absorb DC power above the inverter's AC limit. The trade-offs are limited grid charging and dependence on PV inverters.`,
      concepts: ["m05.coupling"],
      difficulty: 2,
    },
    {
      id: "m05-l03-q5",
      type: "numeric",
      prompt: md`A BESS must deliver 300 MW at the POI. HV transformer efficiency 99.6 %, MV transformer 99.3 %, auxiliary load 6 MW taken from the MV bus. What PCS active power (MW) is required?`,
      answer: 309.4,
      unit: "MW",
      tolerance: { rel: 0.005 },
      explanation: md`$P_{MV} = 300/0.996 + 6 = 307.2$ MW; $P_{PCS} = 307.2/0.993 = 309.4$ MW. Then add reactive capability and 50 °C derating to get the PCS count.`,
      concepts: ["m05.bess-sizing"],
      difficulty: 2,
    },
    {
      id: "m05-l03-q6",
      type: "decision",
      prompt: md`The draft RFP for a 1 GW / 4 GWh BESS says: "The Contractor shall supply a 4,000 MWh battery system." The transaction advisor asks you to sign it off. What do you do?`,
      options: [
        { text: "Sign it off — the number matches the ministry's announcement.", score: 0, feedback: "Without a boundary, temperature and life, bidders will offer 4,000 MWh DC nameplate at BOL, which may deliver ~3,200 MWh at the POI by year 5." },
        { text: "Redraft: 1,000 MW and 4,000 MWh deliverable at the POI meter, at 50 °C and 0.95 PF, in every contract year, auxiliaries included, contractor responsible for augmentation; require the sizing chain in a template.", score: 1, feedback: "Correct — a functional, measurable, life-long requirement." },
        { text: "Ask for 4,500 MWh to be safe.", score: 0.3, feedback: "Adds cost without fixing the real problem: the requirement is still undefined." },
      ],
      explanation: md`Define the requirement where MEWRE receives value (POI), under the conditions that matter (summer evening at 50 °C), for the whole life, and make the contractor carry the conversion.`,
      concepts: ["m05.bess-sizing", "m05.energy-shifting"],
      difficulty: 2,
    },
    {
      id: "m05-l03-q7",
      type: "short",
      prompt: md`List the technical capabilities a BESS needs to provide black start for a 132 kV substation area.`,
      rubric: [
        "Grid-forming inverter control (sets voltage and frequency)",
        "Ability to energise transformers and cables — inrush handling or soft energisation",
        "Sufficient short-circuit current for protection to operate in island",
        "Load pick-up capability with adequate energy reserve",
        "Coordinated black-start procedure and protection settings with the TSO",
      ],
      modelAnswer: md`Grid-forming PCS control that creates voltage and frequency without an external grid; capability to energise large transformers and cables (soft/ramped energisation or high overload current for inrush); enough fault current (often 1.2–2 pu for a short time) so that protection can still detect faults in the island; reserved SoC and energy to pick up load blocks; dedicated protection setting groups and an agreed black-start plan with the transmission operator, tested periodically.`,
      concepts: ["m05.black-start"],
      difficulty: 3,
      explanation: md`Grid-following inverters cannot black start: they need an existing voltage to lock onto. Black start is as much about procedures and protection as about the PCS.`,
    },
  ],
  flashcards: [
    { id: "m05-l03-f1", front: "Ratio of DC nameplate to POI MWh for a typical 4-h LFP BESS with degradation margin", back: "~1.2–1.3 (≈1.26 in the worked example)", concepts: ["m05.bess-sizing"] },
    { id: "m05-l03-f2", front: "Why PCS MW > POI MW", back: "Transformer losses and auxiliaries sit between PCS and the POI meter", concepts: ["m05.bess-sizing"] },
    { id: "m05-l03-f3", front: "Ramp-control energy formula", back: md`$E = \tfrac{1}{2}\Delta P \cdot \Delta P / r_{max}$ — power-heavy, energy-light`, concepts: ["m05.pv-firming"] },
    { id: "m05-l03-f4", front: "Energy reservation for symmetric FCR", back: "Energy for full output in both directions for the required duration, around a mid-SoC set-point", concepts: ["m05.frequency-response"] },
    { id: "m05-l03-f5", front: "Why Kuwait's net-load peak moves to the evening", back: "PV covers midday; AC load persists after sunset with ambient ~40 °C", concepts: ["m05.energy-shifting"] },
    { id: "m05-l03-f6", front: "AC vs DC coupling — the one-line difference", back: "AC: BESS has its own PCS on the AC collector; DC: battery shares the PV inverter via a DC/DC converter", concepts: ["m05.coupling"] },
    { id: "m05-l03-f7", front: "Inverter control needed for black start", back: "Grid-forming (voltage source behaviour)", concepts: ["m05.black-start"] },
    { id: "m05-l03-f8", front: "Five conditions for a BESS size requirement", back: "At POI; at 50 °C; at 0.95 PF; every contract year; auxiliaries included", concepts: ["m05.bess-sizing"] },
  ],
  scenarios: [
    {
      id: "m05-s3",
      title: "Two bids, two different 2,000 MWh",
      dayInLife: true,
      context: md`You are on MEWRE's technical evaluation committee for a 500 MW / 2,000 MWh BESS (EPC + 15-year LTSA). The RFP stated the requirement "at the POI" but did not specify ambient or whether auxiliaries are included. Two compliant-looking bids are within 3 % on price.`,
      start: "a",
      concepts: ["m05.bess-sizing", "m05.energy-shifting"],
      nodes: {
        a: {
          md: md`Bid X offers 2,260 MWh DC with augmentation "as required under the LTSA". Bid Y offers 2,520 MWh DC with augmentation at years 6, 11 and 16. Bid X's PCS count is based on 4.2 MVA units (35 °C rating); Bid Y uses 3.78 MVA (50 °C). The commercial team favours X (2.8 % cheaper). What do you do?`,
          choices: [
            { text: "Ask the OE to normalise both bids to POI, 50 °C, 0.95 PF, auxiliaries included, and to recompute X's PCS count and year-by-year energy; send equal clarification questions to both bidders through KAPP/CAPT rules.", next: "b", score: 10, feedback: "Right: normalise, then compare, using formal and equal clarifications." },
            { text: "Recommend X — cheapest compliant bid.", next: "c", score: 2, feedback: "Compliance on paper is not equivalence. X may not deliver 500 MW at 50 °C." },
            { text: "Disqualify X for using the 35 °C rating.", next: "b", score: 4, feedback: "The RFP did not specify the ambient — disqualification on a criterion not in the RFP invites challenge. Clarify instead." },
          ],
        },
        b: {
          md: md`The OE's normalisation: X needs ~13 more PCS units for 50 °C and reactive capability, and its auxiliary consumption at 50 °C would reduce deliverable POI energy to ~1,960 MWh at BOL. Corrected, X is 1.5 % *more* expensive than Y over life. Bidder X, in clarification, confirms it will "comply with all requirements at no extra cost".`,
          choices: [
            { text: "Record X's clarification as binding, re-run the evaluation with normalised costs, and report both to the committee with the risk that X's price does not cover the extra PCS.", next: "d", score: 8, feedback: "Good — a binding clarification protects MEWRE; flagging under-pricing risk is honest." },
            { text: "Recommend Y on the normalised life-cycle cost and its demonstrably compliant design.", next: "d", score: 9, feedback: "Defensible, provided the RFP's evaluation method allows life-cycle cost adjustment. Check the evaluation criteria first." },
          ],
        },
        c: {
          md: md`X is awarded. In the first August, the plant delivers 470 MW maximum at 49 °C. The EPC argues the RFP never mentioned 50 °C.`,
          choices: [
            { text: "Use the Employer's Requirements' general climatic data clause (if any) and fitness-for-purpose obligations, and prepare for a dispute; capture the lesson for future RFPs.", score: 4, feedback: "You may win, but you are now in a dispute about something a single sentence in the RFP would have prevented." },
            { text: "Accept 470 MW as the summer rating.", score: 0, feedback: "That gives away 30 MW of firm evening capacity at the exact time the grid needs it." },
          ],
        },
        d: {
          md: md`The committee asks for one lesson for the next BESS RFP.`,
          choices: [
            { text: "Fix the requirement: MW and MWh at POI, 50 °C, 0.95 PF, every contract year, auxiliaries included, with a mandatory sizing template.", score: 10, feedback: "Exactly the lesson of this lesson." },
            { text: "Specify the exact cell and PCS models.", score: 3, feedback: "Over-prescriptive and anti-competitive; specify function, not products." },
          ],
        },
      },
    },
  ],
};

export default lesson;
