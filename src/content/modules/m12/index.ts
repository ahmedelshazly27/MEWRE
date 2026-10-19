import { md, type Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import { formulas } from "./formulas";
import { references } from "./references";
import { glossary } from "./glossary";
import { exam } from "./exam";

const mod: Module = {
  id: "m12",
  number: 12,
  title: "Operations & Performance",
  titleAr: "التشغيل والأداء",
  summary:
    "Running and judging an operating PV/BESS plant for 25–30 years: monitoring and KPIs (PR, temperature-corrected PR, availability, specific yield, capacity factor), performance analysis and root cause analysis, desert failure modes, inspections and warranty claims, O&M strategy with spares and cleaning economics, and ISO 55000 asset management with lifecycle decisions and reporting to the ministry.",
  whyItMatters:
    "Once Shagaya's IPPs reach COD, MEWRE's job shifts from building to buying energy and capacity for 30 years. The PM must verify the KPIs that drive payments, LDs and deemed-energy claims, challenge underperformance with evidence, understand why plants fail in 50 °C dust, push for the cleaning and maintenance that the national interest needs (which can differ from an IPP's private optimum), and make lifecycle decisions for ministry-owned assets. Most value lost over a plant's life is lost quietly in operations — this module teaches you to see it and recover it.",
  competencies: ["operations", "solar", "risk", "contracts", "finance", "leadership"],
  prerequisites: ["m07"],
  estimatedHours: 9,
  lessons: [l01, l02, l03, l04, l05],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet: md`# M12 Operations & Performance — cheat sheet

## KPIs (IEC 61724-1)
| KPI | Formula | Typical Kuwait value |
|---|---|---|
| Final yield | $Y_f = E/P_0$ | ≈ 2,000–2,300 kWh/kWp/yr (bifacial tracker; indicative) |
| Reference yield | $Y_r = H_{POA}/1\,\text{kW/m}^2$ | — |
| PR | $Y_f/Y_r$ | 0.78–0.83 annual; lower in summer |
| Temp-corrected PR | $\sum E/\sum P_0 (G/1000)[1+\gamma(T_c-T_{ref})]\Delta t$ | depends on $T_{ref}$ |
| Time availability | $1 - \sum P_k t_{down}/\sum P_k t_{daylight}$ | > 99 % |
| Energy availability | $E/(E + E_{lost})$ | ≥ 99 % guarantee common |
| Capacity factor | $E/(P \cdot 8760)$ | AC ~30–34 %; DC ~23–26 % |

Data first: sensor cleaning/calibration (dirty sensor → PR too high), gaps, timestamps, meter reconciliation (inverter sum vs meter ~1.5–2.5 %), curtailment evidence (PPC set-points + NCC logs). Specify **Class A** monitoring.

## Diagnosis
Workflow: validate data → plant vs weather-adjusted model → remove evidenced exclusions → block/inverter comparison → strings/trackers → field check → RCA → verify recovery.
$E_{exp} - E_{act} = \sum \Delta E_j + \varepsilon$; residual ≤ ~1–2 % OK.
| Signature | Cause |
|---|---|
| Flat-top at inverter rating, clear cool day | Clipping (designed) |
| Plateau at set-point, NCC instruction | Curtailment |
| Gradual decline, recovery after cleaning/rain | Soiling ($SR$ station) |
| Zero blocks + fault codes | Inverter faults |
| Morning/afternoon asymmetry on rows | Tracker angle |
| Plateau at peak ambient + derating flags | Thermal derating |
Extra soiling $\Delta E = E_{exp}(1 - SR/SR_{model})$. FTA: OR $1-\prod(1-p)$; AND $\prod p$. 5 Whys; fishbone 6M.

## Failures & inspections
PID (1,500 V + dew), hot spots, bypass diodes (⅓ module), delamination, cracks (EL), connectors (cross-mating), IGBTs/fans/capacitors (heat: ~2× per 10 °C), tracker drives/controllers, BESS HVAC (condenser fouling).
IR: IEC TS 62446-3 (≥ ~600 W/m²). EL: IEC TS 60904-13. IV: IEC 62446-1 + IEC 60891.
Warranty: $W_n = 1 - d_1 - d(n-1)$; refund $V = NP_0(W_n - M)c_W$; tolerance rules; no consequential loss. Evidence: notice in time, serials, sampling plan, ISO/IEC 17025 lab, proof of correct O&M, chain of custody.

## O&M strategy
PM / CM / CBM by criticality; pre-summer campaign; condition triggers (filter ΔP).
CMMS KPIs: MTBF, MTTR, PM compliance, backlog. Owner must have CMMS/SCADA access.
Spares: $\mu = N\lambda_a L$; pick $S$ for 95–99 % Poisson service (mean ≈ 63 % only).
Cleaning: $T^* = \sqrt{2C/(pE_ds)}$; at optimum cleaning cost = loss value; avg loss $sT^*/2$. Example 1 GW: $C$ = USD 130 k, $s$ = 0.4 %/d → 25 d at USD 14/MWh, 12 d at USD 55/MWh.
Kuwait soiling: ~17 % in 6 days (one test); 8.7–15.1 % with monthly cleaning. Dew cementation in winter.
Sand fences (NW shamal side), post-storm tracker/BESS/anemometer checks; security for 20–30 km perimeter; ~50–80 technical staff/GW.

## Asset management
ISO 55000/55001/55002: value, alignment, leadership, assurance. SAMP → plant AMP → work orders.
$LCC = C_0 + \sum (O+M+R)/(1+r)^t - V_{res}/(1+r)^T$. NPV replace $= \Delta CF \cdot AF - C_{rep}$; $AF_{6\%,15} = 9.712$.
Inverters ~yr 12–15; BESS augmentation yrs 3–10; repowering constrained by PPA, POI limit, trackers.
Degradation $P_n = P_0[1-d_1-d(n-1)]$; median ~0.5 %/yr; year-on-year method (RdTools).
**Value of energy decides**: IPP = tariff; MEWRE = avoided fuel + peak reliability. State it.
Report: Delivering? Why not? What's being done? What do you need from me?`,
};

export default mod;
