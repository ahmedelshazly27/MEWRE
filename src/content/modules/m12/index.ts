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

## 1. KPIs (IEC 61724-1)

| KPI | Formula | Typical Kuwait value |
|---|---|---|
| Final yield | $Y_f = E/P_0$ | ≈ 2,000–2,300 kWh/kWp/yr (bifacial tracker; indicative) |
| Reference yield | $Y_r = H_{POA}/1\,\text{kW/m}^2$ | — |
| PR | $Y_f/Y_r$ | 0.78–0.83 annual; lower in summer |
| Temp-corrected PR | $\sum E/\sum P_0 (G/1000)[1+\gamma(T_c-T_{ref})]\Delta t$ | depends on $T_{ref}$ |
| Time availability | $1 - \sum P_k t_{down}/\sum P_k t_{daylight}$ | > 99 % |
| Energy availability | $E/(E + E_{lost})$ | ≥ 99 % guarantee common |
| Capacity factor | $E/(P \cdot 8760)$ | AC ~30–34 %; DC ~23–26 % |

### Data first
- **Sensor cleaning/calibration:** a dirty sensor makes PR look too high.
- **Gaps and timestamps:** check completeness and clock alignment before calculating.
- **Meter reconciliation:** inverter sum vs revenue meter normally differs by ~1.5–2.5 %.
- **Curtailment evidence:** PPC set-points plus NCC logs.
- **Monitoring class:** specify **Class A**.

## 2. Diagnosis

### Workflow
1. Validate data.
2. Compare plant vs weather-adjusted model.
3. Remove evidenced exclusions.
4. Compare blocks and inverters.
5. Drill down to strings and trackers.
6. Field check.
7. RCA.
8. Verify recovery.

### Loss signatures

| Signature | Cause |
|---|---|
| Flat-top at inverter rating, clear cool day | Clipping (designed) |
| Plateau at set-point, NCC instruction | Curtailment |
| Gradual decline, recovery after cleaning/rain | Soiling ($SR$ station) |
| Zero blocks + fault codes | Inverter faults |
| Morning/afternoon asymmetry on rows | Tracker angle |
| Plateau at peak ambient + derating flags | Thermal derating |

### Diagnosis formulas

| Quantity | Formula | Where |
|---|---|---|
| Loss attribution | $E_{exp} - E_{act} = \sum \Delta E_j + \varepsilon$ | Residual ≤ ~1–2 % is OK |
| Extra soiling loss | $\Delta E = E_{exp}(1 - SR/SR_{model})$ | Soiling station data |
| FTA OR gate | $1-\prod(1-p)$ | Any one event causes the top event |
| FTA AND gate | $\prod p$ | All events needed (redundancy) |

- **RCA tools:** 5 Whys; fishbone (6M).

## 3. Failures & inspections

### Desert failure modes
- **PID:** 1,500 V systems plus dew.
- **Hot spots:** seen in IR thermography.
- **Bypass diodes:** a failed diode takes out ⅓ of a module.
- **Delamination:** moisture ingress and corrosion.
- **Cell cracks:** found with EL imaging.
- **Connectors:** cross-mating of different brands.
- **Inverters:** IGBTs, fans, capacitors; failure rate ~2× per 10 °C of heat.
- **Trackers:** drives and controllers.
- **BESS HVAC:** condenser fouling.

### Inspection standards

| Method | Standard | Note |
|---|---|---|
| IR thermography | IEC TS 62446-3 | Irradiance ≥ ~600 W/m² |
| EL imaging | IEC TS 60904-13 | Cracks, inactive cell areas |
| IV-curve tracing | IEC 62446-1 + IEC 60891 | Translate to STC |

### Warranty claims

| Quantity | Formula | Where |
|---|---|---|
| Warranted power | $W_n = 1 - d_1 - d(n-1)$ | Linear power warranty |
| Refund value | $V = NP_0(W_n - M)c_W$ | Refund-type remedy |

- **Tolerance rules:** check whether tolerance applies to eligibility only or is subtracted.
- **Consequential loss:** normally excluded (no lost-energy compensation).
- **Evidence needed:** notice in time, serials, sampling plan, ISO/IEC 17025 lab, proof of correct O&M, chain of custody.

## 4. O&M strategy

- **Maintenance mix:** PM / CM / CBM chosen by criticality.
- **Pre-summer campaign:** before the heat peak.
- **Condition triggers:** e.g. filter ΔP.
- **CMMS KPIs:** MTBF, MTTR, PM compliance, backlog.
- **Owner access:** the owner must have CMMS/SCADA access.

### Spares and cleaning formulas

| Quantity | Formula | Where |
|---|---|---|
| Expected failures in lead time | $\mu = N\lambda_a L$ | Pick $S$ for 95–99 % Poisson service (stocking the mean ≈ 63 % only) |
| Optimal cleaning interval | $T^* = \sqrt{2C/(pE_ds)}$ | At optimum, cleaning cost = loss value |
| Average soiling loss | $sT^*/2$ | At the optimum interval |

- **Cleaning example (1 GW):** $C$ = USD 130 k, $s$ = 0.4 %/d → 25 d at USD 14/MWh; 12 d at USD 55/MWh.

### Kuwait site specifics
- **Soiling rate:** ~17 % loss in 6 days (one test).
- **Monthly cleaning:** 8.7–15.1 % losses by season.
- **Dew cementation:** in winter.
- **Sand fences:** on the NW (shamal) side.
- **Post-storm checks:** trackers, BESS, anemometers.
- **Security:** 20–30 km perimeter.
- **Staffing:** ~50–80 technical staff per GW.

## 5. Asset management

- **ISO 55000/55001/55002 principles:** value, alignment, leadership, assurance.
- **Plan hierarchy:** SAMP → plant AMP → work orders.

| Quantity | Formula | Where |
|---|---|---|
| Lifecycle cost | $LCC = C_0 + \sum (O+M+R)/(1+r)^t - V_{res}/(1+r)^T$ | Compare lifecycle options |
| NPV of replacement | $\text{NPV} = \Delta CF \cdot AF - C_{rep}$ | $AF_{6\%,15} = 9.712$ |
| Degradation | $P_n = P_0[1-d_1-d(n-1)]$ | Median ~0.5 %/yr; year-on-year method (RdTools) |

- **Inverter replacement:** ~yr 12–15.
- **BESS augmentation:** yrs 3–10.
- **Repowering:** constrained by PPA, POI limit, trackers.

## 6. Value of energy and reporting

- **Value of energy decides:** IPP = tariff; MEWRE = avoided fuel + peak reliability. State which one you use.
- **Report structure:** Delivering? Why not? What's being done? What do you need from me?`,
};

export default mod;
