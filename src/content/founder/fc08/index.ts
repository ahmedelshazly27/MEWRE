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
  id: "fc08",
  number: 8,
  title: "Equity & legal",
  titleAr: "الملكية والشؤون القانونية للشركات الناشئة",
  summary:
    "The equity and legal mechanics a founder must run himself: cap tables and dilution, post-money and pre-money SAFEs and convertible loans (with the YC standard deal converted exactly), priced rounds and the option pool shuffle, vesting and founder tax (83(b) and the Dutch rules), liquidation preferences and anti-dilution, Dutch, Delaware, Swiss and Kuwaiti structures, and the IP, NDA and pilot contracts that protect what the company builds and sells.",
  whyItMatters:
    "You will negotiate every round, grant every option and sign every pilot for Afterwave, Mizan and Suhail, usually before you can afford a lawyer on every call. Each of those decisions is arithmetic (dilution, conversion, waterfalls) or allocation (IP, data, liability), and the costly mistakes are made early and found late, in due diligence. Knowing the mechanics lets you compare term sheets in euros, choose structures that survive a YC flip or a Kuwaiti licence, and use lawyers for judgement rather than translation.",
  competencies: ["fc-legal"],
  prerequisites: [],
  estimatedHours: 8.5,
  lessons: [l01, l02, l03, l04, l05, l06, l07],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
