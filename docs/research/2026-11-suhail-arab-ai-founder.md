# Research brief: Arab-world AI landscape, MENA funding, community-company models, founder-education facts

Compiled 2026-11-06. Method: WebSearch only. WebFetch was blocked by the session network policy (rvo.nl, ycombinator.com, speedrun.a16z.com, hub71.com and techeurope.io would not resolve), so no primary page was opened directly. Every claim below comes from search-result snippets. Treat anything not tagged **[primary]** as secondary.
Tags: **[primary]** = issuer/official/peer-reviewed source; **[secondary]** = press or aggregator; **UNVERIFIED** = single weak source or conflicting reports. "n.d." = publication date not visible in the result.

---

## 1. Arab/Gulf AI landscape (late 2026)

### Saudi Arabia: HUMAIN (PIF-owned) and SDAIA
- HUMAIN Chat launched Aug 2025, running on **ALLaM 34B**. HUMAIN says it built the 34B from scratch and took over the ALLaM brand from SDAIA. The app was initially available only in KSA and is hosted end-to-end in-Kingdom. [secondary] Middle East AI News, ~25 Aug 2025: https://www.middleeastainews.com/p/humain-chat-live-allam-34b-llm ; Mubasher: https://sharikatmubasher.com/media-hub/news/21503216/humain-launches-ai-chat-app-powered-by-allam-34b-in-saudi-arabia?lang=en
- ALLaM 34B weights appear **not** to be public. UNVERIFIED (one aggregator only): https://lmmarketcap.com/zh/model/allam-34b
- SDAIA put **ALLaM-7B-Instruct-preview** on Hugging Face. It was pretrained on 5.2T English and Arabic tokens. [secondary] Asharq Al-Awsat, n.d. (2025): https://english.aawsat.com/technology/5119148-sdaia-lists-allam-7b-arabic-language-model-hugging-face
- Compute:
  - Two data centres (Riyadh and Dammam) broke ground with first go-live targeted for Q2 2026. [secondary] DCD, 2025: https://www.datacenterdynamics.com/en/news/humain-breaks-ground-two-data-centers-with-first-facilities-expected-to-go-live-in-q2-2026/ . I found no confirmation that they are live (UNVERIFIED).
  - Approval to import 18,000 Nvidia Blackwell chips. [secondary] https://cairoscene.com/Business/Humain-to-Import-18-000-Nvidia-AI-Chips-for-New-Data-Centres
  - Jan 2026: a plan for about 6 GW of capacity, a $1.2bn National Infrastructure Fund financing for 250 MW, and the "Humain 1" OS. [secondary] folio3, 26 Jan 2026: https://www.folio3.ai/ai-pulse/saudi-ai-firm-launches-data-center-expansion-new-operating-system
  - Partnerships: AWS ($5bn "AI Zone"), an STC joint venture (1 GW), xAI (500 MW), AMD ($10bn for 500 MW over 5 yrs). [secondary, same summary]
  - Together AI and HUMAIN: a 250 MW data centre. [secondary] Mubasher, dated ~31 Aug 2026 in the snippet: https://sharikatmubasher.com/media-hub/news/21571663/humain-together-ai-to-build-new-250-mw-data-center-in-kingdom
- **BALSAM** benchmark: built by SDAIA, KSGAAL and partners. 78 tasks in 14 categories, 52K examples (37K test / 15K dev), blind test sets meant to limit contamination. Hosted at benchmarks.ksaa.gov.sa. [primary] arXiv 2507.22603, 30 Jul 2025; ArabicNLP 2025: https://arxiv.org/abs/2507.22603v1 ; launch coverage: https://www.middleeastainews.com/p/saudi-arabic-llm-index-launched-at-gain

### UAE: G42, MGX, Stargate UAE, MBZUAI, TII
- **Stargate UAE**:
  - Announced May 2025 as a 1 GW cluster in Abu Dhabi, with the first 200 MW due in 2026. Partners are OpenAI, Oracle, Nvidia (GB300), Cisco and SoftBank. Khazna (G42) builds it. [secondary] Tom's Hardware, May 2025: https://www.tomshardware.com/tech-industry/artificial-intelligence/openai-says-it-will-expand-stargate-ai-infrastructure-project-to-the-uae-starting-with-a-1gw-cluster
  - In Dec 2025 an official said the first 200 MW would be ready in **Q3 2026**. [secondary] The National, 5 Dec 2025: https://www.thenationalnews.com/business/2025/12/05/stargate-uaes-first-phase-to-be-completed-in-third-quarter-of-2026
  - Epoch AI (updated 3 Jul 2026) still lists it as under construction and estimates 200 MW by Dec 2026: https://epoch.ai/data/ai-data-centers/directory/openai-stargate-uae
  - **Whether it was operational as of Nov 2026: UNVERIFIED.**
