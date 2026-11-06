import type { Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import formulas from "./formulas";
import references from "./references";
import glossary from "./glossary";
import exam from "./exam";
import cheatSheet from "./cheatsheet";

const mod: Module = {
  id: "fc01",
  number: 1,
  title: "Startup fundamentals",
  titleAr: "أساسيات الشركات الناشئة",
  summary:
    "How venture-scale companies work and how to judge your own: power-law returns and the fund-returner test, growth arithmetic and default alive vs default dead; stages from idea to Series A and the evidence that moves you between them; bottom-up market sizing, why now and founder-market fit with one rubric across Afterwave, Mizan and Suhail; the real mechanisms behind startup failure and pre-mortems; and the focus math, staged bets and kill criteria for running several ventures at once.",
  whyItMatters:
    "You are raising for Afterwave while running Mizan and Suhail, and each needs a different kind of money, evidence and share of your time. This module gives you the arithmetic investors use (fund-returner, growth, default alive) so you can see your companies as they do, decide which venture is venture-scale, and size each round from milestones. It also gives you a repeatable way to spot failure early and to allocate your hours deliberately instead of by whichever inbox is loudest.",
  competencies: ["fc-fundamentals"],
  prerequisites: [],
  estimatedHours: 7,
  lessons: [l01, l02, l03, l04, l05],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
