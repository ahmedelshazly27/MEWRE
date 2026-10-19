import { md, type Simulation } from "../../schema";

export const simulation: Simulation = {
  id: "m15-sim",
  title: "NAJM-1000: tender to COD",
  intro: md`## You are MEWRE's project manager for NAJM-1000

**NAJM-1000** is a training scenario: a **1,000 MWac single-axis tracker PV plant** with a **250 MW / 1,000 MWh battery**, procured by KAPP as an IPP in the Shagaya / Dibdibah area, selling everything to MEWRE under a **30-year PPA**. The project company builds the plant and its 400/33 kV substation; **MEWRE builds the 400 kV line and bay** and is responsible for land handover support, protection settings, energisation permits, metering, dispatch and payment.

You sit on the **employer / offtaker side**. You work with KAPP (procuring authority and shareholder), MEWRE's Owner's Engineer, the project company and — through it — the EPC, O&M and BESS contractors, and you meet the lenders' technical advisor. You influence the build through the PPA and relationships, not by directing contractors.

### How it works

- **8 stages, 27 decisions**, from pre-tender to COD and handover.
- Each option shifts six KPIs. The effects are the **expected lifecycle consequence** of that choice — a shortcut that saves money today but triggers a claim later shows up as a net cost.
- Each option also has a hidden **decision-quality score (0–10)** — what a panel of experienced PMs would give it.
- Final score = **50 % mean KPI score + 50 % mean decision quality**. Hitting a KPI target gives full marks for it; beating it gives nothing extra.

| KPI | Start | Target |
|---|---|---|
| Forecast cost at completion (capex + MEWRE claims and deemed-energy exposure) | USD 720 m | ≤ 760 |
| Days to COD from RFP issue | 1,200 | ≤ 1,260 |
| Quality / technical integrity index | 70 | ≥ 85 |
| Stakeholder trust index | 60 | ≥ 80 |
| Safety performance index | 80 | ≥ 90 |
| Energy yield vs P50 | 100 % | ≥ 100 % |

### Before each decision, ask five questions

1. **Contract:** what does the PPA (or the RFP, or the law) actually say?
2. **Risk owner:** whose risk is this — MEWRE's, the project company's, or shared?
3. **Lifecycle:** what does each KPI gain or lose over the whole project, not just this month?
4. **File:** what would the State Audit Bureau see if it read the file in three years?
5. **People:** what does safety demand, and who must hear this from you first?

Good luck. There is no option that is free.`,
  kpis: [
    { key: "cost", label: "Forecast cost at completion", unit: "USD m", better: "lower", target: 760 },
    { key: "days", label: "Days to COD from RFP issue", unit: "days", better: "lower", target: 1260 },
    { key: "quality", label: "Quality / technical integrity", unit: "index", better: "higher", target: 85 },
    { key: "trust", label: "Stakeholder trust", unit: "index", better: "higher", target: 80 },
    { key: "safety", label: "Safety performance", unit: "index", better: "higher", target: 90 },
    { key: "yield", label: "Energy yield vs P50", unit: "%", better: "higher", target: 100 },
  ],
  initial: { cost: 720, days: 1200, quality: 70, trust: 60, safety: 80, yield: 100 },
  stages: [
    // ------------------------------------------------------------------ Stage 1
    {
      id: "m15-st1",
      title: "Pre-tender & RFQ",
      brief: md`KAPP has Higher Committee approval to procure NAJM-1000 and is drafting the RFQ and RFP with its transaction advisors. MEWRE must supply the **technical requirements**, the **grid interface** definition and its position on **local content**. Nothing you fix now costs much; everything you leave vague now costs a lot later.`,
      decisions: [
        {
          id: "m15-d01",
          prompt: md`KAPP's technical advisor asks what **resource data** the RFP should provide to bidders. MEWRE has one year of data from a temporary met mast near the site; KISR operates ground stations in the region; satellite datasets are available off the shelf.`,
          concepts: ["m15.energy-yield-basis", "m15.bid-evaluation"],
          options: [
            {
              text: "Provide satellite TMY only and let bidders take the resource risk — it keeps the timetable",
              effects: { days: -10, quality: -2, yield: -2 },
              score: 4,
              feedback: md`Fast, and the developer does carry yield risk under an energy tariff. But satellite data in Kuwait needs site adaptation (KISR found satellite DNI in particular diverges because of aerosols), and bidders will each "adapt" differently — optimists win, then underperform. A shared, ground-validated reference dataset is cheap insurance for comparable bids and a defensible P50.`,
            },
            {
              text: "Put the on-site met data, a KISR ground-station dataset and a site-adapted reference TMY in the data room; require a common P50/P90 methodology and soiling measurement; keep the met station running and add soiling stations",
              effects: { cost: 1, days: 5, quality: 2, yield: 1 },
              score: 10,
              feedback: md`This is what experienced offtakers do. A common, ground-validated basis makes tariffs comparable, removes one excuse for later underperformance, and gives the performance test a reference everyone accepted. Two extra weeks to prepare the data room is trivial against a 30-year PPA. Keeping the station running also builds the long-term record you will use to verify yield claims for the next project.`,
            },
            {
              text: "Delay the RFQ for two years to build a long-term bankable ground dataset first",
              effects: { cost: 1, days: 200, trust: -3, yield: 1 },
              score: 3,
              feedback: md`Better data, but two years of lost generation in a system that ran short of capacity in 2025 is far more expensive than the uncertainty you remove. One year of site data correlated with long-term satellite and KISR records is the industry norm for bankable P50s. Perfect information is not a project objective.`,
            },
            {
              text: "Let each bidder use its own data with no reference set — the market knows best",
              effects: { quality: -2, trust: -1, yield: -2 },
              score: 2,
              feedback: md`Bids built on different datasets cannot be compared fairly, and the evaluation committee will have no basis to challenge an optimistic P50. The lowest tariff often simply hides the most aggressive resource assumption.`,
            },
          ],
        },
        {
          id: "m15-d02",
          prompt: md`KAPP asks for MEWRE's position on **local content and Kuwaitisation**. A parliamentary committee has publicly called for "maximum Kuwaiti value" in renewables. Kuwait manufactures no PV modules or battery cells.`,
          concepts: ["m15.local-content", "m15.stakeholder-map"],
          options: [
            {
              text: "Mandate 40 % local content by value across the whole scope, including modules and batteries",
              effects: { cost: 20, days: 50, quality: -2, trust: 2 },
              score: 3,
              feedback: md`Politically attractive for a week. With no domestic module or cell manufacturing, 40 % by value forces paper workarounds or a price premium, invites disputes over what counts, and pushes away the strongest bidders. Unachievable targets also undermine trust later when they are quietly waived.`,
            },
            {
              text: "Leave local content out to keep the tariff as low as possible",
              effects: { cost: -4, trust: -3 },
              score: 2,
              feedback: md`Saves a little on the tariff and loses the policy argument. Kuwait's 2026 tenders amendment tightens local-content rules; every Zone 1 and Zone 2 bidder paired with a Kuwaiti group. A project that ignores this will face resistance at every approval step.`,
            },
            {
              text: "Set measurable, achievable targets: civil works, cabling, structure fabrication, local services, a national employment and training plan with an O&M Kuwaitisation ramp — scored in evaluation and reported quarterly",
              effects: { cost: 3, trust: 2 },
              score: 10,
              feedback: md`This is how credible programmes do it: target what the economy can actually supply (civil works, steel fabrication, cabling, transport, O&M staffing), make it measurable, score it transparently, and report it. It costs a little, protects quality, and gives leadership a story backed by data — the opposite of a headline target that collapses on contact with reality.`,
            },
            {
              text: "Copy the local-content clause from an older tender without a baseline study of local capacity",
              effects: { days: 20, quality: -1 },
              score: 4,
              feedback: md`Quick, but clauses written for a different scope and market create ambiguity — what counts, how it is measured, what happens if it is missed. Ambiguity becomes disputes and delay during construction.`,
            },
          ],
        },
        {
          id: "m15-d03",
          prompt: md`The draft RFP must define the **grid connection**. MEWRE transmission prefers to commit to nothing until bids are in. The KAPP advisor warns that lenders will price an undefined interface.`,
          concepts: ["m15.grid-interface", "m15.deemed-energy"],
          options: [
            {
              text: "Leave the grid scope and date to be decided after bids",
              effects: { days: 60, quality: -1, trust: -1 },
              score: 3,
              feedback: md`Bidders price uncertainty as contingency or exclusions, and the interface gets negotiated under time pressure after award. The decision has to be made eventually — making it now, when MEWRE has leverage and time, is far cheaper.`,
            },
            {
              text: "Transfer the entire grid connection, including the 400 kV line to the MEWRE substation, to the IPP",
              effects: { cost: 25, days: 30, trust: -1 },
              score: 5,
              feedback: md`It removes MEWRE's interface risk on paper, but a private SPV is badly placed to secure transmission routes and crossings, so bidders add large contingencies and longer schedules. Some offtakers do this deliberately; it is defensible, but expensive. MEWRE already procures 400 kV lines through public tenders (the Shagaya–Al-Wafra line was awarded in 2026), so splitting at the plant substation plays to each party's strength.`,
            },
            {
              text: "Split at the plant 400 kV substation: IPP builds the substation; MEWRE commits to the line and bay by a published interface date with mutual milestones and a deemed-energy remedy — and MEWRE starts procuring its line now",
              effects: { cost: 2, days: -30, quality: 1, trust: 1 },
              score: 10,
              feedback: md`The professional answer: each party builds what it is best placed to build, the boundary and dates are explicit, and MEWRE's exposure is capped by a deemed-energy clause it can price. Starting the line procurement now (through MEWRE's own tender process and approvals) is what actually protects the date — the clause only allocates the consequence.`,
            },
            {
              text: "Put the grid on MEWRE's side but give no committed date in the PPA, so bids stay cheap",
              effects: { cost: -8, days: 90, trust: -2 },
              score: 2,
              feedback: md`Lenders will not finance a plant with no committed grid date, or they will demand termination rights and heavy compensation. The "cheap" bid becomes an expensive negotiation, financial close slips, and the IPP's lawyers will argue every MEWRE delay anyway.`,
            },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ Stage 2
    {
      id: "m15-st2",
      title: "RFP & bid evaluation",
      brief: md`Bids are in. Three consortia passed the technical envelope. Financial envelopes have been opened: **Bidder A** is 12 % below Bidder B, which is 3 % below Bidder C. You sit on KAPP's evaluation committee as MEWRE's technical representative, with the OE supporting you.`,
      decisions: [
        {
          id: "m15-d04",
          prompt: md`Bidder A's tariff is 12 % below the next bid. Its technical bid names no tier-1 module supplier, assumes 0.25 %/yr degradation and 0.5 % annual soiling loss, and its EPC price is 15 % below the OE's estimate. A senior official says: "Lowest is lowest. Recommend A."`,
          concepts: ["m15.bid-evaluation", "m15.energy-yield-basis"],
          options: [
            {
              text: "Recommend award to Bidder A — the RFP says lowest compliant tariff wins",
              effects: { cost: -10, days: 70, quality: -4, trust: -2, yield: -2 },
              score: 2,
              feedback: md`The RFP says lowest **compliant** tariff — compliance with a realistic technical basis is exactly what has not been tested. Abnormally low bids built on 0.5 % soiling in a desert where Shagaya PV needs monthly washing tend to end in renegotiation, slow construction, sponsor distress or underperformance. The headline saving evaporates.`,
            },
            {
              text: "Disqualify Bidder A immediately as abnormally low",
              effects: { cost: 12, days: 40, trust: -2 },
              score: 3,
              feedback: md`You may be right about the risk, but disqualifying without a documented process invites a challenge, and you lose a potentially valid low price. Abnormally low bids are tested through formal clarification, not rejected by instinct.`,
            },
            {
              text: "Through KAPP, issue formal written clarifications under the RFP rules: confirm the module supplier list, degradation and soiling basis, EPC price and equity commitment; have the OE re-run the yield on the reference dataset; evaluate strictly against published criteria and record everything",
              effects: { cost: 1, days: 10, quality: 2, trust: 1 },
              score: 10,
              feedback: md`This is the defensible path. Clarifications may not change the bid's substance, but they force the bidder to stand behind its assumptions in writing — which you can then enforce, or which reveal non-compliance. The OE's independent yield re-run on the common dataset shows whether the tariff relies on resource optimism. Whatever the outcome, the file shows a fair, documented process.`,
            },
            {
              text: "Quietly ask Bidder A to raise its tariff to a 'safer' level before award",
              effects: { days: 60, trust: -4 },
              score: 0,
              feedback: md`Post-bid price negotiation with one bidder outside the RFP rules breaches procurement integrity, is unfair to the others and would be indefensible before the Audit Bureau. Never.`,
            },
          ],
        },
        {
          id: "m15-d05",
          prompt: md`After technical bid opening, Bidder B sends a letter titled "clarification" that switches its module supplier and lowers its EPC price by 4 %.`,
          concepts: ["m15.bid-evaluation", "m15.audit-readiness"],
          options: [
            {
              text: "Accept it — a lower price is good for the state",
              effects: { cost: -6, trust: -4 },
              score: 1,
              feedback: md`Changing the substance of a bid after opening is a bid modification, not a clarification. Accepting it is unfair to the other bidders, exposes the award to challenge and will be a finding at the Audit Bureau.`,
            },
            {
              text: "Ask all bidders for best-and-final offers so that everyone gets the same chance",
              effects: { cost: -4, days: 45, trust: -1 },
              score: 5,
              feedback: md`Fair in spirit, and legitimate if the RFP and KAPP's rules provide for a BAFO round. If they do not, you are inventing process mid-stream, adding six weeks and inviting challenges. Check the rules first; do not use a BAFO to rescue one bidder's late change.`,
            },
            {
              text: "Treat it as a non-conforming modification: evaluate Bidder B's original bid only, record the letter, and inform KAPP's tender committee in writing",
              effects: { trust: 1 },
              score: 10,
              feedback: md`Correct. Only clarifications that do not change price, scope or key terms are permitted. Documenting the letter and its rejection protects the process — and the award — from challenge. Experienced evaluators keep a clarification log precisely for moments like this.`,
            },
          ],
        },
        {
          id: "m15-d06",
          prompt: md`The two remaining bids treat the **BESS** differently: Bidder B offers 1,000 MWh nameplate DC with no augmentation plan; Bidder C offers 1,000 MWh usable at the POI held for the PPA term through scheduled augmentation, at a higher capacity charge.`,
          concepts: ["m15.bid-evaluation", "m15.commissioning-tests"],
          options: [
            {
              text: "Compare on nameplate MWh and capacity charge only — the cheaper battery wins",
              effects: { cost: -2, quality: -3 },
              score: 2,
              feedback: md`1,000 MWh nameplate DC is perhaps 850–900 MWh at the POI after depth-of-discharge limits, round-trip losses and auxiliaries, and it fades every year. Comparing nameplate with usable-at-POI is comparing different products.`,
            },
            {
              text: "Normalise both bids to guaranteed usable energy at the POI over the term (RTE, degradation, augmentation, availability) as the RFP requires, and check fire-safety evidence (UL 9540A test data, NFPA 855 layout)",
              effects: { cost: 2, quality: 2, safety: 1 },
              score: 10,
              feedback: md`MEWRE buys evening MWh at the POI for 30 years — so that is the only fair basis of comparison. Normalising reveals the true cost per usable MWh-year. Checking UL 9540A propagation data and NFPA 855 spacing now prevents a fire-authority surprise later.`,
            },
            {
              text: "Choose the bid with the most famous battery brand",
              effects: { cost: 4 },
              score: 3,
              feedback: md`Brand is not an evaluation criterion unless the RFP says so, and it is no substitute for guaranteed performance terms. An evaluation decision must trace back to the published criteria.`,
            },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ Stage 3
    {
      id: "m15-st3",
      title: "Award & financial close",
      brief: md`Bidder C has been recommended; the Higher Committee has approved. The **State Audit Bureau** review is pending. The PPA is being finalised with the lenders' counsel in the room, and the EPC price validity expires in ten weeks.`,
      decisions: [
        {
          id: "m15-d07",
          prompt: md`The project company urges MEWRE to **sign the PPA now, "subject to" Audit Bureau approval**, to lock in EPC prices before validity expires.`,
          concepts: ["m15.approval-chain", "m15.audit-readiness"],
          options: [
            {
              text: "Sign now with a conditions-precedent clause",
              effects: { days: -15, trust: -5 },
              score: 1,
              feedback: md`Contracts within the Audit Bureau's prior-review scope must be reviewed before signing; contracting without approval is a violation the Bureau counts and reports. Saving a month is not worth a legal and reputational problem for the ministry.`,
            },
            {
              text: "Wait for the Bureau to respond in its own time",
              effects: { cost: 5, days: 60 },
              score: 4,
              feedback: md`Legal, but passive. Bureau reviews slow down when files are incomplete and questions sit unanswered. Meanwhile price validity lapses and the EPC re-prices with indexation.`,
            },
            {
              text: "Submit a complete pack proactively (evaluation report, clarification log, tariff benchmark, budget commitment, legal opinions), assign a team to answer Bureau questions within days, and agree a price-validity extension with the bidder",
              effects: { cost: 1, days: 10, trust: 2 },
              score: 10,
              feedback: md`The Audit Bureau is a stakeholder, not an obstacle. A complete, well-indexed pack and fast answers are the only real accelerators. A short validity extension, agreed in writing, costs little. This is how PMs who have done it before shorten the approval stage.`,
            },
          ],
        },
        {
          id: "m15-d08",
          prompt: md`Lenders insist on a **deemed-energy clause**. Their draft covers *any* grid unavailability or curtailment, uncapped, calculated from the developer's own model.`,
          concepts: ["m15.deemed-energy", "m15.grid-interface"],
          options: [
            {
              text: "Accept the lenders' draft to reach financial close quickly",
              effects: { cost: 15, days: -10 },
              score: 3,
              feedback: md`Uncapped deemed energy for all curtailment — including routine system-security curtailment and events MEWRE does not cause — turns every dispatch instruction into a payment, calculated on a model MEWRE cannot audit. Fast close, expensive 30 years.`,
            },
            {
              text: "Refuse any deemed-energy clause",
              effects: { cost: -5, days: 90, trust: -2 },
              score: 2,
              feedback: md`Lenders will not lend against a plant whose revenue MEWRE can switch off for free. Financial close stalls, the price validity lapses, and you end up conceding worse terms under pressure.`,
            },
            {
              text: "Accept deemed energy only for MEWRE-caused unavailability and curtailment beyond an annual allowance, calculated from measured irradiance through an agreed, OE-validated model, excluding force majeure and IPP-caused events",
              effects: { cost: -2, days: 5, quality: 1 },
              score: 10,
              feedback: md`This is market-standard and bankable: the IPP is protected from MEWRE's failures, MEWRE keeps operational flexibility within the allowance, and the calculation is transparent and auditable. The PM's work is in the definitions — "MEWRE-caused", the allowance, the model and the metering.`,
            },
          ],
        },
        {
          id: "m15-d09",
          prompt: md`Reviewing the PPA's technical schedules, the OE finds the **COD tests** are vague: "plant to be tested in accordance with good industry practice".`,
          concepts: ["m15.commissioning-tests", "m15.grid-code-compliance"],
          options: [
            {
              text: "Leave it — the EPC contract and lenders will make sure the plant is tested",
              effects: { quality: -3, yield: -2 },
              score: 3,
              feedback: md`The EPC tests protect the project company and the lenders, not MEWRE. If the PPA does not define COD conditions, MEWRE has no contractual basis to refuse COD for a plant that underperforms.`,
            },
            {
              text: "Specify very strict tests: unconditional PR ≥ 90 % with no weather correction",
              effects: { cost: 10, days: 30, trust: -1 },
              score: 3,
              feedback: md`Unrealistic tests do not improve the plant; they make bidders and lenders price the risk, and they invite disputes because no plant can reliably pass them in Kuwaiti summer heat without weather correction.`,
            },
            {
              text: "Define COD conditions precisely: IEC 61724-based capacity and PR tests with agreed weather correction and sensor regime, a BESS capacity and round-trip test at the POI, grid-code compliance certification, and OE witnessing",
              effects: { days: 5, quality: 2 },
              score: 10,
              feedback: md`Precise, recognised test methods agreed now prevent the arguments at COD. The test is part of the PPA's risk allocation: it is what turns "guaranteed" performance into something MEWRE can enforce.`,
            },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ Stage 4
    {
      id: "m15-st4",
      title: "Design & interconnection",
      brief: md`Financial close reached. Notice to proceed issued. The EPC is producing the detailed design; MEWRE transmission is building the 400 kV line. Design decisions made now set 30 years of performance — and the grid date is now MEWRE's to keep.`,
      decisions: [
        {
          id: "m15-d10",
          prompt: md`MEWRE's 400 kV line contractor reports right-of-way and crossing problems. Its updated programme shows the line **five months late** against the plant's ready-for-connection date.`,
          concepts: ["m15.grid-interface", "m15.deemed-energy", "m15.leadership-briefing"],
          options: [
            {
              text: "Ask the project company to slow construction to match the grid date",
              effects: { cost: 10, days: 120, trust: -2 },
              score: 4,
              feedback: md`Slowing the IPP does not slow MEWRE's liability: under the PPA the IPP can claim for the disruption, and you lose the chance to recover the line. Solve the line, not the plant.`,
            },
            {
              text: "Keep it quiet until the line contractor's recovery plan firms up",
              effects: { cost: 25, days: 60, trust: -5 },
              score: 0,
              feedback: md`Concealment is the worst option: notice periods under the PPA run regardless, mitigation windows close, and when it emerges your credibility with leadership and the IPP is gone. Bad news does not improve with age.`,
            },
            {
              text: "Escalate now with a recovery plan: weekly joint interface meetings, re-sequence line works, explore an interim backfeed for commissioning, notify the IPP formally per the PPA, quantify the deemed-energy exposure and brief leadership",
              effects: { cost: 6, days: 25, trust: 2 },
              score: 10,
              feedback: md`You own MEWRE's side of the interface. Early, quantified escalation with options gets decisions (extra crews, crossing permits, priority from other authorities). A backfeed may let the IPP commission blocks early. You will still pay some deemed energy — but far less, and on the record as well-managed.`,
            },
          ],
        },
        {
          id: "m15-d11",
          prompt: md`The OE flags the tracker design: stow at 18 m/s based on generic wind data, piling designed from one borehole per 40 ha with no pull-out tests in a sabkha-prone zone, and inverter derating curves that stop at 45 °C. The project company asks for fast approval.`,
          concepts: ["m15.design-integrity", "m15.energy-yield-basis"],
          options: [
            {
              text: "Approve to protect the schedule — the EPC carries the design risk",
              effects: { cost: 8, days: -10, quality: -4, safety: -2, yield: -2 },
              score: 2,
              feedback: md`The EPC carries the risk until the defects liability period ends; MEWRE lives with the plant for 30 years. Generic stow settings, thin geotechnics and missing 50 °C derating data are exactly how desert plants lose trackers in shamals, see piles corrode, and clip on the hottest afternoons.`,
            },
            {
              text: "Return it 'approved with comments': require a pile test programme with pull-out tests and chloride/sulphate testing, site-specific stow design, and inverter derating validated to 50 °C+ — while letting non-affected work proceed",
              effects: { cost: 2, days: 5, quality: 2 },
              score: 10,
              feedback: md`This balances integrity and progress: the comments target the specific risks of the site (sabkha, gypsum, shamal winds, record heat — Mitribah hit 53.9 °C), and the code lets unaffected design and procurement continue. An experienced reviewer distinguishes "stop" from "fix before construction".`,
            },
            {
              text: "Reject the whole design package and ask for a full resubmission",
              effects: { days: 60, quality: 1, trust: -1 },
              score: 4,
              feedback: md`The concerns are valid, but rejecting the entire package stops unaffected work and strains the relationship. Targeted comments achieve the same technical outcome without two months of delay.`,
            },
          ],
        },
        {
          id: "m15-d12",
          prompt: md`MEWRE transmission asks when it will receive the plant's **grid compliance studies** and validated models. The EPC proposes to deliver them "after mechanical completion".`,
          concepts: ["m15.grid-code-compliance", "m15.design-integrity"],
          options: [
            {
              text: "Accept the generic OEM inverter and plant-controller models to save time",
              effects: { days: 30, quality: -1 },
              score: 4,
              feedback: md`Generic models often fail to reproduce the real controller's behaviour in weak-grid or fault conditions, so transmission will demand validation anyway — usually at the worst moment, during commissioning.`,
            },
            {
              text: "Require load-flow, short-circuit, dynamic and EMT studies with OEM-validated models, the plant controller design, fault-ride-through and reactive capability at 50 °C — submitted and accepted before energisation",
              effects: { cost: 1, days: -10, quality: 1 },
              score: 10,
              feedback: md`Grid compliance is on the critical path to energisation. Studies done early let transmission set protection, find weak-grid issues, and plan tests. IEEE 2800-style performance requirements and MEWRE's grid code must be demonstrated, not assumed.`,
            },
            {
              text: "Defer the studies until commissioning",
              effects: { days: 90, quality: -3 },
              score: 2,
              feedback: md`If a study at commissioning reveals the plant controller cannot meet reactive or fault-ride-through requirements, fixes take months — while the plant sits energised but unable to export.`,
            },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ Stage 5
    {
      id: "m15-st5",
      title: "Procurement & manufacturing",
      brief: md`Modules, trackers, inverters, BESS containers and transformers are being ordered. Lenders' ESG covenants and MEWRE policy require responsible sourcing. Month 10 progress reports have started arriving.`,
      decisions: [
        {
          id: "m15-d13",
          prompt: md`The project company's chosen module supplier cannot provide **polysilicon-to-module traceability**. An alternative supplier with audited traceability costs about USD 6 m more. The lenders' ESG advisor is uneasy.`,
          concepts: ["m15.supply-chain-integrity"],
          options: [
            {
              text: "Accept — supply-chain ethics are not MEWRE's concern",
              effects: { cost: -8, days: 40, quality: -1, trust: -3 },
              score: 1,
              feedback: md`Lenders and international partners do treat forced-labour risk as theirs; shipments can be detained in transit markets and financing covenants breached. MEWRE's reputation is attached to the plant it buys power from.`,
            },
            {
              text: "Require documented traceability (polysilicon to module), a third-party audit and a contractual right to reject non-traceable lots; accept the alternative supplier",
              effects: { cost: 4, days: 10, quality: 1, trust: 2 },
              score: 10,
              feedback: md`Proportionate and enforceable: traceability documentation, independent audit and rejection rights, aligned with ILO forced-labour indicators and lenders' requirements. A modest premium buys bankability and a defensible position.`,
            },
            {
              text: "Ban all modules from an entire country",
              effects: { cost: 25, days: 60, trust: -1 },
              score: 3,
              feedback: md`Blanket bans are blunt: they hit compliant suppliers, sharply narrow the market, and raise prices and lead times. Traceability and audit target the actual risk.`,
            },
          ],
        },
        {
          id: "m15-d14",
          prompt: md`The OE's factory audit finds electroluminescence images with micro-cracks on some lots and a **backsheet/encapsulant change** not listed in the IEC 61215/61730 certified bill of materials.`,
          concepts: ["m15.supply-chain-integrity", "m15.design-integrity"],
          options: [
            {
              text: "Hold the affected lots; require the BOM to match the certificate or be re-tested; raise pre-shipment EL sampling; enforce through the project company",
              effects: { cost: 1, days: 10, quality: 2 },
              score: 10,
              feedback: md`A certificate covers the BOM that was tested. An uncertified material change can fail in Kuwaiti heat and UV years later. Holding lots, demanding re-qualification and tighter sampling is standard, proportionate quality control.`,
            },
            {
              text: "Accept — the modules are certified",
              effects: { cost: 5, quality: -4, yield: -3 },
              score: 1,
              feedback: md`They are not certified in this configuration. BOM substitution is one of the most common causes of early module degradation, and the evidence is in your OE's audit report — which the LTA and, later, auditors will read.`,
            },
            {
              text: "Reject the supplier outright and re-tender the module supply",
              effects: { cost: 10, days: 90, quality: 1 },
              score: 4,
              feedback: md`Disproportionate for findings that can be contained by holding lots and re-qualifying. Re-tendering costs three months of schedule for a problem that targeted controls solve.`,
            },
          ],
        },
        {
          id: "m15-d15",
          prompt: md`The 400/33 kV **main transformers** have an 18-month lead time. The EPC has not ordered them, waiting for full design approval. Without an order this month, they land after the planned energisation date.`,
          concepts: ["m15.schedule-recovery", "m15.design-integrity"],
          options: [
            {
              text: "Wait for full design approval before ordering",
              effects: { days: 120 },
              score: 3,
              feedback: md`Orderly, and late. Long-lead items are ordered on frozen key parameters, not on complete designs. Waiting puts four months on the critical path for no technical gain.`,
            },
            {
              text: "Switch to a cheaper, unproven manufacturer offering 9 months",
              effects: { cost: 2, days: -30, quality: -3, safety: -2 },
              score: 4,
              feedback: md`Tempting. But a 400 kV transformer failure in year two means a year-long outage and a fire risk. Unproven suppliers need type-test evidence and references in comparable climates before they get near the critical path.`,
            },
            {
              text: "Ask the project company to place the order now on frozen key parameters (rating, vector group, impedance, cooling for 50 °C ambient), with witnessed factory acceptance testing and an early transport route survey",
              effects: { cost: 1, days: -45, quality: 1 },
              score: 10,
              feedback: md`Standard practice for long-lead items: freeze what the manufacturer needs, release the order, and protect quality through specification and FAT. The route survey avoids discovering in month 20 that a 250-tonne unit cannot cross a bridge.`,
            },
          ],
        },
        {
          id: "m15-d16",
          prompt: md`Month 10 report: EPC **CPI 0.94, SPI 0.82**. The project company says the EPC "will recover after mobilisation". Planned construction duration is 24 months.`,
          concepts: ["m15.schedule-recovery"],
          options: [
            {
              text: "Accept the assurance — it is the project company's problem",
              effects: { days: 90, trust: -1 },
              score: 2,
              feedback: md`It is the IPP's problem until it becomes MEWRE's summer capacity gap. An SPI of 0.82 forecasts roughly 24 / 0.82 ≈ 29 months. "Will recover" without a resourced plan almost never does.`,
            },
            {
              text: "Publicly threaten to terminate the PPA unless the schedule recovers",
              effects: { days: 60, trust: -3 },
              score: 1,
              feedback: md`Termination threats frighten lenders, make the contractor defensive and are rarely credible this early. Use the PPA's reporting and remedy provisions, not headlines.`,
            },
            {
              text: "Require a recovery schedule: critical path analysis on the P6 baseline, resource-loaded forecast, earned-schedule COD forecast, and the EPC remedies the project company will invoke; track weekly",
              effects: { cost: 1, days: -45, trust: 1 },
              score: 10,
              feedback: md`Data-driven, contractual, firm. You cannot instruct the EPC, but you can require the project company to show — with a credible, resource-loaded schedule — how it will meet the PPA's scheduled COD, and you can track it. CPI below 1 also warns of financial strain: watch for claims and corner-cutting.`,
            },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ Stage 6
    {
      id: "m15-st6",
      title: "Construction",
      brief: md`Peak construction: more than 3,000 workers on site, tracker and module installation running at speed, BESS containers arriving, summer approaching. This is where safety, claims and change management decide the project.`,
      decisions: [
        {
          id: "m15-d17",
          prompt: md`June. The EPC proposes to keep crews working through midday with extra water breaks to recover schedule, despite the summer midday outdoor-work restrictions.`,
          concepts: ["m15.hse-leadership"],
          options: [
            {
              text: "Stop all outdoor work for the whole summer",
              effects: { days: 90, safety: 1 },
              score: 3,
              feedback: md`Over-correction. Well-managed early-morning and night shifts are a safe, normal Gulf practice; stopping entirely costs three months without a proportionate safety gain.`,
            },
            {
              text: "Approve it — the schedule needs the hours",
              effects: { days: -10, safety: -8, trust: -3 },
              score: 0,
              feedback: md`Heat stroke can kill within hours at 50 °C. Breaching midday work restrictions exposes workers, the contractor and the project to legal action and reputational damage. No schedule gain justifies it.`,
            },
            {
              text: "Insist the restriction is respected; support shifting to early-morning and night shifts with lighting, fatigue management, WBGT-based heat-stress plans, cooled rest areas and medical cover; accept some schedule loss",
              effects: { cost: 2, days: 15, safety: 4, trust: 1 },
              score: 10,
              feedback: md`Right. Heat is the defining hazard of Kuwaiti summer construction. A proper heat-stress plan — WBGT monitoring, acclimatisation, hydration, shade, night shifts with lighting and fatigue controls — keeps people safe and keeps much of the productivity.`,
            },
          ],
        },
        {
          id: "m15-d18",
          prompt: md`A severe shamal damages about 2 % of installed modules. In one block the trackers failed to stow because controller communications dropped. The project company claims **force majeure** and a 60-day extension.`,
          concepts: ["m15.claims-variations", "m15.design-integrity"],
          options: [
            {
              text: "Reject the claim outright without analysis",
              effects: { days: 20, quality: -1, trust: -1 },
              score: 4,
              feedback: md`Your instinct may be right, but a determination without analysis is weak and invites a dispute. Assess it properly against the PPA definition and the evidence.`,
            },
            {
              text: "Accept the full 60-day force majeure extension",
              effects: { cost: 5, days: 60 },
              score: 3,
              feedback: md`Sandstorms are a known, recurring feature of Kuwait's climate; the design should handle them. Granting force majeure for a foreseeable event, made worse by a design weakness (no stow backup), rewards the defect.`,
            },
            {
              text: "Assess against the PPA: was the event beyond defined thresholds and genuinely unforeseeable? Require a root-cause analysis of the stow failure (UPS for controllers, redundant wind sensors, fail-safe stow) and grant time only for any genuinely exceptional portion",
              effects: { days: 5, quality: 1 },
              score: 10,
              feedback: md`Experienced PMs separate the weather from the weakness. Force majeure is a defined term with thresholds and notice requirements; the stow failure is a design issue the EPC must fix — and fixing it now protects 30 years of operation.`,
            },
          ],
        },
        {
          id: "m15-d19",
          prompt: md`A **near miss**: a crane lifting a BESS container swung over a crew because a tag line failed and the lift plan was not followed. Nobody was hurt.`,
          concepts: ["m15.hse-leadership"],
          options: [
            {
              text: "Ask the project company to include it in next month's HSE report",
              effects: { safety: -4 },
              score: 3,
              feedback: md`A near miss with fatality potential needs immediate action, not a line in a monthly report. Delay signals that production matters more than lives.`,
            },
            {
              text: "Have the subcontractor fined and continue",
              effects: { safety: -3, trust: -1 },
              score: 2,
              feedback: md`Blame without learning drives future near misses underground. The system failed (lift planning, supervision, competence), not just one rigger.`,
            },
            {
              text: "Shut down the entire site for four weeks",
              effects: { days: 30, safety: 2 },
              score: 5,
              feedback: md`A strong signal, but a site-wide month-long shutdown is disproportionate to a lifting-specific failure and can itself reduce safety focus through rushed recovery afterwards.`,
            },
            {
              text: "Through the project company, require an immediate stand-down of lifting operations, an investigation, re-verified lift plans, competent lifting supervisors and appointed persons, and a site-wide learning briefing before lifts resume",
              effects: { days: 5, safety: 4, trust: 1 },
              score: 10,
              feedback: md`Proportionate and visible: stop the specific hazardous activity, find root causes, fix the system and share the learning. Near misses are free lessons; on projects with a strong safety culture, leaders treat them as seriously as injuries.`,
            },
          ],
        },
        {
          id: "m15-d20",
          prompt: md`The EPC (via the project company) claims extra time and cost for **sabkha and gypsum** found in one zone, requiring coated piles and sulphate-resisting concrete. MEWRE's data room included a preliminary geotechnical report that mentioned "possible sabkha" in that area.`,
          concepts: ["m15.claims-variations"],
          options: [
            {
              text: "Assess under the PPA's site-risk and data-room provisions: was the condition foreseeable from the data supplied and a reasonable site investigation? Request contemporaneous records, agree the engineering fix, and settle only where MEWRE's data was materially misleading",
              effects: { cost: 4, days: 10, quality: 1 },
              score: 10,
              feedback: md`A balanced, documented determination. Site risk is normally the IPP's, especially when the data room flagged the condition; but if MEWRE's report was materially wrong, a fair adjustment avoids an expensive dispute. Either way, the engineering fix must happen.`,
            },
            {
              text: "Accept the claim in full to keep the relationship smooth",
              effects: { cost: 20, days: 45 },
              score: 3,
              feedback: md`Paying for a risk the IPP accepted — when the report warned of sabkha — sets a precedent for every future claim and will not survive an audit question: "why did the state pay for the developer's risk?"`,
            },
            {
              text: "Reject the claim flatly — ground risk is the IPP's",
              effects: { days: 30, quality: -1, trust: -1 },
              score: 4,
              feedback: md`Probably right in principle, but a flat rejection without engaging on facts invites escalation and can delay the engineering fix. Determine, do not dismiss.`,
            },
          ],
        },
        {
          id: "m15-d21",
          prompt: md`MEWRE's operations department asks you to add a **132 kV feeder bay** and **black-start capability** for the BESS — mid-construction, "as soon as possible".`,
          concepts: ["m15.claims-variations", "m15.approval-chain"],
          options: [
            {
              text: "Refuse all changes until after COD",
              effects: { trust: -2 },
              score: 4,
              feedback: md`Protects the schedule but ignores a legitimate system need. A good PM evaluates the change and finds a route — possibly implementing it after COD — rather than refusing on principle.`,
            },
            {
              text: "Run the PPA change procedure: business case, IPP quotation with schedule impact, tariff or lump-sum adjustment mechanism, approvals (including Audit Bureau if above threshold); keep it off the critical path, phasing post-COD if needed",
              effects: { cost: 3, trust: 1 },
              score: 10,
              feedback: md`Formal change control protects everyone: the need is justified, the price and time impact are known before commitment, the approval chain is respected, and the critical path is protected.`,
            },
            {
              text: "Instruct the project company verbally to proceed",
              effects: { cost: 20, days: 60, trust: -1 },
              score: 1,
              feedback: md`A verbal instruction is an open cheque: the IPP will claim cost and time with no agreed price, the work may hit the critical path, and the instruction may lack the approvals the law requires.`,
            },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ Stage 7
    {
      id: "m15-st7",
      title: "Testing & commissioning",
      brief: md`Blocks are being energised in sequence. The COD tests defined in the PPA are under way, witnessed by the OE. Summer peak is weeks away and leadership wants megawatts.`,
      decisions: [
        {
          id: "m15-d22",
          prompt: md`The PR test returns **79.5 %** against a guaranteed 81.0 % (weather-corrected). The project company blames soiling and "data issues".`,
          concepts: ["m15.commissioning-tests"],
          options: [
            {
              text: "Accept the result with a note — 1.5 points is close enough",
              effects: { quality: -3, yield: -4 },
              score: 1,
              feedback: md`1.5 PR points is about 1.9 % of energy for 30 years — tens of GWh a year. "Close enough" at COD becomes permanent underperformance and a weaker position for any performance LD claim.`,
            },
            {
              text: "Verify per the agreed procedure: irradiance sensor calibration and cleaning, soiling-station data, availability exclusions; find root causes (string outages, tracker misalignment, inverter derating); EPC remedies, then retest; LDs per contract if still short",
              effects: { days: 15, quality: 1, yield: 1 },
              score: 10,
              feedback: md`Test disputes are usually about inputs. Checking the sensors and exclusions first is fair to both sides; root-causing the shortfall finds fixable losses (misaligned trackers and string faults are common). Retest, then apply the contract — performance LDs exist exactly for a residual shortfall.`,
            },
            {
              text: "Refuse COD indefinitely until 81 % is achieved, without further analysis",
              effects: { days: 60, trust: -1 },
              score: 4,
              feedback: md`Holding the line is right; refusing to engage with the data is not. If the shortfall comes from a sensor error, you are delaying COD — and MEWRE's energy — for nothing.`,
            },
          ],
        },
        {
          id: "m15-d23",
          prompt: md`The BESS capacity test at 46 °C ambient delivers **940 MWh** over 4 h at the POI against the 1,000 MWh contracted. HVAC derating and auxiliary loads appear to be the cause.`,
          concepts: ["m15.commissioning-tests"],
          options: [
            {
              text: "Reject the BESS and demand complete replacement",
              effects: { cost: 15, days: 120 },
              score: 3,
              feedback: md`A 6 % shortfall from thermal management and auxiliaries is fixable; replacement is disproportionate and keeps the battery out of service through the summer.`,
            },
            {
              text: "Accept — it is summer, and some shortfall is expected",
              effects: { quality: -3, trust: -1 },
              score: 2,
              feedback: md`MEWRE pays the capacity charge for 1,000 MWh at the POI, and the test conditions are defined in the PPA. Summer is exactly when the evening capacity is needed.`,
            },
            {
              text: "Check the test against the procedure (SOC calibration, auxiliary accounting, defined ambient conditions); require HVAC and augmentation fixes and a retest, or partial COD at demonstrated capacity with capacity payments reduced per the PPA",
              effects: { cost: 1, days: 10, quality: 1 },
              score: 10,
              feedback: md`Verify the test, then enforce the contract proportionately. Partial COD at 940 MWh with a reduced capacity charge keeps the battery serving the summer peak while the IPP fixes the deficit at its own cost.`,
            },
          ],
        },
        {
          id: "m15-d24",
          prompt: md`Grid-compliance tests show the plant controller's reactive power response is **too slow**. MEWRE system control wants full export now for the summer peak.`,
          concepts: ["m15.grid-code-compliance", "m15.leadership-briefing"],
          options: [
            {
              text: "Allow interim operation at limited export (e.g. 50 %) under an operational notification, with a firm deadline to retune and retest the plant controller; final compliance before COD",
              effects: { days: 10, quality: 1, trust: 1 },
              score: 10,
              feedback: md`The staged approach used by most system operators: energy flows where it is safe, the deficiency has a deadline, and full rights depend on demonstrated compliance. Plant controller tuning fixes typically take days to weeks.`,
            },
            {
              text: "Energise at full output — summer demand comes first",
              effects: { quality: -3, safety: -3, trust: 1 },
              score: 2,
              feedback: md`A 1 GW plant with poor voltage control can destabilise local voltage and trip — taking out 1 GW at peak is worse than never having had it. The short-term trust bump disappears with the first event.`,
            },
            {
              text: "Prohibit any export until full compliance",
              effects: { days: 40, trust: -1 },
              score: 5,
              feedback: md`Safe, but it wastes energy that could flow safely at limited output while the fix is made.`,
            },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ Stage 8
    {
      id: "m15-st8",
      title: "COD & handover",
      brief: md`The plant is ready for COD. The punch list is long, the Audit Bureau has questions, and the minister wants an announcement.`,
      decisions: [
        {
          id: "m15-d25",
          prompt: md`The punch list has **340 items**: 12 are Category A (safety or performance-critical), the rest Category B. The project company wants COD now.`,
          concepts: ["m15.taking-over"],
          options: [
            {
              text: "Certify COD with every item moved to post-COD",
              effects: { cost: 3, quality: -3, safety: -3 },
              score: 2,
              feedback: md`Once COD is certified, leverage drops sharply. Category A items — safety or performance-critical — must be closed before COD.`,
            },
            {
              text: "COD conditional on all Category A items closed and verified, a dated Category B list secured by retention or security, and O&M manuals, as-builts, spares and training records delivered",
              effects: { days: 5, quality: 1, safety: 2 },
              score: 10,
              feedback: md`Standard, fair practice: Category A blocks COD, Category B is allowed with dates and financial security, and the handover package is complete. This protects 30 years of operation without holding energy hostage to trivial items.`,
            },
            {
              text: "Refuse COD until all 340 items are closed",
              effects: { days: 45, trust: -1 },
              score: 4,
              feedback: md`Disproportionate: minor items such as labelling or paint touch-ups should not delay 1 GW of energy. The PPA usually defines which defects may be outstanding at COD.`,
            },
          ],
        },
        {
          id: "m15-d26",
          prompt: md`Six months after COD, the **State Audit Bureau** queries the deemed-energy payments made during the grid delay and the 132 kV bay variation.`,
          concepts: ["m15.audit-readiness"],
          options: [
            {
              text: "Send a short defensive letter stating the payments were contractual",
              effects: { trust: -1 },
              score: 4,
              feedback: md`True but insufficient. Auditors want evidence: the clause, the calculation, the data, the approvals.`,
            },
            {
              text: "Respond on time with the full trail: PPA clauses, the calculation with metered and irradiance data, the OE's validation, approval memos and correspondence",
              effects: { trust: 3 },
              score: 10,
              feedback: md`This is why you kept an audit-ready file from day one. A complete, timely response closes queries quickly and builds the ministry's credibility with the Bureau.`,
            },
            {
              text: "Delay the response; the team is busy with operations",
              effects: { trust: -4 },
              score: 1,
              feedback: md`Late responses escalate to formal findings, which can reach parliament and the press. Audit responses are a priority, not an afterthought.`,
            },
          ],
        },
        {
          id: "m15-d27",
          prompt: md`The minister wants to announce "**1 GW of solar online**" tomorrow. In fact 1,000 MWac is commissioned but the BESS is at partial COD (940 MWh) and two PV blocks are still on limited export pending controller retest.`,
          concepts: ["m15.leadership-briefing"],
          options: [
            {
              text: "Send the minister a 40-page technical report so he has everything",
              effects: { trust: -1 },
              score: 4,
              feedback: md`Leaders need the answer first, on one page. A 40-page report at this moment means the key nuance will not be read.`,
            },
            {
              text: "Send a one-page brief today: what is energised, what remains (BESS retest, controller retest) with dates, and suggested accurate wording — e.g. '1,000 MW of solar commissioned; full storage capacity due in [month]'",
              effects: { trust: 4 },
              score: 10,
              feedback: md`Bottom line up front, accurate and useful: the minister gets a strong message he can defend, and nobody is embarrassed later. This is how a PM builds lasting trust with leadership.`,
            },
            {
              text: "Let the announcement go out as requested",
              effects: { trust: -3 },
              score: 2,
              feedback: md`An overstated announcement that is later corrected costs the minister — and you — credibility. Help leadership say something true and impressive.`,
            },
          ],
        },
      ],
    },
  ],
  debrief: md`## Debrief: what the expert path looked like

**The pattern behind high scores:** most "10" answers cost a little money or time *now* to protect quality, schedule or trust *later*, and almost all of them used the contract, a documented process and early, quantified communication. Most "0–3" answers fell into one of five traps:

1. **Shortcut bias** — approving to "protect the schedule" (tracker design, midday work, late studies) moves risk into operation, where it costs more.
2. **Over-correction** — rejecting everything, banning whole markets, shutting the site: safe-looking, but disproportionate and slow.
3. **Acting outside the contract** — verbal instructions, private negotiations, signing before approvals.
4. **Concealment and passivity** — waiting for bad news to become formal; letting the Audit Bureau wait.
5. **Accepting assertions** — "will recover", "close enough", "certified" — without verifying data.

### Stage-by-stage

| Stage | Expert move | Why |
|---|---|---|
| Pre-tender | Ground-validated reference dataset; achievable local content; split grid at the plant substation with a committed date | Comparable bids, credible policy, bankable interface |
| Bid evaluation | Formal clarifications and an OE yield re-run; reject bid modifications; normalise BESS to usable MWh at the POI | A fair, defensible award on comparable terms |
| Award & close | Complete Audit Bureau pack; bounded deemed energy; precise COD tests | Shorter approvals, capped exposure, enforceable performance |
| Design & grid | Escalate the line delay with a plan; targeted design comments; early compliance studies | Protect the critical path and 30 years of performance |
| Procurement | Traceability and audit; hold non-conforming lots; early order for long-lead items; data-driven recovery plan | Bankability, quality, schedule |
| Construction | Heat-stress plan; analyse force majeure and claims on facts; lifting stand-down; formal change control | Safety first; fair, auditable decisions |
| Commissioning | Verify then enforce tests; partial COD; staged export | Energy flows safely, contract rights kept |
| COD & handover | Category A before COD; full audit trail; one-page accurate brief | Leverage, accountability, credibility |

### How to read your score

- **≥ 85 %**: you think like an experienced offtaker PM. Review the few decisions where you traded integrity for speed.
- **70–85 %**: solid instincts; look for a pattern in your lower-scored choices (too cautious, or too quick?).
- **< 70 %**: re-read lessons 2 and 3 of this module and the linked modules (contracts, project controls, commissioning, leadership), then replay.

Lesson 3 walks through each stage as a lessons-learned review and turns it into your 30-60-90-day plan at MEWRE.`,
};
