import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m10-l04",
  title: "Project Finance for IPPs: SPV, CFADS Waterfall, Debt Sculpting and Cover Ratios",
  summary:
    "How a solar IPP is financed off-balance-sheet: the SPV and contract web, non-recourse debt, the CFADS waterfall, sizing debt by DSCR sculpting versus gearing, DSCR/LLCR/PLCR, reserve accounts, covenants, project vs equity IRR and the lenders' advisors — with the full 30-year cash-flow table for a 1,100 MW PV IPP.",
  minutes: 90,
  objectives: [
    "Draw the SPV contract structure of a Kuwait solar IPP and explain non-recourse (limited-recourse) finance",
    "Build CFADS and the cash-flow waterfall, and size senior debt by DSCR sculpting subject to a gearing cap",
    "Compute and interpret DSCR, LLCR and PLCR, and explain DSRA, lock-up and default covenants",
    "Explain why equity IRR exceeds project IRR and what leverage does to the offtaker's risk",
    "Know what the lenders' technical, financial, legal, insurance and model-audit advisors do and what MEWRE should expect from them",
  ],
  concepts: [
    { id: "m10.project-finance", name: "Project finance and the SPV", description: "Financing a single asset through a ring-fenced special purpose vehicle whose lenders rely on project cash flows and contracts, with limited or no recourse to sponsors.", competency: "finance", related: ["m10.wacc", "m09.direct-agreements", "m09.kuwait-ppp-model", "m15.ipp-structure"] },
    { id: "m10.cfads-waterfall", name: "CFADS and the cash-flow waterfall", description: "Order in which project cash is applied: opex, taxes, senior debt service, reserve top-ups, then distributions subject to tests.", competency: "finance", related: ["m10.project-finance"] },
    { id: "m10.debt-sculpting", name: "Debt sizing: sculpting vs gearing", description: "Debt amount set as the PV of CFADS/target DSCR, capped by a maximum gearing; whichever is lower binds.", competency: "finance", related: ["m10.cfads-waterfall", "m10.cover-ratios", "m02.p50-p90"] },
    { id: "m10.cover-ratios", name: "DSCR, LLCR, PLCR", description: "Period and whole-life cover ratios lenders use to size debt and set covenants.", competency: "finance", related: ["m10.debt-sculpting"] },
    { id: "m10.reserves-covenants", name: "Reserve accounts and covenants", description: "DSRA, maintenance reserves, lock-up and default ratios, cash sweeps and information covenants that protect lenders.", competency: "finance", related: ["m10.cover-ratios"] },
    { id: "m10.equity-irr", name: "Project IRR vs equity IRR", description: "Unlevered return on total capex versus levered return on sponsor equity; leverage raises equity IRR when debt is cheaper than the project return.", competency: "finance", related: ["m10.irr", "m10.wacc"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "The SPV, the waterfall and how lenders size debt",
      blocks: [
        {
          kind: "md",
          md: md`### The structure

A Kuwait solar IPP is a **special purpose vehicle (SPV)** — a Kuwaiti project company that owns one plant and does nothing else. Around it sits a web of contracts, each moving a risk to the party best able to carry it:

| Contract | Counterparty | Risk it moves |
|---|---|---|
| Power Purchase Agreement (30 years for Kuwait solar IPPs) | MEWRE (offtaker) | Price and volume (take-or-pay for delivered/deemed energy) |
| EPC contract (fixed price, date-certain, often wrapped) | EPC contractor | Construction cost, delay (delay LDs), performance (performance LDs) |
| O&M agreement | O&M contractor | Availability and operating cost |
| Land lease/usufruct, grid connection agreement | State / MEWRE Transmission | Site access, grid availability |
| Loan agreement, security documents, direct agreements | Lenders | Step-in rights if the SPV defaults under a project contract |
| Shareholders' agreement | Sponsors, KAPP (holding IPO shares) | Governance; in Kuwait PPP Law 116/2014 projects, a 50 % IPO to citizens, 6–24 % public entities, at least 26 % private investor (legal guide; verify against the law) |

**Non-recourse (in practice limited-recourse) finance:** lenders can claim only the SPV's assets, contracts and cash — not the sponsors' balance sheets — except for limited sponsor support (equity commitments, completion support, cost-overrun facilities). Because their only source of repayment is the project's cash flow, lenders scrutinise every contract and every assumption. This is why **the bankability of MEWRE's PPA directly sets the tariff**: termination payments, curtailment compensation, currency, change in law and payment security are priced by lenders.

### CFADS and the cash-flow waterfall`,
        },
        { kind: "equation", formula: "m10-cfads" },
        {
          kind: "md",
          md: md`The accounts agreement fixes the order in which cash is applied each period (simplified):

1. Revenue into the **proceeds account** (PPA payments from MEWRE, insurance proceeds, LDs)
2. **Operating costs** and taxes
3. → **CFADS**
4. **Senior debt service** (fees, interest, scheduled principal)
5. **DSRA** top-up to its target (typically 6 months of next debt service)
6. **Maintenance reserve** (inverter replacement, major spares)
7. **Distribution tests** — if historic and projected DSCR ≥ lock-up level (e.g. 1.10–1.15x) and no default: release to shareholders; otherwise cash is trapped (lock-up) and may be swept to prepay debt
8. **Distributions** (dividends, shareholder-loan service)

### Sizing the debt: two constraints

**Gearing constraint:** debt ≤ max gearing × capex (e.g. 80 %).`,
        },
        { kind: "equation", formula: "m10-gearing" },
        {
          kind: "md",
          md: md`**Cover constraint (sculpting):** each year's debt service must be covered by CFADS with a margin — the sizing DSCR. If lenders want 1.25x on P50, the most the project can pay in year $t$ is CFADS$_t$/1.25. The debt that schedule can repay is its present value at the loan interest rate:`,
        },
        { kind: "equation", formula: "m10-sculpted-debt" },
        {
          kind: "md",
          md: md`Debt = **min**(gearing cap, sculpted capacity). Sculpting gives a debt-service profile that mirrors CFADS (falling slowly with degradation and opex escalation), so the DSCR is flat. An **annuity** (level) repayment would breach the target in later years when CFADS is lower, so it supports less debt for the same minimum DSCR. Lenders also size on a downside: P90 (one-year or ten-year) energy at ~1.0–1.10x.

### Cover ratios`,
        },
        { kind: "equation", formula: "m10-dscr" },
        { kind: "equation", formula: "m10-llcr" },
        { kind: "equation", formula: "m10-plcr" },
        {
          kind: "md",
          md: md`- **DSCR** — period headroom; tested semi-annually on a historic 12-month basis and sometimes projected.
- **LLCR** — the whole loan's cover in present-value terms; equals the DSCR under perfect sculpting.
- **PLCR** — adds the post-maturity **tail** (here years 26–30). Lenders want a tail (typically 2–5 years) so a loan can be extended if the plant underperforms. A 25-year tenor on a 30-year PPA is a 5-year tail.

### Reserves and covenants

| Mechanism | Typical level | Purpose |
|---|---|---|
| DSRA | 6 months of next debt service (cash or LC) | Liquidity for an outage, a payment delay or a bad irradiance year |
| Maintenance reserve | Builds to fund inverter replacement | Smooths lumpy capex |
| Lock-up DSCR | 1.10–1.15x | Traps dividends when cover erodes |
| Default DSCR | ~1.05x | Event of default → lenders' remedies, step-in |
| Cash sweep | % of excess cash to prepay | Protects against tail risk (e.g. merchant or refinancing) |
| Information covenants | Monthly/quarterly reports, LTA reports, model updates | Early warning |

### Project IRR vs equity IRR

Project IRR uses unlevered cash flows (−capex, +CFADS); equity IRR uses −equity at COD and +(CFADS − debt service). When debt costs less than the project return, leverage **raises** equity IRR: the sponsor finances 80 % at 5.5 % an asset that earns 6.45 %, and keeps the spread on a small equity base. It also amplifies risk: a 7 % fall in energy reduces year-1 CFADS by ~8 % but distributions by ~36 % in the base case.`,
        },
        { kind: "equation", formula: "m10-irr" },
        {
          kind: "callout",
          tone: "why",
          title: "Why the offtaker should care about the IPP's capital structure",
          md: md`High gearing and thin cover ratios are what make 1–2 cent tariffs possible, but they leave little equity cushion. If an IPP with 80 % debt underperforms, lenders' remedies (lock-up, default, step-in, restructuring requests) land on MEWRE's desk as requests for PPA amendments, deemed-energy claims or termination. Understanding the lenders' model is how the offtaker anticipates those conversations.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Full 30-year cash flow for the 1,100 MW PV IPP",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Sizing debt and computing returns for the base case",
          given: md`Illustrative base case (not the Zone 1 bid): 1,430 MWp / 1,100 MWac; year-1 P50 3,003 GWh, degradation 0.4 %/yr; flat tariff 1.80 US cents/kWh for 30 years; capex USD 560 m at COD; opex USD 7.5 m escalating 2 %/yr; senior debt 5.5 % all-in, 25-year tenor, sculpted to 1.25x on P50, gearing cap 80 %; no tax, no working capital (teaching simplifications).`,
          steps: [
            { md: md`**CFADS year 1:** revenue $3{,}003\text{ GWh}\times 1.80/100 = 54.05$ USD m; minus opex 7.50 → **46.55** USD m.` },
            { md: md`**Target debt service year 1:** $46.55/1.25 = 37.24$ USD m. Repeat for years 1–25 and discount at 5.5 %: sculpted capacity $= \sum (CFADS_t/1.25)/1.055^t$ = **USD 461.4 m** (82.4 % of capex).` },
            { md: md`**Gearing cap:** $0.80\times 560 = 448.0$ USD m < 461.4 → **the gearing cap binds**. Debt = USD 448.0 m; equity = USD 112.0 m. Debt service is scaled by $448.0/461.4 = 0.971$, so the achieved DSCR is $1.25/0.971 = $ **1.287x** every year.` },
            { md: md`**Year 1 debt service:** interest $448.00\times 5.5\% = 24.64$; debt service $37.24\times 0.971 = 36.16$; principal $36.16 - 24.64 = 11.52$; closing balance 436.48.` },
            {
              md: md`**The full table (USD m):**

| Yr | Energy (GWh) | Revenue | Opex | CFADS | Opening debt | Interest | Principal | Debt service | DSCR | Equity CF |
|---|---|---|---|---|---|---|---|---|---|---|
| 0 | — | — | — | — | — | — | — | — | — | −112.00 |
| 1 | 3,003.0 | 54.05 | 7.50 | 46.55 | 448.00 | 24.64 | 11.52 | 36.16 | 1.287 | 10.39 |
| 2 | 2,991.0 | 53.84 | 7.65 | 46.19 | 436.48 | 24.01 | 11.87 | 35.88 | 1.287 | 10.31 |
| 3 | 2,979.0 | 53.62 | 7.80 | 45.82 | 424.61 | 23.35 | 12.24 | 35.59 | 1.287 | 10.23 |
| 4 | 2,967.1 | 53.41 | 7.96 | 45.45 | 412.37 | 22.68 | 12.62 | 35.30 | 1.287 | 10.14 |
| 5 | 2,955.2 | 53.19 | 8.12 | 45.08 | 399.74 | 21.99 | 13.03 | 35.01 | 1.287 | 10.06 |
| 6 | 2,943.4 | 52.98 | 8.28 | 44.70 | 386.71 | 21.27 | 13.45 | 34.72 | 1.287 | 9.98 |
| 7 | 2,931.6 | 52.77 | 8.45 | 44.32 | 373.26 | 20.53 | 13.90 | 34.43 | 1.287 | 9.89 |
| 8 | 2,919.9 | 52.56 | 8.62 | 43.94 | 359.36 | 19.76 | 14.37 | 34.13 | 1.287 | 9.81 |
| 9 | 2,908.2 | 52.35 | 8.79 | 43.56 | 344.99 | 18.97 | 14.86 | 33.84 | 1.287 | 9.72 |
| 10 | 2,896.6 | 52.14 | 8.96 | 43.18 | 330.12 | 18.16 | 15.38 | 33.54 | 1.287 | 9.64 |
| 11 | 2,885.0 | 51.93 | 9.14 | 42.79 | 314.74 | 17.31 | 15.93 | 33.24 | 1.287 | 9.55 |
| 12 | 2,873.5 | 51.72 | 9.33 | 42.40 | 298.82 | 16.43 | 16.50 | 32.93 | 1.287 | 9.46 |
| 13 | 2,862.0 | 51.52 | 9.51 | 42.00 | 282.32 | 15.53 | 17.10 | 32.63 | 1.287 | 9.38 |
| 14 | 2,850.5 | 51.31 | 9.70 | 41.61 | 265.22 | 14.59 | 17.73 | 32.32 | 1.287 | 9.29 |
| 15 | 2,839.1 | 51.10 | 9.90 | 41.21 | 247.48 | 13.61 | 18.40 | 32.01 | 1.287 | 9.20 |
| 16 | 2,827.8 | 50.90 | 10.09 | 40.81 | 229.08 | 12.60 | 19.10 | 31.70 | 1.287 | 9.11 |
| 17 | 2,816.5 | 50.70 | 10.30 | 40.40 | 209.99 | 11.55 | 19.83 | 31.38 | 1.287 | 9.02 |
| 18 | 2,805.2 | 50.49 | 10.50 | 39.99 | 190.15 | 10.46 | 20.61 | 31.07 | 1.287 | 8.93 |
| 19 | 2,794.0 | 50.29 | 10.71 | 39.58 | 169.54 | 9.32 | 21.42 | 30.75 | 1.287 | 8.83 |
| 20 | 2,782.8 | 50.09 | 10.93 | 39.16 | 148.12 | 8.15 | 22.28 | 30.42 | 1.287 | 8.74 |
| 21 | 2,771.7 | 49.89 | 11.14 | 38.75 | 125.85 | 6.92 | 23.18 | 30.10 | 1.287 | 8.65 |
| 22 | 2,760.6 | 49.69 | 11.37 | 38.32 | 102.67 | 5.65 | 24.12 | 29.77 | 1.287 | 8.55 |
| 23 | 2,749.5 | 49.49 | 11.59 | 37.90 | 78.55 | 4.32 | 25.12 | 29.44 | 1.287 | 8.46 |
| 24 | 2,738.5 | 49.29 | 11.83 | 37.47 | 53.43 | 2.94 | 26.17 | 29.10 | 1.287 | 8.36 |
| 25 | 2,727.6 | 49.10 | 12.06 | 37.03 | 27.27 | 1.50 | 27.27 | 28.77 | 1.287 | 8.27 |
| 26 | 2,716.7 | 48.90 | 12.30 | 36.60 | — | — | — | — | — | 36.60 |
| 27 | 2,705.8 | 48.70 | 12.55 | 36.15 | — | — | — | — | — | 36.15 |
| 28 | 2,695.0 | 48.51 | 12.80 | 35.71 | — | — | — | — | — | 35.71 |
| 29 | 2,684.2 | 48.32 | 13.06 | 35.26 | — | — | — | — | — | 35.26 |
| 30 | 2,673.5 | 48.12 | 13.32 | 34.80 | — | — | — | — | — | 34.80 |
| **Σ** | 85,054.7 | 1,530.98 | 304.26 | 1,226.72 | | 366.24 | 448.00 | 814.24 | | 300.49 |`,
            },
            { md: md`**Returns** (from the table): project IRR (−560 then CFADS) = **6.45 %**; equity IRR (−112 then equity CF) = **8.97 %**; project NPV at 6.2 % WACC = **+USD 14.2 m**; equity NPV at 9 % ≈ −0.3 (the bid is priced almost exactly at the 9 % hurdle). Simple project payback 12.6 years; equity payback 11.2 years.` },
            { md: md`**Cover ratios:** min = average DSCR = 1.287x; LLCR at COD = 1.287x (perfect sculpting); PLCR = 1.377x thanks to the 5-year tail (years 26–30, USD 178.5 m of undiscounted CFADS). DSRA target at COD (6 months of year-1 debt service) = USD 18.1 m — funded by equity or a letter of credit on top of the 112 m in a real deal.` },
          ],
          result: md`Debt USD 448.0 m (gearing-constrained), equity USD 112.0 m, DSCR 1.287x flat, LLCR 1.287x, PLCR 1.377x, project IRR 6.45 %, equity IRR 8.97 %. Lifetime: USD 1,531 m of PPA payments from MEWRE; USD 366 m of interest to lenders; USD 300 m net cash to equity after recovering its 112 m.`,
        },
        {
          kind: "download",
          file: "/downloads/project-finance-model.xlsx",
          title: "Project finance model (Excel)",
          description: "Inputs → annual CashFlow (CFADS, sculpted debt service, DSCR, DSRA target, project and equity flows) → Summary (debt sizing, binding constraint, DSCR/LLCR/PLCR, IRRs, NPVs, payback). Live formulas reproduce every number in this lesson.",
        },
        {
          kind: "worked",
          mode: "faded",
          title: "P90 stress: does the IPP breach its lock-up covenant?",
          given: md`Debt and its repayment schedule are fixed as in the base case (sized on P50). Year 1 turns out to be a P90 year: energy 7 % below P50. Opex unchanged. Assume a conservative lock-up DSCR of 1.20x and a default DSCR of 1.05x.`,
          steps: [
            { md: md`Year-1 revenue at P90 $= 54.05\times 0.93 = 50.27$ USD m.` },
            { md: md`CFADS $= 50.27 - 7.50$ = **42.77** USD m.`, hidden: true, check: { prompt: "P90 CFADS year 1 (USD m)", answer: 42.77, unit: "USD m", tolerance: { abs: 0.05 } } },
            { md: md`DSCR $= 42.77/36.16$ = **1.183x**.`, hidden: true, check: { prompt: "P90 DSCR year 1", answer: 1.183, tolerance: { abs: 0.003 } } },
            { md: md`1.183x < 1.20x lock-up → **distributions trapped**, but well above the 1.05x default level. Equity distributions fall from 10.39 to 6.61 USD m (−36 %) while CFADS fell only 8 %: leverage at work. If the shortfall persisted (P90 every year), the minimum DSCR would be 1.168x in year 25.` },
          ],
          result: md`A single P90 year trips a 1.20x lock-up but not default. This is why lenders size on both P50 (1.25x) and P90 (~1.0–1.1x), and why MEWRE's curtailment and grid-availability regime matters: a curtailment year without deemed-energy payment looks to lenders exactly like a P90 year.`,
        },
        { kind: "widget", widget: "npv-irr", caption: "Change debt %, interest rate and tenor; watch equity IRR and minimum DSCR move in opposite directions." },
        {
          kind: "question",
          question: {
            id: "m10-l04-p1",
            type: "numeric",
            prompt: md`Suppose lenders drop the gearing cap so that the DSCR constraint binds (debt = sculpted capacity, USD 461.4 m). What is the year-1 debt service? (USD m, 2 decimals)`,
            answer: 37.24,
            tolerance: { abs: 0.03 },
            unit: "USD m",
            explanation: md`With sculpting binding, debt service = CFADS/target DSCR = $46.55/1.25 = 37.24$ USD m. Equity falls to USD 98.6 m (gearing 82.4 %) and equity IRR rises from 8.97 % to 9.30 % — a bidder can bid lower if lenders accept higher gearing, at the price of a thinner equity cushion.`,
            concepts: ["m10.debt-sculpting"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Lenders, advisors and what MEWRE sees across the table",
      blocks: [
        {
          kind: "md",
          md: md`### The advisors and what they produce

| Advisor | Appointed by | Produces | What MEWRE should do with it |
|---|---|---|---|
| **Lenders' technical advisor (LTA / IE)** | Lenders | Due-diligence report on design, yield (P50/P90), EPC and O&M terms, schedule; construction monitoring; completion certificates | Compare its yield and degradation with MEWRE's own review; align its completion tests with the PPA's commercial operation tests |
| **Lenders' financial advisor / arranger** | Lenders or sponsor | Financing structure, term sheet, debt sizing | Understand the DSCR/gearing that drove the bid tariff |
| **Model auditor** | Lenders | Audit of the financial model's logic, tax and accounting treatment | Ask for the audited base case at financial close (useful for termination payment calculations) |
| **Lenders' legal counsel** | Lenders | Security package, direct agreements, PPA comments | Expect requests to amend PPA termination, step-in, assignment clauses |
| **Insurance advisor** | Lenders | Insurance programme adequacy | Check consistency with PPA insurance obligations |
| **KAPP transaction advisor** | KAPP | Feasibility, RFP, PPA drafting, bid evaluation | MEWRE's technical input channel during procurement |

### Typical timeline

RFP → bid (with committed/indicative financing letters) → preferred bidder → Higher Committee and **State Audit Bureau** approvals → PPA signing → **financial close** (conditions precedent satisfied, first drawdown) → construction (LTA monitors; EPC milestone drawdowns) → COD → operations (semi-annual DSCR tests). In Kuwait the approval chain (KAPP → Higher Committee → Audit Bureau, with Fatwa and Legislation reviewing legal terms) sits on the critical path between bid and financial close; interest-rate movements during that wait are a real risk (scenario below).

### Interest-rate risk between bid and financial close

If base rates rise 100 bp before close (all-in 6.5 % instead of 5.5 %): sculpted capacity falls to USD 421.3 m (gearing 75.2 %, DSCR now binding), equity rises to 138.7 m and equity IRR falls to **6.35 %**. Restoring 8.97 % would need a tariff of about **1.906 cents** (+5.9 %). Bidders protect themselves with interest-rate hedges from bid date, bid validity limits or explicit RFP mechanisms that adjust the tariff for movements in a reference swap rate up to financial close — a mechanism the RFP must define *before* bids, not negotiate after.`,
        },
        {
          kind: "callout",
          tone: "kuwait",
          title: "Kuwait specifics to keep in view",
          md: md`- Solar IPPs: **30-year PPA with MEWRE** from COD; the Zone 1 RFP scope includes development, financing, design, construction and O&M including a **400 kV substation** (pv magazine 2025-06-16; AGBI 2025-06).
- KAPP-procured projects follow **PPP Law No. 116 of 2014**; the Higher Committee approves the selected investor, followed by State Audit Bureau review before signing.
- In Kuwaiti IWPPs the developer typically holds 40 % and the state (via KAPP) 60 %, with 50 % earmarked for a public IPO — the SPV becomes a listed company with KAPP as a major shareholder.
- Not found in the research brief (treat as unknown): PPA currency and indexation, the form of government support, and the termination-payment regime. These are the terms lenders price most heavily.`,
        },
        { kind: "sources", refs: ["m10-pvmag-zone1-2025", "m10-agbi-zone1-rfp", "m10-kapp-ppp-law", "m10-wb-ppp"] },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Where project-finance reviews go wrong",
          md: md`- Treating DSCR "on average" — lenders test the minimum and the historic 12-month figure.
- Confusing project IRR (unlevered) with equity IRR when comparing with a sponsor's hurdle.
- Ignoring DSRA funding, fees and IDC in "capex" — they are real uses of funds at financial close.
- Assuming the debt is sized on P50 only — P90 sizing often binds for merchant or curtailment-exposed projects.
- Forgetting that a tenor equal to the PPA leaves no tail: lenders will shorten tenor or raise DSCR, raising the tariff.`,
        },
        {
          kind: "checklist",
          title: "PM checks when reviewing a bidder's or lender's model",
          items: [
            "Sources and uses at financial close reconcile (capex, IDC, fees, DSRA, development costs = debt + equity)",
            "CFADS excludes non-cash items and includes tax, working capital and reserve movements",
            "Sizing case(s): P50 DSCR, P90 DSCR, gearing cap — which binds?",
            "Minimum, not average, DSCR reported; LLCR and PLCR and the tail length stated",
            "Debt tenor vs PPA term; refinancing assumptions identified (and who keeps the gains)",
            "Energy and degradation consistent with the LTA report and MEWRE's own review",
            "PPA terms modelled exactly as drafted (deemed energy, curtailment caps, indexation, termination)",
          ],
        },
        {
          kind: "ask",
          title: "Questions for the bidder, lenders or LTA",
          items: [
            "What sizing DSCR (P50 and P90) and maximum gearing did your lenders commit to, and which constraint binds in your base case?",
            "How is interest-rate exposure hedged between bid and financial close, and for what share of the debt?",
            "What lock-up and default DSCRs apply, and how would a curtailment year without compensation affect them?",
            "Are there refinancing assumptions in your equity IRR? If refinancing occurs, how are gains shared with the offtaker?",
            "Which PPA clauses did lenders' counsel flag as non-bankable, and what do they propose?",
          ],
        },
        { kind: "scenario", scenario: "m10-s3" },
        {
          kind: "feynman",
          prompt: "Explain to a ministry colleague, without jargon, why an IPP's lenders care more about the minimum DSCR than about the project's profit, and how that affects MEWRE.",
          keyPoints: [
            "Lenders are repaid only from project cash (non-recourse)",
            "DSCR measures cash available against each year's debt payment; the weakest year matters",
            "Debt size and therefore the tariff are set by DSCR and gearing limits",
            "Low DSCR headroom means performance shortfalls quickly trap cash or trigger default",
            "Lenders' concerns come back to the offtaker as requests on PPA terms (curtailment, termination, deemed energy)",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m10-l04-q1",
      type: "numeric",
      prompt: md`CFADS in a year is USD 46.55 m; interest is USD 24.64 m and principal USD 11.52 m. What is the DSCR? (3 decimals)`,
      answer: 1.287,
      tolerance: { abs: 0.002 },
      explanation: md`$46.55/(24.64+11.52) = 46.55/36.16 = 1.287$x.`,
      concepts: ["m10.cover-ratios"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m10-l04-q2",
      type: "order",
      prompt: "Order the typical cash-flow waterfall of a project-financed IPP (first to last).",
      items: ["Operating costs and taxes", "Senior debt service", "DSRA top-up", "Maintenance reserve", "Distribution test (lock-up)", "Dividends to shareholders"],
      explanation: md`Opex and tax first (keep the plant running), then senior lenders, then the reserves that protect them, then the lock-up test; equity is paid last and only if tests pass.`,
      concepts: ["m10.cfads-waterfall"],
      difficulty: 1,
    },
    {
      id: "m10-l04-q3",
      type: "mcq",
      prompt: "The sculpted debt capacity of a project is USD 461 m and the lenders' maximum gearing gives USD 448 m. Which statement is correct?",
      options: [
        "Debt = 461 m and DSCR equals the 1.25x target",
        "Debt = 448 m; the gearing cap binds and the achieved DSCR is above the target",
        "Debt = 448 m; the DSCR falls below target",
        "Debt = average of the two",
      ],
      answer: 1,
      explanation: md`Debt is the lower of the two. With less debt than the cash flow could support, debt service is scaled down and DSCR rises (1.287x vs 1.25x in the base case).`,
      concepts: ["m10.debt-sculpting"],
      difficulty: 1,
    },
    {
      id: "m10-l04-q4",
      type: "multi",
      prompt: "Which statements about LLCR and PLCR are correct? (Select all that apply.)",
      options: [
        "LLCR discounts CFADS over the remaining loan life, normally at the loan interest rate",
        "With perfect sculpting, LLCR equals the DSCR",
        "PLCR exceeds LLCR when there are positive cash flows after debt maturity (a tail)",
        "PLCR is always below 1.0 for a healthy project",
        "A PPA term equal to the debt tenor gives PLCR = LLCR",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`PLCR adds the post-maturity CFADS; with no tail it equals LLCR. Healthy projects have cover ratios well above 1.0 (base case 1.287x and 1.377x).`,
      concepts: ["m10.cover-ratios"],
      difficulty: 2,
    },
    {
      id: "m10-l04-q5",
      type: "numeric",
      prompt: md`In the base case, project IRR is 6.45 % and debt costs 5.5 %. If the gearing cap rises so that debt = USD 461.4 m (equity 98.6 m), equity IRR rises to 9.30 %. By how many percentage points did equity IRR increase from the 8.97 % base? (2 decimals)`,
      answer: 0.33,
      tolerance: { abs: 0.01 },
      unit: "percentage points",
      explanation: md`$9.30 - 8.97 = 0.33$ points. Positive leverage: each extra dollar of 5.5 % debt replaces equity in an asset earning 6.45 %, raising the equity return — and the equity's sensitivity to underperformance.`,
      concepts: ["m10.equity-irr"],
      difficulty: 1,
    },
    {
      id: "m10-l04-q6",
      type: "label",
      prompt: "Label the parties in a Kuwait PPP/IPP structure.",
      diagram: "ppp-structure",
      markers: [
        { id: "offtaker", answer: "MEWRE (PPA offtaker)" },
        { id: "spv", answer: "Project company (SPV)" },
        { id: "lenders", answer: "Senior lenders" },
        { id: "kapp", answer: "KAPP (procurer, holds IPO shares)" },
        { id: "epc", answer: "EPC contractor" },
      ],
      options: ["MEWRE (PPA offtaker)", "Project company (SPV)", "Senior lenders", "KAPP (procurer, holds IPO shares)", "EPC contractor", "CAPT", "Audit Bureau"],
      explanation: md`MEWRE buys the power; the SPV owns the plant; lenders hold security over the SPV; KAPP runs procurement under PPP Law 116/2014 and warehouses IPO shares; the EPC contractor builds. CAPT oversees conventional public tenders and the Audit Bureau performs prior review — neither is a party to the project contracts.`,
      concepts: ["m10.project-finance"],
      difficulty: 1,
    },
    {
      id: "m10-l04-q7",
      type: "decision",
      prompt: md`At financial close, the preferred bidder's lenders ask MEWRE to add a clause paying "deemed energy" for any curtailment by the National Control Centre, uncapped. The RFP draft PPA capped compensable curtailment at a fixed number of hours per year. You are the PM. What do you recommend?`,
      options: [
        { text: "Accept — without it the project won't close and the summer capacity is needed.", score: 0.2, feedback: "Uncapped deemed energy shifts open-ended grid risk to MEWRE after bids were priced on the RFP terms; other bidders could have priced it too." },
        { text: "Refuse any discussion; the RFP terms are final.", score: 0.4, feedback: "Holding the line protects competition, but lenders' concerns may be legitimate; refusing to engage risks a failed close." },
        { text: "Engage via KAPP: quantify expected curtailment from grid studies, consider a cap or a tariff-neutral trade (e.g. a slightly higher cap with no tariff increase), document why it does not alter the competitive outcome, and seek Fatwa/Audit Bureau-proof approval.", score: 1, feedback: "Correct: quantify, protect the procurement's integrity, use the right channel and approvals." },
      ],
      explanation: md`Curtailment exposure is real for 1 GW+ of PV on Kuwait's grid. The offtaker should price the risk with grid-study evidence and avoid post-bid changes that would have changed the ranking. KAPP leads negotiations; MEWRE supplies grid evidence.`,
      concepts: ["m10.project-finance", "m10.cover-ratios"],
      difficulty: 3,
    },
  ],
  flashcards: [
    { id: "m10-l04-f1", front: "Non-recourse (limited-recourse) finance", back: "Lenders are repaid only from the SPV's cash flows and assets, with limited sponsor support.", concepts: ["m10.project-finance"] },
    { id: "m10-l04-f2", front: "CFADS", back: "Revenue − opex − tax − Δworking capital − reserve transfers; the cash available for senior debt service.", concepts: ["m10.cfads-waterfall"] },
    { id: "m10-l04-f3", front: "Sculpted debt capacity", back: md`$\sum (\mathrm{CFADS}_t/\mathrm{DSCR}_{target})/(1+k_d)^t$ over the tenor`, concepts: ["m10.debt-sculpting"] },
    { id: "m10-l04-f4", front: "Final debt amount", back: "min(sculpted capacity, max gearing × capex)", concepts: ["m10.debt-sculpting"] },
    { id: "m10-l04-f5", front: "Typical DSRA", back: "6 months of next debt service, funded in cash or by letter of credit.", concepts: ["m10.reserves-covenants"] },
    { id: "m10-l04-f6", front: "Lock-up vs default DSCR (typical)", back: "Lock-up ~1.10–1.15x (dividends trapped); default ~1.05x (event of default).", concepts: ["m10.reserves-covenants"] },
    { id: "m10-l04-f7", front: "Base-case returns", back: "Project IRR 6.45 %, equity IRR 8.97 %, debt 448 m (80 %, gearing-bound), DSCR 1.287x, PLCR 1.377x.", concepts: ["m10.equity-irr", "m10.cover-ratios"] },
    { id: "m10-l04-f8", front: "PLCR > LLCR means…", back: "There is a cash-flow tail after debt maturity (here 5 years) that lenders can use if the loan needs extending.", concepts: ["m10.cover-ratios"] },
    { id: "m10-l04-f9", front: "What does the LTA do?", back: "Lenders' technical advisor: due diligence on design, yield, contracts and schedule; monitors construction; certifies completion.", concepts: ["m10.project-finance"] },
  ],
  scenarios: [
    {
      id: "m10-s3",
      title: "Rates rose while the award waited for approvals",
      context: md`The preferred bidder for a 1.1 GW solar IPP bid 1.80 US cents/kWh (illustrative) with debt priced at 5.5 % all-in. Approvals took seven months; base rates are now ~100 bp higher. The bidder writes to KAPP and MEWRE asking for a tariff increase to 1.91 cents "to restore the bid economics", noting that its interest-rate hedge covered only 50 % of the debt. The RFP contained no tariff-adjustment mechanism for interest rates.`,
      start: "a",
      concepts: ["m10.equity-irr", "m10.debt-sculpting", "m10.project-finance"],
      nodes: {
        a: {
          md: md`What is your first step as MEWRE's PM on the evaluation team?`,
          choices: [
            { text: "Reject in writing immediately: the bid is binding.", score: 4, feedback: "Legally strong, but you have not assessed whether the project can still close; a failed close costs MEWRE a summer of capacity.", next: "c" },
            { text: "Verify the claim with the model: what does +100 bp do to debt, DSCR and equity IRR, and what does the 50 % hedge recover?", score: 9, feedback: "Quantify before deciding; distinguish the hedged from the unhedged exposure.", next: "b" },
            { text: "Agree informally to 'look at it' to keep the bidder engaged.", score: 1, feedback: "Signals that bids are negotiable after award — damaging for this and future tenders.", next: "c" },
          ],
        },
        b: {
          md: md`Your rerun: +100 bp on all debt → equity IRR 6.35 %, tariff to restore 1.906 cents. With 50 % hedged, the unhedged effect is roughly half. The second-ranked bid was 1.88 cents (levelized).`,
          choices: [
            { text: "Recommend no tariff change: the bidder chose its hedge level; a revised 1.906 would exceed the second-ranked bid, so changing it would alter the competitive outcome. Offer non-price help that is within RFP terms (faster CPs, approvals timetable).", score: 10, feedback: "Protects procurement integrity with evidence and keeps the project moving." },
            { text: "Split the difference at 1.85 cents.", score: 3, feedback: "Still below the second bid, but a post-award price change without an RFP mechanism invites challenge and Audit Bureau questions." },
            { text: "Recommend re-tendering immediately.", score: 4, feedback: "Premature — first test whether the bidder will close on its bid; re-tendering costs a year." },
          ],
        },
        c: {
          md: md`The bidder escalates to the Minister's office, claiming MEWRE "refused to discuss". The Undersecretary asks you for a one-page brief by tomorrow.`,
          choices: [
            { text: "Prepare the brief with the quantified impact, the hedge position, the comparison with the second-ranked bid, and the recommendation to hold the tariff while facilitating close; propose an RFP interest-rate mechanism for future rounds.", score: 8, feedback: "Recovers well: evidence, integrity, and a lesson learned for the next tender." },
          ],
        },
      },
    },
  ],
};

export default lesson;