- **MGX** (owned by Mubadala and G42, chaired by Sheikh Tahnoon): Fund I closed at about **$49bn** against a $45bn target. Portfolio includes OpenAI, SpaceX, Binance, Khazna, Vantage and others. [secondary] AGBI, Jul 2026: https://agbi.com/ai/2026/07/mgx-raises-49bn-as-investors-flock-to-ai ; Semafor, 23 Jun 2026 ($50bn): https://www.semafor.com/article/06/23/2026/abu-dhabis-mgx-secures-50b-for-ai-investments . Separately, MGX targets more than $100bn total AUM (Techleap feed, Feb 2026, UNVERIFIED).
- **Jais 2** (Inception/G42, Cerebras, MBZUAI IFM): released **9 Dec 2025**. 70B parameters, open weights on Hugging Face, about 600B Arabic tokens, trained and served on Cerebras hardware. [primary] MBZUAI news: https://mbzuai.ac.ae/news/inception-cerebras-and-mbzuai-release-jais-2-the-next-generation-of-the-worlds-leading-arabic-open-weight-llm/ ; BusinessWire 9 Dec 2025: https://www.businesswire.com/news/home/20251209964079/en/ . Technical report: arXiv 2608.13580 (Aug 2026): https://arxiv.org/pdf/2608.13580
- **K2 Think** (MBZUAI and G42): Sep 2025, 32B, fully open (data, weights, code). A second edition (70B, built on K2-V2) followed in Jan 2026. [primary] MBZUAI, 9 Sep 2025: https://mbzuai.ac.ae/news/mbzuai-and-g42-launch-k2-think-a-leading-open-source-system-for-advanced-ai-reasoning/ ; WAM (2nd ed.): https://www.wam.ae/en/article/bygetjm-mohamed-bin-zayed-university-artificial
- **TII Falcon**:
  - **Falcon Arabic** (May 2025) was built on Falcon 3-7B and trained on native Arabic data. It was not downloadable at launch. [secondary] https://www.middleeastainews.com/p/falcon-3-arabic-ai-model-released ; BusinessWire 21 May 2025: https://www.businesswire.com/news/home/20250521966371/ja
  - **Falcon-H1 Arabic** (5–6 Jan 2026) comes in 3B, 7B and 34B sizes. It uses a hybrid Mamba-Transformer architecture and supports up to 256K context. TII says it ranks #1 on OALL per size, with the 7B scoring about 71.5–71.7. These are vendor claims. Released under the Falcon LLM License. [primary] BusinessWire 5 Jan 2026: https://www.businesswire.com/news/home/20260105343577/en/ ; HPCwire: https://www.hpcwire.com/off-the-wire/uaes-tii-launches-falcon-h1-arabic-models-in-3b-7b-and-34b-configurations/

### Qatar
- **Qai**, a national AI company under QIA, launched Dec 2025. On 9 Dec 2025 it formed a **$20bn** AI-infrastructure joint venture with Brookfield covering Qatar and select international markets. [primary] QIA newsroom: https://www.qia.qa/en/Newsroom/Pages/Brookfield-and-Qai-Form-$20-Billion-Strategic-Investment-Partnership-for-AI-Infrastructure.aspx ; Brookfield: https://bam.brookfield.com/press-releases/brookfield-and-qai-form-20-billion-strategic-investment-partnership-ai ; AGBI Dec 2025: https://www.agbi.com/ai/2025/12/brookfield-and-qatars-qai-set-up-20bn-ai-joint-venture/
- **Fanar** (QCRI/HBKU): the platform launched in late 2024 with Fanar Star (7B, trained from scratch) and Fanar Prime (9B, built on Gemma-2). Fanar-1-9B is on Hugging Face, continually pretrained on about 1T tokens (≈410B Arabic). The instruct model is reportedly Apache-2.0 (UNVERIFIED: license not checked on the HF card). [primary] HF: https://huggingface.co/QCRI/Fanar-1-9B ; tech report arXiv 2501.13944 (Jan 2025)

