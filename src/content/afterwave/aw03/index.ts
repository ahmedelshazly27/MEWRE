import type { Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import l06 from "./l06";
import exam from "./exam";
import glossary from "./glossary";
import formulas from "./formulas";
import references from "./references";
import cheatSheet from "./cheatsheet";

const mod: Module = {
  id: "aw03",
  number: 3,
  title: "HIL, SIL, test orchestration and CI for hardware",
  titleAr: "المحاكاة بالعتاد والبرمجيات ضمن الحلقة، وتنسيق الاختبارات، والتكامل المستمر للعتاد",
  summary:
    "How hardware test organisations actually run tests: the MIL, SIL, PIL and HIL ladder with plant models, step sizes and latency budgets; inside a HIL rack (IO, FIU, fault injection, dSPACE, NI, Speedgoat and Vector styles) and its economics; sequencers, rig scheduling, overnight runs and the statistics of flaky tests; CI/CD for firmware with tiered gates and the queueing math of rig contention; run records, verdicts and traceability; and where supervised agents fit in Afterwave's product vision.",
  whyItMatters:
    "Every Afterwave buyer lives inside this machinery: HIL systems booked weeks out, sequencers, CI pipelines that end on a rig, and suites that are rarely green. Ripple's value is decided here, because selection pays where hours are expensive and pools are contended, and Lockstep's value depends on run records that hold up as evidence. You need the numbers (step sizes, phase loss, cost per hour, queue waits, flake rates) to run discovery with test leads, to challenge your cofounders on product decisions, and to describe the agent roadmap without overclaiming.",
  competencies: ["aw-test"],
  prerequisites: ["aw01", "aw02"],
  estimatedHours: 9,
  lessons: [l01, l02, l03, l04, l05, l06],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
