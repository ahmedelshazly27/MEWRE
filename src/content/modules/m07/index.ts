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

## 1. Stage gates
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

- **Gate decisions:** go, go with conditions, recycle, or stop.
- **Criteria:** write them before the gate, not at it.
- **Development spend:** ≈ 1–3 % of capex.

## 2. Options analysis
| Quantity | Formula | Where |
|---|---|---|
| Capital recovery factor | $\text{CRF} = r(1+r)^n/((1+r)^n-1)$ | Annualise capex |
| Simple LCOE | $\text{LCOE} = (\text{CAPEX}\cdot\text{CRF} + \text{OPEX})/E$ | Screening at a gate |
| MCA score | $S_j = \sum w_i s_{ij}$ | Non-monetary ranking |

| CRF case | Value |
|---|---|
| 6 %, 30 yr | 0.0727 |
| 5 %, 30 yr | 0.0651 |
| 7 %, 20 yr | 0.0944 |

- **MCA weights:** fix them before scoring.
- **Fatal flaws:** exclude those options before scoring.
- **Kuwait economic benefit:** avoided fuel/imports plus reliability, **not** the retail tariff (2 fils/kWh for citizens).

## 3. Site assessment
| Quantity | Formula | Where |
|---|---|---|
| Pile uplift capacity | $Q_{ult} = pL\bar f_s$ | Tracker piles |
| Minimum embedment | $L_{min} = \text{FS}\,Q_d/(p\bar f_s)$ | Pile design |
| Sacrificial steel | $t_{sac} = r_{Fe}(T - \delta_{Zn}/r_{Zn})$ | Corrosion allowance |
| Peak runoff | $Q = CiA/3.6$ | Flood design (m³/s; mm/h; km²) |

- **Skin friction, dense sand:** $\bar f_s$ 20–50 kPa.
- **Pile count:** ~220 piles/MWp (1P trackers).
- **Corrosion hot spot:** worst at the ground line; sabkha multiplies rates several times.
- **Gatch:** causes refusal, so pre-drill (piling rate roughly halves).
- **Gypsum:** collapse risk plus sulfate attack.
- **Runoff coefficient:** C 0.4–0.8 on desert crust.
- **Flood return period:** 1-in-50 to 1-in-100 yr for BESS and substations.
- **Land:** allocation plus no-objection letters (oil and gas, defence, aviation, utilities).
- **EIA:** with the EPA (verify current procedure).
- **UXO:** unexploded-ordnance check of the site.

## 4. Design
- **Stages:** concept, then FEED (design basis frozen), then detailed design.
- **Review codes:** **A** approved; **B** approved with comments, proceed; **C** rejected.
- **FIDIC 2017 Yellow review period:** 21 days by default (risk of deemed no-objection).

| Quantity | Formula | Note |
|---|---|---|
| DC voltage drop | $\Delta V = 2LIR'$ | Limit ~1–1.5 % |
| Resistance vs temperature | $R_T = R_{20}[1+\alpha(T-20)]$ | Use R at 70–90 °C; Cu $\alpha = 0.00393$ |
| Derated current | $I_z = I_0 k_T k_\rho k_g$ | Kuwait product often 0.55–0.65 |
| XLPE temperature factor | $k_T = \sqrt{(90-T_g)/70}$ | $T_g$ = ground temperature |

- **Hot-weather ratings:** check inverter Q and transformer rating **at 50 °C+** (record 53.9 °C, Mitribah 2016).

## 5. Procurement and construction
| Item | Lead time |
|---|---|
| HV transformer | 18–24+ months |
| GIS | 12–18 months |
| BESS | 6–12 months |
| Inverters/skids | 6–9 months |
| Trackers | 4–6 months |
| Modules | 3–6 months + 6–8 weeks sea freight |

**Crew sizing:**
$$N = \lceil Q/(rT)\rceil$$

| Planning rate | Value |
|---|---|
| Piling (mixed ground) | 120 piles/rig-day |
| Trackers | 8 trackers/crew-day |
| Modules | 500 modules/crew-day |
| Site peak installation | 8–12 MWp/day |
| Workforce | 3,000–5,000 workers/GW |
| Container load | ~620 modules per 40 ft container |

## 6. Testing to COD
**Sequence:**
- FAT, then SAT
- Mechanical completion
- Cold pre-commissioning (IR, Voc/Isc, VLF)
- Energisation (switching programme, PTW)
- Hot commissioning
- Grid tests (P/Q/V/f, ramp)
- PR, capacity and BESS tests
- Reliability run, then COD

**Performance ratio:**
$$PR = \frac{E/P_0}{H/G_{STC}}$$

**Temperature-corrected PR** (divide measured energy by):
$$\sum P_0 (G/1000)[1+\gamma(T_c - T_{ref})]\Delta t$$

**Capacity test regression** (evaluated at reporting conditions, RC):
$$P = E(a_1 + a_2E + a_3T_a + a_4v)$$

- **Tref = 25 °C:** gives a higher PR (~0.85–0.88).
- **Tref = annual average cell temperature (~45 °C):** gives ~0.80–0.83. **Read the guarantee together with its Tref.**
- **Test duration:** 7–15 days.
- **Curtailment:** exclude those periods and extend the test.
- **Sensors:** clean daily.
- **Also define:** bifacial treatment and the meter point.
- **Capacity pass mark:** ≥ ~97 %.
- **Punch list A:** closes before COD (safety, performance, compliance).
- **Punch list B:** closes during the DNP.

## 7. Handover and close-out (FIDIC 2017)
| Clause | Subject |
|---|---|
| 10.1 | Taking-Over Certificate (TOC) |
| 10.2 | Taking over of sections |
| 11.1–11.4 | Defects |
| 11.3 | DNP extension, up to 2 yr |
| 11.9 | Performance Certificate (within 28 days) |
| 14.9 | Release of retention |
| 14.11–14.12 | Final statement and discharge |

- **Retention, first half:** released at TOC (less outstanding work).
- **Retention, second half:** released at the Performance Certificate (less valid deductions).
- **Handover pack:** as-builts, O&M manuals loaded into the CMMS, test baselines, assessed training, spares, registered warranties, SCADA credentials, asset register.
- **DNP inspections:** baseline inspection in the first 3 months; re-inspect and **notify defects before expiry**.`,
};

export default mod;
