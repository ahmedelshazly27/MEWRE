import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh01-l01",
  title: "What an ecosystem is: actors, value flows and network effects",
  summary:
    "An ecosystem is a set of actors (builders, employers, investors, universities, governments) exchanging value through a hub. This lesson maps who gives and gets what in Suhail's case, then tests the usual claim that community value grows with the square of members: Metcalfe as an upper bound, Odlyzko-Tilly and bounded-ties models as realistic estimates, and cross-side effects as what sponsors actually pay for.",
  minutes: 70,
  objectives: [
    "You can name the five actor groups in a builder ecosystem and write down what each gives and gets",
    "You can compute network value under Metcalfe, Odlyzko-Tilly and bounded-ties models and explain why they diverge",
    "You can explain cross-side network effects and why sponsors pay for active, qualified builders, not list size",
    "You can draw Suhail's value-flow map and spot where the hub is the bottleneck",
  ],
  concepts: [
    { id: "sh01.ecosystem-actors", name: "Ecosystem actors", description: "The groups whose interaction makes an ecosystem: builders (engineers, researchers, founders), employers, investors, universities and governments, plus the hub that convenes them.", competency: "sh-community" },
    { id: "sh01.value-flows", name: "Value flows", description: "What each actor gives (time, money, problems, data, credibility) and gets (talent, deal flow, visibility, jobs, learning). A community survives only if every actor's get exceeds its give.", competency: "sh-community", related: ["sh01.ecosystem-actors"] },
    { id: "sh01.metcalfe-law", name: "Metcalfe's law", description: "Network value proportional to the number of possible pairs, n(n-1)/2, so roughly n squared. An upper bound, not a forecast.", competency: "sh-community", related: ["fc06.network-effects"] },
    { id: "sh01.realistic-network-value", name: "Realistic network value", description: "Because ties differ in value and each person can maintain only a few useful ones, value grows closer to n log n (Odlyzko-Tilly) or linearly above a tie limit (bounded ties).", competency: "sh-community", related: ["sh01.metcalfe-law"] },
    { id: "sh01.cross-side-effects", name: "Cross-side network effects", description: "Value to one side (employers, investors, sponsors) grows with the number of active, qualified participants on the other side (builders), and vice versa.", competency: "sh-community", related: ["sh01.value-flows", "fc06.network-effects"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Actors, flows and how network value really grows",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Suhail sells nothing that a builder cannot get somewhere else in pieces: talks, hackathons, job posts, investor intros. What it can uniquely offer is the **meeting point**, and a meeting point is only worth what the people meeting there get from each other. Before you design a single event you need a model of who comes, why they come back, what each side pays in time or money, and how value grows as Suhail grows. Sponsors, partners and your own volunteer leads will all ask some version of "why will this get bigger and better?", and the honest answer is not "network effects".`,
        },
        {
          kind: "md",
          md: md`### The five actors and the hub

An **ecosystem** is a set of actors who create more value together than apart, plus the structures that let them find each other. In a builder ecosystem the actors are:

| Actor | Gives | Gets | What makes them leave |
|---|---|---|---|
| **Builders** (engineers, researchers, students, founders) | Time, projects, attention, word of mouth | Skills, peers, visibility, jobs, cofounders, funding intros | Events that feel like sales pitches; no one at their level |
| **Employers** (startups, scale-ups, corporates, labs) | Money (sponsorship, job posts), mentors, problems to solve, credits | Hiring pipeline, employer brand among builders, product feedback | No hires after a year; low-quality candidates |
| **Investors** (angels, VCs, government funds, accelerators) | Money (sponsorship), judges, office hours | Deal flow before others see it, signal on founders | Deal flow they already had; no filter on quality |
| **Universities** | Venues, students, faculty, credibility | Student outcomes, industry links, research visibility | Logistics burden on staff; no student benefit |
| **Governments and agencies** | Grants, venues, permits, convening power, visibility | Visible progress on national AI, talent and startup goals | Political risk, no measurable outcomes |

The **hub** (Suhail) owns none of the value: it lowers the cost of the actors finding each other and raises the trust between them. Its assets are the member graph, the calendar, the brand, the editorial voice and the reputation for quality.

### A community survives when everyone's get exceeds their give

Write each actor's balance as get minus give, in their own currency (time for builders, money and staff time for employers). The hub fails in one of two ways:

1. **One side's balance goes negative.** Builders stop coming when every talk is a recruiter pitch; sponsors stop paying when no hires happen. The fix is not more marketing but rebalancing.
2. **The hub itself runs out of capacity.** Volunteer leads burn out, curation slips, quality drops and the best builders leave first. This is the more common failure of volunteer-run communities and the reason Suhail's design must keep the hub's work per member falling as it grows.`,
        },
        {
          kind: "flow",
          title: "Suhail's value loop (target design, nothing launched yet)",
          steps: [
            { label: "Builders show up", detail: "Hackathons, newsletter, Majlis episodes, Discord or WhatsApp groups." },
            { label: "They make visible work", detail: "Projects, demos, open datasets, talks: evidence of skill." },
            { label: "Employers and investors see it", detail: "Judging, sponsor challenges, demo nights, a curated talent list." },
            { label: "Outcomes happen", detail: "Hires, grants, cofounder matches, first cheques, research collaborations." },
            { label: "Stories spread", detail: "Editorial and podcast tell the outcome; builders invite peers." },
            { label: "More and better builders show up", detail: "The loop restarts with a stronger pool, which raises sponsor value." },
          ],
          caption: "The loop closes only at step 4. A community with events but no outcomes is a media company with high costs.",
        },
        {
          kind: "md",
          md: md`### Metcalfe's law: the upper bound

Robert Metcalfe's claim (originally about Ethernet) is that a network's value grows with the number of possible connections:`,
        },
        { kind: "equation", formula: "sh01-metcalfe" },
        {
          kind: "md",
          md: md`With $n = 3{,}000$ people on a list, $L = 3{,}000 \times 2{,}999 / 2 \approx 4.5$ million possible pairs. This is where "network effects" decks get their excitement: double the members, quadruple the value. Three things are wrong with using it as a forecast:

1. **Most members are not active.** Only active people can form ties. Use active members, not the list.
2. **Ties are not equally valuable.** Your best contact in a community is worth far more than your hundredth.
3. **Attention is bounded.** Nobody maintains 3,000 useful relationships. Dunbar's estimate of about 150 stable relationships per person is for all of life; inside one community the useful number is much smaller.

### Odlyzko-Tilly: n log n

Briscoe, Odlyzko and Tilly (2006) proposed ranking each member's contacts by value and assuming the $j$-th is worth about $1/j$ of the best. One member's total is then $\sum_{j=1}^{n-1} 1/j \approx \ln n$, and the whole network is worth:`,
        },
        { kind: "equation", formula: "sh01-odlyzko" },
        {
          kind: "md",
          md: md`Doubling members now multiplies value by $2 \ln(2n)/\ln n$, which is about 2.2 for a few hundred members: better than linear, far from fourfold.

### Bounded ties: linear above a threshold

A simpler engineering model: each person can maintain at most $m$ useful ties. Below $m + 1$ members, everyone can know everyone (Metcalfe regime). Above it, each new member adds at most $m$ ties:`,
        },
        { kind: "equation", formula: "sh01-bounded-ties" },
        {
          kind: "chart",
          chart: "line",
          title: "Network value index vs members (value at n = 100 set to 1)",
          xKey: "n",
          xLabel: "members n",
          yLabel: "value index",
          series: [
            { key: "metcalfe", label: "Metcalfe n(n-1)/2" },
            { key: "odlyzko", label: "Odlyzko-Tilly n ln n" },
            { key: "bounded", label: "Bounded ties (m = 15)" },
          ],
          data: [
            { n: 100, metcalfe: 1.0, odlyzko: 1.0, bounded: 1.0 },
            { n: 250, metcalfe: 6.3, odlyzko: 3.0, bounded: 2.5 },
            { n: 500, metcalfe: 25.2, odlyzko: 6.75, bounded: 5.0 },
            { n: 1000, metcalfe: 100.9, odlyzko: 15.0, bounded: 10.0 },
            { n: 2000, metcalfe: 403.8, odlyzko: 33.0, bounded: 20.0 },
          ],
          caption: "Computed from the three formulas. From 100 to 2,000 members Metcalfe promises 400 times the value; the realistic models promise 20 to 33 times. The gap is what investors discount when a community founder says 'network effects'.",
        },
        {
          kind: "md",
          md: md`### Cross-side effects: what sponsors pay for

Suhail is two-sided. Builders on one side; employers, investors and sponsors on the other. Each side's value depends on the **other** side:

- A builder values Suhail more when there are more relevant employers, investors and peers.
- An employer values it more when there are more **active, qualified** builders it can reach.`,
        },
        { kind: "equation", formula: "sh01-cross-side" },
        {
          kind: "md",
          md: md`The formula makes the point that matters for sales: employer value is a product of list size $N_B$, active share $a$ and qualified share $q$. Doubling the list with people who never open an email ($a$ halves) leaves sponsor value unchanged. Curation and engagement are worth as much as growth, and are usually cheaper.

Cross-side effects are also why the **cold start** is hard: no sponsor pays before builders come, and good builders do not come to an empty room. The usual way out is to subsidise one side (free, well-run hackathons with real prizes from a small number of early partners) and to recruit the first builders by hand.`,
        },
        { kind: "widget", widget: "community-funnel", caption: "Active members, not list size, drive every network-value model above. Try the defaults (illustrative): 20,000 reach a month, 1.5 % conversion, 80 % retention, 5 % referrals give about 2,000 active members at steady state. Lesson 3 derives the formula." },
        { kind: "xref", to: "fc06.network-effects", note: "General treatment of direct, indirect and data network effects and how investors judge them as a moat." },
      ],
    },
    {
      layer: "applied",
      title: "Putting numbers on Suhail's network value",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "List size vs active members (illustrative)",
          given: md`Illustrative, nothing has launched: suppose after a year Suhail has 3,000 people on its newsletter list, and 15 % of them do something in a given month (attend, post, reply, join a call). Compare the possible-pair counts and the effect of doubling active members.`,
          steps: [
            { md: md`**Active members:** $n_a = 0.15 \times 3{,}000 = 450$.` },
            { md: md`**Metcalfe on the list:** $3{,}000 \times 2{,}999/2 = 4{,}498{,}500$ pairs. **On active members:** $450 \times 449 / 2 = 101{,}025$ pairs, 2.2 % of the list figure. Using the list overstates the network 45 times before any other correction.` },
            { md: md`**Doubling active members to 900, Metcalfe:** $\dfrac{900 \times 899}{450 \times 449} = 4.00$.` },
            { md: md`**Doubling, Odlyzko-Tilly:** $\dfrac{900 \ln 900}{450 \ln 450} = \dfrac{2 \times 6.802}{6.109} = 2.23$.` },
            { md: md`**Doubling, bounded ties ($m = 15$):** both sizes exceed $m+1$, so value is linear: ratio 2.0.` },
          ],
          result: md`Tell sponsors and partners "value roughly doubles to slightly more than doubles as active members double", and show active members, not list size. A 4x claim is easy to puncture and damages credibility with every investor in the room.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Which lever raises sponsor value most? (illustrative)",
          given: md`Illustrative: list $N_B = 4{,}000$ builders, active share $a = 0.20$, share meeting a given AI employer's bar $q = 0.25$. The employer values each reachable qualified builder at $\beta = 1$ unit. Option A: grow the list by 50 % with the same $a$ and $q$. Option B: keep the list, raise $a$ to 0.30 through better rituals. Option C: keep the list and $a$, raise $q$ to 0.40 through curation and targeted recruiting.`,
          steps: [
            { md: md`**Baseline:** $V_E = 1 \times 0.25 \times 0.20 \times 4{,}000 = 200$ reachable qualified builders.` },
            { md: md`**Option A:** $0.25 \times 0.20 \times 6{,}000 = 300$.`, hidden: true, check: { prompt: "Option A: reachable qualified builders", answer: 300, tolerance: { abs: 1 } } },
            { md: md`**Option B:** $0.25 \times 0.30 \times 4{,}000 = 300$.`, hidden: true, check: { prompt: "Option B: reachable qualified builders", answer: 300, tolerance: { abs: 1 } } },
            { md: md`**Option C:** $0.40 \times 0.20 \times 4{,}000 = 320$.`, hidden: true, check: { prompt: "Option C: reachable qualified builders", answer: 320, tolerance: { abs: 1 } } },
          ],
          result: md`All three roughly match on paper, but they cost very different amounts. Option A needs 2,000 new sign-ups (paid reach, partnerships), Option B needs better programming, Option C needs sharper recruiting and an application filter. For a volunteer team, B and C are usually cheaper, and C also improves the builder side because peers get better.`,
        },
        {
          kind: "question",
          question: {
            id: "sh01-l01-p1",
            type: "numeric",
            prompt: md`Illustrative: a community of 600 active members grows to 1,200. By what factor does network value grow under the Odlyzko-Tilly model $V = k n \ln n$? (Two decimals.)`,
            answer: 2.22,
            tolerance: { abs: 0.02 },
            explanation: md`$\dfrac{1200 \ln 1200}{600 \ln 600} = \dfrac{2 \times 7.090}{6.397} = 2.22$. Compare 4.00 under Metcalfe and 2.00 for linear growth.`,
            concepts: ["sh01.realistic-network-value"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Mapping a real ecosystem before you build in it",
      blocks: [
        {
          kind: "md",
          md: md`### How operators actually map an ecosystem

1. **List named organisations per actor group and per city.** Not "investors" but which funds, which partners at those funds, who already runs events. Lesson 6 and the landscape module cover the Arab cities.
2. **For each, write the give and the get in their words.** A government programme officer's get is a reportable outcome (number of trained builders, startups formed). A startup CTO's get is two good hires a year. A student's get is a first job.
3. **Find who already convenes them.** In every city someone already runs a meetup, a university club, an accelerator demo day or a WhatsApp group. Those people are either your first partners or your competition, and usually the former is better.
4. **Identify the bottleneck flow.** In most young ecosystems it is not money: it is qualified builders meeting the right employers and investors in a trusted setting.

### What goes wrong`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Network-effects language without a mechanism",
          md: md`Telling a sponsor "we have 3,000 members and strong network effects" invites the question "how many came to anything last month, and how many got hired?". Lead with active members, contribution and outcomes; keep list size as a footnote. The same discipline applies in your own head: a community whose value does not grow when it grows is a media audience, which is a fine business but a different one.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "One side subsidises the other forever",
          md: md`Free events with sponsor money are the normal start. If after a year sponsors see no hires, no deal flow and no product feedback, they stop. Track sponsor outcomes from the first event (see lesson 5), and design formats where the employer side meets builders doing real work, such as sponsor challenges at hackathons.`,
        },
        {
          kind: "checklist",
          title: "Ecosystem map checklist for Suhail",
          items: [
            "Five actor groups listed with named organisations per city",
            "Give and get written for each actor in their own currency",
            "Existing conveners (meetups, clubs, accelerators, groups) listed with a partner-or-compete note",
            "The bottleneck flow named, with the evidence for it",
            "Active members defined in writing (what counts as active, over what window)",
            "One outcome metric per non-builder actor (hires, deals, student placements, reported outcomes)",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask a prospective partner in the first meeting",
          items: [
            "What would make this partnership a clear success for you in twelve months, in a number you report internally?",
            "Who do you already reach, and who do you struggle to reach?",
            "What have other communities or events done for you that did not work?",
            "Who on your side would show up in person: engineers, recruiters, partners?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "sh01-l01-p2",
            type: "short",
            prompt: md`Produce Suhail's **value-flow map** as a table for one city of your choice (for example Kuwait City or Riyadh). For each of the five actor groups give: one or two named example organisations that exist (no invented ones), what they give, what they get, the outcome metric you would report to them, and the main reason they would leave. Then name the bottleneck flow and the one design choice that addresses it.`,
            rubric: [
              "Covers all five actor groups with real, plausibly relevant organisations for the chosen city (no invented names or partnerships claimed as existing)",
              "Gives and gets are stated in each actor's own currency (time, money, reportable outcomes), not generic benefits",
              "Each non-builder actor has a concrete, countable outcome metric",
              "Leaving reasons are specific and plausible (for example no hires within a year, recruiter-heavy events)",
              "Names one bottleneck flow with a reason, and one design choice that directly addresses it",
              "Does not claim any Suhail member, sponsor or partner exists; uses targets or illustrative language",
            ],
            modelAnswer: md`City: Kuwait City (targets, nothing agreed).

| Actor | Examples | Gives | Gets | Outcome metric | Leaves if |
|---|---|---|---|---|---|
| Builders | Engineering students at Kuwait University and AUK, developers at local startups and banks | Weekend time, projects, referrals | Peers at their level, portfolio, introductions, jobs | Projects shipped, intros made | Events feel like pitches; nobody senior attends |
| Employers | Local tech and fintech companies, bank digital units | Sponsorship, mentors, challenge problems | Hires, employer brand with engineers | Interviews and hires from Suhail within 12 months | No hire after two events |
| Investors | Kuwait-based angels and regional VCs | Judges, office hours, sponsorship | Early sight of technical founders | Founder meetings, first cheques | Only students with no company intent |
| Universities | Kuwait University, AUK | Venue, students, faculty judges | Student outcomes, industry links | Students placed in internships | Logistics load on staff |
| Government | KISR (research), national digital and youth bodies | Venues, credibility, convening | Reportable talent outcomes | Number of builders trained and placed | No measurable outcomes, reputational risk |

Bottleneck: qualified builders meeting employers in a setting where real work is visible. Kuwait has events and money; it lacks a recurring place where an employer sees a builder build. Design choice: monthly sponsor-challenge hackathons with employer engineers as mentors and judges, plus a curated, consented talent list after each event, so every sponsor gets a measurable shot at hires.`,
            explanation: md`A strong map uses real organisations as targets, states every actor's balance in their own currency, and ends with one bottleneck and one design response.`,
            concepts: ["sh01.ecosystem-actors", "sh01.value-flows", "sh01.cross-side-effects"],
            difficulty: 2,
          },
        },
        { kind: "sources", refs: ["sh01-r13", "sh01-r14", "sh01-r15", "sh01-r31"] },
        {
          kind: "feynman",
          prompt: "Explain to a sponsor's CFO, in under two minutes, why Suhail's value to their company depends more on active, qualified builders than on the size of the mailing list.",
          keyPoints: [
            "Only active members can be reached or form ties",
            "Value to an employer is reachable qualified builders: list times active share times qualified share",
            "Metcalfe's n squared overstates value because ties differ and attention is bounded",
            "Realistic growth is roughly linear to n log n",
            "Curation and engagement raise sponsor value as much as list growth, often more cheaply",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh01-l01-q1",
      type: "numeric",
      prompt: md`How many possible pairwise connections are there among 400 active members?`,
      answer: 79800,
      tolerance: { abs: 1 },
      unit: "pairs",
      explanation: md`$L = n(n-1)/2 = 400 \times 399 / 2 = 79{,}800$. This is Metcalfe's count; almost none of these pairs will ever interact.`,
      concepts: ["sh01.metcalfe-law"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh01-l01-q2",
      type: "mcq",
      prompt: md`Why does the Odlyzko-Tilly model give $n \ln n$ instead of $n^2$?`,
      options: [
        "It counts only active members",
        "It assumes a member's j-th most valuable tie is worth about 1/j of the best, and the sum of 1/j grows like ln n",
        "It assumes each member has at most 150 ties",
        "It discounts future value at a fixed rate",
      ],
      answer: 1,
      explanation: md`Ranking ties by value with a $1/j$ (Zipf-like) decay gives each member a total of about $\ln n$; multiply by $n$ members. The active-member correction and the tie limit are separate adjustments.`,
      concepts: ["sh01.realistic-network-value"],
      difficulty: 2,
    },
    {
      id: "sh01-l01-q3",
      type: "multi",
      prompt: md`Which of these raise an employer's value from Suhail under $V_E = \beta q a N_B$? Select all that apply.`,
      options: [
        "Recruiting builders with stronger skills in the employer's stack",
        "Adding inactive sign-ups from a giveaway campaign",
        "Rituals that make more members show up each month",
        "Doubling the number of active, qualified builders",
        "Adding more sponsor logos to the event page",
      ],
      answer: [0, 2, 3],
      explanation: md`Stronger recruiting raises $q$, better rituals raise $a$, and more active qualified builders raise the product directly. Inactive sign-ups raise $N_B$ but lower $a$ by the same factor. Logos do nothing for the employer's reach.`,
      concepts: ["sh01.cross-side-effects"],
      difficulty: 2,
    },
    {
      id: "sh01-l01-q4",
      type: "decision",
      prompt: md`A potential sponsor asks: "How big is your community?" Suhail's list is large but monthly activity is modest. What do you answer?`,
      options: [
        { text: "Give the list size and say network effects make it more valuable every month.", score: 0.1, feedback: "Easy to puncture with one follow-up question about attendance, and it trains the sponsor to judge you on the wrong number." },
        { text: "Give active members last month with your definition of active, the share in their target profile, and what past sponsors got; list size as context.", score: 1, feedback: "Right: it matches what the sponsor actually buys (reachable qualified builders) and builds trust with honest definitions." },
        { text: "Avoid numbers and talk about the mission and the region's potential.", score: 0.3, feedback: "Mission matters, but a sponsor with a budget line needs a number and will read evasion as weakness." },
      ],
      explanation: md`Sponsors buy reach to active, qualified builders. Lead with that, define it, and show outcomes.`,
      concepts: ["sh01.cross-side-effects", "sh01.value-flows"],
      difficulty: 2,
    },
    {
      id: "sh01-l01-q5",
      type: "mcq",
      prompt: md`In the bounded-ties model with $m = 20$, how does value change when active members grow from 300 to 600?`,
      options: ["It quadruples", "It doubles", "It grows by about 2.2 times", "It stays constant"],
      answer: 1,
      explanation: md`Both sizes exceed $m + 1 = 21$, so $V = \tfrac{k}{2} n m$ is linear in $n$: doubling $n$ doubles value.`,
      concepts: ["sh01.realistic-network-value"],
      difficulty: 2,
    },
    {
      id: "sh01-l01-q6",
      type: "order",
      prompt: md`Order the steps of Suhail's value loop.`,
      items: [
        "Builders show up",
        "They make visible work",
        "Employers and investors see it",
        "Outcomes happen (hires, deals, matches)",
        "Stories spread and more builders join",
      ],
      explanation: md`The loop only closes at outcomes. Events without outcomes make Suhail a media company with event costs.`,
      concepts: ["sh01.value-flows"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh01-l01-f1", front: "Five actor groups in a builder ecosystem", back: "Builders, employers, investors, universities, governments (plus the hub that convenes them).", concepts: ["sh01.ecosystem-actors"] },
    { id: "sh01-l01-f2", front: "Survival condition for a community", back: "Every actor's get exceeds its give, in its own currency, and the hub's work per member falls as it grows.", concepts: ["sh01.value-flows"] },
    { id: "sh01-l01-f3", front: "Metcalfe's law", back: md`$V = k\,n(n-1)/2$: value grows like $n^2$. An upper bound, not a forecast.`, concepts: ["sh01.metcalfe-law"] },
    { id: "sh01-l01-f4", front: "Odlyzko-Tilly law", back: md`$V = k\,n\ln n$: doubling a few hundred members multiplies value by about 2.2.`, concepts: ["sh01.realistic-network-value"] },
    { id: "sh01-l01-f5", front: "What sponsors actually pay for", back: md`Reachable qualified builders: $q \times a \times N_B$, not list size.`, concepts: ["sh01.cross-side-effects"] },
    { id: "sh01-l01-f6", front: "Cold start in a two-sided community", back: "No sponsor pays before builders come; good builders do not come to an empty room. Subsidise one side and recruit the first builders by hand.", concepts: ["sh01.cross-side-effects"] },
  ],
};

export default lesson;
