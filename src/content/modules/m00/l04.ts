import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m00-l04",
  title: "Targets and the Project Pipeline",
  summary:
    "Kuwait's renewable targets (15% by 2030, the updated 30/40/50% path, net zero 2060) against delivery reality, and a status-and-confidence register of every project a MEWRE PM must know: Shagaya Phase I, Phase III Zones 1 and 2, the China G2G track, Dibdibah's history, Az-Zour North 2&3, Al-Khairan, Nuwaiseeb, KOC/KPC solar and the planned BESS.",
  minutes: 85,
  objectives: [
    "You can state each national target with its source and status, and explain why the 2050 and 2060 dates are often confused.",
    "You can convert an energy-share target into required renewable capacity and test pipeline claims against it.",
    "You can summarise Shagaya Phase I's configuration and reported performance, and spot internal inconsistencies in published figures.",
    "You can give the status, date and confidence level of each pipeline project as of October 2026 — and say exactly what is unverified.",
  ],
  concepts: [
    { id: "m00.re-targets", name: "Renewable and climate targets", description: "15% RE by 2030 (2012); updated 30/40/50% by 2030/2040/2050 (MEWRE official, 2025); carbon neutrality 2060 and oil-and-gas net zero 2050 (COP27); NDC 7.4% below 2035 BAU.", competency: "context", related: ["m00.target-to-capacity"] },
    { id: "m00.target-to-capacity", name: "From energy share to capacity", description: "Required RE capacity = share × total energy / (CF × 8760); used to test whether a pipeline meets a target.", competency: "engineering", related: ["m00.re-targets", "m00.shagaya-phase3", "m01.capacity-factor", "m01.energy-vs-power"] },
    { id: "m00.shagaya-phase1", name: "Shagaya Phase I (KISR pilot)", description: "70 MW: 50 MW parabolic-trough CSP with 10 h molten-salt storage, 10 MW PV, 10 MW wind; wind CF ~42–45%; CSP post-2019 performance unpublished.", competency: "solar", related: ["m00.shagaya-phase3", "m03.shagaya-csp", "m04.shagaya-wind"] },
    { id: "m00.shagaya-phase3", name: "Shagaya Phase III (KAPP IPPs) and the G2G track", description: "Zone 1 1,100 MW (preferred bidder reported Aug 2026), Zone 2 500 MW (bids July 2026), plus a China NEA/SPIC government-to-government track for Phases 3–4 whose relation to the zones is unclear.", competency: "context", related: ["m00.pipeline-confidence", "m11.kapp-stages", "m02.kuwait-solar-resource"] },
    { id: "m00.pipeline-confidence", name: "Status-and-confidence register", description: "Recording each project's last confirmed milestone, date, source and confidence, separating official facts from trade-press reports.", competency: "delivery", related: ["m00.shagaya-phase3", "m08.risk-register"] },
  ],
  sections: [
    // ------------------------------------------------------------------ THEORY
    {
      layer: "theory",
      title: "Targets and what they imply",
      blocks: [
        {
          kind: "md",
          md: md`## The target stack

| Target | Value | Origin / status |
|---|---|---|
| Legacy RE target | **15% of electricity by 2030** | Set in 2012; still widely cited |
| Updated RE path | **30% by 2030, 40% by 2040, 50% by 2050** | Stated by MEWRE official Ahmad Al-Dousari (interview, 2025); 50% by 2050 also cited by the minister |
| 2030–2050 strategy | Unveiled **7 March 2024** by Minister Al-Hajraf; "~22 GW by the end of the decade" reported | 22 GW by 2030 is implausible against a 17.5 GW peak; may refer to 2050 |
| "First phase" | ~**3.2 GW** renewables by 2030 | Gulf Construction Online |
| National climate | **Carbon neutrality by 2060** | Announced at COP27, November 2022 |
| Oil and gas sector | **Net zero by 2050** (KPC Scope 1 and 2 also 2050) | COP27; KPC sustainability report |
| NDC (Oct 2021) | Avoid **7.4% of 2035 BAU emissions** (unconditional) | Updated NDC |
| Oil-sector masterplan | 17 GW RE + 25 GW green hydrogen by 2050 | KOC/KBR study — **not** an official national target |

**The 2050/2060 confusion:** many outlets write "Kuwait net zero 2050". The national pledge is **2060**; 2050 is the oil and gas sector. Get this right in any speech or memo.`,
        },
        { kind: "sources", refs: ["m00-theenergyyear-2025", "m00-pvmag-2025-09-rystad", "m00-arabnews-2025-03", "m00-agbi-2024-03-strategy", "m00-gco-3-2gw", "m00-knowesg-2022-netzero", "m00-enerdata-2022-netzero", "m00-ndc-2021", "m00-enerdata-koc-kbr", "m00-kt-2060"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "Which target is official?",
          md: md`**Claimed:** an updated path of 30/40/50% (MEWRE official, 2025) and ~22 GW in the March 2024 strategy. **Unknown:** whether the 30%-by-2030 figure has been formally adopted by the Council of Ministers, and what the 22 GW refers to (likely 2050). **How to verify:** obtain the strategy document from the ministry's renewable-energy sector or planning department; check for a cabinet decision in Kuwait Al-Youm. Until then, quote "15% by 2030 (official since 2012); updated ambitions of 30/40/50% stated by MEWRE".`,
        },
        {
          kind: "md",
          md: md`## From a share target to megawatts

An energy-share target $\sigma$ applies to annual energy, not capacity:`,
        },
        { kind: "equation", formula: "m00-re-share" },
        { kind: "md", md: md`Rearranging with $E = P \cdot CF \cdot 8760$ gives the renewable capacity required:` },
        { kind: "equation", formula: "m00-capacity-for-share" },
        {
          kind: "md",
          md: md`With the illustrative 84 TWh/yr (lesson 1) and a PV capacity factor of 25% (AC basis, single-axis tracking in Kuwait's resource — illustrative), 15% needs about **5.8 GW** of PV; 30% needs about **11.5 GW**. Demand growing ~3%/yr pushes the 2030 figure for 15% to roughly 6.5 GW. Against this, Kuwait had about **102 MW** of solar at end-2024 (MEWRE; IRENA ~114 MW total RE; Rystad ~50 MW solar — scopes differ). **Rystad forecasts ~3.3 GW of RE by 2030 (≈7% of generation) and ~11 GW by 2035**, expecting the 15% target to be reached around 2035.

PV-heavy targets also create an operational problem: midday PV can exceed what the system can absorb on winter days with low load, which is another reason the BESS programme matters.`,
        },
        { kind: "sources", refs: ["m00-theenergyyear-2025", "m00-pvmag-2025-09-rystad", "m00-sq-2025-09-rystad"] },
        { kind: "widget", widget: "kuwait-climate", props: { metric: "ghi" }, caption: "Indicative monthly GHI and temperature at Shagaya. High summer irradiance coincides with the highest temperatures — good for energy, bad for module efficiency." },
        {
          kind: "callout",
          tone: "unverified",
          title: "Solar resource figures",
          md: md`**Claimed:** GHI ~1,900–2,100 kWh/m²/yr (Mordor Intelligence, secondary). **Unknown:** official GHI/DNI/PVOUT for Shagaya. KISR found satellite **DNI diverges significantly** from ground data because of aerosols. **How to verify:** Global Solar Atlas (globalsolaratlas.info) for Shagaya coordinates, and KISR's ground stations for site-adapted data.`,
        },
        { kind: "sources", refs: ["m00-ises-2014-resource"] },
        {
          kind: "md",
          md: md`## Shagaya Renewable Energy Park

Located in Jahra Governorate, west of Kuwait City, on a site of about **84 km²**. The 2014 IEA-listed masterplan envisaged 70 MW (Phase 1), 1,000 MW by ~2020 (550 CSP / 380 PV / 70 wind) and 2,000 MW by 2030. A restructured plan later proposed a 200 MW CSP Phase 2 with ~5 h storage, which was **never procured** (no formal cancellation document found). The park's future became PV-led IPPs.

### Phase I — the KISR pilot (70 MW)

| Component | Details | Delivery |
|---|---|---|
| CSP 50 MW | Parabolic trough, **10 h molten-salt TES** (~1,200 MWh-thermal), dry cooling | TSK (KISR approval 2015); commissioned late 2018, full operation ~Feb 2019 |
| Wind 10 MW | Five 2 MW turbines; mean wind **7.9 m/s at 80 m** | Elecnor (~EUR 22.4 m); commissioned May 2017 |
| PV 10 MW | ~11.15 MW testbed of thin-film vs polycrystalline; substantial soiling, **monthly water cleaning** | — |
| Whole complex | Target up to ~225,000 MWh/yr; 6-year design-build-operate periods | — |

Reported wind performance: CF **45.2%** in year 1 (~40 GWh) and **42.1%** in year 2 (~37 GWh), ~70% in summer months — an excellent desert wind site whose summer output aligns with the peak. **No published operating data exist for the CSP plant after 2019.**`,
        },
        { kind: "sources", refs: ["m00-pvmag-2021-confusion", "m00-iea-5541", "m00-ice-phase2", "m00-reuters-csp", "m00-worley-shagaya", "m00-reuters-2019", "m00-gdn-csp", "m00-elecnor-wind", "m00-energias-tsk", "m00-ucar-wind", "m00-e3s-wind", "m00-rser-2020-pv"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "Phase I open questions",
          md: md`**Unknown:** (1) current operating status and availability of the 50 MW CSP plant (2025–26); (2) CSP EPC partners beyond TSK (Kharafi is sometimes mentioned, unconfirmed); (3) exact commissioning dates (sources differ). **How to verify:** KISR's renewable energy programme and the ministry's Shagaya operations team; ask for the plant's monthly generation reports since 2019. This is the biggest lessons-learned gap for anyone proposing CSP again (module m03).`,
        },
        {
          kind: "md",
          md: md`### Phase III — utility-scale PV IPPs procured by KAPP

**Background.** KNPC originally tendered the Al-Dibdibah (Dabdaba) solar project for oil-sector use under EPC+F; seven bids at ~1.5 GW arrived in April 2019. The cabinet cancelled the tender (COVID-19, market impact) and the scope was folded into **"Al Dibdibah Power and Al Shagaya Renewable Energy Phase III"** as KAPP IPPs.

| Project | Milestones | Status (Oct 2026) | Confidence |
|---|---|---|---|
| **Zone 1 — 1,100 MW PV + 400 kV substation**, 30-yr PPA with MEWRE | RFQ Jan 2024 (responses 7 Mar 2024); 6 prequalified (TotalEnergies, Trung Nam; consortia led by ACWA, Masdar, EDF, Jinko); RFP ~Jun 2025, deadline extended to 15 Jan 2026; 3 bids (ACWA + Alternative Energy Projects; Masdar + Fouad Alghanim & Sons; EDF + Korea Western Power + A. Al-Hamad Al-Sagar & Bros); financial bids opened ~Jul 2026 | **Masdar + Fouad AlGhanim & Sons reported selected (MEED, ~13 Aug 2026)**; award subject to Higher Committee and Audit Bureau; no official announcement; **tariff not reported** | Medium (single trade-press source) |
| **Zone 2 — 500 MW PV**, 30-yr PPA | RFQ May 2025; RFP 16 Nov 2025 to six consortia (Jinko, EDF, Masdar, ACWA, Swift Current, Tianjin Zhonghuan) + three companies (TotalEnergies, Kalyon, Limak); deadline 16 Feb → 30 Apr 2026 and later; RFP reportedly allows customs exemption up to 10% for 10 years | Bids 26 Jul 2026: MEED reports **three** (Masdar + Al-Ghanim International; ACWA + Arabian Engineering Projects Contracting; EDF + Al-Kharafi & Sons + Korea Western Power); Zawya/Al-Rai report **two** | Medium (conflict) |
| **Shagaya–Al-Wafra 400 kV OHTL** (MEWRE, conventional tender) | L&T lowest ~KD 41.45 m (Apr 2025) | Awarded to **Power Grid Company (Kuwait), KD 48.6 m (~USD 158.7 m), Mar 2026** | Medium |`,
        },
        { kind: "sources", refs: ["m00-eu-dibdibah", "m00-ippj-2019-knpc", "m00-meed-2024-01-zone1", "m00-pvmag-2025-06-zone1", "m00-sgp-2024-08-zone1", "m00-agbi-2025-06-zone1", "m00-meed-2026-zone1-bids", "m00-sq-2026-06-zone1", "m00-zawya-2026-q3", "m00-timeskuwait-2026-fin", "m00-meed-2026-07-frontrunner", "m00-meed-2026-08-zone1", "m00-sgp-2025-05-zone2", "m00-sq-2025-11-zone2", "m00-pvmag-2025-11-zone2", "m00-meed-2026-07-zone2", "m00-zawya-2026-07-zone2", "m00-gulfbase-2025-ohtl", "m00-megaproject-ohtl"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "Zone 1 and Zone 2 — what is not known",
          md: md`**Zone 1:** no official KAPP/MEWRE announcement of the selection; tariff (fils/kWh or US¢/kWh) not reported; Higher Committee and Audit Bureau approval status, PPA signing date, financial close and target COD unknown. One version of the MEED report names L&T as EPC — unconfirmed. **Zone 2:** two or three bids? evaluation status unknown; exact wording of the customs-exemption clause unknown. **Shortlist date:** reported in Aug 2024 (SaudiGulf) but "revealed" by pv magazine in Jun 2025. **How to verify:** KAPP project pages (kapp.gov.kw), KUNA, Kuwait Al-Youm; internally, the KAPP–MEWRE project committee minutes.`,
        },
        {
          kind: "md",
          md: md`### The China government-to-government (G2G) track

On **17 March 2025**, MEWRE (Undersecretary Adel Al-Zamel) signed a technical framework agreement with China's **National Energy Administration** covering **Shagaya Phase 3 and 4 expansions and the Abdaliya solar plant** — "3.5 GW, expandable to 5 GW" (MEES) or "each project 3,500 MW rising to 5,000 MW" (Arab News/SolarQuarter). In **May 2025** Kuwait said a Chinese state company had been awarded Shagaya Phases 3 and 4, reaching **4,800 MW by 2028** (AGBI); China's MFA named **SPIC** and a site inspection on 12 May 2025. GEM lists a Phase 4 of 1,700 MWac planned for 2028 with 42%/42% Kuwait/China government ownership.`,
        },
        { kind: "sources", refs: ["m00-mees-2025-03-china", "m00-sq-2025-03-china", "m00-arabnews-2025-03", "m00-agbi-2025-05-china", "m00-china-mfa-2025-05", "m00-gem-shagaya"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "G2G — the biggest unknown in the pipeline",
          md: md`**Unknown:** whether a definitive SPIC contract was signed; its tariff, financing and structure; the capacity (3.5 / 4.8 / 5 GW); and whether it **overlaps** the KAPP-tendered Zones 1–2 or is additional. GEM's Phase 3 zone figures do not match KAPP's. **How to verify:** ask the Undersecretary's office for the framework agreement and any implementation agreement; check Council of Ministers decisions; KUNA. As PM, never present G2G capacity as "contracted" without a signed agreement in hand.`,
        },
        {
          kind: "md",
          md: md`### Thermal IWPPs, oil-sector solar and storage

| Project | Facts | Status | Confidence |
|---|---|---|---|
| **Az-Zour North 2&3 IWPP** (gas) | ≥2,700 MW + 120 MIGD SWRO; ACWA Power + GIC 40% / KAPP 60%; EPC SEPCO-III; GE Vernova GTs; ~USD 4.1 bn | Letter agreement 10 Aug 2025; **25-yr ECWPA signed 3 Feb 2026**; financial close unconfirmed | High |
| **Al-Khairan Phase 1 IWPP** (gas) | 1,800 MW; water capacity reported as 150,000 m³/d, 125 MIGD or 33 MIGD (conflict) | RFP 31 Aug 2025; **2 bids 1 Jun 2026** (TAQA + A.H. Al-Sagar [+JERA?]; ACWA + GIC); award unknown | High (bids) |
| **Nuwaiseeb IWPP** | 3,600 MW CCGT + ~75 MIGD | Phase 1 approved as IWPP; transaction-adviser tender planned by end-2026; COD 2028 vs 2030 (conflict) | Medium |
| **Abdaliya ISCC** | 280 MW gas + 60 MW solar, 25-yr BOT; 7 prequalified | **Cancelled by KAPP before award**; "Abdaliya solar" now in the China G2G scope | Medium |
| **KOC Sidrah 500** | 10 MW PV at Umm Gudair, 2016 | Operating (powers oilfield pumps) | High |
| **KOC–MEWRE 1 GW** | MoU May 2024 | Status unknown | Low |
| **KPC up to 2 GW** | Plan approved Jan 2026 | No tender or site reported | Medium |
| **BESS 1–1.5 GW / 4–6 GWh** | Announced Nov 2025 ("in negotiation"); sites approved Jun 2026 at Al-Mutlaa and Jaber Al-Ahmad (1.5 GW) | First 500 MW targeted **summer 2027**; counterparty and route (G2G or tender) unknown | Medium-low |
| **Rooftop** | KFAS ~200-home pilot; ministry plan to buy rooftop power; 877 MW Souq Sharq reported | Net-metering scheme and Souq Sharq details unverified | Low |

Note: a "1,800 MW **solar**" project at Al-Khairan was **not** found — the 1,800 MW is the thermal IWPP. No KOC "Ras Al-Zour" solar project was found either. The minister's **14.05 GW** of new generation by 2031 includes AZN 2&3.`,
        },
        { kind: "sources", refs: ["m00-gic-2025-08", "m00-mees-2026-02-azn", "m00-ippj-2026-azn", "m00-meed-2026-06-khairan", "m00-meed-2026-06-nuwaiseeb", "m00-gem-abdaliya", "m00-ippj-abdaliya", "m00-gulfnews-2016-sidrah", "m00-sq-2024-05-koc", "m00-sq-2026-01-kpc", "m00-agbi-2025-11-bess", "m00-ice-2026-bess", "m00-theenergyyear-2025", "m00-meed-rooftop", "m00-zawya-2025-14gw"] },
        {
          kind: "callout",
          tone: "why",
          title: "Why a confidence column matters",
          md: md`Kuwait's pipeline is reported mostly through trade press (MEED, Zawya, SolarQuarter, AGBI) before — or instead of — official announcements. A PM who cannot tell "ECWPA signed (high)" from "preferred bidder reported by one outlet (medium)" or "framework agreement, no contract (low)" will mislead their superiors. The register is your professional shield.`,
        },
      ],
    },
    // ------------------------------------------------------------------ APPLIED
    {
      layer: "applied",
      title: "Testing targets and published numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "How much PV does 15% (and 30%) need — and does the pipeline get there?",
          given: md`Illustrative total generation $E_{\text{tot}} = 84$ TWh/yr; PV CF = 0.25 (AC). Pipeline with a signed or tendered status: Phase I 70 MW, Zone 1 1,100 MW, Zone 2 500 MW. G2G claim: 4,800 MW.`,
          steps: [
            { md: md`15%: $P = \dfrac{0.15 \times 84\times10^6\ \text{MWh}}{0.25 \times 8760} = 5{,}753$ MW.` },
            { md: md`30%: $P = 11{,}507$ MW.` },
            { md: md`Tendered pipeline: $70 + 1{,}100 + 500 = 1{,}670$ MW → $E = 1{,}670 \times 0.25 \times 8760 = 3.66$ TWh → $\sigma = 3.66/84 = 4.4\%$ (treating Phase I as PV-equivalent, a simplification).` },
            { md: md`Adding the G2G claim: $6{,}470$ MW → 14.2 TWh → **16.9%** — the 15% target is reachable only if the G2G track materialises as additional capacity, by 2030, with no overlap with the KAPP zones.` },
          ],
          result: md`The KAPP pipeline alone delivers ~4% of generation; 15% hinges on the China G2G track (unverified). This is why Rystad's forecast of ~7% by 2030 is plausible, and why the PM's leverage is schedule certainty.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Check the published Shagaya wind numbers",
          given: md`Wind farm: 10 MW. Peer-reviewed study: CF 45.2% in year 1 (~40 GWh). KISR conference paper: **42.59 GWh in year 1, "21% above the 31.16 GWh contractual figure"**.`,
          steps: [
            { md: md`CF implied by 40 GWh: $40{,}000 / (10 \times 8760) = 45.7\%$ — consistent with 45.2% (rounding of "about 40 GWh").` },
            {
              md: md`CF implied by 42.59 GWh: $42{,}590 / 87{,}600 = 48.6\%$.`,
              hidden: true,
              check: { prompt: "Capacity factor implied by 42.59 GWh (in %)", answer: 48.62, unit: "%", tolerance: { abs: 0.2 } },
            },
            {
              md: md`Ratio to contractual: $42.59 / 31.16 = 1.367$, i.e. **36.7% above**, not 21%. And $31.16 \times 1.21 = 37.7$ GWh.`,
              hidden: true,
              check: { prompt: "Percentage by which 42.59 GWh exceeds 31.16 GWh", answer: 36.68, unit: "%", tolerance: { abs: 0.3 } },
            },
            { md: md`Conclusion: the two studies use different periods/methods, and the "21%" statement is internally inconsistent with its own numbers (perhaps it compares a different period or a P90 figure). Do not quote "21% above contract" without checking the paper.` },
          ],
          result: md`Year-1 CF was somewhere between ~45% and ~49% depending on the study and period; the "21%" claim does not reconcile. Re-deriving published numbers is a basic PM habit.`,
        },
        {
          kind: "question",
          question: {
            id: "m00-l04-p1",
            type: "numeric",
            prompt: md`Shagaya Phase I was reported to target "up to about 225,000 MWh a year". If this target applies to the whole 70 MW complex, what is the implied average capacity factor in percent?`,
            answer: 36.7,
            tolerance: { abs: 0.3 },
            unit: "%",
            explanation: md`$CF = 225{,}000 / (70 \times 8760) = 225{,}000/613{,}200 = 36.7\%$. If the figure applied to the 50 MW CSP plant alone it would be 51.4% — high but conceivable for a trough plant with 10 h storage in a top-tier DNI site, and unlikely in Kuwait's dusty, aerosol-heavy conditions. The ambiguity is itself the lesson: always ask "output of which units, on what basis?"`,
            concepts: ["m00.shagaya-phase1", "m00.target-to-capacity"],
            difficulty: 2,
          },
        },
        { kind: "widget", widget: "capacity-factor", props: { mw: 10, mwh: 40000 }, caption: "Try the Shagaya wind numbers: 10 MW and 40,000 MWh/yr, then 42,590 MWh/yr." },
      ],
    },
    // ------------------------------------------------------------------ FIELD
    {
      layer: "field",
      title: "Keeping the pipeline register",
      blocks: [
        {
          kind: "md",
          md: md`On your first week, build a **pipeline register** — one row per project — and keep it alive. Columns: project, capacity (MWac/MWp/MWh), procurer (KAPP / MEWRE-CAPT / G2G / KPC), offtaker, last **confirmed** milestone, date, source, confidence (High = signed/official; Medium = multiple press or one strong outlet; Low = single weak source or framework only), next milestone, owner, interfaces (grid, land, water for cleaning).

**Interfaces you must track across projects**

- **Grid**: Zone 1's 400 kV substation is in the developer's scope; the Shagaya–Al-Wafra 400 kV line is MEWRE's. Mismatched dates strand plants.
- **Land**: Zones 1 and 2, the G2G Phases 3–4 and possible KOC/KPC solar all draw on Shagaya/Dibdibah land. Get the land allocation plan and plot boundaries.
- **Water/cleaning**: monthly water cleaning was needed at the Phase I PV testbed; GW-scale plants need dry/robotic cleaning or a water plan.
- **Dispatch**: GW-scale PV plus BESS changes the control centre's daily operation; involve them early.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`1. Adding G2G "awarded" capacity to the contracted total. 2. Confusing the 1,800 MW Al-Khairan IWPP with a solar project. 3. Quoting the Zone 1 award as final before Higher Committee/Audit Bureau approval and PPA signature. 4. Ignoring the two-versus-three bidder conflict in Zone 2 — it affects the competitiveness narrative. 5. Assuming CSP Phase I is operating normally — its post-2019 performance is unknown.`,
        },
        {
          kind: "checklist",
          title: "Register hygiene",
          items: [
            "Every row has a source link and a confidence level; every 'unverified' item has a named owner to verify it.",
            "Capacities state MWac or MWp; storage states MW and MWh.",
            "Official milestones (gazette, KUNA, KAPP) are distinguished from press milestones (MEED, Zawya).",
            "Grid, land, water and dispatch interfaces are listed per project with responsible parties.",
            "The register is reviewed monthly with the KAPP project team and Transmission.",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask KAPP, the Undersecretary's office and KISR",
          items: [
            "What is the official status of Zone 1 (Higher Committee decision date, Audit Bureau submission date) and the target PPA signing date?",
            "How many technical bids were received for Zone 2, and what is the evaluation timetable?",
            "Is the China NEA/SPIC Phase 3–4 capacity additional to the KAPP zones, and on which plots?",
            "What land plots, grid connection points and cleaning-water allocations are reserved for each phase?",
            "Can KISR share Phase I CSP, PV and wind operating data since 2019?",
          ],
        },
        { kind: "scenario", scenario: "m00-s4" },
        {
          kind: "feynman",
          prompt: "Explain to a visiting IRENA delegation where Kuwait stands against its renewable targets, without overstating or understating the pipeline.",
          keyPoints: [
            "Installed RE is only ~100 MW (end-2024), mainly Shagaya Phase I and small PV.",
            "15% by 2030 is the official legacy target; 30/40/50% is the updated ambition stated by MEWRE.",
            "KAPP pipeline: Zone 1 1,100 MW (preferred bidder reported) and Zone 2 500 MW (bids received) ≈ 4% of generation.",
            "A China G2G track (NEA/SPIC) could add several GW but its contract status is unverified.",
            "Rystad expects ~3.3 GW (~7%) by 2030; national net zero is 2060, oil and gas 2050.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m00-l04-q1",
      type: "mcq",
      prompt: md`What is Kuwait's **national** carbon-neutrality target year announced at COP27?`,
      options: ["2040", "2050", "2060", "2070"],
      answer: 2,
      explanation: md`**2060** for the country; **2050** is the oil and gas sector's net-zero target (KPC Scope 1 and 2 also 2050). Many outlets confuse the two.`,
      concepts: ["m00.re-targets"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m00-l04-q2",
      type: "numeric",
      prompt: md`Total generation is 90 TWh/yr. How many MW of PV at a 24% capacity factor are needed to supply 15% of it?`,
      answer: 6421,
      tolerance: { rel: 0.01 },
      unit: "MW",
      explanation: md`$P = 0.15 \times 90\times10^6 / (0.24 \times 8760) = 13.5\times10^6/2{,}102.4 = 6{,}421$ MW.`,
      concepts: ["m00.target-to-capacity"],
      difficulty: 2,
    },
    {
      id: "m00-l04-q3",
      type: "multi",
      prompt: md`Which describe Shagaya Phase I correctly? (Select all.)`,
      options: [
        "50 MW parabolic-trough CSP with about 10 hours of molten-salt storage",
        "10 MW of wind from five 2 MW turbines",
        "1,100 MW of PV procured by KAPP",
        "A PV testbed requiring monthly water cleaning because of soiling",
        "Published CSP availability data for 2020–2025",
      ],
      answer: [0, 1, 3],
      explanation: md`Phase I = 50 MW CSP (10 h TES) + 10 MW PV + 10 MW wind, developed by KISR with MEW. 1,100 MW is Phase III Zone 1. No CSP operating data after 2019 has been published.`,
      concepts: ["m00.shagaya-phase1"],
      difficulty: 1,
    },
    {
      id: "m00-l04-q4",
      type: "mcq",
      prompt: md`As of October 2026, what is the best-supported status of Shagaya Phase III Zone 1?`,
      options: [
        "PPA signed with ACWA Power in 2025",
        "Masdar + Fouad AlGhanim & Sons reported selected (MEED, ~Aug 2026); approvals, tariff and PPA signing not publicly confirmed",
        "Tender cancelled and moved to the China G2G track",
        "Under construction with COD in 2027",
      ],
      answer: 1,
      explanation: md`MEED reported the selection around 13 August 2026 after financial bids opened in July. No official KAPP/MEWRE announcement or tariff was found; the award remains subject to Higher Committee and Audit Bureau approval.`,
      concepts: ["m00.shagaya-phase3", "m00.pipeline-confidence"],
      difficulty: 2,
    },
    {
      id: "m00-l04-q5",
      type: "mcq",
      prompt: md`Which project had a **signed 25-year ECWPA** in February 2026?`,
      options: ["Al-Khairan Phase 1", "Az-Zour North 2&3", "Nuwaiseeb", "Abdaliya ISCC"],
      answer: 1,
      explanation: md`AZN 2&3 (≥2,700 MW + 120 MIGD), ACWA Power + GIC (40%) with KAPP (60%), ECWPA signed 3 Feb 2026, ~USD 4.1 bn. Al-Khairan received bids in June 2026; Nuwaiseeb is at adviser stage; Abdaliya was cancelled.`,
      concepts: ["m00.pipeline-confidence"],
      difficulty: 1,
    },
    {
      id: "m00-l04-q6",
      type: "decision",
      prompt: md`Your Director asks for a single number: "How many GW of solar have we contracted?" for a speech tomorrow. What do you provide?`,
      options: [
        { text: "6.4 GW: Phase I + Zones 1–2 + the 4.8 GW China award.", score: 0.1, feedback: "Overstates: G2G has no confirmed definitive contract, and Zone 1/Zone 2 PPAs are not signed per public sources." },
        { text: "A tiered answer: operating (~0.1 GW), in procurement with preferred bidder/bids (1.6 GW: Zone 1 + Zone 2), and under a government framework agreement (China G2G, capacity to be confirmed) — with a suggested speech line that does not say 'contracted'.", score: 1, feedback: "Exactly: accurate, usable and protects the Director." },
        { text: "Zero, because nothing is signed.", score: 0.4, feedback: "Technically defensible on PPAs but unhelpfully narrow; it ignores real progress and Phase I." },
        { text: "Tell the Director to ask KAPP.", score: 0.2, feedback: "You are expected to know your pipeline." },
      ],
      explanation: md`Use the status-and-confidence register to give tiered numbers. "Contracted" should mean signed PPA or EPC contract.`,
      concepts: ["m00.pipeline-confidence"],
      difficulty: 2,
    },
    {
      id: "m00-l04-q7",
      type: "short",
      prompt: md`Why is the relationship between the China G2G track and the KAPP Zones 1–2 important for a MEWRE PM? Give at least three practical reasons.`,
      rubric: [
        "Capacity accounting: overlap vs additional changes progress toward targets.",
        "Land: both draw on Shagaya/Dibdibah plots; boundaries must be allocated.",
        "Grid: substation and 400 kV capacity must be shared and sequenced.",
        "Dispatch/curtailment and commercial terms may differ (PPA vs G2G), affecting offtaker obligations.",
      ],
      modelAnswer: "If the G2G phases overlap the KAPP zones, the national pipeline is smaller than the headline totals; if additional, the 15% target becomes feasible. Both draw on the same Shagaya/Dibdibah land and the same 400 kV export capacity, so plots and grid connections must be allocated and sequenced. Their commercial terms will differ (KAPP 30-year PPA vs a G2G structure), which affects MEWRE's offtake obligations, curtailment priority and dispatch.",
      explanation: md`Unclear overlap affects targets, land, grid and contracts simultaneously. Until clarified, treat the G2G capacity as unconfirmed and raise the interface question formally.`,
      concepts: ["m00.shagaya-phase3", "m00.target-to-capacity"],
      difficulty: 3,
    },
  ],
  flashcards: [
    { id: "m00-l04-f1", front: "Kuwait RE targets", back: "15% by 2030 (2012, official legacy); updated 30% 2030 / 40% 2040 / 50% 2050 (MEWRE official, 2025).", concepts: ["m00.re-targets"] },
    { id: "m00-l04-f2", front: "Net zero dates", back: "Country: carbon neutral 2060. Oil & gas sector: net zero 2050 (COP27, Nov 2022).", concepts: ["m00.re-targets"] },
    { id: "m00-l04-f3", front: "Capacity needed for a share target", back: md`$P = \sigma E_{\text{tot}} / (CF \cdot 8760)$ — 15% of 84 TWh at CF 0.25 ≈ 5.8 GW.`, concepts: ["m00.target-to-capacity"] },
    { id: "m00-l04-f4", front: "Shagaya Phase I configuration", back: "50 MW CSP trough (10 h molten salt, ~1,200 MWh-th) + 10 MW PV + 10 MW wind (5 × 2 MW).", concepts: ["m00.shagaya-phase1"] },
    { id: "m00-l04-f5", front: "Shagaya wind performance", back: "7.9 m/s at 80 m; CF 45.2% yr 1, 42.1% yr 2; ~70% CF in summer months.", concepts: ["m00.shagaya-phase1"] },
    { id: "m00-l04-f6", front: "Zone 1 bidders (Jan 2026)", back: "ACWA + Alternative Energy Projects; Masdar + Fouad Alghanim & Sons; EDF + Korea Western Power + Al-Sagar. Masdar group reported selected (~Aug 2026).", concepts: ["m00.shagaya-phase3"] },
    { id: "m00-l04-f7", front: "Zone 2 status", back: "500 MW; RFP 16 Nov 2025; bids 26 Jul 2026 — 3 per MEED, 2 per Zawya/Al-Rai.", concepts: ["m00.shagaya-phase3"] },
    { id: "m00-l04-f8", front: "China G2G framework", back: "17 Mar 2025, MEWRE–NEA: Shagaya Phases 3–4 + Abdaliya solar; SPIC named; 4,800 MW by 2028 claimed; contract unverified.", concepts: ["m00.shagaya-phase3"] },
    { id: "m00-l04-f9", front: "Az-Zour North 2&3", back: "≥2,700 MW + 120 MIGD; ACWA + GIC 40% / KAPP 60%; 25-yr ECWPA signed 3 Feb 2026; ~USD 4.1 bn.", concepts: ["m00.pipeline-confidence"] },
    { id: "m00-l04-f10", front: "Kuwait BESS plan", back: "1–1.5 GW / 4–6 GWh; sites Al-Mutlaa and Jaber Al-Ahmad; first 500 MW targeted summer 2027; route unknown.", concepts: ["m00.pipeline-confidence"] },
    { id: "m00-l04-f11", front: "Rystad outlook for Kuwait RE", back: "~3.3 GW by 2030 (~7% of generation); ~11 GW by 2035; 15% reached ~2035.", concepts: ["m00.re-targets"] },
  ],
  scenarios: [
    {
      id: "m00-s4",
      title: "Two tracks, one substation",
      dayInLife: true,
      context: md`A Chinese delegation (SPIC) visits Shagaya with officials from the Undersecretary's office and asks to "confirm the plots and the 400 kV connection point" for Phase 3–4. The KAPP Zone 1 preferred bidder's team has already been shown a draft plot plan that overlaps one of the areas the delegation is pointing at. You are the MEWRE PM accompanying the visit.`,
      start: "a",
      concepts: ["m00.shagaya-phase3", "m00.pipeline-confidence"],
      nodes: {
        a: {
          md: md`The delegation leader asks you on the spot to confirm the plot. What do you say?`,
          choices: [
            { text: "Confirm, to show goodwill.", next: "b", score: 0, feedback: "You may have just committed the ministry to an allocation that conflicts with a KAPP procurement — a potential claim from the Zone 1 bidder." },
            { text: "Thank them, explain that plot and grid allocations are confirmed formally by the ministry after coordination with KAPP and Transmission, and offer to provide a written response through the Undersecretary's office.", next: "c", score: 10, feedback: "Courteous, correct and non-committal on the spot." },
            { text: "Tell them the plot is reserved for Masdar.", next: "c", score: 3, feedback: "Disclosing the procurement status of a KAPP tender to a third party is inappropriate, and you have also offended a government partner." },
          ],
        },
        b: {
          md: md`Back at the office, KAPP calls: the Zone 1 bidder's adviser heard about your statement.`,
          choices: [
            { text: "Write a note to your Director explaining what was said, and propose a formal clarification letter and a joint KAPP–MEWRE land/grid allocation meeting.", next: "c", score: 5, feedback: "Good damage control; transparency with your Director is essential." },
          ],
        },
        c: {
          md: md`What do you set up next?`,
          choices: [
            { text: "A formal interface register and a joint meeting (KAPP, Transmission, the renewable sector, Undersecretary's office) to fix plot boundaries and 400 kV capacity per track, minuted and approved.", score: 10, feedback: "Converts an ambiguity into a decision with owners. This is the PM's core value." },
            { text: "Ask the two developers to sort it out between themselves.", score: 1, feedback: "Land and grid allocation is a state decision; delegating it to competitors invites disputes." },
          ],
        },
      },
    },
  ],
};

export default lesson;
