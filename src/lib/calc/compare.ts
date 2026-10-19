/**
 * Simplified screening comparison: CSP with thermal storage vs PV + BESS for a firm evening block.
 * Both options are sized to deliver `mw` for `hours` after sunset every day; daytime PV surplus is not credited.
 * All cost inputs are illustrative screening values, editable by the user.
 */
import { crf } from "./finance";
import { requiredNameplate } from "./bess";

export interface FirmBlockInput {
  /** Firm delivery (MW). */
  mw: number;
  /** Delivery duration after sunset (h). */
  hours: number;
  /** Delivery start hour (local). */
  startHour?: number;
  wacc: number;
  years: number;
  /** CSP all-in capex (USD/kW of turbine) for the chosen storage hours. */
  cspCapexPerKw: number;
  /** CSP fixed O&M (USD/kW-yr). */
  cspOmPerKwYr: number;
  /** PV capex (USD/kWp DC). */
  pvCapexPerKw: number;
  pvOmPerKwYr: number;
  /** PV daily specific yield (kWh/kWp/day). */
  pvDailyYield: number;
  /** BESS capex (USD/kWh nameplate). */
  bessCapexPerKwh: number;
  /** BESS fixed O&M (USD/kWh-yr). */
  bessOmPerKwhYr: number;
  /** Augmentation/replacement provision as share of BESS capex over life. */
  bessAugmentationShare: number;
  dod: number;
  rte: number;
}

export const DEFAULT_FIRM_BLOCK: FirmBlockInput = {
  mw: 200,
  hours: 6,
  startHour: 18,
  wacc: 0.07,
  years: 25,
  cspCapexPerKw: 4200,
  cspOmPerKwYr: 70,
  pvCapexPerKw: 450,
  pvOmPerKwYr: 8,
  pvDailyYield: 5.6,
  bessCapexPerKwh: 230,
  bessOmPerKwhYr: 5,
  bessAugmentationShare: 0.25,
  dod: 0.9,
  rte: 0.86,
};

/** Indicative CSP all-in capex (USD/kW) as a function of storage hours (tower class). */
export function cspCapexForHours(hours: number): number {
  return 3000 + 200 * hours;
}

export interface FirmBlockResult {
  annualMwh: number;
  csp: { capex: number; annualCost: number; lcos: number };
  pvBess: { pvMwDc: number; bessMwh: number; capex: number; capexPv: number; capexBess: number; annualCost: number; lcos: number };
}

export function compareFirmBlock(i: FirmBlockInput): FirmBlockResult {
  const annualMwh = i.mw * i.hours * 365;
  const f = crf(i.wacc, i.years);
  const cspCapex = i.mw * 1000 * i.cspCapexPerKw;
  const cspAnnual = cspCapex * f + i.mw * 1000 * i.cspOmPerKwYr;
  const bessMwh = requiredNameplate(i.mw, i.hours, i.dod, i.rte);
  const chargeMwh = (i.mw * i.hours) / i.rte;
  const pvMwDc = chargeMwh / i.pvDailyYield; // MWh / (MWh/MWp/day)
  const capexPv = pvMwDc * 1000 * i.pvCapexPerKw;
  const capexBess = bessMwh * 1000 * i.bessCapexPerKwh * (1 + i.bessAugmentationShare);
  const capex = capexPv + capexBess;
  const annual = capex * f + pvMwDc * 1000 * i.pvOmPerKwYr + bessMwh * 1000 * i.bessOmPerKwhYr;
  return {
    annualMwh,
    csp: { capex: cspCapex, annualCost: cspAnnual, lcos: cspAnnual / annualMwh },
    pvBess: { pvMwDc, bessMwh, capex, capexPv, capexBess, annualCost: annual, lcos: annual / annualMwh },
  };
}