### Kuwait
- **Microsoft–Government of Kuwait** partnership announced 6 Mar 2025: an "AI-powered" Azure region, an AI data centre and an innovation hub. [secondary] DCD: https://www.datacenterdynamics.com/en/news/microsoft-to-develop-azure-cloud-region-in-kuwait/ ; Kuwait Times: https://kuwaittimes.com/article/25220/kuwait/other-news/kuwait-partners-with-microsoft-to-drive-ai-and-digital-transformation
- Google announced a Kuwait cloud region in Jan 2023. No status update found.
- The claim that KIA joined Microsoft and BlackRock in a $30bn AI infrastructure vehicle is **UNVERIFIED** (single weak source).
- Kuwait has no notable national open-weight LLM that I could find.

### Other notable Arabic models
- **AceGPT** (CUHK-Shenzhen, SRIBD, KAUST): built on Llama 2, with a full pipeline of pretraining, SFT and RLAIF. Published at NAACL 2024. [primary] https://arxiv.org/html/2309.12053v1 ; https://preview.aclanthology.org/setup/2024.naacl-long.450
- **SILMA** (SILMA.AI): SILMA-9B-Instruct-v1.0 is built on Gemma. SILMA says it was the top open Arabic LLM until Feb 2025 (self-reported). SILMA also released SILMA TTS (150M) and runs the **ABBL** leaderboard, which includes contamination detection. [primary-ish] https://huggingface.co/spaces/silma-ai/README/blob/main/README.md ; https://huggingface.co/blog/silma-ai/arabic-llm-leaderboard

### Arabic benchmarks
- **OALL v2** (Open Arabic LLM Leaderboard) dropped machine-translated tasks. It uses native ArabicMMLU, ALRAGE, AraTrust and MadinahQA, plus Belebele (MSA and dialects) and EXAMS, AlGhafa, and a human-translated MMLU-HT. [primary] HF blog, 2025: https://huggingface.co/blog/leaderboard-arabic-v2
- **ArabicMMLU** (Koto et al., 2024): about 14.5K native multiple-choice questions taken from school exams across Arab countries. [secondary, via survey] https://arxiv.org/pdf/2510.13430
- **BALSAM**: see Saudi section above.
- **AraBench**: no 2025–26 source surfaced. It is generally known as an MT dialect benchmark (UNVERIFIED here).
- Evaluation survey: "Evaluating Arabic LLMs: A Survey of Benchmarks, Methods, and Gaps" (arXiv 2510.13430, Oct 2025) lists contamination as an open problem: https://arxiv.org/pdf/2510.13430

---

## 2. Arabic NLP challenges and key datasets

**Commonly cited challenges**
- **Diacritics and tokenization.** Full diacritization sharply increases subword fragmentation (fertility) and hurts performance. LLMs cope fine with the light diacritization found in natural text. [primary] Inoue, Alhafni, Habash, Baldwin, *Findings of EACL 2026*: https://preview.aclanthology.org/credits/2026.findings-eacl.22
- **Root-pattern morphology vs. BPE tokenizers.** "Morphemes Without Borders" (arXiv 2603.15773, Mar 2026): https://www.alphaxiv.org/abs/2603.15773 . A community Arabic Tokenizers Leaderboard exists on HF Spaces: https://wissamantoun-arabic-tokenizers-leaderboard.hf.space
- **Dialects, data scarcity and morphological complexity.** Commonly cited across surveys, e.g. "LLMs and Arabic Content: A Review" (secondary summary): https://www.themoonlight.io/review/large-language-models-and-arabic-content-a-review
- **Evaluation contamination.** The OALL authors note that public test sets invite gaming. BALSAM and ABBL respond with private or blind sets and contamination checks. A NeurIPS 2026 paper shows contamination can transfer through translation: on MMLU, translated exposure raised accuracy by 2.8–11.3 pp. [primary] https://neurips.cc/virtual/2026/162681 ; survey: https://arxiv.org/pdf/2510.13430

