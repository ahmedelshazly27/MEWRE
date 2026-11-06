import { md, type Question } from "../../schema";

const exam: Question[] = [
  {
    id: "sh06-x1",
    type: "numeric",
    prompt: md`A Gulf national champion announces approval for 50,000 GPUs and a 300 MW first phase (facility power). At 1.7 kW per GPU and PUE 1.25, what share of the 300 MW would the 50,000 GPUs use, in percent?`,
    answer: 35.4,
    tolerance: { abs: 0.3 },
    unit: "%",
    explanation: md`$50{,}000\times1.25\times1.7 = 106{,}250$ kW $= 106.25$ MW. $106.25/300 = 35.4\%$. The chips fill about a third of the first phase: either more chips are coming, or the 300 MW includes non-AI load or later expansion. Record both numbers with their dates.`,
    concepts: ["sh06.facility-power", "sh06.announcement-status"],
    difficulty: 2,
  },
  {
    id: "sh06-x2",
    type: "numeric",
    prompt: md`From MAGNiTT: H1 2026 USD 1,350 m across 214 deals; funding -22% and deals -41% year on year. By what percentage did the average ticket change from H1 2025 to H1 2026?`,
    answer: 32.2,
    tolerance: { abs: 0.5 },
    unit: "%",
    explanation: md`H1 2025: $1{,}350/0.78 = 1{,}730.8$ m across $214/0.59 = 362.7$ deals, average 4.77 m. H1 2026: $1{,}350/214 = 6.31$ m. Change: $6.31/4.77 - 1 = +32.2\%$. Equivalently $0.78/0.59 - 1 = 0.322$. Fewer, larger rounds.`,
    concepts: ["sh06.funding-concentration", "sh06.implied-base"],
    difficulty: 2,
  },
  {
    id: "sh06-x3",
    type: "decision",
    prompt: md`Suhail's research arm has volunteer researchers and a small compute grant (illustrative). What should its first public project be?`,
    options: [
      { text: "Pretrain a new 7B Arabic model from scratch to compete with ALLaM-7B and Falcon-H1 Arabic.", score: 0.1, feedback: "A six-figure USD final run before data and team (Lesson 2), into a space with state-backed models. Low gap score." },
      { text: "Build an open dialect evaluation set with hackathon participants, contribute items to existing benchmarks (OALL, BALSAM) and publish independent model reviews.", score: 1, feedback: "Fills the applied-evaluation and open-data gaps, uses Suhail's community as an advantage, and complements the national labs." },
      { text: "Launch a rival Arabic leaderboard with public test sets.", score: 0.3, feedback: "Duplicates OALL and repeats the contamination problem that BALSAM and ABBL were built to address." },
    ],
    explanation: md`Integrates the model landscape (L2), the open-data gap (L2, L5) and the gap score (L5).`,
    concepts: ["sh06.gap-score", "sh06.complement-not-compete", "sh06.contamination"],
    difficulty: 2,
  },
  {
    id: "sh06-x4",
    type: "multi",
    prompt: "Which of these statements could Suhail publish as verified (issuer or provider's own record) according to the course research? (Select all that apply.)",
    options: [
      "Jais 2 was released on 9 December 2025 with open weights",
      "Stargate UAE's first 200 MW is operating",
      "MAGNiTT counted USD 1.35 bn across 214 deals in H1 2026",
      "ALLaM 34B weights are not public",
      "Qai and Brookfield formed a USD 20 bn AI-infrastructure joint venture on 9 December 2025",
      "Arab tech emigration doubled since 2020",
    ],
    answer: [0, 2, 4],
    explanation: md`Jais 2 (MBZUAI), MAGNiTT's own report and the QIA newsroom are primary records. Stargate's operating status and ALLaM 34B's weights are unverified; no emigration data was found.`,
    concepts: ["sh06.claim-check", "sh06.source-tiers"],
    difficulty: 2,
  },
  {
    id: "sh06-x5",
    type: "numeric",
    prompt: md`A 3B Arabic model is trained on 2T tokens. With $C \approx 6ND$, an H100-class GPU at $9.9\times10^{14}$ FLOP/s and 40% MFU, how many GPU-hours (thousands)?`,
    answer: 25.3,
    tolerance: { abs: 0.3 },
    unit: "thousand GPU-h",
    explanation: md`$C = 6\times3\times10^{9}\times2\times10^{12} = 3.6\times10^{22}$ FLOP. Per GPU-hour: $9.9\times10^{14}\times0.4\times3600 = 1.426\times10^{18}$ FLOP. $H = 3.6\times10^{22}/1.426\times10^{18} = 25{,}250$, about 25.3 thousand. At USD 2 per GPU-hour about USD 50k for the final run.`,
    concepts: ["sh06.training-compute"],
    difficulty: 2,
  },
  {
    id: "sh06-x6",
    type: "mcq",
    prompt: "Fanar Prime is built on Gemma-2, and a card for a related model is reported as Apache-2.0. A startup wants to ship a product on it. What is the correct advice?",
    options: [
      "Apache-2.0 means no further checks are needed",
      "Read the current model card and licence, and check Gemma's terms, which flow to derivatives; record the date checked",
      "Gemma-based models cannot be used commercially at all",
      "Ask the hackathon organiser for permission",
    ],
    answer: 1,
    explanation: md`Licence inheritance: the base model's terms apply to derivatives. The Fanar licence itself is unverified in the research.`,
    concepts: ["sh06.licence-inheritance"],
    difficulty: 2,
  },
  {
    id: "sh06-x7",
    type: "numeric",
    prompt: md`MAGNiTT FY2025: KSA USD 1.72 bn of a USD 3.8 bn MENA total; H1 2026: KSA USD 219 m of USD 1.35 bn. By how many percentage points did Saudi Arabia's share fall?`,
    answer: 29.1,
    tolerance: { abs: 0.3 },
    unit: "pp",
    explanation: md`FY2025: $1.72/3.8 = 45.3\%$. H1 2026: $0.219/1.35 = 16.2\%$. Fall: $45.3 - 16.2 = 29.1$ points. (MAGNiTT says KSA "led the Middle East" in 2025; check whether its MENA total includes North Africa when comparing.)`,
    concepts: ["sh06.provider-methodology", "sh06.funding-concentration"],
    difficulty: 2,
  },
  {
    id: "sh06-x8",
    type: "order",
    prompt: "Order the status of an infrastructure claim from earliest to latest.",
    items: ["Announced (plan or MoU)", "Financed", "Under construction", "Operating"],
    explanation: md`The landscape map records which of these a claim has reached and when it was last confirmed.`,
    concepts: ["sh06.announcement-status"],
    difficulty: 1,
  },
  {
    id: "sh06-x9",
    type: "decision",
    prompt: md`A VC sponsor asks Suhail to put "MENA AI funding is booming: USD 7.5 bn and half of it AI" on the Suhail Season investor-track page. What do you do?`,
    options: [
      { text: "Publish it; it helps the sponsor and the event.", score: 0, feedback: "Mixes Wamda's FY2025 total with MAGNiTT's H1 2026 AI share and contradicts the H1 2026 fall." },
      { text: "Offer an accurate line instead: 'AI took about half of MENA venture funding in H1 2026 (USD 678 m, MAGNiTT), even as total funding fell 22% and deals 41%.'", score: 1, feedback: "True, sourced and still a strong message for an AI investor track." },
      { text: "Publish it with a footnote 'sources: MAGNiTT, Wamda'.", score: 0.2, feedback: "A footnote does not fix a sentence that combines incompatible numbers." },
    ],
    explanation: md`One provider and one period per claim; the accurate version is also the more interesting one.`,
    concepts: ["sh06.provider-methodology", "sh06.ai-funding-share"],
    difficulty: 1,
  },
  {
    id: "sh06-x10",
    type: "numeric",
    prompt: md`Score an offering: "Arabic-English bilingual technical explainer videos". Importance 3, coverage 0.5, Suhail advantage 4. What is $G$, and is it above the cash-accelerator score of 2.4 from Lesson 5?`,
    answer: 6,
    tolerance: { abs: 0.05 },
    explanation: md`$G = 3\times0.5\times4 = 6.0$, well above 2.4 but below the core offerings (11 to 14). A reasonable add-on to the media line, not a priority.`,
    concepts: ["sh06.gap-score"],
    difficulty: 1,
  },
  {
    id: "sh06-x11",
    type: "short",
    prompt: md`A European AI infrastructure company (hypothetical) asks Suhail: "We want to engage Arab builders in 2027. Where should we put our money, and why you?" Write a 300-word answer that uses this module: the sovereign-AI landscape and its status, the open models builders actually use, the funding picture, the talent geography and Suhail's position. Every external fact dated and sourced; no invented Suhail traction.`,
    rubric: [
      "Uses the sovereign AI landscape accurately with status labels (announced vs operating) and dates",
      "Names open models builders can use and notes licence checks",
      "Uses one provider per funding claim and draws the concentration implication",
      "Uses the talent geography to argue for cross-border, multi-city engagement",
      "Positions Suhail on its real gaps (neutral, cross-border, Arabic-first, diaspora) and says what it will not do",
      "No invented members, sponsors, numbers or partnerships for Suhail; illustrative items labelled",
    ],
    modelAnswer: md`**Where to engage Arab builders in 2027**

**The infrastructure is state-led and mostly still being built.** Saudi Arabia (HUMAIN, PIF-owned) and the UAE (G42 and Khazna, MGX) dominate. Stargate UAE's first 200 MW was due in Q3 2026 and was still listed as under construction in July 2026 (Epoch AI); HUMAIN's first sites were targeted for Q2 2026 with no confirmed go-live. National champions will compete with you for developers, but they serve their own countries.

**Builders build on open weights.** Jais 2 (70B, Dec 2025), Falcon-H1 Arabic (3B to 34B, Jan 2026, Falcon LLM License), K2 Think (fully open) and Fanar are what hackathon teams will use; dialect performance and licences need checking, which is where independent evaluation helps.

**Money is concentrated.** MAGNiTT counted USD 1.35 bn across 214 deals in H1 2026 (funding -22%, deals -41%), with AI about half and the UAE 66%. Large AI rounds exist; early teams outside the UAE have few doors.

**Talent is spread out.** Egypt alone exported about USD 5.2 bn of IT services in 2025 (Zawya). The Levant, the Maghreb and the diaspora add more. A Dubai-only programme misses most builders.

**Where to put money.** Cross-border hackathon tracks with credits on your stack, in at least two cities plus online; consent-based access to finalists; an evaluation challenge on Arabic dialect tasks.

**Why Suhail.** Suhail is planned as a neutral, cross-border, Arabic-first builder community: hackathons, Suhail Season, a newsletter and The Majlis podcast, with a research arm for open data and evaluation. It does not sell compute, train frontier models or invest, so it does not compete with you or with national programmes. It launches in 2027; first-season targets would be agreed with you.`,
    explanation: md`Integrates all six lessons; graders check dated facts, status labels, provider discipline and honest positioning.`,
    concepts: ["sh06.national-entities", "sh06.funding-concentration", "sh06.talent-geography", "sh06.neutral-convenor"],
    difficulty: 3,
  },
];

export default exam;
