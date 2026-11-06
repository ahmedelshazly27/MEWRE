import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh06-l05",
  title: "Ecosystem gaps: where Suhail can add value and where it must not compete",
  summary:
    "Map the roles in the Arab tech and AI ecosystem (states and national champions, capital, research institutions, corporates and hyperscalers, communities and media), find the gaps between them that a neutral, cross-border builder community can fill, score candidate offerings with a simple gap score, and draw the lines Suhail should not cross: compute, frontier model training, investing, and becoming one state's channel.",
  minutes: 70,
  objectives: [
    "Describe the five ecosystem roles and what each is structurally good and bad at",
    "Identify gaps that follow from those structures (cross-border networks, Arabic-first technical media, independent evaluation, early-stage access, diaspora links)",
    "Score candidate offerings with G = I(1 - c)a and defend the scores",
    "Explain why Suhail should not provide compute, train frontier models, invest, or take exclusive state branding",
    "Write a where-we-play and where-we-do-not statement for Suhail",
  ],
  concepts: [
    { id: "sh06.ecosystem-roles", name: "Ecosystem roles", description: "States and national champions, capital providers, research institutions, corporates and hyperscalers, and communities and media each have structural strengths and blind spots; gaps sit between them.", competency: "sh-landscape", related: ["sh06.gap-score", "sh06.neutral-convenor"] },
    { id: "sh06.gap-score", name: "Gap score", description: "G = I(1 - c)a: importance of the need times how uncovered it is times Suhail's advantage. Fully covered needs score zero and are partnership territory.", competency: "sh-landscape", related: ["sh06.ecosystem-roles", "sh06.complement-not-compete"] },
    { id: "sh06.complement-not-compete", name: "Complement, do not compete", description: "Where a well-funded player already serves a need (compute, foundation models, accelerators), Suhail partners and routes builders to it instead of building a weaker copy.", competency: "sh-landscape", related: ["sh06.gap-score"] },
    { id: "sh06.neutral-convenor", name: "Neutral convenor", description: "A community trusted by builders, sponsors and rival states because it is independent, cross-border and transparent about money. Neutrality is Suhail's main asset and is lost through exclusivity, undisclosed sponsorship or investing in its own members.", competency: "sh-landscape", related: ["sh06.ecosystem-roles", "sh06.conflict-of-interest"] },
    { id: "sh06.conflict-of-interest", name: "Conflict of interest in a community", description: "When the convenor also invests in, hires from or is paid by some members, its curation (who wins, who is introduced) stops being trusted. Disclosure, separation and rules on who judges what are the controls.", competency: "sh-landscape", related: ["sh06.neutral-convenor"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Roles, structural blind spots and the gaps between them",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Suhail has volunteer leads, no revenue and a plan that starts in January 2027. It cannot do everything, and the landscape already has organisations with billions of dollars doing some of what Suhail might be tempted to do. Choosing the gaps where a small, trusted, cross-border community has an edge, and refusing the rest, is the strategy. This lesson turns the landscape of Lessons 1 to 4 into that choice.`,
        },
        {
          kind: "md",
          md: md`### Five roles and their blind spots

| Role | Examples (from Lessons 1 to 4) | Structurally good at | Structurally weak at |
|---|---|---|---|
| **States and national champions** | SDAIA, HUMAIN, G42, TII, Qai | Capital, compute, national priorities, models | Cross-border neutrality (each serves its own country); fast, informal builder engagement; criticising their own claims |
| **Capital** | SVC, Jada, MGX, regional VCs, F6 Group, Sanabil 500 | Money, selection, later-stage support | Very early, pre-company builders; non-venture projects; sharing deal flow with rivals |
| **Research institutions** | MBZUAI, KAUST, QCRI, national universities | Models, papers, students, compute | Product building, reaching non-academic builders, dialect and applied evaluation outside their agenda |
| **Corporates and hyperscalers** | Microsoft, AWS, Oracle, Nvidia, telcos | Credits, cloud regions, enterprise buyers | Neutrality between vendors; community trust |
| **Communities and media** | Suhail (planned); in Europe {Tech: Europe}; globally MLH | Trust, speed, cross-border reach, curation, storytelling | Capital, compute, permanence; easily captured by a sponsor |

### The gaps that follow

The gaps are not random; they sit exactly where each role's structure stops:

1. **A cross-border builder network.** National programmes serve nationals; VCs serve portfolio companies. Nobody's mandate is "every serious Arab builder, wherever they are". MENA funding was 66% UAE in H1 2026 (MAGNiTT); builders in Cairo, Amman or Tunis are far from that money.
2. **Arabic-first technical media.** Coverage of regional AI often repeats press releases. Independent, bilingual, technically literate writing (Lesson 2's model reviews, Lesson 3's funding reconciliation) is scarce.
3. **Independent applied evaluation.** OALL, BALSAM and ABBL exist (Lesson 2), but dialect and real-task evaluation for products is thin; a community can contribute test items and run applied challenges.
4. **The pre-seed gap.** Fewer, larger rounds and AI concentration (Lesson 3) leave very early teams with few doors; Suhail can be the place where they become visible, without investing itself.
5. **Diaspora connection.** No institution's mandate is keeping diaspora engineers involved (Lesson 4).
6. **Open data.** National labs train on hundreds of billions of Arabic tokens; the largest public cleaned sets are tens of billions (Lesson 2). A research arm can contribute open datasets and benchmarks.

### Where Suhail must not compete

| Do not | Because | Instead |
|---|---|---|
| Provide compute or data centres | Capital-intensive; HUMAIN, G42 and hyperscalers have gigawatt plans | Broker credits from them for builders |
| Train a frontier-scale Arabic foundation model | Jais 2 (70B), ALLaM 34B and Falcon-H1 Arabic exist with state backing; a 7B pretrain alone is a six-figure USD compute bill before data and team (Lesson 2) | Build data, evaluation and small specialised models; build on open weights |
| Invest in members | Creates a conflict with curation and with VC sponsors | Introduce builders to investors; disclose any personal investments |
| Run a cash accelerator | F6 Group, Sanabil 500, Hub71 and others do it with funded teams | Feed accelerators with prepared teams; partner on demo days |
| Become one state's channel | Destroys cross-border neutrality | Multi-sponsor model, no exclusivity on core programmes, sponsorship disclosed |`,
        },
        {
          kind: "matrix",
          title: "Where to play: incumbent coverage vs Suhail's advantage",
          xAxis: ["Low Suhail advantage", "High Suhail advantage"],
          yAxis: ["Well covered by incumbents", "Poorly covered by incumbents"],
          cells: [
            { label: "Open but not ours", detail: "Real gaps Suhail is not equipped for (for example a regional legal-aid service for startups). Point to others or revisit later." },
            { label: "Play here", detail: "Cross-border builder network, Arabic-first technical media, diaspora connection, applied evaluation challenges." },
            { label: "Stay out", detail: "Compute, frontier models, investing, cash accelerators: well funded incumbents and no edge for Suhail." },
            { label: "Partner here", detail: "Covered needs where Suhail's network helps the incumbent: credits distribution, accelerator pipelines, university outreach." },
          ],
          caption: "Top-left, top-right, bottom-left, bottom-right. The gap score below puts numbers on the same judgment.",
        },
        { kind: "equation", formula: "sh06-gap-score" },
        {
          kind: "md",
          md: md`Score importance $I$ and advantage $a$ from 1 to 5 and coverage $c$ from 0 to 1, each with a written reason. The multiplication is deliberate: a need that is fully covered, or one where Suhail has no advantage, should not survive however important it sounds. The scores are judgments; the value is that every lead argues about the same three factors.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Gap claims are hypotheses",
          md: md`"Nobody serves X" is the riskiest sentence in any ecosystem plan. The course research did not survey existing Arab builder communities, newsletters or hackathon organisers, so the gaps above are hypotheses from structure. Before launching an offering, list who already does it (Lesson 6's landscape map) and talk to them: some will be partners.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Scoring candidate offerings",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Gap scores for eight candidate offerings (illustrative scores)",
          given: md`Scores are **illustrative judgments** to show the method, with one-line reasons. $I$ and $a$ on 1 to 5, $c$ on 0 to 1, $G = I(1-c)a$, maximum 25.`,
          steps: [
            { md: md`**Cross-border builder network and hackathons:** $I = 5$ (builders want peers, employers, investors), $c = 0.3$ (national and corporate events exist, few cross-border), $a = 4$ (bilingual, regional, volunteer leads across countries). $G = 5\times0.7\times4 = 14.0$.` },
            { md: md`**Diaspora mentoring and return sessions:** $I = 4$, $c = 0.2$, $a = 4$. $G = 4\times0.8\times4 = 12.8$.` },
            { md: md`**Arabic-first technical media (newsletter, The Majlis):** $I = 4$, $c = 0.3$, $a = 4$. $G = 4\times0.7\times4 = 11.2$.` },
            { md: md`**Pre-seed investor introductions and demo days:** $I = 5$, $c = 0.5$ (accelerators and Hub71 cover part), $a = 3$. $G = 5\times0.5\times3 = 7.5$.` },
            { md: md`**Dialect evaluation sets and model reviews:** $I = 4$, $c = 0.4$ (OALL, BALSAM, ABBL), $a = 3$. $G = 4\times0.6\times3 = 7.2$.` },
            { md: md`**Cash accelerator:** $I = 4$, $c = 0.7$, $a = 2$. $G = 4\times0.3\times2 = 2.4$.` },
            { md: md`**Compute provision:** $I = 5$, $c = 0.9$, $a = 1$. $G = 5\times0.1\times1 = 0.5$. **Training a 70B Arabic model:** $I = 3$, $c = 0.9$, $a = 1$. $G = 0.3$.` },
          ],
          result: md`Ranking: network 14.0, diaspora 12.8, media 11.2, investor introductions 7.5, evaluation 7.2, accelerator 2.4, compute 0.5, frontier model 0.3. The top three are the core; investor introductions and evaluation are good second-year products, the latter as the research arm's first output; the bottom three are partnership or stay-out territory. The arithmetic matches the matrix, which is the point: the scoring makes the reasoning explicit.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Score two more offerings",
          given: md`Illustrative scores. **(A) An open Arabic dialect speech dataset** built with hackathon participants: $I = 4$, $c = 0.3$, $a = 3$. **(B) A paid job board** for regional tech roles: $I = 4$, $c = 0.7$ (global and regional job boards exist), $a = 2$.`,
          steps: [
            { md: md`(A) $G = 4\times(1-0.3)\times3$.` },
            { md: md`$= 8.4$.`, hidden: true, check: { prompt: "Gap score A", answer: 8.4, tolerance: { abs: 0.05 } } },
            { md: md`(B) $G = 4\times(1-0.7)\times2$.` },
            { md: md`$= 2.4$.`, hidden: true, check: { prompt: "Gap score B", answer: 2.4, tolerance: { abs: 0.05 } } },
            { md: md`(B) with a curated, consent-based "hackathon finalists" showcase instead of a generic board: $c = 0.3$, $a = 4$: $G = 4\times0.7\times4$.` },
            { md: md`$= 11.2$: the same need scores four times higher when shaped around Suhail's advantage.`, hidden: true, check: { prompt: "Gap score B reshaped", answer: 11.2, tolerance: { abs: 0.05 } } },
          ],
          result: md`The dataset is a solid research-arm candidate. A generic job board is not worth building; a curated finalist showcase, which only Suhail can produce, is. Reshaping an offering towards the advantage is often better than dropping it.`,
        },
        {
          kind: "question",
          question: {
            id: "sh06-l05-p1",
            type: "numeric",
            prompt: md`An Arabic AI podcast already exists with a strong audience, so for The Majlis $c = 0.6$. Importance $I = 4$, advantage $a = 3$. What is $G$?`,
            answer: 4.8,
            tolerance: { abs: 0.05 },
            explanation: md`$4\times0.4\times3 = 4.8$. Lower than when the space is open: differentiate The Majlis (builders and investors, colloquial Arabic, hackathon stories) or partner. The existing podcast here is hypothetical.`,
            concepts: ["sh06.gap-score"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Holding the line in practice",
      blocks: [
        {
          kind: "md",
          md: md`### Rules that keep Suhail neutral

- **No exclusivity on core programmes.** A sponsor can own a track or a prize, not the whole community. Title sponsorship of one event is fine if disclosed and time-limited.
- **Model-agnostic by default.** Hackathon rules let teams choose any model; a sponsor track can reward use of its stack.
- **Sponsorship is labelled.** Every sponsored newsletter item and episode says so.
- **Judging is separated from paying.** Sponsors can judge their own track, not the overall prize; judges declare conflicts.
- **Leads disclose.** Any lead who invests in, advises or works for a member company or sponsor declares it and steps out of related decisions.
- **Cross-border by design.** Rotate host cities; keep an online track; publish where participants come from.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How communities lose neutrality",
          md: md`- Accepting a large exclusive sponsor early, when there is no alternative revenue, and then being unable to say no.
- Leads starting to angel-invest in finalists they selected.
- A newsletter that only covers sponsors.
- Running every event in the sponsor's home country.`,
        },
        { kind: "scenario", scenario: "sh06-s2" },
        {
          kind: "question",
          question: {
            id: "sh06-l05-p2",
            type: "short",
            prompt: md`Write Suhail's "Where we play, where we do not" statement for the website and the sponsor deck (about 250 words). Name three to four offerings Suhail will run with the gap each fills, three to four things Suhail will not do with the reason and the partner it will route builders to instead, and the neutrality rules that hold it together. No invented members, sponsors or numbers.`,
            rubric: [
              "Offerings are tied to specific structural gaps from the landscape (cross-border network, Arabic-first media, diaspora, applied evaluation or early-stage visibility)",
              "Exclusions include at least compute, frontier model training and investing, each with a reason grounded in the landscape",
              "For each exclusion, names a partner category to route builders to",
              "States concrete neutrality rules (no exclusivity on core programmes, labelled sponsorship, conflict disclosure, model-agnostic rules)",
              "Written in a public-facing voice suitable for both builders and sponsors",
              "Contains no invented traction, partners or numbers for Suhail",
            ],
            modelAnswer: md`**Where Suhail plays**

Suhail (سهيل) is a builder ecosystem for the whole Arab world. We do four things:

- **Bring builders together across borders.** Hackathons and Suhail Season rotate between the Gulf, Egypt, the Levant and the Maghreb, always with an online track, because talent is everywhere and opportunity is concentrated.
- **Write and talk about Arab tech honestly, in Arabic and English.** Our newsletter and The Majlis podcast report what is announced, what is running and what is evidence, with sources and dates.
- **Keep the diaspora close.** Arab engineers and researchers abroad mentor, judge and return through Suhail.
- **Test Arabic AI on real tasks.** Our planned research arm will publish open datasets and dialect evaluations and contribute to existing benchmarks.

**Where we do not**

- **Compute and data centres:** national champions and cloud providers do this at gigawatt scale; we help builders get their credits.
- **Frontier foundation models:** national labs train them; we build data and evaluation, and build on open weights.
- **Investing:** we introduce builders to investors and accelerators; Suhail does not take equity in members.
- **Accelerators with cash:** existing programmes do it well; we send them prepared teams.

**How we stay neutral**

No sponsor owns a core programme. Sponsored content is labelled. Teams choose their own models. Sponsors judge only their own tracks. Every lead discloses investments and advisory roles and steps out of related decisions.`,
            explanation: md`Graders check that each choice follows from a landscape gap or an incumbent, that exclusions route to partners, and that neutrality is concrete.`,
            concepts: ["sh06.gap-score", "sh06.complement-not-compete", "sh06.neutral-convenor"],
            difficulty: 2,
          },
        },
        { kind: "xref", to: "fc01-l03", note: "The idea evaluation rubric and bottom-up sizing: the gap score is the same discipline applied to Suhail's candidate offerings, and Lesson 3 there scores Suhail's ceiling as a non-venture business." },
        { kind: "xref", to: "fc03-l01", note: "Positioning with competitive alternatives: the where-we-play statement is Suhail's positioning against national programmes, accelerators and other communities." },
        { kind: "xref", to: "fc06-l08", note: "Market structure and network effects: why a builder community tends to a few strong positions rather than one winner, which argues for a clear niche." },
        { kind: "xref", to: "sh02-l01", note: "The {Tech: Europe} and MLH models: how comparable communities structure hackathons and sponsorship without losing their audience." },
      ],
    },
  ],
  quiz: [
    {
      id: "sh06-l05-q1",
      type: "numeric",
      prompt: md`$I = 5$, $c = 0.2$, $a = 3$. Gap score?`,
      answer: 12,
      tolerance: { abs: 0.05 },
      explanation: md`$5\times0.8\times3 = 12$.`,
      concepts: ["sh06.gap-score"],
      difficulty: 1,
    },
    {
      id: "sh06-l05-q2",
      type: "mcq",
      prompt: "Why does the gap score multiply its factors instead of adding them?",
      options: [
        "To make the numbers bigger",
        "So that a fully covered need (c = 1) or one where Suhail has no edge scores near zero however important it is",
        "Because coverage matters more than importance",
        "Because the factors are measured in the same units",
      ],
      answer: 1,
      explanation: md`Multiplication makes each factor a gate. With addition, a vital but fully served need would still rank high and pull Suhail into competing with funded incumbents.`,
      concepts: ["sh06.gap-score"],
      difficulty: 1,
    },
    {
      id: "sh06-l05-q3",
      type: "multi",
      prompt: "Which should Suhail NOT do, according to this lesson? (Select all that apply.)",
      options: [
        "Run cross-border hackathons with an online track",
        "Train a 70B Arabic foundation model",
        "Take equity in hackathon winners",
        "Publish bilingual, sourced coverage of regional AI",
        "Give one national champion exclusive branding of all programmes",
      ],
      answer: [1, 2, 4],
      explanation: md`Frontier models are covered by state-backed labs; investing creates conflicts with curation; exclusivity ends neutrality. Hackathons and media are core gaps.`,
      concepts: ["sh06.complement-not-compete", "sh06.neutral-convenor"],
      difficulty: 1,
    },
    {
      id: "sh06-l05-q4",
      type: "mcq",
      prompt: "Which structural blind spot of national AI champions creates a gap for Suhail?",
      options: [
        "They lack capital",
        "They lack compute",
        "Each serves its own country, so none is a neutral cross-border convenor for builders",
        "They cannot train models",
      ],
      answer: 2,
      explanation: md`Champions have capital, compute and models; their mandate is national. Cross-border neutrality is what a community can offer.`,
      concepts: ["sh06.ecosystem-roles"],
      difficulty: 1,
    },
    {
      id: "sh06-l05-q5",
      type: "order",
      prompt: "Order these illustrative offerings from highest to lowest gap score (from the worked example).",
      items: ["Cross-border builder network (14.0)", "Arabic-first technical media (11.2)", "Pre-seed investor introductions (7.5)", "Cash accelerator (2.4)", "Compute provision (0.5)"],
      explanation: md`Scores from the worked example; they are illustrative judgments, and the order is what matters for the strategy.`,
      concepts: ["sh06.gap-score"],
      difficulty: 1,
    },
    {
      id: "sh06-l05-q6",
      type: "decision",
      prompt: md`A Suhail lead wants to angel-invest in a hackathon team she judged last month. What policy do you apply?`,
      options: [
        { text: "Allow it; it signals confidence in the community.", score: 0.1, feedback: "Other teams will reasonably ask whether judging was fair, and VC sponsors will see Suhail as a competitor." },
        { text: "Require disclosure to the leads, no investing in teams she judged or will judge, and recusal from future decisions about that team; record it in a conflicts register.", score: 1, feedback: "Keeps curation trusted without banning leads from all private activity." },
        { text: "Ban all leads from any angel investing anywhere.", score: 0.5, feedback: "Simple, but probably more than needed; disclosure and recusal address the actual conflict." },
      ],
      explanation: md`The conflict is between curation and private gain; disclosure, separation and recusal are the standard controls.`,
      concepts: ["sh06.conflict-of-interest"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "sh06-l05-f1", front: "Five ecosystem roles", back: "States and national champions; capital; research institutions; corporates and hyperscalers; communities and media.", concepts: ["sh06.ecosystem-roles"] },
    { id: "sh06-l05-f2", front: "Gap score", back: md`$G = I(1-c)a$; importance 1 to 5, coverage 0 to 1, advantage 1 to 5; max 25.`, concepts: ["sh06.gap-score"] },
    { id: "sh06-l05-f3", front: "Suhail's top gaps (illustrative scoring)", back: "Cross-border builder network, diaspora connection, Arabic-first technical media; then investor introductions and applied evaluation.", concepts: ["sh06.gap-score"] },
    { id: "sh06-l05-f4", front: "Four things Suhail does not do", back: "Compute, frontier model training, investing in members, cash accelerators. Plus: never become one state's channel.", concepts: ["sh06.complement-not-compete"] },
    { id: "sh06-l05-f5", front: "Neutral convenor rules", back: "No exclusivity on core programmes, labelled sponsorship, model-agnostic rules, sponsors judge only their track, leads disclose conflicts.", concepts: ["sh06.neutral-convenor"] },
    { id: "sh06-l05-f6", front: "Reshape rather than drop", back: "A generic job board scores 2.4; a curated consent-based finalist showcase scores 11.2 (illustrative): shape offerings around the advantage.", concepts: ["sh06.gap-score"] },
  ],
  scenarios: [
    {
      id: "sh06-s2",
      title: "A national AI champion offers to be title sponsor, with conditions",
      context: md`Four months before Suhail's first hackathon (illustrative), a partnerships manager at a Gulf national AI company offers to cover the whole budget. Conditions: the event is named after the company, only its model may be used, no other national AI entity may sponsor for 12 months, and it receives all participant contact details.`,
      start: "a",
      concepts: ["sh06.neutral-convenor", "sh06.conflict-of-interest", "sh06.complement-not-compete"],
      nodes: {
        a: {
          md: md`The offer would remove all budget risk. What is your first response?`,
          choices: [
            { text: "Accept: survival first, neutrality later.", score: 2, feedback: "Every condition attacks a neutrality rule. Once accepted, the 12-month exclusivity and the data transfer cannot be undone.", next: "b" },
            { text: "Thank them, explain Suhail's rules, and counter-propose: title sponsor of this event (time-limited, disclosed), a dedicated track and prize on their model, credits for all teams, opt-in profile sharing, and no exclusivity beyond this event.", score: 10, feedback: "Keeps most of the value for the sponsor (visibility, adoption, hiring) while protecting the community.", next: "c" },
            { text: "Decline outright and look for smaller sponsors.", score: 5, feedback: "Protects neutrality but loses a partner that could work on fair terms. Counter first.", next: "c" },
          ],
        },
        b: {
          md: md`A month later a rival state's research institute offers mentors and credits. The exclusivity clause blocks them, and two finalist teams complain they were forced onto a model that does not handle their dialect.`,
          choices: [
            { text: "Ask the first sponsor to waive exclusivity for non-cash contributions and open the model rule for future events; publish the rules you will use from now on.", score: 6, feedback: "Partial recovery. The lesson: neutrality rules are cheaper to set before the first big cheque." },
            { text: "Turn the institute away to honour the contract.", score: 3, feedback: "Legally consistent, strategically costly: Suhail is now seen as one country's event." },
          ],
        },
        c: {
          md: md`The sponsor replies: "We can drop the 12-month exclusivity and the data transfer, but we need the event named after us and our model mandatory."`,
          choices: [
            { text: "Agree to the name for this one event with 'in partnership with Suhail' branding and disclosure, keep model choice open with a well-funded sponsor track for their model.", score: 9, feedback: "A proportionate trade: naming is temporary and visible; mandatory model use would distort the event for builders." },
            { text: "Agree to both: naming and mandatory model.", score: 5, feedback: "Builders whose use case the model does not fit are disadvantaged, and the event becomes a product trial." },
            { text: "Refuse both and end talks.", score: 4, feedback: "You had a workable deal. Naming one event is a normal sponsorship benefit." },
          ],
        },
      },
    },
  ],
};

export default lesson;
