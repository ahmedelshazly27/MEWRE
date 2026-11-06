import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc05-l01",
  title: "Brand strategy for a deep-tech startup",
  summary:
    "Brand as buyer risk reduction, not decoration: build a brand platform (category, audience, problem, promise, proof, voice), climb the proof ladder from claim to third-party evidence, pick names and a visual identity that survive Arabic, trademark and RTL checks, and test messages with numbers instead of opinions.",
  minutes: 65,
  objectives: [
    "You can explain why an enterprise hardware buyer treats brand as a risk signal, and what that implies for a three-person startup",
    "You can write a one-page brand platform for one of your ventures with proof points that are true today",
    "You can rewrite a marketing claim up the proof ladder: claim, mechanism, evidence, third-party validation",
    "You can run the naming and visual identity checks (trademark, domain, Arabic meaning and script, RTL) before you pay for a logo",
    "You can judge a headline test with a two-proportion z-test and know when traffic is too low to test at all",
  ],
  concepts: [
    { id: "fc05.brand-risk-reduction", name: "Brand as buyer risk reduction", description: "In B2B enterprise sales, brand is the buyer's estimate of how risky it is to pick you: will it work, will you exist in three years, will I look foolish. A young company reduces that risk with specific proof, not polish.", competency: "fc-marketing" },
    { id: "fc05.brand-platform", name: "Brand platform", description: "The one-page source of truth for what the company says: category, audience, problem, promise, proof points, personality and voice rules. Every page, deck and post is derived from it.", competency: "fc-marketing", related: ["fc05.brand-risk-reduction", "fc05.proof-ladder"] },
    { id: "fc05.proof-ladder", name: "Proof ladder (proof over claims)", description: "Four rungs of credibility: bare claim, explained mechanism, own measured evidence, third-party validation. Engineers discount everything below the evidence rung.", competency: "fc-marketing" },
    { id: "fc05.voice", name: "Brand voice and tone", description: "Voice is the stable personality of the writing (for example precise, calm, specific); tone shifts by context. Expressed as do and do-not rules with examples, not adjectives alone.", competency: "fc-marketing", related: ["m13.plain-language"] },
    { id: "fc05.naming-identity", name: "Naming and visual identity basics", description: "A name must be ownable (trademark, domain, handles), pronounceable and safe in every market language; a visual identity is a small consistent system (mark, type, colour, grid), not a logo alone.", competency: "fc-marketing" },
    { id: "fc05.message-testing", name: "Message testing", description: "Checking which framing makes the target buyer act, by qualitative tests with real buyers at low traffic and by A/B tests with a significance check once traffic allows.", competency: "fc-marketing", related: ["fc05.brand-platform"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What brand does in a B2B deep-tech sale",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Afterwave asks a hardware test team to put a new tool between their rigs and their release decisions, on their own servers, after a security review. Mizan asks a plant operator or a government research body to trust its numbers on soiling losses. Suhail asks builders to give up an evening and sponsors to give up a budget line. In all three the buyer is taking a personal risk on a company with no history. Brand is how you lower that risk before the first call, and every page, deck and post you write either lowers it or raises it.`,
        },
        {
          kind: "md",
          md: md`### Brand is a risk estimate in the buyer's head

Strip away the logos and a B2B brand is the answer to three silent questions a buyer asks before taking a meeting:

1. **Will it work for my case?** (technical risk)
2. **Will this company still be here when I depend on it?** (vendor risk)
3. **Will I look good or foolish for bringing it in?** (personal and political risk)

A large incumbent answers question 2 and 3 with size and history. A startup cannot, so it has to over-answer question 1 with **specific, checkable proof**, and borrow credibility for 2 and 3 from the people around it: credible founders (Ismail and Yusuf's validation background at Tesla is a real asset here), named methodology partners, standards it follows, customers who agree to be referenced.

A useful way to see it: the buyer's willingness to engage is roughly the perceived value minus the perceived risk. Most founder marketing tries to inflate the value term with bigger adjectives. For an engineer audience that backfires: vague superlatives **increase** perceived risk, because they signal that you either do not know your limits or are hiding them.

### The brand platform

The platform is a one-page document, written before the website and owned by you as CEO. It has six parts:

| Part | Question it answers | Test of a good answer |
|---|---|---|
| **Category** | What shelf am I on? | A buyer can repeat it to their boss in one breath |
| **Audience** | Who exactly, by role and situation? | Names a job title and a trigger event |
| **Problem** | What hurts, in their words? | Something they would complain about unprompted |
| **Promise** | What changes for them? | Measurable or observable |
| **Proof points** | Why believe it? | Each one is true today and checkable |
| **Voice** | How do we sound? | Three to five do and do-not rules with examples |

Positioning (choosing the category and the competitive alternative) is the go-to-market module's job; here we take the position as given and make it consistent and believable. If the category is "physical AI test infrastructure", every artefact must look and sound like it belongs on that shelf and not on "generic test automation".

### Proof over claims: the proof ladder`,
        },
        {
          kind: "flow",
          title: "The proof ladder: each rung costs more and convinces more",
          steps: [
            { label: "1. Claim", detail: "\"Ripple cuts regression testing time.\" Free to write, ignored by engineers." },
            { label: "2. Mechanism", detail: "\"Ripple maps each test to the firmware modules, models and rig parts it exercises, so after a change it reruns only tests whose dependencies changed.\" Credible if the logic holds." },
            { label: "3. Own evidence", detail: "\"On a replayed history of N changes, the selected subset caught X of Y regressions that the full suite caught.\" Needs data and a stated method." },
            { label: "4. Third-party validation", detail: "A customer quote, a methodology partner, a published paper or an independent audit. Hardest to get, strongest signal." },
          ],
          caption: "Move every important claim at least to rung 2 now, and plan how each one reaches rung 3 or 4. Never write rung 3 or 4 language for something that is only at rung 1.",
        },
        {
          kind: "matrix",
          title: "Sorting claims: specific vs vague, verifiable vs not",
          xAxis: ["Hard to verify", "Easy to verify"],
          yAxis: ["Vague", "Specific"],
          cells: [
            { label: "Risky precision", detail: "\"Cuts test time by 73%\" with no method. Looks like data, is a claim. Engineers ask for the dataset in the first call." },
            { label: "Proof", detail: "\"Replay on 412 historical changes, method and scripts in the appendix.\" Use these on the homepage and in decks." },
            { label: "Noise", detail: "\"AI-powered next-generation platform.\" Costs trust, delete it." },
            { label: "Safe but weak", detail: "\"Runs on your own servers.\" True and checkable, but not differentiating on its own. Pair it with a specific." },
          ],
          caption: "Top-right is the goal. Top-left is the dangerous cell: fake precision is worse than honest vagueness.",
        },
        {
          kind: "md",
          md: md`### Voice: rules, not adjectives

"Confident, innovative, friendly" is not a voice; every company claims it. Write voice as rules a freelancer or an AI drafting tool can follow:

- **Do** name the mechanism. **Do not** use "seamless", "revolutionary", "next-generation", "AI-powered" as a value claim.
- **Do** use the buyer's units (test hours, rerun count, kWh lost, KWD per cleaning cycle). **Do not** use percentages without a base.
- **Do** say what the product does not do. **Do not** imply a capability you have not shipped.

### Naming and visual identity basics

A name has four jobs: be **ownable** (registrable trademark in your classes and markets, a usable domain, social handles), be **sayable** by your buyers, be **safe** in every language you sell in, and be **distinctive** in your category. Your three names illustrate the trade-offs: "Mizan" (ميزان, balance or scale) and "Suhail" (سهيل, the star Canopus, whose rising marks the end of the Gulf summer in local tradition) carry meaning in Arabic, which is an asset in the Gulf and a reason to check how common the word already is as a company name. Descriptive common words are harder to register and defend as trademarks than coined ones.

A visual identity is a **system**: a mark, one or two typefaces, a colour palette with contrast that passes accessibility checks, and a few layout rules. For a bilingual venture add: an Arabic typeface that pairs with the Latin one, a logo lockup that works right-to-left, and rules for mixing scripts on one slide. Consistency across ten touchpoints does more for perceived reliability than a brilliant logo seen once.

### Testing messages with numbers

Once a page gets enough traffic you can compare two headlines on a conversion (for example a demo request). For conversion rates $p_A$ and $p_B$:`,
        },
        { kind: "equation", formula: "fc05-conversion-rate" },
        { kind: "equation", formula: "fc05-relative-lift" },
        { kind: "equation", formula: "fc05-two-proportion-z" },
        {
          kind: "md",
          md: md`With $|z| \ge 1.96$ the difference is significant at the 5% level (two-sided). The catch for deep tech: at a few hundred visitors a month, real differences in conversion of one or two percentage points will rarely reach significance. Below that traffic, run **qualitative message tests**: show two or three framings to five to ten people who match the audience and ask them to explain back what you do and who it is for. If they cannot repeat it, the message fails regardless of how good it sounds to you.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Building and testing an Afterwave message",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Afterwave headline test: category framing vs mechanism framing",
          given: md`Illustrative numbers. After a conference talk drives traffic, Afterwave splits its homepage between two headlines for four weeks. **A:** "AI-powered test automation platform". **B:** "Know which rig tests to rerun after a firmware, model or rig change". Conversion = demo request. A: 1,200 visitors, 18 requests. B: 1,180 visitors, 33 requests.`,
          steps: [
            { md: md`**Conversion rates:** $p_A = 18/1{,}200 = 1.50\%$, $p_B = 33/1{,}180 = 2.80\%$.` },
            { md: md`**Relative lift:** $(2.80 - 1.50)/1.50 = 0.86$, so B converts about **86% better**.` },
            { md: md`**Pooled rate:** $\hat p = (18+33)/(1{,}200+1{,}180) = 51/2{,}380 = 2.14\%$.` },
            { md: md`**Standard error:** $SE = \sqrt{0.0214 \times 0.9786 \times (1/1{,}200 + 1/1{,}180)} = 0.00594$.` },
            { md: md`**z-statistic:** $z = (0.0280 - 0.0150)/0.00594 = 2.18$. Since $2.18 > 1.96$, the difference is significant at the 5% level, but only just: rerun or extend before treating it as settled.` },
            { md: md`**Interpretation:** the mechanism headline wins not because it is cleverer but because it moves up the proof ladder (rung 2) and names the buyer's trigger event (a change). It also filters: generic automation buyers who would never buy self-select out, which is a good outcome.` },
          ],
          result: md`B wins with $z \approx 2.2$. Keep B, and check that the extra demo requests are qualified (right role, right kind of rig), because a headline can raise conversions from the wrong audience.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "The same test on a normal month's traffic",
          given: md`Illustrative: without the conference spike, each headline gets 300 visitors in a month. A gets 5 demo requests, B gets 8.`,
          steps: [
            { md: md`$p_A = 5/300 = 1.67\%$, $p_B = 8/300 = 2.67\%$, a relative lift of 60%.` },
            { md: md`Pooled $\hat p = 13/600 = 0.02167$; $SE = \sqrt{0.02167\times 0.97833\times(2/300)} = 0.01189$.` },
            { md: md`$z = (0.02667 - 0.01667)/0.01189 = 0.84$.`, hidden: true, check: { prompt: "z-statistic", answer: 0.84, tolerance: { abs: 0.02 } } },
            { md: md`Since $0.84 < 1.96$, this is **not** significant: a 60% lift on these numbers is well within noise. Decide with qualitative tests instead.` },
          ],
          result: md`At deep-tech traffic, A/B tests mostly tell you nothing. Five structured conversations with test leads are cheaper and more informative than a month of split traffic.`,
        },
        {
          kind: "md",
          md: md`### A brand platform for Afterwave, drafted from what is true today

| Part | Draft |
|---|---|
| **Category** | Test infrastructure for physical AI: capture, private compute and change impact for hardware test teams |
| **Audience** | Heads of test and validation at companies building robots, humanoids, drives, batteries and autonomous machines; trigger: a firmware, model or rig change that forces a regression decision |
| **Problem** | Rig signals and on-screen actions live on different clocks and in different tools; after every change, teams either rerun everything (slow) or guess (risky) |
| **Promise** | One clock for rig and screen (Lockstep), data and models that stay on your servers (Enclave), and a reasoned answer to "what must we rerun?" (Ripple) |
| **Proof points** | Founders from drive unit and inverter validation (true today); runs on-prem or in an isolated tenant (true by design); change-impact accuracy on replayed history (rung 3, to be earned in pilots) |
| **Voice** | Speaks like a senior test engineer: units, mechanisms, limits stated; no superlatives |

The proof points column is where honesty is enforced. "Rung 3, to be earned" is a line in the internal platform, not on the website; the website only carries what is true today.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Doing brand work with a small team",
      blocks: [
        {
          kind: "md",
          md: md`### Who does what

- **You (CEO):** own the platform and the claims. Brand is a strategy document before it is a design brief.
- **Engineering partners (Ismail, Yusuf, Omar):** veto any technical claim they would not defend in a customer's lab. Make this a rule, not a courtesy.
- **Freelance designer or small studio:** identity system, website templates, deck template. Brief them with the platform, three competitor sites you do not want to resemble, and the bilingual requirements.
- **Trademark attorney:** clearance search and filing in the markets that matter (for Afterwave the EU and the US; for Mizan and Suhail the Gulf states you will operate in). Start with free databases (EUIPO, WIPO Global Brand Database, USPTO) to screen out obvious conflicts before paying for an opinion.

### Documents you should have

1. Brand platform (one page, versioned).
2. Messaging house: the promise on the roof, three pillars, proof points under each pillar.
3. Claims register: every public numeric or comparative claim, its rung on the proof ladder, its source and its owner.
4. Mini style guide: logo use, colours, type, Arabic and English lockups, voice do and do-not list, banned words.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Spending on identity before the message is settled.** A logo cannot fix an unclear category; it just makes the confusion look expensive.
- **Fake precision.** "Cuts test time by 73%" from one internal demo becomes the number every prospect asks you to prove. In the EU, misleading advertising rules apply between businesses too (Directive 2006/114/EC), and comparative claims about named competitors must be verifiable.
- **Copying the category leader's vocabulary.** If you sound like generic test automation, buyers file you there and compare you on its terms.
- **Arabic as an afterthought.** A name that is awkward or unfortunate in Gulf Arabic, or a logo with no right-to-left lockup, is found by your first Kuwaiti customer, not by you.
- **Rebranding every quarter.** Recognition comes from repetition; changing the platform resets it.`,
        },
        { kind: "sources", refs: ["fc05-r1", "fc05-r2", "fc05-r3", "fc05-r4"] },
        {
          kind: "checklist",
          title: "Before anything public goes out",
          items: [
            "Every claim is in the claims register with its rung and source",
            "An engineering partner has signed off every technical claim",
            "No banned words (seamless, revolutionary, next-generation, AI-powered as a value claim)",
            "Numbers carry a base and a method (\"on N replayed changes\", \"over a 30-day window\")",
            "Name and mark screened in EUIPO, WIPO and USPTO databases and checked with native Gulf Arabic speakers",
            "Arabic and English versions both reviewed by a native speaker of each",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask five target buyers in a message test",
          items: [
            "In your own words, what does this company do and who is it for?",
            "What would you have to see to believe the main claim?",
            "Which word on this page made you trust it less?",
            "What would you call this category if you were explaining it to your manager?",
            "Who else would need to agree before you could try it?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc05-l01-p1",
            type: "short",
            prompt: md`Produce a one-page brand platform for **Mizan** aimed at plant owners and O&M contractors in Kuwait. Include: category, audience with a trigger event, problem in the buyer's words, promise, three proof points each labelled with its rung on the proof ladder and whether it is true today, five voice rules (do and do-not), and one sentence on what the name and identity must do in Arabic. Do not invent results, customers or partners.`,
            rubric: [
              "Category is specific to PV soiling, cleaning optimisation and plant control in harsh desert conditions, not generic 'energy AI'",
              "Audience names roles (asset manager, O&M manager, plant owner, EPC) and a trigger event (cleaning contract renewal, performance shortfall, new plant handover, tender)",
              "Proof points are honest: each labelled with its ladder rung and whether it is true today; no invented results; the KISR pilot is described only as targeted or in discussion, not as a result",
              "Voice rules are concrete do and do-not rules with banned words or required units (kWh lost, KWD per cleaning cycle), not adjectives",
              "Arabic and identity note covers meaning of ميزان, an MSA-appropriate tagline approach, and an RTL lockup",
              "Fits on one page and could be handed to a designer or writer as-is",
            ],
            modelAnswer: md`**Category:** soiling and cleaning intelligence for desert PV plants: measure the loss, clean when it pays, protect the plant in dust, wind and heat.

**Audience:** asset managers and O&M managers of utility PV in Kuwait and the Gulf, and the EPCs handing plants over. Trigger: a cleaning contract renewal, a performance ratio below expectation after a dust season, or a new plant entering operation.

**Problem (their words):** "We clean on a fixed schedule because we cannot see the loss. After a dust storm we do not know if it is worth an extra cycle, and the water and crews are expensive."

**Promise:** cleaning decisions based on measured loss and forecast dust, so each cycle is justified in kWh recovered against KWD spent.

**Proof points:**
1. Method based on published soiling-ratio estimation from operational data (rung 2, true today: we can explain the mechanism and cite the literature).
2. Pilot targeting Shagaya Phase I with KISR researchers as methodology partner (rung 4 when completed and approved for publication; today only "in preparation", and named publicly only with KISR's written approval).
3. Cleaning economics model: kWh recovered times tariff against cost per cycle (rung 2 now; rung 3 after the first season of plant data).

**Voice rules:** do state losses in kWh and percent of PR with the time window; do give cleaning cost in KWD per cycle; do say when data is insufficient; do not use "smart", "revolutionary", "AI-driven" as value claims; do not quote a loss reduction until it is measured on a named (or approved anonymised) plant.

**Name and identity in Arabic:** ميزان means balance or scale, which fits weighing cleaning cost against energy recovered; the tagline in Arabic is written in MSA, not translated word for word; the logo has an Arabic lockup that reads right to left and pairs a Naskh-style or modern Arabic typeface with the Latin type.`,
            explanation: md`A good platform is short, honest about which proof exists, and specific enough that a designer, a writer or an AI drafting tool would produce consistent work from it. The Shagaya pilot is the strongest future proof point, which is exactly why it must not be overstated before it exists.`,
            concepts: ["fc05.brand-platform", "fc05.proof-ladder", "fc05.voice", "fc05.naming-identity"],
            difficulty: 2,
          },
        },
        { kind: "scenario", scenario: "fc05-s1" },
        {
          kind: "feynman",
          prompt: "Explain to Yusuf, who thinks marketing is 'just the website', why brand matters for selling Afterwave to a robotics test lead, and what he personally contributes to it.",
          keyPoints: [
            "Brand is the buyer's estimate of risk: will it work, will the company last, will I look foolish",
            "A startup cannot win on size, so it wins on specific checkable proof and credible people",
            "Vague superlatives raise perceived risk for engineers; mechanisms and evidence lower it",
            "His validation background is itself a proof point, and his sign-off on technical claims protects credibility",
            "Consistency across website, deck, posts and talks builds recognition over time",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "fc05-l01-q1",
      type: "mcq",
      prompt: "For an enterprise hardware test buyer, what is the main job of a startup's brand?",
      options: [
        "Making the company look as large as an incumbent",
        "Lowering the buyer's perceived technical, vendor and personal risk before the first meeting",
        "Generating leads directly through advertising",
        "Differentiating through a memorable logo",
      ],
      answer: 1,
      explanation: md`Brand in B2B is a risk estimate. A startup lowers it with specific proof and credible people; looking bigger than you are tends to raise suspicion once discovered.`,
      concepts: ["fc05.brand-risk-reduction"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc05-l01-q2",
      type: "order",
      prompt: "Order the rungs of the proof ladder from weakest to strongest.",
      items: ["Bare claim", "Explained mechanism", "Own measured evidence with method", "Third-party validation"],
      explanation: md`Each rung costs more to reach and convinces more. Engineers discount anything below own measured evidence.`,
      concepts: ["fc05.proof-ladder"],
      difficulty: 1,
    },
    {
      id: "fc05-l01-q3",
      type: "numeric",
      prompt: md`Headline A converts 20 of 1,000 visitors; headline B converts 32 of 1,000. Compute the two-proportion z-statistic (2 decimals).`,
      answer: 1.69,
      tolerance: { abs: 0.02 },
      explanation: md`$p_A = 0.020$, $p_B = 0.032$, pooled $\hat p = 52/2{,}000 = 0.026$. $SE = \sqrt{0.026\times 0.974\times(2/1{,}000)} = 0.00712$. $z = 0.012/0.00712 = 1.69$, below 1.96: not significant at 5% despite a 60% relative lift.`,
      concepts: ["fc05.message-testing"],
      difficulty: 2,
    },
    {
      id: "fc05-l01-q4",
      type: "multi",
      prompt: "Which belong in a brand platform? (Select all that apply.)",
      options: [
        "Category and audience with a trigger event",
        "Proof points with their source",
        "Voice rules with do and do-not examples",
        "The full product roadmap",
        "The problem in the buyer's own words",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`The roadmap is a product document. The platform is the one-page source for what the company says and why it should be believed.`,
      concepts: ["fc05.brand-platform"],
      difficulty: 1,
    },
    {
      id: "fc05-l01-q5",
      type: "decision",
      prompt: md`Your designer proposes the Afterwave homepage line "Cuts regression testing time by 73%". The number comes from one internal demo on a synthetic test suite. What do you do?`,
      options: [
        { text: "Publish it; it is technically what the demo showed.", score: 0, feedback: "Fake precision: the first test lead will ask for the dataset, and the claim may be misleading under EU B2B advertising rules." },
        { text: "Replace it with the mechanism (rung 2) and log the 73% in the claims register as an internal result to be validated in a pilot.", score: 1, feedback: "Right: say what is true and explainable now, and plan how the number reaches rung 3 with a stated method." },
        { text: "Round it to 'up to 75%' to sound less precise.", score: 0.1, feedback: "Still an unsupported quantitative claim, now with a weasel word." },
      ],
      explanation: md`The top-left cell of the claims matrix (specific but unverifiable) is the most dangerous one. Mechanism language is honest and still differentiating.`,
      concepts: ["fc05.proof-ladder", "fc05.brand-risk-reduction"],
      difficulty: 2,
    },
    {
      id: "fc05-l01-q6",
      type: "mcq",
      prompt: "A deep-tech homepage gets about 300 visitors a month. What is the best way to choose between two value propositions?",
      options: [
        "Run an A/B test for one month and pick the higher conversion",
        "Ask the team to vote",
        "Run structured message tests with five to ten target buyers who explain back what you do",
        "Use the one with more keywords for search",
      ],
      answer: 2,
      explanation: md`At this traffic a real difference of one or two points rarely reaches significance (see the faded example, z about 0.84). Qualitative tests with the right people are faster and more informative.`,
      concepts: ["fc05.message-testing"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc05-l01-f1", front: "The three silent questions behind a B2B brand", back: "Will it work for me? Will this company still be here? Will I look good or foolish for choosing it?", concepts: ["fc05.brand-risk-reduction"] },
    { id: "fc05-l01-f2", front: "Six parts of a brand platform", back: "Category, audience (with trigger), problem, promise, proof points, voice.", concepts: ["fc05.brand-platform"] },
    { id: "fc05-l01-f3", front: "Proof ladder rungs", back: "Claim, mechanism, own evidence with method, third-party validation.", concepts: ["fc05.proof-ladder"] },
    { id: "fc05-l01-f4", front: "Most dangerous claim type", back: "Specific but unverifiable (fake precision), e.g. a percentage with no base or method.", concepts: ["fc05.proof-ladder"] },
    { id: "fc05-l01-f5", front: "Two-proportion z-test threshold at 5% (two-sided)", back: md`$|z| \ge 1.96$`, concepts: ["fc05.message-testing"] },
    { id: "fc05-l01-f6", front: "Four jobs of a name", back: "Ownable (trademark, domain), sayable, safe in every market language, distinctive in the category.", concepts: ["fc05.naming-identity"] },
    { id: "fc05-l01-f7", front: "How to write a brand voice", back: "As do and do-not rules with examples and banned words, not as adjectives.", concepts: ["fc05.voice"] },
  ],
  scenarios: [
    {
      id: "fc05-s1",
      title: "The slick website and the sceptical test lead",
      context: md`A studio has delivered Afterwave's new website: dark theme, animated robot arm, headline "The AI platform for all hardware testing". Ismail is unhappy with it. That afternoon a head of validation at a battery company, met at a conference, emails: "Looked at your site. What exactly do you do, and what evidence do you have?"`,
      start: "a",
      concepts: ["fc05.proof-ladder", "fc05.brand-platform", "fc05.brand-risk-reduction"],
      nodes: {
        a: {
          md: md`How do you reply to the head of validation?`,
          choices: [
            { text: "Send the deck and a link to the website, and suggest a demo.", score: 3, feedback: "Answers neither question. A sceptical engineer reads this as evasion.", next: "b" },
            { text: "Reply in five lines: the specific problem Afterwave solves (rerun decisions after changes), the mechanism, what exists today, what you do not have yet (published accuracy data), and an offer to replay their own change history in a pilot.", score: 10, feedback: "Specific, honest about limits, and turns the evidence gap into a reason to work together.", next: "b" },
            { text: "Claim large time savings from internal tests to win the meeting.", score: 0, feedback: "A rung 1 claim presented as rung 3. It will be tested in the first call and you will lose the account and the reference.", next: "c" },
          ],
        },
        b: {
          md: md`Now the website. Ismail says the headline would embarrass him in front of former colleagues. The studio says "AI platform" tests well for investors.`,
          choices: [
            { text: "Keep it for investors and add a technical page for engineers.", score: 3, feedback: "One audience reads the other's page. Investors in this space read test lead reactions too." },
            { text: "Rewrite from the brand platform: mechanism headline, engineering partners sign off every claim, banned-word list goes to the studio.", score: 10, feedback: "The platform settles the argument; the engineering veto on technical claims becomes a standing rule." },
          ],
        },
        c: {
          md: md`On the call the head of validation asks for the dataset behind the savings figure. You only have a synthetic demo.`,
          choices: [
            { text: "Admit it was a demo figure, explain the mechanism and propose a pilot to measure it properly.", score: 4, feedback: "Damage limitation. Credibility is partly lost, and the claim must be removed from all materials today." },
          ],
        },
      },
    },
  ],
};

export default lesson;
