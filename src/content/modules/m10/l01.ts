import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m10-l01",
  title: "Time Value of Money: Discounting, NPV, IRR, MIRR, Payback and WACC",
  summary:
    "Derive discounting from first principles, then use NPV, IRR, MIRR and payback correctly — including the IRR traps (multiple IRRs, reinvestment, scale), real vs nominal rates and how WACC sets the discount rate for an IPP.",
  minutes: 75,
  objectives: [
    "Derive the discount factor and compute NPV for an uneven cash-flow stream, including the Excel year-0 trap",
    "Explain when IRR misleads (multiple sign changes, reinvestment assumption, scale) and use MIRR or NPV instead",
    "Compute simple and discounted payback and say what they do and do not tell a decision-maker",
    "Convert between real and nominal rates with the Fisher relation and keep cash flows and rates on the same basis",
    "Build a WACC from gearing, cost of debt and cost of equity and explain why it drives Gulf solar tariffs",
  ],
  concepts: [
    { id: "m10.time-value", name: "Time value of money", description: "A unit of money today is worth more than the same unit later because it can earn a return; discounting converts future cash to present value.", competency: "finance" },
    { id: "m10.npv", name: "Net present value", description: "Sum of discounted cash flows at the opportunity cost of capital; the primary value-creation criterion.", competency: "finance", related: ["m10.time-value", "m10.wacc", "m00.economic-vs-financial", "m12.lifecycle-cost"] },
    { id: "m10.irr", name: "Internal rate of return and its pitfalls", description: "The discount rate at which NPV = 0; can be multiple, assumes reinvestment at IRR and ignores scale.", competency: "finance", related: ["m10.npv", "m10.mirr", "m14.model-audit"] },
    { id: "m10.mirr", name: "Modified IRR", description: "Rate that links finance-rate PV of outflows with reinvestment-rate FV of inflows; unique and more realistic than IRR.", competency: "finance", related: ["m10.irr"] },
    { id: "m10.payback", name: "Simple and discounted payback", description: "Time for cumulative (discounted) cash flow to turn positive; a liquidity and risk indicator, not a value measure.", competency: "finance", related: ["m10.npv"] },
    { id: "m10.real-nominal", name: "Real vs nominal and inflation", description: "Nominal flows include inflation and are discounted at nominal rates; real flows at real rates (Fisher relation).", competency: "finance", related: ["m10.time-value"] },
    { id: "m10.wacc", name: "Weighted average cost of capital", description: "Blended required return of debt and equity weighted by the capital structure; discount rate for project cash flows.", competency: "finance", related: ["m10.npv", "m10.real-nominal"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Why money has a time value — and the algebra that follows",
      blocks: [
        {
          kind: "md",
          md: md`Every financial number in a solar IPP — the tariff, the debt size, the lenders' cover ratios, the offtaker's long-term liability — is a statement about cash at different dates. You cannot add USD 46 m received in 2028 to USD 35 m received in 2055 any more than you can add MW to MWh. **Discounting** is the unit conversion.

**Derivation.** Suppose capital can earn a return $r$ per year in its next-best use (the *opportunity cost of capital*). Invest an amount $PV$ today and after one year you hold $PV(1+r)$; after $t$ years, by compounding, $PV(1+r)^t$. If a project instead promises $CF_t$ in year $t$, the most you should pay today is the amount that would grow to the same sum at your alternative return:

$$PV(1+r)^t = CF_t \quad\Rightarrow\quad PV = \frac{CF_t}{(1+r)^t}.$$

The factor $DF_t = (1+r)^{-t}$ is the **discount factor**. It is not a "penalty" invented by finance people; it is the exchange rate between dates implied by the return capital can earn elsewhere.`,
        },
        { kind: "equation", formula: "m10-pv-discount" },
        {
          kind: "md",
          md: md`A sense of scale at a typical IPP discount rate of 6.2 %:

| Year | 1 | 5 | 10 | 20 | 25 | 30 |
|---|---|---|---|---|---|---|
| Discount factor at 6.2 % | 0.9416 | 0.7402 | 0.5480 | 0.3003 | 0.2223 | 0.1645 |
| Discount factor at 10 % | 0.9091 | 0.6209 | 0.3855 | 0.1486 | 0.0923 | 0.0573 |

A kWh generated in year 30 is worth about one sixth of a year-1 kWh at 6.2 %, and one seventeenth at 10 %. Two consequences recur in every later lesson: (1) **capital-intensive, long-lived assets like PV are extremely sensitive to the discount rate**, and (2) anything that happens late — degradation in year 25, a tariff step in year 20 — matters much less than its nominal size suggests.

### Net present value

Sum the discounted cash flows of a project, with investment as negative flows:`,
        },
        { kind: "equation", formula: "m10-npv" },
        {
          kind: "md",
          md: md`**Interpretation:** NPV is the wealth created today after every provider of capital has been repaid with their required return. NPV > 0 → the project earns more than $r$; NPV = 0 → it earns exactly $r$; NPV < 0 → capital would do better elsewhere. NPV is **additive** (NPV of A + B = NPV(A) + NPV(B)), which is why it is the correct criterion for choosing between mutually exclusive options and for portfolio decisions.

**Timing convention.** Unless stated, cash flows sit at the end of each year and year 0 is "today" (or COD, with interest during construction already rolled into the capex). Mid-year discounting ($t-0.5$) is common in lenders' models for operating flows; it raises NPV slightly. State your convention — a reviewer's first question.

### Internal rate of return

IRR is the discount rate that makes NPV = 0:`,
        },
        { kind: "equation", formula: "m10-irr" },
        {
          kind: "md",
          md: md`It is a polynomial root in $x = 1/(1+\mathrm{IRR})$, solved iteratively. Its appeal is that it is scale-free and comparable with a hurdle rate ("this project returns 13.9 % against our 6 %"). Its three classic traps:

**1. Multiple (or no) IRRs.** By Descartes' rule of signs, a polynomial can have as many positive roots as its coefficient sequence has sign changes. A *conventional* project (−, +, +, …, +) has one IRR. A project with a large late outflow — decommissioning and land restoration, a mid-life BESS augmentation, an equity cash flow that turns negative when a debt-service reserve must be refilled — can have two. Example: cash flows $(-100, +230, -132)$ give NPV = 0 at **both 10 % and 20 %**; the NPV is positive only between them. "The IRR" is meaningless; use NPV at the actual cost of capital, or MIRR.

**2. Reinvestment assumption.** The IRR equation is mathematically equivalent to assuming every interim cash flow is reinvested at the IRR itself until the end. For a project with a 25 % IRR that is fantasy; for an IPP whose dividends are reinvested at the sponsor's cost of capital it overstates the realised return.

**3. Scale (and timing) blindness.** Project A: invest 100, receive 130 next year → IRR 30 %, NPV at 10 % = 18.2. Project B: invest 1,000, receive 1,200 → IRR 20 %, NPV = 90.9. If you can only do one, B creates five times the value despite the lower IRR. Similar reversals occur between projects with different cash-flow timing (a fast-payback option vs a long-lived one).`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why practitioners still quote IRR",
          md: md`Sponsors bid for IPPs against an **equity IRR hurdle** because it is independent of project size and maps directly to their board's required return; lenders look at cover ratios instead. The rule: **decide with NPV, communicate with IRR, and check MIRR whenever the cash-flow profile is unusual.** When a consultant tells MEWRE "option X has the higher IRR", the PM's reply is "what are the NPVs at our discount rate, and are the options the same size and life?"`,
        },
        { kind: "equation", formula: "m10-mirr" },
        {
          kind: "md",
          md: md`**MIRR** removes the reinvestment bias: compound all positive flows forward to year $N$ at a realistic reinvestment rate, discount all negative flows to year 0 at the finance rate, then solve the single growth rate between them. It always has exactly one solution. Excel: =MIRR(values, finance_rate, reinvest_rate).

### Payback

Payback answers "how long until we get our money back?":`,
        },
        { kind: "equation", formula: "m10-payback" },
        {
          kind: "md",
          md: md`**Simple payback** uses raw cash flows; **discounted payback** uses discounted ones and is always longer (for the base-case 1,100 MW IPP: 12.6 vs 27.7 years at 6.2 %). Payback ignores everything after the break-even point and ignores the cost of capital (simple version), so it cannot rank value — but it is a useful proxy for exposure to things you cannot model: political risk, technology obsolescence, a government's appetite for long liabilities.

### Real versus nominal, and inflation

A **nominal** cash flow is in money of the day; a **real** one is in constant purchasing power (e.g. "2026 USD"). Rates follow the same split:`,
        },
        { kind: "equation", formula: "m10-fisher" },
        {
          kind: "md",
          md: md`The golden rule: **nominal flows at nominal rates, real flows at real rates.** Do it consistently and you get the same NPV either way (proof: a nominal flow $C(1+i)^t$ discounted at $(1+r_r)^t(1+i)^t$ equals the real flow $C$ discounted at $(1+r_r)^t$). Mix them and you are wrong by roughly inflation × life — easily 30–50 % of NPV.

Typical traps on IPP work: a flat USD PPA tariff is **nominal** (it loses value in real terms); O&M contracts escalate with an index (nominal); IRENA reports LCOE in **real** terms with a real WACC; many consultants' "8 % discount rate" never says which. Always ask.

### WACC — where the discount rate comes from

A project is funded by debt and equity. Each demands a return; the project must earn the blend:`,
        },
        { kind: "equation", formula: "m10-wacc" },
        { kind: "equation", formula: "m10-capm" },
        {
          kind: "md",
          md: md`For a Gulf solar IPP the numbers that matter: senior debt at **70–85 % gearing** priced at a base rate plus a margin (all-in ~5–6.5 % in USD in recent years), and equity at a sponsor hurdle typically in the high single digits for contracted assets with a sovereign offtaker. The base case used throughout this module: 80 % debt at 5.5 %, 20 % equity at 9 %, no corporate tax in the teaching model → WACC = 6.2 % nominal.

Note what this implies: **most of the tariff is a financing charge.** A 1 percentage-point change in WACC moves PV LCOE by about 8 % (Lesson 2). That is why offtaker credit quality, the PPA's bankability (termination payments, currency, change-in-law protection) and Kuwait's sovereign rating feed straight into the tariff MEWRE pays.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Worked examples: a MEWRE cleaning investment and the IPP's discount rate",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "NPV, IRR, MIRR and payback for a robotic dry-cleaning retrofit",
          given: md`MEWRE owns a 10 MWp fixed-tilt PV plant (a Shagaya-type pilot). It is cleaned monthly with water trucks. A robotic dry-cleaning system is proposed:
- Capex KWD 180,000 at year 0; life 10 years.
- Soiling loss falls from 6 % to 2 % of 18,500 MWh/yr → +740 MWh/yr, valued at an **assumed** avoided fuel cost of 20 fils/kWh (within the 14–26 fils range of published cost estimates; replace with MEWRE's official avoided cost).
- Manual cleaning saved KWD 30,000/yr; robot O&M KWD 8,000/yr; robot battery replacement KWD 25,000 in year 5.
- Discount rate 6 % (nominal; all flows nominal and flat for simplicity).`,
          steps: [
            { md: md`**Annual net benefit (years 1–10, except 5):** energy $740{,}000\text{ kWh}\times 0.020 = 14{,}800$ + cleaning saving 30,000 − robot O&M 8,000 = **KWD 36,800**. Year 5: 36,800 − 25,000 = **KWD 11,800**.` },
            {
              md: md`**Cash-flow table** (KWD):

| Year | Cash flow | DF at 6 % | Discounted | Cumulative | Cum. discounted |
|---|---|---|---|---|---|
| 0 | −180,000 | 1.0000 | −180,000 | −180,000 | −180,000 |
| 1 | 36,800 | 0.9434 | 34,717 | −143,200 | −145,283 |
| 2 | 36,800 | 0.8900 | 32,752 | −106,400 | −112,531 |
| 3 | 36,800 | 0.8396 | 30,898 | −69,600 | −81,633 |
| 4 | 36,800 | 0.7921 | 29,149 | −32,800 | −52,484 |
| 5 | 11,800 | 0.7473 | 8,818 | −21,000 | −43,666 |
| 6 | 36,800 | 0.7050 | 25,943 | 15,800 | −17,724 |
| 7 | 36,800 | 0.6651 | 24,474 | 52,600 | 6,750 |
| 8 | 36,800 | 0.6274 | 23,089 | 89,400 | 29,839 |
| 9 | 36,800 | 0.5919 | 21,782 | 126,200 | 51,621 |
| 10 | 36,800 | 0.5584 | 20,549 | 163,000 | 72,170 |`,
            },
            { md: md`**NPV at 6 %** = last cumulative discounted value = **KWD 72,170** > 0 → worth doing at this avoided cost.` },
            { md: md`**IRR** (solve NPV = 0 by iteration): **13.85 %**. Check: at 13.85 % the discounted sum is ≈ 0.` },
            { md: md`**Simple payback:** cumulative turns positive in year 6: $PB = 5 + 21{,}000/36{,}800 = 5.57$ years. **Discounted payback:** $6 + 17{,}724/24{,}474 = 6.72$ years.` },
            { md: md`**MIRR** (finance and reinvest at 6 %): FV of inflows at year 10 = 451,598; PV of outflows = 180,000; $\mathrm{MIRR} = (451{,}598/180{,}000)^{1/10} - 1 = 9.63\%$ — well below the 13.85 % IRR, because the IRR assumes the KWD 36,800 inflows earn 13.85 % when reinvested.` },
          ],
          result: md`NPV KWD 72,170; IRR 13.85 %; MIRR 9.63 %; payback 5.6 years simple, 6.7 years discounted. The decision is robust only if the avoided cost is right: at 14 fils/kWh the energy benefit drops to KWD 10,360/yr — recompute before recommending.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Build the IPP discount rate and convert it to real terms",
          given: md`The 1,100 MW PV IPP base case: gearing 80 %, all-in debt 5.5 %, cost of equity 9 %, no corporate tax. Expected USD inflation 2 %/yr. A nominal CFADS of USD 50 m arrives in year 10.`,
          steps: [
            { md: md`WACC $= 0.20\times 9\% + 0.80\times 5.5\%$.` },
            { md: md`WACC = 1.8 % + 4.4 % = **6.20 %** nominal.`, hidden: true, check: { prompt: "Nominal WACC", answer: 6.2, unit: "%", tolerance: { abs: 0.01 } } },
            { md: md`Real WACC from Fisher: $r_r = 1.062/1.02 - 1$.` },
            { md: md`$r_r = 4.12\%$ (not 4.20 %).`, hidden: true, check: { prompt: "Real WACC", answer: 4.12, unit: "%", tolerance: { abs: 0.01 } } },
            { md: md`Nominal route: $PV = 50/1.062^{10} = 27.40$ USD m. Real route: real flow $= 50/1.02^{10} = 41.02$ (2026 USD), then $41.02/1.0412^{10} = 27.40$ USD m. Same answer — consistency is what matters.` },
          ],
          result: md`WACC 6.20 % nominal = 4.12 % real. Both routes give PV USD 27.40 m. Discounting the nominal 50 m at the real rate would give 33.4 m — a 22 % overstatement from one mixed assumption.`,
        },
        {
          kind: "question",
          question: {
            id: "m10-l01-p1",
            type: "numeric",
            prompt: md`A Kuwait solar PPA pays a **flat** 1.80 US cents/kWh for 30 years with no indexation. With 2 % annual USD inflation, what is the year-30 tariff expressed in year-0 (real) money? Give US cents/kWh to 3 decimals.`,
            answer: 0.994,
            tolerance: { abs: 0.005 },
            unit: "US cents/kWh",
            explanation: md`Real value $= 1.80/1.02^{30} = 1.80/1.8114 = 0.994$ cents. The offtaker's real burden falls by 45 % over the PPA — one reason flat USD tariffs look attractive to the buyer and why sponsors price inflation risk on opex into the bid.`,
            concepts: ["m10.real-nominal"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Using these tools inside a ministry",
      blocks: [
        {
          kind: "md",
          md: md`**Who computes what.** On a KAPP-procured IPP, KAPP's transaction advisor runs the feasibility study and the public-sector comparator; bidders and their lenders build the project-finance models; the Ministry of Finance cares about the fiscal commitment (the present value of 30 years of PPA payments); MEWRE as offtaker owns the energy-yield assumptions, the grid-connection timing and the long-term budget for payments. On MEWRE's own capital works (substations, lines, pilot plants), the ministry's planning and budget units and its consultants run the appraisal. In all cases the PM must be able to **audit** the numbers, not just receive them.

**Discount rates in practice.**
- *Sponsor/bidder:* equity IRR hurdle; project cash flows at WACC.
- *Lenders:* the loan interest rate (for LLCR/PLCR, Lesson 4).
- *Offtaker evaluation:* a published evaluation rate used to levelize bids (Lesson 5).
- *Government appraisal:* a social or fiscal discount rate set by policy — many governments publish one (e.g. the UK Green Book uses 3.5 % real); Kuwait-specific guidance was not found in the course research, so ask the Ministry of Finance/KAPP which rate applies and whether it is real or nominal.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Five errors that reach ministers' desks",
          md: md`1. **Excel NPV off-by-one:** =NPV(r, B1:B31) treats B1 as year 1; if B1 is the year-0 capex the result is understated by a factor $(1+r)$. Correct: =B1 + NPV(r, B2:B31).
2. **Mixed bases:** nominal cash flows discounted at a real rate (or real LCOE compared with a nominal tariff).
3. **IRR ranking of options with different sizes or lives** (e.g. a 300 MW vs a 1,100 MW layout).
4. **Ignoring the multiple-IRR warning** on equity flows with reserve refills or decommissioning.
5. **Sunk costs included:** money already spent (e.g. feasibility studies) is not a cash flow of the decision; only incremental flows count.`,
        },
        {
          kind: "checklist",
          title: "PM checks on any NPV/IRR you are given",
          items: [
            "Is the year-0 convention stated, and is capex at year 0 or spread over construction with IDC?",
            "Are cash flows and the discount rate both nominal (or both real)? What inflation is assumed?",
            "Whose cash flows are they — project (unlevered) or equity (after debt service)? Is the matching rate used (WACC vs cost of equity)?",
            "Are only incremental cash flows included (no sunk costs, include opportunity costs such as land or grid capacity)?",
            "Does the cash-flow profile change sign more than once? If so, ignore IRR and look at NPV/MIRR.",
            "Is the comparison between mutually exclusive options made on NPV, with equal lives or an equivalent-annual basis?",
            "Has a sensitivity on the discount rate been shown (±1–2 points)?",
          ],
        },
        {
          kind: "ask",
          title: "Questions for the consultant or bidder",
          items: [
            "Which discount rate did you use, is it real or nominal, and how was it derived?",
            "Please show the NPV at our evaluation rate as well as the IRR, and the MIRR at a 6 % reinvestment rate.",
            "What tax, inflation and FX assumptions sit inside the cash flows?",
            "If the main revenue driver falls by 10 %, what happens to NPV and payback?",
          ],
        },
        { kind: "scenario", scenario: "m10-s1" },
        {
          kind: "feynman",
          prompt: "Explain to a senior MEWRE engineer with no finance background why a project with a 30 % IRR can be worse than one with a 15 % IRR, and what number you would use instead.",
          keyPoints: [
            "Discounting converts money at different dates into today's money using the return capital could earn elsewhere",
            "NPV measures value created in currency; IRR is a rate and ignores size",
            "A small project can have a high IRR but create little value; NPV is additive and ranks mutually exclusive options",
            "IRR assumes reinvestment at the IRR and can have multiple values when cash flows change sign more than once",
            "Use NPV at the correct discount rate to decide; quote IRR/MIRR for communication",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m10-l01-q1",
      type: "numeric",
      prompt: md`What is the present value of USD 46.55 m received at the end of year 1 and again at the end of year 2, at 6.2 %? (USD m, 2 decimals)`,
      answer: 85.10,
      tolerance: { abs: 0.05 },
      unit: "USD m",
      explanation: md`$46.55/1.062 + 46.55/1.062^2 = 43.83 + 41.27 = 85.10$ USD m. Each year is discounted by its own factor.`,
      concepts: ["m10.time-value", "m10.npv"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m10-l01-q2",
      type: "mcq",
      prompt: md`Cash flows $(-100, +230, -132)$ have NPV = 0 at both 10 % and 20 %. The sponsor's cost of capital is 8 %. What should you conclude?`,
      options: [
        "Accept: both IRRs exceed 8 %",
        "Reject: NPV at 8 % is negative; the IRR rule fails when cash flows change sign twice",
        "Accept if the average IRR (15 %) exceeds 8 %",
        "The project cannot be evaluated",
      ],
      answer: 1,
      explanation: md`NPV at 8 % $= -100 + 230/1.08 - 132/1.08^2 = -100 + 212.96 - 113.17 = -0.21$ → slightly negative. NPV is positive only between 10 % and 20 %. With two sign changes the "IRR > hurdle" rule is unreliable; NPV at the actual cost of capital decides.`,
      concepts: ["m10.irr", "m10.npv"],
      difficulty: 2,
    },
    {
      id: "m10-l01-q3",
      type: "multi",
      prompt: "Which statements about IRR are correct? (Select all that apply.)",
      options: [
        "It implicitly assumes interim cash flows are reinvested at the IRR",
        "It is unaffected by the size of the investment, so it can mis-rank mutually exclusive projects",
        "A conventional cash-flow profile (one sign change) has exactly one IRR",
        "Equity IRR is always lower than project IRR",
        "Excel's IRR function needs the year-0 cash flow included in the range",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`Equity IRR is higher than project IRR when debt is cheaper than the project return (positive leverage) — in the base case 8.97 % vs 6.45 %. It can be lower if debt costs more than the project earns. The other statements are true; note that IRR(range) must include year 0, unlike NPV().`,
      concepts: ["m10.irr"],
      difficulty: 2,
    },
    {
      id: "m10-l01-q4",
      type: "numeric",
      prompt: md`Nominal WACC is 7.0 % and expected inflation 2.5 %. What is the real WACC? (%, 2 decimals)`,
      answer: 4.39,
      tolerance: { abs: 0.02 },
      unit: "%",
      explanation: md`$1.07/1.025 - 1 = 4.39\%$. The shortcut 7.0 − 2.5 = 4.5 % overstates the real rate by ~0.1 point — small per year, material over 30 years.`,
      concepts: ["m10.real-nominal"],
      difficulty: 1,
    },
    {
      id: "m10-l01-q5",
      type: "numeric",
      prompt: md`An IPP has 75 % debt at 6.0 % and 25 % equity at 10 %, with no tax shield. What is its WACC? (%)`,
      answer: 7.0,
      tolerance: { abs: 0.01 },
      unit: "%",
      explanation: md`$0.25\times 10 + 0.75\times 6.0 = 2.5 + 4.5 = 7.0\%$. Compared with the base case (6.2 %) this would raise PV LCOE by roughly 6–7 % (Lesson 2).`,
      concepts: ["m10.wacc"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m10-l01-q6",
      type: "decision",
      prompt: md`A consultant recommends Layout X (IRR 14 %, NPV KWD 2.1 m) over Layout Y (IRR 11 %, NPV KWD 4.8 m) for a MEWRE-owned PV extension. Only one layout can be built. You are the PM. What do you do?`,
      options: [
        { text: "Accept X — the higher IRR shows it is the more efficient use of capital.", score: 0, feedback: "IRR ignores scale; with only one choice the decision criterion is NPV." },
        { text: "Choose Y on NPV, but first confirm both use the same discount rate, life and incremental cash flows, and that MEWRE has no capital rationing that would make X plus another project better.", score: 1, feedback: "Correct: NPV ranks mutually exclusive options; checking assumptions and capital constraints is good practice." },
        { text: "Average the two IRRs and pick the one closer to the average.", score: 0, feedback: "Not a decision rule." },
        { text: "Choose the one with the shorter payback to reduce risk.", score: 0.3, feedback: "Payback is a useful risk indicator, but it ignores value after break-even; it should not override a clear NPV difference without a specific risk argument." },
      ],
      explanation: md`Mutually exclusive, single choice → highest NPV at the correct rate. IRR is a communication metric. Check for capital rationing: if the budget is fixed and X frees capital for another positive-NPV project, compare portfolios (NPV of X + other vs NPV of Y).`,
      concepts: ["m10.npv", "m10.irr"],
      difficulty: 2,
    },
    {
      id: "m10-l01-q7",
      type: "short",
      prompt: "Why is discounted payback always longer than simple payback for a conventional project, and why is neither a measure of value?",
      rubric: [
        "Discounted inflows are smaller than nominal inflows when r > 0, so recovery takes longer",
        "Payback ignores cash flows after the break-even year",
        "Simple payback ignores the cost of capital entirely",
        "Payback is a liquidity/risk indicator; NPV measures value",
      ],
      modelAnswer: "Each future inflow is divided by (1+r)^t > 1, so the cumulative discounted sum rises more slowly and crosses zero later. Both measures stop counting at the break-even year, so a project that keeps earning for 20 more years looks no better than one that stops — and simple payback also ignores the cost of capital. They indicate how long capital is exposed, not how much value is created; NPV does that.",
      explanation: md`For the robotic-cleaning example: simple payback 5.57 years, discounted 6.72 years. Both ignore the KWD 36,800/yr earned in years 7–10 beyond break-even, which NPV captures.`,
      concepts: ["m10.payback"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "m10-l01-f1", front: "Discount factor for year t at rate r", back: md`$DF_t = 1/(1+r)^t$`, concepts: ["m10.time-value"] },
    { id: "m10-l01-f2", front: "Excel NPV() trap", back: "NPV(r, range) treats the first cell as year 1 — add the year-0 flow outside: =CF0 + NPV(r, CF1:CFN).", concepts: ["m10.npv"] },
    { id: "m10-l01-f3", front: "Three IRR pitfalls", back: "Multiple/no IRRs with non-conventional flows; reinvestment at IRR assumption; scale/timing blindness for mutually exclusive projects.", concepts: ["m10.irr"] },
    { id: "m10-l01-f4", front: "What does MIRR fix?", back: "Uses an explicit finance rate for outflows and reinvestment rate for inflows → a unique, realistic return.", concepts: ["m10.mirr"] },
    { id: "m10-l01-f5", front: "Fisher relation", back: md`$(1+r_n) = (1+r_r)(1+i)$ — discount nominal flows at nominal rates, real at real.`, concepts: ["m10.real-nominal"] },
    { id: "m10-l01-f6", front: "WACC formula", back: md`$\frac{E}{V}k_e + \frac{D}{V}k_d(1-T)$`, concepts: ["m10.wacc"] },
    { id: "m10-l01-f7", front: "Base-case IPP WACC in this module", back: "80 % debt at 5.5 % + 20 % equity at 9 %, no tax → 6.2 % nominal (4.12 % real at 2 % inflation).", concepts: ["m10.wacc"] },
    { id: "m10-l01-f8", front: "Decision rule for mutually exclusive options", back: "Choose the highest NPV at the correct discount rate (not the highest IRR).", concepts: ["m10.npv"] },
    { id: "m10-l01-f9", front: "Discounted payback vs simple payback (base IPP)", back: "12.6 years simple vs 27.7 years discounted at 6.2 % — a long-lived, low-margin contracted asset.", concepts: ["m10.payback"] },
  ],
  scenarios: [
    {
      id: "m10-s1",
      title: "The consultant's 'best option' memo",
      context: md`MEWRE is choosing between two options to supply a remote pumping station: (A) a 5 MW PV + 10 MWh BESS hybrid, capex KWD 6.0 m, NPV KWD 1.2 m, IRR 12 %; (B) a 20 MW PV + 40 MWh BESS that also exports to the 33 kV grid, capex KWD 21 m, NPV KWD 3.1 m, IRR 9 %. The consultant's memo, due at the Undersecretary tomorrow, recommends A "because it has the higher return".`,
      start: "a",
      concepts: ["m10.npv", "m10.irr", "m10.real-nominal"],
      nodes: {
        a: {
          md: md`You have one hour before the memo goes up. What is your first move?`,
          choices: [
            { text: "Forward the memo as is — the consultant is the expert.", score: 1, feedback: "You own what goes to the Undersecretary. An IRR-based ranking of different-size options is a known error.", next: "c" },
            { text: "Ask the consultant for the discount rate, real/nominal basis, and whether the options are mutually exclusive; flag that NPV, not IRR, should rank them.", score: 9, feedback: "Right questions first: rate, basis, exclusivity.", next: "b" },
            { text: "Rewrite the recommendation to B yourself without asking anything.", score: 4, feedback: "Probably the right answer on the numbers shown, but you have not checked the assumptions underneath them.", next: "b" },
          ],
        },
        b: {
          md: md`The consultant replies: rate 8 %, cash flows **real** (2026 KWD), but the 8 % was taken from a nominal bank-loan rate. Options are mutually exclusive (one site, one grid slot). Inflation assumption 2.5 %.`,
          choices: [
            { text: "Ask for a rerun at the consistent real rate (8 % nominal ≈ 5.4 % real) and for the export revenue in B to be stress-tested (curtailment, grid access date).", score: 10, feedback: "Excellent: fixing the basis error raises both NPVs, B's more (longer, larger flows), and stress-testing B's extra revenue addresses its real risk.", next: "d" },
            { text: "Accept the numbers; the basis does not change the ranking.", score: 4, feedback: "Here the ranking probably holds, but the absolute NPVs going to the Undersecretary are wrong and B's export assumptions are untested." },
          ],
        },
        c: {
          md: md`Two weeks later the Ministry of Finance's reviewer returns the memo asking why the smaller option was chosen when the larger one adds more value.`,
          choices: [
            { text: "Withdraw the memo, redo the comparison on NPV with consistent real/nominal basis, and resubmit with a cover note explaining the correction.", score: 6, feedback: "Recovering openly is right, but the delay and credibility cost could have been avoided." },
          ],
        },
        d: {
          md: md`Rerun at 5.4 % real: NPV A = KWD 1.6 m, NPV B = KWD 4.4 m; B stays positive with 15 % export curtailment (NPV 2.7 m) but goes negative if the grid connection slips 3 years. How do you frame the recommendation?`,
          choices: [
            { text: "Recommend B on NPV, state the grid-connection dependency as the key risk with a mitigation (MEWRE Transmission commitment date in the approval), and show A as the fallback.", score: 10, feedback: "Value-based recommendation with the decisive risk made explicit and owned." },
            { text: "Recommend A because it has no dependency on grid works.", score: 5, feedback: "Defensible only if the grid date is genuinely unreliable; say so with evidence and quantify the value given up (KWD 2.8 m)." },
          ],
        },
      },
    },
  ],
};

export default lesson;
