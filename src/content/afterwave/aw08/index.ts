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
  id: "aw08",
  number: 8,
  title: "ML and agents on bench data",
  titleAr: "التعلم الآلي والوكلاء الأذكياء على بيانات منصات الاختبار",
  summary:
    "The machine learning and agent layer of Afterwave: time-series preparation (sampling, resampling, windows, features, FFT and orders), anomaly detection with alarm-cost thresholds, training local models on one customer's data with honest evaluation, agents that plan retests and run rigs behind approval gates, the privacy, IP and on-prem guarantees Enclave must make, and an honest analysis of when bench memory compounds into a moat.",
  whyItMatters:
    "Steps 2 and 3 of Afterwave's vision are customers training local models and running agents inside Enclave, and every buyer, security reviewer and investor will test those claims. You need enough depth to scope pilots the data can support, set thresholds in euros, design agents a safety engineer will accept, answer a security review without overclaiming, and tell the data-moat story in a way that matches what you promise customers.",
  competencies: ["aw-ml"],
  prerequisites: ["aw02", "aw05", "fc10"],
  estimatedHours: 8,
  lessons: [l01, l02, l03, l04, l05, l06],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
