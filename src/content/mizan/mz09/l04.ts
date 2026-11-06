import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz09-l04",
  title: "Cloud and on-prem architectures for plant analytics: edge gateways, time-series databases, Parquet lakes, pipelines and costs",
  summary:
    "The reference architecture of a plant analytics product, layer by layer: edge gateway with store-and-forward, transport, landing, raw, cleaned and results layers, serving through a time-series database or reports. When to use a time-series database and when a Parquet data lake, long versus wide tables, partitioning, reproducibility, cloud versus on-premises deployment in the Gulf, and what it really costs (spoiler: people, not bytes).",
  minutes: 70,
  objectives: [
    "Draw the layers of a plant analytics pipeline and say what each does and what fails there",
    "Choose between a time-series database and a Parquet data lake, and between long and wide tables, for a given use",
    "Size a gateway buffer and a link, and compute storage cost over several years",
    "Recommend cloud, dedicated tenant or on-premises deployment for a Gulf customer and explain the trade-off",
  ],
  concepts: [
    { id: "mz09.edge-gateway", name: "Edge gateway with store-and-forward", description: "Industrial computer at the site (usually in the DMZ) that reads from SCADA or the historian, buffers data locally during link outages and forwards it outbound, encrypted.", competency: "mz-data" },
    { id: "mz09.tsdb-vs-lake", name: "Time-series database vs Parquet data lake", description: "Always-on database optimised for recent, fast queries (dashboards) versus cheap columnar files on object storage optimised for large batch analysis and reprocessing.", competency: "mz-data" },
    { id: "mz09.pipeline-layers", name: "Raw, cleaned and results layers", description: "Keep immutable raw data, a cleaned and aligned layer with quality flags, and a results layer (daily performance index, soiling ratio, recommendations), each reproducible from the one before.", competency: "mz-data" },
    { id: "mz09.deployment-model", name: "Deployment model", description: "Multi-tenant cloud, dedicated (in-region) tenant, or on-premises at the customer: chosen by data sensitivity, residency rules, scale and who operates it.", competency: "mz-data", related: ["fc04.on-prem-deployment"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "The reference architecture, layer by layer",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Your engineering partners will build Mizan's pipeline, but you decide what is sold: a cloud service, a dedicated tenant in the Gulf, or software installed on KISR's servers. Each choice changes price, margin, sales cycle and the security review. You also need to be able to say to an investor what the hosting cost per MW is and why it is small, and to a research partner how a published result can be reproduced from raw data.`,
        },
        {
          kind: "flow",
          title: "Plant analytics pipeline",
          steps: [
            { label: "Source", detail: "Historian or SCADA (read-only), plus files: cleaning and maintenance logs" },
            { label: "Edge gateway", detail: "Reads tags on schedule; buffers locally; compresses; encrypts" },
            { label: "Transport", detail: "Outbound MQTT or HTTPS over TLS; or encrypted files" },
            { label: "Landing", detail: "Broker or file drop; nothing modified" },
            { label: "Raw layer", detail: "Immutable Parquet, partitioned by site and date" },
            { label: "Cleaned layer", detail: "Units, time zone, alignment to a grid, quality flags" },
            { label: "Results layer", detail: "Daily performance index, soiling ratio, cleaning recommendation, with algorithm version" },
            { label: "Serving", detail: "Dashboard on a time-series database, PDF reports, API, alerts" },
          ],
          caption: "Each layer can be rebuilt from the one before it. That is what makes a result reproducible, and reproducibility is what a research partner and a sceptical O&M manager will both test.",
        },
        {
          kind: "md",
          md: md`### Edge gateway

An industrial PC or small server, usually in the plant DMZ (lesson 2). It:
- **reads** the agreed tags from the historian or OPC UA server on a schedule;
- **buffers** locally (**store-and-forward**): if the link fails for a day, nothing is lost, and data is sent in order when the link returns;
- **compresses and encrypts**, and connects **outbound** only;
- **keeps time**: its clock must be synchronised (NTP from a plant time server), and it should forward the source timestamps rather than its own.

Buffer size is simple arithmetic: tags $\times$ values per day $\times$ bytes per value $\times$ days of autonomy. 400 tags at 1 minute in JSON (about 50 bytes per value) is 28.8 MB per day, 864 MB for 30 days: any industrial PC holds a year.

### Link

The same arithmetic gives bandwidth: 400 tags per minute at 50 bytes is about 2.7 kbit/s on average. Even the full 340,000 tags of a 1 GW plant at 1 minute is about 2.3 Mbit/s. **Bandwidth is never the constraint for interval data**; approval of the link is.

### Storage: time-series database or data lake?

| | Time-series database | Parquet data lake |
|---|---|---|
| **Examples** | InfluxDB, TimescaleDB (PostgreSQL), QuestDB, managed cloud services | Parquet files on object storage (S3-compatible, Azure Blob), queried with DuckDB, Spark, Athena-type engines |
| **Strength** | Fast queries on recent data, downsampling, continuous aggregates; drives dashboards and alerts | Cheap, columnar, compresses 5 to 20 times; scans years of data for reprocessing and model training |
| **Cost shape** | Always-on compute and memory; cost grows with data kept hot | Pay per GB stored and per query; near zero when idle |
| **Weakness** | Expensive for years of history; reprocessing is awkward | Not for sub-second dashboards; many tiny files hurt performance |
| **Use at Mizan** | Last weeks of data and daily results for the customer dashboard | System of record: all raw and cleaned history |

The usual answer is **both**: the lake is the system of record, the database is a cache for what users look at.

### Table shape and partitioning

- **Long format** (timestamp, tag, value, quality) is robust: new tags add rows, not columns. Use it for the raw layer.
- **Wide format** (timestamp, then one column per tag) is what analysis code wants. Use it for the cleaned layer of one plant or block.
- **Partition** files by site and date (for example site=SHG1/year=2019/month=03), so a query for one month reads one month.
- **Sort** by tag and timestamp inside files; columnar compression thrives on sorted, slowly changing values.

### Pipelines, versions and reproducibility

Pipelines run on a schedule (daily is enough for soiling) under an orchestrator (Airflow, Dagster, Prefect, or plain scheduled jobs at pilot scale). Three habits matter more than the tool:
1. **Never overwrite raw data.** Fixes happen in the cleaned layer, as code.
2. **Version the algorithm** and store the version with every result. When KISR reviewers ask how the March 2019 soiling ratio was computed, you rerun that version on that raw data.
3. **Log quality decisions** (which days were excluded and why) as data, not in a notebook.

The analysis itself (expected energy with pvlib, SRR soiling extraction with RdTools) is taught in module mz03.`,
        },
        { kind: "xref", to: "mz03-l03", note: "Expected-energy modelling with pvlib and PySAM runs in the cleaned-to-results step of this pipeline." },
        {
          kind: "matrix",
          title: "Where should Mizan's analytics run?",
          xAxis: ["Data may leave the customer", "Data must stay in-country or on-site"],
          yAxis: ["One plant", "Fleet of plants"],
          cells: [
            { label: "Multi-tenant cloud SaaS", detail: "Lowest cost per MW; standard product; fastest updates. Fits private IPPs and O&M fleets that accept cloud." },
            { label: "Dedicated tenant in the customer's chosen region, or customer private cloud", detail: "Isolation per customer; higher operating cost; price it in." },
            { label: "Managed cloud, single tenant at pilot scale", detail: "Simple to start; fine for a pilot with exported files." },
            { label: "On-premises appliance or software on the customer's server", detail: "Fits government plants and research bodies; slower updates; remote support needs its own approval." },
          ],
          caption: "Top left is the cheapest to run; bottom right is the most common requirement of public entities. Build the software so the same pipeline runs in all four cells.",
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Cloud regions and residency in the Gulf",
          md: md`Major cloud providers operate regions in the Gulf (Bahrain, the UAE, Qatar and Saudi Arabia among them). Whether an in-Kuwait hyperscaler region is available in late 2026, and whether Kuwaiti public entities must host operational data in Kuwait, were not verified. Check before quoting a hosting option in a proposal.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "What a pipeline costs",
      blocks: [
        { kind: "equation", formula: "mz09-storage-cost" },
        {
          kind: "worked",
          mode: "worked",
          title: "Year-one cost of a single-plant soiling pilot",
          given: md`Illustrative numbers, not quotes. Plant of about 11 MW (Shagaya Phase I scale). 400 tags at 1 minute, about 1 GB per year in Parquet. Edge gateway hardware USD 2,500 one-off. Small cloud virtual machine for pipelines USD 70 per month. Small managed time-series database for the dashboard USD 100 per month. Object storage at USD 0.023 per GB-month (a common list price; Gulf regions may differ). Setup engineering 20 person-days and ongoing data operations 2 person-days per month, both at USD 500 per day.`,
          steps: [
            { md: md`**Infrastructure.** Gateway 2,500; virtual machine $70 \times 12 = 840$; database $100 \times 12 = 1{,}200$; storage $12 \times 0.023 \times 0.5 \approx 0.14$, effectively USD 0.` },
            { md: md`**People.** Setup $20 \times 500 = 10{,}000$; operations $2 \times 12 \times 500 = 12{,}000$.` },
            { md: md`**Total year one:** $2{,}500 + 840 + 1{,}200 + 10{,}000 + 12{,}000 = 26{,}540$ USD.` },
            { md: md`**Cloud share:** $(840 + 1{,}200)/26{,}540 = 7.7$ %. People are 83 %, the gateway 9 %.` },
          ],
          result: md`A pilot costs about USD 27k in year one at these assumptions, almost all of it engineering time. To improve margin, automate onboarding (tag mapping, quality checks) rather than shopping for cheaper storage. Per MW, data operations shrink fast with fleet size, because a pipeline built once serves many plants.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: storage cost of a 1 GW plant in year five",
          given: md`The 1 GW plant of lesson 1 adds 290 GB of Parquet per year (all tags at 1 minute). Price USD 0.023 per GB-month. At the start of year five, four years (1,160 GB) are stored.`,
          steps: [
            { md: md`Year one: $C_s = 12 \times 0.023 \times (0 + 145) = 40.0$ USD.` },
            { md: md`Year five: $C_s = 12 \times 0.023 \times (1{,}160 + 145)$.`, hidden: true, check: { prompt: "Storage cost in year five", answer: 360.2, tolerance: { rel: 0.01 }, unit: "USD" } },
          ],
          result: md`Under USD 400 a year to keep every tag of a gigawatt plant for five years. Storage scales linearly and stays small; always-on databases and engineering time are where hosting costs come from.`,
        },
        {
          kind: "question",
          question: {
            id: "mz09-l04-p1",
            type: "numeric",
            prompt: md`An edge gateway buffers 1,200 tags at 1 minute, about 50 bytes per value. How many GB does it need to hold 45 days of outage?`,
            answer: 3.89,
            tolerance: { rel: 0.02 },
            unit: "GB",
            explanation: md`$1{,}200 \times 1{,}440 \times 50 = 86.4$ MB per day; $\times 45 = 3{,}888$ MB $\approx 3.9$ GB. Trivial for an industrial SSD; the risk is not size but a buffer configured too small by default.`,
            concepts: ["mz09.edge-gateway"],
            difficulty: 1,
          },
        },
        { kind: "xref", to: "fc06-l03", note: "Hosting and data operations are cost of revenue: they set the gross margin of the analytics subscription." },
      ],
    },
    {
      layer: "field",
      title: "Building it without regret",
      blocks: [
        {
          kind: "md",
          md: md`### Build, buy or reuse

- **Reuse open source for the science**: pvlib (modelling), RdTools (degradation and soiling), pvanalytics (quality control). Reviewers trust them, and Mizan's planned open-source research tools (a Kuwait dust and soiling atlas, a Kuwait energy systems toolkit) fit the same ecosystem.
- **Buy commodity infrastructure**: object storage, a managed database, a managed broker. No differentiation in running them.
- **Build what is specific**: tag mapping and onboarding, Gulf-specific quality rules (dust events, heat derating, time conventions), and the cleaning decision logic.

### What goes wrong in the first year

- **The gateway clock drifts** or runs in the wrong time zone, so its stamps disagree with the historian's.
- **The buffer is too small by default** and a long link outage silently drops data.
- **Schema drift**: the plant adds or renames tags; a wide raw table breaks, a long one does not.
- **Only results were kept**: a bug is found and the raw data to recompute is gone.
- **Hot database holds all history** and the hosting bill grows every month for data nobody queries.
- **An on-premises install cannot be updated** because remote access was never approved.`,
        },
        {
          kind: "checklist",
          title: "Architecture checks before the pilot starts",
          items: [
            "Raw layer immutable, in an open format (Parquet), partitioned by site and date",
            "Source timestamps preserved; gateway clock synchronised; time zone stated in metadata",
            "Store-and-forward buffer sized for at least 30 days",
            "Algorithm version recorded with every result; any result reproducible from raw data",
            "Quality decisions (excluded days, reasons) stored as data",
            "Same pipeline can run in cloud, dedicated tenant or on-premises",
            "Update and support path for on-premises installs agreed in writing",
          ],
        },
        {
          kind: "ask",
          title: "Questions for your engineering partners",
          items: [
            "If a bug in the soiling filter is found in month six, how long to recompute every result, and from what?",
            "What happens to data if the site link is down for two weeks?",
            "Which components would change if KISR requires everything on its own servers?",
            "What is our hosting and data-operations cost per plant per month today, and at 20 plants?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "mz09-l04-p2",
            type: "short",
            prompt: md`Write the **architecture section** of Mizan's pilot proposal for Shagaya Phase I (targeted, not signed), in at most a page: the layers from source to report, where each runs, how the result is reproducible for joint publication with KISR researchers, the deployment options you offer KISR, and the cost basis you assume. Then add two sentences on how the same design scales to a 1 GW plant.`,
            rubric: [
              "Names the layers (source, gateway or file exchange, raw, cleaned, results, serving) and what each does",
              "States read-only, outbound or file-based access consistent with lesson 2",
              "Explains reproducibility: immutable raw data, versioned algorithms, logged quality decisions",
              "Offers deployment options (Mizan-hosted tenant, in-country or on KISR servers) and leaves the choice to KISR",
              "Gives a realistic, labelled cost basis showing people dominate and storage is negligible",
              "Scaling note uses sensible volumes (about 0.3 TB per year in Parquet for 1 GW at 1 minute) and says what changes (gateway throughput, onboarding automation, database tiering)",
            ],
            modelAnswer: md`**Architecture (pilot in preparation)**

1. **Source:** KISR historian, read-only. Phase 1 by monthly encrypted exports of about 400 tags (5 minute time-weighted averages) plus cleaning, maintenance and sensor logs. Phase 2, if KISR approves, an edge gateway in the DMZ reading through OPC UA and sending outbound over TLS.
2. **Raw layer:** files stored unchanged as Parquet, partitioned by month; checksums recorded.
3. **Cleaned layer:** code converts units, sets all timestamps to UTC with the original convention recorded, aligns to a 5 minute grid and adds quality flags (gaps, stale values, limits, curtailment, outages).
4. **Results layer:** daily performance index per inverter and section, soiling ratio and cleaning recommendations, each stored with the algorithm version and the list of excluded intervals.
5. **Serving:** monthly PDF report and a dashboard on a small time-series database holding the last 90 days and the daily results.

**Reproducibility:** any published figure can be regenerated from the raw files with the tagged algorithm version; KISR researchers receive the code and environment for the methodology paper.

**Deployment:** KISR chooses: a Mizan-administered dedicated tenant (region to be agreed), or the same software installed on a KISR server.

**Cost basis (illustrative):** about USD 27k in year one, of which about 8 % is cloud infrastructure and over 80 % is engineering and data operations; storage is negligible (about 1 GB per year).

**Scaling:** a 1 GW plant produces about 0.3 TB per year of Parquet at 1 minute for all tags, which the same layers handle with a more capable gateway and a tiered database. The work that grows is tag onboarding, which we automate from the plant's tag export and asset hierarchy.`,
            explanation: md`A strong architecture section is short, reproducible and gives the customer the deployment choice. Cost transparency (people dominate) prepares the pricing conversation.`,
            concepts: ["mz09.pipeline-layers", "mz09.deployment-model", "mz09.edge-gateway", "mz09.tsdb-vs-lake"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to an investor why Mizan's hosting cost per MW is small, and what actually drives the cost of serving a new plant.",
          keyPoints: [
            "Interval data is small: about 0.3 TB per year in Parquet even for a 1 GW plant at 1 minute",
            "Object storage costs cents per GB-month; bandwidth is a few Mbit/s at most",
            "Always-on databases and compute cost more, and are sized to what users query",
            "Engineering time for onboarding (tag mapping, quality rules, access approvals) dominates",
            "Automating onboarding is the lever on gross margin",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz09-l04-q1",
      type: "mcq",
      prompt: md`What is the main purpose of store-and-forward in an edge gateway?`,
      options: ["To encrypt data", "To keep data during link outages and send it in order when the link returns", "To convert Modbus to OPC UA", "To run the soiling algorithm on site"],
      answer: 1,
      explanation: md`Links fail; a local buffer means no data is lost. Encryption and protocol conversion are separate functions.`,
      concepts: ["mz09.edge-gateway"],
      difficulty: 1,
    },
    {
      id: "mz09-l04-q2",
      type: "mcq",
      prompt: md`Which store should be the system of record for years of raw plant data?`,
      options: ["The dashboard's time-series database", "Immutable Parquet files on object storage", "A spreadsheet per month", "The edge gateway's buffer"],
      answer: 1,
      explanation: md`A Parquet lake is cheap, open, compressible and good for reprocessing; the time-series database is a fast cache for recent data and results.`,
      concepts: ["mz09.tsdb-vs-lake"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz09-l04-q3",
      type: "mcq",
      prompt: md`Why is the long format (timestamp, tag, value, quality) preferred for the raw layer?`,
      options: ["It is smaller than every other format", "New or renamed tags add rows instead of breaking a fixed set of columns", "Analysis code needs it", "Dashboards cannot read wide tables"],
      answer: 1,
      explanation: md`Plants change tags over time; long tables absorb that. Analysis usually pivots to wide format in the cleaned layer.`,
      concepts: ["mz09.pipeline-layers"],
      difficulty: 2,
    },
    {
      id: "mz09-l04-q4",
      type: "numeric",
      prompt: md`At USD 0.023 per GB-month, what does it cost (USD) to store 600 GB already held plus 200 GB added uniformly during the year?`,
      answer: 193.2,
      tolerance: { rel: 0.01 },
      unit: "USD",
      explanation: md`$C_s = 12 \times 0.023 \times (600 + 100) = 193.2$ USD. The average holding is the opening volume plus half the additions.`,
      concepts: ["mz09.tsdb-vs-lake"],
      difficulty: 2,
    },
    {
      id: "mz09-l04-q5",
      type: "multi",
      prompt: md`Which practices make a published soiling result reproducible? (Select all.)`,
      options: ["Immutable raw data", "Algorithm version stored with each result", "Excluded intervals logged as data", "Overwriting raw files after cleaning to save space", "Keeping only the monthly report PDFs"],
      answer: [0, 1, 2],
      explanation: md`Reproducibility needs the raw input, the exact code and the quality decisions. Overwriting raw data or keeping only reports makes recomputation impossible.`,
      concepts: ["mz09.pipeline-layers"],
      difficulty: 1,
    },
    {
      id: "mz09-l04-q6",
      type: "decision",
      prompt: md`A government plant operator says: "We like the analytics, but data cannot leave our premises." What do you offer?`,
      options: [
        { text: "The same software installed on their server (or an appliance), with an agreed update and support path", score: 1, feedback: "Right: if the pipeline is portable, residency becomes a deployment option, not a lost deal. Price the extra support." },
        { text: "Explain that the cloud is more secure than their server", score: 0.1, feedback: "It may be true technically, but it argues against a policy you cannot change." },
        { text: "Offer to anonymise the data before upload", score: 0.4, feedback: "Plant data identifies the plant anyway; it does not satisfy a residency rule." },
        { text: "Walk away", score: 0.2, feedback: "Public entities are core Mizan buyers; design for them." },
      ],
      explanation: md`Design for the strictest buyer: if the same pipeline runs on-premises, residency requirements become pricing, not product rework.`,
      concepts: ["mz09.deployment-model"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz09-l04-f1", front: "Pipeline layers", back: "Source, edge gateway, transport, landing, raw, cleaned, results, serving", concepts: ["mz09.pipeline-layers"] },
    { id: "mz09-l04-f2", front: "TSDB vs Parquet lake: one line each", back: "TSDB: fast recent queries, always-on cost. Lake: cheap columnar history for batch analysis.", concepts: ["mz09.tsdb-vs-lake"] },
    { id: "mz09-l04-f3", front: "Bandwidth for 1 GW, all tags at 1 minute", back: "About 2.3 Mbit/s (340k tags, 50 B per value): never the constraint", concepts: ["mz09.edge-gateway"] },
    { id: "mz09-l04-f4", front: "Annual storage cost formula", back: md`$C_s = 12\,p_s\,(V_0 + V_{yr}/2)$`, concepts: ["mz09.tsdb-vs-lake"] },
    { id: "mz09-l04-f5", front: "What dominates pilot data costs", back: "Engineering and data-operations time (over 80 % in the illustrative pilot), not cloud", concepts: ["mz09.deployment-model"] },
    { id: "mz09-l04-f6", front: "Three reproducibility habits", back: "Never overwrite raw; version the algorithm; log quality decisions as data", concepts: ["mz09.pipeline-layers"] },
  ],
};

export default lesson;
