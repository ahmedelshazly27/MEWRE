/**
 * Discounted cash flow, LCOE, simple project-finance model, tariff levelisation.
 * Conventions: cash flow arrays start at t = 0 (undiscounted); rates are decimals (0.07 = 7 %).
 */

/** Net present value of cash flows cf[0..n] at rate r (cf[0] at t = 0). */
export function npv(rate: number, cashFlows: number[]): number {
  let s = 0;
  for (let t = 0; t < cashFlows.length; t++) s += cashFlows[t] / Math.pow(1 + rate, t);
  return s;
}

/**
 * Internal rate of return. Searches for a sign change of NPV across a bracket grid,
 * then refines by bisection. Returns NaN if no IRR exists in (−99 %, 1000 %).
 */
export function irr(cashFlows: number[], guess = 0.1): number {
  const f = (r: number) => npv(r, cashFlows);
  const grid = [-0.99, -0.9, -0.75, -0.5, -0.3, -0.2, -0.1, -0.05, 0, 0.02, 0.05, 0.08, 0.1, 0.12, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5, 0.75, 1, 1.5, 2, 3, 5, 10];
  // Prefer the bracket nearest to the guess
  let best: [number, number] | null = null;
  let bestDist = Infinity;
  for (let i = 0; i < grid.length - 1; i++) {
    const a = grid[i];
    const b = grid[i + 1];
    const fa = f(a);
    const fb = f(b);
    if (!Number.isFinite(fa) || !Number.isFinite(fb)) continue;
    if (fa === 0) return a;
    if (fa * fb < 0) {
      const d = Math.min(Math.abs(a - guess), Math.abs(b - guess));
      if (d < bestDist) {
        bestDist = d;
        best = [a, b];
      }
    }
  }
  if (!best) {
    if (f(grid[grid.length - 1]) === 0) return grid[grid.length - 1];
    return NaN;
  }
  let [lo, hi] = best;
  let flo = f(lo);
  for (let k = 0; k < 200; k++) {
    const mid = 0.5 * (lo + hi);
    const fm = f(mid);
    if (Math.abs(fm) < 1e-12 || hi - lo < 1e-12) return mid;
    if (flo * fm < 0) hi = mid;
    else {
      lo = mid;
      flo = fm;
    }
  }
  return 0.5 * (lo + hi);
}

/** Simple payback period (years, interpolated). Infinity if never paid back. */
export function paybackSimple(cashFlows: number[]): number {
  let cum = 0;
  for (let t = 0; t < cashFlows.length; t++) {
    const prev = cum;
    cum += cashFlows[t];
    if (t > 0 && prev < 0 && cum >= 0) return t - 1 + -prev / cashFlows[t];
    if (t === 0 && cum >= 0) return 0;
  }
  return Infinity;
}

/** Discounted payback period (years, interpolated). */
export function paybackDiscounted(rate: number, cashFlows: number[]): number {
  return paybackSimple(cashFlows.map((c, t) => c / Math.pow(1 + rate, t)));
}

/** Capital recovery factor CRF = r(1+r)^n / ((1+r)^n − 1). */
export function crf(rate: number, years: number): number {
  if (rate === 0) return 1 / years;
  const x = Math.pow(1 + rate, years);
  return (rate * x) / (x - 1);
}

/** Level annuity payment for a principal. */
export function annuityPayment(principal: number, rate: number, years: number): number {
  return principal * crf(rate, years);
}

/** Present value factor of a level annuity: (1 − (1+r)^−n)/r. */
export function annuityFactor(rate: number, years: number): number {
  return 1 / crf(rate, years);
}

export interface LcoeInput {
  /** Total capex at t = 0 (currency). */
  capex: number;
  /** Year-1 O&M cost (currency/yr). */
  opex: number;
  /** Year-1 energy (MWh). */
  energy: number;
  /** Discount rate (WACC). */
  rate: number;
  /** Life (years). */
  years: number;
  /** Annual degradation of energy (fraction, e.g. 0.005). */
  degradation?: number;
  /** Annual escalation of opex (fraction). */
  opexEscalation?: number;
}

/** LCOE = (capex + Σ opex_t/(1+r)^t) / Σ E_t/(1+r)^t, with E_t = E1·(1−d)^(t−1). Currency per MWh. */
export function lcoe(i: LcoeInput): number {
  const d = i.degradation ?? 0;
  const esc = i.opexEscalation ?? 0;
  let costs = i.capex;
  let energy = 0;
  for (let t = 1; t <= i.years; t++) {
    const df = Math.pow(1 + i.rate, t);
    costs += (i.opex * Math.pow(1 + esc, t - 1)) / df;
    energy += (i.energy * Math.pow(1 - d, t - 1)) / df;
  }
  return costs / energy;
}