**Key datasets**
| Dataset | Size | Source |
|---|---|---|
| ArabicWeb24 (LightOn) | ≈28B tokens after cleaning and dedup (AraGPT2 tokenizer); the card header says 39B+ | [primary] https://huggingface.co/datasets/lightonai/ArabicWeb24 ; blog: https://huggingface.co/blog/MayFarhat/arabicweb24 |
| 101 Billion Arabic Words | 101B words from Common Crawl (arXiv 2405.01590, May 2024). AraMix re-measured ≈22.6B words downloaded, 49.9B tokens raw, 7.7B after sentence dedup | [primary] https://arxiv.org/abs/2405.01590v1 |
| CulturaX | 6.3T tokens across 167 languages. AraMix measures the Arabic subset at 87.4B tokens raw, 38.4B after dedup (third-party measurement) | AraMix arXiv 2512.18834, Dec 2025: https://arxiv.org/html/2512.18834v1 |
| AraMix | Recycled, refiltered and deduplicated combination of the above (≈31.6B tokens from ArabicWeb24 after dedup) | same |
| Jais 2 pretraining | ≈600B Arabic tokens (not released as a dataset) | Khaleej Times: https://www.khaleejtimes.com/uae/largest-arabic-ai-model-jais-2-what-it-can-do |

---

## 3. Regional startup funding

### Totals (MAGNiTT vs Wamda use different methods; Wamda appears to include debt)
- **MAGNiTT FY2025**: MENA **$3.8bn across 688 deals**, +74% YoY. AI made up 22% of funding ($858M). [primary] https://www.magnitt.com/research/FY-2025-MENA-VC-Report-51018 ; AI report: https://www.magnitt.com/research/FY-2025-State-of-Venture-Capital-of-AI-in-MENA-51029 . KSA led the Middle East with $1.72bn. Arab News: https://www.arabnews.com/node/2629071
- **Wamda FY2025**: **$7.5bn** raised by 647 startups, +225% YoY. KSA $5bn across 211 deals; fintech $4.4bn (58%). [primary] Wamda, Jan 2026: https://www.wamda.com/en/2026/01/record-year-mena-startups-funding-climbs-7-5-billion-n-2025
- **MAGNiTT H1 2026**: **$1.35bn across 214 deals**. Funding fell 22% YoY and deal count fell 41%. AI took $678M (≈50%). UAE $895M (66%); KSA only $219M across 72 deals. [primary] https://www.magnitt.com/research/mena-venture-capital-the-h1-2026-review-51047 ; AI: https://www.magnitt.com/news/ai-companies-captured-half-of-mena-s-venture-funding-in-h1-2026-from-just-a-quarter-of-all-deals-54044
- **Wamda H1 2026**: **$1.7bn across 242 rounds**, down 18% YoY. Debt was 29% of the total. [primary] Wamda, Jul 2026: https://www.wamda.com/index.php/ar/2026/07/mena-startups-raise-1-7-billion-h1-2026-despite-regional-uncertainty
- KSA Q1 2026 funding fell 62% YoY. Mubasher: https://en.sharikatmubasher.com/news/article/21546208/vc-funding-in-saudi-arabia-slides-by-62-in-q1-26?lang=en . A MAGNiTT Q3 2026 MENA update exists, but I did not read its figures: https://www.magnitt.com/research/Q3-2026-MENA-VC-Update-51060

### Funds (only what surfaced)
- **Global Ventures III**: more than $150M, backed by Saudi Venture Capital (SVC). SPA, ~1 Jan 2025: https://spa.gov.sa/en/N2236324
- **Khwarizmi Ventures Fund II**: first close of $70M+ (SAR 270M), Feb 2026, targeting >$100M. https://www.pulse.bot/entrepreneurship/news/khwarizmi-ventures-launches-fund-ii-with-70m-first-close-to-back-gcc-startups-44b01cfa-8906-4569-894f-5483f05d8a30/
- **Plus VC** plans to back 40 startups in 2026 with a Saudi focus. Mubasher, early 2026: https://en.sharikatmubasher.com/news/article/21521186/plus-vc-expands-saudi-focus-plans-to-back-40-startups-in-2026?lang=en
- **Flat6Labs** rebranded to **F6 Group** and is separating its VC arm (F6 Ventures) from the accelerator. Its 6th Riyadh seed programme backed 60 startups with $17M (Jan 2026), co-funded by SVC, **Jada Fund of Funds** and Riyadh Valley. Dealroom: https://app.dealroom.co/news/feed/flat6labs-concludes-sixth-riyadh-seed-programme-backing-60-startups-with-17m-1
- **Sanabil (PIF)** runs its accelerator with 500 Global ("Sanabil 500"). [secondary] https://visible.vc/blog/top-vcs-saudi-arabia/
- **Raed Ventures** (Riyadh, founded 2015): 56 portfolio companies as of Apr 2026 (secondary profile, UNVERIFIED). https://seedtable.com/investors/raed-ventures
- **Algebra Ventures** (Egypt): Fund I first close of $40M in Dec 2016. Wamda: https://www.wamda.com/en/2016/12/egypts-algebra-ventures-closes-new-40m-fund . No later fund found here.
- **STV, BECO, Shorooq**: no 2025–26 fund-close data surfaced. Shorooq's ~$500M AUM is UNVERIFIED (LinkedIn post). **Treat all as UNVERIFIED.**

