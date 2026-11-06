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
  id: "sh07",
  number: 7,
  title: "Structures: nonprofit, for-profit or hybrid, and how community companies make money",
  titleAr: "الهياكل القانونية: غير ربحية أم ربحية أم هجينة، وكيف تحقق شركات المجتمعات إيراداتها",
  summary:
    "How to hold and fund a builder community: nonprofit, for-profit, hybrid and fiscal sponsorship structures and where to incorporate in the Gulf (UAE free zones, ADGM and DIFC, Saudi Arabia, Kuwait) or abroad (Delaware, the Netherlands); the seven revenue streams of community companies with {Tech: Europe}, MLH, On Deck, Indie Hackers and Linux Foundation case studies; unit economics by stream, sponsor lifetime value and concentration risk; paying volunteer leads, equity and conflicts of interest; what VCs, grant funders and sponsors each do to independence; and a weighted decision memo for Suhail.",
  whyItMatters:
    "Suhail's plan starts in January 2027 with unpaid leads and no revenue, and the first sponsor invoice will force a structure decision that is cheap to make well and expensive to undo. The structure decides which money Suhail can take (sponsors, recruiting fees, grants, equity), whether leads can ever be paid or share upside, and whether builders and sponsors believe the community is nobody's channel. This module gives you the numbers and rules to make that choice and to defend it to leads, counsel, sponsors and investors.",
  competencies: ["sh-org"],
  prerequisites: [],
  estimatedHours: 7.25,
  lessons: [l01, l02, l03, l04, l05, l06],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
