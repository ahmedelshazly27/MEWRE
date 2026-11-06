import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh02-l02",
  title: "Designing the challenge: themes, sponsor tracks, prizes and judging rubrics",
  summary:
    "The challenge design is the incentive system of the event. The theme sets who applies, sponsor tracks set which tools get used, the prize structure sets how teams behave, and the judging rubric sets what gets built. This lesson treats each as a mechanism, works through the expected value of a prize for a team, builds a weighted rubric, and sets the rules that keep pre-built projects out.",
  minutes: 70,
  objectives: [
    "Write a theme and problem statements that are open enough for creativity and narrow enough for comparable projects",
    "Design sponsor tracks that reward meaningful use of a sponsor's product rather than token integration",
    "Explain how prize size and spread change team behaviour, using expected value per builder",
    "Build a weighted judging rubric with anchored score levels",
    "Set and enforce rules that prevent pre-built projects and handle intellectual property fairly",
  ],
  concepts: [
    { id: "sh02.theme-design", name: "Theme and problem statement design", description: "A theme narrows the solution space so projects are comparable and sponsors align, while leaving teams room to choose the problem. Good problem statements name a user, a constraint and a data source.", competency: "sh-events", related: ["sh02.sponsor-track"] },
    { id: "sh02.sponsor-track", name: "Sponsor track", description: "A separate prize category judged on the meaningful use of a sponsor's product or data. Criteria must reward depth of integration, or teams add a token API call to qualify.", competency: "sh-events", related: ["sh02.prize-incentives", "sh02.theme-design"] },
    { id: "sh02.prize-incentives", name: "Prize incentives", description: "Prize size and spread shape behaviour: one large grand prize draws professional and pre-built entries and discourages collaboration; many smaller category prizes spread effort and reward diverse strengths. Expected cash per builder is usually small, so status, learning and hiring drive most participation.", competency: "sh-events", related: ["sh02.judging-rubric"] },
    { id: "sh02.judging-rubric", name: "Judging rubric", description: "Weighted criteria with anchored score levels (what a 1, 3 and 5 look like) that make different judges score the same project similarly and make the result explainable to teams and sponsors.", competency: "sh-events", related: ["sh02.prize-incentives"] },
    { id: "sh02.fresh-build-rules", name: "Fresh-build rules", description: "Rules and checks that ensure projects are built during the event: repository created after kick-off, commit history reviewed, prior code and libraries declared, problem specifics revealed at kick-off, judges ask what was built during the event.", competency: "sh-events", related: ["sh02.judging-rubric"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "The challenge is an incentive system",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`When a Suhail hackathon disappoints, it will rarely be because of the food. It will be because the theme attracted the wrong people, the sponsor track rewarded a one-line API call, the grand prize drew a startup with a finished product, or judges disagreed in public. All of those are design decisions you make weeks before the event. Get them right and sponsors renew because the projects actually used their product.`,
        },
        {
          kind: "md",
          md: md`### Theme and problem statements

A theme does three jobs: it tells builders whether this event is for them, it tells sponsors whether their product fits, and it makes projects comparable so judging is fair.

| Too broad | About right | Too narrow |
|---|---|---|
| "Build anything with AI" | "Agents that do real work in Arabic: customer service, government forms, education" | "Build a chatbot for Ministry X's form Y using API Z" |
| Projects cannot be compared; sponsors cannot see where they fit | Many problems, one comparable frame; Arabic is a genuine constraint that rewards regional builders | One right answer; feels like unpaid consulting; few apply |

A strong problem statement names **a user, a constraint and a data source**: "Small clinics in Cairo receive patient messages in Egyptian Arabic on WhatsApp; build an agent that triages them, using the anonymised sample set provided." Prepare 4 to 6 such statements as optional starting points; teams may still pick their own problem within the theme.

For Suhail, Arabic-language and regional problems are a natural differentiator: Arabic NLP still struggles with dialects, code-switching and limited evaluation data (research brief, section 2), so an Arabic constraint makes projects harder to copy from a global template and more interesting to regional employers.

### Sponsor tracks

A sponsor track is a separate prize, usually judged by the sponsor, for the best use of its product. The failure mode is the **token integration**: a team adds one API call to an unrelated project to qualify for the prize. Defences:

- **Criterion: the product is load-bearing.** "Would the project still work if the sponsor's product were removed?" If yes, it does not qualify.
- **Give a real reason to use it.** Credits large enough to build with, a dataset only available through the sponsor, a mentor from the sponsor on the floor during build hours.
- **Limit tracks.** Three to four tracks for 30 teams is plenty; ten tracks means every team qualifies for something and none of them mean anything.
- **Write the track criteria into the sponsor agreement**, so the sponsor cannot redefine the winner at the end (Lesson 5).

### Prizes and behaviour

Prizes are less about money than organisers think. The expected cash value per builder is small:`,
        },
        { kind: "equation", formula: "sh02-prize-ev" },
        {
          kind: "md",
          md: md`With 30 teams of 4 and a USD 10,000 grand prize, a team that thinks it is average has a $1/30$ chance: $EV = (1/30) \times 10{,}000 / 4 \approx$ USD 83 per builder for 24 hours of work. Builders come for learning, status, employers and friends. The prize **structure** still matters a great deal, because it changes **who** comes and **how** they behave:

| Structure | Effect |
|---|---|
| One large grand prize | Attracts professional teams and pre-built projects; increases secrecy; discourages helping other teams; most teams know early they cannot win and disengage |
| Several category prizes (best technical, best design, best Arabic-first, best first-time team) | Spreads effort; rewards different strengths; more teams stay motivated to the end |
| Sponsor track prizes | Drive product use; risk token integrations without load-bearing criteria |
| Non-cash prizes (interviews, credits, a feature in the newsletter, a slot on The Majlis, a demo at Suhail Season) | Cheap for the organiser, often more valuable to the builder than cash; build the community loop |
| Participation rewards (credits, certificates for all who demo) | Raise the demo rate; reduce the incentive to quit at 3 am |

The rule of thumb used in this module (illustrative, not a published standard): **no single prize larger than all the others combined**, and at least one prize a first-time or student team can realistically win.

### The judging rubric

A rubric is a weighted score:`,
        },
        { kind: "equation", formula: "sh02-rubric-score" },
        {
          kind: "md",
          md: md`Common hackathon criteria are technical execution, usefulness or impact, originality, design and user experience, and completeness of the demo. The weights are the event's values written as numbers: putting 0.30 on technical execution says "we care that it actually works"; putting 0.10 on presentation says "we will not let a slick pitch beat a working product".

**Anchors** make the rubric work. Without them, "4 out of 5" means something different to every judge. Write what a 1, 3 and 5 look like for every criterion before the event and share it with teams at kick-off, so they know what they are optimising.

| Criterion (weight) | 1 | 3 | 5 |
|---|---|---|---|
| Technical execution (0.30) | Slides or a mock-up; nothing runs | Core flow works with shortcuts (hard-coded data) | End-to-end working with real data, handles errors |
| Usefulness for the stated user (0.25) | No clear user | Plausible user, problem stated | Specific user, evidence the problem is real, would be used tomorrow |
| Originality (0.20) | Copy of a known tutorial | A known idea, new angle or market | A new approach, or a hard regional constraint solved well |
| Use of the theme constraint, e.g. Arabic (0.15) | Ignored | Arabic UI or translation layer | Dialect-aware, evaluated on real Arabic input |
| Demo and clarity (0.10) | Could not show it | Showed it, some confusion | Clear problem, live demo, honest limits |

### Keeping pre-built projects out

Pre-built projects destroy trust faster than anything else, because the teams who played fair watch someone else win. Defences, in increasing order of strength:

1. **Rule:** all project code must be written during the event; open-source libraries, public APIs and declared boilerplate are allowed. MLH member events use a similar rule.
2. **Fresh repository:** the project repository must be created after kick-off, and the link submitted early (for example within the first three hours).
3. **Reveal specifics at kick-off:** the theme can be public, but the problem statements, datasets and sponsor challenges are revealed only at the start.
4. **Commit history check:** for finalists, a mentor looks at the commit history. A single 4,000-line commit at hour 2 is a question to ask, not automatic proof.
5. **Judge question:** "What did you build in the last 24 hours, and what existed before?" Asked of every finalist, it surfaces most problems in front of the panel.

### Intellectual property

Default for a community hackathon: **teams own what they build**; sponsors get a licence to use project names and screenshots for publicity, nothing more. Corporate or government challenge hackathons sometimes require IP assignment to the host; that must be stated before registration, and it changes who applies. Get the participant terms reviewed by a lawyer before the first event.`,
        },
        {
          kind: "matrix",
          title: "Prize structure vs behaviour",
          xAxis: ["Few prizes", "Many prizes"],
          yAxis: ["Small total pool", "Large total pool"],
          cells: [
            { label: "Community default", detail: "Small cash, strong non-cash prizes (interviews, newsletter feature, Majlis slot). Learning-driven, collaborative." },
            { label: "Broad recognition", detail: "Many category and sponsor prizes; most teams stay engaged; risk of devalued prizes if more than about a third of teams win something." },
            { label: "Winner takes all", detail: "Attracts professionals and pre-built projects; secrecy; most teams disengage early. Avoid for community events." },
            { label: "Flagship", detail: "Serious teams and serious prizes spread across categories; needs strong fresh-build enforcement and calibrated judging." },
          ],
          caption: "Where Suhail's events should sit: left-top for frequent events, right-bottom only for flagship events with strict enforcement.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Scoring two finalists with a weighted rubric",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Does the polished pitch beat the working product?",
          given: md`Rubric weights as in the table above: technical 0.30, usefulness 0.25, originality 0.20, Arabic constraint 0.15, demo 0.10. Scores 1 to 5. Two illustrative finalist teams. Team P gave a polished pitch with a partly mocked product. Team W has a working dialect-aware agent and a nervous demo.`,
          steps: [
            {
              md: md`**Scores (panel average):**

| Criterion ($w$) | Team P | Team W |
|---|---|---|
| Technical (0.30) | 2 | 5 |
| Usefulness (0.25) | 4 | 4 |
| Originality (0.20) | 4 | 3 |
| Arabic constraint (0.15) | 2 | 5 |
| Demo (0.10) | 5 | 2 |`,
            },
            { md: md`**Team P:** $S = 0.30(2)+0.25(4)+0.20(4)+0.15(2)+0.10(5) = 0.6+1.0+0.8+0.3+0.5 =$ **3.20**.` },
            { md: md`**Team W:** $S = 0.30(5)+0.25(4)+0.20(3)+0.15(5)+0.10(2) = 1.5+1.0+0.6+0.75+0.2 =$ **4.05**.` },
            { md: md`**What if the weights were equal (0.20 each)?** P: $0.2(2+4+4+2+5) = 3.40$; W: $0.2(5+4+3+5+2) = 3.80$. W still wins, but the gap shrinks from 0.85 to 0.40. With demo weighted 0.30 and technical 0.10, P would win. The weights decide which kind of project wins.` },
          ],
          result: md`Team W wins, 4.05 to 3.20. Published weights tell every team in advance that working software beats slides, which changes how they spend the last six hours.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Expected prize value for a builder",
          given: md`Illustrative flagship: 40 teams of 4. Prize pool: grand prize USD 6,000, three category prizes of USD 2,000, and three sponsor track prizes of USD 1,500. Assume an average team has a $1/40$ chance at the grand prize and, separately, a $3/40$ chance at a category prize and a $3/40$ chance at a sponsor prize (ignore overlaps).`,
          steps: [
            { md: md`Expected value per team: $\frac{1}{40}(6{,}000) + \frac{3}{40}(2{,}000) + \frac{3}{40}(1{,}500)$.` },
            { md: md`$= 150 + 150 + 112.5 =$ USD 412.50 per team.`, hidden: true, check: { prompt: "Expected prize value per team (USD)", answer: 412.5, tolerance: { abs: 1 }, unit: "USD" } },
            { md: md`Per builder (divide by team size 4):` },
            { md: md`$412.5 / 4 \approx$ **USD 103** per builder.`, hidden: true, check: { prompt: "Expected prize value per builder (USD)", answer: 103.1, tolerance: { abs: 1 }, unit: "USD" } },
          ],
          result: md`About USD 103 per builder: less than a day's pay for most engineers. The total pool (USD 16,500) is the same as one USD 16,500 grand prize, but the spread keeps seven teams in contention instead of one, and the per-builder value barely changes.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Writing the challenge pack",
      blocks: [
        {
          kind: "md",
          md: md`### How it is done

- **Who:** the Events and Programming lead writes the challenge pack; the Head of Engineering checks that problem statements are buildable in the time with the data provided; each sponsor drafts its track and you edit it against the load-bearing rule.
- **The challenge pack** (shared at kick-off): theme, 4 to 6 problem statements with data sources, sponsor tracks with criteria, prize list, rubric with anchors, rules (fresh build, team size, IP, code of conduct), submission requirements (repository link, 2-minute video, short write-up) and deadlines.
- **Submission platform:** Devpost is common for hackathons; a simple form plus a shared spreadsheet works for 30 teams.
- **Test the problem statements:** a volunteer engineer should be able to get a minimal version working in 3 to 4 hours with the provided data. If not, the statement is too big for 24 hours.

### What goes wrong

- **Datasets that arrive late or do not load.** Test every provided dataset and API key the week before, on the venue's network if possible.
- **Sponsor tracks that overlap the main prizes**, so one team wins three prizes and the room resents it. Decide in advance whether a team can win more than one prize (common rule: one main prize plus at most one sponsor prize).
- **Rubric shared only with judges.** Teams optimise what they can see. Share it.
- **Rules written but not enforced.** One public disqualification for a pre-built project costs a bad evening; no enforcement costs the event's reputation.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "The government or corporate challenge trap",
          md: md`A host who wants "solutions to our problems" and IP assignment is commissioning cheap consulting. Builders notice. If Suhail runs such an event, make it explicit before registration, pay meaningful prizes, and keep it separate from the community calendar.`,
        },
        {
          kind: "question",
          question: {
            id: "sh02-l02-p1",
            type: "short",
            prompt: md`**Produce the challenge pack summary for a Suhail 24-hour hackathon on "AI agents for Arabic-speaking users"**. Include: (1) the theme statement; (2) three problem statements, each with a user, a constraint and a data source; (3) one sponsor track for an imagined AI API sponsor with load-bearing criteria; (4) the prize structure with amounts (illustrative) and the multiple-win rule; (5) the rubric with weights and anchors for at least three criteria; (6) your fresh-build rules.`,
            rubric: [
              "Theme is specific enough to make projects comparable and keeps room for teams to choose problems",
              "Each problem statement names a user, a constraint and a realistic data source that can be provided legally (synthetic or anonymised, or public)",
              "Sponsor track criteria require the product to be load-bearing, with a test for it",
              "Prize structure follows the stated logic (no single prize larger than the rest combined, at least one prize for first-time teams) and states a multiple-win rule",
              "Rubric weights sum to 1 with anchored levels; fresh-build rules include at least repository timing, declared prior code and a judge question",
            ],
            modelAnswer: md`**Theme:** AI agents that complete real tasks for Arabic-speaking users, in Arabic, including dialect.

**Problem statements:**
1. *Clinic triage:* small clinics receive patient WhatsApp messages in Egyptian or Gulf Arabic; build an agent that sorts urgent from routine. Data: 500 synthetic messages written by volunteers.
2. *Government forms:* residents struggle with long Arabic forms; build an agent that fills a sample residency renewal form from a voice note. Data: a public blank form and synthetic voice notes.
3. *Tutoring:* secondary-school students need maths explanations in their dialect; build a tutor that explains step by step. Data: public curriculum outlines and a small set of volunteer-written questions.

**Sponsor track (imagined AI API provider):** best agent built on the sponsor's API. Criteria: the API performs a core step (would the agent still work without it? if yes, not eligible); measured quality on 20 held-out Arabic examples; sensible cost per task. Credits: enough for each team to run the full build.

**Prizes (illustrative, USD):** best overall 2,500; best technical 1,500; best Arabic-first experience 1,500; best first-time team 1,000; sponsor track 1,500 plus interviews. A team may win one main prize and at most one sponsor prize. Non-cash: newsletter feature and a Majlis episode for the top three.

**Rubric:** technical 0.30 (1 = slides, 3 = core flow with shortcuts, 5 = end to end with real data); usefulness 0.25 (1 = no user, 3 = plausible user, 5 = specific user with evidence); originality 0.20; Arabic constraint 0.15 (1 = ignored, 3 = translation layer, 5 = dialect-aware and tested on real input); demo 0.10.

**Fresh-build rules:** repository created after kick-off and submitted by hour 3; open-source libraries and declared boilerplate allowed; problem statements and datasets revealed at kick-off; finalists' commit history reviewed; every finalist asked what was built during the event.`,
            explanation: md`Graded against the rubric. The best answers make it impossible to win with slides or with a token API call, and they say so in writing before the event.`,
            concepts: ["sh02.theme-design", "sh02.sponsor-track", "sh02.prize-incentives", "sh02.judging-rubric", "sh02.fresh-build-rules"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a sponsor why Suhail will not offer one USD 15,000 grand prize, even though it would look great in the announcement.",
          keyPoints: [
            "Expected cash per builder is small either way, so prizes mainly shape who comes and how they behave",
            "One large prize attracts pre-built and professional entries and discourages collaboration",
            "Most teams disengage once they know they cannot win the single prize",
            "Spreading the pool across categories and tracks keeps more teams motivated and rewards different strengths",
            "Sponsor tracks with load-bearing criteria give the sponsor deeper product use than a headline number",
          ],
        },
        { kind: "sources", refs: ["sh02-r1", "sh02-r5", "sh02-r6"] },
      ],
    },
  ],
  quiz: [
    {
      id: "sh02-l02-q1",
      type: "numeric",
      prompt: md`Rubric weights: technical 0.4, usefulness 0.3, originality 0.2, demo 0.1. A team scores 4, 3, 5, 2 (scale 1 to 5). What is its weighted score?`,
      answer: 3.7,
      tolerance: { abs: 0.01 },
      explanation: md`$S = 0.4(4)+0.3(3)+0.2(5)+0.1(2) = 1.6+0.9+1.0+0.2 = 3.7$.`,
      concepts: ["sh02.judging-rubric"],
      difficulty: 1,
    },
    {
      id: "sh02-l02-q2",
      type: "mcq",
      prompt: "What is the best test of whether a project qualifies for a sponsor track?",
      options: [
        "The team mentions the sponsor in its pitch",
        "The project would stop working if the sponsor's product were removed",
        "The team created an account on the sponsor's platform",
        "The sponsor's logo appears on the project's landing page",
      ],
      answer: 1,
      explanation: md`The load-bearing test filters out token integrations, which is what sponsors actually want filtered out.`,
      concepts: ["sh02.sponsor-track"],
      difficulty: 1,
    },
    {
      id: "sh02-l02-q3",
      type: "numeric",
      prompt: md`30 teams of 5 compete for a single USD 9,000 prize. For a team with an average (uniform) chance, what is the expected prize value per builder? (USD)`,
      answer: 60,
      tolerance: { abs: 0.5 },
      unit: "USD",
      explanation: md`$EV = (1/30) \times 9{,}000 / 5 = 300/5 = \text{USD } 60$ per builder. Cash is rarely the real reason to come.`,
      concepts: ["sh02.prize-incentives"],
      difficulty: 1,
    },
    {
      id: "sh02-l02-q4",
      type: "multi",
      prompt: "Which measures help keep pre-built projects out? (Select all that apply.)",
      options: [
        "Repository must be created after kick-off",
        "Reveal problem statements and datasets at kick-off",
        "Ban all open-source libraries",
        "Ask finalists what they built during the event and what existed before",
        "Review commit history of finalists",
      ],
      answer: [0, 1, 3, 4],
      explanation: md`Banning libraries is unenforceable and pointless; declared libraries and boilerplate are normal. The others make reuse visible.`,
      concepts: ["sh02.fresh-build-rules"],
      difficulty: 1,
    },
    {
      id: "sh02-l02-q5",
      type: "decision",
      prompt: md`At hour 20 a mentor tells you a finalist team's repository has one 6,000-line commit made 40 minutes after kick-off. What do you do?`,
      options: [
        { text: "Disqualify the team immediately and announce it.", score: 0.3, feedback: "Possibly right in the end, but a single large commit can have innocent causes (squashed history, generated code). Act on evidence, not on one signal." },
        { text: "Ask the team privately, with a second organiser present, to walk through what they built during the event and what existed before; decide against the published rule and record the decision.", score: 1, feedback: "Fair process, consistent with the rules you published, and defensible if challenged." },
        { text: "Ignore it: the team is strong and the sponsor likes them.", score: 0, feedback: "Every other team that played fair will hear about it. Unenforced rules cost the event's reputation." },
      ],
      explanation: md`Rules need enforcement with a fair process: private conversation, evidence, a decision against the written rule, a record.`,
      concepts: ["sh02.fresh-build-rules"],
      difficulty: 2,
    },
    {
      id: "sh02-l02-q6",
      type: "mcq",
      prompt: "Why do judging rubrics need anchored score levels?",
      options: [
        "To make judging take longer",
        "So that different judges mean the same thing by a given score",
        "Because sponsors require them by law",
        "To hide the criteria from teams",
      ],
      answer: 1,
      explanation: md`Anchors (what a 1, 3 and 5 look like) reduce disagreement between judges and make results explainable. They should be shared with teams.`,
      concepts: ["sh02.judging-rubric"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh02-l02-f1", front: "A good problem statement names...", back: "A user, a constraint and a data source.", concepts: ["sh02.theme-design"] },
    { id: "sh02-l02-f2", front: "Load-bearing test for sponsor tracks", back: "Would the project still work without the sponsor's product? If yes, it does not qualify.", concepts: ["sh02.sponsor-track"] },
    { id: "sh02-l02-f3", front: "Expected prize value per builder", back: "$EV = p_{win} \\cdot P / n_{team}$; usually well under a day's pay, so structure matters more than size.", concepts: ["sh02.prize-incentives"] },
    { id: "sh02-l02-f4", front: "Effect of one big grand prize", back: "Draws professional and pre-built entries, secrecy, early disengagement of most teams.", concepts: ["sh02.prize-incentives"] },
    { id: "sh02-l02-f5", front: "Rubric score", back: "$S = \\sum w_k s_k$ with weights summing to 1 and anchored levels per criterion; share it with teams at kick-off.", concepts: ["sh02.judging-rubric"] },
    { id: "sh02-l02-f6", front: "Five fresh-build defences", back: "Rule, fresh repository after kick-off, specifics revealed at kick-off, commit history check, judge question.", concepts: ["sh02.fresh-build-rules"] },
  ],
};

export default lesson;
