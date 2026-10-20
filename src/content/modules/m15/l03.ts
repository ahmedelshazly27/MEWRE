import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m15-l03",
  title: "Debrief & readiness review",
  summary:
    "What experienced PMs would have done at each stage of NAJM-1000, how to write lessons learned that change the next project, a personal 30-60-90-day plan for your first months at MEWRE, and how to keep learning.",
  minutes: 60,
  objectives: [
    "You can explain, stage by stage, what an experienced offtaker PM would have done on NAJM-1000 and why.",
    "You can write a lessons-learned entry in a format that leads to a specific change in procedures, templates or contracts.",
    "You can manage taking-over and COD with a categorised punch list and a complete handover package.",
    "You can keep a project file audit-ready and brief ministry leadership on one page.",
    "You can draft your own 30-60-90-day plan for joining MEWRE's renewables team and a learning plan for the year after.",
  ],
  concepts: [
    {
      id: "m15.taking-over",
      name: "COD and taking-over discipline",
      description:
        "Certifying COD only when safety- and performance-critical (Category A) items are closed and verified, with remaining items dated and financially secured, and the handover package (as-builts, O&M manuals, spares, training) complete.",
      competency: "delivery",
      related: ["m07.taking-over", "m07.handover-package", "m09.taking-over-defects"],
    },
    {
      id: "m15.audit-readiness",
      name: "Audit-ready project file",
      description:
        "A project record — decisions, reasons, approvals, correspondence, calculations and data — maintained from day one so that any State Audit Bureau or internal query can be answered completely and on time.",
      competency: "procurement",
      related: ["m08.document-control", "m11.audit-prior-review"],
    },
    {
      id: "m15.leadership-briefing",
      name: "One-page leadership briefing",
      description:
        "Bottom line first, accurate numbers, options and a recommendation, risks with dates — so leaders can make and defend decisions and public statements.",
      competency: "leadership",
      related: ["m13.bluf", "m13.bad-news", "m13.leader-numbers"],
    },
    {
      id: "m15.lessons-learned",
      name: "Actionable lessons learned",
      description:
        "A structured after-action process that records what happened, why, the impact and a specific change (owner, date) to a procedure, template or contract — and verifies the change was made.",
      competency: "delivery",
      related: ["m07.final-acceptance"],
    },
    {
      id: "m15.first-90-days",
      name: "30-60-90-day entry plan",
      description:
        "A staged plan for a new PM: learn the system and people (30), take ownership of the interfaces and the file (60), deliver visible improvements and decisions (90).",
      competency: "leadership",
      related: ["m13.relationship-capital"],
    },
    {
      id: "m15.continuous-learning",
      name: "Continuous professional learning",
      description:
        "A deliberate routine for keeping technical, contractual and Kuwait-sector knowledge current: spaced review, primary sources, peers, post-project reviews and responsible use of AI tools.",
      competency: "ai",
      related: ["m14.verification-habits"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "What the expert path teaches",
      blocks: [
        {
          kind: "md",
          md: md`### Why debriefs matter more than the run

You will forget most individual decisions within a month. What lasts is the **pattern** behind your choices. The debrief turns 27 decisions into a handful of rules you can apply on the first real file that lands on your desk.

### The expert path, stage by stage

| Stage | What an experienced PM did | The principle behind it |
|---|---|---|
| **1 Pre-tender & RFQ** | Put ground-validated resource data and a common P50/P90 method in the data room; set measurable local content (civil works, fabrication, services, Kuwaitisation ramp); split the grid at the plant 400 kV substation with a committed MEWRE date and a bounded remedy — and started procuring MEWRE's line immediately | Fix ambiguity while it is cheap; make bids comparable; only promise what MEWRE can deliver, then deliver it |
| **2 RFP & evaluation** | Tested the abnormally low bid through formal, written clarifications and an OE yield re-run; refused a price change disguised as a clarification; normalised the BESS to usable MWh at the POI over the term | A fair, documented process is the only defence against challenges and audit findings |
| **3 Award & close** | Sent a complete Audit Bureau pack and answered questions within days; accepted deemed energy only for MEWRE-caused events beyond an allowance; defined COD tests precisely (IEC 61724-based PR and capacity, BESS at POI, grid compliance) | Accelerate approvals by quality, never by bypassing them; the contract must make performance enforceable |
| **4 Design & grid** | Escalated MEWRE's own line delay early with a recovery plan and quantified exposure; returned the tracker design "approved with comments" targeting sabkha, stow and heat; required grid studies with validated models before energisation | Own MEWRE's risks; target design comments at site-specific failure modes; grid compliance is on the critical path |
| **5 Procurement** | Required traceability and audit with rejection rights; held lots whose BOM differed from the certified one; ordered transformers on frozen parameters; demanded a data-driven recovery schedule at SPI 0.82 | Verify, do not trust; protect the critical path with early decisions |
| **6 Construction** | Enforced heat-stress controls and supported night shifts; separated weather from design weakness in the force-majeure claim; stood down lifting after the near miss; determined the sabkha claim on facts; ran the variation through change control | Safety is not tradable; claims are determined, not accepted or dismissed; change has a price before it has an instruction |
| **7 Commissioning** | Verified PR test inputs before judging; allowed partial BESS COD with reduced capacity payments; permitted limited export pending controller retest | Verify, then enforce proportionately; keep energy flowing where it is safe |
| **8 COD & handover** | Made Category A items a condition of COD with Category B secured; answered the Audit Bureau with the full trail; gave the minister an accurate one-page brief | Keep leverage until it matters; the file is your defence; help leaders say true, strong things |

### Five rules to take away

1. **Spend a little early.** The cost of fixing a problem grows by roughly an order of magnitude at each stage — RFP clause, signed contract, construction, operation.
2. **Act through the contract.** Your power is the PPA and the processes around it. Use them precisely; never improvise outside them.
3. **Verify data before judging.** Test results, progress claims, certificates and bids all rest on inputs. Check the inputs first.
4. **Be proportionate.** The best answer is rarely the most extreme — not the cheapest, not the strictest.
5. **No surprises upward.** Early, quantified, honest escalation builds the trust that later gets your recommendations approved.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why decisions are judged separately from outcomes",
          md: md`Good decisions sometimes have bad outcomes (a well-managed project still hits a once-in-50-years storm) and bad decisions sometimes get lucky. Organisations that only reward outcomes teach their people to gamble and to hide. The State Audit Bureau, lenders and experienced leaders review the **reasoning and evidence at the time of the decision**. Write every important decision so that a reader in three years can see what you knew, what options you considered and why you chose.`,
        },
        {
          kind: "md",
          md: md`### Lessons learned that actually change something

Most lessons-learned registers are graveyards: "communication should be improved". A useful entry has six fields:

| Field | Bad | Good |
|---|---|---|
| **Event** | "Grid was late" | "MEWRE's 400 kV line was 5 months late against the plant's ready-for-connection date" |
| **Root cause** | "Contractor problems" | "Line tender was launched after PPA signing; right-of-way and crossing permits were not started until line award" |
| **Impact** | "Delay" | "≈ KWD 6 m of deemed energy; 1 GW unavailable for part of the summer peak" |
| **Lesson** | "Start earlier" | "MEWRE-side grid works must reach award before IPP financial close" |
| **Action** | "Improve planning" | "Add a gate in the IPP process: no PPA signing until MEWRE line contract is awarded and crossings are permitted" |
| **Owner / date / verified** | — | "Renewables sector director; next RFP; verified in the Zone X gate checklist" |

The test: **would the next project's documents look different because of this entry?** If not, it is not a lesson learned — it is a lesson observed.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Turning the debrief into practice",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Diagnosing your own simulation pattern",
          given: md`A learner's run: KPI mean 0.86, decision mean 6.2/10. Low-scored decisions: d04 (recommended the low bid, 2), d11 (approved the design, 2), d17 (stopped all summer work, 3), d19 (shut the site for 4 weeks, 5), d23 (rejected the BESS, 3).`,
          steps: [
            { md: md`Total score: $0.5 \times 0.86 + 0.5 \times 0.62 = 0.74$ → 74 %.` },
            { md: md`Group the low choices by trap: d04 and d11 are **shortcut bias** (accepting to save time or money); d17, d19 and d23 are **over-correction** (maximal responses).` },
            { md: md`Pattern: the learner swings between accepting and over-reacting, missing the **proportionate, documented** middle option — verify, then apply targeted conditions.` },
            { md: md`Personal rule for the next run: "Before choosing, name the specific risk; choose the option that addresses that risk and nothing more, through the contract."` },
          ],
          result: md`A precise diagnosis ("I swing between shortcut and over-correction") is more useful than "I need to be better at construction". Replay the simulation and check whether the rule moves the decision mean above 8.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Scoring a punch list for COD",
          given: md`Punch list of 340 items: 12 Category A (safety- or performance-critical), 328 Category B. The 328 Category B items are estimated at USD 4.5 m to complete. The PPA allows MEWRE to require a completion security of 150 % of the estimate for items outstanding at COD.`,
          steps: [
            { md: md`COD condition: all 12 Category A items closed **and verified** by the OE.` },
            {
              md: md`Security for Category B: it must cover the cost of having someone else complete the items if the contractor does not, so it is a multiple of the estimate: $1.5 \times 4.5 = 6.75$ USD m.`,
              hidden: true,
              check: { prompt: "Security at 150 % of the Category B estimate", answer: 6.75, unit: "USD m", tolerance: { rel: 0.01 } },
            },
            { md: md`Each Category B item gets a completion date; the security is released in tranches as items are verified closed.` },
          ],
          result: md`The point: a token security gives no leverage once COD is certified. Size it to the cost of having someone else finish the work — 125–150 % of the estimate is common practice — and tie releases to verified closure.`,
        },
        {
          kind: "question",
          question: {
            id: "m15-l03-p1",
            type: "short",
            prompt: md`Write one complete lessons-learned entry (event, root cause, impact, lesson, action, owner/date) for the failed PR test on NAJM-1000, where the root cause turned out to be two reference irradiance sensors whose calibration had expired and which over-read irradiance by about 2 % (inflating the expected energy and so depressing PR). (Note: a merely dirty sensor under-reads, which would make PR look *higher*, not lower.)`,
            rubric: [
              "Event stated factually with numbers (79.5 % vs 81 %)",
              "Root cause specific (pre-test sensor calibration check and cross-comparison not required by the procedure, or not enforced)",
              "Impact quantified (days of delay, dispute effort)",
              "Action changes a document (test procedure, O&M contract, checklist) with an owner and date",
            ],
            modelAnswer: md`**Event:** First PR test measured 79.5 % vs 81 % guarantee; retest after sensor recalibration passed at 81.3 %. **Root cause:** The test procedure did not require a pre-test check of calibration certificates or a cross-comparison between reference sensors; two sensors with expired calibrations over-read irradiance by ~2 %, inflating the expected energy. **Impact:** 18 days of COD delay and a week of dispute effort. **Lesson:** Test results are only as good as their inputs; sensor maintenance must be part of the procedure. **Action:** Add a pre-test calibration-certificate check, a sensor cross-comparison tolerance (e.g. ±1 %) and daily cleaning logs to MEWRE's standard PR test procedure annex. **Owner/date:** Renewables technical lead, before the next RFP issue; verified in the RFP technical schedules.`,
            explanation: md`A good entry is specific enough that someone who was not there can act on it, and it ends in a changed document. Note that the real root cause was a test-procedure gap, not "the contractor" — root causes usually sit in systems, not people.`,
            concepts: ["m15.lessons-learned", "m15.commissioning-tests"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Your first months at MEWRE",
      blocks: [
        {
          kind: "md",
          md: md`### A 30-60-90-day plan

You are joining a ministry, not a contractor. Authority flows through hierarchy and relationships; credibility comes from being reliable, discreet and accurate. The plan below is a template — adapt it to your actual role and line manager's priorities.

**Days 1–30: learn the system and the people**

- Read, in this order: the PPA(s) of the projects you are assigned to (COD conditions, tests, LDs, deemed energy, notices), the interface schedules, the latest monthly reports, the risk register, and the correspondence of the last six months.
- Map the people: your director and undersecretary's priorities; the transmission and system-control counterparts; KAPP's project team; the OE's lead; the project company's PM. Meet each one-to-one; listen more than you speak.
- Learn the approval routes for your files: who signs what, in what order, with which templates; how letters are drafted and registered in Arabic and English.
- Deliverable: a one-page "project on a page" for each project you own, with your honest RAG status — share with your line manager only.

**Days 31–60: take ownership of interfaces and the file**

- Build a single MEWRE-side interface schedule (land, line, bay, protection, metering, permits, payments) and a weekly interface meeting.
- Set up or tidy the decision log and correspondence register so that any audit question can be answered in a day.
- Quantify MEWRE's exposures: deemed energy per month of grid delay, payment timing, outstanding approvals.
- Deliverable: your first risk-based status brief to your director with two or three recommended decisions.

**Days 61–90: deliver visible value**

- Close one or two long-standing issues (an overdue approval, a stuck interface, an unresolved claim determination) through the proper channel.
- Introduce one improvement that outlasts you: a test-procedure annex, a review checklist, a lessons-learned entry that changes the next RFP.
- Deliverable: a 90-day review with your line manager — what you found, what you fixed, what you propose for the next six months.`,
        },
        {
          kind: "callout",
          tone: "kuwait",
          title: "Context to master early",
          md: md`The sector context you will be expected to know without looking it up: peak demand around 17.5–17.7 GW against roughly 17 GW reliably available; renewables targets of 15 % by 2030 (original) and an updated 30/40/50 % path stated by a MEWRE official; Shagaya Phase III Zones 1 and 2 procured by KAPP on 30-year PPAs; MEWRE's own 400 kV grid tenders; a planned 1–1.5 GW BESS programme; and the 2026 amendment to the Public Tenders Law. Re-verify each of these against primary sources (KAPP, MEWRE, Kuwait Al-Youm, KUNA) when you start — several were still moving in 2026.`,
        },
        { kind: "sources", refs: ["m15-kt-2026-peak", "m15-theenergyyear-2025", "m15-pvmag-2025-zone1", "m15-megaproject-400kv", "m15-agbi-2025-11-bess", "m15-tamimi-2026-tenders", "m15-meed-2026-zone1-selected"] },
        {
          kind: "bilingual",
          title: "One-page leadership brief — template",
          en: md`**Subject:** NAJM-1000 — status and decision required

**Bottom line:** 1,000 MW of solar is commissioned. Full battery capacity (1,000 MWh) is expected by [date] after a cooling fix and retest. Decision required: approve the wording below for the announcement.

**Status:** PV 1,000 MW commissioned; two blocks on limited export until controller retest on [date]. Battery at 940 MWh (94 %); capacity payments reduced until retest.

**Risks:** Controller retest (low); battery retest (medium) — mitigation in place.

**Recommended wording:** "1,000 MW of solar commissioned at [site]; full storage capacity due in [month]."`,
          ar: md`**الموضوع:** مشروع نجم-1000 — الوضع الراهن والقرار المطلوب

**الخلاصة:** تم تشغيل 1,000 ميجاواط من الطاقة الشمسية. ومن المتوقع الوصول إلى السعة الكاملة لنظام تخزين البطاريات (1,000 ميجاواط ساعة) بتاريخ [التاريخ] بعد معالجة نظام التبريد وإعادة الاختبار. القرار المطلوب: اعتماد الصياغة أدناه للإعلان.

**الوضع:** تم تشغيل 1,000 ميجاواط من الخلايا الكهروضوئية؛ ويعمل قطاعان بقدرة تصدير محدودة إلى حين إعادة اختبار وحدة التحكم بتاريخ [التاريخ]. سعة البطاريات الحالية 940 ميجاواط ساعة (94%)؛ وتُخفَّض مدفوعات السعة إلى حين إعادة الاختبار.

**المخاطر:** إعادة اختبار وحدة التحكم (منخفضة)؛ إعادة اختبار البطاريات (متوسطة) — وتدابير المعالجة قائمة.

**الصياغة المقترحة:** "تشغيل 1,000 ميجاواط من الطاقة الشمسية في [الموقع]؛ والسعة الكاملة للتخزين متوقعة في [الشهر]."`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong for new PMs from the private sector",
          md: md`- Moving too fast: proposing changes before understanding why things are done the way they are — and who decided.
- Writing like an engineer to leaders: three pages of analysis where one paragraph and a recommendation were needed.
- Informality: agreeing things in meetings or on messaging apps that never reach the official file.
- Treating control bodies (Audit Bureau, Fatwa) as obstacles rather than stakeholders with legitimate questions.
- Underestimating relationship time: in Kuwaiti institutions, a cup of tea with the right counterpart can unblock what ten letters cannot.`,
        },
        {
          kind: "checklist",
          title: "Readiness review: can you do these without notes?",
          items: [
            "Explain the IPP structure, KAPP's role and the approval chain to a new colleague in five minutes.",
            "Read a PPA and list COD conditions, tests, LDs, deemed energy and notice provisions.",
            "Estimate a plant's annual energy, capacity factor and MEWRE's payments from its size and tariff.",
            "Compute CPI, SPI, EAC and a COD forecast from a progress report.",
            "Compute a temperature-corrected PR and say what to verify after a failed test.",
            "Determine a force-majeure or ground-conditions claim against contract definitions and evidence.",
            "Write a one-page leadership brief, in English and Arabic, with a clear bottom line.",
            "Keep a decision log that would satisfy the State Audit Bureau.",
          ],
        },
        {
          kind: "md",
          md: md`### How to keep learning after this course

- **Spaced review:** keep doing the flashcard reviews on this platform for at least three months; they are designed to hold the facts that matter on the job.
- **Primary sources:** read the actual PPA, the IEC 61724 test procedures, the FIDIC clauses your contracts adapt, the PPP Law and its regulations — not summaries of them.
- **Peers:** find the people in MEWRE, KAPP and the OE who have taken a plant through COD. Ask them for one story each about what went wrong.
- **Post-project reviews:** attend every lessons-learned session you can, including on projects that are not yours.
- **Sector tracking:** a weekly 30-minute scan of MEED, KUNA, KAPP and MEWRE announcements; note changes to targets, laws and projects.
- **AI tools, responsibly:** use AI to summarise long documents, draft first versions of letters and challenge your reasoning — but never paste confidential tender or contract material into public tools, and always check claims against the source.
- **Replay the capstone** in three months. If your decision mean has not improved, revisit the lessons behind your lowest-scoring stage.`,
        },
        { kind: "scenario", scenario: "m15-s4" },
        {
          kind: "feynman",
          prompt: "Describe, as if to your new director at MEWRE, your 30-60-90-day plan and the one improvement you aim to leave behind.",
          keyPoints: [
            "First 30 days: read the PPA and file, map people, learn approval routes, honest project-on-a-page",
            "Days 31–60: own MEWRE-side interfaces and the audit-ready file, quantify exposures",
            "Days 61–90: close stuck issues through proper channels, deliver one lasting improvement",
            "Respect hierarchy and relationships; no surprises upward",
            "A specific, document-changing improvement (e.g. test procedure annex or RFP gate)",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m15-l03-q1",
      type: "mcq",
      prompt: md`Which lessons-learned entry is most likely to change the next project?`,
      options: [
        "\"Communication between MEWRE departments should be improved.\"",
        "\"The grid was late because of the contractor.\"",
        "\"Add a gate: no PPA signing until MEWRE's 400 kV line contract is awarded and crossings permitted. Owner: renewables director; applies to the next RFP.\"",
        "\"Start everything earlier next time.\"",
      ],
      answer: 2,
      explanation: md`Only the third names a specific change to a process, an owner and when it applies. The others are lessons observed, not learned.`,
      concepts: ["m15.lessons-learned"],
      difficulty: 1,
    },
    {
      id: "m15-l03-q2",
      type: "decision",
      prompt: md`The project company asks for COD with 12 Category A and 328 Category B punch items open. What do you do?`,
      options: [
        { text: "Certify COD; all items can be finished in the defects period", score: 0.2, feedback: "Category A items are safety- or performance-critical; leverage drops sharply after COD." },
        { text: "Refuse COD until all 340 items are closed", score: 0.4, feedback: "Disproportionate: minor items should not hold up 1 GW of energy." },
        { text: "Make closure and OE verification of the 12 Category A items a condition of COD; accept Category B with dates and a security sized to the cost of completion; require the full handover package", score: 1, feedback: "Standard practice: protect safety and performance, keep leverage on the rest, and do not hold energy hostage to trivial items." },
      ],
      explanation: md`Categorisation is the tool that makes COD proportionate. Size the security to what it would cost someone else to finish.`,
      concepts: ["m15.taking-over"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "m15-l03-q3",
      type: "multi",
      prompt: md`Which belong in an audit-ready file for the deemed-energy payments made during the grid delay? Select all that apply.`,
      options: [
        "The PPA clauses defining deemed energy and the allowance",
        "The calculation with metered output and measured irradiance",
        "The OE's validation of the model",
        "Approval memos and correspondence notifying the delay",
        "Informal messaging-app chats agreeing the amount",
      ],
      answer: [0, 1, 2, 3],
      explanation: md`Auditors need the basis (clauses), the numbers (calculation and data), independent validation and the formal record. Informal chats are not a record and should never be the place where amounts are agreed.`,
      concepts: ["m15.audit-readiness"],
      difficulty: 1,
    },
    {
      id: "m15-l03-q4",
      type: "order",
      prompt: md`Order the elements of a one-page leadership brief.`,
      items: [
        "Bottom line and decision required",
        "Current status with key numbers",
        "Risks with likelihood and mitigation",
        "Recommendation or proposed wording",
      ],
      explanation: md`Bottom line first (BLUF): leaders may read only the first two lines. Status supports the bottom line, risks show you have thought ahead, and the recommendation makes the decision easy to take.`,
      concepts: ["m15.leadership-briefing"],
      difficulty: 1,
    },
    {
      id: "m15-l03-q5",
      type: "mcq",
      prompt: md`In your first 30 days at MEWRE, which activity should come first?`,
      options: [
        "Proposing a new project-controls system to your director",
        "Reading the PPA, interface schedules, recent reports and correspondence, and meeting key counterparts one-to-one",
        "Writing to the project company to set out your expectations",
        "Re-negotiating the O&M scope",
      ],
      answer: 1,
      explanation: md`Credibility in a ministry starts with understanding the system and the people. Proposals and letters made before that risk being wrong — and being remembered.`,
      concepts: ["m15.first-90-days"],
      difficulty: 1,
    },
    {
      id: "m15-l03-q6",
      type: "short",
      prompt: md`The minister wants to announce "1 GW of solar online" tomorrow, but the BESS is at 94 % and two PV blocks are on limited export. Draft your two-sentence bottom line to him.`,
      rubric: [
        "States what is true and impressive (1,000 MW commissioned)",
        "Flags what remains, with dates",
        "Offers accurate alternative wording",
        "Short and respectful; no technical overload",
      ],
      modelAnswer: md`"Minister, 1,000 MW of solar is commissioned and two blocks will reach full export after a controller retest on [date]; the battery is at 94 % and reaches full capacity by [date]. I recommend announcing '1,000 MW of solar commissioned at Shagaya; full storage capacity due in [month]' — strong, accurate and safe from later correction."`,
      explanation: md`Lead with what is true and impressive, state what remains with dates, and hand the minister wording he can use. Never contradict a leader in public; give him a better option in private, before the statement goes out.`,
      concepts: ["m15.leadership-briefing"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m15-l03-f1", front: "Six fields of a useful lessons-learned entry", back: md`- Event
- Root cause
- Impact
- Lesson
- Action (document change)
- Owner/date/verified`, concepts: ["m15.lessons-learned"] },
    { id: "m15-l03-f2", front: "Lesson learned vs lesson observed", back: "Learned = the next project's documents or process actually change. Observed = written down, nothing changes.", concepts: ["m15.lessons-learned"] },
    { id: "m15-l03-f3", front: "COD condition for punch-list items", back: "All Category A (safety/performance-critical) closed and verified; Category B dated and secured (≈ 125–150 % of completion cost); handover package complete.", concepts: ["m15.taking-over"] },
    { id: "m15-l03-f4", front: "30-60-90 in one line each", back: "30: learn the system and people. 60: own the interfaces and the file. 90: close stuck issues and leave one lasting improvement.", concepts: ["m15.first-90-days"] },
    { id: "m15-l03-f5", front: "The five take-away rules from the capstone", back: md`- Spend a little early
- Act through the contract
- Verify data before judging
- Be proportionate
- No surprises upward`, concepts: ["m15.lessons-learned"] },
    { id: "m15-l03-f6", front: "Why decisions are judged separately from outcomes", back: "Good decisions can have bad luck and vice versa; auditors and leaders review reasoning and evidence at the time — so record what you knew, the options, and why.", concepts: ["m15.audit-readiness"] },
    { id: "m15-l03-f7", front: "Rule for using AI tools on MEWRE work", back: "Use for summaries, drafts and challenge — never paste confidential tender or contract material into public tools; verify every claim against the source.", concepts: ["m15.continuous-learning"] },
  ],
  scenarios: [
    {
      id: "m15-s4",
      title: "Week three: the inherited file",
      dayInLife: true,
      context: md`You inherit a project from a colleague who moved to another sector. The file is thin: decisions were taken in meetings, many approvals are "agreed verbally", and the Audit Bureau has just sent a query about a variation approved last year.`,
      start: "a",
      concepts: ["m15.audit-readiness", "m15.first-90-days"],
      nodes: {
        a: {
          md: md`The Audit Bureau's deadline is in ten working days. Where do you start?`,
          choices: [
            { text: "Reconstruct the record: collect minutes, letters, emails and the variation calculation; ask your predecessor for a written note of what was agreed and why; draft a factual response for your director's review", next: "b", score: 10, feedback: "Factual reconstruction from contemporaneous records is the only credible basis. Your predecessor's written note helps, clearly labelled as a later recollection." },
            { text: "Reply that you are new and the decision pre-dates you", score: 2, feedback: "The query is to the ministry, not to you personally. Continuity of the file is your job now." },
            { text: "Write new memos dated last year to fill the gaps", next: "c", score: 0, feedback: "Backdating documents is falsification. It turns an administrative weakness into a serious integrity matter." },
          ],
        },
        b: {
          md: md`The response goes in on time. What do you do so this never happens again on your projects?`,
          choices: [
            { text: "Set up a decision log and correspondence register, require minutes for every decision meeting within 48 hours, and confirm verbal agreements in writing", score: 10, feedback: "Simple habits, kept consistently, make every future query a one-day exercise." },
            { text: "Avoid making decisions in meetings", score: 3, feedback: "Meetings are where decisions get made; the fix is recording them, not avoiding them." },
          ],
        },
        c: {
          md: md`Your director notices the dates do not match the document register. What now?`,
          choices: [
            { text: "Withdraw the documents immediately, explain, and replace them with an honest reconstruction clearly dated today", score: 5, feedback: "The only recovery path — but the damage to trust is done. Never create records after the fact as if they were contemporaneous." },
          ],
        },
      },
    },
  ],
};

export default lesson;
