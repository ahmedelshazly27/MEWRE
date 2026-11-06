import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc04-l01",
  title: "The B2B sales process end to end, and founder-led sales",
  summary:
    "A B2B sale is a sequence of buyer decisions, not a sequence of seller activities. Define stages by verifiable exit criteria, map the buying committee, run the deal with a mutual action plan, and do the first 10 to 20 deals yourself because nobody else can learn the market for you.",
  minutes: 70,
  objectives: [
    "You can define a stage model for an enterprise deal where every stage ends with a buyer-verifiable exit criterion.",
    "You can name the roles in a buying committee (economic buyer, champion, technical evaluator, users, procurement, legal and security, blockers) and what each needs from you.",
    "You can back-calculate how many first meetings a target needs from stage conversion rates and cycle length.",
    "You can explain why the founder must run the first deals and what must be written down so a first sales hire can take over.",
  ],
  concepts: [
    { id: "fc04.sales-stages", name: "Stages with exit criteria", description: "A deal stage is defined by what the buyer has done or agreed (a verifiable exit criterion), not by what the seller has sent; conversion rates and cycle times are measured between these gates.", competency: "fc-sales", related: ["fc04.mutual-action-plan"] },
    { id: "fc04.buying-committee", name: "The buying committee", description: "The set of people who influence or approve an enterprise purchase: economic buyer, champion, technical evaluators, users, procurement, legal, security, and potential blockers.", competency: "fc-sales", related: ["fc04.sales-stages"] },
    { id: "fc04.founder-led-sales", name: "Founder-led sales", description: "The founder personally sells the first deals to learn the buyer's problem, language, objections and process, and turns that into a repeatable playbook before hiring sellers.", competency: "fc-sales" },
    { id: "fc04.mutual-action-plan", name: "Mutual action plan", description: "A shared, dated list of the steps both buyer and seller must complete to reach a decision by a target date; the buyer's willingness to co-own it is itself a qualification signal.", competency: "fc-sales", related: ["fc04.sales-stages", "fc04.buying-committee"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "A sale is a chain of buyer decisions",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`At Afterwave you sell infrastructure into hardware test teams where the person who feels the pain (a validation lead), the person who signs (a VP of engineering or quality), and the people who can stop the deal (IT security, procurement) are all different. At Mizan the buyer is often a public body with a formal process. In both cases you are the only seller. If you do not have a stage model with real exit criteria, you will mistake friendly meetings for pipeline, and your forecast to investors (and your own runway planning) will be fiction.`,
        },
        {
          kind: "md",
          md: md`### Stages are defined by the buyer, not the seller

The most common mistake in an early pipeline is stages named after seller activity: "demo done", "proposal sent". Sending a proposal is something you control; it says nothing about the probability of a signature. A good stage is a **gate** with an **exit criterion the buyer has met**, and that you could prove to a sceptical colleague (an email, a calendar invite, a document the buyer edited).

A stage model for an enterprise deal with a pilot (Afterwave-style; adapt the names, keep the logic):

| Stage | Exit criterion (buyer-verifiable) | Evidence |
|---|---|---|
| S0 Target account | Account fits the ideal customer profile (ICP): hardware test team, enough rigs, active change pain | ICP checklist in CRM |
| S1 First meeting | A named person with a relevant role met you for 20+ minutes | Calendar invite accepted |
| S2 Discovery complete | Pain is quantified in the buyer's own numbers; a champion candidate exists; you know who signs | Discovery notes, buyer confirmed the summary email |
| S3 Technical validation | The technical evaluator agrees the product can solve the problem in their environment | Deep-dive session held, written list of open technical questions closed |
| S4 Proposal agreed in principle | Scope, success criteria, price range and decision date accepted by the champion and known to the economic buyer | Shared pilot plan, mutual action plan with dates |
| S5 Signed (pilot or contract) | Purchase order or signed agreement | PO number, countersigned document |
| S6 Pilot running | Installed, data flowing, weekly check-ins held | Pilot log |
| S7 Converted | Annual contract signed after pilot success criteria are met | Signed order form |

Two consequences. First, **you can measure conversion between gates** ($c_i$, the share of deals that pass from stage $i$ to $i+1$) and **time in stage**, which is what makes a forecast possible (lesson 5). Second, a deal can only move forward when the buyer acts, which forces you to ask for the next buyer action at every meeting.

### The funnel arithmetic

If $T$ deals must close and the stage conversions are $c_1, c_2, \dots, c_k$, the number of deals that must enter at the top is`,
        },
        { kind: "equation", formula: "fc04-funnel-required" },
        {
          kind: "md",
          md: md`Conversion rates multiply, so a funnel with four gates at 50 to 60 % each converts only about 9 % end to end. That is why "we have 12 good conversations" usually means "we have about one deal". The cycle length $L$ (sum of median time in each stage) tells you **when** those first meetings must happen: a deal that needs 15 weeks from first meeting to signature cannot be started in the last month of the quarter.

### The buying committee

Enterprise purchases are group decisions. Gartner's research on B2B buying (widely cited, see references) describes buying groups of several people working through overlapping "jobs" (problem identification, solution exploration, requirements building, supplier selection), with much of the work done before a seller is involved. Practically, map these roles for every deal:

| Role | Typical title (hardware test org) | What they need from you | Risk if ignored |
|---|---|---|---|
| **Economic buyer** | VP Engineering, Head of Validation, Director of Quality | Business case in their metrics (release speed, escapes, headcount), risk is contained | Deal stalls at "we need to prioritise" |
| **Champion** | Test lead, validation manager | A win they can claim; material to sell internally | No one sells for you when you are not in the room |
| **Technical evaluator** | Test systems engineer, DAQ specialist | Proof it works on their rigs, their data formats, their clocks | Silent veto ("not a fit for our setup") |
| **Users** | Test engineers, technicians | Less manual work, no extra steps | Low adoption, pilot fails on usage |
| **Procurement** | Category buyer | Clean paperwork, comparable quotes, policy compliance | Months added at the end |
| **Legal and security** | Contracts counsel, CISO team | Data handling, liability caps, security questionnaire answers | Hard stop late in the cycle |
| **Blocker** | Owner of the in-house tool you replace | Their status and team preserved | Quiet sabotage |

The champion is not the same as a friendly contact. A champion has **power or influence**, **wants you to win** for their own reasons, and **acts** (introduces you to the economic buyer, shares internal information). Lesson 4 tests this formally.`,
        },
        {
          kind: "flow",
          title: "Enterprise deal with a pilot: stages and their gates",
          steps: [
            { label: "S1 First meeting", detail: "Relevant person, 20+ min" },
            { label: "S2 Discovery complete", detail: "Pain quantified, signer known" },
            { label: "S3 Technical validation", detail: "Evaluator says it can work here" },
            { label: "S4 Proposal agreed", detail: "Scope, criteria, price, date" },
            { label: "S5 Signed", detail: "PO or countersigned agreement" },
            { label: "S6 Pilot running", detail: "Data flowing, weekly reviews" },
            { label: "S7 Converted", detail: "Annual contract after criteria met" },
          ],
          caption: "Each arrow is a buyer decision. Measure the share of deals that cross it and how long they wait before crossing.",
        },
        {
          kind: "md",
          md: md`### Founder-led sales: why you, and for how long

Paul Graham's essay "Do Things That Don't Scale" makes the general point: in the early days founders must recruit users and customers manually. In B2B the reason is sharper. The first deals are **market research with a signature at the end**: you learn which pain is real, which title signs, which objection kills deals, what the security review asks, and what price is accepted. A hired seller cannot learn this for you, because they do not have the authority to change the product, the positioning or the price when the market tells you to.

Founder-led sales ends when you can hand over a **playbook** that a competent seller can follow without you: ICP, stage model with exit criteria, discovery questions, demo storyline, qualification rules, pricing and discount authority, pilot template, and a few closed deals that were won by following it. A common heuristic is to hire the first account executive only after the founder has closed roughly 10 to 20 deals with a repeatable pattern; treat this as practitioner lore, not a law.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Back-calculating the funnel for Afterwave's first pilots",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "How many first meetings for four paid pilots by 30 June 2027?",
          given: md`Illustrative assumptions (not Afterwave data): target $T = 4$ signed paid pilots by 30 June 2027. Assumed stage conversions S1 to S2 60 %, S2 to S3 50 %, S3 to S4 60 %, S4 to S5 50 %. Assumed median time in stage: 2, 3, 4 and 6 weeks.`,
          steps: [
            { md: md`**End-to-end conversion:** $\prod c_i = 0.60\times0.50\times0.60\times0.50 = 0.090$, so 9 % of first meetings become signed pilots.` },
            { md: md`**First meetings needed:** $N_{top} = \lceil 4/0.090\rceil = \lceil 44.4\rceil = 45$ first meetings with relevant people.` },
            { md: md`**Deals at each gate** (expected): 45 meetings, $45\times0.6 = 27$ discovery complete, $27\times0.5 = 13.5$ technically validated, $13.5\times0.6 = 8.1$ proposals agreed, $8.1\times0.5 = 4.05$ signed.` },
            { md: md`**Cycle length:** $L = 2+3+4+6 = 15$ weeks = 105 days. Counting back 105 days from 30 June 2027 gives **17 March 2027**: a meeting held after mid-March is unlikely to sign by the end of June.` },
            { md: md`**Weekly pace:** if prospecting starts on 4 January 2027, there are about 10 weeks to 17 March, so about $45/10 \approx 4.5$ first meetings per week, every week, on top of running the deals already in progress.` },
          ],
          result: md`45 first meetings, front-loaded into the first ten weeks of the year, about 4 to 5 a week. Lesson 8 turns this into an outbound volume: at typical cold reply rates that is roughly 1,500 contacted people. If this pace is impossible alongside building the company, the plan is wrong, not the arithmetic: change the target, the dates or the conversion rates you work on.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: a better demo stage and a bigger target",
          given: md`Same model, but you believe a better technical validation process lifts S3 to S4 from 60 % to 70 %, and the target is now 6 signed pilots.`,
          steps: [
            { md: md`New end-to-end conversion: $0.60\times0.50\times0.70\times0.50$.` },
            { md: md`$\prod c_i = 0.105$.`, hidden: true, check: { prompt: "End-to-end conversion (as a decimal)", answer: 0.105, tolerance: { abs: 0.001 } } },
            { md: md`First meetings needed: $\lceil 6/0.105 \rceil$.` },
            { md: md`$\lceil 57.1\rceil = 58$ first meetings.`, hidden: true, check: { prompt: "First meetings needed", answer: 58, unit: "meetings", tolerance: { abs: 0 } } },
          ],
          result: md`A 10-point improvement at one gate cut the required meetings per pilot from 11.1 to 9.5. Improving a gate is usually cheaper than adding top-of-funnel volume, because the deals you already have are the cheapest ones.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Running the first deals yourself",
      blocks: [
        {
          kind: "md",
          md: md`### What it looks like week to week

- **Tools:** a simple CRM (HubSpot, Pipedrive, Attio or even a disciplined spreadsheet) with your stages and exit criteria as fields; a call recorder with consent (and a note when a buyer refuses); a shared document per deal for the mutual action plan.
- **The mutual action plan (MAP):** a one-page table of dated steps from today to signature, with an owner on each line from **both** sides: "security questionnaire returned (Afterwave, 14 Feb)", "data sample shared (buyer test lead, 18 Feb)", "decision meeting with VP (buyer, 12 Mar)". Send it after discovery and update it after every meeting. A buyer who will not co-own a plan is telling you the deal is not real yet.
- **Weekly pipeline review with yourself:** for each deal, what is the stage, what is the next buyer action and its date, what would make it slip. Deals with no dated next step are not in the pipeline.
- **Write the playbook as you go:** every objection, every security question, every procurement step goes into a living document. That is the asset the first sales hire inherits.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How founder-led sales goes wrong",
          md: md`- **Happy ears:** "This is really interesting, send me more" is politeness, not a stage change. Ask for the next buyer action.
- **Single-threaded deals:** only one contact knows you. When they change job or go quiet, the deal dies. Aim for at least three people in the account by S3.
- **Selling to the wrong level:** a test engineer loves the product but has no budget and no route to the person who has. Ask "who else would be involved in a decision like this?" in the first meeting.
- **Hiring a seller to fix a product problem:** if you cannot close deals, a hired seller will not either, and you will have lost the learning.
- **Engineering partners in every call:** bring Ismail or Yusuf for the technical deep dive (S3), not for every first meeting. Their time is the build.`,
        },
        {
          kind: "checklist",
          title: "Before you call a stage change",
          items: [
            "Can I point to a buyer action (email, invite, document) that proves the exit criterion?",
            "Do I know the economic buyer's name and title, even if I have not met them?",
            "Is there a dated next step that the buyer owns?",
            "Are at least two people in the account aware of the deal?",
            "Is the mutual action plan updated with the decision date?",
          ],
        },
        {
          kind: "ask",
          title: "Questions that map the buying committee",
          items: [
            "If you decided this was worth doing, what would happen next on your side?",
            "Who else would need to be comfortable before something like this is bought?",
            "Who owns the budget for test infrastructure, and how is it planned (annual, project)?",
            "When you last bought a tool for the test lab, what did IT security and procurement ask for?",
            "Is anyone internally building something similar? How would they see this?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc04-l01-p1",
            type: "short",
            prompt: md`Write the stage model and mutual action plan for one real Afterwave or Mizan deal type. Give: (1) 6 to 8 stages, each with a buyer-verifiable exit criterion and the evidence; (2) the buying committee roles you expect, with a likely title and what each needs; (3) a mutual action plan from discovery to signature with at least 8 dated steps and an owner (you or the buyer) on each; (4) the funnel arithmetic: your assumed conversions, the number of first meetings needed for your target, and the latest date a new deal can start. Label all numbers as illustrative.`,
            rubric: [
              "Stages are defined by buyer actions with verifiable evidence, not by seller activities such as 'proposal sent'.",
              "Buying committee covers at least economic buyer, champion, technical evaluator, procurement and security or legal, with realistic titles for the chosen venture.",
              "Mutual action plan has 8 or more dated steps, owners on both sides, and ends with a decision meeting and signature date.",
              "Funnel arithmetic multiplies stage conversions correctly, rounds the required top-of-funnel up, and uses cycle length to set a latest start date.",
              "Numbers are labelled illustrative and no traction or customers are invented.",
              "Identifies at least one risk (single-threading, security review, procurement timing) and how the plan handles it.",
            ],
            modelAnswer: md`**Deal type:** Afterwave paid pilot with a robotics validation team (illustrative).

**Stages:** S1 First meeting (validation lead, 30 min, invite accepted). S2 Discovery complete (cost of change pain quantified in their numbers, confirmed by reply to my summary email; signer named). S3 Technical validation (test systems engineer confirms DAQ formats and clock sources are supported, written list of open items closed). S4 Proposal agreed (pilot scope, success criteria, fee and conversion price accepted by champion; VP aware; MAP shared). S5 Signed (PO). S6 Pilot running (Lockstep capturing on two rigs, weekly review). S7 Converted (annual order form).

**Committee:** economic buyer VP Engineering (release speed, headcount, risk); champion validation manager (fewer reruns, credit internally); technical evaluator test systems engineer (works on our rigs, no data leaves); users test engineers (no extra steps); procurement category buyer (vendor onboarding, quotes); CISO team (on-prem architecture, questionnaire); possible blocker internal tools team.

**MAP (illustrative dates):** 13 Jan discovery summary confirmed (buyer); 20 Jan data sample and rig list shared (buyer); 27 Jan technical deep dive (Afterwave + test systems engineer); 3 Feb security questionnaire sent (buyer), 17 Feb returned (Afterwave); 10 Feb pilot plan draft (Afterwave); 24 Feb success criteria agreed (champion); 3 Mar VP review (buyer); 10 Mar vendor onboarding complete (buyer procurement); 17 Mar PO issued (buyer).

**Arithmetic:** conversions 60/50/60/50 % give 9 %; for 4 pilots, 45 first meetings. Cycle 15 weeks, so for signatures by 30 June 2027 the last new first meeting is about 17 March 2027.

**Risks:** single-threaded on the validation manager (mitigation: meet the test systems engineer and VP by S3); security review late (mitigation: send the on-prem architecture note and questionnaire answers at S3, not after the proposal).`,
            explanation: md`A good answer makes every stage depend on a buyer action, multiplies conversions and uses the cycle length to set a start deadline. The model answer shows the expected level of specificity.`,
            concepts: ["fc04.sales-stages", "fc04.buying-committee", "fc04.mutual-action-plan"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to Ismail and Yusuf why you, the CEO, should personally run the first 15 or so sales cycles instead of hiring an experienced enterprise seller now.",
          keyPoints: [
            "Early deals are market learning: real pain, who signs, objections, security and procurement steps, accepted price.",
            "Only the founder can change product, positioning or price in response to what the market says.",
            "A seller needs a playbook to be productive; the founder writes it by doing the first deals.",
            "Hiring a seller before the pattern is repeatable usually wastes cash and hides product problems.",
            "Hand over when stages, exit criteria, discovery, demo, pricing and pilot templates are written and have produced closed deals.",
          ],
        },
        { kind: "sources", refs: ["fc04-r6", "fc04-r9", "fc04-r10"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc04-l01-q1",
      type: "mcq",
      prompt: "Which of these is a good stage exit criterion?",
      options: [
        "Proposal sent to the prospect",
        "Demo delivered",
        "Champion and economic buyer have accepted the pilot scope, success criteria and decision date in a shared plan",
        "Prospect said the product is interesting",
      ],
      answer: 2,
      explanation: md`A good criterion is a buyer action you can evidence. Sending a proposal or giving a demo is seller activity; "interesting" is politeness.`,
      concepts: ["fc04.sales-stages"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc04-l01-q2",
      type: "numeric",
      prompt: md`Stage conversions are 50 %, 40 %, 60 % and 50 %. How many first meetings do you need to sign 3 deals? (round up)`,
      answer: 50,
      tolerance: { abs: 0 },
      unit: "meetings",
      explanation: md`$0.5\times0.4\times0.6\times0.5 = 0.06$. $3/0.06 = 50$ exactly, so 50 first meetings.`,
      concepts: ["fc04.sales-stages"],
      difficulty: 1,
    },
    {
      id: "fc04-l01-q3",
      type: "multi",
      prompt: "Which statements about a champion are correct? (Select all that apply.)",
      options: [
        "A champion has power or influence in the buying organisation",
        "A champion is anyone who likes the product",
        "A champion has a personal reason to want you to win",
        "A champion acts for you, for example by arranging access to the economic buyer",
        "The champion is always the economic buyer",
      ],
      answer: [0, 2, 3],
      explanation: md`Liking the product makes a coach or fan, not a champion. The champion is usually not the economic buyer; they sell to the economic buyer for you.`,
      concepts: ["fc04.buying-committee"],
      difficulty: 1,
    },
    {
      id: "fc04-l01-q4",
      type: "numeric",
      prompt: md`Median time in stage is 3, 4, 5 and 8 weeks. A deal must sign by 31 December. How many weeks before 31 December must the first meeting take place at the latest?`,
      answer: 20,
      tolerance: { abs: 0 },
      unit: "weeks",
      explanation: md`Cycle length $L = 3+4+5+8 = 20$ weeks, so the first meeting should be about 20 weeks before the target date (around mid-August). Later starts can still close, but you should not forecast them.`,
      concepts: ["fc04.sales-stages"],
      difficulty: 1,
    },
    {
      id: "fc04-l01-q5",
      type: "decision",
      prompt: md`After a good first meeting, a validation lead says: "Send me some material and I will share it internally." What do you do?`,
      options: [
        { text: "Send the deck and a one-pager, and follow up in two weeks.", score: 0.2, feedback: "You lose control of the story and of the next step. Material forwarded without you rarely moves a deal." },
        { text: "Agree, and ask who they will share it with and whether you can join a 30-minute session with those people next week; propose two times.", score: 1, feedback: "You turn a vague request into a buyer action, learn the committee, and multi-thread the deal." },
        { text: "Move the deal to 'Proposal' in the CRM because there is internal interest.", score: 0, feedback: "No exit criterion has been met. This is how pipelines become fiction." },
      ],
      explanation: md`Every interaction should end with a dated buyer action. "Who else" questions map the committee early.`,
      concepts: ["fc04.buying-committee", "fc04.mutual-action-plan"],
      difficulty: 2,
    },
    {
      id: "fc04-l01-q6",
      type: "order",
      prompt: "Order these gates for an enterprise deal with a pilot.",
      items: ["First meeting held", "Discovery complete (pain quantified, signer known)", "Technical validation passed", "Pilot proposal agreed", "Signed pilot", "Converted to annual contract"],
      explanation: md`Discovery before technical validation (do not demo before you know the pain), proposal after the technical evaluator agrees, conversion only after success criteria are met.`,
      concepts: ["fc04.sales-stages"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc04-l01-f1", front: "What defines a good deal stage?", back: "A buyer-verifiable exit criterion (what the buyer did or agreed), with evidence, not a seller activity.", concepts: ["fc04.sales-stages"] },
    { id: "fc04-l01-f2", front: "Top-of-funnel needed for T deals", back: md`$N_{top} = \lceil T/\prod c_i \rceil$`, concepts: ["fc04.sales-stages"] },
    { id: "fc04-l01-f3", front: "Four gates at 60/50/60/50 % convert end to end at", back: "9 %: about 11 first meetings per signed deal.", concepts: ["fc04.sales-stages"] },
    { id: "fc04-l01-f4", front: "Seven roles in a buying committee", back: "Economic buyer, champion, technical evaluator, users, procurement, legal and security, blocker.", concepts: ["fc04.buying-committee"] },
    { id: "fc04-l01-f5", front: "Mutual action plan", back: "Shared, dated steps with owners on both sides from now to decision; a buyer who will not co-own it is not ready.", concepts: ["fc04.mutual-action-plan"] },
    { id: "fc04-l01-f6", front: "When does founder-led sales end?", back: "When a written playbook (ICP, stages, discovery, demo, pricing, pilot template) has produced repeatable closed deals that a hired seller can follow.", concepts: ["fc04.founder-led-sales"] },
  ],
};

export default lesson;
