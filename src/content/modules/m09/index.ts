import type { Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import l06 from "./l06";
import l07 from "./l07";
import exam from "./exam";
import glossary from "./glossary";
import formulas from "./formulas";
import references from "./references";
import cheatSheet from "./cheatsheet";

const mod: Module = {
  id: "m09",
  number: 9,
  title: "Contracts & Commercial",
  titleAr: "العقود والشؤون التجارية",
  summary:
    "Contracting strategies and the FIDIC 2017 suites; the clauses that move time and money (claims, determinations, EOT, payment, taking over, variations, exceptional events, DAAB); bonds and guarantees; delay and performance liquidated damages; PPAs and Kuwait's PPP model under Law 116/2014; O&M and BESS LTSAs; and variations, delay analysis, concurrent delay and disputes from the Employer's side.",
  whyItMatters:
    "A MEWRE renewable PM spends most days inside contracts: MEWRE's own EPC and grid contracts, where it is the Employer, and 30-year solar PPAs, where it is the offtaker for KAPP-procured IPPs. Missing a 28-day notice, mis-calling a bond, accepting an unsupported EOT or letting the grid connection slip can cost the ministry millions and its standing with contractors, lenders and the State Audit Bureau. This module gives you the clause-level fluency and the numbers (LDs, IPCs, deemed energy, availability, EOT) to run those contracts from day one.",
  competencies: ["contracts", "finance", "operations", "delivery"],
  prerequisites: ["m00", "m07", "m08"],
  estimatedHours: 12,
  lessons: [l01, l02, l03, l04, l05, l06, l07],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
