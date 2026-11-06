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
  id: "aw07",
  number: 7,
  title: "Robotics and physical AI fundamentals",
  titleAr: "أساسيات الروبوتات والذكاء الاصطناعي المادي",
  summary:
    "The engineering under physical AI, at the depth a test buyer expects: actuator equations (Kt, back-EMF, gear ratio, reflected inertia, harmonic drives, thermal limits), cascaded control loops with a worked tuning and stability margins, perception sensors and the Kalman filter, learned policies and vision-language-action models with the statistics of evaluating them, the sim-to-real gap and why bench data validates simulation, and a dated, sourced view of the 2026 humanoid market and its validation bottlenecks.",
  whyItMatters:
    "Afterwave sells to test teams in robotics, humanoids, drives and motors, and its positioning is physical AI, not generic test automation. To be credible with those buyers, challenge your cofounders and decide what Lockstep and Ripple must capture and reason about, you need to know how actuators, control loops, sensors and learned policies fail and what evidence proves they work. This module also gives you the dated facts and limits behind the why-now in your YC and investor materials.",
  competencies: ["aw-physical-ai"],
  prerequisites: [],
  estimatedHours: 8,
  lessons: [l01, l02, l03, l04, l05, l06],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
