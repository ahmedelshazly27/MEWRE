import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc03-l05",
  title: "Launch Planning: Tiers, Sequencing, Assets and Metrics",
  summary:
    "In B2B deep-tech a launch is a pipeline event with a date, not a press moment. Tier launches by how much they change the story, sequence them from internal readiness to sustained follow-through, build only the assets each tier needs, and set funnel targets in advance so you can tell afterwards which rate failed.",
  minutes: 70,
  objectives: [
    "Assign a launch to tier 1, 2 or 3 using explicit criteria",
    "Sequence a launch from readiness through design partners, briefings, launch day and a 90-day follow-through",
    "List the assets a tier-1 B2B deep-tech launch needs, including the security pack",
    "Set launch targets with a funnel model and convert pipeline to expected bookings",
    "Check that follow-up capacity matches the demand a launch creates",
  ],
  concepts: [
    { id: "fc03.launch-tiers", name: "Launch tiers", description: "Classification of launches by how much they change what the company sells or to whom: tier 1 (new product, category claim, new segment), tier 2 (major capability), tier 3 (incremental).", competency: "fc-gtm", related: ["fc03.positioning"] },
    { id: "fc03.launch-sequencing", name: "Launch sequencing", description: "Ordered phases: internal readiness, design-partner proof, briefings under embargo, launch day, and 30/60/90-day follow-through.", competency: "fc-gtm", related: ["fc03.launch-tiers"] },
    { id: "fc03.launch-assets", name: "Launch assets", description: "The materials each tier needs: positioning and messaging docs, landing page, demo, technical paper, security pack, deck, one-pagers, outreach sequences, FAQ and objection handling.", competency: "fc-gtm", related: ["fc03.message-house"] },
    { id: "fc03.launch-metrics", name: "Launch metrics", description: "Leading (reach, replies, meetings, qualified opportunities) and lagging (pipeline value, pilots, bookings) metrics set as targets before launch, using a funnel model.", competency: "fc-gtm", related: ["fc03.launch-tiers", "fc03.cac"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What a launch is for, and how to size it",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Afterwave will "launch" several times in its first two years: the company itself, Ripple when it is ready for design-partner data, Enclave as a deployment option, perhaps a YC Demo Day. Each launch spends the scarcest resource you have: three founders' attention. A launch that produces 40 meetings you cannot follow up wastes the audience; one that produces press but no pipeline wastes the date. The same discipline applies to Suhail: the first Suhail Season conference or the newsletter launch is a tiered launch with assets, a sequence and targets.`,
        },
        {
          kind: "md",
          md: md`### Three jobs of a B2B launch

1. **Create pipeline**: qualified conversations with ICP accounts in a short window.
2. **Create credibility**: proof that the product is real (demo, technical paper, design-partner evidence) that sales can reuse for a year.
3. **Force internal alignment**: a date makes positioning, messaging, pricing and the security pack get finished.

Press coverage is a means to these, rarely an end. A test lead at an e-drive supplier does not read TechCrunch; he reads a technical post a colleague forwards, or sees a talk at a test-engineering conference.

### Tiers

| | Tier 1 | Tier 2 | Tier 3 |
|---|---|---|---|
| **Changes** | What you sell or to whom (new product, category claim, new segment, company launch) | A major capability for existing buyers | Incremental improvement |
| **Afterwave examples** | Company launch; Ripple general availability | Enclave isolated-tenant option; new DAQ format support | Faster import, UI fixes |
| **Lead time** | 8 to 12 weeks | 3 to 6 weeks | Days |
| **Assets** | Full set (below) | Post, email to customers and pipeline, demo update, sales note | Release notes |
| **Audience** | Whole ICP list, investors, press, partners | Customers, open pipeline, ICP subset | Users |
| **Frequency** | 1 to 2 per year | Quarterly | Continuous |

Tier by **change in story**, not by engineering effort. A hard refactor is tier 3; a small feature that opens a new segment can be tier 1.

### Sequencing`,
        },
        {
          kind: "flow",
          title: "Tier-1 launch sequence (B2B deep-tech)",
          steps: [
            { label: "T-12 to T-8 weeks: readiness", detail: "Positioning and message house final; launch owner and date; targets set; ICP list scored" },
            { label: "T-8 to T-4: proof", detail: "Design partners run on real data; collect results and written permission to quote; fix what breaks" },
            { label: "T-4 to T-1: assets and briefings", detail: "Landing page, demo video, technical paper, security pack, deck; briefings to chosen journalists, analysts, investors and partners under embargo" },
            { label: "T: launch day", detail: "Publish post and paper; personal emails to top ICP accounts; founder posts; community channels; customers told first" },
            { label: "T+1 to T+30: convert", detail: "Every reply answered within 24 h; meetings booked; qualify against ICP; pilots scoped" },
            { label: "T+30 to T+90: sustain", detail: "Follow-up content, talks, case material; measure against targets; retro and update positioning" },
          ],
          caption: "Most of the value of a launch is created in the 30 days after it. Book the founders' calendars for follow-up before launch day.",
        },
        {
          kind: "md",
          md: md`### Assets for a tier-1 launch

- **Internal:** positioning canvas, message house, FAQ and objection handling, pricing and pilot offer, launch tracker with owners.
- **Proof:** demo video (3 minutes, real or clearly labelled synthetic data), technical paper (how selection works, its limits), design-partner evidence only with written permission.
- **Buyer-facing:** landing page (hero = core message, three sections = pillars), first-meeting deck, one-pager per persona.
- **Security pack:** architecture and data-flow diagrams, deployment and update model, standard questionnaire answers. For on-prem B2B, the security pack is a launch asset, because it is what shortens the cycle afterwards.
- **Outreach:** personal emails to the top 50 accounts, a sequence for the rest of the ICP list, founder posts, partner and investor notes.

### Metrics: set targets before launch

Model the launch as a funnel:`,
        },
        { kind: "equation", formula: "fc03-launch-pipeline" },
        {
          kind: "md",
          md: md`and expected bookings, which arrive one sales cycle later:`,
        },
        { kind: "equation", formula: "fc03-expected-bookings" },
        {
          kind: "md",
          md: md`Setting $N$, $r_e$, $r_m$ and $r_q$ targets in advance gives you a diagnosis afterwards: low $r_e$ means the message or list is wrong; low $r_m$ means the ask is wrong; low $r_q$ means the ICP is wrong. Without targets every launch "went well".`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Setting launch targets for Ripple and Lockstep",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Tier-1 launch of Ripple: targets, pipeline and capacity",
          given: md`Illustrative assumptions: 300 ICP accounts scoring 70+, 3 contacts each; reply rate 8 % (personalised, technical content); 50 % of replies take a meeting; 40 % of meetings become qualified opportunities; expected ACV EUR 100k; win rate 20 %; cycle 6 to 9 months. Founders can each run about 4 first meetings a week alongside other work; engineering can support at most 3 concurrent pilots.`,
          steps: [
            { md: md`**Reach:** $N = 300 \times 3 = 900$ contacts.` },
            { md: md`**Funnel:** replies $900 \times 0.08 = 72$; meetings $72 \times 0.5 = 36$; qualified opportunities $36 \times 0.4 = 14.4$.` },
            { md: md`**Pipeline:** $\Pi = 14.4 \times 100{,}000 = \text{EUR } 1.44$ m. **Expected bookings:** $B = 1.44\text{ m} \times 0.20 = \text{EUR } 288{,}000$ (about 3 customers), arriving 6 to 9 months after launch.` },
            { md: md`**Meeting capacity:** 36 meetings at $3 \times 4 = 12$ a week takes **3 weeks** of founder calendar. Book it before launch day.` },
            { md: md`**Pilot capacity:** 14 qualified opportunities but 3 concurrent pilots. Rank by ICP score, run 3, schedule the next 3 for the following quarter, and keep the rest warm with content. Otherwise the launch creates more demand than you can serve and the best accounts wait.` },
          ],
          result: md`Targets for the launch review: 900 contacts, 72 replies, 36 meetings, 14 qualified opportunities, EUR 1.4 m pipeline, 3 pilots started within 45 days, about EUR 0.29 m expected bookings within 9 months. The bookings number is sobering, and that is the point: a launch accelerates a sales motion; it does not replace it.`,
        },
        { kind: "widget", widget: "pipeline-forecast", props: { acv: 100000, target: 300000 }, caption: "Load the Ripple launch pipeline (EUR 100k ACV) and see how stage probabilities and cycle length spread expected bookings across quarters." },
        {
          kind: "worked",
          mode: "faded",
          title: "Tier-2 launch: Lockstep for battery test labs",
          given: md`Illustrative: 120 battery-lab accounts, 2 contacts each; reply rate 10 %; meeting rate 60 %; qualification rate 50 %; Lockstep-only ACV EUR 40k; win rate 25 %.`,
          steps: [
            { md: md`$N = 240$; replies $= 24$; meetings $= 14.4$.` },
            { md: md`Qualified opportunities $= 14.4 \times 0.5 =$ **7.2**.`, hidden: true, check: { prompt: "Qualified opportunities", answer: 7.2, tolerance: { abs: 0.05 } } },
            { md: md`Pipeline $\Pi = 7.2 \times 40{,}000 =$ **EUR 288,000**.`, hidden: true, check: { prompt: "Pipeline (EUR)", answer: 288000, unit: "EUR", tolerance: { rel: 0.005 } } },
            { md: md`Expected bookings $= 288{,}000 \times 0.25 = \text{EUR } 72{,}000$. At ACV EUR 40k the field-sales ACV floor (about EUR 100k) is not met: this segment should be served through a cheaper motion, or Lockstep sold as the entry point to a larger contract.` },
          ],
          result: md`The launch model doubles as a motion check: a segment whose ACV sits below the floor of the motion you would use to follow up the launch is a segment you should not launch into yet, or should reach through a partner.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Running a launch with a three-person team",
      blocks: [
        {
          kind: "md",
          md: md`### Who and how

- **Launch owner:** you. One person owns the date, the tracker and the go/no-go call.
- **Engineering partners:** demo, technical paper, security pack accuracy, and the go/no-go on product readiness.
- **Tracker:** one sheet: asset, owner, due date, status, reviewer. Weekly 30-minute launch stand-up from T-8 weeks.
- **Timing:** avoid weeks when buyers are away (late December, August in much of Europe). Tie the story to a real moment where one exists: the EU Machinery Regulation applying from 20 January 2027 is a legitimate content hook for "evidence after every change"; a YC Demo Day would be an investor-audience tier-1 moment if the application succeeds.
- **Go/no-go criteria (T-1 week):** demo runs on real or labelled synthetic data without hand-holding; at least one design partner willing to speak or be quoted (in writing); security pack reviewed by an engineer; founder calendars blocked for follow-up.
- **Retro (T+30 and T+90):** compare each funnel rate with its target; update the message house with what prospects repeated back.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How B2B launches fail",
          md: md`- **Launching before real data:** the first prospect connects real MDF files and the demo breaks; the launch becomes a reputation event.
- **Quoting design partners without written approval:** in hardware, test results are often confidential; one unapproved logo can end the relationship.
- **No follow-up capacity:** replies wait a week; the launch audience cools.
- **Vanity metrics:** page views and likes reported instead of qualified opportunities.
- **One-day launch:** nothing is planned for T+7 onward, so the window closes.`,
        },
        {
          kind: "checklist",
          title: "Tier-1 launch readiness",
          items: [
            "Positioning canvas and message house signed off by all three founders",
            "Funnel targets written down (N, reply, meeting, qualification rates; pipeline; pilots)",
            "Landing page, demo video, technical paper, deck and one-pagers reviewed",
            "Security pack (architecture, data flows, deployment model, questionnaire answers) ready to send",
            "Written permission for every customer or partner reference",
            "Founder calendars blocked for 3 weeks of follow-up; pilot slots and pilot agreement ready",
            "Customers and design partners told before the public announcement",
          ],
        },
        { kind: "xref", to: "m14-l03", note: "Drafting documents with AI: useful for first drafts of launch posts, one-pagers and FAQ, with the verification rules that apply to every claim." },
        {
          kind: "question",
          question: {
            id: "fc03-l05-p1",
            type: "short",
            prompt: md`**Produce a tier-1 launch plan for Ripple's general availability.** Include: (1) why it is tier 1, (2) a dated sequence from T-12 weeks to T+90 days with an owner per phase, (3) the asset list with an owner and reviewer for each, (4) funnel targets computed with the pipeline formula and expected bookings, (5) a capacity check for meetings and pilots, and (6) go/no-go criteria. Use illustrative numbers and do not invent customers or partners.`,
            rubric: [
              "Tier justified by change in story (new product or category claim), not by engineering effort",
              "Sequence covers readiness, design-partner proof, briefings, launch day and a 30/60/90-day follow-through, with owners",
              "Asset list includes proof (demo, technical paper), buyer-facing materials and a security pack, with owner and reviewer",
              "Funnel targets are computed correctly with the formula (N x reply x meeting x qualification x ACV) and converted to expected bookings with a win rate and timing",
              "Capacity check compares meetings and pilots with founder and engineering capacity and states what happens to excess demand",
              "Go/no-go criteria are concrete and include written permission for any references; no fabricated customers",
            ],
            modelAnswer: md`**1. Tier 1:** Ripple GA changes what Afterwave sells (from capture and environment to a decision engine) and stakes the category claim "change-impact analysis for hardware test".

**2. Sequence.** T-12 to T-8 (CEO): positioning and message house final; ICP list of 250 accounts at 70+ scored; targets set. T-8 to T-4 (CTO-equivalent cofounder): two design partners replay six months of release history; selection rate and missed regressions measured; written permission to quote or anonymise. T-4 to T-1 (CEO): assets; embargoed briefings to two trade journalists and lead investors. T (CEO): post, technical paper, 50 personal emails, founder posts. T+1 to T+30 (all founders): replies in 24 h, meetings, qualification. T+30 to T+90 (CEO): conference talk submission, follow-up article, retro at T+30 and T+90.

**3. Assets.** Message house and FAQ (CEO / reviewed by both cofounders); demo video (cofounder / CEO); technical paper on selection method and limits (cofounder / external test engineer); security pack (cofounder / CEO); landing page and deck (CEO / cofounder); outreach sequences (CEO).

**4. Targets.** $N = 250 \times 3 = 750$; replies $750 \times 0.08 = 60$; meetings $30$; qualified $30 \times 0.4 = 12$; $\Pi = 12 \times 100{,}000 = \text{EUR } 1.2$ m; $B = 1.2\text{ m} \times 0.2 = \text{EUR } 240{,}000$ expected within 6 to 9 months.

**5. Capacity.** 30 meetings at 12 a week = 2.5 weeks of founder time, blocked in advance. Pilots: 12 qualified, capacity 3 concurrent; top 3 by ICP score start within 45 days, next 3 in the following quarter, others nurtured.

**6. Go/no-go (T-1 week):** demo runs end to end on design-partner-format data; selection results measured, not estimated; written permission for every reference; security pack reviewed; calendars blocked. Any miss moves the date, not the bar.`,
            explanation: md`Graded against the rubric. A strong plan reads like a project plan with a funnel attached, and is honest about the bookings it will produce.`,
            concepts: ["fc03.launch-tiers", "fc03.launch-sequencing", "fc03.launch-assets", "fc03.launch-metrics"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to Ismail why the Ripple launch target is '14 qualified opportunities and 3 pilots', not '10,000 page views and an article'.",
          keyPoints: [
            "A B2B deep-tech launch is a pipeline event with a date",
            "Funnel targets (reach, replies, meetings, qualified opportunities) are set before launch and diagnose what failed afterwards",
            "Bookings arrive one sales cycle later; pipeline times win rate gives the expectation",
            "Capacity (founder meetings, concurrent pilots) caps what a launch can convert",
            "Press and page views matter only if they produce qualified conversations with ICP accounts",
          ],
        },
        { kind: "sources", refs: ["fc03-r1", "fc03-r9", "fc03-r7"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc03-l05-q1",
      type: "mcq",
      prompt: "What should decide a launch's tier?",
      options: ["Engineering effort spent", "How much it changes what you sell or to whom", "How many features are included", "The marketing budget available"],
      answer: 1,
      explanation: md`Tier by change in story. A hard refactor can be tier 3; a small capability that opens a new segment can be tier 1.`,
      concepts: ["fc03.launch-tiers"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc03-l05-q2",
      type: "order",
      prompt: "Order the phases of a tier-1 launch.",
      items: ["Internal readiness (positioning, targets, owner)", "Design-partner proof on real data", "Assets and embargoed briefings", "Launch day", "30/60/90-day follow-through and retro"],
      explanation: md`Proof comes before assets because the assets quote the proof; follow-through is where most pipeline is converted.`,
      concepts: ["fc03.launch-sequencing"],
      difficulty: 1,
    },
    {
      id: "fc03-l05-q3",
      type: "numeric",
      prompt: md`A launch reaches 600 contacts; reply rate 6 %, meeting rate 50 %, qualification rate 50 %, ACV EUR 80k. What qualified pipeline does it create? (EUR)`,
      answer: 720000,
      tolerance: { rel: 0.005 },
      unit: "EUR",
      explanation: md`$600 \times 0.06 = 36$ replies; 18 meetings; 9 qualified; $\Pi = 9 \times 80{,}000 = \text{EUR } 720{,}000$.`,
      concepts: ["fc03.launch-metrics"],
      difficulty: 1,
    },
    {
      id: "fc03-l05-q4",
      type: "numeric",
      prompt: md`The launch above has a 25 % win rate. What are the expected bookings? (EUR)`,
      answer: 180000,
      tolerance: { rel: 0.005 },
      unit: "EUR",
      explanation: md`$B = 720{,}000 \times 0.25 = \text{EUR } 180{,}000$, arriving roughly one sales cycle after launch.`,
      concepts: ["fc03.launch-metrics"],
      difficulty: 1,
    },
    {
      id: "fc03-l05-q5",
      type: "decision",
      prompt: md`T-1 week before Ripple's launch. The demo works on synthetic data but failed twice last week on a design partner's real files. The press briefing is booked. What do you do?`,
      options: [
        { text: "Launch anyway with the synthetic demo; fix it after.", score: 0.1, feedback: "The first prospects will connect real files. A failed first impression in a small market travels fast." },
        { text: "Move the date by 2 to 3 weeks, tell the journalist and design partners honestly, fix the real-data path, keep all other assets ready.", score: 1, feedback: "Right: the go/no-go criterion exists for this. A short delay costs little; a broken launch costs the audience." },
        { text: "Cancel the launch entirely and go back to stealth.", score: 0.2, feedback: "Overreaction: the problem is specific and fixable." },
      ],
      explanation: md`Move the date, not the bar. Readiness on real customer data is the one go/no-go criterion that cannot be waived in deep-tech.`,
      concepts: ["fc03.launch-sequencing"],
      difficulty: 2,
    },
    {
      id: "fc03-l05-q6",
      type: "multi",
      prompt: "Which are leading (early) launch metrics? (Select all that apply.)",
      options: ["Reply rate from ICP contacts", "Meetings booked", "Bookings after 9 months", "Qualified opportunities created", "Annual churn"],
      answer: [0, 1, 3],
      explanation: md`Leading metrics move within days or weeks of launch; bookings and churn are lagging.`,
      concepts: ["fc03.launch-metrics"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc03-l05-f1", front: "Three jobs of a B2B launch", back: "Create pipeline, create reusable credibility, force internal alignment.", concepts: ["fc03.launch-tiers"] },
    { id: "fc03-l05-f2", front: "Tier 1 vs tier 2 vs tier 3", back: "Tier 1 changes what you sell or to whom; tier 2 is a major capability for existing buyers; tier 3 is incremental.", concepts: ["fc03.launch-tiers"] },
    { id: "fc03-l05-f3", front: "Launch pipeline formula", back: md`$\Pi = N\,r_e\,r_m\,r_q\,ACV$`, concepts: ["fc03.launch-metrics"] },
    { id: "fc03-l05-f4", front: "Expected bookings", back: md`$B = \Pi\,w$, arriving one sales cycle after launch.`, concepts: ["fc03.launch-metrics"] },
    { id: "fc03-l05-f5", front: "Security pack as a launch asset", back: "Architecture, data flows, deployment and update model, questionnaire answers: it shortens every cycle the launch starts.", concepts: ["fc03.launch-assets"] },
    { id: "fc03-l05-f6", front: "Where launch value is created", back: "In the 30 days after launch day: block founder calendars for follow-up in advance.", concepts: ["fc03.launch-sequencing"] },
  ],
};

export default lesson;
