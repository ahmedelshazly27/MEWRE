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
  id: "aw05",
  number: 5,
  title: "Change impact and test selection",
  titleAr: "تحليل أثر التغيير واختيار الاختبارات",
  summary:
    "The science behind Ripple: dependency graphs of firmware, calibration, models, rig assets, tests and requirements with weighted propagation; regression test selection theory (safe selection, precision and recall, the expected-cost run rule, shadow sampling); code, parameter, requirement and operating-envelope coverage and signal sensitivity as edge weights; learning impact from bench history (co-change, smoothing, predictive selection, APFD and APFDc, cold start); why recalibrations, sensor swaps, model retrains, nondeterminism and sim-to-real make physical AI different; and rerun explanations engineers trust and approve.",
  whyItMatters:
    "Ripple is Afterwave's core product: after a firmware, model or rig change, which tests to rerun and why. To sell it to validation leads, challenge Ismail and Yusuf on design choices and scope pilots without overpromising, you need the mechanism: how impact propagates, what a skip costs, what each kind of evidence can and cannot see, and why physical AI breaks software-testing assumptions. This module gives you that depth, with the numbers to back the ROI and the honesty to survive the first escape.",
  competencies: ["aw-impact"],
  prerequisites: [],
  estimatedHours: 8,
  lessons: [l01, l02, l03, l04, l05, l06],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
