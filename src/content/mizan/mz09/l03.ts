import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz09-l03",
  title: "Historians and data access: PI System, exports, APIs and data-sharing agreements",
  summary:
    "How plant historians store data (exception and swinging-door compression, recorded versus interpolated versus time-weighted values), what the AVEVA PI System and its peers offer for getting data out, the ladder of access methods from a CSV by email to a live API, why getting data out of a plant is slow in practice, and what a data-sharing agreement for a research pilot must contain.",
  minutes: 75,
  objectives: [
    "Explain exception and compression in a historian and why recorded values are irregular in time",
    "Choose between recorded, interpolated and time-weighted average values for an analytics export, and compute a time-weighted average",
    "Lay out the ladder of data access methods with who must approve each, and estimate a bulk API extraction",
    "Draft the key terms of a data-sharing agreement for a soiling pilot with a research partner",
  ],
  concepts: [
    { id: "mz09.historian", name: "Process historian", description: "Time-series database for industrial data (for example AVEVA PI, AVEVA Historian, GE Proficy, Canary, Ignition) that collects from SCADA and devices, compresses, stores for years and serves queries.", competency: "mz-data", related: ["m12.monitoring-system"] },
    { id: "mz09.historian-compression", name: "Exception and swinging-door compression", description: "Historian filters that discard values within a deadband of the last reported value (exception) or of a straight-line trend (swinging door), so stored values are irregular and reconstructed by interpolation.", competency: "mz-data" },
    { id: "mz09.retrieval-modes", name: "Recorded, interpolated and time-weighted values", description: "The three ways to read a historian: the archived points as stored, values interpolated at chosen times, or time-weighted summaries over intervals.", competency: "mz-data" },
    { id: "mz09.access-ladder", name: "Data access ladder", description: "From manual exports to scheduled files, read-only API, replication and live streaming: each step needs more approval and gives fresher data.", competency: "mz-data" },
    { id: "mz09.data-sharing-agreement", name: "Data-sharing agreement", description: "Contract fixing data scope, purpose, security, confidentiality, ownership of derived results, publication rights, retention and deletion for operational data shared with a third party.", competency: "mz-data", related: ["fc08.data-rights", "fc08.pilot-contract"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "How historians store data, and how you get it out",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`For most analytics start-ups the slowest step of a pilot is not the algorithm but the first clean extract. At Shagaya Phase I the historian, export tools and approval path are unknown to Mizan today. Knowing how historians compress data, what to ask for, and which agreement unlocks it shortens the pilot by months, and stops you from building a model on interpolated straight lines that were never measured.`,
        },
        {
          kind: "md",
          md: md`### What a historian is

A **process historian** is a time-series database built for industrial plants. It collects values from SCADA and devices through **interfaces or connectors** (OPC UA, OPC DA, Modbus, vendor APIs), timestamps and compresses them, stores them for years, and serves queries to displays, reports and analysis tools.

The reference product is the **PI System**, created by OSIsoft and owned by AVEVA since 2021 (AVEVA itself has been part of Schneider Electric since 2023). Its parts, which you will hear named:
- **PI Data Archive**: the time-series server.
- **PI Interfaces and Connectors**: collectors that read from source systems.
- **PI Asset Framework (AF)**: an asset hierarchy with templates ("Inverter" with attributes AC power, DC current...) that maps tags to equipment. If a plant has a well-built AF, the naming problem of lesson 1 is largely solved.
- **PI Vision**: web displays. **PI DataLink**: Excel add-in, often how O&M engineers export data.
- **PI Web API**: a REST interface for programmatic reads. **PI SQL / OLEDB**: SQL-style access.
- **PI-to-PI replication**: copies data to a second PI server, often in a DMZ, so external users never touch the plant's server.

Other historians in power and process plants: AVEVA Historian (formerly Wonderware), GE Proficy Historian, Siemens Process Historian, Canary, Inductive Automation Ignition with a database back end, and open-source time-series databases. Many PV plants also rely on **vendor monitoring platforms** (inverter makers' clouds, independent PV monitoring and SCADA providers) that keep their own copy of the data with their own export tools and terms.

### Exception and compression

Historians store far fewer points than they receive, in two stages:

1. **Exception** (at the interface): a new value is passed on only if it differs from the last passed value by more than a deadband, or a maximum time has elapsed.
2. **Compression** (at the archive): the PI System uses a **swinging-door** algorithm. It keeps a point only when a straight line from the last archived point can no longer pass within the compression deviation of all values received since. A slowly rising irradiance in the morning becomes a few points joined by straight lines.

Consequences an analyst must know:
- **Stored values are irregular in time.** A "1 second" tag may have one stored value every few minutes when it changes smoothly, and many when it changes fast.
- **Deadbands set resolution.** A power tag with a compression deviation of 1 % of a 4 MW range cannot resolve changes below 40 kW in the stored history: fine for energy, too coarse for small string-level effects.
- **Gaps can be invisible.** If communication fails and the system does not write a "no data" or "I/O timeout" state, an interpolated query draws a straight line across the outage.

### Three ways to read a historian

| Mode | What you get | Use for | Danger |
|---|---|---|---|
| **Recorded (archived) values** | The stored points, at their irregular times | Audits, event analysis | Simple averages of irregular points are biased |
| **Interpolated values** | Values computed at regular times by linear interpolation (or step for digital states) | Plots, alignment | Fabricates values across gaps; snapshots miss what happened between |
| **Time-weighted summaries** | Average, min, max, count over each interval, weighted by duration | **Analytics exports** | Must state how gaps are treated (percent good) |

For soiling analytics, ask for **time-weighted averages over fixed intervals** (for example 5 minutes) for analogs, **with a percent-good or count field**, plus **recorded values** for status and alarm tags.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "What a historian stores versus what the sensor saw (illustrative POA irradiance, one morning hour)",
          xKey: "t",
          xLabel: "Minutes after 10:00",
          yLabel: "W/m²",
          series: [
            { key: "true", label: "Sensor (1 min means)" },
            { key: "stored", label: "Reconstructed from archived points" },
          ],
          data: [
            { t: 0, true: 500, stored: 500 },
            { t: 1, true: 520, stored: 520 },
            { t: 5, true: 528, stored: 531 },
            { t: 10, true: 545, stored: 545 },
            { t: 15, true: 553, stored: 559 },
            { t: 20, true: 572, stored: 572 },
            { t: 25, true: 583, stored: 586 },
            { t: 30, true: 600, stored: 600 },
            { t: 40, true: 604, stored: 603 },
            { t: 50, true: 606, stored: 607 },
            { t: 60, true: 610, stored: 610 },
          ],
          caption: "Synthetic data. Swinging-door compression keeps only the points at 0, 1, 30 and 60 minutes; the history between is straight lines within the compression deviation. Fine for energy, but a simple average of the four stored points is wrong (worked example).",
        },
      ],
    },
    {
      layer: "applied",
      title: "Averages from compressed data, and the cost of a bulk extract",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Simple mean of recorded values versus time-weighted average",
          given: md`Illustrative archived POA values for 10:00 to 11:00: 10:00 500 W/m², 10:01 520, 10:30 600, 11:00 610. The historian interpolates linearly between archived points.`,
          steps: [
            { md: md`**Simple mean of the four recorded values:** $(500 + 520 + 600 + 610)/4 = 557.5$ W/m².` },
            { md: md`**Time-weighted average** (trapezoids between points): 10:00 to 10:01, mean 510 over 1 min; 10:01 to 10:30, mean 560 over 29 min; 10:30 to 11:00, mean 605 over 30 min.` },
            { md: md`$\bar G = (510 \times 1 + 560 \times 29 + 605 \times 30)/60 = 34{,}900/60 = 581.7$ W/m².` },
            { md: md`**Error of the simple mean:** $581.7/557.5 - 1 = 4.3$ %. The two early points, one minute apart, get half the weight in the simple mean though they cover one minute of sixty.` },
          ],
          result: md`Averaging recorded values understates this hour's irradiance by 4.3 %, which would show up directly as a 4 % error in the performance index: a month of soiling in Kuwait. Always ask the historian for time-weighted averages, or compute them yourself from recorded values.`,
        },
        { kind: "equation", formula: "mz09-api-calls" },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: planning a bulk extraction through a REST API",
          given: md`Illustrative: 400 tags, 3 years at 1 minute (525,600 values per tag per year), server limit $M = 150{,}000$ values per call (a common default for the PI Web API, but check the server), 1.5 s per call, run sequentially at night.`,
          steps: [
            { md: md`Values $= 400 \times 525{,}600 \times 3 = 630{,}720{,}000$.` },
            { md: md`$N_{calls} = \lceil 630{,}720{,}000/150{,}000 \rceil$.`, hidden: true, check: { prompt: "Number of calls", answer: 4205, tolerance: { abs: 1 }, unit: "calls" } },
            { md: md`$T = 4{,}205 \times 1.5$ s, in minutes.`, hidden: true, check: { prompt: "Extraction time", answer: 105.1, tolerance: { rel: 0.02 }, unit: "min" } },
          ],
          result: md`About 1 h 45 min of continuous calls: feasible overnight, but it loads a production server, so agree the window with the operator, extract month by month, and checkpoint so a failure does not restart the whole job. Asking for 5 minute time-weighted averages instead cuts the work five-fold.`,
        },
        {
          kind: "question",
          question: {
            id: "mz09-l03-p1",
            type: "numeric",
            prompt: md`Archived values of a power tag over 10 minutes: 0 min 2.0 MW, 2 min 2.4 MW, 10 min 2.4 MW (linear interpolation between points). What is the time-weighted average power in MW?`,
            answer: 2.36,
            tolerance: { abs: 0.005 },
            unit: "MW",
            explanation: md`Segment 1: mean 2.2 MW over 2 min; segment 2: 2.4 MW over 8 min. $\bar P = (2.2 \times 2 + 2.4 \times 8)/10 = (4.4 + 19.2)/10 = 2.36$ MW. The simple mean of the three points, 2.27 MW, is 4 % low.`,
            concepts: ["mz09.retrieval-modes", "mz09.historian-compression"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Getting the data out in practice",
      blocks: [
        {
          kind: "md",
          md: md`### The access ladder

| Step | Method | Freshness | Who must approve | Typical lead time |
|---|---|---|---|---|
| 1 | O&M engineer exports CSV (PI DataLink, HMI report, vendor portal) and shares it | Weeks old | Plant manager | Days to weeks |
| 2 | Scheduled export to a secure file share (SFTP or encrypted cloud folder) | Daily to monthly | Plant manager, IT | Weeks |
| 3 | Read-only API account on a DMZ server (PI Web API, OPC UA) | Minutes | IT, OT security, sometimes the SCADA vendor | Months |
| 4 | Replication to a server Mizan can query (PI-to-PI into a DMZ or a Mizan-hosted historian) | Near real time | IT, OT security, licence owner | Months |
| 5 | Edge gateway streaming outbound (lesson 2) | Seconds to minutes | All of the above plus change control | Months |

Start at step 1 or 2 for the methodology phase of a pilot. Climb only when a live product needs it, and let the customer's security team choose the step.

### Why it is slower than anyone expects

- **Nobody's job.** The O&M engineer has a plant to run; exports for a third party are an unpaid side task.
- **Licences.** Historian client access and API use can be licensed per user or per connection; the plant may not own a licence for external access, and the SCADA vendor may charge for configuration.
- **Ownership chains.** Owner, operator, O&M contractor and vendor each believe someone else must agree.
- **Security review** for anything beyond a file.
- **Undocumented tags** (lesson 1) and **time conventions** (lesson 5) discovered only after the first extract.
- **Government procedures**: for a public research body, data sharing may need institutional approval and legal review.

### What a data-sharing agreement contains

A data-sharing agreement (DSA) can be a standalone document or a schedule to the pilot agreement. Founder Core covers NDAs, pilots and IP in general; the venture-specific points for a plant-data pilot with a research partner are below.`,
        },
        { kind: "xref", to: "fc08-l07", note: "General contract mechanics (NDAs, pilot agreements, IP assignment) are in Founder Core; add the data-specific clauses below as a schedule." },
        {
          kind: "checklist",
          title: "Data-sharing agreement: clauses for a soiling pilot",
          items: [
            "Parties and roles: data provider (plant owner or operator), recipient (Mizan), research partner; who can approve changes",
            "Purpose limitation: soiling analysis and cleaning-decision methodology for the named plant; no other commercial use without consent",
            "Data scope: tag list, period, resolution, records (cleaning, maintenance, sensor logs), delivery method and frequency",
            "Security: storage location, encryption, access control, named individuals, breach notification",
            "Hosting and residency: where data may be stored and processed (in Kuwait, in a named cloud region, on premises)",
            "Confidentiality: plant data stays confidential; aggregate or anonymised results may be disclosed as agreed",
            "Ownership: raw data stays with the provider; ownership of derived results, models and software stays with the party that created them, with a licence to the provider for its own use",
            "Publication: co-publication rights with the research partner, review period before submission, what plant identifiers may appear",
            "Retention and deletion: deletion or return within a set period after the pilot, with written confirmation",
            "Term, termination and liability caps; no warranty on data accuracy from the provider",
          ],
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Kuwait hosting and data rules",
          md: md`Kuwait's telecom regulator CITRA has issued data privacy and cloud computing regulations. Whether they, or KISR's internal policies, restrict hosting operational plant data of a public research body outside Kuwait was not verified. Plant data is usually not personal data, but government entities may still require in-country hosting. Ask KISR's legal and IT departments early and offer an in-Kuwait or on-premises option.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "Turn the research partner's interest into speed",
          md: md`KISR researchers want publications; KISR as plant operator wants better cleaning decisions. A DSA that gives the researchers clear co-publication rights (with plant identifiers agreed in advance) gives them a reason to push the data request through their own institution. The study design itself is module mz10.`,
        },
        {
          kind: "question",
          question: {
            id: "mz09-l03-p2",
            type: "short",
            prompt: md`Write a **one-page term sheet for the data-sharing agreement** between KISR (as operator of Shagaya Phase I) and Mizan for the targeted soiling pilot, with KISR researchers as methodology partner. Use headed bullet points; mark anything you would need KISR to decide.`,
            rubric: [
              "Defines purpose narrowly (soiling and cleaning-decision methodology for the named plant) and the data scope (tags, period, resolution, logs, delivery method)",
              "Keeps raw data ownership with KISR and states who owns derived results, models and software, with a licence back to KISR",
              "Covers security, hosting location and residency as a KISR decision, and named access",
              "Gives co-publication rights to KISR researchers and Mizan with a review period and agreed plant identifiers",
              "Covers retention, deletion or return at the end, term and termination",
              "Does not claim the pilot is signed or running and does not invent numbers about Shagaya",
            ],
            modelAnswer: md`**Term sheet: data sharing for the Shagaya Phase I soiling pilot (draft for discussion; pilot in preparation)**

- **Parties:** KISR (data provider and plant operator); Mizan (recipient); KISR research team (methodology partner and co-author).
- **Purpose:** develop and validate a method to turn operational data into soiling estimates and cleaning decisions for Shagaya Phase I PV. No other use without KISR's written consent.
- **Data scope:** tag list in Annex A (inverter power and status, irradiance, temperatures, wind, PPC setpoint, meter); 1 to 5 minute time-weighted averages with quality; period from commissioning to date, including 2018 to 2019; cleaning, maintenance and sensor calibration logs; drawings and datasheets.
- **Delivery:** phase 1 monthly encrypted exports to a KISR-approved share; any live connection only under a separate security approval.
- **Ownership:** raw data remains KISR's. Mizan owns its software and generic models; results specific to Shagaya are jointly available; KISR receives a perpetual licence to use the reports and plant-specific outputs internally.
- **Security and hosting:** storage location **[KISR to decide: in Kuwait, named cloud region, or on KISR premises]**; encryption at rest and in transit; access limited to named Mizan staff; breach notice within 72 hours.
- **Confidentiality:** plant data confidential for 5 years after term; aggregated or anonymised results may be disclosed as agreed.
- **Publication:** KISR researchers and Mizan may co-publish; 30-day review before submission; plant name and capacity may appear **[KISR to confirm]**, raw data may not be released without consent.
- **Retention:** raw data deleted or returned within 30 days of the end of the pilot, with written confirmation.
- **Term:** 12 months, extendable; either party may terminate with 30 days' notice. No warranty on data accuracy; liability capped.`,
            explanation: md`The strongest term sheets are narrow on purpose, explicit on ownership of derived work and publication, and leave the hosting decision visibly to the data owner. That makes it easy to approve inside a public institution.`,
            concepts: ["mz09.data-sharing-agreement", "mz09.access-ladder"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to Omar Abu Harb why the first extract from a plant historian should be time-weighted averages with a percent-good field, not interpolated values or raw recorded points.",
          keyPoints: [
            "Historians store compressed, irregular points",
            "Interpolated values are snapshots and can draw straight lines across communication gaps",
            "Simple averages of recorded points are biased toward periods with many points",
            "Time-weighted averages give the true interval mean",
            "Percent good reveals gaps so bad intervals can be excluded",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz09-l03-q1",
      type: "mcq",
      prompt: md`What does swinging-door compression do?`,
      options: [
        "Encrypts values before storage",
        "Keeps a point only when a straight line from the last archived point can no longer stay within the compression deviation of the values received since",
        "Stores one value per minute regardless of change",
        "Removes all values at night",
      ],
      answer: 1,
      explanation: md`Swinging door is a trend-based filter: the history is reconstructed as straight lines between archived points, accurate to within the compression deviation. Stored data is therefore irregular in time.`,
      concepts: ["mz09.historian-compression"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "mz09-l03-q2",
      type: "mcq",
      prompt: md`Which retrieval mode should a soiling analytics export use for analog tags?`,
      options: ["Interpolated values every 15 minutes", "Time-weighted averages over fixed intervals with a percent-good field", "The last recorded value of each day", "Simple mean of recorded values"],
      answer: 1,
      explanation: md`Time-weighted averages give the true interval mean regardless of compression; percent good reveals gaps. Interpolated snapshots and simple means are both biased.`,
      concepts: ["mz09.retrieval-modes"],
      difficulty: 1,
    },
    {
      id: "mz09-l03-q3",
      type: "order",
      prompt: md`Order the data access methods from least to most approval effort.`,
      items: ["Manual CSV export by the O&M engineer", "Scheduled export to a secure file share", "Read-only API account on a DMZ server", "Replication to a server the vendor can query", "Edge gateway streaming outbound"],
      explanation: md`Each step gives fresher data and touches more systems, so it needs more approvals (IT, OT security, licence owner, change control). Start low for methodology work.`,
      concepts: ["mz09.access-ladder"],
      difficulty: 1,
    },
    {
      id: "mz09-l03-q4",
      type: "numeric",
      prompt: md`An extraction of 250 tags for 2 years at 1 minute runs through an API returning at most 100,000 values per call. How many calls are needed?`,
      answer: 2628,
      tolerance: { abs: 1 },
      unit: "calls",
      explanation: md`Values $= 250 \times 525{,}600 \times 2 = 262{,}800{,}000$; calls $= \lceil 262{,}800{,}000/100{,}000 \rceil = 2{,}628$.`,
      concepts: ["mz09.access-ladder"],
      difficulty: 2,
    },
    {
      id: "mz09-l03-q5",
      type: "multi",
      prompt: md`Which clauses are specific and important in a data-sharing agreement for a research pilot? (Select all.)`,
      options: ["Purpose limitation", "Co-publication rights and review period", "Deletion or return of data at the end", "Exclusive distribution rights for Mizan in Kuwait", "Ownership of derived results and models"],
      answer: [0, 1, 2, 4],
      explanation: md`Exclusive distribution rights belong in a distribution agreement, not in a DSA; putting them there would slow approval. The others define what the data may be used for and who owns the outputs.`,
      concepts: ["mz09.data-sharing-agreement"],
      difficulty: 2,
    },
    {
      id: "mz09-l03-q6",
      type: "decision",
      prompt: md`An interpolated 15 minute export shows a perfectly straight line in POA irradiance from 11:00 to 14:00 on a clear day. What do you conclude?`,
      options: [
        { text: "The sky was stable; keep the data", score: 0, feedback: "A clear-sky irradiance curve is not a straight line over three hours around noon." },
        { text: "Likely a communication gap that interpolation bridged; check recorded values and quality, and exclude the period", score: 1, feedback: "Right: straight lines across hours are a classic sign of missing archived points." },
        { text: "The sensor is broken; discard the whole month", score: 0.3, feedback: "Too drastic before checking the recorded values and the quality flags." },
      ],
      explanation: md`Interpolation fabricates values across gaps. Ask for recorded values or time-weighted averages with percent good to detect it.`,
      concepts: ["mz09.retrieval-modes", "mz09.historian-compression"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz09-l03-f1", front: "PI System parts to recognise", back: "Data Archive, Interfaces/Connectors, Asset Framework, PI Vision, DataLink, PI Web API, PI-to-PI", concepts: ["mz09.historian"] },
    { id: "mz09-l03-f2", front: "Exception vs compression", back: "Exception: deadband vs last passed value (at interface). Compression: swinging-door trend test (at archive).", concepts: ["mz09.historian-compression"] },
    { id: "mz09-l03-f3", front: "Three historian retrieval modes", back: "Recorded, interpolated, time-weighted summaries", concepts: ["mz09.retrieval-modes"] },
    { id: "mz09-l03-f4", front: "Danger of interpolated values", back: "They draw straight lines across gaps and sample snapshots", concepts: ["mz09.retrieval-modes"] },
    { id: "mz09-l03-f5", front: "Where to start on the access ladder for a pilot", back: "Manual or scheduled encrypted exports; climb only when a live product needs it", concepts: ["mz09.access-ladder"] },
    { id: "mz09-l03-f6", front: "Who owns raw plant data in a DSA", back: "The provider (owner/operator); derived results and software ownership must be stated separately", concepts: ["mz09.data-sharing-agreement"] },
  ],
};

export default lesson;
