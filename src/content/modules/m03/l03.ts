import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m03-l03",
  title: "Shagaya CSP and Operating Lessons",
  summary:
    "What is publicly known about Kuwait's 50 MW Shagaya trough plant, what is not, and what the global fleet — Noor Ouarzazate, DEWA's Noor Energy 1 — teaches about operating CSP in dusty deserts, including mirror cleaning and water.",
  minutes: 70,
  objectives: [
    "You can state Shagaya Phase I's configuration, contractors and timeline, and separate verified facts from unverified ones",
    "You can compute an implied capacity factor from a target output and spot ambiguous scope",
    "You can summarise the key lessons from Noor Ouarzazate and Noor Energy 1 relevant to Kuwait",
    "You can estimate mirror-cleaning water use and the energy value of cleaning frequency",
    "You can plan an asset-performance review for a CSP plant whose data are not public",
  ],
  concepts: [
    {
      id: "m03.shagaya-csp",
      name: "Shagaya 50 MW CSP",
      description: "KISR-led Phase I parabolic trough plant with ~10 h molten-salt storage and dry cooling, operating from about 2019.",
      competency: "solar",
      related: ["m03.csp-lessons-learned", "m03.dni-resource-risk", "m00.shagaya-phase1"],
    },
    {
      id: "m03.csp-lessons-learned",
      name: "Global CSP operating lessons",
      description: "Recurring issues from Noor Ouarzazate, Noor Energy 1 and other fleets: tank leaks, receiver failures, ramp-up periods, DNI shortfall.",
      competency: "solar",
    },
    {
      id: "m03.mirror-cleaning",
      name: "Mirror cleaning and water",
      description: "Cleaning frequency vs reflectivity loss vs demineralised water consumption in a dusty desert.",
      competency: "operations",
      related: ["m02.cleaning-strategy", "m12.cleaning-economics"],
    },
    {
      id: "m03.csp-om",
      name: "CSP O&M model",
      description: "Large permanent staff, thermal-plant disciplines plus solar-field crews; availability and performance KPIs.",
      competency: "operations",
      related: ["m03.mirror-cleaning", "m12.maintenance-strategy", "m12.availability"],
    },
    {
      id: "m03.dni-resource-risk",
      name: "DNI resource risk",
      description: "Uncertainty in long-term DNI from aerosols and dust events, propagating non-linearly into CSP energy.",
      competency: "solar",
      related: ["m02.solar-resource-data", "m02.p50-p90"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Shagaya Phase I: facts, gaps and context",
      blocks: [
        {
          kind: "md",
          md: md`## The plant

Shagaya Renewable Energy Park sits in Jahra Governorate, west of Kuwait City, on a site of about 84 km². **Phase I** was a 70 MW technology pilot developed by **KISR** with the then Ministry of Electricity and Water, comprising:

| Component | Capacity | Key facts (public sources) |
|---|---|---|
| CSP | 50 MW | Parabolic trough, ~10 h molten-salt storage, dry cooling; storage quoted as 1,200 MWh_th; contractor TSK (approved 2015) |
| PV | 10 MW | Testbed comparing thin-film and polycrystalline; monthly water cleaning |
| Wind | 10 MW | Five 2 MW turbines; Elecnor (~EUR 22.4 m); commissioned May 2017 |

The CSP plant was reported commissioned in late 2018 with commercial/full operation from about **February 2019** (sources differ on exact dates). Contracts reportedly included **6-year design-build-operate** periods — meaning the original contractors operated the assets into about 2024–2025. A target output of "up to about 225,000 MWh a year" was reported.`,
        },
        { kind: "sources", refs: ["m03-iea-policy-5541", "m03-reuters-csp-kuwait", "m03-worley-shagaya", "m03-tsk-award", "m03-reuters-csp-400mw"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "What is NOT publicly verified",
          md: md`- **Operating performance** of the 50 MW CSP after 2019 (annual MWh, availability, storage use) — no published data found.
- **Current operating status** (2025–2026) and who operates it after the design-build-operate period.
- **CSP EPC partners** beyond TSK (a Kuwaiti partner is sometimes mentioned but not confirmed).
- **Scope of the 225,000 MWh/yr target** — whether it refers to the CSP alone or the whole 70 MW Phase I.
- **Exact solar-field aperture area**, solar multiple and HTF supplier.

Treat any number on these as a question to ask KISR/MEWRE, not a fact to quote.`,
        },
        {
          kind: "md",
          md: md`## The CSP that never followed

The 2014 masterplan foresaw a lot of CSP: Phase 2 with 550 MW CSP among 1,000 MW, and Phase 3 reaching 1,150 MW CSP within 2,000 MW by 2030. A later restructured plan cut Phase 2 CSP to **200 MW with ~5 h storage** alongside large PV IPPs — and that CSP plant was **never procured**. The current Shagaya Phase III zones procured by KAPP are **solar PV IPPs**, and storage needs are being addressed by planned **battery** capacity. Kuwait's trajectory thus repeats the global one: CSP was planned at scale in the early 2010s, then displaced by PV and later PV+BESS as their costs collapsed (lesson 4).

That makes the 50 MW plant strategically interesting: it is the only utility CSP plant in Kuwait and the only local evidence on how troughs and molten salt perform in Kuwaiti dust and heat. The research brief calls the absence of public post-2019 performance data a **key lessons-learned gap**.`,
        },
        { kind: "sources", refs: ["m03-iea-policy-5541", "m03-ice-phase2"] },
        {
          kind: "callout",
          tone: "why",
          title: "Why a pilot plant's data are worth more than its electricity",
          md: md`At 50 MW the plant is ~0.3 % of Kuwait's ~17 GW peak — its energy is marginal. Its value is information: measured DNI and dust-event statistics, real mirror cleanliness curves, receiver failure rates, salt and heat-tracing behaviour, dry-cooling derating on 50 °C days, staffing costs. A ministry that does not systematically harvest and publish that information has paid pilot-plant prices for commercial-plant output. A good PM treats the data archive as a deliverable.`,
        },
        {
          kind: "md",
          md: md`## Global experience you should know

**Noor Ouarzazate (Morocco)** — developed by Masen with ACWA Power as developer/operator, financed with World Bank and other DFIs.

| Plant | Technology | Storage | COD |
|---|---|---|---|
| Noor I | 160 MW parabolic trough (oil) | ~3 h | 2016 |
| Noor II | 200 MW parabolic trough (oil) | ~7 h | 2018 |
| Noor III | 150 MW molten-salt tower | ~7–7.5 h | 2018 |

Lessons: dry cooling and water constraints in a semi-arid site; ramp-up periods of 1–2 years before reaching design output; Noor III suffered a reported prolonged outage linked to a problem in its salt storage system — similar to Crescent Dunes in the US, a reminder that hot-tank integrity is the tower's Achilles' heel.

**Noor Energy 1 (Dubai, DEWA — Mohammed bin Rashid Al Maktoum Solar Park, Phase 4)** — the world's largest single-site CSP project: **700 MW CSP** (a 100 MW molten-salt tower plus three 200 MW parabolic troughs) and **250 MW PV**, with about **15 h of storage**, developed by ACWA Power under a 35-year PPA with a widely reported tariff of **USD 7.3 cents/kWh**. It was delivered in stages through 2023. Lessons: hybridising PV (cheap daytime energy) with CSP (night-time energy from storage) is how CSP stays competitive; scale and a long PPA tenor pull the tariff down; construction of so many parallel units stretched EPC resources and the schedule.

Cross-fleet patterns (World Bank/ESMAP and SolarPACES reviews):

1. **Ramp-up** to design output takes 1–3 years; early-year yields of 60–85 % of P50 are common.
2. **DNI shortfall** relative to satellite-based design data is a frequent cause of underperformance in dusty regions.
3. **Storage tanks, receivers and steam generators** cause the longest outages.
4. **O&M cost** is high: CSP needs ~40–80 permanent staff for a 50–150 MW plant (vs <10 for a PV plant of similar size), including licensed thermal-plant operators.
5. **Mirror breakage** (wind, thermal stress) and receiver tube replacement are steady consumables.`,
        },
        { kind: "sources", refs: ["m03-masen-noor", "m03-dewa-mbr-park", "m03-nrel-solarpaces", "m03-world-bank-csp-mena"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "Check before quoting",
          md: md`Noor III's outage duration and cause, and Noor Energy 1's exact commissioning dates and storage hours, come from press reports and project databases rather than audited operating data. Re-check on the SolarPACES/NREL database and Masen/DEWA sites before using them in an official paper.`,
        },
        {
          kind: "md",
          md: md`## Dust and mirror cleaning

Kuwait's dust regime — shamal winds in early summer, frequent haze, occasional severe storms — attacks CSP in two ways: it lowers DNI (lesson 1) and it **soils mirrors**. Mirror soiling is typically 0.2–1 % reflectivity loss per day in dusty seasons, much more after a storm. Unlike PV, a mirror loses both the light absorbed by dust and the light scattered off-angle.

Cleaning methods:

- **High-pressure demineralised water** from truck-mounted sprayers driven along rows (most common for troughs) — ~0.2–0.5 L/m² per wash.
- **Brush-and-water** ("contact") cleaning: better for cemented dust (dew + dust), uses less water but risks scratching the silver mirror's coating.
- **Waterless/robotic** methods are mature for PV, less so for curved trough mirrors.

Water must be **demineralised** (minerals leave spots that cut reflectivity), so every litre is desalinated and polished. In Kuwait that is energy, cost and logistics. Cleaning frequency is an optimisation: more washes → higher average reflectivity → more MWh, but more water, trucks, fuel, labour and mirror wear. Dew is a hidden enemy: early-morning dew turns dust into a cemented crust that pressure washing alone may not remove.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Reading the numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "What capacity factor does '225,000 MWh a year' imply?",
          given: md`A source reports Shagaya Phase I target output of up to about 225,000 MWh/yr without saying clearly whether it covers only the 50 MW CSP or the full 70 MW (CSP + PV + wind).`,
          steps: [
            { md: md`**If CSP only:** $CF = 225{,}000 / (50 \times 8{,}760) = 0.514$, i.e. 51 %.` },
            { md: md`**If full 70 MW:** $CF = 225{,}000 / (70 \times 8{,}760) = 0.367$, i.e. 37 %.` },
            { md: md`**Sanity check, CSP only:** 51 % is at the top end for a 10 h trough even at excellent DNI sites (Spain's Andasol-class plants with 7.5 h achieve ~35–40 %). In a dusty site with dry cooling it looks optimistic.` },
            { md: md`**Sanity check, 70 MW:** wind at ~42–45 % (measured, see the wind module) gives ~37–40 GWh, PV at ~20 % gives ~17.5 GWh, leaving ~168 GWh for CSP → CF ~38 % — plausible for a 10 h trough.` },
          ],
          result: md`The **70 MW interpretation** is more plausible; the CSP-only reading implies ~51 % CF, which would be world-class. A PM should never repeat a headline output figure without establishing its scope, basis (P50? design? contract?) and whether it is gross or net.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Mirror washing water vs wet cooling water",
          given: md`Assume (illustrative, not Shagaya data) a 50 MW trough with 550,000 m² aperture, washed weekly at 0.3 L/m², and annual net generation of 150 GWh. Compare with the water a wet cooling tower would need at 3 m³/MWh.`,
          steps: [
            { md: md`Washes per year: 52.` },
            {
              md: md`Washing water: $550{,}000 \times 0.3 \times 52 / 1{,}000 = 8{,}580$ m³/yr.`,
              hidden: true,
              check: { prompt: "Annual mirror-washing water", answer: 8580, unit: "m³/yr", tolerance: { rel: 0.01 } },
            },
            {
              md: md`Wet cooling would need $150{,}000 \times 3 = 450{,}000$ m³/yr.`,
              hidden: true,
              check: { prompt: "Wet-cooling water use", answer: 450000, unit: "m³/yr", tolerance: { rel: 0.01 } },
            },
            { md: md`Ratio ≈ 52×. Dry cooling eliminates the dominant water use; mirror washing becomes the main (but manageable) consumer.` },
          ],
          result: md`Mirror washing at ~9,000 m³/yr is ~2 % of what wet cooling would use — the reason Shagaya and most desert CSP plants accept the dry-cooling efficiency penalty. Even so, ~9,000 m³ of demineralised water must be trucked or produced on site in a remote desert location.`,
        },
        {
          kind: "question",
          question: {
            id: "m03-l03-p1",
            type: "numeric",
            prompt: md`Mirror cleanliness falls linearly by 0.5 percentage points per day after each wash (back to 100 % when washed). What is the average cleanliness gain, in percentage points, from washing every 7 days instead of every 14 days?`,
            answer: 1.75,
            tolerance: { abs: 0.05 },
            unit: "pp",
            explanation: md`With linear decay the average loss over a cycle of $N$ days is half the end-of-cycle loss: 7 days → $0.5 \times 7/2 = 1.75$ pp (average 98.25 %); 14 days → $0.5 \times 14/2 = 3.5$ pp (96.5 %). Gain = **1.75 pp**. Because thermal losses are fixed, the electricity gain is larger than 1.75 % — roughly 2–2.5 %. On 150 GWh that is ~3–4 GWh/yr, which you then compare with the extra water, trucks and labour of 26 extra washes.`,
            concepts: ["m03.mirror-cleaning"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running and reviewing a CSP asset",
      blocks: [
        {
          kind: "md",
          md: md`## The O&M organisation

A 50 MW trough plant with storage is run like a small thermal power station plus a large outdoor optical system:

- **Operations**: shift supervisors and control-room operators (DCS) 24/7, since storage discharge runs into the night.
- **Solar field**: cleaning crews and trucks, mirror replacement, receiver replacement (IR drone surveys for hot tubes), drive and hydraulic maintenance, ball/rotation joint leak repair.
- **Thermal**: HTF quality and ullage, salt chemistry, heat tracing, pumps, steam generator, turbine, ACC.
- **Electrical & control**: generator, transformer, switchyard, DCS, field controllers.
- **Water treatment**: demineralisation plant for washing and boiler make-up.

Key KPIs: **availability** (time and energy based), **solar field optical efficiency trend** (from measured thermal output vs DNI), **mirror cleanliness** (portable reflectometer readings on sample mirrors), **broken mirror and hot-tube counts**, **parasitic consumption**, **storage round-trip efficiency**, **water use per MWh**, **forced outage rate**, **HSE indicators** (hot oil and salt hazards).

## If you inherit Shagaya CSP: a first 90-day plan

Because the operating record is not public, your first task is to establish facts.`,
        },
        {
          kind: "checklist",
          title: "PM checklist — first 90 days on an inherited CSP plant",
          items: [
            "Obtain the as-built design basis: aperture area, SM, storage MWh_th, guaranteed output, design DNI dataset",
            "Collect monthly operating data since COD: gross/net MWh, DNI measured on site, availability, outages, parasitics",
            "Compare actual energy against a model re-run with MEASURED DNI (separates resource shortfall from plant underperformance)",
            "Review O&M contract status after the 6-year design-build-operate period: who operates now, KPIs, spares, warranties",
            "Inspect tanks, foundations, heat-tracing records, receiver vacuum survey, mirror breakage statistics",
            "Review water use and cleaning logs against reflectivity measurements",
            "Identify spare parts with long lead times (receiver tubes, salt pumps, turbine parts) and obsolescence risk",
            "Document lessons learned for MEWRE/KISR and recommend publication of performance data",
          ],
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Typical traps when a pilot plant leaves its O&M contract",
          md: md`- Knowledge walks out with the contractor's staff; procedures and DCS passwords are not handed over cleanly.
- Spare parts strategy was the contractor's; the Employer inherits empty stores.
- OEM warranties have expired; obsolete control hardware is unsupported.
- No one owns the data historian, so years of operating data are lost.
Put handover deliverables (data, procedures, training, spares list) in the contract — and test them before the final payment.`,
        },
        {
          kind: "ask",
          title: "Ask the operator",
          items: [
            "What was net generation each year since 2019, and what was measured DNI for the same periods?",
            "What is the current average mirror cleanliness and how is it measured?",
            "How many receiver tubes have been replaced, and why?",
            "What were the three longest forced outages and their root causes?",
            "How much demineralised water did you use last year, and what is the cost per m³?",
            "What is the plant's output at 48 °C ambient compared with 25 °C?",
          ],
        },
        { kind: "scenario", scenario: "m03-s2" },
        {
          kind: "feynman",
          prompt: "Explain why measured DNI is essential to judge whether Shagaya CSP is 'underperforming'.",
          keyPoints: [
            "Energy depends on the resource actually received, not the design-year resource",
            "Re-run the yield model with measured DNI to get expected energy for the actual weather",
            "Gap between expected (measured-DNI) and actual energy = plant performance; gap between design and measured DNI = resource risk",
            "In Kuwait DNI is highly variable because of dust, so this separation is essential before assigning blame",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m03-l03-q1",
      type: "mcq",
      prompt: "Shagaya Phase I's CSP plant is:",
      options: [
        "A 100 MW molten-salt tower with 15 h storage",
        "A 50 MW parabolic trough with ~10 h molten-salt storage and dry cooling",
        "A 50 MW linear Fresnel plant with direct steam and no storage",
        "A 200 MW trough with 5 h storage",
      ],
      answer: 1,
      explanation: md`Per IEA and Reuters Events: 50 MW trough, ~10 h molten-salt TES, dry cooling. The 200 MW/5 h CSP was a later Phase 2 plan that was never procured.`,
      concepts: ["m03.shagaya-csp"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m03-l03-q2",
      type: "multi",
      prompt: "Which statements about Shagaya CSP are flagged as unverified in the research brief? (select all)",
      options: ["Post-2019 operating performance", "Current operating status", "That it uses a parabolic trough", "Full identity of EPC partners beyond TSK", "That it has molten-salt storage"],
      answer: [0, 1, 3],
      explanation: md`Trough technology and molten-salt storage are well sourced. Performance after 2019, current status and the full EPC consortium are not.`,
      concepts: ["m03.shagaya-csp"],
      difficulty: 1,
    },
    {
      id: "m03-l03-q3",
      type: "numeric",
      prompt: md`A 160 MW trough plant generates 370 GWh in a year. What is its capacity factor, in %?`,
      answer: 26.4,
      tolerance: { abs: 0.3 },
      unit: "%",
      explanation: md`$370{,}000 / (160 \times 8{,}760) = 0.264$ → 26.4 %. That is typical of a trough with ~3 h storage such as Noor I.`,
      concepts: ["m03.csp-lessons-learned"],
      difficulty: 1,
    },
    {
      id: "m03-l03-q4",
      type: "mcq",
      prompt: "Why must mirror-washing water be demineralised?",
      options: ["To avoid freezing", "Dissolved minerals leave spots that reduce reflectivity and damage coatings", "Regulations require potable water", "It is cheaper"],
      answer: 1,
      explanation: md`Mineral residues scatter light and can etch protective coatings. Every litre therefore passes through a demineralisation plant — significant in a water-scarce desert.`,
      concepts: ["m03.mirror-cleaning"],
      difficulty: 1,
    },
    {
      id: "m03-l03-q5",
      type: "decision",
      prompt: "Your CSP plant produced 22 % less energy than the design P50 last year. The O&M contractor blames dust. What is your first analytical step?",
      options: [
        { text: "Apply the O&M performance LDs immediately", score: 0.2, feedback: "Premature. If the resource was poor, LDs may not be due, and you'll lose a dispute." },
        { text: "Re-run the performance model with measured site DNI and ambient temperature to split resource vs plant performance", score: 1, feedback: "Correct. This is the standard weather-corrected performance approach." },
        { text: "Accept the explanation — Kuwait is dusty", score: 0, feedback: "Dust is real but must be quantified; it may explain all, part or none of the gap." },
        { text: "Order a full mirror replacement", score: 0, feedback: "An expensive action without a diagnosis." },
      ],
      explanation: md`Weather-corrected (expected) energy using measured DNI is the baseline for judging plant performance. The remaining gap is attributable to availability, optical, thermal or parasitic issues.`,
      concepts: ["m03.dni-resource-risk", "m03.csp-om"],
      difficulty: 2,
    },
    {
      id: "m03-l03-q6",
      type: "mcq",
      prompt: "Noor Energy 1 (DEWA) combines:",
      options: [
        "700 MW CSP (100 MW tower + 600 MW trough) with 250 MW PV",
        "950 MW tower only",
        "500 MW Fresnel with 450 MW PV",
        "200 MW trough with 5 h storage",
      ],
      answer: 0,
      explanation: md`Noor Energy 1 is a 950 MW hybrid: one 100 MW tower, three 200 MW troughs and 250 MW PV, with ~15 h storage — hybridisation is how modern CSP stays competitive.`,
      concepts: ["m03.csp-lessons-learned"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m03-l03-f1", front: "Shagaya Phase I configuration", back: "70 MW: 50 MW CSP trough (~10 h TES) + 10 MW PV + 10 MW wind.", concepts: ["m03.shagaya-csp"] },
    { id: "m03-l03-f2", front: "Shagaya CSP COD (approx.)", back: "Commissioned late 2018; full/commercial operation ~Feb 2019 (sources differ).", concepts: ["m03.shagaya-csp"] },
    { id: "m03-l03-f3", front: "Shagaya CSP contractor (reported)", back: "TSK (approved by KISR 2015); 6-year design-build-operate periods.", concepts: ["m03.shagaya-csp"] },
    { id: "m03-l03-f4", front: "Noor Ouarzazate CSP units", back: "Noor I 160 MW trough ~3 h; Noor II 200 MW trough ~7 h; Noor III 150 MW tower ~7 h.", concepts: ["m03.csp-lessons-learned"] },
    { id: "m03-l03-f5", front: "Noor Energy 1 reported tariff", back: "≈USD 7.3 cents/kWh (35-year PPA, ~15 h storage).", concepts: ["m03.csp-lessons-learned"] },
    { id: "m03-l03-f6", front: "Typical mirror wash water", back: "≈0.2–0.5 L/m² per wash, demineralised.", concepts: ["m03.mirror-cleaning"] },
    { id: "m03-l03-f7", front: "Weather-corrected performance", back: "Compare actual energy with model output using MEASURED DNI/temperature — isolates plant performance from resource.", concepts: ["m03.dni-resource-risk"] },
    { id: "m03-l03-f8", front: "Typical CSP ramp-up", back: "1–3 years to reach design output; early yields 60–85 % of P50 are common.", concepts: ["m03.csp-lessons-learned"] },
  ],
  scenarios: [
    {
      id: "m03-s2",
      title: "The Minister's question: refurbish or retire Shagaya CSP?",
      dayInLife: true,
      context: md`The Undersecretary's office asks you, as PM for the Shagaya park, for a two-page note by Thursday: "Is the CSP plant worth keeping? Should we refurbish it or focus on PV and batteries?" You have no consolidated operating data; KISR holds some records.`,
      start: "a",
      nodes: {
        a: {
          md: md`How do you approach the note?`,
          choices: [
            { text: "Write a recommendation to retire it based on global LCOE trends", next: "b", score: 3, feedback: "LCOE trends matter, but the decision is about an existing asset: sunk capex is irrelevant and remaining-life economics differ completely from new-build." },
            { text: "Ask KISR for operating data now, frame the note as a decision on remaining-life economics, and state clearly what is unknown", next: "c", score: 9, feedback: "Right framing: forward-looking costs vs benefits of the existing asset, with transparent data gaps." },
            { text: "Ask for a six-month study before answering", next: "b", score: 4, feedback: "Senior officials need an answer now, even a provisional one. Give a first view plus a plan to firm it up." },
          ],
        },
        b: {
          md: md`The Undersecretary's adviser replies: "We need to know whether to budget for refurbishment next fiscal year. What are the forward costs and what do we get?"`,
          choices: [
            { text: "Reframe: compare forward O&M + refurbishment cost against the value of evening energy, data value and alternatives; flag data gaps", score: 7, feedback: "Recovered — the decision is forward-looking." },
            { text: "Repeat that new PV is cheaper", score: 2, feedback: "Not the question. An existing asset's marginal cost may be competitive." },
          ],
        },
        c: {
          md: md`KISR shares partial data: availability fell in the last two years and several receiver tubes and a salt pump need replacement. The original O&M period has ended.`,
          choices: [
            { text: "Recommend a short independent technical due diligence (OE), a bridging O&M contract, and a decision gate in 6 months with costed options", score: 10, feedback: "Excellent: protects the asset, buys facts, sets a decision gate." },
            { text: "Recommend immediate full refurbishment to restore design output", score: 5, feedback: "May be right, but commits budget before the condition and economics are known." },
            { text: "Recommend mothballing immediately", score: 3, feedback: "Mothballing a salt plant is not trivial — salt must be drained or kept molten — and it destroys option value without analysis." },
          ],
        },
      },
      concepts: ["m03.shagaya-csp", "m03.csp-om"],
    },
  ],
};

export default lesson;
