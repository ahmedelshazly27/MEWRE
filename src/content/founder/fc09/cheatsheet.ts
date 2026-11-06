import { md } from "../../schema";

const cheatSheet = md`# FC09 Operating the company: cheat sheet

## Conventions

- **Numbers:** every venture number in this module is **illustrative**, not Afterwave, Mizan or Suhail data.
- **Loaded cost:** salary times about 1.25 to 1.3 for social charges, pension, equipment (assumption).
- **Shadow rate:** founder or volunteer time valued at an hourly rate to make trade-offs visible.

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Variance explained | $R^2 = r^2$ | Selection-method validity (L1) |
| Cost of a bad hire | $C_{\text{bad}} = c_m(t_d + t_x) + S + R + M + O$ | Hiring business case (L1) |
| Value of better process | $\Delta EV = (p_0 - p_1)C_{\text{bad}} - \Delta C_{\text{proc}}$ | Justify work samples (L1) |
| Grant paper value | $G = g\,V_{\text{post}}$ | Offer conversations (L2) |
| Retention | $g_{\text{exit}} = g\prod(1 - d_i)$ | Dilution through rounds (L2) |
| Equity EV | $EV = P_{\text{exit}}(g\rho V_{\text{exit}} - g V_K)$ | Salary vs equity (L2) |
| Break-even grant | $g^* = \Delta S\,T/[P_{\text{exit}}(\rho V_{\text{exit}} - V_K)]$ | Offer design (L2) |
| Meeting cost | $C = N\,h\,w\,f$ | Cadence design (L3) |
| KR score | $s = (x - x_0)/(x^* - x_0)$, clamped 0 to 1 | Quarter-end scoring (L3) |
| Runway | $R = \text{cash}/B_{\text{net}}$ | Updates, board (L4) |
| Raise trigger | $t_{\text{start}} = R - (t_{\text{raise}} + t_{\text{buffer}})$ | Fundraising timing (L4) |
| Switch cost | $H_{\text{eff}} = H - k\,s$ | Calendar design (L5) |
| Weinberg share | $H_{\text{useful}} = H(1 - L(n))$ | Concurrent ventures (L5) |
| Expected value | $EV = \sum p_i x_i$ | Any bet (L6) |
| EVPI | best-after-seeing minus best-now | Cap on information spend (L6) |
| Bayes (odds) | posterior odds = prior odds x LR | Updating base rates (L6) |
| Brier score | $\frac{1}{N}\sum (f_i - o_i)^2$ | Decision journal calibration (L6) |

## Hiring (L1)

- **Scorecard first:** mission, 3 to 5 dated outcomes with numbers, 4 to 8 competencies.
- **Structured interview:** same questions, anchored 1/3/5 scales, scores recorded before the debrief.
- **Work sample:** real slice of the job, 2 to 4 h, paid, criteria written first.
- **References:** "Rate 1 to 10; what would make it a 10?", plus one backchannel.
- **Biggest lever on bad-hire cost:** detection time; write 90-day outcomes.

| Method | Validity (1998) | Validity (2022, check) |
|---|---|---|
| Structured interview | 0.51 | 0.42 |
| Work sample | 0.54 | 0.33 |
| General mental ability | 0.51 | 0.31 |
| Unstructured interview | 0.38 | 0.19 |
| Reference checks | 0.26 | n/a here |

- **Illustrative bad hire (Afterwave):** EUR 122,000, about 1.5x base salary.

## Team and equity (L2)

- **Vesting:** 4 years, 1-year cliff, then monthly.
- **Quote grants as:** options and fully diluted % on a date.
- **Contractor:** uncertain, specialist or part-time need; always an IP assignment.
- **Volunteers:** written role, time, return, confidentiality, IP; no informal equity promises.
- **Netherlands:** STAK common for employee equity; planned 2027 regime taxes 65% of the gain, deferred to sale (confirm).

| Hire | Rough grant (seed, heuristic) |
|---|---|
| 1 to 2 | 0.5 to 2.0% |
| 3 to 5 | 0.3 to 1.0% |
| 6 to 10 | 0.15 to 0.5% |
| Senior executive | 1.0 to 2.0% |

- **Illustrative offer:** 0.8%, $\rho$ = 0.544, EUR 400 m at 8%, $V_K$ = EUR 6 m: EV EUR 135,424; break-even 0.47%.

## Cadence (L3)

- **OKRs:** at most 3 objectives, 3 to 5 KRs each, outcome with baseline, target, date.
- **Scoring:** aspirational 0.6 to 0.7 is healthy; committed should reach 1.0; never tie to bonuses.
- **Weekly review:** pre-read the day before, red items only, decisions in the log.
- **Default medium:** written and asynchronous; meet for conflict, relationships and live decisions.
- **Illustrative:** 6 people x 1 h x EUR 75 x 48 weeks = EUR 21,600/yr.

## Board and investors (L4)

| Stage | Typical board |
|---|---|
| Pre-seed | Founders only |
| Seed | 2 founders + 0 or 1 investor |
| Series A | 2 founders + 1 or 2 investors + 0 or 1 independent |

- **Board cycle:** questions at T-14, deck at T-7, pre-calls T-5 to T-2, minutes at T+2.
- **No surprises:** bad news goes in pre-calls, not the meeting.
- **Monthly update:** headline, metrics vs plan, cash and runway, highlights, lowlights, asks.
- **Advisors:** small grant, monthly vesting about 2 years, short cliff, written expectations.
- **Dutch BV:** control often sits in reserved matters, not only seats.
- **Illustrative:** EUR 600 k at EUR 45 k/month: 13.3 months, raise starts in 4.3; with one hire, 11.2 and 2.2.

## Founder time (L5)

| Concurrent projects | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Lost to switching (Weinberg) | 0% | 20% | 40% | 60% | 75% |

- **Time zones:** Kuwait UTC+3 all year; 2 h ahead of the Netherlands in winter, 1 h in summer.
- **Working weeks:** Netherlands Monday to Friday, Kuwait Sunday to Thursday; overlap Monday to Thursday.
- **Ramadan 2027:** expected to start around 8 February 2027 (moon sighting); shorter Kuwait hours.
- **Architecture:** venture days, maker blocks in the morning, batched messages.
- **Burnout (ICD-11):** exhaustion, cynicism, reduced efficacy; set tripwires in advance.
- **Illustrative:** 55 h with 60 switches at 20 min gives 35 h; with 10 switches, 51.7 h.

## Decisions (L6)

- **EV is not enough** when the bad case is ruinous or irreversible: check the worst case against runway.
- **Type 1 (one-way door):** memo, base rates, pre-mortem, sleep on it. **Type 2:** decide fast, review date.
- **EVPI** caps what any pilot, study or delay is worth.
- **Outside view first:** base rate, then multiply odds by likelihood ratios.
- **Pre-mortem:** "It failed a year from now: why?" Silent writing, junior first, top three get owners.
- **Decision journal:** decision, options, probabilities, assumptions, state of mind, review date.
- **Illustrative test platform:** build now EV 250 k, wait 230 k, EVPI 60 k, fast pre-sale test 281 k.
`;

export default cheatSheet;
