import { md, type Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import { formulas } from "./formulas";
import { references } from "./references";
import { glossary } from "./glossary";
import { exam } from "./exam";
import { simulation } from "./sim";

const mod: Module = {
  id: "m15",
  number: 15,
  title: "Capstone: 1 GW PV + BESS for MEWRE",
  titleAr: "المشروع الختامي: محطة 1 جيجاواط شمسية مع تخزين",
  summary:
    "An integrative, scored simulation of a fictional-but-realistic MEWRE IPP — 1,000 MWac single-axis tracker PV with a 250 MW / 1,000 MWh BESS near Shagaya/Dibdibah — from pre-tender to COD and handover: 8 stages, 27 decisions, six KPIs, followed by an expert debrief and your 30-60-90-day plan.",
  whyItMatters:
    "On day one at MEWRE you will not be asked to recite formulas; you will be asked to decide — on a low bid, a late grid line, a failed test, a near miss, an Audit Bureau query — with incomplete information and leadership watching. The capstone rehearses those decisions end to end, scores your judgement as well as your outcomes, and turns the result into a concrete plan for your first three months.",
  competencies: ["delivery", "controls", "contracts", "finance", "procurement", "risk", "grid", "leadership"],
  prerequisites: ["m00", "m02", "m05", "m07", "m08", "m09", "m10", "m13"],
  estimatedHours: 6,
  lessons: [l01, l02, l03],
  exam,
  glossary,
  formulas,
  references,
  simulation,
  cheatSheet: md`# MEWRE PM day-one cheat sheet — NAJM-1000 capstone

## The project (training scenario)

| Item | Value | Note |
|---|---|---|
| PV | 1,000 MWac / 1,300 MWp | Bifacial single-axis tracker |
| BESS | 250 MW / 1,000 MWh | Usable at POI, LFP |
| P50 energy | ≈ 2,900 GWh/yr | At POI |
| Capacity factor | ≈ 33 % | AC basis |
| Capex | ≈ USD 720 m | KWD 222 m @ 3.25 USD/KWD |
| Tariff (illustrative) | ≈ 5.0 fils/kWh energy + ≈ KWD 2,300/MW-month BESS | ≈ KWD 21 m/yr in total |
| Deemed energy rule of thumb | ≈ KWD 1.2 m per month of grid delay | Even spread; more in summer |
| Schedule | RFP → COD ≈ 1,200 days | 6 bid + 5 eval/approvals + 4 to close + 24 build (months) |
| PPA | 30 years from COD | MEWRE sole offtaker |

### Capex split (USD m)

- **PV EPC:** 468
- **BESS:** 200
- **400 kV substation:** 35
- **Owner's costs:** 17

## Who does what

| Party | Role |
|---|---|
| MEWRE (you) | Offtaker: PPA, grid line and bay, land support, protection, metering, dispatch, payment, audit file |
| KAPP | Procuring authority (PPP Law 116/2014, Decree 78/2015), shareholder |
| Higher Committee | Approves stages and investor |
| State Audit Bureau | Prior review before signing (threshold reported KD 100k — verify); post-audit |
| Project company | Builds, finances, owns, operates; carries build, yield and performance risk |
| OE | MEWRE's technical eyes: design review, factory audits, test witnessing |
| LTA | Lenders' advisor — free second opinion on quality and schedule |

## Key formulas

| Quantity | Formula | Where |
|---|---|---|
| Capacity factor | $\text{CF} = E / (P_{\text{AC}} \cdot 8760)$ | Yield sanity check |
| Deemed energy | $C_{\text{deemed}} = \tau_E \sum (\hat P_t - P_{\text{del},t})\Delta t$ | MEWRE-caused events beyond the allowance |
| Cost index | $\text{CPI} = EV/AC$ | EPC health signal |
| Schedule index | $\text{SPI} = EV/PV$ | COD forecast |
| Duration forecast | $D_{\text{forecast}} \approx D_{\text{plan}}/\text{SPI}(t)$ | Recovery decisions |
| Corrected PR | $\text{PR}_{\text{corr}} = E_{\text{AC}} / \sum P_{\text{STC}} (G/G_{\text{STC}})[1+\gamma(T_c - T_{\text{ref}})]\Delta t$ | COD test |
| Capstone KPI score | $k = \min(1, x/T)$ or $\min(1, T/x)$ | Higher / lower is better |
| Capstone total | $S = 0.5\bar k + 0.5\bar q/10$ | Half outcome, half judgement |

## Five questions before every decision

- **Contract:** what does the PPA, RFP or law say?
- **Risk owner:** whose risk is it?
- **Lifecycle:** what does each KPI gain or lose over the project life?
- **File:** what would the Audit Bureau see in 3 years?
- **People:** what does safety demand; who hears it first?

## Five traps

- **Shortcut bias:** approving now to save time, paying later
- **Over-correction:** blanket rejections, bans, site-wide shutdowns
- **Acting outside the contract:** verbal instructions, private negotiations, signing before approval
- **Concealment/passivity:** waiting for bad news to become formal
- **Accepting assertions:** "certified", "will recover", "close enough" without data

## Stage watch-list

| Stage | Must get right |
|---|---|
| Pre-tender | Ground-validated reference data; achievable local content; grid split + committed MEWRE date; start MEWRE line procurement |
| Evaluation | Formal clarifications for low bids; no bid modifications; BESS normalised to usable MWh at POI |
| Award/close | Complete Audit Bureau pack; bounded deemed energy; precise COD tests (IEC 61724, BESS at POI, grid code) |
| Design/grid | Escalate MEWRE delays early with numbers; "approved with comments" for sabkha/stow/50 °C; early grid studies |
| Procurement | Traceability + audit; BOM = certificate; order transformers on frozen parameters; recovery plan if SPI < 0.9 |
| Construction | Heat-stress plan, night shifts; FM vs design weakness; lifting stand-down; formal change control |
| Commissioning | Verify inputs, then enforce; partial COD; limited export pending compliance |
| COD | Category A closed; Category B dated + secured (≈ 125–150 %); handover package; accurate public wording |

## Day-one checklist

- **PPA:** read COD conditions, tests, LDs, deemed energy, notices, change procedure
- **Interfaces:** build the MEWRE-side interface schedule (land, line, bay, protection, metering, permits, payments)
- **Yield basis:** confirm dataset, losses, P50/P90 method, reviewer
- **Approvals:** get the path and durations from KAPP; add float per control body
- **OE and LTA:** agree OE scope; get the last 3 LTA reports
- **File:** start decision log + correspondence register; minutes within 48 h
- **People:** meet transmission, system control, KAPP, OE and project company one-to-one
- **Director:** one-page project-on-a-page with honest RAG

## One-page brief order

1. Bottom line + decision required
2. Status with numbers
3. Risks + mitigation
4. Recommendation / wording`,
};

export default mod;
