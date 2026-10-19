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
| PMBOK 7 | 12 principles · 8 domains: Stakeholders, Team, Development approach & life cycle, Planning, Project work, Delivery, Measurement, Uncertainty |
|---|---|
| Process groups | Initiating · Planning · Executing · Monitoring & Controlling · Closing |
| PRINCE2 7 | 7 principles · 7 practices (business case, organizing, plans, quality, risk, issues, progress) · 7 processes |
| Board | Executive (business case) · Senior User (Control Centre/operations) · Senior Supplier (OE/IPP/EPC) |
| Tolerances | Time, cost, scope, quality, benefits, risk, sustainability — **forecast** breach → exception report |

## CPM
| Rule | Formula |
|---|---|
| Forward | $ES_j=\max(EF_i+L)$, $EF=ES+D$ |
| Backward | $LF_i=\min(LS_j-L)$, $LS=LF-D$ |
| Float | $TF=LS-ES$; $FF=\min ES_{succ}-EF$; $0\le FF\le TF$ |
| SS / FF | $ES_j\ge ES_i+L$; $EF_j\ge EF_i+L$ |
| CPLI | $(CPL+TF_{end})/CPL\ \ge 0.95$ |
| BEI | completed / baseline-due $\ \ge 0.95$ |

**DCMA 14**: missing logic ≤5 % · leads 0 · lags ≤5 % · FS ≥90 % · hard constraints ≤5 % · TF>44 d ≤5 % · negative float 0 · duration>44 d ≤5 % · invalid dates 0 · resources · missed tasks ≤5 % · CP test · CPLI ≥0.95 · BEI ≥0.95.

**Delay rule**: completion delay = slip − total float (if positive). Prolongation only for completion delay.

## EVM
| Metric | Formula | Read |
|---|---|---|
| CV / SV | $EV-AC$ / $EV-PV$ | negative = bad |
| CPI / SPI | $EV/AC$ / $EV/PV$ | <1 = bad |
| EAC | $BAC/CPI$ · $AC+(BAC-EV)$ · $AC+\frac{BAC-EV}{CPI\cdot SPI}$ · $AC+\frac{BAC-EV}{0.8CPI+0.2SPI}$ | report a range |
| ETC / VAC | $EAC-AC$ / $BAC-EAC$ | |
| TCPI | $\frac{BAC-EV}{BAC-AC}$ | > CPI + 0.05–0.10 → not credible |
| ES | $C+\frac{EV-PV_C}{PV_{C+1}-PV_C}$ | $SPI(t)=ES/AT$, $IEAC(t)=PD/SPI(t)$ |

Rules of credit: units completed (piles, rows, modules, cable m) · weighted milestones (procurement: approval 5 / PO 5 / FAT 15 / shipped 15 / on site 60) · 0/100 (<1 period) · 50/50 · LoE (PM only). Inflation: credit at PO, installed-not-tested, subjective %, front-loading, rework as progress.

## Risk
| | |
|---|---|
| Score | $P\times I$ (ordinal, never sum) |
| EMV | $\sum p_r C_r$ |
| PERT | $t_e=(a+4m+b)/6$, $\sigma=(b-a)/6$; path: add means, add variances |
| Triangular mean | $(a+m+b)/3$ |
| Percentile | $X_p=\mu+z\sigma$; $z_{80}=0.842$, $z_{90}=1.282$ |
| Contingency | P80 − base (in baseline); management reserve outside |
| Merge bias | two P50 paths → 25 % joint |

Kuwait risks: heat (53.9 °C record, WMO) · summer midday work restriction (**verify**) · approvals KAPP → Higher Committee → Audit Bureau (≥ KD 100k prior review, **verify**) · Law 94/2026 tenders amendment · customs (Zone 2: up to 10 % exemption reported) · FX on USD equipment · MEWRE grid interfaces · shamal dust.

## Change, interfaces, documents
- FIDIC 2017: Cl. 13 variations (13.3.1 instruction / 13.3.2 proposal); Cl. 20 claims: notice 28 d, detailed claim 84 d; 8.3 programme within 28 d of the 8.1 Commencement notice (Engineer review 21 d); 4.20 monthly report within 7 d; 8.4 advance warning; Cl. 21 DAAB.
- NEC4 cl. 15 early warning: register + meetings; failure to warn reduces CE assessment.
- Variation value $=C_{dir}(1+k_{OHP})+c_t\,\Delta T_{completion}$.
- Review codes: **A** proceed · **B** proceed with comments, resubmit · **C** rejected, resubmit · (D info).
- Interface register: ID, parties, type, give/need dates, ICD, owner, status; MEWRE gives = P6 milestones.
- RFI clarifies, never changes scope.

## QA/QC & HSE
- ITP codes: **H** hold · **W** witness · **R** review · **S** surveillance. Holds on irreversible + energisation-critical steps.
- NCR dispositions: rework · repair · use-as-is (concession) · reject.
- $LTIFR=N_{LTI}\times10^6/H$ · $TRIR=N_{rec}\times200{,}000/H$ — state the base.
- $WBGT=0.7T_{nwb}+0.2T_g+0.1T_a$ (outdoor). ~28 °C WBGT moderate continuous work, acclimatised (ISO 7243 order of magnitude — check procedure).
- PV DC strings are live in daylight. BESS: stranded energy, thermal runaway, civil-defence approval.

## Reporting
RAG (example): Schedule G on time / A 1–4 wk or SPI(t) 0.90–0.95 / R >4 wk, SPI(t) <0.90 or key date at risk. Cost G CPI ≥0.97 / A 0.92–0.97 / R <0.92 or EAC > budget+contingency. Always: colour + trend + path to green. Report decisions first.
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
