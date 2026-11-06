import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw14-l04",
  title: "Company setup: Netherlands vs Zurich vs Delaware",
  summary:
    "The structure decision for Afterwave: what YC and US investors require, Delaware-parent structures with a Dutch or Swiss operating subsidiary, how a flip works if a Dutch BV already exists, the cost and talent trade-off between the Netherlands and Zurich, and which grants each choice keeps or loses (WBSO, Innovatiekrediet, EIC, Innosuisse).",
  minutes: 80,
  objectives: [
    "State what YC and a US seed lead require from Afterwave's structure and why",
    "Choose between a Dutch BV, a Swiss GmbH or AG, and a Delaware parent with a European subsidiary for a given funding path",
    "Compute the net annual R&D team cost in the Netherlands (after WBSO) and in Zurich, and its effect on runway",
    "List which grants and incentives each structure keeps or loses, and what is still unverified",
  ],
  concepts: [
    { id: "aw14.parent-sub-structure", name: "Delaware parent with a European operating subsidiary", description: "Investors hold shares in a Delaware C-corp; a Dutch BV or Swiss company employs the team, does the R&D and contracts locally, usually billing the parent cost plus a markup.", competency: "aw-business", related: ["fc08.delaware-flip", "fc08.nl-entities", "fc08.swiss-entities"] },
    { id: "aw14.location-cost", name: "Location cost and talent trade-off", description: "Where the team is employed sets salary cost, hiring pool, immigration rules and which R&D incentives apply; compare net cost per R&D head and the runway it buys.", competency: "aw-business", related: ["aw14.parent-sub-structure"] },
    { id: "aw14.grant-eligibility", name: "Grant eligibility follows the employing entity", description: "WBSO needs Dutch-payroll R&D staff; Innovatiekrediet needs a company established in the Netherlands; EIC needs an SME in an EU or associated country; Innosuisse is Swiss. Moving the team moves the grants.", competency: "aw-business", related: ["fc07.non-dilutive"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Three jurisdictions, one company",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Afterwave applied to YC W27 and is considering Zurich, while the founders' current base is the Netherlands. These are three different questions that are easy to blur: **where investors hold shares** (YC needs an eligible parent), **where the team is employed** (cost, talent, grants) and **where customers contract** (EU buyers like an EU counterparty). Getting them right early saves a second restructuring and keeps non-dilutive money that a careless move would forfeit.`,
        },
        { kind: "xref", to: "fc08-l06", note: "Founder Core: the legal forms (BV, STAK, GmbH, AG, Delaware C-corp), flip steps, franchise tax and what is verified. This lesson applies them to Afterwave's decision." },
        {
          kind: "md",
          md: md`### Separate the three layers

| Layer | Question | Driver for Afterwave |
|---|---|---|
| **Holding (investor) entity** | Whose shares do investors buy? | YC: US (Delaware), Cayman or Singapore parent. US seed funds: Delaware C-corp. Dutch and many EU funds: a BV is fine |
| **Operating entity** | Who employs the team and owns or licenses the IP? | Where the founders and first hires live and work; grants follow it |
| **Contracting entity** | Who signs with customers? | EU test labs often prefer an EU counterparty for on-prem software, data processing and liability |

### The structures that fit

| Structure | When it fits | Main costs |
|---|---|---|
| **Dutch BV only** (with founder holding BVs, STAK) | No YC, Dutch or EU seed lead | Cheapest; a flip later if a US lead arrives (fc08-l06) |
| **Delaware parent + Dutch BV subsidiary** | YC or a US lead, team stays in the Netherlands | Two jurisdictions: US tax filings, franchise tax, intercompany agreement and transfer pricing; keeps WBSO through the Dutch payroll |
| **Delaware parent + Swiss subsidiary (GmbH or AG)** | YC or US lead, team moves to Zurich | Swiss salaries and notarial costs; Swiss capital paid in (GmbH CHF 20,000 fully; AG CHF 100,000 with at least 20 % per share and CHF 50,000); WBSO lost |
| **Swiss AG only** | Swiss lead investor, team in Zurich, no YC | AG capital; a flip if US money comes later |

In a parent-subsidiary set-up the subsidiary typically performs R&D and other services for the parent and invoices **cost plus a markup**, so it shows a small taxable profit locally; the IP is either kept in the subsidiary and licensed up, or owned by the parent. Both must be documented and priced at arm's length, which is a tax adviser's job.

### Getting to a Delaware parent

Two starting points:`,
        },
        {
          kind: "flow",
          title: "If nothing is incorporated yet: Delaware first",
          steps: [
            { label: "Incorporate Delaware C-corp", detail: "Founder stock at low par, vesting, 83(b) elections within 30 days where US tax applies" },
            { label: "IP assignment to the parent", detail: "All founder and contractor work to date assigned" },
            { label: "Set up the operating subsidiary", detail: "Dutch BV (notarial deed, KVK) or Swiss GmbH/AG (notary, capital deposit, commercial register)" },
            { label: "Intercompany agreement", detail: "Subsidiary performs R&D for the parent at cost plus a markup" },
            { label: "Sign YC SAFEs with the parent", detail: "Then seed SAFEs or a priced round in the parent" },
          ],
          caption: "Cheaper and cleaner than a flip, because there are no existing shareholders or contracts to move.",
        },
        {
          kind: "md",
          md: md`**If a Dutch BV already exists**, it is a **flip**: a Delaware parent issues its shares to the BV's shareholders in exchange for their BV shares, 1:1 in proportion, and the BV becomes a 100 % subsidiary. Consents, any convertible loans, option plans, existing pilot contracts and the IP location all have to be handled, and the Dutch tax treatment of the share exchange must be cleared by an adviser first (fc08-l06 walks through it).

### Talent and cost

- **Netherlands:** the Brainport region around Eindhoven (high-tech equipment, lighting, semiconductors, automotive) and Delft have deep test and systems engineering talent; recognised sponsors can hire non-EU specialists through the highly skilled migrant route.
- **Zurich:** ETH Zurich and its robotics spin-offs make it one of Europe's strongest robotics and ML talent pools. Salaries and living costs are markedly higher than in the Netherlands, and hiring non-EU/EFTA nationals is subject to permits and quotas.
- **Delaware is only a legal home:** nobody needs to live there. A US presence for YC is about San Francisco for the batch and US customers later, not Delaware.`,
        },
        { kind: "equation", formula: "aw14-net-team-cost" },
        {
          kind: "md",
          md: md`### Grants and incentives follow the employing entity

| Programme | Who is eligible (as researched) | Key 2026 numbers | Keeps it? |
|---|---|---|---|
| **WBSO** (NL R&D payroll tax credit) | Employers withholding Dutch wage tax for staff doing S&O work; a Dutch BV under a Delaware parent can qualify | 36 % of S&O wage base up to EUR 391,020 (**50 % for starters**), 16 % above | Dutch subsidiary: yes. Zurich team: no |
| **Innovatiekrediet** (NL innovation loan) | Companies established in the Netherlands with a technically risky project and market plan | Up to 45 % of project costs for small firms; project minimum EUR 150k; first-come-first-served until 31 Dec 2026 | Dutch subsidiary: likely, check |
| **EIC Accelerator** (EU) | SMEs established in an EU member state or associated country | Grant up to EUR 2.5m plus EUR 1 to 10m equity; October 2025 cut-off: 121 of 923 interviewed, 61 funded | Check effect of a US parent |
| **Innosuisse** (Swiss Innovation Agency) | Swiss-based companies and research partners | Not researched for 2026 | Zurich team only |`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "What is not verified",
          md: md`- **Innosuisse:** its current programmes, eligibility for start-ups without a Swiss research partner, and the status of Swiss participation in EU instruments such as the EIC were **not verified** in the course research. Ask Innosuisse and a Swiss adviser directly.
- **EIC with a US parent:** whether control by a non-EU parent affects eligibility or the equity component is **unverified**; read the current EIC work programme before planning on it. The first 2027 cut-off (reportedly 7 January 2027) is unverified.
- **WBSO starter status inside a group** and the exact S&O wage base rules: confirm with RVO or an adviser. The model here uses the loaded salary of R&D staff as a simplification.
- **Innovatiekrediet** 2026 budget (EUR 50m vs EUR 70m) is unverified.
- **YC jurisdictions:** reported as US (Delaware), Cayman and Singapore since January 2026.`,
        },
        { kind: "sources", refs: ["aw14-r6", "aw14-r7", "aw14-r8", "aw14-r9", "aw14-r10"] },
      ],
    },
    {
      layer: "applied",
      title: "Netherlands or Zurich for the first team",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Net team cost and runway: Dutch BV vs Zurich subsidiary (illustrative)",
          given: md`Illustrative assumptions only; replace with real salary data and adviser input. Delaware parent either way. Team of **6** (4 in R&D). Average fully loaded cost per head: **EUR 95k** in the Netherlands, **EUR 150k** in Zurich (CHF converted at an assumed rate). Other costs (cloud, rigs, travel, legal, YC batch costs) **EUR 300k/yr** in both. WBSO starter rate 50 % on an S&O wage base equal to the R&D staff's loaded cost. Cash after the seed: **EUR 3.0m**.`,
          steps: [
            { md: md`**Netherlands gross team cost:** $6\times95 =$ EUR 570k. S&O base $S = 4\times95 =$ EUR 380k $< 391{,}020$, so $W = 0.50\times380 =$ EUR 190k.` },
            { md: md`**Netherlands net:** $570 - 190 =$ EUR 380k; total burn $380 + 300 =$ EUR 680k/yr.` },
            { md: md`**Zurich:** $6\times150 =$ EUR 900k, no WBSO; total burn $900 + 300 =$ EUR 1.2m/yr.` },
            { md: md`**Runway:** Netherlands $3.0/0.68 = 4.4$ years (53 months); Zurich $3.0/1.2 = 2.5$ years (30 months).` },
            { md: md`**What Zurich must buy to be worth it:** about EUR 520k a year of extra cost. It is worth it only if it brings something the plan needs that the Netherlands cannot: specific robotics or ML hires, a Swiss lead investor, or customers. Write that reason down.` },
          ],
          result: md`On these illustrative numbers the Netherlands buys **23 more months** of runway for the same seed. Zurich can still be right, but as a decision about talent or investors with a price tag, not a default. A middle path is a Dutch operating BV now and a small Swiss subsidiary for specific hires later.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "WBSO when the S&O base crosses the first bracket",
          given: md`Illustrative. The Dutch BV is a starter and its S&O wage base is **EUR 450,000** in 2026.`,
          steps: [
            { md: md`First bracket: $0.50\times391{,}020$.` },
            { md: md`= **EUR 195,510**.`, hidden: true, check: { prompt: "First-bracket benefit (EUR)", answer: 195510, unit: "EUR", tolerance: { abs: 5 } } },
            { md: md`Second bracket: $0.16\times(450{,}000 - 391{,}020) = 0.16\times58{,}980$.` },
            { md: md`= **EUR 9,437**; total **EUR 204,947**.`, hidden: true, check: { prompt: "Total WBSO benefit (EUR)", answer: 204947, unit: "EUR", tolerance: { abs: 10 } } },
          ],
          result: md`Above the first bracket the marginal benefit drops from 50 % to 16 %, so WBSO matters most for exactly Afterwave's stage: the first few R&D hires.`,
        },
        {
          kind: "question",
          question: {
            id: "aw14-l04-p1",
            type: "decision",
            prompt: md`Afterwave is accepted into W27. The three founders live in the Netherlands, nothing is incorporated yet, and one founder argues for incorporating a Swiss AG "because we are moving to Zurich anyway". What structure do you set up now?`,
            options: [
              { text: "Swiss AG now, flip to Delaware later.", score: 0.2, feedback: "YC needs an eligible parent before its SAFEs are signed; incorporating an AG first means paying in AG capital and then flipping straight away." },
              { text: "Delaware C-corp parent now (YC SAFEs signed there), with a Dutch BV subsidiary employing the team; add a Swiss subsidiary only when Zurich hires are actually planned.", score: 1, feedback: "Meets YC's requirement without a flip, keeps WBSO for the first R&D hires, and keeps the Zurich option open at low cost." },
              { text: "Dutch BV only; YC will accept it.", score: 0, feedback: "Not an eligible jurisdiction as reported; it would force a flip under time pressure." },
              { text: "Delaware C-corp only, everyone employed as contractors.", score: 0.4, feedback: "Meets YC's need but loses WBSO and creates employment and IP risk for contractors in the Netherlands." },
            ],
            explanation: md`Holding layer for investors (Delaware), operating layer where the team actually is (Netherlands), and a cheap path to Zurich later.`,
            concepts: ["aw14.parent-sub-structure", "aw14.grant-eligibility"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Doing the setup",
      blocks: [
        {
          kind: "md",
          md: md`### Who does what, and in what order

1. **Before any incorporation:** decide the founder split and vesting (Founder Core, fc08-l04), and who will be employed where.
2. **US counsel** (startup practice familiar with YC documents): Delaware incorporation, founder stock purchase agreements, IP assignment, option plan, 83(b) elections for any founder subject to US tax.
3. **Dutch notary and tax adviser:** BV incorporation by notarial deed and KVK registration, intercompany agreement (cost plus), payroll registration, WBSO application **before** the first R&D period.
4. **Swiss notary and bank** (only when Zurich is real): capital deposit on a blocked account, deed, commercial register; check permits for any non-EU/EFTA hires.
5. **US accountant:** federal corporate return even with no revenue, reporting for a foreign-owned US corporation, Delaware franchise tax on the assumed par value capital method.
6. **Customers:** EU customers can contract with the Dutch BV (reseller or service agreement from the parent) if they prefer an EU counterparty.`,
        },
        { kind: "sources", refs: ["aw14-r15"] },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Incorporating where you might move**, not where you are: a Swiss AG for a team that is still in the Netherlands loses WBSO and adds AG capital for nothing.
- **Delaware without a European employer:** founders paid as contractors, no WBSO, and IP created by non-employees.
- **IP floating:** work done before incorporation never assigned to the company investors buy.
- **No intercompany agreement:** the subsidiary's costs and the parent's IP are undocumented, which a tax audit or diligence will find.
- **Moving the team after a WBSO approval** without telling RVO, or assuming Swiss hires count.
- **Treating EIC as runway:** low odds, months to award, and eligibility questions with a US parent.`,
        },
        {
          kind: "checklist",
          title: "Afterwave setup checklist (if accepted to YC)",
          items: [
            "Founder split, vesting and leaver terms agreed in writing",
            "Delaware C-corp incorporated with an eligible structure for YC",
            "IP assignment from every founder and contractor to the parent",
            "Dutch BV subsidiary incorporated; payroll and WBSO application filed before R&D starts",
            "Intercompany R&D agreement at cost plus, reviewed by a tax adviser",
            "83(b) elections filed within 30 days where relevant",
            "Delaware franchise tax filed on the assumed par value capital method",
            "Zurich: written reason (hires, investor, customers) and its cost before any Swiss entity",
          ],
        },
        {
          kind: "ask",
          title: "Questions for advisers",
          items: [
            "Can the Dutch BV keep WBSO starter status as a subsidiary of a newly formed Delaware parent?",
            "Which markup on the cost-plus intercompany agreement is defensible, and how is it documented?",
            "Should the IP sit in the parent from day one, or in the BV with a licence?",
            "What does EIC say about applicants controlled by a non-EU parent?",
            "For Zurich: which Innosuisse programmes fit a start-up without a Swiss research partner, and what permits would our first non-EU hire need?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw14-l04-p2",
            type: "short",
            prompt: md`Write Afterwave's **2027 entity and location plan** with two branches: (A) accepted into YC W27, (B) not accepted. For each: holding entity, operating entity and location, contracting entity for EU customers, grants kept or lost, first three setup steps with owners, and the trigger that would make you open a Zurich entity. Include an illustrative annual net team cost comparison.`,
            rubric: [
              "Branch A uses an eligible YC parent (Delaware) with a European operating subsidiary and explains why not a Swiss AG or Dutch BV alone",
              "Branch B keeps a Dutch BV (with holding BVs or STAK as needed) and states what would trigger a flip",
              "Grants are mapped to the employing entity (WBSO with a Dutch payroll; EIC and Innosuisse caveats marked unverified)",
              "Setup steps are ordered (founder terms and IP before money; WBSO before R&D period) with owners",
              "A specific, testable Zurich trigger (named hires, Swiss lead, customers) with its cost",
              "Illustrative net cost comparison with correct arithmetic and labelled assumptions",
            ],
            modelAnswer: md`**Branch A, accepted to W27:** holding entity Afterwave Inc. (Delaware); operating entity Afterwave BV (Netherlands, 100 % subsidiary) employing the team under a cost-plus R&D agreement; EU customers contract with the BV under a reseller licence from the parent. Grants: WBSO kept through the BV payroll (starter status to confirm); Innovatiekrediet possible for the Ripple project; EIC eligibility with a US parent unverified. Steps: (1) founder split, vesting, IP assignment, owner: CEO with US counsel, week 1; (2) Delaware incorporation and YC SAFEs, owner: CEO, week 1 to 2; (3) BV incorporation, payroll, WBSO application before the first R&D month, owner: CEO with Dutch notary and adviser, week 2 to 4.

**Branch B, not accepted:** Afterwave BV with three founder holding BVs and a STAK for future angels and employees. Flip trigger: a US lead investor or a later YC acceptance; it would follow fc08-l06 steps.

**Zurich trigger (both branches):** at least two signed offers to robotics or ML engineers who will only work in Zurich, or a Swiss lead investor requiring it. Then a Swiss GmbH subsidiary (CHF 20,000 paid in) for those hires only. Innosuisse fit to be checked (unverified).

**Illustrative cost:** 6 heads, 4 in R&D; NL EUR 95k loaded, Zurich EUR 150k. NL: $570 - 0.5\times380 = 380$ EUR k net; Zurich: 900 EUR k. With EUR 300k other costs, burn EUR 680k vs EUR 1.2m a year; on EUR 3m that is 53 vs 30 months of runway.`,
            explanation: md`A strong plan separates the holding, operating and contracting layers, ties grants to the employer, and turns Zurich into a decision with a trigger and a price.`,
            concepts: ["aw14.parent-sub-structure", "aw14.location-cost", "aw14.grant-eligibility"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to Ismail and Yusuf, without legal jargon, why Afterwave would be a Delaware company with a Dutch subsidiary if YC accepts it, and what moving the team to Zurich would cost and change.",
          keyPoints: [
            "Investors (YC) buy shares in an eligible parent; Delaware is a legal home, nobody has to live there",
            "The Dutch BV employs the team, does the R&D and invoices the parent cost plus a markup",
            "WBSO depends on Dutch payroll R&D staff; moving the team to Zurich loses it",
            "Zurich costs markedly more per head; it must buy specific talent, investors or customers",
            "Swiss entity capital: GmbH CHF 20,000 fully paid; AG CHF 100,000 with at least CHF 50,000 paid in",
            "Grant facts such as Innosuisse and EIC eligibility still need checking",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw14-l04-q1",
      type: "mcq",
      prompt: "Which layer of Afterwave's structure does YC's jurisdiction requirement apply to?",
      options: [
        "The entity that employs the team",
        "The entity whose shares investors hold (the parent)",
        "The entity that signs with customers",
        "All three must be in Delaware",
      ],
      answer: 1,
      explanation: md`YC invests in the parent. The team can be employed by a Dutch or Swiss subsidiary, and customers can contract with either.`,
      concepts: ["aw14.parent-sub-structure"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw14-l04-q2",
      type: "numeric",
      prompt: md`A starter Dutch BV has an S&O wage base of EUR 300,000 in 2026. What is its WBSO benefit (EUR)?`,
      answer: 150000,
      tolerance: { abs: 10 },
      unit: "EUR",
      explanation: md`$S < 391{,}020$, so $0.50\times300{,}000 = 150{,}000$ EUR.`,
      concepts: ["aw14.grant-eligibility"],
      difficulty: 1,
    },
    {
      id: "aw14-l04-q3",
      type: "numeric",
      prompt: md`Illustrative: a Zurich subsidiary for a 4-person team at EUR 150k loaded each, plus EUR 200k other costs. Cash EUR 2.0m. Runway in months (1 decimal)?`,
      answer: 30,
      tolerance: { abs: 0.2 },
      unit: "months",
      explanation: md`Burn $4\times150 + 200 = 800$ EUR k a year; $2.0/0.8 = 2.5$ years = 30 months.`,
      concepts: ["aw14.location-cost"],
      difficulty: 1,
    },
    {
      id: "aw14-l04-q4",
      type: "multi",
      prompt: "Which happen if Afterwave moves its whole R&D team from a Dutch BV to a Swiss subsidiary? (Select all.)",
      options: [
        "WBSO for those staff stops",
        "Loaded cost per head typically rises",
        "YC's SAFEs become invalid",
        "A Swiss notary, capital deposit and commercial register entry are needed",
        "Innosuisse may become relevant (programmes to be checked)",
      ],
      answer: [0, 1, 3, 4],
      explanation: md`The SAFEs sit in the parent and are unaffected by where the subsidiary is.`,
      concepts: ["aw14.grant-eligibility", "aw14.location-cost"],
      difficulty: 2,
    },
    {
      id: "aw14-l04-q5",
      type: "mcq",
      prompt: "Nothing is incorporated yet and YC has accepted Afterwave. Why is 'Delaware first' cheaper than a BV followed by a flip?",
      options: [
        "Delaware has no taxes",
        "There are no existing shareholders, convertible loans or contracts to move, and no Dutch share-exchange tax question",
        "A BV cannot have a foreign parent",
        "YC pays for the Delaware incorporation",
      ],
      answer: 1,
      explanation: md`A flip is a transaction with consents, tax clearance and contract moves; starting with the parent avoids it.`,
      concepts: ["aw14.parent-sub-structure"],
      difficulty: 2,
    },
    {
      id: "aw14-l04-q6",
      type: "numeric",
      prompt: md`Minimum paid-in capital to form a Swiss GmbH (CHF)?`,
      answer: 20000,
      tolerance: { abs: 1 },
      unit: "CHF",
      explanation: md`GmbH: CHF 20,000, fully paid in (Art. 773 and 777c CO). An AG needs CHF 100,000 capital with at least CHF 50,000 paid in.`,
      concepts: ["aw14.parent-sub-structure"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "aw14-l04-f1", front: "Three layers of structure", back: "Holding (where investors hold shares), operating (who employs and does R&D), contracting (who signs with customers).", concepts: ["aw14.parent-sub-structure"] },
    { id: "aw14-l04-f2", front: "Afterwave structure if YC accepts", back: "Delaware C-corp parent; Dutch BV subsidiary employing the team on a cost-plus R&D agreement; Swiss subsidiary only for planned Zurich hires.", concepts: ["aw14.parent-sub-structure"] },
    { id: "aw14-l04-f3", front: "WBSO 2026", back: "36 % up to EUR 391,020 of S&O wage base (50 % for starters), 16 % above; needs Dutch payroll; apply before the period.", concepts: ["aw14.grant-eligibility"] },
    { id: "aw14-l04-f4", front: "Net team cost", back: "$C_{net} = \\sum n_i c_i - W$; compare locations on net cost and the runway it buys.", concepts: ["aw14.location-cost"] },
    { id: "aw14-l04-f5", front: "Innosuisse status in this course", back: "Unverified: programmes and start-up eligibility, and Swiss access to EIC, must be checked directly.", concepts: ["aw14.grant-eligibility"] },
    { id: "aw14-l04-f6", front: "Zurich as a decision", back: "Worth its extra cost only for named hires, a Swiss lead investor or customers; write the trigger and price.", concepts: ["aw14.location-cost"] },
  ],
};

export default lesson;
