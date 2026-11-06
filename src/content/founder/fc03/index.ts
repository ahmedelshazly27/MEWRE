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
  id: "fc03",
  number: 3,
  title: "Go-to-market",
  titleAr: "استراتيجية الوصول إلى السوق",
  summary:
    "How a B2B deep-tech company decides what it is, who it sells to, what it says, how it sells and when it launches: Dunford positioning with a full worked positioning for Afterwave Ripple; ICP definition with a weighted scoring model; message house and value ladder for the buying committee; the economics of product-led, sales-led and partner-led motions (CAC, payback, minimum ACV); tiered launch planning with funnel targets; and the category-creation question for physical AI test infrastructure.",
  whyItMatters:
    "You own go-to-market in every venture while engineering partners build the product, so the questions 'what is it, who is it for, how do we sell it' land on you. Afterwave sells high-value, on-prem software into test labs with security reviews and multi-month cycles, where a wrong category or a wrong motion costs half a seed runway. Mizan sells into Kuwaiti public buyers through tenders and research partnerships, and Suhail launches events and media on fixed dates. The same mechanisms, with different numbers, decide all three.",
  competencies: ["fc-gtm"],
  prerequisites: ["fc01", "fc02"],
  estimatedHours: 9,
  lessons: [l01, l02, l03, l04, l05, l06],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
