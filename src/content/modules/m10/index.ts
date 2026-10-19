import type { Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import l06 from "./l06";
import l07 from "./l07";
import formulas from "./formulas";
import references from "./references";
import glossary from "./glossary";
import exam from "./exam";
import cheatSheet from "./cheatsheet";

const mod: Module = {
  id: "m10",
  number: 10,
  title: "Financial Management",
  titleAr: "الإدارة المالية",
  summary:
    "The finance a MEWRE renewables PM uses every week: discounting, NPV/IRR/MIRR and WACC; LCOE and why Gulf solar tariffs are so low; capex/opex benchmarks for PV, trackers and BESS; IPP project finance (CFADS, DSCR sculpting, LLCR/PLCR, equity vs project IRR); levelized tariff bid evaluation and aggressive-bid risk; fiscal-year budget control, advance/retention mechanics, S-curves and EAC — with five downloadable live-formula Excel models built around a 1,100 MW PV IPP and a KWD 45 m grid-connection contract.",
  whyItMatters:
    "MEWRE is the offtaker for 30-year solar PPAs and the budget holder for the grid works that connect them. Every big decision the PM supports — which bid offers the best value, whether a record-low tariff is deliverable, how much cash to request for each fiscal year, why contingency moved, what lenders' requests will cost the state — is a financial argument. A PM who can rebuild the LCOE, read a lenders' model and defend a cash forecast to the Audit Bureau protects both the programme's schedule and the public purse.",
  competencies: ["finance", "controls", "procurement", "contracts"],
  prerequisites: ["m00", "m08", "m09"],
  estimatedHours: 12,
  lessons: [l01, l02, l03, l04, l05, l06, l07],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
