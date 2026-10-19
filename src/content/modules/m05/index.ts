import { md, type Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import exam from "./exam";
import glossary from "./glossary";
import formulas from "./formulas";
import references from "./references";
import cheatSheet from "./cheatsheet";

const mod: Module = {
  id: "m05",
  number: 5,
  title: "Battery Energy Storage (BESS)",
  titleAr: "أنظمة تخزين الطاقة بالبطاريات",
  summary: md`Utility-scale battery storage from the electrochemistry up: chemistries and cell formats, the parameters that define every guarantee (MW, MWh, C-rate, DoD, RTE, SoH, aging), use cases and full POI-to-DC sizing for Kuwait's evening peak, degradation and augmentation economics, warranties and LTSA guarantees, capacity testing, and the safety codes, explosion control, desert HVAC and FAT/SAT that keep a gigawatt-hour of lithium safe at 50 °C.`,
  whyItMatters: md`MEWRE has announced a 1–1.5 GW / 4–6 GWh BESS programme with the first 500 MW targeted for summer 2027, and every new PV IPP increases the need to move energy into the evening peak. The PM will write or review the requirement, evaluate bids whose numbers sit on different boundaries, negotiate degradation and augmentation risk, witness capacity tests in August heat, and sign off safety systems that the fire authority, lenders and the public will scrutinise. Getting the boundary, temperature and augmentation clauses right is worth tens of millions of dollars and the reliability of the summer grid.`,
  competencies: ["wind-storage", "risk", "contracts"],
  prerequisites: ["m01", "m02"],
  estimatedHours: 9,
  lessons: [l01, l02, l03, l04, l05],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