### Hub71 (Abu Dhabi)
- Access Programme: **AED 250K in-kind incentives** (housing, office, health insurance via a digital wallet) plus **AED 250K cash for equity via SAFE**. A possible further AED 250K top-up brings the total potential to about AED 750K. [secondary, UNVERIFIED on hub71.com] https://hub.causo.ai/guides/how-to-apply-to-hub71-2026 ; https://www.incorpx.io/grants/providers/hub71
- Older terms (pre-2024) offered 100% free housing, office and insurance for 2 years, then 50%. Likely superseded. https://www.menabytes.com/hub71-abu-dhabi/

### Egypt talent signals
- Offshoring exports were about $5.2bn in 2025, with a target of $6bn in 2026. The government targets 800K ICT-trained people; Egypt produces about 750K graduates a year. Zawya, 2026: https://www.zawya.com/en/economy/north-africa/egypt-expands-digital-talent-programs-as-offshoring-exports-target-6bln-in-2026-v6k21gtg
- ITIDA (Apr 2024): software development made up about 58% of ICT job openings. https://egyptian-gazette.com/technology/unveiling-trends-itida-highlights-software-development-as-most-in-demand-in-egypts-ict-job-market/
- Pay (rough figures): early-career software engineers average about E£139K/yr per Payscale (2026). https://www.payscale.com/research/EG/Job=Software_Engineer/Salary/cf9a2fca/Early-Career-Cairo ; FollowICT (Feb 2025) gives E£120–240K/yr.
- Emigration data: not found (UNVERIFIED).

### Regulation affecting events (Saudi Arabia)
- Public or ticketed events need a **GEA** (General Entertainment Authority) permit through its e-portal, one permit per event. Conferences and exhibitions fall under **SCEGA**. E-sports events fall under SAFEIS (per Al Tamimi). Foreign organisers typically need a MISA (formerly SAGIA) licence and a commercial registration first. All of this is from secondary sources and needs confirmation with GEA and SCEGA. https://blog.konfhub.com/event-permits-approvals-saudi-arabia ; https://tamimi.com/law-update-articles/so-you-want-to-host-an-e-sports-tournament-in-saudi-arabia ; https://turtl.tamimi.com/story/licensing-regulations-of-the-entertainment-sector-in-ksa
- I found no hackathon-specific rule. Whether a free, invite-only hackathon needs a permit is UNVERIFIED.

---

## 4. Community-company models

### {Tech: Europe}
- Calls itself "Europe's Builder Community" and is headquartered in Berlin. It grew out of **{Tech: Berlin}** (2023–24 newsletter and hackathons).
- Runs 2–3 AI hackathons a month across Europe (Berlin, Copenhagen, Zurich and other cities), plus a conference for engineers (conference.techeurope.io) and a Beehiiv/Substack-style newsletter.
- Distribution runs through Luma event pages and Discord.
- Hackathons are free for participants, with approval-gated registration (e.g. a 90-person cap). Technology partners such as OpenAI provide credits, and sponsors fund the prizes (e.g. Peec AI put up a €10K prize; the "Big Berlin Hack" had >300 builders and >€50K in prizes, co-hosted with CODE University).
- Sources: https://lu.ma/berlin-hackathon ; https://web.luma.com/bigberlinhack ; https://blog.techeurope.io/p/ai-hackathon-1-wrap-up ; https://tech-berlin-newsletter.beehiiv.com/p/2025-intro ; https://www.hausofstartups.com/communities/city/berlin
- **How it makes money**: inferred, **UNVERIFIED**. The visible signals are hackathon and partner sponsorship (prizes, credits, branding), conference tickets and sponsors, and hiring/talent features. Newsletter issues are titled like job posts ("Founding engineers in Zurich…", "we're hiring…"), which suggests sponsored roles or recruiting. A careers board also exists: https://techeurope.notion.site/techeurope-careers . No funding round was found.

