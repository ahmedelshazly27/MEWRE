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
  id: "mz05",
  number: 5,
  title: "Tracker and stow control under dust, wind and heat",
  titleAr: "التحكم بالمتتبّعات الشمسية وأوضاع الحماية في ظروف الغبار والرياح والحرارة",
  summary:
    "Single-axis tracker control at engineering depth and as a product: true-tracking and backtracking geometry with GCR, diffuse and bifacial modes; wind loads, torsional galloping, stow angles, thresholds and fail-safe logic; dust-storm and soiling-aware night stow with the Figgis 2019 and Khan 2024 evidence, hail and heat; the control architecture from row controllers to SCADA and where a third-party layer can plug in safely; and the vendor white space, warranty risks and paired-block pilot design for a Mizan control function.",
  whyItMatters:
    "Mizan's product idea extends from soiling analytics and cleaning optimisation into plant control: using tracker angle to protect against dust, wind and heat and to reduce soiling. Public vendor material shows no dust-storm or soiling stow, but any function that touches someone else's tracker must be technically sound, provably safe and acceptable to vendors, owners and lenders. This module gives you the equations, the architecture and the pilot design to argue it credibly with tracker engineers, KISR researchers and IPPs.",
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
