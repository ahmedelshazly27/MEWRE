import { md, type Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import l06 from "./l06";
import { formulas } from "./formulas";
import { references } from "./references";
import { glossary } from "./glossary";
import { exam } from "./exam";

const mod: Module = {
  id: "m07",
  number: 7,
  title: "Project Development Lifecycle",
  titleAr: "دورة حياة تطوير المشاريع",
  summary:
    "The full life of a utility-scale PV/BESS project from idea to close-out: stage gates and the business case, site and geotechnical assessment in Kuwaiti desert conditions, design stages and design review, procurement and GW-scale construction management, testing, PR/capacity tests and COD, and handover through the defects period.",
  whyItMatters:
    "A MEWRE PM is accountable at every gate: approving feasibility, defining what bidders price, reviewing design, chasing long-lead equipment and grid interfaces, witnessing the tests that trigger COD and payments, and deciding when to accept the plant. Most cost and schedule overruns on GW solar projects trace back to decisions in this lifecycle — weak site data, a vague design basis, a late transformer, an ambiguous PR test, a rushed taking over. This module gives you the numbers, documents and judgement to get those decisions right.",
  competencies: ["delivery", "controls", "risk", "contracts", "solar", "grid"],
  prerequisites: ["m00", "m01"],
  estimatedHours: 11,
  lessons: [l01, l02, l03, l04, l05, l06],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet: md`# M7 Project Development Lifecycle — cheat sheet

## Gates
| Gate | Question | Estimate class (AACE, approx.) |
|---|---|---|
| G0 Need | Mandated need? | — |
| G1 Pre-feasibility | Worth studying? Which options survive? | Class 5: −50/+100 % |
| G2 Feasibility | Which option, site, route, cost? | Class 4: −30/+50 % |
| G3 Investment | Commit to tender? | Class 3: −20/+30 % |
| G4 Award / FC | Sign? | Class 2 (bid check) |
| G5 NTP | Safe to build? | — |
| G6 COD / TOC | Meets contract? | — |
| G7 Close-out | Finished and learned? | — |

Decisions: **go · go with conditions · recycle · stop**. Write criteria before the gate. Development spend ≈ 1–3 % of capex.

## Options
$\text{CRF} = r(1+r)^n/((1+r)^n-1)$ — 6 %/30 yr = 0.0727; 5 %/30 = 0.0651; 7 %/20 = 0.0944.
$\text{LCOE} = (\text{CAPEX}\cdot\text{CRF} + \text{OPEX})/E$. MCA $S_j = \sum w_i s_{ij}$ — weights fixed first; fatal flaws excluded.
Kuwait economic benefit = avoided fuel/imports + reliability, **not** retail tariff (2 fils/kWh citizens).

## Site
- Piles: $Q_{ult} = pL\bar f_s$; $L_{min} = \text{FS}\,Q_d/(p\bar f_s)$; dense sand $\bar f_s$ 20–50 kPa; ~220 piles/MWp (1P).
- Corrosion: $t_{sac} = r_{Fe}(T - \delta_{Zn}/r_{Zn})$; worst at ground line; sabkha × several.
- Gatch → refusal → pre-drill (rate ½). Gypsum → collapse + sulfate attack.
- Flood: $Q = CiA/3.6$ (m³/s; mm/h; km²); C 0.4–0.8; BESS/substations 1-in-50 to 1-in-100 yr.
- Land: allocation + no-objection letters (oil and gas, defence, aviation, utilities), EIA with EPA (confirm), UXO.

## Design
Concept → FEED (design basis frozen) → detailed. Codes: **A** approved · **B** with comments, proceed · **C** rejected. FIDIC 2017 Yellow default review 21 days (deemed no-objection risk).
- DC drop $\Delta V = 2LIR'$, R at 70–90 °C: $R_T = R_{20}[1+\alpha(T-20)]$, Cu α = 0.00393. Limit ~1–1.5 %.
- Derating $I_z = I_0 k_T k_\rho k_g$; XLPE $k_T = \sqrt{(90-T_g)/70}$; Kuwait product often 0.55–0.65.
- Check inverter Q and transformer rating **at 50 °C+** (record 53.9 °C, Mitribah 2016).

## Procurement & construction
| Item | Lead time |
|---|---|
| HV transformer | 18–24+ months |
| GIS | 12–18 |
| BESS | 6–12 |
| Inverters/skids | 6–9 |
| Trackers | 4–6 |
| Modules | 3–6 + 6–8 wk sea |

$N = \lceil Q/(rT)\rceil$. Planning rates: 120 piles/rig-day (mixed), 8 trackers/crew-day, 500 modules/crew-day, 8–12 MWp/day site peak, 3,000–5,000 workers/GW. ~620 modules per 40 ft container.

## Testing → COD
FAT → SAT → mech. completion → cold pre-comm (IR, Voc/Isc, VLF) → energisation (switching programme, PTW) → hot comm → grid tests (P/Q/V/f, ramp) → PR + capacity + BESS tests → reliability run → COD.
- $PR = (E/P_0)/(H/G_{STC})$; corrected: divide by $\sum P_0 (G/1000)[1+\gamma(T_c - T_{ref})]\Delta t$.
- Tref 25 °C → higher PR (~0.85–0.88); Tref = annual avg cell T (~45 °C) → ~0.80–0.83. **Read guarantee with its Tref.**
- Test 7–15 days; exclude curtailment, extend; clean sensors daily; bifacial treatment; meter point.
- Capacity: $P = E(a_1 + a_2E + a_3T_a + a_4v)$ at RC; pass ≥ ~97 %.
- Punch: **A** before COD (safety/performance/compliance); **B** during DNP.

## Handover & close-out (FIDIC 2017)
10.1 TOC · 10.2 sections · 11.1–11.4 defects · 11.3 extension ≤ 2 yr · 11.9 Performance Certificate (28 days) · 14.9 retention · 14.11–14.12 final statement & discharge.
Retention: half at TOC (less outstanding work), half at PC (less valid deductions).
Handover pack: as-builts, O&M manuals → CMMS, test baselines, training (assessed), spares, registered warranties, SCADA credentials, asset register.
DNP: baseline inspection in first 3 months; re-inspect and **notify before expiry**.`,
};

export default mod;
