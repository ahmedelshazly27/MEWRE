import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m09-l03",
  title: "Securities: bonds, guarantees and retention",
  summary:
    "Bid bonds, performance security, advance payment guarantees, retention and retention bonds, parent company guarantees and warranty bonds: what each protects, on-demand versus conditional forms, how a bond is called (and when not to), and how the security package works in an IPP chain and in Kuwaiti practice.",
  minutes: 65,
  objectives: [
    "You can list the securities used across a PV/BESS project's life and say what risk each covers and when it is released.",
    "You can distinguish on-demand guarantees from conditional (default) bonds and explain the independence principle and its limits.",
    "You can size the security package for an EPC contract and track its exposure over time.",
    "You can decide whether, how much and how to call a performance security, and avoid an unjustified call.",
    "You can check a bank guarantee received from a contractor before accepting it.",
  ],
  concepts: [
    {
      id: "m09.performance-security",
      name: "Performance security",
      description:
        "Guarantee (typically 10% of the Contract Price) securing the Contractor's performance until the Performance Certificate; under FIDIC 2017 Sub-Clause 4.2 the Employer may claim only amounts it is entitled to.",
      competency: "contracts",
      related: ["m09.on-demand-guarantee"],
    },
    {
      id: "m09.on-demand-guarantee",
      name: "On-demand vs conditional guarantee",
      description:
        "An on-demand (first-demand) guarantee is paid on a compliant written demand regardless of the underlying dispute (independence principle, URDG 758); a conditional or default bond pays only on proof of breach and loss.",
      competency: "contracts",
    },
    {
      id: "m09.advance-payment-guarantee",
      name: "Advance payment guarantee",
      description:
        "Guarantee, usually equal to the advance, that secures repayment of unrecovered advance; reduces as the advance is recovered through IPC deductions.",
      competency: "contracts",
      related: ["m09.performance-security"],
    },
    {
      id: "m09.retention",
      name: "Retention and retention bonds",
      description:
        "Cash withheld from IPCs (e.g. 10% up to 5% of the Contract Price) as security for defects; half released at Taking-Over, half after the DNP; may be replaced by a retention money guarantee.",
      competency: "contracts",
    },
    {
      id: "m09.parent-company-guarantee",
      name: "Parent company guarantee",
      description:
        "Undertaking by the Contractor's parent to perform or pay if the subsidiary contractor fails; covers the whole liability (not capped at a bond amount) but depends on the parent's creditworthiness and enforceability.",
      competency: "contracts",
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "What each security protects, and when",
      blocks: [
        {
          kind: "md",
          md: md`A security converts a contractual promise into a claim against a **creditworthy third party** (a bank, insurer or parent company), so the Employer can get cash quickly when the Contractor fails, without first winning a dispute. Each security protects a specific risk at a specific stage:

| Security | Typical value | Protects against | Provided | Released |
|---|---|---|---|---|
| **Bid bond** (tender guarantee) | 1–5% of bid price (often a fixed sum) | Bidder withdrawing during validity, or refusing to sign / provide performance security if awarded | With the bid | On contract signature and delivery of performance security (winner) or award to another (losers) |
| **Performance security** (performance bond) | **10%** of Contract Price is the common figure | Contractor default: cost to complete, delay damages unpaid, defects not remedied | Within 28 days of the Letter of Acceptance (FIDIC 2017 4.2) | After the Performance Certificate (often reduced at Taking-Over by the Particular Conditions) |
| **Advance payment guarantee (APG)** | 100% of the advance (commonly 10–20% of price) | Contractor failing to repay the advance (e.g. on termination before recovery) | Before the advance is paid | Reduces with each recovery; released when fully recovered |
| **Retention** (cash) | 5–10% of each IPC up to 5% of price | Defects and incomplete work after Taking-Over; leverage for punch-list closure | Deducted from IPCs | Half at Taking-Over, half after DNP |
| **Retention money guarantee / retention bond** | Equal to the retention it replaces | Same as retention, without withholding cash | In place of cash retention (if the contract allows) | As retention |
| **Warranty / maintenance bond** | 2.5–5% of price | Defects during the DNP | At Taking-Over (often replacing part of the performance security) | End of DNP |
| **Parent company guarantee (PCG)** | Uncapped or capped at a multiple of price | Total failure of a subsidiary or special-purpose contractor | At signature | After all obligations end |

Under FIDIC 2017 the Employer must also deliver something: **Sub-Clause 2.4** requires it to provide reasonable evidence of its financial arrangements. Contractors on IPP EPCs sometimes ask the SPV for a payment security (letter of credit or sponsor guarantee) for the same reason.`,
        },
        { kind: "equation", formula: "m09-security-amount" },
        { kind: "equation", formula: "m09-apg-balance" },
        {
          kind: "md",
          md: md`### On-demand versus conditional

**On-demand (first-demand, independent) guarantees.** The bank promises to pay on receipt of a written demand that complies with the guarantee's terms (amount, signature, statement, presentation place, before expiry). The bank does **not** examine whether the Contractor actually defaulted. This is the **independence principle**: the guarantee is separate from the construction contract. Most bank guarantees in Gulf projects are on-demand. The ICC **Uniform Rules for Demand Guarantees (URDG 758)** are commonly incorporated; under URDG 758 a demand must be accompanied by a statement indicating in what respect the applicant is in breach, unless the guarantee excludes that requirement.

**Conditional (default) bonds.** Typical of surety (insurance-company) bonds in common-law markets. The surety pays only when the Employer proves breach and loss, often after the surety investigates. Cheaper for the Contractor and does not use its bank lines, but slow and disputable for the Employer.

**Standby letters of credit** (governed by ISP98 or UCP 600) behave like on-demand guarantees and are common for US-sponsor obligations under PPAs and financing documents.

**Limits of independence.** The bank must pay a compliant demand, but courts can restrain a call in narrow circumstances. In English law the main exception is **clear fraud** known to the bank; some jurisdictions (notably Singapore) also recognise **unconscionability**. The construction contract can also restrict when the Employer may call: FIDIC 2017 4.2 states that the Employer shall not make a claim under the Performance Security except for amounts to which it is entitled under the Contract, and must **indemnify** the Contractor for damages from a claim to which it was not entitled. So an on-demand guarantee paid by the bank can still lead to a damages claim against the Employer.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why contractors fear on-demand bonds, and why Employers insist on them",
          md: md`For the Employer, the value of an on-demand bond is **timing**: cash in days rather than an award in two years, which keeps a defaulted project financeable. For the Contractor, an on-demand call is cash out the door before any tribunal has looked at the merits, and it damages its standing with its banks. The FIDIC indemnity in 4.2 and the URDG statement-of-breach requirement are the compromise: payment first, argument later, liability for abuse.`,
        },
        {
          kind: "md",
          md: md`### FIDIC 2017 Sub-Clause 4.2 in practice

- Delivered within **28 days** after the Letter of Acceptance, in the form annexed to the Particular Conditions (or approved by the Employer), from an entity and country approved by the Employer.
- Kept valid and enforceable until the Contractor has completed the Works and remedied defects. If its terms specify an expiry date and the Performance Certificate is not expected 28 days before it, the Contractor must extend it; failure to extend allows the Employer to claim the full amount.
- The amount may be adjusted if Variations and adjustments change the Contract Price by more than a threshold (the 2017 books use 20%).
- The Employer may claim only amounts to which it is entitled (for example, amounts agreed or determined that the Contractor has not paid, cost of remedying a default the Contractor failed to correct after Notice, or where it is entitled to terminate under 15.2), and must return the security after the Performance Certificate.

### Securities in an IPP chain

In a project-financed IPP there are **two layers** of security, and the MEWRE PM deals with the upper one:

| From → To | Security | Purpose |
|---|---|---|
| Bidder → KAPP (procuring entity) | **Bid bond** | Seriousness of the bid; signing the PPA if selected |
| SPV/sponsors → MEWRE (offtaker) | **Development / performance security** under the PPA | Achieving financial close and COD by the long-stop date; paid to MEWRE as compensation if the project fails |
| SPV → MEWRE | **Operation security** (sometimes) | O&M-phase obligations, handback condition under BOT |
| EPC Contractor → SPV (assigned to lenders) | Performance security, APG, retention/warranty bonds, **PCG** | Construction default; lenders can call through the security assignment |
| O&M Contractor → SPV | O&M performance bond (e.g. 10–20% of annual fee) | O&M default |
| Sponsors → Lenders | Equity contribution LC or guarantee | Sponsors injecting equity when due |

The EPC securities are assigned to the lenders, who also take **direct agreements** with the EPC and O&M contractors (lesson 5).`,
        },
        {
          kind: "callout",
          tone: "kuwait",
          title: "Kuwait context (sourced)",
          md: md`Kuwait's former offset programme required a 6% guarantee on qualifying civil contracts of KD 10 m or more; it was suspended for revision in 2014 and its current status is not confirmed. Public tenders above KD 75,000 are overseen by CAPT under Public Tenders Law No. 49 of 2016, which was amended by Law No. 94 of 2026 (gazetted 27 September 2026, effective about three months later). The State Audit Bureau's prior review applies to contracts above a threshold reported as KD 100,000 (verify).`,
        },
        { kind: "sources", refs: ["m09-pinsent-2014-offset", "m09-trade-gov-kuwait-public-sector", "m09-tamimi-2026-tenders-law", "m09-unescwa-audit-law-30-1964"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "Kuwait guarantee practice: check before relying on it",
          md: md`Commonly reported but **not verified** in our research: (1) Kuwaiti public tenders require an initial (bid) guarantee and a final (performance) guarantee, with the final guarantee often at 10% of contract value; (2) government entities usually require guarantees issued by a bank licensed in Kuwait, so foreign banks' guarantees are counter-guaranteed through a local bank; (3) the exact percentages and forms under the amended Public Tenders Law and in KAPP RFPs (bid bond and PPA development security amounts). Obtain the tender documents' guarantee forms and confirm with MEWRE's contracts and finance departments.`,
        },
        { kind: "sources", refs: ["m09-icc-urdg-758", "m09-fidic-red-2017"] },
      ],
    },
    {
      layer: "applied",
      title: "Sizing, tracking and calling securities",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Security exposure profile on a USD 400 m EPC",
          given: md`Same contract as lesson 2: ACA **USD 400 m**, advance **USD 40 m** (10%) recovered at 25% of each IPC from IPC 3, retention 10% per IPC up to **USD 20 m** (5%). Performance security **10%**; the Particular Conditions reduce it to **5%** at Taking-Over. After Taking-Over, the Contractor may replace the remaining cash retention with a retention bond. Bank guarantee fee **1.0% per year** of face value.`,
          steps: [
            {
              md: md`**At signature:** performance security $S = 0.10 \times 400 = 40$ USD m. Before the advance is paid, APG = USD 40 m. Bank exposure = $40 + 40 = 80$ USD m (20% of ACA), costing the Contractor about $0.01 \times 80 = 0.8$ USD m per year.`,
            },
            {
              md: md`**After IPC 4:** recovered 17.5, so $APG_4 = 40 - 17.5 = 22.5$ USD m. Exposure $= 40 + 22.5 = 62.5$ USD m. Cash retention held: USD 10.5 m.`,
            },
            {
              md: md`**After IPC 6:** advance fully recovered, APG released. Exposure = USD 40 m (performance security only). Retention at its USD 20 m limit.`,
            },
            {
              md: md`**At Taking-Over:** performance security reduces to $0.05 \times 400 = 20$ USD m; half the retention (USD 10 m) is released in cash; the Contractor replaces the other USD 10 m with a retention bond. Bank exposure $= 20 + 10 = 30$ USD m; the Employer holds no cash.`,
            },
            {
              md: md`**At the Performance Certificate:** both are returned. The Employer's protection for latent defects then rests on the contract (and, in Kuwait, any statutory liability; see the unverified note in lesson 7) and on assigned manufacturer warranties.`,
            },
          ],
          result: md`Exposure falls from USD 80 m to 40 m to 30 m to zero. The MEWRE PM's register must show for each instrument: issuing bank, amount, expiry, reduction trigger and who must act. A missed expiry is the most common way an Employer loses its security.`,
        },
        { kind: "equation", formula: "m09-bond-call" },
        {
          kind: "worked",
          mode: "faded",
          title: "How much to call after a default termination",
          given: md`A USD 120 m BESS EPC is terminated for Contractor default (15.2) at about 85% complete. Remaining unpaid Contract Price for the outstanding work: **USD 18 m**. Replacement contractor's price to complete: **USD 31 m**. Delay damages accrued and unpaid: **USD 4.5 m**. Re-procurement costs (consultant, tender): **USD 0.8 m**. Performance security: **10%** of the Contract Price.`,
          steps: [
            {
              md: md`Extra cost of completion $= C_{\text{comp}} - B_{\text{unpaid}} = 31 - 18 = 13$ USD m.`,
            },
            {
              md: md`Total entitlement $= 13 + 4.5 + 0.8 = 18.3$ USD m.`,
              hidden: true,
              check: { prompt: "Employer's total entitlement", answer: 18.3, unit: "USD m", tolerance: { abs: 0.05 } },
            },
            {
              md: md`Performance security $S = 0.10 \times 120 = 12$ USD m, so $C_{\text{call}} = \min(12,\ 18.3) = 12$ USD m.`,
              hidden: true,
              check: { prompt: "Justified call amount", answer: 12, unit: "USD m", tolerance: { abs: 0.05 } },
            },
            {
              md: md`The balance of USD 6.3 m is a debt claim against the Contractor (and its parent under the PCG), set off against any retention held if the contract allows.`,
            },
          ],
          result: md`A full call of USD 12 m is justified and documented. Note that the entitlement is an **estimate** at the time of the call: if final completion costs are lower, the Employer must account for any excess.`,
        },
        {
          kind: "question",
          question: {
            id: "m09-l03-p1",
            type: "numeric",
            prompt: md`A PV EPC with a **USD 40 m** performance security is terminated for Contractor default. The replacement contractor will complete for **USD 52 m**; the unpaid balance of the original Contract Price for that work is **USD 18 m**. There are no other losses. What amount (USD m) can the Employer justifiably call under the security?`,
            answer: 34,
            unit: "USD m",
            tolerance: { abs: 0.05 },
            explanation: md`Entitlement = extra cost of completion = $52 - 18 = 34$ USD m. This is below the USD 40 m face value, so call USD 34 m. Calling the full USD 40 m would exceed the entitlement and, under FIDIC 2017 4.2, expose the Employer to an indemnity claim for the USD 6 m excess.`,
            concepts: ["m09.performance-security", "m09.on-demand-guarantee"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Handling securities on a live project",
      blocks: [
        {
          kind: "md",
          md: md`**Receiving a guarantee.** Contracts or finance staff check the original (or the SWIFT-transmitted guarantee, MT760) against the contract form word by word: beneficiary name, amount and currency, expiry date or event, governing rules (URDG 758 or none), place and method of presentation, whether a statement of breach is required, reduction clauses, governing law and courts. They confirm authenticity directly with the issuing bank, never through the Contractor.

**Diary and expiry management.** Every instrument goes into a register with an alert at least 60 days before expiry. If the Contractor does not extend in time, the contract (FIDIC 4.2) allows the Employer to claim the full amount; many banks receive "extend or pay" demands as a matter of routine.

**Calling.** A call is a legal step with consequences: the Contractor may seek an injunction, and the Employer may face an indemnity claim. The decision should be taken by the authorised signatory after legal review, with a written calculation of the entitlement, and the demand must match the guarantee's terms exactly (signature, wording, presentation before expiry).`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- Guarantee expires during a dispute because nobody tracked the date; the Employer is left unsecured.
- Demand rejected by the bank for a technical non-compliance (wrong signatory, presented by email when the guarantee requires an original at the counter, statement of breach missing).
- Employer calls the full bond as leverage in a commercial negotiation, then faces an indemnity claim and an injunction application.
- APG not reduced as recoveries are made, so the Contractor pays fees on security it no longer owes and raises a claim.
- Performance security not increased after large Variations (the 2017 adjustment mechanism ignored).
- PCG signed by an entity with no assets, or unenforceable in the parent's home jurisdiction.`,
        },
        {
          kind: "checklist",
          title: "PM checklist: securities",
          items: [
            "Register of every bond/guarantee: issuer, amount, currency, expiry, reduction trigger, rules (URDG 758?), presentation place.",
            "Authenticity confirmed directly with the issuing bank; form matches the contract annex word for word.",
            "Alerts 60 days before expiry; written request to extend issued in time.",
            "APG reduced in step with certified recoveries; performance security adjusted for major Variations.",
            "Before any call: written entitlement calculation, legal review, authorised signatory, compliant demand.",
            "At Taking-Over and Performance Certificate: release or reduce exactly as the contract says, not earlier.",
            "For IPPs: track the PPA development/performance security deadlines (financial close, COD long-stop) alongside the project schedule.",
          ],
        },
        {
          kind: "ask",
          title: "Ask the contractor",
          items: [
            "Which bank will issue the securities, and is it licensed locally or will a local bank counter-guarantee?",
            "Does the guarantee incorporate URDG 758, and does it require a statement of breach with a demand?",
            "What is the expiry mechanism, and how will you ensure extension if completion slips?",
            "Will your parent company provide a guarantee, and what are its latest audited accounts?",
            "Do you propose a retention money guarantee instead of cash retention, and from which bank?",
          ],
        },
        { kind: "scenario", scenario: "m09-s3" },
        {
          kind: "feynman",
          prompt:
            "Explain to a MEWRE finance officer why the ministry should not call the full performance bond the moment a contractor is late.",
          keyPoints: [
            "An on-demand bond will be paid by the bank, but the contract limits the Employer to amounts it is entitled to.",
            "FIDIC 2017 4.2 makes the Employer indemnify the Contractor for an unjustified call.",
            "Delay is compensated by delay damages, which must go through the claims procedure first.",
            "An abusive call invites injunctions, damages claims and loss of credibility with the DAAB.",
            "Call when there is a documented entitlement the Contractor has not paid, or on default termination, or if the bond is about to expire unextended.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m09-l03-q1",
      type: "mcq",
      prompt: md`What is the defining feature of an on-demand (first-demand) bank guarantee?`,
      options: [
        "The bank pays only after an arbitral award confirms the Contractor's breach",
        "The bank pays against a written demand complying with the guarantee terms, without investigating the underlying dispute",
        "It is always unlimited in amount",
        "It is issued by the Contractor's parent company",
      ],
      answer: 1,
      explanation: md`On-demand guarantees are independent of the underlying contract: the bank checks only that the demand complies with the guarantee. Disputes about entitlement are fought afterwards between Employer and Contractor (FIDIC 2017 4.2 indemnity). Conditional/default bonds require proof of breach and loss.`,
      concepts: ["m09.on-demand-guarantee"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m09-l03-q2",
      type: "numeric",
      prompt: md`An advance of **USD 24 m** has been paid against an APG of the same value. Recoveries certified so far: USD 3.0 m, 4.5 m and 5.1 m. What value (USD m) should the APG now be reduced to?`,
      answer: 11.4,
      unit: "USD m",
      tolerance: { abs: 0.05 },
      explanation: md`$APG = 24 - (3.0 + 4.5 + 5.1) = 24 - 12.6 = 11.4$ USD m. Keeping the APG at full value would over-secure the Employer and give the Contractor a claim for unnecessary guarantee charges.`,
      concepts: ["m09.advance-payment-guarantee"],
      difficulty: 1,
    },
    {
      id: "m09-l03-q3",
      type: "multi",
      prompt: md`Which are legitimate grounds for the Employer to claim under the Performance Security under FIDIC 2017 (subject to the exact wording)? Select all that apply.`,
      options: [
        "The Contractor fails to extend the security's validity when required",
        "The Contractor fails to pay an amount agreed or determined to be due to the Employer",
        "The Employer is entitled to terminate for Contractor default under 15.2",
        "The Contractor submits a large claim the Employer considers exaggerated",
        "The Employer wants leverage in a Variation negotiation",
      ],
      answer: [0, 1, 2],
      explanation: md`4.2 permits claims for non-extension, unpaid agreed/determined amounts, failure to remedy a notified default, and circumstances entitling termination under 15.2. Using the bond as leverage or in response to a claim is not an entitlement, and the Employer would indemnify the Contractor for an unjustified call.`,
      concepts: ["m09.performance-security"],
      difficulty: 2,
    },
    {
      id: "m09-l03-q4",
      type: "mcq",
      prompt: md`In a project-financed IPP, who is the beneficiary of the EPC Contractor's performance security, and who can ultimately enforce it?`,
      options: [
        "MEWRE, as offtaker",
        "KAPP, as procuring entity",
        "The SPV, with the security assigned to the lenders",
        "The O&M contractor",
      ],
      answer: 2,
      explanation: md`The EPC contract is between the SPV and the EPC Contractor, so the SPV is the beneficiary. The lenders take an assignment of the SPV's rights (including bonds) as security and can enforce through the security trustee. MEWRE's own protection is the PPA development/performance security from the SPV.`,
      concepts: ["m09.performance-security"],
      difficulty: 2,
    },
    {
      id: "m09-l03-q5",
      type: "decision",
      prompt: md`You are the MEWRE PM. The Contractor's USD 9 m performance guarantee expires in 10 days. Taking-Over has not happened; the Contractor says the extension is "being processed by our head office". What do you do?`,
      options: [
        {
          text: "Escalate to finance/legal now: if the extended guarantee is not received in good time before expiry, present a compliant demand for the full amount as the contract permits for non-extension, and tell the Contractor in writing.",
          score: 1,
          feedback: "Correct. Failure to extend is an express ground for a full claim under FIDIC 2017 4.2. Preparing a compliant demand before expiry protects MEWRE; most contractors extend promptly when they see it.",
        },
        {
          text: "Wait for the extension: the Contractor is cooperative.",
          score: 0.1,
          feedback: "If the guarantee lapses, MEWRE loses its security permanently. Never rely on assurances for an expiring instrument.",
        },
        {
          text: "Call the full guarantee immediately and keep the money as a penalty.",
          score: 0.4,
          feedback: "A call for non-extension may be justified, but the cash is held as security, not as a penalty, and must be accounted for against actual entitlements.",
        },
      ],
      explanation: md`Expiry management is the PM's job. The contract gives a remedy for non-extension precisely because a lapsed guarantee cannot be revived.`,
      concepts: ["m09.performance-security", "m09.on-demand-guarantee"],
      difficulty: 2,
    },
    {
      id: "m09-l03-q6",
      type: "short",
      prompt: md`When would you ask for a parent company guarantee in addition to a 10% performance bond, and what are its weaknesses?`,
      rubric: [
        "When the contracting entity is a subsidiary, branch, joint venture or SPV with limited assets.",
        "PCG covers the full liability (performance and payment), not just 10%.",
        "Weakness: only as good as the parent's creditworthiness; enforcement may require proceedings in the parent's jurisdiction.",
        "Not on-demand: the Employer must prove the subsidiary's liability; slower than a bank guarantee.",
      ],
      modelAnswer: md`Ask for a PCG when the Contractor is a local subsidiary, branch, JV or special-purpose company whose balance sheet could not absorb a major failure: the bond covers only 10%, while the PCG backs the whole liability, including performance by the parent. Its weaknesses are that it is only as strong as the parent (check audited accounts and ratings), it is usually secondary rather than on-demand so liability must be shown, and enforcement may require proceedings abroad.`,
      explanation: md`Bonds give fast but capped cash; PCGs give broad but slower recourse. Lenders and experienced Employers use both.`,
      concepts: ["m09.parent-company-guarantee"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m09-l03-f1", front: "Typical performance security value", back: "10% of the Contract Price, valid until the Performance Certificate (often reduced at Taking-Over).", concepts: ["m09.performance-security"] },
    { id: "m09-l03-f2", front: "FIDIC 2017 performance security delivery deadline", back: "Within 28 days after receiving the Letter of Acceptance (4.2).", concepts: ["m09.performance-security"] },
    { id: "m09-l03-f3", front: "Independence principle", back: "A demand guarantee is separate from the underlying contract; the bank pays a compliant demand without examining the dispute.", concepts: ["m09.on-demand-guarantee"] },
    { id: "m09-l03-f4", front: "URDG 758", back: "ICC Uniform Rules for Demand Guarantees (2010); by default a demand needs a statement of the respect in which the applicant is in breach.", concepts: ["m09.on-demand-guarantee"] },
    { id: "m09-l03-f5", front: "APG value over time", back: "Starts at the advance amount and reduces by each certified recovery; released when the advance is fully repaid.", concepts: ["m09.advance-payment-guarantee"] },
    { id: "m09-l03-f6", front: "Retention release under FIDIC 2017", back: "Half at the Taking-Over Certificate; half after the latest DNP expires (14.9).", concepts: ["m09.retention"] },
    { id: "m09-l03-f7", front: "Main exception to paying an on-demand guarantee (English law)", back: "Clear fraud known to the bank; some jurisdictions (e.g. Singapore) also accept unconscionability.", concepts: ["m09.on-demand-guarantee"] },
    { id: "m09-l03-f8", front: "Consequence of an unjustified bond call under FIDIC 2017", back: "The Employer must indemnify the Contractor for damages, losses and expenses resulting from a claim it was not entitled to make (4.2).", concepts: ["m09.performance-security"] },
    { id: "m09-l03-f9", front: "PPA development security", back: "Security from the SPV/sponsors to the offtaker, at risk if financial close or COD is not achieved by the long-stop dates.", concepts: ["m09.performance-security"] },
  ],
  scenarios: [
    {
      id: "m09-s3",
      title: "The bond call that could backfire",
      context: md`MEWRE's contract for a 132 kV substation extension (FIDIC 2017 Red base, USD 30 m, 10% performance guarantee on-demand under URDG 758) is 70 days late. The Contractor has a pending claim for 45 days' EOT for late outage permits from MEWRE's own network control. The director says: "Call the full USD 3 m bond tomorrow. That will make them move."`,
      start: "a",
      concepts: ["m09.performance-security", "m09.on-demand-guarantee"],
      nodes: {
        a: {
          md: md`What do you advise?`,
          choices: [
            {
              text: "Advise against a full call now: there is no agreed or determined amount unpaid, the delay damages entitlement depends on the EOT claim, and an unjustified call exposes MEWRE to an indemnity claim. Instead, give an Employer's Notice of Claim for delay damages and push the Engineer to determine the EOT.",
              next: "b",
              score: 10,
              feedback: "Correct. Delay damages need an entitlement established through 20.2 and 3.7. If 45 days of EOT are granted, only 25 days are culpable.",
            },
            {
              text: "Call it: an on-demand bond means MEWRE can call whenever it wants.",
              next: "c",
              score: 2,
              feedback: "The bank will pay, but the contract limits MEWRE to amounts it is entitled to, with an indemnity for unjustified calls. On-demand is about the bank's obligation, not the Employer's entitlement.",
            },
          ],
        },
        b: {
          md: md`The Engineer determines 40 days' EOT. Delay damages are USD 15,000 per day. Neither party gives an NOD and the Contractor does not pay the resulting amount. What now?`,
          choices: [
            {
              text: "Deduct the 30 days × USD 15,000 = USD 450,000 from the next IPC; if no IPC is due or the Contractor has left site, call USD 450,000 under the bond.",
              score: 10,
              feedback: "Right: the amount is now final and binding (no NOD). Set-off through the IPC is the normal route; a call for the exact amount is justified if set-off is not possible.",
            },
            {
              text: "Call the full USD 3 m to be safe.",
              score: 3,
              feedback: "The entitlement is USD 450,000; calling more is exposure without benefit.",
            },
          ],
        },
        c: {
          md: md`MEWRE calls the full USD 3 m. The Contractor applies to court for an injunction and gives a Notice of Claim for the indemnity under 4.2. The Engineer later grants 45 days' EOT. What is MEWRE's likely position?`,
          choices: [
            {
              text: "MEWRE was entitled to at most 25 days of delay damages (USD 375,000 at USD 15,000/day) and will likely have to repay the excess with costs; its credibility with the DAAB suffers.",
              score: 6,
              feedback: "A realistic assessment of the damage done. The lesson: compute the entitlement before calling.",
            },
            {
              text: "MEWRE keeps all USD 3 m because the bank paid.",
              score: 0,
              feedback: "Payment by the bank does not settle entitlement between the parties.",
            },
          ],
        },
      },
    },
  ],
};

export default lesson;
