import { md, type Formula } from "../../schema";

const formulas: Formula[] = [
  {
    id: "m14-token-estimate",
    name: "Token estimate for a document",
    tex: md`T \approx r \cdot N_w`,
    vars: [
      { sym: "T", meaning: "Number of tokens", unit: "tokens" },
      { sym: "r", meaning: "Tokens per word (≈1.3 English; often ≈2 or more for Arabic — measure)", unit: "tokens/word" },
      { sym: "N_w", meaning: "Word count", unit: "words" },
    ],
    explanation: md`A planning estimate. Tables, numbers and OCR'd PDFs inflate counts; use the tool's token counter when it matters.`,
    lesson: "m14-l01",
  },
  {
    id: "m14-context-budget",
    name: "Context-window budget",
    tex: md`T_{doc} + T_{prompt} + T_{hist} + T_{out} \le W`,
    vars: [
      { sym: "T_{doc}", meaning: "Tokens of documents provided", unit: "tokens" },
      { sym: "T_{prompt}", meaning: "Tokens of instructions", unit: "tokens" },
      { sym: "T_{hist}", meaning: "Tokens of earlier conversation", unit: "tokens" },
      { sym: "T_{out}", meaning: "Tokens of expected output", unit: "tokens" },
      { sym: "W", meaning: "Context window of the model", unit: "tokens" },
    ],
    explanation: md`If the inequality fails, chunk the task (by criterion, section or bidder) and merge structured outputs. Even when it holds, very long inputs warrant quotes and verification.`,
    lesson: "m14-l01",
  },
  {
    id: "m14-softmax",
    name: "Next-token probability with temperature (softmax)",
    tex: md`p_i = \dfrac{e^{z_i/T}}{\sum_j e^{z_j/T}}`,
    vars: [
      { sym: "p_i", meaning: "Probability of candidate token i", unit: "–" },
      { sym: "z_i", meaning: "Model score (logit) for token i", unit: "–" },
      { sym: "T", meaning: "Sampling temperature", unit: "–" },
    ],
    explanation: md`Lower $T$ sharpens the distribution (more deterministic); higher $T$ flattens it (more varied). Temperature changes variability, not truthfulness.`,
    lesson: "m14-l01",
  },
  {
    id: "m14-llm-cost",
    name: "Cost of an LLM call",
    tex: md`C = \dfrac{T_{in}\, p_{in} + T_{out}\, p_{out}}{10^6}`,
    vars: [
      { sym: "C", meaning: "Cost of the call", unit: "USD" },
      { sym: "T_{in}", meaning: "Input tokens", unit: "tokens" },
      { sym: "T_{out}", meaning: "Output tokens", unit: "tokens" },
      { sym: "p_{in}", meaning: "Price per million input tokens", unit: "USD/Mtok" },
      { sym: "p_{out}", meaning: "Price per million output tokens", unit: "USD/Mtok" },
    ],
    explanation: md`Prices vary by model and change often — use the provider's current price list. For PM tasks the cost is usually negligible compared with the reviewer's time.`,
    lesson: "m14-l01",
  },
];

export default formulas;
