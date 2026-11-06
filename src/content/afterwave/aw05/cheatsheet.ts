import { md } from "../../schema";

const cheatSheet = md`# AW05 Change impact and test selection: cheat sheet

## Dependency graphs

- **Edge convention:** u to v means a change in u can change the behaviour or verdict of v.
- **Node types:** artifacts (firmware, calibration, model, rig assets, scripts), components and functions, tests, requirements.
- **Cycles:** collapse strongly connected components; the condensation is a DAG with the same reachability.
- **Reachability:** safe if the graph is complete, imprecise because of hubs; BFS in $O(V+E)$.
- **Edge provenance:** declared (traceability), static (code, A2L, DBC), dynamic (traces, recorded channels), learned (history).
- **Graphs lie two ways:** missing edges (escapes) and hub nodes (over-selection).

## Selection theory

- **Three problems:** minimisation (forever), selection (this change), prioritisation (order). Ripple selects and prioritises.
- **Safe selection:** all modification-revealing tests; needs the controlled regression testing assumption, which rigs violate.
- **Claim instead:** measured recall with a bound, mandatory set, shadow sampling, periodic full regression.
- **Precision:** compare with the retest-all base rate, not with 1.
- **Run rule:** run test i if $p_i > c_h h_i / C_{esc}$; long tests need stronger evidence.
- **Escape cost:** expectation over where it would be caught; the field tail dominates.

| Policy tier | Contents |
|---|---|
| Mandatory | Safety functions, smoke, unlinked tests, witnessed tests |
| Selected | Cost rule on calibrated probabilities, queued by priority |
| Safety net | 2 to 10 % shadow sampling, weekly and pre-release full regression |

## Coverage as edge weights

| Change | Evidence that sees it |
|---|---|
| Firmware code | Statement, branch, MC/DC coverage per test |
| Calibration table | Table cells visited (recorded signals plus breakpoints) |
| Operating region | Envelope coverage from measured signals |
| Rig instrument | Margin-normalised signal sensitivity |
| Requirement edit | Suspect links |

- **MC/DC:** each condition independently flips the decision; at least N + 1 tests; DO-178C Level A.
- **Linked vs verified coverage:** a link is not a current pass.

## History and learning

- **Lift** = confidence / base rate; smooth with $(k + \alpha)/(n + \alpha + \beta)$.
- **Baselines to beat:** retest-all, graph-only, exponential smoothing of failures, random at same budget.
- **Evaluate:** temporal split, recall at rig-hour budget, APFDc, Brier score, slices by change type.
- **Traps:** feedback bias (explore, inverse propensity weights), label noise (classify product, rig, flaky).
- **Cold start:** priors, backfill, pooling, exploration.

## Physical and model changes

- **Recalibration:** evidence changed, not product; re-evaluate if margin below bias plus U; recompute from raw data.
- **Sensor swap:** dynamics change; phase lag $360° f_c \tau$; golden-unit baseline.
- **Model retrain:** global in weights, local in behaviour; replay divergence by region; closed loop still needed.
- **Nondeterminism:** 95 % to 90 % success needs about 150 trials; 20 trials give about 33 % power.
- **Sim-to-real:** sim triages only where agreement is measured per test family.

## Explaining and approving

- **Report:** claim, reasons with provenance, counts with Wilson interval, confidence, cost, skipped tests and residual risk.
- **Trust:** publish measured precision and recall; false alarms cause disuse; hidden uncertainty causes misuse.
- **Approval:** high consequence with low confidence is always a human decision.

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Path weight | $w(\pi) = \prod w_{uv}$ | L1 |
| Impact score | $s_t = 1 - \prod (1 - w_{it})$ | L1 |
| Recall, precision | $TP/(TP+FN)$, $TP/(TP+FP)$ | L2 |
| Expected cost | $C_a + c_h \sum_S h_i + C_{esc} \sum_{\bar S} p_i$ | L2 |
| Run threshold | $p^{*} = c_h h / C_{esc}$ | L2 |
| Rule of three | $p_{upper} \approx 3/n$ | L2 |
| MC/DC minimum | $N + 1$ | L3 |
| Envelope coverage | visited feasible / feasible | L3 |
| Sensitivity weight | $\min(1, \lvert \partial m/\partial x \rvert \Delta x / M)$ | L3 |
| Smoothed rate | $(k+\alpha)/(n+\alpha+\beta)$ | L4 |
| APFD | $1 - \sum TF_i/(nm) + 1/(2n)$ | L4 |
| Brier | $\frac{1}{N}\sum (\hat p - o)^2$ | L4 |
| TUR | $(USL - LSL)/(2U_{95})$ | L5 |
| Re-evaluate | $\lvert m - L \rvert < \lvert \Delta b \rvert + U$ | L5 |
| Trials (proportion) | $((z_\alpha\sqrt{p_0q_0} + z_\beta\sqrt{p_1q_1})/(p_0-p_1))^2$ | L5 |
| False alarm cost | $N(1-\pi)(c_h \bar h + c_e t_r)$ | L6 |
`;

export default cheatSheet;
