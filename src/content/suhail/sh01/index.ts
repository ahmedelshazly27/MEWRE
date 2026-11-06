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
  id: "sh01",
  number: 1,
  title: "Community and ecosystem design",
  titleAr: "تصميم المجتمع والمنظومة الريادية",
  summary:
    "How a builder ecosystem works and how to design Suhail's: the actors and value flows, realistic network value (Metcalfe versus n log n and bounded ties), the mechanisms of the reference communities (Y Combinator, {Tech: Europe}, On Deck, Founders Inc, Antler, Indie Hackers), membership tiers, rituals and contribution ladders with the funnel maths of retention, trust and curation (application filters, codes of conduct, moderation, dilution), community health metrics with NPS caveats, and the Arab context city by city.",
  whyItMatters:
    "Suhail's product is the community itself: if builders do not get value from each other, no sponsor, partner or podcast will save it. Nothing has launched yet, so the design choices you make before January 2027 (who is a member, what happens every week, how quality is protected, what you measure, which cities first) set its trajectory. This module gives you the mechanisms and the arithmetic to make those choices and to explain them honestly to sponsors, partners and your volunteer leads.",
  competencies: ["sh-community"],
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
