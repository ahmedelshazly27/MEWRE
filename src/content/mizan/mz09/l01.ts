import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz09-l01",
  title: "What a PV plant's data looks like: tags, devices, sampling rates, volumes and naming",
  summary:
    "The anatomy of operational data in a utility PV plant: SCADA tags, inverter, MPPT and string data, trackers, met stations, transformers and the PPC; sampling versus recording intervals; how many tags a 1 GW plant has and how many bytes per year that becomes; and why tag naming conventions decide how fast any analytics project can start.",
  minutes: 70,
  objectives: [
    "List the device families in a PV plant and the tags each one publishes, and say which matter for soiling analytics",
    "Distinguish sampling interval, recording (averaging) interval and scan class, and relate them to IEC 61724-1 monitoring classes",
    "Estimate tag count, values per day and storage per year for a plant of any size, with stated assumptions",
    "Read and design a hierarchical tag name, and explain why a tag dictionary is the first deliverable of a data pilot",
  ],
  concepts: [
    { id: "mz09.scada-tags", name: "SCADA tag", description: "One named time series in the plant control system: a measurement, status, alarm or setpoint from one device, with its value, timestamp and quality flag.", competency: "mz-data", related: ["m12.monitoring-system", "m06.scada-architecture"] },
    { id: "mz09.sampling-recording", name: "Sampling, recording interval and scan class", description: "How often a sensor is read (sampling), how often an aggregate is stored (recording), and the polling group a tag belongs to in SCADA (scan class).", competency: "mz-data", related: ["m12.monitoring-system"] },
    { id: "mz09.data-volume", name: "Plant data volume", description: "Tags times values per tag per day times bytes per value, divided by compression: the arithmetic that sizes storage, transfer and cost.", competency: "mz-data" },
    { id: "mz09.naming-convention", name: "Tag naming convention and tag dictionary", description: "A hierarchical, documented scheme (site, block, device, measurement, unit) that maps every tag to a physical asset; the dictionary is the table that records it.", competency: "mz-data" },
  ],
  sections: [
    {
      layer: "theory",
      title: "Devices, tags and how often they are read",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Mizan sells analytics that live or die on plant data, and the Shagaya Phase I pilot (targeted, not signed) starts with a data request to KISR. If you can say "for soiling we need per-inverter AC power, POA irradiance and module temperature at 1 minute, plus the status and setpoint tags, and that is about 2 GB a year in Parquet", you are a credible counterpart to an O&M engineer. If you ask for "all the SCADA data", you get a 400 GB dump or, more likely, nothing.`,
        },
        {
          kind: "md",
          md: md`### What a tag is

A **tag** (also called a point or signal) is one named time series in the plant's SCADA or historian. Each stored record has three parts: **timestamp, value, quality**. Quality is a flag set by the driver or historian (good, bad, uncertain, substituted, comm failure) and is the first thing analytics must read, because a frozen value with quality "good" and a real value look identical otherwise.

Tags come in four kinds:
- **Analog measurements**: AC power, DC current, irradiance, temperature. Floats, with engineering units.
- **Digital status**: breaker open/closed, inverter running/stopped, tracker in stow. Booleans or enumerations.
- **Alarms and events**: fault codes, trips, door open. Often packed as bit fields in one integer register that must be decoded.
- **Setpoints and commands**: PPC active power limit, reactive power target, tracker stow command. These are what control writes; analytics only reads them, but curtailment cannot be detected without them.

### The device families and what they publish

The plant architecture itself (strings, combiners, inverters, MV skids, collector substation) is taught in Track 0; here the question is what each device says.

| Device family | Typical tags (per device) | Count in a plant | Soiling relevance |
|---|---|---|---|
| **Inverter** (central or string) | AC P, Q, S, PF, f; V and I per phase; daily and total energy; DC V and I **per MPPT**; internal and heatsink temperatures; status, fault word, derating flag | 1 per 0.2 to 5 MVA | **Core**: AC and DC power, status |
| **String monitoring** | Current per string (in string inverters, or in smart combiner boxes for central designs) | thousands to tens of thousands | High: shows non-uniform soiling, but noisy |
| **Tracker controller** | Target angle, actual angle, mode (track, backtrack, stow, manual), motor current, battery and fault | 1 per row or per group of rows | High: angle and stow explain energy |
| **Met station** | GHI, POA (pyranometers and reference cells), DHI and DNI if fitted, rear-side irradiance on bifacial plants, ambient and module back-of-module temperatures, wind speed and direction, humidity, rain, soiling station channels | 1 per 20 to 100 MW, more on Class A designs | **Core**: the denominator of every performance index |
| **MV skid and transformer** | Winding and oil temperatures, MV breaker status, protection relay events | 1 per 3 to 10 MVA | Low: outages and availability |
| **Substation, meter, PPC** | Revenue meter energy and power at the point of connection; PPC setpoints (P limit, Q, ramp); grid frequency and voltage; breaker states | a few | **Core** for curtailment and grid limits |
| **Auxiliaries** | UPS, HVAC of inverter houses, fire, security, cleaning robots where fitted | varies | Cleaning robot logs are ground truth for cleaning events |`,
        },
        { kind: "xref", to: "m02-l04", note: "Plant architecture (strings, inverters, trackers, DC/AC ratio) is covered in Track 0; this lesson only adds what each device reports." },
        {
          kind: "md",
          md: md`### Sampling, recording and scan classes

Three different intervals are often confused in data requests:

- **Sampling interval**: how often the sensor or device value is read. An irradiance sensor may be sampled every second.
- **Recording interval**: how often an aggregate (usually the mean of the samples) is stored. A 1-minute mean of 60 one-second samples is a recorded value.
- **Scan class**: the SCADA polling group a tag belongs to. Electrical tags of a PPC may be scanned every 100 ms to 1 s; inverter energies every 5 to 60 s; tracker states every 30 to 60 s; slow temperatures every minute.

A historian may then store not every scanned value but only **changes** beyond a deadband (lesson 3), so "1 second data" from a historian is rarely 86,400 evenly spaced values per day.

IEC 61724-1 (Edition 2, 2021) defines monitoring classes A (high accuracy), B (medium) and C (basic) and sets maximum sampling and recording intervals for each. A Class A plant records at 1 minute or faster; lower classes allow longer recording intervals. Module mz02 teaches the classes in detail; what matters here is the consequence: **a soiling analysis wants 1 to 15 minute averages with correct timestamps, not raw 1 second data**, and it wants the mean (not an instantaneous snapshot) because a snapshot every 15 minutes on a cloudy day is noise.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Check the exact Class A and B interval table",
          md: md`The precise maximum sampling and recording intervals per class in IEC 61724-1:2021 were not verified from the normative text for this lesson (the research brief could only reach previews and vendor summaries). Quote the classes and the "1 minute recording for Class A" rule of thumb in conversation; buy the standard before writing intervals into a contract or a pilot protocol.`,
        },
        {
          kind: "md",
          md: md`### Data volume: the arithmetic

Everything about a data pipeline (transfer, storage, cost, query speed) scales with one product. Values per day:`,
        },
        { kind: "equation", formula: "mz09-values-per-day" },
        {
          kind: "md",
          md: md`and stored volume over a period:`,
        },
        { kind: "equation", formula: "mz09-storage-volume" },
        {
          kind: "md",
          md: md`Three numbers dominate: the **tag count** (driven by the number of inverters, strings and trackers), the **interval**, and the **compression** of the storage format. Bytes per value depend on the format: a historian record of 8-byte timestamp, 4-byte float and status is about 12 to 16 bytes; a row in a CSV export is often 30 to 50 bytes per value; a columnar Parquet file with sorted timestamps and slowly varying values commonly compresses 5 to 20 times below the raw record size.

### Naming conventions

A tag name is the only link between a number and a physical object. Good conventions are **hierarchical** and **parseable**:

| Part | Example | Meaning |
|---|---|---|
| Site | SHG1 | Site code |
| Area or block | B03 | Power block 3 |
| Device | INV07 | Inverter 7 in the block |
| Sub-device | MPPT04 | MPPT input 4 |
| Measurement | IDC | DC current |
| Unit (in dictionary, sometimes in name) | A | amperes |

giving **SHG1.B03.INV07.MPPT04.IDC**. (Illustrative scheme, not the actual Shagaya convention, which is not documented in Mizan's sources.) Power plants also use formal reference designation systems: **KKS** (the German power plant classification system) and its successor **RDS-PP**, based on IEC 81346. In practice, PV plants built by different EPCs in different phases often have three conventions at one site, plus vendor-default names such as "Inverter_12_Pac" from the monitoring portal.

The **tag dictionary** is a table: tag name, description, device, physical location (block, row, string), engineering unit, scaling, data type, scan or recording interval, and the date it was created or changed. Without it, an analyst spends the first weeks of any pilot reverse-engineering what "B3_I7_P" means and whether its unit is kW or W.`,
        },
        {
          kind: "flow",
          title: "From photon to stored value",
          steps: [
            { label: "Sensor or device", detail: "Pyranometer voltage, inverter DSP measurement" },
            { label: "Logger or device register", detail: "Sampled every 1 s or faster; scaled to engineering units" },
            { label: "SCADA driver poll", detail: "Modbus, OPC UA or IEC 61850 read on its scan class" },
            { label: "SCADA real-time database", detail: "Current value, alarm logic, HMI" },
            { label: "Historian", detail: "Stores changes beyond deadband, with timestamp and quality" },
            { label: "Export or API", detail: "Averages, interpolations or raw recorded values to analytics" },
          ],
          caption: "Each hop can add delay, rescale, round, re-timestamp or drop values. A soiling analyst must know which hop the data came from.",
        },
        {
          kind: "chart",
          chart: "bar",
          title: "Illustrative 1 GWac plant: where the tags come from",
          xKey: "family",
          xLabel: "Device family",
          yLabel: "Tags (thousands)",
          series: [{ key: "tags", label: "Tags (thousands)" }],
          data: [
            { family: "Inverters (3,125 x 60)", tags: 187.5 },
            { family: "Trackers (24,000 x 6)", tags: 144 },
            { family: "MV skids (156 x 30)", tags: 4.7 },
            { family: "Substation and PPC", tags: 3 },
            { family: "Met stations (10 x 25)", tags: 0.25 },
          ],
          caption: "Illustrative design assumptions from the worked example below. The met stations, which carry the most important data for soiling, are under 0.1 % of the tags.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Sizing the data of a 1 GW plant",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Tags, values and terabytes for an illustrative 1 GWac single-axis tracker plant",
          given: md`Illustrative design, not a real plant: 1,000 MWac, about 1,300 MWp DC. String inverters of 320 kW: $1{,}000{,}000/320 = 3{,}125$ inverters, 60 tags each. About 24,000 tracker rows (54 kWp each), 6 tags each. 156 MV skids of 6.4 MVA, 30 tags each. 10 met stations, 25 tags each. Substation, meters and PPC: 3,000 tags. Historian record 16 bytes per value.`,
          steps: [
            { md: md`**Tag count.** $187{,}500 + 144{,}000 + 4{,}680 + 250 + 3{,}000 = 339{,}430$ tags, about 340 thousand.` },
            { md: md`**Everything at 1 s.** $N_v = 339{,}430 \times 86{,}400 = 2.93 \times 10^{10}$ values per day. At 16 bytes: $4.69 \times 10^{11}$ B $\approx 469$ GB per day, about **171 TB per year**. Nobody stores this; it is why historians use deadbands and why "send us all the 1 second data" is the wrong request.` },
            { md: md`**Everything at 1 minute means.** $N_v = 339{,}430 \times 1{,}440 = 4.89 \times 10^{8}$ values per day, $7.82$ GB per day raw, $2.85$ TB per year. In Parquet at an assumed 10:1 compression: about **0.29 TB per year**.` },
            { md: md`**Only what soiling analytics needs.** Per inverter 25 tags (AC power and energy, 20 MPPT DC channels, status, temperature, derating flag): $3{,}125 \times 25 = 78{,}125$; met stations 250; tracker actual angle and mode: 24,000 (one tag per row is enough). Total $102{,}375$ tags at 1 minute: $1.47 \times 10^{8}$ values per day, $861$ GB per year raw, about **86 GB per year** in Parquet at 10:1.` },
          ],
          result: md`A 1 GW plant produces about 340 thousand tags. The full set at 1 minute is about 3 TB a year raw and 0.3 TB in Parquet; the soiling subset is about 0.1 TB a year in Parquet. Storage is cheap at these volumes (lesson 4): the hard parts are getting the data out, naming it and cleaning it.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: a 100 MWac fixed-tilt plant",
          given: md`Illustrative: 100 MWac with 320 kW string inverters, 60 tags each; fixed tilt (no trackers); 2 met stations of 25 tags; 500 tags for substation, skids and PPC. Recording at 15 minute means, 16 bytes per value.`,
          steps: [
            { md: md`Inverters: $100{,}000 / 320 = 312.5$, so 313 inverters, $313 \times 60 = 18{,}780$ tags.` },
            { md: md`Total tags $= 18{,}780 + 50 + 500$.`, hidden: true, check: { prompt: "Total tags", answer: 19330, tolerance: { abs: 1 }, unit: "tags" } },
            { md: md`Values per day at 15 minutes: $96$ per tag, so $19{,}330 \times 96 = 1{,}855{,}680$.` },
            { md: md`Raw volume per year $= 1{,}855{,}680 \times 16 \times 365$ B.`, hidden: true, check: { prompt: "Raw volume per year (GB)", answer: 10.84, tolerance: { rel: 0.01 }, unit: "GB" } },
          ],
          result: md`About 11 GB a year raw at 15 minutes, roughly 1 GB in Parquet. A decade of such a plant fits on a laptop. The volume problem only appears at 1 second data or at fleet scale.`,
        },
        {
          kind: "question",
          question: {
            id: "mz09-l01-p1",
            type: "numeric",
            prompt: md`A soiling pilot requests 400 tags at 1 minute for 2 years, delivered as CSV at about 40 bytes per value. How large (GB) is the delivery?`,
            answer: 16.82,
            tolerance: { rel: 0.02 },
            unit: "GB",
            explanation: md`Values $= 400 \times 1{,}440 \times 730 = 420{,}480{,}000$. Bytes $= 4.2048 \times 10^8 \times 40 = 1.68 \times 10^{10}$ B $\approx 16.8$ GB. Too big to email, fine for a shared drive or an encrypted disk; in Parquet it would be 1 to 2 GB.`,
            concepts: ["mz09.data-volume"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Reading a plant's data the way an O&M engineer does",
      blocks: [
        {
          kind: "md",
          md: md`### Who owns which data at a typical plant

- **Plant owner** (at Shagaya Phase I, KISR operates the plant per Mizan's brief): owns the data in principle and signs any data-sharing agreement.
- **O&M contractor**: runs the SCADA day to day, knows which tags are broken, keeps the cleaning and maintenance logs (often in spreadsheets or a CMMS, not in SCADA).
- **SCADA or monitoring vendor**: holds the configuration, the tag database and the licences; any new export or API usually needs their engineer.
- **Inverter and tracker OEMs**: often run their own cloud portals with richer device data than SCADA receives, under their own terms.

### What experienced people check first

1. **The tag list with units**, before any data. If there is no dictionary, ask for a SCADA tag export (most systems can export the tag database to CSV) and the single-line diagram, and build the mapping yourself.
2. **Which tags are averages and which are snapshots.** Energy counters (kWh totals) are the most reliable power measure over an interval: the difference of two counter readings is exact even if polls were missed, whereas averaging sparse power snapshots is not.
3. **Counter resets and rollovers.** Inverter energy counters reset at midnight (daily) or roll over at a register limit; a naive difference gives a huge negative or positive spike.
4. **Units and scaling changes.** A firmware update can change a register from W to kW, or a SCADA migration can change scaling, mid-history.
5. **Where the cleaning log lives.** It is the ground truth for soiling inference and it is almost never in SCADA.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Classic surprises in a first plant data set",
          md: md`- **The power tag is a 15 minute snapshot**, not a mean: on partly cloudy days it is noise.
- **Two met stations, one dead for months**, with values frozen at the last reading and quality still "good".
- **Inverter numbering in SCADA does not match the field labels** after a replacement, so the "worst inverter" is in the wrong block.
- **String currents with no mapping to physical rows**: you can see non-uniform soiling but not where it is.
- **Energy in Wh in one phase of the plant and kWh in another**, because two EPCs built the phases.`,
        },
        {
          kind: "checklist",
          title: "Minimum tag set for a soiling analytics pilot",
          items: [
            "Per inverter: AC active power (mean) or energy counter, status and fault code, derating or limitation flag",
            "Per MPPT, if available: DC current and voltage",
            "Every POA pyranometer and reference cell, with GHI, and the sensors' cleaning and calibration records",
            "Module back-surface temperature, ambient temperature, wind speed, humidity",
            "PPC active power setpoint and the revenue meter at the point of connection",
            "Tracker actual angle and mode (if trackers)",
            "Outside SCADA: module cleaning log, maintenance and outage log, tag dictionary, single-line diagram",
          ],
        },
        {
          kind: "ask",
          title: "Questions for the O&M team on the first call",
          items: [
            "Can you export the full tag list with descriptions, units and scan intervals?",
            "Is the inverter power tag an average over the interval or an instantaneous value? Do you have energy counters?",
            "What time zone and which interval convention (beginning or end) does the historian use for averages?",
            "Which sensors are known to be faulty or were replaced, and when?",
            "Where are the module cleaning records kept, and at what granularity (block, row, date)?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "mz09-l01-p2",
            type: "short",
            prompt: md`Draft the **data inventory section** of Mizan's first data request to the Shagaya Phase I team (the pilot is targeted, not signed). List the tag groups you want, the interval and statistic for each, the history you request, the non-SCADA records, and a one-line estimate of the data volume you expect so the IT team can plan the transfer. Keep it to what soiling analytics needs and justify each group in a few words.`,
            rubric: [
              "Requests per-inverter AC power or energy counters plus status/fault and limitation flags, with a reason (numerator, availability filter)",
              "Requests all irradiance sensors (POA, GHI, reference cells) with temperatures and wind, and the sensors' cleaning and calibration log",
              "Requests the PPC setpoint and point-of-connection meter for curtailment, and tracker angles only if trackers exist",
              "Specifies interval and statistic (for example 1 to 5 minute means, not snapshots), time zone and interval convention, and a history period (at least 2 years, ideally covering 2018 to 2019)",
              "Includes non-SCADA records: module cleaning log, maintenance and outage log, tag dictionary, single-line diagram, module datasheets",
              "Gives a sensible volume estimate (order of 1 to 20 GB as CSV for a roughly 11 MW plant over several years) and keeps the request minimal",
            ],
            modelAnswer: md`**Data inventory (Shagaya Phase I PV, soiling pilot in preparation)**

1. **Inverters (all):** AC active power as 1 minute mean (or 5 minute if that is the historian standard), daily and total energy counters, operating status, fault code, power limitation flag. Purpose: numerator of the performance index; availability and curtailment filters.
2. **DC side, if logged:** DC current and voltage per MPPT or per string, same interval. Purpose: separate soiling from inverter issues and see non-uniform soiling between the thin-film and poly-Si sections.
3. **Meteorological:** every POA pyranometer and reference cell, GHI (and DNI and DHI from the KISR radiometric station if available), module back-surface and ambient temperature, wind speed and direction, relative humidity, rain. 1 minute means. Purpose: expected-energy model and temperature correction.
4. **Grid and control:** PPC active power setpoint, point-of-connection meter power and energy. Purpose: curtailment detection.
5. **History:** from commissioning to today, and at minimum the 2018 to 2019 period, which includes the cleaning arm failure that we propose as a natural experiment.
6. **Records outside SCADA:** module cleaning log (date, rows or section, method), irradiance sensor cleaning and calibration log, maintenance and outage log, tag dictionary or tag export, single-line diagram, module and inverter datasheets.
7. **Format:** one file per month, long format (timestamp, tag, value, quality), timestamps in UTC or stated local time (UTC+3) with the interval convention stated.

**Expected volume:** roughly 300 to 500 tags at 1 minute, about 0.2 billion values per year; about 8 GB per year as CSV or under 1 GB per year in Parquet. An encrypted disk or a secure file share is enough; no live connection is needed for phase 1.`,
            explanation: md`A good request is small, justified and specific about the statistic, interval, time convention and history. It asks for the records outside SCADA (cleaning log, sensor log, outages) because they are the ground truth, and it tells IT how big the transfer is so the security review can choose a simple method.`,
            concepts: ["mz09.scada-tags", "mz09.data-volume", "mz09.sampling-recording"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a KISR administrator who is not an engineer why Mizan asks for 400 specific tags at 1 minute instead of 'all the SCADA data at 1 second'.",
          keyPoints: [
            "A plant has hundreds of thousands of tags; most are irrelevant to soiling",
            "1 second data for everything is hundreds of GB per day and mostly noise for this purpose",
            "Soiling needs inverter power, irradiance, temperature, status and setpoints, as interval means",
            "A small, precise request is easier to approve on security grounds and faster to deliver",
            "The cleaning log and tag dictionary matter as much as the numbers",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz09-l01-q1",
      type: "mcq",
      prompt: md`Which three parts does a stored historian record of a tag have?`,
      options: ["Tag name, unit, description", "Timestamp, value, quality", "Device, register, scaling", "Mean, minimum, maximum"],
      answer: 1,
      explanation: md`Each stored value carries a timestamp and a quality flag. Name, unit and description live in the tag configuration (the dictionary), not in each record. Quality is essential: a frozen sensor can still report "good" if the driver does not detect it, but a comm failure is usually flagged.`,
      concepts: ["mz09.scada-tags"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz09-l01-q2",
      type: "multi",
      prompt: md`Which tags are essential for a soiling analysis on a single-axis tracker plant? (Select all.)`,
      options: ["Inverter AC power or energy", "POA irradiance", "Tracker actual angle and mode", "Transformer oil temperature", "PPC active power setpoint", "Inverter status and fault code"],
      answer: [0, 1, 2, 4, 5],
      explanation: md`Power is the numerator, irradiance the denominator, the tracker angle and stow mode explain energy that a fixed model would misattribute, the setpoint reveals curtailment and the status reveals outages. Transformer oil temperature is useful for asset health but not for soiling.`,
      concepts: ["mz09.scada-tags"],
      difficulty: 1,
    },
    {
      id: "mz09-l01-q3",
      type: "numeric",
      prompt: md`A plant has 20,000 tags recorded at 5 minute means, stored at 16 bytes per value. How many GB per year (raw)?`,
      answer: 33.64,
      tolerance: { rel: 0.02 },
      unit: "GB",
      explanation: md`Values per day $= 20{,}000 \times 288 = 5.76 \times 10^6$. Per year $\times 365 = 2.10 \times 10^9$ values; $\times 16$ B $= 3.36 \times 10^{10}$ B $\approx 33.6$ GB.`,
      concepts: ["mz09.data-volume"],
      difficulty: 2,
    },
    {
      id: "mz09-l01-q4",
      type: "mcq",
      prompt: md`Why is an inverter's energy counter usually better than its power tag for computing interval energy from historian data?`,
      options: [
        "Counters are measured with a revenue-grade meter",
        "The difference of two counter readings is exact even if polls in between were missed, while averaging sparse power snapshots is not",
        "Power tags are always in the wrong unit",
        "Counters never reset",
      ],
      answer: 1,
      explanation: md`The counter integrates inside the inverter at high rate; the difference between two readings gives the true energy regardless of polling gaps. Power snapshots only sample the curve. Counters do reset (daily) or roll over, which must be handled; inverter metering is not revenue grade.`,
      concepts: ["mz09.scada-tags", "mz09.sampling-recording"],
      difficulty: 2,
    },
    {
      id: "mz09-l01-q5",
      type: "mcq",
      prompt: md`What is the difference between a sampling interval and a recording interval?`,
      options: [
        "They are the same thing",
        "Sampling is how often the sensor is read; recording is how often an aggregate, usually the mean of the samples, is stored",
        "Recording is how often the HMI refreshes",
        "Sampling applies only to digital tags",
      ],
      answer: 1,
      explanation: md`A pyranometer sampled every second and recorded as a 1 minute mean has a 1 s sampling and 1 min recording interval. Data requests must state the recorded statistic (mean, snapshot, min, max) as well as the interval.`,
      concepts: ["mz09.sampling-recording"],
      difficulty: 1,
    },
    {
      id: "mz09-l01-q6",
      type: "decision",
      prompt: md`At the kick-off for a data pilot, the SCADA vendor offers a full historian backup ("all 2 TB, every tag") but says there is no tag dictionary. What is your best move?`,
      options: [
        { text: "Accept the backup and start modelling immediately", score: 0.2, feedback: "You will spend weeks guessing what tags mean, in a proprietary backup format you may not be able to read without a licence." },
        { text: "Ask first for a tag database export and the single-line diagram, then request a targeted export of the soiling tag set in an open format", score: 1, feedback: "Right: the mapping is the bottleneck. A tag export plus SLD lets you build the dictionary and request only what you need, in CSV or Parquet." },
        { text: "Decline until the vendor writes a full dictionary for all tags", score: 0.4, feedback: "Too demanding: it delays the pilot and the vendor will not do it for free. You only need the dictionary for the few hundred tags you use." },
        { text: "Ask the O&M team to email screenshots of the HMI", score: 0, feedback: "Screenshots are not data." },
      ],
      explanation: md`The bottleneck in early pilots is almost never bytes; it is meaning. Get the tag list and the drawings, build a small dictionary for the tags that matter, then ask for those tags in an open format.`,
      concepts: ["mz09.naming-convention", "mz09.scada-tags"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz09-l01-f1", front: "Three parts of a historian record", back: "Timestamp, value, quality flag", concepts: ["mz09.scada-tags"] },
    { id: "mz09-l01-f2", front: "Values per day formula", back: md`$N_v = N_{tags} \times 86{,}400/\Delta t$ ($\Delta t$ in seconds)`, concepts: ["mz09.data-volume"] },
    { id: "mz09-l01-f3", front: "Order of magnitude: tags in a 1 GW tracker plant", back: "About 300 to 400 thousand (inverters and trackers dominate; met stations are a few hundred)", concepts: ["mz09.data-volume"] },
    { id: "mz09-l01-f4", front: "1 GW plant, all tags at 1 minute: storage per year", back: "About 3 TB raw (16 B per value), about 0.3 TB in Parquet at 10:1", concepts: ["mz09.data-volume"] },
    { id: "mz09-l01-f5", front: "What a tag dictionary contains", back: "Name, description, device, location, unit, scaling, data type, interval, change history", concepts: ["mz09.naming-convention"] },
    { id: "mz09-l01-f6", front: "Where the module cleaning log usually lives", back: "Outside SCADA: O&M spreadsheets or a CMMS. It is the ground truth for soiling inference.", concepts: ["mz09.scada-tags"] },
    { id: "mz09-l01-f7", front: "KKS and RDS-PP", back: "Formal reference designation systems for power plant assets; RDS-PP is the IEC 81346-based successor of KKS", concepts: ["mz09.naming-convention"] },
  ],
};

export default lesson;
