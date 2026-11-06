import type { Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import l06 from "./l06";
import exam from "./exam";
import glossary from "./glossary";
import formulas from "./formulas";
import references from "./references";
import cheatSheet from "./cheatsheet";

const mod: Module = {
  id: "sh02",
  number: 2,
  title: "Hackathon design and operations",
  titleAr: "تصميم الهاكاثونات وتشغيلها",
  summary:
    "How to design and run hackathons that serve builders, sponsors and Suhail at the same time: goals and formats (with the {Tech: Europe} and MLH models), challenge design (themes, sponsor tracks, prizes, rubrics, fresh-build rules), the participant funnel with binomial overbooking and reconfirmation, operations sized from first principles (network, power, food, safety, volunteers, run-of-show), fair judging with calibration and z-score normalisation, sponsor reports and follow-up that builds the community, and the regional constraints of the Gulf, Egypt and the Levant (permits, Ramadan and weekends, language, overnight norms, visas and partners).",
  whyItMatters:
    "Hackathons are planned to be Suhail's most frequent product and the first contact most builders will have with the community. Nothing has launched yet, so the first two or three events will set Suhail's reputation with builders, sponsors and venues. Most failures (empty rooms, dead wifi, tripped circuits, disputed results, silent follow-up, permit surprises) are predictable and preventable with the design rules and arithmetic in this module.",
  competencies: ["sh-events"],
  prerequisites: [],
  estimatedHours: 7.5,
  lessons: [l01, l02, l03, l04, l05, l06],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
