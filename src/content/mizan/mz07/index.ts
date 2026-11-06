import { md, type Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import exam from "./exam";
import glossary from "./glossary";
import formulas from "./formulas";
import references from "./references";

const mod: Module = {
  id: "mz07",
  number: 7,
  title: "Kuwait grid and grid codes for a seller",
  titleAr: "شبكة الكهرباء الكويتية وكودات الشبكة من منظور البائع",
  summary:
    "The grid knowledge a Mizan seller needs and nothing more: Kuwait's summer system in sourced numbers, the connection requirements that constrain stow, tracker and cleaning control, how curtailment and availability contaminate soiling analytics (and move deemed-energy money), and who owns which decision at Shagaya Phase I and at the KAPP IPPs. Track 0 m00 and m06 carry the engineering; this module adds the seller's angle.",
  whyItMatters:
    "Every Mizan conversation in Kuwait runs through the grid: MEWRE owns transmission, dispatch and offtake, and its engineers will judge whether a soiling or stow product adds grid risk. Quoting the system correctly, keeping control functions inside the PPC's authority and filtering grid effects out of soiling estimates are what make the Shagaya pilot credible to KISR and the later IPP sale credible to asset managers.",
  competencies: ["mz-grid"],
  prerequisites: ["m00", "m06"],
  estimatedHours: 4,
  lessons: [l01, l02, l03, l04],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet: md`## System numbers (quote with source and basis)

| Quantity | Value | Source |
|---|---|---|
| **Peak 2026** | 17,540 MW | MEWRE via Kuwait Times |
| **Record peak** | 17.71 GW, Jul 2025 | MEES (ministry: 17,610 MW) |
| **Installed vs available** | about 21 GW vs about 17 GW | Rystad, Sep 2025 |
| **Reserve margin Jun 2025** | 16.275 vs 16.98 GW, about -4.2 % | MEES |
| **Solar end 2024** | about 102 MW | MEWRE official |
| **Zone 1** | 1,100 MW, own 400 kV substation; Masdar / AlGhanim selected (MEED 13 Aug 2026) | tariff not public |
| **Zone 2** | 500 MW, bids 2026 | preferred bidder not found |
| **400 kV Shagaya to Al-Wafra** | MEWRE; Power Grid Co., KD 48.6 m, Mar 2026 | Megaproject / MEED |
| **BESS** | about 1,500 MW phased, first about 500 MW; sites approved Jun 2026 | MEED |

## Grid requirements that touch Mizan

- **Kuwait code**: no public code for inverter-based plants; use each plant's connection agreement, PPA schedules, PPC spec.
- **Ramp**: plant-wide stow is a POI event; comparator limit about 10 %/min; stagger by block, trigger earlier.
- **Reactive power**: at 50 °C, Mvar duty caps MW; flat tops are not soiling.
- **PPC authority**: Mizan requests, PPC enforces; never write to inverters.
- **Priority order**: safety stow, grid compliance, energy, soiling. Fail-safe: revert to vendor defaults.

## Confounders and filters

- **Curtailment**: set-point below available power; its end looks like cleaning.
- **Outages**: normalise per inverter; availability does not capture soiling.
- **Limits and clipping**: exclude flagged intervals.
- **Deemed energy**: soiled reference inverters bias settlement; small soiling bias, large settlement error.
- **Report** the share of data each filter removes.

## Who decides

| Decision | Phase I | KAPP IPP |
|---|---|---|
| Set-points, curtailment | MEWRE control centre | MEWRE control centre |
| Cleaning | Plant operator (confirm with KISR) | O&M contractor, IPP budget |
| Stow | Check if tracking | IPP + tracker vendor |
| Purchase | Public rules or research collaboration | Project company |

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Reserve margin | $RM = (C_{\text{avail}} - P_{\text{peak}})/P_{\text{peak}}$ | l01 |
| Firm MW lost | $\Delta P = P_{\text{ac}} f_{\text{peak}} L_s$ | l01 |
| Ramp rate | $r = (\Delta P/\Delta t)/P_{\text{rated}}$ | l02 |
| MW after Q duty | $P_{\max} = \sqrt{S^2 - Q^2}$ | l02 |
| Available power | $P_{\text{avail}} = N \bar{P}_{\text{ref}}$ | l03 |
| Observed PR | $PR_{\text{obs}} = PR_0\, SR\,(1-c)\,A_E$ | l03 |
| State value per MWh | $HR/e_{\text{bbl}} \times p_{\text{oil}}$, about USD 120 at USD 70/bbl | l04 |
`,
};

export default mod;
