# PV Soiling, Cleaning & Stow Control: Kuwait/Gulf Research Brief

Prepared 2026-11-06. Scope: science, standards, commercial landscape, Kuwait market status, Gulf O&M context. Nothing here is about the startup itself.

## How this was verified (read first)

- Every claim comes from web search results that quote or summarise the source. **WebFetch could not reach most primary hosts from this session.** meed.com, guest.meed.com, tamimi.com and hukseflux.com did not resolve, so I could not open the full articles.
- That means the claims are **search-snippet level**. Nothing was checked against the full text. Before any claim goes into a pitch, grant or contract, open the URL and confirm it.
- **UNVERIFIED** means the snippets do not support the claim, the sources disagree, or the date is unknown.
- "Date" is the publication date shown with the source. "n.d." means I could not see one.

---

## 1. Soiling science: state of the art

### 1.1 Typical soiling rates: Kuwait and the Gulf

| Location | Rate | Source / date | Status |
|---|---|---|---|
| Dry climates (general) | ~0.1–1 %/day for PV | Ilse et al. review, as summarised by PV-Tech, "PV soiling in dry climates: causes, impacts and solutions" (n.d.) https://www.pv-tech.org/pv-soiling-in-dry-climates-causes-impacts-and-solutions | Verified at snippet level |
| Qatar, QEERI Outdoor Test Facility, fixed tilt | **0.49 %/day** average (~13 % in a month with no rain or cleaning). Higher in winter because of overnight dew | PV-Tech, "Challenges of PV soiling in desert climates" (n.d.) https://www.pv-tech.org/challenges-of-pv-soiling-in-desert-climates/ | Verified at snippet level |
| Qatar, Doha, 4-year study | −0.43 ± 1.0 %/day (6-monthly cleaning); −0.46 ± 1.05 %/day (2-monthly cleaning) | HBKU repository, "Multi-year field assessment of seasonal variability of photovoltaic soiling…" (Solar Energy, 2020) https://elmi.hbku.edu.qa/en/publications/multi-year-field-assessment-of-seasonal-variability-of-photovolta/ | Verified at snippet level |
| Qatar, same study | 75 % of days had soiling build up; 25 % had natural recovery (wind resuspension). Dust storms raised the annual mean soiling rate by 23 % | same | Verified at snippet level |
| Kuwait, Shagaya 11.15 MW PV | Soiling "substantial", needs **monthly water cleaning**. Dust storms can cut PV output by **30 % instantly** | Al-Rasheedi et al., RSER 133 (Nov 2020), see 1.2 | No %/day figure found. **UNVERIFIED** as a daily rate |
| Kuwait (review table) | ~17 % power loss after 6 days of exposure | J. Eng. Appl. Sci. review, table 2 (2021/22) https://jeas.springeropen.com/articles/10.1186/s44147-021-00052-6/tables/2 | Original study not named in the snippet. **UNVERIFIED** |
| Kuwait (review table) | 45.8 % (Azda) and 42 % (Sawda) total soiling loss after 3 months | same | Cumulative, original authors not named. **UNVERIFIED** |
| Saudi Arabia / UAE | No measured %/day found. Only cumulative figures, e.g. ~10 % after 5 weeks in the UAE | same review | **UNVERIFIED** |

**Working assumption for Kuwait:** about 0.3–0.6 %/day on clean-start fixed-tilt modules, with large jumps after dust storms. This is extrapolated from Qatar data and the Shagaya practice of monthly cleaning. It is **not a measured Kuwait %/day value.** I found no published Shagaya soiling-station data for 2022–2026.

### 1.2 Key papers (with citations)

- **Shagaya PV paper (the "Al-Khayat 2020" paper).** Al-Khayat is the third author, not the first.
  - Citation: M. Al-Rasheedi, C. A. Gueymard, M. Al-Khayat, A. Ismail, J. A. Lee, H. Al-Duaj, "Performance evaluation of a utility-scale dual-technology photovoltaic power plant at the Shagaya Renewable Energy Park in Kuwait," *Renewable and Sustainable Energy Reviews* 133 (Nov 2020) 110139, DOI 10.1016/j.rser.2020.110139.
  - Sources: https://ideas.repec.org/a/eee/rensus/v133y2020ics1364032120304305.html and https://impacts.ucar.edu/en/publications/performance-evaluation-of-a-utility-scale-dual-technology-photovo/
  - Content: 11.15 MW plant with a thin-film section and a poly-Si section, monitored for 25 months. The two sections performed alike. Soiling is substantial and the plant is water-cleaned monthly. Dust storms cause sudden drops of about 30 %. The full text was not read, so PR values and soiling losses are **UNVERIFIED**.
- **Ilse et al. 2019 (Joule).** K. Ilse, L. Micheli, B. W. Figgis, K. Lange, D. Daßler, H. Hanifi, F. Wolfertstetter, V. Naumann, C. Hagendorf, R. Gottschalg, J. Bagdahn, "Techno-Economic Assessment of Soiling Losses and Mitigation Strategies for Solar Power Generation," *Joule* 3(10) (2019) 2303–2321, DOI 10.1016/j.joule.2019.08.019.
  - Open-access PDF: https://iris.uniroma1.it/retrieve/e383532e-8068-15e8-e053-a505fe0a3de9/Ilse_Techno-Economic_2019.pdf
  - Headline: soiling cut global output by ~3–4 % in 2018 (≥ €3–5 bn/yr), projected to reach 4–7 % (€4–7 bn) by 2023.
  - The list of co-authors after Figgis is from memory and was not checked: **UNVERIFIED**. The first three authors, the journal, volume, pages and DOI were confirmed.
- **Deceglie SRR (stochastic rate and recovery).** M. G. Deceglie, L. Micheli, M. Muller, "Quantifying Soiling Loss Directly From PV Yield," *IEEE J. Photovoltaics* 8(2) (2018) 547–551.
  - Implemented in NREL RdTools as `rdtools.soiling.soiling_srr` / `SRRAnalysis`.
  - Method: find cleaning events (positive steps), fit each soiling interval with Theil-Sen, then run a Monte Carlo to get a P50 insolation-weighted soiling ratio with confidence interval.
  - RdTools 3.x defaults: `clean_criterion='shift'`, `method='half_norm_clean'`.
  - Docs: https://rdtools.readthedocs.io/en/3.2.0/generated/rdtools.soiling.soiling_srr.html. Sandia PVPMC slides: https://pvpmc.sandia.gov/download/4755
  - Do not confuse with Deceglie et al. JPV 9(2) 2019 476–482, which is about degradation.
