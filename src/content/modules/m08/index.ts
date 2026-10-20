import { md, type Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import l06 from "./l06";
import l07 from "./l07";
import l08 from "./l08";
import exam from "./exam";
import glossary from "./glossary";
import formulas from "./formulas";
import references from "./references";

const cheatSheet = md`# M08 Project Management & Controls — Cheat Sheet

## Frameworks

### PMBOK 7
- **Principles:** 12
- **Performance domains (8):** Stakeholders; Team; Development approach & life cycle; Planning; Project work; Delivery; Measurement; Uncertainty
- **Process groups (5):** Initiating; Planning; Executing; Monitoring & Controlling; Closing

### PRINCE2 7
- **Structure:** 7 principles, 7 practices, 7 processes
- **Practices:** business case, organizing, plans, quality, risk, issues, progress
- **Board — Executive:** owns the business case
- **Board — Senior User:** Control Centre / operations
- **Board — Senior Supplier:** OE / IPP / EPC
- **Tolerances:** time, cost, scope, quality, benefits, risk, sustainability
- **Exception rule:** a **forecast** breach of tolerance triggers an exception report

## CPM scheduling

| Rule | Formula | Note |
|---|---|---|
| Forward pass | $ES_j=\max(EF_i+L)$, $EF=ES+D$ | earliest dates |
| Backward pass | $LF_i=\min(LS_j-L)$, $LS=LF-D$ | latest dates |
| Total float | $TF=LS-ES$ | |
| Free float | $FF=\min ES_{succ}-EF$ | $0\le FF\le TF$ |
| SS link | $ES_j\ge ES_i+L$ | |
| FF link | $EF_j\ge EF_i+L$ | |
| CPLI | $(CPL+TF_{end})/CPL$ | target $\ge 0.95$ |
| BEI | completed / baseline-due | target $\ge 0.95$ |

- **Delay rule:** completion delay = slip − total float (if positive)
- **Prolongation:** only for completion delay

### DCMA 14-point check

| # | Check | Threshold |
|---|---|---|
| 1 | Missing logic | ≤ 5 % |
| 2 | Leads | 0 |
| 3 | Lags | ≤ 5 % |
| 4 | FS relationships | ≥ 90 % |
| 5 | Hard constraints | ≤ 5 % |
| 6 | High float (TF > 44 d) | ≤ 5 % |
| 7 | Negative float | 0 |
| 8 | High duration (> 44 d) | ≤ 5 % |
| 9 | Invalid dates | 0 |
| 10 | Resources | — |
| 11 | Missed tasks | ≤ 5 % |
| 12 | Critical path test | — |
| 13 | CPLI | ≥ 0.95 |
| 14 | BEI | ≥ 0.95 |

## Earned value

| Metric | Formula | Read |
|---|---|---|
| CV | $EV-AC$ | negative = bad |
| SV | $EV-PV$ | negative = bad |
| CPI | $EV/AC$ | < 1 = bad |
| SPI | $EV/PV$ | < 1 = bad |
| EAC (CPI) | $BAC/CPI$ | report a range |
| EAC (budget rate) | $AC+(BAC-EV)$ | report a range |
| EAC (CPI·SPI) | $AC+\frac{BAC-EV}{CPI\cdot SPI}$ | report a range |
| EAC (weighted) | $AC+\frac{BAC-EV}{0.8CPI+0.2SPI}$ | report a range |
| ETC | $EAC-AC$ | |
| VAC | $BAC-EAC$ | |
| TCPI | $\frac{BAC-EV}{BAC-AC}$ | > CPI + 0.05–0.10 → not credible |
| Earned schedule | $ES=C+\frac{EV-PV_C}{PV_{C+1}-PV_C}$ | |
| SPI(t) | $SPI(t)=ES/AT$ | |
| IEAC(t) | $IEAC(t)=PD/SPI(t)$ | |

### Rules of credit
- **Units completed:** piles, rows, modules, cable m
- **Weighted milestones:** procurement = approval 5 / PO 5 / FAT 15 / shipped 15 / on site 60
- **0/100:** tasks shorter than 1 period
- **50/50**
- **LoE:** PM only

### Progress inflation to spot
- Credit taken at PO
- Installed-not-tested counted as progress
- Subjective % complete
- Front-loading
- Rework reported as progress

## Risk

| Quantity | Formula | Note |
|---|---|---|
| Risk score | $P\times I$ | ordinal, never sum |
| EMV | $\sum p_r C_r$ | |
| PERT mean | $t_e=(a+4m+b)/6$ | |
| PERT spread | $\sigma=(b-a)/6$ | path: add means, add variances |
| Triangular mean | $(a+m+b)/3$ | |
| Percentile | $X_p=\mu+z\sigma$ | $z_{80}=0.842$, $z_{90}=1.282$ |

- **Contingency:** P80 − base, held in the baseline
- **Management reserve:** outside the baseline
- **Merge bias:** two P50 paths → 25 % joint probability

### Kuwait risks
- **Heat:** 53.9 °C record (WMO)
- **Summer midday work restriction** (verify)
- **Approvals chain:** KAPP → Higher Committee → Audit Bureau (prior review at ≥ KD 100k, verify)
- **Law 94/2026:** tenders law amendment
- **Customs:** Zone 2 — up to 10 % exemption reported
- **FX:** USD-priced equipment
- **MEWRE grid interfaces**
- **Shamal dust**

## Change, interfaces, documents

### FIDIC 2017 & NEC4
- **Cl. 13 variations:** 13.3.1 by instruction; 13.3.2 by request for proposal
- **Cl. 20 claims:** notice within 28 d; fully detailed claim within 84 d
- **Cl. 8.3 programme:** within 28 d of the 8.1 Commencement notice; Engineer review 21 d
- **Cl. 4.20 monthly report:** within 7 d
- **Cl. 8.4:** advance warning
- **Cl. 21:** DAAB
- **NEC4 cl. 15 early warning:** register + meetings; failure to warn reduces the CE assessment

### Valuing a variation
$$V=C_{dir}(1+k_{OHP})+c_t\,\Delta T_{completion}$$

### Document review codes
- **A:** proceed
- **B:** proceed with comments, resubmit
- **C:** rejected, resubmit
- **D:** information only

### Interfaces and RFIs
- **Interface register fields:** ID, parties, type, give/need dates, ICD, owner, status
- **MEWRE "gives":** tracked as P6 milestones
- **RFI:** clarifies, never changes scope

## QA/QC & HSE

### Quality
- **ITP codes:** **H** hold, **W** witness, **R** review, **S** surveillance
- **Hold points:** on irreversible and energisation-critical steps
- **NCR dispositions:** rework, repair, use-as-is (concession), reject

### Safety metrics (state the base)

| Quantity | Formula | Base |
|---|---|---|
| LTIFR | $LTIFR=N_{LTI}\times10^6/H$ | per 1,000,000 h |
| TRIR | $TRIR=N_{rec}\times200{,}000/H$ | per 200,000 h |
| WBGT (outdoor) | $WBGT=0.7T_{nwb}+0.2T_g+0.1T_a$ | |

- **Heat-stress guide:** ~28 °C WBGT for moderate continuous work, acclimatised (ISO 7243 order of magnitude — check the procedure)
- **PV DC strings:** live whenever there is daylight
- **BESS hazards:** stranded energy, thermal runaway; civil-defence approval required

## Reporting

| Status | Schedule | Cost |
|---|---|---|
| Green | on time | CPI ≥ 0.97 |
| Amber | 1–4 wk late or SPI(t) 0.90–0.95 | CPI 0.92–0.97 |
| Red | > 4 wk, SPI(t) < 0.90 or key date at risk | CPI < 0.92 or EAC > budget + contingency |

- **Thresholds above:** an example, set per project
- **Every status:** colour + trend + path to green
- **Order:** report decisions first
`;

const mod: Module = {
  id: "m08",
  number: 8,
  title: "Project Management & Controls",
  titleAr: "إدارة المشاريع والتحكم",
  summary:
    "The control toolkit of a MEWRE renewable-energy PM: governance and stage gates (PMBOK/PRINCE2), scope and WBS, CPM scheduling and P6 schedule review (DCMA 14), earned value management, quantitative risk (Monte Carlo, P80), change/interface/document control, QA/QC and HSE in 50 °C conditions, and honest reporting to leadership.",
  whyItMatters:
    "A MEWRE PM is judged on whether the plant and its grid connection arrive on time, on budget and safely — and on whether leadership heard about problems early enough to act. On KAPP IPPs the ministry controls the grid interfaces and approvals that most often cause offtaker exposure; on directly procured grid and BESS packages it administers the whole contract. This module gives you the quantitative tools (CPM, EVM, Monte Carlo) and the administrative systems (change, interface, document, quality, HSE, reporting) to see through contractor narratives, protect the ministry's position and make decisions defensible to the Audit Bureau.",
  competencies: ["controls", "risk", "delivery", "leadership"],
  prerequisites: ["m00", "m07"],
  estimatedHours: 14,
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
