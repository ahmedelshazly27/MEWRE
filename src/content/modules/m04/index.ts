import { md, type Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import exam from "./exam";
import glossary from "./glossary";
import formulas from "./formulas";
import references from "./references";

const mod: Module = {
  id: "m04",
  number: 4,
  title: "Wind Energy",
  titleAr: "طاقة الرياح",
  summary:
    "Wind power from physics to O&M: ½ρAv³ and the hot-air density penalty, Betz derivation, Cp and tip speed ratio, power curves; Weibull statistics, shear, measurement campaigns, MCP and P50/P90; wakes, layout, IEC classes and desert failure modes (heat derating, sand erosion, dust, lightning); and delivery — logistics, cranes and shamal weather windows, commissioning, availability guarantees and O&M contracts — anchored on Shagaya's 10 MW farm.",
  whyItMatters:
    "Shagaya's 10 MW wind farm achieved ~42–45 % capacity factor with strongest output in summer — when Kuwait's demand peaks and PV is fading in the evening. Any future wind IPP or extension will require a MEWRE PM who can challenge an energy yield assessment, specify turbines for 50 °C heat and sand, set up a defensible data package for KAPP bidders, manage oversized logistics and lifting windows, and hold an OEM to an availability guarantee with the right exclusions.",
  competencies: ["wind-storage", "delivery", "operations"],
  prerequisites: ["m01"],
  estimatedHours: 6,
  lessons: [l01, l02, l03, l04],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet: md`# M04 — Wind Energy: cheat sheet

## Core physics
| Item | Formula / value |
|---|---|
| Power in wind | $P = \tfrac12\rho A v^3$ ; +10 % speed → +33 % power ; ×1.5 D → ×2.25 |
| Turbine power | $P = C_p \tfrac12\rho A v^3$ ; best rotor $C_p$ ≈ 0.48–0.50, wind-to-grid ≈ 0.42–0.46 |
| Air density | $\rho = p/(R_d T)$, $R_d$ = 287.05 ; 15 °C 1.225 · 45 °C 1.11 · 50 °C 1.09 kg/m³ |
| Betz | $C_p = 4a(1-a)^2$, max 16/27 = 0.593 at a = 1/3 ; $C_T = 4a(1-a)$ |
| Tip speed ratio | $\lambda = \omega R/v$, optimum 7–9 ; tip speed ≤ 80–90 m/s (erosion, noise) |
| Power curve | cut-in ≈ 3 · rated ≈ 11–13 · cut-out ≈ 25 m/s ; IEC 61400-12-1 ; rated speed rises ∝ $(\rho_0/\rho)^{1/3}$ |

## Resource
| Item | Formula / value |
|---|---|
| Weibull | $f = (k/c)(v/c)^{k-1}e^{-(v/c)^k}$ ; above v: $e^{-(v/c)^k}$ |
| Mean / cube mean | $\bar v = c\Gamma(1+1/k)$ ; $\overline{v^3} = c^3\Gamma(1+3/k)$ |
| Energy pattern factor | k 1.5: 2.72 · 2: 1.91 · 2.5: 1.58 · 3: 1.40 |
| Shear | $v_2/v_1 = (h_2/h_1)^\alpha$ ; desert day α ≈ 0.10–0.14, stable night 0.25–0.4 ; log law $\ln(h/z_0)$, sand $z_0$ ≈ 0.0003 m |
| AEP | $8760\int P(v)f(v)dv \times (1-L)$ ; L ≈ 10–20 % |
| Exceedance | $P_X = P_{50}(1 - z\sigma)$ ; z: P75 0.674 · P90 1.282 · P99 2.326 ; σ = RSS of components |

## Wakes, classes, desert
- Jensen: $\Delta v/v_0 = (1-\sqrt{1-C_T})/(1+k_w x/r_0)^2$ ; $k_w$ 0.075 onshore, lower for stable desert nights
- 5D, C_T 0.8: −18 % speed, −45 % power in-line ; farm wake loss 5–12 %
- Spacing 5–9 D downwind (NW shamal), 3–5 D crosswind
- IEC classes $V_{ref}/V_{ave}$: I 50/10 · II 42.5/8.5 · III 37.5/7.5 m/s ; turbulence A+ .18 · A .16 · B .14 · C .12
- Heat: standard full power to ≈ 35–40 °C → specify hot-climate package (≥ 45 °C)
- Sand: leading-edge erosion (1–5 % AEP) → LEP ; filters, seals, oil particle monitoring ; earthing in dry sand ; IEC 61400-24 lightning

## Delivery & O&M
- Contracts: TSA + BoP (owner holds interfaces) vs EPC wrap ; long-term FSA
- Logistics: port → route survey (radii, bridges, overhead lines, permits) → ~100 km inland to Shagaya
- Hot-weather concreting: night pours, chilled water, curing
- Lift limits ≈ blade 8–12 m/s, nacelle 10–12, tower 12–15 ; erect Oct–Apr ; schedule = working days / workability
- Commissioning: MC → energise → function tests → 240 h reliability run → grid tests → take-over → power-curve test
- Availability: $A_t = (T - T_u)/T$ ; $A_E = E/(E+E_{lost})$ ; guarantees 95–97 % ; check exclusions (temperature! grid! sandstorms!)

## Kuwait facts (cite)
- Shagaya Phase I wind: **10 MW = 5 × 2 MW**, Elecnor (~EUR 22.4 m), commissioned **May 2017**
- **7.9 m/s at 80 m** long-term ; CF **45.2 % (yr 1, ~40 GWh), 42.1 % (yr 2, ~37 GWh)** ; ~70 % CF in summer months
- KISR E3S paper: 42.59 GWh yr 1 vs 31.16 GWh contractual ("21 % above") — **inconsistent (ratio 1.37; CF 48.6 %), verify**
- Record 53.9 °C at Mitribah (WMO) ; masterplan wind: 70 MW (Ph 2), 127 MW (Ph 3) — not procured

## PM checklist
1. ≥ 12 months on-site data incl. summer; MCP; measured shear by hour
2. Site-density power curve; temperature derating curve to 50 °C+
3. Loss & uncertainty tables; P50/P90 (1-yr and 10-yr)
4. Turbine class + site-specific loads; hot-climate, LEP, filtration, earthing
5. Route survey before award; weather-contingent erection programme
6. Availability definition, exclusions, SCADA access, spares in Kuwait, Kuwaiti technician training
`,
};

export default mod;
