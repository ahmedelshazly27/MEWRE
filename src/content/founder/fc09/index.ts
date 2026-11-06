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
  id: "fc09",
  number: 9,
  title: "Operating the company",
  titleAr: "تشغيل الشركة",
  summary:
    "How to run an early-stage company day to day: hire with scorecards, structured interviews and work samples; design the first ten roles and price salary against equity honestly; run a cadence of short meetings, OKRs, weekly input metrics and written decisions; manage the board, investors and advisors with monthly updates and runway arithmetic; protect founder time and energy across several ventures and two countries; and make uncertain decisions with expected value, reversibility, base rates, pre-mortems and a decision journal.",
  whyItMatters:
    "You own everything except the technical build in Afterwave, Mizan and Suhail at once, so your hours, your first hires and your decisions are the constraint on all three. A wrong early hire, an unpriced equity promise, a board surprise or an irreversible deal signed in a hurry costs months that a seed-stage company does not have. This module gives you the operating system: the numbers to price each choice and the rituals that keep three companies moving when your attention is in only one of them.",
  competencies: ["fc-ops"],
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
