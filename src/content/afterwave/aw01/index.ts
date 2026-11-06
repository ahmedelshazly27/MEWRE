import type { Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import l06 from "./l06";
import exam from "./exam";
import glossary from "./glossary";
import formulas from "./formulas";
import references from "./references";
import cheatSheet from "./cheatsheet";

const mod: Module = {
  id: "aw01",
  number: 1,
  title: "How hardware test engineering works",
  titleAr: "كيف تعمل هندسة اختبار العتاد",
  summary:
    "The world Afterwave sells into, at engineering depth: what sits on a test bench and who runs it; test cases, acceptance criteria and factorial design of experiments; reliability mathematics (Weibull, MTBF, zero-failure demonstration, Arrhenius and Coffin-Manson acceleration, HALT and HASS); electrical and thermal characterisation of drives, motors and batteries; failure analysis and 8D root cause; and the economics of a test lab, with an illustrative cost model of the levers Lockstep and Ripple attack.",
  whyItMatters:
    "Afterwave's buyers are validation leads, reliability engineers and lab managers who measure everything in rig hours, uncertainty and evidence. To sell credibly, challenge Ismail and Yusuf on product decisions and write accurate materials, you need to think in their terms: which tests a change invalidates, what a valid test hour costs, why a life test cannot simply be restarted. This module gives you that vocabulary and the numbers behind it.",
  competencies: ["aw-test"],
  prerequisites: [],
  estimatedHours: 7.5,
  lessons: [l01, l02, l03, l04, l05, l06],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
