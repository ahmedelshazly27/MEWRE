import { md } from "../../schema";

const cheatSheet = md`# MZ05 Tracker and stow control: cheat sheet

## Kinematics

- **Convention:** $R = 0$ flat, negative east (morning), positive west; axis azimuth 180° for north-south.
- **True tracking:** $\tan R = \tan\theta_z\sin(\gamma_s - \gamma_a)$; clip at the mechanical limit (52 to 60°).
- **Residual incidence:** the axial sun component cannot be removed; about 13° on a June morning, 35° on a December morning at 29.3°N.
- **Backtracking:** needed when $\cos R_\text{true} < \text{GCR}$; onset 69.5° at GCR 0.35, 63.3° at GCR 0.45.
- **Clock error:** 10 minutes is about 2.5° of pointing error.
- **Diffuse mode:** under heavy dust flat and tracking positions are within a few percent; measure, do not model.

| Example (29.3°N) | $R_\text{true}$ | GCR | Result |
|---|---|---|---|
| 21 Jun 07:00 | $-65.6°$ | 0.35 | Limit-bound at $-60°$, no shade |
| 21 Jun 07:00 | $-65.6°$ | 0.45 | Backtrack to $-42.2°$, beam 0.918 |
| 21 Dec 08:00 | $-75.5°$ | 0.35 | Backtrack to $-31.1°$, beam 0.715 |

## Wind and stow

- **Load:** $q = \tfrac12\rho V^2$; 222 Pa at 20 m/s and 45 °C; 18 to 22 m/s is 49% more load.
- **Torque:** $M' = qC_Mc^2$; 2P carries 4 times the torque of 1P.
- **Galloping:** self-excited twisting above a critical reduced velocity $V/(f_tc)$; often worst near flat; sets the stow angle.
- **Threshold needs statistic and height:** 18 m/s at 10 m is about 15.2 m/s at 3 m ($\alpha = 0.14$).
- **Gust factor:** about 1.4 to 1.5 at 10 m; 13 m/s mean forecast implies an 18.9 m/s gust.
- **Trigger logic:** safety-biased voting, hysteresis, minimum stow time, lead time covering rotation.
- **Fail-safe:** heartbeat loss, sensor fault, low battery, grid loss: each row stows on its own.
- **Never sell a higher threshold.** Sell faster evidence-based release, zonal stow, fewer false trips.

## Vendor landscape (research brief, Nov 2026, public material)

| Vendor | Public stow features | Dust or soiling stow |
|---|---|---|
| Nextracker (Nextpower) | NX Navigator, Hail Pro, forecast wind and hail stow 60 to 75° | Not found |
| Array | SmarTrack Diffuse, Snow, Hail Alert Response; Hail XP 77° | Not found |
| GameChange | SmartStow, HailStow; robotic cleaner integration | Not found |
| Arctech | SkyLine II, dominant in the Middle East; Manah I 22 m/s | Not found |

## Dust, night and heat

- **Evidence:** Figgis 2019 (stow at maximum tilt toward the wind at night); Khan 2024 (coating plus vertical night stow, up to 85% less soiling, stow not isolated); Cal Poly 2020 (52°, about 20% less in week one).
- **Mechanisms:** less deposition, gravity shedding, less dew ($F_\text{sky} = (1+\cos\beta)/2$).
- **Cheap moments to stow:** night and dust storms (DNI already collapsed).
- **Heat:** batteries and electronics age, tubes expand (72 mm per 100 m at 60 K), air density falls 9%.

## Control architecture

- **Layers:** row controller, network controller, vendor supervisor, SCADA, owner operations; PPC is separate.
- **Integration levels:** 0 read-only, 1 advisory, 2 supervisory request, 3 vendor-set parameters.
- **Monotone safety:** only more conservative, expiry, heartbeat reversion, vendor logic first.
- **Latency:** upwind sensors or forecasts; edge sensors on a 3 km plant give 4 minutes against an 8.5-minute budget.

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| True tracking | $\tan R = \tan\theta_z\sin(\gamma_s-\gamma_a)$ | L1 |
| Backtracked angle | $\lvert R_b\rvert = \lvert R\rvert - \arccos(\cos R/\text{GCR})$ | L1 |
| Moment per metre | $M' = qC_Mc^2$ | L2 |
| Wind profile | $V(z) = V_\text{ref}(z/z_\text{ref})^\alpha$ | L2 |
| Stow net benefit | $\Delta C = p_\text{dmg}D + S - L$ | L3 |
| Average soiling loss | $\bar s = rT/2$ | L3 |
| Latency budget | $\sum t + \Delta\theta/\omega < d/u$ | L4 |
| Paired sample size | $n = ((z_{\alpha/2}+z_\beta)\sigma_d/\delta)^2$ | L5 |

## Pilot

- **Ladder:** analytics baseline, shadow mode, advisory or supervisory on matched test blocks, readout.
- **Sign-offs:** vendor non-objection, owner, O&M availability treatment, insurer and lenders notified.
- **Unit of evidence:** one block pair over one cleaning cycle; 13 pair-cycles for 1.2 points at $\sigma_d = 1.5$.
- **Illustrative value:** night stow about USD 74k/yr per 100 MWac at USD 15/MWh if the 30% assumption holds.
`;

export default cheatSheet;
