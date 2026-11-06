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
  id: "mz11",
  number: 11,
  title: "Selling in Kuwait and the Gulf",
  titleAr: "البيع في الكويت والخليج",
  summary:
    "How Mizan sells soiling analytics, cleaning optimisation and plant control functions in Kuwait and the Gulf: a buyer map built on who contractually holds each soiling loss (MEWRE, KISR, KAPP, IPP project companies, EPCs, O&M contractors, Gulf offtakers); routes to contract with Kuwaiti public bodies (CAPT tenders, direct contracting under Decree-Law 94/2026, research collaboration); business cases for Gulf IPP O&M teams by cleaning archetype; relationships and wasta handled ethically from the seller's side; staged analytics pilots with success metrics, fees and publication rights; and pricing as licence, managed service or savings share.",
  whyItMatters:
    "Everyone in the Gulf agrees dust is a problem; very few will pay Mizan to solve it unless the loss is on their books and the purchase fits their rules and budget. Kuwait gives Mizan credibility (the targeted KISR methodology pilot at Shagaya Phase I) but little near-term revenue, while operating Gulf IPPs have budgets but low tariffs. This module gives you the map, the procurement routes, the integrity practice, the pilot structure and the price arithmetic to turn that into paying customers.",
  competencies: ["mz-business"],
  prerequisites: ["mz04", "m11"],
  estimatedHours: 8,
  lessons: [l01, l02, l03, l04, l05, l06],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
