import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh06-l01",
  title: "Gulf sovereign AI: strategies, compute build-outs and the entities behind them",
  summary:
    "Why Gulf states treat AI as national infrastructure, how the stack fits together (power, data centres, chips, models, applications), who the main entities are in Saudi Arabia, the UAE, Qatar and Kuwait as of November 2026, and how to turn a megawatt announcement into a chip count so you can tell what is announced from what is running.",
  minutes: 75,
  objectives: [
    "Explain the four motives behind Gulf sovereign AI and the layers of the AI stack each state is building",
    "Name the main entities in Saudi Arabia, the UAE, Qatar and Kuwait and what each does, with dated facts",
    "Convert announced data-centre megawatts into an approximate accelerator count and back",
    "Separate announced, under-construction and operating capacity, and label each claim with its status and source",
    "Write a dated, sourced sovereign-AI briefing for Suhail's audience or sponsors",
  ],
  concepts: [
    { id: "sh06.sovereign-ai", name: "Sovereign AI", description: "A state's effort to control the AI capabilities it depends on: compute on its own soil, models in its language and values, data kept in-country, and the capital to own stakes in the global AI supply chain.", competency: "sh-landscape", related: ["sh06.ai-stack", "sh06.national-entities"] },
    { id: "sh06.ai-stack", name: "The AI stack", description: "The layers from energy and land, through data centres and accelerators, to foundation models, platforms and applications. Gulf states invest at every layer but with different weight: capital and power are their advantages, chips and frontier research are bought or partnered.", competency: "sh-landscape", related: ["sh06.sovereign-ai", "sh06.facility-power"] },
    { id: "sh06.national-entities", name: "National AI entities", description: "The organisations that carry each state's AI strategy: regulators and data authorities (SDAIA), state-owned champions (HUMAIN, G42, Qai), investment vehicles (MGX, PIF, QIA), research institutes (MBZUAI, TII, QCRI).", competency: "sh-landscape", related: ["sh06.sovereign-ai"] },
    { id: "sh06.facility-power", name: "Facility power to accelerator count", description: "Announced megawatts become a chip count through PUE and per-accelerator power: N is about P divided by PUE times p. It lets you check whether a chip order and a power figure describe the same project.", competency: "sh-landscape", related: ["sh06.ai-stack", "sh06.announcement-status"] },
    { id: "sh06.announcement-status", name: "Announced vs operating", description: "Every infrastructure claim has a status: announced (MoU or plan), financed, under construction, operating. Gulf AI news is dominated by announcements; a landscape map must record the status and the date it was last confirmed.", competency: "sh-landscape", related: ["sh06.facility-power", "fc10.claim-ledger"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Why the Gulf builds sovereign AI, and who builds it",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Suhail sits in the middle of the largest state-led AI build-out outside the US and China. The entities in this lesson are the likely sources of compute credits, sponsorship, research partnerships and jobs for Suhail's builders, and also the organisations whose press releases your newsletter will be tempted to repeat. If you know who does what, and can tell a 200 MW plan from a running cluster, you will pitch the right partner for the right thing and keep Suhail's editorial credibility.`,
        },
        {
          kind: "md",
          md: md`### What "sovereign AI" means in the Gulf

Sovereign AI is a state's attempt to control the AI capabilities it depends on. In the Gulf four motives overlap:

1. **Economic diversification.** Saudi Vision 2030 and the UAE's national AI strategy (the UAE appointed the world's first minister of state for AI in 2017) treat AI as a post-oil industry. Cheap energy, land and capital become data centres and stakes in AI companies.
2. **Control of data and services.** Government and regulated data should be processed in-country. HUMAIN Chat, for example, launched in August 2025 hosted end-to-end inside the Kingdom.
3. **Language and culture.** Models trained mainly on English web data handle Arabic, its dialects and local context worse. National labs build Arabic-first models (ALLaM, Jais, Falcon Arabic, Fanar).
4. **Geopolitical position.** Owning capacity and investment vehicles (MGX, PIF, QIA) buys a seat with the US chip and model companies, which in turn need export approvals, power and capital.

### The stack, layer by layer

Each layer has a different scarcity and a different set of players. Gulf states are strongest at the bottom (power, land, capital) and buy or partner for the middle (chips, frontier models).`,
        },
        {
          kind: "flow",
          title: "The sovereign AI stack",
          steps: [
            { label: "Energy and land", detail: "Gas and solar power, grid connections, sites. Gulf advantage." },
            { label: "Data centres", detail: "Shells, cooling, power distribution: Khazna (G42), HUMAIN sites, hyperscaler regions." },
            { label: "Accelerators", detail: "Nvidia, AMD chips under US export approvals; the binding constraint." },
            { label: "Foundation models", detail: "ALLaM, Jais 2, Falcon-H1 Arabic, K2 Think, Fanar." },
            { label: "Platforms and apps", detail: "HUMAIN Chat, government services, enterprise copilots, startups." },
          ],
          caption: "Capital flows down the stack (sovereign funds pay for all layers); dependency flows up (no chips, no models). Builders, Suhail's audience, live mostly in the top layer.",
        },
        {
          kind: "md",
          md: md`### Who is who (as recorded in the course research, November 2026)

**Saudi Arabia**

| Entity | What it is | Dated facts |
|---|---|---|
| **SDAIA** (Saudi Data and AI Authority) | Data and AI regulator and national programme owner | Put **ALLaM-7B-Instruct-preview** on Hugging Face, pretrained on 5.2T English and Arabic tokens (Asharq Al-Awsat, 2025). Co-built the **BALSAM** Arabic benchmark (78 tasks, arXiv, Jul 2025). |
| **HUMAIN** (owned by PIF) | National AI champion: data centres, models, apps | HUMAIN Chat launched Aug 2025 on **ALLaM 34B**, which HUMAIN says it built from scratch, taking over the ALLaM brand from SDAIA (Middle East AI News, Aug 2025). Riyadh and Dammam data centres broke ground with first go-live targeted for Q2 2026 (DCD, 2025). Approval to import 18,000 Nvidia Blackwell chips (CairoScene, 2025). Jan 2026: plan for about 6 GW, USD 1.2 bn National Infrastructure Fund financing for 250 MW, "Humain 1" OS; partnerships with AWS (USD 5 bn AI Zone), STC (1 GW JV), xAI (500 MW), AMD (USD 10 bn for 500 MW over 5 years) (folio3 summary, 26 Jan 2026). Together AI and HUMAIN: 250 MW data centre (Mubasher, about 31 Aug 2026). |

**United Arab Emirates**

| Entity | What it is | Dated facts |
|---|---|---|
| **G42** and **Khazna** | Abu Dhabi AI group; Khazna is its data-centre arm | Khazna builds **Stargate UAE**: 1 GW cluster announced May 2025 with OpenAI, Oracle, Nvidia (GB300), Cisco and SoftBank (Tom's Hardware, May 2025). First 200 MW said to be ready in Q3 2026 (The National, 5 Dec 2025); Epoch AI (3 Jul 2026) still listed it as under construction, estimating 200 MW by Dec 2026. |
| **MGX** (owned by Mubadala and G42) | AI investment vehicle | Fund I closed at about USD 49 bn against a USD 45 bn target (AGBI, Jul 2026; Semafor, 23 Jun 2026, reported USD 50 bn). Portfolio includes OpenAI, SpaceX, Khazna, Vantage. |
| **Inception** (G42), **MBZUAI**, Cerebras | Model builders | **Jais 2**, released 9 Dec 2025: 70B, open weights, about 600B Arabic tokens, trained and served on Cerebras (MBZUAI). **K2 Think** (MBZUAI and G42), Sep 2025: 32B, fully open; 70B second edition Jan 2026. |
| **TII** (Technology Innovation Institute) | Abu Dhabi government research centre | **Falcon Arabic** (May 2025, on Falcon 3-7B); **Falcon-H1 Arabic** (5 Jan 2026: 3B, 7B, 34B, hybrid Mamba-Transformer). |

**Qatar**: **Qai**, a national AI company under QIA, launched Dec 2025 and on 9 Dec 2025 formed a **USD 20 bn** AI-infrastructure joint venture with Brookfield (QIA newsroom). **QCRI** (at HBKU) runs **Fanar**: Fanar Star (7B, from scratch) and Fanar Prime (9B, built on Gemma-2), launched late 2024.

**Kuwait**: Microsoft and the Government of Kuwait announced an "AI-powered" Azure region, an AI data centre and an innovation hub on 6 Mar 2025 (DCD). Google announced a Kuwait cloud region in Jan 2023; no status update was found. The research found no notable Kuwaiti national open-weight model.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Status not confirmed as of November 2026",
          md: md`- **Stargate UAE first 200 MW:** due Q3 2026 per an official in Dec 2025; Epoch AI still showed it under construction in Jul 2026. Whether it is operating now is unverified.
- **HUMAIN Riyadh and Dammam data centres:** go-live was targeted for Q2 2026; no confirmation found.
- **HUMAIN's January 2026 partnership figures** (6 GW, AWS, STC, xAI, AMD) come from one secondary summary, not HUMAIN's own release.
- **ALLaM 34B weights** appear not to be public (one aggregator only).
- **MGX total AUM above USD 100 bn** and a reported **KIA, Microsoft and BlackRock USD 30 bn vehicle** each rest on a single weak source.
- **Kuwait's national AI strategy:** not covered by the research; check with CITRA and the Council of Ministers before stating anything.`,
        },
        {
          kind: "chart",
          chart: "bar",
          title: "Announced AI data-centre capacity by project (MW, as reported, not operating)",
          xKey: "project",
          xLabel: "Project (announcement date)",
          yLabel: "MW announced",
          series: [{ key: "mw", label: "Announced MW" }],
          data: [
            { project: "Stargate UAE (May 2025)", mw: 1000 },
            { project: "HUMAIN and STC JV (Jan 2026)", mw: 1000 },
            { project: "HUMAIN and xAI (Jan 2026)", mw: 500 },
            { project: "HUMAIN and AMD (Jan 2026)", mw: 500 },
            { project: "HUMAIN, NIF-financed (Jan 2026)", mw: 250 },
            { project: "HUMAIN and Together AI (Aug 2026)", mw: 250 },
          ],
          caption: "Sources: Tom's Hardware (May 2025), folio3 summary (26 Jan 2026), Mubasher (Aug 2026). HUMAIN's overall plan of about 6 GW is not shown; the projects may overlap with it. None of these is confirmed as operating in the course sources as of November 2026. Only Stargate UAE has a dated first phase (200 MW).",
        },
        {
          kind: "md",
          md: md`### Turning megawatts into chips

Infrastructure is announced in megawatts; capability is measured in accelerators. The link is the power each accelerator draws and the facility overhead:`,
        },
        { kind: "equation", formula: "sh06-facility-gpus" },
        {
          kind: "md",
          md: md`Two assumptions drive the answer, and both should be stated whenever you use it:

- **Per-accelerator power $p_g$.** A Blackwell-class rack of 72 GPUs with its CPUs and switches draws on the order of 120 kW, so about 1.7 kW per GPU at rack level. Older H100 systems are lower per GPU; future generations higher.
- **What the MW figure means.** Some announcements quote IT load (power delivered to servers), others total facility power or grid capacity. PUE (power usage effectiveness) converts between them; modern liquid-cooled sites aim for roughly 1.1 to 1.4, and hot climates push towards the upper end.

The arithmetic is approximate by design. Its value is consistency checking: if a chip order and a power figure for the same project differ by a factor of ten, one of them refers to something else (a first phase, a different site, a long-term plan).`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Per-GPU power and PUE are assumptions",
          md: md`The 1.7 kW per GPU and PUE 1.25 used in this lesson are illustrative engineering values, not figures from any Gulf project. Vendors publish rack power for specific configurations; operators rarely publish PUE. Use them for order-of-magnitude checks only and say so.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Checking announcements with power arithmetic",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "How many accelerators is Stargate UAE's first phase?",
          given: md`Stargate UAE's first phase is reported as **200 MW** (The National, 5 Dec 2025). Illustrative assumptions: $p_g = 1.7$ kW per GPU at rack level, PUE 1.25. The announcement does not say whether 200 MW is IT load or facility power, so compute both.`,
          steps: [
            { md: md`**If 200 MW is facility power:** $N = 200{,}000 / (1.25\times1.7) = 200{,}000/2.125 \approx 94{,}000$ GPUs.` },
            { md: md`**If 200 MW is IT load:** drop the PUE term: $N = 200{,}000/1.7 \approx 118{,}000$ GPUs.` },
            { md: md`**Full 1 GW at facility power:** $1{,}000{,}000/2.125 \approx 470{,}000$ GPUs. The range for the first phase is therefore roughly 90,000 to 120,000 GPUs, and the full cluster about five times that.` },
            { md: md`**What to write:** "Stargate UAE's first phase is 200 MW, enough for on the order of 100,000 current-generation GPUs (our estimate). It was due in Q3 2026 (The National, Dec 2025); as of [date] we could not confirm it is operating."` },
          ],
          result: md`A single power figure becomes a capability estimate with its assumptions stated, a status and a date. That is the standard for every infrastructure line in a Suhail newsletter or sponsor deck.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Do 18,000 chips fill a 6 GW plan?",
          given: md`HUMAIN received approval to import **18,000** Nvidia Blackwell chips (CairoScene, 2025) and in January 2026 described a plan for about **6 GW** (folio3 summary). Same assumptions: 1.7 kW per GPU, PUE 1.25.`,
          steps: [
            { md: md`Facility power for 18,000 GPUs: $P = N\cdot\mathrm{PUE}\cdot p_g = 18{,}000\times1.25\times1.7$ kW.` },
            { md: md`$= 38{,}250$ kW, about 38 MW.`, hidden: true, check: { prompt: "Facility power for 18,000 GPUs (MW)", answer: 38.25, unit: "MW", tolerance: { abs: 0.5 } } },
            { md: md`Share of the 6 GW plan: $38.25/6{,}000$.` },
            { md: md`$\approx 0.64\%$: the first chip approval covers well under 1% of the stated plan.`, hidden: true, check: { prompt: "Share of 6 GW (percent)", answer: 0.64, unit: "%", tolerance: { abs: 0.03 } } },
            { md: md`GPUs a full 6 GW would need: $6{,}000{,}000/2.125$.` },
            { md: md`$\approx 2.8$ million GPUs, far beyond any single approval reported so far.`, hidden: true, check: { prompt: "GPUs for 6 GW (millions)", answer: 2.82, unit: "million", tolerance: { abs: 0.05 } } },
          ],
          result: md`The chip approval matches a first data centre of a few tens of MW, not the 6 GW plan. Both figures can be true at once: one is a first step, the other a long-term ambition. A good landscape entry records both with their dates and makes the gap visible instead of merging them into "HUMAIN is building 6 GW of AI compute".`,
        },
        {
          kind: "question",
          question: {
            id: "sh06-l01-p1",
            type: "numeric",
            prompt: md`The HUMAIN and xAI partnership is reported as **500 MW** (folio3 summary, Jan 2026). Assuming it is facility power, PUE 1.25 and 1.7 kW per GPU, about how many GPUs could it run? Answer in thousands.`,
            answer: 235,
            tolerance: { abs: 3 },
            unit: "thousand GPUs",
            explanation: md`$N = 500{,}000/(1.25\times1.7) = 500{,}000/2.125 = 235{,}294$, about 235 thousand. If the 500 MW is IT load, about 294 thousand. State which you assumed.`,
            concepts: ["sh06.facility-power"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Using the sovereign AI map as Suhail",
      blocks: [
        {
          kind: "md",
          md: md`### What each entity type can offer Suhail, and what it wants back

Nothing below is an existing relationship: these are categories to research and approach.

| Entity type | Examples | What it can offer builders | What it usually wants |
|---|---|---|---|
| National champion with compute | HUMAIN, G42 and Khazna, Qai | Compute credits, API access, hiring, prize sponsorship | Developers on its platform, local talent pipeline, visibility at home |
| Research institute or university | MBZUAI, TII, QCRI, KAUST | Models to build on, mentors, judges, research collaboration, students | Adoption and citations of its models, recruiting students, Arabic data |
| Regulator or data authority | SDAIA, national digital agencies | Benchmarks (BALSAM), datasets, endorsement, government challenges | National-priority use cases, compliance with its rules |
| Investment vehicle | MGX, PIF, QIA and their funds | Rarely early-stage cheques; access to portfolio companies | Deal flow at scale; usually not a fit for a pre-seed community |
| Hyperscaler with a Gulf region | Microsoft (Kuwait region announced), AWS, Oracle | Credits, cloud regions with in-country data residency | Startups adopting its cloud early |

### How the field goes wrong

- **Repeating the press release.** "World's largest", "first", "live" are claims. Check them against a second source and a status.
- **Confusing the model with the product.** HUMAIN Chat is an app; ALLaM 34B is the model behind it; ALLaM-7B on Hugging Face is a different, smaller model.
- **Assuming openness.** "Open" in a launch release may mean open weights under a custom licence, open weights for research only, or a model you can only use through a chat app (Lesson 2).
- **Treating the Gulf as one market.** Saudi and Emirati programmes compete for the same chips, talent and headlines. A sponsor deck that thanks one national champion on the same slide as its rival needs care.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Neutrality is an asset you can lose in one newsletter",
          md: md`Suhail's value to builders depends on being seen as a regional, independent convenor. Publishing an unchecked superlative from one state's champion, or a sponsor's capacity number without its status, makes Suhail look like a channel for state PR. Label every infrastructure claim as announced, under construction or operating, with the date you checked.`,
        },
        {
          kind: "checklist",
          title: "Reading a sovereign-AI announcement",
          items: [
            "Who announced it, and is this the issuer's own release or a press summary?",
            "Status: MoU, plan, financed, under construction, operating? On what date?",
            "Units: MW of IT load or facility power? Chips approved, ordered or installed?",
            "Is this a first phase of a larger number? Write both.",
            "Does the chip count match the power figure within a factor of about two (sh06-facility-gpus)?",
            "Who owns it, who operates it, who can actually use it (government only, enterprise, startups)?",
            "Is there a second independent source (Epoch AI directory, DCD, a regulator filing)?",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask a national AI entity before proposing a partnership",
          items: [
            "Which of your platforms or models can external builders use today, and under what terms?",
            "Do you run a startup or developer credit programme, and who decides allocations?",
            "What outcomes would make a hackathon on your stack a success for you: sign-ups, active developers, hires?",
            "Can builders outside your country participate and use the credits?",
            "Which data or models can participants publish openly after the event?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "sh06-l01-p2",
            type: "short",
            prompt: md`Write the "Gulf sovereign AI in one page" briefing that Suhail would send to a prospective sponsor or publish as a newsletter explainer. Cover Saudi Arabia, the UAE, Qatar and Kuwait. For each: the main entities, one model and one compute fact with date and source, and the status of each infrastructure claim. End with three ways builders can actually use what these entities offer, phrased as things to verify, not as existing partnerships.`,
            rubric: [
              "Covers all four countries with the correct entities (SDAIA, HUMAIN; G42/Khazna, MGX, MBZUAI, TII; Qai, QCRI; Microsoft region in Kuwait)",
              "Every number carries a date and a named source, matching the course research",
              "Labels infrastructure claims as announced, under construction or operating, and flags unconfirmed status (Stargate UAE, HUMAIN sites)",
              "Distinguishes models from products and does not overstate openness",
              "Contains no invented partnerships, members or numbers for Suhail",
              "The builder-facing section is concrete (credits, open weights, benchmarks, hiring) and framed as items to verify",
            ],
            modelAnswer: md`**Gulf sovereign AI, November 2026 (Suhail explainer)**

**Saudi Arabia.** SDAIA regulates data and AI and co-built BALSAM, an Arabic benchmark with blind test sets (arXiv, Jul 2025). HUMAIN, owned by PIF, runs HUMAIN Chat on ALLaM 34B (launched Aug 2025; weights reportedly not public). SDAIA's smaller ALLaM-7B-Instruct-preview is on Hugging Face (5.2T tokens). Compute: approval to import 18,000 Nvidia Blackwell chips (2025), roughly 38 MW of load by our estimate; Riyadh and Dammam sites targeted Q2 2026, **not confirmed operating**. A plan for about 6 GW and several partner projects were reported in Jan 2026 (secondary summary): **announced**.

**UAE.** G42's Khazna builds Stargate UAE: 1 GW announced May 2025 with OpenAI, Oracle, Nvidia, Cisco, SoftBank; first 200 MW due Q3 2026 (The National, Dec 2025), under construction per Epoch AI (Jul 2026): **operating status unverified**. MGX closed Fund I at about USD 49 bn (AGBI, Jul 2026). Models: Jais 2 (9 Dec 2025, 70B, open weights), K2 Think (Sep 2025, 32B, fully open), TII's Falcon-H1 Arabic (Jan 2026, 3B to 34B, Falcon LLM License).

**Qatar.** Qai (QIA) formed a USD 20 bn AI-infrastructure JV with Brookfield on 9 Dec 2025: **announced**. QCRI's Fanar family includes Fanar-1-9B on Hugging Face (about 1T tokens, 410B Arabic).

**Kuwait.** Microsoft and the government announced an AI-enabled Azure region, data centre and innovation hub (6 Mar 2025): **announced**, no go-live found. No national open-weight model found.

**What builders can use (to verify for each):** (1) open-weight Arabic models they can fine-tune today: Jais 2, Falcon-H1 Arabic, K2 Think, Fanar, ALLaM-7B; check each licence; (2) public Arabic benchmarks to test their products on (OALL v2, BALSAM); (3) developer credit programmes from national champions and hyperscalers with Gulf regions: ask who is eligible across borders.`,
            explanation: md`The grader looks for dated, sourced, status-labelled facts across four countries, a clean model versus product distinction, and builder-useful items framed as things to check.`,
            concepts: ["sh06.national-entities", "sh06.announcement-status", "sh06.facility-power"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a European sponsor in under a minute why Gulf states build their own AI, and why a 1 GW announcement is not the same as 1 GW of running compute.",
          keyPoints: [
            "Four motives: diversification, data control and residency, Arabic language and culture, geopolitical position through capital and energy",
            "Gulf advantage is power, land and capital; chips and frontier research are bought or partnered",
            "Announcements move through plan, financing, construction and operation; most headline numbers are plans or first phases",
            "Megawatts convert to accelerators via PUE and per-GPU power; 200 MW is on the order of 100,000 GPUs",
            "Status must be dated and sourced, for example Stargate UAE's first 200 MW was due Q3 2026 and is not confirmed operating",
          ],
        },
        { kind: "xref", to: "fc07-l03", note: "The Gulf capital map (state funds of funds, sovereign-linked investors, Hub71) from the fundraising side; this lesson covers the AI infrastructure side of the same entities." },
        { kind: "sources", refs: ["sh06-r1", "sh06-r2", "sh06-r3", "sh06-r4", "sh06-r6", "sh06-r8", "sh06-r9", "sh06-r10", "sh06-r11", "sh06-r13", "sh06-r16", "sh06-r18", "sh06-r21"] },
      ],
    },
  ],
  quiz: [
    {
      id: "sh06-l01-q1",
      type: "mcq",
      prompt: "Which model powers HUMAIN Chat at its August 2025 launch, according to the course research?",
      options: ["Jais 2 (70B)", "ALLaM 34B", "ALLaM-7B-Instruct-preview", "Falcon-H1 Arabic 34B"],
      answer: 1,
      explanation: md`HUMAIN Chat launched on ALLaM 34B, which HUMAIN says it built from scratch. ALLaM-7B-Instruct-preview is SDAIA's smaller model on Hugging Face; Jais 2 is from Inception, MBZUAI and Cerebras in the UAE.`,
      concepts: ["sh06.national-entities"],
      difficulty: 1,
    },
    {
      id: "sh06-l01-q2",
      type: "numeric",
      prompt: md`A Gulf project announces **250 MW**. Assume facility power, PUE 1.25, 1.7 kW per GPU. Roughly how many GPUs (thousands)?`,
      answer: 118,
      tolerance: { abs: 2 },
      unit: "thousand GPUs",
      explanation: md`$250{,}000/2.125 = 117{,}647$, about 118 thousand GPUs.`,
      concepts: ["sh06.facility-power"],
      difficulty: 1,
    },
    {
      id: "sh06-l01-q3",
      type: "multi",
      prompt: "Which claims were NOT confirmed in the course sources as of November 2026? (Select all that apply.)",
      options: [
        "Stargate UAE's first 200 MW is operating",
        "Jais 2 was released with open weights on 9 December 2025",
        "HUMAIN's Riyadh and Dammam data centres are live",
        "ALLaM 34B weights are publicly downloadable",
        "Qai and Brookfield formed a USD 20 bn AI-infrastructure joint venture",
      ],
      answer: [0, 2, 3],
      explanation: md`Stargate's first phase and HUMAIN's two sites have targets but no confirmed go-live; ALLaM 34B weights appear not to be public (and even that is single-source). Jais 2's release and the Qai and Brookfield JV are documented by the issuers (MBZUAI; QIA newsroom).`,
      concepts: ["sh06.announcement-status"],
      difficulty: 2,
    },
    {
      id: "sh06-l01-q4",
      type: "order",
      prompt: "Order the sovereign AI stack from the physical base to the user.",
      items: ["Energy and land", "Data centres", "Accelerators", "Foundation models", "Platforms and applications"],
      explanation: md`Power and sites host data centres, which house accelerators, which train and serve models, which power apps. Gulf strength is at the base; the binding constraint is usually accelerators.`,
      concepts: ["sh06.ai-stack"],
      difficulty: 1,
    },
    {
      id: "sh06-l01-q5",
      type: "mcq",
      prompt: "What is MGX?",
      options: [
        "A Saudi data and AI regulator",
        "An Abu Dhabi AI investment vehicle owned by Mubadala and G42, whose Fund I closed at about USD 49 bn",
        "Qatar's national AI company under QIA",
        "TII's Arabic model family",
      ],
      answer: 1,
      explanation: md`MGX is the UAE investment vehicle (AGBI, Jul 2026: about USD 49 bn; Semafor reported USD 50 bn). Qai is Qatar's; SDAIA is the Saudi authority; Falcon is TII's model family.`,
      concepts: ["sh06.national-entities"],
      difficulty: 1,
    },
    {
      id: "sh06-l01-q6",
      type: "decision",
      prompt: md`A sponsor's press office sends Suhail a draft newsletter line: "Our 1 GW AI campus is now powering the region's builders." Your check finds a 1 GW announcement from last year and a first 200 MW phase with no confirmed go-live. What do you publish?`,
      options: [
        { text: "Publish as written: they are paying for the slot.", score: 0, feedback: "You would publish an unverified operating claim under Suhail's name; builders who cannot get access will notice." },
        { text: "Publish: 'announced a 1 GW campus (date); the first 200 MW phase is targeted for [date]', marked as sponsored, and offer to update when it is operating.", score: 1, feedback: "Accurate status, dated, clearly labelled as sponsored, and keeps the relationship." },
        { text: "Refuse to mention the campus at all.", score: 0.3, feedback: "Safe but unnecessary; the accurate version serves the sponsor and the reader." },
      ],
      explanation: md`Status labels (announced, under construction, operating) with dates protect editorial credibility without losing the sponsor.`,
      concepts: ["sh06.announcement-status"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "sh06-l01-f1", front: "Four motives for Gulf sovereign AI", back: "Economic diversification, control of data and services, Arabic language and culture, geopolitical position through capital and energy.", concepts: ["sh06.sovereign-ai"] },
    { id: "sh06-l01-f2", front: "Accelerators from megawatts", back: md`$N \approx P_f/(\mathrm{PUE}\cdot p_g)$; 200 MW at PUE 1.25 and 1.7 kW per GPU is about 94,000 GPUs.`, concepts: ["sh06.facility-power"] },
    { id: "sh06-l01-f3", front: "Stargate UAE status (Nov 2026)", back: "1 GW announced May 2025; first 200 MW due Q3 2026 (The National, Dec 2025); Epoch AI listed it under construction (Jul 2026). Operating: unverified.", concepts: ["sh06.announcement-status"] },
    { id: "sh06-l01-f4", front: "HUMAIN in three facts", back: "PIF-owned; HUMAIN Chat on ALLaM 34B (Aug 2025); 18,000 Blackwell chips approved and a reported 6 GW plan (Jan 2026, secondary).", concepts: ["sh06.national-entities"] },
    { id: "sh06-l01-f5", front: "Qatar's AI entities", back: "Qai (QIA), USD 20 bn AI-infrastructure JV with Brookfield on 9 Dec 2025; QCRI's Fanar models (Star 7B, Prime 9B on Gemma-2).", concepts: ["sh06.national-entities"] },
    { id: "sh06-l01-f6", front: "Kuwait AI infrastructure (research)", back: "Microsoft Azure AI region, data centre and innovation hub announced 6 Mar 2025; Google region announced Jan 2023 with no update; no national open-weight LLM found.", concepts: ["sh06.national-entities"] },
    { id: "sh06-l01-f7", front: "Four statuses for an infrastructure claim", back: "Announced (plan or MoU), financed, under construction, operating. Record the status and the date you last confirmed it.", concepts: ["sh06.announcement-status"] },
  ],
};

export default lesson;
