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
| Quantity | Value |
|---|---|
| 1 kWh | 3,600 kJ = 3,412.14 BTU |
| 1 MWh | 3.6 GJ |
| 1 MMBtu | 1.055 GJ |
| Crude oil | ≈ 5.7 GJ/bbl LHV (≈ 6.1 HHV) |
| Heavy fuel oil | ≈ 40.5 GJ/t LHV |
| HHV/LHV | gas ≈ 1.11, oil ≈ 1.06 |
| Hours per year | 8,760 (8,784 leap) |
| Exchange rate assumed | 1 KWD ≈ 3.25 USD |

## Thermodynamics and heat rate
- $\eta_\text{Carnot} = 1 - T_C/T_H$ (kelvin). Steam 540 °C / 45 °C → 60.9% limit; real 33–40%.
- $\eta_\text{CC} \approx \eta_\text{GT} + \eta_\text{ST}(1-\eta_\text{GT})$.
- $\text{HR} = 3600/\eta$ kJ/kWh; $\text{HR}_\text{BTU} = 3412.14/\eta$.
- Fuel $= E\cdot\text{HR}/\text{LHV}$. At 10,500 kJ/kWh ≈ 1.84 bbl crude per MWh.
- CCGT 5,700–6,550 kJ/kWh; OCGT/oil steam 9,500–11,000; aged/hot/part-load up to ~12,900.
- GT output falls ≈ 0.5–0.8%/°C above 15 °C. Use the **marginal** heat rate for savings, state LHV/HHV, gross/net.

## AC power
- $V_\text{rms} = V_m/\sqrt2$; $Z = R + jX$; $X_L = 2\pi fL$, $X_C = 1/(2\pi fC)$.
- $\underline S = \underline V\,\underline I^* = P + jQ$; $|S| = \sqrt{P^2+Q^2}$; $\text{PF} = P/S$.
- $Q_C = P(\tan\varphi_1 - \tan\varphi_2)$. Q at PF 0.95 = 0.329 P; 0.9 → 0.484 P; 0.8 → 0.75 P.
- Capacitor $Q \propto V^2$; inverter/STATCOM $Q \propto V$.
- $\Delta V \approx (RP + XQ)/V$ → on HV, Q controls voltage.
- Inverter MVA ≥ $\sqrt{P^2 + Q^2}$ at POC + transformer/cable Mvar, **at 50 °C**.

## Three-phase
- Star: $V_L = \sqrt3 V_\text{ph}$, $I_L = I_\text{ph}$. Delta: $V_L = V_\text{ph}$, $I_L = \sqrt3 I_\text{ph}$.
- $P = \sqrt3 V_L I_L\cos\varphi$; $I = S/(\sqrt3 V_L)$.

| kV | A per MVA |
|---|---|
| 400 | 1.44 |
| 132 | 4.37 |
| 33 | 17.5 |
| 11 | 52.5 |
| 0.8 | 722 |

- Neutral current = phasor sum; VUF $= V_2/V_1$ (≈ max deviation / average). Planning limit ≈ 1.4–2%.

## Per unit, transformers, faults
- $Z_\text{base} = V^2/S$; $I_\text{base} = S/(\sqrt3 V)$; on 100 MVA: 400 kV → 1,600 Ω; 132 kV → 174.24 Ω; 33 kV → 10.89 Ω.
- $z_\text{new} = z_\text{old}(S_\text{new}/S_\text{old})(V_\text{old}/V_\text{new})^2$.
- Losses $= P_0 + P_k(S/S_r)^2$; $P_0$ runs 8,760 h on PV plants. Capitalise losses in evaluation.
- ONAN/ONAF e.g. 200/250 MVA (fans +25%). IEC 60076-2 normal ambient 40/30/20 °C → **specify site ambient** for Kuwait (≈ 1%/K excess as a rough derating rule).
- $I_\text{sc} = I_r/z$; $S_\text{sc} = S_\text{base}/z_\text{total}$; $z_\text{grid} = S_\text{base}/S_\text{sc,grid}$; IEC 60909 c = 1.1.
- Synchronous fault contribution 4–7 pu; inverter 1.0–1.5 pu.

## Capacity and load
- $\text{CF} = E/(P\times8760)$ — **AC or DC?** $Y_f$ (kWh/kWp)/8,760 = DC CF; × DC/AC = AC CF.
- Kuwait tracker PV 24–32% AC; Shagaya wind 45.2% / 42.1%; CCGT 50–85%; peaker 5–20%.
- $\text{LF} = P_\text{avg}/P_\text{peak}$; DF = Σ individual peaks / coincident peak.
- $P_\text{net} = P_\text{load} - P_\text{PV} - P_\text{wind}$; PV capacity credit falls as net peak moves to evening.

## Kuwait numbers (sourced, see references)
| Item | Value |
|---|---|
| Summer peak | 17,640 MW (2024), 17,610 (2025), 17,540 (2026) — MEWRE |
| Installed vs reliable at peak | ~21 GW vs ~17 GW (Rystad) |
| Generation mix | ~62% gas / ~36% oil / ~2% RE (third-party) |
| Load growth | ~1 GW of new connections per year |
| GCCIA imports | 500 MW summer 2024; ~KWD 161–169 m approved for 2025 |
| Shagaya Zone 1 | 1.1 GW PV IPP, 30-yr PPA, IPP builds 400 kV substation |
| Grid link | Shagaya–Al-Wafra 400 kV OHTL, KD 48.6 m, March 2026 |
| BESS plan | 1–1.5 GW / 4–6 GWh |
| **Unverified** | Intermediate EHV level and 132/33/11 kV levels, 50 Hz band, GCCIA link details, winter peak, annual TWh, fleet heat rate |

## Frequency and system strength
- $n_s = 120f/p$ (3,000 rpm, 2-pole, 50 Hz); $H = E_k/S$ (thermal 4–9 s; inverter 0).
- Swing: $(2H/f_0)\,df/dt = P_m - P_e$. ROCOF $= \Delta P f_0/(2\sum HS)$.
- Droop: $\Delta P = -(1/R)(\Delta f/f_0)P_r$; 4% → 10% per 0.2 Hz.
- Timeline: inertia (0–2 s) → FFR (BESS) → primary droop (2–30 s) → AGC (30 s–15 min) → tertiary; UFLS last resort.
- SCR $= S_\text{sc}/P_\text{IBR}$: ≥ 3 strong, 2–3 weak, < 2 very weak → EMT studies, grid-forming, synchronous condensers.

## PM questions to always ask
1. Basis? (AC/DC, P50/P90, LHV/HHV, gross/net, ISO/site.)
2. At 50 °C? (inverter MVA, transformer rises, cable ampacity, GT output.)
3. At which hour? (peak contribution, marginal plant.)
4. Declared by whom? (fault level, grid-code settings — MEWRE Transmission in writing.)
5. Proven how? (FAT, heat-run, summer re-test, validated EMT models.)
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
