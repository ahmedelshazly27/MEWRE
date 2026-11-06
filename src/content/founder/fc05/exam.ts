import { md, type Question } from "../../schema";

const exam: Question[] = [
  {
    id: "fc05-x1",
    type: "numeric",
    prompt: md`A booth at a battery show costs EUR 22,000 before staff time. Three people attend for four days at EUR 500 per person-day. The team qualifies 16 leads against written criteria. What is the cost per qualified lead? (EUR)`,
    answer: 1750,
    tolerance: { abs: 1 },
    unit: "EUR",
    explanation: md`Staff time $= 3 \times 4 \times 500 = 6{,}000$; full cost $= 28{,}000$; CPQL $= 28{,}000/16 = 1{,}750$ EUR. Leaving out staff time would understate it by 21%.`,
    concepts: ["fc05.cpql"],
    difficulty: 2,
  },
  {
    id: "fc05-x2",
    type: "numeric",
    prompt: md`Afterwave wants 4 new paid pilots next year. 30% of qualified leads become opportunities and 25% of opportunities are won. How many qualified leads are needed? (round up to a whole lead)`,
    answer: 54,
    tolerance: { abs: 0.5 },
    explanation: md`$N_q = 4/(0.30 \times 0.25) = 4/0.075 = 53.3$, so 54 qualified leads, about one a week. Work back from this to the mix of content, events, LinkedIn and outbound that can produce them.`,
    concepts: ["fc05.cpql", "fc05.content-economics"],
    difficulty: 2,
  },
  {
    id: "fc05-x3",
    type: "numeric",
    prompt: md`Two demo-request page versions each get 2,000 visitors. A converts 40, B converts 60. Compute the two-proportion z-statistic (2 decimals).`,
    answer: 2.03,
    tolerance: { abs: 0.02 },
    explanation: md`$p_A = 0.020$, $p_B = 0.030$, $\hat p = 0.025$. $SE = \sqrt{0.025 \times 0.975 \times (2/2{,}000)} = 0.00494$. $z = 0.010/0.00494 = 2.03 > 1.96$: significant at 5%, but check the extra requests are qualified.`,
    concepts: ["fc05.message-testing"],
    difficulty: 2,
  },
  {
    id: "fc05-x4",
    type: "numeric",
    prompt: md`An application note costs EUR 12,000 including expert time. Attributed pipeline (linear model) over its first year is EUR 150,000, win rate 20%, gross margin 80%. What is its first-year ROI? (decimal)`,
    answer: 1.0,
    tolerance: { abs: 0.01 },
    explanation: md`Gross profit $= 150{,}000 \times 0.20 \times 0.80 = 24{,}000$. ROI $= (24{,}000 - 12{,}000)/12{,}000 = 1.0$, so 100%. Under U-shaped or first-touch the number could be very different; rank assets under several models.`,
    concepts: ["fc05.content-economics", "fc05.attribution"],
    difficulty: 2,
  },
  {
    id: "fc05-x5",
    type: "decision",
    prompt: md`A freelancer has drafted Mizan's first press release in English, run it through machine translation for Arabic, and proposes sending both to Kuwaiti newspapers and KUNA tomorrow. It names KISR as "Mizan's partner at Shagaya". The pilot is still being prepared. What do you do?`,
    options: [
      { text: "Send it; early visibility helps the pilot.", score: 0, feedback: "Announces an unapproved partnership with a government research body in a machine-translated text: two serious errors at once." },
      { text: "Stop it. Remove any mention of KISR and Shagaya until KISR approves text and timing in writing; if a release is still worth sending, make it about Mizan's method, transcreated into MSA and reviewed by a native Gulf Arabic reader.", score: 1, feedback: "Protects the relationship and the brand, and fixes the language problem." },
      { text: "Send only the English version to avoid Arabic errors.", score: 0.1, feedback: "Still announces KISR without approval, and an English-only release to Kuwaiti Arabic media signals the wrong thing." },
    ],
    explanation: md`Partners announce on their own terms, and in Kuwait government bodies usually announce through their own channels. Arabic for Gulf media is transcreated MSA with a native review, never raw machine output.`,
    concepts: ["fc05.press-release", "fc05.transcreation", "fc05.arabic-register"],
    difficulty: 2,
  },
  {
    id: "fc05-x6",
    type: "decision",
    prompt: md`Afterwave has EUR 30,000 and roughly 15 founder-days for marketing over the next six months, before any pilot results exist. Which allocation is best?`,
    options: [
      { text: "A booth at the largest industrial fair (about EUR 28,000) and a new logo.", score: 0.2, feedback: "Spends almost everything on one event and identity, with no proof assets to convert the leads." },
      { text: "Brand platform and claims register; one cornerstone whitepaper; open-source capture reader with a 10-minute tutorial; two technical talks with hosted dinners; three posts a week from the founder; case-study clause in every pilot contract.", score: 1, feedback: "Builds proof, distribution and conversations at low CPQL, and sets up the late-stage evidence pilots will produce." },
      { text: "An agency retainer for paid ads targeting 'test automation'.", score: 0.1, feedback: "Wrong category keyword, low-intent traffic, and nothing that answers an engineer's question." },
      { text: "Nothing until pilot results exist.", score: 0.3, feedback: "Saves cash but delays the conversations that produce the pilots." },
    ],
    explanation: md`Before evidence exists, invest in rung 2 content (mechanisms), trusted distribution (open source, talks, founder posts) and the contractual groundwork for rung 3 and 4 proof.`,
    concepts: ["fc05.event-portfolio", "fc05.content-by-stage", "fc05.open-source-distribution", "fc05.proof-ladder"],
    difficulty: 3,
  },
  {
    id: "fc05-x7",
    type: "mcq",
    prompt: "Which statement sits highest on the proof ladder?",
    options: [
      "\"Ripple is the most advanced change-impact engine on the market.\"",
      "\"Ripple maps tests to firmware modules, models and rig parts and reruns only those whose dependencies changed.\"",
      "\"On 200 replayed changes from our own test history, Ripple's subset caught 38 of 40 regressions found by full reruns; method attached.\"",
      "\"A design partner's head of validation, quoted with permission, reports the results of an independently run comparison.\"",
    ],
    answer: 3,
    explanation: md`Claim, mechanism, own evidence, third-party validation. Note that the third option, while strong, is still self-reported.`,
    concepts: ["fc05.proof-ladder"],
    difficulty: 1,
  },
  {
    id: "fc05-x8",
    type: "multi",
    prompt: "Which actions build trust with engineer buyers? (Select all that apply.)",
    options: [
      "Docs that state limits and supported formats",
      "Founders answering GitHub issues within two working days",
      "Benchmarks that show only winning cases",
      "A stable, written line between open and paid features",
      "An automated message sequence that looks personal",
    ],
    answer: [0, 1, 3],
    explanation: md`Engineers trust inspectable honesty. Win-only benchmarks and fake-personal automation are recognised quickly and backfire.`,
    concepts: ["fc05.engineer-trust", "fc05.benchmark-integrity", "fc05.no-automation"],
    difficulty: 1,
  },
  {
    id: "fc05-x9",
    type: "order",
    prompt: "Put the steps of an embargoed announcement in order.",
    items: [
      "Written approval of text and timing from every named party",
      "Ask each journalist whether they accept the embargo",
      "Send the release marked with the embargo time and time zone",
      "Give briefings and interviews before the embargo lifts",
      "Publish on your own channels when the embargo lifts",
    ],
    explanation: md`Approval first, agreement before information, then briefings so stories are ready at the embargo time.`,
    concepts: ["fc05.embargo"],
    difficulty: 1,
  },
  {
    id: "fc05-x10",
    type: "mcq",
    prompt: "For an episode of The Majlis podcast with Kuwaiti founders, which register fits best?",
    options: [
      "Formal classical-style MSA throughout",
      "Gulf or Kuwaiti dialect, with English technical terms where guests use them",
      "English only",
      "A scripted MSA translation of English questions",
    ],
    answer: 1,
    explanation: md`Spoken, informal and community-facing: dialect signals authenticity and closeness. Formal MSA would sound stiff; the episode notes and website can be in light MSA.`,
    concepts: ["fc05.arabic-register"],
    difficulty: 1,
  },
  {
    id: "fc05-x11",
    type: "short",
    prompt: md`Write a six-month marketing plan on one page for **Afterwave** with a budget of EUR 30,000 and about 15 founder-days. Include: the core message (from a brand platform), three proof assets and their ladder rung, distribution (events, open source, LinkedIn), a measurement section with CPQL and attribution, and what you will not do. No invented results.`,
    rubric: [
      "Core message is a mechanism-level promise tied to change, capture or on-prem, not generic AI or test automation",
      "Proof assets are realistic before pilots (whitepaper, app note, open-source reader) with rungs stated, plus a plan for rung 3 and 4 via pilots and case-study clauses",
      "Distribution favours low-CPQL options (talks, pre-booked meetings, founder posts, open source) with a budget split that adds up",
      "Measurement uses qualified leads, CPQL with full cost including founder time, at least two attribution views and self-reported attribution",
      "States explicit exclusions (no automation, no booth without a demo, no unapproved customer names, no fake precision)",
    ],
    modelAnswer: md`**Message:** know which rig tests to rerun after a firmware, model or rig change, with rig and screen on one clock, running on your own servers.

**Proof assets:** (1) change-impact whitepaper (rung 2, EUR 4,000 plus expert interviews); (2) Lockstep synchronisation app note with a measured method on sample data (rung 3 on our own data, EUR 2,000); (3) open-source capture reader, Apache-2.0, 10-minute tutorial (trust signal, mostly engineering time). Every pilot contract carries a case-study clause and agreed metrics so rung 3 and 4 evidence follows.

**Distribution:** two technical talks with hosted dinners for 10 test leads each (about EUR 18,000), walking passes with pre-booked meetings at one robotics show (about EUR 3,500), three founder posts a week, monthly online test-engineering session. Reserve EUR 2,500 for design of the deck and site.

**Measurement:** qualified leads against written criteria; CPQL $= C/N_q$ with founder time at EUR 100/h; opportunities touched per asset under linear and U-shaped attribution; "how did you hear about us?" on every demo request; cost per qualified conversation for LinkedIn.

**Not doing:** no booth until the physical demo travels, no LinkedIn automation, no customer or partner named without written approval, no percentage claims without a published method.`,
    explanation: md`A strong plan is small, proof-first, measurable on qualified pipeline, and explicit about what it refuses to do.`,
    concepts: ["fc05.brand-platform", "fc05.proof-ladder", "fc05.event-portfolio", "fc05.attribution", "fc05.no-automation"],
    difficulty: 3,
  },
];

export default exam;
