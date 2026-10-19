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
  id: "m06",
  number: 6,
  title: "Grid Integration",
  titleAr: "الربط بالشبكة الكهربائية",
  summary: md`How utility PV and BESS plants join Kuwait's transmission system: substations, bus configurations, SLDs and fault levels; what grid codes require (FRT, reactive capability at the POI, power quality, ramps, frequency response) and Kuwait's code status; frequency and voltage control, PPCs, grid-forming inverters and system strength; interconnection studies, hosting capacity and deemed-energy curtailment; and SCADA, protection, metering, IEC 62443 cybersecurity and energisation.`,
  whyItMatters: md`For a MEWRE PM the grid is where IPP projects meet ministry obligations: MEWRE builds or procures the transmission works (such as the Shagaya–Al-Wafra 400 kV line), sets connection requirements, approves studies and protection settings, operates the control centre, and pays deemed energy when the grid is late or constrained. Weak interface management strands gigawatts of finished solar plant; weak technical requirements leave the summer grid short of vars, inertia and ramp control. This module gives you the vocabulary, calculations and checklists to run those interfaces with confidence.`,
  competencies: ["grid", "contracts", "risk", "delivery"],
  prerequisites: ["m01", "m02", "m05"],
  estimatedHours: 9,
  lessons: [l01, l02, l03, l04, l05],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
