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

**Confidence:** M = law-firm / secondary source; verify article numbers in the Arabic text (Arabic prevails). 1 KWD ≈ 3.25 USD.

## Legal stack (l01)
| Instrument | Key content |
|---|---|
| Tenders Law **49/2016** | CAPT oversees tenders > **KD 75,000** (Art. 19); final guarantee ≥ 10% (Art. 65, reported) |
| Law **74/2019** | National product definition (GCC 1982 agreement); preference rate 10/15/20% — **unverified** |
| Law **1/2024** | Art. 31: registered foreign firms may bid without a local agent |
| Law **94/2026** | Gazette issue 1810, **27 Sep 2026**, effective +3 months (~27 Dec 2026): direct contracting ≤ **KD 1 m per FY** (same items); KPC under CAPT only > KD 20 m; **agents banned**; ≥30% Industrial Guide products; ≥30% local subcontracting; SME 10% margin (not with Art. 62) |
| PPP Law **116/2014** + Decree **78/2015** | KAPP (attached to MoF); Higher Committee chaired by Minister of Finance |
| Law **30/1964** | Audit Bureau prior review (Arts. 13–14), reported ≥ KD 100,000 |
| Law 39/2010 | IWPP joint-stock companies (legacy) |

Anti-splitting: $\sum_{FY,\ same\ item} V_j \le L$.

## Methods (l02)
Public tender · limited tender · practice (ممارسة) · direct order. CAPT default = lowest technically compliant price. KAPP = two-envelope (technical, then financial).
$S_F = 100 P_{min}/P_i$ · $S = w_T S_T + w_F S_F$ · $T_{lev} = \sum T_t E_t (1+r)^{-t} / \sum E_t (1+r)^{-t}$ · $G = \beta P$.
Example (7%, 30 yr): 3.90 fils +1.5%/yr → 4.54 > flat 4.20. QCBS 70/30 vs 80/20 can flip winners — fix weights before opening.
Clarifications: written, to all, no change to price/substance.

## KAPP PPP (l03)
Request → feasibility → HC → RFQ → RFP (tech → fin.) → preferred bidder → HC → Audit Bureau → PPA → financial close (Fatwa reviews legal terms; stage unconfirmed).
Shares (> KD 60 m, legal guide): **50% IPO / 6–24% public / ≥26% private**; IWPP practice 40% developer / 60% KAPP. AZN 1: ENGIE 17.5, Sumitomo 17.5, Al-Sagar 5; 40-yr ECWPA; IPO 2019 oversubscribed. AZN 2&3: ACWA + GIC 40%, ECWPA 3 Feb 2026. Solar: 30-yr PPA with MEWRE.
$R = T(E_{del} + E_{deemed})$. Unknown: PPA currency, guarantees, termination regime.

| Zone 1 (1,100 MW) | RFQ Jan 2024 → RFP ~Jun 2025 → bids 15 Jan 2026 → fin. ~Jul 2026 → Masdar + Fouad AlGhanim reported ~Aug 2026 |
|---|---|
| Zone 2 (500 MW) | RFQ May 2025 → RFP 16 Nov 2025 → bids 26 Jul 2026 (2 or 3) |

## Oversight & local content (l04)
Audit Bureau: approve / reject / **conditional** (GCCIA 2025: KWD 161.381 m). Contracting without approval = violation (28 cases, KD 63 m). Preference test $P_{nat} \le (1+\pi)P_{min}$ — rate unverified. Local content $LC = V_{local}/V_{base} \ge 30\%$ — define denominator. Offset (35%/30%, ≥ KD 10 m, 6% guarantee) suspended 2014 — status unverified. KDIPA: up to 100% foreign ownership; tax holiday ≤ 10 yrs. Zone 2: customs exemption ≤ 10% for 10 yrs (reported).

## Delays (l05)
Evidence: Zone 1 deadline Sep 2025 → Jan 2026; Al-Khairan 3 extensions; Zone 1 award June → Q3 2026; Dibdibah and Abdaliya cancelled; 400 kV ~11 months bid → award (not lowest).
$t_e = (a+4m+b)/6$, $\sigma = (b-a)/6$, $P80 \approx \sum t_e + 0.84\sqrt{\sum\sigma^2}$ — attack the biggest variance.
Moves: approval calendar · pre-cleared files · parallel preparation · standard documents · bankability before RFP · bid-validity management · escalate with KWD/day · referral register · good Arabic · never start before approval.
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
