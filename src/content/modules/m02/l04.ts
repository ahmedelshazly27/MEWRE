import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m02-l04",
  title: "Plant architecture: trackers, strings, inverters, DC/AC",
  summary:
    "How a utility PV plant is put together: single-axis trackers vs fixed tilt at 29°N, GCR and backtracking, string sizing at 1500 Vdc, string vs central inverters, DC/AC ratio and clipping economics, MV skids, cabling, layout and earthing.",
  minutes: 90,
  objectives: [
    "Justify single-axis trackers vs fixed tilt for Kuwait and explain GCR, row pitch and backtracking",
    "Size a 1500 Vdc string from temperature coefficients and the coldest site temperature, and check the hot-day MPPT window",
    "Compare string and central inverter architectures for a GW-scale desert plant",
    "Estimate clipping and evaluate the economics of a DC/AC ratio choice",
    "Trace the power path from module to grid and name the PM checks on MV skids, cabling and earthing",
  ],
  concepts: [
    {
      id: "m02.tracker-vs-fixed",
      name: "Trackers vs fixed tilt",
      description: "Single-axis tracking, GCR, row pitch, backtracking and the energy/cost trade-off at Kuwait's latitude.",
      competency: "solar",
      related: ["m02.sun-geometry", "m02.wind-stow", "m02.bifacial-gain"],
    },
    {
      id: "m02.string-sizing",
      name: "String sizing",
      description: "Choosing modules per string so Voc at minimum temperature stays below 1500 V and Vmp at maximum temperature stays inside the MPPT window.",
      competency: "solar",
      related: ["m02.temperature-coefficient", "m02.design-review"],
    },
    {
      id: "m02.dc-ac-ratio",
      name: "DC/AC ratio & clipping",
      description: "Oversizing the array relative to the inverter: clipping losses vs cheaper energy and flatter output.",
      competency: "solar",
      related: ["m02.loss-tree", "m02.inverter-architecture"],
    },
    {
      id: "m02.inverter-architecture",
      name: "Inverter architecture",
      description: "Central vs string inverters, MV skids/power stations, and their availability, O&M and grid-code implications.",
      competency: "solar",
      related: ["m02.thermal-derating", "m02.bos-earthing"],
    },
    {
      id: "m02.bos-earthing",
      name: "Balance of system: cabling, layout & earthing",
      description: "DC and AC cabling, combiner boxes, MV collector network, earthing and lightning protection for a utility PV plant.",
      competency: "solar",
      related: ["m02.construction-qa"],
    },
  ],
  sections: [
    // ============================================================ THEORY
    {
      layer: "theory",
      title: "The power path and plant layout",
      blocks: [
        {
          kind: "md",
          md: md`A utility PV plant is a hierarchy of series and parallel connections, then voltage transformations:

1. **Modules** (≈ 580–720 Wp, ≈ 50 V) in series form a **string** (27–30 modules, up to 1500 Vdc, ≈ 15–20 kWp).
2. Strings are paralleled in **combiner boxes** (central architecture, with fuses and a disconnect) or land directly on **string inverters** (each 250–350 kW).
3. **Inverters** convert DC to three-phase AC (≈ 600–800 V for central, 800 V for 1500 Vdc string inverters).
4. An **MV skid / power station** — inverter(s) + LV/MV step-up transformer (to 33 kV in Kuwait-style collector networks) + **ring main unit (RMU)** — typically 4–7 MVA per block.
5. **MV collector cables** (33 kV, buried) loop the skids back to the **collector substation**.
6. The **HV transformer** steps up to the transmission voltage (e.g. 132 kV or 400 kV — the Shagaya Zone 1 scope includes a 400 kV substation) at the point of interconnection to the **grid**.`,
        },
        { kind: "diagram", diagram: "pv-plant", caption: "Utility PV power path: module → string → combiner → inverter → MV transformer → RMU → collector substation → HV transformer → grid." },
        {
          kind: "widget",
          widget: "pv-sld",
          caption: "Click each component on the single-line diagram for its role, typical rating and PM checks.",
        },
        {
          kind: "callout",
          tone: "kuwait",
          title: "Shagaya Phase III Zone 1 scope",
          md: md`The 1,100 MW Zone 1 PV IPP RFP covers development, financing, design, construction and O&M, **including a 400 kV substation**, under a 30-year PPA with MEWRE from COD. The Shagaya–Al-Wafra 400 kV overhead line is a separate MEWRE-side contract. The interface between the IPP's substation and MEWRE's line is a classic critical-path risk.`,
        },
        { kind: "sources", refs: ["agbi-2025-zone1-rfp", "pvmag-2025-zone1-prequal"] },
      ],
    },
    {
      layer: "theory",
      title: "Trackers vs fixed tilt at 29°N",
      blocks: [
        {
          kind: "md",
          md: md`A **horizontal single-axis tracker (HSAT)** has its rotation axis north–south and turns the modules east → west through ±52° to ±60°. At Kuwait's latitude:

- In summer the sun rises north of east and sets north of west (lesson 1). A fixed south-facing array sees poor incidence for hours each morning and evening; the tracker faces those hours squarely.
- The extra energy arrives in the **morning shoulder and late afternoon** — which also lines up better with Kuwait's long summer afternoon/evening load and reduces the midday spike.
- Typical specific-yield gain over optimally tilted fixed (≈ 25° south): **≈ 15–25 %** in sunny, low-latitude deserts, somewhat reduced by high diffuse fraction in dusty periods. Bifacial gain is also higher on trackers (higher, more uniform rear irradiance).
- Costs: higher capex (≈ +USD 0.03–0.06/Wp structure), motors/controllers/batteries to maintain, more piles, tighter geotechnical and piling tolerances, wind stow strategy (lesson 5).

**Configurations.** **1P** (one module in portrait, ≈ 2.3 m chord) vs **2P** (two in portrait, ≈ 4.6 m chord). 1P is simpler, lower and less wind-sensitive; 2P uses fewer piles per MW but has larger torsional loads. Both are used in GW-scale Gulf plants.

### GCR, pitch and backtracking`,
        },
        { kind: "equation", formula: "pv-gcr" },
        {
          kind: "md",
          md: md`For a 1P tracker with 2.278 m modules and GCR 0.33: pitch $p = 2.278/0.33 = 6.9$ m. For a fixed 2P array (4.556 m chord, 25° tilt) with no shading from 09:00 to 15:00 solar time on 21 December at 29.3°N (sun elevation ≈ 21.8°, azimuth ≈ 136° at 09:00), the shadow geometry gives pitch ≈ 7.6 m, GCR ≈ 0.60.

**Backtracking.** At low sun angles (early morning/late evening), a tracker following the sun would shade the row behind it. Backtracking rotates the modules *back* toward horizontal so that shadows just touch the next row: no beam shading (which, through bypass diodes, would cost far more than the geometric fraction), at the price of a worse incidence angle. On sloping or uneven terrain, standard backtracking still causes shading; **terrain-aware backtracking** (row-by-row angles from the as-built survey) recovers 0.5–2 % in some sites. Lower GCR = less backtracking time, more land and cable.

**Diffuse/stow algorithms.** On overcast or very dusty hours, a flat (horizontal) position captures more diffuse light than pointing at a dim sun; some controllers switch to "diffuse mode". At high wind, trackers stow (lesson 5).`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why trackers have become the default in the Gulf",
          md: md`At 29°N the geometry is unusually favourable (long summer days with north-of-east sunrise), the land is flat and cheap, and bifacial modules on trackers stack two gains. The added capex (a few USD-cents/Wp) is recovered by 15–25 % more energy. The trade-off to watch is wind and sand: stow events, actuator reliability in dust, and tracker availability become first-order O&M KPIs.`,
        },
      ],
    },
    {
      layer: "theory",
      title: "String sizing at 1500 Vdc",
      blocks: [
        {
          kind: "md",
          md: md`Voltage adds along a string. Two limits:

**Upper limit — maximum system voltage.** The string's open-circuit voltage at the *coldest* cell temperature, with the array energised, must not exceed 1500 V (the lowest rating of modules, inverter input, connectors, cables, fuses and combiner boxes). The coldest energised condition is a clear winter dawn: the inverter is not yet loading the string (open circuit), irradiance is enough to build full Voc, and cells are at about ambient temperature. IEC 62548-1 requires using the lowest expected ambient temperature for the site.`,
        },
        { kind: "equation", formula: "pv-voc-temp" },
        { kind: "equation", formula: "pv-string-length" },
        {
          kind: "md",
          md: md`**Lower limit — MPPT window.** On the hottest day, $N \cdot V_{mp}(T_{c,max})$ must stay above the inverter's minimum MPPT voltage *at full power* (for 1500 Vdc central inverters ≈ 875–950 V; check the datasheet curve, which itself derates with temperature). If $V_{mp}$ falls below it, the inverter is forced off the MPP and loses energy exactly at peak hours. Also check **current**: string fuses and cable ampacity sized at ≥ 1.25 × Isc (IEC 62548), with extra margin for bifacial rear gain and irradiance enhancement (cloud-edge effect).

**Longer strings = cheaper.** Fewer strings per MW → fewer combiner inputs, less cable, fewer connectors, fewer harnesses, lower ohmic loss (higher voltage, lower current). So designers push to the maximum; that is exactly why the minimum-temperature assumption is a PM-level check.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Kuwait minimum temperature for string sizing",
          md: md`The research brief does not contain a sourced minimum ambient temperature for Shagaya. Desert winter nights in Kuwait are commonly cited as reaching ≈ 0–5 °C, with occasional sub-zero readings inland — **this is unverified**. For design, the EPC must use the record minimum from the nearest long-term meteorological station (Kuwait Meteorological Department / on-site station), not a TMY file (a TMY contains *typical* values, not extremes). This course uses 0 °C in examples and checks sensitivity to −2 °C.`,
        },
      ],
    },
    {
      layer: "theory",
      title: "Inverters, DC/AC ratio and clipping",
      blocks: [
        {
          kind: "md",
          md: md`### Central vs string inverters

| Aspect | Central (3–5 MVA per unit, on MV skid) | String (250–350 kW, distributed) |
|---|---|---|
| Capex | Lowest USD/W at GW scale | Slightly higher, falling |
| DC cabling | Long DC runs to combiner boxes; DC fuses | Shorter DC; more AC LV cabling |
| MPPT granularity | 1–4 MPPTs per MW | Many MPPTs → less mismatch on uneven terrain |
| Failure impact | One fault = 3–5 MW down until repair | One fault = 0.3 MW; swap in hours |
| O&M | Specialist technicians, OEM service, spares of large parts | Replace-not-repair; spare units on site |
| Heat/dust | Housed in skid with filtered forced cooling; derating curves crucial | Outdoor IP66; passive/fan cooling; direct sun and sand on enclosure |
| Typical use | Large Gulf IPPs historically; still common | Increasingly common, incl. GW plants |

Both are bankable. In Kuwait the deciding factors are **high-temperature derating**, **dust ingress** (filter maintenance), availability guarantees and OEM service presence in-country.

### DC/AC ratio`,
        },
        { kind: "equation", formula: "pv-dc-ac-ratio" },
        {
          kind: "md",
          md: md`A module rarely produces its STC rating in the field: temperature (−10 to −15 % in Kuwait summer), soiling, wiring and mismatch losses mean real DC peak is ≈ 80–90 % of nameplate. So an inverter sized 1:1 would almost never run at full output. Oversizing the array lets the inverter (and the grid connection, which is often contracted in MWac at the POI) run near full output for more hours. When DC power exceeds AC capacity, the inverter **clips** — moves off the MPP to cap output.

Illustrative clear-day clipping (sinusoidal clear-sky DC profile, real DC peak = 85 % of nameplate):

| DC/AC | Effective DC peak / AC | Clipped share of that day's DC energy |
|---|---|---|
| 1.20 | 1.02 | ≈ 0.3 % |
| 1.30 | 1.105 | ≈ 2.8 % |
| 1.35 | 1.15 | ≈ 4.4 % |
| 1.40 | 1.19 | ≈ 6.1 % |

Annual clipping is lower than these clear-day values (cooler, high-irradiance spring days clip most; hot summer afternoons clip less because of thermal derate of the modules, though the inverter also derates with heat — lesson 5). Trackers produce a **flatter, wider** profile than fixed tilt, so they clip more at the same ratio. Bifacial gain adds DC that may simply be clipped at midday. PVsyst computes clipping hour by hour; typical annual values 0.5–3 %.

**Why oversize anyway?** Inverters, MV skids, transformers and the grid connection are sized in MWac. Adding cheap DC raises energy in all the non-clipping hours (mornings, evenings, hazy days), which raises capacity factor on the AC infrastructure. The optimum is where the marginal energy from the last MWp, net of clipping, just pays for that MWp.`,
        },
        {
          kind: "widget",
          widget: "dc-ac-ratio",
          props: { ratio: 1.3 },
          caption: "Clear-sky day: move the DC/AC ratio and see clipped energy grow while inverter capacity per MWp falls.",
        },
      ],
    },
    {
      layer: "theory",
      title: "Cabling, MV skids and earthing",
      blocks: [
        {
          kind: "md",
          md: md`**DC cabling.** Solar cable to EN 50618 / IEC 62930 (H1Z2Z2-K, 1500 V DC, rated 90–120 °C conductor), UV- and ozone-resistant. Sized for ampacity with derating for ambient temperature and grouping (buried in sand at 50 °C air — ground temperature and soil thermal resistivity matter), and for voltage drop/ohmic loss (target ≈ 1–1.5 % DC ohmic loss at STC). Connectors: MC4-type, **same manufacturer and type on both halves** (lesson 7 — mixed connectors are a top fire cause).

**AC/MV.** LV AC (string inverter to skid) then 33 kV XLPE cables in loops/radials to the collector substation. Losses ≈ 0.5–1.5 %. Transformer losses (no-load losses run 24/7, including at night — a real cost for the IPP; load losses at peak). Night-time consumption and reactive power absorption by the plant matter for the PPA metering.

**MV skid / power station.** Pre-fabricated platform: inverter(s), LV/MV transformer (oil-immersed, often ONAN; check hot-ambient rating — IEC 60076 assumes 40 °C max ambient), RMU (SF₆ or SF₆-free switchgear), auxiliary transformer, SCADA/communication cabinet. Factory-tested (FAT) and shipped as one unit.

**Earthing and lightning.** An equipotential earthing grid bonding module frames, tracker structures, skids and fences; earth electrode resistance targets set by the design study (soil resistivity in dry sand is very high — ≫ 1,000 Ω·m — so deep electrodes or chemical earthing may be needed). Lightning protection per IEC 62305 risk assessment; surge protective devices (SPDs) on DC inputs and AC sides. Functional earthing of the DC system (floating, negative-grounded for PID) must be consistent with inverter topology and insulation monitoring.`,
        },
      ],
    },
    // ============================================================ APPLIED
    {
      layer: "applied",
      title: "String sizing and DC/AC economics",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "1500 Vdc string sizing for Shagaya",
          given: md`Reference module: $V_{oc} = 51.6$ V, $V_{mp} = 42.6$ V, $I_{sc} = 14.20$ A, $\beta_{V_{oc}} = -0.25$ %/°C, $\beta_{V_{mp}} = -0.29$ %/°C, 580 Wp. Maximum system voltage 1500 V. Minimum design cell temperature 0 °C (see unverified note). Maximum cell temperature 75 °C. Inverter min MPPT voltage at full power 900 V.`,
          steps: [
            { md: md`**Voc at 0 °C**: $51.6 \times [1 - 0.0025 \times (0 - 25)] = 51.6 \times 1.0625 = 54.83$ V.` },
            { md: md`**Max modules**: $1500/54.83 = 27.36$ → round **down** to $N = 27$.` },
            { md: md`**Check string Voc**: $27 \times 54.83 = 1{,}480$ V < 1500 V (margin 20 V, 1.3 %). At −2 °C: $27 \times 55.08 = 1{,}487$ V — still OK.` },
            { md: md`**Would 28 work?** $28 \times 54.83 = 1{,}535$ V at 0 °C — **no**. Even at +5 °C: $28 \times 54.18 = 1{,}517$ V — still no. 28 would only be safe if the coldest energised temperature were above ≈ +10 °C, which Kuwait winters do not guarantee.` },
            { md: md`**Hot-day MPPT check**: $V_{mp}(75^\circ\text{C}) = 42.6 \times [1 - 0.0029 \times 50] = 36.42$ V; string $27 \times 36.42 = 983$ V > 900 V. ✓ (At 80 °C: 967 V — still OK.)` },
            { md: md`**String power and current**: $27 \times 580 = 15.66$ kWp. Design current for fuses/cables $\ge 1.25 \times 14.20 = 17.75$ A, plus bifacial margin (≈ +10 %) → ≈ 19.5 A.` },
          ],
          result: md`**27 modules per string**, 15.66 kWp, string Voc ≤ 1,487 V down to −2 °C, Vmp ≥ 967 V at 80 °C. A design showing 28 modules with this module is a red flag: it either assumes an unrealistically warm minimum or uses the wrong coefficient.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Is a DC/AC ratio of 1.35 worth it vs 1.20?",
          given: md`100 MWac plant. Option A: DC/AC 1.20 (120 MWp), annual clipping 0.5 %. Option B: 1.35 (135 MWp), clipping 2.5 % (both from PVsyst). Unclipped specific yield 2,300 kWh/kWp (tracker, illustrative). Incremental DC cost (modules, trackers, DC BOS) USD 0.25/Wp. Value of energy USD 15/MWh (illustrative; the Zone 1 tariff is not publicly reported).`,
          steps: [
            { md: md`**Energy A**: $120 \times 2{,}300 \times (1 - 0.005) = 274{,}620$ MWh/yr.` },
            {
              md: md`**Energy B**: $135 \times 2{,}300 \times (1 - 0.025) = 302{,}738$ MWh/yr.`,
              hidden: true,
              check: { prompt: "Annual energy for option B (MWh/yr)", answer: 302737.5, unit: "MWh/yr", tolerance: { rel: 0.005 } },
            },
            {
              md: md`**Marginal yield of the extra 15 MWp**: $(302{,}738 - 274{,}620)/15{,}000\ \text{kWp} = 1{,}874$ kWh/kWp — about 81 % of the average yield, because much of the extra midday energy is clipped.`,
              hidden: true,
              check: { prompt: "Marginal specific yield (kWh/kWp)", answer: 1874.5, unit: "kWh/kWp", tolerance: { rel: 0.01 } },
            },
            { md: md`**Incremental revenue**: $28{,}118 \times 15 = $ USD 0.42 m/yr. **Incremental capex**: $15\ \text{MWp} \times$ USD 0.25 m/MWp = USD 3.75 m. Simple payback ≈ 8.9 years.` },
          ],
          result: md`Option B pays back in ≈ 9 years on a 30-year asset — attractive before discounting, marginal after a 7–8 % WACC and degradation. This is why GCC tracker plants often land at 1.25–1.35. For MEWRE, the higher ratio also flattens output and fills more hours, which helps the grid — but check that clipped hours do not coincide with the times MEWRE needs energy most.`,
        },
        {
          kind: "question",
          question: {
            id: "m02-l04-p1",
            type: "numeric",
            prompt: md`Independent problem. A central inverter block is rated 4.4 MVA (assume 4.4 MWac at unity PF). Using the 27-module, 15.66 kWp string, how many strings are needed for a DC/AC ratio of 1.30? Round to the nearest whole string.`,
            answer: 365,
            tolerance: { abs: 1 },
            unit: "strings",
            explanation: md`DC needed $= 4.4 \times 1.30 = 5.72$ MWp. Strings $= 5{,}720/15.66 = 365.3$ → 365 strings (5.716 MWp, ratio 1.299). In practice the number is set by combiner-box inputs (e.g. 24 inputs × 15 boxes = 360) and tracker row length (strings per tracker), so the final ratio moves a little.`,
            concepts: ["m02.dc-ac-ratio", "m02.string-sizing"],
            difficulty: 2,
          },
        },
      ],
    },
    // ============================================================ FIELD
    {
      layer: "field",
      title: "Architecture decisions on real projects",
      blocks: [
        {
          kind: "md",
          md: md`**Who decides what.** In an IPP, the developer and its EPC choose the architecture to minimise LCOE within the PPA's **minimum functional specification** (MEWRE/KAPP technical schedule) and the grid code. MEWRE's leverage is in what the RFP requires (grid-code compliance at POI, reactive capability, availability, SCADA, high-temperature ratings, standards list) and in the review rights during design. The Owner's Engineer (for MEWRE) and the Lenders' Technical Advisor (for the banks) both review the design — often with different priorities.

**Key design documents to request:** PV array layout and block design; string sizing calculation with temperature basis; cable sizing and voltage-drop calculations; inverter datasheet with temperature derating curve; DC/AC ratio justification with PVsyst clipping; tracker design report (wind tunnel study, stow logic, IEC 62817 certificate); earthing study (soil resistivity, step/touch voltages per IEEE 80); lightning risk assessment (IEC 62305); single-line diagrams; MV skid and transformer specs (IEC 60076, temperature rise at Kuwait ambient); protection coordination.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **String too long** after a module change: the new module has a higher Voc but the string count was not recalculated. Inverters trip or are damaged on the first cold morning.
- **TMY minimum used for string sizing** instead of record minimum — TMY files smooth out cold extremes.
- **Inverter derating ignored**: the inverter's full-power rating holds only up to, e.g., 35–40 °C; at 50 °C it may deliver 85–90 %. The DC/AC ratio was optimised as if the inverter never derates.
- **Tracker rows on uneven ground** without terrain-aware backtracking or adjusted pile heights; persistent morning shading.
- **Dry sand earthing**: earth resistance far above design because soil resistivity was measured after rain or not measured at all.
- **POI capacity confusion**: the PPA contracts MWac at the POI, but the design counts inverter MWac before transformer and cable losses and reactive-power headroom.`,
        },
        {
          kind: "checklist",
          title: "PM design-review checks on plant architecture",
          items: [
            "String sizing uses record minimum ambient from a long-term station, with the module's actual Voc coefficient; N rounded down",
            "Hot-day Vmp × N above inverter min MPPT voltage at full power at the hottest cell temperature",
            "Inverter and transformer temperature derating curves applied in PVsyst at Kuwait ambient",
            "DC/AC ratio justified by an economic run (energy, clipping, capex), not a rule of thumb",
            "AC capacity at POI meets contracted MW after losses and with reactive capability at 50 °C",
            "Tracker: IEC 62817 certificate, wind tunnel report, stow logic, backtracking incl. terrain, availability guarantee",
            "Earthing: soil resistivity survey (dry season), step/touch voltage calc, lightning risk assessment",
            "Single connector family per string; cable ratings at buried-ground temperature",
          ],
        },
        {
          kind: "ask",
          title: "Ask the EPC / designer",
          items: [
            "What minimum temperature did you use for string sizing, from which station, and over how many years?",
            "At what ambient does the inverter start derating, and what is its output at 50 °C and 55 °C?",
            "Show the PVsyst clipping loss by month at your DC/AC ratio, and the economic optimisation behind it.",
            "How does the tracker controller handle backtracking on our terrain, and what is the stow wind speed?",
            "How do you guarantee AC capacity at the POI including transformer losses and reactive-power headroom?",
          ],
        },
        { kind: "scenario", scenario: "m02-s4" },
        {
          kind: "feynman",
          prompt: "Explain to a colleague from the transmission department why a PV plant is deliberately built with 30 % more DC panels than inverter capacity, and why some energy is thrown away on purpose.",
          keyPoints: [
            "Modules rarely reach nameplate in the field (heat, soiling, losses)",
            "Inverters and grid connection are costly and sized in MWac",
            "Extra DC raises output in mornings, evenings and hazy hours, using AC assets more",
            "Clipping wastes a little midday energy, but the net is positive if marginal energy pays for marginal DC",
            "Result: flatter output and lower cost per MWh",
          ],
        },
        { kind: "sources", refs: ["iec-62548", "iec-62817", "ifc-utility-pv-guide", "pvsyst-help"] },
      ],
    },
  ],
  quiz: [
    {
      id: "m02-l04-q1",
      type: "label",
      prompt: md`Label the components on the PV plant diagram.`,
      diagram: "pv-plant",
      markers: [
        { id: "module", answer: "PV module" },
        { id: "string", answer: "String" },
        { id: "combiner", answer: "Combiner box" },
        { id: "inverter", answer: "Inverter" },
        { id: "mv-transformer", answer: "LV/MV step-up transformer" },
        { id: "rmu", answer: "Ring main unit" },
        { id: "collector-substation", answer: "Collector substation" },
        { id: "hv-transformer", answer: "HV power transformer" },
        { id: "grid", answer: "Transmission grid (POI)" },
      ],
      options: [
        "PV module",
        "String",
        "Combiner box",
        "Inverter",
        "LV/MV step-up transformer",
        "Ring main unit",
        "Collector substation",
        "HV power transformer",
        "Transmission grid (POI)",
        "Battery rack",
        "Diesel generator",
      ],
      explanation: md`DC side: modules in series form strings, paralleled in combiners, feeding the inverter. AC side: LV/MV transformer and RMU on the skid, MV collector cables to the collector substation, HV transformer to the grid at the point of interconnection.`,
      concepts: ["m02.inverter-architecture", "m02.bos-earthing"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m02-l04-q2",
      type: "numeric",
      prompt: md`A module has $V_{oc,STC} = 49.8$ V and $\beta_{V_{oc}} = -0.26$ %/°C. With minimum design cell temperature −2 °C and a 1500 V system, what is the maximum number of modules per string?`,
      answer: 28,
      tolerance: { abs: 0 },
      unit: "modules",
      explanation: md`$V_{oc}(-2) = 49.8 \times [1 + 0.0026 \times 27] = 49.8 \times 1.0702 = 53.30$ V. $1500/53.30 = 28.14$ → **28** (round down). String Voc = 1,492 V.`,
      concepts: ["m02.string-sizing"],
      difficulty: 2,
    },
    {
      id: "m02-l04-q3",
      type: "mcq",
      prompt: md`What is the main purpose of backtracking on a single-axis tracker?`,
      options: [
        "To protect the tracker from high wind",
        "To avoid row-to-row beam shading at low sun angles by rotating modules toward horizontal",
        "To clean the modules by tilting them steeply",
        "To maximise the angle of incidence at noon",
      ],
      answer: 1,
      explanation: md`At low sun, true tracking would cast shadows on the next row. Because shading even part of a cell row triggers bypass diodes and large losses, it is better to accept a worse incidence angle and keep rows unshaded.`,
      concepts: ["m02.tracker-vs-fixed"],
      difficulty: 1,
    },
    {
      id: "m02-l04-q4",
      type: "multi",
      prompt: md`Which factors increase annual clipping losses for a given DC/AC ratio? Select all.`,
      options: [
        "Switching from fixed tilt to single-axis trackers",
        "Adding bifacial modules",
        "Higher inverter temperature derating in summer",
        "Higher module soiling losses",
      ],
      answer: [0, 1, 2],
      explanation: md`Trackers flatten and widen the profile (more hours near peak), bifacial adds DC power at midday, and inverter derating lowers the AC ceiling. Soiling reduces DC power and therefore *reduces* clipping (a reason soiling losses are partly hidden on high-ratio plants).`,
      concepts: ["m02.dc-ac-ratio", "m02.tracker-vs-fixed"],
      difficulty: 2,
    },
    {
      id: "m02-l04-q5",
      type: "decision",
      prompt: md`You are the MEWRE PM. During design review, the EPC proposes 28-module strings (with a module whose 27-string limit at 0 °C was computed in this lesson), saying "Kuwait never gets cold enough to matter, and the inverter has overvoltage protection".`,
      options: [
        { text: "Accept: inverter overvoltage protection will handle any cold morning.", score: 0, feedback: "Overvoltage on DC inputs can damage the inverter and exceeds module/connector certification. Protection trips do not make it safe." },
        { text: "Reject unless the EPC provides record-minimum temperature data from a long-term station proving cell temperature never falls below the threshold, with margin, and confirms all component ratings; otherwise 27 modules.", score: 1, feedback: "Correct: the burden of proof is on the EPC, with a clear technical criterion." },
        { text: "Accept 28 but require a longer warranty on inverters.", score: 0.2, feedback: "Warranties do not fix a non-compliant design or safety risk." },
      ],
      explanation: md`String length beyond the voltage rating breaches IEC 62548 design requirements and component certifications. It is a classic cost-saving push; a PM should hold the line on safety-critical limits.`,
      concepts: ["m02.string-sizing"],
      difficulty: 2,
    },
    {
      id: "m02-l04-q6",
      type: "mcq",
      prompt: md`Compared with central inverters, string inverters at a GW-scale desert plant mainly offer:`,
      options: [
        "Lower capex per watt in all cases",
        "Smaller failure impact (≈ 0.3 MW per fault) and finer MPPT granularity, at the cost of more distributed equipment exposed to heat and sand",
        "No need for MV transformers",
        "Immunity to high-temperature derating",
      ],
      answer: 1,
      explanation: md`String inverters still feed MV skids via LV AC cabling. Their advantages are granular availability and MPPT; their exposure to direct sun and dust requires attention to enclosure rating and derating.`,
      concepts: ["m02.inverter-architecture"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "m02-l04-f1", front: "String sizing upper limit condition", back: "Voc at the coldest energised cell temperature (clear winter dawn) × N ≤ 1500 V; round down.", concepts: ["m02.string-sizing"] },
    { id: "m02-l04-f2", front: "String sizing lower limit condition", back: "Vmp at hottest cell temperature × N ≥ inverter minimum MPPT voltage at full power.", concepts: ["m02.string-sizing"] },
    { id: "m02-l04-f3", front: "Typical utility DC/AC ratio", back: "≈ 1.15–1.40 (often 1.25–1.35 for Gulf tracker plants)", concepts: ["m02.dc-ac-ratio"] },
    { id: "m02-l04-f4", front: "GCR formula", back: md`$GCR = L/p$ (collector width / row pitch); trackers ≈ 0.28–0.40`, concepts: ["m02.tracker-vs-fixed"] },
    { id: "m02-l04-f5", front: "Single-axis tracker gain at ~29°N", back: "≈ 15–25 % more specific yield than optimal fixed tilt (site-dependent).", concepts: ["m02.tracker-vs-fixed"] },
    { id: "m02-l04-f6", front: "Backtracking", back: "Rotating trackers toward horizontal at low sun to avoid row-to-row shading.", concepts: ["m02.tracker-vs-fixed"] },
    { id: "m02-l04-f7", front: "Fuse/cable design current for a string", back: md`$\ge 1.25 \times I_{sc}$ (IEC 62548), plus margin for bifacial gain.`, concepts: ["m02.string-sizing", "m02.bos-earthing"] },
    { id: "m02-l04-f8", front: "Contents of an MV skid", back: "Inverter(s), LV/MV transformer, RMU (MV switchgear), auxiliary supply, SCADA/comms cabinet.", concepts: ["m02.inverter-architecture"] },
  ],
  scenarios: [
    {
      id: "m02-s4",
      title: "Cold morning trip",
      context: md`It is January, eight months into commissioning of a 500 MW PV IPP. Overnight the minimum temperature at site was unusually low. At 07:10 the SCADA shows 14 central inverters tripped on DC overvoltage across the plant. You are the MEWRE PM attending the weekly site meeting that morning.`,
      start: "a",
      concepts: ["m02.string-sizing", "m02.design-review"],
      nodes: {
        a: {
          md: md`The EPC's site manager says: "Unusual weather. The inverters reset automatically at 08:00. No action needed." What do you ask?`,
          choices: [
            { text: "Request the string configuration of the tripped inverters, the measured cell/ambient temperature at 07:00, and the string-sizing calculation with its temperature basis.", next: "b", score: 10, feedback: "You treat a trip as a design signal, not weather." },
            { text: "Accept the explanation — automatic reset worked.", next: "c", score: 2, feedback: "Repeated DC overvoltage stresses inverter input stages and voids certifications." },
          ],
        },
        b: {
          md: md`The data show the tripped inverters are in blocks where, after a module supply change, strings of 28 modules were installed; the rest of the plant uses 27. The string-sizing calculation used +8 °C minimum from a TMY file. What do you require?`,
          choices: [
            { text: "Issue a non-conformance: re-string affected blocks to 27 modules (or demonstrate compliance), inspect inverter input stages, update the design basis to record-minimum temperature, and check whether the module change was approved with re-calculation.", next: "d", score: 10, feedback: "Root cause, corrective action and process fix — and checks the change-control failure." },
            { text: "Ask the EPC to set the inverters to start later in the morning.", next: "d", score: 4, feedback: "Inverter start-up delay does not reduce open-circuit voltage at the DC input; the array is energised by sunlight regardless." },
          ],
        },
        c: {
          md: md`Two weeks later, one inverter suffers a DC input failure on another cold morning, taking 4.4 MW offline for 6 weeks pending parts. The EPC claims it is an OEM warranty issue; the OEM says overvoltage voided it. What now?`,
          choices: [
            { text: "Go back and do the root-cause investigation you should have started two weeks ago.", next: "b", score: 5, feedback: "Late, but correct." },
          ],
        },
        d: {
          md: md`The EPC agrees to re-string about 3 % of the plant. They ask whether this delays the capacity test. What do you record?`,
          choices: [
            { text: "Record the NCR, the corrective action schedule, the impact on the commissioning plan, and a lesson learned: every equipment change must trigger a recalculation of string length with the design minimum temperature.", score: 10, feedback: "Clean, auditable, and prevents recurrence on the next IPP." },
            { text: "Let it go informally to keep relations good.", score: 2, feedback: "A safety-related design non-conformance must be formally recorded." },
          ],
        },
      },
    },
  ],
};

export default lesson;
