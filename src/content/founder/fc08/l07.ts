import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc08-l07",
  title: "Contracts: IP assignment, NDAs, pilots and customer agreements",
  summary:
    "Making sure the company owns its IP, what an NDA does and does not protect, how to structure pilot and customer contracts (scope, success criteria, IP, data and training rights, liability caps, SLAs), and which documents always go to a lawyer.",
  minutes: 75,
  objectives: [
    "Explain why founders, employees and contractors must assign IP in writing, with the Dutch rules behind it",
    "Read and negotiate an NDA: definition, exclusions, term, residuals",
    "Structure a pilot contract with measurable success criteria, background and foreground IP, and data and model-training rights",
    "Compute SLA downtime allowances and liability caps, and know the standard carve-outs",
    "Decide which contracts you can sign from templates and which need a lawyer",
  ],
  concepts: [
    { id: "fc08.ip-assignment", name: "IP assignment", description: "Written transfer to the company of all IP created by founders, employees and contractors, including work done before incorporation; required because creators who are not employees keep copyright unless it is transferred by deed.", competency: "fc-legal", related: ["fc08.vesting-cliff"] },
    { id: "fc08.nda", name: "Non-disclosure agreement", description: "A contract limiting use and disclosure of confidential information to a stated purpose, with standard exclusions and a term; it does not transfer or license IP.", competency: "fc-legal" },
    { id: "fc08.pilot-contract", name: "Pilot contract", description: "A short paid engagement with defined scope, measurable success criteria, conversion terms, and explicit allocation of background IP, foreground IP and data rights.", competency: "fc-legal", related: ["fc08.ip-assignment", "m09.risk-allocation"] },
    { id: "fc08.data-rights", name: "Data and training rights", description: "Contract terms that say who owns customer data, what the supplier may do with it (service delivery, aggregated analytics, model training) and where it may be processed.", competency: "fc-legal", related: ["fc08.pilot-contract"] },
    { id: "fc08.liability-sla", name: "Liability caps and SLAs", description: "The cap on a supplier's aggregate liability (usually a multiple of 12 months' fees, with carve-outs) and the service levels with credits that define performance.", competency: "fc-legal", related: ["fc08.pilot-contract", "m09.ld-cap"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "The contracts that protect what you build and what you sell",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Afterwave sells into enterprise hardware test teams with on-prem security reviews, and its long-term value is the bench memory: test data and models that get better with every customer. Whether Afterwave may learn from a customer's data is decided in the pilot contract, not in the product. Mizan's pilot with KISR raises the same questions about plant data and publication. And none of it matters if the code and designs your cofounders wrote are not owned by the company. Investors check all three in diligence.`,
        },
        {
          kind: "md",
          md: md`### 1. IP assignment: the company must own what it sells

Who owns IP by default under Dutch law (concept level):

| Creator | Copyright (software, documents, designs) | Inventions (patentable) |
|---|---|---|
| **Employee** acting in the course of the job | Employer is deemed the author (Art. 7 Auteurswet) | Employer, where the nature of the job involves inventing (Art. 12 Rijksoctrooiwet); the employee may be owed fair compensation |
| **Founder who is not an employee** (works through a holding, or before incorporation) | Stays with the founder until transferred | Stays with the founder until transferred |
| **Freelancer or contractor** | Stays with the contractor until transferred | Stays with the contractor until transferred |
| **Cofounder still employed elsewhere** | Possibly claimed by that employer under the employment contract | Possibly claimed by that employer |

A copyright transfer requires a **deed**, a signed written document (Art. 2 Auteurswet). So every founder signs an IP assignment covering work done **before** incorporation, every contractor's agreement assigns IP (and waives moral rights to the extent the law allows), and employment contracts confirm the statutory position and cover inventions. In a Delaware company the equivalent is the founder stock purchase agreement plus a confidential information and invention assignment agreement for everyone.

**The cofounder with a day job.** If a cofounder works for another company while contributing to yours, read his employment contract for clauses on IP in work outside office hours, side activities (nevenwerkzaamheden) and non-competition, and get a written waiver or release from the employer where needed. Diligence lawyers ask this directly.

### 2. NDAs

An NDA restricts **use and disclosure** of confidential information to a **purpose**. It does not transfer or license anything.

- **Definition:** marked information or information a reasonable person would see as confidential.
- **Standard exclusions:** already public, already known to the recipient, independently developed, received lawfully from a third party.
- **Term:** commonly 2 to 5 years from disclosure; trade secrets for as long as they remain secret.
- **Watch for:** **residuals clauses** (the recipient may use what its people "remember", which empties the NDA), one-way NDAs dressed as mutual, non-solicitation or non-compete clauses slipped in, and in Dutch NDAs **penalty clauses** (a fixed amount per breach).
- **Reality:** investors do not sign NDAs. Enterprise customers do, usually on their own paper. An NDA does not replace sharing less: send what is needed for the purpose.

### 3. Pilot and customer contracts

A pilot is a sale with a short term. The clauses that matter:`,
        },
        {
          kind: "flow",
          title: "From first meeting to a commercial contract",
          steps: [
            { label: "Mutual NDA", detail: "Purpose: evaluation; 2 to 3 years; no residuals" },
            { label: "Pilot agreement", detail: "Scope, success criteria, fee, duration, IP and data, liability, conversion terms" },
            { label: "Security and data review", detail: "Questionnaire, architecture (on-prem or isolated tenant), data processing agreement if personal data is involved" },
            { label: "Master agreement + order form", detail: "Licence or subscription, SLA, support, renewal; pilot terms carried over" },
          ],
          caption: "Agree the conversion terms (price, scope of the commercial phase) inside the pilot agreement so success leads to a contract, not a new negotiation.",
        },
        {
          kind: "md",
          md: md`| Clause | What to aim for (supplier side) |
|---|---|
| **Scope and success criteria** | Measurable, agreed before start: e.g. "Ripple selects the regression tests for 3 firmware changes; at least 90 % of failures found by the full suite are found by the selected set" |
| **Fee and conversion** | Paid pilot (even modest), credited against year-1 licence if converted; commercial price and scope pre-agreed |
| **Background IP** | Each party keeps what it brought; customer gets a licence to use yours during the pilot |
| **Foreground IP** | Improvements to your platform stay yours; customer-specific configurations or reports may be the customer's |
| **Customer data** | Owned by the customer; you process it to deliver the service |
| **Aggregated data and model training** | Explicit right to use de-identified or aggregated data, and to train or improve models, or a clear statement that you will not; for on-prem deployments, say which artefacts (model weights, statistics) may leave the site |
| **Confidentiality and security** | Mutual; security obligations you can actually meet |
| **Liability** | Cap at 1x fees paid in the prior 12 months; indirect and consequential loss excluded; carve-outs limited and, where possible, super-capped |
| **Warranties** | Service performed with reasonable skill and care; no fitness-for-purpose or outcome warranty |
| **Term and termination** | Fixed pilot term; termination for convenience on notice |
| **Law and disputes** | Your home law and courts (or arbitration) where possible; with public bodies, expect their law and standard conditions |

### Liability caps and SLAs, in numbers`,
        },
        { kind: "equation", formula: "fc08-liability-cap" },
        { kind: "equation", formula: "fc08-sla-downtime" },
        {
          kind: "md",
          md: md`| Availability | Allowed downtime per 30-day month | Per year |
|---|---|---|
| 99.0 % | 7.2 h | 87.6 h |
| 99.5 % | 3.6 h | 43.8 h |
| 99.9 % | 43.2 min | 8.76 h |
| 99.99 % | 4.3 min | 52.6 min |

Each extra nine costs engineering, monitoring and on-call staff. For software that runs on the **customer's** servers (Afterwave Enclave on-prem), availability depends on infrastructure you do not control, so the SLA should cover response and resolution times for your software, not uptime of their hardware.`,
        },
        { kind: "xref", to: "m09-l04", note: "How caps on liquidated damages and overall liability are structured in construction and EPC contracts; the same logic applies to supplier caps here." },
      ],
    },
    {
      layer: "applied",
      title: "Pricing the risk in an Afterwave pilot and a Mizan SLA",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Afterwave pilot with a robotics test team",
          given: md`**Illustrative.** A 3-month paid pilot of Lockstep and Ripple for a robotics company's test lab, fee **EUR 40,000**. Ripple runs in an isolated Afterwave Enclave tenant during the pilot. The customer's draft says: supplier liability unlimited; all IP "arising from the pilot" assigned to the customer; no use of customer data beyond the pilot; 99.9 % monthly availability with 10 % service credit per breach.`,
          steps: [
            { md: md`**Liability.** Counter with $L_{\max} = 1\times F_{12} = $ **EUR 40,000**, indirect and consequential losses excluded, and a super-cap of $3\times40{,}000 = $ **EUR 120,000** for breaches of confidentiality and data protection. Uncapped only for fraud and wilful misconduct.` },
            { md: md`**Why not unlimited:** a single claim could exceed the company's cash; investors and insurers will ask; and the customer's real risk (data leaking from the Enclave tenant) is covered by the super-cap and by the security terms.` },
            { md: md`**IP.** Replace "all IP arising" with: background IP stays with each party; improvements to Lockstep, Ripple and Enclave stay with Afterwave; the customer owns its raw test data and the pilot reports about its products.` },
            { md: md`**Data and training.** Propose: Afterwave may use customer data only to deliver the pilot, and may retain and use **de-identified, aggregated statistics and model improvements** that do not reveal the customer's designs or test results. If the customer refuses, accept a no-training clause for the pilot and put the training right on the table for the commercial contract, priced as a discount.` },
            { md: md`**SLA.** 99.9 % over a 30-day month allows only $0.001\times720 = 43.2$ min of downtime. For a pilot tenant offer 99.5 %: $0.005\times720 = $ **3.6 h**, with a 5 % credit of the monthly fee (EUR 13,333/month) per full 0.5 % below target, capped at 25 %, as the sole financial remedy for availability.` },
            { md: md`**Exposure check:** a month at 98.4 % is 2 full steps below 99.5 % (99.0 %, 98.5 %): credit $2\times5\%\times13{,}333 = $ EUR 1,333.` },
          ],
          result: md`Afterwave's maximum ordinary exposure is EUR 40k, with EUR 120k for data and confidentiality, instead of unlimited; the platform IP stays with the company; and the training-rights question is explicit rather than silently lost. These positions are normal for software suppliers; expect to trade, e.g. a higher super-cap for keeping the IP clause.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A Mizan soiling analytics SLA over a quarter",
          given: md`**Illustrative.** A Mizan soiling analytics service for a PV plant, annual fee **KWD 12,000**, measured on quarterly (90-day) availability of 99.9 %. Liability cap 1x the fees of the prior 12 months, with a 2x super-cap for data breaches.`,
          steps: [
            { md: md`Quarter length $T = 90\times24 = 2{,}160$ h.` },
            { md: md`Allowed downtime $= (1 - 0.999)\times2{,}160$ = **2.16 h** per quarter.`, hidden: true, check: { prompt: "Allowed downtime per quarter (h)", answer: 2.16, unit: "h", tolerance: { abs: 0.01 } } },
            { md: md`General liability cap $= 1\times12{,}000 = $ KWD 12,000.` },
            { md: md`Data breach super-cap $= 2\times12{,}000$ = **KWD 24,000**.`, hidden: true, check: { prompt: "Data breach super-cap (KWD)", answer: 24000, unit: "KWD", tolerance: { abs: 1 } } },
          ],
          result: md`Measuring over a quarter rather than a month lets one bad day average out (2.16 h per quarter versus 43.2 min per month at the same 99.9 %). With a government or research buyer, expect their standard conditions to set the law, the dispute forum and possibly the caps; read those before you price.`,
        },
        {
          kind: "question",
          question: {
            id: "fc08-l07-p1",
            type: "numeric",
            prompt: md`An SLA promises 99.95 % availability over a 30-day month. How many minutes of downtime are allowed? (min)`,
            answer: 21.6,
            tolerance: { abs: 0.05 },
            unit: "min",
            explanation: md`$t_{\text{down}} = (1 - 0.9995)\times30\times24\times60 = 0.0005\times43{,}200 = 21.6$ min.`,
            concepts: ["fc08.liability-sla"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "How contracts are really negotiated, and when to call a lawyer",
      blocks: [
        {
          kind: "md",
          md: md`### How it works

- **Enterprise customers send their paper.** Their procurement and legal teams have templates written for large suppliers. Your job is a short, reasoned mark-up of the five clauses that matter (IP, data, liability, SLA, termination), not a rewrite.
- **Small customers take yours.** Have your own pilot agreement and terms ready (a lawyer-drafted template, or adapted from a published standard form) so you can send paper first.
- **Battle of the forms.** If both sides only refer to their own general terms, Dutch law generally applies the terms referred to first, while other legal systems handle this differently. Do not rely on it: sign one agreed document.
- **Public buyers** (KISR, MEWRE, KAPP) use standard conditions and tender rules that are rarely negotiable; the negotiation happens in clarification questions before bidding.
- **Security reviews** for on-prem deployments run in parallel with legal; start them at the pilot stage.

### Send to a lawyer, always

| Document | Why |
|---|---|
| Founder agreement, shareholders' agreement, articles | Ownership and control for years |
| Any equity instrument (SAFE side letters, convertible loans, option plan) | Dilution and tax |
| IP assignments and contractor agreements (template once) | Diligence relies on them |
| Customer's own paper with unlimited liability, IP assignment or exclusivity | Company-ending risks |
| Data processing agreements, cross-border data transfers | Regulatory exposure |
| Anything governed by an unfamiliar law (Kuwaiti, US) | Different defaults |
| Distribution and agency agreements | Exclusivity and termination compensation |

### You can handle yourself (from a reviewed template)

Mutual NDAs on standard terms, small pilots on your own reviewed template, order forms under an existing master agreement.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "The silent data clause",
          md: md`Many enterprise templates say the supplier may use customer data "solely to provide the services". Signed unchanged, that means no aggregated learning and no model training, ever, for that customer. For a company whose moat is accumulated test data, that clause decides the business model. Raise it explicitly, early, and offer something in return (price, privacy controls, on-prem-only processing).`,
        },
        {
          kind: "checklist",
          title: "Pilot contract review",
          items: [
            "Measurable success criteria and conversion terms written in",
            "Background IP stays with each party; platform improvements stay with you",
            "Customer data ownership, your processing rights, and aggregated data and training rights stated explicitly",
            "Liability capped at a multiple of 12-month fees; indirect losses excluded; carve-outs listed",
            "SLA: measurement period, exclusions, credits as sole remedy, and what you control on-prem",
            "Termination, governing law and disputes acceptable",
            "Every contributor's IP assigned to the company before you sign",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask the customer's legal or procurement team",
          items: [
            "Which clauses in your template are mandatory and which are negotiable?",
            "What is the realistic loss you are protecting against with unlimited liability, and would a super-cap for data breaches cover it?",
            "Do you need ownership of our platform improvements, or only of reports about your products?",
            "May we use de-identified, aggregated statistics to improve the product, and under what controls?",
            "Who signs, and what is the approval path and timeline after legal agreement?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc08-l07-p2",
            type: "short",
            prompt: md`Write a **one-page pilot term sheet for Afterwave** for a humanoid robotics company's validation lab (illustrative numbers): scope and measurable success criteria, duration and fee, conversion terms, background and foreground IP, customer data and training rights (state what may leave an on-prem deployment), liability cap and carve-outs, SLA, and the two clauses you would send to a lawyer before signing.`,
            rubric: [
              "Scope with measurable, testable success criteria tied to Lockstep or Ripple, and a fixed duration and fee labelled illustrative",
              "Conversion terms (price or discount, scope of the commercial phase) pre-agreed",
              "Background IP retained by each party, platform improvements retained by Afterwave, customer owns its data and product-specific reports",
              "Explicit data and training clause including what may leave an on-prem deployment",
              "Liability cap as a multiple of fees with indirect-loss exclusion and limited carve-outs or super-cap; SLA defined with measurement period and remedy",
              "Two clauses for legal review named with reasons (e.g. data/training, liability, governing law, IP assignment)",
            ],
            modelAnswer: md`**Afterwave pilot term sheet (illustrative)**

**Scope:** Lockstep capture on 2 actuator test rigs (DAQ signals and operator screen on one clock) and Ripple change-impact analysis for the lab's next 3 firmware releases.
**Success criteria:** (1) capture synchronised to within 1 ms across rig signals and screen events on 95 % of runs; (2) for each release, Ripple's selected test set finds at least 90 % of the failures found by the full regression suite, with at least 40 % less rig time.
**Duration and fee:** 12 weeks, EUR 45,000, 50 % at start.
**Conversion:** if criteria are met, annual licence for the lab at EUR 180,000, pilot fee credited; signed within 30 days of the final report.
**IP:** each party keeps background IP. Improvements to Lockstep, Ripple and Enclave are Afterwave's. The customer owns raw test data and pilot reports about its products.
**Data and training:** Enclave runs on the customer's servers; raw data never leaves the site. Afterwave may export only aggregated, de-identified model updates and usage statistics, after the customer's review of the export format; the customer can switch this off, in which case the licence price rises 10 %.
**Liability:** cap 1x fees paid in the prior 12 months; indirect and consequential loss excluded; super-cap 3x fees for confidentiality and data breaches; uncapped only for fraud and wilful misconduct.
**SLA:** on-prem, so response times instead of uptime: severity 1 response 4 business hours, severity 2 next business day; Afterwave-hosted components 99.5 % monthly with 5 % service credit per 0.5 % below target, credits as the sole remedy.
**To a lawyer:** (1) the data and training clause, because it defines the business model and touches data protection if screen recordings include people; (2) the liability and governing-law clauses, because the customer's template is under a foreign law and asks for unlimited liability.`,
            explanation: md`A strong term sheet makes success measurable, connects success to a contract, and makes IP and data rights explicit; the lawyer is used for the clauses with company-level consequences.`,
            concepts: ["fc08.pilot-contract", "fc08.data-rights", "fc08.liability-sla", "fc08.ip-assignment"],
            difficulty: 3,
          },
        },
        { kind: "scenario", scenario: "fc08-s4" },
        {
          kind: "feynman",
          prompt: "Explain to Yusuf why he must sign an IP assignment to Afterwave even though he is a founder, and what changes if he still has a day job.",
          keyPoints: [
            "A founder who is not an employee keeps copyright in his work unless he transfers it",
            "In the Netherlands copyright transfer requires a signed deed",
            "Work done before incorporation must be assigned too",
            "An employer may claim IP made by its employee depending on the employment contract and the job; check IP, side-activity and non-compete clauses",
            "Investors check the assignments in diligence; missing ones delay or kill a round",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "fc08-l07-q1",
      type: "mcq",
      prompt: "A freelance developer writes part of Afterwave's capture app under a contract that says nothing about IP. Under Dutch law, who owns the copyright?",
      options: ["Afterwave, because it paid for the work", "The developer, until it is transferred by a signed deed", "Both jointly", "Nobody, software is not protected"],
      answer: 1,
      explanation: md`The employer-authorship rule (Art. 7 Auteurswet) applies to employees, not contractors. A transfer requires a deed (Art. 2). Fix it with a written assignment.`,
      concepts: ["fc08.ip-assignment"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc08-l07-q2",
      type: "multi",
      prompt: "Which are standard exclusions from confidential information in an NDA? (Select all.)",
      options: ["Information that is or becomes public through no fault of the recipient", "Information already known to the recipient", "Information the recipient's staff remember after the project (residuals)", "Information independently developed by the recipient", "Information lawfully received from a third party"],
      answer: [0, 1, 3, 4],
      explanation: md`A residuals clause is not a standard exclusion; it lets the recipient use whatever its people retain and largely empties the NDA. Resist it.`,
      concepts: ["fc08.nda"],
      difficulty: 1,
    },
    {
      id: "fc08-l07-q3",
      type: "numeric",
      prompt: md`A customer paid EUR 90,000 in fees over the last 12 months. The contract caps liability at 1.5x fees in the prior 12 months. What is the cap? (EUR)`,
      answer: 135000,
      tolerance: { abs: 1 },
      unit: "EUR",
      explanation: md`$L_{\max} = 1.5\times90{,}000 = $ EUR 135,000.`,
      concepts: ["fc08.liability-sla"],
      difficulty: 1,
    },
    {
      id: "fc08-l07-q4",
      type: "numeric",
      prompt: md`What downtime does a 99.5 % availability SLA allow over a full 365-day year? (h)`,
      answer: 43.8,
      tolerance: { abs: 0.05 },
      unit: "h",
      explanation: md`$(1 - 0.995)\times8{,}760 = 43.8$ h. The same 99.5 % per month allows 3.6 h each month; annual measurement lets downtime cluster.`,
      concepts: ["fc08.liability-sla"],
      difficulty: 1,
    },
    {
      id: "fc08-l07-q5",
      type: "mcq",
      prompt: "In a pilot, what is foreground IP?",
      options: [
        "IP each party owned before the pilot",
        "IP created during the pilot",
        "The customer's trademarks",
        "Patents filed in the customer's country",
      ],
      answer: 1,
      explanation: md`Background IP is what each party brings; foreground IP is created during the pilot. The supplier should keep platform improvements in the foreground; the customer may own outputs specific to its products.`,
      concepts: ["fc08.pilot-contract"],
      difficulty: 1,
    },
    {
      id: "fc08-l07-q6",
      type: "decision",
      prompt: md`An enterprise customer's template allows Afterwave to use customer data "solely to provide the services". Afterwave's roadmap depends on learning across customers. What do you do?`,
      options: [
        { text: "Sign it; the pilot is small.", score: 0.1, feedback: "Pilot terms usually carry into the commercial contract. You have given away training rights without discussing them." },
        { text: "Propose explicit language allowing de-identified, aggregated statistics and model improvements under defined controls, with an opt-out priced into the commercial terms.", score: 1, feedback: "Right: make the data right explicit, give the customer control and a reason to say yes." },
        { text: "Use the data anyway; aggregated data is not really their data.", score: 0, feedback: "A breach of contract and of trust, and a diligence finding that can end enterprise relationships." },
      ],
      explanation: md`Data and training rights are business-model terms. Raise them early, make them explicit and trade for them.`,
      concepts: ["fc08.data-rights"],
      difficulty: 2,
    },
    {
      id: "fc08-l07-q7",
      type: "multi",
      prompt: "Which documents should always go to a lawyer before signing? (Select all.)",
      options: ["A customer's template with unlimited liability", "A shareholders' agreement", "An order form under an existing reviewed master agreement", "A convertible loan agreement", "A mutual NDA on your own reviewed template"],
      answer: [0, 1, 3],
      explanation: md`Company-level risk, ownership and equity documents always get legal review. Routine documents on already-reviewed templates do not need a new review each time.`,
      concepts: ["fc08.pilot-contract", "fc08.liability-sla"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc08-l07-f1", front: "Dutch copyright transfer formality", back: "Requires a deed: a signed written document (Art. 2 Auteurswet).", concepts: ["fc08.ip-assignment"] },
    { id: "fc08-l07-f2", front: "Employee vs contractor IP (NL)", back: "Employee works in the course of the job: employer is author (Art. 7). Contractor: keeps copyright unless assigned.", concepts: ["fc08.ip-assignment"] },
    { id: "fc08-l07-f3", front: "Residuals clause", back: "Lets the recipient use information its people remember; largely empties an NDA. Resist.", concepts: ["fc08.nda"] },
    { id: "fc08-l07-f4", front: "Background vs foreground IP", back: "Background: brought by each party, retained. Foreground: created during the project; allocate it explicitly.", concepts: ["fc08.pilot-contract"] },
    { id: "fc08-l07-f5", front: "Typical liability cap", back: "1x fees paid in the prior 12 months; indirect loss excluded; super-cap 2x to 3x for data and confidentiality; uncapped for fraud.", concepts: ["fc08.liability-sla"] },
    { id: "fc08-l07-f6", front: "99.9 % monthly availability", back: "43.2 minutes of downtime per 30-day month.", concepts: ["fc08.liability-sla"] },
    { id: "fc08-l07-f7", front: "The data clause to look for", back: "\"Solely to provide the services\": no aggregated learning or model training unless you negotiate it.", concepts: ["fc08.data-rights"] },
  ],
  scenarios: [
    {
      id: "fc08-s4",
      title: "\"Our standard terms are non-negotiable\"",
      context: md`Illustrative. Afterwave has agreed a EUR 40,000 pilot with a large drives and motors manufacturer's validation department. Their procurement officer sends the company's supplier template: unlimited liability, assignment to the customer of "all intellectual property created in connection with the services", data used solely to provide the services, governing law of the customer's home country. "These are our standard terms. Suppliers sign them."`,
      start: "a",
      concepts: ["fc08.pilot-contract", "fc08.liability-sla", "fc08.data-rights"],
      nodes: {
        a: {
          md: md`How do you respond?`,
          choices: [
            { text: "Sign: the pilot is the door opener and the amounts are small.", score: 2, feedback: "The IP clause could hand over improvements to Ripple made during the pilot, and unlimited liability is not small whatever the fee.", next: "c" },
            { text: "Thank them, and send a short mark-up of three clauses only (IP limited to customer-specific deliverables, liability capped with a data super-cap, explicit aggregated-data right), each with a one-line reason; ask which clauses they can move.", score: 9, feedback: "Focused, reasoned and easy for procurement to escalate. Most 'non-negotiable' templates have a fallback position.", next: "b" },
            { text: "Insist on your own template.", score: 3, feedback: "Large buyers rarely sign supplier paper; you risk stalling the deal over form rather than substance.", next: "c" },
          ],
        },
        b: {
          md: md`Procurement accepts the IP change and a liability cap of 2x fees with a 5x super-cap for data breaches, but says legal will not allow any use of their data outside the pilot.`,
          choices: [
            { text: "Accept for the pilot, and write into the pilot agreement that data and training rights will be negotiated as part of the commercial contract, with Afterwave's pricing for both options.", score: 10, feedback: "You protect the core IP, cap the risk, and keep the data question open with a price attached instead of losing it." },
            { text: "Walk away over the data clause.", score: 4, feedback: "Principled, but you lose a reference pilot over a right you could still win at the commercial stage." },
          ],
        },
        c: {
          md: md`During the seed diligence, the investor's lawyer flags that a customer may own improvements to Ripple made during the pilot, and that Afterwave has unlimited liability under a foreign law.`,
          choices: [
            { text: "Ask the customer for an amendment narrowing the IP clause before the round closes.", score: 4, feedback: "Possible, but now you are asking a favour from a position of need, and closing waits on the customer's legal team." },
          ],
        },
      },
    },
  ],
};

export default lesson;
