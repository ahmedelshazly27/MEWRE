import type { Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import l06 from "./l06";
import l07 from "./l07";
import formulas from "./formulas";
import references from "./references";
import glossary from "./glossary";
import exam from "./exam";
import cheatSheet from "./cheatsheet";

const mod: Module = {
  id: "aw09",
  number: 9,
  title: "Test platform engineering",
  titleAr: "هندسة منصات الاختبار",
  summary:
    "The hardware behind the bench: dynamometers and actuator rigs (four-quadrant operation, inertia matching, torque transducers, shaft-line resonance and a worked rig sizing); strain-gauge torque and force measurement with GUM uncertainty budgets; thermal chambers, humidity and vibration; traceable calibration and ISO/IEC 17025; rig stiffness, guarding, interlocks, safety PLCs and ISO 13849 performance levels; test-as-a-service economics with breakeven utilisation, own-versus-buy and spares; and how Afterwave's own instrumented platforms would feed bench memory, with a go/no-go framework for the first one.",
  whyItMatters:
    "Afterwave's customers live on dynos, actuator rigs and chambers, and the long-term roadmap includes Afterwave's own instrumented test platforms. To sell Lockstep and Ripple credibly to test leads, challenge your cofounders on a rig design, and answer an investor's 'are you a hardware company?' you need the physics, the metrology, the safety obligations and the economics of rigs. This module gives you all four, ending in a decision framework for when, and whether, to build the first platform.",
  competencies: ["aw-platforms"],
  prerequisites: [],
  estimatedHours: 9,
  lessons: [l01, l02, l03, l04, l05, l06, l07],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
