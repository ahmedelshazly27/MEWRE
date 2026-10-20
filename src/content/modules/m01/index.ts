import { md, type Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import l06 from "./l06";
import exam from "./exam";
import glossary from "./glossary";
import formulas from "./formulas";
import references from "./references";

const cheatSheet = md`# M1 Energy & Power Fundamentals: cheat sheet

## Units and conversions

| Item | Value | Note |
|---|---|---|
| 1 kWh | 3,600 kJ = 3,412.14 BTU | Exact |
| 1 MWh | 3.6 GJ | Exact |
| 1 MMBtu | 1.055 GJ | |
| Crude oil | ≈ 5.7 GJ/bbl LHV | ≈ 6.1 GJ/bbl HHV |
| Heavy fuel oil | ≈ 40.5 GJ/t LHV | |
| HHV/LHV ratio | gas ≈ 1.11, oil ≈ 1.06 | Always state the basis |
| Hours per year | 8,760 | 8,784 in a leap year |
| Exchange rate assumed | 1 KWD ≈ 3.25 USD | |

## Thermodynamics and heat rate

| Quantity | Formula | Where |
|---|---|---|
| Carnot limit | $\eta_\text{Carnot} = 1 - T_C/T_H$ | Temperatures in kelvin |
| Combined-cycle efficiency | $\eta_\text{CC} \approx \eta_\text{GT} + \eta_\text{ST}(1-\eta_\text{GT})$ | GT topping + steam bottoming |
| Heat rate (SI) | $\text{HR} = 3600/\eta$ | kJ/kWh |
| Heat rate (imperial) | $\text{HR}_\text{BTU} = 3412.14/\eta$ | BTU/kWh |
| Fuel burned | $\text{Fuel} = E\cdot\text{HR}/\text{LHV}$ | Fuel-savings estimates |

- **Carnot example:** steam at 540 °C with a 45 °C sink gives a 60.9% limit; real plants achieve 33–40%.
- **Fuel per MWh:** at 10,500 kJ/kWh, ≈ 1.84 bbl of crude per MWh.
- **CCGT heat rate:** 5,700–6,550 kJ/kWh.
- **OCGT / oil-fired steam heat rate:** 9,500–11,000 kJ/kWh.
- **Aged, hot or part-load units:** up to ~12,900 kJ/kWh.
- **GT derating:** output falls ≈ 0.5–0.8% per °C above 15 °C.
- **Savings rule:** use the **marginal** heat rate for fuel savings, and state LHV/HHV and gross/net.

## AC power

| Quantity | Formula | Where |
|---|---|---|
| RMS voltage | $V_\text{rms} = V_m/\sqrt2$ | Sinusoid |
| Impedance | $Z = R + jX$ | |
| Inductive reactance | $X_L = 2\pi fL$ | |
| Capacitive reactance | $X_C = 1/(2\pi fC)$ | |
| Complex power | $\underline S = \underline V\,\underline I^* = P + jQ$ | |
| Apparent power | $\lvert S\rvert = \sqrt{P^2+Q^2}$ | |
| Power factor | $\text{PF} = P/S$ | |
| PF correction | $Q_C = P(\tan\varphi_1 - \tan\varphi_2)$ | Capacitor bank sizing |
| Voltage drop | $\Delta V \approx (RP + XQ)/V$ | On HV, X dominates, so Q controls voltage |

- **Reactive power at PF 0.95:** Q = 0.329 P.
- **Reactive power at PF 0.9:** Q = 0.484 P.
- **Reactive power at PF 0.8:** Q = 0.75 P.
- **Capacitor output:** $Q \propto V^2$ (collapses when voltage sags).
- **Inverter / STATCOM output:** $Q \propto V$.
- **Inverter sizing:** inverter MVA ≥ $\sqrt{P^2 + Q^2}$ at the POC plus transformer and cable Mvar, **at 50 °C**.

## Three-phase systems

| Quantity | Formula | Where |
|---|---|---|
| Star voltage / current | $V_L = \sqrt3 V_\text{ph}$, $I_L = I_\text{ph}$ | Star (Y) connection |
| Delta voltage / current | $V_L = V_\text{ph}$, $I_L = \sqrt3 I_\text{ph}$ | Delta connection |
| Active power | $P = \sqrt3 V_L I_L\cos\varphi$ | Balanced load |
| Line current | $I = S/(\sqrt3 V_L)$ | Cable and switchgear sizing |

| Voltage (kV) | Current per MVA (A) | Note |
|---|---|---|
| 400 | 1.44 | Transmission |
| 132 | 4.37 | |
| 33 | 17.5 | PV collector level |
| 11 | 52.5 | |
| 0.8 | 722 | Inverter output |

- **Neutral current:** the phasor sum of the three phase currents.
- **Voltage unbalance factor:** VUF $= V_2/V_1$ (≈ maximum deviation / average).
- **Unbalance planning limit:** ≈ 1.4–2%.

## Per unit, transformers and faults

| Quantity | Formula | Where |
|---|---|---|
| Base impedance | $Z_\text{base} = V^2/S$ | |
| Base current | $I_\text{base} = S/(\sqrt3 V)$ | |
| Change of base | $z_\text{new} = z_\text{old}(S_\text{new}/S_\text{old})(V_\text{old}/V_\text{new})^2$ | Nameplate to system base |
| Transformer losses | $P_0 + P_k(S/S_r)^2$ | No-load + load losses |
| Fault current | $I_\text{sc} = I_r/z$ | |
| Fault level | $S_\text{sc} = S_\text{base}/z_\text{total}$ | |
| Grid impedance | $z_\text{grid} = S_\text{base}/S_\text{sc,grid}$ | From the declared fault level |

| Voltage on 100 MVA base | $Z_\text{base}$ | Note |
|---|---|---|
| 400 kV | 1,600 Ω | |
| 132 kV | 174.24 Ω | |
| 33 kV | 10.89 Ω | |

- **No-load loss:** $P_0$ runs 8,760 h a year on PV plants, so capitalise losses in tender evaluation.
- **Cooling ratings:** ONAN/ONAF, e.g. 200/250 MVA (fans add +25%).
- **Ambient basis:** IEC 60076-2 normal ambient is 40/30/20 °C, so **specify the site ambient** for Kuwait.
- **Rough derating rule:** ≈ 1% per K of ambient excess.
- **Voltage factor:** IEC 60909 uses c = 1.1.
- **Synchronous machine fault contribution:** 4–7 pu.
- **Inverter fault contribution:** 1.0–1.5 pu.

## Capacity and load

| Quantity | Formula | Where |
|---|---|---|
| Capacity factor | $\text{CF} = E/(P\times8760)$ | Always ask: **AC or DC?** |
| Load factor | $\text{LF} = P_\text{avg}/P_\text{peak}$ | |
| Net load | $P_\text{net} = P_\text{load} - P_\text{PV} - P_\text{wind}$ | |

- **DC capacity factor:** specific yield $Y_f$ (kWh/kWp) / 8,760.
- **AC capacity factor:** DC CF × DC/AC ratio.
- **Diversity factor:** DF = Σ individual peaks / coincident peak.
- **PV capacity credit:** falls as the net peak moves into the evening.

| Plant | Capacity factor | Note |
|---|---|---|
| Kuwait tracker PV | 24–32% | AC basis |
| Shagaya wind | 45.2% / 42.1% | |
| CCGT | 50–85% | |
| Peaker | 5–20% | |

## Kuwait numbers (sourced, see references)

| Item | Value | Note |
|---|---|---|
| Summer peak | 17,640 MW (2024), 17,610 MW (2025), 17,540 MW (2026) | MEWRE |
| Installed vs reliable at peak | ~21 GW vs ~17 GW | Rystad |
| Generation mix | ~62% gas / ~36% oil / ~2% RE | Third-party |
| Load growth | ~1 GW of new connections per year | |
| GCCIA imports | 500 MW in summer 2024 | ~KWD 161–169 m approved for 2025 |
| Shagaya Zone 1 | 1.1 GW PV IPP, 30-yr PPA | IPP builds the 400 kV substation |
| Grid link | Shagaya–Al-Wafra 400 kV OHTL, KD 48.6 m | March 2026 |
| BESS plan | 1–1.5 GW / 4–6 GWh | |

- **Intermediate EHV level and 132/33/11 kV levels** (verify).
- **50 Hz frequency band** (verify).
- **GCCIA link details** (verify).
- **Winter peak** (verify).
- **Annual TWh** (verify).
- **Fleet heat rate** (verify).

## Frequency and system strength

| Quantity | Formula | Where |
|---|---|---|
| Synchronous speed | $n_s = 120f/p$ | 3,000 rpm for 2-pole at 50 Hz |
| Inertia constant | $H = E_k/S$ | Thermal 4–9 s; inverter 0 |
| Swing equation | $(2H/f_0)\,df/dt = P_m - P_e$ | |
| ROCOF | $\text{ROCOF} = \Delta P f_0/(2\sum HS)$ | Loss of infeed |
| Droop | $\Delta P = -(1/R)(\Delta f/f_0)P_r$ | 4% droop → 10% output per 0.2 Hz |
| Short-circuit ratio | $\text{SCR} = S_\text{sc}/P_\text{IBR}$ | At the POC |

- **Response timeline:** inertia (0–2 s) → FFR (BESS) → primary droop (2–30 s) → AGC (30 s–15 min) → tertiary.
- **Last resort:** UFLS (under-frequency load shedding).
- **SCR ≥ 3:** strong grid.
- **SCR 2–3:** weak grid.
- **SCR < 2:** very weak, so require EMT studies, grid-forming inverters or synchronous condensers.

## PM questions to always ask

1. **Basis?** AC/DC, P50/P90, LHV/HHV, gross/net, ISO/site.
2. **At 50 °C?** Inverter MVA, transformer rises, cable ampacity, GT output.
3. **At which hour?** Peak contribution, marginal plant.
4. **Declared by whom?** Fault level and grid-code settings, from MEWRE Transmission in writing.
5. **Proven how?** FAT, heat-run, summer re-test, validated EMT models.
`;

const mod: Module = {
  id: "m01",
  number: 1,
  title: "Energy & Power Fundamentals",
  titleAr: "أساسيات الطاقة والقدرة الكهربائية",
  summary:
    "The power-engineering core a renewable PM uses every day: energy vs power and heat rate (and how solar MWh become barrels of fuel saved), AC and reactive power, three-phase systems, per unit, transformers and fault levels, capacity factor and Kuwait's summer load curve, and how frequency, inertia and system strength change as inverter-based plants join the grid.",
  whyItMatters:
    "Every document you will review at MEWRE — a PV yield report, an SLD, a transformer datasheet, a grid study, a fuel-savings memo for the Minister — rests on these fundamentals. Kuwait's 50 °C summer is simultaneously the system peak and the hardest operating condition for inverters, transformers, cables and gas turbines, so a PM who can check ratings and claims at that design point (and catch AC/DC, LHV/HHV and marginal-vs-average errors) protects 30-year assets and the Ministry's credibility. This module gives you the numbers, the reasoning and the questions to ask.",
  competencies: ["engineering", "grid", "context"],
  prerequisites: [],
  estimatedHours: 9,
  lessons: [l01, l02, l03, l04, l05, l06],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
