import type { Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import l06 from "./l06";
import formulas from "./formulas";
import references from "./references";
import glossary from "./glossary";
import exam from "./exam";
import cheatSheet from "./cheatsheet";

const mod: Module = {
  id: "mz04",
  number: 4,
  title: "Cleaning optimisation economics",
  titleAr: "اقتصاديات تحسين تنظيف الألواح الشمسية",
  summary:
    "The economics behind every cleaning decision on a desert PV plant: the lost-energy integral and the square-root rule; why the same soiled MWh is worth a low tariff to an IPP and the displaced-fuel value to Kuwait; manual, semi-automated and robotic cleaning as cost structures; event-driven scheduling around storms, rain and dew with the value of a forecast; robot fleets as capex with availability and common-mode risk (the Shagaya cleaning-arm failure as case and natural experiment); and how to measure, verify and share savings credibly.",
  whyItMatters:
    "Cleaning optimisation is the decision Mizan's soiling analytics exists to improve, and the hardware it may distribute (cleaning robots) is sold on the same arithmetic. You will defend these numbers in front of O&M engineers, IPP CFOs, MEWRE officials and KISR researchers, each with a different value of energy. Knowing the mechanism, the right value for each buyer and how to verify savings is what makes the pitch and the targeted Shagaya pilot credible.",
  competencies: ["mz-cleaning"],
  prerequisites: [],
  estimatedHours: 7,
  lessons: [l01, l02, l03, l04, l05, l06],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
