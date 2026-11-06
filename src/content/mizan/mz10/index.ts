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
  id: "mz10",
  number: 10,
  title: "Validation study design and co-publishing",
  titleAr: "تصميم دراسات التحقق والنشر المشترك",
  summary:
    "How Mizan proves its soiling analytics and turns the proof into credibility: falsifiable hypotheses, bias, RMSE and interval coverage, independent ground truth, and sample size and duration with autocorrelation; the 2018 to 2019 Shagaya cleaning-arm failure as a natural experiment analysed by difference-in-differences, with confounders and claim scope; working with KISR as methodology partner (agreements, data access, authorship, IP, timelines); writing, peer review, preprints, IEEE PVSC and EU PVSEC, and FAIR open data for the planned Kuwait atlas, dataset and toolkit; and claim discipline before and after publication.",
  whyItMatters:
    "KISR has confirmed there is no standard method for turning operational PV data into cleaning decisions, so Mizan's method will only be believed once it has been tested in a study that could have failed. The targeted Shagaya Phase I pilot with KISR researchers is that test, and a co-authored, peer-reviewed result is the strongest sales asset Mizan can have in Kuwait. You own the study plan, the partnership, the publication timeline and every claim made from the result, so this module gives you the design arithmetic and the rules of the game.",
  competencies: ["mz-validation"],
  prerequisites: ["mz02", "mz03"],
  estimatedHours: 6,
  lessons: [l01, l02, l03, l04, l05],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
