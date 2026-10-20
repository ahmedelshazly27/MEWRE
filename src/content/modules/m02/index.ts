import { md, type Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import l06 from "./l06";
import l07 from "./l07";
import formulas from "./formulas";
import references from "./references";
import glossary from "./glossary";
import exam from "./exam";

const cheatSheet = md`# Solar PV — PM cheat sheet (Kuwait)

## Sun & resource

| Quantity | Formula | Where |
|---|---|---|
| Declination | $\delta = 23.45^\circ\sin(360^\circ(284+n)/365)$ | n = day of year |
| Hour angle | $\omega = 15^\circ(t_{solar}-12)$ | Solar time, not clock time |
| Elevation | $\sin\alpha = \sin\varphi\sin\delta + \cos\varphi\cos\delta\cos\omega$ | Any hour |
| Noon elevation | $\alpha = 90^\circ - \lvert\varphi-\delta\rvert$ | Solar noon |
| Air mass | $AM = 1/\cos\theta_z$ | STC = AM 1.5 (zenith 48.2°) |
| Closure | $GHI = DNI\cos\theta_z + DHI$ | Residual > 5 % ⇒ station fault |
| POA (isotropic) | $DNI\cos\theta + DHI(1+\cos\beta)/2 + GHI\rho(1-\cos\beta)/2$ | Use Perez for bankable work |

| Item | Value | Note |
|---|---|---|
| Shagaya noon elevation (≈ 29.3°N) | ≈ 84° June, 61° equinox, 37° December | |
| Kuwait GHI | ≈ 1,900–2,100 kWh/m²/yr | Secondary source (verify); get Global Solar Atlas + KISR data |
| Record heat | 53.9 °C | Mitribah, 21 Jul 2016 (WMO) |

- **KISR finding:** satellite GHI is OK after site adaptation; **DNI diverges** (aerosols).

## Cell & module

| Quantity | Formula | Where |
|---|---|---|
| Power model | $P = P_{STC}(G/1000)[1+\gamma(T_c-25)]$ | Any irradiance/temperature |
| Cell temp (Faiman) | $T_c = T_a + G/(U_0+U_1v)$ | Yield models (PVsyst U-values) |
| Cell temp (NOCT) | $T_c = T_a + (NOCT-20)G/800$ | Quick estimate |
| Fill factor | $FF = P_{mp}/(V_{oc}I_{sc})$ | Typical ≈ 0.79 |
| Efficiency | $\eta = P_{mp}/(GA)$ | Typical ≈ 22–23 % |

| Item | PERC | TOPCon | HJT |
|---|---|---|---|
| γ (Pmp), %/°C | −0.35 | −0.30 | −0.25 |
| Bifaciality | 0.70 | 0.80 | 0.85–0.90 |

- **50 °C ambient, full sun:** cell ≈ 70–75 °C, so TOPCon delivers ≈ 82–87 % of nameplate.
- **Sand albedo:** 0.25–0.4.
- **Bifacial gain:** ≈ 5–9 % on trackers.
- **Warranty, n-type:** 1 % in year 1, then 0.4 %/yr ⇒ 87.4 % at 30 yr.
- **Warranty, PERC:** 2 % in year 1, then 0.55 %/yr ⇒ 84.8 % at 25 yr.
- **Must-have evidence:** IEC 61215/61730, IEC TS 63126, PVEL PQP for the supplied BOM (PID, LeTID, UVID), BOM lock, traceability.

## Plant architecture

| Quantity | Formula | Where |
|---|---|---|
| Max string length | $N = \lfloor 1500/(V_{oc}[1+\beta(T_{min}-25)]) \rfloor$ | 1,500 V system |
| MPPT check | $N V_{mp}(T_{max}) >$ MPPT min | Hottest cell temperature |

- **Example:** 51.6 V module, −0.25 %/°C, 0 °C ⇒ 27 modules (1,480 V).
- **Kuwait minimum temperature ($T_{min}$):** ≈ 0–5 °C commonly cited (verify); use the record minimum, not TMY.
- **Fuse/cable current:** ≥ 1.25 Isc (+ bifacial margin).

| Item | Value | Note |
|---|---|---|
| Trackers vs fixed | +15–25 % yield | Backtracking; stow from wind-tunnel study |
| GCR (trackers) | 0.28–0.40 | |
| DC/AC ratio | 1.15–1.40 | |
| Clipping | ≈ 3 % on a clear day at 1.30 | Annual 0.5–3 % |

## Desert design

| Quantity | Formula | Where |
|---|---|---|
| Average soiling loss | $\bar{L} = rN/2$ | r = soiling rate per day, N = cleaning interval (days) |
| Optimal cleaning interval | $N^* = \sqrt{730C/(Epr)}$ | At optimum, cleaning cost = loss value |

- **Shagaya testbed:** monthly water cleaning.
- **Kuwait soiling studies:** 17 % loss after 6 days; 8.7–15.1 % with monthly cleaning.
- **Transformers:** IEC 60076 default 40/30/20 °C ambient is exceeded; specify a reduced temperature rise.
- **Ingress protection:** outdoor electronics IP65/66.
- **Skid filters:** a top O&M item.

## Yield & finance

| Quantity | Formula | Where |
|---|---|---|
| Performance ratio | $PR = Y_f/Y_r$ | Bifacial gain inflates PR |
| Specific yield | $\approx GHI \times (POA/GHI) \times PR$ | Sanity check on bids |
| Combined uncertainty | $\sigma = \sqrt{\sum\sigma_i^2}$ | Interannual term ÷ $\sqrt{N}$ |
| Exceedance | $P_X = P_{50}(1 - z\sigma)$ | z = 0.674 / 1.282 / 2.326 for P75 / P90 / P99 |

| Item | Value | Note |
|---|---|---|
| PR, Kuwait trackers | ≈ 0.78–0.84 | Front-side |
| Specific yield, plausible | ≈ 2,000–2,300 kWh/kWp | |
| Specific yield, optimistic | 2,300–2,500 kWh/kWp | Optimistic (verify) |
| Largest loss: temperature | 7–10 % | Then soiling, IAM, inverter, clipping, AC |

## QA & commissioning

### Module supply chain
- **Sequence:** factory audit → production witness → PSI (ISO 2859-1 AQL, EL, flash) → lab STC check → receiving inspection with mobile EL.

### Construction holds
- **Piles:** survey and pull tests.
- **Trackers:** first-row inspection; torque marks.
- **Connectors:** one connector family + the specified crimp tool.
- **MV cables:** VLF/PD tests.

### Testing (IEC 62446-1)
- **Category 1:** continuity, polarity, Voc, current, insulation resistance.
- **Category 2:** I-V tracing, IR thermography (≥ 600 W/m²).
- **STC translation:**

$$P_{STC} = P_{meas}/\{(G/1000)[1+\gamma(T_c-25)]\}$$

- **Field uncertainty:** ±3–5 %.
- **Voc short by one module:** missing or reversed module.
- **Voc short by ⅓ module:** bypassed substring.

### Handover
- **Documents:** as-builts; flash/EL/IR/I-V baselines; warranties assigned; punch list A/B.

## Top questions to ask

1. Which resource source, site-adapted with how many months of ground data?
2. What U-values, soiling profile and bifacial assumptions?
3. What minimum temperature for string sizing, from which station?
4. What inverter/transformer derating at 50–55 °C?
5. Is the supplied BOM the PVEL-tested one?
6. What stow threshold, stow angle, and comms-loss behaviour?
7. Same connector brand on every mated pair?
`;

const mod: Module = {
  id: "m02",
  number: 2,
  title: "Solar PV",
  titleAr: "الطاقة الشمسية الكهروضوئية",
  summary:
    "Utility-scale solar PV from photon to grid for a Kuwait desert site: solar resource and sun geometry, cell physics and heat, module technologies and reliability, plant architecture (trackers, strings, inverters, DC/AC), soiling and desert design, energy yield and P50/P90, and field QA from factory to handover.",
  whyItMatters:
    "MEWRE is the 30-year offtaker for Shagaya's GW-scale PV IPPs. The PM must challenge bidders' yield claims, review designs for a 50 °C dusty site, enforce module and construction quality, and accept plants on evidence — because energy shortfalls, fires and early degradation land on Kuwait's summer peak and on MEWRE's balance sheet long after the EPC has left.",
  competencies: ["solar", "risk", "operations", "finance"],
  prerequisites: ["m01"],
  estimatedHours: 14,
  lessons: [l01, l02, l03, l04, l05, l06, l07],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
