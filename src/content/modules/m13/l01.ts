import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m13-l01",
  title: "How a Ministry Actually Works",
  summary:
    "The formal hierarchy of a Kuwaiti ministry, how authority really flows through memos, signatures and committees, how to use relationships ethically, protocol that matters, and where consultants fit.",
  minutes: 55,
  objectives: [
    "You can map the formal chain from Minister to section head and explain which level can sign what",
    "You can trace how a decision actually moves (memo, annotation, committee, prior review) and estimate the approval duration",
    "You can distinguish legitimate relationship capital from wasta that breaches integrity rules, and respond to a wasta request professionally",
    "You can apply the core protocol rules for titles, meetings and correspondence without embarrassing your superiors",
    "You can position consultants correctly: they advise and prepare, officials decide and sign",
  ],
  concepts: [
    {
      id: "m13.ministry-hierarchy",
      name: "Ministry hierarchy",
      description:
        "Minister → Undersecretary → Assistant Undersecretaries (sectors) → departments (directors) → controllers → sections; each level has defined signing and approval authority.",
      competency: "leadership",
      related: ["m13.authority-flow"],
    },
    {
      id: "m13.authority-flow",
      name: "How authority flows",
      description:
        "Formal authority sits in signatures and delegations; practical authority moves through memos, annotations, committee minutes and the people who prepare them.",
      competency: "leadership",
      related: ["m13.decision-culture", "m13.consultant-role"],
    },
    {
      id: "m13.decision-culture",
      name: "Ministry decision culture",
      description:
        "Consensus-seeking, audit-conscious and committee-based decision making, where documented justification and precedent matter more than speed.",
      competency: "leadership",
    },
    {
      id: "m13.relationship-capital",
      name: "Relationship capital and ethical wasta",
      description:
        "Using networks to obtain access, information and timely attention is legitimate; using them to change outcomes that rules govern (awards, evaluations, approvals, hiring) is not.",
      competency: "leadership",
    },
    {
      id: "m13.protocol",
      name: "Official protocol",
      description:
        "Rules for titles, precedence, seating, greetings, correspondence routing and who speaks for whom in a government setting.",
      competency: "leadership",
    },
    {
      id: "m13.consultant-role",
      name: "Role of consultants in a ministry",
      description:
        "Owner's Engineers, transaction and legal advisers prepare, review and recommend; they do not carry the ministry's authority and must not speak for it unless expressly delegated.",
      competency: "leadership",
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "The formal structure and why it is built that way",
      blocks: [
        {
          kind: "md",
          md: md`A ministry is not a company with a slower HR department. It is a **legal person exercising public authority**, and almost every feature that frustrates engineers from the private sector — the layers, the memos, the signatures, the committees — exists to make that authority **traceable and defensible**. Public money is spent, public assets are committed for 25–30 years, and every decision can later be examined by the State Audit Bureau, the National Assembly, the courts or the anti-corruption authority. The structure is optimised for **accountability**, not throughput. Once you see it that way, you stop fighting it and start designing your work to move through it quickly.

### The typical Kuwaiti ministry chain

| Level | Arabic | What the level does | What a PM needs from it |
|---|---|---|---|
| Minister | الوزير | Political head; member of the Council of Ministers; answers to the National Assembly; signs ministerial decisions (قرار وزاري) | Rarely direct contact; decisions reach the Minister through the Undersecretary |
| Undersecretary | وكيل الوزارة | Senior civil servant; runs the ministry day to day; signs most significant external correspondence and contracts within delegation | Approval of decision memos, external letters to KAPP, other ministries, contractors at senior level |
| Assistant Undersecretaries | الوكلاء المساعدون | Each heads a **sector** (قطاع) — e.g. generation, transmission, distribution, planning, renewables, administrative/financial affairs | Your real "client" inside the ministry; owns budget lines and technical positions |
| Department directors | مدير إدارة | Head a department inside a sector | Technical review, recommendation, first signature on memos going up |
| Controllers | مراقب | Head a controllership within a department (common Kuwaiti civil-service level) | Day-to-day technical and administrative supervision |
| Section heads | رئيس قسم | Run a section | Execution, data, drafting |

Your project sits somewhere in this tree, usually inside a sector led by an Assistant Undersecretary. But a renewable IPP touches **several** sectors at once: planning (capacity and dispatch), transmission (400 kV connection, protection, SCADA), the renewables or projects unit (technical requirements, PPA management), financial affairs (budget for MEWRE-side works, payments under the PPA) and legal affairs. Each has its own Assistant Undersecretary and its own priorities. The PM's job is to make one coherent decision out of many partial authorities.`,
        },
        {
          kind: "callout",
          tone: "kuwait",
          title: "What is verified about MEWRE's structure",
          md: md`MEWRE was established on 17 January 1962 as the Ministry of Electricity and Water; "Renewable Energy" was added later. One source describes about **11 subdivisions** covering transmission, power stations, project tendering, water and electrical distribution; the official organisation chart is published on the ministry website. **Adel Al-Zamel** signed the March 2025 framework agreement with China's National Energy Administration as Undersecretary. **Dr. Sabeeh Al-Mukhaizeem** was appointed Minister by Amiri decree on 24 March 2025 (still cited in office in May 2026).`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Check before you rely on these",
          md: md`(1) The exact names and number of MEWRE's sectors, and which Assistant Undersecretary owns renewable energy, were **not confirmed** — read the current organisation chart on mew.gov.kw and, better, the internal delegation-of-authority decision. (2) Whether Dr. Al-Mukhaizeem is still Minister in October 2026 is unconfirmed. (3) The Director → Controller → Section-head pattern is the common Kuwaiti civil-service structure; confirm it for your sector. (4) The 2023 plan to convert MEWRE into a corporation has no evidence of implementation — if it happens, signing authorities will change.`,
        },
        { kind: "sources", refs: ["m13-mew-org", "m13-wiki-mewre", "m13-mees-zamel", "m13-diwan-minister"] },
        {
          kind: "md",
          md: md`### Formal authority vs practical authority

**Formal authority** is written: laws, decrees, ministerial decisions, the **delegation of authority** (تفويض الصلاحيات) that says, for example, a director may approve purchases up to a threshold and an Assistant Undersecretary above it. It is exercised by a **signature** on a document with a reference number and date.

**Practical authority** is who shapes what gets signed. Three groups hold it:

1. **The drafters.** Whoever writes the memo frames the options. Most memos are signed with minor edits. If you write well, you set the agenda.
2. **The gatekeepers.** Office managers (مدير المكتب), secretaries of committees, and the legal and financial reviewers control *when* and *in what form* something reaches the signatory.
3. **The trusted advisers.** Long-serving staff and, sometimes, consultants whose opinion the senior official asks for before deciding.

The memo trail is the nervous system. A memo goes up with a recommendation; each level writes an **annotation** (تأشيرة) on it — "موافق" (approved), "للعرض" (for presentation upward), "للدراسة وإبداء الرأي" (for study and opinion), "لاتخاذ اللازم" (take the necessary action). The annotated memo, filed under its outgoing/incoming number (الصادر / الوارد), *is* the decision. Nothing that happens in a corridor counts until it is on paper.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why the paper trail beats the conversation",
          md: md`Senior officials carry personal accountability for what they sign; the Audit Bureau reviews contracts above its prior-review threshold and can flag contracting without approval as a violation. An official who agrees verbally but has no file to defend the decision is exposed. So the rational behaviour is: **agree in principle in the meeting, decide on paper later, after legal and financial have commented**. Your job is to make the paper so complete that "later" is short.`,
        },
        {
          kind: "md",
          md: md`### Decision culture: four forces

1. **Consensus over speed.** Decisions affecting several sectors are taken when every relevant sector has signed off, often via a committee. A single dissenting Assistant Undersecretary can stall a file without ever saying no — the file simply does not move.
2. **Precedent.** "What did we do last time?" is the first question. A proposal that matches a precedent moves fast; a novel one (first BESS, first G2G deal, first grid-forming requirement) needs extra justification and often external legitimacy — an international standard, a consultant's report, a precedent from Saudi Arabia, the UAE or Oman.
3. **Audit consciousness.** Every decision is made with an eye on later scrutiny by the State Audit Bureau and, for PPPs, the Higher Committee and KAPP. This drives conservative choices, a preference for documented competition, and reluctance to agree to contractor claims without a robust determination.
4. **Relationships and trust.** Who brings a proposal matters. A memo from a PM the Undersecretary trusts gets read first. Trust is built by being right, being brief, never surprising your superior, and protecting them from embarrassment.

### Committees

Committees (لجان) are how the ministry spreads accountability across sectors: tender and evaluation committees, technical committees, steering committees for major projects, and inter-agency committees with KAPP or other ministries. A committee is formed by a **decision** naming its chair, members, rapporteur (مقرر) and mandate, often with a time limit. Its output is **signed minutes** (محضر) with recommendations; the recommendation then goes to the authority that formed it.

Practical rules: (1) get the **mandate** right in the formation decision — a committee cannot decide outside it; (2) the **rapporteur** writes the minutes and therefore has enormous practical influence — volunteer your team to support the rapporteur with draft minutes; (3) circulate a **pre-read** with a recommended position; (4) quorum and signatures matter: unsigned minutes are a draft, not a decision.`,
        },
        {
          kind: "widget",
          widget: "institution-map",
          caption: "Click each institution to see its role in the decision chain around a MEWRE project.",
        },
        {
          kind: "md",
          md: md`### The external chain around a renewable project

For an IPP, MEWRE is the **offtaker**, not the procurer. KAPP (established by PPP Law No. 116 of 2014, attached to the Minister of Finance) runs the RFQ/RFP; the **Higher Committee for PPP** approves the project and the preferred investor; the **State Audit Bureau** gives prior approval before signing; the Fatwa and Legislation Department reviews legal terms. For MEWRE's own works (for example the Shagaya–Wafra 400 kV line) the ministry tenders directly under the Public Tenders Law with CAPT oversight. The new **Law No. 94 of 2026** (gazetted 27 September 2026, effective about three months later) raises the direct-contracting threshold without CAPT approval to KD 1,000,000 per financial year and bans local and commission agents in public contracting.

The PM must know which chain a decision travels and budget time for it: the approval chain is usually the critical path, not the engineering.`,
        },
        { kind: "sources", refs: ["m13-kapp-law", "m13-audit-law", "m13-tamimi-tenders-2026"] },
        {
          kind: "md",
          md: md`### Relationship capital and wasta — handled ethically

**Wasta** (واسطة) — intercession through a well-placed person — is a social reality in Kuwait and across the Gulf. Pretending it does not exist makes you naive; using it to bend rules makes you a liability. The useful distinction is **access versus outcome**:

| Legitimate (relationship capital) | Illegitimate (integrity breach) |
|---|---|
| Asking a colleague to introduce you to the head of transmission planning | Asking anyone to influence a tender evaluation or award |
| Getting a meeting slot faster through someone who knows the office manager | Pressuring a committee member on a contractor's behalf |
| Understanding informally what a senior official is worried about before you brief | Sharing confidential bid information with a "friend" |
| Asking a respected senior to explain your proposal's context to a sceptical sector | Hiring or approving staff because of family or tribal ties rather than merit |
| Building trust over coffee so your calls get returned | Accepting gifts or hospitality from contractors beyond trivial courtesy |

**Rule of thumb:** if the rules decide the outcome (award, evaluation score, approval of a claim, recruitment), no relationship may touch it. If the rules leave discretion only over **attention and timing** — who gets heard first — relationships are legitimate, provided you would be comfortable seeing the request written in the file.

When someone asks you for wasta that crosses the line, decline **without humiliating them**: acknowledge the relationship, cite the rules as the constraint ("the evaluation is with the committee and I am bound by confidentiality"), offer what you legitimately can (the public schedule, the proper channel for a clarification), and record the approach where your integrity rules require it. In a culture where face matters, "the system does not allow me" protects both of you; "how dare you" makes an enemy.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Integrity framework — verify",
          md: md`Kuwait has an Anti-Corruption Authority (Nazaha, هيئة مكافحة الفساد) — the law number commonly cited (Law No. 2 of 2016), its conflict-of-interest and disclosure requirements, and any MEWRE-specific gifts or hospitality policy are **not in the verified research brief**. Read the authority's site and your ministry's code of conduct in your first week. Law No. 94 of 2026's ban on local and commission agents in public contracting *is* sourced (Al Tamimi, 2026-09-29).`,
        },
        {
          kind: "md",
          md: md`### Protocol that matters

Protocol is not decoration; it is how status and respect are signalled, and errors land on your superior, not on you.

- **Titles.** Ministers are usually addressed as **معالي الوزير** ("His Excellency the Minister"); in letters to senior officials use **السيد/ ... المحترم** with the full title. Copy the exact forms from recent outgoing letters in your sector's archive — house style varies.
- **Routing.** Write to the level that matches yours, through your chain. A section head does not write to another ministry's Undersecretary; the letter goes out under the signature of the appropriate level.
- **Who speaks.** In a meeting chaired by a senior official, the most senior ministry person speaks for the ministry. You present when invited; you do not contradict your superior in front of contractors — you pass a note or raise it afterwards.
- **Meetings.** Arrive early; stand when the senior official enters; greet the most senior first; accept coffee; begin with brief courtesies before business. Do not schedule critical meetings against prayer times; during Ramadan, working hours shorten and evening meetings become common.
- **Contractors and consultants.** Senior contractor executives expect to meet officials of comparable seniority. Use that: a letter or meeting at Undersecretary level is an escalation tool, so do not spend it on routine issues.
- **Language.** Official correspondence with government bodies is in Arabic; contracts with international EPCs and IPPs are often bilingual with a stated prevailing language. Know which version governs.

### The role of consultants

Ministries depend heavily on consultants: the **Owner's Engineer** (OE) for design review and site supervision, **transaction advisers** (often appointed via KAPP for PPPs: technical, legal, financial), and specialist studies (grid, environmental). Consultants bring capacity and international experience the ministry does not have in-house. They also create three risks:

1. **Authority creep.** A consultant starts issuing positions to the contractor "on behalf of the ministry" that no official approved. Under FIDIC, if the consultant is appointed as **the Engineer**, their powers are defined in the Contract; anything beyond requires Employer approval as stated in the Particular Conditions.
2. **Capture.** The ministry stops forming its own view and signs whatever the consultant drafts — and the consultant's incentives (scope extensions, risk avoidance, future work) are not identical to the ministry's.
3. **Knowledge leakage.** When the consultant leaves, the knowledge leaves. Insist on registers, models and reports being handed over in usable form.

The PM's stance: **consultants advise and prepare; officials decide and sign.** You own the recommendation that goes up under your name, so you must understand it well enough to defend it without the consultant in the room.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Mapping approval chains and estimating decision time",
      blocks: [
        {
          kind: "md",
          md: md`Treat an approval chain exactly as you would a schedule network: activities (review steps) with durations, some sequential, some parallel, and a critical path. Kuwait's working week is Sunday–Thursday, so 5 working days = 1 calendar week. Durations below are **illustrative planning assumptions** — calibrate them from your own sector's history (look at the incoming/outgoing dates on old files).`,
        },
        {
          kind: "worked",
          mode: "worked",
          title: "Extending the Owner's Engineer contract — will the approval arrive in time?",
          given: md`The OE services contract for a MEWRE grid-connection package expires in **8 weeks (40 working days)**. An extension worth about **KD 450,000** is needed. Assumed chain: PM drafts memo (3 wd) → Department Director review (2 wd) → Assistant Undersecretary (3 wd) → Financial Affairs budget certification (5 wd) **in parallel with** Legal Affairs review (7 wd) → Undersecretary signature (3 wd) → State Audit Bureau prior review (assume 20 wd) plus one round of queries and answers (8 wd). The Audit Bureau threshold reported by a minister is KD 100,000 and above (verify), so this extension needs prior review.`,
          steps: [
            {
              md: md`**Internal chain.** Sequential steps: $3 + 2 + 3 = 8$ wd. The parallel pair takes the longer branch: $\max(5, 7) = 7$ wd. Then the Undersecretary: 3 wd. Internal total $= 8 + 7 + 3 = 18$ wd.`,
            },
            {
              md: md`**External chain.** Audit Bureau review plus one query round: $20 + 8 = 28$ wd.`,
            },
            {
              md: md`**Total.** $18 + 28 = 46$ wd $\approx 9.2$ weeks. The contract expires in 40 wd, so there is a **gap of 6 working days** with no supervising consultant — during which site inspections, NCR follow-up and IPC certification would stop.`,
            },
            {
              md: md`**What the PM does.** (a) Start now, and next time start 12+ weeks out. (b) Shorten the critical path: send Legal the draft in parallel with the Director's review (removes 7 wd from the sequential path if Legal can comment on the draft), and pre-agree the query answers with the Audit Bureau liaison by submitting a complete file (the query round is the most compressible step). (c) Mitigate the residual gap: ask whether the contract allows a no-cost time extension within the existing ceiling, which may follow a lighter route.`,
            },
          ],
          result: md`Approval needs about **46 working days** against **40 available**; the critical path runs through Legal and the Audit Bureau. Starting earlier and submitting a complete file are worth more than any amount of chasing.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Grid interface decision memo — two sectors must agree",
          given: md`A decision memo on the interface responsibilities between an IPP and MEWRE transmission must reach the Minister. Chain: drafting (2 wd) → Director (1 wd) → **two** Assistant Undersecretaries in parallel: Transmission (4 wd) and Renewables/Projects (6 wd) → Legal Affairs (5 wd) → Undersecretary (2 wd) → Minister's office (3 wd).`,
          steps: [
            { md: md`Sequential start: drafting + Director $= 2 + 1 = 3$ wd.` },
            {
              md: md`Parallel sector review takes the longer branch: $\max(4, 6) = 6$ wd. Then Legal 5, Undersecretary 2, Minister 3. Total path length $= 3 + 6 + 5 + 2 + 3 = 19$ wd.`,
              hidden: true,
              check: { prompt: "Total approval path length (working days)", answer: 19, unit: "wd", tolerance: { abs: 0.1 } },
            },
            {
              md: md`You convene **one joint meeting** with both Assistant Undersecretaries and agree comments on the spot; the sector step drops to 2 wd. New total $= 3 + 2 + 5 + 2 + 3 = 15$ wd.`,
              hidden: true,
              check: { prompt: "New total after the joint meeting (working days)", answer: 15, unit: "wd", tolerance: { abs: 0.1 } },
            },
          ],
          result: md`The joint meeting removes 4 working days — and, more importantly, removes the risk that one sector quietly holds the file. Joint meetings convert sequential "for opinion" loops into a single consensus event.`,
        },
        {
          kind: "question",
          question: {
            id: "m13-l01-p1",
            type: "numeric",
            prompt: md`A ministerial approval must be in hand within **55 working days** from today. The internal chain is the 19-wd path above and the external prior review is assumed at **25 wd**. If you start today and nothing is compressed, how many working days of **float** do you have?`,
            answer: 11,
            unit: "wd",
            tolerance: { abs: 0.1 },
            explanation: md`Path length $= 19 + 25 = 44$ wd. Float $= 55 - 44 = 11$ wd. Eleven working days is barely two weeks — one lost file or one extra query round consumes it. Treat approval float like schedule float on a critical path: monitor it weekly and protect it by submitting complete files.`,
            concepts: ["m13.authority-flow", "m13.decision-culture"],
            difficulty: 1,
          },
        },
        {
          kind: "md",
          md: md`### Mapping influence, not just signatures

For any significant decision, draw a quick **stakeholder map** with two columns: *formal role* (signs, reviews, is informed) and *practical stance* (supporter, neutral, sceptic, blocker) plus *what they need to say yes*. A typical map for a decision to accept an IPP's request to change the grid connection point:

| Person / unit | Formal role | Likely concern | What they need |
|---|---|---|---|
| Asst. Undersecretary, Transmission | Must concur | Protection, 400 kV substation capacity, outage planning | Grid study results, confirmation that MEWRE scope and cost do not grow |
| Asst. Undersecretary, Renewables/Projects | Owner of the memo | Schedule, PPA consequences | Impact on COD and deemed-energy exposure |
| Legal Affairs | Reviews | Does the change alter PPA risk allocation? | Clause-by-clause note; whether a PPA amendment is needed |
| Financial Affairs | Reviews | Budget for MEWRE-side works | Cost estimate and budget line |
| KAPP | External; must be consulted for PPP changes | Bid-level parity, precedent for other zones | Formal letter with justification |
| Undersecretary | Signs | Risk of criticism; consistency across projects | One-page memo with options and recommendation |

Then sequence your engagement: **sceptics before signatories**. A senior official who hears that Transmission has already concurred reads your memo very differently.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Working the system from day one",
      blocks: [
        {
          kind: "md",
          md: md`### Your first 30 days in the ministry

1. **Get the documents of authority.** The current organisation chart, the delegation-of-authority decision for your sector, the formation decisions of committees your project depends on, and the contracts with all consultants (scope, deliverables, who they report to).
2. **Read the files.** Pull the last 20 outgoing letters and memos of your sector. Learn the house style, reference-number format, the forms of address, and who signs what.
3. **Meet the gatekeepers.** The office managers of your Assistant Undersecretary and the Undersecretary; the secretaries of the relevant committees; the document-control and archive staff. Courtesy now buys speed later.
4. **Map the people.** For each sector your project touches, identify the person who actually prepares their opinion.
5. **Find the precedents.** Previous decisions on similar matters — e.g. how Shagaya Phase I interface issues were handled, how previous IWPP interface agreements were structured.
6. **Agree the rules of engagement with consultants.** Write down what the OE may tell the contractor without your approval and what needs a ministry letter.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- **Going over heads.** An enthusiastic newcomer emails the Undersecretary directly because "it's urgent". The Assistant Undersecretary is embarrassed; the file slows for months.
- **Verbal decisions.** "The Undersecretary agreed in the meeting" — but no memo was signed; six months later the contractor's claim relies on that "instruction" and nobody can prove what was agreed.
- **Committee drift.** A committee formed for technical evaluation starts negotiating commercial terms outside its mandate; its recommendation is later challenged.
- **Consultant speaks for the ministry.** The OE tells the EPC that a design change is "acceptable to MEWRE"; the EPC proceeds and claims a variation.
- **Wasta by default.** A newcomer accepts a "friendly" request to "just check" where a bidder stands. That is a confidentiality breach in a live procurement.`,
        },
        {
          kind: "checklist",
          title: "PM checklist — before you push any decision upward",
          items: [
            "Is the decision within the authority of the person you are sending it to (check the delegation)?",
            "Have all affected sectors concurred in writing, or is there a joint meeting scheduled?",
            "Is there a precedent, and have you cited it?",
            "Have Legal and Financial seen the draft before it goes up?",
            "Is prior review by the State Audit Bureau (or KAPP / Higher Committee for PPPs) needed, and is its duration in the schedule?",
            "Is the memo on one page with a clear 'decision required' line?",
            "Would you be comfortable if every conversation behind the decision were written in the file?",
            "Has your direct superior been briefed so that nobody above is surprised?",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask your consultants (OE / advisers) in week one",
          items: [
            "Exactly which powers does your contract give you to instruct the contractor, and which require ministry approval?",
            "Which deliverables are overdue, and which ministry decisions are you waiting on?",
            "Which decisions did the previous PM take verbally that are not yet documented?",
            "Where is the master document register, and can the ministry access it without you?",
            "Who on your team attends which ministry committees, and in what capacity?",
          ],
        },
        { kind: "scenario", scenario: "m13-s1" },
        { kind: "scenario", scenario: "m13-s2" },
        {
          kind: "feynman",
          prompt:
            "Explain to an engineer joining from a private company why a ministry decision that 'everyone agreed in the meeting' can still take two months, and what a PM can do to make it faster without breaking any rule.",
          keyPoints: [
            "Authority is exercised by signature on documented memos, not verbally",
            "Personal accountability and audit scrutiny make officials decide on paper after Legal/Finance review",
            "Multiple sectors must concur; consensus and committees spread accountability",
            "Approval chains have a critical path; prior review (Audit Bureau, KAPP/Higher Committee) is often longest",
            "Speed comes from complete files, parallel reviews, joint meetings, precedent and early engagement of sceptics",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m13-l01-q1",
      type: "order",
      prompt: "Order the levels of a typical Kuwaiti ministry from most senior to least senior.",
      items: ["Minister (الوزير)", "Undersecretary (وكيل الوزارة)", "Assistant Undersecretary (وكيل مساعد)", "Department Director (مدير إدارة)", "Controller (مراقب)", "Section head (رئيس قسم)"],
      explanation: md`The Undersecretary is the senior civil servant who runs the ministry; Assistant Undersecretaries each head a sector; departments, controllerships and sections sit beneath. Confirm the exact structure of your sector from the official chart and delegation decision.`,
      concepts: ["m13.ministry-hierarchy"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m13-l01-q2",
      type: "mcq",
      prompt: "In a meeting, the Undersecretary says 'fine, go ahead' to your proposal to change the contractor's access sequence. What is the status of that decision?",
      options: [
        "It is a binding instruction you can pass to the contractor immediately",
        "It is agreement in principle; the decision exists once a memo is signed/annotated and the instruction issued through the contractual channel",
        "It is binding only if the Owner's Engineer was in the room",
        "It needs Council of Ministers approval",
      ],
      answer: 1,
      explanation: md`In a ministry, authority is exercised in writing. Verbal agreement signals direction, but the decision is the annotated memo, and any instruction to the contractor must go through the contract's notice provisions (under FIDIC, typically via the Engineer). Passing on a verbal "go ahead" creates an undocumented instruction that may later support a claim.`,
      concepts: ["m13.authority-flow"],
      difficulty: 1,
    },
    {
      id: "m13-l01-q3",
      type: "multi",
      prompt: "Which of these uses of relationships are legitimate for a MEWRE PM? (Select all that apply.)",
      options: [
        "Asking a colleague to introduce you to the head of transmission planning",
        "Asking a committee member how a bidder you know is scoring",
        "Learning informally what concerns the Assistant Undersecretary has before you brief",
        "Asking a respected senior to explain your proposal's context to a sceptical sector",
        "Recommending a relative's firm for a subcontract under your project",
      ],
      answer: [0, 2, 3],
      explanation: md`Relationships may legitimately buy **access and attention**. They may never touch outcomes the rules govern: evaluation information is confidential, and steering work to a relative is a conflict of interest.`,
      concepts: ["m13.relationship-capital"],
      difficulty: 1,
    },
    {
      id: "m13-l01-q4",
      type: "decision",
      prompt: md`You are the PM. The Owner's Engineer's resident engineer emails the EPC contractor: "MEWRE accepts your proposal to replace the specified inverter model." Nobody in the ministry approved this. What do you do?`,
      options: [
        { text: "Let it stand — the OE is the technical expert and the change is probably fine", score: 0, feedback: "This lets authority creep set a precedent and may create a variation claim the ministry never approved." },
        { text: "Immediately write to the contractor (through the contractual channel) that no Employer approval has been given and the submission remains under review; then meet the OE to restate the limits of their authority in writing", score: 1, feedback: "Correct: protect the contractual position at once, then fix the governance gap. Under FIDIC, the Engineer's powers are defined and limited by the Contract." },
        { text: "Call the contractor's PM informally to say the email doesn't count", score: 0.3, feedback: "A phone call leaves no record; the email is on file and the contractor can rely on it." },
        { text: "Escalate to the Undersecretary to terminate the OE contract", score: 0.2, feedback: "Disproportionate as a first step and skips your chain. Correct the record and the authority limits first; record performance issues in the OE's KPIs." },
      ],
      explanation: md`Consultants advise and prepare; officials decide. When a consultant exceeds authority, fix the record **in writing, through the right channel, immediately**, then correct the governance (written authority matrix for the consultant).`,
      concepts: ["m13.consultant-role", "m13.authority-flow"],
      difficulty: 2,
    },
    {
      id: "m13-l01-q5",
      type: "mcq",
      prompt: "Why does a committee's rapporteur (مقرر) have significant practical influence?",
      options: [
        "The rapporteur has a casting vote",
        "The rapporteur drafts the minutes, which become the record and the basis of the recommendation",
        "The rapporteur can overrule the chair",
        "The rapporteur signs on behalf of the Minister",
      ],
      answer: 1,
      explanation: md`Whoever writes the minutes frames what was decided. Supporting the rapporteur with accurate draft minutes is one of the most effective, fully legitimate ways for a PM to keep decisions precise.`,
      concepts: ["m13.decision-culture", "m13.authority-flow"],
      difficulty: 2,
    },
    {
      id: "m13-l01-q6",
      type: "short",
      prompt: "A contractor's senior executive asks to meet the Undersecretary about a routine late-payment complaint. Explain how protocol and escalation logic should shape your response.",
      rubric: [
        "Recognises that senior meetings are an escalation tool and should be matched in seniority and reserved for significant issues",
        "Routes the routine issue to the right working level (finance/payments, PM) first",
        "Offers a meeting at an appropriate level (PM / director) with a clear agenda and facts on payment status",
        "Keeps the superior informed so nobody is surprised",
        "Responds courteously, protecting relationships and face",
      ],
      modelAnswer:
        "A meeting with the Undersecretary is a scarce escalation tool; spending it on a routine payment query wastes it and teaches the contractor to bypass the working level. I would reply courteously that the matter is being handled, check the payment status with Financial Affairs, and offer a meeting with me and the relevant director with the facts (IPC numbers, dates certified, reasons for any delay). I would brief my Assistant Undersecretary so that if the executive calls the Undersecretary's office, the office already knows the status. If the issue turns out to be systemic or large, escalation becomes appropriate and I would prepare a short memo.",
      explanation: md`Protocol matches seniority and preserves escalation for when it matters; the PM protects superiors from surprises and resolves issues at the lowest competent level.`,
      concepts: ["m13.protocol", "m13.authority-flow"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m13-l01-f1", front: "وكيل الوزارة — role", back: "Undersecretary: the senior civil servant who runs the ministry day to day and signs most significant correspondence within delegation." },
    { id: "m13-l01-f2", front: "What is a تأشيرة on a memo?", back: "The handwritten annotation by a senior official (e.g. موافق, للعرض, لاتخاذ اللازم) — the annotated memo is the decision record." },
    { id: "m13-l01-f3", front: "Formal vs practical authority", back: "Formal = signatures and delegations. Practical = who drafts, who gatekeeps timing, who advises the signatory." },
    { id: "m13-l01-f4", front: "Ethical test for wasta", back: "Relationships may buy access and attention; never outcomes the rules govern (awards, evaluations, approvals, hiring)." },
    { id: "m13-l01-f5", front: "Consultant stance in one line", back: "Consultants advise and prepare; officials decide and sign." },
    { id: "m13-l01-f6", front: "Who procures a PPP IPP in Kuwait, and who is offtaker?", back: "KAPP procures (with Higher Committee approval and Audit Bureau prior review); MEWRE is offtaker." },
    { id: "m13-l01-f7", front: "Approval chain planning rule", back: "Model it like a schedule: steps, durations, parallel branches, critical path, float — and calibrate durations from past files." },
    { id: "m13-l01-f8", front: "Law No. 94 of 2026 — two changes", back: "Direct-contracting threshold without CAPT raised to KD 1m per financial year; local/commission agents banned in public contracting (effective ~Dec 2026)." },
  ],
  scenarios: [
    {
      id: "m13-s1",
      title: "Your first steering committee",
      dayInLife: true,
      context: md`You are three weeks into the job as PM for MEWRE-side grid works serving a new PV IPP. The steering committee — chaired by the Assistant Undersecretary for your sector, with members from Transmission, Planning, Legal and Financial Affairs, plus the Owner's Engineer as an invited adviser — meets tomorrow. The key item: the 400 kV bay at the receiving substation is forecast **10 weeks late** against the IPP's scheduled grid-connection date.`,
      start: "a",
      concepts: ["m13.decision-culture", "m13.authority-flow", "m13.protocol"],
      nodes: {
        a: {
          md: md`The OE offers to present the delay and the recovery options at the meeting "to save you time". What do you do?`,
          choices: [
            { text: "Accept — the OE knows the details best", next: "b", score: 3, feedback: "The OE should support, but if the consultant presents a ministry problem to a ministry committee, members will treat the OE as the owner and you as a spectator." },
            { text: "Present it yourself in three minutes with the OE ready for technical questions, and circulate a one-page pre-read today", next: "c", score: 10, feedback: "You own the issue; the pre-read lets members (and their advisers) form views before the meeting — consensus forms before, not during, a committee." },
            { text: "Remove the item from the agenda until the recovery plan is perfect", next: "d", score: 1, feedback: "Hiding a 10-week slip from the steering committee is the fastest way to lose trust. Bad news early, with options." },
          ],
        },
        b: {
          md: md`The OE presents, and the Transmission representative challenges the assumptions about outage windows. The chair turns to you: "What is the ministry's position?" You have not formed one.`,
          choices: [
            { text: "Say you will come back with a recommendation within a week after aligning with Transmission", next: "c2", score: 6, feedback: "A reasonable recovery — but the lesson is to own the narrative from the start." },
            { text: "Improvise a position in the meeting", score: 2, feedback: "An unprepared position recorded in signed minutes can bind you. Better to commit to a dated follow-up." },
          ],
        },
        c: {
          md: md`Before the meeting, you call the Transmission controller who will brief their member. They are worried that the recovery plan needs an outage in **August**, during peak demand. What do you do with this information?`,
          choices: [
            { text: "Rework the options so no outage falls in June–September, and say so explicitly in the pre-read", next: "e", score: 10, feedback: "You converted a likely blocker into a supporter by addressing their concern before the meeting. With peak demand around 17.5 GW against about 17 GW reliable capacity, a summer outage is a non-starter." },
            { text: "Keep the plan; Transmission can raise it in the meeting", next: "e", score: 3, feedback: "You knew the objection and let it surface publicly — the committee will defer the decision." },
          ],
        },
        c2: {
          md: md`A week later you circulate a recommendation that Transmission has already reviewed. The chair asks for it as a decision memo.`,
          choices: [{ text: "Draft a one-page decision memo with options and recommendation", score: 8, feedback: "Good recovery: the decision now rests on paper with sector concurrence." }],
        },
        d: {
          md: md`Two weeks later the IPP developer writes to KAPP and the Undersecretary about the grid delay. The Assistant Undersecretary learns of it from the Undersecretary's office.`,
          choices: [{ text: "Apologise and present the issue at the next meeting", score: 1, feedback: "Your superior was surprised by their own superior — the worst outcome in ministry culture. Trust takes months to rebuild." }],
        },
        e: {
          md: md`At the meeting the committee agrees the recovery option. The chair says: "Agreed — proceed." How do you close the loop?`,
          choices: [
            { text: "Send the rapporteur draft minutes the same day with the decision wording, owners and dates; then prepare the memo/letters needed to instruct through the contract", score: 10, feedback: "Signed minutes and a contractual instruction turn agreement into authority. Supporting the rapporteur keeps the record precise." },
            { text: "Tell the contractor by phone that the committee agreed", score: 2, feedback: "A committee recommendation is not yet a contractual instruction, and a phone call leaves no record." },
          ],
        },
      },
    },
    {
      id: "m13-s2",
      title: "A friendly call during the evaluation",
      dayInLife: true,
      context: md`You are a technical member of an evaluation team for a MEWRE consultancy tender. In the evening, a well-respected family acquaintance calls. His nephew works for one of the bidders. "Nothing improper," he says, "just tell us whether they are in a good position — and if anything is missing in their bid, a word would help."`,
      start: "a",
      concepts: ["m13.relationship-capital", "m13.protocol"],
      nodes: {
        a: {
          md: md`How do you respond on the call?`,
          choices: [
            { text: "Politely decline: you are bound by the committee's confidentiality; the bidder should use the formal clarification channel; thank him for understanding", next: "b", score: 10, feedback: "You protected the relationship (no accusation, face preserved) and the process (no information shared). 'The system does not allow me' is a respectful no." },
            { text: "Say you can't discuss scores but hint that the bid is 'fine'", next: "c", score: 1, feedback: "Even a hint is disclosure of evaluation information and could compromise the tender." },
            { text: "Angrily tell him this is corruption", next: "b", score: 4, feedback: "Right boundary, wrong delivery. In a relationship culture, humiliating a respected elder makes enemies and does not improve integrity." },
          ],
        },
        b: {
          md: md`The next morning, should you do anything more?`,
          choices: [
            { text: "Record the approach in writing with the committee chair / as required by integrity rules, and consider whether you should step aside if there is a conflict of interest", score: 10, feedback: "Declaring the approach protects you and the tender. If your relationship with the bidder's people is close, recusal may be appropriate." },
            { text: "Do nothing — you declined, so it's over", score: 4, feedback: "If the approach later emerges, an undeclared contact looks worse than it was. Disclose." },
          ],
        },
        c: {
          md: md`A week later the bidder's clarification response suspiciously fixes exactly the weakness you noticed. Another evaluator raises it.`,
          choices: [{ text: "Disclose the call to the chair now", score: 3, feedback: "Late disclosure is better than none, but the tender may now need investigation. The first answer was the one that mattered." }],
        },
      },
    },
  ],
};

export default lesson;
