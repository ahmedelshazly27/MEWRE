import { md } from "../../schema";

const cheatSheet = md`# AW08 ML and agents on bench data: cheat sheet

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Nyquist | $f_s > 2f_{max}$, $f_N = f_s/2$ | L1 |
| Frequency resolution | $\Delta f = f_s/N = 1/T$ | L1 |
| Tone amplitude | $A = 2|X[k]|/N$ | L1 |
| Order | $f = O\,n/60$ | L1 |
| Data volume | $V = C f_s b T$ | L1 |
| Robust z | $z_r = 0.6745(x-\tilde{x})/\text{MAD}$ | L2 |
| False alarms | $E[\text{FA}] = m\alpha$ | L2 |
| Precision at base rate | $br/(br + (1-b)f)$ | L2 |
| Alarm cost | $C = N_{FP}c_{FP} + N_{FN}c_{FN}$ | L2 |
| Optimal threshold | $p^* = c_{FP}/(c_{FP}+c_{FN})$ | L2 |
| Training compute | $C \approx 6ND$ | L3 |
| Weight memory | $M = P\,b_w$ | L3 |
| Rule of three | $p_{95} \approx 3/n$ | L3 |
| pass^k | $\approx p^k$ | L4 |
| Rig hours recovered | $\Delta H = R H_n (u_1-u_0) d$ | L4 |
| Gate cost | $L = Np_e(1-c_g)D + Nt_r w$ | L4 |
| Release cost | $C_{rel} = n_r h_r w + n_v c_v$ | L5 |
| Learning curve | $\varepsilon = \varepsilon_\infty + AD^{-\alpha}$; halve: $2^{1/\alpha}$ | L6 |
| Data stock | $S^* = d/\lambda$, $\lambda = \ln 2/t_{1/2}$ | L6 |

## Key numbers

| Quantity | Value |
|---|---|
| Kurtosis: Gaussian / sine | 3 / 1.5 |
| Crest factor: sine / noise | 1.41 / 3 to 4 |
| Hann: sidelobe, worst amplitude error, coherent gain | about −31.5 dB, 1.4 dB, 0.5 |
| Two-sided 3σ false alarm probability | 0.27 % |
| Precision at 1 % base rate, 90 % recall, 3 % FPR | 23 % |
| Recall 10 of 12, 95 % Wilson interval | 55 % to 95 % |
| 8B / 70B model weights in bf16 | 16 GB / 140 GB |
| 0.85 per attempt over 3 attempts | 61 % |

## Time series (L1)

- **Sampling:** aliasing is fixed only by an analog filter before the converter.
- **Decimate:** filter, then downsample; in stages for large factors.
- **Resolution:** set by record length; zero-padding adds none.
- **Windows:** Hann with 50 % overlap by default; flat-top for amplitudes.
- **Rotating machines:** order-track; watch mesh sidebands.
- **Context columns:** test step, firmware, rig, unit serial on every window.

## Anomaly detection (L2)

- **Start with:** robust baselines per variant, test step and rig.
- **Then:** isolation forest on features; autoencoder on waveforms, trained on healthy data only.
- **Report:** recall and precision at the production base rate, never accuracy.
- **Threshold:** by cost and alarm budget, not 3σ by habit.
- **Every alarm:** feature, step, plot vs baseline, similar past runs.

## Local models (L3)

- **Limit:** labelled failures, not compute.
- **Labels:** triage feedback, failure records, weak rules, active learning.
- **Numbers to numeric models;** LLMs for text, logs, reports and tools.
- **Escalation:** prompt, retrieval, tools, then fine-tune.
- **Split:** by unit or time; baseline = current engineering rule.
- **Serving** sets the GPU budget.

## Rig agents (L4)

- **Tiers:** read, analyse, propose, schedule, actuate.
- **Select, do not author:** released ids only.
- **Safety and limits:** in the rig, never reachable by the agent.
- **No restart after a trip.**
- **Evaluate** on replayed historical changes; rerun on every change.
- **Rollout:** shadow, schedule, one rig, widen by evidence.

## Enclave security (L5)

- **Why in-house:** competitive value, trade secret reasonable steps, export controls, contracts, GDPR.
- **Guarantees:** residency, no default egress, isolation, customer keys, SSO, audit incl. agent calls, customer owns models, approved LLM endpoints, no standing vendor access, signed updates, deletion.
- **Not an SGX enclave;** confidential computing is optional hardening.
- **Never claim** a certification you do not hold.

## Data moat (L6)

- **Compounds only if:** material gains, lasting relevance, rights to use.
- **Enclave:** no cross-customer pooling of customer data.
- **Real advantages:** switching costs, system of record, product know-how, later owned platform data.
`;

export default cheatSheet;
