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
  id: "aw06",
  number: 6,
  title: "Embedded firmware basics",
  titleAr: "أساسيات البرمجيات الثابتة المدمجة",
  summary:
    "What runs inside the products Afterwave's customers test, and how it is built, changed and verified: microcontrollers versus SoCs and their cycle and latency arithmetic; RTOS scheduling, jitter and field-oriented motor control; CAN, CAN FD, EtherCAT, SPI, I2C and UART with bus load math and bench logging; the firmware lifecycle from commit to flashed rig, and why small changes ripple into many tests; and firmware testing from unit tests to HIL, MISRA and MC/DC, with the questions a non-coding CEO must ask.",
  whyItMatters:
    "Ripple exists because firmware changes are the most frequent and least understood trigger for rig retests, and Lockstep's records are only evidence if they carry the build, calibration and bus context of every run. This module gives you enough firmware depth to follow Ismail and Yusuf in a customer's validation meeting, to challenge a firmware lead who says \"it is only a small change\", and to set the verification bar for Afterwave's own test platforms.",
  competencies: ["aw-physical-ai"],
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