- **Micheli / Muller soiling-extraction work:**
  - L. Micheli, M. Theristis, A. Livera, J. S. Stein, G. E. Georghiou, M. Muller et al., "Improved PV Soiling Extraction Through the Detection of Cleanings and Change Points," *IEEE JPV* (2021). Adding change points to cleaning detection improves extraction. Data: 9 soiling stations plus a 1 MW site. https://iris.uniroma1.it/retrieve/e383532e-cadc-15e8-e053-a505fe0a3de9/Micheli_Improved%20PV_post-print_2021.pdf and https://www.osti.gov/pages/servlets/purl/1860330
  - Muller et al., Progress in Photovoltaics (2021): compares automated cleaning-event detection on inverter data from 22 PV systems.
  - Micheli et al. 2020, "Extracting and generating PV soiling profiles…": https://iris.uniroma1.it/retrieve/e383532e-9ae5-15e8-e053-a505fe0a3de9/Micheli_postprint_Extracting_2020.pdf
  - Fernández-Solas, Micheli et al. 2022, comparison of five analytical extraction methods: https://iris.uniroma1.it/retrieve/e383532e-8e74-15e8-e053-a505fe0a3de9/Fernandez-Solas_Estimation_2022.pdf
- **IEA PVPS Task 13 soiling report.** "Soiling Losses – Impact on the Performance of Photovoltaic Power Plants," Report IEA-PVPS T13-21:2022 (Dec 2022, posted Jan 2023). https://iea-pvps.org/wp-content/uploads/2023/01/IEA-PVPS-T13-21-2022-REPORT-Soiling-Losses-PV-Plants.pdf and https://iea-pvps.org/key-topics/soiling-losses-impact-on-the-performance-of-photovoltaic-power-plants/
  - Findings: soiling is the factor with the largest yield effect after irradiance. Multi-sensor networks are needed because soiling varies within and across plants.
  - Excludes bird droppings and moss.
  - The authorship label "NREL/IEA" in the brief is loose. This is an IEA PVPS Task 13 report; NREL staff are among the contributors.
- **GCC review.** E. Fares, M. Buffiere, B. Figgis, Y. Haik, R. J. Isaifan, "Soiling of photovoltaic panels in the Gulf Cooperation Council countries and mitigation strategies," *Sol. Energy Mater. Sol. Cells* 231 (Oct 2021) 111303. https://elmi.hbku.edu.qa/en/publications/soiling-of-photovoltaic-panels-in-the-gulf-cooperation-council-co/
- **Tracker stow and soiling:**
  - Figgis et al. (Solar Energy, 2019). Deposition peaks at ~45° tilt toward the wind; accumulation peaks at ~22° tilt away from the wind. Their conclusion: stow 1-axis trackers at maximum tilt toward the wind at night. https://elmi.hbku.edu.qa/en/publications/effect-of-tilt-angle-on-soiling-in-perpendicular-wind/
  - Khan et al., *Prog. Photovolt.* (2024, DOI 10.1002/pip.3736), Saudi Arabia. Anti-soiling coating plus **vertical night stow** cut soiling losses by up to 85 %. The stow effect alone was not isolated. https://ouci.dntb.gov.ua/works/4Lw1z5w7

### 1.3 Dew and cementation mechanisms

These come mainly from Qatar (QEERI, Fraunhofer CSP).

- **Mechanism:** dew forms at night and in early morning. Soluble species in the dust layer dissolve, then recrystallise as the glass dries. This "cements" particles to the glass, and dry brushing can no longer remove them.
  - Ilse et al. 2018 found needle-shaped crystals of **palygorskite** clay precipitating on the glass.
  - An earlier 2016 Doha study found the needles to be mainly Si/Mg/Al oxides, which challenges the idea that salt drives cementation. The mineralogy is still debated.
  - Sources: https://elmi.hbku.edu.qa/en/publications/comprehensive-analysis-of-soiling-and-cementation-processes-on-pv/ ; https://elmi.hbku.edu.qa/en/publications/microstructural-analysis-of-the-cementation-process-during-soilin/ ; https://elmi.hbku.edu.qa/en/publications/dew-as-a-detrimental-influencing-factor-for-soiling-of-pv-modules/ (Ilse et al. 2019)
- **Night-time heating** of the glass suppresses dew. This sharply reduces cementation, particle caking and capillary aging.
- **Condensation is not only harmful.** Running droplets can clean the glass. Condensation can also start when the glass is a few °C *above* the dew point computed from weather data, so measuring it directly beats inferring it. See Figgis et al. 2022 (IEEE JPV and Solar Energy): https://elmi.hbku.edu.qa/en/publications/condensation-as-a-predictor-of-pv-soiling/ and https://elmi.hbku.edu.qa/en/publications/condensation-characterization-for-pv-soiling/
- **What this means for a pilot:** night stow angle, dew-point and glass-temperature sensing, and the timing of dry versus wet cleaning are all physically motivated control levers.

### 1.4 Aerosols and AERONET in Kuwait

- **AERONET "Kuwait_University" site** (name as commonly used; confirm on the AERONET site).
  - Location: CIMEL sun photometer on Kuwait University's Khalidiyah campus, Kuwait City, about 29.32°N, 47.97°E, 42 m. Operating almost continuously since 2008.
  - Sources: Kokkalis et al. 2018 and arXiv 2511.19738 (Nov 2025). https://mdpi.com/2072-4292/10/11/1807/html and https://arxiv.org/pdf/2511.19738
  - I found **no confirmed KISR-operated AERONET site** and no AERONET site at Shagaya: **UNVERIFIED**. KISR does run radiometric stations; five were installed in Kuwait in 2012, per Al-Rasheedi et al., EuroSun 2014: https://proceedings.ises.org/conference/eurosun2014/papers/eurosun2014-0137-AlRasheedi.pdf
- **Kokkalis et al., "Long-Term Ground-Based Measurements of Aerosol Optical Depth over Kuwait City,"** *Remote Sensing* 10(11) 1807 (Nov 2018). https://www.mdpi.com/2072-4292/10/11/1807
  - Covers 2008–2017.
  - Dust events push AOD500 to 0.75–2.91.
  - Sand and dust storms occur on about **20 days/year** on average.
  - Iraq and Iran are significant source regions (~21 %).
  - I did not get the annual mean AOD: **UNVERIFIED**.
- **Other Kuwait dust statistics:**
  - Safar (1980) counts ~255 "dusty days"/yr in Kuwait (storms, rising dust and suspended dust together). Springer chapter: https://link.springer.com/chapter/10.1007/978-3-030-66977-5_1
  - Only the spring dust trend is statistically significant.
  - Gueymard et al. report a slight increase in MERRA-2 AOD since about 2000.

### 1.5 Satellite and reanalysis soiling proxies

