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
  id: "m03",
  number: 3,
  title: "Concentrated Solar Power",
  titleAr: "الطاقة الشمسية المركزة",
  summary:
    "CSP from first principles to ministerial decision: concentration and optical losses, T⁴ receiver physics, why only DNI counts, trough vs tower vs Fresnel, molten-salt storage and the Rankine power block with dry cooling, what is (and is not) known about Shagaya's 50 MW trough, global lessons from Noor Ouarzazate and Noor Energy 1, and a defensible framework for choosing between CSP and PV+BESS.",
  whyItMatters:
    "Shagaya hosts Kuwait's only utility CSP plant — a 50 MW trough with ~10 h of molten-salt storage whose post-2019 performance is not public. A MEWRE PM may have to assess, operate, refurbish or decide the fate of that asset, review CSP proposals (including unsolicited ones), and defend why new capacity is PV+BESS — or where CSP could still fit. That requires being able to read a CSP design, challenge DNI and storage claims, and compare technologies on the service the grid actually needs.",
  competencies: ["solar", "operations", "finance"],
  prerequisites: ["m01", "m02"],
  estimatedHours: 6,
  lessons: [l01, l02, l03, l04],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet: md`# M03 — Concentrated Solar Power: cheat sheet

## Physics
| Item | Value / rule |
|---|---|
| Resource used | **DNI only** (diffuse can't be focused) |
| Concentration $C_g = A_{ap}/A_{rec}$ | Trough ≈ 26 · Fresnel 25–60 · Tower 500–1,000+ · Dish 1,000–3,000 |
| Optical chain | $\eta_{opt} = \cos\theta \cdot K \cdot \rho_m \cdot \gamma \cdot \tau \cdot \alpha \cdot \xi$ ; trough peak ≈ 0.75–0.80 |
| Typical factors | ρ 0.93–0.95 · γ 0.92–0.97 · τ 0.96 · α 0.95 · cleanliness 0.93–0.98 |
| Receiver loss | $\dot Q = \varepsilon\sigma A (T^4 - T_{env}^4)$ — **kelvin!** 390→550 °C ≈ 2.4–2.5× loss |
| Collector efficiency | $\eta_{col} = \eta_{opt} - \dot q_{loss}/\text{DNI}$ — collapses at low DNI |
| Solar multiple | $SM = \dot Q_{field}\,\eta_{PB}/P_e$ ; no storage 1.2–1.4 · 10 h storage 2.5–3 |

## Technologies
| | Trough (oil) | Tower (salt) | Fresnel | Dish |
|---|---|---|---|---|
| HTF / T | Oil 293→393 °C | Salt 290→565 °C | Steam 270–500 °C | Gas ~700 °C |
| Cycle η (gross) | 37–38 % | 41–44 % | 30–35 % | ~30 % solar-electric peak |
| Storage | Indirect 2-tank (292→386 °C) | Direct 2-tank | Limited | None |
| Maturity | Highest | Commercial, fewer refs | Niche | Failed commercially |

## Storage & power block
- Solar salt = **60 % NaNO₃ / 40 % KNO₃**, freezes ≈ 238 °C, stable to ≈ 585–600 °C, cp ≈ 1.5 kJ/(kg·K)
- $E = m\,c_p\,\Delta T$ ; 1 MWh = 3.6×10⁹ J. Per 1,000 MWh_th: trough ≈ 25,500 t salt, tower ≈ 8,700 t
- Hours: $h = E_{th}\,\eta_{PB}/P_e$ — always ask: gross/net, full/part load, usable/total
- Carnot $1 - T_c/T_h$: dry cooling at 48 °C ambient → condensing ≈ 70–75 °C → up to 7–10 % output loss on hottest afternoons, 2–5 % annual
- Water: wet ≈ 3–3.5 m³/MWh · dry ≈ 0.2–0.4 m³/MWh (washing + make-up)
- CF: no storage 25–28 % · 7.5 h ≈ 40 % · 10 h 45–55 % · tower 15 h 60–70 %

## Kuwait facts (cite)
- Shagaya Phase I (KISR/MEW): **50 MW trough CSP, ~10 h TES (1,200 MWh_th per Worley), dry cooling** + 10 MW PV + 10 MW wind (IEA 5541; Reuters Events)
- CSP contractor TSK (2015); 6-yr design-build-operate; full operation ≈ Feb 2019 (dates vary)
- "Up to ~225,000 MWh/yr" — scope ambiguous (70 MW → CF 37 %; CSP only → 51 %)
- 200 MW / 5 h Phase 2 CSP never procured; Phase III KAPP zones are PV
- **Unverified:** post-2019 CSP performance, current status, full EPC consortium
- KISR: satellite DNI diverges significantly from ground data in Kuwait → use ground DNI

## Global references
- Noor Ouarzazate: I 160 MW trough ~3 h · II 200 MW trough ~7 h · III 150 MW tower ~7 h
- Noor Energy 1 (DEWA): 700 MW CSP (100 tower + 600 trough) + 250 MW PV, ~15 h, ≈ USD 7.3 c/kWh
- IRENA 2010→2023: CSP LCOE −~70 % to ≈ USD 0.12/kWh; PV −~90 % to ≈ USD 0.04–0.05/kWh (check latest edition)

## Economics
- $CRF = r(1+r)^n/((1+r)^n-1)$ (7 %/30 yr = 0.0806; 7 %/20 yr = 0.0944)
- $LCOE = (\text{CAPEX}\cdot CRF + \text{OPEX})/E$ — compare **same delivery profile**
- Illustrative: CSP 10 h ≈ USD 115/MWh · PV-charged 6 h BESS ≈ USD 80/MWh-evening

## PM checklist
1. Ground-measured, long-term-corrected DNI with P90
2. Operating (not clean) cleanliness factor; cleaning water budget
3. SM/storage optimisation with stated objective
4. ACC output at 50 °C; parasitics list
5. Storage hours definition in the contract; corrected performance test
6. Heat-tracing design, freeze-recovery procedure, salt-melt schedule
7. O&M handover: data, procedures, spares, Kuwaiti staff training
8. Technology choice: need profile → options → delivered cost → non-cost criteria (weights first) → sensitivities
`,
};

export default mod;
