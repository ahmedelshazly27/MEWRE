import { md } from "../../schema";

const cheatSheet = md`# AW12 Selling into test and validation organisations: cheat sheet

## Conventions

- **Status of numbers:** every account, price, cycle and ACV here is **illustrative**, not Afterwave data.
- **Generic sales method:** Founder Core fc04 (stages, discovery, MEDDPICC, pilots, pricing, procurement); this module applies it to test labs.

## Who buys

- **Champion:** test systems engineer (rig software, DAQ, data); feels the pain, rarely owns budget.
- **Sceptic:** validation manager who signs the test report; wants a reason for every skipped test.
- **Economic buyer:** head of validation or VP engineering; programme manager if a gate is at stake.
- **Veto holders:** IT and OT security, procurement, legal, quality and functional safety, cost-centre controller.
- **Budget lines:** lab capex, engineering tools opex, programme budget, innovation budget. Secure the year-2 line during the pilot.
- **Purchase paths:** direct; bundled with rig or DAQ capex; via framework or distributor; engineering-services PO.

## Business case

- **Four lines:** rig time and engineer time from selection; data-caused reruns from capture; escaped defects.
- **No double counting:** rig-hour cost excludes labour; never add cost and capacity framings for the same hours.
- **Risk-adjust:** measured 0.9 to 1.0; buyer records 0.7 to 0.8; buyer estimate 0.6 to 0.7; plausible 0.3 to 0.5 (a convention).
- **Include the buyer's internal hours** in one-time cost; ramp year 1 at about 50 %.
- **Worked humanoid case:** adjusted EUR 589k/yr, 3-year cost EUR 444k, ROI 232 %, payback 5.7 months; still 144 % at $s = 0.6$.

## Pilot design

- **Rig choice:** frequent changes, long digital history, champion owns it, off the critical path, representative.
- **Phases:** backtest on history, shadow on live changes, gated with approval and a periodic full run.
- **Evidence:** zero misses in $n$ failing tests gives a 95 % bound of about $3/n$: 60 for 5 %, 100 for 3 %.
- **Lockstep criteria:** completeness on an audit sample; DAQ-to-HMI sync against a sync pulse; time to root cause.
- **Commercials:** paid fee near delivery cost, credited if signed in a window; scale-up clause fixing rig count, price and start date.

## Security and procurement

| Segment | Usual assurance ask |
|---|---|
| US robotics and humanoid startups | SOC 2 |
| European industrials | ISO/IEC 27001 |
| German automotive | TISAX (scope depends on data handled) |
| OT-heavy labs | IEC 62443-style zones and conduits |

- **Strongest answer:** Enclave on customer servers, no outbound by default, signed offline updates with SBOM, customer-controlled support.
- **Bench PC is a controlled configuration:** change request, resource note, verification, rollback, CAB cycle.
- **Air-gapped:** signed bundle, customer media-scanning transfer, offline licence, predictable update cadence.
- **CRA (EU) 2024/2847:** reporting from 11 Sep 2026; main obligations from 11 Dec 2027.
- **Export control:** classify (encryption), screen customers and end use, treat defence customer data as possibly controlled; adviser for anything outside the EU and Switzerland.

## Segments

| Segment | Cycle (assumed) | Regulation pull | Role |
|---|---|---|---|
| Humanoid and robotics startups | 3 to 6 months | Machinery Regulation from 20 Jan 2027; ISO 10218:2025 | Beachhead |
| Drives and motors | 6 to 12 months | IEC 61800-5-2 safety functions | Bridge |
| Automotive tier-1s | 12 to 18 months | UNECE R156, ISO 26262, ISO/PAS 8800 | Long-cycle bets |
| Batteries | 6 to 12 months | Battery Regulation passport from 18 Feb 2027 | Later or opportunistic |

## Founder-led selling

- **Ismail:** validation method, release gates, test systems. **Yusuf:** inverter test, reliability, HIL. **CEO:** process, business case, security, terms, all price and roadmap answers.
- **Boundary:** say where you worked; never a former employer's methods, data or results; no implied endorsement; check current employment terms.
- **Load cap:** about 20 % of technical time; never two pilots in install or backtest at once.
- **Design partners:** 3 to 5 from the beachhead; paid (discounted); contracted reference rung.
- **Reference ladder:** private call, anonymised case study, named quote, logo, public case study or talk.

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Consensus probability | $P_{all} = \prod p_i$ | L1 |
| Selection value | $V_{sel} = N_r(1-s)H_{full}(c_h + a\,c_e)$ | L2 |
| Rerun value | $V_{rr} = R(r_0 - r_1)(t_r c_h + e_d c_e)$ | L2 |
| Escape value | $V_{esc} = \lambda\,\delta\,C_{esc}$ | L2 |
| Risk-adjusted benefit | $B_{adj} = \sum k_i V_i$ | L2 |
| ROI and payback | $\mathrm{ROI} = (\sum B - \sum C)/\sum C$, $t_{pb} = C_0/((B_1 - C_1)/12)$ | L2 |
| Rule of three | $p_{up} \approx 3/n$ | L3 |
| Pilot EV (Founder Core) | $EV = F - C_d + p_c \cdot \mathrm{ACV} \cdot GM \cdot n$ | L3 |
| Approval critical path | $T = \max_j \sum_{i \in j} d_i$ | L4 |
| Segment throughput | $A_s = (12 n_s/t_s)\,w_s\,\mathrm{ACV}_s$ | L5 |
| Cofounder load | $u = \sum h_j/(N_c H_w)$ | L6 |
`;

export default cheatSheet;
