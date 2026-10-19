import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m03-l02",
  title: "Thermal Storage and the Power Block",
  summary:
    "Two-tank molten-salt storage (direct and indirect), E = m·cp·ΔT, freeze protection, Rankine cycle efficiency, the dry-cooling penalty in a 50 °C desert, and how storage hours translate into capacity factor.",
  minutes: 75,
  objectives: [
    "You can size a two-tank molten-salt store (MWh_th and tonnes of salt) for a trough or tower plant",
    "You can explain why troughs with oil use indirect storage and why towers store the HTF directly",
    "You can describe freeze-protection systems and the operational risks of salt solidification",
    "You can estimate the cycle-efficiency penalty of dry cooling in Kuwaiti summer using Carnot reasoning",
    "You can convert storage size into full-load hours and reason about capacity factor and dispatch",
  ],
  concepts: [
    {
      id: "m03.two-tank-storage",
      name: "Two-tank molten-salt storage",
      description: "Hot and cold tanks of nitrate salt; direct (salt is the HTF) or indirect (oil HTF exchanges heat with salt).",
      competency: "solar",
      related: ["m03.storage-energy", "m03.freeze-protection"],
    },
    {
      id: "m03.storage-energy",
      name: "Sensible heat storage energy",
      description: "E = m·cp·ΔT; ΔT sets how much salt is needed per MWh_th.",
      competency: "solar",
    },
    {
      id: "m03.freeze-protection",
      name: "Freeze protection",
      description: "Heat tracing, tank heaters, drain-down and minimum-temperature operation to keep salt (~238 °C freezing) liquid.",
      competency: "solar",
    },
    {
      id: "m03.rankine-efficiency",
      name: "Rankine cycle efficiency",
      description: "Steam-cycle efficiency set by live-steam and condensing temperatures; ~37–38 % trough, ~41–44 % tower, gross.",
      competency: "solar",
      related: ["m03.dry-cooling", "m01.thermal-efficiency", "m01.heat-rate"],
    },
    {
      id: "m03.dry-cooling",
      name: "Dry cooling penalty",
      description: "Air-cooled condensers save ~90 % of water but raise condensing temperature, cutting output most on the hottest afternoons.",
      competency: "solar",
      related: ["m01.thermal-efficiency"],
    },
    {
      id: "m03.csp-capacity-factor",
      name: "Storage hours and capacity factor",
      description: "How storage hours and solar multiple raise CSP capacity factor and shift output into evening and night.",
      competency: "solar",
      related: ["m03.two-tank-storage", "m01.capacity-factor", "m05.power-energy"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Storing heat in salt, turning heat into power",
      blocks: [
        {
          kind: "md",
          md: md`## Why molten salt

You need a storage medium that is liquid over the whole operating range, cheap, stable, non-flammable, has decent heat capacity and low vapour pressure (so tanks can be at atmospheric pressure). The industry settled on **"solar salt"**: a mixture of **60 % sodium nitrate (NaNO₃) and 40 % potassium nitrate (KNO₃)** by weight — essentially fertiliser-grade chemicals.

| Property | Solar salt (60/40 NaNO₃/KNO₃) |
|---|---|
| Freezing (liquidus) point | ≈ 238 °C (starts to crystallise ~240 °C, fully solid ~220 °C) |
| Upper stability limit | ≈ 585–600 °C (nitrite formation / decomposition above) |
| Specific heat $c_p$ | ≈ 1.5 kJ/(kg·K) (1.49–1.53 over range) |
| Density | ≈ 1,900 kg/m³ at 290 °C; ≈ 1,730 kg/m³ at 565 °C |
| Cost | Commodity, ~USD 0.5–1.0/kg delivered |

The upper limit sets the hot tank (565 °C in towers); the freezing point sets the cold tank with margin (~290 °C) — that is where the familiar "290 / 565 °C" comes from.

## Direct vs indirect two-tank systems

**Direct (tower):** salt is both the receiver HTF and the storage medium. Cold salt (~290 °C) is pumped from the cold tank up the tower, heated to ~565 °C, and flows into the hot tank. Hot salt is drawn on demand to a steam generator (preheater, evaporator, superheater, reheater trains) and returns cold. Solar collection and power generation are fully **decoupled** — the turbine never "sees" a cloud.

**Indirect (trough with oil):** synthetic thermal oil runs in the receivers (~293 → 393 °C) because salt would freeze in kilometres of thin receiver tubing at night. To store heat, part of the hot oil goes through an **oil-to-salt heat exchanger** that heats salt from ~292 °C to ~386 °C into the hot tank. At night the flow reverses: hot salt heats oil, which drives the steam generator. Penalties: the heat-exchanger approach temperature (~7 K each way), so the turbine gets slightly cooler steam during storage discharge (lower efficiency), plus extra capex and pumping. And the usable ΔT is only ~94 K, so you need roughly three times more salt per MWh than a tower.

Shagaya's 50 MW trough with molten-salt TES is treated in this module as this indirect configuration — the public sources confirm a trough with molten-salt storage but do not name the HTF, so confirm the thermal-oil assumption against the as-built design basis.

## Stored energy`,
        },
        { kind: "equation", formula: "csp-tes-energy" },
        {
          kind: "md",
          md: md`with 1 MWh = 3.6×10⁹ J. For 1,000 MWh_th:

| Configuration | ΔT | Salt mass for 1,000 MWh_th |
|---|---|---|
| Trough, indirect (292 → 386 °C) | 94 K | ≈ 25,500 t |
| Tower, direct (290 → 565 °C) | 275 K | ≈ 8,700 t |

Real inventories are 5–10 % larger: tanks keep a minimum "heel" so pumps never run dry, and the cold-tank salt never quite reaches 292 °C in practice. A typical tank is 35–40 m diameter, 12–15 m high, with a carbon-steel cold tank and a stainless-steel (347H) hot tank for towers, sitting on an insulated foundation with cooling air pipes so the concrete below stays below ~90 °C.

**Thermocline** (single tank with hot salt floating on cold, plus quartzite filler) can save ~30 % of storage cost but has had thermal-ratcheting and stratification problems; two-tank remains bankable standard.

## Freeze protection — the operational risk you will hear about

Salt below ~238 °C solidifies. A frozen pipe or valve can take days to thaw and can rupture when it re-melts (salt expands ~4.6 % on melting). Defences:

- **Electrical heat tracing** (mineral-insulated cables) on every salt pipe, valve and instrument line, each circuit with its own thermocouple and controller. A trough plant has tens of thousands of metres of traced pipe; the tracing system is itself a large commissioning workload.
- **Tank immersion heaters** to keep the cold tank above ~260–280 °C during long low-DNI spells.
- **Drain-down**: tower receivers and salt lines are designed to drain back to tanks by gravity when the plant stops, with sloped piping and vent valves.
- **Initial salt melting**: during commissioning, tens of thousands of tonnes of salt are melted using temporary gas-fired melters over 6–10 weeks. This is on the critical path.
- **Oil HTF** in troughs has its own (low) freezing point ~12 °C, which matters little in Kuwait, but nightly freeze-protection recirculation still consumes energy.

## The power block: Rankine cycle

Steam generated from hot oil or salt drives a conventional reheat steam turbine with feedwater heaters. The thermodynamic ceiling is Carnot:`,
        },
        { kind: "equation", formula: "csp-carnot" },
        {
          kind: "md",
          md: md`| | Trough (oil) | Tower (salt) |
|---|---|---|
| Live steam | ~380 °C / 100 bar, reheat | ~540–550 °C / 120–160 bar, reheat |
| Gross cycle efficiency (wet-cooled) | ~37–38 % | ~41–44 % |
| Typical turbine size | 50–200 MW | 100–150 MW |

Real cycles reach ~70 % of Carnot. The other lever is **heat rejection temperature**, which is where Kuwait hurts.

## Dry cooling in a 50 °C desert

A wet cooling tower rejects heat by evaporating water and can condense steam at ~5–10 K above the ambient **wet-bulb** temperature (Kuwait summer wet-bulb is often 25–30 °C even at 48 °C dry-bulb). An **air-cooled condenser (ACC)** uses fans blowing ambient air over finned tubes and can only condense at ~20–30 K above **dry-bulb**. At 48 °C ambient that means condensing at ~70–75 °C instead of ~40 °C.

Carnot estimate for a trough with 380 °C steam: wet $1 - 313/653 = 52.1 \%$; dry $1 - 343/653 = 47.5 \%$ — the dry cycle keeps only ~91 % of the wet-cooled potential on a summer afternoon. Annually the penalty is smaller (cool winter nights help ACCs), typically **2–5 % of annual energy**, plus higher ACC fan parasitics, but **up to 7–10 % on the hottest afternoons** — exactly when Kuwait's grid peaks.

Why accept it? Water. A wet-cooled trough consumes ~3–3.5 m³ of water per MWh; dry cooling reduces total consumption to ~0.2–0.4 m³/MWh (mostly mirror washing and boiler make-up). In Kuwait, water is desalinated at high energy cost. Shagaya's CSP was specified with dry cooling.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why storage changes the economics more than the efficiency",
          md: md`Storage does not create energy — it loses ~1–2 % per day through tank walls plus the heat-exchanger penalty. What it does is (1) let a bigger solar field (higher SM) be used without dumping heat, raising capacity factor, and (2) move output to the hours when the grid values it most. For Kuwait, where the evening peak follows a 48 °C afternoon, the timing value is the real product.`,
        },
        {
          kind: "md",
          md: md`## Storage hours and capacity factor

The "hours of storage" figure is the number of hours the turbine can run at full load from storage alone:`,
        },
        { kind: "equation", formula: "csp-storage-hours" },
        { kind: "equation", formula: "csp-capacity-factor" },
        {
          kind: "md",
          md: md`Rules of thumb at a good-DNI site (~2,400–2,700 kWh/m²/yr): trough no storage SM 1.3 → CF ~25–28 %; trough 7.5 h SM 2.0 → ~40 %; trough 10 h SM 2.5–3 → ~45–55 %; tower 15 h SM 2.5–3 → ~60–70 %. Kuwait's DNI is uncertain and seasonally depressed by dust, so treat the upper ends with suspicion.`,
        },
        { kind: "widget", widget: "thermal-storage", props: { massTonnes: 30000 }, caption: "Try 30,000 t of salt at a trough ΔT, then at a tower ΔT, and see how MWh_th and turbine hours change." },
        { kind: "diagram", diagram: "parabolic-trough", caption: "Follow the flows: oil loop through the receivers; oil-to-salt heat exchanger charging the hot tank by day; reverse flow at night to the steam generator, turbine and air-cooled condenser." },
      ],
    },
    {
      layer: "applied",
      title: "Sizing storage for Kuwaiti plants",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "10 hours of storage for a 50 MW trough",
          given: md`A 50 MW_e gross trough with oil HTF and indirect two-tank storage. Gross cycle efficiency 37.5 %. Salt: cold 292 °C, hot 386 °C, $c_p$ = 1.5 kJ/(kg·K). Target: 10 h full-load storage.`,
          steps: [
            { md: md`**Thermal input at full load:** $\dot Q_{PB} = 50/0.375 = 133.3$ MW_th.` },
            { md: md`**Storage energy:** $E_{th} = 133.3 \times 10 = 1{,}333$ MWh_th.` },
            { md: md`**In joules:** $1{,}333 \times 3.6\times10^9 = 4.80\times10^{12}$ J.` },
            { md: md`**Salt mass:** $m = E/(c_p\,\Delta T) = 4.80\times10^{12} / (1{,}500 \times 94) = 3.40\times10^{7}$ kg ≈ **34,000 t**.` },
            { md: md`**Volume (hot, ~1,830 kg/m³ at 386 °C):** ≈ 18,600 m³ per tank — e.g. a 38 m diameter tank needs ~16.4 m of salt depth, so real designs add margin or use two tank pairs.` },
          ],
          result: md`About **1,330 MWh_th** and **~34,000 t of salt**. Compare: Worley reports **1,200 MWh_th** for Shagaya's store — the same order, implying either a slightly smaller full-load rating from storage or a different efficiency/hour definition (see the independent problem).`,
        },
        { kind: "sources", refs: ["m03-worley-shagaya", "m03-reuters-csp-kuwait"] },
        {
          kind: "worked",
          mode: "faded",
          title: "Tower storage for a 100 MW plant",
          given: md`A 100 MW_e gross salt tower, cycle efficiency 42 %, 8 h storage, salt 290 → 565 °C, $c_p$ = 1.5 kJ/(kg·K).`,
          steps: [
            { md: md`Thermal input: $100 / 0.42 = 238.1$ MW_th.` },
            {
              md: md`$E_{th} = 238.1 \times 8 = 1{,}905$ MWh_th.`,
              hidden: true,
              check: { prompt: "Stored thermal energy", answer: 1905, unit: "MWh_th", tolerance: { rel: 0.01 } },
            },
            {
              md: md`$m = 1{,}905 \times 3.6\times10^9 / (1{,}500 \times 275) \approx 1.66\times10^7$ kg ≈ 16,600 t.`,
              hidden: true,
              check: { prompt: "Salt mass", answer: 16623, unit: "t", tolerance: { rel: 0.02 } },
            },
          ],
          result: md`A tower stores ~43 % more heat than the 50 MW trough above with **less than half the salt**, because ΔT is ~2.9× larger and the cycle is more efficient. This is the main reason new large CSP projects (e.g. Noor III, the Noor Energy 1 tower) favour towers for storage-heavy designs.`,
        },
        {
          kind: "question",
          question: {
            id: "m03-l02-p1",
            type: "numeric",
            prompt: md`Shagaya's storage is reported as 1,200 MWh_th. Assume all of it is usable, a gross cycle efficiency during storage discharge of 37 % (heat-exchanger penalty included) and a 50 MW gross rating. How many hours can the turbine run at full load from storage alone?`,
            answer: 8.88,
            tolerance: { rel: 0.02 },
            unit: "h",
            explanation: md`$h = E_{th}\,\eta / P = 1{,}200 \times 0.37 / 50 = 8.88$ h. The publicly quoted "10 hours" would require ~41.7 % efficiency at full load — implausible for a 393 °C oil cycle — so the 10 h figure is probably at part load or uses different assumptions. **Lesson for a PM:** always ask how storage hours are defined before comparing plants or writing a performance guarantee.`,
            concepts: ["m03.storage-energy", "m03.csp-capacity-factor"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Storage and power block on real projects",
      blocks: [
        {
          kind: "md",
          md: md`## Where the risks live

| Area | Typical issue | Who owns it |
|---|---|---|
| Salt tanks | Foundation overheating, hot-tank floor buckling, weld cracking (stainless 347H stress-relaxation cracking), leaks | EPC (design), O&M (inspection) |
| Heat tracing | Failed circuits → frozen lines; thousands of circuits to commission and maintain | EPC / electrical subcontractor |
| Salt pumps | Long-shaft vertical pumps in hot tanks; bearing and seal failures | OEM warranty |
| Oil–salt HX | Fouling, leaks causing oil–salt contact (oil decomposes in nitrate — hazardous) | EPC / OEM |
| Steam generator | Thermal-shock cracking on fast start-ups, especially daily cycling | OEM |
| ACC | Fouled fins in dust, fan failures, capacity shortfall on hottest days | EPC / OEM |
| HTF oil | Degradation → hydrogen → receiver vacuum loss; oil ullage system needed | O&M |

Daily cycling is the hidden enemy. A CSP plant starts and stops (or ramps between solar and storage) every day: ~10,000 thermal cycles over 30 years, versus a few hundred for a baseload plant. Specify cycling-rated components and ask for low-cycle fatigue analysis of headers and steam-generator tubesheets.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong in commissioning",
          md: md`- **Salt melting slips** because temporary melters are undersized or fuel logistics fail — and nothing downstream can be tested hot until it's done.
- **Heat-tracing punch list** of thousands of items; a single failed circuit on a drain line freezes salt in the first cool winter night.
- **Performance test in the wrong season**: running the acceptance test in winter (low DNI, high cosine loss) or mid-summer (ACC penalty) without proper correction curves leads to disputes.
- **Storage capacity test** not defined: is "10 h" demonstrated at rated load, net of parasitics, from a fully charged state?`,
        },
        {
          kind: "checklist",
          title: "PM checklist — TES and power block",
          items: [
            "Storage capacity guaranteed in MWh_th usable AND demonstrated as hours at rated net output",
            "Salt specification (composition, impurities: chlorides, perchlorates, magnesium) and supplier test certificates",
            "Tank foundation design with temperature monitoring and cooling-air design",
            "Heat-tracing design: redundancy on critical drains, monitoring, alarm philosophy",
            "Freeze-recovery procedure and thaw equipment on site",
            "ACC design point at ≥ 48–50 °C ambient with stated output derating curve",
            "Cycling (start/stop) capability and fatigue design life documented",
            "Performance test procedure with correction curves for DNI, ambient temperature and incidence angle",
          ],
        },
        {
          kind: "ask",
          title: "Ask the contractor",
          items: [
            "At what ambient temperature is the air-cooled condenser designed, and what is the net output at 50 °C?",
            "How are your storage hours defined — gross or net, full or part load, usable or total inventory?",
            "What is the daily heat loss from each tank, and the cold-tank minimum temperature with heaters?",
            "Which salt lines can freeze if heat tracing fails, how fast, and how do you thaw them?",
            "How many hot starts per year is the steam generator designed for?",
          ],
        },
        { kind: "scenario", scenario: "m03-s1" },
        {
          kind: "feynman",
          prompt: "Explain to the Undersecretary why a tower needs less salt than a trough to store the same energy, and why the trough's turbine is also less efficient.",
          keyPoints: [
            "Stored heat equals mass × specific heat × temperature difference",
            "Tower salt swings 290→565 °C (ΔT ≈ 275 K); trough salt only ≈292→386 °C (≈94 K), so ~3× more salt per MWh",
            "Higher steam temperature in the tower gives higher Rankine/Carnot efficiency",
            "Trough oil cannot exceed ~393 °C and needs a heat exchanger, losing a few degrees each way",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m03-l02-q1",
      type: "mcq",
      prompt: "What is the composition of 'solar salt'?",
      options: ["60 % KNO₃ / 40 % NaNO₃", "60 % NaNO₃ / 40 % KNO₃", "50 % NaCl / 50 % KCl", "Ca(NO₃)₂ ternary eutectic"],
      answer: 1,
      explanation: md`Solar salt is 60 wt % sodium nitrate, 40 wt % potassium nitrate. It freezes at ~238 °C and is stable to ~585–600 °C.`,
      concepts: ["m03.two-tank-storage"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m03-l02-q2",
      type: "numeric",
      prompt: md`How many MWh_th are stored in 20,000 t of solar salt ($c_p$ = 1.5 kJ/(kg·K)) heated from 290 °C to 565 °C?`,
      answer: 2291.7,
      tolerance: { rel: 0.02 },
      unit: "MWh_th",
      explanation: md`$E = 2\times10^7 \times 1{,}500 \times 275 = 8.25\times10^{12}$ J; ÷ 3.6×10⁹ = **2,292 MWh_th**.`,
      concepts: ["m03.storage-energy"],
      difficulty: 2,
    },
    {
      id: "m03-l02-q3",
      type: "mcq",
      prompt: "Why do parabolic troughs with thermal oil use indirect storage?",
      options: [
        "Oil is too expensive to store in tanks in large quantity and has a vapour pressure that needs pressurised tanks",
        "Salt cannot be heated by oil",
        "Regulations prohibit salt near mirrors",
        "Oil gives a higher ΔT",
      ],
      answer: 0,
      explanation: md`Large volumes of oil are costly, flammable and require pressurised tanks at 393 °C. Salt is cheap and stored at atmospheric pressure — so oil heats salt through a heat exchanger. Using salt directly in trough receivers is possible but the freeze risk in kilometres of field piping has limited it to a few plants.`,
      concepts: ["m03.two-tank-storage"],
      difficulty: 2,
    },
    {
      id: "m03-l02-q4",
      type: "multi",
      prompt: "Which are freeze-protection measures in a molten-salt plant? (select all)",
      options: ["Electrical heat tracing on pipes and valves", "Drain-down of receivers to tanks", "Cold-tank immersion heaters", "Increasing the solar multiple", "Glycol antifreeze added to the salt"],
      answer: [0, 1, 2],
      explanation: md`Heat tracing, gravity drain-down and tank heaters are standard. SM has nothing to do with freezing; you cannot add antifreeze to a nitrate salt.`,
      concepts: ["m03.freeze-protection"],
      difficulty: 1,
    },
    {
      id: "m03-l02-q5",
      type: "numeric",
      prompt: md`Carnot efficiency for 380 °C live steam condensing at 70 °C (dry cooling, summer)? Give a fraction.`,
      answer: 0.4746,
      tolerance: { rel: 0.01 },
      explanation: md`$1 - 343.15/653.15 = 0.4746$. With wet cooling at 40 °C it would be $1 - 313.15/653.15 = 0.5206$; the dry case keeps ~91 % of that potential.`,
      concepts: ["m03.rankine-efficiency", "m03.dry-cooling"],
      difficulty: 2,
    },
    {
      id: "m03-l02-q6",
      type: "label",
      prompt: "Label the parabolic trough plant components.",
      diagram: "parabolic-trough",
      markers: [
        { id: "mirror", answer: "Parabolic mirror" },
        { id: "receiver-tube", answer: "Evacuated receiver tube" },
        { id: "hot-tank", answer: "Hot salt tank (~386 °C)" },
        { id: "cold-tank", answer: "Cold salt tank (~292 °C)" },
        { id: "heat-exchanger", answer: "Oil-to-salt heat exchanger" },
        { id: "condenser", answer: "Air-cooled condenser" },
      ],
      options: ["Parabolic mirror", "Evacuated receiver tube", "Hot salt tank (~386 °C)", "Cold salt tank (~292 °C)", "Oil-to-salt heat exchanger", "Air-cooled condenser", "Heliostat", "Wet cooling tower"],
      explanation: md`In an indirect trough plant the oil loop links receivers, heat exchanger and steam generator; salt only circulates between the tanks and the heat exchanger. Heliostats belong to towers; Shagaya uses dry (air) cooling.`,
      concepts: ["m03.two-tank-storage"],
      difficulty: 1,
    },
    {
      id: "m03-l02-q7",
      type: "short",
      prompt: "Why is the dry-cooling penalty worse for Kuwait's grid than the annual-energy figure (2–5 %) suggests?",
      rubric: [
        "Penalty is largest at highest ambient temperature",
        "Highest temperatures coincide with Kuwait's peak demand (summer afternoons/evenings)",
        "So the lost energy has the highest system value",
        "Trade-off against the water saved (desalinated water is costly)",
      ],
      modelAnswer:
        "An air-cooled condenser condenses ~20–30 K above dry-bulb, so on a 48–50 °C afternoon the cycle loses up to 7–10 % output, versus 2–5 % averaged over a year. Those hours coincide with Kuwait's peak demand, so the lost MWh are the most valuable ones. It is still usually right to choose dry cooling because wet cooling would consume ~3 m³/MWh of costly desalinated water.",
      explanation: md`Annual averages hide the time-value of energy. Always ask for output at the design-maximum ambient, not just annual yield.`,
      concepts: ["m03.dry-cooling"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m03-l02-f1", front: "Solar salt composition", back: "60 % NaNO₃ / 40 % KNO₃ (by weight).", concepts: ["m03.two-tank-storage"] },
    { id: "m03-l02-f2", front: "Solar salt freezing point", back: "≈238 °C.", concepts: ["m03.freeze-protection"] },
    { id: "m03-l02-f3", front: "Tower salt cold / hot temperatures", back: "≈290 °C / ≈565 °C.", concepts: ["m03.two-tank-storage"] },
    { id: "m03-l02-f4", front: "Trough indirect storage salt temperatures", back: "≈292 °C / ≈386 °C (oil HTF 293–393 °C).", concepts: ["m03.two-tank-storage"] },
    { id: "m03-l02-f5", front: "Stored sensible heat", back: md`$E = m\,c_p\,\Delta T$; 1 MWh = 3.6×10⁹ J.`, concepts: ["m03.storage-energy"] },
    { id: "m03-l02-f6", front: "Gross Rankine efficiency: trough vs tower", back: "≈37–38 % vs ≈41–44 % (wet-cooled).", concepts: ["m03.rankine-efficiency"] },
    { id: "m03-l02-f7", front: "Water use: wet vs dry cooled CSP", back: "≈3–3.5 m³/MWh vs ≈0.2–0.4 m³/MWh.", concepts: ["m03.dry-cooling"] },
    { id: "m03-l02-f8", front: "Full-load storage hours", back: md`$h = E_{th}\,\eta_{PB}/P_e$.`, concepts: ["m03.csp-capacity-factor"] },
    { id: "m03-l02-f9", front: "Shagaya CSP storage (reported)", back: "10 h molten salt; 1,200 MWh_th (Worley). Dry cooled.", concepts: ["m03.two-tank-storage"] },
  ],
  scenarios: [
    {
      id: "m03-s1",
      title: "Frozen salt line on a winter night",
      dayInLife: true,
      context: md`You are the MEWRE PM for a CSP plant in its first winter after taking over (Defects Notification Period running). At 06:30 the plant manager calls: overnight ambient dropped to 4 °C, a heat-tracing circuit on the hot-tank drain line tripped at 02:00, and the line temperature now reads 205 °C. The plant can't discharge storage this morning.`,
      start: "a",
      nodes: {
        a: {
          md: md`The O&M contractor wants to apply portable heaters immediately and restart by noon. The EPC's warranty engineer is not on site until tomorrow.`,
          choices: [
            { text: "Approve immediate thawing with portable heaters to restore output fast", next: "b", score: 3, feedback: "Speed matters, but uncontrolled thawing can rupture a pipe (salt expands on melting) and may void the EPC's warranty." },
            { text: "Isolate the line, stop further cooling, require the approved freeze-recovery procedure and notify the EPC formally under the DNP defects clause", next: "c", score: 9, feedback: "Right priorities: safety, controlled thaw per procedure, preserve contractual rights." },
            { text: "Wait for the EPC engineer to arrive before doing anything", next: "b", score: 2, feedback: "Waiting allows more of the line to solidify and extends the outage. Stabilise first." },
          ],
        },
        b: {
          md: md`A section of pipe bulges during thawing. Hot salt weeps from a flange. HSE stops work. The EPC says the damage results from improper thawing and refuses warranty cover.`,
          choices: [
            { text: "Commission a root-cause analysis covering both the trip and the thaw, then negotiate liability on facts", score: 6, feedback: "Recovering position: facts first. But the thaw decision weakened your claim." },
            { text: "Insist the EPC pays because the original trip was a heat-tracing defect", score: 4, feedback: "The trip may well be a defect, but you now share causation for the damage." },
          ],
        },
        c: {
          md: md`The controlled thaw takes 30 hours; output resumes the next afternoon. The root-cause shows the tracing controller's thermocouple was mis-wired — a construction defect.`,
          choices: [
            { text: "Require the EPC to audit all similar circuits, add a low-temperature alarm on critical drains to the DCS, and record the lost energy for the DNP claim", score: 10, feedback: "Excellent: systemic fix, monitoring improvement, contractual record." },
            { text: "Close the incident once the line is fixed", score: 4, feedback: "One mis-wired circuit implies others. Fix the system, not the symptom." },
          ],
        },
      },
      concepts: ["m03.freeze-protection", "m03.two-tank-storage"],
    },
  ],
};

export default lesson;
