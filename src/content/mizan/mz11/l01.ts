import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz11-l01",
  title: "The buyer map: who owns the soiling loss, and who can sign",
  summary:
    "Soiling destroys value for several parties at once, but only one of them holds each piece contractually. Map MEWRE, KISR, KAPP and the IPP project companies in Kuwait, and the EPCs, O&M contractors, IPP owners and offtakers in Saudi Arabia, the UAE and Qatar, by which loss they hold and how fast they can buy. That map decides where Mizan sells first and what it says.",
  minutes: 70,
  objectives: [
    "You can name, for a given Gulf PV plant, who holds the lost energy revenue, the cleaning cost, the performance guarantee risk and the fuel cost of soiling",
    "You can place each buyer type on a map of loss held versus speed to purchase and explain the first-sale choice",
    "You can size the soiling prize for the same plant from two holders' viewpoints without double counting",
    "You can write a one-page account plan for one buyer type, with the contract that makes them hold the loss",
  ],
  concepts: [
    {
      id: "mz11.loss-holder",
      name: "Contractual holder of the soiling loss",
      description:
        "The party whose cash flow falls when panels are dirty, as set by the PPA, the O&M agreement and the EPC performance test: the IPP holds energy revenue, the O&M contractor holds cleaning cost and any PR guarantee, the EPC holds only the test-period risk, the offtaker holds the fuel cost.",
      competency: "mz-business",
      related: ["mz04.value-of-soiled-mwh", "mz04.incentive-gap", "m11.offtaker-role", "fc04.buying-committee"],
    },
    {
      id: "mz11.buyer-map",
      name: "Mizan buyer map",
      description:
        "A grid of buyer types (MEWRE, KISR, KAPP, IPP project companies, EPCs, O&M contractors, IPP owners, Gulf offtakers) by loss held and by speed and freedom to buy; it sets the order of accounts and the message for each.",
      competency: "mz-business",
      related: ["mz11.loss-holder", "fc03.icp", "fc03.beachhead"],
    },
    {
      id: "mz11.gulf-ipp-model",
      name: "Gulf IPP contract chain",
      description:
        "State offtaker (MEWRE, EWEC, SPPC, KAHRAMAA) signs a long-term PPA with a project company owned by developers (and in Kuwait a public share); the project company hires an EPC to build and an O&M contractor to run, often an affiliate of the lead developer.",
      competency: "mz-business",
      related: ["m11.kapp-stages", "m11.ppp-shareholding", "mz11.loss-holder"],
    },
    {
      id: "mz11.value-by-holder",
      name: "Prize size depends on the holder",
      description:
        "The same cleaning improvement is worth tariff times recovered energy to an IPP, fuel value times recovered energy to a state owner, and avoided cleaning cost to an O&M contractor; quote the number that belongs to the buyer in the room.",
      competency: "mz-business",
      related: ["mz04.stakeholder-optimum", "mz04.state-owned-value", "mz11.loss-holder"],
    },
  ],
  sections: [
    // ------------------------------------------------------------------ THEORY
    {
      layer: "theory",
      title: "Follow the loss through the contracts",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Mizan sells soiling analytics, cleaning optimisation and plant control functions. Everyone you meet in Kuwait and the Gulf will agree that dust is a problem; very few of them will pay to fix it, because the loss usually lands on someone else's books. If you pitch the plant manager on lost MWh when his contract pays him for availability, or pitch MEWRE on cleaning cost it never pays, the meeting goes well and nothing happens. The buyer map is how you avoid a year of friendly meetings.`,
        },
        {
          kind: "xref",
          to: "m00-l02",
          note: "Track 0: Kuwait's institutions and decision chains (MEWRE, KAPP and its Higher Committee, the Audit Bureau and other control bodies). This lesson only adds who holds the soiling loss and who can buy analytics.",
        },
        {
          kind: "xref",
          to: "mz04-l02",
          note: "Mizan track: why the same soiled MWh is worth the tariff to the IPP, fuel minus tariff to the offtaker and fuel to the nation, and the incentive gap that follows. Here we turn that into a sales map.",
        },
        {
          kind: "md",
          md: md`## Four losses, four holders

Dust on a module creates four separate costs. Each sits with whoever the contracts assign it to:

1. **Lost energy revenue.** Under an energy-only PPA the project company (the IPP) is paid per MWh delivered. Soiling is normally the seller's risk, so the IPP loses tariff $t$ per soiled MWh.
2. **Cleaning cost.** Water, trucks, crews, robots and their spares. Usually inside the O&M agreement: the O&M contractor pays it out of a fixed fee, or the owner pays it as a pass-through. Who pays depends on the O&M contract, not on physics.
3. **Guarantee risk.** Many O&M agreements carry an availability guarantee and some carry a performance ratio (PR) guarantee with liquidated damages. Soiling may be inside the PR guarantee (the O&M contractor holds it) or excluded by a correction (the owner holds it). The EPC holds soiling only during the performance test at completion and any defects-period PR test.
4. **Fuel cost.** When dust removes a MWh, the grid makes it with gas or oil. The offtaker, a state utility, pays for that fuel: $v - t$ per MWh if it also stops paying the tariff, the full $v$ if it owns the plant.

The sales consequence is simple: **sell to the holder of the loss your product reduces, in the unit they are measured on.** A frequency optimiser reduces cleaning cost (O&M contractor or owner, depending on the contract) and soiling loss (IPP). A storm-response stow function reduces damage and soiling risk (owner, insurer). A soiling atlas reduces uncertainty in yield estimates for new bids (developers, lenders' advisers, KAPP).`,
        },
        { kind: "equation", formula: "mz04-value-viewpoints" },
        {
          kind: "md",
          md: md`## The Gulf IPP contract chain

Utility PV in Saudi Arabia, the UAE, Qatar and now Kuwait is mostly built under the same chain: a **state offtaker** signs a 25 to 35 year PPA with a **project company**; the project company is owned by developers (and in Kuwait, for large PPP projects, by citizens through an IPO share and by public entities); it hires an **EPC** to build and an **O&M contractor** to run, often an affiliate of the lead developer.

| Buyer type | Kuwait examples | Gulf examples | Holds which loss | Typical buying behaviour |
|---|---|---|---|---|
| **State owner and operator** | MEWRE (owner of Shagaya Phase I after transfer from KISR); KISR operates it | Utilities that own legacy plants | All four, valued at fuel | Public procurement (CAPT, direct contracting); research route via KISR |
| **Research body** | KISR | KAUST and QEERI (research centres) | None commercially; holds the method question | Collaboration agreements, joint papers, grants |
| **PPP procurer** | KAPP | National procurement programmes (in Saudi Arabia SPPC runs IPP tenders) | None directly; writes the RFP and draft PPA | Influences specifications of future rounds; does not buy analytics for plants |
| **Offtaker** | MEWRE under KAPP PPAs (Shagaya Phase III Zone 1, 30-year PPA) | EWEC (Abu Dhabi), SPPC (Saudi Arabia), KAHRAMAA (Qatar) | Fuel cost of IPP soiling | Rarely buys plant tools; may buy system studies |
| **IPP project company** | Shagaya Zone 1: Masdar and Fouad AlGhanim and Sons consortium selected (MEED, 13 Aug 2026) | Sudair (ACWA Power, Badeel, SAPCO); Al Kharsaah (TotalEnergies, Marubeni, QatarEnergy) | Energy revenue | Asset manager signs; budget set at portfolio level |
| **O&M contractor** | Not yet appointed for Phase III zones (not found) | NOMAC at Sudair | Cleaning cost, availability and any PR guarantee | Plant manager and performance engineer; tools that cut opex or protect guarantees |
| **EPC** | Phase III EPCs not found in research | Large Chinese and international EPCs | Test-period PR only | Buys monitoring hardware for the build; a channel, rarely a buyer |
| **Hardware vendors and integrators** | Distribution thread: controls, PPC/EMS, cleaning robots | SUNPURE, Ecoppia, NOMADD, tracker vendors | None | Partner channel and competitor in bundles |

The Kuwait rows reflect public reporting up to early November 2026: the Shagaya Zone 1 award was reported as awaiting State Audit Bureau approval in late July 2026; the winning tariff, PPA signing and financial close were not found. Commercial operation is not expected before 2027.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "What is not confirmed",
          md: md`(1) The O&M structure of the Shagaya Phase III zones (affiliate of the developer or third party) is not in the research brief. (2) Whether Kuwait's KAPP PV PPAs or the Gulf PPAs carry a soiling clause, a PR guarantee or deemed-energy terms affected by soiling is not confirmed: read the draft PPA in the RFP before you claim who holds which loss on a named plant. (3) The offtaker names for the UAE, Saudi Arabia and Qatar are standard knowledge, not taken from the research brief. (4) Whether KISR still operates Shagaya Phase I in 2026 rests on the venture context; no 2026 operational news was found.`,
        },
        {
          kind: "matrix",
          title: "Where to sell first: loss held vs speed and freedom to buy",
          xAxis: ["Slow, rule-bound purchase", "Fast, discretionary purchase"],
          yAxis: ["Holds little of the loss", "Holds much of the loss"],
          cells: [
            { label: "State owner (MEWRE, KISR-operated plant)", detail: "Holds everything at fuel value, but buys through CAPT or direct contracting with audit review. Enter through the research route, convert later." },
            { label: "IPP owner and O&M contractor", detail: "Hold revenue, cleaning cost and guarantees, and can buy within an O&M or asset budget. Best first paying customers, mostly outside Kuwait today." },
            { label: "KAPP and offtakers", detail: "Hold fuel cost or the RFP pen, not a plant budget. Influence specifications for later rounds; do not forecast revenue from them." },
            { label: "EPCs and hardware vendors", detail: "Fast buyers of components, little exposure to soiling after handover. Use as channel and bundle partners." },
          ],
          caption: "The top-right cell is where revenue is; the top-left is where Kuwait's credibility is. A Kuwait-born company usually needs both: KISR-backed proof at home and paying IPP customers in the wider Gulf.",
        },
        {
          kind: "feynman",
          prompt: "Explain to Omar, in under two minutes, why the O&M contractor at a Gulf IPP and MEWRE as offtaker would value the same soiling analytics product differently, and what that means for who you call first.",
          keyPoints: [
            "The O&M contractor holds cleaning cost and any availability or PR guarantee under its O&M agreement; it values cost avoided and guarantee protection",
            "MEWRE as offtaker holds the fuel cost of soiled MWh (fuel value minus tariff) but has no plant budget and no say over cleaning under an energy-only PPA",
            "The IPP project company holds lost energy revenue at the tariff, which is low in the Gulf",
            "Call the party that both holds the loss your product reduces and can buy within its own budget: usually the IPP asset manager or O&M contractor; work the offtaker for specifications and policy",
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ APPLIED
    {
      layer: "applied",
      title: "Sizing the prize for two holders of the same plant",
      blocks: [
        {
          kind: "worked",
          title: "Same plant, two prizes (illustrative)",
          mode: "worked",
          given: md`Illustrative 500 MWp PV plant (the plant of mz04 lesson 1): clean output $E = 1{,}000{,}000$ MWh/yr, soiling rate $s = 0.4$ %/day, manual cleaning cost $C = $ USD 75,000 per full cycle. Today it is cleaned every 20 days because the O&M agreement says so. Two holders: an IPP paid an illustrative tariff of USD 15/MWh, and a state owner valuing energy at displaced LNG, about USD 85/MWh. Use $J(T) = 365C/T + pEsT/2$.`,
          steps: [
            { md: md`**Energy term per day of interval.** $pEs/2$. IPP: $15 \times 1{,}000{,}000 \times 0.004 / 2 = 30{,}000$ USD/yr per day. State: $85 \times 1{,}000{,}000 \times 0.004/2 = 170{,}000$ USD/yr per day. Cleaning term numerator: $365 \times 75{,}000 = 27{,}375{,}000$ USD.` },
            { md: md`**Optimal intervals.** IPP: $T^* = \sqrt{27{,}375{,}000/30{,}000} = \sqrt{912.5} = 30.2$ days. State: $T^* = \sqrt{27{,}375{,}000/170{,}000} = \sqrt{161.0} = 12.7$ days.` },
            { md: md`**Cost today at 20 days.** IPP: $30{,}000 \times 20 + 27{,}375{,}000/20 = 600{,}000 + 1{,}368{,}750 = 1{,}968{,}750$ USD/yr. State: $170{,}000 \times 20 + 1{,}368{,}750 = 4{,}768{,}750$ USD/yr.` },
            { md: md`**Cost at each holder's optimum.** $J^* = 2\sqrt{(pEs/2)(365C)}$. IPP: $2\sqrt{30{,}000 \times 27{,}375{,}000} = 1{,}812{,}458$ USD/yr. State: $2\sqrt{170{,}000 \times 27{,}375{,}000} = 4{,}314{,}510$ USD/yr.` },
            { md: md`**Prize.** IPP: $1{,}968{,}750 - 1{,}812{,}458 = 156{,}292$, about USD 156k/yr, by cleaning **less** often. State: $4{,}768{,}750 - 4{,}314{,}510 = 454{,}240$, about USD 454k/yr, by cleaning **more** often.` },
          ],
          result: md`The same plant and the same physics give a prize of about USD 156k/yr pointing to fewer cleanings for an IPP, and about USD 454k/yr pointing to more cleanings for a state owner. A pitch that quotes the national number to an IPP is wrong twice: wrong size and wrong direction. On a 500 MWp IPP the frequency prize alone is about USD 0.3k per MWp per year, which caps what any frequency-only product can charge.`,
        },
        {
          kind: "worked",
          title: "Your turn: the same plant under a monthly contract",
          mode: "faded",
          given: md`Same illustrative plant, but the O&M agreement fixes cleaning every 30 days. Energy terms as above (IPP 30,000; state 170,000 USD/yr per day of interval).`,
          steps: [
            { md: md`State cost at 30 days: $170{,}000 \times 30 + 27{,}375{,}000/30$.`, hidden: true, check: { prompt: "State annual cost at T = 30 days (USD)", answer: 6012500, unit: "USD/yr", tolerance: { rel: 0.005 } } },
            { md: md`State prize: $6{,}012{,}500 - 4{,}314{,}510$.`, hidden: true, check: { prompt: "State prize from moving to its optimum (USD/yr)", answer: 1697990, unit: "USD/yr", tolerance: { rel: 0.01 } } },
            { md: md`IPP cost at 30 days: $30{,}000 \times 30 + 912{,}500 = 1{,}812{,}500$, within USD 50 of its optimum. The IPP prize is essentially zero.` },
          ],
          result: md`At a monthly schedule the IPP has nothing to gain from frequency optimisation, while the state would gain about USD 1.7 m/yr from cleaning roughly every 13 days. That is the incentive gap of mz04 lesson 2, seen as a sales problem: the party with the big prize does not control cleaning, and the party that controls cleaning has no prize.`,
        },
      ],
    },
    // ------------------------------------------------------------------ FIELD
    {
      layer: "field",
      title: "Building and using the map",
      blocks: [
        {
          kind: "md",
          md: md`## How to find out who holds the loss on a real plant

You rarely get the PPA or O&M agreement in a first meeting. You can still work it out:

- **Ask the plant team how they are measured.** "Which KPIs are in your O&M contract, and is soiling inside your PR guarantee or corrected out?" If the answer is availability only, cleaning cost is their lever and lost MWh is not.
- **Ask who decides the cleaning schedule.** If the schedule is fixed in the O&M contract, a frequency change is a contract variation signed by the asset manager, not by the plant manager.
- **Read the RFP documents where public.** KAPP RFPs include a draft PPA and technical requirements; they tell you what the offtaker requires to be monitored and reported.
- **Map the owner's portfolio.** ACWA Power, Masdar, TAQA, EDF, TotalEnergies, Marubeni and others own many Gulf plants. One asset-management decision can cover several sites: that is where enterprise deals come from.

## What this means for Mizan's order of play (as of November 2026)

- **Kuwait now:** almost all operating utility PV is small (Shagaya Phase I PV, 11.15 MW, cleaned monthly with water per the RSER 2020 paper). The large Phase III plants are awarded or in award, not built. Kuwait's near-term value is **credibility and method**: the soiling analytics pilot targeting Shagaya Phase I with KISR researchers as methodology partner (in preparation, not signed).
- **Kuwait next:** when Zone 1 and Zone 2 project companies and their O&M contractors are in place, they become the first Kuwaiti commercial buyers. Build the relationship with the consortium members and their O&M arms before COD, when they set up monitoring.
- **Gulf now:** large operating IPPs in Saudi Arabia, the UAE and Qatar with O&M teams and budgets. This is where the first paying customers can come from.`,
        },
        {
          kind: "ask",
          title: "Questions that reveal the loss holder",
          items: [
            "Who pays for cleaning on this plant, and is it inside a fixed O&M fee or passed through to the owner?",
            "Is soiling inside your PR guarantee, corrected out, or not guaranteed at all?",
            "Who can change the cleaning frequency, and does that need a variation to the O&M contract?",
            "When dust takes 1 % of output for a month, whose cash flow shows it first?",
            "Which other plants does the same owner or O&M company run, and who looks at them together?",
            "Who signs a USD 50k per year software or service order without a tender?",
          ],
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Common mapping mistakes",
          md: md`**Quoting the national prize to an IPP.** It is the wrong size and often the wrong direction. **Treating KAPP as a customer.** KAPP procures PPP projects; it does not run plants or buy analytics for them. **Selling to the EPC after handover.** The EPC's exposure ends at the performance test. **Forecasting revenue from friendly research meetings.** A KISR collaboration is a credibility asset, not a purchase order. **Ignoring the O&M contract.** If cleaning frequency is contractual, the plant manager cannot buy your recommendation even if he loves it.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "Keep the Kuwait pilot honest",
          md: md`In every map, deck and conversation the Shagaya Phase I work is **targeted** or **in preparation**. Never list KISR, MEWRE or any Gulf IPP as a customer, partner or pilot site until there is a signed document that says so.`,
        },
        {
          kind: "question",
          question: {
            id: "mz11-l01-p1",
            type: "short",
            prompt: md`Write a one-page account plan for **one** buyer type on Mizan's map: either (a) the future O&M contractor of a Shagaya Phase III zone, or (b) the asset-management team of a Saudi IPP owner running several plants. Include: who holds which soiling loss and why (name the contract), the product function you lead with and the unit of value you quote, the buying committee (roles, not invented names), what must be true before they can buy, and the first three actions with dates relative to today.`,
            rubric: [
              "Identifies correctly which losses this buyer holds and ties each to the contract that assigns it (PPA, O&M agreement, EPC test)",
              "Leads with a product function that reduces a loss this buyer holds, and quotes value in their unit (cleaning opex, guarantee exposure, revenue at tariff), not the national fuel value",
              "Names the buying committee by role (asset manager, plant manager, performance engineer, procurement, IT/OT security) and identifies who signs",
              "States preconditions honestly (e.g. Phase III O&M not yet appointed, PPA not confirmed signed; data access and security review) without inventing traction",
              "Gives three concrete, dated next actions that move toward a buyer decision",
              "Uses only illustrative numbers, clearly labelled, and does not present the Shagaya Phase I pilot as signed",
            ],
            modelAnswer: md`**Account plan: asset management, Saudi IPP owner (illustrative, no contact yet).**

**Loss holding.** The project companies hold lost energy revenue under energy-only PPAs with SPPC at tariffs of roughly USD 12 to 15/MWh (verify per plant). Cleaning cost and the availability guarantee sit with the O&M contractor (often an affiliate) under a fixed-fee O&M agreement; whether soiling is inside a PR guarantee must be confirmed. The owner sees both: revenue directly and O&M cost through the fee it negotiates.

**Lead function and unit.** Lead with cleaning-fleet analytics across the portfolio: robot rows that did not clean, post-storm recovery and event-driven extra cycles, reported as USD of O&M cost and MWh at tariff per plant per year. Do not quote fuel value: SPPC holds that. Frequency optimisation alone is worth only about USD 0.3k/MWp/yr at these tariffs (illustrative), so bundle it.

**Buying committee.** Head of asset management (economic buyer), portfolio performance engineer (champion), O&M contractor plant managers (users, potential blockers if it reads as auditing them), IT/OT security (data access to SCADA), procurement.

**Preconditions.** Read-only historian or SCADA export; security review; a reference result (the Kuwait methodology work is in preparation, not a reference yet); a pilot plant with a clear baseline.

**Next actions.** (1) Within 2 weeks: get an introduction to the portfolio performance team through a Gulf industry event or the existing network; discovery call on how cleaning is contracted and measured. (2) Within 6 weeks: request 12 months of anonymised inverter and met data from one plant for a retrospective analysis at our cost, with a short data agreement. (3) Within 10 weeks: present findings to the head of asset management with a paid pilot proposal on one plant and a pre-agreed conversion price.`,
            explanation: md`A good plan follows the money through the contracts, quotes value in the buyer's own unit, and is explicit about what is not yet true.`,
            concepts: ["mz11.loss-holder", "mz11.buyer-map", "mz11.value-by-holder"],
            difficulty: 2,
          },
        },
        { kind: "xref", to: "fc04-l01", note: "Founder Core: the buying committee and stage model. Apply them to each row of the buyer map." },
        { kind: "xref", to: "fc03-l02", note: "Founder Core: ICP and beachhead selection. The buyer map is Mizan's ICP across the Gulf." },
        { kind: "sources", refs: ["mz11-r1", "mz11-r5", "mz11-r8", "mz11-r7"] },
      ],
    },
  ],
  quiz: [
    {
      id: "mz11-l01-q1",
      type: "mcq",
      prompt: md`Under an energy-only PPA at a Gulf PV IPP, which party normally loses the tariff on each MWh lost to soiling?`,
      options: ["The offtaker", "The IPP project company", "The EPC contractor", "The PPP procurer (e.g. KAPP)"],
      answer: 1,
      explanation: md`The project company is paid per MWh delivered and soiling is normally the seller's risk. The offtaker loses fuel minus tariff, not the tariff.`,
      concepts: ["mz11.loss-holder"],
      difficulty: 1,
    },
    {
      id: "mz11-l01-q2",
      type: "multi",
      prompt: md`Which statements about the Kuwait buyers are correct as of November 2026? (Select all.)`,
      options: [
        "Shagaya Phase I was transferred to MEW (now MEWRE) after completion",
        "KAPP buys analytics services for operating PPP plants",
        "A Masdar and Fouad AlGhanim and Sons consortium was reported selected for Shagaya Phase III Zone 1",
        "The Zone 1 winning tariff and PPA signing were confirmed in public sources",
      ],
      answer: [0, 2],
      explanation: md`Ownership of Phase I passed to the ministry; MEED reported the Zone 1 selection on 13 August 2026. KAPP procures PPP projects and does not run plants; the tariff and PPA signing were not found.`,
      concepts: ["mz11.buyer-map", "mz11.gulf-ipp-model"],
      difficulty: 2,
    },
    {
      id: "mz11-l01-q3",
      type: "numeric",
      prompt: md`Illustrative 500 MWp plant: energy term $pEs/2 = 30{,}000$ USD/yr per day for the IPP and cleaning numerator $365C = 27{,}375{,}000$ USD. Cleaning is every 15 days today. What is the IPP's annual saving (USD) from moving to its optimum, where $J^* = 1{,}812{,}458$ USD/yr?`,
      answer: 462542,
      tolerance: { rel: 0.01 },
      unit: "USD/yr",
      explanation: md`$J(15) = 30{,}000 \times 15 + 27{,}375{,}000/15 = 450{,}000 + 1{,}825{,}000 = 2{,}275{,}000$. Saving $= 2{,}275{,}000 - 1{,}812{,}458 = 462{,}542$ USD/yr, by cleaning half as often.`,
      concepts: ["mz11.value-by-holder"],
      difficulty: 2,
    },
    {
      id: "mz11-l01-q4",
      type: "decision",
      prompt: md`A plant manager at a Gulf IPP loves your soiling dashboard and says "I want this". His O&M contract fixes cleaning every 4 days and measures him on availability. What do you do next?`,
      options: [
        { text: "Send him a quotation for the full product and wait for the purchase order.", score: 0.2, feedback: "He probably cannot buy a frequency change he is not allowed to make, and may not have a software budget." },
        { text: "Ask who can vary the cleaning schedule and who owns the O&M budget, and ask him to introduce you to the asset manager with a short note on the cost he could save.", score: 1, feedback: "Right: he is a champion, not the economic buyer. The schedule is contractual, so the decision sits with the owner." },
        { text: "Offer him the product free for a year so he can show it around.", score: 0.3, feedback: "A free tool used by someone who cannot act on it rarely converts and teaches you little." },
        { text: "Pitch him on the national fuel saving to make the case bigger.", score: 0, feedback: "That value belongs to the offtaker; it does not help him or the IPP." },
      ],
      explanation: md`Find the holder of the loss and the person who controls the decision; use the enthusiastic user as a champion.`,
      concepts: ["mz11.loss-holder", "mz11.buyer-map"],
      difficulty: 2,
    },
    {
      id: "mz11-l01-q5",
      type: "mcq",
      prompt: md`When does the EPC contractor normally carry soiling risk on a PV plant?`,
      options: [
        "For the full life of the PPA",
        "Only during the performance test at completion and any defects-period PR test",
        "Never, under any contract",
        "Whenever the offtaker curtails the plant",
      ],
      answer: 1,
      explanation: md`The EPC's performance obligations end with the completion tests and defects period; afterwards soiling sits with the owner and the O&M contractor.`,
      concepts: ["mz11.loss-holder"],
      difficulty: 1,
    },
    {
      id: "mz11-l01-q6",
      type: "order",
      prompt: md`Order the contract chain of a Kuwaiti PV PPP from the state to the field.`,
      items: [
        "MEWRE as offtaker under the PPA",
        "Project company (developers plus public and IPO shares)",
        "EPC contractor (build) and O&M contractor (operate)",
        "Cleaning crews or robot fleet on site",
      ],
      explanation: md`The offtaker contracts with the project company; the project company contracts the EPC and O&M; the O&M contractor runs cleaning.`,
      concepts: ["mz11.gulf-ipp-model"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "mz11-l01-f1", front: "Four soiling losses and their usual holders", back: "Energy revenue: IPP. Cleaning cost: O&M contractor or owner (per O&M contract). Guarantee risk: O&M contractor (PR/availability) or EPC (test period). Fuel cost: offtaker.", concepts: ["mz11.loss-holder"] },
    { id: "mz11-l01-f2", front: "Sales rule from the buyer map", back: "Sell to the holder of the loss your product reduces, in the unit they are measured on.", concepts: ["mz11.buyer-map"] },
    { id: "mz11-l01-f3", front: "Gulf state offtakers", back: "Kuwait MEWRE (via KAPP PPAs), Abu Dhabi EWEC, Saudi Arabia SPPC, Qatar KAHRAMAA.", concepts: ["mz11.gulf-ipp-model"] },
    { id: "mz11-l01-f4", front: "Illustrative 500 MWp prize at 20-day cleaning", back: "IPP at USD 15/MWh: about USD 156k/yr by cleaning less (T* 30 days). State at USD 85/MWh: about USD 454k/yr by cleaning more (T* 13 days).", concepts: ["mz11.value-by-holder"] },
    { id: "mz11-l01-f5", front: "Is KAPP a customer for analytics?", back: "No. It procures PPP projects and writes RFPs and draft PPAs; influence it on specifications, do not forecast revenue from it.", concepts: ["mz11.buyer-map"] },
    { id: "mz11-l01-f6", front: "Kuwait's near-term role for Mizan (Nov 2026)", back: "Credibility and method (KISR-backed Shagaya Phase I pilot, in preparation); first paying customers more likely at operating Gulf IPPs; Phase III plants not yet built.", concepts: ["mz11.buyer-map"] },
  ],
};

export default lesson;
