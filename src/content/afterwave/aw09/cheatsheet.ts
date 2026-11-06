import { md } from "../../schema";

const cheatSheet = md`# AW09 Test platform engineering: cheat sheet

## Conventions

- **Status of numbers:** all Afterwave numbers in this module are **illustrative**; no customers, rigs or revenue are implied.
- **Currency:** USD in the economics lesson (to match the widget).
- **Uncertainty:** always report $U$ with $k$ (k = 2, about 95 %).

## Dynos and actuator rigs

| Quantity | Formula | Where |
|---|---|---|
| Shaft power | $P = T\omega$, $\omega = 2\pi n/60$ | Envelope check, all four quadrants |
| Reflected inertia | $J_{\text{out}} = N^2 J_{\text{in}}$ | Geared absorbers swamp small DUTs |
| Acceleration torque | $T = J_{\text{tot}}\alpha + T_{\text{load}} + T_{\text{fric}}$ | Transient tests |
| Rig motor torque | $T_m = k_s T_{\text{DUT,pk}}/(N\eta_g)$ | Sizing, margin 1.2 to 1.5 |
| Torsional mode | $f_n = \frac{1}{2\pi}\sqrt{k_t(J_1+J_2)/(J_1J_2)}$ | Keep bandwidth below about $f_n/3$ |
| Back-to-back grid power | $P_{\text{grid}} \approx P_{\text{mech}}(1/\eta_A - \eta_B)$ | Common DC bus |

- **Brakes only absorb:** eddy-current, hysteresis, water brake. Robot joints need **four-quadrant** electric machines.
- **Illustrative knee rig:** 200 N·m, 12 rad/s, 1.2 kW; 10:1 geared option adds 0.55 kg·m²; direct-drive 250 N·m motor adds 0.06; $f_n \approx 89$ Hz.
- **Transducer range:** errors are percent of full scale; oversizing ruins low-torque data.

## Sensors and uncertainty

| Quantity | Formula | Where |
|---|---|---|
| Gauge factor | $\Delta R/R = GF\,\varepsilon$ | GF about 2 |
| Bridge output | $V_{\text{out}} = S V_{\text{ex}} F/F_{\text{nom}}$ | 1 to 3 mV/V |
| Type A | $u = s/\sqrt n$ | Repeats |
| Type B rectangular | $u = a/\sqrt3$ | Datasheet limits |
| Combined | $u_c = \sqrt{\sum c_i^2 u_i^2}$ | Largest terms dominate |
| Expanded | $U = k u_c$ | k = 2 |
| Product/quotient | relative $u$ add in quadrature | Efficiency |

- **Six-wire bridges:** sense lines make the output ratiometric at the bridge.
- **TK0** percent FS per 10 K; **TKC** percent of reading per 10 K.
- **Illustrative budget:** 100 N·m on 250 N·m class 0.05: $U = 0.25$ N·m; efficiency 80 % plus or minus 0.26 points.

## Thermal and vibration

| Quantity | Formula | Where |
|---|---|---|
| Time constant | $\tau = mc_p/(hA)$ | Valid for $Bi < 0.1$ |
| Soak | $t = \tau\ln(\Delta T_0/\delta)$ | Dominates cycle time |
| Ramp lag | asymptote $r\tau$ | Fast air is not a fast part |
| Chamber load | $\dot Q = \sum m c_p\,r + \dot Q_{\text{DUT}} + \dot Q_{\text{walls}}$ | Fixtures matter |
| Dew point | Magnus, a = 17.62, b = 243.12 °C | 25 °C, 60 % RH gives 16.7 °C |
| Coffin-Manson | $AF = (\Delta T_t/\Delta T_f)^n$ | n is failure-mode specific |
| Sine | $a = (2\pi f)^2 X$ | 10 g at 100 Hz = 0.25 mm |
| Random | $g_{\text{rms}} = \sqrt{\int PSD\,df}$ | 0.04 g²/Hz, 20 to 2,000 Hz = 8.9 g |

- **Illustrative actuator cycle:** -40 to +60 °C, $\tau$ 20 min: 4.4 h per cycle, 18.5 days per 100 cycles.
- **IEC 60068-2:** -1 cold, -2 dry heat, -14 temperature change, -30/-78 damp heat, -6 sine, -64 random, -27 shock.

## Calibration

| Quantity | Formula | Where |
|---|---|---|
| TUR | $T_{\text{half}}/U_{95}$ | Target 4:1 |
| Guard band | $A_L = T_L - wU$ | ILAC-G8 decision rules |
| %GRR | $100\cdot 6\sigma_{GRR}/(USL-LSL)$ | Under 10 % good, over 30 % bad |
| Interval | $I = -\ln R/\lambda$ | ILAC-G24 / OIML D10 |

- **Traceability:** SI, national institute (METAS, VSL, PTB, NIST), accredited lab, rig sensor, result; uncertainty grows each step.
- **ISO/IEC 17025:** accreditation is per scope; ILAC MRA gives cross-border recognition.
- **Always get as-found data;** out-of-tolerance means reverse-traceability to affected results.

## Mechanical design and safety

| Quantity | Formula | Where |
|---|---|---|
| Natural frequency | $f_n = \frac{1}{2\pi}\sqrt{k/m}$ | First mode well above test frequencies |
| Shaft stiffness | $k_t = GJ_p/L$, $J_p = \pi d^4/32$ | Fourth power of diameter |
| Stored energy | $E = \tfrac12 J\omega^2$ | 0.5 kg·m² at 6,000 rpm = 98.7 kJ |
| Safety distance | $S = KT + C$ | ISO 13855; check edition |

- **Stop categories (IEC 60204-1):** 0 power off, 1 brake then power off, 2 power kept. E-stop is 0 or 1 and complementary.
- **Risk graph:** S2 F2 P2 gives PLr e; S2 F1 P2 gives d.
- **Categories:** B, 1, 2 single channel; 3 and 4 redundant (PL e needs high MTTFd and DC).
- **Agents never hold safety functions;** safety PLC and drive STO bound every plan.

## Test-as-a-service economics

| Quantity | Formula | Where |
|---|---|---|
| Hours | $H_a = 8{,}760A$, $H_s = H_aU$ | Utilisation is the master variable |
| EBIT | $H_s(p-v) - F - C/L$ | Widget platform-economics |
| Breakeven | $U^* = (F + C/L)/((p-v)H_a)$ | Best single test |
| Payback | $C/(H_s(p-v) - F)$ | Under half the life |
| Own vs buy | $H^* = (C/L+F)/(p-v)$ | Below it, buy hours |
| Availability | $MTBF/(MTBF+MTTR)$ | Spares cut MTTR |

- **Illustrative platform:** USD 600k, 35 % utilisation, USD 220/h: EBIT USD 111k, breakeven 25 %, payback 2.8 years, crossover about 1,870 h/yr.
- **Spare rule:** hold if expected lost contribution exceeds carrying cost.

## Platform strategy

- **Instrumented from day one:** PTP clock, TEDS or registry, per-channel uncertainty, versioned rig config, safety state logged.
- **Evidence:** traceable, uncertainty-tagged, contextual, append-only.
- **Options:** build, partner, buy and instrument, defer.
- **Illustrative kill criteria:** paying software customers in the segment; committed hours at least 50 % of breakeven; runway at least 18 months after capex; safety/CE owner; focus cap.
`;

export default cheatSheet;
