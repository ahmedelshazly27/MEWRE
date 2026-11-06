import { md } from "../../schema";

const cheatSheet = md`# AW13 Competitive landscape: cheat sheet

## Conventions

- **Facts:** from the research brief of 6 Nov 2026 (search summaries, not full primary pages). Funding is **as reported**; recheck before external use.
- **Numbers:** all Afterwave numbers are **illustrative**, not traction.
- **Phrase gaps as:** "not advertised as of Nov 2026", never "they cannot".

## The map (organise by job)

| Layer | Players | Relationship to Ripple |
|---|---|---|
| Test data platforms | Nominal, Sift, Marple | Adjacent (overlap Lockstep and Enclave) |
| Robotics observability | Foxglove, Rerun, Formant | Adjacent, not bench DAQ |
| Simulation and autonomy | Applied Intuition, Simulink Test | Software-side regression |
| T&M incumbents | NI, Vector, dSPACE, Keysight, MathWorks | Complements; VectorCAST selects at code level |
| Requirements and test mgmt | Jama, Polarion, DOORS Next, Codebeamer, Xray, TestRail | Complements; suspect links fire on requirement changes |
| Loggers and capture | Bus loggers, DAQ software, screen recording | Substitutes for Lockstep |
| **Substitutes** | Full regression, engineer judgment, in-house scripts | **The real opponents** |

## Dated facts (as reported)

| Company | Fact | Date |
|---|---|---|
| Nominal | USD 75 m Series B, Sequoia | Jun 2025 |
| Nominal | USD 80 m Series B-2, Founders Fund, USD 1 bn valuation | 5 Mar 2026 |
| Nominal | USD 53 m sole-source IDIQ, Air Force Test Center | 14 Apr 2026 |
| Sift | USD 42 m Series B, StepStone; total USD 67 m | Mar 2026 |
| Sift | Sift Agents research preview | Sep 2026 |
| Foxglove | USD 40 m Series B, Bessemer | 12 Nov 2025 |
| Rerun | USD 17 m seed, Point Nine | 20 Mar 2025 |
| Applied Intuition | USD 600 m Series F, USD 15 bn valuation | Jun 2025 |
| NI | Nigel assistant announced, GA later in 2026 | 13 May 2026 |
| **Unverified** | Nominal total raised, STRATFI amount, Fid Labs date, CANoe AI package, dSPACE MCP | |

## Positioning map

- **x:** evidence from code, simulation, robot logs vs physical bench.
- **y:** records what happened vs decides what to test next.
- **Top-right (bench, decides):** no vendor found; Ripple's target. A hypothesis until buyers pay.

## Nominal and Sift

- **Nominal:** "continuous test stack"; Core (cloud, private, on-prem) + Connect (bench edge app, air-gapped); Anduril, Shield AI.
- **Sift:** "observability layer for hardware"; telemetry, rules, alerts; SaaS to on-prem and GovCloud; space customers.
- **Overlap:** bench capture, on-prem. **Gap:** change impact with rationale.
- **Play:** coexist where they are installed; do not compete where the job is a data platform.

## Build vs buy

- **Six forces:** unique rigs, strong engineers, data cannot leave, engineer time looks free, vendors do not know rigs, lock-in fear.
- **Rule:** never sell against a script on cost; sell what it cannot reach.
- **Play:** wrap, then extend; script author owns the dependency model.
- **Incumbents:** integrate (read TDMS, MDF; write TestStand and Xray lists); never pitch replacement.

## Defensibility

| Capability | Verdict |
|---|---|
| One-clock capture | Short-lived differentiator |
| Ripple change impact | Wedge |
| Enclave | Table stakes vs Nominal and Sift |
| Calibrated per-customer models + release-gate embedding | **Moat** |
| Own test platforms | Future bet |
| Team, Machinery Regulation (20 Jan 2027) | Advantage, why-now |

- **Never claim:** data network effect, "nobody else does this", regulation as moat.
- **Biggest threat:** incumbent bundle at zero price; data platform adding agentic test recommendations.

## Battlecards and objections

- **Sections:** one line, facts, win, lose, landmines, objections, proof, traps.
- **Six steps:** listen, acknowledge, clarify, reframe, prove, advance.
- **"Nominal does this":** they store and run test data; we decide what to rerun after a change, and why.
- **"We built our own":** who built it, what it does well; keep it, add the decision layer.
- **"Our DAQ vendor has a cloud":** keep it, we read it; does it select tests across rigs and vendors with a reason?
- **Fair claims:** dated, verifiable, not denigrating (EU Directive 2006/114/EC spirit).

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Evaluation score | $U_j = \sum_k \omega_k q_{jk}$ | L2 |
| Build TCO | $TCO_{build} = C_0 + T(\mu C_0 + R)$ | L3 |
| Buy TCO | $TCO_{buy} = C_{int} + T(P + A)$ | L3 |
| Key-person risk | $R = p_{leave} L$ | L3 |
| Break-even | $T^{*} = (C_0 - C_{int})/((P+A) - (\mu C_0 + R))$ | L3 |
| Switching cost | $S = C_{mig} + N_p h_p c_h + C_{train}$; stay if $\Delta p \, T < S$ | L4 |
| Win and no-decision | $w = W/(W+L)$, $d = N/(W+L+N)$ | L5 |
`;

export default cheatSheet;
