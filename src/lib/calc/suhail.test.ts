import { describe, expect, it } from "vitest";
import { communityFunnel, eventPnl } from "./suhail";

describe("event P&L", () => {
  it("revenue, costs with contingency, profit and sponsor share", () => {
    const r = eventPnl({
      attendees: 200,
      paidShare: 0.5,
      ticketPrice: 20,
      sponsors: [
        { name: "Gold", price: 10_000, count: 2, fulfilment: 1_000 },
        { name: "Silver", price: 4_000, count: 3 },
      ],
      venue: 8_000,
      perHead: 40,
      prizes: 10_000,
      production: 6_000,
      marketing: 2_000,
      contingency: 0.1,
    });
    expect(r.ticketRevenue).toBe(2_000);
    expect(r.sponsorRevenue).toBe(32_000);
    expect(r.costs).toBeCloseTo((8_000 + 8_000 + 10_000 + 6_000 + 2_000 + 2_000) * 1.1, 9); // 39,600
    expect(r.profit).toBeCloseTo(34_000 - 39_600, 9);
    expect(r.gap).toBeCloseTo(5_600, 9);
    expect(r.sponsorShare).toBeCloseTo(32 / 34, 9);
  });
});

describe("community funnel", () => {
  it("converges to reach·conversion / (1 − retention − referral)", () => {
    const r = communityFunnel({ reach: 10_000, conversion: 0.02, retention: 0.85, referral: 0.05, contributorShare: 0.1, months: 120 });
    expect(r.steadyState).toBeCloseTo(200 / 0.1, 6); // 2,000
    expect(r.rows[119].active).toBeCloseTo(2_000, 0);
    expect(r.rows[0].active).toBe(200);
    expect(r.rows[1].active).toBeCloseTo(0.85 * 200 + 200 + 0.05 * 200, 9);
  });
  it("grows without bound when referral outpaces churn", () => {
    expect(communityFunnel({ reach: 100, conversion: 0.1, retention: 0.9, referral: 0.15, contributorShare: 0.1, months: 12 }).steadyState).toBe(Infinity);
  });
});
