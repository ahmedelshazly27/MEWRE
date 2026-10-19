import { describe, it, expect } from "vitest";
import {
  npv,
  irr,
  paybackSimple,
  paybackDiscounted,
  crf,
  annuityPayment,
  annuityFactor,
  lcoe,
  lcoeBreakdown,
  levelizedTariff,
  projectFinance,
  debtCapacityAnnuity,
  evaluateBids,
  constructionCashflow,
} from "./finance";

describe("NPV", () => {
  it("[−100, 110] at 10 % = 0", () => {
    expect(npv(0.1, [-100, 110])).toBeCloseTo(0, 12);
  });
  it("[−1000, 300×5] at 8 %", () => {
    // annuity factor 3.99271 → 1197.81 − 1000
    expect(npv(0.08, [-1000, 300, 300, 300, 300, 300])).toBeCloseTo(197.813, 2);
  });
  it("zero rate = sum", () => {
    expect(npv(0, [-5, 2, 2, 2])).toBe(1);
  });
});

describe("IRR", () => {
  it("[−100, 110] → 10 %", () => {
    expect(irr([-100, 110])).toBeCloseTo(0.1, 9);
  });
  it("[−100, 60, 60] → 13.07 %", () => {
    // 60/(1+r) + 60/(1+r)² = 100 → r = 0.130662
    expect(irr([-100, 60, 60])).toBeCloseTo(0.130662, 5);
  });
  it("NPV at IRR is zero for a long project", () => {
    const cf = [-1000, ...new Array(25).fill(95)];
    const r = irr(cf);
    expect(Math.abs(npv(r, cf))).toBeLessThan(1e-6);
    expect(r).toBeGreaterThan(0.07);
    expect(r).toBeLessThan(0.09);
  });
  it("negative IRR", () => {
    expect(irr([-100, 50, 40])).toBeCloseTo(-0.06993, 4); // 40x² + 50x − 100 = 0, x = 1/(1+r)
  });
  it("NaN when no sign change", () => {
    expect(Number.isNaN(irr([100, 10, 10]))).toBe(true);
  });
});

describe("payback", () => {
  it("simple payback interpolates", () => {
    expect(paybackSimple([-100, 30, 30, 30, 30])).toBeCloseTo(3 + 10 / 30, 12);
    expect(paybackSimple([-100, 50, 50])).toBe(2);
    expect(paybackSimple([-100, 10])).toBe(Infinity);
  });
  it("discounted payback is longer", () => {
    const cf = [-100, 30, 30, 30, 30, 30];
    // discounted @10 %: 27.27, 24.79, 22.54, 20.49, 18.63 → cum after 4 = 95.09; need 4.91/18.63
    expect(paybackDiscounted(0.1, cf)).toBeCloseTo(4 + (100 - 95.0960) / 18.6276, 3);
    expect(paybackDiscounted(0.1, cf)).toBeGreaterThan(paybackSimple(cf));
  });
});

describe("annuities", () => {
  it("CRF 8 %, 20 y = 0.101852", () => {
    expect(crf(0.08, 20)).toBeCloseTo(0.101852, 6);
  });
  it("CRF at 0 % = 1/n", () => {
    expect(crf(0, 20)).toBe(0.05);
  });
  it("annuity payment and factor", () => {
    expect(annuityPayment(1000, 0.1, 2)).toBeCloseTo(576.19, 2);
    expect(annuityFactor(0.08, 5)).toBeCloseTo(3.99271, 5);
  });
});

describe("LCOE", () => {
  it("no degradation/escalation: LCOE = (capex·CRF + opex)/E", () => {
    const i = { capex: 1000, opex: 20, energy: 2, rate: 0.08, years: 20 };
    expect(lcoe(i)).toBeCloseTo((1000 * crf(0.08, 20) + 20) / 2, 9);
  });
  it("degradation increases LCOE", () => {
    const base = { capex: 600, opex: 10, energy: 2, rate: 0.07, years: 25 };
    expect(lcoe({ ...base, degradation: 0.005 })).toBeGreaterThan(lcoe(base));
  });
  it("breakdown sums to total", () => {
    const b = lcoeBreakdown({ capex: 1000, opex: 20, energy: 2, rate: 0.08, years: 20 });
    expect(b.capex + b.opex).toBeCloseTo(b.total, 12);
    expect(b.opex).toBeCloseTo(10, 9);
  });
});

describe("levelized tariff", () => {
  it("no escalation → equals T0", () => {
    expect(levelizedTariff(25, 0, 0.07, 25)).toBeCloseTo(25, 12);
  });
  it("2-year hand calc", () => {
    // T0 = 10, e = 10 %, r = 10 %: (10/1.1 + 11/1.21)/(1/1.1 + 1/1.21) = (9.0909+9.0909)/(1.73554) = 10.476
    expect(levelizedTariff(10, 0.1, 0.1, 2)).toBeCloseTo(10.47619, 5);
  });
  it("with energy weights", () => {
    expect(levelizedTariff(10, 0, 0.1, 2, [1, 2])).toBeCloseTo(10, 12);
  });
});

