/** Suhail calculators: event P&L with sponsorship, community growth funnel. Pure functions. */

export interface SponsorTier {
  name: string;
  price: number;
  count: number;
  /** Cost to deliver the tier's benefits (booth, branding, dinner seats), per sponsor. */
  fulfilment?: number;
}

export interface EventInput {
  attendees: number;
  /** Share of attendees paying a ticket. */
  paidShare: number;
  ticketPrice: number;
  sponsors: SponsorTier[];
  venue: number;
  /** Catering and swag per attendee. */
  perHead: number;
  prizes: number;
  production: number;
  marketing: number;
  /** Contingency as a fraction of costs. */
  contingency: number;
}

export interface EventResult {
  ticketRevenue: number;
  sponsorRevenue: number;
  revenue: number;
  costs: number;
  profit: number;
  costPerAttendee: number;
  /** Share of revenue from sponsors. */
  sponsorShare: number;
  /** Extra revenue needed to break even (0 if profitable). */
  gap: number;
}

export function eventPnl(i: EventInput): EventResult {
  const ticketRevenue = i.attendees * i.paidShare * i.ticketPrice;
  const sponsorRevenue = i.sponsors.reduce((s, t) => s + t.price * t.count, 0);
  const fulfilment = i.sponsors.reduce((s, t) => s + (t.fulfilment ?? 0) * t.count, 0);
  const base = i.venue + i.perHead * i.attendees + i.prizes + i.production + i.marketing + fulfilment;
  const costs = base * (1 + i.contingency);
  const revenue = ticketRevenue + sponsorRevenue;
  const profit = revenue - costs;
  return {
    ticketRevenue,
    sponsorRevenue,
    revenue,
    costs,
    profit,
    costPerAttendee: i.attendees > 0 ? costs / i.attendees : 0,
    sponsorShare: revenue > 0 ? sponsorRevenue / revenue : 0,
    gap: Math.max(0, -profit),
  };
}

export interface FunnelInput {
  /** People reached per month (newsletter shares, posts, events). */
  reach: number;
  /** Reached → member (signup) conversion. */
  conversion: number;
  /** Monthly retention of active members (fraction still active next month). */
  retention: number;
  /** New members each active member brings per month (viral coefficient per month). */
  referral: number;
  /** Share of active members who contribute (speak, build, organise). */
  contributorShare: number;
  months: number;
  start?: number;
}

export interface FunnelResult {
  rows: { month: number; active: number; newMembers: number; contributors: number }[];
  /** Long-run active members if referral < 1 − retention: reach·conversion / (1 − retention − referral). */
  steadyState: number;
}

/** Active_t = retention · Active_{t−1} + reach · conversion + referral · Active_{t−1}. */
export function communityFunnel(i: FunnelInput): FunnelResult {
  const rows: FunnelResult["rows"] = [];
  let active = i.start ?? 0;
  for (let m = 1; m <= i.months; m++) {
    const newMembers = i.reach * i.conversion + i.referral * active;
    active = i.retention * active + newMembers;
    rows.push({ month: m, active, newMembers, contributors: active * i.contributorShare });
  }
  const denom = 1 - i.retention - i.referral;
  return { rows, steadyState: denom > 0 ? (i.reach * i.conversion) / denom : Infinity };
}
