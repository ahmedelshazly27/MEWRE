import type { Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import formulas from "./formulas";
import references from "./references";
import glossary from "./glossary";
import exam from "./exam";
import cheatSheet from "./cheatsheet";

const mod: Module = {
  id: "mz08",
  number: 8,
  title: "BESS at the depth a seller needs",
  titleAr: "أنظمة تخزين الطاقة بالبطاريات بالعمق الذي يحتاجه البائع",
  summary:
    "A short, seller-focused companion to Track 0 m05: the six numbers of any BESS conversation and the boundary each is measured at, a notepad sizing for an evening peak; Kuwait's planned 1 to 1.5 GW battery programme with dates, unknowns and the roles a local partner can take; how to judge Chinese integrators, warranties, fire-safety evidence and 50 °C derating; and what a soiling analytics product can and cannot carry over to batteries.",
  whyItMatters:
    "Mizan's distribution thread brings controls, EMS and battery hardware to Kuwait just as MEWRE plans a multi-GWh battery programme, so you will sit in meetings where BESS numbers decide credibility. You need to size a request on a notepad, catch a DC number sold as a POI number, choose suppliers you can defend in front of MEWRE and KISR, and decide whether battery analytics belongs on Mizan's roadmap without diluting the soiling product.",
  competencies: ["mz-grid"],
  prerequisites: ["m05"],
  estimatedHours: 4,
  lessons: [l01, l02, l03, l04],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