- **Solargis soiling model.** Uses PM2.5 and PM10 from MERRA-2 and CAMS EAC4. Validated against 51 ground stations: it overestimates where soiling is low and underestimates where it is high. Wet deposition is not modelled. https://kb.solargis.com/docs/validation-of-the-soiling-loss-model (n.d.)
- **Solcast.** MERRA-2 PM for history and CAMS for live and forecast soiling. Blog of 18 Dec 2025: https://solcast.com/blog/modelling-pv-soiling-new-parameters
- **Australia study.** MERRA-2 beat CAMS on dust AOD near Lake Eyre. *Applied Energy* 310 (2022). https://ideas.repec.org/a/eee/appene/v310y2022ics030626192200099x.html
- **West Africa study.** An adjusted Coello soiling model driven by MERRA-2 and satellite PM roughly halved the error. *Applied Energy* 340 (2023). https://ideas.repec.org/a/eee/appene/v340y2023ics0306261923003574.html
- **EGU26 supplement (2026).** A mass-balance soiling model is very sensitive to deposition parameters. The authors call for co-located atmospheric, dust-mass and soiling-loss data. https://presentations.copernicus.org/EGU26/EGU26-7339_supplement.pdf
- **Main gap:** reanalysis PM is a coarse proxy, and ground soiling sensors are still needed to calibrate site-level rates. HMM, dust-storm detection and CAMS forecasts are the common operational inputs.

---

## 2. Standards and performance metrics

### 2.1 IEC 61724-1:2021 (Ed. 2): soiling ratio

- **Definition.** Soiling ratio SR = output of a naturally soiled reference ÷ output of a clean reference. In practice SR = G_soiled / G_clean, or the Isc or Pmax ratio, corrected for temperature.
  - Sources: Kipp & Zonen news (on the 2017 edition): https://www.kippzonen.com/News.aspx?id=952 ; OTT HydroMet blog: https://blog.otthydromet.com/en/soiling-measurement-is-included-in-iec-standard-61724-1
  - Preview of clause 9.4 "Soiling ratio": https://cdn.standards.iteh.ai/samples/103495/228d2e8349ad44c48fa00dcdf55c1cfd/IEC-61724-1-2021.pdf
- **Two methods are recognised.** Vendor material maps Campbell DustVue 20 to "method 1" and DustVue 10 to "method 2" under IEC 61724-1:2021. https://s.campbellsci.com/documents/us/product-brochures/dustvue10-dustvue20-cleanpower.pdf
  - Vendor pages say the standard prefers **co-located clean and soiled PV reference devices**.
  - Which method is the reference-device method and which is the optical/transmission one: **UNVERIFIED**. The normative text was not accessible.
- **Class A requirement.**
  - Under the 2017 edition, soiling measurement is **mandatory for Class A when expected soiling losses exceed 2 %**, and optional for Class B and C (Kipp & Zonen).
  - Whether the 2021 edition keeps the same threshold: **UNVERIFIED**. The Hukseflux "what is new in 2021" PDF exists but could not be fetched: https://www.hukseflux.com/uploads/inline/iec_61724-1_2021_version-what_is_new_v2403_0.pdf
- **Practical notes from the standard, via vendors:**
  - The clean reference must be cleaned regularly. A dirty "clean" device makes SR read better than it is.
  - Using data only within ±2 h of solar noon may be advisable.
  - The clean device should be heated to clear frost (largely irrelevant in Kuwait).
- **Sensor density example.** Kipp & Zonen suggests, for 25 MW, one DustIQ in the middle and one near each corner (2018 newsletter). https://www.kippzonen.com/Download/975/Newsletter-44-April-2018

### 2.2 Temperature- / weather-corrected PR

- **Report.** T. Dierauf, A. Growitz, S. Kurtz, J. L. Becerra Cruz, E. Riley, C. Hansen, *Weather-Corrected Performance Ratio*, NREL/TP-5200-57991 (April 2013). https://www.nrel.gov/docs/fy13osti/57991.pdf and https://www.osti.gov/servlets/purl/1078057
- **Content.** Standard PR moves with the season. Correcting to an annual-average cell temperature (weighted Tref, eq. 5) removes the weather bias, so the metric can back performance guarantees. The report includes a test protocol.
- **Open-source implementation:** `pvanalytics.metrics.performance_ratio_nrel`. https://pvanalytics.readthedocs.io/en/stable/generated/pvanalytics.metrics.performance_ratio_nrel.html
- **Hot vs cold climates.** Gopi et al. 2021 found the correction matters most in cold climates and has less effect in tropical ones (via FAO AGRIS). https://agris.fao.org/search/en/providers/122535/records/65dfa5184c5aef494fe3f4bb
  - My inference: Kuwait's large seasonal temperature swing (very hot summers, mild winters) means correction still matters there. **UNVERIFIED**.

### 2.3 IEC 61724-3 status

- **Current edition:** IEC **TS** 61724-3:2016 (Ed. 1.0, a Technical Specification), "Energy evaluation method," published 2016-07-19, Corrigendum 1 in 2018. https://webstore.iec.ch/en/publication/25466
- **Edition 2:** listed as "in development" on a national standards-body life-cycle page (no date). https://dps.gov.al/en/project/show/iec:proj:21779
  - Whether Ed. 2 was published by Nov 2026: **UNVERIFIED**.
- **Related:** IEC TS 61724-2:2016 (capacity evaluation). Australia adopted Part 3 as SA/SNZ TS 61724.3:2020 (modified).

---

## 3. Commercial landscape in 2026

### 3.1 Soiling analytics and sensors

