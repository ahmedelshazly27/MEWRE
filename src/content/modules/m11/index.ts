import { md, type Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import references from "./references";
import formulas from "./formulas";
import glossary from "./glossary";
import exam from "./exam";

const cheatSheet = md`# M11 Public Procurement in Kuwait: cheat sheet

**Confidence:** medium — law-firm and secondary sources. Verify article numbers in the Arabic text (the Arabic version prevails). Rate assumed: 1 KWD ≈ 3.25 USD.

## 1. Legal stack (l01)

| Instrument | Key content | Note |
|---|---|---|
| Tenders Law **49/2016** | CAPT oversees tenders > **KD 75,000** (Art. 19); final guarantee ≥ 10% (Art. 65) | Art. 65 reported |
| Law **74/2019** | Defines national product (1982 GCC agreement); price preference 10/15/20% | Rate unverified |
| Law **1/2024** | Art. 31: registered foreign firms may bid without a local agent | |
| Law **94/2026** | Gazette issue 1810, **27 Sep 2026**; effective +3 months (~27 Dec 2026) | See section 2 |
| PPP Law **116/2014** + Decree **78/2015** | KAPP (attached to MoF); Higher Committee chaired by the Minister of Finance | |
| Law **30/1964** | Audit Bureau prior review (Arts. 13–14) | Threshold reported ≥ KD 100,000 |
| Law 39/2010 | IWPP joint-stock companies | Legacy |

## 2. Law 94/2026 at a glance

- **Direct contracting:** up to **KD 1 m per FY** for the same items, without CAPT approval.
- **KPC:** under CAPT only above KD 20 m.
- **Agents:** banned in public procurement.
- **Local products:** ≥ 30% from the Industrial Guide.
- **Local subcontracting:** ≥ 30% of works.
- **SMEs:** 10% price margin, not combinable with Art. 62 product priority.
- **Anti-splitting:** aggregate all orders for the same item in the FY:

$$\sum_{FY,\ same\ item} V_j \le L$$

## 3. Methods and evaluation (l02)

- **Public tender** — default, open to all registered bidders.
- **Limited tender** — invited, prequalified bidders.
- **Practice** (ممارسة) — negotiation with a few suppliers.
- **Direct order** — below the direct-contracting limit or justified exceptions.
- **CAPT default award:** lowest technically compliant price.
- **KAPP:** two-envelope — technical first, then financial.
- **Clarifications:** in writing, to all bidders, no change to price or substance.

| Quantity | Formula | Where |
|---|---|---|
| Financial score | $S_F = 100 P_{min}/P_i$ | QCBS |
| Combined score | $S = w_T S_T + w_F S_F$ | QCBS (consultancy) |
| Levelized tariff | $T_{lev} = \sum T_t E_t (1+r)^{-t} / \sum E_t (1+r)^{-t}$ | IPP bids |
| Guarantee | $G = \beta P$ | Bid bond / final guarantee |

- **Levelized example (7%, 30 yr):** 3.90 fils escalating 1.5%/yr → 4.54 fils, above a flat 4.20.
- **QCBS weights:** 70/30 vs 80/20 can flip the winner — fix weights before opening.

## 4. KAPP PPP (l03)

**Stages:** request → feasibility → Higher Committee → RFQ → RFP (technical → financial) → preferred bidder → Higher Committee → Audit Bureau → PPA → financial close. Fatwa reviews legal terms (stage unconfirmed).

| Item | Value | Note |
|---|---|---|
| Shares, projects > KD 60 m | **50% IPO / 6–24% public / ≥ 26% private** | Legal guide |
| IWPP practice | 40% developer / 60% KAPP | |
| AZN 1 private shares | ENGIE 17.5%, Sumitomo 17.5%, Al-Sagar 5% | 40-yr ECWPA; IPO 2019 oversubscribed |
| AZN 2&3 | ACWA + GIC 40% | ECWPA 3 Feb 2026 |
| Solar IPPs | 30-yr PPA with MEWRE | |

- **PPA payment:** $R = T(E_{del} + E_{deemed})$
- **Unknown:** PPA currency, government guarantees, termination regime (verify).

| Project | Milestones |
|---|---|
| Zone 1 (1,100 MW) | RFQ Jan 2024 → RFP ~Jun 2025 → bids 15 Jan 2026 → financial opening ~Jul 2026 → Masdar + Fouad AlGhanim reported ~Aug 2026 |
| Zone 2 (500 MW) | RFQ May 2025 → RFP 16 Nov 2025 → bids 26 Jul 2026 (2 or 3 bids reported) |

## 5. Oversight and local content (l04)

- **Audit Bureau outcomes:** approve, reject or **conditional** (GCCIA 2025: KWD 161.381 m).
- **Contracting without approval:** a violation — 28 cases worth KD 63 m.
- **Preference test:** $P_{nat} \le (1+\pi)P_{min}$ — rate unverified.
- **Local content:** $LC = V_{local}/V_{base} \ge 30\%$ — define the denominator in the contract.
- **Offset:** 35%/30% on contracts ≥ KD 10 m, 6% guarantee; suspended 2014 — current status unverified.
- **KDIPA:** up to 100% foreign ownership; tax holiday ≤ 10 years.
- **Zone 2 customs:** exemption ≤ 10% for 10 years (reported).

## 6. Delays (l05)

### Evidence

- **Zone 1 bid deadline:** Sep 2025 → Jan 2026.
- **Al-Khairan:** 3 deadline extensions.
- **Zone 1 award:** June → Q3 2026.
- **Cancelled:** Dibdibah and Abdaliya.
- **400 kV line:** ~11 months from bids to award (not to the lowest bidder).

### PERT for approval chains

| Quantity | Formula | Where |
|---|---|---|
| Expected duration | $t_e = (a+4m+b)/6$ | Each step |
| Standard deviation | $\sigma = (b-a)/6$ | Each step |
| P80 of chain | $P80 \approx \sum t_e + 0.84\sqrt{\sum\sigma^2}$ | Whole chain |

Attack the step with the biggest variance first.

### Lawful moves

- Approval calendar mapped at the start of the year.
- Pre-cleared files.
- Parallel preparation of the next gate.
- Standard documents.
- Bankability settled before the RFP.
- Bid-validity management.
- Escalation with KWD/day delay cost.
- Referral register.
- Good Arabic in official letters.
- Never start before approval.
`;

const mod: Module = {
  id: "m11",
  number: 11,
  title: "Public Procurement in Kuwait",
  titleAr: "المناقصات العامة في الكويت",
  summary:
    "How Kuwaiti public procurement actually works for a MEWRE renewables PM: the Public Tenders Law 49/2016 and its 2019, 2024 and 2026 amendments, CAPT and direct-contracting thresholds, tender process and bid evaluation (lowest compliant, two-envelope, QCBS, levelized tariff), PPP procurement through KAPP with Kuwait's IPO shareholding model, Audit Bureau and Fatwa oversight, local content and agents, and the practical craft of navigating delays.",
  whyItMatters:
    "Most of the time between a MEWRE decision to build and the first kWh is procurement and approvals, not construction. As offtaker PM on KAPP IPPs and as owner of MEWRE's own grid, consultancy and O&M contracts, you must route each purchase correctly, run or contribute to defensible evaluations, assemble files that pass the Audit Bureau first time, apply the new Law 94/2026 rules, and keep the approval chain moving — lawfully — when every week of delay costs the state over a million KWD in fuel.",
  competencies: ["procurement", "context", "contracts", "delivery"],
  prerequisites: ["m00"],
  estimatedHours: 8,
  lessons: [l01, l02, l03, l04, l05],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
