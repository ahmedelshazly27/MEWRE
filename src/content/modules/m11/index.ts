import type { Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import references from "./references";
import formulas from "./formulas";

const mod: Module = {
  id: "m11",
  number: 11,
  title: "Public Procurement in Kuwait",
  titleAr: "المناقصات العامة في الكويت",
  summary: "Content in preparation.",
  whyItMatters: "",
  competencies: ["procurement", "context"],
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
