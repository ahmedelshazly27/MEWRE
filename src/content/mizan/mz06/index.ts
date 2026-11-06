import type { Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import formulas from "./formulas";
import references from "./references";
import glossary from "./glossary";
import exam from "./exam";
import cheatSheet from "./cheatsheet";

const mod: Module = {
  id: "mz06",
  number: 6,
  title: "PPC, EMS and SCADA for hybrid plants",
  titleAr: "وحدات التحكم في المحطات وأنظمة إدارة الطاقة وأنظمة سكادا للمحطات الهجينة",
  summary:
    "The control stack of a PV+BESS plant from the seller's seat: the power plant controller's loops, priority stack, ramp, droop and Q-V control; the EMS that plans charge, discharge and reserves from forecasts, and what value means in Kuwait's single-buyer system; SCADA components, historians, alarm management and IEC 62443, with a safe data path for third-party analytics; how hybrid controls integration projects are specified and tested, and where they fail; and where a controls and analytics company makes money, including the logic of Mizan's move from integration services to products.",
  whyItMatters:
    "Mizan's stow, tracker and cleaning functions change a plant's available power and must live inside a PPC, EMS and SCADA built by others, so credibility with EPC controls leads and plant owners depends on speaking their language and respecting their priorities. The same knowledge prices the distribution thread and shows why integration services are a trap for a small company. It is also what makes a soiling-aware forecast a credible input to the batteries Kuwait is now procuring.",
  competencies: ["mz-control"],
  prerequisites: [],
  estimatedHours: 7,
  lessons: [l01, l02, l03, l04, l05],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
