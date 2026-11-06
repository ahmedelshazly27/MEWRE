import type { Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import l06 from "./l06";
import formulas from "./formulas";
import references from "./references";
import glossary from "./glossary";
import exam from "./exam";
import cheatSheet from "./cheatsheet";

const mod: Module = {
  id: "sh04",
  number: 4,
  title: "Partnerships across the Gulf, Egypt and the Levant",
  titleAr: "الشراكات في الخليج ومصر والمشرق العربي",
  summary:
    "Partnerships for an Arab builder ecosystem: the map of government entities, sovereign AI programmes, VCs, corporates, universities, communities and media and what each trades; partnership structures, MOUs versus contracts and the priced cost of exclusivity; country playbooks for Saudi Arabia, the UAE, Qatar, Kuwait, Egypt, Jordan and Lebanon with budget calendars, norms, VAT and withholding; a partnership pipeline with qualification, stage probabilities, weighted forecasts and partner health; governance of conflicts, independence, sanctions, bribery and data; and investors and employers as partners.",
  whyItMatters:
    "Suhail runs on partners: every hackathon, the Suhail Season conference and the research arm depend on cash, venues, compute and people from organisations across the region, and nothing has launched yet. You will open those relationships yourself from January 2027 with unpaid leads, so you need to know who decides, what each partner wants, how to price what you give, and what never to give. Governance matters doubly for you because Afterwave and Mizan deal with some of the same institutions.",
  competencies: ["sh-partnerships"],
  prerequisites: [],
  estimatedHours: 8,
  lessons: [l01, l02, l03, l04, l05, l06],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
