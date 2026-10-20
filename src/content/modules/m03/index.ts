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

- **Resource used:** DNI only — diffuse light cannot be focused
- **Optical chain:** each loss factor multiplies; trough peak optical efficiency ≈ 0.75–0.80
- **Receiver loss uses kelvin:** going from 390 °C to 550 °C raises radiative loss ≈ 2.4–2.5×
- **Collector efficiency** collapses at low DNI, because receiver losses stay roughly fixed

| Item | Typical value |
|---|---|
| Concentration $C_g$, trough | ≈ 26 |
| Concentration $C_g$, Fresnel | 25–60 |
| Concentration $C_g$, tower | 500–1,000+ |
| Concentration $C_g$, dish | 1,000–3,000 |
| Mirror reflectivity ρ | 0.93–0.95 |
| Intercept factor γ | 0.92–0.97 |
| Envelope transmittance τ | 0.96 |
| Absorptance α | 0.95 |
| Cleanliness factor | 0.93–0.98 |
| Solar multiple, no storage | 1.2–1.4 |
| Solar multiple, 10 h storage | 2.5–3 |

### Formulas

| Quantity | Formula | Where |
|---|---|---|
| Concentration ratio | $C_g = A_{ap}/A_{rec}$ | L1 |
| Optical efficiency | $\eta_{opt} = \cos\theta \cdot K \cdot \rho_m \cdot \gamma \cdot \tau \cdot \alpha \cdot \xi$ | L1 |
| Receiver radiative loss | $\dot Q = \varepsilon\sigma A (T^4 - T_{env}^4)$ | L1 |
| Collector efficiency | $\eta_{col} = \eta_{opt} - \dot q_{loss}/\text{DNI}$ | L1 |
| Solar multiple | $SM = \dot Q_{field}\,\eta_{PB}/P_e$ | L1 |

## Technologies

| | Trough (oil) | Tower (salt) | Fresnel | Dish |
|---|---|---|---|---|
| HTF / T | Oil 293→393 °C | Salt 290→565 °C | Steam 270–500 °C | Gas ~700 °C |
| Cycle η (gross) | 37–38 % | 41–44 % | 30–35 % | ~30 % solar-electric peak |
| Storage | Indirect 2-tank (292→386 °C) | Direct 2-tank | Limited | None |
| Maturity | Highest | Commercial, fewer refs | Niche | Failed commercially |

## Storage and power block

- **Solar salt:** 60 % NaNO₃ / 40 % KNO₃
- **Salt limits:** freezes ≈ 238 °C; stable to ≈ 585–600 °C; cp ≈ 1.5 kJ/(kg·K)
- **Unit conversion:** 1 MWh = 3.6×10⁹ J
- **Salt per 1,000 MWh_th:** trough ≈ 25,500 t; tower ≈ 8,700 t
- **Storage hours — always ask:** gross or net, full or part load, usable or total inventory
- **Dry cooling at 48 °C ambient:** condensing ≈ 70–75 °C
- **Dry-cooling penalty:** up to 7–10 % output loss on the hottest afternoons; 2–5 % annual

| Quantity | Formula | Where |
|---|---|---|
| Stored heat | $E = m\,c_p\,\Delta T$ | L2 |
| Full-load storage hours | $h = E_{th}\,\eta_{PB}/P_e$ | L2 |
| Carnot limit | $\eta_C = 1 - T_c/T_h$ | L2 |

| Item | Value | Note |
|---|---|---|
| Water, wet cooling | ≈ 3–3.5 m³/MWh | |
| Water, dry cooling | ≈ 0.2–0.4 m³/MWh | Washing + make-up |
| CF, no storage | 25–28 % | |
| CF, 7.5 h storage | ≈ 40 % | |
| CF, 10 h storage | 45–55 % | |
| CF, tower 15 h | 60–70 % | |

## Kuwait facts (cite)

- **Shagaya Phase I (KISR/MEW):** 50 MW trough CSP + 10 MW PV + 10 MW wind (IEA 5541; Reuters Events)
- **CSP storage and cooling:** ~10 h TES (1,200 MWh_th per Worley), dry cooling
- **Contractor:** TSK (2015); 6-yr design-build-operate
- **Full operation:** ≈ Feb 2019 (dates vary)
- **Target output:** "up to ~225,000 MWh/yr" — scope ambiguous (70 MW → CF 37 %; CSP only → 51 %)
- **Later CSP:** 200 MW / 5 h Phase 2 CSP never procured; Phase III KAPP zones are PV
- **Post-2019 CSP performance, current status, full EPC consortium:** not public (verify)
- **DNI data:** KISR found satellite DNI diverges significantly from ground data in Kuwait → use ground DNI

## Global references

| Plant | Configuration | Storage | Note |
|---|---|---|---|
| Noor Ouarzazate I | 160 MW trough | ~3 h | Morocco |
| Noor Ouarzazate II | 200 MW trough | ~7 h | Morocco |
| Noor Ouarzazate III | 150 MW tower | ~7 h | Morocco |
| Noor Energy 1 (DEWA) | 700 MW CSP (100 tower + 600 trough) + 250 MW PV | ~15 h | ≈ USD 7.3 c/kWh |

- **IRENA 2010→2023, CSP:** LCOE −~70 % to ≈ USD 0.12/kWh (check latest edition)
- **IRENA 2010→2023, PV:** LCOE −~90 % to ≈ USD 0.04–0.05/kWh (check latest edition)

## Economics

| Quantity | Formula | Where |
|---|---|---|
| Capital recovery factor | $CRF = r(1+r)^n/((1+r)^n-1)$ | L4 |
| Screening LCOE | $LCOE = (\text{CAPEX}\cdot CRF + \text{OPEX})/E$ | L4 |

- **CRF values:** 7 %/30 yr = 0.0806; 7 %/20 yr = 0.0944
- **Compare LCOE on the same delivery profile** — never raw MWh against raw MWh
- **Illustrative CSP 10 h:** ≈ USD 115/MWh
- **Illustrative PV-charged 6 h BESS:** ≈ USD 80/MWh-evening

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