/** LCOE breakdown into capex and opex components (currency/MWh). */
export function lcoeBreakdown(i: LcoeInput): { capex: number; opex: number; total: number } {
  const total = lcoe(i);
  const capexOnly = lcoe({ ...i, opex: 0 });
  return { capex: capexOnly, opex: total - capexOnly, total };
}

/**
 * Levelized tariff of an escalating tariff stream: Σ T0(1+e)^(t−1)·E_t/(1+r)^t ÷ Σ E_t/(1+r)^t.
 * Energy defaults to constant.
 */
export function levelizedTariff(t0: number, escalation: number, rate: number, years: number, energy?: number[]): number {
  let num = 0;
  let den = 0;
  for (let t = 1; t <= years; t++) {
    const e = energy ? energy[t - 1] ?? 0 : 1;
    const df = Math.pow(1 + rate, t);
    num += (t0 * Math.pow(1 + escalation, t - 1) * e) / df;
    den += e / df;
  }
  return num / den;
}

export interface ProjectFinanceInput {
  /** Capex (currency, e.g. USD m). */
  capex: number;
  /** Year-1 net energy (MWh, or GWh if tariff in currency/kWh·10⁶ — keep units consistent). */
  energy: number;
  /** Tariff year 1 (currency per energy unit). */
  tariff: number;
  tariffEscalation?: number;
  /** Year-1 opex (currency). */
  opex: number;
  opexEscalation?: number;
  degradation?: number;
  years: number;
  /** Debt share of capex (0..1). */
  gearing: number;
  /** Debt interest rate. */
  interest: number;
  /** Debt tenor (years, annuity repayment). */
  tenor: number;
  /** Corporate tax rate on (CFADS − interest − depreciation). Default 0. */
  taxRate?: number;
  /** Discount rate for project NPV. */
  discountRate?: number;
}

export interface ProjectFinanceYear {
  year: number;
  revenue: number;
  opex: number;
  tax: number;
  cfads: number;
  interest: number;
  principal: number;
  debtService: number;
  dscr: number | null;
  equityCf: number;
  debtBalance: number;
}

export interface ProjectFinanceResult {
  rows: ProjectFinanceYear[];
  debt: number;
  equity: number;
  annualDebtService: number;
  projectIrr: number;
  equityIrr: number;
  projectNpv: number;
  minDscr: number;
  avgDscr: number;
  paybackProject: number;
  paybackEquity: number;
  projectCashFlows: number[];
  equityCashFlows: number[];
}

/** Simple annual project-finance model with annuity (mortgage-style) debt. */
export function projectFinance(i: ProjectFinanceInput): ProjectFinanceResult {
  const debt = i.capex * i.gearing;
  const equity = i.capex - debt;
  const ds = debt > 0 ? annuityPayment(debt, i.interest, i.tenor) : 0;
  const tax = i.taxRate ?? 0;
  const depreciation = i.capex / i.years;
  let bal = debt;
  const rows: ProjectFinanceYear[] = [];
  const projectCf = [-i.capex];
  const equityCf = [-equity];
  for (let y = 1; y <= i.years; y++) {
    const e = i.energy * Math.pow(1 - (i.degradation ?? 0), y - 1);
    const revenue = e * i.tariff * Math.pow(1 + (i.tariffEscalation ?? 0), y - 1);
    const opex = i.opex * Math.pow(1 + (i.opexEscalation ?? 0), y - 1);
    const interest = y <= i.tenor ? bal * i.interest : 0;
    const service = y <= i.tenor ? ds : 0;
    const principal = service - interest;
    const taxable = revenue - opex - interest - depreciation;
    const taxAmt = Math.max(0, taxable) * tax;
    const cfads = revenue - opex - taxAmt;
    bal = Math.max(0, bal - principal);
    rows.push({
      year: y,
      revenue,
      opex,
      tax: taxAmt,
      cfads,
      interest,
      principal,
      debtService: service,
      dscr: service > 0 ? cfads / service : null,
      equityCf: cfads - service,
      debtBalance: bal,
    });
    projectCf.push(cfads);
    equityCf.push(cfads - service);
  }
  const dscrs = rows.map((r) => r.dscr).filter((x): x is number => x != null);
  return {
    rows,
    debt,
    equity,
    annualDebtService: ds,
    projectIrr: irr(projectCf),
    equityIrr: irr(equityCf, 0.12),
    projectNpv: npv(i.discountRate ?? 0.07, projectCf),
    minDscr: dscrs.length ? Math.min(...dscrs) : NaN,
    avgDscr: dscrs.length ? dscrs.reduce((a, b) => a + b, 0) / dscrs.length : NaN,
    paybackProject: paybackSimple(projectCf),
    paybackEquity: paybackSimple(equityCf),
    projectCashFlows: projectCf,
    equityCashFlows: equityCf,
  };
}

