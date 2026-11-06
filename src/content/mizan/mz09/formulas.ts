import { md, type Formula } from "../../schema";

const formulas: Formula[] = [
  {
    id: "mz09-values-per-day",
    name: "Values per day",
    tex: String.raw`N_v = N_{tags} \cdot \frac{86{,}400}{\Delta t}`,
    vars: [
      { sym: "N_v", meaning: "Stored values per day", unit: "values/day" },
      { sym: "N_{tags}", meaning: "Number of tags recorded", unit: "tags" },
      { sym: "\\Delta t", meaning: "Recording interval", unit: "s" },
    ],
    explanation: md`The base of all pipeline sizing. 1 minute recording gives 1,440 values per tag per day, 15 minutes gives 96, 1 second gives 86,400. Historians that store only changes beyond a deadband store fewer values than this; exports that interpolate to a fixed grid store exactly this many.`,
    lesson: "mz09-l01",
  },
  {
    id: "mz09-storage-volume",
    name: "Stored data volume over a period",
    tex: String.raw`V = \frac{N_v \cdot b \cdot D}{C}`,
    vars: [
      { sym: "V", meaning: "Stored volume", unit: "bytes" },
      { sym: "N_v", meaning: "Values per day", unit: "values/day" },
      { sym: "b", meaning: "Bytes per value before compression (historian record about 12 to 16 B, CSV row about 30 to 50 B per value)", unit: "B" },
      { sym: "D", meaning: "Period", unit: "days" },
      { sym: "C", meaning: "Compression ratio of the storage format (1 for raw; Parquet commonly 5 to 20)", unit: "-" },
    ],
    explanation: md`Illustrative 1 GW plant: 339,430 tags at 1 minute, 16 B, 365 days, $C = 1$: about 2.85 TB per year; in Parquet at $C = 10$ about 0.29 TB. Compression depends on the data: smooth, slowly changing series and sorted timestamps compress best.`,
    lesson: "mz09-l01",
  },
  {
    id: "mz09-modbus-rtu-poll",
    name: "Modbus RTU poll time for one read of N registers",
    tex: String.raw`t_{poll} = \frac{(8 + 5 + 2N)\,k}{B} + \frac{2 \times 3.5\,k}{B} + t_{dev}`,
    vars: [
      { sym: "t_{poll}", meaning: "Time for one request and response", unit: "s" },
      { sym: "N", meaning: "Registers read (16-bit each; at most 125 per function 03 request)", unit: "registers" },
      { sym: "k", meaning: "Bits per character on the line (11 in RTU: start, 8 data, parity or second stop, stop)", unit: "bit" },
      { sym: "B", meaning: "Baud rate", unit: "bit/s" },
      { sym: "t_{dev}", meaning: "Device response latency (device dependent, tens of ms typical)", unit: "s" },
    ],
    explanation: md`The request frame of a function 03 read is 8 bytes (address, function, start, quantity, CRC); the response is $5 + 2N$ bytes. Each frame is followed by a silent interval of at least 3.5 character times. At 9,600 baud, 50 registers and 50 ms latency: $t_{poll} \approx 0.19$ s.`,
    lesson: "mz09-l02",
  },
  {
    id: "mz09-bus-cycle",
    name: "Serial bus polling cycle",
    tex: String.raw`T_{cycle} = \sum_{i=1}^{n} t_{poll,i}`,
    vars: [
      { sym: "T_{cycle}", meaning: "Time to poll every device once", unit: "s" },
      { sym: "n", meaning: "Devices (slaves) on the bus", unit: "devices" },
      { sym: "t_{poll,i}", meaning: "Poll time of device i (sum over all reads if several requests per device)", unit: "s" },
    ],
    explanation: md`One master polls slaves one at a time, so poll times add. The fastest refresh any tag on the bus can have is $T_{cycle}$. 30 inverters at 0.19 s each give about 5.6 s: a 1 second data request from such a bus is physically impossible.`,
    lesson: "mz09-l02",
  },
  {
    id: "mz09-api-calls",
    name: "API calls for a bulk historian extraction",
    tex: String.raw`N_{calls} = \left\lceil \frac{N_{tags}\, n_{pt}}{M} \right\rceil,\quad T = N_{calls}\, t_{call}`,
    vars: [
      { sym: "N_{calls}", meaning: "Number of API requests", unit: "calls" },
      { sym: "N_{tags}", meaning: "Tags extracted", unit: "tags" },
      { sym: "n_{pt}", meaning: "Values per tag over the period", unit: "values" },
      { sym: "M", meaning: "Maximum values returned per call (server setting)", unit: "values/call" },
      { sym: "T", meaning: "Total extraction time if run sequentially", unit: "s" },
      { sym: "t_{call}", meaning: "Time per call", unit: "s" },
    ],
    explanation: md`300 tags, 2 years at 1 minute, $M = 150{,}000$: $315.4$ million values, 2,103 calls; at 2 s per call about 70 minutes. Paging, rate limits and the load on a production historian set the real schedule: extract at night, in chunks, with the operator's agreement.`,
    lesson: "mz09-l03",
  },
  {
    id: "mz09-storage-cost",
    name: "Annual object storage cost with accumulating data",
    tex: String.raw`C_{s} = 12\, p_s \left(V_0 + \tfrac{1}{2} V_{yr}\right)`,
    vars: [
      { sym: "C_s", meaning: "Storage cost over the year", unit: "USD/yr" },
      { sym: "p_s", meaning: "Storage price", unit: "USD per GB-month" },
      { sym: "V_0", meaning: "Volume stored at the start of the year", unit: "GB" },
      { sym: "V_{yr}", meaning: "Volume added during the year, assumed uniform", unit: "GB" },
    ],
    explanation: md`The average volume held during the year is the opening volume plus half the year's additions. At an illustrative USD 0.023 per GB-month, a 1 GW plant's 290 GB per year of Parquet costs about USD 40 in its first year. Storage is rarely the cost that matters; people, integration and always-on databases are.`,
    lesson: "mz09-l04",
  },
  {
    id: "mz09-completeness",
    name: "Data completeness",
    tex: String.raw`C_d = \frac{N_{valid}}{N_{expected}}`,
    vars: [
      { sym: "C_d", meaning: "Completeness over the period", unit: "fraction" },
      { sym: "N_{valid}", meaning: "Intervals with a value that passed quality checks", unit: "intervals" },
      { sym: "N_{expected}", meaning: "Intervals expected (daylight intervals for irradiance and power)", unit: "intervals" },
    ],
    explanation: md`Count only daylight intervals for irradiance and power, otherwise nights inflate the denominator or the numerator. Values that are present but stale, out of range or flagged bad are not valid. Pilots commonly set a threshold (for example 90 to 95 % per day) below which a day is excluded.`,
    lesson: "mz09-l05",
  },
  {
    id: "mz09-solar-noon",
    name: "Solar noon in local clock time",
    tex: String.raw`t_{noon} = 720 - 4\,(\lambda - \lambda_{std}) - E \quad [\text{min after midnight}]`,
    vars: [
      { sym: "t_{noon}", meaning: "Clock time of solar noon", unit: "min after local midnight" },
      { sym: "\\lambda", meaning: "Site longitude, east positive", unit: "°" },
      { sym: "\\lambda_{std}", meaning: "Standard meridian of the time zone, 15° per hour of UTC offset (45° E for Kuwait, UTC+3)", unit: "°" },
      { sym: "E", meaning: "Equation of time (about -14 min in mid February to +16 min in early November)", unit: "min" },
    ],
    explanation: md`The sun moves 1° of longitude in 4 minutes. At about 47° E in early November ($E \approx +16.4$ min): $720 - 8 - 16.4 = 695.6$ min, about 11:36 local. The centre of a clear-day power or irradiance curve should sit there; a shift of hours means a time zone error, a shift of half an interval means an interval-labelling convention.`,
    lesson: "mz09-l05",
  },
  {
    id: "mz09-drift-bias",
    name: "Performance index bias from irradiance sensor drift",
    tex: String.raw`\mathrm{PI}_{meas} = \frac{\mathrm{PI}_{true}}{r}, \quad r = \frac{G_{meas}}{G_{true}}`,
    vars: [
      { sym: "\\mathrm{PI}_{meas}", meaning: "Performance index computed with the drifting sensor", unit: "-" },
      { sym: "\\mathrm{PI}_{true}", meaning: "Performance index with correct irradiance", unit: "-" },
      { sym: "r", meaning: "Ratio of measured to true irradiance (below 1 if the sensor reads low)", unit: "-" },
    ],
    explanation: md`A sensor that reads 2 % low ($r = 0.98$) makes the plant look 2 % better than it is. Slow drift of the ratio between two co-located sensors is the practical detector: track it daily on clear-sky periods.`,
    lesson: "mz09-l05",
  },
];

export default formulas;
