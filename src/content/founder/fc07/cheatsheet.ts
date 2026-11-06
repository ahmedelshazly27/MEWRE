import { md } from "../../schema";

const cheatSheet = md`# FC07 Fundraising: cheat sheet

## Conventions

- **Ownership:** always fully diluted (shares, options, unallocated pool, SAFEs).
- **Venture numbers:** all Afterwave, Mizan and Suhail figures in this module are **illustrative**.
- **Dated facts:** from the course research briefs (November 2026); confirm on the primary page before quoting.

## Fund economics

- **LPs vs GP:** LPs commit capital, no deal say; GP picks companies, earns fees and carry.
- **Fund life:** about 10 years; new investments in years 1 to 4; reserves 40 to 60 % for follow-ons.
- **2 and 20:** 2 %/yr fee (about 20 % of commitments over life); 20 % carry after LPs are made whole.
- **LP target:** roughly 3x net TVPI; DPI is the cash actually returned.
- **Power law:** one or two companies drive the fund; a certain mid-size exit cannot move it.

| Example | Value |
|---|---|
| EUR 80m fund, 3x net, 20 % carry: gross proceeds needed | EUR 280m (4.4x on EUR 64m invested) |
| Exit ownership after 12.5 % entry and 20/20/10 % dilution | 7.2 % |
| Fund-returner exit for that fund | about EUR 1.1bn (about EUR 110m ARR at 10x) |

## Stages and round norms

- **Pre-seed:** buys team and insight risk.
- **Seed:** buys product and early-market risk (pilots, paid usage).
- **Series A:** buys repeatability (recurring revenue, sales motion, retention).

| Stage | US raise (indicative) | Dilution |
|---|---|---|
| Pre-seed | USD 0.5 to 2.5m | 7 to 15 % |
| Seed | USD 2 to 5m | 15 to 25 % |
| Series A | USD 8 to 20m | 18 to 25 % |

- **Europe:** rounds and valuations often 20 to 40 % below US at the same stage (indicative).
- **MENA (MAGNiTT):** 2025 USD 3.8bn, 688 deals; H1 2026 USD 1.35bn, 214 deals (-22 % funding, -41 % deals); UAE 66 %; AI about half.

## Capital sources (as reported, Nov 2026)

| Source | Terms | Note |
|---|---|---|
| YC | USD 125k for 7 % post-money SAFE + USD 375k uncapped MFN SAFE | Implied USD 1.79m post; W27 deadline 2 Nov 2026 passed |
| a16z speedrun | USD 500k for about 10 % + USD 500k in next round within 18 months | Implied USD 5m post; SR008 Feb to Apr 2027 |
| Antler EU | EUR 100k uncapped MFN SAFE | Varies by country |
| Hub71 | AED 250k in-kind + AED 250k cash via SAFE | Unverified on hub71.com |
| WBSO 2026 | 36 % to EUR 391,020 (starters 50 %), 16 % above | Dutch payroll R&D only; apply in advance |
| Innovatiekrediet | Loan up to 45 % (small firm), min project EUR 150k, max EUR 10m | Open until 31 Dec 2026 |
| EIC Accelerator | Grant up to EUR 2.5m + EUR 1 to 10m equity | Oct 2025: 61 of 923 funded (6.6 %) |

- **Stacking rule:** customers and tax credits first, equity for the gap, competitive grants as upside.
- **Jurisdiction:** WBSO needs a Dutch employer of R&D staff; YC needs a Delaware, Cayman or Singapore parent.

## Pitch

- **Order:** problem, insight, why now, product, evidence, market, model, competition, GTM, team, ask.
- **Insight:** true, non-obvious, actionable.
- **Afterwave why now:** Machinery Regulation applies 20 Jan 2027; physical AI change frequency; adjacent rounds (Nominal USD 80m at USD 1bn, Mar 2026).
- **Evidence slide:** real data or bracketed placeholders, never invented logos.

## Data room and updates

- **Seed room:** corporate, cap table, 12 months financials, runway model, pilot agreements (redacted), security overview, IP assignments, grant decisions.
- **Never in the room:** customer test data or anything from inside a customer's Enclave.
- **Update:** headline, metrics, wins, lowlights, asks, thanks; same day each month.

## Running the round

- **Warm intros:** portfolio founders, co-investors, trusted operators; forwardable email; double opt-in.
- **Compress:** first meetings within two to three weeks; about 10 weeks launch to cash.
- **Lead first:** followers commit once terms are set.
- **Exploding term sheet:** ask honestly for an extension that fits your process.

## Term sheets

- **Binding:** confidentiality, no-shop (30 to 60 days), sometimes costs.
- **Standard:** 1x non-participating, broad-based weighted average, non-cumulative dividends, information and pro rata rights.
- **Refuse:** participation, multiple above 1x, full ratchet, redemption, cumulative dividends, operating vetoes.
- **Board at seed:** founders control (for example 2 founders + 1 investor, or founders + observer).

| Exit (EUR m), EUR 3m for 22.2 % | 1x non-part.: investor / others | 1x participating: investor / others |
|---|---|---|
| 10 | 3.00 / 7.00 | 4.56 / 5.44 |
| 13.5 | 3.00 / 10.50 | 5.33 / 8.17 |
| 100 | 22.22 / 77.78 | 24.56 / 75.44 |

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Fees | $F = fCT$ | Fund economics |
| Carry | $K = c\max(0, P - C)$ | Whole-fund waterfall |
| LP net multiple | $M_{\text{net}} = [C + (1-c)(P-C)]/C$ | Fund target |
| Required proceeds | $P = C + (M_{\text{net}}-1)C/(1-c)$ | Fund target |
| Exit ownership | $o_{\text{exit}} = o_0\prod(1-d_i)$ | Dilution |
| Fund-returner | $V_{\text{FR}} = C/o_{\text{exit}}$ | Partner screen |
| Post-money | $V_{\text{post}} = V_{\text{pre}} + I$, $o = I/V_{\text{post}}$ | Every round |
| Post-money SAFE | $o = I/V_{\text{cap,post}}$ | Pre-seed |
| Round size | $I = \bar{B}(m+b) - K_0$ | Planning |
| Runway | $R = K/B_{\text{net}}$ | Updates |
| WBSO | $W = r_1\min(S,S_1) + r_2\max(0,S-S_1)$ | NL R&D |
| Dilution equivalent | $\Delta o = G/V_{\text{post}}$ | Grants |
| Grant expected value | $E[G] = pG - c_{\text{app}}$ | EIC decision |
| Bottom-up SAM | $N_{\text{acc}}\times\text{ACV}$ | Market slide |
| Burn multiple | $B_{\text{net}}/\Delta\text{ARR}$ | Efficiency |
| CMGR | $(X_t/X_{t-n})^{1/n} - 1$ | Growth |
| Funnel | $N_0 = N_{\text{TS}}/\prod p_k$ | List size |
| Effective pre-money | $V_{\text{pre}} - qV_{\text{post}}$ | Pool shuffle |
| Non-participating pref | $\min(V, \max(mI, oV))$ | Waterfall |
| Participating pref | $\min(V, mI + o(V - mI))$ | Waterfall |
| Weighted-average anti-dilution | $CP_2 = CP_1(A+B)/(A+C)$ | Down round |
`;

export default cheatSheet;