describe("project finance", () => {
  const base = {
    capex: 1000,
    energy: 2000,
    tariff: 0.07,
    opex: 15,
    years: 25,
    gearing: 0.7,
    interest: 0.06,
    tenor: 18,
    discountRate: 0.07,
  };
  const r = projectFinance(base);
  it("sizes debt at gearing with annuity debt service", () => {
    expect(r.debt).toBe(700);
    expect(r.equity).toBe(300);
    expect(r.annualDebtService).toBeCloseTo(700 * crf(0.06, 18), 9);
    expect(r.rows[17].debtBalance).toBeCloseTo(0, 6);
    expect(r.rows[18].debtService).toBe(0);
  });
  it("CFADS = revenue − opex with no tax", () => {
    expect(r.rows[0].cfads).toBeCloseTo(2000 * 0.07 - 15, 9);
    expect(r.rows[0].dscr).toBeCloseTo(125 / r.annualDebtService, 9);
  });
  it("first-year interest and principal split", () => {
    expect(r.rows[0].interest).toBeCloseTo(42, 9);
    expect(r.rows[0].principal).toBeCloseTo(r.annualDebtService - 42, 9);
  });
  it("min/avg DSCR and IRRs consistent", () => {
    expect(r.minDscr).toBeCloseTo(125 / r.annualDebtService, 9); // flat CFADS
    expect(r.avgDscr).toBeCloseTo(r.minDscr, 9);
    expect(r.projectIrr).toBeCloseTo(irr([-1000, ...new Array(25).fill(125)]), 9);
    expect(r.equityIrr).toBeGreaterThan(r.projectIrr); // positive leverage
    expect(Math.abs(npv(r.equityIrr, r.equityCashFlows))).toBeLessThan(1e-6);
    expect(r.projectNpv).toBeCloseTo(npv(0.07, r.projectCashFlows), 9);
  });
  it("degradation lowers later CFADS; DSCR min at last debt year", () => {
    const d = projectFinance({ ...base, degradation: 0.005 });
    expect(d.rows[10].cfads).toBeLessThan(d.rows[0].cfads);
    expect(d.minDscr).toBeCloseTo(d.rows[17].dscr!, 9);
  });
  it("tax reduces CFADS", () => {
    const t = projectFinance({ ...base, taxRate: 0.15 });
    expect(t.rows[0].cfads).toBeLessThan(r.rows[0].cfads);
    expect(t.rows[0].tax).toBeCloseTo(0.15 * (140 - 15 - 42 - 40), 9);
  });
  it("debt capacity", () => {
    expect(debtCapacityAnnuity(130, 1.3, 0.06, 18)).toBeCloseTo(100 / crf(0.06, 18), 9);
  });
});

describe("bid evaluation", () => {
  it("ranks by combined score, financial score relative to lowest levelized", () => {
    const res = evaluateBids(
      [
        { name: "A", tariff: 13, escalation: 0, technical: 80 },
        { name: "B", tariff: 12, escalation: 0.02, technical: 90 },
        { name: "C", tariff: 14, escalation: 0, technical: 95 },
      ],
      0.07,
      25,
      0.8,
      70,
    );
    const a = res[0];
    const c = res[2];
    expect(a.levelized).toBeCloseTo(13, 9);
    expect(c.financialScore).toBeCloseTo((100 * Math.min(13, res[1].levelized)) / 14, 9);
    expect(res.map((r) => r.rank).sort()).toEqual([1, 2, 3]);
    const top = res.find((r) => r.rank === 1)!;
    expect(top.combined).toBe(Math.max(...res.map((r) => r.combined)));
  });
  it("disqualifies bids below the technical threshold", () => {
    const res = evaluateBids(
      [
        { name: "Cheap", tariff: 10, escalation: 0, technical: 50 },
        { name: "OK", tariff: 12, escalation: 0, technical: 80 },
      ],
      0.07,
      20,
      0.8,
      70,
    );
    expect(res[0].combined).toBe(0);
    expect(res[1].rank).toBe(1);
    expect(res[1].financialScore).toBeCloseTo(100, 9);
  });
});

describe("construction cash flow", () => {
  it("advance, recovery and retention", () => {
    const rows = constructionCashflow({
      contractValue: 100,
      milestones: [
        { month: 2, share: 0.5 },
        { month: 4, share: 0.5 },
      ],
      advancePct: 0.1,
      retentionPct: 0.1,
      retentionLimitPct: 0.05,
      completionMonth: 4,
      dnpMonths: 12,
    });
    expect(rows[0].net).toBe(10); // advance
    // month 2: gross 50, retention 5 (limit 5), recovery 5 → 40
    expect(rows[2].net).toBeCloseTo(40, 9);
    // month 4: gross 50, retention 0 (limit hit), recovery 5, release 2.5 → 47.5
    expect(rows[4].net).toBeCloseTo(47.5, 9);
    expect(rows[16].net).toBeCloseTo(2.5, 9);
    expect(rows[rows.length - 1].cumulativeNet).toBeCloseTo(100, 9);
    expect(rows[rows.length - 1].cumulativeGross).toBeCloseTo(100, 9);
  });
});
