/** Earned Value Management (PMI conventions). */

export interface EvmInput {
  /** Budget at completion. */
  bac: number;
  /** Planned value (BCWS) at status date. */
  pv: number;
  /** Earned value (BCWP). */
  ev: number;
  /** Actual cost (ACWP). */
  ac: number;
  /** Optional bottom-up estimate to complete for EAC method 4. */
  etcBottomUp?: number;
}

export const cv = (ev: number, ac: number) => ev - ac;
export const sv = (ev: number, pv: number) => ev - pv;
export const cpi = (ev: number, ac: number) => ev / ac;
export const spi = (ev: number, pv: number) => ev / pv;

/** EAC assuming current cost performance continues: BAC/CPI. */
export const eacCpi = (bac: number, cpiV: number) => bac / cpiV;
/** EAC assuming remaining work at budgeted rate: AC + (BAC − EV). */
export const eacBudgetRate = (bac: number, ev: number, ac: number) => ac + (bac - ev);
/** EAC assuming both CPI and SPI influence remaining work: AC + (BAC − EV)/(CPI·SPI). */
export const eacCpiSpi = (bac: number, ev: number, ac: number, cpiV: number, spiV: number) =>
  ac + (bac - ev) / (cpiV * spiV);
/** EAC with bottom-up ETC: AC + ETC. */
export const eacBottomUp = (ac: number, etc: number) => ac + etc;

/** ETC = EAC − AC. */
export const etc = (eac: number, ac: number) => eac - ac;
/** VAC = BAC − EAC. */
export const vac = (bac: number, eac: number) => bac - eac;
/** TCPI to achieve BAC: (BAC − EV)/(BAC − AC). */
export const tcpiBac = (bac: number, ev: number, ac: number) => (bac - ev) / (bac - ac);
/** TCPI to achieve EAC: (BAC − EV)/(EAC − AC). */
export const tcpiEac = (bac: number, ev: number, ac: number, eac: number) => (bac - ev) / (eac - ac);

export interface EvmResult {
  cv: number;
  sv: number;
  cpi: number;
  spi: number;
  eac: { cpi: number; budgetRate: number; cpiSpi: number; bottomUp: number | null };
  /** ETC and VAC based on the BAC/CPI EAC. */
  etc: number;
  vac: number;
  tcpiBac: number;
  tcpiEac: number;
  percentComplete: number;
  percentSpent: number;
}

export function evm(input: EvmInput): EvmResult {
  const { bac, pv, ev, ac, etcBottomUp } = input;
  const c = cpi(ev, ac);
  const s = spi(ev, pv);
  const e1 = eacCpi(bac, c);
  return {
    cv: cv(ev, ac),
    sv: sv(ev, pv),
    cpi: c,
    spi: s,
    eac: {
      cpi: e1,
      budgetRate: eacBudgetRate(bac, ev, ac),
      cpiSpi: eacCpiSpi(bac, ev, ac, c, s),
      bottomUp: etcBottomUp == null ? null : eacBottomUp(ac, etcBottomUp),
    },
    etc: etc(e1, ac),
    vac: vac(bac, e1),
    tcpiBac: tcpiBac(bac, ev, ac),
    tcpiEac: tcpiEac(bac, ev, ac, e1),
    percentComplete: ev / bac,
    percentSpent: ac / bac,
  };
}

/** Logistic S-curve fraction 0..1 at normalised time x in [0,1] (steepness k). Normalised to hit 0 and 1 exactly. */
export function sCurve(x: number, k = 10): number {
  const f = (t: number) => 1 / (1 + Math.exp(-k * (t - 0.5)));
  const a = f(0);
  const b = f(1);
  return (f(Math.max(0, Math.min(1, x))) - a) / (b - a);
}

/** Inverse of sCurve (bisection): x such that sCurve(x) = y. */
export function sCurveInverse(y: number, k = 10): number {
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 60; i++) {
    const m = (lo + hi) / 2;
    if (sCurve(m, k) < y) lo = m;
    else hi = m;
  }
  return (lo + hi) / 2;
}
