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
  id: "aw02",
  number: 2,
  title: "Data acquisition and signals",
  titleAr: "اكتساب البيانات والإشارات",
  summary:
    "The engineering behind bench data: sensors and signal chains (bridges, load cells, thermocouples, RTDs, current sensing, noise and grounding); sampling, aliasing, ADC resolution, ENOB and data-rate arithmetic; clocks, drift, PTP, GPS/PPS and aligning streams on one clock; MDF4, TDMS, HDF5, MCAP, CSV and Parquet storage; capturing on-screen actions and software context alongside signals; and calibration, uncertainty, naming, versioning, lineage and quality checks that make bench memory trustworthy.",
  whyItMatters:
    "Lockstep records rig signals via data acquisition and on-screen actions on one clock, and everything Afterwave sells after that (Ripple, models and agents in Enclave, later safety evidence) rests on the quality of that capture. Test engineers will judge you on whether you understand their channels, rates, clocks and files. This module gives you the mechanisms and numbers to sell credibly, challenge a spec, and make product decisions with Ismail and Yusuf.",
  competencies: ["aw-data"],
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
