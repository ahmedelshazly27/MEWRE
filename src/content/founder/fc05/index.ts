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
  id: "fc05",
  number: 5,
  title: "Marketing & brand",
  titleAr: "التسويق والعلامة التجارية",
  summary:
    "Marketing for a founder selling deep tech to engineers and Gulf institutions: brand as buyer risk reduction and the proof ladder; technical content (whitepapers, benchmarks, case studies) with funnel maths and multi-touch attribution; developer marketing, open source and communities of practice; trade show economics with cost per qualified lead, speaking, press releases and embargoes; founder-led LinkedIn measured down to qualified conversations, never automated; and bilingual Arabic/English communication (MSA vs Gulf dialect, transcreation, RTL).",
  whyItMatters:
    "Afterwave, Mizan and Suhail all sell trust before they sell product: test leads, plant operators, KISR researchers, sponsors and builders take a personal risk on a young company. With no marketing team, you decide which few assets, events and posts lower that risk, and you need the numbers (CPQL, attribution, activation) to stop spending founder time on what does not convert. In the Gulf, getting the Arabic register and the partner-approval etiquette right is as much part of the brand as the logo.",
  competencies: ["fc-marketing"],
  prerequisites: ["fc03"],
  estimatedHours: 7,
  lessons: [l01, l02, l03, l04, l05],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