/** Maximum debt (currency) sculpted to a target DSCR with annuity repayment: PV of (CFADS/DSCR) over tenor at a level payment. */
export function debtCapacityAnnuity(minCfads: number, targetDscr: number, interest: number, tenor: number): number {
  return (minCfads / targetDscr) * annuityFactor(interest, tenor);
}

export interface Bid {
  name: string;
  /** Year-1 tariff (e.g. fils/kWh or USD/MWh). */
  tariff: number;
  /** Annual escalation (fraction). */
  escalation: number;
  /** Technical score 0..100. */
  technical: number;
}

export interface BidResult extends Bid {
  levelized: number;
  financialScore: number;
  combined: number;
  rank: number;
}

/**
 * Evaluate bids: levelize each tariff, financial score = 100·(lowest levelized / levelized),
 * combined = wFin·financial + (1 − wFin)·technical. Bids below `techThreshold` are ranked last.
 */
export function evaluateBids(bids: Bid[], rate: number, years: number, wFin = 0.8, techThreshold = 0): BidResult[] {
  const lev = bids.map((b) => levelizedTariff(b.tariff, b.escalation, rate, years));
  const qualified = bids.map((b) => b.technical >= techThreshold);
  const minLev = Math.min(...lev.filter((_, k) => qualified[k]), Infinity);
  const res = bids.map((b, k) => {
    const financialScore = qualified[k] && Number.isFinite(minLev) ? (100 * minLev) / lev[k] : 0;
    return {
      ...b,
      levelized: lev[k],
      financialScore,
      combined: qualified[k] ? wFin * financialScore + (1 - wFin) * b.technical : 0,
      rank: 0,
    };
  });
  const order = res.map((_, k) => k).sort((a, b) => res[b].combined - res[a].combined);
  order.forEach((k, pos) => (res[k].rank = pos + 1));
  return res;
}

export interface MilestonePayment {
  /** Month the milestone is certified. */
  month: number;
  /** Share of contract value (0..1). */
  share: number;
}

export interface CashflowMonth {
  month: number;
  gross: number;
  retention: number;
  advanceRecovery: number;
  advance: number;
  net: number;
  cumulativeNet: number;
  cumulativeGross: number;
}

/**
 * Construction cash flow from a milestone payment schedule: advance payment at month 0,
 * recovered pro-rata from each interim payment; retention deducted from each payment
 * up to a limit, half released at completion and half at end of DNP.
 */
export function constructionCashflow(opts: {
  contractValue: number;
  milestones: MilestonePayment[];
  advancePct?: number;
  retentionPct?: number;
  retentionLimitPct?: number;
  completionMonth?: number;
  dnpMonths?: number;
}): CashflowMonth[] {
  const { contractValue: cvv, milestones, advancePct = 0.1, retentionPct = 0.1, retentionLimitPct = 0.05 } = opts;
  const lastMs = Math.max(0, ...milestones.map((m) => m.month));
  const completion = opts.completionMonth ?? lastMs;
  const dnp = opts.dnpMonths ?? 12;
  const horizon = Math.max(lastMs, completion + dnp);
  const advance = cvv * advancePct;
  const retLimit = cvv * retentionLimitPct;
  let retained = 0;
  let recovered = 0;
  let cumNet = 0;
  let cumGross = 0;
  const out: CashflowMonth[] = [];
  for (let m = 0; m <= horizon; m++) {
    const gross = milestones.filter((x) => x.month === m).reduce((a, x) => a + x.share * cvv, 0);
    let ret = Math.min(gross * retentionPct, retLimit - retained);
    ret = Math.max(0, ret);
    retained += ret;
    let rec = Math.min(gross * advancePct, advance - recovered);
    rec = Math.max(0, rec);
    recovered += rec;
    let release = 0;
    if (m === completion) release += retained / 2;
    if (m === completion + dnp) release += retained / 2;
    const adv = m === 0 ? advance : 0;
    const net = gross - ret - rec + adv + release;
    cumNet += net;
    cumGross += gross;
    out.push({ month: m, gross, retention: ret - release, advanceRecovery: rec, advance: adv, net, cumulativeNet: cumNet, cumulativeGross: cumGross });
  }
  return out;
}
