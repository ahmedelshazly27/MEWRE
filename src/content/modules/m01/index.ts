import type { Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import formulas from "./formulas";
import references from "./references";

const mod: Module = {
  id: "m01",
  number: 1,
  title: "Energy & Power Fundamentals",
  titleAr: "أساسيات الطاقة والقدرة الكهربائية",
  summary: "WIP",
  whyItMatters: "",
  competencies: ["engineering"],
  prerequisites: [],
  estimatedHours: 0,
  lessons: [l01, l02, l03, l04, l05],
  exam: [],
  glossary: [],
  formulas,
  references,
  cheatSheet: "",
};

export default mod;
