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

const cheatSheet = md`# M0 Kuwait Energy Landscape: cheat sheet

**Rate assumed:** 1 KWD ≈ 3.25 USD; 1 KWD = 1,000 fils. **Confidence:** H = official/signed; M = trade press / secondary; L = single weak source. Re-verify M/L items before using them in official documents.

## System (l01)
| Item | Value | Conf. |
|---|---|---|
| Peak 2024 / 2025 / 2026 (MEWRE) | 17,640 / 17,610 / **17,540 MW** | M-H |
| Record monthly peak (MEES) | 17.71 GW, Jul 2025 (basis differs) | M |
| Jun 2025 peak vs available | 16.98 vs 16.275 GW (RM ≈ −4.2%) | M |
| Installed / reliably available / gas | ~21 / ~17 / ~14 GW (Rystad) | M |
| New connections | ~1 GW/yr (1,059 and 1,019 MW) | M |
| Mix | ~62% gas, ~36% oil, ~2% RE | M-L |
| LNG imports Jan–Aug 2025 | 5.2 Mt | M-H |
| GCCIA | 500 MW deal (2024); KWD 161.381 m approved Jun–Dec 2025 | M |
| Planned additions | 14.05 GW by 2031 | M |

Cuts: Jun 2024 (300 MW Az-Zour South trip), Aug 2024 (gas), Apr 2025 (heat + maintenance), May 2025 (>1.5 GW short).

## Formulas
$RM = (C_{avail} - P_{peak})/P_{peak}$ · $LF = E/(P_{peak}\cdot 8760)$ · $\eta = 3600/HR$ · $N_{bbl} = E\cdot HR/6.12$ GJ · $s = c - t$ · $v = HR \cdot p_{fuel}$ · $E = P \cdot CF \cdot 8760$ · $P_{RE} = \sigma E_{tot}/(CF \cdot 8760)$ · $E[T] = \sum t_i/(1-p_i)$ · $C_d = \Delta t\, P\, CF\, 24\,(v-T)$ · $PV = A[1-(1+r)^{-N}]/r$

## Institutions (l02)
| Body | Basis | Role |
|---|---|---|
| MEWRE | est. 1962 | Policy, grid, offtaker (30-yr PPA; 25-yr ECWPA), grid tenders |
| KAPP | Law 116/2014; Decree 78/2015 | PPP procurer, IWPP shareholder (60%) |
| Higher Committee | chaired by Minister of Finance | Approves project, stages, investor |
| CAPT | Law 49/2016; Law 94/2026 | Tenders > KD 75k; direct contracting ≤ KD 1 m/FY from ~Dec 2026 |
| Audit Bureau | Law 30/1964 | Prior review (≥ KD 100k reported, verify) |
| Fatwa & Legislation | — | Legal review of terms |
| KISR | — | Shagaya Ph I; resource stations |
| SCPD | — | Vision 2035, development plan |
| National Assembly | suspended 10 May 2024 | Laws by decree-law |

IPP chain: request → feasibility → HC → RFQ → RFP (tech, then fin.) → preferred bidder → HC → Audit Bureau → PPA → financial close.

## Tariffs & economics (l03)
Citizens **2 fils/kWh** (since 1966) · apartments 5/10/15 fils (2016 law, from 22 Aug 2017) · commercial 5 · industrial/agri 3 · KPC ~25. Cost of supply 14–38 fils (no official current figure). Displaced crude (USD 70/bbl, 10.5 MJ/kWh) ≈ 37 fils/kWh; LNG (USD 12/MMBtu, 7.5 MJ/kWh) ≈ 26 fils/kWh; solar est. 7–8 fils. KPC tariff = transfer, not national saving.

## Targets & pipeline (l04)
15% RE by 2030 (official); 30/40/50% by 2030/40/50 (stated). Net zero **2060** national, **2050** oil & gas. NDC −7.4% vs 2035 BAU. Rystad: ~3.3 GW (~7%) by 2030.

| Project | Status | Conf. |
|---|---|---|
| Shagaya Ph I 70 MW (50 CSP + 10 PV + 10 wind) | Operating since 2017–19; CSP data after 2019 unknown | H/L |
| Zone 1 1,100 MW PV | Masdar + Fouad AlGhanim reported selected ~Aug 2026; tariff unknown | M |
| Zone 2 500 MW PV | Bids 26 Jul 2026 (2 or 3) | M |
| China G2G Ph 3–4 | NEA framework 17 Mar 2025; SPIC; 4.8 GW claimed | L-M |
| 400 kV Shagaya–Al-Wafra | Power Grid Co., KD 48.6 m, Mar 2026 | M |
| AZN 2&3 IWPP | ECWPA 3 Feb 2026; ACWA + GIC 40% / KAPP 60% | H |
| Al-Khairan Ph 1 IWPP 1,800 MW | 2 bids 1 Jun 2026 | H |
| BESS 1–1.5 GW / 4–6 GWh | First 500 MW summer 2027 | M-L |

## Funding (l05)
FY 1 Apr–31 Mar · FY26/27 draft: spend KD 26.1 bn, revenue 16.3 bn, capex 3.1 bn · Routes: EPC (CAPT, state capex) / PPP (KAPP, PPA) / G2G · PPP shares: 50% IPO, 6–24% public, ≥26% private (verify) · Benchmarks: Zone 1 RFQ→selection ~31 mo; AZN 2&3 LA→ECWPA ~6 mo; Al-Khairan RFP→bids 9 mo; 400 kV bid→award ~11 mo · 1.1 GW delay ≈ KWD 191k/day.

## PM checklist
Label every number (source, date, basis) · MWac at peak, not MWp · grid outages Nov–Mar · budget request in the right FY · complete files (reduce p) · tiered capacity status · never call G2G "contracted" without a signed agreement.
`;

const mod: Module = {
  id: "m00",
  number: 0,
  title: "Kuwait Energy Landscape",
  titleAr: "مشهد الطاقة في الكويت",
  summary:
    "Kuwait's power system as a MEWRE PM must know it: a 17.5 GW air-conditioning peak against ~17 GW of reliably available capacity, the institutions and approval chains that pace every project, the 2-fils tariff and the fuel economics that make solar a fiscal win, the targets and the Shagaya/IPP pipeline with honest confidence levels, and how projects are funded and approved.",
  whyItMatters:
    "Every decision you make as a MEWRE renewable PM — what to put in a cabinet memo, how to schedule a grid tie-in, which approval to chase, how to justify a delay or a budget line — depends on knowing the system's numbers, who holds each gate, and which facts are confirmed versus reported. This module is the map you will use every day, and it trains the habit of sourcing and confidence-labelling every Kuwait-specific claim.",
  competencies: ["context", "finance", "procurement", "delivery"],
  prerequisites: [],
  estimatedHours: 8,
  lessons: [l01, l02, l03, l04, l05],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