| Player | Offering | Size / funding | Source / date |
|---|---|---|---|
| **Swish Solar** (Waterloo, Canada) | SwishOS: AI soiling modelling and cleaning-schedule optimisation from existing plant data, no extra hardware. Priced on a sliding scale by plant capacity. Early customers in North America and the Middle East; Renko Energy (Turkey, 12 sites) named | US$1.5 M pre-seed, led by Friday Ventures, Nov 2025 | https://mercomindia.com/swish-solar-raises-1-5-million-in-pre-seed-funding (Nov 2025); pv magazine on SwishOS (Mar 2026) https://www.pv-magazine.com/?p=68473 ; a "$100K seed" listing at trysignalbase is **UNVERIFIED** |
| **Kipp & Zonen DustIQ** (OTT HydroMet) | Optical transmission soiling sensor with an internal light source; no moving parts, works without sunlight. Firmware update Mar 2022. Early user: Green Energy Park, Morocco (since Feb 2018) | Part of OTT HydroMet | https://www.kippzonen.com/press-release-and-news/soiling-research-at-green-energy-park-with-dustiq ; https://solarbuildermag.com/operations-maintenance/ott-hydromet-updates-kipp-zonen-dustiq-soiling-system/ . No Gulf deployment confirmed: **UNVERIFIED** |
| **Fracsun ARES** | Clean vs soiled reference cells with a daily automatic wash of the clean cell; self-powered; cellular link to a cloud portal | DOE SBIR-backed. 100 units at 52 sites (2020 DOE story); "850+ units in 27+ countries" per catalogue (n.d.) | https://www.energy.gov/eere/success-stories/articles/eere-success-story-plug-and-play-device-streamlines-solar-cleaning ; https://pdf.directindustry.com/pdf/fracsun-inc/pv-soiling-monitoring-solution/245450-1098682.html |
| **Atonometrics** (Austin, TX) | Soiling sensors and monitors (RDE line, from memory). CTO M. Gostein presented at PVQAT | n/a | https://s.campbellsci.com/documents/us/miscellaneous/pvqat-pv-soiling-monitoring-stations-webinar.pdf (2017). Product details **UNVERIFIED** |
| **Campbell Scientific DustVue 10/20** | Soiling sensors marketed against IEC 61724-1:2021 method 1 and method 2; ±1 % accuracy claimed | n/a | https://s.campbellsci.com/documents/us/product-brochures/dustvue10-dustvue20-cleanpower.pdf |
| **Raptor Maps** | Aerial and robotic inspection plus software; flags soiling among other faults | Series A $5 M (2020), Series B $22 M (2022), **Series C $35 M (Dec 2024, led by Maverix)** | https://mercomindia.com/raptor-maps-closes-35-million-in-series-c-funding (Dec 2024) |
| **Power Factors** | Unity renewable energy management suite (REMS, introduced 2023). Acquired Inaccess (2022) and Arista Renewable Energies. Listed in Mubadala's portfolio | Mubadala-backed | https://www.pv-tech.org/power-factors-expands-renewables-software-offer-with-inaccess-acquisition/ ; https://www.mubadala.com/en/what-we-do/power-factors . Reported May 2026 deal to buy Uplight's energy management unit: **UNVERIFIED**. Soiling-specific module: **UNVERIFIED** |
| **3E SynaptiQ** | Asset performance management SaaS with Solar Analytics (AI loss diagnosis). 25 GW connected in 160 countries (Sep 2024); later reports say >50 GW | 3E (Brussels) | https://www.3e.eu/resources/news/synaptiq-by-3e-us-renewable-energy-operations-smarter-asset-performance-management ; HG investment item https://onestopesg.com/esg-news/hg-3e-renewable-energy-software-investment (**UNVERIFIED** date and details) |
| **Clir Renewables** | Wind and solar analytics; a listing says it detects soiling | CAD 27 M raise (2021) | https://www.krowdbase.com/software/clir ; no 2025 acquisition found: **UNVERIFIED** |
| **Alectris** | ACTIS: data acquisition, monitoring and service management (enterprise resource planning for renewables, "EPR"); O&M provider | n/a | https://www.cypruswork.com/company/5180/alectris/ . Soiling features **UNVERIFIED** |
| **Solargis / Solcast** | Soiling-loss models from MERRA-2 and CAMS PM data (see 1.5) | n/a | see 1.5 |

### 3.2 Cleaning robots and services

| Player | Key facts | Source / date |
|---|---|---|
| **Ecoppia** (Israel, listed in Tel Aviv) | Waterless E4 and tracker-mounted robots. Claims >7 GW awarded globally (date n.d.). Middle East sites include Israel/Jordan border 40 MW and an O&M contract at Benban, Egypt (1,650 MWp park; year **UNVERIFIED**). A UAE deal was reported by Gulf News after the Abraham Accords (n.d.) | https://ecoppia.com/media/press?page=2 ; https://www.nacleanenergy.com/solar/ecoppia-strengthens-its-presence-in-the-middle-east-with-a-first-project-in-egypt ; https://gulfnews.com/business/israeli-robotic-solar-cleaning-company-ecoppia-signs-first-landmark-deal-in-the-uae-with-the-support-of-ifiicc-1.1620281182686 |
| **NOMADD** (Saudi Arabia, KAUST spin-off, founded 2012) | Waterless desert robots. Aramco technology licence (Sep 2017). US$1 M from KAUST Innovation Fund (date **UNVERIFIED**). NEOM adoption announced (date **UNVERIFIED**) | https://www.wamda.com/en/2017/09/saudi-aramco-licenses-nomadd-create-waterless-cleaning-systems ; https://innovation.kaust.edu.sa/kaust-startup-supports-neoms-solar-power/ ; https://pv-tech.org/saudi-arabian-solar-module-cleaning-technology-start-up-secures-us1-million |
| **SolarCleano** (Luxembourg) | Semi-autonomous and autonomous robots. Firm order plus option for **500 robots in China** (Sep 2025). Says it is active in 90+ countries. Funding unclear (CB Insights: $50 K grant) | https://chronicle.lu/category/innovation/56752-luxembourg-based-solarcleano-expands-into-china-with-500-robot-deal ; https://www.cbinsights.com/company/solarcleano |
| **Airtouch Solar** (Israel, listed in Tel Aviv) | Water-free robots. IPO raised $18 M at $124 M post-money. ~8.3 GWp contracted / 4.4 GWp installed (early 2024), mostly India (ReNew, Adani, Amplus). Eyeing MENA; no Gulf contract found | https://mercomindia.com/airtouch-raises-18-million-ipo ; https://pv-magazine-india.com/2024/02/21/airtouch-solar-secures-a-48-mw-pv-project-with-vena-energy |
| **SUNPURE** (China) | ~3,000 "Venus" robots for Al Ajban PV (UAE), running daily (Jan 2026). Also SAAD 2 (1,100 MW, Saudi Arabia, Feb 2024) | https://www.saudigulfprojects.com/2026/01/sunpure-to-supply-uaes-first-pv-project-using-module-fitting-robots ; https://solarquarter.com/2024/02/26/sunpure-and-powerchina-huadong-partner-for-1100mw-saad-2-project-in-saudi-arabia-introducing-pv-cleaning-robots-for-enhanced-solar-efficiency/ |
| Others | LEAPTING, Solarlit, Solavio Labs, Desert Solar Tech (Riyadh) | https://solarquarter.com/2025/02/10/revolutionizing-solar-panel-cleaning-in-the-middle-east-an-interview-with-frank-chen-director-mena-region-solarlit/amp/ |

### 3.3 Tracker vendors: dust stow and soiling-aware features

**Main finding:** no major tracker vendor publicly markets a dedicated "dust-storm stow" or soiling-optimised night-stow product. Public material covers wind, hail, snow and diffuse-light modes, plus compatibility with cleaning robots. This looks like a white space. That conclusion rests on public material only and is **UNVERIFIED** against vendor manuals.

