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
  id: "mz03",
  number: 3,
  title: "Inferring soiling from operational and satellite data",
  titleAr: "استنتاج الاتساخ من بيانات التشغيل والأقمار الصناعية",
  summary:
    "The core of Mizan's analytics: separating soiling from temperature, degradation, clipping, curtailment, outages and irradiance sensor error in plant data; the SRR method in RdTools, change points and cleaning detection with worked numbers; clean-plant expected-energy models in pvlib and PySAM with residual analysis; CAMS and MERRA-2 dust proxies and commercial soiling models with their uncertainty; validation against ground truth and the Shagaya cleaning interruption as a natural experiment; and turning estimates with confidence into cleaning decisions and alerts operators use.",
  whyItMatters:
    "KISR has said there is no standard method for turning operational data into cleaning decisions, and that gap is what Mizan sells. Every claim in the Shagaya Phase I pilot will be tested by researchers on confounders, method and validation, and every sale will be tested by operators on whether the output changes what their crews do. This module gives you the depth to specify the pipeline for your engineering partners, defend it to KISR and turn it into a product.",
  competencies: ["mz-data"],
  prerequisites: ["mz01", "mz02"],
  estimatedHours: 9,
  lessons: [l01, l02, l03, l04, l05, l06],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
