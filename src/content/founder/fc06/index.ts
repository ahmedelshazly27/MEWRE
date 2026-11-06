import type { Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import l06 from "./l06";
import l07 from "./l07";
import l08 from "./l08";
import formulas from "./formulas";
import references from "./references";
import glossary from "./glossary";
import exam from "./exam";
import cheatSheet from "./cheatsheet";

const mod: Module = {
  id: "fc06",
  number: 6,
  title: "Finance & economics for founders",
  titleAr: "المالية والاقتصاد للمؤسسين",
  summary:
    "The finance a founder uses every week: the three statements and how they link (accrual vs cash, deferred revenue, capitalised costs); unit economics (CAC, LTV derived from churn, payback, contribution margin); SaaS and hardware metrics (ARR, NRR/GRR, burn multiple, rule of 40, inventory and the cash conversion cycle); burn, runway and default alive; driver-based modelling; pricing economics (elasticity, Lerner condition, value-based pricing, price discrimination); budgeting with scenarios, tornados and cash triggers; and the micro and macro economics behind moats and funding cycles. Worked through illustrative numbers for Afterwave, Mizan and Suhail.",
  whyItMatters:
    "You own finance, pricing and fundraising in every venture, while engineering partners build the product. Whether Afterwave can fund an enterprise sales motion, whether Mizan can carry public-buyer payment terms on hardware, and what Suhail can charge sponsors are all finance questions with numeric answers. Investors test these numbers in the first meeting; knowing the mechanisms lets you answer precisely and make the decisions before cash forces them.",
  competencies: ["fc-finance"],
  prerequisites: [],
  estimatedHours: 10,
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
