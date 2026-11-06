import type { Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import l06 from "./l06";
import l07 from "./l07";
import formulas from "./formulas";
import references from "./references";
import glossary from "./glossary";
import exam from "./exam";
import cheatSheet from "./cheatsheet";

const mod: Module = {
  id: "sh09",
  number: 9,
  title: "Open-weight LLM research fundamentals",
  titleAr: "أساسيات أبحاث النماذج اللغوية الكبيرة مفتوحة الأوزان",
  summary:
    "The technical foundation for leading Suhail's research arm: the training pipeline with its losses written out (pretraining, continued pretraining, SFT, RLHF and DPO), tokenisation and the Arabic fertility tax, Kaplan and Chinchilla scaling laws and over-training, compute and memory arithmetic from GPU-hours to KV cache, evaluation with Arabic benchmarks, contamination checks, LLM judges and error bars, Arabic dataset sourcing with rights, consent, dialect mixing and datasheets, and a realistic research agenda with a proposal review procedure.",
  whyItMatters:
    "Suhail plans a research arm doing open-weight models, datasets and benchmarks for the Arab world, run largely by volunteers while sovereign labs in Saudi Arabia, the UAE and Qatar train models with national compute. You will choose its projects, negotiate its compute and data partners, and speak for its results on stage and in the newsletter without being the researcher. This module gives you the equations and arithmetic to price any proposal, check any benchmark claim, and steer the arm to the work where a community has real leverage: evaluation, dialect data and open tooling.",
  competencies: ["sh-research"],
  prerequisites: ["m14"],
  estimatedHours: 10,
  lessons: [l01, l02, l03, l04, l05, l06, l07],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
