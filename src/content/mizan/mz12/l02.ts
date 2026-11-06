import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz12-l02",
  title: "Distribution and agency agreements in Kuwait: agency law concepts, exclusivity, territory, minimums and termination",
  summary:
    "The difference between a commercial agent, a distributor and a value-added reseller, and why it decides margin, risk and legal treatment. The Kuwaiti framework as far as the research supports it (Commercial Agencies Law concepts, Law 1 of 2024 on foreign companies and local agents, Law 94 of 2026 on agents in public procurement), and the clauses that make or break a distribution agreement: scope, exclusivity, territory, minimums, pricing, IP and data, liability, termination and compensation. Always confirm with Kuwaiti counsel.",
  minutes: 80,
  objectives: [
    "You can distinguish agent, distributor, value-added reseller and referral partner by who signs, who takes title, who carries credit risk and how each is paid.",
    "You can state what the research supports about Kuwaiti agency rules (Law 1 of 2024, Law 94 of 2026) and what remains unverified.",
    "You can explain why a commission-agent model may be closed for public tenders and what structure replaces it.",
    "You can compute agent commission, distributor gross profit and a minimum-purchase shortfall.",
    "You can draft a distribution term sheet with exclusivity, territory, minimums and termination that protects Mizan.",
  ],
  concepts: [
    {
      id: "mz12.agency-vs-distribution",
      name: "Agent versus distributor",
      description:
        "An agent finds customers and earns a commission; the principal signs with the customer, owns the goods until delivery and carries credit risk. A distributor buys from the principal and resells in its own name, taking title, stock, credit and warranty-handling risk in return for the resale margin. A value-added reseller is a distributor that adds integration and service.",
      competency: "mz-business",
      related: ["mz12.build-partner-resell"],
    },
    {
      id: "mz12.kuwait-agency-framework",
      name: "Kuwaiti agency framework",
      description:
        "Kuwait regulates commercial agencies by statute (a Commercial Agencies Law, reported as Law 13 of 2016) with registration at the Ministry of Commerce and Industry. Law 1 of 2024 is reported to let foreign companies operate branches, or bid as registered foreign firms, without a local agent. Details, and the treatment of distributors, must be confirmed with counsel.",
      competency: "mz-business",
      related: ["fc08.kuwait-ownership", "m11.tenders-law"],
    },
    {
      id: "mz12.public-agent-ban",
      name: "Agents in public procurement",
      description:
        "Law 94 of 2026 (gazetted 27 September 2026, effective about three months later) is reported to prohibit local and commission agents in public contracting. A vendor selling to MEWRE or KISR through Mizan should therefore be structured with Mizan as the contracting party (prime or subcontractor delivering real scope), not as a commission agent. Confirm with counsel.",
      competency: "mz-business",
      related: ["m11.law-94-2026", "m11.local-content"],
    },
    {
      id: "mz12.exclusivity-territory",
      name: "Exclusivity and territory",
      description:
        "Exclusivity promises that the principal will not appoint another seller (or sell itself) in a defined territory, product scope and customer segment. It is valuable only when earned: tie it to minimums and a review date, and define territory (Kuwait, GCC), products and segments (utility, C&I, government) precisely.",
      competency: "mz-business",
      related: ["mz12.agency-vs-distribution", "mz12.minimums"],
    },
    {
      id: "mz12.minimums",
      name: "Minimum purchase commitments",
      description:
        "Volume or value the distributor commits to buy per period. The usual remedy for a shortfall is loss of exclusivity, not a cash penalty; a take-or-pay clause turns market risk into debt. Tie minimums to tender outcomes the distributor cannot control.",
      competency: "mz-business",
      related: ["mz12.exclusivity-territory"],
    },
    {
      id: "mz12.termination-compensation",
      name: "Termination and compensation",
      description:
        "How either side can end the agreement (term, notice, cause), what happens to stock, open tenders, customers and support, and whether the agent or distributor is owed compensation. Agency statutes in the region are commonly reported to protect agents on termination without cause; check the Kuwaiti position with counsel.",
      competency: "mz-business",
      related: ["mz12.kuwait-agency-framework"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Who signs, who owns, who pays",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Every vendor that wants to enter Kuwait through Mizan will send you an agreement within the first two meetings, usually their standard one, written for their protection under their law. Whether Mizan is an agent, a distributor or a reseller decides its margin, its risk and, in Kuwait, possibly whether it can sell to a ministry at all. You will negotiate these before you can afford counsel on every call, so you must recognise the clauses that matter and know exactly which questions to take to counsel.`,
        },
        {
          kind: "md",
          md: md`### Four ways to sell someone else's product

| | Commercial agent | Distributor | Value-added reseller (VAR) | Referral partner |
|---|---|---|---|---|
| Who signs with the customer | Principal (vendor) | Distributor | VAR | Vendor |
| Who takes title to goods | Principal until delivery | Distributor | VAR | Vendor |
| Who carries credit risk | Principal | Distributor | VAR | Vendor |
| Who handles warranty claims | Principal (agent may coordinate) | Distributor, backed by vendor warranty | VAR, backed by vendor | Vendor |
| How paid | Commission on sales, $I = kV$ | Resale margin | Resale margin plus service fees | One-off fee |
| Working capital | Little | Stock and receivables | Stock, receivables, project costs | None |
| Fit for Mizan | Fast, light, but no contract or data | Hardware lines with service attached | Robots, BESS integration, PPC/EMS with Mizan functions | Products outside Mizan's scope |`,
        },
        { kind: "equation", formula: "mz12-agent-commission" },
        { kind: "equation", formula: "mz12-distributor-gross-profit" },
        {
          kind: "md",
          md: md`### The Kuwaiti framework, as far as the research goes

**Foreign ownership and presence (Founder Core fc08-l06).** Companies default to 51 % Kuwaiti ownership under the Commercial Law; a KDIPA licence under Law 116 of 2013 can allow up to 100 % foreign ownership outside the negative list. This is why foreign vendors have historically entered Kuwait through a local agent or distributor.

**Commercial agencies.** Kuwait regulates commercial agencies by statute: the current law is commonly cited as **Law 13 of 2016 on organising commercial agencies**, which replaced a 1964 law. Concepts that secondary summaries attribute to it, all to be confirmed:
- Agencies are entered in a **register at the Ministry of Commerce and Industry (MOCI)**; an unregistered agency may not be enforceable in Kuwaiti courts.
- The agent must be a Kuwaiti national or a Kuwaiti company meeting ownership conditions.
- **Exclusivity is not presumed**: a principal may appoint more than one agent unless the contract grants exclusivity.
- Rules on **compensation when the principal ends or does not renew** the agency without the agent's fault.
- Whether a buy-resell distribution agreement counts as a "commercial agency" for registration and compensation is a classic question: ask counsel for your specific contract.

**Law 1 of 2024.** Sources describe it in two ways: Al Tamimi and BDO (January 2024) say it amended **Article 24 of the Commercial Law** so that foreign companies can operate **branches without a local agent**, without removing the 51 % rule for incorporation; Chambers (2025) describes an amendment to **Article 31 of the Public Tenders Law** letting registered foreign firms bid without a local agent. Both point the same way: the local agent is no longer mandatory for foreign firms in key situations. Have counsel confirm which articles changed.

**Law 94 of 2026.** Gazetted 27 September 2026 (Kuwait Al-Youm issue 1810), effective about three months after publication (late December 2026). Al Tamimi reports that it **bans local and commission agents in public contracting**, raises the direct-contracting threshold to KWD 1,000,000 per financial year and tightens local content (Track 0, m11-l01 and m11-l04). A cabinet-stage note (Deloitte) said the agent restriction would be subject to controls set by the Council of Ministers.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Confirm with counsel before relying on any of this",
          md: md`The research for this course reached legal summaries at search-snippet level only. Unverified: (1) the number, date and current text of the Commercial Agencies Law and its executive regulations; (2) registration, nationality and compensation rules; (3) which articles Law 1 of 2024 amended (sources differ); (4) the final wording and implementing controls of the Law 94 of 2026 agent ban and its transitional rules. Every agreement Mizan signs as agent, distributor or reseller should be reviewed by Kuwaiti counsel, and the structure for any public tender should be confirmed in writing.`,
        },
        {
          kind: "md",
          md: md`### What the 2026 agent ban means for Mizan's model

The old Gulf playbook was: a foreign vendor bids, a local agent opens doors for a percentage. If Law 94 of 2026 prohibits commission agents in public contracting, that playbook is closed for MEWRE, KISR and other CAPT-governed buyers. What remains open, subject to counsel:

1. **Mizan as contracting party.** Mizan bids or contracts in its own name and buys the vendor's product as a subcontract or supply (the distributor or VAR model). Mizan carries the contract risk and must deliver real scope: integration, commissioning, analytics, O&M.
2. **Vendor bids directly.** The foreign vendor registers and bids alone (Law 1 of 2024 path); Mizan is a named subcontractor for local scope, which also helps the 30 % local subcontracting requirement reported for Law 94 of 2026.
3. **Private and semi-private buyers.** IPPs (the Shagaya Phase III zones via KAPP), EPCs and O&M contractors buy under their own procurement rules; agency and distribution structures may still be used there, subject to the general law and the buyer's compliance policies.

The ban favours what Mizan wants to be anyway: a company that delivers scope and owns the customer, not a door-opener on commission.`,
        },
        {
          kind: "flow",
          title: "From first meeting to a working distribution agreement",
          steps: [
            { label: "Fit check", detail: "Mode decided for the line (lesson 1); conflicts with Mizan's built products checked" },
            { label: "Vendor due diligence", detail: "References, certifications, financials, after-sales capacity (lesson 3)" },
            { label: "Term sheet", detail: "Scope, territory, exclusivity, minimums, pricing, data, termination, on two pages" },
            { label: "Counsel review", detail: "Kuwaiti law characterisation (agency or distribution), registration, procurement structure, governing law" },
            { label: "Long form and registration", detail: "Signed agreement; MOCI registration if counsel advises it" },
            { label: "Launch plan", detail: "Target plants, demo unit or reference visit, joint pipeline review every quarter" },
          ],
          caption: "Never start from the vendor's long form. Agree a two-page term sheet first; the long form then implements it.",
        },
        { kind: "sources", refs: ["mz12-r3", "mz12-r4", "mz12-r5", "mz12-r6", "mz12-r7", "mz12-r8", "mz12-r18"] },
      ],
    },
    {
      layer: "applied",
      title: "Clauses and their numbers",
      blocks: [
        {
          kind: "md",
          md: md`### The clauses that matter, and Mizan's position

| Clause | What vendors usually propose | Mizan's position |
|---|---|---|
| **Products** | "All current and future products" | Named products and models; new products by written addition |
| **Territory** | "Kuwait" (or nothing) | Kuwait, with a right of first negotiation for other GCC states |
| **Segments** | Not defined | Utility-scale PV and hybrid plants; exclude segments Mizan will not serve, so the vendor can use others there |
| **Exclusivity** | Exclusive for the distributor, plus a broad non-compete | Exclusive in the defined territory and segments, conditional on minimums; non-compete limited to directly competing hardware, never Mizan's software or services |
| **Minimums** | Fixed annual volume, take-or-pay | Tied to awarded tenders; first year a ramp; shortfall remedy = loss of exclusivity, not payment |
| **Pricing** | Discount off a list the vendor can change at will | Fixed discount schedule; 90 days' notice of list changes; price protection on quoted tenders |
| **Direct sales** | Vendor reserves "key accounts" | Vendor sales in territory pay Mizan a commission or are excluded only for named accounts |
| **Data and IP** | Vendor owns everything, including plant telemetry | Vendor owns its software; plant data belongs to the owner; Mizan gets API access under the owner's licence |
| **Warranty and support** | Warranty to the distributor, return to factory | Back-to-back warranty matching what Mizan gives the customer; local spares; response times; vendor engineers on site when needed |
| **Liability** | Distributor indemnifies the vendor | Vendor indemnifies for product defects and IP infringement; mutual cap |
| **Term and termination** | 1 year, terminable on 30 days' notice | 3 years; termination for cause or missed minimums with a cure period; 6 to 12 months' notice otherwise |
| **Post-termination** | Distributor stops selling immediately | Completion of awarded tenders, buy-back of stock, support for the installed base for at least 5 to 7 years |
| **Governing law and disputes** | Vendor's home law and courts | Kuwaiti law may apply mandatorily to registered agencies (ask counsel); otherwise neutral arbitration seat |`,
        },
        { kind: "equation", formula: "mz12-minimum-shortfall" },
        {
          kind: "worked",
          mode: "worked",
          title: "Agent or distributor for a BESS integrator on a private IPP tender",
          given: md`Illustrative. A BESS integrator wants Mizan's help on a 20 MW / 80 MWh battery for a private IPP. Contract value of the BESS supply $V$ = USD 16 m. Option A: Mizan as commercial agent at $k$ = 3 % commission (allowed here only because the buyer is a private IPP, subject to counsel and the IPP's own rules). Option B: Mizan as VAR: buys at USD 15.0 m, sells at USD 16.0 m, and carries local costs (commissioning support, logistics coordination, bonds, insurance) of USD 300,000.`,
          steps: [
            { md: md`**Agent income.** $I = kV = 0.03 \times 16{,}000{,}000 =$ USD 480,000, with almost no balance sheet risk, but the integrator signs with the IPP and owns the relationship.` },
            { md: md`**VAR gross profit.** $GP = 16.0 - 15.0 - 0.3 =$ USD 0.7 m, a 4.4 % margin on revenue. Higher than the commission by USD 220,000.` },
            { md: md`**Risk carried as VAR.** Mizan's name is on a USD 16 m contract: performance bond (often 10 %, USD 1.6 m), advance payment guarantee, delay liquidated damages and a 10 to 15 year capacity guarantee that only the integrator can really honour (Track 0, m05-l04 and m09-l06).` },
            { md: md`**Risk-adjusted view.** If there is a 5 % chance of a claim costing USD 2 m that Mizan cannot pass back to the integrator, the expected cost is USD 100,000, cutting the VAR advantage to about USD 120,000 for a large increase in exposure.` },
          ],
          result: md`For a large BESS supply, Mizan's balance sheet cannot carry the risk that a VAR model implies, so the lighter roles win: agent where lawful, or a named subcontractor for EMS integration, commissioning support and O&M, which carries less exposure and puts Mizan's software on the plant. For a public tender, the agent option disappears if the Law 94 of 2026 ban applies, and the subcontractor route remains.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A minimum-purchase clause on robots",
          given: md`Illustrative. An exclusive robot distribution agreement sets a minimum of $M$ = 300 robots per year. Mizan sells $A$ = 180 in year 1 because one tender slipped. The vendor's draft says: shortfall paid at $r$ = USD 800 per robot not bought. Mizan's gross profit per robot is USD 550 (lesson 1).`,
          steps: [
            {
              md: md`**Shortfall payment.** $S = r \max(0, M - A) = 800 \times 120 =$ USD 96,000.`,
              hidden: true,
              check: { prompt: "Shortfall payment (USD)", answer: 96000, tolerance: { abs: 10 } },
            },
            {
              md: md`**Year-1 gross profit on robots.** $180 \times 550 =$ USD 99,000.`,
              hidden: true,
              check: { prompt: "Gross profit on 180 robots (USD)", answer: 99000, tolerance: { abs: 10 } },
            },
            {
              md: md`**Net.** $99{,}000 - 96{,}000 =$ USD 3,000: one slipped tender wipes out the line for the year.`,
              hidden: true,
              check: { prompt: "Net after the shortfall (USD)", answer: 3000, tolerance: { abs: 10 } },
            },
            { md: md`**Counter-proposal.** Minimum defined as a share of awarded robot tenders in the territory, or a ramp (100 in year 1, 300 in year 2); remedy for a shortfall is conversion to non-exclusive after a cure period, with no cash penalty.` },
          ],
          result: md`A take-or-pay minimum moves the vendor's market risk onto Mizan's balance sheet. In a market of few, slow, public tenders, tie minimums to awards and make loss of exclusivity the only remedy.`,
        },
        {
          kind: "question",
          question: {
            id: "mz12-l02-p1",
            type: "numeric",
            prompt: md`As a distributor, Mizan sells 40 PPC units at USD 60,000 each, buys them at USD 48,000 and spends USD 4,000 per unit on local engineering and commissioning. What is the gross profit (USD)?`,
            answer: 320000,
            tolerance: { abs: 100 },
            unit: "USD",
            explanation: md`$GP = Q(P_s - P_b - c_l) = 40 \times (60{,}000 - 48{,}000 - 4{,}000) = 40 \times 8{,}000 =$ USD 320,000.`,
            concepts: ["mz12.agency-vs-distribution"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Negotiating and papering the deal",
      blocks: [
        {
          kind: "xref",
          to: "fc08-l06",
          note: "Founder Core covers Kuwaiti company structures (51 % rule, KDIPA, branches). This lesson assumes Mizan has a Kuwaiti entity able to contract.",
        },
        {
          kind: "xref",
          to: "m11-l04",
          note: "Track 0 covers local content and agent rules in public procurement from the ministry side. Read it to see how an evaluator will check your structure.",
        },
        {
          kind: "xref",
          to: "fc04-l07",
          note: "Negotiation mechanics (give-get, BATNA, anchoring) from Founder Core apply directly to distribution terms.",
        },
        {
          kind: "md",
          md: md`**Who does what.** You lead the commercial negotiation; Kuwaiti counsel characterises the agreement (agency or distribution), advises on registration and procurement structure and reviews governing law; an accountant checks how stock, guarantees and FX sit in Mizan's books. The vendor's regional sales director negotiates for them, with their legal team in the background.

**What goes into the file.** A two-page term sheet, the long-form agreement, counsel's written opinion on structure for public tenders, MOCI registration evidence if applicable, the vendor's warranty and certification documents, and a pipeline plan agreed with the vendor.

**Practical points from Gulf distribution deals.**
- **Vendors over-promise territory and under-deliver support.** The test is not the exclusivity clause but whether their engineer arrives in Kuwait within 72 hours of a fault in July.
- **Exclusivity is the vendor's main currency.** Trade it for things that cost them little and help you a lot: demo units, reference visits, joint tender support, price protection.
- **Governing law.** A vendor will propose its home law. Ask counsel whether Kuwaiti law applies mandatorily to an agency registered in Kuwait; if not, a neutral arbitration seat is usual.
- **Written authorisation letters.** Tenders often require a manufacturer's authorisation letter naming the bidder. Make its issue an obligation in the agreement, not a favour.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- Signing the vendor's standard distributor agreement with a broad non-compete that catches Mizan's own analytics.
- Take-or-pay minimums in a market where one slipped tender is a whole year.
- Acting as a commission "agent" on a public tender after Law 94 of 2026 takes effect, putting both Mizan and the vendor's bid at risk.
- No post-termination support, so the installed base is orphaned and Mizan's reputation goes with it.
- Assuming exclusivity stops parallel imports or a competitor buying from the vendor's other regional distributors; it binds only the vendor, and only as written.`,
        },
        {
          kind: "ask",
          title: "Questions for Kuwaiti counsel",
          items: [
            "Under current Kuwaiti law, is this agreement a commercial agency, a distribution agreement, or both, and must it be registered at MOCI?",
            "What compensation could Mizan claim, or owe, if the agreement ends without cause or is not renewed?",
            "Which articles did Law 1 of 2024 amend, and what does it mean for this vendor bidding alone?",
            "Does the Law 94 of 2026 agent restriction apply to this structure for a CAPT, MEWRE or KISR tender, and what are its implementing controls and transitional rules?",
            "Can the parties choose foreign law and arbitration for this agreement, or does Kuwaiti law apply mandatorily?",
            "Are there local-content or national-product rules that change how the supply should be split between vendor and Mizan?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "mz12-l02-p2",
            type: "short",
            prompt: md`Draft a two-page distribution term sheet (as a structured list) between Mizan and a foreign cleaning-robot manufacturer for Kuwait. Use labelled illustrative numbers and include the questions you will put to Kuwaiti counsel.`,
            explanation: md`The term sheet must make exclusivity earned, keep minimums tied to awards, protect Mizan's own products, cover post-termination support, and route every legal characterisation question to Kuwaiti counsel.`,
            rubric: [
              "Defines products, territory and segments precisely and states the role (distributor or VAR, not commission agent for public tenders)",
              "Makes exclusivity conditional on realistic minimums tied to awards, with loss of exclusivity as the shortfall remedy",
              "Protects Mizan's software and services from any non-compete and secures fleet data access under the owner's licence",
              "Covers pricing and price protection, back-to-back warranty, local spares, response times and manufacturer authorisation letters",
              "Covers term, termination with cure, post-termination support for the installed base and stock buy-back",
              "Lists specific questions for counsel on characterisation, registration, compensation, Law 94 of 2026 and governing law, and labels all legal points as to be confirmed",
            ],
            modelAnswer: md`**Parties.** Mizan (Kuwaiti entity) and the Manufacturer. **Role.** Mizan buys and resells as value-added reseller, providing installation, commissioning, fleet O&M and cleaning optimisation. Mizan does not act as commission agent on public tenders. **Products.** Waterless robot models listed in Annex A; new models by written addition. **Territory and segments.** Kuwait; utility-scale and research PV plants above 5 MW; right of first negotiation for Bahrain and Qatar. **Exclusivity.** Non-exclusive for the first 12 months; becomes exclusive for the territory and segments once Mizan has 150 robots under awarded orders (illustrative). **Minimums.** After exclusivity: the greater of 150 robots per year or 50 % of robot volume in awarded tenders in the segment; shortfall remedy: after a 6-month cure period, reversion to non-exclusive. No cash penalty. **Pricing.** 25 % discount off list (illustrative); list changes with 90 days' notice; quoted prices held for 180 days for named tenders. **Direct sales.** Manufacturer refers all territory enquiries to Mizan; any direct sale pays Mizan 5 %. **Non-compete.** Mizan will not distribute directly competing robot hardware during exclusivity. Explicitly excluded: Mizan's soiling analytics, cleaning optimisation, stow functions and any services. **Data.** Manufacturer owns its software. Plant data belongs to the plant owner; Manufacturer provides Mizan read access to cleaning events, status and faults and write access to schedules through a documented API, under the owner's licence. **Warranty and support.** 5-year warranty back-to-back with Mizan's customer warranty; spares on consignment in Kuwait worth 3 % of installed value; remote response 4 h, engineer on site within 72 h for fleet-level faults; training and certification of Mizan technicians. Manufacturer issues authorisation letters for each tender on request. **Liability.** Manufacturer indemnifies for product defects and IP infringement; mutual cap at 12 months' purchases except for indemnities. **Term.** 3 years, renewable. Termination for material breach with 60-day cure; otherwise 12 months' notice. **Post-termination.** Completion of awarded tenders; buy-back of new stock at cost; spares and software support for the installed base for 7 years. **Governing law and disputes.** To be confirmed with counsel; preference for arbitration at a neutral seat if permitted. **Questions for counsel (all legal points to be confirmed).** (1) Is this a commercial agency under the Kuwaiti agencies law, and must it be registered at MOCI? (2) What termination compensation could apply either way? (3) Under Law 94 of 2026, can Mizan bid as contracting party with this supply for MEWRE or KISR, and what implementing controls apply? (4) Which articles did Law 1 of 2024 amend, and may the Manufacturer bid alone? (5) Can we choose foreign law and arbitration? (6) Local-content implications of Mizan's installation and O&M scope.`,
            concepts: ["mz12.exclusivity-territory", "mz12.minimums", "mz12.termination-compensation", "mz12.public-agent-ban", "mz12.agency-vs-distribution"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a foreign robot manufacturer's sales director why Mizan will not act as their commission agent for a MEWRE tender, and what structure you propose instead.",
          keyPoints: [
            "Law 94 of 2026, effective around late December 2026, is reported to ban local and commission agents in public contracting (to be confirmed with counsel)",
            "An agent structure could put both the vendor's bid and Mizan at risk",
            "Mizan proposes to be the contracting party or a named subcontractor delivering real scope (installation, commissioning, O&M, analytics)",
            "That scope also helps meet local subcontracting requirements",
            "The vendor can also bid directly as a registered foreign firm, with Mizan as subcontractor",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz12-l02-q1",
      type: "mcq",
      prompt: md`What is the defining difference between a commercial agent and a distributor?`,
      options: [
        "Agents are always exclusive; distributors never are",
        "A distributor buys and resells in its own name, taking title and credit risk; an agent earns commission while the principal signs with the customer",
        "Agents must be foreign companies",
        "Distributors cannot provide services",
      ],
      answer: 1,
      explanation: md`Title, contract and credit risk sit with the distributor; the agent introduces and is paid a commission. Exclusivity is a separate term in either case.`,
      concepts: ["mz12.agency-vs-distribution"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz12-l02-q2",
      type: "mcq",
      prompt: md`What does the research report about Law 94 of 2026?`,
      options: [
        "It requires every foreign vendor to appoint a Kuwaiti agent",
        "It bans local and commission agents in public contracting and tightens local content, effective about three months after its 27 September 2026 gazettal",
        "It abolishes the Commercial Agencies Law",
        "It applies only to KPC",
      ],
      answer: 1,
      explanation: md`Al Tamimi (29 Sep 2026) reports the agent ban, the KWD 1 m direct-contracting threshold and tighter local content. Implementing controls remain to be confirmed.`,
      concepts: ["mz12.public-agent-ban"],
      difficulty: 1,
    },
    {
      id: "mz12-l02-q3",
      type: "multi",
      prompt: md`Which positions protect Mizan in an exclusive distribution agreement?`,
      options: [
        "Exclusivity conditional on minimums tied to awarded tenders",
        "A take-or-pay shortfall penalty",
        "Mizan's software and services excluded from the non-compete",
        "Post-termination support for the installed base",
        "Vendor's right to change list prices without notice",
      ],
      answer: [0, 2, 3],
      explanation: md`Take-or-pay moves market risk onto Mizan; unannounced price changes destroy quoted tender margins. The other three protect Mizan's cash, core product and reputation.`,
      concepts: ["mz12.exclusivity-territory", "mz12.minimums", "mz12.termination-compensation"],
      difficulty: 2,
    },
    {
      id: "mz12-l02-q4",
      type: "numeric",
      prompt: md`An agent earns 4 % on a USD 2.5 m PPC/EMS supply contract. What is the commission (USD)?`,
      answer: 100000,
      tolerance: { abs: 10 },
      unit: "USD",
      explanation: md`$I = kV = 0.04 \times 2{,}500{,}000 =$ USD 100,000.`,
      concepts: ["mz12.agency-vs-distribution"],
      difficulty: 1,
    },
    {
      id: "mz12-l02-q5",
      type: "numeric",
      prompt: md`A minimum of 200 units per year with a shortfall charge of USD 500 per unit; Mizan buys 140. What is the shortfall payment (USD)?`,
      answer: 30000,
      tolerance: { abs: 10 },
      unit: "USD",
      explanation: md`$S = r\max(0, M - A) = 500 \times 60 =$ USD 30,000. Negotiate loss of exclusivity as the remedy instead.`,
      concepts: ["mz12.minimums"],
      difficulty: 1,
    },
    {
      id: "mz12-l02-q6",
      type: "decision",
      prompt: md`A vendor's standard agreement names Mizan "exclusive agent for Kuwait" with a 3 % commission and asks Mizan to represent them on a KISR tender in February 2027. What do you do?`,
      options: [
        { text: "Sign: exclusivity and a commission are a good start.", score: 0.1, feedback: "A commission-agent role on a public tender after Law 94 of 2026 takes effect may be prohibited; you could disqualify the bid." },
        { text: "Propose a supply or subcontract structure in which Mizan is the contracting party (or a named subcontractor with real scope), and get counsel's written view on Law 94 of 2026 before the tender.", score: 1, feedback: "Right: restructure away from commission agency for public buyers and confirm with counsel." },
        { text: "Accept but keep the agency confidential from KISR.", score: 0, feedback: "Concealing an agent relationship in public procurement is a serious compliance risk." },
      ],
      explanation: md`For CAPT-governed buyers the reported ban on commission agents changes the structure: Mizan must deliver scope in its own name or the vendor bids directly.`,
      concepts: ["mz12.public-agent-ban", "mz12.agency-vs-distribution"],
      difficulty: 2,
    },
    {
      id: "mz12-l02-q7",
      type: "order",
      prompt: md`Order the steps to a working distribution agreement.`,
      items: [
        "Decide the mode for the line and check conflicts with Mizan's products",
        "Vendor due diligence",
        "Two-page term sheet",
        "Kuwaiti counsel review of characterisation, registration and procurement structure",
        "Long form signed and registered if advised",
      ],
      explanation: md`Start from strategy and evidence, agree terms short, then let counsel and the long form implement them. Starting from the vendor's long form inverts this.`,
      concepts: ["mz12.kuwait-agency-framework", "mz12.agency-vs-distribution"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "mz12-l02-f1", front: "Agent vs distributor", back: "Agent: commission, principal signs and carries credit risk. Distributor: buys and resells in its own name, carries title, stock and credit risk.", concepts: ["mz12.agency-vs-distribution"] },
    { id: "mz12-l02-f2", front: "Law 1 of 2024", back: "Reported to let foreign companies operate branches (Commercial Law Art. 24) or bid as registered foreign firms (Tenders Law Art. 31) without a local agent. Sources differ on the article: confirm with counsel.", concepts: ["mz12.kuwait-agency-framework"] },
    { id: "mz12-l02-f3", front: "Law 94 of 2026 and agents", back: "Gazetted 27 Sep 2026, effective about late Dec 2026; reported ban on local and commission agents in public contracting. Mizan should be the contracting party or a subcontractor.", concepts: ["mz12.public-agent-ban"] },
    { id: "mz12-l02-f4", front: "Earned exclusivity", back: "Exclusive only in a defined territory, product scope and segment, conditional on minimums tied to awards; shortfall remedy = loss of exclusivity.", concepts: ["mz12.exclusivity-territory", "mz12.minimums"] },
    { id: "mz12-l02-f5", front: "Shortfall formula", back: md`$S = r\max(0, M - A)$: avoid it; it turns market risk into debt.`, concepts: ["mz12.minimums"] },
    { id: "mz12-l02-f6", front: "Post-termination must-haves", back: "Completion of awarded tenders, stock buy-back, 5 to 7 years of spares and support for the installed base.", concepts: ["mz12.termination-compensation"] },
    { id: "mz12-l02-f7", front: "Commercial agencies in Kuwait", back: "Statutory regime (commonly cited as Law 13 of 2016), registration at MOCI, exclusivity not presumed, termination compensation rules. All to be confirmed with counsel.", concepts: ["mz12.kuwait-agency-framework", "mz12.termination-compensation"] },
  ],
};

export default lesson;
