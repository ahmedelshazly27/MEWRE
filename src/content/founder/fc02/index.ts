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
  id: "fc02",
  number: 2,
  title: "Product management",
  titleAr: "إدارة المنتج",
  summary:
    "Product management for a founder who owns everything except the build: discovery and problem framing with assumption maps and an evidence ladder; Mom Test customer interviews that end in commitments; jobs to be done and the forces of progress; PRDs and acceptance criteria a technical cofounder respects; prioritisation with RICE, cost of delay and CD3; MVPs and B2B pilots that convert; product analytics with activation, retention cohorts and a North Star; and decision rights, technical debt economics and estimation with technical cofounders. Worked throughout on Afterwave (Lockstep, Enclave, Ripple) and Mizan's soiling analytics pilot.",
  whyItMatters:
    "In Afterwave and Mizan your technical cofounders build, and their time is the scarcest resource in each company. What you discover, write down and prioritise decides what that time is spent on, and whether pilots with test labs and plant operators end in contracts or in polite extensions. This module gives you the methods to make those calls with evidence and numbers, and to share the product with engineers who own the how without stepping on each other.",
  competencies: ["fc-product"],
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
