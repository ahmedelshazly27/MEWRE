import type { Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import formulas from "./formulas";
import references from "./references";
import glossary from "./glossary";
import exam from "./exam";
import cheatSheet from "./cheatsheet";

const mod: Module = {
  id: "mz01",
  number: 1,
  title: "Soiling physics",
  titleAr: "فيزياء اتساخ الألواح الشمسية",
  summary:
    "The physics of PV soiling in Kuwait and the Gulf, from desert to lost kilowatt-hour: dust sources, particle sizes, shamal climatology and aerosol optical depth; deposition by settling, impaction and turbulence, with tilt, wind and resuspension; adhesion, dew and cementation; transmittance, spectral, mismatch and bifacial losses and their relation to deposited mass; and the physics, evidence and limits of coatings, night stow and layout as mitigation.",
  whyItMatters:
    "Mizan's products (soiling analytics, cleaning optimisation and dust-aware stow and tracker control) are only as credible as the physics behind them, and the planned Shagaya Phase I study puts that physics in front of KISR researchers. This module lets you explain why plants soil at the rates they do, separate atmospheric dust from deposition in data, justify dew sensing and night stow, and refuse claims the evidence does not support.",
  competencies: ["mz-soiling"],
  prerequisites: [],
  estimatedHours: 7,
  lessons: [l01, l02, l03, l04, l05],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
