import type { Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import l06 from "./l06";
import l07 from "./l07";
import l08 from "./l08";
import formulas from "./formulas";
import references from "./references";
import glossary from "./glossary";
import exam from "./exam";
import cheatSheet from "./cheatsheet";

const mod: Module = {
  id: "fc04",
  number: 4,
  title: "Sales",
  titleAr: "المبيعات",
  summary:
    "Founder-led B2B sales from first meeting to signed contract: stage models with buyer-verifiable exit criteria and the buying committee; SPIN discovery that quantifies pain in the buyer's numbers; outcome-first demos and technical deep dives; MEDDPICC qualification and deal scoring; weighted pipeline, coverage and sales velocity forecasting; paid pilots with success criteria, conversion clauses, security reviews and on-prem deployment; value-based pricing, packaging and BATNA/ZOPA negotiation; and enterprise and Gulf government procurement, outbound arithmetic and CRM hygiene.",
  whyItMatters:
    "You are the only seller in each of your ventures: Afterwave sells on-prem infrastructure into hardware test teams with security reviews and procurement departments, and Mizan sells to utilities, O&M contractors and public bodies that buy through tenders. Every month of runway depends on knowing which deals are real, what they are worth and when they will close. This module gives you the mechanisms and the arithmetic to run those deals yourself and to report a forecast investors can trust.",
  competencies: ["fc-sales"],
  prerequisites: [],
  estimatedHours: 10,
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
