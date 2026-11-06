import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "sh09-open-weights", en: "Open-weight model", ar: "نموذج مفتوح الأوزان", definition: md`A model whose trained parameters are published for download, under a licence that may still restrict use. Not the same as open source, which also implies open code and often open data.`, lesson: "sh09-l01", category: "technical" },
  { id: "sh09-pretraining", en: "Pretraining", ar: "التدريب المسبق", definition: md`Training a model from random initialisation on very large text with next-token cross-entropy; produces the base model.`, lesson: "sh09-l01", category: "technical" },
  { id: "sh09-continued-pretraining", en: "Continued pretraining", ar: "مواصلة التدريب المسبق", definition: md`Further next-token training of an existing base model on new-language or new-domain text, often with vocabulary extension and replay of original data.`, lesson: "sh09-l01", category: "technical" },
  { id: "sh09-cross-entropy", en: "Cross-entropy loss", ar: "دالة خسارة الإنتروبيا المتقاطعة", definition: md`Mean negative log-probability the model assigns to the true next token, in nats per token.`, lesson: "sh09-l01", category: "technical" },
  { id: "sh09-perplexity", en: "Perplexity", ar: "الحيرة (مقياس الارتباك)", definition: md`$e^{\mathcal{L}}$: the effective number of equally likely choices per token. Comparable only with the same tokenizer and text.`, lesson: "sh09-l01", category: "technical" },
  { id: "sh09-sft", en: "Supervised fine-tuning (SFT)", ar: "الضبط الدقيق الخاضع للإشراف", definition: md`Training on prompt-response pairs with loss on response tokens only; teaches format and behaviour.`, lesson: "sh09-l01", category: "technical" },
  { id: "sh09-rlhf", en: "Reinforcement learning from human feedback (RLHF)", ar: "التعلم المعزز من الملاحظات البشرية", definition: md`Training a reward model on human preference pairs, then optimising the policy against it with a KL penalty to the SFT model (for example with PPO).`, lesson: "sh09-l01", category: "technical" },
  { id: "sh09-dpo", en: "Direct Preference Optimisation (DPO)", ar: "التحسين المباشر للتفضيلات", definition: md`Preference tuning without a reward model: a logistic loss on the difference of policy-to-reference log-ratios of chosen and rejected responses.`, lesson: "sh09-l01", category: "technical" },
  { id: "sh09-minhash", en: "MinHash deduplication", ar: "إزالة التكرار بخوارزمية MinHash", definition: md`Estimating Jaccard similarity of documents from minimum hash values and finding near-duplicates with locality-sensitive hashing.`, lesson: "sh09-l01", category: "technical" },
  // l02
  { id: "sh09-bpe", en: "Byte-pair encoding (BPE)", ar: "ترميز أزواج البايتات", definition: md`Tokenizer built by repeatedly merging the most frequent adjacent pair of symbols.`, lesson: "sh09-l02", category: "technical" },
  { id: "sh09-fertility", en: "Fertility (tokens per word)", ar: "خصوبة الترميز (عدد الرموز لكل كلمة)", definition: md`Average tokens per whitespace word for a language variety; multiplies cost, latency and context use.`, lesson: "sh09-l02", category: "technical" },
  { id: "sh09-clitic", en: "Clitic", ar: "اللاصقة (الضميمة)", definition: md`A grammatical element written attached to a word, such as و، ب، ال or a pronoun suffix; one reason Arabic words carry several English words' meaning.`, lesson: "sh09-l02", category: "technical" },
  { id: "sh09-diacritics", en: "Diacritics (harakat)", ar: "الحركات (التشكيل)", definition: md`Short-vowel and related marks, separate Unicode characters usually omitted in normal text; full diacritisation sharply raises token counts.`, lesson: "sh09-l02", category: "technical" },
  { id: "sh09-arabizi", en: "Arabizi", ar: "العربيزي (الكتابة بالحروف اللاتينية)", definition: md`Arabic written in Latin letters with digits for sounds Latin lacks (3 for ع, 7 for ح).`, lesson: "sh09-l02", category: "technical" },
  // l03
  { id: "sh09-scaling-law", en: "Scaling law", ar: "قانون التوسع", definition: md`An empirical power law relating model loss to parameters, data and compute.`, lesson: "sh09-l03", category: "technical" },
  { id: "sh09-compute-optimal", en: "Compute-optimal (Chinchilla-optimal)", ar: "الأمثل حسابيًا (وفق قاعدة شينشيلا)", definition: md`The parameter and token split that minimises loss for a fixed training compute, about 20 tokens per parameter.`, lesson: "sh09-l03", category: "technical" },
  { id: "sh09-over-training", en: "Over-training", ar: "التدريب الزائد المقصود", definition: md`Training a smaller model on far more tokens than compute-optimal to make it cheaper to serve.`, lesson: "sh09-l03", category: "technical" },
  // l04
  { id: "sh09-mfu", en: "Model FLOPs utilisation (MFU)", ar: "نسبة استغلال القدرة الحسابية للنموذج", definition: md`Useful model FLOP per second divided by the hardware's peak; turns FLOP into GPU-hours.`, lesson: "sh09-l04", category: "technical" },
  { id: "sh09-gpu-hour", en: "GPU-hour", ar: "ساعة وحدة معالجة رسومية", definition: md`One GPU used for one hour; the unit of compute pricing. Always state the GPU type.`, lesson: "sh09-l04", category: "financial" },
  { id: "sh09-kv-cache", en: "KV cache", ar: "ذاكرة المفاتيح والقيم المؤقتة", definition: md`Stored keys and values of previous tokens during generation; grows with context length and users.`, lesson: "sh09-l04", category: "technical" },
  { id: "sh09-lora", en: "LoRA (low-rank adaptation)", ar: "التكيّف منخفض الرتبة", definition: md`Fine-tuning by training small low-rank matrices added to frozen weights; QLoRA keeps the base in 4-bit.`, lesson: "sh09-l04", category: "technical" },
  // l05
  { id: "sh09-benchmark", en: "Benchmark", ar: "معيار التقييم المرجعي", definition: md`A fixed set of items, prompt format and scoring rule used to measure a model capability.`, lesson: "sh09-l05", category: "technical" },
  { id: "sh09-contamination", en: "Benchmark contamination", ar: "تلوّث بيانات التقييم", definition: md`Test items, translations or paraphrases present in training data, inflating scores through memorisation.`, lesson: "sh09-l05", category: "technical" },
  { id: "sh09-llm-judge", en: "LLM-as-judge", ar: "النموذج اللغوي حَكَمًا", definition: md`Using a language model to grade or compare answers; biased by position, length and style, and must be validated against humans.`, lesson: "sh09-l05", category: "technical" },
  // l06
  { id: "sh09-datasheet", en: "Datasheet for a dataset", ar: "بطاقة توصيف مجموعة البيانات", definition: md`Structured documentation of a dataset's motivation, composition, collection, preprocessing, uses, distribution and maintenance.`, lesson: "sh09-l06", category: "pm" },
  { id: "sh09-informed-consent", en: "Informed consent", ar: "الموافقة المستنيرة", definition: md`A contributor's documented agreement to a stated purpose, licence, withdrawal terms and data handling.`, lesson: "sh09-l06", category: "contractual" },
  { id: "sh09-cc-by", en: "Creative Commons Attribution (CC BY 4.0)", ar: "رخصة المشاع الإبداعي، نسب المصنف", definition: md`Licence allowing any use, including commercial, with attribution; NC variants forbid commercial use, SA variants require the same licence on adaptations.`, lesson: "sh09-l06", category: "contractual" },
  { id: "sh09-tdm", en: "Text and data mining (TDM) exception", ar: "استثناء التنقيب في النصوص والبيانات", definition: md`EU copyright exception (DSM Directive Art. 4) allowing mining of lawfully accessed content unless the rightsholder reserves rights machine-readably.`, lesson: "sh09-l06", category: "contractual" },
  // l07
  { id: "sh09-stage-gate", en: "Stage gate (research)", ar: "بوابة المرحلة", definition: md`A decision point with a pre-agreed measurable criterion that must be met before the next, more expensive step.`, lesson: "sh09-l07", category: "pm" },
  { id: "sh09-model-card", en: "Model card", ar: "بطاقة توصيف النموذج", definition: md`Documentation of a model's training, intended uses, evaluation results with conditions, limitations and licence.`, lesson: "sh09-l07", category: "pm" },
];

export default glossary;
