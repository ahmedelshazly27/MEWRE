import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m00-l01",
  title: "Kuwait's Power System: Demand, Capacity, Fuel and Outages",
  summary:
    "How a 17.5 GW air-conditioning-driven summer peak meets a ~21 GW installed but ~17 GW reliably available fleet burning gas, LNG and liquid fuels — and why the 2024–25 load-shedding made renewables and storage a reliability issue, not only a climate one.",
  minutes: 75,
  objectives: [
    "You can state Kuwait's recent peak loads (2023–2026), name the measurement-basis conflict between MEWRE and MEES figures, and explain why it matters in a briefing.",
    "You can distinguish installed, available and dependable capacity and compute a reserve margin, with and without GCCIA imports.",
    "You can convert heat rate to efficiency and estimate fuel burn (GJ, barrels, MMBtu) for a given generation profile.",
    "You can explain the causes of the June 2024, August 2024, April 2025 and May 2025 power cuts and what each implies for renewable project design and scheduling.",
  ],
  concepts: [
    { id: "m00.peak-demand", name: "Kuwait summer peak demand", description: "Air-conditioning-driven afternoon peak of roughly 17.5–17.7 GW in July–August, growing by about 1 GW of new connections a year.", competency: "context", related: ["m00.reserve-margin", "m01.load-curve-kuwait", "m01.load-factor-diversity"] },
    { id: "m00.available-capacity", name: "Installed vs available capacity", description: "Nameplate (~21 GW) minus forced/planned outages and high-temperature derating gives reliably available capacity (~17 GW) at peak.", competency: "context", related: ["m00.reserve-margin", "m01.capacity-factor", "m01.transformer-derating"] },
    { id: "m00.reserve-margin", name: "Reserve margin", description: "(Available capacity − peak demand) / peak demand; negative in Kuwait's 2025 peak months, hence load-shedding.", competency: "engineering", related: ["m01.frequency-balance"] },
    { id: "m00.fuel-mix-heat-rate", name: "Fuel mix and heat rate", description: "Kuwait generates mainly from gas (domestic + LNG) and liquid fuels (crude, fuel oil, gasoil); heat rate converts energy to fuel burned.", competency: "engineering", related: ["m00.available-capacity", "m01.heat-rate", "m01.lhv-hhv"] },
    { id: "m00.load-shedding-imports", name: "Load-shedding and GCCIA imports", description: "Programmed rotating cuts and short-term imports via the GCC Interconnection Authority are the emergency levers when the reserve margin goes negative.", competency: "context", related: ["m00.reserve-margin", "m00.peak-demand"] },
  ],
  sections: [
    // ------------------------------------------------------------------ THEORY
    {
      layer: "theory",
      title: "Anatomy of a desert summer peak",
      blocks: [
        {
          kind: "md",
          md: md`Kuwait's electricity system is dominated by one load: **air conditioning**. On a July afternoon with 48–50 °C ambient (the national record is **53.9 °C at Mitribah, 21 July 2016**, WMO-verified), cooling can be well over half the national load. The consequence for you as a PM is simple and brutal: the system's worst hour is the hottest hour, and the hottest hour is exactly when every thermal plant, transformer, cable and inverter is derated.

Recent peaks, as reported:

| Period | Peak | Basis / source |
|---|---|---|
| Aug 2023 | 16.94 GW (then all-time high) | MEES |
| 19 Jun 2024 | 16.81 GW (June record) | MEES |
| Summer 2024 | 17,640 MW | MEWRE via Kuwait Times |
| May 2025 | 16.58 GW (May record) | MEES |
| Jun 2025 | 16.98 GW (June record, +5.5% y/y) vs **16.275 GW available** | MEES |
| Jul 2025 | **17.71 GW** record | MEES |
| Summer 2025 | 17,610 MW | MEWRE via Kuwait Times |
| Summer 2026 | **17,540 MW** (−70 MW, second year of decline per the minister) | MEWRE via Kuwait Times |

Two things jump out. First, peak growth has flattened at the top even though **new connections added 1,059 MW (2024→25) and 1,019 MW (2025→26)** of load: demand-side measures (one hour shorter government working day, factory operations suspended at peak) and cooler-than-record days are holding the line. Second, **the ministry's and MEES's 2025 figures disagree** (17,610 MW vs 17.71 GW). Different measurement bases — net vs gross (station auxiliaries included or not), instantaneous vs integrated (e.g. 15-minute or hourly average) — easily explain 100 MW. That gap is about the size of Kuwait's entire installed solar fleet at end-2024 (about 102 MW per MEWRE).`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Always state the basis",
          md: md`When you put a peak figure in a cabinet memo or a KAPP briefing, write it as "17,540 MW (MEWRE, summer 2026, ministry basis)". Mixing a MEES monthly record with a ministry seasonal figure in the same table is the fastest way to lose credibility with the Undersecretary's office — and to build a reserve-margin argument on sand.`,
        },
        { kind: "sources", refs: ["m00-mees-2024-06-crisis", "m00-kt-2026-peak", "m00-mees-2025-09-august", "m00-mees-2025-06-capacity", "m00-mees-2025-05-fragility", "m00-zawya-2025-14gw", "m00-theenergyyear-2025", "m00-wmo-2019"] },
        { kind: "widget", widget: "load-curve", props: { season: "summer", pvMW: 1100 }, caption: "Indicative Kuwait summer vs winter daily load with a 1.1 GW PV overlay. Note how PV output covers the early afternoon but not the evening shoulder after sunset — that gap is the case for BESS." },
        {
          kind: "md",
          md: md`### Load factor: how "peaky" the system is

The **load factor** compares the energy actually consumed to the energy that would be consumed if the peak lasted all year:`,
        },
        { kind: "equation", formula: "m00-load-factor" },
        {
          kind: "md",
          md: md`A summer-peaking cooling system has a low load factor, typically 0.5–0.6: winter demand is perhaps half the summer peak. A low load factor means a lot of capacity is built to run only a few hundred hours a year — expensive capacity that a well-placed solar + storage plant can partly displace. (RESEARCH.md does not give an official annual consumption figure; in this module we use an **illustrative 84 TWh/yr**, i.e. a load factor of about 0.55 on a 17.5 GW peak. Replace it with the ministry statistical yearbook figure before using it in any official document.)`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Annual consumption figure",
          md: md`**Claimed/used here:** about 84 TWh/yr total generation (illustrative, derived from a 0.55 load factor). **Unknown:** the official latest annual generation and consumption. **How to verify:** MEWRE's annual statistical yearbook (Electrical Energy) on mew.gov.kw, or ask the ministry's statistics/planning department for the latest edition.`,
        },
        {
          kind: "md",
          md: md`## Installed, available and dependable capacity

Rystad (via Invezz, September 2025) puts Kuwait's **installed** capacity at about **21 GW**, of which only about **17 GW is reliably available at peak**, and about 14 GW is gas-fired. The difference — around 4 GW, roughly a fifth of the fleet — comes from three mechanisms:

1. **Forced outages** — trips such as the 300 MW Az-Zour South steam turbine on 19 June 2024. Old steam units with high forced-outage rates dominate this term.
2. **Planned maintenance** — the maintenance season is squeezed between winter and the early heat. In April 2025 an early heat spike hit while units were still in maintenance, forcing cuts in more than 60 areas.
3. **Temperature derating** — a gas turbine loses roughly 0.5–0.7% of output per °C above its 15 °C ISO rating (generic engineering value; check OEM curves). At 50 °C that is 17–25% of nameplate. Steam condensers and air-cooled systems lose output too.

We formalise this as:`,
        },
        { kind: "equation", formula: "m00-available-capacity" },
        { kind: "md", md: md`and the system's health indicator, the **reserve margin**:` },
        { kind: "equation", formula: "m00-reserve-margin" },
        {
          kind: "md",
          md: md`Utilities in hot climates typically plan for a positive reserve margin of 10–20% on **available** capacity to cover the largest single contingency (loss of the biggest unit or interconnector) plus forecast error. Kuwait in June 2025 had $RM = (16.275 - 16.98)/16.98 \approx -4.2\%$ — a structural deficit, not bad luck. Rystad estimated **shortfalls above 1.5 GW** at the May 2025 peak.

The response is the **14.05 GW** of new generation the minister said Kuwait will add by 2031 (including the gas-fired Az-Zour North 2&3 IWPP), plus renewables, plus storage. But new thermal plants take 4–6 years; this is why every month of delay on a renewable or BESS project is visible at ministerial level.`,
        },
        { kind: "sources", refs: ["m00-invezz-2025-09-rystad", "m00-agbi-2025-04-cuts", "m00-agbi-2025-09-14gw", "m00-zawya-2025-14gw"] },
        {
          kind: "callout",
          tone: "why",
          title: "Why renewables are a reliability issue here",
          md: md`In most countries solar is sold as decarbonisation. In Kuwait it is first a **capacity** argument: PV output is high from late morning to mid-afternoon, which overlaps the ministry's 11:00–17:00 demand-reduction window used in May 2025. But PV's contribution at the exact peak hour is less than nameplate (high cell temperatures, sun angle, dust), and it is zero after sunset when residential cooling is still high. That is why the ministry paired the PV ramp with a planned **1–1.5 GW / 4–6 GWh BESS** (announced November 2025). The PM must always ask: "how many MW does this project firmly deliver at the peak hour?", not "how many MWp is it?".`,
        },
        { kind: "sources", refs: ["m00-mees-2025-05-fragility", "m00-agbi-2025-11-bess"] },
        {
          kind: "md",
          md: md`## Fuel: what the fleet burns and how to estimate it

Third-party data (Ember via Inzonex) put Kuwait's generation mix at about **62% gas, 36% oil, ~2% renewables**; the Baker Institute says more than 99% is fossil, including crude and refined products. Kuwait's own gas production is mostly associated gas from oil fields, so in summer the shortfall is filled with **imported LNG** and **liquid fuels** (fuel oil, gasoil and crude burned directly). LNG imports were **5.2 Mt in January–August 2025** vs 4.9 Mt a year earlier (Argus/Vortexa), under Qatar contracts of 3 Mt/yr from 2022 plus another 3 Mt/yr from 2025, each for 15 years. Gas supply problems were blamed for the August 2024 rolling blackouts.

The engineering link between energy and fuel is the **heat rate** (fuel energy in per unit electricity out):`,
        },
        { kind: "equation", formula: "m00-heat-rate-efficiency" },
        { kind: "equation", formula: "m00-fuel-burn" },
        {
          kind: "md",
          md: md`Typical values (generic, LHV basis): old steam units burning heavy fuel oil 10–11.5 MJ/kWh (31–36% efficient); open-cycle gas turbines 10–12 MJ/kWh, worse at 50 °C; modern combined-cycle 6.3–7.5 MJ/kWh (48–57%). One barrel of crude contains about **6.1 GJ** (5.8 MMBtu); 1 MMBtu = 1.055 GJ.

The marginal summer kWh in Kuwait comes from the worst units burning the most expensive fuel. That is the energy a solar plant displaces, which is why the economics in lesson 3 are so favourable.`,
        },
        { kind: "sources", refs: ["m00-inzonex-atlas", "m00-baker-tariff", "m00-argus-2025-09-oilburn", "m00-cyprus-2024-lng", "m00-agbi-2024-08-fuel", "m00-iea-electricity"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "Liquid fuel burn in barrels per day",
          md: md`**Claimed:** Argus expected liquids burn for power to fall to its lowest in more than 20 years as gas output rises. **Unknown:** no official barrels-per-day figure for crude/fuel-oil/gasoil burn in power stations was found, nor current plant heat rates. **How to verify:** request MEWRE fuel-consumption statistics (statistical yearbook) and KPC/KNPC fuel supply data; compare with JODI-Oil "direct crude burn" data.`,
        },
        {
          kind: "md",
          md: md`## When the margin goes negative: cuts and imports

| Event | What happened | Lesson for a renewables PM |
|---|---|---|
| **19 Jun 2024** | 300 MW Az-Zour South steam turbine tripped at a 16.81 GW June record; scheduled cuts of up to 2 h/day, 40+ residential areas | A single unit trip is larger than the whole RE fleet; reliability is the political frame |
| **Aug 2024** | Rolling cuts after a gas-supply disruption | Fuel security matters as much as MW; every solar MWh saves imported fuel |
| **Apr 2025** | Early heat spike while units in maintenance; 60+ areas cut | Maintenance windows are shrinking; commissioning outages on the grid side must avoid Apr–Oct |
| **May 2025** | Cuts at a 16.58 GW peak; programmed 1–2 h cuts; public asked to cut use 11:00–17:00; >1.5 GW shortfall | Solar's generation window aligns with the stress window |

The short-term lever is **imports through the GCC Interconnection Authority (GCCIA)**: in May 2024 MEW signed a **500 MW** deal (350 MW from Oman, 200 MW from Qatar as reported), mainly for June. For 2025 the **State Audit Bureau gave conditional approval for GCCIA purchases of KWD 161.381 m for June–December** (about KWD 169.1 m for April–December). Note who approved it: the Audit Bureau — even emergency power purchases go through prior review (lesson 2).`,
        },
        { kind: "sources", refs: ["m00-mees-2024-06-crisis", "m00-bnn-2024-06-cuts", "m00-kt-2024-06-cuts", "m00-agbi-2024-08-fuel", "m00-agbi-2025-04-cuts", "m00-mees-2025-05-fragility", "m00-mees-2024-05-gccia", "m00-powerline-2025-07-gccia"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "Open items on outages and interconnection",
          md: md`**Summer 2026 load-shedding:** no reports were found — absence of evidence, not evidence of absence; check KUNA and Kuwait Times archives for June–August 2026. **Al-Wafra 400 kV substation / Saudi link:** a 2024 report expected it in service by December 2024; no commissioning confirmation found — ask MEWRE Transmission. **Oman 350 MW + Qatar 200 MW = 550 MW** exceeds the 500 MW headline: the split as reported may be a maximum offer, not simultaneous delivery; check the GCCIA contract.`,
        },
      ],
    },
    // ------------------------------------------------------------------ APPLIED
    {
      layer: "applied",
      title: "Reserve margins, outage rates and fuel burn with real Kuwait numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "June 2025: how negative was the margin, and what did 500 MW of imports buy?",
          given: md`MEES, June 2025: peak load $P_{\text{peak}} = 16.98$ GW, available capacity $C_{\text{avail}} = 16.275$ GW. Assume a GCCIA import of 500 MW were fully deliverable at the peak hour (as under the 2024 contract).`,
          steps: [
            { md: md`Deficit at peak: $16.98 - 16.275 = 0.705$ GW, i.e. **705 MW** must be shed or imported.` },
            { md: md`Reserve margin without imports: $RM = \dfrac{16.275 - 16.98}{16.98} = -0.0415 = -4.15\%$.` },
            { md: md`With 500 MW imports: $C_{\text{avail}} = 16.775$ GW, so $RM = \dfrac{16.775 - 16.98}{16.98} = -1.21\%$. Still negative: about **205 MW** short, before any contingency.` },
            { md: md`To reach a planning margin of +10% you would need $1.10 \times 16.98 = 18.68$ GW available — about **2.4 GW** more than June 2025's available fleet.` },
          ],
          result: md`Imports cut the deficit from 705 MW to about 205 MW but do not restore a positive margin. The structural gap (~2.4 GW to a 10% margin) is of the order of the whole Shagaya Phase III Zone 1 + Zone 2 PV programme in nameplate — and PV's firm peak contribution is less than nameplate. This is the arithmetic behind the BESS announcement and the 14.05 GW build plan.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Inferring the effective outage-and-derate fraction",
          given: md`Rystad: installed $C_{\text{inst}} \approx 21$ GW, reliably available $\approx 17$ GW. The ministry's summer 2026 peak was 17,540 MW. Treat all losses (forced, planned, temperature) as one combined fraction $f$.`,
          steps: [
            { md: md`From $C_{\text{avail}} = C_{\text{inst}}(1-f)$: $f = 1 - 17/21$.` },
            {
              md: md`$f = 1 - 0.8095 = 0.1905$, i.e. about **19%** of nameplate is unavailable at peak.`,
              hidden: true,
              check: { prompt: "Combined unavailability fraction f (as a decimal)", answer: 0.1905, tolerance: { abs: 0.005 } },
            },
            {
              md: md`Available capacity needed for a 15% margin on 17.54 GW: $1.15 \times 17.54 = 20.17$ GW, i.e. **3.17 GW** above today's ~17 GW.`,
              hidden: true,
              check: { prompt: "Available capacity needed for a 15% reserve margin", answer: 20.17, unit: "GW", tolerance: { rel: 0.01 } },
            },
            { md: md`At $f = 0.19$, each new GW of thermal nameplate adds only ~0.81 GW of available capacity, so the nameplate needed is $3.17/0.81 \approx 3.9$ GW — unless the new plant is more reliable (new CCGTs are) or old units are retired.` },
          ],
          result: md`About one-fifth of Kuwait's fleet is effectively unavailable at peak, and a 15% margin needs roughly 3.2 GW more available capacity — consistent with the urgency of AZN 2&3, Al-Khairan, Nuwaiseeb, Shagaya Phase III and BESS.`,
        },
        {
          kind: "question",
          question: {
            id: "m00-l01-p1",
            type: "numeric",
            prompt: md`A 1,000 MW block of old steam units burning crude runs flat out for 24 hours on a peak day at a heat rate of 10.5 MJ/kWh. Taking 6.12 GJ per barrel, how many **barrels** of crude does it burn that day? (Round to the nearest hundred.)`,
            answer: 41176,
            tolerance: { rel: 0.01 },
            unit: "bbl",
            explanation: md`Energy: $E = 1{,}000\ \text{MW} \times 24\ \text{h} = 24{,}000\ \text{MWh} = 24 \times 10^6$ kWh. Fuel energy: $Q = E \cdot HR = 24\times10^6 \times 10.5\ \text{MJ} = 252\times10^6$ MJ $= 252{,}000$ GJ. Barrels: $252{,}000 / 6.12 \approx 41{,}200$ bbl/day. At, say, USD 70/bbl that is about **USD 2.9 m per day** of crude that could otherwise be exported — the opportunity cost a solar plant attacks.`,
            concepts: ["m00.fuel-mix-heat-rate"],
            difficulty: 2,
          },
        },
        { kind: "widget", widget: "capacity-factor", props: { mw: 1100 }, caption: "Compare the capacity factors of PV, wind, CSP and gas — then ask what fraction of nameplate each delivers at 15:00 on an August day." },
      ],
    },
    // ------------------------------------------------------------------ FIELD
    {
      layer: "field",
      title: "Using system data as a MEWRE project manager",
      blocks: [
        {
          kind: "md",
          md: md`As a renewables PM you will not dispatch the grid, but you will constantly **use system data to justify, schedule and defend** your projects:

- **Business cases and cabinet memos** quote peak, reserve margin and fuel savings. The Minister's office and the Council of Ministers respond to "this plant reduces the summer shortfall by X MW and saves Y barrels", not to "Z MWp".
- **Commissioning schedules** depend on the grid. Transmission outages to tie in a 400 kV bay are almost impossible between April and October; the April 2025 cuts show the maintenance window is shrinking. Plan energisation and grid-side works for November–March.
- **Grid capacity at the point of connection** (e.g. the Shagaya–Al-Wafra 400 kV line awarded in March 2026) decides when your IPP can export. A late line strands a plant and can create deemed-energy liability for the offtaker (module m09).
- **Performance claims** in the summer: PV plant output at 50 °C, with dust, is what the control centre sees. If your plant underperforms on the peak day, operators remember.

Who holds the data: MEWRE's generation, transmission and control/dispatch functions, and its planning and statistics units; KISR for solar/climate measurements; MEES, Argus and Rystad publish third-party analyses. Build relationships with the dispatch engineers early — they will be your allies during energisation.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`1. **Nameplate thinking** — quoting MWp instead of MWac or firm MW at peak. 2. **Mixing bases** — ministry seasonal peak vs press monthly record. 3. **Ignoring derating** — assuming inverters, transformers and cables deliver full rating at 50 °C. 4. **Scheduling grid outages in summer** — the request will be refused and you lose months. 5. **Assuming imports are a solution** — GCCIA imports needed Audit Bureau approval and are limited in size and season.`,
        },
        {
          kind: "checklist",
          title: "PM checks when you use system figures",
          items: [
            "Every peak figure is labelled with source, date and basis (ministry vs press; net vs gross).",
            "Reserve-margin calculations use available, not installed, capacity.",
            "Plant contribution at peak is stated in MWac at the 15:00–16:00 August hour, with temperature derating.",
            "Grid-side outages and energisation are scheduled November–March unless the control centre confirms otherwise in writing.",
            "Fuel-saving claims state the assumed marginal plant heat rate and fuel price.",
            "Any figure marked unverified in this module is re-checked against mew.gov.kw, KUNA or the gazette before it goes into an official memo.",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask (developer, OE, MEWRE transmission)",
          items: [
            "What is the plant's guaranteed export capability in MWac at 50 °C ambient and 1,000 W/m², at the point of connection?",
            "What is the expected output profile on a typical August day, hour by hour, and what fraction of nameplate is available at 16:00?",
            "Which grid outages do you need for tie-in, how long, and have they been agreed with the MEWRE control centre?",
            "What happens to export if the 400 kV line or substation is late — who bears the deemed-energy risk under the PPA?",
            "What derating curves have you assumed for inverters, transformers and cables, and do the OEM datasheets support them?",
          ],
        },
        { kind: "scenario", scenario: "m00-s1" },
        {
          kind: "feynman",
          prompt: "Explain to a newly appointed ministry advisor (non-engineer) why Kuwait had power cuts in 2024–25 despite having about 21 GW of installed capacity and a peak of about 17.5 GW.",
          keyPoints: [
            "Installed ≠ available: forced outages, maintenance and high-temperature derating remove ~4 GW (about 19%) at peak.",
            "Peak demand is driven by air conditioning on the hottest afternoons, exactly when plants are derated.",
            "June 2025 available capacity (16.275 GW) was below the 16.98 GW peak: a negative reserve margin.",
            "Fuel supply problems (gas) and unit trips (300 MW Az-Zour South) tipped the system into rotating cuts.",
            "Imports via GCCIA (~500 MW) help but are limited and need Audit Bureau approval; new generation, renewables and BESS are the structural fix.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m00-l01-q1",
      type: "mcq",
      prompt: md`Rystad estimates Kuwait's installed capacity at ~21 GW. Approximately how much is **reliably available** at peak?`,
      options: ["About 21 GW", "About 19 GW", "About 17 GW", "About 14 GW"],
      answer: 2,
      explanation: md`About **17 GW** (Rystad via Invezz, Sept 2025). The ~4 GW gap comes from forced outages, planned maintenance and temperature derating. 14 GW is the gas-fired portion of the fleet, not available capacity.`,
      concepts: ["m00.available-capacity"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m00-l01-q2",
      type: "numeric",
      prompt: md`July 2025 (MEES): peak 17.71 GW. If reliably available capacity was 17.0 GW, what was the reserve margin in **percent**? (Negative if a deficit.)`,
      answer: -4.01,
      tolerance: { abs: 0.1 },
      unit: "%",
      explanation: md`$RM = (17.0 - 17.71)/17.71 = -0.0401 = -4.0\%$. A negative margin means demand cannot be met without imports, demand reduction or load-shedding.`,
      concepts: ["m00.reserve-margin"],
      difficulty: 2,
    },
    {
      id: "m00-l01-q3",
      type: "multi",
      prompt: md`Which of these were reported causes or triggers of Kuwait's 2024–25 power cuts? (Select all that apply.)`,
      options: [
        "A 300 MW steam turbine trip at Az-Zour South (June 2024)",
        "A gas supply disruption (August 2024)",
        "An early heat spike while units were in maintenance (April 2025)",
        "Curtailment of Shagaya solar output due to grid congestion",
        "Demand at record levels with available capacity below peak (May–June 2025)",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`All except the Shagaya option. Kuwait's renewable fleet (~100 MW) is far too small to matter for the cuts; the cuts came from unit trips, fuel supply and capacity shortfall at record demand.`,
      concepts: ["m00.load-shedding-imports"],
      difficulty: 1,
    },
    {
      id: "m00-l01-q4",
      type: "mcq",
      prompt: md`MEWRE reports a 2025 summer peak of 17,610 MW; MEES reports a July 2025 record of 17.71 GW. What is the best way to treat this in a memo?`,
      options: [
        "Use the higher figure because it is more conservative",
        "Average them",
        "Use the ministry figure as the official basis, footnote the MEES figure and explain the likely basis difference",
        "Drop both and use the 2024 figure",
      ],
      answer: 2,
      explanation: md`Internal memos should use the **official ministry basis** for consistency with other ministry documents, while acknowledging the press figure. The ~100 MW gap probably reflects net vs gross or instantaneous vs integrated measurement — and 100 MW is the whole solar fleet of end-2024.`,
      concepts: ["m00.peak-demand"],
      difficulty: 2,
    },
    {
      id: "m00-l01-q5",
      type: "numeric",
      prompt: md`A combined-cycle unit has a heat rate of 7,500 kJ/kWh. What is its efficiency in percent?`,
      answer: 48,
      tolerance: { abs: 0.5 },
      unit: "%",
      explanation: md`$\eta = 3600/HR = 3600/7500 = 0.48 = 48\%$. 1 kWh = 3,600 kJ, so the heat rate is just the reciprocal of efficiency scaled by 3,600.`,
      concepts: ["m00.fuel-mix-heat-rate"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m00-l01-q6",
      type: "decision",
      prompt: md`You are the PM for a PV IPP. The developer proposes energising the 400 kV connection in mid-July "to hit the COD date". What do you do?`,
      options: [
        { text: "Approve: COD is contractual and the developer bears the risk.", score: 0.1, feedback: "The grid outage is on the ministry's side; a July tie-in outage will very likely be refused by the control centre, and if granted risks contributing to load-shedding. The ministry, not only the developer, bears the reputational and possibly the deemed-energy risk." },
        { text: "Ask the developer to resequence: complete plant-side tests, request the tie-in outage from the control centre for the earliest feasible window (typically after the peak season), and record the schedule impact and responsibility formally.", score: 1, feedback: "Correct. Grid outages in peak season are a system-security issue. Coordinate formally with the control centre, document the cause of any COD shift (who caused it determines deemed-energy and LD exposure), and look for parts of commissioning that can proceed without the outage." },
        { text: "Escalate to the Minister's office to force the outage.", score: 0.2, feedback: "Escalating a request that endangers supply during the peak will damage your credibility. Use the technical channel first and present options." },
        { text: "Tell the developer to energise without an outage using live-line work.", score: 0, feedback: "A 400 kV bay tie-in is not a casual live-line job; this is an HSE and system-security violation." },
      ],
      explanation: md`Summer grid outages in Kuwait collide with a negative reserve margin. The professional move is resequencing plus formal documentation of responsibility for the delay — which matters later under the PPA's grid-delay provisions.`,
      concepts: ["m00.reserve-margin", "m00.peak-demand"],
      difficulty: 2,
    },
    {
      id: "m00-l01-q7",
      type: "short",
      prompt: md`In 3–4 sentences, explain why a 1,100 MWac PV plant does not add 1,100 MW of firm capacity at Kuwait's peak hour, and what would.`,
      rubric: [
        "PV output at the peak hour (late afternoon, 48–50 °C) is below nameplate because of temperature losses, sun angle and soiling.",
        "Evening/after-sunset peak demand gets zero PV.",
        "Firm contribution should be stated in MWac at the peak hour, not MWp.",
        "BESS (or other dispatchable capacity) firms up PV output into the evening.",
      ],
      modelAnswer: "Kuwait's peak occurs on hot afternoons when module temperatures exceed 70 °C, the sun is lower and dust has accumulated, so a 1,100 MWac plant may deliver noticeably less than 1,100 MW at the peak hour, and nothing after sunset when cooling load remains high. Its firm contribution must be quoted as MWac delivered at the peak hour, typically a fraction of nameplate. Pairing PV with BESS — like the planned 1–1.5 GW / 4–6 GWh system — shifts midday energy into the evening and raises firm capacity.",
      explanation: md`Nameplate is not firm capacity. At the peak hour PV output is cut by high cell temperatures (roughly −0.3 to −0.4%/°C on power), a lower sun angle and soiling, and after sunset it is zero. A PM should always quote "MWac deliverable at the peak hour". Storage, or another dispatchable resource, turns midday solar energy into evening capacity.`,
      concepts: ["m00.available-capacity", "m00.peak-demand"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m00-l01-f1", front: "Kuwait summer peak 2026 (MEWRE basis)", back: "17,540 MW — down 70 MW, the second year of decline per the minister (2024: 17,640; 2025: 17,610).", concepts: ["m00.peak-demand"] },
    { id: "m00-l01-f2", front: "Highest reported monthly peak (MEES)", back: "17.71 GW in July 2025 — conflicts with ministry 17,610 MW; different measurement bases.", concepts: ["m00.peak-demand"] },
    { id: "m00-l01-f3", front: "Installed vs reliably available capacity (Rystad 2025)", back: "~21 GW installed, ~17 GW reliably available at peak, ~14 GW gas-fired.", concepts: ["m00.available-capacity"] },
    { id: "m00-l01-f4", front: "Reserve margin formula", back: md`$RM = (C_{\text{avail}} - P_{\text{peak}})/P_{\text{peak}}$ — use available, not installed, capacity.`, concepts: ["m00.reserve-margin"] },
    { id: "m00-l01-f5", front: "June 2025 peak vs available capacity", back: "16.98 GW peak vs 16.275 GW available (MEES): −705 MW, RM ≈ −4.2%.", concepts: ["m00.reserve-margin"] },
    { id: "m00-l01-f6", front: "Heat rate → efficiency", back: md`$\eta = 3600 / HR$ with HR in kJ/kWh. 10,500 kJ/kWh ≈ 34%; 7,500 ≈ 48%.`, concepts: ["m00.fuel-mix-heat-rate"] },
    { id: "m00-l01-f7", front: "Kuwait generation mix (Ember via Inzonex)", back: "~62% gas, ~36% oil (crude, fuel oil, gasoil), ~2% renewables. Medium-low confidence source.", concepts: ["m00.fuel-mix-heat-rate"] },
    { id: "m00-l01-f8", front: "GCCIA imports 2024 and 2025", back: "May 2024: 500 MW deal (Oman/Qatar), mainly June. 2025: Audit Bureau conditional approval KWD 161.381 m for Jun–Dec.", concepts: ["m00.load-shedding-imports"] },
    { id: "m00-l01-f9", front: "LNG imports Jan–Aug 2025", back: "5.2 Mt (vs 4.9 Mt a year earlier), Argus/Vortexa. Qatar contracts: 3 Mt/yr from 2022 + 3 Mt/yr from 2025, 15 years each.", concepts: ["m00.fuel-mix-heat-rate"] },
    { id: "m00-l01-f10", front: "New load connected per year (2024–26)", back: "≈1 GW/yr: 1,059 MW (2024→25), 1,019 MW (2025→26).", concepts: ["m00.peak-demand"] },
  ],
  scenarios: [
    {
      id: "m00-s1",
      title: "The peak-day briefing note",
      dayInLife: true,
      context: md`It is 10:30 on a Tuesday in late July. The forecast is 50 °C. The Undersecretary's office calls: the Minister is being asked by the press whether "the new Shagaya solar project will stop the cuts next summer". You have 90 minutes to send a one-page note. You know: summer 2026 peak 17,540 MW (ministry), ~17 GW reliably available (Rystad), Zone 1 is 1,100 MW with a preferred bidder reported by MEED but no signed PPA you are aware of.`,
      start: "a",
      concepts: ["m00.peak-demand", "m00.available-capacity", "m00.reserve-margin"],
      nodes: {
        a: {
          md: md`How do you frame the headline message?`,
          choices: [
            { text: "\"Yes — 1,100 MW of solar closes the gap.\"", next: "b", score: 1, feedback: "Overpromising. The project is not yet contracted (as far as public sources show), construction takes ~2 years after financial close, and PV firm capacity at the evening peak is limited." },
            { text: "\"Solar reduces daytime shortfall and fuel burn once in operation (not before ~2028–29); next summer relies on demand management, maintenance planning, imports and the BESS first phase.\"", next: "c", score: 10, feedback: "Accurate, sets expectations, and points to the levers that actually act next summer — including the targeted first 500 MW of BESS for summer 2027." },
            { text: "Decline to comment on timelines.", next: "c", score: 4, feedback: "Safe but unhelpful; the Minister needs a usable line. Provide a realistic, qualified statement." },
          ],
        },
        b: {
          md: md`The Undersecretary's advisor replies: "Are you sure? The press will check." What now?`,
          choices: [
            { text: "Correct the note immediately with realistic dates and MWac-at-peak figures, flagging what is unverified.", next: "c", score: 7, feedback: "Good recovery. Owning the correction quickly preserves trust." },
            { text: "Stand by it.", score: 0, feedback: "You have exposed the Minister to a public correction. Never let a headline outrun the contract status." },
          ],
        },
        c: {
          md: md`What numbers do you include to support the message?`,
          choices: [
            { text: "Peak 17,540 MW (ministry, 2026); ~17 GW available (Rystad, third-party); Zone 1 1,100 MW status 'preferred bidder reported, award subject to approvals'; BESS first 500 MW targeted summer 2027; each labelled with source.", score: 10, feedback: "Excellent: sourced, labelled, and honest about status. This is the standard for every ministerial note." },
            { text: "Just the MWp of every project in the pipeline, totalled.", score: 2, feedback: "Totalling nameplate across contracted and uncontracted projects inflates expectations and mixes MWp/MWac." },
            { text: "The MEES 17.71 GW record, because it sounds more urgent.", score: 3, feedback: "Using a non-ministry basis in a ministry note invites contradiction from your own statistics department." },
          ],
        },
      },
    },
  ],
};

export default lesson;