- **Nextracker (renamed Nextpower)**
  - NX Navigator control system and Hail Pro (stows up to 4× faster, works through grid outages). Wind and hail stows to about 60–75°, triggered by forecasts.
  - Sources: https://www.pv-tech.org/nextracker-unveils-new-products-targeting-hail-uneven-terrain-and-fast-atmospheric-changes/ ; https://prnewswire.com/news-releases/nextracker-releases-nx-navigator-control-system-for-utility-scale-solar-power-plants-300998276.html ; rebrand: https://en.wikipedia.org/wiki/Nextpower
- **Array Technologies**
  - SmarTrack modules: backtracking, Diffuse (flattens under overcast skies), Snow, and Hail Alert Response (third-party weather data). DuraTrack Hail XP stows to 77° without batteries (May 2025).
  - No soiling or cleaning mode found.
  - Sources: https://arraytechinc.com/?p=572 ; https://www.pv-magazine.com/2025/05/19/array-technologies-releases-solar-tracker-with-77-degree-hail-stow
- **GameChange Solar**
  - Genius Tracker with SmartStow (wind) and HailStow (verified by VDE).
  - Explicitly markets desert durability (dust, abrasion) and **integration with robotic cleaners**. Large Saudi footprint.
  - Sources: https://www.gamechangesolar.com/news/from-hurricanes-to-desert-storms-how-genius-tracker-delivers-when-conditions-get-tough ; https://www.gamechangesolar.com/news/gamechange-solar-announces-seamless-integration-of-genius-tracker-with-robotic-cleaners
- **Arctech**
  - SkyLine II is dominant in the Middle East: >14 GW regional awards, 2.3 GW Saudi supply (Jul 2025), 2.1 GW UAE, Manah I in Oman with a 22 m/s wind stow speed.
  - No sandstorm mode found.
  - Sources: https://www.pv-magazine.com/2025/07/29/arctech-to-supply-trackers-for-shanghai-electrics-2-3-gw-solar-plant-in-saudi-arabia/ ; https://esgmena.com/arctech-awarded-contract-for-500mw-manah-i-pv-plant-in-oman/
- **Ideematec** supplied trackers for Al Kharsaah (Qatar) and tied the 190 m tracker length to robotic cleaning. https://www.qatar-tribune.com/article/201340/BUSINESS/Ideematec-solar-tracker-to-be-installed-in-Al-Kharsaah-plant
- **Evidence for soiling-aware stow:**
  - Figgis 2019: tilt toward the wind at night.
  - Khan 2024: vertical night stow plus coating, up to −85 %.
  - Cal Poly student study (2020): 52° night stow gave ~20 % less soiling loss in the first week; small dataset. https://surp.calpoly.edu/2020/photovoltaic-array-soiling-reduction-through-optimization-of-stowing-angle

---

## 4. Kuwait renewables status (as of early Nov 2026)

### 4.1 Al-Dibdibah / Al-Shagaya Phase III

**Zone 1 (1,100 MW PV IPP, KAPP-procured, 30-year PPA with MEWRE, includes a 400 kV substation)**

- Three of the six prequalified bidders submitted bids. MEED reported this on 28 Jan 2026: https://www.meed.com/kuwait-receives-bids-for-shagaya-solar-plant
- The three consortia:
  - ACWA Power + Alternative Energy Projects Co.
  - **Masdar + Fouad AlGhanim & Sons**
  - EDF Renewables + A. A. Al-Sagar & Bros + KOWEPO
