import type { Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import formulas from "./formulas";
import references from "./references";

const mod: Module = {
  id: "m06",
  number: 6,
  title: "Grid Integration",
  titleAr: "الربط بالشبكة الكهربائية",
  summary: "WIP",
  whyItMatters: "",
  competencies: ["grid"],
  prerequisites: [],
  estimatedHours: 0,
  lessons: [l01, l02, l03, l04],
  exam: [],
  glossary: [],
  formulas,
  references,
  cheatSheet: "",
};

export default mod;
