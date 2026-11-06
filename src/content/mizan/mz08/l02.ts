import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz08-l02",
  title: "Kuwait's BESS programme and where a distributor fits",
  summary:
    "What is publicly known about MEWRE's planned 1 to 1.5 GW / 4 to 6 GWh battery programme as of November 2026 (with dates and what is unverified), how the value chain from cells to O&M splits the money, and which roles a small Kuwaiti company like Mizan can realistically take without a balance sheet.",
  minutes: 50,
  objectives: [
    "You can state the dated facts of Kuwait's BESS programme and flag which ones are unverified",
    "You can size the supply pools (DC blocks, turnkey, LTSA, augmentation) for phase 1 with labelled illustrative prices",
    "You can map the BESS value chain and say which roles need capital, which need technical credibility and which need local presence",
    "You can choose a realistic entry role for Mizan and say what it requires before a tender appears",
  ],
  concepts: [
    {
      id: "mz08.kuwait-bess-programme",
      name: "Kuwait BESS programme (status Nov 2026)",
      description:
        "Announced by MEWRE on 11 Nov 2025 as 1 to 1.5 GW / 4 to 6 GWh; sites at Al-Mutlaa City and Jaber Al-Ahmad City approved June 2026; about 1,500 MW phased, first phase about 500 MW, aiming at summer peaks from 2027. Award timing and procurement route unverified.",
      competency: "mz-grid",
      related: ["m00.peak-demand", "m00.reserve-margin", "mz08.evening-peak-duty"],
    },
    {
      id: "mz08.value-chain",
      name: "BESS value chain and money pools",
      description:
        "Cells, DC blocks, PCS, EMS, balance of plant and EPC, grid connection, LTSA and O&M, augmentation. Most capex sits in DC blocks and EPC; most recurring revenue in LTSA, O&M and augmentation.",
      competency: "mz-business",
      related: ["m05.supply-chain", "m05.ltsa-guarantee"],
    },
    {
      id: "mz08.entry-role",
      name: "Local entry roles",
      description:
        "Commercial agent, service partner, software and EMS partner, owner's support or prime contractor. Each needs a different mix of capital, technical credibility and local presence; a pre-revenue company can credibly start only with the first three.",
      competency: "mz-business",
      related: ["fc03.partner-economics", "m11.local-content", "mz08.value-chain"],
    },
    {
      id: "mz08.route-uncertainty",
      name: "Procurement route uncertainty",
      description:
        "Whether the programme is procured as MEWRE EPC through CAPT or as a PPP through KAPP is not confirmed; the route decides who Mizan sells to (the ministry, a developer or an EPC) and when.",
      competency: "mz-business",
      related: ["m11.procurement-regimes", "m11.kapp-stages", "m11.capt-role"],
    },
  ],
  sections: [
    // ------------------------------------------------------------------ THEORY
    {
      layer: "theory",
      title: "What is known, dated",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`A multi-GWh programme in Mizan's home market is the largest near-term pool of energy hardware money in Kuwait. You will not win it as a prime, but integrators, EPCs and developers bidding it will need local partners for agency, service and software. Knowing the dated facts, the money pools and the roles lets you approach them with a specific offer instead of a request to "explore cooperation".`,
        },
        {
          kind: "xref",
          to: "m00-l04",
          note: "Track 0: Kuwait's targets and project pipeline, and how to grade the confidence of announced projects. Apply the same discount to the BESS programme.",
        },
        {
          kind: "md",
          md: md`## The record as of November 2026

| Date | What | Source | Confidence |
|---|---|---|---|
| 11 Nov 2025 | MEWRE announces a **1 to 1.5 GW / 4 to 6 GWh** BESS programme to ease summer supply | SolarQuarter, AGBI | Reported by two outlets |
| Jun 2026 | Sites at **Al-Mutlaa City** and **Jaber Al-Ahmad City** approved; programme about **1,500 MW, phased, first phase about 500 MW**, aiming to support **summer peaks from 2027** | MEED, Zawya | Reported by two outlets |
| H2 2026 | Award expected | US ITA market profile | **Unverified**: single source, no award found by early Nov 2026 |

Two inferences, labelled as such: the energy-to-power ratio of the announcement (4 to 6 GWh for 1 to 1.5 GW) implies **about 4-hour** systems, which matches the evening-peak duty of lesson 1. And a summer 2027 target from a mid-2026 site approval is very tight for 500 MW: Gulf BESS projects have been built in about 12 to 18 months from award, so any slip in award moves first power to 2028.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Unknown as of November 2026",
          md: md`Not established by the research brief: the procurement route (MEWRE EPC tendered through CAPT, or a PPP through KAPP with a developer and offtake contract), the tender documents, prequalified bidders, the award date, the split of phase 1 between the two sites, the cell chemistry or safety standards specified, and any local-content rule. Check MEED, KAPP and CAPT announcements before quoting any of these.`,
        },
        {
          kind: "flow",
          title: "Programme timeline (reported and inferred)",
          steps: [
            { label: "Nov 2025", detail: "Programme announced, 1 to 1.5 GW / 4 to 6 GWh" },
            { label: "Jun 2026", detail: "Sites approved: Al-Mutlaa City, Jaber Al-Ahmad City" },
            { label: "H2 2026 (unverified)", detail: "Award expected per one source" },
            { label: "12 to 18 months", detail: "Typical build after award (inference)" },
            { label: "Summer 2027 target", detail: "First phase about 500 MW; slip risk to 2028" },
          ],
        },
        {
          kind: "md",
          md: md`## The value chain and where the money sits

| Layer | Who does it | Share of money | What it takes |
|---|---|---|---|
| **Cells** | A handful of Chinese cell makers dominate LFP | Inside DC block price | Gigafactories |
| **DC blocks** (containers with racks, BMS, liquid cooling, fire systems) | Cell makers and system integrators | Largest single hardware item | Product, certification, bankability |
| **PCS and MV skids** | Inverter makers, often the same integrator | Second hardware item | Grid-code compliance, derating at 50 °C |
| **EMS and plant controller** | Integrator or specialist | Small in capex, decisive in operation | Grid-code tuning, SCADA integration |
| **Balance of plant, civil, EPC** | Regional and international EPCs | Large | Balance sheet, bonds, site execution |
| **Grid connection** | MEWRE transmission | Owner scope or EPC | Substation works |
| **LTSA and O&M** | Integrator plus local service partner | Recurring 15 to 20 years | Local technicians, spares, response times |
| **Augmentation** | Integrator under LTSA, or owner | Recurring tranches | Compatible equipment, space planned |`,
        },
        { kind: "equation", formula: "mz08-pool-value" },
        { kind: "equation", formula: "mz08-ltsa-pool" },
        {
          kind: "matrix",
          title: "Entry roles for Mizan",
          xAxis: ["Low capital needed", "High capital needed"],
          yAxis: ["Low differentiation", "High differentiation"],
          cells: [
            { label: "Software, EMS integration, testing and analytics partner", detail: "High credibility, low capital: start here, ties to the soiling product" },
            { label: "Integrator or EPC prime", detail: "Bonds, balance sheet, references: not now" },
            { label: "Commercial agent for an integrator", detail: "Commission on equipment; fragile if the integrator sells direct" },
            { label: "Stocking distributor and spares warehouse", detail: "Inventory risk, thin margin: avoid early" },
          ],
          caption: "The top-left box is where a technical, pre-revenue company can be credible. Agency (bottom left) can fund it but is easy to bypass.",
        },
        { kind: "sources", refs: ["mz08-r1", "mz08-r2", "mz08-r3", "mz08-r4", "mz08-r5", "mz08-r9"] },
      ],
    },
    // ------------------------------------------------------------------ APPLIED
    {
      layer: "applied",
      title: "Sizing the pools for phase 1",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Phase 1: 500 MW for 4 hours",
          given: md`Phase 1 is taken as **500 MW / 2,000 MWh at the POI** (4 h, an inference from the announcement). Use the lesson 1 multiplier (DC = POI / 0.8037). **Illustrative prices, not quotes:** DC blocks USD 70 per kWh DC; turnkey (DC blocks, PCS, EMS, balance of plant and EPC, excluding grid connection) USD 180 per kWh at the POI; LTSA 1.5 % of turnkey capex per year; augmentation hardware USD 60 per kWh DC in year 5.`,
          steps: [
            { md: md`**DC nameplate:** $2{,}000/0.8037 = 2{,}488.5$ MWh, about 500 containers of 5 MWh.` },
            { md: md`**DC block pool:** $2{,}488.5 \times 70 \times 1000 =$ USD 174.2 m.` },
            { md: md`**Turnkey pool:** $2{,}000 \times 180 \times 1000 =$ USD 360 m (about KWD 111 m at 3.25 USD/KWD).` },
            { md: md`**LTSA pool:** $0.015 \times 360 =$ USD 5.4 m a year, for 15 to 20 years.` },
            { md: md`**First augmentation:** $2{,}488.5 \times (1 - 0.904) = 238.9$ MWh; $238.9 \times 60 \times 1000 =$ USD 14.3 m around year 5.` },
            { md: md`**What a local partner might see (illustrative):** a 3 % agency commission on DC blocks is USD 5.2 m once; a service subcontract worth 30 % of the LTSA is USD 1.6 m a year. Both depend on a supplier choosing you and the buyer's rules allowing it.` },
          ],
          result: md`Phase 1 is a pool of roughly USD 360 m of turnkey capex plus about USD 5 m a year of service and a USD 14 m augmentation tranche, on illustrative prices. The recurring service and augmentation pools are smaller but last 15 to 20 years and reward a local, technical partner: that is Mizan's natural lane.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "The whole programme",
          given: md`Take the full programme as **1,500 MW / 6,000 MWh at the POI** and the same illustrative prices.`,
          steps: [
            {
              md: md`DC nameplate: $6{,}000/0.8037 = 7{,}465.5$ MWh.`,
              hidden: true,
              check: { prompt: "DC nameplate for the full programme", answer: 7465.5, unit: "MWh", tolerance: { rel: 0.01 } },
            },
            {
              md: md`Turnkey pool: $6{,}000 \times 180 \times 1000 =$ USD 1,080 m.`,
              hidden: true,
              check: { prompt: "Turnkey pool", answer: 1080, unit: "USD m", tolerance: { rel: 0.01 } },
            },
            { md: md`LTSA pool: $0.015 \times 1{,}080 =$ USD 16.2 m a year.` },
          ],
          result: md`About USD 1.1 bn of capex and USD 16 m a year of service on illustrative prices. Treat it as an order of magnitude; real prices and scope splits will come from the tender.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Prices move fast",
          md: md`LFP cell and DC block prices fell steeply in 2023 to 2025, and Gulf tenders have produced some of the lowest reported storage prices worldwide. The prices in this lesson are illustrative only, chosen to show the arithmetic. Before any business case, get two current integrator indications on the same scope and boundary (DC block versus turnkey, ex-works versus delivered Kuwait).`,
        },
      ],
    },
    // ------------------------------------------------------------------ FIELD
    {
      layer: "field",
      title: "Getting positioned before the tender",
      blocks: [
        {
          kind: "md",
          md: md`**Who buys from whom depends on the route.**

| If procured as | Mizan sells to | Timing | Watch for |
|---|---|---|---|
| **MEWRE EPC through CAPT** | EPC bidders and their integrators (subcontract, local service, EMS integration) | Before bid submission: teaming agreements | Local registration, CAPT classification, national preference rules |
| **PPP through KAPP** | Developer consortia and their EPCs; later the project company for O&M | Before bid: consortium teaming; after award: O&M and analytics | KAPP stages, developer shareholding rules |

**What to do now, in order:**

1. Track the tender (MEED, KAPP and CAPT notices) and log each dated fact with its source.
2. Shortlist integrators likely to bid (lesson 3 covers how to judge them) and ask each who its Kuwaiti partner is.
3. Offer a specific role: local service partner with named technicians and response times, EMS and SCADA integration support, or plant analytics. Not "representation".
4. Settle the legal form early: agency registration, exclusivity, commission and what happens if the integrator bids through an EPC instead.
5. Keep the soiling product in the conversation: the same owners run the PV plants that charge these batteries.`,
        },
        {
          kind: "callout",
          tone: "kuwait",
          title: "Agency and local content",
          md: md`Foreign suppliers selling into Kuwait commonly work through a registered local agent or distributor under the Commercial Agencies Law (Law No. 13 of 2016), and public tenders apply national-product preference and local-content rules (Track 0 m11-l04). Whether an agency is mandatory for a given BESS route, and what exclusivity and termination terms the law imposes, must be confirmed with Kuwaiti counsel before signing anything.`,
        },
        { kind: "xref", to: "m11-l03", note: "Track 0: how KAPP runs a PPP from expression of interest to award, if the programme goes that route." },
        { kind: "xref", to: "m11-l04", note: "Track 0: approvals, oversight, local content and national preference in Kuwaiti public procurement." },
        { kind: "xref", to: "fc04-l08", note: "Founder Core: enterprise and Gulf government procurement mechanics, outbound and CRM hygiene for a long tender cycle." },
        {
          kind: "checklist",
          title: "Before you approach an integrator about Kuwait",
          items: [
            "Dated facts of the programme with sources, and the unknowns listed honestly",
            "A one-paragraph role offer with what Mizan does, who does it and by when",
            "Evidence of local capability: people, workshop or partner, response time you can actually meet",
            "Draft term sheet points: territory, exclusivity, commission or fee, term, termination, conflicts",
            "How this fits Mizan's product story so the partnership is not a distraction",
          ],
        },
        {
          kind: "question",
          question: {
            id: "mz08-l02-p1",
            type: "short",
            prompt: md`Write the first email Mizan would send to the international sales director of a Chinese BESS integrator, proposing a role in Kuwait's BESS programme. Use only facts from this lesson and illustrative numbers where needed.`,
            rubric: [
              "States the programme facts correctly with dates (Nov 2025 announcement, June 2026 sites, about 500 MW first phase) and flags the award timing as unconfirmed",
              "Offers a specific role (local service partner, EMS and SCADA integration, analytics) rather than vague representation",
              "Shows why Mizan is credible: local presence, technical depth, existing relationships with PV owners and research bodies, without inventing customers or contracts",
              "Mentions the procurement route uncertainty and how Mizan would help the integrator navigate either route",
              "Ends with a concrete, small next step (a call, an NDA, a joint review of the tender when issued)",
            ],
            modelAnswer: md`**Subject: Kuwait 1.5 GW BESS programme: local service and integration partner**

Dear [name], MEWRE announced a 1 to 1.5 GW, 4 to 6 GWh battery programme in November 2025, and in June 2026 sites at Al-Mutlaa City and Jaber Al-Ahmad City were approved for about 1,500 MW in phases, starting with about 500 MW aimed at summer peaks from 2027. The award date and the procurement route (ministry EPC or a PPP through KAPP) are not yet confirmed. Mizan is a Kuwait-based energy engineering company working on PV plant analytics and control under dust and extreme heat, with a methodology relationship in preparation with Kuwaiti researchers on PV performance. We propose to act as your local partner for three things: (1) after-sales service and LTSA support with Kuwait-based technicians and defined response times; (2) EMS and SCADA integration with MEWRE's grid code and control centre requirements; (3) plant analytics covering capacity, auxiliaries and 50 °C operation. If the programme goes to an EPC tender we can support your teaming with EPC bidders; if it goes through KAPP we can support your developer partners. Could we hold a 30-minute call in the next two weeks, under NDA, to compare your Gulf references with what the tender is likely to require? Best regards, [name], Mizan.`,
            explanation: md`Facts dated and qualified, a specific offer, honest credibility and a small next step. It avoids inventing pilots, customers or a confirmed tender.`,
            concepts: ["mz08.kuwait-bess-programme", "mz08.entry-role", "mz08.route-uncertainty"],
            difficulty: 2,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz08-l02-q1",
      type: "order",
      prompt: md`Put the programme milestones in order.`,
      items: [
        "MEWRE announces a 1 to 1.5 GW / 4 to 6 GWh BESS programme",
        "Sites at Al-Mutlaa City and Jaber Al-Ahmad City approved",
        "Award (expected per one unverified source)",
        "First phase aims to support the summer peak",
      ],
      explanation: md`11 Nov 2025 announcement; June 2026 site approval; award reported as expected in H2 2026 (unverified); first phase aimed at summer peaks from 2027.`,
      concepts: ["mz08.kuwait-bess-programme"],
      difficulty: 1,
    },
    {
      id: "mz08-l02-q2",
      type: "mcq",
      prompt: md`What duration does the announcement's 4 to 6 GWh for 1 to 1.5 GW imply?`,
      options: ["1 hour", "2 hours", "About 4 hours", "About 8 hours"],
      answer: 2,
      explanation: md`$4/1 = 6/1.5 = 4$ h: evening-peak energy shifting.`,
      concepts: ["mz08.kuwait-bess-programme"],
      difficulty: 1,
    },
    {
      id: "mz08-l02-q3",
      type: "numeric",
      prompt: md`Illustrative: 300 MW / 1,200 MWh at the POI, turnkey USD 180 per kWh at the POI, LTSA 1.5 % of capex a year. What is the annual LTSA pool in USD m?`,
      answer: 3.24,
      tolerance: { rel: 0.01 },
      unit: "USD m/yr",
      explanation: md`Capex $= 1{,}200 \times 180 \times 1000 =$ USD 216 m; $0.015 \times 216 = 3.24$ m/yr.`,
      concepts: ["mz08.value-chain"],
      difficulty: 1,
    },
    {
      id: "mz08-l02-q4",
      type: "multi",
      prompt: md`Which facts about the programme were **not** established as of November 2026? (Select all.)`,
      options: ["Procurement route (CAPT EPC or KAPP PPP)", "The two approved sites", "Award date", "Any local-content rule for the tender", "The announced range of 4 to 6 GWh"],
      answer: [0, 2, 3],
      explanation: md`Sites and the announced range are reported by two outlets each. Route, award date and local-content rules were not found.`,
      concepts: ["mz08.kuwait-bess-programme", "mz08.route-uncertainty"],
      difficulty: 2,
    },
    {
      id: "mz08-l02-q5",
      type: "decision",
      prompt: md`Mizan has no balance sheet and no BESS references. Which first role in the programme is most credible?`,
      options: [
        { text: "Bid as EPC prime with a Chinese integrator as subcontractor", score: 0, feedback: "Bonds, references and balance sheet rule this out." },
        { text: "Local service, EMS integration and analytics partner to one or two integrators, with agency terms negotiated alongside", score: 1, feedback: "Uses local presence and technical credibility, needs little capital, and links to the soiling product." },
        { text: "Pure commercial agent collecting commission", score: 0.4, feedback: "Can generate cash, but is easily bypassed and builds no capability." },
        { text: "Import and stock containers for resale", score: 0, feedback: "Inventory risk with no differentiation." },
      ],
      explanation: md`Pick the role where capability matters more than capital.`,
      concepts: ["mz08.entry-role"],
      difficulty: 2,
    },
    {
      id: "mz08-l02-q6",
      type: "mcq",
      prompt: md`A colleague applies a DC block price of USD 70/kWh to the 2,000 MWh POI requirement and reports a USD 140 m DC block pool. What is wrong?`,
      options: [
        "Nothing",
        "Bases are mixed: DC price must be applied to DC nameplate (about 2,489 MWh), giving about USD 174 m",
        "LTSA is missing",
        "The price should be per kW",
      ],
      answer: 1,
      explanation: md`Match bases. DC MWh is about 1.24 times POI MWh.`,
      concepts: ["mz08.value-chain"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz08-l02-f1", front: "Kuwait BESS programme announcement", back: "11 Nov 2025: 1 to 1.5 GW / 4 to 6 GWh (about 4 h)", concepts: ["mz08.kuwait-bess-programme"] },
    { id: "mz08-l02-f2", front: "June 2026 milestone", back: "Sites at Al-Mutlaa City and Jaber Al-Ahmad City approved; about 1,500 MW phased, first phase about 500 MW, aiming at summer peaks from 2027", concepts: ["mz08.kuwait-bess-programme"] },
    { id: "mz08-l02-f3", front: "Unverified programme facts", back: "Award date (H2 2026 per one source), procurement route, tender rules, local content", concepts: ["mz08.route-uncertainty"] },
    { id: "mz08-l02-f4", front: "Where recurring BESS money sits", back: "LTSA, O&M and augmentation over 15 to 20 years", concepts: ["mz08.value-chain"] },
    { id: "mz08-l02-f5", front: "Mizan's credible first role", back: "Local service, EMS and SCADA integration and analytics partner to integrators; not EPC prime", concepts: ["mz08.entry-role"] },
    { id: "mz08-l02-f6", front: "Phase 1 turnkey pool (illustrative)", back: "2,000 MWh POI × USD 180/kWh = about USD 360 m", concepts: ["mz08.value-chain"] },
  ],
};

export default lesson;
