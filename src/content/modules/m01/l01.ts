import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m01-l01",
  title: "Energy vs Power, Thermodynamics and Heat Rate",
  summary:
    "MW vs MWh, the first and second laws, Carnot, Rankine and combined-cycle efficiency, heat rate in kJ/kWh and BTU/kWh, and how to turn solar MWh into barrels of fuel that Kuwait can export instead of burn.",
  minutes: 60,
  objectives: [
    "You can distinguish power (MW) from energy (MWh) and convert between MWh, GJ, BTU and barrels without error.",
    "You can explain, using the first and second laws, why a thermal plant wastes 40–65% of its fuel and why Kuwait's heat makes it worse.",
    "You can compute heat rate from efficiency (and back) in both kJ/kWh and BTU/kWh, stating LHV/HHV and gross/net basis.",
    "You can calculate the fuel and money a PV plant displaces, and challenge a fuel-savings claim that uses the wrong heat rate.",
  ],
  concepts: [
    {
      id: "m01.energy-vs-power",
      name: "Energy vs power",
      description: "Power is the rate of energy transfer (MW); energy is power integrated over time (MWh). Contracts pay for energy; grids and equipment are limited by power.",
      competency: "engineering",
      related: ["m01.capacity-factor", "m05.power-energy"],
    },
    {
      id: "m01.thermal-efficiency",
      name: "Thermal cycle efficiency",
      description: "First-law energy balance, second-law (Carnot) limit, and real Rankine, Brayton and combined-cycle efficiencies, including the effect of high ambient temperature.",
      competency: "engineering",
      related: ["m01.heat-rate", "m03.rankine-efficiency"],
    },
    {
      id: "m01.heat-rate",
      name: "Heat rate",
      description: "Fuel energy input per kWh of electricity (kJ/kWh or BTU/kWh); the inverse of efficiency. Lower is better.",
      competency: "engineering",
      related: ["m01.fuel-displacement", "m00.fuel-mix-heat-rate"],
    },
    {
      id: "m01.fuel-displacement",
      name: "Fuel displacement by renewables",
      description: "Each renewable MWh avoids the fuel the marginal thermal unit would have burned — in Kuwait, often oil or LNG with a high export or import value.",
      competency: "context",
      related: ["m01.load-curve-kuwait", "m00.displaced-fuel-value", "m00.economic-vs-financial"],
    },
    {
      id: "m01.lhv-hhv",
      name: "LHV vs HHV and gross vs net",
      description: "Heating value bases differ by the latent heat of water vapour (~10% for gas, ~6% for oil); gross output includes auxiliaries, net does not. Mixing bases corrupts comparisons.",
      competency: "engineering",
    },
  ],
  sections: [
    // ================================================================ THEORY
    {
      layer: "theory",
      title: "Energy, power and the laws that limit thermal plants",
      blocks: [
        {
          kind: "md",
          md: md`### Power is a rate, energy is an amount

Your Vanderlande instinct is right: a conveyor motor's **kW** rating tells you how hard it can push; the **kWh** on the meter tells you how much work it did. The grid is the same at a scale of 10⁶:

- **Power** $P$ — watts, kW, MW, GW. What a generator can deliver *now*; what a cable or transformer must carry; what a grid code limits (ramp rates in MW/min, export limits in MW).
- **Energy** $E$ — Wh, kWh, MWh, GWh, TWh, or joules. What a PPA pays for (fils/kWh), what fuel is burned to make, what a yield report predicts.

For a time-varying output, energy is the area under the power curve:`,
        },
        { kind: "equation", formula: "m01-energy-power" },
        {
          kind: "md",
          md: md`**Conversion table you must know cold**

| From | To | Multiply by |
|---|---|---|
| 1 kWh | kJ | 3,600 |
| 1 MWh | GJ | 3.6 |
| 1 kWh | BTU | 3,412.14 |
| 1 BTU | kJ | 1.05506 |
| 1 MMBtu | GJ | 1.05506 |
| 1 barrel crude (LHV, typical) | GJ | ≈ 5.7 (≈ 6.1 HHV) |
| 1 tonne heavy fuel oil (LHV) | GJ | ≈ 40.5 |
| 1 tonne LNG (LHV) | GJ | ≈ 49 |
| 1 TWh | MWh | 1,000,000 |

Common traps: "MW per hour" is meaningless (unless you mean a ramp rate, MW/h); "a 1,100 MW plant produces 1,100 MW a year" is a unit error — it produces roughly 2,500,000 MWh a year at a 26% capacity factor (lesson 5).`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why a PM must be fussy about units",
          md: md`Tariffs are in **fils/kWh** or **USc/kWh**, liquidated damages for delay may be per **MW** per day, performance guarantees are in **MWh** or **PR %**, and fuel prices are per **barrel** or **MMBtu**. Every cross-check you will do — "does this savings figure make sense?", "is this LD cap proportionate?" — is a unit conversion first. One slipped factor of 1,000 (kW vs MW) in a ministerial briefing is remembered for years.`,
        },
        {
          kind: "md",
          md: md`### First law: energy is conserved

A thermal power station is a heat engine. Fuel chemical energy becomes heat $Q_\text{in}$ in a boiler or combustor; part becomes shaft work $W_\text{net}$ that drives the generator; the rest $Q_\text{out}$ leaves through the condenser cooling water, the stack and radiation.`,
        },
        { kind: "equation", formula: "m01-first-law" },
        { kind: "equation", formula: "m01-efficiency" },
        {
          kind: "md",
          md: md`### Second law: you cannot convert all heat into work

The second law says heat flows spontaneously only from hot to cold, and a cyclic engine must reject some heat to a colder sink. The best any engine operating between a source at $T_H$ and a sink at $T_C$ (in **kelvin**) can do is the Carnot efficiency:`,
        },
        { kind: "equation", formula: "m01-carnot" },
        {
          kind: "md",
          md: md`Worked intuition:

| Cycle | $T_H$ | $T_C$ | Carnot limit | Real net efficiency (LHV) |
|---|---|---|---|---|
| Subcritical oil/gas steam (Rankine) | 540 °C = 813 K | 45 °C condenser = 318 K | 60.9% | 33–40% |
| Gas turbine firing temperature (Brayton), ISO day | ~1,500 °C = 1,773 K | 15 °C = 288 K | 83.8% | 35–42% (open cycle) |
| Same gas turbine, Kuwait summer | 1,773 K | 50 °C = 323 K | 81.8% | lower output, heat rate +5–8% |
| Combined cycle (GT + HRSG + steam) | 1,773 K | ~318–323 K | ~82% | 55–62% |

Real plants fall well short of Carnot because of irreversibilities: finite temperature differences in heat exchangers, friction, pressure losses, incomplete expansion, stack losses and auxiliary consumption (pumps, fans, cooling — 3–8% of gross output).

### Rankine, Brayton and combined cycles

- **Rankine (steam) cycle**: water is pumped to high pressure, boiled and superheated in a boiler, expanded through a steam turbine, condensed and pumped back. Kuwait's older large stations (for example Doha West, Az-Zour South, Sabiya — the largest plants in the WRI listing at roughly 2.5–5.8 GW each) were built largely around oil-fired steam units, many also supplying desalination. Efficiency is capped by maximum steam temperature (metallurgy) and by the condenser temperature, which tracks Gulf sea-water temperature (above 30 °C in summer).
- **Brayton (gas turbine) cycle**: air is compressed, fuel burned at high temperature, hot gas expanded through a turbine. Simple-cycle (open-cycle, **OCGT**) units start fast (10–30 min) and serve peaks, but exhaust leaves at 550–650 °C — wasted heat.
- **Combined cycle (CCGT)**: a heat-recovery steam generator (**HRSG**) uses the GT exhaust to raise steam for a bottoming Rankine cycle.`,
        },
        { kind: "equation", formula: "m01-ccgt-efficiency" },
        {
          kind: "callout",
          tone: "why",
          title: "Why Kuwait's heat hurts thermal plants exactly when demand peaks",
          md: md`A gas turbine is a constant-**volume** machine: hot air is less dense, so mass flow and output fall — typically 0.5–0.8% of ISO output per °C above 15 °C. A 250 MW (ISO) GT losing 0.6%/°C delivers about 250 × (1 − 0.006 × 35) ≈ 198 MW at 50 °C, with a worse heat rate. Condensers run hotter, so steam units also lose output. Kuwait's peak (≈ 17.6 GW in 2024) arrives on the hottest afternoons, when the ~21 GW installed fleet can reliably deliver only about 17 GW. PV output, by contrast, is high at those hours (though PV also loses ~0.3–0.4%/°C of cell temperature — module 2).`,
        },
        {
          kind: "md",
          md: md`### Heat rate: the plant engineer's efficiency

Utilities and OEMs rarely quote efficiency; they quote **heat rate** — fuel energy in per kWh out. Because 1 kWh = 3,600 kJ:`,
        },
        { kind: "equation", formula: "m01-heat-rate" },
        { kind: "equation", formula: "m01-heat-rate-btu" },
        {
          kind: "md",
          md: md`| Technology (new, ISO, LHV net) | Efficiency | Heat rate kJ/kWh | Heat rate BTU/kWh |
|---|---|---|---|
| H/J-class CCGT | 60–63% | 5,700–6,000 | 5,400–5,700 |
| F-class CCGT | 55–58% | 6,200–6,550 | 5,900–6,200 |
| Open-cycle GT (heavy duty) | 33–38% | 9,500–10,900 | 9,000–10,300 |
| Oil-fired subcritical steam (older Gulf units) | 33–38% | 9,500–10,900 | 9,000–10,300 |
| Same units, aged, part load, 50 °C | 28–33% | 10,900–12,900 | 10,300–12,200 |

Three basis traps, all common in bid documents and consultant reports:

1. **LHV vs HHV.** Higher heating value includes the latent heat recovered by condensing the water in the flue gas; lower heating value does not. For natural gas HHV ≈ 1.11 × LHV; for oil ≈ 1.06×. Turbine OEMs quote LHV (looks better); US EIA statistics and gas contracts (MMBtu) are HHV.
2. **Gross vs net.** Net = gross − auxiliary load. Net is what the grid sees.
3. **ISO vs site, full vs part load.** Guarantee heat rates are at ISO (15 °C, 60% RH, sea level) and base load. Part-load operation (common when PV pushes thermal units down at midday) can worsen heat rate by 5–15%.`,
        },
        {
          kind: "md",
          md: md`### From MWh to fuel, money and CO₂

The fuel a block of energy needs (or saves) is simply:`,
        },
        { kind: "equation", formula: "m01-fuel-burn" },
        { kind: "equation", formula: "m01-co2-emissions" },
        {
          kind: "callout",
          tone: "kuwait",
          title: "Kuwait: why every solar MWh is a fuel decision",
          md: md`- Kuwait's power is more than 99% fossil-fired; one third-party estimate puts the mix at about 62% gas, 36% oil and ~2% renewables.
- Kuwait burns fuel oil, gasoil and crude for power, mainly in summer, and imported 5.2 Mt of LNG in January–August 2025.
- Fuel for subsidised power cost more than USD 10 bn in 2022, while citizens pay 2 fils/kWh.

So a solar MWh does not just "save CO₂": at the margin it saves a barrel of crude or fuel oil that could be **exported** at world price, or a cargo of LNG that would otherwise be **imported**. That opportunity cost — not the 2 fils tariff — is the economic value of renewables to the State.`,
        },
        { kind: "sources", refs: ["m01-inzonex-atlas", "m01-baker-subsidy", "m01-argus-oilburn-2025", "m01-invezz-rystad-2025", "m01-kt-peak-2026"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "Not in the research brief — check before quoting",
          md: md`No official figure for Kuwait's fleet-average heat rate, fuel burn in barrels per day, or current cost of supply (fils/kWh) was found (older estimates range from 14 to 38 fils/kWh and conflict). The heat rates used in this lesson are typical engineering values for the technology classes, not MEWRE data. Ask the MEWRE Planning / Generation sector for the statistical yearbook values before using numbers in an official memo.`,
        },
      ],
    },
    // ================================================================ APPLIED
    {
      layer: "applied",
      title: "Turning MWh into barrels and dinars",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Fuel displaced by a 1.1 GW Shagaya PV plant",
          given: md`A 1,100 MW (AC) single-axis-tracking PV plant (the size of Shagaya Phase III Zone 1) achieves an AC capacity factor of 26%. Assume its output displaces oil-fired steam and open-cycle GT generation with a marginal heat rate of **10,500 kJ/kWh** (LHV, net). Crude LHV = 5.7 GJ/bbl; export value USD 70/bbl; 1 KWD = 3.25 USD.`,
          steps: [
            { md: md`**Annual energy.** $E = 1{,}100\ \text{MW} \times 8{,}760\ \text{h} \times 0.26 = 2{,}505{,}360\ \text{MWh} \approx 2.51\ \text{TWh}$.` },
            { md: md`**Fuel energy avoided.** $Q = E \times \text{HR} = 2.505\times10^{9}\ \text{kWh} \times 10{,}500\ \text{kJ/kWh} = 2.63\times10^{13}\ \text{kJ} = 26.3\ \text{PJ}$ (26.3 million GJ).` },
            { md: md`**Barrels.** $26{,}306{,}280\ \text{GJ} / 5.7\ \text{GJ/bbl} \approx 4.62$ million bbl per year, about 12,600 bbl/day on average (more in summer).` },
            { md: md`**Value.** $4.615\ \text{m bbl} \times 70 = \text{USD } 323\ \text{m/yr}$, i.e. about KWD 99 m/yr at 3.25 USD/KWD.` },
            { md: md`**Sanity check with CO₂.** Using crude's IPCC factor 0.0733 t/GJ: $26.3\ \text{PJ} \times 0.0733 \approx 1.93$ Mt CO₂ avoided per year (≈ 0.77 t/MWh, typical of oil-fired generation).` },
          ],
          result: md`About **4.6 million barrels (≈ USD 320 m, ≈ KWD 99 m) of crude-equivalent per year**. If the displaced plant were instead a modern CCGT at 6,300 kJ/kWh, the saving would be 6,300/10,500 = 60% of this. The heat-rate assumption dominates the answer — always ask which plant is on the margin.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Fuel burn of a 300 MW oil-fired steam unit",
          given: md`A 300 MW (net) oil-fired steam unit runs at full load with a net efficiency of 37% (LHV). Heavy fuel oil LHV = 40.5 GJ/t. (A 300 MW steam turbine tripping at Az-Zour South in June 2024 triggered rolling cuts — this is the size of unit we are talking about.)`,
          steps: [
            { md: md`Heat rate in SI: $\text{HR} = 3600/\eta$.` },
            {
              md: md`$\text{HR} = 3600 / 0.37 = 9{,}730\ \text{kJ/kWh}$.`,
              hidden: true,
              check: { prompt: "Heat rate in kJ/kWh", answer: 9730, unit: "kJ/kWh", tolerance: { rel: 0.01 } },
            },
            { md: md`In BTU/kWh: $9{,}730 \times 0.9478 \approx 9{,}222\ \text{BTU/kWh}$.` },
            {
              md: md`Fuel energy per hour: $300{,}000\ \text{kWh} \times 9{,}730\ \text{kJ/kWh} = 2.919\times10^{9}\ \text{kJ} = 2{,}919\ \text{GJ/h}$.`,
              hidden: true,
              check: { prompt: "Fuel energy input per hour", answer: 2919, unit: "GJ/h", tolerance: { rel: 0.01 } },
            },
            { md: md`Fuel mass: $2{,}919 / 40.5 \approx 72.1\ \text{t/h}$ of heavy fuel oil — about 1,730 t/day at full load.` },
          ],
          result: md`Heat rate ≈ **9,730 kJ/kWh (9,222 BTU/kWh)**; fuel ≈ **72 t/h of HFO**. One such unit burns roughly 50,000 t of fuel a month in summer — a full medium-size tanker cargo.`,
        },
        {
          kind: "question",
          question: {
            id: "m01-l01-p1",
            type: "numeric",
            prompt: md`A developer claims its 500 MW (AC) PV plant (CF 25%) will save gas otherwise burned in a CCGT with a heat rate of 6,500 kJ/kWh. Gas costs USD 8 per MMBtu (1 MMBtu = 1.055 GJ). Ignoring LHV/HHV differences, what annual fuel cost is avoided, in **USD million**?`,
            answer: 53.97,
            tolerance: { rel: 0.02 },
            unit: "USD m",
            explanation: md`$E = 500 \times 8{,}760 \times 0.25 = 1{,}095{,}000$ MWh $= 1.095\times10^9$ kWh. Fuel energy $= 1.095\times10^9 \times 6{,}500 = 7.12\times10^{12}$ kJ $= 7{,}117{,}500$ GJ. In MMBtu: $7{,}117{,}500/1.055 = 6.75$ million MMBtu. Cost: $6.75\text{ m} \times 8 \approx$ **USD 54 m/yr**. A rigorous review would then ask: is the CCGT really the marginal unit at midday in summer, and are the heat rate (LHV) and gas price (HHV) on the same basis? Converting the HHV-priced gas properly would raise the figure by about 10%.`,
            concepts: ["m01.fuel-displacement", "m01.heat-rate", "m01.lhv-hhv"],
            difficulty: 2,
          },
        },
      ],
    },
    // ================================================================ FIELD
    {
      layer: "field",
      title: "Reading heat rate and fuel-savings claims like a PM",
      blocks: [
        {
          kind: "md",
          md: md`### Where you will meet these numbers

- **Business cases and Council of Ministers memos** for new PV/BESS IPPs: "Project X saves N million barrels". Usually drafted by MEWRE planning staff or a transaction adviser for KAPP.
- **IWPP / CCGT bids** (e.g. the Az-Zour North and Al-Khairan gas IWPPs): guaranteed **net heat rate** at reference conditions, with correction curves for ambient temperature, humidity and fuel; heat-rate liquidated damages or fuel-cost pass-through mechanisms in the ECWPA.
- **Generation dispatch statistics**: the MEWRE generation sector and National Control Centre know which units run at the margin each hour. Your fuel-saving estimate is only as good as that information.
- **Lenders' and consultants' reports** comparing LCOE of PV vs "avoided cost" of thermal.

### How a fuel-savings claim goes wrong

| Error | Effect |
|---|---|
| Uses fleet-average or best-CCGT heat rate instead of the **marginal** unit | Under- or over-states savings by 30–60% |
| Mixes HHV fuel price with LHV heat rate | ~6–11% error |
| Ignores that PV forces thermal units to **part load** (worse heat rate on the units still running) | Overstates savings 5–10% |
| Ignores **spinning reserve** carried to cover PV variability | Overstates savings |
| Counts curtailed or clipped energy | Overstates energy |
| Uses DC MWp × hours instead of AC export | Overstates energy 20–35% |
| Values fuel at the 2 fils/kWh tariff instead of export/import parity | Massively understates the economic value |`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "The 'average' trap",
          md: md`A consultant divides total fuel by total generation and gets, say, 9,000 kJ/kWh, then multiplies PV output by it. But at 13:00 in July the units being backed off are the ones the dispatcher would drop first — often older steam or open-cycle units with heat rates of 10,500–12,000 kJ/kWh — whereas at 13:00 in February only efficient units may be running. Savings should be computed hour by hour against a merit-order or production-cost model (PLEXOS, PROMOD) where possible, or at least with seasonal marginal heat rates agreed with the generation sector.`,
        },
        {
          kind: "checklist",
          title: "PM checklist — any fuel-savings or heat-rate figure",
          items: [
            "Energy basis: AC net export at the point of connection (MWh), P50 or P90, after curtailment and availability.",
            "Heat rate basis stated: LHV or HHV, gross or net, ISO or site conditions, full or part load.",
            "Displaced plant identified: marginal unit by season and hour, not fleet average — source of the data named.",
            "Fuel price basis: export parity (crude/fuel oil) or import parity (LNG), not the retail tariff; currency and exchange rate stated.",
            "Units chain checked end to end: MWh → kWh → kJ → GJ → bbl or MMBtu → USD → KWD.",
            "Order-of-magnitude check: oil-fired generation ≈ 1.8 bbl crude-equivalent per MWh at 10,500 kJ/kWh (10.5 GJ ÷ 5.7 GJ/bbl).",
            "Sensitivity shown for at least two heat rates (CCGT and steam/OCGT).",
          ],
        },
        {
          kind: "ask",
          title: "Ask the consultant / bidder",
          items: [
            "Which units are marginal at 12:00–16:00 in summer and in winter, and what heat rate did you assume for each?",
            "Is your heat rate on LHV or HHV, gross or net, and at what ambient temperature?",
            "Does your savings figure use P50 AC export energy after curtailment, or DC nameplate energy?",
            "What fuel price did you use, and is it export parity, import parity or the domestic tariff?",
            "For the CCGT bid: provide the guaranteed net heat rate and the correction curves for 50 °C ambient and part load at 50%, 75% and 100%.",
          ],
        },
        { kind: "scenario", scenario: "m01-s1" },
        {
          kind: "feynman",
          prompt: "Explain to a senior Ministry of Finance official, without equations, why a 1 GW solar plant 'saves oil' and why the amount depends on which power station it replaces.",
          keyPoints: [
            "Thermal plants turn only about a third to a half of fuel energy into electricity; the rest is waste heat (second law).",
            "Heat rate is fuel per kWh; older oil-fired and open-cycle units need much more fuel per kWh than modern combined cycle.",
            "Solar output reduces the output of whichever thermal unit is marginal at that hour.",
            "In Kuwait the marginal summer fuel is often crude, fuel oil, gasoil or imported LNG.",
            "The value of saved fuel is its export or import price, not the subsidised tariff.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m01-l01-q1",
      type: "mcq",
      prompt: md`A 1,100 MW PV plant runs for a year at a 26% capacity factor. Which statement is correct?`,
      options: [
        "It produces 1,100 MW per year.",
        "It produces about 2.5 TWh per year.",
        "It produces about 286 MWh per year.",
        "It produces 9.6 TWh per year.",
      ],
      answer: 1,
      explanation: md`$1{,}100 \times 8{,}760 \times 0.26 = 2.505$ million MWh = 2.5 TWh. "MW per year" is a unit error (power is already a rate). 9.6 TWh would require running at full output every hour of the year.`,
      concepts: ["m01.energy-vs-power"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m01-l01-q2",
      type: "numeric",
      prompt: md`A CCGT has a guaranteed net heat rate of 6,000 kJ/kWh (LHV). What is its net efficiency, in %?`,
      answer: 60,
      tolerance: { abs: 0.5 },
      unit: "%",
      explanation: md`$\eta = 3600 / \text{HR} = 3600/6000 = 0.60$, i.e. **60% LHV net** — a modern H-class figure at ISO conditions. On HHV it would be about 54%.`,
      concepts: ["m01.heat-rate"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m01-l01-q3",
      type: "numeric",
      prompt: md`Compute the Carnot efficiency limit (%) of a steam cycle with 540 °C superheated steam and a 45 °C condenser.`,
      answer: 60.9,
      tolerance: { abs: 0.5 },
      unit: "%",
      explanation: md`Convert to kelvin: $T_H = 813$ K, $T_C = 318$ K. $\eta = 1 - 318/813 = 0.609$ → **60.9%**. Real subcritical units achieve 33–40% because of irreversibilities and auxiliaries. Using °C directly (1 − 45/540 = 91.7%) is the classic error.`,
      concepts: ["m01.thermal-efficiency"],
      difficulty: 2,
    },
    {
      id: "m01-l01-q4",
      type: "multi",
      prompt: md`Which factors make a gas turbine in Kuwait produce **less** power and/or have a **higher** heat rate in July than at ISO conditions? Select all that apply.`,
      options: [
        "Lower air density at 48–50 °C reduces compressor mass flow.",
        "Higher heat-sink temperature reduces the achievable cycle efficiency.",
        "Operating at part load because PV output pushes the unit down at midday.",
        "The LHV of natural gas is higher in summer.",
        "Compressor fouling from dust between washes.",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`Hot, thin air reduces mass flow and output (≈ 0.5–0.8%/°C above 15 °C); a hotter sink lowers the Carnot ceiling; part-load operation raises heat rate; desert dust fouls compressors. Fuel heating value does not change with season in any meaningful way.`,
      concepts: ["m01.thermal-efficiency", "m01.heat-rate"],
      difficulty: 2,
    },
    {
      id: "m01-l01-q5",
      type: "numeric",
      prompt: md`Convert a heat rate of 10,000 kJ/kWh into BTU/kWh.`,
      answer: 9478,
      tolerance: { rel: 0.01 },
      unit: "BTU/kWh",
      explanation: md`1 BTU = 1.05506 kJ, so divide by 1.05506 (or multiply by 0.9478): **≈ 9,478 BTU/kWh**. Cross-check: efficiency = 3,600/10,000 = 36%, and 3,412.14/0.36 = 9,478.`,
      concepts: ["m01.heat-rate"],
      difficulty: 1,
    },
    {
      id: "m01-l01-q6",
      type: "decision",
      prompt: md`You are the PM. A draft memo to the Minister says the new 1.1 GW PV plant "will save 5.2 million barrels a year", computed with a fleet-average heat rate of 9,000 kJ/kWh, crude LHV 5.7 GJ/bbl and the DC capacity (1,450 MWp) multiplied by the AC capacity factor of 26%. What do you do?`,
      options: [
        {
          text: "Send it — the order of magnitude looks right.",
          score: 0,
          feedback: "The method is wrong in two places that partly cancel (DC capacity with an AC capacity factor overstates energy by ~32%; the fleet-average heat rate is not the marginal one). Right-looking numbers built on wrong methods collapse when Finance checks them.",
        },
        {
          text: "Ask the author to recompute using AC P50 export energy, seasonal marginal heat rates agreed with the generation sector, and to show a CCGT vs steam/OCGT sensitivity; flag the basis (LHV/net) in a footnote.",
          score: 1,
          feedback: "Correct. Energy basis, marginal heat rate and a sensitivity band are what a senior reader needs; the footnote protects the Ministry when Finance checks it.",
        },
        {
          text: "Replace it with the developer's own savings figure from its bid.",
          score: 0.2,
          feedback: "The bidder has an interest in a large number and may use a different basis. Use it as a cross-check, not a substitute.",
        },
        {
          text: "Delete the fuel-savings sentence entirely to avoid risk.",
          score: 0.3,
          feedback: "Fuel displacement is the core economic argument for renewables in Kuwait. Fix it rather than remove it.",
        },
      ],
      explanation: md`Fuel-savings numbers drive political support and Ministry of Finance scrutiny. The defensible method: AC net P50 energy × marginal heat rate (seasonal), with stated LHV/net basis and a sensitivity range.`,
      concepts: ["m01.fuel-displacement", "m01.heat-rate"],
      difficulty: 2,
    },
    {
      id: "m01-l01-q7",
      type: "short",
      prompt: md`Explain the difference between LHV and HHV, and give one example of how mixing them misleads a comparison.`,
      rubric: [
        "HHV includes latent heat of condensing water vapour in combustion products; LHV excludes it.",
        "For natural gas HHV is about 10–11% above LHV; for oil about 6%.",
        "Turbine OEMs usually quote LHV efficiency/heat rate; gas is usually priced per MMBtu HHV.",
        "Example: applying an LHV heat rate to an HHV gas price (or comparing an LHV efficiency with an HHV one) misstates fuel cost or efficiency by ~10%.",
      ],
      modelAnswer: md`HHV (gross calorific value) counts the heat released when the water formed in combustion condenses; LHV (net calorific value) assumes it leaves as vapour, as it does in a real stack. For natural gas HHV ≈ 1.11 × LHV, for oil ≈ 1.06 ×. OEMs quote LHV efficiencies (60% CCGT), while gas is priced per MMBtu HHV and US statistics use HHV. If you multiply an LHV heat rate by an HHV gas price you understate fuel cost by about 10%; if you compare a 60% LHV CCGT with a 54% HHV figure from another source you might wrongly conclude one plant is less efficient.`,
      explanation: md`The heating-value basis is invisible unless stated, yet worth ~10% for gas. Always write "LHV, net, ISO" (or whatever applies) next to any efficiency or heat rate you put in a memo, and convert prices and heat rates to the same basis before multiplying.`,
      concepts: ["m01.lhv-hhv"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m01-l01-f1", front: "1 kWh in kJ and in BTU", back: md`3,600 kJ = 3,412.14 BTU`, concepts: ["m01.energy-vs-power"] },
    { id: "m01-l01-f2", front: "Heat rate from efficiency (SI)", back: md`$\text{HR} = 3600/\eta$ kJ/kWh`, concepts: ["m01.heat-rate"] },
    { id: "m01-l01-f3", front: "Carnot efficiency", back: md`$\eta = 1 - T_C/T_H$ (kelvin!)`, concepts: ["m01.thermal-efficiency"] },
    { id: "m01-l01-f4", front: "Typical new CCGT net heat rate (LHV)", back: "≈ 5,700–6,550 kJ/kWh (55–63% efficiency)", concepts: ["m01.heat-rate"] },
    { id: "m01-l01-f5", front: "Typical oil-fired steam / open-cycle GT heat rate (LHV)", back: "≈ 9,500–11,000 kJ/kWh (33–38%); worse when aged, hot or at part load", concepts: ["m01.heat-rate"] },
    { id: "m01-l01-f6", front: "Fuel burn formula", back: md`$m_\text{fuel} = E \cdot \text{HR} / \text{LHV}$`, concepts: ["m01.fuel-displacement"] },
    { id: "m01-l01-f7", front: "Approx. crude barrels per MWh at 10,500 kJ/kWh", back: "≈ 1.84 bbl/MWh (10.5 GJ ÷ 5.7 GJ/bbl)", concepts: ["m01.fuel-displacement"] },
    { id: "m01-l01-f8", front: "HHV/LHV ratio: natural gas vs oil", back: "Gas ≈ 1.11; oil ≈ 1.06", concepts: ["m01.lhv-hhv"] },
    { id: "m01-l01-f9", front: "GT output loss with ambient temperature (rule of thumb)", back: "≈ 0.5–0.8% of ISO output per °C above 15 °C", concepts: ["m01.thermal-efficiency"] },
    { id: "m01-l01-f10", front: "Which heat rate to use for renewable fuel savings?", back: "The marginal unit's (by season/hour), not the fleet average", concepts: ["m01.fuel-displacement"] },
  ],
  scenarios: [
    {
      id: "m01-s1",
      title: "The fuel-savings slide for the Undersecretary",
      dayInLife: true,
      context: md`Sunday, 09:10. The Undersecretary's office wants a one-slide summary for tomorrow's meeting with the Ministry of Finance on why the 1.1 GW Shagaya Zone 1 PV IPP justifies a 30-year PPA. A junior engineer has drafted it overnight. Headline: **"Saves 6 million barrels of crude a year — USD 600 m."**`,
      start: "a",
      concepts: ["m01.fuel-displacement", "m01.heat-rate", "m01.energy-vs-power"],
      nodes: {
        a: {
          md: md`You open the spreadsheet behind the slide. Energy = 1,450 MWp × 2,200 kWh/kWp = 3.19 TWh. Heat rate = 11,000 kJ/kWh "for oil plants". Crude LHV 5.7 GJ/bbl; price USD 100/bbl. What do you look at first?`,
          choices: [
            { text: "The energy basis — DC kWp × specific yield vs AC P50 export.", next: "b", score: 9, feedback: "Right instinct: energy is the multiplier on everything. 2,200 kWh/kWp is plausible for trackers, but you need AC export after losses, availability and curtailment from the yield report." },
            { text: "The oil price — USD 100 looks high.", next: "b", score: 6, feedback: "Fair to question, but price is a stated assumption that is easy to flex. The energy and heat-rate bases are where hidden errors live." },
            { text: "Nothing — the Undersecretary wants it by noon; send it.", next: "c", score: 0, feedback: "A headline number that Finance can tear apart damages the project's credibility for years." },
          ],
        },
        b: {
          md: md`The yield report gives P50 AC export of 2.51 TWh (CF ≈ 26%). You ask the generation sector which units back down at midday in summer; they say a mix of older steam and open-cycle units, about 10,500 kJ/kWh in summer, but efficient CCGTs at the margin in winter (~6,500 kJ/kWh). How do you present it?`,
          choices: [
            { text: "Show a range: about 2.9 million bbl (if CCGTs were always marginal) to 4.6 million bbl (if steam/OCGT were always marginal), central case about 3.9 million bbl using seasonal marginal heat rates, with the basis in a footnote and a stated export-parity price.", next: "d", score: 10, feedback: "A defensible range with a stated method is what senior readers trust. It also pre-empts Finance's questions." },
            { text: "Use only the 10,500 kJ/kWh figure — it is the summer marginal plant and gives the bigger number.", next: "d", score: 5, feedback: "Partly defensible because PV energy peaks in summer, but presenting only the upper bound invites a challenge. Show the range." },
            { text: "Keep 11,000 kJ/kWh and DC energy — the difference is small.", next: "c", score: 1, feedback: "Combined, the two errors inflate the result by roughly 33%. That is not small." },
          ],
        },
        c: {
          md: md`At the Finance meeting, an economist recomputes the slide on her laptop and finds the DC/AC error. The Undersecretary asks you afterwards how it happened.`,
          choices: [
            { text: "Own it, circulate a corrected one-page note within 24 hours with the method stated, and add a review step for all quantitative briefings.", score: 6, feedback: "Good recovery — but the reputational cost was avoidable with ten minutes of checking." },
            { text: "Blame the junior engineer.", score: 0, feedback: "The PM owns what leaves the team. Blame destroys trust upward and downward." },
          ],
        },
        d: {
          md: md`The Undersecretary likes the range but asks: "Why not just multiply by the tariff to show the value?"`,
          choices: [
            { text: "Explain that the 2 fils/kWh tariff is subsidised; the economic value is the fuel's export or import price, which is what the State actually forgoes.", score: 10, feedback: "Exactly the point the Ministry of Finance needs to hear: the subsidy hides the true value of saved fuel." },
            { text: "Agree and add a tariff-based value line.", score: 2, feedback: "At 2 fils/kWh, 2.5 TWh is only about KWD 5 m — a tiny fraction of the fuel value, and it would undermine the case." },
          ],
        },
      },
    },
  ],
};

export default lesson;
