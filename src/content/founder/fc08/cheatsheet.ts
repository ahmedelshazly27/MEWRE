import { md } from "../../schema";

const cheatSheet = md`# FC08 Equity & legal: cheat sheet

## Conventions

- **Percentages:** always fully diluted (issued + granted options + unallocated pool + warrants).
- **Numbers in this module:** illustrative, not real Afterwave, Mizan or Suhail terms.
- **Legal facts:** Kuwait, Swiss and Dutch 2027 option rules come from secondary summaries; confirm with counsel.

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Ownership | $p_i = n_i/N_{FD}$ | Every cap table |
| Dilution | $p_{\text{after}} = p_{\text{before}}(1-d)$, $d = I/V_{\text{post}}$ | Every round, pool top-up |
| New shares for stake d | $\Delta N = N\,d/(1-d)$ | Sizing a round or pool |
| Post-money | $V_{\text{post}} = V_{\text{pre}} + I$ | Term sheets |
| Price per share | $P = V_{\text{pre}}/N_{\text{pre,FD}}$ | Priced rounds |
| Effective pre-money | $V_{\text{pre}} - \Delta N_{\text{pool}}P$ ($= V_{\text{pre}} - qV_{\text{post}}$ from zero) | Pool shuffle |
| Post-money SAFE stake | $I_{\text{SAFE}}/V_{\text{cap,post}}$ | SAFE ledger |
| Conversion price | $\min(V_{\text{cap}}/N_{\text{cap}},\ (1-\delta)P_{\text{round}})$ | SAFEs, notes |
| Note shares | $P_0(1+it)/P_{\text{conv}}$ | Convertible loans |
| Vested shares | $N_g\min(t,T)/T$ for $t \ge t_c$, else 0 | Leavers, acceleration |
| Non-participating payout | $\max(\min(mI,E),\ pE)$; converts above $mI/p$ | Waterfalls |
| Participating payout | $\min(mI,E) + p\max(E-mI,0)$ | Waterfalls |
| Weighted average | $CP_2 = CP_1(A+B)/(A+C)$, $B = I_{\text{new}}/CP_1$ | Down rounds |
| Pro rata | $p\cdot I_{\text{round}}$ | Follow-on rights |
| SLA downtime | $(1-A)\,T$ | Customer contracts |
| Liability cap | $k\cdot F_{12}$ | Customer contracts |

## Cap tables and rounds

- **Three rounds of 20 %, 20 %, 15 %:** you keep 54.4 % of your stake.
- **Dilution is not value loss** when the price per share rises; resist cheap dilution and pool bloat.
- **Pool shuffle:** existing holders end at $1 - d - q$; counter with an 18 to 24 month hiring plan.

| Illustrative Afterwave path | Founders | Pool | Seed | Series A |
|---|---|---|---|---|
| 10 % pool | 90 % | 10 % | | |
| Seed EUR 2 m at 8 m pre (EUR 0.72/share) | 72 % | 8 % | 20 % | |
| Series A EUR 6 m at 24 m pre (EUR 1.728/share) | 57.6 % | 6.4 % | 16 % | 20 % |

## SAFEs and notes

- **Post-money SAFE:** stake fixed at signing; percentages add; founders bear later SAFEs and the round's pool increase.
- **Pre-money SAFE:** SAFEs dilute each other; stake unknown until conversion.
- **YC standard deal (reported for 2026):** USD 125k for 7 % (cap about USD 1.79 m) + USD 375k uncapped MFN.
- **YC deal into a USD 3 m seed at 12 m pre (10 m existing shares):** capitalization 11,126,565; price USD 1.0785; post-seed founders and pool 71.9 %, YC 5.6 % + 2.5 %, seed 20 %.
- **Note vs SAFE:** notes carry interest and maturity; the maturity is leverage for the holder.

## Founder equity

- **Vesting:** 48 months monthly, 12-month cliff; founders reverse-vest; credit for past work.
- **Leavers:** good leaver keeps vested, unvested at nominal; bad leaver loses more.
- **Acceleration:** double trigger (change of control + termination), 50 to 100 %.
- **83(b) (US):** file within 30 days of receiving restricted stock; no extension.
- **Netherlands:** no 83(b); founders often hold via a personal holding BV; options taxed as wage today.
- **Proposed 2027 Dutch regime:** 65 % of option gain taxed, deferred to sale, options from 17 April 2025. Confirm enactment.

## Preferences and anti-dilution

| Term | Accept | Refuse |
|---|---|---|
| Preference | 1x non-participating | 2x+, uncapped participation |
| Anti-dilution | Broad-based weighted average | Full ratchet, narrow-based |
| Pro rata | Major investors | Super pro rata for many |
| Control | Vetoes over their own rights | Vetoes over budgets, hires |
| Other | Information rights | Redemption, cumulative dividends |

- **Single investor EUR 6 m for 25 %:** converts above EUR 24 m; participation costs common EUR 1.5 m at every exit above EUR 6 m.

## Entities

| Form | Liability | Capital | Notes |
|---|---|---|---|
| Eenmanszaak / VOF | Unlimited (VOF joint and several) | None | No shares |
| BV | Limited | EUR 0.01 | Notarial deed, KVK, register |
| STAK | Foundation | n/a | Holds shares, issues depositary receipts |
| Delaware C-corp | Limited | Nominal | YC, US VCs; file franchise tax on assumed par value method |
| Swiss GmbH | Limited | CHF 20,000 fully paid | Members public in register |
| Swiss AG | Limited | CHF 100,000; at least 20 % per share and CHF 50,000 paid | VC standard in Switzerland |

- **Kuwait:** default 51 % Kuwaiti ownership; up to 100 % foreign via a KDIPA licence (Law 116/2013) outside the negative list; branches without a local agent since Law 1/2024. Confirm with counsel.

## Contracts

- **IP:** contractors and non-employee founders keep copyright unless assigned by deed (Art. 2 Auteurswet); check day-job employers' IP clauses.
- **NDA:** purpose, standard exclusions, 2 to 5 year term; refuse residuals.
- **Pilot:** measurable success criteria, conversion terms, background vs foreground IP, explicit data and training rights.
- **Liability:** 1x 12-month fees, indirect loss excluded, super-cap 2x to 3x for data and confidentiality.

| SLA | Per 30-day month | Per year |
|---|---|---|
| 99.5 % | 3.6 h | 43.8 h |
| 99.9 % | 43.2 min | 8.76 h |

- **Always to a lawyer:** founder and shareholder agreements, equity instruments, customer paper with unlimited liability or IP assignment, DPAs, foreign-law contracts, distribution agreements.
`;

export default cheatSheet;
