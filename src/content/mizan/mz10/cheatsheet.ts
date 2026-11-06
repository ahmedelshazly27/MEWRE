import { md } from "../../schema";

const cheatSheet = md`# MZ10 Validation study design and co-publishing: cheat sheet

## Status and conventions

- **Shagaya pilot:** targeted and in preparation with KISR researchers as methodology partner. Never say signed or running.
- **Cleaning-arm failure (2018 to 2019):** extent, dates and manual cleaning to be confirmed from KISR records before use.
- **Numbers:** every Mizan or plant number in this module is illustrative.
- **Gap:** KISR confirmed there is no standard method for turning operational data into cleaning decisions.
- **Baseline:** temperature-corrected PR to IEC 61724.

## Study design

- **Hypothesis:** quantity, ground truth, metric and threshold, unit and sample, scope. Must be able to fail.
- **Three claim levels:** measurement validity, decision validity, value. Do them in that order.
- **Ground truth:** independent of the method's inputs, with known uncertainty. Another algorithm is a baseline, not a truth.
- **Independent unit:** cleaning interval or block-interval pair, not the day.
- **Pre-registration:** hypotheses, metrics, thresholds, filters, hold-out, negative-result reporting, dated before analysis.
- **Duration:** at least one summer (shamal dust) and one winter (dew).

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Mean bias error | $\mathrm{MBE} = \frac{1}{n}\sum (\hat{y}_i - y_i)$ | l01 |
| RMSE and decomposition | $\mathrm{RMSE}^2 = \mathrm{MBE}^2 + s_e^2$ | l01 |
| Coverage and its SE | $\hat{c} = \frac{1}{n}\sum \mathbf{1}[L_i \le y_i \le U_i]$, $\mathrm{SE} = \sqrt{c(1-c)/n}$ | l01 |
| Sample size | $n = ((z_{1-\alpha/2} + z_{1-\beta})\sigma/\delta)^2$ | l01 |
| Precision target | $n = (z_{1-\alpha/2}\sigma/h)^2$ | l01 |
| Effective n, AR(1) | $n_{\mathrm{eff}} = n(1-\rho)/(1+\rho)$ | l01 |
| Difference-in-differences | $(\bar{Y}_{T,post} - \bar{Y}_{T,pre}) - (\bar{Y}_{C,post} - \bar{Y}_{C,pre})$ | l02 |

## Worked numbers (illustrative)

| Case | Inputs | Result |
|---|---|---|
| Daily SR bias to 0.25 pp | sigma 1.0 pp, rho 0.6, 70% valid days | 62 eff. days, 248 valid, 354 calendar days |
| Soiling-rate difference | delta 0.10, sigma_d 0.15 %/day, 80% power | 18 intervals, about 18 months at monthly cleaning |
| Coverage precision | plus or minus 3 points at 95% | about 203 units |
| Outage DiD | treated -0.077, control -0.025 | -0.052 PR (naive -0.077) |
| Value scenario | 500 MWp, 0.5 to 1.0 pp recovered | 5 to 10 GWh/yr, label as scenario |

## Natural experiment

- **Why:** reveals the uncleaned soiling trajectory, never seen in normal operation.
- **Parallel trends:** check the pre-period gap; diverging gap means trouble.
- **Removed by control:** weather, season, dust storms, constant sensor offsets.
- **Not removed:** section-only outages, curtailment on one section, different technology seasonality.
- **Dirty pyranometer:** PR reads high, soiling looks smaller.
- **Blind:** method run without outage dates, outputs lodged before unblinding.
- **No control:** interrupted time series, and say it is weaker.

## Partnership

- **Methodology partner:** co-designs, reviews, co-authors. Not a customer, not an endorser.
- **Sequence:** NDA, MoU, binding research or data agreement, study plan, study, partner review, submission.
- **Asset owner:** Shagaya Phase I reported transferred to MEW (now MEWRE); data access may need its consent.
- **Agreement topics:** purpose, data and security, roles, publication review, IP, confidentiality, attribution, term.
- **Mizan must keep:** commercial use of the method, agreed public wording, right to publish jointly even if negative, background IP.
- **Authorship (ICMJE):** contribution, drafting or revision, final approval, accountability. Others acknowledged. Record CRediT roles.
- **Competing interests:** always declared.
- **Prior art:** any public disclosure, including preprints and posters. Europe has no general grace period.

## Publishing

- **Paper:** introduction, site and data, methods, validation design, results with intervals, limitations, statements.
- **Timeline (illustrative):** historical-data paper about 18 months, prospective about 30; agreements on the critical path.
- **Preprint checks:** journal policy, partner review period, patents.
- **Venues:** IEEE PVSC and EU PVSEC for exposure; RSER, Solar Energy, Progress in Photovoltaics, IEEE JPV for the record.
- **FAIR:** DOI (Zenodo), open formats and units, CC BY 4.0 for data, OSI licence for code.
- **Planned open tools:** Kuwait dust and soiling atlas, Kuwait electricity dataset, Kuwait energy systems toolkit; release needs data rights.

## Claims

| Rung | Say |
|---|---|
| Pilot in preparation | "Preparing a pilot at Shagaya Phase I with KISR researchers as methodology partner" |
| Preliminary | "Preliminary, unreviewed results indicate ..." |
| Preprint | "In a preprint co-authored with KISR researchers (not peer reviewed) ..." |
| Peer reviewed | "In a peer-reviewed study in [journal] ... within [interval] at [plant, period]" |
| Decision trial | "Reduced soiling losses by X (95% CI) relative to existing schedule" |

- **Never:** "KISR-validated", "IEC 61724 certified", "guaranteed savings", "proven in Kuwait".
- **Savings before a decision trial:** a labelled scenario, with the full range.
- **Tenders:** claims can become representations; cite and attach the paper.
- **Claims register:** one owner approves every external sentence.
`;

export default cheatSheet;
