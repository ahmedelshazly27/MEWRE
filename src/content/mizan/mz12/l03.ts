import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz12-l03",
  title: "Working with Chinese integrators and international vendors: due diligence, certification, warranties, after-sales and payment terms",
  summary:
    "How to choose and contract a hardware vendor (often Chinese) for Kuwait: the due diligence that separates a factory from a trading house, the certification stack for modules, inverters, BESS and robots, warranty structures and how to back them, after-sales in a desert summer, Incoterms and landed cost, and payment terms from telegraphic transfer to confirmed letters of credit, with the cash exposure that each creates for a small company.",
  minutes: 80,
  objectives: [
    "You can run a vendor due diligence across corporate, technical, commercial and compliance dimensions.",
    "You can name the certifications to request for modules, inverters and PCS, BESS, and robots, and what each proves.",
    "You can structure a back-to-back warranty with a backstop the vendor cannot walk away from.",
    "You can compute landed cost, letter-of-credit cost and the peak cash exposure of a supply deal.",
    "You can write a vendor assessment and commercial terms memo for a hardware supplier.",
  ],
  concepts: [
    {
      id: "mz12.vendor-due-diligence",
      name: "Vendor due diligence",
      description:
        "Structured checks before contracting: corporate (licence, ownership, financials, export record, sanctions), technical (accredited test reports, desert references, factory audit, FAT), commercial (warranty terms, after-sales presence, spares) and compliance (origin, export controls, anti-bribery). Distinguishes a manufacturer from a trading company.",
      competency: "mz-business",
      related: ["mz12.certification-stack", "m02.module-procurement-qa"],
    },
    {
      id: "mz12.certification-stack",
      name: "Certification stack",
      description:
        "The standards each product must evidence: IEC 61215 and 61730 for modules; IEC 62109 safety and grid-code compliance for inverters and PCS; IEC 62619, IEC 62933, UL 1973, UL 9540 and UL 9540A fire testing for BESS, UN 38.3 for transport; machinery risk assessment, ingress protection (IEC 60529) and IEC 62443 cybersecurity for robots and controllers.",
      competency: "mz-business",
      related: ["m05.bess-codes", "m02.module-qualification"],
    },
    {
      id: "mz12.warranty-backstop",
      name: "Back-to-back warranty and backstop",
      description:
        "The vendor's warranty to Mizan must match or exceed Mizan's warranty to the customer in scope, duration and response, and be backed by something that survives the vendor's indifference or insolvency: retention or a warranty bond, a parent company guarantee, spares held locally, or insurance.",
      competency: "mz-business",
      related: ["m05.warranty", "m09.bess-ltsa"],
    },
    {
      id: "mz12.landed-cost",
      name: "Landed cost",
      description:
        "Full cost of goods delivered to site: FOB price plus freight and insurance (CIF), customs duty (the GCC common external tariff is commonly 5 % of CIF value, HS code dependent), clearance, port and inland transport. The true cost of goods for margin calculations.",
      competency: "mz-business",
      related: ["fc06.hardware-economics"],
    },
    {
      id: "mz12.letter-of-credit",
      name: "Letter of credit",
      description:
        "A bank's undertaking (under ICC UCP 600) to pay the seller against compliant documents (invoice, bill of lading, certificate of origin, inspection certificate). It replaces trust in the buyer with trust in a bank; a confirmed LC adds a second bank. Discrepant documents can block payment.",
      competency: "mz-business",
      related: ["mz12.cash-exposure"],
    },
    {
      id: "mz12.cash-exposure",
      name: "Peak cash exposure",
      description:
        "The largest gap between what Mizan has paid suppliers and what it has received from the customer during a deal. For a small company it, not the margin, decides whether a hardware deal is feasible; it is managed with LC terms, customer advances against guarantees and milestone alignment.",
      competency: "mz-business",
      related: ["mz12.letter-of-credit", "fc06.hardware-economics"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Choosing the vendor and the terms",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`The hardware Mizan might bring to Kuwait (cleaning robots, BESS, PPC hardware, trackers) is increasingly Chinese-made: new Gulf GW plants mostly run Chinese waterless robots, Arctech dominates Middle East trackers, and Kuwait itself signed a government-to-government renewables framework with China's National Energy Administration in March 2025. The vendor will usually be larger, faster and more experienced in exporting than Mizan. Your protection is a disciplined due diligence, a warranty you can enforce in Kuwait, and payment terms that do not let one deal consume the company's cash.`,
        },
        {
          kind: "md",
          md: md`### The market you are buying in

| Line | Typical suppliers seen in the Gulf (research brief) | What it means |
|---|---|---|
| Cleaning robots | SUNPURE (China): about 3,000 robots at Al Ajban, UAE (Jan 2026), SAAD 2 in Saudi Arabia; LEAPTING (China); NOMADD (Saudi Arabia, KAUST spin-off); SolarCleano (Luxembourg) | Chinese vendors lead on scale and price; regional references exist to visit |
| Trackers | Arctech (over 14 GW of Middle East awards), GameChange (large Saudi footprint) | Controls and stow integration go through these vendors (mz05) |
| Utility PV in Kuwait | China G2G track: framework with China's NEA (17 March 2025), SPIC reported for Shagaya Phases 3 and 4 (May 2025, contract status unverified) | Chinese EPCs and integrators may be Mizan's customers or partners, not only suppliers |
| BESS | MEWRE programme of about 1.5 GW, sites approved June 2026, first phase about 500 MW (award timing unverified) | Large integrators will bid with EPCs; Mizan's role is EMS integration, commissioning support, O&M or analytics |`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Vendors from Israel",
          md: md`The research brief lists Israeli robot vendors (Ecoppia, Airtouch) active in the UAE since 2020. Kuwait maintains a statutory boycott of Israel (commonly cited as Law 21 of 1964), and Kuwait has not normalised relations, so these vendors are not a practical option for Kuwait. Confirm the current legal position, including components and subsidiaries, with counsel before shortlisting any vendor with Israeli ownership or origin.`,
        },
        {
          kind: "md",
          md: md`### Due diligence in four dimensions

| Dimension | What to check | Evidence |
|---|---|---|
| **Corporate** | Is it the manufacturer or a trading house? Ownership, years in business, export history, financial strength, sanctions and export-control screening | Business licence, factory address and audit, audited accounts, export customs records, screening against UN, US, EU and UK lists |
| **Technical** | Certifications from accredited labs, desert and high-temperature references, design for 50 °C ambient and dust, factory quality system | Test reports (not only certificates), ISO 9001, reference site visits in the Gulf, FAT protocol |
| **Commercial** | Warranty scope, duration and exclusions; after-sales presence in the GCC; spares; price stability | Warranty document, service organisation chart, spares list and lead times, references from O&M contractors |
| **Compliance** | Country of origin and components, anti-bribery commitments, cybersecurity of remote access | Certificate of origin, bill of materials origin, anti-bribery clause, remote-access architecture |

**Manufacturer or trader?** Trading houses resell several factories' products under one brand. They are not always bad, but the warranty is only as good as their relationship with the factory. Ask for the factory address, visit it (or send an inspection firm), and check that the test reports name the same manufacturer and model as the quote.`,
        },
        {
          kind: "md",
          md: md`### The certification stack

| Product | Standards to request | What they prove (and do not) |
|---|---|---|
| PV modules | IEC 61215 (design qualification), IEC 61730 (safety) | Passed lab stress sequences; not field life in Kuwait (Track 0, m02-l03) |
| Inverters and PCS | IEC 62109-1 and -2 (safety); grid-code compliance evidence for Kuwait (mz07 covers the codes) | Safe design; grid behaviour must still be proven against MEWRE requirements at site |
| BESS | IEC 62619 (safety of industrial lithium cells and batteries), IEC 62933 series (system), UL 1973, UL 9540 with UL 9540A large-scale fire test data, UN 38.3 (transport), NFPA 855 design compliance | Cell and system safety and fire propagation behaviour; not performance warranty (Track 0, m05-l05) |
| Cleaning robots | Machinery risk assessment to ISO 12100 and CE marking where applicable; ingress protection to IEC 60529 (IP65 or better for dust); battery safety; compatibility letter from the tracker or module vendor | Safe machine and sealed electronics; module manufacturer's acceptance avoids voiding the module warranty |
| Controllers and gateways (PPC, EMS, fleet servers) | IEC 62443 (industrial cybersecurity), documented remote-access architecture | Secure development and zoning; not that remote access is disabled |

Kuwaiti conformity requirements (the Public Authority for Industry's standards and any product registration) and MEWRE's own approvals are separate from these international certificates; check what each buyer's specification demands.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Remote access to Chinese power electronics",
          md: md`Since 2025 there has been public debate in Europe and the US about remote access to Chinese inverters and batteries, including press reports of undocumented communication components. Research for this course did not verify specific findings. Treat it as a requirement, not a rumour: Mizan's specification should demand that vendor remote access is off by default, routed only through a gateway the owner controls, logged, and enabled per session.`,
        },
        {
          kind: "md",
          md: md`### Warranties: back-to-back and backed

Mizan's warranty to a plant owner is a promise; the vendor's warranty to Mizan is what pays for keeping it. Three rules:

1. **Back-to-back.** Scope, duration, response time and remedies in the vendor warranty must be at least what Mizan gives the customer. A 5-year customer warranty against a 2-year vendor warranty leaves 3 years on Mizan's balance sheet.
2. **Read the exclusions.** Desert-relevant exclusions are common: sand or dust ingress, operation above a stated ambient temperature, "improper cleaning", unauthorised firmware, grid events. One exclusion can void the warranty for Kuwait conditions.
3. **Back it.** A Chinese vendor's warranty is enforced in practice by commercial leverage, not by suing in Shenzhen. Leverage options: retention (5 to 10 % held until the end of the defects period) or a warranty bond from a bank Mizan can call; a parent company guarantee; spares held in Kuwait on consignment; the vendor's interest in future orders.

### Incoterms and landed cost

Incoterms 2020 (ICC) define where risk and cost pass from seller to buyer. **FOB** (named port of shipment): the buyer arranges and pays sea freight and insurance. **CIF**: the seller pays freight and minimum insurance, but risk passes when goods are loaded. **DAP** and **DDP**: the seller delivers to a named place, DDP also paying duties. For margin, always compute the landed cost:`,
        },
        { kind: "equation", formula: "mz12-landed-cost" },
        {
          kind: "md",
          md: md`### Payment terms and letters of credit

| Term | Seller's risk | Buyer's (Mizan's) risk | Typical use |
|---|---|---|---|
| T/T in advance (bank transfer before shipment) | None | Full: paid before seeing the goods | Vendor's first offer, small orders |
| T/T split (for example 30 % at order, 70 % before shipment) | Low | High | Common Chinese export default |
| Letter of credit at sight | Low (bank pays against documents) | Medium: paid against documents, not quality | Large orders; standard with new counterparties |
| LC with inspection certificate as a required document | Low | Lower: an independent inspector must pass the goods | Robots, BESS |
| Open account (pay 30 to 90 days after delivery) | High | Low | Established relationships |

A **letter of credit** under ICC UCP 600 is the issuing bank's promise to pay the seller when the seller presents documents that comply exactly with the credit. A **confirmed LC** adds the seller's bank's promise too. The buyer's bank will usually require cash cover or a credit line, so an LC does not remove the cash need; it shifts trust and timing.`,
        },
        {
          kind: "flow",
          title: "How a documentary letter of credit works",
          steps: [
            { label: "Contract", detail: "Sale contract specifies payment by LC, documents, latest shipment date and Incoterm" },
            { label: "Issue", detail: "Mizan's bank issues the LC (against cash cover or a credit line) to the vendor's bank" },
            { label: "Ship and inspect", detail: "Vendor passes the agreed pre-shipment inspection and ships" },
            { label: "Present", detail: "Vendor presents invoice, bill of lading, packing list, certificate of origin, inspection certificate" },
            { label: "Examine and pay", detail: "Banks check documents against the LC terms; compliant documents are paid, discrepancies are not" },
            { label: "Release", detail: "Mizan pays its bank, receives the documents and clears the goods" },
          ],
          caption: "Banks deal in documents, not goods. Make quality evidence (an independent inspection certificate) one of the documents.",
        },
        { kind: "equation", formula: "mz12-lc-cost" },
        { kind: "equation", formula: "mz12-peak-cash-exposure" },
        { kind: "sources", refs: ["mz12-r10", "mz12-r11", "mz12-r12", "mz12-r13", "mz12-r14", "mz12-r15", "mz12-r16", "mz12-r17", "mz12-r23", "mz12-r24", "mz12-r27"] },
      ],
    },
    {
      layer: "applied",
      title: "Landed cost and cash on a BESS supply",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Landed cost and LC cost for a 20 MWh BESS supply",
          given: md`All numbers illustrative, not market quotes. A Chinese integrator quotes a 5 MW / 20 MWh containerised BESS at USD 120 per kWh FOB Shanghai: USD 2.40 m. Sea freight and insurance to Shuwaikh port USD 90,000. Customs duty assumed at 5 % of CIF value (confirm HS code and any exemption). Clearance, port charges and inland transport to site USD 40,000. Payment: 30 % T/T at order, 70 % by LC at sight; the LC is open for 4 months at an all-in bank rate of 1.5 % per year plus USD 1,500 fixed fees.`,
          steps: [
            { md: md`**CIF value.** $2{,}400{,}000 + 90{,}000 = $ USD 2,490,000.` },
            { md: md`**Duty.** $0.05 \times 2{,}490{,}000 = $ USD 124,500.` },
            { md: md`**Landed cost.** $2{,}490{,}000 + 124{,}500 + 40{,}000 = $ USD 2,654,500, or $2{,}654{,}500 / 20{,}000 = $ USD 132.7 per kWh, 10.6 % above the FOB quote.` },
            { md: md`**LC cost.** $A = 0.70 \times 2{,}400{,}000 = $ USD 1,680,000. $C_{LC} = 1{,}680{,}000 \times 0.015 \times 4/12 + 1{,}500 = 8{,}400 + 1{,}500 = $ USD 9,900.` },
            { md: md`**Margin check.** Sold to an EPC at USD 3.0 m, gross profit is $3{,}000{,}000 - 2{,}654{,}500 - 9{,}900 = $ USD 335,600, or 11.2 %. Comparing the sale price with the FOB quote (25 % apparent margin) would have overstated it by more than half.` },
          ],
          result: md`Always price from landed cost. Freight, duty and port add about a tenth to a BESS FOB price here; the LC is cheap; the real constraint is the cash timing, computed next.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Peak cash exposure on the same deal",
          given: md`Same deal. Supplier side: 30 % of FOB at order (USD 720,000); 70 % at shipment through the LC (USD 1,680,000); freight, duty and local costs (USD 254,500) paid on arrival. Customer side (the EPC): 10 % advance at order against Mizan's advance payment guarantee (USD 300,000); 70 % on delivery to site (USD 2.1 m); 20 % on acceptance three months after delivery (USD 600,000). Ignore LC fees.`,
          steps: [
            {
              md: md`**After order.** Paid 720,000, received 300,000: net exposure USD 420,000.`,
              hidden: true,
              check: { prompt: "Net exposure after order (USD)", answer: 420000, tolerance: { abs: 100 } },
            },
            {
              md: md`**Just before delivery payment.** Paid $720{,}000 + 1{,}680{,}000 + 254{,}500 = 2{,}654{,}500$; received 300,000. Peak exposure USD 2,354,500.`,
              hidden: true,
              check: { prompt: "Peak cash exposure (USD)", answer: 2354500, tolerance: { abs: 500 } },
            },
            {
              md: md`**After delivery payment.** Received $300{,}000 + 2{,}100{,}000 = 2{,}400{,}000$: exposure USD 254,500 until acceptance.`,
              hidden: true,
              check: { prompt: "Exposure between delivery and acceptance (USD)", answer: 254500, tolerance: { abs: 100 } },
            },
            {
              md: md`**After acceptance.** Gross profit $3{,}000{,}000 - 2{,}654{,}500 = $ USD 345,500.`,
              hidden: true,
              check: { prompt: "Gross profit before LC fees (USD)", answer: 345500, tolerance: { abs: 100 } },
            },
            { md: md`**Fixes.** Move the supplier's 70 % to an LC payable 90 days after bill of lading (usance LC), raise the customer advance to 20 to 30 % against a guarantee, or let the integrator contract the hardware directly while Mizan carries only its service scope.` },
          ],
          result: md`A USD 345,500 gross profit needs USD 2.35 m of cash or credit for several weeks. For an early-stage Mizan that is the whole balance sheet. Either restructure the payment terms, or stay out of the hardware supply chain and sell the scope around it.`,
        },
        {
          kind: "question",
          question: {
            id: "mz12-l03-p1",
            type: "numeric",
            prompt: md`200 cleaning robots at USD 3,800 FOB each; freight and insurance USD 26,000; duty 5 % of CIF; clearance and inland transport USD 9,000. What is the landed cost per robot (USD)?`,
            answer: 4171.5,
            tolerance: { abs: 1 },
            unit: "USD",
            explanation: md`FOB $= 760{,}000$; CIF $= 786{,}000$; duty $= 39{,}300$; landed $= 786{,}000 + 39{,}300 + 9{,}000 = 834{,}300$; per robot $834{,}300/200 = $ USD 4,171.50, about 9.8 % above FOB.`,
            concepts: ["mz12.landed-cost"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Doing it with a real vendor",
      blocks: [
        {
          kind: "xref",
          to: "m05-l05",
          note: "Track 0 covers BESS safety codes, fire suppression, desert HVAC and FAT/SAT. Use it to read a BESS vendor's certification pack.",
        },
        {
          kind: "xref",
          to: "m05-l04",
          note: "Track 0 covers BESS capacity fade, augmentation, warranties and LTSA guarantees: the long-tail obligations a reseller would inherit.",
        },
        {
          kind: "xref",
          to: "mz04-l05",
          note: "Robot payback, fleet availability and common-mode failure are in mz04. They set what availability guarantee to demand from a robot vendor.",
        },
        {
          kind: "md",
          md: md`**Who does what.** You run the commercial process and the due diligence plan; Omar Abu Harb or an engineering partner owns the technical review; an independent inspection firm does the factory audit and pre-shipment inspection; a freight forwarder and customs broker handle logistics and the HS code; Mizan's bank structures the LC and guarantees; counsel reviews the supply contract.

**Desert reliability, concretely.** Ask each vendor for: operating data from a Gulf site through at least one full summer; failure rates by component; how electronics are derated at 50 °C ambient and what happens at 55 °C; sand sealing test results; and the name of an O&M manager at a reference site you can call without the vendor present.

**After-sales.** Return-to-factory repair means 6 to 10 weeks without the part. Insist on local spares (consignment stock), trained local technicians (Mizan's), a remote-support desk in a usable time zone, response times in the contract, and firmware updates tested before release on a non-critical unit.

**Payment discipline.** Never pay more advance than you can afford to lose. Match supplier milestones to customer milestones; use the inspection certificate as an LC document; take a warranty bond or retention; and never let an LC's latest-shipment date pass without a written amendment.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Certificates for a different model.** The quote is for model B; the test report is for model A from another factory.
- **Warranty voided by the environment.** An exclusion for "operation above 45 °C ambient" or "sand ingress" in a Kuwaiti summer.
- **LC discrepancies.** A misspelt name or a late shipment date lets either side reopen the deal; vendors know this better than first-time buyers.
- **Paying before the FAT.** Once the money is gone, the factory acceptance test becomes a formality.
- **Spares in China.** A robot fleet at 70 % availability in July because the replacement drive units are on a ship.
- **Uncontrolled remote access.** A vendor cloud with write access to plant equipment that the owner's security team never approved.`,
        },
        {
          kind: "checklist",
          title: "Vendor shortlist gate",
          items: [
            "Manufacturer confirmed (factory audit or inspection firm report)",
            "Sanctions and export-control screening done; origin compatible with Kuwaiti law",
            "Accredited test reports match the quoted model and factory",
            "Gulf reference site visited or called without the vendor present",
            "Warranty back-to-back with Mizan's offer; exclusions read for desert conditions",
            "Warranty backstop agreed (retention, bond, parent guarantee or local spares)",
            "Payment terms matched to customer milestones; peak cash exposure computed and funded",
            "Remote access off by default, through an owner-controlled gateway",
          ],
        },
        {
          kind: "ask",
          title: "Ask the vendor",
          items: [
            "Which factory makes this model, and can our inspector visit it before we sign?",
            "Show us summer operating data and failure rates from your hottest Gulf site.",
            "What does your warranty exclude, and what ambient temperature range does it cover?",
            "What spares will you hold in Kuwait, at whose cost, and with what response time?",
            "Will you accept an LC with an independent inspection certificate as a required document?",
            "How does your remote access work, and can it be disabled and routed through the owner's gateway?",
          ],
        },
        { kind: "scenario", scenario: "mz12-s2" },
        {
          kind: "question",
          question: {
            id: "mz12-l03-p2",
            type: "short",
            prompt: md`Write a vendor assessment and commercial terms memo (one page) for a Chinese BESS integrator or cleaning-robot manufacturer Mizan might work with in Kuwait. Use labelled illustrative numbers. Do not invent a real vendor's facts: describe what you would check.`,
            explanation: md`Strong answers check the vendor in four dimensions, ask for test reports rather than claims, make the warranty back-to-back and backed, and compute landed cost and peak cash exposure before agreeing payment terms.`,
            rubric: [
              "Covers due diligence in all four dimensions (corporate, technical, commercial, compliance) with the evidence required",
              "Lists the right certifications for the product and says what they do not prove",
              "Defines a back-to-back warranty with desert-relevant exclusions checked and a concrete backstop",
              "Proposes payment terms (LC, inspection certificate, retention or bond) and computes landed cost and peak cash exposure with illustrative numbers",
              "Specifies after-sales (local spares, response times, trained technicians) and remote-access controls",
              "States go or no-go criteria and open questions, without inventing vendor facts",
            ],
            modelAnswer: md`**Subject.** Assessment framework and proposed terms for a Chinese waterless cleaning-robot manufacturer (Vendor X, unnamed) for Kuwait utility PV. **Due diligence.** Corporate: business licence and factory address; independent factory audit; three years of accounts; export records to the GCC; sanctions and export-control screening; ownership check for origin restrictions under Kuwaiti law. Technical: IEC 60529 IP rating test report (IP65 or better), battery safety reports, machinery risk assessment to ISO 12100, module manufacturer compatibility letters for the modules in our target plants, summer operating data from a Gulf reference site, failure rates by component, derating at 50 to 55 °C. Commercial: warranty text and exclusions, GCC service team, spares list and lead times. Compliance: certificate of origin and key component origin, anti-bribery clause, remote-access architecture. **What the certificates do not prove.** IP and safety tests show sealed, safe machines in a lab, not 30,000 km of travel in Kuwaiti dust; only reference data does. **Warranty.** 5 years parts and labour back-to-back with Mizan's customer warranty; fleet availability guarantee of 97 % measured monthly (illustrative) with service credits; no exclusion for sand ingress or ambient up to 55 °C; backstop: 10 % retention converted to a bank warranty bond at acceptance, plus consignment spares worth 3 % of fleet value in Kuwait. **Payment and cash (illustrative).** 121 robots at USD 3,800 FOB; landed about USD 4,170 per robot (freight, 5 % duty on CIF, clearance). Terms: 10 % at order against the vendor's advance payment guarantee; 80 % by LC payable 60 days after bill of lading with an independent inspection certificate as a required document; 10 % retention to acceptance. Customer terms: 20 % advance against Mizan's guarantee, 70 % on delivery, 10 % on acceptance. Peak exposure: close to zero if delivery payment arrives before the LC falls due (the USD 121,000 customer advance covers the USD 46,000 vendor advance and about USD 45,000 of freight, duty and clearance), versus about USD 384,000 under the vendor's 30/70 T/T proposal with the same customer terms (USD 504,600 landed minus the USD 121,000 advance). **After-sales.** Two Mizan technicians trained and certified at the factory; remote response 4 h; vendor engineer on site within 72 h for fleet faults; firmware updates tested on one robot before fleet roll-out. **Remote access.** Vendor cloud read-only by default; write access per session through the owner's gateway, logged. **Go criteria.** Factory audit passed, summer reference data reviewed, warranty without desert exclusions, LC with inspection accepted. **Open questions.** HS code and any duty exemption; whether the target buyer requires PAI conformity; counsel's review of origin rules.`,
            concepts: ["mz12.vendor-due-diligence", "mz12.certification-stack", "mz12.warranty-backstop", "mz12.landed-cost", "mz12.cash-exposure"],
            difficulty: 3,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz12-l03-q1",
      type: "mcq",
      prompt: md`What does a letter of credit under UCP 600 guarantee the seller?`,
      options: [
        "That the goods will be accepted by the buyer",
        "Payment by the issuing bank against documents that comply with the credit",
        "Payment regardless of the documents presented",
        "That the buyer has enough cash",
      ],
      answer: 1,
      explanation: md`Banks deal in documents, not goods. That is why the buyer adds an inspection certificate to the required documents.`,
      concepts: ["mz12.letter-of-credit"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz12-l03-q2",
      type: "multi",
      prompt: md`Which standards are relevant to the safety of a containerised lithium BESS?`,
      options: ["IEC 62619", "UL 9540A", "IEC 61215", "UN 38.3", "IEC 62933 series"],
      answer: [0, 1, 3, 4],
      explanation: md`IEC 61215 is PV module design qualification. The others cover industrial lithium battery safety, large-scale fire propagation testing, transport and BESS systems.`,
      concepts: ["mz12.certification-stack"],
      difficulty: 2,
    },
    {
      id: "mz12-l03-q3",
      type: "numeric",
      prompt: md`FOB USD 1,000,000, freight and insurance USD 40,000, duty 5 % of CIF, local costs USD 20,000. What is the landed cost (USD)?`,
      answer: 1112000,
      tolerance: { abs: 100 },
      unit: "USD",
      explanation: md`CIF $= 1{,}040{,}000$; duty $= 52{,}000$; landed $= 1{,}040{,}000 + 52{,}000 + 20{,}000 = $ USD 1,112,000.`,
      concepts: ["mz12.landed-cost"],
      difficulty: 1,
    },
    {
      id: "mz12-l03-q4",
      type: "mcq",
      prompt: md`A vendor offers a 5-year warranty that excludes "damage from sand or dust ingress". Why is this a problem for Kuwait?`,
      options: [
        "It is not a problem: dust is rare in Kuwait",
        "Dust ingress is the dominant field failure mode in Kuwaiti conditions, so the exclusion can void the warranty in practice",
        "Warranties never cover electronics",
        "Kuwaiti law forbids exclusions",
      ],
      answer: 1,
      explanation: md`Exclusions matter more than durations. Read them against site conditions: dust, 50 °C ambient, cleaning practices.`,
      concepts: ["mz12.warranty-backstop"],
      difficulty: 1,
    },
    {
      id: "mz12-l03-q5",
      type: "numeric",
      prompt: md`An LC of USD 900,000 stays open 6 months at an all-in rate of 2 % per year, plus USD 1,000 fixed fees. What does it cost (USD)?`,
      answer: 10000,
      tolerance: { abs: 10 },
      unit: "USD",
      explanation: md`$C_{LC} = 900{,}000 \times 0.02 \times 6/12 + 1{,}000 = 9{,}000 + 1{,}000 = $ USD 10,000.`,
      concepts: ["mz12.letter-of-credit"],
      difficulty: 1,
    },
    {
      id: "mz12-l03-q6",
      type: "order",
      prompt: md`Order the documentary credit process.`,
      items: [
        "Sale contract specifies LC terms and documents",
        "Buyer's bank issues the LC",
        "Seller passes inspection and ships",
        "Seller presents documents",
        "Banks examine documents and pay if compliant",
      ],
      explanation: md`The LC sits between contract and shipment; payment follows compliant presentation.`,
      concepts: ["mz12.letter-of-credit"],
      difficulty: 1,
    },
    {
      id: "mz12-l03-q7",
      type: "decision",
      prompt: md`A deal shows USD 300,000 gross profit but a peak cash exposure of USD 2.2 m, and Mizan has USD 400,000 in the bank. What do you do?`,
      options: [
        { text: "Take it: the margin is good.", score: 0, feedback: "A deal that needs five times your cash can sink the company on one delay." },
        { text: "Restructure: usance LC from the supplier, larger customer advance against a guarantee, or let the integrator contract the hardware directly while Mizan sells its scope.", score: 1, feedback: "Right: cash exposure, not margin, decides feasibility for a small company." },
        { text: "Borrow from a cofounder personally to fund it.", score: 0.2, feedback: "Personal funding of a working-capital gap hides the risk instead of fixing the structure." },
      ],
      explanation: md`Peak exposure must be funded before the deal is accepted. Restructuring terms or roles is the usual fix.`,
      concepts: ["mz12.cash-exposure", "mz12.letter-of-credit"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz12-l03-f1", front: "Four dimensions of vendor due diligence", back: "Corporate, technical, commercial, compliance. First question: manufacturer or trading house?", concepts: ["mz12.vendor-due-diligence"] },
    { id: "mz12-l03-f2", front: "BESS certification stack", back: "IEC 62619, IEC 62933, UL 1973, UL 9540 with UL 9540A fire test data, UN 38.3, NFPA 855 design.", concepts: ["mz12.certification-stack"] },
    { id: "mz12-l03-f3", front: "Landed cost", back: md`$C_L = \text{FOB} + F + I + t_d(\text{CIF}) + K$; GCC duty commonly 5 % of CIF, HS code dependent.`, concepts: ["mz12.landed-cost"] },
    { id: "mz12-l03-f4", front: "Letter of credit in one line", back: "A bank pays the seller against documents that comply exactly with the credit (ICC UCP 600). Add an inspection certificate.", concepts: ["mz12.letter-of-credit"] },
    { id: "mz12-l03-f5", front: "Warranty rules", back: "Back-to-back with what Mizan promises; read desert exclusions; back it with retention, bond, parent guarantee or local spares.", concepts: ["mz12.warranty-backstop"] },
    { id: "mz12-l03-f6", front: "Peak cash exposure", back: "Largest gap between supplier payments and customer receipts during the deal. Decides feasibility for a small company.", concepts: ["mz12.cash-exposure"] },
    { id: "mz12-l03-f7", front: "Incoterms FOB vs CIF vs DDP", back: "FOB: buyer pays freight from the loading port. CIF: seller pays freight and minimum insurance, risk passes at loading. DDP: seller delivers duty paid to the named place.", concepts: ["mz12.landed-cost"] },
  ],
  scenarios: [
    {
      id: "mz12-s2",
      title: "The integrator wants 50 % up front",
      dayInLife: true,
      context: md`Illustrative. A Chinese BESS integrator has agreed to support Mizan on a 20 MWh supply to an EPC working on a Kuwaiti project. Their sales manager writes: "Our standard terms are 50 % T/T with order, 50 % T/T before shipment. Warranty 2 years. Our engineers can come for commissioning at your cost." The EPC wants a 5-year warranty and pays 10 % advance, 70 % on delivery, 20 % on acceptance.`,
      start: "a",
      concepts: ["mz12.cash-exposure", "mz12.warranty-backstop", "mz12.letter-of-credit"],
      nodes: {
        a: {
          md: md`How do you respond first?`,
          choices: [
            { text: "Accept the terms; the EPC relationship matters more.", next: "b", score: 1, feedback: "You would carry nearly the whole hardware cost before delivery and three uncovered warranty years." },
            { text: "Lay out the gaps in one table: payment timing against the EPC's milestones, 2-year versus 5-year warranty, commissioning cost. Propose 10 % advance against their advance payment guarantee, 80 % by LC with inspection certificate, 10 % retention to acceptance converting to a warranty bond, and a 5-year back-to-back warranty.", next: "c", score: 9, feedback: "Concrete, banked and aligned to the customer's milestones." },
            { text: "Ask the EPC to pay 50 % up front instead.", next: "b", score: 3, feedback: "Worth asking for a larger advance, but EPCs rarely move that far and it does not fix the warranty gap." },
          ],
        },
        b: {
          md: md`The deal is now running on the original terms. Shipment slips by six weeks and the EPC withholds its delivery payment. What did you learn?`,
          choices: [
            { text: "Compute peak cash exposure and warranty gap before accepting terms, and fund or restructure them first.", score: 6, feedback: "The lesson: margin is visible, exposure is not until it bites." },
            { text: "Never work with Chinese vendors.", score: 1, feedback: "The problem was the terms, not the country." },
          ],
        },
        c: {
          md: md`The integrator accepts the LC and retention but will only give a 3-year warranty, offering "extended warranty available at 2 % of contract value per year" for years 4 and 5.`,
          choices: [
            { text: "Price the extension into the EPC offer, buy it, and make sure it is back-to-back, transferable to the owner and backed by the warranty bond.", score: 9, feedback: "Turns the gap into a priced, backed product instead of an unfunded promise." },
            { text: "Give the EPC 5 years anyway and hope nothing fails.", score: 1, feedback: "Years 4 and 5 then sit on Mizan's balance sheet with no backing." },
            { text: "Tell the EPC the warranty is 3 years, take it or leave it.", score: 5, feedback: "Honest, but may lose the deal when a priced extension would have solved it." },
          ],
        },
      },
    },
  ],
};

export default lesson;
