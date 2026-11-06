import { md } from "../../schema";

const cheatSheet = md`# MZ09 Plant data pipelines: cheat sheet

## Conventions

- **Status of numbers:** all plant designs, volumes and costs are **illustrative**, not Shagaya or Mizan data.
- **Pilot status:** the Shagaya Phase I soiling pilot is **targeted / in preparation**, not signed.
- **Time:** Kuwait is **UTC+3 all year, no daylight saving** (Asia/Kuwait).

## Plant data anatomy

- **Tag:** one named time series; each record is **timestamp, value, quality**.
- **Tag kinds:** analog, digital status, alarm and event, setpoint and command.
- **Core soiling tags:** inverter power or energy, status and limitation flags, all POA sensors, temperatures, wind, PPC setpoint, meter, tracker angle.
- **Outside SCADA:** module cleaning log, sensor cleaning and calibration log, outage log, tag dictionary, SLD.
- **Sampling vs recording:** read often, store the **mean** at the recording interval (Class A: 1 minute or faster).
- **Energy counters beat power snapshots:** differences are exact; watch resets and rollovers.

| Illustrative plant | Tags | All tags at 1 min, raw | Parquet (10:1) |
|---|---|---|---|
| 100 MWac fixed tilt, 15 min | about 19,000 | 11 GB/yr | about 1 GB/yr |
| 1 GWac tracker | about 340,000 | 2.9 TB/yr | about 0.3 TB/yr |
| 1 GW soiling subset | about 100,000 | 0.86 TB/yr | about 86 GB/yr |
| 1 GW everything at 1 s | about 340,000 | 171 TB/yr | nobody stores this |

## Protocols

| Protocol | Where | Pattern | Timestamp | Security | Port |
|---|---|---|---|---|---|
| **Modbus RTU/TCP** | Field devices | Polling registers | At poller | None | 502 |
| **OPC UA** | SCADA, PPC, gateways | Subscriptions | At source | Certificates, sign and encrypt | 4840 |
| **IEC 61850** | Substation, PPC, DER (7-420) | Reports, GOOSE | At source | IEC 62351 | 102 |
| **DNP3** | Utility telemetry | Poll plus events | At source (events) | SAv5 if enabled | 20000 |
| **MQTT** | Edge to cloud | Publish-subscribe, outbound | In payload | TLS if enabled | 1883 / 8883 |

- **Modbus traps:** scale factors, 32-bit word order, 0- vs 1-based addresses, 125 registers per read.
- **Serial bus cycle:** poll times add; 30 inverters at 9,600 baud is about 6 s per refresh.
- **Approvable link:** read from historian or DMZ replica, **outbound TLS only, no write path**; offer file exports first.

## Historians and access

- **PI System:** Data Archive, Interfaces/Connectors, Asset Framework, Vision, DataLink, Web API, PI-to-PI (AVEVA since 2021).
- **Exception and swinging-door compression:** stored points are irregular; straight lines between them.
- **Retrieval:** recorded, interpolated, **time-weighted average** (use for analytics, with percent good).
- **Interpolation danger:** straight lines across gaps.
- **Access ladder:** manual CSV, scheduled export, read-only API, replication, streaming gateway.
- **DSA clauses:** purpose, scope, security, hosting, confidentiality, ownership of derived results, co-publication, deletion, term.

## Architecture and cost

- **Layers:** source, gateway, transport, landing, raw, cleaned, results, serving.
- **Lake is the system of record** (Parquet, partitioned by site and date); **TSDB is a cache** for dashboards.
- **Long format for raw, wide for analysis.** Never overwrite raw; version algorithms; log exclusions as data.
- **Bandwidth:** 1 GW, all tags, 1 minute is about 2.3 Mbit/s. Not the constraint.
- **Cost:** illustrative pilot about USD 27k in year one, over 80 % people, about 8 % cloud.
- **Deployment:** multi-tenant cloud, dedicated tenant, or on-premises; one portable pipeline.

## Data quality

- **Tests:** completeness, stale runs, limits, spikes, timestamps, duplicates, unit changes, counter resets, sensor ratios, availability, curtailment, clipping, derating, stow.
- **Timestamp test:** clear-day curve centred on solar noon; hours off means zone, half an interval off means label convention.
- **Drift:** a sensor reading low by $r$ inflates PI by $1/r$; trend co-located sensor ratios.
- **Gulf traps:** dust storms are signal (flag, keep); fast sensor soiling; heat derating looks like curtailment; Kuwait temperature limits.
- **Order:** store raw, inventory, test, report, **agree rules with operator and research partner**, then compute.

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Values per day | $N_v = N_{tags} \cdot 86{,}400/\Delta t$ | l01 |
| Stored volume | $V = N_v\, b\, D / C$ | l01 |
| Modbus RTU poll | $t_{poll} = (13 + 2N)k/B + 7k/B + t_{dev}$ | l02 |
| Bus cycle | $T_{cycle} = \sum t_{poll,i}$ | l02 |
| API calls | $N_{calls} = \lceil N_{tags}\, n_{pt}/M \rceil$ | l03 |
| Storage cost per year | $C_s = 12\, p_s (V_0 + V_{yr}/2)$ | l04 |
| Completeness | $C_d = N_{valid}/N_{expected}$ | l05 |
| Solar noon (local, min) | $t_{noon} = 720 - 4(\lambda - \lambda_{std}) - E$ | l05 |
| Drift bias | $\mathrm{PI}_{meas} = \mathrm{PI}_{true}/r$ | l05 |
`;

export default cheatSheet;
