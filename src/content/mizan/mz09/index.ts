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
  id: "mz09",
  number: 9,
  title: "Plant data pipelines",
  titleAr: "خطوط بيانات محطات الطاقة الشمسية",
  summary:
    "How operational data in a PV plant is produced, transported, stored, extracted and cleaned, at the depth a seller of analytics needs: SCADA tags, device families, sampling and recording intervals and data volumes up to a 1 GW plant; Modbus, OPC UA, IEC 61850, DNP3 and MQTT with their security implications; historians (AVEVA PI and peers), compression, retrieval modes, the access ladder and data-sharing agreements; edge gateways, time-series databases, Parquet lakes, deployment models and costs; and the data-quality tests and pilot checklist that come before any soiling number.",
  whyItMatters:
    "Mizan sells analytics that are only as good as the plant data behind them, and the slowest, riskiest part of a pilot such as the one targeted at Shagaya Phase I is getting the right data out, safely and with correct timestamps. This module lets you write the data request, pass the OT security review, choose a deployment KISR and other public buyers can accept, price the data work honestly, and agree data-quality rules with the research partner before results are shown.",
  competencies: ["mz-data"],
  prerequisites: ["mz03"],
  estimatedHours: 7,
  lessons: [l01, l02, l03, l04, l05],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
