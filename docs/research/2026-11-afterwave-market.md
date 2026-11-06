# Research brief: regulation, standards, competitive landscape, market, accelerators
Prepared 2026-11-06. Context: physical-AI test infrastructure (capture, isolated data/model environment, change-impact / test-selection engine).

## Method and limits (read first)
- This session's network policy **blocked direct page fetches** (WebFetch failed for eur-lex.europa.eu, digital-strategy.ec.europa.eu, globenewswire.com, siftstack.com, gibsondunn.com). Every finding below therefore comes from **web-search result summaries** of the cited pages, not from reading the primary page in full.
- "Date" is the publication date shown in the URL or the search result. Where no date was visible it says "date n/a".
- **UNVERIFIED** means a single secondary source, conflicting sources, or a claim I could not check against a primary text. All numeric funding figures should be rechecked on the primary press release before anyone repeats them externally.

---

## 1. EU Machinery Regulation (EU) 2023/1230 and the AI Act

### 1.1 Application date
- Generally applies from **20 January 2027**. Machinery placed on the market before that date stays under Directive 2006/42/EC. Notified-body provisions applied earlier (20 Jan 2024). Sources: EU-OSHA legislation page (date n/a) https://osha.europa.eu/en/legislation/directive/regulation-20231230eu-machinery ; TUV NORD (date n/a) https://www.tuev-nord.de/en/services/audit-and-expertise/product-certification/machinery-regulation/
- **No general postponement found.** No Commission proposal to move the 20 Jan 2027 date turned up in searches as of Nov 2026.

### 1.2 Postponement requests and "omnibus" changes affecting machinery
- **Industry request (cyber + AI provisions):** in Sept 2025, machinery associations (CECE, CEMA, CECIMO, EGMF, FEM and others) asked to postpone EHSR 1.1.9 (protection against corruption) and 1.2.1(f), aligning them with the Cyber Resilience Act. They also asked for at least 24 months' delay on the AI-related requirements. Updated joint position of 19 Jan 2026 (cyber, target Dec 2027); IBF says the **AI part was dropped from the request in Feb 2026**. ETUC opposed any delay.
  - CEMA joint industry call, 19 Jan 2026: https://www.cema-agri.org/publications/18-news-publications/1118-joint-industry-call-on-cybersecurity-and-the-machinery-regulation
  - CECIMO position PDF (Jan 2026): https://www.cecimo.eu/wp-content/uploads/2026/01/Joint-industry-Position-on-cybersecurity-provisions-in-the-Machinery-Regulation-1.pdf
  - Updated position (02/2026): https://www.ibf-solutions.com/fileadmin/dateidownloads/updated-joint-industry-position-on-cybersecurity-provisions-mr-02-2026.pdf
  - IBF summary (date n/a): https://www.ibf-solutions.com/en/news-and-knowledge/technical-papers-and-news-on-ce-marking/postponement-of-mr-requirements-for-cybersecurity-and-ai
  - ETUC opposition, CEN-CENELEC newsletter (2025): https://www.cencenelec.eu/news-events/news/2025/newsletter/ots-67-etuc/
  - **Outcome: UNVERIFIED.** I found no Commission decision granting any of these postponements.
- **Omnibus IV (COM(2025) 504, procedure 2025/0134(COD)):** amends 2023/1230 mainly to allow a **digital EU declaration of conformity**. One source says committee approved a provisional agreement on 14 Jul 2026, with a plenary indicatively set for 23 Nov 2026. **UNVERIFIED** (secondary only). Source: Nemko guide (date n/a) https://digital.nemko.com/regulations/eu-machinery-regulation

### 1.3 AI / self-evolving behaviour in the Machinery Regulation
- **Annex I Part A** (mandatory notified-body / third-party conformity assessment; Module A self-certification not allowed) includes two new AI categories:
  - safety components with fully or partially self-evolving behaviour that use ML approaches to ensure safety functions;
  - machinery that embeds such systems for safety functions, where the system was not placed on the market independently.
- **Annex I Part B** machinery can still use internal control if harmonised standards are applied.
- **Annex III EHSRs** relevant to AI include 1.1.9 (protection against corruption/cyber) and 1.2.1 (safety and reliability of control systems, including self-evolving behaviour and logging). Also relevant: 1.1.6 (ergonomics/HRI) and 1.3.7 (risks from moving parts, including autonomous mobile machinery).
- Sources (secondary): UL guide (date n/a) https://www.ul.com/resources/navigating-new-eu-machinery-regulation-eu-20231230 ; Baker McKenzie (updated Nov 2025) https://www.bakermckenzie.com/en/insight/publications/resources/product-risk-radar-articles/machinery-regulation ; EP Legislative Observatory summary https://oeil.europarl.europa.eu/oeil/en/document-summary?id=1749182
- The exact Annex III wording was not read in the primary OJ text: **UNVERIFIED wording**.

