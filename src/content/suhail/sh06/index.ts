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
  id: "sh06",
  number: 6,
  title: "The Arab tech and AI landscape",
  titleAr: "مشهد التقنية والذكاء الاصطناعي في العالم العربي",
  summary:
    "The landscape Suhail operates in, as of November 2026 and with every fact dated: Gulf sovereign AI (SDAIA and HUMAIN, G42, MGX and Stargate UAE, Qai, Kuwait's Microsoft partnership) and how to turn megawatts into chip counts; the open Arabic models (ALLaM, Jais 2, K2 Think, Falcon-H1 Arabic, Fanar), their licences and the benchmarks that judge them (OALL v2, BALSAM, ABBL) with contamination in mind; MENA venture capital 2025 to 2026 read through MAGNiTT and Wamda and reconciled with simple arithmetic; where Arab technical talent is and how it moves; the ecosystem gaps a neutral cross-border community can fill and the lines it must not cross; and a living landscape map with a claim-check method to keep it all true.",
  whyItMatters:
    "Suhail's partners, sponsors, judges, employers and stories all come from this landscape, and its credibility depends on describing it accurately when most coverage repeats press releases. Knowing who does what, what is announced versus running, and how to read a funding total or a leaderboard rank lets you target the right partners and say no to the wrong ones. It also defines Suhail's strategy: play in the gaps between national programmes, capital and universities, and never compete with them.",
  competencies: ["sh-landscape"],
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
