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
  id: "aw04",
  number: 4,
  title: "Requirements traceability",
  titleAr: "تتبع المتطلبات",
  summary:
    "How hardware programs connect requirements to evidence, and where that chain breaks: writing verifiable requirements with EARS and measurement-uncertainty decision rules; the V-model, bidirectional traceability, coverage metrics and suspect links; the data models of DOORS, Polarion, Jama, Codebeamer, ReqIF, Xray and TestRail; what ISO 26262, IEC 61508 and the EU Machinery Regulation demand of traceability, change impact and tool confidence; and how linking verdicts to captured bench data and history exposes the implicit dependencies that Ripple is built to find.",
  whyItMatters:
    "Ripple's promise, which tests to rerun after a firmware, model or rig change and why, is a traceability argument, and every Afterwave buyer already lives inside requirements and test tools that claim part of it. You need to say precisely what suspect links do and miss, read a prospect's coverage numbers critically, and speak the language of assessors under ISO 26262 and, from 20 January 2027, the Machinery Regulation. It also shapes the product: a tool that decides which tests are skipped sits inside the customer's safety argument, so its reasoning and qualification are requirements, not extras.",
  competencies: ["aw-impact"],
  prerequisites: ["aw01", "aw03"],
  estimatedHours: 6.5,
  lessons: [l01, l02, l03, l04, l05],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
