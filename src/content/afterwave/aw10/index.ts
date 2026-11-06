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
  id: "aw10",
  number: 10,
  title: "Functional safety and safety cases",
  titleAr: "السلامة الوظيفية وملفات حجة السلامة",
  summary:
    "The safety engineering behind every test plan Afterwave touches: hazard, risk and safety functions; ISO 13849-1 Performance Levels and IEC 61508 / IEC 62061 SILs with the full maths; robot safety under ISO 10218:2025, collaborative limits and the humanoid standards gap; ISO 26262, SOTIF, ISO/PAS 8800 and ISO/IEC TR 5469 for automotive and AI; safety cases in GSN and what makes evidence credible; and how bench memory becomes safety evidence, up to the long-term insurer risk-layer vision.",
  whyItMatters:
    "Afterwave's buyers live inside safety processes, and its long-term position is safety evidence infrastructure for physical AI. You need to read a PL or SIL claim, follow a safety engineer's argument and know which test data a safety case actually consumes, so you can sell credibly, design Ripple to survive tool qualification and tell the evidence-layer story without overclaiming. It also lets you challenge Ismail and Yusuf on the details that decide what the product must capture.",
  competencies: ["aw-safety"],
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
