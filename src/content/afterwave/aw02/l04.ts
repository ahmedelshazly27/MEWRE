import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw02-l04",
  title: "Data formats and storage",
  summary:
    "How bench data are written and read: why CSV breaks at scale, how ASAM MDF4 and NI TDMS store channels with scaling and metadata, where HDF5 and MCAP fit, why columnar formats like Parquet win for analytics and machine learning, what compression really achieves on measurement data, and how to design a storage layout that keeps raw files and makes them queryable.",
  minutes: 75,
  objectives: [
    "List the concrete failure modes of CSV for measurement data (size, precision, units, time zones, row limits)",
    "Describe the internal structure of MDF4 and TDMS files and what metadata each carries",
    "Explain row-oriented vs columnar storage and why Parquet suits analytics, with its row groups, encodings and statistics",
    "Estimate file sizes for CSV, binary and compressed columnar storage, and the cost of storing converted floats instead of raw integers",
    "Propose a storage layout that preserves raw vendor files and makes bench data queryable across tests",
  ],
  concepts: [
    { id: "aw02.csv-pitfalls", name: "CSV pitfalls for measurement data", description: "Text encoding inflates size about 3x versus binary, loses precision with too few digits, carries no units or calibration, has ambiguous timestamps, locale-dependent decimals and a 1,048,576-row limit in Excel.", competency: "aw-data", related: ["aw02.columnar-storage"] },
    { id: "aw02.mdf4", name: "ASAM MDF4", description: "Binary measurement data format standardised by ASAM, dominant in automotive: linked blocks for header, data groups, channel groups, channels, conversion rules, source information, events and attachments, with optional compressed data blocks.", competency: "aw-data", related: ["aw02.tdms", "aw02.calibration-metadata"] },
    { id: "aw02.tdms", name: "NI TDMS", description: "National Instruments binary format with a file, group, channel hierarchy and properties at each level, written in segments with an index file; native to LabVIEW, DAQmx and DIAdem.", competency: "aw-data", related: ["aw02.mdf4"] },
    { id: "aw02.columnar-storage", name: "Columnar storage (Parquet)", description: "Stores each column contiguously in row groups and pages, with per-column encodings, compression and min/max statistics, so queries read only the columns and row groups they need.", competency: "aw-data", related: ["aw02.compression", "aw02.data-rate"] },
    { id: "aw02.compression", name: "Compression of measurement data", description: "Lossless compression removes redundancy, not noise: noisy high-resolution channels compress roughly 1.2 to 2x, slow or quantised channels much more; encodings like delta and byte-stream-split help floats.", competency: "aw-data", related: ["aw02.columnar-storage"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "How measurement data are laid out on disk",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Bench memory is only as useful as the files it is built from. Every prospect has a mix of formats: MDF4 from automotive tools, TDMS from NI systems, CSV exports, vendor databases, video. A technical buyer will ask in the first deep dive which formats you read, whether you keep their raw files, and where the data sit (which ties into Afterwave Enclave's promise that data stay on customer servers or an isolated tenant). Format choices also set storage cost and query speed, which shape pricing and the product experience.`,
        },
        {
          kind: "md",
          md: md`### CSV: the universal format that fails quietly

CSV (comma-separated values, loosely described by RFC 4180) is how data move between tools when nothing else works. For measurement data it fails in six ways:

1. **Size.** A 4-byte float written as text with separators takes 10 to 15 bytes. Files are about 3x larger than binary and slow to parse.
2. **Precision.** A float32 needs 9 significant digits to round-trip exactly, a float64 17. A 24-bit ADC value has about 7.2 decimal digits ($\log_{10}2^{24}$). Exporters that default to 6 significant digits silently throw away resolution.
3. **No metadata.** Units, calibration, sensor serial, sample rate and filter settings are at best in a header row in a home-made convention, at worst nowhere.
4. **Time.** Timestamps as "06/11/2026 14:03:22.5" are ambiguous (day/month order, time zone, daylight-saving). Relative times lose the absolute reference.
5. **Locale.** In the Netherlands, Germany and Switzerland, spreadsheet tools often use a comma as decimal separator and a semicolon as field separator; a file exported in one locale is misread in another.
6. **Limits.** Excel opens at most 1,048,576 rows. At 10 kS/s that is 105 seconds of data.

### ASAM MDF4

**MDF** (Measurement Data Format) began at Vector and Bosch and is standardised by **ASAM** (Association for Standardization of Automation and Measuring Systems) as MDF version 4.x. It is the default in automotive measurement and calibration tools (Vector CANape, ETAS INCA) and in many CAN and CAN FD loggers. Structure, in outline:

- A file is a set of linked **blocks** identified by tags: header (##HD), data groups (##DG), channel groups (##CG), channels (##CN), conversion rules (##CC), source information (##SI), events (##EV), attachments (##AT) and data blocks (##DT, or ##DZ for compressed data, added in MDF 4.1).
- A **channel group** holds records sampled together; one channel in each group is the **master channel**, usually time, so different groups can have different rates or be event-driven (bus messages).
- **Conversion rules** map stored raw values to physical values (linear, rational, table lookup, value-to-text for enumerations), so the file can keep raw ADC integers and still deliver engineering units.
- Metadata (comments, units, source, tool, user) is stored in XML fragments inside the file.

Python teams typically read MDF with the open-source **asammdf** library.

### NI TDMS

**TDMS** (Technical Data Management Streaming) is National Instruments' format, written natively by LabVIEW, DAQmx and DIAdem:

- Three-level hierarchy: **file, groups, channels**, each with arbitrary named **properties** (units, sensor, description, wf_start_time, wf_increment for waveform timing).
- Written as a sequence of **segments**, each with a lead-in, metadata and raw data, so data can be appended while acquiring. A companion **.tdms_index** file speeds up reading.
- Raw data can be stored as scaled values or as raw integers with **scaling properties** (DAQmx can log raw data directly, which is compact and fast).
- Pitfall: many small writes create many segments ("fragmentation"), making files slow to read until defragmented.

Python teams use **npTDMS**.

### HDF5 and MCAP

**HDF5** (The HDF Group) is a general hierarchical container: groups, n-dimensional **datasets** and **attributes**, with **chunking** and compression filters (deflate built in, others via plugins). It is common in science and in ML pipelines, and its single-writer, multiple-reader mode allows reading while recording. Its flexibility is also its weakness: two teams' HDF5 files rarely share a schema.

**MCAP** is an open container for timestamped, multi-channel messages, maintained by Foxglove and widely used in robotics (it is the default bag format in recent ROS 2 releases). It stores serialised messages (images, point clouds, joint states) with schemas and an index, which suits event and sensor-message data rather than fixed-rate waveforms.

### Row vs columnar storage and Parquet

A CSV or a classic database table is **row-oriented**: all fields of one record are stored together. Analytics usually ask column questions: "maximum winding temperature across all endurance runs on firmware 3.2". A row store must read every field of every row to answer it.

**Apache Parquet** stores data **by column**:

- A file contains **row groups** (for example 128 MB to 1 GB of rows); within each, every column is a **column chunk** split into **pages**.
- Each column chunk uses its own **encoding**: dictionary encoding for repeated values (test names, states), run-length and bit-packing for small integers and flags, delta encoding for monotonic timestamps, byte-stream-split for floats (groups the bytes of many floats so the compressor finds patterns).
- Each chunk is then **compressed** (Snappy, ZSTD, gzip and others).
- **Statistics** (min, max, null count) per column chunk and page let a query engine skip row groups that cannot match ("predicate pushdown").

Parquet is read by every analytics engine (DuckDB, Spark, Polars, pandas via Apache Arrow), which is why ML and analytics stacks standardise on it. It is not built for streaming writes: data are buffered and written a row group at a time, so it is a format to convert into, not one to acquire into.`,
        },
        {
          kind: "matrix",
          title: "Where each format fits",
          xAxis: ["Read whole files", "Query selected columns and time ranges"],
          yAxis: ["Written in batch", "Written while acquiring"],
          cells: [
            { label: "MDF4, TDMS", detail: "Acquisition formats: append during the test, rich channel metadata, read mainly in vendor tools or file by file" },
            { label: "HDF5 (chunked), MCAP", detail: "Append while recording with an index for partial reads; schemas vary between teams (HDF5) or are message-based (MCAP)" },
            { label: "CSV", detail: "Exchange and quick looks only: large, lossy, no metadata" },
            { label: "Parquet", detail: "Analytics and ML across many tests: columnar, compressed, statistics for skipping; convert into it after acquisition" },
          ],
          caption: "A common pattern: acquire in the vendor's format, keep those files unchanged, and convert to a columnar format with a shared schema for querying.",
        },
        {
          kind: "md",
          md: md`### Compression: what to expect

Compression ratio is simply raw size over compressed size:`,
        },
        { kind: "equation", formula: "aw02-compression-ratio" },
        {
          kind: "md",
          md: md`Lossless compressors exploit redundancy. Measurement data vary widely:

| Channel type | Why | Indicative lossless ratio |
|---|---|---|
| Noisy high-resolution waveform (vibration, 24-bit) | Low bits are noise, which is incompressible | about 1.2 to 2x |
| Slow channel sampled fast (temperature at 1 kS/s) | Neighbouring samples nearly equal; delta encoding helps | about 3 to 10x |
| Digital states, enumerations, flags | Long runs of identical values | 10 to 100x or more |
| Monotonic timestamps | Constant increments, delta encoding | very high |

These ranges are indicative: always measure on the customer's real files before quoting storage. **Lossy** reduction (decimation, storing only statistics, keeping 16 of 24 bits) can save far more, but it destroys information permanently and must be a recorded, deliberate decision.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Sizing one hour of data in four formats",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "One hour of 24 channels at 10 kS/s",
          given: md`Illustrative: 24 channels at 10 kS/s for 1 hour, stored as float32 where binary. 36,000,000 rows. For CSV assume a 12-byte timestamp field and about 12 bytes per value including the separator.`,
          steps: [
            { md: md`**Binary with implicit time (MDF4, TDMS waveform):** $24\times 4\times 36\times10^6 = 3.456$ GB. Time is start plus increment, a few bytes.` },
            { md: md`**Binary with an explicit float64 timestamp per row:** $(24\times 4 + 8)\times 36\times10^6 = 3.744$ GB.` },
            { md: md`**CSV:** $25\times 12\times 36\times10^6 = 10.8$ GB, 3.1x the binary size, and 34 times more rows than Excel can open.` },
            { md: md`**Parquet with byte-stream-split and ZSTD:** illustrative ratio 1.6 on noisy floats gives $3.456/1.6 \approx 2.2$ GB. The real ratio depends on the signals: measure it.` },
            { md: md`**Query cost:** "maximum of channel 7 in this hour" reads 1/24 of the Parquet file (one column) and can skip row groups whose max statistic is below the current best; on CSV it parses all 10.8 GB.` },
          ],
          result: md`CSV about 10.8 GB, binary 3.5 to 3.7 GB, compressed columnar about 2 GB. The bigger win of columnar storage is not size but reading only what a question needs.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "The cost of converting raw integers to float64",
          given: md`Illustrative: 6 phase channels at 200 kS/s from a 16-bit ADC, 10 minutes of test. The DAQ can log raw int16 with a scale and offset, or the pipeline can convert to float64 engineering units before storing.`,
          steps: [
            { md: md`Samples: $6\times 200{,}000\times 600 = 720\times10^6$.` },
            {
              md: md`Raw int16: $720\times10^6\times 2 = 1.44$ GB.`,
              hidden: true,
              check: { prompt: "Raw int16 size (GB)", answer: 1.44, unit: "GB", tolerance: { rel: 0.01 } },
            },
            {
              md: md`Converted float64: $720\times10^6\times 8 = 5.76$ GB, 4x larger, with no extra information: the 16-bit values plus scale and offset reproduce every float exactly.`,
              hidden: true,
              check: { prompt: "float64 size (GB)", answer: 5.76, unit: "GB", tolerance: { rel: 0.01 } },
            },
            { md: md`Integers also compress better than floats (illustrative 2.4x here, about 0.6 GB), because their low bits are not scrambled by the float representation.` },
          ],
          result: md`Store raw integers plus a conversion rule (MDF CC block, TDMS scaling properties, Parquet column metadata). Convert at read time. It is smaller and it preserves the exact ADC codes for audit.`,
        },
        {
          kind: "question",
          question: {
            id: "aw02-l04-p1",
            type: "numeric",
            prompt: md`A lab stores 120 GB of raw binary per week. After converting to compressed Parquet it stores 48 GB. What is the compression ratio?`,
            answer: 2.5,
            unit: "x",
            tolerance: { abs: 0.01 },
            explanation: md`$\mathrm{CR} = 120/48 = 2.5$. Equivalently, storage falls by 60 %. Check that the "raw" baseline is binary, not CSV: against CSV the same file would look about 8x smaller, which is a misleading number to put in a proposal.`,
            concepts: ["aw02.compression"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Formats in real test organisations",
      blocks: [
        {
          kind: "md",
          md: md`### What you will meet

- **Automotive and drives:** MDF4 from CANape, INCA and loggers; DBC or ARXML files that define how CAN frames decode into signals (without the right version the bus data are just bytes).
- **NI-based labs** (very common in power electronics, batteries and general test): TDMS, often post-processed in DIAdem or Python.
- **Dewesoft and HBK systems:** their own native formats (DXD, BIN and others) with export to MDF4, CSV, MATLAB.
- **Robotics and physical AI teams:** MCAP or ROS bags, HDF5 for training data, Parquet in the analytics stack, video as MP4 files.
- **Everyone:** CSV exports in shared drives, and a spreadsheet of what each file is.

A test lead rarely wants a new format. They want their existing files to stay valid and to be findable and comparable across tests.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Format mistakes to avoid in a pilot",
          md: md`- **Converting and discarding the original:** the vendor file is the evidence; a conversion bug cannot be fixed if the original is gone. Keep raw files immutable with checksums (Lesson 6).
- **Losing metadata in conversion:** MDF and TDMS properties (units, conversion rules, comments, source) must survive into the new schema.
- **Tiny Parquet files:** writing one file per second of data creates millions of small files with poor compression and slow queries; batch into sensible row groups.
- **Assuming the CAN database is fixed:** decoding with the wrong DBC version produces plausible but wrong signals.
- **Quoting compression from a demo file:** compression on a quiet demo signal can be 10x; on noisy 24-bit vibration it may be 1.3x.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Version details to confirm before quoting",
          md: md`The current ASAM MDF release is understood to be version 4.2.x, with compressed data blocks introduced in 4.1; MCAP is understood to be the default rosbag2 storage format from ROS 2 Iron onwards. Confirm the exact version numbers on the ASAM and ROS documentation before putting them in customer-facing material.`,
        },
        { kind: "sources", refs: ["aw02-r1", "aw02-r2", "aw02-r3", "aw02-r4", "aw02-r5", "aw02-r15", "aw02-r16"] },
        { kind: "xref", to: "fc04-l03", note: "Founder Core: how to run the technical deep dive where data formats, limits and deployment are examined, with an engineering partner present." },
        {
          kind: "ask",
          title: "Questions to ask about a prospect's files",
          items: [
            "Which formats do your rigs write, and which tool and version produced them?",
            "Where are raw files stored, for how long, and is anything deleted or overwritten?",
            "How do you find all runs of a given test on a given firmware version today?",
            "Do your exports keep units and calibration constants, or are those elsewhere?",
            "What volume do you store per month, and what does it cost you today?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw02-l04-p2",
            type: "short",
            prompt: md`Write a **storage layout proposal** (300 to 450 words) for an illustrative pilot in which a prospect's drive test lab produces TDMS files from NI systems, MDF4 files from a CAN logger, CSV exports from a test sequencer, and screen recordings. Describe what is kept unchanged, what is converted to what, how files are organised and named, where metadata live, and two risks with mitigations. Write it so that a technical buyer could check it, and flag what Ismail and Yusuf must confirm.`,
            explanation: md`The strongest proposals keep raw files immutable with checksums, convert into one columnar schema with metadata preserved, separate high-rate waveforms from events and video, organise by test run, and are honest about what is not yet built or measured.`,
            rubric: [
              "Raw vendor files kept unchanged, immutable, with checksums, as the source of truth",
              "Conversion to a columnar format (for example Parquet) with a shared schema, preserving units, conversion rules and channel properties",
              "Clear organisation by test run (and rig, date) with a naming convention and a run-level metadata record linking all files",
              "Handles different data kinds appropriately: fixed-rate waveforms, bus messages, events, video kept as video with frame timestamps",
              "Addresses where data live (on customer servers or an isolated tenant) without inventing product capabilities",
              "Two concrete risks with mitigations (for example DBC version, metadata loss, small files, compression assumptions), and items flagged for cofounder review",
            ],
            modelAnswer: md`Draft for Ismail and Yusuf to review (illustrative pilot).

**Principle.** The customer's original files are the evidence. We never modify or delete them. Everything else is derived and can be rebuilt.

**Raw zone.** Every file produced in a test run (TDMS plus its index, MDF4, sequencer CSV, MP4 recordings, the DBC file used by the logger) is copied on arrival into a raw store on the customer's servers, write-once, with a SHA-256 checksum recorded at copy time.

**Run record.** Each run gets an id (rig, date, sequence, for example EDU2-20270115-003) and one metadata record: rig and test procedure version, firmware and inverter software versions, DAQ configuration, channel list version, operator, start and end in UTC, list of raw files with checksums, and the clock alignment parameters (Lesson 3).

**Derived zone.** Fixed-rate channels are converted to Parquet, one dataset per channel group and rate, partitioned by run id, stored as raw integers with scale and offset where the source had them, ZSTD compressed, row groups of roughly 256 MB. Units, conversion rules, sensor serials and calibration references from TDMS properties and MDF CC and CN blocks are carried into column metadata and the run record. CAN data are decoded with the DBC file recorded for that run and stored as a long table (time, signal, value). Sequencer CSV becomes an event table with timestamps mapped to the run's reference clock. Video stays MP4, with a frame-timestamp table.

**Access.** Analytics and Ripple read the derived zone; anyone can trace any derived value back to a raw file and checksum.

**Risks.** (1) Metadata lost in conversion: mitigated by a conversion test that compares units and counts per channel against the source and fails loudly. (2) Wrong DBC version: mitigated by storing the DBC hash in the run record and refusing to decode without it.

**To confirm with Ismail and Yusuf.** Real compression ratios on their files (we will measure, not assume); whether TDMS files are logged raw or scaled; how large a run gets in practice; whether the sequencer can export events with a monotonic clock.`,
            concepts: ["aw02.columnar-storage", "aw02.mdf4", "aw02.tdms", "aw02.csv-pitfalls"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a sales hire why 'we support CSV' is not a good answer to a technical buyer asking which formats Afterwave works with.",
          keyPoints: [
            "Test teams produce native formats (MDF4, TDMS, vendor formats, MCAP) that carry units, scaling and metadata",
            "CSV is about 3x larger, loses precision and drops metadata",
            "Buyers want their raw files kept and readable, not replaced",
            "Columnar formats make queries across many tests fast",
            "The right answer names the formats, says raw files are kept, and describes what metadata are preserved",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw02-l04-q1",
      type: "multi",
      prompt: "Which are real problems with CSV for bench data? (Select all that apply.)",
      options: [
        "Excel can open at most 1,048,576 rows",
        "Six significant digits can lose resolution of 24-bit data",
        "Decimal comma vs point depends on locale",
        "CSV cannot store numbers",
        "Units and calibration are not part of the format",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`CSV stores numbers as text, which is the source of the size and precision problems, but it does store them.`,
      concepts: ["aw02.csv-pitfalls"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw02-l04-q2",
      type: "mcq",
      prompt: "In an MDF4 file, what lets the file store raw ADC integers yet deliver values in engineering units?",
      options: ["The master channel", "Conversion (CC) blocks attached to channels", "The attachment block", "Compression (DZ) blocks"],
      answer: 1,
      explanation: md`Conversion rules (linear, rational, table, value-to-text) map raw values to physical ones. The master channel provides the time axis for a channel group.`,
      concepts: ["aw02.mdf4"],
      difficulty: 2,
    },
    {
      id: "aw02-l04-q3",
      type: "mcq",
      prompt: "Why does a query like 'max winding temperature across 500 runs' run much faster on Parquet than on CSV?",
      options: [
        "Parquet files are always 10x smaller",
        "Parquet reads only the needed column and can skip row groups using min/max statistics",
        "Parquet stores data as text",
        "CSV cannot be read by analytics engines",
      ],
      answer: 1,
      explanation: md`Columnar layout means one column is read, not all of them; statistics allow skipping whole row groups. Compression helps too but is secondary.`,
      concepts: ["aw02.columnar-storage"],
      difficulty: 1,
    },
    {
      id: "aw02-l04-q4",
      type: "numeric",
      prompt: md`8 channels at 50 kS/s for 2 hours are stored as float32. What is the binary size in GB (decimal, implicit time)?`,
      answer: 11.52,
      unit: "GB",
      tolerance: { rel: 0.01 },
      explanation: md`$8\times 50{,}000\times 4\times 7{,}200 = 11.52\times10^9$ B.`,
      concepts: ["aw02.columnar-storage", "aw02.data-rate"],
      difficulty: 1,
    },
    {
      id: "aw02-l04-q5",
      type: "mcq",
      prompt: "Which channel will typically compress worst with lossless compression?",
      options: ["A test-step state channel", "A temperature sampled at 1 kS/s", "A 24-bit vibration channel near the noise floor", "Monotonic timestamps"],
      answer: 2,
      explanation: md`The low bits of a noisy high-resolution signal are random and incompressible; expect around 1.2 to 2x.`,
      concepts: ["aw02.compression"],
      difficulty: 1,
    },
    {
      id: "aw02-l04-q6",
      type: "decision",
      prompt: md`During a pilot, your conversion pipeline turns a prospect's TDMS files into Parquet. An engineer proposes deleting the TDMS originals to save disk. What do you decide?`,
      options: [
        { text: "Agree: Parquet holds the same data.", score: 0, feedback: "Any conversion bug or lost property becomes permanent, and the customer loses their evidence." },
        { text: "Keep the originals immutable with checksums; derived Parquet can be rebuilt. Reduce cost through retention policies agreed with the customer, not by deleting sources.", score: 1, feedback: "Correct: raw files are the source of truth; derived data are disposable." },
        { text: "Keep originals for one week, then delete.", score: 0.3, feedback: "Retention is the customer's decision, made explicitly; deleting sources by default undermines trust and auditability." },
      ],
      explanation: md`Bench memory must be traceable back to original evidence, especially if it later supports safety arguments.`,
      concepts: ["aw02.tdms", "aw02.columnar-storage"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw02-l04-f1", front: "MDF4 key blocks", back: "HD header, DG data group, CG channel group, CN channel, CC conversion, SI source, EV event, AT attachment, DT/DZ data", concepts: ["aw02.mdf4"] },
    { id: "aw02-l04-f2", front: "TDMS hierarchy", back: "File, groups, channels, with properties at each level; written in segments with a .tdms_index file", concepts: ["aw02.tdms"] },
    { id: "aw02-l04-f3", front: "Parquet structure", back: "Row groups, column chunks, pages; per-column encoding and compression; min/max statistics", concepts: ["aw02.columnar-storage"] },
    { id: "aw02-l04-f4", front: "Digits to round-trip float32 / float64", back: "9 / 17 significant digits", concepts: ["aw02.csv-pitfalls"] },
    { id: "aw02-l04-f5", front: "CSV vs binary size (rule of thumb)", back: "About 3x larger", concepts: ["aw02.csv-pitfalls"] },
    { id: "aw02-l04-f6", front: "Store raw int16 or converted float64?", back: "Raw integers plus a conversion rule: 4x smaller, exact, compresses better", concepts: ["aw02.compression"] },
    { id: "aw02-l04-f7", front: "MCAP", back: "Open, indexed container for timestamped multi-channel messages, maintained by Foxglove, common in robotics and ROS 2", concepts: ["aw02.columnar-storage"] },
  ],
};

export default lesson;
