import { md } from "../../schema";

const cheatSheet = md`# SH09 Open-weight LLM research fundamentals: cheat sheet

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Pretraining loss | $\mathcal{L} = -\frac{1}{T}\sum \log p_\theta(x_t \mid x_{<t})$ | L1 |
| Perplexity | $\text{PPL} = e^{\mathcal{L}}$ | L1: same tokenizer only |
| SFT loss | cross-entropy on response tokens only | L1 |
| Reward model | $-\log\sigma(r_w - r_l)$ | L1 |
| DPO | $-\log\sigma(\beta[\log\frac{\pi_\theta(y_w)}{\pi_{\text{ref}}(y_w)} - \log\frac{\pi_\theta(y_l)}{\pi_{\text{ref}}(y_l)}])$ | L1: $\ln 2$ at start |
| MinHash LSH | $P = 1-(1-s^r)^b$, threshold $\approx (1/b)^{1/r}$ | L1 |
| Fertility | $F = N_{\text{tokens}}/N_{\text{words}}$ | L2 |
| Context in words | $W = L_{\text{ctx}}/F$ | L2 |
| Vocabulary extension | $\Delta P = k\,\Delta V\,d_{\text{model}}$ | L2 |
| Training compute | $C \approx 6ND$; inference $2N$ per token | L3 |
| Chinchilla loss | $L = E + A/N^{\alpha} + B/D^{\beta}$ | L3 |
| Compute-optimal | $D \approx 20N$, $N \approx \sqrt{C/120}$ | L3 |
| Lifetime compute | $6ND + 2ND_{\text{inf}}$ | L3 |
| GPU-hours | $6ND/(\text{MFU}\cdot P_{\text{peak}}\cdot 3600)$ | L4 |
| Training state | $16N$ bytes | L4 |
| Activations per layer | $sbh(34 + 5as/h)$ bytes | L4 |
| KV cache per token | $2\,n_{\text{layers}}\,n_{\text{kv}}\,d_{\text{head}}\,b_p$ | L4 |
| SE of accuracy | $\sqrt{p(1-p)/n}$, 95 % $\pm 1.96$ SE | L5 |
| Paired SE | $\sqrt{(p_{10}+p_{01}-\Delta^2)/n}$ | L5 |
| Items to detect $\delta$ | $7.84 \cdot 2p(1-p)/\delta^2$ | L5 |
| Cohen's kappa | $(p_o - p_e)/(1-p_e)$ | L5 |
| Exponent sampling | $q_i = n_i^{\alpha}/\sum n_j^{\alpha}$, epochs $q_iD/n_i$ | L6 |

## Key numbers

| Quantity | Value |
|---|---|
| H100 SXM dense BF16 peak | about 989 TFLOP/s |
| Good MFU, large dense training | 35 to 50 % |
| Chinchilla | 70 B on 1.4 T tokens, $5.9 \times 10^{23}$ FLOP |
| ALLaM-7B | 5.2 T tokens, about 743 tokens per parameter |
| Llama 3 8B | about 15 T tokens, about 1,875 tokens per parameter |
| Repetition limit | about 4 epochs nearly as good as fresh data |
| 7B training state | 112 GB |
| 70B weights, BF16 / 4-bit | 140 GB / about 35 GB |
| 8B-class KV cache | 128 KiB per token, 1 GiB per 8K tokens |
| 500 items at 70 % | $\pm 4.0$ pp (95 %) |
| Items to detect 2 pp at 70 % | about 8,200 (unpaired) |

## Cost ladder (H100, 40 % MFU, illustrative USD 2.50 per GPU-hour, clean run)

| Run | FLOP | GPU-hours | USD |
|---|---|---|---|
| LoRA SFT 8B, 50 M tokens | $1.6 \times 10^{18}$ | about 1 | under 5 |
| Continued pretraining 7B, 100 B tokens | $4.2 \times 10^{21}$ | 2,949 | about 7,400 |
| From scratch 7B, 2 T tokens | $8.4 \times 10^{22}$ | 58,982 | about 147,000 |
| From scratch 70B, 2 T tokens | $8.4 \times 10^{23}$ | 589,821 | about 1.47 million |

Programmes cost 2 to 3 times the clean run.

## Arabic models and benchmarks (research brief, Nov 2026)

| Name | Facts |
|---|---|
| **Jais 2** | 70 B, open weights, about 600 B Arabic tokens, Dec 2025 |
| **Falcon-H1 Arabic** | 3 B, 7 B, 34 B; hybrid Mamba-Transformer; Falcon LLM License; Jan 2026 |
| **ALLaM-7B-Instruct-preview** | SDAIA, 5.2 T English and Arabic tokens |
| **Fanar-1-9B** | QCRI, on Gemma-2, about 1 T tokens (about 410 B Arabic) |
| **OALL v2** | native tasks only (machine-translated dropped) |
| **ArabicMMLU** | about 14.5K native exam questions |
| **BALSAM** | 78 tasks, 14 categories, 52K examples, blind test sets |

## Tokenisation

- **Clitics**: one Arabic word can carry several English words; compare languages on parallel text.
- **Root and pattern**: interleaved roots cannot be captured by adjacent merges.
- **Full diacritics**: sharply raise fertility; light natural diacritics are fine.
- **Dialects and Arabizi**: no standard spelling, so rarer strings and longer codes.
- **Never compare loss per token across tokenizers**: use bits per word or a benchmark.

## Evaluation and data

- **Contamination checks**: n-gram overlap (13-grams), canaries, perplexity probes, private test sets (strongest). Translations leak too.
- **LLM judges**: swap order, control length, validate with kappa against native speakers.
- **Rights**: collect, train, redistribute are three questions; NC data stays out of commercial releases.
- **Dialect mix**: sampling rebalances, cannot create data; cap at about 4 epochs.
- **Filters**: track retention per variety; MSA-tuned filters delete dialect.

## Research arm

- **Home ground**: benchmarks, consented datasets, independent evaluation, tokenizer studies, LoRA fine-tunes.
- **Not ours**: pretraining from scratch; partner with sovereign labs.
- **Review order**: question, prior work, baseline, evaluation statistics, data rights, compute and memory, people, gates, release.
- **Independence**: method first, same harness for all, funding disclosed, no sponsor preview.
`;

export default cheatSheet;
