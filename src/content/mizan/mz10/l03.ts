import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz10-l03",
  title: "Working with a research institute: KISR as methodology partner, data, authorship, timelines, IP and agreements",
  summary:
    "How a startup and a national research institute work together on a validation study: what each side brings and wants, the sequence of agreements (MoU, research collaboration or data-sharing agreement), data access and governance, authorship by ICMJE criteria and CRediT roles, competing-interest disclosure, publication timelines, and how to handle IP and confidentiality so that publishing the method and selling the product do not collide.",
  minutes: 70,
  objectives: [
    "Describe what KISR brings to the targeted pilot as methodology partner and what it needs from Mizan",
    "Lay out the sequence of agreements and what each one usually covers, without inventing terms",
    "Apply ICMJE authorship criteria and CRediT roles to a startup and institute team, including competing-interest disclosure",
    "Build a realistic publication timeline and see why a historical-data paper can come first",
    "Separate what Mizan publishes (the method) from what it keeps (implementation, product), and know when publication destroys patent options",
  ],
  concepts: [
    {
      id: "mz10.methodology-partner",
      name: "Methodology partner",
      description: "A research institution that co-designs, reviews and co-authors the validation study, bringing domain expertise, data, independence and scientific credibility; distinct from a customer or an endorser.",
      competency: "mz-validation",
      related: ["mz10.authorship", "mz10.data-sharing-agreement"],
    },
    {
      id: "mz10.data-sharing-agreement",
      name: "Data access and data-sharing agreement",
      description: "The binding document that defines which data are shared, by whom, for what purpose, under what security, for how long, who may publish what, and what happens to the data at the end; may need the asset owner's consent as well as the institute's.",
      competency: "mz-validation",
      related: ["mz10.mou", "fc08.data-rights"],
    },
    {
      id: "mz10.authorship",
      name: "Authorship and contributor roles",
      description: "Authors meet the ICMJE criteria (substantial contribution, drafting or critical revision, final approval, accountability); CRediT roles record who did what; others are acknowledged; commercial interests are declared.",
      competency: "mz-validation",
      related: ["mz10.methodology-partner"],
    },
    {
      id: "mz10.ip-confidentiality",
      name: "IP and confidentiality in research collaborations",
      description: "Background IP stays with its owner; ownership and licensing of foreground IP is negotiated; publication review periods protect confidential information and patent filings; publishing a method makes it prior art.",
      competency: "mz-validation",
      related: ["fc08.ip-assignment", "fc08.nda"],
    },
    {
      id: "mz10.mou",
      name: "Memorandum of understanding (MoU)",
      description: "A statement of intent to collaborate, usually non-binding except for named clauses such as confidentiality; useful to open doors and align scope, but not a substitute for the binding research or data agreement.",
      competency: "mz-validation",
      related: ["mz10.data-sharing-agreement"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Two organisations, different clocks and incentives",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`The Shagaya pilot is targeted with KISR researchers (Mohammad Al-Khayat and co-authors of the 2020 Shagaya PV performance paper) as methodology partner. That relationship is Mizan's most valuable asset in Kuwait and the easiest to damage: a careless claim, an authorship surprise or a data misunderstanding can end it. You will negotiate the agreements, propose roles and keep both organisations' clocks aligned, so you need to know how research collaborations are structured and where they usually break.`,
        },
        {
          kind: "md",
          md: md`### What each side brings and wants

| | KISR researchers (methodology partner) | Mizan |
|---|---|---|
| **Brings** | Domain expertise on Shagaya and Kuwaiti dust; operating history and data from the plant they built and studied; scientific independence; credibility with ministries and journals | A method and software to turn operational data into cleaning decisions; engineering time; a commercial path that makes the research matter |
| **Wants** | Publications in good journals; a useful method for Kuwait's plants; research continuity and funding; correct use and attribution of their data | Validated evidence it can cite; a reference relationship; a method that works on real Kuwaiti data; speed |
| **Clock** | Institutional approvals, academic calendar, review cycles of months | Runway measured in months |
| **Risk they fear** | Being used for marketing; data misused or leaked; losing credit | Delay; IP leakage; a result it cannot use commercially |

KISR has already confirmed there is no standard method for turning operational data into cleaning decisions. That shared problem statement is the basis of the collaboration: a publishable method gap that matters to Kuwait.

A **methodology partner** co-designs and reviews the study and co-authors its results. It is not a customer (it is not buying), and it is not an endorser (it does not vouch for Mizan's product). Keep these roles separate in everything you write.

### The sequence of agreements

The exact documents and their terms depend on KISR's own procedures and Kuwaiti public-sector rules, which you must learn from KISR's legal or contracts office. The general pattern in research collaborations is:`,
        },
        {
          kind: "flow",
          title: "Typical path from first meeting to publication",
          steps: [
            { label: "Mutual NDA", detail: "Lets both sides share method details and data descriptions" },
            { label: "MoU or letter of intent", detail: "Shared aims, scope, contacts; mostly non-binding" },
            { label: "Research collaboration or data-sharing agreement", detail: "Binding: data, roles, IP, publication, confidentiality, term" },
            { label: "Study plan and data management plan", detail: "Hypotheses, sizing, hold-out, security, retention" },
            { label: "Study and analysis", detail: "Joint reviews at fixed milestones" },
            { label: "Manuscript and partner review", detail: "Agreed review period before submission" },
            { label: "Submission, peer review, publication", detail: "Months, not weeks" },
          ],
          caption: "Generic sequence. KISR's actual instruments, approvals and terms must come from KISR. The asset owner's consent (Shagaya Phase I was reported transferred to MEW, now MEWRE) may also be needed for operational data.",
        },
        {
          kind: "md",
          md: md`### What the binding agreement usually covers

Without inventing terms, these are the topics any research or data agreement will address and that you should prepare positions on:

- **Scope and purpose**: which study, which data, used for what. Data shared for validation may not automatically be usable for commercial product training: ask.
- **Data**: list of datasets, resolution, period, format, transfer method, security (where the data sit, who has access), retention and deletion at the end.
- **Roles and responsibilities**: who designs, who analyses, who reviews, who funds what.
- **Publication**: the right to publish, the partner's review period before submission, grounds for requesting a delay (confidential information, patent filing) and its maximum length, and how disputes are resolved.
- **IP**: background IP (each side keeps what it brought), foreground IP (what the project creates: owned by the creator, jointly, or by one side with a licence to the other), and rights to use results.
- **Confidentiality**: what is confidential, exceptions, duration.
- **Attribution and use of names**: whether and how each party may mention the other publicly. This governs every slide and press release you will make (lesson 5).
- **Term, termination and governing law.**

### Authorship: decide early, by criteria

Use the **ICMJE criteria**, widely applied beyond medicine. An author must meet all four:

1. Substantial contribution to conception or design, or to acquisition, analysis or interpretation of data;
2. Drafting the work or revising it critically for important intellectual content;
3. Final approval of the version to be published;
4. Agreement to be accountable for all aspects of the work.

Contributors who do not meet all four (for example a plant technician who retrieved logs) are **acknowledged**, not listed. Record contributions with **CRediT** roles (conceptualization, methodology, software, validation, formal analysis, investigation, resources, data curation, writing, visualization, supervision, project administration, funding acquisition), which many journals now publish.

Order and the corresponding author differ by field and institution. Agree them in writing before the analysis, and revisit if contributions change. As a company author you must also **declare competing interests**: Mizan has a commercial interest in the method succeeding, and reviewers will judge the paper partly on how openly that is handled. A strong independent co-author team and pre-registration are the best answer to that suspicion.`,
        },
        {
          kind: "matrix",
          title: "Publish or protect: what goes where",
          xAxis: ["Easy to copy once seen", "Hard to copy even when seen"],
          yAxis: ["Low value to the field", "High value to the field"],
          cells: [
            { label: "Protect or keep internal", detail: "Tuning tricks, customer-specific integrations: low scientific value, easy to copy" },
            { label: "Keep internal, little risk", detail: "Operational know-how, deployment tooling" },
            { label: "Decide deliberately", detail: "A novel detection algorithm: publishing makes it prior art; file first or accept it becomes open" },
            { label: "Publish", detail: "Validation design, metrics and results, the method's principles: high field value, the product moat is elsewhere (data, integration, speed)" },
          ],
          caption: "Mizan's moat is unlikely to be one formula. Publishing the method and its validation builds credibility; the product (data pipelines, integration with plant systems, operations) stays proprietary.",
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Publication is prior art",
          md: md`Once a method is published (paper, preprint, conference talk, even a detailed slide deck shown publicly), it generally can no longer be patented. Europe has no general grace period; the US has a one-year grace period for the inventor's own disclosure. If anyone at Mizan thinks part of the method is patentable, decide before the first public disclosure, including the preprint. This is a reason to agree the publication review period in the agreement.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Worked: a realistic publication timeline",
      blocks: [
        {
          kind: "worked",
          title: "When can the first paper appear? (illustrative durations)",
          mode: "faded",
          given: md`Illustrative durations, in months, from today; actual times vary widely by institution and journal. Agreements 3, data access approvals 2, prospective data collection 12, analysis 3, drafting 2, partner review 1, journal first decision 3, revision 1.5, second review 1.5, acceptance to online publication 1. Two papers are possible: **Paper A** on the historical natural-experiment data (no new collection), **Paper B** on the prospective study.`,
          steps: [
            { md: md`**Paper B (prospective).** $3 + 2 + 12 + 3 + 2 + 1 + 3 + 1.5 + 1.5 + 1 = 30$ months to online publication.` },
            {
              md: md`**Paper A (historical).** Same, without the 12 months of collection.`,
              hidden: true,
              check: { prompt: "Months to online publication for Paper A", answer: 18, tolerance: { abs: 0 }, unit: "months" },
            },
            {
              md: md`**Preprint of Paper A at submission.** Agreements, access, analysis, drafting and partner review only (if the journal allows preprints and the partner agrees).`,
              hidden: true,
              check: { prompt: "Months to a preprint of Paper A", answer: 11, tolerance: { abs: 0 }, unit: "months" },
            },
            { md: md`**Conference route.** An abstract to a major PV conference can be submitted once first results exist; conference abstract deadlines are typically many months before the event, so plan backwards from the deadline on the official site.` },
          ],
          result: md`Prospective paper: about 30 months. Historical natural-experiment paper: about 18 months, preprint at about 11. The historical paper is the early credibility milestone; the prospective study is the durable one. Agreements and approvals (5 months here) are on the critical path of both, so start them first.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Running the partnership",
      blocks: [
        {
          kind: "md",
          md: md`### Practice

- **One page first.** Before any MoU, send a one-page concept note: the problem KISR has confirmed, the study question, what each side contributes, proposed outputs (papers, open tools), and a timeline. Researchers respond to research questions, not sales decks.
- **Respect the institution.** Requests for data go through the channel KISR names, not through personal favours. Ask early who must approve (division, legal, management, the asset owner).
- **Milestone reviews.** Fixed joint reviews (plan sign-off, data receipt, blind outputs lodged, unblinding, draft) keep both clocks visible.
- **Write it down.** After every meeting, short minutes with decisions and owners. In Kuwaiti public institutions, written records and formal letters carry weight.
- **Money.** Who pays for what (instruments, researcher time, open-access fees, conference travel) must be explicit. Do not assume researcher time is free.
- **Bilingual courtesy.** Formal letters to KISR management in Arabic with an English version are appropriate; technical collaboration is normally in English.`,
        },
        { kind: "xref", to: "m13-l02", note: "Briefs, memos and official letters in English and Arabic for Kuwaiti public bodies." },
        { kind: "xref", to: "fc08-l07", note: "NDAs, IP assignment, pilot contracts and data rights from the founder's side." },
        {
          kind: "ask",
          title: "Questions to ask KISR early",
          items: [
            "Which agreement instruments does KISR use for collaborations with companies, and who in KISR approves them?",
            "Do operational data from Shagaya Phase I need approval from the plant owner as well as from KISR?",
            "May data shared for the validation study also be used to improve Mizan's product, or only for the study?",
            "What publication review period and attribution rules does KISR normally apply?",
            "How does KISR prefer authorship and the corresponding author to be decided?",
            "Are there KISR or national open-data policies that apply to a dataset released from the study?",
          ],
        },
        {
          kind: "callout",
          tone: "pm",
          title: "What you check before signing anything",
          md: md`That the agreement lets Mizan (1) use the validated method commercially, (2) mention the collaboration publicly in agreed words, (3) publish the results jointly even if negative, and (4) keep its background IP. And that it gives KISR what it needs: publication rights, attribution, data protection and a clear purpose limit. If any of the four for Mizan is missing, raise it before signature, not after the result.`,
        },
        { kind: "scenario", scenario: "mz10-s1" },
        {
          kind: "question",
          question: {
            id: "mz10-l03-p1",
            type: "short",
            prompt: md`Write the **one-page concept note** (about 300 words) you would send to the KISR researchers to propose the collaboration structure for the targeted Shagaya Phase I soiling analytics pilot. Cover the shared problem, the study question, contributions of each side, proposed outputs, authorship approach, the agreements needed, and open questions. Do not invent any agreed terms.`,
            rubric: [
              "States the shared problem (no standard method for turning operational data into cleaning decisions) and a specific study question",
              "Contributions of each side are concrete and roles are kept distinct (methodology partner, not customer or endorser)",
              "Proposes outputs including at least one joint paper and the possibility of open tools or data, with competing interests acknowledged",
              "Authorship by ICMJE criteria with CRediT roles, agreed before analysis",
              "Names the agreements needed (NDA, MoU, binding data or research agreement) and asks rather than asserts KISR's procedures and the asset owner's consent",
              "Describes the pilot as targeted or in preparation, and invents no terms, funding or commitments",
            ],
            modelAnswer: md`**Concept note: validating a method for data-driven cleaning decisions at Shagaya Phase I (draft for discussion)**

**Shared problem.** As you confirmed, there is no standard method for turning operational PV data into cleaning decisions. Temperature-corrected PR to IEC 61724 gives the baseline, but not when to clean.

**Study question.** Can soiling rates and losses estimated from Shagaya Phase I's operational data match independent references closely enough to support cleaning decisions? We propose two parts: (A) a blind test on historical data, including the 2018 to 2019 cleaning-arm outage if your records support it, and (B) a prospective study of at least twelve months.

**Contributions.** KISR: methodology design and review, knowledge of the plant and its records, ground-truth data, scientific independence. Mizan: the method and software, engineering and analysis time, project management, and the route to use in operating plants.

**Outputs.** A joint paper on part A (target journal to agree, building on the 2020 RSER performance paper), a second paper on part B, conference presentations, and, if both sides agree, an open dataset or toolkit. Mizan's commercial interest will be declared in every publication.

**Authorship.** By the ICMJE criteria, with CRediT roles recorded, agreed in writing before analysis.

**Agreements.** A mutual NDA now; then the instruments KISR uses for collaborations (MoU and a binding research or data agreement covering data, publication review, IP, confidentiality and public attribution).

**Questions for you.** Which instruments and approvals does KISR require? Does data access also need the plant owner's consent? What review period and attribution rules do you apply? What would you need to see in a study plan to accept it as a valid test?

The pilot is in preparation; nothing above is agreed until we have discussed it.`,
            explanation: md`Researchers respond to a shared research question and a fair, explicit split of roles and credit. Asking about KISR's own instruments, approvals and the asset owner's consent, rather than asserting terms, protects the relationship.`,
            concepts: ["mz10.methodology-partner", "mz10.authorship", "mz10.mou", "mz10.data-sharing-agreement"],
            difficulty: 3,
          },
        },
        { kind: "sources", refs: ["mz10-r1", "mz10-r6", "mz10-r7", "mz10-r8", "mz10-r18"] },
      ],
    },
  ],
  quiz: [
    {
      id: "mz10-l03-q1",
      type: "multi",
      prompt: md`Under the ICMJE criteria, which of these people qualify as authors? (select all)`,
      options: [
        "A KISR researcher who designed the ground-truth measurements, revised the draft critically, approved it and accepts accountability",
        "A plant technician who exported the inverter logs",
        "Mizan's engineering partner who built and ran the method, co-wrote the methods section, approved the final version and accepts accountability",
        "A senior manager who approved the budget but did not see the manuscript",
      ],
      answer: [0, 2],
      explanation: md`All four criteria are needed. The technician and the manager are acknowledged, not listed.`,
      concepts: ["mz10.authorship"],
      difficulty: 1,
    },
    {
      id: "mz10-l03-q2",
      type: "mcq",
      prompt: md`What is an MoU usually?`,
      options: [
        "A binding contract that transfers data rights",
        "A mostly non-binding statement of intent, sometimes with binding clauses such as confidentiality",
        "A regulatory licence",
        "A publication agreement with a journal",
      ],
      answer: 1,
      explanation: md`An MoU aligns intent and scope. Data, IP and publication rights belong in a binding research or data agreement.`,
      concepts: ["mz10.mou"],
      difficulty: 1,
    },
    {
      id: "mz10-l03-q3",
      type: "mcq",
      prompt: md`Mizan's engineers think the cleaning-detection algorithm may be patentable. The team wants to post a preprint next week. What is the key consequence?`,
      options: [
        "None: preprints do not count as publication",
        "The preprint generally becomes prior art; in Europe there is no general grace period, so decide on filing before posting",
        "The journal will own the patent",
        "KISR automatically owns the patent",
      ],
      answer: 1,
      explanation: md`Any public disclosure counts. The US has a one-year grace period for the inventor's own disclosure; Europe has none in general.`,
      concepts: ["mz10.ip-confidentiality"],
      difficulty: 2,
    },
    {
      id: "mz10-l03-q4",
      type: "numeric",
      prompt: md`Illustrative: agreements 4 months, approvals 2, analysis of historical data 3, drafting 2, partner review 1, journal to acceptance 6, acceptance to online 1. How many months to online publication?`,
      answer: 19,
      tolerance: { abs: 0 },
      unit: "months",
      explanation: md`$4 + 2 + 3 + 2 + 1 + 6 + 1 = 19$ months. Agreements and approvals are a third of it: start them first.`,
      concepts: ["mz10.data-sharing-agreement"],
      difficulty: 1,
    },
    {
      id: "mz10-l03-q5",
      type: "decision",
      prompt: md`The draft agreement from KISR says data may be used "solely for the purposes of the joint study". Your product team hoped to use the data to improve the commercial model. What do you do?`,
      options: [
        { text: "Raise it before signing: explain what product use you want, propose terms (for example anonymised derived parameters, attribution, a benefit to KISR) and accept their answer.", score: 1, feedback: "Purpose limits are legitimate; negotiating openly before signature is the only clean route." },
        { text: "Sign and use the data anyway, since the model improvement is invisible.", score: 0, feedback: "A breach that, if discovered, ends the partnership and Mizan's reputation in Kuwait." },
        { text: "Sign and accept the limit without discussion.", score: 0.5, feedback: "Acceptable if the study alone is worth it, but you lose the chance to agree a fair use that helps both." },
      ],
      explanation: md`Data purpose is one of the four things to check before signing.`,
      concepts: ["mz10.data-sharing-agreement"],
      difficulty: 2,
    },
    {
      id: "mz10-l03-q6",
      type: "mcq",
      prompt: md`Why should Mizan declare a competing interest in the paper?`,
      options: [
        "It is optional and mainly decorative",
        "Mizan benefits commercially if the method looks good; disclosure lets reviewers judge the work and protects the authors' credibility",
        "Because KISR is a government body",
        "To get a faster review",
      ],
      answer: 1,
      explanation: md`Journals require disclosure of financial interests. Pre-registration and independent co-authors are the substantive answer to the suspicion.`,
      concepts: ["mz10.authorship"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "mz10-l03-f1", front: "Methodology partner versus endorser", back: "Co-designs, reviews and co-authors the study. Does not vouch for the product, and is not a customer.", concepts: ["mz10.methodology-partner"] },
    { id: "mz10-l03-f2", front: "ICMJE authorship: four criteria", back: "Substantial contribution; drafting or critical revision; final approval; accountability. All four.", concepts: ["mz10.authorship"] },
    { id: "mz10-l03-f3", front: "CRediT", back: "Contributor Roles Taxonomy (NISO): 14 roles such as methodology, software, validation, data curation, writing.", concepts: ["mz10.authorship"] },
    { id: "mz10-l03-f4", front: "Topics of a research or data agreement", back: "Scope and purpose, data and security, roles, publication and review period, IP, confidentiality, attribution, term.", concepts: ["mz10.data-sharing-agreement"] },
    { id: "mz10-l03-f5", front: "Background versus foreground IP", back: "Background: what each side brings, stays with it. Foreground: created in the project, ownership negotiated.", concepts: ["mz10.ip-confidentiality"] },
    { id: "mz10-l03-f6", front: "Four things Mizan checks before signing", back: "Commercial use of the method, agreed public wording, right to publish jointly even if negative, background IP kept.", concepts: ["mz10.data-sharing-agreement", "mz10.ip-confidentiality"] },
  ],
  scenarios: [
    {
      id: "mz10-s1",
      title: "The researcher says: we would rather publish this ourselves first",
      dayInLife: true,
      context: md`Illustrative. The study plan is nearly agreed. In a meeting, a senior KISR researcher says: "The outage data are ours and the analysis question builds on our 2020 paper. We think KISR should publish the natural-experiment results first, on our own, and Mizan can join the prospective study later."`,
      start: "a",
      concepts: ["mz10.methodology-partner", "mz10.authorship", "mz10.data-sharing-agreement"],
      nodes: {
        a: {
          md: md`How do you respond in the room?`,
          choices: [
            { text: "Acknowledge the point openly: the data and the prior work are theirs. Ask what they would need for a joint paper to be fair to them (lead and corresponding author, data credit), and explain what Mizan contributes to the analysis.", next: "b", score: 9, feedback: "Respects their legitimate claim and moves the conversation to contributions and credit, where a fair split is possible." },
            { text: "Insist that Mizan must be first author because the method is Mizan's.", next: "c", score: 2, feedback: "Authorship order is negotiated on contributions and field norms. Demanding it signals that you are there for marketing." },
            { text: "Agree immediately and wait for the prospective study.", next: "d", score: 4, feedback: "Keeps the peace but gives up the early, blind test of your method, which only works if your method is in it." },
          ],
        },
        b: {
          md: md`The researcher relaxes: "If KISR leads and we are corresponding author, and your method is tested as one of the methods, we could do it jointly."`,
          choices: [
            { text: "Accept, propose that the paper tests Mizan's method alongside an open baseline (SRR) under the same blind protocol, record CRediT roles, and confirm the agreed public wording for the collaboration.", score: 10, feedback: "A fair split, a stronger paper (a baseline comparison is what reviewers want), and Mizan's method is validated blind." },
            { text: "Accept, but ask that only Mizan's method be reported.", score: 5, feedback: "Weaker science: without a baseline, reviewers cannot tell whether the method adds anything." },
          ],
        },
        c: {
          md: md`The room goes quiet. The researcher says they need to discuss internally.`,
          choices: [
            { text: "Follow up the same day with a written apology for pressing, and a proposal that KISR leads with Mizan's method tested blind against a baseline.", score: 6, feedback: "Recoverable, but you have spent trust you will need later." },
            { text: "Wait for them to come back.", score: 2, feedback: "Silence after a misstep usually means the project drifts." },
          ],
        },
        d: {
          md: md`Months later KISR publishes the outage analysis using SRR only. A competitor cites it in a Kuwaiti tender.`,
          choices: [
            { text: "Learn the lesson: propose that the prospective study includes a pre-registered blind comparison of methods, with roles agreed now.", score: 5, feedback: "The right repair, but the early evidence went to the field without you." },
          ],
        },
      },
    },
  ],
};

export default lesson;
