import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m01-l05",
  title: "Capacity Factor, Load Curves and Peak Demand",
  summary:
    "Capacity factor (AC vs DC), specific yield, load factor, diversity, the energy balance and Kuwait's summer-peaking load — and why PV's coincidence with the afternoon air-conditioning peak is both its great strength and, at high penetration, the start of a duck curve.",
  minutes: 60,
  objectives: [
    "You can compute and correctly interpret capacity factor on AC and DC bases, and convert from specific yield.",
    "You can compute load factor and diversity factor and explain what they say about a power system's economics.",
    "You can describe Kuwait's summer vs winter load shape and explain why PV's peak contribution falls as penetration grows (net load, duck curve).",
    "You can challenge an energy or capacity-factor claim in a bid or briefing by checking its basis.",
  ],
  concepts: [
    {
      id: "m01.capacity-factor",
      name: "Capacity factor and specific yield",
      description: "Energy delivered divided by the energy at continuous rated output; must state AC or DC basis. Specific yield (kWh/kWp) normalises by DC size.",
      competency: "engineering",
      related: ["m01.energy-vs-power", "m01.load-factor-diversity", "m02.performance-ratio", "m00.target-to-capacity"],
    },
    {
      id: "m01.load-factor-diversity",
      name: "Load factor and diversity",
      description: "Load factor = average/peak demand; diversity factor = sum of individual peaks / coincident peak. Together they describe how hard a system's assets are used.",
      competency: "engineering",
      related: ["m01.load-curve-kuwait"],
    },
    {
      id: "m01.load-curve-kuwait",
      name: "Kuwait's load curve and peak",
      description: "A summer-peaking, air-conditioning-driven system (peak ≈ 17.5–17.7 GW in 2024–2026) with much lower winter demand; peak at hot afternoons, with demand persisting into the evening.",
      competency: "context",
      related: ["m01.net-load-duck", "m00.peak-demand"],
    },
    {
      id: "m01.net-load-duck",
      name: "Net load, duck curve and capacity credit",
      description: "Load minus variable renewables; as PV grows the net peak shifts to the evening and PV's capacity credit falls, increasing the value of storage.",
      competency: "grid",
      related: ["m01.capacity-factor", "m05.energy-shifting", "m06.curtailment"],
    },
  ],
  sections: [
    // ================================================================ THEORY
    {
      layer: "theory",
      title: "How much, how often, and when",
      blocks: [
        {
          kind: "md",
          md: md`### Capacity factor

Lesson 1 separated power (MW) from energy (MWh). Capacity factor links them for a generator over a year:`,
        },
        { kind: "equation", formula: "m01-capacity-factor" },
        {
          kind: "md",
          md: md`| Technology | Typical CF | Driver |
|---|---|---|
| PV fixed tilt, Kuwait | 19–23% (AC) | Resource, heat, soiling |
| PV single-axis tracker, Kuwait | 24–32% (AC) | DC/AC ratio, bifacial gain, soiling, curtailment |
| Wind, Shagaya (5 × 2 MW) | 45.2% yr 1, 42.1% yr 2 (measured) | Strong summer winds — ~70% of output in summer months |
| CSP with 10 h storage | 35–50% | Storage hours, solar multiple, DNI |
| CCGT (baseload, efficient) | 50–85% | Merit order, gas supply |
| Open-cycle GT (peaker) | 5–20% | Runs only at peaks |
| BESS (energy-shifting) | 10–20% (discharge) | 1 cycle/day × duration / 24 h |

**Capacity factor is not availability.** Availability is the fraction of time a plant *could* run (technical readiness, often 98–99.5% for PV); capacity factor is what it *did* produce relative to nameplate. A PV plant can be 99.5% available with a 27% capacity factor because the sun sets.

### AC vs DC basis — the most common confusion

PV plants are built with more DC module capacity (MWp) than AC inverter/export capacity (MW): a **DC/AC ratio** of 1.2–1.4 is normal, because modules rarely reach STC output in the field and a little midday clipping is cheaper than extra inverters. So:`,
        },
        { kind: "equation", formula: "m01-specific-yield" },
        {
          kind: "md",
          md: md`A plant with 1,430 MWp DC and 1,100 MW AC, yielding 1,900 kWh/kWp, has CF ≈ 21.7% on DC but 28.2% on AC. Both are "right" — but a tender that compares one bidder's AC CF with another's DC CF, or a briefing that multiplies DC MWp by an AC CF, is wrong by 30%. PPAs and grid capacity are in **AC MW at the POC**; module procurement and PVsyst are in **DC MWp**. Always write the basis.

### Load curves, load factor and diversity

A **load curve** plots demand against time (daily, weekly, annual). A **load-duration curve** sorts the year's 8,760 hourly demands from highest to lowest: its area is annual energy, its left-hand tip is the peak.`,
        },
        { kind: "equation", formula: "m01-load-factor" },
        { kind: "equation", formula: "m01-diversity-factor" },
        {
          kind: "callout",
          tone: "why",
          title: "Why load factor drives cost of supply",
          md: md`Generation, transmission and distribution are sized for the **peak**, but revenue (and fuel savings) comes from **energy**. A system with a 50% annual load factor uses its assets, on average, half as hard as one at 100%. Kuwait's air-conditioning load creates a tall, short summer peak: much of the fleet built to meet the peak sits idle in winter. Anything that shaves the peak — demand response, PV coincident with afternoon load, storage, imports — avoids capital that would be used only a few hundred hours a year.`,
        },
        {
          kind: "md",
          md: md`### Kuwait's load shape

- **Summer peak**: about **17.6 GW** — MEWRE figures are 17,640 MW (2024), 17,610 MW (2025) and 17,540 MW (2026); MEES reported a July 2025 record of 17.71 GW (different measurement basis). The all-time high in August 2023 was 16.94 GW.
- **Growth**: new connections added about 1,059 MW of load from summer 2024 to 2025 and 1,019 MW from 2025 to 2026 — conservation measures (shorter government hours, suspending factory operations at peak) held the measured peak flat.
- **Supply margin**: roughly 21 GW installed but only about 17 GW reliably available at peak; in June 2025 available capacity was 16.275 GW against a 16.98 GW peak, and shortages exceeded 1.5 GW in May 2025, with programmed cuts and requests to reduce use between **11:00 and 17:00**.
- **Imports**: a 500 MW GCCIA import deal (sourced from Oman 350 MW and Qatar 200 MW as reported — the split sums to more than the headline, so it is probably a maximum offer) was contracted mainly for June 2024.

The daily summer profile is driven by air-conditioning: demand climbs through the morning, peaks in the hottest hours of the afternoon, and stays high into the evening as people return home and buildings release stored heat. **This coincidence with PV output is Kuwait's biggest solar advantage** — every MW of PV output at 13:00–16:00 offsets thermal generation exactly when reserve margins are thinnest.`,
        },
        { kind: "sources", refs: ["m01-kt-peak-2026", "m01-mees-crisis-2024", "m01-mees-capacity-2025", "m01-mees-may-2025", "m01-invezz-rystad-2025", "m01-mees-gccia-2024", "m01-ucar-shagaya-wind"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "Winter demand, annual energy and hourly shape — not in the research brief",
          md: md`The research brief has no official figures for Kuwait's winter peak, minimum load, annual electricity consumption (TWh) or the exact hour of the summer peak. This lesson uses **illustrative** values (winter peak roughly half the summer peak; annual energy of the order of 80 TWh; peak in mid-afternoon with a slow evening decline). Obtain the MEWRE Statistical Yearbook (hourly load data from the National Control Centre) before using any of these in analysis.`,
        },
        { kind: "widget", widget: "load-curve", props: { season: "summer", pvMW: 3000 }, caption: "Kuwait-style summer day with 3 GW of PV (roughly the 2030 solar outlook). Note how net load's peak moves later and the evening ramp steepens. Switch to winter and increase PV to see a midday trough." },
        {
          kind: "md",
          md: md`### Net load and the duck curve

The dispatchable fleet (thermal, BESS, imports) has to serve the **net load**:`,
        },
        { kind: "equation", formula: "m01-net-load" },
        {
          kind: "md",
          md: md`An illustrative Kuwaiti summer day with 3 GW of tracking PV:

| Hour | Load (GW) | PV output (GW) | Net load (GW) |
|---|---|---|---|
| 12:00 | 16.8 | 2.85 | 13.95 |
| 15:00 | 17.5 | 2.25 | 15.25 |
| 18:00 | 17.0 | 0.45 | 16.55 |
| 20:00 | 16.3 | 0.0 | 16.30 |

The gross peak (17.5 GW at 15:00) is reduced, but the **net** peak (16.55 GW) now occurs at 18:00. Three GW of PV reduced the peak the thermal fleet must meet by only 0.95 GW: PV's **capacity credit** here is about 32%, and it falls further as more PV is added, because each extra MW of PV pushes the net peak further into the evening. In winter, with lower load, high PV can push midday net load down towards the minimum stable output of the thermal units — the belly of the "duck" — forcing curtailment or storage.

This is why MEWRE's planned 1–1.5 GW / 4–6 GWh BESS is strategically tied to the PV programme: storage charges from midday PV and discharges into the evening net peak.`,
        },
        { kind: "sources", refs: ["m01-agbi-bess-2025", "m01-caiso-duck", "m01-iea-grid-integration"] },
        {
          kind: "md",
          md: md`### Energy balance

Over any period, energy in equals energy out:`,
        },
        { kind: "equation", formula: "m01-energy-balance" },
        {
          kind: "md",
          md: md`And at every instant the **power** balance must hold. In lesson 6 you will see that frequency is the real-time signal of any imbalance.`,
        },
      ],
    },
    // ================================================================ APPLIED
    {
      layer: "applied",
      title: "Capacity factor and load-factor calculations",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Capacity factor of a 1.1 GW tracker plant — AC vs DC",
          given: md`A PV plant has 1,430 MWp DC and 1,100 MW AC export capacity (DC/AC = 1.3). The energy yield report gives a P50 specific yield of 1,900 kWh/kWp/yr at the POC (after soiling, temperature, clipping, availability and losses).`,
          steps: [
            { md: md`**Annual energy.** $E = 1{,}430{,}000\ \text{kWp} \times 1{,}900\ \text{kWh/kWp} = 2.717\times10^9$ kWh = 2,717,000 MWh.` },
            { md: md`**DC capacity factor.** $1{,}900/8{,}760 = 21.7\%$.` },
            { md: md`**AC capacity factor.** $2{,}717{,}000/(1{,}100\times8{,}760) = 28.2\%$.` },
            { md: md`**Check against Shagaya wind.** A 10 MW farm at 45.2% produces $10\times8{,}760\times0.452 = 39.6$ GWh — per MW, 1.6× the PV plant's AC energy, and strongly summer-weighted in Shagaya.` },
          ],
          result: md`About **2.72 TWh/yr**: CF **21.7% (DC)** or **28.2% (AC)**. State the basis every time; multiplying 1,430 MWp by 28.2% would overstate energy by 30%.`,
        },
        { kind: "widget", widget: "capacity-factor", props: { mw: 1100, mwh: 2717000 }, caption: "Check the AC capacity factor above, then compare with the typical ranges for wind, CSP and gas." },
        {
          kind: "worked",
          mode: "faded",
          title: "Kuwait's annual load factor (illustrative energy)",
          given: md`Assume a summer peak of 17,640 MW (MEWRE 2024 figure) and an illustrative annual energy demand of 80 TWh (not an official figure).`,
          steps: [
            { md: md`Average demand: $P_\text{avg} = E/8{,}760$.` },
            {
              md: md`$P_\text{avg} = 80\times10^6\ \text{MWh}/8{,}760\ \text{h} = 9{,}132$ MW.`,
              hidden: true,
              check: { prompt: "Average demand", answer: 9132, unit: "MW", tolerance: { rel: 0.01 } },
            },
            {
              md: md`$\text{LF} = 9{,}132/17{,}640 = 0.518$ → 51.8%.`,
              hidden: true,
              check: { prompt: "Annual load factor", answer: 51.8, unit: "%", tolerance: { abs: 0.5 } },
            },
            { md: md`Interpretation: on average the system runs at about half its peak. Capacity installed for the last 1–2 GW of peak may run only a few hundred hours a year.` },
          ],
          result: md`Load factor ≈ **52%** on these assumptions — typical of a hot-climate, air-conditioning-dominated system (temperate systems are often 60–70%).`,
        },
        {
          kind: "question",
          question: {
            id: "m01-l05-p1",
            type: "numeric",
            prompt: md`Four 11 kV feeders out of a primary substation have individual maximum demands of 12, 9, 15 and 8 MW. The substation's measured maximum demand is 38 MW. What is the diversity factor?`,
            answer: 1.158,
            tolerance: { rel: 0.01 },
            explanation: md`$\text{DF} = (12 + 9 + 15 + 8)/38 = 44/38 = 1.158$. The transformers need to carry 38 MW, not 44 MW. In Kuwaiti residential areas on a July afternoon, AC loads are highly coincident and diversity is low — a reason distribution planners cannot assume temperate-climate diversity factors.`,
            concepts: ["m01.load-factor-diversity"],
            difficulty: 1,
          },
        },
      ],
    },
    // ================================================================ FIELD
    {
      layer: "field",
      title: "Using capacity and load data as a MEWRE PM",
      blocks: [
        {
          kind: "md",
          md: md`### Where these numbers appear

- **Energy yield assessment** (PVsyst-based, by the bidder and independently by the lenders' technical adviser): P50/P90 specific yield, losses, CF.
- **PPA**: contracted capacity (AC MW at POC), expected/contracted energy, guaranteed availability or performance ratio, deemed energy for grid curtailment (who pays when the grid cannot take the energy — module 9).
- **System planning**: MEWRE planning and the National Control Centre use hourly load data, peak forecasts and reserve margins to decide how much PV, BESS and thermal capacity to procure, and when.
- **Ministerial briefings**: "how many homes", "how much of the peak", "how much fuel" — each needs the right basis.

### Capacity factor ≠ peak contribution

A PV plant's annual CF (≈ 28%) says nothing direct about its contribution at **peak**. At 15:00 in July a tracking plant may deliver 70–85% of AC rating; at 19:00, almost nothing. For capacity planning, what matters is output during the hours of system stress — and as PV grows, those hours move into the evening.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Claims that collapse under a basis check",
          md: md`- "The plant has a 30% capacity factor" — on AC or DC? P50 or P90? Before or after curtailment?
- "1.1 GW of solar will cover 6% of the peak" — at what hour? If the net peak is at 18:00, the firm contribution may be a third of that.
- "Solar provides X% of electricity" — energy share (TWh) is not capacity share (GW): 1.1 GW is ~6% of peak capacity but, at 28% CF, about 3–3.5% of 80 TWh annual energy (illustrative).
- "Availability guarantee 99%" presented as if it guaranteed energy — it does not; irradiance and soiling risk remain.`,
        },
        {
          kind: "checklist",
          title: "PM checklist — energy, capacity factor and peak claims",
          items: [
            "Capacity basis stated: AC MW at POC vs DC MWp; DC/AC ratio given.",
            "Energy basis stated: P50 or P90; at POC after losses, availability, curtailment and degradation (year 1 or life average).",
            "Capacity factor uses 8,760 h (8,784 in a leap year) and the same capacity basis as the PPA.",
            "Peak-contribution claims tied to a specific hour and season, ideally using hourly load and PV profiles.",
            "Load data source named (MEWRE National Control Centre / Statistical Yearbook); measurement basis (gross/net, instantaneous/hourly) stated.",
            "Energy share and capacity share not confused.",
          ],
        },
        {
          kind: "ask",
          title: "Ask the bidder / planning team",
          items: [
            "Is your capacity factor on AC export or DC nameplate, and what DC/AC ratio did you assume?",
            "What is the plant's expected output (MW) at 15:00, 18:00 and 20:00 on a typical July day?",
            "How much clipping and curtailment energy is included or excluded in your P50?",
            "What hourly load profile did you use to estimate peak contribution, and from which year?",
            "With all planned PV in service, at what hour does net summer peak occur, and how much BESS is needed to cover it?",
          ],
        },
        { kind: "scenario", scenario: "m01-s4" },
        {
          kind: "feynman",
          prompt: "Explain to a journalist why 1 GW of solar does not remove 1 GW from Kuwait's peak problem, but is still very valuable.",
          keyPoints: [
            "Capacity factor: solar produces on average about a quarter to a third of its rating over a year.",
            "Kuwait's peak is on hot afternoons when solar output is high, so it does help at peak.",
            "Demand stays high into the evening after solar fades, so the peak left for other plants moves later.",
            "Each additional GW of solar reduces the remaining peak by less; storage shifts midday solar into the evening.",
            "Even so, every solar MWh saves fuel and frees thermal capacity in the hottest hours.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m01-l05-q1",
      type: "numeric",
      prompt: md`Shagaya Phase I (70 MW total: 50 MW CSP, 10 MW PV, 10 MW wind) had a target output of about 225,000 MWh/yr. What capacity factor does that imply for the whole complex, in %?`,
      answer: 36.7,
      tolerance: { abs: 0.3 },
      unit: "%",
      explanation: md`$225{,}000/(70\times8{,}760) = 0.367$ → **36.7%**. High for solar because the CSP plant has 10 h of thermal storage and the wind farm runs at 42–45%.`,
      concepts: ["m01.capacity-factor"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m01-l05-q2",
      type: "mcq",
      prompt: md`A plant has 1,300 MWp DC and 1,000 MW AC. Its annual energy is 2.5 TWh. Which statement is correct?`,
      options: [
        "AC capacity factor 28.5%, DC capacity factor 22.0%",
        "AC capacity factor 22.0%, DC capacity factor 28.5%",
        "Capacity factor 25%, regardless of basis",
        "Capacity factor 2.5%",
      ],
      answer: 0,
      explanation: md`AC: $2.5\times10^6/(1{,}000\times8{,}760) = 28.5\%$. DC: $2.5\times10^6/(1{,}300\times8{,}760) = 22.0\%$. The smaller (AC) denominator gives the larger CF.`,
      concepts: ["m01.capacity-factor"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "m01-l05-q3",
      type: "numeric",
      prompt: md`In an illustrative summer day, gross peak load is 17.5 GW at 15:00. After adding 3 GW of PV, the net peak becomes 16.55 GW at 18:00. What is PV's effective capacity credit, as % of installed PV?`,
      answer: 31.7,
      tolerance: { abs: 0.5 },
      unit: "%",
      explanation: md`Peak reduction = 17.5 − 16.55 = 0.95 GW; 0.95/3 = **31.7%**. The credit is set by output at the new net-peak hour, not at the gross-peak hour.`,
      concepts: ["m01.net-load-duck"],
      difficulty: 2,
    },
    {
      id: "m01-l05-q4",
      type: "multi",
      prompt: md`Which statements about Kuwait's load are supported by the sourced figures in this lesson? Select all that apply.`,
      options: [
        "Summer peak was about 17.6 GW in 2024 (MEWRE figure).",
        "Reliably available capacity at peak (~17 GW) is well below installed capacity (~21 GW).",
        "Consumers were asked to reduce use between 11:00 and 17:00 during the May 2025 peak.",
        "Kuwait's winter peak is officially 9.2 GW.",
        "Kuwait contracted 500 MW of GCCIA imports for summer 2024.",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`All except the winter-peak figure come from the research brief (Kuwait Times/MEWRE, Rystad via Invezz, MEES, MEES). No official winter peak figure was found — any specific number would need checking against the MEWRE Statistical Yearbook.`,
      concepts: ["m01.load-curve-kuwait"],
      difficulty: 1,
    },
    {
      id: "m01-l05-q5",
      type: "order",
      prompt: md`Order these Kuwait-relevant technologies from **highest** to **lowest** typical annual capacity factor.`,
      items: [
        "Efficient CCGT running baseload",
        "Shagaya wind (measured)",
        "Single-axis tracking PV (AC basis)",
        "Open-cycle gas peaker",
      ],
      explanation: md`Typical ranges: baseload CCGT 50–85%; Shagaya wind 42–45% (measured); tracking PV 24–32% (AC); peaker 5–20%. CSP with 10 h storage (35–50%) would sit near wind — its exact position depends on design, which is why it is left out here.`,
      concepts: ["m01.capacity-factor"],
      difficulty: 2,
    },
    {
      id: "m01-l05-q6",
      type: "short",
      prompt: md`Explain the difference between availability and capacity factor for a PV plant, and why a PPA usually guarantees the former rather than the latter.`,
      rubric: [
        "Availability = fraction of time (or energy) the plant is technically able to produce when resource is present.",
        "Capacity factor = actual energy / (rated power × hours), dominated by resource (sun hours, irradiance).",
        "A PV plant can be 99% available with ~28% CF.",
        "Contractor/IPP controls availability, not weather; risk allocation favours guaranteeing what the party controls (availability or PR).",
      ],
      modelAnswer: md`Availability measures whether the plant is ready to generate (e.g. 99% of daylight hours with all inverters running). Capacity factor measures how much energy it actually delivered compared with running at full AC rating all year — for PV in Kuwait around 24–32%, mostly because of night and the sun's angle, not plant faults. A PPA or O&M contract guarantees availability (or performance ratio) because those are within the operator's control, while irradiance is weather risk that stays with whoever the contract allocates resource risk to.`,
      explanation: md`Guarantees should attach to what a party can control. Resource risk is usually borne by the IPP in its tariff, while availability/PR guarantees police the O&M performance.`,
      concepts: ["m01.capacity-factor"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m01-l05-f1", front: "Capacity factor", back: md`$\text{CF} = E_\text{year}/(P_\text{rated}\times 8760)$ — state AC or DC`, concepts: ["m01.capacity-factor"] },
    { id: "m01-l05-f2", front: "Specific yield to DC capacity factor", back: md`$\text{CF}_\text{DC} = Y_f/8760$`, concepts: ["m01.capacity-factor"] },
    { id: "m01-l05-f3", front: "Load factor", back: md`$\text{LF} = P_\text{avg}/P_\text{peak}$`, concepts: ["m01.load-factor-diversity"] },
    { id: "m01-l05-f4", front: "Diversity factor", back: md`Sum of individual peaks ÷ coincident peak (≥ 1)`, concepts: ["m01.load-factor-diversity"] },
    { id: "m01-l05-f5", front: "Kuwait summer peak 2024 (MEWRE)", back: "17,640 MW (17,610 MW in 2025; 17,540 MW in 2026)", concepts: ["m01.load-curve-kuwait"] },
    { id: "m01-l05-f6", front: "Shagaya wind measured capacity factor", back: "45.2% year 1, 42.1% year 2 (≈ 70% of output in summer months)", concepts: ["m01.capacity-factor"] },
    { id: "m01-l05-f7", front: "Net load", back: md`$P_\text{net} = P_\text{load} - P_\text{PV} - P_\text{wind}$`, concepts: ["m01.net-load-duck"] },
    { id: "m01-l05-f8", front: "Why does PV's capacity credit fall as more PV is added?", back: "The net peak shifts to the evening, when PV output is low", concepts: ["m01.net-load-duck"] },
    { id: "m01-l05-f9", front: "Availability vs capacity factor", back: "Availability = ready to run; CF = energy actually produced vs nameplate × hours", concepts: ["m01.capacity-factor"] },
  ],
  scenarios: [
    {
      id: "m01-s4",
      title: "\"Will Shagaya end the summer power cuts?\"",
      dayInLife: true,
      context: md`Wednesday, 14:00 in July. An MP's question has reached the Minister's office: "Will the 1.1 GW Shagaya solar project end the summer power cuts?" You have two hours to draft a factual paragraph for the Minister's reply. You know: peak ≈ 17.6 GW; reliable capacity ≈ 17 GW; shortages exceeded 1.5 GW in May 2025; ~1 GW of new load connects each year; MEWRE plans a 1–1.5 GW BESS.`,
      start: "a",
      concepts: ["m01.net-load-duck", "m01.load-curve-kuwait", "m01.capacity-factor"],
      nodes: {
        a: {
          md: md`What core message do you build the paragraph around?`,
          choices: [
            { text: "Solar output matches the hot-afternoon peak and will add significant capacity in those hours and save fuel, but because demand stays high into the evening and grows ~1 GW a year, solar must be combined with storage, new firm capacity and demand management.", next: "b", score: 10, feedback: "Accurate, balanced and defensible — and it sets up the BESS programme." },
            { text: "Yes — 1.1 GW exceeds the 0.6 GW gap between peak and reliable capacity.", next: "c", score: 1, feedback: "Ignores timing (evening net peak), demand growth and the fact that the gap exceeded 1.5 GW at times." },
            { text: "Avoid the question — say the project is under evaluation.", next: "c", score: 3, feedback: "Safe but unhelpful, and it misses a chance to explain the role of storage." },
          ],
        },
        b: {
          md: md`The Minister's adviser asks you to add one number showing solar's contribution at peak. Which do you choose?`,
          choices: [
            { text: "'Around 0.8–0.9 GW in the mid-afternoon hours, falling towards zero by early evening' — with a note that this depends on hourly profiles to be confirmed with the National Control Centre.", next: "d", score: 10, feedback: "A range tied to specific hours, honestly caveated." },
            { text: "'1.1 GW' — its nameplate.", next: "d", score: 3, feedback: "Nameplate output is rarely reached at the AC terminals on a 48 °C afternoon with dust, and it implies a constant contribution." },
            { text: "'28% capacity factor'.", next: "d", score: 4, feedback: "Correct but it answers a different question (annual energy), and an MP will not interpret it." },
          ],
        },
        c: {
          md: md`Your draft goes up. The Undersecretary sends it back: "This will be quoted in the newspapers next summer. Make it accurate."`,
          choices: [
            { text: "Rewrite around timing, growth and the storage plan.", next: "b", score: 6, feedback: "Recovered — but a draft that has to be returned costs credibility upward." },
          ],
        },
        d: {
          md: md`Final line: the adviser wants to end with "Solar will make power cuts a thing of the past." Your response?`,
          choices: [
            { text: "Suggest instead: 'Solar, together with the planned battery storage and new generation capacity, is a central part of the Ministry's plan to secure summer supply.'", score: 10, feedback: "Keeps the political message positive without a promise the physics cannot keep." },
            { text: "Accept the line — it is political language.", score: 2, feedback: "If cuts occur next summer, this line becomes the story — and the project's credibility suffers." },
          ],
        },
      },
    },
  ],
};

export default lesson;
