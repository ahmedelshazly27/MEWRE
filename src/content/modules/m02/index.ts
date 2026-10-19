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
| Item | Value / formula |
|---|---|
| Declination | $\delta = 23.45^\circ\sin(360^\circ(284+n)/365)$ |
| Hour angle | $\omega = 15^\circ(t_{solar}-12)$ |
| Elevation | $\sin\alpha = \sin\varphi\sin\delta + \cos\varphi\cos\delta\cos\omega$; noon $\alpha = 90^\circ - \lvert\varphi-\delta\rvert$ |
| Shagaya (≈ 29.3°N) noon elevation | ≈ 84° June · 61° equinox · 37° December |
| Air mass | $AM = 1/\cos\theta_z$; STC = AM 1.5 (zenith 48.2°) |
| Closure | $GHI = DNI\cos\theta_z + DHI$ (residual > 5 % ⇒ station fault) |
| POA (isotropic) | $DNI\cos\theta + DHI(1+\cos\beta)/2 + GHI\rho(1-\cos\beta)/2$; Perez for bankable work |
| Kuwait GHI | ≈ 1,900–2,100 kWh/m²/yr — **unverified** (secondary source); get Global Solar Atlas + KISR data |
| KISR finding | Satellite GHI OK after site adaptation; **DNI diverges** (aerosols) |
| Record heat | 53.9 °C, Mitribah, 21 Jul 2016 (WMO) |

## Cell & module
| Item | Value |
|---|---|
| Power model | $P = P_{STC}(G/1000)[1+\gamma(T_c-25)]$ |
| γ (Pmp) | PERC −0.35 · TOPCon −0.30 · HJT −0.25 %/°C |
| Cell temp | Faiman $T_c = T_a + G/(U_0+U_1v)$; NOCT $T_a + (NOCT-20)G/800$ |
| 50 °C ambient, full sun | cell ≈ 70–75 °C → TOPCon ≈ 82–87 % of nameplate |
| FF / efficiency | $FF = P_{mp}/(V_{oc}I_{sc})$ ≈ 0.79; $\eta = P_{mp}/(GA)$ ≈ 22–23 % |
| Bifaciality | PERC 0.70 · TOPCon 0.80 · HJT 0.85–0.90; sand albedo 0.25–0.4; gain ≈ 5–9 % on trackers |
| Warranty (n-type) | 1 % yr 1 then 0.4 %/yr ⇒ 87.4 % at 30 yr; PERC 2 % + 0.55 %/yr ⇒ 84.8 % at 25 yr |
| Must-have evidence | IEC 61215/61730, IEC TS 63126, PVEL PQP for supplied BOM (PID, LeTID, UVID), BOM lock, traceability |

## Plant architecture
| Item | Value |
|---|---|
| String length | $N = \lfloor 1500/(V_{oc}[1+\beta(T_{min}-25)]) \rfloor$; check $N V_{mp}(T_{max})$ > MPPT min |
| Example | 51.6 V module, −0.25 %/°C, 0 °C ⇒ 27 modules (1,480 V) |
| Kuwait $T_{min}$ | ≈ 0–5 °C commonly cited — **unverified**; use record minimum, not TMY |
| Trackers vs fixed | +15–25 % yield; GCR 0.28–0.40; backtracking; stow from wind-tunnel study |
| DC/AC | 1.15–1.40; clear-day clipping ≈ 3 % at 1.30; annual 0.5–3 % |
| Fuse/cable current | ≥ 1.25 Isc (+ bifacial margin) |

## Desert design
| Item | Value |
|---|---|
| Avg soiling loss | $\bar{L} = rN/2$ |
| Optimal cleaning | $N^* = \sqrt{730C/(Epr)}$ — cleaning cost = loss value at optimum |
| Kuwait soiling evidence | Shagaya testbed monthly water cleaning; studies: 17 % after 6 days, 8.7–15.1 % with monthly cleaning |
| Transformers | IEC 60076 default 40/30/20 °C ambient — exceeded; specify reduced temperature rise |
| IP | Outdoor electronics IP65/66; filters in skids = top O&M item |

## Yield & finance
| Item | Value |
|---|---|
| PR | $Y_f/Y_r$; Kuwait trackers ≈ 0.78–0.84 front-side (bifacial inflates PR) |
| Specific yield | $\approx GHI \times (POA/GHI) \times PR$ ⇒ plausible ≈ 2,000–2,300 kWh/kWp; 2,300–2,500 **unverified/optimistic** |
| Largest loss | Temperature 7–10 %; then soiling, IAM, inverter, clipping, AC |
| Uncertainty | $\sigma = \sqrt{\sum\sigma_i^2}$; interannual ÷ $\sqrt{N}$ |
| Exceedance | $P_X = P_{50}(1 - z\sigma)$; z = 0.674 / 1.282 / 2.326 (P75/P90/P99) |

## QA & commissioning
- Factory audit → production witness → PSI (ISO 2859-1 AQL, EL, flash) → lab STC check → receiving inspection with mobile EL.
- Construction holds: pile survey & pull tests, first tracker row, torque marks, **one connector family + specified crimp tool**, MV VLF/PD tests.
- IEC 62446-1 Cat 1: continuity, polarity, Voc, current, insulation resistance. Cat 2: I-V tracing, IR (≥ 600 W/m²).
- STC translation: $P_{STC} = P_{meas}/\{(G/1000)[1+\gamma(T_c-25)]\}$; field uncertainty ±3–5 %.
- Voc short by one module ≈ missing/reversed module; by ⅓ module ≈ bypassed substring.
- Handover: as-builts, flash/EL/IR/I-V baselines, warranties assigned, punch list A/B.

## Top questions to ask
1. Which resource source, site-adapted with how many months of ground data? 2. U-values, soiling profile and bifacial assumptions? 3. Minimum temperature for string sizing, from which station? 4. Inverter/transformer derating at 50–55 °C? 5. Is the supplied BOM the PVEL-tested one? 6. Stow threshold, angle, and comms-loss behaviour? 7. Same connector brand on every mated pair?
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
