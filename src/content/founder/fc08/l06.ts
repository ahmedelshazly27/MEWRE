import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc08-l06",
  title: "Entities and structures: Netherlands, Delaware, Switzerland, Kuwait",
  summary:
    "Dutch legal forms (eenmanszaak, VOF, BV, stichting), the STAK for pooling employees and angels, holding structures, the Delaware C-corp and the flip, Swiss GmbH and AG for a Zurich option, and Kuwait's foreign ownership rules (51 % default, KDIPA route), with what is and is not verified.",
  minutes: 80,
  objectives: [
    "Choose a legal form for each venture stage and explain the liability and fundraising consequences",
    "Explain how a STAK separates voting from economic rights and when to use one",
    "Describe a Delaware flip step by step, with its tax and IP questions",
    "State the Swiss GmbH and AG capital rules and why VC-backed Swiss start-ups use the AG",
    "Explain Kuwait's 51 % rule and the KDIPA 100 % route, and what must be confirmed with Kuwaiti counsel",
  ],
  concepts: [
    { id: "fc08.nl-entities", name: "Dutch legal forms", description: "Eenmanszaak and VOF (no separate legal personality, unlimited personal liability), BV (limited liability company, flex-BV since 2012), stichting (foundation without members).", competency: "fc-legal" },
    { id: "fc08.stak", name: "STAK (stichting administratiekantoor)", description: "A foundation that holds shares and issues depositary receipts, so holders get the economics while the STAK board votes; used to pool employees and small investors.", competency: "fc-legal", related: ["fc08.nl-entities", "fc08.cap-table"] },
    { id: "fc08.delaware-flip", name: "Delaware C-corp and the flip", description: "Creating a Delaware parent whose shares are exchanged for the existing company's shares, so the operating company becomes a subsidiary; the default structure for US venture investors and YC.", competency: "fc-legal", related: ["fc08.post-money-safe"] },
    { id: "fc08.swiss-entities", name: "Swiss GmbH and AG", description: "GmbH: CHF 20,000 fully paid; AG: CHF 100,000 with at least 20 % per share and CHF 50,000 paid in; both by notarial deed and commercial register entry.", competency: "fc-legal" },
    { id: "fc08.kuwait-ownership", name: "Kuwait foreign ownership", description: "Default requirement of 51 % Kuwaiti ownership for companies; up to 100 % foreign ownership with a KDIPA licence under Law 116 of 2013 outside the negative list; branches without a local agent since Law 1 of 2024.", competency: "fc-legal" },
  ],
  sections: [
    {
      layer: "theory",
      title: "Legal forms and the structures founders build from them",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You run ventures in the Netherlands and Kuwait, with Afterwave weighing YC (which funds Delaware, Cayman or Singapore companies) and a possible Zurich base. The entity you pick decides your personal liability, which investors can fund you without restructuring, how you give equity to employees, and whether you can own a Kuwaiti company at all. Restructuring later costs legal fees, tax risk and investor consents, so the first choice should anticipate the second.`,
        },
        {
          kind: "md",
          md: md`### Dutch legal forms

| Form | Legal personality | Liability | Equity for investors | Typical use |
|---|---|---|---|---|
| **Eenmanszaak** (sole proprietorship) | No | Unlimited, personal | None | Freelance or testing an idea; income taxed in box 1 with entrepreneur deductions if the hours criterion is met |
| **VOF** (general partnership) | No | Unlimited, joint and several for all partners | None (no shares) | Two or more people trading together; unsuitable once there is real risk or outside money |
| **BV** (besloten vennootschap) | Yes | Limited to the company's assets (exceptions for directors: improper management in bankruptcy, certain unpaid taxes) | Shares, classes, options | Any venture that will hire, sign enterprise contracts or raise money |
| **Stichting** (foundation) | Yes | Limited | None (no members or shareholders) | Non-profits; the STAK |

**The BV after the 2012 flex-BV reform:** minimum capital is effectively **EUR 0.01** (it used to be EUR 18,000). Incorporation is by **notarial deed** executed by a Dutch civil-law notary, followed by registration with the **KVK**. The BV must keep a **shareholders' register**; issuing and transferring shares also requires a notarial deed. Distributions to shareholders require a balance-sheet test and a liquidity test signed off by the directors. Corporate income tax is levied at a lower rate on the first slice of profit and a higher rate above it (19 % up to EUR 200,000 and 25.8 % above in the 2023 to 2025 schedules; check the current year).

### Holding structures

Founders commonly hold their shares through a **personal holding BV**:`,
        },
        {
          kind: "flow",
          title: "Typical Dutch founder structure (illustrative)",
          steps: [
            { label: "Founder", detail: "Natural person; box 2 tax when the holding pays out" },
            { label: "Personal holding BV", detail: "One per founder; receives dividends and sale proceeds largely tax-free under the participation exemption" },
            { label: "Operating BV (e.g. Afterwave BV)", detail: "Contracts, IP, employees, investors' shares" },
            { label: "STAK", detail: "Holds shares for employees and small angels; issues depositary receipts" },
          ],
          caption: "The holding lets a founder reinvest sale proceeds before personal tax. Set it up before shares are issued: moving shares into a holding later can be a taxable transfer.",
        },
        {
          kind: "md",
          md: md`### The STAK

A **stichting administratiekantoor** holds legal title to shares in the operating BV and issues **depositary receipts** (certificaten) to the beneficiaries. The receipt holder gets the economics (dividends, sale proceeds); the STAK board exercises the votes. Why founders use it:

- **One line in the register** instead of twenty employees and angels; one signature at the notary in every future round.
- **Voting stays concentrated** while economics are shared.
- **Employee equity without making every employee a shareholder** with statutory meeting rights.

For tax, receipt holders are generally treated as if they held the shares directly (box 2 or box 3 depending on the size of the interest), but that depends on how the STAK's terms are drafted, so the documents must be checked by a tax adviser.

### Delaware C-corp and the flip

US venture investors, YC and most US acquirers expect a **Delaware C-corporation**: settled corporate case law, standard NVCA and YC documents, and US-style option plans. A non-US company gets there by a **flip**:`,
        },
        {
          kind: "flow",
          title: "A Dutch-to-Delaware flip",
          steps: [
            { label: "Incorporate Delaware parent", detail: "Authorised shares, low par value, board, bylaws" },
            { label: "Share exchange", detail: "All BV shareholders contribute their BV shares and receive parent shares in the same proportions" },
            { label: "BV becomes a subsidiary", detail: "Keeps Dutch employees, contracts and (initially) IP; parent owns 100 %" },
            { label: "IP decision", detail: "Leave IP in the BV with a licence, or transfer it at arm's-length value (tax)" },
            { label: "Ongoing", detail: "Intercompany agreement and transfer pricing, US and Dutch filings, Delaware franchise tax, 409A valuations" },
          ],
          caption: "Ownership percentages do not change in a 1:1 exchange; the costs are legal fees, tax structuring and two jurisdictions' compliance forever after.",
        },
        {
          kind: "md",
          md: md`### Switzerland: GmbH or AG for a Zurich option

| | GmbH | AG |
|---|---|---|
| Minimum capital | CHF 20,000 | CHF 100,000 |
| Paid in at incorporation | 100 % | At least 20 % of each share and at least CHF 50,000 in total |
| Formation | Notarial deed and commercial register entry | Notarial deed and commercial register entry |
| Shareholders | Members are entered in the commercial register (public); transfers need a written agreement and usually members' approval | Shareholders are not public; registered shares transfer by assignment, under the articles' restrictions |
| Fit for VC | Possible, but awkward for many investors and option plans | The usual choice for VC-backed start-ups |

Notarial fees in the canton of Zurich are higher than in Zug or Schwyz.

### Kuwait

- **Default:** the Commercial Law (Decree-Law 68 of 1980, Art. 23) requires **51 % Kuwaiti ownership** of companies.
- **100 % foreign ownership** is possible with an investment licence from **KDIPA** under the **Direct Investment Promotion Law (Law 116 of 2013)**, in activities not on the negative list.
- **Law 1 of 2024** amended Art. 24 of the Commercial Law so that foreign companies can open **branches without a local agent**. It does **not** remove the 51 % rule for incorporating a company.
- The Companies Law (Law 1 of 2016) was last amended by Decree-Law 106 of 2024; a further reform initiative to attract foreign investment was announced in November 2025.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "What the course research could and could not verify",
          md: md`- **Kuwait:** the 51 % rule, the KDIPA route, Law 1 of 2024 and Decree-Law 106 of 2024 come from law-firm summaries (Al Tamimi, Chambers), not the gazetted texts; kdipa.gov.kw could not be opened. Whether the November 2025 Companies Law reform had been **enacted by November 2026 is unverified**. The current negative list, minimum investment and licensing conditions must be confirmed with Kuwaiti counsel and KDIPA before Mizan chooses a structure.
- **Switzerland:** capital rules are from secondary summaries of the Code of Obligations (Art. 621, 632, 773, 777c); confirm with a Swiss notary.
- **YC jurisdictions:** US (Delaware), Cayman and Singapore after Canada was reportedly dropped in January 2026; a reversal was reported but not confirmed.
- **Dutch flip tax:** whether founders can exchange BV shares for Delaware shares without immediate Dutch tax (share-merger roll-over relief) depends on conditions that must be checked by a Dutch tax adviser for the specific transaction.`,
        },
        { kind: "sources", refs: ["fc08-r8", "fc08-r9", "fc08-r10", "fc08-r11", "fc08-r12", "fc08-r13", "fc08-r14", "fc08-r15", "fc08-r16"] },
        {
          kind: "matrix",
          title: "Where each structure sits",
          xAxis: ["Low set-up and running cost", "High set-up and running cost"],
          yAxis: ["Hard to fund", "Ready for venture investors"],
          cells: [
            { label: "Dutch BV (+ STAK)", detail: "Days to set up via a notary; fine for Dutch and most European investors" },
            { label: "Delaware C-corp (with Dutch or Swiss subsidiary), Swiss AG", detail: "What YC and US funds expect; two-country compliance" },
            { label: "Eenmanszaak, VOF", detail: "Cheap, unlimited liability, no shares to sell" },
            { label: "Kuwaiti company with a 51 % local shareholder", detail: "Needed for some local activities; hard for foreign VCs unless KDIPA licensed or held below a foreign parent" },
          ],
          caption: "Start where your first investors are, and move up and right only when an investor or market pays for the extra cost.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Structuring Afterwave and Mizan",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Flipping Afterwave to Delaware after a Dutch seed",
          given: md`**Illustrative.** Afterwave BV has the post-seed table of Lesson 1 (13,888,889 shares: founders 72 %, pool 8 %, seed 20 %). It wants a Delaware parent for a US round. The parent authorises 20,000,000 common shares with a par value of USD 0.00001 and issues 13,888,889 in a 1:1 exchange. Its gross assets at year-end are USD 2,000,000.`,
          steps: [
            { md: md`**Exchange:** each BV share becomes one parent share. Ownership is unchanged: CEO 28.8 %, seed 20 %. The BV is now 100 % owned by the parent.` },
            { md: md`**Consents:** the seed investor's protective provisions and the BV's articles normally require its approval; its preferred rights must be recreated in the Delaware charter. Option holders' grants are replaced by parent options.` },
            { md: md`**Delaware franchise tax, authorised shares method** (Delaware schedule; check the current rates): USD 250 for the first 10,000 shares plus USD 85 per further 10,000: $250 + 85\times\lceil(20{,}000{,}000 - 10{,}000)/10{,}000\rceil = 250 + 85\times1{,}999 = $ **USD 170,165**.` },
            { md: md`**Assumed par value capital method:** assumed par $= \text{gross assets}/\text{issued shares} = 2{,}000{,}000/13{,}888{,}889 = $ USD 0.144 per share; assumed par value capital $= 0.144\times20{,}000{,}000 = $ USD 2.88 m; tax at USD 400 per USD 1 m or part of it $= 3\times400 = $ **USD 1,200**.` },
            { md: md`**IP:** the BV owns the software and test know-how. Option 1: keep it in the BV and license it to the parent (transfer pricing documentation). Option 2: transfer it to the parent at arm's-length value, which can trigger Dutch tax on the gain. Decide with a tax adviser before signing the exchange.` },
          ],
          result: md`The flip does not change who owns what, but it adds a permanent second jurisdiction. The franchise tax example shows why you always file on the assumed par value method: the default authorised-shares invoice Delaware sends can be more than a hundred times larger.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Swiss paid-in capital and a Kuwaiti 51 % split",
          given: md`**Illustrative.** (1) A Zurich AG with share capital CHF 250,000. (2) A larger AG with share capital CHF 400,000. (3) A Kuwaiti company for Mizan's local distribution business that is not KDIPA licensed, with a foreign holding company holding the maximum permitted stake, distributes KWD 100,000 in profit pro rata to shareholdings.`,
          steps: [
            { md: md`AG minimum paid in $= \max(20\%\times\text{capital},\ \text{CHF }50{,}000)$.` },
            { md: md`(1) $\max(50{,}000,\ 50{,}000) = $ **CHF 50,000**.`, hidden: true, check: { prompt: "Minimum paid-in capital, CHF 250,000 AG (CHF)", answer: 50000, unit: "CHF", tolerance: { abs: 1 } } },
            { md: md`(2) $\max(80{,}000,\ 50{,}000) = $ **CHF 80,000**.`, hidden: true, check: { prompt: "Minimum paid-in capital, CHF 400,000 AG (CHF)", answer: 80000, unit: "CHF", tolerance: { abs: 1 } } },
            { md: md`(3) Foreign holding at most 49 %: $0.49\times100{,}000 = $ **KWD 49,000**; the Kuwaiti shareholders receive KWD 51,000.`, hidden: true, check: { prompt: "Distribution to the foreign holding (KWD)", answer: 49000, unit: "KWD", tolerance: { abs: 1 } } },
          ],
          result: md`A GmbH would need CHF 20,000 fully paid. In Kuwait, arrangements that shift the economics away from the 51 % holder by side agreement are legally risky and may be unenforceable; the clean routes are a KDIPA licence, a branch where the activity allows it, or a commercial agency or distribution agreement with a Kuwaiti partner. Confirm with Kuwaiti counsel.`,
        },
        {
          kind: "question",
          question: {
            id: "fc08-l06-p1",
            type: "mcq",
            prompt: "Afterwave has 14 angels and 9 employees who should all get small equity stakes, and the founders want future rounds to need few signatures. Which Dutch structure fits best?",
            options: [
              "Make all 23 direct shareholders of the BV",
              "Issue depositary receipts through a STAK that holds their shares, with a STAK board appointed by the founders and investors",
              "Convert the BV into a VOF",
              "Give each of them a personal holding BV",
            ],
            answer: 1,
            explanation: md`A STAK gives all 23 the economics through receipts, keeps one line in the shareholders' register and one signature at the notary, and keeps voting concentrated. Direct holdings make every resolution and deed a 23-party exercise.`,
            concepts: ["fc08.stak"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Getting structure right the first time",
      blocks: [
        {
          kind: "md",
          md: md`### Who does what

- **Netherlands:** a civil-law notary (incorporation, deeds, articles), a corporate lawyer (shareholders' agreement, STAK terms), a tax adviser (holding structure, option plan, flip). A BV can be incorporated within days once the notary has identification and the articles.
- **Delaware:** US counsel (charter, bylaws, exchange agreement, option plan), a registered agent in Delaware, a 409A valuation provider, and both US and Dutch tax advisers for the flip.
- **Switzerland:** a notary in the chosen canton, a bank for the capital deposit (blocked account until registration), the commercial register.
- **Kuwait:** the Ministry of Commerce and Industry, KDIPA for a licence, and Kuwaiti counsel. For public tenders, check registration and local-content rules early (Track 0 covers procurement).

### What goes wrong

- **Delaware too early**, with no US investors or customers in sight: two jurisdictions of cost for nothing.
- **Flip after a Dutch priced round**: every investor must consent and preferred rights must be rebuilt in US documents.
- **IP in the wrong place**: in a founder's name, in a university or employer, or stranded in a subsidiary after a flip.
- **Twenty direct small shareholders** before anyone thought of a STAK.
- **Holding BV set up after shares were issued**, making the transfer into it taxable.
- **Kuwait nominee or side arrangements** to get around the 51 % rule.`,
        },
        { kind: "xref", to: "m11-l01", note: "Kuwait's public tendering framework and CAPT, relevant if Mizan sells to MEWRE, KISR or other government buyers." },
        {
          kind: "checklist",
          title: "Entity decision checklist",
          items: [
            "Where are the first investors (Dutch angels, EU funds, YC or US funds)?",
            "Where are the first customers and employees?",
            "Personal holding BVs in place before founder shares are issued",
            "STAK or virtual shares for small holders",
            "If a flip is likely within 12 months: is it cheaper to start with a Delaware parent and a Dutch subsidiary?",
            "IP owned by the company that investors will buy into",
            "Kuwait: licence route confirmed with counsel before any local partner agreement is signed",
          ],
        },
        {
          kind: "ask",
          title: "Questions for your advisers",
          items: [
            "If we flip in a year, what will it cost and which taxes could arise for the founders and the BV?",
            "Should the IP sit in the parent or the operating company, and how is it priced?",
            "How must the STAK conditions be drafted so receipt holders are taxed as direct holders?",
            "For Mizan's activities, are we on the KDIPA negative list, and what are the licence conditions?",
            "Can a branch without a local agent carry out our intended activity in Kuwait?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc08-l06-p2",
            type: "short",
            prompt: md`Write a one-page **entity structure memo for Afterwave** that covers: the structure you would use today, what triggers a Delaware flip (or a Zurich AG), how employees and small angels hold equity, where the IP sits, and the three questions you will put to a Dutch tax adviser. Keep facts you are unsure of marked as to be confirmed.`,
            rubric: [
              "Recommends a concrete current structure (e.g. Dutch BV with founder holding BVs and a STAK) and justifies it with the investor and customer base",
              "Names specific triggers for a Delaware flip (YC acceptance, US lead investor) or a Swiss AG (Zurich base), with the consequence for documents and consents",
              "Employee and angel equity via STAK or virtual shares, with the reason",
              "IP ownership addressed: assigned to the company now, and what happens to it in a flip",
              "Three specific tax questions (holding timing, flip roll-over, option regime or IP transfer)",
              "Uncertain facts (YC jurisdictions, flip tax treatment, 2027 option rules) marked as to be confirmed",
            ],
            modelAnswer: md`**Afterwave structure memo (draft, to confirm with advisers)**

**Today:** Afterwave BV (Netherlands), owned by three personal holding BVs set up before founder shares are issued. Reason: Dutch team, Dutch and EU first customers and angels, quick and cheap notarial incorporation, limited liability for enterprise pilots.

**Equity for others:** a STAK holds shares for employees and angels below a threshold and issues depositary receipts; the STAK board is appointed by the founders (and later the lead investor). One line in the register, one notary signature per round.

**IP:** every founder and contractor assigns IP to Afterwave BV now (Lesson 7). In a flip, the IP stays in the BV under a licence to the parent unless the tax adviser recommends a transfer.

**Flip trigger:** acceptance into YC (which funds US Delaware, Cayman or Singapore companies, to be confirmed for W27) or a US lead investor. Then: Delaware parent, 1:1 share exchange, BV as subsidiary, YC SAFEs signed with the parent, 83(b) where relevant. **Zurich AG** only if the team and first customers move there; a Swiss subsidiary is the cheaper first step.

**Questions for the tax adviser:** (1) Can the founders' holding BVs exchange BV shares for Delaware shares without immediate Dutch tax, and on what conditions? (2) IP in the BV with a licence, or transfer at arm's-length value: which is cheaper over five years? (3) Does our option plan qualify under the 2027 start-up option regime if it is enacted, and should we grant now or wait?`,
            explanation: md`A strong memo gives a decision now, the event that would change it, and the open questions with owners, rather than a survey of every possible structure.`,
            concepts: ["fc08.nl-entities", "fc08.stak", "fc08.delaware-flip"],
            difficulty: 2,
          },
        },
        { kind: "scenario", scenario: "fc08-s3" },
        {
          kind: "feynman",
          prompt: "Explain to Omar Abu Harb, in plain terms, the options for owning Mizan's Kuwaiti operating business and what you still need to confirm.",
          keyPoints: [
            "Default: a Kuwaiti company needs 51 % Kuwaiti ownership",
            "A KDIPA licence under Law 116/2013 can allow up to 100 % foreign ownership outside the negative list",
            "Since Law 1/2024 foreign companies can open branches without a local agent, but that does not remove the 51 % rule for companies",
            "Side agreements shifting economics away from the 51 % holder are risky",
            "Negative list, licence conditions and any 2025-26 Companies Law changes must be confirmed with Kuwaiti counsel",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "fc08-l06-q1",
      type: "mcq",
      prompt: "What is the minimum share capital of a Dutch BV since the 2012 flex-BV reform?",
      options: ["EUR 18,000", "EUR 0.01 (effectively no minimum)", "EUR 1,000", "EUR 20,000"],
      answer: 1,
      explanation: md`The EUR 18,000 minimum was abolished in 2012; incorporation still requires a notarial deed and KVK registration.`,
      concepts: ["fc08.nl-entities"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc08-l06-q2",
      type: "multi",
      prompt: "Which statements about a STAK are correct? (Select all.)",
      options: [
        "It is a foundation that holds legal title to shares",
        "It issues depositary receipts that carry the economic rights",
        "Receipt holders vote directly at the shareholders' meeting",
        "It reduces the number of parties needed at the notary for future rounds",
        "It removes the need for a shareholders' register",
      ],
      answer: [0, 1, 3],
      explanation: md`The STAK board votes, not the receipt holders. The BV still keeps a shareholders' register, with the STAK as one holder.`,
      concepts: ["fc08.stak"],
      difficulty: 1,
    },
    {
      id: "fc08-l06-q3",
      type: "order",
      prompt: "Order the steps of a Dutch-to-Delaware flip.",
      items: [
        "Incorporate the Delaware parent",
        "Obtain investor and shareholder consents",
        "Exchange BV shares for parent shares in the same proportions",
        "Replace option grants with parent options and file 83(b) elections where relevant",
        "Put an intercompany IP licence or transfer in place",
      ],
      explanation: md`Parent first, consents before the exchange, then the exchange itself, then the equity plans and the IP arrangements that make the new structure work. In practice the IP decision is planned before the exchange and documented right after.`,
      concepts: ["fc08.delaware-flip"],
      difficulty: 2,
    },
    {
      id: "fc08-l06-q4",
      type: "numeric",
      prompt: md`A Swiss AG is formed with CHF 120,000 share capital. What is the minimum amount that must be paid in at incorporation? (CHF)`,
      answer: 50000,
      tolerance: { abs: 1 },
      unit: "CHF",
      explanation: md`$\max(20\%\times120{,}000,\ 50{,}000) = \max(24{,}000,\ 50{,}000) = $ CHF 50,000.`,
      concepts: ["fc08.swiss-entities"],
      difficulty: 1,
    },
    {
      id: "fc08-l06-q5",
      type: "mcq",
      prompt: "What did Kuwait's Law No. 1 of 2024 change, according to the law-firm summaries in the course research?",
      options: [
        "It abolished the 51 % Kuwaiti ownership rule for all companies",
        "It allowed foreign companies to open branches without a local agent, without removing the 51 % rule for incorporation",
        "It created KDIPA",
        "It replaced the Companies Law of 2016",
      ],
      answer: 1,
      explanation: md`Law 1/2024 amended Art. 24 of the Commercial Law (branches without a local agent). KDIPA's route to 100 % ownership comes from Law 116/2013.`,
      concepts: ["fc08.kuwait-ownership"],
      difficulty: 2,
    },
    {
      id: "fc08-l06-q6",
      type: "decision",
      prompt: md`Two Dutch friends want to start trading Mizan hardware imports quickly and propose a VOF "to keep it simple". A first order would carry warranty obligations to a customer. What do you advise?`,
      options: [
        { text: "VOF is fine for now.", score: 0.1, feedback: "In a VOF both partners are personally, jointly and severally liable for everything, including warranty claims." },
        { text: "Incorporate a BV (with holding BVs if they plan to keep it), because limited liability matters as soon as there are warranty and supply obligations, and a BV can take investors later.", score: 1, feedback: "Correct: the cost of a BV is small compared with unlimited personal liability on hardware warranties." },
        { text: "Trade as an eenmanszaak in one friend's name.", score: 0.2, feedback: "Same unlimited liability, now on one person, and no clean way to share ownership." },
      ],
      explanation: md`Unlimited liability forms suit low-risk solo work. Hardware supply with warranties is exactly the risk a BV exists for.`,
      concepts: ["fc08.nl-entities"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc08-l06-f1", front: "BV formation", back: "Notarial deed by a Dutch civil-law notary, KVK registration, shareholders' register; minimum capital EUR 0.01 since 2012.", concepts: ["fc08.nl-entities"] },
    { id: "fc08-l06-f2", front: "VOF liability", back: "Unlimited, joint and several for all partners; no shares.", concepts: ["fc08.nl-entities"] },
    { id: "fc08-l06-f3", front: "STAK in one line", back: "Foundation holds the shares and votes; depositary receipts give holders the economics.", concepts: ["fc08.stak"] },
    { id: "fc08-l06-f4", front: "Delaware flip", back: "New Delaware parent, 1:1 share exchange, existing company becomes a 100 % subsidiary; IP licence or transfer; two jurisdictions of compliance.", concepts: ["fc08.delaware-flip"] },
    { id: "fc08-l06-f5", front: "Swiss GmbH vs AG capital", back: "GmbH CHF 20,000 fully paid; AG CHF 100,000, at least 20 % per share and CHF 50,000 paid in.", concepts: ["fc08.swiss-entities"] },
    { id: "fc08-l06-f6", front: "Kuwait: 51 % rule and KDIPA", back: "Default 51 % Kuwaiti ownership (Commercial Law Art. 23); up to 100 % foreign with a KDIPA licence (Law 116/2013) outside the negative list. Confirm with counsel.", concepts: ["fc08.kuwait-ownership"] },
    { id: "fc08-l06-f7", front: "Delaware franchise tax trap", back: "The authorised-shares method can bill tens of thousands of USD; file on the assumed par value capital method.", concepts: ["fc08.delaware-flip"] },
  ],
  scenarios: [
    {
      id: "fc08-s3",
      title: "The investor asks you to flip to Delaware",
      dayInLife: true,
      context: md`Illustrative. A US seed fund wants to lead Afterwave's round and writes: "We only invest in Delaware C-corps. Can you flip before closing?" Afterwave is a Dutch BV with founder holding BVs, five Dutch angels on a convertible loan and two pilot contracts signed by the BV.`,
      start: "a",
      concepts: ["fc08.delaware-flip", "fc08.nl-entities"],
      nodes: {
        a: {
          md: md`What do you do first?`,
          choices: [
            { text: "Say yes and ask your notary to start tomorrow.", score: 3, feedback: "Speed without a plan: you have not yet priced the tax, the angels' consent or the IP question.", next: "c" },
            { text: "Say you are open to it, and ask your Dutch tax adviser and a US counsel for the steps, costs and tax risks of a flip for the founders, the BV and the convertible loan holders before committing.", score: 9, feedback: "Right: a flip is a transaction with tax and consent consequences; scope it before you promise a closing date.", next: "b" },
            { text: "Refuse; you are a European company.", score: 2, feedback: "Possibly right in the end, but you have not tested the cost against the benefit of this lead and US follow-on capital.", next: "c" },
          ],
        },
        b: {
          md: md`The advisers report: roll-over relief for the founders' share exchange looks available but needs conditions met; the convertible loan must be amended to convert into the parent; the pilot contracts stay with the BV. The IP question is open.`,
          choices: [
            { text: "Agree a plan with the lead: flip before closing, the lead pays an agreed share of the flip costs, convertible loan amended with the angels' consent, IP stays in the BV under a licence to the parent for now.", score: 10, feedback: "Every open item has an owner and a decision, and the lead shares the cost of a requirement it created." },
            { text: "Proceed with the flip but leave the IP question for later.", score: 5, feedback: "Workable, but diligence will ask where the IP sits and on what terms; better to settle it in the flip documents." },
          ],
        },
        c: {
          md: md`Three weeks later the angels have not consented to amending the convertible loan, and the lead's closing date passes.`,
          choices: [
            { text: "Pause, scope the flip properly with advisers and agree a new timeline with the lead and the angels.", score: 5, feedback: "Recovers, at the cost of time and credibility that a scoped first answer would have saved." },
          ],
        },
      },
    },
  ],
};

export default lesson;
