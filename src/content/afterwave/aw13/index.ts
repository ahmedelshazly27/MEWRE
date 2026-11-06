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
  id: "aw13",
  number: 13,
  title: "Competitive landscape",
  titleAr: "المشهد التنافسي",
  summary:
    "Who else touches the hardware test bench and how Afterwave wins: a job-based map of test data platforms, robotics observability, simulation toolchains, test and measurement incumbents, requirements and test management, and capture tools, with dated facts; a close read of Nominal and Sift; build vs buy economics against in-house scripts and incumbents; an honest audit of what is defensible (one-clock capture, change impact, Enclave, physical platforms); and battlecards and objection handling for the calls you will actually have.",
  whyItMatters:
    "Every Afterwave sales call and investor meeting will test whether you know the landscape better than the person asking. Nominal and Sift have taught the market that hardware test data deserves modern software and have raised far more money, while NI, Vector and in-house scripts own the bench today. Your job is to place Ripple where none of them competes, concede honestly where they overlap, and turn that into battlecards and a moat story that survive diligence.",
  competencies: ["aw-business"],
  prerequisites: ["fc03", "aw05", "aw12"],
  estimatedHours: 7,
  lessons: [l01, l02, l03, l04, l05],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