### 1.4 Harmonised standards status
- Standardisation request **M/605**: Commission Decision C(2025)129 of 20 Jan 2025 asks CEN/CENELEC to revise or draft standards. It expires 20 Jan 2035. Source: Certifico (date n/a) https://www.certifico.com/index.php?option=com_content&view=article&id=26344&catid=415
- Approach: mostly **re-citing existing Machinery Directive standards**. Some are cited with restrictions on presumption of conformity, which was presented to the Machinery Expert Group in Oct 2026. The first list under the Regulation is expected **before end-2026**. **UNVERIFIED** (IBF secondary). Source: https://www.ibf-solutions.com/en/seminars-and-news/news/new-machinery-regulation-status-of-harmonised-standards ; CEN-CENELEC webinar of 14 Sep 2026: https://www.cencenelec.eu/media/CEN-CENELEC/Events/Webinars/2026/2026-09-14_machinery_webinar_final.pdf
- EN ISO 12100 revision: at ISO/DIS 12100.3:2026 / prEN stage (draft dated 1 Aug 2026), described as largely editorial. Not yet published. Source: IBF https://www.ibf-solutions.com/en/seminars-and-news/news/new-en-iso-12100
- **Practical implication:** there is no harmonised standard yet that covers AI/self-evolving safety functions, so Part A AI categories go to notified bodies.

### 1.5 Relationship with the AI Act (Reg. 2024/1689) after the Digital Omnibus on AI
- **Digital Omnibus on AI = Regulation (EU) 2026/1744.** Provisional political agreement about 6–7 May 2026; adopted 8 Jul 2026; published in OJ on 24 Jul 2026; **in force 27 Jul 2026**.
  - OJ: https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (I could not fetch it; the dates come from secondary summaries)
  - techUK, 7 May 2026: https://www.techuk.org/insights/news/eu-ai-omnibus-deal-reached-more-clarity-on-ai-act-obligations
  - SGS, May 2026: https://www.sgs.com/news/2026/05/eu-ai-act-omnibus-update-more-time-to-prepare
- **New high-risk application dates:**
  - **2 Dec 2027** for Annex III stand-alone high-risk systems (Art. 6(2)).
  - **2 Aug 2028** for Annex I product-embedded high-risk systems (Art. 6(1)).
  - Art. 50 transparency still applies from 2 Aug 2026. Some sources say watermarking moved to 2 Dec 2026 (**UNVERIFIED**).
  - Sources: Commission news "AI Omnibus enters into force" (Jul 2026) https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force ; Bratby (date n/a) https://bratby.law/digital-omnibus-ai-high-risk-delay/
