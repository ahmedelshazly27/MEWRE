import { describe, expect, it } from "vitest";
import {
  abSampleSize, burnMultiple, classShare, compareSeedInstruments, demand, forecastPipeline, nrr, optimalPrice, ownership,
  postMoneySafeOwnership, pricedRound, runway, salesVelocity, totalShares, unitEconomics, type Holder,
} from "./founder";

const base: Holder[] = [
  { name: "Founders", cls: "founder", shares: 9_000_000 },
  { name: "Option pool", cls: "pool", shares: 1_000_000 },
];

describe("post-money SAFE conversion", () => {
  it("converts at the cap: 10 % before the A, diluted pro rata by the A", () => {
    // $1M at $10M post cap → 10 % of company capitalization; A: $5M on $20M pre, no pool top-up
    const r = pricedRound(base, { name: "Series A", preMoney: 20e6, raise: 5e6, poolTarget: 0 }, [{ name: "SAFE", amount: 1e6, cap: 10e6, type: "post" }]);
    expect(r.safes[0].at).toBe("cap");
    expect(r.safes[0].shares).toBeCloseTo(1_111_111.1, 0); // S = 10M / 0.9
    expect(r.safes[0].price).toBeCloseTo(0.9, 6); // 10M / 11.11M
    expect(r.pricePerShare).toBeCloseTo(1.8, 6); // 25M / 13.89M
    expect(ownership(r.holders, "SAFE")).toBeCloseTo(0.08, 6); // 10 % × (1 − 20 %)
    expect(ownership(r.holders, "Series A")).toBeCloseTo(0.2, 6);
    expect(ownership(r.holders, "Founders")).toBeCloseTo(0.648, 6);
  });

  it("the Series A pool top-up dilutes founders but not post-money SAFE holders", () => {
    const r = pricedRound(base, { name: "Series A", preMoney: 20e6, raise: 5e6, poolTarget: 0.1 }, [{ name: "SAFE", amount: 1e6, cap: 10e6, type: "post" }]);
    expect(totalShares(r.holders)).toBeCloseTo(14_444_444.4, 0); // (S − pool0) / (1 − 0.1 − 0.2)
    expect(r.poolIncrease).toBeCloseTo(444_444.4, 0);
    expect(r.safes[0].shares).toBeCloseTo(1_111_111.1, 0); // unchanged by the top-up
    expect(classShare(r.holders, "pool")).toBeCloseTo(0.1, 6);
    expect(ownership(r.holders, "Founders")).toBeCloseTo(9 / 14.4444444, 6);
  });

  it("converts at the discount when it beats the cap", () => {
    // S = 10M · 16/15; round price 20M / S = 1.875; discount price 1.5 < cap price 2.8125
    const r = pricedRound(base, { name: "Series A", preMoney: 20e6, raise: 5e6, poolTarget: 0 }, [{ name: "SAFE", amount: 1e6, cap: 30e6, discount: 0.2, type: "post" }]);
    expect(r.safes[0].at).toBe("discount");
    expect(r.pricePerShare).toBeCloseTo(1.875, 6);
    expect(r.safes[0].price).toBeCloseTo(1.5, 6);
    expect(r.safes[0].shares).toBeCloseTo(666_666.7, 0);
  });

  it("post-money SAFE ownership is amount / cap", () => {
    expect(postMoneySafeOwnership(500_000, 5_000_000)).toBe(0.1);
  });

  it("pre-money SAFEs cost founders more than post-money at the same cap number", () => {
    const rows = compareSeedInstruments({ founderShares: 9e6, pool0: 1e6, raise: 2e6, cap: 12e6, discount: 0, seriesA: { name: "Series A", preMoney: 30e6, raise: 8e6, poolTarget: 0.1 } });
    const by = Object.fromEntries(rows.map((r) => [r.label, r]));
    expect(by["Post-money SAFE"].afterSeed).toBeCloseTo(0.9 * (1 - 2 / 12), 6);
    expect(by["Pre-money SAFE"].afterSeed).toBeGreaterThan(by["Post-money SAFE"].afterSeed);
    for (const r of rows) expect(r.afterSeriesA).toBeLessThan(r.afterSeed);
  });
});

describe("unit economics and runway", () => {
  it("LTV, LTV/CAC and payback", () => {
    const u = unitEconomics({ arpa: 2000, grossMargin: 0.8, cac: 24_000, churn: 0.02 });
    expect(u.ltv).toBeCloseTo(80_000, 6);
    expect(u.ltvToCac).toBeCloseTo(3.3333, 3);
    expect(u.paybackMonths).toBeCloseTo(15, 6);
    expect(u.lifetimeMonths).toBeCloseTo(50, 6);
  });

  it("default alive when breakeven comes before the cash runs out", () => {
    // breakeven when 10k·1.1^m·0.8 ≥ 50k → m = 20; cash burned before = 1000k − 8k·(1.1^20 − 1)/0.1 ≈ 541.8k < 600k
    const r = runway({ cash: 600_000, opex: 50_000, revenue: 10_000, growth: 0.1, grossMargin: 0.8 });
    expect(r.breakevenMonth).toBe(20);
    expect(r.runwayMonths).toBeNull();
    expect(r.defaultAlive).toBe(true);
    expect(r.rows[20].cash).toBeCloseTo(600_000 - (1_000_000 - 80_000 * (Math.pow(1.1, 20) - 1)), 0);
  });

  it("default dead with slow growth: runway = cash / burn", () => {
    const r = runway({ cash: 420_000, opex: 50_000, revenue: 10_000, growth: 0, grossMargin: 0.8 });
    expect(r.runwayMonths).toBe(11); // 42k/month → negative after month 11 (10 × 42k = 420k exactly at month 10)
    expect(r.defaultAlive).toBe(false);
  });

  it("burn multiple and NRR", () => {
    expect(burnMultiple(1_500_000, 1_000_000)).toBe(1.5);
    expect(nrr(1_000_000, 250_000, 50_000, 100_000)).toBeCloseTo(1.1, 9);
  });
});

describe("pricing", () => {
  it("Lerner rule: p* = c·e/(e − 1)", () => {
    expect(optimalPrice(40, 2)).toBe(80);
    expect(optimalPrice(40, 0.8)).toBe(Infinity);
  });
  it("constant elasticity: a 10 % price rise cuts volume by about e × 10 %", () => {
    expect(demand(110, 100, 1000, 2)).toBeCloseTo(1000 * Math.pow(1.1, -2), 6);
  });
  it("A/B sample size for 5 % → 6 % conversion is about 8,155 per arm", () => {
    const n = abSampleSize(0.05, 0.06);
    expect(n).toBeGreaterThan(8100);
    expect(n).toBeLessThan(8200);
  });
});

describe("pipeline", () => {
  it("weighted pipeline, coverage and quarter of close", () => {
    const f = forecastPipeline(
      [
        { name: "Discovery", deals: 10, value: 50_000, probability: 0.1, monthsToClose: 6 },
        { name: "Pilot", deals: 4, value: 50_000, probability: 0.5, monthsToClose: 2 },
      ],
      200_000,
    );
    expect(f.unweighted).toBe(700_000);
    expect(f.weighted).toBe(150_000);
    expect(f.coverage).toBe(3.5);
    expect(f.byQuarter[0]).toBe(100_000);
    expect(f.byQuarter[2]).toBe(50_000);
  });
  it("sales velocity", () => {
    expect(salesVelocity(20, 0.25, 60_000, 120)).toBe(2500);
  });
});
