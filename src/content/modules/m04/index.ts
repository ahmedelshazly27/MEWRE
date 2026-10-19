import { md, type Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import formulas from "./formulas";
import references from "./references";

const mod: Module = {
  id: "m04",
  number: 4,
  title: "Wind Energy",
  titleAr: "طاقة الرياح",
  summary: "Content in preparation.",
  whyItMatters: "",
  competencies: ["wind-storage"],
  prerequisites: [],
  estimatedHours: 0,
  lessons: [l01, l02],
  exam: [],
  glossary: [],
  formulas,
  references,
  cheatSheet: md``,
  draft: false,
};

export default mod;
