import type { Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import exam from "./exam";
import glossary from "./glossary";
import formulas from "./formulas";
import references from "./references";
import cheatSheet from "./cheatsheet";

const mod: Module = {
  id: "aw11",
  number: 11,
  title: "EU Machinery Regulation and CE marking for AI-enabled machines",
  titleAr: "لائحة الآلات الأوروبية وعلامة CE للآلات المزودة بالذكاء الاصطناعي",
  summary:
    "The regulatory core of Afterwave's market: Regulation (EU) 2023/1230 replacing the Machinery Directive from 20 January 2027 (scope, operators, per-unit placing on the market, substantial modification by software); the essential health and safety requirements for AI, software and connected machines, with the statistics and data volumes behind the evidence; conformity routes, Annex I Part A for ML safety functions, the technical file, declaration and CE marking, and the status of harmonised standards; the AI Act after the 2026 Digital Omnibus (Regulation 2026/1744, machinery moved to Annex I Section B), the Cyber Resilience Act and the rest of the stack; and how to use the regulation as a go-to-market wedge without overclaiming.",
  whyItMatters:
    "The EU Machinery Regulation is Afterwave's regulatory entry point: from 20 January 2027 every humanoid, robot and autonomous machine placed on the EU market must meet it, and its new requirements are about software updates, machine learning, logs and evidence, exactly what Lockstep, bench memory, Ripple and Enclave deal in. As CEO you will explain it to compliance leads, test leads, VPs, lawyers and investors, and one wrong date or one 'we make you compliant' costs more credibility than any feature earns. This module gives you the mechanism, the dates with their verification status, the numbers and the words.",
  competencies: ["aw-safety"],
  prerequisites: ["aw10"],
  estimatedHours: 7,
  lessons: [l01, l02, l03, l04, l05],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
