import type { Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import formulas from "./formulas";
import references from "./references";

const mod: Module = {
  id: "m09",
  number: 9,
  title: "Contracts & Commercial",
  titleAr: "العقود والشؤون التجارية",
  summary: "Content in preparation.",
  whyItMatters: "",
  competencies: ["contracts"],
  prerequisites: [],
  estimatedHours: 0,
  lessons: [l01, l02, l03],
  exam: [],
  glossary: [],
  formulas,
  references,
  cheatSheet: "",
};

export default mod;
