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
  id: "mz02",
  number: 2,
  title: "Soiling measurement and performance ratio",
  titleAr: "قياس الاتساخ ونسبة الأداء",
  summary:
    "How soiling is measured and how performance is normalised, at the depth an analytics product needs: IEC 61724-1 monitoring classes and the soiling ratio (current- vs power-based, temperature and offset correction, noon window), the NREL weather-corrected PR derived step by step with NOCT, Faiman and Sandia cell temperature, soiling stations and optical sensors in practice, measurement uncertainty and data filters and what they mean for cleaning decisions and P50/P90, and a measurement plan for the targeted Shagaya Phase I pilot with KISR.",
  whyItMatters:
    "Mizan sells soiling analytics and cleaning decisions, and every number it produces is a corrected PR or a soiling ratio with an error bar. KISR, O&M contractors and MEWRE engineers will test those numbers against IEC 61724 and against their own data. Knowing exactly how they are defined, where they go wrong and which errors change a decision is what makes the Shagaya pilot credible and the product defensible.",
  competencies: ["mz-soiling"],
  prerequisites: ["mz01"],
  estimatedHours: 6.5,
  lessons: [l01, l02, l03, l04, l05],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
