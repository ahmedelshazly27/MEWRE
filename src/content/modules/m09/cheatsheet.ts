import { md } from "../../schema";

const cheatSheet = md`# m09 Contracts & Commercial: cheat sheet

## FIDIC 2017 books
| Book | Design | Price | Administrator | Ground (4.12) | Climate EOT (8.5c) |
|---|---|---|---|---|---|
| Red (Construction) | Employer | Remeasured BoQ | Engineer | Employer: time + Cost | Yes (time only) |
| Yellow (Plant & Design-Build) | Contractor | Lump sum | Engineer | Employer: time + Cost | Yes (time only) |
| Silver (EPC/Turnkey) | Contractor | Fixed lump sum | Employer's Representative | Contractor (Unforeseeable Difficulties) | No |
| Gold (DBO) / Emerald (underground) | Contractor | Lump sum + operation | ER / Engineer | Contractor-leaning / GBR-shared | – |

- **Risk principle:** allocate risk to the party that controls it; otherwise to the cheapest bearer.
- **Risk premium:** $RP = k \cdot EV$, with $k > 1$.

## Time limits (2017 defaults)
| Item | Limit |
|---|---|
| Performance security after Letter of Acceptance (4.2) | 28 d |
| Commencement Notice before Commencement Date / Commencement after LoA (8.1) | ≥ 14 d / ≤ 42 d |
| Initial programme after 8.1 Notice / Engineer's review (8.3) | 28 d / 21 d |
| Notice of Claim after awareness (20.2.1) | **28 d** (time-bar) |
| Engineer's Notice if claim late / initial response | 14 d |
| Fully detailed Claim incl. legal basis (20.2.4) | **84 d** (else Notice lapses) |
| Continuing claims (20.2.6) | monthly; final 28 d after effects end |
| 3.7 agreement / determination | 42 d + 42 d |
| NOD on determination or DAAB decision | 28 d |
| Refer to DAAB after NOD on determination | 42 d |
| DAAB decision | 84 d (binding at once) |
| Amicable settlement before arbitration | 28 d after NOD |
| IPC issue / payment (14.6, 14.7) | 28 d / 56 d after Statement |
| Taking-over application / Engineer's TOC (10.1) | ≤ 14 d before / 28 d |
| DNP extension max (11.3) | 2 yrs beyond DNP |
| Performance Certificate after last DNP (11.9) | 28 d |
| Exceptional Event notice / termination (18.2, 18.5) | 14 d / 84 d continuous or > 140 d total |
| Suspension prolonged (8.12) | 84 d |
| Contractor suspension notice (16.1) | ≥ 21 d |
| Base Date | 28 d before tender deadline |

## Payment
- **Advance recovery start:** when certified IPCs exceed 10% of (ACA − PS).
- **Advance recovery rate:** 25% of each IPC until repaid.
- **Retention:** e.g. 10% per IPC up to 5% of ACA; half released at TOC, half after DNP.
- **Variation valuation order:** contract rates, then derived rates, then Cost Plus Profit (default 5%).
- **Omissions:** credit them to the Employer.
- **Time-related costs:** recoverable only via EOT.

**Net payment for IPC k** (each deduction capped at its remaining balance):

$$N_k = W_k - \Delta R_k - \Delta A_k$$

## Securities
| Security | Typical | Released |
|---|---|---|
| Bid bond | 1–5% | Signature / award to others |
| Performance security | 10% | Performance Certificate (often 5% after TOC) |
| APG | = advance | Reduces with recovery |
| Retention / retention bond | 5% | ½ TOC, ½ end DNP |
| Warranty bond | 2.5–5% | End of DNP |
| PCG | Full liability | All obligations end |

- **On-demand bond:** the bank pays a compliant demand (URDG 758: statement of breach).
- **Employer's limit:** may claim only what it is entitled to.
- **Unjustified calls:** the Employer indemnifies the Contractor (4.2).

**Call amount:**

$$\min(S,\ C_{\text{comp}} - B_{\text{unpaid}} + L_{\text{other}})$$

## Liquidated damages
| Quantity | Formula | Note |
|---|---|---|
| Daily delay LD rate | $LD_d = E_{\text{yr}} T/365 + D i/365 + PPA_d + F_d$ | sanity 0.03–0.1% of price/day |
| Total delay LDs | $\min(LD_d \times \text{days late after EOT},\ c \cdot CP)$ | after EOT |
| PR buy-down | $\frac{PR_g - PR_m}{PR_g} E_{\text{yr}} T \cdot AF$ | performance LD |
| Capacity buy-down | $\Delta P \cdot \frac{E_{\text{yr}}}{P_g} T \cdot AF$ | performance LD |
| Annuity factor | $AF = \frac{1-(1+i)^{-n}}{i}$ | 7%, 30 yr: 12.41; 8%, 25 yr: 10.67 |

| Cap | Typical |
|---|---|
| Delay LDs | 10–20% |
| Performance LDs | 10–15% |
| Aggregate | 20–30% |

- **Minimum performance level:** below it, remedy or reject.
- **Performance LDs:** used for debt prepayment.
- **Penalty test (common law):** Makdessi — legitimate interest, not out of all proportion.
- **Civil law:** الشرط الجزائي; the court may reduce it (Kuwait articles: verify).

## PPA / Kuwait PPP
### Institutions and terms
- **KAPP:** PPP Law 116/2014; Decree 78/2015.
- **Approvals:** Higher Committee (Minister of Finance), State Audit Bureau approval, Fatwa and Legislation review.
- **Offtaker:** MEWRE.
- **Solar PPA term:** **30 yrs**.
- **IWPP ECWPA term:** 25 yrs (AZN-1: 40).
- **Shareholding (secondary source):** 50% IPO / 6–24% public / ≥26% private; practice 40% private / 60% state (verify).
- **Not confirmed:** PPA currency, government support, termination regime, deemed-energy terms (verify).

### Tariff and protections
- **Tariff structure:** energy-only (PV) vs capacity + energy (thermal, BESS).
- **Deemed energy triggers:** grid outage, curtailment, late grid connection.
- **Termination payments (ascending):** SPV default (≤ debt) < natural FM (debt + equity) < offtaker default/political FM (debt + equity + return).
- **Direct agreement:** notice, cure period, step-in, novation.

**Capacity + energy revenue:**

$$R = CC \cdot P \cdot \min(1, A/A_{\text{ref}}) + EC \cdot E$$

**Deemed energy:**

$$\sum P_{\text{exp}} \Delta t - E_{\text{allow}}$$

## O&M / LTSA
- **Time availability $A_t$:** capacity-weighted hours.
- **Availability guarantee:** 98.5–99.5%.
- **Malus cap:** 50–100% of the fee.
- **PR guarantee:** temperature-corrected, test baseline, degradation allowance, soiling assumption.
- **BESS:** augmentation or LDs; operating envelope; HVAC responsibility.
- **Handover:** as-builts, settings, SCADA credentials, spares, warranties, DNP interface agreement.

| Quantity | Formula |
|---|---|
| Energy-based availability | $A_E = E_{\text{act}}/(E_{\text{act}} + E_{\text{lost}})$ |
| Availability malus | $(A_g - A_E)(E_{\text{act}} + E_{\text{lost}}) T$ |
| BESS guaranteed energy | $E_g(y) = E_{\text{BOL}}(1-d)^y$ |

## Delay and disputes (SCL Protocol 2nd ed., 2017)
- **EOT:** on the updated programme; float shared unless the contract says otherwise.
- **Methods:** impacted as-planned; **TIA** (contemporaneous, preferred); time-slice windows; as-planned vs as-built windows; longest path; collapsed as-built.
- **Concurrency:** time, not money.
- **Prolongation:** on actual time-related costs.
- **Disruption:** by measured mile; avoid global claims.
- **Dispute path:** DAAB → binding decision, comply → NOD 28 d → arbitration (ICC default).
- **Kuwait forum:** government contract dispute forum and arbitration rules (verify with legal).

**Extension of time:**

$$EOT = \max(0, d - TF)$$

## PM reflexes
1. Read Part B (Particular Conditions) before quoting a General Condition.
2. Keep a notices register: every Notice, sub-clause, received date, response deadline.
3. Employer's claims (delay damages) also need a 28-day Notice.
4. Never instruct the Engineer on a 3.7 determination; give evidence instead.
5. Track bond expiries 60 days ahead; calculate entitlement before calling.
6. Treat MEWRE's grid works as the IPP's critical path.
`;

export default cheatSheet;
