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

| Quantity | Formula | Where |
|---|---|---|
| Power in the wind | $P = \tfrac12\rho A v^3$ | Kinetic energy flux through the swept area |
| Turbine power | $P = C_p \tfrac12\rho A v^3$ | Below rated speed |
| Air density | $\rho = p/(R_d T)$, $R_d$ = 287.05 J/(kg·K) | Use site density, never 1.225 by default |
| Actuator-disc power coefficient | $C_p = 4a(1-a)^2$ | Momentum theory |
| Thrust coefficient | $C_T = 4a(1-a)$ | Momentum theory |
| Betz limit | $C_{p,max} = 16/27 = 0.593$ at $a = 1/3$ | Ideal open rotor |
| Tip speed ratio | $\lambda = \omega R/v$ | Optimum 7–9 |
| Rated speed at low density | rises $\propto (\rho_0/\rho)^{1/3}$ | Pitch-regulated turbine |

- **Speed scaling:** +10 % wind speed → +33 % power
- **Diameter scaling:** ×1.5 D → ×2.25 power
- **Rotor efficiency:** best rotor $C_p$ ≈ 0.48–0.50
- **Wind-to-grid efficiency:** ≈ 0.42–0.46

| Item | Value | Note |
|---|---|---|
| Air density at 15 °C | 1.225 kg/m³ | IEC standard |
| Air density at 45 °C | 1.11 kg/m³ | Kuwait summer afternoon |
| Air density at 50 °C | 1.09 kg/m³ | Extreme |
| Cut-in speed | ≈ 3 m/s | |
| Rated speed | ≈ 11–13 m/s | Rises at low density |
| Cut-out speed | ≈ 25 m/s | 10-min mean |
| Tip speed limit | ≤ 80–90 m/s | Erosion, noise |
| Power curve standard | IEC 61400-12-1 | |

## Wind resource

| Quantity | Formula | Where |
|---|---|---|
| Weibull density | $f = (k/c)(v/c)^{k-1}e^{-(v/c)^k}$ | Speed distribution |
| Fraction of time above v | $e^{-(v/c)^k}$ | Hours at rated, above cut-out |
| Mean speed | $\bar v = c\Gamma(1+1/k)$ | |
| Cube mean | $\overline{v^3} = c^3\Gamma(1+3/k)$ | Power density uses this |
| Shear, power law | $v_2/v_1 = (h_2/h_1)^\alpha$ | Hub-height extrapolation |
| Shear, log law | $v_2/v_1 = \ln(h_2/z_0)/\ln(h_1/z_0)$ | Neutral stability only |
| Net AEP | $8760\int P(v)f(v)\,dv \times (1-L)$ | Site-density power curve |
| Exceedance | $P_X = P_{50}(1 - z\sigma)$ | P90 for debt sizing |

| Item | Value | Note |
|---|---|---|
| Energy pattern factor, k = 1.5 | 2.72 | |
| Energy pattern factor, k = 2 | 1.91 | |
| Energy pattern factor, k = 2.5 | 1.58 | |
| Energy pattern factor, k = 3 | 1.40 | |
| z for P75 / P90 / P99 | 0.674 / 1.282 / 2.326 | |
| Shear α, desert day | ≈ 0.10–0.14 | |
| Shear α, stable night | 0.25–0.4 | |
| Roughness $z_0$, sand | ≈ 0.0003 m | |
| Total losses L | ≈ 10–20 % | |

- **Combined uncertainty σ:** root-sum-square (RSS) of the components, not a simple sum

## Wakes and layout

$$\Delta v/v_0 = (1-\sqrt{1-C_T})/(1+k_w x/r_0)^2$$

- **Wake decay $k_w$:** 0.075 onshore; lower for stable desert nights
- **Example at 5D, $C_T$ 0.8:** −18 % speed, −45 % power for a turbine in line
- **Farm wake loss:** 5–12 %
- **Downwind spacing:** 5–9 D (along the NW shamal)
- **Crosswind spacing:** 3–5 D

## IEC classes and desert design

| Class | $V_{ref}$ (m/s) | $V_{ave}$ (m/s) |
|---|---|---|
| I | 50 | 10 |
| II | 42.5 | 8.5 |
| III | 37.5 | 7.5 |

| Turbulence category | $I_{ref}$ |
|---|---|
| A+ | 0.18 |
| A | 0.16 |
| B | 0.14 |
| C | 0.12 |

- **Heat:** standard turbines give full power to ≈ 35–40 °C → specify a hot-climate package (≥ 45 °C)
- **Sand erosion:** leading-edge erosion costs 1–5 % AEP → specify LEP
- **Dust:** filters, seals, oil particle monitoring
- **Earthing:** design for dry sand
- **Lightning:** IEC 61400-24

## Delivery

- **Contracts:** TSA + BoP (owner holds the interfaces) vs EPC wrap; long-term FSA
- **Logistics:** port → route survey (radii, bridges, overhead lines, permits) → ~100 km inland to Shagaya
- **Hot-weather concreting:** night pours, chilled water, curing
- **Erection season:** October–April
- **Schedule:** calendar days = working days / workability

| Lift | Wind limit (hub height) | Note |
|---|---|---|
| Blade | ≈ 8–12 m/s | |
| Nacelle | ≈ 10–12 m/s | |
| Tower | ≈ 12–15 m/s | |

### Commissioning sequence

1. Mechanical completion (MC)
2. Energisation
3. Function tests
4. 240 h reliability run
5. Grid tests
6. Take-over
7. Power-curve test

## Availability and O&M

| Quantity | Formula | Where |
|---|---|---|
| Time-based availability | $A_t = (T - T_u)/T$ | Simple; blind to when downtime happens |
| Energy-based availability | $A_E = E/(E+E_{lost})$ | Aligns contractor with owner revenue |

- **Typical guarantee:** 95–97 %
- **Exclusions to check:** temperature, grid, sandstorms

## Kuwait facts (cite)

- **Shagaya Phase I wind:** 10 MW = 5 × 2 MW; Elecnor (~EUR 22.4 m); commissioned May 2017
- **Resource:** 7.9 m/s at 80 m, long-term
- **Capacity factor:** 45.2 % in year 1 (~40 GWh); 42.1 % in year 2 (~37 GWh)
- **Seasonality:** ~70 % CF in summer months
- **KISR E3S paper:** 42.59 GWh in year 1 vs 31.16 GWh contractual ("21 % above") — inconsistent: ratio 1.37, CF 48.6 % (verify)
- **Heat record:** 53.9 °C at Mitribah (WMO)
- **Masterplan wind:** 70 MW (Phase 2), 127 MW (Phase 3) — not procured

## PM checklist

1. ≥ 12 months of on-site data including summer; MCP; measured shear by hour
2. Site-density power curve; temperature derating curve to 50 °C+
3. Loss and uncertainty tables; P50/P90 (1-yr and 10-yr)
4. Turbine class and site-specific loads; hot-climate package, LEP, filtration, earthing
5. Route survey before award; weather-contingent erection programme
6. Availability definition and exclusions; SCADA access; spares in Kuwait; Kuwaiti technician training
`,
};

export default mod;