- **Machinery-specific change (important):**
  - The omnibus moves Regulation 2023/1230 from **Section A to Section B of Annex I** of the AI Act. Bratby cites Art. 1(2)(a) and 1(41) of 2026/1744.
  - So the AI Act's Chapter III high-risk requirements do **not apply directly** to AI in machinery. Instead the Commission must adopt **delegated acts amending Annex III of the Machinery Regulation** to carry over the AI Act requirements: Ch. III Sec. 2 and Arts. 17, 19, 72, 73. The delegation runs 5 years from 27 Jul 2026, with target timing tied to 2 Aug 2028.
  - Until then, AI Act harmonised standards can give presumption of conformity under the Machinery Regulation.
  - Sources: NI Assembly explanatory memorandum on Reg. 2026/1744 (2026) https://www.niassembly.gov.uk/globalassets/committee-blocks/windsor-framework-democratic-scrutiny-committee/reg-eu-20261744/regulation-eu-2026_1744-em.pdf ; Eurogip (date n/a, 2026) https://eurogip.fr/en/machinery-regulation-2023-1230-what-the-digital-omnibus-on-ai-changes/ ; euaiact.com sectoral amendments https://www.euaiact.com/digital-omnibus-ai/sectoral-amendments
  - A new Art. 6(1a–1c) reportedly narrows "safety component", excluding non-safety functions such as quality control and performance optimisation. **UNVERIFIED** (single blog: https://www.haqq.ai/blog/eu-ai-act-amendments-2026).
- **Net for test teams (inference, not a source claim):**
  - From 20 Jan 2027, ML-based safety functions in machinery need notified-body assessment under the Machinery Regulation.
  - AI-Act-derived obligations (data governance, logging, post-market monitoring under Arts. 72/73) arrive later, through Machinery Regulation delegated acts.

---

## 2. Functional-safety and robot standards

| Standard | Status (as found) | Source |
|---|---|---|
| ISO 10218-1:2025 / ISO 10218-2:2025 (industrial robots; robot / integration) | **Published Feb 2025** (Ed. 2, replaces 2011). Functional-safety requirements extended: SIL 2 option alongside PL d / Cat 3. Collaborative-robot content (formerly ISO/TS 15066) folded in. | ISO https://www.iso.org/standard/73934.html ; A3 FAQ (Mar 2025) https://www.automate.org/robotics/blogs/updated-iso-10218-faq ; KEBA (2025) https://www.keba.com/en/news/industrial-automation/interview-robotics-standard |
| ISO 13849-1:2023 | Published Apr 2023 (4th ed.). New Clause 7 on software safety requirements, Annex N on software fault avoidance, validation content from ISO 13849-2 merged in. EN version cited in OJEU 2024. Transition / withdrawal date for 2015 edition conflicts across sources (May 2026 vs 15 May 2027): **UNVERIFIED**. | Pilz (date n/a) https://www.pilz.com/en-INT/support/law-standards-norms/functional-safety/en-iso-13849-1/index.html ; Xefracert https://xefracert.com/?p=6234 |
| IEC 61508 | Ed. 2 (2010) current. **Ed. 3 in development**; FprEN IEC 61508-2:2026 draft listed; final around 2027 (**UNVERIFIED**). IEC TR 61508-3-3:2025 (OO software) published. | iTeh FprEN IEC 61508-2:2026 https://standards.iteh.ai/catalog/standards/clc/4fc38f85-86a4-44e4-9886-833277194c8b/fpren-iec-61508-2-2026 ; Gofore https://gofore.com/en/understanding-iec-61508-the-foundation-of-functional-safety/ |
| ISO 26262 | 2018 (2nd ed.) current. 3rd ed. work started fall 2023; DIS expected 2026; release expected about Q2 2027. **UNVERIFIED** (single secondary source, about 1 year old). | SRES https://sres.ai/functional-safety/updates-on-the-third-edition-of-the-iso-26262-standard/ |
| ISO/PAS 8800:2024 (road vehicles: safety and AI) | **Published 13 Dec 2024**, ISO/TC 22/SC 32. Covers ML elements in E/E systems. Some listings flag a revision; PAS 8800-2 preliminary work item abandoned (Mar 2026, **UNVERIFIED**). | ISO https://www.iso.org/standard/83303.html ; Genorma https://genorma.com/en/standards/iso-pwi-pas-8800-2 |
| ISO/IEC TR 5469:2024 (AI: functional safety and AI systems) | **Published Jan 2024**, JTC 1/SC 42. Informative only (Technical Report). DIN adoption 2025-07. Follow-on **ISO/IEC TS 22440** in development; stage **UNVERIFIED**. | Nemko https://digital.nemko.com/standards/iso-iec-tr-5469 ; DIN Media https://www.dinmedia.de/en/standard/din-iso-iec-tr-5469/390310047 |
| UL 3300 (service, communication, information, education and entertainment "SCIEE" robots) | Outline of Investigation Aug 2020; now a binational consensus standard **ANSI/CAN/UL 3300** (SCC lists a 2025 designation, published 2024-05-13). Current edition **UNVERIFIED**. | UL (2020) https://www.ul.com/news/ul-3300-outline-investigation-helps-advance-safety-consumer-service-and-education-robots ; SCC https://scc-ccn.ca/standardsdb/standards/4032203 |
| ISO 25785-1 (industrial mobile robots with actively controlled stability: legged / humanoid / balancing) | **Not published.** Committee-draft (CD) / working-draft stage per 2026 sources; no confirmed publication date. "Late 2026–2027" is **UNVERIFIED**. ISO/TC 299. | i-SCOOP https://www.i-scoop.eu/iso-25785-1-explained-and-what-it-means-for-humanoid-robot-safety/ ; Physical AI Journal deployment report (mid-2026) https://www.physicalaijournal.org/post/humanoid-deployment-evidence-report-2026 |

Related: IEEE humanoid study group "pathway study" (Sep 2025) notes a lack of standardized test methods for balance and recovery safety functions: https://www.therobotreport.com/wp-content/uploads/2025/09/IEEE-Humanoid-Report-of-Future-Standards-Development.pdf

---

## 3. Adjacent tooling landscape (late 2026)

Key question for each: does it do **change-impact / regression test selection for physical test benches**? No vendor found offers this for hardware/rig/firmware/model changes as a core feature. The closest analogues are VectorCAST change-based testing (code-level) and requirements tools' "suspect links" (traceability-level).

### 3.1 Closest: test-data platforms

**Nominal** (nominal.io)
- **What it does:** "continuous test stack for physical systems".
  - **Core:** data platform; runs in secure cloud, private environments or on-prem.
  - **Connect:** edge app at the bench. Reads and writes instruments in real time, runs Python test apps, sequences tests, works in air-gapped facilities and syncs to Core later.
- **Customers:** Anduril (common test data platform across autonomous vehicle programs), Shield AI. Defense-first; pushing into automotive and robotics.
- **Acquisitions:** Fid Labs (connects AI agents to robotics development environments and simulators). Date **UNVERIFIED**.
- **Funding:**
  - $75M Series B led by Sequoia (Jun 2025): https://www.vcaonline.com/news/2025061209/nominal-raises-75-million-led-by-sequoia-capital-to-modernize-hardware-testing/
  - **$80M Series B-2 "Acceleration Round" led by Founders Fund at $1B valuation, 5 Mar 2026**, with Sequoia, Lux, General Catalyst, Lightspeed and Red Glass: https://www.globenewswire.com/news-release/2026/03/05/3250350/0/en/nominal-valued-at-1b-as-founders-fund-leads-80m-acceleration-round.html ; SiliconANGLE 5 Mar 2026 https://siliconangle.com/2026/03/05/hardware-testing-startup-nominal-raises-80m-1b-valuation/
  - Total raised: about $155M per TAMradar, or $183M per Multiples.vc (**conflicting**).
- **Contracts:**
  - $53M sole-source IDIQ from Air Force Test Center (14 Apr 2026): https://www.globenewswire.com/news-release/2026/04/14/3273124/0/en/nominal-awarded-53-million-idiq-contract-to-support-modernization-of-air-force-test-center-data-infrastructure.html
  - AFWERX STRATFI selection (26 Oct 2026). $71.2M appears in the page title only, so the amount is **UNVERIFIED**: https://nominal.io/blog/stratfi
- **Product launch:** Connect launch post https://nominalinc.substack.com/p/product-launch-nominal-connect (date n/a).
- **Change-impact / test selection:** not found in any source. **UNVERIFIED / not advertised.**

**Sift** (siftstack.com)
- **What it does:** "observability layer for hardware".
  - Ingests telemetry from test, flight and production; rules and alerts; review.
  - Deployment: SaaS, hybrid, fully on-prem for classified work, plus GovCloud. FedRAMP High via Knox is **UNVERIFIED**.
  - **Sift Agents** research preview (late Sep 2026): agents investigate telemetry inside the customer's Sift environment and turn findings into reusable rules, with human approval before changes. Sift MCP also exists.
- **Customers:** K2 Space, Astranis, Impulse Space, ULA, Parallel Systems, Plantd. About 70 staff, plan to double.
- **Funding:** **$42M Series B led by StepStone, Mar 2026** (Tracxn: 25 Mar 2026). GV is the largest investor. Total $67M. PitchBook's Jul 2025 date conflicts.
- **Sources:**
  - Sift blog https://www.siftstack.com/mission-critical/we-raised-42m-to-replace-the-legacy-tooling-hardware-engineers-still-depend-on
  - TAMradar https://www.tamradar.com/funding-rounds/sift-series-b-42m
  - Docs https://docs.siftstack.com/overview/what-is-sift
  - IT Brief (Sep 2026) https://itbrief.com.au/story/sift-launches-ai-agent-to-tackle-hardware-telemetry
- **Change-impact / test selection:** not found.

**Marple** (Antwerp)
- **What it does:** organise, find and visualise test and measurement data. Customer: Vertical Aerospace (rig and flight-test data).
- **Funding:** small round led by Network Venture Partners, Sep 2024 (undisclosed). No 2026 news found.
- **Sources:** tech.eu 26 Sep 2024 https://tech.eu/2024/09/26/marple-the-data-analysis-platform-for-engineers-secures-new-investment-to-fuel-growth/ ; Airframer https://www.airframer.com/news/release/93170
- **Change-impact:** not found.

### 3.2 Robotics data / visualization / fleet
- **Foxglove**
  - What it does: visualization and data management / observability for physical AI (ROS bags, MCAP, multimodal sensor data). Used by NVIDIA, Amazon, Anduril, Wayve, Dexterity.
  - Funding: **$40M Series B led by Bessemer, 12 Nov 2025**; total $58M; no 2026 round found. Business Wire https://www.businesswire.com/news/home/20251112126106/en/Foxglove-Raises-%2440-Million-Series-B-to-Power-the-Future-of-Physical-AI
  - Change-impact: none.
- **Rerun** (Stockholm)
  - What it does: open-source SDK and viewer for multimodal logging (point clouds, images, tensors), building a "multimodal data stack / database for physical AI".
  - Funding: **$17M seed led by Point Nine, 20 Mar 2025**; total about $20.2M. TechCrunch https://techcrunch.com/2025/03/20/reruns-open-source-ai-platform-for-robots-drones-and-cars-revs-up-with-17m-seed ; GlobeNewswire https://www.globenewswire.com/news-release/2025/03/20/3046617/0/en/Rerun-Raises-17M-to-Build-the-Data-Infrastructure-Powering-the-Physical-AI-Revolution.html
  - Change-impact: none.
- **Formant**
  - What it does: cloud robot-fleet operations and data platform. F3 release (1 Jul 2025) added generative-AI / agentic fleet features. Investors: BMW i Ventures, Intel Capital, GS Futures. Ops-focused, not test benches.
  - No 2026 funding found.
  - Source: Business Wire https://www.businesswire.com/news/home/20250630008190/en
- **Applied Intuition**
  - What it does: simulation, validation, autonomy and vehicle OS for vehicles and "all moving machines" (automotive, defense, trucking, mining, agriculture).
  - Funding: **$600M Series F at $15B valuation, Jun 2025**. Reports of offers at $30B+ in Oct 2026 (The Information via secondary) are **UNVERIFIED**. Source: https://kyodonewsprwire.jp/release/202506170725
  - Its simulation-scenario regression tools are not bench/DAQ-centric, and it has no advertised hardware-rig test selection (**UNVERIFIED**).
- **ROS bag tooling:** rosbag2 / MCAP are open formats. Foxglove maintains MCAP. No dedicated research beyond this.

### 3.3 Incumbent test & measurement / HIL / model-based
- **NI (Emerson):** FlexLogger (DAQ configuration and logging), TestStand (sequencing), SystemLink (centralized test and asset management; broader availability from Jul 2025). "Nigel" AI assistant expanding across LabVIEW+, FlexLogger, TestStand and SystemLink, with GA "later in 2026" (announced 13 May 2026). No change-impact test selection found.
  - Emerson, Jul 2025: https://www.emerson.com/en/corporate/news/2025/emerson-expands-access-to-test-management-for-engineering-teams
  - NI docs: https://www.ni.com/docs/en-US/bundle/flexlogger/page/nigel-capabilities.html
- **Vector:**
  - CANoe / vTESTstudio (automotive ECU test). CANoe 20 SP2 adds an integrated MCP server and "CANoe AI Package" (agent generates CAPL tests from requirements, runs and fixes them; reported 24 Aug 2026, **UNVERIFIED** single source).
  - **VectorCAST (now part of Vector) offers "change-based testing"**: it computes the minimal test subset affected by source-code changes. This is the closest existing analogue to change impact, but it is code-coverage based, for unit/integration tests, not for rigs or physical tests. Sources are older press material (date n/a): https://www.eenewseurope.com/en/vectorcast-6-4-includes-enterprise-and-ada-oriented-test-features/
- **dSPACE:** HIL (SCALEXIO), SIL, test management (SYNECT, not verified). "MCP-enabled AI engineering workflows" headline dated 5 Aug 2026; body not seen (**UNVERIFIED**). Source: https://www.automotivetestingtechnologyinternational.com/?p=66870
- **Keysight:** PathWave Test Automation (OpenTAP-based sequencer; v9.34 dated 2026-07-01; Linux support). No test selection found. https://www.keysight.com/at/de/product/KS8400B/pathwave-test-automation.html
- **MathWorks:** Simulink Test supports baseline / equivalence / back-to-back regression and CI through MATLAB Unit Test. Model-level, not physical rig. https://au.mathworks.com/help/sltest/ug/regression-test-workflow.html
- **HEAD acoustics:** not researched (no results gathered). **UNVERIFIED.**

### 3.4 Requirements traceability and test management
- **Jama Connect / Polarion (Siemens) / IBM DOORS Next:** "suspect links" flag downstream items, including test cases, when a linked requirement changes. This is impact analysis at the traceability level, not driven by data or signals, and doesn't select tests based on rig/firmware/model diffs.
  - Jama: user reviews on AWS Marketplace https://aws.amazon.com/marketplace/reviews/reviews-list/prodview-osvck3o74t6k6?page=2
  - IBM suspect traceability docs https://www.ibm.com/support/knowledgecenter/SSYMRC_7.0.2/com.ibm.rational.test.qm.doc/topics/c_suspecttrace_tcs.html
  - Polarion: primary documentation not retrieved (**UNVERIFIED**).
- **Xray (Jira)** and **TestRail:** test case / run / result management with requirement-coverage reports. Xray Cloud v6.16.0 dated 19 Jan 2026. No physical-signal awareness; selection is manual or tag-based.
  - Xray: https://marketplace.atlassian.com/apps/1211769/xray-test-management-for-jira
  - TestRail: https://support.testrail.com/hc/en-us/articles/7076810203028

### 3.5 Research note on regression test selection
- An industrial study with OMICRON electronics found that hardware-dependent system tests are mostly manual and selected by tester judgment. The authors built tool support for prioritization. arXiv 2212.05960 (Dec 2022): https://arxiv.org/abs/2212.05960v1

---

## 4. Physical AI / humanoid market signals in 2026 (brief)
- **Funding:** humanoid funding trackers disagree. Examples: $11.8B across 26 companies (as of 1 Oct 2026); about $8.6B raised in 2026; over $6B by mid-2026. All are **UNVERIFIED** secondary aggregations.
  - https://theroboticlife.com/top-10-humanoid-robot-startups-2026/
  - https://techfundingnews.com/top-humanoid-robot-startups-2026-funding/
- **Figure AI:** Series C over $1B at about $39B valuation (Sep 2025, widely reported, secondary here). Figure 03 deployed at BMW Spartanburg for logistics sequencing (Jul 2026), after the Figure 02 pilot. Unit counts not disclosed. The Robot Report https://www.therobotreport.com/bmw-group-deploys-figure-03-humanoid-after-tests-previous-version/
- **Apptronik:** $520M Series A extension, Feb 2026; Series A over $935M total (secondary). https://techfundingnews.com/top-humanoid-robot-startups-2026-funding/
- **Galbot (China):** RMB 2.5B (about $362M), Mar 2026; eyeing a Hong Kong IPO. Caixin, 3 Mar 2026 https://www.caixinglobal.com/2026-03-03/galbot-raises-362-million-in-fresh-funding-eyes-hong-kong-ipo-102418742.html ; TechNode, 2 Mar 2026 https://technode.com/2026/03/02/humanoid-robot-maker-galbot-raises-rmb-2-5-billion/
- **Boston Dynamics / Hyundai:** production Atlas unveiled at CES (Jan 2026). Deployment at Hyundai's Georgia Metaplant targeted by 2028. Hyundai plans robot factory capacity of up to 30,000 units/year. The Register, 6 Jan 2026 https://www.theregister.com/2026/01/06/boston_dynamics_atlas_production/
- **Tesla Optimus:** early production on a Fremont line per the Q3 2026 update. Musk expects design, reliability and lifespan issues to be worked through by about end-2027. Weekly-volume figures are **UNVERIFIED**. https://driveteslacanada.ca/?p=126159
- **Agility Robotics:** reportedly going public via SPAC (Churchill Capital Corp XI). **UNVERIFIED** (secondary). https://newmarketpitch.com/blogs/news/humanoid-robotics-top-startups
- **Validation / safety bottlenecks reported:**
  - No published humanoid-specific safety standard: ISO 25785-1 still in draft, so no third-party certification is available against it (mid-2026). https://www.physicalaijournal.org/post/humanoid-deployment-evidence-report-2026
  - IEEE study: no standardized test methods for balance and recovery safety functions (Sep 2025). Link in section 2.
  - The Robot Report 2026 outlook: "Safety is the key to scale" (Jan 2026). https://www.therobotreport.com/wp-content/uploads/2026/01/TheRobotReport2026_outlook.pdf
  - South Korea is building a humanoid safety certification centre (Seoul Economic Daily, 1 Jul 2026). https://en.sedaily.com/finance/2026/07/01/korea-races-to-build-safety-certification-for-humanoid
  - Hardware-test data platforms raised at high valuations in 2026 (Nominal at $1B, Sift $42M; see section 3), which signals investor demand for this category.

---

## 5. Accelerators

### 5.1 Y Combinator
- **Schedule:** YC now runs four batches a year (Winter, Spring, Summer, Fall).
- **Winter 2027 (W27):** applications opened about Oct 2026. **On-time deadline: 2 Nov 2026, 8pm PT (passed).** Decisions for on-time applicants by about 11 Dec 2026. Late applications are still considered without a guaranteed timeline. Batch runs about Jan–Mar 2027 in San Francisco.
  - YC on X: https://x.com/ycombinator/status/2111183078072979886
  - Roundfunded: https://www.roundfunded.com/en/blogs/yc-application-deadlines-2026-2027
  - Decision date and batch dates are from secondary sources (**UNVERIFIED**).
- **Spring 2027:** deadline not officially published; "early Feb 2027" is a single-blog projection (**UNVERIFIED**). Check https://www.ycombinator.com/apply
- **Standard deal:** **$500k total = $125k on a post-money SAFE for 7% + $375k on an uncapped MFN SAFE.** Structure unchanged since 2022 and still described as current for W26/S26/W27. YC also keeps pro-rata rights. No 2026 change found.
  - Roundfunded: https://www.roundfunded.com/en/blogs/yc-standard-deal-equity-explained-2026
  - Flowjam: https://www.flowjam.com/blog/y-combinator-funding-amount-2026
  - Primary page https://www.ycombinator.com/deal not fetched. Treat as verified by multiple secondaries, but confirm on the primary page.

### 5.2 a16z speedrun
- **Terms:** up to **$1M = $500k for 10% upfront via SAFE + $500k into the next round within 18 months**. Over $5M in partner credits. No board seat. About 12-week residency in SF.
  - a16z page: https://a16z.com/applications-for-a16z-speedrun-sr007-are-now-open/
  - Ventera: https://www.ventera-partners.com/accelerators/a16z-speedrun/
- **Timing:** SR007 ran 27 Jul – 11 Oct 2026. **SR008 applications reportedly closed 1 Nov 2026**, with the cohort about late Jan – Apr 2027 (**UNVERIFIED**; sources conflict; one says rolling). Check https://speedrun.a16z.com

---

## Source list (primary or most authoritative first)
1. EUR-Lex, Reg. (EU) 2026/1744 (Digital Omnibus on AI), OJ 24 Jul 2026 — https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (not fetched)
2. European Commission, "AI Omnibus enters into force", Jul 2026 — https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (not fetched)
3. NI Assembly explanatory memorandum on Reg. 2026/1744, 2026 — https://www.niassembly.gov.uk/globalassets/committee-blocks/windsor-framework-democratic-scrutiny-committee/reg-eu-20261744/regulation-eu-2026_1744-em.pdf
4. EU-OSHA, Regulation 2023/1230 — https://osha.europa.eu/en/legislation/directive/regulation-20231230eu-machinery
5. Eurogip, MR 2023/1230 and the AI Omnibus, 2026 — https://eurogip.fr/en/machinery-regulation-2023-1230-what-the-digital-omnibus-on-ai-changes/
6. Bratby Law, amended AI Act timetable — https://bratby.law/digital-omnibus-ai-high-risk-delay/
7. techUK, 7 May 2026 — https://www.techuk.org/insights/news/eu-ai-omnibus-deal-reached-more-clarity-on-ai-act-obligations
8. SGS, May 2026 — https://www.sgs.com/news/2026/05/eu-ai-act-omnibus-update-more-time-to-prepare
9. CEMA joint industry call, 19 Jan 2026 — https://www.cema-agri.org/publications/18-news-publications/1118-joint-industry-call-on-cybersecurity-and-the-machinery-regulation
10. IBF, postponement summary — https://www.ibf-solutions.com/en/news-and-knowledge/technical-papers-and-news-on-ce-marking/postponement-of-mr-requirements-for-cybersecurity-and-ai
11. IBF, harmonised standards status — https://www.ibf-solutions.com/en/seminars-and-news/news/new-machinery-regulation-status-of-harmonised-standards
12. CEN-CENELEC machinery webinar, 14 Sep 2026 — https://www.cencenelec.eu/media/CEN-CENELEC/Events/Webinars/2026/2026-09-14_machinery_webinar_final.pdf
13. UL, Navigating MR 2023/1230 — https://www.ul.com/resources/navigating-new-eu-machinery-regulation-eu-20231230
14. ISO 10218-2:2025 — https://www.iso.org/standard/73934.html ; A3 FAQ Mar 2025 — https://www.automate.org/robotics/blogs/updated-iso-10218-faq
15. ISO/PAS 8800:2024 — https://www.iso.org/standard/83303.html
16. ISO/IEC TR 5469:2024 (DIN Media) — https://www.dinmedia.de/en/standard/din-iso-iec-tr-5469/390310047
17. Pilz on EN ISO 13849-1 — https://www.pilz.com/en-INT/support/law-standards-norms/functional-safety/en-iso-13849-1/index.html
18. FprEN IEC 61508-2:2026 — https://standards.iteh.ai/catalog/standards/clc/4fc38f85-86a4-44e4-9886-833277194c8b/fpren-iec-61508-2-2026
19. SRES, ISO 26262 3rd ed. — https://sres.ai/functional-safety/updates-on-the-third-edition-of-the-iso-26262-standard/
20. SCC, ANSI/CAN/UL 3300 — https://scc-ccn.ca/standardsdb/standards/4032203
21. i-SCOOP, ISO 25785-1 — https://www.i-scoop.eu/iso-25785-1-explained-and-what-it-means-for-humanoid-robot-safety/
22. IEEE humanoid pathway study, Sep 2025 — https://www.therobotreport.com/wp-content/uploads/2025/09/IEEE-Humanoid-Report-of-Future-Standards-Development.pdf
23. Nominal $80M, GlobeNewswire 5 Mar 2026 — https://www.globenewswire.com/news-release/2026/03/05/3250350/0/en/nominal-valued-at-1b-as-founders-fund-leads-80m-acceleration-round.html
24. Nominal AFTC IDIQ, 14 Apr 2026 — https://www.globenewswire.com/news-release/2026/04/14/3273124/0/en/nominal-awarded-53-million-idiq-contract-to-support-modernization-of-air-force-test-center-data-infrastructure.html
25. Nominal STRATFI, 26 Oct 2026 — https://nominal.io/blog/stratfi
26. Sift $42M — https://www.siftstack.com/mission-critical/we-raised-42m-to-replace-the-legacy-tooling-hardware-engineers-still-depend-on ; Sift docs — https://docs.siftstack.com/overview/what-is-sift ; Sift Agents (IT Brief, Sep 2026) — https://itbrief.com.au/story/sift-launches-ai-agent-to-tackle-hardware-telemetry
27. Foxglove $40M, Business Wire 12 Nov 2025 — https://www.businesswire.com/news/home/20251112126106/en/Foxglove-Raises-%2440-Million-Series-B-to-Power-the-Future-of-Physical-AI
28. Rerun $17M, TechCrunch 20 Mar 2025 — https://techcrunch.com/2025/03/20/reruns-open-source-ai-platform-for-robots-drones-and-cars-revs-up-with-17m-seed
29. Applied Intuition Series F, Jun 2025 — https://kyodonewsprwire.jp/release/202506170725
30. Marple, tech.eu 26 Sep 2024 — https://tech.eu/2024/09/26/marple-the-data-analysis-platform-for-engineers-secures-new-investment-to-fuel-growth/
31. Emerson SystemLink, Jul 2025 — https://www.emerson.com/en/corporate/news/2025/emerson-expands-access-to-test-management-for-engineering-teams ; NI Nigel in FlexLogger — https://www.ni.com/docs/en-US/bundle/flexlogger/page/nigel-capabilities.html
32. MathWorks Simulink Test regression — https://au.mathworks.com/help/sltest/ug/regression-test-workflow.html
33. Keysight PathWave Test Automation — https://www.keysight.com/at/de/product/KS8400B/pathwave-test-automation.html
34. Xray Marketplace — https://marketplace.atlassian.com/apps/1211769/xray-test-management-for-jira
35. Galbot, Caixin 3 Mar 2026 — https://www.caixinglobal.com/2026-03-03/galbot-raises-362-million-in-fresh-funding-eyes-hong-kong-ipo-102418742.html
36. BMW / Figure 03, The Robot Report — https://www.therobotreport.com/bmw-group-deploys-figure-03-humanoid-after-tests-previous-version/
37. Atlas production, The Register 6 Jan 2026 — https://www.theregister.com/2026/01/06/boston_dynamics_atlas_production/
38. Humanoid deployment evidence report 2026 — https://www.physicalaijournal.org/post/humanoid-deployment-evidence-report-2026
39. YC W27 announcement (X) — https://x.com/ycombinator/status/2111183078072979886 ; YC deal explainer — https://www.roundfunded.com/en/blogs/yc-standard-deal-equity-explained-2026
40. a16z speedrun — https://a16z.com/applications-for-a16z-speedrun-sr007-are-now-open/