### On Deck
- The ODX accelerator ($125K for 7%) was wound down in 2022 amid layoffs, and the company shifted to pre-seed investing. TechCrunch, 4 Aug 2022: https://techcrunch.com/2022/08/04/on-deck-lays-off-a-third-of-staff-after-cutting-a-quarter-just-months-prior
- The current On Deck Fellowship (ODF) is a paid, non-dilutive cohort community. ODF28 was listed for Q3 2026. [secondary] https://www.hireinsouth.com/post/ondeck-review

### Founders, Inc. (San Francisco)
- Up to $250K at pre-seed for roughly 4–7% (self-marketing). Programmes include Canopy (5 weeks) and Blueprint II (30 Sep–11 Dec 2026, $150K offer). Heavy use of Luma events (e.g. Night Hack). [secondary, UNVERIFIED] https://yespress.io/founders-inc ; https://luma.com/nighthack

### Antler
- Terms vary by region:
  - EU 2026: €100K on an uncapped MFN SAFE, follow-on up to €250K. https://startupintros.com/resources/antler-eu-2026
  - US: $250K for 10% plus a $150K SAFE. Nordics doubled initial backing in Jul 2025. https://bebeez.eu/2025/07/03/antler-nordics-renews-investment-terms-doubles-initial-backing-for-founders/
- Global fund of $510M (Jan 2026): UNVERIFIED.

### Indie Hackers
- Stripe acquired it in Apr 2017, when it made about $8K/month. TechCrunch, 11 Apr 2017: https://techcrunch.com/2017/04/11/stripe-acquires-indie-hackers-a-knowledge-sharing-community-for-entrepreneurs
- Courtland and Channing Allen bought it back in 2023; Stripe remains an investor. https://builttosell.com/?p=4256

### Luma-driven communities
- Luma is the de facto event and calendar layer for {Tech: Europe}, Founders Inc and many AI communities (see the URLs above). No Luma revenue data was found.

### MLH (Major League Hacking)
- A Public Benefit Corporation. Reaches 80K+ developers a year across 200+ events. Revenue comes mainly from corporate sponsors of its Hackathon League and programmes; e.g. Meta sponsored the MLH Fellowship. https://opensource.fb.com/media
- No public MLH rate card; every Hackathon League sponsorship is "uniquely designed". MLH's organiser guide recommends **three tiers**, with the top tier at no more than 25% of the budget. [primary] https://guide.mlh.io/general-information/getting-sponsorship/sponsorship-prospectus ; https://guide.mlh.io/digital-hackathons/getting-sponsorship/mlh-tips
- Revenue is said to be under $5M (ZoomInfo, UNVERIFIED).

### Published hackathon sponsorship tiers
| Event | Tiers |
|---|---|
| HackPrinceton S25 | Bronze $1K / Silver $2.5K / Gold $5K / Platinum $7.5K. https://www.hackprinceton.com/images/sponsors/HackPrinceton%20S25%20Prospectus.pdf |
| AAAI Hackathon 2025 | Bronze $2.5K / Silver $5K / Gold $10K (Gold includes a talk, a judging seat and access to submissions). https://aaai.org/wp-content/uploads/2024/11/Hackathon-Sponsorship-2025.pdf |
| UNIHACK 2025 (AUD) | 1K / 2K / 4K+ / 6K+ / 10K+. https://unihack-rhe3z16ls-unihackhq.vercel.app/files/2025-sponsorship-prospectus.pdf |
| BrickHack (MLH member event, ~2019) | Free "General" up to $7.5K Platinum |
| Rule of thumb (Builderbase playbook) | 30–50 participants: Platinum $2–5K, Gold $1–2K. 500+ participants: Gold $7.5–20K. https://intercom.help/builderbase/en/articles/14831423-hackathon-playbook-ch-05-finding-sponsors |

---

