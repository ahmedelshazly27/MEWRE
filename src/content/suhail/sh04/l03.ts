import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh04-l03",
  title: "Country playbooks: Saudi Arabia, UAE, Qatar, Kuwait, Egypt, Jordan, Lebanon",
  summary:
    "Each market has different decision makers, budget calendars, relationship norms and tax mechanics. Know who signs, when the money is set, how meetings and follow-ups work, and how VAT and withholding change what lands in the bank. Flag every tax point for an adviser before you quote.",
  minutes: 80,
  objectives: [
    "You can describe for each of the seven markets the typical partner landscape, decision makers and budget calendar.",
    "You can plan a partnership calendar for 2027 around fiscal years, Ramadan, Eid and the summer slowdown.",
    "You can gross up a sponsorship price for withholding tax and add VAT where it applies, and list the questions a tax adviser must answer.",
    "You can follow regional relationship norms (introductions, in-person meetings, bilingual follow-up) without crossing into improper influence.",
  ],
  concepts: [
    { id: "sh04.country-playbook", name: "Country playbook", description: "A one-page note per market: partner landscape, decision makers, budget calendar, working week, relationship norms, entity and invoicing route, tax basics and open questions for advisers.", competency: "sh-partnerships", related: ["sh04.partner-types"] },
    { id: "sh04.budget-calendar", name: "Budget calendar", description: "When each partner's money is set: calendar-year fiscal years (most Gulf governments and corporates), April to March (Kuwait government), July to June (Egypt government); asks must land before the budget is fixed.", competency: "sh-partnerships", related: ["sh04.budget-line"] },
    { id: "sh04.vat-withholding", name: "VAT and withholding on sponsorship", description: "VAT is added to the invoice where the supplier must charge it (or self-accounted by the buyer under reverse charge); withholding tax is deducted by the payer from cross-border payments in some countries, so the price must be agreed net or gross.", competency: "sh-partnerships", related: ["sh04.country-playbook"] },
    { id: "sh04.relationship-norms", name: "Regional relationship norms", description: "Warm introductions, in-person meetings, patience with hierarchy, WhatsApp as a working channel and bilingual written follow-up; introductions are legitimate, payments or favours for decisions are not.", competency: "sh-partnerships", related: ["fc07.warm-intro"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Seven markets, seven sets of mechanics",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Suhail is pan-Arab, but every partnership is signed in one country, under one budget calendar, with one tax treatment. You already know Kuwait's decision chains from Track 0 and you work between Kuwait and the Netherlands. A partnership in Riyadh, Cairo or Amman runs on different rules, and a sponsorship quoted without knowing them can lose 5 to 20 % of its value to tax you did not price, or a full year to a budget you missed.`,
        },
        {
          kind: "md",
          md: md`### The playbooks at a glance

Facts with dates come from the research brief; tax rates and working weeks are established public rules as of the latest information available here; everything marked (check) must be confirmed locally before use.

| | Saudi Arabia | UAE | Qatar | Kuwait | Egypt | Jordan | Lebanon |
|---|---|---|---|---|---|---|---|
| **AI and ecosystem anchors (dated)** | HUMAIN (PIF) with ALLaM 34B, Aug 2025; SDAIA and KSGAAL (BALSAM, Jul 2025); SVC, Jada, Sanabil 500, F6 Riyadh programme (Jan 2026) | MBZUAI, TII (Falcon-H1 Arabic, Jan 2026), G42 and Inception (Jais 2, Dec 2025), MGX, Hub71 | Qai under QIA (Dec 2025); QCRI and HBKU (Fanar) | Microsoft and Government of Kuwait partnership (Mar 2025); no national open-weight LLM found | ITIDA; about 750K graduates a year; offshoring exports about USD 5.2bn in 2025 | Developer talent base (no dated programme in the brief) | Universities and diaspora (no dated programme in the brief) |
| **Typical decision makers** | Programme directors in authorities and giga-projects; PIF-backed companies; corporate DevRel and marketing | Abu Dhabi entities (research, sovereign funds), Dubai government and free zones, corporates | QIA-linked entities, foundation-linked universities | Ministries and authorities (slow chains), family conglomerates, banks | Government (ITIDA, ministries), large corporates, multinationals' regional offices | Ministry of Digital Economy, corporates, universities | Universities, NGOs, diaspora founders |
| **Fiscal year** | Calendar year | Calendar year (federal) | Calendar year (check) | 1 Apr to 31 Mar (government) | 1 Jul to 30 Jun (government) | Calendar year | Calendar year |
| **Working week** | Sun to Thu | Mon to Fri (federal government since Jan 2022, with Friday half day) | Sun to Thu | Sun to Thu | Sun to Thu | Sun to Thu | Mon to Fri (check) |
| **Standard VAT or GST** | 15 % (since 1 Jul 2020) | 5 % (since 1 Jan 2018) | None (check) | None (check) | 14 % VAT | 16 % general sales tax | 11 % VAT |
| **Payment notes** | Withholding on payments to non-residents (rate depends on service type: check); e-invoicing for registered suppliers | VAT registration mandatory above AED 375k taxable supplies; 9 % corporate tax above AED 375k profit for years from Jun 2023 | Withholding on some payments to non-residents (check) | 51 % Kuwaiti ownership default; 100 % foreign via KDIPA licence; branches without a local agent since Law 1 of 2024 | EGP floated in Mar 2024; price in USD, settle in EGP at an agreed rate | JOD pegged to USD | Banking crisis since 2019: domestic bank transfers unreliable, payments typically in fresh USD or abroad; heightened sanctions screening |

### Why the tax column matters: withholding and VAT

Two different mechanisms change what you receive:

- **Withholding tax (WHT):** the payer deducts a percentage from a cross-border payment and pays it to its tax authority. If you quote USD 20k and 5 % is withheld, USD 19k arrives. Agree in the contract whether the price is **net of withholding** (the sponsor grosses up) or gross.
- **VAT:** added on top of the price when the supplier must charge it. When a foreign supplier that is not registered sells services to a business in a VAT country, the buyer often accounts for the VAT itself under **reverse charge**, so the invoice shows no VAT. Where the service is treated as supplied in that country (an event held there, for example), the foreign supplier may need to register.`,
        },
        { kind: "equation", formula: "sh04-wht-gross-up" },
        {
          kind: "callout",
          tone: "unverified",
          title: "Tax points to confirm before quoting",
          md: md`These are the points this lesson cannot settle and an adviser in each country must: (1) the Saudi withholding rate on a sponsorship or event fee paid to a non-resident (rates for services, royalties and management fees differ, and how a sponsorship is classified is not certain); (2) whether a foreign Suhail entity must register for Saudi VAT if it runs the event in the Kingdom; (3) whether Qatar and Kuwait still have no VAT in 2027 (both signed the GCC VAT framework, neither had implemented it at last information); (4) Qatar's withholding rules for services by non-residents; (5) Egyptian and Jordanian withholding on payments abroad; (6) Lebanon's official working week and how a foreign entity can receive payment from Lebanese partners in practice. Suhail's own entity and jurisdiction are not decided yet, and every answer depends on it.`,
        },
        {
          kind: "chart",
          chart: "bar",
          title: "Standard VAT or GST rate by market (%)",
          xKey: "country",
          xLabel: "Market",
          yLabel: "%",
          series: [{ key: "rate", label: "Standard rate (%)" }],
          data: [
            { country: "Saudi Arabia", rate: 15 },
            { country: "UAE", rate: 5 },
            { country: "Qatar", rate: 0 },
            { country: "Kuwait", rate: 0 },
            { country: "Bahrain", rate: 10 },
            { country: "Oman", rate: 5 },
            { country: "Egypt", rate: 14 },
            { country: "Jordan", rate: 16 },
            { country: "Lebanon", rate: 11 },
          ],
          caption: "Qatar and Kuwait shown as 0 because no VAT was in force at last information (check before 2027 quotes). Jordan's tax is a general sales tax. Reduced and zero rates apply to some supplies; event services are generally standard-rated, but confirm.",
        },
        {
          kind: "md",
          md: md`### The 2027 calendar

| Period (2027) | What happens | Partnership consequence |
|---|---|---|
| Jan | New calendar-year budgets released | Best month to close asks made in Q4 2026 |
| About 8 Feb to 9 Mar | Ramadan (approximate, set by moon sighting) | Daytime meetings short; evenings social (iftar and suhoor gatherings are relationship events); hard asks and launches avoided, especially the last ten days |
| About 9 to 12 Mar | Eid al-Fitr holiday | Offices closed several days; nothing signs |
| Apr | Kuwait government fiscal year starts | Kuwait public budgets for FY 2027/28 already fixed |
| About 16 May | Eid al-Adha (approximate) | Another closure; many take the week |
| Jul | Egypt government fiscal year starts | Egyptian public budgets fixed by then |
| Jul to Aug | Gulf summer: heat, travel, slow decisions | Plan no Gulf decision deadlines; good for preparing autumn |
| Sep to Nov | Calendar-year budget planning for 2028 | Put 2028 renewals and new asks in front of owners now |

For a programme starting January 2027, the consequence is immediate: calendar-year corporate and government budgets for 2027 are being finalised in November 2026. A partner approached in December will often say "next budget".`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Dates to check",
          md: md`Ramadan and Eid dates move by about 11 days a year and are announced locally after moon sighting; the dates above are approximate. Major regional technology events that partners anchor their calendars on (for example LEAP and the GAIN Summit in Riyadh, GITEX in Dubai, Web Summit Qatar in Doha) usually run in the same season each year, but their 2027 dates were not checked for this lesson.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "What actually lands in the bank",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Quoting a Saudi sponsor (illustrative, tax treatment to confirm)",
          given: md`Illustrative. A Saudi company agrees to sponsor a Suhail hackathon in Riyadh. Suhail needs USD 20k to land net. Assume (to be confirmed by a Saudi adviser) that the sponsor must withhold 5 % on the payment to a non-resident Suhail entity, and consider two VAT cases: (a) reverse charge, Suhail does not charge VAT; (b) Suhail is required to register and charge Saudi VAT at 15 %.`,
          steps: [
            { md: md`**Gross up for withholding:** $G = N/(1 - t_w) = 20/(1 - 0.05) = 21.05$ USD k.` },
            { md: md`**Case (a), reverse charge:** invoice $I = 21.05$ USD k; the sponsor pays USD 20.0k to Suhail and USD 1.05k to the tax authority, and self-accounts the VAT.` },
            { md: md`**Case (b), Suhail charges VAT:** $I = 21.05\times1.15 = 24.21$ USD k. Suhail receives the fee net of withholding plus VAT, then pays the VAT to the authority. Whether withholding is computed on the VAT-inclusive amount is one more question for the adviser.` },
            { md: md`**What goes wrong without this:** quoting "USD 20k" without terms and receiving USD 19k, then discovering a VAT liability on top: a 5 to 20 % swing on a small event budget.` },
          ],
          result: md`Quote "USD 21,053 exclusive of VAT; if any withholding applies the sponsor grosses up so that Suhail receives USD 20,000", and have the Finance lead confirm the treatment before the proposal goes out.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: an Egyptian sponsor paying in pounds",
          given: md`Illustrative. An Egyptian company agrees to sponsor a Cairo meetup at USD 3,000, payable in EGP at an agreed rate of EGP 48 per USD (illustrative; use the rate on the invoice date). Assume the invoicing entity must charge Egyptian VAT at 14 %.`,
          steps: [
            { md: md`Fee in pounds: $3{,}000\times48$.` },
            { md: md`$= $ **EGP 144,000**.`, hidden: true, check: { prompt: "Fee in EGP", answer: 144000, unit: "EGP", tolerance: { abs: 1 } } },
            { md: md`Invoice total with VAT: $144{,}000\times1.14$.` },
            { md: md`$= $ **EGP 164,160**.`, hidden: true, check: { prompt: "Invoice total in EGP", answer: 164160, unit: "EGP", tolerance: { abs: 1 } } },
            { md: md`If payment arrives 60 days later and the pound has weakened 5 %, the USD value of EGP 144,000 falls to about USD 2,857. Agree the conversion date in the contract, or invoice in USD where the partner can pay in USD.` },
          ],
          result: md`In Egypt, partner budgets are smaller in USD terms and currency risk is real: price in USD, fix the conversion date, keep costs in EGP where you can.`,
        },
        {
          kind: "question",
          question: {
            id: "sh04-l03-p1",
            type: "numeric",
            prompt: md`Suhail must receive USD 12,000 net from a sponsor that withholds 5 % on payments to non-residents. What gross fee (USD, before VAT) should the contract state?`,
            answer: 12631.58,
            tolerance: { abs: 1 },
            unit: "USD",
            explanation: md`$G = 12{,}000/(1 - 0.05) = 12{,}631.58$ USD. Check: $12{,}631.58\times0.95 = 12{,}000$. Grossing up by adding 5 % ($12{,}600$) is a common error: it leaves you USD 30 short because the withholding applies to the grossed-up amount.`,
            concepts: ["sh04.vat-withholding"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Working each market",
      blocks: [
        {
          kind: "md",
          md: md`### Relationship norms that hold across the region

These are practitioner heuristics, not rules; individual people and organisations vary.

- **Warm introductions open doors.** A credible mutual contact (a founder they backed, a professor, a colleague) converts far better than cold email. Founder Core covers how to ask for a forwardable introduction.
- **In person matters.** A first meeting in the partner's city, ideally in their office or a majlis-style setting, does more than three calls. Budget the travel.
- **Hierarchy and patience.** The person you meet may be enthusiastic and still need a senior approval that takes weeks. Ask early who else decides; do not go over your contact's head without them.
- **WhatsApp is a working channel.** Decisions often move there. Confirm anything that matters by email afterwards so it is on record and visible to your team.
- **Bilingual follow-up.** For government entities, send a short formal letter or summary in Arabic and English. For corporates, English is usually fine; Arabic shows respect and is often noticed.
- **Introductions are legitimate, influence for favours is not.** Using a network to get a meeting is normal everywhere. Offering anything of value to an official or employee to influence a decision is bribery, whatever it is called (lesson 5).

### Market notes

- **Saudi Arabia:** the largest budgets and the most activity around AI (HUMAIN, SDAIA, the funds in the brief), but KSA VC fell sharply in early 2026 (Q1 2026 down 62 % YoY per Mubasher; KSA only USD 219M in H1 2026 per MAGNiTT), so private budgets may be tighter than headlines suggest. Public or ticketed events need a GEA permit; conferences fall under SCEGA; foreign organisers typically need a MISA licence and commercial registration first (secondary sources; whether a free hackathon needs a permit is unverified). Saudi rules since 1 January 2024 restrict government contracts with foreign companies that lack a regional headquarters in the Kingdom; check whether that affects a government-entity sponsorship before you rely on one.
- **UAE:** Abu Dhabi concentrates the AI research and sovereign capital (MBZUAI, TII, G42, MGX, Hub71); Dubai has government and free-zone innovation bodies and the largest corporate event calendar. Free-zone entities, VAT registration and corporate tax are well documented, which makes the UAE the simplest place to invoice from, if Suhail's structure allows.
- **Qatar:** few but large actors (Qai under QIA, QCRI and HBKU); decisions sit high in the organisation. A Doha event usually needs one anchor partner rather than many small sponsors.
- **Kuwait:** your home market. Government chains are slow and formal (Track 0); private budgets sit with family groups, banks and telcos. The Microsoft partnership (Mar 2025) includes an innovation hub, which is a natural conversation, but nothing about its programme is known yet. Keep Suhail work clearly separate from your Mizan relationships with the same institutions (lesson 5).
- **Egypt:** the region's largest talent pool and most cost-sensitive budgets. Employers and offshoring firms (USD 5.2bn of exports in 2025, target USD 6bn in 2026) are natural hiring partners. Price in USD, settle in EGP carefully.
- **Jordan:** a strong developer community and active universities; small budgets; partners value programmes that lead to jobs or regional contracts. Regional and international organisations based in Amman can be programme partners.
- **Lebanon:** talented builders and a large diaspora, but a banking system in crisis since 2019 and a difficult security situation. Partnerships are mostly in-kind, university-based or diaspora-funded; payments need a clear route and sanctions screening of counterparties is mandatory (lesson 5).`,
        },
        { kind: "xref", to: "m00-l02", note: "Kuwait institutions and decision chains, from Track 0: who decides what inside the Kuwaiti state." },
        { kind: "xref", to: "m13-l02", note: "Writing briefs, memos and official letters in Arabic and English for government counterparts." },
        { kind: "xref", to: "fc08-l06", note: "Entities and structures, including Kuwait's foreign ownership rules: where Suhail invoices from decides most of the tax questions in this lesson." },
        { kind: "xref", to: "fc04-l08", note: "Enterprise and Gulf government procurement: if a government partner wants to pay through procurement rather than a grant or sponsorship, the paper process applies." },
        {
          kind: "callout",
          tone: "pm",
          title: "Questions for the Finance lead and advisers, per country",
          md: md`Which entity invoices? Is the fee net or gross of withholding, and at what rate? Must we register for VAT or charge it, or is it reverse-charged? In which currency, at which conversion date? Does a permit or licence apply to the event itself? What payment terms are normal here (30, 60, 90 days) and what do we do if payment is late?`,
        },
        { kind: "sources", refs: ["sh04-r9", "sh04-r10", "sh04-r11", "sh04-r18", "sh04-r8"] },
        {
          kind: "question",
          question: {
            id: "sh04-l03-p2",
            type: "short",
            explanation: md`A strong playbook separates sourced facts from assumptions, plans around the real budget calendar and holidays, prices tax explicitly with the formula, and ends with concrete adviser questions rather than guesses.`,
            prompt: md`Write the one-page country playbook for the first market where Suhail will seek a paying partner in 2027 (choose Saudi Arabia, the UAE or Kuwait). Include: partner landscape (dated facts only), decision makers and budget lines, the 2027 calendar with the windows you will target, relationship approach, invoicing route and tax questions for an adviser (with a worked gross-up for one illustrative sponsorship), and the top three risks.`,
            rubric: [
              "Uses only dated facts from the research brief or well-established public rules, and marks uncertain items as to be checked.",
              "Names decision-maker roles and the budget lines money would come from.",
              "Builds a 2027 calendar that accounts for the fiscal year, Ramadan and Eid (marked approximate) and the summer slowdown, with target windows.",
              "Includes a correct withholding gross-up and VAT treatment for one illustrative sponsorship, with the assumptions stated.",
              "Lists specific questions for a local tax or legal adviser rather than asserting uncertain rules.",
              "Identifies three concrete risks (for example budget timing, payment delay, permit uncertainty, conflicts of interest) with a mitigation each.",
            ],
            modelAnswer: md`**Suhail playbook: Saudi Arabia, 2027 (draft for adviser review)**

**Landscape (dated):** HUMAIN (PIF) launched HUMAIN Chat on ALLaM 34B in Aug 2025; SDAIA, KSGAAL and partners published the BALSAM benchmark (Jul 2025); Flat6Labs (now F6 Group) completed its 6th Riyadh seed programme with SVC, Jada and Riyadh Valley (Jan 2026); KSA VC fell 62 % YoY in Q1 2026 and was USD 219M in H1 2026 (MAGNiTT). Nothing is known about any of these organisations' community budgets.

**Decision makers and lines:** developer relations or research leadership at AI companies (adoption budget); platform or community heads at VCs and accelerators; corporate marketing and HR (brand and hiring budgets); government programme directors (programme budget, slow).

**Calendar 2027:** close Q4 2026 asks in January; avoid hard asks in Ramadan (about 8 Feb to 9 Mar, approximate) and Eid al-Fitr (about 9 to 12 Mar); target signatures March 15 to May 10; first Riyadh hackathon late April (illustrative); no deadlines June to August; 2028 asks in September to November.

**Approach:** warm introductions through founders and researchers; first meetings in Riyadh; WhatsApp for logistics, email for anything that commits; bilingual summary to government contacts.

**Invoicing and tax (to confirm):** Suhail entity not yet chosen. Illustrative sponsorship USD 15k net, 5 % withholding assumed: $G = 15/0.95 = 15.79$ USD k; if Saudi VAT must be charged, $I = 15.79\times1.15 = 18.16$ USD k; if reverse-charged, invoice USD 15.79k. Questions for a Saudi adviser: withholding rate on a sponsorship fee paid to a non-resident; VAT registration for an event held in KSA by a foreign entity; whether a free invite-only hackathon needs a GEA or SCEGA permit; whether the regional headquarters rule affects sponsorship from government-linked entities.

**Top risks:** (1) budgets already set for 2027, so first deals are small: mitigate with VCs and DevRel lines that have discretionary budgets; (2) permit uncertainty: mitigate by holding the first event at a partner's private venue with registration-only entry, after advice; (3) payment delay of 60 to 90 days: mitigate with payment on signature for at least 50 % and no spending before cash.`,
            concepts: ["sh04.country-playbook", "sh04.budget-calendar", "sh04.vat-withholding", "sh04.relationship-norms"],
            difficulty: 3,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh04-l03-q1",
      type: "mcq",
      prompt: md`It is November 2026. A Riyadh corporate's marketing head likes Suhail and asks you to "send something". Why does timing matter most right now?`,
      options: [
        "Because Ramadan starts in November.",
        "Because calendar-year budgets for 2027 are being finalised; an ask that misses them may wait a year.",
        "Because Saudi VAT changes in January.",
        "Because Saudi offices close in December.",
      ],
      answer: 1,
      explanation: md`Most Saudi corporates and government entities run calendar-year budgets set in the autumn. Send a concrete, priced proposal now so it can enter the 2027 budget, or ask for a discretionary amount from this year's.`,
      concepts: ["sh04.budget-calendar"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh04-l03-q2",
      type: "multi",
      prompt: md`Which statements are correct as of the latest information in this lesson?`,
      options: [
        "Saudi Arabia's standard VAT rate is 15 %.",
        "The UAE's standard VAT rate is 5 %.",
        "Kuwait's government fiscal year runs April to March.",
        "Egypt's standard VAT rate is 5 %.",
        "Qatar and Kuwait had not implemented VAT at last information, which must be checked for 2027.",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`Egypt's standard VAT is 14 %, not 5 %. The others are right, with the Qatar and Kuwait point flagged for checking because both signed the GCC VAT framework.`,
      concepts: ["sh04.vat-withholding", "sh04.budget-calendar"],
      difficulty: 1,
    },
    {
      id: "sh04-l03-q3",
      type: "numeric",
      prompt: md`Illustrative: a UAE sponsor pays a fee of USD 10,000 to a UAE-registered Suhail entity that must charge 5 % VAT; no withholding. What is the invoice total in USD?`,
      answer: 10500,
      tolerance: { abs: 1 },
      unit: "USD",
      explanation: md`$I = G(1 + t_v) = 10{,}000\times1.05 = 10{,}500$ USD. Suhail keeps USD 10,000 and remits USD 500 of VAT (less any recoverable input VAT on its own costs).`,
      concepts: ["sh04.vat-withholding"],
      difficulty: 1,
    },
    {
      id: "sh04-l03-q4",
      type: "decision",
      prompt: md`A contact offers to introduce you to a senior official who controls a programme budget, "for a small consideration of 10 % of whatever you get". What do you do?`,
      options: [
        { text: "Accept: it is how things work here.", score: 0, feedback: "A success fee paid to an intermediary for access to an official's budget is a classic bribery red flag under every relevant law and destroys Suhail's credibility." },
        { text: "Decline the fee arrangement, seek an introduction through a legitimate route (a mutual contact, a public programme channel, an official letter), and record the approach.", score: 1, feedback: "Right: introductions are legitimate; paying for influence over a public decision is not. Write it down in case questions arise later." },
        { text: "Accept, but pay the fee as 'consulting' so it looks clean.", score: 0, feedback: "Relabelling a payment for influence makes it worse, not better." },
        { text: "Decline and drop the government entity from the map entirely.", score: 0.5, feedback: "You avoid the risk but lose a possibly legitimate partner. Use the official channel instead." },
      ],
      explanation: md`Warm introductions are normal; payments to intermediaries tied to access or decisions by officials are bribery risks. Use legitimate channels and document refusals.`,
      concepts: ["sh04.relationship-norms"],
      difficulty: 2,
    },
    {
      id: "sh04-l03-q5",
      type: "mcq",
      prompt: md`Why price an Egyptian sponsorship in USD and fix the conversion date in the contract?`,
      options: [
        "Because Egyptian law requires USD contracts.",
        "Because the pound has been volatile since the March 2024 float, and a later conversion date can cut the USD value received.",
        "Because Egyptian VAT applies only to USD invoices.",
        "Because USD invoices avoid withholding.",
      ],
      answer: 1,
      explanation: md`The pound was floated in March 2024 and remains a currency risk. Fixing the conversion date (or invoicing in USD where the partner can pay USD) protects the value you planned on.`,
      concepts: ["sh04.country-playbook"],
      difficulty: 1,
    },
    {
      id: "sh04-l03-q6",
      type: "order",
      prompt: md`Order these 2027 windows from first to last.`,
      items: ["New calendar-year budgets released", "Ramadan (approximately February to March)", "Kuwait government fiscal year starts", "Eid al-Adha (approximately mid-May)", "Gulf summer slowdown", "Budget planning for 2028"],
      explanation: md`January budgets, Ramadan about 8 February to 9 March, Kuwait FY on 1 April, Eid al-Adha about 16 May, summer July and August, 2028 planning September to November.`,
      concepts: ["sh04.budget-calendar"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh04-l03-f1", front: "Standard VAT: Saudi Arabia, UAE, Egypt, Jordan (GST), Lebanon", back: "15 %, 5 %, 14 %, 16 %, 11 %. Qatar and Kuwait: none at last information (check).", concepts: ["sh04.vat-withholding"] },
    { id: "sh04-l03-f2", front: "Withholding gross-up", back: md`$G = N/(1 - t_w)$, not $N(1 + t_w)$.`, concepts: ["sh04.vat-withholding"] },
    { id: "sh04-l03-f3", front: "Government fiscal years: Kuwait, Egypt, most Gulf", back: "Kuwait 1 April to 31 March; Egypt 1 July to 30 June; Saudi Arabia, UAE and Jordan calendar year.", concepts: ["sh04.budget-calendar"] },
    { id: "sh04-l03-f4", front: "Ramadan 2027 (approximate)", back: "About 8 February to 9 March 2027, then Eid al-Fitr; dates set by moon sighting.", concepts: ["sh04.budget-calendar"] },
    { id: "sh04-l03-f5", front: "Introductions versus influence", back: "Using a network to get a meeting is legitimate; giving anything of value to influence a decision is bribery.", concepts: ["sh04.relationship-norms"] },
    { id: "sh04-l03-f6", front: "Saudi event permits (per research brief)", back: "Public or ticketed events: GEA permit; conferences: SCEGA; foreign organisers usually need MISA licence and CR first. Free hackathon: unverified.", concepts: ["sh04.country-playbook"] },
  ],
};

export default lesson;
