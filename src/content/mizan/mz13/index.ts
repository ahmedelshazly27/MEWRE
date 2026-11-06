import { md, type Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import { formulas } from "./formulas";
import { references } from "./references";
import { glossary } from "./glossary";
import { exam } from "./exam";

const mod: Module = {
  id: "mz13",
  number: 13,
  title: "Capstone: Shagaya validation study and business case",
  titleAr: "المشروع الختامي: دراسة التحقق في الشقايا ودراسة الجدوى التجارية",
  summary:
    "Pull the Mizan track together into two deliverables. First, the design of the targeted Shagaya Phase I soiling validation study with KISR researchers: falsifiable hypotheses, the data request, the temperature-corrected PR baseline, soiling inference, the 2018 to 2019 cleaning-arm failure as a natural experiment, agreement and decision metrics and a pre-registered protocol, then its defence against researchers' objections on temperature correction, sensor drift and publication rights. Second, the cleaning optimisation business case for a Gulf IPP: the savings stack, baseline dependence, who captures the value, pricing options and a one-page case defended to investors and customers. The module exam is the Mizan capstone score.",
  whyItMatters:
    "The Shagaya pilot is Mizan's live thread and it is not signed: what gets it signed is a study design KISR researchers can defend to their peers and MEWRE can approve. What turns it into a company is a business case a Gulf IPP's asset manager and CFO will pay for at some of the lowest PV tariffs in the world. You own both conversations; this capstone makes you produce the documents and rehearse the hard questions before they are asked for real.",
  competencies: ["mz-validation"],
  prerequisites: ["mz02", "mz03", "mz04"],
  estimatedHours: 6,
  lessons: [l01, l02, l03],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet: md`# Shagaya validation study and business case: capstone cheat sheet

## Status and facts

- **Pilot status:** targeted, in preparation; never say signed, running or KISR-validated.
- **Partner:** KISR researchers (co-authors of Al-Rasheedi et al., RSER 133, 2020, 110139) as methodology partner.
- **Plant:** Shagaya Phase I PV, 11.15 MW, thin-film and poly-Si sections, monthly water cleaning, dust-storm drops of about 30 %.
- **Agreed baseline:** temperature-corrected PR to IEC 61724.
- **Open question KISR confirmed:** no standard method turns operational data into cleaning decisions.
- **Natural experiment:** 2018 to 2019 cleaning-arm failure; dates, sections and data retention still to confirm.

## The four hypotheses

| # | Claim | Metric (example threshold) |
|---|---|---|
| H1 Baseline | Corrected PR removes temperature seasonality | Post-cleaning amplitude at most 1.5 points; no residual correlation with cell temperature |
| H2 Inference | Inferred SR agrees with independent reference | Bias within ±0.5, limits of agreement within ±2 points |
| H3 Natural experiment | Normal-period rates explain the failure loss | Within ±25 % after storm steps removed |
| H4 Decision | Condition-based rule beats monthly cleaning | Regret reduction larger than its uncertainty |

## Protocol rules

- **Freeze before results:** T_ref definition, coefficients per section, filters, inference software version and parameters, thresholds.
- **Blind:** analyst does not see station data until the monthly lock.
- **Change control:** signed amendment with reason, reported in the paper.
- **Report everything:** including failed hypotheses.
- **Phases:** protocol, data audit, back-analysis, instrumentation, measurement year, report.

## Defence

| Objection | Validity | Answer |
|---|---|---|
| Temperature artefact | Construct | Smooth bias under 1 %, cancels in SR; leak only from temperature change within an interval; per-section coefficients and residual test |
| Pyranometer drift and dirt | Internal | Drift mimics degradation; sensor soiling hides module soiling; cleaning log, redundancy, clear-day satellite ratio |
| Outage during failure | Internal | Filter from logs, rerun, report |
| Small fixed plant | External | Scope statement, re-validate on a tracker plant |
| Exclusive publication | Partnership | KISR leads the paper with time-limited first publication; data stays with owner; Mizan keeps software, cites published results with review |

## Business case

- **Savings stack:** interval, season, events, cleaning faults, capex sizing.
- **Baseline first:** cost is flat near the optimum; price against the customer's current policy.
- **Whose money moves:** IPP (tariff, guarantees), fixed-price O&M contractor (cleaning cost, penalties), state plant (displaced fuel).
- **Pricing:** per-MWp subscription, gain-share, hybrid, paid pilot credited against year one.
- **Never:** cite Shagaya results before publication; price on the best-case baseline.

## Illustrative IPP (1,000 MWp, 2,300 kWh/kWp, USD 15/MWh, USD 300k per cycle, 0.3 %/day)

| Policy | Cleaning | Lost energy | Total (USD m/yr) |
|---|---|---|---|
| Monthly | 3.65 | 1.55 | 5.20 |
| Optimal fixed, 46 d | 2.38 | 2.38 | 4.76 |
| Seasonal, 65 d / 38 d | 2.30 | 2.30 | 4.60 |
| Seasonal + events | 2.00 | 2.35 | 4.35 |

- **Savings:** USD 0.85 m/yr against monthly (USD 850/MWp), USD 0.41 m against optimal fixed.
- **Fees:** USD 250/MWp is 29 % or 61 % of savings; hybrid USD 100/MWp + 20 % is 32 % or 44 %.

## Key formulas

| Quantity | Formula | Where |
|---|---|---|
| Corrected PR | $PR_{corr} = \sum E / \sum P_{STC} (G/G_{STC}) [1 + \gamma (T_{cell} - T_{ref})]$ | Baseline, lesson 1 |
| Inferred SR | $SR_t = PR_{corr,t} / PR_{corr,0}(t)$ | Inference, lesson 1 |
| Difference-in-differences | $\hat\delta = (\Delta \bar Y)_T - (\Delta \bar Y)_C$ | Natural experiment |
| Agreement | $\bar d \pm 1.96 s_d$ | H2 |
| Regret | $R = J(\pi) - J(\pi^*_{\text{hindsight}})$ | H4 |
| Coefficient bias | $\approx (\gamma - \gamma')(T_{cell} - T_{ref})$ | Defence |
| Rate leak | $\Delta r \approx (\gamma - \gamma') \Delta T_{int} / T$ | Defence |
| Sensor soiling | $r_{app} = r_{mod} - r_{sens}$ | Defence |
| Annual cost | $J = 365 C / T + p E r T / 2$ | Business case |
| Optimal interval | $T^* = \sqrt{2 \cdot 365 C / (r E p)}$ | Business case |
| Flatness | $J(kT^*)/J^* = \tfrac{1}{2}(k + 1/k)$ | Baseline dependence |
| Fault loss | $\lambda r D^2 / 730$ | Fault layer |
| Fees | $fP$; $\alpha S$; $f_0 P + \alpha_h S$ | Pricing |`,
};

export default mod;