## 5. Founder-education facts (2026)

### Y Combinator
- The standard deal is **$500K**: $125K for 7% (post-money SAFE) plus $375K on an uncapped MFN SAFE. It has been unchanged since 2022 and still applies for W26 and Spring 2026. [secondary; ycombinator.com/deal not reachable] https://www.flowjam.com/blog/y-combinator-funding-amount-2026
- 2026 changes:
  - Jan 2026: Canada was dropped as an eligible incorporation jurisdiction, leaving US (Delaware), Cayman and Singapore. A reversal was reported but is UNVERIFIED. https://technewsday.com/u-s-startup-incubator-removes-canada-from-list-of-eligible-investment-countries
  - From Spring 2026, companies can opt to take the investment in USDC. https://techeconomy.ng/y-combinator-stablecoins-funding-usdc-2026/

### a16z speedrun
- Up to **$1M**: $500K for about 10% at entry (SAFE vs. common is unclear across sources), plus $500K in the next round within 18 months, on the lead investor's terms. Includes more than $5–10M in partner credits. [secondary; the-deal page not reachable] https://superscout.co/program/a16z-speedrun
- SR007 ran 27 Jul–11 Oct 2026. SR008 applications ran 12 Oct–1 Nov 2026 (closed); the programme runs 1 Feb–18 Apr 2027. [primary] https://a16z.com/applications-for-a16z-speedrun-sr008-are-now-open/

### Hub71
- See section 3.

### Netherlands
- **WBSO 2026** [primary, RVO]:
  - First bracket: **36%** up to **€391,020** of S&O wage base (raised from €380,000 by a one-off 2.9% indexation, an amendment to Belastingplan 2026 adopted by the Eerste Kamer in Dec 2025).
  - First bracket for **starters: 50%**.
  - Second bracket: **16%**.
  - Total budget: €1.817bn.
  - RVO calculator page: https://www.rvo.nl/subsidies-financiering/wbso/bereken-wbso-voordeel ; SRA, Dec 2025: https://www.sra.nl/nieuws/259001/2025/12/meer-wbso-in-2026 ; amendment kst-36602-38: https://zoek.officielebekendmakingen.nl/kst-36602-38.odt
  - Note: RVO's earlier 2026 handbook still shows €380,000.
- **Innovatiekrediet** (RVO):
  - A loan covering 45% of project costs for small firms, 35% for medium and 25% for large firms when there is no collaboration (up to 50% with collaboration, per secondary sources).
  - Maximum €10M (technical) or €5M (clinical); minimum project size €150K.
  - Surcharge of 15% (technical) or 25% (clinical).
  - Applications are first-come-first-served until 31 Dec 2026.
  - 2026 budget: €50M, possibly raised to €70M (UNVERIFIED).
  - https://www.rvo.nl/subsidies-financiering/innovatiekrediet ; https://www.hezelburcht.com/subsidies/innovatiekrediet/
- **EIC Accelerator 2026**:
  - Grant up to **€2.5M**; equity €1–10M from the EIC Fund (blended, grant-only or equity-only).
  - 2026 full-proposal cut-offs: 7 Jan, 4 Mar, 6 May, 8 Jul, 2 Sep, 4 Nov (all passed). The first 2027 cut-off is reportedly 7 Jan 2027 (UNVERIFIED).
  - Oct 2025 cut-off: 121 of 923 applicants invited to interview, 61 funded.
  - https://www.zabala.eu/news/eic-accelerator-2026-updates/ ; https://hub.causo.ai/guides/how-to-apply-to-eic-accelerator-2026
- **Dutch BV**:
  - Minimum capital is effectively **€0.01** since the 2012 Flex-BV reform (the old minimum was €18,000).
  - Incorporation requires a **notarial deed** from a Dutch civil-law notary, then registration with the KvK.
  - Remote/video signing is reported as possible (UNVERIFIED).
  - https://www.burenlegal.com/sites/default/files/usercontent/content-files/REQUIREMENTS%20FOR%20INCORPORATING%20A%20BV%20IN%20NL_April%202022_0.pdf ; https://www.datocapital.nl/blog/besloten-vennootschap-netherlands.html
