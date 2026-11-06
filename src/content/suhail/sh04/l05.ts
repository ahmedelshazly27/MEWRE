import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh04-l05",
  title: "Governance and reputation: conflicts, independence, compliance and saying no",
  summary:
    "A builder community's only asset is trust. Manage conflicts of interest with a register and recusal, keep government alignment from becoming dependence, screen partners and payments for sanctions and bribery risk, handle participant data lawfully, watch revenue concentration, and decline partners by a written policy rather than by mood.",
  minutes: 75,
  objectives: [
    "You can identify and manage conflicts of interest in Suhail, including your own across Afterwave and Mizan.",
    "You can position Suhail between government alignment and independence, and write the rules that protect editorial and programme control.",
    "You can run basic sanctions, anti-bribery and data-protection checks before a partnership is signed.",
    "You can measure revenue concentration and set limits, and decline a partner using a written policy.",
  ],
  concepts: [
    { id: "sh04.conflict-of-interest", name: "Conflict of interest", description: "A situation where a lead's personal or other business interest could influence, or appear to influence, a Suhail decision; managed by disclosure in a register and recusal from the decision.", competency: "sh-partnerships", related: ["sh04.partner-policy"] },
    { id: "sh04.alignment-independence", name: "Government alignment versus independence", description: "The trade-off between working with national programmes (resources, legitimacy, access) and keeping control of programme, speakers, editorial and membership; resolved by explicit written limits, not case by case.", competency: "sh-partnerships", related: ["sh04.revenue-concentration"] },
    { id: "sh04.sanctions-screening", name: "Sanctions and compliance screening", description: "Checking partners, payers, payees and prize winners against UN, US, EU and UK sanctions lists, plus anti-bribery red flags and data-protection obligations, before money or data moves.", competency: "sh-partnerships", related: ["sh04.partner-policy"] },
    { id: "sh04.revenue-concentration", name: "Revenue concentration", description: "Dependence on few partners, measured by the largest share and the Herfindahl-Hirschman index; high concentration hands a partner de facto control of the agenda.", competency: "sh-partnerships", related: ["sh04.alignment-independence"] },
    { id: "sh04.partner-policy", name: "Partner acceptance policy", description: "A written set of criteria (red lines, review triggers, approvers) used to accept, condition or decline partners, so that saying no is consistent and defensible.", competency: "sh-partnerships", related: ["sh04.conflict-of-interest", "sh04.sanctions-screening"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Trust is the asset; governance protects it",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Builders come to Suhail because they believe the hackathon is judged fairly, the newsletter says what it thinks and the introductions are in their interest. You also run Afterwave and Mizan, Mizan sells to Kuwaiti public institutions, and Suhail will talk to the same institutions. One undisclosed conflict, one sponsor that turns out to be sanctioned, or one government partner that quietly vets the speaker list can end a community that has no other asset than its reputation.`,
        },
        {
          kind: "md",
          md: md`### Conflicts of interest

A conflict exists when someone's other interest **could** influence a Suhail decision, or could reasonably **appear** to. Appearance matters as much as fact in a small regional ecosystem.

Typical conflicts in a community company:
- A lead works for, advises or is negotiating with a partner (the Partnerships lead's employer wants to sponsor).
- An investor-judge has invested in, or is negotiating with, a team in the competition.
- **Your own ventures:** Mizan's soiling analytics pilot targets Shagaya Phase I with KISR researchers as methodology partner; if Suhail approaches Kuwaiti public entities or researchers, the same people may see you in two roles. Afterwave may want to hire from Suhail's talent pool.
- A volunteer is paid by a sponsor to run its workshop.

**Mechanism:** a register (who, which organisation, nature of the interest, date disclosed), updated at least quarterly and whenever a new partner appears; **recusal** (the conflicted person leaves the decision, another lead decides and records it); and **separation** (Suhail introductions to your own ventures go through the same opt-in process as anyone else's, and you never use Suhail data for Afterwave or Mizan).

### Government alignment versus independence

Working with national AI programmes brings resources, venues, legitimacy and access to the builders those programmes fund. It also brings risks: a partner that wants to approve speakers, shape the narrative or limit who may attend.`,
        },
        {
          kind: "matrix",
          title: "Alignment and independence",
          xAxis: ["Low alignment with national programmes", "High alignment with national programmes"],
          yAxis: ["Low independence (partner controls content)", "High independence (Suhail controls content)"],
          cells: [
            { label: "Niche and fragile", detail: "Independent but isolated: credible with some builders, few resources, little access. Sustainable only with diverse private revenue." },
            { label: "Target zone", detail: "Works with national programmes on shared goals (talent, Arabic AI, open models) while keeping written control of programme, judging, editorial and membership." },
            { label: "Irrelevant", detail: "Neither resourced nor independent: a vendor's events team under another name." },
            { label: "Captured", detail: "Resourced and aligned, but the partner decides speakers, topics and attendance. Builders notice, and the best ones leave." },
          ],
          caption: "Top row: Suhail controls content. Aim for the top-right cell and write down the limits that keep you there.",
        },
        {
          kind: "md",
          md: md`**Written limits that keep you in the target zone:** no partner approves speakers, judges or editorial content; sponsored content is labelled; attendance criteria are Suhail's and published; any partner may decline to sponsor a specific session but not change it; the same rules apply to every partner, government or private.

### Revenue concentration

The partner that pays most sets the agenda in practice, whatever the contract says. Measure it:`,
        },
        { kind: "equation", formula: "sh04-hhi" },
        {
          kind: "md",
          md: md`$1/\text{HHI}$ is the effective number of partners: 0.25 means four equal partners' worth of diversification. A sensible Suhail policy (illustrative): no single partner above 30 % of annual partner revenue, and no single government-linked group above 40 %, measured on the trailing twelve months.

### Compliance: sanctions, bribery, data

**Sanctions.** Before money or prizes move, screen the counterparty (and the ultimate owner of a company) against the UN Security Council consolidated list, the US OFAC lists (including the SDN list), the EU consolidated list and the UK sanctions list. Which lists bind Suhail depends on its entity, its banks and the nationality of its people: a Dutch or EU entity must comply with EU sanctions; US persons and US-dollar payments bring OFAC exposure; banks apply their own screening to everything. In the Levant the risk is concrete: US-designated entities linked to Hezbollah operate in Lebanon, and Syria's sanctions regime was changing in 2025 and 2026.

**Bribery.** Anything of value given to an official or a private employee to influence a decision is bribery: cash, gifts, travel, a paid speaking slot, a job for a relative. Laws with reach beyond their borders (the UK Bribery Act 2010, the US FCPA) can apply depending on Suhail's links to those countries, and every market in this module has its own anti-corruption law. Red flags: success fees to intermediaries for access to officials, requests to pay a third party, unusual payment routes, hospitality for officials beyond modest norms.

**Data.** Sharing participant data with sponsors needs a lawful basis, normally specific consent. Saudi Arabia's Personal Data Protection Law (in force, enforced from September 2024), the UAE's federal data protection law (Federal Decree-Law 45 of 2021), Egypt's Law 151 of 2020 and the EU GDPR (if Suhail is an EU entity or processes data of people in the EU) all point the same way: tell people what is shared with whom, get consent per partner, keep a record.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Compliance points that move fast",
          md: md`The scope of US and EU sanctions on Syria changed substantially during 2025 (the US announced sanctions relief in mid-2025), and the current position in November 2026 was not verified for this lesson. US export controls on advanced AI chips to Gulf countries also changed several times in 2025; any compute partnership for the research arm needs a current check. Implementing regulations and enforcement dates of Egypt's data protection law were not verified. Get each from a current official source or a lawyer before relying on it.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Measuring dependence and deciding",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "A year-one revenue mix dominated by one partner (illustrative)",
          given: md`Illustrative; no partner exists. Year-one partner revenue: partner A (government-linked) USD 60k; B USD 20k; C USD 10k; D USD 10k. Total USD 100k. Policy: largest share at most 30 %.`,
          steps: [
            { md: md`**Shares:** $\sigma = 0.60, 0.20, 0.10, 0.10$.` },
            { md: md`**HHI:** $0.60^2 + 0.20^2 + 0.10^2 + 0.10^2 = 0.36 + 0.04 + 0.01 + 0.01 = 0.42$. Effective number of partners $1/0.42 = 2.4$.` },
            { md: md`**Policy check:** A's 60 % share is twice the 30 % limit. To bring A to 30 % without reducing it, total revenue must reach $60/0.30 = 200$ USD k: another USD 100k from other partners.` },
            { md: md`**Options:** accept A's money but cap what it buys (no programme or speaker rights, no multi-year exclusivity, clear reputational termination); grow other partners with a dated plan; or accept a smaller A contribution this year. Disclose the dependence to your team in writing so the decision is deliberate.` },
          ],
          result: md`HHI 0.42 and a 60 % top share mean A could, in practice, set Suhail's agenda. Take the money only with written limits, and treat diversification as a target with a number: USD 100k of other partner revenue.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: after adding two partners",
          given: md`Illustrative. You add partners E and F at USD 15k each. Revenue is now A 60, B 20, C 10, D 10, E 15, F 15 (USD k).`,
          steps: [
            { md: md`Total $= 130$ USD k. Largest share $\sigma_A = 60/130$.` },
            { md: md`$\sigma_A = $ **0.462** (46.2 %).`, hidden: true, check: { prompt: "Largest share (fraction)", answer: 0.462, tolerance: { abs: 0.002 } } },
            { md: md`HHI $= (60^2 + 20^2 + 10^2 + 10^2 + 15^2 + 15^2)/130^2 = 4{,}650/16{,}900$.` },
            { md: md`HHI $= $ **0.275**.`, hidden: true, check: { prompt: "HHI", answer: 0.275, tolerance: { abs: 0.002 } } },
          ],
          result: md`Effective partners rise from 2.4 to $1/0.275 = 3.6$, but A is still at 46 %, well above the 30 % limit. Diversification is slow when one partner is large: the policy should also shape how large A's contribution may be.`,
        },
        {
          kind: "question",
          question: {
            id: "sh04-l05-p1",
            type: "numeric",
            prompt: md`Five partners contribute equally. What is the HHI?`,
            answer: 0.2,
            tolerance: { abs: 0.001 },
            explanation: md`Each share is 0.2; HHI $= 5\times0.2^2 = 0.20 = 1/5$. For $n$ equal partners HHI is $1/n$, which is why $1/\text{HHI}$ reads as the effective number of partners.`,
            concepts: ["sh04.revenue-concentration"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Governance in practice",
      blocks: [
        {
          kind: "md",
          md: md`### Who does what

- **You:** chair partner decisions with government involvement, exclusivity, data sharing or any red-flag result; you recuse yourself where Afterwave or Mizan is involved, and another lead decides.
- **Partnerships lead:** runs screening and the register entry for every new partner before P3.
- **Finance lead:** screens payers and payees (including prize winners and reimbursed speakers) before money moves; keeps the record.
- **Editorial lead:** applies the labelling and independence rules to newsletter and podcast.

### Tools

Free official sanctions search tools exist for each list (OFAC's sanctions list search, the UN consolidated list, the EU sanctions map and the UK sanctions list search). For a volunteer team with few partners, documented manual checks are acceptable; once payments are frequent, a paid screening service or your bank's tools are better. Keep a one-line record per check: who, which lists, date, result.

### Saying no

Saying no is a skill and a policy, not a mood. A written partner acceptance policy has three parts: **red lines** (automatic decline), **review triggers** (decide with conditions, approved by two leads) and **approvers**. Decline politely and briefly, without lecturing: "Thank you; this one is not a fit for Suhail's programme this year." Keep the door open where the reason is timing or fit, and keep a record of why.`,
        },
        {
          kind: "checklist",
          title: "Before any partnership reaches P3",
          items: [
            "Register checked: does any lead (including you) have an interest in this partner? Recusal recorded if so.",
            "Partner and its ultimate owner screened against UN, OFAC, EU and UK lists; result and date recorded.",
            "No intermediary is being paid for access to an official or decision maker.",
            "The partner accepts Suhail's written limits on programme, speakers, judging and editorial.",
            "Data sharing, if any, is consent-based per partner and documented.",
            "Concentration after this deal stays within policy, or the exception is approved in writing.",
          ],
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Reputation is regional",
          md: md`The region's builders follow politics closely. Partners whose brands are the target of boycott campaigns, or who are seen as politically controversial in one country, can make an event in another country contentious. You cannot please everyone, and you should not try, but you should know before you sign who your partners are in your builders' eyes, and decide deliberately.`,
        },
        { kind: "xref", to: "fc09-l06", note: "Founder Core decision making under uncertainty: pre-mortems and decision journals. Run a pre-mortem before accepting any partner above the concentration limit." },
        { kind: "scenario", scenario: "sh04-s2" },
        {
          kind: "feynman",
          prompt: "Explain to a sponsor's government-relations director, politely, why Suhail will not let any partner approve speakers, and why that protects the partner too.",
          keyPoints: [
            "Builders attend because they trust the programme is chosen on merit.",
            "If one partner approves speakers, every partner's association with Suhail loses value.",
            "The same rule applies to every partner, government or private.",
            "The partner can decline to sponsor a session without changing it.",
          ],
        },
        { kind: "sources", refs: ["sh04-r12", "sh04-r13", "sh04-r14", "sh04-r15", "sh04-r16", "sh04-r17"] },
        {
          kind: "question",
          question: {
            id: "sh04-l05-p2",
            type: "short",
            explanation: md`A good policy is short, specific and enforceable: concrete red lines, defined review triggers with approvers, a conflict register with recusal that covers the founder's own ventures, screening steps with records, and a concentration limit with a number.`,
            prompt: md`Write Suhail's partner acceptance and conflict-of-interest policy (one page) for adoption by the leads in January 2027. Include: red lines, review triggers and who approves, the conflict register and recusal rule (including how your own ventures Afterwave and Mizan are handled), the screening steps, the editorial independence rules, the concentration limits, and a two-sentence template for declining a partner.`,
            rubric: [
              "Red lines are concrete (for example sanctioned parties, payments for access to officials, partner approval of speakers or judges, participant data without consent).",
              "Review triggers are defined with named approvers and a two-person rule.",
              "The conflict register and recusal rule explicitly cover the founder's other ventures and investor-judges.",
              "Screening steps name the lists checked and the record kept, for partners and for payees.",
              "Includes numeric concentration limits and editorial independence rules.",
              "Includes a short, polite decline template that does not lecture and leaves the door open where appropriate.",
            ],
            modelAnswer: md`**Suhail partner acceptance and conflicts policy (v1, January 2027)**

**Red lines (decline):** any party on the UN, OFAC, EU or UK sanctions lists, or owned or controlled by one; any request to pay a third party or intermediary for access to an official or decision maker; any condition that a partner approves speakers, judges, editorial content or attendance; any request for participant data without per-partner consent; exclusivity on models, datasets or research outputs.

**Review triggers (two leads approve, one of them not conflicted):** government or government-linked partners; any partner above 30 % of trailing-twelve-month partner revenue, or a government-linked group above 40 %; any exclusivity; any partner in a sector or country that is politically sensitive for our builders; any partner linked to a lead.

**Conflicts:** every lead discloses employment, advisory roles, investments and negotiations with any partner or candidate partner; register updated quarterly and on every new partner. Conflicted leads leave the decision; the decision and recusal are minuted. I disclose Afterwave and Mizan: I do not decide on partners that are customers, prospects or institutions Mizan is engaged with (including KISR and Kuwaiti public entities), and my ventures access Suhail talent only through the same opt-in process as any employer. Investor-judges declare portfolio and negotiation conflicts before judging and do not score those teams.

**Screening:** before P3, the Partnerships lead screens the partner and its ultimate owner on the four lists and records lists, date and result; the Finance lead screens every payee (prize winners, speakers reimbursed, vendors) before payment.

**Editorial independence:** no partner approves content; sponsored content is labelled; the same rules apply to every partner.

**Decline template:** "Thank you for your interest in partnering with Suhail. After review this is not a fit for our programme this year, and we would be glad to stay in touch."`,
            concepts: ["sh04.partner-policy", "sh04.conflict-of-interest", "sh04.sanctions-screening", "sh04.revenue-concentration"],
            difficulty: 3,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh04-l05-q1",
      type: "mcq",
      prompt: md`An investor-judge's fund is negotiating a term sheet with one of the finalist teams. What is the correct handling?`,
      options: [
        "Nothing: negotiations are confidential.",
        "The judge declares the conflict and does not score that team; another judge's score is used or the panel normalises.",
        "Remove the team from the competition.",
        "Let the judge score but halve the weight.",
      ],
      answer: 1,
      explanation: md`Disclose and recuse. The team should not be penalised for attracting investor interest, and the judge should not influence its result.`,
      concepts: ["sh04.conflict-of-interest"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh04-l05-q2",
      type: "numeric",
      prompt: md`Partner revenue: USD 50k, 30k, 20k. What is the HHI?`,
      answer: 0.38,
      tolerance: { abs: 0.001 },
      explanation: md`Shares 0.5, 0.3, 0.2. HHI $= 0.25 + 0.09 + 0.04 = 0.38$; effective partners $1/0.38 = 2.6$.`,
      concepts: ["sh04.revenue-concentration"],
      difficulty: 1,
    },
    {
      id: "sh04-l05-q3",
      type: "multi",
      prompt: md`Which are bribery red flags in a partnership?`,
      options: [
        "A success fee to an intermediary tied to an official's approval of funding.",
        "A request to pay part of the sponsorship to a third party's account.",
        "A warm introduction from a mutual contact, with no payment.",
        "Business-class travel and a paid speaking fee offered to an official who decides on Suhail's grant.",
        "A published sponsorship package with standard prices.",
      ],
      answer: [0, 1, 3],
      explanation: md`Payments to intermediaries for access, unusual payment routes and valuable benefits to decision makers are classic red flags. Introductions and published prices are normal practice.`,
      concepts: ["sh04.sanctions-screening"],
      difficulty: 2,
    },
    {
      id: "sh04-l05-q4",
      type: "mcq",
      prompt: md`On the alignment and independence map, a community that works with national programmes but lets them approve speakers is:`,
      options: ["Target zone", "Captured", "Niche and fragile", "Irrelevant"],
      answer: 1,
      explanation: md`High alignment, low independence: captured. Builders notice, and the best ones stop coming.`,
      concepts: ["sh04.alignment-independence"],
      difficulty: 1,
    },
    {
      id: "sh04-l05-q5",
      type: "decision",
      prompt: md`A prize winner at your Cairo hackathon asks you to pay the USD 2,000 prize to a company account in a third country, not in their name. What do you do?`,
      options: [
        { text: "Pay as requested; it is their prize.", score: 0.1, feedback: "A third-party route for a payee is a red flag; you do not know who you are paying." },
        { text: "Pay only to an account in the winner's (or their team company's) verified name after screening; ask for the reason and record it.", score: 1, feedback: "Right: verify and screen the actual payee, record the reason, and use a normal payment route." },
        { text: "Cancel the prize.", score: 0.3, feedback: "Too harsh without understanding the reason; there may be a legitimate explanation, but the payment must go to a verified, screened payee." },
      ],
      explanation: md`Screen payees, not just partners, and pay verified accounts in the payee's own name.`,
      concepts: ["sh04.sanctions-screening"],
      difficulty: 2,
    },
    {
      id: "sh04-l05-q6",
      type: "mcq",
      prompt: md`Why does a written partner acceptance policy help you say no?`,
      options: [
        "It makes every decline automatic.",
        "It makes declines consistent and defensible, and separates red lines from cases that need a reviewed decision.",
        "It lets you avoid telling partners anything.",
        "It is required by GDPR.",
      ],
      answer: 1,
      explanation: md`Policy turns a personal judgement into a consistent rule: red lines decline automatically, review triggers get a two-person decision, and the partner hears a brief, polite answer.`,
      concepts: ["sh04.partner-policy"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh04-l05-f1", front: "Conflict-of-interest mechanism", back: "Register (who, organisation, interest, date), recusal from the decision, separation of data and introductions.", concepts: ["sh04.conflict-of-interest"] },
    { id: "sh04-l05-f2", front: "Target zone on the alignment and independence map", back: "Works with national programmes on shared goals while keeping written control of programme, judging, editorial and membership.", concepts: ["sh04.alignment-independence"] },
    { id: "sh04-l05-f3", front: "Four sanctions lists to screen against", back: "UN Security Council consolidated list, US OFAC (including SDN), EU consolidated list, UK sanctions list.", concepts: ["sh04.sanctions-screening"] },
    { id: "sh04-l05-f4", front: "HHI and effective number of partners", back: md`$\text{HHI} = \sum \sigma_j^2$; effective partners $= 1/\text{HHI}$.`, concepts: ["sh04.revenue-concentration"] },
    { id: "sh04-l05-f5", front: "Three parts of a partner acceptance policy", back: "Red lines (decline), review triggers (two-person decision), approvers.", concepts: ["sh04.partner-policy"] },
    { id: "sh04-l05-f6", front: "Lawful basis for sharing participant data with a sponsor", back: "Normally specific consent per partner, with a record (Saudi PDPL, UAE PDPL, Egypt Law 151/2020, GDPR where it applies).", concepts: ["sh04.sanctions-screening"] },
  ],
  scenarios: [
    {
      id: "sh04-s2",
      title: "The anchor partner and the speaker list",
      dayInLife: true,
      context: md`Illustrative. Suhail Season, the planned conference, has one anchor partner: a government-linked entity providing the venue and USD 80k, which would be 55 % of the event's partner revenue. Three weeks before the programme is published, its events manager emails: "Our leadership would like to review the speaker list, and we suggest removing one speaker who has criticised our national AI strategy online. We would also like our minister to give the opening keynote."`,
      start: "a",
      concepts: ["sh04.alignment-independence", "sh04.revenue-concentration", "sh04.partner-policy"],
      nodes: {
        a: {
          md: md`Your Events lead says: "We cannot lose them; just drop the speaker, nobody will notice." How do you respond?`,
          choices: [
            { text: "Separate the asks: welcome a keynote by the minister (a normal benefit for a host partner), but explain that the speaker list is not subject to partner review under the policy every partner signed.", next: "b", score: 9, feedback: "Right: give generously what the policy allows, hold firmly what it does not, and frame it as protecting the partner's own association with a credible event." },
            { text: "Drop the speaker quietly and accept the review.", next: "c", score: 1, feedback: "You move into the captured cell. Speakers talk; builders will hear of it, and every other partner now knows the policy is negotiable." },
            { text: "Reject both requests and publish the email to show independence.", next: "d", score: 2, feedback: "Independence does not require public confrontation. The keynote request is reasonable, and publishing a partner's email destroys trust with every institution." },
          ],
        },
        b: {
          md: md`The events manager replies that leadership is unhappy and may reduce support. What next?`,
          choices: [
            { text: "Ask for a call with the decision owner, bring the results you can promise (attendance, builders, media), restate the policy calmly, and prepare the reduced-scope budget in case support drops.", score: 9, feedback: "Right: escalate to the person who decides, lead with value, keep the principle, and protect the event financially at the same time." },
            { text: "Offer to drop the speaker if they keep full funding.", score: 2, feedback: "Trading the principle for money after stating it is the worst of both outcomes." },
          ],
        },
        c: {
          md: md`Two weeks after the conference, the removed speaker posts about it. Other speakers ask whether their talks were vetted. What now?`,
          choices: [
            { text: "Acknowledge the mistake, adopt and publish the speaker policy, and reduce dependence on any single partner for next year.", score: 5, feedback: "Recovery is possible but costly; the concentration that made the pressure work must be fixed." },
            { text: "Deny that any partner influenced the programme.", score: 0, feedback: "A false denial turns a mistake into a lie, which is far harder to recover from." },
          ],
        },
        d: {
          md: md`The partner withdraws publicly and other government-linked entities go quiet. What now?`,
          choices: [
            { text: "Apologise privately for the publication, keep the policy, and rebuild relationships through a working-level contact over the next months.", score: 5, feedback: "The policy was right; the method was not. Repair takes time." },
            { text: "Escalate the conflict in the media.", score: 0, feedback: "Escalation closes doors across the region for years." },
          ],
        },
      },
    },
  ],
};

export default lesson;
