import { md, type Module } from "../../schema";
import l01 from "./l01";
import { formulas } from "./formulas";
import { references } from "./references";

const mod: Module = {
  id: "m15",
  number: 15,
  title: "Capstone: 1 GW PV + BESS for MEWRE",
  titleAr: "المشروع الختامي: محطة 1 جيجاواط شمسية مع تخزين",
  summary: "Content in preparation.",
  whyItMatters: "",
  competencies: ["delivery", "controls", "contracts", "finance"],
  prerequisites: [],
  estimatedHours: 0,
  lessons: [l01],
  exam: [],
  glossary: [],
  formulas,
  references,
  cheatSheet: md``,
};

export default mod;
