import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh08-l05",
  title: "Moving from unpaid to paid: triggers, fairness, first hires and the equity question",
  summary:
    "Suhail is unpaid until revenue. That sentence is a promise, and leads will hold you to it. This lesson turns it into a written policy: a financial trigger for the first paid role (coverage ratio and cash reserve), which role to pay first and why, how to stay fair when one lead is paid and the others are not, and whether to offer equity at all. It also covers the legal fragility of unpaid work for a for-profit entity, which shapes how Suhail should be structured.",
  minutes: 70,
  objectives: [
    "Set a financial trigger for a paid role with a coverage ratio and a cash reserve test",
    "Choose the first paid role by the constraint it removes and how volunteer-unfriendly the work is",
    "Design a transition policy that keeps the team fair when the first person is paid",
    "Compare no equity, honoraria, dynamic equity splits and option grants for a community company, and pick one with reasons",
    "Explain why the legal entity decides whether volunteer roles are sustainable, and when to take advice",
  ],
  concepts: [
    { id: "sh08.paid-trigger", name: "Paid-role trigger", description: "A pre-agreed financial condition for the first paid role: trailing gross margin covers the role's loaded cost by a margin (coverage ratio, for example at least 1.5) and a cash reserve covers several months of the role.", competency: "sh-org", related: ["fc09.runway"] },
    { id: "sh08.first-paid-role", name: "First paid role", description: "The role whose work is most predictable, deadline-bound and volunteer-unfriendly, and which most directly grows the margin that pays for it; usually operations and partner fulfilment rather than a title for the founder.", competency: "sh-org", related: ["fc09.first-ten-hires", "sh08.paid-trigger"] },
    { id: "sh08.two-tier-team", name: "Two-tier team problem", description: "Once some people are paid and others are not for similar work, the unpaid feel exploited and the paid feel resented; mitigated by criteria published in advance, an open process and clearly different roles.", competency: "sh-org", related: ["sh08.crowding-out"] },
    { id: "sh08.equity-choices", name: "Equity choices for a community company", description: "No equity, honoraria, a dynamic equity split (for example Slicing Pie) or formal option grants; each fits a different entity and ambition, and informal promises fit none.", competency: "sh-org", related: ["fc09.option-grant", "fc09.vesting-cliff"] },
    { id: "sh08.volunteer-legal-status", name: "Legal status of volunteers", description: "Whether unpaid work is lawful volunteering or unpaid employment depends on the jurisdiction and on the entity: many systems treat unpaid work for a for-profit company very differently from volunteering for a non-profit.", competency: "sh-org", related: ["fc09.contractor-volunteer"] },
    { id: "sh08.shadow-value", name: "Shadow value of volunteer hours", description: "Volunteer hours priced at a market or replacement rate; makes the hidden subsidy visible when comparing a paid role with the volunteer hours it replaces.", competency: "sh-org" },
  ],
  sections: [
    {
      layer: "theory",
      title: "Turning \"unpaid until revenue\" into a rule",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`When Suhail's first sponsor money arrives, every lead will ask the same question within a week: does this mean we get paid? If the answer is improvised, you will either spend the money on salaries the revenue cannot sustain, or disappoint people who have worked unpaid for months. Writing the rule in January 2027, before any revenue, protects both the team's trust and Suhail's cash.`,
        },
        {
          kind: "md",
          md: md`### The financial trigger

Two tests, both written in advance.

**Coverage.** Recurring gross margin (sponsorship and ticket revenue minus the direct costs of the events and content it pays for) must cover the role's fully loaded annual cost with room to spare. Use a trailing average, because one large sponsor is not a run rate:`,
        },
        { kind: "equation", formula: "sh08-coverage-ratio" },
        {
          kind: "md",
          md: md`A threshold of $\kappa \ge 1.5$ leaves margin for a lost sponsor and for the costs a paid role brings (tools, travel, payroll administration). The number is a policy choice, not a standard; what matters is that it is chosen before revenue arrives.

**Reserve.** Cash in hand must cover several months of the role (for example six), so that one bad quarter does not mean a layoff. This is fc09's runway logic applied to one role.

### What volunteer hours are worth

To compare a paid role with the volunteer hours it replaces, price the hours:`,
        },
        { kind: "equation", formula: "sh08-volunteer-shadow-value" },
        {
          kind: "md",
          md: md`Illustrative: five leads pledging 25 hours a week for 46 weeks at a USD 30/h replacement rate represent about USD 34,500 a year of work. A 0.6 FTE paid role (about 24 hours a week) at an availability factor near 0.95 delivers about 23 effective hours a week, which is more than the whole volunteer team's effective capacity of 21 hours in Lesson 3. One paid person does not replace five leads (the network, the credibility and the range of skills do not transfer), but it does replace the **reliability** volunteers cannot give.

### Which role to pay first

fc09 sequences early hires by the bottleneck they remove. For a volunteer team, add a second filter: **how volunteer-unfriendly is the work?**

| Work type | Volunteer fit | Example at Suhail |
|---|---|---|
| Creative, self-paced, visible | Good | Editorial pieces, podcast interviews, talks |
| Project-based with a clear end | Good | Programming one hackathon, building one feature |
| Recurring, deadline-bound, invisible | Poor | Sponsor fulfilment, invoices and receipts, registration operations, venue logistics, replying to every message within a day |
| Revenue-generating, needs continuity | Poor to medium | Running the sponsor pipeline week after week |

The first paid role is usually where the bottom two rows meet: an **operations and partnerships** role that runs the recurring machinery and keeps sponsor relationships warm, so the volunteers can do the work they joined for. Paying the founder first, or paying the lead you like most, are the two common mistakes.

### Fairness when the first person is paid

Lesson 1 explained motivation crowding; the transition is where it bites. The **two-tier team** problem: once one person is paid for work similar to others', the unpaid start to feel exploited, and the paid one feels resented. Mitigations:

- **Publish the policy before revenue:** the trigger, the order of roles, the rate or band, and the selection process.
- **Open process, existing leads first:** current leads may apply and are considered first, against the same published criteria as outside candidates.
- **Different role, not the same role paid:** the paid role has a different charter (operations and fulfilment), so volunteer leads are not doing the same job for free.
- **Keep the volunteer returns intact:** recognition, decision rights and introductions do not move to the paid person.
- **No back pay promises.** Promising to pay past volunteer hours "when we can" creates a liability and an expectation you cannot price.

### The equity question

| Option | How it works | Fits when | Risks |
|---|---|---|---|
| **No equity** | Non-cash returns only, first consideration for paid roles | Suhail is a community or non-profit and does not intend to raise venture capital | Some strong candidates want ownership |
| **Honorarium** | An equal, meaningful one-off payment per term (not a token stipend) | There is margin and you want to recognise a completed term | Crowding out if small; tax and status questions |
| **Dynamic equity split** (Slicing Pie) | Each person's share equals their contributions at market value, weighted (Moyer: non-cash contributions 2x, cash 4x), divided by the total; recalculated until a fixed point | A small group intends to build a for-profit company and wants a fair split before a priced round | Bookkeeping burden; legal form must be set up properly; investors may require it to be converted |
| **Option grants** | Formal grants from a pool with vesting and cliff (fc09) | Suhail is a for-profit that will raise, and the person is effectively a founding team member | Dilution; meaningless if Suhail never has equity value |

The dynamic split, for those who use it:`,
        },
        { kind: "equation", formula: "sh08-dynamic-equity" },
        {
          kind: "md",
          md: md`For a builder community whose revenue is sponsorship and events (fc07 explains why it does not pass a venture fund-returner test), the honest default is **no equity, plus a published path to paid roles**. Equity becomes relevant only if a specific part of Suhail (for example the planned research arm, or a hiring product) is spun into a company that will raise.

### The entity decides what "volunteer" can mean`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Unpaid work for a for-profit company is legally fragile",
          md: md`Rules differ by country and were not checked for this lesson. Two well-known examples: US federal guidance under the Fair Labor Standards Act generally does not allow people to "volunteer" for a for-profit private employer, and the Dutch tax-free volunteer allowance is tied to conditions on the organisation (broadly, organisations that are not taxed as businesses) and to annual caps (fc09). In practice this means the legal form of Suhail (for example a foundation for the community activities alongside a company for commercial ones, or leads as cofounders with vesting equity) must be chosen with a lawyer in the country of incorporation before January 2027. Take advice; do not rely on the word "volunteer" in an agreement.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "When can Suhail afford its first paid role?",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Coverage and reserve for a part-time operations and partnerships role",
          given: md`Illustrative. Proposed role: 0.6 FTE operations and partnerships manager, fully loaded USD 2,500 per month (USD 30,000 a year). Policy: $\kappa \ge 1.5$ and a cash reserve of at least 6 months of the role. Suhail's trailing 6-month average gross margin is USD 4,000 per month; cash in hand is USD 22,000.`,
          steps: [
            { md: md`**Coverage:** $\kappa = 12 \times 4{,}000 / 30{,}000 = 48{,}000/30{,}000 = 1.6$. Passes the 1.5 test.` },
            { md: md`**Reserve needed:** $6 \times 2{,}500 = 15{,}000$ USD. Cash of 22,000 passes.` },
            { md: md`**Margin needed for the trigger:** $\bar{G}^* = 1.5 \times 30{,}000/12 = 3{,}750$ USD per month. Suhail is USD 250 a month above it, a thin buffer.` },
            { md: md`**Decision:** both tests pass, so the policy says the role opens. Because the buffer is thin, make it a 12-month contract with a review at month 6 against the same coverage test.` },
          ],
          result: md`Coverage 1.6 and a 6-month reserve (illustrative) trigger the first paid role under the published policy. The rule decides, not the mood of the week the sponsor paid.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A dynamic split, if the team chooses one",
          given: md`Illustrative, for a hypothetical spin-out where a small group intends to form a for-profit company. Using Moyer's weights (non-cash 2x, cash 4x): the founder contributes 400 unpaid hours at a market rate of USD 60/h; one team member 300 unpaid hours at USD 40/h; an early backer USD 5,000 in cash.`,
          steps: [
            { md: md`**Slices:** founder $400 \times 60 \times 2 = 48{,}000$; team member $300 \times 40 \times 2 = 24{,}000$; backer $5{,}000 \times 4 = 20{,}000$.` },
            { md: md`**Total:** $92{,}000$ slices. **Founder share:** $48{,}000/92{,}000$.` },
            { md: md`$= 52.2\%$.`, hidden: true, check: { prompt: "Founder share (%)", answer: 52.2, unit: "%", tolerance: { abs: 0.1 } } },
            { md: md`**Team member share:** $24{,}000/92{,}000$.` },
            { md: md`$= 26.1\%$; the backer has $21.7\%$.`, hidden: true, check: { prompt: "Team member share (%)", answer: 26.1, unit: "%", tolerance: { abs: 0.1 } } },
          ],
          result: md`A dynamic split makes the trade explicit, but it only means something inside a properly formed company with a written agreement. For Suhail's community activities, the default remains no equity.`,
        },
        {
          kind: "question",
          question: {
            id: "sh08-l05-p1",
            type: "numeric",
            prompt: md`Illustrative: a full-time role costs USD 54,000 a year fully loaded. Policy: coverage ratio at least 1.5. What trailing average monthly gross margin is needed, in USD?`,
            answer: 6750,
            tolerance: { abs: 1 },
            unit: "USD/month",
            explanation: md`$\bar{G}^* = \kappa\,C_{\text{role}}/12 = 1.5 \times 54{,}000/12 = 6{,}750$ USD per month.`,
            concepts: ["sh08.paid-trigger"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Writing and keeping the transition policy",
      blocks: [
        {
          kind: "md",
          md: md`### What the policy contains

1. **Statement:** Suhail is unpaid until it meets the trigger below; no salaries, stipends, equity or back pay are promised.
2. **Trigger:** coverage ratio and reserve, how gross margin is computed, who computes it (Finance Lead) and when (monthly).
3. **Order of roles:** the first paid role and the next one, with the reasoning.
4. **Process:** open posting; current leads may apply and are considered first; criteria published with the post; DACI with the founder as Approver and one lead as Contributor.
5. **Rate:** a band for each role, published.
6. **Volunteer returns after transition:** what stays the same for unpaid leads.
7. **Review:** the policy is reviewed every six months and changes are announced before they apply.

### How it is done in comparable organisations

Community companies that grew out of volunteer work typically professionalise operations first and keep content and programming community-led. MLH, for example, is a company with paid staff that supports student-run hackathons rather than running them; the research brief records that its revenue comes mainly from corporate sponsors. {Tech: Europe}'s commercial model is not public (the brief marks it as inferred), so do not use it as a template for pay.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Paying on the first big sponsor.** One sponsor is not a run rate; use the trailing average.
- **Quiet deals.** Paying one lead without a published process destroys trust faster than not paying anyone.
- **Token stipends for everyone.** USD 100 a month each costs real money and buys crowding out (Lesson 1).
- **Equity as a thank-you.** Small, undocumented equity in a company that may never have equity value is a future dispute.
- **Founder first.** Paying yourself first from community sponsorship is the fastest way to lose the leads.
- **Ignoring the entity.** Running unpaid "volunteers" through a for-profit company without advice.`,
        },
        {
          kind: "ask",
          title: "Questions for the lawyer and accountant before January 2027",
          items: [
            "In the country where Suhail will be incorporated, can a for-profit company have unpaid volunteers, and on what conditions?",
            "Would a foundation or association for community activities, alongside a company for commercial ones, be cleaner?",
            "What expense reimbursements and allowances can we pay without creating an employment relationship?",
            "If a lead works from Kuwait, Egypt or the UAE, what changes for a paid contract?",
            "If we later grant equity to early leads, what structure and tax treatment applies?",
          ],
        },
        { kind: "scenario", scenario: "sh08-s3" },
        { kind: "sources", refs: ["sh08-r20", "sh08-r21", "sh08-r22", "sh08-r3"] },
        { kind: "xref", to: "fc09-l02", note: "Founder Core covers option grants, vesting, salary versus equity arithmetic and the Netherlands STAK structure; use it if Suhail ever grants equity." },
        { kind: "xref", to: "fc08-l06", note: "Entity choices (Netherlands, Delaware, Switzerland, Kuwait) are in Founder Core; the volunteer question is one more input to that choice." },
        {
          kind: "question",
          question: {
            id: "sh08-l05-p2",
            type: "short",
            prompt: md`Write **Suhail's paid-transition policy**, to be shared with the five leads in January 2027. Include: the statement of what is and is not promised; the trigger (coverage ratio and reserve, with the gross margin definition and who computes it); the first and second paid roles with reasons; the selection process and how current leads are treated; how unpaid leads' returns are protected; your position on equity with reasons; and the open legal questions. Numbers illustrative; no names.`,
            rubric: [
              "Clear statement that nothing (salary, stipend, equity, back pay) is promised before the trigger",
              "Trigger uses a trailing gross margin coverage ratio and a cash reserve, with definitions and an owner",
              "First paid role chosen by constraint removed and volunteer-unfriendliness, with a reason for not paying the founder or a favourite first",
              "Open, published selection process with current leads considered first against the same criteria",
              "An explicit equity position with reasons tied to Suhail's entity and revenue model",
              "Legal status and entity questions flagged for advice rather than asserted",
            ],
            modelAnswer: md`**Suhail paid-transition policy (January 2027, illustrative numbers).**

**1. What we promise.** Suhail is unpaid until it meets the trigger below. Until then there are no salaries, stipends, equity or back pay, and nobody should rely on any. We reimburse agreed expenses in full within two weeks.

**2. Trigger.** A paid role opens when both hold: (a) coverage ratio $\kappa = 12\bar{G}/C_{\text{role}} \ge 1.5$, where $\bar{G}$ is the trailing 6-month average monthly gross margin (sponsorship, ticket and partner revenue minus the direct costs of the events and content they fund) and $C_{\text{role}}$ the fully loaded annual cost; and (b) cash in hand of at least 6 months of the role. The Finance Lead computes both monthly and posts them in the weekly update.

**3. Order.** First: a 0.6 FTE operations and partnerships manager (sponsor fulfilment, invoicing, registration and venue operations, keeping sponsor relationships warm). This is recurring, deadline-bound work that volunteers do worst and that most directly protects revenue. Second: a part-time events producer once Suhail runs more than one event a month. The founder is not paid from Suhail before both roles are funded.

**4. Process.** Every paid role is posted openly with its charter, band and criteria. Current leads may apply and are interviewed first, against the same criteria and a trial project. DACI: Driver Finance Lead, Approver founder, Contributors one lead not applying, Informed all leads.

**5. Unpaid leads after transition.** Decision rights, budget lines, credit and introductions stay with the leads. The paid role has a different charter and supports the leads; it does not take over their workstreams.

**6. Equity.** Suhail's community activities are funded by sponsors and events, not venture capital, so we offer no equity for them. If a separate venture is spun out (for example from the research arm), founding members will be offered formal, vesting equity in that company under a written agreement, not informal promises.

**7. Open legal questions.** Whether our entity can have unpaid volunteers and on what conditions; whether a foundation for community work alongside a company is cleaner; what allowances are allowed in each country our leads live in. We will take advice before the first event and update this policy.

**8. Review.** Every six months; changes announced a month before they apply.`,
            explanation: md`The test of a good policy: when the first sponsor pays, nobody needs to ask you what happens next, because the answer is already written.`,
            concepts: ["sh08.paid-trigger", "sh08.first-paid-role", "sh08.two-tier-team", "sh08.equity-choices", "sh08.volunteer-legal-status"],
            difficulty: 3,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh08-l05-q1",
      type: "numeric",
      prompt: md`Trailing average gross margin is USD 3,000 per month. The role costs USD 30,000 a year loaded. What is the coverage ratio? (2 decimals)`,
      answer: 1.2,
      tolerance: { abs: 0.005 },
      explanation: md`$\kappa = 12 \times 3{,}000/30{,}000 = 1.20$. Below a 1.5 policy threshold, so the role does not open yet.`,
      concepts: ["sh08.paid-trigger"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh08-l05-q2",
      type: "numeric",
      prompt: md`Four leads pledge a total of 20 hours a week for 46 weeks. At a USD 35/h replacement rate, what is the annual shadow value of their work, in USD?`,
      answer: 32200,
      tolerance: { abs: 1 },
      unit: "USD/yr",
      explanation: md`$V = 20 \times 46 \times 35 = 32{,}200$ USD. Pledged, not delivered: at an availability factor of 0.7 the delivered value is about USD 22,540.`,
      concepts: ["sh08.shadow-value"],
      difficulty: 1,
    },
    {
      id: "sh08-l05-q3",
      type: "mcq",
      prompt: "Which work should usually be the first paid role in a volunteer-led community?",
      options: [
        "The founder's role",
        "Creative work such as writing and podcast hosting",
        "Recurring, deadline-bound operations and sponsor fulfilment",
        "Whichever lead has worked the most hours",
      ],
      answer: 2,
      explanation: md`Volunteers are good at creative and project work and poor at recurring, invisible, deadline-bound work. Paying for the latter frees the volunteers and protects revenue.`,
      concepts: ["sh08.first-paid-role"],
      difficulty: 1,
    },
    {
      id: "sh08-l05-q4",
      type: "multi",
      prompt: "Which reduce the two-tier team problem when the first person is paid? (Select all that apply.)",
      options: [
        "Publishing the trigger, roles, bands and process before any revenue",
        "Paying the role quietly to avoid upsetting others",
        "Giving the paid role a different charter from the volunteer leads",
        "Considering current leads first against the same published criteria",
        "Promising back pay to all leads later",
      ],
      answer: [0, 2, 3],
      explanation: md`Transparency, a distinct role and a fair, open process address the comparison directly. Quiet deals and back pay promises make it worse.`,
      concepts: ["sh08.two-tier-team"],
      difficulty: 2,
    },
    {
      id: "sh08-l05-q5",
      type: "numeric",
      prompt: md`Dynamic split with Moyer's weights: A contributes 200 unpaid hours at USD 50/h; B contributes USD 10,000 cash. What is A's share? (percent, one decimal)`,
      answer: 33.3,
      tolerance: { abs: 0.1 },
      unit: "%",
      explanation: md`A: $200 \times 50 \times 2 = 20{,}000$ slices. B: $10{,}000 \times 4 = 40{,}000$. A's share $= 20{,}000/60{,}000 = 33.3\%$.`,
      concepts: ["sh08.equity-choices"],
      difficulty: 2,
    },
    {
      id: "sh08-l05-q6",
      type: "decision",
      prompt: md`A strong candidate for Head of Engineering says they will only join with equity. Suhail's community activities are sponsor-funded and no spin-out is planned. What do you say?`,
      options: [
        { text: "Explain honestly that the community has no equity to offer, describe the real returns and the paid-transition policy, and accept they may decline.", score: 1, feedback: "Right: equity in something that will not have equity value is a promise you cannot keep." },
        { text: "Promise 2% \"when we incorporate\".", score: 0, feedback: "An informal equity promise is a future dispute and unfair to the other leads." },
        { text: "Offer a USD 200 monthly stipend instead.", score: 0.2, feedback: "A token amount, unequal to the other leads, and unlikely to satisfy someone who wanted ownership." },
      ],
      explanation: md`The right candidate for a volunteer role is one whose motives the role can serve. Losing a candidate is better than creating a liability.`,
      concepts: ["sh08.equity-choices", "sh08.two-tier-team"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "sh08-l05-f1", front: "Coverage ratio for a paid role", back: md`$\kappa = 12\bar{G}/C_{\text{role}}$; open the role when $\kappa \ge 1.5$ and a 6-month reserve exists (illustrative policy).`, concepts: ["sh08.paid-trigger"] },
    { id: "sh08-l05-f2", front: "First paid role in a volunteer team", back: "Recurring, deadline-bound, invisible work that protects revenue: operations and sponsor fulfilment.", concepts: ["sh08.first-paid-role"] },
    { id: "sh08-l05-f3", front: "Two-tier team mitigations", back: "Publish the policy before revenue, distinct charter for the paid role, open process with current leads first, no back pay promises.", concepts: ["sh08.two-tier-team"] },
    { id: "sh08-l05-f4", front: "Slicing Pie weights (Moyer)", back: "Non-cash contributions at market value x 2, cash x 4; share = own slices / total slices.", concepts: ["sh08.equity-choices"] },
    { id: "sh08-l05-f5", front: "Default equity position for a sponsor-funded community", back: "No equity; a published path to paid roles. Equity only in a properly formed spin-out that will raise.", concepts: ["sh08.equity-choices"] },
    { id: "sh08-l05-f6", front: "Why the entity matters for volunteers", back: "Many jurisdictions treat unpaid work for a for-profit company differently from volunteering for a non-profit; take advice before relying on volunteers.", concepts: ["sh08.volunteer-legal-status"] },
  ],
  scenarios: [
    {
      id: "sh08-s3",
      title: "The first sponsor pays, and the leads ask about money",
      context: md`Illustrative. In April 2027 Suhail receives USD 18,000 from one sponsor for the next two hackathons. The direct costs of those events are budgeted at USD 9,000. In the next weekly review, two leads ask whether this means the team can start being paid. A transition policy was shared in January, with a coverage threshold of 1.5 for a USD 30,000-a-year role.`,
      start: "a",
      concepts: ["sh08.paid-trigger", "sh08.two-tier-team", "sh08.first-paid-role"],
      nodes: {
        a: {
          md: md`How do you answer?`,
          choices: [
            { text: "Point to the January policy, show the numbers: USD 9,000 of margin from one sponsor, not a trailing run rate, and what the trailing average would need to be (USD 3,750 a month). Thank the Partnerships lead publicly for the deal.", next: "b", score: 9, feedback: "Good: the rule answers, the numbers are shared, and the person who brought the money is recognised." },
            { text: "Say yes: split part of the margin among the five leads as a thank-you.", next: "c", score: 2, feedback: "A one-off split looks generous and sets the expectation that every sponsor means a payout." },
            { text: "Say it is too early to talk about money and move on.", next: "d", score: 3, feedback: "True but unhelpful; without numbers the answer sounds like an excuse." },
          ],
        },
        b: {
          md: md`One lead says: "So we work for free while Suhail has USD 9,000 in the bank?"`,
          choices: [
            { text: "Acknowledge the frustration, explain that the reserve is what makes a future paid role safe, and propose using part of the margin for things that help the leads now: travel to the events they run and a tooling budget, all within the policy.", score: 10, feedback: "Excellent: honest, consistent with the policy, and it converts margin into returns that do not crowd out motivation." },
            { text: "Tell them the policy is the policy.", score: 5, feedback: "Correct but cold; the question deserved an explanation and something concrete." },
          ],
        },
        c: {
          md: md`Each lead receives USD 1,000. The next quarter has no new sponsor, and a lead asks when the next payment is.`,
          choices: [
            { text: "Explain it was one-off, return to the January policy, and commit to following it from now on.", score: 4, feedback: "Recoverable, but you have shown the policy can be overridden when money arrives." },
            { text: "Pay again from the reserve to keep morale up.", score: 0, feedback: "You are now funding salaries from a reserve with no run rate behind it." },
          ],
        },
        d: {
          md: md`The question comes back a week later from three leads, now with a sense that something is being hidden.`,
          choices: [
            { text: "Share the numbers and the policy calculation in writing with everyone, and apologise for brushing it off.", score: 6, feedback: "Transparency late is better than never; the cost was a week of suspicion." },
            { text: "Keep deflecting.", score: 0, feedback: "Trust drains, and the best leads leave first." },
          ],
        },
      },
    },
  ],
};

export default lesson;
