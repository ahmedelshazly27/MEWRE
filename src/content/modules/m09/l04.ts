import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m09-l04",
  title: "Liquidated damages: delay and performance",
  summary:
    "How delay LDs are derived from lost revenue, debt costs and PPA penalties; how performance LDs buy down a capacity or PR shortfall; caps, sole-remedy wording and exclusions; genuine pre-estimate versus penalty in common law and the civil-law approach; worked calculations for a Kuwait-scale PV IPP.",
  minutes: 70,
  objectives: [
    "You can derive a defensible daily delay LD rate for a PV or BESS EPC from the project's financial exposure.",
    "You can calculate delay LDs after EOT, with sectional completion and the cap.",
    "You can calculate a performance buy-down LD from a PR or capacity shortfall using an annuity factor.",
    "You can explain caps, sole-remedy clauses, minimum performance levels and why lenders care where LD money goes.",
    "You can explain the penalty doctrine (Makdessi) and how civil-law systems control agreed damages.",
  ],
  concepts: [
    {
      id: "m09.delay-lds",
      name: "Delay liquidated damages",
      description:
        "A pre-agreed daily sum payable by the Contractor for each day completion is late beyond the (extended) Time for Completion; derived from the Employer's foreseeable loss.",
      competency: "contracts",
      related: ["m09.ld-cap"],
    },
    {
      id: "m09.performance-lds",
      name: "Performance liquidated damages (buy-down)",
      description:
        "One-off payment compensating the present value of a permanent shortfall against guaranteed capacity, PR, efficiency or availability, usually above a minimum acceptance level.",
      competency: "contracts",
      related: ["m09.ld-cap"],
    },
    {
      id: "m09.ld-cap",
      name: "LD caps and sole remedy",
      description:
        "Limits on delay LDs (typ. 10–20% of contract price), performance LDs and the aggregate; LDs usually the sole remedy for the breach they cover, with exclusions for fraud, gross negligence and wilful misconduct.",
      competency: "contracts",
    },
    {
      id: "m09.penalty-doctrine",
      name: "Penalty doctrine and agreed-damages control",
      description:
        "Common law strikes down clauses that are extravagant compared with the innocent party's legitimate interest (Makdessi 2015); civil-law systems let a judge reduce agreed damages that are grossly excessive.",
      competency: "contracts",
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Why LDs exist and how to size them",
      blocks: [
        {
          kind: "md",
          md: md`**Liquidated damages (LDs)** are a sum fixed in the contract that one party pays the other for a specified breach, instead of the actual (unliquidated) damages a court would assess. In FIDIC 2017 language, delay LDs are **Delay Damages** (Sub-Clause 8.8), and performance LDs are the **non-performance damages** for failing Tests after Completion (Yellow/Silver Clause 12) or the performance guarantee schedule.

Both sides benefit:

- **Employer:** certainty and speed. No need to prove the loss, which in an IPP is a complex mix of lost revenue, interest, PPA penalties and reputational damage. LDs can be deducted from IPCs once the claim procedure is followed.
- **Contractor:** a known, capped exposure it can price and insure. Without LDs it would face unliquidated (potentially much larger, uncapped) damages.
- **Lenders:** a bankable stream that covers debt service if the plant is late or underperforms.

### Delay LDs: deriving the daily rate

For a project-financed PV plant the SPV's daily loss from late completion has four parts:`,
        },
        { kind: "equation", formula: "m09-delay-ld-rate" },
        {
          kind: "md",
          md: md`1. **Lost revenue**: P50 energy per day times the tariff. Strictly the revenue is delayed, not lost forever, if the PPA term starts at COD; but if the PPA term runs from a fixed date (or the scheduled COD), every day late is a day of the 30-year term lost permanently.
2. **Extra interest during construction**: debt is drawn but not yet serviced from revenue; the SPV must fund interest from contingency or equity.
3. **PPA delay penalties**: what the SPV owes MEWRE for late COD (many PPAs impose daily delay LDs on the SPV, secured by the development security).
4. **Continuing fixed costs**: owner's team, insurances, land lease, Owner's Engineer.

Sanity check against market norms: PV EPC delay LDs are commonly expressed as a **percentage of contract price per day (around 0.03–0.1%)** or **USD per MWac per day**. Then the total, capped:`,
        },
        { kind: "equation", formula: "m09-delay-ld-total" },
        {
          kind: "md",
          md: md`**Sectional completion.** A 500 MW plant is usually taken over in **Sections** (blocks of 50–200 MW) so energy flows as each is ready. Each Section has its own Time for Completion and its own LD rate, normally pro rata to its capacity. Without Sections, a single late inverter station can delay the whole plant's Taking-Over and the whole LD rate applies.

**Prevention principle.** If the Employer causes delay and the contract has no mechanism to extend time for it, common-law courts may find time "at large": the Contractor must complete within a reasonable time and delay LDs fall away. FIDIC's 8.5(e) (Employer-caused delay) exists to keep LDs enforceable, so granting EOTs properly protects the Employer's right to LDs.

### Performance LDs: buying down a shortfall

If at the performance test the plant delivers less than guaranteed, the loss lasts for the whole PPA term. The buy-down converts that permanent annual loss into a present value:`,
        },
        { kind: "equation", formula: "m09-annuity-factor" },
        { kind: "equation", formula: "m09-perf-ld-pr" },
        { kind: "equation", formula: "m09-perf-ld-capacity" },
        {
          kind: "md",
          md: md`Typical PV EPC performance guarantees and remedies:

| Guarantee | Test basis | Tolerance / minimum | Remedy |
|---|---|---|---|
| AC capacity at POI at reference conditions | IEC TS 61724-2 capacity test | e.g. buy-down below 100%, rejection or mandatory remedy below 97% | USD per kW shortfall |
| Performance ratio (temperature-corrected) | IEC 61724-1 / TS 61724-3 over 7–30 days, then repeated at end of DNP | Measurement uncertainty band (e.g. 0.5–1 percentage point) deducted before LDs; minimum PR (e.g. 95–97% of guaranteed) | USD per 0.1 percentage point |
| Availability during reliability run | e.g. 98–99% over 30 days | Retest | Extended run or LDs |
| Auxiliary consumption / transformer losses | Metered | – | USD per kW of excess |
| BESS: usable energy, round-trip efficiency, response time | Capacity and RTE tests at POI | Minimum thresholds | USD per kWh / per % RTE |

**Minimum performance level.** Below it, the Employer is not obliged to accept money: the Contractor must remedy, and if it cannot, the Employer may reject the Works (FIDIC 9.4/12.4 style remedies). This stops a contractor from "buying its way out" of a fundamentally defective plant.

**Double counting.** A capacity shortfall and a PR shortfall can measure the same defect (e.g. underperforming modules). Contracts should say which LD applies or net one against the other.

**Where the money goes.** Lenders usually require performance LDs to be applied to **mandatory prepayment of debt**, to restore the debt service coverage ratio that the shortfall reduces. Delay LDs go to the SPV's revenue account to pay interest and PPA penalties.

### Caps, sole remedy and exclusions

| Item | Typical range in PV/BESS EPCs |
|---|---|
| Delay LD cap | **10–20%** of contract price |
| Performance LD cap | 10–15% of contract price |
| Aggregate LD cap | 20–30% |
| Overall liability cap | 100% of contract price (FIDIC 2017 default: the Accepted Contract Amount unless the Contract Data states otherwise) |
| Exclusions from caps | Fraud, gross negligence, deliberate default, reckless misconduct; often third-party indemnities and IP |

Under FIDIC 2017 8.8, delay damages are the **only** damages due from the Contractor for delay (other than on termination under 15.2 before completion). When the cap is reached, most contracts let the Employer **terminate** for default, because otherwise the Contractor would have no further financial incentive to finish.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why the LD must be close to the real loss",
          md: md`Set the rate too low and the Contractor may rationally prioritise another project, paying LDs cheaper than accelerating; the SPV then funds the gap. Set it too high and (a) bidders add contingency to every price, and (b) the clause may be attacked as a penalty or reduced by a court. The best defence is a **written derivation** kept on file from contract signature, showing the rate is a genuine pre-estimate of foreseeable loss.`,
        },
        {
          kind: "md",
          md: md`### Genuine pre-estimate versus penalty

**English common law.** The old test (Dunlop v New Garage, 1915) asked whether the sum was a genuine pre-estimate of loss or a penalty meant to deter. The UK Supreme Court in **Cavendish v Makdessi (2015)** restated it: a clause is a penalty only if it imposes a detriment **out of all proportion** to the innocent party's **legitimate interest** in performance. Between commercial parties of comparable bargaining power with legal advice, LDs are rarely struck down. Many IPP EPC contracts and financing documents are under English law, so this test matters to the lenders.

**Civil-law approach (Gulf).** Gulf civil codes, which broadly follow the Egyptian Civil Code model, treat an agreed compensation clause (**الشرط الجزائي**) as valid but generally allow the court to **reduce** it if it is grossly exaggerated or if the obligor shows the creditor suffered less (or no) loss. The clause shifts the burden of proof to the party resisting payment rather than giving an untouchable sum.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Kuwaiti law on agreed damages: check before relying on it",
          md: md`The specific Kuwaiti Civil Code articles on agreed compensation (whether the court may reduce it, or refuse it where no damage is proven), and how delay "fines" in government contracts are treated, are not covered in our research. Ask MEWRE's legal department for the applicable articles and any Court of Cassation guidance before setting or enforcing LD rates in a Kuwaiti-law contract.`,
        },
        { kind: "sources", refs: ["m09-uksc-makdessi-2015", "m09-fidic-silver-2017", "m09-iec-ts-61724-2-3"] },
      ],
    },
    {
      layer: "applied",
      title: "Worked LD calculations for a Shagaya-scale PV IPP",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Deriving and applying a delay LD rate",
          given: md`A **500 MWac** PV IPP. EPC price **USD 400 m**. P50 energy **1,250,000 MWh/yr**. Illustrative tariff **USD 15/MWh** (an assumption for teaching; Kuwait's Zone 1 tariff has not been reported). Debt drawn at completion **USD 300 m** at **6%**. The PPA imposes delay LDs on the SPV of **USD 100/MWac/day**. Continuing SPV fixed costs **USD 10,000/day**. Original Time for Completion **1 June 2028**; Taking-Over Certificate dated **18 September 2028**; the Engineer granted **30 days** EOT. Delay LD cap **15%** of EPC price.`,
          steps: [
            {
              md: md`**Lost revenue per day:** $\frac{1{,}250{,}000 \times 15}{365} = \frac{18.75\ \text{m}}{365} = 51{,}370$ USD/day.`,
            },
            {
              md: md`**Interest per day:** $\frac{300\ \text{m} \times 0.06}{365} = 49{,}315$ USD/day.`,
            },
            {
              md: md`**PPA penalty per day:** $100 \times 500 = 50{,}000$ USD/day. **Fixed costs:** 10,000 USD/day.`,
            },
            {
              md: md`**Daily rate:** $LD_d = 51{,}370 + 49{,}315 + 50{,}000 + 10{,}000 = 160{,}685$ USD/day, rounded in the contract to **USD 160,000/day**. Check: $160{,}000 / 400\ \text{m} = 0.04\%$ of price per day, within the usual range.`,
            },
            {
              md: md`**Days late:** 1 June to 18 September 2028 is 109 days; less 30 days EOT gives **79 days**.`,
            },
            {
              md: md`**LDs:** $79 \times 160{,}000 = 12.64$ USD m. **Cap:** $0.15 \times 400 = 60$ USD m, reached only after $60\ \text{m} / 160{,}000 = 375$ days. LDs payable = **USD 12.64 m**.`,
            },
          ],
          result: md`USD 12.64 m of delay damages, deducted from IPCs (after an Employer's Notice of Claim and 3.7 determination) or recovered from the performance security if unpaid. The derivation sheet is evidence that the rate is a genuine pre-estimate.`,
        },
        {
          kind: "md",
          md: md`**Sectional variant.** If the same plant had Sections with a pro-rata rate of **USD 300/MWac/day**, and Section A (200 MW) was 25 days late, Section B (150 MW) 40 days late and Section C (150 MW) on time, the LDs would be $200 \times 300 \times 25 + 150 \times 300 \times 40 = 1.5 + 1.8 = 3.3$ USD m. Sectional completion gets energy (and revenue) flowing earlier and makes LDs proportionate to the capacity actually late.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "PR buy-down after the performance test",
          given: md`Same plant. Guaranteed temperature-corrected PR (after deducting the measurement tolerance) **82.0%**; measured **80.4%**. Remaining PPA term **30 years**; discount rate **7%**. Energy and tariff as above (1,250,000 MWh/yr, USD 15/MWh). The minimum acceptance level is 95% of guaranteed PR.`,
          steps: [
            {
              md: md`Minimum acceptance: $0.95 \times 82.0 = 77.9\%$. Measured 80.4% is above it, so buy-down applies (no rejection).`,
            },
            {
              md: md`Relative shortfall $\frac{82.0 - 80.4}{82.0} = 1.951\%$, so lost energy $= 0.01951 \times 1{,}250{,}000 = 24{,}390$ MWh/yr and lost revenue $= 24{,}390 \times 15 = 365{,}854$ USD/yr.`,
              hidden: true,
              check: { prompt: "Annual revenue lost from the PR shortfall", answer: 365854, unit: "USD/yr", tolerance: { rel: 0.01 } },
            },
            {
              md: md`Annuity factor $AF(0.07, 30) = \frac{1 - 1.07^{-30}}{0.07} = 12.409$.`,
            },
            {
              md: md`$LD_{PR} = 365{,}854 \times 12.409 = 4.54$ USD m.`,
              hidden: true,
              check: { prompt: "Performance buy-down LD", answer: 4.54, unit: "USD m", tolerance: { rel: 0.01 } },
            },
            {
              md: md`Equivalent contract rate: $4.54\ \text{m} / 16 = 0.284$ USD m per 0.1 percentage point of PR shortfall.`,
            },
          ],
          result: md`About USD 4.54 m, typically applied to mandatory debt prepayment. The same logic gives a capacity buy-down rate of $2{,}500\ \text{MWh/MW/yr} \times 15 \times 12.409 \approx$ USD 0.465 m per MW of AC capacity shortfall; a 6 MW shortfall would be about USD 2.79 m (but not on top of the PR LD for the same defect).`,
        },
        { kind: "widget", widget: "npv-irr", caption: "Shift COD or cut annual energy by 2% and watch equity IRR and minimum DSCR: this is the exposure the delay and performance LDs must cover." },
        {
          kind: "question",
          question: {
            id: "m09-l04-p1",
            type: "numeric",
            prompt: md`A USD 300 m EPC has delay LDs of **0.05% of the contract price per day**, capped at **15%** of the contract price. Completion is **450 days** late after all EOTs. What delay LDs (USD m) are payable?`,
            answer: 45,
            unit: "USD m",
            tolerance: { abs: 0.05 },
            explanation: md`Daily rate $= 0.0005 \times 300 = 0.15$ USD m. Uncapped $= 450 \times 0.15 = 67.5$ USD m. Cap $= 0.15 \times 300 = 45$ USD m. Payable $= \min(67.5, 45) = 45$ USD m. The cap was reached after 300 days: from then the Contractor had no LD incentive, which is why contracts give the Employer a termination right once the cap is reached.`,
            concepts: ["m09.delay-lds", "m09.ld-cap"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Setting and enforcing LDs on real projects",
      blocks: [
        {
          kind: "md",
          md: md`**Who sets the numbers.** In an IPP, the developer's financial model (audited by the lenders' model auditor) produces the daily cost of delay and the sensitivity of debt service to energy; the developer negotiates EPC LDs to cover them, and the lenders' technical advisor checks the guarantees and test procedures. In a MEWRE-procured contract, the PM and the consultant should prepare and keep a short derivation note (system cost of a late plant, extra fuel burned in thermal units, GCCIA imports, supervision costs) before the tender.

**Who enforces.** The Engineer agrees or determines the Employer's claim for delay damages under 3.7 after an Employer's Notice of Claim; the PM ensures the notice is given within 28 days and the IPC deduction is made only once the amount is agreed or determined (or as the Particular Conditions allow).

**Performance tests.** The test procedure (instrumentation class, pyranometer calibration, data filtering, temperature correction, soiling treatment, test duration, uncertainty) decides the LD outcome as much as the plant does. Agree it in the contract annex, not after construction. In Kuwait's conditions, specify how soiling is handled (clean before the test and measure soiling separately) and the temperature correction at 45–50 °C module-back temperatures above 70 °C.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- LD rate copied from a previous contract, with no derivation on file; challenged later as a penalty or found far below the real loss.
- No Sections, so 5% of the plant being late holds the whole plant's Taking-Over and revenue hostage.
- EOT applications ignored, so time becomes "at large" and LDs are lost.
- Test procedure vague on soiling and temperature correction; the PR test becomes a dispute about data filtering.
- Delay LD cap reached with no termination right; the Contractor slows down.
- Performance LDs paid to the SPV and spent, while lenders expected mandatory prepayment.
- EPC delay LDs smaller than the SPV's PPA delay penalties plus interest: the SPV is underwater from day one of delay.`,
        },
        {
          kind: "checklist",
          title: "PM checklist: LDs",
          items: [
            "Written derivation of each LD rate (revenue, interest, PPA penalties, fixed costs) kept on file from signature.",
            "Sections defined with their own Times for Completion and pro-rata LD rates.",
            "Caps for delay, performance and aggregate stated; termination right on reaching the delay cap.",
            "Minimum performance levels below which the Employer can require remedy or reject.",
            "Test procedures annexed: instruments, calibration, filters, temperature and soiling corrections, uncertainty band, duration.",
            "Employer's Notice of Claim for delay damages issued within 28 days of the entitlement arising.",
            "No double counting between capacity and PR LDs.",
            "For IPPs: EPC delay LDs at least cover PPA delay LDs + interest + fixed costs; performance LDs flow to debt prepayment as the financing requires.",
          ],
        },
        {
          kind: "ask",
          title: "Ask the contractor (or developer)",
          items: [
            "Show me how your delay LD rate compares with the SPV's daily exposure under the PPA and the financing.",
            "What measurement uncertainty do you assume in the PR test, and how is it applied?",
            "How will you treat soiling and module temperature above 70 °C in the performance test?",
            "If the capacity test fails by 2%, will you remedy (add modules/inverters) or pay buy-down, and who decides?",
            "What is your programme float against the delay LD cap and the PPA long-stop date?",
          ],
        },
        {
          kind: "feynman",
          prompt:
            "Explain to a non-technical MEWRE committee member why a USD 160,000 per day delay LD is not a 'penalty' and why making it USD 1 m per day would hurt MEWRE.",
          keyPoints: [
            "The rate is derived from foreseeable loss: lost energy revenue, interest, PPA penalties and fixed costs.",
            "LDs give certainty and avoid proving loss; they are a pre-estimate, not punishment.",
            "An excessive rate is priced into every bid and may be reduced or struck down by a court or tribunal.",
            "Caps limit total LDs; termination rights protect the Employer once the cap is reached.",
            "A written derivation kept from signature is the best defence.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m09-l04-q1",
      type: "numeric",
      prompt: md`A PV EPC has a delay LD rate of **USD 120,000/day** and a cap of **10%** of a **USD 250 m** price. The Time for Completion was 1 March; Taking-Over is certified on 30 June (121 days later); EOT granted is **35 days**. What delay LDs (USD m) are payable?`,
      answer: 10.32,
      unit: "USD m",
      tolerance: { abs: 0.01 },
      explanation: md`Days late $= 121 - 35 = 86$. LDs $= 86 \times 0.12 = 10.32$ USD m. Cap $= 0.10 \times 250 = 25$ USD m, not reached. Payable USD 10.32 m.`,
      concepts: ["m09.delay-lds", "m09.ld-cap"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m09-l04-q2",
      type: "numeric",
      prompt: md`What is the annuity factor $AF(i, n)$ for $i = 8\%$ and $n = 25$ years? (Give the factor to two decimals.)`,
      answer: 10.67,
      tolerance: { abs: 0.01 },
      explanation: md`$AF = \frac{1 - 1.08^{-25}}{0.08} = \frac{1 - 0.1460}{0.08} = 10.67$. A USD 1 per year loss for 25 years is worth about USD 10.67 today at 8%: that is the multiplier between an annual energy shortfall and its buy-down LD.`,
      concepts: ["m09.performance-lds"],
      difficulty: 2,
    },
    {
      id: "m09-l04-q3",
      type: "mcq",
      prompt: md`Under Cavendish v Makdessi (2015), when is an LD clause an unenforceable penalty?`,
      options: [
        "Whenever the sum exceeds the actual loss suffered",
        "When it imposes a detriment out of all proportion to the innocent party's legitimate interest in performance",
        "Whenever it was not negotiated line by line",
        "Whenever it is higher than 0.1% per day",
      ],
      answer: 1,
      explanation: md`Makdessi replaced the narrow "genuine pre-estimate" framing with a legitimate-interest test: the clause fails only if it is extravagant, exorbitant or unconscionable compared with that interest. Exceeding actual loss is not enough on its own.`,
      concepts: ["m09.penalty-doctrine"],
      difficulty: 2,
    },
    {
      id: "m09-l04-q4",
      type: "multi",
      prompt: md`Which provisions protect the Employer's position on performance LDs? Select all that apply.`,
      options: [
        "A minimum performance level below which the Employer may require remedy or reject the Works",
        "A detailed test procedure with uncertainty and correction methods annexed to the contract",
        "Applying performance LDs to mandatory debt prepayment in an IPP",
        "An unlimited performance LD with no cap",
        "Allowing the Contractor to choose between a PR LD and a capacity LD for the same defect after the test",
      ],
      answer: [0, 1, 2],
      explanation: md`Minimum levels stop the Contractor buying its way out of a defective plant; annexed test procedures prevent disputes about the measurement; mandatory prepayment restores the DSCR. Uncapped LDs are unbankable for contractors (and priced heavily), and letting the Contractor pick the cheaper LD rewards it.`,
      concepts: ["m09.performance-lds", "m09.ld-cap"],
      difficulty: 2,
    },
    {
      id: "m09-l04-q5",
      type: "decision",
      prompt: md`You are the MEWRE PM preparing a tender for a MEWRE-owned 250 MW / 1,000 MWh BESS. The draft carries over a delay LD of "USD 5,000 per day" from an old distribution-substation contract. What do you do?`,
      options: [
        {
          text: "Prepare a derivation of MEWRE's daily cost of a late BESS (e.g. extra peak generation or imports avoided, supervision costs) and set the rate and cap from it, with Sections if the BESS is delivered in blocks.",
          score: 1,
          feedback: "Right: the rate must reflect this project's foreseeable loss, and a written derivation protects it against challenge.",
        },
        {
          text: "Keep USD 5,000/day: low LDs attract more bidders.",
          score: 0.2,
          feedback: "A rate far below the real loss gives the Contractor no incentive to prioritise MEWRE's project, and MEWRE absorbs the summer capacity shortfall.",
        },
        {
          text: "Set USD 1 m/day so contractors take it seriously.",
          score: 0.2,
          feedback: "Likely far above the foreseeable loss: priced into bids and open to reduction as excessive.",
        },
      ],
      explanation: md`LD rates should be project-specific, derived, documented and capped. Copying rates across very different projects is one of the most common Employer errors.`,
      concepts: ["m09.delay-lds", "m09.penalty-doctrine"],
      difficulty: 2,
    },
    {
      id: "m09-l04-q6",
      type: "short",
      prompt: md`Why do lenders usually insist that performance LDs paid by the EPC contractor are used to prepay debt, while delay LDs go to the SPV's revenue account?`,
      rubric: [
        "Performance shortfall is permanent: lower energy every year reduces cash flow available for debt service for the whole term.",
        "Prepaying debt by the PV of the shortfall restores the DSCR to the base case.",
        "Delay is temporary: delay LDs replace revenue during the delay period and pay interest and PPA penalties.",
        "Matching each LD to the loss it compensates protects lenders' cover ratios.",
      ],
      modelAnswer: md`A performance shortfall reduces energy and revenue every year for the life of the PPA, permanently lowering cash available for debt service; prepaying debt by roughly the present value of that loss brings the DSCR back to the base case. A delay is temporary: delay LDs replace the revenue and cover the interest and PPA penalties during the delay, so they belong in the revenue waterfall. Each LD stream is matched to the loss it compensates.`,
      explanation: md`This is the logic of a buy-down: the Contractor buys down the debt the plant can no longer support.`,
      concepts: ["m09.performance-lds", "m09.delay-lds"],
      difficulty: 3,
    },
  ],
  flashcards: [
    { id: "m09-l04-f1", front: "Four components of an IPP delay LD rate", back: "Lost revenue, extra interest during construction, PPA delay penalties owed by the SPV, continuing fixed costs.", concepts: ["m09.delay-lds"] },
    { id: "m09-l04-f2", front: "Typical PV EPC delay LD as % of price per day", back: "Roughly 0.03–0.1% of contract price per day.", concepts: ["m09.delay-lds"] },
    { id: "m09-l04-f3", front: "Typical delay LD cap", back: "10–20% of contract price; aggregate LD cap 20–30%.", concepts: ["m09.ld-cap"] },
    { id: "m09-l04-f4", front: "Performance buy-down formula (PR)", back: "LD = (PRg − PRm)/PRg × annual energy × tariff × annuity factor.", concepts: ["m09.performance-lds"] },
    { id: "m09-l04-f5", front: "AF(7%, 30 yr)", back: "≈ 12.41", concepts: ["m09.performance-lds"] },
    { id: "m09-l04-f6", front: "Makdessi test for penalties", back: "Penalty only if the detriment is out of all proportion to the innocent party's legitimate interest in performance.", concepts: ["m09.penalty-doctrine"] },
    { id: "m09-l04-f7", front: "Prevention principle", back: "If the Employer delays the work and there is no EOT mechanism for it, time may become 'at large' and delay LDs unenforceable.", concepts: ["m09.delay-lds"] },
    { id: "m09-l04-f8", front: "Arabic term for an agreed-damages clause", back: "الشرط الجزائي (civil-law courts may reduce it if grossly excessive).", concepts: ["m09.penalty-doctrine"] },
    { id: "m09-l04-f9", front: "Minimum performance level", back: "Threshold below which the Employer need not accept buy-down LDs and may require remedy or reject the Works.", concepts: ["m09.performance-lds"] },
  ],
};

export default lesson;
