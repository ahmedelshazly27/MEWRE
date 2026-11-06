import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz07-l04",
  title: "Who owns which decision at a Kuwaiti plant, and what that means for selling",
  summary:
    "The decision map at a Kuwaiti PV plant: MEWRE as transmission owner, system operator and offtaker; KISR at Shagaya Phase I; KAPP and the IPP project companies at Zone 1 and Zone 2; O&M contractors and tracker vendors. Who decides cleaning, stow, set-points, data access and purchases, who captures the value of a recovered MWh, and where Mizan enters each.",
  minutes: 50,
  objectives: [
    "You can name the decision owner for cleaning, stow, export set-points, data access and procurement at Shagaya Phase I and at a KAPP IPP.",
    "You can compute how the value of recovered energy splits between an IPP (tariff) and the state (displaced fuel).",
    "You can choose Mizan's entry point and buyer for each plant type and say which approvals a grid-touching function needs.",
    "You can handle a MEWRE engineer's objections to a new control function at a plant.",
  ],
  concepts: [
    {
      id: "mz07.decision-map",
      name: "Plant decision map",
      description: "MEWRE: transmission, dispatch, connection requirements, offtake. KAPP: IPP procurement. IPP: plant capex/opex within the PPA. O&M contractor: daily cleaning and maintenance within the O&M contract. Tracker vendor: stow logic and warranty. KISR: research and Phase I operation.",
      competency: "mz-business",
      related: ["m00.mewre-role", "m00.decision-chain", "m00.kapp-higher-committee"],
    },
    {
      id: "mz07.buyer-by-site",
      name: "Buyer depends on the plant",
      description: "At state-owned Shagaya Phase I the buyer is public (MEWRE or KISR, via public tendering rules); at a KAPP IPP the buyer is the project company or its O&M contractor, whose incentive is PPA revenue and guarantees.",
      competency: "mz-business",
      related: ["mz07.decision-map", "mz04.incentive-gap"],
    },
    {
      id: "mz07.value-split",
      name: "Value split of a recovered MWh",
      description: "An IPP captures the PPA tariff on extra energy; the state captures displaced liquid fuel at the marginal heat rate. In Kuwait the state's value can be several times the IPP's, which shapes who will pay.",
      competency: "mz-business",
      related: ["mz04.state-owned-value", "mz04.value-of-soiled-mwh"],
    },
    {
      id: "mz07.grid-touching-approval",
      name: "Grid-touching functions need owner and MEWRE acceptance",
      description: "Analytics-only offers need the owner's data consent; functions that change output at the POI also need the PPC integrator, the tracker vendor's warranty position and, through the owner, MEWRE's acceptance and cybersecurity review.",
      competency: "mz-grid",
      related: ["mz07.ppc-authority", "m06.compliance"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "The decision map",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Selling to "Kuwait" fails; selling to the person who owns the decision works. At Shagaya Phase I and at the Zone 1 IPP the same soiling insight has different owners, different budgets and different reasons to care. Map who decides cleaning, who decides stow, who controls export and who signs purchases before you pitch, or you will spend months convincing someone who cannot say yes.`,
        },
        {
          kind: "xref",
          to: "m00-l02",
          note: "Track 0 maps Kuwait's institutions (MEWRE, KAPP, Audit Bureau, Fatwa and Legislation, CAPT) and decision chains. This lesson applies that map to plant-level decisions.",
        },
        {
          kind: "md",
          md: md`### Who decides what

| Decision | Shagaya Phase I (state-owned) | KAPP IPP (Zone 1, Zone 2) | Mizan's entry point |
|---|---|---|---|
| Export set-point, curtailment, dispatch | MEWRE control centre | MEWRE control centre, under PPA and connection agreement | None directly; read the signals (lesson 3) |
| Connection requirements, compliance | MEWRE Transmission | MEWRE Transmission, in RFP schedules and connection agreement | Comply through the owner and PPC (lesson 2) |
| Transmission (400 kV line, Al-Wafra) | MEWRE | MEWRE (line); developer (Zone 1 substation) | None |
| Cleaning frequency and method | Plant operator (monthly water cleaning reported in RSER 2020) | O&M contractor within the O&M contract; budget by the IPP | **Primary**: analytics and cleaning optimisation |
| Stow and tracker logic | Not applicable to the fixed-tilt Phase I PV (check) | IPP and tracker vendor (warranty) | Advisory stow layer, with vendor consent |
| Data access | MEWRE as owner; KISR as research operator | IPP as owner; MEWRE gets SCADA signals | Data-sharing agreement first |
| Purchase of software or services | Public body: public tendering rules (CAPT, Law 49/2016 as amended by Decree-Law 94/2026), or research collaboration | Private project company: commercial procurement, lender and O&M contract constraints | Research partnership at Phase I; commercial sale at IPPs |
| Research and validation | KISR | IPP's discretion | KISR as methodology partner |

Three structural facts follow.

1. **MEWRE is in every column but rarely the buyer of soiling analytics at an IPP.** It owns grid, dispatch and offtake, so it can block grid-touching functions and it captures the fuel value, but the IPP's cleaning budget is not MEWRE's.
2. **At Phase I, MEWRE and KISR are the decision owners**, and the natural first step is a research collaboration (methodology, validation, co-publication), not a commercial tender. Any later paid service follows public procurement rules (Track 0 m11).
3. **At IPPs, the economic buyer is the project company**, often acting through its O&M contractor. Its value is PPA revenue and meeting PR guarantees, not the state's fuel bill.`,
        },
        {
          kind: "matrix",
          title: "Where to sell what",
          xAxis: ["Analytics only (reads data)", "Control (changes output)"],
          yAxis: ["Private owner (IPP)", "State owner (MEWRE / KISR)"],
          cells: [
            { label: "State + analytics: Phase I pilot", detail: "Research collaboration with KISR; MEWRE consent for data; lowest approval burden; builds the credible method." },
            { label: "State + control: later", detail: "Needs MEWRE operating approval and public procurement; only after the method is proven." },
            { label: "IPP + analytics: first commercial sale", detail: "Buyer is the project company or O&M contractor; value via revenue, PR guarantee, deemed-energy settlement." },
            { label: "IPP + control: highest value, highest bar", detail: "Tracker vendor warranty, PPC integrator, owner's connection agreement, MEWRE acceptance and cybersecurity review." },
          ],
          caption: "Rows: state owner (top), IPP (bottom). Columns: analytics (left), control (right). Start top-left, where approvals are lightest and credibility is built, then move to IPP analytics.",
        },
        {
          kind: "md",
          md: md`### Who captures the value of a recovered MWh`,
        },
        { kind: "equation", formula: "mz07-value-split" },
        {
          kind: "md",
          md: md`The state's value per kWh is $HR / e_{\text{bbl}} \times p_{\text{oil}}$; at 10.5 MJ/kWh, 6.12 GJ/bbl and USD 70/bbl that is about USD 120/MWh of crude. Gulf PV tariffs have been in the low tens of USD/MWh; Zone 1's tariff is not public. So the state may value a recovered MWh several times more than the IPP that decides cleaning. That gap (mz04-l02, the incentive gap) is Mizan's strategic argument to MEWRE: the ministry, as offtaker and fuel payer, has a reason to require or reward soiling performance in future PPAs and O&M terms.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Ownership and operation details",
          md: md`The research brief says KISR transferred ownership of Shagaya Phase I to the ministry after completion; the venture context describes the site as operated by KISR. Who runs day-to-day O&M and cleaning at Phase I in 2026, and who signs data access, must be confirmed with KISR. Whether the Phase I PV is fixed-tilt or tracking should be checked from the RSER 2020 paper before any stow discussion. Zone 1's O&M contractor and tracker vendor are not public. Whether Decree-Law 94/2026 applies to KISR research collaborations is an inference, not checked.`,
        },
        { kind: "sources", refs: ["mz07-r6", "mz07-r10", "mz07-r11", "mz07-r19", "mz07-r18"] },
      ],
    },
    {
      layer: "applied",
      title: "Value split at an IPP and at Phase I",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "One percent less soiling at a 1,100 MW IPP: who gains what?",
          given: md`Illustrative: 1,100 MWac, capacity factor 0.26, so about 2,505 GWh/yr. Better cleaning decisions recover 1 % of annual energy. PPA tariff (illustrative, not Zone 1's): USD 13/MWh. State value: displaced crude at 10.5 MJ/kWh, 6.12 GJ/bbl, USD 70/bbl.`,
          steps: [
            { md: md`Recovered energy: $\Delta E = 0.01 \times 2{,}505 = 25.05$ GWh.` },
            { md: md`IPP value: $25{,}050\ \text{MWh} \times 13 = $ USD 325,700 per year, before extra cleaning cost.` },
            { md: md`Fuel displaced: $25.05 \times 10^6 \times 10.5 / 1{,}000 = 263{,}000$ GJ; $/6.12 = 42{,}980$ bbl.` },
            { md: md`State value: $42{,}980 \times 70 = $ USD 3.0 m per year, about 9 times the IPP's.` },
          ],
          result: md`The IPP's case for paying Mizan is about USD 0.3 m a year minus cleaning cost (and any PR guarantee exposure); the state's interest is about USD 3 m. Price the IPP offer against the IPP's number; use the state's number with MEWRE and KAPP to argue for soiling terms in future contracts.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "The same arithmetic for Shagaya Phase I PV",
          given: md`Phase I PV is about 10 MW (11.15 MW in the RSER paper). Illustrative: capacity factor 0.22 (state your own after reading the paper), 1 % energy recovered, same fuel assumptions.`,
          steps: [
            {
              md: md`Annual energy: $10 \times 8{,}760 \times 0.22 = 19{,}272$ MWh; 1 % is about 193 MWh.`,
              hidden: true,
              check: { prompt: "Energy recovered per year", answer: 193, unit: "MWh", tolerance: { rel: 0.01 } },
            },
            {
              md: md`Fuel: $193{,}000\ \text{kWh} \times 10.5\ \text{MJ} = 2{,}026$ GJ, about 331 bbl, about USD 23,000 a year.`,
              hidden: true,
              check: { prompt: "Value of displaced crude per year", answer: 23200, unit: "USD", tolerance: { rel: 0.03 } },
            },
            { md: md`Conclusion: Phase I is too small to be a revenue case. Its value to Mizan is the **method and the validation** (KISR co-authorship, the 2018 to 2019 natural experiment) that make the GW-scale sale credible.` },
          ],
          result: md`About 193 MWh and about USD 23,000 a year: sell Phase I as research, not as savings.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Selling into the decision map",
      blocks: [
        {
          kind: "md",
          md: md`**At Shagaya Phase I.** Start with KISR researchers on method and data; agree a data-sharing and co-publication framework; confirm with KISR who must consent for MEWRE. Keep the offer analytics-only. Describe the pilot as in preparation until something is signed.

**At a KAPP IPP.** The economic buyer is the project company's asset manager; the user is the O&M contractor's site manager; technical gatekeepers are the PPC integrator and the tracker vendor; the lender's technical adviser may review anything that touches guaranteed performance. Lead with analytics that improve cleaning spend and PR-guarantee defence, then deemed-energy settlement accuracy (lesson 3), then control.

**With MEWRE and KAPP.** Not a buyer of IPP analytics, but the owner of grid acceptance and the party that writes future RFP and PPA terms. The ask is policy-shaped: measured soiling on reference inverters for settlement, soiling stations to IEC 61724 on new plants, and data access for research.`,
        },
        {
          kind: "ask",
          title: "Questions that map the decision at a plant",
          items: [
            "Who decides when and how often the plant is cleaned, and under which contract?",
            "Does the O&M contract carry a PR guarantee, an availability guarantee, or both, and how is soiling treated?",
            "Who must consent for Mizan to read SCADA and PPC data, and does MEWRE need to be informed?",
            "Would the tracker vendor's warranty survive external stow requests, and on what conditions?",
            "How is deemed energy for curtailment estimated, and who checks the reference inverters are clean?",
          ],
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`1. Pitching control to MEWRE before the method is proven at Phase I. 2. Pricing an IPP offer on the state's fuel value, which the IPP does not capture. 3. Ignoring the O&M contractor, who can quietly kill a tool that exposes its cleaning record. 4. Treating KISR as a customer instead of a methodology partner. 5. Naming Zone 1 counterparties or tariffs that are not public.`,
        },
        { kind: "scenario", scenario: "mz07-s1" },
        {
          kind: "question",
          question: {
            id: "mz07-l04-p1",
            type: "short",
            explanation: md`Graded against the rubric. The map must separate the economic buyer, the user and the gatekeepers, give each a concrete ask, and keep to the public record.`,
            prompt: md`Produce a **stakeholder map** for selling Mizan's soiling analytics (and later stow control) at the Zone 1 IPP: for each of five to seven parties, give their role in the decision, what they care about, and Mizan's ask of them. Keep to facts in the public record and label assumptions.`,
            rubric: [
              "Includes the IPP project company (economic buyer), the O&M contractor (user and possible blocker), the tracker vendor and PPC integrator (technical gatekeepers), MEWRE (offtaker, transmission, control centre) and KAPP or lenders where relevant.",
              "States each party's incentive correctly (revenue and PR guarantee for the IPP; contract scope for O&M; warranty for the tracker vendor; reliability, fuel and compliance for MEWRE).",
              "Gives a concrete ask per party (data consent, pilot on blocks, warranty letter, acceptance of stow stagger plan, settlement method).",
              "Sequences analytics before control and identifies MEWRE acceptance and cybersecurity review for control.",
              "Uses only public facts (consortium selected per MEED Aug 2026; O&M contractor and tracker vendor unknown) and labels assumptions.",
            ],
            modelAnswer: md`- **IPP project company** (Masdar and Fouad AlGhanim and Sons consortium selected, per MEED 13 Aug 2026; PPA status not public). Role: economic buyer. Cares about PPA revenue, PR guarantee, opex. Ask: paid analytics pilot on part of the plant, data consent.
- **O&M contractor** (not public; assumed separate). Role: user, controls cleaning. Cares about contract scope and penalties. Ask: share cleaning logs; use Mizan's schedule as decision support; position it as protecting their availability and PR record.
- **Tracker vendor** (not public). Role: gatekeeper for stow. Cares about warranty and structural safety. Ask: written conditions under which external stow requests keep the warranty.
- **PPC integrator / inverter OEM**. Role: gatekeeper for grid compliance. Ask: read access to set-point, available power, Q and limit flags; agree the stow stagger interface.
- **MEWRE (Transmission and control centre; offtaker)**. Role: grid acceptance, curtailment, settlement. Cares about reliability, fuel, compliance. Ask, through the IPP: acceptance of the stow stagger plan and cybersecurity review; interest in clean-reference settlement.
- **Lenders' technical adviser** (assumed). Role: reviews anything affecting guaranteed performance. Ask: review of the method.
Sequence: analytics first, control after a proven season.`,
            concepts: ["mz07.decision-map", "mz07.buyer-by-site", "mz07.grid-touching-approval"],
            difficulty: 2,
          },
        },
        { kind: "xref", to: "m11-l03", note: "How KAPP procures IPPs and what the PPP route means for who holds which risk." },
      ],
    },
  ],
  scenarios: [
    {
      id: "mz07-s1",
      title: "The MEWRE transmission engineer and the stow function",
      dayInLife: true,
      context: md`You are presenting Mizan to the Zone 1 IPP's technical team. A MEWRE Transmission engineer has been invited. After your stow slide he says: "Your system will move a gigawatt of trackers on a windy afternoon. Who answers to the control centre when the plant drops 400 MW in two minutes?"`,
      start: "a",
      nodes: {
        a: {
          md: md`The room goes quiet. The IPP's asset manager looks at you.`,
          choices: [
            { text: "Say Mizan's algorithm is smart enough that it will not happen.", next: "b", score: 1, feedback: "An unsupported assurance to the grid owner; you have just become a risk." },
            { text: "Explain that the PPC stays the sole enforcer of ramps and set-points, Mizan only requests, stows are staggered to the plant's ramp limit, and structural safety stows are triggered earlier from forecasts. Offer to submit the stagger plan through the IPP for control-centre review.", next: "c", score: 10, feedback: "Clear authority, priority order and a route through the connected party." },
            { text: "Say grid compliance is the IPP's responsibility, not Mizan's.", next: "b", score: 3, feedback: "Legally true, commercially fatal: the IPP will not buy something that adds grid risk." },
          ],
        },
        b: {
          md: md`The engineer says he will recommend that no external control function be allowed on the plant until MEWRE has reviewed it. The asset manager suggests you "focus on the analytics for now".`,
          choices: [
            { text: "Accept, and propose an analytics-only phase with a written control interface statement for later review.", score: 6, feedback: "Recovers the deal at lower scope; you will need to rebuild trust for control." },
            { text: "Argue that MEWRE has no say over plant-side controls.", score: 0, feedback: "MEWRE holds the connection agreement and the control centre; arguing loses the room." },
          ],
        },
        c: {
          md: md`The engineer nods and asks a second question: "And your analytics: will you count our curtailment as soiling?"`,
          choices: [
            { text: "Explain that curtailed, limited and unavailable intervals are flagged from PPC set-points and status codes and excluded before fitting soiling, and that the same flags show whether reference inverters used for deemed energy are clean.", score: 10, feedback: "Shows you understand grid data and gives MEWRE, as offtaker, a reason to want the tool." },
            { text: "Say curtailment is rare at Shagaya.", score: 2, feedback: "Unknown and, with several plants on a few 400 kV circuits, possibly wrong." },
          ],
        },
      },
      concepts: ["mz07.grid-touching-approval", "mz07.ppc-authority", "mz07.confounders"],
    },
  ],
  quiz: [
    {
      id: "mz07-l04-q1",
      type: "mcq",
      prompt: md`At a KAPP solar IPP, who normally decides how often the plant is cleaned?`,
      options: ["MEWRE's control centre", "The O&M contractor within its contract, with the IPP setting the budget", "KAPP", "The tracker vendor"],
      answer: 1,
      explanation: md`Cleaning is plant opex: the IPP funds it and the O&M contractor executes it under the O&M contract.`,
      concepts: ["mz07.decision-map"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz07-l04-q2",
      type: "numeric",
      prompt: md`At 10.5 MJ/kWh, 6.12 GJ/bbl and USD 70/bbl, what is the value of displaced crude per MWh (USD/MWh, nearest whole number)?`,
      answer: 120,
      tolerance: { abs: 1 },
      unit: "USD/MWh",
      explanation: md`1 MWh = 1,000 kWh × 10.5 MJ = 10.5 GJ; $10.5 / 6.12 = 1.716$ bbl; $\times 70 = $ USD 120/MWh.`,
      concepts: ["mz07.value-split"],
      difficulty: 2,
    },
    {
      id: "mz07-l04-q3",
      type: "multi",
      prompt: md`Which approvals or consents does a stow-control function at an IPP need that an analytics-only offer does not?`,
      options: ["Tracker vendor warranty position", "PPC integrator agreement on the interface", "MEWRE acceptance and cybersecurity review, through the owner", "The plant owner's data consent"],
      answer: [0, 1, 2],
      explanation: md`Data consent is needed for both. Control adds warranty, PPC interface and grid-owner acceptance.`,
      concepts: ["mz07.grid-touching-approval"],
      difficulty: 2,
    },
    {
      id: "mz07-l04-q4",
      type: "mcq",
      prompt: md`What is the right framing of the Shagaya Phase I pilot?`,
      options: [
        "A commercial savings sale to MEWRE",
        "A research collaboration with KISR to build and validate the method, analytics only, in preparation",
        "A signed pilot already running",
        "A stow-control deployment",
      ],
      answer: 1,
      explanation: md`At about 10 MW, the savings are tens of thousands of USD a year; the value is method and validation. Never describe it as signed or running.`,
      concepts: ["mz07.buyer-by-site"],
      difficulty: 1,
    },
    {
      id: "mz07-l04-q5",
      type: "order",
      prompt: md`Order Mizan's market entry from lightest to heaviest approval burden.`,
      items: [
        "Analytics at state-owned Phase I as a KISR research collaboration",
        "Paid analytics for an IPP or its O&M contractor",
        "Advisory stow control at an IPP with vendor and PPC agreement",
        "Control functions at a state-owned plant under public procurement and MEWRE operating approval",
      ],
      explanation: md`Analytics before control; research before commercial; IPP control needs vendor, PPC and MEWRE acceptance; state control adds public procurement.`,
      concepts: ["mz07.decision-map", "mz07.grid-touching-approval"],
      difficulty: 2,
    },
    {
      id: "mz07-l04-q6",
      type: "decision",
      prompt: md`An IPP asks for a price. Your model shows the state saves about USD 3 m a year and the IPP gains about USD 0.3 m. How do you price?`,
      options: [
        { text: "Price at 20 % of the state's USD 3 m.", score: 0, feedback: "The IPP does not capture that value; it will not pay from it." },
        { text: "Price against the IPP's own value (revenue, cleaning cost saved, PR guarantee defence), and take the state's number to MEWRE and KAPP as a policy argument.", score: 1, feedback: "Price to the buyer's value; use the system value where it is captured." },
        { text: "Give it away free to get a reference.", score: 0.3, feedback: "A paid pilot proves willingness to pay; free rarely converts." },
      ],
      explanation: md`Value split: the IPP sees the tariff, the state sees fuel.`,
      concepts: ["mz07.value-split", "mz07.buyer-by-site"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz07-l04-f1", front: "Who owns export set-points and curtailment at a Kuwaiti plant?", back: "MEWRE's control centre, under the PPA and connection agreement.", concepts: ["mz07.decision-map"] },
    { id: "mz07-l04-f2", front: "Economic buyer of soiling analytics at a KAPP IPP", back: "The project company (asset manager), often via its O&M contractor.", concepts: ["mz07.buyer-by-site"] },
    { id: "mz07-l04-f3", front: "Value of displaced crude per MWh (10.5 MJ/kWh, USD 70/bbl)", back: "About USD 120/MWh, several times typical Gulf PV tariffs.", concepts: ["mz07.value-split"] },
    { id: "mz07-l04-f4", front: "Phase I pilot framing", back: "Research collaboration with KISR, analytics only, in preparation; value is method and validation, not savings (about 10 MW).", concepts: ["mz07.buyer-by-site"] },
    { id: "mz07-l04-f5", front: "Extra approvals for control vs analytics", back: "Tracker vendor warranty, PPC integrator interface, MEWRE acceptance and cybersecurity review through the owner.", concepts: ["mz07.grid-touching-approval"] },
    { id: "mz07-l04-f6", front: "MEWRE's role in Mizan's sale at an IPP", back: "Not the buyer, but the grid gatekeeper and the writer of future PPA/RFP terms (policy ask).", concepts: ["mz07.decision-map"] },
  ],
};

export default lesson;