- **STAK** (Stichting Administratiekantoor):
  - A foundation that holds the shares and issues depositary receipts (certificates). This separates economic rights from voting rights and is commonly used for employee and angel pools.
  - Certificate holders are generally taxed in box 2 or box 3 as if they held shares directly (secondary). https://sharecouncil.co/stak ; https://www.pplaw.com/en/insights/tax-court-approach-dutch-stichting-administratiekantoor-transparent-or-non-transparent
- **Coming change**: the *Wet fiscale stimulering startups en scale-ups* (consultation 1–29 Apr 2026) is intended to apply from **1 Jan 2027**.
  - Only 65% of the option gain would be taxed.
  - Tax would be deferred until the shares are sold.
  - It would cover options granted from 17 Apr 2025.
  - https://loyensloeff.com/insights/news--events/news/employee-stock-options-more-attractive-as-of-1-january-2027 ; https://kpmg.com/xx/en/our-insights/gms-flash-alert/2026/flash-alert-2026-144.html ; https://cms.law/en/nld/legal-updates/netherlands-launches-public-consultation-on-new-tax-regime-for-start-up-and-scale-up-employee-share-options
  - Today, options are taxed at the moment the shares become tradable, or at exercise if the holder elects.

### Switzerland (Zurich)
- **GmbH**: CHF 20,000 minimum, fully paid in (Art. 773 and 777c CO).
- **AG**: CHF 100,000 minimum. At least 20% of each share and at least CHF 50,000 in total must be paid in (Art. 621 and 632 CO).
- Both require notarisation and a commercial register entry. Notarial tariffs in Zurich are higher than in Zug or Schwyz.
- [secondary; the Code of Obligations is authoritative] https://goldblum.ch/knowledgebase/swiss-company-share-capital-requirements-gmbh-ag-share-types ; https://globallawexperts.com/news/ag-vs-gmbh-switzerland-2026

### Kuwait foreign ownership
- **Default rule**: Commercial Law (Decree-Law 68/1980) Art. 23 requires **51% Kuwaiti ownership** of companies.
- **100% foreign ownership** is possible through a **KDIPA** investment licence under the **Direct Investment Promotion Law No. 116/2013**, in sectors not on the negative list. [secondary] https://chambers.com/articles/understanding-the-kdipa-license-in-kuwait-essential-considerations-for-foreign-investors ; https://turtl.tamimi.com/story/kdipa-the-past-and-the-future/page/1
- **Law No. 1 of 2024** (gazetted 21 Jan 2024) amended Art. 24 of the Commercial Law. Foreign companies can now open **branches without a local agent**. It does not remove the 51% rule for incorporation. https://tamimi.com/news/foreign-companies-to-operate-in-kuwait-without-a-local-agent ; https://kw-www.bdo.global/en-gb/insights/featured-insights/kuwait-scraps-local-agent-requirement
- **Companies Law** (Law 1/2016) was last amended by Decree-Law No. 106 of 2024. In Nov 2025 the Ministry of Commerce and Industry announced a further reform initiative to attract foreign investment. **Enactment as of Nov 2026: UNVERIFIED.** Al Tamimi "Eyes on 2026": https://www.tamimi.com/our-knowledge/publications/eyes-on-2026/Articles/kuwaits-companies-law-set-for-modernisation-opening-new-avenues-for-investment-and-growth/
- Law 7 of 2025 amended the Real Estate Ownership Law (property, not companies). https://www.mondaq.com/corporate-and-company-law/1649694/kdipa-the-past-and-the-future

---

## Open items / UNVERIFIED list
1. Stargate UAE 200 MW and HUMAIN Riyadh/Dammam go-live status as of Nov 2026.
2. ALLaM 34B weights availability; Fanar license.
3. Fund-close data for STV, BECO, Shorooq, Sanabil, Raed and Algebra in 2025–26.
4. Current Hub71 package figures (hub71.com not reachable).
5. YC Canada reversal; a16z speedrun instrument (SAFE vs. common).
6. How {Tech: Europe} makes money (inferred only).
7. Kuwait Companies Law 2025–26 amendments enacted or not; KIA–Microsoft–BlackRock $30bn.
8. Whether a Saudi hackathon needs a GEA or SCEGA permit.
9. Innovatiekrediet 2026 budget (€50M vs €70M).

To close these, allow these hosts in the session network settings: rvo.nl, ycombinator.com, speedrun.a16z.com, hub71.com, techeurope.io, kdipa.gov.kw, gea.gov.sa.
