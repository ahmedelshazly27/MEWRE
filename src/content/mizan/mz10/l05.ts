import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz10-l05",
  title: "Turning a study into commercial credibility: case studies, what to say before and after publication, and avoiding overclaiming",
  summary:
    "How Mizan converts validation evidence into sales credibility without spending the partner's trust: the evidence ladder and the claim each rung supports, exact wording before and after publication, using a partner's name, building a case study from a paper, translating accuracy into a value range, and why overclaiming in tenders and decks is both a credibility and a legal risk.",
  minutes: 65,
  objectives: [
    "Place any piece of evidence on the evidence ladder and write the strongest honest claim it supports",
    "Write wording for the same study before, during and after publication",
    "Build a case study from a validation paper, with approved attribution",
    "Translate a validated measurement result into a scoped value range without presenting untested savings as results",
    "Recognise overclaims in decks, websites and tender responses and rewrite them",
  ],
  concepts: [
    {
      id: "mz10.evidence-ladder",
      name: "Evidence ladder",
      description: "Rungs from hypothesis to pilot in preparation, preliminary results, preprint, peer-reviewed result, replication at several sites and decision trial; each rung supports a specific, stronger claim.",
      competency: "mz-validation",
      related: ["fc05.proof-ladder", "mz10.claim-discipline"],
    },
    {
      id: "mz10.claim-discipline",
      name: "Claim discipline before and after publication",
      description: "Matching every public statement to the current rung, the partner's agreed wording and the journal's policy: describe the study before results, report preliminary results as such, cite the paper after publication.",
      competency: "mz-validation",
      related: ["mz10.evidence-ladder", "mz10.claim-scope"],
    },
    {
      id: "mz10.case-study-validation",
      name: "Case study built on a validation study",
      description: "A short document for buyers: problem, setting, method, result with uncertainty, what it means for decisions, limitations, citation and approved partner attribution.",
      competency: "mz-validation",
      related: ["fc05.case-study", "mz10.evidence-ladder"],
    },
    {
      id: "mz10.overclaiming-risk",
      name: "Overclaiming risk",
      description: "Statements beyond the evidence (endorsement, certification, guaranteed savings, generalisation) damage the partnership and credibility and, in tenders and contracts, can become representations with legal consequences.",
      competency: "mz-validation",
      related: ["mz10.claim-discipline"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "The evidence ladder and the claim each rung earns",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You are the one who will stand in front of utilities, EPCs, O&M contractors and tender committees and say what Mizan's analytics can do. Your credibility in Kuwait's small energy community, and KISR's willingness to keep working with Mizan, depend on every claim being exactly as strong as the evidence. Competitors such as SwishOS (Swish Solar) also market soiling modelling and cleaning optimisation from plant data; a co-authored, peer-reviewed validation is a differentiator only if you never inflate it.`,
        },
        {
          kind: "md",
          md: md`### The ladder

| Rung | Evidence | Strongest honest claim (template) |
|---|---|---|
| 0 Hypothesis | Internal analysis, literature | "We are developing a method to turn operational data into cleaning decisions." |
| 1 Pilot in preparation | Study plan under discussion with a partner | "We are preparing a soiling analytics pilot at Shagaya Phase I with KISR researchers as methodology partner." (only in wording KISR has agreed) |
| 2 Study running | Signed agreement, data flowing | "A validation study with KISR researchers is under way." |
| 3 Preliminary results | Internal results, not reviewed | "Preliminary, unreviewed results from the study indicate ..." with numbers and intervals |
| 4 Preprint | Public, not peer reviewed | "In a preprint co-authored with KISR researchers (not yet peer reviewed), ..." |
| 5 Peer-reviewed | Accepted journal article | "In a peer-reviewed study published in [journal], co-authored with KISR researchers, the method's estimate agreed with ... within ..." |
| 6 Replicated | Several plants, climates | "Validated at N plants in [regions] with ..." |
| 7 Decision trial | Paired-block or controlled cleaning comparison | "In a controlled trial, the recommended schedule reduced soiling losses by X (95% CI ...) relative to the existing schedule." |

Today Mizan is at rung 1 for Shagaya: the pilot is targeted and in preparation, not signed or running. Measurement validity (rung 5) does not prove savings (rung 7). Buyers care about savings, so the temptation is to skip from 5 to 7. Resist it: present savings as a **scenario** computed from validated accuracy, labelled as such, until a decision trial exists.

### Words that overclaim

| Overclaim | Why it is wrong | Honest version |
|---|---|---|
| "KISR-validated" or "approved by KISR" | Implies institutional endorsement; a methodology partner co-authors, it does not certify | "Developed and tested with KISR researchers" (if agreed) |
| "IEC 61724 certified method" | IEC 61724-1 defines monitoring and metrics; it does not certify analytics methods | "Uses temperature-corrected PR to IEC 61724-1 as the baseline" |
| "Cuts cleaning costs by 30%" | No decision trial; plant-specific | "At [plant], a scenario based on validated accuracy suggests ... (not a measured saving)" |
| "Proven in Kuwait" | One plant, one period | "Tested at Shagaya Phase I over [period]" |
| "AI that knows when to clean" | Vague; invites a technical evaluator to take it apart | "Estimates soiling loss from inverter and weather data, with uncertainty, to schedule cleaning" |

### Before and after publication

**Before results**: describe the study, not the outcome. **Before publication**: some journals restrict publicity before publication, and the agreement's publication clause governs what you may share; preliminary numbers to a buyer under NDA are possible if the partner agrees, clearly labelled. **After publication**: cite the paper, quote numbers exactly with intervals and scope, link to it, and let the paper carry the authority.

A partner's **name and logo** are used only as the agreement allows and in wording the partner has approved. That applies to decks, websites, LinkedIn posts, press releases and tender documents.`,
        },
        {
          kind: "matrix",
          title: "Where a claim sits",
          xAxis: ["Weak evidence", "Strong evidence"],
          yAxis: ["Modest claim", "Strong claim"],
          cells: [
            { label: "Honest but forgettable", detail: "Fine early on; say it precisely" },
            { label: "Under-selling", detail: "You have a peer-reviewed result: cite it with its numbers" },
            { label: "Overclaim: danger zone", detail: "Endorsements, guarantees and savings without a trial" },
            { label: "Target", detail: "Strong, scoped claim backed by a published, replicated study" },
          ],
          caption: "The goal is to move right (more evidence) before moving up (stronger claims).",
        },
        { kind: "xref", to: "fc05-l02", note: "Content, technical white papers, benchmark integrity and case studies in general; this lesson applies them to a co-published validation." },
      ],
    },
    {
      layer: "applied",
      title: "Worked: from a measurement result to a scoped value range",
      blocks: [
        {
          kind: "worked",
          title: "What can you say about value? (illustrative)",
          mode: "faded",
          given: md`Illustrative numbers only, not any real plant. A prospective customer's plant: 500 MWp, specific yield 2,000 kWh/kWp per year. Its current annual soiling loss is estimated at 4.0% of energy. Validated accuracy supports scheduling scenarios in which an optimised schedule reduces the soiling loss by between 0.5 and 1.0 percentage points (a modelled range, not a trial result). Value of a MWh for the buyer: 20 to 40 USD/MWh (to be set per buyer, see mz04).`,
          steps: [
            { md: md`**Annual energy.** $500{,}000\ \text{kWp} \times 2{,}000\ \text{kWh/kWp} = 1.0 \times 10^9$ kWh $= 1{,}000$ GWh.` },
            {
              md: md`**Current soiling loss.** $4.0\% \times 1{,}000$ GWh.`,
              hidden: true,
              check: { prompt: "Annual soiling loss (GWh)", answer: 40, tolerance: { abs: 0.1 }, unit: "GWh" },
            },
            {
              md: md`**Energy recovered, low and high.** $0.5\%$ and $1.0\%$ of 1,000 GWh: 5 and 10 GWh. High case in MWh:`,
              hidden: true,
              check: { prompt: "High-case energy recovered (MWh)", answer: 10000, tolerance: { abs: 1 }, unit: "MWh" },
            },
            {
              md: md`**Value range.** Low: $5{,}000 \times 20 = 100{,}000$ USD. High: $10{,}000 \times 40$ USD.`,
              hidden: true,
              check: { prompt: "High-case annual value (USD)", answer: 400000, tolerance: { abs: 100 }, unit: "USD" },
            },
            { md: md`**How to say it.** "For a plant of this size, our scheduling scenarios, based on accuracy measured in our study with KISR researchers, suggest 5 to 10 GWh a year of recoverable energy, worth roughly 0.1 to 0.4 million USD at your valuation. This is a modelled range, not a measured saving; a paired-block trial on your plant would measure it." The range spans a factor of four: show it, do not quote the top.` },
          ],
          result: md`About 5 to 10 GWh and 0.1 to 0.4 million USD per year, as a scenario. Quoting "0.4 million USD of savings" alone would be an overclaim on two counts: it takes the top of the range and presents a model as a result.`,
        },
        { kind: "xref", to: "mz04-l02", note: "What a soiled MWh is worth in Kuwait: tariff versus displaced fuel, which sets the valuation range per buyer." },
      ],
    },
    {
      layer: "field",
      title: "Using the evidence in sales, marketing and tenders",
      blocks: [
        {
          kind: "md",
          md: md`### The case study from a paper

1. **Problem**: the buyer's problem in their words (soiling losses, no method to decide when to clean).
2. **Setting**: plant, period, data used; no confidential data beyond what the paper and agreement allow.
3. **Method**: one paragraph; the validation design in one sentence (blind, independent reference, pre-registered).
4. **Result**: the paper's numbers with intervals, exactly as published.
5. **What it means for a cleaning decision**: the scheduling implication, labelled as such.
6. **Limitations**: one plant, one climate, what is still to be tested.
7. **Citation and attribution**: link to the paper; partner wording and any quote approved in writing.

### In tenders

In a public tender, statements in Mizan's technical offer can become part of the contract or the basis of evaluation. An inflated claim can lead to disqualification if found, to disputes if relied on, and to lasting damage in a small market where evaluators talk. Cite the publication, attach it, and keep performance commitments to what has been measured, with measurement and verification defined (see mz04 on measuring savings with an agreed baseline).`,
        },
        { kind: "xref", to: "m11-l02", note: "Kuwait public procurement: the tendering process and how technical offers are evaluated." },
        {
          kind: "checklist",
          title: "Before any public claim about the study",
          items: [
            "Which rung is this evidence on, and does the wording match it?",
            "Is every number from the paper or labelled preliminary, with its interval?",
            "Is the scope stated (plant, period, climate)?",
            "Has KISR approved any use of its name, logo or quote?",
            "Does the agreement or the journal's policy restrict publicity before publication?",
            "Is any savings figure labelled as a scenario unless it comes from a decision trial?",
            "Would a KISR co-author be comfortable reading this sentence aloud?",
          ],
        },
        {
          kind: "callout",
          tone: "pm",
          title: "One owner for claims",
          md: md`Assign one person (you, at this stage) to approve every external statement about the study: deck, website, posts, proposals, tender text. Keep a claims register: each approved sentence, its evidence, the date, and who approved it on the partner's side. When a salesperson or distributor later asks "can we say ...?", the register answers.`,
        },
        { kind: "scenario", scenario: "mz10-s2" },
        {
          kind: "question",
          question: {
            id: "mz10-l05-p1",
            type: "short",
            prompt: md`Write the **website paragraph about the Shagaya study in two versions** (about 100 words each): (A) today, with the pilot in preparation, and (B) after a peer-reviewed paper is published, using placeholders such as [journal], [X] for numbers you do not have. Then list three phrases you will never use and why.`,
            rubric: [
              "Version A describes the pilot as in preparation or targeted, names KISR researchers as methodology partner subject to agreed wording, and states no results",
              "Version B cites the paper with placeholders, reports results with intervals and scope (plant, period), and mentions co-authorship",
              "Neither version implies endorsement, certification or measured savings",
              "Savings, if mentioned, are labelled as a modelled scenario or deferred to a decision trial",
              "Three banned phrases with correct reasons (for example KISR-validated, IEC-certified, guaranteed savings or proven in Kuwait)",
            ],
            modelAnswer: md`**A (today).** Kuwait has no standard method for turning PV operating data into cleaning decisions. Mizan is preparing a soiling analytics pilot at Shagaya Phase I with KISR researchers as methodology partner [wording to be approved by KISR]. The study is designed to test our method blind against independent references, using temperature-corrected performance ratio to IEC 61724-1 as the baseline, and its results will be published jointly whether positive or negative.

**B (after publication).** In a peer-reviewed study published in [journal] ([year]), co-authored with KISR researchers, Mizan's method estimated soiling losses at the Shagaya Phase I PV plant with a bias of [X] %/day (95% CI [a, b]) relative to independent reference measurements over [period], and recovered the soiling loss during a cleaning outage within its stated uncertainty. Read the paper [link]. A trial measuring the savings of optimised schedules is the next step.

**Never say:** "KISR-validated" (implies an endorsement a methodology partner does not give); "IEC 61724 certified" (the standard defines monitoring and metrics, it certifies no analytics method); "cuts cleaning costs by X%" (no decision trial yet, and results are plant-specific).`,
            explanation: md`Each version must match its rung on the evidence ladder: today only the study and the partner role (in approved words), after publication the cited, scoped numbers. Endorsement, certification and savings claims are excluded until the evidence exists.`,
            concepts: ["mz10.claim-discipline", "mz10.overclaiming-risk", "mz10.evidence-ladder"],
            difficulty: 2,
          },
        },
        { kind: "sources", refs: ["mz10-r1", "mz10-r2", "mz10-r8"] },
      ],
    },
  ],
  quiz: [
    {
      id: "mz10-l05-q1",
      type: "mcq",
      prompt: md`The pilot is in preparation. Which sentence is acceptable on a slide (with KISR's approval of the wording)?`,
      options: [
        "\"Our method is validated by KISR.\"",
        "\"We are preparing a soiling analytics pilot at Shagaya Phase I with KISR researchers as methodology partner.\"",
        "\"Our pilot at Shagaya is delivering savings.\"",
        "\"KISR has selected Mizan.\"",
      ],
      answer: 1,
      explanation: md`Only the second matches the current rung. The others claim endorsement, a running pilot, results or a selection that do not exist.`,
      concepts: ["mz10.claim-discipline"],
      difficulty: 1,
    },
    {
      id: "mz10-l05-q2",
      type: "order",
      prompt: md`Order these rungs of the evidence ladder from weakest to strongest.`,
      items: ["Pilot in preparation", "Preliminary results", "Preprint", "Peer-reviewed article", "Replication at several plants", "Controlled decision trial"],
      explanation: md`A decision trial measures the savings directly; everything below supports measurement accuracy at best.`,
      concepts: ["mz10.evidence-ladder"],
      difficulty: 1,
    },
    {
      id: "mz10-l05-q3",
      type: "numeric",
      prompt: md`Illustrative: a 200 MWp plant with 1,900 kWh/kWp per year. A scenario recovers 0.6 percentage points of soiling loss. How many GWh per year?`,
      answer: 2.28,
      tolerance: { abs: 0.01 },
      unit: "GWh",
      explanation: md`Energy $= 200{,}000 \times 1{,}900 = 380$ GWh; $0.6\% \times 380 = 2.28$ GWh per year, presented as a scenario.`,
      concepts: ["mz10.case-study-validation"],
      difficulty: 1,
    },
    {
      id: "mz10-l05-q4",
      type: "multi",
      prompt: md`Which are overclaims given a single peer-reviewed measurement study at Shagaya? (select all)`,
      options: [
        "\"IEC 61724 certified analytics\"",
        "\"Tested at Shagaya Phase I over [period], in a study co-authored with KISR researchers\"",
        "\"Proven to cut cleaning costs across the Gulf\"",
        "\"Endorsed by KISR\"",
      ],
      answer: [0, 2, 3],
      explanation: md`Only the second is scoped and true to the evidence (and still needs agreed wording).`,
      concepts: ["mz10.overclaiming-risk"],
      difficulty: 1,
    },
    {
      id: "mz10-l05-q5",
      type: "decision",
      prompt: md`A distributor partner's brochure, prepared without you, says "KISR-approved soiling AI, guaranteed 25% cleaning savings". It is already printed for an exhibition next week. What do you do?`,
      options: [
        { text: "Stop its use, tell the distributor why, provide approved wording from the claims register, and inform the KISR contacts proactively that it was withdrawn.", score: 1, feedback: "Protects the partnership and the company; telling KISR first is far better than them finding it." },
        { text: "Let it run this once and fix it for the next print.", score: 0.1, feedback: "One exhibition is enough for the brochure to reach KISR, MEWRE and competitors." },
        { text: "Ask the distributor to add a small disclaimer.", score: 0.2, feedback: "A disclaimer does not cure an endorsement and a guarantee that do not exist." },
      ],
      explanation: md`Third parties repeat your claims; give them approved wording and act fast when they go beyond it.`,
      concepts: ["mz10.overclaiming-risk", "mz10.claim-discipline"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz10-l05-f1", front: "Where is Mizan on the evidence ladder for Shagaya today?", back: "Rung 1: pilot targeted and in preparation with KISR researchers as methodology partner. No results to claim.", concepts: ["mz10.evidence-ladder"] },
    { id: "mz10-l05-f2", front: "Measurement validity versus savings", back: "A validation study shows accuracy (rung 5); savings need a decision trial (rung 7). Until then savings are a labelled scenario.", concepts: ["mz10.evidence-ladder"] },
    { id: "mz10-l05-f3", front: "Why not \"IEC 61724 certified\"?", back: "IEC 61724-1 defines monitoring and metrics; it certifies no analytics method.", concepts: ["mz10.overclaiming-risk"] },
    { id: "mz10-l05-f4", front: "Seven parts of a validation case study", back: "Problem, setting, method, result with interval, decision meaning, limitations, citation and approved attribution.", concepts: ["mz10.case-study-validation"] },
    { id: "mz10-l05-f5", front: "Claims register", back: "Each approved public sentence, its evidence, date and partner approval. One owner approves all external claims.", concepts: ["mz10.claim-discipline"] },
    { id: "mz10-l05-f6", front: "Why overclaims are worse in tenders", back: "Statements in a technical offer can become contractual or evaluated representations: disqualification, disputes, reputation.", concepts: ["mz10.overclaiming-risk"] },
  ],
  scenarios: [
    {
      id: "mz10-s2",
      title: "The O&M manager asks: is it validated, and will you guarantee the savings?",
      dayInLife: true,
      context: md`Illustrative. A year from now. The Paper A preprint (co-authored with KISR researchers, not yet peer reviewed) reports that the method recovered the outage soiling loss within its uncertainty. You are presenting to the technical manager of an O&M contractor bidding for a Gulf PV plant. She asks: "Is your method validated? Our client wants a guaranteed 20% reduction in cleaning cost in our bid."`,
      start: "a",
      concepts: ["mz10.evidence-ladder", "mz10.claim-discipline", "mz10.overclaiming-risk"],
      nodes: {
        a: {
          md: md`How do you answer the first question?`,
          choices: [
            { text: "\"Yes, it's validated by KISR.\"", next: "c", score: 1, feedback: "An endorsement that does not exist, on a result that is not yet peer reviewed. If she checks, you are finished with her." },
            { text: "\"We have a preprint, co-authored with KISR researchers and not yet peer reviewed, showing the method recovered the soiling loss during a cleaning outage at Shagaya within its stated uncertainty. Here it is, with its limitations. Savings have not been measured in a trial yet.\"", next: "b", score: 10, feedback: "Exact rung, scope and limits. Technical buyers trust this more than a slogan." },
            { text: "\"We can't talk about results until publication.\"", next: "b", score: 4, feedback: "Overly cautious: the preprint is public and you may describe it accurately." },
          ],
        },
        b: {
          md: md`She nods: "Fine. But the client wants the 20% guarantee in our bid."`,
          choices: [
            { text: "Offer a measured structure instead: a paired-block trial in the first months of the contract with an agreed baseline and M&V method, and a fee or bonus linked to the measured result, with a modelled range shown as a scenario.", score: 10, feedback: "Turns an untested promise into a measurable commitment, protects both firms and creates the decision-trial evidence Mizan needs." },
            { text: "Agree to 20% to win the bid.", score: 0, feedback: "A guarantee with no evidence, in a contract. If it fails, the O&M contractor's exposure becomes yours and your reputation goes with it." },
            { text: "Refuse any performance-linked terms.", score: 4, feedback: "Honest but loses the deal; a measured, trial-based structure was available." },
          ],
        },
        c: {
          md: md`She asks for the KISR validation letter for the bid file.`,
          choices: [
            { text: "Correct yourself immediately: explain that it is a co-authored preprint, not a KISR endorsement, and send the preprint.", next: "b", score: 5, feedback: "The correction is right; the first answer still cost you credibility." },
            { text: "Say you will send it later and hope she forgets.", score: 0, feedback: "This is how a partnership and a market reputation end." },
          ],
        },
      },
    },
  ],
};

export default lesson;
