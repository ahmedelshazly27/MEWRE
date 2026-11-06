import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh04-l04",
  title: "Running a partnership pipeline: qualification, stages, forecast and partner health",
  summary:
    "Treat partnerships like a sales pipeline with partner-verifiable stage exits, five qualification checks, stage-to-paid probabilities you label as assumptions, a weighted forecast filtered by when the cash is needed, and a health score for partners you already have.",
  minutes: 75,
  objectives: [
    "You can define partnership stages by what the partner has done, not by what Suhail has sent.",
    "You can qualify a partnership opportunity on budget, mandate, fit, timing and champion.",
    "You can derive stage probabilities from assumed conversions, compute a weighted forecast and coverage for an event, and decide whether the event is funded.",
    "You can score the health of an active partnership and decide when to intervene before renewal.",
  ],
  concepts: [
    { id: "sh04.partner-stages", name: "Partnership stages", description: "P1 first conversation, P2 need and budget owner confirmed, P3 proposal reviewed with the decision owner, P4 verbal yes and contract in review, P5 signed and invoiced, then paid, activated and renewed; each exit is evidenced by a partner action.", competency: "sh-partnerships", related: ["fc04.weighted-pipeline"] },
    { id: "sh04.partner-qualification", name: "Partner qualification", description: "Five checks before investing hours: a budget line with an owner, a mandate (the partner metric this moves), fit with Suhail's principles, timing that matches both calendars, and an internal champion.", competency: "sh-partnerships", related: ["fc04.meddpicc", "sh04.budget-line"] },
    { id: "sh04.weighted-forecast", name: "Weighted partnership forecast", description: "Deal values times stage-to-paid probabilities, counting only deals that can be paid before the cash is needed, reported with coverage and the deal list.", competency: "sh-partnerships", related: ["fc04.weighted-pipeline", "fc04.pipeline-coverage"] },
    { id: "sh04.partner-health", name: "Partner health score", description: "A weighted 0 to 100 score for active partners on sponsor engagement, delivery on both sides, partner-attributed outcomes, responsiveness and renewal signals, reviewed monthly.", competency: "sh-partnerships", related: ["sh04.partner-stages"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Stages, probabilities and the funding test",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`An event has a fixed date and fixed costs, and Suhail's leads are unpaid. If you commit to a venue and prizes on the strength of friendly meetings, you either cancel publicly or pay personally. A pipeline you can defend tells you, eight to ten weeks out, whether the event is funded, which partners to push, and when to cut scope. Founder Core teaches pipeline mechanics for software sales; this lesson adapts them to sponsorships, where the deadline is the event and the last stage is cash.`,
        },
        { kind: "xref", to: "fc04-l05", note: "Founder Core pipeline management and forecasting: weighted pipeline, coverage, sales velocity and forecast categories. This lesson applies them to partnerships." },
        {
          kind: "md",
          md: md`### Stages defined by partner actions

| Stage | Exit evidence (the partner did this) | Typical time |
|---|---|---|
| **P1 First conversation** | Held a call or meeting and agreed to a second conversation | 1 to 3 weeks |
| **P2 Need and owner confirmed** | Named the budget line, the decision owner and their timing; said what they need to see | 2 to 4 weeks |
| **P3 Proposal reviewed with decision owner** | The decision owner discussed the package and price; objections are known | 2 to 4 weeks |
| **P4 Verbal yes, contract in review** | Said yes in writing (email); legal or procurement is reviewing the agreement | 2 to 6 weeks |
| **P5 Signed and invoiced** | Signed; invoice accepted into their payment system | 2 to 8 weeks to pay |
| **Paid** | Money in Suhail's account | |
| **Activated and reported** | Benefits delivered; results report sent | 2 weeks after event |

"We sent the deck" is not a stage. An MOU is not a stage either: it can sit at any point and does not move a deal toward cash by itself.

### Qualification: five checks

Founder Core's MEDDPICC is built for enterprise software deals. For partnerships five checks do the same job:

1. **Budget:** there is a line this comes from, with an owner who can spend it.
2. **Mandate:** you know which of their metrics this moves (developers on platform, hires, applications to their programme, a strategy target).
3. **Fit:** the structure they want is compatible with Suhail's positions (independence, data, exclusivity).
4. **Timing:** their budget calendar and approval time allow payment before Suhail needs the cash.
5. **Champion:** someone inside wants this to happen and will push it.

A deal missing budget or timing does not belong in this event's forecast, however warm.

### From conversions to probabilities

Suhail has no history. Every conversion is an assumption, and you must label it so. With assumed conversions P1 to P2 = 0.40, P2 to P3 = 0.55, P3 to P4 = 0.60, P4 to P5 = 0.80 and P5 to paid = 0.95:`,
        },
        { kind: "equation", formula: "sh04-stage-probability" },
        {
          kind: "md",
          md: md`| Stage | Product of remaining conversions | $p_s$ (to paid) |
|---|---|---|
| P1 | $0.40\times0.55\times0.60\times0.80\times0.95$ | 0.100 |
| P2 | $0.55\times0.60\times0.80\times0.95$ | 0.251 |
| P3 | $0.60\times0.80\times0.95$ | 0.456 |
| P4 | $0.80\times0.95$ | 0.760 |
| P5 | $0.95$ | 0.950 |

The last factor, payment, is not a formality in the region: 60 to 90 day payment cycles are common for large organisations, and a signed sponsorship paid after the event does not fund the event.`,
        },
        { kind: "equation", formula: "sh04-weighted-pipeline" },
        { kind: "equation", formula: "sh04-coverage" },
        {
          kind: "widget",
          widget: "pipeline-forecast",
          props: { target: 60000, acv: 10000 },
          caption: "Illustrative: a USD 60k sponsorship target for a first hackathon season with an average deal of USD 10k. Change stage probabilities to the conservative assumptions above, then remove deals that cannot be paid before the cash deadline and watch coverage fall.",
        },
        {
          kind: "md",
          md: md`### Partner health for active partners

Once a partner has paid, the question changes from "will they sign?" to "will they renew, and grow?". Score active partners monthly:`,
        },
        { kind: "equation", formula: "sh04-health-score" },
        {
          kind: "md",
          md: md`| Dimension | Weight | 5 means |
|---|---|---|
| Executive sponsor engaged | 0.25 | Their decision owner attended or asked for results |
| Delivery on both sides | 0.25 | Every promised benefit delivered on time; they delivered theirs |
| Partner-attributed outcomes | 0.20 | Measurable results in their metric (teams on their platform, hires, applications) |
| Responsiveness | 0.15 | Replies within days, joins planning calls |
| Renewal signals | 0.15 | Has asked about next year, or included Suhail in their budget draft |

A score falling below about 60 three to six months before their budget is set is the signal for a review meeting with the decision owner, with the results report in hand.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Is the first hackathon season funded?",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Forecasting H1 2027 sponsorship cash (illustrative)",
          given: md`Illustrative; no partner exists. Target: USD 60k cash by six weeks before the season's first event, which is 12 weeks away. Pipeline: 8 deals at P1 (USD 64k total), 5 at P2 (USD 50k), 3 at P3 (USD 36k), 2 at P4 (USD 20k), 1 at P5 (USD 5k). Probabilities from the table: 0.100, 0.251, 0.456, 0.760, 0.950. Remaining cycle from P1 to paid is about 14 weeks.`,
          steps: [
            { md: md`**Weighted pipeline, all deals:** $64\times0.100 + 50\times0.251 + 36\times0.456 + 20\times0.760 + 5\times0.950 = 6.42 + 12.54 + 16.42 + 15.20 + 4.75 = 55.33$ USD k.` },
            { md: md`**Timing filter:** cash is needed in 6 weeks (12 weeks to the event minus 6). P1 deals need about 14 weeks: exclude them. In-period weighted $= 12.54 + 16.42 + 15.20 + 4.75 = 48.91$ USD k.` },
            { md: md`**Coverage:** in-period unweighted $= 50 + 36 + 20 + 5 = 111$ USD k, so coverage $= 111/60 = 1.85$x. Blended win rate $= 48.91/111 = 0.44$, so required coverage $\approx 1/0.44 = 2.27$x. Short.` },
            { md: md`**Gap:** expected shortfall $= 60 - 48.91 = 11.09$ USD k. At P2 probability 0.251, that needs about $11.09/0.251 = 44$ USD k of new P2 pipeline, that is four or five more qualified deals at USD 10k, within weeks. Realistically some P2 deals need more than six weeks too, so the true gap is larger.` },
            { md: md`**Decision:** do not wait. (1) Push the 2 P4 deals to signature with payment on signature; (2) ask P3 decision owners for a date; (3) prepare a reduced-scope budget at about USD 45k (smaller venue, prizes funded by credits partners) to switch to if P3 does not move within two weeks.` },
          ],
          result: md`Expected cash is about USD 49k against USD 60k: the season is **not yet funded**. The total weighted pipeline (USD 55k) looked close; the timing filter is what reveals the gap. Report to the team: "Commit USD 25k (P4 and P5), expected USD 49k, target USD 60k; scope decision on [date]."`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: health score of an active partner",
          given: md`Illustrative. An active partner after its first event scores: sponsor engagement 4, delivery 3 (one promised report was late), outcomes 2 (few teams used its platform), responsiveness 5, renewal signals 3. Weights 0.25, 0.25, 0.20, 0.15, 0.15.`,
          steps: [
            { md: md`Weighted average: $0.25\times4 + 0.25\times3 + 0.20\times2 + 0.15\times5 + 0.15\times3$.` },
            { md: md`$= 1.00 + 0.75 + 0.40 + 0.75 + 0.45 = $ **3.35**.`, hidden: true, check: { prompt: "Weighted average score (0 to 5)", answer: 3.35, tolerance: { abs: 0.01 } } },
            { md: md`Scale to 100: $H = 3.35\times100/5$.` },
            { md: md`$H = $ **67**.`, hidden: true, check: { prompt: "Health score H (0 to 100)", answer: 67, tolerance: { abs: 0.5 } } },
          ],
          result: md`67 is acceptable but the weak dimension is outcomes: few teams used the partner's platform. Fix the cause before renewal (a dedicated track, onboarding at the start of the hackathon, credits that work without a card) and say so in the results report.`,
        },
        {
          kind: "question",
          question: {
            id: "sh04-l04-p1",
            type: "numeric",
            prompt: md`Same assumed conversions. You add 3 new qualified deals at P2 worth USD 10k each, and one P3 deal (USD 12k) slips out of the period. What is the new in-period weighted forecast in USD k? (start from 48.91)`,
            answer: 50.97,
            tolerance: { abs: 0.05 },
            unit: "USD k",
            explanation: md`Add $30\times0.251 = 7.53$; remove $12\times0.456 = 5.47$. New forecast $= 48.91 + 7.53 - 5.47 = 50.97$ USD k. Adding early-stage deals helps slowly because each is worth only a quarter of its face value; losing one late-stage deal costs almost as much as three new early ones bring.`,
            concepts: ["sh04.weighted-forecast"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running the pipeline week to week",
      blocks: [
        {
          kind: "md",
          md: md`### Who and what

- **Owner:** the Partnerships lead runs the pipeline; the Finance lead owns "paid"; you review weekly.
- **Tool:** one shared table (Suhail already has Supabase for the site; a simple partners table with stage, value, probability, exit evidence link, next step and date, owner, close date, payment date is enough; a free CRM works too). Never in personal inboxes or WhatsApp only: volunteer leads change.
- **Weekly 30-minute review:** every deal moved, with the evidence; every deal without a dated next step is downgraded; every deal older than twice the typical time in stage is questioned.
- **Monthly:** health scores for active partners; conversion assumptions compared with what actually happened.
- **After each event:** results report to every partner within two weeks; losses recorded with a reason.

### Forecast categories for the team

Report **commit** (P4 and P5 with dated payment), **expected** (weighted, in-period) and **target** separately. Never one blended number: it hides whether the event is funded.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Three ways a partnership forecast lies",
          md: md`(1) **Counting MOUs and goodwill** as pipeline value. (2) **Ignoring payment timing**: a sponsor that pays 90 days after invoice funds next season, not this one. (3) **Single-threaded relationships**: the champion leaves, changes role or goes on Hajj leave and the deal stalls; have at least two contacts in every P3 and later deal.`,
        },
        { kind: "xref", to: "fc04-l04", note: "MEDDPICC and deal scoring in Founder Core: the five partnership checks above are a lighter version for sponsorship deals." },
        {
          kind: "checklist",
          title: "Weekly pipeline review",
          items: [
            "Every deal has a stage backed by partner evidence (an email, a meeting note, a signed document).",
            "Every deal has a dated next step and an owner.",
            "Deals that cannot be paid before the cash deadline are out of the event forecast.",
            "Commit, expected and target are reported separately.",
            "The scope decision date for the next event is set and visible.",
            "Health scores are current for active partners, with actions for any below 60.",
          ],
        },
        {
          kind: "question",
          question: {
            id: "sh04-l04-p2",
            type: "short",
            explanation: md`A sound pipeline design defines stages by partner actions, labels every probability as an assumption, filters by payment date, separates commit from expected, and links the forecast to a dated scope decision.`,
            prompt: md`Design Suhail's partnership pipeline for 2027 as a one-page operating document: stage definitions with exit evidence, the five qualification checks phrased as questions, your assumed conversions and resulting stage probabilities (labelled as assumptions), the fields of the shared pipeline table, the weekly and monthly review rules, and the rule that decides when an event's scope is cut. Include an illustrative forecast for one event.`,
            rubric: [
              "Stage exits are defined by partner actions with evidence, and payment is a stage.",
              "The five qualification checks are stated as concrete questions.",
              "Conversions are labelled as assumptions and stage probabilities are computed correctly from them.",
              "The forecast filters deals by when cash is needed and reports commit, expected and target separately.",
              "Defines a scope-cut rule with a date and threshold.",
              "Specifies the shared table fields and the review cadence, with owners.",
            ],
            modelAnswer: md`**Suhail partnership pipeline: operating rules 2027 (draft)**

**Stages (exit = partner action):** P1 first conversation held and second agreed; P2 budget line, owner and timing named; P3 decision owner reviewed package and price; P4 written yes, contract in review; P5 signed, invoice accepted; Paid; Activated and reported.

**Qualification questions:** Which budget does this come from and who can spend it? Which of your metrics does it move? Can you accept our positions on independence, data and exclusivity? Can you pay by [date]? Who inside wants this and will push it?

**Assumed conversions (no history, review after 20 closed deals):** 0.40, 0.55, 0.60, 0.80, 0.95, giving $p$ = 0.10, 0.25, 0.46, 0.76, 0.95.

**Table fields:** organisation, type, budget line, owner, champion, second contact, stage, evidence link, value (cash), in-kind value, next step and date, expected sign date, expected payment date, event funded, probability, lead, loss reason.

**Cadence:** weekly 30-minute review (Partnerships lead, Finance lead, me); monthly health scores and assumption check; results report within two weeks of every event.

**Scope rule:** eight weeks before an event, if commit is below 50 % of target or expected is below 80 %, we switch to the reduced-scope budget prepared in advance.

**Illustrative forecast, Riyadh hackathon (target USD 40k, cash needed in 6 weeks):** P2 USD 30k ($\times0.25 = 7.5$), P3 USD 24k ($\times0.46 = 11.0$), P4 USD 15k ($\times0.76 = 11.4$), P5 USD 5k ($\times0.95 = 4.75$); P1 excluded on timing. Commit USD 20k; expected USD 34.7k; target USD 40k. Below 80 % of target? $34.7/40 = 87$ %: proceed, but push P4 to payment this week.`,
            concepts: ["sh04.partner-stages", "sh04.partner-qualification", "sh04.weighted-forecast"],
            difficulty: 3,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh04-l04-q1",
      type: "mcq",
      prompt: md`Which of these moves a deal from P2 to P3?`,
      options: [
        "Suhail sends the sponsorship deck.",
        "The partner's decision owner discusses the package and price with you.",
        "The partner signs an MOU.",
        "The partner follows Suhail on LinkedIn.",
      ],
      answer: 1,
      explanation: md`Stage exits are partner actions. P3 requires the decision owner to have reviewed the proposal. Sending a deck is seller activity, and an MOU does not by itself move a deal toward cash.`,
      concepts: ["sh04.partner-stages"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh04-l04-q2",
      type: "numeric",
      prompt: md`Assumed conversions P3 to P4 = 0.5, P4 to P5 = 0.8, P5 to paid = 0.9. What is the probability that a deal at P3 is paid?`,
      answer: 0.36,
      tolerance: { abs: 0.005 },
      explanation: md`$p_{P3} = 0.5\times0.8\times0.9 = 0.36$. Probabilities are products of the remaining conversions, including payment.`,
      concepts: ["sh04.weighted-forecast"],
      difficulty: 1,
    },
    {
      id: "sh04-l04-q3",
      type: "numeric",
      prompt: md`Event target USD 50k, USD 10k already paid. In-period unweighted pipeline USD 90k with a blended win rate of 40 %. What is the coverage, and is it enough? Give the coverage ratio.`,
      answer: 2.25,
      tolerance: { abs: 0.01 },
      unit: "x",
      explanation: md`Coverage $= 90/(50 - 10) = 2.25$x. Required $\approx 1/0.40 = 2.5$x, so it is not enough: expected bookings $= 0.40\times90 = 36$ USD k against 40 remaining.`,
      concepts: ["sh04.weighted-forecast"],
      difficulty: 2,
    },
    {
      id: "sh04-l04-q4",
      type: "multi",
      prompt: md`Which belong in Suhail's five partnership qualification checks?`,
      options: ["Budget line with an owner", "Mandate: the partner metric it moves", "The partner's brand colours", "Timing that allows payment before the cash is needed", "An internal champion", "Fit with Suhail's positions on independence, data and exclusivity"],
      answer: [0, 1, 3, 4, 5],
      explanation: md`Budget, mandate, fit, timing and champion. Brand colours are an activation detail, not qualification.`,
      concepts: ["sh04.partner-qualification"],
      difficulty: 1,
    },
    {
      id: "sh04-l04-q5",
      type: "decision",
      prompt: md`Eight weeks before an event, commit is USD 12k and expected is USD 30k against a USD 50k target. Your scope rule says cut if commit is below 50 % or expected below 80 % of target. The Events lead wants to wait two more weeks. What do you do?`,
      options: [
        { text: "Wait two weeks: deals often close late.", score: 0.2, feedback: "Late closes happen, but venue and prize commitments are being made now. The rule exists to stop exactly this hope." },
        { text: "Apply the rule: switch to the reduced-scope budget now, and restore scope only if cash arrives.", score: 1, feedback: "Right: commit 24 % and expected 60 % both trigger the rule. Reducing early is cheap; cancelling late is expensive and public." },
        { text: "Cancel the event.", score: 0.3, feedback: "Too drastic: a reduced-scope event can still run on the expected cash." },
        { text: "Ask leads to cover the gap personally.", score: 0, feedback: "Unpaid volunteers funding the event personally is unsustainable and creates conflicts." },
      ],
      explanation: md`$12/50 = 24$ % and $30/50 = 60$ % both trip the rule. Decide scope on evidence and dates, not on hope.`,
      concepts: ["sh04.weighted-forecast"],
      difficulty: 2,
    },
    {
      id: "sh04-l04-q6",
      type: "numeric",
      prompt: md`Health weights 0.25, 0.25, 0.20, 0.15, 0.15; scores 2, 4, 3, 2, 1. What is H on the 0 to 100 scale?`,
      answer: 51,
      tolerance: { abs: 0.5 },
      explanation: md`Weighted average $= 0.50 + 1.00 + 0.60 + 0.30 + 0.15 = 2.55$; $H = 2.55\times20 = 51$. Below 60: schedule a review with the decision owner, with the results report.`,
      concepts: ["sh04.partner-health"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh04-l04-f1", front: "Partnership stages", back: "P1 first conversation, P2 need and owner confirmed, P3 proposal reviewed with decision owner, P4 verbal yes and contract in review, P5 signed and invoiced, paid, activated and reported.", concepts: ["sh04.partner-stages"] },
    { id: "sh04-l04-f2", front: "Five partnership qualification checks", back: "Budget, mandate, fit, timing, champion.", concepts: ["sh04.partner-qualification"] },
    { id: "sh04-l04-f3", front: "Why filter the pipeline by payment date for an event?", back: "Cash paid after the commitment deadline does not fund the event; count only deals that can be paid in time.", concepts: ["sh04.weighted-forecast"] },
    { id: "sh04-l04-f4", front: "Required coverage", back: md`About $1/W$, where $W$ is the blended win rate of the counted deals.`, concepts: ["sh04.weighted-forecast"] },
    { id: "sh04-l04-f5", front: "Partner health score", back: md`$H = 20\sum_k w_k h_k$ with $h_k$ from 0 to 5; review below about 60.`, concepts: ["sh04.partner-health"] },
    { id: "sh04-l04-f6", front: "Three forecast lies", back: "Counting MOUs and goodwill, ignoring payment timing, single-threaded relationships.", concepts: ["sh04.weighted-forecast"] },
  ],
};

export default lesson;
