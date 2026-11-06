import { md } from "../../schema";

const cheatSheet = md`# AW11 EU Machinery Regulation and CE marking for AI-enabled machines: cheat sheet

## Conventions

- **Status date:** 6 November 2026. Items marked (unverified) come from secondary sources only; check the Official Journal before quoting.
- **Numbers:** all Afterwave and customer numbers are **illustrative**, not traction.
- **Paraphrase:** Annex III wording is paraphrased; exact text in Regulation (EU) 2023/1230.

## Dates

| Date | Milestone |
|---|---|
| 19 Jul 2023 | Regulation 2023/1230 in force |
| 20 Jan 2024 | Notified-body provisions apply |
| 27 Jul 2026 | Digital Omnibus on AI (Reg. 2026/1744) in force (unverified details) |
| 2 Aug 2026 | AI Act Art. 50 transparency |
| 11 Sep 2026 | CRA reporting applies |
| 9 Dec 2026 | New Product Liability Directive transposition deadline |
| **20 Jan 2027** | **Machinery Regulation applies; Directive 2006/42/EC repealed** |
| 2 Dec 2027 | AI Act Annex III high-risk (post-omnibus) |
| 11 Dec 2027 | CRA main obligations |
| 2 Aug 2028 | AI Act Annex I high-risk (post-omnibus), via Machinery Regulation delegated acts |

## Scope and operators

- **Regulation, not directive:** same text, directly applicable in every Member State.
- **Per unit:** every unit placed on the market from 20 January 2027 must comply.
- **Covered:** machinery, safety components (physical or digital, including software), partly completed machinery and other related products.
- **Operators:** manufacturer, authorised representative, importer, distributor; rebranding or modifying makes you the manufacturer.
- **Substantial modification:** physical or digital, not foreseen or planned, new hazard or increased risk needing new protective measures; modifier becomes manufacturer.
- **Retention:** technical file and declaration kept 10 years.

## AI and software EHSRs (paraphrased)

| EHSR | Requirement |
|---|---|
| 1.1.2 | Lifecycle risk assessment including foreseeable evolution of self-evolving behaviour |
| 1.1.6 | Ergonomics incl. psychological stress; respond to people, communicate planned actions |
| 1.1.9 | Protection against corruption; safe connections; identified software; evidence of interventions |
| 1.2.1 | Faults, software-logic errors and malicious attempts safe; version and intervention logs (5 years, unverified); bounded task and movement space; operator correction; safety-decision records (1 year, unverified) |
| Part 3 | Autonomous mobile machinery: supervisory function |

- **ML evidence:** miss rate per operating-domain cell with a confidence bound, regression per release, traceable to versions.
- **Rule of three:** zero failures in $n$ trials gives $p_U \approx 3/n$ at 95 %; $10^{-4}$ needs about 30,000 trials.

## Conformity routes

| Classification | Route | Notified body |
|---|---|---|
| Annex I Part A (incl. ML safety components and embedded ML safety systems) | B + C, H or G | Always |
| Annex I Part B, full harmonised standards | A | No |
| Annex I Part B, otherwise | B + C, H or G | Yes |
| Not listed | A | No |
| Partly completed | Declaration of incorporation, no CE | No |

- **NB number after CE:** when the body controls production (H, G).
- **Locked ML models:** whether they count as "self-evolving" is open; plan for Part A.
- **Technical file:** description, drawings, risk assessment, standards, test reports, instructions, safety software source code or logic on request, ML characteristics, data and validation processes.

## Standards (November 2026)

- **Request:** M/605 (Decision C(2025)129, 20 Jan 2025).
- **Approach:** mostly re-citing Directive standards, some with restrictions; first list expected before end-2026 (unverified).
- **Types:** A (ISO 12100), B (ISO 13849-1), C (ISO 10218-1/-2:2025).
- **ML safety functions:** no harmonised standard; ISO/IEC TR 5469 informative only.
- **Humanoids:** ISO 25785-1 still a draft.

## AI Act and the stack

- **Art. 6(1):** safety component of an Annex I product that needs third-party assessment, so high-risk.
- **Omnibus:** machinery moved from Annex I Section A to Section B; AI Act requirements arrive via delegated acts amending Machinery Regulation Annex III (unverified details).
- **Not "nothing until 2028":** Machinery Regulation AI provisions apply from 20 January 2027.
- **CRA:** connected products; reporting now, full obligations 11 December 2027; 325-day gap to the Machinery Regulation cyber EHSRs; postponement requested, not granted (as found).
- **Also:** PLD 2024/2853 (software is a product), EMC, radio equipment, GDPR for logs, market surveillance 2019/1020.

## The wedge

- **Claim:** Afterwave supports manufacturers' safety and conformity work with captured, versioned test evidence; it does not perform conformity assessment or guarantee compliance.
- **Never say:** compliant, certified, accepted by notified bodies, "the date will slip".
- **Evidence event:** every safety-relevant release; demand scales with release cadence.
- **Urgency:** humanoids very high; AMR, mobile manipulators, cobot cells high; test rig makers medium; drives and motors low to medium.
- **Doors:** compliance lead (date), test lead (champion), VP (market date, signs).

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Share of units under the Regulation | $\varphi = N_{\geq T}/N_{tot}$ | L1 exposure |
| Zero-failure bound | $p_U = 1 - \alpha^{1/n} \approx -\ln\alpha/n$ | L2 ML evidence |
| Log volume | $V = f \, s \, t_{op}$ | L2 logging |
| Evidence coverage | $\kappa = n_e/n_a$ | L3 file readiness |
| Schedule slack | $S = (T_{target} - T_{now}) - \sum d_i - b$ | L3 backward plan |
| Evidence cost | $C_{ev} = N_u (H c_h + n_d c_e)$ | L5 value |
| Cost of delay | $C_d = \Delta t \, q \, m$ | L5 urgency |
`;

export default cheatSheet;
