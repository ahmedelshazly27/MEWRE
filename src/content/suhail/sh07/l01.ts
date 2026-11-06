import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh07-l01",
  title: "Legal structure options: nonprofit, for-profit, hybrid, fiscal sponsorship, and where to incorporate",
  summary:
    "The four ways to hold a community organisation (nonprofit or foundation, for-profit company, hybrid of the two, and fiscal sponsorship under someone else's entity), what each does to money, control and mission, and how the main jurisdictions for a Gulf-facing builder community (UAE mainland and free zones, ADGM and DIFC, Saudi Arabia, Kuwait, Delaware, the Netherlands) compare, with what is and is not verified.",
  minutes: 75,
  objectives: [
    "Explain the non-distribution constraint and why it decides what a nonprofit can and cannot do with sponsorship and recruiting income",
    "Describe three hybrid patterns (nonprofit owning a trading company, for-profit with a sister foundation, steward ownership or public benefit company) and when each fits",
    "Compute the break-even revenue between fiscal sponsorship and your own entity",
    "Compare UAE free zones, ADGM and DIFC, Saudi Arabia, Kuwait, Delaware and the Netherlands for a regional community company, and list what counsel must confirm",
    "Map each planned Suhail activity to who pays, which licence activity it needs, and whether a nonprofit could carry it",
  ],
  concepts: [
    { id: "sh07.legal-forms", name: "Nonprofit versus for-profit", description: "The defining difference is the non-distribution constraint: a nonprofit may earn a surplus but may not pay it out to founders, members or directors; a for-profit company may distribute profit and sell equity.", competency: "sh-org", related: ["fc08.nl-entities"] },
    { id: "sh07.hybrid-structure", name: "Hybrid structure", description: "Two linked entities, or one entity with a locked mission: a nonprofit that owns a taxable trading company, a for-profit with a sister foundation, a steward-owned company, or a public benefit corporation.", competency: "sh-org", related: ["sh07.legal-forms"] },
    { id: "sh07.fiscal-sponsorship", name: "Fiscal sponsorship", description: "An unincorporated project operates under an existing organisation's legal entity, which receives and accounts for the money and takes a fee; fast and cheap, but the sponsor holds legal control of the funds.", competency: "sh-org", related: ["sh07.legal-forms"] },
    { id: "sh07.mission-lock", name: "Mission lock", description: "Legal mechanisms that stop a future owner or board from abandoning the purpose or stripping the assets: nonprofit status, asset locks, golden shares, purpose trusts, public benefit charters.", competency: "sh-org", related: ["sh07.hybrid-structure"] },
    { id: "sh07.jurisdiction-choice", name: "Jurisdiction choice", description: "Where to incorporate is decided by where customers pay from, where you must hold event and recruiting licences, banking, tax, the investors you may want, and running cost; not by headline set-up price.", competency: "sh-org", related: ["fc08.kuwait-ownership", "fc08.delaware-flip"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What a legal structure actually decides",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Suhail's plan starts in January 2027 with volunteer leads and no revenue. The first sponsor invoice will force a choice: whose bank account receives the money, under which licence, in which country, and with what promise about where any surplus goes. That promise is what builders, sponsors and grant funders will judge Suhail's neutrality by, and it is expensive to change once money and people are in it.`,
        },
        {
          kind: "md",
          md: md`### The one rule that separates the forms

Every structure answers four questions: **who owns the surplus**, **who controls decisions**, **who can put money in and on what terms**, and **what stops the purpose being abandoned**. The legal forms differ mainly on the first one.

A **nonprofit** (a US 501(c)(3) charity, a Dutch stichting, a UAE or Saudi association, an ADGM or DIFC foundation used for a public purpose) may make a surplus. What it may not do is **distribute** that surplus to founders, members or directors. Economists call this the **non-distribution constraint**. It is why donors and grant funders trust nonprofits (nobody pockets the gift) and also why nonprofits cannot sell equity: there is no residual claim to sell.

A **for-profit company** (a UAE free-zone LLC, a Delaware C-corp, a Dutch BV, a Saudi LLC) can pay dividends, issue shares and options, and be sold. It can also do every activity a nonprofit does, including free events; it simply cannot offer donors a tax deduction or a structural promise that nobody will profit.

### What the constraint does to a community company's revenue

| Revenue stream | Fits a nonprofit? | Why |
|---|---|---|
| Grants for open research, datasets, education | Yes, natural fit | Grant funders often can only give to nonprofits or universities |
| Compute or credit donations | Yes | In-kind gifts to a public purpose |
| Hackathon and conference sponsorship | Usually, with care | Acceptable if the sponsor gets acknowledgement, not advertising or exclusive commercial benefits; heavy advertising can become taxable business income (US rules on unrelated business income) |
| Job board and recruiting fees | Weak fit | A commercial service to companies; often taxable inside a nonprofit and may need a recruitment licence |
| Paid membership | Depends | Fine for an association serving members; a paid service sold to the public is commercial |
| Equity investment | No | No shares to sell |

The US rules are the clearest written version: income from a trade or business **regularly carried on** and **not substantially related** to the exempt purpose is taxed as unrelated business income even inside an exempt organisation, and too much of it puts the exemption itself at risk. Other jurisdictions have their own tests, but the logic travels: the more Suhail's money looks like a commercial service to companies, the worse a pure nonprofit fits.`,
        },
        {
          kind: "matrix",
          title: "The four structure families",
          xAxis: ["Cannot distribute profit or sell equity", "Can distribute profit and sell equity"],
          yAxis: ["Weak mission lock", "Strong mission lock"],
          cells: [
            { label: "Nonprofit or foundation", detail: "Grants, donations, tax status; no equity, no payouts to founders. Example: Python Software Foundation (501(c)(3)) runs PyCon US." },
            { label: "Hybrid or locked for-profit", detail: "Nonprofit owning a trading company (Mozilla, since 2005), steward ownership (Patagonia, 2022), public benefit corporation (MLH)." },
            { label: "Fiscal sponsorship", detail: "Project lives inside someone else's nonprofit; the host controls the money and can end the arrangement." },
            { label: "Plain for-profit company", detail: "Sponsorship, recruiting, tickets, equity; mission held only by founders' intent and contracts. Example: Indie Hackers, sold to Stripe in 2017." },
          ],
          caption: "Fiscal sponsorship sits at the bottom left because the project owns nothing and its mission depends on the host's continued goodwill. A for-profit can move up the vertical axis with charter language, golden shares or a purpose trust.",
        },
        {
          kind: "md",
          md: md`### Hybrid patterns that actually exist

1. **Nonprofit owns a trading company.** The foundation holds 100 % of a taxable company that runs the commercial activity and pays its profit up to the foundation. Mozilla Foundation and its wholly owned Mozilla Corporation (created 2005) is the standard example. Good when the mission is the core and commerce funds it.
2. **For-profit company with a sister foundation.** The operating company runs events, media and recruiting; a separate nonprofit holds the open research, datasets and grant relationships, with its own board. Good when the commercial activity is the core and one activity is genuinely public-good. This is the obvious shape for Suhail's planned research arm (open-weight models, datasets, benchmarks), which grant funders and compute donors can support in a way they cannot support a recruiting business.
3. **Steward ownership.** Voting control sits with a trust or foundation that must keep the purpose; profits can still go to economic owners. Patagonia (September 2022) moved its voting stock to a purpose trust and its non-voting stock to a nonprofit. In the Netherlands the same idea is often built with a stichting holding control of a BV, the cousin of the STAK.
4. **Public benefit corporation.** A for-profit company whose charter names a public benefit that directors must balance against shareholder returns; Delaware has allowed this form since 2013, and Major League Hacking is one. It is a weaker lock than a foundation (shareholders can amend the charter with a supermajority) but it keeps equity available.

### Fiscal sponsorship

A project without its own entity operates under an existing nonprofit's legal personality. In the comprehensive model the project **is** a programme of the sponsor: the sponsor signs contracts, employs or contracts people and owns the bank account. In the grant model the project is independent and the sponsor regrants money to it. Either way you pay a fee on money handled and you trade control for speed.`,
        },
        { kind: "equation", formula: "sh07-fiscal-breakeven" },
        {
          kind: "callout",
          tone: "unverified",
          title: "Fiscal sponsorship fees and availability: check",
          md: md`Practitioners commonly quote fiscal sponsorship fees of roughly 5 to 15 % of funds handled; this range is general practice knowledge, not taken from a verified source in this course. Fiscal sponsorship is mainly a US practice, and there is no established equivalent marketplace in the Gulf; the regional analogue is a university, existing association or company agreeing to host a programme. The closure of the Open Collective Foundation fiscal host in 2024 is recalled, not verified here; the lesson it illustrates (your host can close and your money moves with it) holds regardless.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Where to incorporate, and the break-even against fiscal sponsorship",
      blocks: [
        {
          kind: "md",
          md: md`### Jurisdictions for a Gulf-facing builder community

| Option | Ownership and form | What it is good for | What to check |
|---|---|---|---|
| **UAE free zone** (Dubai, Abu Dhabi, Ras Al Khaimah and others) | 100 % foreign-owned LLC; activities fixed by the licence | Fast set-up, regional banking, invoicing Gulf sponsors | Whether the licence activity list covers event organisation, media and recruiting; whether you may serve onshore clients directly; event permits per emirate |
| **ADGM or DIFC** (financial free zones) | Common-law company law and courts in English; both also offer foundations | Holding companies, investor-ready structures, foundations for a research arm | Higher cost than general free zones; whether an operating events business fits there or only the holding |
| **UAE mainland** | 100 % foreign ownership allowed for many activities since the 2021 company-law reform | Contracting directly with onshore government and corporates | Activity eligibility; cost; local requirements per emirate |
| **Saudi Arabia** | Foreign founders need a MISA licence and commercial registration (track research brief, secondary) | The largest sponsor and event market in the region | Event permits: GEA for public or ticketed events, SCEGA for conferences (secondary, confirm); Saudisation and cost |
| **Kuwait** | Default 51 % Kuwaiti ownership; 100 % via KDIPA outside the negative list | Your home market; credibility with Kuwaiti institutions | Time and cost of the KDIPA route; see Founder Core |
| **Delaware** (C-corp, nonstock corporation for a charity) | Standard for US investors; YC funds Delaware, Cayman and Singapore companies (reported for 2026) | US sponsors and grant makers, US tax-exempt status for a research arm | Distance from Gulf banking and sponsors; US tax filings |
| **Netherlands** (BV, stichting) | Where you live part of the year; BV from EUR 0.01 capital, stichting for a nonprofit | European grants, a stichting-controlled BV as a steward-ownership hybrid | Dutch tax residence of the company if you run it from the Netherlands; ANBI conditions |

Two facts change the arithmetic in the UAE: **corporate tax** of 9 % applies to taxable income above AED 375,000 for financial years starting on or after 1 June 2023, with 0 % on qualifying income of a qualifying free-zone person that meets the conditions; and **VAT** is 5 % (Saudi VAT is 15 %). For a community company with thin margins, the corporate tax rarely bites in the first years; VAT registration and invoicing discipline does.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Regional nonprofit and licensing rules: confirm with counsel",
          md: md`Not verified in course research: (1) how UAE federal and emirate-level rules (for example Dubai's Community Development Authority) license nonprofit associations and public fundraising, and whether foreign founders may establish one; (2) whether a Saudi association or civil foundation under the NCNP can be founded or led by non-Saudis; (3) Kuwaiti rules for public benefit associations; (4) current ADGM and DIFC fees and whether their foundations can run event and sponsorship activity; (5) whether a free-zone licence lets you invoice and run events onshore in another emirate; (6) whether a job board or success-fee recruiting needs a recruitment-agency licence (MoHRE in the UAE). Treat every row of the table above as a starting list of questions, not as advice.`,
        },
        {
          kind: "xref",
          to: "fc08-l06",
          note: "Founder Core covers the Dutch forms, the STAK, the Delaware flip, Swiss entities and the Kuwaiti 51 % and KDIPA rules in depth. This lesson adds only the nonprofit and hybrid options and the Gulf free-zone angle.",
        },
        {
          kind: "worked",
          mode: "worked",
          title: "Fiscal sponsor or own entity for Suhail's first year (illustrative)",
          given: md`Illustrative assumptions, not quotes: a host organisation would hold Suhail's money for a fee of $f = 8\%$ of funds handled. Running Suhail's own entity would cost about $C_e =$ USD 12,000 per year (licence renewal, accounting and audit, bank fees, filings), plus a one-off set-up of USD 6,000. Year-1 illustrative revenue is USD 252,000 (lesson 3 builds this mix).`,
          steps: [
            { md: md`Break-even revenue: $R^{*} = C_e/f = 12{,}000/0.08 =$ **USD 150,000 per year**.` },
            { md: md`At USD 252,000 the sponsor's fee is $0.08 \times 252{,}000 =$ USD 20,160, against USD 12,000 of own running cost: own entity saves USD 8,160 per year once running.` },
            { md: md`The set-up cost of USD 6,000 is recovered in $6{,}000/8{,}160 \approx 0.74$ years, about 9 months.` },
            { md: md`Non-cost factors: the host signs the sponsor contracts and owns the account, so a sponsor dispute or a host closure is outside your control; a host may refuse recruiting income; and a host nonprofit cannot give leads equity.` },
          ],
          result: md`On these numbers, a host makes sense only for the first months, while revenue is unproven and well below USD 150,000 a year. If the revenue plan is credible, set up your own entity before the first large sponsorship rather than migrating contracts later.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: a cheaper host and a cheaper entity",
          given: md`Illustrative: a university programme office offers to host Suhail's first hackathons for $f = 10\%$. A simpler free-zone set-up would cost $C_e =$ USD 9,000 per year to run.`,
          steps: [
            {
              md: md`Break-even revenue $R^{*} = C_e/f$.`,
              hidden: true,
              check: { prompt: "Break-even revenue", answer: 90000, unit: "USD/yr", tolerance: { rel: 0.01 } },
            },
            {
              md: md`If the first half-year brings in USD 40,000 (two hackathons), the host's fee is $0.10\times40{,}000 =$ USD 4,000, against half a year of own running cost of USD 4,500.`,
              hidden: true,
              check: { prompt: "Host fee on USD 40,000", answer: 4000, unit: "USD", tolerance: { abs: 1 } },
            },
          ],
          result: md`Below about USD 90,000 a year the host is cheaper, before counting the set-up cost you avoid. A sensible plan: start hosted, with a written exit clause that transfers contracts, brand and domain, and switch at a revenue trigger.`,
        },
        {
          kind: "question",
          question: {
            id: "sh07-l01-p1",
            type: "numeric",
            prompt: md`A host charges 7 % of funds handled. Own-entity running cost is USD 14,000 per year. Above what annual revenue is the own entity cheaper? (USD)`,
            answer: 200000,
            tolerance: { rel: 0.01 },
            unit: "USD/yr",
            explanation: md`$R^{*} = C_e/f = 14{,}000/0.07 =$ USD 200,000 per year.`,
            concepts: ["sh07.fiscal-sponsorship"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "How the structure is actually set up",
      blocks: [
        {
          kind: "md",
          md: md`### Who does what

- **Corporate service provider or free-zone authority**: prepares the licence application, the memorandum and articles, and the activity list. They sell set-up; they will not tell you that the activity list misses recruiting.
- **Local counsel** (one per jurisdiction you operate in): confirms licences for events, media and recruiting, nonprofit eligibility, and how sponsorship income is treated. Pay for a fixed-fee scoping call with a written question list.
- **Accountant**: VAT registration, invoicing in the right currency, whether you are a qualifying free-zone person, and separate books per entity in a hybrid.
- **Bank**: account opening in the UAE commonly takes weeks and asks for a business plan, expected counterparties and the source of funds; a sponsor's first payment waits for it.

### Documents you will produce

1. An **activities and money-flows map**: every activity, who pays, in which currency, which licence activity covers it.
2. **Articles or charter** with the purpose clause (and, for a hybrid, the asset lock and the relationship between the entities).
3. An **intercompany agreement** if there are two entities: brand licence, cost sharing, who employs whom, how money moves.
4. **IP and brand assignment**: the name Suhail, suhail.build, the logo, the newsletter list and the podcast feed must belong to the entity, not to a lead's personal account.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`**Licence activities that miss the business**: a consultancy licence that does not cover event organisation or recruiting. **A nonprofit chosen for image** that then cannot take the recruiting income that pays the bills. **Assets in personal names**: the domain, the Luma calendar, the Discord server and the mailing list registered to a volunteer who later leaves. **Two entities, one bank account**: commingled money destroys the hybrid's tax and governance logic. **Choosing on set-up price** instead of running cost, banking and where sponsors can pay.`,
        },
        {
          kind: "ask",
          title: "Questions for counsel before you incorporate",
          items: [
            "Which licence activities do we need for hackathons, a conference with paid tickets, a newsletter and podcast with sponsors, and a job board with success fees?",
            "Can this entity invoice sponsors and run events in Saudi Arabia, Kuwait and other emirates, or do we need local registrations or a local partner for each event?",
            "If we later add a nonprofit research foundation, which jurisdiction lets it receive international grants and compute donations, and can its board include the operating company's founders?",
            "How is sponsorship income treated if the sponsor receives logo placement, a speaking slot or access to participant CVs?",
            "What are the annual running costs (licence, audit, filings, registered agent) rather than the set-up price?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "sh07-l01-p2",
            type: "short",
            prompt: md`**Produce Suhail's activities and money-flows map.** List at least six planned activities (hackathons, Suhail Season conference, newsletter, The Majlis podcast, investor and employer connections, the research arm). For each give: who pays and for what, the likely payment currency and country, the licence activity or permit it probably needs, and whether a nonprofit could carry it without risking its status. End with the three questions this map raises for counsel. Label all assumptions illustrative.`,
            rubric: [
              "Covers at least six activities including the research arm and investor or employer connections",
              "For each activity names the payer and what they buy (acknowledgement, access, hires, data) rather than just 'sponsors'",
              "Identifies licence or permit needs per activity (event organisation, media, recruitment) and flags Saudi event permits as unverified",
              "Correctly separates nonprofit-friendly activities (research, open datasets, education) from commercial ones (job board, recruiting fees, heavy advertising)",
              "Ends with specific, answerable questions for counsel rather than generic ones",
              "Uses no invented sponsors, revenue or partners; numbers are labelled illustrative",
            ],
            modelAnswer: md`| Activity | Payer and what they buy | Currency, country (illustrative) | Licence or permit | Nonprofit fit |
|---|---|---|---|---|
| Hackathons | Tech and cloud companies: developer adoption, hiring signal, brand; in-kind credits | USD or AED from UAE and US entities | Event organisation; per-event permits in Saudi Arabia (GEA or SCEGA, unverified for free invite-only events) | Acceptable if benefits are acknowledgement, weak if sponsors get CV access |
| Suhail Season conference | Sponsors (booths, talks) and attendees (tickets) | AED, SAR, USD | Event organisation, venue permits, ticketing; VAT on tickets | Possible, but paid tickets and booths are commercial |
| Newsletter | Sponsors buying placements and sponsored job posts | USD | Media or publishing activity | Advertising is commercial income |
| The Majlis podcast | Episode sponsors | USD | Media; possibly a media licence in the UAE (check) | Same as newsletter |
| Investor and employer connections, job board | Employers: job posts, success fees on hires | AED, SAR, USD | Possibly a recruitment-agency licence (MoHRE in the UAE, unverified) | Poor fit |
| Research arm | Grant makers, compute donors, universities | USD, EUR | Research or education activity | Strong fit: likely needs a nonprofit or university partner to receive grants |

Questions for counsel: (1) Does one UAE free-zone licence cover event organisation, media and a job board, and can it run events in Saudi Arabia and Kuwait without a local entity? (2) Does success-fee recruiting need a separate licence, and does a job board with flat posting fees avoid it? (3) Which jurisdiction (ADGM foundation, Dutch stichting, US nonprofit) best lets a future research foundation receive international grants and compute donations, and may the operating company's founders sit on its board?`,
            explanation: md`The map shows that most of Suhail's money is commercial (sponsorship, tickets, recruiting) and only the research arm is a natural nonprofit. That points towards a for-profit operating entity with a separate nonprofit for research, which lesson 6 tests properly.`,
            concepts: ["sh07.legal-forms", "sh07.jurisdiction-choice", "sh07.hybrid-structure"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a volunteer lead why Suhail cannot simply 'be a nonprofit so sponsors trust us' and still run a job board that pays the bills.",
          keyPoints: [
            "A nonprofit may make a surplus but may not distribute it; that is what earns donor trust",
            "Commercial services to companies (recruiting fees, advertising) can be taxable or endanger nonprofit status where the rules follow the US logic",
            "A nonprofit cannot sell equity or give leads shares",
            "Trust can also come from transparency and a mission lock in a for-profit or hybrid",
          ],
        },
        { kind: "sources", refs: ["sh07-r1", "sh07-r2", "sh07-r4", "sh07-r5", "sh07-r6", "sh07-r7", "sh07-r8", "sh07-r9", "sh07-r10", "sh07-r11", "sh07-r12", "sh07-r21", "sh07-r22", "sh07-r27", "sh07-r28", "sh07-r29", "sh07-r30"] },
      ],
    },
  ],
  quiz: [
    {
      id: "sh07-l01-q1",
      type: "mcq",
      prompt: "What legally defines a nonprofit, as opposed to a for-profit company?",
      options: [
        "It may not make a surplus",
        "It may not distribute its surplus to founders, members or directors",
        "It may not charge for services",
        "It may not employ paid staff",
      ],
      answer: 1,
      explanation: md`The **non-distribution constraint**. Nonprofits can charge, employ staff and run a surplus; they cannot pay that surplus out to insiders, which is also why they have no equity to sell.`,
      concepts: ["sh07.legal-forms"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh07-l01-q2",
      type: "multi",
      prompt: "Which Suhail revenue streams are the weakest fit for a pure nonprofit?",
      options: [
        "Grants for an open Arabic benchmark",
        "Success fees on hires made through Suhail",
        "Paid job posts on a job board",
        "Donated GPU credits for the research arm",
        "Newsletter placements sold as advertising",
      ],
      answer: [1, 2, 4],
      explanation: md`Recruiting fees, job posts and advertising are commercial services to companies; under US-style rules they are unrelated business income and can be taxed or threaten exempt status. Research grants and donated compute fit a public purpose.`,
      concepts: ["sh07.legal-forms"],
      difficulty: 2,
    },
    {
      id: "sh07-l01-q3",
      type: "numeric",
      prompt: md`A host charges 6 % of funds handled; own-entity running cost is USD 10,800 per year. Break-even annual revenue? (USD)`,
      answer: 180000,
      tolerance: { rel: 0.01 },
      unit: "USD/yr",
      explanation: md`$R^{*} = 10{,}800/0.06 =$ USD 180,000.`,
      concepts: ["sh07.fiscal-sponsorship"],
      difficulty: 1,
    },
    {
      id: "sh07-l01-q4",
      type: "mcq",
      prompt: "Mozilla Foundation owning Mozilla Corporation is an example of which pattern?",
      options: [
        "Fiscal sponsorship",
        "Public benefit corporation",
        "Nonprofit owning a taxable trading company",
        "Steward ownership through a purpose trust",
      ],
      answer: 2,
      explanation: md`The foundation owns 100 % of a taxable company that runs the commercial activity and serves the mission. Patagonia (2022) is the purpose-trust example; MLH is a PBC.`,
      concepts: ["sh07.hybrid-structure"],
      difficulty: 1,
    },
    {
      id: "sh07-l01-q5",
      type: "decision",
      prompt: md`It is February 2027. A cloud provider is ready to pay USD 15,000 for Suhail's first hackathon and needs an invoice within three weeks. Suhail has no entity. What do you do?`,
      options: [
        { text: "Invoice through a lead's personal freelance licence and move the money later", score: 0, feedback: "Commingles personal and organisational money, creates tax exposure for the lead and leaves the sponsor contract with an individual." },
        { text: "Agree a written hosting arrangement with an existing entity (a fiscal host or a friendly company) with a clear fee and an exit clause, while you start incorporation", score: 1, feedback: "Fast, auditable and reversible. The exit clause (contracts, brand and remaining funds transfer to the new entity) is what makes it safe." },
        { text: "Tell the sponsor to wait three months until the entity and bank account exist", score: 0.4, feedback: "Clean but likely loses the first sponsor and the event date; acceptable only if the sponsor is flexible." },
        { text: "Register a nonprofit association quickly because it looks better to sponsors", score: 0.2, feedback: "Nonprofit registration in the Gulf is usually slower than a free-zone company and may not fit the recruiting and media revenue." },
      ],
      explanation: md`Speed matters for the first deal, but the arrangement must be written, separate from anyone's personal money, and easy to exit.`,
      concepts: ["sh07.fiscal-sponsorship", "sh07.jurisdiction-choice"],
      difficulty: 2,
    },
    {
      id: "sh07-l01-q6",
      type: "mcq",
      prompt: "Why is a Delaware public benefit corporation a weaker mission lock than a foundation owning the company?",
      options: [
        "Because PBCs cannot raise equity",
        "Because shareholders can amend the charter (with the required majority) and remove the benefit purpose",
        "Because PBCs pay higher taxes",
        "Because PBCs cannot employ staff",
      ],
      answer: 1,
      explanation: md`A PBC keeps equity and shareholder control; the purpose binds directors only as long as the charter says so. A foundation or purpose trust that holds voting control cannot be outvoted by investors.`,
      concepts: ["sh07.mission-lock", "sh07.hybrid-structure"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "sh07-l01-f1", front: "Non-distribution constraint", back: "A nonprofit may earn a surplus but may not pay it out to founders, members or directors. The source of donor trust and the reason it has no equity.", concepts: ["sh07.legal-forms"] },
    { id: "sh07-l01-f2", front: "Four structure families", back: "Nonprofit or foundation; plain for-profit; hybrid or locked for-profit; fiscal sponsorship under a host.", concepts: ["sh07.hybrid-structure"] },
    { id: "sh07-l01-f3", front: "Fiscal sponsorship break-even", back: md`$R^{*} = C_e/f$: own entity is cheaper above this revenue. USD 12k running cost at an 8 % fee: USD 150k.`, concepts: ["sh07.fiscal-sponsorship"] },
    { id: "sh07-l01-f4", front: "Unrelated business income (US)", back: "Income from a trade regularly carried on and not substantially related to the exempt purpose: taxed inside a nonprofit, and too much threatens the exemption.", concepts: ["sh07.legal-forms"] },
    { id: "sh07-l01-f5", front: "UAE corporate tax and VAT", back: "9 % on taxable income above AED 375,000 (financial years from 1 June 2023); 0 % on qualifying free-zone income if conditions are met; VAT 5 %. Saudi VAT 15 %.", concepts: ["sh07.jurisdiction-choice"] },
    { id: "sh07-l01-f6", front: "Assets that must belong to the entity", back: "Name and trademark, domain (suhail.build), mailing list, Luma calendar, Discord, podcast feed, social accounts.", concepts: ["sh07.jurisdiction-choice"] },
  ],
};

export default lesson;
