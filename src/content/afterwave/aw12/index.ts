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
  id: "aw12",
  number: 12,
  title: "Selling into test and validation organisations",
  titleAr: "البيع لمؤسسات الاختبار والتحقق",
  summary:
    "How Afterwave sells into hardware test and validation organisations: the roles, incentives and budget lines of a test organisation and how test tooling gets bought; a risk-adjusted business case for capture and change impact; pilot design with backtest, shadow and gated phases and a statistical miss-rate criterion; security reviews, bench PC change control, air-gapped installs and export control basics; segment comparison and sequencing across humanoids, automotive tier-1s, drives and batteries; and founder-led selling with two test engineering cofounders, design partners and references.",
  whyItMatters:
    "Afterwave's users, buyers and blockers are three different groups: test engineers feel the pain, heads of validation hold the budget, and IT, OT security and procurement can stop a deal everyone else wants. You are the only seller, your cofounders' time is the build's time, and every deal goes through a pilot and a security review. This module gives you the account map, the numbers, the pilot design and the segment plan to turn engineering enthusiasm into signed, expanding contracts.",
  competencies: ["aw-business"],
  prerequisites: ["fc04", "fc03"],
  estimatedHours: 7.5,
  lessons: [l01, l02, l03, l04, l05, l06],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
