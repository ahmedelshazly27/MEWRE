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

- **Exchange rate assumed:** 1 KWD ≈ 3.25 USD; 1 KWD = 1,000 fils
- **Confidence labels:** H = official/signed; M = trade press / secondary; L = single weak source
- **Rule:** re-verify M/L items before using them in official documents

## System: demand, capacity, fuel (l01)

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

### Power cuts

- **Jun 2024:** 300 MW Az-Zour South trip
- **Aug 2024:** gas supply
- **Apr 2025:** heat + maintenance
- **May 2025:** more than 1.5 GW short

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Reserve margin | $RM = (C_{avail} - P_{peak})/P_{peak}$ | l01 |
| Load factor | $LF = E/(P_{peak}\cdot 8760)$ | l01 |
| Efficiency from heat rate | $\eta = 3600/HR$ | l01 |
| Barrels burned | $N_{bbl} = E\cdot HR/6.12$ (GJ) | l01 |
| Expected approval time with rework | $E[T] = \sum t_i/(1-p_i)$ | l02 |
| Unit subsidy | $s = c - t$ | l03 |
| Value of displaced fuel | $v = HR \cdot p_{fuel}$ | l03 |
| Annual energy | $E = P \cdot CF \cdot 8760$ | l03 |
| Capacity for an RE share | $P_{RE} = \sigma E_{tot}/(CF \cdot 8760)$ | l04 |
| Cost of delay | $C_d = \Delta t\, P\, CF\, 24\,(v-T)$ | l05 |
| Present value of an annuity | $PV = A[1-(1+r)^{-N}]/r$ | l05 |

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

### IPP approval chain

1. Request (MEWRE)
2. Feasibility (KAPP)
3. Higher Committee
4. RFQ
5. RFP (technical, then financial)
6. Preferred bidder
7. Higher Committee
8. Audit Bureau
9. PPA
10. Financial close

## Tariffs and economics (l03)

| Customer / item | Value | Note |
|---|---|---|
| Citizens (private housing) | **2 fils/kWh** | Since 1966 |
| Apartments | 5 / 10 / 15 fils/kWh | 2016 law, applied from 22 Aug 2017 |
| Commercial | 5 fils/kWh | |
| Industrial / agricultural | 3 fils/kWh | |
| KPC | ~25 fils/kWh | A transfer, not a national saving |
| Cost of supply | 14–38 fils/kWh | No official current figure |
| Displaced crude | ≈ 37 fils/kWh | USD 70/bbl, 10.5 MJ/kWh |
| Displaced LNG | ≈ 26 fils/kWh | USD 12/MMBtu, 7.5 MJ/kWh |
| Solar (analyst estimate) | 7–8 fils/kWh | Zone 1 tariff not reported |

## Targets and pipeline (l04)

### Targets

- **RE share, official:** 15% by 2030
- **RE share, stated (MEWRE):** 30% / 40% / 50% by 2030 / 2040 / 2050
- **Net zero:** **2060** national; **2050** oil and gas sector
- **NDC:** −7.4% vs 2035 BAU
- **Rystad forecast:** ~3.3 GW (~7%) by 2030

### Pipeline

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

## Funding and approvals (l05)

- **Fiscal year:** 1 April – 31 March
- **FY26/27 draft budget:** spending KD 26.1 bn, revenue KD 16.3 bn, capex KD 3.1 bn
- **Delivery routes:** EPC (CAPT, state capex); PPP (KAPP, PPA); G2G
- **PPP shareholding:** 50% IPO, 6–24% public, ≥26% private (verify)
- **Cost of delay:** 1.1 GW plant ≈ KWD 191k/day

| Benchmark | Elapsed |
|---|---|
| Zone 1 RFQ → reported selection | ~31 months |
| AZN 2&3 letter agreement → ECWPA | ~6 months |
| Al-Khairan RFP → bids | 9 months |
| 400 kV line bid → award | ~11 months |

## PM checklist

- **Every number labelled:** source, date and basis
- **Capacity at peak:** quote MWac at the peak hour, not MWp
- **Grid outages:** schedule November–March
- **Budget:** submit the request in the right fiscal year
- **Files:** submit complete files to reduce the return probability p
- **Pipeline status:** give tiered capacity status
- **G2G:** never call it "contracted" without a signed agreement
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
