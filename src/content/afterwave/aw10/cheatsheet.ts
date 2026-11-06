import { md } from "../../schema";

const cheatSheet = md`# AW10 Functional safety and safety cases: cheat sheet

## Conventions

- **Status of numbers:** all Afterwave and customer numbers are **illustrative**.
- **Standards status:** as of November 2026 (research brief); recheck dates before external use.
- **Afterwave never certifies:** it makes evidence complete, traceable and current; customers and assessors decide.

## Core vocabulary

- **Hazard:** potential source of harm. **Risk:** severity of harm combined with its probability.
- **Three-step method (ISO 12100):** inherent design, then safeguarding (functional safety), then information for use.
- **Safety function:** trigger, safe state, reaction time, integrity (PL or SIL).
- **Random failures:** physical, rate-based, quantified. **Systematic failures:** built in, deterministic, controlled by process. Perception gaps in ML are systematic.

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Risk reduction factor | $\text{RRF} = F_{np}/F_t$, $\text{PFD} \le 1/\text{RRF}$ | L1 |
| Failure split | $\lambda = \lambda_S + \lambda_{DD} + \lambda_{DU}$ | L1 |
| DC, SFF | $\lambda_{DD}/\lambda_D$; $(\lambda_S+\lambda_{DD})/\lambda$ | L1 |
| Operations per year | $n_{op} = d_{op} h_{op} 3600/t_{cycle}$ | L2 |
| MTTFd from B10D | $B_{10D}/(0.1\,n_{op})$; $T_{10D} = B_{10D}/n_{op}$ | L2 |
| Channel MTTFd | $1/\text{MTTF}_{ch} = \sum 1/\text{MTTF}_i$ | L2 |
| DCavg | $\sum(\text{DC}_i/\text{MTTF}_i)/\sum(1/\text{MTTF}_i)$ | L2 |
| PFDavg 1oo1, 1oo2 | $\lambda_{DU}T_1/2$; $(\lambda_{DU}T_1)^2/3 + \beta\lambda_{DU}T_1/2$ | L2 |
| PFL speed | $v = F/\sqrt{\mu k}$, $\mu = (1/m_H + 1/m_R)^{-1}$, $m_R = M/2 + m_L$ | L3 |
| SSM distance | $S_p = v_h(T_r+T_s) + v_rT_r + S_s + C + Z$ | L3 |
| ISO 13855 | $S = KT + C$, $C = 8(d-14)$ | L3 |
| Fall energy | $E = mg\Delta h$ | L3 |
| ASIL aid | $S+E+C$: 10 D, 9 C, 8 B, 7 A | L4 |
| SPFM, LFM | $1 - \lambda_{SPF+RF}/\lambda$; $1 - \lambda_{latent}/(\lambda - \lambda_{SPF+RF})$ | L4 |
| Zero-failure exposure | $t = -\ln(1-C)/\lambda \approx 3/\lambda$ at 95% | L4 |
| Rate upper bound | $\lambda_C = \chi^2_{C,2r+2}/(2T)$ | L6 |
| Fault injections for DC | $n = \ln(1-C)/\ln\text{DC}$ (299 for 99% at 95%) | L6 |

## ISO 13849-1 at a glance

| Item | Values |
|---|---|
| Risk graph | S1/S2, F1/F2, P1/P2; S1F1P1 a ... S2F2P2 e; S2F2P1 and S2F1P2 give d |
| MTTFd per channel | low 3 to 10, medium 10 to 30, high 30 to 100 years (cap 100; Cat 4 up to 2,500) |
| DCavg | none <60, low 60 to 90, medium 90 to 99, high >= 99% |
| CCF | >= 65 of 100 points for Cat 2, 3, 4 |
| Categories | B, 1 single channel; 2 tested; 3 single-fault tolerant; 4 plus fault detection in time |
| Cat 3, DC medium, MTTFd high | PL d (e at top of range) |

## PL, SIL, PFH, PFD

| PL | PFH per hour | SIL | PFDavg (low demand) |
|---|---|---|---|
| a | $10^{-5}$ to $10^{-4}$ | none | none |
| b, c | $3\times10^{-6}$ to $10^{-5}$; $10^{-6}$ to $3\times10^{-6}$ | 1 | $10^{-2}$ to $10^{-1}$ |
| d | $10^{-7}$ to $10^{-6}$ | 2 | $10^{-3}$ to $10^{-2}$ |
| e | $10^{-8}$ to $10^{-7}$ | 3 | $10^{-4}$ to $10^{-3}$ |
| none | $10^{-9}$ to $10^{-8}$ | 4 | $10^{-5}$ to $10^{-4}$ |

- **Low demand:** at most once per year (PFDavg). **High demand:** PFH.
- **Architectural constraints (type B):** HFT 0 needs SFF >= 90% for SIL 2, >= 99% for SIL 3.
- **IEC 61508-3:** AI fault correction and dynamic reconfiguration "not recommended" for SIL 2 to 4.
- **Beta dominates** redundant PFD; diversity and separation beat duplication.

## Robots and humanoids (Nov 2026)

| Document | Status |
|---|---|
| ISO 10218-1/-2:2025 | Published Feb 2025; PL d Cat 3 or SIL 2 HFT 1; TS 15066 content folded in |
| ISO/TS 15066:2016 | Body model, force limits (chest 140 N, hand 140 N quasi-static; transient about 2x) |
| ISO 25785-1 | Draft (CD/WD), ISO/TC 299; no certification possible |
| IEEE humanoid study (Sep 2025) | No standard test methods for balance and recovery |

- **Stop categories:** 0 STO; 1 SS1 (controlled, then off); 2 SS2/SOS (controlled, power on).
- **Humanoid fall:** 60 kg, 1 m gives about 590 J vs 6 J for a 12 kg arm at 1 m/s.

## Automotive and AI

- **ISO 26262:2018** (3rd ed. about 2027, unverified): HARA, ASIL, V-model, Part 8 tool confidence.
- **Hardware targets:** SPFM 90/97/99%, LFM 60/80/90% (B/C/D); PMHF <1e-7 (B, C), <1e-8 (D).
- **TCL:** TI1 gives TCL1; TI2 with TD1/2/3 gives TCL1/2/3. Ripple is TI2: design for TD1.
- **ISO 21448 SOTIF:** functional insufficiencies, triggering conditions, shrink areas 2 and 3.
- **ISO/PAS 8800:2024** (13 Dec 2024): AI safety requirements, data lifecycle, V&V, field monitoring.
- **ISO/IEC TR 5469:2024:** informative; TS 22440 to follow.
- **RAND (2016):** 275 million failure-free miles to show the human fatality rate at 95%.

## Safety cases

- **GSN:** Goal (rectangle), Strategy (parallelogram), Solution (circle), Context, Assumption (A), Justification (J), undeveloped (diamond).
- **Patterns:** over hazards, over requirements, product plus process, confidence argument.
- **Evidence credibility:** relevance, coverage, trustworthiness, currency.
- **Defeater:** concrete reason a claim might be false; eliminate or justify.
- **Nimrod Review (2009):** safety case as paperwork; make arguments challengeable.

## Evidence business

- **Admissible evidence:** configuration identity, one clock, calibration traceability, integrity, provenance, retention (10 years technical file).
- **Bench data prove inputs, not rare rates:** 160,000 failure-free hours bound the rate only at 1.9e-5 per hour.
- **Sequence:** capture and Ripple, then evidence packs, then living safety cases in Enclave, then (vision) insurer risk signal.
- **Insurer layer prerequisites:** trust and independence, consented aggregation, standard metrics, link to losses, demand. No partners exist.
`;

export default cheatSheet;