- Financial bids were due to open in late June 2026 (Zawya via now.solar, 24 Jun 2026): https://now.solar/2026/06/24/kuwait-set-to-open-financial-bids-for-1-1gw-shagaya-solar-pv-project-zawya/
- In June 2026 a winner was expected in Q3 (SolarQuarter, 3 Jun 2026): https://solarquarter.com/2026/06/03/kuwait-nears-decision-on-1-1-gw-al-shagaya-solar-project-as-renewable-energy-expansion-advances/
- **The Masdar / Fouad AlGhanim & Sons consortium was selected.** MEED reported this on **13 Aug 2026** (https://www.meed.com/kuwait-selects-developer-for-shagaya-zone-one-plant) and ICE relayed it on 16 Aug 2026 (https://www.ice.it/it/news/notizie-dal-mondo/307588).
- A source dated 29 Jul 2026 said the award was awaiting State Audit Bureau approval.
- Not confirmed:
  - **Winning tariff:** **UNVERIFIED** (not found).
  - **PPA signing or financial close:** **UNVERIFIED** (not found).
- Commercial operation is not expected before 2027 at the earliest.

**Zone 2 (500 MW PV IPP)**

- Five bidders were shortlisted in Oct 2025: https://www.pv-magazine.com/2025/10/07/kuwait-shortlists-five-bidders-for-500-mw-solar-project/
- The RFP was issued in Nov 2025: https://solarquarter.com/2025/11/27/kuwait-launches-bidding-for-500-mw-al-dibdibah-shagaya-phase-iii-solar-project
- The deadline was extended to 30 Apr 2026 (SolarQuarter, 20 Feb 2026): https://solarquarter.com/2026/02/20/kuwait-extends-bidding-deadline-for-500-mw-shagaya-zone-2-solar-project/
- Bids were submitted, but the count is unclear:
  - MEED (Jul/Aug 2026) reports at least three consortia: https://guest.meed.com/consortiums-submit-bids-for-shagaya-zone-two-plant/
  - Zawya reports two: https://www.zawya.com/en/projects/kuwait-opens-technical-bids-for-500mw-shagaya-solar-project-411778
- Preferred bidder: **UNVERIFIED** (none found).

**Background**

- The earlier KNPC "Al-Dibdibah" 1.5 GW PV scheme was folded into the KAPP Phase III programme. This is background knowledge and is **UNVERIFIED** here.
- KISR's earlier recommended Phase III mix was 1,200 MW PV + 200 MW CSP + 100 MW wind. https://www.reutersevents.com/renewables/node/61064

### 4.2 Shagaya Phase I (KISR)

- Phase I is 70 MW in total:
  - 50 MW parabolic-trough CSP with storage, commissioned late 2018 / early 2019
  - 10 MW wind, May 2017
  - 10 MW PV, reported as 11.15 MW in the RSER paper
- After completion, KISR transferred ownership to the Ministry of Electricity and Water (MEW, now MEWRE).
- Sources: https://meconstructionnews.com/33566/kuwait-launches-phase-one-of-shagaya-renewable-energy-park/amp ; https://www.inkl.com/news/kuwait-inaugurates-renewable-energy-project-with-70-mw-production-capacity ; https://insights.worley.com/case-studies/shagaya-renewable-energy-project
- **No 2026 operational news on Phase I was found** (performance, refurbishment, tenders): **UNVERIFIED**.
- The Energy Year profile of KISR research is undated: https://theenergyyear.com/articles/foundational-research-for-kuwaits-energy-transition/

### 4.3 Battery storage (BESS)

- MEWRE announced a 1–1.5 GW / 4–6 GWh BESS programme on 11 Nov 2025: https://solarquarter.com/2025/11/11/kuwait-plans-one-of-middle-easts-largest-battery-storage-projects-to-strengthen-grid-reliability-and-accelerate-renewable-energy-transition/ ; https://www.agbi.com/energy/2025/11/kuwait-turns-to-battery-storage-to-ease-power-crisis
- Sites at Al-Mutlaa City and Jaber Al-Ahmad City were approved in June 2026. The programme is about 1,500 MW, phased, with a first phase of about 500 MW, aiming to support summer peaks from 2027. https://www.meed.com/kuwait-approves-sites-for-15gw-battery-storage-projects ; https://www.zawya.com/projects/utilities/kuwaits-mewre-secures-approval-for-15gw-battery-storage-project-sites-mftj5nif
- A US Commercial Service profile says award is expected in H2 2026: **UNVERIFIED**. https://www.trade.gov/market-intelligence/kuwaits-battery-energy-storage-market

### 4.4 Thermal IWPPs (affect grid and policy context)

- **Az-Zour North 2 & 3 IWPP**
  - ~2,700 MW combined-cycle gas plant plus SWRO desalination, BOT, 25-year term. ACWA Power + Gulf Investment Corp.
  - ~US$4.1 bn ECWPA signed in Aug 2025. Project company: Gulf Alliance for Power and Water (KAPP / ACWA / GIC).
  - Start-up targeted for about 2029.
  - Financial close: **UNVERIFIED** (not found).
  - Sources: https://solarquarter.com/2025/08/12/acwa-power-consortium-signs-agreement-for-az-zour-north-phase-2-3-iwpp-in-kuwait ; https://acwapower.com/en/media-center/latest-news/his-royal-highness-prince-abdulaziz-bin-salman-witnesses-the-signing-of-the-acwa-gic-consortium-energy-conversion-and-water-purchase-agreement-for-az-zour-north-phase-2-3-iwpp-with-the-state-of-kuwait-ministry-of-electricity-water-and-renew/
- **Al-Khairan Phase 1 IWPP**
  - 1,800 MW plus desalination. Sources conflict on water capacity (125 MIGD vs 150,000 m³/d) and on fuel. BOOT structure.
  - RFP issued Sep 2025 (https://solarquarter.com/2025/09/01/kapp-announces-request-for-proposals-for-al-khairan-phase-1-iwpp). The deadline slipped repeatedly.
  - **Bids received 1 Jun 2026** from two consortia: TAQA + A. H. Al-Sagar, and ACWA + GIC. https://www.meed.com/kuwait-receives-bids-for-al-khairan-phase-one-iwpp
  - Award: **UNVERIFIED** (not found).

### 4.5 Targets and policy

- **Targets.** A MEWRE renewables official cites **30 % by 2030, 40 % by 2040, 50 % by 2050**, upgraded from 15 % around April 2024. https://theenergyyear.com/articles/towards-full-realisation-of-kuwaits-renewables-potential/
  - MEED (2024): about 22.1 GW of renewables by 2030 under a 2030–2050 strategy launched by then-Minister Salem Al-Hajraf. https://guest.meed.com/kuwait-eyes-22gw-of-renewable-energy-by-2030
- **Realistic outlook.** Rystad (Sep 2025): ~3.3 GW of renewables (≈7 % share) by 2030 and 10.1 GW solar by 2035. Pv magazine puts solar alone at 2.9 GW by 2030. Both are far below target. https://www.pv-magazine.com/2025/09/24/kuwait-forecast-to-reach-2-9-gw-of-solar-by-2030-10-1-gw-by-2035/
- **Minister.**
  - Sabeeh Al-Mukhaizeem was MEWRE minister in a May 2025 report.
  - Current office-holder in Nov 2026: **UNVERIFIED**.
- **National Assembly.**
  - Dissolved by Amiri order on 10 May 2024, with some constitutional articles suspended for "not exceeding four years" (so up to about May 2028). Legislative power passed to the Amir and the Council of Ministers, which now legislates by decree-law.
  - Decree-Law 63/2025 suspended the Assembly's internal regulations law.
  - Sources: https://constitutionnet.org/news/kuwaits-monarch-dissolves-parliament-and-suspends-constitutional-provisions ; https://www.arabtimesonline.com/news/kuwait-suspends-national-assemblys-internal-regulations-amid-parliamentary-freeze
  - No 2026 change found. Status unchanged: **UNVERIFIED** (likely).
  - **What it means:** procurement and PPP decisions move by decree, and the Audit Bureau remains a gate.
- **Public Tenders Law.**
  - The cabinet approved a draft decree-law amending **Law 49/2016** on 9 Sep 2026 (Deloitte): https://www.deloitte.com/middle-east/en/services/tax/perspectives/kuwait-cabinet-approves-draft-amendments-to-the-public-tenders-law.html
  - **Decree-Law No. 94 of 2026** was published in the Official Gazette (Kuwait Al-Youm), issue 1810, on 27 Sep 2026. It takes effect **three months after publication (about late Dec 2026)**. Al Tamimi, 29 Sep 2026: https://www.tamimi.com/news/kuwait-amends-the-public-tenders-law/ ; Kuwait Times: https://kuwaittimes.com/article/52959/kuwait/kuwait-seeks-transparency-in-procurement/
  - The stated aim is to simplify procedures and remove obstacles in practice. The detailed changes were not read: **UNVERIFIED**.
  - **Why it matters:** this governs Central Agency for Public Tenders (CAPT) procurement. That likely includes any MEWRE- or KISR-procured O&M or analytics service, unlike KAPP PPP/IPP deals, which fall under the PPP law. This applicability is my inference and is **UNVERIFIED**.

---

## 5. Gulf utility-scale PV O&M and cleaning practice

| Plant | Capacity | Cleaning practice | Source / date |
|---|---|---|---|
| **Noor Abu Dhabi** (Sweihan, UAE) | 1.18 GW | **1,430 dry (waterless) robots**, >3.3 M panels, no water. Travel distance quoted as 800 km/day (official site) vs 1,600 km/day (Wikipedia) | https://noorabudhabi.ae/plants/robotic-cleaning-system/ (n.d.) |
| **Al Dhafra** (UAE) | 2 GW | Cleaning practice not confirmed in sources found: **UNVERIFIED** | https://www.pv-magazine.com/tag/robotic-solar-panel-cleaners |
| **Al Ajban** (UAE) | ~1.5 GW (from memory: **UNVERIFIED**) | ~3,000 SUNPURE robots, daily cleaning | Saudi Gulf Projects, Jan 2026 (above) |
| **Al Kharsaah** (Qatar, TotalEnergies / Marubeni / QatarEnergy) | 800 MWp | **Semi-automated cleaning of every module once every 4 days** (operator). Pre-construction plans said robots | https://renewables.totalenergies.com/node/681 ; https://www.pv-magazine.com/2022/10/19/totalenergies-marubeni-switch-on-800-mw-of-solar-in-qatar |
| **Sudair** (Saudi Arabia, ACWA / Badeel / SAPCO) | 1.5 GW | Bifacial modules on trackers with automated robotic cleaning (NOMAC). Waterless status **UNVERIFIED** | https://www.nomac.com/en/our-operations/nomac-globally/sudair-pv-ipp |
| **Al Shuaibah 1&2** (Saudi Arabia) | 2.6 GW total (2.06 GW for Shuaibah 2) | Arab News describes daily fully automated robot cycles at large Saudi plants; the link to Shuaibah specifically is **UNVERIFIED** | https://www.arabnews.pk/node/2600704 |
| **SAAD 2** (Saudi Arabia) | 1.1 GW | SUNPURE robots (Feb 2024) | above |
| **Shagaya PV** (Kuwait) | 11.15 MW | **Monthly water cleaning** | RSER 2020 |

### Cleaning cost data (sparse; treat with care)

- **Middle East 70 MW plant test.** Two Exosun robots cleaned 4.5 MW for about **$18,000/yr**, against about **$30,000/yr** for manual truck cleaning. That works out to about $4.0 k/MW/yr vs $6.7 k/MW/yr (my arithmetic). The source is a vendor-related test, and the year was not confirmed.
  - PV-Tech "Keeping it clean" PDF: https://www.pv-tech.org/wp-content/uploads/legacy-publication-pdfs/8d0330c11f-keeping-it-clean.pdf
  - Reuters Events: https://www.reutersevents.com/renewables/node/59153
- **Cleaning frequency.** UAE-type high-soiling plants are cleaned about **40–45 times per year**. https://www.pv-tech.org/pv-soiling-in-dry-climates-causes-impacts-and-solutions
- **Vendor estimate (OxMaint, May 2026).** Manual crews about $40 k/MW/yr; waterless robots about $4 k; wet robots $8–15 k. Vendor-oriented and inconsistent with the test above: **UNVERIFIED**. https://oxmaint.com/industries/power-plant/solar-pv-module-cleaning-soiling-robotic-cleaner-programs
- **Ilse et al. 2019** gives regional cleaning-cost ranges. Exact $/m² values were not extracted: **UNVERIFIED**.
- **No published per-cleaning $/MWp figure was found for Gulf IPPs.**
- **Market trend.** New Gulf GW-scale plants mostly install waterless robots on trackers, often Chinese-supplied (SUNPURE, LEAPTING) or Israeli (Ecoppia, Airtouch, in the UAE after 2020). Small legacy plants such as Shagaya Phase I still use water and trucks.

---

## 6. Key gaps and next checks

1. Shagaya-specific measured soiling rate (%/day): get the RSER 2020 full text, and any KISR soiling-station or DustIQ data.
2. Shagaya Zone 1 winning tariff and PPA/financial-close status; Zone 2 preferred bidder (MEED or KAPP).
3. The normative text of IEC 61724-1:2021 §9.4 and the Class A table (buy it from the IEC webstore).
4. Whether IEC 61724-3 Ed. 2 has been published.
5. Tracker vendor manuals for any unpublicised "dust/sand stow" or "cleaning position" API, especially Arctech and GameChange, which dominate the Gulf.
6. Confirm the AERONET site name and its Level 2.0 data availability at aeronet.gsfc.nasa.gov.
7. The domains that need allowing for full-text checks: meed.com, guest.meed.com, tamimi.com, hukseflux.com.

---

## Source list (by section)

**Science**
- https://ideas.repec.org/a/eee/rensus/v133y2020ics1364032120304305.html (RSER 133, Nov 2020)
- https://impacts.ucar.edu/en/publications/performance-evaluation-of-a-utility-scale-dual-technology-photovo/
- https://iris.uniroma1.it/retrieve/e383532e-8068-15e8-e053-a505fe0a3de9/Ilse_Techno-Economic_2019.pdf (Joule, 2019)
- https://rdtools.readthedocs.io/en/3.2.0/generated/rdtools.soiling.soiling_srr.html
- https://pvpmc.sandia.gov/download/4755
- https://www.osti.gov/pages/servlets/purl/1860330 (Micheli et al. 2021)
- https://iris.uniroma1.it/retrieve/e383532e-cadc-15e8-e053-a505fe0a3de9/Micheli_Improved%20PV_post-print_2021.pdf
- https://iris.uniroma1.it/retrieve/e383532e-8e74-15e8-e053-a505fe0a3de9/Fernandez-Solas_Estimation_2022.pdf
- https://iea-pvps.org/wp-content/uploads/2023/01/IEA-PVPS-T13-21-2022-REPORT-Soiling-Losses-PV-Plants.pdf (Dec 2022)
- https://elmi.hbku.edu.qa/en/publications/soiling-of-photovoltaic-panels-in-the-gulf-cooperation-council-co/ (Oct 2021)
- https://elmi.hbku.edu.qa/en/publications/multi-year-field-assessment-of-seasonal-variability-of-photovolta/ (2020)
- https://www.pv-tech.org/challenges-of-pv-soiling-in-desert-climates/
- https://www.pv-tech.org/pv-soiling-in-dry-climates-causes-impacts-and-solutions
- https://jeas.springeropen.com/articles/10.1186/s44147-021-00052-6/tables/2
- https://elmi.hbku.edu.qa/en/publications/comprehensive-analysis-of-soiling-and-cementation-processes-on-pv/
- https://elmi.hbku.edu.qa/en/publications/dew-as-a-detrimental-influencing-factor-for-soiling-of-pv-modules/
- https://elmi.hbku.edu.qa/en/publications/condensation-as-a-predictor-of-pv-soiling/
- https://elmi.hbku.edu.qa/en/publications/effect-of-tilt-angle-on-soiling-in-perpendicular-wind/
- https://ouci.dntb.gov.ua/works/4Lw1z5w7 (Khan et al. 2024)
- https://www.mdpi.com/2072-4292/10/11/1807 (Kokkalis 2018)
- https://arxiv.org/pdf/2511.19738 (Nov 2025)
- https://proceedings.ises.org/conference/eurosun2014/papers/eurosun2014-0137-AlRasheedi.pdf (2014)
- https://kb.solargis.com/docs/validation-of-the-soiling-loss-model
- https://solcast.com/blog/modelling-pv-soiling-new-parameters (18 Dec 2025)
- https://ideas.repec.org/a/eee/appene/v310y2022ics030626192200099x.html
- https://ideas.repec.org/a/eee/appene/v340y2023ics0306261923003574.html
- https://presentations.copernicus.org/EGU26/EGU26-7339_supplement.pdf

**Standards**
- https://cdn.standards.iteh.ai/samples/103495/228d2e8349ad44c48fa00dcdf55c1cfd/IEC-61724-1-2021.pdf
- https://www.kippzonen.com/News.aspx?id=952
- https://blog.otthydromet.com/en/soiling-measurement-is-included-in-iec-standard-61724-1
- https://s.campbellsci.com/documents/us/product-brochures/dustvue10-dustvue20-cleanpower.pdf
- https://www.nrel.gov/docs/fy13osti/57991.pdf (Apr 2013)
- https://pvanalytics.readthedocs.io/en/stable/generated/pvanalytics.metrics.performance_ratio_nrel.html
- https://webstore.iec.ch/en/publication/25466 (2016)
- https://dps.gov.al/en/project/show/iec:proj:21779

**Commercial**
- https://mercomindia.com/swish-solar-raises-1-5-million-in-pre-seed-funding (Nov 2025)
- https://www.pv-magazine.com/?p=68473 (Mar 2026)
- https://www.kippzonen.com/press-release-and-news/soiling-research-at-green-energy-park-with-dustiq
- https://www.energy.gov/eere/success-stories/articles/eere-success-story-plug-and-play-device-streamlines-solar-cleaning
- https://mercomindia.com/raptor-maps-closes-35-million-in-series-c-funding (Dec 2024)
- https://www.pv-tech.org/power-factors-expands-renewables-software-offer-with-inaccess-acquisition/ (2022)
- https://www.3e.eu/resources/news/synaptiq-by-3e-us-renewable-energy-operations-smarter-asset-performance-management
- https://ecoppia.com/media/press?page=2
- https://www.wamda.com/en/2017/09/saudi-aramco-licenses-nomadd-create-waterless-cleaning-systems
- https://chronicle.lu/category/innovation/56752-luxembourg-based-solarcleano-expands-into-china-with-500-robot-deal (Sep 2025)
- https://mercomindia.com/airtouch-raises-18-million-ipo
- https://www.pv-tech.org/nextracker-unveils-new-products-targeting-hail-uneven-terrain-and-fast-atmospheric-changes/
- https://arraytechinc.com/?p=572
- https://www.pv-magazine.com/2025/05/19/array-technologies-releases-solar-tracker-with-77-degree-hail-stow
- https://www.gamechangesolar.com/news/gamechange-solar-announces-seamless-integration-of-genius-tracker-with-robotic-cleaners
- https://www.pv-magazine.com/2025/07/29/arctech-to-supply-trackers-for-shanghai-electrics-2-3-gw-solar-plant-in-saudi-arabia/

**Kuwait**
- https://www.meed.com/kuwait-selects-developer-for-shagaya-zone-one-plant (13 Aug 2026)
- https://www.ice.it/it/news/notizie-dal-mondo/307588 (16 Aug 2026)
- https://www.meed.com/kuwait-receives-bids-for-shagaya-solar-plant (28 Jan 2026)
- https://solarquarter.com/2026/06/03/kuwait-nears-decision-on-1-1-gw-al-shagaya-solar-project-as-renewable-energy-expansion-advances/ (3 Jun 2026)
- https://now.solar/2026/06/24/kuwait-set-to-open-financial-bids-for-1-1gw-shagaya-solar-pv-project-zawya/ (24 Jun 2026)
- https://solarquarter.com/2026/02/20/kuwait-extends-bidding-deadline-for-500-mw-shagaya-zone-2-solar-project/ (20 Feb 2026)
- https://guest.meed.com/consortiums-submit-bids-for-shagaya-zone-two-plant/ (Jul/Aug 2026)
- https://www.pv-magazine.com/2025/10/07/kuwait-shortlists-five-bidders-for-500-mw-solar-project/ (Oct 2025)
- https://www.meed.com/kuwait-approves-sites-for-15gw-battery-storage-projects (Jun 2026)
- https://solarquarter.com/2025/11/11/kuwait-plans-one-of-middle-easts-largest-battery-storage-projects-to-strengthen-grid-reliability-and-accelerate-renewable-energy-transition/ (11 Nov 2025)
- https://solarquarter.com/2025/08/12/acwa-power-consortium-signs-agreement-for-az-zour-north-phase-2-3-iwpp-in-kuwait (Aug 2025)
- https://www.meed.com/kuwait-receives-bids-for-al-khairan-phase-one-iwpp (Jun 2026)
- https://theenergyyear.com/articles/towards-full-realisation-of-kuwaits-renewables-potential/
- https://www.pv-magazine.com/2025/09/24/kuwait-forecast-to-reach-2-9-gw-of-solar-by-2030-10-1-gw-by-2035/ (24 Sep 2025)
- https://constitutionnet.org/news/kuwaits-monarch-dissolves-parliament-and-suspends-constitutional-provisions (May 2024)
- https://www.deloitte.com/middle-east/en/services/tax/perspectives/kuwait-cabinet-approves-draft-amendments-to-the-public-tenders-law.html (Sep 2026)
- https://www.tamimi.com/news/kuwait-amends-the-public-tenders-law/ (29 Sep 2026)
- https://meconstructionnews.com/33566/kuwait-launches-phase-one-of-shagaya-renewable-energy-park/amp

**Gulf O&M**
- https://noorabudhabi.ae/plants/robotic-cleaning-system/
- https://renewables.totalenergies.com/node/681
- https://www.pv-magazine.com/2022/10/19/totalenergies-marubeni-switch-on-800-mw-of-solar-in-qatar (19 Oct 2022)
- https://www.nomac.com/en/our-operations/nomac-globally/sudair-pv-ipp
- https://www.arabnews.pk/node/2600704
- https://www.saudigulfprojects.com/2026/01/sunpure-to-supply-uaes-first-pv-project-using-module-fitting-robots (Jan 2026)
- https://www.pv-tech.org/wp-content/uploads/legacy-publication-pdfs/8d0330c11f-keeping-it-clean.pdf
- https://oxmaint.com/industries/power-plant/solar-pv-module-cleaning-soiling-robotic-cleaner-programs (May 2026)
